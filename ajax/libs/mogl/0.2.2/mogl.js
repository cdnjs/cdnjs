( function( global ){
var MoGL = (function(){
	var isFactory, isSuperChain, 
		uuidProp, isAliveProp, idProp, 
		uuid, counter, totalCount, 
		MoGL, fn;
	
	//내부용 상수
	isFactory = {factory:1},//팩토리 함수용 식별상수
	isSuperChain = {superChain:1},//생성자체인용 상수
	
	//인스턴스 카운트 시스템
	uuid = 0,//모든 인스턴스는 고유한 uuid를 갖게 됨.
	totalCount = 0, //생성된 인스턴스의 갯수를 관리함
	counter = {}, //클래스별로 관리
	
	//속성지정자용 기술객체
	uuidProp = {value:0},
	isAliveProp = {value:true, writable:true},
	idProp = {value:null, writable:true},
	
	MoGL = function MoGL(){
		uuidProp.value = uuid++;
		Object.defineProperty( this, 'uuid', uuidProp ),
		Object.defineProperty( this, 'isAlive', isAliveProp ),
		Object.defineProperty( this, '_id', idProp ),
		totalCount++;
	},
	fn = MoGL.prototype,
	//id처리기
	Object.defineProperty( fn, 'id', {
		get:function idGet(){return this._id;},
		set:function idSet(v){this._id = v;}
	} ),
	//파괴자
	Object.defineProperty( fn, 'destroy', {
		value:function destroy(){
			var key;
			for( key in this ) if( this.hasOwnProperty(key) ) this[key] = null;
			this.isAlive = false;
			counter[this.constructor.uuid]--;
			totalCount--;
		}
	} ),
	//id setter
	Object.defineProperty( fn, 'setId', {
		value:function setId(v){
			this.id = v;
			return this;
		}
	} ),
	Object.freeze(fn);
	//인스턴스의 갯수를 알아냄
	MoGL.count = function count( cls ){
		if( typeof cls == 'function' ){
			return counter[cls.uuid];
		}else{
			return totalCount;
		}
	},
	//표준 error처리
	MoGL.error = function error( cls, method, id ){
		throw new Error( cls + '.' + method + ':' + id );
	},
	//isAlive확인
	MoGL.isAlive = function isAlive(instance){
		if( !instance.isAlive ) throw new Error( 'Destroyed Object:' + instance );
	};
	//parent클래스를 상속하는 자식클래스를 만들어냄.
	MoGL.ext = function ext( child, parent ){
		var cls, oldProto, newProto, key;
		
		//부모검사
		if( parent !== MoGL && !( 'uuid' in parent ) ) MoGL.error( 'MoGL', 'ext', 0 );
		
		//생성자클래스
		cls = function(){
			var arg, arg0 = arguments[0];
			if( arg0 === isSuperChain ){
				parent.apply( this, arguments[1] ),
				child.apply( this, arguments[1] );
			}else if( this instanceof cls ){
				if( arg0 === isFactory ){
					arg = arguments[1];
				}else{
					arg = arguments;
				}
				parent.call( this, isSuperChain, arg ),
				child.apply( this, arg ),
				Object.seal(this),
				counter[cls.uuid]++;
				return this;
			}else{
				return cls.call( Object.create( cls.prototype), isFactory, arguments );
			}
		};

		//uuid 및 인스턴스카운터 초기화
		Object.defineProperty( cls, 'uuid', {value:uuid++} );
		if( !( cls.uuid in counter ) ) counter[cls.uuid] = 0;
		
		//parent와 프로토타입체인생성
		newProto = Object.create(parent.prototype);
		//기존 child의 프로토타입속성을 복사
		oldProto = child.prototype;
		for( key in oldProto ) if( oldProto.hasOwnProperty(key) ) newProto[key] = oldProto[key];
		//정적 속성을 복사
		for( key in child ) if( child.hasOwnProperty(key) ) cls[key] = child[key];
		//새롭게 프로토타입을 정의함
		cls.prototype = newProto;
		Object.freeze(cls),
		Object.seal(newProto);
		return cls;
    };
	return MoGL;
})();

/**
 * Created by redcamel on 2015-05-07.
 */
var BlendMode = {
    add: 'add', //'add' - 전면색을 배경색에 더하고 올림값 0xFF를 적용.
    alpha: 'alpha',//'alpha' - 전면색의 알파값에 따라 배경색을 덮어가는 가장 일반적인 중첩.
    darken: 'darken',//'darken' - 전면색과 배경색 중 보다 어두운 색상(값이 작은 색상)을 선택.
    difference: 'difference', //'difference' - 전면색과 배경색을 비교하여 둘 중 밝은 색상 값에서 어두운 색상 값을 뺌.
    erase: 'erase', //'erase' - 전면색의 알파만 적용하여 배경색을 지움.
    hardlight: 'hardlight', //'hardlight' - 전면색의 어두운 정도를 기준으로 배경색을 조정.
    invert: 'invert', //'invert' - 전면색을 이용하여 배경색을 반전시킴.
    lighten: 'lighten', //'lighten' - 전면색과 배경색 중 보다 밝은 색(값이 큰 색상)으로 선택.
    multiply: 'multiply', //'multiply' - 전면색에 배경색을 곱하고 0xFF로 나누어 정규화하여 보다 어두운 색을 만듬.
    screen: 'screen', //'screen' - 전면색의 보수(역수)에 배경색 보수를 곱하여 표백 효과를 냄.
    subtract: 'subtract' //'subtract' - 전면색의 값을 배경색에서 빼고 내림값 0을 적용
};
Object.freeze(BlendMode);
/**
 * Created by redcamel on 2015-05-13.
 */
var Filter = {
    anaglyph: 'anaglyph',
    bevel: 'bevel',
    bloom: 'bloom',
    blur: 'blur',
    colorMatrix: 'colorMatrix',
    convolution: 'convolution',
    displacementMap: 'displacementMap',
    fxaa: 'fxaa',
    glow: 'glow',
    invert: 'invert',
    mono: 'mono',
    sepia: 'sepia',
    shadow: 'shadow'
};
Object.freeze(Filter);
/**
 * Created by redcamel on 2015-05-07.
 */
var Vertex = {
    x: 'x', y: 'y', z: 'z',
    r: 'r', g: 'g', b: 'b', a: 'a',
    normalX: 'nx', normalY: 'ny', normalZ: 'nz',
    u: 'u', v: 'v'
}
Object.freeze(Vertex);


/**
 * Created by redcamel on 2015-05-18.
 */
var Shading = {
    none: function none() {
        this._shading.type = 'none';
    },
    gouraud: function gouraud() {
        this._shading.type = 'gouraud';
    },
    phong: function phong() {
        this._shading.type = 'phong';
    },
    blinn: function blinn() {
        this._shading.type = 'blinn';
    },
    flat: function flat() {
        this._shading.type = 'flat';
    },
    toon: function toon() {
        this._shading.type = 'toon';
    }
};
Object.freeze(Shading);


/**
 * Created by redcamel on 2015-05-10.
 */

var VertexShader = {
    baseFunction: "mat4 positionMTX(vec3 t)" +
    "{\n" +
    "   return mat4( 1,0,0,0, 0,1,0,0, 0,0,1,0, t[0],t[1],t[2],1);\n" +
    "}\n" +
    'mat4 scaleMTX(vec3 t)' +
    '{\n' +
    '   return mat4( t[0],0,0,0, 0,t[1],0,0, 0,0,t[2],0, 0,0,0,1);\n' +
    '}\n' +
    'mat4 rotationMTX(vec3 t)' +
    '{\n' +
    '   float s = sin(t[0]);float c = cos(t[0]);\n' +
    '   mat4 m1 = mat4( 1,0,0,0, 0,c,-s,0, 0,s,c,0, 0,0,0,1);s = sin(t[1]);c = cos(t[1]);\n' +
    '   mat4 m2 = mat4(c,0,s,0, 0,1,0,0, -s,0,c,0, 0,0,0,1);s = sin(t[2]);c = cos(t[2]);\n' +
    '   mat4 m3 = mat4(c,-s,0,0, s,c,0,0, 0,0,1,0, 0,0,0,1);\n' +
    '   return m3*m2*m1;\n' +
    '}\n'
}
Object.freeze(VertexShader);
var GLMAT_EPSILON = 0.000001;
var Matrix = (function () {
    /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the "Software"), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:

     The above copyright notice and this permission notice shall be included in
     all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     THE SOFTWARE. */
    /**
     * @class 4x4 Matrix
     * @name Matrix
     */
    var Matrix = {};

    /**
     * Creates a new identity Matrix
     *
     * @returns {Matrix} a new 4x4 matrix
     */
    Matrix.create = function () {
        var out = new Float32Array(16);
        out[0] = 1, out[1] = 0, out[2] = 0, out[3] = 0, out[4] = 0, out[5] = 1, out[6] = 0, out[7] = 0, out[8] = 0, out[9] = 0, out[10] = 1, out[11] = 0, out[12] = 0, out[13] = 0, out[14] = 0, out[15] = 1
        return out
    };

    /**
     * Creates a new Matrix initialized with values from an existing matrix
     *
     * @param {Matrix} a matrix to clone
     * @returns {Matrix} a new 4x4 matrix
     */
    Matrix.clone = function (a) {
        var out = new Float32Array(16);
        out[0] = a[0], out[1] = a[1], out[2] = a[2], out[3] = a[3], out[4] = a[4], out[5] = a[5], out[6] = a[6], out[7] = a[7], out[8] = a[8], out[9] = a[9], out[10] = a[10], out[11] = a[11], out[12] = a[12], out[13] = a[13], out[14] = a[14], out[15] = a[15]
        return out;
    };

    /**
     * Copy the values from one Matrix to another
     *
     * @param {Matrix} out the receiving matrix
     * @param {Matrix} a the source matrix
     * @returns {Matrix} out
     */
    Matrix.copy = function (out, a) {
        out[0] = a[0], out[1] = a[1], out[2] = a[2], out[3] = a[3], out[4] = a[4], out[5] = a[5], out[6] = a[6], out[7] = a[7], out[8] = a[8], out[9] = a[9], out[10] = a[10], out[11] = a[11], out[12] = a[12], out[13] = a[13], out[14] = a[14], out[15] = a[15];
        return out;
    };

    /**
     * Set a Matrix to the identity matrix
     *
     * @param {Matrix} out the receiving matrix
     * @returns {Matrix} out
     */
    Matrix.identity = function (out) {
        out[0] = 1, out[1] = 0, out[2] = 0, out[3] = 0, out[4] = 0, out[5] = 1, out[6] = 0, out[7] = 0, out[8] = 0, out[9] = 0, out[10] = 1, out[11] = 0, out[12] = 0, out[13] = 0, out[14] = 0, out[15] = 1;
        return out;
    };

    /**
     * Inverts a Matrix
     *
     * @param {Matrix} out the receiving matrix
     * @param {Matrix} a the source matrix
     * @returns {Matrix} out
     */
    Matrix.invert = function (out, a) {
        var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
            b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32,
        // Calculate the determinant
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det)    return null
        det = 1.0 / det;
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det, out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det, out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det, out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det, out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det, out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det, out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det, out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det, out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det, out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det, out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det, out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det, out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det, out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det, out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det, out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        return out;
    };

    /**
     * Multiplies two Matrix's
     *
     * @param {Matrix} out the receiving matrix
     * @param {Matrix} a the first operand
     * @param {Matrix} b the second operand
     * @returns {Matrix} out
     */
    Matrix.multiply = function (out, a, b) {
        var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        // Cache only the current line of the second matrix
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30, out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31, out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32, out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
            b0 = b[4], b1 = b[5], b2 = b[6], b3 = b[7],
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30, out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31, out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32, out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
            b0 = b[8], b1 = b[9], b2 = b[10], b3 = b[11],
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30, out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31, out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32, out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
            b0 = b[12], b1 = b[13], b2 = b[14], b3 = b[15],
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30, out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31, out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32, out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
    };

    /**
     * Alias for {@link Matrix.multiply}
     * @function
     */
    Matrix.mul = Matrix.multiply;

    /**
     * Translate a Matrix by the given vector
     *
     * @param {Matrix} out the receiving matrix
     * @param {Matrix} a the matrix to translate
     * @param {vec3} v vector to translate by
     * @returns {Matrix} out
     */
    Matrix.translate = function (out, a, v) {
        var x = v[0], y = v[1], z = v[2], a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;

        if (a === out) {
            out[12] = a[0] * x + a[4] * y + a[8] * z + a[12], out[13] = a[1] * x + a[5] * y + a[9] * z + a[13], out[14] = a[2] * x + a[6] * y + a[10] * z + a[14], out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
        } else {
            a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
                out[0] = a00, out[1] = a01, out[2] = a02, out[3] = a03, out[4] = a10, out[5] = a11, out[6] = a12, out[7] = a13, out[8] = a20, out[9] = a21, out[10] = a22, out[11] = a23, out[12] = a00 * x + a10 * y + a20 * z + a[12], out[13] = a01 * x + a11 * y + a21 * z + a[13], out[14] = a02 * x + a12 * y + a22 * z + a[14], out[15] = a03 * x + a13 * y + a23 * z + a[15]
        }

        return out;
    };

    /**
     * Scales the Matrix by the dimensions in the given vec3
     *
     * @param {Matrix} out the receiving matrix
     * @param {Matrix} a the matrix to scale
     * @param {vec3} v the vec3 to scale the matrix by
     * @returns {Matrix} out
     **/
    Matrix.scale = function (out, a, v) {
        var x = v[0], y = v[1], z = v[2];
        out[0] = a[0] * x, out[1] = a[1] * x, out[2] = a[2] * x, out[3] = a[3] * x, out[4] = a[4] * y, out[5] = a[5] * y, out[6] = a[6] * y, out[7] = a[7] * y, out[8] = a[8] * z, out[9] = a[9] * z, out[10] = a[10] * z, out[11] = a[11] * z, out[12] = a[12], out[13] = a[13], out[14] = a[14], out[15] = a[15];
        return out;
    };

    /**
     * Rotates a Matrix by the given angle around the given axis
     *
     * @param {Matrix} out the receiving matrix
     * @param {Matrix} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @param {vec3} axis the axis to rotate around
     * @returns {Matrix} out
     */
    Matrix.rotate = function (out, a, rad, axis) {
        var x = axis[0], y = axis[1], z = axis[2], len = Math.sqrt(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
        if (Math.abs(len) < GLMAT_EPSILON) { return null; }
        len = 1 / len, x *= len, y *= len, z *= len,
            s = Math.sin(rad), c = Math.cos(rad), t = 1 - c,
            a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
            // Construct the elements of the rotation matrix
            b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s, b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s, b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c,
            // Perform rotation-specific matrix multiplication
            out[0] = a00 * b00 + a10 * b01 + a20 * b02, out[1] = a01 * b00 + a11 * b01 + a21 * b02, out[2] = a02 * b00 + a12 * b01 + a22 * b02, out[3] = a03 * b00 + a13 * b01 + a23 * b02, out[4] = a00 * b10 + a10 * b11 + a20 * b12, out[5] = a01 * b10 + a11 * b11 + a21 * b12, out[6] = a02 * b10 + a12 * b11 + a22 * b12, out[7] = a03 * b10 + a13 * b11 + a23 * b12, out[8] = a00 * b20 + a10 * b21 + a20 * b22, out[9] = a01 * b20 + a11 * b21 + a21 * b22, out[10] = a02 * b20 + a12 * b21 + a22 * b22, out[11] = a03 * b20 + a13 * b21 + a23 * b22
        if (a !== out) out[12] = a[12], out[13] = a[13], out[14] = a[14], out[15] = a[15];
        return out
    };

    /**
     * Rotates a matrix by the given angle around the X axis
     *
     * @param {Matrix} out the receiving matrix
     * @param {Matrix} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {Matrix} out
     */
    Matrix.rotateX = function (out, a, rad) {
        var s = Math.sin(rad), c = Math.cos(rad), a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        if (a !== out) out[0] = a[0], out[1] = a[1], out[2] = a[2], out[3] = a[3], out[12] = a[12], out[13] = a[13], out[14] = a[14], out[15] = a[15]
        // Perform axis-specific matrix multiplication
        out[4] = a10 * c + a20 * s, out[5] = a11 * c + a21 * s, out[6] = a12 * c + a22 * s, out[7] = a13 * c + a23 * s, out[8] = a20 * c - a10 * s, out[9] = a21 * c - a11 * s, out[10] = a22 * c - a12 * s, out[11] = a23 * c - a13 * s;
        return out;
    };

    /**
     * Rotates a matrix by the given angle around the Y axis
     *
     * @param {Matrix} out the receiving matrix
     * @param {Matrix} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {Matrix} out
     */
    Matrix.rotateY = function (out, a, rad) {
        var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        if (a !== out) out[4] = a[4], out[5] = a[5], out[6] = a[6], out[7] = a[7], out[12] = a[12], out[13] = a[13], out[14] = a[14], out[15] = a[15];
        out[0] = a00 * c - a20 * s, out[1] = a01 * c - a21 * s, out[2] = a02 * c - a22 * s, out[3] = a03 * c - a23 * s, out[8] = a00 * s + a20 * c, out[9] = a01 * s + a21 * c, out[10] = a02 * s + a22 * c, out[11] = a03 * s + a23 * c;
        return out;
    };

    /**
     * Rotates a matrix by the given angle around the Z axis
     *
     * @param {Matrix} out the receiving matrix
     * @param {Matrix} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {Matrix} out
     */
    Matrix.rotateZ = function (out, a, rad) {
        var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        if (a !== out) out[8] = a[8], out[9] = a[9], out[10] = a[10], out[11] = a[11], out[12] = a[12], out[13] = a[13], out[14] = a[14], out[15] = a[15]
        // Perform axis-specific matrix multiplication
        out[0] = a00 * c + a10 * s, out[1] = a01 * c + a11 * s, out[2] = a02 * c + a12 * s, out[3] = a03 * c + a13 * s, out[4] = a10 * c - a00 * s, out[5] = a11 * c - a01 * s, out[6] = a12 * c - a02 * s, out[7] = a13 * c - a03 * s;
        return out;
    };


    Matrix._frustum = function (a, b, c, d, e, g, f) {
        var h = b - a, i = d - c, j = g - e;
        return f || (f = Matrix.create()), f[0] = e * 2 / h, f[1] = 0, f[2] = 0, f[3] = 0, f[4] = 0, f[5] = e * 2 / i, f[6] = 0, f[7] = 0, f[8] = (b + a) / h, f[9] = (d + c) / i, f[10] = -(g + e) / j, f[11] = -1, f[12] = 0, f[13] = 0, f[14] = -(g * e * 2) / j, f[15] = 0, f
    }

    /**
     * Generates a perspective projection matrix with the given bounds
     *
     * @param {Matrix} out Matrix frustum matrix will be written into
     * @param {number} fovy Vertical field of view in radians
     * @param {number} aspect Aspect ratio. typically viewport width/height
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @returns {Matrix} out
     */
        //mat4.perspective(this.fov, GL._w / GL._h, this.near, this.far, mtx);
    Matrix.perspective = function (fov, aspect, near, far, out) {
        return fov = near * Math.tan(fov * Math.PI / 360), aspect = fov * aspect, Matrix._frustum(-aspect, aspect, -fov, fov, near, far, out)
    };

    /**
     * Generates a look-at matrix with the given eye position, focal point, and up axis
     *
     * @param {Matrix} out Matrix frustum matrix will be written into
     * @param {vec3} eye Position of the viewer
     * @param {vec3} center Point the viewer is looking at
     * @param {vec3} up vec3 pointing up
     * @returns {Matrix} out
     */
    Matrix.lookAt = function (out, eye, center, up) {
        var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2], centerx = center[0], centery = center[1], centerz = center[2];
        if (Math.abs(eyex - centerx) < GLMAT_EPSILON && Math.abs(eyey - centery) < GLMAT_EPSILON && Math.abs(eyez - centerz) < GLMAT_EPSILON) return Matrix.identity(out);
        z0 = eyex - centerx, z1 = eyey - centery, z2 = eyez - centerz, len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2), z0 *= len, z1 *= len, z2 *= len, x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0, len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) x0 = 0, x1 = 0, x2 = 0;
        else len = 1 / len, x0 *= len, x1 *= len, x2 *= len
        y0 = z1 * x2 - z2 * x1, y1 = z2 * x0 - z0 * x2, y2 = z0 * x1 - z1 * x0, len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) y0 = 0, y1 = 0, y2 = 0;
        else len = 1 / len, y0 *= len, y1 *= len, y2 *= len;
        out[0] = x0, out[1] = y0, out[2] = z0, out[3] = 0,
            out[4] = x1, out[5] = y1, out[6] = z1, out[7] = 0,
            out[8] = x2, out[9] = y2, out[10] = z2, out[11] = 0,
            out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez), out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez), out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez), out[15] = 1;
        return out;
    };

    /**
     * Returns a string representation of a Matrix
     *
     * @param {Matrix} mat matrix to represent as a string
     * @returns {String} string representation of the matrix
     */
    Matrix.str = function (a) {
        return 'Matrix(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
            a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
            a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
            a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
    };
    return Matrix;
})();
/**
 * Created by redcamel on 2015-05-05.
 * description
 정점배열과 인덱스 배열을 이용하여 기하구조를 정의함.
 생성자에서 지정된 버퍼 및 정보는 변경불가로 생성 이후는 읽기만 가능함.
 */
