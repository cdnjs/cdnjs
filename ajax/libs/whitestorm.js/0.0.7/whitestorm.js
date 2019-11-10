/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

/**
 * @author mrdoob / http://mrdoob.com/
 * @author marklundin / http://mark-lundin.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.AnaglyphEffect = function(renderer, width, height) {

    var eyeRight = new THREE.Matrix4();
    var eyeLeft = new THREE.Matrix4();
    var focalLength = 125;
    var _aspect, _near, _far, _fov;

    var _cameraL = new THREE.PerspectiveCamera();
    _cameraL.matrixAutoUpdate = false;

    var _cameraR = new THREE.PerspectiveCamera();
    _cameraR.matrixAutoUpdate = false;

    var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    var _scene = new THREE.Scene();

    var _params = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat
    };

    if (width === undefined) width = 512;
    if (height === undefined) height = 512;

    var _renderTargetL = new THREE.WebGLRenderTarget(width, height, _params);
    var _renderTargetR = new THREE.WebGLRenderTarget(width, height, _params);

    var _material = new THREE.ShaderMaterial({

        uniforms: {

            "mapLeft": {
                type: "t",
                value: _renderTargetL
            },
            "mapRight": {
                type: "t",
                value: _renderTargetR
            }

        },

        vertexShader: ["varying vec2 vUv;", "void main() {", "	vUv = vec2( uv.x, uv.y );", "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

        fragmentShader: ["uniform sampler2D mapLeft;", "uniform sampler2D mapRight;", "varying vec2 vUv;", "void main() {", "	vec4 colorL, colorR;", "	vec2 uv = vUv;", "	colorL = texture2D( mapLeft, uv );", "	colorR = texture2D( mapRight, uv );",

            // http://3dtv.at/Knowhow/AnaglyphComparison_en.aspx

            "	gl_FragColor = vec4( colorL.g * 0.7 + colorL.b * 0.3, colorR.g, colorR.b, colorL.a + colorR.a ) * 1.1;", "}"
        ].join("\n")

    });

    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), _material);
    _scene.add(mesh);

    this.setSize = function(width, height) {

        if (_renderTargetL) _renderTargetL.dispose();
        if (_renderTargetR) _renderTargetR.dispose();
        _renderTargetL = new THREE.WebGLRenderTarget(width, height, _params);
        _renderTargetR = new THREE.WebGLRenderTarget(width, height, _params);

        _material.uniforms["mapLeft"].value = _renderTargetL;
        _material.uniforms["mapRight"].value = _renderTargetR;

        renderer.setSize(width, height);
    };

    /*
     * Renderer now uses an asymmetric perspective projection
     * (http://paulbourke.net/miscellaneous/stereographics/stereorender/).
     *
     * Each camera is offset by the eye seperation and its projection matrix is
     * also skewed asymetrically back to converge on the same projection plane.
     * Added a focal length parameter to, this is where the parallax is equal to 0.
     */

    this.render = function(scene, camera) {

        scene.updateMatrixWorld();

        if (camera.parent === undefined) camera.updateMatrixWorld();

        var hasCameraChanged = _aspect !== camera.aspect || _near !== camera.near || _far !== camera.far || _fov !== camera.fov;

        if (hasCameraChanged) {

            _aspect = camera.aspect;
            _near = camera.near;
            _far = camera.far;
            _fov = camera.fov;

            var projectionMatrix = camera.projectionMatrix.clone();
            var eyeSep = focalLength / 30 * 0.5;
            var eyeSepOnProjection = eyeSep * _near / focalLength;
            var ymax = _near * Math.tan(THREE.Math.degToRad(_fov * 0.5));
            var xmin, xmax;

            // translate xOffset

            eyeRight.elements[12] = eyeSep;
            eyeLeft.elements[12] = -eyeSep;

            // for left eye

            xmin = -ymax * _aspect + eyeSepOnProjection;
            xmax = ymax * _aspect + eyeSepOnProjection;

            projectionMatrix.elements[0] = 2 * _near / (xmax - xmin);
            projectionMatrix.elements[8] = (xmax + xmin) / (xmax - xmin);

            _cameraL.projectionMatrix.copy(projectionMatrix);

            // for right eye

            xmin = -ymax * _aspect - eyeSepOnProjection;
            xmax = ymax * _aspect - eyeSepOnProjection;

            projectionMatrix.elements[0] = 2 * _near / (xmax - xmin);
            projectionMatrix.elements[8] = (xmax + xmin) / (xmax - xmin);

            _cameraR.projectionMatrix.copy(projectionMatrix);
        }

        _cameraL.matrixWorld.copy(camera.matrixWorld).multiply(eyeLeft);
        _cameraL.position.copy(camera.position);
        _cameraL.near = camera.near;
        _cameraL.far = camera.far;

        renderer.render(scene, _cameraL, _renderTargetL, true);

        _cameraR.matrixWorld.copy(camera.matrixWorld).multiply(eyeRight);
        _cameraR.position.copy(camera.position);
        _cameraR.near = camera.near;
        _cameraR.far = camera.far;

        renderer.render(scene, _cameraR, _renderTargetR, true);

        renderer.render(_scene, _camera);
    };

    this.dispose = function() {
        if (_renderTargetL) _renderTargetL.dispose();
        if (_renderTargetR) _renderTargetR.dispose();
    };
};

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.BufferGeometryUtils = {

    computeTangents: function computeTangents(geometry) {

        var index = geometry.index;
        var attributes = geometry.attributes;

        // based on http://www.terathon.com/code/tangent.html
        // (per vertex tangents)

        if (index === null || attributes.position === undefined || attributes.normal === undefined || attributes.uv === undefined) {

            console.warn('THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()');
            return;
        }

        var indices = index.array;
        var positions = attributes.position.array;
        var normals = attributes.normal.array;
        var uvs = attributes.uv.array;

        var nVertices = positions.length / 3;

        if (attributes.tangent === undefined) {

            geometry.addAttribute('tangent', new THREE.BufferAttribute(new Float32Array(4 * nVertices), 4));
        }

        var tangents = attributes.tangent.array;

        var tan1 = [],
            tan2 = [];

        for (var k = 0; k < nVertices; k++) {

            tan1[k] = new THREE.Vector3();
            tan2[k] = new THREE.Vector3();
        }

        var vA = new THREE.Vector3(),
            vB = new THREE.Vector3(),
            vC = new THREE.Vector3(),
            uvA = new THREE.Vector2(),
            uvB = new THREE.Vector2(),
            uvC = new THREE.Vector2(),
            sdir = new THREE.Vector3(),
            tdir = new THREE.Vector3();

        function handleTriangle(a, b, c) {

            vA.fromArray(positions, a * 3);
            vB.fromArray(positions, b * 3);
            vC.fromArray(positions, c * 3);

            uvA.fromArray(uvs, a * 2);
            uvB.fromArray(uvs, b * 2);
            uvC.fromArray(uvs, c * 2);

            var x1 = vB.x - vA.x;
            var x2 = vC.x - vA.x;

            var y1 = vB.y - vA.y;
            var y2 = vC.y - vA.y;

            var z1 = vB.z - vA.z;
            var z2 = vC.z - vA.z;

            var s1 = uvB.x - uvA.x;
            var s2 = uvC.x - uvA.x;

            var t1 = uvB.y - uvA.y;
            var t2 = uvC.y - uvA.y;

            var r = 1.0 / (s1 * t2 - s2 * t1);

            sdir.set((t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r);

            tdir.set((s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r);

            tan1[a].add(sdir);
            tan1[b].add(sdir);
            tan1[c].add(sdir);

            tan2[a].add(tdir);
            tan2[b].add(tdir);
            tan2[c].add(tdir);
        }

        var groups = geometry.groups;

        if (groups.length === 0) {

            groups = [{
                start: 0,
                count: indices.length
            }];
        }

        for (var j = 0, jl = groups.length; j < jl; ++j) {

            var group = groups[j];

            var start = group.start;
            var count = group.count;

            for (var i = start, il = start + count; i < il; i += 3) {

                handleTriangle(indices[i + 0], indices[i + 1], indices[i + 2]);
            }
        }

        var tmp = new THREE.Vector3(),
            tmp2 = new THREE.Vector3();
        var n = new THREE.Vector3(),
            n2 = new THREE.Vector3();
        var w, t, test;

        function handleVertex(v) {

            n.fromArray(normals, v * 3);
            n2.copy(n);

            t = tan1[v];

            // Gram-Schmidt orthogonalize

            tmp.copy(t);
            tmp.sub(n.multiplyScalar(n.dot(t))).normalize();

            // Calculate handedness

            tmp2.crossVectors(n2, t);
            test = tmp2.dot(tan2[v]);
            w = test < 0.0 ? -1.0 : 1.0;

            tangents[v * 4] = tmp.x;
            tangents[v * 4 + 1] = tmp.y;
            tangents[v * 4 + 2] = tmp.z;
            tangents[v * 4 + 3] = w;
        }

        for (var j = 0, jl = groups.length; j < jl; ++j) {

            var group = groups[j];

            var start = group.start;
            var count = group.count;

            for (var i = start, il = start + count; i < il; i += 3) {

                handleVertex(indices[i + 0]);
                handleVertex(indices[i + 1]);
                handleVertex(indices[i + 2]);
            }
        }
    }

};

function Events(n) {
    var t = {},
        f = [];
    n = n || this, n.on = function(n, f, i) {
        (t[n] = t[n] || []).push([f, i]);
    }, n.off = function(n, i) {
        n || (t = {});
        for (var o = t[n] || f, c = o.length = i ? o.length : 0; c--;) {
            i == o[c][0] && o.splice(c, 1);
        }
    }, n.emit = function(n) {
        for (var i, o = t[n] || f, c = 0; i = o[c++];) {
            i[0].apply(i[1], f.slice.call(arguments, 1));
        }
    };
}
/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */
/*global THREE, console */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe
//
// This is a drop-in replacement for (most) TrackballControls used in examples.
// That is, include this js file and wherever you see:
//    	controls = new THREE.TrackballControls( camera );
//      controls.target.z = 150;
// Simple substitute "OrbitControls" and the control should work as-is.

THREE.OrbitControls = function(object, domElement) {

    this.object = object;
    this.domElement = domElement !== undefined ? domElement : document;

    // API

    // Set to false to disable this control
    this.enabled = true;

    // "target" sets the location of focus, where the control orbits around
    // and where it pans with respect to.
    this.target = new THREE.Vector3();
    // center is old, deprecated; use "target" instead
    this.center = this.target;

    // This option actually enables dollying in and out; left as "zoom" for
    // backwards compatibility
    this.noZoom = false;
    this.zoomSpeed = 1.0;
    // Limits to how far you can dolly in and out
    this.minDistance = 0;
    this.maxDistance = Infinity;

    // Set to true to disable this control
    this.noRotate = false;
    this.rotateSpeed = 1.0;

    // Set to true to disable this control
    this.noPan = false;
    this.keyPanSpeed = 7.0; // pixels moved per arrow key push

    // Set to true to automatically rotate around the target
    this.autoRotate = false;
    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // Set to true to disable use of the keys
    this.noKeys = false;
    // The four arrow keys
    this.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
    };

    ////////////
    // internals

    var scope = this;

    var EPS = 0.000001;

    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();

    var panStart = new THREE.Vector2();
    var panEnd = new THREE.Vector2();
    var panDelta = new THREE.Vector2();

    var dollyStart = new THREE.Vector2();
    var dollyEnd = new THREE.Vector2();
    var dollyDelta = new THREE.Vector2();

    var phiDelta = 0;
    var thetaDelta = 0;
    var scale = 1;
    var pan = new THREE.Vector3();

    var lastPosition = new THREE.Vector3();

    var STATE = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_DOLLY: 4,
        TOUCH_PAN: 5
    };
    var state = STATE.NONE;

    // events

    var changeEvent = {
        type: 'change'
    };

    this.rotateLeft = function(angle) {

        if (angle === undefined) {

            angle = getAutoRotationAngle();
        }

        thetaDelta -= angle;
    };

    this.rotateUp = function(angle) {

        if (angle === undefined) {

            angle = getAutoRotationAngle();
        }

        phiDelta -= angle;
    };

    // pass in distance in world space to move left
    this.panLeft = function(distance) {

        var panOffset = new THREE.Vector3();
        var te = this.object.matrix.elements;
        // get X column of matrix
        panOffset.set(te[0], te[1], te[2]);
        panOffset.multiplyScalar(-distance);

        pan.add(panOffset);
    };

    // pass in distance in world space to move up
    this.panUp = function(distance) {

        var panOffset = new THREE.Vector3();
        var te = this.object.matrix.elements;
        // get Y column of matrix
        panOffset.set(te[4], te[5], te[6]);
        panOffset.multiplyScalar(distance);

        pan.add(panOffset);
    };

    // main entry point; pass in Vector2 of change desired in pixel space,
    // right and down are positive
    this.pan = function(delta) {

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        if (scope.object.fov !== undefined) {

            // perspective
            var position = scope.object.position;
            var offset = position.clone().sub(scope.target);
            var targetDistance = offset.length();

            // half of the fov is center to top of screen
            targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0);
            // we actually don't use screenWidth, since perspective camera is fixed to screen height
            scope.panLeft(2 * delta.x * targetDistance / element.clientHeight);
            scope.panUp(2 * delta.y * targetDistance / element.clientHeight);
        } else if (scope.object.top !== undefined) {

            // orthographic
            scope.panLeft(delta.x * (scope.object.right - scope.object.left) / element.clientWidth);
            scope.panUp(delta.y * (scope.object.top - scope.object.bottom) / element.clientHeight);
        } else {

            // camera neither orthographic or perspective - warn user
            console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
        }
    };

    this.dollyIn = function(dollyScale) {

        if (dollyScale === undefined) {

            dollyScale = getZoomScale();
        }

        scale /= dollyScale;
    };

    this.dollyOut = function(dollyScale) {

        if (dollyScale === undefined) {

            dollyScale = getZoomScale();
        }

        scale *= dollyScale;
    };

    this.update = function() {

        var position = this.object.position;
        var offset = position.clone().sub(this.target);

        // angle from z-axis around y-axis

        var theta = Math.atan2(offset.x, offset.z);

        // angle from y-axis

        var phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);

        if (this.autoRotate) {

            this.rotateLeft(getAutoRotationAngle());
        }

        theta += thetaDelta;
        phi += phiDelta;

        // restrict phi to be between desired limits
        phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));

        // restrict phi to be betwee EPS and PI-EPS
        phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

        var radius = offset.length() * scale;

        // restrict radius to be between desired limits
        radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius));

        // move target to panned location
        this.target.add(pan);

        offset.x = radius * Math.sin(phi) * Math.sin(theta);
        offset.y = radius * Math.cos(phi);
        offset.z = radius * Math.sin(phi) * Math.cos(theta);

        position.copy(this.target).add(offset);

        this.object.lookAt(this.target);

        thetaDelta = 0;
        phiDelta = 0;
        scale = 1;
        pan.set(0, 0, 0);

        if (lastPosition.distanceTo(this.object.position) > 0) {

            this.dispatchEvent(changeEvent);

            lastPosition.copy(this.object.position);
        }
    };

    function getAutoRotationAngle() {

        return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
    }

    function getZoomScale() {

        return Math.pow(0.95, scope.zoomSpeed);
    }

    function onMouseDown(event) {

        if (scope.enabled === false) {
            return;
        }
        event.preventDefault();

        if (event.button === 0) {
            if (scope.noRotate === true) {
                return;
            }

            state = STATE.ROTATE;

            rotateStart.set(event.clientX, event.clientY);
        } else if (event.button === 1) {
            if (scope.noZoom === true) {
                return;
            }

            state = STATE.DOLLY;

            dollyStart.set(event.clientX, event.clientY);
        } else if (event.button === 2) {
            if (scope.noPan === true) {
                return;
            }

            state = STATE.PAN;

            panStart.set(event.clientX, event.clientY);
        }

        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        scope.domElement.addEventListener('mousemove', onMouseMove, false);
        scope.domElement.addEventListener('mouseup', onMouseUp, false);
    }

    function onMouseMove(event) {

        if (scope.enabled === false) return;

        event.preventDefault();

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        if (state === STATE.ROTATE) {

            if (scope.noRotate === true) return;

            rotateEnd.set(event.clientX, event.clientY);
            rotateDelta.subVectors(rotateEnd, rotateStart);

            // rotating across whole screen goes 360 degrees around
            scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);
            // rotating up and down along whole screen attempts to go 360, but limited to 180
            scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

            rotateStart.copy(rotateEnd);
        } else if (state === STATE.DOLLY) {

            if (scope.noZoom === true) return;

            dollyEnd.set(event.clientX, event.clientY);
            dollyDelta.subVectors(dollyEnd, dollyStart);

            if (dollyDelta.y > 0) {

                scope.dollyIn();
            } else {

                scope.dollyOut();
            }

            dollyStart.copy(dollyEnd);
        } else if (state === STATE.PAN) {

            if (scope.noPan === true) return;

            panEnd.set(event.clientX, event.clientY);
            panDelta.subVectors(panEnd, panStart);

            scope.pan(panDelta);

            panStart.copy(panEnd);
        }

        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        scope.update();
    }

    function onMouseUp() /* event */ {

        if (scope.enabled === false) return;

        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        scope.domElement.removeEventListener('mousemove', onMouseMove, false);
        scope.domElement.removeEventListener('mouseup', onMouseUp, false);

        state = STATE.NONE;
    }

    function onMouseWheel(event) {

        if (scope.enabled === false || scope.noZoom === true) return;

        var delta = 0;

        if (event.wheelDelta) {
            // WebKit / Opera / Explorer 9

            delta = event.wheelDelta;
        } else if (event.detail) {
            // Firefox

            delta = -event.detail;
        }

        if (delta > 0) {

            scope.dollyOut();
        } else {

            scope.dollyIn();
        }
    }

    function onKeyDown(event) {

        if (scope.enabled === false) {
            return;
        }
        if (scope.noKeys === true) {
            return;
        }
        if (scope.noPan === true) {
            return;
        }

        // pan a pixel - I guess for precise positioning?
        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        var needUpdate = false;

        switch (event.keyCode) {

            case scope.keys.UP:
                scope.pan(new THREE.Vector2(0, scope.keyPanSpeed));
                needUpdate = true;
                break;
            case scope.keys.BOTTOM:
                scope.pan(new THREE.Vector2(0, -scope.keyPanSpeed));
                needUpdate = true;
                break;
            case scope.keys.LEFT:
                scope.pan(new THREE.Vector2(scope.keyPanSpeed, 0));
                needUpdate = true;
                break;
            case scope.keys.RIGHT:
                scope.pan(new THREE.Vector2(-scope.keyPanSpeed, 0));
                needUpdate = true;
                break;
        }

        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        if (needUpdate) {

            scope.update();
        }
    }

    function touchstart(event) {

        if (scope.enabled === false) {
            return;
        }

        switch (event.touches.length) {

            case 1:
                // one-fingered touch: rotate
                if (scope.noRotate === true) {
                    return;
                }

                state = STATE.TOUCH_ROTATE;

                rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
                break;

            case 2:
                // two-fingered touch: dolly
                if (scope.noZoom === true) {
                    return;
                }

                state = STATE.TOUCH_DOLLY;

                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                dollyStart.set(0, distance);
                break;

            case 3:
                // three-fingered touch: pan
                if (scope.noPan === true) {
                    return;
                }

                state = STATE.TOUCH_PAN;

                panStart.set(event.touches[0].pageX, event.touches[0].pageY);
                break;

            default:
                state = STATE.NONE;

        }
    }

    function touchmove(event) {

        if (scope.enabled === false) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        switch (event.touches.length) {

            case 1:
                // one-fingered touch: rotate
                if (scope.noRotate === true) {
                    return;
                }
                if (state !== STATE.TOUCH_ROTATE) {
                    return;
                }

                rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                rotateDelta.subVectors(rotateEnd, rotateStart);

                // rotating across whole screen goes 360 degrees around
                scope.rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);
                // rotating up and down along whole screen attempts to go 360, but limited to 180
                scope.rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

                rotateStart.copy(rotateEnd);
                break;

            case 2:
                // two-fingered touch: dolly
                if (scope.noZoom === true) {
                    return;
                }
                if (state !== STATE.TOUCH_DOLLY) {
                    return;
                }

                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);

                dollyEnd.set(0, distance);
                dollyDelta.subVectors(dollyEnd, dollyStart);

                if (dollyDelta.y > 0) {

                    scope.dollyOut();
                } else {

                    scope.dollyIn();
                }

                dollyStart.copy(dollyEnd);
                break;

            case 3:
                // three-fingered touch: pan
                if (scope.noPan === true) {
                    return;
                }
                if (state !== STATE.TOUCH_PAN) {
                    return;
                }

                panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
                panDelta.subVectors(panEnd, panStart);

                scope.pan(panDelta);

                panStart.copy(panEnd);
                break;

            default:
                state = STATE.NONE;

        }
    }

    function touchend() /* event */ {

        if (scope.enabled === false) {
            return;
        }

        state = STATE.NONE;
    }

    this.domElement.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    }, false);
    this.domElement.addEventListener('mousedown', onMouseDown, false);
    this.domElement.addEventListener('mousewheel', onMouseWheel, false);
    this.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false); // firefox

    this.domElement.addEventListener('keydown', onKeyDown, false);

    this.domElement.addEventListener('touchstart', touchstart, false);
    this.domElement.addEventListener('touchend', touchend, false);
    this.domElement.addEventListener('touchmove', touchmove, false);
};

THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);

// stats.js - http://github.com/mrdoob/stats.js
var Stats = function Stats() {
    function f(a, e, b) {
        a = document.createElement(a);
        a.id = e;
        a.style.cssText = b;
        return a;
    }

    function l(a, e, b) {
        var c = f("div", a, "padding:0 0 3px 3px;text-align:left;background:" + b),
            d = f("div", a + "Text", "font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:" + e);
        d.innerHTML = a.toUpperCase();
        c.appendChild(d);
        a = f("div", a + "Graph", "width:74px;height:30px;background:" + e);
        c.appendChild(a);
        for (e = 0; 74 > e; e++) {
            a.appendChild(f("span", "", "width:1px;height:30px;float:left;opacity:0.9;background:" + b));
        }
        return c;
    }

    function m(a) {
        for (var b = c.children, d = 0; d < b.length; d++) {
            b[d].style.display = d === a ? "block" : "none";
        }
        n = a;
    }

    function p(a, b) {
        a.appendChild(a.firstChild).style.height = Math.min(30, 30 - 30 * b) + "px";
    }
    var q = self.performance && self.performance.now ? self.performance.now.bind(performance) : Date.now,
        k = q(),
        r = k,
        t = 0,
        n = 0,
        c = f("div", "stats", "width:80px;opacity:0.9;cursor:pointer");
    c.addEventListener("mousedown", function(a) {
        a.preventDefault();
        m(++n % c.children.length);
    }, !1);
    var d = 0,
        u = Infinity,
        v = 0,
        b = l("fps", "#0ff", "#002"),
        A = b.children[0],
        B = b.children[1];
    c.appendChild(b);
    var g = 0,
        w = Infinity,
        x = 0,
        b = l("ms", "#0f0", "#020"),
        C = b.children[0],
        D = b.children[1];
    c.appendChild(b);
    if (self.performance && self.performance.memory) {
        var h = 0,
            y = Infinity,
            z = 0,
            b = l("mb", "#f08", "#201"),
            E = b.children[0],
            F = b.children[1];
        c.appendChild(b);
    }
    m(n);
    return {
        REVISION: 14,
        domElement: c,
        setMode: m,
        begin: function begin() {
            k = q();
        },
        end: function end() {
            var a = q();
            g = a - k;
            w = Math.min(w, g);
            x = Math.max(x, g);
            C.textContent = (g | 0) + " MS (" + (w | 0) + "-" + (x | 0) + ")";
            p(D, g / 200);
            t++;
            if (a > r + 1E3 && (d = Math.round(1E3 * t / (a - r)), u = Math.min(u, d), v = Math.max(v, d), A.textContent = d + " FPS (" + u + "-" + v + ")", p(B, d / 100), r = a, t = 0, void 0 !== h)) {
                var b = performance.memory.usedJSHeapSize,
                    c = performance.memory.jsHeapSizeLimit;
                h = Math.round(9.54E-7 * b);
                y = Math.min(y, h);
                z = Math.max(z, h);
                E.textContent = h + " MB (" + y + "-" + z + ")";
                p(F, b / c);
            }
            return a;
        },
        update: function update() {
            k = this.end();
        }
    };
};
"object" === (typeof module === "undefined" ? "undefined" : _typeof(module)) && (module.exports = Stats);

/*
 *	@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog
 *
 *	Subdivision Geometry Modifier
 *		using Loop Subdivision Scheme
 *
 *	References:
 *		http://graphics.stanford.edu/~mdfisher/subdivision.html
 *		http://www.holmes3d.net/graphics/subdivision/
 *		http://www.cs.rutgers.edu/~decarlo/readings/subdiv-sg00c.pdf
 *
 *	Known Issues:
 *		- currently doesn't handle UVs
 *		- currently doesn't handle "Sharp Edges"
 *
 */

THREE.SubdivisionModifier = function(subdivisions) {
    'use strict';

    this.subdivisions = subdivisions === undefined ? 1 : subdivisions;
};

