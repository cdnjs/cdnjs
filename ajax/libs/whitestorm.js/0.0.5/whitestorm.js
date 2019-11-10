/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
 */

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

        vertexShader: [

            "varying vec2 vUv;",

            "void main() {",

            "	vUv = vec2( uv.x, uv.y );",
            "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

            "}"

        ].join("\n"),

        fragmentShader: [

            "uniform sampler2D mapLeft;",
            "uniform sampler2D mapRight;",
            "varying vec2 vUv;",

            "void main() {",

            "	vec4 colorL, colorR;",
            "	vec2 uv = vUv;",

            "	colorL = texture2D( mapLeft, uv );",
            "	colorR = texture2D( mapRight, uv );",

            // http://3dtv.at/Knowhow/AnaglyphComparison_en.aspx

            "	gl_FragColor = vec4( colorL.g * 0.7 + colorL.b * 0.3, colorR.g, colorR.b, colorL.a + colorR.a ) * 1.1;",

            "}"

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

        var hasCameraChanged = (_aspect !== camera.aspect) || (_near !== camera.near) || (_far !== camera.far) || (_fov !== camera.fov);

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
    }

};

/* global CANNON,THREE,Detector */

/**
 * Adds Three.js primitives into the scene where all the Cannon bodies and shapes are.
 * @class CannonDebugRenderer
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world
 * @param {object} [options]
 */
THREE.CannonDebugRenderer = function(scene, world, options) {
    options = options || {};

    this.scene = scene;
    this.world = world;

    this._meshes = [];

    this._material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    });
    this._sphereGeometry = new THREE.SphereGeometry(1);
    this._boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    this._planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    this._cylinderGeometry = new THREE.CylinderGeometry(1, 1, 10, 10);
};

THREE.CannonDebugRenderer.prototype = {

    tmpVec0: new CANNON.Vec3(),
    tmpVec1: new CANNON.Vec3(),
    tmpVec2: new CANNON.Vec3(),
    tmpQuat0: new CANNON.Vec3(),

    update: function() {

        var bodies = this.world.bodies;
        var meshes = this._meshes;
        var shapeWorldPosition = this.tmpVec0;
        var shapeWorldQuaternion = this.tmpQuat0;

        var meshIndex = 0;

        for (var i = 0; i !== bodies.length; i++) {
            var body = bodies[i];

            for (var j = 0; j !== body.shapes.length; j++) {
                var shape = body.shapes[j];

                this._updateMesh(meshIndex, body, shape);

                var mesh = meshes[meshIndex];

                if (mesh) {

                    // Get world position
                    body.quaternion.vmult(body.shapeOffsets[j], shapeWorldPosition);
                    body.position.vadd(shapeWorldPosition, shapeWorldPosition);

                    // Get world quaternion
                    body.quaternion.mult(body.shapeOrientations[j], shapeWorldQuaternion);

                    // Copy to meshes
                    mesh.position.copy(shapeWorldPosition);
                    mesh.quaternion.copy(shapeWorldQuaternion);
                }

                meshIndex++;
            }
        }

        for (var i = meshIndex; i < meshes.length; i++) {
            var mesh = meshes[i];
            if (mesh) {
                this.scene.remove(mesh);
            }
        }

        meshes.length = meshIndex;
    },

    _updateMesh: function(index, body, shape) {
        var mesh = this._meshes[index];
        if (!this._typeMatch(mesh, shape)) {
            if (mesh) {
                this.scene.remove(mesh);
            }
            mesh = this._meshes[index] = this._createMesh(shape);
        }
        this._scaleMesh(mesh, shape);
    },

    _typeMatch: function(mesh, shape) {
        if (!mesh) {
            return false;
        }
        var geo = mesh.geometry;
        return (
            (geo instanceof THREE.SphereGeometry && shape instanceof CANNON.Sphere) ||
            (geo instanceof THREE.BoxGeometry && shape instanceof CANNON.Box) ||
            (geo instanceof THREE.PlaneGeometry && shape instanceof CANNON.Plane) ||
            (geo.id === shape.geometryId && shape instanceof CANNON.ConvexPolyhedron) ||
            (geo.id === shape.geometryId && shape instanceof CANNON.Trimesh) ||
            (geo.id === shape.geometryId && shape instanceof CANNON.Heightfield)
        );
    },

    _createMesh: function(shape) {
        var mesh;
        var material = this._material;

        switch (shape.type) {

            case CANNON.Shape.types.SPHERE:
                mesh = new THREE.Mesh(this._sphereGeometry, material);
                break;

            case CANNON.Shape.types.BOX:
                mesh = new THREE.Mesh(this._boxGeometry, material);
                break;

            case CANNON.Shape.types.PLANE:
                mesh = new THREE.Mesh(this._planeGeometry, material);
                break;

            case CANNON.Shape.types.CONVEXPOLYHEDRON:
                // Create mesh
                var geo = new THREE.Geometry();

                // Add vertices
                for (var i = 0; i < shape.vertices.length; i++) {
                    var v = shape.vertices[i];
                    geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
                }

                for (var i = 0; i < shape.faces.length; i++) {
                    var face = shape.faces[i];

                    // add triangles
                    var a = face[0];
                    for (var j = 1; j < face.length - 1; j++) {
                        var b = face[j];
                        var c = face[j + 1];
                        geo.faces.push(new THREE.Face3(a, b, c));
                    }
                }
                geo.computeBoundingSphere();
                geo.computeFaceNormals();

                mesh = new THREE.Mesh(geo, material);
                shape.geometryId = geo.id;
                break;

            case CANNON.Shape.types.TRIMESH:
                var geometry = new THREE.Geometry();
                var v0 = this.tmpVec0;
                var v1 = this.tmpVec1;
                var v2 = this.tmpVec2;
                for (var i = 0; i < shape.indices.length / 3; i++) {
                    shape.getTriangleVertices(i, v0, v1, v2);
                    geometry.vertices.push(
                        new THREE.Vector3(v0.x, v0.y, v0.z),
                        new THREE.Vector3(v1.x, v1.y, v1.z),
                        new THREE.Vector3(v2.x, v2.y, v2.z)
                    );
                    var j = geometry.vertices.length - 3;
                    geometry.faces.push(new THREE.Face3(j, j + 1, j + 2));
                }
                geometry.computeBoundingSphere();
                geometry.computeFaceNormals();
                mesh = new THREE.Mesh(geometry, material);
                shape.geometryId = geometry.id;
                break;

            case CANNON.Shape.types.HEIGHTFIELD:
                var geometry = new THREE.Geometry();

                var v0 = this.tmpVec0;
                var v1 = this.tmpVec1;
                var v2 = this.tmpVec2;
                for (var xi = 0; xi < shape.data.length - 1; xi++) {
                    for (var yi = 0; yi < shape.data[xi].length - 1; yi++) {
                        for (var k = 0; k < 2; k++) {
                            shape.getConvexTrianglePillar(xi, yi, k === 0);
                            v0.copy(shape.pillarConvex.vertices[0]);
                            v1.copy(shape.pillarConvex.vertices[1]);
                            v2.copy(shape.pillarConvex.vertices[2]);
                            v0.vadd(shape.pillarOffset, v0);
                            v1.vadd(shape.pillarOffset, v1);
                            v2.vadd(shape.pillarOffset, v2);
                            geometry.vertices.push(
                                new THREE.Vector3(v0.x, v0.y, v0.z),
                                new THREE.Vector3(v1.x, v1.y, v1.z),
                                new THREE.Vector3(v2.x, v2.y, v2.z)
                            );
                            var i = geometry.vertices.length - 3;
                            geometry.faces.push(new THREE.Face3(i, i + 1, i + 2));
                        }
                    }
                }
                geometry.computeBoundingSphere();
                geometry.computeFaceNormals();
                mesh = new THREE.Mesh(geometry, material);
                shape.geometryId = geometry.id;
                break;
        }

        if (mesh) {
            this.scene.add(mesh);
        }

        return mesh;
    },

    _scaleMesh: function(mesh, shape) {
        switch (shape.type) {

            case CANNON.Shape.types.SPHERE:
                var radius = shape.radius;
                mesh.scale.set(radius, radius, radius);
                break;

            case CANNON.Shape.types.BOX:
                mesh.scale.copy(shape.halfExtents);
                mesh.scale.multiplyScalar(2);
                break;

            case CANNON.Shape.types.CONVEXPOLYHEDRON:
                mesh.scale.set(1, 1, 1);
                break;

            case CANNON.Shape.types.TRIMESH:
                mesh.scale.copy(shape.scale);
                break;

            case CANNON.Shape.types.HEIGHTFIELD:
                mesh.scale.set(1, 1, 1);
                break;

        }
    }
};

/*

Superfast Blur - a fast Box Blur For Canvas

Version: 	0.5
Author:		Mario Klingemann
Contact: 	mario@quasimondo.com
Website:	http://www.quasimondo.com/BoxBlurForCanvas
Twitter:	@quasimondo

In case you find this class useful - especially in commercial projects -
I am not totally unhappy for a small donation to my PayPal account
mario@quasimondo.de

Or support me on flattr:
https://flattr.com/thing/140066/Superfast-Blur-a-pretty-fast-Box-Blur-Effect-for-CanvasJavascript

Copyright (c) 2011 Mario Klingemann

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
var mul_table = [1, 57, 41, 21, 203, 34, 97, 73, 227, 91, 149, 62, 105, 45, 39, 137, 241, 107, 3, 173, 39, 71, 65, 238, 219, 101, 187, 87, 81, 151, 141, 133, 249, 117, 221, 209, 197, 187, 177, 169, 5, 153, 73, 139, 133, 127, 243, 233, 223, 107, 103, 99, 191, 23, 177, 171, 165, 159, 77, 149, 9, 139, 135, 131, 253, 245, 119, 231, 224, 109, 211, 103, 25, 195, 189, 23, 45, 175, 171, 83, 81, 79, 155, 151, 147, 9, 141, 137, 67, 131, 129, 251, 123, 30, 235, 115, 113, 221, 217, 53, 13, 51, 50, 49, 193, 189, 185, 91, 179, 175, 43, 169, 83, 163, 5, 79, 155, 19, 75, 147, 145, 143, 35, 69, 17, 67, 33, 65, 255, 251, 247, 243, 239, 59, 29, 229, 113, 111, 219, 27, 213, 105, 207, 51, 201, 199, 49, 193, 191, 47, 93, 183, 181, 179, 11, 87, 43, 85, 167, 165, 163, 161, 159, 157, 155, 77, 19, 75, 37, 73, 145, 143, 141, 35, 138, 137, 135, 67, 33, 131, 129, 255, 63, 250, 247, 61, 121, 239, 237, 117, 29, 229, 227, 225, 111, 55, 109, 216, 213, 211, 209, 207, 205, 203, 201, 199, 197, 195, 193, 48, 190, 47, 93, 185, 183, 181, 179, 178, 176, 175, 173, 171, 85, 21, 167, 165, 41, 163, 161, 5, 79, 157, 78, 154, 153, 19, 75, 149, 74, 147, 73, 144, 143, 71, 141, 140, 139, 137, 17, 135, 134, 133, 66, 131, 65, 129, 1];


var shg_table = [0, 9, 10, 10, 14, 12, 14, 14, 16, 15, 16, 15, 16, 15, 15, 17, 18, 17, 12, 18, 16, 17, 17, 19, 19, 18, 19, 18, 18, 19, 19, 19, 20, 19, 20, 20, 20, 20, 20, 20, 15, 20, 19, 20, 20, 20, 21, 21, 21, 20, 20, 20, 21, 18, 21, 21, 21, 21, 20, 21, 17, 21, 21, 21, 22, 22, 21, 22, 22, 21, 22, 21, 19, 22, 22, 19, 20, 22, 22, 21, 21, 21, 22, 22, 22, 18, 22, 22, 21, 22, 22, 23, 22, 20, 23, 22, 22, 23, 23, 21, 19, 21, 21, 21, 23, 23, 23, 22, 23, 23, 21, 23, 22, 23, 18, 22, 23, 20, 22, 23, 23, 23, 21, 22, 20, 22, 21, 22, 24, 24, 24, 24, 24, 22, 21, 24, 23, 23, 24, 21, 24, 23, 24, 22, 24, 24, 22, 24, 24, 22, 23, 24, 24, 24, 20, 23, 22, 23, 24, 24, 24, 24, 24, 24, 24, 23, 21, 23, 22, 23, 24, 24, 24, 22, 24, 24, 24, 23, 22, 24, 24, 25, 23, 25, 25, 23, 24, 25, 25, 24, 22, 25, 25, 25, 24, 23, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 23, 25, 23, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 24, 22, 25, 25, 23, 25, 25, 20, 24, 25, 24, 25, 25, 22, 24, 25, 24, 25, 24, 25, 25, 24, 25, 25, 25, 25, 22, 25, 25, 25, 24, 25, 24, 25, 18];


function boxBlurImage(img, canvas, radius, blurAlphaChannel, iterations) {

    var w = img.naturalWidth;
    var h = img.naturalHeight;

    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w;
    canvas.height = h;

    var context = canvas.getContext("2d");
    context.clearRect(0, 0, w, h);
    context.drawImage(img, 0, 0);

    if (isNaN(radius) || radius < 1) return;

    if (blurAlphaChannel) {
        boxBlurCanvasRGBA(canvasID, 0, 0, w, h, radius, iterations);
    } else {
        boxBlurCanvasRGB(canvasID, 0, 0, w, h, radius, iterations);
    }

}


function boxBlurCanvasRGBA(canvas, top_x, top_y, width, height, radius, iterations) {
    if (isNaN(radius) || radius < 1) return;

    radius |= 0;

    if (isNaN(iterations)) iterations = 1;
    iterations |= 0;
    if (iterations > 3) iterations = 3;
    if (iterations < 1) iterations = 1;

    var context = canvas.getContext("2d");
    var imageData;

    try {
        try {
            imageData = context.getImageData(top_x, top_y, width, height);
        } catch (e) {

            // NOTE: this part is supposedly only needed if you want to work with local files
            // so it might be okay to remove the whole try/catch block and just use
            // imageData = context.getImageData( top_x, top_y, width, height );
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                imageData = context.getImageData(top_x, top_y, width, height);
            } catch (e) {
                alert("Cannot access local image");
                throw new Error("unable to access local image data: " + e);
                return;
            }
        }
    } catch (e) {
        alert("Cannot access image");
        throw new Error("unable to access image data: " + e);
        return;
    }

    var pixels = imageData.data;

    var rsum, gsum, bsum, asum, x, y, i, p, p1, p2, yp, yi, yw, idx, pa;
    var wm = width - 1;
    var hm = height - 1;
    var wh = width * height;
    var rad1 = radius + 1;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    var r = [];
    var g = [];
    var b = [];
    var a = [];

    var vmin = [];
    var vmax = [];

    while (iterations-- > 0) {
        yw = yi = 0;

        for (y = 0; y < height; y++) {
            rsum = pixels[yw] * rad1;
            gsum = pixels[yw + 1] * rad1;
            bsum = pixels[yw + 2] * rad1;
            asum = pixels[yw + 3] * rad1;


            for (i = 1; i <= radius; i++) {
                p = yw + (((i > wm ? wm : i)) << 2);
                rsum += pixels[p++];
                gsum += pixels[p++];
                bsum += pixels[p++];
                asum += pixels[p]
            }

            for (x = 0; x < width; x++) {
                r[yi] = rsum;
                g[yi] = gsum;
                b[yi] = bsum;
                a[yi] = asum;

                if (y == 0) {
                    vmin[x] = ((p = x + rad1) < wm ? p : wm) << 2;
                    vmax[x] = ((p = x - radius) > 0 ? p << 2 : 0);
                }

                p1 = yw + vmin[x];
                p2 = yw + vmax[x];

                rsum += pixels[p1++] - pixels[p2++];
                gsum += pixels[p1++] - pixels[p2++];
                bsum += pixels[p1++] - pixels[p2++];
                asum += pixels[p1] - pixels[p2];

                yi++;
            }
            yw += (width << 2);
        }

        for (x = 0; x < width; x++) {
            yp = x;
            rsum = r[yp] * rad1;
            gsum = g[yp] * rad1;
            bsum = b[yp] * rad1;
            asum = a[yp] * rad1;

            for (i = 1; i <= radius; i++) {
                yp += (i > hm ? 0 : width);
                rsum += r[yp];
                gsum += g[yp];
                bsum += b[yp];
                asum += a[yp];
            }

            yi = x << 2;
            for (y = 0; y < height; y++) {

                pixels[yi + 3] = pa = (asum * mul_sum) >>> shg_sum;
                if (pa > 0) {
                    pa = 255 / pa;
                    pixels[yi] = ((rsum * mul_sum) >>> shg_sum) * pa;
                    pixels[yi + 1] = ((gsum * mul_sum) >>> shg_sum) * pa;
                    pixels[yi + 2] = ((bsum * mul_sum) >>> shg_sum) * pa;
                } else {
                    pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
                }
                if (x == 0) {
                    vmin[y] = ((p = y + rad1) < hm ? p : hm) * width;
                    vmax[y] = ((p = y - radius) > 0 ? p * width : 0);
                }

                p1 = x + vmin[y];
                p2 = x + vmax[y];

                rsum += r[p1] - r[p2];
                gsum += g[p1] - g[p2];
                bsum += b[p1] - b[p2];
                asum += a[p1] - a[p2];

                yi += width << 2;
            }
        }
    }

    context.putImageData(imageData, top_x, top_y);

}

function boxBlurCanvasRGB(canvas, top_x, top_y, width, height, radius, iterations) {
    if (isNaN(radius) || radius < 1) return;

    radius |= 0;

    if (isNaN(iterations)) iterations = 1;
    iterations |= 0;
    if (iterations > 3) iterations = 3;
    if (iterations < 1) iterations = 1;

    var context = canvas.getContext("2d");
    var imageData;

    try {
        try {
            imageData = context.getImageData(top_x, top_y, width, height);
        } catch (e) {

            // NOTE: this part is supposedly only needed if you want to work with local files
            // so it might be okay to remove the whole try/catch block and just use
            // imageData = context.getImageData( top_x, top_y, width, height );
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                imageData = context.getImageData(top_x, top_y, width, height);
            } catch (e) {
                alert("Cannot access local image");
                throw new Error("unable to access local image data: " + e);
                return;
            }
        }
    } catch (e) {
        alert("Cannot access image");
        throw new Error("unable to access image data: " + e);
        return;
    }

    var pixels = imageData.data;

    var rsum, gsum, bsum, asum, x, y, i, p, p1, p2, yp, yi, yw, idx;
    var wm = width - 1;
    var hm = height - 1;
    var wh = width * height;
    var rad1 = radius + 1;

    var r = [];
    var g = [];
    var b = [];

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    var vmin = [];
    var vmax = [];

    while (iterations-- > 0) {
        yw = yi = 0;

        for (y = 0; y < height; y++) {
            rsum = pixels[yw] * rad1;
            gsum = pixels[yw + 1] * rad1;
            bsum = pixels[yw + 2] * rad1;

            for (i = 1; i <= radius; i++) {
                p = yw + (((i > wm ? wm : i)) << 2);
                rsum += pixels[p++];
                gsum += pixels[p++];
                bsum += pixels[p++];
            }

            for (x = 0; x < width; x++) {
                r[yi] = rsum;
                g[yi] = gsum;
                b[yi] = bsum;

                if (y == 0) {
                    vmin[x] = ((p = x + rad1) < wm ? p : wm) << 2;
                    vmax[x] = ((p = x - radius) > 0 ? p << 2 : 0);
                }

                p1 = yw + vmin[x];
                p2 = yw + vmax[x];

                rsum += pixels[p1++] - pixels[p2++];
                gsum += pixels[p1++] - pixels[p2++];
                bsum += pixels[p1++] - pixels[p2++];

                yi++;
            }
            yw += (width << 2);
        }

        for (x = 0; x < width; x++) {
            yp = x;
            rsum = r[yp] * rad1;
            gsum = g[yp] * rad1;
            bsum = b[yp] * rad1;

            for (i = 1; i <= radius; i++) {
                yp += (i > hm ? 0 : width);
                rsum += r[yp];
                gsum += g[yp];
                bsum += b[yp];
            }

            yi = x << 2;
            for (y = 0; y < height; y++) {
                pixels[yi] = (rsum * mul_sum) >>> shg_sum;
                pixels[yi + 1] = (gsum * mul_sum) >>> shg_sum;
                pixels[yi + 2] = (bsum * mul_sum) >>> shg_sum;

                if (x == 0) {
                    vmin[y] = ((p = y + rad1) < hm ? p : hm) * width;
                    vmax[y] = ((p = y - radius) > 0 ? p * width : 0);
                }

                p1 = x + vmin[y];
                p2 = x + vmax[y];

                rsum += r[p1] - r[p2];
                gsum += g[p1] - g[p2];
                bsum += b[p1] - b[p2];

                yi += width << 2;
            }
        }
    }
    context.putImageData(imageData, top_x, top_y);

}

/**
 * @author mrdoob / http://mrdoob.com/
 * @author schteppe / https://github.com/schteppe
 */
var PointerLockControls = function(camera, cannonBody, alpha, scope) {
    var alpha = alpha || 0.5;
    var eyeYPos = 10; // eyes are 2 meters above the ground
    var velocityFactor = 0.1;
    var jumpVelocity = 5 * alpha;
    var runDelta = 1;
    var goDelta = 2 * runDelta;
    var sScope = this;

    var pitchObject = new scope.threejs.Object3D();
    pitchObject.add(camera);

    var yawObject = new scope.threejs.Object3D();
    yawObject.position.y = 2;
    yawObject.add(pitchObject);

    var quat = new scope.threejs.Quaternion();

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var canJump = false;

    var contactNormal = new scope.cannonjs.Vec3(); // Normal in the contact, pointing *out* of whatever the player touched
    var upAxis = new scope.cannonjs.Vec3(0, 1, 0);
    cannonBody.addEventListener("collide", function(e) {
        var contact = e.contact;

        // contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
        // We do not yet know which one is which! Let's check.
        if (contact.bi.id == cannonBody.id) // bi is the player body, flip the contact normal
            contact.ni.negate(contactNormal);
        else
            contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is

        // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
        if (contactNormal.dot(upAxis) > 0.5) // Use a "good" threshold value between 0 and 1 here!
            canJump = true;
    });

    var velocity = cannonBody.velocity;

    var PI_2 = Math.PI / 2;

    var onMouseMove = function(event) {
        scope.motionBlurEnable = false;

        if (sScope.enabled === false) return;

        var movementX = event.movementX || event.mozMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || 0;

        //event.movementX / 20;
        if (scope.motionBlurEffect)
            scope.motionBlurEffect.params.delta = Math.abs(0.0005 * event.movementX) / 2 + Math.abs(0.0005 * event.movementY) / 2;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
    };

    var onMouseStop = function(event) {
        scope.motionBlurEnable = true;
    }

    var onKeyDown = function(event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if (canJump === true) {
                    velocity.y = jumpVelocity;
                }
                canJump = false;
                break;

            case 15: // shift
                if (canJump === true) {
                    runDelta = 3;
                }
                break;
        }

    };

    var onKeyUp = function(event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // a
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    };

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    $(document).mousestop(100, onMouseStop);

    this.enabled = false;

    this.getObject = function() {
        return yawObject;
    };

    this.getDirection = function(targetVec) {
        targetVec.set(0, 0, -1);
        quat.multiplyVector3(targetVec);
    }

    // Moves the camera to the Cannon.js object position and adds velocity to the object if the run key is down
    var inputVelocity = new scope.threejs.Vector3();
    var euler = new scope.threejs.Euler();
    this.update = function(delta) {

        if (sScope.enabled === false) return;

        delta *= 0.03;

        inputVelocity.set(0, 0, 0);

        if (moveForward) {
            inputVelocity.z = -velocityFactor * delta * alpha * goDelta;
        }
        if (moveBackward) {
            inputVelocity.z = velocityFactor * delta * alpha * goDelta;
        }

        if (moveLeft) {
            inputVelocity.x = -velocityFactor * delta * alpha * goDelta;
        }
        if (moveRight) {
            inputVelocity.x = velocityFactor * delta * alpha * goDelta;
        }

        // Convert velocity to world coordinates
        euler.x = pitchObject.rotation.x;
        euler.y = yawObject.rotation.y;
        euler.order = "XYZ";
        quat.setFromEuler(euler);
        inputVelocity.applyQuaternion(quat);
        //quat.multiplyVector3(inputVelocity);

        // Add to the object
        velocity.x += inputVelocity.x;
        velocity.z += inputVelocity.z;

        yawObject.position.copy(cannonBody.position);
    };
};