var Geometry = (function () {
    //그중에 자신의 4좌표랑 7uv랑 8rgba랑 9노말은 지오메트리거고
    var Geometry, fn;
    Geometry = function Geometry(vertex, index, info) {
        var i, len, t, t2,
        isFloat32 = vertex instanceof Float32Array,
        isUint16 = index instanceof Uint16Array
        if (!(Array.isArray(vertex) || isFloat32 )) MoGL.error('Geometry', 'constructor', 0)
        if (!(Array.isArray(index) || isUint16  )) MoGL.error('Geometry', 'constructor', 1)
        if (info) {
            i = info.length
            if(vertex.length % i) MoGL.error('Geometry', 'constructor', 2)
            while(i--) info[info[i]] = i
            //console.log(info)
        }
        /////////////////////////////////////
        t = arguments[2] ? arguments[2].length : 3
        this._vertexCount = vertex.length / t,
        this._triangleCount = index.length / 3,
        this._vertexShaders = {},
        this._position = [],
        this._normal = [],
        this._uv = [],
        this._color = [],
        this._volume=null,
        this._key = null
        ///////////////////////////////
        //TODO 노말,UV,컬러없을떄 판별
        if (arguments[2]) {
            for (i = 0, len = vertex.length / t; i < len; i++) {
                t2 = t * i,
                this._position.push(vertex[t2 + info.x], vertex[t2 + info.y], vertex[t2 + info.z]),
                info.nx ? this._normal.push(vertex[t2 + info.nx], vertex[t2 + info.ny], vertex[t2 + info.nz]) : 0,
                info.u ? this._uv.push(vertex[t2 + info.u], vertex[t2 + info.v]) : 0,
                info.r ? this._color.push(vertex[t2 + info.r], vertex[t2 + info.g], vertex[t2 + info.b], vertex[t2 + info.a]) : 0
            }
            this._position = new Float32Array(this._position),
            this._uv = new Float32Array(this._uv),
            this._color = new Float32Array(this._color)
        } else this._position = isFloat32 ? vertex : new Float32Array(vertex)
        //TODO Uint32Array을 받아줄것인가! 고민해야됨..
        this._index = isUint16 ? index : new Uint16Array(index)
        if(this._normal.length==0) this._normal = new Float32Array(calculateNormals(this._position, this._index))
        else this._normal = new Float32Array(this._normal)
        ///////////////////////////////
    }
    var calculateNormals = function calculateNormals(v, i) {
        var x = 0, y = 1, z = 2, j, k, len, mSqt = Math.sqrt, ns = [], v1 = [], v2 = [], n0 = [], n1 = [];
        for (j = 0, len = v.length; j < len; j++) ns[j] = 0.0;
        for (j = 0, len = i.length; j < len; j = j + 3) {
            v1 = [], v2 = [], n0 = [], v1[x] = v[3 * i[j + 1] + x] - v[3 * i[j] + x], v1[y] = v[3 * i[j + 1] + y] - v[3 * i[j] + y], v1[z] = v[3 * i[j + 1] + z] - v[3 * i[j] + z], v2[x] = v[3 * i[j + 2] + x] - v[3 * i[j + 1] + x], v2[y] = v[3 * i[j + 2] + y] - v[3 * i[j + 1] + y], v2[z] = v[3 * i[j + 2] + z] - v[3 * i[j + 1] + z], n0[x] = v1[y] * v2[z] - v1[z] * v2[y], n0[y] = v1[z] * v2[x] - v1[x] * v2[z], n0[z] = v1[x] * v2[y] - v1[y] * v2[x];
            for (k = 0; k < 3; k++) ns[3 * i[j + k] + x] = ns[3 * i[j + k] + x] + n0[x], ns[3 * i[j + k] + y] = ns[3 * i[j + k] + y] + n0[y], ns[3 * i[j + k] + z] = ns[3 * i[j + k] + z] + n0[z]
        }
        for (var i = 0, len = v.length; i < len; i = i + 3) {
            n1 = [], n1[x] = ns[i + x], n1[y] = ns[i + y], n1[z] = ns[i + z];
            var len = mSqt((n1[x] * n1[x]) + (n1[y] * n1[y]) + (n1[z] * n1[z]));
            if (len == 0) len = 0.00001;
            n1[x] = n1[x] / len, n1[y] = n1[y] / len, n1[z] = n1[z] / len, ns[i + x] = n1[x], ns[i + y] = n1[y], ns[i + z] = n1[z];
        }
        return ns;
    }
    fn = Geometry.prototype,
    fn.addVertexShader = function addVertexShader(id) { MoGL.isAlive(this);
        // TODO 마일스톤0.5
        this._vertexShaders[id] = id
        return this
    },
    fn.getVertexCount = function getVertexCount() { MoGL.isAlive(this);
        return this._vertexCount
    },
    fn.getTriangleCount = function getTriangleCount() { MoGL.isAlive(this);
        return this._triangleCount
    },
    fn.getVolume = function getVolume() { MoGL.isAlive(this);
        if (!this._volume) {
            var minX = 0, minY = 0, minZ = 0, maxX = 0, maxY = 0, maxZ = 0
            var t0, t1, t2, t = this._position, i = t.length
            while (i--) {
                t0 = i * 3, t1 = t0 + 1, t2 = t0 + 2
                minX = t[t0] < minX ? t[t0] : minX,
                maxX = t[t0] > maxX ? t[t0] : maxX,
                minY = t[t1] < minY ? t[t1] : minY,
                maxY = t[t1] > maxY ? t[t1] : maxY,
                minZ = t[t2] < minZ ? t[t2] : minZ,
                maxZ = t[t2] > maxZ ? t[t2] : maxZ
            }
            this._volume = [maxX - minX, maxY - minY, maxZ - minZ]
        }
        return this._volume
    },
    fn.removeVertexShader = function removeVertexShader(id) { MoGL.isAlive(this);
        // TODO 마일스톤0.5
        return delete this._vertexShaders[id], this
    }
    return MoGL.ext(Geometry, MoGL);
})();
/**
 * Created by redcamel on 2015-05-05.
 */
