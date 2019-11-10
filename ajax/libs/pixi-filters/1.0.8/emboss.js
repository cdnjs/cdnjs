/*!
 * pixi-filters - v1.0.8
 * Compiled Tue, 18 Jul 2017 02:26:54 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.emboss = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Make sure PIXI global object is available
if (typeof PIXI === "undefined") {
    throw new Error('pixi.js is required to be included');
}
},{}],2:[function(require,module,exports){


/**
 * An RGB Split Filter.
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 */
function EmbossFilter()
{
    PIXI.Filter.call(this,
        // vertex shader
        "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",
        // fragment shader
        "precision mediump float;\n#define GLSLIFY 1\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n"
    );

    this.strength = 5;
}

EmbossFilter.prototype = Object.create(PIXI.Filter.prototype);
EmbossFilter.prototype.constructor = EmbossFilter;
module.exports = EmbossFilter;

Object.defineProperties(EmbossFilter.prototype, {
    /**
     * Strength of Emboss.
     *
     * @member {PIXI.Point}
     * @memberof PIXI.filters.EmbossFilter#
     */
    strength: {
        get: function ()
        {
            return this.uniforms.strength;
        },
        set: function (value)
        {
            this.uniforms.strength = value;
        }
    },


});

},{}],3:[function(require,module,exports){
require('../check');

var filter = PIXI.filters.EmbossFilter = require('./EmbossFilter');

// Export for requiring
if (typeof module !== 'undefined' && module.exports) {
    module.exports = filter;
}
},{"../check":1,"./EmbossFilter":2}]},{},[3])(3)
});


//# sourceMappingURL=emboss.js.map