if (_typeface_js && _typeface_js.loadFace) _typeface_js.loadFace({
    "glyphs": {
        "ο": {
            "x_min": 0,
            "x_max": 712,
            "ha": 815,
            "o": "m 356 -25 q 96 88 192 -25 q 0 368 0 201 q 92 642 0 533 q 356 761 192 761 q 617 644 517 761 q 712 368 712 533 q 619 91 712 201 q 356 -25 520 -25 m 356 85 q 527 175 465 85 q 583 369 583 255 q 528 562 583 484 q 356 651 466 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 356 85 250 85 "
        },
        "S": {
            "x_min": 0,
            "x_max": 788,
            "ha": 890,
            "o": "m 788 291 q 662 54 788 144 q 397 -26 550 -26 q 116 68 226 -26 q 0 337 0 168 l 131 337 q 200 152 131 220 q 384 85 269 85 q 557 129 479 85 q 650 270 650 183 q 490 429 650 379 q 194 513 341 470 q 33 739 33 584 q 142 964 33 881 q 388 1041 242 1041 q 644 957 543 1041 q 756 716 756 867 l 625 716 q 561 874 625 816 q 395 933 497 933 q 243 891 309 933 q 164 759 164 841 q 325 609 164 656 q 625 526 475 568 q 788 291 788 454 "
        },
        "¦": {
            "x_min": 343,
            "x_max": 449,
            "ha": 792,
            "o": "m 449 462 l 343 462 l 343 986 l 449 986 l 449 462 m 449 -242 l 343 -242 l 343 280 l 449 280 l 449 -242 "
        },
        "/": {
            "x_min": 183.25,
            "x_max": 608.328125,
            "ha": 792,
            "o": "m 608 1041 l 266 -129 l 183 -129 l 520 1041 l 608 1041 "
        },
        "Τ": {
            "x_min": -0.4375,
            "x_max": 777.453125,
            "ha": 839,
            "o": "m 777 893 l 458 893 l 458 0 l 319 0 l 319 892 l 0 892 l 0 1013 l 777 1013 l 777 893 "
        },
        "y": {
            "x_min": 0,
            "x_max": 684.78125,
            "ha": 771,
            "o": "m 684 738 l 388 -83 q 311 -216 356 -167 q 173 -279 252 -279 q 97 -266 133 -279 l 97 -149 q 132 -155 109 -151 q 168 -160 155 -160 q 240 -114 213 -160 q 274 -26 248 -98 l 0 738 l 137 737 l 341 139 l 548 737 l 684 738 "
        },
        "Π": {
            "x_min": 0,
            "x_max": 803,
            "ha": 917,
            "o": "m 803 0 l 667 0 l 667 886 l 140 886 l 140 0 l 0 0 l 0 1012 l 803 1012 l 803 0 "
        },
        "ΐ": {
            "x_min": -111,
            "x_max": 339,
            "ha": 361,
            "o": "m 339 800 l 229 800 l 229 925 l 339 925 l 339 800 m -1 800 l -111 800 l -111 925 l -1 925 l -1 800 m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 737 l 167 737 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 103 239 101 q 284 112 257 104 l 284 3 m 302 1040 l 113 819 l 30 819 l 165 1040 l 302 1040 "
        },
        "g": {
            "x_min": 0,
            "x_max": 686,
            "ha": 838,
            "o": "m 686 34 q 586 -213 686 -121 q 331 -306 487 -306 q 131 -252 216 -306 q 31 -84 31 -190 l 155 -84 q 228 -174 166 -138 q 345 -207 284 -207 q 514 -109 454 -207 q 564 89 564 -27 q 461 6 521 36 q 335 -23 401 -23 q 88 100 184 -23 q 0 370 0 215 q 87 634 0 522 q 330 758 183 758 q 457 728 398 758 q 564 644 515 699 l 564 737 l 686 737 l 686 34 m 582 367 q 529 560 582 481 q 358 652 468 652 q 189 561 250 652 q 135 369 135 482 q 189 176 135 255 q 361 85 251 85 q 529 176 468 85 q 582 367 582 255 "
        },
        "²": {
            "x_min": 0,
            "x_max": 442,
            "ha": 539,
            "o": "m 442 383 l 0 383 q 91 566 0 492 q 260 668 176 617 q 354 798 354 727 q 315 875 354 845 q 227 905 277 905 q 136 869 173 905 q 99 761 99 833 l 14 761 q 82 922 14 864 q 232 974 141 974 q 379 926 316 974 q 442 797 442 878 q 351 635 442 704 q 183 539 321 611 q 92 455 92 491 l 442 455 l 442 383 "
        },
        "–": {
            "x_min": 0,
            "x_max": 705.5625,
            "ha": 803,
            "o": "m 705 334 l 0 334 l 0 410 l 705 410 l 705 334 "
        },
        "Κ": {
            "x_min": 0,
            "x_max": 819.5625,
            "ha": 893,
            "o": "m 819 0 l 650 0 l 294 509 l 139 356 l 139 0 l 0 0 l 0 1013 l 139 1013 l 139 526 l 626 1013 l 809 1013 l 395 600 l 819 0 "
        },
        "ƒ": {
            "x_min": -46.265625,
            "x_max": 392,
            "ha": 513,
            "o": "m 392 651 l 259 651 l 79 -279 l -46 -278 l 134 651 l 14 651 l 14 751 l 135 751 q 151 948 135 900 q 304 1041 185 1041 q 334 1040 319 1041 q 392 1034 348 1039 l 392 922 q 337 931 360 931 q 271 883 287 931 q 260 793 260 853 l 260 751 l 392 751 l 392 651 "
        },
        "e": {
            "x_min": 0,
            "x_max": 714,
            "ha": 813,
            "o": "m 714 326 l 140 326 q 200 157 140 227 q 359 87 260 87 q 488 130 431 87 q 561 245 545 174 l 697 245 q 577 48 670 123 q 358 -26 484 -26 q 97 85 195 -26 q 0 363 0 197 q 94 642 0 529 q 358 765 195 765 q 626 627 529 765 q 714 326 714 503 m 576 429 q 507 583 564 522 q 355 650 445 650 q 206 583 266 650 q 140 429 152 522 l 576 429 "
        },
        "ό": {
            "x_min": 0,
            "x_max": 712,
            "ha": 815,
            "o": "m 356 -25 q 94 91 194 -25 q 0 368 0 202 q 92 642 0 533 q 356 761 192 761 q 617 644 517 761 q 712 368 712 533 q 619 91 712 201 q 356 -25 520 -25 m 356 85 q 527 175 465 85 q 583 369 583 255 q 528 562 583 484 q 356 651 466 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 356 85 250 85 m 576 1040 l 387 819 l 303 819 l 438 1040 l 576 1040 "
        },
        "J": {
            "x_min": 0,
            "x_max": 588,
            "ha": 699,
            "o": "m 588 279 q 287 -26 588 -26 q 58 73 126 -26 q 0 327 0 158 l 133 327 q 160 172 133 227 q 288 96 198 96 q 426 171 391 96 q 449 336 449 219 l 449 1013 l 588 1013 l 588 279 "
        },
        "»": {
            "x_min": -1,
            "x_max": 503,
            "ha": 601,
            "o": "m 503 302 l 280 136 l 281 256 l 429 373 l 281 486 l 280 608 l 503 440 l 503 302 m 221 302 l 0 136 l 0 255 l 145 372 l 0 486 l -1 608 l 221 440 l 221 302 "
        },
        "©": {
            "x_min": -3,
            "x_max": 1008,
            "ha": 1106,
            "o": "m 502 -7 q 123 151 263 -7 q -3 501 -3 294 q 123 851 -3 706 q 502 1011 263 1011 q 881 851 739 1011 q 1008 501 1008 708 q 883 151 1008 292 q 502 -7 744 -7 m 502 60 q 830 197 709 60 q 940 501 940 322 q 831 805 940 681 q 502 944 709 944 q 174 805 296 944 q 65 501 65 680 q 173 197 65 320 q 502 60 294 60 m 741 394 q 661 246 731 302 q 496 190 591 190 q 294 285 369 190 q 228 497 228 370 q 295 714 228 625 q 499 813 370 813 q 656 762 588 813 q 733 625 724 711 l 634 625 q 589 704 629 673 q 498 735 550 735 q 377 666 421 735 q 334 504 334 597 q 374 340 334 408 q 490 272 415 272 q 589 304 549 272 q 638 394 628 337 l 741 394 "
        },
        "ώ": {
            "x_min": 0,
            "x_max": 922,
            "ha": 1030,
            "o": "m 687 1040 l 498 819 l 415 819 l 549 1040 l 687 1040 m 922 339 q 856 97 922 203 q 650 -26 780 -26 q 538 9 587 -26 q 461 103 489 44 q 387 12 436 46 q 277 -22 339 -22 q 69 97 147 -22 q 0 338 0 202 q 45 551 0 444 q 161 737 84 643 l 302 737 q 175 552 219 647 q 124 336 124 446 q 155 179 124 248 q 275 88 197 88 q 375 163 341 88 q 400 294 400 219 l 400 572 l 524 572 l 524 294 q 561 135 524 192 q 643 88 591 88 q 762 182 719 88 q 797 341 797 257 q 745 555 797 450 q 619 737 705 637 l 760 737 q 874 551 835 640 q 922 339 922 444 "
        },
        "^": {
            "x_min": 193.0625,
            "x_max": 598.609375,
            "ha": 792,
            "o": "m 598 772 l 515 772 l 395 931 l 277 772 l 193 772 l 326 1013 l 462 1013 l 598 772 "
        },
        "«": {
            "x_min": 0,
            "x_max": 507.203125,
            "ha": 604,
            "o": "m 506 136 l 284 302 l 284 440 l 506 608 l 507 485 l 360 371 l 506 255 l 506 136 m 222 136 l 0 302 l 0 440 l 222 608 l 221 486 l 73 373 l 222 256 l 222 136 "
        },
        "D": {
            "x_min": 0,
            "x_max": 828,
            "ha": 935,
            "o": "m 389 1013 q 714 867 593 1013 q 828 521 828 729 q 712 161 828 309 q 382 0 587 0 l 0 0 l 0 1013 l 389 1013 m 376 124 q 607 247 523 124 q 681 510 681 355 q 607 771 681 662 q 376 896 522 896 l 139 896 l 139 124 l 376 124 "
        },
        "∙": {
            "x_min": 0,
            "x_max": 142,
            "ha": 239,
            "o": "m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 "
        },
        "ÿ": {
            "x_min": 0,
            "x_max": 47,
            "ha": 125,
            "o": "m 47 3 q 37 -7 47 -7 q 28 0 30 -7 q 39 -4 32 -4 q 45 3 45 -1 l 37 0 q 28 9 28 0 q 39 19 28 19 l 47 16 l 47 19 l 47 3 m 37 1 q 44 8 44 1 q 37 16 44 16 q 30 8 30 16 q 37 1 30 1 m 26 1 l 23 22 l 14 0 l 3 22 l 3 3 l 0 25 l 13 1 l 22 25 l 26 1 "
        },
        "w": {
            "x_min": 0,
            "x_max": 1009.71875,
            "ha": 1100,
            "o": "m 1009 738 l 783 0 l 658 0 l 501 567 l 345 0 l 222 0 l 0 738 l 130 738 l 284 174 l 432 737 l 576 738 l 721 173 l 881 737 l 1009 738 "
        },
        "$": {
            "x_min": 0,
            "x_max": 700,
            "ha": 793,
            "o": "m 664 717 l 542 717 q 490 825 531 785 q 381 872 450 865 l 381 551 q 620 446 540 522 q 700 241 700 370 q 618 45 700 116 q 381 -25 536 -25 l 381 -152 l 307 -152 l 307 -25 q 81 62 162 -25 q 0 297 0 149 l 124 297 q 169 146 124 204 q 307 81 215 89 l 307 441 q 80 536 148 469 q 13 725 13 603 q 96 910 13 839 q 307 982 180 982 l 307 1077 l 381 1077 l 381 982 q 574 917 494 982 q 664 717 664 845 m 307 565 l 307 872 q 187 831 233 872 q 142 724 142 791 q 180 618 142 656 q 307 565 218 580 m 381 76 q 562 237 562 96 q 517 361 562 313 q 381 423 472 409 l 381 76 "
        },
        "\\": {
            "x_min": -0.015625,
            "x_max": 425.0625,
            "ha": 522,
            "o": "m 425 -129 l 337 -129 l 0 1041 l 83 1041 l 425 -129 "
        },
        "µ": {
            "x_min": 0,
            "x_max": 697.21875,
            "ha": 747,
            "o": "m 697 -4 q 629 -14 658 -14 q 498 97 513 -14 q 422 9 470 41 q 313 -23 374 -23 q 207 4 258 -23 q 119 81 156 32 l 119 -278 l 0 -278 l 0 738 l 124 738 l 124 343 q 165 173 124 246 q 308 83 216 83 q 452 178 402 83 q 493 359 493 255 l 493 738 l 617 738 l 617 214 q 623 136 617 160 q 673 92 637 92 q 697 96 684 92 l 697 -4 "
        },
        "Ι": {
            "x_min": 42,
            "x_max": 181,
            "ha": 297,
            "o": "m 181 0 l 42 0 l 42 1013 l 181 1013 l 181 0 "
        },
        "Ύ": {
            "x_min": 0,
            "x_max": 1144.5,
            "ha": 1214,
            "o": "m 1144 1012 l 807 416 l 807 0 l 667 0 l 667 416 l 325 1012 l 465 1012 l 736 533 l 1004 1012 l 1144 1012 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "
        },
        "’": {
            "x_min": 0,
            "x_max": 139,
            "ha": 236,
            "o": "m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 "
        },
        "Ν": {
            "x_min": 0,
            "x_max": 801,
            "ha": 915,
            "o": "m 801 0 l 651 0 l 131 822 l 131 0 l 0 0 l 0 1013 l 151 1013 l 670 191 l 670 1013 l 801 1013 l 801 0 "
        },
        "-": {
            "x_min": 8.71875,
            "x_max": 350.390625,
            "ha": 478,
            "o": "m 350 317 l 8 317 l 8 428 l 350 428 l 350 317 "
        },
        "Q": {
            "x_min": 0,
            "x_max": 968,
            "ha": 1072,
            "o": "m 954 5 l 887 -79 l 744 35 q 622 -11 687 2 q 483 -26 556 -26 q 127 130 262 -26 q 0 504 0 279 q 127 880 0 728 q 484 1041 262 1041 q 841 884 708 1041 q 968 507 968 735 q 933 293 968 398 q 832 104 899 188 l 954 5 m 723 191 q 802 330 777 248 q 828 499 828 412 q 744 790 828 673 q 483 922 650 922 q 228 791 322 922 q 142 505 142 673 q 227 221 142 337 q 487 91 323 91 q 632 123 566 91 l 520 215 l 587 301 l 723 191 "
        },
        "ς": {
            "x_min": 1,
            "x_max": 676.28125,
            "ha": 740,
            "o": "m 676 460 l 551 460 q 498 595 542 546 q 365 651 448 651 q 199 578 263 651 q 136 401 136 505 q 266 178 136 241 q 508 106 387 142 q 640 -50 640 62 q 625 -158 640 -105 q 583 -278 611 -211 l 465 -278 q 498 -182 490 -211 q 515 -80 515 -126 q 381 12 515 -15 q 134 91 197 51 q 1 388 1 179 q 100 651 1 542 q 354 761 199 761 q 587 680 498 761 q 676 460 676 599 "
        },
        "M": {
            "x_min": 0,
            "x_max": 954,
            "ha": 1067,
            "o": "m 954 0 l 819 0 l 819 869 l 537 0 l 405 0 l 128 866 l 128 0 l 0 0 l 0 1013 l 200 1013 l 472 160 l 757 1013 l 954 1013 l 954 0 "
        },
        "Ψ": {
            "x_min": 0,
            "x_max": 1006,
            "ha": 1094,
            "o": "m 1006 678 q 914 319 1006 429 q 571 200 814 200 l 571 0 l 433 0 l 433 200 q 92 319 194 200 q 0 678 0 429 l 0 1013 l 139 1013 l 139 679 q 191 417 139 492 q 433 326 255 326 l 433 1013 l 571 1013 l 571 326 l 580 326 q 813 423 747 326 q 868 679 868 502 l 868 1013 l 1006 1013 l 1006 678 "
        },
        "C": {
            "x_min": 0,
            "x_max": 886,
            "ha": 944,
            "o": "m 886 379 q 760 87 886 201 q 455 -26 634 -26 q 112 136 236 -26 q 0 509 0 283 q 118 882 0 737 q 469 1041 245 1041 q 748 955 630 1041 q 879 708 879 859 l 745 708 q 649 862 724 805 q 473 920 573 920 q 219 791 312 920 q 136 509 136 675 q 217 229 136 344 q 470 99 311 99 q 672 179 591 99 q 753 379 753 259 l 886 379 "
        },
        "!": {
            "x_min": 0,
            "x_max": 138,
            "ha": 236,
            "o": "m 138 684 q 116 409 138 629 q 105 244 105 299 l 33 244 q 16 465 33 313 q 0 684 0 616 l 0 1013 l 138 1013 l 138 684 m 138 0 l 0 0 l 0 151 l 138 151 l 138 0 "
        },
        "{": {
            "x_min": 0,
            "x_max": 480.5625,
            "ha": 578,
            "o": "m 480 -286 q 237 -213 303 -286 q 187 -45 187 -159 q 194 48 187 -15 q 201 141 201 112 q 164 264 201 225 q 0 314 118 314 l 0 417 q 164 471 119 417 q 201 605 201 514 q 199 665 201 644 q 193 772 193 769 q 241 941 193 887 q 480 1015 308 1015 l 480 915 q 336 866 375 915 q 306 742 306 828 q 310 662 306 717 q 314 577 314 606 q 288 452 314 500 q 176 365 256 391 q 289 275 257 337 q 314 143 314 226 q 313 84 314 107 q 310 -11 310 -5 q 339 -131 310 -94 q 480 -182 377 -182 l 480 -286 "
        },
        "X": {
            "x_min": -0.015625,
            "x_max": 854.15625,
            "ha": 940,
            "o": "m 854 0 l 683 0 l 423 409 l 166 0 l 0 0 l 347 519 l 18 1013 l 186 1013 l 428 637 l 675 1013 l 836 1013 l 504 520 l 854 0 "
        },
        "#": {
            "x_min": 0,
            "x_max": 963.890625,
            "ha": 1061,
            "o": "m 963 690 l 927 590 l 719 590 l 655 410 l 876 410 l 840 310 l 618 310 l 508 -3 l 393 -2 l 506 309 l 329 310 l 215 -2 l 102 -3 l 212 310 l 0 310 l 36 410 l 248 409 l 312 590 l 86 590 l 120 690 l 347 690 l 459 1006 l 573 1006 l 462 690 l 640 690 l 751 1006 l 865 1006 l 754 690 l 963 690 m 606 590 l 425 590 l 362 410 l 543 410 l 606 590 "
        },
        "ι": {
            "x_min": 42,
            "x_max": 284,
            "ha": 361,
            "o": "m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 738 l 167 738 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 103 239 101 q 284 112 257 104 l 284 3 "
        },
        "Ά": {
            "x_min": 0,
            "x_max": 906.953125,
            "ha": 982,
            "o": "m 283 1040 l 88 799 l 5 799 l 145 1040 l 283 1040 m 906 0 l 756 0 l 650 303 l 251 303 l 143 0 l 0 0 l 376 1012 l 529 1012 l 906 0 m 609 421 l 452 866 l 293 421 l 609 421 "
        },
        ")": {
            "x_min": 0,
            "x_max": 318,
            "ha": 415,
            "o": "m 318 365 q 257 25 318 191 q 87 -290 197 -141 l 0 -290 q 140 21 93 -128 q 193 360 193 189 q 141 704 193 537 q 0 1024 97 850 l 87 1024 q 257 706 197 871 q 318 365 318 542 "
        },
        "ε": {
            "x_min": 0,
            "x_max": 634.71875,
            "ha": 714,
            "o": "m 634 234 q 527 38 634 110 q 300 -25 433 -25 q 98 29 183 -25 q 0 204 0 93 q 37 314 0 265 q 128 390 67 353 q 56 460 82 419 q 26 555 26 505 q 114 712 26 654 q 295 763 191 763 q 499 700 416 763 q 589 515 589 631 l 478 515 q 419 618 464 580 q 307 657 374 657 q 207 630 253 657 q 151 547 151 598 q 238 445 151 469 q 389 434 280 434 l 389 331 l 349 331 q 206 315 255 331 q 125 210 125 287 q 183 107 125 145 q 302 76 233 76 q 436 117 379 76 q 509 234 493 159 l 634 234 "
        },
        "Δ": {
            "x_min": 0,
            "x_max": 952.78125,
            "ha": 1028,
            "o": "m 952 0 l 0 0 l 400 1013 l 551 1013 l 952 0 m 762 124 l 476 867 l 187 124 l 762 124 "
        },
        "}": {
            "x_min": 0,
            "x_max": 481,
            "ha": 578,
            "o": "m 481 314 q 318 262 364 314 q 282 136 282 222 q 284 65 282 97 q 293 -58 293 -48 q 241 -217 293 -166 q 0 -286 174 -286 l 0 -182 q 143 -130 105 -182 q 171 -2 171 -93 q 168 81 171 22 q 165 144 165 140 q 188 275 165 229 q 306 365 220 339 q 191 455 224 391 q 165 588 165 505 q 168 681 165 624 q 171 742 171 737 q 141 865 171 827 q 0 915 102 915 l 0 1015 q 243 942 176 1015 q 293 773 293 888 q 287 675 293 741 q 282 590 282 608 q 318 466 282 505 q 481 417 364 417 l 481 314 "
        },
        "‰": {
            "x_min": -3,
            "x_max": 1672,
            "ha": 1821,
            "o": "m 846 0 q 664 76 732 0 q 603 244 603 145 q 662 412 603 344 q 846 489 729 489 q 1027 412 959 489 q 1089 244 1089 343 q 1029 76 1089 144 q 846 0 962 0 m 845 103 q 945 143 910 103 q 981 243 981 184 q 947 340 981 301 q 845 385 910 385 q 745 342 782 385 q 709 243 709 300 q 742 147 709 186 q 845 103 781 103 m 888 986 l 284 -25 l 199 -25 l 803 986 l 888 986 m 241 468 q 58 545 126 468 q -3 715 -3 615 q 56 881 -3 813 q 238 958 124 958 q 421 881 353 958 q 483 712 483 813 q 423 544 483 612 q 241 468 356 468 m 241 855 q 137 811 175 855 q 100 710 100 768 q 136 612 100 653 q 240 572 172 572 q 344 614 306 572 q 382 713 382 656 q 347 810 382 771 q 241 855 308 855 m 1428 0 q 1246 76 1314 0 q 1185 244 1185 145 q 1244 412 1185 344 q 1428 489 1311 489 q 1610 412 1542 489 q 1672 244 1672 343 q 1612 76 1672 144 q 1428 0 1545 0 m 1427 103 q 1528 143 1492 103 q 1564 243 1564 184 q 1530 340 1564 301 q 1427 385 1492 385 q 1327 342 1364 385 q 1291 243 1291 300 q 1324 147 1291 186 q 1427 103 1363 103 "
        },
        "a": {
            "x_min": 0,
            "x_max": 698.609375,
            "ha": 794,
            "o": "m 698 0 q 661 -12 679 -7 q 615 -17 643 -17 q 536 12 564 -17 q 500 96 508 41 q 384 6 456 37 q 236 -25 312 -25 q 65 31 130 -25 q 0 194 0 88 q 118 390 0 334 q 328 435 180 420 q 488 483 476 451 q 495 523 495 504 q 442 619 495 584 q 325 654 389 654 q 209 617 257 654 q 152 513 161 580 l 33 513 q 123 705 33 633 q 332 772 207 772 q 528 712 448 772 q 617 531 617 645 l 617 163 q 624 108 617 126 q 664 90 632 90 l 698 94 l 698 0 m 491 262 l 491 372 q 272 329 350 347 q 128 201 128 294 q 166 113 128 144 q 264 83 205 83 q 414 130 346 83 q 491 262 491 183 "
        },
        "—": {
            "x_min": 0,
            "x_max": 941.671875,
            "ha": 1039,
            "o": "m 941 334 l 0 334 l 0 410 l 941 410 l 941 334 "
        },
        "=": {
            "x_min": 8.71875,
            "x_max": 780.953125,
            "ha": 792,
            "o": "m 780 510 l 8 510 l 8 606 l 780 606 l 780 510 m 780 235 l 8 235 l 8 332 l 780 332 l 780 235 "
        },
        "N": {
            "x_min": 0,
            "x_max": 801,
            "ha": 914,
            "o": "m 801 0 l 651 0 l 131 823 l 131 0 l 0 0 l 0 1013 l 151 1013 l 670 193 l 670 1013 l 801 1013 l 801 0 "
        },
        "ρ": {
            "x_min": 0,
            "x_max": 712,
            "ha": 797,
            "o": "m 712 369 q 620 94 712 207 q 362 -26 521 -26 q 230 2 292 -26 q 119 83 167 30 l 119 -278 l 0 -278 l 0 362 q 91 643 0 531 q 355 764 190 764 q 617 647 517 764 q 712 369 712 536 m 583 366 q 530 559 583 480 q 359 651 469 651 q 190 562 252 651 q 135 370 135 483 q 189 176 135 257 q 359 85 250 85 q 528 175 466 85 q 583 366 583 254 "
        },
        "2": {
            "x_min": 59,
            "x_max": 731,
            "ha": 792,
            "o": "m 731 0 l 59 0 q 197 314 59 188 q 457 487 199 315 q 598 691 598 580 q 543 819 598 772 q 411 867 488 867 q 272 811 328 867 q 209 630 209 747 l 81 630 q 182 901 81 805 q 408 986 271 986 q 629 909 536 986 q 731 694 731 826 q 613 449 731 541 q 378 316 495 383 q 201 122 235 234 l 731 122 l 731 0 "
        },
        "¯": {
            "x_min": 0,
            "x_max": 941.671875,
            "ha": 938,
            "o": "m 941 1033 l 0 1033 l 0 1109 l 941 1109 l 941 1033 "
        },
        "Z": {
            "x_min": 0,
            "x_max": 779,
            "ha": 849,
            "o": "m 779 0 l 0 0 l 0 113 l 621 896 l 40 896 l 40 1013 l 779 1013 l 778 887 l 171 124 l 779 124 l 779 0 "
        },
        "u": {
            "x_min": 0,
            "x_max": 617,
            "ha": 729,
            "o": "m 617 0 l 499 0 l 499 110 q 391 10 460 45 q 246 -25 322 -25 q 61 58 127 -25 q 0 258 0 136 l 0 738 l 125 738 l 125 284 q 156 148 125 202 q 273 82 197 82 q 433 165 369 82 q 493 340 493 243 l 493 738 l 617 738 l 617 0 "
        },
        "k": {
            "x_min": 0,
            "x_max": 612.484375,
            "ha": 697,
            "o": "m 612 738 l 338 465 l 608 0 l 469 0 l 251 382 l 121 251 l 121 0 l 0 0 l 0 1013 l 121 1013 l 121 402 l 456 738 l 612 738 "
        },
        "Η": {
            "x_min": 0,
            "x_max": 803,
            "ha": 917,
            "o": "m 803 0 l 667 0 l 667 475 l 140 475 l 140 0 l 0 0 l 0 1013 l 140 1013 l 140 599 l 667 599 l 667 1013 l 803 1013 l 803 0 "
        },
        "Α": {
            "x_min": 0,
            "x_max": 906.953125,
            "ha": 985,
            "o": "m 906 0 l 756 0 l 650 303 l 251 303 l 143 0 l 0 0 l 376 1013 l 529 1013 l 906 0 m 609 421 l 452 866 l 293 421 l 609 421 "
        },
        "s": {
            "x_min": 0,
            "x_max": 604,
            "ha": 697,
            "o": "m 604 217 q 501 36 604 104 q 292 -23 411 -23 q 86 43 166 -23 q 0 238 0 114 l 121 237 q 175 122 121 164 q 300 85 223 85 q 415 112 363 85 q 479 207 479 147 q 361 309 479 276 q 140 372 141 370 q 21 544 21 426 q 111 708 21 647 q 298 761 190 761 q 492 705 413 761 q 583 531 583 643 l 462 531 q 412 625 462 594 q 298 657 363 657 q 199 636 242 657 q 143 558 143 608 q 262 454 143 486 q 484 394 479 397 q 604 217 604 341 "
        },
        "B": {
            "x_min": 0,
            "x_max": 778,
            "ha": 876,
            "o": "m 580 546 q 724 469 670 535 q 778 311 778 403 q 673 83 778 171 q 432 0 575 0 l 0 0 l 0 1013 l 411 1013 q 629 957 541 1013 q 732 768 732 892 q 691 633 732 693 q 580 546 650 572 m 393 899 l 139 899 l 139 588 l 379 588 q 521 624 462 588 q 592 744 592 667 q 531 859 592 819 q 393 899 471 899 m 419 124 q 566 169 504 124 q 635 303 635 219 q 559 436 635 389 q 402 477 494 477 l 139 477 l 139 124 l 419 124 "
        },
        "…": {
            "x_min": 0,
            "x_max": 614,
            "ha": 708,
            "o": "m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 m 378 0 l 236 0 l 236 151 l 378 151 l 378 0 m 614 0 l 472 0 l 472 151 l 614 151 l 614 0 "
        },
        "?": {
            "x_min": 0,
            "x_max": 607,
            "ha": 704,
            "o": "m 607 777 q 543 599 607 674 q 422 474 482 537 q 357 272 357 391 l 236 272 q 297 487 236 395 q 411 619 298 490 q 474 762 474 691 q 422 885 474 838 q 301 933 371 933 q 179 880 228 933 q 124 706 124 819 l 0 706 q 94 963 0 872 q 302 1044 177 1044 q 511 973 423 1044 q 607 777 607 895 m 370 0 l 230 0 l 230 151 l 370 151 l 370 0 "
        },
        "H": {
            "x_min": 0,
            "x_max": 803,
            "ha": 915,
            "o": "m 803 0 l 667 0 l 667 475 l 140 475 l 140 0 l 0 0 l 0 1013 l 140 1013 l 140 599 l 667 599 l 667 1013 l 803 1013 l 803 0 "
        },
        "ν": {
            "x_min": 0,
            "x_max": 675,
            "ha": 761,
            "o": "m 675 738 l 404 0 l 272 0 l 0 738 l 133 738 l 340 147 l 541 738 l 675 738 "
        },
        "c": {
            "x_min": 1,
            "x_max": 701.390625,
            "ha": 775,
            "o": "m 701 264 q 584 53 681 133 q 353 -26 487 -26 q 91 91 188 -26 q 1 370 1 201 q 92 645 1 537 q 353 761 190 761 q 572 688 479 761 q 690 493 666 615 l 556 493 q 487 606 545 562 q 356 650 428 650 q 186 563 246 650 q 134 372 134 487 q 188 179 134 258 q 359 88 250 88 q 492 136 437 88 q 566 264 548 185 l 701 264 "
        },
        "¶": {
            "x_min": 0,
            "x_max": 566.671875,
            "ha": 678,
            "o": "m 21 892 l 52 892 l 98 761 l 145 892 l 176 892 l 178 741 l 157 741 l 157 867 l 108 741 l 88 741 l 40 871 l 40 741 l 21 741 l 21 892 m 308 854 l 308 731 q 252 691 308 691 q 227 691 240 691 q 207 696 213 695 l 207 712 l 253 706 q 288 733 288 706 l 288 763 q 244 741 279 741 q 193 797 193 741 q 261 860 193 860 q 287 860 273 860 q 308 854 302 855 m 288 842 l 263 843 q 213 796 213 843 q 248 756 213 756 q 288 796 288 756 l 288 842 m 566 988 l 502 988 l 502 -1 l 439 -1 l 439 988 l 317 988 l 317 -1 l 252 -1 l 252 602 q 81 653 155 602 q 0 805 0 711 q 101 989 0 918 q 309 1053 194 1053 l 566 1053 l 566 988 "
        },
        "β": {
            "x_min": 0,
            "x_max": 660,
            "ha": 745,
            "o": "m 471 550 q 610 450 561 522 q 660 280 660 378 q 578 64 660 151 q 367 -22 497 -22 q 239 5 299 -22 q 126 82 178 32 l 126 -278 l 0 -278 l 0 593 q 54 903 0 801 q 318 1042 127 1042 q 519 964 436 1042 q 603 771 603 887 q 567 644 603 701 q 471 550 532 586 m 337 79 q 476 138 418 79 q 535 279 535 198 q 427 437 535 386 q 226 477 344 477 l 226 583 q 398 620 329 583 q 486 762 486 668 q 435 884 486 833 q 312 935 384 935 q 169 861 219 935 q 126 698 126 797 l 126 362 q 170 169 126 242 q 337 79 224 79 "
        },
        "Μ": {
            "x_min": 0,
            "x_max": 954,
            "ha": 1068,
            "o": "m 954 0 l 819 0 l 819 868 l 537 0 l 405 0 l 128 865 l 128 0 l 0 0 l 0 1013 l 199 1013 l 472 158 l 758 1013 l 954 1013 l 954 0 "
        },
        "Ό": {
            "x_min": 0.109375,
            "x_max": 1120,
            "ha": 1217,
            "o": "m 1120 505 q 994 132 1120 282 q 642 -29 861 -29 q 290 130 422 -29 q 167 505 167 280 q 294 883 167 730 q 650 1046 430 1046 q 999 882 868 1046 q 1120 505 1120 730 m 977 504 q 896 784 977 669 q 644 915 804 915 q 391 785 484 915 q 307 504 307 669 q 391 224 307 339 q 644 95 486 95 q 894 224 803 95 q 977 504 977 339 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "
        },
        "Ή": {
            "x_min": 0,
            "x_max": 1158,
            "ha": 1275,
            "o": "m 1158 0 l 1022 0 l 1022 475 l 496 475 l 496 0 l 356 0 l 356 1012 l 496 1012 l 496 599 l 1022 599 l 1022 1012 l 1158 1012 l 1158 0 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "
        },
        "•": {
            "x_min": 0,
            "x_max": 663.890625,
            "ha": 775,
            "o": "m 663 529 q 566 293 663 391 q 331 196 469 196 q 97 294 194 196 q 0 529 0 393 q 96 763 0 665 q 331 861 193 861 q 566 763 469 861 q 663 529 663 665 "
        },
        "¥": {
            "x_min": 0.1875,
            "x_max": 819.546875,
            "ha": 886,
            "o": "m 563 561 l 697 561 l 696 487 l 520 487 l 482 416 l 482 380 l 697 380 l 695 308 l 482 308 l 482 0 l 342 0 l 342 308 l 125 308 l 125 380 l 342 380 l 342 417 l 303 487 l 125 487 l 125 561 l 258 561 l 0 1013 l 140 1013 l 411 533 l 679 1013 l 819 1013 l 563 561 "
        },
        "(": {
            "x_min": 0,
            "x_max": 318.0625,
            "ha": 415,
            "o": "m 318 -290 l 230 -290 q 61 23 122 -142 q 0 365 0 190 q 62 712 0 540 q 230 1024 119 869 l 318 1024 q 175 705 219 853 q 125 360 125 542 q 176 22 125 187 q 318 -290 223 -127 "
        },
        "U": {
            "x_min": 0,
            "x_max": 796,
            "ha": 904,
            "o": "m 796 393 q 681 93 796 212 q 386 -25 566 -25 q 101 95 208 -25 q 0 393 0 211 l 0 1013 l 138 1013 l 138 391 q 204 191 138 270 q 394 107 276 107 q 586 191 512 107 q 656 391 656 270 l 656 1013 l 796 1013 l 796 393 "
        },
        "γ": {
            "x_min": 0.5,
            "x_max": 744.953125,
            "ha": 822,
            "o": "m 744 737 l 463 54 l 463 -278 l 338 -278 l 338 54 l 154 495 q 104 597 124 569 q 13 651 67 651 l 0 651 l 0 751 l 39 753 q 168 711 121 753 q 242 594 207 676 l 403 208 l 617 737 l 744 737 "
        },
        "α": {
            "x_min": 0,
            "x_max": 765.5625,
            "ha": 809,
            "o": "m 765 -4 q 698 -14 726 -14 q 564 97 586 -14 q 466 7 525 40 q 337 -26 407 -26 q 88 98 186 -26 q 0 369 0 212 q 88 637 0 525 q 337 760 184 760 q 465 728 407 760 q 563 637 524 696 l 563 739 l 685 739 l 685 222 q 693 141 685 168 q 748 94 708 94 q 765 96 760 94 l 765 -4 m 584 371 q 531 562 584 485 q 360 653 470 653 q 192 566 254 653 q 135 379 135 489 q 186 181 135 261 q 358 84 247 84 q 528 176 465 84 q 584 371 584 260 "
        },
        "F": {
            "x_min": 0,
            "x_max": 683.328125,
            "ha": 717,
            "o": "m 683 888 l 140 888 l 140 583 l 613 583 l 613 458 l 140 458 l 140 0 l 0 0 l 0 1013 l 683 1013 l 683 888 "
        },
        "­": {
            "x_min": 0,
            "x_max": 705.5625,
            "ha": 803,
            "o": "m 705 334 l 0 334 l 0 410 l 705 410 l 705 334 "
        },
        ":": {
            "x_min": 0,
            "x_max": 142,
            "ha": 239,
            "o": "m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 "
        },
        "Χ": {
            "x_min": 0,
            "x_max": 854.171875,
            "ha": 935,
            "o": "m 854 0 l 683 0 l 423 409 l 166 0 l 0 0 l 347 519 l 18 1013 l 186 1013 l 427 637 l 675 1013 l 836 1013 l 504 521 l 854 0 "
        },
        "*": {
            "x_min": 116,
            "x_max": 674,
            "ha": 792,
            "o": "m 674 768 l 475 713 l 610 544 l 517 477 l 394 652 l 272 478 l 178 544 l 314 713 l 116 766 l 153 876 l 341 812 l 342 1013 l 446 1013 l 446 811 l 635 874 l 674 768 "
        },
        "†": {
            "x_min": 0,
            "x_max": 777,
            "ha": 835,
            "o": "m 458 804 l 777 804 l 777 683 l 458 683 l 458 0 l 319 0 l 319 681 l 0 683 l 0 804 l 319 804 l 319 1015 l 458 1013 l 458 804 "
        },
        "°": {
            "x_min": 0,
            "x_max": 347,
            "ha": 444,
            "o": "m 173 802 q 43 856 91 802 q 0 977 0 905 q 45 1101 0 1049 q 173 1153 90 1153 q 303 1098 255 1153 q 347 977 347 1049 q 303 856 347 905 q 173 802 256 802 m 173 884 q 238 910 214 884 q 262 973 262 937 q 239 1038 262 1012 q 173 1064 217 1064 q 108 1037 132 1064 q 85 973 85 1010 q 108 910 85 937 q 173 884 132 884 "
        },
        "V": {
            "x_min": 0,
            "x_max": 862.71875,
            "ha": 940,
            "o": "m 862 1013 l 505 0 l 361 0 l 0 1013 l 143 1013 l 434 165 l 718 1012 l 862 1013 "
        },
        "Ξ": {
            "x_min": 0,
            "x_max": 734.71875,
            "ha": 763,
            "o": "m 723 889 l 9 889 l 9 1013 l 723 1013 l 723 889 m 673 463 l 61 463 l 61 589 l 673 589 l 673 463 m 734 0 l 0 0 l 0 124 l 734 124 l 734 0 "
        },
        " ": {
            "x_min": 0,
            "x_max": 0,
            "ha": 853
        },
        "Ϋ": {
            "x_min": 0.328125,
            "x_max": 819.515625,
            "ha": 889,
            "o": "m 588 1046 l 460 1046 l 460 1189 l 588 1189 l 588 1046 m 360 1046 l 232 1046 l 232 1189 l 360 1189 l 360 1046 m 819 1012 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1012 l 140 1012 l 411 533 l 679 1012 l 819 1012 "
        },
        "0": {
            "x_min": 73,
            "x_max": 715,
            "ha": 792,
            "o": "m 394 -29 q 153 129 242 -29 q 73 479 73 272 q 152 829 73 687 q 394 989 241 989 q 634 829 545 989 q 715 479 715 684 q 635 129 715 270 q 394 -29 546 -29 m 394 89 q 546 211 489 89 q 598 479 598 322 q 548 748 598 640 q 394 871 491 871 q 241 748 298 871 q 190 479 190 637 q 239 211 190 319 q 394 89 296 89 "
        },
        "”": {
            "x_min": 0,
            "x_max": 347,
            "ha": 454,
            "o": "m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 m 347 851 q 310 737 347 784 q 208 669 273 690 l 208 734 q 267 787 250 741 q 280 873 280 821 l 208 873 l 208 1013 l 347 1013 l 347 851 "
        },
        "@": {
            "x_min": 0,
            "x_max": 1260,
            "ha": 1357,
            "o": "m 1098 -45 q 877 -160 1001 -117 q 633 -203 752 -203 q 155 -29 327 -203 q 0 360 0 127 q 176 802 0 616 q 687 1008 372 1008 q 1123 854 969 1008 q 1260 517 1260 718 q 1155 216 1260 341 q 868 82 1044 82 q 772 106 801 82 q 737 202 737 135 q 647 113 700 144 q 527 82 594 82 q 367 147 420 82 q 314 312 314 212 q 401 565 314 452 q 639 690 498 690 q 810 588 760 690 l 849 668 l 938 668 q 877 441 900 532 q 833 226 833 268 q 853 182 833 198 q 902 167 873 167 q 1088 272 1012 167 q 1159 512 1159 372 q 1051 793 1159 681 q 687 925 925 925 q 248 747 415 925 q 97 361 97 586 q 226 26 97 159 q 627 -122 370 -122 q 856 -87 737 -122 q 1061 8 976 -53 l 1098 -45 m 786 488 q 738 580 777 545 q 643 615 700 615 q 483 517 548 615 q 425 322 425 430 q 457 203 425 250 q 552 156 490 156 q 722 273 665 156 q 786 488 738 309 "
        },
        "Ί": {
            "x_min": 0,
            "x_max": 499,
            "ha": 613,
            "o": "m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 m 499 0 l 360 0 l 360 1012 l 499 1012 l 499 0 "
        },
        "i": {
            "x_min": 14,
            "x_max": 136,
            "ha": 275,
            "o": "m 136 873 l 14 873 l 14 1013 l 136 1013 l 136 873 m 136 0 l 14 0 l 14 737 l 136 737 l 136 0 "
        },
        "Β": {
            "x_min": 0,
            "x_max": 778,
            "ha": 877,
            "o": "m 580 545 q 724 468 671 534 q 778 310 778 402 q 673 83 778 170 q 432 0 575 0 l 0 0 l 0 1013 l 411 1013 q 629 957 541 1013 q 732 768 732 891 q 691 632 732 692 q 580 545 650 571 m 393 899 l 139 899 l 139 587 l 379 587 q 521 623 462 587 q 592 744 592 666 q 531 859 592 819 q 393 899 471 899 m 419 124 q 566 169 504 124 q 635 302 635 219 q 559 435 635 388 q 402 476 494 476 l 139 476 l 139 124 l 419 124 "
        },
        "υ": {
            "x_min": 0,
            "x_max": 617,
            "ha": 725,
            "o": "m 617 352 q 540 94 617 199 q 308 -24 455 -24 q 76 94 161 -24 q 0 352 0 199 l 0 739 l 126 739 l 126 355 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 355 492 257 l 492 739 l 617 739 l 617 352 "
        },
        "]": {
            "x_min": 0,
            "x_max": 275,
            "ha": 372,
            "o": "m 275 -281 l 0 -281 l 0 -187 l 151 -187 l 151 920 l 0 920 l 0 1013 l 275 1013 l 275 -281 "
        },
        "m": {
            "x_min": 0,
            "x_max": 1019,
            "ha": 1128,
            "o": "m 1019 0 l 897 0 l 897 454 q 860 591 897 536 q 739 660 816 660 q 613 586 659 660 q 573 436 573 522 l 573 0 l 447 0 l 447 455 q 412 591 447 535 q 294 657 372 657 q 165 586 213 657 q 122 437 122 521 l 122 0 l 0 0 l 0 738 l 117 738 l 117 640 q 202 730 150 697 q 316 763 254 763 q 437 730 381 763 q 525 642 494 697 q 621 731 559 700 q 753 763 682 763 q 943 694 867 763 q 1019 512 1019 625 l 1019 0 "
        },
        "χ": {
            "x_min": 8.328125,
            "x_max": 780.5625,
            "ha": 815,
            "o": "m 780 -278 q 715 -294 747 -294 q 616 -257 663 -294 q 548 -175 576 -227 l 379 133 l 143 -277 l 9 -277 l 313 254 l 163 522 q 127 586 131 580 q 36 640 91 640 q 8 637 27 640 l 8 752 l 52 757 q 162 719 113 757 q 236 627 200 690 l 383 372 l 594 737 l 726 737 l 448 250 l 625 -69 q 670 -153 647 -110 q 743 -188 695 -188 q 780 -184 759 -188 l 780 -278 "
        },
        "8": {
            "x_min": 55,
            "x_max": 736,
            "ha": 792,
            "o": "m 571 527 q 694 424 652 491 q 736 280 736 358 q 648 71 736 158 q 395 -26 551 -26 q 142 69 238 -26 q 55 279 55 157 q 96 425 55 359 q 220 527 138 491 q 120 615 153 562 q 88 726 88 668 q 171 904 88 827 q 395 986 261 986 q 618 905 529 986 q 702 727 702 830 q 670 616 702 667 q 571 527 638 565 m 394 565 q 519 610 475 565 q 563 717 563 655 q 521 823 563 781 q 392 872 474 872 q 265 824 312 872 q 224 720 224 783 q 265 613 224 656 q 394 565 312 565 m 395 91 q 545 150 488 91 q 597 280 597 204 q 546 408 597 355 q 395 465 492 465 q 244 408 299 465 q 194 280 194 356 q 244 150 194 203 q 395 91 299 91 "
        },
        "ί": {
            "x_min": 42,
            "x_max": 326.71875,
            "ha": 361,
            "o": "m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 737 l 167 737 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 102 239 101 q 284 112 257 104 l 284 3 m 326 1040 l 137 819 l 54 819 l 189 1040 l 326 1040 "
        },
        "Ζ": {
            "x_min": 0,
            "x_max": 779.171875,
            "ha": 850,
            "o": "m 779 0 l 0 0 l 0 113 l 620 896 l 40 896 l 40 1013 l 779 1013 l 779 887 l 170 124 l 779 124 l 779 0 "
        },
        "R": {
            "x_min": 0,
            "x_max": 781.953125,
            "ha": 907,
            "o": "m 781 0 l 623 0 q 587 242 590 52 q 407 433 585 433 l 138 433 l 138 0 l 0 0 l 0 1013 l 396 1013 q 636 946 539 1013 q 749 731 749 868 q 711 597 749 659 q 608 502 674 534 q 718 370 696 474 q 729 207 722 352 q 781 26 736 62 l 781 0 m 373 551 q 533 594 465 551 q 614 731 614 645 q 532 859 614 815 q 373 896 465 896 l 138 896 l 138 551 l 373 551 "
        },
        "o": {
            "x_min": 0,
            "x_max": 713,
            "ha": 821,
            "o": "m 357 -25 q 94 91 194 -25 q 0 368 0 202 q 93 642 0 533 q 357 761 193 761 q 618 644 518 761 q 713 368 713 533 q 619 91 713 201 q 357 -25 521 -25 m 357 85 q 528 175 465 85 q 584 369 584 255 q 529 562 584 484 q 357 651 467 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 357 85 250 85 "
        },
        "5": {
            "x_min": 54.171875,
            "x_max": 738,
            "ha": 792,
            "o": "m 738 314 q 626 60 738 153 q 382 -23 526 -23 q 155 47 248 -23 q 54 256 54 125 l 183 256 q 259 132 204 174 q 382 91 314 91 q 533 149 471 91 q 602 314 602 213 q 538 469 602 411 q 386 528 475 528 q 284 506 332 528 q 197 439 237 484 l 81 439 l 159 958 l 684 958 l 684 840 l 254 840 l 214 579 q 306 627 258 612 q 407 643 354 643 q 636 552 540 643 q 738 314 738 457 "
        },
        "7": {
            "x_min": 58.71875,
            "x_max": 730.953125,
            "ha": 792,
            "o": "m 730 839 q 469 448 560 641 q 335 0 378 255 l 192 0 q 328 441 235 252 q 593 830 421 630 l 58 830 l 58 958 l 730 958 l 730 839 "
        },
        "K": {
            "x_min": 0,
            "x_max": 819.46875,
            "ha": 906,
            "o": "m 819 0 l 649 0 l 294 509 l 139 355 l 139 0 l 0 0 l 0 1013 l 139 1013 l 139 526 l 626 1013 l 809 1013 l 395 600 l 819 0 "
        },
        ",": {
            "x_min": 0,
            "x_max": 142,
            "ha": 239,
            "o": "m 142 -12 q 105 -132 142 -82 q 0 -205 68 -182 l 0 -138 q 57 -82 40 -124 q 70 0 70 -51 l 0 0 l 0 151 l 142 151 l 142 -12 "
        },
        "d": {
            "x_min": 0,
            "x_max": 683,
            "ha": 796,
            "o": "m 683 0 l 564 0 l 564 93 q 456 6 516 38 q 327 -25 395 -25 q 87 100 181 -25 q 0 365 0 215 q 90 639 0 525 q 343 763 187 763 q 564 647 486 763 l 564 1013 l 683 1013 l 683 0 m 582 373 q 529 562 582 484 q 361 653 468 653 q 190 561 253 653 q 135 365 135 479 q 189 175 135 254 q 358 85 251 85 q 529 178 468 85 q 582 373 582 258 "
        },
        "¨": {
            "x_min": -109,
            "x_max": 247,
            "ha": 232,
            "o": "m 247 1046 l 119 1046 l 119 1189 l 247 1189 l 247 1046 m 19 1046 l -109 1046 l -109 1189 l 19 1189 l 19 1046 "
        },
        "E": {
            "x_min": 0,
            "x_max": 736.109375,
            "ha": 789,
            "o": "m 736 0 l 0 0 l 0 1013 l 725 1013 l 725 889 l 139 889 l 139 585 l 677 585 l 677 467 l 139 467 l 139 125 l 736 125 l 736 0 "
        },
        "Y": {
            "x_min": 0,
            "x_max": 820,
            "ha": 886,
            "o": "m 820 1013 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1013 l 140 1013 l 411 534 l 679 1012 l 820 1013 "
        },
        "\"": {
            "x_min": 0,
            "x_max": 299,
            "ha": 396,
            "o": "m 299 606 l 203 606 l 203 988 l 299 988 l 299 606 m 96 606 l 0 606 l 0 988 l 96 988 l 96 606 "
        },
        "‹": {
            "x_min": 17.984375,
            "x_max": 773.609375,
            "ha": 792,
            "o": "m 773 40 l 18 376 l 17 465 l 773 799 l 773 692 l 159 420 l 773 149 l 773 40 "
        },
        "„": {
            "x_min": 0,
            "x_max": 364,
            "ha": 467,
            "o": "m 141 -12 q 104 -132 141 -82 q 0 -205 67 -182 l 0 -138 q 56 -82 40 -124 q 69 0 69 -51 l 0 0 l 0 151 l 141 151 l 141 -12 m 364 -12 q 327 -132 364 -82 q 222 -205 290 -182 l 222 -138 q 279 -82 262 -124 q 292 0 292 -51 l 222 0 l 222 151 l 364 151 l 364 -12 "
        },
        "δ": {
            "x_min": 1,
            "x_max": 710,
            "ha": 810,
            "o": "m 710 360 q 616 87 710 196 q 356 -28 518 -28 q 99 82 197 -28 q 1 356 1 192 q 100 606 1 509 q 355 703 199 703 q 180 829 288 754 q 70 903 124 866 l 70 1012 l 643 1012 l 643 901 l 258 901 q 462 763 422 794 q 636 592 577 677 q 710 360 710 485 m 584 365 q 552 501 584 447 q 451 602 521 555 q 372 611 411 611 q 197 541 258 611 q 136 355 136 472 q 190 171 136 245 q 358 85 252 85 q 528 173 465 85 q 584 365 584 252 "
        },
        "έ": {
            "x_min": 0,
            "x_max": 634.71875,
            "ha": 714,
            "o": "m 634 234 q 527 38 634 110 q 300 -25 433 -25 q 98 29 183 -25 q 0 204 0 93 q 37 313 0 265 q 128 390 67 352 q 56 459 82 419 q 26 555 26 505 q 114 712 26 654 q 295 763 191 763 q 499 700 416 763 q 589 515 589 631 l 478 515 q 419 618 464 580 q 307 657 374 657 q 207 630 253 657 q 151 547 151 598 q 238 445 151 469 q 389 434 280 434 l 389 331 l 349 331 q 206 315 255 331 q 125 210 125 287 q 183 107 125 145 q 302 76 233 76 q 436 117 379 76 q 509 234 493 159 l 634 234 m 520 1040 l 331 819 l 248 819 l 383 1040 l 520 1040 "
        },
        "ω": {
            "x_min": 0,
            "x_max": 922,
            "ha": 1031,
            "o": "m 922 339 q 856 97 922 203 q 650 -26 780 -26 q 538 9 587 -26 q 461 103 489 44 q 387 12 436 46 q 277 -22 339 -22 q 69 97 147 -22 q 0 339 0 203 q 45 551 0 444 q 161 738 84 643 l 302 738 q 175 553 219 647 q 124 336 124 446 q 155 179 124 249 q 275 88 197 88 q 375 163 341 88 q 400 294 400 219 l 400 572 l 524 572 l 524 294 q 561 135 524 192 q 643 88 591 88 q 762 182 719 88 q 797 342 797 257 q 745 556 797 450 q 619 738 705 638 l 760 738 q 874 551 835 640 q 922 339 922 444 "
        },
        "´": {
            "x_min": 0,
            "x_max": 96,
            "ha": 251,
            "o": "m 96 606 l 0 606 l 0 988 l 96 988 l 96 606 "
        },
        "±": {
            "x_min": 11,
            "x_max": 781,
            "ha": 792,
            "o": "m 781 490 l 446 490 l 446 255 l 349 255 l 349 490 l 11 490 l 11 586 l 349 586 l 349 819 l 446 819 l 446 586 l 781 586 l 781 490 m 781 21 l 11 21 l 11 115 l 781 115 l 781 21 "
        },
        "|": {
            "x_min": 343,
            "x_max": 449,
            "ha": 792,
            "o": "m 449 462 l 343 462 l 343 986 l 449 986 l 449 462 m 449 -242 l 343 -242 l 343 280 l 449 280 l 449 -242 "
        },
        "ϋ": {
            "x_min": 0,
            "x_max": 617,
            "ha": 725,
            "o": "m 482 800 l 372 800 l 372 925 l 482 925 l 482 800 m 239 800 l 129 800 l 129 925 l 239 925 l 239 800 m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 "
        },
        "§": {
            "x_min": 0,
            "x_max": 593,
            "ha": 690,
            "o": "m 593 425 q 554 312 593 369 q 467 233 516 254 q 537 83 537 172 q 459 -74 537 -12 q 288 -133 387 -133 q 115 -69 184 -133 q 47 96 47 -6 l 166 96 q 199 7 166 40 q 288 -26 232 -26 q 371 -5 332 -26 q 420 60 420 21 q 311 201 420 139 q 108 309 210 255 q 0 490 0 383 q 33 602 0 551 q 124 687 66 654 q 75 743 93 712 q 58 812 58 773 q 133 984 58 920 q 300 1043 201 1043 q 458 987 394 1043 q 529 814 529 925 l 411 814 q 370 908 404 877 q 289 939 336 939 q 213 911 246 939 q 180 841 180 883 q 286 720 180 779 q 484 612 480 615 q 593 425 593 534 m 467 409 q 355 544 467 473 q 196 630 228 612 q 146 587 162 609 q 124 525 124 558 q 239 387 124 462 q 398 298 369 315 q 448 345 429 316 q 467 409 467 375 "
        },
        "b": {
            "x_min": 0,
            "x_max": 685,
            "ha": 783,
            "o": "m 685 372 q 597 99 685 213 q 347 -25 501 -25 q 219 5 277 -25 q 121 93 161 36 l 121 0 l 0 0 l 0 1013 l 121 1013 l 121 634 q 214 723 157 692 q 341 754 272 754 q 591 637 493 754 q 685 372 685 526 m 554 356 q 499 550 554 470 q 328 644 437 644 q 162 556 223 644 q 108 369 108 478 q 160 176 108 256 q 330 83 221 83 q 498 169 435 83 q 554 356 554 245 "
        },
        "q": {
            "x_min": 0,
            "x_max": 683,
            "ha": 876,
            "o": "m 683 -278 l 564 -278 l 564 97 q 474 8 533 39 q 345 -23 415 -23 q 91 93 188 -23 q 0 364 0 203 q 87 635 0 522 q 337 760 184 760 q 466 727 408 760 q 564 637 523 695 l 564 737 l 683 737 l 683 -278 m 582 375 q 527 564 582 488 q 358 652 466 652 q 190 565 253 652 q 135 377 135 488 q 189 179 135 261 q 361 84 251 84 q 530 179 469 84 q 582 375 582 260 "
        },
        "Ω": {
            "x_min": -0.171875,
            "x_max": 969.5625,
            "ha": 1068,
            "o": "m 969 0 l 555 0 l 555 123 q 744 308 675 194 q 814 558 814 423 q 726 812 814 709 q 484 922 633 922 q 244 820 334 922 q 154 567 154 719 q 223 316 154 433 q 412 123 292 199 l 412 0 l 0 0 l 0 124 l 217 124 q 68 327 122 210 q 15 572 15 444 q 144 911 15 781 q 484 1041 274 1041 q 822 909 691 1041 q 953 569 953 777 q 899 326 953 443 q 750 124 846 210 l 969 124 l 969 0 "
        },
        "ύ": {
            "x_min": 0,
            "x_max": 617,
            "ha": 725,
            "o": "m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 m 535 1040 l 346 819 l 262 819 l 397 1040 l 535 1040 "
        },
        "z": {
            "x_min": -0.015625,
            "x_max": 613.890625,
            "ha": 697,
            "o": "m 613 0 l 0 0 l 0 100 l 433 630 l 20 630 l 20 738 l 594 738 l 593 636 l 163 110 l 613 110 l 613 0 "
        },
        "™": {
            "x_min": 0,
            "x_max": 894,
            "ha": 1000,
            "o": "m 389 951 l 229 951 l 229 503 l 160 503 l 160 951 l 0 951 l 0 1011 l 389 1011 l 389 951 m 894 503 l 827 503 l 827 939 l 685 503 l 620 503 l 481 937 l 481 503 l 417 503 l 417 1011 l 517 1011 l 653 580 l 796 1010 l 894 1011 l 894 503 "
        },
        "ή": {
            "x_min": 0.78125,
            "x_max": 697,
            "ha": 810,
            "o": "m 697 -278 l 572 -278 l 572 454 q 540 587 572 536 q 425 650 501 650 q 271 579 337 650 q 206 420 206 509 l 206 0 l 81 0 l 81 489 q 73 588 81 562 q 0 644 56 644 l 0 741 q 68 755 38 755 q 158 721 124 755 q 200 630 193 687 q 297 726 234 692 q 434 761 359 761 q 620 692 544 761 q 697 516 697 624 l 697 -278 m 479 1040 l 290 819 l 207 819 l 341 1040 l 479 1040 "
        },
        "Θ": {
            "x_min": 0,
            "x_max": 960,
            "ha": 1056,
            "o": "m 960 507 q 833 129 960 280 q 476 -32 698 -32 q 123 129 255 -32 q 0 507 0 280 q 123 883 0 732 q 476 1045 255 1045 q 832 883 696 1045 q 960 507 960 732 m 817 500 q 733 789 817 669 q 476 924 639 924 q 223 792 317 924 q 142 507 142 675 q 222 222 142 339 q 476 89 315 89 q 730 218 636 89 q 817 500 817 334 m 716 449 l 243 449 l 243 571 l 716 571 l 716 449 "
        },
        "®": {
            "x_min": -3,
            "x_max": 1008,
            "ha": 1106,
            "o": "m 503 532 q 614 562 566 532 q 672 658 672 598 q 614 747 672 716 q 503 772 569 772 l 338 772 l 338 532 l 503 532 m 502 -7 q 123 151 263 -7 q -3 501 -3 294 q 123 851 -3 706 q 502 1011 263 1011 q 881 851 739 1011 q 1008 501 1008 708 q 883 151 1008 292 q 502 -7 744 -7 m 502 60 q 830 197 709 60 q 940 501 940 322 q 831 805 940 681 q 502 944 709 944 q 174 805 296 944 q 65 501 65 680 q 173 197 65 320 q 502 60 294 60 m 788 146 l 678 146 q 653 316 655 183 q 527 449 652 449 l 338 449 l 338 146 l 241 146 l 241 854 l 518 854 q 688 808 621 854 q 766 658 766 755 q 739 563 766 607 q 668 497 713 519 q 751 331 747 472 q 788 164 756 190 l 788 146 "
        },
        "~": {
            "x_min": 0,
            "x_max": 833,
            "ha": 931,
            "o": "m 833 958 q 778 753 833 831 q 594 665 716 665 q 402 761 502 665 q 240 857 302 857 q 131 795 166 857 q 104 665 104 745 l 0 665 q 54 867 0 789 q 237 958 116 958 q 429 861 331 958 q 594 765 527 765 q 704 827 670 765 q 729 958 729 874 l 833 958 "
        },
        "Ε": {
            "x_min": 0,
            "x_max": 736.21875,
            "ha": 778,
            "o": "m 736 0 l 0 0 l 0 1013 l 725 1013 l 725 889 l 139 889 l 139 585 l 677 585 l 677 467 l 139 467 l 139 125 l 736 125 l 736 0 "
        },
        "³": {
            "x_min": 0,
            "x_max": 450,
            "ha": 547,
            "o": "m 450 552 q 379 413 450 464 q 220 366 313 366 q 69 414 130 366 q 0 567 0 470 l 85 567 q 126 470 85 504 q 225 437 168 437 q 320 467 280 437 q 360 552 360 498 q 318 632 360 608 q 213 657 276 657 q 195 657 203 657 q 176 657 181 657 l 176 722 q 279 733 249 722 q 334 815 334 752 q 300 881 334 856 q 220 907 267 907 q 133 875 169 907 q 97 781 97 844 l 15 781 q 78 926 15 875 q 220 972 135 972 q 364 930 303 972 q 426 817 426 888 q 344 697 426 733 q 421 642 392 681 q 450 552 450 603 "
        },
        "[": {
            "x_min": 0,
            "x_max": 273.609375,
            "ha": 371,
            "o": "m 273 -281 l 0 -281 l 0 1013 l 273 1013 l 273 920 l 124 920 l 124 -187 l 273 -187 l 273 -281 "
        },
        "L": {
            "x_min": 0,
            "x_max": 645.828125,
            "ha": 696,
            "o": "m 645 0 l 0 0 l 0 1013 l 140 1013 l 140 126 l 645 126 l 645 0 "
        },
        "σ": {
            "x_min": 0,
            "x_max": 803.390625,
            "ha": 894,
            "o": "m 803 628 l 633 628 q 713 368 713 512 q 618 93 713 204 q 357 -25 518 -25 q 94 91 194 -25 q 0 368 0 201 q 94 644 0 533 q 356 761 194 761 q 481 750 398 761 q 608 739 564 739 l 803 739 l 803 628 m 360 85 q 529 180 467 85 q 584 374 584 262 q 527 566 584 490 q 352 651 463 651 q 187 559 247 651 q 135 368 135 478 q 189 175 135 254 q 360 85 251 85 "
        },
        "ζ": {
            "x_min": 0,
            "x_max": 573,
            "ha": 642,
            "o": "m 573 -40 q 553 -162 573 -97 q 510 -278 543 -193 l 400 -278 q 441 -187 428 -219 q 462 -90 462 -132 q 378 -14 462 -14 q 108 45 197 -14 q 0 290 0 117 q 108 631 0 462 q 353 901 194 767 l 55 901 l 55 1012 l 561 1012 l 561 924 q 261 669 382 831 q 128 301 128 489 q 243 117 128 149 q 458 98 350 108 q 573 -40 573 80 "
        },
        "θ": {
            "x_min": 0,
            "x_max": 674,
            "ha": 778,
            "o": "m 674 496 q 601 160 674 304 q 336 -26 508 -26 q 73 153 165 -26 q 0 485 0 296 q 72 840 0 683 q 343 1045 166 1045 q 605 844 516 1045 q 674 496 674 692 m 546 579 q 498 798 546 691 q 336 935 437 935 q 178 798 237 935 q 126 579 137 701 l 546 579 m 546 475 l 126 475 q 170 233 126 348 q 338 80 230 80 q 504 233 447 80 q 546 475 546 346 "
        },
        "Ο": {
            "x_min": 0,
            "x_max": 958,
            "ha": 1054,
            "o": "m 485 1042 q 834 883 703 1042 q 958 511 958 735 q 834 136 958 287 q 481 -26 701 -26 q 126 130 261 -26 q 0 504 0 279 q 127 880 0 729 q 485 1042 263 1042 m 480 98 q 731 225 638 98 q 815 504 815 340 q 733 783 815 670 q 480 913 640 913 q 226 785 321 913 q 142 504 142 671 q 226 224 142 339 q 480 98 319 98 "
        },
        "Γ": {
            "x_min": 0,
            "x_max": 705.28125,
            "ha": 749,
            "o": "m 705 886 l 140 886 l 140 0 l 0 0 l 0 1012 l 705 1012 l 705 886 "
        },
        " ": {
            "x_min": 0,
            "x_max": 0,
            "ha": 375
        },
        "%": {
            "x_min": -3,
            "x_max": 1089,
            "ha": 1186,
            "o": "m 845 0 q 663 76 731 0 q 602 244 602 145 q 661 412 602 344 q 845 489 728 489 q 1027 412 959 489 q 1089 244 1089 343 q 1029 76 1089 144 q 845 0 962 0 m 844 103 q 945 143 909 103 q 981 243 981 184 q 947 340 981 301 q 844 385 909 385 q 744 342 781 385 q 708 243 708 300 q 741 147 708 186 q 844 103 780 103 m 888 986 l 284 -25 l 199 -25 l 803 986 l 888 986 m 241 468 q 58 545 126 468 q -3 715 -3 615 q 56 881 -3 813 q 238 958 124 958 q 421 881 353 958 q 483 712 483 813 q 423 544 483 612 q 241 468 356 468 m 241 855 q 137 811 175 855 q 100 710 100 768 q 136 612 100 653 q 240 572 172 572 q 344 614 306 572 q 382 713 382 656 q 347 810 382 771 q 241 855 308 855 "
        },
        "P": {
            "x_min": 0,
            "x_max": 726,
            "ha": 806,
            "o": "m 424 1013 q 640 931 555 1013 q 726 719 726 850 q 637 506 726 587 q 413 426 548 426 l 140 426 l 140 0 l 0 0 l 0 1013 l 424 1013 m 379 889 l 140 889 l 140 548 l 372 548 q 522 589 459 548 q 593 720 593 637 q 528 845 593 801 q 379 889 463 889 "
        },
        "Έ": {
            "x_min": 0,
            "x_max": 1078.21875,
            "ha": 1118,
            "o": "m 1078 0 l 342 0 l 342 1013 l 1067 1013 l 1067 889 l 481 889 l 481 585 l 1019 585 l 1019 467 l 481 467 l 481 125 l 1078 125 l 1078 0 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "
        },
        "Ώ": {
            "x_min": 0.125,
            "x_max": 1136.546875,
            "ha": 1235,
            "o": "m 1136 0 l 722 0 l 722 123 q 911 309 842 194 q 981 558 981 423 q 893 813 981 710 q 651 923 800 923 q 411 821 501 923 q 321 568 321 720 q 390 316 321 433 q 579 123 459 200 l 579 0 l 166 0 l 166 124 l 384 124 q 235 327 289 210 q 182 572 182 444 q 311 912 182 782 q 651 1042 441 1042 q 989 910 858 1042 q 1120 569 1120 778 q 1066 326 1120 443 q 917 124 1013 210 l 1136 124 l 1136 0 m 277 1040 l 83 800 l 0 800 l 140 1041 l 277 1040 "
        },
        "_": {
            "x_min": 0,
            "x_max": 705.5625,
            "ha": 803,
            "o": "m 705 -334 l 0 -334 l 0 -234 l 705 -234 l 705 -334 "
        },
        "Ϊ": {
            "x_min": -110,
            "x_max": 246,
            "ha": 275,
            "o": "m 246 1046 l 118 1046 l 118 1189 l 246 1189 l 246 1046 m 18 1046 l -110 1046 l -110 1189 l 18 1189 l 18 1046 m 136 0 l 0 0 l 0 1012 l 136 1012 l 136 0 "
        },
        "+": {
            "x_min": 23,
            "x_max": 768,
            "ha": 792,
            "o": "m 768 372 l 444 372 l 444 0 l 347 0 l 347 372 l 23 372 l 23 468 l 347 468 l 347 840 l 444 840 l 444 468 l 768 468 l 768 372 "
        },
        "½": {
            "x_min": 0,
            "x_max": 1050,
            "ha": 1149,
            "o": "m 1050 0 l 625 0 q 712 178 625 108 q 878 277 722 187 q 967 385 967 328 q 932 456 967 429 q 850 484 897 484 q 759 450 798 484 q 721 352 721 416 l 640 352 q 706 502 640 448 q 851 551 766 551 q 987 509 931 551 q 1050 385 1050 462 q 976 251 1050 301 q 829 179 902 215 q 717 68 740 133 l 1050 68 l 1050 0 m 834 985 l 215 -28 l 130 -28 l 750 984 l 834 985 m 224 422 l 142 422 l 142 811 l 0 811 l 0 867 q 104 889 62 867 q 164 973 157 916 l 224 973 l 224 422 "
        },
        "Ρ": {
            "x_min": 0,
            "x_max": 720,
            "ha": 783,
            "o": "m 424 1013 q 637 933 554 1013 q 720 723 720 853 q 633 508 720 591 q 413 426 546 426 l 140 426 l 140 0 l 0 0 l 0 1013 l 424 1013 m 378 889 l 140 889 l 140 548 l 371 548 q 521 589 458 548 q 592 720 592 637 q 527 845 592 801 q 378 889 463 889 "
        },
        "'": {
            "x_min": 0,
            "x_max": 139,
            "ha": 236,
            "o": "m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 "
        },
        "ª": {
            "x_min": 0,
            "x_max": 350,
            "ha": 397,
            "o": "m 350 625 q 307 616 328 616 q 266 631 281 616 q 247 673 251 645 q 190 628 225 644 q 116 613 156 613 q 32 641 64 613 q 0 722 0 669 q 72 826 0 800 q 247 866 159 846 l 247 887 q 220 934 247 916 q 162 953 194 953 q 104 934 129 953 q 76 882 80 915 l 16 882 q 60 976 16 941 q 166 1011 104 1011 q 266 979 224 1011 q 308 891 308 948 l 308 706 q 311 679 308 688 q 331 670 315 670 l 350 672 l 350 625 m 247 757 l 247 811 q 136 790 175 798 q 64 726 64 773 q 83 682 64 697 q 132 667 103 667 q 207 690 174 667 q 247 757 247 718 "
        },
        "΅": {
            "x_min": 0,
            "x_max": 450,
            "ha": 553,
            "o": "m 450 800 l 340 800 l 340 925 l 450 925 l 450 800 m 406 1040 l 212 800 l 129 800 l 269 1040 l 406 1040 m 110 800 l 0 800 l 0 925 l 110 925 l 110 800 "
        },
        "T": {
            "x_min": 0,
            "x_max": 777,
            "ha": 835,
            "o": "m 777 894 l 458 894 l 458 0 l 319 0 l 319 894 l 0 894 l 0 1013 l 777 1013 l 777 894 "
        },
        "Φ": {
            "x_min": 0,
            "x_max": 915,
            "ha": 997,
            "o": "m 527 0 l 389 0 l 389 122 q 110 231 220 122 q 0 509 0 340 q 110 785 0 677 q 389 893 220 893 l 389 1013 l 527 1013 l 527 893 q 804 786 693 893 q 915 509 915 679 q 805 231 915 341 q 527 122 696 122 l 527 0 m 527 226 q 712 310 641 226 q 779 507 779 389 q 712 705 779 627 q 527 787 641 787 l 527 226 m 389 226 l 389 787 q 205 698 275 775 q 136 505 136 620 q 206 308 136 391 q 389 226 276 226 "
        },
        "⁋": {
            "x_min": 0,
            "x_max": 0,
            "ha": 694
        },
        "j": {
            "x_min": -77.78125,
            "x_max": 167,
            "ha": 349,
            "o": "m 167 871 l 42 871 l 42 1013 l 167 1013 l 167 871 m 167 -80 q 121 -231 167 -184 q -26 -278 76 -278 l -77 -278 l -77 -164 l -41 -164 q 26 -143 11 -164 q 42 -65 42 -122 l 42 737 l 167 737 l 167 -80 "
        },
        "Σ": {
            "x_min": 0,
            "x_max": 756.953125,
            "ha": 819,
            "o": "m 756 0 l 0 0 l 0 107 l 395 523 l 22 904 l 22 1013 l 745 1013 l 745 889 l 209 889 l 566 523 l 187 125 l 756 125 l 756 0 "
        },
        "1": {
            "x_min": 215.671875,
            "x_max": 574,
            "ha": 792,
            "o": "m 574 0 l 442 0 l 442 697 l 215 697 l 215 796 q 386 833 330 796 q 475 986 447 875 l 574 986 l 574 0 "
        },
        "›": {
            "x_min": 18.0625,
            "x_max": 774,
            "ha": 792,
            "o": "m 774 376 l 18 40 l 18 149 l 631 421 l 18 692 l 18 799 l 774 465 l 774 376 "
        },
        "<": {
            "x_min": 17.984375,
            "x_max": 773.609375,
            "ha": 792,
            "o": "m 773 40 l 18 376 l 17 465 l 773 799 l 773 692 l 159 420 l 773 149 l 773 40 "
        },
        "£": {
            "x_min": 0,
            "x_max": 704.484375,
            "ha": 801,
            "o": "m 704 41 q 623 -10 664 5 q 543 -26 583 -26 q 359 15 501 -26 q 243 36 288 36 q 158 23 197 36 q 73 -21 119 10 l 6 76 q 125 195 90 150 q 175 331 175 262 q 147 443 175 383 l 0 443 l 0 512 l 108 512 q 43 734 43 623 q 120 929 43 854 q 358 1010 204 1010 q 579 936 487 1010 q 678 729 678 857 l 678 684 l 552 684 q 504 838 552 780 q 362 896 457 896 q 216 852 263 896 q 176 747 176 815 q 199 627 176 697 q 248 512 217 574 l 468 512 l 468 443 l 279 443 q 297 356 297 398 q 230 194 297 279 q 153 107 211 170 q 227 133 190 125 q 293 142 264 142 q 410 119 339 142 q 516 96 482 96 q 579 105 550 96 q 648 142 608 115 l 704 41 "
        },
        "t": {
            "x_min": 0,
            "x_max": 367,
            "ha": 458,
            "o": "m 367 0 q 312 -5 339 -2 q 262 -8 284 -8 q 145 28 183 -8 q 108 143 108 64 l 108 638 l 0 638 l 0 738 l 108 738 l 108 944 l 232 944 l 232 738 l 367 738 l 367 638 l 232 638 l 232 185 q 248 121 232 140 q 307 102 264 102 q 345 104 330 102 q 367 107 360 107 l 367 0 "
        },
        "¬": {
            "x_min": 0,
            "x_max": 706,
            "ha": 803,
            "o": "m 706 411 l 706 158 l 630 158 l 630 335 l 0 335 l 0 411 l 706 411 "
        },
        "λ": {
            "x_min": 0,
            "x_max": 750,
            "ha": 803,
            "o": "m 750 -7 q 679 -15 716 -15 q 538 59 591 -15 q 466 214 512 97 l 336 551 l 126 0 l 0 0 l 270 705 q 223 837 247 770 q 116 899 190 899 q 90 898 100 899 l 90 1004 q 152 1011 125 1011 q 298 938 244 1011 q 373 783 326 901 l 605 192 q 649 115 629 136 q 716 95 669 95 l 736 95 q 750 97 745 97 l 750 -7 "
        },
        "W": {
            "x_min": 0,
            "x_max": 1263.890625,
            "ha": 1351,
            "o": "m 1263 1013 l 995 0 l 859 0 l 627 837 l 405 0 l 265 0 l 0 1013 l 136 1013 l 342 202 l 556 1013 l 701 1013 l 921 207 l 1133 1012 l 1263 1013 "
        },
        ">": {
            "x_min": 18.0625,
            "x_max": 774,
            "ha": 792,
            "o": "m 774 376 l 18 40 l 18 149 l 631 421 l 18 692 l 18 799 l 774 465 l 774 376 "
        },
        "v": {
            "x_min": 0,
            "x_max": 675.15625,
            "ha": 761,
            "o": "m 675 738 l 404 0 l 272 0 l 0 738 l 133 737 l 340 147 l 541 737 l 675 738 "
        },
        "τ": {
            "x_min": 0.28125,
            "x_max": 644.5,
            "ha": 703,
            "o": "m 644 628 l 382 628 l 382 179 q 388 120 382 137 q 436 91 401 91 q 474 94 447 91 q 504 97 501 97 l 504 0 q 454 -9 482 -5 q 401 -14 426 -14 q 278 67 308 -14 q 260 233 260 118 l 260 628 l 0 628 l 0 739 l 644 739 l 644 628 "
        },
        "ξ": {
            "x_min": 0,
            "x_max": 624.9375,
            "ha": 699,
            "o": "m 624 -37 q 608 -153 624 -96 q 563 -278 593 -211 l 454 -278 q 491 -183 486 -200 q 511 -83 511 -126 q 484 -23 511 -44 q 370 1 452 1 q 323 0 354 1 q 283 -1 293 -1 q 84 76 169 -1 q 0 266 0 154 q 56 431 0 358 q 197 538 108 498 q 94 613 134 562 q 54 730 54 665 q 77 823 54 780 q 143 901 101 867 l 27 901 l 27 1012 l 576 1012 l 576 901 l 380 901 q 244 863 303 901 q 178 745 178 820 q 312 600 178 636 q 532 582 380 582 l 532 479 q 276 455 361 479 q 118 281 118 410 q 165 173 118 217 q 274 120 208 133 q 494 101 384 110 q 624 -37 624 76 "
        },
        "&": {
            "x_min": -3,
            "x_max": 894.25,
            "ha": 992,
            "o": "m 894 0 l 725 0 l 624 123 q 471 0 553 40 q 306 -41 390 -41 q 168 -7 231 -41 q 62 92 105 26 q 14 187 31 139 q -3 276 -3 235 q 55 433 -3 358 q 248 581 114 508 q 170 689 196 640 q 137 817 137 751 q 214 985 137 922 q 384 1041 284 1041 q 548 988 483 1041 q 622 824 622 928 q 563 666 622 739 q 431 556 516 608 l 621 326 q 649 407 639 361 q 663 493 653 426 l 781 493 q 703 229 781 352 l 894 0 m 504 818 q 468 908 504 877 q 384 940 433 940 q 293 907 331 940 q 255 818 255 875 q 289 714 255 767 q 363 628 313 678 q 477 729 446 682 q 504 818 504 771 m 556 209 l 314 499 q 179 395 223 449 q 135 283 135 341 q 146 222 135 253 q 183 158 158 192 q 333 80 241 80 q 556 209 448 80 "
        },
        "Λ": {
            "x_min": 0,
            "x_max": 862.5,
            "ha": 942,
            "o": "m 862 0 l 719 0 l 426 847 l 143 0 l 0 0 l 356 1013 l 501 1013 l 862 0 "
        },
        "I": {
            "x_min": 41,
            "x_max": 180,
            "ha": 293,
            "o": "m 180 0 l 41 0 l 41 1013 l 180 1013 l 180 0 "
        },
        "G": {
            "x_min": 0,
            "x_max": 921,
            "ha": 1011,
            "o": "m 921 0 l 832 0 l 801 136 q 655 15 741 58 q 470 -28 568 -28 q 126 133 259 -28 q 0 499 0 284 q 125 881 0 731 q 486 1043 259 1043 q 763 957 647 1043 q 905 709 890 864 l 772 709 q 668 866 747 807 q 486 926 589 926 q 228 795 322 926 q 142 507 142 677 q 228 224 142 342 q 483 94 323 94 q 712 195 625 94 q 796 435 796 291 l 477 435 l 477 549 l 921 549 l 921 0 "
        },
        "ΰ": {
            "x_min": 0,
            "x_max": 617,
            "ha": 725,
            "o": "m 524 800 l 414 800 l 414 925 l 524 925 l 524 800 m 183 800 l 73 800 l 73 925 l 183 925 l 183 800 m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 m 489 1040 l 300 819 l 216 819 l 351 1040 l 489 1040 "
        },
        "`": {
            "x_min": 0,
            "x_max": 138.890625,
            "ha": 236,
            "o": "m 138 699 l 0 699 l 0 861 q 36 974 0 929 q 138 1041 72 1020 l 138 977 q 82 931 95 969 q 69 839 69 893 l 138 839 l 138 699 "
        },
        "·": {
            "x_min": 0,
            "x_max": 142,
            "ha": 239,
            "o": "m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 "
        },
        "Υ": {
            "x_min": 0.328125,
            "x_max": 819.515625,
            "ha": 889,
            "o": "m 819 1013 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1013 l 140 1013 l 411 533 l 679 1013 l 819 1013 "
        },
        "r": {
            "x_min": 0,
            "x_max": 355.5625,
            "ha": 432,
            "o": "m 355 621 l 343 621 q 179 569 236 621 q 122 411 122 518 l 122 0 l 0 0 l 0 737 l 117 737 l 117 604 q 204 719 146 686 q 355 753 262 753 l 355 621 "
        },
        "x": {
            "x_min": 0,
            "x_max": 675,
            "ha": 764,
            "o": "m 675 0 l 525 0 l 331 286 l 144 0 l 0 0 l 256 379 l 12 738 l 157 737 l 336 473 l 516 738 l 661 738 l 412 380 l 675 0 "
        },
        "μ": {
            "x_min": 0,
            "x_max": 696.609375,
            "ha": 747,
            "o": "m 696 -4 q 628 -14 657 -14 q 498 97 513 -14 q 422 8 470 41 q 313 -24 374 -24 q 207 3 258 -24 q 120 80 157 31 l 120 -278 l 0 -278 l 0 738 l 124 738 l 124 343 q 165 172 124 246 q 308 82 216 82 q 451 177 402 82 q 492 358 492 254 l 492 738 l 616 738 l 616 214 q 623 136 616 160 q 673 92 636 92 q 696 95 684 92 l 696 -4 "
        },
        "h": {
            "x_min": 0,
            "x_max": 615,
            "ha": 724,
            "o": "m 615 472 l 615 0 l 490 0 l 490 454 q 456 590 490 535 q 338 654 416 654 q 186 588 251 654 q 122 436 122 522 l 122 0 l 0 0 l 0 1013 l 122 1013 l 122 633 q 218 727 149 694 q 362 760 287 760 q 552 676 484 760 q 615 472 615 600 "
        },
        ".": {
            "x_min": 0,
            "x_max": 142,
            "ha": 239,
            "o": "m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 "
        },
        "φ": {
            "x_min": -2,
            "x_max": 878,
            "ha": 974,
            "o": "m 496 -279 l 378 -279 l 378 -17 q 101 88 204 -17 q -2 367 -2 194 q 68 626 -2 510 q 283 758 151 758 l 283 646 q 167 537 209 626 q 133 373 133 462 q 192 177 133 254 q 378 93 259 93 l 378 758 q 445 764 426 763 q 476 765 464 765 q 765 659 653 765 q 878 377 878 553 q 771 96 878 209 q 496 -17 665 -17 l 496 -279 m 496 93 l 514 93 q 687 183 623 93 q 746 380 746 265 q 691 569 746 491 q 522 658 629 658 l 496 656 l 496 93 "
        },
        ";": {
            "x_min": 0,
            "x_max": 142,
            "ha": 239,
            "o": "m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 m 142 -12 q 105 -132 142 -82 q 0 -206 68 -182 l 0 -138 q 58 -82 43 -123 q 68 0 68 -56 l 0 0 l 0 151 l 142 151 l 142 -12 "
        },
        "f": {
            "x_min": 0,
            "x_max": 378,
            "ha": 472,
            "o": "m 378 638 l 246 638 l 246 0 l 121 0 l 121 638 l 0 638 l 0 738 l 121 738 q 137 935 121 887 q 290 1028 171 1028 q 320 1027 305 1028 q 378 1021 334 1026 l 378 908 q 323 918 346 918 q 257 870 273 918 q 246 780 246 840 l 246 738 l 378 738 l 378 638 "
        },
        "“": {
            "x_min": 1,
            "x_max": 348.21875,
            "ha": 454,
            "o": "m 140 670 l 1 670 l 1 830 q 37 943 1 897 q 140 1011 74 990 l 140 947 q 82 900 97 940 q 68 810 68 861 l 140 810 l 140 670 m 348 670 l 209 670 l 209 830 q 245 943 209 897 q 348 1011 282 990 l 348 947 q 290 900 305 940 q 276 810 276 861 l 348 810 l 348 670 "
        },
        "A": {
            "x_min": 0.03125,
            "x_max": 906.953125,
            "ha": 1008,
            "o": "m 906 0 l 756 0 l 648 303 l 251 303 l 142 0 l 0 0 l 376 1013 l 529 1013 l 906 0 m 610 421 l 452 867 l 293 421 l 610 421 "
        },
        "6": {
            "x_min": 53,
            "x_max": 739,
            "ha": 792,
            "o": "m 739 312 q 633 62 739 162 q 400 -31 534 -31 q 162 78 257 -31 q 53 439 53 206 q 178 859 53 712 q 441 986 284 986 q 643 912 559 986 q 732 713 732 833 l 601 713 q 544 830 594 786 q 426 875 494 875 q 268 793 331 875 q 193 517 193 697 q 301 597 240 570 q 427 624 362 624 q 643 540 552 624 q 739 312 739 451 m 603 298 q 540 461 603 400 q 404 516 484 516 q 268 461 323 516 q 207 300 207 401 q 269 137 207 198 q 405 83 325 83 q 541 137 486 83 q 603 298 603 197 "
        },
        "‘": {
            "x_min": 1,
            "x_max": 139.890625,
            "ha": 236,
            "o": "m 139 670 l 1 670 l 1 830 q 37 943 1 897 q 139 1011 74 990 l 139 947 q 82 900 97 940 q 68 810 68 861 l 139 810 l 139 670 "
        },
        "ϊ": {
            "x_min": -70,
            "x_max": 283,
            "ha": 361,
            "o": "m 283 800 l 173 800 l 173 925 l 283 925 l 283 800 m 40 800 l -70 800 l -70 925 l 40 925 l 40 800 m 283 3 q 232 -10 257 -5 q 181 -15 206 -15 q 84 26 118 -15 q 41 200 41 79 l 41 737 l 166 737 l 167 215 q 171 141 167 157 q 225 101 182 101 q 247 103 238 101 q 283 112 256 104 l 283 3 "
        },
        "π": {
            "x_min": -0.21875,
            "x_max": 773.21875,
            "ha": 857,
            "o": "m 773 -7 l 707 -11 q 575 40 607 -11 q 552 174 552 77 l 552 226 l 552 626 l 222 626 l 222 0 l 97 0 l 97 626 l 0 626 l 0 737 l 773 737 l 773 626 l 676 626 l 676 171 q 695 103 676 117 q 773 90 714 90 l 773 -7 "
        },
        "ά": {
            "x_min": 0,
            "x_max": 765.5625,
            "ha": 809,
            "o": "m 765 -4 q 698 -14 726 -14 q 564 97 586 -14 q 466 7 525 40 q 337 -26 407 -26 q 88 98 186 -26 q 0 369 0 212 q 88 637 0 525 q 337 760 184 760 q 465 727 407 760 q 563 637 524 695 l 563 738 l 685 738 l 685 222 q 693 141 685 168 q 748 94 708 94 q 765 95 760 94 l 765 -4 m 584 371 q 531 562 584 485 q 360 653 470 653 q 192 566 254 653 q 135 379 135 489 q 186 181 135 261 q 358 84 247 84 q 528 176 465 84 q 584 371 584 260 m 604 1040 l 415 819 l 332 819 l 466 1040 l 604 1040 "
        },
        "O": {
            "x_min": 0,
            "x_max": 958,
            "ha": 1057,
            "o": "m 485 1041 q 834 882 702 1041 q 958 512 958 734 q 834 136 958 287 q 481 -26 702 -26 q 126 130 261 -26 q 0 504 0 279 q 127 880 0 728 q 485 1041 263 1041 m 480 98 q 731 225 638 98 q 815 504 815 340 q 733 783 815 669 q 480 912 640 912 q 226 784 321 912 q 142 504 142 670 q 226 224 142 339 q 480 98 319 98 "
        },
        "n": {
            "x_min": 0,
            "x_max": 615,
            "ha": 724,
            "o": "m 615 463 l 615 0 l 490 0 l 490 454 q 453 592 490 537 q 331 656 410 656 q 178 585 240 656 q 117 421 117 514 l 117 0 l 0 0 l 0 738 l 117 738 l 117 630 q 218 728 150 693 q 359 764 286 764 q 552 675 484 764 q 615 463 615 593 "
        },
        "3": {
            "x_min": 54,
            "x_max": 737,
            "ha": 792,
            "o": "m 737 284 q 635 55 737 141 q 399 -25 541 -25 q 156 52 248 -25 q 54 308 54 140 l 185 308 q 245 147 185 202 q 395 96 302 96 q 539 140 484 96 q 602 280 602 190 q 510 429 602 390 q 324 454 451 454 l 324 565 q 487 584 441 565 q 565 719 565 617 q 515 835 565 791 q 395 879 466 879 q 255 824 307 879 q 203 661 203 769 l 78 661 q 166 909 78 822 q 387 992 250 992 q 603 921 513 992 q 701 723 701 844 q 669 607 701 656 q 578 524 637 558 q 696 434 655 499 q 737 284 737 369 "
        },
        "9": {
            "x_min": 53,
            "x_max": 739,
            "ha": 792,
            "o": "m 739 524 q 619 94 739 241 q 362 -32 516 -32 q 150 47 242 -32 q 59 244 59 126 l 191 244 q 246 129 191 176 q 373 82 301 82 q 526 161 466 82 q 597 440 597 255 q 363 334 501 334 q 130 432 216 334 q 53 650 53 521 q 134 880 53 786 q 383 986 226 986 q 659 841 566 986 q 739 524 739 719 m 388 449 q 535 514 480 449 q 585 658 585 573 q 535 805 585 744 q 388 873 480 873 q 242 809 294 873 q 191 658 191 745 q 239 514 191 572 q 388 449 292 449 "
        },
        "l": {
            "x_min": 41,
            "x_max": 166,
            "ha": 279,
            "o": "m 166 0 l 41 0 l 41 1013 l 166 1013 l 166 0 "
        },
        "¤": {
            "x_min": 40.09375,
            "x_max": 728.796875,
            "ha": 825,
            "o": "m 728 304 l 649 224 l 512 363 q 383 331 458 331 q 256 363 310 331 l 119 224 l 40 304 l 177 441 q 150 553 150 493 q 184 673 150 621 l 40 818 l 119 898 l 267 749 q 321 766 291 759 q 384 773 351 773 q 447 766 417 773 q 501 749 477 759 l 649 898 l 728 818 l 585 675 q 612 618 604 648 q 621 553 621 587 q 591 441 621 491 l 728 304 m 384 682 q 280 643 318 682 q 243 551 243 604 q 279 461 243 499 q 383 423 316 423 q 487 461 449 423 q 525 553 525 500 q 490 641 525 605 q 384 682 451 682 "
        },
        "κ": {
            "x_min": 0,
            "x_max": 632.328125,
            "ha": 679,
            "o": "m 632 0 l 482 0 l 225 384 l 124 288 l 124 0 l 0 0 l 0 738 l 124 738 l 124 446 l 433 738 l 596 738 l 312 466 l 632 0 "
        },
        "4": {
            "x_min": 48,
            "x_max": 742.453125,
            "ha": 792,
            "o": "m 742 243 l 602 243 l 602 0 l 476 0 l 476 243 l 48 243 l 48 368 l 476 958 l 602 958 l 602 354 l 742 354 l 742 243 m 476 354 l 476 792 l 162 354 l 476 354 "
        },
        "p": {
            "x_min": 0,
            "x_max": 685,
            "ha": 786,
            "o": "m 685 364 q 598 96 685 205 q 350 -23 504 -23 q 121 89 205 -23 l 121 -278 l 0 -278 l 0 738 l 121 738 l 121 633 q 220 726 159 691 q 351 761 280 761 q 598 636 504 761 q 685 364 685 522 m 557 371 q 501 560 557 481 q 330 651 437 651 q 162 559 223 651 q 108 366 108 479 q 162 177 108 254 q 333 87 224 87 q 502 178 441 87 q 557 371 557 258 "
        },
        "‡": {
            "x_min": 0,
            "x_max": 777,
            "ha": 835,
            "o": "m 458 238 l 458 0 l 319 0 l 319 238 l 0 238 l 0 360 l 319 360 l 319 681 l 0 683 l 0 804 l 319 804 l 319 1015 l 458 1013 l 458 804 l 777 804 l 777 683 l 458 683 l 458 360 l 777 360 l 777 238 l 458 238 "
        },
        "ψ": {
            "x_min": 0,
            "x_max": 808,
            "ha": 907,
            "o": "m 465 -278 l 341 -278 l 341 -15 q 87 102 180 -15 q 0 378 0 210 l 0 739 l 133 739 l 133 379 q 182 195 133 275 q 341 98 242 98 l 341 922 l 465 922 l 465 98 q 623 195 563 98 q 675 382 675 278 l 675 742 l 808 742 l 808 381 q 720 104 808 213 q 466 -13 627 -13 l 465 -278 "
        },
        "η": {
            "x_min": 0.78125,
            "x_max": 697,
            "ha": 810,
            "o": "m 697 -278 l 572 -278 l 572 454 q 540 587 572 536 q 425 650 501 650 q 271 579 337 650 q 206 420 206 509 l 206 0 l 81 0 l 81 489 q 73 588 81 562 q 0 644 56 644 l 0 741 q 68 755 38 755 q 158 720 124 755 q 200 630 193 686 q 297 726 234 692 q 434 761 359 761 q 620 692 544 761 q 697 516 697 624 l 697 -278 "
        }
    },
    "cssFontWeight": "normal",
    "ascender": 1189,
    "underlinePosition": -100,
    "cssFontStyle": "normal",
    "boundingBox": {
        "yMin": -334,
        "xMin": -111,
        "yMax": 1189,
        "xMax": 1672
    },
    "resolution": 1000,
    "original_font_information": {
        "postscript_name": "Helvetiker-Regular",
        "version_string": "Version 1.00 2004 initial release",
        "vendor_url": "http://www.magenta.gr/",
        "full_font_name": "Helvetiker",
        "font_family_name": "Helvetiker",
        "copyright": "Copyright (c) Μagenta ltd, 2004",
        "description": "",
        "trademark": "",
        "designer": "",
        "designer_url": "",
        "unique_font_identifier": "Μagenta ltd:Helvetiker:22-10-104",
        "license_url": "http://www.ellak.gr/fonts/MgOpen/license.html",
        "license_description": "Copyright (c) 2004 by MAGENTA Ltd. All Rights Reserved.\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy of the fonts accompanying this license (\"Fonts\") and associated documentation files (the \"Font Software\"), to reproduce and distribute the Font Software, including without limitation the rights to use, copy, merge, publish, distribute, and/or sell copies of the Font Software, and to permit persons to whom the Font Software is furnished to do so, subject to the following conditions: \r\n\r\nThe above copyright and this permission notice shall be included in all copies of one or more of the Font Software typefaces.\r\n\r\nThe Font Software may be modified, altered, or added to, and in particular the designs of glyphs or characters in the Fonts may be modified and additional glyphs or characters may be added to the Fonts, only if the fonts are renamed to names not containing the word \"MgOpen\", or if the modifications are accepted for inclusion in the Font Software itself by the each appointed Administrator.\r\n\r\nThis License becomes null and void to the extent applicable to Fonts or Font Software that has been modified and is distributed under the \"MgOpen\" name.\r\n\r\nThe Font Software may be sold as part of a larger software package but no copy of one or more of the Font Software typefaces may be sold by itself. \r\n\r\nTHE FONT SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL MAGENTA OR PERSONS OR BODIES IN CHARGE OF ADMINISTRATION AND MAINTENANCE OF THE FONT SOFTWARE BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.",
        "manufacturer_name": "Μagenta ltd",
        "font_sub_family_name": "Regular"
    },
    "descender": -334,
    "familyName": "Helvetiker",
    "lineHeight": 1522,
    "underlineThickness": 50
});