var Material = (function () {
    var Material, fn;
    var hex, hex_s;
    hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, hex_s = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;
    Material = function Material() {
        this._textures = {},
        this._shading = {type: 'none', lambert: 1},
        this._diffuse = {__indexList: []},
        this._normal = {__indexList: []},
        this._specular = {__indexList: []},
        this._diffuseWrap = {__indexList: []},
        this._specularNormal = {__indexList: []},
        this._r = 1, this._rw = Math.random(),
        this._g = 1, this._gw = Math.random(),
        this._b = 1, this._bw = Math.random(),
        this._a = 1,
        this._wireFrame = 0,
        this._count = 0,
        this._scene = null,
        this._key = null,
        this.setBackgroundColor.apply(this, arguments);
    },
    fn = Material.prototype,
    fn.addTexture = function addTexture(type,textureID/*,index,blendMode*/) { MoGL.isAlive(this);
        var t = this._scene;
        if (t && !t._textures[textureID]) MoGL.error('Material', 'addTexture', 0);
        if (this._textures[textureID]) MoGL.error('Material', 'addTexture', 1);
        this._textures[textureID] = {id: textureID, type: type};
        var result;
        console.log('type :', '_' + type);
        console.log('확인', this['_' + type],this['_' + type].__indexList.length);
        //배열화
        if (arguments[2] !=undefined) {
            var idx = arguments[2] >this['_' + type].__indexList.length ? this['_' + type].__indexList.length : arguments[2]
            result = this['_' + type].__indexList.splice(idx, 0, {id: textureID, blendMode: arguments[3]});
        }
        else result = this['_' + type].__indexList.push({id: textureID, blendMode: arguments[3]});
        return this;
    },
    fn.getRefCount = function getRefCount(){ MoGL.isAlive(this);
        return this._count;
    },
    fn.removeTexture = function removeTexture(textureID){ MoGL.isAlive(this);
        var t = this._textures[textureID];
        if(!t) return this;
        var type = this._textures[textureID].type;
        var typeList = this['_' + type].__indexList;
        var i = typeList.length;
        while (i--) {
            if (typeList[i].id == textureID) {
                typeList.splice(i, 1);
                break
            }
        }
        delete this._textures[textureID];
        console.log('확인', this['_' + type]);
        return this;
    },
    //    fn.removeTexture = function removeTexture(type,textureID){ MoGL.isAlive(this);
    //        console.log('지울텍스쳐',type,textureID)
    //        console.log(this)
    //        var typeList = this['_' + type].__indexList
    //        var i = typeList.length
    //        while (i--) {
    //            if (typeList[i].id == textureID) {
    //                typeList.splice(i, 1)
    //                break
    //            }
    //        }
    //        delete this._textures[textureID]
    //        console.log('확인', this['_' + type])
    //        return this
    //    },
    fn.setBackgroundColor = function setBackgroundColor(){ MoGL.isAlive(this);
        var t0 = arguments[0], t1, ta;
        if (arguments.length == 1) {
            if (t0.length > 7) ta = +t0.substr(7), t0 = t0.substr(0, 7);
            if (t0.charAt(0) == '#') {
                if (t1 = hex.exec(t0)) {
                    this._r = parseInt(t1[1], 16) / 255,
                    this._g = parseInt(t1[2], 16) / 255,
                    this._b = parseInt(t1[3], 16) / 255;
                } else {
                    t1 = hex_s.exec(t0),
                    this._r = parseInt(t1[1] + t1[1], 16) / 255,
                    this._g = parseInt(t1[2] + t1[2], 16) / 255,
                    this._b = parseInt(t1[3] + t1[3], 16) / 255;
                }
                this._a = ta ? ta > 1 ? 1 : ta : 1;
            }
        } else {
            this._r = arguments[0] ? arguments[0] : Math.random(),
            this._g = arguments[1] ? arguments[1] : Math.random(),
            this._b = arguments[2] ? arguments[2] : Math.random(),
            this._a = arguments[3] ? arguments[3] : 1;
        }
    },
    fn.setWireFrame = function setWireFrame(isVisible){ MoGL.isAlive(this);
        this._wireFrame = isVisible;
        var t0 = arguments[1], t1, ta;
        if (arguments.length == 2) {
            if (t0.length > 7) ta = +t0.substr(7), t0 = t0.substr(0, 7);
            if (t1 = hex.exec(t0)) {
                this._rw = parseInt(t1[1], 16) / 255,
                this._gw = parseInt(t1[2], 16) / 255,
                this._bw = parseInt(t1[3], 16) / 255;
            } else {
                t1 = hex_s.exec(t0),
                this._rw = parseInt(t1[1] + t1[1], 16) / 255,
                this._gw = parseInt(t1[2] + t1[2], 16) / 255,
                this._bw = parseInt(t1[3] + t1[3], 16) / 255;
            }
        }
    },
    fn.setShading = function setShading(type){ MoGL.isAlive(this);
        type.apply(this);
    },
    fn.setLambert = function setShading(rate){ MoGL.isAlive(this);
        this._shading.lambert = rate;
    };
    return MoGL.ext(Material, MoGL);
})();
/**
 * Created by redcamel on 2015-05-05.
 */
var Texture = {
    zoomOut: 'zoomOut', //'zoomOut' - 이미지를 축소하여 2의 n에 맞춤.
    zoomIn: 'zoomIn', //'zoomIn' - 이미지를 확대하여 2의 n에 맞춤.
    crop: 'crop', //'crop' - 이미지를 2의 n에 맡게 좌상단을 기준으로 잘라냄.
    addSpace: 'addSpace', //' - 이미지를 2의 n에 맡게 여백을 늘림.
    diffuse: 'diffuse', //' - 디퓨즈 맵으로 등록함.
    specular: 'specular', //' - 스페큘러 맵으로 등록함.
    diffuseWrap: 'diffuseWrap', //' - 디퓨즈랩 맵으로 등록함.
    normal: 'normal', // - 노말 맵으로 등록함.
    specularNormal: 'specularNormal' // - 스페큘러노말 맵으로 등록함.
};
Object.freeze(Texture);
/**
 * Created by redcamel on 2015-05-08.
 */
// TODO 기본으로 버텍스좌표, 노말좌표 정도까지는 알아야되는겐가?
var Primitive = (function () {
    var mS = Math.sin, mC = Math.cos, PI = Math.PI, RADIAN = PI / 180, mSqt = Math.sqrt, D2R = Math.PI / 180, R2D = 180 / Math.PI, TPI = Math.PI * 2, HPI = Math.PI / 2
    return {
        cube: function cube(/*splitX, splitY, splitZ*/) {
            // TODO 내장된 Geometry. 각 정육면체 구조를 생성함.
            // TODO ?splitX, splitY, splitZ - 각 면당 분할할 수. 생략시 1로 지정됨.
            // TODO scene.addChild( 'cube1', new Mesh( Primitive.cube( 2, 3, 1 ), new Material() );
            var result
            return result // TODO  어떤 지오메트리를 넘겨주는군
        },
        geodesic: function geodesic(/*split*/) {
            // TODO 내장된 Geometry. 극점에서 폴리곤이 몰리지 않도록 Geodesic 형태로 생성되는 구의 구조.
            // TODO ?split - 쪼개질 다각형의 갯수. 생략하거나 30이하의 값이 오면 30이 됨.
            // TODO scene.addChild( 'geo0', new Mesh( Primitive.geodesic(30), new Material() );

            var radius = 1, fractures = 5, yUp = true;
            var hnLat = fractures + 1; //위도 방향 쪼갠수/2
            var nLat = 2 * hnLat; //위도 방향 쪼갠수
            var nLon; //위도에 대한 경도 방향 쪼갠수 
            var lon; //경도 (단위:라디안)
            var lat; //위도(단위:라디안)
            var dLat = 180 / nLat * D2R; //위도 간격(단위:라디안)
            var dLon; //경도  간격(단위:라디안)
            var i, j, x, y, z, sinLat, cosLat, sinLon, cosLon, u, v;
            var _vertices=[], _indices = []
            // latitude -90->0 :
            x = 0, y = 0, z = -radius
            yUp ? _vertices.push(x, -z, y, 0, 0) : _vertices.push(x, y, z, 0, 0);
            for (i = 0; i < hnLat; i++) {
                nLon = 4 * (i + 1); //경도방향 꼭지점수 4, 8, 12, 16, 20...
                dLon = 360 / nLon * D2R, lat = -HPI + (i + 1) * dLat, v = (HPI + lat) / PI, sinLat = mS(lat), cosLat = mC(lat),z = radius * sinLat
                for (j = 0; j <= nLon; j++) lon = j * dLon, sinLon = mS(lon), cosLon = mC(lon), x = radius * cosLat * cosLon, y = radius * cosLat * sinLon, u = lon / TPI, yUp ? _vertices.push(x, -z, y, u, v) : _vertices.push(x, y, z, u, v);
            }
            //latitude 0 -> 90
            for (i=1; i < hnLat; i++) {
                nLon = 4 * (hnLat - i), dLon = 360 / nLon * D2R, lat = dLat * i, v = (HPI + lat) / PI, sinLat = mS(lat), cosLat = mC(lat), z = radius * sinLat
                for (j = 0; j <= nLon; j++) lon = j * dLon, sinLon = mS(lon), cosLon = mC(lon), x = radius * cosLat * cosLon, y = radius * cosLat * sinLon, u = lon / TPI, yUp ? _vertices.push(x, -z, y, u, v) : _vertices.push(x, y, z, u, v);
            }
            x = 0, y = 0, z = radius, yUp ? _vertices.push(x, -z, y, u, v) : _vertices.push(x, y, z, u, v);
            var k, pt0, pt1, pt2, u_idx_start, u_idx_end, u_idx, l_idx_start, l_idx_end, l_idx, isUp, tris, triIdx
            //Latitude -90->0
            tris = 1, u_idx_start = 0, u_idx_end = 0
            for (i=0; i < hnLat; ++i) {
                l_idx_start = u_idx_start, l_idx_end = u_idx_end, u_idx_start += 4 * i + 1, u_idx_end += 4 * (i + 1) + 1, l_idx = l_idx_start, u_idx = u_idx_start;
                //4분면을 따라 Face를 만들도록 한다.
                for (k=0; k < 4; ++k) {
                    isUp=1
                    for (triIdx=0; triIdx < tris; ++triIdx) {
                        if (isUp === 1)pt0 = l_idx, pt2 = u_idx, u_idx++, pt1 = u_idx, isUp = 0;
                        else pt0 = u_idx, pt1 = l_idx, l_idx++, pt2 = l_idx, isUp = 1;
                        _indices.push(pt0, pt1, pt2);
                    }
                }
                tris+=2; //한개의 분면에서 해당 적위에 대한 면의 수는 2씩 증가한다. 
            }
            //Latitude 0 -> 90
            for (i = hnLat - 1; i >= 0; i--) {
                l_idx_start = u_idx_start,
                l_idx_end = u_idx_end,
                u_idx_start = u_idx_start + 4 * (i + 1) + 1,
                u_idx_end = u_idx_end + 4 * i + 1,
                tris -= 2,
                u_idx = u_idx_start,
                l_idx = l_idx_start
                for (k = 0; k < 4; ++k) {
                    isUp = 0;
                    for (triIdx = 0; triIdx < tris; triIdx++) {
                        if (isUp === 1) pt0 = l_idx, pt2 = u_idx, u_idx++, pt1 = u_idx, isUp = 0;
                        else pt0 = u_idx, pt1 = l_idx, l_idx++, pt2 = l_idx, isUp = 1;
                        _indices.push(pt0, pt1, pt2);
                    }
                }
            }
            var result = new Geometry(_vertices, _indices, [Vertex.x, Vertex.y, Vertex.z,Vertex.u,Vertex.v])
            result._key = 'geodesic' + ( arguments[0] || 1) + '_' + (arguments[1] || 1)
            return result
        },
        line: function line(x1, y1, z1, x2, y2, z2 /*,width*/) {
            // TODO 내장된 Geometry. 두 점을 지나는 직선.
            // TODO x1, y1, z1, x2, y2, z2 - 직선이 지나갈 두점(x1, y1, z1 에서 x2, y2, z2)
            // TODO ?width - 직선의 두께. 생략하면 1.
            // TODO scene.addChild( 'l', new Mesh( Primitive.line( 0,0,0, 10,10,10, 2 ), new Material() );
            var result
            return result
        },
        plane: function plane(/*splitX, splitY*/) {
            //TODO 이걸 계산해서 넘겨야 되는군
            var vs, is
            vs = [
                1.0, 1.0, 0.0,// 0.0, 0.0,
                -1.0, 1.0, 0.0, //1.0, 0.0,
                1.0, -1.0, 0.0, //0.0, 1.0,
                -1.0, -1.0, 0.0//, //1.0, 1.0
            ]
            is = [0, 1, 2, 1, 2, 3]


            var result = new Geometry(vs, is, [Vertex.x, Vertex.y, Vertex.z])
            result._key = 'plane_' + ( arguments[0] || 1) + '_' + (arguments[1] || 1)
            return result
        },
        point: function point(/*width*/) {
            // TODO 내장된 Geometry. 하나의 점을 나타내는 구조.
            // TODO ?width - 점의 지름. 생략하면 1.
            // TODO scene.addChild( 'p', new Mesh( Primitive.point(5), new Material() );
            var result
            return result
        },
        sphere: function sphere(/*split*/) {
            // TODO 헉!! 노말도 계산해서 넘겨야되!!!
            var vertices = [];
            var indices = [];

            var latitudeBands = 8;
            var longitudeBands = 8;
            var radius = 1.0;

            for (var latNumber = 0; latNumber <= latitudeBands; ++latNumber) {
                var theta = latNumber * Math.PI / latitudeBands;
                var sinTheta = mS(theta);
                var cosTheta = mC(theta);

                for (var longNumber = 0; longNumber <= longitudeBands; ++ longNumber) {
                    var phi = longNumber * 2 * Math.PI / longitudeBands;
                    var sinPhi = mS(phi);
                    var cosPhi = mC(phi);

                    var x = cosPhi * sinTheta;
                    var y = cosTheta;
                    var z = sinPhi * sinTheta;
                    var u = 1 - longNumber / longitudeBands;
                    var v = 1 - latNumber / latitudeBands;
                    vertices.push(radius * x, radius * y, radius * z,u, v);
                }
            }

            for (latNumber = 0; latNumber < latitudeBands; ++latNumber) {
                for (longNumber = 0; longNumber < longitudeBands; ++ longNumber) {
                    var first = latNumber * (longitudeBands + 1) + longNumber;
                    var second = first + longitudeBands + 1;
                    indices.push(second, first, first + 1, second + 1, second, first + 1);
                }
            }

            var result = new Geometry(vertices, indices, [Vertex.x, Vertex.y, Vertex.z, Vertex.u, Vertex.v])
            result._key = 'sphere_' + ( arguments[0] || 1)
            return result
        },
        skybox: function skybox(/*splitX, splitY, splitZ*/) {
            // TODO 내장된 Geometry. 큐브형태의 구조로 각 평면이 내부를 바라보도록 되어있음.
            // TODO ?splitX, splitY, splitZ - 각 면당 분할할 수. 생략시 1로 지정됨.
            // TODO scene.addChild( 'box', new Mesh( Primitive.skybox( 5, 5, 5 ), new Material() );
            var result
            return result
        },
        polygon: function polygon(n, radius) {
            if (n < 3) MoGL.error('Primitive', 'polygon', 0);
            var perAngle = Math.PI*2/(n-1)
            var vs = [0,0,0,0.5,0.5],is = [],i
            for(i =0; i<n; i++){
                vs.push(mS(perAngle*i),mC(perAngle*i),0,  -mS(perAngle*i)/2+0.5,-mC(perAngle*i)/2+0.5)
            }
            for (i = 0; i < n-1; i++) {
                is.push(0, i + 1, i  + 2)
            }
            var result = new Geometry(vs, is, [Vertex.x, Vertex.y, Vertex.z, Vertex.u, Vertex.v]);
            result._key = 'polygon_' + (arguments[0] || 1);
            return result;
        }
    }
})()

