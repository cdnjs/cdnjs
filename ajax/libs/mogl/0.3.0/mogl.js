( function( W ){
'use strict';
(function(){ //webGL은 되지만 지원되지 않는 기능의 polyfill
    var test = function test(){};
    if(!('name' in test) || test.name != 'test'){ //함수에 name속성이 없다면..
        Object.defineProperty( Function.prototype, 'name', {
            get:function(){
                var f;
                if(!('__name' in this)){//캐쉬에서 없다면
                    f = this.toString();//함수를 문자열로 바꿔서 function과 ()사이의 문자열을 이름으로 추출
                    this.__name = f.substring(f.indexOf('function') + 8, f.indexOf('(')).trim() || undefined;
                }
                return this.__name;
            }
        });
    }
    //표준이름의 requestAnimationFrame가 없는 경우
    if (!('requestAnimationFrame' in window)) window.requestAnimationFrame = window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || window['msRequestAnimationFrame'];
    //ios7,8 - performance.now가 지원되지 않는 경우
    var nowOffset;
    if (!('performance' in window)) window.performance = {};
    if (!('now' in Date)) Date.now = function () {return +new Date();};
    if (!('now' in window.performance)){
        nowOffset = Date.now();
        if (window.performance.timing && window.performance.timing.navigationStart) {
            nowOffset = window.performance.timing.navigationStart;
        }
        window.performance.now = function now(){
            return Date.now() - nowOffset;
        };
    }
})();
//전역에서 사용하는 공통함수
var $setPrivate, $getPrivate, $writable, $readonly, $getter, $setter, $color, $md, $ease,
    GLMAT_EPSILON, SIN, COS, TAN, ATAN, ATAN2, ASIN, SQRT, CEIL, ABS, PI, PIH, PID, D2R, R2D;

(function() {
    var VAR = {}, value = {};
    $setPrivate = function $setPrivate(cls, v) { //공용private설정
        $readonly.value = v,
        Object.defineProperty(VAR, cls, $readonly);
    },
    $getPrivate = function $getPrivate(cls) { //공용private읽기
        if (arguments.length == 2 ) {
            return VAR[cls][arguments[1]];
        } else {
            return VAR[cls];
        }
    };
})(),
//defineProperty용 헬퍼
$writable = {value:true, writable:true},
$readonly = {value:null},
$getter = function(prop, key){
    var defaultValue = arguments.length == 3 ? arguments[2] : null;
    if (key) {
        return function getter() {
            var p = prop[this];
            return key in p ? p[key] : defaultValue;
        };
    } else {
        return function getter() {
            return this.uuid in prop ? prop[this] : defaultValue;
        };
    }
},
$setter = function(prop, key){
    if (key) {
        return function setter(v) {
            prop[this][key] = v;
        };
    } else {
        return function setter(v) {
            prop[this] = v;
        };
    }
},
$color = (function(){
    var co = [];
    return function(v){
        if (typeof v == 'string' && v.charAt(0) == '#') {
            if (v.length == 4) {
                v = v.substr(1,3)
                v = '#'+v[0]+v[0]+v[1]+v[1]+v[2]+v[2]
            }
            co[0] = parseInt(v.substr(1, 2), 16) / 255,
            co[1] = parseInt(v.substr(3, 2), 16) / 255,
            co[2] = parseInt(v.substr(5, 2), 16) / 255;
            if (v.length > 7) {
                co[3] = parseFloat(v.substr(7));
                if (co[3] > 1) co[3] = 1;
            } else {
                co[3] = 1;
            }
        } else if ('r' in v) {
            co[0] = v.r, co[1] = v.g, co[2] = v.b, co[3] = 'a' in v ? v.a : 1;
        } else {
            co[0] = v[0], co[1] = v[1], co[2] = v[2], co[3] = '3' in v ? v[3] : 1;
        }
        return co;
    };
})();
//수학함수
GLMAT_EPSILON = 0.000001,
SIN = Math.sin, COS = Math.cos, TAN = Math.tan, ATAN = Math.atan, ATAN2 = Math.atan2, ASIN = Math.asin,
SQRT = Math.sqrt, CEIL = Math.ceil, ABS = Math.abs, PI = Math.PI, PIH = PI * 0.5, PID = PI * 2, D2R = PI / 180, R2D = 180 / PI;
//markdown
$md = function(classes){
    var list, val, func, sort, toStr, fieldDetail, methodDetail;
    sort = function(a,b){
        return a.name < b.name;
    },
    list = function(type, md, v){
        var i, j;
        if (v.length) {
            v.sort(sort);
            md[md.length] = '\n**' + type + '**\n';
            for (i = 0, j = v.length; i < j; i++){
                md[md.length] = '* [' + v[i].name + '](#' + v[i].name + ') - ' + v[i].description.split('\n')[0].substr(0, 20).trim() + (v[i].description.length > 20 ? '...' : '');
            }
        }
    },
    toStr = function(v){
        if (Array.isArray(v)) {
            return v.join('\n');
        }else if (!v) {
            return '';
        }
        return v;
    },
    val = function(type, md, ref){
            var v = [], temp = ref._info['_'+type], temp1 = ref['_'+type], k;
            for (k in temp) {
                temp[k].name = k,
                temp[k].type = temp[k].type || '?',
                temp[k].defaultValue = temp[k].defaultValue || 'none', 
                temp[k].sample = toStr(temp[k].sample || '//none'),
                temp[k].description = toStr(temp[k].description),
                temp[k].enumerable = temp1[k] && temp1[k].enumerable ? true : false, 
                temp[k].configurable = temp1[k] && temp1[k].configurable ? true : false;
                temp[k].exception = toStr(temp[k].exception || 'none');
                if (temp1[k]){
                    if ('writable' in temp1[k]) {
                        temp[k].writable = temp1[k].writable ? true : false;
                    } else if ('set' in temp1[k]) {
                        temp[k].writable = true;
                    } else {
                        temp[k].writable = false;
                    }
                };
                v[v.length] = temp[k];
            }
            list(type, md, v);
            return v;
    }
    func = function(type, md, ref){
        var v = [], temp = ref._info['_'+type], temp1 = ref['_'+type], k;
        for (k in temp) {
            temp[k].name = k;
            temp[k].param = toStr(temp[k].param || 'none');
            temp[k].ret = toStr(temp[k].ret || 'none');
            temp[k].sample = toStr(temp[k].sample || '//none');
            temp[k].exception = toStr(temp[k].exception || 'none');
            temp[k].description = toStr(temp[k].description);
            v[v.length] = temp[k];
        }
        list(type, md, v);
        return v;
    },
    fieldDetail = function(type, v, md) {
        var i, j, k, m, n;
        if (v.length) {
            for (i = 0, j = v.length; i < j; i++){
                k = v[i];
                md[md.length] = '\n[top](#)';
                md[md.length] = '\n<a name="' + k.name + '"></a>';
                md[md.length] = '###' + k.name;
                md[md.length] = '\n_' + type + '_\n';
                md[md.length] = '\n**description**\n';
                md[md.length] = '\n- '+k.description;
                md[md.length] = '\n**setting**\n';
                md[md.length] = '- *writable*:' + k.writable + '\n-  *enumerable*:' + k.enumerable + '\n-  *configurable*:' + k.configurable;
                if ('value' in k) {
                    md[md.length] = '\n**value**\n';
                    md[md.length] = '\n- '+k.value;
                } else if ('defaultValue' in k) {
                    md[md.length] = '\n**defaultValue**\n';
                    md[md.length] = '\n- '+k.defaultValue;
                }
                md[md.length] = '\n**exception**\n';
                md[md.length] = '\n- '+k.exception;
                md[md.length] = '\n**sample**\n';
                md[md.length] = '```javascript';
                md[md.length] = k.sample;
                md[md.length] = '```';
            }
        }
    },
    methodDetail = function(type, v, md){
        var i, j, k, l, m, n, o;
        if (v.length) {
            for (i = 0, j = v.length; i < j; i++){
                k = v[i];
                md[md.length] = '\n[top](#)';
                md[md.length] = '\n<a name="' + k.name + '"></a>';
                if (k.param != 'none') {
                    o = [];
                    l = k.param.split('\n');
                    for(m = 0, n = l.length; m < n ; m++){
                        if(l[m].charAt(0) != '*' || /[0-9]/.test(l[m].charAt(0))){
                            o.push(l[m].split('-')[0].trim());
                        }
                    }
                    md[md.length] = '###' + k.name + '(' + o.join(', ') + ')';
                } else {
                    md[md.length] = '###' + k.name + '()';
                }
                md[md.length] = '\n_' + type + '_\n';
                md[md.length] = '\n**description**\n';
                md[md.length] = '\n- '+k.description;
                md[md.length] = '\n**param**\n';
                if (k.param != 'none' && n) {
                    for(m = 0; m < n ; m++){
                        if (l[m] = l[m].trim()){
                            if (l[m].charAt(0) == '*' || /[0-9]/.test(l[m].charAt(0))) {
                                md[md.length] = '    ' + l[m];
                            } else {
                                md[md.length] = (m + 1) + '. ' + l[m];
                            }
                        }
                    }
                } else {
                    md[md.length] = 'none';
                }
                md[md.length] = '\n**exception**\n';
                md[md.length] = '\n- '+k.exception;
                md[md.length] = '\n**return**\n';
                md[md.length] = '\n- '+(k.ret.length ? k.ret.replace('this', 'this - 메소드체이닝을 위해 자신을 반환함') : 'none');
                md[md.length] = '\n**sample**\n';
                md[md.length] = '```javascript';
                md[md.length] = k.sample;
                md[md.length] = '```';
            }
        }
    };
    return function(){
        var md, ref, temp, temp1, i, j, k, l, m, n,
            parents, children, fields, methods, constants, events, statics, inherited;
        ref = classes[this.className].define;
//제목
        md = ['#' + this.className];

//상단리스트영역생성-----------------------
//부모
        if (ref.parent) {
            parents = [];
            temp = ref.parent;
            while (temp) {
                parents[parents.length] = '[' + temp.className + '](' + temp.className + '.md)';
                temp = classes[temp.className].define.parent;
            }
            md[md.length] = '* parent : ' + parents.join(' < ');
        }
//자식
        children = [];
        for (k in classes) {
            if (classes[k].parent == this) {
                children[children.length] = '[' + k + '](' + k + '.md)';
            }
        }
        if (children.length) {
            children.sort(sort);
            md[md.length] = '* children : ' + temp.join(', ');
        }
//생성자
        md[md.length] = '* [constructor](#constructor)\n';
//서브항목        
        fields = val('field', md, ref);
        methods = func('method', md, ref);
        statics = func('static', md, ref);
        constants = val('constant', md, ref);
        events = val('event', md, ref);
//본문------------------------------
        temp = ref._construct;
        md[md.length] = '\n[top](#)';
        md[md.length] = '\n<a name="constructor"></a>';
        md[md.length] = '##Constructor';
        md[md.length] = '\n**description**\n';
        md[md.length] = '- '+toStr(temp.description);
        md[md.length] = '\n**param**\n';
        md[md.length] =  toStr(temp.param || 'none'),
        md[md.length] = '\n**exception**\n';
        md[md.length] = '- '+toStr(temp.exception || 'none');
        md[md.length] = '\n**sample**\n';
        md[md.length] = '```javascript';
        md[md.length] = toStr(temp.sample || '//none');
        md[md.length] = '```';
        fieldDetail('field', fields, md);
        methodDetail('method', methods, md);
        methodDetail('static', statics, md);
        fieldDetail('const', constants, md);
        fieldDetail('event', events, md);
        md[md.length] = '\n[top](#)';
        return md.join('\n');
    };
},
Object.freeze($ease = {
    linear:function(a,c,b){return b*a+c},
    backIn:function(a,c,b){return b*a*a*(2.70158*a-1.70158)+c},
    backOut:function(a,c,b){a-=1;return b*(a*a*(2.70158*a+1.70158)+1)+c},
    backInOut:function(a,c,b){a*=2;if(1>a)return 0.5*b*a*a*(3.5949095*a-2.5949095)+c;a-=2;return 0.5*b*(a*a*(3.70158*a+2.70158)+2)+c},
    bounceOut:function(a,c,b){if(0.363636>a)return 7.5625*b*a*a+c;if(0.727272>a)return a-=0.545454,b*(7.5625*a*a+0.75)+c;if(0.90909>a)return a-=0.818181,b*(7.5625*a*a+0.9375)+c;a-=0.95454;return b*(7.5625*a*a+0.984375)+c},
    sineIn:function(a,c,b){return -b*Math.cos(a*PIH)+b+c},
    sineOut:function(a,c,b){return b*Math.sin(a*PIH)+c},
    sineInOut:function(a,c,b){return 0.5*-b*(Math.cos(PI*a)-1)+c},
    circleIn:function(a,c,b){return -b*(Math.sqrt(1-a*a)-1)+c},
    circleOut:function(a,c,b){a-=1;return b*Math.sqrt(1-a*a)+c},
    circleInOut:function(a,c,b){a*=2;if(1>a)return 0.5*-b*(Math.sqrt(1-a*a)-1)+c;a-=2;return 0.5*b*(Math.sqrt(1-a*a)+1)+c},
    quadraticIn:function(a,c,b){return b*a*a+c},
    quadraticOut:function(a,c,b){return -b*a*(a-2)+c}
});
var makeUtil = (function(){
    var makeBuffer = function makeBuffer(gl, target, data, stribe) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(target, buffer),
        gl.bufferData(target, data, gl.STATIC_DRAW),
        buffer.data = data,
        buffer.stride = stribe,
        buffer.numItem = data.length / stribe,
        gl.bindBuffer(target, null);
        return buffer;
    };
    return {
        makeVBO:function makeVBO(gpu, geo, data, stribe) {
            var gl, buffer;
            gl = gpu.gl,
            buffer = gpu.vbo[geo];
            if (buffer) return;
            if(Array.isArray(data)) {
                data = new Float32Array(data);
            }
            buffer = makeBuffer(gl, gl.ARRAY_BUFFER, data, stribe),
            buffer.name = geo,
            buffer.type = 'VBO',
            gpu.vbo[geo] = buffer;
        },
        makeVNBO:function makeVNVO(gpu, geo, data, stribe) {
            var gl, buffer;
            gl = gpu.gl,
            buffer = gpu.vnbo[geo];
            if (buffer) return;
            if (Array.isArray(data)) {
                data = new Float32Array(data);
            }
            buffer = makeBuffer(gl, gl.ARRAY_BUFFER, data, stribe),
            buffer.name = geo,
            buffer.type = 'VNBO';
            gpu.vnbo[geo] = buffer;
        },
        makeIBO:function makeIBO(gpu, geo, data, stribe) {
            var gl, buffer;
            gl = gpu.gl,
            buffer = gpu.ibo[geo];
            if (buffer) return;
            if (Array.isArray(data)) {
                data = new Uint16Array(data);
            }
            buffer = makeBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, data, stribe),
            buffer.name = geo,
            buffer.type = 'IBO';
            gpu.ibo[geo] = buffer;
        },
        makeUVBO:function makeUVBO(gpu, geo, data, stribe) {
            var gl, buffer;
            gl = gpu.gl,
            buffer = gpu.uvbo[geo];
            if (buffer) return;
            if (Array.isArray(data)) {
                data = new Float32Array(data);
            }
            buffer = makeBuffer(gl, gl.ARRAY_BUFFER, data, stribe),
            buffer.name = geo,
            buffer.type = 'UVBO';
            gpu.uvbo[geo] = buffer;
        },
        makeProgram:function makeProgram(gpu, name, vSource, fSource) {
            var gl, vShader, fShader, program, i, len, tList;
            gl = gpu.gl,
            vShader = gl.createShader(gl.VERTEX_SHADER),
            fShader = gl.createShader(gl.FRAGMENT_SHADER),
            gl.shaderSource(vShader, vSource.shaderStr),
            gl.compileShader(vShader),
            gl.shaderSource(fShader, fSource.shaderStr),
            gl.compileShader(fShader);

            program = gl.createProgram(),
            gl.attachShader(program, vShader),
            gl.attachShader(program, fShader),
            gl.linkProgram(program),
            vShader.name = vSource.id,
            fShader.name = fSource.id,
            program.name = name;
            if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                // MoGL error를 사용할 수 없을까.
                throw new Error('프로그램 셰이더 초기화 실패');
            }
            gl.useProgram(program),
            tList = vSource.attributes,
            len = tList.length;
            for (i = 0; i < len; i++) {
                gl.bindBuffer(gl.ARRAY_BUFFER, gpu.vbo['null']),
                gl.enableVertexAttribArray(program[tList[i]] = gl.getAttribLocation(program, tList[i])),
                gl.vertexAttribPointer(program[tList[i]], gpu.vbo['null'].stride, gl.FLOAT, false, 0, 0),
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }
            tList = vSource.uniforms,
            i = tList.length;
            while (i--) {
                program[tList[i]] = gl.getUniformLocation(program, tList[i]);
            }
            tList = fSource.uniforms,
            i = tList.length;
            while (i--) {
                program[tList[i]] = gl.getUniformLocation(program, tList[i]);
            }
            gpu.programs[name] = program;
        },
        makeTexture:function makeTexture(gpu, texture) {
            var gl, glTexture;
            gl = gpu.gl;
            glTexture = gl.createTexture(),
            gl.bindTexture(gl.TEXTURE_2D, glTexture),
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.img),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR),
            gl.generateMipmap(gl.TEXTURE_2D),
            glTexture.textrue = texture,
            gpu.textures[texture] = glTexture,
            gl.bindTexture(gl.TEXTURE_2D, null);
        },
        makeFrameBuffer:function makeFrameBuffer(gpu, camera, cvs) {
            var gl, texture, fBuffer, rBuffer, tArea, cvsW, cvsH, pRatio;
            if (!cvs) return;
            cvsW = cvs.width,
            cvsH = cvs.height,
            pRatio = window.devicePixelRatio;
            if (camera.renderArea) {
                tArea = camera.renderArea;
            } else {
                tArea = [0, 0, cvsW, cvsH];
            }
            gl = gpu.gl,
            fBuffer = gl.createFramebuffer(),
            fBuffer.x = tArea[0], fBuffer.y = tArea[1],
            fBuffer.width = Math.min(tArea[2] * pRatio, cvsW),
            fBuffer.height = Math.min(tArea[3] * pRatio, cvsH),
            gl.bindFramebuffer(gl.FRAMEBUFFER, fBuffer),

            texture = gl.createTexture(),
            gl.bindTexture(gl.TEXTURE_2D, texture),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE),
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE),
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fBuffer.width, fBuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null),

            rBuffer = gl.createRenderbuffer(),
            gl.bindRenderbuffer(gl.RENDERBUFFER, rBuffer),
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, fBuffer.width, fBuffer.height),
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0),
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rBuffer),
            gl.bindTexture(gl.TEXTURE_2D, null),
            gl.bindRenderbuffer(gl.RENDERBUFFER, null),
            gl.bindFramebuffer(gl.FRAMEBUFFER, null),
            gpu.framebuffers[camera] = {
                frameBuffer:fBuffer,
                texture:texture
            };
        },
        vertexShaderParser: function vertexShaderParser(source) {
            var i, temp, str, resultObject, code;
            code = source.code,
            resultObject = {
                uniforms: [],
                attributes: [],
                id: code.id,
                shaderStr: null
            },
            str = "",
            temp = code.attributes,
            i = temp.length;
            while (i--) {
                str += 'attribute ' + temp[i] + ';\n',
                resultObject.attributes.push(temp[i].split(' ')[1]);
            }
            temp = code.uniforms,
                i = temp.length;
            while (i--) {
                str += 'uniform ' + temp[i] + ';\n',
                resultObject.uniforms.push(temp[i].split(' ')[1]);
            }
            temp = code.varyings,
            i = temp.length;
            while (i--) {
                str += 'varying ' + temp[i] + ';\n';
            }
            str += VertexShader.baseFunction,
            str += 'void main(void){\n',
            str += code.main + ';\n',
            str += '}\n'
            resultObject.shaderStr = str
            return resultObject;
        },
        fragmentShaderParser : function fragmentShaderParser(source) {
            var i, temp, str, resultObject, code;
            code = source.code,
            resultObject = {
                uniforms: [],
                id: code.id,
                shaderStr: null
            },
            str = "";
            if (code.precision) {
                str += 'precision ' + code.precision + ';\n';
            }
            else {
                str += 'precision mediump float;\n';
            }
            temp = code.uniforms,
            i = temp.length;
            while (i--) {
                str += 'uniform ' + temp[i] + ';\n',
                resultObject.uniforms.push(temp[i].split(' ')[1]);
            }
            temp = code.varyings,
            i = temp.length;
            while (i--) {
                str += 'varying ' + temp[i] + ';\n';
            }
            str += 'void main(void){\n',
            str += code.main + ';\n',
            str += '}\n'
            resultObject.shaderStr = str
            return resultObject;
        }
    };
})();
var MoGL = (function() {
    var Definer, build, func, keys, val, param, checker,
        MoGL, idProp, destroy, classGet, totalCount, error;
    checker = {};
    param = function(v){
        var i;
        v = Function.prototype.toString.call(v),
        v = v.substring(v.indexOf('(')+1, v.indexOf(')')).trim().split(','),
        i = v.length;
        if (i) {
            while (i--) v[i] = v[i].trim();
            return v;
        }
    },
    Definer = function(k, v, parent, check){
        var p, i;
        if (check !== checker) throw new Error('Definer는 extend를 통해서만 사용할 수 있습니다');
        this.parent = parent;
        if (typeof v == 'function') {
            this._construct = {
                name:k,
                description:'Constructor of ' + k,
                param:param(v),
                value:v
            };
        } else {
            this._construct = {
                name:k,
                description:v.description,
                param:v.param,
                ret:v.ret,
                sample:v.sample,
                value:v.value
            };
        }
        this._info = {_method:{},_static:{},_field:{},_constant:{},_event:{}},
        this._method = {},
        this._static = {},
        this._field = {},
        this._constant = {},
        this._event = {},
        Object.freeze(this);
    },
    build = (function(){
        var wrap, method, prev, methodSet, fieldSet, readonly, writable, isFactory, isSuperChain,
            inheritedStatic, md,
            uuid, allInstance, ids, counter, total, classes;
        uuid = 0,
        allInstance = {},
        ids = {},
        total = 0, //생성된 인스턴스의 갯수를 관리함
        counter = {}, //클래스별로 관리
        classes = {},
        
        isFactory = {factory:1},//팩토리 함수용 식별상수
        isSuperChain = {superChain:1},//생성자체인용 상수
        readonly = {}, writable = {writable:true},
        prev = [], //스택구조의 이전 함수이름의 배열
        md = {
            description:'해당 클래스를 마크다운 형식으로 문서화하여 출력함',
            ret:'string - 클래스에 대한 문서 마크다운'
        };
        if ($md) {
            md.value = $md(classes);
        } else {
            md.value = function(){return '';};
        }
        inheritedStatic = {
            extend:{
                param:[
                    'className:string - 자식클래스의 이름',
                    'constructor:function - 자식클래스의 생성자'
                ],
                description:[
                    '이 클래스를 상속하는 자식클래스를 만들 수 있는 정의자(Definer)를 얻음',
                    '\n**Definer class의 메소드**\n',
                    '* 각 메서드는 체이닝됨',
                    "* Matrix = MoGL.extend('Matrix', function(){..}).static(..).field(..).build(); 형태로 사용",
                    "* field('x',{value:30}) - 속성을 정의함",
                    "* method('rotate',{value:function(){}}) - 메서드를 정의함",
                    "* constant('normalX',{value:'normalX'}) - 상수를 정의함",
                    "* event('updated',{value:'updated'}) - 이벤트를 정의함",
                    "* static('toString',{value:function(){}}) - 정적메서드를 정의함",
                    "* build() - 입력된 결과를 종합하여 클래스를 생성함"
                ],
                ret:'Definer - 클래스를 정의할 수 있는 생성전용객체',
                sample:[
                    "var classA = MoGL.extend('classA', function(){}).build();"
                ],
                value:function extend(k) {
                    var v;
                    if(arguments.length == 1) {
                        v = k, k = k.name;
                    } else {
                        v = arguments[1];
                    }
                    return new Definer(k, v, this, checker);
                }
            },
            getInstance:{
                param:'uuid:string - 얻고 싶은 인스턴스의 uuid 또는 id',
                description:'uuid 또는 id를 기반으로 인스턴스를 얻어냄',
                ret:'Object - 해당되는 인스턴스',
                sample:[
                    "var instance = Mesh.getInstance(uuid);"
                ],
                value:function getInstance(v) {
                    var inst, p, k;
                    if (v in allInstance) {
                        inst = allInstance[v];
                        if (inst.classId == this.uuid) {
                            return inst;
                        }
                    } else {
                        p = ids[this.uuid];
                        for (k in p) {
                            if (p[k] == v) return allInstance[k];
                        }
                    }
                    this.error('getInstance', 0/*해당되는 인스턴스가 없음*/);
                }
            },
            count:{
                description:'이 클래스로 부터 만들어져 활성화된 인스턴스의 수',
                ret:'int - 활성화된 인스턴스의 수',
                sample:[
                    "var meshCount = Mesh.count();"
                ],
                value:function count() {
                    return counter[this.uuid];
                }
            },
            error:{
                description:'정적함수에서 표준화된 예외를 처리함(정적함수 내부에서 사용)',
                param:[
                    'method:string - 예외가 발생한 함수명',
                    'id:int - 예외고유 id'
                ],
                sample:[
                    "var classA = MoGL.extend('classA', function(){})",
                    "    .static('test', function(){",
                    "	     this.error('test', 0);",
                    "    })",
                    "    .build();"
                ],
                value:function error(method, id) {
                    throw new Error(this.className + '.' + method + ':' + id);
                }
            },
            getMD:md
        },
        wrap = function wrap(key, f) {//생성할 이름과 메서드
            return function() {
                var result;
                if (!this.isAlive) throw new Error('Destroyed Object:' + this);//비활성객체 배제
                prev[prev.length] = method,//에러가 발생한 메소드이름을 스택으로 관리
                method = key,//현재 에러가 난 메소드명
                result = f.apply(this, arguments),//메소드실행
                method = prev.pop();//스택을 되돌림
                return result;
            };
        },
        methodSet = function(target, prop, unwrap){
            var k, v;
            for (k in prop) {
                if (prop.hasOwnProperty(k)) {
                    v = prop[k];
                    if (!unwrap) {
                        v.value = wrap(k, v.value),
                        Object.defineProperty(target, k, v);
                    } else {
                        target[k] = v.value;
                    }
                }
            }
        },
        fieldSet = function(target, prop, unwrap){
            var k, v;
            for (k in prop) {
                if (prop.hasOwnProperty(k)) {
                    v = prop[k];
                    if(!unwrap) {
                        if (v.get) v.get = wrap(k + 'Get', v.get);
                        if (v.set) v.set = wrap(k + 'Set', v.set);
                    }
                    Object.defineProperty(target, k, v);
                }
            }
        },
        idProp = {
            description:'사용자가 임의로 정의한 id',
            type:'string',
            defaultValue:'null', 
            sample: [
                "var scene = new Scene();",
                "scene.id = 'test1';",
                "console.log( scene.id ); //'test1'"
            ],
            get:function idGet() {
                if (ids[this.classId] && this.uuid in ids[this.classId]) {//클래스별 id저장소에서 가져옴
                    return ids[this.classId][this];
                }
                return null;//없으면 null
            },
            set:function idSet(v) {
                if (!ids[this.classId]){//클래스별 저장소가 없으면 생성
                    ids[this.classId] = {ref:{}};//역참조 ref는 중복확인용
                } else if(v in ids[this.classId].ref){//역참조에 이미 존재하는 아이디면 예외
                     throw new Error(this.className + '.idSetter:0');
                }
                if(v === null && this.uuid in ids[this.classId]){//기존id가 있는데 null온 경우 삭제
                    v = ids[this.classId][this],
                    delete ids[this.classId][this],
                    delete ids[this.classId].ref[v];
                }else{ //정상인 경우는 정의함
                    ids[this.classId][this] = v;
                    ids[this.classId].ref[v] = this.uuid;
                }
            }
        },
        destroy = function destroy() {
            var key;
            for (key in this) {
                if (this.hasOwnProperty(key)) this[key] = null;
            }
            if(ids[this.classId] && this.uuid in ids[this.classId]){//id파괴
                key = ids[this.classId][this],
                delete ids[this.classId][this],
                delete ids[this.classId].ref[key];
            }
            delete allInstance[this],
            this.isAlive = false,//비활성화
            counter[this.classId]--,//클래스별인스턴스감소
            total--;//전체인스턴스감소
        },
        classGet = function classGet(context) {
            var k;
            if (!context) context = {};
            for (k in classes) {
                if (classes.hasOwnProperty(k)) context[k] = classes[k].cls;
            }
            return context;
        },
        totalCount = function totalCount() {
            return total;
        },
        error = function error(id) {
            throw new Error(this.className + '.' + method + ':' + id);
        },
        MoGL = function MoGL() {
            readonly.value = 'uuid:' + (uuid++),
            Object.defineProperty(this, 'uuid', readonly), //객체고유아이디
            allInstance[this] = this,
            writable.value = true,
            Object.defineProperty(this, 'isAlive', writable),//활성화상태초기화 true
            counter[this.classId]++, //클래스별 인스턴스 수 증가
            total++; //전체 인스턴스 수 증가
        };
        return function(){
            var cls, parent, child, fn, prop, i, k, v;
            parent = this.parent,
            child = this._construct.value,
            cls = function() {
                var arg, arg0 = arguments[0], result;
                prev[prev.length] = method,
                method = 'constructor';
                if (arg0 === isSuperChain) {
                    if (parent) parent.call(this, isSuperChain, arguments[1]);
                    child.apply(this, arguments[1]);
                } else if (this instanceof cls) {
                    if (arg0 === isFactory) {
                        arg = arguments[1];
                    } else {
                        arg = arguments;
                    }
                    if (parent) parent.call(this, isSuperChain, arg),
                    child.apply(this, arg),
                    Object.seal(this),
                    result = this;
                } else {
                    result = cls.call(Object.create(cls.prototype), isFactory, arguments);
                }
                method = prev.pop();
                return result;
            },
            classes[this._construct.value.name] = {cls:cls, define:this};

            if (parent) {
                fn = Object.create(parent.prototype);
            } else {
                fn = cls.prototype;
            }

            readonly.value = cls.uuid = 'uuid:' + (uuid++),
            Object.defineProperty(fn, 'classId', readonly);
            
            readonly.value = cls.className = this._construct.value.name,
            Object.defineProperty(fn, 'className', readonly);
            
            if(!(cls.uuid in counter)) counter[cls.uuid] = 0;

            for (k in inheritedStatic) {

                this.static(k, inheritedStatic[k]);
            }
            
            fieldSet(fn, this._field),
            methodSet(fn, this._method),
            fieldSet(cls, this._constant, true),
            fieldSet(cls, this._event, true),
            methodSet(cls, this._static, true),
            cls.prototype = fn,
            Object.freeze(cls);
            if (parent) Object.freeze(fn);
            return cls;
        };
    })(),
    func = function(type){
        return {value:function(k, v, isdoc){
            if (typeof v == 'function') {
                if (!isdoc) this[type][k] = {value:v},
                this._info[type][k] = {
                    description:(type == '_static' ? 'Static method' : 'Method') + ' of ' + this._construct.value.name,
                    param:param(v),
                    ret:'?'
                };
            } else {
                if (!isdoc) {
                    this[type][k] = {value:v.value};
                }
                this._info[type][k] = {
                    description:v.description,
                    param:v.param || (!isdoc ? param(v.value) : ''),
                    ret:v.ret,
                    sample:v.sample,
                    exception: v.exception
                };
            }
            return this;
        }};
    },
    keys = 'configurable,enumerable,writable,get,set,value'.split(','),
    val = function(type){
        return {value:function(k, v, isdoc){
            var p, i;
            if (!v || typeof v !== 'object') {
                if (v === undefined) {
                    p = {},
                    this[type][k] = {
                        get:function(){return p[this.uuid];},
                        set:function(v){p[this.uuid] = v;}
                    };
                } else {
                    this[type][k] = {value:k};
                }
                this._info[type][k] = {
                    description:(type == '_constant' ? 'Const' : type == '_event' ? 'Event' : 'Field') + ' of ' + this._construct.value.name
                };
            } else {
                if (!isdoc) {
                    this[type][k] = p = {},
                    i = keys.length;
                    while (i--) {
                        if (keys[i] in v) {
                            p[keys[i]] = v[keys[i]];
                        }
                    }
                }
                this._info[type][k] = {
                    type:v.type,
                    description:v.description || (type == '_constant' ? 'Const' : type == '_event' ? 'Event' : 'Field') + ' of ' + this._construct.value.name,
                    defaultValue:v.defaultValue,
                    sample:v.sample,
                    exception: v.exception
                };
            }
            if (!isdoc && 'value' in this[type][k]) this._info[type][k].value = this[type][k].value;
            return this;
        }};
    },
    Object.defineProperties(Definer.prototype, {
        method:func('_method'),
        static:func('_static'),
        field:val('_field'),
        constant:val('_constant'),
        event:val('_event'),
        build:{value:build}
    });
    Object.freeze(Definer),
    Object.freeze(Definer.prototype);
    MoGL = (function(){
        var init, updated, listener;
        listener = {},
        updated = {},
        init = new Definer('MoGL', {
            description:[
                'MoGL 라이브러리의 모든 클래스는 MoGL을 상속함',
                '* 보통 직접적으로 MoGL 클래스를 사용하는 경우는 없음'
            ],
            sample:"var instance = new MoGL();",
            value:MoGL
        }, null, checker)
        .field('id', idProp)
        .field('isUpdated', {
            description:[
                '현재 인스턴스의 업데이트여부를 관리하는 플래그',
                '* 상태가 바뀌면 MoGL.updated 이벤트가 발생함'
            ],
            type:'boolean',
            defaultValue:'false',
            sample: [
                "var scene = new Scene();",
                "scene.addEventListener( 'updated', function(v){",
                "  console.log(v); //2. 리스너가 발동함 - true",
                "} );",
                "console.log( scene.isUpdated ); //false",
                "scene.isUpdated = true; //1. 값을 바꾸면",
            ],
            get:function isUpdatedGet() {
                return updated[this] || false;
            },
            set:function isUpdatedSet(v) {
                this.dispatch( 'updated', updated[this] = v );//set과 동시에 디스패치
            }
        })
        .field('uuid', {
            description:'현재 인스턴스의 고유한 uuid',
            type:'string',
            sample: [
                "var scene = new Scene();",
                "console.log(scene.uuid); // 'uuid:24'"
            ]
        }, true)
        .field('className', {
            description:'인스턴스의 클래스이름',
            type:'string',
            sample: [
                "var scene = new Scene();",
                "console.log(scene.className); // 'Scene'"
            ]
        }, true)
        .field('classId', {
            description:'인스턴스의 클래스uuid',
            type:'string',
            sample: [
                "var scene = new Scene();",
                "console.log(scene.classId); // 'uuid:22'"
            ]
        }, true)
        .method('error', {
            param:'id:int - 예외의 고유 식별번호',
            description:[
                'MoGL 표준 예외처리를 함',
                "주어진 인자에 따라 className + '.' + methodName + ':' + id 형태로 예외메세지가 출력됨",
                '클래스의 메서드 내에서 사용함'
            ],
            ret:'Object - 인자로보낸 context 또는 생략시 임의로 생성된 오브젝트',
            sample:[
                "fn.action = function(a){",
                "  if(!a) this.error(0);",
                "};"
            ],
        }, true)
        .method('toString', {
            description:"MoGL을 상속하는 모든 인스턴스는 toString상황에서 'uuid:고유번호' 형태의 문자열을 반환함",
            ret:"string - this.uuid에 해당되는 'uuid:고유번호' 형태의 문자열",
            sample:[
                "var mat = new Matrix();",
                "console.log( mat + '' ); // 'uuid:22'"
            ],
        }, true)
        .method('destroy', {
            description:'해당 event의 리스너들에게 이벤트를 통지함. 추가인자를 기술하면 그 인자도 전달됨',
            sample:[
                "var city1 = Scene();",
                "city1.destroy();"
            ],
            value:destroy
        })
        .method('setId', {
            param:'id:string - 설정할 id값. null로 설정시 삭제됨',
            description:'id는 본래 속성값이나 메서드체이닝목적으로 사용하는 경우 setId를 쓰면 편리함',
            ret:'this',
            sample:"var city1 = Scene().setId('city1');",
            value:function setId(v) {
                this.id = v;
                return this;
            }
        })
        .method('setProperties', {
            param:'vo:Object - 키,값 쌍으로 되어있는 설정용 객체(delay time ease repeat yoyo 등의 상수키를 포함할 수 있음)',
            description:[
               'vo로 넘어온 속성을 일시에 설정함',
                '* vo에 MoGL.time이 포함되면 애니메이션으로 간주하여 보간애니메이션으로 처리됨'
            ],
            ret:'this',
            sample:[
                "var mat = Matrix();",
                "//즉시반영",
                "mat.setProperties( {x:10, y:20, z:30} );",
                "",
                "//보간애니메이션실행",
                "var vo = {x:0, y:0, z:0};",
                "var ani = {time:1, delay:2, repeat:1, ease:MoGL.easing.sineOut};",
                "mat.setProperties( vo, ani );"
            ],
            value:(function(){
                var loopstart, loop, target, aid = 0;
                loop = function loop(t){
                    var k0, k1, ani, inst, prop, init, rate;
                    for (k0 in target) {
                        ani = target[k0];
                        if (t > ani.start) {//딜레이대기체크
                            inst = ani.target,
                            init = ani.init,
                            prop = ani.prop;
                            if (t > ani.end) {//완료상황
                                if (ani.repeat > 1) {//반복체크
                                    ani.repeat--,
                                    ani.start = t,
                                    ani.end = t + ani.term;
                                    if (ani.yoyo) {//요요체크
                                        ani.init = prop,
                                        ani.prop = init;
                                    }
                                } else {//완전히 종료
                                    for(k1 in prop){
                                        inst[k1] = prop[k1];
                                    }
                                    delete target[k0];
                                    inst.dispatch(MoGL.propertyChanged);
                                }
                            } else {//진행중
                                var ease = ani.ease,
                                rate = (t - ani.start) / ani.term;
                                for(k1 in prop){
                                    inst[k1] = ease(rate, init[k1], prop[k1] - init[k1]);
                                }
                            }
                        }
                    }
                    requestAnimationFrame(loop);
                },
                target = {};
                return function setProperties(v, opt) {
                    var k, ani, start, end, term;
                    if (opt) {
                        target[aid++] = ani = {
                            ease:opt.ease || ($ease ? $ease.linear : function(){}),
                            repeat:opt.repeat || 0,
                            yoyo:opt.yoyo || false,
                            target:this,
                            prop:v,
                            init:{},
                            start:performance.now() + ('delay' in opt ? opt.delay * 1000 : 0),
                            term:opt.time * 1000
                        };
                        ani.end = ani.start + ani.term;
                        for (k in v) ani.init[k] = this[k];
                        if (!loopstart) {
                            loopstart = true;
                            requestAnimationFrame(loop);
                        }
                    } else {
                        for (k in v) this[k] = v[k];
                        this.dispatch(MoGL.propertyChanged);
                    }
                };
            })()
        })
        .method('addEventListener', {//이벤트시스템
            param:[
                'event:string - 이벤트타입',
                'listener:function - 등록할 리스너',
                '?context:* - this에 매핑될 컨텍스트(false무시)',
                '?...arg - 추가적인 인자(dispatch시점의 인자 뒤에 붙음)'
            ],
            description:'해당 이벤트에 리스너를 추가함',
            ret:'this',
            sample:[
                "var city1 = Scene();",
                "city1.addEventListener( 'updated', function(v){",
                "  console.log(v);",
                "});",
                "var city2 = Scene();",
                "city1.addEventListener( 'updated', function(v, added){",
                "  console.log(this == city2);",
                "  console.log(added == 10);",
                "}, city2, 10);"
            ],
            value:function addEventListener(ev, f) {
                var target;
                if (!listener[this]) listener[this] = {};//private저장소에 this용 공간 초기화
                target = listener[this];
                if (!target[ev]) target[ev] = [];//해당 이벤트용 공간 초기화
                target = target[ev];
                target[target.length] = {
                    f:f, 
                    cx:arguments[2] || this, 
                    arg:arguments.length > 3 ? Array.prototype.slice.call(arguments, 3) : null
                };
                return this;
            }
        })
        .method('removeEventListener', {
            param:[
                'event:string - 이벤트타입',
                '?listener:string or function - 삭제할 리스너. string인 경우는 함수의 이름으로 탐색하고 생략시 해당 이벤트리스너전부를 제거함'
            ],
            description:'해당 이벤트에 리스너를 제거함',
            ret:'this',
            sample:[
                "var scene = new Scene();",
                "scene.removeEventListener(MoGL.updated, listener);"
            ],
            value:function removeEventListener(ev, f) {
                var target, i;
                if( f ){
                    if (listener[this] && listener[this][ev]) {
                        target = listener[this][ev],
                        i = target.length;//해당이벤트의 리스너를 루프돌며 삭제
                        while (i--) {
                            if ((typeof f == 'string' && target[i].f.name == f) || target[i].f === f) {//삭제하려는 값이 문자열인 경우 리스너이름에 매칭, 함수인 경우는 리스너와 직접 매칭
                                target.splice(i, 1);
                            }
                        }
                    }
                }else{
                    if (listener[this] && listener[this][ev]) delete listener[this][ev]; //전체를 삭제
                }
                return this;
            }
        })
        .method('dispatch', {
            param:[
                'event:string - 이벤트타입',
                '?...arg - 추가적으로 보낼 인자'
            ],
            description:'해당 event의 리스너들에게 이벤트를 통지함. 추가인자를 기술하면 그 인자도 전달됨',
            ret:'this',
            sample:[
                "var scene = new Scene();",
                "city1.dispatch( 'updated', city.isUpdated );"
            ],
            value:function dispatch(ev) {
                var target, arg, i, j, k, l;
                if (listener[this] && listener[this][ev]) {
                    if(arguments.length > 1) arg = Array.prototype.slice.call(arguments, 1);//만약 추가로 보낸 인자가 있다면 리스너에게 apply해줌.
                    for (target = listener[this][ev], i = 0, j = target.length ; i < j ; i++) {
                        k = target[i];
                        if (arg) {
                            if (k.arg) {
                                k.f.apply(k.cx, arg.concat(k.arg));
                            } else{
                                k.f.apply(k.cx, arg);
                            }
                        } else {
                            if (k.arg) {
                                k.f.apply(k.cx, k.arg);
                            } else{
                                k.f.call(k.cx);
                            }
                        }
                    }
                }
                return this;
            }
        })
        .static('classes', {
            param:'context:Object - 클래스를 복사할 객체. 생략시 빈 오브젝트가 생성됨',
            description:[
                'MoGL로 생성된 모든 서브클래스를 해당 객체에 키로 복사함',
                '* new MoGL.Mesh 등의 코드가 길고 귀찮은 경우 임의의 네임스페이스나 window에 복사하는 기능'
            ],
            ret:'Object - 인자로보낸 context 또는 생략시 임의로 생성된 오브젝트',
            sample:[
                "//특정객체로 복사",
                "var $ = MoGL.classes();",
                "var scene = new $.Scene();",
                "",
                "//전역에 복사",
                "MoGL.classes(window);",
                "var scene = new Scene();"
            ],
            value:classGet
        })
        .static('totalCount', {
            description:'전체 인스턴스의 수를 반환함',
            ret:'int - 활성화된 인스턴스의 수',
            sample:"console.log( MoGL.count() );",
            value:totalCount
        })
        .event('updated', {
            description:[
                'isUpdated 속성이 변경될 때마다 발생함',
                '* 리스너에는 첫 번째 인자로 현재의 isUpdated상태가 주어짐'
            ],
            type:'string',
            sample: [
                "var scene = new Scene();",
                "scene.addEventListener( MoGL.updated, function(v){",
                "  console.log(v);",
                "} );"
            ],
            value:'updated'
        })
        .event('propertyChanged', {
            description:[
                'setProperties 호출시 설정이 완료되면 발생함',
                '* 애니메이션인 경우는 애니메이션 완료 후 발생',
                '* 리스너에 주어지는 인자는 없음',
            ],
            type:'string',
            sample: [
                "var mat = new Matrix();",
                "mat.addEventListener( MoGL.propertyChanged, function(){",
                "  console.log('changed');",
                "} );",
                "mat.setProperties({x:50}, {time:1});"
            ],
            value:'propertyChanged'
        })
        .constant('ease', {
            description:(function(){
                var i, v = [
                    'setProperties의 애니메이션에 사용될 보간함수',
                    '다음과 같은 값이 올 수 있음'
                ];
                for (i in $ease) {
                    v[v.length] = '* MoGL.ease.' + i;
                }
                return v;
            })(),
            type:'function',
            sample: [
                "var mat = new Matrix();",
                "mat.setProperties({x:50}, {time:1, ease:MoGL.ease.sineOut});"
            ],
            value:$ease
        });
        return init.build();
    })(),
    (function(){
        var fn = MoGL.prototype;
        fn.error = error,    
        fn.toString = function(){
            return this.uuid;
        },
        Object.freeze(fn);
    })();
    return MoGL;
})();
var Vector = MoGL.extend('Vector', {
    description:'벡터3D 클래스',
    param:[
        'x:number, y:number, z:number - 벡터 초기값을 넘버형으로 입력할 수 있음\n- '+
        '[x,y,z]:Array - 첫번째 인자에 배열(Float32Array or Array)형태로 입력 할 수 있음\n- '+
        '인자가 없을경우 0,0,0으로 초기화'
    ],
    sample:[
        'var vector = new Vector(1, 2, 3);',
        'var vector = new Vector([1, 2, 3]);',
        'var vector = new Vector(new Float32Array([1, 2, 3]));',
        'var vector = new Vector();',
        '',
        '// 팩토리 함수로도 사용 가능.',
        'var vector = Vector(1, 2, 3);'
    ],
    value: function Vector(x, y, z) {
        if (x instanceof Float32Array || Array.isArray(x)) {
            this.x = x[0], this.y = x[1], this.z = x[2]
        }
        else if (x == undefined) {
            this.x = this.y = this.z = 0
        } else {
            this.x = x, this.y = y, this.z = z
        }
    }
})
.method('add', {
    description:"현재 Vector 객체의 x, y 및 z 요소 값에 대상 객체의 x,y,z값을 더합니다",
    param:['vector:Vector'],
    ret : ['this'],
    sample:[
        'var vec1 = new Vector();',
        'var vec2 = new Vector();',
        'vec1.add(vec2);'
    ],
    value:function add(v) {
        var a = this;
        a.x += v.x, a.y += v.y, a.z += v.z;
        return this;
    }
})
.method('addXYZ', {
    description:"현재 Vector 객체의 x, y 및 z 요소 값에 인자 x,y,z값을 더합니다.",
    param:[
        'x:number - x값',
        'y:number - y값',
        'z:number - z값'
    ],
    ret : ['this'],
    sample:[
        'var vec1 = new Vector();',
        'vec1.addXYZ(10,20,30);'
    ],
    value:function addXYZ(x, y, z) {
        var a = this;
        a.x += (x || 0), a.y += (y || 0), a.z += (z || 0);
        return this;
    }
})
.method('subtract', {
    description:"현재 Vector 객체의 x, y 및 z 요소 값을 다른 Vector 객체의 x, y 및 z 요소 값에서 뺍니다.",
    param:['vector:Vector'],
    ret : ['this'],
    sample:[
        'var vec1 = new Vector();',
        'var vec2 = new Vector();',
        'vec1.subtract(vec2);'
    ],
    value:function subtract(v) {
        var a = this;
        a.x -= v.x, a.y -= v.y, a.z -= v.z;
        return this;
    }
})
.method('subtractXYZ', {
    description:"현재 Vector 객체의 x, y 및 z 요소 값을 다른 인자 x, y ,z 요소 값에서 뺍니다.",
    param:[
        'x:number - x값',
        'y:number - y값',
        'z:number - z값'
    ],
    ret : ['this'],
    sample:[
        'var vec1 = new Vector();',
        'vec1.subtractXYZ(10, 20, 30);'
    ],
    value:function subtractXYZ(x, y, z) {
        var a = this;
        a.x -= (x || 0), a.y -= (y || 0), a.z -= (z || 0);
        return this;
    }
})
.method('scaleBy', {
    description:"현재 Vector 객체의 크기를 스칼라 값만큼 조절합니다.",
    param:[
        'scale:number - scale값'
    ],
    ret : ['this'],
    sample:[
        'var vec1 = new Vector();',
        'vec1.scaleBy(10);'
    ],
    value:function scaleBy(s) {
        var a = this;
        a.x *= s, a.y *= s, a.z *= s;
        return this;
    }
})
.method('distance', {
    description:"현재 벡터와 대상 벡터 객체 사이의 거리를 반환합니다.",
    param:['vector:Vector'],
    ret : ['number'],
    sample:[
        'var vec1 = new Vector();',
        'var vec2 = new Vector();',
        'vec1.distance(vec2);'
    ],
    value:function distance(v) {
        var a = this;
        var x = v.x - a.x, y = v.y - a.y, z = v.z - a.z;
        return SQRT(x * x + y * y + z * z);
    }
})
.method('negate', {
    description:"현재 Vector 객체를 역수로 설정합니다.",
    param:['vector:Vector'],
    ret : ['this'],
    sample:[
        'var vec1 = new Vector();',
        'vec1.negate();'
    ],
    value:function negate() {
        var a = this;
        a.x = -a.x, a.y = -a.y, a.z = -a.z;
        return this;
    }
})
.method('normalize', {
    description:"현재 Vector의 단위벡터화된 길이입니다.",
    ret : ['this'],
    sample:[
        'var vec1 = new Vector();',
        'vec1.normalize();'
    ],
    value:function normalize() {
        var a = this;
        var x = a.x, y = a.y, z = a.z;
        var len = x * x + y * y + z * z;
        if (len > 0) len = 1 / SQRT(len), a.x *= len, a.y *= len, a.z *= len;
        return this;
    }
})
.method('dot', {
    description:"내적값 반환",
    param:['vector:Vector'],
    ret : ['number'],
    sample:[
        'var vec1 = new Vector();',
        'var vec2 = new Vector();',
        'vec1.dot(vec2);'
    ],
    value:function (v) {
        var a = this;
        return a.x * v.x + a.y * v.y + a.z * v.z;
    }
})
.method('cross', {
    description:"두벡터에 수직인 벡터를 반환",
    param:['vector:Vector'],
    ret : ['Vector'],
    sample:[
        'var vec1 = new Vector();',
        'var vec2 = new Vector();',
        'vec1.cross(vec2);'
    ],
    value:function (v) {
        var a = this, out = new Float32Array([0, 0, 0]);
        var ax = a.x, ay = a.y, az = a.z, bx = v.x, by = v.y, bz = v.z;
        out.x = ay * bz - az * by, out.y = az * bx - ax * bz, out.z = ax * by - ay * bx;
        return new Vector(out.x,out.y,out.z);
    }
})
.build();
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