/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = [],
        d = c.slice,
        e = c.concat,
        f = c.push,
        g = c.indexOf,
        h = {},
        i = h.toString,
        j = h.hasOwnProperty,
        k = {},
        l = "1.11.1",
        m = function(a, b) {
            return new m.fn.init(a, b)
        },
        n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        o = /^-ms-/,
        p = /-([\da-z])/gi,
        q = function(a, b) {
            return b.toUpperCase()
        };
    m.fn = m.prototype = {
        jquery: l,
        constructor: m,
        selector: "",
        length: 0,
        toArray: function() {
            return d.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
        },
        pushStack: function(a) {
            var b = m.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a, b) {
            return m.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(m.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(d.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: c.sort,
        splice: c.splice
    }, m.extend = m.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null != (e = arguments[h]))
                for (d in e) a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g
    }, m.extend({
        expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === m.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === m.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !m.isArray(a) && a - parseFloat(a) >= 0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
            try {
                if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (c) {
                return !1
            }
            if (k.ownLast)
                for (b in a) return j.call(a, b);
            for (b in a);
            return void 0 === b || j.call(a, b)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
        },
        globalEval: function(b) {
            b && m.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b)
            })(b)
        },
        camelCase: function(a) {
            return a.replace(o, "ms-").replace(p, q)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, c) {
            var d, e = 0,
                f = a.length,
                g = r(a);
            if (c) {
                if (g) {
                    for (; f > e; e++)
                        if (d = b.apply(a[e], c), d === !1) break
                } else
                    for (e in a)
                        if (d = b.apply(a[e], c), d === !1) break
            } else if (g) {
                for (; f > e; e++)
                    if (d = b.call(a[e], e, a[e]), d === !1) break
            } else
                for (e in a)
                    if (d = b.call(a[e], e, a[e]), d === !1) break; return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(n, "")
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (g) return g.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a) return c
            }
            return -1
        },
        merge: function(a, b) {
            var c = +b.length,
                d = 0,
                e = a.length;
            while (c > d) a[e++] = b[d++];
            if (c !== c)
                while (void 0 !== b[d]) a[e++] = b[d++];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, c) {
            var d, f = 0,
                g = a.length,
                h = r(a),
                i = [];
            if (h)
                for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);
            else
                for (f in a) d = b(a[f], f, c), null != d && i.push(d);
            return e.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, e, f;
            return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function() {
                return a.apply(b || this, c.concat(d.call(arguments)))
            }, e.guid = a.guid = a.guid || m.guid++, e) : void 0
        },
        now: function() {
            return +new Date
        },
        support: k
    }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        h["[object " + b + "]"] = b.toLowerCase()
    });

    function r(a) {
        var b = a.length,
            c = m.type(a);
        return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    var s = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + -new Date,
            v = a.document,
            w = 0,
            x = 0,
            y = gb(),
            z = gb(),
            A = gb(),
            B = function(a, b) {
                return a === b && (l = !0), 0
            },
            C = "undefined",
            D = 1 << 31,
            E = {}.hasOwnProperty,
            F = [],
            G = F.pop,
            H = F.push,
            I = F.push,
            J = F.slice,
            K = F.indexOf || function(a) {
                for (var b = 0, c = this.length; c > b; b++)
                    if (this[b] === a) return b;
                return -1
            },
            L = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            M = "[\\x20\\t\\r\\n\\f]",
            N = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            O = N.replace("w", "w#"),
            P = "\\[" + M + "*(" + N + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + O + "))|)" + M + "*\\]",
            Q = ":(" + N + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ")*)|.*)\\)|)",
            R = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
            S = new RegExp("^" + M + "*," + M + "*"),
            T = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
            U = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"),
            V = new RegExp(Q),
            W = new RegExp("^" + O + "$"),
            X = {
                ID: new RegExp("^#(" + N + ")"),
                CLASS: new RegExp("^\\.(" + N + ")"),
                TAG: new RegExp("^(" + N.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + P),
                PSEUDO: new RegExp("^" + Q),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + L + ")$", "i"),
                needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            $ = /^[^{]+\{\s*\[native \w/,
            _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ab = /[+~]/,
            bb = /'|\\/g,
            cb = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
            db = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            };
        try {
            I.apply(F = J.call(v.childNodes), v.childNodes), F[v.childNodes.length].nodeType
        } catch (eb) {
            I = {
                apply: F.length ? function(a, b) {
                    H.apply(a, J.call(b))
                } : function(a, b) {
                    var c = a.length,
                        d = 0;
                    while (a[c++] = b[d++]);
                    a.length = c - 1
                }
            }
        }

        function fb(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w, x;
            if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], !a || "string" != typeof a) return d;
            if (1 !== (k = b.nodeType) && 9 !== k) return [];
            if (p && !e) {
                if (f = _.exec(a))
                    if (j = f[1]) {
                        if (9 === k) {
                            if (h = b.getElementById(j), !h || !h.parentNode) return d;
                            if (h.id === j) return d.push(h), d
                        } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d
                    } else {
                        if (f[2]) return I.apply(d, b.getElementsByTagName(a)), d;
                        if ((j = f[3]) && c.getElementsByClassName && b.getElementsByClassName) return I.apply(d, b.getElementsByClassName(j)), d
                    }
                if (c.qsa && (!q || !q.test(a))) {
                    if (s = r = u, w = b, x = 9 === k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                        o = g(a), (r = b.getAttribute("id")) ? s = r.replace(bb, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                        while (l--) o[l] = s + qb(o[l]);
                        w = ab.test(a) && ob(b.parentNode) || b, x = o.join(",")
                    }
                    if (x) try {
                        return I.apply(d, w.querySelectorAll(x)), d
                    } catch (y) {} finally {
                        r || b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(R, "$1"), b, d, e)
        }

        function gb() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }
            return b
        }

        function hb(a) {
            return a[u] = !0, a
        }

        function ib(a) {
            var b = n.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function jb(a, b) {
            var c = a.split("|"),
                e = a.length;
            while (e--) d.attrHandle[c[e]] = b
        }

        function kb(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || D) - (~a.sourceIndex || D);
            if (d) return d;
            if (c)
                while (c = c.nextSibling)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function lb(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function mb(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function nb(a) {
            return hb(function(b) {
                return b = +b, hb(function(c, d) {
                    var e, f = a([], c.length, b),
                        g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function ob(a) {
            return a && typeof a.getElementsByTagName !== C && a
        }
        c = fb.support = {}, f = fb.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, m = fb.setDocument = function(a) {
            var b, e = a ? a.ownerDocument || a : v,
                g = e.defaultView;
            return e !== n && 9 === e.nodeType && e.documentElement ? (n = e, o = e.documentElement, p = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener("unload", function() {
                m()
            }, !1) : g.attachEvent && g.attachEvent("onunload", function() {
                m()
            })), c.attributes = ib(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = ib(function(a) {
                return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = $.test(e.getElementsByClassName) && ib(function(a) {
                return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
            }), c.getById = ib(function(a) {
                return o.appendChild(a).id = u, !e.getElementsByName || !e.getElementsByName(u).length
            }), c.getById ? (d.find.ID = function(a, b) {
                if (typeof b.getElementById !== C && p) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, d.filter.ID = function(a) {
                var b = a.replace(cb, db);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete d.find.ID, d.filter.ID = function(a) {
                var b = a.replace(cb, db);
                return function(a) {
                    var c = typeof a.getAttributeNode !== C && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
                return typeof b.getElementsByTagName !== C ? b.getElementsByTagName(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
                return typeof b.getElementsByClassName !== C && p ? b.getElementsByClassName(a) : void 0
            }, r = [], q = [], (c.qsa = $.test(e.querySelectorAll)) && (ib(function(a) {
                a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && q.push("[*^$]=" + M + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + M + "*(?:value|" + L + ")"), a.querySelectorAll(":checked").length || q.push(":checked")
            }), ib(function(a) {
                var b = e.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + M + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ib(function(a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", Q)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    while (b = b.parentNode)
                        if (b === a) return !0;
                return !1
            }, B = b ? function(a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === v && t(v, a) ? -1 : b === e || b.ownerDocument === v && t(v, b) ? 1 : k ? K.call(k, a) - K.call(k, b) : 0 : 4 & d ? -1 : 1)
            } : function(a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0,
                    f = a.parentNode,
                    g = b.parentNode,
                    h = [a],
                    i = [b];
                if (!f || !g) return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : k ? K.call(k, a) - K.call(k, b) : 0;
                if (f === g) return kb(a, b);
                c = a;
                while (c = c.parentNode) h.unshift(c);
                c = b;
                while (c = c.parentNode) i.unshift(c);
                while (h[d] === i[d]) d++;
                return d ? kb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
            }, e) : n
        }, fb.matches = function(a, b) {
            return fb(a, null, null, b)
        }, fb.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {}
            return fb(b, n, null, [a]).length > 0
        }, fb.contains = function(a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b)
        }, fb.attr = function(a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && E.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, fb.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, fb.uniqueSort = function(a) {
            var b, d = [],
                e = 0,
                f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return k = null, a
        }, e = fb.getText = function(a) {
            var b, c = "",
                d = 0,
                f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                } else if (3 === f || 4 === f) return a.nodeValue
            } else
                while (b = a[d++]) c += e(b);
            return c
        }, d = fb.selectors = {
            cacheLength: 50,
            createPseudo: hb,
            match: X,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || "").replace(cb, db), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fb.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(cb, db).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + M + ")" + a + "(" + M + "|$)")) && y(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = fb.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p])
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [w, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];
                            else
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break; return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fb.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? hb(function(a, c) {
                        var d, f = e(a, b),
                            g = f.length;
                        while (g--) d = K.call(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function(a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: hb(function(a) {
                    var b = [],
                        c = [],
                        d = h(a.replace(R, "$1"));
                    return d[u] ? hb(function(a, b, c, e) {
                        var f, g = d(a, null, e, []),
                            h = a.length;
                        while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), !c.pop()
                    }
                }),
                has: hb(function(a) {
                    return function(b) {
                        return fb(a, b).length > 0
                    }
                }),
                contains: hb(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                    }
                }),
                lang: hb(function(a) {
                    return W.test(a || "") || fb.error("unsupported lang: " + a), a = a.replace(cb, db).toLowerCase(),
                        function(b) {
                            var c;
                            do
                                if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                            while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === o
                },
                focus: function(a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !d.pseudos.empty(a)
                },
                header: function(a) {
                    return Z.test(a.nodeName)
                },
                input: function(a) {
                    return Y.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: nb(function() {
                    return [0]
                }),
                last: nb(function(a, b) {
                    return [b - 1]
                }),
                eq: nb(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: nb(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: nb(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: nb(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: nb(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) d.pseudos[b] = lb(b);
        for (b in {
                submit: !0,
                reset: !0
            }) d.pseudos[b] = mb(b);

        function pb() {}
        pb.prototype = d.filters = d.pseudos, d.setFilters = new pb, g = fb.tokenize = function(a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(R, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? fb.error(a) : z(a, i).slice(0)
        };

        function qb(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function rb(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = x++;
            return b.first ? function(b, c, f) {
                while (b = b[d])
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j = [w, f];
                if (g) {
                    while (b = b[d])
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    while (b = b[d])
                        if (1 === b.nodeType || e) {
                            if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
                            if (i[d] = j, j[2] = a(b, c, g)) return !0
                        }
            }
        }

        function sb(a) {
            return a.length > 1 ? function(b, c, d) {
                var e = a.length;
                while (e--)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function tb(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) fb(a, b[d], c);
            return c
        }

        function ub(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function vb(a, b, c, d, e, f) {
            return d && !d[u] && (d = vb(d)), e && !e[u] && (e = vb(e, f)), hb(function(f, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    p = f || tb(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : ub(p, m, a, h, i),
                    r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = ub(r, n), d(j, [], h, i), k = j.length;
                    while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--)(l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--)(l = r[k]) && (j = e ? K.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = ub(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : I.apply(g, r)
            })
        }

        function wb(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = rb(function(a) {
                    return a === b
                }, h, !0), l = rb(function(a) {
                    return K.call(b, a) > -1
                }, h, !0), m = [function(a, c, d) {
                    return !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d))
                }]; f > i; i++)
                if (c = d.relative[a[i].type]) m = [rb(sb(m), c)];
                else {
                    if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                        for (e = ++i; f > e; e++)
                            if (d.relative[a[e].type]) break;
                        return vb(i > 1 && sb(m), i > 1 && qb(a.slice(0, i - 1).concat({
                            value: " " === a[i - 2].type ? "*" : ""
                        })).replace(R, "$1"), c, e > i && wb(a.slice(i, e)), f > e && wb(a = a.slice(e)), f > e && qb(a))
                    }
                    m.push(c)
                }
            return sb(m)
        }

        function xb(a, b) {
            var c = b.length > 0,
                e = a.length > 0,
                f = function(f, g, h, i, k) {
                    var l, m, o, p = 0,
                        q = "0",
                        r = f && [],
                        s = [],
                        t = j,
                        u = f || e && d.find.TAG("*", k),
                        v = w += null == t ? 1 : Math.random() || .1,
                        x = u.length;
                    for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                        if (e && l) {
                            m = 0;
                            while (o = a[m++])
                                if (o(l, g, h)) {
                                    i.push(l);
                                    break
                                }
                            k && (w = v)
                        }
                        c && ((l = !o && l) && p--, f && r.push(l))
                    }
                    if (p += q, c && q !== p) {
                        m = 0;
                        while (o = b[m++]) o(r, s, g, h);
                        if (f) {
                            if (p > 0)
                                while (q--) r[q] || s[q] || (s[q] = G.call(i));
                            s = ub(s)
                        }
                        I.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && fb.uniqueSort(i)
                    }
                    return k && (w = v, j = t), r
                };
            return c ? hb(f) : f
        }
        return h = fb.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--) f = wb(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, xb(e, d)), f.selector = a
            }
            return f
        }, i = fb.select = function(a, b, e, f) {
            var i, j, k, l, m, n = "function" == typeof a && a,
                o = !f && g(a = n.selector || a);
            if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b) return e;
                    n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                }
                i = X.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i], d.relative[l = k.type]) break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && ob(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && qb(j), !a) return I.apply(e, f), e;
                        break
                    }
                }
            }
            return (n || h(a, o))(f, b, !p, e, ab.test(a) && ob(b.parentNode) || b), e
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ib(function(a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"))
        }), ib(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || jb("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && ib(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || jb("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), ib(function(a) {
            return null == a.getAttribute("disabled")
        }) || jb(L, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), fb
    }(a);
    m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains;
    var t = m.expr.match.needsContext,
        u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        v = /^.[^:#\[\.,]*$/;

    function w(a, b, c) {
        if (m.isFunction(b)) return m.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return m.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (v.test(b)) return m.filter(b, a, c);
            b = m.filter(b, a)
        }
        return m.grep(a, function(a) {
            return m.inArray(a, b) >= 0 !== c
        })
    }
    m.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }, m.fn.extend({
        find: function(a) {
            var b, c = [],
                d = this,
                e = d.length;
            if ("string" != typeof a) return this.pushStack(m(a).filter(function() {
                for (b = 0; e > b; b++)
                    if (m.contains(d[b], this)) return !0
            }));
            for (b = 0; e > b; b++) m.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
        },
        filter: function(a) {
            return this.pushStack(w(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(w(this, a || [], !0))
        },
        is: function(a) {
            return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length
        }
    });
    var x, y = a.document,
        z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        A = m.fn.init = function(a, b) {
            var c, d;
            if (!a) return this;
            if ("string" == typeof a) {
                if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b))
                        for (c in b) m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this
                }
                if (d = y.getElementById(c[2]), d && d.parentNode) {
                    if (d.id !== c[2]) return x.find(a);
                    this.length = 1, this[0] = d
                }
                return this.context = y, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
        };
    A.prototype = m.fn, x = m(y);
    var B = /^(?:parents|prev(?:Until|All))/,
        C = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    m.extend({
        dir: function(a, b, c) {
            var d = [],
                e = a[b];
            while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c))) 1 === e.nodeType && d.push(e), e = e[b];
            return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), m.fn.extend({
        has: function(a) {
            var b, c = m(a, this),
                d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++)
                    if (m.contains(this, c[b])) return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? m.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });

    function D(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }
    m.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return m.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return m.dir(a, "parentNode", c)
        },
        next: function(a) {
            return D(a, "nextSibling")
        },
        prev: function(a) {
            return D(a, "previousSibling")
        },
        nextAll: function(a) {
            return m.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return m.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return m.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return m.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return m.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return m.sibling(a.firstChild)
        },
        contents: function(a) {
            return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
        }
    }, function(a, b) {
        m.fn[a] = function(c, d) {
            var e = m.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e)
        }
    });
    var E = /\S+/g,
        F = {};

    function G(a) {
        var b = F[a] = {};
        return m.each(a.match(E) || [], function(a, c) {
            b[c] = !0
        }), b
    }
    m.Callbacks = function(a) {
        a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
        var b, c, d, e, f, g, h = [],
            i = !a.once && [],
            j = function(l) {
                for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++)
                    if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                        c = !1;
                        break
                    }
                b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
            },
            k = {
                add: function() {
                    if (h) {
                        var d = h.length;
                        ! function f(b) {
                            m.each(b, function(b, c) {
                                var d = m.type(c);
                                "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
                            })
                        }(arguments), b ? e = h.length : c && (g = d, j(c))
                    }
                    return this
                },
                remove: function() {
                    return h && m.each(arguments, function(a, c) {
                        var d;
                        while ((d = m.inArray(c, h, d)) > -1) h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
                    }), this
                },
                has: function(a) {
                    return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
                },
                empty: function() {
                    return h = [], e = 0, this
                },
                disable: function() {
                    return h = i = c = void 0, this
                },
                disabled: function() {
                    return !h
                },
                lock: function() {
                    return i = void 0, c || k.disable(), this
                },
                locked: function() {
                    return !i
                },
                fireWith: function(a, c) {
                    return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
                },
                fire: function() {
                    return k.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!d
                }
            };
        return k
    }, m.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", m.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", m.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", m.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return m.Deferred(function(c) {
                            m.each(b, function(b, f) {
                                var g = m.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = g && g.apply(this, arguments);
                                    a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? m.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, m.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b = 0,
                c = d.call(arguments),
                e = c.length,
                f = 1 !== e || a && m.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : m.Deferred(),
                h = function(a, b, c) {
                    return function(e) {
                        b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                },
                i, j, k;
            if (e > 1)
                for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
            return f || g.resolveWith(k, c), g.promise()
        }
    });
    var H;
    m.fn.ready = function(a) {
        return m.ready.promise().done(a), this
    }, m.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? m.readyWait++ : m.ready(!0)
        },
        ready: function(a) {
            if (a === !0 ? !--m.readyWait : !m.isReady) {
                if (!y.body) return setTimeout(m.ready);
                m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")))
            }
        }
    });

    function I() {
        y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J))
    }

    function J() {
        (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready())
    }
    m.ready.promise = function(b) {
        if (!H)
            if (H = m.Deferred(), "complete" === y.readyState) setTimeout(m.ready);
            else if (y.addEventListener) y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load", J, !1);
        else {
            y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
            var c = !1;
            try {
                c = null == a.frameElement && y.documentElement
            } catch (d) {}
            c && c.doScroll && ! function e() {
                if (!m.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    I(), m.ready()
                }
            }()
        }
        return H.promise(b)
    };
    var K = "undefined",
        L;
    for (L in m(k)) break;
    k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function() {
            var a, b, c, d;
            c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
        }),
        function() {
            var a = y.createElement("div");
            if (null == k.deleteExpando) {
                k.deleteExpando = !0;
                try {
                    delete a.test
                } catch (b) {
                    k.deleteExpando = !1
                }
            }
            a = null
        }(), m.acceptData = function(a) {
            var b = m.noData[(a.nodeName + " ").toLowerCase()],
                c = +a.nodeType || 1;
            return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
        };
    var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        N = /([A-Z])/g;

    function O(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(N, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c
                } catch (e) {}
                m.data(a, b, c)
            } else c = void 0
        }
        return c
    }

    function P(a) {
        var b;
        for (b in a)
            if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function Q(a, b, d, e) {
        if (m.acceptData(a)) {
            var f, g, h = m.expando,
                i = a.nodeType,
                j = i ? m.cache : a,
                k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {
                toJSON: m.noop
            }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f
        }
    }

    function R(a, b, c) {
        if (m.acceptData(a)) {
            var d, e, f = a.nodeType,
                g = f ? m.cache : a,
                h = f ? a[m.expando] : m.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                    while (e--) delete d[b[e]];
                    if (c ? !P(d) : !m.isEmptyObject(d)) return
                }(c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
            }
        }
    }
    m.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a)
        },
        data: function(a, b, c) {
            return Q(a, b, c)
        },
        removeData: function(a, b) {
            return R(a, b)
        },
        _data: function(a, b, c) {
            return Q(a, b, c, !0)
        },
        _removeData: function(a, b) {
            return R(a, b, !0)
        }
    }), m.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0],
                g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
                    c = g.length;
                    while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
                    m._data(f, "parsedAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                m.data(this, a)
            }) : arguments.length > 1 ? this.each(function() {
                m.data(this, a, b)
            }) : f ? O(f, a, m.data(f, a)) : void 0
        },
        removeData: function(a) {
            return this.each(function() {
                m.removeData(this, a)
            })
        }
    }), m.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = m.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = m._queueHooks(a, b),
                g = function() {
                    m.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return m._data(a, c) || m._data(a, c, {
                empty: m.Callbacks("once memory").add(function() {
                    m._removeData(a, b + "queue"), m._removeData(a, c)
                })
            })
        }
    }), m.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = m.queue(this, a, b);
                m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                m.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1,
                e = m.Deferred(),
                f = this,
                g = this.length,
                h = function() {
                    --d || e.resolveWith(f, [f])
                };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        T = ["Top", "Right", "Bottom", "Left"],
        U = function(a, b) {
            return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
        },
        V = m.access = function(a, b, c, d, e, f, g) {
            var h = 0,
                i = a.length,
                j = null == c;
            if ("object" === m.type(c)) {
                e = !0;
                for (h in c) m.access(a, b, h, c[h], !0, f, g)
            } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                    return j.call(m(a), c)
                })), b))
                for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
        },
        W = /^(?:checkbox|radio)$/i;
    ! function() {
        var a = y.createElement("input"),
            b = y.createElement("div"),
            c = y.createDocumentFragment();
        if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !!b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() {
                k.noCloneEvent = !1
            }), b.cloneNode(!0).click()), null == k.deleteExpando) {
            k.deleteExpando = !0;
            try {
                delete b.test
            } catch (d) {
                k.deleteExpando = !1
            }
        }
    }(),
    function() {
        var b, c, d = y.createElement("div");
        for (b in {
                submit: !0,
                change: !0,
                focusin: !0
            }) c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1);
        d = null
    }();
    var X = /^(?:input|select|textarea)$/i,
        Y = /^key/,
        Z = /^(?:mouse|pointer|contextmenu)|click/,
        $ = /^(?:focusinfocus|focusoutblur)$/,
        _ = /^([^.]*)(?:\.(.+)|)$/;

    function ab() {
        return !0
    }

    function bb() {
        return !1
    }

    function cb() {
        try {
            return y.activeElement
        } catch (a) {}
    }
    m.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, n, o, p, q, r = m._data(a);
            if (r) {
                c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function(a) {
                    return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments)
                }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;
                while (h--) f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && m.expr.match.needsContext.test(e),
                    namespace: p.join(".")
                }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
                a = null
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, n, o, p, q, r = m.hasData(a) && m._data(a);
            if (r && (k = r.events)) {
                b = (b || "").match(E) || [""], j = b.length;
                while (j--)
                    if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                        l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;
                        while (f--) g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o])
                    } else
                        for (o in k) m.event.remove(a, o + b[j], c, d, !0);
                m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, k, l, n, o = [d || y],
                p = j.call(b, "type") ? b.type : b,
                q = j.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
                if (!e && !k.noBubble && !m.isWindow(d)) {
                    for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), l = h;
                    l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
                }
                n = 0;
                while ((h = o[n++]) && !b.isPropagationStopped()) b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
                    l = d[g], l && (d[g] = null), m.event.triggered = p;
                    try {
                        d[p]()
                    } catch (r) {}
                    m.event.triggered = void 0, l && (d[g] = l)
                }
                return b.result
            }
        },
        dispatch: function(a) {
            a = m.event.fix(a);
            var b, c, e, f, g, h = [],
                i = d.call(arguments),
                j = (m._data(this, "events") || {})[a.type] || [],
                k = m.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = m.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, g = 0;
                    while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i != this; i = i.parentNode || this)
                    if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                        for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] && e.push(d);
                        e.length && g.push({
                            elem: i,
                            handlers: e
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        fix: function(a) {
            if (a[m.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length;
            while (b--) c = d[b], a[c] = f[c];
            return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button,
                    g = b.fromElement;
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== cb() && this.focus) try {
                        return this.focus(), !1
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === cb() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(a) {
                    return m.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = m.extend(new m.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, m.removeEvent = y.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
    }, m.Event = function(a, b) {
        return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ab : bb) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void(this[m.expando] = !0)) : new m.Event(a, b)
    }, m.Event.prototype = {
        isDefaultPrevented: bb,
        isPropagationStopped: bb,
        isImmediatePropagationStopped: bb,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = ab, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = ab, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = ab, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, m.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        m.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), k.submitBubbles || (m.event.special.submit = {
        setup: function() {
            return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target,
                    c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;
                c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }), m._data(c, "submitBubbles", !0))
            })
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit")
        }
    }), k.changeBubbles || (m.event.special.change = {
        setup: function() {
            return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), m.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !0)
            })), !1) : void m.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0)
                }), m._data(b, "changeBubbles", !0))
            })
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return m.event.remove(this, "._change"), !X.test(this.nodeName)
        }
    }), k.focusinBubbles || m.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            m.event.simulate(b, a.target, m.event.fix(a), !0)
        };
        m.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                    e = m._data(d, b);
                e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                    e = m._data(d, b) - 1;
                e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b))
            }
        }
    }), m.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (f in a) this.on(f, b, c, a[f], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = bb;
            else if (!d) return this;
            return 1 === e && (g = d, d = function(a) {
                return m().off(a), g.apply(this, arguments)
            }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function() {
                m.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = bb), this.each(function() {
                m.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                m.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? m.event.trigger(a, b, c, !0) : void 0
        }
    });

    function db(a) {
        var b = eb.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length) c.createElement(b.pop());
        return c
    }
    var eb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        fb = / jQuery\d+="(?:null|\d+)"/g,
        gb = new RegExp("<(?:" + eb + ")[\\s/>]", "i"),
        hb = /^\s+/,
        ib = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        jb = /<([\w:]+)/,
        kb = /<tbody/i,
        lb = /<|&#?\w+;/,
        mb = /<(?:script|style|link)/i,
        nb = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ob = /^$|\/(?:java|ecma)script/i,
        pb = /^true\/(.*)/,
        qb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        rb = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        sb = db(y),
        tb = sb.appendChild(y.createElement("div"));
    rb.optgroup = rb.option, rb.tbody = rb.tfoot = rb.colgroup = rb.caption = rb.thead, rb.th = rb.td;

    function ub(a, b) {
        var c, d, e = 0,
            f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || "*") : void 0;
        if (!f)
            for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ub(d, b));
        return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f
    }

    function vb(a) {
        W.test(a.type) && (a.defaultChecked = a.checked)
    }

    function wb(a, b) {
        return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function xb(a) {
        return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
    }

    function yb(a) {
        var b = pb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function zb(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) m._data(c, "globalEval", !b || m._data(b[d], "globalEval"))
    }

    function Ab(a, b) {
        if (1 === b.nodeType && m.hasData(a)) {
            var c, d, e, f = m._data(a),
                g = m._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; e > d; d++) m.event.add(b, c, h[c][d])
            }
            g.data && (g.data = m.extend({}, g.data))
        }
    }

    function Bb(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
                e = m._data(b);
                for (d in e.events) m.removeEvent(b, d, e.handle);
                b.removeAttribute(m.expando)
            }
            "script" === c && b.text !== a.text ? (xb(b).text = a.text, yb(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }
    m.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h, i = m.contains(a.ownerDocument, a);
            if (k.html5Clone || m.isXMLDoc(a) || !gb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (tb.innerHTML = a.outerHTML, tb.removeChild(f = tb.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a)))
                for (d = ub(f), h = ub(a), g = 0; null != (e = h[g]); ++g) d[g] && Bb(e, d[g]);
            if (b)
                if (c)
                    for (h = h || ub(a), d = d || ub(f), g = 0; null != (e = h[g]); g++) Ab(e, d[g]);
                else Ab(a, f);
            return d = ub(f, "script"), d.length > 0 && zb(d, !i && ub(a, "script")), d = h = e = null, f
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, l, n = a.length, o = db(b), p = [], q = 0; n > q; q++)
                if (f = a[q], f || 0 === f)
                    if ("object" === m.type(f)) m.merge(p, f.nodeType ? [f] : f);
                    else if (lb.test(f)) {
                h = h || o.appendChild(b.createElement("div")), i = (jb.exec(f) || ["", ""])[1].toLowerCase(), l = rb[i] || rb._default, h.innerHTML = l[1] + f.replace(ib, "<$1><$2>") + l[2], e = l[0];
                while (e--) h = h.lastChild;
                if (!k.leadingWhitespace && hb.test(f) && p.push(b.createTextNode(hb.exec(f)[0])), !k.tbody) {
                    f = "table" !== i || kb.test(f) ? "<table>" !== l[1] || kb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
                    while (e--) m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
                }
                m.merge(p, h.childNodes), h.textContent = "";
                while (h.firstChild) h.removeChild(h.firstChild);
                h = o.lastChild
            } else p.push(b.createTextNode(f));
            h && o.removeChild(h), k.appendChecked || m.grep(ub(p, "input"), vb), q = 0;
            while (f = p[q++])
                if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ub(o.appendChild(f), "script"), g && zb(h), c)) {
                    e = 0;
                    while (f = h[e++]) ob.test(f.type || "") && c.push(f)
                }
            return h = null, o
        },
        cleanData: function(a, b) {
            for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++)
                if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
                    if (g.events)
                        for (e in g.events) n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
                    j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f))
                }
        }
    }), m.fn.extend({
        text: function(a) {
            return V(this, function(a) {
                return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = wb(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = wb(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || m.cleanData(ub(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && zb(ub(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                1 === a.nodeType && m.cleanData(ub(a, !1));
                while (a.firstChild) a.removeChild(a.firstChild);
                a.options && m.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return m.clone(this, a, b)
            })
        },
        html: function(a) {
            return V(this, function(a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;
                if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(fb, "") : void 0;
                if (!("string" != typeof a || mb.test(a) || !k.htmlSerialize && gb.test(a) || !k.leadingWhitespace && hb.test(a) || rb[(jb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(ib, "<$1><$2>");
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ub(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, m.cleanData(ub(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = e.apply([], a);
            var c, d, f, g, h, i, j = 0,
                l = this.length,
                n = this,
                o = l - 1,
                p = a[0],
                q = m.isFunction(p);
            if (q || l > 1 && "string" == typeof p && !k.checkClone && nb.test(p)) return this.each(function(c) {
                var d = n.eq(c);
                q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
            });
            if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
                for (g = m.map(ub(i, "script"), xb), f = g.length; l > j; j++) d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ub(d, "script"))), b.call(this[j], d, j);
                if (f)
                    for (h = g[g.length - 1].ownerDocument, m.map(g, yb), j = 0; f > j; j++) d = g[j], ob.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qb, "")));
                i = c = null
            }
            return this
        }
    }), m.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        m.fn[a] = function(a) {
            for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get());
            return this.pushStack(e)
        }
    });
    var Cb, Db = {};

    function Eb(b, c) {
        var d, e = m(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display");
        return e.detach(), f
    }

    function Fb(a) {
        var b = y,
            c = Db[a];
        return c || (c = Eb(a, b), "none" !== c && c || (Cb = (Cb || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Cb[0].contentWindow || Cb[0].contentDocument).document, b.write(), b.close(), c = Eb(a, b), Cb.detach()), Db[a] = c), c
    }! function() {
        var a;
        k.shrinkWrapBlocks = function() {
            if (null != a) return a;
            a = !1;
            var b, c, d;
            return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
        }
    }();
    var Gb = /^margin/,
        Hb = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
        Ib, Jb, Kb = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Ib = function(a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null)
    }, Jb = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ib(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Hb.test(g) && Gb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
    }) : y.documentElement.currentStyle && (Ib = function(a) {
        return a.currentStyle
    }, Jb = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ib(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Hb.test(g) && !Kb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
    });

    function Lb(a, b) {
        return {
            get: function() {
                var c = a();
                if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }! function() {
        var b, c, d, e, f, g, h;
        if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
            c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !!c.cssFloat, b.style.backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing, m.extend(k, {
                reliableHiddenOffsets: function() {
                    return null == g && i(), g
                },
                boxSizingReliable: function() {
                    return null == f && i(), f
                },
                pixelPosition: function() {
                    return null == e && i(), e
                },
                reliableMarginRight: function() {
                    return null == h && i(), h
                }
            });

            function i() {
                var b, c, d, i;
                c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || {
                    width: "4px"
                }).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d))
            }
        }
    }(), m.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var Mb = /alpha\([^)]*\)/i,
        Nb = /opacity\s*=\s*([^)]*)/,
        Ob = /^(none|table(?!-c[ea]).+)/,
        Pb = new RegExp("^(" + S + ")(.*)$", "i"),
        Qb = new RegExp("^([+-])=(" + S + ")", "i"),
        Rb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Sb = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Tb = ["Webkit", "O", "Moz", "ms"];

    function Ub(a, b) {
        if (b in a) return b;
        var c = b.charAt(0).toUpperCase() + b.slice(1),
            d = b,
            e = Tb.length;
        while (e--)
            if (b = Tb[e] + c, b in a) return b;
        return d
    }

    function Vb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fb(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function Wb(a, b, c) {
        var d = Pb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function Xb(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
        return g
    }

    function Yb(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = Ib(a),
            g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = Jb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Hb.test(e)) return e;
            d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + Xb(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }
    m.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = Jb(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": k.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = m.camelCase(b),
                    i = a.style;
                if (b = m.cssProps[h] || (m.cssProps[h] = Ub(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, "string" === f && (e = Qb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = c
                } catch (j) {}
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = m.camelCase(b);
            return b = m.cssProps[h] || (m.cssProps[h] = Ub(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Jb(a, b, d)), "normal" === f && b in Sb && (f = Sb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f
        }
    }), m.each(["height", "width"], function(a, b) {
        m.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? Ob.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Rb, function() {
                    return Yb(a, b, d)
                }) : Yb(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && Ib(a);
                return Wb(a, c, d ? Xb(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), k.opacity || (m.cssHooks.opacity = {
        get: function(a, b) {
            return Nb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Mb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Mb.test(f) ? f.replace(Mb, e) : f + " " + e)
        }
    }), m.cssHooks.marginRight = Lb(k.reliableMarginRight, function(a, b) {
        return b ? m.swap(a, {
            display: "inline-block"
        }, Jb, [a, "marginRight"]) : void 0
    }), m.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        m.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, Gb.test(a) || (m.cssHooks[a + b].set = Wb)
    }), m.fn.extend({
        css: function(a, b) {
            return V(this, function(a, b, c) {
                var d, e, f = {},
                    g = 0;
                if (m.isArray(b)) {
                    for (d = Ib(a), e = b.length; e > g; g++) f[b[g]] = m.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? m.style(a, b, c) : m.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return Vb(this, !0)
        },
        hide: function() {
            return Vb(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                U(this) ? m(this).show() : m(this).hide()
            })
        }
    });

    function Zb(a, b, c, d, e) {
        return new Zb.prototype.init(a, b, c, d, e)
    }
    m.Tween = Zb, Zb.prototype = {
        constructor: Zb,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = Zb.propHooks[this.prop];
            return a && a.get ? a.get(this) : Zb.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = Zb.propHooks[this.prop];
            return this.pos = b = this.options.duration ? m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Zb.propHooks._default.set(this), this
        }
    }, Zb.prototype.init.prototype = Zb.prototype, Zb.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, Zb.propHooks.scrollTop = Zb.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, m.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, m.fx = Zb.prototype.init, m.fx.step = {};
    var $b, _b, ac = /^(?:toggle|show|hide)$/,
        bc = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
        cc = /queueHooks$/,
        dc = [ic],
        ec = {
            "*": [function(a, b) {
                var c = this.createTween(a, b),
                    d = c.cur(),
                    e = bc.exec(b),
                    f = e && e[3] || (m.cssNumber[a] ? "" : "px"),
                    g = (m.cssNumber[a] || "px" !== f && +d) && bc.exec(m.css(c.elem, a)),
                    h = 1,
                    i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do h = h || ".5", g /= h, m.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };

    function fc() {
        return setTimeout(function() {
            $b = void 0
        }), $b = m.now()
    }

    function gc(a, b) {
        var c, d = {
                height: a
            },
            e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = T[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }

    function hc(a, b, c) {
        for (var d, e = (ec[b] || []).concat(ec["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function ic(a, b, c) {
        var d, e, f, g, h, i, j, l, n = this,
            o = {},
            p = a.style,
            q = a.nodeType && U(a),
            r = m._data(a, "fxshow");
        c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, n.always(function() {
            n.always(function() {
                h.unqueued--, m.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fb(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fb(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function() {
            p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], ac.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                    if ("show" !== e || !r || void 0 === r[d]) continue;
                    q = !0
                }
                o[d] = r && r[d] || m.style(a, d)
            } else j = void 0;
        if (m.isEmptyObject(o)) "inline" === ("none" === j ? Fb(a.nodeName) : j) && (p.display = j);
        else {
            r ? "hidden" in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function() {
                m(a).hide()
            }), n.done(function() {
                var b;
                m._removeData(a, "fxshow");
                for (b in o) m.style(a, b, o[b])
            });
            for (d in o) g = hc(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function jc(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function kc(a, b, c) {
        var d, e, f = 0,
            g = dc.length,
            h = m.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = $b || fc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: m.extend({}, b),
                opts: m.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: $b || fc(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (jc(k, j.opts.specialEasing); g > f; f++)
            if (d = dc[f].call(j, a, k, j.opts)) return d;
        return m.map(k, hc, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    m.Animation = m.extend(kc, {
            tweener: function(a, b) {
                m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; e > d; d++) c = a[d], ec[c] = ec[c] || [], ec[c].unshift(b)
            },
            prefilter: function(a, b) {
                b ? dc.unshift(a) : dc.push(a)
            }
        }), m.speed = function(a, b, c) {
            var d = a && "object" == typeof a ? m.extend({}, a) : {
                complete: c || !c && b || m.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !m.isFunction(b) && b
            };
            return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue)
            }, d
        }, m.fn.extend({
            fadeTo: function(a, b, c, d) {
                return this.filter(U).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, d) {
                var e = m.isEmptyObject(a),
                    f = m.speed(b, c, d),
                    g = function() {
                        var b = kc(this, m.extend({}, a), f);
                        (e || m._data(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function(a, b, c) {
                var d = function(a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = m.timers,
                        g = m._data(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else
                        for (e in g) g[e] && g[e].stop && cc.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    (b || !c) && m.dequeue(this, a)
                })
            },
            finish: function(a) {
                return a !== !1 && (a = a || "fx"), this.each(function() {
                    var b, c = m._data(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = m.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), m.each(["toggle", "show", "hide"], function(a, b) {
            var c = m.fn[b];
            m.fn[b] = function(a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gc(b, !0), a, d, e)
            }
        }), m.each({
            slideDown: gc("show"),
            slideUp: gc("hide"),
            slideToggle: gc("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            m.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), m.timers = [], m.fx.tick = function() {
            var a, b = m.timers,
                c = 0;
            for ($b = m.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
            b.length || m.fx.stop(), $b = void 0
        }, m.fx.timer = function(a) {
            m.timers.push(a), a() ? m.fx.start() : m.timers.pop()
        }, m.fx.interval = 13, m.fx.start = function() {
            _b || (_b = setInterval(m.fx.tick, m.fx.interval))
        }, m.fx.stop = function() {
            clearInterval(_b), _b = null
        }, m.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, m.fn.delay = function(a, b) {
            return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        function() {
            var a, b, c, d, e;
            b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !!a.value, k.optSelected = e.selected, k.enctype = !!y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value
        }();
    var lc = /\r/g;
    m.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0]; {
                if (arguments.length) return d = m.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function(a) {
                        return null == a ? "" : a + ""
                    })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lc, "") : null == c ? "" : c)
            }
        }
    }), m.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = m.find.attr(a, "value");
                    return null != b ? b : m.trim(m.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
                            if (b = m(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    var c, d, e = a.options,
                        f = m.makeArray(b),
                        g = e.length;
                    while (g--)
                        if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0) try {
                            d.selected = c = !0
                        } catch (h) {
                            d.scrollHeight
                        } else d.selected = !1;
                    return c || (a.selectedIndex = -1), e
                }
            }
        }
    }), m.each(["radio", "checkbox"], function() {
        m.valHooks[this] = {
            set: function(a, b) {
                return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
            }
        }, k.checkOn || (m.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var mc, nc, oc = m.expr.attrHandle,
        pc = /^(?:checked|selected)$/i,
        qc = k.getSetAttribute,
        rc = k.input;
    m.fn.extend({
        attr: function(a, b) {
            return V(this, m.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                m.removeAttr(this, a)
            })
        }
    }), m.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nc : mc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b))
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
                f = b && b.match(E);
            if (f && 1 === a.nodeType)
                while (c = f[e++]) d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rc && qc || !pc.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""), a.removeAttribute(qc ? c : d)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), nc = {
        set: function(a, b, c) {
            return b === !1 ? m.removeAttr(a, c) : rc && qc || !pc.test(c) ? a.setAttribute(!qc && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c
        }
    }, m.each(m.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = oc[b] || m.find.attr;
        oc[b] = rc && qc || !pc.test(b) ? function(a, b, d) {
            var e, f;
            return d || (f = oc[b], oc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, oc[b] = f), e
        } : function(a, b, c) {
            return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    }), rc && qc || (m.attrHooks.value = {
        set: function(a, b, c) {
            return m.nodeName(a, "input") ? void(a.defaultValue = b) : mc && mc.set(a, b, c)
        }
    }), qc || (mc = {
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
        }
    }, oc.id = oc.name = oc.coords = function(a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
    }, m.valHooks.button = {
        get: function(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0
        },
        set: mc.set
    }, m.attrHooks.contenteditable = {
        set: function(a, b, c) {
            mc.set(a, "" === b ? !1 : b, c)
        }
    }, m.each(["width", "height"], function(a, b) {
        m.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        }
    })), k.style || (m.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || void 0
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    });
    var sc = /^(?:input|select|textarea|button|object)$/i,
        tc = /^(?:a|area)$/i;
    m.fn.extend({
        prop: function(a, b) {
            return V(this, m.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = m.propFix[a] || a, this.each(function() {
                try {
                    this[a] = void 0, delete this[a]
                } catch (b) {}
            })
        }
    }), m.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = m.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : sc.test(a.nodeName) || tc.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    }), k.hrefNormalized || m.each(["href", "src"], function(a, b) {
        m.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    }), k.optSelected || (m.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    }), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        m.propFix[this.toLowerCase()] = this
    }), k.enctype || (m.propFix.enctype = "encoding");
    var uc = /[\t\r\n\f]/g;
    m.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = 0,
                i = this.length,
                j = "string" == typeof a && a;
            if (m.isFunction(a)) return this.each(function(b) {
                m(this).addClass(a.call(this, b, this.className))
            });
            if (j)
                for (b = (a || "").match(E) || []; i > h; h++)
                    if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : " ")) {
                        f = 0;
                        while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = m.trim(d), c.className !== g && (c.className = g)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0,
                i = this.length,
                j = 0 === arguments.length || "string" == typeof a && a;
            if (m.isFunction(a)) return this.each(function(b) {
                m(this).removeClass(a.call(this, b, this.className))
            });
            if (j)
                for (b = (a || "").match(E) || []; i > h; h++)
                    if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : "")) {
                        f = 0;
                        while (e = b[f++])
                            while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                        g = a ? m.trim(d) : "", c.className !== g && (c.className = g)
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function(c) {
                m(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function() {
                if ("string" === c) {
                    var b, d = 0,
                        e = m(this),
                        f = a.match(E) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else(c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(uc, " ").indexOf(b) >= 0) return !0;
            return !1
        }
    }), m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        m.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), m.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var vc = m.now(),
        wc = /\?/,
        xc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    m.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c, d = null,
            e = m.trim(b + "");
        return e && !m.trim(e.replace(xc, function(a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
        })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
    }, m.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b) return null;
        try {
            a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c
    };
    var yc, zc, Ac = /#.*$/,
        Bc = /([?&])_=[^&]*/,
        Cc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Dc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Ec = /^(?:GET|HEAD)$/,
        Fc = /^\/\//,
        Gc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Hc = {},
        Ic = {},
        Jc = "*/".concat("*");
    try {
        zc = location.href
    } catch (Kc) {
        zc = y.createElement("a"), zc.href = "", zc = zc.href
    }
    yc = Gc.exec(zc.toLowerCase()) || [];

    function Lc(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(E) || [];
            if (m.isFunction(c))
                while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function Mc(a, b, c, d) {
        var e = {},
            f = a === Ic;

        function g(h) {
            var i;
            return e[h] = !0, m.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }
        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function Nc(a, b) {
        var c, d, e = m.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && m.extend(!0, a, c), a
    }

    function Oc(a, b, c) {
        var d, e, f, g, h = a.contents,
            i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e)
            for (g in h)
                if (h[g] && h[g].test(e)) {
                    i.unshift(g);
                    break
                }
        if (i[0] in c) f = i[0];
        else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function Pc(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }
    m.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: zc,
            type: "GET",
            isLocal: Dc.test(yc[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Jc,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": m.parseJSON,
                "text xml": m.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? Nc(Nc(a, m.ajaxSettings), b) : Nc(m.ajaxSettings, a)
        },
        ajaxPrefilter: Lc(Hc),
        ajaxTransport: Lc(Ic),
        ajax: function(a, b) {
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b),
                l = k.context || k,
                n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
                o = m.Deferred(),
                p = m.Callbacks("once memory"),
                q = k.statusCode || {},
                r = {},
                s = {},
                t = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === t) {
                            if (!j) {
                                j = {};
                                while (b = Cc.exec(f)) j[b[1].toLowerCase()] = b[2]
                            }
                            b = j[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === t ? f : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return t || (k.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (2 > t)
                                for (b in a) q[b] = [q[b], a[b]];
                            else v.always(a[v.status]);
                        return this
                    },
                    abort: function(a) {
                        var b = a || u;
                        return i && i.abort(b), x(0, b), this
                    }
                };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zc) + "").replace(Ac, "").replace(Fc, yc[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yc[1] && c[2] === yc[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yc[3] || ("http:" === yc[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mc(Hc, k, b, v), 2 === t) return v;
            h = k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Ec.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wc.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bc.test(e) ? e.replace(Bc, "$1_=" + vc++) : e + (wc.test(e) ? "&" : "?") + "_=" + vc++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jc + "; q=0.01" : "") : k.accepts["*"]);
            for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (d in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[d](k[d]);
            if (i = Mc(Ic, k, b, v)) {
                v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                    v.abort("timeout")
                }, k.timeout));
                try {
                    t = 1, i.send(r, x)
                } catch (w) {
                    if (!(2 > t)) throw w;
                    x(-1, w)
                }
            } else x(-1, "No Transport");

            function x(a, b, c, d) {
                var j, r, s, u, w, x = b;
                2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Oc(k, v, c)), u = Pc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
            }
            return v
        },
        getJSON: function(a, b, c) {
            return m.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return m.get(a, void 0, b, "script")
        }
    }), m.each(["get", "post"], function(a, b) {
        m[b] = function(a, c, d, e) {
            return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        m.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), m._evalUrl = function(a) {
        return m.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, m.fn.extend({
        wrapAll: function(a) {
            if (m.isFunction(a)) return this.each(function(b) {
                m(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return this.each(m.isFunction(a) ? function(b) {
                m(this).wrapInner(a.call(this, b))
            } : function() {
                var b = m(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = m.isFunction(a);
            return this.each(function(c) {
                m(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
            }).end()
        }
    }), m.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display"))
    }, m.expr.filters.visible = function(a) {
        return !m.expr.filters.hidden(a)
    };
    var Qc = /%20/g,
        Rc = /\[\]$/,
        Sc = /\r?\n/g,
        Tc = /^(?:submit|button|image|reset|file)$/i,
        Uc = /^(?:input|select|textarea|keygen)/i;

    function Vc(a, b, c, d) {
        var e;
        if (m.isArray(b)) m.each(b, function(b, e) {
            c || Rc.test(a) ? d(a, e) : Vc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== m.type(b)) d(a, b);
        else
            for (e in b) Vc(a + "[" + e + "]", b[e], c, d)
    }
    m.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a)) m.each(a, function() {
            e(this.name, this.value)
        });
        else
            for (c in a) Vc(c, a[c], b, e);
        return d.join("&").replace(Qc, "+")
    }, m.fn.extend({
        serialize: function() {
            return m.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = m.prop(this, "elements");
                return a ? m.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !m(this).is(":disabled") && Uc.test(this.nodeName) && !Tc.test(a) && (this.checked || !W.test(a))
            }).map(function(a, b) {
                var c = m(this).val();
                return null == c ? null : m.isArray(c) ? m.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Sc, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(Sc, "\r\n")
                }
            }).get()
        }
    }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zc() || $c()
    } : Zc;
    var Wc = 0,
        Xc = {},
        Yc = m.ajaxSettings.xhr();
    a.ActiveXObject && m(a).on("unload", function() {
        for (var a in Xc) Xc[a](void 0, !0)
    }), k.cors = !!Yc && "withCredentials" in Yc, Yc = k.ajax = !!Yc, Yc && m.ajaxTransport(function(a) {
        if (!a.crossDomain || k.cors) {
            var b;
            return {
                send: function(c, d) {
                    var e, f = a.xhr(),
                        g = ++Wc;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                        for (e in a.xhrFields) f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                    f.send(a.hasContent && a.data || null), b = function(c, e) {
                        var h, i, j;
                        if (b && (e || 4 === f.readyState))
                            if (delete Xc[g], b = void 0, f.onreadystatechange = m.noop, e) 4 !== f.readyState && f.abort();
                            else {
                                j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                                try {
                                    i = f.statusText
                                } catch (k) {
                                    i = ""
                                }
                                h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                            }
                        j && d(h, i, j, f.getAllResponseHeaders())
                    }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xc[g] = b : b()
                },
                abort: function() {
                    b && b(void 0, !0)
                }
            }
        }
    });

    function Zc() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function $c() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    m.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return m.globalEval(a), a
            }
        }
    }), m.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), m.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = y.head || m("head")[0] || y.documentElement;
            return {
                send: function(d, e) {
                    b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                    }, c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    b && b.onload(void 0, !0)
                }
            }
        }
    });
    var _c = [],
        ad = /(=)\?(?=&|$)|\?\?/;
    m.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = _c.pop() || m.expando + "_" + vc++;
            return this[a] = !0, a
        }
    }), m.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (ad.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ad.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ad, "$1" + e) : b.jsonp !== !1 && (b.url += (wc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || m.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _c.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), m.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || y;
        var d = u.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes))
    };
    var bd = m.fn.load;
    m.fn.load = function(a, b, c) {
        if ("string" != typeof a && bd) return bd.apply(this, arguments);
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        }).done(function(a) {
            e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a)
        }).complete(c && function(a, b) {
            g.each(c, e || [a.responseText, b, a])
        }), this
    }, m.expr.filters.animated = function(a) {
        return m.grep(m.timers, function(b) {
            return a === b.elem
        }).length
    };
    var cd = a.document.documentElement;

    function dd(a) {
        return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    m.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = m.css(a, "position"),
                l = m(a),
                n = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a, "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left - h.left + e), "using" in b ? b.using.call(a, n) : l.css(n)
        }
    }, m.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                m.offset.setOffset(this, a, b)
            });
            var b, c, d = {
                    top: 0,
                    left: 0
                },
                e = this[0],
                f = e && e.ownerDocument;
            if (f) return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dd(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d
        },
        position: function() {
            if (this[0]) {
                var a, b, c = {
                        top: 0,
                        left: 0
                    },
                    d = this[0];
                return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - m.css(d, "marginTop", !0),
                    left: b.left - c.left - m.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || cd;
                while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position")) a = a.offsetParent;
                return a || cd
            })
        }
    }), m.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        m.fn[a] = function(d) {
            return V(this, function(a, d, e) {
                var f = dd(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e)
            }, a, d, arguments.length, null)
        }
    }), m.each(["top", "left"], function(a, b) {
        m.cssHooks[b] = Lb(k.pixelPosition, function(a, c) {
            return c ? (c = Jb(a, b), Hb.test(c) ? m(a).position()[b] + "px" : c) : void 0
        })
    }), m.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        m.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            m.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return V(this, function(b, c, d) {
                    var e;
                    return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), m.fn.size = function() {
        return this.length
    }, m.fn.andSelf = m.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return m
    });
    var ed = a.jQuery,
        fd = a.$;
    return m.noConflict = function(b) {
        return a.$ === m && (a.$ = fd), b && a.jQuery === m && (a.jQuery = ed), m
    }, typeof b === K && (a.jQuery = a.$ = m), m
});