// Applies the "modify" pattern
THREE.SubdivisionModifier.prototype.modify = function(geometry) {

    var repeats = this.subdivisions;

    while (repeats-- > 0) {

        this.smooth(geometry);
    }

    delete geometry.__tmpVertices;

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
};

(function() {

    // Some constants
    var WARNINGS = !true; // Set to true for development
    var ABC = ['a', 'b', 'c'];

    function getEdge(a, b, map) {

        var vertexIndexA = Math.min(a, b);
        var vertexIndexB = Math.max(a, b);

        var key = vertexIndexA + "_" + vertexIndexB;

        return map[key];
    }

    function processEdge(a, b, vertices, map, face, metaVertices) {

        var vertexIndexA = Math.min(a, b);
        var vertexIndexB = Math.max(a, b);

        var key = vertexIndexA + "_" + vertexIndexB;

        var edge;

        if (key in map) {

            edge = map[key];
        } else {

            var vertexA = vertices[vertexIndexA];
            var vertexB = vertices[vertexIndexB];

            edge = {

                a: vertexA, // pointer reference
                b: vertexB,
                newEdge: null,
                // aIndex: a, // numbered reference
                // bIndex: b,
                faces: [] // pointers to face

            };

            map[key] = edge;
        }

        edge.faces.push(face);

        metaVertices[a].edges.push(edge);
        metaVertices[b].edges.push(edge);
    }

    function generateLookups(vertices, faces, metaVertices, edges) {

        var i, il, face, edge;

        for (i = 0, il = vertices.length; i < il; i++) {

            metaVertices[i] = {
                edges: []
            };
        }

        for (i = 0, il = faces.length; i < il; i++) {

            face = faces[i];

            processEdge(face.a, face.b, vertices, edges, face, metaVertices);
            processEdge(face.b, face.c, vertices, edges, face, metaVertices);
            processEdge(face.c, face.a, vertices, edges, face, metaVertices);
        }
    }

    function newFace(newFaces, a, b, c) {

        newFaces.push(new THREE.Face3(a, b, c));
    }

    /////////////////////////////

    // Performs one iteration of Subdivision
    THREE.SubdivisionModifier.prototype.smooth = function(geometry) {

        var tmp = new THREE.Vector3();

        var oldVertices, oldFaces;
        var newVertices, newFaces; // newUVs = [];

        var n, l, i, il, j, k;
        var metaVertices, sourceEdges;

        // new stuff.
        var sourceEdges, newEdgeVertices, newSourceVertices;

        oldVertices = geometry.vertices; // { x, y, z}
        oldFaces = geometry.faces; // { a: oldVertex1, b: oldVertex2, c: oldVertex3 }

        /******************************************************
         *
         * Step 0: Preprocess Geometry to Generate edges Lookup
         *
         *******************************************************/

        metaVertices = new Array(oldVertices.length);
        sourceEdges = {}; // Edge => { oldVertex1, oldVertex2, faces[]  }

        generateLookups(oldVertices, oldFaces, metaVertices, sourceEdges);

        /******************************************************
         *
         *	Step 1.
         *	For each edge, create a new Edge Vertex,
         *	then position it.
         *
         *******************************************************/

        newEdgeVertices = [];
        var other, currentEdge, newEdge, face;
        var edgeVertexWeight, adjacentVertexWeight, connectedFaces;

        for (i in sourceEdges) {

            currentEdge = sourceEdges[i];
            newEdge = new THREE.Vector3();

            edgeVertexWeight = 3 / 8;
            adjacentVertexWeight = 1 / 8;

            connectedFaces = currentEdge.faces.length;

            // check how many linked faces. 2 should be correct.
            if (connectedFaces != 2) {

                // if length is not 2, handle condition
                edgeVertexWeight = 0.5;
                adjacentVertexWeight = 0;

                if (connectedFaces != 1) {

                    if (WARNINGS) console.warn('Subdivision Modifier: Number of connected faces != 2, is: ', connectedFaces, currentEdge);
                }
            }

            newEdge.addVectors(currentEdge.a, currentEdge.b).multiplyScalar(edgeVertexWeight);

            tmp.set(0, 0, 0);

            for (j = 0; j < connectedFaces; j++) {

                face = currentEdge.faces[j];

                for (k = 0; k < 3; k++) {

                    other = oldVertices[face[ABC[k]]];
                    if (other !== currentEdge.a && other !== currentEdge.b) break;
                }

                tmp.add(other);
            }

            tmp.multiplyScalar(adjacentVertexWeight);
            newEdge.add(tmp);

            currentEdge.newEdge = newEdgeVertices.length;
            newEdgeVertices.push(newEdge);

            // console.log(currentEdge, newEdge);
        }

        /******************************************************
         *
         *	Step 2.
         *	Reposition each source vertices.
         *
         *******************************************************/

        var beta, sourceVertexWeight, connectingVertexWeight;
        var connectingEdge, connectingEdges, oldVertex, newSourceVertex;
        newSourceVertices = [];

        for (i = 0, il = oldVertices.length; i < il; i++) {

            oldVertex = oldVertices[i];

            // find all connecting edges (using lookupTable)
            connectingEdges = metaVertices[i].edges;
            n = connectingEdges.length;
            beta;

            if (n == 3) {

                beta = 3 / 16;
            } else if (n > 3) {

                beta = 3 / (8 * n); // Warren's modified formula
            }

            // Loop's original beta formula
            // beta = 1 / n * ( 5/8 - Math.pow( 3/8 + 1/4 * Math.cos( 2 * Math. PI / n ), 2) );

            sourceVertexWeight = 1 - n * beta;
            connectingVertexWeight = beta;

            if (n <= 2) {

                // crease and boundary rules
                // console.warn('crease and boundary rules');

                if (n == 2) {

                    if (WARNINGS) console.warn('2 connecting edges', connectingEdges);
                    sourceVertexWeight = 3 / 4;
                    connectingVertexWeight = 1 / 8;

                    // sourceVertexWeight = 1;
                    // connectingVertexWeight = 0;
                } else if (n == 1) {

                    if (WARNINGS) console.warn('only 1 connecting edge');
                } else if (n == 0) {

                    if (WARNINGS) console.warn('0 connecting edges');
                }
            }

            newSourceVertex = oldVertex.clone().multiplyScalar(sourceVertexWeight);

            tmp.set(0, 0, 0);

            for (j = 0; j < n; j++) {

                connectingEdge = connectingEdges[j];
                other = connectingEdge.a !== oldVertex ? connectingEdge.a : connectingEdge.b;
                tmp.add(other);
            }

            tmp.multiplyScalar(connectingVertexWeight);
            newSourceVertex.add(tmp);

            newSourceVertices.push(newSourceVertex);
        }

        /******************************************************
         *
         *	Step 3.
         *	Generate Faces between source vertecies
         *	and edge vertices.
         *
         *******************************************************/

        newVertices = newSourceVertices.concat(newEdgeVertices);
        var sl = newSourceVertices.length,
            edge1,
            edge2,
            edge3;
        newFaces = [];

        for (i = 0, il = oldFaces.length; i < il; i++) {

            face = oldFaces[i];

            // find the 3 new edges vertex of each old face

            edge1 = getEdge(face.a, face.b, sourceEdges).newEdge + sl;
            edge2 = getEdge(face.b, face.c, sourceEdges).newEdge + sl;
            edge3 = getEdge(face.c, face.a, sourceEdges).newEdge + sl;

            // create 4 faces.

            newFace(newFaces, edge1, edge2, edge3);
            newFace(newFaces, face.a, edge1, edge3);
            newFace(newFaces, face.b, edge2, edge1);
            newFace(newFaces, face.c, edge3, edge2);
        }

        // Overwrite old arrays
        geometry.vertices = newVertices;
        geometry.faces = newFaces;

        // console.log('done');
    };
})();

/* ================ MODERNIZING BROWSER API IF NOT EXIST ==================== */

//Replacing jQuery fadeIn and fadeOut
function addCSSRule(sheet, selector, rules, index) {

    if (sheet.insertRule) sheet.insertRule(selector + '{' + rules + '}', index);
    else if (sheet.addRule) sheet.addRule(selector, rules, index);
}

//Adds CSS style sheets
addCSSRule(document.styleSheets[0], '@keyframes fadeOut', 'to {opacity: 0}', 0);

addCSSRule(document.styleSheets[0], '@keyframes fadeIn', 'from {opacity: 0} to {opacity: 1}', 0);

//Adds function to triggers animation
Element.prototype.fadeOut = function(t) {

    this.style.webkitAnimationDuration = (t || 1) + 's';
    this.style.webkitAnimationName = "fadeOut";
    this.style.webkitAnimationPlayState = 'running';

    this.addEventListener('animationend', function() {
        this.style.display = 'none';
        this.style.webkitAnimationPlayState = 'paused';
    });
};

Element.prototype.fadeIn = function(t, display) {

    this.style.display = display || 'block';

    this.style.webkitAnimationDuration = (t || 1) + 's';
    this.style.webkitAnimationName = "fadeIn";
    this.style.webkitAnimationPlayState = 'running';

    this.addEventListener('animationend', function() {
        this.style.display = display || 'block';
    });
};

// Array.isArray;
if (typeof Array.isArray === 'undefined') {

    Array.isArray = function(obj) {

        'use strict';

        return Object.prototype.toString.call(obj) === '[object Array]';
    };
}

// event.movementX and event.movementY kind of polyfill
(function() {

    if (!MouseEvent.prototype.hasOwnProperty('movementX') || !MouseEvent.prototype.hasOwnProperty('mozMovementX')) {
        //Checks for support

        // If movementX and ... are not supported, an object Mouse is added to the WHS
        // that contains information about last coords of the mouse.
        var mouse = {
            lastX: 0,
            lastY: 0
        };

        MouseEvent.prototype.getMovementX = function() {
            'use strict';

            var value = this.clientX - mouse.lastX;
            mouse.lastX = this.clientX;

            return value;
        };

        MouseEvent.prototype.getMovementY = function() {
            'use strict';

            var value = this.clientY - mouse.lastY;
            mouse.lastY = this.clientY;

            return value;
        };
    }
})();