var Vertex = MoGL.extend('Vertex', {
    description:"Vertex",
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:function Vertex() {}
})
.constant('x', {
    description:'x constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'x'
})
.constant('y', {
    description:'y constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'y'
})
.constant('z', {
    description:'z constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'z'
})
.constant('r', {
    description:'r constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'r'
})
.constant('g', {
    description:'g constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'g'
})
.constant('b', {
    description:'b constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'b'
})
.constant('a', {
    description:'a constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'a'
})
.constant('normalX', {
    description:'normalX constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'normalX'
})
.constant('normalY', {
    description:'normalY constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'normalY'
})
.constant('normalZ', {
    description:'normalZ constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'normalZ'
})
.constant('u', {
    description:'u constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'u'
})
.constant('v', {
    description:'v constant',
    sample:[
        "var geometry = new Geometry(vertexData, indexData, ",
        "  [Vertex.x, Vertex.y, Vertex.z, ",
        "   Vertex.r, Vertex.g, Vertex.b, Vertex.a, ",
        "   Vertex.normalX, Vertex.normalY, Vertex.normalZ, ",
        "   Vertex.u, Vertex.v]);"
    ],
    value:'v'
})
.build();
var BlendMode = MoGL.extend('BlendMode', {
    description:'BlendMode',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.add);'
    ],
    value:function BlendMode() {}
})
.constant('add', {
    description:'전면색을 배경색에 더하고 올림값 0xFF를 적용',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.add);'
    ],
    value:'add'
})
.constant('alpha', {
    description:'전면색의 알파값에 따라 배경색을 덮어가는 가장 일반적인 중첩',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.alpha);'
    ],
    value:'alpha'
})
.constant('darken', {
    description:'전면색과 배경색 중 보다 어두운 색상(값이 작은 색상)을 선택',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.darken);'
    ],
    value:'darken'
})
.constant('difference', {
    description:'전면색과 배경색을 비교하여 둘 중 밝은 색상 값에서 어두운 색상 값을 뺌',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.difference);'
    ],
    value:'difference'
})
.constant('erase', {
    description:'전면색의 알파만 적용하여 배경색을 지움',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.erase);'
    ],
    value:'erase'
})
.constant('hardlight', {
    description:'전면색의 어두운 정도를 기준으로 배경색을 조정',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.hardlight);'
    ],
    value:'hardlight'
})
.constant('invert', {
    description:'전면색을 이용하여 배경색을 반전시킴',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.invert);'
    ],
    value:'invert'
})
.constant('lighten', {
    description:'전면색과 배경색 중 보다 밝은 색(값이 큰 색상)으로 선택',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.lighten);'
    ],
    value:'lighten'
})
.constant('multiply', {
    description:'전면색에 배경색을 곱하고 0xFF로 나누어 정규화하여 보다 어두운 색을 만듬',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.multiply);'
    ],
    value:'multiply'
})
.constant('screen', {
    description:'전면색의 보수(역수)에 배경색 보수를 곱하여 표백 효과를 냄',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.screen);'
    ],
    value:'screen'
})
.constant('subtract', {
    description:'전면색의 값을 배경색에서 빼고 내림값 0을 적용',
    sample:[
        'var material = Material();',
        'material.addTexture(Texture.diffuse, new Texture(), null, BlendMode.subtract);'
    ],
    value:'subtract'
})
.build();
var Primitive = (function () {
    return MoGL.extend('Primitive', {
        description: "면, 정다각형, 정육면체 등 미리 정의된 기본 기하 객체를 static 방식으로 생성할 수 있게 해주는 객체",
        sample:[
            'var cube = Primitive.cube(2, 2);',
            'var geodesic = Primitive.geodesic(4);',
            'var plane = Primitive.plane(2, 2);'
        ],
        value:function Primitive(){}
    })
    .static('plane', {
        description: "면을 나타내는 Geometry 객체 반환",
        param: [
            'splitX - X축 방향 면의 분할수, 생략하면 기본값 1',
            'splitY - Y축 방향 면의 분할수, 생략하면 기본값 1'
        ],
        ret: [
            'Geometry - 점의 기하 정보를 담고 있는 Geometry 객체.'
        ],
        sample: [
            "var plane = Primitive.plane();",
            "var plane = Primitive.plane(2, 2);",
            "var plane = Primitive.plane(2, 3);",
            "var plane = Primitive.plane(10, 10);"
        ],
        exception: [
            "'Primitive.polygon:0' - splitX나 splitY의 값이 0일 때"
        ],
        value: function plane(splitX, splitY) {
            var _splitX = arguments[0] || 1, _splitY = arguments[1] || 1;
            var vs, is, x, y, base, tw;
            var index, numIndices;
            if (splitX == 0 || splitY == 0) this.error(0);
            tw = _splitX + 1, index = 0, numIndices = 0, vs = [], is = [];
            for (var yi = 0; yi <= _splitY; ++yi) {
                for (var xi = 0; xi <= _splitX; ++xi) {
                    x = (xi / _splitX - .5), //*_width;
                        y = (yi / _splitY - .5), //*_height;
                        vs[index++] = x, vs[index++] = 0, vs[index++] = y, // x,y,z
                        vs[index++] = (xi / _splitX), vs[index++] = yi / _splitY; // u,v
                    if (xi != _splitX && yi != _splitY) {
                        base = xi + yi * tw;
                        is[numIndices++] = base, is[numIndices++] = (base + tw), is[numIndices++] = (base + tw + 1), is[numIndices++] = base, is[numIndices++] = (base + tw + 1), is[numIndices++] = (base + 1);
                    }
                }
            }
            var result = new Geometry(vs, is, [Vertex.x, Vertex.y, Vertex.z, Vertex.u, Vertex.v]);

            return result;
        }
    })
    .static('polygon', {
        description: "정다각형 Geometry 객체 반환",
        param: [
            'n - 꼭지점의 수'
        ],
        ret: [
            'Geometry - 정다각형 기하 정보를 담고 있는 Geometry 객체.'
        ],
        sample: [
            "var triangle = Primitive.polygon(3);",
            "var square = Primitive.polygon(4);",
            "var pentagon = Primitive.polygon(5);",
        ],
        exception: [
            "'Primitive.polygon:0' - n이 3보다 작을 때"
        ],
        value: function polygon(n) {
            n = arguments[0] || 3;
            if (n < 3) this.error(0);

            var i, j, angle = 2 * PI / n, x, y, z, u, v,
                vs = [0.0, 1.0, 0.0, 0.5, 0.0], is = [], vertCoords = vs.length,
                result;

            for (i = 0; i < n - 1; i = i / vertCoords + 1) {
                x = vs[i *= vertCoords] * COS(angle) - vs[++i] * SIN(angle),
                    y = vs[--i] * SIN(angle) + vs[++i] * COS(angle),
                    z = vs[--i + 2],
                    u = 0.5 + (x / 1.0) / 2,
                    v = 0.5 - (y / 1.0) / 2,
                    vs.push(x, y, z, u, v);
                if (i > 0) {
                    j = i / vertCoords;
                    is.push(0, j, j + 1); // 최상단 최초 꼭지점 기준
                }
            }
            result = new Geometry(vs, is, [Vertex.x, Vertex.y, Vertex.z, Vertex.u, Vertex.v]);

            return result;
        }
    })
    .static('cube', {
        description: "정육면체 Geometry 객체 반환",
        param: [
            'splitX - 각 면의 X축 방향 분할값',
            'splitY - 각 면의 Y축 방향 분할값',
            'splitZ - 각 면의 Z축 방향 분할값'
        ],
        ret: [
            'Geometry - 정육면체 기하 정보를 담고 있는 Geometry 객체.'
        ],
        sample: [
            "var cube = Primitive.cube();"
        ],
        exception: [
            "'Primitive.cube:0' - 인자값에 0이 포함되어 있을 때"
        ],
        value: function cube(splitX, splitY, splitZ) {
            var _segmentsW,_segmentsH,_segmentsD;
            var vs,is;
            var tl, tr, bl, br, i, j, inc = 0;
            var vidx, fidx; // is
            var hw, hh, hd; // halves
            var dw, dh, dd; // deltas
            var outer_pos;
            var u_tile_dim, v_tile_dim, u_tile_step, v_tile_step;
            var tl0u, tl0v, tl1u, tl1v,du, dv;
            _segmentsW = arguments[0] || 1, _segmentsH = arguments[1] || 1, _segmentsD = arguments[2] || 1,
                vs = [],is = [],
                vidx = 0, fidx = 0,// is
                hw = 1 / 2, hh = 1 / 2, hd = 1 / 2,// half cube dimensions
                dw = 1 / _segmentsW, dh = 1 / _segmentsH, dd = 1 / _segmentsD,// Segment dimensions
                u_tile_dim = 1, v_tile_dim = 1, u_tile_step = 0, v_tile_step = 0;
            tl0u = u_tile_step, tl0v = v_tile_step, tl1u = 2 * u_tile_step, tl1v = 0, du = u_tile_dim / _segmentsW, dv = v_tile_dim / _segmentsH;

            if (_segmentsW == 0 && _segmentsH == 0, _segmentsD == 0) this.error(0);

            for (i = 0; i <= _segmentsW; i++) {
                outer_pos = -hw + i*dw;
                for (j = 0; j <= _segmentsH; j++) {
                    // front
                    vs[vidx++] = outer_pos,vs[vidx++] = -hh + j*dh,vs[vidx++] = -hd,
                        vs[vidx++] = 1-( tl0u + i*du ),vs[vidx++] = ( tl0v + (v_tile_dim - j*dv)),
                        // back
                        vs[vidx++] = outer_pos, vs[vidx++] = -hh + j * dh, vs[vidx++] = hd,
                        vs[vidx++] = 1-( tl1u + (u_tile_dim - i * du)), vs[vidx++] = ( tl1v + (v_tile_dim - j * dv));
                    if (i && j) tl = 2 * ((i - 1) * (_segmentsH + 1) + (j - 1)), tr = 2 * (i * (_segmentsH + 1) + (j - 1)), bl = tl + 2, br = tr + 2, is[fidx++] = tl, is[fidx++] = bl, is[fidx++] = br, is[fidx++] = tl, is[fidx++] = br, is[fidx++] = tr, is[fidx++] = tr + 1, is[fidx++] = br + 1, is[fidx++] = bl + 1, is[fidx++] = tr + 1, is[fidx++] = bl + 1, is[fidx++] = tl + 1;
                }
            }
            inc += 2 * (_segmentsW + 1) * (_segmentsH + 1), tl0u = u_tile_step, tl0v = 0, tl1u = 0, tl1v = 0, du = u_tile_dim / _segmentsW, dv = v_tile_dim / _segmentsD;
            for (i = 0; i <= _segmentsW; i++) {
                outer_pos = -hw + i*dw;
                for (j = 0; j <= _segmentsD; j++) {
                    // top
                    vs[vidx++] = outer_pos, vs[vidx++] = hh, vs[vidx++] = -hd + j * dd,
                        vs[vidx++] = 1-( tl0u + i * du), vs[vidx++] = ( tl0v + (v_tile_dim - j * dv)),
                        // bottom
                        vs[vidx++] = outer_pos, vs[vidx++] = -hh, vs[vidx++] = -hd + j * dd,
                        vs[vidx++] = 1-( tl1u + i * du), vs[vidx++] = ( tl1v + j * dv);
                    if (i && j) tl = inc + 2 * ((i - 1) * (_segmentsD + 1) + (j - 1)), tr = inc + 2 * (i * (_segmentsD + 1) + (j - 1)), bl = tl + 2, br = tr + 2, is[fidx++] = tl, is[fidx++] = bl, is[fidx++] = br, is[fidx++] = tl, is[fidx++] = br, is[fidx++] = tr, is[fidx++] = tr + 1, is[fidx++] = br + 1, is[fidx++] = bl + 1, is[fidx++] = tr + 1, is[fidx++] = bl + 1, is[fidx++] = tl + 1;
                }
            }
            inc += 2 * (_segmentsW + 1) * (_segmentsD + 1), tl0u = 0, tl0v = v_tile_step, tl1u = 2 * u_tile_step, tl1v = v_tile_step, du = u_tile_dim / _segmentsD, dv = v_tile_dim / _segmentsH;
            for (i = 0; i <= _segmentsD; i++) {
                outer_pos = hd - i*dd;
                for (j = 0; j <= _segmentsH; j++) {
                    // left
                    vs[vidx++] = -hw, vs[vidx++] = -hh + j * dh, vs[vidx++] = outer_pos,
                        vs[vidx++] = 1-( tl0u + i*du),vs[vidx++] = ( tl0v + (v_tile_dim - j*dv));
                    // right
                    vs[vidx++] = hw, vs[vidx++] = -hh + j * dh, vs[vidx++] = outer_pos;
                    vs[vidx++] = 1-( tl1u + (u_tile_dim - i * du)), vs[vidx++] = ( tl1v + (v_tile_dim - j * dv));
                    if (i && j) tl = inc + 2 * ((i - 1) * (_segmentsH + 1) + (j - 1)), tr = inc + 2 * (i * (_segmentsH + 1) + (j - 1)), bl = tl + 2, br = tr + 2, is[fidx++] = tl, is[fidx++] = bl, is[fidx++] = br, is[fidx++] = tl, is[fidx++] = br, is[fidx++] = tr, is[fidx++] = tr + 1, is[fidx++] = br + 1, is[fidx++] = bl + 1, is[fidx++] = tr + 1, is[fidx++] = bl + 1, is[fidx++] = tl + 1;
                }
            }
            var result = new Geometry(vs, is, [Vertex.x, Vertex.y, Vertex.z, Vertex.u, Vertex.v]);
            return result;
        }
    })
    .static('sphere', {
        description: "구를 나타내는 Geometry 객체 반환",
        param: [
            'splitLatitude - 위도 방향 분할수',
            'splitLongitude - 경도 방향 분할수'
        ],
        ret: [
            'Geometry - 구의 기하 정보를 담고 있는 Geometry 객체.'
        ],
        sample: [
            "var sphere = Primitive.sphere();"
        ],
        exception: [
            "'Primitive.sphere:0' - 인자값에 0이 포함되어 있을 때"
        ],
        value: function sphere(splitLatitude, splitLongitude) {
            var vs = [];
            var is = [];
            var latitudeBands = splitLatitude;
            var longitudeBands = splitLongitude;
            var radius = 1.0;
            if (splitLatitude == 0 || splitLongitude == 0) this.error(0);

            for (var latNumber = 0; latNumber <= latitudeBands; ++latNumber) {
                var theta = latNumber * PI / latitudeBands;
                var sinTheta = SIN(theta);
                var cosTheta = COS(theta);
                for (var longNumber = 0; longNumber <= longitudeBands; ++longNumber) {
                    var phi = longNumber * 2 * PI / longitudeBands;
                    var sinPhi = SIN(phi);
                    var cosPhi = COS(phi);

                    var x = cosPhi * sinTheta;
                    var y = cosTheta;
                    var z = sinPhi * sinTheta;
                    var u = 1 - longNumber / longitudeBands;
                    var v = 1 - latNumber / latitudeBands;
                    vs.push(radius * x, radius * y, radius * z, u, v);
                }
            }
            for (latNumber = 0; latNumber < latitudeBands; ++latNumber) {
                for (longNumber = 0; longNumber < longitudeBands; ++longNumber) {
                    var first = latNumber * (longitudeBands + 1) + longNumber;
                    var second = first + longitudeBands + 1;
                    is.push(second, first, first + 1, second + 1, second, first + 1);
                }
            }
            var result = new Geometry(vs, is, [Vertex.x, Vertex.y, Vertex.z, Vertex.u, Vertex.v]);

            return result;
        }
    })
    .static('geodesic', {
        description: "geodesic Geometry 객체 반환",
        param: [
            'n - 구면을 분할하는 삼각형의 개수'
        ],
        ret: [
            'Geometry - 극점에서 삼각형이 집중되지 않는 geodesic sphere 기하 정보를 담고 있는 Geometry 객체.'
        ],
        sample: [
            "var geodesic = Primitive.geodesic();"
        ],
        exception: [
            "'Primitive.geodesic:0' - n이 3보다 작을 때"
        ],
        value: function geodesic() {
            var radius = 0.5, fractures = arguments[0] || 30, yUp = true;
            var hnLat = fractures; //위도 방향 쪼갠수/2
            var nLat = 2*hnLat; //위도 방향 쪼갠수
            var nLon; //위도에 대한 경도 방향 쪼갠수
            var lon; //경도 (단위:라디안)
            var lat; //위도(단위:라디안)
            var dLat = 180 / nLat * D2R; //위도 간격(단위:라디안)
            var dLon; //경도  간격(단위:라디안)
            var i, j, x, y, z, sinLat, cosLat, sinLon, cosLon, u, v;
            var _vertices=[], _indices = [];
            // latitude -90->0 :
            x = 0, y = 0, z = -radius;
            yUp ? _vertices.push(x, -z, y, 0, 0) : _vertices.push(x, y, z, 0, 0);
            for (i = 0; i < hnLat; i++) {
                nLon = 4 * (i + 1); //경도방향 꼭지점수 4, 8, 12, 16, 20...
                dLon = 360 / nLon * D2R, lat = -PIH + (i + 1) * dLat, v = (PIH + lat) / PI, sinLat = SIN(lat), cosLat = COS(lat),z = radius * sinLat;
                for (j = 0; j <= nLon; j++) lon = j * dLon, sinLon = SIN(lon), cosLon = COS(lon), x = radius * cosLat * cosLon, y = radius * cosLat * sinLon, u = 1-lon / PID, yUp ? _vertices.push(x, -z, y, u, v) : _vertices.push(x, y, z, u, v);
            }
            //latitude 0 -> 90
            for (i = 1; i < hnLat; i++) {
                nLon = 4 * (hnLat - i), dLon = 360 / nLon * D2R, lat = dLat * i, v = (PIH + lat) / PI, sinLat = SIN(lat), cosLat = COS(lat), z = radius * sinLat;
                for (j = 0; j <= nLon; j++) lon = j * dLon, sinLon = SIN(lon), cosLon = COS(lon), x = radius * cosLat * cosLon, y = radius * cosLat * sinLon, u = 1-lon / PID, yUp ? _vertices.push(x, -z, y, u, v) : _vertices.push(x, y, z, u, v);
            }
            x = 0, y = 0, z = radius, yUp ? _vertices.push(x, -z, y, u, v) : _vertices.push(x, y, z, u, v);
            var k, pt0, pt1, pt2, u_idx_start, u_idx_end, u_idx, l_idx_start, l_idx_end, l_idx, isUp, tris, triIdx;
            //Latitude -90->0
            tris = 1, u_idx_start = 0, u_idx_end = 0;
            for (i = 0; i < hnLat; ++i) {
                l_idx_start = u_idx_start, l_idx_end = u_idx_end, u_idx_start += 4 * i + 1, u_idx_end += 4 * (i + 1) + 1, l_idx = l_idx_start, u_idx = u_idx_start;
                //4분면을 따라 Face를 만들도록 한다.
                for (k = 0; k < 4; ++k) {
                    isUp = 1;
                    for (triIdx = 0; triIdx < tris; ++triIdx) {
                        if (isUp === 1) pt0 = l_idx, pt2 = u_idx, u_idx++, pt1 = u_idx, isUp = 0;
                        else pt0 = u_idx, pt1 = l_idx, l_idx++, pt2 = l_idx, isUp = 1;
                        _indices.push(pt0, pt1, pt2);
                    }
                }
                tris += 2; //한개의 분면에서 해당 적위에 대한 면의 수는 2씩 증가한다.
            }
            //Latitude 0 -> 90
            for (i = hnLat - 1; i >= 0; i--) {
                l_idx_start = u_idx_start,
                    l_idx_end = u_idx_end,
                    u_idx_start = u_idx_start + 4 * (i + 1) + 1,
                    u_idx_end = u_idx_end + 4 * i + 1,
                    tris -= 2,
                    u_idx = u_idx_start,
                    l_idx = l_idx_start;
                for (k = 0; k < 4; ++k) {
                    isUp = 0;
                    for (triIdx = 0; triIdx < tris; triIdx++) {
                        if (isUp === 1) pt0 = l_idx, pt2 = u_idx, u_idx++, pt1 = u_idx, isUp = 0;
                        else pt0 = u_idx, pt1 = l_idx, l_idx++, pt2 = l_idx, isUp = 1;
                        _indices.push(pt0, pt1, pt2);
                    }
                }
            }
            var result = new Geometry(_vertices, _indices, [Vertex.x, Vertex.y, Vertex.z,Vertex.u,Vertex.v]);

            return result;
        }
    })
    .static('skybox', {
        description: "3차원 배경이 되어주는 큐브 형태의 Geometry 객체 반환 - 아직 미구현",
        param: [
            'splitX - 각 면의 X축 방향 분할값',
            'splitY - 각 면의 Y축 방향 분할값',
            'splitZ - 각 면의 Z축 방향 분할값'
        ],
        ret: [
            'Geometry - 3차원 배경 기하 정보를 담고 있는 Geometry 객체.'
        ],
        sample: [
            "var geodesic = Primitive.skybox();"
        ],
        exception: [
            "'Primitive.skybox:0' - 인자값에 0이 들어있을 때"
        ],
        value: function skybox(splitX, splitY, splitZ) {
            if (splitX == 0 || splitY == 0 || splitZ == 0) this.error(0)
        }
    })
    .build();
})();

