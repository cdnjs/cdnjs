(function(root, factory) {
//  if(typeof exports === 'object' && typeof module === 'object')
//    factory(require("Bokeh"));
//  else if(typeof define === 'function' && define.amd)
//    define(["Bokeh"], factory);
//  else if(typeof exports === 'object')
//    factory(require("Bokeh"));
//  else
    factory(root["Bokeh"]);
})(this, function(Bokeh) {
  var define;
  return (function(modules, aliases, entry) {
    if (Bokeh != null) {
      return Bokeh.register_plugin(modules, aliases, entry);
    } else {
      throw new Error("Cannot find Bokeh. You have to load it prior to loading plugins.");
    }
  })
({
423: /*models/glyphs/webgl/base*/
function _(require, module, exports) {
    // This module implements the Base GL Glyph and some utilities
    var color_1 = require(26    /* core/util/color */);
    var BaseGLGlyph = function () {
        function BaseGLGlyph(gl, glyph) {
            this.gl = gl;
            this.glyph = glyph;
            this.nvertices = 0;
            this.size_changed = false;
            this.data_changed = false;
            this.visuals_changed = false;
            this.init();
        }
        BaseGLGlyph.prototype.set_data_changed = function (n) {
            if (n !== this.nvertices) {
                this.nvertices = n;
                this.size_changed = true;
            }
            return this.data_changed = true;
        };
        BaseGLGlyph.prototype.set_visuals_changed = function () {
            return this.visuals_changed = true;
        };
        BaseGLGlyph.prototype.render = function (ctx, indices, mainglyph) {
            var dx, dy, sx, sy, trans, wx, wy;
            // Get transform
            wx = wy = 1;
            // Weights to scale our vectors
            _a = this.glyph.renderer.map_to_screen([
                0 * wx,
                1 * wx,
                2 * wx
            ], [
                0 * wy,
                1 * wy,
                2 * wy
            ]), dx = _a[0], dy = _a[1];
            // Try again, but with weighs so we're looking at ~100 in screen coordinates
            wx = 100 / Math.min(Math.max(Math.abs(dx[1] - dx[0]), 1e-12), 1000000000000);
            wy = 100 / Math.min(Math.max(Math.abs(dy[1] - dy[0]), 1e-12), 1000000000000);
            _b = this.glyph.renderer.map_to_screen([
                0 * wx,
                1 * wx,
                2 * wx
            ], [
                0 * wy,
                1 * wy,
                2 * wy
            ]), dx = _b[0], dy = _b[1];
            // Test how linear it is
            if (Math.abs(dx[1] - dx[0] - (dx[2] - dx[1])) > 0.000001 || Math.abs(dy[1] - dy[0] - (dy[2] - dy[1])) > 0.000001) {
                return false;
            }
            _c = [
                (dx[1] - dx[0]) / wx,
                (dy[1] - dy[0]) / wy
            ], sx = _c[0], sy = _c[1];
            trans = {
                pixel_ratio: ctx.pixel_ratio,
                width: ctx.glcanvas.width,
                height: ctx.glcanvas.height,
                dx: dx[0] / sx,
                dy: dy[0] / sy,
                sx: sx,
                sy: sy
            };
            this.draw(indices, mainglyph, trans);
            return true;
            // success
            var _a, _b, _c;
        };
        return BaseGLGlyph;
    }();
    exports.BaseGLGlyph = BaseGLGlyph;
    ;
    BaseGLGlyph.prototype.GLYPH = '';
    // name of the glyph that this gl-glyph applies to
    BaseGLGlyph.prototype.VERT = '';
    BaseGLGlyph.prototype.FRAG = '';
    exports.line_width = function (width) {
        // Increase small values to make it more similar to canvas
        if (width < 2) {
            width = Math.sqrt(width * 2);
        }
        return width;
    };
    exports.fill_array_with_float = function (n, val) {
        var a, i, k, ref;
        a = new Float32Array(n);
        for (i = k = 0, ref = n; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
            a[i] = val;
        }
        return a;
    };
    exports.fill_array_with_vec = function (n, m, val) {
        var a, i, j, k, l, ref, ref1;
        a = new Float32Array(n * m);
        for (i = k = 0, ref = n; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
            for (j = l = 0, ref1 = m; 0 <= ref1 ? l < ref1 : l > ref1; j = 0 <= ref1 ? ++l : --l) {
                a[i * m + j] = val[j];
            }
        }
        return a;
    };
    exports.visual_prop_is_singular = function (visual, propname) {
        // This touches the internals of the visual, so we limit use in this function
        // See renderer.coffee:cache_select() for similar code
        return visual[propname].spec.value !== void 0;
    };
    exports.attach_float = function (prog, vbo, att_name, n, visual, name) {
        var a;
        // Attach a float attribute to the program. Use singleton value if we can,
        // otherwise use VBO to apply array.
        if (!visual.doit) {
            vbo.used = false;
            return prog.set_attribute(att_name, 'float', [0]);
        } else if (exports.visual_prop_is_singular(visual, name)) {
            vbo.used = false;
            return prog.set_attribute(att_name, 'float', visual[name].value());
        } else {
            vbo.used = true;
            a = new Float32Array(visual.cache[name + '_array']);
            vbo.set_size(n * 4);
            vbo.set_data(0, a);
            return prog.set_attribute(att_name, 'float', vbo);
        }
    };
    exports.attach_color = function (prog, vbo, att_name, n, visual, prefix) {
        var a, alphaname, alphas, colorname, colors, i, j, k, l, m, ref, ref1, rgba;
        // Attach the color attribute to the program. If there's just one color,
        // then use this single color for all vertices (no VBO). Otherwise we
        // create an array and upload that to the VBO, which we attahce to the prog.
        m = 4;
        colorname = prefix + '_color';
        alphaname = prefix + '_alpha';
        if (!visual.doit) {
            // Don't draw (draw transparent)
            vbo.used = false;
            return prog.set_attribute(att_name, 'vec4', [
                0,
                0,
                0,
                0
            ]);
        } else if (exports.visual_prop_is_singular(visual, colorname) && exports.visual_prop_is_singular(visual, alphaname)) {
            // Nice and simple; both color and alpha are singular
            vbo.used = false;
            rgba = color_1.color2rgba(visual[colorname].value(), visual[alphaname].value());
            return prog.set_attribute(att_name, 'vec4', rgba);
        } else {
            // Use vbo; we need an array for both the color and the alpha
            vbo.used = true;
            // Get array of colors
            if (exports.visual_prop_is_singular(visual, colorname)) {
                colors = function () {
                    var k, ref, results;
                    results = [];
                    for (i = k = 0, ref = n; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
                        results.push(visual[colorname].value());
                    }
                    return results;
                }();
            } else {
                colors = visual.cache[colorname + '_array'];
            }
            // Get array of alphas
            if (exports.visual_prop_is_singular(visual, alphaname)) {
                alphas = exports.fill_array_with_float(n, visual[alphaname].value());
            } else {
                alphas = visual.cache[alphaname + '_array'];
            }
            // Create array of rgbs
            a = new Float32Array(n * m);
            for (i = k = 0, ref = n; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
                rgba = color_1.color2rgba(colors[i], alphas[i]);
                for (j = l = 0, ref1 = m; 0 <= ref1 ? l < ref1 : l > ref1; j = 0 <= ref1 ? ++l : --l) {
                    a[i * m + j] = rgba[j];
                }
            }
            // Attach vbo
            vbo.set_size(n * m * 4);
            vbo.set_data(0, a);
            return prog.set_attribute(att_name, 'vec4', vbo);
        }
    };    
},
424: /*models/glyphs/webgl/gloo2*/
function _(require, module, exports) {
    /* Do not edit, autogenerated by flexx.pyscript */
    var _pyfunc_add = function (a, b) {
        if (Array.isArray(a) && Array.isArray(b)) {
            return a.concat(b);
        }
        return a + b;
    };
    var _pyfunc_all = function (x) {
        for (var i = 0; i < x.length; i++) {
            if (!_pyfunc_truthy(x[i])) {
                return false;
            }
        }
        return true;
    };
    var _pyfunc_contains = function contains(a, b) {
        if (b == null) {
        } else if (Array.isArray(b)) {
            for (var i = 0; i < b.length; i++) {
                if (_pyfunc_equals(a, b[i]))
                    return true;
            }
            return false;
        } else if (b.constructor === Object) {
            for (var k in b) {
                if (a == k)
                    return true;
            }
            return false;
        } else if (b.constructor == String) {
            return b.indexOf(a) >= 0;
        }
        var e = Error('Not a container: ' + b);
        e.name = 'TypeError';
        throw e;
    };
    var _pyfunc_equals = function equals(a, b) {
        if (a == null || b == null) {
        } else if (Array.isArray(a) && Array.isArray(b)) {
            var i = 0, iseq = a.length == b.length;
            while (iseq && i < a.length) {
                iseq = equals(a[i], b[i]);
                i += 1;
            }
            return iseq;
        } else if (a.constructor === Object && b.constructor === Object) {
            var akeys = Object.keys(a), bkeys = Object.keys(b);
            akeys.sort();
            bkeys.sort();
            var i = 0, k, iseq = equals(akeys, bkeys);
            while (iseq && i < akeys.length) {
                k = akeys[i];
                iseq = equals(a[k], b[k]);
                i += 1;
            }
            return iseq;
        }
        return a == b;
    };
    var _pyfunc_instantiate = function (ob, args) {
        if (typeof ob === 'undefined' || typeof window !== 'undefined' && window === ob || typeof global !== 'undefined' && global === ob) {
            throw 'Class constructor is called as a function.';
        }
        for (var name in ob) {
            if (Object[name] === undefined && typeof ob[name] === 'function' && !ob[name].nobind) {
                ob[name] = ob[name].bind(ob);
            }
        }
        if (ob.__init__) {
            ob.__init__.apply(ob, args);
        }
    };
    var _pyfunc_mult = function (a, b) {
        if ((typeof a === 'number') + (typeof b === 'number') === 1) {
            if (a.constructor === String)
                return _pymeth_repeat.call(a, b);
            if (b.constructor === String)
                return _pymeth_repeat.call(b, a);
            if (Array.isArray(b)) {
                var t = a;
                a = b;
                b = t;
            }
            if (Array.isArray(a)) {
                var res = [];
                for (var i = 0; i < b; i++)
                    res = res.concat(a);
                return res;
            }
        }
        return a * b;
    };
    var _pyfunc_range = function (start, end, step) {
        var i, res = [];
        var val = start;
        var n = (end - start) / step;
        for (i = 0; i < n; i++) {
            res.push(val);
            val += step;
        }
        return res;
    };
    var _pyfunc_truthy = function (v) {
        if (v === null || typeof v !== 'object') {
            return v;
        } else if (v.length !== undefined) {
            return v.length ? v : false;
        } else if (v.byteLength !== undefined) {
            return v.byteLength ? v : false;
        } else if (v.constructor !== Object) {
            return true;
        } else {
            return Object.getOwnPropertyNames(v).length ? v : false;
        }
    };
    var _pymeth_append = function (x) {
        if (!Array.isArray(this))
            return this.append.apply(this, arguments);
        this.push(x);
    };
    var _pymeth_get = function (key, d) {
        if (this.constructor !== Object)
            return this.get.apply(this, arguments);
        if (this[key] !== undefined) {
            return this[key];
        } else if (d !== undefined) {
            return d;
        } else {
            return null;
        }
    };
    var _pymeth_keys = function () {
        if (typeof this['keys'] === 'function')
            return this.keys.apply(this, arguments);
        return Object.keys(this);
    };
    var _pymeth_lstrip = function (chars) {
        if (this.constructor !== String)
            return this.lstrip.apply(this, arguments);
        chars = chars === undefined ? ' \t\r\n' : chars;
        for (var i = 0; i < this.length; i++) {
            if (chars.indexOf(this[i]) < 0)
                return this.slice(i);
        }
        return '';
    };
    var _pymeth_remove = function (x) {
        if (!Array.isArray(this))
            return this.remove.apply(this, arguments);
        for (var i = 0; i < this.length; i++) {
            if (_pyfunc_equals(this[i], x)) {
                this.splice(i, 1);
                return;
            }
        }
        var e = Error(x);
        e.name = 'ValueError';
        throw e;
    };
    var _pymeth_repeat = function (count) {
        if (this.repeat)
            return this.repeat(count);
        if (count < 1)
            return '';
        var result = '', pattern = this.valueOf();
        while (count > 1) {
            if (count & 1)
                result += pattern;
            count >>= 1, pattern += pattern;
        }
        return result + pattern;
    };
    var _pymeth_startswith = function (x) {
        if (this.constructor !== String)
            return this.startswith.apply(this, arguments);
        return this.indexOf(x) == 0;
    };
    var Buffer, GlooObject, IndexBuffer, Program, Texture2D, Texture3DLike, VertexBuffer, __version__, check_error, console;
    // PyScript module for gloo2.js - lightweight object oriented GL.
    {
        console = window.console;
    }
    __version__ = '0.3';
    check_error = function (gl, when) {
        var e, err, err_3, errors, msg, stub1_seq, stub2_itr;
        when = when === undefined ? 'periodic check' : when;
        // Check this from time to time to detect GL errors.
        //
        //     Parameters
        //     ----------
        //     when : str
        //         Shown in the exception to help the developer determine when
        //         this check was done.
        errors = [];
        while (true) {
            err = gl.getError();
            if (_pyfunc_equals(err, gl.NO_ERROR) || _pyfunc_truthy(errors) && _pyfunc_equals(err, errors[errors.length - 1])) {
                break;
            }
            _pymeth_append.call(errors, err);
        }
        if (errors.length) {
            msg = '';
            stub1_seq = errors;
            if (typeof stub1_seq === 'object' && !Array.isArray(stub1_seq)) {
                stub1_seq = Object.keys(stub1_seq);
            }
            for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
                e = stub1_seq[stub2_itr];
                msg = _pyfunc_add(msg, e);
            }
            err_3 = new Error('RuntimeError:' + ('OpenGL got errors (' + when + '): ' + msg + ''));
            err_3.name = 'RuntimeError';
            throw err_3;
        }
        return null;
    };
    GlooObject = function () {
        // Abstract base class for all Gloo classes.
        _pyfunc_instantiate(this, arguments);
    };
    GlooObject.prototype._base_class = Object;
    GlooObject.prototype._class_name = 'GlooObject';
    GlooObject.prototype.__init__ = function (gl) {
        // Init by passing the webgl context object.
        this._gl = gl;
        this.handle = null;
        this._create();
        if (!(this.handle !== null)) {
            throw 'AssertionError: ' + 'this.handle !== null';
        }
        return null;
    };
    GlooObject.prototype._create = function () {
        var err_2;
        err_2 = new Error('NotImplementedError:' + '');
        err_2.name = 'NotImplementedError';
        throw err_2;
        return null;
    };
    Program = function () {
        // The program is the central component to connect gloo objects and shaders.
        _pyfunc_instantiate(this, arguments);
    };
    Program.prototype = Object.create(GlooObject.prototype);
    Program.prototype._base_class = GlooObject.prototype;
    Program.prototype._class_name = 'Program';
    Program.prototype.UTYPEMAP = {
        'float': 'uniform1fv',
        'vec2': 'uniform2fv',
        'vec3': 'uniform3fv',
        'vec4': 'uniform4fv',
        'int': 'uniform1iv',
        'ivec2': 'uniform2iv',
        'ivec3': 'uniform3iv',
        'ivec4': 'uniform4iv',
        'bool': 'uniform1iv',
        'bvec2': 'uniform2iv',
        'bvec3': 'uniform3iv',
        'bvec4': 'uniform4iv',
        'mat2': 'uniformMatrix2fv',
        'mat3': 'uniformMatrix3fv',
        'mat4': 'uniformMatrix4fv',
        'sampler1D': 'uniform1i',
        'sampler2D': 'uniform1i',
        'sampler3D': 'uniform1i'
    };
    Program.prototype.ATYPEMAP = {
        'float': 'vertexAttrib1f',
        'vec2': 'vertexAttrib2f',
        'vec3': 'vertexAttrib3f',
        'vec4': 'vertexAttrib4f'
    };
    Program.prototype.ATYPEINFO = {
        'float': [
            1,
            5126
        ],
        'vec2': [
            2,
            5126
        ],
        'vec3': [
            3,
            5126
        ],
        'vec4': [
            4,
            5126
        ]
    };
    Program.prototype._create = function () {
        this.handle = this._gl.createProgram();
        this.locations = {};
        this._unset_variables = [];
        this._validated = false;
        this._samplers = {};
        this._attributes = {};
        this._known_invalid = [];
        return null;
    };
    Program.prototype.delete = function () {
        // Delete the program.
        this._gl.deleteProgram(this.handle);
        return null;
    };
    Program.prototype.activate = function () {
        // Activate the program.
        this._gl.useProgram(this.handle);
        return null;
    };
    Program.prototype.deactivate = function () {
        // Disable the program.
        this._gl.useProgram(0);
        return null;
    };
    Program.prototype.set_shaders = function (vert, frag) {
        var code, err_3, err_4, errors, frag_handle, gl, handle, i, status, stub3_, tmp, type_, vert_handle;
        // Set GLSL code for the vertex and fragment shader.
        //
        // This function takes care of setting the shading code and
        // compiling+linking it into a working program object that is ready
        // to use.
        //
        // Parameters
        // ----------
        // vert : str
        //     GLSL code for the vertex shader.
        // frag : str
        //     GLSL code for the fragment shader.
        gl = this._gl;
        this._linked = false;
        vert_handle = gl.createShader(gl.VERTEX_SHADER);
        frag_handle = gl.createShader(gl.FRAGMENT_SHADER);
        tmp = [
            [
                vert,
                vert_handle,
                'vertex'
            ],
            [
                frag,
                frag_handle,
                'fragment'
            ]
        ];
        for (i = 0; i < 2; i += 1) {
            stub3_ = tmp[i];
            code = stub3_[0];
            handle = stub3_[1];
            type_ = stub3_[2];
            gl.shaderSource(handle, code);
            gl.compileShader(handle);
            status = gl.getShaderParameter(handle, gl.COMPILE_STATUS);
            if (!_pyfunc_truthy(status)) {
                errors = gl.getShaderInfoLog(handle);
                err_4 = new Error('RuntimeError:' + _pyfunc_add('errors in ' + type_ + ' shader:\n', errors));
                err_4.name = 'RuntimeError';
                throw err_4;
            }
        }
        gl.attachShader(this.handle, vert_handle);
        gl.attachShader(this.handle, frag_handle);
        gl.linkProgram(this.handle);
        if (!_pyfunc_truthy(gl.getProgramParameter(this.handle, gl.LINK_STATUS))) {
            err_3 = new Error('RuntimeError:' + ('Program link error:\n' + gl.getProgramInfoLog(this.handle)));
            err_3.name = 'RuntimeError';
            throw err_3;
        }
        this._unset_variables = this._get_active_attributes_and_uniforms();
        gl.detachShader(this.handle, vert_handle);
        gl.detachShader(this.handle, frag_handle);
        gl.deleteShader(vert_handle);
        gl.deleteShader(frag_handle);
        this._known_invalid = [];
        this._linked = true;
        return null;
    };
    Program.prototype._get_active_attributes_and_uniforms = function () {
        var attributes, ca, container, count, cu, getActive, getLocation, gl, i, info, j, m, name, regex, stub4_, stub5_seq, stub6_itr, uniforms, x;
        // Retrieve active attributes and uniforms to be able to check that
        // all uniforms/attributes are set by the user.
        gl = this._gl;
        this.locations = {};
        regex = new window.RegExp('(\\w+)\\s*(\\[(\\d+)\\])\\s*');
        cu = gl.getProgramParameter(this.handle, gl.ACTIVE_UNIFORMS);
        ca = gl.getProgramParameter(this.handle, gl.ACTIVE_ATTRIBUTES);
        attributes = [];
        uniforms = [];
        stub5_seq = [
            [
                attributes,
                ca,
                gl.getActiveAttrib,
                gl.getAttribLocation
            ],
            [
                uniforms,
                cu,
                gl.getActiveUniform,
                gl.getUniformLocation
            ]
        ];
        if (typeof stub5_seq === 'object' && !Array.isArray(stub5_seq)) {
            stub5_seq = Object.keys(stub5_seq);
        }
        for (stub6_itr = 0; stub6_itr < stub5_seq.length; stub6_itr += 1) {
            x = stub5_seq[stub6_itr];
            stub4_ = x;
            container = stub4_[0];
            count = stub4_[1];
            getActive = stub4_[2];
            getLocation = stub4_[3];
            for (i = 0; i < count; i += 1) {
                info = getActive.call(gl, this.handle, i);
                name = info.name;
                m = name.match(regex);
                if (_pyfunc_truthy(m)) {
                    name = m[1];
                    for (j = 0; j < info.size; j += 1) {
                        _pymeth_append.call(container, [
                            '' + name + '[' + j + ']',
                            info.type
                        ]);
                    }
                } else {
                    _pymeth_append.call(container, [
                        name,
                        info.type
                    ]);
                }
                this.locations[name] = getLocation.call(gl, this.handle, name);
            }
        }
        return _pyfunc_add(function list_comprehenson() {
            var res = [];
            var v, iter0, i0;
            iter0 = attributes;
            if (typeof iter0 === 'object' && !Array.isArray(iter0)) {
                iter0 = Object.keys(iter0);
            }
            for (i0 = 0; i0 < iter0.length; i0++) {
                v = iter0[i0];
                {
                    res.push(v[0]);
                }
            }
            return res;
        }.apply(this), function list_comprehenson() {
            var res = [];
            var v, iter0, i0;
            iter0 = uniforms;
            if (typeof iter0 === 'object' && !Array.isArray(iter0)) {
                iter0 = Object.keys(iter0);
            }
            for (i0 = 0; i0 < iter0.length; i0++) {
                v = iter0[i0];
                {
                    res.push(v[0]);
                }
            }
            return res;
        }.apply(this));
    };
    Program.prototype.set_texture = function (name, value) {
        var err_3, handle, unit;
        // Set a texture sampler.
        //
        // A texture is a 2 dimensional grid of colors/intensities that
        // can be applied to a face (or used for other means by providing
        // a regular grid of data).
        //
        // Parameters
        // ----------
        // name : str
        //     The name by which the texture is known in the GLSL code.
        // value : Texture2D
        //     The gloo Texture2D object to bind.
        if (!_pyfunc_truthy(this._linked)) {
            err_3 = new Error('RuntimeError:' + 'Cannot set uniform when program has no code');
            err_3.name = 'RuntimeError';
            throw err_3;
        }
        handle = _pymeth_get.call(this.locations, name, -1);
        if (_pyfunc_truthy(handle < 0)) {
            if (!_pyfunc_contains(name, this._known_invalid)) {
                _pymeth_append.call(this._known_invalid, name);
                console.log('Variable ' + name + ' is not an active texture');
            }
            return null;
        }
        if (_pyfunc_contains(name, this._unset_variables)) {
            _pymeth_remove.call(this._unset_variables, name);
        }
        this.activate();
        if (true) {
            unit = _pymeth_keys.call(this._samplers).length;
            if (_pyfunc_contains(name, this._samplers)) {
                unit = this._samplers[name][this._samplers[name].length - 1];
            }
            this._samplers[name] = [
                value._target,
                value.handle,
                unit
            ];
            this._gl.uniform1i(handle, unit);
        }
        return null;
    };
    Program.prototype.set_uniform = function (name, type_, value) {
        var a_type, count, err_3, funcname, handle, j, name_;
        // Set a uniform value.
        //
        // A uniform is a value that is global to both the vertex and
        // fragment shader.
        //
        // Parameters
        // ----------
        // name : str
        //     The name by which the uniform is known in the GLSL code.
        // type_ : str
        //     The type of the uniform, e.g. 'float', 'vec2', etc.
        // value : list of scalars
        //     The value for the uniform. Should be a list even for type float.
        if (!_pyfunc_truthy(this._linked)) {
            err_3 = new Error('RuntimeError:' + 'Cannot set uniform when program has no code');
            err_3.name = 'RuntimeError';
            throw err_3;
        }
        handle = _pymeth_get.call(this.locations, name, -1);
        if (_pyfunc_truthy(handle < 0)) {
            if (!_pyfunc_contains(name, this._known_invalid)) {
                _pymeth_append.call(this._known_invalid, name);
                console.log('Variable ' + name + ' is not an active uniform');
            }
            return null;
        }
        if (_pyfunc_contains(name, this._unset_variables)) {
            _pymeth_remove.call(this._unset_variables, name);
        }
        count = 1;
        if (!_pymeth_startswith.call(type_, 'mat')) {
            a_type = _pymeth_get.call({
                'int': 'float',
                'bool': 'float'
            }, type_, _pymeth_lstrip.call(type_, 'ib'));
            count = Math.floor(value.length / this.ATYPEINFO[a_type][0]);
        }
        if (_pyfunc_truthy(count > 1)) {
            for (j = 0; j < count; j += 1) {
                if (_pyfunc_contains('' + name + '[' + j + ']', this._unset_variables)) {
                    name_ = '' + name + '[' + j + ']';
                    if (_pyfunc_contains(name_, this._unset_variables)) {
                        _pymeth_remove.call(this._unset_variables, name_);
                    }
                }
            }
        }
        funcname = this.UTYPEMAP[type_];
        this.activate();
        if (_pymeth_startswith.call(type_, 'mat')) {
            this._gl[funcname](handle, false, value);
        } else {
            this._gl[funcname](handle, value);
        }
        return null;
    };
    Program.prototype.set_attribute = function (name, type_, value, stride, offset) {
        var args, err_3, funcname, gtype, handle, is_vbo, size, stub7_;
        stride = stride === undefined ? 0 : stride;
        offset = offset === undefined ? 0 : offset;
        // Set an attribute value.
        //
        // An attribute represents per-vertex data and can only be used
        // in the vertex shader.
        //
        // Parameters
        // ----------
        // name : str
        //     The name by which the attribute is known in the GLSL code.
        // type_ : str
        //     The type of the attribute, e.g. 'float', 'vec2', etc.
        // value : VertexBuffer, array
        //     If value is a VertexBuffer, it is used (with stride and offset)
        //     for the vertex data. If value is an array, its used to set
        //     the value of all vertices (similar to a uniform).
        // stide : int, default 0
        //     The stride to "sample" the vertex data inside the buffer. Unless
        //     multiple vertex data are packed into a single buffer, this should
        //     be zero.
        // offset : int, default 0
        //     The offset to "sample" the vertex data inside the buffer. Unless
        //     multiple vertex data are packed into a single buffer, or only
        //     a part of the data must be used, this should probably be zero.
        if (!_pyfunc_truthy(this._linked)) {
            err_3 = new Error('RuntimeError:' + 'Cannot set attribute when program has no code');
            err_3.name = 'RuntimeError';
            throw err_3;
        }
        is_vbo = value instanceof VertexBuffer;
        handle = _pymeth_get.call(this.locations, name, -1);
        if (_pyfunc_truthy(handle < 0)) {
            if (!_pyfunc_contains(name, this._known_invalid)) {
                _pymeth_append.call(this._known_invalid, name);
                if (_pyfunc_truthy(is_vbo) && _pyfunc_truthy(offset > 0)) {
                } else {
                    console.log('Variable ' + name + ' is not an active attribute');
                }
            }
            return null;
        }
        if (_pyfunc_contains(name, this._unset_variables)) {
            _pymeth_remove.call(this._unset_variables, name);
        }
        this.activate();
        if (!_pyfunc_truthy(is_vbo)) {
            funcname = this.ATYPEMAP[type_];
            this._attributes[name] = [
                0,
                handle,
                funcname,
                value
            ];
        } else {
            stub7_ = this.ATYPEINFO[type_];
            size = stub7_[0];
            gtype = stub7_[1];
            funcname = 'vertexAttribPointer';
            args = [
                size,
                gtype,
                this._gl.FALSE,
                stride,
                offset
            ];
            this._attributes[name] = [
                value.handle,
                handle,
                funcname,
                args
            ];
        }
        return null;
    };
    Program.prototype._pre_draw = function () {
        var args, attr_handle, funcname, stub10_, stub11_seq, stub8_, stub9_seq, tex_handle, tex_target, unit, vbo_handle, x;
        // Prepare for drawing.
        this.activate();
        stub9_seq = this._samplers;
        for (x in stub9_seq) {
            if (!stub9_seq.hasOwnProperty(x)) {
                continue;
            }
            x = stub9_seq[x];
            stub8_ = x;
            tex_target = stub8_[0];
            tex_handle = stub8_[1];
            unit = stub8_[2];
            this._gl.activeTexture(_pyfunc_add(this._gl.TEXTURE0, unit));
            this._gl.bindTexture(tex_target, tex_handle);
        }
        stub11_seq = this._attributes;
        for (x in stub11_seq) {
            if (!stub11_seq.hasOwnProperty(x)) {
                continue;
            }
            x = stub11_seq[x];
            stub10_ = x;
            vbo_handle = stub10_[0];
            attr_handle = stub10_[1];
            funcname = stub10_[2];
            args = stub10_[3];
            if (_pyfunc_truthy(vbo_handle)) {
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vbo_handle);
                this._gl.enableVertexAttribArray(attr_handle);
                this._gl[funcname].apply(this._gl, [].concat([attr_handle], args));
            } else {
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
                this._gl.disableVertexAttribArray(attr_handle);
                this._gl[funcname].apply(this._gl, [].concat([attr_handle], args));
            }
        }
        if (!_pyfunc_truthy(this._validated)) {
            this._validated = true;
            this._validate();
        }
        return null;
    };
    Program.prototype._validate = function () {
        var err_3;
        if (this._unset_variables.length) {
            console.log('Program has unset variables: ' + this._unset_variables + '');
        }
        this._gl.validateProgram(this.handle);
        if (!_pyfunc_truthy(this._gl.getProgramParameter(this.handle, this._gl.VALIDATE_STATUS))) {
            console.log(this._gl.getProgramInfoLog(this.handle));
            err_3 = new Error('RuntimeError:' + 'Program validation error');
            err_3.name = 'RuntimeError';
            throw err_3;
        }
        return null;
    };
    Program.prototype.draw = function (mode, selection) {
        var count, err_3, first, gtype, stub12_;
        // Draw the current visualization defined by the program.
        //
        // Parameters
        // ----------
        // mode : GL enum
        //     Can be POINTS, LINES, LINE_LOOP, LINE_STRIP, LINE_FAN, TRIANGLES
        // selection : 2-element tuple or IndexBuffer
        //     The selection to draw, specified either as (first, count) or an
        //     IndexBuffer object.
        if (!_pyfunc_truthy(this._linked)) {
            err_3 = new Error('RuntimeError:' + 'Cannot draw program if code has not been set');
            err_3.name = 'RuntimeError';
            throw err_3;
        }
        check_error(this._gl, 'before draw');
        if (_pyfunc_truthy(selection instanceof IndexBuffer)) {
            this._pre_draw();
            selection.activate();
            count = selection._buffer_size / 2;
            gtype = this._gl.UNSIGNED_SHORT;
            this._gl.drawElements(mode, count, gtype, 0);
            selection.deactivate();
        } else {
            stub12_ = selection;
            first = stub12_[0];
            count = stub12_[1];
            if (_pyfunc_truthy(count)) {
                this._pre_draw();
                this._gl.drawArrays(mode, first, count);
            }
        }
        check_error(this._gl, 'after draw');
        return null;
    };
    Buffer = function () {
        // Base buffer class for vertex data or index data.
        _pyfunc_instantiate(this, arguments);
    };
    Buffer.prototype = Object.create(GlooObject.prototype);
    Buffer.prototype._base_class = GlooObject.prototype;
    Buffer.prototype._class_name = 'Buffer';
    Buffer.prototype._target = null;
    Buffer.prototype._usage = 35048;
    Buffer.prototype._create = function () {
        this.handle = this._gl.createBuffer();
        this._buffer_size = 0;
        return null;
    };
    Buffer.prototype.delete = function () {
        // Delete the buffer.
        this._gl.deleteBuffer(this.handle);
        return null;
    };
    Buffer.prototype.activate = function () {
        // Activete the buffer.
        this._gl.bindBuffer(this._target, this.handle);
        return null;
    };
    Buffer.prototype.deactivate = function () {
        // Disable the buffer.
        this._gl.bindBuffer(this._target, null);
        return null;
    };
    Buffer.prototype.set_size = function (nbytes) {
        // Set the size of the buffer in bytes.
        //
        // Parameters
        // ----------
        // nbytes : int
        //     The number of bytes that the buffer needs to hold.
        if (!_pyfunc_equals(nbytes, this._buffer_size)) {
            this.activate();
            this._gl.bufferData(this._target, nbytes, this._usage);
            this._buffer_size = nbytes;
        }
        return null;
    };
    Buffer.prototype.set_data = function (offset, data) {
        // Set the buffer data.
        //
        // Parameters
        // ----------
        // offset : int
        //     The offset in bytes for the new data.
        // data : typed array
        //     The data to upload.
        this.activate();
        this._gl.bufferSubData(this._target, offset, data);
        return null;
    };
    VertexBuffer = function () {
        // A buffer for vertex data.
        _pyfunc_instantiate(this, arguments);
    };
    VertexBuffer.prototype = Object.create(Buffer.prototype);
    VertexBuffer.prototype._base_class = Buffer.prototype;
    VertexBuffer.prototype._class_name = 'VertexBuffer';
    VertexBuffer.prototype._target = 34962;
    IndexBuffer = function () {
        // A buffer for index data.
        _pyfunc_instantiate(this, arguments);
    };
    IndexBuffer.prototype = Object.create(Buffer.prototype);
    IndexBuffer.prototype._base_class = Buffer.prototype;
    IndexBuffer.prototype._class_name = 'IndexBuffer';
    IndexBuffer.prototype._target = 34963;
    Texture2D = function () {
        // A 2 dimensional regular grid.
        _pyfunc_instantiate(this, arguments);
    };
    Texture2D.prototype = Object.create(GlooObject.prototype);
    Texture2D.prototype._base_class = GlooObject.prototype;
    Texture2D.prototype._class_name = 'Texture2D';
    Texture2D.prototype._target = 3553;
    Texture2D.prototype._types = {
        'Int8Array': 5120,
        'Uint8Array': 5121,
        'Int16Array': 5122,
        'Uint16Array': 5123,
        'Int32Array': 5124,
        'Uint32Array': 5125,
        'Float32Array': 5126
    };
    Texture2D.prototype._create = function () {
        this.handle = this._gl.createTexture();
        this._shape_format = null;
        return null;
    };
    Texture2D.prototype.delete = function () {
        // Delete the texture.
        this._gl.deleteTexture(this.handle);
        return null;
    };
    Texture2D.prototype.activate = function () {
        // Activate the texture.
        this._gl.bindTexture(this._target, this.handle);
        return null;
    };
    Texture2D.prototype.deactivate = function () {
        // Disable the texture.
        this._gl.bindTexture(this._target, 0);
        return null;
    };
    Texture2D.prototype._get_alignment = function (width) {
        var alignment, alignments, stub13_seq, stub14_itr;
        // Determines a textures byte alignment. If the width isn't a
        //         power of 2 we need to adjust the byte alignment of the image.
        //         The image height is unimportant.
        //
        //         www.opengl.org/wiki/Common_Mistakes#Texture_upload_and_pixel_reads
        alignments = [
            4,
            8,
            2,
            1
        ];
        stub13_seq = alignments;
        if (typeof stub13_seq === 'object' && !Array.isArray(stub13_seq)) {
            stub13_seq = Object.keys(stub13_seq);
        }
        for (stub14_itr = 0; stub14_itr < stub13_seq.length; stub14_itr += 1) {
            alignment = stub13_seq[stub14_itr];
            if (_pyfunc_equals(width % alignment, 0)) {
                return alignment;
            }
        }
        return null;
    };
    Texture2D.prototype.set_wrapping = function (wrap_s, wrap_t) {
        // Set the texture wrapping mode.
        //
        // Parameters
        // ----------
        // wrap_s : GL enum
        //     The mode to wrap the x dimension. Valid values are REPEAT
        //     CLAMP_TO_EDGE MIRRORED_REPEAT
        // wrap_t : GL enum
        //     The mode to wrap the y dimension. Same options as for wrap_s.
        this.activate();
        this._gl.texParameterf(this._target, this._gl.TEXTURE_WRAP_S, wrap_s);
        this._gl.texParameterf(this._target, this._gl.TEXTURE_WRAP_T, wrap_t);
        return null;
    };
    Texture2D.prototype.set_interpolation = function (min, mag) {
        // Set the texture interpolation mode
        //
        // Parameters
        // ----------
        // min : GL enum
        //     The interpolation mode when minifying (i.e. zoomed out). Valid
        //     values are LINEAR and NEAREST.
        // max : GL enum
        //     The interpolation mode when magnifying (i.e. zoomed in). Valid
        //     values are LINEAR, NEAREST, NEAREST_MIPMAP_NEAREST,
        //     LINEAR_MIPMAP_NEAREST, NEAREST_MIPMAP_LINEAR, LINEAR_MIPMAP_LINEAR.
        this.activate();
        this._gl.texParameterf(this._target, this._gl.TEXTURE_MIN_FILTER, min);
        this._gl.texParameterf(this._target, this._gl.TEXTURE_MAG_FILTER, mag);
        return null;
    };
    Texture2D.prototype.set_size = function (shape, format) {
        var height, stub15_, width;
        // Set the size of the 2D texture.
        //
        // Parameters
        // ----------
        // shape : tuple of ints
        //     The shape of the data to upload
        // format : GL enum
        //     The format of the texture data. Can be LUMINANCE, LUMINANCE_ALPHA,
        //     RGB, and RGBA.
        stub15_ = shape;
        height = stub15_[0];
        width = stub15_[1];
        if (!_pyfunc_equals([
                height,
                width,
                format
            ], this._shape_format)) {
            this._shape_format = [
                height,
                width,
                format
            ];
            this.activate();
            this._gl.texImage2D(this._target, 0, format, width, height, 0, format, this._gl.UNSIGNED_BYTE, null);
        }
        this.u_shape = [
            height,
            width
        ];
        return null;
    };
    Texture2D.prototype.set_data = function (offset, shape, data) {
        var _, alignment, err_3, format, gtype, height, stub16_, stub17_, width, x, y;
        // Set the 2D texture data.
        //
        // Parameters
        // ----------
        // offset : tuple of ints
        //     Offset in pixels for each dimension.
        // shape : tuple of ints
        //     The shape of the data to upload
        // data : typed array
        //     The actual pixel data. Can be of any type, but on the GPU the
        //     dat is stored in 8 bit precision.
        if (_pyfunc_equals(shape.length, 2)) {
            shape = [
                shape[0],
                shape[1],
                1
            ];
        }
        this.activate();
        format = this._shape_format[2];
        stub16_ = shape;
        height = stub16_[0];
        width = stub16_[1];
        _ = stub16_[2];
        stub17_ = offset;
        y = stub17_[0];
        x = stub17_[1];
        gtype = _pymeth_get.call(this._types, data.constructor.name, null);
        if (gtype === null) {
            err_3 = new Error('ValueError:' + ('Type ' + data.constructor.name + ' not allowed for texture'));
            err_3.name = 'ValueError';
            throw err_3;
        }
        alignment = this._get_alignment(_pyfunc_mult(shape[shape.length - 2], shape[shape.length - 1]));
        if (!_pyfunc_equals(alignment, 4)) {
            this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, alignment);
        }
        this._gl.texSubImage2D(this._target, 0, x, y, width, height, format, gtype, data);
        if (!_pyfunc_equals(alignment, 4)) {
            this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, 4);
        }
        return null;
    };
    Texture3DLike = function () {
        // A 2D texture with support to simulate a 3D texture.
        //
        // To use this class, use set_size() and set_data() as if it was a 3D
        // texture. Add the GLSL_SAMPLE_NEAREST or GLSL_SAMPLE_LINEAR to the
        // shader to add the sample3D() function that can be used instead of
        // texture2D(). This function needs ``shape`` and ``tiles`` arguments
        // which can be set via uniforms, using the ``u_shape`` and ``u_tiles``
        // attributes of this object.
        _pyfunc_instantiate(this, arguments);
    };
    Texture3DLike.prototype = Object.create(Texture2D.prototype);
    Texture3DLike.prototype._base_class = Texture2D.prototype;
    Texture3DLike.prototype._class_name = 'Texture3DLike';
    Texture3DLike.prototype.GLSL_SAMPLE_NEAREST = '\n        vec4 sample3D(sampler2D tex, vec3 texcoord, vec3 shape, vec2 tiles) {\n            shape.xyz = shape.zyx;  // silly row-major convention\n            float nrows = tiles.y, ncols = tiles.x;\n            // Don\'t let adjacent frames be interpolated into this one\n            texcoord.x = min(texcoord.x * shape.x, shape.x - 0.5);\n            texcoord.x = max(0.5, texcoord.x) / shape.x;\n            texcoord.y = min(texcoord.y * shape.y, shape.y - 0.5);\n            texcoord.y = max(0.5, texcoord.y) / shape.y;\n\n            float zindex = floor(texcoord.z * shape.z);\n\n            // Do a lookup in the 2D texture\n            float u = (mod(zindex, ncols) + texcoord.x) / ncols;\n            float v = (floor(zindex / ncols) + texcoord.y) / nrows;\n\n            return texture2D(tex, vec2(u,v));\n        }\n    ';
    Texture3DLike.prototype.GLSL_SAMPLE_LINEAR = '\n        vec4 sample3D(sampler2D tex, vec3 texcoord, vec3 shape, vec2 tiles) {\n            shape.xyz = shape.zyx;  // silly row-major convention\n            float nrows = tiles.y, ncols = tiles.x;\n            // Don\'t let adjacent frames be interpolated into this one\n            texcoord.x = min(texcoord.x * shape.x, shape.x - 0.5);\n            texcoord.x = max(0.5, texcoord.x) / shape.x;\n            texcoord.y = min(texcoord.y * shape.y, shape.y - 0.5);\n            texcoord.y = max(0.5, texcoord.y) / shape.y;\n\n            float z = texcoord.z * shape.z;\n            float zindex1 = floor(z);\n            float u1 = (mod(zindex1, ncols) + texcoord.x) / ncols;\n            float v1 = (floor(zindex1 / ncols) + texcoord.y) / nrows;\n\n            float zindex2 = zindex1 + 1.0;\n            float u2 = (mod(zindex2, ncols) + texcoord.x) / ncols;\n            float v2 = (floor(zindex2 / ncols) + texcoord.y) / nrows;\n\n            vec4 s1 = texture2D(tex, vec2(u1, v1));\n            vec4 s2 = texture2D(tex, vec2(u2, v2));\n\n            return s1 * (zindex2 - z) + s2 * (z - zindex1);\n        }\n    ';
    Texture3DLike.prototype._get_tile_info = function (shape) {
        var err_3, max_size, ncols, nrows;
        max_size = this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE);
        nrows = Math.floor(max_size / shape[1]);
        nrows = Math.min(nrows, shape[0]);
        ncols = window.Math.ceil(shape[0] / nrows);
        if (_pyfunc_truthy(_pyfunc_mult(ncols, shape[2]) > max_size)) {
            err_3 = new Error('RuntimeError:' + ('Cannot fit 3D data with shape ' + shape + ' onto simulated 2D texture.'));
            err_3.name = 'RuntimeError';
            throw err_3;
        }
        return [
            nrows,
            ncols
        ];
    };
    Texture3DLike.prototype.set_size = function (shape, format) {
        var ncols, nrows, sim_shape, stub18_;
        // Set the size of the 3D texture.
        //
        // Parameters
        // ----------
        // shape : tuple of ints
        //     The shape of the data to upload
        // format : GL enum
        //     The format of the texture data. Can be LUMINANCE, LUMINANCE_ALPHA,
        //     RGB, and RGBA.
        stub18_ = this._get_tile_info(shape);
        nrows = stub18_[0];
        ncols = stub18_[1];
        sim_shape = [
            _pyfunc_mult(shape[1], nrows),
            _pyfunc_mult(shape[2], ncols)
        ];
        Texture3DLike.prototype._base_class.set_size.call(this, sim_shape, format);
        this.u_shape = [
            shape[0],
            shape[1],
            shape[2]
        ];
        this.u_tiles = [
            ncols,
            nrows
        ];
        return null;
    };
    Texture3DLike.prototype.set_data = function (offset, shape, data) {
        var Type, col, elements_per_tile, err_3, ncols, nrows, row, sim_shape, stub19_, stub20_, tile, z, zeros;
        // Set the 3D texture data.
        //
        // Parameters
        // ----------
        // offset : tuple of ints
        //     Offset in pixels for each dimension.
        // shape : tuple of ints
        //     The shape of the data to upload
        // data : typed array
        //     The actual pixel data. Can be of any type, but on the GPU the
        //     dat is stored in 8 bit precision.
        if (_pyfunc_equals(shape.length, 3)) {
            shape = [
                shape[0],
                shape[1],
                shape[2],
                1
            ];
        }
        if (!_pyfunc_all(function list_comprehenson() {
                var res = [];
                var i, iter0, i0;
                iter0 = offset;
                if (typeof iter0 === 'object' && !Array.isArray(iter0)) {
                    iter0 = Object.keys(iter0);
                }
                for (i0 = 0; i0 < iter0.length; i0++) {
                    i = iter0[i0];
                    {
                        res.push(_pyfunc_equals(i, 0));
                    }
                }
                return res;
            }.apply(this))) {
            err_3 = new Error('ValueError:' + 'Texture3DLike does not support nonzero offset (for now)');
            err_3.name = 'ValueError';
            throw err_3;
        }
        stub19_ = this._get_tile_info(shape);
        nrows = stub19_[0];
        ncols = stub19_[1];
        sim_shape = [
            _pyfunc_mult(shape[1], nrows),
            _pyfunc_mult(shape[2], ncols),
            shape[3]
        ];
        if (_pyfunc_equals(ncols, 1)) {
            Texture3DLike.prototype._base_class.set_data.call(this, [
                0,
                0
            ], sim_shape, data);
        } else {
            Type = data.constructor;
            zeros = new Type(_pyfunc_mult(_pyfunc_mult(sim_shape[0], sim_shape[1]), sim_shape[2]));
            Texture3DLike.prototype._base_class.set_data.call(this, [
                0,
                0
            ], sim_shape, zeros);
            for (z = 0; z < shape[0]; z += 1) {
                stub20_ = [
                    Math.floor(z / ncols),
                    z % ncols
                ];
                row = stub20_[0];
                col = stub20_[1];
                elements_per_tile = Math.floor(data.length / shape[0]);
                tile = data.slice(_pyfunc_mult(z, elements_per_tile), _pyfunc_mult(z + 1, elements_per_tile));
                Texture3DLike.prototype._base_class.set_data.call(this, [
                    _pyfunc_mult(row, shape[1]),
                    _pyfunc_mult(col, shape[2])
                ], shape.slice(1), tile);
            }
        }
        return null;
    };
    module.exports = {
        'Buffer': Buffer,
        'GlooObject': GlooObject,
        'IndexBuffer': IndexBuffer,
        'Program': Program,
        'Texture2D': Texture2D,
        'Texture3DLike': Texture3DLike,
        'VertexBuffer': VertexBuffer,
        'check_error': check_error,
        'console': console
    };    
},
425: /*models/glyphs/webgl/index*/
function _(require, module, exports) {
    var tslib_1 = require(364    /* tslib */);
    tslib_1.__exportStar(require(426    /* ./line */), exports);
    tslib_1.__exportStar(require(428    /* ./markers */), exports);    
},
426: /*models/glyphs/webgl/line*/
function _(require, module, exports) {
    var tslib_1 = require(364    /* tslib */);
    var DashAtlas;
    var gloo2_1 = require(424    /* ./gloo2 */);
    var base_1 = require(423    /* ./base */);
    var color_1 = require(26    /* core/util/color */);
    DashAtlas = function () {
        function DashAtlas(gl) {
            this._atlas = {};
            this._index = 0;
            this._width = 256;
            this._height = 256;
            // Init texture
            this.tex = new gloo2_1.Texture2D(gl);
            this.tex.set_wrapping(gl.REPEAT, gl.REPEAT);
            this.tex.set_interpolation(gl.NEAREST, gl.NEAREST);
            this.tex.set_size([
                this._height,
                this._width
            ], gl.RGBA);
            this.tex.set_data([
                0,
                0
            ], [
                this._height,
                this._width
            ], new Uint8Array(this._height * this._width * 4));
            // Init with solid line (index 0 is reserved for this)
            this.get_atlas_data([1]);
        }
        DashAtlas.prototype.get_atlas_data = function (pattern) {
            var data, findex_period, key, period, x;
            key = pattern.join('-');
            findex_period = this._atlas[key];
            if (findex_period === void 0) {
                _a = this.make_pattern(pattern), data = _a[0], period = _a[1];
                this.tex.set_data([
                    this._index,
                    0
                ], [
                    1,
                    this._width
                ], new Uint8Array(function () {
                    var l, len, results;
                    results = [];
                    for (l = 0, len = data.length; l < len; l++) {
                        x = data[l];
                        results.push(x + 10);
                    }
                    return results;
                }()));
                this._atlas[key] = [
                    this._index / this._height,
                    period
                ];
                this._index += 1;
            }
            return this._atlas[key];
            var _a;
        };
        DashAtlas.prototype.make_pattern = function (pattern) {
            var C, Z, a, b, c, dash_end, dash_start, dash_type, i, index, j, l, len, n, p, period, q, r, ref, ref1, ref2, v, val, val_at_index, x;
            // A pattern is defined as on/off sequence of segments
            // It must be a multiple of 2
            if (pattern.length > 1 && pattern.length % 2) {
                pattern = pattern.concat(pattern);
            }
            // Period is sum of elements
            period = 0;
            for (l = 0, len = pattern.length; l < len; l++) {
                v = pattern[l];
                period += v;
            }
            // Find all start and end of on-segment only
            C = [];
            c = 0;
            for (i = p = 0, ref = pattern.length + 2; p < ref; i = p += 2) {
                a = Math.max(0.0001, pattern[i % pattern.length]);
                b = Math.max(0.0001, pattern[(i + 1) % pattern.length]);
                C.push.apply(C, [
                    c,
                    c + a    // == extend
                ]);
                c += a + b;
            }
            // Build pattern
            n = this._width;
            Z = new Float32Array(n * 4);
            for (i = q = 0, ref1 = n; 0 <= ref1 ? q < ref1 : q > ref1; i = 0 <= ref1 ? ++q : --q) {
                x = period * i / (n - 1);
                // get index at min - index = np.argmin(abs(C-(x)))
                index = 0;
                val_at_index = 10000000000000000;
                for (j = r = 0, ref2 = C.length; 0 <= ref2 ? r < ref2 : r > ref2; j = 0 <= ref2 ? ++r : --r) {
                    val = Math.abs(C[j] - x);
                    if (val < val_at_index) {
                        index = j;
                        val_at_index = val;
                    }
                }
                if (index % 2 === 0) {
                    dash_type = x <= C[index] ? +1 : 0;
                    dash_start = C[index];
                    dash_end = C[index + 1];
                } else {
                    dash_type = x > C[index] ? -1 : 0;
                    dash_start = C[index - 1];
                    dash_end = C[index];
                }
                Z[i * 4 + 0] = C[index];
                Z[i * 4 + 1] = dash_type;
                Z[i * 4 + 2] = dash_start;
                Z[i * 4 + 3] = dash_end;
            }
            return [
                Z,
                period
            ];
        };
        return DashAtlas;
    }();
    var LineGLGlyph = function (_super) {
        tslib_1.__extends(LineGLGlyph, _super);
        function LineGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LineGLGlyph.prototype.init = function () {
            var gl;
            gl = this.gl;
            this._scale_aspect = 0;
            // keep track, so we know when we need to update segment data
            // The program
            this.prog = new gloo2_1.Program(gl);
            this.prog.set_shaders(this.VERT, this.FRAG);
            this.index_buffer = new gloo2_1.IndexBuffer(gl);
            // Buffers
            this.vbo_position = new gloo2_1.VertexBuffer(gl);
            this.vbo_tangents = new gloo2_1.VertexBuffer(gl);
            this.vbo_segment = new gloo2_1.VertexBuffer(gl);
            this.vbo_angles = new gloo2_1.VertexBuffer(gl);
            this.vbo_texcoord = new gloo2_1.VertexBuffer(gl);
            // Dash atlas
            return this.dash_atlas = new DashAtlas(gl);
        };
        LineGLGlyph.prototype.draw = function (indices, mainGlyph, trans) {
            var baked_offset, chunk, chunks, chunksize, i, l, mainGlGlyph, nvertices, offset, p, q, ref, ref1, ref2, results, scale_length, sx, sy, these_indices, uint16_index;
            mainGlGlyph = mainGlyph.glglyph;
            if (mainGlGlyph.data_changed) {
                if (!(isFinite(trans.dx) && isFinite(trans.dy))) {
                    return;
                }
                mainGlGlyph._baked_offset = [
                    trans.dx,
                    trans.dy
                ];
                mainGlGlyph._set_data();
                mainGlGlyph.data_changed = false;
            }
            if (this.visuals_changed) {
                this._set_visuals();
                this.visuals_changed = false;
            }
            // Decompose x-y scale into scalar scale and aspect-vector.
            sx = trans.sx;
            sy = trans.sy;
            scale_length = Math.sqrt(sx * sx + sy * sy);
            sx /= scale_length;
            sy /= scale_length;
            // Do we need to re-calculate segment data and cumsum?
            if (Math.abs(this._scale_aspect - sy / sx) > Math.abs(0.001 * this._scale_aspect)) {
                mainGlGlyph._update_scale(sx, sy);
                this._scale_aspect = sy / sx;
            }
            // Select buffers from main glyph
            // (which may be this glyph but maybe not if this is a (non)selection glyph)
            this.prog.set_attribute('a_position', 'vec2', mainGlGlyph.vbo_position);
            this.prog.set_attribute('a_tangents', 'vec4', mainGlGlyph.vbo_tangents);
            this.prog.set_attribute('a_segment', 'vec2', mainGlGlyph.vbo_segment);
            this.prog.set_attribute('a_angles', 'vec2', mainGlGlyph.vbo_angles);
            this.prog.set_attribute('a_texcoord', 'vec2', mainGlGlyph.vbo_texcoord);
            this.prog.set_uniform('u_length', 'float', [mainGlGlyph.cumsum]);
            this.prog.set_texture('u_dash_atlas', this.dash_atlas.tex);
            // Handle transformation to device coordinates
            baked_offset = mainGlGlyph._baked_offset;
            this.prog.set_uniform('u_pixel_ratio', 'float', [trans.pixel_ratio]);
            this.prog.set_uniform('u_canvas_size', 'vec2', [
                trans.width,
                trans.height
            ]);
            this.prog.set_uniform('u_offset', 'vec2', [
                trans.dx - baked_offset[0],
                trans.dy - baked_offset[1]
            ]);
            this.prog.set_uniform('u_scale_aspect', 'vec2', [
                sx,
                sy
            ]);
            this.prog.set_uniform('u_scale_length', 'float', [scale_length]);
            this.I_triangles = mainGlGlyph.I_triangles;
            if (this.I_triangles.length < 65535) {
                // Data is small enough to draw in one pass
                this.index_buffer.set_size(this.I_triangles.length * 2);
                this.index_buffer.set_data(0, new Uint16Array(this.I_triangles));
                return this.prog.draw(this.gl.TRIANGLES, this.index_buffer);
            } else {
                // Work around the limit that the indexbuffer must be uint16. We draw in chunks.
                // First collect indices in chunks
                // @prog.draw(@gl.LINE_STRIP, @index_buffer)  # Use this to draw the line skeleton
                indices = this.I_triangles;
                nvertices = this.I_triangles.length;
                chunksize = 64008;
                // 65536 max. 64008 is divisible by 12
                chunks = [];
                for (i = l = 0, ref = Math.ceil(nvertices / chunksize); 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
                    chunks.push([]);
                }
                for (i = p = 0, ref1 = indices.length; 0 <= ref1 ? p < ref1 : p > ref1; i = 0 <= ref1 ? ++p : --p) {
                    uint16_index = indices[i] % chunksize;
                    chunk = Math.floor(indices[i] / chunksize);
                    chunks[chunk].push(uint16_index);
                }
                results = [];
                // Then draw each chunk
                for (chunk = q = 0, ref2 = chunks.length; 0 <= ref2 ? q < ref2 : q > ref2; chunk = 0 <= ref2 ? ++q : --q) {
                    these_indices = new Uint16Array(chunks[chunk]);
                    offset = chunk * chunksize * 4;
                    if (these_indices.length === 0) {
                        continue;
                    }
                    this.prog.set_attribute('a_position', 'vec2', mainGlGlyph.vbo_position, 0, offset * 2);
                    this.prog.set_attribute('a_tangents', 'vec4', mainGlGlyph.vbo_tangents, 0, offset * 4);
                    this.prog.set_attribute('a_segment', 'vec2', mainGlGlyph.vbo_segment, 0, offset * 2);
                    this.prog.set_attribute('a_angles', 'vec2', mainGlGlyph.vbo_angles, 0, offset * 2);
                    this.prog.set_attribute('a_texcoord', 'vec2', mainGlGlyph.vbo_texcoord, 0, offset * 2);
                    // The actual drawing
                    this.index_buffer.set_size(these_indices.length * 2);
                    this.index_buffer.set_data(0, these_indices);
                    results.push(this.prog.draw(this.gl.TRIANGLES, this.index_buffer));
                }
                return results;
            }
        };
        LineGLGlyph.prototype._set_data = function () {
            this._bake();
            this.vbo_position.set_size(this.V_position.length * 4);
            this.vbo_position.set_data(0, this.V_position);
            this.vbo_tangents.set_size(this.V_tangents.length * 4);
            this.vbo_tangents.set_data(0, this.V_tangents);
            this.vbo_angles.set_size(this.V_angles.length * 4);
            this.vbo_angles.set_data(0, this.V_angles);
            this.vbo_texcoord.set_size(this.V_texcoord.length * 4);
            return this.vbo_texcoord.set_data(0, this.V_texcoord);
        };
        LineGLGlyph.prototype._set_visuals = function () {
            var cap, color, dash_index, dash_pattern, dash_period, join;
            color = color_1.color2rgba(this.glyph.visuals.line.line_color.value(), this.glyph.visuals.line.line_alpha.value());
            cap = this.CAPS[this.glyph.visuals.line.line_cap.value()];
            join = this.JOINS[this.glyph.visuals.line.line_join.value()];
            this.prog.set_uniform('u_color', 'vec4', color);
            this.prog.set_uniform('u_linewidth', 'float', [this.glyph.visuals.line.line_width.value()]);
            this.prog.set_uniform('u_antialias', 'float', [0.9]);
            // Smaller aa-region to obtain crisper images
            this.prog.set_uniform('u_linecaps', 'vec2', [
                cap,
                cap
            ]);
            this.prog.set_uniform('u_linejoin', 'float', [join]);
            this.prog.set_uniform('u_miter_limit', 'float', [10]);
            // 10 should be a good value
            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-miterlimit
            dash_pattern = this.glyph.visuals.line.line_dash.value();
            dash_index = 0;
            dash_period = 1;
            if (dash_pattern.length) {
                _a = this.dash_atlas.get_atlas_data(dash_pattern), dash_index = _a[0], dash_period = _a[1];
            }
            this.prog.set_uniform('u_dash_index', 'float', [dash_index]);
            // 0 means solid line
            this.prog.set_uniform('u_dash_phase', 'float', [this.glyph.visuals.line.line_dash_offset.value()]);
            this.prog.set_uniform('u_dash_period', 'float', [dash_period]);
            this.prog.set_uniform('u_dash_caps', 'vec2', [
                cap,
                cap
            ]);
            return this.prog.set_uniform('u_closed', 'float', [0]);
            // We dont do closed lines
            var _a;
        };
        LineGLGlyph.prototype._bake = function () {
            var A, I, T, V_angles, V_angles2, V_position, V_position2, V_tangents, V_tangents2, V_texcoord, V_texcoord2, Vp, Vt, _x, _y, i, i1, j, k, l, m, n, ni, o, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, results, s, t, u, w, y, z;
            // This is what you get if you port 50 lines of numpy code to JS.
            // V_segment is handled in another method, because it depends on the aspect
            // ratio of the scale (The original paper/code assumed isotropic scaling).
            // Buffer dtype from the Python implementation:
            // self.vtype = np.dtype( [('a_position', 'f4', 2),
            //                         ('a_segment',  'f4', 2),
            //                         ('a_angles',   'f4', 2),
            //                         ('a_tangents', 'f4', 4),
            //                         ('a_texcoord', 'f4', 2) ])
            // Init array of implicit shape nx2
            n = this.nvertices;
            _x = new Float64Array(this.glyph._x);
            _y = new Float64Array(this.glyph._y);
            // Init vertex data
            V_position = Vp = new Float32Array(n * 2);
            //V_segment = new Float32Array(n*2)  # Done later
            V_angles = new Float32Array(n * 2);
            V_tangents = Vt = new Float32Array(n * 4);
            // mind the 4!
            V_texcoord = new Float32Array(n * 2);
            // Position
            for (i = l = 0, ref = n; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
                V_position[i * 2 + 0] = _x[i] + this._baked_offset[0];
                V_position[i * 2 + 1] = _y[i] + this._baked_offset[1];
            }
            // Tangents & norms (need tangents to calculate segments based on scale)
            this.tangents = T = new Float32Array(n * 2 - 2);
            for (i = p = 0, ref1 = n - 1; 0 <= ref1 ? p < ref1 : p > ref1; i = 0 <= ref1 ? ++p : --p) {
                T[i * 2 + 0] = Vp[(i + 1) * 2 + 0] - Vp[i * 2 + 0];
                T[i * 2 + 1] = Vp[(i + 1) * 2 + 1] - Vp[i * 2 + 1];
            }
            for (i = q = 0, ref2 = n - 1; 0 <= ref2 ? q < ref2 : q > ref2; i = 0 <= ref2 ? ++q : --q) {
                // V['a_tangents'][+1:, :2] = T
                V_tangents[(i + 1) * 4 + 0] = T[i * 2 + 0];
                V_tangents[(i + 1) * 4 + 1] = T[i * 2 + 1];
                // V['a_tangents'][:-1, 2:] = T
                V_tangents[i * 4 + 2] = T[i * 2 + 0];
                V_tangents[i * 4 + 3] = T[i * 2 + 1];
            }
            // V['a_tangents'][0  , :2] = T[0]
            V_tangents[0 * 4 + 0] = T[0];
            V_tangents[0 * 4 + 1] = T[1];
            // V['a_tangents'][ -1, 2:] = T[-1]
            V_tangents[(n - 1) * 4 + 2] = T[(n - 2) * 2 + 0];
            V_tangents[(n - 1) * 4 + 3] = T[(n - 2) * 2 + 1];
            // Angles
            A = new Float32Array(n);
            for (i = r = 0, ref3 = n; 0 <= ref3 ? r < ref3 : r > ref3; i = 0 <= ref3 ? ++r : --r) {
                A[i] = Math.atan2(Vt[i * 4 + 0] * Vt[i * 4 + 3] - Vt[i * 4 + 1] * Vt[i * 4 + 2], Vt[i * 4 + 0] * Vt[i * 4 + 2] + Vt[i * 4 + 1] * Vt[i * 4 + 3]);
            }
            for (i = s = 0, ref4 = n - 1; 0 <= ref4 ? s < ref4 : s > ref4; i = 0 <= ref4 ? ++s : --s) {
                V_angles[i * 2 + 0] = A[i];
                V_angles[i * 2 + 1] = A[i + 1];
            }
            // Step 1: A -- B -- C  =>  A -- B, B' -- C
            // Repeat our array 4 times
            m = 4 * n - 4;
            this.V_position = V_position2 = new Float32Array(m * 2);
            this.V_angles = V_angles2 = new Float32Array(m * 2);
            this.V_tangents = V_tangents2 = new Float32Array(m * 4);
            // mind the 4!
            this.V_texcoord = V_texcoord2 = new Float32Array(m * 2);
            o = 2;
            // all nodes on the line
            // Arg, we really need an ndarray thing in JS :/
            for (i = t = 0, ref5 = n; 0 <= ref5 ? t < ref5 : t > ref5; i = 0 <= ref5 ? ++t : --t) {
                // the four quad vertices
                for (j = u = 0; u < 4; j = ++u) {
                    // xy
                    for (k = w = 0; w < 2; k = ++w) {
                        V_position2[(i * 4 + j - o) * 2 + k] = V_position[i * 2 + k];
                        V_angles2[(i * 4 + j) * 2 + k] = V_angles[i * 2 + k];
                    }
                    for (k = y = 0; y < 4; k = ++y) {
                        V_tangents2[(i * 4 + j - o) * 4 + k] = V_tangents[i * 4 + k];
                    }
                }
            }
            for (i = z = 0, ref6 = n; 0 <= ref6 ? z <= ref6 : z >= ref6; i = 0 <= ref6 ? ++z : --z) {
                V_texcoord2[(i * 4 + 0) * 2 + 0] = -1;
                V_texcoord2[(i * 4 + 1) * 2 + 0] = -1;
                V_texcoord2[(i * 4 + 2) * 2 + 0] = +1;
                V_texcoord2[(i * 4 + 3) * 2 + 0] = +1;
                V_texcoord2[(i * 4 + 0) * 2 + 1] = -1;
                V_texcoord2[(i * 4 + 1) * 2 + 1] = +1;
                V_texcoord2[(i * 4 + 2) * 2 + 1] = -1;
                V_texcoord2[(i * 4 + 3) * 2 + 1] = +1;
            }
            // Indices
            //I = np.resize( np.array([0,1,2,1,2,3], dtype=np.uint32), (n-1)*(2*3))
            //I += np.repeat( 4*np.arange(n-1), 6)
            ni = (n - 1) * 6;
            this.I_triangles = I = new Uint32Array(ni);
            results = [];
            // Order of indices is such that drawing as line_strip reveals the line skeleton
            // Might have implications on culling, if we ever turn that on.
            // Order in paper was: 0 1 2 1 2 3
            for (i = i1 = 0, ref7 = n; 0 <= ref7 ? i1 < ref7 : i1 > ref7; i = 0 <= ref7 ? ++i1 : --i1) {
                I[i * 6 + 0] = 0 + 4 * i;
                I[i * 6 + 1] = 1 + 4 * i;
                I[i * 6 + 2] = 3 + 4 * i;
                I[i * 6 + 3] = 2 + 4 * i;
                I[i * 6 + 4] = 0 + 4 * i;
                results.push(I[i * 6 + 5] = 3 + 4 * i);
            }
            return results;
        };
        LineGLGlyph.prototype._update_scale = function (sx, sy) {
            var N, T, V_segment, V_segment2, cumsum, i, j, k, l, m, n, p, q, r, ref, ref1, ref2, s;
            // Update segment data and cumsum so the length along the line has the
            // scale aspect ratio in it. In the vertex shader we multiply with the
            // "isotropic part" of the scale.
            n = this.nvertices;
            m = 4 * n - 4;
            // Prepare arrays
            T = this.tangents;
            N = new Float32Array(n - 1);
            V_segment = new Float32Array(n * 2);
            // Elements are initialized with 0
            this.V_segment = V_segment2 = new Float32Array(m * 2);
            // Calculate vector lengths - with scale aspect ratio taken into account
            for (i = l = 0, ref = n - 1; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
                N[i] = Math.sqrt(Math.pow(T[i * 2 + 0] * sx, 2) + Math.pow(T[i * 2 + 1] * sy, 2));
            }
            // Calculate Segments
            cumsum = 0;
            for (i = p = 0, ref1 = n - 1; 0 <= ref1 ? p < ref1 : p > ref1; i = 0 <= ref1 ? ++p : --p) {
                cumsum += N[i];
                V_segment[(i + 1) * 2 + 0] = cumsum;
                V_segment[i * 2 + 1] = cumsum;
            }
            // Upscale (same loop as in _bake())
            for (i = q = 0, ref2 = n; 0 <= ref2 ? q < ref2 : q > ref2; i = 0 <= ref2 ? ++q : --q) {
                for (j = r = 0; r < 4; j = ++r) {
                    for (k = s = 0; s < 2; k = ++s) {
                        V_segment2[(i * 4 + j) * 2 + k] = V_segment[i * 2 + k];
                    }
                }
            }
            // Update
            this.cumsum = cumsum;
            // L[-1] in Nico's code
            this.vbo_segment.set_size(this.V_segment.length * 4);
            return this.vbo_segment.set_data(0, this.V_segment);
        };
        return LineGLGlyph;
    }(base_1.BaseGLGlyph);
    exports.LineGLGlyph = LineGLGlyph;
    ;
    LineGLGlyph.prototype.GLYPH = 'line';
    LineGLGlyph.prototype.JOINS = {
        'miter': 0,
        'round': 1,
        'bevel': 2
    };
    LineGLGlyph.prototype.CAPS = {
        '': 0,
        'none': 0,
        '.': 0,
        'round': 1,
        ')': 1,
        '(': 1,
        'o': 1,
        'triangle in': 2,
        '<': 2,
        'triangle out': 3,
        '>': 3,
        'square': 4,
        '[': 4,
        ']': 4,
        '=': 4,
        'butt': 5,
        '|': 5
    };
    LineGLGlyph.prototype.VERT = 'precision mediump float;\n\nconst float PI = 3.14159265358979323846264;\nconst float THETA = 15.0 * 3.14159265358979323846264/180.0;\n\nuniform float u_pixel_ratio;\nuniform vec2 u_canvas_size, u_offset;\nuniform vec2 u_scale_aspect;\nuniform float u_scale_length;\n\nuniform vec4 u_color;\nuniform float u_antialias;\nuniform float u_length;\nuniform float u_linewidth;\nuniform float u_dash_index;\nuniform float u_closed;\n\nattribute vec2 a_position;\nattribute vec4 a_tangents;\nattribute vec2 a_segment;\nattribute vec2 a_angles;\nattribute vec2 a_texcoord;\n\nvarying vec4  v_color;\nvarying vec2  v_segment;\nvarying vec2  v_angles;\nvarying vec2  v_texcoord;\nvarying vec2  v_miter;\nvarying float v_length;\nvarying float v_linewidth;\n\nfloat cross(in vec2 v1, in vec2 v2)\n{\n    return v1.x*v2.y - v1.y*v2.x;\n}\n\nfloat signed_distance(in vec2 v1, in vec2 v2, in vec2 v3)\n{\n    return cross(v2-v1,v1-v3) / length(v2-v1);\n}\n\nvoid rotate( in vec2 v, in float alpha, out vec2 result )\n{\n    float c = cos(alpha);\n    float s = sin(alpha);\n    result = vec2( c*v.x - s*v.y,\n                   s*v.x + c*v.y );\n}\n\nvoid main()\n{\n    bool closed = (u_closed > 0.0);\n\n    // Attributes and uniforms to varyings\n    v_color = u_color;\n    v_linewidth = u_linewidth;\n    v_segment = a_segment * u_scale_length;\n    v_length = u_length * u_scale_length;\n\n    // Scale to map to pixel coordinates. The original algorithm from the paper\n    // assumed isotropic scale. We obviously do not have this.\n    vec2 abs_scale_aspect = abs(u_scale_aspect);\n    vec2 abs_scale = u_scale_length * abs_scale_aspect;\n\n    // Correct angles for aspect ratio\n    vec2 av;\n    av = vec2(1.0, tan(a_angles.x)) / abs_scale_aspect;\n    v_angles.x = atan(av.y, av.x);\n    av = vec2(1.0, tan(a_angles.y)) / abs_scale_aspect;\n    v_angles.y = atan(av.y, av.x);\n\n    // Thickness below 1 pixel are represented using a 1 pixel thickness\n    // and a modified alpha\n    v_color.a = min(v_linewidth, v_color.a);\n    v_linewidth = max(v_linewidth, 1.0);\n\n    // If color is fully transparent we just will discard the fragment anyway\n    if( v_color.a <= 0.0 ) {\n        gl_Position = vec4(0.0,0.0,0.0,1.0);\n        return;\n    }\n\n    // This is the actual half width of the line\n    float w = ceil(u_antialias+v_linewidth)/2.0;\n\n    vec2 position = (a_position + u_offset) * abs_scale;\n\n    vec2 t1 = normalize(a_tangents.xy * abs_scale_aspect);  // note the scaling for aspect ratio here\n    vec2 t2 = normalize(a_tangents.zw * abs_scale_aspect);\n    float u = a_texcoord.x;\n    float v = a_texcoord.y;\n    vec2 o1 = vec2( +t1.y, -t1.x);\n    vec2 o2 = vec2( +t2.y, -t2.x);\n\n    // This is a join\n    // ----------------------------------------------------------------\n    if( t1 != t2 ) {\n        float angle = atan (t1.x*t2.y-t1.y*t2.x, t1.x*t2.x+t1.y*t2.y);  // Angle needs recalculation for some reason\n        vec2 t  = normalize(t1+t2);\n        vec2 o  = vec2( + t.y, - t.x);\n\n        if ( u_dash_index > 0.0 )\n        {\n            // Broken angle\n            // ----------------------------------------------------------------\n            if( (abs(angle) > THETA) ) {\n                position += v * w * o / cos(angle/2.0);\n                float s = sign(angle);\n                if( angle < 0.0 ) {\n                    if( u == +1.0 ) {\n                        u = v_segment.y + v * w * tan(angle/2.0);\n                        if( v == 1.0 ) {\n                            position -= 2.0 * w * t1 / sin(angle);\n                            u -= 2.0 * w / sin(angle);\n                        }\n                    } else {\n                        u = v_segment.x - v * w * tan(angle/2.0);\n                        if( v == 1.0 ) {\n                            position += 2.0 * w * t2 / sin(angle);\n                            u += 2.0*w / sin(angle);\n                        }\n                    }\n                } else {\n                    if( u == +1.0 ) {\n                        u = v_segment.y + v * w * tan(angle/2.0);\n                        if( v == -1.0 ) {\n                            position += 2.0 * w * t1 / sin(angle);\n                            u += 2.0 * w / sin(angle);\n                        }\n                    } else {\n                        u = v_segment.x - v * w * tan(angle/2.0);\n                        if( v == -1.0 ) {\n                            position -= 2.0 * w * t2 / sin(angle);\n                            u -= 2.0*w / sin(angle);\n                        }\n                    }\n                }\n                // Continuous angle\n                // ------------------------------------------------------------\n            } else {\n                position += v * w * o / cos(angle/2.0);\n                if( u == +1.0 ) u = v_segment.y;\n                else            u = v_segment.x;\n            }\n        }\n\n        // Solid line\n        // --------------------------------------------------------------------\n        else\n        {\n            position.xy += v * w * o / cos(angle/2.0);\n            if( angle < 0.0 ) {\n                if( u == +1.0 ) {\n                    u = v_segment.y + v * w * tan(angle/2.0);\n                } else {\n                    u = v_segment.x - v * w * tan(angle/2.0);\n                }\n            } else {\n                if( u == +1.0 ) {\n                    u = v_segment.y + v * w * tan(angle/2.0);\n                } else {\n                    u = v_segment.x - v * w * tan(angle/2.0);\n                }\n            }\n        }\n\n    // This is a line start or end (t1 == t2)\n    // ------------------------------------------------------------------------\n    } else {\n        position += v * w * o1;\n        if( u == -1.0 ) {\n            u = v_segment.x - w;\n            position -= w * t1;\n        } else {\n            u = v_segment.y + w;\n            position += w * t2;\n        }\n    }\n\n    // Miter distance\n    // ------------------------------------------------------------------------\n    vec2 t;\n    vec2 curr = a_position * abs_scale;\n    if( a_texcoord.x < 0.0 ) {\n        vec2 next = curr + t2*(v_segment.y-v_segment.x);\n\n        rotate( t1, +v_angles.x/2.0, t);\n        v_miter.x = signed_distance(curr, curr+t, position);\n\n        rotate( t2, +v_angles.y/2.0, t);\n        v_miter.y = signed_distance(next, next+t, position);\n    } else {\n        vec2 prev = curr - t1*(v_segment.y-v_segment.x);\n\n        rotate( t1, -v_angles.x/2.0,t);\n        v_miter.x = signed_distance(prev, prev+t, position);\n\n        rotate( t2, -v_angles.y/2.0,t);\n        v_miter.y = signed_distance(curr, curr+t, position);\n    }\n\n    if (!closed && v_segment.x <= 0.0) {\n        v_miter.x = 1e10;\n    }\n    if (!closed && v_segment.y >= v_length)\n    {\n        v_miter.y = 1e10;\n    }\n\n    v_texcoord = vec2( u, v*w );\n\n    // Calculate position in device coordinates. Note that we\n    // already scaled with abs scale above.\n    vec2 normpos = position * sign(u_scale_aspect);\n    normpos += 0.5;  // make up for Bokeh\'s offset\n    normpos /= u_canvas_size / u_pixel_ratio;  // in 0..1\n    gl_Position = vec4(normpos*2.0-1.0, 0.0, 1.0);\n    gl_Position.y *= -1.0;\n}\n';
    LineGLGlyph.prototype.FRAG_ = '// Fragment shader that can be convenient during debugging to show the line skeleton.\nprecision mediump float;\nuniform vec4  u_color;\nvoid main () {\n  gl_FragColor = u_color;\n}';
    LineGLGlyph.prototype.FRAG = 'precision mediump float;\n\nconst float PI = 3.14159265358979323846264;\nconst float THETA = 15.0 * 3.14159265358979323846264/180.0;\n\nuniform sampler2D u_dash_atlas;\n\nuniform vec2 u_linecaps;\nuniform float u_miter_limit;\nuniform float u_linejoin;\nuniform float u_antialias;\nuniform float u_dash_phase;\nuniform float u_dash_period;\nuniform float u_dash_index;\nuniform vec2 u_dash_caps;\nuniform float u_closed;\n\nvarying vec4  v_color;\nvarying vec2  v_segment;\nvarying vec2  v_angles;\nvarying vec2  v_texcoord;\nvarying vec2  v_miter;\nvarying float v_length;\nvarying float v_linewidth;\n\n// Compute distance to cap ----------------------------------------------------\nfloat cap( int type, float dx, float dy, float t, float linewidth )\n{\n    float d = 0.0;\n    dx = abs(dx);\n    dy = abs(dy);\n    if      (type == 0)  discard;  // None\n    else if (type == 1)  d = sqrt(dx*dx+dy*dy);  // Round\n    else if (type == 3)  d = (dx+abs(dy));  // Triangle in\n    else if (type == 2)  d = max(abs(dy),(t+dx-abs(dy)));  // Triangle out\n    else if (type == 4)  d = max(dx,dy);  // Square\n    else if (type == 5)  d = max(dx+t,dy);  // Butt\n    return d;\n}\n\n// Compute distance to join -------------------------------------------------\nfloat join( in int type, in float d, in vec2 segment, in vec2 texcoord, in vec2 miter,\n           in float linewidth )\n{\n    // texcoord.x is distance from start\n    // texcoord.y is distance from centerline\n    // segment.x and y indicate the limits (as for texcoord.x) for this segment\n\n    float dx = texcoord.x;\n\n    // Round join\n    if( type == 1 ) {\n        if (dx < segment.x) {\n            d = max(d,length( texcoord - vec2(segment.x,0.0)));\n            //d = length( texcoord - vec2(segment.x,0.0));\n        } else if (dx > segment.y) {\n            d = max(d,length( texcoord - vec2(segment.y,0.0)));\n            //d = length( texcoord - vec2(segment.y,0.0));\n        }\n    }\n    // Bevel join\n    else if ( type == 2 ) {\n        if (dx < segment.x) {\n            vec2 x = texcoord - vec2(segment.x,0.0);\n            d = max(d, max(abs(x.x), abs(x.y)));\n\n        } else if (dx > segment.y) {\n            vec2 x = texcoord - vec2(segment.y,0.0);\n            d = max(d, max(abs(x.x), abs(x.y)));\n        }\n        /*  Original code for bevel which does not work for us\n        if( (dx < segment.x) ||  (dx > segment.y) )\n            d = max(d, min(abs(x.x),abs(x.y)));\n        */\n    }\n\n    return d;\n}\n\nvoid main()\n{\n    // If color is fully transparent we just discard the fragment\n    if( v_color.a <= 0.0 ) {\n        discard;\n    }\n\n    // Test if dash pattern is the solid one (0)\n    bool solid =  (u_dash_index == 0.0);\n\n    // Test if path is closed\n    bool closed = (u_closed > 0.0);\n\n    vec4 color = v_color;\n    float dx = v_texcoord.x;\n    float dy = v_texcoord.y;\n    float t = v_linewidth/2.0-u_antialias;\n    float width = 1.0;  //v_linewidth; original code had dashes scale with line width, we do not\n    float d = 0.0;\n\n    vec2 linecaps = u_linecaps;\n    vec2 dash_caps = u_dash_caps;\n    float line_start = 0.0;\n    float line_stop = v_length;\n\n    // Apply miter limit; fragments too far into the miter are simply discarded\n    if( (dx < v_segment.x) || (dx > v_segment.y) ) {\n        float into_miter = max(v_segment.x - dx, dx - v_segment.y);\n        if (into_miter > u_miter_limit*v_linewidth/2.0)\n          discard;\n    }\n\n    // Solid line --------------------------------------------------------------\n    if( solid ) {\n        d = abs(dy);\n        if( (!closed) && (dx < line_start) ) {\n            d = cap( int(u_linecaps.x), abs(dx), abs(dy), t, v_linewidth );\n        }\n        else if( (!closed) &&  (dx > line_stop) ) {\n            d = cap( int(u_linecaps.y), abs(dx)-line_stop, abs(dy), t, v_linewidth );\n        }\n        else {\n            d = join( int(u_linejoin), abs(dy), v_segment, v_texcoord, v_miter, v_linewidth );\n        }\n\n    // Dash line --------------------------------------------------------------\n    } else {\n        float segment_start = v_segment.x;\n        float segment_stop  = v_segment.y;\n        float segment_center= (segment_start+segment_stop)/2.0;\n        float freq          = u_dash_period*width;\n        float u = mod( dx + u_dash_phase*width, freq);\n        vec4 tex = texture2D(u_dash_atlas, vec2(u/freq, u_dash_index)) * 255.0 -10.0;  // conversion to int-like\n        float dash_center= tex.x * width;\n        float dash_type  = tex.y;\n        float _start = tex.z * width;\n        float _stop  = tex.a * width;\n        float dash_start = dx - u + _start;\n        float dash_stop  = dx - u + _stop;\n\n        // Compute extents of the first dash (the one relative to v_segment.x)\n        // Note: this could be computed in the vertex shader\n        if( (dash_stop < segment_start) && (dash_caps.x != 5.0) ) {\n            float u = mod(segment_start + u_dash_phase*width, freq);\n            vec4 tex = texture2D(u_dash_atlas, vec2(u/freq, u_dash_index)) * 255.0 -10.0;  // conversion to int-like\n            dash_center= tex.x * width;\n            //dash_type  = tex.y;\n            float _start = tex.z * width;\n            float _stop  = tex.a * width;\n            dash_start = segment_start - u + _start;\n            dash_stop = segment_start - u + _stop;\n        }\n\n        // Compute extents of the last dash (the one relatives to v_segment.y)\n        // Note: This could be computed in the vertex shader\n        else if( (dash_start > segment_stop)  && (dash_caps.y != 5.0) ) {\n            float u = mod(segment_stop + u_dash_phase*width, freq);\n            vec4 tex = texture2D(u_dash_atlas, vec2(u/freq, u_dash_index)) * 255.0 -10.0;  // conversion to int-like\n            dash_center= tex.x * width;\n            //dash_type  = tex.y;\n            float _start = tex.z * width;\n            float _stop  = tex.a * width;\n            dash_start = segment_stop - u + _start;\n            dash_stop  = segment_stop - u + _stop;\n        }\n\n        // This test if the we are dealing with a discontinuous angle\n        bool discontinuous = ((dx <  segment_center) && abs(v_angles.x) > THETA) ||\n                             ((dx >= segment_center) && abs(v_angles.y) > THETA);\n        //if( dx < line_start) discontinuous = false;\n        //if( dx > line_stop)  discontinuous = false;\n\n        float d_join = join( int(u_linejoin), abs(dy),\n                            v_segment, v_texcoord, v_miter, v_linewidth );\n\n        // When path is closed, we do not have room for linecaps, so we make room\n        // by shortening the total length\n        if (closed) {\n             line_start += v_linewidth/2.0;\n             line_stop  -= v_linewidth/2.0;\n        }\n\n        // We also need to take antialias area into account\n        //line_start += u_antialias;\n        //line_stop  -= u_antialias;\n\n        // Check is dash stop is before line start\n        if( dash_stop <= line_start ) {\n            discard;\n        }\n        // Check is dash start is beyond line stop\n        if( dash_start >= line_stop ) {\n            discard;\n        }\n\n        // Check if current dash start is beyond segment stop\n        if( discontinuous ) {\n            // Dash start is beyond segment, we discard\n            if( (dash_start > segment_stop) ) {\n                discard;\n                //gl_FragColor = vec4(1.0,0.0,0.0,.25); return;\n            }\n\n            // Dash stop is before segment, we discard\n            if( (dash_stop < segment_start) ) {\n                discard;  //gl_FragColor = vec4(0.0,1.0,0.0,.25); return;\n            }\n\n            // Special case for round caps (nicer with this)\n            if( dash_caps.x == 1.0 ) {\n                if( (u > _stop) && (dash_stop > segment_stop )  && (abs(v_angles.y) < PI/2.0)) {\n                    discard;\n                }\n            }\n\n            // Special case for round caps  (nicer with this)\n            if( dash_caps.y == 1.0 ) {\n                if( (u < _start) && (dash_start < segment_start )  && (abs(v_angles.x) < PI/2.0)) {\n                    discard;\n                }\n            }\n\n            // Special case for triangle caps (in & out) and square\n            // We make sure the cap stop at crossing frontier\n            if( (dash_caps.x != 1.0) && (dash_caps.x != 5.0) ) {\n                if( (dash_start < segment_start )  && (abs(v_angles.x) < PI/2.0) ) {\n                    float a = v_angles.x/2.0;\n                    float x = (segment_start-dx)*cos(a) - dy*sin(a);\n                    float y = (segment_start-dx)*sin(a) + dy*cos(a);\n                    if( x > 0.0 ) discard;\n                    // We transform the cap into square to avoid holes\n                    dash_caps.x = 4.0;\n                }\n            }\n\n            // Special case for triangle caps (in & out) and square\n            // We make sure the cap stop at crossing frontier\n            if( (dash_caps.y != 1.0) && (dash_caps.y != 5.0) ) {\n                if( (dash_stop > segment_stop )  && (abs(v_angles.y) < PI/2.0) ) {\n                    float a = v_angles.y/2.0;\n                    float x = (dx-segment_stop)*cos(a) - dy*sin(a);\n                    float y = (dx-segment_stop)*sin(a) + dy*cos(a);\n                    if( x > 0.0 ) discard;\n                    // We transform the caps into square to avoid holes\n                    dash_caps.y = 4.0;\n                }\n            }\n        }\n\n        // Line cap at start\n        if( (dx < line_start) && (dash_start < line_start) && (dash_stop > line_start) ) {\n            d = cap( int(linecaps.x), dx-line_start, dy, t, v_linewidth);\n        }\n        // Line cap at stop\n        else if( (dx > line_stop) && (dash_stop > line_stop) && (dash_start < line_stop) ) {\n            d = cap( int(linecaps.y), dx-line_stop, dy, t, v_linewidth);\n        }\n        // Dash cap left - dash_type = -1, 0 or 1, but there may be roundoff errors\n        else if( dash_type < -0.5 ) {\n            d = cap( int(dash_caps.y), abs(u-dash_center), dy, t, v_linewidth);\n            if( (dx > line_start) && (dx < line_stop) )\n                d = max(d,d_join);\n        }\n        // Dash cap right\n        else if( dash_type > 0.5 ) {\n            d = cap( int(dash_caps.x), abs(dash_center-u), dy, t, v_linewidth);\n            if( (dx > line_start) && (dx < line_stop) )\n                d = max(d,d_join);\n        }\n        // Dash body (plain)\n        else {// if( dash_type > -0.5 &&  dash_type < 0.5) {\n            d = abs(dy);\n        }\n\n        // Line join\n        if( (dx > line_start) && (dx < line_stop)) {\n            if( (dx <= segment_start) && (dash_start <= segment_start)\n                && (dash_stop >= segment_start) ) {\n                d = d_join;\n                // Antialias at outer border\n                float angle = PI/2.+v_angles.x;\n                float f = abs( (segment_start - dx)*cos(angle) - dy*sin(angle));\n                d = max(f,d);\n            }\n            else if( (dx > segment_stop) && (dash_start <= segment_stop)\n                     && (dash_stop >= segment_stop) ) {\n                d = d_join;\n                // Antialias at outer border\n                float angle = PI/2.+v_angles.y;\n                float f = abs((dx - segment_stop)*cos(angle) - dy*sin(angle));\n                d = max(f,d);\n            }\n            else if( dx < (segment_start - v_linewidth/2.)) {\n                discard;\n            }\n            else if( dx > (segment_stop + v_linewidth/2.)) {\n                discard;\n            }\n        }\n        else if( dx < (segment_start - v_linewidth/2.)) {\n            discard;\n        }\n        else if( dx > (segment_stop + v_linewidth/2.)) {\n            discard;\n        }\n    }\n\n    // Distance to border ------------------------------------------------------\n    d = d - t;\n    if( d < 0.0 ) {\n        gl_FragColor = color;\n    } else {\n        d /= u_antialias;\n        gl_FragColor = vec4(color.rgb, exp(-d*d)*color.a);\n    }\n}';    
},
427: /*models/glyphs/webgl/main*/
function _(require, module, exports) {
    require(425    /* ./index */);    
},
428: /*models/glyphs/webgl/markers*/
function _(require, module, exports) {
    var tslib_1 = require(364    /* tslib */);
    var MarkerGLGlyph;
    var gloo2_1 = require(424    /* ./gloo2 */);
    var base_1 = require(423    /* ./base */);
    var logging_1 = require(14    /* core/logging */);
    MarkerGLGlyph = function () {
        var MarkerGLGlyph = function (_super) {
            tslib_1.__extends(MarkerGLGlyph, _super);
            function MarkerGLGlyph() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MarkerGLGlyph.prototype.init = function () {
                var frag, gl;
                gl = this.gl;
                frag = this.FRAG.replace(/MARKERCODE/, this.MARKERCODE);
                this.last_trans = {};
                // Keep track of transform
                // The program
                this.prog = new gloo2_1.Program(gl);
                this.prog.set_shaders(this.VERT, frag);
                // Real attributes
                this.vbo_x = new gloo2_1.VertexBuffer(gl);
                this.prog.set_attribute('a_x', 'float', this.vbo_x);
                this.vbo_y = new gloo2_1.VertexBuffer(gl);
                this.prog.set_attribute('a_y', 'float', this.vbo_y);
                this.vbo_s = new gloo2_1.VertexBuffer(gl);
                this.prog.set_attribute('a_size', 'float', this.vbo_s);
                this.vbo_a = new gloo2_1.VertexBuffer(gl);
                this.prog.set_attribute('a_angle', 'float', this.vbo_a);
                // VBO's for attributes (they may not be used if value is singleton)
                this.vbo_linewidth = new gloo2_1.VertexBuffer(gl);
                this.vbo_fg_color = new gloo2_1.VertexBuffer(gl);
                this.vbo_bg_color = new gloo2_1.VertexBuffer(gl);
                return this.index_buffer = new gloo2_1.IndexBuffer(gl);
            };
            MarkerGLGlyph.prototype.draw = function (indices, mainGlyph, trans) {
                var baked_offset, chunk, chunks, chunksize, i, j, k, l, mainGlGlyph, nvertices, offset, ref, ref1, ref2, results, s, these_indices, ua, uint16_index;
                // The main glyph has the data, *this* glyph has the visuals.
                mainGlGlyph = mainGlyph.glglyph;
                nvertices = mainGlGlyph.nvertices;
                // Upload data if we must. Only happens for main glyph.
                if (mainGlGlyph.data_changed) {
                    if (!(isFinite(trans.dx) && isFinite(trans.dy))) {
                        return;
                    }
                    mainGlGlyph._baked_offset = [
                        trans.dx,
                        trans.dy
                    ];
                    mainGlGlyph._set_data(nvertices);
                    mainGlGlyph.data_changed = false;
                } else if (this.glyph._radius != null && (trans.sx !== this.last_trans.sx || trans.sy !== this.last_trans.sy)) {
                    // Keep screen radius up-to-date for circle glyph. Only happens when a radius is given
                    this.last_trans = trans;
                    this.vbo_s.set_data(0, new Float32Array(function () {
                        var j, len, ref, results;
                        ref = this.glyph.sradius;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            s = ref[j];
                            results.push(s * 2);
                        }
                        return results;
                    }.call(this)));
                }
                // Update visuals if we must. Can happen for all glyphs.
                if (this.visuals_changed) {
                    this._set_visuals(nvertices);
                    this.visuals_changed = false;
                }
                // Handle transformation to device coordinates
                // Note the baked-in offset to avoid float32 precision problems
                baked_offset = mainGlGlyph._baked_offset;
                this.prog.set_uniform('u_pixel_ratio', 'float', [trans.pixel_ratio]);
                this.prog.set_uniform('u_canvas_size', 'vec2', [
                    trans.width,
                    trans.height
                ]);
                this.prog.set_uniform('u_offset', 'vec2', [
                    trans.dx - baked_offset[0],
                    trans.dy - baked_offset[1]
                ]);
                this.prog.set_uniform('u_scale', 'vec2', [
                    trans.sx,
                    trans.sy
                ]);
                // Select buffers from main glyph
                // (which may be this glyph but maybe not if this is a (non)selection glyph)
                this.prog.set_attribute('a_x', 'float', mainGlGlyph.vbo_x);
                this.prog.set_attribute('a_y', 'float', mainGlGlyph.vbo_y);
                this.prog.set_attribute('a_size', 'float', mainGlGlyph.vbo_s);
                this.prog.set_attribute('a_angle', 'float', mainGlGlyph.vbo_a);
                // Draw directly or using indices. Do not handle indices if they do not
                // fit in a uint16; WebGL 1.0 does not support uint32.
                if (indices.length === 0) {
                } else if (indices.length === nvertices) {
                    return this.prog.draw(this.gl.POINTS, [
                        0,
                        nvertices
                    ]);
                } else if (nvertices < 65535) {
                    // On IE the marker size is reduced to 1 px when using an index buffer
                    // A MS Edge dev on Twitter said on 24-04-2014: "gl_PointSize > 1.0 works
                    // in DrawArrays; gl_PointSize > 1.0 in DrawElements is coming soon in the
                    // next renderer update.
                    ua = window.navigator.userAgent;
                    if (ua.indexOf('MSIE ') + ua.indexOf('Trident/') + ua.indexOf('Edge/') > 0) {
                        logging_1.logger.warn('WebGL warning: IE is known to produce 1px sprites whith selections.');
                    }
                    this.index_buffer.set_size(indices.length * 2);
                    this.index_buffer.set_data(0, new Uint16Array(indices));
                    return this.prog.draw(this.gl.POINTS, this.index_buffer);
                } else {
                    // Work around the limit that the indexbuffer must be uint16. We draw in chunks.
                    // First collect indices in chunks
                    chunksize = 64000;
                    // 65536
                    chunks = [];
                    for (i = j = 0, ref = Math.ceil(nvertices / chunksize); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                        chunks.push([]);
                    }
                    for (i = k = 0, ref1 = indices.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
                        uint16_index = indices[i] % chunksize;
                        chunk = Math.floor(indices[i] / chunksize);
                        chunks[chunk].push(uint16_index);
                    }
                    results = [];
                    // Then draw each chunk
                    for (chunk = l = 0, ref2 = chunks.length; 0 <= ref2 ? l < ref2 : l > ref2; chunk = 0 <= ref2 ? ++l : --l) {
                        these_indices = new Uint16Array(chunks[chunk]);
                        offset = chunk * chunksize * 4;
                        if (these_indices.length === 0) {
                            continue;
                        }
                        this.prog.set_attribute('a_x', 'float', mainGlGlyph.vbo_x, 0, offset);
                        this.prog.set_attribute('a_y', 'float', mainGlGlyph.vbo_y, 0, offset);
                        this.prog.set_attribute('a_size', 'float', mainGlGlyph.vbo_s, 0, offset);
                        this.prog.set_attribute('a_angle', 'float', mainGlGlyph.vbo_a, 0, offset);
                        if (this.vbo_linewidth.used) {
                            this.prog.set_attribute('a_linewidth', 'float', this.vbo_linewidth, 0, offset);
                        }
                        if (this.vbo_fg_color.used) {
                            this.prog.set_attribute('a_fg_color', 'vec4', this.vbo_fg_color, 0, offset * 4);
                        }
                        if (this.vbo_bg_color.used) {
                            this.prog.set_attribute('a_bg_color', 'vec4', this.vbo_bg_color, 0, offset * 4);
                        }
                        // The actual drawing
                        this.index_buffer.set_size(these_indices.length * 2);
                        this.index_buffer.set_data(0, these_indices);
                        results.push(this.prog.draw(this.gl.POINTS, this.index_buffer));
                    }
                    return results;
                }
            };
            MarkerGLGlyph.prototype._set_data = function (nvertices) {
                var i, j, n, ref, s, xx, yy;
                n = nvertices * 4;
                // in bytes
                // Set buffer size
                this.vbo_x.set_size(n);
                this.vbo_y.set_size(n);
                this.vbo_a.set_size(n);
                this.vbo_s.set_size(n);
                // Upload data for x and y, apply a baked-in offset for float32 precision (issue #3795)
                // The exact value for the baked_offset does not matter, as long as it brings the data to less extreme values
                xx = new Float64Array(this.glyph._x);
                yy = new Float64Array(this.glyph._y);
                for (i = j = 0, ref = nvertices; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                    xx[i] += this._baked_offset[0];
                    yy[i] += this._baked_offset[1];
                }
                this.vbo_x.set_data(0, new Float32Array(xx));
                this.vbo_y.set_data(0, new Float32Array(yy));
                // Angle if available; circle does not have angle. If we don't set data, angle is default 0 in glsl
                if (this.glyph._angle != null) {
                    this.vbo_a.set_data(0, new Float32Array(this.glyph._angle));
                }
                // Radius is special; some markes allow radius in data-coords instead of screen coords
                // @radius tells us that radius is in units, sradius is the pre-calculated screen radius
                if (this.glyph._radius != null) {
                    return this.vbo_s.set_data(0, new Float32Array(function () {
                        var k, len, ref1, results;
                        ref1 = this.glyph.sradius;
                        results = [];
                        for (k = 0, len = ref1.length; k < len; k++) {
                            s = ref1[k];
                            results.push(s * 2);
                        }
                        return results;
                    }.call(this)));
                } else {
                    return this.vbo_s.set_data(0, new Float32Array(this.glyph._size));
                }
            };
            MarkerGLGlyph.prototype._set_visuals = function (nvertices) {
                base_1.attach_float(this.prog, this.vbo_linewidth, 'a_linewidth', nvertices, this.glyph.visuals.line, 'line_width');
                base_1.attach_color(this.prog, this.vbo_fg_color, 'a_fg_color', nvertices, this.glyph.visuals.line, 'line');
                base_1.attach_color(this.prog, this.vbo_bg_color, 'a_bg_color', nvertices, this.glyph.visuals.fill, 'fill');
                // Static value for antialias. Smaller aa-region to obtain crisper images
                return this.prog.set_uniform('u_antialias', 'float', [0.8]);
            };
            return MarkerGLGlyph;
        }(base_1.BaseGLGlyph);
        ;
        // Base class for markers. All markers share the same GLSL, except for one
        // function that defines the marker geometry.
        MarkerGLGlyph.prototype.VERT = 'precision mediump float;\nconst float SQRT_2 = 1.4142135623730951;\n//\nuniform float u_pixel_ratio;\nuniform vec2 u_canvas_size;\nuniform vec2 u_offset;\nuniform vec2 u_scale;\nuniform float u_antialias;\n//\nattribute float a_x;\nattribute float a_y;\nattribute float a_size;\nattribute float a_angle;  // in radians\nattribute float a_linewidth;\nattribute vec4  a_fg_color;\nattribute vec4  a_bg_color;\n//\nvarying float v_linewidth;\nvarying float v_size;\nvarying vec4  v_fg_color;\nvarying vec4  v_bg_color;\nvarying vec2  v_rotation;\n\nvoid main (void)\n{\n    v_size = a_size * u_pixel_ratio;\n    v_linewidth = a_linewidth * u_pixel_ratio;\n    v_fg_color = a_fg_color;\n    v_bg_color = a_bg_color;\n    v_rotation = vec2(cos(-a_angle), sin(-a_angle));\n    // Calculate position - the -0.5 is to correct for canvas origin\n    vec2 pos = (vec2(a_x, a_y) + u_offset) * u_scale; // in pixels\n    pos += 0.5;  // make up for Bokeh\'s offset\n    pos /= u_canvas_size / u_pixel_ratio;  // in 0..1\n    gl_Position = vec4(pos*2.0-1.0, 0.0, 1.0);\n    gl_Position.y *= -1.0;\n    gl_PointSize = SQRT_2 * v_size + 2.0 * (v_linewidth + 1.5*u_antialias);\n}';
        MarkerGLGlyph.prototype.FRAG = 'precision mediump float;\nconst float SQRT_2 = 1.4142135623730951;\nconst float PI = 3.14159265358979323846264;\n//\nuniform float u_antialias;\n//\nvarying vec4  v_fg_color;\nvarying vec4  v_bg_color;\nvarying float v_linewidth;\nvarying float v_size;\nvarying vec2  v_rotation;\n\nMARKERCODE\n\nvec4 outline(float distance, float linewidth, float antialias, vec4 fg_color, vec4 bg_color)\n{\n    vec4 frag_color;\n    float t = linewidth/2.0 - antialias;\n    float signed_distance = distance;\n    float border_distance = abs(signed_distance) - t;\n    float alpha = border_distance/antialias;\n    alpha = exp(-alpha*alpha);\n\n    // If fg alpha is zero, it probably means no outline. To avoid a dark outline\n    // shining through due to aa, we set the fg color to the bg color. Avoid if (i.e. branching).\n    float select = float(bool(fg_color.a));\n    fg_color.rgb = select * fg_color.rgb + (1.0  - select) * bg_color.rgb;\n    // Similarly, if we want a transparent bg\n    select = float(bool(bg_color.a));\n    bg_color.rgb = select * bg_color.rgb + (1.0  - select) * fg_color.rgb;\n\n    if( border_distance < 0.0)\n        frag_color = fg_color;\n    else if( signed_distance < 0.0 ) {\n        frag_color = mix(bg_color, fg_color, sqrt(alpha));\n    } else {\n        if( abs(signed_distance) < (linewidth/2.0 + antialias) ) {\n            frag_color = vec4(fg_color.rgb, fg_color.a * alpha);\n        } else {\n            discard;\n        }\n    }\n    return frag_color;\n}\n\nvoid main()\n{\n    vec2 P = gl_PointCoord.xy - vec2(0.5, 0.5);\n    P = vec2(v_rotation.x*P.x - v_rotation.y*P.y,\n             v_rotation.y*P.x + v_rotation.x*P.y);\n    float point_size = SQRT_2*v_size  + 2.0 * (v_linewidth + 1.5*u_antialias);\n    float distance = marker(P*point_size, v_size);\n    gl_FragColor = outline(distance, v_linewidth, u_antialias, v_fg_color, v_bg_color);\n    //gl_FragColor.rgb *= gl_FragColor.a;  // pre-multiply alpha\n}';
        MarkerGLGlyph.prototype.MARKERCODE = '<defined in subclasses>';
        return MarkerGLGlyph;
    }();
    var CircleGLGlyph = function (_super) {
        tslib_1.__extends(CircleGLGlyph, _super);
        function CircleGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CircleGLGlyph;
    }(MarkerGLGlyph);
    exports.CircleGLGlyph = CircleGLGlyph;
    ;
    CircleGLGlyph.prototype.GLYPH = 'circle';
    CircleGLGlyph.prototype.MARKERCODE = '// --- disc\nfloat marker(vec2 P, float size)\n{\n    return length(P) - size/2.0;\n}';
    var SquareGLGlyph = function (_super) {
        tslib_1.__extends(SquareGLGlyph, _super);
        function SquareGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SquareGLGlyph;
    }(MarkerGLGlyph);
    exports.SquareGLGlyph = SquareGLGlyph;
    ;
    SquareGLGlyph.prototype.GLYPH = 'square';
    SquareGLGlyph.prototype.MARKERCODE = '// --- square\nfloat marker(vec2 P, float size)\n{\n    return max(abs(P.x), abs(P.y)) - size/2.0;\n}';
    var AnnulusGLGlyph = function (_super) {
        tslib_1.__extends(AnnulusGLGlyph, _super);
        function AnnulusGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AnnulusGLGlyph;
    }(MarkerGLGlyph);
    exports.AnnulusGLGlyph = AnnulusGLGlyph;
    ;
    AnnulusGLGlyph.prototype.GLYPH = 'annulus';
    AnnulusGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    float r1 = length(P) - size/2.0;\n    float r2 = length(P) - size/4.0;  // half width\n    return max(r1, -r2);\n}';
    var DiamondGLGlyph = function (_super) {
        tslib_1.__extends(DiamondGLGlyph, _super);
        function DiamondGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DiamondGLGlyph;
    }(MarkerGLGlyph);
    exports.DiamondGLGlyph = DiamondGLGlyph;
    ;
    DiamondGLGlyph.prototype.GLYPH = 'diamond';
    DiamondGLGlyph.prototype.MARKERCODE = '// --- diamond\nfloat marker(vec2 P, float size)\n{\n    float x = SQRT_2 / 2.0 * (P.x * 1.5 - P.y);\n    float y = SQRT_2 / 2.0 * (P.x * 1.5 + P.y);\n    float r1 = max(abs(x), abs(y)) - size / (2.0 * SQRT_2);\n    return r1 / SQRT_2;\n}';
    var TriangleGLGlyph = function (_super) {
        tslib_1.__extends(TriangleGLGlyph, _super);
        function TriangleGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TriangleGLGlyph;
    }(MarkerGLGlyph);
    exports.TriangleGLGlyph = TriangleGLGlyph;
    ;
    TriangleGLGlyph.prototype.GLYPH = 'triangle';
    TriangleGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    P.y -= size * 0.3;\n    float x = SQRT_2 / 2.0 * (P.x * 1.7 - P.y);\n    float y = SQRT_2 / 2.0 * (P.x * 1.7 + P.y);\n    float r1 = max(abs(x), abs(y)) - size / 1.6;\n    float r2 = P.y;\n    return max(r1 / SQRT_2, r2);  // Instersect diamond with rectangle\n}';
    var InvertedTriangleGLGlyph = function (_super) {
        tslib_1.__extends(InvertedTriangleGLGlyph, _super);
        function InvertedTriangleGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InvertedTriangleGLGlyph;
    }(MarkerGLGlyph);
    exports.InvertedTriangleGLGlyph = InvertedTriangleGLGlyph;
    ;
    InvertedTriangleGLGlyph.prototype.GLYPH = 'invertedtriangle';
    InvertedTriangleGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    P.y += size * 0.3;\n    float x = SQRT_2 / 2.0 * (P.x * 1.7 - P.y);\n    float y = SQRT_2 / 2.0 * (P.x * 1.7 + P.y);\n    float r1 = max(abs(x), abs(y)) - size / 1.6;\n    float r2 = - P.y;\n    return max(r1 / SQRT_2, r2);  // Instersect diamond with rectangle\n}';
    var CrossGLGlyph = function (_super) {
        tslib_1.__extends(CrossGLGlyph, _super);
        function CrossGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CrossGLGlyph;
    }(MarkerGLGlyph);
    exports.CrossGLGlyph = CrossGLGlyph;
    ;
    CrossGLGlyph.prototype.GLYPH = 'cross';
    CrossGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    float square = max(abs(P.x), abs(P.y)) - size / 2.5;  // 2.5 is a tweak\n    float cross = min(abs(P.x), abs(P.y)) - size / 100.0;  // bit of "width" for aa\n    return max(square, cross);\n}';
    var CircleCrossGLGlyph = function (_super) {
        tslib_1.__extends(CircleCrossGLGlyph, _super);
        function CircleCrossGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CircleCrossGLGlyph;
    }(MarkerGLGlyph);
    exports.CircleCrossGLGlyph = CircleCrossGLGlyph;
    ;
    CircleCrossGLGlyph.prototype.GLYPH = 'circlecross';
    CircleCrossGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    // Define quadrants\n    float qs = size / 2.0;  // quadrant size\n    float s1 = max(abs(P.x - qs), abs(P.y - qs)) - qs;\n    float s2 = max(abs(P.x + qs), abs(P.y - qs)) - qs;\n    float s3 = max(abs(P.x - qs), abs(P.y + qs)) - qs;\n    float s4 = max(abs(P.x + qs), abs(P.y + qs)) - qs;\n    // Intersect main shape with quadrants (to form cross)\n    float circle = length(P) - size/2.0;\n    float c1 = max(circle, s1);\n    float c2 = max(circle, s2);\n    float c3 = max(circle, s3);\n    float c4 = max(circle, s4);\n    // Union\n    return min(min(min(c1, c2), c3), c4);\n}';
    var SquareCrossGLGlyph = function (_super) {
        tslib_1.__extends(SquareCrossGLGlyph, _super);
        function SquareCrossGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SquareCrossGLGlyph;
    }(MarkerGLGlyph);
    exports.SquareCrossGLGlyph = SquareCrossGLGlyph;
    ;
    SquareCrossGLGlyph.prototype.GLYPH = 'squarecross';
    SquareCrossGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    // Define quadrants\n    float qs = size / 2.0;  // quadrant size\n    float s1 = max(abs(P.x - qs), abs(P.y - qs)) - qs;\n    float s2 = max(abs(P.x + qs), abs(P.y - qs)) - qs;\n    float s3 = max(abs(P.x - qs), abs(P.y + qs)) - qs;\n    float s4 = max(abs(P.x + qs), abs(P.y + qs)) - qs;\n    // Intersect main shape with quadrants (to form cross)\n    float square = max(abs(P.x), abs(P.y)) - size/2.0;\n    float c1 = max(square, s1);\n    float c2 = max(square, s2);\n    float c3 = max(square, s3);\n    float c4 = max(square, s4);\n    // Union\n    return min(min(min(c1, c2), c3), c4);\n}';
    var DiamondCrossGLGlyph = function (_super) {
        tslib_1.__extends(DiamondCrossGLGlyph, _super);
        function DiamondCrossGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DiamondCrossGLGlyph;
    }(MarkerGLGlyph);
    exports.DiamondCrossGLGlyph = DiamondCrossGLGlyph;
    ;
    DiamondCrossGLGlyph.prototype.GLYPH = 'diamondcross';
    DiamondCrossGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    // Define quadrants\n    float qs = size / 2.0;  // quadrant size\n    float s1 = max(abs(P.x - qs), abs(P.y - qs)) - qs;\n    float s2 = max(abs(P.x + qs), abs(P.y - qs)) - qs;\n    float s3 = max(abs(P.x - qs), abs(P.y + qs)) - qs;\n    float s4 = max(abs(P.x + qs), abs(P.y + qs)) - qs;\n    // Intersect main shape with quadrants (to form cross)\n    float x = SQRT_2 / 2.0 * (P.x * 1.5 - P.y);\n    float y = SQRT_2 / 2.0 * (P.x * 1.5 + P.y);\n    float diamond = max(abs(x), abs(y)) - size / (2.0 * SQRT_2);\n    diamond /= SQRT_2;\n    float c1 = max(diamond, s1);\n    float c2 = max(diamond, s2);\n    float c3 = max(diamond, s3);\n    float c4 = max(diamond, s4);\n    // Union\n    return min(min(min(c1, c2), c3), c4);\n}';
    var XGLGlyph = function (_super) {
        tslib_1.__extends(XGLGlyph, _super);
        function XGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return XGLGlyph;
    }(MarkerGLGlyph);
    exports.XGLGlyph = XGLGlyph;
    ;
    XGLGlyph.prototype.GLYPH = 'x';
    XGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    float circle = length(P) - size / 1.6;\n    float X = min(abs(P.x - P.y), abs(P.x + P.y)) - size / 100.0;  // bit of "width" for aa\n    return max(circle, X);\n}';
    var CircleXGLGlyph = function (_super) {
        tslib_1.__extends(CircleXGLGlyph, _super);
        function CircleXGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CircleXGLGlyph;
    }(MarkerGLGlyph);
    exports.CircleXGLGlyph = CircleXGLGlyph;
    ;
    CircleXGLGlyph.prototype.GLYPH = 'circlex';
    CircleXGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    float x = P.x - P.y;\n    float y = P.x + P.y;\n    // Define quadrants\n    float qs = size / 2.0;  // quadrant size\n    float s1 = max(abs(x - qs), abs(y - qs)) - qs;\n    float s2 = max(abs(x + qs), abs(y - qs)) - qs;\n    float s3 = max(abs(x - qs), abs(y + qs)) - qs;\n    float s4 = max(abs(x + qs), abs(y + qs)) - qs;\n    // Intersect main shape with quadrants (to form cross)\n    float circle = length(P) - size/2.0;\n    float c1 = max(circle, s1);\n    float c2 = max(circle, s2);\n    float c3 = max(circle, s3);\n    float c4 = max(circle, s4);\n    // Union\n    float almost = min(min(min(c1, c2), c3), c4);\n    // In this case, the X is also outside of the main shape\n    float Xmask = length(P) - size / 1.6;  // a circle\n    float X = min(abs(P.x - P.y), abs(P.x + P.y)) - size / 100.0;  // bit of "width" for aa\n    return min(max(X, Xmask), almost);\n}';
    var SquareXGLGlyph = function (_super) {
        tslib_1.__extends(SquareXGLGlyph, _super);
        function SquareXGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SquareXGLGlyph;
    }(MarkerGLGlyph);
    exports.SquareXGLGlyph = SquareXGLGlyph;
    ;
    SquareXGLGlyph.prototype.GLYPH = 'squarex';
    SquareXGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    float x = P.x - P.y;\n    float y = P.x + P.y;\n    // Define quadrants\n    float qs = size / 2.0;  // quadrant size\n    float s1 = max(abs(x - qs), abs(y - qs)) - qs;\n    float s2 = max(abs(x + qs), abs(y - qs)) - qs;\n    float s3 = max(abs(x - qs), abs(y + qs)) - qs;\n    float s4 = max(abs(x + qs), abs(y + qs)) - qs;\n    // Intersect main shape with quadrants (to form cross)\n    float square = max(abs(P.x), abs(P.y)) - size/2.0;\n    float c1 = max(square, s1);\n    float c2 = max(square, s2);\n    float c3 = max(square, s3);\n    float c4 = max(square, s4);\n    // Union\n    return min(min(min(c1, c2), c3), c4);\n}';
    var AsteriskGLGlyph = function (_super) {
        tslib_1.__extends(AsteriskGLGlyph, _super);
        function AsteriskGLGlyph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AsteriskGLGlyph;
    }(MarkerGLGlyph);
    exports.AsteriskGLGlyph = AsteriskGLGlyph;
    ;
    AsteriskGLGlyph.prototype.GLYPH = 'asterisk';
    AsteriskGLGlyph.prototype.MARKERCODE = 'float marker(vec2 P, float size)\n{\n    // Masks\n    float diamond = max(abs(SQRT_2 / 2.0 * (P.x - P.y)), abs(SQRT_2 / 2.0 * (P.x + P.y))) - size / (2.0 * SQRT_2);\n    float square = max(abs(P.x), abs(P.y)) - size / (2.0 * SQRT_2);\n    // Shapes\n    float X = min(abs(P.x - P.y), abs(P.x + P.y)) - size / 100.0;  // bit of "width" for aa\n    float cross = min(abs(P.x), abs(P.y)) - size / 100.0;  // bit of "width" for aa\n    // Result is union of masked shapes\n    return min(max(X, diamond), max(cross, square));\n}';    
}
}, {"models/glyphs/webgl/base":423,"models/glyphs/webgl/gloo2":424,"models/glyphs/webgl/index":425,"models/glyphs/webgl/line":426,"models/glyphs/webgl/main":427,"models/glyphs/webgl/markers":428}, 427);
})

//# sourceMappingURL=bokeh-gl.js.map
