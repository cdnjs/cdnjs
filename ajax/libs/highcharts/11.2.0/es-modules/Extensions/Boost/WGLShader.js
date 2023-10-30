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
'use strict';
import U from '../../Core/Utilities.js';
const { clamp, error, pick } = U;
/* *
 *
 *  Constants
 *
 * */
const fragmentShader = [
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
].join('\n');
const vertexShader = [
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
].join('\n');
/* *
 *
 *  Class
 *
 * */
/* eslint-disable valid-jsdoc */
/**
 * A static shader mimicing axis translation functions found in Core/Axis
 *
 * @private
 *
 * @param {WebGLContext} gl
 * the context in which the shader is active
 */
class WGLShader {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(gl) {
        // Error stack
        this.errors = [];
        this.uLocations = {};
        this.gl = gl;
        if (gl && !this.createShader()) {
            return void 0;
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Bind the shader.
     * This makes the shader the active one until another one is bound,
     * or until 0 is bound.
     * @private
     */
    bind() {
        if (this.gl && this.shaderProgram) {
            this.gl.useProgram(this.shaderProgram);
        }
    }
    /**
     * Create the shader.
     * Loads the shader program statically defined above
     * @private
     */
    createShader() {
        const v = this.stringToProgram(vertexShader, 'vertex'), f = this.stringToProgram(fragmentShader, 'fragment'), uloc = (n) => (this.gl.getUniformLocation(this.shaderProgram, n));
        if (!v || !f) {
            this.shaderProgram = false;
            this.handleErrors();
            return false;
        }
        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, v);
        this.gl.attachShader(this.shaderProgram, f);
        this.gl.linkProgram(this.shaderProgram);
        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            this.errors.push(this.gl.getProgramInfoLog(this.shaderProgram));
            this.handleErrors();
            this.shaderProgram = false;
            return false;
        }
        this.gl.useProgram(this.shaderProgram);
        this.gl.bindAttribLocation(this.shaderProgram, 0, 'aVertexPosition');
        this.pUniform = uloc('uPMatrix');
        this.psUniform = uloc('pSize');
        this.fcUniform = uloc('fillColor');
        this.isBubbleUniform = uloc('isBubble');
        this.bubbleSizeAbsUniform = uloc('bubbleSizeAbs');
        this.bubbleSizeAreaUniform = uloc('bubbleSizeByArea');
        this.uSamplerUniform = uloc('uSampler');
        this.skipTranslationUniform = uloc('skipTranslation');
        this.isCircleUniform = uloc('isCircle');
        this.isInverted = uloc('isInverted');
        return true;
    }
    /**
     * Handle errors accumulated in errors stack
     * @private
     */
    handleErrors() {
        if (this.errors.length) {
            error('[highcharts boost] shader error - ' +
                this.errors.join('\n'));
        }
    }
    /**
     * String to shader program
     * @private
     * @param {string} str
     * Program source
     * @param {string} type
     * Program type: either `vertex` or `fragment`
     */
    stringToProgram(str, type) {
        const shader = this.gl.createShader(type === 'vertex' ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(shader, str);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            this.errors.push('when compiling ' +
                type +
                ' shader:\n' +
                this.gl.getShaderInfoLog(shader));
            return false;
        }
        return shader;
    }
    /**
     * Destroy the shader
     * @private
     */
    destroy() {
        if (this.gl && this.shaderProgram) {
            this.gl.deleteProgram(this.shaderProgram);
            this.shaderProgram = false;
        }
    }
    fillColorUniform() {
        return this.fcUniform;
    }
    /**
     * Get the shader program handle
     * @private
     * @return {WebGLProgram}
     * The handle for the program
     */
    getProgram() {
        return this.shaderProgram;
    }
    pointSizeUniform() {
        return this.psUniform;
    }
    perspectiveUniform() {
        return this.pUniform;
    }
    /**
     * Flush
     * @private
     */
    reset() {
        if (this.gl && this.shaderProgram) {
            this.gl.uniform1i(this.isBubbleUniform, 0);
            this.gl.uniform1i(this.isCircleUniform, 0);
        }
    }
    /**
     * Set bubble uniforms
     * @private
     * @param {Highcharts.Series} series
     * Series to use
     */
    setBubbleUniforms(series, zCalcMin, zCalcMax, pixelRatio = 1) {
        const seriesOptions = series.options;
        let zMin = Number.MAX_VALUE, zMax = -Number.MAX_VALUE;
        if (this.gl && this.shaderProgram && series.is('bubble')) {
            const pxSizes = series.getPxExtremes();
            zMin = pick(seriesOptions.zMin, clamp(zCalcMin, seriesOptions.displayNegative === false ?
                seriesOptions.zThreshold : -Number.MAX_VALUE, zMin));
            zMax = pick(seriesOptions.zMax, Math.max(zMax, zCalcMax));
            this.gl.uniform1i(this.isBubbleUniform, 1);
            this.gl.uniform1i(this.isCircleUniform, 1);
            this.gl.uniform1i(this.bubbleSizeAreaUniform, (series.options.sizeBy !== 'width'));
            this.gl.uniform1i(this.bubbleSizeAbsUniform, series.options
                .sizeByAbsoluteValue);
            this.setUniform('bubbleMinSize', pxSizes.minPxSize * pixelRatio);
            this.setUniform('bubbleMaxSize', pxSizes.maxPxSize * pixelRatio);
            this.setUniform('bubbleZMin', zMin);
            this.setUniform('bubbleZMax', zMax);
            this.setUniform('bubbleZThreshold', series.options.zThreshold);
        }
    }
    /**
     * Set the Color uniform.
     * @private
     * @param {Array<number>} color
     * Array with RGBA values.
     */
    setColor(color) {
        if (this.gl && this.shaderProgram) {
            this.gl.uniform4f(this.fcUniform, color[0] / 255.0, color[1] / 255.0, color[2] / 255.0, color[3]);
        }
    }
    /**
     * Enable/disable circle drawing
     * @private
     */
    setDrawAsCircle(flag) {
        if (this.gl && this.shaderProgram) {
            this.gl.uniform1i(this.isCircleUniform, flag ? 1 : 0);
        }
    }
    /**
     * Set if inversion state
     * @private
     * @param {number} flag
     * Inversion flag
     */
    setInverted(flag) {
        if (this.gl && this.shaderProgram) {
            this.gl.uniform1i(this.isInverted, flag);
        }
    }
    /**
     * Set the perspective matrix
     * @private
     * @param {Float32List} m
     * Matrix 4 x 4
     */
    setPMatrix(m) {
        if (this.gl && this.shaderProgram) {
            this.gl.uniformMatrix4fv(this.pUniform, false, m);
        }
    }
    /**
     * Set the point size.
     * @private
     * @param {number} p
     * Point size
     */
    setPointSize(p) {
        if (this.gl && this.shaderProgram) {
            this.gl.uniform1f(this.psUniform, p);
        }
    }
    /**
     * Set skip translation
     * @private
     */
    setSkipTranslation(flag) {
        if (this.gl && this.shaderProgram) {
            this.gl.uniform1i(this.skipTranslationUniform, flag === true ? 1 : 0);
        }
    }
    /**
     * Set the active texture
     * @private
     * @param {number} texture
     * Texture to activate
     */
    setTexture(texture) {
        if (this.gl && this.shaderProgram) {
            this.gl.uniform1i(this.uSamplerUniform, texture);
        }
    }
    /**
     * Set a uniform value.
     * This uses a hash map to cache uniform locations.
     * @private
     * @param {string} name
     * Name of the uniform to set.
     * @param {number} val
     * Value to set
     */
    setUniform(name, val) {
        if (this.gl && this.shaderProgram) {
            const u = this.uLocations[name] = (this.uLocations[name] ||
                this.gl.getUniformLocation(this.shaderProgram, name));
            this.gl.uniform1f(u, val);
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default WGLShader;