/**
 * Created by redcamel on 2015-05-04.
 * description
 기하구조와 재질을 포함할 수 있는 하나의 렌더링 단위인 Mesh를 생성함.
 Mesh는 장면 내에 아핀변환에 대응하는 행렬정보를 갖음. 이에 따라 비가시객체인 Camera 등도 Mesh를 상속하게 됨.
 id를 인자로 지정하면 Scene에 addChild하는 순간 id를 바인딩하며 실패하면 등록되지 않음.
 객체를 인자로 지정하면 Scene에 addChild하는 순간 Mesh내부의 Geometry나 Material이 임의의 id로 자동등록되며, shader Id가 존재하지 않으면 예외가 발생함( addChild 참조 )
 */
var Mesh = (function () {
    var SQRT = Math.sqrt, ATAN2 = Math.atan2, ASIN = Math.asin, COS = Math.cos, PIH = Math.PI * 0.5, PERPI = 180 / Math.PI
    var Mesh, fn;
    var F3, F3_2;
    F3 = new Float32Array(3), F3_2 = new Float32Array(3),
    Mesh = function Mesh(geometry, material) {
        // TODO 어디까지 허용할건가..
        if (geometry && !(typeof geometry == 'string' || geometry instanceof Geometry  )) MoGL.error('Mesh', 'contructor', 0)
        if (material && !(typeof material == 'string' || material instanceof Material  )) MoGL.error('Mesh', 'contructor', 1)
        this._geometry = geometry,
        this._material = material,
        this._scene = null,
        this._parent = null,
        this._matrix = Matrix.create()
        this.rotateX = 0, this.rotateY = 0, this.rotateZ = 0,
        this.scaleX = 1, this.scaleY = 1, this.scaleZ = 1,
        this.x = 0, this.y = 0, this.z = 0
    },
    fn = Mesh.prototype,
    fn.getGeometry = function getGeometry() { MoGL.isAlive(this);
        return this._scene ? this._geometry : null
    },
    fn.getMaterial = function getMaterial() { MoGL.isAlive(this);
        return this._scene ? this._material : null
    },
    fn.getMatrix = function getMatrix() { MoGL.isAlive(this);
        Matrix.identity(this._matrix)
        F3[0] = this.scaleX, F3[1] = this.scaleY, F3[2] = this.scaleZ
        Matrix.scale(this._matrix, this._matrix, F3)
        Matrix.rotateX(this._matrix, this._matrix, this.rotateX)
        Matrix.rotateY(this._matrix, this._matrix, this.rotateY)
        Matrix.rotateZ(this._matrix, this._matrix, this.rotateZ)
        F3[0] = this.x, F3[1] = this.y, F3[2] = this.z
        Matrix.translate(this._matrix, this._matrix, F3)
        return this._matrix
    },
    fn.getParent = function getParent() { MoGL.isAlive(this);
        return this._parent ? this._parent : null
    },
    fn.getPosition = function getPosition() { MoGL.isAlive(this);
        return F3[0] = this.x, F3[1] = this.y, F3[2] = this.z, F3
    },
    fn.getRotate = function getRotate() { MoGL.isAlive(this);
        return F3[0] = this.rotateX, F3[1] = this.rotateY, F3[2] = this.rotateZ, F3
    },
    fn.getScale = function getScale() { MoGL.isAlive(this);
        return F3[0] = this.scaleX, F3[1] = this.scaleY, F3[2] = this.scaleZ, F3
    },
    ///////////////////////////////////////////////////
    // set
    fn.setGeometry = function setGeometry(geometry) { MoGL.isAlive(this);
        if (!(geometry instanceof Geometry || typeof geometry == 'string')) MoGL.error('Mesh', 'setGeometry', 0)
        if (this._scene) {
            if (this._geometry = typeof geometry == 'string') this._geometry = this._scene._geometrys[geometry]
            else this._geometry = geometry
            this._geometry._key = this._geometry._key || geometry
        }
        else this._geometry = geometry
        return this
    },
    fn.setMaterial = function setMaterial(material) { MoGL.isAlive(this);
        if (!(material instanceof Material || typeof material == 'string')) MoGL.error('Mesh', 'setMaterial', 0)
        if (this._scene) {
            if (this._material = typeof material == 'string') this._material = this._scene._materials[material]
            else this._material = material
            this._material._key = this._material._key || material
        }
        else this._material = material
        return this
    },
    fn.lookAt = function looAt(x,y,z){MoGL.isAlive(this);
        Matrix.identity(this._matrix),
        F3[0] = this.x, F3[1] = this.y, F3[2] = this.z,
        F3_2[0] = x, F3_2[1] = y, F3_2[2] = z,
        Matrix.lookAt(this._matrix, F3, F3_2, [0, 1, 0]),
        Matrix.translate(this._matrix, this._matrix, F3)

        var d = this._matrix;
        var d11 = d[0], d12 = d[1], d13 = d[2], d21 = d[4], d22 = d[5], d23 = d[6], d31 = d[8], d32 = d[9], d33 = d[10];
        var radianX, radianY, radianZ;
        var md31 = -d31;

        if (md31 <= -1) radianY = -Math.PI * 0.5;
        else if (1 <= md31) radianY = Math.PI * 0.5;
        else radianY = Math.asin(md31);
        var cosY = Math.cos(radianY);
        if (cosY <= 0.001) radianZ = 0, radianX = Math.atan2(-d23, d22)
        else radianZ = Math.atan2(d21, d11), radianX = Math.atan2(d32, d33)
        this.rotateX = radianX,
        this.rotateY = radianY
        this.rotateZ = radianZ
        //var dx = x - this.x;
        //var dy = y - this.y;
        //var dz = z - this.z;
        //this.rotationX = Math.atan2(dz, Math.sqrt(dx * dx + dy * dy)) - Math.PI / 2;
        //this.rotationY = 0;
        //this.rotationZ = -Math.atan2(dx, dy);
    },
    fn.setPosition = function setPosition() { MoGL.isAlive(this);
        var len, arg0;
        len = arguments.length, arg0 = arguments[0];
        if (len == 1 && arg0 instanceof Array) this.x = arg0[0], this.y = arg0[1], this.z = arg0[2];
        else if (len > 2) this.x = arguments[0], this.y = arguments[1], this.z = arguments[2];
        else this.x = 0, this.y = 0, this.z = 0;
        return this;
    },
    fn.setRotate = function setRotate() { MoGL.isAlive(this);
        var len, arg0;
        len = arguments.length, arg0 = arguments[0];
        if (len == 1 && arg0 instanceof Array) this.rotateX = arg0[0], this.rotateY = arg0[1], this.rotateZ = arg0[2];
        else if (len > 2) this.rotateX = arguments[0], this.rotateY = arguments[1], this.rotateZ = arguments[2];
        else this.rotateX = 0, this.rotateY = 0, this.rotateZ = 0;
        return this;
    },
    fn.setScale = function setScale() { MoGL.isAlive(this);
        var len, arg0;
        len = arguments.length, arg0 = arguments[0];
        if (len == 1 && arg0 instanceof Array) this.scaleX = arg0[0], this.scaleY = arg0[1], this.scaleZ = arg0[2];
        else if (len > 2) this.scaleX = arguments[0], this.scaleY = arguments[1], this.scaleZ = arguments[2];
        else this.scaleX = 1, this.scaleY = 1, this.scaleZ = 1;
        return this;
    }
    return MoGL.ext(Mesh, MoGL);
})();
/**
 * Created by redcamel on 2015-05-07.
 * description
 다른 Mesh를 포함할 수 있는 가상의 부모를 생성함.
 일단 Mesh가 Group에 포함되면 좌표계는 Group내의 지역좌표계로 작동함.
 Group을 또다른 Group을 포함할 수 있음.
 실제 구현에서 1단계부모는 parentBuffer에서 관리되지만
 2단계부터는 cpu연산을 기반으로 병합되므로 주의할 것.
 param 없음
 */
var Group = (function () {
    var Group, fn;
    Group = function Group() {
        this._children = {},
        this._scene = null
    },
    fn = Group.prototype,
    fn.addChild = function addChild(id, mesh) { MoGL.isAlive(this);
        var k, checks
        if (this._children[id]) MoGL.error('Group', 'addChild', 0)
        if (!(mesh instanceof Mesh )) MoGL.error('Group', 'addChild', 1)
        mesh._scene = this,
        mesh.setGeometry(mesh._geometry),
        mesh.setMaterial(mesh._material),
        checks = mesh._geometry._vertexShaders;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._scene._vertexShaders[checks[k]]) MoGL.error('Group', 'addChild', 2)
        checks = mesh._material._fragmentShaders;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._scene._fragmentShaders[checks[k]]) MoGL.error('Group', 'addChild', 3)
        checks = mesh._material._textures;
        for (k in checks)
            if (typeof checks[k] == 'string')
                if (!this._scene._textures[checks[k]]) MoGL.error('Group', 'addChild', 4)
        this._children[id] = mesh
        return this
    },
    fn.getChild = function getChild(id) { MoGL.isAlive(this);
        var t = this._children[id];
        return t ? t : null
    },
    fn.removeChild = function removeChild(id) { MoGL.isAlive(this);
        return this._children[id] ? (delete this._children[id], true) : false
    }
    return MoGL.ext(Group, Mesh);
})();
/**
 * Created by redcamel on 2015-05-05.
 * description
 */