(function($) {
    $.event.special.mousestop = {
        setup: function(data) {
            $(this).data('mousestop', _data(data))
                .bind('mouseenter.mousestop', _mouseenter)
                .bind('mouseleave.mousestop', _mouseleave)
                .bind('mousemove.mousestop', _mousemove);
        },
        teardown: function() {
            $(this).removeData('mousestop')
                .unbind('.mousestop');
        }
    };

    function _mouseenter() {
        var _self = this,
            data = $(this).data('mousestop');

        this.movement = true;

        if (data.timeToStop) {
            this.timeToStopTimer = window.setTimeout(function() {
                _self.movement = false;
                window.clearTimeout(_self.timer);
            }, data.timeToStop);
        }
    }

    function _mouseleave() {
        window.clearTimeout(this.timer);
        window.clearTimeout(this.timeToStopTimer);
    }

    function _mousemove() {
        var $el = $(this),
            data = $el.data('mousestop');

        if (this.movement) {
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(function() {
                $el.trigger('mousestop');
            }, data.delay);
        }
    }

    function _data(data) {
        if ($.isNumeric(data)) {
            data = {
                delay: data
            };
        } else if (typeof data !== 'object') {
            data = {};
        }

        return $.extend({}, $.fn.mousestop.defaults, data);
    }

    $.fn.mousestop = function(data, fn) {
        if (typeof data === 'function') {
            fn = data;
        }
        return arguments.length > 0 ? this.bind('mousestop', data, fn) : this.trigger('mousestop');
    };

    $.fn.mousestop.defaults = {
        delay: 300,
        timeToStop: null
    };
})(jQuery);

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
    this.domElement = (domElement !== undefined) ? domElement : document;

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
            targetDistance *= Math.tan((scope.object.fov / 2) * Math.PI / 180.0);
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

    function onMouseUp( /* event */ ) {

        if (scope.enabled === false) return;

        // Greggman fix: https://github.com/greggman/three.js/commit/fde9f9917d6d8381f06bf22cdff766029d1761be
        scope.domElement.removeEventListener('mousemove', onMouseMove, false);
        scope.domElement.removeEventListener('mouseup', onMouseUp, false);

        state = STATE.NONE;

    }

    function onMouseWheel(event) {

        if (scope.enabled === false || scope.noZoom === true) return;

        var delta = 0;

        if (event.wheelDelta) { // WebKit / Opera / Explorer 9

            delta = event.wheelDelta;

        } else if (event.detail) { // Firefox

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

            case 1: // one-fingered touch: rotate
                if (scope.noRotate === true) {
                    return;
                }

                state = STATE.TOUCH_ROTATE;

                rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
                break;

            case 2: // two-fingered touch: dolly
                if (scope.noZoom === true) {
                    return;
                }

                state = STATE.TOUCH_DOLLY;

                var dx = event.touches[0].pageX - event.touches[1].pageX;
                var dy = event.touches[0].pageY - event.touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                dollyStart.set(0, distance);
                break;

            case 3: // three-fingered touch: pan
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

            case 1: // one-fingered touch: rotate
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

            case 2: // two-fingered touch: dolly
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

            case 3: // three-fingered touch: pan
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

    function touchend( /* event */ ) {

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
var Stats = function() {
    function f(a, e, b) {
        a = document.createElement(a);
        a.id = e;
        a.style.cssText = b;
        return a
    }

    function l(a, e, b) {
        var c = f("div", a, "padding:0 0 3px 3px;text-align:left;background:" + b),
            d = f("div", a + "Text", "font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:" + e);
        d.innerHTML = a.toUpperCase();
        c.appendChild(d);
        a = f("div", a + "Graph", "width:74px;height:30px;background:" + e);
        c.appendChild(a);
        for (e = 0; 74 > e; e++) a.appendChild(f("span", "", "width:1px;height:30px;float:left;opacity:0.9;background:" +
            b));
        return c
    }

    function m(a) {
        for (var b = c.children, d = 0; d < b.length; d++) b[d].style.display = d === a ? "block" : "none";
        n = a
    }

    function p(a, b) {
        a.appendChild(a.firstChild).style.height = Math.min(30, 30 - 30 * b) + "px"
    }
    var q = self.performance && self.performance.now ? self.performance.now.bind(performance) : Date.now,
        k = q(),
        r = k,
        t = 0,
        n = 0,
        c = f("div", "stats", "width:80px;opacity:0.9;cursor:pointer");
    c.addEventListener("mousedown", function(a) {
        a.preventDefault();
        m(++n % c.children.length)
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
        c.appendChild(b)
    }
    m(n);
    return {
        REVISION: 14,
        domElement: c,
        setMode: m,
        begin: function() {
            k = q()
        },
        end: function() {
            var a = q();
            g = a - k;
            w = Math.min(w, g);
            x = Math.max(x, g);
            C.textContent = (g | 0) + " MS (" + (w | 0) + "-" + (x | 0) + ")";
            p(D, g / 200);
            t++;
            if (a > r + 1E3 && (d = Math.round(1E3 *
                    t / (a - r)), u = Math.min(u, d), v = Math.max(v, d), A.textContent = d + " FPS (" + u + "-" + v + ")", p(B, d / 100), r = a, t = 0, void 0 !== h)) {
                var b = performance.memory.usedJSHeapSize,
                    c = performance.memory.jsHeapSizeLimit;
                h = Math.round(9.54E-7 * b);
                y = Math.min(y, h);
                z = Math.max(z, h);
                E.textContent = h + " MB (" + y + "-" + z + ")";
                p(F, b / c)
            }
            return a
        },
        update: function() {
            k = this.end()
        }
    }
};
"object" === typeof module && (module.exports = Stats);

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

    this.subdivisions = (subdivisions === undefined) ? 1 : subdivisions;

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
            edge1, edge2, edge3;
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

var TERRAINGEN = {
    /// HELPERS METHODS ///

    /**
     * Create a DOM canvas element
     * @param inWidth Width of the canvas
     * @param inHeight Height of the canvas
     * @return The created canvas
     */
    CreateCanvas: function(inWidth, inHeight) {
        var canvas = document.createElement("canvas");
        canvas.width = inWidth;
        canvas.height = inHeight;
        return canvas;
    },

    /**
     * Create vertices of the terrain from the given canvas and parameters
     * @param inNoise 2D Canvas that store height informations
     * @param inGeometry Geometry where fill vertices
     * @param inDepth Depth of the terrain
     * @param inWidth Width of the terrain
     * @param inHeight Height of the terrain
     */
    CreateVertices: function(inNoise, inGeometry, inDepth, inWidth, inHeight, nbPoints) {
        var positions = inGeometry.getAttribute('position').array;
        inGeometry.heightsArray = [];
        var context = inNoise.getContext('2d'),
            imgData = context.getImageData(0, 0, inNoise.width, inNoise.height),
            pixels = imgData.data,
            scaleX = inWidth / (inNoise.width - 1),
            scaleY = inDepth / 255,
            scaleZ = inHeight / (inNoise.height - 1),
            id = 0,
            vid = 0,
            pixel = 0
        offsetX = -inNoise.width / 2,
            offsetZ = -inNoise.height / 2;

        //for( var y = inNoise.height-1; y >= 0; --y )
        for (var x = 0; x < inNoise.width; ++x) {
            inGeometry.heightsArray[x] = []; // new Float32Array(inNoise.height);

            for (var y = 0; y < inNoise.height; ++y) {
                //inGeometry.vertices.push( new THREE.Vector3( scaleX * ( x + offsetX ), scaleY * ( pixels[id * 4 + 1] ), scaleZ * ( y + offsetZ ) ) );
                positions[id++] = scaleX * (x + offsetX);
                positions[id++] = scaleY * (pixels[(pixel++) * 4 + 1]);
                positions[id++] = scaleZ * (y + offsetZ);
                inGeometry.heightsArray[x][y] = scaleY * (pixels[(pixel) * 4 + 1]);
            }
        }

        console.log(inGeometry.heightsArray);
    },

    /**
     * Create faces of the terrain
     * @param inGeometry Geometry where fill faces
     * @param inWidth Width of the terrain
     * @param inHeight Height of the terrain
     */
    CreateFaces: function(inGeometry, inWidth, inHeight) {
        var indices = inGeometry.getAttribute('index').array;
        var id = 0;

        for (var y = 0; y < inHeight - 1; ++y) {
            for (var x = 0; x < inWidth - 1; ++x) {
                // First triangle
                indices[id++] = y * inWidth + x + 1;
                indices[id++] = y * inWidth + x;
                indices[id++] = (y + 1) * inWidth + x;

                // Second triangle
                indices[id++] = (y + 1) * inWidth + x + 1;
                indices[id++] = y * inWidth + x + 1;
                indices[id++] = (y + 1) * inWidth + x;
            }
        }
    },

    /**
     * Create geometry of the terrain from the given canvas and parameters
     * @param inNoise 2D Canvas that store height informations
     * @param inWidth Width of the terrain
     * @param inHeight Height of the terrain
     * @param inWidthSegments Number of segments on the width
     * @param inHeightSegments Number of segments on the height
     * @return The created geometry
     */
    CreateGeometry: function(inNoise, inDepth, inWidth, inHeight, inWidthSegments, inHeightSegments) {
        var geometry = new THREE.BufferGeometry();

        var nbPoints = inNoise.width * inNoise.height;
        var indices = (inNoise.width - 1) * (inNoise.height - 1) * 2 * 3;
        geometry.addAttribute('index', new THREE.BufferAttribute(new Uint32Array(indices), 1));
        //geometry.addAttribute( 'color', new THREE.BufferAttribute(new Float32Array( nbPoints * 3 ), 3) );
        geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(nbPoints * 3), 3));

        geometry.hights = this.CreateVertices(inNoise, geometry, inDepth, inWidth, inHeight);
        this.CreateFaces(geometry, inWidthSegments, inHeightSegments);

        return geometry;
    },

    ConstructTerrain: function(inNoise, inParameters) {
        // Create the corresponding geometry
        var geometry = this.CreateGeometry(inNoise, inParameters.depth, inParameters.width, inParameters.height, inParameters.widthSegments, inParameters.heightSegments);

        // Apply vertices effect
        for (var i = 0; i < inParameters.effect.length; ++i) {
            if (null !== inParameters.effect[i])
                inParameters.effect[i].Apply(geometry, inParameters);
        }

        // Apply post algorithm as color generation
        for (var i = 0; i < inParameters.postgen.length; ++i) {
            if (null !== inParameters.postgen[i])
                inParameters.postgen[i].Apply(geometry, inParameters);
        }

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        // Update the geometry
        //geometry.attributes.color.needsUpdate = true;
        geometry.attributes.index.needsUpdate = true;
        geometry.attributes.position.needsUpdate = true;

        return geometry;
    },

    /// ACCESSIBLE METHODS ///

    /**
     * Generate a 2D Canvas from given parameters
     * @return A canvas that store height map
     */
    GetCanvas: function(inParameters) {
        inParameters = inParameters || {};

        // Manage default parameters
        inParameters.type = inParameters.type || 0;
        inParameters.depth = inParameters.depth || 10;
        inParameters.width = inParameters.width || 100;
        inParameters.height = inParameters.height || 100;
        inParameters.widthSegments = inParameters.widthSegments || 100;
        inParameters.heightSegments = inParameters.heightSegments || 100;
        inParameters.postgen = inParameters.postgen || [];
        inParameters.effect = inParameters.effect || [];
        inParameters.filter = inParameters.filter || [];

        if (typeof inParameters.canvas == 'undefined')
            inParameters.canvas = this.CreateCanvas(inParameters.width, inParameters.height);
        inParameters.canvas.width = inParameters.widthSegments;
        inParameters.canvas.height = inParameters.heightSegments;
        $(inParameters.canvas).width(inParameters.widthSegments);
        $(inParameters.canvas).height(inParameters.heightSegments);

        var noise = inParameters.generator.Get(inParameters);

        // Apply filters
        for (var i = 0; i < inParameters.filter.length; ++i) {
            if (null !== inParameters.filter[i])
                inParameters.filter[i].Apply(noise, inParameters);
        }

        return noise;
    },

    Get: function(inParameters) {
        return this.ConstructTerrain(this.GetCanvas(inParameters), inParameters);
    },

    GetFromCanvas: function(inParameters, inCanvas, inX, inY, inWidth, inHeight) {
        // Extract a portion of the given canvas into an other
        var noise = this.CreateCanvas(inWidth, inHeight);
        var imageData = inCanvas.getContext("2d").getImageData(inX, inY, inWidth, inHeight);
        noise.getContext("2d").putImageData(imageData, 0, 0, 0, 0, inWidth, inHeight);

        var scaleWidth = inWidth / inParameters.widthSegments;
        var scaleHeight = inHeight / inParameters.heightSegments;
        var parameters = Object.create(inParameters);
        parameters.widthSegments = inWidth;
        parameters.heightSegments = inHeight;
        parameters.width = Math.floor(parameters.width * scaleWidth);
        parameters.height = Math.floor(parameters.height * scaleHeight);
        parameters.heightSegments = inHeight;

        return this.ConstructTerrain(noise, parameters);
    },
};

var BLACKWHITE_COLORS = {
    Apply: function(inGeometry, inParameters) {
        var positions = inGeometry.getAttribute('position').array;
        var colors = inGeometry.getAttribute('color').array;

        for (var i = 0; i < positions.length; i += 3) {
            var depth = positions[i + 1] / inParameters.depth;

            colors[i] = depth * depth;
            colors[i + 1] = colors[i];
            colors[i + 2] = colors[i];
        }
    },

};

var MOUNTAINS_COLORS = {
    Apply: function(inGeometry, inParameters) {
        var step = 1000;
        var colors = inGeometry.getAttribute('color').array;
        var positions = inGeometry.getAttribute('position').array;

        for (var i = 0; i < positions.length; i += 3) {
            var depth = Math.min(1, 0.2 + (0.85 + 0.3 * inParameters.alea.Random()) * 0.8 * Math.round(step * positions[i + 1] / inParameters.depth) / step);

            colors[i] = depth * depth;
            colors[i + 1] = depth;
            colors[i + 2] = depth * depth * depth;
        }
    },

};

var MOUNTAINS2_COLORS = {
    ms_Canvas: null,
    ms_Gradient: null,

    GenerateGradient: function() {
        this.ms_Canvas = TERRAINGEN.CreateCanvas(255, 1);
        var context = this.ms_Canvas.getContext("2d");

        var gradient = context.createLinearGradient(0, 0, 255, 0);

        gradient.addColorStop(0.0, '#061701');
        gradient.addColorStop(0.1, '#205E0C');
        gradient.addColorStop(0.2, '#667755');
        gradient.addColorStop(0.6, '#999999');
        gradient.addColorStop(0.8, '#FFFFFF');

        context.fillStyle = gradient;
        context.rect(0, 0, this.ms_Canvas.width, this.ms_Canvas.height);
        context.fill();

        this.ms_Gradient = context.getImageData(0, 0, this.ms_Canvas.width, this.ms_Canvas.height).data;
    },

    Apply: function(inGeometry, inParameters) {
        if (this.ms_Canvas == null)
            this.GenerateGradient();

        var positions = inGeometry.getAttribute('position').array;
        var colors = inGeometry.getAttribute('color').array;

        for (var i = 0; i < positions.length; i += 3) {
            var depth = positions[i + 1] / inParameters.depth,
                indice = Math.round(depth * 255)

            colors[i] = this.ms_Gradient[indice * 4] * (1 + 2 * inParameters.alea.Random() * Math.max(0, (0.3 - depth))) / 255.0;
            colors[i + 1] = Math.min(1, this.ms_Gradient[indice * 4 + 1] * (1 + 2 * inParameters.alea.Random() * Math.max(0, (0.3 - depth))) / 255.0);
            colors[i + 2] = this.ms_Gradient[indice * 4 + 2] / 255.0;
        }
    },

};

var BLUR_FILTER = {
    Apply: function(inCanvas, inParameters) {
        boxBlurCanvasRGB(inCanvas, 0, 0, inCanvas.width, inCanvas.height, Math.round(inParameters.filterparam), 2);
    }
};

var CIRCLE_FILTER = {
    Apply: function(inCanvas, inParameters) {
        var context = inCanvas.getContext("2d");

        // Apply a radial gradient
        var gradient = context.createRadialGradient(inCanvas.width * 0.5, inCanvas.height * 0.5, 0, inCanvas.width * 0.5, inCanvas.height * 0.5, Math.min(inCanvas.height, inCanvas.width) * 0.5);
        gradient.addColorStop(0.0, 'transparent');
        gradient.addColorStop(0.6, 'transparent');
        gradient.addColorStop(1.0, '#000000');
        context.fillStyle = gradient;

        context.rect(0, 0, inCanvas.width, inCanvas.height);
        context.fill();
        context.rect(0, 0, inCanvas.width, inCanvas.height);
        context.fill();

        BLUR_FILTER.Apply(inCanvas, inParameters);
    }
};

var GAMETERRAIN_FILTER = {
    Apply: function(inCanvas, inParameters) {
        var context = inCanvas.getContext("2d");

        context.beginPath();

        // Apply gradient to get a shape for a potential game
        var gradient = context.createLinearGradient(inCanvas.width, 0, 0, 0);
        gradient.addColorStop(0, '#111');
        gradient.addColorStop(0.06, '#1b1b1b');
        gradient.addColorStop(0.1, '#1b1b1b');
        gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.7)');
        gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.3)');
        gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.05)');
        gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(0.94, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(0.96, '#000');

        context.fillStyle = gradient;
        context.rect(0, 0, inCanvas.width, inCanvas.height);
        context.fill();
        context.rect(0, 0, inCanvas.width, inCanvas.height);
        context.fill();

        BLUR_FILTER.Apply(inCanvas, inParameters);
    }
};