// Object.assign|es6+;
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value(target) {
            'use strict';

            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(nextSource);
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

// [x]#TODO:130 RESTRUCTURIZE.
// [x]#TODO:120 RESTRUCTURIZE threejs and cannonjs library calling.
// [x]#DONE:30 Add stats.
// #TODO:10 Add http://underscorejs.org/.
// DONE:20 clean all console.logs.
// DOING:0 Wagner.base.js is not a part of library.
// FIXME: Fix fog.
// DOING:10 improve libraries support.

'use strict';

/* ================ WHITESTORM|JS ==================== */
var WHS = {
    REVISION: "0.0.6",

    API: {},

    plugins: {

        settings: { // Global variables, else...
            plug_id: 0,
            loop_id: 0
        },

        list: {}, // All plugins

        queue: [] // Animation queue

    },

    grounds: []
};

var api = WHS.API;

if (typeof define === 'function' && define.amd) {

    define('whitestorm', WHS);
} else if ('undefined' !== typeof exports && 'undefined' !== typeof module) {

    module.exports = WHS;
}

/**
 * @author alteredq / http://alteredqualia.com/
 * @author alex2401 / http://alexbuzin.me/
 *
 */

THREE.ShaderTerrain = {

    'terrain': {

        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib["fog"], THREE.UniformsLib["lights"], THREE.UniformsLib["shadowmap"], {

            "enableDiffuse1": {
                type: "i",
                value: 0
            },
            "enableDiffuse2": {
                type: "i",
                value: 0
            },
            "enableSpecular": {
                type: "i",
                value: 0
            },
            "enableReflection": {
                type: "i",
                value: 0
            },

            "tDiffuse1": {
                type: "t",
                value: null
            },
            "tDiffuse2": {
                type: "t",
                value: null
            },
            "tDetail": {
                type: "t",
                value: null
            },
            "tNormal": {
                type: "t",
                value: null
            },
            "tSpecular": {
                type: "t",
                value: null
            },
            "tDisplacement": {
                type: "t",
                value: null
            },

            "uNormalScale": {
                type: "f",
                value: 1.0
            },

            "uDisplacementBias": {
                type: "f",
                value: 0.0
            },
            "uDisplacementScale": {
                type: "f",
                value: 1.0
            },

            "diffuse": {
                type: "c",
                value: new THREE.Color(0xeeeeee)
            },
            "specular": {
                type: "c",
                value: new THREE.Color(0x111111)
            },
            "shininess": {
                type: "f",
                value: 30
            },
            "opacity": {
                type: "f",
                value: 1
            },

            "uRepeatBase": {
                type: "v2",
                value: new THREE.Vector2(1, 1)
            },
            "uRepeatOverlay": {
                type: "v2",
                value: new THREE.Vector2(1, 1)
            },

            "uOffset": {
                type: "v2",
                value: new THREE.Vector2(0, 0)
            }

        }]),

        fragmentShader: ["\n\t\t        uniform vec3 diffuse;\n\t\t        uniform vec3 emissive;\n\t\t        uniform float opacity;\n\t\t        uniform vec3 ambientLightColor;\n\t\t        varying vec3 vLightFront;\n\t\t        #ifdef DOUBLE_SIDED\n\t\t\t        varying vec3 vLightBack;\n\t\t\t        uniform vec2 uRepeatOverlay;\n\t\t\t        uniform vec2 uRepeatBase;\n\t\t\t        uniform vec2 uOffset;\n\t\t\t        uniform float uNormalScale;\n\t\t\t        uniform sampler2D tNormal;\n\t\t        #endif\n\t\t        uniform sampler2D oceanTexture;\n\t\t        uniform sampler2D sandyTexture;\n\t\t        uniform sampler2D grassTexture;\n\t\t        uniform sampler2D rockyTexture;\n\t\t        uniform sampler2D snowyTexture;\n\t\t        varying vec3 vTangent;\n\t\t        varying vec3 vBinormal;\n\t\t        varying vec3 vNormal;\n\t\t        varying vec3 vViewPosition;\n\t\t" + [THREE.ShaderChunk["common"], THREE.ShaderChunk["color_pars_fragment"], THREE.ShaderChunk["map_pars_fragment"], THREE.ShaderChunk["alphamap_pars_fragment"], THREE.ShaderChunk["lightmap_pars_fragment"], THREE.ShaderChunk["envmap_pars_fragment"], THREE.ShaderChunk["fog_pars_fragment"], THREE.ShaderChunk["shadowmap_pars_fragment"], THREE.ShaderChunk["specularmap_pars_fragment"], THREE.ShaderChunk["logdepthbuf_pars_fragment"]].join("\n") + "\n\t\t        varying vec2 vUv;\n\t\t        varying float vAmount;\n\t\t        void main() {\n\t\t        \t// UVs.\n\t\t            vec2 uvOverlay = uRepeatOverlay * vUv + uOffset;\n\t\t            vec2 uvBase = uRepeatBase * vUv;\n\t\t\t\t\tvec3 specularTex = vec3( 1.0 );\n\t\t            vec3 normalTex = texture2D( tNormal, uvOverlay ).xyz * 2.0 - 1.0;\n\t\t            normalTex.xy *= uNormalScale;\n\t\t            normalTex = normalize( normalTex );\n\t\t            mat3 tsb = mat3( vTangent, vBinormal, vNormal );\n\t\t            vec3 finalNormal = tsb * normalTex;\n\t\t            vec3 normal = normalize( finalNormal );\n\t\t            vec3 viewPosition = normalize( vViewPosition );\n\t\t            vec3 shadowMask = vec3( 1.0 );\n\t\t            vec3 outgoingLight = vec3( 0.0 );\n\t\t            vec3 totalAmbientLight = ambientLightColor;\n\t\t            vec4 diffuseColor = vec4(0.0);\n\t\t            // Color by texture.\n\t\t            vec4 water = (smoothstep(0.01, 0.25, vAmount)\n\t\t            - smoothstep(0.24, 0.26, vAmount))\n\t\t            * texture2D( oceanTexture, vUv * 10.0 );\n\t\t            vec4 sandy = (smoothstep(0.24, 0.27, vAmount)\n\t\t            - smoothstep(0.28, 0.31, vAmount))\n\t\t            * texture2D( sandyTexture, vUv * 10.0 );\n\t\t            vec4 grass = (smoothstep(0.28, 0.32, vAmount)\n\t\t            - smoothstep(0.35, 0.40, vAmount))\n\t\t            * texture2D( grassTexture, vUv * 20.0 );\n\t\t            vec4 rocky = (smoothstep(0.30, 0.40, vAmount)\n\t\t            - smoothstep(0.40, 0.70, vAmount))\n\t\t            * texture2D( rockyTexture, vUv * 20.0 );\n\t\t            vec4 snowy = (smoothstep(0.42, 0.45, vAmount))\n\t\t            * texture2D( snowyTexture, vUv * 10.0 );\n\t\t            diffuseColor = vec4(0.0, 0.0, 0.0, 1.0)\n\t\t            + water + sandy + grass + rocky + snowy;\n\t\t" + [THREE.ShaderChunk["logdepthbuf_fragment"], THREE.ShaderChunk["map_fragment"], THREE.ShaderChunk["alphamap_fragment"], THREE.ShaderChunk["alphatest_fragment"], THREE.ShaderChunk["specularmap_fragment"], THREE.ShaderChunk["lightmap_fragment"], THREE.ShaderChunk["color_fragment"], THREE.ShaderChunk["shadowmap_fragment"], THREE.ShaderChunk["linear_to_gamma_fragment"], THREE.ShaderChunk["fog_fragment"]].join("\n") + "\n\t\t            #ifdef DOUBLE_SIDED\n\t\t                if ( gl_FrontFacing )\n\t\t                    outgoingLight += diffuseColor.rgb * \n\t\t                \t\t( vLightFront * shadowMask + totalAmbientLight )\n\t\t                \t\t+ emissive;\n\t\t                else\n\t\t                    outgoingLight += diffuseColor.rgb * \n\t\t                \t\t( vLightBack * shadowMask + totalAmbientLight )\n\t\t                \t\t+ emissive;\n\t\t            #else\n\t\t                outgoingLight += diffuseColor.rgb * \n\t\t                \t( vLightFront * shadowMask + totalAmbientLight )\n\t\t                \t+ emissive;\n\t\t            #endif\n\t\t           gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t\t      }\n\t\t"],

        vertexShader: ["\n\t\t    #define TERRAIN;\n\t\t    varying vec3 vLightFront;\n\t\t    #ifdef DOUBLE_SIDED\n\t\t        varying vec3 vLightBack;\n\t\t    #endif\n\t\t    \n\t\t    varying float vAmount;\n\t\t    attribute vec4 tangent;\n\t\t    uniform vec2 uRepeatBase;\n\t\t    uniform sampler2D tNormal;\n\t\t    #ifdef VERTEX_TEXTURES\n\t\t\t    uniform sampler2D tDisplacement;\n\t\t\t    uniform float uDisplacementScale;\n\t\t\t    uniform float uDisplacementBias;\n\t\t    #endif\n\t\t    varying vec3 vTangent;\n\t\t    varying vec3 vBinormal;\n\t\t    varying vec3 vNormal;\n\t\t    varying vec2 vUv;\n\t\t    varying vec3 vViewPosition;\n\t\t" + [THREE.ShaderChunk["common"], THREE.ShaderChunk["uv_pars_vertex"], THREE.ShaderChunk["uv2_pars_vertex"], THREE.ShaderChunk["envmap_pars_vertex"], THREE.ShaderChunk["lights_lambert_pars_vertex"], THREE.ShaderChunk["color_pars_vertex"], THREE.ShaderChunk["morphtarget_pars_vertex"], THREE.ShaderChunk["skinning_pars_vertex"], THREE.ShaderChunk["shadowmap_pars_vertex"], THREE.ShaderChunk["logdepthbuf_pars_vertex"]].join("\n") + "\n\t\t    void main() {\n\t\t" + [THREE.ShaderChunk["color_vertex"], THREE.ShaderChunk["beginnormal_vertex"], THREE.ShaderChunk["morphnormal_vertex"], THREE.ShaderChunk["skinbase_vertex"], THREE.ShaderChunk["skinnormal_vertex"], THREE.ShaderChunk["defaultnormal_vertex"], THREE.ShaderChunk["begin_vertex"], THREE.ShaderChunk["morphtarget_vertex"], THREE.ShaderChunk["skinning_vertex"], THREE.ShaderChunk["project_vertex"], THREE.ShaderChunk["logdepthbuf_vertex"], THREE.ShaderChunk["uv_vertex"], THREE.ShaderChunk["uv2_vertex"]].join("\n") + "\n\t\t\t    vNormal = normalize( normalMatrix * normal);\n\t\t\t    // Tangent and binormal vectors.\n\t\t\t    vTangent = normalize( normalMatrix * tangent.xyz );\n\t\t\t    vBinormal = cross( vNormal, vTangent ) * tangent.w;\n\t\t\t    vBinormal = normalize( vBinormal );\n\t\t\t    // Texture coordinates.\n\t\t\t    vUv = uv;\n\t\t\t    vec2 uvBase = uv * uRepeatBase;\n\t\t\t    // displacement mapping\n\t\t\t    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\t\t\t    mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t\t\t    transformedNormal = normalize( normalMatrix * normal );\n\t\t\t    gl_Position = projectionMatrix * mvPosition;\n\t\t\t    vViewPosition = -mvPosition.xyz;\n\t\t\t    vAmount = position.z * 0.005 + 0.1;\n\t\t" + [THREE.ShaderChunk["envmap_vertex"], THREE.ShaderChunk["lights_lambert_vertex"], THREE.ShaderChunk["shadowmap_vertex"]].join("\n") + "\n\t\t   }\n\t\t"],

        side: THREE.DoubleSide,
        shading: THREE.SmoothShading

    }

};

WHS.API.construct = function(root, params, type) {

    'use strict';

    if (!root) console.error("@constructor: WHS root object is not defined.");

    var _set = function _set(x, y, z) {

        this.x = x;
        this.y = y;
        this.z = z;
    };

    if (params.pos) params.pos.set = _set;
    if (params.rot) params.rot.set = _set;
    if (params.scale) params.scale.set = _set;
    if (params.target) params.target.set = _set;

    // Polyfill for 3D.
    var target = api.extend(params, {

        pos: {
            x: 0,
            y: 0,
            z: 0,
            set: _set
        },

        rot: {
            x: 0,
            y: 0,
            z: 0,
            set: _set
        },

        scale: {
            x: 1,
            y: 1,
            z: 1,
            set: _set
        },

        target: {
            x: 0,
            y: 0,
            z: 0,
            set: _set
        },

        morph: {
            speed: 1,
            duration: 1
        },

        onlyvis: false

    });

    var key = 0;

    root.modellingQueue.forEach(function(el) {

        if (el.type == type) key++;
    });

    var scope = {
        root: root,
        _key: key,
        _whsobject: true,
        _name: type + key,
        __releaseTime: new Date().getTime(),
        _pos: target.pos,
        _rot: target.rot,
        _scale: target.scale,
        _morph: target.morph,
        _target: target.target,
        _onlyvis: target.onlyvis
    };

    Object.assign(this, scope);

    return this;
};

WHS.API.construct.prototype = {

    build: function build(mesh) {

        'use strict';

        var _this = this;

        mesh = mesh || this.mesh;

        this.build_state = new Promise(function(resolve, reject) {

            try {

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                mesh.position.set(_this._pos.x, _this._pos.y, _this._pos.z);
                mesh.rotation.set(_this._rot.x, _this._rot.y, _this._rot.z);
                mesh.scale.set(_this._scale.x, _this._scale.y, _this._scale.z);

                resolve();
            } catch (err) {

                console.error(err.message);

                reject();

                //this._state.reject();
            }
        });

        return this;
    },

    wrap: function wrap(mesh) {

        'use strict';

        var _mesh = mesh || this.mesh,
            _scope = this;

        this._key = this.root.modellingQueue.length;

        this._state = new Promise(function(resolve, reject) {

            try {

                api.merge(_scope.root.scene, _mesh);
                _scope.root.modellingQueue.push(_scope);
            } catch (err) {

                console.error(err.message);
                reject();
            } finally {

                if (_scope._wait) {

                    _scope._mesh.addEventListener('ready', function() {
                        resolve();
                    });
                } else resolve();
            }
        });

        _scope.root.children.push(_scope);

        return this;
    },

    remove: function remove() {

        this.root.scene.remove(this.mesh);

        return this;
    },

    retrieve: function retrieve() {

        this.root.scene.add(this.mesh);

        return this;
    }

};

WHS.API.extend = function(object) {
    for (var _len = arguments.length, extensions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        extensions[_key - 1] = arguments[_key];
    }

    // $.extend alternative, ... is the spread operator.

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = extensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var extension = _step.value;

            if (!extension) continue; // Ignore null and undefined objects and paramaters.

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.getOwnPropertyNames(extension)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var prop = _step2.value;
                    // Do not traverse the prototype chain.
                    if (object[prop] != undefined && object[prop].toString() == '[object Object]' && extension[prop].toString() == '[object Object]')

                    //Goes deep only if object[prop] and extension[prop] are both objects !
                        WHS.API.extend(object[prop], extension[prop]);
                    else object[prop] = object[prop] === 0 ? 0 : object[prop] || extension[prop]; // Add values that do not already exist.
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return object;
};