var Camera = (function () {
    var Camera, fn, A4, F3, PERPI;
    var hex, hex_s;
    A4=[], PERPI=Math.PI / 180,
    F3 = new Float32Array(3),
    hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
    hex_s = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i;
    Camera = function Camera() {
        this._cvs=null,
        this._renderArea = null,
        this._updateRenderArea = 1,
        this._geometry = new Geometry([], []),
        this._material = new Material(),
        this._r = 0,
        this._g = 0,
        this._b = 0,
        this._a = 1,
        this._fov = 55,
        this._near = 0.1,
        this._far = 1000000,
        this._visible=1,
        this._filters ={},
        this._fog = null,
        this._antialias = false,
        this._pixelMatrix = Matrix.create(),
        this.z =-10,
        this._mode = '3d',
        this.lookAt(0,0,0);
    }
    fn = Camera.prototype,
    fn.getMatrix = function getMatrix() { MoGL.isAlive(this);
        Matrix.identity(this._matrix);
        Matrix.rotateX(this._matrix,this._matrix,this.rotateX);
        Matrix.rotateY(this._matrix,this._matrix,this.rotateY);
        Matrix.rotateZ(this._matrix,this._matrix,this.rotateZ);
        F3[0] = this.x, F3[1] = this.y, F3[2] = -this.z;
        Matrix.translate(this._matrix,this._matrix,F3);
        return this._matrix;
    },
    fn.getBackgroundColor = function getBackgroundColor(){MoGL.isAlive(this);
        return A4[0] = this._r, A4[1] = this._g, A4[2] = this._b, A4[3] = this._a, A4;
    },
    fn.getClipPlane = function getClipPlane(){MoGL.isAlive(this);
        return [this._near,this._far];
    },
    fn.getFilters = function getFilters(){MoGL.isAlive(this);
        var result = [],t = this._filters;
        for(var k in t) result.push(k);
        return result;
    },
    fn.getFog = function getFog(){MoGL.isAlive(this);
        return this._fog ? true : false;
    },
    fn.getFOV = function getFOV(){MoGL.isAlive(this);
        return this._fov;
    },
    fn.getProjectionMatrix = function getProjectionMatrix(){MoGL.isAlive(this);
        Matrix.identity(this._pixelMatrix);
        if(this._mode == '2d'){
            this._pixelMatrix = [
                2 / this._renderArea[2], 0, 0, 0,
                0, -2 / this._renderArea[3], 0, 0,
                0, 0, 0, 0,
                -1, 1, 0, 1
            ];
        }else Matrix.perspective(this._fov, this._renderArea[2]/this._renderArea[3], this._near, this._far, this._pixelMatrix);
        return this._pixelMatrix;
    },
    fn.getRenderArea = function getRenderArea(){MoGL.isAlive(this);
        return this._renderArea;
    },
    fn.getAntialias = function getAntialias(){MoGL.isAlive(this);
        return this._antialias ? true : false;
    },
    fn.getVisible = function getVisible(){MoGL.isAlive(this);
        return this._visible ? true : false;
    },
    fn.setBackgroundColor = function setBackgroundColor() {MoGL.isAlive(this);
        var t0, t1, ta;
        t0 = arguments[0];
        if (arguments.length == 1) {
            if (t0.length > 7) ta = +t0.substr(7), t0 = t0.substr(0, 7);
            if (t0.charAt(0) == '#') {
                if (t1 = hex.exec(t0)) {
                    this._r = parseInt(t1[1], 16) / 255,
                    this._g = parseInt(t1[2], 16) / 255,
                    this._b = parseInt(t1[3], 16) / 255;
                } else {
                    t1 = hex_s.exec(t0),
                    this._r = parseInt(t1[1] + t1[1], 16) / 255,
                    this._g = parseInt(t1[2] + t1[2], 16) / 255,
                    this._b = parseInt(t1[3] + t1[3], 16) / 255;
                }
                this._a = ta ? ta > 1 ? 1 : ta : 1;
            }
        } else {
            this._r = arguments[0],
            this._g = arguments[1],
            this._b = arguments[2],
            this._a = arguments[3] ? arguments[3] : 1;
        }
        return this;
    },
    fn.setClipPlane = function setClipPlane(near,far){MoGL.isAlive(this);
        this._near = near, this._far = far;
        return this;
    },
    fn.setFog = function setFog(color,near,far){MoGL.isAlive(this);
        var t0 = color, t1, result;
        if (t0 !=false && t0.charAt(0) == '#') {
            result= {};
            if (t1 = hex.exec(t0)) {
                result.r = parseInt(t1[1], 16) / 255,
                result.g = parseInt(t1[2], 16) / 255,
                result.b = parseInt(t1[3], 16) / 255;

            } else {
                t1 = hex_s.exec(t0),
                result.r = parseInt(t1[1] + t1[1], 16) / 255,
                result.g = parseInt(t1[2] + t1[2], 16) / 255,
                result.b = parseInt(t1[3] + t1[3], 16) / 255;
            }
            result.a = 1,
            result.near = near,
            result.far = far,
            this._fog = result;
        } else if (!t0) this._fog = null;
        return this;
    },
    fn.setFOV = function setFOV(){MoGL.isAlive(this);
        if (arguments.length == 1) this._fov = arguments[0];
        else this._fov = Math.ceil(2 * Math.atan(Math.tan(arguments[2] * PERPI / 2) * (arguments[1] / arguments[0])) * (180 / Math.PI));
        return this;
    },
    fn.setOthogonal = function setOthogonal(){MoGL.isAlive(this);
        this._mode = '2d';
        return this;
    },
    fn.setPerspective = function setPerspective(){MoGL.isAlive(this);
        this._mode = '3d';
        return this;
    },
    fn.setProjectionMatrix = function setProjectionMatrix(matrix){MoGL.isAlive(this);
        //TODO 이거 없애버림...
        return this;
    },
    fn.setRenderArea = function setRenderArea(x,y,w,h){MoGL.isAlive(this);
        var tw, th;
        this._updateRenderArea = 1,
        tw = this._cvs.width,
        th = this._cvs.height,
        console.log(typeof x == 'string' ? tw * x.replace('%', '') : x);
        this._renderArea = [
            typeof x == 'string' ? tw * x.replace('%', '') * 0.01 : x,
            typeof y == 'string' ? th * y.replace('%', '') * 0.01 : y,
            typeof w == 'string' ? tw * w.replace('%', '') * 0.01 : w,
            typeof h == 'string' ? th * h.replace('%', '') * 0.01 : h,
        ];
        return this;
    },
    fn.setAntialias = function setAntialias(isAntialias){MoGL.isAlive(this);
        this._antialias = isAntialias;
        return this;
    },
    fn.setVisible = function setVisible(value){MoGL.isAlive(this);
        this._visible = value;
        return this;
    },
    fn.setFilter = function setFilter(filter/*,needIe*/){MoGL.isAlive(this);
        var result;
        if(arguments[1]) result = arguments[1];
        else {
            switch (filter) {
                case Filter.anaglyph :
                    result = {
                        offsetL: 0.008,
                        offsetR: 0.008,
                        gIntensity: 0.7,
                        bIntensity: 0.7
                    };
                    break;
                case Filter.bevel :
                    result = {
                        distance: 4.0,
                        angle: 45,
                        highlightColor: '#FFF',
                        highlightAlpha: 1.0,
                        shadowColor: '#000',
                        shadowAlpha: 1.0,
                        blurX: 4.0,
                        blurY: 4.0,
                        strength: 1,
                        quality: 1,
                        type: "inner",
                        knockout: false
                    };
                    break;
                case Filter.bloom :
                    result = {
                        threshold: 0.3,
                        sourceSaturation: 1.0,
                        bloomSaturation: 1.3,
                        sourceIntensity: 1.0,
                        bloomIntensity: 1.0
                    };
                    break;
                case Filter.blur :
                    result = {
                        blurX: 4.0,
                        blurY: 4.0,
                        quality: 1
                    };
                    break;
                case Filter.colorMatrix :
                    result = {};
                    break;
                case Filter.convolution :
                    result = {
                        matrixX: 0,
                        matrixY: 0,
                        matrix: null,
                        divisor: 1.0,
                        bias: 0.0,
                        preserveAlpha: true,
                        clamp: true,
                        color: 0,
                        alpha: 0.0
                    };
                    break;
                case Filter.displacementMap :
                    result = {
                        mapTextureID: null,
                        mapPoint: null,
                        componentX: 0,
                        componentY: 0,
                        scaleX: 0.0,
                        scaleY: 0.0,
                        mode: "wrap",
                        color: 0,
                        alpha: 0.0
                    };
                    break;
                case Filter.fxaa :
                    result = {};
                    break;
                case Filter.glow :
                    result = {
                        color: '#F00',
                        alpha: 1.0,
                        blurX: 6.0,
                        blurY: 6.0,
                        strength: 2,
                        quality: 1,
                        inner: false,
                        knockout: false
                    };
                    break;
                case Filter.invert :
                    result = {};
                    break;
                case Filter.mono :
                    result = {};
                    break;
                case Filter.sepia :
                    result = {};
                    break;
                case Filter.shadow :
                    result = {
                        distance: 4.0,
                        angle: 45,
                        color: 0,
                        alpha: 1.0,
                        blurX: 4.0,
                        blurY: 4.0,
                        strength: 1.0,
                        quality: 1,
                        inner: false,
                        knockout: false,
                        hideObject: false
                    };
                    break;
            }
        }
        this._filters[filter] = result;
        return this;
    },
    fn.removeFilter = function removeFilter(filter){MoGL.isAlive(this);
        delete this._filters[filter];
        return this;
    }
    return MoGL.ext(Camera, Mesh);
})();


/**
 * Created by redcamel on 2015-05-05.
 */