var Shading = MoGL.extend('Shading', {
    description:'Shading',
    sample:[
        "var material = new Material('#fff');",
        "material.shading = Shading.phong;"
    ],
    value:function Shading() {}
})
.constant('none', {
    description:'none constant',
    sample:[
        "var material = new Material('#fff');",
        "material.shading = Shading.none;"
    ],
    value:'none'
})
.constant('gouraud', {
    description:'gouraud constant',
    sample:[
        "var material = new Material('#fff');",
        "material.shading = Shading.gouraud;"
    ],
    value:'gouraud'
})
.constant('phong', {
    description:'phong constant',
    sample:[
        "var material = new Material('#fff');",
        "material.shading = Shading.phong;"
    ],
    value:'phong'
})
.constant('blinn', {
    description:'blinn constant',
    sample:[
        "var material = new Material('#fff');",
        "material.shading = Shading.blinn;"
    ],
    value:'blinn'
})
.constant('flat', {
    description:'flat constant',
    sample:[
        "var material = new Material('#fff');",
        "material.shading = Shading.flat;"
    ],
    value:'flat'
})
.constant('toon', {
    description:'toon',
    sample:[
        "var material = new Material('#fff');",
        "material.shading = Shading.toon;"
    ],
    value:'toon'
})
.build();

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
    '   mat4 m1 = mat4( 1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1);s = sin(t[1]);c = cos(t[1]);\n' +
    '   mat4 m2 = mat4(c,0,-s,0, 0,1,0,0, s,0,c,0,  0,0,0,1);s = sin(t[2]);c = cos(t[2]);\n' +
    '   mat4 m3 = mat4(c,s,0,0, -s,c,0,0, 0,0,1,0,  0,0,0,1);\n' +
    '   return m3*m2*m1;\n' +
    '}\n'
};
Object.freeze(VertexShader);