/**
 * Shape. Makes *THREE.JS* shape.
 *
 * @param {Object} pos Position x/y/z.
 * @param {Number} diff Intersect line length from top.
 * @param {Object} terrain *WHS* terrain object.
 * @param {Number} direction Direction of raycast vector.
 * @returns {Object} Intersect array.
 */
WHS.API.getheight = function(pos, diff, terrain, direction) {

    'use strict';

    diff = diff || 1000;

    direction = direction || 1;

    this.raycaster = new THREE.Raycaster(new THREE.Vector3(pos.x, diff, direction * pos.y), new THREE.Vector3(0, -1, 0));

    this.intersect = this.raycaster.intersectObject(terrain.mesh);

    return this.intersect;
};

// #DONE:10 JSONLoader don't work.
WHS.API.JSONLoader = function() {
    return new THREE.JSONLoader();
};

WHS.API.TextureLoader = function() {
    return new THREE.TextureLoader();
};

WHS.API.loadMaterial = function(material) {

    'use strict';

    if (typeof material.kind !== "string") console.error("Type of material is undefined or not a string. @loadMaterial");

    var scope = {
        _type: material.kind,
        _restitution: material.restitution || material.rest || 0.3,
        _friction: material.friction || material.fri || 0.8
    };

    var params = api.extend({}, material);

    delete params["kind"];

    delete params["friction"];
    delete params["fric"];

    delete params["restitution"];
    delete params["rest"];

    switch (material.kind) {
        case "basic":
            scope._material = new THREE.MeshBasicMaterial(params);
            break;

        case "linebasic":
            scope._params = new THREE.LineBasicMaterial(params);
            break;

        case "linedashed":
            scope._material = new THREE.LineDashedMaterial(params);
            break;

        case "material":
            scope._material = new THREE.Material(params);
            break;

        case "depth":
            scope._material = new THREE.MeshDepthMaterial(params);
            break;

        case "face":
            scope._material = new THREE.MeshFaceMaterial(params);
            break;

        case "lambert":
            scope._material = new THREE.MeshLambertMaterial(params);
            break;

        case "normal":
            scope._material = new THREE.MeshNormalMaterial(params);
            break;

        case "phong":
            scope._material = new THREE.MeshPhongMaterial(params);
            break;

        case "pointcloud":
            scope._material = new THREE.PointCloudMaterial(params);
            break;

        case "rawshader":
            scope._material = new THREE.RawShaderMaterial(params);
            break;

        case "shader":
            scope._material = new THREE.ShaderMaterial(params);
            break;

        case "spritecanvas":
            scope._material = new THREE.SpriteCanvasMaterial(params);
            break;

        case "sprite":
            scope._material = new THREE.SpriteMaterial(params);
            break;
    }

    scope._material = Physijs.createMaterial(scope._material, scope._friction, scope._restitution);

    return scope;
};

/**
 * MERGE.
 *
 * @param {Object} box Object to be merged. (REQUIRED)
 * @param {Object} rabbits Object to be added. (REQUIRED)
 */
WHS.API.merge = function(box, rabbits) {

    'use strict';

    // More presice checking.

    if (!((typeof box === "undefined" ? "undefined" : _typeof(box)) === 'object' && (typeof rabbits === "undefined" ? "undefined" : _typeof(rabbits)) === 'object')) console.error("No rabbits for the box. (arguments)", [typeof box === "undefined" ? "undefined" : _typeof(box), typeof rabbits === "undefined" ? "undefined" : _typeof(rabbits)]);

    // Will only get here if box and rabbits are objects, arrays are object !
    if (!box) // Box should not be null, null is an object too !

    // #FIXME:0 Fix caller function line number.
        console.error("box is undefined. Line " + new Error().lineNumber + ". Func merge.", [box, rabbits]);
    else {

        if (Array.isArray(rabbits) && rabbits.length === 1) box.add(rabbits[0]); // Should not be 0.

        else if (Array.isArray(rabbits) && rabbits.length > 1 && box) {

            for (var i = 0; i < rabbits.length; i++) {

                box.add(rabbits[i]);
            }
        } else if (!Array.isArray(rabbits)) box.add(rabbits);
    }
};

/**
 * Packing uvs. Generates uvs automatically.
 *
 * @param {Object} geometry Figure object geometry *THREE.JS*. (REQUIRED)
 */
WHS.API.PackUvs = function(geometry) {

    geometry.computeBoundingBox();

    var max = geometry.boundingBox.max;
    var min = geometry.boundingBox.min;

    var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
    var range = new THREE.Vector2(max.x - min.x, max.y - min.y);

    geometry.faceVertexUvs[0] = [];

    var faces = geometry.faces;

    for (var i = 0; i < geometry.faces.length; i++) {

        var v1 = geometry.vertices[faces[i].a];
        var v2 = geometry.vertices[faces[i].b];
        var v3 = geometry.vertices[faces[i].c];

        geometry.faceVertexUvs[0].push([new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y), new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y), new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)]);
    }

    geometry.uvsNeedUpdate = true;
};

/**
 * REMOVEDUPLICEFACES.
 *
 * @param {Object} geometry *THREE.JS* geometry. (REQUIRED)
 * @return {Object} geometry *THREE.JS* geometry.
 */
WHS.API.removeDuplicateFaces = function(geometry) {

    function isSame() {
        return !(a1.sort() > a2.sort() || a1.sort() < a2.sort());
    }

    for (var i = 0; i < geometry.faces.length; i++) {

        var tri = geometry.faces[i];
        var inds = [tri.a, tri.b, tri.c, tri.d].sort();

        for (var j = 0; j < i; j++) {

            var tri_2 = geometry.faces[j];

            if (tri_2 !== undefined) {

                // May have already been deleted
                var inds_2 = [tri_2.a, tri_2.b, tri_2.c, tri_2.d].sort();

                if (isSame(inds, inds_2)) {

                    delete geometry.faces[i]; // Sets these faces to undefined
                    // If duplicate, it is also interior, so remove both
                    delete geometry.faces[j];
                }
            }
        }
    }

    geometry.faces = geometry.faces.filter(function(a) {

        return a === undefined;
    });

    return geometry;
};

/**
 * ROTATEGEOMETRY.
 *
 * @param {Object} geometry *THREE.JS* geometry. (REQUIRED)
 * @param {Object} rotateSet Rotation x/y/z. (REQUIRED)
 * @return {Object} *THREE.JS* geometry.
 */
WHS.API.rotateGeometry = function(geometry, rotateSet) {

    'use strict';

    var rotationMatrix = new THREE.Matrix4();

    rotationMatrix.makeRotationFromEuler(new THREE.Euler(rotateSet.x, rotateSet.y, rotateSet.z, 'XYZ'));

    for (var v in geometry.vertices) {

        geometry.vertices[v].applyMatrix4(rotationMatrix);
    }

    return geometry;
};

/**
 * Texture. Loads texture object.
 *
 * @param {String} url Url adress of texture *JSON*. (REQUIRED)
 * @param {Object} options Parameters of texture. (REQUIRED)
 * @return {Object} *THREE.JS* texture.
 */
WHS.API.texture = function(url, options) {

    'use strict';

    var texture = api.TextureLoader().load(url);

    if (options) {

        var opt = api.extend(options, {

            offset: {
                x: 0,
                y: 0
            },

            repeat: {
                x: 1,
                y: 1
            }

        });

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        texture.offset.set(opt.offset.x, opt.offset.y);
        texture.repeat.set(opt.repeat.x, opt.repeat.y);

        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;
    }

    return texture;
};

/**
 * TRIANGULATE.
 *
 * @param {Object} thrObj *THREE.JS* geometry. (REQUIRED)
 * @param {Object} material *THREE.JS* material. (REQUIRED)
 */
WHS.API.Triangulate = function(thrObj, material) {

    'use strict';

    if (!(thrObj instanceof THREE.Geometry)) console.error("No THREE.js geometry");

    //If it is instance, then it is defined !
    else if (material) {

        var triangles = new THREE.Geometry();
        var materials = [];

        thrObj.faces.forEach(function(element) {

            var triangle = new THREE.Geometry();

            [].push.apply(triangle.vertices, [thrObj.vertices[element.a], thrObj.vertices[element.b], thrObj.vertices[element.c]]);

            triangle.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1), new THREE.Vector2(1, 0)]);

            triangle.faces.push(new THREE.Face3(0, 1, 2));
            triangle.computeFaceNormals();

            var triangleMesh = new THREE.Mesh(triangle, material);
            triangleMesh.updateMatrix();

            triangles.merge(triangleMesh.geometry, triangleMesh.matrix);
            materials.push(material);
        });

        var trianglesMesh = new THREE.Mesh(triangles, new THREE.MeshFaceMaterial(materials));

        return trianglesMesh;
    }
};

WHS.Watch = function(queue) {

    'use strict';

    this._queue = Array.isArray(queue) ? queue.slice() : [];

    return this;
};

WHS.Watch.prototype.add = function(element) {

    'use strict';

    this._queue.push(element);

    return this;
};

WHS.Watch.prototype.remove = function(element) {

    'use strict';

    this._queue = this._queue.filter(function(item) {
        return item != element;
    });

    return this;
};

WHS.plugins.loop = function(func) {

    this.loop = {
        func: func,
        id: WHS.plugins.settings.loop_id++,
        enabled: false
    };

    WHS.plugins.queue.push(this.loop);
};

WHS.plugins.loop.prototype.start = function() {

    this.loop.enabled = true;
};

WHS.plugins.loop.prototype.stop = function() {

    this.loop.enabled = false;
};

WHS.gp = {};

WHS.plugins.register = function(name, plugin, global) {

    'use strict';

    var id = WHS.plugins.settings.plug_id;

    WHS.plugins.list[name] = {
        func: plugin,
        id: id
    };

    if (global) WHS.gp[name] = plugin;
    else WHS.API.construct.prototype[name] = plugin;

    WHS.plugins.settings.plug_id++;

    return;
};

/**
 * Init.
 *
 * @param {Object} params Parameters of initalize. (OPTIONAL)
 * @return {Object} Scope.
 */
WHS.init = function(params) {

    'use strict';

    console.log('WHS.init', WHS.REVISION);

    if (!THREE) console.warn('whitestormJS requires THREE.js. {Object} THREE not found.');
    if (!Physijs) console.warn('whitestormJS requires PHYSI.js. {Object} Physijs not found.');
    if (!WAGNER) console.warn('whitestormJS requires WAGNER.js. {Object} WAGNER not found.');

    var target = api.extend(params, {

        anaglyph: false,
        helper: false,
        stats: false,
        wagner: true,
        autoresize: false,

        shadowmap: true,

        gravity: {
            x: 0,
            y: 0,
            z: 0
        },

        camera: {
            aspect: 75,
            near: 1,
            far: 1000,

            x: 0,
            y: 0,
            z: 0
        },

        rWidth: window.innerWidth, // Resolution(width).
        rHeight: window.innerHeight, // Resolution(height).

        width: window.innerWidth, // Container(width).
        height: window.innerHeight, // Container(height).

        physics: {

            quatNormalizeSkip: 0,
            quatNormalizeFast: false,

            solver: {
                iterations: 20,
                tolerance: 0
            },

            defMaterial: {
                contactEquationStiffness: 1e8,
                contactEquationRegularizationTime: 3
            }

        },

        background: 0x000000,
        assets: "./assets",
        container: document.body,

        path_worker: '../libs/physijs_worker.js',
        path_ammo: '../libs/ammo.js'

    });

    this._settings = target;

    Physijs.scripts.worker = target.path_worker;
    Physijs.scripts.ammo = target.path_ammo;

    this.scene = new Physijs.Scene();

    this.scene.setGravity(new THREE.Vector3(params.gravity.x, params.gravity.y, params.gravity.z));

    // DOM INIT
    var whselement = document.createElement('div'); //.whs
    whselement.className = "whs";

    target.container.appendChild(whselement);

    // Debug Renderer
    if (target.stats) {
        this._stats = new Stats();

        if (target.stats == "fps") this._stats.setMode(0);
        else if (target.stats == "ms") this._stats.setMode(1);
        else if (target.stats == "mb") this._stats.setMode(1);
        else {
            this._stats.setMode(0);
            // WARN: console | stats mode.
            console.warn([this._stats], "Please, apply stats mode [fps, ms, mb] .");
        }

        this._stats.domElement.style.position = 'absolute';
        this._stats.domElement.style.left = '0px';
        this._stats.domElement.style.bottom = '0px';

        whselement.appendChild(this._stats.domElement);
    }

    // Camera.
    var camera = new THREE.PerspectiveCamera(target.camera.aspect, target.width / target.height, target.camera.near, target.camera.far);

    camera.position.set(target.camera.x, target.camera.y, target.camera.z);

    api.merge(this.scene, camera);

    // Renderer.
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(target.background);

    // Shadowmap.
    renderer.shadowMap.enabled = target.shadowmap;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.cascade = true;

    if (target.anaglyph) {

        this.effect = new THREE.AnaglyphEffect(renderer);
        this.effect.setSize(target.rWidth, target.rHeight);

        this.effect.render(this.scene, camera);
    } else {

        renderer.setSize(target.rWidth, target.rHeight);
        renderer.render(this.scene, camera);
    }

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    whselement.appendChild(renderer.domElement);

    target.container.style.margin = 0;
    target.container.style.padding = 0;
    target.container.style.position = 'relative';
    target.container.style.overflow = 'hidden';

    // NOTE: ==================== Composer. =======================
    if (target.wagner) {

        this._composer = new WAGNER.Composer(renderer);

        this._composer.setSize(target.rWidth, target.rHeight);
        this._composer.autoClearColor = true;

        this._composer.reset();
        this._composer.render(this.scene, camera);

        this._composer.eff = [];
    }

    Object.assign(this, {
        _camera: camera,
        renderer: renderer,
        _settings: target,
        modellingQueue: [], // Queue for physics objects
        children: [], // Children for this app.
        _dom: whselement
    });

    // NOTE: ==================== Autoresize. ======================
    var scope = this;

    if (target.autoresize) window.addEventListener('load resize', function() {
        scope._camera.aspect = window.innerWidth / window.innerHeight;

        scope._camera.updateProjectionMatrix();

        scope.renderer.setSize(target.rWidth, target.rHeight);

        /*if (params.wagner) {
            scope._composer.setSize(target.rWidth, target.rHeight);
              renderer.domElement.style.width = '100%';
            renderer.domElement.style.height = '100%';
        }*/
    });

    return scope;
};

