/*!
 * Copyright (c) 2012 - 2019, Anaconda, Inc., and Bokeh Contributors
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * 
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * Neither the name of Anaconda nor the names of any contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
*/
(function(root, factory) {
  factory(root["Bokeh"]);
})(this, function(Bokeh) {
  var define;
  return (function(modules, entry, aliases, externals) {
    if (Bokeh != null) {
      return Bokeh.register_plugin(modules, entry, aliases, externals);
    } else {
      throw new Error("Cannot find Bokeh. You have to load it prior to loading plugins.");
    }
  })
({
351: /* models/glyphs/webgl/main.js */ function _(require, module, exports) {
    require(352) /* ./index */;
},
352: /* models/glyphs/webgl/index.js */ function _(require, module, exports) {
    /*
    Copyright notice: many of the awesome techniques and  GLSL code contained in
    this module are based on work by Nicolas Rougier as part of the Glumpy and
    Vispy projects. The algorithms are published in
    http://jcgt.org/published/0003/04/01/ and http://jcgt.org/published/0002/02/08/
    
    This module contains all gl-specific code to add gl support for the glyphs.
    By implementing it separetely, the GL functionality can be spun off in a
    separate library.
    Other locations where we work with GL, or prepare for GL-rendering:
    - canvas.ts
    - plot.ts
    - glyph.ts
    - glyph_renderer.ts
    */
    function __export(m) {
        for (var p in m)
            if (!exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    __export(require(353) /* ./line */);
    __export(require(358) /* ./markers */);
},
353: /* models/glyphs/webgl/line.js */ function _(require, module, exports) {
    const gloo2_1 = require(354) /* gloo2 */;
    const base_1 = require(355) /* ./base */;
    const line_vert_1 = require(356) /* ./line.vert */;
    const line_frag_1 = require(357) /* ./line.frag */;
    const color_1 = require(20) /* ../../../core/util/color */;
    class DashAtlas {
        constructor(gl) {
            this._atlas = {};
            this._index = 0;
            this._width = 256;
            this._height = 256;
            // Init texture
            this.tex = new gloo2_1.Texture2D(gl);
            this.tex.set_wrapping(gl.REPEAT, gl.REPEAT);
            this.tex.set_interpolation(gl.NEAREST, gl.NEAREST);
            this.tex.set_size([this._height, this._width], gl.RGBA);
            this.tex.set_data([0, 0], [this._height, this._width], new Uint8Array(this._height * this._width * 4));
            // Init with solid line (index 0 is reserved for this)
            this.get_atlas_data([1]);
        }
        get_atlas_data(pattern) {
            const key = pattern.join('-');
            const findex_period = this._atlas[key];
            if (findex_period === undefined) {
                const [data, period] = this.make_pattern(pattern);
                this.tex.set_data([this._index, 0], [1, this._width], new Uint8Array(data.map((x) => x + 10)));
                this._atlas[key] = [this._index / this._height, period];
                this._index += 1;
            }
            return this._atlas[key];
        }
        make_pattern(pattern) {
            // A pattern is defined as on/off sequence of segments
            // It must be a multiple of 2
            if (pattern.length > 1 && pattern.length % 2) {
                pattern = pattern.concat(pattern);
            }
            // Period is sum of elements
            let period = 0;
            for (const v of pattern) {
                period += v;
            }
            // Find all start and end of on-segment only
            const C = [];
            let c = 0;
            for (let i = 0, end = pattern.length + 2; i < end; i += 2) {
                const a = Math.max(0.0001, pattern[i % pattern.length]);
                const b = Math.max(0.0001, pattern[(i + 1) % pattern.length]);
                C.push(c, c + a);
                c += a + b;
            }
            // Build pattern
            const n = this._width;
            const Z = new Float32Array(n * 4);
            for (let i = 0, end = n; i < end; i++) {
                let dash_end, dash_start, dash_type;
                const x = (period * i) / (n - 1);
                // get index at min - index = np.argmin(abs(C-(x)))
                let index = 0;
                let val_at_index = 1e16;
                for (let j = 0, endj = C.length; j < endj; j++) {
                    const val = Math.abs(C[j] - x);
                    if (val < val_at_index) {
                        index = j;
                        val_at_index = val;
                    }
                }
                if ((index % 2) === 0) {
                    dash_type = (x <= C[index]) ? +1 : 0;
                    dash_start = C[index];
                    dash_end = C[index + 1];
                }
                else {
                    dash_type = (x > C[index]) ? -1 : 0;
                    dash_start = C[index - 1];
                    dash_end = C[index];
                }
                Z[(i * 4) + 0] = C[index];
                Z[(i * 4) + 1] = dash_type;
                Z[(i * 4) + 2] = dash_start;
                Z[(i * 4) + 3] = dash_end;
            }
            return [Z, period];
        }
    }
    DashAtlas.__name__ = "DashAtlas";
    const joins = { miter: 0, round: 1, bevel: 2 };
    const caps = {
        '': 0, none: 0, '.': 0,
        round: 1, ')': 1, '(': 1, o: 1,
        'triangle in': 2, '<': 2,
        'triangle out': 3, '>': 3,
        square: 4, '[': 4, ']': 4, '=': 4,
        butt: 5, '|': 5,
    };
    class LineGLGlyph extends base_1.BaseGLGlyph {
        init() {
            const { gl } = this;
            this._scale_aspect = 0; // keep track, so we know when we need to update segment data
            const vert = line_vert_1.vertex_shader;
            const frag = line_frag_1.fragment_shader;
            // The program
            this.prog = new gloo2_1.Program(gl);
            this.prog.set_shaders(vert, frag);
            this.index_buffer = new gloo2_1.IndexBuffer(gl);
            // Buffers
            this.vbo_position = new gloo2_1.VertexBuffer(gl);
            this.vbo_tangents = new gloo2_1.VertexBuffer(gl);
            this.vbo_segment = new gloo2_1.VertexBuffer(gl);
            this.vbo_angles = new gloo2_1.VertexBuffer(gl);
            this.vbo_texcoord = new gloo2_1.VertexBuffer(gl);
            // Dash atlas
            this.dash_atlas = new DashAtlas(gl);
        }
        draw(indices, mainGlyph, trans) {
            const mainGlGlyph = mainGlyph.glglyph;
            if (mainGlGlyph.data_changed) {
                if (!(isFinite(trans.dx) && isFinite(trans.dy))) {
                    return; // not sure why, but it happens on init sometimes (#4367)
                }
                mainGlGlyph._baked_offset = [trans.dx, trans.dy]; // float32 precision workaround; used in _bake() and below
                mainGlGlyph._set_data();
                mainGlGlyph.data_changed = false;
            }
            if (this.visuals_changed) {
                this._set_visuals();
                this.visuals_changed = false;
            }
            // Decompose x-y scale into scalar scale and aspect-vector.
            let { sx, sy } = trans;
            const scale_length = Math.sqrt(sx * sx + sy * sy);
            sx /= scale_length;
            sy /= scale_length;
            // Do we need to re-calculate segment data and cumsum?
            if (Math.abs(this._scale_aspect - sy / sx) > Math.abs(1e-3 * this._scale_aspect)) {
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
            //
            this.prog.set_uniform('u_length', 'float', [mainGlGlyph.cumsum]);
            this.prog.set_texture('u_dash_atlas', this.dash_atlas.tex);
            // Handle transformation to device coordinates
            const baked_offset = mainGlGlyph._baked_offset;
            this.prog.set_uniform('u_pixel_ratio', 'float', [trans.pixel_ratio]);
            this.prog.set_uniform('u_canvas_size', 'vec2', [trans.width, trans.height]);
            this.prog.set_uniform('u_offset', 'vec2', [trans.dx - baked_offset[0], trans.dy - baked_offset[1]]);
            this.prog.set_uniform('u_scale_aspect', 'vec2', [sx, sy]);
            this.prog.set_uniform('u_scale_length', 'float', [scale_length]);
            this.I_triangles = mainGlGlyph.I_triangles;
            if (this.I_triangles.length < 65535) {
                // Data is small enough to draw in one pass
                this.index_buffer.set_size(this.I_triangles.length * 2);
                this.index_buffer.set_data(0, new Uint16Array(this.I_triangles));
                this.prog.draw(this.gl.TRIANGLES, this.index_buffer);
                // @prog.draw(@gl.LINE_STRIP, @index_buffer)  # Use this to draw the line skeleton
            }
            else {
                // Work around the limit that the indexbuffer must be uint16. We draw in chunks.
                // First collect indices in chunks
                indices = Array.from(this.I_triangles);
                const nvertices = this.I_triangles.length;
                const chunksize = 64008; // 65536 max. 64008 is divisible by 12
                const chunks = [];
                for (let i = 0, end = Math.ceil(nvertices / chunksize); i < end; i++) {
                    chunks.push([]);
                }
                for (let i = 0, end = indices.length; i < end; i++) {
                    const uint16_index = indices[i] % chunksize;
                    const chunk = Math.floor(indices[i] / chunksize);
                    chunks[chunk].push(uint16_index);
                }
                // Then draw each chunk
                for (let chunk = 0, end = chunks.length; chunk < end; chunk++) {
                    const these_indices = new Uint16Array(chunks[chunk]);
                    const offset = chunk * chunksize * 4;
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
                    this.prog.draw(this.gl.TRIANGLES, this.index_buffer);
                }
            }
        }
        _set_data() {
            this._bake();
            this.vbo_position.set_size(this.V_position.length * 4);
            this.vbo_position.set_data(0, this.V_position);
            this.vbo_tangents.set_size(this.V_tangents.length * 4);
            this.vbo_tangents.set_data(0, this.V_tangents);
            this.vbo_angles.set_size(this.V_angles.length * 4);
            this.vbo_angles.set_data(0, this.V_angles);
            this.vbo_texcoord.set_size(this.V_texcoord.length * 4);
            this.vbo_texcoord.set_data(0, this.V_texcoord);
        }
        _set_visuals() {
            const color = color_1.color2rgba(this.glyph.visuals.line.line_color.value(), this.glyph.visuals.line.line_alpha.value());
            const cap = caps[this.glyph.visuals.line.line_cap.value()];
            const join = joins[this.glyph.visuals.line.line_join.value()];
            this.prog.set_uniform('u_color', 'vec4', color);
            this.prog.set_uniform('u_linewidth', 'float', [this.glyph.visuals.line.line_width.value()]);
            this.prog.set_uniform('u_antialias', 'float', [0.9]); // Smaller aa-region to obtain crisper images
            this.prog.set_uniform('u_linecaps', 'vec2', [cap, cap]);
            this.prog.set_uniform('u_linejoin', 'float', [join]);
            this.prog.set_uniform('u_miter_limit', 'float', [10.0]); // 10 should be a good value
            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-miterlimit
            const dash_pattern = this.glyph.visuals.line.line_dash.value();
            let dash_index = 0;
            let dash_period = 1;
            if (dash_pattern.length) {
                [dash_index, dash_period] = this.dash_atlas.get_atlas_data(dash_pattern);
            }
            this.prog.set_uniform('u_dash_index', 'float', [dash_index]); // 0 means solid line
            this.prog.set_uniform('u_dash_phase', 'float', [this.glyph.visuals.line.line_dash_offset.value()]);
            this.prog.set_uniform('u_dash_period', 'float', [dash_period]);
            this.prog.set_uniform('u_dash_caps', 'vec2', [cap, cap]);
            this.prog.set_uniform('u_closed', 'float', [0]); // We dont do closed lines
        }
        _bake() {
            // This is what you get if you port 50 lines of numpy code to JS.
            // V_segment is handled in another method, because it depends on the aspect
            // ratio of the scale (The original paper/code assumed isotropic scaling).
            //
            // Buffer dtype from the Python implementation:
            //
            // self.vtype = np.dtype( [('a_position', 'f4', 2),
            //                         ('a_segment',  'f4', 2),
            //                         ('a_angles',   'f4', 2),
            //                         ('a_tangents', 'f4', 4),
            //                         ('a_texcoord', 'f4', 2) ])
            // Init array of implicit shape nx2
            let I, T, V_angles2, V_position2, V_tangents2, V_texcoord2, Vp, Vt;
            const n = this.nvertices;
            const _x = new Float64Array(this.glyph._x);
            const _y = new Float64Array(this.glyph._y);
            // Init vertex data
            const V_position = (Vp = new Float32Array(n * 2));
            //V_segment = new Float32Array(n*2)  # Done later
            const V_angles = new Float32Array(n * 2);
            const V_tangents = (Vt = new Float32Array(n * 4)); // mind the 4!
            // Position
            for (let i = 0, end = n; i < end; i++) {
                V_position[(i * 2) + 0] = _x[i] + this._baked_offset[0];
                V_position[(i * 2) + 1] = _y[i] + this._baked_offset[1];
            }
            // Tangents & norms (need tangents to calculate segments based on scale)
            this.tangents = (T = new Float32Array((n * 2) - 2));
            for (let i = 0, end = n - 1; i < end; i++) {
                T[(i * 2) + 0] = Vp[((i + 1) * 2) + 0] - Vp[(i * 2) + 0];
                T[(i * 2) + 1] = Vp[((i + 1) * 2) + 1] - Vp[(i * 2) + 1];
            }
            for (let i = 0, end = n - 1; i < end; i++) {
                // V['a_tangents'][+1:, :2] = T
                V_tangents[((i + 1) * 4) + 0] = T[(i * 2) + 0];
                V_tangents[((i + 1) * 4) + 1] = T[(i * 2) + 1];
                // V['a_tangents'][:-1, 2:] = T
                V_tangents[(i * 4) + 2] = T[(i * 2) + 0];
                V_tangents[(i * 4) + 3] = T[(i * 2) + 1];
            }
            // V['a_tangents'][0  , :2] = T[0]
            V_tangents[(0 * 4) + 0] = T[0];
            V_tangents[(0 * 4) + 1] = T[1];
            // V['a_tangents'][ -1, 2:] = T[-1]
            V_tangents[((n - 1) * 4) + 2] = T[((n - 2) * 2) + 0];
            V_tangents[((n - 1) * 4) + 3] = T[((n - 2) * 2) + 1];
            // Angles
            const A = new Float32Array(n);
            for (let i = 0, end = n; i < end; i++) {
                A[i] = Math.atan2((Vt[(i * 4) + 0] * Vt[(i * 4) + 3]) - (Vt[(i * 4) + 1] * Vt[(i * 4) + 2]), (Vt[(i * 4) + 0] * Vt[(i * 4) + 2]) + (Vt[(i * 4) + 1] * Vt[(i * 4) + 3]));
            }
            for (let i = 0, end = n - 1; i < end; i++) {
                V_angles[(i * 2) + 0] = A[i];
                V_angles[(i * 2) + 1] = A[i + 1];
            }
            // Step 1: A -- B -- C  =>  A -- B, B' -- C
            // Repeat our array 4 times
            const m = (4 * n) - 4;
            this.V_position = (V_position2 = new Float32Array(m * 2));
            this.V_angles = (V_angles2 = new Float32Array(m * 2));
            this.V_tangents = (V_tangents2 = new Float32Array(m * 4)); // mind the 4!
            this.V_texcoord = (V_texcoord2 = new Float32Array(m * 2));
            const o = 2;
            //
            // Arg, we really need an ndarray thing in JS :/
            for (let i = 0, end = n; i < end; i++) { // all nodes on the line
                for (let j = 0; j < 4; j++) { // the four quad vertices
                    for (let k = 0; k < 2; k++) { // xy
                        V_position2[((((i * 4) + j) - o) * 2) + k] = V_position[(i * 2) + k];
                        V_angles2[(((i * 4) + j) * 2) + k] = V_angles[(i * 2) + k];
                    } // no offset
                    for (let k = 0; k < 4; k++) {
                        V_tangents2[((((i * 4) + j) - o) * 4) + k] = V_tangents[(i * 4) + k];
                    }
                }
            }
            for (let i = 0, end = n; i < end; i++) {
                V_texcoord2[(((i * 4) + 0) * 2) + 0] = -1;
                V_texcoord2[(((i * 4) + 1) * 2) + 0] = -1;
                V_texcoord2[(((i * 4) + 2) * 2) + 0] = +1;
                V_texcoord2[(((i * 4) + 3) * 2) + 0] = +1;
                //
                V_texcoord2[(((i * 4) + 0) * 2) + 1] = -1;
                V_texcoord2[(((i * 4) + 1) * 2) + 1] = +1;
                V_texcoord2[(((i * 4) + 2) * 2) + 1] = -1;
                V_texcoord2[(((i * 4) + 3) * 2) + 1] = +1;
            }
            // Indices
            //I = np.resize( np.array([0,1,2,1,2,3], dtype=np.uint32), (n-1)*(2*3))
            //I += np.repeat( 4*np.arange(n-1), 6)
            const ni = (n - 1) * 6;
            this.I_triangles = (I = new Uint32Array(ni));
            // Order of indices is such that drawing as line_strip reveals the line skeleton
            // Might have implications on culling, if we ever turn that on.
            // Order in paper was: 0 1 2 1 2 3
            for (let i = 0, end = n; i < end; i++) {
                I[(i * 6) + 0] = 0 + (4 * i);
                I[(i * 6) + 1] = 1 + (4 * i);
                I[(i * 6) + 2] = 3 + (4 * i);
                I[(i * 6) + 3] = 2 + (4 * i);
                I[(i * 6) + 4] = 0 + (4 * i);
                I[(i * 6) + 5] = 3 + (4 * i);
            }
        }
        _update_scale(sx, sy) {
            // Update segment data and cumsum so the length along the line has the
            // scale aspect ratio in it. In the vertex shader we multiply with the
            // "isotropic part" of the scale.
            let V_segment2;
            const n = this.nvertices;
            const m = (4 * n) - 4;
            // Prepare arrays
            const T = this.tangents;
            const N = new Float32Array(n - 1);
            const V_segment = new Float32Array(n * 2); // Elements are initialized with 0
            this.V_segment = (V_segment2 = new Float32Array(m * 2));
            // Calculate vector lengths - with scale aspect ratio taken into account
            for (let i = 0, end = n - 1; i < end; i++) {
                N[i] = Math.sqrt(Math.pow(T[(i * 2) + 0] * sx, 2) + Math.pow(T[(i * 2) + 1] * sy, 2));
            }
            // Calculate Segments
            let cumsum = 0;
            for (let i = 0, end = n - 1; i < end; i++) {
                cumsum += N[i];
                V_segment[((i + 1) * 2) + 0] = cumsum;
                V_segment[(i * 2) + 1] = cumsum;
            }
            // Upscale (same loop as in _bake())
            for (let i = 0, end = n; i < end; i++) {
                for (let j = 0; j < 4; j++) {
                    for (let k = 0; k < 2; k++) {
                        V_segment2[(((i * 4) + j) * 2) + k] = V_segment[(i * 2) + k];
                    }
                }
            }
            // Update
            this.cumsum = cumsum; // L[-1] in Nico's code
            this.vbo_segment.set_size(this.V_segment.length * 4);
            this.vbo_segment.set_data(0, this.V_segment);
        }
    }
    exports.LineGLGlyph = LineGLGlyph;
    LineGLGlyph.__name__ = "LineGLGlyph";
},
354: /* gloo2/gloo2.js */ function _(require, module, exports) {
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
        }
        else if (Array.isArray(b)) {
            for (var i = 0; i < b.length; i++) {
                if (_pyfunc_equals(a, b[i]))
                    return true;
            }
            return false;
        }
        else if (b.constructor === Object) {
            for (var k in b) {
                if (a == k)
                    return true;
            }
            return false;
        }
        else if (b.constructor == String) {
            return b.indexOf(a) >= 0;
        }
        var e = Error('Not a container: ' + b);
        e.name = 'TypeError';
        throw e;
    };
    var _pyfunc_equals = function equals(a, b) {
        if (a == null || b == null) {
        }
        else if (Array.isArray(a) && Array.isArray(b)) {
            var i = 0, iseq = a.length == b.length;
            while (iseq && i < a.length) {
                iseq = equals(a[i], b[i]);
                i += 1;
            }
            return iseq;
        }
        else if (a.constructor === Object && b.constructor === Object) {
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
        if ((typeof ob === "undefined") ||
            (typeof window !== "undefined" && window === ob) ||
            (typeof global !== "undefined" && global === ob)) {
            throw "Class constructor is called as a function.";
        }
        for (var name in ob) {
            if (Object[name] === undefined &&
                typeof ob[name] === 'function' && !ob[name].nobind) {
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
        if (v === null || typeof v !== "object") {
            return v;
        }
        else if (v.length !== undefined) {
            return v.length ? v : false;
        }
        else if (v.byteLength !== undefined) {
            return v.byteLength ? v : false;
        }
        else if (v.constructor !== Object) {
            return true;
        }
        else {
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
        }
        else if (d !== undefined) {
            return d;
        }
        else {
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
        chars = (chars === undefined) ? ' \t\r\n' : chars;
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
    { /* if this_is_js() */
        console = window.console;
    }
    __version__ = "0.3";
    check_error = function (gl, when) {
        var e, err, err_3, errors, msg, stub1_seq, stub2_itr;
        when = (when === undefined) ? "periodic check" : when;
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
            if ((_pyfunc_equals(err, gl.NO_ERROR) || (_pyfunc_truthy(errors) && _pyfunc_equals(err, errors[errors.length - 1])))) {
                break;
            }
            _pymeth_append.call(errors, err);
        }
        if (errors.length) {
            msg = "";
            stub1_seq = errors;
            if ((typeof stub1_seq === "object") && (!Array.isArray(stub1_seq))) {
                stub1_seq = Object.keys(stub1_seq);
            }
            for (stub2_itr = 0; stub2_itr < stub1_seq.length; stub2_itr += 1) {
                e = stub1_seq[stub2_itr];
                msg = _pyfunc_add(msg, e);
            }
            err_3 = new Error('RuntimeError:' + ("OpenGL got errors (" + when + "): " + msg + ""));
            err_3.name = "RuntimeError";
            throw err_3;
        }
        return null;
    };
    GlooObject = function () {
        // Abstract base class for all Gloo classes.
        _pyfunc_instantiate(this, arguments);
    };
    GlooObject.prototype._base_class = Object;
    GlooObject.prototype._class_name = "GlooObject";
    GlooObject.prototype.__init__ = function (gl) {
        // Init by passing the webgl context object.
        this._gl = gl;
        this.handle = null;
        this._create();
        if (!(this.handle !== null)) {
            throw "AssertionError: " + "this.handle !== null";
        }
        return null;
    };
    GlooObject.prototype._create = function () {
        var err_2;
        err_2 = new Error('NotImplementedError:' + "");
        err_2.name = "NotImplementedError";
        throw err_2;
        return null;
    };
    Program = function () {
        // The program is the central component to connect gloo objects and shaders.
        _pyfunc_instantiate(this, arguments);
    };
    Program.prototype = Object.create(GlooObject.prototype);
    Program.prototype._base_class = GlooObject.prototype;
    Program.prototype._class_name = "Program";
    Program.prototype.UTYPEMAP = { "float": "uniform1fv", "vec2": "uniform2fv", "vec3": "uniform3fv", "vec4": "uniform4fv", "int": "uniform1iv", "ivec2": "uniform2iv", "ivec3": "uniform3iv", "ivec4": "uniform4iv", "bool": "uniform1iv", "bvec2": "uniform2iv", "bvec3": "uniform3iv", "bvec4": "uniform4iv", "mat2": "uniformMatrix2fv", "mat3": "uniformMatrix3fv", "mat4": "uniformMatrix4fv", "sampler1D": "uniform1i", "sampler2D": "uniform1i", "sampler3D": "uniform1i" };
    Program.prototype.ATYPEMAP = { "float": "vertexAttrib1f", "vec2": "vertexAttrib2f", "vec3": "vertexAttrib3f", "vec4": "vertexAttrib4f" };
    Program.prototype.ATYPEINFO = { "float": [1, 5126], "vec2": [2, 5126], "vec3": [3, 5126], "vec4": [4, 5126] };
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
        tmp = [[vert, vert_handle, "vertex"], [frag, frag_handle, "fragment"]];
        for (i = 0; i < 2; i += 1) {
            stub3_ = tmp[i];
            code = stub3_[0];
            handle = stub3_[1];
            type_ = stub3_[2];
            gl.shaderSource(handle, code);
            gl.compileShader(handle);
            status = gl.getShaderParameter(handle, gl.COMPILE_STATUS);
            if ((!_pyfunc_truthy(status))) {
                errors = gl.getShaderInfoLog(handle);
                err_4 = new Error('RuntimeError:' + (_pyfunc_add((("errors in " + type_) + " shader:\n"), errors)));
                err_4.name = "RuntimeError";
                throw err_4;
            }
        }
        gl.attachShader(this.handle, vert_handle);
        gl.attachShader(this.handle, frag_handle);
        gl.linkProgram(this.handle);
        if ((!_pyfunc_truthy(gl.getProgramParameter(this.handle, gl.LINK_STATUS)))) {
            err_3 = new Error('RuntimeError:' + ("Program link error:\n" + gl.getProgramInfoLog(this.handle)));
            err_3.name = "RuntimeError";
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
        regex = new window.RegExp("(\\w+)\\s*(\\[(\\d+)\\])\\s*");
        cu = gl.getProgramParameter(this.handle, gl.ACTIVE_UNIFORMS);
        ca = gl.getProgramParameter(this.handle, gl.ACTIVE_ATTRIBUTES);
        attributes = [];
        uniforms = [];
        stub5_seq = [[attributes, ca, gl.getActiveAttrib, gl.getAttribLocation], [uniforms, cu, gl.getActiveUniform, gl.getUniformLocation]];
        if ((typeof stub5_seq === "object") && (!Array.isArray(stub5_seq))) {
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
                        _pymeth_append.call(container, (["" + name + "[" + j + "]", info.type]));
                    }
                }
                else {
                    _pymeth_append.call(container, [name, info.type]);
                }
                this.locations[name] = getLocation.call(gl, this.handle, name);
            }
        }
        return _pyfunc_add(((function list_comprehenson() { var res = []; var v, iter0, i0; iter0 = attributes; if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {
            iter0 = Object.keys(iter0);
        } for (i0 = 0; i0 < iter0.length; i0++) {
            v = iter0[i0];
            {
                res.push(v[0]);
            }
        } return res; }).apply(this)), ((function list_comprehenson() { var res = []; var v, iter0, i0; iter0 = uniforms; if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {
            iter0 = Object.keys(iter0);
        } for (i0 = 0; i0 < iter0.length; i0++) {
            v = iter0[i0];
            {
                res.push(v[0]);
            }
        } return res; }).apply(this)));
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
        if ((!_pyfunc_truthy(this._linked))) {
            err_3 = new Error('RuntimeError:' + "Cannot set uniform when program has no code");
            err_3.name = "RuntimeError";
            throw err_3;
        }
        handle = _pymeth_get.call(this.locations, name, (-1));
        if (_pyfunc_truthy(handle < 0)) {
            if ((!_pyfunc_contains(name, this._known_invalid))) {
                _pymeth_append.call(this._known_invalid, name);
                console.log("Variable " + name + " is not an active texture");
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
            this._samplers[name] = [value._target, value.handle, unit];
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
        if ((!_pyfunc_truthy(this._linked))) {
            err_3 = new Error('RuntimeError:' + "Cannot set uniform when program has no code");
            err_3.name = "RuntimeError";
            throw err_3;
        }
        handle = _pymeth_get.call(this.locations, name, (-1));
        if (_pyfunc_truthy(handle < 0)) {
            if ((!_pyfunc_contains(name, this._known_invalid))) {
                _pymeth_append.call(this._known_invalid, name);
                console.log("Variable " + name + " is not an active uniform");
            }
            return null;
        }
        if (_pyfunc_contains(name, this._unset_variables)) {
            _pymeth_remove.call(this._unset_variables, name);
        }
        count = 1;
        if ((!_pymeth_startswith.call(type_, "mat"))) {
            a_type = _pymeth_get.call({ "int": "float", "bool": "float" }, type_, _pymeth_lstrip.call(type_, "ib"));
            count = Math.floor(value.length / (this.ATYPEINFO[a_type][0]));
        }
        if (_pyfunc_truthy(count > 1)) {
            for (j = 0; j < count; j += 1) {
                if ((_pyfunc_contains(("" + name + "[" + j + "]"), this._unset_variables))) {
                    name_ = "" + name + "[" + j + "]";
                    if (_pyfunc_contains(name_, this._unset_variables)) {
                        _pymeth_remove.call(this._unset_variables, name_);
                    }
                }
            }
        }
        funcname = this.UTYPEMAP[type_];
        this.activate();
        if (_pymeth_startswith.call(type_, "mat")) {
            this._gl[funcname](handle, false, value);
        }
        else {
            this._gl[funcname](handle, value);
        }
        return null;
    };
    Program.prototype.set_attribute = function (name, type_, value, stride, offset) {
        var args, err_3, funcname, gtype, handle, is_vbo, size, stub7_;
        stride = (stride === undefined) ? 0 : stride;
        offset = (offset === undefined) ? 0 : offset;
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
        if ((!_pyfunc_truthy(this._linked))) {
            err_3 = new Error('RuntimeError:' + "Cannot set attribute when program has no code");
            err_3.name = "RuntimeError";
            throw err_3;
        }
        is_vbo = value instanceof VertexBuffer;
        handle = _pymeth_get.call(this.locations, name, (-1));
        if (_pyfunc_truthy(handle < 0)) {
            if ((!_pyfunc_contains(name, this._known_invalid))) {
                _pymeth_append.call(this._known_invalid, name);
                if ((_pyfunc_truthy(is_vbo) && _pyfunc_truthy(offset > 0))) {
                }
                else {
                    console.log("Variable " + name + " is not an active attribute");
                }
            }
            return null;
        }
        if (_pyfunc_contains(name, this._unset_variables)) {
            _pymeth_remove.call(this._unset_variables, name);
        }
        this.activate();
        if ((!_pyfunc_truthy(is_vbo))) {
            funcname = this.ATYPEMAP[type_];
            this._attributes[name] = [0, handle, funcname, value];
        }
        else {
            stub7_ = this.ATYPEINFO[type_];
            size = stub7_[0];
            gtype = stub7_[1];
            funcname = "vertexAttribPointer";
            args = [size, gtype, this._gl.FALSE, stride, offset];
            this._attributes[name] = [value.handle, handle, funcname, args];
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
            }
            else {
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
                this._gl.disableVertexAttribArray(attr_handle);
                this._gl[funcname].apply(this._gl, [].concat([attr_handle], args));
            }
        }
        if ((!_pyfunc_truthy(this._validated))) {
            this._validated = true;
            this._validate();
        }
        return null;
    };
    Program.prototype._validate = function () {
        var err_3;
        if (this._unset_variables.length) {
            console.log("Program has unset variables: " + this._unset_variables + "");
        }
        this._gl.validateProgram(this.handle);
        if ((!_pyfunc_truthy(this._gl.getProgramParameter(this.handle, this._gl.VALIDATE_STATUS)))) {
            console.log(this._gl.getProgramInfoLog(this.handle));
            err_3 = new Error('RuntimeError:' + "Program validation error");
            err_3.name = "RuntimeError";
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
        if ((!_pyfunc_truthy(this._linked))) {
            err_3 = new Error('RuntimeError:' + "Cannot draw program if code has not been set");
            err_3.name = "RuntimeError";
            throw err_3;
        }
        check_error(this._gl, "before draw");
        if (_pyfunc_truthy(selection instanceof IndexBuffer)) {
            this._pre_draw();
            selection.activate();
            count = selection._buffer_size / 2;
            gtype = this._gl.UNSIGNED_SHORT;
            this._gl.drawElements(mode, count, gtype, 0);
            selection.deactivate();
        }
        else {
            stub12_ = selection;
            first = stub12_[0];
            count = stub12_[1];
            if (_pyfunc_truthy(count)) {
                this._pre_draw();
                this._gl.drawArrays(mode, first, count);
            }
        }
        check_error(this._gl, "after draw");
        return null;
    };
    Buffer = function () {
        // Base buffer class for vertex data or index data.
        _pyfunc_instantiate(this, arguments);
    };
    Buffer.prototype = Object.create(GlooObject.prototype);
    Buffer.prototype._base_class = GlooObject.prototype;
    Buffer.prototype._class_name = "Buffer";
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
        if ((!_pyfunc_equals(nbytes, this._buffer_size))) {
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
    VertexBuffer.prototype._class_name = "VertexBuffer";
    VertexBuffer.prototype._target = 34962;
    IndexBuffer = function () {
        // A buffer for index data.
        _pyfunc_instantiate(this, arguments);
    };
    IndexBuffer.prototype = Object.create(Buffer.prototype);
    IndexBuffer.prototype._base_class = Buffer.prototype;
    IndexBuffer.prototype._class_name = "IndexBuffer";
    IndexBuffer.prototype._target = 34963;
    Texture2D = function () {
        // A 2 dimensional regular grid.
        _pyfunc_instantiate(this, arguments);
    };
    Texture2D.prototype = Object.create(GlooObject.prototype);
    Texture2D.prototype._base_class = GlooObject.prototype;
    Texture2D.prototype._class_name = "Texture2D";
    Texture2D.prototype._target = 3553;
    Texture2D.prototype._types = { "Int8Array": 5120, "Uint8Array": 5121, "Int16Array": 5122, "Uint16Array": 5123, "Int32Array": 5124, "Uint32Array": 5125, "Float32Array": 5126 };
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
        alignments = [4, 8, 2, 1];
        stub13_seq = alignments;
        if ((typeof stub13_seq === "object") && (!Array.isArray(stub13_seq))) {
            stub13_seq = Object.keys(stub13_seq);
        }
        for (stub14_itr = 0; stub14_itr < stub13_seq.length; stub14_itr += 1) {
            alignment = stub13_seq[stub14_itr];
            if ((_pyfunc_equals((width % alignment), 0))) {
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
        if ((!_pyfunc_equals([height, width, format], this._shape_format))) {
            this._shape_format = [height, width, format];
            this.activate();
            this._gl.texImage2D(this._target, 0, format, width, height, 0, format, this._gl.UNSIGNED_BYTE, null);
        }
        this.u_shape = [height, width];
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
            shape = [shape[0], shape[1], 1];
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
        if ((gtype === null)) {
            err_3 = new Error('ValueError:' + ("Type " + data.constructor.name + " not allowed for texture"));
            err_3.name = "ValueError";
            throw err_3;
        }
        alignment = this._get_alignment(_pyfunc_mult(shape[shape.length - 2], shape[shape.length - 1]));
        if ((!_pyfunc_equals(alignment, 4))) {
            this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, alignment);
        }
        this._gl.texSubImage2D(this._target, 0, x, y, width, height, format, gtype, data);
        if ((!_pyfunc_equals(alignment, 4))) {
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
    Texture3DLike.prototype._class_name = "Texture3DLike";
    Texture3DLike.prototype.GLSL_SAMPLE_NEAREST = "\n        vec4 sample3D(sampler2D tex, vec3 texcoord, vec3 shape, vec2 tiles) {\n            shape.xyz = shape.zyx;  // silly row-major convention\n            float nrows = tiles.y, ncols = tiles.x;\n            // Don't let adjacent frames be interpolated into this one\n            texcoord.x = min(texcoord.x * shape.x, shape.x - 0.5);\n            texcoord.x = max(0.5, texcoord.x) / shape.x;\n            texcoord.y = min(texcoord.y * shape.y, shape.y - 0.5);\n            texcoord.y = max(0.5, texcoord.y) / shape.y;\n\n            float zindex = floor(texcoord.z * shape.z);\n\n            // Do a lookup in the 2D texture\n            float u = (mod(zindex, ncols) + texcoord.x) / ncols;\n            float v = (floor(zindex / ncols) + texcoord.y) / nrows;\n\n            return texture2D(tex, vec2(u,v));\n        }\n    ";
    Texture3DLike.prototype.GLSL_SAMPLE_LINEAR = "\n        vec4 sample3D(sampler2D tex, vec3 texcoord, vec3 shape, vec2 tiles) {\n            shape.xyz = shape.zyx;  // silly row-major convention\n            float nrows = tiles.y, ncols = tiles.x;\n            // Don't let adjacent frames be interpolated into this one\n            texcoord.x = min(texcoord.x * shape.x, shape.x - 0.5);\n            texcoord.x = max(0.5, texcoord.x) / shape.x;\n            texcoord.y = min(texcoord.y * shape.y, shape.y - 0.5);\n            texcoord.y = max(0.5, texcoord.y) / shape.y;\n\n            float z = texcoord.z * shape.z;\n            float zindex1 = floor(z);\n            float u1 = (mod(zindex1, ncols) + texcoord.x) / ncols;\n            float v1 = (floor(zindex1 / ncols) + texcoord.y) / nrows;\n\n            float zindex2 = zindex1 + 1.0;\n            float u2 = (mod(zindex2, ncols) + texcoord.x) / ncols;\n            float v2 = (floor(zindex2 / ncols) + texcoord.y) / nrows;\n\n            vec4 s1 = texture2D(tex, vec2(u1, v1));\n            vec4 s2 = texture2D(tex, vec2(u2, v2));\n\n            return s1 * (zindex2 - z) + s2 * (z - zindex1);\n        }\n    ";
    Texture3DLike.prototype._get_tile_info = function (shape) {
        var err_3, max_size, ncols, nrows;
        max_size = this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE);
        nrows = Math.floor(max_size / shape[1]);
        nrows = Math.min(nrows, shape[0]);
        ncols = window.Math.ceil(shape[0] / nrows);
        if (_pyfunc_truthy(_pyfunc_mult(ncols, shape[2]) > max_size)) {
            err_3 = new Error('RuntimeError:' + ("Cannot fit 3D data with shape " + shape + " onto simulated 2D texture."));
            err_3.name = "RuntimeError";
            throw err_3;
        }
        return [nrows, ncols];
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
        sim_shape = [_pyfunc_mult(shape[1], nrows), _pyfunc_mult(shape[2], ncols)];
        Texture3DLike.prototype._base_class.set_size.call(this, sim_shape, format);
        this.u_shape = [shape[0], shape[1], shape[2]];
        this.u_tiles = [ncols, nrows];
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
            shape = [shape[0], shape[1], shape[2], 1];
        }
        if ((!(_pyfunc_all(((function list_comprehenson() { var res = []; var i, iter0, i0; iter0 = offset; if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {
            iter0 = Object.keys(iter0);
        } for (i0 = 0; i0 < iter0.length; i0++) {
            i = iter0[i0];
            {
                res.push(_pyfunc_equals(i, 0));
            }
        } return res; }).apply(this)))))) {
            err_3 = new Error('ValueError:' + "Texture3DLike does not support nonzero offset (for now)");
            err_3.name = "ValueError";
            throw err_3;
        }
        stub19_ = this._get_tile_info(shape);
        nrows = stub19_[0];
        ncols = stub19_[1];
        sim_shape = [_pyfunc_mult(shape[1], nrows), _pyfunc_mult(shape[2], ncols), shape[3]];
        if (_pyfunc_equals(ncols, 1)) {
            Texture3DLike.prototype._base_class.set_data.call(this, [0, 0], sim_shape, data);
        }
        else {
            Type = data.constructor;
            zeros = new Type(_pyfunc_mult(_pyfunc_mult(sim_shape[0], sim_shape[1]), sim_shape[2]));
            Texture3DLike.prototype._base_class.set_data.call(this, [0, 0], sim_shape, zeros);
            for (z = 0; z < shape[0]; z += 1) {
                stub20_ = [Math.floor(z / ncols), z % ncols];
                row = stub20_[0];
                col = stub20_[1];
                elements_per_tile = Math.floor(data.length / shape[0]);
                tile = data.slice(_pyfunc_mult(z, elements_per_tile), _pyfunc_mult((z + 1), elements_per_tile));
                Texture3DLike.prototype._base_class.set_data.call(this, [_pyfunc_mult(row, shape[1]), _pyfunc_mult(col, shape[2])], shape.slice(1), tile);
            }
        }
        return null;
    };
    module.exports = {
        "Buffer": Buffer,
        "GlooObject": GlooObject,
        "IndexBuffer": IndexBuffer,
        "Program": Program,
        "Texture2D": Texture2D,
        "Texture3DLike": Texture3DLike,
        "VertexBuffer": VertexBuffer,
        "check_error": check_error,
        "console": console
    };
},
355: /* models/glyphs/webgl/base.js */ function _(require, module, exports) {
    const color_1 = require(20) /* ../../../core/util/color */;
    const logging_1 = require(65) /* ../../../core/logging */;
    class BaseGLGlyph {
        constructor(gl, glyph) {
            this.gl = gl;
            this.glyph = glyph;
            this.nvertices = 0;
            this.size_changed = false;
            this.data_changed = false;
            this.visuals_changed = false;
            this.init();
        }
        set_data_changed(n) {
            if (n != this.nvertices) {
                this.nvertices = n;
                this.size_changed = true;
            }
            this.data_changed = true;
        }
        set_visuals_changed() {
            this.visuals_changed = true;
        }
        render(_ctx, indices, mainglyph) {
            // Get transform
            const [a, b, c] = [0, 1, 2];
            let wx = 1; // Weights to scale our vectors
            let wy = 1;
            let [dx, dy] = this.glyph.renderer.map_to_screen([a * wx, b * wx, c * wx], [a * wy, b * wy, c * wy]);
            if (isNaN(dx[0] + dx[1] + dx[2] + dy[0] + dy[1] + dy[2])) {
                logging_1.logger.warn(`WebGL backend (${this.glyph.model.type}): falling back to canvas rendering`);
                return false;
            }
            // Try again, but with weighs so we're looking at ~100 in screen coordinates
            wx = 100 / Math.min(Math.max(Math.abs(dx[1] - dx[0]), 1e-12), 1e12);
            wy = 100 / Math.min(Math.max(Math.abs(dy[1] - dy[0]), 1e-12), 1e12);
            [dx, dy] = this.glyph.renderer.map_to_screen([a * wx, b * wx, c * wx], [a * wy, b * wy, c * wy]);
            // Test how linear it is
            if ((Math.abs((dx[1] - dx[0]) - (dx[2] - dx[1])) > 1e-6) ||
                (Math.abs((dy[1] - dy[0]) - (dy[2] - dy[1])) > 1e-6)) {
                logging_1.logger.warn(`WebGL backend (${this.glyph.model.type}): falling back to canvas rendering`);
                return false;
            }
            const [sx, sy] = [(dx[1] - dx[0]) / wx, (dy[1] - dy[0]) / wy];
            const { width, height } = this.glyph.renderer.plot_view.gl.canvas;
            const trans = {
                pixel_ratio: this.glyph.renderer.plot_view.canvas.pixel_ratio,
                width, height,
                dx: dx[0] / sx, dy: dy[0] / sy, sx, sy,
            };
            this.draw(indices, mainglyph, trans);
            return true;
        }
    }
    exports.BaseGLGlyph = BaseGLGlyph;
    BaseGLGlyph.__name__ = "BaseGLGlyph";
    function line_width(width) {
        // Increase small values to make it more similar to canvas
        if (width < 2) {
            width = Math.sqrt(width * 2);
        }
        return width;
    }
    exports.line_width = line_width;
    function fill_array_with_float(n, val) {
        const a = new Float32Array(n);
        for (let i = 0, end = n; i < end; i++) {
            a[i] = val;
        }
        return a;
    }
    exports.fill_array_with_float = fill_array_with_float;
    function fill_array_with_vec(n, m, val) {
        const a = new Float32Array(n * m);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                a[i * m + j] = val[j];
            }
        }
        return a;
    }
    exports.fill_array_with_vec = fill_array_with_vec;
    function visual_prop_is_singular(visual, propname) {
        // This touches the internals of the visual, so we limit use in this function
        // See renderer.ts:cache_select() for similar code
        return visual[propname].spec.value !== undefined;
    }
    exports.visual_prop_is_singular = visual_prop_is_singular;
    function attach_float(prog, vbo, att_name, n, visual, name) {
        // Attach a float attribute to the program. Use singleton value if we can,
        // otherwise use VBO to apply array.
        if (!visual.doit) {
            vbo.used = false;
            prog.set_attribute(att_name, 'float', [0]);
        }
        else if (visual_prop_is_singular(visual, name)) {
            vbo.used = false;
            prog.set_attribute(att_name, 'float', visual[name].value());
        }
        else {
            vbo.used = true;
            const a = new Float32Array(visual.cache[name + '_array']);
            vbo.set_size(n * 4);
            vbo.set_data(0, a);
            prog.set_attribute(att_name, 'float', vbo);
        }
    }
    exports.attach_float = attach_float;
    function attach_color(prog, vbo, att_name, n, visual, prefix) {
        // Attach the color attribute to the program. If there's just one color,
        // then use this single color for all vertices (no VBO). Otherwise we
        // create an array and upload that to the VBO, which we attahce to the prog.
        let rgba;
        const m = 4;
        const colorname = prefix + '_color';
        const alphaname = prefix + '_alpha';
        if (!visual.doit) {
            // Don't draw (draw transparent)
            vbo.used = false;
            prog.set_attribute(att_name, 'vec4', [0, 0, 0, 0]);
        }
        else if (visual_prop_is_singular(visual, colorname) && visual_prop_is_singular(visual, alphaname)) {
            // Nice and simple; both color and alpha are singular
            vbo.used = false;
            rgba = color_1.color2rgba(visual[colorname].value(), visual[alphaname].value());
            prog.set_attribute(att_name, 'vec4', rgba);
        }
        else {
            // Use vbo; we need an array for both the color and the alpha
            let alphas, colors;
            vbo.used = true;
            // Get array of colors
            if (visual_prop_is_singular(visual, colorname)) {
                colors = ((() => {
                    const result = [];
                    for (let i = 0, end = n; i < end; i++) {
                        result.push(visual[colorname].value());
                    }
                    return result;
                })());
            }
            else {
                colors = visual.cache[colorname + '_array'];
            }
            // Get array of alphas
            if (visual_prop_is_singular(visual, alphaname)) {
                alphas = fill_array_with_float(n, visual[alphaname].value());
            }
            else {
                alphas = visual.cache[alphaname + '_array'];
            }
            // Create array of rgbs
            const a = new Float32Array(n * m);
            for (let i = 0, end = n; i < end; i++) {
                rgba = color_1.color2rgba(colors[i], alphas[i]);
                for (let j = 0, endj = m; j < endj; j++) {
                    a[(i * m) + j] = rgba[j];
                }
            }
            // Attach vbo
            vbo.set_size(n * m * 4);
            vbo.set_data(0, a);
            prog.set_attribute(att_name, 'vec4', vbo);
        }
    }
    exports.attach_color = attach_color;
},
356: /* models/glyphs/webgl/line.vert.js */ function _(require, module, exports) {
    exports.vertex_shader = `
precision mediump float;

const float PI = 3.14159265358979323846264;
const float THETA = 15.0 * 3.14159265358979323846264/180.0;

uniform float u_pixel_ratio;
uniform vec2 u_canvas_size, u_offset;
uniform vec2 u_scale_aspect;
uniform float u_scale_length;

uniform vec4 u_color;
uniform float u_antialias;
uniform float u_length;
uniform float u_linewidth;
uniform float u_dash_index;
uniform float u_closed;

attribute vec2 a_position;
attribute vec4 a_tangents;
attribute vec2 a_segment;
attribute vec2 a_angles;
attribute vec2 a_texcoord;

varying vec4  v_color;
varying vec2  v_segment;
varying vec2  v_angles;
varying vec2  v_texcoord;
varying vec2  v_miter;
varying float v_length;
varying float v_linewidth;

float cross(in vec2 v1, in vec2 v2)
{
    return v1.x*v2.y - v1.y*v2.x;
}

float signed_distance(in vec2 v1, in vec2 v2, in vec2 v3)
{
    return cross(v2-v1,v1-v3) / length(v2-v1);
}

void rotate( in vec2 v, in float alpha, out vec2 result )
{
    float c = cos(alpha);
    float s = sin(alpha);
    result = vec2( c*v.x - s*v.y,
                   s*v.x + c*v.y );
}

void main()
{
    bool closed = (u_closed > 0.0);

    // Attributes and uniforms to varyings
    v_color = u_color;
    v_linewidth = u_linewidth;
    v_segment = a_segment * u_scale_length;
    v_length = u_length * u_scale_length;

    // Scale to map to pixel coordinates. The original algorithm from the paper
    // assumed isotropic scale. We obviously do not have this.
    vec2 abs_scale_aspect = abs(u_scale_aspect);
    vec2 abs_scale = u_scale_length * abs_scale_aspect;

    // Correct angles for aspect ratio
    vec2 av;
    av = vec2(1.0, tan(a_angles.x)) / abs_scale_aspect;
    v_angles.x = atan(av.y, av.x);
    av = vec2(1.0, tan(a_angles.y)) / abs_scale_aspect;
    v_angles.y = atan(av.y, av.x);

    // Thickness below 1 pixel are represented using a 1 pixel thickness
    // and a modified alpha
    v_color.a = min(v_linewidth, v_color.a);
    v_linewidth = max(v_linewidth, 1.0);

    // If color is fully transparent we just will discard the fragment anyway
    if( v_color.a <= 0.0 ) {
        gl_Position = vec4(0.0,0.0,0.0,1.0);
        return;
    }

    // This is the actual half width of the line
    float w = ceil(u_antialias+v_linewidth)/2.0;

    vec2 position = (a_position + u_offset) * abs_scale;

    vec2 t1 = normalize(a_tangents.xy * abs_scale_aspect);  // note the scaling for aspect ratio here
    vec2 t2 = normalize(a_tangents.zw * abs_scale_aspect);
    float u = a_texcoord.x;
    float v = a_texcoord.y;
    vec2 o1 = vec2( +t1.y, -t1.x);
    vec2 o2 = vec2( +t2.y, -t2.x);

    // This is a join
    // ----------------------------------------------------------------
    if( t1 != t2 ) {
        float angle = atan (t1.x*t2.y-t1.y*t2.x, t1.x*t2.x+t1.y*t2.y);  // Angle needs recalculation for some reason
        vec2 t  = normalize(t1+t2);
        vec2 o  = vec2( + t.y, - t.x);

        if ( u_dash_index > 0.0 )
        {
            // Broken angle
            // ----------------------------------------------------------------
            if( (abs(angle) > THETA) ) {
                position += v * w * o / cos(angle/2.0);
                float s = sign(angle);
                if( angle < 0.0 ) {
                    if( u == +1.0 ) {
                        u = v_segment.y + v * w * tan(angle/2.0);
                        if( v == 1.0 ) {
                            position -= 2.0 * w * t1 / sin(angle);
                            u -= 2.0 * w / sin(angle);
                        }
                    } else {
                        u = v_segment.x - v * w * tan(angle/2.0);
                        if( v == 1.0 ) {
                            position += 2.0 * w * t2 / sin(angle);
                            u += 2.0*w / sin(angle);
                        }
                    }
                } else {
                    if( u == +1.0 ) {
                        u = v_segment.y + v * w * tan(angle/2.0);
                        if( v == -1.0 ) {
                            position += 2.0 * w * t1 / sin(angle);
                            u += 2.0 * w / sin(angle);
                        }
                    } else {
                        u = v_segment.x - v * w * tan(angle/2.0);
                        if( v == -1.0 ) {
                            position -= 2.0 * w * t2 / sin(angle);
                            u -= 2.0*w / sin(angle);
                        }
                    }
                }
                // Continuous angle
                // ------------------------------------------------------------
            } else {
                position += v * w * o / cos(angle/2.0);
                if( u == +1.0 ) u = v_segment.y;
                else            u = v_segment.x;
            }
        }

        // Solid line
        // --------------------------------------------------------------------
        else
        {
            position.xy += v * w * o / cos(angle/2.0);
            if( angle < 0.0 ) {
                if( u == +1.0 ) {
                    u = v_segment.y + v * w * tan(angle/2.0);
                } else {
                    u = v_segment.x - v * w * tan(angle/2.0);
                }
            } else {
                if( u == +1.0 ) {
                    u = v_segment.y + v * w * tan(angle/2.0);
                } else {
                    u = v_segment.x - v * w * tan(angle/2.0);
                }
            }
        }

    // This is a line start or end (t1 == t2)
    // ------------------------------------------------------------------------
    } else {
        position += v * w * o1;
        if( u == -1.0 ) {
            u = v_segment.x - w;
            position -= w * t1;
        } else {
            u = v_segment.y + w;
            position += w * t2;
        }
    }

    // Miter distance
    // ------------------------------------------------------------------------
    vec2 t;
    vec2 curr = a_position * abs_scale;
    if( a_texcoord.x < 0.0 ) {
        vec2 next = curr + t2*(v_segment.y-v_segment.x);

        rotate( t1, +v_angles.x/2.0, t);
        v_miter.x = signed_distance(curr, curr+t, position);

        rotate( t2, +v_angles.y/2.0, t);
        v_miter.y = signed_distance(next, next+t, position);
    } else {
        vec2 prev = curr - t1*(v_segment.y-v_segment.x);

        rotate( t1, -v_angles.x/2.0,t);
        v_miter.x = signed_distance(prev, prev+t, position);

        rotate( t2, -v_angles.y/2.0,t);
        v_miter.y = signed_distance(curr, curr+t, position);
    }

    if (!closed && v_segment.x <= 0.0) {
        v_miter.x = 1e10;
    }
    if (!closed && v_segment.y >= v_length)
    {
        v_miter.y = 1e10;
    }

    v_texcoord = vec2( u, v*w );

    // Calculate position in device coordinates. Note that we
    // already scaled with abs scale above.
    vec2 normpos = position * sign(u_scale_aspect);
    normpos += 0.5;  // make up for Bokeh's offset
    normpos /= u_canvas_size / u_pixel_ratio;  // in 0..1
    gl_Position = vec4(normpos*2.0-1.0, 0.0, 1.0);
    gl_Position.y *= -1.0;
}
`;
},
357: /* models/glyphs/webgl/line.frag.js */ function _(require, module, exports) {
    exports.fragment_shader = `
precision mediump float;

const float PI = 3.14159265358979323846264;
const float THETA = 15.0 * 3.14159265358979323846264/180.0;

uniform sampler2D u_dash_atlas;

uniform vec2 u_linecaps;
uniform float u_miter_limit;
uniform float u_linejoin;
uniform float u_antialias;
uniform float u_dash_phase;
uniform float u_dash_period;
uniform float u_dash_index;
uniform vec2 u_dash_caps;
uniform float u_closed;

varying vec4  v_color;
varying vec2  v_segment;
varying vec2  v_angles;
varying vec2  v_texcoord;
varying vec2  v_miter;
varying float v_length;
varying float v_linewidth;

// Compute distance to cap ----------------------------------------------------
float cap( int type, float dx, float dy, float t, float linewidth )
{
    float d = 0.0;
    dx = abs(dx);
    dy = abs(dy);
    if      (type == 0)  discard;  // None
    else if (type == 1)  d = sqrt(dx*dx+dy*dy);  // Round
    else if (type == 3)  d = (dx+abs(dy));  // Triangle in
    else if (type == 2)  d = max(abs(dy),(t+dx-abs(dy)));  // Triangle out
    else if (type == 4)  d = max(dx,dy);  // Square
    else if (type == 5)  d = max(dx+t,dy);  // Butt
    return d;
}

// Compute distance to join -------------------------------------------------
float join( in int type, in float d, in vec2 segment, in vec2 texcoord, in vec2 miter,
           in float linewidth )
{
    // texcoord.x is distance from start
    // texcoord.y is distance from centerline
    // segment.x and y indicate the limits (as for texcoord.x) for this segment

    float dx = texcoord.x;

    // Round join
    if( type == 1 ) {
        if (dx < segment.x) {
            d = max(d,length( texcoord - vec2(segment.x,0.0)));
            //d = length( texcoord - vec2(segment.x,0.0));
        } else if (dx > segment.y) {
            d = max(d,length( texcoord - vec2(segment.y,0.0)));
            //d = length( texcoord - vec2(segment.y,0.0));
        }
    }
    // Bevel join
    else if ( type == 2 ) {
        if (dx < segment.x) {
            vec2 x = texcoord - vec2(segment.x,0.0);
            d = max(d, max(abs(x.x), abs(x.y)));

        } else if (dx > segment.y) {
            vec2 x = texcoord - vec2(segment.y,0.0);
            d = max(d, max(abs(x.x), abs(x.y)));
        }
        /*  Original code for bevel which does not work for us
        if( (dx < segment.x) ||  (dx > segment.y) )
            d = max(d, min(abs(x.x),abs(x.y)));
        */
    }

    return d;
}

void main()
{
    // If color is fully transparent we just discard the fragment
    if( v_color.a <= 0.0 ) {
        discard;
    }

    // Test if dash pattern is the solid one (0)
    bool solid =  (u_dash_index == 0.0);

    // Test if path is closed
    bool closed = (u_closed > 0.0);

    vec4 color = v_color;
    float dx = v_texcoord.x;
    float dy = v_texcoord.y;
    float t = v_linewidth/2.0-u_antialias;
    float width = 1.0;  //v_linewidth; original code had dashes scale with line width, we do not
    float d = 0.0;

    vec2 linecaps = u_linecaps;
    vec2 dash_caps = u_dash_caps;
    float line_start = 0.0;
    float line_stop = v_length;

    // Apply miter limit; fragments too far into the miter are simply discarded
    if( (dx < v_segment.x) || (dx > v_segment.y) ) {
        float into_miter = max(v_segment.x - dx, dx - v_segment.y);
        if (into_miter > u_miter_limit*v_linewidth/2.0)
          discard;
    }

    // Solid line --------------------------------------------------------------
    if( solid ) {
        d = abs(dy);
        if( (!closed) && (dx < line_start) ) {
            d = cap( int(u_linecaps.x), abs(dx), abs(dy), t, v_linewidth );
        }
        else if( (!closed) &&  (dx > line_stop) ) {
            d = cap( int(u_linecaps.y), abs(dx)-line_stop, abs(dy), t, v_linewidth );
        }
        else {
            d = join( int(u_linejoin), abs(dy), v_segment, v_texcoord, v_miter, v_linewidth );
        }

    // Dash line --------------------------------------------------------------
    } else {
        float segment_start = v_segment.x;
        float segment_stop  = v_segment.y;
        float segment_center= (segment_start+segment_stop)/2.0;
        float freq          = u_dash_period*width;
        float u = mod( dx + u_dash_phase*width, freq);
        vec4 tex = texture2D(u_dash_atlas, vec2(u/freq, u_dash_index)) * 255.0 -10.0;  // conversion to int-like
        float dash_center= tex.x * width;
        float dash_type  = tex.y;
        float _start = tex.z * width;
        float _stop  = tex.a * width;
        float dash_start = dx - u + _start;
        float dash_stop  = dx - u + _stop;

        // Compute extents of the first dash (the one relative to v_segment.x)
        // Note: this could be computed in the vertex shader
        if( (dash_stop < segment_start) && (dash_caps.x != 5.0) ) {
            float u = mod(segment_start + u_dash_phase*width, freq);
            vec4 tex = texture2D(u_dash_atlas, vec2(u/freq, u_dash_index)) * 255.0 -10.0;  // conversion to int-like
            dash_center= tex.x * width;
            //dash_type  = tex.y;
            float _start = tex.z * width;
            float _stop  = tex.a * width;
            dash_start = segment_start - u + _start;
            dash_stop = segment_start - u + _stop;
        }

        // Compute extents of the last dash (the one relatives to v_segment.y)
        // Note: This could be computed in the vertex shader
        else if( (dash_start > segment_stop)  && (dash_caps.y != 5.0) ) {
            float u = mod(segment_stop + u_dash_phase*width, freq);
            vec4 tex = texture2D(u_dash_atlas, vec2(u/freq, u_dash_index)) * 255.0 -10.0;  // conversion to int-like
            dash_center= tex.x * width;
            //dash_type  = tex.y;
            float _start = tex.z * width;
            float _stop  = tex.a * width;
            dash_start = segment_stop - u + _start;
            dash_stop  = segment_stop - u + _stop;
        }

        // This test if the we are dealing with a discontinuous angle
        bool discontinuous = ((dx <  segment_center) && abs(v_angles.x) > THETA) ||
                             ((dx >= segment_center) && abs(v_angles.y) > THETA);
        //if( dx < line_start) discontinuous = false;
        //if( dx > line_stop)  discontinuous = false;

        float d_join = join( int(u_linejoin), abs(dy),
                            v_segment, v_texcoord, v_miter, v_linewidth );

        // When path is closed, we do not have room for linecaps, so we make room
        // by shortening the total length
        if (closed) {
             line_start += v_linewidth/2.0;
             line_stop  -= v_linewidth/2.0;
        }

        // We also need to take antialias area into account
        //line_start += u_antialias;
        //line_stop  -= u_antialias;

        // Check is dash stop is before line start
        if( dash_stop <= line_start ) {
            discard;
        }
        // Check is dash start is beyond line stop
        if( dash_start >= line_stop ) {
            discard;
        }

        // Check if current dash start is beyond segment stop
        if( discontinuous ) {
            // Dash start is beyond segment, we discard
            if( (dash_start > segment_stop) ) {
                discard;
                //gl_FragColor = vec4(1.0,0.0,0.0,.25); return;
            }

            // Dash stop is before segment, we discard
            if( (dash_stop < segment_start) ) {
                discard;  //gl_FragColor = vec4(0.0,1.0,0.0,.25); return;
            }

            // Special case for round caps (nicer with this)
            if( dash_caps.x == 1.0 ) {
                if( (u > _stop) && (dash_stop > segment_stop )  && (abs(v_angles.y) < PI/2.0)) {
                    discard;
                }
            }

            // Special case for round caps  (nicer with this)
            if( dash_caps.y == 1.0 ) {
                if( (u < _start) && (dash_start < segment_start )  && (abs(v_angles.x) < PI/2.0)) {
                    discard;
                }
            }

            // Special case for triangle caps (in & out) and square
            // We make sure the cap stop at crossing frontier
            if( (dash_caps.x != 1.0) && (dash_caps.x != 5.0) ) {
                if( (dash_start < segment_start )  && (abs(v_angles.x) < PI/2.0) ) {
                    float a = v_angles.x/2.0;
                    float x = (segment_start-dx)*cos(a) - dy*sin(a);
                    float y = (segment_start-dx)*sin(a) + dy*cos(a);
                    if( x > 0.0 ) discard;
                    // We transform the cap into square to avoid holes
                    dash_caps.x = 4.0;
                }
            }

            // Special case for triangle caps (in & out) and square
            // We make sure the cap stop at crossing frontier
            if( (dash_caps.y != 1.0) && (dash_caps.y != 5.0) ) {
                if( (dash_stop > segment_stop )  && (abs(v_angles.y) < PI/2.0) ) {
                    float a = v_angles.y/2.0;
                    float x = (dx-segment_stop)*cos(a) - dy*sin(a);
                    float y = (dx-segment_stop)*sin(a) + dy*cos(a);
                    if( x > 0.0 ) discard;
                    // We transform the caps into square to avoid holes
                    dash_caps.y = 4.0;
                }
            }
        }

        // Line cap at start
        if( (dx < line_start) && (dash_start < line_start) && (dash_stop > line_start) ) {
            d = cap( int(linecaps.x), dx-line_start, dy, t, v_linewidth);
        }
        // Line cap at stop
        else if( (dx > line_stop) && (dash_stop > line_stop) && (dash_start < line_stop) ) {
            d = cap( int(linecaps.y), dx-line_stop, dy, t, v_linewidth);
        }
        // Dash cap left - dash_type = -1, 0 or 1, but there may be roundoff errors
        else if( dash_type < -0.5 ) {
            d = cap( int(dash_caps.y), abs(u-dash_center), dy, t, v_linewidth);
            if( (dx > line_start) && (dx < line_stop) )
                d = max(d,d_join);
        }
        // Dash cap right
        else if( dash_type > 0.5 ) {
            d = cap( int(dash_caps.x), abs(dash_center-u), dy, t, v_linewidth);
            if( (dx > line_start) && (dx < line_stop) )
                d = max(d,d_join);
        }
        // Dash body (plain)
        else {// if( dash_type > -0.5 &&  dash_type < 0.5) {
            d = abs(dy);
        }

        // Line join
        if( (dx > line_start) && (dx < line_stop)) {
            if( (dx <= segment_start) && (dash_start <= segment_start)
                && (dash_stop >= segment_start) ) {
                d = d_join;
                // Antialias at outer border
                float angle = PI/2.+v_angles.x;
                float f = abs( (segment_start - dx)*cos(angle) - dy*sin(angle));
                d = max(f,d);
            }
            else if( (dx > segment_stop) && (dash_start <= segment_stop)
                     && (dash_stop >= segment_stop) ) {
                d = d_join;
                // Antialias at outer border
                float angle = PI/2.+v_angles.y;
                float f = abs((dx - segment_stop)*cos(angle) - dy*sin(angle));
                d = max(f,d);
            }
            else if( dx < (segment_start - v_linewidth/2.)) {
                discard;
            }
            else if( dx > (segment_stop + v_linewidth/2.)) {
                discard;
            }
        }
        else if( dx < (segment_start - v_linewidth/2.)) {
            discard;
        }
        else if( dx > (segment_stop + v_linewidth/2.)) {
            discard;
        }
    }

    // Distance to border ------------------------------------------------------
    d = d - t;
    if( d < 0.0 ) {
        gl_FragColor = color;
    } else {
        d /= u_antialias;
        gl_FragColor = vec4(color.rgb, exp(-d*d)*color.a);
    }
}
`;
},
358: /* models/glyphs/webgl/markers.js */ function _(require, module, exports) {
    const gloo2_1 = require(354) /* gloo2 */;
    const base_1 = require(355) /* ./base */;
    const markers_vert_1 = require(359) /* ./markers.vert */;
    const markers_frag_1 = require(360) /* ./markers.frag */;
    const circle_1 = require(205) /* ../circle */;
    const arrayable_1 = require(11) /* ../../../core/util/arrayable */;
    const logging_1 = require(65) /* ../../../core/logging */;
    // Base class for markers. All markers share the same GLSL, except for one
    // function that defines the marker geometry.
    class MarkerGLGlyph extends base_1.BaseGLGlyph {
        init() {
            const { gl } = this;
            const vert = markers_vert_1.vertex_shader;
            const frag = markers_frag_1.fragment_shader(this._marker_code);
            // The program
            this.prog = new gloo2_1.Program(gl);
            this.prog.set_shaders(vert, frag);
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
            this.index_buffer = new gloo2_1.IndexBuffer(gl);
        }
        draw(indices, mainGlyph, trans) {
            // The main glyph has the data, *this* glyph has the visuals.
            const mainGlGlyph = mainGlyph.glglyph;
            const { nvertices } = mainGlGlyph;
            // Upload data if we must. Only happens for main glyph.
            if (mainGlGlyph.data_changed) {
                if (!(isFinite(trans.dx) && isFinite(trans.dy))) {
                    return; // not sure why, but it happens on init sometimes (#4367)
                }
                mainGlGlyph._baked_offset = [trans.dx, trans.dy]; // float32 precision workaround; used in _set_data() and below
                mainGlGlyph._set_data(nvertices);
                mainGlGlyph.data_changed = false;
            }
            else if (this.glyph instanceof circle_1.CircleView && this.glyph._radius != null &&
                (this.last_trans == null || trans.sx != this.last_trans.sx || trans.sy != this.last_trans.sy)) {
                // Keep screen radius up-to-date for circle glyph. Only happens when a radius is given
                this.last_trans = trans;
                this.vbo_s.set_data(0, new Float32Array(arrayable_1.map(this.glyph.sradius, (s) => s * 2)));
            }
            // Update visuals if we must. Can happen for all glyphs.
            if (this.visuals_changed) {
                this._set_visuals(nvertices);
                this.visuals_changed = false;
            }
            // Handle transformation to device coordinates
            // Note the baked-in offset to avoid float32 precision problems
            const baked_offset = mainGlGlyph._baked_offset;
            this.prog.set_uniform('u_pixel_ratio', 'float', [trans.pixel_ratio]);
            this.prog.set_uniform('u_canvas_size', 'vec2', [trans.width, trans.height]);
            this.prog.set_uniform('u_offset', 'vec2', [trans.dx - baked_offset[0], trans.dy - baked_offset[1]]);
            this.prog.set_uniform('u_scale', 'vec2', [trans.sx, trans.sy]);
            // Select buffers from main glyph
            // (which may be this glyph but maybe not if this is a (non)selection glyph)
            this.prog.set_attribute('a_x', 'float', mainGlGlyph.vbo_x);
            this.prog.set_attribute('a_y', 'float', mainGlGlyph.vbo_y);
            this.prog.set_attribute('a_size', 'float', mainGlGlyph.vbo_s);
            this.prog.set_attribute('a_angle', 'float', mainGlGlyph.vbo_a);
            // Draw directly or using indices. Do not handle indices if they do not
            // fit in a uint16; WebGL 1.0 does not support uint32.
            if (indices.length == 0)
                return;
            else if (indices.length === nvertices)
                this.prog.draw(this.gl.POINTS, [0, nvertices]);
            else if (nvertices < 65535) {
                // On IE the marker size is reduced to 1 px when using an index buffer
                // A MS Edge dev on Twitter said on 24-04-2014: "gl_PointSize > 1.0 works
                // in DrawArrays; gl_PointSize > 1.0 in DrawElements is coming soon in the
                // next renderer update.
                const ua = window.navigator.userAgent;
                if ((ua.indexOf("MSIE ") + ua.indexOf("Trident/") + ua.indexOf("Edge/")) > 0) {
                    logging_1.logger.warn('WebGL warning: IE is known to produce 1px sprites whith selections.');
                }
                this.index_buffer.set_size(indices.length * 2);
                this.index_buffer.set_data(0, new Uint16Array(indices));
                this.prog.draw(this.gl.POINTS, this.index_buffer);
            }
            else {
                // Work around the limit that the indexbuffer must be uint16. We draw in chunks.
                // First collect indices in chunks
                const chunksize = 64000; // 65536
                const chunks = [];
                for (let i = 0, end = Math.ceil(nvertices / chunksize); i < end; i++) {
                    chunks.push([]);
                }
                for (let i = 0, end = indices.length; i < end; i++) {
                    const uint16_index = indices[i] % chunksize;
                    const chunk = Math.floor(indices[i] / chunksize);
                    chunks[chunk].push(uint16_index);
                }
                // Then draw each chunk
                for (let chunk = 0, end = chunks.length; chunk < end; chunk++) {
                    const these_indices = new Uint16Array(chunks[chunk]);
                    const offset = chunk * chunksize * 4;
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
                    this.prog.draw(this.gl.POINTS, this.index_buffer);
                }
            }
        }
        _set_data(nvertices) {
            const n = nvertices * 4; // in bytes
            // Set buffer size
            this.vbo_x.set_size(n);
            this.vbo_y.set_size(n);
            this.vbo_a.set_size(n);
            this.vbo_s.set_size(n);
            // Upload data for x and y, apply a baked-in offset for float32 precision (issue #3795)
            // The exact value for the baked_offset does not matter, as long as it brings the data to less extreme values
            const xx = new Float64Array(this.glyph._x);
            const yy = new Float64Array(this.glyph._y);
            for (let i = 0, end = nvertices; i < end; i++) {
                xx[i] += this._baked_offset[0];
                yy[i] += this._baked_offset[1];
            }
            this.vbo_x.set_data(0, new Float32Array(xx));
            this.vbo_y.set_data(0, new Float32Array(yy));
            // Angle if available; circle does not have angle. If we don't set data, angle is default 0 in glsl
            if (this.glyph._angle != null) {
                this.vbo_a.set_data(0, new Float32Array(this.glyph._angle));
            }
            // Radius is special; some markers allow radius in data-coords instead of screen coords
            // @radius tells us that radius is in units, sradius is the pre-calculated screen radius
            if (this.glyph instanceof circle_1.CircleView && this.glyph._radius != null)
                this.vbo_s.set_data(0, new Float32Array(arrayable_1.map(this.glyph.sradius, (s) => s * 2)));
            else
                this.vbo_s.set_data(0, new Float32Array(this.glyph._size));
        }
        _set_visuals(nvertices) {
            base_1.attach_float(this.prog, this.vbo_linewidth, 'a_linewidth', nvertices, this.glyph.visuals.line, 'line_width');
            base_1.attach_color(this.prog, this.vbo_fg_color, 'a_fg_color', nvertices, this.glyph.visuals.line, 'line');
            base_1.attach_color(this.prog, this.vbo_bg_color, 'a_bg_color', nvertices, this.glyph.visuals.fill, 'fill');
            // Static value for antialias. Smaller aa-region to obtain crisper images
            this.prog.set_uniform('u_antialias', 'float', [0.8]);
        }
    }
    exports.MarkerGLGlyph = MarkerGLGlyph;
    MarkerGLGlyph.__name__ = "MarkerGLGlyph";
    function mk_marker(code) {
        return class extends MarkerGLGlyph {
            get _marker_code() {
                return code;
            }
        };
    }
    const glsl = require(360) /* ./markers.frag */;
    exports.CircleGLGlyph = mk_marker(glsl.circle);
    exports.SquareGLGlyph = mk_marker(glsl.square);
    exports.DiamondGLGlyph = mk_marker(glsl.diamond);
    exports.TriangleGLGlyph = mk_marker(glsl.triangle);
    exports.InvertedTriangleGLGlyph = mk_marker(glsl.invertedtriangle);
    exports.HexGLGlyph = mk_marker(glsl.hex);
    exports.CrossGLGlyph = mk_marker(glsl.cross);
    exports.CircleCrossGLGlyph = mk_marker(glsl.circlecross);
    exports.SquareCrossGLGlyph = mk_marker(glsl.squarecross);
    exports.DiamondCrossGLGlyph = mk_marker(glsl.diamondcross);
    exports.XGLGlyph = mk_marker(glsl.x);
    exports.CircleXGLGlyph = mk_marker(glsl.circlex);
    exports.SquareXGLGlyph = mk_marker(glsl.squarex);
    exports.AsteriskGLGlyph = mk_marker(glsl.asterisk);
},
359: /* models/glyphs/webgl/markers.vert.js */ function _(require, module, exports) {
    exports.vertex_shader = `
precision mediump float;
const float SQRT_2 = 1.4142135623730951;
//
uniform float u_pixel_ratio;
uniform vec2 u_canvas_size;
uniform vec2 u_offset;
uniform vec2 u_scale;
uniform float u_antialias;
//
attribute float a_x;
attribute float a_y;
attribute float a_size;
attribute float a_angle;  // in radians
attribute float a_linewidth;
attribute vec4  a_fg_color;
attribute vec4  a_bg_color;
//
varying float v_linewidth;
varying float v_size;
varying vec4  v_fg_color;
varying vec4  v_bg_color;
varying vec2  v_rotation;

void main (void)
{
    v_size = a_size * u_pixel_ratio;
    v_linewidth = a_linewidth * u_pixel_ratio;
    v_fg_color = a_fg_color;
    v_bg_color = a_bg_color;
    v_rotation = vec2(cos(-a_angle), sin(-a_angle));
    // Calculate position - the -0.5 is to correct for canvas origin
    vec2 pos = (vec2(a_x, a_y) + u_offset) * u_scale; // in pixels
    pos += 0.5;  // make up for Bokeh's offset
    pos /= u_canvas_size / u_pixel_ratio;  // in 0..1
    gl_Position = vec4(pos*2.0-1.0, 0.0, 1.0);
    gl_Position.y *= -1.0;
    gl_PointSize = SQRT_2 * v_size + 2.0 * (v_linewidth + 1.5*u_antialias);
}
`;
},
360: /* models/glyphs/webgl/markers.frag.js */ function _(require, module, exports) {
    exports.fragment_shader = (marker_code) => `
precision mediump float;
const float SQRT_2 = 1.4142135623730951;
const float PI = 3.14159265358979323846264;
//
uniform float u_antialias;
//
varying vec4  v_fg_color;
varying vec4  v_bg_color;
varying float v_linewidth;
varying float v_size;
varying vec2  v_rotation;

${marker_code}

vec4 outline(float distance, float linewidth, float antialias, vec4 fg_color, vec4 bg_color)
{
    vec4 frag_color;
    float t = linewidth/2.0 - antialias;
    float signed_distance = distance;
    float border_distance = abs(signed_distance) - t;
    float alpha = border_distance/antialias;
    alpha = exp(-alpha*alpha);

    // If fg alpha is zero, it probably means no outline. To avoid a dark outline
    // shining through due to aa, we set the fg color to the bg color. Avoid if (i.e. branching).
    float select = float(bool(fg_color.a));
    fg_color.rgb = select * fg_color.rgb + (1.0  - select) * bg_color.rgb;
    // Similarly, if we want a transparent bg
    select = float(bool(bg_color.a));
    bg_color.rgb = select * bg_color.rgb + (1.0  - select) * fg_color.rgb;

    if( border_distance < 0.0)
        frag_color = fg_color;
    else if( signed_distance < 0.0 ) {
        frag_color = mix(bg_color, fg_color, sqrt(alpha));
    } else {
        if( abs(signed_distance) < (linewidth/2.0 + antialias) ) {
            frag_color = vec4(fg_color.rgb, fg_color.a * alpha);
        } else {
            discard;
        }
    }
    return frag_color;
}

void main()
{
    vec2 P = gl_PointCoord.xy - vec2(0.5, 0.5);
    P = vec2(v_rotation.x*P.x - v_rotation.y*P.y,
             v_rotation.y*P.x + v_rotation.x*P.y);
    float point_size = SQRT_2*v_size  + 2.0 * (v_linewidth + 1.5*u_antialias);
    float distance = marker(P*point_size, v_size);
    gl_FragColor = outline(distance, v_linewidth, u_antialias, v_fg_color, v_bg_color);
    //gl_FragColor.rgb *= gl_FragColor.a;  // pre-multiply alpha
}
`;
    exports.circle = `
float marker(vec2 P, float size)
{
    return length(P) - size/2.0;
}
`;
    exports.square = `
float marker(vec2 P, float size)
{
    return max(abs(P.x), abs(P.y)) - size/2.0;
}
`;
    exports.diamond = `
float marker(vec2 P, float size)
{
    float x = SQRT_2 / 2.0 * (P.x * 1.5 - P.y);
    float y = SQRT_2 / 2.0 * (P.x * 1.5 + P.y);
    float r1 = max(abs(x), abs(y)) - size / (2.0 * SQRT_2);
    return r1 / SQRT_2;
}
`;
    exports.hex = `
float marker(vec2 P, float size)
{
    vec2 q = abs(P);
    return max(q.y * 0.57735 + q.x - 1.0 * size/2.0, q.y - 0.866 * size/2.0);
}
`;
    exports.triangle = `
float marker(vec2 P, float size)
{
    P.y -= size * 0.3;
    float x = SQRT_2 / 2.0 * (P.x * 1.7 - P.y);
    float y = SQRT_2 / 2.0 * (P.x * 1.7 + P.y);
    float r1 = max(abs(x), abs(y)) - size / 1.6;
    float r2 = P.y;
    return max(r1 / SQRT_2, r2);  // Intersect diamond with rectangle
}
`;
    exports.invertedtriangle = `
float marker(vec2 P, float size)
{
    P.y += size * 0.3;
    float x = SQRT_2 / 2.0 * (P.x * 1.7 - P.y);
    float y = SQRT_2 / 2.0 * (P.x * 1.7 + P.y);
    float r1 = max(abs(x), abs(y)) - size / 1.6;
    float r2 = - P.y;
    return max(r1 / SQRT_2, r2);  // Intersect diamond with rectangle
}
`;
    exports.cross = `
float marker(vec2 P, float size)
{
    float square = max(abs(P.x), abs(P.y)) - size / 2.5;   // 2.5 is a tweak
    float cross = min(abs(P.x), abs(P.y)) - size / 100.0;  // bit of "width" for aa
    return max(square, cross);
}
`;
    exports.circlecross = `
float marker(vec2 P, float size)
{
    // Define quadrants
    float qs = size / 2.0;  // quadrant size
    float s1 = max(abs(P.x - qs), abs(P.y - qs)) - qs;
    float s2 = max(abs(P.x + qs), abs(P.y - qs)) - qs;
    float s3 = max(abs(P.x - qs), abs(P.y + qs)) - qs;
    float s4 = max(abs(P.x + qs), abs(P.y + qs)) - qs;
    // Intersect main shape with quadrants (to form cross)
    float circle = length(P) - size/2.0;
    float c1 = max(circle, s1);
    float c2 = max(circle, s2);
    float c3 = max(circle, s3);
    float c4 = max(circle, s4);
    // Union
    return min(min(min(c1, c2), c3), c4);
}
`;
    exports.squarecross = `
float marker(vec2 P, float size)
{
    // Define quadrants
    float qs = size / 2.0;  // quadrant size
    float s1 = max(abs(P.x - qs), abs(P.y - qs)) - qs;
    float s2 = max(abs(P.x + qs), abs(P.y - qs)) - qs;
    float s3 = max(abs(P.x - qs), abs(P.y + qs)) - qs;
    float s4 = max(abs(P.x + qs), abs(P.y + qs)) - qs;
    // Intersect main shape with quadrants (to form cross)
    float square = max(abs(P.x), abs(P.y)) - size/2.0;
    float c1 = max(square, s1);
    float c2 = max(square, s2);
    float c3 = max(square, s3);
    float c4 = max(square, s4);
    // Union
    return min(min(min(c1, c2), c3), c4);
}
`;
    exports.diamondcross = `
float marker(vec2 P, float size)
{
    // Define quadrants
    float qs = size / 2.0;  // quadrant size
    float s1 = max(abs(P.x - qs), abs(P.y - qs)) - qs;
    float s2 = max(abs(P.x + qs), abs(P.y - qs)) - qs;
    float s3 = max(abs(P.x - qs), abs(P.y + qs)) - qs;
    float s4 = max(abs(P.x + qs), abs(P.y + qs)) - qs;
    // Intersect main shape with quadrants (to form cross)
    float x = SQRT_2 / 2.0 * (P.x * 1.5 - P.y);
    float y = SQRT_2 / 2.0 * (P.x * 1.5 + P.y);
    float diamond = max(abs(x), abs(y)) - size / (2.0 * SQRT_2);
    diamond /= SQRT_2;
    float c1 = max(diamond, s1);
    float c2 = max(diamond, s2);
    float c3 = max(diamond, s3);
    float c4 = max(diamond, s4);
    // Union
    return min(min(min(c1, c2), c3), c4);
}
`;
    exports.x = `
float marker(vec2 P, float size)
{
    float circle = length(P) - size / 1.6;
    float X = min(abs(P.x - P.y), abs(P.x + P.y)) - size / 100.0;  // bit of "width" for aa
    return max(circle, X);
}
`;
    exports.circlex = `
float marker(vec2 P, float size)
{
    float x = P.x - P.y;
    float y = P.x + P.y;
    // Define quadrants
    float qs = size / 2.0;  // quadrant size
    float s1 = max(abs(x - qs), abs(y - qs)) - qs;
    float s2 = max(abs(x + qs), abs(y - qs)) - qs;
    float s3 = max(abs(x - qs), abs(y + qs)) - qs;
    float s4 = max(abs(x + qs), abs(y + qs)) - qs;
    // Intersect main shape with quadrants (to form cross)
    float circle = length(P) - size/2.0;
    float c1 = max(circle, s1);
    float c2 = max(circle, s2);
    float c3 = max(circle, s3);
    float c4 = max(circle, s4);
    // Union
    float almost = min(min(min(c1, c2), c3), c4);
    // In this case, the X is also outside of the main shape
    float Xmask = length(P) - size / 1.6;  // a circle
    float X = min(abs(P.x - P.y), abs(P.x + P.y)) - size / 100.0;  // bit of "width" for aa
    return min(max(X, Xmask), almost);
}
`;
    exports.squarex = `
float marker(vec2 P, float size)
{
    float x = P.x - P.y;
    float y = P.x + P.y;
    // Define quadrants
    float qs = size / 2.0;  // quadrant size
    float s1 = max(abs(x - qs), abs(y - qs)) - qs;
    float s2 = max(abs(x + qs), abs(y - qs)) - qs;
    float s3 = max(abs(x - qs), abs(y + qs)) - qs;
    float s4 = max(abs(x + qs), abs(y + qs)) - qs;
    // Intersect main shape with quadrants (to form cross)
    float square = max(abs(P.x), abs(P.y)) - size/2.0;
    float c1 = max(square, s1);
    float c2 = max(square, s2);
    float c3 = max(square, s3);
    float c4 = max(square, s4);
    // Union
    return min(min(min(c1, c2), c3), c4);
}
`;
    exports.asterisk = `
float marker(vec2 P, float size)
{
    // Masks
    float diamond = max(abs(SQRT_2 / 2.0 * (P.x - P.y)), abs(SQRT_2 / 2.0 * (P.x + P.y))) - size / (2.0 * SQRT_2);
    float square = max(abs(P.x), abs(P.y)) - size / (2.0 * SQRT_2);
    // Shapes
    float X = min(abs(P.x - P.y), abs(P.x + P.y)) - size / 100.0;  // bit of "width" for aa
    float cross = min(abs(P.x), abs(P.y)) - size / 100.0;  // bit of "width" for aa
    // Result is union of masked shapes
    return min(max(X, diamond), max(cross, square));
}
`;
},
}, 351, {"models/glyphs/webgl/main":351,"models/glyphs/webgl/index":352,"models/glyphs/webgl/line":353,"models/glyphs/webgl/base":355,"models/glyphs/webgl/line.vert":356,"models/glyphs/webgl/line.frag":357,"models/glyphs/webgl/markers":358,"models/glyphs/webgl/markers.vert":359,"models/glyphs/webgl/markers.frag":360}, {});
})

//# sourceMappingURL=bokeh-gl-es6.js.map