'use strict'
var Scene = (function () {
	var Scene, fn;
	Scene = function Scene() {
		this._update = 0
		this._cvs = null,
		// for JS
		this._children = {},
		this._cameras = {},
		this._textures = {},
		this._materials = {},
		this._geometrys = {},
		this._vertexShaders = {},
		this._fragmentShaders = {}
		// for GPU
		this._gl = null,
		this._glVBOs = {},
		this._glVNBOs = {},
		this._glUVBOs = {},
		this._glIBOs = {},
		this._glPROGRAMs = {},
		this._glTEXTUREs = {},
		this._glFREAMBUFFERs = {}

		var colorVertexShader = {
			attributes: ['vec3 aVertexPosition'],
			uniforms: ['mat4 uPixelMatrix','mat4 uCameraMatrix','vec3 uRotate', 'vec3 uScale', 'vec3 uPosition', 'vec3 uColor'],
			varyings: ['vec3 vColor'],
			function: [VertexShader.baseFunction],
			main: ['' +
			'gl_Position = uPixelMatrix*uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale)*vec4(aVertexPosition, 1.0);\n' +
			'vColor = uColor ;' +
			'gl_PointSize = 10.0;'
			]
		}
		var colorFragmentShader = {
			precision: 'mediump float',
			uniforms: [],
			varyings: ['vec3 vColor'],
			function: [],
			main: ['gl_FragColor =  vec4(vColor, 1.0)']
		}

		var bitmapVertexShader = {
			attributes: ['vec3 aVertexPosition', 'vec2 aUV'],
			uniforms: ['mat4 uPixelMatrix','mat4 uCameraMatrix','vec3 uRotate', 'vec3 uScale', 'vec3 uPosition'],
			varyings: ['vec2 vUV'],
			function: [VertexShader.baseFunction],
			main: ['' +
			'gl_Position = uPixelMatrix*uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale)*vec4(aVertexPosition, 1.0);\n' +
			'vUV = aUV;'
			]
		}
		var bitmapFragmentShader = {
			precision: 'mediump float',
			uniforms: ['sampler2D uSampler'],
			varyings: ['vec2 vUV'],
			function: [],
			main: ['gl_FragColor =  texture2D(uSampler, vec2(vUV.s, vUV.t))']
		}
		var bitmapVertexShaderGouraud = {
			attributes: ['vec3 aVertexPosition', 'vec2 aUV', 'vec3 aVertexNormal'],
			uniforms: ['mat4 uPixelMatrix','mat4 uCameraMatrix','vec3 uDLite','float uLambert','vec3 uRotate', 'vec3 uScale', 'vec3 uPosition'],
			varyings: ['vec2 vUV','vec4 vLight'],
			function: [VertexShader.baseFunction],
			main: ['' +
			' mat4 mv = positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
			' gl_Position = uPixelMatrix*uCameraMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
			' vec3 LD = normalize(uDLite);\n' +
			' vec3 N = normalize(vec3(mv * vec4(aVertexNormal, 0.0) ));\n' +
			' vLight = vec4 (vec3(clamp(dot(N,-LD)*uLambert,0.05,1.0)),1.0);\n' +
			' vUV = aUV;'
			]
		}
		var bitmapFragmentShaderGouraud = {
			precision: 'mediump float',
			uniforms: ['sampler2D uSampler'],
			varyings: ['vec2 vUV','vec4 vLight'],
			function: [],
			main: ['' +
			'gl_FragColor =  (vLight*texture2D(uSampler, vec2(vUV.s, vUV.t)));\n' +
			'gl_FragColor.a = 1.0;'
			]
		}
		var colorVertexShaderGouraud = {
			attributes: ['vec3 aVertexPosition', 'vec2 aUV', 'vec3 aVertexNormal'],
			uniforms: ['mat4 uPixelMatrix','mat4 uCameraMatrix','vec3 uDLite','float uLambert','vec3 uRotate', 'vec3 uScale', 'vec3 uPosition','vec3 uColor'],
			varyings: ['vec3 vColor','vec4 vLight'],
			function: [VertexShader.baseFunction],
			main: ['' +
			' mat4 mv = positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
			' gl_Position = uPixelMatrix*uCameraMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
			' vec3 LD = normalize(uDLite);\n' +
			' vec3 N = normalize(vec3(mv * vec4(aVertexNormal, 0.0) ));\n' +
			' vLight = vec4 (vec3(clamp(dot(N,-LD)*uLambert,0.05,1.0)),1.0);\n' +
			' vColor = uColor;'
			]
		}
		var colorFragmentShaderGouraud = {
			precision: 'mediump float',
			uniforms: ['sampler2D uSampler'],
			varyings: ['vec3 vColor', 'vec4 vLight'],
			function: [],
			main: ['' +
			'gl_FragColor =  vLight*vec4(vColor,1.0);\n' +
			'gl_FragColor.a = 1.0;'
			]
		}
		var colorVertexShaderPhong = {
			attributes: ['vec3 aVertexPosition', 'vec2 aUV','vec3 aVertexNormal'],
			uniforms: ['mat4 uPixelMatrix','mat4 uCameraMatrix','vec3 uRotate', 'vec3 uScale', 'vec3 uPosition','vec3 uColor'],
			varyings: ['vec3 vNormal', 'vec3 vPosition','vec3 vColor'],
			function: [VertexShader.baseFunction],
			main: ['' +
			'mat4 mv = positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
			'gl_Position = uPixelMatrix*uCameraMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
			'vPosition = vec3(mv * vec4(aVertexPosition, 1.0));\n' +
			'vNormal = vec3(mv * vec4(aVertexNormal, 0.0));\n' +
			'vColor = uColor;'
			]
		}
		var colorFragmentShaderPhong = {
			precision: 'mediump float',
			uniforms: ['float uLambert', 'vec3 uDLite'],
			varyings: ['vec3 vNormal', 'vec3 vPosition', 'vec3 vColor'],
			function: [],
			main: ['' +
			'vec3 ambientColor = vec3(0.0, 0.0, 0.0);\n' +
			'vec3 diffuseColor = vec3(1.0, 1.0, 1.0);\n' +
			'vec3 specColor = vec3(1.0, 1.0, 1.0);\n' +

			'vec3 normal = normalize(vNormal);\n' +
			'vec3 lightDir = normalize(-uDLite);\n' +
			'vec3 reflectDir = reflect(lightDir, normal);\n' +
			'vec3 viewDir = normalize(-vPosition);\n' +

			'float lambertian = max(dot(lightDir,normal), 0.05)*uLambert;\n' +
			'float specular = 0.0;\n' +

			'if(lambertian > 0.0) {\n' +
			'float specAngle = max(dot(reflectDir, viewDir), 0.0);\n' +
			'   specular = pow(specAngle, 4.0);\n' +
			'}\n' +
			'gl_FragColor = vec4(vColor,1.0)*vec4(ambientColor +lambertian*diffuseColor +specular*specColor, 1.0);\n'+
			'gl_FragColor.a = 1.0;'
			]
		}
		var toonVertexShaderPhong = {
			attributes: ['vec3 aVertexPosition', 'vec2 aUV','vec3 aVertexNormal'],
			uniforms: ['mat4 uPixelMatrix','mat4 uCameraMatrix','vec3 uRotate', 'vec3 uScale', 'vec3 uPosition','vec3 uColor'],
			varyings: ['vec3 vNormal', 'vec3 vPosition','vec3 vColor'],
			function: [VertexShader.baseFunction],
			main: ['' +
			'mat4 mv = positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
			'gl_Position = uPixelMatrix*uCameraMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
			'vPosition = vec3(mv * vec4(aVertexPosition, 1.0));\n' +
			'vNormal = vec3(mv * vec4(aVertexNormal, 0.0));\n' +
			'vColor = uColor;'
			]
		}
		var toonFragmentShaderPhong = {
			precision: 'mediump float',
			uniforms: ['float uLambert', 'vec3 uDLite'],
			varyings: ['vec3 vNormal', 'vec3 vPosition', 'vec3 vColor'],
			function: [],
			main: ['' +
			'vec3 ambientColor = vec3(0.0, 0.0, 0.0);\n' +
			'vec3 diffuseColor = vec3(1.0, 1.0, 1.0);\n' +
			'vec3 specColor = vec3(1.0, 1.0, 1.0);\n' +

			'vec3 normal = normalize(vNormal);\n' +
			'vec3 lightDir = normalize(-uDLite);\n' +
			'vec3 reflectDir = reflect(lightDir, normal);\n' +
			'vec3 viewDir = normalize(-vPosition);\n' +

			'float lambertian = max(dot(lightDir,normal), 0.0)*uLambert;\n' +
			'float specular = 0.0;\n' +

			'vec3 src = vColor;\n'+

			' if(lambertian>0.95) src.rgb*=0.95;\n' +
			' else if(lambertian>0.6) src.rgb*=0.5;\n' +
			' else if(lambertian>0.3) src.rgb*=0.3;\n' +
			' else src.rgb*=0.1;\n' +

			'if(lambertian > 0.0) {\n' +
			'float specAngle = max(dot(reflectDir, viewDir), 0.0);\n' +
			'   specular = pow(specAngle, 4.0);\n' +
			'}\n' +
			'gl_FragColor = vec4(src,1.0)*vec4(ambientColor +lambertian*diffuseColor +specular*specColor, 1.0);\n'+
			'gl_FragColor.a = 1.0;'
			]
		}
		var bitmapVertexShaderPhong = {
			attributes: ['vec3 aVertexPosition', 'vec2 aUV','vec3 aVertexNormal'],
			uniforms: ['mat4 uPixelMatrix','mat4 uCameraMatrix','vec3 uRotate', 'vec3 uScale', 'vec3 uPosition'],
			varyings: ['vec2 vUV','vec3 vNormal', 'vec3 vPosition'],
			function: [VertexShader.baseFunction],
			main: ['' +
			'mat4 mv = positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
			'gl_Position = uPixelMatrix*uCameraMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
			'vPosition = vec3(mv * vec4(aVertexPosition, 1.0));\n' +
			'vNormal = vec3(mv * vec4(aVertexNormal, 0.0));\n' +
			'vUV = aUV;'
			]
		}
		var bitmapFragmentShaderPhong = {
			precision: 'mediump float',
			uniforms: ['sampler2D uSampler', 'float uLambert', 'vec3 uDLite'],
			varyings: ['vec2 vUV', 'vec3 vNormal', 'vec3 vPosition'],
			function: [],
			main: ['' +
			'vec3 ambientColor = vec3(0.0, 0.0, 0.0);\n' +
			'vec3 diffuseColor = vec3(1.0, 1.0, 1.0);\n' +
			'vec3 specColor = vec3(1.0, 1.0, 1.0);\n' +

			'vec3 normal = normalize(vNormal);\n' +
			'vec3 lightDir = normalize(-uDLite);\n' +
			'vec3 reflectDir = reflect(lightDir, normal);\n' +
			'vec3 viewDir = normalize(-vPosition);\n' +

			'float lambertian = max(dot(lightDir,normal), 0.05)*uLambert;\n' +
			'float specular = 0.0;\n' +

			'if(lambertian > 0.0) {\n' +
			'float specAngle = max(dot(reflectDir, viewDir), 0.0);\n' +
			'   specular = pow(specAngle, 4.0);\n' +
			'}\n' +
			'gl_FragColor = texture2D(uSampler, vec2(vUV.s, vUV.t))*vec4(ambientColor +lambertian*diffuseColor +specular*specColor, 1.0);\n'+
			'gl_FragColor.a = 1.0;'
			]
		}

		this.addVertexShader('color', colorVertexShader),
		this.addFragmentShader('color', colorFragmentShader),
		this.addVertexShader('bitmap', bitmapVertexShader),
		this.addFragmentShader('bitmap', bitmapFragmentShader),
		this.addVertexShader('bitmapGouraud', bitmapVertexShaderGouraud),
		this.addFragmentShader('bitmapGouraud', bitmapFragmentShaderGouraud),
		this.addVertexShader('colorGouraud', colorVertexShaderGouraud),
		this.addFragmentShader('colorGouraud', colorFragmentShaderGouraud),
		this.addVertexShader('colorPhong', colorVertexShaderPhong),
		this.addFragmentShader('colorPhong', colorFragmentShaderPhong);
		this.addVertexShader('colorToon', toonVertexShaderPhong),
		this.addFragmentShader('colorToon', toonFragmentShaderPhong);
		this.addVertexShader('bitmapPhong', bitmapVertexShaderPhong),
		this.addFragmentShader('bitmapPhong', bitmapFragmentShaderPhong);
	}
	/////////////////////////////////////////////////////////////////
	var makeVBO = function makeVBO(self, name, data, stride) {
		var gl, buffer;
		gl = self._gl, buffer = self._glVBOs[name]
		if (buffer) return buffer
		buffer = gl.createBuffer(),
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer),
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW),
		buffer.name = name,
		buffer.type = 'VBO',
		buffer.data = data,
		buffer.stride = stride,
		buffer.numItem = data.length / stride,
		self._glVBOs[name] = buffer,
		console.log('VBO생성', self._glVBOs[name])
		return self._glVBOs[name]
	}

	var makeVNBO = function makeVNBO(self, name, data, stride) {
		var gl, buffer;
		gl = self._gl, buffer = self._glVNBOs[name]
		if (buffer) return buffer
		buffer = gl.createBuffer(),
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer),
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW),
		buffer.name = name,
		buffer.type = 'VNBO',
		buffer.data = data,
		buffer.stride = stride,
		buffer.numItem = data.length / stride,
		self._glVNBOs[name] = buffer,
		console.log('VNBO생성', self._glVNBOs[name])
		return self._glVNBOs[name]
	}

	var makeIBO = function makeIBO(self, name, data, stride) {
		var gl, buffer;
		gl = self._gl, buffer = self._glIBOs[name]
		if (buffer) return buffer
		buffer = gl.createBuffer(),
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer),
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW),
		buffer.name = name,
		buffer.type = 'IBO',
		buffer.data = data,
		buffer.stride = stride,
		buffer.numItem = data.length / stride,
		self._glIBOs[name] = buffer,
		console.log('IBO생성', self._glIBOs[name])
		return self._glIBOs[name]
	}

	var makeUVBO = function makeUVBO(self, name, data, stride) {
		var gl, buffer;
		gl = self._gl, buffer = self._glUVBOs[name]
		if (buffer) return buffer
		buffer = gl.createBuffer(),
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer),
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW),
		buffer.name = name,
		buffer.type = 'UVBO',
		buffer.data = data,
		buffer.stride = stride,
		buffer.numItem = data.length / stride,
		self._glUVBOs[name] = buffer,
		console.log('UVBO생성', self._glUVBOs[name])
		return self._glUVBOs[name]
	}

	var makeProgram = function makeProgram(self, name) {
		var gl, vShader, fShader, program, i
		gl = self._gl,
		vShader = vertexShaderParser(self, self._vertexShaders[name]),
		fShader = fragmentShaderParser(self, self._fragmentShaders[name]),
		program = gl.createProgram(),
		gl.attachShader(program, vShader),
		gl.attachShader(program, fShader),
		gl.linkProgram(program),
		vShader.name = name + '_vertex', fShader.name = name + '_fragment', program.name = name
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) MoGL.error(name, ' 프로그램 쉐이더 초기화 실패!', 0)
		gl.useProgram(program)
		for (i = 0; i < vShader.attributes.length; i++) {
			gl.bindBuffer(gl.ARRAY_BUFFER, self._glVBOs['null']),
			gl.enableVertexAttribArray(program[vShader.attributes[i]] = gl.getAttribLocation(program, vShader.attributes[i])),
			gl.vertexAttribPointer(program[vShader.attributes[i]], self._glVBOs['null'].stride, gl.FLOAT, false, 0, 0)
		}
		for (i = 0; i < vShader.uniforms.length; i++) {
			program[vShader.uniforms[i]] = gl.getUniformLocation(program, vShader.uniforms[i])
		}
		for (i = 0; i < fShader.uniforms.length; i++) {
			program[fShader.uniforms[i]] = gl.getUniformLocation(program, fShader.uniforms[i])
		}
		self._glPROGRAMs[name] = program
		//console.log(vShader)
		//console.log(fShader)
		//console.log(program)
		return program
	}

	var vertexShaderParser = function vertexShaderParser(self, source) {
		var gl, t0, len, i, resultStr, shader;
		gl = self._gl, shader = gl.createShader(gl.VERTEX_SHADER),
		shader.uniforms = [],
		shader.attributes = [],
		resultStr = "", t0 = source.attributes, len = t0.length;
		for (i = 0; i < len; i++) {
			resultStr += 'attribute ' + t0[i] + ';\n',
			shader.attributes.push(t0[i].split(' ')[1])
		}
		t0 = source.uniforms, len = t0.length
		for (i = 0; i < len; i++) {
			resultStr += 'uniform ' + t0[i] + ';\n',
			shader.uniforms.push(t0[i].split(' ')[1])
		}
		t0 = source.varyings, len = t0.length
		for (i = 0; i < len; i++) {
			resultStr += 'varying ' + t0[i] + ';\n'
		}
		resultStr += VertexShader.baseFunction,
		resultStr += 'void main(void){\n',
		resultStr += source.main + ';\n',
		resultStr += '}\n',
		//console.log(resultStr),
		gl.shaderSource(shader, resultStr),
		gl.compileShader(shader)
		return shader
	}
	var fragmentShaderParser = function fragmentShaderParser(self,source){
		var gl, resultStr, i, t0, len, shader;
		gl = self._gl, resultStr = "", shader = gl.createShader(gl.FRAGMENT_SHADER),
		shader.uniforms = []
		if (source.precision) resultStr += 'precision ' + source.precision + ';\n'
		else resultStr += 'precision mediump float;\n'
		t0 = source.uniforms, len = t0.length
		for (i = 0; i < len; i++) {
			resultStr += 'uniform ' + t0[i] + ';\n',
			shader.uniforms.push(t0[i].split(' ')[1])
		}
		t0 = source.varyings, len = t0.length
		for (i = 0; i < len; i++) {
			resultStr += 'varying ' + t0[i] + ';\n'
		}
		resultStr += 'void main(void){\n',
		resultStr += source.main + ';\n',
		resultStr += '}\n',
		//console.log(resultStr),
		gl.shaderSource(shader, resultStr),
		gl.compileShader(shader)
		return shader
	}
	var makeTexture = function makeTexture(self, id,image) {
		var gl, texture;
		gl = self._gl, texture = self._glTEXTUREs[id];
		if (texture) return texture
		texture = gl.createTexture(),
		//TODO 일단 이미지만
		texture.img = new Image()
		console.log(typeof image, image)
		if (image instanceof ImageData) texture.img.src = image.data
		else if (image instanceof HTMLCanvasElement) texture.img.src = image.toDataURL()
		else if (image instanceof HTMLImageElement) texture.img.src = image.src
		else if (image['substring'] && image.substring(0, 10) == 'data:image' && image.indexOf('base64') > -1) texture.img.src = image //base64문자열 - urlData형식으로 지정된 base64문자열
		else if (typeof image == 'string') texture.img.src = image
		//TODO 비디오 처리
		texture.img.onload = function () {
			var isPowerOf2 = function (value) {
				return (value & (value - 1)) == 0;
			};
			gl.bindTexture(gl.TEXTURE_2D, texture),
			//TODO 다변화 대응해야됨
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.img);
			if (isPowerOf2(texture.img.width) && isPowerOf2(texture.img.height)) {
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE),
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE),
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.generateMipmap(gl.TEXTURE_2D);
			} else {
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE),
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE),
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			}
			texture.loaded = 1;
		}
		texture.data = image,
		self._glTEXTUREs[id] = texture,
		gl.bindTexture(gl.TEXTURE_2D, null)
		return texture
	}

	var makeFrameBuffer = function makeFrameBuffer(self, camera){
		var gl, framebuffer, texture, renderbuffer;
		gl = self._gl,
		framebuffer = gl.createFramebuffer(),
		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer),
		framebuffer.x = camera._renderArea[0], framebuffer.y = camera._renderArea[1],
		framebuffer.width = camera._renderArea[2], framebuffer.height = camera._renderArea[3]

		texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture),
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR),
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR),
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE),
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE),
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, framebuffer.width, framebuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

		renderbuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer),
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, framebuffer.width, framebuffer.height),
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0),
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer),
		gl.bindTexture(gl.TEXTURE_2D, null),
		gl.bindRenderbuffer(gl.RENDERBUFFER, null),
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		self._glFREAMBUFFERs[camera.uuid] = {
			frameBuffer: framebuffer,
			texture: texture
		}
	}