// [x]#TODO:70 Fix animate update callback.
/**
 * ANIMATE.
 */
WHS.init.prototype.start = function() {

    'use strict';

    var clock = new THREE.Clock();
    var scope = this;
    scope._events = new Events();

    scope._events.on("ready", function() {
        scope.update();
    });

    function reDraw(time) {

        requestAnimationFrame(reDraw);

        // Init stats.
        if (scope._stats) scope._stats.begin();

        // Merging data loop.
        for (var i = 0; i < Object.keys(scope.modellingQueue).length; i++) {
            if (scope.modellingQueue[i].morph) scope.modellingQueue[i].mesh.mixer.update(clock.getDelta());
        }

        scope.scene.simulate();

        //if (scope._settings.anaglyph)
        //  scope.effect.render(scope.scene, scope._camera);

        // Controls.
        if (scope.controls) {
            scope.controls.update(Date.now() - scope.time);
            scope.time = Date.now();
        }

        // Effects rendering.
        if (scope._composer) {
            scope._composer.reset();

            scope._composer.render(scope.scene, scope._camera);

            scope._composer.eff.forEach(function(effect) {
                scope._composer.pass(effect);
            });

            scope._composer.toScreen();
        }

        // End helper.
        if (scope._stats) scope._stats.end();

        WHS.plugins.queue.forEach(function(loop) {

            if (loop.enabled) loop.func(time);
        });
    }

    this.update = reDraw;

    scope._ready = [];

    var loading_queue = WHS.Watch(scope.children);

    loading_queue._queue.forEach(function(object) {
        object._state.then(function() {
            scope._ready.push(object);

            if (loading_queue._queue.length == scope._ready.length) scope._events.emit("ready");
        });
    });
};

// #DONE:40 addModel *func*.
/**
 * MODEL.
 *
 * @param {String} pathToModel path to JSON model. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 * @return {Object} Scope.
 */
WHS.init.prototype.addModel = function(pathToModel, options) {

    'use strict';

    var scope = new api.construct(this, options, "model");

    scope.materialType = api.loadMaterial(options.materialOptions)._material;

    api.JSONLoader().load(pathToModel, function(data) {
        data.computeFaceNormals();
        data.computeVertexNormals();

        // Visualization.
        scope.mesh = new Physijs.ConcaveMesh(data, scope.materialType, options.mass);
        scope._wait = true;

        scope.build().wrap();
    });

    return scope;
};

WHS.init.prototype.addMorph = function(url, options) {

    'use strict';

    var scope = new api.construct(this, options, "morph");

    scope.skip = true;
    scope.morph = true;

    api.JSONLoader().load(url, function(geometry) {

        var material = new THREE.MeshLambertMaterial({
            color: 0xffaa55,
            morphTargets: true,
            vertexColors: THREE.FaceColors
        });

        scope.mesh = new THREE.Mesh(geometry, material);
        scope.mesh.speed = scope._morph.speed;

        scope._mixer = new THREE.AnimationMixer(scope.mesh);
        scope._mixer.addAction(new THREE.AnimationAction(geometry.animations[0]).warpToDuration(0.5));

        scope._mixer.update(600 * Math.random());
        scope.mesh.mixer = scope._mixer;

        scope._rot.y = Math.PI / 2;

        scope.build(scope.mesh).wrap();
    });

    return scope;
};

/**
 * Figure.
 *
 * @param {String} figure name *THREE.JS*. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 * @return {Object} Scope.
 */
WHS.init.prototype.addObject = function(figureType, options) {

    'use strict';

    var scope = new api.construct(this, options, figureType),
        mass = options.onlyvis ? scope._target.mass : 1,
        fprops;

    scope.materialType = api.loadMaterial(options.materialOptions)._material;
    options.geometryOptions = options.geometryOptions || {};

    switch (figureType) {
        case "sphere":

            api.extend(options.geometryOptions, {

                radius: 1,
                segmentA: 32,
                segmentB: 32

            });

            scope.mesh = new Physijs.SphereMesh(new THREE.SphereGeometry(options.geometryOptions.radius, options.geometryOptions.segmentA, options.geometryOptions.segmentB), scope.materialType, 10);

            break;
        case "cube":

            api.extend(options.geometryOptions, {

                width: 1,
                height: 1,
                depth: 1

            });

            scope.mesh = new Physijs.BoxMesh(new THREE.BoxGeometry(options.geometryOptions.width, options.geometryOptions.height, options.geometryOptions.depth), scope.materialType, mass);

            break;
        case "cylinder":

            api.extend(options.geometryOptions, {

                radiusTop: 1,
                radiusBottom: 1,
                height: 1,
                radiusSegments: 32

            });

            scope.mesh = new Physijs.CylinderMesh(new THREE.CylinderGeometry(options.geometryOptions.radiusTop, options.geometryOptions.radiusBottom, options.geometryOptions.height, options.geometryOptions.radiusSegments), scope.materialType, mass);

            break;
        case "dodecahedron":

            api.extend(options.geometryOptions, {

                radius: 1,
                detail: 0

            });

            scope.mesh = new Physijs.ConvexMesh(new THREE.DodecahedronGeometry(options.geometryOptions.radius, options.geometryOptions.detail), scope.materialType, mass);

            break;
        case "extrude":

            api.extend(options.geometryOptions, {

                shapes: [],
                options: {}

            });

            scope.mesh = new Physijs.ConvexMesh(new THREE.ExtrudeGeometry(options.geometryOptions.shapes, options.geometryOptions.options), scope.materialType, mass);

            break;
        case "icosahedron":

            api.extend(options.geometryOptions, {

                radius: 1,
                detail: 0

            });

            scope.mesh = new Physijs.ConvexMesh(new THREE.IcosahedronGeometry(options.geometryOptions.radius, options.geometryOptions.detail), scope.materialType, mass);

            break;
        case "lathe":

            api.extend(options.geometryOptions, {

                points: []

            });

            scope.mesh = new Physijs.ConvexMesh(new THREE.LatheGeometry(options.geometryOptions.points), scope.materialType, mass);

            break;
        case "octahedron":

            api.extend(options.geometryOptions, {

                radius: 1,
                detail: 0

            });

            scope.mesh = new Physijs.ConvexMesh(new THREE.OctahedronGeometry(options.geometryOptions.radius, options.geometryOptions.detail), scope.materialType, mass);

            break;
        case "parametric":

            api.extend(options.geometryOptions, {

                func: function func() {},
                slices: 10,
                stacks: 10

            });

            scope.mesh = new Physijs.ConvexMesh(new THREE.ParametricGeometry(options.geometryOptions.func, options.geometryOptions.slices, options.geometryOptions.stacks), scope.materialType, mass);

            break;
        case "plane":

            api.extend(options.geometryOptions, {

                width: 1,
                height: 0,
                segments: 32

            });

            scope.mesh = new Physijs.ConvexMesh(new THREE.PlaneBufferGeometry(options.geometryOptions.width, options.geometryOptions.height, options.geometryOptions.segments), scope.materialType, mass);

            break;
        case "polyhedron":

            api.extend(options.geometryOptions, {

                verticesOfCube: [],
                indicesOfFaces: [],
                radius: 1,
                detail: 1

            });

            scope.mesh = new Physijs.ConvexMesh(new THREE.PolyhedronGeometry(options.geometryOptions.verticesOfCube, options.geometryOptions.indicesOfFaces), scope.materialType, mass);

            break;
        case "ring":

            api.extend(options.geometryOptions, {

                innerRadius: 2,
                outerRadius: 5,
                thetaSegments: 30,
                phiSegments: 30,
                thetaStart: 0,
                thetaLength: Math.PI * 2

            });

            scope.mesh = new Physijs.ConcaveMesh(new THREE.TorusGeometry(options.geometryOptions.outerRadius, (options.geometryOptions.outerRadius - options.geometryOptions.innerRadius) / 2, options.geometryOptions.thetaSegments, options.geometryOptions.phiSegments), scope.materialType, mass);

            break;
        case "shape":

            scope.mesh = new THREE.Mesh(new THREE.ShapeGeometry(options.geometryOptions.shapes), scope.materialType);

            scope.onlyvis = true;

            // WARN: console | 2d to 3d.
            console.warn('This is not physic object. 2D!', [scope]);

            break;
        case "tetrahedron":

            api.extend(options.geometryOptions, {

                radius: 1,
                detail: 0

            });

            scope.mesh = new Physijs.ConvexMesh(new THREE.TetrahedronGeometry(options.geometryOptions.radius, options.geometryOptions.detail), scope.materialType, mass);

            break;
        case "text":
            if (!options.geometryOptions.parameters) throw new Error("Missing text parameters");
            scope.mesh = new Physijs.ConcaveMesh(new THREE.TextGeometry(api.extend(options.geometryOptions, {
                text: "Hello World!"
            }), api.extend(options.geometryOptions.parameters, {
                size: 1,
                height: 50,
                curveSegments: 1,
                font: "Adelle",
                weight: "normal",
                style: "normal",
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8
            })), scope.materialType, masss);

            break;
        case "torus":

            api.extend(options.geometryOptions, {

                radius: 100,
                tube: 40,
                radialSegments: 8,
                tubularSegments: 6,
                arc: Math.PI * 2

            });

            scope.mesh = new Physijs.ConcaveMesh(new THREE.TorusGeometry(options.geometryOptions.radius, options.geometryOptions.tube, options.geometryOptions.radialSegments, options.geometryOptions.tubularSegments, options.geometryOptions.arc), scope.materialType, mass);

            break;
        case "torusknot":

            api.extend(options.geometryOptions, {

                radius: 100,
                tube: 40,
                radialSegments: 64,
                tubularSegments: 8,
                p: 2,
                q: 3,
                heightScale: 1

            });
            scope.mesh = new Physijs.ConvexMesh(new THREE.TorusKnotGeometry(options.geometryOptions.radius, options.geometryOptions.tube, options.geometryOptions.radialSegments, options.geometryOptions.tubularSegments, options.geometryOptions.p, options.geometryOptions.q, options.geometryOptions.heightScale), scope.materialType, mass);

            break;
        case "tube":

            scope.CustomSinCurve = THREE.Curve.create(function(scale) {
                //custom curve constructor
                this.scale = scale || 1;
            }, function(t) {
                //getPoint: t is between 0-1
                var tx = t * 3 - 1.5,
                    ty = Math.sin(2 * Math.PI * t),
                    tz = 0;

                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            });

            api.extend(options.geometryOptions, {

                path: options.geometryOptions.path ? new this.CustomSinCurve(100) : false,
                segments: 20,
                radius: 2,
                radiusSegments: 8,
                closed: false

            });

            scope.mesh = new Physijs.ConcaveMesh(new THREE.TubeGeometry(options.geometryOptions.path, options.geometryOptions.segments, options.geometryOptions.radius, options.geometryOptions.radiusSegments, options.geometryOptions.closed), scope.materialType, masss);

            break;
    }

    scope.addCompoundFace = function() {

        this.compoundFace = new THREE.Geometry();
        this.compoundFace.faces.push(new THREE.Face3(0, 1, 2));

        var boundingBox = new THREE.Box3().setFromObject(this.visible),
            boxAround = new THREE.BoxGeometry(boundingBox.max.x - boundingBox.min.x, boundingBox.max.y - boundingBox.min.y, boundingBox.max.z - boundingBox.min.z);

        var vec1 = boxAround.vertices[boxAround.faces[7].a].add(this.visible.position);

        var vec2 = boxAround.vertices[boxAround.faces[7].b].add(this.visible.position);

        var vec3 = boxAround.vertices[boxAround.faces[7].c].add(this.visible.position);

        this.compoundFace.vertices.push(vec1);
        this.compoundFace.vertices.push(vec2);
        this.compoundFace.vertices.push(vec3);
        //this.compoundFace.vertices.push(new THREE.Vector3(0,1,2));
    };

    scope.build(scope.mesh).wrap();

    return scope;
};