var PN_GENERATOR = {
    RandomNoise: function(inParameters, inCanvas, inX, inY, inWidth, inHeight, inAlpha) {
        var g = inCanvas.getContext("2d"),
            imageData = g.getImageData(0, 0, inCanvas.width, inCanvas.height),
            pixels = imageData.data;

        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i] = pixels[i + 1] = pixels[i + 2] = (inParameters.alea.Random() * 256) | 0;
            pixels[i + 3] = 255;
        }

        g.putImageData(imageData, 0, 0);
        return inCanvas;
    },

    PerlinNoise: function(inParameters) {
        /**
         * This part is based on the snippest :
         * https://gist.github.com/donpark/1796361
         */

        var noise = this.RandomNoise(inParameters, TERRAINGEN.CreateCanvas(inParameters.widthSegments, inParameters.heightSegments));
        var context = inParameters.canvas.getContext("2d");
        context.save();

        var ratio = inParameters.widthSegments / inParameters.heightSegments;

        /* Scale random iterations onto the canvas to generate Perlin noise. */
        for (var size = 4; size <= noise.height; size *= inParameters.param) {
            var x = (inParameters.alea.Random() * (noise.width - size)) | 0,
                y = (inParameters.alea.Random() * (noise.height - size)) | 0;
            context.globalAlpha = 4 / size;
            context.drawImage(noise, Math.max(x, 0), y, size * ratio, size, 0, 0, inParameters.widthSegments, inParameters.heightSegments);
        }

        context.restore();

        return inParameters.canvas;
    },

    Get: function(inParameters) {
        var geometry = new THREE.Geometry();

        inParameters.param = Math.max(1.1, inParameters.param);

        // Create the Perlin Noise
        var noise = this.PerlinNoise(inParameters);

        return noise;
    }
};