/////////////////////////////////////////////////////////////////
	fn = Scene.prototype,
	fn.update = function update() { MoGL.isAlive(this);
		var k,checks;
		this._glVBOs['null'] = makeVBO(this, 'null', new Float32Array([0.0, 0.0, 0.0]), 3)
		//for GPU
		for (k in this._children) {
			var mesh = this._children[k], _key, geo = mesh._geometry;
			if (geo) {
				if (!this._geometrys[geo._key]) this.addGeometry(geo._key, geo)
				if (!this._glVBOs[geo]) {
					_key = geo._key,
					this._glVBOs[_key] = makeVBO(this, _key, geo._position, 3),
					this._glVNBOs[_key] = makeVNBO(this, _key, geo._normal, 3),
					this._glUVBOs[_key] = makeUVBO(this, _key, geo._uv, 2),
					this._glIBOs[_key] = makeIBO(this, _key, geo._index, 1)
				}
			}
		}
		if (!this._glVBOs['rect']) {
			this._glVBOs['rect'] = makeVBO(this, 'rect', [-1, -1, 0.0, 1, -1, 0.0, 1, 1, 0.0, -1, 1, 0.0], 3),
			this._glUVBOs['rect'] = makeUVBO(this, 'rect', [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0], 2),
			this._glIBOs['rect'] = makeIBO(this, 'rect', [0, 1, 2, 0, 2, 3], 1)
		}
		for (k in this._cameras) {
			var camera = this._cameras[k];
			camera._cvs = this._cvs
			if (!camera._renderArea) camera.setRenderArea(0, 0, this._cvs.width, this._cvs.height)
			if (camera._updateRenderArea) {
				camera.getProjectionMatrix(),
				makeFrameBuffer(this, camera),
				camera._updateRenderArea = 0
			}
		}
		checks = this._vertexShaders;
		for (k in checks) makeProgram(this, k)
		console.log('////////////////////////////////////////////'),
		console.log('Scene 업데이트'),
		console.log('this._glVBOs :', this._glVBOs),
		console.log('this._glVNBOs :', this._glVNBOs),
		console.log('this._glIBOs :', this._glIBOs),
		console.log('this._glPROGRAMs :', this._glPROGRAMs),
		console.log('this._geometrys :', this._geometrys),
		console.log('this._materials :', this._materials),
		console.log('this._textures :', this._textures),
		console.log('this._vertexShaders :', this._vertexShaders),
		console.log('this._fragmentShaders :', this._fragmentShaders),
		console.log('this._glFREAMBUFFERs :', this._glFREAMBUFFERs),
		console.log('////////////////////////////////////////////'),
		this._update = 0
	},
	fn.addChild = function addChild(id, mesh) { MoGL.isAlive(this); // isAlive는 함수선언 줄에 바로 같이 씁니다.
		var k, checks;
		if (this._children[id]) MoGL.error('Scene', 'addChild', 0)
		if (!(mesh instanceof Mesh)) MoGL.error('Scene', 'addChild', 1)
		mesh._scene = this, mesh._parent = this,
		mesh.setGeometry(mesh._geometry),
		mesh.setMaterial(mesh._material),
		mesh._material._count++,
		checks = mesh._geometry._vertexShaders;
		for (k in checks) if (typeof checks[k] == 'string') if (!this._vertexShaders[checks[k]]) MoGL.error('Scene', 'addChild', 2)
		checks = mesh._material._fragmentShaders;
		for (k in checks) if (typeof checks[k] == 'string') if (!this._fragmentShaders[checks[k]]) MoGL.error('Scene', 'addChild', 3)
		checks = mesh._material._textures;
		for (k in checks)
			if (typeof checks[k] == 'string')
				if (!this._textures[checks[k]]) MoGL.error('Scene', 'addChild', 4)
				else {
					console.log(mesh._material._textures),
					console.log(checks[k]),
					mesh._material._textures[checks[k]] = this._textures[checks[k]]
				}
		if (mesh instanceof Camera) this._cameras[id] = mesh, mesh._cvs = this._cvs
		else this._children[id] = mesh
		this._update = 1
		return this
	},
	fn.addGeometry = function (id, geometry) { MoGL.isAlive(this);
		if (this._geometrys[id]) MoGL.error('Scene', 'addGeometry', 0)
		if (!(geometry instanceof Geometry)) MoGL.error('Scene', 'addGeometry', 1)
		var checks = geometry._vertexShaders, k;
		for (k in checks) if (typeof checks[k] == 'string') if (!this._vertexShaders[checks[k]]) MoGL.error('Scene', 'addGeometry', 2)
		this._geometrys[id] = geometry
		return this
	},
	fn.addMaterial = function (id, material) { MoGL.isAlive(this);
		if (this._materials[id]) MoGL.error('Scene', 'addMaterial', 0)
		if (!(material instanceof Material)) MoGL.error('Scene', 'addMaterial', 1)
		var checks = material._fragmentShaders, k;
		for (k in checks) if (typeof checks[k] == 'string') if (!this._fragmentShaders[checks[k]]) MoGL.error('Scene', 'addMaterial', 2)
		checks = material._textures;
		for (k in checks) if (typeof checks[k] == 'string') if (!this._textures[checks[k]]) {
			MoGL.error('Scene', 'addMaterial', 3)
		}
		this._materials[id] = material,
		this._materials[id]._scene = this
		return this
	},
	fn.addTexture = function addTexture(id, image/*,resizeType*/) { MoGL.isAlive(this);
		if (this._textures[id]) MoGL.error('Scene', 'addTexture', 0)
		if (checkDraft(image)) MoGL.error('Scene', 'addTexture', 1)
		function checkDraft(target) {
			if (target instanceof HTMLImageElement) return 0
			if (target instanceof HTMLCanvasElement) return 0
			if (target instanceof HTMLVideoElement) return 0
			if (target instanceof ImageData) return 0
			if (target['substring'] && target.substring(0, 10) == 'data:image' && target.indexOf('base64') > -1) return 0// base64문자열 - urlData형식으로 지정된 base64문자열
			if (typeof target == 'string') return 0
			// TODO 블랍은 어카지 -__;;;;;;;;;;;;;;;;;;;;;;;;실제 이미지를 포함하고 있는 Blob객체.
			return 1
		}

		if (this._textures[id]) this._textures[id].img = makeTexture(this, id, image)
		else {
			this._textures[id] = {count: 0, last: 0, img: null, resizeType: arguments[2] || null},
			this._textures[id].img = makeTexture(this, id, image),
			console.log(this._textures),
			console.log(id, image)
		}
		return this
	},
	fn.addFragmentShader = function addFragmentShader(id, shaderStr) { MoGL.isAlive(this);
		if (this._fragmentShaders[id]) MoGL.error('Scene', 'addFragmentShader', 0)
		// TODO'Scene.addVertexShader:1' - MoGL 표준 인터페이스를 준수하지 않는 vertex shader를 등록하려할 때.
		// TODO 마일스톤0.2
		this._fragmentShaders[id] = shaderStr
		return this
	},
	fn.addVertexShader = function addVertexShader(id, shaderStr) { MoGL.isAlive(this);
		if (this._vertexShaders[id]) MoGL.error('Scene', 'addVertexShader', 0)
		// TODO'Scene.addVertexShader:1' - MoGL 표준 인터페이스를 준수하지 않는 vertex shader를 등록하려할 때.
		// TODO 마일스톤0.2
		this._vertexShaders[id] = shaderStr
		return this
	},
	///////////////////////////////////////////////////////////////////////////
	// Get
	fn.getChild = function getChild(id) { MoGL.isAlive(this);
		var t = this._children[id];
		t = t ? t : this._cameras[id]
		return t ? t : null
	},
	fn.getGeometry = function getGeometry(id) { MoGL.isAlive(this);
		var t = this._geometrys[id];
		return t ? t : null
	},
	fn.getMaterial = function getMaterial(id) { MoGL.isAlive(this);
		var t = this._materials[id]
		return t ? t : null
	},
	fn.getTexture = function getTexture(id) { MoGL.isAlive(this);
		var t = this._textures[id]
		return t ? t : null
	},
	fn.getFragmentShader = function (id) { MoGL.isAlive(this);
		// TODO 마일스톤0.5
		return this._fragmentShaders[id]
	},
	fn.getVertexShader = function (id) { MoGL.isAlive(this);
		// TODO 마일스톤0.5
		return this._vertexShaders[id]
	},
	///////////////////////////////////////////////////////////////////////////
	// Remove
	fn.removeChild = function removeChild(id) { MoGL.isAlive(this);
		return this._children[id] ? (this._children[id]._material._count--, this._children[id]._scene = null,this._children[id]._parent = null, delete this._children[id], true) : false
	},
	fn.removeGeometry = function removeGeometry(id) { MoGL.isAlive(this);
		return this._geometrys[id] ? (delete this._geometrys[id], true) : false
	},
	fn.removeMaterial = function removeMaterial(id) { MoGL.isAlive(this);
		return this._materials[id] ? (delete this._materials[id], true) : false
	},
	fn.removeTexture = function removeTexture(id) { MoGL.isAlive(this);
		return this._textures[id] ? (delete this._textures[id], true) : false
	},
	fn.removeFragmentShader = function removeFragmentShader() { MoGL.isAlive(this);
		// TODO 마일스톤0.5
		return this
	},
	fn.removeVertexShader = function VertexShader() { MoGL.isAlive(this);
		// TODO 마일스톤0.5
		return this
	}
	return MoGL.ext(Scene, MoGL);
})();
/**
 * Created by redcamel on 2015-05-05.
 * description
 * World는 MoGL의 기본 시작객체로 내부에 다수의 Scene을 소유할 수 있으며,
 * 실제 렌더링되는 대상임. 또한 World의 인스턴스는 rendering함수 그 자체이기도 함.
 * 메서드체이닝을 위해 대부분의 함수는 자신을 반환함.
 */