// TODO: Improve Grass object.
/**
 * ADDGRASS.
 *
 * @param {Object} ground WHS ground object @addGround. (REQUIRED)
 * @param {Object} options Options of fog object. (REQUIRED)
 * @returns {Object} This element scope/statement.
 */
WHS.init.prototype.addGrass = function(ground, options) {

    'use strict';

    var scope = {};
    scope.root = this;
    scope.opts = options;

    scope.onlyvis = true;

    if (!scope.opts.coords) console.warn('Please add grass objects coordinates! @addGrass');

    scope.grassMeshes = [];

    var globalGrass = new THREE.Mesh(new THREE.Geometry(), new THREE.MeshFaceMaterial());

    scope.opts.coords.forEach(function(coord) {
        var mesh = new THREE.Mesh(new THREE.Geometry(), new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture("assets/textures/thingrass.png"),
            side: THREE.DoubleSide,
            blending: THREE.NormalBlending,
            transparent: true,
            alphaTest: 0.5
        }));

        var intr = WHS.API.getheight({
            x: coord.x,
            y: coord.y
        }, 500, ground, -1)[0];

        var faceVertices = intr.object.geometry.vertices;

        var faceInGeometry = new THREE.Geometry();
        faceInGeometry.faces.push(new THREE.Face3(0, 1, 2));
        faceInGeometry.vertices.push(faceVertices[intr.face.a]);
        faceInGeometry.vertices.push(faceVertices[intr.face.c]);
        faceInGeometry.vertices.push(faceVertices[intr.face.b]);
        faceInGeometry.computeFaceNormals();

        /*var faceIn = new THREE.Mesh(
            faceInGeometry, // Face geomtery.
            new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide})
        );
          var vecN = intr.point.clone().add(faceInGeometry.faces[0].normal);
        var rotN = faceInGeometry.faces[0].normal; //.normalize();
          var nlGeometry = new THREE.Geometry();
        nlGeometry.vertices = [
            intr.point,
            vecN.clone()
        ];
          var normalLine = new THREE.Line(
            nlGeometry,
            new THREE.MeshBasicMaterial({color: 0x000000})
        );*/

        mesh.position.set(0, 0, 0);
        mesh.geometry.vertices.push(faceVertices[intr.face.a].clone());
        mesh.geometry.vertices.push(faceVertices[intr.face.c].clone());

        mesh.geometry.vertices.push(faceVertices[intr.face.a].clone().add(faceInGeometry.faces[0].normal));

        mesh.geometry.vertices.push(faceVertices[intr.face.c].clone().add(faceInGeometry.faces[0].normal));

        var dVec = new THREE.Vector3(faceVertices[intr.face.a].clone().x / 2 + faceVertices[intr.face.c].clone().x / 2, faceVertices[intr.face.a].clone().y / 2 + faceVertices[intr.face.c].clone().y / 2, faceVertices[intr.face.a].clone().z / 2 + faceVertices[intr.face.c].clone().z / 2);

        mesh.geometry.vertices.push(dVec.clone().add(dVec.clone().sub(faceVertices[intr.face.b].clone())));

        mesh.geometry.vertices.push(faceVertices[intr.face.b].clone());
        mesh.geometry.vertices.push(faceVertices[intr.face.b].clone().add(faceInGeometry.faces[0].normal));
        mesh.geometry.vertices.push(dVec.clone().add(dVec.clone().sub(faceVertices[intr.face.b].clone())).add(faceInGeometry.faces[0].normal));

        mesh.geometry.faces.push(new THREE.Face3(0, 1, 2));
        mesh.geometry.faces.push(new THREE.Face3(1, 2, 3));
        mesh.geometry.faces.push(new THREE.Face3(4, 6, 5));
        mesh.geometry.faces.push(new THREE.Face3(4, 6, 7));

        mesh.geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(0, 1)]);

        mesh.geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)]);

        mesh.geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(1, 0)]);

        mesh.geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)]);

        mesh.geometry.uvsNeedUpdate = true;

        //scope.root.scene.add(faceIn);
        //scope.root.scene.add(normalLine);
        //scope.root.scene.add(mesh);

        globalGrass.geometry.merge(mesh.geometry, mesh.matrix);
        globalGrass.material.materials.push(mesh.material);
        scope.grassMeshes.push(mesh);
    });

    scope.wrap(globalGrass);

    // Section under construction. (animation of Grass).
    // #TODO:0 Add grass animation.
    scope.update = function() {
        /*requestAnimationFrame(scope.update);
          var delta = 0;
        var oldTime = 0;
          var time = new Date().getTime();
        delta = time - oldTime;
        oldTime = time;
          if (isNaN(delta) || delta > 1000 || delta == 0 ) {
                delta = 1000/60;
        }*/
    };

    scope.update();

    return scope;
};

/**
 * Ground.
 *
 * @param {String} type Ground/Terrain type. (REQUIRED)
 * @param {Object} size Size of ground. (REQUIRED)
 * @param {Object} material Material type and options. (REQUIRED)
 * @param {Object} pos Position of ground in 3D space. (REQUIRED)
 * @return {Object} Scope.
 */
WHS.init.prototype.addGround = function(type, size, material, pos) {

    'use strict';

    var options = {
        pos: pos
    };

    var scope = new api.construct(this, options, type);

    scope.skip = true;

    api.extend({
        width: 100,
        height: 100
    }, size);

    scope.materialType = api.loadMaterial(material)._material;

    switch (type) {
        case "smooth":

            //scope.mesh = new Physijs.PlaneMesh(
            //  new THREE.PlaneGeometry(size.width, size.height, 1, 1),
            //scope.materialType, 0);

            scope.mesh = new Physijs.BoxMesh(new THREE.BoxGeometry(size.width, 1, size.height), scope.materialType, 0);

            //scope._rot.set(-90 / 180 * Math.PI, 0, 0);

            break;

        case "terrain":

            var canvas = document.createElement('canvas');

            canvas.setAttribute("width", size.width);
            canvas.setAttribute("height", size.height);

            if (canvas.getContext) {

                var ctx = canvas.getContext('2d');

                ctx.drawImage(size.terrain, 0, 0);
            }

            // Ocean texture.
            var oceanTexture = api.TextureLoader().load(scope.root._settings.assets + '/textures/terrain/dirt-512.jpg');

            oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping;

            // Sandy texture.
            var sandyTexture = api.TextureLoader().load(scope.root._settings.assets + '/textures/terrain/sand-512.jpg');

            sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping;

            // Grass texture.
            var grassTexture = api.TextureLoader().load(scope.root._settings.assets + '/textures/terrain/grass-512.jpg');

            grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

            // Rocky texture.
            var rockyTexture = api.TextureLoader().load(scope.root._settings.assets + '/textures/terrain/rock-512.jpg');

            rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping;

            // Snowy texture.
            var snowyTexture = api.TextureLoader().load(scope.root._settings.assets + '/textures/terrain/snow-512.jpg');

            snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping;

            // Normal Map.
            var normalShader = THREE.NormalMapShader;

            var rx = 256,
                ry = 256;

            var pars = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,

                format: THREE.RGBFormat
            };

            // Heightmap.
            var heightMap = new THREE.WebGLRenderTarget(rx, ry, pars);

            heightMap.texture = api.TextureLoader().load(scope.root._settings.assets + '/terrain/default_terrain.png');

            // Normalmap.
            var normalMap = new THREE.WebGLRenderTarget(rx, ry, pars);

            normalMap.texture = api.TextureLoader().load(scope.root._settings.assets + '/terrain/NormalMap.png');

            // Specularmap.
            var specularMap = new THREE.WebGLRenderTarget(256, 256, pars); //2048

            specularMap.texture = api.TextureLoader().load(scope.root._settings.assets + '/terrain/default_terrain.png');

            // Terrain shader (ShaderTerrain.js).
            var terrainShader = THREE.ShaderTerrain["terrain"];

            var uniformsTerrain = Object.assign(THREE.UniformsUtils.clone(terrainShader.uniforms), {
                oceanTexture: {
                    type: "t",
                    value: oceanTexture
                },
                sandyTexture: {
                    type: "t",
                    value: sandyTexture
                },
                grassTexture: {
                    type: "t",
                    value: grassTexture
                },
                rockyTexture: {
                    type: "t",
                    value: rockyTexture
                },
                snowyTexture: {
                    type: "t",
                    value: snowyTexture
                },
                fog: true,
                lights: true
            }, THREE.UniformsLib['common'], THREE.UniformsLib['fog'], THREE.UniformsLib['lights'], THREE.UniformsLib['shadowmap'], {
                ambient: {
                    type: "c",
                    value: new THREE.Color(0xffffff)
                },
                emissive: {
                    type: "c",
                    value: new THREE.Color(0x000000)
                },
                wrapRGB: {
                    type: "v3",
                    value: new THREE.Vector3(1, 1, 1)
                }
            });

            uniformsTerrain["tDisplacement"].value = heightMap;
            uniformsTerrain["shadowMap"].value = [normalMap];

            uniformsTerrain["uDisplacementScale"].value = 100;
            uniformsTerrain["uRepeatOverlay"].value.set(6, 6);

            var material = new THREE.ShaderMaterial({

                uniforms: uniformsTerrain,
                vertexShader: terrainShader.vertexShader,
                fragmentShader: terrainShader.fragmentShader,
                lights: true,
                fog: true,
                side: THREE.DoubleSide,
                shading: THREE.SmoothShading

            });

            var geom = new THREE.PlaneGeometry(256, 256, 255, 255);

            geom.verticesNeedUpdate = true;

            scope._rot.set(Math.PI / 180 * -90, 0, 0);

            var index = 0,
                i = 0,
                imgdata = ctx.getImageData(0, 0, 256, 256).data;

            for (var x = 0; x <= 255; x++) {
                for (var y = 255; y >= 0; y--) {
                    geom.vertices[index].z = imgdata[i] / 255 * 100;

                    i += 4;
                    index++;
                }
            }

            scope.mesh = new Physijs.HeightfieldMesh(geom, Physijs.createMaterial(material, 0.8, 0.1));

            geom.computeVertexNormals();
            geom.computeFaceNormals();
            geom.computeTangents();

            scope.mesh.updateMatrix();
            scope.mesh.castShadow = true;
            scope.mesh.receiveShadow = true;

            break;
    }

    scope.build(scope.mesh).wrap();

    return scope;
};

/**
 * ADDFOG.
 *
 * @param {String} type Fog type (name). (REQUIRED)
 * @param {Object} params Options of fog object. (REQUIRED)
 * @returns {Object} This element scope/statement.
 */
WHS.init.prototype.addFog = function(type, params) {

    'use strict';

    var scope = {};
    api.extend(params, {
        hex: 0x000000, //Default hex
        near: 0.015, //Default near
        far: 1000, //Default far
        density: 0.00025
    });

    switch (type) {
        case "fog":
            scope = new THREE.Fog(params.hex, params.near, params.far);
            break;

        case "fogexp2":
            scope = new THREE.FogExp2(params.hex, params.density);
            break;
    }

    return scope;
};

/**
 * Light.
 *
 * @param {String} type Light type. (REQUIRED)
 * @param {Object} opts Parameters of light dot. (OPTIONAL)
 * @param {Object} pos Position of light dot. (OPTIONAL)
 * @param {Object} target Target of light dot. (OPTIONAL)
 * @return {Object} Scope.
 */