var Shader = (function () {
    var code;
    //private
    code = {};
    $setPrivate('Shader', {});
    return MoGL.extend('Shader', {
            description: "쉐이더 클래스. 버텍스쉐이더와 프레그먼트 쉐이더를 생성.",
            param : [
                "1. v:Object - 오브젝트 형태로 쉐이더 정보를 입력",
                "2. 버텍스쉐이더 - { id:'', attributes:[], uniforms:[], varyings[], function:[], main[]",
                "3. 프레그먼트쉐이더 - { id:'', uniforms:[], varyings[], function:[], main[]"
            ],
            sample: [
                "var shader = new Shader();"
            ],
            value: function Shader(v) {
                code[this] = v;
            }
        }
    )
        .field('code', {
            description : '쉐이더 구성정보 코드(JS)를 반환',
            get: $getter(code),
            sample: [
                "var shader = new Shader();",
                "console.log(shader.code);"
            ]
        }
    )
        .constant('colorVertexShader', {
            description: "컬러 버텍스 쉐이더",
            sample: [
                "console.log(Shader.colorVertexShader);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'colorVertexShader',
                            attributes: ['vec3 aVertexPosition'],
                            uniforms: ['mat4 uPixelMatrix', 'mat4 uCameraMatrix', 'vec3 uRotate', 'vec3 uScale', 'vec3 uPosition', 'vec4 uColor'],
                            varyings: ['vec4 vColor'],
                            function: [VertexShader.baseFunction],
                            main: [
                                'gl_Position = uPixelMatrix*uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale)*vec4(aVertexPosition, 1.0);\n' +
                                'vColor = uColor;'
                            ]
                        }))
                }
            })()
        })
        .constant('colorFragmentShader', {
            description: "컬러 프레그먼트 쉐이더",
            sample: [
                "console.log(Shader.colorFragmentShader);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'colorFragmentShader',
                            precision: 'mediump float',
                            uniforms: [],
                            varyings: ['vec4 vColor'],
                            function: [],
                            main: [
                                'gl_FragColor =  vColor'
                            ]
                        }))
                }
            })()
        })
        .constant('wireFrameVertexShader', {
            description: "와이어프레임 버텍스 쉐이더",
            sample: [
                "console.log(Shader.wireFrameVertexShader);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'wireFrameVertexShader',
                            attributes: ['vec3 aVertexPosition'],
                            uniforms: ['mat4 uPixelMatrix', 'mat4 uCameraMatrix', 'vec3 uRotate', 'vec3 uScale', 'vec3 uPosition', 'vec4 uColor'],
                            varyings: ['vec4 vColor'],
                            function: [VertexShader.baseFunction],
                            main: [
                                'gl_Position = uPixelMatrix*uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale)*vec4(aVertexPosition, 1.0);\n' +
                                'vColor = uColor ;'
                            ]
                        }))
                }
            })()
        })
        .constant('wireFrameFragmentShader', {
            description: "와이어프레임 프레그먼트 쉐이더",
            sample: [
                "console.log(Shader.wireFrameFragmentShader);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'wireFrameFragmentShader',
                            precision: 'mediump float',
                            uniforms: [],
                            varyings: ['vec4 vColor'],
                            function: [],
                            main: [
                                'gl_FragColor =  vColor;'
                            ]
                        }))
                }
            })()
        })
        .constant('bitmapVertexShader', {
            description: "비트맵 버텍스 쉐이더",
            sample: [
                "console.log(Shader.bitmapVertexShader);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'bitmapVertexShader',
                            attributes: ['vec3 aVertexPosition', 'vec2 aUV'],
                            uniforms: ['mat4 uPixelMatrix', 'mat4 uCameraMatrix', 'vec3 uRotate', 'vec3 uScale', 'vec3 uPosition'],
                            varyings: ['vec2 vUV'],
                            function: [VertexShader.baseFunction],
                            main: [
                                'gl_Position = uPixelMatrix*uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale)*vec4(aVertexPosition, 1.0);\n' +
                                'vUV = aUV;'
                            ]
                        }))
                }
            })()
        })
        .constant('bitmapFragmentShader', {
            description: "비트맵 프레그먼트 쉐이더",
            sample: [
                "console.log(Shader.bitmapFragmentShader);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'bitmapFragmentShader',
                            precision: 'mediump float',
                            uniforms: ['sampler2D uSampler'],
                            varyings: ['vec2 vUV'],
                            function: [],
                            main: [
                                'gl_FragColor =  texture2D(uSampler, vec2(vUV.s, vUV.t))'
                            ]
                        }))
                }
            })()
        })
        .constant('colorVertexShaderGouraud', {
            description: "컬러 고라우드 버텍스 쉐이더",
            sample: [
                "console.log(Shader.colorVertexShaderGouraud);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'colorVertexShaderGouraud',
                            attributes: ['vec3 aVertexPosition', 'vec3 aVertexNormal'],
                            uniforms: ['mat4 uPixelMatrix', 'mat4 uCameraMatrix', 'vec3 uDLite', 'float uLambert', 'vec3 uRotate', 'vec3 uScale', 'vec3 uPosition', 'vec4 uColor'],
                            varyings: ['vec4 vColor'],
                            function: [VertexShader.baseFunction],
                            main: [
                                ' mat4 mv = uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
                                ' gl_Position = uPixelMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
                                ' vec3 N = (mv * vec4(aVertexNormal, 0.0)).xyz;\n' +
                                ' vec3 LD = normalize(vec4(uDLite, 0.0)).xyz;\n' +
                                ' float df = max(0.1,dot(N,-LD)*uLambert);\n' +
                                ' vColor = uColor*df;' +
                                ' vColor[3] = uColor[3];'
                            ]
                        }))
                }
            })()
        })
        .constant('colorFragmentShaderGouraud', {
            description: "컬러 고라우드 프레그먼트 쉐이더",
            sample: [
                "console.log(Shader.colorFragmentShaderGouraud);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'colorFragmentShaderGouraud',
                            precision: 'mediump float',
                            uniforms: ['sampler2D uSampler'],
                            varyings: ['vec4 vColor'],
                            function: [],
                            main: [
                                'gl_FragColor =  vColor;\n'
                            ]
                        }))
                }
            })()
        })
        .constant('bitmapVertexShaderGouraud', {
            description: "비트맵 고라우드 버텍스 쉐이더",
            sample: [
                "console.log(Shader.bitmapVertexShaderGouraud);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'bitmapVertexShaderGouraud',
                            attributes: ['vec3 aVertexPosition', 'vec2 aUV', 'vec3 aVertexNormal'],
                            uniforms: ['mat4 uPixelMatrix', 'mat4 uCameraMatrix', 'vec3 uDLite', 'float uLambert', 'vec3 uRotate', 'vec3 uScale', 'vec3 uPosition'],
                            varyings: ['vec2 vUV', 'vec4 vLight'],
                            function: [VertexShader.baseFunction],
                            main: [
                                ' mat4 mv = uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
                                ' gl_Position = uPixelMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
                                ' vec3 N = (mv * vec4(aVertexNormal, 0.0)).xyz;\n' +
                                ' vec3 LD = normalize(vec4(uDLite, 0.0)).xyz;\n' +
                                ' float df = max(0.1,dot(N,-LD)*uLambert);\n' +
                                ' vLight = vec4(1.0,1.0,1.0,1.0)*df;\n' +
                                ' vLight[3] = 1.0;\n' +
                                ' vUV = aUV;'
                            ]
                        }))
                }
            })()
        })
        .constant('bitmapFragmentShaderGouraud', {
            description: "비트맵 고라우드 프레그먼트 쉐이더",
            sample: [
                "console.log(Shader.bitmapFragmentShaderGouraud);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'bitmapFragmentShaderGouraud',
                            precision: 'mediump float',
                            uniforms: ['sampler2D uSampler'],
                            varyings: ['vec2 vUV', 'vec4 vLight'],
                            function: [],
                            main: [
                                'gl_FragColor =  (vLight*texture2D(uSampler, vec2(vUV.s, vUV.t)));\n' +
                                'gl_FragColor.a = 1.0;'
                            ]
                        }))
                }
            })()
        })
        .constant('colorVertexShaderPhong', {
            description: "컬러 퐁 버텍스 쉐이더",
            sample: [
                "console.log(Shader.colorVertexShaderPhong);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'colorVertexShaderPhong',
                            attributes: ['vec3 aVertexPosition', 'vec3 aVertexNormal'],
                            uniforms: ['mat4 uPixelMatrix', 'mat4 uCameraMatrix', 'vec3 uRotate', 'vec3 uScale', 'vec3 uPosition', 'vec4 uColor'],
                            varyings: ['vec3 vNormal', 'vec3 vPosition', 'vec4 vColor'],
                            function: [VertexShader.baseFunction],
                            main: ['' +
                            'mat4 mv = uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
                            'gl_Position = uPixelMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
                            'vPosition = vec3(mv * vec4(aVertexPosition, 1.0));\n' +
                            'vNormal = vec3(mv * vec4(-aVertexNormal, 0.0));\n' +
                            'vColor = uColor;'
                            ]
                        }))
                }
            })()
        })
        .constant('colorFragmentShaderPhong', {
            description: "컬러 퐁 프레그먼트 쉐이더",
            sample: [
                "console.log(Shader.colorFragmentShaderPhong);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'colorFragmentShaderPhong',
                            precision: 'mediump float',
                            uniforms: ['float uLambert', 'vec3 uDLite'],
                            varyings: ['vec3 vNormal', 'vec3 vPosition', 'vec4 vColor'],
                            function: [],
                            main: [
                                'vec3 ambientColor = vec3(0.0, 0.0, 0.0);\n' +
                                'vec3 diffuseColor = vec3(1.0, 1.0, 1.0);\n' +
                                'vec3 specColor = vec3(1.0, 1.0, 1.0);\n' +

                                'vec3 normal = normalize(vNormal);\n' +
                                'vec3 lightDir = uDLite;\n' +
                                'vec3 reflectDir = reflect(lightDir, normal);\n' +
                                'vec3 viewDir = normalize(-vPosition);\n' +

                                'float lambertian = max(dot(lightDir,normal), 0.1)*uLambert;\n' +
                                'float specular = 0.0;\n' +

                                'if(lambertian > 0.0) {\n' +
                                'float specAngle = max(dot(reflectDir, viewDir), 0.0);\n' +
                                '   specular = pow(specAngle, 4.0);\n' +
                                '}\n' +
                                'gl_FragColor = vColor*vec4(ambientColor +lambertian*diffuseColor +specular*specColor, 1.0);\n' +
                                'gl_FragColor.a = vColor[3];'
                            ]
                        }))
                }
            })()
        })
        .constant('toonVertexShaderPhong', {
            description: "툰 퐁 버텍스 쉐이더",
            sample: [
                "console.log(Shader.toonVertexShaderPhong);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'toonVertexShaderPhong',
                            attributes: ['vec3 aVertexPosition', 'vec3 aVertexNormal'],
                            uniforms: ['mat4 uPixelMatrix', 'mat4 uCameraMatrix', 'vec3 uRotate', 'vec3 uScale', 'vec3 uPosition', 'vec4 uColor'],
                            varyings: ['vec3 vNormal', 'vec3 vPosition', 'vec4 vColor'],
                            function: [VertexShader.baseFunction],
                            main: [
                                'mat4 mv = uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
                                'gl_Position = uPixelMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
                                'vPosition = vec3(mv * vec4(aVertexPosition, 1.0));\n' +
                                'vNormal = (vec3( mv * vec4(-aVertexNormal, 0.0)));\n' +

                                'vColor = uColor;'
                            ]
                        }))
                }
            })()
        })
        .constant('toonFragmentShaderPhong', {
            description: "툰 퐁 프레그먼트 쉐이더",
            sample: [
                "console.log(Shader.toonFragmentShaderPhong);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'toonFragmentShaderPhong',
                            precision: 'mediump float',
                            uniforms: ['float uLambert', 'vec3 uDLite'],
                            varyings: ['vec3 vNormal', 'vec3 vPosition', 'vec4 vColor'],
                            function: [],
                            main: [
                                'vec3 ambientColor = vec3(0.0, 0.0, 0.0);\n' +
                                'vec3 diffuseColor = vec3(1.0, 1.0, 1.0);\n' +
                                'vec3 specColor = vec3(1.0, 1.0, 1.0);\n' +

                                'vec3 normal = normalize(vNormal);\n' +
                                'vec3 lightDir = uDLite;\n' +
                                'vec3 reflectDir = reflect(lightDir, normal);\n' +
                                'vec3 viewDir = normalize(-vPosition);\n' +

                                'float lambertian = max(dot(lightDir,normal), 0.1)*uLambert;\n' +
                                'float specular = 0.0;\n' +

                                'vec3 src = vColor.rgb;\n' +

                                'if(lambertian > 0.0) {\n' +
                                'float specAngle = max(dot(reflectDir, viewDir), 0.0);\n' +
                                '   specular = pow(specAngle, 4.0);\n' +
                                '}\n' +
                                'src = src*(ambientColor +lambertian*diffuseColor +specular*specColor);\n' +

                                ' if(lambertian>0.95-0.5) src.rgb*=0.95;\n' +
                                ' else if(lambertian>0.4-0.5) src.rgb*=0.5;\n' +
                                ' else if(lambertian>0.3-0.5) src.rgb*=0.3;\n' +
                                ' else src.rgb*=0.1;\n' +

                                'gl_FragColor.rgb = src.rgb;\n' +
                                'gl_FragColor.a = vColor[3];'
                            ]
                        }))
                }
            })()
        })
        .constant('bitmapVertexShaderPhong', {
            description: "비트맵 퐁 버텍스 쉐이더",
            sample: [
                "console.log(Shader.bitmapVertexShaderPhong);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'bitmapVertexShaderPhong',
                            attributes: ['vec3 aVertexPosition', 'vec2 aUV', 'vec3 aVertexNormal'],
                            uniforms: ['mat4 uPixelMatrix', 'mat4 uCameraMatrix', 'vec3 uRotate', 'vec3 uScale', 'vec3 uPosition'],
                            varyings: ['vec2 vUV', 'vec3 vNormal', 'vec3 vPosition'],
                            function: [VertexShader.baseFunction],
                            main: [
                                'mat4 mv = uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
                                'gl_Position = uPixelMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
                                'vPosition = vec3(mv * vec4(aVertexPosition, 1.0));\n' +
                                'vNormal = (vec3( mv * vec4(-aVertexNormal, 0.0)));\n' +
                                'vUV = aUV;'
                            ]
                        }))
                }
            })()
        })
        .constant('bitmapFragmentShaderPhong', {
            description: "비트맵 퐁 프레그먼트 쉐이더",
            sample: [
                "console.log(Shader.bitmapFragmentShaderPhong);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'bitmapFragmentShaderPhong',
                            precision: 'mediump float',
                            uniforms: ['sampler2D uSampler', 'float uLambert', 'vec3 uDLite'],
                            varyings: ['vec2 vUV', 'vec3 vNormal', 'vec3 vPosition'],
                            function: [],
                            main: [
                                'vec3 ambientColor = vec3(0.0, 0.0, 0.0);\n' +
                                'vec3 diffuseColor = vec3(1.0, 1.0, 1.0);\n' +
                                'vec3 specColor = vec3(1.0, 1.0, 1.0);\n' +

                                'vec3 normal = normalize(vNormal);\n' +
                                'vec3 lightDir = uDLite;\n' +
                                'vec3 reflectDir = reflect(lightDir, normal);\n' +
                                'vec3 viewDir = normalize(-vPosition);\n' +

                                'float lambertian = max(dot(lightDir,normal), 0.1)*uLambert;\n' +
                                'float specular = 0.0;\n' +

                                'if(lambertian > 0.0) {\n' +
                                'float specAngle = max(dot(reflectDir, viewDir), 0.1);\n' +
                                '   specular = pow(specAngle, 4.0)*uLambert;\n' +
                                '}\n' +

                                'gl_FragColor = texture2D(uSampler, vec2(vUV.s, vUV.t))*vec4(ambientColor +lambertian*diffuseColor +specular*specColor, 1.0);\n' +
                                'gl_FragColor.a = 1.0;'
                            ]
                        }))
                }
            })()
        })
        .constant('bitmapVertexShaderBlinn', {
            description: "비트맵 블린 버텍스 쉐이더",
            sample: [
                "console.log(Shader.bitmapVertexShaderBlinn);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'bitmapVertexShaderBlinn',
                            attributes: ['vec3 aVertexPosition', 'vec2 aUV', 'vec3 aVertexNormal'],
                            uniforms: ['mat4 uPixelMatrix', 'mat4 uCameraMatrix', 'vec3 uRotate', 'vec3 uScale', 'vec3 uPosition'],
                            varyings: ['vec2 vUV', 'vec3 vNormal', 'vec3 vPosition'],
                            function: [VertexShader.baseFunction],
                            main: ['' +
                            'mat4 mv = uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale);\n' +
                            'gl_Position = uPixelMatrix*mv*vec4(aVertexPosition, 1.0);\n' +
                            'vPosition = vec3(mv * vec4(aVertexPosition, 1.0));\n' +
                            'vNormal = vec3( mv * vec4(-aVertexNormal, 0.0));\n' +
                            'vUV = aUV;'
                            ]
                        }))
                }
            })()
        })
        .constant('bitmapFragmentShaderBlinn', {
            description: "비트맵 블린 프레그먼트 쉐이더",
            sample: [
                "console.log(Shader.bitmapFragmentShaderBlinn);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'bitmapFragmentShaderBlinn',
                            precision: 'mediump float',
                            uniforms: ['sampler2D uSampler', 'float uLambert', 'vec3 uDLite'],
                            varyings: ['vec2 vUV', 'vec3 vNormal', 'vec3 vPosition'],
                            function: [],
                            main: ['' +
                            'vec3 ambientColor = vec3(0.0, 0.0, 0.0);\n' +
                            'vec3 diffuseColor = vec3(1.0, 1.0, 1.0);\n' +
                            'vec3 specColor = vec3(1.0, 1.0, 1.0);\n' +

                            'vec3 normal = normalize(vNormal);\n' +
                            'vec3 lightDir = uDLite;\n' +

                            'float lambertian = max(dot(lightDir,normal), 0.1)*uLambert;\n' +
                            'float specular = 0.0;\n' +

                            'vec3 viewDir = normalize(vPosition);\n' +

                            'if(lambertian > 0.0) {\n' +
                            '   vec3 halfDir = normalize(lightDir + viewDir);\n' +
                            '   float specAngle = max(dot(halfDir, normal), 0.0);\n' +
                            '   specular = pow(specAngle, 16.0);\n' +
                            '}\n' +
                            'gl_FragColor = texture2D(uSampler, vec2(vUV.s, vUV.t))*vec4(ambientColor +lambertian*diffuseColor +specular*specColor, 1.0);\n' +
                            'gl_FragColor.a = 1.0;'
                            ]
                        }))
                }
            })()
        })
        .constant('postBaseVertexShader', {
            description: "후처리 베이스 버텍스 쉐이더",
            sample: [
                "console.log(Shader.postBaseVertexShader);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'postBaseVertexShader',
                            attributes: ['vec3 aVertexPosition', 'vec2 aUV'],
                            uniforms: ['mat4 uPixelMatrix', 'mat4 uCameraMatrix', 'vec3 uRotate', 'vec3 uScale', 'vec3 uPosition'],
                            varyings: ['vec2 vUV'],
                            function: [VertexShader.baseFunction],
                            main: ['' +
                            'gl_Position = uPixelMatrix*uCameraMatrix*positionMTX(uPosition)*rotationMTX(uRotate)*scaleMTX(uScale)*vec4(aVertexPosition, 1.0);\n' +
                            'vUV = aUV;'
                            ]
                        }))
                }
            })()
        })
        .constant('postBaseFragmentShader', {
            description: "후처리 베이스 프레그먼트 쉐이더",
            sample: [
                "console.log(Shader.postBaseFragmentShader);"
            ],
            get: (function () {
                var cache;
                return function () {
                    return cache || (cache = new Shader({
                            id: 'postBaseFragmentShader',
                            precision: 'mediump float',
                            uniforms: ['sampler2D uSampler', 'vec2 uTexelSize', 'int uFXAA'],
                            varyings: ['vec2 vUV'],
                            function: [],
                            main: ['' +
                            'if(uFXAA==1){\n' +
                            'float FXAA_REDUCE_MIN = (1.0/128.0);\n' +
                            'float FXAA_REDUCE_MUL = (1.0/8.0);\n' +
                            'float FXAA_SPAN_MAX = 8.0;\n' +

                            'vec4 rgbNW = texture2D(uSampler, (vUV + vec2(-1.0, -1.0) * uTexelSize));\n' +
                            'vec4 rgbNE = texture2D(uSampler, (vUV + vec2(1.0, -1.0) * uTexelSize));\n' +
                            'vec4 rgbSW = texture2D(uSampler, (vUV + vec2(-1.0, 1.0) * uTexelSize));\n' +
                            'vec4 rgbSE = texture2D(uSampler, (vUV + vec2(1.0, 1.0) * uTexelSize));\n' +
                            'vec4 rgbM = texture2D(uSampler, vUV);\n' +
                            'vec4 luma = vec4(0.299, 0.587, 0.114, 1.0);\n' +
                            'float lumaNW = dot(rgbNW, luma);\n' +
                            'float lumaNE = dot(rgbNE, luma);\n' +
                            'float lumaSW = dot(rgbSW, luma);\n' +
                            'float lumaSE = dot(rgbSE, luma);\n' +
                            'float lumaM = dot(rgbM, luma);\n' +
                            'float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n' +
                            'float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n' +

                            'vec2 dir = vec2(-((lumaNW + lumaNE) - (lumaSW + lumaSE)), ((lumaNW + lumaSW) - (lumaNE + lumaSE)));\n' +

                            'float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL),FXAA_REDUCE_MIN);\n' +
                            'float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n' +
                            'dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n' +
                            'max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n' +
                            'dir * rcpDirMin)) * uTexelSize;\n' +

                            'vec4 rgbA = 0.5 * (' +
                            '   texture2D(uSampler, vUV + dir * (1.0 / 3.0 - 0.5))+' +
                            '   texture2D(uSampler, vUV + dir * (2.0 / 3.0 - 0.5))' +
                            ');\n' +

                            'vec4 rgbB = rgbA * 0.5 + 0.25 * (texture2D(uSampler, vUV + dir *  -0.5)+texture2D(uSampler, vUV + dir * 0.5));\n' +
                            'float lumaB = dot(rgbB, luma);\n' +
                            'if ((lumaB < lumaMin) || (lumaB > lumaMax)) {\n' +
                            '   gl_FragColor = rgbA;\n' +
                            '}\n' +
                            'else {\n' +
                            '   gl_FragColor = rgbB;\n' +
                            '}\n' +
                            '}else{\n' +
                            '   gl_FragColor =  texture2D(uSampler, vec2(vUV.s, vUV.t));' +
                            '}' +
                            '']
                        }))
                }
            })()
        })
        .build();
})();
var Matrix = (function () {
    var temp, setter, getter,
        raw;
    //private
    raw = {},
    //lib
    temp = new Float32Array(16),
    setter = function(x, y, z){
        return function(v) {
            if (v) {
                if ('0' in v) {
                    this[x] = v[0], this[y] = v[1], this[z] = v[2];
                } else if (x in arg) {
                    this[x] = v[x], this[y] = v[y], this[z] = v[z];
                }
            } else {
                this[x] = this[y] = this[z] = 0;
            }
        };
    },
    getter = function(x, y, z){
        var result = new Float32Array(3);
        return function(v) {
           result[0] = this[x], result[1] = this[y], result[2] = this[z];
           return result;
        };
    };
    return MoGL.extend('Matrix',{
        description:'매트릭스 객체로서 사용되며,\n- position(x, y, z),\n- scale(scaleX, scaleY, scaleZ),\n- rotate(rotateX, rotateY, rotateZ)\n-  관련된 속성도 포함한다. ',
        sample:[
            'var mtx = new Matrix();',
            'console.log(mtx.x);',
            'console.log(mtx.position); // [x,y,z]'
        ],
        value:function Matrix() {
            raw[this] = new Float32Array(16);
            this.matIdentity();
            this.x = this.y = this.z = this.rotateX = this.rotateY = this.rotateZ = 0,
            this.scaleX = this.scaleY = this.scaleZ = 1;
        }
    })
    .field('position', {
        description: 'x,y,z값을 배열로 반환하거나 입력',
        sample:[
            'var mtx = new Matrix();',
            'mtx.position = [10,20,30];',
            'console.log(mtx.position); // [10,20,30]'
        ],
        set:setter('x', 'y', 'z'),
        get:getter('x', 'y', 'z')
    })
    .field('scale', {
        description: 'scale값을 배열로 반환하거나 입력',
        sample:[
            'var mtx = new Matrix();',
            'mtx.scale = [10,20,30];',
            'console.log(mtx.scale); // [10,20,30]'
        ],
        set:setter('scaleX', 'scaleY', 'scaleZ'),
        get:getter('scaleX', 'scaleY', 'scaleZ')
    })
    .field('rotate', {
        description: 'rotate값을 배열로 반환하거나 입력',
        sample:[
            'var mtx = new Matrix();',
            'mtx.rotate = [10,20,30];',
            'console.log(mtx.rotate); // [10,20,30]'
        ],
        set:setter('rotateX', 'rotateY', 'rotateZ'),
        get:getter('rotateX', 'rotateY', 'rotateZ')
    })
    .field('matrix', {
        description: '현재 객체내의 position,rotate,scale을 반영한 후 자신을 반환',
        sample:[
            'var mtx = new Matrix();',
            'console.log(mtx.matrix);'
        ],
        get:function matrixGet() {
            if(this instanceof Camera) {
                this.matIdentity().matScale(this.scaleX,this.scaleY,this.scaleZ).matRotateX(this.rotateX).matRotateY(this.rotateY).matRotateZ(this.rotateZ).matTranslate(this.x, this.y, -this.z);
            }
            else {
                this.matIdentity().matScale(this.scaleX,this.scaleY,this.scaleZ).matRotateX(this.rotateX).matRotateY(this.rotateY).matRotateZ(this.rotateZ).matTranslate(this.x, this.y, this.z);
            }
            return this;
        }
    })
    .field('raw', {
        description: '현재 매트릭스 객체의 rawData를 Float32Array 형식으로 반환',
        sample:[
            'var mtx = new Matrix();',
            'console.log(mtx.raw);'
        ],
        get:function rawGet(){
            return raw[this]
        }
    })
    .method('lookAt', {
        description: '현재매트릭스를 대상지점을 바라보도록 변경\n- 현재 매트릭스의 rotateX,rotateY,rotateZ, 속성을 자동으로 변경',
        param:[
            'x:number - 바라볼 x위치',
            'y:number - 바라볼 y위치',
            'z:number - 바라볼 z위치'
        ],
        sample:[
            'var mtx = new Matrix();',
            'mtx.lookAt(0,0,0); // 현재위치에서 0,0,0을 바라보는 상태로 rotateX, rotateY, rotateZ가 변경됨'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        value:(function(){
            var A = new Float32Array(3), B = new Float32Array(3);
            return function lookAt(x, y, z) {
                var d, d11, d12, d13, d21, d22, d23, d31, d32, d33, md31,
                    radianX, radianY, radianZ, cosY;

                this.matIdentity(),
                A[0] = this.x, A[1] = this.y, A[2] = this.z,
                B[0] = x, B[1] = y, B[2] = z,
                this.matLookAt(A, B, [0, 1, 0]),
                //this.matTranslate(F3);
                d = raw[this],
                d11 = d[0], d12 = d[1], d13 = d[2],
                d21 = d[4], d22 = d[5], d23 = d[6],
                d31 = d[8], d32 = d[9], d33 = d[10],
                md31 = -d31;
                if (md31 <= -1) {
                    radianY = -PIH;
                } else if (1 <= md31) {
                    radianY = PIH;
                } else {
                    radianY = ASIN(md31);
                }
                cosY = COS(radianY);
                if (cosY <= 0.001){
                    radianZ = 0,
                        radianX = ATAN2(-d23, d22);
                } else {
                    radianZ = ATAN2(d21, d11),
                        radianX = ATAN2(d32, d33);
                }
                this.rotateX = radianX,
                this.rotateY = radianY,
                this.rotateZ = radianZ;

                //var dx = x - this.x;
                //var dy = y - this.y;
                //var dz = z - this.z;
                //this.rotationX = Math.atan2(dz, Math.sqrt(dx * dx + dy * dy)) - Math.PI / 2;
                //this.rotationY = 0;
                //this.rotationZ = -Math.atan2(dx, dy);
            };
        })()
    })
    .method('matIdentity', {
        description:'현재 매트릭스를 초기화한다.',
        sample:[
            'var mtx = new Matrix();',
            'mtx.matIdentity();'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        value:function matIdentity() {
            var a = raw[this];
            a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0, a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1;
            return this;
        }
    })
    .method('matClone', {
        description: '현재 매트릭스를 복제',
        sample: [
            'var mtx = new Matrix();',
            'mtx.matClone();'
        ],
        ret: ['Matrix - 복제한 매트릭스를 반환.'],
        value:function matClone() {
            var a, b,out;
            a = raw[this],
                out = new Matrix(),
                b = raw[out];
            b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b[6] = a[6], b[7] = a[7], b[8] = a[8], b[9] = a[9], b[10] = a[10], b[11] = a[11], b[12] = a[12], b[13] = a[13], b[14] = a[14], b[15] = a[15];
            return out;
        }
    })
    .method('matCopy', {
        description:'대상 매트릭스에 현재 매트릭스의 상태를 복사',
        sample: [
            'var mtx = new Matrix();',
            'var mtx2 = new Matrix();',
            'mtx.matClone(mtx2);  // mtx2에 mtx의 속성이 복사됨.'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'matrix:Matrix - 복사 대상 매트릭스'
        ],
        value:function matCopy(t) {
            var a = raw[this];
            t = raw[t];
            t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15];
            return this;
        }
    })
    //.method('matInvert', function matInvert() {
    //    return this;
    //},
    ///*
    //.method('matTranspose', function matTranspose(t) {
    //     return this;
    //};
    .method('matMultiply', {
        description:'현재매트릭스에 대상 매트릭스를 곱한다. ',
        sample: [
            'var mtx = new Matrix();',
            'var mtx2 = new Matrix();',
            'mtx.matMultiply(mtx2);  // mtx에 mtx2를 곱한 결과를 반환'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'matrix:Matrix - 곱할 매트릭스'
        ],
        value:function matMultiply(t) {
            var a = raw[this];
            t = raw[t];
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            var b0 = t[0], b1 = t[1], b2 = t[2], b3 = t[3];
            a[0] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3, a[1] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3, a[2] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3, a[3] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3,
                b0 = t[4], b1 = t[5], b2 = t[6], b3 = t[7],
                a[4] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3 , a[5] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3, a[6] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3, a[7] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3,
                b0 = t[8], b1 = t[9], b2 = t[10], b3 = t[11],
                a[8] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3 , a[9] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3 , a[10] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3 , a[11] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3,
                b0 = t[12], b1 = t[13], b2 = t[14], b3 = t[15],
                a[12] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3 , a[13] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3, a[14] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3, a[15] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;
            return this;
        }
    })
    .method('matTranslate', {
        description:'현재매트릭스에 x,y,z축 증분 평행이동 ',
        sample: [
            'var mtx = new Matrix();',
            'mtx.matTranslate(10,20,30);'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'x:number - x축 증분 이동',
            'y:number - y축 증분 이동',
            'z:number - z축 증분 이동'
        ],
        value:function matTranslate(x, y, z) {
            var a = raw[this];
            a[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
            a[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
            a[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
            a[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            return this;
        }
    })
    .method('matScale', {
        description:'현재매트릭스에 x,y,z축 증분 확대 ',
        sample: [
            'var mtx = new Matrix();',
            'mtx.matScale(10,20,30);'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'x:number - x축 증분 확대',
            'y:number - y축 증분 확대',
            'z:number - z축 증분 확대'
        ],
        value: function matScale(x, y, z) {
            var a = raw[this];
            a[0] = a[0] * x, a[1] = a[1] * x, a[2] = a[2] * x, a[3] = a[3] * x, a[4] = a[4] * y, a[5] = a[5] * y, a[6] = a[6] * y, a[7] = a[7] * y, a[8] = a[8] * z, a[9] = a[9] * z, a[10] = a[10] * z, a[11] = a[11] * z, a[12] = a[12], a[13] = a[13], a[14] = a[14], a[15] = a[15];
            return this;
        }
    })
    .method('matRotateX', {
        description:'현재 매트릭스를 X축 기준 증분 회전 ',
        sample: [
            'var mtx = new Matrix();',
            'mtx.matRotateX(0.3);'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'rad:number - x축 증분 회전 값, radian단위로 입력',
        ],
        value: function matRotateX(rad) {
            var a = raw[this], s = SIN(rad), c = COS(rad), a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            a[4] = a10 * c + a20 * s, a[5] = a11 * c + a21 * s, a[6] = a12 * c + a22 * s, a[7] = a13 * c + a23 * s, a[8] = a20 * c - a10 * s, a[9] = a21 * c - a11 * s, a[10] = a22 * c - a12 * s, a[11] = a23 * c - a13 * s;
            return this;
        }
    })
    .method('matRotateY', {
        description:'현재 매트릭스를 Y축 기준 증분 회전 ',
        sample: [
            'var mtx = new Matrix();',
            'mtx.matRotateY(0.3);'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'rad:number - y축 증분 회전 값, radian단위로 입력',
        ],
        value:function matRotateY(rad) {
            var a = raw[this], s = SIN(rad), c = COS(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            a[0] = a00 * c - a20 * s, a[1] = a01 * c - a21 * s, a[2] = a02 * c - a22 * s, a[3] = a03 * c - a23 * s, a[8] = a00 * s + a20 * c, a[9] = a01 * s + a21 * c, a[10] = a02 * s + a22 * c, a[11] = a03 * s + a23 * c;
            return this;
        }
    })
    .method('matRotateZ', {
        description:'현재 매트릭스를 Z축 기준 증분 회전 ',
        sample: [
            'var mtx = new Matrix();',
            'mtx.matRotateZ(0.3);'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'rad:number - z축 증분 회전 값, radian단위로 입력',
        ],
        value:function matRotateZ(rad) {
            var a = raw[this], s = SIN(rad), c = COS(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            a[0] = a00 * c + a10 * s, a[1] = a01 * c + a11 * s, a[2] = a02 * c + a12 * s, a[3] = a03 * c + a13 * s, a[4] = a10 * c - a00 * s, a[5] = a11 * c - a01 * s, a[6] = a12 * c - a02 * s, a[7] = a13 * c - a03 * s;
            return this;
        }
    })
    .method('matRotate', {
        description:'현재 매트릭스를 특정축을 기준으로 증분 회전 ',
        sample: [
            'var mtx = new Matrix();',
            'mtx.matRotate(0.3,[0,1,2]);'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'rad:number - z축 증분 회전 값, radian단위로 입력',
            'axis:Array - 기준 회전축을 입력',
        ],
        value:function matRotate(rad, axis) {
            var a = raw[this];
            var x = axis[0], y = axis[1], z = axis[2], len = SQRT(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
            if (ABS(len) < GLMAT_EPSILON) { return null; }
            len = 1 / len, x *= len, y *= len, z *= len,
                s = SIN(rad), c = COS(rad), t = 1 - c,
                a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
                b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s, b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s, b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c,
                a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02, a[3] = a03 * b00 + a13 * b01 + a23 * b02, a[4] = a00 * b10 + a10 * b11 + a20 * b12, a[5] = a01 * b10 + a11 * b11 + a21 * b12, a[6] = a02 * b10 + a12 * b11 + a22 * b12, a[7] = a03 * b10 + a13 * b11 + a23 * b12, a[8] = a00 * b20 + a10 * b21 + a20 * b22, a[9] = a01 * b20 + a11 * b21 + a21 * b22, a[10] = a02 * b20 + a12 * b21 + a22 * b22, a[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (a !== a) a[12] = a[12], a[13] = a[13], a[14] = a[14], a[15] = a[15];
            return this;
        }
    })
    .method('frustum', {
        description:['보이는 화면 영역'],
        sample:[],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'a:number - 가로세로 비율',
            'b:number - 가로세로 비율',
            'c:number - 시야각, degree 단위로 입력',
            'd:number - 시야각, degree 단위로 입력',
            'e:number - 절두체의 죄소 z값, 0.0보다 큰 값으로 설정',
            'g:number - 절두체의 최대 z값'
        ],
        value:function frustum(a, b, c, d, e, g) {
            var f = raw[this];
            var h = b - a, i = d - c, j = g - e;
            f[0] = e * 2 / h, f[1] = 0, f[2] = 0, f[3] = 0, f[4] = 0, f[5] = e * 2 / i, f[6] = 0, f[7] = 0, f[8] = (b + a) / h, f[9] = (d + c) / i, f[10] = -(g + e) / j, f[11] = -1, f[12] = 0, f[13] = 0, f[14] = -(g * e * 2) / j, f[15] = 0;
            return this;
        }
    })
    .method('matPerspective', {
        description:'퍼스펙티브 매트릭스',
        sample: [
            'var mtx = new Matrix();',
            'mtx.matPerspective(55, 4/3,0.1,1000);'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'fov:number - 시야각, degree 단위로 입력',
            'aspect:number - 가로/세로비율',
            'near:number - 절두체의 최소z값, 0.0보다 큰값으로 설정',
            'far:number - 절두체의 최대z값',
        ],
        value:function matPerspective(fov, aspect, near, far) {
            fov = near * Math.tan(fov * Math.PI / 360),
            aspect = fov * aspect,
            this.frustum(-aspect, aspect, -fov, fov, near, far);
            return this;
        }
    })
    .method('matLookAt', {
        description:'eye 벡터가 center 벡터를 바라보는 회전 행렬 생성',
        sample:[
            'var matrix = new Matrix();',
            'matrix.matLookAt([100, 100, 100], [0, 0, 0], [0, 1, 0]);'
        ],
        ret: ['this - 메서드체이닝을 위해 자신을 반환함.'],
        param:[
            'eye:Array - [x, y, z] 형태의 eye 좌표',
            'center:Array - [x, y, z] 형태의 center 좌표',
            'up:Array - [x, y, z] 형태의 up 벡터'
        ],
        value:function matLookAt(eye, center, up) {
            var a = raw[this];
            var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2], centerx = center[0], centery = center[1], centerz = center[2];
            if (ABS(eyex - centerx) < GLMAT_EPSILON && ABS(eyey - centery) < GLMAT_EPSILON && ABS(eyez - centerz) < GLMAT_EPSILON) return this.matIdentity();
            z0 = eyex - centerx, z1 = eyey - centery, z2 = eyez - centerz, len = 1 / SQRT(z0 * z0 + z1 * z1 + z2 * z2), z0 *= len, z1 *= len, z2 *= len, x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0, len = SQRT(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) x0 = 0, x1 = 0, x2 = 0;
            else len = 1 / len, x0 *= len, x1 *= len, x2 *= len;
            y0 = z1 * x2 - z2 * x1, y1 = z2 * x0 - z0 * x2, y2 = z0 * x1 - z1 * x0, len = SQRT(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) y0 = 0, y1 = 0, y2 = 0;
            else len = 1 / len, y0 *= len, y1 *= len, y2 *= len;
            a[0] = x0, a[1] = y0, a[2] = z0, a[3] = 0,
                a[4] = x1, a[5] = y1, a[6] = z1, a[7] = 0,
                a[8] = x2, a[9] = y2, a[10] = z2, a[11] = 0,
                a[12] = -(x0 * eyex + x1 * eyey + x2 * eyez), a[13] = -(y0 * eyex + y1 * eyey + y2 * eyez), a[14] = -(z0 * eyex + z1 * eyey + z2 * eyez), a[15] = 1;
            return this;
        }
    })
    .method('matStr', {
        description:'현재 매트릭스를 문자화한다.',
        sample: [
            'var mtx = new Matrix();',
            'console.log(mtx.matStr());'
        ],
        ret: ['String - 문자화된 매트릭스 raw를 반환'],
        value:function matStr() {
            var a = raw[this];
            return 'Matrix(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
        }
    })
    .build();
})();

var Texture = (function() {
    var imgType, canvas, context, empty, resizer,
        resize, imgs, loaded, isLoaded;
    //private
    resize = {},
    imgs = {},
    isLoaded = {},
    //shared private
    $setPrivate('Texture', {
        imgs : imgs
    }),
    //lib
    imgType = {'.jpg':1, '.png':1, '.gif':1},
    canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    canvas.width = canvas.height = 2,
    context.clearRect(0, 0, 2, 2),
    empty = document.createElement('img'),
    empty.src = canvas.toDataURL(),
    resizer = function(resizeType, v){
        var tw, th;
        //texture size
        tw = th = 1;
        while (v.width > tw) tw *= 2;
        while (v.height > th) th *= 2;

        if (resizeType == Texture.zoomOut) {
            if (v.width < tw) tw /= 2;
            if (v.height < th) th /= 2;
        }
        canvas.width = tw,
        canvas.height = th,
        context.clearRect(0, 0, tw, th);
        switch (resizeType) {
            case Texture.crop:
                var ratio = v.height / v.width
                if (v.height < th) {
                    v.height = th
                    v.width = v.height / ratio
                }
                context.drawImage(v, 0, 0, v.width, v.height);
                break;
            case Texture.addSpace:
                if (v.width < tw) tw = Math.round(v.width);
                if (v.height < th) th = Math.round(v.height);
                context.drawImage(v, 0, 0, tw, th);
                break;
            default:
                context.drawImage(v, 0, 0, tw, th);
        }
        v.src = canvas.toDataURL();
        //console.log('리사이저처리결과', v.src,dw,dh)
        return v;
    },
    loaded = function(e){
        var texture = Texture.getInstance(this.dataset.texture);
        isLoaded[texture] = true,
        imgs[texture] = resizer(texture.resizeType, this),
        this.removeEventListener('load', loaded);
        texture.dispatch('load');
    };
    return MoGL.extend('Texture',{
        description: "텍스쳐 객체 클래스",
        sample: [
            "var texture = new Texture();"
        ],
        value:function Texture(){}
    })
    .field('resizeType', {
        description:'resize type get/set field.',
        type:'string',
        defaultValue:'null',
        sample: [
            "var texture = new Texture();",
            "texture.resizeType = Texture.zoomIn;",
            "console.log(texture.resizeType);"
        ],
        get:$getter(resize, false, 'zoomOut'),
        set:function resizeTypeSet(v){
            if (Texture[v]) {
                resize[this] = v;
            } else {
                this.error(0);
            }
        }
    })
    .field('isLoaded', {
        description:'Load check field.',
        type:'string',
        defaultValue:'null',
        sample: [
            "var texture = new Texture();",
            'texture.img = document.getElementID("imgElement");',
            "console.log(texture.isLoaded);"
        ],
        get:$getter(isLoaded, false, false)
    })
    .field('img', {
        description:'Image get/set field.',
        type:'string',
        defaultValue:'null',
        sample: [
            "var texture = new Texture();",
            'texture.img = document.getElementID("imgElement");'
        ],
        get:$getter(imgs, false, empty),
        set:function imgSet(v){
            var complete, img, w, h;
            complete= false,
            img = document.createElement('img')
            if (v instanceof HTMLImageElement){
                img.src = v.src
                if (img.complete) {
                    complete = true;
                }
            } else if (v instanceof ImageData){
                complete = true,
                canvas.width = w = v.width,
                canvas.height = h = v.height,
                context.clearRect(0, 0, w, h),
                context.putImageData(v, 0, 0),
                img.src = context.toDataURL();
            } else if (typeof v == 'string') {
                if (v.substring(0, 10) == 'data:image' && v.indexOf('base64') > -1){
                    complete = true;
                } else if (!imgType[v.substring(-4)]) {
                    this.error(1);
                }
                img.src = v;
            } else {
                this.error(0);
            }
            if (complete){
                isLoaded[this] = true,
                //console.log('이미지등록시 로딩완료',img)
                img.dataset.cls = Texture
                img.dataset.texture = this.uuid;
                imgs[this] = resizer(this.resizeType, img),
                this.dispatch('load');
            } else {
                //console.log('이미지등록시 로딩안됨',img)
                img.dataset.cls = Texture
                img.dataset.texture = this.uuid;
                img.addEventListener('load', loaded);
            }
        }
    })
    .event('load', {
        description: 'load event',
        value: 'load'
    })
    .constant('zoomOut', {
        description : 'zoom out constant',
        sample:[
            'var texture = new Texture();',
            '// 리사이즈 타입 설정',
            'texture.resizeType = Texture.zoomOut;'
        ],
        value : 'zoomOut'
    })
    .constant('zoomIn', {
        description : 'zoom in constant',
        sample:[
            'var texture = new Texture();',
            '// 리사이즈 타입 설정',
            'texture.resizeType = Texture.zoomIn;'
        ],
        value : 'zoomIn'
    })
    .constant('crop', {
        description : 'crop constant',
        sample:[
            'var texture = new Texture();',
            '// 리사이즈 타입 설정',
            'texture.resizeType = Texture.crop;'
        ],
        value : 'crop'
    })
    .constant('addSpace',{
        description : 'addSpace constant',
        sample:[
            'var texture = new Texture();',
            '// 리사이즈 타입 설정',
            'texture.resizeType = Texture.addSpace;'
        ],
        value : 'addSpace'
    })
    .constant('diffuse', {
        description : 'diffuse constant',
        sample:[
            'var texture = new Texture();',
            '// 리사이즈 타입 설정',
            'texture.resizeType = Texture.diffuse;'
        ],
        value : 'diffuse'
    })
    .constant('specular', {
        description : 'specular constant',
        sample:[
            'var texture = new Texture();',
            '// 리사이즈 타입 설정',
            'texture.resizeType = Texture.specular;'
        ],
        value : 'specular'
    })
    .constant('diffuseWrap', {
        description : 'diffuseWrap constant',
        sample:[
            'var texture = new Texture();',
            '// 리사이즈 타입 설정',
            'texture.resizeType = Texture.diffuseWrap;'
        ],
        value : 'diffuseWrap'
    })
    .constant('normal', {
        description : 'normal constant',
        sample:[
            'var texture = new Texture();',
            '// 리사이즈 타입 설정',
            'texture.resizeType = Texture.normal;'
        ],
        value : 'normal'
    })
    .constant('specularNormal', {
        description : 'specularNormal constant',
        sample:[
            'var texture = new Texture();',
            '// 리사이즈 타입 설정',
            'texture.resizeType = Texture.specularNormal;'
        ],
        value : 'specularNormal'
    })
    .build();
})();

var Geometry = (function () {
    var position, vertexCount, triangleCount, vertexShaders, normal,index, uv, color, volume, key;

    //private
    position = {}, normal = {}, uv = {}, color = {},index = {},
    vertexCount = {}, triangleCount = {}, vertexShaders = {},
    volume = {};
    //shared private
    $setPrivate('Geometry', {
    });
    return MoGL.extend('Geometry',{
        description: "Geometry 클래스",
        param : [
            "vertex : 지오메트리를 구성할 버텍스 배열 정보 (Array or Float32Array)",
            "index : 지오메트리를 구성할 인덱스 배열 정보 (Array or Uint16Array)"
        ],
        sample: [
            "var geo = new Geometry([],[]);"
        ],
        exception:[
            "'Geometry.vertexSet:0' - 첫번째 인자가 Array나 Float32Array가 아닌 경우",
            "'Geometry.indexSet:1' - 두번째 인자가 Array나 Uint16Array가 아닌 경우",
            "'Geometry.infoSet:2' - 첫번째 인자가 세번째 인자의 갯수로 나누어 떨어지지 않는 경우 ",
            "'Geometry.infoSet:3' - 세번째 인자가 Array가 아닌 경우",
            "'Geometry.infoSet:4' - 세번째 인자내 요소가 올바른 상수가 아닌 경우"
        ],
        value:(function(){
            var calcNormal, infoCheck, pos, nm, tUV, tCo;
            calcNormal = (function () {
                var sqr, v1, v2;
                sqr = Math.sqrt,
                v1 = {x: 0, y: 0, z: 0}, v2 = {x: 0, y: 0, z: 0};
                return function calcNormal(ns, pos, idx) {
                    var i, j, k, l;
                    for (ns.length = 0, i = 0, j = pos.length; i < j; i++) ns[i] = 0.0;
                    for (i = 0, j = idx.length; i < j; i += 3) {
                        k = 3 * idx[i + 1],
                        l = 3 * idx[i],
                        v1.x = pos[k] - pos[l],
                        v1.y = pos[k + 1] - pos[l + 1],
                        v1.z = pos[k + 2] - pos[l + 2],
                        l = 3 * idx[i + 2],
                        v2.x = pos[l] - pos[k],
                        v2.y = pos[l + 1] - pos[k + 1],
                        v2.z = pos[l + 2] - pos[k + 2];
                        for (k = 0; k < 3; k++) {
                            l = 3 * idx[i + k],
                            ns[l] += v1.y * v2.z - v1.z * v2.y,
                            ns[l + 1] += v1.z * v2.x - v1.x * v2.z,
                            ns[l + 2] += v1.x * v2.y - v1.y * v2.x;
                        }
                    }
                    for (i = 0, j = pos.length; i < j; i += 3) {
                        v1.x = ns[i],
                        v1.y = ns[i + 1],
                        v1.z = ns[i + 2],
                        k = sqr(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z) || 0.00001,
                        ns[i] = v1.x / k,
                        ns[i + 1] = v1.y / k,
                        ns[i + 2] = v1.z / k;
                    }
                    return ns;
                };
            })(),
            infoCheck = function (v) {
                return Vertex[v];
            },
            pos = [], nm = [], tUV = [], tCo = [];
            return function Geometry(vertex, tIndex, info) {
                var len, i, j, k, isNormal, isUV, isColor;
                if (!Array.isArray(vertex) && !(vertex instanceof Float32Array)) {
                    this.error(0);
                } else if (!Array.isArray(tIndex) && !(tIndex instanceof Uint16Array)) {
                    this.error(1);
                }
                pos.length = nm.length = tUV.length = tCo.length = 0;
                if (info) {
                    if (!Array.isArray(info)) {
                        this.error(3);
                    } else if (!info.some(infoCheck)) {
                        this.error(4);
                    }

                    len = info.length;
                    if (vertex.length % len) this.error(2);

                    i = len;
                    while (i--) info[info[i]] = i;
                    isNormal = info.normalX && info.normalY && info.normalZ,
                    isUV = info.u && info.v,
                    isColor = info.r && info.g && info.b && info.a;

                    for (i = 0, j = vertex.length / len; i < j; i++) {
                        k = len * i,
                        pos.push(vertex[k+info.x], vertex[k+info.y], vertex[k+info.z]);
                        if (isNormal) nm.push(vertex[k+info.normalX], vertex[k+info.normalY], vertex[k+info.normalZ]);
                        if (isUV) tUV.push(vertex[k+info.u], vertex[k+info.v]);
                        if (isColor) tCo.push(vertex[k+info.r], vertex[k+info.g], vertex[k+info.b], vertex[k+info.a]);
                    }
                    position[this] = new Float32Array(pos);
                } else {
                    len = 3;
                    position[this] = vertex instanceof Float32Array ? vertex : new Float32Array(vertex);
                }
                if (!isNormal) calcNormal(nm, info ? pos : vertex, tIndex);
                normal[this] = new Float32Array(nm);
                vertexCount[this] = vertex.length / len,
                triangleCount[this] = tIndex.length / 3,
                uv[this] = new Float32Array(tUV),
                color[this] = new Float32Array(tCo),
                index[this] = tIndex instanceof Uint16Array ? tIndex : new Uint16Array(tIndex);
            };
        })()
    })
    .field('vertexCount', {
            description: "지오메트리를 구성하는 버텍스 갯수",
            sample: [
                'console.log(geometry.vertexCount);'
            ],
            defaultValue:'null',
            get:$getter(vertexCount)
        }
    )
    .field('triangleCount', {
            description: "지오메트리를 구성하는 삼각형 갯수",
            sample: [
                'console.log(geometry.triangleCount);'
            ],
            defaultValue:'null',
            get:$getter(triangleCount)
        }
    )
    .field('volume', {
        description: "지오메트리의 최대 부피값.",
        sample: [
            'console.log(geometry.volume);'
        ],
        defaultValue:'null',
        get:function volumeGet() {
            var minX, minY, minZ, maxX, maxY, maxZ, t0, t1, t2, t, i;
            if (!volume[this]) {
                minX = minY = minZ = maxX = maxY = maxZ = 0,
                t = position[this], i = t.length;
                while (i--) {
                    t0 = i * 3, t1 = t0 + 1, t2 = t0 + 2,
                    minX = t[t0] < minX ? t[t0] : minX,
                    maxX = t[t0] > maxX ? t[t0] : maxX,
                    minY = t[t1] < minY ? t[t1] : minY,
                    maxY = t[t1] > maxY ? t[t1] : maxY,
                    minZ = t[t2] < minZ ? t[t2] : minZ,
                    maxZ = t[t2] > maxZ ? t[t2] : maxZ;
                }
                volume[this] = [maxX - minX, maxY - minY, maxZ - minZ];
            }
            return volume[this];
        }
    })
    .field('position', {
            description: "지오메트리를 구성하는 버텍스의 포지션 배열을 반환",
            sample: [
                'console.log(geometry.position);'
            ],
            defaultValue:'null',
            get: $getter(position)
        }
    )
    .field('normal', {
            description: "지오메트리를 구성하는 버텍스의 노멀 배열을 반환",
            sample: [
                'console.log(geometry.normal);'
            ],
            get: $getter(normal)
        }
    )
    .field('uv', {
            description: "지오메트리를 구성하는 버텍스의 UV 배열을 반환",
            sample: [
                'console.log(geometry.uv);'
            ],
            get: $getter(uv)
        }
    )
    .field('color', {
            description: "지오메트리를 구성하는 버텍스의 컬러 배열을 반환",
            sample: [
                'console.log(geometry.color);'
            ],
            get: $getter(color)
        }
    )
    .field('index', {
            description: "지오메트리를 인덱스 배열을 반환",
            sample: [
                'console.log(geometry.index);'
            ],
            get: $getter(index)
        }
    )
    .build();
})();
var Material = (function () {
    var textureLoaded, texType,
        diffuse, normal, specular, diffuseWrap, specularNormal, 
        shading, lambert,  wireFrame, wireFrameColor, count,color;
    
    //private
    shading = {},
    lambert = {},
    diffuse = {},
    normal = {},
    specular = {},
    diffuseWrap = {},
    specularNormal = {},
    wireFrame = {},
    wireFrameColor = {},
    count = {},
    color = {},
    //shared private
    $setPrivate('Material', {
        color:color,
        wireFrame:wireFrame,
        wireFrameColor:wireFrameColor,
        shading:shading,
        lambert:lambert,
        diffuse:diffuse
    }),
    //lib
    textureLoaded = function(mat){
        this.removeEventListener(Texture.load, textureLoaded),
        mat.dispatch(Material.changed);
        if (mat.isLoaded) mat.dispatch(Material.load);
    },
    texType = {
        diffuse:diffuse,
        specular:specular,
        diffuseWrap:diffuseWrap,
        normal:normal,
        specularNormal:specularNormal
    };
    return MoGL.extend('Material',{
        description:[
            "모든 재질의 부모가 되는 클래스로 Material 자체는 아무런 빛의 속성을 적용받지 않는 재질임.",
            "* Material의 메서드는 대부분 메서드체이닝을 지원함."
        ],
        param:[
            '?color:string - 재질의 기본적인 색상. 생략하면 색상 없음. 다음과 같은 형태가 올 수 있음.',
            'r, g, b, a : 각각 0~1 사이의 소수를 받으며 각각 대응함.'
        ],
        sample:[
            "var mat1 = new Material('#f00');",
            "var mat2 = new Material('#ff0000');",
            "var mat3 = new Material('#ff00000.8');",
            "var mat4 = new Material( 0xff/0xff, 0xaf/0xff, 0x45/0xff, 0.5 );",
            "",
            "//팩토리함수로도 사용가능",
            "var mat5 = Material('#ff00000.8');"
        ],
        value:function Material() {
            color[this] = [1,1,1,1]
            if (arguments.length) {
                this.color = arguments.length > 1 ? arguments : arguments[0]
            }
            wireFrameColor[this] = [Math.random(),Math.random(),Math.random(),1]
            wireFrame[this] = false;
            lambert[this] = 1
            shading[this] = Shading.none
        }
    })
    .field('count', {
            description: "재질이 사용된 횟수",
            sample: [
                '// 미구현상태임',
                'console.log(material.count);'
            ],
            defaultValue:'0',
            get: $getter(count, false, 0)
        }
    )
    .field('color', {
        description: "재질 컬러색",
        sample: [
            'material.color = [0,1,2,1]; // 배열형식으로 입력',
            'material.color = "#ff2233; // 16진수로 입력"',
            'console.log(material.color);'
        ],
        defaultValue:'[1,1,1,1]',
        get:$getter(color),
        set:function colorSet(v) {
            var p = color[this];
            v = $color(v);
            p[0] = v[0], p[1] = v[1], p[2] = v[2], p[3] = v[3];
       }
    })
    .field('wireFrame', {
        description: "와이어 프레임 표현여부",
        sample: [
            'material.wireFrame = true;',
            'console.log(material.wireFrame);'
        ],
        defaultValue:'false',
        get:$getter(wireFrame),
        set:$setter(wireFrame)
    })
    .field('wireFrameColor', {
        description: "와이어 프레임 컬러",
        sample: [
            'material.wireFrameColor = [1,0.5,1,1]; // r,g,b,a',
            'console.log(material.wireFrameColor);'
        ],
        defaultValue:'[Math.random(),Math.random(),Math.random(),1]',
        get:$getter(wireFrameColor),
        set:function wireFrameColorSet(v) {
            var p = wireFrameColor[this];
            v = $color(v);
            p[0] = v[0], p[1] = v[1], p[2] = v[2], p[3] = v[3];
       }
    })
    .field('shading', {
        description: "재질 쉐이딩 적용",
        sample: [
            'material.shading = Shading.phong;',
            'console.log(material.shading);'
        ],
        defaultValue:'Shading.none',
        get:$getter(shading),
        set:$setter(shading)
    })
    .field('lambert', {
        description: "재질 쉐이딩 적용 강도 설정",
        sample: [
            'material.lambert = 1.5;',
            'console.log(material.lambert);'
        ],
        defaultValue:'1.0',
        get:$getter(lambert),
        set:$setter(lambert)
    })
    .field('diffuse', {
        description: "재질에 적용된 디퓨즈 리스트 반환",
        sample: [
            'console.log(material.diffuse);'
        ],
        defaultValue:'[]',
        get:$getter(diffuse)
        //set:$setter(diffuse)
    })
    .field('isLoaded', {
        description: "재질에 적용된 텍스쳐들이 모두 로딩되었는지 확인",
        sample: [
            'console.log(material.isLoaded);'
        ],
        defaultValue:'false',
        get:function(mat) {
            var type, tex, i;
            for (type in texType) {
                if (tex = texType[type][mat]) {
                    i = tex.length;
                    while (i--) {
                        if(!tex[i].tex.isLoaded) return false;
                    }
                }
            }
            return true;
        }
    })
    .method('addTexture', {
        description:[
            '[Mesh](Mesh.md)를 통해 최종적으로 포함될 Texture를 등록',
            '* [Scene](Scene.md)에 직접 등록되는 경우는 id를 [addMaterial](Scene.md#addmaterial-idstring-materialmaterial-)시점에 평가함.',
            '* [Mesh](Mesh.md)에서 직접 생성하여 삽입하는 경우는 [addChild](Scene.md#addchild-idstring-meshmesh-)시점에 평가함.',
            '* 이미 직간접적으로 [Scene](Scene.md)에 포함된 경우는 메서드호출시점에 평가함.'
        ],
        param:[
            'type:string - 해당 텍스쳐가 어떠한 타입에 포함될 것인가를 결정함. 다음의 값이 올 수 있음.',
                "* [Texture.diffuse](Texture.md#diffuse) or 'diffuse' - 디퓨즈 맵으로 등록함.",
                "* [Texture.specular](Texture.md#specular) or 'specular' - 스페큘러 맵으로 등록함.",
                "* [Texture.diffuseWrap](Texture.md#diffusewrap) or 'diffuseWrap' - 디퓨즈랩 맵으로 등록함.",
                "* [Texture.normal](Texture.md#normal) or 'normal' - 노말 맵으로 등록함.",
                "* [Texture.specularNormal](Texture.md#specularNormal) or 'diffuse' - 스페큘러노말 맵으로 등록함.",
            '[Texture](Texture.md) - 추가 될 Texture instance.',
            'index:int or [Texture](Texture.md) - 중첩되는 이미지의 경우 순번을 정의함. 생략하거나 null 이면 마지막 인덱스 + 1.',
            '?blendMode:string - 중첩되는 이미지의 경우 아래의 이미지와 합성되는 속성을 정의함. 첫번째 텍스쳐는 적용되지 않고 기본값은 \'alpha\' 이고 다음과 같은 값이 올 수 있음.',
                "* [BlendMode.add](BlendMode.md#add) or 'add' -  전면색을 배경색에 더하고 올림값 0xFF를 적용.",
                "* [BlendMode.alpha](BlendMode.md#alpha) or 'alpha' - 전면색의 알파값에 따라 배경색을 덮어가는 가장 일반적인 중첩.",
                "* [BlendMode.darken](BlendMode.md#darken) or 'darken' - 전면색과 배경색 중 보다 어두운 색상(값이 작은 색상)을 선택.",
                "* [BlendMode.difference](BlendMode.md#difference)or 'difference' - 전면색과 배경색을 비교하여 둘 중 밝은 색상 값에서 어두운 색상 값을 뺌.",
                "* [BlendMode.erase](BlendMode.md#erase) or 'erase' - 전면색의 알파만 적용하여 배경색을 지움.",
                "* [BlendMode.hardlight](BlendMode.md#hardlight) or 'hardlight' - 전면색의 어두운 정도를 기준으로 배경색을 조정.",
                "* [BlendMode.invert](BlendMode.md#invert) or 'invert' - 전면색을 이용하여 배경색을 반전시킴.",
                "* [BlendMode.lighten](BlendMode.md#lighten) or 'lighten' - 전면색과 배경색 중 보다 밝은 색(값이 큰 색상)으로 선택.",
                "* [BlendMode.multiply](BlendMode.md#multiply) or 'multiply' -  전면색에 배경색을 곱하고 0xFF로 나누어 정규화하여 보다 어두운 색을 만듬.",
                "* [BlendMode.screen](BlendMode.md#screen) or 'screen' - 전면색의 보수(역수)에 배경색 보수를 곱하여 표백 효과를 냄.",
                "* [BlendMode.subtract](BlendMode.md#subtract) or 'subtract' - 전면색의 값을 배경색에서 빼고 내림값 0을"
        ],
        exception:[
            "* 'Material.addTexture:0' - 1번째 param 값이 Texture 타입이 아닐 경우.",
            "* 'Material.addTexture:1' - 2번째 param 값이 Texture 인스턴스가 아닐 경우.",
            "* 'Material.addTexture:2' - 2번째 param 값이 이미 등록 되어있는 Texture 일 경우.",
            "* 'Material.addTexture:3' - 3번째 param 값이 index:int or Texture 외 다른 형식이 들어오는 경우.",
            "* 'Material.addTexture:4' - 3번째 param 값이 index:int 일 경우 0 보다 작거나 등록되어 있는 Texture 수보다 많을 경우.",
            "* 'Material.addTexture:5' - 3번째 param 값이 Texture 일 경우 미리 등록된 Texture 가 아닐 경우."
        ],
        ret:[
            'this - 메서드체이닝을 위해 자신을 반환함.'
        ],
        sample:[
            "var indexTestMaterial = Material('#ffffff127.8');",
            "",
            "var indexTexture1 = new Texture();",
            "indexTestMaterial.addTexture(Texture.diffuse, indexTexture1, null, BlendMode.add);",
            "",
            "var indexTexture2 = new Texture();",
            "indexTestMaterial.addTexture(Texture.diffuse, indexTexture2, undefined, BlendMode.screen);",
            "",
            "var indexTexture3 = new Texture();",
            "indexTestMaterial.addTexture(Texture.diffuse, indexTexture3, 1, BlendMode.darken);",
            "",
            "var indexTexture4 = new Texture();",
            "indexTestMaterial.addTexture(Texture.diffuse, indexTexture4);",
            ""
        ],
        value:function addTexture(type, texture/*,index,blendMode*/) {
            var p, i = arguments[2];
            if (!texType[type]) this.error(0);
            if (!(texture instanceof Texture)) this.error(1);

            //lazy초기화
            p = texType[type];
            if (this in p) {
                p = p[this];
                if (p[texture]) this.error(2); //이미 있는 텍스쳐
            } else {
                p = p[this] = [];
            }

            //중복검사용 마킹
            p[texture] = 1;
            //로딩전 텍스쳐에게는 이벤트리스너를 걸어줌
            if(!texture.isLoaded) {
                texture.addEventListener(Texture.load, textureLoaded, null, this);
            }

            //실제 텍스쳐구조체에는 텍스쳐와 블랜드모드가 포함됨
            texture = {tex:texture};

            //블랜드모드가 들어온 경우의 처리
            if (arguments.length > 3) {
                texture.blendMode = arguments[3];
            }
            //인덱스 제공 여부에 따라 텍스쳐리스트에 삽입
            if (i === undefined || i === null) {
                p[p.length] = texture;
            } else if (typeof i == 'number') {
                if (i < 0 || i > p.length - 1) {
                    this.error(4);
                } else {
                    p.splice(i, 0, texture);
                }
            } else if (i instanceof Texture) {
                i = p.indexOf(i);
                if (i > -1) {
                    p.splice(i, 0, texture);
                } else {
                    this.error(5);
                }
            } else {
                this.error(3);
            }

            //changed이벤트는 무조건 발생함.
            this.dispatch(Material.changed);
            if (this.isLoaded) this.dispatch(Material.load);
            return this;
        }
    })
    .method('removeTexture', {
        description:[
            'removeTexture를 통해 등록된 텍스쳐를 제거함.'
        ],
        param:[
            'type:string - 어떠한 타입에 텍스쳐가 제거 될 것인가를 결정함.',
            "* [Texture.diffuse](Texture.md#diffuse) or 'diffuse' - 디퓨즈 맵으로 등록함.",
            "* [Texture.specular](Texture.md#specular) or 'specular' - 스페큘러 맵으로 등록함.",
            "* [Texture.diffuseWrap](Texture.md#diffusewrap) or 'diffuseWrap' - 디퓨즈랩 맵으로 등록함.",
            "* [Texture.normal](Texture.md#normal) or 'normal' - 노말 맵으로 등록함.",
            "* [Texture.specularNormal](Texture.md#specularNormal) or 'diffuse' - 스페큘러노말 맵으로 등록함.",
            '[Texture](Texture.md) - 제거 될 Texture instance.'
        ],
        ret:[
            'this - 메서드체이닝을 위해 자신을 반환함.'
        ],
        sample:[
            "material.addTexture(Texture.diffuse, indexTexture3, null, BlendMode.darken);",
            "material.removeTexture(Texture.diffuse, indexTexture3);"
        ],
        value:function removeTexture(type, texture){
            var p, key, i;
            if (texType[type]) {
                p = texType[type][this];
                if (p[texture]) {
                    p[texture] = 0;
                    i = p.length;
                    p.splice(p.indexOf(texture), 1);
                    delete p[texture]
                }
            } else {
                for (key in texType) {
                    p = texType[key][this];
                    if (p[texture]) {
                        p[texture] = 0;
                        p.splice(p.indexOf(texture), 1);
                        delete p[texture]
                    }
                }
            }
            this.dispatch(Material.changed);
            return this;
        }
    })
    .event('changed', 'changed')
    .build();
})();
var Mesh = (function () {
    var geometry, material, culling;
    //private
    geometry = {},
    material = {},
    culling = {};
    //shared private
    $setPrivate('Mesh', {
        geometry : geometry,
        material : material,
        culling : culling
    });
    return Matrix.extend('Mesh', {
        description: "기하구조와 재질을 포함할 수 있는 하나의 렌더링 단위인 Mesh를 생성함.",
        param: [
            "1. geometry: 직접 [Geometry](Geometry.md)객체를 지정함.",
            "2. material: 직접 [Material](Material.md) 객체를 지정함."
        ],
        sample: [
            "var mesh1 = new Mesh(",
            "  new Geometry( vertex, index ),",
            "  new Material('#f00')",
            ");",
            "",
            "// scene에 등록된 Geometry, Material 사용",
            "var mesh2 = new Mesh( scene.getGeometry(geometryID), scene.getMaterial(materialID) );",
            "",
            "// 팩토리함수로도 사용가능",
            "var mesh3 = Mesh( scene.getGeometry(geometryID), scene.getMaterial(materialID) );"
        ],
        exception:[
            "* 'Mesh.geometrySet:0' - 첫번째 인자가 geometry 객체가 아닌 경우",
            "* 'Mesh.materialSet:0' - 두번째 인자가 material 객체가 아닌 경우"
        ],
        value:function Mesh(geometry, material) {
            this.geometry = geometry;
            this.material = material;
        }
    })
    .field('culling', {
        description: "현재 Mesh의 Face Culling 정보",
        sample: [
            "// Mesh에 정의 된 상수 입력",
            "var mesh1 = new Mesh(geometry, material);",
            "mesh1.culling = Mesh.cullingNone; // 페이스 컬링을 하지않음",
            "mesh1.culling = Mesh.cullingFront; // 앞면 페이스 컬링을 함",
            "mesh1.culling = Mesh.cullingBack; // 뒷면 페이스 컬링을 함",
            "",
            "// Mesh에 정의 된 상수의 값을 직접 입력",
            'mesh1.culling = "cullingNone"; // 페이스 컬링을 하지않음',
            'mesh1.culling = "cullingFront"; // 앞면 페이스 컬링을 함',
            'mesh1.culling = "cullingBack"; // 뒷면 페이스 컬링을 함'
        ],
        defaultValue:"cullingNone",
        exception:"* 'Mesh.cullingSet:0' - Mesh에 정의된 culling상수값들과 다른 값을 입력 할 경우",
        get:$getter(culling, false, 'cullingNone'),
        set:function cullingSet(v) {
            if (Mesh[v]) {
                culling[this] = v;
            } else {
                this.error(0);
            }
        }
    })
    .field('geometry', {
        description: "이 Mesh의 기하구조 정보를 가지는 [Geometry](Geometry.md) 객체",
        sample: [
            "// scene에 등록된 기하구조로 교체할수 있음 - set",
            "mesh1.geometry = scene.getGeometry(geometryID);",
            "",
            "// 다른 Mesh에 기하구조 객체를 알려줄수 있음 - get",
            "mesh2.geometry = mesh1.geometry;"
        ],
        exception: "* 'Mesh.geometrySet:0' - geometry 아닌 값를 필드에 입력하려는 경우",
        get:$getter(geometry),
        set:function geometrySet(v) {
            if (v instanceof Geometry) {
                geometry[this] = v;
                this.dispatch('changed')
            } else {
                this.error(0);
            }
        }
    })
    .field('material', {
        description: "이 Mesh의 재질을 표현하는 [Material](Material.md) 객체",
        sample: [
            "// scene에 등록된 재질로 교체할수 있음 - set",
            "mesh1.material = scene.getMaterial(materialID);",
            "",
            "// 다른 Mesh에 재질 객체를 알려줄수 있음 - get",
            "mesh2.material = mesh1.material;"
        ],
        exception:"* 'Mesh.materialSet:0' - material객체가 아닌 값를 필드에 입력하려는 경우",
        get:$getter(material),
        set:function materialSet(v) {
            if (v instanceof Material) {
                material[this] = v;
                this.dispatch('changed')
            } else {
                this.error(0);
            }
        }
    })
    .constant('cullingNone', {
        description: "Mesh Face Culling을 하지 않음.",
        type:'string',
        sample: [
            "var mesh1 = new Mesh(geometry, material);",
            "mesh1.culling = Mesh.cullingNone;",
        ],
        value:"cullingNone"
    })
    .constant('cullingFront',  {
        description: "Mesh FrontFace를 그리지 않음.",
        type:'string',
        sample: [
            "var mesh1 = new Mesh(geometry, material);",
            "mesh1.culling = Mesh.cullingFront;",
        ],
        value:"cullingFront"
    })
    .constant('cullingBack', {
        description: "Mesh BackFace를 그리지않음",
        type:'string',
        sample: [
            "var mesh1 = new Mesh(geometry, material);",
            "mesh1.culling = Mesh.cullingBack;",
        ],
        value:"cullingBack"
    })
    .event('changed', 'changed')
    .build();
})();
var Group = Matrix.extend('Group', {
    description:[
        "개발중"
    ],
    value:function Group() {}
})
.method('addChild', {
    description:"개발중..",
    value:function addChild(mesh) {
        return this;
    }
})
.method('getChild', {
    description:"개발중..",
    value:function getChild(id) {
        return null;
    }
})
.method('removeChild', {
    description:"개발중..",
    value:function removeChild(id) {
        return this;
    }
})
.build();
var Camera = (function () {
    var PERPIR, prop;
    //lib
    PERPIR = D2R * .5,
    //private
    prop = {},
    //shared private
    $setPrivate('Camera', {});
    return Matrix.extend('Camera',{
        description: "씬을 실제로 렌더링할 카메라 객체를 생성함",
        sample: [
            "var camera = new Camera();"
        ],
        value : function Camera() {
            Object.seal(prop[this] = {
                r: 0, g: 0, b: 0, a: 1,
                fov: 55, near: 0.1, far: 10000,
                fog: false, fogColor: null, fogNear: 0, fogFar: 0,
                visible: true,
                antialias: false,
                mode: Camera.perspective,
                //filters:{},
                renderArea: null,
                projectionMatrix: Matrix()
            }),
            this.z = 10,
            this.lookAt(0, 0, 0);
        }
    })
    .field('clipPlaneNear', {
        description: "현재 절두체의 최소z값",
        sample: [
            'var camera = new Camera();',
            'camera.clipPlaneNear = 10;'
        ],
        defaultValue:"0.1",
        get: $getter(prop, 'near'),
        set: $setter(prop, 'near')
    })
    .field('clipPlaneFar', {
        description: "현재 절두체의 최대z값",
        sample: [
            'var camera = new Camera();',
            'camera.clipPlaneFar = 1000;'
        ],
        defaultValue:"10000",
        get: $getter(prop, 'far'),
        set: $setter(prop, 'far')
    })
    .field('visible', {
        get: $getter(prop, 'visible'),
        sample:[
            "var camera = Camera();",
            "camera.visible = false;"
        ],
        set: function visibleSet(v) {
            if (typeof v == 'number') {
                v = v ? true : false
            }
            prop[this].visible = v
        }
    })
    .field('antialias', {
        description: "쉐이더 레벨의 안티알리어싱 적용여부",
        sample: [
            'var camera = new Camera();',
            'camera.antialias = true;'
        ],
        defaultValue:"false",
        get: $getter(prop, 'antialias'),
        set: function antialiasSet(v) {
            if (typeof v == 'number') {
                v = v ? true : false
            }
            prop[this].antialias = v
        }
    })
    .field('fogColor', {
        description: "안개 효과 컬러 지정",
        sample: [
            'var camera = new Camera();',
            'camera.fogColor = [Math.random(),Math.random(),Math.random(),1];'
        ],
        defaultValue:'null',
        get: $getter(prop, 'fogColor'),
        set: function fogColorSet(v) {
            var p = prop[this];
            p.fogColor = $color(v).slice(0),
                p.fog = true;
        }
    })
    .field('fogNear', {
        description: "안개효과가 시작되는 z축 거리",
        sample: [
            'var camera = new Camera();',
            'camera.fogNear = 10;'
        ],
        defaultValue:'0',
        get: $getter(prop, 'fogNear'),
        set: function fogNearSet(v) {
            var p = prop[this];
            p.fogNear = v,
                p.fog = true;
        }
    })
    .field('fogFar', {
        description: "안개효과만 남고 아무것도 보이지 않는  z축 거리",
        sample: [
            'var camera = new Camera();',
            'camera.fogFar = 1000;'
        ],
        defaultValue:'0',
        get: $getter(prop, 'fogFar'),
        set: function fogFarSet(v) {
            var p = prop[this];
            p.fogFar = v,
                p.fog = true;
        }
    })
    .field('fov', {
        description: "FOV(Field of view) 시야각을 정의.",
        sample: [
            'var camera = new Camera();',
            "// number형으로 입력",
            'camera.fov = 45;', // 시야각입력을 통한 fov계산
            "// [width,height,angle] - 화면사이즈와 각도의 직접적 입력을 통한 fov 지정도 가능" ,
            'camera.fov = [width,height,angle];' // 화면사이즈와 각도의 직접적 입력을 통한 fov 지정
        ],
        defaultValue:'55',
        get: $getter(prop, 'fov'),
        set: function fovSet(v) {
            var p = prop[this];
            if (typeof v == 'number') {
                p.fov = v;
            } else if ('0' in v && '1' in v) {
                p.fov = CEIL(2 * ATAN(TAN(v[2] * PERPIR) * (v[1] / v[0])) * R2D);
            }
        }
    })
    .field('backgroundColor', {
        description: "렌더링 배경화면 색상을 지정",
        sample: [
            'var camera = new Camera();',
            "// [r,g,b,a] number형으로 입력",
            'camera.backgroundColor = [Math.random(),Math.random(),Math.random(),1];'
        ],
        defaultValue:'{r: 0, g: 0, b: 0, a: 1}}',
        get: (function () {
            var a = [];
            return function backgroundColorGet() {
                var p = prop[this];
                a[0] = p.r, a[1] = p.g, a[2] = p.b, a[3] = p.a
                return a;
            };
        })(),
        set: function backgroundColorSet(v) {
            var p = prop[this];
            v = $color(v);
            p.r = v[0], p.g = v[1], p.b = v[2], p.a = v[3];
        }
    })
    .field('fog', {
        description: "안개효과 지정여부" ,
        sample: [
            'var camera = new Camera();',
            '// true or false - false로 지정시 안개효과 삭제' ,
            'camera.fog = true;'
        ],
        defaultValue:'false',
        get: function fogGet() {
            return prop[this].fog ? true : false;
        }
    })
    .field('mode', {
        description:"카메라모드 지정",
        sample: [
            'var camera = new Camera();',
            "// Camera.perspective or Camera.othogonal",
            'camera.mode = Camera.perspective;',
            'camera.mode = Camera.othogonal;'
        ],
        defaultValue:'Camera.perspective',
        get: $getter(prop, 'mode'),
        set: function modeSet(v) {
            if (Camera[v]) {
                prop[this].mode = v;
            } else {
                this.error(0);
            }
        }
    })
    .field('renderArea', {
        description: "카메라 렌더링 영역지정, 렌더링 영역을 지정하지 않을경우 캔버스 영역 전체로 자동 지정됨.",
        sample: [
            'var camera = new Camera();',
            "// [x,y, width, height] - number형으로 입력, %단위도 입력가능",
            'camera.renderArea = [10,100,200,300];',
            'camera.renderArea = ["10%","10%",200,300];',
        ],
        defaultValue:'null',
        get: $getter(prop, 'renderArea'),
        set: function renderAreaSet(v) {
            prop[this].renderArea = v
        }
    })
    .field('projectionMatrix', {
        description: "현재 프로젝션 매트릭스를 반환",
        sample: [
            'var camera = new Camera();',
            'var matrix = camera.projectionMatrix;'
        ],
        get: function projectionMatrixGet() {
            return prop[this].projectionMatrix
        }
    })
    .method('resetProjectionMatrix', {
            description: "현재 프로퍼티들을 기준으로 프로젝션 매트릭스를 갱신",
            sample: [
                'var camera = new Camera();',
                'camera.fov = 10;',
                'camera.renderArea = [10,100,200,300];',
                '// 새로운 속성 기준으로 프로젝션 매트릭스 갱신',
                'camera.resetProjectionMatrix();'
            ],
            value: function resetProjectionMatrix() {
                var tMatrix, tArea, p;
                p = prop[this]
                tMatrix = p.projectionMatrix,
                    tArea = p.renderArea,
                    tMatrix.matIdentity()
                if (this._mode == '2d') {
                    tMatrix.raw[0] = 2 / tArea[2]
                    tMatrix.raw[5] = -2 / tArea[3]
                    tMatrix.raw[10] = 0
                    tMatrix.raw[12] = -1
                    tMatrix.raw[13] = 1
                } else {
                    tMatrix.matPerspective(p.fov, tArea[2] / tArea[3], p.near, p.far);
                }
                return this;
            }
        }
    )
    //.constant('resize', {
    //    description: '',
    //    type:'string',
    //    sample: '',
    //    value:'resize'
    //})
    .constant('orthogonal',{
        description: '카메라 정사 모드',
        type:'string',
        sample: [
            'var camera = new Camera();',
            'camera.mode = Camera.orthogonal;'
        ],
        value:'orthogonal'
    })
    .constant('perspective', {
        description: '카메라 원근 모드',
        type:'string',
        sample: [
            'var camera = new Camera();',
            'camera.mode = Camera.perspective;'
        ],
        value:'perspective'
    })
    .build();
    /*마일스톤0.5
     fn.getFilters = function getFilters(){
     var result = [],t = this._filters;
     for(var k in t) result.push(k);
     return result;
     },
     fn.setFilter = function setFilter(filter,needIe){
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
     fn.removeFilter = function removeFilter(filter){
     delete this._filters[filter];
     return this;
     },
     */
})();
var Scene = (function () {
    var vertexShaderParser, fragmentShaderParser,
        children,childrenArray, cameras, textures, materials, geometrys, vertexShaders, fragmentShaders, updateList,baseLightRotate;
    //private
    children = {},
    childrenArray = {},
    cameras = {},
    baseLightRotate={},
    textures = {},
    materials = {},
    geometrys = {},
    vertexShaders = {},
    fragmentShaders = {},
    updateList = {},
    //shared private
    $setPrivate('Scene', {
        children : children,
        childrenArray : childrenArray
    }),
    //lib
    vertexShaderParser = makeUtil.vertexShaderParser,
    fragmentShaderParser = makeUtil.fragmentShaderParser;
    return MoGL.extend('Scene', {
        description:'실제 렌더링될 구조체는 Scene별로 집결됨.\n- ' +
        'Scene은 렌더링과 관련된 [Mesh](Mesh.md), [Camera](Camera.md), [Light](Light.md) 등을 포함하고 이들 객체가 공유하며 활용하는 기초 자원으로서 vertex shader, fragment shader, [Texture](Texture.md), [Material](Material.md), [Geometry](Geometry.md) 등을 등록하여 관리한다',
        sample:[
            'var scene = new Scene();'
        ],
        value:function Scene() {
            // for JS
            children[this] = {},
            childrenArray[this] = [],
            cameras[this] = {},
            textures[this] = {},
            materials[this] = {},
            geometrys[this] = {},
            vertexShaders[this] = {},
            fragmentShaders[this] = {},
            updateList[this] = {
                mesh : [],
                material : [],
                camera : []
            },
            baseLightRotate[this] = [0, -1, -1];

            this.addVertexShader(Shader.colorVertexShader), this.addFragmentShader(Shader.colorFragmentShader),
            this.addVertexShader(Shader.wireFrameVertexShader), this.addFragmentShader(Shader.wireFrameFragmentShader),
            this.addVertexShader(Shader.bitmapVertexShader), this.addFragmentShader(Shader.bitmapFragmentShader),
            this.addVertexShader(Shader.bitmapVertexShaderGouraud), this.addFragmentShader(Shader.bitmapFragmentShaderGouraud),
            this.addVertexShader(Shader.colorVertexShaderGouraud), this.addFragmentShader(Shader.colorFragmentShaderGouraud),
            this.addVertexShader(Shader.colorVertexShaderPhong), this.addFragmentShader(Shader.colorFragmentShaderPhong),
            this.addVertexShader(Shader.toonVertexShaderPhong), this.addFragmentShader(Shader.toonFragmentShaderPhong),
            this.addVertexShader(Shader.bitmapVertexShaderPhong), this.addFragmentShader(Shader.bitmapFragmentShaderPhong),
            this.addVertexShader(Shader.bitmapVertexShaderBlinn), this.addFragmentShader(Shader.bitmapFragmentShaderBlinn),
            this.addVertexShader(Shader.postBaseVertexShader), this.addFragmentShader(Shader.postBaseFragmentShader);
        }
    })
    .field('updateList', {
            description: "world가 render 함수를 실행하기전 GPU업데이트가 되어야할 목록.",
            sample: [
                "console.log(scene.updateList);"
            ],
            defaultValue: '{ mesh : [], material : [], camera : [] }\n- 업데이트 완료후 각 리스트는 초기화 됨.',
            get: $getter(updateList)
        }
    )
    .field('vertexShaders', {
            description: "현재 씬이 가지고있는 버텍스 쉐이더 자바스크립트 정보",
            sample: [
                "console.log(scene.vertexShaders);"
            ],
            defaultValue: "{}",
            get: $getter(vertexShaders)
        }
    )
    .field('fragmentShaders', {
            description: "현재 씬이 가지고 있는 프레그먼트 쉐이더 자바스크립트 정보",
            sample: [
                "console.log(scene.fragmentShaders);"
            ],
            defaultValue: "{}",
            get: $getter(fragmentShaders)
        }
    )
    .field('baseLightRotate', {
            description: "디렉셔널 라이트 방향 설정, -1~1 사이값으로 입력(0.4에서 노멀라이즈처리)",
            sample: [
                "var scene = new Scene();",
                "scene.baseLightRotate = [0,1,0];",
                "console.log(scene.baseLightRotate);"
            ],
            defaultValue: "[0, -1, -1]",
            set: $setter(baseLightRotate),
            get: $getter(baseLightRotate)
        }
    )
    .field('cameras', {
            description: "씬에 등록된 카메라 리스트",
            sample: [
                "var scene = new Scene();",
                "scene.addChild(new Camera);",
                "console.log(scene.cameras); // 오브젝트 형식의 카메라 리스트를 반환"
            ],
            defaultValue: "{}",
            get: $getter(cameras)
        }
    )
    .field('children', {
            description: "씬에 등록된 자식 리스트를 오브젝트 형식으로 반환",
            sample: [
                "console.log(scene.children);"
            ],
            defaultValue: "{}",
            get: $getter(children)
        }
    )
    .method('addMesh', {
            description: [
                'Mesh객체를 추가함.'
            ],
            param: [
                'mesh:Mesh - 메쉬객체'
            ],
            ret: [
                'this - 메서드체이닝을 위해 자신을 반환함.'
            ],
            sample: [
                "var scene = new Scene();",
                "var geo = new Geometry([],[]);",
                "var mat = new Material();",
                "var mesh = new Mesh(geo,mat);",
                "scene.addMesh(mesh);"
            ],
            exception: [
                "'Scene.addMesh:0' - 이미 등록된 메쉬객체를 등록하려고 할 때",
                "'Scene.addMesh:1' - 메쉬가 아닌 객체를 등록하려고 할 때"
            ],
            value : function(v){
                var p = children[this], p2 = updateList[this], mat;
                if (p[v]) this.error(0);
                if (!(v instanceof Mesh)) this.error(1);
                p[v] = v;
                p2.mesh.push(v);
                mat = v.material;
                mat.addEventListener(Material.load, function() {
                    //console.log('메쉬의 재질이 변경되었다!')
                    var t = this.diffuse;
                    if(t){
                        var i = t.length;
                        while(i--){
                            if(p2.material.indexOf(t[i].tex) == -1) {
                                p2.material.push(t[i].tex);
                                //console.log('새로운 텍스쳐 업데이트 추가',t[i].tex.isLoaded)
                            }
                        }
                    }
                });
                v.addEventListener(Mesh.changed, function() {
                    p2.mesh.push(v);
                });
                mat.dispatch(Material.load,mat);

                if(childrenArray[this].indexOf(v) == -1) {
                    childrenArray[this].push(v);
                }
                return this;
            }
        }
    )
    .method('addCamera', {
            description: [
                '카메라 객체를 추가함.'
            ],
            param: [
                'camera:Camera - 카메라 객체'
            ],
            ret: [
                'this - 메서드체이닝을 위해 자신을 반환함.'
            ],
            sample: [
                "var scene = new Scene();",
                "var camera = new Camera();",
                "scene.addCamera(camera);"
            ],
            exception: [
                "'Scene.addCamera:0' : 이미 등록된 카메라객체를 등록하려고 할 때",
                "'Scene.addCamera:1' : 카메라가 아닌 객체를 등록하려고 할 때"
            ],
            value: function addCamera(v) {
                var p = cameras[this];
                if (p[v]) this.error(0);
                if (!(v instanceof Camera)) this.error(1);
                p[v] = v;
                updateList[this].camera.push(v);
                return this;
            }
        }
    )
    .method('addChild', {
            description: [
                '자식 객체를 추가함. 메쉬나 카메라 객체가 자식으로 올 수 있음'
            ],
            param: [
                'mesh:Mesh - 메쉬 객체',
                'camera:Camera - 카메라 객체'
            ],
            ret: [
                'this - 메서드체이닝을 위해 자신을 반환함.'
            ],
            sample: [
                "var scene = new Scene();",
                "var camera = new Camera();",
                "scene.addChild(camera);"
            ],
            exception: [
                "'Scene.addChild:0' - 카메라나 메쉬객체가 아닌 객체를 추가하려고 할 때"
            ],
            value: function addChild(v) {
                if (v instanceof Mesh)  this.addMesh(v);
                else if (v instanceof Camera)  this.addCamera(v);
                else this.error(0);
                return this;
            }
        }
    )
    .method('addGeometry', {
            description: [
                '지오메트리 객체를 추가함'
            ],
            param: [
                'geometry:Geometry - 지오메트리 객체'
            ],
            ret: [
                'this - 메서드체이닝을 위해 자신을 반환함.'
            ],
            sample: [
                "var scene = new Scene();",
                "var geo = new Geometry([],[]);",
                "scene.addGeometry(camera);"
            ],
            exception: [
                "'Scene.addGeometry:0' - 이미 등록된 지오메트리를 등록하려 할 때",
                "'Scene.addGeometry:1' - 지오메트리 타입이 아닌 객체를 등록하려 할 때"
            ],
            value: function (v) {
                var p = geometrys[this];
                if (p[v]) this.error(0);
                if (!(v instanceof Geometry)) this.error(1);
                p[v] = v;
                return this;
            }
        }
    )
    .method('addMaterial', {
            description: [
                '재질 객체를 추가함'
            ],
            param: [
                'material:Material - 재질 객체'
            ],
            ret: [
                'this - 메서드체이닝을 위해 자신을 반환함.'
            ],
            sample: [
                "var scene = new Scene();",
                "var mat = new Material();",
                "scene.addMaterial(mat);"
            ],
            exception: [
                "'Scene.addMaterial:0' - 이미 등록된 재질을 등록하려 할 때",
                "'Scene.addMaterial:1' - Material 타입이 아닌 객체를 등록하려 할 때"
            ],
            value: function addMaterial(v) {
                var p = materials[this];
                if (p[v]) this.error(0);
                if (!(v instanceof Material)) this.error(1);
                p[v] = v;
                return this;
            }
        }
    )
    .method('addTexture', {
            description: [
                '텍스쳐 객체를 추가함'
            ],
            param: [
                'texture:Texture - 텍스쳐 객체'
            ],
            ret: [
                'this - 메서드체이닝을 위해 자신을 반환함.'
            ],
            sample: [
                "var scene = new Scene();",
                "var texture = new Texture();",
                "scene.addTexture(texture);"
            ],
            exception: [
                "'Scene.addTexture:0' - 이미 등록된 텍스쳐를 등록하려 할 때",
                "'Scene.addTexture:1' - Texture 타입이 아닌 객체를 등록하려 할 때"
            ],
            value: function addTexture(v) {
                var p = textures[this];
                if (p[v]) this.error(0);
                if (!(v instanceof Texture)) this.error(1);
                p[v] = v;
                return this;
            }
        }
    )
    .method('addFragmentShader', {
            description: [
                '프레그먼트 쉐이더 객체를 추가함'
            ],
            param: [
                'fragmentShader:Shader - 프레그먼트 쉐이더 객체'
            ],
            ret: [
                'this - 메서드체이닝을 위해 자신을 반환함.'
            ],
            sample: [
                "scene.addFragmentShader(fragmentShader);"
            ],
            exception: [
                "'Scene.addFragmentShader:0' - 이미 등록된 프레그먼트 쉐이더를 등록하려 할 때"
            ],
            value: function addFragmentShader(v) {
                var p = fragmentShaders[this];
                if (p[v.code.id]) this.error(0);
                p[v.code.id] = fragmentShaderParser(v);
                return this;
        }
    })
    .method('addVertexShader', {
            description: [
                '버텍스 쉐이더 객체를 추가함'
            ],
            param: [
                'vertexShader:Shader - 버텍스 쉐이더 객체'
            ],
            ret: [
                'this - 메서드체이닝을 위해 자신을 반환함.'
            ],
            sample: [
                "scene.addVertexShader(vertexShader);"
            ],
            exception: [
                "'Scene.addVertexShader:0' - 이미 등록된 버텍스 쉐이더를 등록하려 할 때"
            ],
            value: function addVertexShader(v) {
                var p = vertexShaders[this];
                if (p[v.code.id]) this.error(0);
                p[v.code.id] = vertexShaderParser(v);
                return this;
            }
    })
    .method('getMesh',{
            description: [
                '씬에 등록된 Mesh객체를 검색'
            ],
            param: [
                'id:String - 찾고자 하는 메쉬의 id;'
            ],
            ret: [
                'Mesh or null'
            ],
            sample: [
                "scene.getMesh('MeshID')"
            ],
            value: function getMesh(id) {
                var p = children[this],k;
                for(k in p){
                    if(p[k].id == id){
                        return p[k];
                    }
                }
                return null;
            }
        }
    )
    .method('getCamera', {
            description: [
                '씬에 등록된 Camera객체를 검색'
            ],
            param: [
                'id:String - 찾고자 하는 Camera의 id'
            ],
            ret: [
                'Camera or null'
            ],
            sample: [
                "scene.getCamera('CameraID');"
            ],
            value: function getCamera(id) {
                var p = cameras[this], k;
                for (k in p) {
                    if (p[k].id == id) {
                        return p[k];
                    }
                }
                return null;
            }
        }
    )
    .method('getChild', {
            description: [
                '씬에 등록된 자식객체(Camera or Mesh) 검색'
            ],
            param: [
                'id:String - 찾고자 하는 자식의 id'
            ],
            ret: [
                'Mesh/Camera or null'
            ],
            sample: [
                "scene.getChild('CameraID');"
            ],
            value : function getChild(id) {
                var t;
                if(t = this.getMesh(id)) return t;
                if(t = this.getCamera(id)) return t;
                return null;
            }
        }
    )
    .method('getGeometry', {
            description: [
                '씬에 등록된 지오메트리 객체를 검색'
            ],
            param: [
                'id:String - 찾고자 하는 지오메트리 객체의 id'
            ],
            ret: [
                'Geometry or null'
            ],
            sample: [
                "scene.getGeometry('GeometryID');"
            ],
            value: function getGeometry(id) {
                var p = geometrys[this], k;
                for (k in p) {
                    if (p[k].id == id) {
                        return p[k];
                    }
                }
                return null;
            }
        }
    )
    .method('getMaterial', {
            description: [
                '씬에 등록된 재질 객체를 검색'
            ],
            param: [
                'id:String - 찾고자 하는 재질 객체의 id'
            ],
            ret: [
                'Material or null'
            ],
            sample: [
                "scene.getMaterial('MaterialID');"
            ],
            value: function getMaterial(id) {
                var p = materials[this], k;
                for (k in p) {
                    if (p[k].id == id) {
                        return p[k];
                    }
                }
                return null;
            }
        }
    )
    .method('getTexture', {
            description: [
                '씬에 등록된 텍스쳐 객체를 검색'
            ],
            param: [
                'id:String - 찾고자 하는 텍스쳐 객체의 id'
            ],
            ret: [
                'Texture or null'
            ],
            sample: [
                "scene.getTexture('TextureID');"
            ],
            value: function getTexture(id) {
                var p = textures[this], k;
                for (k in p) {
                    if (p[k].id == id) {
                        return p[k];
                    }
                }
                return null;
            }
        }
    )
    .method('removeChild', {
            description: [
                '씬에 등록된 객체를 자식리스트에서 삭제'
            ],
            param: [
                'id:String - 삭제 대상 객체의 id'
            ],
            ret: [
                'true or false - 삭제성공시 true 반환'
            ],
            sample: [
                "scene.removeChild('targetID');"
            ],
            value: function removeChild(id) {
                var p, k, result;
                p = children[this],
                    result = false;
                for (k in p) {
                    if (p[k].id == id) {
                        childrenArray[this].splice(childrenArray[this].indexOf(p[k]), 1);
                        delete p[k],
                        result = true;
                    }
                }

                return result;
            }
        }
    )
    .method('removeGeometry', {
            description: [
                '씬에 등록된 지오메트리 객체를 리스트에서 삭제'
            ],
            param: [
                'id:String - 삭제 대상 객체의 id'
            ],
            ret: [
                'true or false - 삭제성공시 true 반환'
            ],
            sample: [
                "scene.removeGeometry('targetID');"
            ],
            value: function removeGeometry(id) {
                var p, k, result;
                p = geometrys[this],
                    result = false;
                for (k in p) {
                    if (p[k].id == id) {
                        delete p[k],
                        result = true;
                    }
                }
                return result;
            }
        }
    )
    .method('removeMaterial', {
            description: [
                '씬에 등록된 재질 객체를 리스트에서 삭제'
            ],
            param: [
                'id:String - 삭제 대상 객체의 id'
            ],
            ret: [
                'true or false - 삭제성공시 true 반환'
            ],
            sample: [
                "scene.removeMaterial('targetID');"
            ],
            value: function removeMaterial(id) {
                var p, k, result;
                p = materials[this],
                    result = false;
                for (k in p) {
                    if (p[k].id == id) {
                        delete p[k],
                        result = true;
                    }
                }
                return result;
            }
        }
    )
    .method('removeTexture', {
            description: [
                '씬에 등록된 텍스쳐 객체를 리스트에서 삭제'
            ],
            param: [
                'id:String - 삭제 대상 객체의 id'
            ],
            ret: [
                'true or false - 삭제성공시 true 반환'
            ],
            sample: [
                "scene.removeTexture('targetID');"
            ],
            value: function removeTexture(id) {
                var p, result;
                p = textures[this],
                    result = false;
                if (p[id]) {
                    delete p[id],
                    result = true;
                }
                return result;
            }
        }
    )
    .build();
//fn.getFragmentShader = function (id) {
//    // TODO 마일스톤0.5
//    return this._fragmentShaders[id];
//},
//fn.getVertexShader = function (id) {
//    // TODO 마일스톤0.5
//    return this._vertexShaders[id];
//},
///////////////////////////////////////////////////////////////////////////
// Remove
//fn.removeFragmentShader = function removeFragmentShader() {
//    // TODO 마일스톤0.5
//    return this;
//},
//fn.removeVertexShader = function VertexShader() {
//    // TODO 마일스톤0.5
//    return this;
//}
})();

var World = (function (makeUtil) {
    var getGL, glSetting, glContext, rectMatrix = Matrix();
    var makeVBO, makeVNBO, makeIBO, makeUVBO, makeProgram, makeTexture, makeFrameBuffer;
    var baseUpdate, baseShaderUpdate, cameraRenderAreaUpdate;
    glSetting = {
        alpha: true,
        depth: true,
        stencil: false,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false
    },
    getGL = function (canvas) {
        var gl, keys, i;
        if (glContext) {
            gl = canvas.getContext(glContext, glSetting);
        } else {
            keys = 'experimental-webgl,webgl,webkit-3d,moz-webgl,3d'.split(','), i = keys.length;
            while (i--) {
                if (gl = canvas.getContext(keys[i], glSetting)) {
                    glContext = keys[i];
                    break;
                }
            }
        }
        return gl;
    };
    var renderList = {}, sceneList = [], cvsList = {}, autoSizer = {}, started = {}, gpu = {};
    // 씬에서 이사온놈들
    makeVBO = makeUtil.makeVBO,
    makeVNBO = makeUtil.makeVNBO,
    makeIBO = makeUtil.makeIBO,
    makeUVBO = makeUtil.makeUVBO,
    makeProgram = makeUtil.makeProgram,
    makeTexture = makeUtil.makeTexture,
    // TODO 일단은 카메라 프레임버퍼 전용
    makeFrameBuffer = makeUtil.makeFrameBuffer,
    baseUpdate = function (gpu) {
        // TODO 기초 버퍼들도 씬이 월드에서 등록될떄 해야겠음..
        makeVBO(gpu, 'null', [0.0, 0.0, 0.0], 3);
        if (!gpu.vbo['_FRAMERECT_']) {
            makeVBO(gpu, '_FRAMERECT_', [
                -1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0
            ], 3),
            makeUVBO(gpu, '_FRAMERECT_', [
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                1.0, 1.0
            ], 2),
            makeIBO(gpu, '_FRAMERECT_', [0, 1, 2, 1, 2, 3], 1);
        }

    },
    baseShaderUpdate = function (gpu, scene) {
        var vS, fS
        vS = scene.vertexShaders
        fS = scene.fragmentShaders
        //console.log('~~~~~~~~~',vS)
        //console.log('~~~~~~~~~',fS)
        makeProgram(gpu, 'color', vS.colorVertexShader, fS.colorFragmentShader);
        makeProgram(gpu, 'wireFrame', vS.wireFrameVertexShader, fS.wireFrameFragmentShader);
        makeProgram(gpu, 'bitmap', vS.bitmapVertexShader, fS.bitmapFragmentShader);
        makeProgram(gpu, 'bitmapGouraud', vS.bitmapVertexShaderGouraud, fS.bitmapFragmentShaderGouraud);
        makeProgram(gpu, 'colorGouraud', vS.colorVertexShaderGouraud, fS.colorFragmentShaderGouraud);
        makeProgram(gpu, 'colorPhong', vS.colorVertexShaderPhong, fS.colorFragmentShaderPhong);
        makeProgram(gpu, 'toonPhong', vS.toonVertexShaderPhong, fS.toonFragmentShaderPhong);
        makeProgram(gpu, 'bitmapPhong', vS.bitmapVertexShaderPhong, fS.bitmapFragmentShaderPhong);
        makeProgram(gpu, 'bitmapBlinn', vS.bitmapVertexShaderBlinn, fS.bitmapFragmentShaderBlinn);
        makeProgram(gpu, 'postBase', vS.postBaseVertexShader, fS.postBaseFragmentShader);
    },
    cameraRenderAreaUpdate = function (self) {
        var p, p2, k, k2;
        p = sceneList[self]
        for (k in p) {
            p2 = p[k].cameras
            for (k2 in p2) {
                var camera, tRenderArea, cvs,pixelRatio;
                camera = p2[k2],
                cvs = cvsList[self]
                tRenderArea = camera.renderArea;
                pixelRatio = window.devicePixelRatio
                if (tRenderArea && !camera.renderArea.byAutoArea) {
                    var tw,th
                    tw = cvs.width,
                    th = cvs.height
                    var wRatio = tRenderArea[2] / tw;
                    var hRatio = tRenderArea[3] / th;
                    tRenderArea = [
                        typeof tRenderArea[0] == 'string' ? tw * tRenderArea[0].replace('%', '') * 0.01 : tRenderArea[0],
                        typeof tRenderArea[1] == 'string' ? th * tRenderArea[1].replace('%', '') * 0.01 : tRenderArea[1],
                        typeof tRenderArea[2] == 'string' ? tw * tRenderArea[2].replace('%', '') * 0.01 : tRenderArea[2],
                        typeof tRenderArea[3] == 'string' ? th * tRenderArea[3].replace('%', '') * 0.01 : tRenderArea[3]
                    ];
                    camera.renderArea = [tRenderArea[0], tRenderArea[1], tw * wRatio, th * hRatio]
                    camera.renderArea.byAutoArea=false
                }else{
                    camera.renderArea = [0,0,cvs.width,cvs.height]
                    camera.renderArea.byAutoArea = true
                }
                camera.resetProjectionMatrix()
                //TODO 렌더러 반영하겠금 고쳐야겠고..
                // 헉!! 프레임 버퍼가 카메라에 종속되있어!!!!!!
                makeFrameBuffer(gpu[self], camera, cvs);
            }

        }
    };
    return MoGL.extend('World', {
        description:"World는 MoGL의 기본 시작객체로 내부에 다수의 Scene을 소유할 수 있으며, 실제 렌더링되는 대상임.",
        param:[
            "id:string - canvasID"
        ],
        sample:[
            "var world = new World('canvasID1);",
            "",
            "// 애니메이션 루프에 인스턴스를 넣는다.",
            "requestAnimationFrame(world.getRenderer(true));",
            "",
            "// 팩토리함수로도 사용가능",
            "var world2 = World('canvasID2');"
        ],
        exception:[
            "* 'World.constructor:0' - 캔버스 아이디가 없을 때",
            "* 'World.constructor:1' - 존재하지 않는 DOM id일 때",
            "* 'World.constructor:2' - WebGLRenderingContext 생성 실패"
        ],
        value:function World(id) {
            if (!id) this.error(0);
            cvsList[this] = document.getElementById(id);
            // for GPU
            gpu[this] = {
                gl: null,
                vbo: {},
                vnbo: {},
                uvbo: {},
                ibo: {},
                programs: {},
                textures: {},
                framebuffers: {}
            };
            if (!cvsList[this]) this.error(1);
            if (gpu[this].gl = getGL(cvsList[this])) {
                renderList[this] = {},
                sceneList[this] = [],
                autoSizer[this] = null;
            } else {
                this.error(2);
            }
        }
    })
    .method('setAutoSize', {
        description:[
            "world에 지정된 canvas요소에 대해 viewport에 대한 자동 크기 조정을 해주는지 여부.",
            "생성시 기본값은 false"
        ],
        param:[
            "isAutoSize:boolean - 자동으로 캔버스의 크기를 조정하는지에 대한 여부."
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        sample:[
            "var world = new World('canvasID');",
            "world.isAutoSize(true);"
        ],
        value:function setAutoSize(isAutoSize) {
            var canvas, scenes, self;
            if (isAutoSize) {
                if (!this._autoSizer) {
                    self = this,
                    canvas = cvsList[this],
                    scenes = sceneList[this],
                    autoSizer[this] = function() {
                        //this._pixelRatio = parseFloat(width)/parseFloat(height) > 1 ? window.devicePixelRatio : 1
                        var width, height, pixelRatio, k;
                        width = window.innerWidth,
                        height = window.innerHeight,
                        pixelRatio = window.devicePixelRatio,
                        canvas.width = width * pixelRatio,
                        canvas.height = height * pixelRatio,
                        canvas.style.width = width + 'px',
                        canvas.style.height = height + 'px',
                        canvas._autoSize = isAutoSize,
                        cameraRenderAreaUpdate(self);
                    };
                }
                window.addEventListener('resize', autoSizer[this]),
                window.addEventListener('orientationchange', autoSizer[this]);
                autoSizer[this]();
            } else if (autoSizer[this]) {
                window.removeEventListener('resize', autoSizer[this]),
                window.removeEventListener('orientationchange', autoSizer[this]);
            }
            return this;
        }
    })
    .method('addScene', {
        description:[
            "[Scene](Scene.md)객체를 world에 추가함."
        ],
        param:[
            "scene:[Scene](Scene.md) - [Scene](Scene.md)의 인스턴스"
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        exception:[
            "* 'World.addScene:0' - 이미 등록된 Scene.",
            "* 'World.addScene:1' - [Scene](Scene.md)이 아닌 객체를 지정한 경우."
        ],
        sample:[
            "var world = new World('canvasID');",
            "world.addScene(Scene().setId('lobby'));",
            "world.addScene(Scene().setId('room'));"
        ],
        value:function addScene(scene) {
            var tSceneList, i;
            tSceneList = sceneList[this], i = tSceneList.length;
            if (!(scene instanceof Scene )) this.error(1);
            console.log(tSceneList);
            while (i--) {
                if (tSceneList[i] == scene) this.error(0);
            }
            tSceneList.push(scene);
            var p = gpu[this];
            baseUpdate(p),
            baseShaderUpdate(p, scene),
            cameraRenderAreaUpdate(this);
            //scene등록시 현재 갖고 있는 모든 카메라 중 visible이 카메라 전부 등록
            //이후부터는 scene에 카메라의 변화가 생기면 자신의 world에게 알려야함
            return this;
        }
    })
    .method('getScene', {
        description:[
            "sceneId에 해당되는 [Scene](Scene.md)을 얻음."
        ],
        param:[
            "sceneId:string - 등록시 scene의 id. 없으면 null을 반환함."
        ],
        ret:"[Scene](Scene.md) - sceneId에 해당되는 [Scene](Scene.md) 인스턴스.",
        sample:[
            "var world = new World('canvasID');",
            "world.addScene(new Scene().setId('lobby'));",
            "var lobby = world.getScene('lobby');"
        ],
        value:function getScene(sceneID) {
            var i, tSceneList;
            tSceneList = sceneList[this],
            i = tSceneList.length;
            if (typeof sceneID === 'undefined') return null;
            while (i--) {
                if (tSceneList[i].id == sceneID) {
                    return tSceneList[i];
                }
            }
            return null;
        }
    })
    .method('getRenderer', {
        description:[
            "setInterval이나 requestAnimationFrame에서 사용될 렌더링 함수를 얻음.",
            "실제로는 본인과 바인딩된 render함수를 반환하고 한 번 반환한 이후는 캐쉬로 잡아둠."
        ],
        param:[
            "isRequestAnimationFrame:boolean - 애니메이션프레임용으로 반환하는 경우는 내부에서 다시 requestAnimationFrame을 호출하는 기능이 추가됨."
        ],
        ret:"function - this.render.bind(this) 형태로 본인과 바인딩된 함수를 반환함.",
        sample:[
            "var world = new World('canvasID');",
            "world.addScene(Scene().setId('lobby'));",
            "//인터벌용",
            "setInterval(world.getRenderer());",
            "//raf용",
            "requestAnimationFrame(world.getRenderer(true));"
        ],
        value:function getRenderer(isRequestAnimationFrame) {
            var p, self;
            p = renderList[this];
            if (!p) {
                // 없으니까 생성
                p = {}
            }
            self = this;
            if (isRequestAnimationFrame) {
                if (p[1]) return p[1];
                else {
                    return p[1] = function requestAni(currentTime) {
                            self.render(currentTime);
                            started[self.uuid] = requestAnimationFrame(p[1]);
                    }
                }
            } else {
                if (p[0]) return p[0];
                else {
                    p[0] = function intervalAni(currentTime) {
                        self.render(currentTime);
                    }
                    return p[0];
                }
            }
        }
    })
    .method('start', {
        description:[
            "requestAnimationFrame을 이용해 자동으로 render를 호출함."
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        sample:[
            "var world = new World('canvasID');",
            "world.start();"
        ],
        value:function start() {
            var renderFunc = this.getRenderer(1)
            started[this.uuid] = requestAnimationFrame(renderFunc);
            return this;
        }
    })
    .method('stop', {
        description:[
            "start시킨 자동 render를 정지함."
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        sample:[
            "var world = new World('canvasID');",
            "world.start();",
            "world.stop();"
        ],
        value:function stop() {
            cancelAnimationFrame(started[this.uuid]);
            return this;
        }
    })
    .method('removeScene', {
        description:[
            "[Scene](Scene.md)객체를 world에서 제거함.",
            "[Scene](Scene.md)을 제거하면 관련된 카메라가 지정된 render도 자동으로 제거됨."
        ],
        param:[
            "sceneId:string - [Scene](Scene.md)객체에 정의된 id."
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        exception:[
            "* 'World.removeScene:0' - id에 해당되는 [Scene](Scene.md)이 존재하지 않음."
        ],
        sample:[
            "// Scene과 Camara생성 및 등록",
            "var lobby = new Scene();",
            "lobby.addChild(Camera());",
            "",
            "// Scene 등록",
            "var world = new World('canvasID');",
            "world.addScene(lobby.setId('lobby'));",
            "",
            "// Scene 제거",
            "world.removeScene('lobby');"
        ],
        value:function removeScene(sceneID) {
            var i, tSceneList;
            tSceneList = sceneList[this],
            i = tSceneList.length;
            if (typeof sceneID === 'undefined') return null;
            while (i--) {
                if (tSceneList[i].id == sceneID) {
                    tSceneList.splice(i, 1),
                    console.log(sceneList);
                    return this;
                }
            }
            this.error('0');
        }
    })
    .method('render', {
        description:[
            "현재 화면을 그림."
        ],
        param:[
            "?currentTime:number - 현재시간 milliseconds."
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        sample:[
            "// Scene과 Camara생성 및 등록",
            "var lobby = new Scene();",
            "lobby.addChild(Camera());",
            "",
            "// Scene 등록",
            "var world = new World('canvasID');",
            "world.addScene(lobby.setId('lobby'));",
            "",
            "// 실제 출력",
            "world.render();"
        ],
        value:(function render(){
            var i,i2, j, k, len = 0;
            var f3 = new Float32Array(3), f4 = new Float32Array(4);
            var tScene, tSceneList, tCameraList, tCamera, tGPU, tGL, tChildren,tChildrenArray;
            var tCvs, tCvsW, tCvsH;
            var tItem, tMaterial;
            var tProgram, tCulling, tVBO, tVNBO, tUVBO, tIBO, tDiffuseID, tFrameBuffer, tShading;
            var pProgram, pCulling, pVBO, pVNBO, pUVBO, pIBO, pDiffuseID;
            var tMatUUID;

            var privateChildren;
            var privateChildrenArray;
            var priGeo;
            var priMat;
            var priCull;

            var priMatColor;
            var priMatWireFrame;
            var priMatWireFrameColor;
            var priMatShading;
            var priMatLambert;
            var priMatDiffuse;

            var tGeo;
            var tItemUUID;
            var baseLightRotate, useNormalBuffer, useTexture;
            var tColor;

            privateChildren = $getPrivate('Scene', 'children'),
            privateChildrenArray = $getPrivate('Scene', 'childrenArray'),
            priGeo = $getPrivate('Mesh', 'geometry'),
            priMat = $getPrivate('Mesh', 'material'),
            priCull = $getPrivate('Mesh', 'culling'),
            priMatColor = $getPrivate('Material', 'color'),
            priMatWireFrame = $getPrivate('Material', 'wireFrame'),
            priMatWireFrameColor = $getPrivate('Material', 'wireFrameColor'),
            priMatShading = $getPrivate('Material', 'shading'),
            priMatLambert = $getPrivate('Material', 'lambert'),
            priMatDiffuse = $getPrivate('Material', 'diffuse');

            return function(currentTime) {
                len = 0,
                pProgram = null,
                pCulling = null,
                pVBO = null,
                pVNBO = null,
                pUVBO = null,
                pIBO = null,
                pDiffuseID = null,
                tCvs = cvsList[this.uuid],
                tSceneList = sceneList[this.uuid],
                tGPU = gpu[this.uuid],
                tGL = tGPU.gl,
                tCvsW = tCvs.width,
                tCvsH = tCvs.height,
                i = tSceneList.length;

                this.dispatch(World.renderBefore, currentTime);

                while (i--) {
                    tScene = tSceneList[i]
                    //////////////////////////////////////////////////////////////////////////////////////////////////////
                    //Scene 업데이트 사항 반영
                    j = tScene.updateList.mesh.length;
                    while (j--) {
                        // 버퍼 업데이트
                        var updateItem, geo;
                        updateItem = tScene.updateList.mesh[j],
                        geo = updateItem.geometry;
                        if (geo) {
                            if (!tGPU.vbo[geo]) {
                                makeVBO(tGPU, geo, geo.position, 3),
                                makeVNBO(tGPU, geo, geo.normal, 3),
                                makeUVBO(tGPU, geo, geo.uv, 2),
                                makeIBO(tGPU, geo, geo.index, 1);
                            }
                        }
                    }
                    j = tScene.updateList.material.length;
                    while (j--) {
                        makeTexture(tGPU, tScene.updateList.material[j]);
                    }
                    if (tScene.updateList.camera.length) cameraRenderAreaUpdate(this);
                    tScene.updateList.mesh.length = 0,
                    tScene.updateList.material.length = 0,
                    tScene.updateList.camera.length = 0,
                    //////////////////////////////////////////////////////////////////////////////////////////////////////
                    tCameraList = tScene.cameras,
                    baseLightRotate = tScene.baseLightRotate
                    for (k in tCameraList) len++;
                    for (k in tCameraList) {
                        tCamera = tCameraList[k];
                        if (tCamera.visible) {
                            if (len > 1) {
                                tFrameBuffer = tGPU.framebuffers[tCamera.uuid].frameBuffer;
                                tGL.bindFramebuffer(tGL.FRAMEBUFFER, tFrameBuffer);
                                tGL.viewport(0, 0, tFrameBuffer.width, tFrameBuffer.height);
                            } else {
                                tGL.viewport(0, 0, tCvsW, tCvsH);
                            }
                            tChildren = privateChildren[tScene.uuid];
                            tChildrenArray = privateChildrenArray[tScene.uuid];

                            tGL.enable(tGL.DEPTH_TEST), tGL.depthFunc(tGL.LESS),
                            // TODO 이놈도 상황에 따라 캐쉬해야겠군
                            tGL.enable(tGL.BLEND),
                            tGL.blendFunc(tGL.SRC_ALPHA, tGL.ONE_MINUS_SRC_ALPHA),

                            //tGL.enable(tGL.SCISSOR_TEST);
                            //tGL.scissor(0, 0,  tCvsW, tCvsH);

                            // 라이팅 세팅
                            tColor = tCamera.backgroundColor,
                            tGL.clearColor(tColor[0], tColor[1], tColor[2], tColor[3]),
                            tGL.clear(tGL.COLOR_BUFFER_BIT | tGL.DEPTH_BUFFER_BIT);
                            var tProjectionMtx = tCamera.projectionMatrix.raw;
                            var tCameraMtx = tCamera.matrix.raw;
                            for (k in tGPU.programs) {
                                tProgram = tGPU.programs[k],
                                tGL.useProgram(tProgram),
                                tGL.uniformMatrix4fv(tProgram.uPixelMatrix, false, tProjectionMtx),
                                tGL.uniformMatrix4fv(tProgram.uCameraMatrix, false, tCameraMtx);
                                if(tProgram['uDLite']) {
                                    tGL.uniform3fv(tProgram.uDLite, baseLightRotate);
                                }
                            }
                            tItem = tMaterial = tProgram = tVBO = tIBO = null;

                            // 대상 씬의 차일드 루프
                            i2 = tChildrenArray.length;
                            while(i2--){
                                tItem = tChildrenArray[i2],
                                tItemUUID = tItem.uuid,
                                tGeo = priGeo[tItemUUID].uuid,
                                tVBO = tGPU.vbo[tGeo],
                                tVNBO = tGPU.vnbo[tGeo],
                                tUVBO = tGPU.uvbo[tGeo],
                                tIBO = tGPU.ibo[tGeo],
                                tMaterial = priMat[tItemUUID],
                                tCulling = priCull[tItemUUID];

                                if (tCulling != pCulling) {
                                    if (tCulling == Mesh.cullingNone) tGL.disable(tGL.CULL_FACE);
                                    else if (tCulling == Mesh.cullingBack) tGL.enable(tGL.CULL_FACE), tGL.frontFace(tGL.CCW);
                                    else if (tCulling == Mesh.cullingFront) tGL.enable(tGL.CULL_FACE), tGL.frontFace(tGL.CW);
                                }

                                useNormalBuffer = 0,
                                useTexture = 0;

                                // 쉐이딩 결정
                                tMatUUID = tMaterial.uuid,
                                tShading = priMatShading[tMatUUID];
                                if(priMatDiffuse[tMatUUID]){
                                    useTexture = 1;
                                }
                                switch (tShading) {
                                    case  Shading.none:
                                        if(useTexture){
                                            tProgram = tGPU.programs['bitmap'];
                                        }else{
                                            tProgram = tGPU.programs['color'];
                                        }
                                        break;
                                    case  Shading.gouraud:
                                        if(useTexture){
                                            tProgram = tGPU.programs['bitmapGouraud'];
                                        }else{
                                            tProgram = tGPU.programs['colorGouraud'];
                                        }
                                        useNormalBuffer = 1;
                                        break;
                                    case  Shading.toon:
                                        tProgram = tGPU.programs['toonPhong'];
                                        useNormalBuffer = 1;
                                        break;
                                    case  Shading.phong :
                                        if (useTexture) {
                                            tProgram = tGPU.programs['bitmapPhong'];
                                        } else {
                                            tProgram = tGPU.programs['colorPhong'];
                                        }
                                        useNormalBuffer = 1;
                                        break;
                                    case  Shading.blinn :
                                        tProgram = tGPU.programs['bitmapBlinn'],
                                        //console.log('들어왔다!')
                                        useNormalBuffer = 1;
                                        break;
                                }
                                // 쉐이딩 변경시 캐쉬 삭제
                                if (pProgram != tProgram) {
                                    pProgram = null , pVBO = null, pVNBO = null, pUVBO = null, pIBO = null,
                                    tGL.useProgram(tProgram);
                                }

                                // 정보 밀어넣기
                                if (tVBO != pVBO) {
                                    tGL.bindBuffer(tGL.ARRAY_BUFFER, tVBO),
                                    tGL.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, tGL.FLOAT, false, 0, 0);
                                }
                                tColor = priMatColor[tMatUUID],
                                tGL.uniform4fv(tProgram.uColor, tColor);
                                if (useNormalBuffer) {
                                    if (tVNBO != pVNBO) {
                                        tGL.bindBuffer(tGL.ARRAY_BUFFER, tVNBO),
                                        tGL.vertexAttribPointer(tProgram.aVertexNormal, tVNBO.stride, tGL.FLOAT, false, 0, 0);
                                    }
                                    tGL.uniform1f(tProgram.uLambert, priMatLambert[tMatUUID]);
                                }
                                // 텍스쳐 세팅
                                if (useTexture) {
                                    if (tUVBO != pUVBO) {
                                        tGL.bindBuffer(tGL.ARRAY_BUFFER, tUVBO),
                                        tGL.vertexAttribPointer(tProgram.aUV, tUVBO.stride, tGL.FLOAT, false, 0, 0);
                                    }
                                    var imsi = priMatDiffuse[tMatUUID];
                                    if (imsi.length) {
                                        //tGL.activeTexture(tGL.TEXTURE0);
                                        tDiffuseID = tGPU.textures[imsi[imsi.length - 1].tex.uuid];
                                        if (tDiffuseID != pDiffuseID) {
                                            tGL.bindTexture(tGL.TEXTURE_2D, tDiffuseID);
                                        }
                                        tGL.uniform1i(tProgram.uSampler, 0);
                                    }
                                }

                                f3[0] = tItem.rotateX, f3[1] = tItem.rotateY, f3[2] = tItem.rotateZ,
                                tGL.uniform3fv(tProgram.uRotate, f3),
                                f3[0] = tItem.x, f3[1] = tItem.y, f3[2] = tItem.z,
                                tGL.uniform3fv(tProgram.uPosition, f3),
                                f3[0] = tItem.scaleX, f3[1] = tItem.scaleY, f3[2] = tItem.scaleZ,
                                tGL.uniform3fv(tProgram.uScale, f3),
                                tIBO != pIBO ? tGL.bindBuffer(tGL.ELEMENT_ARRAY_BUFFER, tIBO) : 0,
                                tGL.drawElements(tGL.TRIANGLES, tIBO.numItem, tGL.UNSIGNED_SHORT, 0);

                                //와이어프레임 그리기
                                if (priMatWireFrame[tMatUUID]) {
                                    tGL.enable(tGL.DEPTH_TEST),
                                    tGL.depthFunc(tGL.LEQUAL),
                                    tProgram = tGPU.programs['wireFrame'],
                                    tGL.useProgram(tProgram),
                                    tVBO != pVBO ? tGL.bindBuffer(tGL.ARRAY_BUFFER, tVBO) : 0,
                                    tVBO != pVBO ? tGL.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, tGL.FLOAT, false, 0, 0) : 0,
                                    f3[0] = tItem.rotateX, f3[1] = tItem.rotateY, f3[2] = tItem.rotateZ,
                                    tGL.uniform3fv(tProgram.uRotate, f3),
                                    f3[0] = tItem.x, f3[1] = tItem.y, f3[2] = tItem.z,
                                    tGL.uniform3fv(tProgram.uPosition, f3),
                                    f3[0] = tItem.scaleX, f3[1] = tItem.scaleY, f3[2] = tItem.scaleZ,
                                    tGL.uniform3fv(tProgram.uScale, f3),
                                    tColor = priMatWireFrameColor[tMatUUID],
                                    tGL.uniform4fv(tProgram.uColor, tColor),
                                    tGL.drawElements(tGL.LINES, tIBO.numItem, tGL.UNSIGNED_SHORT, 0),
                                    tGL.enable(tGL.DEPTH_TEST), tGL.depthFunc(tGL.LESS);
                                }

                                pProgram = tProgram , pCulling = tCulling,
                                pVBO = tVBO, pVNBO = tVNBO, pUVBO = tUVBO, pIBO = tIBO, pDiffuseID = tDiffuseID;
                            }
                            //gl.bindTexture(gl.TEXTURE_2D, scene._glFREAMBUFFERs[camera.uuid].texture);
                            //gl.bindTexture(gl.TEXTURE_2D, null);
                            if (len > 1) {
                                tGL.bindFramebuffer(tGL.FRAMEBUFFER, null);
                                pProgram = null , pVBO = null, pVNBO = null, pUVBO = null, pIBO = null;
                            }

                        }
                    }
                }
                // TODO 아래는 아직 다 못옮겨씀
                // 프레임버퍼를 모아서 찍어!!!
                if (len > 1) {
                    tGL.viewport(0, 0, tCvs.width, tCvs.height);
                    tGL.clearColor(0, 0, 0, 1);
                    tGL.enable(tGL.DEPTH_TEST), tGL.depthFunc(tGL.LEQUAL);
                    //tGL.disable(tGL.DEPTH_TEST);
                    tGL.enable(tGL.BLEND);
                    tGL.blendFunc(tGL.SRC_ALPHA, tGL.ONE_MINUS_SRC_ALPHA);
                    tGL.clear(tGL.COLOR_BUFFER_BIT | tGL.DEPTH_BUFFER_BIT);
                    tVBO = tGPU.vbo['_FRAMERECT_'],
                    tUVBO = tGPU.uvbo['_FRAMERECT_'],
                    tIBO = tGPU.ibo['_FRAMERECT_'],
                    tProgram = tGPU.programs['postBase'];
                    if (!tVBO) return;
                    tGL.useProgram(tProgram);
                    tGL.uniformMatrix4fv(tProgram.uPixelMatrix, false, [
                        2 / tCvs.clientWidth, 0, 0, 0,
                        0, -2 / tCvs.clientHeight, 0, 0,
                        0, 0, 0, 0,
                        -1, 1, 0, 1
                    ]);
                    tGL.bindBuffer(tGL.ARRAY_BUFFER, tVBO),
                    tGL.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, tGL.FLOAT, false, 0, 0),
                    tGL.bindBuffer(tGL.ARRAY_BUFFER, tUVBO),
                    tGL.vertexAttribPointer(tProgram.aUV, tUVBO.stride, tGL.FLOAT, false, 0, 0),
                    tGL.uniform3fv(tProgram.uRotate, [0, 0, 0]),
                    tGL.uniformMatrix4fv(tProgram.uCameraMatrix, false, rectMatrix.raw);

                    for (k in tCameraList) {
                        tCamera = tCameraList[k];
                        if (tCamera.visible) {
                            tFrameBuffer = tGPU.framebuffers[tCamera.uuid].frameBuffer;
                            tGL.uniform1i(tProgram.uFXAA, tCamera.antialias);
                            if (tCamera.antialias) {
                                if (tCamera.renderArea) tGL.uniform2fv(tProgram.uTexelSize, [1 / tFrameBuffer.width, 1 / tFrameBuffer.height]);
                                else tGL.uniform2fv(tProgram.uTexelSize, [1 / tCvs.width, 1 / tCvs.height]);
                            }
                            f3[0] = tFrameBuffer.x + tFrameBuffer.width / 2 / window.devicePixelRatio, f3[1] = tFrameBuffer.y + tFrameBuffer.height / 2 / window.devicePixelRatio , f3[2] = 0;
                            tGL.uniform3fv(tProgram.uPosition, f3),
                            f3[0] = tFrameBuffer.width / 2 / window.devicePixelRatio, f3[1] = tFrameBuffer.height / 2 / window.devicePixelRatio, f3[2] = 1,
                            tGL.uniform3fv(tProgram.uScale, f3),
                            //tGL.activeTexture(tGL.TEXTURE0),
                            tGL.bindTexture(tGL.TEXTURE_2D, tGPU.framebuffers[tCamera.uuid].texture),
                            tGL.uniform1i(tProgram.uSampler, 0),
                            tGL.bindBuffer(tGL.ELEMENT_ARRAY_BUFFER, tIBO),
                            tGL.drawElements(tGL.TRIANGLES, tIBO.numItem, tGL.UNSIGNED_SHORT, 0);
                        }
                    }

                }
                this.dispatch(World.renderAfter, currentTime);
                //tGL.flush();
                //tGL.finish()
            }
        })()
    })
    .constant('renderBefore', {
        description:'renderBefore constant',
        sample:[
            "world.addEventListener(World.renderBefore, function() {",
            "   //job",
            "});"
        ],
        value:'WORLD_RENDER_BEFORE'
    })
    .constant('renderAfter', {
        description:'renderAfter constant',
        sample:[
            "world.addEventListener(World.renderAfter, function () {",
            "   //job",
            "});"
        ],
        value:'WORLD_RENDER_AFTER'
    })
    .build();
})(makeUtil);

window['MoGL'] = MoGL;
} )();
if (this.hasOwnProperty('exports')) exports.mogl = MoGL;