var World = (function () {
    var World, fn, rectMatrix = Matrix.create(), f3 = new Float32Array(3);
    World = function World(id) {
        var keys, i,ext;
        if (!id) MoGL.error('World', 'constructor', 0);
        this._cvs = document.getElementById(id);
        if (!this._cvs) MoGL.error('World', 'constructor', 1);

        var width = window.innerWidth;
        var height = window.innerHeight;

        //this._pixelRatio = width/height > 1 ? window.devicePixelRatio : 1
        this._pixelRatio = window.devicePixelRatio;

        this._cvs.width = width * this._pixelRatio;
        this._cvs.height = height * this._pixelRatio;
        this._cvs.style.width = width + 'px';
        this._cvs.style.height = height + 'px';

        this._renderList = [],
        this._sceneList = {},
        this.LOOP = {},

        keys = 'experimental-webgl,webgl,webkit-3d,moz-webgl,3d'.split(','), i = keys.length;
        while (i--) if (this._gl = this._cvs.getContext(keys[i], {antialias: true})) break;
        ext = this._gl.getExtension("OES_element_index_uint");
        if (!ext) alert('no! OES_element_index_uint');
        console.log(this._gl ? id + ' : MoGL 초기화 성공!' : console.log(id + ' : MoGL 초기화 실패!!'));
    },
    fn = World.prototype,
        fn.render = function render() { MoGL.isAlive(this);
            var i, k, len, tList = this._renderList;
            var scene,camera,gl,children;
            var tItem, tMaterial, tProgram, tVBO, tVNBO, tUVBO, tIBO, tFrameBuffer, tDiffuseList;
            var pVBO, pVNBO, pUVBO, pIBO, pDiffuse,pProgram;
            for (k in this.LOOP)  this.LOOP[k]()
            for (i = 0, len = tList.length; i < len; i++) {
                //console.log(tList[i],'렌더')
                if (tList[i].scene._update) tList[i].scene.update();
                //console.log('카메라렌더',tList[i].sceneID,tList[i].cameraID, '실제 Scene : ',tList[i].scene)
                scene = tList[i].scene,
                camera = scene.getChild(tList[i].cameraID);
                if(camera._visible){
                    gl = scene._gl;
                    if(len > 1) {
                        tFrameBuffer = scene._glFREAMBUFFERs[camera.uuid].frameBuffer;
                        gl.bindFramebuffer( gl.FRAMEBUFFER,tFrameBuffer);
                        //TODO 뷰포트가 아닌....이게...프레임에 어떻게 그릴껀지로 가야함..
                        gl.viewport(0,0, tFrameBuffer.width, tFrameBuffer.height);
                    }else{
                        gl.viewport(0, 0, this._cvs.width, this._cvs.height);
                    }
                    children = scene._children;
                    gl.clearColor(camera._r, camera._g, camera._b, camera._a);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    gl.enable(gl.DEPTH_TEST), gl.depthFunc(gl.LESS);
                    //gl.enable(gl.CULL_FACE),gl.frontFace (gl.CW)
                    //gl.enable(gl.BLEND)
                    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
                    for(k in scene._glPROGRAMs){
                        tProgram = scene._glPROGRAMs[k];
                        gl.useProgram(tProgram);
                        gl.uniformMatrix4fv(tProgram.uPixelMatrix,false,camera._pixelMatrix);
                        gl.uniformMatrix4fv(tProgram.uCameraMatrix,false,camera.getMatrix());
                    }
                    tItem = tMaterial = tProgram = tVBO = tIBO = null;
                    for (k in children) {
                        tItem = children[k],
                        tVBO = scene._glVBOs[tItem._geometry._key],
                        tVNBO = scene._glVNBOs[tItem._geometry._key],
                        tUVBO = scene._glUVBOs[tItem._geometry._key],
                        tIBO = scene._glIBOs[tItem._geometry._key],
                        tMaterial = tItem._material,
                        tDiffuseList = tMaterial._diffuse;
                        var dLite = [0,1,1], useNormalBuffer = 0;
                        if(tDiffuseList.__indexList.length == 0){
                            if(tMaterial._shading.type == 'none'){
                                tProgram=scene._glPROGRAMs['color'];
                                gl.useProgram(tProgram);
                            }
                            else if(tMaterial._shading.type == 'toon'){
                                tProgram = scene._glPROGRAMs['colorToon'];
                                gl.useProgram(tProgram);
                                useNormalBuffer = 1;
                            }
                            else if(tMaterial._shading.type=='gouraud'){
                                tProgram = scene._glPROGRAMs['colorGouraud'];
                                gl.useProgram(tProgram);
                                useNormalBuffer = 1;
                            }
                            else if(tMaterial._shading.type=='phong'){
                                tProgram=scene._glPROGRAMs['colorPhong'];
                                gl.useProgram(tProgram);
                                useNormalBuffer = 1;
                            }
                            if(pProgram != tProgram) pProgram = null ,pVBO = null, pVNBO = null, pUVBO = null, pIBO = null, pDiffuse = null;

                            if(useNormalBuffer){
                                tVNBO != pVNBO ? gl.bindBuffer(gl.ARRAY_BUFFER, tVNBO) : 0,
                                tVNBO != pVNBO ? gl.vertexAttribPointer(tProgram.aVertexNormal, tVNBO.stride, gl.FLOAT, false, 0, 0) : 0;
                                gl.uniform3fv(tProgram.uDLite, dLite);
                                gl.uniform1f(tProgram.uLambert,tMaterial._shading.lambert);
                            }
                            tVBO!=pVBO ? gl.bindBuffer(gl.ARRAY_BUFFER, tVBO) : 0,
                            tVBO!=pVBO ? gl.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, gl.FLOAT, false, 0, 0) : 0,
                            f3[0] = tMaterial._r,f3[1] = tMaterial._g,f3[2] = tMaterial._b,
                            gl.uniform3fv(tProgram.uColor, f3);
                        }else{
                            if(tMaterial._shading.type == 'none'){
                                tProgram=scene._glPROGRAMs['bitmap'],
                                gl.useProgram(tProgram);
                            }else if(tMaterial._shading.type == 'flat'){
                            }else if(tMaterial._shading.type == 'gouraud'){
                                tProgram=scene._glPROGRAMs['bitmapGouraud'];
                                gl.useProgram(tProgram);
                                useNormalBuffer = 1;
                            }else if(tMaterial._shading.type == 'phong'){
                                tProgram=scene._glPROGRAMs['bitmapPhong'];
                                gl.useProgram(tProgram);
                                useNormalBuffer = 1;
                            }else if(tMaterial._shading.type == 'blinn'){
                            }
                            if(pProgram != tProgram) pProgram = null ,pVBO = null, pVNBO = null, pUVBO = null, pIBO = null, pDiffuse = null;

                            if(useNormalBuffer){
                                tVNBO!=pVNBO ? gl.bindBuffer(gl.ARRAY_BUFFER, tVNBO) : 0,
                                tVNBO!=pVNBO ? gl.vertexAttribPointer(tProgram.aVertexNormal, tVNBO.stride, gl.FLOAT, false, 0, 0) : 0;
                                gl.uniform3fv(tProgram.uDLite, dLite);
                                gl.uniform1f(tProgram.uLambert,tMaterial._shading.lambert);
                            }
                            tVBO != pVBO ? gl.bindBuffer(gl.ARRAY_BUFFER, tVBO) : 0,
                            tVBO != pVBO ? gl.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, gl.FLOAT, false, 0, 0) : 0;
                            tUVBO != pUVBO ? gl.bindBuffer(gl.ARRAY_BUFFER, tUVBO) : 0,
                            tUVBO != pUVBO ? gl.vertexAttribPointer(tProgram.aUV, tUVBO.stride, gl.FLOAT, false, 0, 0) : 0,
                            gl.activeTexture(gl.TEXTURE0);
                            var textureObj = scene._glTEXTUREs[tDiffuseList.__indexList[0].id];
                            if(textureObj.loaded){
                                textureObj != pDiffuse ? gl.bindTexture(gl.TEXTURE_2D, textureObj) : 0;
                                gl.uniform1i(tProgram.uSampler, 0);
                            }
                        }
                        f3[0] = tItem.rotateX,f3[1] = tItem.rotateY,f3[2] = tItem.rotateZ;
                        gl.uniform3fv(tProgram.uRotate, f3),
                        f3[0] = -tItem.x,f3[1] = -tItem.y,f3[2] = tItem.z,
                        gl.uniform3fv(tProgram.uPosition, f3),
                        f3[0] = tItem.scaleX,f3[1] = tItem.scaleY,f3[2] = tItem.scaleZ,
                        gl.uniform3fv(tProgram.uScale, f3),
                        tIBO != pIBO ? gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIBO) : 0;
                        if(tMaterial._wireFrame) {
                            tProgram = scene._glPROGRAMs['color'],
                            gl.useProgram(tProgram),
                            tVBO != pVBO ? gl.bindBuffer(gl.ARRAY_BUFFER, tVBO) : 0,
                            tVBO != pVBO ? gl.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, gl.FLOAT, false, 0, 0) : 0,
                            f3[0] = tItem.rotateX, f3[1] = tItem.rotateY, f3[2] = tItem.rotateZ,
                            gl.uniform3fv(tProgram.uRotate, f3),
                            f3[0] = -tItem.x, f3[1] = -tItem.y, f3[2] = tItem.z,
                            gl.uniform3fv(tProgram.uPosition, f3),
                            f3[0] = tItem.scaleX, f3[1] = tItem.scaleY, f3[2] = tItem.scaleZ,
                            gl.uniform3fv(tProgram.uScale, f3),
                            f3[0] = tMaterial._rw, f3[1] = tMaterial._gw, f3[2] = tMaterial._bw,
                            gl.uniform3fv(tProgram.uColor, f3),
                            gl.drawElements(gl.LINES, tIBO.numItem, gl.UNSIGNED_SHORT, 0);
                        }
                        else gl.drawElements(gl.TRIANGLES, tIBO.numItem, gl.UNSIGNED_SHORT, 0);

                        pProgram = tProgram ,pVBO = tVBO, pVNBO = useNormalBuffer ? tVNBO : null, pUVBO = tUVBO, pIBO = tIBO, pDiffuse = textureObj;
                    }
                    //gl.bindTexture(gl.TEXTURE_2D, scene._glFREAMBUFFERs[camera.uuid].texture);
                    //gl.bindTexture(gl.TEXTURE_2D, null);
                    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                }
            }
            ////
            // 프레임버퍼를 모아서 찍어!!!
            if(len > 1){
                gl.viewport(0, 0, this._cvs.clientWidth, this._cvs.clientHeight);
                gl.clearColor(0, 0, 0, 1);
                //gl.enable(gl.DEPTH_TEST), gl.depthFunc(gl.LEQUAL)
                gl.disable(gl.DEPTH_TEST);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                tVBO = scene._glVBOs['rect'],
                tUVBO = scene._glUVBOs['rect'],
                tIBO = scene._glIBOs['rect'],
                tProgram = scene._glPROGRAMs['bitmap'];
                if (!tVBO) return;
                gl.useProgram(tProgram);
                gl.uniformMatrix4fv(tProgram.uPixelMatrix, false, [
                    2 / this._cvs.clientWidth, 0, 0, 0,
                    0, -2 / this._cvs.clientHeight, 0, 0,
                    0, 0, 0, 0,
                    -1, 1, 0, 1

                ]);
                gl.bindBuffer(gl.ARRAY_BUFFER, tVBO),
                gl.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, gl.FLOAT, false, 0, 0),
                gl.bindBuffer(gl.ARRAY_BUFFER, tUVBO),
                gl.vertexAttribPointer(tProgram.aUV, tUVBO.stride, gl.FLOAT, false, 0, 0),
                gl.uniform3fv(tProgram.uRotate, [0, 0, 0]);
                gl.uniformMatrix4fv(tProgram.uCameraMatrix, false, rectMatrix);
                for (i = 0, len = tList.length; i < len; i++) {
                    scene = tList[i].scene,
                    camera = scene.getChild(tList[i].cameraID)
                    if (camera._visible) {
                        tFrameBuffer = scene._glFREAMBUFFERs[camera.uuid].frameBuffer;
                        f3[0] = tFrameBuffer.x + tFrameBuffer.width / 2, f3[1] = tFrameBuffer.y + tFrameBuffer.height / 2 , f3[2] = 0;
                        gl.uniform3fv(tProgram.uPosition, f3),
                        f3[0] = tFrameBuffer.width / 2, f3[1] = tFrameBuffer.height / 2, f3[2] = 1,
                        gl.uniform3fv(tProgram.uScale, f3),
                        gl.activeTexture(gl.TEXTURE0),
                        gl.bindTexture(gl.TEXTURE_2D, scene._glFREAMBUFFERs[camera.uuid].texture),
                        gl.uniform1i(tProgram.uSampler, 0),
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIBO),
                        gl.drawElements(gl.TRIANGLES, tIBO.numItem, gl.UNSIGNED_SHORT, 0);
                    }
                }
            }
            //gl.finish();
        },
    fn.addRender = function addRender(sceneID, cameraID, index) { MoGL.isAlive(this);
        var uuid, tScene, tList,
            i,len,temp;
        uuid = sceneID + '_' + cameraID,
        tScene = this._sceneList[sceneID],
        tList = this._renderList;
        for (i = 0, len = tList.length; i < len; i++) if (tList[i].uuid == uuid) MoGL.error('World', 'addRender', 0);
        if (!tScene) MoGL.error('World', 'addRender', 1);
        else if (!tScene.isAlive) MoGL.error('World', 'addRender', 1);
        if (tScene) {
            if (!tScene.getChild(cameraID)) MoGL.error('World', 'addRender', 2);
            else if (!tScene.getChild(cameraID).isAlive) MoGL.error('World', 'addRender', 2);
        }
        temp = {
            uuid: uuid,
            sceneID: sceneID,
            cameraID: cameraID,
            scene: tScene,
            camera: tScene.getChild(cameraID)
        };
        tScene._update = 1;
        if (index) tList[index] = temp;
        else tList.push(temp);
        return this;
    },
    fn.addScene = function addScene(sceneID, scene) { MoGL.isAlive(this);
        if (this._sceneList[sceneID]) MoGL.error('World', 'addScene', 0);
        if (!(scene instanceof Scene )) MoGL.error('World', 'addScene', 1);
        this._sceneList[sceneID] = scene, scene._gl = this._gl, scene._cvs = this._cvs;
        return this;
    },
    fn.getScene = function getScene(sceneID) { MoGL.isAlive(this);
        if( typeof sceneID === 'undefined' ) MoGL.error('World', 'getScene', 0);
        return this._sceneList[sceneID] ? this._sceneList[sceneID] : null;
    },
    fn.removeRender = function removeRender(sceneID, cameraID) { MoGL.isAlive(this);
        var tList = this._renderList, i, len;
        var sTest = 0, cTest = 0;
        if (!this._sceneList[sceneID])  MoGL.error('World', 'removeRender', 0);
        if (!this._sceneList[sceneID]._cameras[cameraID]) console.log('2222222222222222222222222'), MoGL.error('World', 'removeRender', 1);
        for (i = 0, len = tList.length; i < len; i++) {
            if (tList[i].uuid.indexOf(sceneID) > -1) sTest = 1;
            if (tList[i].uuid.indexOf(cameraID) > -1) cTest = 1;
        }
        if (!sTest)  MoGL.error('World', 'removeRender', 2);
        if (!cTest)  MoGL.error('World', 'removeRender', 3);
        for (i = 0, len = tList.length; i < len; i++) if (tList[i] && tList[i].uuid == sceneID + '_' + cameraID) tList.splice(i, 1);
        return this;
    },
    fn.removeScene = function removeScene(sceneID) { MoGL.isAlive(this);
        this._sceneList[sceneID] ? 0 : MoGL.error('World', 'removeScene', 0),
        this._sceneList[sceneID]._gl = this._gl,
        delete this._sceneList[sceneID];
        return this;
    };
    return MoGL.ext(World, MoGL);
})();
var t0, k;
for( k in t0 = {
    BlendMode: BlendMode,
    Filter: Filter,
    Vertex: Vertex,
    Shading: Shading,
    VertexShader: VertexShader,
    Matrix: Matrix,
    Geometry:Geometry,
    Material:Material,
    Texture:Texture,
    Primitive:Primitive,
    Mesh:Mesh,
    Group:Group,
    Camera:Camera,
    Scene:Scene,
    World:World,
    globalization:function(){ for( var key in this ) global[key] = this[key]; }
} ) MoGL[k] = t0[k];
Object.freeze(MoGL);
global['MoGL'] = MoGL;
} )(this);

if( typeof module !== 'undefined' && typeof module === 'object' ) module.exports = MoGL;