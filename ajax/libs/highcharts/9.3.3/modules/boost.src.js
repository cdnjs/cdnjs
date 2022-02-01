/**
 * @license Highcharts JS v9.3.3 (2022-02-01)
 *
 * Boost module
 *
 * (c) 2010-2021 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 *
 * */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/boost', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'Extensions/Boost/Boostables.js', [], function () {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        // These are the series we allow boosting for.
        var boostables = [
                'area',
                'arearange',
                'column',
                'columnrange',
                'bar',
                'line',
                'scatter',
                'heatmap',
                'bubble',
                'treemap'
            ];

        return boostables;
    });
    _registerModule(_modules, 'Extensions/Boost/BoostableMap.js', [_modules['Extensions/Boost/Boostables.js']], function (boostables) {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        // These are the series we allow boosting for.
        var boostableMap = {};
        boostables.forEach(function (item) {
            boostableMap[item] = 1;
        });

        return boostableMap;
    });
    _registerModule(_modules, 'Extensions/Boost/WGLShader.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var clamp = U.clamp,
            error = U.error,
            pick = U.pick;
        /* eslint-disable valid-jsdoc */
        /**
         * A static shader mimicing axis translation functions found in Core/Axis
         *
         * @private
         * @function GLShader
         *
         * @param {WebGLContext} gl
         * the context in which the shader is active
         */
        function GLShader(gl) {
            var vertShade = [
                    /* eslint-disable max-len, @typescript-eslint/indent */
                    '#version 100',
                    '#define LN10 2.302585092994046',
                    'precision highp float;',
                    'attribute vec4 aVertexPosition;',
                    'attribute vec4 aColor;',
                    'varying highp vec2 position;',
                    'varying highp vec4 vColor;',
                    'uniform mat4 uPMatrix;',
                    'uniform float pSize;',
                    'uniform float translatedThreshold;',
                    'uniform bool hasThreshold;',
                    'uniform bool skipTranslation;',
                    'uniform float xAxisTrans;',
                    'uniform float xAxisMin;',
                    'uniform float xAxisMinPad;',
                    'uniform float xAxisPointRange;',
                    'uniform float xAxisLen;',
                    'uniform bool  xAxisPostTranslate;',
                    'uniform float xAxisOrdinalSlope;',
                    'uniform float xAxisOrdinalOffset;',
                    'uniform float xAxisPos;',
                    'uniform bool  xAxisCVSCoord;',
                    'uniform bool  xAxisIsLog;',
                    'uniform bool  xAxisReversed;',
                    'uniform float yAxisTrans;',
                    'uniform float yAxisMin;',
                    'uniform float yAxisMinPad;',
                    'uniform float yAxisPointRange;',
                    'uniform float yAxisLen;',
                    'uniform bool  yAxisPostTranslate;',
                    'uniform float yAxisOrdinalSlope;',
                    'uniform float yAxisOrdinalOffset;',
                    'uniform float yAxisPos;',
                    'uniform bool  yAxisCVSCoord;',
                    'uniform bool  yAxisIsLog;',
                    'uniform bool  yAxisReversed;',
                    'uniform bool  isBubble;',
                    'uniform bool  bubbleSizeByArea;',
                    'uniform float bubbleZMin;',
                    'uniform float bubbleZMax;',
                    'uniform float bubbleZThreshold;',
                    'uniform float bubbleMinSize;',
                    'uniform float bubbleMaxSize;',
                    'uniform bool  bubbleSizeAbs;',
                    'uniform bool  isInverted;',
                    'float bubbleRadius(){',
                    'float value = aVertexPosition.w;',
                    'float zMax = bubbleZMax;',
                    'float zMin = bubbleZMin;',
                    'float radius = 0.0;',
                    'float pos = 0.0;',
                    'float zRange = zMax - zMin;',
                    'if (bubbleSizeAbs){',
                    'value = value - bubbleZThreshold;',
                    'zMax = max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);',
                    'zMin = 0.0;',
                    '}',
                    'if (value < zMin){',
                    'radius = bubbleZMin / 2.0 - 1.0;',
                    '} else {',
                    'pos = zRange > 0.0 ? (value - zMin) / zRange : 0.5;',
                    'if (bubbleSizeByArea && pos > 0.0){',
                    'pos = sqrt(pos);',
                    '}',
                    'radius = ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;',
                    '}',
                    'return radius * 2.0;',
                    '}',
                    'float translate(float val,',
                    'float pointPlacement,',
                    'float localA,',
                    'float localMin,',
                    'float minPixelPadding,',
                    'float pointRange,',
                    'float len,',
                    'bool  cvsCoord,',
                    'bool  isLog,',
                    'bool  reversed',
                    '){',
                    'float sign = 1.0;',
                    'float cvsOffset = 0.0;',
                    'if (cvsCoord) {',
                    'sign *= -1.0;',
                    'cvsOffset = len;',
                    '}',
                    'if (isLog) {',
                    'val = log(val) / LN10;',
                    '}',
                    'if (reversed) {',
                    'sign *= -1.0;',
                    'cvsOffset -= sign * len;',
                    '}',
                    'return sign * (val - localMin) * localA + cvsOffset + ',
                    '(sign * minPixelPadding);',
                    '}',
                    'float xToPixels(float value) {',
                    'if (skipTranslation){',
                    'return value;// + xAxisPos;',
                    '}',
                    'return translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord, xAxisIsLog, xAxisReversed);// + xAxisPos;',
                    '}',
                    'float yToPixels(float value, float checkTreshold) {',
                    'float v;',
                    'if (skipTranslation){',
                    'v = value;// + yAxisPos;',
                    '} else {',
                    'v = translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord, yAxisIsLog, yAxisReversed);// + yAxisPos;',
                    'if (v > yAxisLen) {',
                    'v = yAxisLen;',
                    '}',
                    '}',
                    'if (checkTreshold > 0.0 && hasThreshold) {',
                    'v = min(v, translatedThreshold);',
                    '}',
                    'return v;',
                    '}',
                    'void main(void) {',
                    'if (isBubble){',
                    'gl_PointSize = bubbleRadius();',
                    '} else {',
                    'gl_PointSize = pSize;',
                    '}',
                    // 'gl_PointSize = 10.0;',
                    'vColor = aColor;',
                    'if (skipTranslation && isInverted) {',
                    // If we get translated values from JS, just swap them (x, y)
                    'gl_Position = uPMatrix * vec4(aVertexPosition.y + yAxisPos, aVertexPosition.x + xAxisPos, 0.0, 1.0);',
                    '} else if (isInverted) {',
                    // But when calculating pixel positions directly,
                    // swap axes and values (x, y)
                    'gl_Position = uPMatrix * vec4(yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, xToPixels(aVertexPosition.x) + xAxisPos, 0.0, 1.0);',
                    '} else {',
                    'gl_Position = uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);',
                    '}',
                    // 'gl_Position = uPMatrix * vec4(aVertexPosition.x, aVertexPosition.y, 0.0, 1.0);',
                    '}'
                    /* eslint-enable max-len, @typescript-eslint/indent */
                ].join('\n'), 
                // Fragment shader source
                fragShade = [
                    /* eslint-disable max-len, @typescript-eslint/indent */
                    'precision highp float;',
                    'uniform vec4 fillColor;',
                    'varying highp vec2 position;',
                    'varying highp vec4 vColor;',
                    'uniform sampler2D uSampler;',
                    'uniform bool isCircle;',
                    'uniform bool hasColor;',
                    // 'vec4 toColor(float value, vec2 point) {',
                    //     'return vec4(0.0, 0.0, 0.0, 0.0);',
                    // '}',
                    'void main(void) {',
                    'vec4 col = fillColor;',
                    'vec4 tcol = texture2D(uSampler, gl_PointCoord.st);',
                    'if (hasColor) {',
                    'col = vColor;',
                    '}',
                    'if (isCircle) {',
                    'col *= tcol;',
                    'if (tcol.r < 0.0) {',
                    'discard;',
                    '} else {',
                    'gl_FragColor = col;',
                    '}',
                    '} else {',
                    'gl_FragColor = col;',
                    '}',
                    '}'
                    /* eslint-enable max-len, @typescript-eslint/indent */
                ].join('\n'), uLocations = {}, 
                // The shader program
                shaderProgram, 
                // Uniform handle to the perspective matrix
                pUniform, 
                // Uniform for point size
                psUniform, 
                // Uniform for fill color
                fillColorUniform, 
                // Uniform for isBubble
                isBubbleUniform, 
                // Uniform for bubble abs sizing
                bubbleSizeAbsUniform, bubbleSizeAreaUniform, 
                // Skip translation uniform
                skipTranslationUniform, 
                // Set to 1 if circle
                isCircleUniform, 
                // Uniform for invertion
                isInverted, 
                // Error stack
                errors = [], 
                // Texture uniform
                uSamplerUniform;
            /**
             * Handle errors accumulated in errors stack
             * @private
             */
            function handleErrors() {
                if (errors.length) {
                    error('[highcharts boost] shader error - ' + errors.join('\n'));
                }
            }
            /**
             * String to shader program
             * @private
             * @param {string} str
             * the program source
             * @param {string} type
             * the program type: either `vertex` or `fragment`
             */
            function stringToProgram(str, type) {
                var t = type === 'vertex' ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER,
                    shader = gl.createShader(t);
                gl.shaderSource(shader, str);
                gl.compileShader(shader);
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    errors.push('when compiling ' +
                        type +
                        ' shader:\n' +
                        gl.getShaderInfoLog(shader));
                    return false;
                }
                return shader;
            }
            /**
             * Create the shader.
             * Loads the shader program statically defined above
             * @private
             */
            function createShader() {
                var v = stringToProgram(vertShade, 'vertex'), f = stringToProgram(fragShade, 'fragment');
                if (!v || !f) {
                    shaderProgram = false;
                    handleErrors();
                    return false;
                }
                /**
                 * @private
                 */
                function uloc(n) {
                    return gl.getUniformLocation(shaderProgram, n);
                }
                shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, v);
                gl.attachShader(shaderProgram, f);
                gl.linkProgram(shaderProgram);
                if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                    errors.push(gl.getProgramInfoLog(shaderProgram));
                    handleErrors();
                    shaderProgram = false;
                    return false;
                }
                gl.useProgram(shaderProgram);
                gl.bindAttribLocation(shaderProgram, 0, 'aVertexPosition');
                pUniform = uloc('uPMatrix');
                psUniform = uloc('pSize');
                fillColorUniform = uloc('fillColor');
                isBubbleUniform = uloc('isBubble');
                bubbleSizeAbsUniform = uloc('bubbleSizeAbs');
                bubbleSizeAreaUniform = uloc('bubbleSizeByArea');
                uSamplerUniform = uloc('uSampler');
                skipTranslationUniform = uloc('skipTranslation');
                isCircleUniform = uloc('isCircle');
                isInverted = uloc('isInverted');
                return true;
            }
            /**
             * Destroy the shader
             * @private
             */
            function destroy() {
                if (gl && shaderProgram) {
                    gl.deleteProgram(shaderProgram);
                    shaderProgram = false;
                }
            }
            /**
             * Bind the shader.
             * This makes the shader the active one until another one is bound,
             * or until 0 is bound.
             * @private
             */
            function bind() {
                if (gl && shaderProgram) {
                    gl.useProgram(shaderProgram);
                }
            }
            /**
             * Set a uniform value.
             * This uses a hash map to cache uniform locations.
             * @private
             * @param name {string} - the name of the uniform to set
             * @param val {float} - the value to set
             */
            function setUniform(name, val) {
                if (gl && shaderProgram) {
                    var u = uLocations[name] = (uLocations[name] ||
                            gl.getUniformLocation(shaderProgram,
                        name));
                    gl.uniform1f(u, val);
                }
            }
            /**
             * Set the active texture
             * @private
             * @param texture
             * the texture
             */
            function setTexture(texture) {
                if (gl && shaderProgram) {
                    gl.uniform1i(uSamplerUniform, texture);
                }
            }
            /**
             * Set if inversion state
             * @private
             * @param {number} flag
             * is the state
             */
            function setInverted(flag) {
                if (gl && shaderProgram) {
                    gl.uniform1i(isInverted, flag);
                }
            }
            /**
             * Enable/disable circle drawing
             * @private
             */
            function setDrawAsCircle(flag) {
                if (gl && shaderProgram) {
                    gl.uniform1i(isCircleUniform, flag ? 1 : 0);
                }
            }
            /**
             * Flush
             * @private
             */
            function reset() {
                if (gl && shaderProgram) {
                    gl.uniform1i(isBubbleUniform, 0);
                    gl.uniform1i(isCircleUniform, 0);
                }
            }
            /**
             * Set bubble uniforms
             * @private
             * @param series {Highcharts.Series} - the series to use
             */
            function setBubbleUniforms(series, zCalcMin, zCalcMax) {
                var seriesOptions = series.options,
                    zMin = Number.MAX_VALUE,
                    zMax = -Number.MAX_VALUE;
                if (gl && shaderProgram && series.is('bubble')) {
                    var pxSizes = series.getPxExtremes();
                    zMin = pick(seriesOptions.zMin, clamp(zCalcMin, seriesOptions.displayNegative === false ?
                        seriesOptions.zThreshold : -Number.MAX_VALUE, zMin));
                    zMax = pick(seriesOptions.zMax, Math.max(zMax, zCalcMax));
                    gl.uniform1i(isBubbleUniform, 1);
                    gl.uniform1i(isCircleUniform, 1);
                    gl.uniform1i(bubbleSizeAreaUniform, (series.options.sizeBy !== 'width'));
                    gl.uniform1i(bubbleSizeAbsUniform, series.options
                        .sizeByAbsoluteValue);
                    setUniform('bubbleZMin', zMin);
                    setUniform('bubbleZMax', zMax);
                    setUniform('bubbleZThreshold', series.options.zThreshold);
                    setUniform('bubbleMinSize', pxSizes.minPxSize);
                    setUniform('bubbleMaxSize', pxSizes.maxPxSize);
                }
            }
            /**
             * Set the Color uniform.
             * @private
             * @param color {Array<float>} - an array with RGBA values
             */
            function setColor(color) {
                if (gl && shaderProgram) {
                    gl.uniform4f(fillColorUniform, color[0] / 255.0, color[1] / 255.0, color[2] / 255.0, color[3]);
                }
            }
            /**
             * Set skip translation
             * @private
             */
            function setSkipTranslation(flag) {
                if (gl && shaderProgram) {
                    gl.uniform1i(skipTranslationUniform, flag === true ? 1 : 0);
                }
            }
            /**
             * Set the perspective matrix
             * @private
             * @param m {Matrix4x4} - the matrix
             */
            function setPMatrix(m) {
                if (gl && shaderProgram) {
                    gl.uniformMatrix4fv(pUniform, false, m);
                }
            }
            /**
             * Set the point size.
             * @private
             * @param p {float} - point size
             */
            function setPointSize(p) {
                if (gl && shaderProgram) {
                    gl.uniform1f(psUniform, p);
                }
            }
            /**
             * Get the shader program handle
             * @private
             * @return {GLInt} - the handle for the program
             */
            function getProgram() {
                return shaderProgram;
            }
            if (gl) {
                if (!createShader()) {
                    return false;
                }
            }
            return {
                psUniform: function () {
                    return psUniform;
                },
                pUniform: function () {
                    return pUniform;
                },
                fillColorUniform: function () {
                    return fillColorUniform;
                },
                setBubbleUniforms: setBubbleUniforms,
                bind: bind,
                program: getProgram,
                create: createShader,
                setUniform: setUniform,
                setPMatrix: setPMatrix,
                setColor: setColor,
                setPointSize: setPointSize,
                setSkipTranslation: setSkipTranslation,
                setTexture: setTexture,
                setDrawAsCircle: setDrawAsCircle,
                reset: reset,
                setInverted: setInverted,
                destroy: destroy
            };
        }

        return GLShader;
    });
    _registerModule(_modules, 'Extensions/Boost/WGLVBuffer.js', [], function () {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint-disable valid-jsdoc */
        /**
         * Vertex Buffer abstraction.
         * A vertex buffer is a set of vertices which are passed to the GPU
         * in a single call.
         *
         * @private
         * @function GLVertexBuffer
         * @param {WebGLContext} gl
         * the context in which to create the buffer
         * @param {GLShader} shader
         * the shader to use
         */
        function GLVertexBuffer(gl, shader, dataComponents
        /* , type */
        ) {
            var buffer = false,
                vertAttribute = false,
                components = dataComponents || 2,
                preAllocated = false,
                iterator = 0, 
                // farray = false,
                data;
            // type = type || 'float';
            /**
             * @private
             */
            function destroy() {
                if (buffer) {
                    gl.deleteBuffer(buffer);
                    buffer = false;
                    vertAttribute = false;
                }
                iterator = 0;
                components = dataComponents || 2;
                data = [];
            }
            /**
             * Build the buffer
             * @private
             * @param dataIn {Array<float>} - a 0 padded array of indices
             * @param attrib {String} - the name of the Attribute to bind the buffer to
             * @param dataComponents {Integer} - the number of components per. indice
             */
            function build(dataIn, attrib, dataComponents) {
                var farray;
                data = dataIn || [];
                if ((!data || data.length === 0) && !preAllocated) {
                    // console.error('trying to render empty vbuffer');
                    destroy();
                    return false;
                }
                components = dataComponents || components;
                if (buffer) {
                    gl.deleteBuffer(buffer);
                }
                if (!preAllocated) {
                    farray = new Float32Array(data);
                }
                buffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, preAllocated || farray, gl.STATIC_DRAW);
                // gl.bindAttribLocation(shader.program(), 0, 'aVertexPosition');
                vertAttribute = gl.getAttribLocation(shader.program(), attrib);
                gl.enableVertexAttribArray(vertAttribute);
                // Trigger cleanup
                farray = false;
                return true;
            }
            /**
             * Bind the buffer
             * @private
             */
            function bind() {
                if (!buffer) {
                    return false;
                }
                // gl.bindAttribLocation(shader.program(), 0, 'aVertexPosition');
                // gl.enableVertexAttribArray(vertAttribute);
                // gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.vertexAttribPointer(vertAttribute, components, gl.FLOAT, false, 0, 0);
                // gl.enableVertexAttribArray(vertAttribute);
            }
            /**
             * Render the buffer
             * @private
             * @param from {Integer} - the start indice
             * @param to {Integer} - the end indice
             * @param drawMode {String} - the draw mode
             */
            function render(from, to, drawMode) {
                var length = preAllocated ?
                        preAllocated.length : data.length;
                if (!buffer) {
                    return false;
                }
                if (!length) {
                    return false;
                }
                if (!from || from > length || from < 0) {
                    from = 0;
                }
                if (!to || to > length) {
                    to = length;
                }
                if (from >= to) {
                    return false;
                }
                drawMode = drawMode || 'points';
                gl.drawArrays(gl[drawMode.toUpperCase()], from / components, (to - from) / components);
                return true;
            }
            /**
             * @private
             */
            function push(x, y, a, b) {
                if (preAllocated) { // && iterator <= preAllocated.length - 4) {
                    preAllocated[++iterator] = x;
                    preAllocated[++iterator] = y;
                    preAllocated[++iterator] = a;
                    preAllocated[++iterator] = b;
                }
            }
            /**
             * Note about pre-allocated buffers:
             *     - This is slower for charts with many series
             * @private
             */
            function allocate(size) {
                size *= 4;
                iterator = -1;
                preAllocated = new Float32Array(size);
            }
            // /////////////////////////////////////////////////////////////////////////
            return {
                destroy: destroy,
                bind: bind,
                data: data,
                build: build,
                render: render,
                allocate: allocate,
                push: push
            };
        }

        return GLVertexBuffer;
    });
    _registerModule(_modules, 'Extensions/Boost/WGLRenderer.js', [_modules['Core/Color/Color.js'], _modules['Extensions/Boost/WGLShader.js'], _modules['Extensions/Boost/WGLVBuffer.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Color, GLShader, GLVertexBuffer, H, U) {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var doc = H.doc;
        var isNumber = U.isNumber,
            isObject = U.isObject,
            merge = U.merge,
            objectEach = U.objectEach,
            pick = U.pick;
        /* eslint-disable valid-jsdoc */
        /**
         * Main renderer. Used to render series.
         *
         * Notes to self:
         * - May be able to build a point map by rendering to a separate canvas and
         *   encoding values in the color data.
         * - Need to figure out a way to transform the data quicker
         *
         * @private
         * @function GLRenderer
         */
        function GLRenderer(postRenderCallback) {
            //  // Shader
            var shader = false, 
                // Vertex buffers - keyed on shader attribute name
                vbuffer = false,
                vlen = 0, 
                // Opengl context
                gl = false, 
                // Width of our viewport in pixels
                width = 0, 
                // Height of our viewport in pixels
                height = 0, 
                // The data to render - array of coordinates
                data = false, 
                // The marker data
                markerData = false, 
                // Exports
                exports = {}, 
                // Is it inited?
                isInited = false, 
                // The series stack
                series = [], 
                // Texture handles
                textureHandles = {}, 
                // Things to draw as "rectangles" (i.e lines)
                asBar = {
                    'column': true,
                    'columnrange': true,
                    'bar': true,
                    'area': true,
                    'arearange': true
                },
                asCircle = {
                    'scatter': true,
                    'bubble': true
                }, 
                // Render settings
                settings = {
                    pointSize: 1,
                    lineWidth: 1,
                    fillColor: '#AA00AA',
                    useAlpha: true,
                    usePreallocated: false,
                    useGPUTranslations: false,
                    debug: {
                        timeRendering: false,
                        timeSeriesProcessing: false,
                        timeSetup: false,
                        timeBufferCopy: false,
                        timeKDTree: false,
                        showSkipSummary: false
                    }
                };
            // /////////////////////////////////////////////////////////////////////////
            /**
             * @private
             */
            function setOptions(options) {
                merge(true, settings, options);
            }
            /**
             * @private
             */
            function seriesPointCount(series) {
                var isStacked,
                    xData,
                    s;
                if (series.isSeriesBoosting) {
                    isStacked = !!series.options.stacking;
                    xData = (series.xData ||
                        series.options.xData ||
                        series.processedXData);
                    s = (isStacked ? series.data : (xData || series.options.data))
                        .length;
                    if (series.type === 'treemap') {
                        s *= 12;
                    }
                    else if (series.type === 'heatmap') {
                        s *= 6;
                    }
                    else if (asBar[series.type]) {
                        s *= 2;
                    }
                    return s;
                }
                return 0;
            }
            /**
             * Allocate a float buffer to fit all series
             * @private
             */
            function allocateBuffer(chart) {
                var s = 0;
                if (!settings.usePreallocated) {
                    return;
                }
                chart.series.forEach(function (series) {
                    if (series.isSeriesBoosting) {
                        s += seriesPointCount(series);
                    }
                });
                vbuffer.allocate(s);
            }
            /**
             * @private
             */
            function allocateBufferForSingleSeries(series) {
                var s = 0;
                if (!settings.usePreallocated) {
                    return;
                }
                if (series.isSeriesBoosting) {
                    s = seriesPointCount(series);
                }
                vbuffer.allocate(s);
            }
            /**
             * Returns an orthographic perspective matrix
             * @private
             * @param {number} width
             * the width of the viewport in pixels
             * @param {number} height
             * the height of the viewport in pixels
             */
            function orthoMatrix(width, height) {
                var near = 0,
                    far = 1;
                return [
                    2 / width, 0, 0, 0,
                    0, -(2 / height), 0, 0,
                    0, 0, -2 / (far - near), 0,
                    -1, 1, -(far + near) / (far - near), 1
                ];
            }
            /**
             * Clear the depth and color buffer
             * @private
             */
            function clear() {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            }
            /**
             * Get the WebGL context
             * @private
             * @return {WebGLContext}
             * the context
             */
            function getGL() {
                return gl;
            }
            /**
             * Push data for a single series
             * This calculates additional vertices and transforms the data to be
             * aligned correctly in memory
             * @private
             */
            function pushSeriesData(series, inst) {
                var isRange = (series.pointArrayMap &&
                        series.pointArrayMap.join(',') === 'low,high'), chart = series.chart, options = series.options, isStacked = !!options.stacking, rawData = options.data, xExtremes = series.xAxis.getExtremes(), xMin = xExtremes.min, xMax = xExtremes.max, yExtremes = series.yAxis.getExtremes(), yMin = yExtremes.min, yMax = yExtremes.max, xData = series.xData || options.xData || series.processedXData, yData = series.yData || options.yData || series.processedYData, zData = (series.zData || options.zData ||
                        series.processedZData), yAxis = series.yAxis, xAxis = series.xAxis, 
                    // plotHeight = series.chart.plotHeight,
                    plotWidth = series.chart.plotWidth, useRaw = !xData || xData.length === 0, 
                    // threshold = options.threshold,
                    // yBottom = chart.yAxis[0].getThreshold(threshold),
                    // hasThreshold = isNumber(threshold),
                    // colorByPoint = series.options.colorByPoint,
                    // This is required for color by point, so make sure this is
                    // uncommented if enabling that
                    // colorIndex = 0,
                    // Required for color axis support
                    // caxis,
                    connectNulls = options.connectNulls, 
                    // For some reason eslint/TypeScript don't pick up that this is
                    // actually used: --- bre1470: it is never read, just set
                    // maxVal: (number|undefined), // eslint-disable-line no-unused-vars
                    points = series.points || false, lastX = false, lastY = false, minVal, scolor, sdata = isStacked ? series.data : (xData || rawData), closestLeft = { x: Number.MAX_VALUE, y: 0 }, closestRight = { x: -Number.MAX_VALUE, y: 0 }, 
                    //
                    skipped = 0, hadPoints = false, 
                    //
                    cullXThreshold = 1, cullYThreshold = 1, 
                    // The following are used in the builder while loop
                    x, y, d, z, i = -1, px = false, nx = false, low, chartDestroyed = typeof chart.index === 'undefined', nextInside = false, prevInside = false, pcolor = false, drawAsBar = asBar[series.type], isXInside = false, isYInside = true, firstPoint = true, zoneAxis = options.zoneAxis || 'y', zones = options.zones || false, zoneColors, zoneDefColor = false, threshold = options.threshold, gapSize = false;
                if (options.boostData && options.boostData.length > 0) {
                    return;
                }
                if (options.gapSize) {
                    gapSize = options.gapUnit !== 'value' ?
                        options.gapSize * series.closestPointRange :
                        options.gapSize;
                }
                if (zones) {
                    zoneColors = [];
                    zones.forEach(function (zone, i) {
                        if (zone.color) {
                            var zoneColor = color(zone.color).rgba;
                            zoneColor[0] /= 255.0;
                            zoneColor[1] /= 255.0;
                            zoneColor[2] /= 255.0;
                            zoneColors[i] = zoneColor;
                            if (!zoneDefColor && typeof zone.value === 'undefined') {
                                zoneDefColor = zoneColor;
                            }
                        }
                    });
                    if (!zoneDefColor) {
                        var seriesColor = ((series.pointAttribs && series.pointAttribs().fill) ||
                                series.color);
                        zoneDefColor = color(seriesColor).rgba;
                        zoneDefColor[0] /= 255.0;
                        zoneDefColor[1] /= 255.0;
                        zoneDefColor[2] /= 255.0;
                    }
                }
                if (chart.inverted) {
                    // plotHeight = series.chart.plotWidth;
                    plotWidth = series.chart.plotHeight;
                }
                series.closestPointRangePx = Number.MAX_VALUE;
                /**
                 * Push color to color buffer - need to do this per vertex.
                 * @private
                 */
                function pushColor(color) {
                    if (color) {
                        inst.colorData.push(color[0]);
                        inst.colorData.push(color[1]);
                        inst.colorData.push(color[2]);
                        inst.colorData.push(color[3]);
                    }
                }
                /**
                 * Push a vertice to the data buffer.
                 * @private
                 */
                function vertice(x, y, checkTreshold, pointSize, color) {
                    pushColor(color);
                    if (settings.usePreallocated) {
                        vbuffer.push(x, y, checkTreshold ? 1 : 0, pointSize || 1);
                        vlen += 4;
                    }
                    else {
                        data.push(x);
                        data.push(y);
                        data.push(checkTreshold ? 1 : 0);
                        data.push(pointSize || 1);
                    }
                }
                /**
                 * @private
                 */
                function closeSegment() {
                    if (inst.segments.length) {
                        inst.segments[inst.segments.length - 1].to = data.length || vlen;
                    }
                }
                /**
                 * Create a new segment for the current set.
                 * @private
                 */
                function beginSegment() {
                    // Insert a segment on the series.
                    // A segment is just a start indice.
                    // When adding a segment, if one exists from before, it should
                    // set the previous segment's end
                    if (inst.segments.length &&
                        inst.segments[inst.segments.length - 1].from === (data.length || vlen)) {
                        return;
                    }
                    closeSegment();
                    inst.segments.push({
                        from: data.length || vlen
                    });
                }
                /**
                 * Push a rectangle to the data buffer.
                 * @private
                 */
                function pushRect(x, y, w, h, color) {
                    pushColor(color);
                    vertice(x + w, y);
                    pushColor(color);
                    vertice(x, y);
                    pushColor(color);
                    vertice(x, y + h);
                    pushColor(color);
                    vertice(x, y + h);
                    pushColor(color);
                    vertice(x + w, y + h);
                    pushColor(color);
                    vertice(x + w, y);
                }
                // Create the first segment
                beginSegment();
                // Special case for point shapes
                if (points && points.length > 0) {
                    // If we're doing points, we assume that the points are already
                    // translated, so we skip the shader translation.
                    inst.skipTranslation = true;
                    // Force triangle draw mode
                    inst.drawMode = 'triangles';
                    // We don't have a z component in the shader, so we need to sort.
                    if (points[0].node && points[0].node.levelDynamic) {
                        points.sort(function (a, b) {
                            if (a.node) {
                                if (a.node.levelDynamic >
                                    b.node.levelDynamic) {
                                    return 1;
                                }
                                if (a.node.levelDynamic <
                                    b.node.levelDynamic) {
                                    return -1;
                                }
                            }
                            return 0;
                        });
                    }
                    points.forEach(function (point) {
                        var plotY = point.plotY,
                            swidth,
                            pointAttr;
                        if (typeof plotY !== 'undefined' &&
                            !isNaN(plotY) &&
                            point.y !== null &&
                            point.shapeArgs) {
                            var _a = point.shapeArgs,
                                _b = _a.x,
                                x_1 = _b === void 0 ? 0 : _b,
                                _c = _a.y,
                                y_1 = _c === void 0 ? 0 : _c,
                                _d = _a.width,
                                width_1 = _d === void 0 ? 0 : _d,
                                _e = _a.height,
                                height_1 = _e === void 0 ? 0 : _e;
                            pointAttr = chart.styledMode ?
                                point.series
                                    .colorAttribs(point) :
                                pointAttr = point.series.pointAttribs(point);
                            swidth = pointAttr['stroke-width'] || 0;
                            // Handle point colors
                            pcolor = color(pointAttr.fill).rgba;
                            pcolor[0] /= 255.0;
                            pcolor[1] /= 255.0;
                            pcolor[2] /= 255.0;
                            // So there are two ways of doing this. Either we can
                            // create a rectangle of two triangles, or we can do a
                            // point and use point size. Latter is faster, but
                            // only supports squares. So we're doing triangles.
                            // We could also use one color per. vertice to get
                            // better color interpolation.
                            // If there's stroking, we do an additional rect
                            if (series.type === 'treemap') {
                                swidth = swidth || 1;
                                scolor = color(pointAttr.stroke).rgba;
                                scolor[0] /= 255.0;
                                scolor[1] /= 255.0;
                                scolor[2] /= 255.0;
                                pushRect(x_1, y_1, width_1, height_1, scolor);
                                swidth /= 2;
                            }
                            // } else {
                            //     swidth = 0;
                            // }
                            // Fixes issues with inverted heatmaps (see #6981)
                            // The root cause is that the coordinate system is flipped.
                            // In other words, instead of [0,0] being top-left, it's
                            // bottom-right. This causes a vertical and horizontal flip
                            // in the resulting image, making it rotated 180 degrees.
                            if (series.type === 'heatmap' && chart.inverted) {
                                x_1 = xAxis.len - x_1;
                                y_1 = yAxis.len - y_1;
                                width_1 = -width_1;
                                height_1 = -height_1;
                            }
                            pushRect(x_1 + swidth, y_1 + swidth, width_1 - (swidth * 2), height_1 - (swidth * 2), pcolor);
                        }
                    });
                    closeSegment();
                    return;
                }
                var _loop_1 = function () {
                        d = sdata[++i];
                    if (typeof d === 'undefined') {
                        return "continue";
                    }
                    // px = x = y = z = nx = low = false;
                    // chartDestroyed = typeof chart.index === 'undefined';
                    // nextInside = prevInside = pcolor = isXInside = isYInside = false;
                    // drawAsBar = asBar[series.type];
                    if (chartDestroyed) {
                        return "break";
                    }
                    // Uncomment this to enable color by point.
                    // This currently left disabled as the charts look really ugly
                    // when enabled and there's a lot of points.
                    // Leaving in for the future (tm).
                    // if (colorByPoint) {
                    //     colorIndex = ++colorIndex %
                    //         series.chart.options.colors.length;
                    //     pcolor = toRGBAFast(series.chart.options.colors[colorIndex]);
                    //     pcolor[0] /= 255.0;
                    //     pcolor[1] /= 255.0;
                    //     pcolor[2] /= 255.0;
                    // }
                    // Handle the point.color option (#5999)
                    var pointOptions = rawData && rawData[i];
                    if (!useRaw && isObject(pointOptions, true)) {
                        if (pointOptions.color) {
                            pcolor = color(pointOptions.color).rgba;
                            pcolor[0] /= 255.0;
                            pcolor[1] /= 255.0;
                            pcolor[2] /= 255.0;
                        }
                    }
                    if (useRaw) {
                        x = d[0];
                        y = d[1];
                        if (sdata[i + 1]) {
                            nx = sdata[i + 1][0];
                        }
                        if (sdata[i - 1]) {
                            px = sdata[i - 1][0];
                        }
                        if (d.length >= 3) {
                            z = d[2];
                            if (d[2] > inst.zMax) {
                                inst.zMax = d[2];
                            }
                            if (d[2] < inst.zMin) {
                                inst.zMin = d[2];
                            }
                        }
                    }
                    else {
                        x = d;
                        y = yData[i];
                        if (sdata[i + 1]) {
                            nx = sdata[i + 1];
                        }
                        if (sdata[i - 1]) {
                            px = sdata[i - 1];
                        }
                        if (zData && zData.length) {
                            z = zData[i];
                            if (zData[i] > inst.zMax) {
                                inst.zMax = zData[i];
                            }
                            if (zData[i] < inst.zMin) {
                                inst.zMin = zData[i];
                            }
                        }
                    }
                    if (!connectNulls && (x === null || y === null)) {
                        beginSegment();
                        return "continue";
                    }
                    if (nx && nx >= xMin && nx <= xMax) {
                        nextInside = true;
                    }
                    if (px && px >= xMin && px <= xMax) {
                        prevInside = true;
                    }
                    if (isRange) {
                        if (useRaw) {
                            y = d.slice(1, 3);
                        }
                        low = y[0];
                        y = y[1];
                    }
                    else if (isStacked) {
                        x = d.x;
                        y = d.stackY;
                        low = y - d.y;
                    }
                    if (yMin !== null &&
                        typeof yMin !== 'undefined' &&
                        yMax !== null &&
                        typeof yMax !== 'undefined') {
                        isYInside = y >= yMin && y <= yMax;
                    }
                    if (x > xMax && closestRight.x < xMax) {
                        closestRight.x = x;
                        closestRight.y = y;
                    }
                    if (x < xMin && closestLeft.x > xMin) {
                        closestLeft.x = x;
                        closestLeft.y = y;
                    }
                    if (y === null && connectNulls) {
                        return "continue";
                    }
                    // Cull points outside the extremes
                    if (y === null || (!isYInside && !nextInside && !prevInside)) {
                        beginSegment();
                        return "continue";
                    }
                    // The first point before and first after extremes should be
                    // rendered (#9962)
                    if ((nx >= xMin || x >= xMin) &&
                        (px <= xMax || x <= xMax)) {
                        isXInside = true;
                    }
                    if (!isXInside && !nextInside && !prevInside) {
                        return "continue";
                    }
                    if (gapSize && x - px > gapSize) {
                        beginSegment();
                    }
                    // Note: Boost requires that zones are sorted!
                    if (zones) {
                        var zoneColor_1;
                        zones.some(function (// eslint-disable-line no-loop-func
                        zone, i) {
                            var last = zones[i - 1];
                            if (zoneAxis === 'x') {
                                if (typeof zone.value !== 'undefined' &&
                                    x <= zone.value) {
                                    if (zoneColors[i] &&
                                        (!last || x >= last.value)) {
                                        zoneColor_1 = zoneColors[i];
                                    }
                                    return true;
                                }
                                return false;
                            }
                            if (typeof zone.value !== 'undefined' && y <= zone.value) {
                                if (zoneColors[i] &&
                                    (!last || y >= last.value)) {
                                    zoneColor_1 = zoneColors[i];
                                }
                                return true;
                            }
                            return false;
                        });
                        pcolor = zoneColor_1 || zoneDefColor || pcolor;
                    }
                    // Skip translations - temporary floating point fix
                    if (!settings.useGPUTranslations) {
                        inst.skipTranslation = true;
                        x = xAxis.toPixels(x, true);
                        y = yAxis.toPixels(y, true);
                        // Make sure we're not drawing outside of the chart area.
                        // See #6594. Update: this is no longer required as far as I
                        // can tell. Leaving in for git blame in case there are edge
                        // cases I've not found. Having this in breaks #10246.
                        // if (y > plotHeight) {
                        // y = plotHeight;
                        // }
                        if (x > plotWidth) {
                            // If this is  rendered as a point, just skip drawing it
                            // entirely, as we're not dependandt on lineTo'ing to it.
                            // See #8197
                            if (inst.drawMode === 'points') {
                                return "continue";
                            }
                            // Having this here will clamp markers and make the angle
                            // of the last line wrong. See 9166.
                            // x = plotWidth;
                        }
                    }
                    // No markers on out of bounds things.
                    // Out of bound things are shown if and only if the next
                    // or previous point is inside the rect.
                    if (inst.hasMarkers && isXInside) {
                        // x = Highcharts.correctFloat(
                        //     Math.min(Math.max(-1e5, xAxis.translate(
                        //         x,
                        //         0,
                        //         0,
                        //         0,
                        //         1,
                        //         0.5,
                        //         false
                        //     )), 1e5)
                        // );
                        if (lastX !== false) {
                            series.closestPointRangePx = Math.min(series.closestPointRangePx, Math.abs(x - lastX));
                        }
                    }
                    // If the last _drawn_ point is closer to this point than the
                    // threshold, skip it. Shaves off 20-100ms in processing.
                    if (!settings.useGPUTranslations &&
                        !settings.usePreallocated &&
                        (lastX && Math.abs(x - lastX) < cullXThreshold) &&
                        (lastY && Math.abs(y - lastY) < cullYThreshold)) {
                        if (settings.debug.showSkipSummary) {
                            ++skipped;
                        }
                        return "continue";
                    }
                    if (drawAsBar) {
                        // maxVal = y;
                        minVal = low;
                        if (low === false || typeof low === 'undefined') {
                            if (y < 0) {
                                minVal = y;
                            }
                            else {
                                minVal = 0;
                            }
                        }
                        if (!isRange && !isStacked) {
                            minVal = Math.max(threshold === null ? yMin : threshold, // #5268
                            yMin); // #8731
                        }
                        if (!settings.useGPUTranslations) {
                            minVal = yAxis.toPixels(minVal, true);
                        }
                        // Need to add an extra point here
                        vertice(x, minVal, 0, 0, pcolor);
                    }
                    // Do step line if enabled.
                    // Draws an additional point at the old Y at the new X.
                    // See #6976.
                    if (options.step && !firstPoint) {
                        vertice(x, lastY, 0, 2, pcolor);
                    }
                    vertice(x, y, 0, series.type === 'bubble' ? (z || 1) : 2, pcolor);
                    // Uncomment this to support color axis.
                    // if (caxis) {
                    //     pcolor = color(caxis.toColor(y)).rgba;
                    //     inst.colorData.push(color[0] / 255.0);
                    //     inst.colorData.push(color[1] / 255.0);
                    //     inst.colorData.push(color[2] / 255.0);
                    //     inst.colorData.push(color[3]);
                    // }
                    lastX = x;
                    lastY = y;
                    hadPoints = true;
                    firstPoint = false;
                };
                // Extract color axis
                // (chart.axes || []).forEach(function (a) {
                //     if (H.ColorAxis && a instanceof H.ColorAxis) {
                //         caxis = a;
                //     }
                // });
                while (i < sdata.length - 1) {
                    var state_1 = _loop_1();
                    if (state_1 === "break")
                        break;
                }
                if (settings.debug.showSkipSummary) {
                    console.log('skipped points:', skipped); // eslint-disable-line no-console
                }
                /**
                 * @private
                 */
                function pushSupplementPoint(point, atStart) {
                    if (!settings.useGPUTranslations) {
                        inst.skipTranslation = true;
                        point.x = xAxis.toPixels(point.x, true);
                        point.y = yAxis.toPixels(point.y, true);
                    }
                    // We should only do this for lines, and we should ignore markers
                    // since there's no point here that would have a marker.
                    if (atStart) {
                        data = [point.x, point.y, 0, 2].concat(data);
                        return;
                    }
                    vertice(point.x, point.y, 0, 2);
                }
                if (!hadPoints &&
                    connectNulls !== false &&
                    series.drawMode === 'line_strip') {
                    if (closestLeft.x < Number.MAX_VALUE) {
                        // We actually need to push this *before* the complete buffer.
                        pushSupplementPoint(closestLeft, true);
                    }
                    if (closestRight.x > -Number.MAX_VALUE) {
                        pushSupplementPoint(closestRight);
                    }
                }
                closeSegment();
            }
            /**
             * Push a series to the renderer
             * If we render the series immediatly, we don't have to loop later
             * @private
             * @param s {Highchart.Series} - the series to push
             */
            function pushSeries(s) {
                if (series.length > 0) {
                    // series[series.length - 1].to = data.length;
                    if (series[series.length - 1].hasMarkers) {
                        series[series.length - 1].markerTo = markerData.length;
                    }
                }
                if (settings.debug.timeSeriesProcessing) {
                    console.time('building ' + s.type + ' series'); // eslint-disable-line no-console
                }
                var obj = {
                        segments: [],
                        // from: data.length,
                        markerFrom: markerData.length,
                        // Push RGBA values to this array to use per. point coloring.
                        // It should be 0-padded, so each component should be pushed in
                        // succession.
                        colorData: [],
                        series: s,
                        zMin: Number.MAX_VALUE,
                        zMax: -Number.MAX_VALUE,
                        hasMarkers: s.options.marker ?
                            s.options.marker.enabled !== false :
                            false,
                        showMarkers: true,
                        drawMode: {
                            'area': 'lines',
                            'arearange': 'lines',
                            'areaspline': 'line_strip',
                            'column': 'lines',
                            'columnrange': 'lines',
                            'bar': 'lines',
                            'line': 'line_strip',
                            'scatter': 'points',
                            'heatmap': 'triangles',
                            'treemap': 'triangles',
                            'bubble': 'points'
                        }[s.type] || 'line_strip'
                    };
                if (s.index >= series.length) {
                    series.push(obj);
                }
                else {
                    series[s.index] = obj;
                }
                // Add the series data to our buffer(s)
                pushSeriesData(s, obj);
                if (settings.debug.timeSeriesProcessing) {
                    console.timeEnd('building ' + s.type + ' series'); // eslint-disable-line no-console
                }
            }
            /**
             * Flush the renderer.
             * This removes pushed series and vertices.
             * Should be called after clearing and before rendering
             * @private
             */
            function flush() {
                series = [];
                exports.data = data = [];
                markerData = [];
                if (vbuffer) {
                    vbuffer.destroy();
                }
            }
            /**
             * Pass x-axis to shader
             * @private
             * @param axis {Highcharts.Axis} - the x-axis
             */
            function setXAxis(axis) {
                if (!shader) {
                    return;
                }
                shader.setUniform('xAxisTrans', axis.transA);
                shader.setUniform('xAxisMin', axis.min);
                shader.setUniform('xAxisMinPad', axis.minPixelPadding);
                shader.setUniform('xAxisPointRange', axis.pointRange);
                shader.setUniform('xAxisLen', axis.len);
                shader.setUniform('xAxisPos', axis.pos);
                shader.setUniform('xAxisCVSCoord', (!axis.horiz));
                shader.setUniform('xAxisIsLog', (!!axis.logarithmic));
                shader.setUniform('xAxisReversed', (!!axis.reversed));
            }
            /**
             * Pass y-axis to shader
             * @private
             * @param axis {Highcharts.Axis} - the y-axis
             */
            function setYAxis(axis) {
                if (!shader) {
                    return;
                }
                shader.setUniform('yAxisTrans', axis.transA);
                shader.setUniform('yAxisMin', axis.min);
                shader.setUniform('yAxisMinPad', axis.minPixelPadding);
                shader.setUniform('yAxisPointRange', axis.pointRange);
                shader.setUniform('yAxisLen', axis.len);
                shader.setUniform('yAxisPos', axis.pos);
                shader.setUniform('yAxisCVSCoord', (!axis.horiz));
                shader.setUniform('yAxisIsLog', (!!axis.logarithmic));
                shader.setUniform('yAxisReversed', (!!axis.reversed));
            }
            /**
             * Set the translation threshold
             * @private
             * @param has {boolean} - has threshold flag
             * @param translation {Float} - the threshold
             */
            function setThreshold(has, translation) {
                shader.setUniform('hasThreshold', has);
                shader.setUniform('translatedThreshold', translation);
            }
            /**
             * Render the data
             * This renders all pushed series.
             * @private
             */
            function render(chart) {
                if (chart) {
                    if (!chart.chartHeight || !chart.chartWidth) {
                        // chart.setChartSize();
                    }
                    width = chart.chartWidth || 800;
                    height = chart.chartHeight || 400;
                }
                else {
                    return false;
                }
                if (!gl || !width || !height || !shader) {
                    return false;
                }
                if (settings.debug.timeRendering) {
                    console.time('gl rendering'); // eslint-disable-line no-console
                }
                gl.canvas.width = width;
                gl.canvas.height = height;
                shader.bind();
                gl.viewport(0, 0, width, height);
                shader.setPMatrix(orthoMatrix(width, height));
                if (settings.lineWidth > 1 && !H.isMS) {
                    gl.lineWidth(settings.lineWidth);
                }
                vbuffer.build(exports.data, 'aVertexPosition', 4);
                vbuffer.bind();
                shader.setInverted(chart.inverted);
                // Render the series
                series.forEach(function (s, si) {
                    var options = s.series.options,
                        shapeOptions = options.marker,
                        sindex,
                        lineWidth = (typeof options.lineWidth !== 'undefined' ?
                            options.lineWidth :
                            1),
                        threshold = options.threshold,
                        hasThreshold = isNumber(threshold),
                        yBottom = s.series.yAxis.getThreshold(threshold),
                        translatedThreshold = yBottom,
                        cbuffer,
                        showMarkers = pick(options.marker ? options.marker.enabled : null,
                        s.series.xAxis.isRadial ? true : null,
                        s.series.closestPointRangePx >
                            2 * ((options.marker ?
                                options.marker.radius :
                                10) || 10)),
                        fillColor,
                        shapeTexture = textureHandles[(shapeOptions && shapeOptions.symbol) ||
                            s.series.symbol] || textureHandles.circle,
                        scolor = [];
                    if (s.segments.length === 0 ||
                        s.segments[0].from === s.segments[0].to) {
                        return;
                    }
                    if (shapeTexture.isReady) {
                        gl.bindTexture(gl.TEXTURE_2D, shapeTexture.handle);
                        shader.setTexture(shapeTexture.handle);
                    }
                    if (chart.styledMode) {
                        fillColor = (s.series.markerGroup &&
                            s.series.markerGroup.getStyle('fill'));
                    }
                    else {
                        fillColor =
                            (s.drawMode === 'points' && // #14260
                                s.series.pointAttribs &&
                                s.series.pointAttribs().fill) ||
                                s.series.color;
                        if (options.colorByPoint) {
                            fillColor = s.series.chart.options.colors[si];
                        }
                    }
                    if (s.series.fillOpacity && options.fillOpacity) {
                        fillColor = new Color(fillColor).setOpacity(pick(options.fillOpacity, 1.0)).get();
                    }
                    scolor = color(fillColor).rgba;
                    if (!settings.useAlpha) {
                        scolor[3] = 1.0;
                    }
                    // This is very much temporary
                    if (s.drawMode === 'lines' &&
                        settings.useAlpha &&
                        scolor[3] < 1) {
                        scolor[3] /= 10;
                    }
                    // Blending
                    if (options.boostBlending === 'add') {
                        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                        gl.blendEquation(gl.FUNC_ADD);
                    }
                    else if (options.boostBlending === 'mult' ||
                        options.boostBlending === 'multiply') {
                        gl.blendFunc(gl.DST_COLOR, gl.ZERO);
                    }
                    else if (options.boostBlending === 'darken') {
                        gl.blendFunc(gl.ONE, gl.ONE);
                        gl.blendEquation(gl.FUNC_MIN);
                    }
                    else {
                        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                        // gl.blendEquation(gl.FUNC_ADD);
                        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                    }
                    shader.reset();
                    // If there are entries in the colorData buffer, build and bind it.
                    if (s.colorData.length > 0) {
                        shader.setUniform('hasColor', 1.0);
                        cbuffer = GLVertexBuffer(gl, shader); // eslint-disable-line new-cap
                        cbuffer.build(s.colorData, 'aColor', 4);
                        cbuffer.bind();
                    }
                    else {
                        // #15869, a buffer with fewer points might already be bound by
                        // a different series/chart causing out of range errors
                        gl.disableVertexAttribArray(gl.getAttribLocation(shader.program(), 'aColor'));
                    }
                    // Set series specific uniforms
                    shader.setColor(scolor);
                    setXAxis(s.series.xAxis);
                    setYAxis(s.series.yAxis);
                    setThreshold(hasThreshold, translatedThreshold);
                    if (s.drawMode === 'points') {
                        if (options.marker && isNumber(options.marker.radius)) {
                            shader.setPointSize(options.marker.radius * 2.0);
                        }
                        else {
                            shader.setPointSize(1);
                        }
                    }
                    // If set to true, the toPixels translations in the shader
                    // is skipped, i.e it's assumed that the value is a pixel coord.
                    shader.setSkipTranslation(s.skipTranslation);
                    if (s.series.type === 'bubble') {
                        shader.setBubbleUniforms(s.series, s.zMin, s.zMax);
                    }
                    shader.setDrawAsCircle(asCircle[s.series.type] || false);
                    // Do the actual rendering
                    // If the line width is < 0, skip rendering of the lines. See #7833.
                    if (lineWidth > 0 || s.drawMode !== 'line_strip') {
                        for (sindex = 0; sindex < s.segments.length; sindex++) {
                            vbuffer.render(s.segments[sindex].from, s.segments[sindex].to, s.drawMode);
                        }
                    }
                    if (s.hasMarkers && showMarkers) {
                        if (options.marker && isNumber(options.marker.radius)) {
                            shader.setPointSize(options.marker.radius * 2.0);
                        }
                        else {
                            shader.setPointSize(10);
                        }
                        shader.setDrawAsCircle(true);
                        for (sindex = 0; sindex < s.segments.length; sindex++) {
                            vbuffer.render(s.segments[sindex].from, s.segments[sindex].to, 'POINTS');
                        }
                    }
                });
                if (settings.debug.timeRendering) {
                    console.timeEnd('gl rendering'); // eslint-disable-line no-console
                }
                if (postRenderCallback) {
                    postRenderCallback();
                }
                flush();
            }
            /**
             * Render the data when ready
             * @private
             */
            function renderWhenReady(chart) {
                clear();
                if (chart.renderer.forExport) {
                    return render(chart);
                }
                if (isInited) {
                    render(chart);
                }
                else {
                    setTimeout(function () {
                        renderWhenReady(chart);
                    }, 1);
                }
            }
            /**
             * Set the viewport size in pixels
             * Creates an orthographic perspective matrix and applies it.
             * @private
             * @param w {Integer} - the width of the viewport
             * @param h {Integer} - the height of the viewport
             */
            function setSize(w, h) {
                // Skip if there's no change, or if we have no valid shader
                if ((width === w && height === h) || !shader) {
                    return;
                }
                width = w;
                height = h;
                shader.bind();
                shader.setPMatrix(orthoMatrix(width, height));
            }
            /**
             * Init OpenGL
             * @private
             * @param canvas {HTMLCanvas} - the canvas to render to
             */
            function init(canvas, noFlush) {
                var i = 0,
                    contexts = [
                        'webgl',
                        'experimental-webgl',
                        'moz-webgl',
                        'webkit-3d'
                    ];
                isInited = false;
                if (!canvas) {
                    return false;
                }
                if (settings.debug.timeSetup) {
                    console.time('gl setup'); // eslint-disable-line no-console
                }
                for (; i < contexts.length; i++) {
                    gl = canvas.getContext(contexts[i], {
                    //    premultipliedAlpha: false
                    });
                    if (gl) {
                        break;
                    }
                }
                if (gl) {
                    if (!noFlush) {
                        flush();
                    }
                }
                else {
                    return false;
                }
                gl.enable(gl.BLEND);
                // gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                gl.disable(gl.DEPTH_TEST);
                // gl.depthMask(gl.FALSE);
                gl.depthFunc(gl.LESS);
                shader = GLShader(gl); // eslint-disable-line new-cap
                if (!shader) {
                    // We need to abort, there's no shader context
                    return false;
                }
                vbuffer = GLVertexBuffer(gl, shader); // eslint-disable-line new-cap
                /**
                 * @private
                 */
                function createTexture(name, fn) {
                    var props = {
                            isReady: false,
                            texture: doc.createElement('canvas'),
                            handle: gl.createTexture()
                        },
                        ctx = props.texture.getContext('2d');
                    textureHandles[name] = props;
                    props.texture.width = 512;
                    props.texture.height = 512;
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;
                    ctx.imageSmoothingEnabled = false;
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0)';
                    ctx.fillStyle = '#FFF';
                    fn(ctx);
                    try {
                        gl.activeTexture(gl.TEXTURE0);
                        gl.bindTexture(gl.TEXTURE_2D, props.handle);
                        // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, props.texture);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        // gl.generateMipmap(gl.TEXTURE_2D);
                        gl.bindTexture(gl.TEXTURE_2D, null);
                        props.isReady = true;
                    }
                    catch (e) {
                        // silent error
                    }
                }
                // Circle shape
                createTexture('circle', function (ctx) {
                    ctx.beginPath();
                    ctx.arc(256, 256, 256, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.fill();
                });
                // Square shape
                createTexture('square', function (ctx) {
                    ctx.fillRect(0, 0, 512, 512);
                });
                // Diamond shape
                createTexture('diamond', function (ctx) {
                    ctx.beginPath();
                    ctx.moveTo(256, 0);
                    ctx.lineTo(512, 256);
                    ctx.lineTo(256, 512);
                    ctx.lineTo(0, 256);
                    ctx.lineTo(256, 0);
                    ctx.fill();
                });
                // Triangle shape
                createTexture('triangle', function (ctx) {
                    ctx.beginPath();
                    ctx.moveTo(0, 512);
                    ctx.lineTo(256, 0);
                    ctx.lineTo(512, 512);
                    ctx.lineTo(0, 512);
                    ctx.fill();
                });
                // Triangle shape (rotated)
                createTexture('triangle-down', function (ctx) {
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(256, 512);
                    ctx.lineTo(512, 0);
                    ctx.lineTo(0, 0);
                    ctx.fill();
                });
                isInited = true;
                if (settings.debug.timeSetup) {
                    console.timeEnd('gl setup'); // eslint-disable-line no-console
                }
                return true;
            }
            /**
             * Check if we have a valid OGL context
             * @private
             * @return {boolean}
             * true if the context is valid
             */
            function valid() {
                return gl !== false;
            }
            /**
             * Check if the renderer has been initialized
             * @private
             * @return {boolean}
             * true if it has, false if not
             */
            function inited() {
                return isInited;
            }
            /**
             * @private
             */
            function destroy() {
                flush();
                vbuffer.destroy();
                shader.destroy();
                if (gl) {
                    objectEach(textureHandles, function (texture) {
                        if (texture.handle) {
                            gl.deleteTexture(texture.handle);
                        }
                    });
                    gl.canvas.width = 1;
                    gl.canvas.height = 1;
                }
            }
            // /////////////////////////////////////////////////////////////////////////
            exports = {
                allocateBufferForSingleSeries: allocateBufferForSingleSeries,
                pushSeries: pushSeries,
                setSize: setSize,
                inited: inited,
                setThreshold: setThreshold,
                init: init,
                render: renderWhenReady,
                settings: settings,
                valid: valid,
                clear: clear,
                flush: flush,
                setXAxis: setXAxis,
                setYAxis: setYAxis,
                data: data,
                gl: getGL,
                allocateBuffer: allocateBuffer,
                destroy: destroy,
                setOptions: setOptions
            };
            return exports;
        }

        return GLRenderer;
    });
    _registerModule(_modules, 'Extensions/Boost/BoostAttach.js', [_modules['Core/Chart/Chart.js'], _modules['Extensions/Boost/WGLRenderer.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Chart, GLRenderer, H, U) {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.doc;
        var error = U.error;
        var mainCanvas;
        /**
         * Create a canvas + context and attach it to the target
         *
         * @private
         * @function createAndAttachRenderer
         *
         * @param {Highcharts.Chart} chart
         * the chart
         *
         * @param {Highcharts.Series} series
         * the series
         *
         * @return {Highcharts.BoostGLRenderer}
         * the canvas renderer
         */
        function createAndAttachRenderer(chart, series) {
            var width = chart.chartWidth, height = chart.chartHeight, target = chart, targetGroup = chart.seriesGroup || series.group, alpha = 1, foSupported = doc.implementation.hasFeature('www.http://w3.org/TR/SVG11/feature#Extensibility', '1.1');
            if (chart.isChartSeriesBoosting()) {
                target = chart;
            }
            else {
                target = series;
            }
            // Support for foreignObject is flimsy as best.
            // IE does not support it, and Chrome has a bug which messes up
            // the canvas draw order.
            // As such, we force the Image fallback for now, but leaving the
            // actual Canvas path in-place in case this changes in the future.
            foSupported = false;
            if (!mainCanvas) {
                mainCanvas = doc.createElement('canvas');
            }
            if (!target.renderTarget) {
                target.canvas = mainCanvas;
                // Fall back to image tag if foreignObject isn't supported,
                // or if we're exporting.
                if (chart.renderer.forExport || !foSupported) {
                    target.renderTarget = chart.renderer.image('', 0, 0, width, height)
                        .addClass('highcharts-boost-canvas')
                        .add(targetGroup);
                    target.boostClear = function () {
                        target.renderTarget.attr({ href: '' });
                    };
                    target.boostCopy = function () {
                        target.boostResizeTarget();
                        target.renderTarget.attr({
                            href: target.canvas.toDataURL('image/png')
                        });
                    };
                }
                else {
                    target.renderTargetFo = chart.renderer
                        .createElement('foreignObject')
                        .add(targetGroup);
                    target.renderTarget = doc.createElement('canvas');
                    target.renderTargetCtx =
                        target.renderTarget.getContext('2d');
                    target.renderTargetFo.element.appendChild(target.renderTarget);
                    target.boostClear = function () {
                        target.renderTarget.width =
                            target.canvas.width;
                        target.renderTarget.height =
                            target.canvas.height;
                    };
                    target.boostCopy = function () {
                        target.renderTarget.width =
                            target.canvas.width;
                        target.renderTarget.height =
                            target.canvas.height;
                        target.renderTargetCtx
                            .drawImage(target.canvas, 0, 0);
                    };
                }
                target.boostResizeTarget = function () {
                    width = chart.chartWidth;
                    height = chart.chartHeight;
                    (target.renderTargetFo || target.renderTarget)
                        .attr({
                        x: 0,
                        y: 0,
                        width: width,
                        height: height
                    })
                        .css({
                        pointerEvents: 'none',
                        mixedBlendMode: 'normal',
                        opacity: alpha
                    });
                    if (target instanceof Chart) {
                        target.markerGroup.translate(chart.plotLeft, chart.plotTop);
                    }
                };
                target.boostClipRect = chart.renderer.clipRect();
                (target.renderTargetFo || target.renderTarget)
                    .clip(target.boostClipRect);
                if (target instanceof Chart) {
                    target.markerGroup = target.renderer.g().add(targetGroup);
                    target.markerGroup.translate(series.xAxis.pos, series.yAxis.pos);
                }
            }
            target.canvas.width = width;
            target.canvas.height = height;
            target.boostClipRect.attr(chart.getBoostClipRect(target));
            target.boostResizeTarget();
            target.boostClear();
            if (!target.ogl) {
                target.ogl = GLRenderer(function () {
                    if (target.ogl.settings.debug.timeBufferCopy) {
                        console.time('buffer copy'); // eslint-disable-line no-console
                    }
                    target.boostCopy();
                    if (target.ogl.settings.debug.timeBufferCopy) {
                        console.timeEnd('buffer copy'); // eslint-disable-line no-console
                    }
                });
                if (!target.ogl.init(target.canvas)) {
                    // The OGL renderer couldn't be inited.
                    // This likely means a shader error as we wouldn't get to this point
                    // if there was no WebGL support.
                    error('[highcharts boost] - unable to init WebGL renderer');
                }
                // target.ogl.clear();
                target.ogl.setOptions(chart.options.boost || {});
                if (target instanceof Chart) {
                    target.ogl.allocateBuffer(chart);
                }
            }
            target.ogl.setSize(width, height);
            return target.ogl;
        }

        return createAndAttachRenderer;
    });
    _registerModule(_modules, 'Extensions/Boost/BoostUtils.js', [_modules['Core/Globals.js'], _modules['Extensions/Boost/BoostableMap.js'], _modules['Extensions/Boost/BoostAttach.js'], _modules['Core/Utilities.js']], function (H, boostableMap, createAndAttachRenderer, U) {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  This files contains generic utility functions used by the boost module.
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var win = H.win,
            doc = H.doc;
        var pick = U.pick;
        // This should be a const.
        var CHUNK_SIZE = 3000;
        /**
         * Tolerant max() function.
         *
         * @private
         * @function patientMax
         *
         * @param {...Array<Array<unknown>>} args
         * Max arguments
         *
         * @return {number}
         * Max value
         */
        function patientMax() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var r = -Number.MAX_VALUE;
            args.forEach(function (t) {
                if (typeof t !== 'undefined' &&
                    t !== null &&
                    typeof t.length !== 'undefined') {
                    // r = r < t.length ? t.length : r;
                    if (t.length > 0) {
                        r = t.length;
                        return true;
                    }
                }
            });
            return r;
        }
        /**
         * Return true if ths boost.enabled option is true
         *
         * @private
         * @function boostEnabled
         *
         * @param {Highcharts.Chart} chart
         * The chart
         *
         * @return {boolean}
         * True, if boost is enabled.
         */
        function boostEnabled(chart) {
            return pick((chart &&
                chart.options &&
                chart.options.boost &&
                chart.options.boost.enabled), true);
        }
        /**
         * Returns true if we should force boosting the chart
         * @private
         * @function shouldForceChartSeriesBoosting
         *
         * @param {Highcharts.Chart} chart
         * The chart to check for forcing on
         *
         * @return {boolean}
         * True, if boosting should be forced.
         */
        function shouldForceChartSeriesBoosting(chart) {
            // If there are more than five series currently boosting,
            // we should boost the whole chart to avoid running out of webgl contexts.
            var sboostCount = 0,
                canBoostCount = 0,
                allowBoostForce = pick(chart.options.boost && chart.options.boost.allowForce,
                true),
                series;
            if (typeof chart.boostForceChartBoost !== 'undefined') {
                return chart.boostForceChartBoost;
            }
            if (chart.series.length > 1) {
                for (var i = 0; i < chart.series.length; i++) {
                    series = chart.series[i];
                    // Don't count series with boostThreshold set to 0
                    // See #8950
                    // Also don't count if the series is hidden.
                    // See #9046
                    if (series.options.boostThreshold === 0 ||
                        series.visible === false) {
                        continue;
                    }
                    // Don't count heatmap series as they are handled differently.
                    // In the future we should make the heatmap/treemap path compatible
                    // with forcing. See #9636.
                    if (series.type === 'heatmap') {
                        continue;
                    }
                    if (boostableMap[series.type]) {
                        ++canBoostCount;
                    }
                    if (patientMax(series.processedXData, series.options.data, 
                    // series.xData,
                    series.points) >= (series.options.boostThreshold || Number.MAX_VALUE)) {
                        ++sboostCount;
                    }
                }
            }
            chart.boostForceChartBoost = allowBoostForce && ((canBoostCount === chart.series.length &&
                sboostCount > 0) ||
                sboostCount > 5);
            return chart.boostForceChartBoost;
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Performs the actual render if the renderer is
         * attached to the series.
         * @private
         * @param renderer {OGLRenderer} - the renderer
         * @param series {Highcharts.Series} - the series
         */
        function renderIfNotSeriesBoosting(renderer, series, chart) {
            if (renderer &&
                series.renderTarget &&
                series.canvas &&
                !(chart || series.chart).isChartSeriesBoosting()) {
                renderer.render(chart || series.chart);
            }
        }
        /**
         * @private
         */
        function allocateIfNotSeriesBoosting(renderer, series) {
            if (renderer &&
                series.renderTarget &&
                series.canvas &&
                !series.chart.isChartSeriesBoosting()) {
                renderer.allocateBufferForSingleSeries(series);
            }
        }
        /**
         * An "async" foreach loop. Uses a setTimeout to keep the loop from blocking the
         * UI thread.
         *
         * @private
         *
         * @param arr {Array} - the array to loop through
         * @param fn {Function} - the callback to call for each item
         * @param finalFunc {Function} - the callback to call when done
         * @param chunkSize {Number} - the number of iterations per timeout
         * @param i {Number} - the current index
         * @param noTimeout {Boolean} - set to true to skip timeouts
         */
        function eachAsync(arr, fn, finalFunc, chunkSize, i, noTimeout) {
            i = i || 0;
            chunkSize = chunkSize || CHUNK_SIZE;
            var threshold = i + chunkSize,
                proceed = true;
            while (proceed && i < threshold && i < arr.length) {
                proceed = fn(arr[i], i);
                ++i;
            }
            if (proceed) {
                if (i < arr.length) {
                    if (noTimeout) {
                        eachAsync(arr, fn, finalFunc, chunkSize, i, noTimeout);
                    }
                    else if (win.requestAnimationFrame) {
                        // If available, do requestAnimationFrame - shaves off a few ms
                        win.requestAnimationFrame(function () {
                            eachAsync(arr, fn, finalFunc, chunkSize, i);
                        });
                    }
                    else {
                        setTimeout(function () {
                            eachAsync(arr, fn, finalFunc, chunkSize, i);
                        });
                    }
                }
                else if (finalFunc) {
                    finalFunc();
                }
            }
        }
        /**
         * Returns true if the current browser supports webgl
         *
         * @private
         * @function hasWebGLSupport
         */
        function hasWebGLSupport() {
            var i = 0, canvas, contexts = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'], context = false;
            if (typeof win.WebGLRenderingContext !== 'undefined') {
                canvas = doc.createElement('canvas');
                for (; i < contexts.length; i++) {
                    try {
                        context = canvas.getContext(contexts[i]);
                        if (typeof context !== 'undefined' && context !== null) {
                            return true;
                        }
                    }
                    catch (e) {
                        // silent error
                    }
                }
            }
            return false;
        }
        /* eslint-disable no-invalid-this */
        /**
         * Used for treemap|heatmap.drawPoints
         *
         * @private
         * @function pointDrawHandler
         */
        function pointDrawHandler(proceed) {
            var enabled = true,
                renderer;
            if (this.chart.options && this.chart.options.boost) {
                enabled = typeof this.chart.options.boost.enabled === 'undefined' ?
                    true :
                    this.chart.options.boost.enabled;
            }
            if (!enabled || !this.isSeriesBoosting) {
                return proceed.call(this);
            }
            this.chart.isBoosting = true;
            // Make sure we have a valid OGL context
            renderer = createAndAttachRenderer(this.chart, this);
            if (renderer) {
                allocateIfNotSeriesBoosting(renderer, this);
                renderer.pushSeries(this);
            }
            renderIfNotSeriesBoosting(renderer, this);
        }
        /* eslint-enable no-invalid-this, valid-jsdoc */
        var funs = {
                patientMax: patientMax,
                boostEnabled: boostEnabled,
                shouldForceChartSeriesBoosting: shouldForceChartSeriesBoosting,
                renderIfNotSeriesBoosting: renderIfNotSeriesBoosting,
                allocateIfNotSeriesBoosting: allocateIfNotSeriesBoosting,
                eachAsync: eachAsync,
                hasWebGLSupport: hasWebGLSupport,
                pointDrawHandler: pointDrawHandler
            };
        // This needs to be fixed.
        H.hasWebGLSupport = hasWebGLSupport;

        return funs;
    });
    _registerModule(_modules, 'Extensions/Boost/BoostInit.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js'], _modules['Extensions/Boost/BoostUtils.js'], _modules['Extensions/Boost/BoostAttach.js']], function (Chart, H, Series, SeriesRegistry, U, butils, createAndAttachRenderer) {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var noop = H.noop;
        var seriesTypes = SeriesRegistry.seriesTypes;
        var addEvent = U.addEvent,
            extend = U.extend,
            fireEvent = U.fireEvent,
            wrap = U.wrap;
        var eachAsync = butils.eachAsync,
            pointDrawHandler = butils.pointDrawHandler,
            allocateIfNotSeriesBoosting = butils.allocateIfNotSeriesBoosting,
            renderIfNotSeriesBoosting = butils.renderIfNotSeriesBoosting,
            shouldForceChartSeriesBoosting = butils.shouldForceChartSeriesBoosting,
            index;
        /* eslint-disable valid-jsdoc */
        /**
         * Initialize the boot module.
         *
         * @private
         * @return {void}
         */
        function init() {
            extend(Series.prototype, {
                /**
                 * @private
                 * @function Highcharts.Series#renderCanvas
                 */
                renderCanvas: function () {
                    var series = this, options = series.options || {}, renderer = false, chart = series.chart, xAxis = this.xAxis, yAxis = this.yAxis, xData = options.xData || series.processedXData, yData = options.yData || series.processedYData, rawData = options.data, xExtremes = xAxis.getExtremes(), xMin = xExtremes.min, xMax = xExtremes.max, yExtremes = yAxis.getExtremes(), yMin = yExtremes.min, yMax = yExtremes.max, pointTaken = {}, lastClientX, sampling = !!series.sampling, points, enableMouseTracking = options.enableMouseTracking !== false, threshold = options.threshold, yBottom = yAxis.getThreshold(threshold), isRange = series.pointArrayMap &&
                            series.pointArrayMap.join(',') === 'low,high', isStacked = !!options.stacking, cropStart = series.cropStart || 0, requireSorting = series.requireSorting, useRaw = !xData, minVal, maxVal, minI, maxI, boostOptions, compareX = options.findNearestPointBy === 'x', xDataFull = (this.xData ||
                            this.options.xData ||
                            this.processedXData ||
                            false), addKDPoint = function (clientX, plotY, i) {
                            // We need to do ceil on the clientX to make things
                            // snap to pixel values. The renderer will frequently
                            // draw stuff on "sub-pixels".
                            clientX = Math.ceil(clientX);
                        // Shaves off about 60ms compared to repeated concatenation
                        index = compareX ? clientX : clientX + ',' + plotY;
                        // The k-d tree requires series points.
                        // Reduce the amount of points, since the time to build the
                        // tree increases exponentially.
                        if (enableMouseTracking && !pointTaken[index]) {
                            pointTaken[index] = true;
                            if (chart.inverted) {
                                clientX = xAxis.len - clientX;
                                plotY = yAxis.len - plotY;
                            }
                            points.push({
                                x: xDataFull ? xDataFull[cropStart + i] : false,
                                clientX: clientX,
                                plotX: clientX,
                                plotY: plotY,
                                i: cropStart + i
                            });
                        }
                    };
                    // Get or create the renderer
                    renderer = createAndAttachRenderer(chart, series);
                    chart.isBoosting = true;
                    boostOptions = renderer.settings;
                    if (!this.visible) {
                        return;
                    }
                    // If we are zooming out from SVG mode, destroy the graphics
                    if (this.points || this.graph) {
                        this.destroyGraphics();
                    }
                    // If we're rendering per. series we should create the marker groups
                    // as usual.
                    if (!chart.isChartSeriesBoosting()) {
                        // If all series were boosting, but are not anymore
                        // restore private markerGroup
                        if (this.markerGroup === chart.markerGroup) {
                            this.markerGroup = void 0;
                        }
                        this.markerGroup = series.plotGroup('markerGroup', 'markers', true, 1, chart.seriesGroup);
                    }
                    else {
                        // If series has a private markeGroup, remove that
                        // and use common markerGroup
                        if (this.markerGroup &&
                            this.markerGroup !== chart.markerGroup) {
                            this.markerGroup.destroy();
                        }
                        // Use a single group for the markers
                        this.markerGroup = chart.markerGroup;
                        // When switching from chart boosting mode, destroy redundant
                        // series boosting targets
                        if (this.renderTarget) {
                            this.renderTarget = this.renderTarget.destroy();
                        }
                    }
                    points = this.points = [];
                    // Do not start building while drawing
                    series.buildKDTree = noop;
                    if (renderer) {
                        allocateIfNotSeriesBoosting(renderer, this);
                        renderer.pushSeries(series);
                        // Perform the actual renderer if we're on series level
                        renderIfNotSeriesBoosting(renderer, this, chart);
                    }
                    /**
                     * This builds the KD-tree
                     * @private
                     */
                    function processPoint(d, i) {
                        var x,
                            y,
                            clientX,
                            plotY,
                            isNull,
                            low = false,
                            chartDestroyed = typeof chart.index === 'undefined',
                            isYInside = true;
                        if (typeof d === 'undefined') {
                            return true;
                        }
                        if (!chartDestroyed) {
                            if (useRaw) {
                                x = d[0];
                                y = d[1];
                            }
                            else {
                                x = d;
                                y = yData[i];
                            }
                            // Resolve low and high for range series
                            if (isRange) {
                                if (useRaw) {
                                    y = d.slice(1, 3);
                                }
                                low = y[0];
                                y = y[1];
                            }
                            else if (isStacked) {
                                x = d.x;
                                y = d.stackY;
                                low = y - d.y;
                            }
                            isNull = y === null;
                            // Optimize for scatter zooming
                            if (!requireSorting) {
                                isYInside = y >= yMin && y <= yMax;
                            }
                            if (!isNull && x >= xMin && x <= xMax && isYInside) {
                                clientX = xAxis.toPixels(x, true);
                                if (sampling) {
                                    if (typeof minI === 'undefined' ||
                                        clientX === lastClientX) {
                                        if (!isRange) {
                                            low = y;
                                        }
                                        if (typeof maxI === 'undefined' ||
                                            y > maxVal) {
                                            maxVal = y;
                                            maxI = i;
                                        }
                                        if (typeof minI === 'undefined' ||
                                            low < minVal) {
                                            minVal = low;
                                            minI = i;
                                        }
                                    }
                                    // Add points and reset
                                    if (clientX !== lastClientX) {
                                        // maxI is number too:
                                        if (typeof minI !== 'undefined') {
                                            plotY =
                                                yAxis.toPixels(maxVal, true);
                                            yBottom =
                                                yAxis.toPixels(minVal, true);
                                            addKDPoint(clientX, plotY, maxI);
                                            if (yBottom !== plotY) {
                                                addKDPoint(clientX, yBottom, minI);
                                            }
                                        }
                                        minI = maxI = void 0;
                                        lastClientX = clientX;
                                    }
                                }
                                else {
                                    plotY = Math.ceil(yAxis.toPixels(y, true));
                                    addKDPoint(clientX, plotY, i);
                                }
                            }
                        }
                        return !chartDestroyed;
                    }
                    /**
                     * @private
                     */
                    function doneProcessing() {
                        fireEvent(series, 'renderedCanvas');
                        // Go back to prototype, ready to build
                        delete series.buildKDTree;
                        series.buildKDTree();
                        if (boostOptions.debug.timeKDTree) {
                            console.timeEnd('kd tree building'); // eslint-disable-line no-console
                        }
                    }
                    // Loop over the points to build the k-d tree - skip this if
                    // exporting
                    if (!chart.renderer.forExport) {
                        if (boostOptions.debug.timeKDTree) {
                            console.time('kd tree building'); // eslint-disable-line no-console
                        }
                        eachAsync(isStacked ? series.data : (xData || rawData), processPoint, doneProcessing);
                    }
                }
            });
            /*
             * We need to handle heatmaps separatly, since we can't perform the
             * size/color calculations in the shader easily.
             *
             * This likely needs future optimization.
             */
            ['heatmap', 'treemap'].forEach(function (t) {
                if (seriesTypes[t]) {
                    wrap(seriesTypes[t].prototype, 'drawPoints', pointDrawHandler);
                }
            });
            /* eslint-disable no-invalid-this */
            if (seriesTypes.bubble) {
                // By default, the bubble series does not use the KD-tree, so force it
                // to.
                delete seriesTypes.bubble.prototype.buildKDTree;
                // seriesTypes.bubble.prototype.directTouch = false;
                // Needed for markers to work correctly
                wrap(seriesTypes.bubble.prototype, 'markerAttribs', function (proceed) {
                    if (this.isSeriesBoosting) {
                        return false;
                    }
                    return proceed.apply(this, [].slice.call(arguments, 1));
                });
            }
            seriesTypes.scatter.prototype.fill = true;
            extend(seriesTypes.area.prototype, {
                fill: true,
                fillOpacity: true,
                sampling: true
            });
            extend(seriesTypes.column.prototype, {
                fill: true,
                sampling: true
            });
            Chart.prototype.propsRequireUpdateSeries.push('boost');
            // Take care of the canvas blitting
            Chart.prototype.callbacks.push(function (chart) {
                /**
                 * Convert chart-level canvas to image.
                 * @private
                 */
                function canvasToSVG() {
                    if (chart.ogl && chart.isChartSeriesBoosting()) {
                        chart.ogl.render(chart);
                    }
                }
                /**
                 * Clear chart-level canvas.
                 * @private
                 */
                function preRender() {
                    // Reset force state
                    chart.boostForceChartBoost = void 0;
                    chart.boostForceChartBoost = shouldForceChartSeriesBoosting(chart);
                    chart.isBoosting = false;
                    if (!chart.isChartSeriesBoosting() && chart.didBoost) {
                        chart.didBoost = false;
                    }
                    // Clear the canvas
                    if (chart.boostClear) {
                        chart.boostClear();
                    }
                    if (chart.canvas && chart.ogl && chart.isChartSeriesBoosting()) {
                        chart.didBoost = true;
                        // Allocate
                        chart.ogl.allocateBuffer(chart);
                    }
                    // see #6518 + #6739
                    if (chart.markerGroup &&
                        chart.xAxis &&
                        chart.xAxis.length > 0 &&
                        chart.yAxis &&
                        chart.yAxis.length > 0) {
                        chart.markerGroup.translate(chart.xAxis[0].pos, chart.yAxis[0].pos);
                    }
                }
                addEvent(chart, 'predraw', preRender);
                addEvent(chart, 'render', canvasToSVG);
                // addEvent(chart, 'zoom', function () {
                //     chart.boostForceChartBoost =
                //         shouldForceChartSeriesBoosting(chart);
                // });
                var prevX = -1;
                var prevY = -1;
                addEvent(chart.pointer, 'afterGetHoverData', function () {
                    var series = chart.hoverSeries;
                    if (chart.markerGroup && series) {
                        var xAxis = chart.inverted ? series.yAxis : series.xAxis;
                        var yAxis = chart.inverted ? series.xAxis : series.yAxis;
                        if ((xAxis && xAxis.pos !== prevX) ||
                            (yAxis && yAxis.pos !== prevY)) {
                            // #10464: Keep the marker group position in sync with the
                            // position of the hovered series axes since there is only
                            // one shared marker group when boosting.
                            chart.markerGroup.translate(xAxis.pos, yAxis.pos);
                            prevX = xAxis.pos;
                            prevY = yAxis.pos;
                        }
                    }
                });
            });
            /* eslint-enable no-invalid-this */
        }

        return init;
    });
    _registerModule(_modules, 'Extensions/BoostCanvas.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (Chart, Color, H, Series, SeriesRegistry, U) {
        /* *
         *
         *  License: www.highcharts.com/license
         *  Author: Torstein Honsi, Christer Vasseng
         *
         *  This module serves as a fallback for the Boost module in IE9 and IE10. Newer
         *  browsers support WebGL which is faster.
         *
         *  It is recommended to include this module in conditional comments targeting
         *  IE9 and IE10.
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var doc = H.doc,
            noop = H.noop;
        var seriesTypes = SeriesRegistry.seriesTypes;
        var addEvent = U.addEvent,
            extend = U.extend,
            fireEvent = U.fireEvent,
            isNumber = U.isNumber,
            merge = U.merge,
            pick = U.pick,
            wrap = U.wrap;
        var CHUNK_SIZE = 50000,
            destroyLoadingDiv;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Initialize the canvas boost.
         *
         * @function Highcharts.initCanvasBoost
         */
        var initCanvasBoost = function () {
                if (H.seriesTypes.heatmap) {
                    wrap(H.seriesTypes.heatmap.prototype, 'drawPoints',
            function () {
                        var chart = this.chart,
            ctx = this.getContext(),
            inverted = this.chart.inverted,
            xAxis = this.xAxis,
            yAxis = this.yAxis;
                    if (ctx) {
                        // draw the columns
                        this.points.forEach(function (point) {
                            var plotY = point.plotY,
                                pointAttr;
                            if (typeof plotY !== 'undefined' &&
                                !isNaN(plotY) &&
                                point.y !== null &&
                                ctx) {
                                var _a = point.shapeArgs || {},
                                    _b = _a.x,
                                    x = _b === void 0 ? 0 : _b,
                                    _c = _a.y,
                                    y = _c === void 0 ? 0 : _c,
                                    _d = _a.width,
                                    width = _d === void 0 ? 0 : _d,
                                    _e = _a.height,
                                    height = _e === void 0 ? 0 : _e;
                                if (!chart.styledMode) {
                                    pointAttr = point.series.pointAttribs(point);
                                }
                                else {
                                    pointAttr = point.series.colorAttribs(point);
                                }
                                ctx.fillStyle = pointAttr.fill;
                                if (inverted) {
                                    ctx.fillRect(yAxis.len - y + xAxis.left, xAxis.len - x + yAxis.top, -height, -width);
                                }
                                else {
                                    ctx.fillRect(x + xAxis.left, y + yAxis.top, width, height);
                                }
                            }
                        });
                        this.canvasToSVG();
                    }
                    else {
                        this.chart.showLoading('Your browser doesn\'t support HTML5 canvas, <br>' +
                            'please use a modern browser');
                        // Uncomment this to provide low-level (slow) support in oldIE.
                        // It will cause script errors on charts with more than a few
                        // thousand points.
                        // arguments[0].call(this);
                    }
                });
            }
            extend(Series.prototype, {
                /**
                 * Create a hidden canvas to draw the graph on. The contents is later
                 * copied over to an SVG image element.
                 *
                 * @private
                 * @function Highcharts.Series#getContext
                 */
                getContext: function () {
                    var chart = this.chart,
                        width = chart.chartWidth,
                        height = chart.chartHeight,
                        targetGroup = chart.seriesGroup || this.group,
                        target = this,
                        ctx,
                        swapXY = function (proceed,
                        x,
                        y,
                        a,
                        b,
                        c,
                        d) {
                            proceed.call(this,
                        y,
                        x,
                        a,
                        b,
                        c,
                        d);
                    };
                    if (chart.isChartSeriesBoosting()) {
                        target = chart;
                        targetGroup = chart.seriesGroup;
                    }
                    ctx = target.ctx;
                    if (!target.canvas) {
                        target.canvas = doc.createElement('canvas');
                        target.renderTarget = chart.renderer
                            .image('', 0, 0, width, height)
                            .addClass('highcharts-boost-canvas')
                            .add(targetGroup);
                        target.ctx = ctx = target.canvas.getContext('2d');
                        if (chart.inverted) {
                            ['moveTo', 'lineTo', 'rect', 'arc'].forEach(function (fn) {
                                wrap(ctx, fn, swapXY);
                            });
                        }
                        target.boostCopy = function () {
                            target.renderTarget.attr({
                                href: target.canvas.toDataURL('image/png')
                            });
                        };
                        target.boostClear = function () {
                            ctx.clearRect(0, 0, target.canvas.width, target.canvas.height);
                            if (target === this) {
                                target.renderTarget.attr({ href: '' });
                            }
                        };
                        target.boostClipRect = chart.renderer.clipRect();
                        target.renderTarget.clip(target.boostClipRect);
                    }
                    else if (!(target instanceof Chart)) {
                        // ctx.clearRect(0, 0, width, height);
                    }
                    if (target.canvas.width !== width) {
                        target.canvas.width = width;
                    }
                    if (target.canvas.height !== height) {
                        target.canvas.height = height;
                    }
                    target.renderTarget.attr({
                        x: 0,
                        y: 0,
                        width: width,
                        height: height,
                        style: 'pointer-events: none',
                        href: ''
                    });
                    target.boostClipRect.attr(chart.getBoostClipRect(target));
                    return ctx;
                },
                /**
                 * Draw the canvas image inside an SVG image
                 *
                 * @private
                 * @function Highcharts.Series#canvasToSVG
                 */
                canvasToSVG: function () {
                    if (!this.chart.isChartSeriesBoosting()) {
                        if (this.boostCopy || this.chart.boostCopy) {
                            (this.boostCopy || this.chart.boostCopy)();
                        }
                    }
                    else {
                        if (this.boostClear) {
                            this.boostClear();
                        }
                    }
                },
                cvsLineTo: function (ctx, clientX, plotY) {
                    ctx.lineTo(clientX, plotY);
                },
                renderCanvas: function () {
                    var series = this, options = series.options, chart = series.chart, xAxis = this.xAxis, yAxis = this.yAxis, activeBoostSettings = chart.options.boost || {}, boostSettings = {
                            timeRendering: activeBoostSettings.timeRendering || false,
                            timeSeriesProcessing: activeBoostSettings.timeSeriesProcessing || false,
                            timeSetup: activeBoostSettings.timeSetup || false
                        }, ctx, c = 0, xData = series.processedXData, yData = series.processedYData, rawData = options.data, xExtremes = xAxis.getExtremes(), xMin = xExtremes.min, xMax = xExtremes.max, yExtremes = yAxis.getExtremes(), yMin = yExtremes.min, yMax = yExtremes.max, pointTaken = {}, lastClientX, sampling = !!series.sampling, points, r = options.marker && options.marker.radius, cvsDrawPoint = this.cvsDrawPoint, cvsLineTo = options.lineWidth ? this.cvsLineTo : void 0, cvsMarker = (r && r <= 1 ?
                            this.cvsMarkerSquare :
                            this.cvsMarkerCircle), strokeBatch = this.cvsStrokeBatch || 1000, enableMouseTracking = options.enableMouseTracking !== false, lastPoint, threshold = options.threshold, yBottom = yAxis.getThreshold(threshold), hasThreshold = isNumber(threshold), translatedThreshold = yBottom, doFill = this.fill, isRange = (series.pointArrayMap &&
                            series.pointArrayMap.join(',') === 'low,high'), isStacked = !!options.stacking, cropStart = series.cropStart || 0, loadingOptions = chart.options.loading, requireSorting = series.requireSorting, wasNull, connectNulls = options.connectNulls, useRaw = !xData, minVal, maxVal, minI, maxI, index, sdata = (isStacked ?
                            series.data :
                            (xData || rawData)), fillColor = (series.fillOpacity ?
                            Color.parse(series.color).setOpacity(pick(options.fillOpacity, 0.75)).get() :
                            series.color), 
                        //
                        stroke = function () {
                            if (doFill) {
                                ctx.fillStyle = fillColor;
                            ctx.fill();
                        }
                        else {
                            ctx.strokeStyle = series.color;
                            ctx.lineWidth = options.lineWidth;
                            ctx.stroke();
                        }
                    }, 
                    //
                    drawPoint = function (clientX, plotY, yBottom, i) {
                        if (c === 0) {
                            ctx.beginPath();
                            if (cvsLineTo) {
                                ctx.lineJoin = 'round';
                            }
                        }
                        if (chart.scroller &&
                            series.options.className ===
                                'highcharts-navigator-series') {
                            plotY += chart.scroller.top;
                            if (yBottom) {
                                yBottom += chart.scroller.top;
                            }
                        }
                        else {
                            plotY += chart.plotTop;
                        }
                        clientX += chart.plotLeft;
                        if (wasNull) {
                            ctx.moveTo(clientX, plotY);
                        }
                        else {
                            if (cvsDrawPoint) {
                                cvsDrawPoint(ctx, clientX, plotY, yBottom, lastPoint);
                            }
                            else if (cvsLineTo) {
                                cvsLineTo(ctx, clientX, plotY);
                            }
                            else if (cvsMarker) {
                                cvsMarker.call(series, ctx, clientX, plotY, r, i);
                            }
                        }
                        // We need to stroke the line for every 1000 pixels. It will
                        // crash the browser memory use if we stroke too
                        // infrequently.
                        c = c + 1;
                        if (c === strokeBatch) {
                            stroke();
                            c = 0;
                        }
                        // Area charts need to keep track of the last point
                        lastPoint = {
                            clientX: clientX,
                            plotY: plotY,
                            yBottom: yBottom
                        };
                    }, 
                    //
                    compareX = options.findNearestPointBy === 'x', 
                    //
                    xDataFull = (this.xData ||
                        this.options.xData ||
                        this.processedXData ||
                        false), 
                    //
                    addKDPoint = function (clientX, plotY, i) {
                        // Shaves off about 60ms compared to repeated concatenation
                        index = compareX ? clientX : clientX + ',' + plotY;
                        // The k-d tree requires series points.
                        // Reduce the amount of points, since the time to build the
                        // tree increases exponentially.
                        if (enableMouseTracking && !pointTaken[index]) {
                            pointTaken[index] = true;
                            if (chart.inverted) {
                                clientX = xAxis.len - clientX;
                                plotY = yAxis.len - plotY;
                            }
                            points.push({
                                x: xDataFull ?
                                    xDataFull[cropStart + i] :
                                    false,
                                clientX: clientX,
                                plotX: clientX,
                                plotY: plotY,
                                i: cropStart + i
                            });
                        }
                    };
                    if (this.renderTarget) {
                        this.renderTarget.attr({ 'href': '' });
                    }
                    // If we are zooming out from SVG mode, destroy the graphics
                    if (this.points || this.graph) {
                        this.destroyGraphics();
                    }
                    // The group
                    series.plotGroup('group', 'series', series.visible ? 'visible' : 'hidden', options.zIndex, chart.seriesGroup);
                    series.markerGroup = series.group;
                    addEvent(series, 'destroy', function () {
                        // Prevent destroy twice
                        series.markerGroup = null;
                    });
                    points = this.points = [];
                    ctx = this.getContext();
                    series.buildKDTree = noop; // Do not start building while drawing
                    if (this.boostClear) {
                        this.boostClear();
                    }
                    // if (this.canvas) {
                    //     ctx.clearRect(
                    //         0,
                    //         0,
                    //         this.canvas.width,
                    //         this.canvas.height
                    //     );
                    // }
                    if (!this.visible) {
                        return;
                    }
                    // Display a loading indicator
                    if (rawData.length > 99999) {
                        chart.options.loading = merge(loadingOptions, {
                            labelStyle: {
                                backgroundColor: color("#ffffff" /* backgroundColor */).setOpacity(0.75).get(),
                                padding: '1em',
                                borderRadius: '0.5em'
                            },
                            style: {
                                backgroundColor: 'none',
                                opacity: 1
                            }
                        });
                        U.clearTimeout(destroyLoadingDiv);
                        chart.showLoading('Drawing...');
                        chart.options.loading = loadingOptions; // reset
                    }
                    if (boostSettings.timeRendering) {
                        console.time('canvas rendering'); // eslint-disable-line no-console
                    }
                    // Loop over the points
                    H.eachAsync(sdata, function (d, i) {
                        var x,
                            y,
                            clientX,
                            plotY,
                            isNull,
                            low,
                            isNextInside = false,
                            isPrevInside = false,
                            nx = false,
                            px = false,
                            chartDestroyed = typeof chart.index === 'undefined',
                            isYInside = true;
                        if (!chartDestroyed) {
                            if (useRaw) {
                                x = d[0];
                                y = d[1];
                                if (sdata[i + 1]) {
                                    nx = sdata[i + 1][0];
                                }
                                if (sdata[i - 1]) {
                                    px = sdata[i - 1][0];
                                }
                            }
                            else {
                                x = d;
                                y = yData[i];
                                if (sdata[i + 1]) {
                                    nx = sdata[i + 1];
                                }
                                if (sdata[i - 1]) {
                                    px = sdata[i - 1];
                                }
                            }
                            if (nx && nx >= xMin && nx <= xMax) {
                                isNextInside = true;
                            }
                            if (px && px >= xMin && px <= xMax) {
                                isPrevInside = true;
                            }
                            // Resolve low and high for range series
                            if (isRange) {
                                if (useRaw) {
                                    y = d.slice(1, 3);
                                }
                                low = y[0];
                                y = y[1];
                            }
                            else if (isStacked) {
                                x = d.x;
                                y = d.stackY;
                                low = y - d.y;
                            }
                            isNull = y === null;
                            // Optimize for scatter zooming
                            if (!requireSorting) {
                                isYInside = y >= yMin && y <= yMax;
                            }
                            if (!isNull &&
                                ((x >= xMin && x <= xMax && isYInside) ||
                                    (isNextInside || isPrevInside))) {
                                clientX = Math.round(xAxis.toPixels(x, true));
                                if (sampling) {
                                    if (typeof minI === 'undefined' ||
                                        clientX === lastClientX) {
                                        if (!isRange) {
                                            low = y;
                                        }
                                        if (typeof maxI === 'undefined' || y > maxVal) {
                                            maxVal = y;
                                            maxI = i;
                                        }
                                        if (typeof minI === 'undefined' ||
                                            low < minVal) {
                                            minVal = low;
                                            minI = i;
                                        }
                                    }
                                    // Add points and reset
                                    if (clientX !== lastClientX) {
                                        // maxI also a number:
                                        if (typeof minI !== 'undefined') {
                                            plotY = yAxis.toPixels(maxVal, true);
                                            yBottom = yAxis.toPixels(minVal, true);
                                            drawPoint(clientX, hasThreshold ?
                                                Math.min(plotY, translatedThreshold) : plotY, hasThreshold ?
                                                Math.max(yBottom, translatedThreshold) : yBottom, i);
                                            addKDPoint(clientX, plotY, maxI);
                                            if (yBottom !== plotY) {
                                                addKDPoint(clientX, yBottom, minI);
                                            }
                                        }
                                        minI = maxI = void 0;
                                        lastClientX = clientX;
                                    }
                                }
                                else {
                                    plotY = Math.round(yAxis.toPixels(y, true));
                                    drawPoint(clientX, plotY, yBottom, i);
                                    addKDPoint(clientX, plotY, i);
                                }
                            }
                            wasNull = isNull && !connectNulls;
                            if (i % CHUNK_SIZE === 0) {
                                if (series.boostCopy || series.chart.boostCopy) {
                                    (series.boostCopy || series.chart.boostCopy)();
                                }
                            }
                        }
                        return !chartDestroyed;
                    }, function () {
                        var loadingDiv = chart.loadingDiv,
                            loadingShown = chart.loadingShown;
                        stroke();
                        // if (series.boostCopy || series.chart.boostCopy) {
                        //     (series.boostCopy || series.chart.boostCopy)();
                        // }
                        series.canvasToSVG();
                        if (boostSettings.timeRendering) {
                            console.timeEnd('canvas rendering'); // eslint-disable-line no-console
                        }
                        fireEvent(series, 'renderedCanvas');
                        // Do not use chart.hideLoading, as it runs JS animation and
                        // will be blocked by buildKDTree. CSS animation looks good, but
                        // then it must be deleted in timeout. If we add the module to
                        // core, change hideLoading so we can skip this block.
                        if (loadingShown) {
                            extend(loadingDiv.style, {
                                transition: 'opacity 250ms',
                                opacity: 0
                            });
                            chart.loadingShown = false;
                            destroyLoadingDiv = setTimeout(function () {
                                if (loadingDiv.parentNode) { // In exporting it is falsy
                                    loadingDiv.parentNode.removeChild(loadingDiv);
                                }
                                chart.loadingDiv = chart.loadingSpan = null;
                            }, 250);
                        }
                        // Go back to prototype, ready to build
                        delete series.buildKDTree;
                        series.buildKDTree();
                        // Don't do async on export, the exportChart, getSVGForExport and
                        // getSVG methods are not chained for it.
                    }, chart.renderer.forExport ? Number.MAX_VALUE : void 0);
                }
            });
            seriesTypes.scatter.prototype.cvsMarkerCircle = function (ctx, clientX, plotY, r) {
                ctx.moveTo(clientX, plotY);
                ctx.arc(clientX, plotY, r, 0, 2 * Math.PI, false);
            };
            // Rect is twice as fast as arc, should be used for small markers
            seriesTypes.scatter.prototype.cvsMarkerSquare = function (ctx, clientX, plotY, r) {
                ctx.rect(clientX - r, plotY - r, r * 2, r * 2);
            };
            seriesTypes.scatter.prototype.fill = true;
            if (seriesTypes.bubble) {
                seriesTypes.bubble.prototype.cvsMarkerCircle = function (ctx, clientX, plotY, r, i) {
                    ctx.moveTo(clientX, plotY);
                    ctx.arc(clientX, plotY, this.radii && this.radii[i], 0, 2 * Math.PI, false);
                };
                seriesTypes.bubble.prototype.cvsStrokeBatch = 1;
            }
            extend(seriesTypes.area.prototype, {
                cvsDrawPoint: function (ctx, clientX, plotY, yBottom, lastPoint) {
                    if (lastPoint && clientX !== lastPoint.clientX) {
                        ctx.moveTo(lastPoint.clientX, lastPoint.yBottom);
                        ctx.lineTo(lastPoint.clientX, lastPoint.plotY);
                        ctx.lineTo(clientX, plotY);
                        ctx.lineTo(clientX, yBottom);
                    }
                },
                fill: true,
                fillOpacity: true,
                sampling: true
            });
            extend(seriesTypes.column.prototype, {
                cvsDrawPoint: function (ctx, clientX, plotY, yBottom) {
                    ctx.rect(clientX - 1, plotY, 1, yBottom - plotY);
                },
                fill: true,
                sampling: true
            });
            Chart.prototype.callbacks.push(function (chart) {
                /**
                 * @private
                 */
                function canvasToSVG() {
                    if (chart.boostCopy) {
                        chart.boostCopy();
                    }
                }
                /**
                 * @private
                 */
                function clear() {
                    if (chart.renderTarget) {
                        chart.renderTarget.attr({ href: '' });
                    }
                    if (chart.canvas) {
                        chart.canvas.getContext('2d').clearRect(0, 0, chart.canvas.width, chart.canvas.height);
                    }
                }
                addEvent(chart, 'predraw', clear);
                addEvent(chart, 'render', canvasToSVG);
            });
        };

        return initCanvasBoost;
    });
    _registerModule(_modules, 'Extensions/Boost/BoostOverrides.js', [_modules['Core/Chart/Chart.js'], _modules['Core/DefaultOptions.js'], _modules['Core/Series/Point.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js'], _modules['Extensions/Boost/BoostUtils.js'], _modules['Extensions/Boost/Boostables.js'], _modules['Extensions/Boost/BoostableMap.js']], function (Chart, D, Point, Series, SeriesRegistry, U, butils, boostable, boostableMap) {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var getOptions = D.getOptions;
        var seriesTypes = SeriesRegistry.seriesTypes;
        var addEvent = U.addEvent,
            error = U.error,
            isArray = U.isArray,
            isNumber = U.isNumber,
            pick = U.pick,
            wrap = U.wrap;
        var boostEnabled = butils.boostEnabled,
            shouldForceChartSeriesBoosting = butils.shouldForceChartSeriesBoosting,
            plotOptions = getOptions().plotOptions;
        /**
         * Returns true if the chart is in series boost mode.
         *
         * @function Highcharts.Chart#isChartSeriesBoosting
         *
         * @param {Highcharts.Chart} chart
         *        the chart to check
         *
         * @return {boolean}
         *         true if the chart is in series boost mode
         */
        Chart.prototype.isChartSeriesBoosting = function () {
            var isSeriesBoosting,
                threshold = pick(this.options.boost && this.options.boost.seriesThreshold, 50);
            isSeriesBoosting = threshold <= this.series.length ||
                shouldForceChartSeriesBoosting(this);
            return isSeriesBoosting;
        };
        /* eslint-disable valid-jsdoc */
        /**
         * Get the clip rectangle for a target, either a series or the chart. For the
         * chart, we need to consider the maximum extent of its Y axes, in case of
         * Highcharts Stock panes and navigator.
         *
         * @private
         * @function Highcharts.Chart#getBoostClipRect
         */
        Chart.prototype.getBoostClipRect = function (target) {
            var clipBox = {
                    x: this.plotLeft,
                    y: this.plotTop,
                    width: this.plotWidth,
                    height: this.plotHeight
                };
            if (target === this) {
                var verticalAxes = this.inverted ? this.xAxis : this.yAxis; // #14444
                    if (verticalAxes.length <= 1) {
                        clipBox.y = Math.min(verticalAxes[0].pos,
                    clipBox.y);
                    clipBox.height = (verticalAxes[0].pos -
                        this.plotTop +
                        verticalAxes[0].len);
                }
                else {
                    clipBox.height = this.plotHeight;
                }
            }
            return clipBox;
        };
        /**
         * Return a full Point object based on the index.
         * The boost module uses stripped point objects for performance reasons.
         *
         * @function Highcharts.Series#getPoint
         *
         * @param {object|Highcharts.Point} boostPoint
         *        A stripped-down point object
         *
         * @return {Highcharts.Point}
         *         A Point object as per https://api.highcharts.com/highcharts#Point
         */
        Series.prototype.getPoint = function (boostPoint) {
            var point = boostPoint,
                xData = (this.xData || this.options.xData || this.processedXData ||
                    false);
            if (boostPoint && !(boostPoint instanceof this.pointClass)) {
                point = (new this.pointClass()).init(// eslint-disable-line new-cap
                this, this.options.data[boostPoint.i], xData ? xData[boostPoint.i] : void 0);
                point.category = pick(this.xAxis.categories ?
                    this.xAxis.categories[point.x] :
                    point.x, // @todo simplify
                point.x);
                point.dist = boostPoint.dist;
                point.distX = boostPoint.distX;
                point.plotX = boostPoint.plotX;
                point.plotY = boostPoint.plotY;
                point.index = boostPoint.i;
                point.isInside = this.isPointInside(boostPoint);
            }
            return point;
        };
        /* eslint-disable no-invalid-this */
        // Return a point instance from the k-d-tree
        wrap(Series.prototype, 'searchPoint', function (proceed) {
            return this.getPoint(proceed.apply(this, [].slice.call(arguments, 1)));
        });
        // For inverted series, we need to swap X-Y values before running base methods
        wrap(Point.prototype, 'haloPath', function (proceed) {
            var halo,
                point = this,
                series = point.series,
                chart = series.chart,
                plotX = point.plotX,
                plotY = point.plotY,
                inverted = chart.inverted;
            if (series.isSeriesBoosting && inverted) {
                point.plotX = series.yAxis.len - plotY;
                point.plotY = series.xAxis.len - plotX;
            }
            halo = proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            if (series.isSeriesBoosting && inverted) {
                point.plotX = plotX;
                point.plotY = plotY;
            }
            return halo;
        });
        wrap(Series.prototype, 'markerAttribs', function (proceed, point) {
            var attribs,
                series = this,
                chart = series.chart,
                plotX = point.plotX,
                plotY = point.plotY,
                inverted = chart.inverted;
            if (series.isSeriesBoosting && inverted) {
                point.plotX = series.yAxis.len - plotY;
                point.plotY = series.xAxis.len - plotX;
            }
            attribs = proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            if (series.isSeriesBoosting && inverted) {
                point.plotX = plotX;
                point.plotY = plotY;
            }
            return attribs;
        });
        /*
         * Extend series.destroy to also remove the fake k-d-tree points (#5137).
         * Normally this is handled by Series.destroy that calls Point.destroy,
         * but the fake search points are not registered like that.
         */
        addEvent(Series, 'destroy', function () {
            var series = this,
                chart = series.chart;
            if (chart.markerGroup === series.markerGroup) {
                series.markerGroup = null;
            }
            if (chart.hoverPoints) {
                chart.hoverPoints = chart.hoverPoints.filter(function (point) {
                    return point.series === series;
                });
            }
            if (chart.hoverPoint && chart.hoverPoint.series === series) {
                chart.hoverPoint = null;
            }
        });
        /*
         * Do not compute extremes when min and max are set.
         * If we use this in the core, we can add the hook
         * to hasExtremes to the methods directly.
         */
        wrap(Series.prototype, 'getExtremes', function (proceed) {
            if (!this.isSeriesBoosting || (!this.hasExtremes || !this.hasExtremes())) {
                return proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            }
            return {};
        });
        /*
         * Override a bunch of methods the same way. If the number of points is
         * below the threshold, run the original method. If not, check for a
         * canvas version or do nothing.
         *
         * Note that we're not overriding any of these for heatmaps.
         */
        [
            'translate',
            'generatePoints',
            'drawTracker',
            'drawPoints',
            'render'
        ].forEach(function (method) {
            /**
             * @private
             */
            function branch(proceed) {
                var letItPass = this.options.stacking &&
                        (method === 'translate' || method === 'generatePoints');
                if (!this.isSeriesBoosting ||
                    letItPass ||
                    !boostEnabled(this.chart) ||
                    this.type === 'heatmap' ||
                    this.type === 'treemap' ||
                    !boostableMap[this.type] ||
                    this.options.boostThreshold === 0) {
                    proceed.call(this);
                    // If a canvas version of the method exists, like renderCanvas(), run
                }
                else if (this[method + 'Canvas']) {
                    this[method + 'Canvas']();
                }
            }
            wrap(Series.prototype, method, branch);
            // A special case for some types - their translate method is already wrapped
            if (method === 'translate') {
                [
                    'column',
                    'bar',
                    'arearange',
                    'columnrange',
                    'heatmap',
                    'treemap'
                ].forEach(function (type) {
                    if (seriesTypes[type]) {
                        wrap(seriesTypes[type].prototype, method, branch);
                    }
                });
            }
        });
        // If the series is a heatmap or treemap, or if the series is not boosting
        // do the default behaviour. Otherwise, process if the series has no extremes.
        wrap(Series.prototype, 'processData', function (proceed) {
            var series = this;
            var dataToMeasure = this.options.data;
            /**
             * Used twice in this function, first on this.options.data, the second
             * time it runs the check again after processedXData is built.
             * If the data is going to be grouped, the series shouldn't be boosted.
             * @private
             */
            function getSeriesBoosting(data) {
                // Check if will be grouped.
                if (series.forceCrop) {
                    return false;
                }
                return series.chart.isChartSeriesBoosting() || ((data ? data.length : 0) >=
                    (series.options.boostThreshold || Number.MAX_VALUE));
            }
            if (boostEnabled(this.chart) && boostableMap[this.type]) {
                // If there are no extremes given in the options, we also need to
                // process the data to read the data extremes. If this is a heatmap, do
                // default behaviour.
                if (!getSeriesBoosting(dataToMeasure) || // First pass with options.data
                    this.type === 'heatmap' ||
                    this.type === 'treemap' ||
                    this.options.stacking || // processedYData for the stack (#7481)
                    !this.hasExtremes ||
                    !this.hasExtremes(true)) {
                    proceed.apply(this, Array.prototype.slice.call(arguments, 1));
                    dataToMeasure = this.processedXData;
                }
                // Set the isBoosting flag, second pass with processedXData to see if we
                // have zoomed.
                this.isSeriesBoosting = getSeriesBoosting(dataToMeasure);
                // Enter or exit boost mode
                if (this.isSeriesBoosting) {
                    // Force turbo-mode:
                    var firstPoint = void 0;
                    if (this.options.data && this.options.data.length) {
                        firstPoint = this.getFirstValidPoint(this.options.data);
                        if (!isNumber(firstPoint) && !isArray(firstPoint)) {
                            error(12, false, this.chart);
                        }
                    }
                    this.enterBoost();
                }
                else if (this.exitBoost) {
                    this.exitBoost();
                }
                // The series type is not boostable
            }
            else {
                proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            }
        });
        addEvent(Series, 'hide', function () {
            if (this.canvas && this.renderTarget) {
                if (this.ogl) {
                    this.ogl.clear();
                }
                this.boostClear();
            }
        });
        /**
         * Enter boost mode and apply boost-specific properties.
         *
         * @function Highcharts.Series#enterBoost
         */
        Series.prototype.enterBoost = function () {
            this.alteredByBoost = [];
            // Save the original values, including whether it was an own property or
            // inherited from the prototype.
            ['allowDG', 'directTouch', 'stickyTracking'].forEach(function (prop) {
                this.alteredByBoost.push({
                    prop: prop,
                    val: this[prop],
                    own: Object.hasOwnProperty.call(this, prop)
                });
            }, this);
            this.allowDG = false;
            this.directTouch = false;
            this.stickyTracking = true;
            // Prevent animation when zooming in on boosted series(#13421).
            this.finishedAnimating = true;
            // Hide series label if any
            if (this.labelBySeries) {
                this.labelBySeries = this.labelBySeries.destroy();
            }
        };
        /**
         * Exit from boost mode and restore non-boost properties.
         *
         * @function Highcharts.Series#exitBoost
         */
        Series.prototype.exitBoost = function () {
            // Reset instance properties and/or delete instance properties and go back
            // to prototype
            (this.alteredByBoost || []).forEach(function (setting) {
                if (setting.own) {
                    this[setting.prop] = setting.val;
                }
                else {
                    // Revert to prototype
                    delete this[setting.prop];
                }
            }, this);
            // Clear previous run
            if (this.boostClear) {
                this.boostClear();
            }
        };
        /**
         * @private
         * @function Highcharts.Series#hasExtremes
         */
        Series.prototype.hasExtremes = function (checkX) {
            var options = this.options,
                data = options.data,
                xAxis = this.xAxis && this.xAxis.options,
                yAxis = this.yAxis && this.yAxis.options,
                colorAxis = this.colorAxis && this.colorAxis.options;
            return data.length > (options.boostThreshold || Number.MAX_VALUE) &&
                // Defined yAxis extremes
                isNumber(yAxis.min) &&
                isNumber(yAxis.max) &&
                // Defined (and required) xAxis extremes
                (!checkX ||
                    (isNumber(xAxis.min) && isNumber(xAxis.max))) &&
                // Defined (e.g. heatmap) colorAxis extremes
                (!colorAxis ||
                    (isNumber(colorAxis.min) && isNumber(colorAxis.max)));
        };
        /**
         * If implemented in the core, parts of this can probably be
         * shared with other similar methods in Highcharts.
         *
         * @function Highcharts.Series#destroyGraphics
         */
        Series.prototype.destroyGraphics = function () {
            var _this = this;
            var series = this,
                points = this.points,
                point,
                i;
            if (points) {
                for (i = 0; i < points.length; i = i + 1) {
                    point = points[i];
                    if (point && point.destroyElements) {
                        point.destroyElements(); // #7557
                    }
                }
            }
            ['graph', 'area', 'tracker'].forEach(function (prop) {
                if (series[prop]) {
                    series[prop] = series[prop].destroy();
                }
            });
            if (this.getZonesGraphs) {
                var props = this.getZonesGraphs([['graph', 'highcharts-graph']]);
                props.forEach(function (prop) {
                    var zoneGraph = _this[prop[0]];
                    if (zoneGraph) {
                        _this[prop[0]] = zoneGraph.destroy();
                    }
                });
            }
        };
        // Set default options
        boostable.forEach(function (type) {
            if (plotOptions[type]) {
                plotOptions[type].boostThreshold = 5000;
                plotOptions[type].boostData = [];
                seriesTypes[type].prototype.fillOpacity = true;
            }
        });

    });
    _registerModule(_modules, 'Extensions/Boost/NamedColors.js', [_modules['Core/Color/Color.js']], function (Color) {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        // Register color names since GL can't render those directly.
        // TODO: When supporting modern syntax, make this a const and a named export
        var defaultHTMLColorMap = {
                aliceblue: '#f0f8ff',
                antiquewhite: '#faebd7',
                aqua: '#00ffff',
                aquamarine: '#7fffd4',
                azure: '#f0ffff',
                beige: '#f5f5dc',
                bisque: '#ffe4c4',
                black: '#000000',
                blanchedalmond: '#ffebcd',
                blue: '#0000ff',
                blueviolet: '#8a2be2',
                brown: '#a52a2a',
                burlywood: '#deb887',
                cadetblue: '#5f9ea0',
                chartreuse: '#7fff00',
                chocolate: '#d2691e',
                coral: '#ff7f50',
                cornflowerblue: '#6495ed',
                cornsilk: '#fff8dc',
                crimson: '#dc143c',
                cyan: '#00ffff',
                darkblue: '#00008b',
                darkcyan: '#008b8b',
                darkgoldenrod: '#b8860b',
                darkgray: '#a9a9a9',
                darkgreen: '#006400',
                darkkhaki: '#bdb76b',
                darkmagenta: '#8b008b',
                darkolivegreen: '#556b2f',
                darkorange: '#ff8c00',
                darkorchid: '#9932cc',
                darkred: '#8b0000',
                darksalmon: '#e9967a',
                darkseagreen: '#8fbc8f',
                darkslateblue: '#483d8b',
                darkslategray: '#2f4f4f',
                darkturquoise: '#00ced1',
                darkviolet: '#9400d3',
                deeppink: '#ff1493',
                deepskyblue: '#00bfff',
                dimgray: '#696969',
                dodgerblue: '#1e90ff',
                feldspar: '#d19275',
                firebrick: '#b22222',
                floralwhite: '#fffaf0',
                forestgreen: '#228b22',
                fuchsia: '#ff00ff',
                gainsboro: '#dcdcdc',
                ghostwhite: '#f8f8ff',
                gold: '#ffd700',
                goldenrod: '#daa520',
                gray: '#808080',
                green: '#008000',
                greenyellow: '#adff2f',
                honeydew: '#f0fff0',
                hotpink: '#ff69b4',
                indianred: '#cd5c5c',
                indigo: '#4b0082',
                ivory: '#fffff0',
                khaki: '#f0e68c',
                lavender: '#e6e6fa',
                lavenderblush: '#fff0f5',
                lawngreen: '#7cfc00',
                lemonchiffon: '#fffacd',
                lightblue: '#add8e6',
                lightcoral: '#f08080',
                lightcyan: '#e0ffff',
                lightgoldenrodyellow: '#fafad2',
                lightgrey: '#d3d3d3',
                lightgreen: '#90ee90',
                lightpink: '#ffb6c1',
                lightsalmon: '#ffa07a',
                lightseagreen: '#20b2aa',
                lightskyblue: '#87cefa',
                lightslateblue: '#8470ff',
                lightslategray: '#778899',
                lightsteelblue: '#b0c4de',
                lightyellow: '#ffffe0',
                lime: '#00ff00',
                limegreen: '#32cd32',
                linen: '#faf0e6',
                magenta: '#ff00ff',
                maroon: '#800000',
                mediumaquamarine: '#66cdaa',
                mediumblue: '#0000cd',
                mediumorchid: '#ba55d3',
                mediumpurple: '#9370d8',
                mediumseagreen: '#3cb371',
                mediumslateblue: '#7b68ee',
                mediumspringgreen: '#00fa9a',
                mediumturquoise: '#48d1cc',
                mediumvioletred: '#c71585',
                midnightblue: '#191970',
                mintcream: '#f5fffa',
                mistyrose: '#ffe4e1',
                moccasin: '#ffe4b5',
                navajowhite: '#ffdead',
                navy: '#000080',
                oldlace: '#fdf5e6',
                olive: '#808000',
                olivedrab: '#6b8e23',
                orange: '#ffa500',
                orangered: '#ff4500',
                orchid: '#da70d6',
                palegoldenrod: '#eee8aa',
                palegreen: '#98fb98',
                paleturquoise: '#afeeee',
                palevioletred: '#d87093',
                papayawhip: '#ffefd5',
                peachpuff: '#ffdab9',
                peru: '#cd853f',
                pink: '#ffc0cb',
                plum: '#dda0dd',
                powderblue: '#b0e0e6',
                purple: '#800080',
                red: '#ff0000',
                rosybrown: '#bc8f8f',
                royalblue: '#4169e1',
                saddlebrown: '#8b4513',
                salmon: '#fa8072',
                sandybrown: '#f4a460',
                seagreen: '#2e8b57',
                seashell: '#fff5ee',
                sienna: '#a0522d',
                silver: '#c0c0c0',
                skyblue: '#87ceeb',
                slateblue: '#6a5acd',
                slategray: '#708090',
                snow: '#fffafa',
                springgreen: '#00ff7f',
                steelblue: '#4682b4',
                tan: '#d2b48c',
                teal: '#008080',
                thistle: '#d8bfd8',
                tomato: '#ff6347',
                turquoise: '#40e0d0',
                violet: '#ee82ee',
                violetred: '#d02090',
                wheat: '#f5deb3',
                white: '#ffffff',
                whitesmoke: '#f5f5f5',
                yellow: '#ffff00',
                yellowgreen: '#9acd32'
            };
        Color.names = defaultHTMLColorMap;

        return defaultHTMLColorMap;
    });
    _registerModule(_modules, 'Extensions/Boost/Boost.js', [_modules['Extensions/Boost/BoostUtils.js'], _modules['Extensions/Boost/BoostInit.js'], _modules['Extensions/BoostCanvas.js'], _modules['Core/Utilities.js']], function (butils, init, initCanvasBoost, U) {
        /* *
         *
         *  Copyright (c) 2019-2021 Highsoft AS
         *
         *  Boost module: stripped-down renderer for higher performance
         *
         *  License: highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var error = U.error;
        // These need to be fixed when we support named imports
        var hasWebGLSupport = butils.hasWebGLSupport;
        if (!hasWebGLSupport()) {
            if (typeof initCanvasBoost !== 'undefined') {
                // Fallback to canvas boost
                initCanvasBoost();
            }
            else {
                error(26);
            }
        }
        else {
            // WebGL support is alright, and we're good to go.
            init();
        }

    });
    _registerModule(_modules, 'masters/modules/boost.src.js', [], function () {


    });
}));