var RAND_DEFAULT = {
    Random: function() {
        return Math.random();
    }
};

var RAND_MT = {
    ms_MersenneTwister: null,

    Initialize: function() {
        this.ms_MersenneTwister = new MersenneTwister();
    },

    Random: function() {
        if (this.ms_MersenneTwister == null)
            this.Initialize();

        return this.ms_MersenneTwister.genrand_int32() * (1.0 / 4294967296.0);
    }
};


/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.

  If you want to use this as a substitute for Math.random(), use the random()
  method like so:

  var m = new MersenneTwister();
  var randomNumber = m.random();

  You can also call the other genrand_{foo}() methods on the instance.

  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:

  var m = new MersenneTwister(123);

  and that will always produce the same random sequence.

  Sean McCullough (banksean@gmail.com)
*/

/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

var MersenneTwister = function(seed) {
    if (seed == undefined) {
        seed = new Date().getTime();
    }
    /* Period parameters */
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df; /* constant vector a */
    this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
    this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

    this.mt = new Array(this.N); /* the array for the state vector */
    this.mti = this.N + 1; /* mti==N+1 means mt[N] is not initialized */

    this.init_genrand(seed);
}

/* initializes mt[N] with a seed */
MersenneTwister.prototype.init_genrand = function(s) {
    this.mt[0] = s >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++) {
        var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
        this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;
        /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
        /* In the previous versions, MSBs of the seed affect   */
        /* only MSBs of the array mt[].                        */
        /* 2002/01/09 modified by Makoto Matsumoto             */
        this.mt[this.mti] >>>= 0;
        /* for >32 bit machines */
    }
}

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
    var i, j, k;
    this.init_genrand(19650218);
    i = 1;
    j = 0;
    k = (this.N > key_length ? this.N : key_length);
    for (; k; k--) {
        var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)
        this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525))) + init_key[j] + j; /* non linear */
        this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
        i++;
        j++;
        if (i >= this.N) {
            this.mt[0] = this.mt[this.N - 1];
            i = 1;
        }
        if (j >= key_length) j = 0;
    }
    for (k = this.N - 1; k; k--) {
        var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
        this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941)) - i; /* non linear */
        this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
        i++;
        if (i >= this.N) {
            this.mt[0] = this.mt[this.N - 1];
            i = 1;
        }
    }

    this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
}

