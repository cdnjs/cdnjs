/*!
 * PixiJS - v8.0.0-rc.4
 * Compiled Mon, 15 Jan 2024 11:22:19 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
var unsafe_eval_js = (function (exports) {
    'use strict';

    "use strict";



    function generateUniformBufferSyncPolyfill(uboElements) {
      return (uv, data, o) => {
        let v = null;
        let t = 0;
        let prev = 0;
        for (let i = 0; i < uboElements.length; i++) {
          const uboElement = uboElements[i];
          const name = uboElement.data.name;
          let executed = false;
          let offset = 0;
          for (let j = 0; j < PIXI.UNIFORM_BUFFER_PARSERS.length; j++) {
            const uniformParser = PIXI.UNIFORM_BUFFER_PARSERS[j];
            if (uniformParser.test(uboElement.data)) {
              offset = uboElement.offset / 4;
              o += offset - prev;
              PIXI.UNIFORM_BUFFER_PARSERS[j].exec(name, uv, data, o, v);
              executed = true;
              break;
            }
          }
          if (!executed) {
            if (uboElement.data.size > 1) {
              const rowSize = Math.max(PIXI.WGSL_TO_STD40_SIZE[uboElement.data.type] / 16, 1);
              const elementSize = uboElement.data.value.length / uboElement.data.size;
              const remainder = (4 - elementSize % 4) % 4;
              offset = uboElement.offset / 4;
              v = uv[name];
              o += offset - prev;
              let arrayOffset = o;
              t = 0;
              for (let i2 = 0; i2 < uboElement.data.size * rowSize; i2++) {
                for (let j = 0; j < elementSize; j++) {
                  data[arrayOffset++] = v[t++];
                }
                if (remainder !== 0) {
                  arrayOffset += remainder;
                }
              }
            } else {
              const template = PIXI.UBO_TO_SINGLE_SETTERS_FN[uboElement.data.type];
              offset = uboElement.offset / 4;
              v = uv[name];
              o += offset - prev;
              template(data, o, v);
            }
          }
          prev = offset;
        }
      };
    }

    "use strict";




    function generateUniformsSyncPolyfill(group, uniformData) {
      return (ud, uv, renderer, syncData) => {
        let v = null;
        let cv = null;
        let cu = null;
        const t = 0;
        const gl = renderer.gl;
        for (const i in group.uniforms) {
          const data = uniformData[i];
          if (!data) {
            if (group.uniforms[i] instanceof PIXI.UniformGroup) {
              if (group.uniforms[i].ubo) {
                renderer.shader.bindUniformBlock(uv[i], i);
              } else {
                renderer.shader.updateUniformGroup(uv[i]);
              }
            } else if (group.uniforms[i] instanceof PIXI.BufferResource) {
              renderer.shader.bindBufferResource(uv[i], i);
            }
            continue;
          }
          const uniform = group.uniforms[i];
          let executed = false;
          for (let j = 0; j < PIXI.UNIFORM_PARSERS.length; j++) {
            if (PIXI.UNIFORM_PARSERS[j].test(data, uniform)) {
              PIXI.UNIFORM_PARSERS[j].exec(i, cv, ud, uv, v, t, gl, renderer, syncData);
              executed = true;
              break;
            }
          }
          if (!executed) {
            cu = ud[i];
            cv = cu.value;
            v = uv[i];
            const isSingleSetter = data.size === 1 && !data.isArray;
            if (isSingleSetter) {
              PIXI.GLSL_TO_SINGLE_SETTERS_FN_CACHED[data.type](cu, cv, v, ud[i].location, gl);
            } else {
              PIXI.GLSL_TO_ARRAY_SETTERS_FN[data.type](v, ud[i].location, gl);
            }
            cu = ud[i];
            cv = cu.value;
            v = uv[i];
          }
        }
      };
    }

    "use strict";
    function selfInstall() {
      Object.assign(
        PIXI.GlUniformGroupSystem.prototype,
        {
          _systemCheck() {
          },
          // use polyfill which avoids eval method
          _generateUniformsSync: generateUniformsSyncPolyfill
        }
      );
      Object.assign(
        PIXI.UniformBufferSystem.prototype,
        {
          _systemCheck() {
          },
          // use polyfill which avoids eval method
          _generateUniformBufferSync: generateUniformBufferSyncPolyfill
        }
      );
    }
    selfInstall();

    "use strict";

    "use strict";

    exports.generateUniformBufferSyncPolyfill = generateUniformBufferSyncPolyfill;
    exports.generateUniformsSyncPolyfill = generateUniformsSyncPolyfill;

    return exports;

})({});
Object.assign(this.PIXI, unsafe_eval_js);
//# sourceMappingURL=unsafe-eval.js.map