WHS.init.prototype.addLight = function(type, opts) {

    'use strict';

    var scope = new api.construct(this, opts, type);

    //Do not need the option variable, opts is by this statement, gained default values
    api.extend(opts, {
        color: 0xffffff,
        skyColor: 0xffffff,
        groundColor: 0xffffff,

        intensity: 1,
        distance: 100,
        angle: Math.PI / 3,

        shadowmap: {
            cast: true,

            bias: 0.0001,

            width: 1024,
            height: 1024,

            near: true,
            far: 400,
            fov: 60,
            darkness: 0.3,

            top: 200,
            bottom: -200,
            left: -200,
            right: 200
        }
    });

    switch (type) {
        case "ambient":
            scope.mesh = new THREE.AmbientLight(0xffffff);
            break;

        case "directional":
            scope.mesh = new THREE.DirectionalLight(opts.color, opts.intensity);

            break;

        case "hemisphere":
            scope.mesh = new THREE.HemisphereLight(opts.skyColor, opts.groundColor, opts.intensity);

            break;

        case "light":
            scope.mesh = new THREE.Light(opts.color);

            break;

        case "point":
            scope.mesh = new THREE.PointLight(opts.color, opts.intensity, opts.distance);

            break;

        case "spot":
            scope.mesh = new THREE.SpotLight(opts.color, opts.intensity, opts.distance, opts.angle);

            break;
    }

    //scope.mesh.shadowCameraVisible = true;

    scope.mesh.castShadow = opts.shadowmap.cast;

    // #FIXME:20 Shadow default parameters.
    scope.mesh.shadowMapWidth = opts.shadowmap.width;
    scope.mesh.shadowMapHeight = opts.shadowmap.height;
    scope.mesh.shadowBias = opts.shadowmap.bias;

    scope.mesh.shadowCameraNear = opts.shadowmap.near;
    scope.mesh.shadowCameraFar = opts.shadowmap.far;
    scope.mesh.shadowCameraFov = opts.shadowmap.fov;
    scope.mesh.shadowDarkness = opts.shadowmap.darkness;

    scope.mesh.shadowCameraLeft = opts.shadowmap.left;
    scope.mesh.shadowCameraRight = opts.shadowmap.right;
    scope.mesh.shadowCameraTop = opts.shadowmap.top;
    scope.mesh.shadowCameraBottom = opts.shadowmap.bottom;

    if (scope.mesh.target) scope.mesh.target.position.set(scope._target.x, scope._target.y, scope._target.z);

    scope.build().wrap();

    return scope;
};

/**
 * Wagner.
 *
 * @param {Object} wagnerjs *WAGNER.JS*. (REQUIRED)
 * @param {Object} type Type of wagner effect. (REQUIRED)
 * @param {Object} params Parameters. (OPTIONAL)
 * @return {Object} Scope.
 */
WHS.init.prototype.addWagner = function(wagnerjs, type, params) {

    'use strict';

    params = params || {};

    var scope = {
        _composer: this._composer
    };

    var target = api.extend(params, {
        hex: 0x000000,
        near: 0.015,
        far: 1000,
        density: 0.00025
    });

    switch (type) {
        case "zoomBlurPass":
            scope.effect = new wagnerjs.ZoomBlurPass();

            target = api.extend(target, {
                strength: .05,

                center: {
                    x: .5 * this._composer.width,
                    y: .5 * this._composer.height
                }
            });

            break;

        case "multiPassBloomPass":
            scope.effect = new wagnerjs.MultiPassBloomPass();

            target = api.extend(target, {
                strength: .5,
                blurAmount: 1.32,
                applyZoomBlur: true,
                zoomBlurStrength: 0.84,
                useTexture: true,

                center: {
                    x: .5 * this._composer.width,
                    y: .5 * this._composer.height
                }
            });

            scope.effect.glowTexture = wagnerjs.Pass.prototype.getOfflineTexture(this._composer.width, this._composer.height, false);

            break;

        case "vignettePass":
            scope.effect = new wagnerjs.VignettePass();

            target = api.extend(target, {
                amount: 0.7,
                falloff: 0.2
            });

            break;

        case "directionalBlurPass":
            scope.effect = new wagnerjs.DirectionalBlurPass();

            target = api.extend(target, {
                delta: 0.1
            });

            break;

        case "motionBlurPass":
            scope.effect = new wagnerjs.DirectionalBlurPass();

            scope.motionBlurEnable = true;

            target = api.extend(target, {
                delta: 0
            });

            break;

        case "ASCIIPass":
            scope.effect = new wagnerjs.ASCIIPass();

            break;

        case "dotScreenPass":
            scope.effect = new wagnerjs.DotScreenPass();

            break;

        case "fxaaPass":
            scope.effect = new wagnerjs.FXAAPass();

            break;

        case "chromaticAberrationPass":
            scope.effect = new wagnerjs.ChromaticAberrationPass();

            break;

        case "dirtPass":
            scope.effect = new wagnerjs.DirtPass();

            break;

        case "edgeDetectionPass":
            scope.effect = new wagnerjs.SobelEdgeDetectionPass();

            break;

        case "highPassPass":
            scope.effect = new wagnerjs.HighPassPass();

            break;
        case "grayscalePass":
            scope.effect = new wagnerjs.GrayscalePass();

            break;
        case "halftonePass":
            scope.effect = new wagnerjs.HalftonePass();

            break;
        case "invertPass":
            scope.effect = new wagnerjs.InvertPass();

            break;

        default:
            console.warn("No Wagner effect \"" + type + "\" exists. If it should exist, open an issue. (@addWagner)");

            return;
    }

    scope.effect.params = target;

    this._composer.pass(scope.effect);
    this._composer.toScreen();

    scope.apply = function() {
        this._composer.eff.push(scope.effect);

        return scope;
    };

    return scope;
};

/**
 * MAKEFIRSTPERSON.
 *
 * @param {Object} object *WHS* figure/object. (REQUIRED)
 */

var PI_2 = Math.PI / 2;

WHS.init.prototype.MakeFirstPerson = function(object, params) {

    'use strict';

    var target = WHS.API.extend(params, {
        block: document.getElementById('blocker'),
        speed: 1,
        ypos: 1
    });

    this.controls = new function(camera, mesh, params) {

        /* Velocity properties */
        var velocityFactor = 1,
            runVelocity = 0.25;

        mesh.setAngularFactor({
            x: 0,
            y: 0,
            z: 0
        });

        /* Init */
        var scope = this,
            pitchObject = new THREE.Object3D();

        pitchObject.add(camera);

        var yawObject = new THREE.Object3D();

        yawObject.position.y = params.ypos; // eyes are 2 meters above the ground
        yawObject.add(pitchObject);

        var quat = new THREE.Quaternion(),
            moveForward = false,
            moveBackward = false,
            moveLeft = false,
            moveRight = false,
            canJump = false;

        mesh.addEventListener("collision", function(other_object, v, r, contactNormal) {

            if (contactNormal.y < 0.5) // Use a "good" threshold value between 0 and 1 here!
                canJump = true;
        });

        function onMouseMove(event) {
            if (scope.enabled === false) return;

            var movementX = event.movementX || event.mozMovementX || event.getMovementX() || 0,
                movementY = event.movementY || event.mozMovementY || event.getMovementY() || 0;

            yawObject.rotation.y -= movementX * 0.002, pitchObject.rotation.x -= movementY * 0.002;

            pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
        };

        function onKeyDown(event) {

            switch (event.keyCode) {

                case 38: // up
                case 87:
                    // w
                    moveForward = true;
                    break;

                case 37: // left
                case 65:
                    // a
                    moveLeft = true;
                    break;

                case 40: // down
                case 83:
                    // s
                    moveBackward = true;
                    break;

                case 39: // right
                case 68:
                    // d
                    moveRight = true;
                    break;

                case 32:
                    // space
                    if (canJump == true) {

                        mesh.applyCentralImpulse({
                            x: 0,
                            y: 300,
                            z: 0
                        });
                    }

                    canJump = false;

                    break;

                case 15:
                    // shift

                    runVelocity = 0.5;
                    break;

            }
        };

        function onKeyUp(event) {
            switch (event.keyCode) {

                case 38: // up
                case 87:
                    // w
                    moveForward = false;
                    break;

                case 37: // left
                case 65:
                    // a
                    moveLeft = false;
                    break;

                case 40: // down
                case 83:
                    // a
                    moveBackward = false;
                    break;

                case 39: // right
                case 68:
                    // d
                    moveRight = false;
                    break;

                case 15:
                    // shift
                    runVelocity = 0.25;
                    break;

            }
        };

        document.body.addEventListener('mousemove', onMouseMove, false);
        document.body.addEventListener('keydown', onKeyDown, false);
        document.body.addEventListener('keyup', onKeyUp, false);

        this.enabled = false;

        this.getObject = function() {
            return yawObject;
        };

        this.getDirection = function(targetVec) {
            targetVec.set(0, 0, -1);
            quat.multiplyVector3(targetVec);
        };

        // Moves the camera to the Cannon.js object position
        // and adds velocity to the object if the run key is down.
        var inputVelocity = new THREE.Vector3(),
            euler = new THREE.Euler();

        this.update = function(delta) {

            var moveVec = new THREE.Vector3();

            if (scope.enabled === false) return;

            delta = delta || 0.5;
            delta = Math.min(delta, 0.5);

            inputVelocity.set(0, 0, 0);

            var speed = velocityFactor * delta * params.speed * runVelocity;

            if (moveForward) {
                inputVelocity.z = -speed;
            }

            if (moveBackward) {
                inputVelocity.z = speed;
            }

            if (moveLeft) {
                inputVelocity.x = -speed;
            }

            if (moveRight) {
                inputVelocity.x = speed;
            }

            // Convert velocity to world coordinates
            euler.x = pitchObject.rotation.x, euler.y = yawObject.rotation.y, euler.order = "XYZ";

            quat.setFromEuler(euler);

            inputVelocity.applyQuaternion(quat);

            mesh.applyCentralImpulse({
                x: inputVelocity.x * 10,
                y: 0,
                z: inputVelocity.z * 10
            });
            mesh.setAngularVelocity({
                x: inputVelocity.z * 10,
                y: 0,
                z: -inputVelocity.x * 10
            });

            yawObject.position.copy(mesh.position);
        };
    }(this._camera, object.mesh, target);

    var controls = this.controls;

    WHS.API.merge(this.scene, this.controls.getObject());

    if ('pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document) {

        var element = document.body;

        this.pointerlockchange = function() {
            if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

                controls.enabled = true;

                target.block.fadeOut();
            } else {

                controls.enabled = false;

                target.block.fadeIn();
            }
        };
    } else {

        console.warn("Your browser does not support the PointerLock API.");
    }

    document.addEventListener('pointerlockchange', this.pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', this.pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', this.pointerlockchange, false);

    this.pointerlockerror = function() {
        console.warn("Pointer lock error.");
    };

    document.addEventListener('pointerlockerror', this.pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', this.pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', this.pointerlockerror, false);

    target.block.addEventListener('click', function() {

        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

        if (/Firefox/i.test(navigator.userAgent)) {

            var fullscreenchange = function fullscreenchange() {
                if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {

                    document.removeEventListener('fullscreenchange', fullscreenchange);
                    document.removeEventListener('mozfullscreenchange', fullscreenchange);

                    element.requestPointerLock();
                }
            };

            document.addEventListener('fullscreenchange', fullscreenchange, false);
            document.addEventListener('mozfullscreenchange', fullscreenchange, false);

            element.requestFullscreen();
        } else element.requestPointerLock();
    });
};

/**
 * ORBITCONTROLS.
 *
 * @param {Object} object Description. (OPTIONAL)
 */
WHS.init.prototype.OrbitControls = function(object) {

    this.controls = new THREE.OrbitControls(this._camera, this.renderer.domElement);

    if (object) {

        if (object._whsobject) {

            var target = object ? object.mesh.position : new THREE.Vector3(0, 0, 0);
            this.controls.target = target;
        } else if ((typeof object === "undefined" ? "undefined" : _typeof(object)) == "object") this.controls.target.copy(target);
        else console.error("Object must be a THREE.JS vector! @OrbitControls");
    }
};

/**
 * Adds a skybox to the WhitestormJS scene.
 * @param {Object} options - Skybox options.
 * @param {String} options.src - Skybox image source.
 * @param {String} options.imgSuffix - Skybox image suffix (.png, .jpg, etc.)
 * @param {String} options.skyType - Type of sky. Either box or sphere.
 * @returns {Object} scope - Scope.
 */
WHS.init.prototype.addSkybox = function(options) {

    'use strict';

    options.skyType = options.skyType || "box";

    options.imgSuffix = options.skyType == "box" ? options.imgSuffix || ".png" : options.imgSuffix || "";

    var scope = new api.construct(this, options, "skybox");
    scope.skip = true;

    var skyGeometry, skyMat;

    switch (options.skyType) {
        case "box":
            var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
            skyGeometry = new THREE.CubeGeometry(this._camera.far, this._camera.far, this._camera.far);
            var matArray = [];

            for (var i = 0; i < 6; i++) {

                matArray.push(new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(options.src + directions[i] + options.imgSuffix),
                    side: THREE.BackSide
                }));
            }

            skyMat = new THREE.MeshFaceMaterial(matArray);

            break;
        case "sphere":

            skyGeometry = new THREE.SphereGeometry(this._camera.far / 2, 60, 40);

            skyMat = new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(options.src + options.imgSuffix),
                side: THREE.BackSide
            });

            break;
    }

    scope.mesh = new THREE.Mesh(skyGeometry, skyMat);
    scope.mesh.renderDepth = 1000.0;

    scope.build().wrap();

    return scope;
};