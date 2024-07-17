/*!
 * PixiJS - v8.2.5
 * Compiled Fri, 12 Jul 2024 12:30:00 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
var unsafe_eval_js = (function (exports) {
    'use strict';

    "use strict";




    function generateShaderSyncPolyfill() {
      return syncShader;
    }
    function syncShader(renderer, shader, syncData) {
      const gl = renderer.gl;
      const shaderSystem = renderer.shader;
      const programData = shaderSystem._getProgramData(shader.glProgram);
      for (const i in shader.groups) {
        const bindGroup = shader.groups[i];
        for (const j in bindGroup.resources) {
          const resource = bindGroup.resources[j];
          if (resource instanceof PIXI.UniformGroup) {
            if (resource.ubo) {
              shaderSystem.bindUniformBlock(
                resource,
                shader._uniformBindMap[i][j],
                syncData.blockIndex++
              );
            } else {
              shaderSystem.updateUniformGroup(resource);
            }
          } else if (resource instanceof PIXI.BufferResource) {
            shaderSystem.bindUniformBlock(
              resource,
              shader._uniformBindMap[i][j],
              syncData.blockIndex++
            );
          } else if (resource instanceof PIXI.TextureSource) {
            renderer.texture.bind(resource, syncData.textureCount);
            const uniformName = shader._uniformBindMap[i][j];
            const uniformData = programData.uniformData[uniformName];
            if (uniformData) {
              if (uniformData.value !== syncData.textureCount) {
                gl.uniform1i(uniformData.location, syncData.textureCount);
              }
              syncData.textureCount++;
            }
          } else if (resource instanceof PIXI.TextureStyle) {
          }
        }
      }
    }

    "use strict";
    const uboParserFunctions = [
      (name, data, offset, uv, _v) => {
        const matrix = uv[name].toArray(true);
        data[offset] = matrix[0];
        data[offset + 1] = matrix[1];
        data[offset + 2] = matrix[2];
        data[offset + 4] = matrix[3];
        data[offset + 5] = matrix[4];
        data[offset + 6] = matrix[5];
        data[offset + 8] = matrix[6];
        data[offset + 9] = matrix[7];
        data[offset + 10] = matrix[8];
      },
      (name, data, offset, uv, v) => {
        v = uv[name];
        data[offset] = v.x;
        data[offset + 1] = v.y;
        data[offset + 2] = v.width;
        data[offset + 3] = v.height;
      },
      (name, data, offset, uv, v) => {
        v = uv[name];
        data[offset] = v.x;
        data[offset + 1] = v.y;
      },
      (name, data, offset, uv, v) => {
        v = uv[name];
        data[offset] = v.red;
        data[offset + 1] = v.green;
        data[offset + 2] = v.blue;
        data[offset + 3] = v.alpha;
      },
      (name, data, offset, uv, v) => {
        v = uv[name];
        data[offset] = v.red;
        data[offset + 1] = v.green;
        data[offset + 2] = v.blue;
      }
    ];
    const uboSingleFunctionsWGSL = {
      f32: (_name, data, offset, _uv, v) => {
        data[offset] = v;
      },
      i32: (_name, data, offset, _uv, v) => {
        data[offset] = v;
      },
      "vec2<f32>": (_name, data, offset, _uv, v) => {
        data[offset] = v[0];
        data[offset + 1] = v[1];
      },
      "vec3<f32>": (_name, data, offset, _uv, v) => {
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
      },
      "vec4<f32>": (_name, data, offset, _uv, v) => {
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
      },
      "mat2x2<f32>": (_name, data, offset, _uv, v) => {
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
      },
      "mat3x3<f32>": (_name, data, offset, _uv, v) => {
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
      },
      "mat4x4<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 16; i++) {
          data[offset + i] = v[i];
        }
      },
      "mat3x2<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 6; i++) {
          data[offset + (i / 3 | 0) * 4 + i % 3] = v[i];
        }
      },
      "mat4x2<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 8; i++) {
          data[offset + (i / 4 | 0) * 4 + i % 4] = v[i];
        }
      },
      "mat2x3<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 6; i++) {
          data[offset + (i / 2 | 0) * 4 + i % 2] = v[i];
        }
      },
      "mat4x3<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 12; i++) {
          data[offset + (i / 4 | 0) * 4 + i % 4] = v[i];
        }
      },
      "mat2x4<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 8; i++) {
          data[offset + (i / 2 | 0) * 4 + i % 2] = v[i];
        }
      },
      "mat3x4<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 12; i++) {
          data[offset + (i / 3 | 0) * 4 + i % 3] = v[i];
        }
      }
    };
    const uboSingleFunctionsSTD40 = {
      f32: (_name, data, offset, _uv, v) => {
        data[offset] = v;
      },
      i32: (_name, data, offset, _uv, v) => {
        data[offset] = v;
      },
      "vec2<f32>": (_name, data, offset, _uv, v) => {
        data[offset] = v[0];
        data[offset + 1] = v[1];
      },
      "vec3<f32>": (_name, data, offset, _uv, v) => {
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
      },
      "vec4<f32>": (_name, data, offset, _uv, v) => {
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
      },
      "mat2x2<f32>": (_name, data, offset, _uv, v) => {
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 4] = v[2];
        data[offset + 5] = v[3];
      },
      "mat3x3<f32>": (_name, data, offset, _uv, v) => {
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
      },
      "mat4x4<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 16; i++) {
          data[offset + i] = v[i];
        }
      },
      "mat3x2<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 6; i++) {
          data[offset + (i / 3 | 0) * 4 + i % 3] = v[i];
        }
      },
      "mat4x2<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 8; i++) {
          data[offset + (i / 4 | 0) * 4 + i % 4] = v[i];
        }
      },
      "mat2x3<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 6; i++) {
          data[offset + (i / 2 | 0) * 4 + i % 2] = v[i];
        }
      },
      "mat4x3<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 12; i++) {
          data[offset + (i / 4 | 0) * 4 + i % 4] = v[i];
        }
      },
      "mat2x4<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 8; i++) {
          data[offset + (i / 2 | 0) * 4 + i % 2] = v[i];
        }
      },
      "mat3x4<f32>": (_name, data, offset, _uv, v) => {
        for (let i = 0; i < 12; i++) {
          data[offset + (i / 3 | 0) * 4 + i % 3] = v[i];
        }
      }
    };

    "use strict";
    function generateUboSyncPolyfillSTD40(uboElements) {
      return generateUboSyncPolyfill(
        uboElements,
        uboSingleFunctionsSTD40,
        (uboElement) => {
          const rowSize = Math.max(PIXI.WGSL_TO_STD40_SIZE[uboElement.data.type] / 16, 1);
          const elementSize = uboElement.data.value.length / uboElement.data.size;
          const remainder = (4 - elementSize % 4) % 4;
          return (_name, data, offset, _uv, v) => {
            let t = 0;
            for (let i = 0; i < uboElement.data.size * rowSize; i++) {
              for (let j = 0; j < elementSize; j++) {
                data[offset++] = v[t++];
              }
              offset += remainder;
            }
          };
        }
      );
    }
    function generateUboSyncPolyfillWGSL(uboElements) {
      return generateUboSyncPolyfill(
        uboElements,
        uboSingleFunctionsWGSL,
        (uboElement) => {
          const { size, align } = PIXI.WGSL_ALIGN_SIZE_DATA[uboElement.data.type];
          const remainder = (size - align) / 4;
          return (_name, data, offset, _uv, v) => {
            let t = 0;
            for (let i = 0; i < uboElement.data.size * (size / 4); i++) {
              for (let j = 0; j < size / 4; j++) {
                data[offset++] = v[t++];
              }
              offset += remainder;
            }
          };
        }
      );
    }
    function generateUboSyncPolyfill(uboElements, uboFunctions, arrayUploadFunction) {
      const functionMap = {};
      for (const i in uboElements) {
        const uboElement = uboElements[i];
        const uniform = uboElement.data;
        let parsed = false;
        functionMap[uniform.name] = {
          offset: uboElement.offset / 4,
          func: null
        };
        for (let j = 0; j < PIXI.uniformParsers.length; j++) {
          const parser = PIXI.uniformParsers[j];
          if (uniform.type === parser.type && parser.test(uniform)) {
            functionMap[uniform.name].func = uboParserFunctions[j];
            parsed = true;
            break;
          }
        }
        if (!parsed) {
          if (uniform.size === 1) {
            functionMap[uniform.name].func = uboFunctions[uniform.type];
          } else {
            functionMap[uniform.name].func = arrayUploadFunction(uboElement);
          }
        }
      }
      return (uniforms, data, offset) => {
        for (const i in functionMap) {
          functionMap[i].func(i, data, offset + functionMap[i].offset, uniforms, uniforms[i]);
        }
      };
    }

    "use strict";
    const uniformSingleParserFunctions = {
      f32(name, cu, cv, v, ud, _uv, gl) {
        if (cv !== v) {
          cu.value = v;
          gl.uniform1f(ud[name].location, v);
        }
      },
      "vec2<f32>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1]) {
          cv[0] = v[0];
          cv[1] = v[1];
          gl.uniform2f(ud[name].location, v[0], v[1]);
        }
      },
      "vec3<f32>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
          cv[0] = v[0];
          cv[1] = v[1];
          cv[2] = v[2];
          gl.uniform3f(ud[name].location, v[0], v[1], v[2]);
        }
      },
      "vec4<f32>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
          cv[0] = v[0];
          cv[1] = v[1];
          cv[2] = v[2];
          cv[3] = v[3];
          gl.uniform4f(ud[name].location, v[0], v[1], v[2], v[3]);
        }
      },
      i32(name, cu, cv, v, ud, _uv, gl) {
        if (cv !== v) {
          cu.value = v;
          gl.uniform1i(ud[name].location, v);
        }
      },
      "vec2<i32>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1]) {
          cv[0] = v[0];
          cv[1] = v[1];
          gl.uniform2i(ud[name].location, v[0], v[1]);
        }
      },
      "vec3<i32>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
          cv[0] = v[0];
          cv[1] = v[1];
          cv[2] = v[2];
          gl.uniform3i(ud[name].location, v[0], v[1], v[2]);
        }
      },
      "vec4<i32>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
          cv[0] = v[0];
          cv[1] = v[1];
          cv[2] = v[2];
          cv[3] = v[3];
          gl.uniform4i(ud[name].location, v[0], v[1], v[2], v[3]);
        }
      },
      u32(name, cu, cv, v, ud, _uv, gl) {
        if (cv !== v) {
          cu.value = v;
          gl.uniform1ui(ud[name].location, v);
        }
      },
      "vec2<u32>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1]) {
          cv[0] = v[0];
          cv[1] = v[1];
          gl.uniform2ui(ud[name].location, v[0], v[1]);
        }
      },
      "vec3<u32>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
          cv[0] = v[0];
          cv[1] = v[1];
          cv[2] = v[2];
          gl.uniform3ui(ud[name].location, v[0], v[1], v[2]);
        }
      },
      "vec4<u32>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
          cv[0] = v[0];
          cv[1] = v[1];
          cv[2] = v[2];
          cv[3] = v[3];
          gl.uniform4ui(ud[name].location, v[0], v[1], v[2], v[3]);
        }
      },
      bool(name, cu, cv, v, ud, _uv, gl) {
        if (cv !== v) {
          cu.value = v;
          gl.uniform1i(ud[name].location, v);
        }
      },
      "vec2<bool>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1]) {
          cv[0] = v[0];
          cv[1] = v[1];
          gl.uniform2i(ud[name].location, v[0], v[1]);
        }
      },
      "vec3<bool>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
          cv[0] = v[0];
          cv[1] = v[1];
          cv[2] = v[2];
          gl.uniform3i(ud[name].location, v[0], v[1], v[2]);
        }
      },
      "vec4<bool>"(name, _cu, cv, v, ud, _uv, gl) {
        if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
          cv[0] = v[0];
          cv[1] = v[1];
          cv[2] = v[2];
          cv[3] = v[3];
          gl.uniform4i(ud[name].location, v[0], v[1], v[2], v[3]);
        }
      },
      "mat2x2<f32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniformMatrix2fv(ud[name].location, false, v);
      },
      "mat3x3<f32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniformMatrix3fv(ud[name].location, false, v);
      },
      "mat4x4<f32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniformMatrix4fv(ud[name].location, false, v);
      }
    };
    const uniformArrayParserFunctions = {
      f32(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform1fv(ud[name].location, v);
      },
      "vec2<f32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform2fv(ud[name].location, v);
      },
      "vec3<f32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform3fv(ud[name].location, v);
      },
      "vec4<f32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform4fv(ud[name].location, v);
      },
      "mat2x2<f32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniformMatrix2fv(ud[name].location, false, v);
      },
      "mat3x3<f32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniformMatrix3fv(ud[name].location, false, v);
      },
      "mat4x4<f32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniformMatrix4fv(ud[name].location, false, v);
      },
      i32(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform1iv(ud[name].location, v);
      },
      "vec2<i32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform2iv(ud[name].location, v);
      },
      "vec3<i32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform3iv(ud[name].location, v);
      },
      "vec4<i32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform4iv(ud[name].location, v);
      },
      u32(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform1iv(ud[name].location, v);
      },
      "vec2<u32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform2iv(ud[name].location, v);
      },
      "vec3<u32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform3iv(ud[name].location, v);
      },
      "vec4<u32>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform4iv(ud[name].location, v);
      },
      bool(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform1iv(ud[name].location, v);
      },
      "vec2<bool>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform2iv(ud[name].location, v);
      },
      "vec3<bool>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform3iv(ud[name].location, v);
      },
      "vec4<bool>"(name, _cu, _cv, v, ud, _uv, gl) {
        gl.uniform4iv(ud[name].location, v);
      }
    };
    const uniformParserFunctions = [
      (name, _cu, _cv, _v, ud, uv, gl) => {
        gl.uniformMatrix3fv(ud[name].location, false, uv[name].toArray(true));
      },
      (name, _cu, cv, v, ud, uv, gl) => {
        cv = ud[name].value;
        v = uv[name];
        if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {
          cv[0] = v.x;
          cv[1] = v.y;
          cv[2] = v.width;
          cv[3] = v.height;
          gl.uniform4f(ud[name].location, v.x, v.y, v.width, v.height);
        }
      },
      (name, _cu, cv, v, ud, uv, gl) => {
        cv = ud[name].value;
        v = uv[name];
        if (cv[0] !== v.x || cv[1] !== v.y) {
          cv[0] = v.x;
          cv[1] = v.y;
          gl.uniform2f(ud[name].location, v.x, v.y);
        }
      },
      (name, _cu, cv, v, ud, uv, gl) => {
        cv = ud[name].value;
        v = uv[name];
        if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha) {
          cv[0] = v.red;
          cv[1] = v.green;
          cv[2] = v.blue;
          cv[3] = v.alpha;
          gl.uniform4f(ud[name].location, v.red, v.green, v.blue, v.alpha);
        }
      },
      (name, _cu, cv, v, ud, uv, gl) => {
        cv = ud[name].value;
        v = uv[name];
        if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue) {
          cv[0] = v.red;
          cv[1] = v.green;
          cv[2] = v.blue;
          gl.uniform3f(ud[name].location, v.red, v.green, v.blue);
        }
      }
    ];

    "use strict";
    function generateUniformsSyncPolyfill(group, uniformData) {
      const functionMap = {};
      for (const i in group.uniformStructures) {
        if (!uniformData[i])
          continue;
        const uniform = group.uniformStructures[i];
        let parsed = false;
        for (let j = 0; j < PIXI.uniformParsers.length; j++) {
          const parser = PIXI.uniformParsers[j];
          if (uniform.type === parser.type && parser.test(uniform)) {
            functionMap[i] = uniformParserFunctions[j];
            parsed = true;
            break;
          }
        }
        if (!parsed) {
          const templateType = uniform.size === 1 ? uniformSingleParserFunctions : uniformArrayParserFunctions;
          functionMap[i] = templateType[uniform.type];
        }
      }
      return (ud, uv, renderer) => {
        const gl = renderer.gl;
        for (const i in functionMap) {
          const v = uv[i];
          const cu = ud[i];
          const cv = ud[i].value;
          functionMap[i](i, cu, cv, v, ud, uv, gl);
        }
      };
    }

    "use strict";
    function selfInstall() {
      Object.assign(PIXI.AbstractRenderer.prototype, {
        // override unsafeEval check, as we don't need to use it
        _unsafeEvalCheck() {
        }
      });
      Object.assign(PIXI.UboSystem.prototype, {
        // override unsafeEval check, as we don't need to use it
        _systemCheck() {
        }
      });
      Object.assign(PIXI.GlUniformGroupSystem.prototype, {
        // use polyfill which avoids eval method
        _generateUniformsSync: generateUniformsSyncPolyfill
      });
      Object.assign(PIXI.GlUboSystem.prototype, {
        // use polyfill which avoids eval method
        _generateUboSync: generateUboSyncPolyfillSTD40
      });
      Object.assign(PIXI.GpuUboSystem.prototype, {
        // use polyfill which avoids eval method
        _generateUboSync: generateUboSyncPolyfillWGSL
      });
      Object.assign(PIXI.GlShaderSystem.prototype, {
        // use polyfill which avoids eval method
        _generateShaderSync: generateShaderSyncPolyfill
      });
    }
    selfInstall();

    "use strict";

    "use strict";

    exports.generateShaderSyncPolyfill = generateShaderSyncPolyfill;
    exports.generateUboSyncPolyfillSTD40 = generateUboSyncPolyfillSTD40;
    exports.generateUboSyncPolyfillWGSL = generateUboSyncPolyfillWGSL;
    exports.generateUniformsSyncPolyfill = generateUniformsSyncPolyfill;
    exports.uboParserFunctions = uboParserFunctions;
    exports.uboSingleFunctionsSTD40 = uboSingleFunctionsSTD40;
    exports.uboSingleFunctionsWGSL = uboSingleFunctionsWGSL;
    exports.uniformArrayParserFunctions = uniformArrayParserFunctions;
    exports.uniformParserFunctions = uniformParserFunctions;
    exports.uniformSingleParserFunctions = uniformSingleParserFunctions;

    return exports;

})({});
Object.assign(this.PIXI, unsafe_eval_js);
//# sourceMappingURL=unsafe-eval.js.map