/* generates a random number on [0,0xffffffff]-interval */
MersenneTwister.prototype.genrand_int32 = function() {
    var y;
    var mag01 = new Array(0x0, this.MATRIX_A);
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (this.mti >= this.N) { /* generate N words at one time */
        var kk;

        if (this.mti == this.N + 1) /* if init_genrand() has not been called, */
            this.init_genrand(5489); /* a default initial seed is used */

        for (kk = 0; kk < this.N - this.M; kk++) {
            y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
            this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
        }
        for (; kk < this.N - 1; kk++) {
            y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
            this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
        }
        y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
        this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

        this.mti = 0;
    }

    y = this.mt[this.mti++];

    /* Tempering */
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
}

/* generates a random number on [0,0x7fffffff]-interval */
MersenneTwister.prototype.genrand_int31 = function() {
    return (this.genrand_int32() >>> 1);
}

/* generates a random number on [0,1]-real-interval */
MersenneTwister.prototype.genrand_real1 = function() {
    return this.genrand_int32() * (1.0 / 4294967295.0);
    /* divided by 2^32-1 */
}

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function() {
    return this.genrand_int32() * (1.0 / 4294967296.0);
    /* divided by 2^32 */
}

/* generates a random number on (0,1)-real-interval */
MersenneTwister.prototype.genrand_real3 = function() {
    return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
    /* divided by 2^32 */
}

/* generates a random number on [0,1) with 53-bit resolution*/
MersenneTwister.prototype.genrand_res53 = function() {
    var a = this.genrand_int32() >>> 5,
        b = this.genrand_int32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
}

/* These real versions are due to Isaku Wada, 2002/01/09 added */

var DEPTHNOISE_EFFECT = {
    Apply: function(inGeometry, inParameters) {
        var positions = inGeometry.getAttribute('position').array,
            scaleDepth = inParameters.depth / 255;

        for (var i = 1; i < positions.length; i += 3) {
            positions[i] += scaleDepth * inParameters.alea.Random();
        }
    },

};

var DESTRUCTURE_EFFECT = {
    Apply: function(inGeometry, inParameters) {
        var positions = inGeometry.getAttribute('position').array,
            densityWidth = inParameters.width / inParameters.widthSegments,
            densityHeight = inParameters.height / inParameters.heightSegments,
            densityDepth = inParameters.depth / 255,
            param = 1;

        for (var i = 0; i < positions.length; i++) {
            if (i % 3 == 0) {
                positions[i] += (inParameters.alea.Random() - 0.5) * densityWidth * param;
            } else if (i % 3 == 1) {
                positions[i] += (inParameters.alea.Random() - 0.5) * densityDepth * param;
            } else if (i % 3 == 2) {
                positions[i] += (inParameters.alea.Random() - 0.5) * densityHeight * param;
            }
        }
    },

};



// [x]#TODO:130 RESTRUCTURIZE.
// [x]#TODO:120 RESTRUCTURIZE threejs and cannonjs library calling.
// [x]#DONE:30 Add stats.
// #TODO:10 Add http://underscorejs.org/.
// DONE:20 clean all console.logs.
// DOING:0 Wagner.base.js is not a part of library.
// FIXME: Fix fog.

/* ================ MODERNIZING BROWSER API IF NOT EXIST ========================== */

if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        'use strict';
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
}

/* ================ WHITESTORM|JS ================================================= */
var WHS = {
    REVISION: "0.0.4"
};

WHS.headers = {}; //GLOBAL headers, ex: url, script, library, specific api...
WHS.API = {};
WHS.ADD = {}; // some figures or shape funcs;
WHS.objects = [];
WHS.grounds = [];

var api = WHS.API;

if (typeof define === 'function' && define.amd) {

    define('whitestorm', WHS);

} else if ('undefined' !== typeof exports && 'undefined' !== typeof module) {

    module.exports = WHS;

}



/**
 * Trimesh figure. Makes convexPolyhedron object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Object} thrObj Figure object *THREE.JS*. (REQUIRED)
 * @returns {Object} - Figure object *CANNON.JS*. (REQUIRED)
 */
WHS.API.ConvexFigure = function(thrObj) {
    'use strict';
    if (arguments.length < 1)
        console.error("No THREE.js geometry");
    else if (arguments.length == 1) {
        var points = new Array();
        var faces = new Array();

        thrObj.vertices.forEach(function(element) {
            points.push(new WHS.headers.cannonjs.Vec3(element.x, element.y, element.z));
        });

        thrObj.faces.forEach(function(element) {
            faces.push([element.a, element.b, element.c]);
        });

        return new WHS.headers.cannonjs.ConvexPolyhedron(points, faces);
    }
}



// [x]#FIXME:10 Modify def for third parameter.
/**
 * Defines variable. Makes convexPolyhedron object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Var} option Variable with value. (REQUIRED)
 * @param {Type} value Value for apply (default). (REQUIRED)
 * @param {Var} variablePoint Variable with value for apply. (OPTIONAL)
 */
WHS.API.def = function(option, value, variablePoint) {
    'use strict';
    if (arguments.length < 2)
        console.error("Something wrong! option? value?");
    else if (arguments.length == 2) {
        option = option || value;
        return option;
    } else if (arguments.length == 3 && variablePoint) {
        variablePoint = option || value;
        return variablePoint;
    }
}



/**
 * Shape. Makes *THREE.JS* shape.
 *
 * @param {Object} pos Position x/y/z.
 * @param {Number} diff Intersect line length from top.
 * @param {Object} terrain *WHS* terrain object.
 * @returns {Object} Intersect array.
 */
WHS.API.getheight = function(pos, diff, terrain) {
    'use strict';

    diff = diff || 1000;

    this.raycaster = new WHS.headers.threejs.Raycaster(
        new WHS.headers.threejs.Vector3(pos.x, diff, pos.y),
        new WHS.headers.threejs.Vector3(0, -1, 0).normalize()
    );

    this.intersect = this.raycaster.intersectObject(terrain.visible);

    return this.intersect;
}



/**
 * ISSAME.
 *
 * @param {Object} a1 *THREE.JS* face. (REQUIRED)
 * @param {Object} a2 *THREE.JS* face. (REQUIRED)
 * @return {Boolean} thrObj *THREE.JS* geometry.
 */
WHS.API.isSame = function(a1, a2) {
    return !(a1.sort() > a2.sort() || a1.sort() < a2.sort());
}



// #DONE:10 JSONLoader don't work.
WHS.API.JSONLoader = function() {
    return new THREE.JSONLoader();
}



/**
 * MERGE.
 *
 * @param {Object} box Object to be merged. (REQUIRED)
 * @param {Object} rabbits Object to be added. (REQUIRED)
 */
WHS.API.merge = function(box, rabbits) {
    'use strict';
    if (arguments.length < 2)
        console.error("No rabbits for the box. (arguments)", [box, rabbits]);
    else if (arguments.length == 2) {
        if (Array.isArray(rabbits) && rabbits.length <= 1)
            box.add(rabbits[0]);
        else if (Array.isArray(rabbits) && rabbits.length >= 2) {
            for (var i = 0; i < rabbits.length; i++) {
                box.add(rabbits[i]);
            }
        } else if (!Array.isArray(rabbits) && box)
            box.add(rabbits);
        else
        // #FIXME:0 Fix caller function line number.
            console.error("box is undefined. Line " + (new Error).lineNumber + ". Func merge.", [box, rabbits]);
    }
}



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

    for (i = 0; i < geometry.faces.length; i++) {

        var v1 = geometry.vertices[faces[i].a];
        var v2 = geometry.vertices[faces[i].b];
        var v3 = geometry.vertices[faces[i].c];

        geometry.faceVertexUvs[0].push([
            new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
            new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
            new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
        ]);

    }

    geometry.uvsNeedUpdate = true;

}



/**
 * REMOVEDUPLICEFACES.
 *
 * @param {Object} geometry *THREE.JS* geometry. (REQUIRED)
 * @return {Object} geometry *THREE.JS* geometry.
 */
WHS.API.removeDuplicateFaces = function(geometry) {
    for (var i = 0; i < geometry.faces.length; i++) {
        var tri = geometry.faces[i];
        var inds = [tri.a, tri.b, tri.c, tri.d].sort();
        for (var j = 0; j < i; j++) {
            var tri_2 = geometry.faces[j];
            if (tri_2 !== undefined) { // May have already been deleted
                var inds_2 = [tri_2.a, tri_2.b, tri_2.c, tri_2.d].sort();
                if (WHS.API.isSame(inds, inds_2)) {
                    delete geometry.faces[i]; // Sets these faces to undefined
                    // If duplicate, it is also interior, so remove both
                    delete geometry.faces[j];
                }
            }
        }
    }
    geometry.faces = geometry.faces.filter(function(a) {
        return a === undefined
    });
    return geometry;
}



/**
 * Rotate body. Rotates body object *CANNON.JS*.
 *
 * @param {Object} body Body object in *CANNON.JS*. (REQUIRED)
 * @param {Object} rotateSet Object of x, y, z coords. (REQUIRED)
 * @return {Object} Body object in *CANNON.JS*.
 */
WHS.API.rotateBody = function(body, rotateSet) {
    'use strict';

    body.quaternion.x = Math.sin((Math.PI / 180) * rotateSet.x * 0.5);
    body.quaternion.y = Math.sin((Math.PI / 180) * rotateSet.y * 0.5);
    body.quaternion.z = Math.sin((Math.PI / 180) * rotateSet.z * 0.5);
    body.quaternion.w = Math.cos(90 * 0.5);

    return body;
}



/**
 * ROTATEGEOMETRY.
 *
 * @param {Object} geometry *THREE.JS* geometry. (REQUIRED)
 * @param {Object} rotateSet Rotation x/y/z. (REQUIRED)
 * @return {Object} *THREE.JS* geometry.
 */
WHS.API.rotateGeometry = function(geometry, rotateSet) {
    var rotationMatrix = new WHS.headers.threejs.Matrix4();
    rotationMatrix.makeRotationFromEuler(new WHS.headers.threejs.Euler(rotateSet.x, rotateSet.y, rotateSet.z, 'XYZ'));

    for (var v in geometry.vertices) {
        geometry.vertices[v].applyMatrix4(rotationMatrix);
    }

    return geometry;
}



/**
 * Shape. Makes *THREE.JS* shape.
 *
 * @returns {Object} - *THREE.JS* shape object.
 */
WHS.ADD.shape = function() {
    return new WHS.headers.threejs.Shape();
}



/**
 * Texture. Loads texture object.
 *
 * @param {String} url Url adress of texture *JSON*. (REQUIRED)
 * @param {Object} options Parameters of texture. (REQUIRED)
 * @return {Object} *THREE.JS* texture.
 */
WHS.API.texture = function(url, options) {
    'use strict';

    var texture = WHS.headers.threejs.ImageUtils.loadTexture(url);

    if (options) {
        var opt = options;
        opt.offset = opt.offset || {
            x: 1,
            y: 1
        };

        opt.offset.x = opt.offset.x || 1;
        opt.offset.y = opt.offset.y || 1;

        opt.repeat = opt.repeat || {
            x: 1,
            y: 1
        };

        opt.repeat.x = opt.repeat.x || 1;
        opt.repeat.y = opt.repeat.y || 1;

        texture.wrapS = texture.wrapT = WHS.headers.threejs.RepeatWrapping;
        //texture.offset.set(opt.offset.x, opt.offset.y);
        texture.repeat.set(opt.repeat.x, opt.repeat.y);

        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;
    }

    return texture;
}



/**
 * TRIANGULATE.
 *
 * @param {Object} thrObj *THREE.JS* geometry. (REQUIRED)
 * @param {Object} material *THREE.JS* material. (REQUIRED)
 */
WHS.API.Triangulate = function(thrObj, material) {
    'use strict';

    if (arguments.length < 1)
        console.error("No THREE.js geometry");
    else if (arguments.length = 1) {
        var triangles = new WHS.headers.threejs.Geometry();
        var materials = [];

        thrObj.faces.forEach(function(element) {
            var triangle = new WHS.headers.threejs.Geometry();

            [].push.apply(triangle.vertices, [
                thrObj.vertices[element.a],
                thrObj.vertices[element.b],
                thrObj.vertices[element.c]
            ]);

            triangle.faceVertexUvs[0].push([
                new WHS.headers.threejs.Vector2(0, 0),
                new WHS.headers.threejs.Vector2(0, 1),
                new WHS.headers.threejs.Vector2(1, 1),
                new WHS.headers.threejs.Vector2(1, 0),
            ]);

            triangle.faces.push(new WHS.headers.threejs.Face3(0, 1, 2));
            triangle.computeFaceNormals();

            var triangleMesh = new WHS.headers.threejs.Mesh(triangle, material);
            triangleMesh.updateMatrix();

            triangles.merge(triangleMesh.geometry, triangleMesh.matrix);
            materials.push(material);
        });

        var trianglesMesh = new WHS.headers.threejs.Mesh(triangles, new WHS.headers.threejs.MeshFaceMaterial(materials));
        return trianglesMesh;
    }
}



// #TODO:110 Heights array.
/**
 * Trimesh figure. Makes trimesh object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Object} thrObj Figure object *THREE.JS*. (REQUIRED)
 * @param {Boolean} heightsNeed true if heights need. (OPTIONAL)
 */
WHS.API.TrimeshFigure = function(thrObj, heightsNeed) {
    'use strict';

    if (arguments.length < 1)
        console.error("No THREE.js geometry");
    else if (arguments.length == 1) {
        var points = [];
        var faces = [];
        var heights = [];

        thrObj.vertices.forEach(function(element) {
            points.push(element.x);
            points.push(element.y);
            points.push(element.z);

            if (heightsNeed) {
                heights.push({
                    x: element.x,
                    y: element.y,
                    z: element.z
                });
            }
        });

        thrObj.faces.forEach(function(element) {
            faces.push(element.a);
            faces.push(element.b);
            faces.push(element.c);
        });

        var canObj = new WHS.headers.cannonjs.Trimesh(points, faces);
        canObj.updateNormals();
        canObj.heightsValues = heights;

        return canObj;

    }
}


// DONE:0 Make Wrap function.
WHS.API.Wrap = function(SCOPE, mesh, body) {
    'use strict';

    this._figure = mesh;
    this._object = body;
    this._scope = SCOPE;
    this._key = WHS.objects.length;

    api.merge(this._scope.root.scene, this._figure);
    if (this._object) api.merge(this._scope.root.world, this._object);

    WHS.objects.push(this._scope);

    return this;
}

WHS.API.Wrap.prototype.remove = function() {
    this._scope.root.scene.remove(this._figure);
    this._scope.root.world.remove(this._object);

    WHS.objects.splice(this._key, 1);

    return this;
}

WHS.API.Wrap.prototype.retrieve = function() {
    this._scope.root.scene.add(this._figure);
    this._scope.root.world.add(this._object);

    WHS.objects.push(this._scope);

    return this;
}



/**
 * Init.
 *
 * @param {Object} THREE *THREE.JS* object. (REQUIRED)
 * @param {Object} CANNON *CANNON.JS* object. (REQUIRED)
 * @param {Object} params Parameters of initalize. (OPTIONAL)
 * @return {Object} Scope.
 */
WHS.init = function(THREE, CANNON, params) {
    'use strict';

    console.log('WHS.init', WHS.REVISION);

    params = params || {};

    this.anaglyph = params.anaglyph;

    api.def(params.gravity, {
        x: 0,
        y: -9.82 * 100,
        z: 0
    });

    // Local variables.
    this.threejs = THREE;
    this.cannonjs = CANNON;

    // Global variables (for WfHS.API).
    WHS.headers.threejs = this.threejs;
    WHS.headers.cannonjs = this.cannonjs;

    this.params = params;

    this.rWidth = window.innerWidth / 1.5;
    this.rHeight = window.innerHeight / 1.5

    this.scene = new this.threejs.Scene();
    this.world = new this.cannonjs.World();

    this.world.gravity.set(params.gravity.x, params.gravity.y, params.gravity.z);
    this.world.broadphase = new this.cannonjs.NaiveBroadphase();
    this.world.quatNormalizeSkip = 0;
    this.world.quatNormalizeFast = false;

    this.solver = new this.cannonjs.GSSolver();
    this.world.defaultContactMaterial.contactEquationStiffness = 1e8;
    this.world.defaultContactMaterial.contactEquationRegularizationTime = 3;
    this.solver.iterations = 20;
    this.solver.tolerance = 0;
    var split = true;

    if (split)
        this.world.solver = new this.cannonjs.SplitSolver(this.solver);
    else
        this.world.solver = this.solver;

    this.physicsMaterial = new this.cannonjs.Material("slipperyMaterial");
    this.physicsContactMaterial = new this.cannonjs.ContactMaterial(this.physicsMaterial,
        this.physicsMaterial,
        0.0, // friction coefficient
        0.3 // restitution
    );

    // We must add the contact materials to the world
    this.world.addContactMaterial(this.physicsContactMaterial);

    // Debug Renderer
    if (params.helper) {
        this.cannonDebugRenderer = new this.threejs.CannonDebugRenderer(this.scene, this.world);
    }

    if (params.stats) {
        this.stats = new Stats();
        if (params.stats == "fps")
            this.stats.setMode(0);
        else if (params.stats == "ms")
            this.stats.setMode(1);
        else if (params.stats == "mb")
            this.stats.setMode(1);
        else {
            this.stats.setMode(0);
            // WARN: console | stats mode.
            console.warn([this.stats], "Please, apply right stats mode [fps, ms, mb] .");
        }

        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.bottom = '0px';

        document.body.appendChild(this.stats.domElement);
    }

    if (!this.params.camera) {
        this.params.camera = {};
    }

    this.params.camera.aspect = api.def(this.params.camera.aspect, 75);
    this.params.camera.near = api.def(this.params.camera.near, 1);
    this.params.camera.far = api.def(this.params.camera.far, 1000);

    this.camera = new this.threejs.PerspectiveCamera(
        this.params.camera.aspect,
        window.innerWidth / window.innerHeight,
        this.params.camera.near,
        this.params.camera.far
    );

    this.params.camera.x = api.def(this.params.camera.x, 0);
    this.params.camera.y = api.def(this.params.camera.y, 0);
    this.params.camera.z = api.def(this.params.camera.z, 0);
    this.camera.position.set(this.params.camera.x, this.params.camera.y, this.params.camera.z);

    api.merge(this.scene, this.camera);

    this.renderer = new this.threejs.WebGLRenderer();
    this.renderer.setClearColor(0x70DBFF);

    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;

    if (this.anaglyph) {
        this.effect = new this.threejs.AnaglyphEffect(this.renderer);
        this.effect.setSize(this.rWidth, window.innerHeight);

        this.effect.render(this.scene, this.camera);
    } else {
        this.renderer.setSize(this.rWidth, this.rHeight);
        this.renderer.render(this.scene, this.camera);
    }

    $(this.renderer.domElement).css({
        'width': '100%',
        'height': '100%'
    });

    $(this.renderer.domElement).attr('');

    this.rootElement = $('body');

    $(this.renderer.domElement).css({
        'width': '100%',
        'height': '100%'
    });

    this.rootElement.append(this.renderer.domElement);

    this.rootElement.css({
        'margin': 0,
        'padding': 0,
        'position': 'relative',
        'overflow': 'hidden'
    });

    WHS.init.prototype.animate(null, this);

    // NOTE: =================================== Composer. ============================================

    if (params.wagner) {
        this.composer = new params.wagner.Composer(this.renderer);
        this.composer.setSize(this.rWidth, this.rHeight);
        $(this.composer.domElement).css({
            'width': '100%',
            'height': '100%'
        });
        this.renderer.autoClearColor = true;
        this.composer.reset();
        this.composer.render(this.scene, this.camera);
    }

    this.composer.eff = [];

    // NOTE: =================================== Autoresize. ==========================================
    var scope = this;

    if (params.autoresize)
        $(window).on('load resize', function() {
            scope.camera.aspect = window.innerWidth / window.innerHeight;
            scope.camera.updateProjectionMatrix();

            scope.renderer.setSize(scope.rWidth, scope.rHeight);
            $(scope.renderer.domElement).css({
                'width': '100%',
                'height': '100%'
            });

            if (params.wagner) {
                scope.composer.setSize(scope.rWidth, scope.rHeight);
                $(scope.composer.domElement).css({
                    'width': '100%',
                    'height': '100%'
                });
            }
        });

    return scope;
}

// [x]#TODO:70 Fix animate update callback.
/**
 * ANIMATE.
 */
WHS.init.prototype.animate = function(time, scope) {
    'use strict';

    this.delta = 0,
        this.oldTimer = 0;

    this.timer = new Date().getTime();
    this.delta = this.timer - this.oldTime;
    this.oldTimer = this.timer;

    if (isNaN(this.delta) || this.delta > 1000 || this.delta == 0) {
        this.delta = 1000 / 60;
    }

    function reDraw() {
        if (scope.stats)
            scope.stats.begin();

        requestAnimationFrame(reDraw);

        if (scope.params.helper) {
            scope.cannonDebugRenderer.update();
        }

        for (var i = 0; i < Object.keys(WHS.objects).length; i++) {
            if (!WHS.objects[i].onlyvis) {

                if (WHS.objects[i].visible)
                    WHS.objects[i].visible.position.copy(WHS.objects[i].body.position);

                if (WHS.objects[i].visible.quaternion)
                    WHS.objects[i].visible.quaternion.copy(WHS.objects[i].body.quaternion);

            }
            //WHS.objects[i].addCompoundFace();
        }

        scope.world.step(1 / 60);

        if (scope.anaglyph)
            scope.effect.render(scope.scene, scope.camera);

        if (scope.controls) {
            scope.controls.update(Date.now() - scope.time);
            scope.time = Date.now();
        }

        if (scope.motionBlurEffect && scope.motionBlurEnable) {
            scope.motionBlurEffect.params.delta = 0;
            scope.motionBlurEnable = true;
        }

        if (scope.composer) {
            scope.composer.reset();

            scope.composer.render(scope.scene, scope.camera);

            scope.composer.eff.forEach(function(effect) {
                scope.composer.pass(effect);
            })

            scope.composer.toScreen();
        }

        if (scope.stats)
            scope.stats.end();
    }

    this.update = reDraw;

    this.update();
}



// #DONE:40 addModel *func*.
/**
 * Figure.
 *
 * @param {String} pathToModel path to JSON model. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 * @return {Object} Scope.
 */
WHS.init.prototype.addModel = function(pathToModel, options) {
    'use strict';

    var scope = {}; // INIT LOCAL SCOPE.

    scope.root = this;

    var opt = {};

    scope.whsobject = true;
    scope.releaseTime = new Date().getTime();

    opt.color = options.color || 0xffffff;
    opt.mass = options.mass || 0;

    opt.pos = typeof options.pos == "object" ? options.pos : {
        x: 0,
        y: 0,
        z: 0
    };

    opt.rot = typeof options.pos == "object" ? options.pos : {
        x: 0,
        y: 0,
        z: 0
    };

    opt.material = options.materialOptions || {};
    opt.geometry = options.geometryOptions || {};

    switch (opt.material.type) {
        case "basic":
            scope.materialType = new this.threejs.MeshBasicMaterial(opt.material);
            break;
        case "linebasic":
            scope.materialType = new this.threejs.LineBasicMaterial(opt.material);
            break;
        case "linedashed":
            scope.materialType = new this.threejs.LineDashedMaterial(opt.material);
            break;
        case "material":
            scope.materialType = new this.threejs.Material(opt.material);
            break;
        case "depth":
            scope.materialType = new this.threejs.MeshDepthMaterial(opt.material);
            break;
        case "face":
            scope.materialType = new this.threejs.MeshFaceMaterial(opt.material.materials);
            break;
        case "lambert":
            scope.materialType = new this.threejs.MeshLambertMaterial(opt.material);
            break;
        case "normal":
            scope.materialType = new this.threejs.MeshNormalMaterial(opt.material);
            break;
        case "phong":
            scope.materialType = new this.threejs.MeshPhongMaterial(opt.material);
            break;
        case "pointcloud":
            scope.materialType = new this.threejs.PointCloudMaterial(opt.material);
            break;
        case "rawshader":
            scope.materialType = new this.threejs.RawShaderMaterial(opt.material);
            break;
        case "shader":
            scope.materialType = new this.threejs.ShaderMaterial(opt.material);
            break;
        case "spritecanvas":
            scope.materialType = new this.threejs.SpriteCanvasMaterial(opt.material);
            break;
        case "sprite":
            scope.materialType = new this.threejs.SpriteMaterial(opt.material);
            break;
    }

    var key = 0;

    WHS.objects.forEach(function(el) {
        if (el.type == "model") {
            key++;
        }
    });

    scope.type = "model";
    scope.name = opt.name || "model" + key;

    //(new THREE.JSONLoader())
    api.JSONLoader().load(pathToModel, function(data) {
        data.computeFaceNormals();
        data.computeVertexNormals();

        // Visualization.
        scope.visible = new scope.root.threejs.Mesh(data, scope.materialType);
        scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
        scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

        // Physics.
        if (!options.onlyvis) {
            scope.physic = new WHS.API.TrimeshFigure(data);

            scope.body = new scope.root.cannonjs.Body({
                mass: opt.mass
            });

            scope.body.linearDamping = 0.9; //default
            scope.body.addShape(scope.physic);
            scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.body.quaternion.copy(scope.visible.quaternion);
            scope.body.name = scope.name;
        }

        scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

    });

    return scope;
}



/**
 * Figure.
 *
 * @param {String} figure name *THREE.JS*. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 * @return {Object} Scope.
 */
