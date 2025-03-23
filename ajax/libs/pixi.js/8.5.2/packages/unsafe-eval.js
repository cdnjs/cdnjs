/*!
 * PixiJS - v8.5.2
 * Compiled Wed, 23 Oct 2024 08:23:18 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
var unsafe_eval_js = (function (exports) {
    'use strict';

    "use strict";
    class ViewableBuffer {
      constructor(sizeOrBuffer) {
        if (typeof sizeOrBuffer === "number") {
          this.rawBinaryData = new ArrayBuffer(sizeOrBuffer);
        } else if (sizeOrBuffer instanceof Uint8Array) {
          this.rawBinaryData = sizeOrBuffer.buffer;
        } else {
          this.rawBinaryData = sizeOrBuffer;
        }
        this.uint32View = new Uint32Array(this.rawBinaryData);
        this.float32View = new Float32Array(this.rawBinaryData);
        this.size = this.rawBinaryData.byteLength;
      }
      /** View on the raw binary data as a `Int8Array`. */
      get int8View() {
        if (!this._int8View) {
          this._int8View = new Int8Array(this.rawBinaryData);
        }
        return this._int8View;
      }
      /** View on the raw binary data as a `Uint8Array`. */
      get uint8View() {
        if (!this._uint8View) {
          this._uint8View = new Uint8Array(this.rawBinaryData);
        }
        return this._uint8View;
      }
      /**  View on the raw binary data as a `Int16Array`. */
      get int16View() {
        if (!this._int16View) {
          this._int16View = new Int16Array(this.rawBinaryData);
        }
        return this._int16View;
      }
      /** View on the raw binary data as a `Int32Array`. */
      get int32View() {
        if (!this._int32View) {
          this._int32View = new Int32Array(this.rawBinaryData);
        }
        return this._int32View;
      }
      /** View on the raw binary data as a `Float64Array`. */
      get float64View() {
        if (!this._float64Array) {
          this._float64Array = new Float64Array(this.rawBinaryData);
        }
        return this._float64Array;
      }
      /** View on the raw binary data as a `BigUint64Array`. */
      get bigUint64View() {
        if (!this._bigUint64Array) {
          this._bigUint64Array = new BigUint64Array(this.rawBinaryData);
        }
        return this._bigUint64Array;
      }
      /**
       * Returns the view of the given type.
       * @param type - One of `int8`, `uint8`, `int16`,
       *    `uint16`, `int32`, `uint32`, and `float32`.
       * @returns - typed array of given type
       */
      view(type) {
        return this[`${type}View`];
      }
      /** Destroys all buffer references. Do not use after calling this. */
      destroy() {
        this.rawBinaryData = null;
        this._int8View = null;
        this._uint8View = null;
        this._int16View = null;
        this.uint16View = null;
        this._int32View = null;
        this.uint32View = null;
        this.float32View = null;
      }
      /**
       * Returns the size of the given type in bytes.
       * @param type - One of `int8`, `uint8`, `int16`,
       *   `uint16`, `int32`, `uint32`, and `float32`.
       * @returns - size of the type in bytes
       */
      static sizeOf(type) {
        switch (type) {
          case "int8":
          case "uint8":
            return 1;
          case "int16":
          case "uint16":
            return 2;
          case "int32":
          case "uint32":
          case "float32":
            return 4;
          default:
            throw new Error(`${type} isn't a valid view type`);
        }
      }
    }

    "use strict";
    function createIndicesForQuads(size, outBuffer = null) {
      const totalIndices = size * 6;
      if (totalIndices > 65535) {
        outBuffer = outBuffer || new Uint32Array(totalIndices);
      } else {
        outBuffer = outBuffer || new Uint16Array(totalIndices);
      }
      if (outBuffer.length !== totalIndices) {
        throw new Error(`Out buffer length is incorrect, got ${outBuffer.length} and expected ${totalIndices}`);
      }
      for (let i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
        outBuffer[i + 0] = j + 0;
        outBuffer[i + 1] = j + 1;
        outBuffer[i + 2] = j + 2;
        outBuffer[i + 3] = j + 0;
        outBuffer[i + 4] = j + 2;
        outBuffer[i + 5] = j + 3;
      }
      return outBuffer;
    }

    "use strict";

    function generateParticleUpdateFunction(properties) {
      return {
        dynamicUpdate: generateUpdateFunction$1(properties, true),
        staticUpdate: generateUpdateFunction$1(properties, false)
      };
    }
    function generateUpdateFunction$1(properties, dynamic) {
      const funcFragments = [];
      funcFragments.push(`
      
        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);
      let offset = 0;
      for (const i in properties) {
        const property = properties[i];
        if (dynamic !== property.dynamic)
          continue;
        funcFragments.push(`offset = index + ${offset}`);
        funcFragments.push(property.code);
        const attributeInfo = PIXI.getAttributeInfoFromFormat(property.format);
        offset += attributeInfo.stride / 4;
      }
      funcFragments.push(`
            index += stride * 4;
        }
    `);
      funcFragments.unshift(`
        var stride = ${offset};
    `);
      const functionSource = funcFragments.join("\n");
      return new Function("ps", "f32v", "u32v", functionSource);
    }

    "use strict";
    class ParticleBuffer {
      constructor(options) {
        this._size = 0;
        this._generateParticleUpdateCache = {};
        var _a;
        const size = this._size = (_a = options.size) != null ? _a : 1e3;
        const properties = options.properties;
        let staticVertexSize = 0;
        let dynamicVertexSize = 0;
        for (const i in properties) {
          const property = properties[i];
          const attributeInfo = PIXI.getAttributeInfoFromFormat(property.format);
          if (property.dynamic) {
            dynamicVertexSize += attributeInfo.stride;
          } else {
            staticVertexSize += attributeInfo.stride;
          }
        }
        this._dynamicStride = dynamicVertexSize / 4;
        this._staticStride = staticVertexSize / 4;
        this.staticAttributeBuffer = new ViewableBuffer(size * 4 * staticVertexSize);
        this.dynamicAttributeBuffer = new ViewableBuffer(size * 4 * dynamicVertexSize);
        this.indexBuffer = createIndicesForQuads(size);
        const geometry = new PIXI.Geometry();
        let dynamicOffset = 0;
        let staticOffset = 0;
        this._staticBuffer = new PIXI.Buffer({
          data: new Float32Array(1),
          label: "static-particle-buffer",
          shrinkToFit: false,
          usage: PIXI.BufferUsage.VERTEX | PIXI.BufferUsage.COPY_DST
        });
        this._dynamicBuffer = new PIXI.Buffer({
          data: new Float32Array(1),
          label: "dynamic-particle-buffer",
          shrinkToFit: false,
          usage: PIXI.BufferUsage.VERTEX | PIXI.BufferUsage.COPY_DST
        });
        for (const i in properties) {
          const property = properties[i];
          const attributeInfo = PIXI.getAttributeInfoFromFormat(property.format);
          if (property.dynamic) {
            geometry.addAttribute(property.attributeName, {
              buffer: this._dynamicBuffer,
              stride: this._dynamicStride * 4,
              offset: dynamicOffset * 4,
              format: property.format
            });
            dynamicOffset += attributeInfo.size;
          } else {
            geometry.addAttribute(property.attributeName, {
              buffer: this._staticBuffer,
              stride: this._staticStride * 4,
              offset: staticOffset * 4,
              format: property.format
            });
            staticOffset += attributeInfo.size;
          }
        }
        geometry.addIndex(this.indexBuffer);
        const uploadFunction = this.getParticleUpdate(properties);
        this._dynamicUpload = uploadFunction.dynamicUpdate;
        this._staticUpload = uploadFunction.staticUpdate;
        this.geometry = geometry;
      }
      getParticleUpdate(properties) {
        const key = getParticleSyncKey(properties);
        if (this._generateParticleUpdateCache[key]) {
          return this._generateParticleUpdateCache[key];
        }
        this._generateParticleUpdateCache[key] = this.generateParticleUpdate(properties);
        return this._generateParticleUpdateCache[key];
      }
      generateParticleUpdate(properties) {
        return generateParticleUpdateFunction(properties);
      }
      update(particles, uploadStatic) {
        if (particles.length > this._size) {
          uploadStatic = true;
          this._size = Math.max(particles.length, this._size * 1.5 | 0);
          this.staticAttributeBuffer = new ViewableBuffer(this._size * this._staticStride * 4 * 4);
          this.dynamicAttributeBuffer = new ViewableBuffer(this._size * this._dynamicStride * 4 * 4);
          this.indexBuffer = createIndicesForQuads(this._size);
          this.geometry.indexBuffer.setDataWithSize(
            this.indexBuffer,
            this.indexBuffer.byteLength,
            true
          );
        }
        const dynamicAttributeBuffer = this.dynamicAttributeBuffer;
        this._dynamicUpload(particles, dynamicAttributeBuffer.float32View, dynamicAttributeBuffer.uint32View);
        this._dynamicBuffer.setDataWithSize(
          this.dynamicAttributeBuffer.float32View,
          particles.length * this._dynamicStride * 4,
          true
        );
        if (uploadStatic) {
          const staticAttributeBuffer = this.staticAttributeBuffer;
          this._staticUpload(particles, staticAttributeBuffer.float32View, staticAttributeBuffer.uint32View);
          this._staticBuffer.setDataWithSize(
            staticAttributeBuffer.float32View,
            particles.length * this._staticStride * 4,
            true
          );
        }
      }
      destroy() {
        this._staticBuffer.destroy();
        this._dynamicBuffer.destroy();
        this.geometry.destroy();
      }
    }
    function getParticleSyncKey(properties) {
      const keyGen = [];
      for (const key in properties) {
        const property = properties[key];
        keyGen.push(key, property.code, property.dynamic ? "d" : "s");
      }
      return keyGen.join("_");
    }

    "use strict";
    const particleUpdateFunctions = {
      aVertex: (ps, f32v, _u32v, offset, stride) => {
        let w0 = 0;
        let w1 = 0;
        let h0 = 0;
        let h1 = 0;
        for (let i = 0; i < ps.length; ++i) {
          const p = ps[i];
          const texture = p.texture;
          const sx = p.scaleX;
          const sy = p.scaleY;
          const ax = p.anchorX;
          const ay = p.anchorY;
          const trim = texture.trim;
          const orig = texture.orig;
          if (trim) {
            w1 = trim.x - ax * orig.width;
            w0 = w1 + trim.width;
            h1 = trim.y - ay * orig.height;
            h0 = h1 + trim.height;
          } else {
            w0 = orig.width * (1 - ax);
            w1 = orig.width * -ax;
            h0 = orig.height * (1 - ay);
            h1 = orig.height * -ay;
          }
          f32v[offset] = w1 * sx;
          f32v[offset + 1] = h1 * sy;
          f32v[offset + stride] = w0 * sx;
          f32v[offset + stride + 1] = h1 * sy;
          f32v[offset + stride * 2] = w0 * sx;
          f32v[offset + stride * 2 + 1] = h0 * sy;
          f32v[offset + stride * 3] = w1 * sx;
          f32v[offset + stride * 3 + 1] = h0 * sy;
          offset += stride * 4;
        }
      },
      aPosition: (ps, f32v, _u32v, offset, stride) => {
        for (let i = 0; i < ps.length; ++i) {
          const p = ps[i];
          const x = p.x;
          const y = p.y;
          f32v[offset] = x;
          f32v[offset + 1] = y;
          f32v[offset + stride] = x;
          f32v[offset + stride + 1] = y;
          f32v[offset + stride * 2] = x;
          f32v[offset + stride * 2 + 1] = y;
          f32v[offset + stride * 3] = x;
          f32v[offset + stride * 3 + 1] = y;
          offset += stride * 4;
        }
      },
      aRotation: (ps, f32v, _u32v, offset, stride) => {
        for (let i = 0; i < ps.length; ++i) {
          const rotation = ps[i].rotation;
          f32v[offset] = rotation;
          f32v[offset + stride] = rotation;
          f32v[offset + stride * 2] = rotation;
          f32v[offset + stride * 3] = rotation;
          offset += stride * 4;
        }
      },
      aUV: (ps, f32v, _u32v, offset, stride) => {
        for (let i = 0; i < ps.length; ++i) {
          const uvs = ps[i].texture.uvs;
          f32v[offset] = uvs.x0;
          f32v[offset + 1] = uvs.y0;
          f32v[offset + stride] = uvs.x1;
          f32v[offset + stride + 1] = uvs.y1;
          f32v[offset + stride * 2] = uvs.x2;
          f32v[offset + stride * 2 + 1] = uvs.y2;
          f32v[offset + stride * 3] = uvs.x3;
          f32v[offset + stride * 3 + 1] = uvs.y3;
          offset += stride * 4;
        }
      },
      aColor: (ps, _f32v, u32v, offset, stride) => {
        for (let i = 0; i < ps.length; ++i) {
          const c = ps[i].color;
          u32v[offset] = c;
          u32v[offset + stride] = c;
          u32v[offset + stride * 2] = c;
          u32v[offset + stride * 3] = c;
          offset += stride * 4;
        }
      }
    };

    "use strict";
    function generateParticleUpdatePolyfill(properties) {
      const dynamicProperties = properties.filter((p) => p.dynamic);
      const staticProperties = properties.filter((p) => !p.dynamic);
      return {
        dynamicUpdate: generateUpdateFunction(dynamicProperties),
        staticUpdate: generateUpdateFunction(staticProperties)
      };
    }
    function generateUpdateFunction(properties) {
      let stride = 0;
      const updateData = [];
      for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        const attributeStride = PIXI.getAttributeInfoFromFormat(property.format).stride / 4;
        stride += attributeStride;
        updateData.push({
          stride: attributeStride,
          updateFunction: property.updateFunction || particleUpdateFunctions[property.attributeName]
        });
      }
      return (ps, f32v, u32v) => {
        let offset = 0;
        for (let i = 0; i < updateData.length; i++) {
          const obx = updateData[i];
          obx.updateFunction(ps, f32v, u32v, offset, stride);
          offset += obx.stride;
        }
      };
    }

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
      Object.assign(ParticleBuffer.prototype, {
        // use polyfill which avoids eval method
        generateParticleUpdate: generateParticleUpdatePolyfill
      });
    }
    selfInstall();

    "use strict";

    "use strict";

    exports.generateParticleUpdatePolyfill = generateParticleUpdatePolyfill;
    exports.generateShaderSyncPolyfill = generateShaderSyncPolyfill;
    exports.generateUboSyncPolyfillSTD40 = generateUboSyncPolyfillSTD40;
    exports.generateUboSyncPolyfillWGSL = generateUboSyncPolyfillWGSL;
    exports.generateUniformsSyncPolyfill = generateUniformsSyncPolyfill;
    exports.particleUpdateFunctions = particleUpdateFunctions;
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