WHS.init.prototype.addObject = function(figureType, options) {
    'use strict';

    var scope = {}; // INIT LOCAL SCOPE.

    scope.root = this;

    var opt = {};

    scope.whsobject = true;

    scope.releaseTime = new Date().getTime();

    opt.color = options.color || 0xffffff;
    opt.mass = options.mass || 0;

    opt.pos = typeof options.pos == "object" ? options.pos : {
        x: 0,
        y: 0,
        z: 0
    };

    opt.rot = typeof options.pos == "object" ? options.pos : {
        x: 0,
        y: 0,
        z: 0
    };

    opt.material = options.materialOptions || {};
    opt.geometry = options.geometryOptions || {};

    switch (opt.material.type) {
        case "basic":
            scope.materialType = new this.threejs.MeshBasicMaterial(opt.material);
            break;
        case "linebasic":
            scope.materialType = new this.threejs.LineBasicMaterial(opt.material);
            break;
        case "linedashed":
            scope.materialType = new this.threejs.LineDashedMaterial(opt.material);
            break;
        case "material":
            scope.materialType = new this.threejs.Material(opt.material);
            break;
        case "depth":
            scope.materialType = new this.threejs.MeshDepthMaterial(opt.material);
            break;
        case "face":
            scope.materialType = new this.threejs.MeshFaceMaterial(opt.material.materials);
            break;
        case "lambert":
            scope.materialType = new this.threejs.MeshLambertMaterial(opt.material);
            break;
        case "normal":
            scope.materialType = new this.threejs.MeshNormalMaterial(opt.material);
            break;
        case "phong":
            scope.materialType = new this.threejs.MeshPhongMaterial(opt.material);
            break;
        case "pointcloud":
            scope.materialType = new this.threejs.PointCloudMaterial(opt.material);
            break;
        case "rawshader":
            scope.materialType = new this.threejs.RawShaderMaterial(opt.material);
            break;
        case "shader":
            scope.materialType = new this.threejs.ShaderMaterial(opt.material);
            break;
        case "spritecanvas":
            scope.materialType = new this.threejs.SpriteCanvasMaterial(opt.material);
            break;
        case "sprite":
            scope.materialType = new this.threejs.SpriteMaterial(opt.material);
            break;
    }

    var key = 0;

    switch (figureType) {
        case "sphere":

            api.def(opt.geometry.segmentA, 32);
            api.def(opt.geometry.segmentB, 32);

            // #FIXME:40 more complex use of key sholud be added.
            WHS.objects.forEach(function(el) {
                if (el.type == "sphere") {
                    key++;
                }
            });

            scope.type = "sphere";
            scope.name = opt.name || "sphere" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.SphereGeometry(opt.geometry.radius, opt.geometry.segmentA, opt.geometry.segmentB), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new this.cannonjs.Sphere(opt.geometry.radius);

                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });

                scope.body.linearDamping = 0.9; //default
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;

            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "cube":


            api.def(opt.geometry.width, 1);
            api.def(opt.geometry.height, 1);
            api.def(opt.geometry.depth, 1);

            WHS.objects.forEach(function(el) {
                if (el.type == "cube") {
                    key++;
                }
            });

            scope.type = "cube";
            scope.name = opt.name || "cube" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.BoxGeometry(opt.geometry.width, opt.geometry.height, opt.geometry.depth), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new this.cannonjs.Box(new this.cannonjs.Vec3(opt.geometry.width * 0.5, opt.geometry.height * 0.5, opt.geometry.depth * 0.5));
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });

                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), (Math.PI / 180) * opt.rot.x);
                scope.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), (Math.PI / 180) * opt.rot.y);
                scope.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), (Math.PI / 180) * opt.rot.z);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "cylinder":


            api.def(opt.geometry.radiusTop, 1);
            api.def(opt.geometry.radiusBottom, 1);
            api.def(opt.geometry.height, 1);
            api.def(opt.geometry.radiusSegments, 32);

            WHS.objects.forEach(function(el) {
                if (el.type == "cylinder") {
                    key++;
                }
            });

            scope.type = "cylinder";
            scope.name = opt.name || "cylinder" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.CylinderGeometry(opt.geometry.radiusTop, opt.geometry.radiusBottom, opt.geometry.height, opt.geometry.radiusSegments), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new this.cannonjs.Cylinder(opt.geometry.radiusTop, opt.geometry.radiusBottom, opt.geometry.height, opt.geometry.radiusSegments);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "dodecahedron":


            api.def(opt.geometry.radius, 1);
            api.def(opt.geometry.detail, 0);

            WHS.objects.forEach(function(el) {
                if (el.type == "dodecahedron") {
                    key++;
                }
            });

            scope.type = "dodecahedron";
            scope.name = opt.name || "dodecahedron" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.DodecahedronGeometry(opt.geometry.radius, opt.geometry.detail), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "extrude":


            api.def(opt.geometry.shapes, []);
            api.def(opt.geometry.options, {});

            WHS.objects.forEach(function(el) {
                if (el.type == "extrude") {
                    key++;
                }
            });

            scope.type = "extrude";
            scope.name = opt.name || "extrude" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.ExtrudeGeometry(opt.geometry.shapes, opt.geometry.options), scope.materialType);

            scope.visible.name = this.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "icosahedron":


            api.def(opt.geometry.radius, 1);
            api.def(opt.geometry.detail, 0);

            WHS.objects.forEach(function(el) {
                if (el.type == "icosahedron") {
                    key++;
                }
            });

            scope.type = "icosahedron";
            scope.name = opt.name || "icosahedron" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.IcosahedronGeometry(opt.geometry.radius, opt.geometry.detail), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "lathe":


            api.def(opt.geometry.points, []);

            WHS.objects.forEach(function(el) {
                if (el.type == "lathe") {
                    key++;
                }
            });

            scope.type = "lathe";
            scope.name = opt.name || "lathe" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.LatheGeometry(opt.geometry.points), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                this.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "octahedron":


            api.def(opt.geometry.radius, 1);
            api.def(opt.geometry.detail, 0);

            WHS.objects.forEach(function(el) {
                if (el.type == "octahedron") {
                    key++;
                }
            });

            scope.type = "octahedron";
            scope.name = opt.name || "octahedron" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.OctahedronGeometry(opt.geometry.radius, opt.geometry.detail), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "parametric":


            api.def(opt.geometry.func, function() {});
            api.def(opt.geometry.slices, 10);
            api.def(opt.geometry.stacks, 10);

            WHS.objects.forEach(function(el) {
                if (el.type === "parametric") {
                    key++;
                }
            });

            scope.type = "parametric";
            scope.name = opt.name || "parametric" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.ParametricGeometry(opt.geometry.func, opt.geometry.slices, opt.geometry.stacks), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = this.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "plane":


            api.def(opt.geometry.func, function() {});
            api.def(opt.geometry.width, 10);
            api.def(opt.geometry.height, 10);
            api.def(opt.geometry.segments, 32);

            WHS.objects.forEach(function(el) {
                if (el.type == "plane") {
                    key++;
                }
            });

            scope.type = "plane";
            scope.name = opt.name || "plane" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.PlaneBufferGeometry(opt.geometry.width, opt.geometry.height, opt.geometry.segments), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "polyhedron":


            api.def(opt.geometry.verticesOfCube, []);
            api.def(opt.geometry.indicesOfFaces, []);
            api.def(opt.geometry.radius, 1);
            api.def(opt.geometry.detail, 1);

            WHS.objects.forEach(function(el) {
                if (el.type == "polyhedron") {
                    key++;
                }
            });

            scope.type = "polyhedron";
            scope.name = opt.name || "polyhedron" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.PolyhedronGeometry(opt.geometry.verticesOfCube, opt.geometry.indicesOfFaces), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "ring":


            api.def(opt.geometry.innerRadius, 0);
            api.def(opt.geometry.outerRadius, 50);
            api.def(opt.geometry.thetaSegments, 1);
            api.def(opt.geometry.phiSegments, 8);
            api.def(opt.geometry.thetaStart, 0);
            api.def(opt.geometry.thetaLength, Math.PI * 2);

            WHS.objects.forEach(function(el) {
                if (el.type == "ring") {
                    key++;
                }
            });

            scope.type = "ring";
            scope.name = opt.name || "ring" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.TorusGeometry(opt.geometry.outerRadius, (opt.geometry.outerRadius - opt.geometry.innerRadius) / 2, opt.geometry.thetaSegments, opt.geometry.phiSegments), scope.materialType);

            scope.visible.scale.z = 1 / (opt.geometry.outerRadius - opt.geometry.innerRadius) * 2;
            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = this.cannonjs.Trimesh.createTorus(opt.geometry.outerRadius, (opt.geometry.outerRadius - opt.geometry.innerRadius) / 2, opt.geometry.thetaSegments, opt.geometry.phiSegments);
                scope.physic.scale.z = 1 / (opt.geometry.outerRadius - opt.geometry.innerRadius) * 2;
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "shape":


            WHS.objects.forEach(function(el) {
                if (el.type == "shape") {
                    key++;
                }
            });

            scope.type = "shape";
            scope.name = opt.name || "shape" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.ShapeGeometry(opt.geometry.shapes), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            scope.onlyvis = true;

            // WARN: console | 2d to 3d.
            console.warn('This is not physic object. 2D!', [scope]);

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "tetrahedron":
            api.def(opt.geometry.radius, 1);
            api.def(opt.geometry.detail, 0);

            WHS.objects.forEach(function(el) {
                if (el.type == "tetrahedron") {
                    key++;
                }
            });

            scope.type = "tetrahedron";
            scope.name = opt.name || "tetrahedron" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.TetrahedronGeometry(opt.geometry.radius, opt.geometry.detail), scope.materialType);
            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "text":
            opt.geometry.parameters = opt.geometry.parameters || {};

            api.def(opt.geometry.text, "Hello World!");
            api.def(opt.geometry.parameters.size, 1);
            api.def(opt.geometry.parameters.height, 50);
            api.def(opt.geometry.parameters.curveSegments, 1);
            api.def(opt.geometry.parameters.font, "Adelle"); // string !
            api.def(opt.geometry.parameters.weight, "normal"); // string !
            api.def(opt.geometry.parameters.style, "normal");
            api.def(opt.geometry.parameters.bevelEnabled, false);
            api.def(opt.geometry.parameters.bevelThickness, 10);
            api.def(opt.geometry.parameters.bevelSize, 8);

            WHS.objects.forEach(function(el) {
                if (el.type == "text") {
                    key++;
                }
            });

            scope.type = "text";
            scope.name = opt.name || "text" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.TextGeometry(opt.geometry.text, opt.geometry.parameters), scope.materialType);
            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.TrimeshFigure(scope.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "torus":


            api.def(opt.geometry.radius, 100);
            api.def(opt.geometry.tube, 40);
            api.def(opt.geometry.radialSegments, 8);
            api.def(opt.geometry.tubularSegments, 6);
            api.def(opt.geometry.arc, Math.PI * 2);

            WHS.objects.forEach(function(el) {
                if (el.type == "torus") {
                    key++;
                }
            });

            scope.type = "torus";
            scope.name = opt.name || "torus" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.TorusGeometry(opt.geometry.radius, opt.geometry.tube, opt.geometry.radialSegments, opt.geometry.tubularSegments, opt.geometry.arc), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = this.cannonjs.Trimesh.createTorus(opt.geometry.radius, opt.geometry.tube, opt.geometry.radialSegments, opt.geometry.tubularSegments);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "torusknot":


            api.def(opt.geometry.radius, 100);
            api.def(opt.geometry.tube, 40);
            api.def(opt.geometry.radialSegments, 8);
            api.def(opt.geometry.tubularSegments, 6);
            api.def(opt.geometry.arc, Math.PI * 2);

            WHS.objects.forEach(function(el) {
                if (el.type == "torusknot") {
                    key++;
                }
            });

            scope.type = "torusknot";
            scope.name = opt.name || "torusknot" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.TorusKnotGeometry(opt.geometry.radius, opt.geometry.tube, opt.geometry.radialSegments, opt.geometry.tubularSegments, opt.geometry.p, opt.geometry.q, opt.geometry.heightScale), scope.materialType);

            scope.visible.name = scope.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.TrimeshFigure(scope.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
        case "tube":


            // #FIXME:30 fix to WHS.API (not here)
            scope.CustomSinCurve = this.threejs.Curve.create(
                function(scale) { //custom curve constructor
                    this.scale = scale || 1;
                },
                function(t) { //getPoint: t is between 0-1
                    var tx = t * 3 - 1.5,
                        ty = Math.sin(2 * Math.PI * t),
                        tz = 0;
                    return new this.threejs.Vector3(tx, ty, tz).multiplyScalar(this.scale);
                }
            );

            if (!opt.geometry.path) {
                opt.geometry.path = new this.CustomSinCurve(100);
            }

            api.def(opt.geometry.segments, 20);
            api.def(opt.geometry.radius, 2);
            api.def(opt.geometry.radiusSegments, 8);
            api.def(opt.geometry.closed, false);

            WHS.objects.forEach(function(el) {
                if (el.type == "tube") {
                    key++;
                }
            });

            scope.type = "tube";
            scope.name = opt.name || "tube" + key;
            scope.visible = new this.threejs.Mesh(new this.threejs.TubeGeometry(opt.geometry.path, opt.geometry.segments, opt.geometry.radius, opt.geometry.radiusSegments, opt.geometry.closed), scope.materialType);

            scope.visible.name = this.name;
            scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
            scope.visible.rotation.set((Math.PI / 180) * opt.rot.x, (Math.PI / 180) * opt.rot.y, (Math.PI / 180) * opt.rot.z);

            if (!options.onlyvis) {
                scope.physic = new WHS.API.TrimeshFigure(scope.visible.geometry);
                scope.body = new this.cannonjs.Body({
                    mass: opt.mass
                });
                scope.body.linearDamping = 0.9; // Default value.
                scope.body.addShape(scope.physic);
                scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
                scope.body.quaternion.copy(scope.visible.quaternion);
                scope.body.name = scope.name;
            } else {
                scope.onlyvis = true;
            }

            scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

            break;
    }

    // DOING:10 Fix code style here.
    scope.addCompoundFace = function() {
        this.compoundFace = new this.root.threejs.Geometry();

        this.compoundFace.faces.push(new this.root.threejs.Face3(0, 1, 2));

        var boundingBox = new this.root.threejs.Box3().setFromObject(this.visible);

        var boxAround = new this.root.threejs.BoxGeometry(
            boundingBox.max.x - boundingBox.min.x,
            boundingBox.max.y - boundingBox.min.y,
            boundingBox.max.z - boundingBox.min.z
        );

        var vec1 = boxAround.vertices[boxAround.faces[7].a].add(this.visible.position);
        var vec2 = boxAround.vertices[boxAround.faces[7].b].add(this.visible.position);
        var vec3 = boxAround.vertices[boxAround.faces[7].c].add(this.visible.position);

        this.compoundFace.vertices.push(vec1);
        this.compoundFace.vertices.push(vec2);
        this.compoundFace.vertices.push(vec3);
        //this.compoundFace.vertices.push(new this.root.threejs.Vector3(0,1,2));
    }

    scope.remove = function() {
        return scope.wrap.remove();
    }

    scope.retrieve = function() {
        return scope.wrap.retrieve();
    }

    return scope;
}



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

    if (!scope.opts.coords)
        console.warn('Please add grass objects coordinates! @addGrass');

    scope.grassMeshes = [];

    var globalGrass = new THREE.Mesh(
        new THREE.Geometry(),
        new THREE.MeshFaceMaterial()
    );


    scope.opts.coords.forEach(function(coord) {
        var mesh = new THREE.Mesh(
            new THREE.Geometry(),
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture("assets/textures/thingrass.png"),
                side: THREE.DoubleSide,
                blending: THREE.NormalBlending,
                transparent: true,
                alphaTest: 0.5
            })
        );

        var intr = (WHS.API.getheight({
            x: coord.x,
            y: coord.y
        }, 500, ground))[0];

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

        var dVec = new THREE.Vector3(
            faceVertices[intr.face.a].clone().x / 2 + faceVertices[intr.face.c].clone().x / 2,
            faceVertices[intr.face.a].clone().y / 2 + faceVertices[intr.face.c].clone().y / 2,
            faceVertices[intr.face.a].clone().z / 2 + faceVertices[intr.face.c].clone().z / 2
        );

        mesh.geometry.vertices.push(
            dVec.clone().add(
                dVec.clone().sub(faceVertices[intr.face.b].clone())
            )
        );

        mesh.geometry.vertices.push(faceVertices[intr.face.b].clone());
        mesh.geometry.vertices.push(faceVertices[intr.face.b].clone()
            .add(faceInGeometry.faces[0].normal)
        );
        mesh.geometry.vertices.push(
            dVec.clone().add(
                dVec.clone().sub(faceVertices[intr.face.b].clone())
            ).add(faceInGeometry.faces[0].normal)
        );

        mesh.geometry.faces.push(new THREE.Face3(0, 1, 2));
        mesh.geometry.faces.push(new THREE.Face3(1, 2, 3));
        mesh.geometry.faces.push(new THREE.Face3(4, 6, 5));
        mesh.geometry.faces.push(new THREE.Face3(4, 6, 7));

        mesh.geometry.faceVertexUvs[0].push([
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 0),
            new THREE.Vector2(0, 1)
        ]);

        mesh.geometry.faceVertexUvs[0].push([
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(0, 1)
        ]);

        mesh.geometry.faceVertexUvs[0].push([
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(1, 0)
        ]);

        mesh.geometry.faceVertexUvs[0].push([
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(0, 1)
        ]);

        mesh.geometry.uvsNeedUpdate = true;

        //scope.root.scene.add(faceIn);
        //scope.root.scene.add(normalLine);
        //scope.root.scene.add(mesh);

        globalGrass.geometry.merge(mesh.geometry, mesh.matrix);
        globalGrass.material.materials.push(mesh.material);
        scope.grassMeshes.push(mesh);
    });

    scope.root.scene.add(globalGrass);

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
    }

    scope.update();

    return scope;
}



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

    var scope = {};
    scope.root = this;

    var key = 0;
    WHS.grounds.forEach(function(el) {
        if (el.type == type) {
            key++;
        }
    });

    scope.type = type;
    scope.name = "ground" + key;

    api.def(size, {
        width: 100,
        height: 100
    });

    switch (material.type) {
        case "basic":
            scope.materialType = new this.threejs.MeshBasicMaterial(material);
            break;

        case "linebasic":
            scope.materialType = new this.threejs.LineBasicMaterial(material);
            break;

        case "linedashed":
            scope.materialType = new this.threejs.LineDashedMaterial(material);
            break;

        case "material":
            scope.materialType = new this.threejs.Material(material);
            break;

        case "depth":
            scope.materialType = new this.threejs.MeshDepthMaterial(material);
            break;

        case "face":
            scope.materialType = new this.threejs.MeshFaceMaterial(material);
            break;

        case "lambert":
            scope.materialType = new this.threejs.MeshLambertMaterial(material);
            break;

        case "normal":
            scope.materialType = new this.threejs.MeshNormalMaterial(material);
            break;

        case "phong":
            scope.materialType = new this.threejs.MeshPhongMaterial(material);
            break;

        case "pointcloud":
            scope.materialType = new this.threejs.PointCloudMaterial(material);
            break;

        case "rawshader":
            scope.materialType = new this.threejs.RawShaderMaterial(material);
            break;

        case "shader":
            scope.materialType = new this.threejs.ShaderMaterial(material);
            break;

        case "spritecanvas":
            scope.materialType = new this.threejs.SpriteCanvasMaterial(material);
            break;

        case "sprite":
            scope.materialType = new this.threejs.SpriteMaterial(material);
            break;
    }

    switch (type) {
        case "smooth":
            scope.visible = new this.threejs.Mesh(new this.threejs.PlaneBufferGeometry(size.width, size.height, 1, 1), scope.materialType);
            scope.visible.rotation.set(-90 / 180 * Math.PI, 0, 0);
            scope.visible.position.set(pos.x, pos.y, pos.z);
            scope.physic = new this.cannonjs.Plane(size.width, size.height);
            scope.body = new this.cannonjs.Body({
                mass: 0
            });
            scope.body.linearDamping = 0.9; // Default value.
            scope.body.addShape(scope.physic);
            scope.body.position.set(pos.x, pos.y, pos.z);
            scope.body.quaternion.setFromAxisAngle(new this.cannonjs.Vec3(1, 0, 0), -Math.PI / 2);
            scope.body.name = scope.name;
            api.merge(this.world, scope.body);
            api.merge(this.scene, scope.visible);
            break;
        case "infinitySmooth":
            scope.visible = new this.threejs.Mesh(new this.threejs.PlaneBufferGeometry(size.width, size.height, 1, 1), scope.materialType);
            scope.visible.rotation.set(-90 / 180 * Math.PI, 0, 0);
            scope.visible.position.set(pos.x, pos.y, pos.z);
            scope.physic = new this.cannonjs.Plane(size.width, size.height);
            scope.body = new this.cannonjs.Body({
                mass: 0
            });
            scope.body.linearDamping = 0.9; // Default value.
            scope.body.addShape(scope.physic);
            scope.body.position.set(posscopex, pos.y, pos.z);
            scope.body.quaternion.setFromAxisAngle(new this.cannonjs.Vec3(1, 0, 0), -Math.PI / 2);
            scope.body.name = scope.name;
            api.merge(this.world, scope.body);
            api.merge(this.scene, scope.visible);
            break;
            // FUTURE: terrain add.
            // #TODO:80 Fix perfomance by saving terrain like threeJs object with options.
        case "terrain":

            //api.def(size.detality, 0);

            var canvas = document.createElement('canvas');
            canvas.setAttribute("width", size.width);
            canvas.setAttribute("height", size.height);

            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');

                ctx.drawImage(size.terrain, 0, 0);
            }

            var terrainGeometry = TERRAINGEN.GetFromCanvas({
                alea: RAND_MT,
                generator: PN_GENERATOR,
                width: size.width,
                height: size.height,
                widthSegments: size.width,
                heightSegments: size.height,
                depth: size.depth,
                param: 3,
                filterparam: 1,
                filter: [BLUR_FILTER],
                postgen: [], // MOUNTAINS_COLORS
                effect: [DEPTHNOISE_EFFECT] //[ DESTRUCTURE_EFFECT ]
            }, canvas, 0, 0, size.width, size.height);

            scope.custumGeom = new this.threejs.Geometry().fromBufferGeometry(terrainGeometry);
            scope.custumGeom.verticesNeedUpdate = true;
            scope.custumGeom.elementsNeedUpdate = true;
            scope.custumGeom.normalsNeedUpdate = true;
            scope.custumGeom.computeFaceNormals();
            scope.custumGeom.computeVertexNormals();
            scope.custumGeom.mergeVertices();

            if (!isNaN(size.detality)) {
                scope.modifier = new this.threejs.SubdivisionModifier();

                scope.modifier.modify(scope.custumGeom);
                scope.custumGeom.verticesNeedUpdate = true;
                scope.custumGeom.elementsNeedUpdate = true;
                scope.custumGeom.normalsNeedUpdate = true;
                scope.custumGeom.computeFaceNormals();
                scope.custumGeom.computeVertexNormals();
                scope.custumGeom.mergeVertices();
            }

            if (size.useDeafultMaterial) {

                var oceanTexture = new THREE.ImageUtils.loadTexture('assets/textures/terrain/dirt-512.jpg');
                oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping;

                var sandyTexture = new THREE.ImageUtils.loadTexture('assets/textures/terrain/sand-512.jpg');
                sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping;

                var grassTexture = new THREE.ImageUtils.loadTexture('assets/textures/terrain/grass-512.jpg');
                grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

                var rockyTexture = new THREE.ImageUtils.loadTexture('assets/textures/terrain/rock-512.jpg');
                rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping;

                var snowyTexture = new THREE.ImageUtils.loadTexture('assets/textures/terrain/snow-512.jpg');
                snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping;

                var customUN = Object.assign({
                    ambient: {
                        type: "c",
                        value: new THREE.Color(0xdddddd)
                    },
                    emissive: {
                        type: "c",
                        value: new THREE.Color(0xeeeeee)
                    },
                    wrapRGB: {
                        type: "v3",
                        value: new THREE.Vector3(1, 1, 1)
                    },
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
                }, THREE.ShaderLib['basic'].uniforms, THREE.UniformsLib["fog"]);

                var shopts = {
                    uniforms: customUN,
                    vertexShader: [

                        "#define TERRAIN;",
                        "varying vec3 vLightFront;",
                        "#ifdef DOUBLE_SIDED",
                        "	varying vec3 vLightBack;",
                        "#endif",
                        '',
                        'varying float vAmount;',
                        'varying vec2 vUv;',
                        '',

                        THREE.ShaderChunk["map_pars_vertex"],
                        THREE.ShaderChunk["lightmap_pars_vertex"],
                        THREE.ShaderChunk["envmap_pars_vertex"],
                        THREE.ShaderChunk["lights_lambert_pars_vertex"],
                        THREE.ShaderChunk["color_pars_vertex"],
                        THREE.ShaderChunk["morphtarget_pars_vertex"],
                        THREE.ShaderChunk["skinning_pars_vertex"],
                        THREE.ShaderChunk["shadowmap_pars_vertex"],
                        THREE.ShaderChunk["logdepthbuf_pars_vertex"],

                        "void main() {",
                        THREE.ShaderChunk["map_vertex"],
                        THREE.ShaderChunk["lightmap_vertex"],
                        THREE.ShaderChunk["color_vertex"],

                        THREE.ShaderChunk["morphnormal_vertex"],
                        THREE.ShaderChunk["skinbase_vertex"],
                        THREE.ShaderChunk["skinnormal_vertex"],
                        THREE.ShaderChunk["defaultnormal_vertex"],

                        THREE.ShaderChunk["morphtarget_vertex"],
                        THREE.ShaderChunk["skinning_vertex"],
                        THREE.ShaderChunk["default_vertex"],
                        THREE.ShaderChunk["logdepthbuf_vertex"],

                        //THREE.ShaderChunk[ "worldpos_vertex" ],
                        THREE.ShaderChunk["envmap_vertex"],
                        THREE.ShaderChunk["lights_lambert_vertex"],
                        THREE.ShaderChunk["worldpos_vertex"],
                        THREE.ShaderChunk["shadowmap_vertex"],
                        '	vUv = uv;',
                        '	vAmount = position.y * 0.005 + 0.1;',

                        'vec3 newPosition = position;',
                        '	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );',

                        "}"

                    ].join("\n"),

                    fragmentShader: [

                        "uniform float opacity;",

                        "varying vec3 vLightFront;",

                        "#ifdef DOUBLE_SIDED",

                        "varying vec3 vLightBack;",

                        "#endif",
                        'uniform sampler2D oceanTexture;',
                        'uniform sampler2D sandyTexture;',
                        'uniform sampler2D grassTexture;',
                        'uniform sampler2D rockyTexture;',
                        'uniform sampler2D snowyTexture;',

                        THREE.ShaderChunk["color_pars_fragment"],
                        THREE.ShaderChunk["map_pars_fragment"],
                        THREE.ShaderChunk["alphamap_pars_fragment"],
                        THREE.ShaderChunk["lightmap_pars_fragment"],
                        THREE.ShaderChunk["envmap_pars_fragment"],
                        THREE.ShaderChunk["fog_pars_fragment"],
                        THREE.ShaderChunk["shadowmap_pars_fragment"],
                        THREE.ShaderChunk["specularmap_pars_fragment"],
                        THREE.ShaderChunk["logdepthbuf_pars_fragment"],
                        '',
                        'varying vec2 vUv;',
                        'varying float vAmount;',
                        '',
                        "void main() {",



                        '	vec4 water = (smoothstep(0.01, 0.25, vAmount) - smoothstep(0.24, 0.26, vAmount)) * texture2D( oceanTexture, vUv * 0.1 );',
                        '	vec4 sandy = (smoothstep(0.24, 0.27, vAmount) - smoothstep(0.28, 0.31, vAmount)) * texture2D( sandyTexture, vUv * 0.1 );',
                        '	vec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUv * 0.2 );',
                        '	vec4 rocky = (smoothstep(0.30, 0.40, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUv * 0.2 );',
                        '	vec4 snowy = (smoothstep(0.42, 0.45, vAmount))                                   * texture2D( snowyTexture, vUv * 0.1 );',
                        '	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; ',

                        THREE.ShaderChunk["logdepthbuf_fragment"],
                        THREE.ShaderChunk["map_fragment"],
                        THREE.ShaderChunk["alphamap_fragment"],
                        THREE.ShaderChunk["alphatest_fragment"],
                        THREE.ShaderChunk["specularmap_fragment"],

                        "	#ifdef DOUBLE_SIDED",

                        "		if ( gl_FrontFacing )",
                        "			gl_FragColor.xyz *= vLightFront;",
                        "		else",
                        "			gl_FragColor.xyz *= vLightBack;",

                        "	#else",

                        "		gl_FragColor.xyz *= vLightFront;",

                        "	#endif",

                        THREE.ShaderChunk["lightmap_fragment"],
                        THREE.ShaderChunk["color_fragment"],
                        THREE.ShaderChunk["shadowmap_fragment"],
                        THREE.ShaderChunk["linear_to_gamma_fragment"],
                        THREE.ShaderChunk["fog_fragment"],

                        "}"

                    ].join("\n"),

                    side: THREE.DoubleSide,
                    shading: THREE.SmoothShading,
                };

                var customMaterial = new THREE.ShaderMaterial(shopts);
            }

            scope.materialType = size.useDeafultMaterial ? customMaterial : scope.materialType;

            scope.visible = api.Triangulate(scope.custumGeom, scope.materialType);

            scope.visible.scale.x = 1;
            scope.visible.scale.y = 1;
            scope.visible.position.set(pos.x, pos.y, pos.z);
            api.rotateGeometry(scope.visible.geometry, {
                x: 0,
                y: Math.PI / 180 * -180,
                z: 0
            });

            scope.visible.updateMatrix();
            scope.physic = new this.cannonjs.Heightfield(terrainGeometry.heightsArray.reverse(), {
                elementSize: 1 // Distance between the data points in X and Y directions
            });

            scope.body = new this.cannonjs.Body({
                mass: 0
            });

            scope.body.linearDamping = 0.9; // Default value.
            scope.body.addShape(scope.physic);


            scope.body.quaternion.setFromEuler(Math.PI / 180 * -90, 0, 0, "XYZ");

            scope.body.position.set(pos.x - size.width / 2 + 1, pos.y, pos.z + size.height / 2 - 1);
            //scope.physic.scale.x = 1;
            //scope.physic.scale.y = 1;
            scope.body.name = scope.name;
            api.merge(this.world, scope.body);
            api.merge(this.scene, scope.visible);
            scope.visible.castShadow = true;
            scope.visible.receiveShadow = true;

            break;
    }

    WHS.grounds.push(scope);

    return scope;
}



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

    api.def(params.hex, 0x000000); //, this.hex);
    api.def(params.near, 0.015); //, this.near);
    api.def(params.far, 1000); //, this.far);
    api.def(params.density, 0.00025); //, this.density);

    switch (type) {
        case "fog":
            scope = new this.threejs.Fog(params.hex, params.near, params.far);
            break;

        case "fogexp2":
            scope = new this.threejs.FogExp2(params.hex, params.density);
            break;
    }

    return scope;
}



/**
 * Light.
 *
 * @param {String} type Light type. (REQUIRED)
 * @param {Object} opts Parameters of light dot. (OPTIONAL)
 * @param {Object} pos Position of light dot. (OPTIONAL)
 * @param {Object} target Target of light dot. (OPTIONAL)
 * @return {Object} Scope.
 */
WHS.init.prototype.addLight = function(type, opts, pos, target) {
    // #TODO:160 add lights.

    var scope = {};

    scope.whsobject = true;

    scope.target = target;
    scope.pos = pos;

    var options = api.def(opts, {});

    api.def(opts.color, 0xffffff, options.color); // Default: white.
    api.def(opts.skyColor, 0xffffff, options.skyColor); // Default: white.
    api.def(opts.groundColor, 0xffffff, options.groundColor); // Default: white.
    api.def(opts.intensity, 1, options.intensity); // Default: 1.
    api.def(opts.distance, 100, options.distance); // Default: 100.
    api.def(opts.angle, Math.PI / 3, options.angle); // Default: 100.

    switch (type) {
        case "ambient":
            scope.light = new this.threejs.AmbientLight(0xffffff);
            break;

        case "area":
            scope.light = new this.threejs.AreaLight(options.color, options.intensity);
            console.warn([this.light], "This light only works in the deferredrenderer");
            break;

        case "directional":
            scope.light = new this.threejs.DirectionalLight(options.color, options.intensity);
            scope.light.castShadow = true;
            scope.light.shadowDarkness = 0.5;
            break;

        case "hemisphere":
            scope.light = new this.threejs.HemisphereLight(options.skyColor, options.groundColor, options.intensity);
            break;

        case "light":
            scope.light = new this.threejs.Light(options.color);
            break;

        case "point":
            scope.light = new this.threejs.PointLight(options.color, options.intensity, options.distance);
            break;

        case "spot":
            scope.light = new this.threejs.SpotLight(options.color, options.intensity, options.distance, options.angle);
            scope.light.castShadow = true;

            // #FIXME:20 Shadow default parameters.
            scope.light.shadowMapWidth = 1024;
            scope.light.shadowMapHeight = 1024;

            scope.light.shadowCameraNear = 50;
            scope.light.shadowCameraFar = 4000;
            scope.light.shadowCameraFov = 30;
            break;
    }

    scope.light.position.set(scope.pos.x, scope.pos.y, scope.pos.z);

    if (scope.light.target)
        scope.light.target.position.set(scope.target.x, scope.target.y, scope.target.z);

    WHS.API.merge(this.scene, scope.light);

    return scope;
}



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

    var scope = {};

    //api.def(params.hex, 0x000000); //, this.hex);
    //api.def(params.near, 0.015); //, this.near);
    //api.def(params.far, 1000); //, this.far);
    //api.def(params.density, 0.00025); //, this.density);

    switch (type) {
        case "zoomBlurPass":
            scope.effect = new wagnerjs.ZoomBlurPass();
            scope.effect.params.strength = .05;
            scope.effect.params.center.set(.5 * this.composer.width, .5 * this.composer.height);
            this.composer.pass(scope.effect);
            break;

        case "multiPassBloomPass":
            scope.effect = new wagnerjs.MultiPassBloomPass();
            scope.effect.params.blurAmount = 1.32;
            scope.effect.params.strength = .5;
            scope.effect.params.applyZoomBlur = true;
            scope.effect.params.zoomBlurStrength = 0.84;
            scope.effect.params.useTexture = true;
            scope.effect.glowTexture = wagnerjs.Pass.prototype.getOfflineTexture(this.composer.width, this.composer.height, false);
            scope.effect.params.center.set(.5 * this.composer.width, .5 * this.composer.height);
            this.composer.pass(scope.effect);
            break;

        case "vignettePass":
            scope.effect = new wagnerjs.VignettePass();
            scope.effect.params.amount = 0.7;
            scope.effect.params.falloff = 0.2;
            this.composer.pass(scope.effect);
            break;

        case "directionalBlurPass":
            scope.effect = new wagnerjs.DirectionalBlurPass();
            scope.effect.params.delta = 0.1;
            this.composer.pass(scope.effect);
            break;

        case "motionBlurPass":
            scope.motionBlurEffect = new wagnerjs.DirectionalBlurPass();
            scope.motionBlurEnable = true;
            scope.motionBlurEffect.params.delta = 0;
            scope.effect = scope.motionBlurEffect;
            this.composer.pass(scope.effect);
            break;
    }

    //this.composer.eff.push(this.effect);
    this.composer.toScreen();

    scope.composer = this.composer;

    scope.apply = function() {
        this.composer.eff.push(scope.effect);
        return scope;
    }

    return scope;
}



/**
 * MAKEFIRSTPERSON.
 *
 * @param {Object} object *WHS* figure/object. (REQUIRED)
 */
WHS.init.prototype.MakeFirstPerson = function(object, plc, jqselector) {
    'use strict';


    // #TODO:40 Clean up.
    this.controls = new plc(this.camera, object.body, 10, this);

    var controls = this.controls;

    WHS.API.merge(this.scene, this.controls.getObject());

    this.rootElement.append('<div id="blocker">' +
        '   <center>' +
        '      <h1>PointerLock</h1>' +
        '   </center>' +
        '   <br>' +
        '   <p>(W,A,S,D = Move, SPACE = Jump, MOUSE = Look)</p>' +
        '</div>');

    var jqs = $(jqselector);

    jqs.css({
        'color': 'white',
        'background': 'rgba(0,0,0,0.5)',
        'text-align': 'center',
        'position': 'absolute',
        'width': '100%',
        'height': '100%',
        'left': 0,
        'top': 0
    });

    if ('pointerLockElement' in document ||
        'mozPointerLockElement' in document ||
        'webkitPointerLockElement' in document) {
        var element = document.body;

        this.pointerlockchange = function() {
            if (document.pointerLockElement === element ||
                document.mozPointerLockElement === element ||
                document.webkitPointerLockElement === element) {
                controls.enabled = true;
                jqs.css({
                    'display': 'none'
                });
            } else {
                controls.enabled = false;

                jqs.css({
                    'display': 'block'
                });
            }
        }
    }

    document.addEventListener('pointerlockchange', this.pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', this.pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', this.pointerlockchange, false);

    this.pointerlockerror = function() {
        console.warn("Pointer lock error.");
    }

    document.addEventListener('pointerlockerror', this.pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', this.pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', this.pointerlockerror, false);

    jqs.on('click', function() {
        element.requestPointerLock = element.requestPointerLock ||
            element.mozRequestPointerLock ||
            element.webkitRequestPointerLock;

        if (/Firefox/i.test(navigator.userAgent)) {
            var fullscreenchange = function() {
                if (document.fullscreenElement === element ||
                    document.mozFullscreenElement === element ||
                    document.mozFullScreenElement === element) {
                    document.removeEventListener('fullscreenchange', fullscreenchange);
                    document.removeEventListener('mozfullscreenchange', fullscreenchange);
                    element.requestPointerLock();
                }
            }

            document.addEventListener('fullscreenchange', fullscreenchange, false);
            document.addEventListener('mozfullscreenchange', fullscreenchange, false);

            element.requestFullscreen = element.requestFullscreen ||
                element.mozRequestFullscreen ||
                element.mozRequestFullScreen ||
                element.webkitRequestFullscreen;

            element.requestFullscreen();
        } else
            element.requestPointerLock();
    });
}



/**
 * ORBITCONTROLS.
 *
 * @param {Object} object Description. (OPTIONAL)
 */
WHS.init.prototype.OrbitControls = function(object) {
    // #TODO:170 add use for object.
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
}