/*!
 * ONNX Runtime Web v1.23.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
"use strict";
var ort = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // common/dist/esm/backend-impl.js
  var backends, backendsSortedByPriority, registerBackend, tryResolveAndInitializeBackend, resolveBackendAndExecutionProviders;
  var init_backend_impl = __esm({
    "common/dist/esm/backend-impl.js"() {
      "use strict";
      backends = /* @__PURE__ */ new Map();
      backendsSortedByPriority = [];
      registerBackend = (name, backend, priority) => {
        if (backend && typeof backend.init === "function" && typeof backend.createInferenceSessionHandler === "function") {
          const currentBackend = backends.get(name);
          if (currentBackend === void 0) {
            backends.set(name, { backend, priority });
          } else if (currentBackend.priority > priority) {
            return;
          } else if (currentBackend.priority === priority) {
            if (currentBackend.backend !== backend) {
              throw new Error(`cannot register backend "${name}" using priority ${priority}`);
            }
          }
          if (priority >= 0) {
            const i = backendsSortedByPriority.indexOf(name);
            if (i !== -1) {
              backendsSortedByPriority.splice(i, 1);
            }
            for (let i2 = 0; i2 < backendsSortedByPriority.length; i2++) {
              if (backends.get(backendsSortedByPriority[i2]).priority <= priority) {
                backendsSortedByPriority.splice(i2, 0, name);
                return;
              }
            }
            backendsSortedByPriority.push(name);
          }
          return;
        }
        throw new TypeError("not a valid backend");
      };
      tryResolveAndInitializeBackend = async (backendName) => {
        const backendInfo = backends.get(backendName);
        if (!backendInfo) {
          return "backend not found.";
        }
        if (backendInfo.initialized) {
          return backendInfo.backend;
        } else if (backendInfo.aborted) {
          return backendInfo.error;
        } else {
          const isInitializing = !!backendInfo.initPromise;
          try {
            if (!isInitializing) {
              backendInfo.initPromise = backendInfo.backend.init(backendName);
            }
            await backendInfo.initPromise;
            backendInfo.initialized = true;
            return backendInfo.backend;
          } catch (e) {
            if (!isInitializing) {
              backendInfo.error = `${e}`;
              backendInfo.aborted = true;
            }
            return backendInfo.error;
          } finally {
            delete backendInfo.initPromise;
          }
        }
      };
      resolveBackendAndExecutionProviders = async (options) => {
        const eps = options.executionProviders || [];
        const backendHints = eps.map((i) => typeof i === "string" ? i : i.name);
        const backendNames = backendHints.length === 0 ? backendsSortedByPriority : backendHints;
        let backend;
        const errors = [];
        const availableBackendNames = /* @__PURE__ */ new Set();
        for (const backendName of backendNames) {
          const resolveResult = await tryResolveAndInitializeBackend(backendName);
          if (typeof resolveResult === "string") {
            errors.push({ name: backendName, err: resolveResult });
          } else {
            if (!backend) {
              backend = resolveResult;
            }
            if (backend === resolveResult) {
              availableBackendNames.add(backendName);
            }
          }
        }
        if (!backend) {
          throw new Error(`no available backend found. ERR: ${errors.map((e) => `[${e.name}] ${e.err}`).join(", ")}`);
        }
        for (const { name, err } of errors) {
          if (backendHints.includes(name)) {
            console.warn(`removing requested execution provider "${name}" from session options because it is not available: ${err}`);
          }
        }
        const filteredEps = eps.filter((i) => availableBackendNames.has(typeof i === "string" ? i : i.name));
        return [
          backend,
          new Proxy(options, {
            get: (target, prop) => {
              if (prop === "executionProviders") {
                return filteredEps;
              }
              return Reflect.get(target, prop);
            }
          })
        ];
      };
    }
  });

  // common/dist/esm/backend.js
  var init_backend = __esm({
    "common/dist/esm/backend.js"() {
      "use strict";
      init_backend_impl();
    }
  });

  // common/dist/esm/version.js
  var version;
  var init_version = __esm({
    "common/dist/esm/version.js"() {
      "use strict";
      version = "1.23.0";
    }
  });

  // common/dist/esm/env-impl.js
  var logLevelValue, env;
  var init_env_impl = __esm({
    "common/dist/esm/env-impl.js"() {
      "use strict";
      init_version();
      logLevelValue = "warning";
      env = {
        wasm: {},
        webgl: {},
        webgpu: {},
        versions: { common: version },
        set logLevel(value) {
          if (value === void 0) {
            return;
          }
          if (typeof value !== "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(value) === -1) {
            throw new Error(`Unsupported logging level: ${value}`);
          }
          logLevelValue = value;
        },
        get logLevel() {
          return logLevelValue;
        }
      };
      Object.defineProperty(env, "logLevel", { enumerable: true });
    }
  });

  // common/dist/esm/env.js
  var env2;
  var init_env = __esm({
    "common/dist/esm/env.js"() {
      "use strict";
      init_env_impl();
      env2 = env;
    }
  });

  // common/dist/esm/tensor-conversion-impl.js
  var tensorToDataURL, tensorToImageData;
  var init_tensor_conversion_impl = __esm({
    "common/dist/esm/tensor-conversion-impl.js"() {
      "use strict";
      tensorToDataURL = (tensor, options) => {
        const canvas = typeof document !== "undefined" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
        canvas.width = tensor.dims[3];
        canvas.height = tensor.dims[2];
        const pixels2DContext = canvas.getContext("2d");
        if (pixels2DContext != null) {
          let width;
          let height;
          if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
            width = tensor.dims[2];
            height = tensor.dims[3];
          } else {
            width = tensor.dims[3];
            height = tensor.dims[2];
          }
          const inputformat = options?.format !== void 0 ? options.format : "RGB";
          const norm = options?.norm;
          let normMean;
          let normBias;
          if (norm === void 0 || norm.mean === void 0) {
            normMean = [255, 255, 255, 255];
          } else {
            if (typeof norm.mean === "number") {
              normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
            } else {
              normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 0];
              if (norm.mean[3] !== void 0) {
                normMean[3] = norm.mean[3];
              }
            }
          }
          if (norm === void 0 || norm.bias === void 0) {
            normBias = [0, 0, 0, 0];
          } else {
            if (typeof norm.bias === "number") {
              normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
            } else {
              normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
              if (norm.bias[3] !== void 0) {
                normBias[3] = norm.bias[3];
              }
            }
          }
          const stride = height * width;
          let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
          if (inputformat === "RGBA") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
            aTensorPointer = stride * 3;
          } else if (inputformat === "RGB") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
          } else if (inputformat === "RBG") {
            rTensorPointer = 0;
            bTensorPointer = stride;
            gTensorPointer = stride * 2;
          }
          for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
              const R = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
              const G = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
              const B = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
              const A = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
              pixels2DContext.fillStyle = "rgba(" + R + "," + G + "," + B + "," + A + ")";
              pixels2DContext.fillRect(j, i, 1, 1);
            }
          }
          if ("toDataURL" in canvas) {
            return canvas.toDataURL();
          } else {
            throw new Error("toDataURL is not supported");
          }
        } else {
          throw new Error("Can not access image data");
        }
      };
      tensorToImageData = (tensor, options) => {
        const pixels2DContext = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d");
        let image;
        if (pixels2DContext != null) {
          let width;
          let height;
          let channels;
          if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
            width = tensor.dims[2];
            height = tensor.dims[1];
            channels = tensor.dims[3];
          } else {
            width = tensor.dims[3];
            height = tensor.dims[2];
            channels = tensor.dims[1];
          }
          const inputformat = options !== void 0 ? options.format !== void 0 ? options.format : "RGB" : "RGB";
          const norm = options?.norm;
          let normMean;
          let normBias;
          if (norm === void 0 || norm.mean === void 0) {
            normMean = [255, 255, 255, 255];
          } else {
            if (typeof norm.mean === "number") {
              normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
            } else {
              normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 255];
              if (norm.mean[3] !== void 0) {
                normMean[3] = norm.mean[3];
              }
            }
          }
          if (norm === void 0 || norm.bias === void 0) {
            normBias = [0, 0, 0, 0];
          } else {
            if (typeof norm.bias === "number") {
              normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
            } else {
              normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
              if (norm.bias[3] !== void 0) {
                normBias[3] = norm.bias[3];
              }
            }
          }
          const stride = height * width;
          if (options !== void 0) {
            if (options.format !== void 0 && channels === 4 && options.format !== "RGBA" || channels === 3 && options.format !== "RGB" && options.format !== "BGR") {
              throw new Error("Tensor format doesn't match input tensor dims");
            }
          }
          const step = 4;
          let rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
          let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
          if (inputformat === "RGBA") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
            aTensorPointer = stride * 3;
          } else if (inputformat === "RGB") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
          } else if (inputformat === "RBG") {
            rTensorPointer = 0;
            bTensorPointer = stride;
            gTensorPointer = stride * 2;
          }
          image = pixels2DContext.createImageData(width, height);
          for (let i = 0; i < height * width; rImagePointer += step, gImagePointer += step, bImagePointer += step, aImagePointer += step, i++) {
            image.data[rImagePointer] = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
            image.data[gImagePointer] = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
            image.data[bImagePointer] = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
            image.data[aImagePointer] = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
          }
        } else {
          throw new Error("Can not access image data");
        }
        return image;
      };
    }
  });

  // common/dist/esm/tensor-factory-impl.js
  var bufferToTensor, tensorFromImage, tensorFromTexture, tensorFromGpuBuffer, tensorFromMLTensor, tensorFromPinnedBuffer;
  var init_tensor_factory_impl = __esm({
    "common/dist/esm/tensor-factory-impl.js"() {
      "use strict";
      init_tensor_impl();
      bufferToTensor = (buffer, options) => {
        if (buffer === void 0) {
          throw new Error("Image buffer must be defined");
        }
        if (options.height === void 0 || options.width === void 0) {
          throw new Error("Image height and width must be defined");
        }
        if (options.tensorLayout === "NHWC") {
          throw new Error("NHWC Tensor layout is not supported yet");
        }
        const { height, width } = options;
        const norm = options.norm ?? { mean: 255, bias: 0 };
        let normMean;
        let normBias;
        if (typeof norm.mean === "number") {
          normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
        } else {
          normMean = [norm.mean[0], norm.mean[1], norm.mean[2], norm.mean[3] ?? 255];
        }
        if (typeof norm.bias === "number") {
          normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
        } else {
          normBias = [norm.bias[0], norm.bias[1], norm.bias[2], norm.bias[3] ?? 0];
        }
        const inputformat = options.format !== void 0 ? options.format : "RGBA";
        const outputformat = options.tensorFormat !== void 0 ? options.tensorFormat !== void 0 ? options.tensorFormat : "RGB" : "RGB";
        const stride = height * width;
        const float32Data = outputformat === "RGBA" ? new Float32Array(stride * 4) : new Float32Array(stride * 3);
        let step = 4, rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
        let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
        if (inputformat === "RGB") {
          step = 3;
          rImagePointer = 0;
          gImagePointer = 1;
          bImagePointer = 2;
          aImagePointer = -1;
        }
        if (outputformat === "RGBA") {
          aTensorPointer = stride * 3;
        } else if (outputformat === "RBG") {
          rTensorPointer = 0;
          bTensorPointer = stride;
          gTensorPointer = stride * 2;
        } else if (outputformat === "BGR") {
          bTensorPointer = 0;
          gTensorPointer = stride;
          rTensorPointer = stride * 2;
        }
        for (let i = 0; i < stride; i++, rImagePointer += step, bImagePointer += step, gImagePointer += step, aImagePointer += step) {
          float32Data[rTensorPointer++] = (buffer[rImagePointer] + normBias[0]) / normMean[0];
          float32Data[gTensorPointer++] = (buffer[gImagePointer] + normBias[1]) / normMean[1];
          float32Data[bTensorPointer++] = (buffer[bImagePointer] + normBias[2]) / normMean[2];
          if (aTensorPointer !== -1 && aImagePointer !== -1) {
            float32Data[aTensorPointer++] = (buffer[aImagePointer] + normBias[3]) / normMean[3];
          }
        }
        const outputTensor = outputformat === "RGBA" ? new Tensor("float32", float32Data, [1, 4, height, width]) : new Tensor("float32", float32Data, [1, 3, height, width]);
        return outputTensor;
      };
      tensorFromImage = async (image, options) => {
        const isHTMLImageEle = typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement;
        const isImageDataEle = typeof ImageData !== "undefined" && image instanceof ImageData;
        const isImageBitmap = typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap;
        const isString = typeof image === "string";
        let data;
        let bufferToTensorOptions = options ?? {};
        const createCanvas = () => {
          if (typeof document !== "undefined") {
            return document.createElement("canvas");
          } else if (typeof OffscreenCanvas !== "undefined") {
            return new OffscreenCanvas(1, 1);
          } else {
            throw new Error("Canvas is not supported");
          }
        };
        const createCanvasContext = (canvas) => {
          if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement) {
            return canvas.getContext("2d");
          } else if (canvas instanceof OffscreenCanvas) {
            return canvas.getContext("2d");
          } else {
            return null;
          }
        };
        if (isHTMLImageEle) {
          const canvas = createCanvas();
          canvas.width = image.width;
          canvas.height = image.height;
          const pixels2DContext = createCanvasContext(canvas);
          if (pixels2DContext != null) {
            let height = image.height;
            let width = image.width;
            if (options !== void 0 && options.resizedHeight !== void 0 && options.resizedWidth !== void 0) {
              height = options.resizedHeight;
              width = options.resizedWidth;
            }
            if (options !== void 0) {
              bufferToTensorOptions = options;
              if (options.tensorFormat !== void 0) {
                throw new Error("Image input config format must be RGBA for HTMLImageElement");
              } else {
                bufferToTensorOptions.tensorFormat = "RGBA";
              }
              bufferToTensorOptions.height = height;
              bufferToTensorOptions.width = width;
            } else {
              bufferToTensorOptions.tensorFormat = "RGBA";
              bufferToTensorOptions.height = height;
              bufferToTensorOptions.width = width;
            }
            pixels2DContext.drawImage(image, 0, 0);
            data = pixels2DContext.getImageData(0, 0, width, height).data;
          } else {
            throw new Error("Can not access image data");
          }
        } else if (isImageDataEle) {
          let height;
          let width;
          if (options !== void 0 && options.resizedWidth !== void 0 && options.resizedHeight !== void 0) {
            height = options.resizedHeight;
            width = options.resizedWidth;
          } else {
            height = image.height;
            width = image.width;
          }
          if (options !== void 0) {
            bufferToTensorOptions = options;
          }
          bufferToTensorOptions.format = "RGBA";
          bufferToTensorOptions.height = height;
          bufferToTensorOptions.width = width;
          if (options !== void 0) {
            const tempCanvas = createCanvas();
            tempCanvas.width = width;
            tempCanvas.height = height;
            const pixels2DContext = createCanvasContext(tempCanvas);
            if (pixels2DContext != null) {
              pixels2DContext.putImageData(image, 0, 0);
              data = pixels2DContext.getImageData(0, 0, width, height).data;
            } else {
              throw new Error("Can not access image data");
            }
          } else {
            data = image.data;
          }
        } else if (isImageBitmap) {
          if (options === void 0) {
            throw new Error("Please provide image config with format for Imagebitmap");
          }
          const canvas = createCanvas();
          canvas.width = image.width;
          canvas.height = image.height;
          const pixels2DContext = createCanvasContext(canvas);
          if (pixels2DContext != null) {
            const height = image.height;
            const width = image.width;
            pixels2DContext.drawImage(image, 0, 0, width, height);
            data = pixels2DContext.getImageData(0, 0, width, height).data;
            bufferToTensorOptions.height = height;
            bufferToTensorOptions.width = width;
            return bufferToTensor(data, bufferToTensorOptions);
          } else {
            throw new Error("Can not access image data");
          }
        } else if (isString) {
          return new Promise((resolve, reject) => {
            const canvas = createCanvas();
            const context = createCanvasContext(canvas);
            if (!image || !context) {
              return reject();
            }
            const newImage = new Image();
            newImage.crossOrigin = "Anonymous";
            newImage.src = image;
            newImage.onload = () => {
              canvas.width = newImage.width;
              canvas.height = newImage.height;
              context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
              const img = context.getImageData(0, 0, canvas.width, canvas.height);
              bufferToTensorOptions.height = canvas.height;
              bufferToTensorOptions.width = canvas.width;
              resolve(bufferToTensor(img.data, bufferToTensorOptions));
            };
          });
        } else {
          throw new Error("Input data provided is not supported - aborted tensor creation");
        }
        if (data !== void 0) {
          return bufferToTensor(data, bufferToTensorOptions);
        } else {
          throw new Error("Input data provided is not supported - aborted tensor creation");
        }
      };
      tensorFromTexture = (texture, options) => {
        const { width, height, download, dispose } = options;
        const dims = [1, height, width, 4];
        return new Tensor({ location: "texture", type: "float32", texture, dims, download, dispose });
      };
      tensorFromGpuBuffer = (gpuBuffer, options) => {
        const { dataType, dims, download, dispose } = options;
        return new Tensor({ location: "gpu-buffer", type: dataType ?? "float32", gpuBuffer, dims, download, dispose });
      };
      tensorFromMLTensor = (mlTensor, options) => {
        const { dataType, dims, download, dispose } = options;
        return new Tensor({ location: "ml-tensor", type: dataType ?? "float32", mlTensor, dims, download, dispose });
      };
      tensorFromPinnedBuffer = (type, buffer, dims) => new Tensor({ location: "cpu-pinned", type, data: buffer, dims: dims ?? [buffer.length] });
    }
  });

  // common/dist/esm/tensor-impl-type-mapping.js
  var NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP, NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP, isTypedArrayChecked, checkTypedArray;
  var init_tensor_impl_type_mapping = __esm({
    "common/dist/esm/tensor-impl-type-mapping.js"() {
      "use strict";
      NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP = /* @__PURE__ */ new Map([
        ["float32", Float32Array],
        ["uint8", Uint8Array],
        ["int8", Int8Array],
        ["uint16", Uint16Array],
        ["int16", Int16Array],
        ["int32", Int32Array],
        ["bool", Uint8Array],
        ["float64", Float64Array],
        ["uint32", Uint32Array],
        ["int4", Uint8Array],
        ["uint4", Uint8Array]
      ]);
      NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP = /* @__PURE__ */ new Map([
        [Float32Array, "float32"],
        [Uint8Array, "uint8"],
        [Int8Array, "int8"],
        [Uint16Array, "uint16"],
        [Int16Array, "int16"],
        [Int32Array, "int32"],
        [Float64Array, "float64"],
        [Uint32Array, "uint32"]
      ]);
      isTypedArrayChecked = false;
      checkTypedArray = () => {
        if (!isTypedArrayChecked) {
          isTypedArrayChecked = true;
          const isBigInt64ArrayAvailable = typeof BigInt64Array !== "undefined" && BigInt64Array.from;
          const isBigUint64ArrayAvailable = typeof BigUint64Array !== "undefined" && BigUint64Array.from;
          const Float16Array2 = globalThis.Float16Array;
          const isFloat16ArrayAvailable = typeof Float16Array2 !== "undefined" && Float16Array2.from;
          if (isBigInt64ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64", BigInt64Array);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array, "int64");
          }
          if (isBigUint64ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64", BigUint64Array);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array, "uint64");
          }
          if (isFloat16ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Float16Array2);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(Float16Array2, "float16");
          } else {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Uint16Array);
          }
        }
      };
    }
  });

  // common/dist/esm/tensor-utils-impl.js
  var calculateSize, tensorReshape;
  var init_tensor_utils_impl = __esm({
    "common/dist/esm/tensor-utils-impl.js"() {
      "use strict";
      init_tensor_impl();
      calculateSize = (dims) => {
        let size = 1;
        for (let i = 0; i < dims.length; i++) {
          const dim = dims[i];
          if (typeof dim !== "number" || !Number.isSafeInteger(dim)) {
            throw new TypeError(`dims[${i}] must be an integer, got: ${dim}`);
          }
          if (dim < 0) {
            throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${dim}`);
          }
          size *= dim;
        }
        return size;
      };
      tensorReshape = (tensor, dims) => {
        switch (tensor.location) {
          case "cpu":
            return new Tensor(tensor.type, tensor.data, dims);
          case "cpu-pinned":
            return new Tensor({
              location: "cpu-pinned",
              data: tensor.data,
              type: tensor.type,
              dims
            });
          case "texture":
            return new Tensor({
              location: "texture",
              texture: tensor.texture,
              type: tensor.type,
              dims
            });
          case "gpu-buffer":
            return new Tensor({
              location: "gpu-buffer",
              gpuBuffer: tensor.gpuBuffer,
              type: tensor.type,
              dims
            });
          case "ml-tensor":
            return new Tensor({
              location: "ml-tensor",
              mlTensor: tensor.mlTensor,
              type: tensor.type,
              dims
            });
          default:
            throw new Error(`tensorReshape: tensor location ${tensor.location} is not supported`);
        }
      };
    }
  });

  // common/dist/esm/tensor-impl.js
  var Tensor;
  var init_tensor_impl = __esm({
    "common/dist/esm/tensor-impl.js"() {
      "use strict";
      init_tensor_conversion_impl();
      init_tensor_factory_impl();
      init_tensor_impl_type_mapping();
      init_tensor_utils_impl();
      Tensor = class {
        /**
         * implementation.
         */
        constructor(arg0, arg1, arg2) {
          checkTypedArray();
          let type;
          let dims;
          if (typeof arg0 === "object" && "location" in arg0) {
            this.dataLocation = arg0.location;
            type = arg0.type;
            dims = arg0.dims;
            switch (arg0.location) {
              case "cpu-pinned": {
                const expectedTypedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(type);
                if (!expectedTypedArrayConstructor) {
                  throw new TypeError(`unsupported type "${type}" to create tensor from pinned buffer`);
                }
                if (!(arg0.data instanceof expectedTypedArrayConstructor)) {
                  throw new TypeError(`buffer should be of type ${expectedTypedArrayConstructor.name}`);
                }
                this.cpuData = arg0.data;
                break;
              }
              case "texture": {
                if (type !== "float32") {
                  throw new TypeError(`unsupported type "${type}" to create tensor from texture`);
                }
                this.gpuTextureData = arg0.texture;
                this.downloader = arg0.download;
                this.disposer = arg0.dispose;
                break;
              }
              case "gpu-buffer": {
                if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
                  throw new TypeError(`unsupported type "${type}" to create tensor from gpu buffer`);
                }
                this.gpuBufferData = arg0.gpuBuffer;
                this.downloader = arg0.download;
                this.disposer = arg0.dispose;
                break;
              }
              case "ml-tensor": {
                if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint64" && type !== "int8" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
                  throw new TypeError(`unsupported type "${type}" to create tensor from MLTensor`);
                }
                this.mlTensorData = arg0.mlTensor;
                this.downloader = arg0.download;
                this.disposer = arg0.dispose;
                break;
              }
              default:
                throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
            }
          } else {
            let data;
            let maybeDims;
            if (typeof arg0 === "string") {
              type = arg0;
              maybeDims = arg2;
              if (arg0 === "string") {
                if (!Array.isArray(arg1)) {
                  throw new TypeError("A string tensor's data must be a string array.");
                }
                data = arg1;
              } else {
                const typedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(arg0);
                if (typedArrayConstructor === void 0) {
                  throw new TypeError(`Unsupported tensor type: ${arg0}.`);
                }
                if (Array.isArray(arg1)) {
                  if (arg0 === "float16" && typedArrayConstructor === Uint16Array || arg0 === "uint4" || arg0 === "int4") {
                    throw new TypeError(`Creating a ${arg0} tensor from number array is not supported. Please use ${typedArrayConstructor.name} as data.`);
                  } else if (arg0 === "uint64" || arg0 === "int64") {
                    data = typedArrayConstructor.from(arg1, BigInt);
                  } else {
                    data = typedArrayConstructor.from(arg1);
                  }
                } else if (arg1 instanceof typedArrayConstructor) {
                  data = arg1;
                } else if (arg1 instanceof Uint8ClampedArray) {
                  if (arg0 === "uint8") {
                    data = Uint8Array.from(arg1);
                  } else {
                    throw new TypeError(`A Uint8ClampedArray tensor's data must be type of uint8`);
                  }
                } else if (arg0 === "float16" && arg1 instanceof Uint16Array && typedArrayConstructor !== Uint16Array) {
                  data = new globalThis.Float16Array(arg1.buffer, arg1.byteOffset, arg1.length);
                } else {
                  throw new TypeError(`A ${type} tensor's data must be type of ${typedArrayConstructor}`);
                }
              }
            } else {
              maybeDims = arg1;
              if (Array.isArray(arg0)) {
                if (arg0.length === 0) {
                  throw new TypeError("Tensor type cannot be inferred from an empty array.");
                }
                const firstElementType = typeof arg0[0];
                if (firstElementType === "string") {
                  type = "string";
                  data = arg0;
                } else if (firstElementType === "boolean") {
                  type = "bool";
                  data = Uint8Array.from(arg0);
                } else {
                  throw new TypeError(`Invalid element type of data array: ${firstElementType}.`);
                }
              } else if (arg0 instanceof Uint8ClampedArray) {
                type = "uint8";
                data = Uint8Array.from(arg0);
              } else {
                const mappedType = NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.get(arg0.constructor);
                if (mappedType === void 0) {
                  throw new TypeError(`Unsupported type for tensor data: ${arg0.constructor}.`);
                }
                type = mappedType;
                data = arg0;
              }
            }
            if (maybeDims === void 0) {
              maybeDims = [data.length];
            } else if (!Array.isArray(maybeDims)) {
              throw new TypeError("A tensor's dims must be a number array");
            }
            dims = maybeDims;
            this.cpuData = data;
            this.dataLocation = "cpu";
          }
          const size = calculateSize(dims);
          if (this.cpuData && size !== this.cpuData.length) {
            if ((type === "uint4" || type === "int4") && Math.ceil(size / 2) === this.cpuData.length) {
            } else {
              throw new Error(`Tensor's size(${size}) does not match data length(${this.cpuData.length}).`);
            }
          }
          this.type = type;
          this.dims = dims;
          this.size = size;
        }
        // #endregion
        // #region factory
        static async fromImage(image, options) {
          return tensorFromImage(image, options);
        }
        static fromTexture(texture, options) {
          return tensorFromTexture(texture, options);
        }
        static fromGpuBuffer(gpuBuffer, options) {
          return tensorFromGpuBuffer(gpuBuffer, options);
        }
        static fromMLTensor(mlTensor, options) {
          return tensorFromMLTensor(mlTensor, options);
        }
        static fromPinnedBuffer(type, buffer, dims) {
          return tensorFromPinnedBuffer(type, buffer, dims);
        }
        // #endregion
        // #region conversions
        toDataURL(options) {
          return tensorToDataURL(this, options);
        }
        toImageData(options) {
          return tensorToImageData(this, options);
        }
        // #endregion
        // #region properties
        get data() {
          this.ensureValid();
          if (!this.cpuData) {
            throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
          }
          return this.cpuData;
        }
        get location() {
          return this.dataLocation;
        }
        get texture() {
          this.ensureValid();
          if (!this.gpuTextureData) {
            throw new Error("The data is not stored as a WebGL texture.");
          }
          return this.gpuTextureData;
        }
        get gpuBuffer() {
          this.ensureValid();
          if (!this.gpuBufferData) {
            throw new Error("The data is not stored as a WebGPU buffer.");
          }
          return this.gpuBufferData;
        }
        get mlTensor() {
          this.ensureValid();
          if (!this.mlTensorData) {
            throw new Error("The data is not stored as a WebNN MLTensor.");
          }
          return this.mlTensorData;
        }
        // #endregion
        // #region methods
        async getData(releaseData) {
          this.ensureValid();
          switch (this.dataLocation) {
            case "cpu":
            case "cpu-pinned":
              return this.data;
            case "texture":
            case "gpu-buffer":
            case "ml-tensor": {
              if (!this.downloader) {
                throw new Error("The current tensor is not created with a specified data downloader.");
              }
              if (this.isDownloading) {
                throw new Error("The current tensor is being downloaded.");
              }
              try {
                this.isDownloading = true;
                const data = await this.downloader();
                this.downloader = void 0;
                this.dataLocation = "cpu";
                this.cpuData = data;
                if (releaseData && this.disposer) {
                  this.disposer();
                  this.disposer = void 0;
                }
                return data;
              } finally {
                this.isDownloading = false;
              }
            }
            default:
              throw new Error(`cannot get data from location: ${this.dataLocation}`);
          }
        }
        dispose() {
          if (this.isDownloading) {
            throw new Error("The current tensor is being downloaded.");
          }
          if (this.disposer) {
            this.disposer();
            this.disposer = void 0;
          }
          this.cpuData = void 0;
          this.gpuTextureData = void 0;
          this.gpuBufferData = void 0;
          this.mlTensorData = void 0;
          this.downloader = void 0;
          this.isDownloading = void 0;
          this.dataLocation = "none";
        }
        // #endregion
        // #region tensor utilities
        ensureValid() {
          if (this.dataLocation === "none") {
            throw new Error("The tensor is disposed.");
          }
        }
        reshape(dims) {
          this.ensureValid();
          if (this.downloader || this.disposer) {
            throw new Error("Cannot reshape a tensor that owns GPU resource.");
          }
          return tensorReshape(this, dims);
        }
      };
    }
  });

  // common/dist/esm/tensor.js
  var Tensor2;
  var init_tensor = __esm({
    "common/dist/esm/tensor.js"() {
      "use strict";
      init_tensor_impl();
      Tensor2 = Tensor;
    }
  });

  // common/dist/esm/trace.js
  var TRACE, TRACE_FUNC, TRACE_FUNC_BEGIN, TRACE_FUNC_END, TRACE_EVENT_BEGIN, TRACE_EVENT_END;
  var init_trace = __esm({
    "common/dist/esm/trace.js"() {
      "use strict";
      init_env_impl();
      TRACE = (deviceType, label) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        console.timeStamp(`${deviceType}::ORT::${label}`);
      };
      TRACE_FUNC = (msg, extraMsg) => {
        const stack = new Error().stack?.split(/\r\n|\r|\n/g) || [];
        let hasTraceFunc = false;
        for (let i = 0; i < stack.length; i++) {
          if (hasTraceFunc && !stack[i].includes("TRACE_FUNC")) {
            let label = `FUNC_${msg}::${stack[i].trim().split(" ")[1]}`;
            if (extraMsg) {
              label += `::${extraMsg}`;
            }
            TRACE("CPU", label);
            return;
          }
          if (stack[i].includes("TRACE_FUNC")) {
            hasTraceFunc = true;
          }
        }
      };
      TRACE_FUNC_BEGIN = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        TRACE_FUNC("BEGIN", extraMsg);
      };
      TRACE_FUNC_END = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        TRACE_FUNC("END", extraMsg);
      };
      TRACE_EVENT_BEGIN = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        console.time(`ORT::${extraMsg}`);
      };
      TRACE_EVENT_END = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        console.timeEnd(`ORT::${extraMsg}`);
      };
    }
  });

  // common/dist/esm/inference-session-impl.js
  var InferenceSession;
  var init_inference_session_impl = __esm({
    "common/dist/esm/inference-session-impl.js"() {
      "use strict";
      init_backend_impl();
      init_tensor();
      init_trace();
      InferenceSession = class _InferenceSession {
        constructor(handler) {
          this.handler = handler;
        }
        async run(feeds, arg1, arg2) {
          TRACE_FUNC_BEGIN();
          TRACE_EVENT_BEGIN("InferenceSession.run");
          const fetches = {};
          let options = {};
          if (typeof feeds !== "object" || feeds === null || feeds instanceof Tensor2 || Array.isArray(feeds)) {
            throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
          }
          let isFetchesEmpty = true;
          if (typeof arg1 === "object") {
            if (arg1 === null) {
              throw new TypeError("Unexpected argument[1]: cannot be null.");
            }
            if (arg1 instanceof Tensor2) {
              throw new TypeError("'fetches' cannot be a Tensor");
            }
            if (Array.isArray(arg1)) {
              if (arg1.length === 0) {
                throw new TypeError("'fetches' cannot be an empty array.");
              }
              isFetchesEmpty = false;
              for (const name of arg1) {
                if (typeof name !== "string") {
                  throw new TypeError("'fetches' must be a string array or an object.");
                }
                if (this.outputNames.indexOf(name) === -1) {
                  throw new RangeError(`'fetches' contains invalid output name: ${name}.`);
                }
                fetches[name] = null;
              }
              if (typeof arg2 === "object" && arg2 !== null) {
                options = arg2;
              } else if (typeof arg2 !== "undefined") {
                throw new TypeError("'options' must be an object.");
              }
            } else {
              let isFetches = false;
              const arg1Keys = Object.getOwnPropertyNames(arg1);
              for (const name of this.outputNames) {
                if (arg1Keys.indexOf(name) !== -1) {
                  const v = arg1[name];
                  if (v === null || v instanceof Tensor2) {
                    isFetches = true;
                    isFetchesEmpty = false;
                    fetches[name] = v;
                  }
                }
              }
              if (isFetches) {
                if (typeof arg2 === "object" && arg2 !== null) {
                  options = arg2;
                } else if (typeof arg2 !== "undefined") {
                  throw new TypeError("'options' must be an object.");
                }
              } else {
                options = arg1;
              }
            }
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
          }
          for (const name of this.inputNames) {
            if (typeof feeds[name] === "undefined") {
              throw new Error(`input '${name}' is missing in 'feeds'.`);
            }
          }
          if (isFetchesEmpty) {
            for (const name of this.outputNames) {
              fetches[name] = null;
            }
          }
          const results = await this.handler.run(feeds, fetches, options);
          const returnValue = {};
          for (const key in results) {
            if (Object.hasOwnProperty.call(results, key)) {
              const result = results[key];
              if (result instanceof Tensor2) {
                returnValue[key] = result;
              } else {
                returnValue[key] = new Tensor2(result.type, result.data, result.dims);
              }
            }
          }
          TRACE_EVENT_END("InferenceSession.run");
          TRACE_FUNC_END();
          return returnValue;
        }
        async release() {
          return this.handler.dispose();
        }
        static async create(arg0, arg1, arg2, arg3) {
          TRACE_FUNC_BEGIN();
          TRACE_EVENT_BEGIN("InferenceSession.create");
          let filePathOrUint8Array;
          let options = {};
          if (typeof arg0 === "string") {
            filePathOrUint8Array = arg0;
            if (typeof arg1 === "object" && arg1 !== null) {
              options = arg1;
            } else if (typeof arg1 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
          } else if (arg0 instanceof Uint8Array) {
            filePathOrUint8Array = arg0;
            if (typeof arg1 === "object" && arg1 !== null) {
              options = arg1;
            } else if (typeof arg1 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
          } else if (arg0 instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && arg0 instanceof SharedArrayBuffer) {
            const buffer = arg0;
            let byteOffset = 0;
            let byteLength = arg0.byteLength;
            if (typeof arg1 === "object" && arg1 !== null) {
              options = arg1;
            } else if (typeof arg1 === "number") {
              byteOffset = arg1;
              if (!Number.isSafeInteger(byteOffset)) {
                throw new RangeError("'byteOffset' must be an integer.");
              }
              if (byteOffset < 0 || byteOffset >= buffer.byteLength) {
                throw new RangeError(`'byteOffset' is out of range [0, ${buffer.byteLength}).`);
              }
              byteLength = arg0.byteLength - byteOffset;
              if (typeof arg2 === "number") {
                byteLength = arg2;
                if (!Number.isSafeInteger(byteLength)) {
                  throw new RangeError("'byteLength' must be an integer.");
                }
                if (byteLength <= 0 || byteOffset + byteLength > buffer.byteLength) {
                  throw new RangeError(`'byteLength' is out of range (0, ${buffer.byteLength - byteOffset}].`);
                }
                if (typeof arg3 === "object" && arg3 !== null) {
                  options = arg3;
                } else if (typeof arg3 !== "undefined") {
                  throw new TypeError("'options' must be an object.");
                }
              } else if (typeof arg2 !== "undefined") {
                throw new TypeError("'byteLength' must be a number.");
              }
            } else if (typeof arg1 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
            filePathOrUint8Array = new Uint8Array(buffer, byteOffset, byteLength);
          } else {
            throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
          }
          const [backend, optionsWithValidatedEPs] = await resolveBackendAndExecutionProviders(options);
          const handler = await backend.createInferenceSessionHandler(filePathOrUint8Array, optionsWithValidatedEPs);
          TRACE_EVENT_END("InferenceSession.create");
          TRACE_FUNC_END();
          return new _InferenceSession(handler);
        }
        startProfiling() {
          this.handler.startProfiling();
        }
        endProfiling() {
          this.handler.endProfiling();
        }
        get inputNames() {
          return this.handler.inputNames;
        }
        get outputNames() {
          return this.handler.outputNames;
        }
        get inputMetadata() {
          return this.handler.inputMetadata;
        }
        get outputMetadata() {
          return this.handler.outputMetadata;
        }
      };
    }
  });

  // common/dist/esm/inference-session.js
  var InferenceSession2;
  var init_inference_session = __esm({
    "common/dist/esm/inference-session.js"() {
      "use strict";
      init_inference_session_impl();
      InferenceSession2 = InferenceSession;
    }
  });

  // common/dist/esm/tensor-conversion.js
  var init_tensor_conversion = __esm({
    "common/dist/esm/tensor-conversion.js"() {
      "use strict";
    }
  });

  // common/dist/esm/tensor-factory.js
  var init_tensor_factory = __esm({
    "common/dist/esm/tensor-factory.js"() {
      "use strict";
    }
  });

  // common/dist/esm/onnx-model.js
  var init_onnx_model = __esm({
    "common/dist/esm/onnx-model.js"() {
      "use strict";
    }
  });

  // common/dist/esm/onnx-value.js
  var init_onnx_value = __esm({
    "common/dist/esm/onnx-value.js"() {
      "use strict";
    }
  });

  // common/dist/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    InferenceSession: () => InferenceSession2,
    TRACE: () => TRACE,
    TRACE_EVENT_BEGIN: () => TRACE_EVENT_BEGIN,
    TRACE_EVENT_END: () => TRACE_EVENT_END,
    TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
    TRACE_FUNC_END: () => TRACE_FUNC_END,
    Tensor: () => Tensor2,
    env: () => env2,
    registerBackend: () => registerBackend
  });
  var init_esm = __esm({
    "common/dist/esm/index.js"() {
      "use strict";
      init_backend();
      init_env();
      init_inference_session();
      init_tensor();
      init_tensor_conversion();
      init_tensor_factory();
      init_trace();
      init_onnx_model();
      init_onnx_value();
    }
  });

  // web/lib/wasm/wasm-utils-env.ts
  var isNode;
  var init_wasm_utils_env = __esm({
    "web/lib/wasm/wasm-utils-env.ts"() {
      "use strict";
      isNode = false;
    }
  });

  // web/lib/wasm/proxy-worker/main.ts
  var main_exports = {};
  __export(main_exports, {
    default: () => main_default
  });
  var WORKER_NAME, isProxyWorker, main_default;
  var init_main = __esm({
    "web/lib/wasm/proxy-worker/main.ts"() {
      "use strict";
      init_wasm_core_impl();
      init_wasm_factory();
      init_wasm_utils_import();
      WORKER_NAME = "ort-wasm-proxy-worker";
      isProxyWorker = globalThis.self?.name === WORKER_NAME;
      if (isProxyWorker) {
        self.onmessage = (ev) => {
          const { type, in: message } = ev.data;
          try {
            switch (type) {
              case "init-wasm":
                initializeWebAssembly(message.wasm).then(
                  () => {
                    initRuntime(message).then(
                      () => {
                        postMessage({ type });
                      },
                      (err) => {
                        postMessage({ type, err });
                      }
                    );
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              case "init-ep": {
                const { epName, env: env3 } = message;
                initEp(env3, epName).then(
                  () => {
                    postMessage({ type });
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              }
              case "copy-from": {
                const { buffer } = message;
                const bufferData = copyFromExternalBuffer(buffer);
                postMessage({ type, out: bufferData });
                break;
              }
              case "create": {
                const { model, options } = message;
                createSession(model, options).then(
                  (sessionMetadata) => {
                    postMessage({ type, out: sessionMetadata });
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              }
              case "release":
                releaseSession(message);
                postMessage({ type });
                break;
              case "run": {
                const { sessionId, inputIndices, inputs, outputIndices, options } = message;
                run(sessionId, inputIndices, inputs, outputIndices, new Array(outputIndices.length).fill(null), options).then(
                  (outputs) => {
                    if (outputs.some((o) => o[3] !== "cpu")) {
                      postMessage({ type, err: "Proxy does not support non-cpu tensor location." });
                    } else {
                      postMessage(
                        { type, out: outputs },
                        extractTransferableBuffers([...inputs, ...outputs])
                      );
                    }
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              }
              case "end-profiling":
                endProfiling(message);
                postMessage({ type });
                break;
              default:
            }
          } catch (err) {
            postMessage({ type, err });
          }
        };
      }
      main_default = isProxyWorker ? null : (urlOverride) => new Worker(urlOverride ?? scriptSrc, { type: false ? "module" : "classic", name: WORKER_NAME });
    }
  });

  // web/lib/wasm/wasm-utils-import.ts
  var origin, getScriptSrc, scriptSrc, inferWasmPathPrefixFromScriptSrc, isSameOrigin, normalizeUrl, fallbackUrl, preload, dynamicImportDefault, createProxyWorker, importProxyWorker, embeddedWasmModule, importWasmModule;
  var init_wasm_utils_import = __esm({
    "web/lib/wasm/wasm-utils-import.ts"() {
      "use strict";
      init_wasm_utils_env();
      origin = isNode || typeof location === "undefined" ? void 0 : location.origin;
      getScriptSrc = () => {
        if (isNode) {
          return void 0;
        }
        if (false) {
          if (isEsmImportMetaUrlHardcodedAsFileUri) {
            const URL2 = URL;
            return new URL(new URL2("ort.wasm.js", void 0).href, origin).href;
          }
          return void 0;
        }
        return typeof document !== "undefined" ? document.currentScript?.src : (
          // use `self.location.href` if available
          typeof self !== "undefined" ? self.location?.href : void 0
        );
      };
      scriptSrc = getScriptSrc();
      inferWasmPathPrefixFromScriptSrc = () => {
        if (scriptSrc && !scriptSrc.startsWith("blob:")) {
          return scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);
        }
        return void 0;
      };
      isSameOrigin = (filename, prefixOverride) => {
        try {
          const baseUrl = prefixOverride ?? scriptSrc;
          const url = baseUrl ? new URL(filename, baseUrl) : new URL(filename);
          return url.origin === origin;
        } catch {
          return false;
        }
      };
      normalizeUrl = (filename, prefixOverride) => {
        const baseUrl = prefixOverride ?? scriptSrc;
        try {
          const url = baseUrl ? new URL(filename, baseUrl) : new URL(filename);
          return url.href;
        } catch {
          return void 0;
        }
      };
      fallbackUrl = (filename, prefixOverride) => `${prefixOverride ?? "./"}${filename}`;
      preload = async (absoluteUrl) => {
        const response = await fetch(absoluteUrl, { credentials: "same-origin" });
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      };
      dynamicImportDefault = async (url) => (await import(
        /* webpackIgnore: true */
        url
      )).default;
      createProxyWorker = // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
      false ? void 0 : (init_main(), __toCommonJS(main_exports)).default;
      importProxyWorker = async () => {
        if (!scriptSrc) {
          throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
        }
        if (isSameOrigin(scriptSrc)) {
          return [void 0, createProxyWorker()];
        }
        const url = await preload(scriptSrc);
        return [url, createProxyWorker(url)];
      };
      embeddedWasmModule = false ? (
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        (false ? null : false ? null : null).default
      ) : void 0;
      importWasmModule = async (urlOverride, prefixOverride, isMultiThreaded, isWasmOverridden) => {
        let useEmbeddedModule = embeddedWasmModule && !(urlOverride || prefixOverride);
        if (useEmbeddedModule) {
          if (!scriptSrc) {
            if (isWasmOverridden && !isMultiThreaded) {
              useEmbeddedModule = true;
            } else {
              throw new Error("cannot determine the script source URL.");
            }
          } else {
            useEmbeddedModule = isSameOrigin(scriptSrc);
          }
        }
        if (useEmbeddedModule) {
          return [void 0, embeddedWasmModule];
        } else {
          const wasmModuleFilename = false ? "ort-wasm-simd-threaded.jsep.mjs" : false ? "ort-wasm-simd-threaded.asyncify.mjs" : "ort-wasm-simd-threaded.mjs";
          const wasmModuleUrl = urlOverride ?? normalizeUrl(wasmModuleFilename, prefixOverride);
          const needPreload = !isNode && isMultiThreaded && wasmModuleUrl && !isSameOrigin(wasmModuleUrl, prefixOverride);
          const url = needPreload ? await preload(wasmModuleUrl) : wasmModuleUrl ?? fallbackUrl(wasmModuleFilename, prefixOverride);
          return [needPreload ? url : void 0, await dynamicImportDefault(url)];
        }
      };
    }
  });

  // web/lib/wasm/wasm-factory.ts
  var wasm, initialized, initializing, aborted, isMultiThreadSupported, isSimdSupported, isRelaxedSimdSupported, initializeWebAssembly, getInstance;
  var init_wasm_factory = __esm({
    "web/lib/wasm/wasm-factory.ts"() {
      "use strict";
      init_wasm_utils_import();
      initialized = false;
      initializing = false;
      aborted = false;
      isMultiThreadSupported = () => {
        if (typeof SharedArrayBuffer === "undefined") {
          return false;
        }
        try {
          if (typeof MessageChannel !== "undefined") {
            new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));
          }
          return WebAssembly.validate(
            new Uint8Array([
              0,
              97,
              115,
              109,
              1,
              0,
              0,
              0,
              1,
              4,
              1,
              96,
              0,
              0,
              3,
              2,
              1,
              0,
              5,
              4,
              1,
              3,
              1,
              1,
              10,
              11,
              1,
              9,
              0,
              65,
              0,
              254,
              16,
              2,
              0,
              26,
              11
            ])
          );
        } catch (e) {
          return false;
        }
      };
      isSimdSupported = () => {
        try {
          return WebAssembly.validate(
            new Uint8Array([
              0,
              97,
              115,
              109,
              1,
              0,
              0,
              0,
              1,
              4,
              1,
              96,
              0,
              0,
              3,
              2,
              1,
              0,
              10,
              30,
              1,
              28,
              0,
              65,
              0,
              253,
              15,
              253,
              12,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              253,
              186,
              1,
              26,
              11
            ])
          );
        } catch (e) {
          return false;
        }
      };
      isRelaxedSimdSupported = () => {
        try {
          return WebAssembly.validate(
            new Uint8Array([
              0,
              97,
              115,
              109,
              1,
              0,
              0,
              0,
              1,
              5,
              1,
              96,
              0,
              1,
              123,
              3,
              2,
              1,
              0,
              10,
              19,
              1,
              17,
              0,
              65,
              1,
              253,
              15,
              65,
              2,
              253,
              15,
              65,
              3,
              253,
              15,
              253,
              147,
              2,
              11
            ])
          );
        } catch (e) {
          return false;
        }
      };
      initializeWebAssembly = async (flags) => {
        if (initialized) {
          return Promise.resolve();
        }
        if (initializing) {
          throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
        }
        if (aborted) {
          throw new Error("previous call to 'initializeWebAssembly()' failed.");
        }
        initializing = true;
        const timeout = flags.initTimeout;
        let numThreads = flags.numThreads;
        if (flags.simd === false) {
        } else if (flags.simd === "relaxed") {
          if (!isRelaxedSimdSupported()) {
            throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
          }
        } else if (!isSimdSupported()) {
          throw new Error("WebAssembly SIMD is not supported in the current environment.");
        }
        const multiThreadSupported = isMultiThreadSupported();
        if (numThreads > 1 && !multiThreadSupported) {
          if (typeof self !== "undefined" && !self.crossOriginIsolated) {
            console.warn(
              "env.wasm.numThreads is set to " + numThreads + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."
            );
          }
          console.warn(
            "WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."
          );
          flags.numThreads = numThreads = 1;
        }
        const wasmPaths = flags.wasmPaths;
        const wasmPrefixOverride = typeof wasmPaths === "string" ? wasmPaths : void 0;
        const mjsPathOverrideFlag = wasmPaths?.mjs;
        const mjsPathOverride = mjsPathOverrideFlag?.href ?? mjsPathOverrideFlag;
        const wasmPathOverrideFlag = wasmPaths?.wasm;
        const wasmPathOverride = wasmPathOverrideFlag?.href ?? wasmPathOverrideFlag;
        const wasmBinaryOverride = flags.wasmBinary;
        const [objectUrl, ortWasmFactory] = await importWasmModule(
          mjsPathOverride,
          wasmPrefixOverride,
          numThreads > 1,
          !!wasmBinaryOverride || !!wasmPathOverride
        );
        let isTimeout = false;
        const tasks = [];
        if (timeout > 0) {
          tasks.push(
            new Promise((resolve) => {
              setTimeout(() => {
                isTimeout = true;
                resolve();
              }, timeout);
            })
          );
        }
        tasks.push(
          new Promise((resolve, reject) => {
            const config = {
              /**
               * The number of threads. WebAssembly will create (Module.numThreads - 1) workers. If it is 1, no worker will be
               * created.
               */
              numThreads
            };
            if (wasmBinaryOverride) {
              config.wasmBinary = wasmBinaryOverride;
            } else if (wasmPathOverride || wasmPrefixOverride) {
              config.locateFile = (fileName) => wasmPathOverride ?? wasmPrefixOverride + fileName;
            } else if (mjsPathOverride && mjsPathOverride.indexOf("blob:") !== 0) {
              config.locateFile = (fileName) => new URL(fileName, mjsPathOverride).href;
            } else if (objectUrl) {
              const inferredWasmPathPrefix = inferWasmPathPrefixFromScriptSrc();
              if (inferredWasmPathPrefix) {
                config.locateFile = (fileName) => inferredWasmPathPrefix + fileName;
              }
            }
            ortWasmFactory(config).then(
              // wasm module initialized successfully
              (module) => {
                initializing = false;
                initialized = true;
                wasm = module;
                resolve();
                if (objectUrl) {
                  URL.revokeObjectURL(objectUrl);
                }
              },
              // wasm module failed to initialize
              (what) => {
                initializing = false;
                aborted = true;
                reject(what);
              }
            );
          })
        );
        await Promise.race(tasks);
        if (isTimeout) {
          throw new Error(`WebAssembly backend initializing failed due to timeout: ${timeout}ms`);
        }
      };
      getInstance = () => {
        if (initialized && wasm) {
          return wasm;
        }
        throw new Error("WebAssembly is not initialized yet.");
      };
    }
  });

  // web/lib/wasm/wasm-utils.ts
  var allocWasmString, iterateExtraOptions, checkLastError;
  var init_wasm_utils = __esm({
    "web/lib/wasm/wasm-utils.ts"() {
      "use strict";
      init_wasm_factory();
      allocWasmString = (data, allocs) => {
        const wasm2 = getInstance();
        const dataLength = wasm2.lengthBytesUTF8(data) + 1;
        const dataOffset = wasm2._malloc(dataLength);
        wasm2.stringToUTF8(data, dataOffset, dataLength);
        allocs.push(dataOffset);
        return dataOffset;
      };
      iterateExtraOptions = (options, prefix, seen, handler) => {
        if (typeof options == "object" && options !== null) {
          if (seen.has(options)) {
            throw new Error("Circular reference in options");
          } else {
            seen.add(options);
          }
        }
        Object.entries(options).forEach(([key, value]) => {
          const name = prefix ? prefix + key : key;
          if (typeof value === "object") {
            iterateExtraOptions(value, name + ".", seen, handler);
          } else if (typeof value === "string" || typeof value === "number") {
            handler(name, value.toString());
          } else if (typeof value === "boolean") {
            handler(name, value ? "1" : "0");
          } else {
            throw new Error(`Can't handle extra config type: ${typeof value}`);
          }
        });
      };
      checkLastError = (message) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        try {
          const ptrSize = wasm2.PTR_SIZE;
          const paramsOffset = wasm2.stackAlloc(2 * ptrSize);
          wasm2._OrtGetLastError(paramsOffset, paramsOffset + ptrSize);
          const errorCode = Number(wasm2.getValue(paramsOffset, ptrSize === 4 ? "i32" : "i64"));
          const errorMessagePointer = wasm2.getValue(paramsOffset + ptrSize, "*");
          const errorMessage = errorMessagePointer ? wasm2.UTF8ToString(errorMessagePointer) : "";
          throw new Error(`${message} ERROR_CODE: ${errorCode}, ERROR_MESSAGE: ${errorMessage}`);
        } finally {
          wasm2.stackRestore(stack);
        }
      };
    }
  });

  // web/lib/wasm/run-options.ts
  var setRunOptions;
  var init_run_options = __esm({
    "web/lib/wasm/run-options.ts"() {
      "use strict";
      init_wasm_factory();
      init_wasm_utils();
      setRunOptions = (options) => {
        const wasm2 = getInstance();
        let runOptionsHandle = 0;
        const allocs = [];
        const runOptions = options || {};
        try {
          if (options?.logSeverityLevel === void 0) {
            runOptions.logSeverityLevel = 2;
          } else if (typeof options.logSeverityLevel !== "number" || !Number.isInteger(options.logSeverityLevel) || options.logSeverityLevel < 0 || options.logSeverityLevel > 4) {
            throw new Error(`log severity level is not valid: ${options.logSeverityLevel}`);
          }
          if (options?.logVerbosityLevel === void 0) {
            runOptions.logVerbosityLevel = 0;
          } else if (typeof options.logVerbosityLevel !== "number" || !Number.isInteger(options.logVerbosityLevel)) {
            throw new Error(`log verbosity level is not valid: ${options.logVerbosityLevel}`);
          }
          if (options?.terminate === void 0) {
            runOptions.terminate = false;
          }
          let tagDataOffset = 0;
          if (options?.tag !== void 0) {
            tagDataOffset = allocWasmString(options.tag, allocs);
          }
          runOptionsHandle = wasm2._OrtCreateRunOptions(
            runOptions.logSeverityLevel,
            runOptions.logVerbosityLevel,
            !!runOptions.terminate,
            tagDataOffset
          );
          if (runOptionsHandle === 0) {
            checkLastError("Can't create run options.");
          }
          if (options?.extra !== void 0) {
            iterateExtraOptions(options.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {
              const keyDataOffset = allocWasmString(key, allocs);
              const valueDataOffset = allocWasmString(value, allocs);
              if (wasm2._OrtAddRunConfigEntry(runOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                checkLastError(`Can't set a run config entry: ${key} - ${value}.`);
              }
            });
          }
          return [runOptionsHandle, allocs];
        } catch (e) {
          if (runOptionsHandle !== 0) {
            wasm2._OrtReleaseRunOptions(runOptionsHandle);
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
          throw e;
        }
      };
    }
  });

  // web/lib/wasm/session-options.ts
  var getGraphOptimzationLevel, getExecutionMode, appendDefaultOptions, appendSessionConfig, setExecutionProviders, setSessionOptions;
  var init_session_options = __esm({
    "web/lib/wasm/session-options.ts"() {
      "use strict";
      init_wasm_factory();
      init_wasm_utils();
      getGraphOptimzationLevel = (graphOptimizationLevel) => {
        switch (graphOptimizationLevel) {
          case "disabled":
            return 0;
          case "basic":
            return 1;
          case "extended":
            return 2;
          case "layout":
            return 3;
          case "all":
            return 99;
          default:
            throw new Error(`unsupported graph optimization level: ${graphOptimizationLevel}`);
        }
      };
      getExecutionMode = (executionMode) => {
        switch (executionMode) {
          case "sequential":
            return 0;
          case "parallel":
            return 1;
          default:
            throw new Error(`unsupported execution mode: ${executionMode}`);
        }
      };
      appendDefaultOptions = (options) => {
        if (!options.extra) {
          options.extra = {};
        }
        if (!options.extra.session) {
          options.extra.session = {};
        }
        const session = options.extra.session;
        if (!session.use_ort_model_bytes_directly) {
          session.use_ort_model_bytes_directly = "1";
        }
        if (options.executionProviders && options.executionProviders.some((ep) => (typeof ep === "string" ? ep : ep.name) === "webgpu")) {
          options.enableMemPattern = false;
        }
      };
      appendSessionConfig = (sessionOptionsHandle, key, value, allocs) => {
        const keyDataOffset = allocWasmString(key, allocs);
        const valueDataOffset = allocWasmString(value, allocs);
        if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
          checkLastError(`Can't set a session config entry: ${key} - ${value}.`);
        }
      };
      setExecutionProviders = async (sessionOptionsHandle, executionProviders, allocs) => {
        for (const ep of executionProviders) {
          let epName = typeof ep === "string" ? ep : ep.name;
          const epOptions = [];
          switch (epName) {
            case "webnn":
              epName = "WEBNN";
              if (typeof ep !== "string") {
                const webnnOptions = ep;
                const deviceType = webnnOptions?.deviceType;
                if (deviceType) {
                  appendSessionConfig(sessionOptionsHandle, "deviceType", deviceType, allocs);
                }
              }
              break;
            case "webgpu":
              if (false) {
                epName = "WebGPU";
                let customDevice;
                if (typeof ep !== "string") {
                  const customOptions = ep;
                  if (customOptions.device) {
                    if (typeof GPUDevice !== "undefined" && customOptions.device instanceof GPUDevice) {
                      customDevice = customOptions.device;
                    } else {
                      throw new Error("Invalid GPU device set in WebGPU EP options.");
                    }
                  }
                }
                const info = getInstance().webgpuRegisterDevice(customDevice);
                if (info) {
                  const [deviceId, instanceHandle, deviceHandle] = info;
                  appendEpOption(epOptions, "deviceId", deviceId.toString(), allocs);
                  appendEpOption(epOptions, "webgpuInstance", instanceHandle.toString(), allocs);
                  appendEpOption(epOptions, "webgpuDevice", deviceHandle.toString(), allocs);
                }
              } else {
                epName = "JS";
                if (typeof ep !== "string") {
                  const webgpuOptions = ep;
                  if (webgpuOptions?.preferredLayout) {
                    if (webgpuOptions.preferredLayout !== "NCHW" && webgpuOptions.preferredLayout !== "NHWC") {
                      throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${webgpuOptions.preferredLayout}`);
                    }
                    appendSessionConfig(sessionOptionsHandle, "preferredLayout", webgpuOptions.preferredLayout, allocs);
                  }
                }
              }
              break;
            case "wasm":
            case "cpu":
              continue;
            default:
              throw new Error(`not supported execution provider: ${epName}`);
          }
          const epNameDataOffset = allocWasmString(epName, allocs);
          const epOptionsCount = epOptions.length;
          let keysOffset = 0;
          let valuesOffset = 0;
          if (epOptionsCount > 0) {
            keysOffset = getInstance()._malloc(epOptionsCount * getInstance().PTR_SIZE);
            allocs.push(keysOffset);
            valuesOffset = getInstance()._malloc(epOptionsCount * getInstance().PTR_SIZE);
            allocs.push(valuesOffset);
            for (let i = 0; i < epOptionsCount; i++) {
              getInstance().setValue(keysOffset + i * getInstance().PTR_SIZE, epOptions[i][0], "*");
              getInstance().setValue(valuesOffset + i * getInstance().PTR_SIZE, epOptions[i][1], "*");
            }
          }
          if (await getInstance()._OrtAppendExecutionProvider(
            sessionOptionsHandle,
            epNameDataOffset,
            keysOffset,
            valuesOffset,
            epOptionsCount
          ) !== 0) {
            checkLastError(`Can't append execution provider: ${epName}.`);
          }
        }
      };
      setSessionOptions = async (options) => {
        const wasm2 = getInstance();
        let sessionOptionsHandle = 0;
        const allocs = [];
        const sessionOptions = options || {};
        appendDefaultOptions(sessionOptions);
        try {
          const graphOptimizationLevel = getGraphOptimzationLevel(sessionOptions.graphOptimizationLevel ?? "all");
          const executionMode = getExecutionMode(sessionOptions.executionMode ?? "sequential");
          const logIdDataOffset = typeof sessionOptions.logId === "string" ? allocWasmString(sessionOptions.logId, allocs) : 0;
          const logSeverityLevel = sessionOptions.logSeverityLevel ?? 2;
          if (!Number.isInteger(logSeverityLevel) || logSeverityLevel < 0 || logSeverityLevel > 4) {
            throw new Error(`log severity level is not valid: ${logSeverityLevel}`);
          }
          const logVerbosityLevel = sessionOptions.logVerbosityLevel ?? 0;
          if (!Number.isInteger(logVerbosityLevel) || logVerbosityLevel < 0 || logVerbosityLevel > 4) {
            throw new Error(`log verbosity level is not valid: ${logVerbosityLevel}`);
          }
          const optimizedModelFilePathOffset = typeof sessionOptions.optimizedModelFilePath === "string" ? allocWasmString(sessionOptions.optimizedModelFilePath, allocs) : 0;
          sessionOptionsHandle = wasm2._OrtCreateSessionOptions(
            graphOptimizationLevel,
            !!sessionOptions.enableCpuMemArena,
            !!sessionOptions.enableMemPattern,
            executionMode,
            !!sessionOptions.enableProfiling,
            0,
            logIdDataOffset,
            logSeverityLevel,
            logVerbosityLevel,
            optimizedModelFilePathOffset
          );
          if (sessionOptionsHandle === 0) {
            checkLastError("Can't create session options.");
          }
          if (sessionOptions.executionProviders) {
            await setExecutionProviders(sessionOptionsHandle, sessionOptions.executionProviders, allocs);
          }
          if (sessionOptions.enableGraphCapture !== void 0) {
            if (typeof sessionOptions.enableGraphCapture !== "boolean") {
              throw new Error(`enableGraphCapture must be a boolean value: ${sessionOptions.enableGraphCapture}`);
            }
            appendSessionConfig(
              sessionOptionsHandle,
              "enableGraphCapture",
              sessionOptions.enableGraphCapture.toString(),
              allocs
            );
          }
          if (sessionOptions.freeDimensionOverrides) {
            for (const [name, value] of Object.entries(sessionOptions.freeDimensionOverrides)) {
              if (typeof name !== "string") {
                throw new Error(`free dimension override name must be a string: ${name}`);
              }
              if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
                throw new Error(`free dimension override value must be a non-negative integer: ${value}`);
              }
              const nameOffset = allocWasmString(name, allocs);
              if (wasm2._OrtAddFreeDimensionOverride(sessionOptionsHandle, nameOffset, value) !== 0) {
                checkLastError(`Can't set a free dimension override: ${name} - ${value}.`);
              }
            }
          }
          if (sessionOptions.extra !== void 0) {
            iterateExtraOptions(sessionOptions.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {
              appendSessionConfig(sessionOptionsHandle, key, value, allocs);
            });
          }
          return [sessionOptionsHandle, allocs];
        } catch (e) {
          if (sessionOptionsHandle !== 0) {
            if (wasm2._OrtReleaseSessionOptions(sessionOptionsHandle) !== 0) {
              checkLastError("Can't release session options.");
            }
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
          throw e;
        }
      };
    }
  });

  // web/lib/wasm/wasm-common.ts
  var tensorDataTypeStringToEnum, tensorDataTypeEnumToString, calculateTensorSizeInBytes, tensorTypeToTypedArrayConstructor, logLevelStringToEnum, isGpuBufferSupportedType, isMLTensorSupportedType, dataLocationStringToEnum;
  var init_wasm_common = __esm({
    "web/lib/wasm/wasm-common.ts"() {
      "use strict";
      tensorDataTypeStringToEnum = (type) => {
        switch (type) {
          case "int8":
            return 3 /* int8 */;
          case "uint8":
            return 2 /* uint8 */;
          case "bool":
            return 9 /* bool */;
          case "int16":
            return 5 /* int16 */;
          case "uint16":
            return 4 /* uint16 */;
          case "int32":
            return 6 /* int32 */;
          case "uint32":
            return 12 /* uint32 */;
          case "float16":
            return 10 /* float16 */;
          case "float32":
            return 1 /* float */;
          case "float64":
            return 11 /* double */;
          case "string":
            return 8 /* string */;
          case "int64":
            return 7 /* int64 */;
          case "uint64":
            return 13 /* uint64 */;
          case "int4":
            return 22 /* int4 */;
          case "uint4":
            return 21 /* uint4 */;
          default:
            throw new Error(`unsupported data type: ${type}`);
        }
      };
      tensorDataTypeEnumToString = (typeProto) => {
        switch (typeProto) {
          case 3 /* int8 */:
            return "int8";
          case 2 /* uint8 */:
            return "uint8";
          case 9 /* bool */:
            return "bool";
          case 5 /* int16 */:
            return "int16";
          case 4 /* uint16 */:
            return "uint16";
          case 6 /* int32 */:
            return "int32";
          case 12 /* uint32 */:
            return "uint32";
          case 10 /* float16 */:
            return "float16";
          case 1 /* float */:
            return "float32";
          case 11 /* double */:
            return "float64";
          case 8 /* string */:
            return "string";
          case 7 /* int64 */:
            return "int64";
          case 13 /* uint64 */:
            return "uint64";
          case 22 /* int4 */:
            return "int4";
          case 21 /* uint4 */:
            return "uint4";
          default:
            throw new Error(`unsupported data type: ${typeProto}`);
        }
      };
      calculateTensorSizeInBytes = (dateType, dimsOrSize) => {
        const elementSize = [
          -1,
          // undefined = 0
          4,
          // float = 1
          1,
          // uint8 = 2
          1,
          // int8 = 3
          2,
          // uint16 = 4
          2,
          // int16 = 5
          4,
          // int32 = 6
          8,
          // int64 = 7
          -1,
          // string = 8
          1,
          // bool = 9
          2,
          // float16 = 10
          8,
          // double = 11
          4,
          // uint32 = 12
          8,
          // uint64 = 13
          -1,
          // complex64 = 14
          -1,
          // complex128 = 15
          -1,
          // bfloat16 = 16
          -1,
          // FLOAT8E4M3FN = 17
          -1,
          // FLOAT8E4M3FNUZ = 18
          -1,
          // FLOAT8E5M2 = 19
          -1,
          // FLOAT8E5M2FNUZ = 20
          0.5,
          // uint4 = 21
          0.5
          // int4 = 22
        ][dateType];
        const size = typeof dimsOrSize === "number" ? dimsOrSize : dimsOrSize.reduce((a, b) => a * b, 1);
        return elementSize > 0 ? Math.ceil(size * elementSize) : void 0;
      };
      tensorTypeToTypedArrayConstructor = (type) => {
        switch (type) {
          case "float16":
            return typeof Float16Array !== "undefined" && Float16Array.from ? Float16Array : Uint16Array;
          case "float32":
            return Float32Array;
          case "uint8":
            return Uint8Array;
          case "int8":
            return Int8Array;
          case "uint16":
            return Uint16Array;
          case "int16":
            return Int16Array;
          case "int32":
            return Int32Array;
          case "bool":
            return Uint8Array;
          case "float64":
            return Float64Array;
          case "uint32":
            return Uint32Array;
          case "int64":
            return BigInt64Array;
          case "uint64":
            return BigUint64Array;
          default:
            throw new Error(`unsupported type: ${type}`);
        }
      };
      logLevelStringToEnum = (logLevel) => {
        switch (logLevel) {
          case "verbose":
            return 0;
          case "info":
            return 1;
          case "warning":
            return 2;
          case "error":
            return 3;
          case "fatal":
            return 4;
          default:
            throw new Error(`unsupported logging level: ${logLevel}`);
        }
      };
      isGpuBufferSupportedType = (type) => type === "float32" || type === "float16" || type === "int32" || type === "int64" || type === "uint32" || type === "uint8" || type === "bool" || type === "uint4" || type === "int4";
      isMLTensorSupportedType = (type) => type === "float32" || type === "float16" || type === "int32" || type === "int64" || type === "uint32" || type === "uint64" || type === "int8" || type === "uint8" || type === "bool" || type === "uint4" || type === "int4";
      dataLocationStringToEnum = (location2) => {
        switch (location2) {
          case "none":
            return 0;
          case "cpu":
            return 1;
          case "cpu-pinned":
            return 2;
          case "texture":
            return 3;
          case "gpu-buffer":
            return 4;
          case "ml-tensor":
            return 5;
          default:
            throw new Error(`unsupported data location: ${location2}`);
        }
      };
    }
  });

  // web/lib/wasm/wasm-utils-load-file.ts
  var loadFile;
  var init_wasm_utils_load_file = __esm({
    "web/lib/wasm/wasm-utils-load-file.ts"() {
      "use strict";
      init_wasm_utils_env();
      loadFile = async (file) => {
        if (typeof file === "string") {
          if (isNode) {
            try {
              const { readFile } = __require("node:fs/promises");
              return new Uint8Array(await readFile(file));
            } catch (e) {
              if (e.code === "ERR_FS_FILE_TOO_LARGE") {
                const { createReadStream } = __require("node:fs");
                const stream = createReadStream(file);
                const chunks = [];
                for await (const chunk of stream) {
                  chunks.push(chunk);
                }
                return new Uint8Array(Buffer.concat(chunks));
              }
              throw e;
            }
          } else {
            const response = await fetch(file);
            if (!response.ok) {
              throw new Error(`failed to load external data file: ${file}`);
            }
            const contentLengthHeader = response.headers.get("Content-Length");
            const fileSize = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;
            if (fileSize < 1073741824) {
              return new Uint8Array(await response.arrayBuffer());
            } else {
              if (!response.body) {
                throw new Error(`failed to load external data file: ${file}, no response body.`);
              }
              const reader = response.body.getReader();
              let buffer;
              try {
                buffer = new ArrayBuffer(fileSize);
              } catch (e) {
                if (e instanceof RangeError) {
                  const pages = Math.ceil(fileSize / 65536);
                  buffer = new WebAssembly.Memory({ initial: pages, maximum: pages }).buffer;
                } else {
                  throw e;
                }
              }
              let offset = 0;
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  break;
                }
                const chunkSize = value.byteLength;
                const chunk = new Uint8Array(buffer, offset, chunkSize);
                chunk.set(value);
                offset += chunkSize;
              }
              return new Uint8Array(buffer, 0, fileSize);
            }
          }
        } else if (file instanceof Blob) {
          return new Uint8Array(await file.arrayBuffer());
        } else if (file instanceof Uint8Array) {
          return file;
        } else {
          return new Uint8Array(file);
        }
      };
    }
  });

  // web/lib/wasm/wasm-core-impl.ts
  var initOrt, initRuntime, initEp, activeSessions, getSessionInputOutputCount, getSessionInputOutputMetadata, copyFromExternalBuffer, createSession, releaseSession, prepareInputOutputTensor, run, endProfiling, extractTransferableBuffers;
  var init_wasm_core_impl = __esm({
    "web/lib/wasm/wasm-core-impl.ts"() {
      "use strict";
      init_esm();
      init_run_options();
      init_session_options();
      init_wasm_common();
      init_wasm_factory();
      init_wasm_utils();
      init_wasm_utils_load_file();
      initOrt = (numThreads, loggingLevel) => {
        const errorCode = getInstance()._OrtInit(numThreads, loggingLevel);
        if (errorCode !== 0) {
          checkLastError("Can't initialize onnxruntime.");
        }
      };
      initRuntime = async (env3) => {
        initOrt(env3.wasm.numThreads, logLevelStringToEnum(env3.logLevel));
      };
      initEp = async (env3, epName) => {
        getInstance().asyncInit?.();
        let webgpuAdapter = env3.webgpu.adapter;
        if (epName === "webgpu") {
          if (typeof navigator === "undefined" || !navigator.gpu) {
            throw new Error("WebGPU is not supported in current environment");
          }
          if (!webgpuAdapter) {
            const powerPreference = env3.webgpu.powerPreference;
            if (powerPreference !== void 0 && powerPreference !== "low-power" && powerPreference !== "high-performance") {
              throw new Error(`Invalid powerPreference setting: "${powerPreference}"`);
            }
            const forceFallbackAdapter = env3.webgpu.forceFallbackAdapter;
            if (forceFallbackAdapter !== void 0 && typeof forceFallbackAdapter !== "boolean") {
              throw new Error(`Invalid forceFallbackAdapter setting: "${forceFallbackAdapter}"`);
            }
            webgpuAdapter = await navigator.gpu.requestAdapter({ powerPreference, forceFallbackAdapter });
            if (!webgpuAdapter) {
              throw new Error(
                'Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.'
              );
            }
          } else {
            if (typeof webgpuAdapter.limits !== "object" || typeof webgpuAdapter.features !== "object" || typeof webgpuAdapter.requestDevice !== "function") {
              throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
            }
          }
        }
        if (epName === "webnn") {
          if (typeof navigator === "undefined" || !navigator.ml) {
            throw new Error("WebNN is not supported in current environment");
          }
        }
        if (false) {
          const initJsep = null.init;
          if (epName === "webgpu") {
            await initJsep("webgpu", getInstance(), env3, webgpuAdapter);
          }
          if (epName === "webnn") {
            await initJsep("webnn", getInstance(), env3);
          }
        } else {
          if (false) {
            getInstance().webgpuInit((device) => {
              env3.webgpu.device = device;
            });
          }
          if (false) {
            const backend = new null.WebNNBackend(env3);
            getInstance().webnnInit([
              backend,
              // webnnReserveTensorId
              () => backend.reserveTensorId(),
              // webnnReleaseTensorId,
              (tensorId) => backend.releaseTensorId(tensorId),
              // webnnEnsureTensor
              async (sessionId, tensorId, onnxDataType, shape, copyOld) => backend.ensureTensor(sessionId, tensorId, onnxDataType, shape, copyOld),
              // webnnUploadTensor
              (tensorId, data) => {
                backend.uploadTensor(tensorId, data);
              },
              // webnnDownloadTensor
              async (tensorId, dstBuffer) => backend.downloadTensor(tensorId, dstBuffer),
              // webnnRegisterMLContext
              (sessionId, mlContext) => backend.registerMLContext(sessionId, mlContext),
              // webnnEnableTraceEvent
              !!env3.trace
            ]);
          }
        }
      };
      activeSessions = /* @__PURE__ */ new Map();
      getSessionInputOutputCount = (sessionHandle) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        try {
          const ptrSize = wasm2.PTR_SIZE;
          const dataOffset = wasm2.stackAlloc(2 * ptrSize);
          const errorCode = wasm2._OrtGetInputOutputCount(sessionHandle, dataOffset, dataOffset + ptrSize);
          if (errorCode !== 0) {
            checkLastError("Can't get session input/output count.");
          }
          const type = ptrSize === 4 ? "i32" : "i64";
          return [Number(wasm2.getValue(dataOffset, type)), Number(wasm2.getValue(dataOffset + ptrSize, type))];
        } finally {
          wasm2.stackRestore(stack);
        }
      };
      getSessionInputOutputMetadata = (sessionHandle, index) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        let metadataOffset = 0;
        try {
          const ptrSize = wasm2.PTR_SIZE;
          const dataOffset = wasm2.stackAlloc(2 * ptrSize);
          const errorCode = wasm2._OrtGetInputOutputMetadata(sessionHandle, index, dataOffset, dataOffset + ptrSize);
          if (errorCode !== 0) {
            checkLastError("Can't get session input/output metadata.");
          }
          const nameOffset = Number(wasm2.getValue(dataOffset, "*"));
          metadataOffset = Number(wasm2.getValue(dataOffset + ptrSize, "*"));
          const elementType = wasm2.HEAP32[metadataOffset / 4];
          if (elementType === 0) {
            return [nameOffset, 0];
          }
          const dimsCount = wasm2.HEAPU32[metadataOffset / 4 + 1];
          const dims = [];
          for (let i = 0; i < dimsCount; i++) {
            const symbolicDimNameOffset = Number(wasm2.getValue(metadataOffset + 8 + i * ptrSize, "*"));
            dims.push(
              symbolicDimNameOffset !== 0 ? wasm2.UTF8ToString(symbolicDimNameOffset) : Number(wasm2.getValue(metadataOffset + 8 + (i + dimsCount) * ptrSize, "*"))
            );
          }
          return [nameOffset, elementType, dims];
        } finally {
          wasm2.stackRestore(stack);
          if (metadataOffset !== 0) {
            wasm2._OrtFree(metadataOffset);
          }
        }
      };
      copyFromExternalBuffer = (model) => {
        const wasm2 = getInstance();
        const modelDataOffset = wasm2._malloc(model.byteLength);
        if (modelDataOffset === 0) {
          throw new Error(`Can't create a session. failed to allocate a buffer of size ${model.byteLength}.`);
        }
        wasm2.HEAPU8.set(model, modelDataOffset);
        return [modelDataOffset, model.byteLength];
      };
      createSession = async (modelData, options) => {
        let modelDataOffset, modelDataLength;
        const wasm2 = getInstance();
        if (Array.isArray(modelData)) {
          [modelDataOffset, modelDataLength] = modelData;
        } else if (modelData.buffer === wasm2.HEAPU8.buffer) {
          [modelDataOffset, modelDataLength] = [modelData.byteOffset, modelData.byteLength];
        } else {
          [modelDataOffset, modelDataLength] = copyFromExternalBuffer(modelData);
        }
        let sessionHandle = 0;
        let sessionOptionsHandle = 0;
        let ioBindingHandle = 0;
        let allocs = [];
        const inputNamesUTF8Encoded = [];
        const outputNamesUTF8Encoded = [];
        try {
          [sessionOptionsHandle, allocs] = await setSessionOptions(options);
          if (options?.externalData && wasm2.mountExternalData) {
            const loadingPromises = [];
            for (const file of options.externalData) {
              const path = typeof file === "string" ? file : file.path;
              loadingPromises.push(
                loadFile(typeof file === "string" ? file : file.data).then((data) => {
                  wasm2.mountExternalData(path, data);
                })
              );
            }
            await Promise.all(loadingPromises);
          }
          for (const provider of options?.executionProviders ?? []) {
            const providerName = typeof provider === "string" ? provider : provider.name;
            if (providerName === "webnn") {
              wasm2.shouldTransferToMLTensor = false;
              if (typeof provider !== "string") {
                const webnnOptions = provider;
                const context = webnnOptions?.context;
                const gpuDevice = webnnOptions?.gpuDevice;
                const deviceType = webnnOptions?.deviceType;
                const powerPreference = webnnOptions?.powerPreference;
                if (context) {
                  wasm2.currentContext = context;
                } else if (gpuDevice) {
                  wasm2.currentContext = await wasm2.webnnCreateMLContext(gpuDevice);
                } else {
                  wasm2.currentContext = await wasm2.webnnCreateMLContext({ deviceType, powerPreference });
                }
              } else {
                wasm2.currentContext = await wasm2.webnnCreateMLContext();
              }
              break;
            }
          }
          sessionHandle = await wasm2._OrtCreateSession(modelDataOffset, modelDataLength, sessionOptionsHandle);
          wasm2.webgpuOnCreateSession?.(sessionHandle);
          if (sessionHandle === 0) {
            checkLastError("Can't create a session.");
          }
          wasm2.jsepOnCreateSession?.();
          if (wasm2.currentContext) {
            wasm2.webnnRegisterMLContext(sessionHandle, wasm2.currentContext);
            wasm2.currentContext = void 0;
            wasm2.shouldTransferToMLTensor = true;
          }
          const [inputCount, outputCount] = getSessionInputOutputCount(sessionHandle);
          const enableGraphCapture = !!options?.enableGraphCapture;
          const inputNames = [];
          const outputNames = [];
          const inputMetadata = [];
          const outputMetadata = [];
          const outputPreferredLocations = [];
          for (let i = 0; i < inputCount; i++) {
            const [nameOffset, elementType, shape] = getSessionInputOutputMetadata(sessionHandle, i);
            if (nameOffset === 0) {
              checkLastError("Can't get an input name.");
            }
            inputNamesUTF8Encoded.push(nameOffset);
            const name = wasm2.UTF8ToString(nameOffset);
            inputNames.push(name);
            inputMetadata.push(
              elementType === 0 ? { name, isTensor: false } : { name, isTensor: true, type: tensorDataTypeEnumToString(elementType), shape }
            );
          }
          for (let i = 0; i < outputCount; i++) {
            const [nameOffset, elementType, shape] = getSessionInputOutputMetadata(sessionHandle, i + inputCount);
            if (nameOffset === 0) {
              checkLastError("Can't get an output name.");
            }
            outputNamesUTF8Encoded.push(nameOffset);
            const nameString = wasm2.UTF8ToString(nameOffset);
            outputNames.push(nameString);
            outputMetadata.push(
              elementType === 0 ? { name: nameString, isTensor: false } : { name: nameString, isTensor: true, type: tensorDataTypeEnumToString(elementType), shape }
            );
            if (false) {
              if (enableGraphCapture && options?.preferredOutputLocation === void 0) {
                outputPreferredLocations.push("gpu-buffer");
                continue;
              }
              const location2 = typeof options?.preferredOutputLocation === "string" ? options.preferredOutputLocation : options?.preferredOutputLocation?.[nameString] ?? "cpu";
              const isGraphOutput = wasm2.webnnIsGraphOutput;
              if (location2 === "cpu" && isGraphOutput && isGraphOutput(sessionHandle, nameString)) {
                outputPreferredLocations.push("ml-tensor-cpu-output");
                continue;
              }
              if (location2 !== "cpu" && location2 !== "cpu-pinned" && location2 !== "gpu-buffer" && location2 !== "ml-tensor") {
                throw new Error(`Not supported preferred output location: ${location2}.`);
              }
              if (enableGraphCapture && location2 !== "gpu-buffer") {
                throw new Error(
                  `Not supported preferred output location: ${location2}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`
                );
              }
              outputPreferredLocations.push(location2);
            }
          }
          let bindingState = null;
          if (false) {
            ioBindingHandle = wasm2._OrtCreateBinding(sessionHandle);
            if (ioBindingHandle === 0) {
              checkLastError("Can't create IO binding.");
            }
            bindingState = {
              handle: ioBindingHandle,
              outputPreferredLocations,
              outputPreferredLocationsEncoded: outputPreferredLocations.map((l) => l === "ml-tensor-cpu-output" ? "ml-tensor" : l).map((l) => dataLocationStringToEnum(l))
            };
          }
          activeSessions.set(sessionHandle, [
            sessionHandle,
            inputNamesUTF8Encoded,
            outputNamesUTF8Encoded,
            bindingState,
            enableGraphCapture,
            false
          ]);
          return [sessionHandle, inputNames, outputNames, inputMetadata, outputMetadata];
        } catch (e) {
          inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
          outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
          if (ioBindingHandle !== 0) {
            if (wasm2._OrtReleaseBinding(ioBindingHandle) !== 0) {
              checkLastError("Can't release IO binding.");
            }
          }
          if (sessionHandle !== 0) {
            if (wasm2._OrtReleaseSession(sessionHandle) !== 0) {
              checkLastError("Can't release session.");
            }
          }
          throw e;
        } finally {
          wasm2._free(modelDataOffset);
          if (sessionOptionsHandle !== 0) {
            if (wasm2._OrtReleaseSessionOptions(sessionOptionsHandle) !== 0) {
              checkLastError("Can't release session options.");
            }
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
          wasm2.unmountExternalData?.();
        }
      };
      releaseSession = (sessionId) => {
        const wasm2 = getInstance();
        const session = activeSessions.get(sessionId);
        if (!session) {
          throw new Error(`cannot release session. invalid session id: ${sessionId}`);
        }
        const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState, enableGraphCapture] = session;
        if (ioBindingState) {
          if (enableGraphCapture) {
            if (wasm2._OrtClearBoundOutputs(ioBindingState.handle) !== 0) {
              checkLastError("Can't clear bound outputs.");
            }
          }
          if (wasm2._OrtReleaseBinding(ioBindingState.handle) !== 0) {
            checkLastError("Can't release IO binding.");
          }
        }
        wasm2.jsepOnReleaseSession?.(sessionId);
        wasm2.webnnOnReleaseSession?.(sessionId);
        wasm2.webgpuOnReleaseSession?.(sessionId);
        inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        if (wasm2._OrtReleaseSession(sessionHandle) !== 0) {
          checkLastError("Can't release session.");
        }
        activeSessions.delete(sessionId);
      };
      prepareInputOutputTensor = async (tensor, tensorHandles, allocs, sessionId, tensorNameUTF8Encoded, index, enableGraphCapture = false) => {
        if (!tensor) {
          tensorHandles.push(0);
          return;
        }
        const wasm2 = getInstance();
        const ptrSize = wasm2.PTR_SIZE;
        const dataType = tensor[0];
        const dims = tensor[1];
        const location2 = tensor[3];
        let actualLocation = location2;
        let rawData;
        let dataByteLength;
        if (dataType === "string" && (location2 === "gpu-buffer" || location2 === "ml-tensor")) {
          throw new Error("String tensor is not supported on GPU.");
        }
        if (enableGraphCapture && location2 !== "gpu-buffer") {
          throw new Error(
            `External buffer must be provided for input/output index ${index} when enableGraphCapture is true.`
          );
        }
        if (location2 === "gpu-buffer") {
          const gpuBuffer = tensor[2].gpuBuffer;
          dataByteLength = calculateTensorSizeInBytes(tensorDataTypeStringToEnum(dataType), dims);
          if (false) {
            const registerBuffer = wasm2.webgpuRegisterBuffer;
            if (!registerBuffer) {
              throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
            }
            rawData = registerBuffer(gpuBuffer, sessionId);
          } else {
            const registerBuffer = wasm2.jsepRegisterBuffer;
            if (!registerBuffer) {
              throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
            }
            rawData = registerBuffer(sessionId, index, gpuBuffer, dataByteLength);
          }
        } else if (location2 === "ml-tensor") {
          const mlTensor = tensor[2].mlTensor;
          dataByteLength = calculateTensorSizeInBytes(tensorDataTypeStringToEnum(dataType), dims);
          const registerMLTensor = wasm2.webnnRegisterMLTensor;
          if (!registerMLTensor) {
            throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
          }
          rawData = registerMLTensor(sessionId, mlTensor, tensorDataTypeStringToEnum(dataType), dims);
        } else {
          const data = tensor[2];
          if (Array.isArray(data)) {
            dataByteLength = ptrSize * data.length;
            rawData = wasm2._malloc(dataByteLength);
            allocs.push(rawData);
            for (let i = 0; i < data.length; i++) {
              if (typeof data[i] !== "string") {
                throw new TypeError(`tensor data at index ${i} is not a string`);
              }
              wasm2.setValue(rawData + i * ptrSize, allocWasmString(data[i], allocs), "*");
            }
          } else {
            const isGraphInput = wasm2.webnnIsGraphInput;
            const isGraphOutput = wasm2.webnnIsGraphOutput;
            if (dataType !== "string" && isGraphInput && isGraphOutput) {
              const tensorName = wasm2.UTF8ToString(tensorNameUTF8Encoded);
              if (isGraphInput(sessionId, tensorName) || isGraphOutput(sessionId, tensorName)) {
                const dataTypeEnum = tensorDataTypeStringToEnum(dataType);
                dataByteLength = calculateTensorSizeInBytes(dataTypeEnum, dims);
                actualLocation = "ml-tensor";
                const createTemporaryTensor = wasm2.webnnCreateTemporaryTensor;
                const uploadTensor = wasm2.webnnUploadTensor;
                if (!createTemporaryTensor || !uploadTensor) {
                  throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
                }
                const tensorId = await createTemporaryTensor(sessionId, dataTypeEnum, dims);
                uploadTensor(tensorId, new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
                rawData = tensorId;
              } else {
                dataByteLength = data.byteLength;
                rawData = wasm2._malloc(dataByteLength);
                allocs.push(rawData);
                wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
              }
            } else {
              dataByteLength = data.byteLength;
              rawData = wasm2._malloc(dataByteLength);
              allocs.push(rawData);
              wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
            }
          }
        }
        const stack = wasm2.stackSave();
        const dimsOffset = wasm2.stackAlloc(4 * dims.length);
        try {
          dims.forEach((d, index2) => wasm2.setValue(dimsOffset + index2 * ptrSize, d, ptrSize === 4 ? "i32" : "i64"));
          const tensor2 = wasm2._OrtCreateTensor(
            tensorDataTypeStringToEnum(dataType),
            rawData,
            dataByteLength,
            dimsOffset,
            dims.length,
            dataLocationStringToEnum(actualLocation)
          );
          if (tensor2 === 0) {
            checkLastError(`Can't create tensor for input/output. session=${sessionId}, index=${index}.`);
          }
          tensorHandles.push(tensor2);
        } finally {
          wasm2.stackRestore(stack);
        }
      };
      run = async (sessionId, inputIndices, inputTensors, outputIndices, outputTensors, options) => {
        const wasm2 = getInstance();
        const ptrSize = wasm2.PTR_SIZE;
        const session = activeSessions.get(sessionId);
        if (!session) {
          throw new Error(`cannot run inference. invalid session id: ${sessionId}`);
        }
        const sessionHandle = session[0];
        const inputNamesUTF8Encoded = session[1];
        const outputNamesUTF8Encoded = session[2];
        const ioBindingState = session[3];
        const enableGraphCapture = session[4];
        const inputOutputBound = session[5];
        const inputCount = inputIndices.length;
        const outputCount = outputIndices.length;
        let runOptionsHandle = 0;
        let runOptionsAllocs = [];
        const inputTensorHandles = [];
        const outputTensorHandles = [];
        const inputOutputAllocs = [];
        const beforeRunStack = wasm2.stackSave();
        const inputValuesOffset = wasm2.stackAlloc(inputCount * ptrSize);
        const inputNamesOffset = wasm2.stackAlloc(inputCount * ptrSize);
        const outputValuesOffset = wasm2.stackAlloc(outputCount * ptrSize);
        const outputNamesOffset = wasm2.stackAlloc(outputCount * ptrSize);
        try {
          [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);
          TRACE_EVENT_BEGIN("wasm prepareInputOutputTensor");
          for (let i = 0; i < inputCount; i++) {
            await prepareInputOutputTensor(
              inputTensors[i],
              inputTensorHandles,
              inputOutputAllocs,
              sessionId,
              inputNamesUTF8Encoded[inputIndices[i]],
              inputIndices[i],
              enableGraphCapture
            );
          }
          for (let i = 0; i < outputCount; i++) {
            await prepareInputOutputTensor(
              outputTensors[i],
              outputTensorHandles,
              inputOutputAllocs,
              sessionId,
              outputNamesUTF8Encoded[outputIndices[i]],
              inputCount + outputIndices[i],
              enableGraphCapture
            );
          }
          TRACE_EVENT_END("wasm prepareInputOutputTensor");
          for (let i = 0; i < inputCount; i++) {
            wasm2.setValue(inputValuesOffset + i * ptrSize, inputTensorHandles[i], "*");
            wasm2.setValue(inputNamesOffset + i * ptrSize, inputNamesUTF8Encoded[inputIndices[i]], "*");
          }
          for (let i = 0; i < outputCount; i++) {
            wasm2.setValue(outputValuesOffset + i * ptrSize, outputTensorHandles[i], "*");
            wasm2.setValue(outputNamesOffset + i * ptrSize, outputNamesUTF8Encoded[outputIndices[i]], "*");
          }
          if (false) {
            const { handle, outputPreferredLocations, outputPreferredLocationsEncoded } = ioBindingState;
            if (inputNamesUTF8Encoded.length !== inputCount) {
              throw new Error(
                `input count from feeds (${inputCount}) is expected to be always equal to model's input count (${inputNamesUTF8Encoded.length}).`
              );
            }
            TRACE_EVENT_BEGIN("wasm bindInputsOutputs");
            for (let i = 0; i < inputCount; i++) {
              const index = inputIndices[i];
              const errorCode2 = await wasm2._OrtBindInput(handle, inputNamesUTF8Encoded[index], inputTensorHandles[i]);
              if (errorCode2 !== 0) {
                checkLastError(`Can't bind input[${i}] for session=${sessionId}.`);
              }
            }
            for (let i = 0; i < outputCount; i++) {
              const index = outputIndices[i];
              const location2 = outputTensors[i]?.[3];
              if (location2) {
                const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], outputTensorHandles[i], 0);
                if (errorCode2 !== 0) {
                  checkLastError(`Can't bind pre-allocated output[${i}] for session=${sessionId}.`);
                }
              } else {
                const errorCode2 = wasm2._OrtBindOutput(
                  handle,
                  outputNamesUTF8Encoded[index],
                  0,
                  outputPreferredLocationsEncoded[index]
                );
                if (errorCode2 !== 0) {
                  checkLastError(`Can't bind output[${i}] to ${outputPreferredLocations[i]} for session=${sessionId}.`);
                }
              }
            }
            TRACE_EVENT_END("wasm bindInputsOutputs");
            activeSessions.set(sessionId, [
              sessionHandle,
              inputNamesUTF8Encoded,
              outputNamesUTF8Encoded,
              ioBindingState,
              enableGraphCapture,
              true
            ]);
          }
          wasm2.jsepOnRunStart?.(sessionHandle);
          wasm2.webnnOnRunStart?.(sessionHandle);
          let errorCode;
          if (false) {
            errorCode = await wasm2._OrtRunWithBinding(
              sessionHandle,
              ioBindingState.handle,
              outputCount,
              outputValuesOffset,
              runOptionsHandle
            );
          } else {
            errorCode = await wasm2._OrtRun(
              sessionHandle,
              inputNamesOffset,
              inputValuesOffset,
              inputCount,
              outputNamesOffset,
              outputCount,
              outputValuesOffset,
              runOptionsHandle
            );
          }
          if (errorCode !== 0) {
            checkLastError("failed to call OrtRun().");
          }
          const output = [];
          const outputPromises = [];
          TRACE_EVENT_BEGIN("wasm ProcessOutputTensor");
          for (let i = 0; i < outputCount; i++) {
            const tensor = Number(wasm2.getValue(outputValuesOffset + i * ptrSize, "*"));
            if (tensor === outputTensorHandles[i]) {
              output.push(outputTensors[i]);
              continue;
            }
            const beforeGetTensorDataStack = wasm2.stackSave();
            const tensorDataOffset = wasm2.stackAlloc(4 * ptrSize);
            let keepOutputTensor = false;
            let type, dataOffset = 0;
            try {
              const errorCode2 = wasm2._OrtGetTensorData(
                tensor,
                tensorDataOffset,
                tensorDataOffset + ptrSize,
                tensorDataOffset + 2 * ptrSize,
                tensorDataOffset + 3 * ptrSize
              );
              if (errorCode2 !== 0) {
                checkLastError(`Can't access output tensor data on index ${i}.`);
              }
              const valueType = ptrSize === 4 ? "i32" : "i64";
              const dataType = Number(wasm2.getValue(tensorDataOffset, valueType));
              dataOffset = wasm2.getValue(tensorDataOffset + ptrSize, "*");
              const dimsOffset = wasm2.getValue(tensorDataOffset + ptrSize * 2, "*");
              const dimsLength = Number(wasm2.getValue(tensorDataOffset + ptrSize * 3, valueType));
              const dims = [];
              for (let i2 = 0; i2 < dimsLength; i2++) {
                dims.push(Number(wasm2.getValue(dimsOffset + i2 * ptrSize, valueType)));
              }
              if (wasm2._OrtFree(dimsOffset) !== 0) {
                checkLastError("Can't free memory for tensor dims.");
              }
              const size = dims.reduce((a, b) => a * b, 1);
              type = tensorDataTypeEnumToString(dataType);
              const preferredLocation = ioBindingState?.outputPreferredLocations[outputIndices[i]];
              if (type === "string") {
                if (preferredLocation === "gpu-buffer" || preferredLocation === "ml-tensor") {
                  throw new Error("String tensor is not supported on GPU.");
                }
                const stringData = [];
                for (let i2 = 0; i2 < size; i2++) {
                  const offset = wasm2.getValue(dataOffset + i2 * ptrSize, "*");
                  const nextOffset = wasm2.getValue(dataOffset + (i2 + 1) * ptrSize, "*");
                  const maxBytesToRead = i2 === size - 1 ? void 0 : nextOffset - offset;
                  stringData.push(wasm2.UTF8ToString(offset, maxBytesToRead));
                }
                output.push([type, dims, stringData, "cpu"]);
              } else {
                if (preferredLocation === "gpu-buffer" && size > 0) {
                  const getBuffer = false ? wasm2.webgpuGetBuffer : wasm2.jsepGetBuffer;
                  if (!getBuffer) {
                    throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                  }
                  const gpuBuffer = getBuffer(dataOffset);
                  const bufferSize = calculateTensorSizeInBytes(dataType, size);
                  if (bufferSize === void 0 || !isGpuBufferSupportedType(type)) {
                    throw new Error(`Unsupported data type: ${type}`);
                  }
                  keepOutputTensor = true;
                  if (false) {
                    wasm2.webgpuRegisterBuffer(gpuBuffer, sessionId, dataOffset);
                    const downloadDataFunction = wasm2.webgpuCreateDownloader(gpuBuffer, bufferSize, sessionId);
                    output.push([
                      type,
                      dims,
                      {
                        gpuBuffer,
                        download: async () => {
                          const arrayBuffer = await downloadDataFunction();
                          const data = new (tensorTypeToTypedArrayConstructor(type))(arrayBuffer);
                          return data;
                        },
                        dispose: () => {
                          if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                            checkLastError("Can't release tensor.");
                          }
                        }
                      },
                      "gpu-buffer"
                    ]);
                  } else {
                    output.push([
                      type,
                      dims,
                      {
                        gpuBuffer,
                        download: wasm2.jsepCreateDownloader(gpuBuffer, bufferSize, type),
                        dispose: () => {
                          if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                            checkLastError("Can't release tensor.");
                          }
                        }
                      },
                      "gpu-buffer"
                    ]);
                  }
                } else if (preferredLocation === "ml-tensor" && size > 0) {
                  const ensureTensor = wasm2.webnnEnsureTensor;
                  const isGraphInputOutputTypeSupported = wasm2.webnnIsGraphInputOutputTypeSupported;
                  if (!ensureTensor || !isGraphInputOutputTypeSupported) {
                    throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
                  }
                  const tensorSize = calculateTensorSizeInBytes(dataType, size);
                  if (tensorSize === void 0 || !isMLTensorSupportedType(type)) {
                    throw new Error(`Unsupported data type: ${type}`);
                  }
                  if (!isGraphInputOutputTypeSupported(sessionId, type, false)) {
                    throw new Error(
                      `preferredLocation "ml-tensor" for ${type} output is not supported by current WebNN Context.`
                    );
                  }
                  const mlTensor = await ensureTensor(sessionId, dataOffset, dataType, dims, false);
                  keepOutputTensor = true;
                  output.push([
                    type,
                    dims,
                    {
                      mlTensor,
                      download: wasm2.webnnCreateMLTensorDownloader(dataOffset, type),
                      dispose: () => {
                        wasm2.webnnReleaseTensorId(dataOffset);
                        wasm2._OrtReleaseTensor(tensor);
                      }
                    },
                    "ml-tensor"
                  ]);
                } else if (preferredLocation === "ml-tensor-cpu-output" && size > 0) {
                  const data = wasm2.webnnCreateMLTensorDownloader(dataOffset, type)();
                  const index = output.length;
                  keepOutputTensor = true;
                  outputPromises.push(
                    (async () => {
                      const result = [index, await data];
                      wasm2.webnnReleaseTensorId(dataOffset);
                      wasm2._OrtReleaseTensor(tensor);
                      return result;
                    })()
                  );
                  output.push([type, dims, [], "cpu"]);
                } else {
                  const typedArrayConstructor = tensorTypeToTypedArrayConstructor(type);
                  const data = new typedArrayConstructor(size);
                  new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(
                    wasm2.HEAPU8.subarray(dataOffset, dataOffset + data.byteLength)
                  );
                  output.push([type, dims, data, "cpu"]);
                }
              }
            } finally {
              wasm2.stackRestore(beforeGetTensorDataStack);
              if (type === "string" && dataOffset) {
                wasm2._free(dataOffset);
              }
              if (!keepOutputTensor) {
                wasm2._OrtReleaseTensor(tensor);
              }
            }
          }
          if (ioBindingState && !enableGraphCapture) {
            if (wasm2._OrtClearBoundOutputs(ioBindingState.handle) !== 0) {
              checkLastError("Can't clear bound outputs.");
            }
            activeSessions.set(sessionId, [
              sessionHandle,
              inputNamesUTF8Encoded,
              outputNamesUTF8Encoded,
              ioBindingState,
              enableGraphCapture,
              false
            ]);
          }
          for (const [index, data] of await Promise.all(outputPromises)) {
            output[index][2] = data;
          }
          TRACE_EVENT_END("wasm ProcessOutputTensor");
          return output;
        } finally {
          wasm2.webnnOnRunEnd?.(sessionHandle);
          wasm2.stackRestore(beforeRunStack);
          if (false) {
            inputTensors.forEach((t) => {
              if (t && t[3] === "gpu-buffer") {
                wasm2.webgpuUnregisterBuffer(t[2].gpuBuffer);
              }
            });
            outputTensors.forEach((t) => {
              if (t && t[3] === "gpu-buffer") {
                wasm2.webgpuUnregisterBuffer(t[2].gpuBuffer);
              }
            });
          }
          inputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));
          outputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));
          inputOutputAllocs.forEach((p) => wasm2._free(p));
          if (runOptionsHandle !== 0) {
            wasm2._OrtReleaseRunOptions(runOptionsHandle);
          }
          runOptionsAllocs.forEach((p) => wasm2._free(p));
        }
      };
      endProfiling = (sessionId) => {
        const wasm2 = getInstance();
        const session = activeSessions.get(sessionId);
        if (!session) {
          throw new Error("invalid session id");
        }
        const sessionHandle = session[0];
        const profileFileName = wasm2._OrtEndProfiling(sessionHandle);
        if (profileFileName === 0) {
          checkLastError("Can't get an profile file name.");
        }
        wasm2._OrtFree(profileFileName);
      };
      extractTransferableBuffers = (tensors) => {
        const buffers = [];
        for (const tensor of tensors) {
          const data = tensor[2];
          if (!Array.isArray(data) && "buffer" in data) {
            buffers.push(data.buffer);
          }
        }
        return buffers;
      };
    }
  });

  // web/lib/wasm/proxy-wrapper.ts
  var isProxy, proxyWorker, initializing2, initialized2, aborted2, temporaryObjectUrl, initWasmCallbacks, queuedCallbacks, enqueueCallbacks, ensureWorker, onProxyWorkerMessage, initializeWebAssemblyAndOrtRuntime, initializeOrtEp, copyFromExternalBuffer2, createSession2, releaseSession2, run2, endProfiling2;
  var init_proxy_wrapper = __esm({
    "web/lib/wasm/proxy-wrapper.ts"() {
      "use strict";
      init_esm();
      init_wasm_core_impl();
      init_wasm_factory();
      init_wasm_utils_import();
      isProxy = () => !!env2.wasm.proxy && typeof document !== "undefined";
      initializing2 = false;
      initialized2 = false;
      aborted2 = false;
      queuedCallbacks = /* @__PURE__ */ new Map();
      enqueueCallbacks = (type, callbacks) => {
        const queue = queuedCallbacks.get(type);
        if (queue) {
          queue.push(callbacks);
        } else {
          queuedCallbacks.set(type, [callbacks]);
        }
      };
      ensureWorker = () => {
        if (initializing2 || !initialized2 || aborted2 || !proxyWorker) {
          throw new Error("worker not ready");
        }
      };
      onProxyWorkerMessage = (ev) => {
        switch (ev.data.type) {
          case "init-wasm":
            initializing2 = false;
            if (ev.data.err) {
              aborted2 = true;
              initWasmCallbacks[1](ev.data.err);
            } else {
              initialized2 = true;
              initWasmCallbacks[0]();
            }
            if (temporaryObjectUrl) {
              URL.revokeObjectURL(temporaryObjectUrl);
              temporaryObjectUrl = void 0;
            }
            break;
          case "init-ep":
          case "copy-from":
          case "create":
          case "release":
          case "run":
          case "end-profiling": {
            const callbacks = queuedCallbacks.get(ev.data.type);
            if (ev.data.err) {
              callbacks.shift()[1](ev.data.err);
            } else {
              callbacks.shift()[0](ev.data.out);
            }
            break;
          }
          default:
        }
      };
      initializeWebAssemblyAndOrtRuntime = async () => {
        if (initialized2) {
          return;
        }
        if (initializing2) {
          throw new Error("multiple calls to 'initWasm()' detected.");
        }
        if (aborted2) {
          throw new Error("previous call to 'initWasm()' failed.");
        }
        initializing2 = true;
        if (isProxy()) {
          return new Promise((resolve, reject) => {
            proxyWorker?.terminate();
            void importProxyWorker().then(([objectUrl, worker]) => {
              try {
                proxyWorker = worker;
                proxyWorker.onerror = (ev) => reject(ev);
                proxyWorker.onmessage = onProxyWorkerMessage;
                initWasmCallbacks = [resolve, reject];
                const message = { type: "init-wasm", in: env2 };
                if (!message.in.wasm.wasmPaths && objectUrl) {
                  const inferredWasmPathPrefix = inferWasmPathPrefixFromScriptSrc();
                  if (inferredWasmPathPrefix) {
                    message.in.wasm.wasmPaths = inferredWasmPathPrefix;
                  }
                }
                if (false) {
                  message.in.wasm.wasmPaths = {
                    wasm: false ? new URL("ort-wasm-simd-threaded.jsep.wasm", void 0).href : false ? new URL("ort-wasm-simd-threaded.asyncify.wasm", void 0).href : new URL("ort-wasm-simd-threaded.wasm", void 0).href
                  };
                }
                proxyWorker.postMessage(message);
                temporaryObjectUrl = objectUrl;
              } catch (e) {
                reject(e);
              }
            }, reject);
          });
        } else {
          try {
            await initializeWebAssembly(env2.wasm);
            await initRuntime(env2);
            initialized2 = true;
          } catch (e) {
            aborted2 = true;
            throw e;
          } finally {
            initializing2 = false;
          }
        }
      };
      initializeOrtEp = async (epName) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("init-ep", [resolve, reject]);
            const message = { type: "init-ep", in: { epName, env: env2 } };
            proxyWorker.postMessage(message);
          });
        } else {
          await initEp(env2, epName);
        }
      };
      copyFromExternalBuffer2 = async (buffer) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("copy-from", [resolve, reject]);
            const message = { type: "copy-from", in: { buffer } };
            proxyWorker.postMessage(message, [buffer.buffer]);
          });
        } else {
          return copyFromExternalBuffer(buffer);
        }
      };
      createSession2 = async (model, options) => {
        if (isProxy()) {
          if (options?.preferredOutputLocation) {
            throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
          }
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("create", [resolve, reject]);
            const message = { type: "create", in: { model, options: { ...options } } };
            const transferable = [];
            if (model instanceof Uint8Array) {
              transferable.push(model.buffer);
            }
            proxyWorker.postMessage(message, transferable);
          });
        } else {
          return createSession(model, options);
        }
      };
      releaseSession2 = async (sessionId) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("release", [resolve, reject]);
            const message = { type: "release", in: sessionId };
            proxyWorker.postMessage(message);
          });
        } else {
          releaseSession(sessionId);
        }
      };
      run2 = async (sessionId, inputIndices, inputs, outputIndices, outputs, options) => {
        if (isProxy()) {
          if (inputs.some((t) => t[3] !== "cpu")) {
            throw new Error("input tensor on GPU is not supported for proxy.");
          }
          if (outputs.some((t) => t)) {
            throw new Error("pre-allocated output tensor is not supported for proxy.");
          }
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("run", [resolve, reject]);
            const serializableInputs = inputs;
            const message = {
              type: "run",
              in: { sessionId, inputIndices, inputs: serializableInputs, outputIndices, options }
            };
            proxyWorker.postMessage(message, extractTransferableBuffers(serializableInputs));
          });
        } else {
          return run(sessionId, inputIndices, inputs, outputIndices, outputs, options);
        }
      };
      endProfiling2 = async (sessionId) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("end-profiling", [resolve, reject]);
            const message = { type: "end-profiling", in: sessionId };
            proxyWorker.postMessage(message);
          });
        } else {
          endProfiling(sessionId);
        }
      };
    }
  });

  // web/lib/wasm/session-handler-inference.ts
  var encodeTensorMetadata, decodeTensorMetadata, OnnxruntimeWebAssemblySessionHandler;
  var init_session_handler_inference = __esm({
    "web/lib/wasm/session-handler-inference.ts"() {
      "use strict";
      init_esm();
      init_proxy_wrapper();
      init_wasm_common();
      init_wasm_utils_env();
      init_wasm_utils_load_file();
      encodeTensorMetadata = (tensor, getName) => {
        switch (tensor.location) {
          case "cpu":
            return [tensor.type, tensor.dims, tensor.data, "cpu"];
          case "gpu-buffer":
            return [tensor.type, tensor.dims, { gpuBuffer: tensor.gpuBuffer }, "gpu-buffer"];
          case "ml-tensor":
            return [tensor.type, tensor.dims, { mlTensor: tensor.mlTensor }, "ml-tensor"];
          default:
            throw new Error(`invalid data location: ${tensor.location} for ${getName()}`);
        }
      };
      decodeTensorMetadata = (tensor) => {
        switch (tensor[3]) {
          case "cpu":
            return new Tensor2(tensor[0], tensor[2], tensor[1]);
          case "gpu-buffer": {
            const dataType = tensor[0];
            if (!isGpuBufferSupportedType(dataType)) {
              throw new Error(`not supported data type: ${dataType} for deserializing GPU tensor`);
            }
            const { gpuBuffer, download, dispose } = tensor[2];
            return Tensor2.fromGpuBuffer(gpuBuffer, { dataType, dims: tensor[1], download, dispose });
          }
          case "ml-tensor": {
            const dataType = tensor[0];
            if (!isMLTensorSupportedType(dataType)) {
              throw new Error(`not supported data type: ${dataType} for deserializing MLTensor tensor`);
            }
            const { mlTensor, download, dispose } = tensor[2];
            return Tensor2.fromMLTensor(mlTensor, { dataType, dims: tensor[1], download, dispose });
          }
          default:
            throw new Error(`invalid data location: ${tensor[3]}`);
        }
      };
      OnnxruntimeWebAssemblySessionHandler = class {
        async fetchModelAndCopyToWasmMemory(path) {
          return copyFromExternalBuffer2(await loadFile(path));
        }
        async loadModel(pathOrBuffer, options) {
          TRACE_FUNC_BEGIN();
          let model;
          if (typeof pathOrBuffer === "string") {
            if (isNode) {
              model = await loadFile(pathOrBuffer);
            } else {
              model = await this.fetchModelAndCopyToWasmMemory(pathOrBuffer);
            }
          } else {
            model = pathOrBuffer;
          }
          [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await createSession2(
            model,
            options
          );
          TRACE_FUNC_END();
        }
        async dispose() {
          return releaseSession2(this.sessionId);
        }
        async run(feeds, fetches, options) {
          TRACE_FUNC_BEGIN();
          const inputArray = [];
          const inputIndices = [];
          Object.entries(feeds).forEach((kvp) => {
            const name = kvp[0];
            const tensor = kvp[1];
            const index = this.inputNames.indexOf(name);
            if (index === -1) {
              throw new Error(`invalid input '${name}'`);
            }
            inputArray.push(tensor);
            inputIndices.push(index);
          });
          const outputArray = [];
          const outputIndices = [];
          Object.entries(fetches).forEach((kvp) => {
            const name = kvp[0];
            const tensor = kvp[1];
            const index = this.outputNames.indexOf(name);
            if (index === -1) {
              throw new Error(`invalid output '${name}'`);
            }
            outputArray.push(tensor);
            outputIndices.push(index);
          });
          const inputs = inputArray.map(
            (t, i) => encodeTensorMetadata(t, () => `input "${this.inputNames[inputIndices[i]]}"`)
          );
          const outputs = outputArray.map(
            (t, i) => t ? encodeTensorMetadata(t, () => `output "${this.outputNames[outputIndices[i]]}"`) : null
          );
          const results = await run2(this.sessionId, inputIndices, inputs, outputIndices, outputs, options);
          const resultMap = {};
          for (let i = 0; i < results.length; i++) {
            resultMap[this.outputNames[outputIndices[i]]] = outputArray[i] ?? decodeTensorMetadata(results[i]);
          }
          TRACE_FUNC_END();
          return resultMap;
        }
        startProfiling() {
        }
        endProfiling() {
          void endProfiling2(this.sessionId);
        }
      };
    }
  });

  // web/lib/backend-wasm.ts
  var backend_wasm_exports = {};
  __export(backend_wasm_exports, {
    OnnxruntimeWebAssemblyBackend: () => OnnxruntimeWebAssemblyBackend,
    initializeFlags: () => initializeFlags,
    wasmBackend: () => wasmBackend
  });
  var initializeFlags, OnnxruntimeWebAssemblyBackend, wasmBackend;
  var init_backend_wasm = __esm({
    "web/lib/backend-wasm.ts"() {
      "use strict";
      init_esm();
      init_proxy_wrapper();
      init_session_handler_inference();
      initializeFlags = () => {
        if (typeof env2.wasm.initTimeout !== "number" || env2.wasm.initTimeout < 0) {
          env2.wasm.initTimeout = 0;
        }
        const simd = env2.wasm.simd;
        if (typeof simd !== "boolean" && simd !== void 0 && simd !== "fixed" && simd !== "relaxed") {
          console.warn(
            `Property "env.wasm.simd" is set to unknown value "${simd}". Reset it to \`false\` and ignore SIMD feature checking.`
          );
          env2.wasm.simd = false;
        }
        if (typeof env2.wasm.proxy !== "boolean") {
          env2.wasm.proxy = false;
        }
        if (typeof env2.wasm.trace !== "boolean") {
          env2.wasm.trace = false;
        }
        if (typeof env2.wasm.numThreads !== "number" || !Number.isInteger(env2.wasm.numThreads) || env2.wasm.numThreads <= 0) {
          if (typeof self !== "undefined" && !self.crossOriginIsolated) {
            env2.wasm.numThreads = 1;
          } else {
            const numCpuLogicalCores = typeof navigator === "undefined" ? __require("node:os").cpus().length : navigator.hardwareConcurrency;
            env2.wasm.numThreads = Math.min(4, Math.ceil((numCpuLogicalCores || 1) / 2));
          }
        }
      };
      OnnxruntimeWebAssemblyBackend = class {
        /**
         * This function initializes the WebAssembly backend.
         *
         * This function will be called only once for each backend name. It will be called the first time when
         * `ort.InferenceSession.create()` is called with a registered backend name.
         *
         * @param backendName - the registered backend name.
         */
        async init(backendName) {
          initializeFlags();
          await initializeWebAssemblyAndOrtRuntime();
          await initializeOrtEp(backendName);
        }
        async createInferenceSessionHandler(pathOrBuffer, options) {
          const handler = new OnnxruntimeWebAssemblySessionHandler();
          await handler.loadModel(pathOrBuffer, options);
          return handler;
        }
      };
      wasmBackend = new OnnxruntimeWebAssemblyBackend();
    }
  });

  // web/lib/index.ts
  var index_exports = {};
  __export(index_exports, {
    InferenceSession: () => InferenceSession2,
    TRACE: () => TRACE,
    TRACE_EVENT_BEGIN: () => TRACE_EVENT_BEGIN,
    TRACE_EVENT_END: () => TRACE_EVENT_END,
    TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
    TRACE_FUNC_END: () => TRACE_FUNC_END,
    Tensor: () => Tensor2,
    default: () => index_default,
    env: () => env2,
    registerBackend: () => registerBackend
  });
  init_esm();
  init_esm();
  init_esm();

  // web/lib/version.ts
  var version2 = "1.23.0";

  // web/lib/index.ts
  var index_default = esm_exports;
  if (false) {
    const onnxjsBackend = null.onnxjsBackend;
    registerBackend("webgl", onnxjsBackend, -10);
  }
  if (false) {
    throw new Error(
      "The current build is specified to enable both JSEP and WebGPU EP. This is not a valid configuration. JSEP and WebGPU EPs cannot be enabled at the same time."
    );
  }
  if (false) {
    throw new Error(
      "The current build is specified to enable WebNN EP without JSEP or WebGPU EP. This is not a valid configuration. WebNN EP requires either JSEP or WebGPU EP to be enabled."
    );
  }
  if (true) {
    const wasmBackend2 = (init_backend_wasm(), __toCommonJS(backend_wasm_exports)).wasmBackend;
    if (false) {
      registerBackend("webgpu", wasmBackend2, 5);
    }
    if (false) {
      registerBackend("webnn", wasmBackend2, 5);
    }
    registerBackend("cpu", wasmBackend2, 10);
    registerBackend("wasm", wasmBackend2, 10);
  }
  Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
  return __toCommonJS(index_exports);
})();
typeof exports=="object"&&typeof module=="object"&&(module.exports=ort);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdHJhY2UudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24udHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItY29udmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvb25ueC1tb2RlbC50cyIsICIuLi8uLi9jb21tb24vbGliL29ubngtdmFsdWUudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmRleC50cyIsICIuLi9saWIvd2FzbS93YXNtLXV0aWxzLWVudi50cyIsICIuLi9saWIvd2FzbS9wcm94eS13b3JrZXIvbWFpbi50cyIsICIuLi9saWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50cyIsICIuLi9saWIvd2FzbS93YXNtLWZhY3RvcnkudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy50cyIsICIuLi9saWIvd2FzbS9ydW4tb3B0aW9ucy50cyIsICIuLi9saWIvd2FzbS9zZXNzaW9uLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb21tb24udHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1sb2FkLWZpbGUudHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb3JlLWltcGwudHMiLCAiLi4vbGliL3dhc20vcHJveHktd3JhcHBlci50cyIsICIuLi9saWIvd2FzbS9zZXNzaW9uLWhhbmRsZXItaW5mZXJlbmNlLnRzIiwgIi4uL2xpYi9iYWNrZW5kLXdhc20udHMiLCAiLi4vbGliL2luZGV4LnRzIiwgIi4uL2xpYi92ZXJzaW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgQmFja2VuZCB9IGZyb20gJy4vYmFja2VuZC5qcyc7XG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5cbmludGVyZmFjZSBCYWNrZW5kSW5mbyB7XG4gIGJhY2tlbmQ6IEJhY2tlbmQ7XG4gIHByaW9yaXR5OiBudW1iZXI7XG5cbiAgaW5pdFByb21pc2U/OiBQcm9taXNlPHZvaWQ+O1xuICBpbml0aWFsaXplZD86IGJvb2xlYW47XG4gIGFib3J0ZWQ/OiBib29sZWFuO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuY29uc3QgYmFja2VuZHM6IE1hcDxzdHJpbmcsIEJhY2tlbmRJbmZvPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eTogc3RyaW5nW10gPSBbXTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIGJhY2tlbmQuXG4gKlxuICogQHBhcmFtIG5hbWUgLSB0aGUgbmFtZSBhcyBhIGtleSB0byBsb29rdXAgYXMgYW4gZXhlY3V0aW9uIHByb3ZpZGVyLlxuICogQHBhcmFtIGJhY2tlbmQgLSB0aGUgYmFja2VuZCBvYmplY3QuXG4gKiBAcGFyYW0gcHJpb3JpdHkgLSBhbiBpbnRlZ2VyIGluZGljYXRpbmcgdGhlIHByaW9yaXR5IG9mIHRoZSBiYWNrZW5kLiBIaWdoZXIgbnVtYmVyIG1lYW5zIGhpZ2hlciBwcmlvcml0eS4gaWYgcHJpb3JpdHlcbiAqIDwgMCwgaXQgd2lsbCBiZSBjb25zaWRlcmVkIGFzIGEgJ2JldGEnIHZlcnNpb24gYW5kIHdpbGwgbm90IGJlIHVzZWQgYXMgYSBmYWxsYmFjayBiYWNrZW5kIGJ5IGRlZmF1bHQuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJCYWNrZW5kID0gKG5hbWU6IHN0cmluZywgYmFja2VuZDogQmFja2VuZCwgcHJpb3JpdHk6IG51bWJlcik6IHZvaWQgPT4ge1xuICBpZiAoYmFja2VuZCAmJiB0eXBlb2YgYmFja2VuZC5pbml0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgY3VycmVudEJhY2tlbmQgPSBiYWNrZW5kcy5nZXQobmFtZSk7XG4gICAgaWYgKGN1cnJlbnRCYWNrZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJhY2tlbmRzLnNldChuYW1lLCB7IGJhY2tlbmQsIHByaW9yaXR5IH0pO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEJhY2tlbmQucHJpb3JpdHkgPiBwcmlvcml0eSkge1xuICAgICAgLy8gc2FtZSBuYW1lIGlzIGFscmVhZHkgcmVnaXN0ZXJlZCB3aXRoIGEgaGlnaGVyIHByaW9yaXR5LiBza2lwIHJlZ2lzdGVyYXRpb24uXG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChjdXJyZW50QmFja2VuZC5wcmlvcml0eSA9PT0gcHJpb3JpdHkpIHtcbiAgICAgIGlmIChjdXJyZW50QmFja2VuZC5iYWNrZW5kICE9PSBiYWNrZW5kKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJlZ2lzdGVyIGJhY2tlbmQgXCIke25hbWV9XCIgdXNpbmcgcHJpb3JpdHkgJHtwcmlvcml0eX1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJpb3JpdHkgPj0gMCkge1xuICAgICAgY29uc3QgaSA9IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChiYWNrZW5kcy5nZXQoYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5W2ldKSEucHJpb3JpdHkgPD0gcHJpb3JpdHkpIHtcbiAgICAgICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuc3BsaWNlKGksIDAsIG5hbWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnB1c2gobmFtZSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIHZhbGlkIGJhY2tlbmQnKTtcbn07XG5cbi8qKlxuICogVHJ5IHRvIHJlc29sdmUgYW5kIGluaXRpYWxpemUgYSBiYWNrZW5kLlxuICpcbiAqIEBwYXJhbSBiYWNrZW5kTmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBiYWNrZW5kLlxuICogQHJldHVybnMgdGhlIGJhY2tlbmQgaW5zdGFuY2UgaWYgcmVzb2x2ZWQgYW5kIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseSwgb3IgYW4gZXJyb3IgbWVzc2FnZSBpZiBmYWlsZWQuXG4gKi9cbmNvbnN0IHRyeVJlc29sdmVBbmRJbml0aWFsaXplQmFja2VuZCA9IGFzeW5jIChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTxCYWNrZW5kIHwgc3RyaW5nPiA9PiB7XG4gIGNvbnN0IGJhY2tlbmRJbmZvID0gYmFja2VuZHMuZ2V0KGJhY2tlbmROYW1lKTtcbiAgaWYgKCFiYWNrZW5kSW5mbykge1xuICAgIHJldHVybiAnYmFja2VuZCBub3QgZm91bmQuJztcbiAgfVxuXG4gIGlmIChiYWNrZW5kSW5mby5pbml0aWFsaXplZCkge1xuICAgIHJldHVybiBiYWNrZW5kSW5mby5iYWNrZW5kO1xuICB9IGVsc2UgaWYgKGJhY2tlbmRJbmZvLmFib3J0ZWQpIHtcbiAgICByZXR1cm4gYmFja2VuZEluZm8uZXJyb3IhO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGlzSW5pdGlhbGl6aW5nID0gISFiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcbiAgICB0cnkge1xuICAgICAgaWYgKCFpc0luaXRpYWxpemluZykge1xuICAgICAgICBiYWNrZW5kSW5mby5pbml0UHJvbWlzZSA9IGJhY2tlbmRJbmZvLmJhY2tlbmQuaW5pdChiYWNrZW5kTmFtZSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcbiAgICAgIGJhY2tlbmRJbmZvLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiBiYWNrZW5kSW5mby5iYWNrZW5kO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghaXNJbml0aWFsaXppbmcpIHtcbiAgICAgICAgYmFja2VuZEluZm8uZXJyb3IgPSBgJHtlfWA7XG4gICAgICAgIGJhY2tlbmRJbmZvLmFib3J0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhY2tlbmRJbmZvLmVycm9yITtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZGVsZXRlIGJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBSZXNvbHZlIGV4ZWN1dGlvbiBwcm92aWRlcnMgZnJvbSB0aGUgc3BlY2lmaWMgc2Vzc2lvbiBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSBvcHRpb25zIC0gdGhlIHNlc3Npb24gb3B0aW9ucyBvYmplY3QuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHR1cGxlIG9mIGFuIGluaXRpYWxpemVkIGJhY2tlbmQgaW5zdGFuY2UgYW5kIGEgc2Vzc2lvbiBvcHRpb25zIG9iamVjdCB3aXRoXG4gKiBmaWx0ZXJlZCBFUCBsaXN0LlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzID0gYXN5bmMgKFxuICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuKTogUHJvbWlzZTxbYmFja2VuZDogQmFja2VuZCwgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9uc10+ID0+IHtcbiAgLy8gZXh0cmFjdCBiYWNrZW5kIGhpbnRzIGZyb20gc2Vzc2lvbiBvcHRpb25zXG4gIGNvbnN0IGVwcyA9IG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzIHx8IFtdO1xuICBjb25zdCBiYWNrZW5kSGludHMgPSBlcHMubWFwKChpKSA9PiAodHlwZW9mIGkgPT09ICdzdHJpbmcnID8gaSA6IGkubmFtZSkpO1xuICBjb25zdCBiYWNrZW5kTmFtZXMgPSBiYWNrZW5kSGludHMubGVuZ3RoID09PSAwID8gYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5IDogYmFja2VuZEhpbnRzO1xuXG4gIC8vIHRyeSB0byByZXNvbHZlIGFuZCBpbml0aWFsaXplIGFsbCByZXF1ZXN0ZWQgYmFja2VuZHNcbiAgbGV0IGJhY2tlbmQ6IEJhY2tlbmQgfCB1bmRlZmluZWQ7XG4gIGNvbnN0IGVycm9ycyA9IFtdO1xuICBjb25zdCBhdmFpbGFibGVCYWNrZW5kTmFtZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChjb25zdCBiYWNrZW5kTmFtZSBvZiBiYWNrZW5kTmFtZXMpIHtcbiAgICBjb25zdCByZXNvbHZlUmVzdWx0ID0gYXdhaXQgdHJ5UmVzb2x2ZUFuZEluaXRpYWxpemVCYWNrZW5kKGJhY2tlbmROYW1lKTtcbiAgICBpZiAodHlwZW9mIHJlc29sdmVSZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlcnJvcnMucHVzaCh7IG5hbWU6IGJhY2tlbmROYW1lLCBlcnI6IHJlc29sdmVSZXN1bHQgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghYmFja2VuZCkge1xuICAgICAgICBiYWNrZW5kID0gcmVzb2x2ZVJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGlmIChiYWNrZW5kID09PSByZXNvbHZlUmVzdWx0KSB7XG4gICAgICAgIGF2YWlsYWJsZUJhY2tlbmROYW1lcy5hZGQoYmFja2VuZE5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGlmIG5vIGJhY2tlbmQgaXMgYXZhaWxhYmxlLCB0aHJvdyBlcnJvci5cbiAgaWYgKCFiYWNrZW5kKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBubyBhdmFpbGFibGUgYmFja2VuZCBmb3VuZC4gRVJSOiAke2Vycm9ycy5tYXAoKGUpID0+IGBbJHtlLm5hbWV9XSAke2UuZXJyfWApLmpvaW4oJywgJyl9YCk7XG4gIH1cblxuICAvLyBmb3IgZWFjaCBleHBsaWNpdGx5IHJlcXVlc3RlZCBiYWNrZW5kLCBpZiBpdCdzIG5vdCBhdmFpbGFibGUsIG91dHB1dCB3YXJuaW5nIG1lc3NhZ2UuXG4gIGZvciAoY29uc3QgeyBuYW1lLCBlcnIgfSBvZiBlcnJvcnMpIHtcbiAgICBpZiAoYmFja2VuZEhpbnRzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgcmVtb3ZpbmcgcmVxdWVzdGVkIGV4ZWN1dGlvbiBwcm92aWRlciBcIiR7bmFtZX1cIiBmcm9tIHNlc3Npb24gb3B0aW9ucyBiZWNhdXNlIGl0IGlzIG5vdCBhdmFpbGFibGU6ICR7ZXJyfWAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZpbHRlcmVkRXBzID0gZXBzLmZpbHRlcigoaSkgPT4gYXZhaWxhYmxlQmFja2VuZE5hbWVzLmhhcyh0eXBlb2YgaSA9PT0gJ3N0cmluZycgPyBpIDogaS5uYW1lKSk7XG5cbiAgcmV0dXJuIFtcbiAgICBiYWNrZW5kLFxuICAgIG5ldyBQcm94eShvcHRpb25zLCB7XG4gICAgICBnZXQ6ICh0YXJnZXQsIHByb3ApID0+IHtcbiAgICAgICAgaWYgKHByb3AgPT09ICdleGVjdXRpb25Qcm92aWRlcnMnKSB7XG4gICAgICAgICAgcmV0dXJuIGZpbHRlcmVkRXBzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3ApO1xuICAgICAgfSxcbiAgICB9KSxcbiAgXTtcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcbmltcG9ydCB7IE9ubnhWYWx1ZSB9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5cbi8qKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgU2Vzc2lvbkhhbmRsZXIge1xuICB0eXBlIEZlZWRzVHlwZSA9IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9O1xuICB0eXBlIEZldGNoZXNUeXBlID0geyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIHwgbnVsbCB9O1xuICB0eXBlIFJldHVyblR5cGUgPSB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHNoYXJlZCBTZXNzaW9uSGFuZGxlciBmdW5jdGlvbmFsaXR5XG4gKlxuICogQGlnbm9yZVxuICovXG5pbnRlcmZhY2UgU2Vzc2lvbkhhbmRsZXIge1xuICBkaXNwb3NlKCk6IFByb21pc2U8dm9pZD47XG5cbiAgcmVhZG9ubHkgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG4gIHJlYWRvbmx5IG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICByZWFkb25seSBpbnB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcbiAgcmVhZG9ubHkgb3V0cHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIGhhbmRsZXIgaW5zdGFuY2Ugb2YgYW4gaW5mZXJlbmNlIHNlc3Npb24uXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xuICBlbmRQcm9maWxpbmcoKTogdm9pZDtcblxuICBydW4oXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgYmFja2VuZCB0aGF0IHByb3ZpZGVzIGltcGxlbWVudGF0aW9uIG9mIG1vZGVsIGluZmVyZW5jaW5nLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCYWNrZW5kIHtcbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGJhY2tlbmQgYXN5bmNocm9ub3VzbHkuIFNob3VsZCB0aHJvdyB3aGVuIGZhaWxlZC5cbiAgICovXG4gIGluaXQoYmFja2VuZE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG5cbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgdXJpT3JCdWZmZXI6IHN0cmluZyB8IFVpbnQ4QXJyYXksXG4gICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xufVxuXG5leHBvcnQgeyByZWdpc3RlckJhY2tlbmQgfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgL2pzL3NjcmlwdHMvdXBkYXRlLXZlcnNpb24udHNcbi8vIERvIG5vdCBtb2RpZnkgZmlsZSBjb250ZW50IG1hbnVhbGx5LlxuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcxLjIzLjAnO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBFbnYgfSBmcm9tICcuL2Vudi5qcyc7XG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uLmpzJztcblxudHlwZSBMb2dMZXZlbFR5cGUgPSBFbnZbJ2xvZ0xldmVsJ107XG5cbmxldCBsb2dMZXZlbFZhbHVlOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+ID0gJ3dhcm5pbmcnO1xuXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSB7XG4gIHdhc206IHt9IGFzIEVudi5XZWJBc3NlbWJseUZsYWdzLFxuICB3ZWJnbDoge30gYXMgRW52LldlYkdMRmxhZ3MsXG4gIHdlYmdwdToge30gYXMgRW52LldlYkdwdUZsYWdzLFxuICB2ZXJzaW9uczogeyBjb21tb246IHZlcnNpb24gfSxcblxuICBzZXQgbG9nTGV2ZWwodmFsdWU6IExvZ0xldmVsVHlwZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IFsndmVyYm9zZScsICdpbmZvJywgJ3dhcm5pbmcnLCAnZXJyb3InLCAnZmF0YWwnXS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHt2YWx1ZX1gKTtcbiAgICB9XG4gICAgbG9nTGV2ZWxWYWx1ZSA9IHZhbHVlO1xuICB9LFxuICBnZXQgbG9nTGV2ZWwoKTogUmVxdWlyZWQ8TG9nTGV2ZWxUeXBlPiB7XG4gICAgcmV0dXJuIGxvZ0xldmVsVmFsdWU7XG4gIH0sXG59O1xuXG4vLyBzZXQgcHJvcGVydHkgJ2xvZ0xldmVsJyBzbyB0aGF0IHRoZXkgY2FuIGJlIGNvcnJlY3RseSB0cmFuc2ZlcnJlZCB0byB3b3JrZXIgYnkgYHBvc3RNZXNzYWdlKClgLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudiwgJ2xvZ0xldmVsJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBlbnYgYXMgZW52SW1wbCB9IGZyb20gJy4vZW52LWltcGwuanMnO1xuaW1wb3J0IHsgVHJ5R2V0R2xvYmFsVHlwZSB9IGZyb20gJy4vdHlwZS1oZWxwZXIuanMnO1xuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgRW52IHtcbiAgZXhwb3J0IHR5cGUgV2FzbVBhdGhQcmVmaXggPSBzdHJpbmc7XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2FzbUZpbGVQYXRocyB7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgb3ZlcnJpZGUgcGF0aCBmb3IgdGhlIG1haW4gLndhc20gZmlsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKlxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAud2FzbSBmaWxlIGlzOlxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbWAgZm9yIGRlZmF1bHQgYnVpbGRcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbWAgZm9yIEpTRVAgYnVpbGQgKHdpdGggV2ViR1BVIGFuZCBXZWJOTilcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lndhc21gIGZvciBXZWJHUFUgYnVpbGQgd2l0aCBBc3luY2lmeSAod2l0aCBXZWJOTilcbiAgICAgKi9cbiAgICB3YXNtPzogVVJMIHwgc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIG92ZXJyaWRlIHBhdGggZm9yIHRoZSBtYWluIC5tanMgZmlsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKlxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAubWpzIGZpbGUgaXM6XG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5tanNgIGZvciBkZWZhdWx0IGJ1aWxkXG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qc2AgZm9yIEpTRVAgYnVpbGQgKHdpdGggV2ViR1BVIGFuZCBXZWJOTilcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lm1qc2AgZm9yIFdlYkdQVSBidWlsZCB3aXRoIEFzeW5jaWZ5ICh3aXRoIFdlYk5OKVxuICAgICAqL1xuICAgIG1qcz86IFVSTCB8IHN0cmluZztcbiAgfVxuICBleHBvcnQgdHlwZSBXYXNtUHJlZml4T3JGaWxlUGF0aHMgPSBXYXNtUGF0aFByZWZpeCB8IFdhc21GaWxlUGF0aHM7XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViQXNzZW1ibHlGbGFncyB7XG4gICAgLyoqXG4gICAgICogc2V0IG9yIGdldCBudW1iZXIgb2YgdGhyZWFkKHMpLiBJZiBvbWl0dGVkIG9yIHNldCB0byAwLCBudW1iZXIgb2YgdGhyZWFkKHMpIHdpbGwgYmUgZGV0ZXJtaW5lZCBieSBzeXN0ZW0uIElmIHNldFxuICAgICAqIHRvIDEsIG5vIHdvcmtlciB0aHJlYWQgd2lsbCBiZSBzcGF3bmVkLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IHdoZW4gV2ViQXNzZW1ibHkgbXVsdGl0aHJlYWQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgMGBcbiAgICAgKi9cbiAgICBudW1UaHJlYWRzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogc2V0IGEgdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIGVuYWJsZSBTSU1ELlxuICAgICAqXG4gICAgICogT05OWCBSdW50aW1lIHdpbGwgcGVyZm9ybSBmZWF0dXJlIGRldGVjdGlvbiBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eS4gU3BlY2lmaWNhbGx5LCB3aGVuIHRoZSB2YWx1ZSBpc1xuICAgICAqIHNldCB0bzpcbiAgICAgKiAtIGB1bmRlZmluZWRgLCBgdHJ1ZWAgb3IgYFwiZml4ZWRcImA6IHdpbGwgY2hlY2sgYXZhaWxhYmlsaXR5IG9mIEZpeGVkLXdpZHRoIFNJTUQuXG4gICAgICogLSBgXCJyZWxheGVkXCJgOiB3aWxsIGNoZWNrIGF2YWlsYWJpbGl0eSBvZiBSZWxheGVkIFNJTUQuXG4gICAgICogLSBgZmFsc2VgOiB3aWxsIG5vdCBwZXJmb3JtIFNJTUQgZmVhdHVyZSBjaGVja2luZy5cbiAgICAgKlxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBkb2VzIG5vdCBtYWtlIE9OTlggUnVudGltZSB0byBzd2l0Y2ggdG8gdGhlIGNvcnJlc3BvbmRpbmcgcnVudGltZSBhdXRvbWF0aWNhbGx5LiBVc2VyIG5lZWRcbiAgICAgKiB0byBzZXQgYHdhc21QYXRoc2Agb3IgYHdhc21CaW5hcnlgIHByb3BlcnR5IHRvIGxvYWQgdGhlIGNvcnJlc3BvbmRpbmcgcnVudGltZS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IFNJTUQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdHJ1ZWBcbiAgICAgKi9cbiAgICBzaW1kPzogYm9vbGVhbiB8ICdmaXhlZCcgfCAncmVsYXhlZCc7XG5cbiAgICAvKipcbiAgICAgKiBzZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gZW5hYmxlIHRyYWNlLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYGVudi50cmFjZWAgaW5zdGVhZC4gSWYgYGVudi50cmFjZWAgaXMgc2V0LCB0aGlzIHByb3BlcnR5IHdpbGwgYmUgaWdub3JlZC5cbiAgICAgKi9cbiAgICB0cmFjZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IGEgbnVtYmVyIHNwZWNpZnlpbmcgdGhlIHRpbWVvdXQgZm9yIGluaXRpYWxpemF0aW9uIG9mIFdlYkFzc2VtYmx5IGJhY2tlbmQsIGluIG1pbGxpc2Vjb25kcy4gQSB6ZXJvXG4gICAgICogdmFsdWUgaW5kaWNhdGVzIG5vIHRpbWVvdXQgaXMgc2V0LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgMGBcbiAgICAgKi9cbiAgICBpbml0VGltZW91dD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFNldCBhIGN1c3RvbSBVUkwgcHJlZml4IHRvIHRoZSAud2FzbS8ubWpzIGZpbGVzLCBvciBhbiBvYmplY3Qgb2Ygb3ZlcnJpZGVzIGZvciBib3RoIC53YXNtLy5tanMgZmlsZS4gVGhlIG92ZXJyaWRlXG4gICAgICogcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKi9cbiAgICB3YXNtUGF0aHM/OiBXYXNtUHJlZml4T3JGaWxlUGF0aHM7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBjdXN0b20gYnVmZmVyIHdoaWNoIGNvbnRhaW5zIHRoZSBXZWJBc3NlbWJseSBiaW5hcnkuIElmIHRoaXMgcHJvcGVydHkgaXMgc2V0LCB0aGUgYHdhc21QYXRoc2AgcHJvcGVydHkgd2lsbFxuICAgICAqIGJlIGlnbm9yZWQuXG4gICAgICovXG4gICAgd2FzbUJpbmFyeT86IEFycmF5QnVmZmVyTGlrZSB8IFVpbnQ4QXJyYXk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gcHJveHkgdGhlIGV4ZWN1dGlvbiBvZiBtYWluIHRocmVhZCB0byBhIHdvcmtlciB0aHJlYWQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBwcm94eT86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdMRmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIFdlYkdMIENvbnRleHQgSUQgKHdlYmdsIG9yIHdlYmdsMikuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAnd2ViZ2wyJ2BcbiAgICAgKi9cbiAgICBjb250ZXh0SWQ/OiAnd2ViZ2wnIHwgJ3dlYmdsMic7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBXZWJHTCByZW5kZXJpbmcgY29udGV4dC5cbiAgICAgKi9cbiAgICByZWFkb25seSBjb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgbWF4aW11bSBiYXRjaCBzaXplIGZvciBtYXRtdWwuIDAgbWVhbnMgdG8gZGlzYWJsZSBiYXRjaGluZy5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgbWF0bXVsTWF4QmF0Y2hTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHRleHR1cmUgY2FjaGUgbW9kZS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCdmdWxsJ2BcbiAgICAgKi9cbiAgICB0ZXh0dXJlQ2FjaGVNb2RlPzogJ2luaXRpYWxpemVyT25seScgfCAnZnVsbCc7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgcGFja2VkIHRleHR1cmUgbW9kZVxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICovXG4gICAgcGFjaz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB3aGV0aGVyIGVuYWJsZSBhc3luYyBkb3dubG9hZC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIGFzeW5jPzogYm9vbGVhbjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1UHJvZmlsaW5nRGF0YVYxVGVuc29yTWV0YWRhdGEge1xuICAgIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xuICAgIGRhdGFUeXBlOiBzdHJpbmc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVQcm9maWxpbmdEYXRhVjEge1xuICAgIHZlcnNpb246IDE7XG4gICAgaW5wdXRzTWV0YWRhdGE6IHJlYWRvbmx5IFdlYkdwdVByb2ZpbGluZ0RhdGFWMVRlbnNvck1ldGFkYXRhW107XG4gICAgb3V0cHV0c01ldGFkYXRhOiByZWFkb25seSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YVtdO1xuICAgIGtlcm5lbElkOiBudW1iZXI7XG4gICAga2VybmVsVHlwZTogc3RyaW5nO1xuICAgIGtlcm5lbE5hbWU6IHN0cmluZztcbiAgICBwcm9ncmFtTmFtZTogc3RyaW5nO1xuICAgIHN0YXJ0VGltZTogbnVtYmVyO1xuICAgIGVuZFRpbWU6IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIFdlYkdwdVByb2ZpbGluZ0RhdGEgPSBXZWJHcHVQcm9maWxpbmdEYXRhVjE7XG5cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVGbGFncyB7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYGVudi53ZWJncHUucHJvZmlsaW5nLm1vZGVgIGluc3RlYWQuIElmIGBlbnYud2ViZ3B1LnByb2ZpbGluZy5tb2RlYCBpcyBzZXQsIHRoaXMgcHJvcGVydHkgd2lsbCBiZVxuICAgICAqIGlnbm9yZWQuXG4gICAgICovXG4gICAgcHJvZmlsaW5nTW9kZT86ICdvZmYnIHwgJ2RlZmF1bHQnO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHByb2ZpbGluZyBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIHByb2ZpbGluZzoge1xuICAgICAgLyoqXG4gICAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgbW9kZS5cbiAgICAgICAqXG4gICAgICAgKiBAZGVmYXVsdFZhbHVlIGAnb2ZmJ2BcbiAgICAgICAqL1xuICAgICAgbW9kZT86ICdvZmYnIHwgJ2RlZmF1bHQnO1xuXG4gICAgICAvKipcbiAgICAgICAqIFNldCBvciBnZXQgYSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIGEgcHJvZmlsaW5nIGRhdGEgaXMgcmVjZWl2ZWQuIElmIG5vdCBzZXQsIHRoZSBwcm9maWxpbmcgZGF0YSB3aWxsIGJlXG4gICAgICAgKiBwcmludGVkIHRvIGNvbnNvbGUuXG4gICAgICAgKi9cbiAgICAgIG9uZGF0YT86IChkYXRhOiBXZWJHcHVQcm9maWxpbmdEYXRhKSA9PiB2b2lkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgcG93ZXIgcHJlZmVyZW5jZS5cbiAgICAgKlxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBvbmx5IGhhcyBlZmZlY3QgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmVcbiAgICAgKiB1c2VkIGFzIG9wdGlvbnMgZm9yIGBuYXZpZ2F0b3IuZ3B1LnJlcXVlc3RBZGFwdGVyKClgLlxuICAgICAqXG4gICAgICogU2VlIHtAbGluayBodHRwczovL2dwdXdlYi5naXRodWIuaW8vZ3B1d2ViLyNkaWN0ZGVmLWdwdXJlcXVlc3RhZGFwdGVyb3B0aW9uc30gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYHVuZGVmaW5lZGBcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIENyZWF0ZSB5b3VyIG93biBHUFVBZGFwdGVyLCB1c2UgaXQgdG8gY3JlYXRlIGEgR1BVRGV2aWNlIGluc3RhbmNlIGFuZCBzZXQge0BsaW5rIGRldmljZX0gcHJvcGVydHkgaWZcbiAgICAgKiB5b3Ugd2FudCB0byB1c2UgYSBzcGVjaWZpYyBwb3dlciBwcmVmZXJlbmNlLlxuICAgICAqL1xuICAgIHBvd2VyUHJlZmVyZW5jZT86ICdsb3ctcG93ZXInIHwgJ2hpZ2gtcGVyZm9ybWFuY2UnO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIGZvcmNlIGZhbGxiYWNrIGFkYXB0ZXIgZmxhZy5cbiAgICAgKlxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBvbmx5IGhhcyBlZmZlY3QgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmVcbiAgICAgKiB1c2VkIGFzIG9wdGlvbnMgZm9yIGBuYXZpZ2F0b3IuZ3B1LnJlcXVlc3RBZGFwdGVyKClgLlxuICAgICAqXG4gICAgICogU2VlIHtAbGluayBodHRwczovL2dwdXdlYi5naXRodWIuaW8vZ3B1d2ViLyNkaWN0ZGVmLWdwdXJlcXVlc3RhZGFwdGVyb3B0aW9uc30gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYHVuZGVmaW5lZGBcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIENyZWF0ZSB5b3VyIG93biBHUFVBZGFwdGVyLCB1c2UgaXQgdG8gY3JlYXRlIGEgR1BVRGV2aWNlIGluc3RhbmNlIGFuZCBzZXQge0BsaW5rIGRldmljZX0gcHJvcGVydHkgaWZcbiAgICAgKiB5b3Ugd2FudCB0byB1c2UgYSBzcGVjaWZpYyBmYWxsYmFjayBvcHRpb24uXG4gICAgICovXG4gICAgZm9yY2VGYWxsYmFja0FkYXB0ZXI/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIGFkYXB0ZXIgZm9yIFdlYkdQVS5cbiAgICAgKlxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBvbmx5IGhhcyBlZmZlY3QgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmVcbiAgICAgKiB1c2VkIGFzIHRoZSBHUFUgYWRhcHRlciBmb3IgdGhlIHVuZGVybHlpbmcgV2ViR1BVIGJhY2tlbmQgdG8gY3JlYXRlIEdQVSBkZXZpY2UuXG4gICAgICpcbiAgICAgKiBJZiB0aGlzIHByb3BlcnR5IGlzIG5vdCBzZXQsIGl0IHdpbGwgYmUgYXZhaWxhYmxlIHRvIGdldCBhZnRlciB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZVxuICAgICAqIHZhbHVlIHdpbGwgYmUgdGhlIEdQVSBhZGFwdGVyIHRoYXQgY3JlYXRlZCBieSB0aGUgdW5kZXJseWluZyBXZWJHUFUgYmFja2VuZC5cbiAgICAgKlxuICAgICAqIFdoZW4gdXNlIHdpdGggVHlwZVNjcmlwdCwgdGhlIHR5cGUgb2YgdGhpcyBwcm9wZXJ0eSBpcyBgR1BVQWRhcHRlcmAgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIEl0IGlzIG5vIGxvbmdlciByZWNvbW1lbmRlZCB0byB1c2UgdGhpcyBwcm9wZXJ0eS4gVGhlIGxhdGVzdCBXZWJHUFUgc3BlYyBhZGRzIGBHUFVEZXZpY2UuYWRhcHRlckluZm9gXG4gICAgICogKGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJncHUvI2RvbS1ncHVkZXZpY2UtYWRhcHRlcmluZm8pLCB3aGljaCBhbGxvd3MgdG8gZ2V0IHRoZSBhZGFwdGVyIGluZm9ybWF0aW9uIGZyb20gdGhlXG4gICAgICogZGV2aWNlLiBXaGVuIGl0J3MgYXZhaWxhYmxlLCB0aGVyZSBpcyBubyBuZWVkIHRvIHNldC9nZXQgdGhlIHtAbGluayBhZGFwdGVyfSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBhZGFwdGVyOiBUcnlHZXRHbG9iYWxUeXBlPCdHUFVBZGFwdGVyJz47XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgR1BVIGRldmljZSBmb3IgV2ViR1BVLlxuICAgICAqXG4gICAgICogVGhlcmUgYXJlIDMgdmFsaWQgc2NlbmFyaW9zIG9mIGFjY2Vzc2luZyB0aGlzIHByb3BlcnR5OlxuICAgICAqIC0gU2V0IGEgdmFsdWUgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmUgdXNlZCBieSB0aGUgV2ViR1BVIGJhY2tlbmRcbiAgICAgKiB0byBwZXJmb3JtIGNhbGN1bGF0aW9ucy4gSWYgdGhlIHZhbHVlIGlzIG5vdCBhIGBHUFVEZXZpY2VgIG9iamVjdCwgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gICAgICogLSBHZXQgdGhlIHZhbHVlIGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoaXMgd2lsbCB0cnkgdG8gY3JlYXRlIGEgbmV3IEdQVURldmljZVxuICAgICAqIGluc3RhbmNlLiBSZXR1cm5zIGEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgdG8gYSBgR1BVRGV2aWNlYCBvYmplY3QuXG4gICAgICogLSBHZXQgdGhlIHZhbHVlIGFmdGVyIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gUmV0dXJucyBhIHJlc29sdmVkIGBQcm9taXNlYCB0byB0aGVcbiAgICAgKiBgR1BVRGV2aWNlYCBvYmplY3QgdXNlZCBieSB0aGUgV2ViR1BVIGJhY2tlbmQuXG4gICAgICovXG4gICAgZ2V0IGRldmljZSgpOiBQcm9taXNlPFRyeUdldEdsb2JhbFR5cGU8J0dQVURldmljZSc+PjtcbiAgICBzZXQgZGV2aWNlKHZhbHVlOiBUcnlHZXRHbG9iYWxUeXBlPCdHUFVEZXZpY2UnPik7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB3aGV0aGVyIHZhbGlkYXRlIGlucHV0IGNvbnRlbnQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICB2YWxpZGF0ZUlucHV0Q29udGVudD86IGJvb2xlYW47XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnYge1xuICAvKipcbiAgICogc2V0IHRoZSBzZXZlcml0eSBsZXZlbCBmb3IgbG9nZ2luZy5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgJ3dhcm5pbmcnYFxuICAgKi9cbiAgbG9nTGV2ZWw/OiAndmVyYm9zZScgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InIHwgJ2ZhdGFsJztcblxuICAvKipcbiAgICogSW5kaWNhdGUgd2hldGhlciBydW4gaW4gZGVidWcgbW9kZS5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAqL1xuICBkZWJ1Zz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXG4gICAqXG4gICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgKi9cbiAgdHJhY2U/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBHZXQgdmVyc2lvbiBvZiB0aGUgY3VycmVudCBwYWNrYWdlLlxuICAgKi9cbiAgcmVhZG9ubHkgdmVyc2lvbnM6IHtcbiAgICByZWFkb25seSBjb21tb246IHN0cmluZztcbiAgICByZWFkb25seSB3ZWI/OiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgbm9kZT86IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgcmVhZG9ubHkgJ3JlYWN0LW5hdGl2ZSc/OiBzdHJpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViQXNzZW1ibHlcbiAgICovXG4gIHJlYWRvbmx5IHdhc206IEVudi5XZWJBc3NlbWJseUZsYWdzO1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkdMXG4gICAqL1xuICByZWFkb25seSB3ZWJnbDogRW52LldlYkdMRmxhZ3M7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViR1BVXG4gICAqL1xuICByZWFkb25seSB3ZWJncHU6IEVudi5XZWJHcHVGbGFncztcblxuICBbbmFtZTogc3RyaW5nXTogdW5rbm93bjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgYXMgYSBnbG9iYWwgc2luZ2xldG9uLlxuICovXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSBlbnZJbXBsO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3JUb0RhdGFVcmxPcHRpb25zLCBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMgfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IudG9EYXRhVVJMKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclRvRGF0YVVSTCA9ICh0ZW5zb3I6IFRlbnNvciwgb3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBjYW52YXMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykgOiBuZXcgT2Zmc2NyZWVuQ2FudmFzKDEsIDEpO1xuICBjYW52YXMud2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgY2FudmFzLmhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhc1xuICAgIHwgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgfCBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgICB8IG51bGw7XG5cbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1szXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucz8uZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5tZWFuID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuWzBdLCBub3JtLm1lYW5bMV0sIG5vcm0ubWVhblsyXSwgMF07XG4gICAgICAgIGlmIChub3JtLm1lYW5bM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1NZWFuWzNdID0gbm9ybS5tZWFuWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1CaWFzID0gWzAsIDAsIDAsIDBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xuICAgICAgICBpZiAobm9ybS5iaWFzWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtQmlhc1szXSA9IG5vcm0uYmlhc1szXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0cmlkZSA9IGhlaWdodCAqIHdpZHRoO1xuICAgIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICAgIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSxcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XG4gICAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IFIgPSAoKHRlbnNvci5kYXRhW3JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1swXSkgKiBub3JtTWVhblswXTsgLy8gUiB2YWx1ZVxuICAgICAgICBjb25zdCBHID0gKCh0ZW5zb3IuZGF0YVtnVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMV0pICogbm9ybU1lYW5bMV07IC8vIEcgdmFsdWVcbiAgICAgICAgY29uc3QgQiA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAvLyBCIHZhbHVlXG4gICAgICAgIGNvbnN0IEEgPSBhVGVuc29yUG9pbnRlciA9PT0gLTEgPyAyNTUgOiAoKHRlbnNvci5kYXRhW2FUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1szXSkgKiBub3JtTWVhblszXTsgLy8gQSB2YWx1ZVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3Jlc3RyaWN0LXBsdXMtb3BlcmFuZHNcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKCcgKyBSICsgJywnICsgRyArICcsJyArIEIgKyAnLCcgKyBBICsgJyknO1xuICAgICAgICBwaXhlbHMyRENvbnRleHQuZmlsbFJlY3QoaiwgaSwgMSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgndG9EYXRhVVJMJyBpbiBjYW52YXMpIHtcbiAgICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndG9EYXRhVVJMIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvSW1hZ2VEYXRhKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclRvSW1hZ2VEYXRhID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhID0+IHtcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID1cbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJylcbiAgICAgIDogKG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSkuZ2V0Q29udGV4dCgnMmQnKSBhcyBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICBsZXQgaW1hZ2U6IEltYWdlRGF0YTtcbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IGNoYW5uZWxzOiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1sxXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbM107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZmF1bHQgbGF5b3V0IGlzIE5DV0hcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbM107XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbMV07XG4gICAgfVxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5tZWFuID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuWzBdLCBub3JtLm1lYW5bMV0sIG5vcm0ubWVhblsyXSwgMjU1XTtcbiAgICAgICAgaWYgKG5vcm0ubWVhblszXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybU1lYW5bM10gPSBub3JtLm1lYW5bM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLmJpYXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybUJpYXMgPSBbMCwgMCwgMCwgMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5iaWFzID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1CaWFzWzNdID0gbm9ybS5iaWFzWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKFxuICAgICAgICAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCAmJiBjaGFubmVscyA9PT0gNCAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQkEnKSB8fFxuICAgICAgICAoY2hhbm5lbHMgPT09IDMgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdSR0InICYmIG9wdGlvbnMuZm9ybWF0ICE9PSAnQkdSJylcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZW5zb3IgZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggaW5wdXQgdGVuc29yIGRpbXNcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCBwb2ludGVyIGFzc2lnbm1lbnRzXG4gICAgY29uc3Qgc3RlcCA9IDQ7XG4gICAgbGV0IHJJbWFnZVBvaW50ZXIgPSAwLFxuICAgICAgZ0ltYWdlUG9pbnRlciA9IDEsXG4gICAgICBiSW1hZ2VQb2ludGVyID0gMixcbiAgICAgIGFJbWFnZVBvaW50ZXIgPSAzO1xuICAgIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSxcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XG4gICAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfVxuXG4gICAgaW1hZ2UgPSBwaXhlbHMyRENvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgZm9yIChcbiAgICAgIGxldCBpID0gMDtcbiAgICAgIGkgPCBoZWlnaHQgKiB3aWR0aDtcbiAgICAgIHJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBiSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGFJbWFnZVBvaW50ZXIgKz0gc3RlcCwgaSsrXG4gICAgKSB7XG4gICAgICBpbWFnZS5kYXRhW3JJbWFnZVBvaW50ZXJdID0gKCh0ZW5zb3IuZGF0YVtyVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMF0pICogbm9ybU1lYW5bMF07IC8vIFIgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbZ0ltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgLy8gRyB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtiSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAvLyBCIHZhbHVlXG4gICAgICBpbWFnZS5kYXRhW2FJbWFnZVBvaW50ZXJdID1cbiAgICAgICAgYVRlbnNvclBvaW50ZXIgPT09IC0xID8gMjU1IDogKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107IC8vIEEgdmFsdWVcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbiAgcmV0dXJuIGltYWdlO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtcbiAgT3B0aW9uc0RpbWVuc2lvbnMsXG4gIE9wdGlvbnNGb3JtYXQsXG4gIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcbiAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLFxuICBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyxcbiAgVGVuc29yRnJvbU1MVGVuc29yT3B0aW9ucyxcbiAgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zLFxuICBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbn0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7IFRlbnNvciBhcyBUZW5zb3JJbnRlcmZhY2UgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmludGVyZmFjZSBCdWZmZXJUb1RlbnNvck9wdGlvbnNcbiAgZXh0ZW5kcyBPcHRpb25zRGltZW5zaW9ucyxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcbiAgICBPcHRpb25zRm9ybWF0LFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQge31cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIGltYWdlIG9iamVjdFxuICpcbiAqIEBwYXJhbSBidWZmZXIgLSBFeHRyYWN0ZWQgaW1hZ2UgYnVmZmVyIGRhdGEgLSBhc3N1bWluZyBSR0JBIGZvcm1hdFxuICogQHBhcmFtIGltYWdlRm9ybWF0IC0gaW5wdXQgaW1hZ2UgY29uZmlndXJhdGlvbiAtIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb25zIGhlaWdodCwgd2lkdGgsIGZvcm1hdFxuICogQHBhcmFtIHRlbnNvckZvcm1hdCAtIG91dHB1dCB0ZW5zb3IgY29uZmlndXJhdGlvbiAtIERlZmF1bHQgaXMgUkdCIGZvcm1hdFxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9UZW5zb3IgPSAoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheSB8IHVuZGVmaW5lZCwgb3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zKTogVGVuc29yID0+IHtcbiAgaWYgKGJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBidWZmZXIgbXVzdCBiZSBkZWZpbmVkJyk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGVpZ2h0ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy53aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBoZWlnaHQgYW5kIHdpZHRoIG11c3QgYmUgZGVmaW5lZCcpO1xuICB9XG4gIGlmIChvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOSFdDIFRlbnNvciBsYXlvdXQgaXMgbm90IHN1cHBvcnRlZCB5ZXQnKTtcbiAgfVxuXG4gIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gb3B0aW9ucztcblxuICBjb25zdCBub3JtID0gb3B0aW9ucy5ub3JtID8/IHsgbWVhbjogMjU1LCBiaWFzOiAwIH07XG4gIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbiAgaWYgKHR5cGVvZiBub3JtLm1lYW4gPT09ICdudW1iZXInKSB7XG4gICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgfSBlbHNlIHtcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4hWzBdLCBub3JtLm1lYW4hWzFdLCBub3JtLm1lYW4hWzJdLCBub3JtLm1lYW4hWzNdID8/IDI1NV07XG4gIH1cblxuICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcbiAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICB9IGVsc2Uge1xuICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcyFbMF0sIG5vcm0uYmlhcyFbMV0sIG5vcm0uYmlhcyFbMl0sIG5vcm0uYmlhcyFbM10gPz8gMF07XG4gIH1cblxuICBjb25zdCBpbnB1dGZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0JBJztcbiAgLy8gZGVmYXVsdCB2YWx1ZSBpcyBSR0JBIHNpbmNlIGltYWdlZGF0YSBhbmQgSFRNTEltYWdlRWxlbWVudCB1c2VzIGl0XG5cbiAgY29uc3Qgb3V0cHV0Zm9ybWF0ID1cbiAgICBvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRlbnNvckZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgY29uc3QgZmxvYXQzMkRhdGEgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBGbG9hdDMyQXJyYXkoc3RyaWRlICogNCkgOiBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDMpO1xuXG4gIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICBsZXQgc3RlcCA9IDQsXG4gICAgckltYWdlUG9pbnRlciA9IDAsXG4gICAgZ0ltYWdlUG9pbnRlciA9IDEsXG4gICAgYkltYWdlUG9pbnRlciA9IDIsXG4gICAgYUltYWdlUG9pbnRlciA9IDM7XG4gIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsXG4gICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLFxuICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgc3RlcCA9IDM7XG4gICAgckltYWdlUG9pbnRlciA9IDA7XG4gICAgZ0ltYWdlUG9pbnRlciA9IDE7XG4gICAgYkltYWdlUG9pbnRlciA9IDI7XG4gICAgYUltYWdlUG9pbnRlciA9IC0xO1xuICB9XG5cbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIG91dHB1dCB0ZW5zb3IgZm9ybWF0XG4gIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdCR1InKSB7XG4gICAgYlRlbnNvclBvaW50ZXIgPSAwO1xuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgIHJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgfVxuXG4gIGZvciAoXG4gICAgbGV0IGkgPSAwO1xuICAgIGkgPCBzdHJpZGU7XG4gICAgaSsrLCBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXBcbiAgKSB7XG4gICAgZmxvYXQzMkRhdGFbclRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW3JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMF0pIC8gbm9ybU1lYW5bMF07XG4gICAgZmxvYXQzMkRhdGFbZ1RlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2dJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMV0pIC8gbm9ybU1lYW5bMV07XG4gICAgZmxvYXQzMkRhdGFbYlRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMl0pIC8gbm9ybU1lYW5bMl07XG4gICAgaWYgKGFUZW5zb3JQb2ludGVyICE9PSAtMSAmJiBhSW1hZ2VQb2ludGVyICE9PSAtMSkge1xuICAgICAgZmxvYXQzMkRhdGFbYVRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2FJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbM10pIC8gbm9ybU1lYW5bM107XG4gICAgfVxuICB9XG5cbiAgLy8gRmxvYXQzMkFycmF5IC0+IG9ydC5UZW5zb3JcbiAgY29uc3Qgb3V0cHV0VGVuc29yID1cbiAgICBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJ1xuICAgICAgPyBuZXcgVGVuc29yKCdmbG9hdDMyJywgZmxvYXQzMkRhdGEsIFsxLCA0LCBoZWlnaHQsIHdpZHRoXSlcbiAgICAgIDogbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgMywgaGVpZ2h0LCB3aWR0aF0pO1xuICByZXR1cm4gb3V0cHV0VGVuc29yO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUltYWdlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tSW1hZ2UgPSBhc3luYyAoXG4gIGltYWdlOiBJbWFnZURhdGEgfCBIVE1MSW1hZ2VFbGVtZW50IHwgSW1hZ2VCaXRtYXAgfCBzdHJpbmcsXG4gIG9wdGlvbnM/OlxuICAgIHwgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcbiAgICB8IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zXG4gICAgfCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zXG4gICAgfCBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbik6IFByb21pc2U8VGVuc29yPiA9PiB7XG4gIC8vIGNoZWNraW5nIHRoZSB0eXBlIG9mIGltYWdlIG9iamVjdFxuICBjb25zdCBpc0hUTUxJbWFnZUVsZSA9IHR5cGVvZiBIVE1MSW1hZ2VFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGNvbnN0IGlzSW1hZ2VEYXRhRWxlID0gdHlwZW9mIEltYWdlRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGE7XG4gIGNvbnN0IGlzSW1hZ2VCaXRtYXAgPSB0eXBlb2YgSW1hZ2VCaXRtYXAgIT09ICd1bmRlZmluZWQnICYmIGltYWdlIGluc3RhbmNlb2YgSW1hZ2VCaXRtYXA7XG4gIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIGltYWdlID09PSAnc3RyaW5nJztcblxuICBsZXQgZGF0YTogVWludDhDbGFtcGVkQXJyYXkgfCB1bmRlZmluZWQ7XG4gIGxldCBidWZmZXJUb1RlbnNvck9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnMgPz8ge307XG5cbiAgY29uc3QgY3JlYXRlQ2FudmFzID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgT2Zmc2NyZWVuQ2FudmFzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudmFzIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGNyZWF0ZUNhbnZhc0NvbnRleHQgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IE9mZnNjcmVlbkNhbnZhcykgPT4ge1xuICAgIGlmICh0eXBlb2YgSFRNTENhbnZhc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfSBlbHNlIGlmIChjYW52YXMgaW5zdGFuY2VvZiBPZmZzY3JlZW5DYW52YXMpIHtcbiAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgLy8gZmlsbGluZyBhbmQgY2hlY2tpbmcgaW1hZ2UgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gIGlmIChpc0hUTUxJbWFnZUVsZSkge1xuICAgIC8vIEhUTUxJbWFnZUVsZW1lbnQgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgaXMgUkdCQSBieSBkZWZhdWx0XG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyk7XG5cbiAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgIGxldCBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICBsZXQgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkSGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZWRIZWlnaHQ7XG4gICAgICAgIHdpZHRoID0gb3B0aW9ucy5yZXNpemVkV2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgaWYgKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGlucHV0IGNvbmZpZyBmb3JtYXQgbXVzdCBiZSBSR0JBIGZvciBIVE1MSW1hZ2VFbGVtZW50Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLnRlbnNvckZvcm1hdCA9ICdSR0JBJztcbiAgICAgICAgfVxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy50ZW5zb3JGb3JtYXQgPSAnUkdCQSc7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuICAgICAgfVxuXG4gICAgICBwaXhlbHMyRENvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcbiAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ltYWdlRGF0YUVsZSkge1xuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcblxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkV2lkdGggIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRIZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVkSGVpZ2h0O1xuICAgICAgd2lkdGggPSBvcHRpb25zLnJlc2l6ZWRXaWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuZm9ybWF0ID0gJ1JHQkEnO1xuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB0ZW1wQ2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG5cbiAgICAgIHRlbXBDYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KHRlbXBDYW52YXMpO1xuXG4gICAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZSwgMCwgMCk7XG4gICAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGltYWdlLmRhdGE7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzSW1hZ2VCaXRtYXApIHtcbiAgICAvLyBJbWFnZUJpdG1hcCAtIGltYWdlIG9iamVjdCAtIGZvcm1hdCBtdXN0IGJlIHByb3ZpZGVkIGJ5IHVzZXJcbiAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGltYWdlIGNvbmZpZyB3aXRoIGZvcm1hdCBmb3IgSW1hZ2ViaXRtYXAnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMoKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzKTtcblxuICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgY29uc3Qgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgIHBpeGVsczJEQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIHJldHVybiBidWZmZXJUb1RlbnNvcihkYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNTdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXMpO1xuICAgICAgaWYgKCFpbWFnZSB8fCAhY29udGV4dCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgbmV3SW1hZ2UuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJztcbiAgICAgIG5ld0ltYWdlLnNyYyA9IGltYWdlO1xuICAgICAgbmV3SW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjYW52YXMud2lkdGggPSBuZXdJbWFnZS53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IG5ld0ltYWdlLmhlaWdodDtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UobmV3SW1hZ2UsIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGNvbnN0IGltZyA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgcmVzb2x2ZShidWZmZXJUb1RlbnNvcihpbWcuZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgZGF0YSBwcm92aWRlZCBpcyBub3Qgc3VwcG9ydGVkIC0gYWJvcnRlZCB0ZW5zb3IgY3JlYXRpb24nKTtcbiAgfVxuXG4gIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYnVmZmVyVG9UZW5zb3IoZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGRhdGEgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZCAtIGFib3J0ZWQgdGVuc29yIGNyZWF0aW9uJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21UZXh0dXJlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tVGV4dHVyZSA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLlRleHR1cmVEYXRhVHlwZXM+KFxuICB0ZXh0dXJlOiBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGUsXG4gIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcbik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIC8vIEFsd2F5cyBhc3N1bWUgUkdCQUYzMi4gVE9ETzogc3VwcG9ydCBkaWZmZXJlbnQgdGV4dHVyZSBmb3JtYXRcbiAgY29uc3QgZGltcyA9IFsxLCBoZWlnaHQsIHdpZHRoLCA0XTtcbiAgcmV0dXJuIG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ3RleHR1cmUnLCB0eXBlOiAnZmxvYXQzMicsIHRleHR1cmUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcigpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbUdwdUJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gIGdwdUJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlclR5cGUsXG4gIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+LFxuKTogVGVuc29yID0+IHtcbiAgY29uc3QgeyBkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICdncHUtYnVmZmVyJywgdHlwZTogZGF0YVR5cGUgPz8gJ2Zsb2F0MzInLCBncHVCdWZmZXIsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbU1MVGVuc29yKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tTUxUZW5zb3IgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5NTFRlbnNvckRhdGFUeXBlcz4oXG4gIG1sVGVuc29yOiBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JUeXBlLFxuICBvcHRpb25zOiBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zPFQ+LFxuKTogVGVuc29yID0+IHtcbiAgY29uc3QgeyBkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICdtbC10ZW5zb3InLCB0eXBlOiBkYXRhVHlwZSA/PyAnZmxvYXQzMicsIG1sVGVuc29yLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZSB9KTtcbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21QaW5uZWRCdWZmZXIoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21QaW5uZWRCdWZmZXIgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxuICB0eXBlOiBULFxuICBidWZmZXI6IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZU1hcFtUXSxcbiAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuKTogVGVuc29yID0+IG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ2NwdS1waW5uZWQnLCB0eXBlLCBkYXRhOiBidWZmZXIsIGRpbXM6IGRpbXMgPz8gW2J1ZmZlci5sZW5ndGhdIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPVxuICB8IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvcjtcbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXkgPSBJbnN0YW5jZVR5cGU8U3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz47XG5cbi8vIGEgcnVudGltZSBtYXAgdGhhdCBtYXBzIHR5cGUgc3RyaW5nIHRvIFR5cGVkQXJyYXkgY29uc3RydWN0b3IuIFNob3VsZCBtYXRjaCBUZW5zb3IuRGF0YVR5cGVNYXAuXG5leHBvcnQgY29uc3QgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCA9IG5ldyBNYXA8c3RyaW5nLCBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzPihbXG4gIFsnZmxvYXQzMicsIEZsb2F0MzJBcnJheV0sXG4gIFsndWludDgnLCBVaW50OEFycmF5XSxcbiAgWydpbnQ4JywgSW50OEFycmF5XSxcbiAgWyd1aW50MTYnLCBVaW50MTZBcnJheV0sXG4gIFsnaW50MTYnLCBJbnQxNkFycmF5XSxcbiAgWydpbnQzMicsIEludDMyQXJyYXldLFxuICBbJ2Jvb2wnLCBVaW50OEFycmF5XSxcbiAgWydmbG9hdDY0JywgRmxvYXQ2NEFycmF5XSxcbiAgWyd1aW50MzInLCBVaW50MzJBcnJheV0sXG4gIFsnaW50NCcsIFVpbnQ4QXJyYXldLFxuICBbJ3VpbnQ0JywgVWludDhBcnJheV0sXG5dKTtcblxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQID0gbmV3IE1hcDxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLCBUZW5zb3IuVHlwZT4oW1xuICBbRmxvYXQzMkFycmF5LCAnZmxvYXQzMiddLFxuICBbVWludDhBcnJheSwgJ3VpbnQ4J10sXG4gIFtJbnQ4QXJyYXksICdpbnQ4J10sXG4gIFtVaW50MTZBcnJheSwgJ3VpbnQxNiddLFxuICBbSW50MTZBcnJheSwgJ2ludDE2J10sXG4gIFtJbnQzMkFycmF5LCAnaW50MzInXSxcbiAgW0Zsb2F0NjRBcnJheSwgJ2Zsb2F0NjQnXSxcbiAgW1VpbnQzMkFycmF5LCAndWludDMyJ10sXG5dKTtcblxuLy8gdGhlIGZvbGxvd2luZyBjb2RlIGFsbG93cyBkZWxheWluZyBleGVjdXRpb24gb2YgQmlnSW50L0Zsb2F0MTZBcnJheSBjaGVja2luZy4gVGhpcyBhbGxvd3MgbGF6eSBpbml0aWFsaXphdGlvbiBmb3Jcbi8vIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgYW5kIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIHdoaWNoIGFsbG93cyBCaWdJbnQvRmxvYXQxNkFycmF5XG4vLyBwb2x5ZmlsbCBpZiBhdmFpbGFibGUuXG5sZXQgaXNUeXBlZEFycmF5Q2hlY2tlZCA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IGNoZWNrVHlwZWRBcnJheSA9ICgpID0+IHtcbiAgaWYgKCFpc1R5cGVkQXJyYXlDaGVja2VkKSB7XG4gICAgaXNUeXBlZEFycmF5Q2hlY2tlZCA9IHRydWU7XG4gICAgY29uc3QgaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ0ludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEJpZ0ludDY0QXJyYXkuZnJvbTtcbiAgICBjb25zdCBpc0JpZ1VpbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ1VpbnQ2NEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBCaWdVaW50NjRBcnJheS5mcm9tO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiwgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IEZsb2F0MTZBcnJheSA9IChnbG9iYWxUaGlzIGFzIGFueSkuRmxvYXQxNkFycmF5O1xuICAgIGNvbnN0IGlzRmxvYXQxNkFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEZsb2F0MTZBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgRmxvYXQxNkFycmF5LmZyb207XG5cbiAgICBpZiAoaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlKSB7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnaW50NjQnLCBCaWdJbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ0ludDY0QXJyYXksICdpbnQ2NCcpO1xuICAgIH1cbiAgICBpZiAoaXNCaWdVaW50NjRBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ3VpbnQ2NCcsIEJpZ1VpbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ1VpbnQ2NEFycmF5LCAndWludDY0Jyk7XG4gICAgfVxuICAgIGlmIChpc0Zsb2F0MTZBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ2Zsb2F0MTYnLCBGbG9hdDE2QXJyYXkpO1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoRmxvYXQxNkFycmF5LCAnZmxvYXQxNicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBGbG9hdDE2QXJyYXkgaXMgbm90IGF2YWlsYWJsZSwgdXNlICdVaW50MTZBcnJheScgdG8gc3RvcmUgdGhlIGRhdGEuXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnZmxvYXQxNicsIFVpbnQxNkFycmF5KTtcbiAgICB9XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7XG4gIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyxcbiAgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBNTFRlbnNvckNvbnN0cnVjdG9yUGFyYW1ldGVycyxcbiAgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVycyxcbn0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcblxuLyoqXG4gKiBjYWxjdWxhdGUgc2l6ZSBmcm9tIGRpbXMuXG4gKlxuICogQHBhcmFtIGRpbXMgdGhlIGRpbXMgYXJyYXkuIE1heSBiZSBhbiBpbGxlZ2FsIGlucHV0LlxuICovXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlU2l6ZSA9IChkaW1zOiByZWFkb25seSB1bmtub3duW10pOiBudW1iZXIgPT4ge1xuICBsZXQgc2l6ZSA9IDE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGltcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGRpbSA9IGRpbXNbaV07XG4gICAgaWYgKHR5cGVvZiBkaW0gIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNTYWZlSW50ZWdlcihkaW0pKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYW4gaW50ZWdlciwgZ290OiAke2RpbX1gKTtcbiAgICB9XG4gICAgaWYgKGRpbSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290OiAke2RpbX1gKTtcbiAgICB9XG4gICAgc2l6ZSAqPSBkaW07XG4gIH1cbiAgcmV0dXJuIHNpemU7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5yZXNoYXBlKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclJlc2hhcGUgPSAodGVuc29yOiBUZW5zb3IsIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yID0+IHtcbiAgc3dpdGNoICh0ZW5zb3IubG9jYXRpb24pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3IodGVuc29yLnR5cGUsIHRlbnNvci5kYXRhLCBkaW1zKTtcbiAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdjcHUtcGlubmVkJyxcbiAgICAgICAgZGF0YTogdGVuc29yLmRhdGEgYXMgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzWydkYXRhJ10sXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAndGV4dHVyZScsXG4gICAgICAgIHRleHR1cmU6IHRlbnNvci50ZXh0dXJlLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXG4gICAgICAgIGRpbXMsXG4gICAgICB9KTtcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdncHUtYnVmZmVyJyxcbiAgICAgICAgZ3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGNhc2UgJ21sLXRlbnNvcic6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAnbWwtdGVuc29yJyxcbiAgICAgICAgbWxUZW5zb3I6IHRlbnNvci5tbFRlbnNvcixcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRlbnNvclJlc2hhcGU6IHRlbnNvciBsb2NhdGlvbiAke3RlbnNvci5sb2NhdGlvbn0gaXMgbm90IHN1cHBvcnRlZGApO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyB0ZW5zb3JUb0RhdGFVUkwsIHRlbnNvclRvSW1hZ2VEYXRhIH0gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi1pbXBsLmpzJztcbmltcG9ydCB7IFRlbnNvclRvRGF0YVVybE9wdGlvbnMsIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyB9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xuaW1wb3J0IHtcbiAgdGVuc29yRnJvbUdwdUJ1ZmZlcixcbiAgdGVuc29yRnJvbUltYWdlLFxuICB0ZW5zb3JGcm9tTUxUZW5zb3IsXG4gIHRlbnNvckZyb21QaW5uZWRCdWZmZXIsXG4gIHRlbnNvckZyb21UZXh0dXJlLFxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LWltcGwuanMnO1xuaW1wb3J0IHtcbiAgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gIE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucyxcbiAgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucyxcbiAgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLFxuICBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zLFxuICBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnMsXG4gIFRlbnNvckZyb21VcmxPcHRpb25zLFxuICBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7XG4gIGNoZWNrVHlwZWRBcnJheSxcbiAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCxcbiAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCxcbiAgU3VwcG9ydGVkVHlwZWRBcnJheSxcbiAgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyxcbn0gZnJvbSAnLi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcuanMnO1xuaW1wb3J0IHsgY2FsY3VsYXRlU2l6ZSwgdGVuc29yUmVzaGFwZSB9IGZyb20gJy4vdGVuc29yLXV0aWxzLWltcGwuanMnO1xuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckludGVyZmFjZSB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLy8gdHlwZSBhbGlhc2VzIGZvciB0aG9zZSBleHBvcnRlZCBmcm9tIFRlbnNvciBpbnRlcmZhY2VcblxudHlwZSBUZW5zb3JUeXBlID0gVGVuc29ySW50ZXJmYWNlLlR5cGU7XG50eXBlIFRlbnNvckRhdGFUeXBlID0gVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlO1xudHlwZSBUZW5zb3JEYXRhTG9jYXRpb24gPSBUZW5zb3JJbnRlcmZhY2UuRGF0YUxvY2F0aW9uO1xudHlwZSBUZW5zb3JUZXh0dXJlVHlwZSA9IFRlbnNvckludGVyZmFjZS5UZXh0dXJlVHlwZTtcbnR5cGUgVGVuc29yR3B1QnVmZmVyVHlwZSA9IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlO1xudHlwZSBUZW5zb3JNTFRlbnNvclR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JUeXBlO1xuXG4vKipcbiAqIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IgaW50ZXJmYWNlLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNsYXNzIFRlbnNvciBpbXBsZW1lbnRzIFRlbnNvckludGVyZmFjZSB7XG4gIC8vICNyZWdpb24gY29uc3RydWN0b3JzXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgdHlwZTogVGVuc29yVHlwZSxcbiAgICBkYXRhOiBUZW5zb3JEYXRhVHlwZSB8IFVpbnQ4Q2xhbXBlZEFycmF5IHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgQ1BVIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy4gVHlwZSBpcyBpbmZlcnJlZCBmcm9tIGRhdGEuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBkYXRhOiBUZW5zb3JEYXRhVHlwZSB8IFVpbnQ4Q2xhbXBlZEFycmF5IHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBib29sZWFuW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgcGlubmVkIENQVSBkYXRhIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdjcHUtcGlubmVkJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJHTCB0ZXh0dXJlIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICd0ZXh0dXJlJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgV2ViR1BVIGJ1ZmZlciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnZ3B1LWJ1ZmZlcicuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJOTiBNTFRlbnNvciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnbWwtdGVuc29yJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcblxuICAvKipcbiAgICogaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBhcmcwOlxuICAgICAgfCBUZW5zb3JUeXBlXG4gICAgICB8IFRlbnNvckRhdGFUeXBlXG4gICAgICB8IFVpbnQ4Q2xhbXBlZEFycmF5XG4gICAgICB8IHJlYWRvbmx5IHN0cmluZ1tdXG4gICAgICB8IHJlYWRvbmx5IGJvb2xlYW5bXVxuICAgICAgfCBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNcbiAgICAgIHwgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc1xuICAgICAgfCBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnNcbiAgICAgIHwgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gICAgYXJnMT86IFRlbnNvckRhdGFUeXBlIHwgVWludDhDbGFtcGVkQXJyYXkgfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IHN0cmluZ1tdIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxuICAgIGFyZzI/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKSB7XG4gICAgLy8gcGVyZm9ybSBvbmUtdGltZSBjaGVjayBmb3IgQmlnSW50L0Zsb2F0MTZBcnJheSBzdXBwb3J0XG4gICAgY2hlY2tUeXBlZEFycmF5KCk7XG5cbiAgICBsZXQgdHlwZTogVGVuc29yVHlwZTtcbiAgICBsZXQgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdvYmplY3QnICYmICdsb2NhdGlvbicgaW4gYXJnMCkge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3IgZnJvbSBzcGVjaWZpYyBsb2NhdGlvblxuICAgICAgLy9cbiAgICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gYXJnMC5sb2NhdGlvbjtcbiAgICAgIHR5cGUgPSBhcmcwLnR5cGU7XG4gICAgICBkaW1zID0gYXJnMC5kaW1zO1xuICAgICAgc3dpdGNoIChhcmcwLmxvY2F0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOiB7XG4gICAgICAgICAgY29uc3QgZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldCh0eXBlKTtcbiAgICAgICAgICBpZiAoIWV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBwaW5uZWQgYnVmZmVyYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghKGFyZzAuZGF0YSBpbnN0YW5jZW9mIGV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgYnVmZmVyIHNob3VsZCBiZSBvZiB0eXBlICR7ZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IubmFtZX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jcHVEYXRhID0gYXJnMC5kYXRhO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHR1cmUnOiB7XG4gICAgICAgICAgaWYgKHR5cGUgIT09ICdmbG9hdDMyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gdGV4dHVyZWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gYXJnMC50ZXh0dXJlO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XG4gICAgICAgICAgdGhpcy5kaXNwb3NlciA9IGFyZzAuZGlzcG9zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdncHUtYnVmZmVyJzoge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGUgIT09ICdmbG9hdDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Zsb2F0MTYnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50MzInICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50NjQnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ4JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Jvb2wnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDQnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50NCdcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIGdwdSBidWZmZXJgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ncHVCdWZmZXJEYXRhID0gYXJnMC5ncHVCdWZmZXI7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ21sLXRlbnNvcic6IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlICE9PSAnZmxvYXQzMicgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdmbG9hdDE2JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDY0JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQzMicgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50NjQnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50OCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50OCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdib29sJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ0JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDQnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBNTFRlbnNvcmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1sVGVuc29yRGF0YSA9IGFyZzAubWxUZW5zb3I7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUZW5zb3IgY29uc3RydWN0b3I6IHVuc3VwcG9ydGVkIGxvY2F0aW9uICcke3RoaXMuZGF0YUxvY2F0aW9ufSdgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3Igb2YgbG9jYXRpb24gJ2NwdSdcbiAgICAgIC8vXG4gICAgICBsZXQgZGF0YTogVGVuc29yRGF0YVR5cGU7XG4gICAgICBsZXQgbWF5YmVEaW1zOiB0eXBlb2YgYXJnMSB8IHR5cGVvZiBhcmcyO1xuICAgICAgLy8gY2hlY2sgd2hldGhlciBhcmcwIGlzIHR5cGUgb3IgZGF0YVxuICAgICAgaWYgKHR5cGVvZiBhcmcwID09PSAnc3RyaW5nJykge1xuICAgICAgICAvL1xuICAgICAgICAvLyBPdmVycmlkZTogY29uc3RydWN0b3IodHlwZSwgZGF0YSwgLi4uKVxuICAgICAgICAvL1xuICAgICAgICB0eXBlID0gYXJnMDtcbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMjtcbiAgICAgICAgaWYgKGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgLy8gc3RyaW5nIHRlbnNvclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkEgc3RyaW5nIHRlbnNvcidzIGRhdGEgbXVzdCBiZSBhIHN0cmluZyBhcnJheS5cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIGRvbid0IGNoZWNrIHdoZXRoZXIgZXZlcnkgZWxlbWVudCBpbiB0aGUgYXJyYXkgaXMgc3RyaW5nOyB0aGlzIGlzIHRvbyBzbG93LiB3ZSBhc3N1bWUgaXQncyBjb3JyZWN0IGFuZFxuICAgICAgICAgIC8vIGVycm9yIHdpbGwgYmUgcG9wdWxhdGVkIGF0IGluZmVyZW5jZVxuICAgICAgICAgIGRhdGEgPSBhcmcxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG51bWVyaWMgdGVuc29yXG4gICAgICAgICAgY29uc3QgdHlwZWRBcnJheUNvbnN0cnVjdG9yID0gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5nZXQoYXJnMCk7XG4gICAgICAgICAgaWYgKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0ZW5zb3IgdHlwZTogJHthcmcwfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgICAgIGlmICgoYXJnMCA9PT0gJ2Zsb2F0MTYnICYmIHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9PT0gVWludDE2QXJyYXkpIHx8IGFyZzAgPT09ICd1aW50NCcgfHwgYXJnMCA9PT0gJ2ludDQnKSB7XG4gICAgICAgICAgICAgIC8vIC0gJ2Zsb2F0MTYnOlxuICAgICAgICAgICAgICAvLyAgIFdoZW4gbm8gRmxvYXQxNkFycmF5IHBvbHlmaWxsIGlzIHVzZWQsIHdlIGNhbm5vdCBjcmVhdGUgJ2Zsb2F0MTYnIHRlbnNvciBmcm9tIG51bWJlciBhcnJheS5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gICBUaHJvdyBlcnJvciBoZXJlIGJlY2F1c2Ugd2hlbiB1c2VyIHRyeSB0byB1c2UgbnVtYmVyIGFycmF5IGFzIGRhdGEsXG4gICAgICAgICAgICAgIC8vICAgZS5nLiBuZXcgVGVuc29yKCdmbG9hdDE2JywgWzEsIDIsIDMsIDRdLCBkaW1zKSksIGl0IHdpbGwgYWN0dWFsbHkgY2FsbFxuICAgICAgICAgICAgICAvLyAgIFVpbnQxNkFycmF5LmZyb20oYXJnMSkgd2hpY2ggZ2VuZXJhdGVzIHdyb25nIGRhdGEuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIC8vIC0gJ3VpbnQ0JyBhbmQgJ2ludDQnOlxuICAgICAgICAgICAgICAvLyAgIFVpbnQ4QXJyYXkuZnJvbShhcmcxKSB3aWxsIGdlbmVyYXRlIHdyb25nIGRhdGEgZm9yICd1aW50NCcgYW5kICdpbnQ0JyB0ZW5zb3IuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgYENyZWF0aW5nIGEgJHthcmcwfSB0ZW5zb3IgZnJvbSBudW1iZXIgYXJyYXkgaXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIHVzZSAke3R5cGVkQXJyYXlDb25zdHJ1Y3Rvci5uYW1lfSBhcyBkYXRhLmAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZzAgPT09ICd1aW50NjQnIHx8IGFyZzAgPT09ICdpbnQ2NCcpIHtcbiAgICAgICAgICAgICAgLy8gdXNlICdhcyBhbnknIGhlcmUgYmVjYXVzZTpcbiAgICAgICAgICAgICAgLy8gMS4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHR5cGUgb2YgJ0FycmF5LmlzQXJyYXkoKScgZG9lcyBub3Qgd29yayB3aXRoIHJlYWRvbmx5IGFycmF5cy5cbiAgICAgICAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTcwMDJcbiAgICAgICAgICAgICAgLy8gMi4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHVuaW9uIHR5cGUgb2YgJyhCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3J8QmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvcikuZnJvbSgpJ1xuICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBhY2NlcHQgcGFyYW1ldGVyIG1hcEZuLlxuICAgICAgICAgICAgICAvLyAzLiBwYXJhbWV0ZXJzIG9mICdTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLmZyb20oKScgZG9lcyBub3QgbWF0Y2ggdGhlIHJlcXVpcmVtZW50IG9mIHRoZSB1bmlvblxuICAgICAgICAgICAgICAvLyB0eXBlLlxuXG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IGJpZ2ludFtdXCIgaGVyZS5cblxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICBkYXRhID0gKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciBhcyBhbnkpLmZyb20oYXJnMSwgQmlnSW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdXCIgaGVyZS5cbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgZGF0YSA9ICh0eXBlZEFycmF5Q29uc3RydWN0b3IgYXMgYW55KS5mcm9tKGFyZzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMSBpbnN0YW5jZW9mIHR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgZGF0YSA9IGFyZzE7XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcxIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChhcmcwID09PSAndWludDgnKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSBVaW50OEFycmF5LmZyb20oYXJnMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBIFVpbnQ4Q2xhbXBlZEFycmF5IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mIHVpbnQ4YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcwID09PSAnZmxvYXQxNicgJiYgYXJnMSBpbnN0YW5jZW9mIFVpbnQxNkFycmF5ICYmIHR5cGVkQXJyYXlDb25zdHJ1Y3RvciAhPT0gVWludDE2QXJyYXkpIHtcbiAgICAgICAgICAgIC8vIHdoZW4gRmxvYXQxNkFycmF5IGlzIGF2YWlsYWJsZSBhbmQgZGF0YSBpcyBvZiB0eXBlIFVpbnQxNkFycmF5LlxuICAgICAgICAgICAgLy8gV2UgYWxsb3cgVWludDE2QXJyYXkgdG8gYmUgcGFzc2VkIGluIGFzIGRhdGEgZm9yICdmbG9hdDE2JyB0ZW5zb3IgdW50aWwgRmxvYXQxNkFycmF5IGlzIGdlbmVyYWxseVxuICAgICAgICAgICAgLy8gc3VwcG9ydGVkIGluIEphdmFTY3JpcHQgZW52aXJvbm1lbnQuXG5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBkYXRhID0gbmV3IChnbG9iYWxUaGlzIGFzIGFueSkuRmxvYXQxNkFycmF5KGFyZzEuYnVmZmVyLCBhcmcxLmJ5dGVPZmZzZXQsIGFyZzEubGVuZ3RoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQSAke3R5cGV9IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mICR7dHlwZWRBcnJheUNvbnN0cnVjdG9yfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gT3ZlcnJpZGU6IGNvbnN0cnVjdG9yKGRhdGEsIC4uLilcbiAgICAgICAgLy9cbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMCkpIHtcbiAgICAgICAgICAvLyBvbmx5IGJvb2xlYW5bXSBhbmQgc3RyaW5nW10gaXMgc3VwcG9ydGVkXG4gICAgICAgICAgaWYgKGFyZzAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUZW5zb3IgdHlwZSBjYW5ub3QgYmUgaW5mZXJyZWQgZnJvbSBhbiBlbXB0eSBhcnJheS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZmlyc3RFbGVtZW50VHlwZSA9IHR5cGVvZiBhcmcwWzBdO1xuICAgICAgICAgIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdHlwZSA9ICdzdHJpbmcnO1xuICAgICAgICAgICAgZGF0YSA9IGFyZzA7XG4gICAgICAgICAgfSBlbHNlIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnYm9vbCc7XG4gICAgICAgICAgICAvLyAnYXJnMCcgaXMgb2YgdHlwZSAnYm9vbGVhbltdJy4gVWludDhBcnJheS5mcm9tKGJvb2xlYW5bXSkgYWN0dWFsbHkgd29ya3MsIGJ1dCB0eXBlc2NyaXB0IHRoaW5rcyB0aGlzIGlzXG4gICAgICAgICAgICAvLyB3cm9uZyB0eXBlLiBXZSB1c2UgJ2FzIGFueScgdG8gbWFrZSBpdCBoYXBweS5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzAgYXMgYW55W10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGVsZW1lbnQgdHlwZSBvZiBkYXRhIGFycmF5OiAke2ZpcnN0RWxlbWVudFR5cGV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhcmcwIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgICAgICB0eXBlID0gJ3VpbnQ4JztcbiAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGdldCB0ZW5zb3IgdHlwZSBmcm9tIFR5cGVkQXJyYXlcbiAgICAgICAgICBjb25zdCBtYXBwZWRUeXBlID0gTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5nZXQoXG4gICAgICAgICAgICBhcmcwLmNvbnN0cnVjdG9yIGFzIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobWFwcGVkVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0eXBlIGZvciB0ZW5zb3IgZGF0YTogJHthcmcwLmNvbnN0cnVjdG9yfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdHlwZSA9IG1hcHBlZFR5cGU7XG4gICAgICAgICAgZGF0YSA9IGFyZzAgYXMgU3VwcG9ydGVkVHlwZWRBcnJheTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0eXBlIGFuZCBkYXRhIGlzIHByb2Nlc3NlZCwgbm93IHByb2Nlc3NpbmcgZGltc1xuICAgICAgaWYgKG1heWJlRGltcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGFzc3VtZSAxLUQgdGVuc29yIGlmIGRpbXMgb21pdHRlZFxuICAgICAgICBtYXliZURpbXMgPSBbZGF0YS5sZW5ndGhdO1xuICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtYXliZURpbXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBIHRlbnNvcidzIGRpbXMgbXVzdCBiZSBhIG51bWJlciBhcnJheVwiKTtcbiAgICAgIH1cbiAgICAgIGRpbXMgPSBtYXliZURpbXMgYXMgcmVhZG9ubHkgbnVtYmVyW107XG5cbiAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgIH1cblxuICAgIC8vIHBlcmZvcm0gY2hlY2sgb24gZGltc1xuICAgIGNvbnN0IHNpemUgPSBjYWxjdWxhdGVTaXplKGRpbXMpO1xuICAgIC8vIGlmIGRhdGEgaXMgb24gQ1BVLCBjaGVjayB3aGV0aGVyIGRhdGEgbGVuZ3RoIG1hdGNoZXMgdGVuc29yIHNpemVcbiAgICBpZiAodGhpcy5jcHVEYXRhICYmIHNpemUgIT09IHRoaXMuY3B1RGF0YS5sZW5ndGgpIHtcbiAgICAgIGlmICgodHlwZSA9PT0gJ3VpbnQ0JyB8fCB0eXBlID09PSAnaW50NCcpICYmIE1hdGguY2VpbChzaXplIC8gMikgPT09IHRoaXMuY3B1RGF0YS5sZW5ndGgpIHtcbiAgICAgICAgLy8gZm9yICh1KWludDQsIHRoZSBkYXRhIGxlbmd0aCBpcyBoYWxmIG9mIHRoZSB0ZW5zb3Igc2l6ZS4gU28gd2UgY2hlY2sgdGhpcyBzcGVjaWFsIGNhc2Ugd2hlbiBzaXplIGlzIG9kZC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yJ3Mgc2l6ZSgke3NpemV9KSBkb2VzIG5vdCBtYXRjaCBkYXRhIGxlbmd0aCgke3RoaXMuY3B1RGF0YS5sZW5ndGh9KS5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZGltcyA9IGRpbXM7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBmYWN0b3J5XG4gIHN0YXRpYyBhc3luYyBmcm9tSW1hZ2UoXG4gICAgaW1hZ2U6IEltYWdlRGF0YSB8IEhUTUxJbWFnZUVsZW1lbnQgfCBJbWFnZUJpdG1hcCB8IHN0cmluZyxcbiAgICBvcHRpb25zPzpcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnNcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9uc1xuICAgICAgfCBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUZW5zb3JJbnRlcmZhY2U+IHtcbiAgICByZXR1cm4gdGVuc29yRnJvbUltYWdlKGltYWdlLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVGV4dHVyZTxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLlRleHR1cmVEYXRhVHlwZXM+KFxuICAgIHRleHR1cmU6IFRlbnNvclRleHR1cmVUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcbiAgKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbVRleHR1cmUodGV4dHVyZSwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUdwdUJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gICAgZ3B1QnVmZmVyOiBUZW5zb3JHcHVCdWZmZXJUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+LFxuICApOiBUZW5zb3JJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0ZW5zb3JGcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU1MVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JEYXRhVHlwZXM+KFxuICAgIG1sVGVuc29yOiBUZW5zb3JNTFRlbnNvclR5cGUsXG4gICAgb3B0aW9uczogVGVuc29yRnJvbU1MVGVuc29yT3B0aW9uczxUPixcbiAgKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbU1MVGVuc29yKG1sVGVuc29yLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUGlubmVkQnVmZmVyPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuQ3B1UGlubmVkRGF0YVR5cGVzPihcbiAgICB0eXBlOiBULFxuICAgIGJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlTWFwW1RdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTogVGVuc29yIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbVBpbm5lZEJ1ZmZlcih0eXBlLCBidWZmZXIsIGRpbXMpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gY29udmVyc2lvbnNcbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGVuc29yVG9EYXRhVVJMKHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YSB7XG4gICAgcmV0dXJuIHRlbnNvclRvSW1hZ2VEYXRhKHRoaXMsIG9wdGlvbnMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHB1YmxpYyBmaWVsZHNcbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG4gIHJlYWRvbmx5IHR5cGU6IFRlbnNvclR5cGU7XG4gIHJlYWRvbmx5IHNpemU6IG51bWJlcjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHJpdmF0ZSBmaWVsZHNcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgZGF0YUxvY2F0aW9uOiBUZW5zb3JEYXRhTG9jYXRpb247XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgZGF0YSBvbiBDUFUsIGlmIGxvY2F0aW9uIGlzICdjcHUnIG9yICdjcHUtcGlubmVkJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBjcHVEYXRhPzogVGVuc29yRGF0YVR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyB0ZXh0dXJlIHdoZW4gbG9jYXRpb24gaXMgJ3RleHR1cmUnLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGdwdVRleHR1cmVEYXRhPzogVGVuc29yVGV4dHVyZVR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyBHUFUgYnVmZmVyIHdoZW4gbG9jYXRpb24gaXMgJ2dwdS1idWZmZXInLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGdwdUJ1ZmZlckRhdGE/OiBUZW5zb3JHcHVCdWZmZXJUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgV2ViTk4gTUxUZW5zb3Igd2hlbiBsb2NhdGlvbiBpcyAnbWwtdGVuc29yJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBtbFRlbnNvckRhdGE/OiBUZW5zb3JNTFRlbnNvclR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkb3dubG9hZGVyIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxuICAgKi9cbiAgcHJpdmF0ZSBkb3dubG9hZGVyPygpOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPjtcblxuICAvKipcbiAgICogYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0aGUgZGF0YSBpcyBiZWluZyBkb3dubG9hZGVkIGZyb20gR1BVIHRvIENQVS5cbiAgICovXG4gIHByaXZhdGUgaXNEb3dubG9hZGluZz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkaXNwb3NlciBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB1bmRlcmx5aW5nIGRhdGEuXG4gICAqL1xuICBwcml2YXRlIGRpc3Bvc2VyPygpOiB2b2lkO1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9wZXJ0aWVzXG4gIGdldCBkYXRhKCk6IFRlbnNvckRhdGFUeXBlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKCF0aGlzLmNwdURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSBkYXRhIGlzIG5vdCBvbiBDUFUuIFVzZSBgZ2V0RGF0YSgpYCB0byBkb3dubG9hZCBHUFUgZGF0YSB0byBDUFUsICcgK1xuICAgICAgICAgICdvciB1c2UgYHRleHR1cmVgIG9yIGBncHVCdWZmZXJgIHByb3BlcnR5IHRvIGFjY2VzcyB0aGUgR1BVIGRhdGEgZGlyZWN0bHkuJyxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNwdURhdGE7XG4gIH1cblxuICBnZXQgbG9jYXRpb24oKTogVGVuc29yRGF0YUxvY2F0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhTG9jYXRpb247XG4gIH1cblxuICBnZXQgdGV4dHVyZSgpOiBUZW5zb3JUZXh0dXJlVHlwZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICghdGhpcy5ncHVUZXh0dXJlRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR0wgdGV4dHVyZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1VGV4dHVyZURhdGE7XG4gIH1cblxuICBnZXQgZ3B1QnVmZmVyKCk6IFRlbnNvckdwdUJ1ZmZlclR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuZ3B1QnVmZmVyRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR1BVIGJ1ZmZlci4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1QnVmZmVyRGF0YTtcbiAgfVxuXG4gIGdldCBtbFRlbnNvcigpOiBUZW5zb3JNTFRlbnNvclR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMubWxUZW5zb3JEYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBkYXRhIGlzIG5vdCBzdG9yZWQgYXMgYSBXZWJOTiBNTFRlbnNvci4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWxUZW5zb3JEYXRhO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG1ldGhvZHNcblxuICBhc3luYyBnZXREYXRhKHJlbGVhc2VEYXRhPzogYm9vbGVhbik6IFByb21pc2U8VGVuc29yRGF0YVR5cGU+IHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgc3dpdGNoICh0aGlzLmRhdGFMb2NhdGlvbikge1xuICAgICAgY2FzZSAnY3B1JzpcbiAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIGNhc2UgJ21sLXRlbnNvcic6IHtcbiAgICAgICAgaWYgKCF0aGlzLmRvd25sb2FkZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBub3QgY3JlYXRlZCB3aXRoIGEgc3BlY2lmaWVkIGRhdGEgZG93bmxvYWRlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgYmVpbmcgZG93bmxvYWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZG93bmxvYWRlcigpO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgICAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG5cbiAgICAgICAgICBpZiAocmVsZWFzZURhdGEgJiYgdGhpcy5kaXNwb3Nlcikge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlcigpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZ2V0IGRhdGEgZnJvbSBsb2NhdGlvbjogJHt0aGlzLmRhdGFMb2NhdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRG93bmxvYWRpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgIHRoaXMuZGlzcG9zZXIoKTtcbiAgICAgIHRoaXMuZGlzcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuY3B1RGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1sVGVuc29yRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRvd25sb2FkZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnbm9uZSc7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB0ZW5zb3IgdXRpbGl0aWVzXG4gIHByaXZhdGUgZW5zdXJlVmFsaWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YUxvY2F0aW9uID09PSAnbm9uZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRlbnNvciBpcyBkaXNwb3NlZC4nKTtcbiAgICB9XG4gIH1cblxuICByZXNoYXBlKGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKHRoaXMuZG93bmxvYWRlciB8fCB0aGlzLmRpc3Bvc2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZXNoYXBlIGEgdGVuc29yIHRoYXQgb3ducyBHUFUgcmVzb3VyY2UuJyk7XG4gICAgfVxuICAgIHJldHVybiB0ZW5zb3JSZXNoYXBlKHRoaXMsIGRpbXMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yRmFjdG9yeSB9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckltcGwgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7IFR5cGVkVGVuc29yVXRpbHMgfSBmcm9tICcuL3RlbnNvci11dGlscy5qcyc7XG5pbXBvcnQgeyBUcnlHZXRHbG9iYWxUeXBlIH0gZnJvbSAnLi90eXBlLWhlbHBlci5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuLyoqXG4gKiByZXByZXNlbnQgYSBiYXNpYyB0ZW5zb3Igd2l0aCBzcGVjaWZpZWQgZGltZW5zaW9ucyBhbmQgZGF0YSB0eXBlLlxuICovXG5pbnRlcmZhY2UgVHlwZWRUZW5zb3JCYXNlPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xuICAvKipcbiAgICogR2V0IHRoZSBkaW1lbnNpb25zIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSB0eXBlOiBUO1xuICAvKipcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gQ1BVIChlZy4gaXQncyBpbiB0aGUgZm9ybSBvZiBXZWJHTCB0ZXh0dXJlIG9yIFdlYkdQVSBidWZmZXIpLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbjtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR0wgdGV4dHVyZSB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHTCB0ZXh0dXJlLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR1BVIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHUFUgYnVmZmVyLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGdwdUJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGU7XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViTk4gTUxUZW5zb3IgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBpbiBhIFdlYk5OIE1MVGVuc29yLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IG1sVGVuc29yOiBUZW5zb3IuTUxUZW5zb3JUeXBlO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJ1ZmZlciBkYXRhIG9mIHRoZSB0ZW5zb3IuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIENQVSwgcmV0dXJucyB0aGUgZGF0YSBpbW1lZGlhdGVseS5cbiAgICogSWYgdGhlIGRhdGEgaXMgb24gR1BVLCBkb3dubG9hZHMgdGhlIGRhdGEgYW5kIHJldHVybnMgdGhlIHByb21pc2UuXG4gICAqXG4gICAqIEBwYXJhbSByZWxlYXNlRGF0YSAtIHdoZXRoZXIgcmVsZWFzZSB0aGUgZGF0YSBvbiBHUFUuIElnbm9yZSBpZiBkYXRhIGlzIGFscmVhZHkgb24gQ1BVLlxuICAgKi9cbiAgZ2V0RGF0YShyZWxlYXNlRGF0YT86IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvci5EYXRhVHlwZU1hcFtUXT47XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRlbnNvciBkYXRhLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBDUFUsIHJlbW92ZSBpdHMgaW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGRhdGEuXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIEdQVSwgcmVsZWFzZSB0aGUgZGF0YSBvbiBHUFUuXG4gICAqXG4gICAqIEFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiwgdGhlIHRlbnNvciBpcyBjb25zaWRlcmVkIG5vIGxvbmdlciB2YWxpZC4gSXRzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdub25lJy5cbiAgICovXG4gIGRpc3Bvc2UoKTogdm9pZDtcbn1cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFRlbnNvciB7XG4gIGludGVyZmFjZSBEYXRhVHlwZU1hcCB7XG4gICAgZmxvYXQzMjogRmxvYXQzMkFycmF5O1xuICAgIHVpbnQ4OiBVaW50OEFycmF5O1xuICAgIGludDg6IEludDhBcnJheTtcbiAgICB1aW50MTY6IFVpbnQxNkFycmF5O1xuICAgIGludDE2OiBJbnQxNkFycmF5O1xuICAgIGludDMyOiBJbnQzMkFycmF5O1xuICAgIGludDY0OiBCaWdJbnQ2NEFycmF5O1xuICAgIHN0cmluZzogc3RyaW5nW107XG4gICAgYm9vbDogVWludDhBcnJheTtcbiAgICBmbG9hdDE2OiBVaW50MTZBcnJheTsgLy8gS2VlcCB1c2luZyBVaW50MTZBcnJheSB1bnRpbCB3ZSBoYXZlIGEgY29uY3JldGUgc29sdXRpb24gZm9yIGZsb2F0IDE2LlxuICAgIGZsb2F0NjQ6IEZsb2F0NjRBcnJheTtcbiAgICB1aW50MzI6IFVpbnQzMkFycmF5O1xuICAgIHVpbnQ2NDogQmlnVWludDY0QXJyYXk7XG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XG4gICAgdWludDQ6IFVpbnQ4QXJyYXk7XG4gICAgaW50NDogSW50OEFycmF5O1xuICB9XG5cbiAgaW50ZXJmYWNlIEVsZW1lbnRUeXBlTWFwIHtcbiAgICBmbG9hdDMyOiBudW1iZXI7XG4gICAgdWludDg6IG51bWJlcjtcbiAgICBpbnQ4OiBudW1iZXI7XG4gICAgdWludDE2OiBudW1iZXI7XG4gICAgaW50MTY6IG51bWJlcjtcbiAgICBpbnQzMjogbnVtYmVyO1xuICAgIGludDY0OiBiaWdpbnQ7XG4gICAgc3RyaW5nOiBzdHJpbmc7XG4gICAgYm9vbDogYm9vbGVhbjtcbiAgICBmbG9hdDE2OiBudW1iZXI7IC8vIEtlZXAgdXNpbmcgVWludDE2QXJyYXkgdW50aWwgd2UgaGF2ZSBhIGNvbmNyZXRlIHNvbHV0aW9uIGZvciBmbG9hdCAxNi5cbiAgICBmbG9hdDY0OiBudW1iZXI7XG4gICAgdWludDMyOiBudW1iZXI7XG4gICAgdWludDY0OiBiaWdpbnQ7XG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XG4gICAgdWludDQ6IG51bWJlcjtcbiAgICBpbnQ0OiBudW1iZXI7XG4gIH1cblxuICB0eXBlIERhdGFUeXBlID0gRGF0YVR5cGVNYXBbVHlwZV07XG4gIHR5cGUgRWxlbWVudFR5cGUgPSBFbGVtZW50VHlwZU1hcFtUeXBlXTtcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgcGlubmVkIENQVSBidWZmZXJcbiAgICovXG4gIGV4cG9ydCB0eXBlIENwdVBpbm5lZERhdGFUeXBlcyA9IEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPjtcblxuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR0wgdGV4dHVyZVxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVGV4dHVyZVR5cGUgPSBXZWJHTFRleHR1cmU7XG5cbiAgLyoqXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcbiAgICovXG4gIGV4cG9ydCB0eXBlIFRleHR1cmVEYXRhVHlwZXMgPSAnZmxvYXQzMic7XG5cbiAgdHlwZSBHcHVCdWZmZXJUeXBlRmFsbGJhY2sgPSB7IHNpemU6IG51bWJlcjsgbWFwU3RhdGU6ICd1bm1hcHBlZCcgfCAncGVuZGluZycgfCAnbWFwcGVkJyB9O1xuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR1BVIGJ1ZmZlclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgR3B1QnVmZmVyVHlwZSA9IFRyeUdldEdsb2JhbFR5cGU8J0dQVUJ1ZmZlcicsIEdwdUJ1ZmZlclR5cGVGYWxsYmFjaz47XG5cbiAgdHlwZSBNTFRlbnNvclR5cGVGYWxsYmFjayA9IHsgZGVzdHJveSgpOiB2b2lkIH07XG4gIC8qKlxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJOTiBNTFRlbnNvclxuICAgKlxuICAgKiBUaGUgc3BlY2lmaWNhdGlvbiBmb3IgV2ViTk4ncyBNTFRlbnNvciBpcyBjdXJyZW50bHkgaW4gZmx1eC5cbiAgICovXG4gIGV4cG9ydCB0eXBlIE1MVGVuc29yVHlwZSA9IFRyeUdldEdsb2JhbFR5cGU8J01MVGVuc29yJywgTUxUZW5zb3JUeXBlRmFsbGJhY2s+O1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXG4gICAqL1xuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJEYXRhVHlwZXMgPSAnZmxvYXQzMicgfCAnZmxvYXQxNicgfCAnaW50MzInIHwgJ2ludDY0JyB8ICd1aW50MzInIHwgJ3VpbnQ4JyB8ICdib29sJztcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViTk4gTUxUZW5zb3JcbiAgICovXG4gIGV4cG9ydCB0eXBlIE1MVGVuc29yRGF0YVR5cGVzID1cbiAgICB8ICdmbG9hdDMyJ1xuICAgIHwgJ2Zsb2F0MTYnXG4gICAgfCAnaW50OCdcbiAgICB8ICd1aW50OCdcbiAgICB8ICdpbnQzMidcbiAgICB8ICd1aW50MzInXG4gICAgfCAnaW50NjQnXG4gICAgfCAndWludDY0J1xuICAgIHwgJ2Jvb2wnXG4gICAgfCAndWludDQnXG4gICAgfCAnaW50NCc7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB3aGVyZSB0aGUgdGVuc29yIGRhdGEgaXMgc3RvcmVkXG4gICAqL1xuICBleHBvcnQgdHlwZSBEYXRhTG9jYXRpb24gPSAnbm9uZScgfCAnY3B1JyB8ICdjcHUtcGlubmVkJyB8ICd0ZXh0dXJlJyB8ICdncHUtYnVmZmVyJyB8ICdtbC10ZW5zb3InO1xuXG4gIC8qKlxuICAgKiByZXByZXNlbnQgdGhlIGRhdGEgdHlwZSBvZiBhIHRlbnNvclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVHlwZSA9IGtleW9mIERhdGFUeXBlTWFwO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBtdWx0aS1kaW1lbnNpb25hbCBhcnJheXMgdG8gZmVlZCB0byBvciBmZXRjaCBmcm9tIG1vZGVsIGluZmVyZW5jaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVkVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4gZXh0ZW5kcyBUeXBlZFRlbnNvckJhc2U8VD4sIFR5cGVkVGVuc29yVXRpbHM8VD4ge31cbi8qKlxuICogUmVwcmVzZW50IG11bHRpLWRpbWVuc2lvbmFsIGFycmF5cyB0byBmZWVkIHRvIG9yIGZldGNoIGZyb20gbW9kZWwgaW5mZXJlbmNpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yIGV4dGVuZHMgVHlwZWRUZW5zb3JCYXNlPFRlbnNvci5UeXBlPiwgVHlwZWRUZW5zb3JVdGlsczxUZW5zb3IuVHlwZT4ge31cblxuLyoqXG4gKiB0eXBlIFRlbnNvckNvbnN0cnVjdG9yIGRlZmluZXMgdGhlIGNvbnN0cnVjdG9ycyBvZiAnVGVuc29yJyB0byBjcmVhdGUgQ1BVIHRlbnNvciBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yQ29uc3RydWN0b3IgZXh0ZW5kcyBUZW5zb3JGYWN0b3J5IHtcbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gc3BlY2lmeSBlbGVtZW50IHR5cGVcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ3N0cmluZyddIHwgcmVhZG9ubHkgc3RyaW5nW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoXG4gICAgdHlwZTogJ2Jvb2wnLFxuICAgIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFsnYm9vbCddIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSBhIFVpbnQ4Q2xhbXBlZEFycmF5LCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3ICh0eXBlOiAndWludDgnLCBkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyA2NC1iaXQgaW50ZWdlciB0eXBlZCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgPFQgZXh0ZW5kcyAndWludDY0JyB8ICdpbnQ2NCc+KFxuICAgIHR5cGU6IFQsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgYmlnaW50W10gfCByZWFkb25seSBudW1iZXJbXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgbnVtZXJpYyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgPFQgZXh0ZW5kcyBFeGNsdWRlPFRlbnNvci5UeXBlLCAnc3RyaW5nJyB8ICdib29sJyB8ICd1aW50NjQnIHwgJ2ludDY0Jz4+KFxuICAgIHR5cGU6IFQsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgbnVtYmVyW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUeXBlZFRlbnNvcjxUPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGluZmVyIGVsZW1lbnQgdHlwZXNcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEZsb2F0MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBVaW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MTYgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IFVpbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogSW50MTZBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogSW50MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogQmlnSW50NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IHJlYWRvbmx5IHN0cmluZ1tdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiByZWFkb25seSBib29sZWFuW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdib29sJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBmbG9hdDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBGbG9hdDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdmbG9hdDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IFVpbnQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEJpZ1VpbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDY0Jz47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGZhbGwgYmFjayB0byBub24tZ2VuZXJpYyB0ZW5zb3IgdHlwZSBkZWNsYXJhdGlvblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChcbiAgICB0eXBlOiBUZW5zb3IuVHlwZSxcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGUgfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IHN0cmluZ1tdIHwgcmVhZG9ubHkgYmlnaW50W10gfCByZWFkb25seSBib29sZWFuW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUZW5zb3I7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogVGVuc29yLkRhdGFUeXBlLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3I7XG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IFRlbnNvciA9IFRlbnNvckltcGwgYXMgVGVuc29yQ29uc3RydWN0b3I7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGVudiB9IGZyb20gJy4vZW52LWltcGwuanMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFID0gKGRldmljZVR5cGU6IHN0cmluZywgbGFiZWw6IHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUudGltZVN0YW1wKGAke2RldmljZVR5cGV9OjpPUlQ6OiR7bGFiZWx9YCk7XG59O1xuXG5jb25zdCBUUkFDRV9GVU5DID0gKG1zZzogc3RyaW5nLCBleHRyYU1zZz86IHN0cmluZykgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdCgvXFxyXFxufFxccnxcXG4vZykgfHwgW107XG4gIGxldCBoYXNUcmFjZUZ1bmMgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgIGlmIChoYXNUcmFjZUZ1bmMgJiYgIXN0YWNrW2ldLmluY2x1ZGVzKCdUUkFDRV9GVU5DJykpIHtcbiAgICAgIGxldCBsYWJlbCA9IGBGVU5DXyR7bXNnfTo6JHtzdGFja1tpXS50cmltKCkuc3BsaXQoJyAnKVsxXX1gO1xuICAgICAgaWYgKGV4dHJhTXNnKSB7XG4gICAgICAgIGxhYmVsICs9IGA6OiR7ZXh0cmFNc2d9YDtcbiAgICAgIH1cbiAgICAgIFRSQUNFKCdDUFUnLCBsYWJlbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdGFja1tpXS5pbmNsdWRlcygnVFJBQ0VfRlVOQycpKSB7XG4gICAgICBoYXNUcmFjZUZ1bmMgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9GVU5DX0JFR0lOID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnQkVHSU4nLCBleHRyYU1zZyk7XG59O1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFX0ZVTkNfRU5EID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnRU5EJywgZXh0cmFNc2cpO1xufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9FVkVOVF9CRUdJTiA9IChleHRyYU1zZz86IHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUudGltZShgT1JUOjoke2V4dHJhTXNnfWApO1xufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9FVkVOVF9FTkQgPSAoZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcbiAgaWYgKHR5cGVvZiBlbnYudHJhY2UgPT09ICd1bmRlZmluZWQnID8gIWVudi53YXNtLnRyYWNlIDogIWVudi50cmFjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICBjb25zb2xlLnRpbWVFbmQoYE9SVDo6JHtleHRyYU1zZ31gKTtcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzIH0gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQgeyBPbm54VmFsdWUgfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuaW1wb3J0IHsgVFJBQ0VfRlVOQ19CRUdJTiwgVFJBQ0VfRlVOQ19FTkQsIFRSQUNFX0VWRU5UX0JFR0lOLCBUUkFDRV9FVkVOVF9FTkQgfSBmcm9tICcuL3RyYWNlLmpzJztcblxudHlwZSBTZXNzaW9uT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuU2Vzc2lvbk9wdGlvbnM7XG50eXBlIFJ1bk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlJ1bk9wdGlvbnM7XG50eXBlIEZlZWRzVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuRmVlZHNUeXBlO1xudHlwZSBGZXRjaGVzVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuRmV0Y2hlc1R5cGU7XG50eXBlIFJldHVyblR5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlJldHVyblR5cGU7XG5cbmV4cG9ydCBjbGFzcyBJbmZlcmVuY2VTZXNzaW9uIGltcGxlbWVudHMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoaGFuZGxlcjogSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICB9XG4gIHJ1bihmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIHJ1bihmZWVkczogRmVlZHNUeXBlLCBmZXRjaGVzOiBGZXRjaGVzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBhc3luYyBydW4oZmVlZHM6IEZlZWRzVHlwZSwgYXJnMT86IEZldGNoZXNUeXBlIHwgUnVuT3B0aW9ucywgYXJnMj86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+IHtcbiAgICBUUkFDRV9GVU5DX0JFR0lOKCk7XG4gICAgVFJBQ0VfRVZFTlRfQkVHSU4oJ0luZmVyZW5jZVNlc3Npb24ucnVuJyk7XG4gICAgY29uc3QgZmV0Y2hlczogeyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIHwgbnVsbCB9ID0ge307XG4gICAgbGV0IG9wdGlvbnM6IFJ1bk9wdGlvbnMgPSB7fTtcbiAgICAvLyBjaGVjayBpbnB1dHNcbiAgICBpZiAodHlwZW9mIGZlZWRzICE9PSAnb2JqZWN0JyB8fCBmZWVkcyA9PT0gbnVsbCB8fCBmZWVkcyBpbnN0YW5jZW9mIFRlbnNvciB8fCBBcnJheS5pc0FycmF5KGZlZWRzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgXCInZmVlZHMnIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgdXNlIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cIixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmV0Y2hlc0VtcHR5ID0gdHJ1ZTtcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggb3ZlcnJpZGUgaXMgYmVpbmcgdXNlZFxuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChhcmcxID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZzEgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidmZXRjaGVzJyBjYW5ub3QgYmUgYSBUZW5zb3JcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgIGlmIChhcmcxLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZmV0Y2hlcycgY2Fubm90IGJlIGFuIGVtcHR5IGFycmF5LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAvLyBvdXRwdXQgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGFyZzEpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2ZldGNoZXMnIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkgb3IgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMub3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnZmV0Y2hlcycgY29udGFpbnMgaW52YWxpZCBvdXRwdXQgbmFtZTogJHtuYW1lfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVjaWRlIHdoZXRoZXIgYXJnMSBpcyBmZXRjaGVzIG9yIG9wdGlvbnNcbiAgICAgICAgLy8gaWYgYW55IG91dHB1dCBuYW1lIGlzIHByZXNlbnQgYW5kIGl0cyB2YWx1ZSBpcyB2YWxpZCBPbm54VmFsdWUsIHdlIGNvbnNpZGVyIGl0IGZldGNoZXNcbiAgICAgICAgbGV0IGlzRmV0Y2hlcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBhcmcxS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZzEpO1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xuICAgICAgICAgIGlmIChhcmcxS2V5cy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdiA9IChhcmcxIGFzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlKVtuYW1lXTtcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsIHx8IHYgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRmV0Y2hlcykge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMSBhcyBSdW5PcHRpb25zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBtdXN0IGJlICdmZXRjaGVzJyBvciAnb3B0aW9ucycuXCIpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dHMgYXJlIGluIGZlZWRcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5pbnB1dE5hbWVzKSB7XG4gICAgICBpZiAodHlwZW9mIGZlZWRzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlucHV0ICcke25hbWV9JyBpcyBtaXNzaW5nIGluICdmZWVkcycuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxuICAgIGlmIChpc0ZldGNoZXNFbXB0eSkge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMub3V0cHV0TmFtZXMpIHtcbiAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMgYXJlIHByZXBhcmVkXG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bihmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcmVzdWx0cykge1xuICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdHMsIGtleSkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1trZXldO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gbmV3IFRlbnNvcihyZXN1bHQudHlwZSwgcmVzdWx0LmRhdGEsIHJlc3VsdC5kaW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBUUkFDRV9FVkVOVF9FTkQoJ0luZmVyZW5jZVNlc3Npb24ucnVuJyk7XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICBhc3luYyByZWxlYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoXG4gICAgYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsXG4gICAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICAgIGJ5dGVMZW5ndGg/OiBudW1iZXIsXG4gICAgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPjtcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShcbiAgICBhcmcwOiBzdHJpbmcgfCBBcnJheUJ1ZmZlckxpa2UgfCBVaW50OEFycmF5LFxuICAgIGFyZzE/OiBTZXNzaW9uT3B0aW9ucyB8IG51bWJlcixcbiAgICBhcmcyPzogbnVtYmVyLFxuICAgIGFyZzM/OiBTZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCdJbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZScpO1xuICAgIC8vIGVpdGhlciBsb2FkIGZyb20gYSBmaWxlIG9yIGJ1ZmZlclxuICAgIGxldCBmaWxlUGF0aE9yVWludDhBcnJheTogc3RyaW5nIHwgVWludDhBcnJheTtcbiAgICBsZXQgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMgPSB7fTtcblxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXJnMCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBhcmcwIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcbiAgICAgICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGFyZzAgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcilcbiAgICApIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGFyZzA7XG4gICAgICBsZXQgYnl0ZU9mZnNldCA9IDA7XG4gICAgICBsZXQgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGJ5dGVPZmZzZXQgPSBhcmcxO1xuICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVPZmZzZXQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCInYnl0ZU9mZnNldCcgbXVzdCBiZSBhbiBpbnRlZ2VyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYnl0ZU9mZnNldCA+PSBidWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZU9mZnNldCcgaXMgb3V0IG9mIHJhbmdlIFswLCAke2J1ZmZlci5ieXRlTGVuZ3RofSkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXQ7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBieXRlTGVuZ3RoID0gYXJnMjtcbiAgICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVMZW5ndGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIidieXRlTGVuZ3RoJyBtdXN0IGJlIGFuIGludGVnZXIuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYnl0ZUxlbmd0aCA8PSAwIHx8IGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoID4gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZUxlbmd0aCcgaXMgb3V0IG9mIHJhbmdlICgwLCAke2J1ZmZlci5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldH1dLmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzMgPT09ICdvYmplY3QnICYmIGFyZzMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmczO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidieXRlTGVuZ3RoJyBtdXN0IGJlIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICB9XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIGFyZ3VtZW50WzBdOiBtdXN0IGJlICdwYXRoJyBvciAnYnVmZmVyJy5cIik7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBiYWNrZW5kLCB1cGRhdGUgc2Vzc2lvbiBvcHRpb25zIHdpdGggdmFsaWRhdGVkIEVQcywgYW5kIGNyZWF0ZSBzZXNzaW9uIGhhbmRsZXJcbiAgICBjb25zdCBbYmFja2VuZCwgb3B0aW9uc1dpdGhWYWxpZGF0ZWRFUHNdID0gYXdhaXQgcmVzb2x2ZUJhY2tlbmRBbmRFeGVjdXRpb25Qcm92aWRlcnMob3B0aW9ucyk7XG4gICAgY29uc3QgaGFuZGxlciA9IGF3YWl0IGJhY2tlbmQuY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoZmlsZVBhdGhPclVpbnQ4QXJyYXksIG9wdGlvbnNXaXRoVmFsaWRhdGVkRVBzKTtcbiAgICBUUkFDRV9FVkVOVF9FTkQoJ0luZmVyZW5jZVNlc3Npb24uY3JlYXRlJyk7XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgICByZXR1cm4gbmV3IEluZmVyZW5jZVNlc3Npb24oaGFuZGxlcik7XG4gIH1cblxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZXIuc3RhcnRQcm9maWxpbmcoKTtcbiAgfVxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVyLmVuZFByb2ZpbGluZygpO1xuICB9XG5cbiAgZ2V0IGlucHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuaW5wdXROYW1lcztcbiAgfVxuICBnZXQgb3V0cHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIub3V0cHV0TmFtZXM7XG4gIH1cblxuICBnZXQgaW5wdXRNZXRhZGF0YSgpOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlZhbHVlTWV0YWRhdGFbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE1ldGFkYXRhO1xuICB9XG5cbiAgZ2V0IG91dHB1dE1ldGFkYXRhKCk6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuVmFsdWVNZXRhZGF0YVtdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLm91dHB1dE1ldGFkYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVyOiBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcjtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW1wbCB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24taW1wbC5qcyc7XG5pbXBvcnQgeyBPbm54TW9kZWxPcHRpb25zIH0gZnJvbSAnLi9vbm54LW1vZGVsLmpzJztcbmltcG9ydCB7IE9ubnhWYWx1ZSwgT25ueFZhbHVlRGF0YUxvY2F0aW9uIH0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB0eXBlIHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuaW1wb3J0IHsgVHJ5R2V0R2xvYmFsVHlwZSB9IGZyb20gJy4vdHlwZS1oZWxwZXIuanMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBpbnB1dC9vdXRwdXQgdHlwZXNcblxuICB0eXBlIE9ubnhWYWx1ZU1hcFR5cGUgPSB7IHJlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfTtcbiAgdHlwZSBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUgPSB7IHJlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH07XG5cbiAgLyoqXG4gICAqIEEgZmVlZHMgKG1vZGVsIGlucHV0cykgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqL1xuICB0eXBlIEZlZWRzVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLyoqXG4gICAqIEEgZmV0Y2hlcyAobW9kZWwgb3V0cHV0cykgY291bGQgYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAqXG4gICAqIC0gT21pdHRlZC4gVXNlIG1vZGVsJ3Mgb3V0cHV0IG5hbWVzIGRlZmluaXRpb24uXG4gICAqIC0gQW4gYXJyYXkgb2Ygc3RyaW5nIGluZGljYXRpbmcgdGhlIG91dHB1dCBuYW1lcy5cbiAgICogLSBBbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBvciBudWxsIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKlxuICAgKiBAcmVtYXJrXG4gICAqIGRpZmZlcmVudCBmcm9tIGlucHV0IGFyZ3VtZW50LCBpbiBvdXRwdXQsIE9ubnhWYWx1ZSBpcyBvcHRpb25hbC4gSWYgYW4gT25ueFZhbHVlIGlzIHByZXNlbnQgaXQgd2lsbCBiZVxuICAgKiB1c2VkIGFzIGEgcHJlLWFsbG9jYXRlZCB2YWx1ZSBieSB0aGUgaW5mZXJlbmNlIGVuZ2luZTsgaWYgb21pdHRlZCwgaW5mZXJlbmNlIGVuZ2luZSB3aWxsIGFsbG9jYXRlIGJ1ZmZlclxuICAgKiBpbnRlcm5hbGx5LlxuICAgKi9cbiAgdHlwZSBGZXRjaGVzVHlwZSA9IHJlYWRvbmx5IHN0cmluZ1tdIHwgTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlO1xuXG4gIC8qKlxuICAgKiBBIGluZmVyZW5jaW5nIHJldHVybiB0eXBlIGlzIGFuIG9iamVjdCB0aGF0IHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHR5cGUgUmV0dXJuVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gc2Vzc2lvbiBvcHRpb25zXG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIGNvbmZpZ3VyYXRpb25zIGZvciBzZXNzaW9uIGJlaGF2aW9yLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uT3B0aW9ucyBleHRlbmRzIE9ubnhNb2RlbE9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGV4ZWN1dGlvbiBwcm92aWRlciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQW4gZXhlY3V0aW9uIHByb3ZpZGVyIG9wdGlvbiBjYW4gYmUgYSBzdHJpbmcgaW5kaWNhdGluZyB0aGUgbmFtZSBvZiB0aGUgZXhlY3V0aW9uIHByb3ZpZGVyLFxuICAgICAqIG9yIGFuIG9iamVjdCBvZiBjb3JyZXNwb25kaW5nIHR5cGUuXG4gICAgICovXG4gICAgZXhlY3V0aW9uUHJvdmlkZXJzPzogcmVhZG9ubHkgRXhlY3V0aW9uUHJvdmlkZXJDb25maWdbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRyYSBPUCB0aHJlYWRzIG51bWJlci5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIGludHJhT3BOdW1UaHJlYWRzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGludGVyIE9QIHRocmVhZHMgbnVtYmVyLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgaW50ZXJPcE51bVRocmVhZHM/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZnJlZURpbWVuc2lvbk92ZXJyaWRlcz86IHsgcmVhZG9ubHkgW2RpbWVuc2lvbk5hbWU6IHN0cmluZ106IG51bWJlciB9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9wdGltaXphdGlvbiBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBncmFwaE9wdGltaXphdGlvbkxldmVsPzogJ2Rpc2FibGVkJyB8ICdiYXNpYycgfCAnZXh0ZW5kZWQnIHwgJ2xheW91dCcgfCAnYWxsJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIENQVSBtZW1vcnkgYXJlbmEuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlQ3B1TWVtQXJlbmE/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBlbmFibGUgbWVtb3J5IHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlTWVtUGF0dGVybj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBleGVjdXRpb25Nb2RlPzogJ3NlcXVlbnRpYWwnIHwgJ3BhcmFsbGVsJztcblxuICAgIC8qKlxuICAgICAqIE9wdGltaXplZCBtb2RlbCBmaWxlIHBhdGguXG4gICAgICpcbiAgICAgKiBJZiB0aGlzIHNldHRpbmcgaXMgc3BlY2lmaWVkLCB0aGUgb3B0aW1pemVkIG1vZGVsIHdpbGwgYmUgZHVtcGVkLiBJbiBicm93c2VyLCBhIGJsb2Igd2lsbCBiZSBjcmVhdGVkXG4gICAgICogd2l0aCBhIHBvcC11cCB3aW5kb3cuXG4gICAgICovXG4gICAgb3B0aW1pemVkTW9kZWxGaWxlUGF0aD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIHByb2ZpbGluZy5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIGZ1dHVyZSB1c2UuXG4gICAgICovXG4gICAgZW5hYmxlUHJvZmlsaW5nPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEZpbGUgcHJlZml4IGZvciBwcm9maWxpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYSBwbGFjZWhvbGRlciBmb3IgYSBmdXR1cmUgdXNlLlxuICAgICAqL1xuICAgIHByb2ZpbGVGaWxlUHJlZml4Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIElELlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ0lkPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIHNldmVyaXR5IGxldmVsLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwIHwgMSB8IDIgfCAzIHwgNDtcblxuICAgIC8qKlxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgbG9nVmVyYm9zaXR5TGV2ZWw/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHN0cmluZyBhcyBhIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGZvciBhbGwgb3V0cHV0cywgb3IgYW4gb2JqZWN0IHRoYXQgdXNlIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBhXG4gICAgICogcHJlZmVycmVkIGRhdGEgbG9jYXRpb24gYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgV2ViIGZvciBXZWJHTCBhbmQgV2ViR1BVIEVQLlxuICAgICAqL1xuICAgIHByZWZlcnJlZE91dHB1dExvY2F0aW9uPzogT25ueFZhbHVlRGF0YUxvY2F0aW9uIHwgeyByZWFkb25seSBbb3V0cHV0TmFtZTogc3RyaW5nXTogT25ueFZhbHVlRGF0YUxvY2F0aW9uIH07XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBncmFwaCBjYXB0dXJlLlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSBXZWIgZm9yIFdlYkdQVSBFUC5cbiAgICAgKi9cbiAgICBlbmFibGVHcmFwaENhcHR1cmU/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogU3RvcmUgY29uZmlndXJhdGlvbnMgZm9yIGEgc2Vzc2lvbi4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Nlc3Npb24vXG4gICAgICogb25ueHJ1bnRpbWVfc2Vzc2lvbl9vcHRpb25zX2NvbmZpZ19rZXlzLmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBganNcbiAgICAgKiBleHRyYToge1xuICAgICAqICAgc2Vzc2lvbjoge1xuICAgICAqICAgICBzZXRfZGVub3JtYWxfYXNfemVybzogXCIxXCIsXG4gICAgICogICAgIGRpc2FibGVfcHJlcGFja2luZzogXCIxXCJcbiAgICAgKiAgIH0sXG4gICAgICogICBvcHRpbWl6YXRpb246IHtcbiAgICAgKiAgICAgZW5hYmxlX2dlbHVfYXBwcm94aW1hdGlvbjogXCIxXCJcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZXh0cmE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgfVxuXG4gIC8vICNyZWdpb24gZXhlY3V0aW9uIHByb3ZpZGVyc1xuXG4gIC8vIEN1cnJlbnRseSwgd2UgaGF2ZSB0aGUgZm9sbG93aW5nIGJhY2tlbmRzIHRvIHN1cHBvcnQgZXhlY3V0aW9uIHByb3ZpZGVyczpcbiAgLy8gQmFja2VuZCBOb2RlLmpzIGJpbmRpbmc6IHN1cHBvcnRzICdjcHUnLCAnZG1sJyAod2luMzIpLCAnY29yZW1sJyAobWFjT1MpIGFuZCAnY3VkYScgKGxpbnV4KS5cbiAgLy8gQmFja2VuZCBXZWJBc3NlbWJseTogc3VwcG9ydHMgJ2NwdScsICd3YXNtJywgJ3dlYmdwdScgYW5kICd3ZWJubicuXG4gIC8vIEJhY2tlbmQgT05OWC5qczogc3VwcG9ydHMgJ3dlYmdsJy5cbiAgLy8gQmFja2VuZCBSZWFjdCBOYXRpdmU6IHN1cHBvcnRzICdjcHUnLCAneG5ucGFjaycsICdjb3JlbWwnIChpT1MpLCAnbm5hcGknIChBbmRyb2lkKS5cbiAgaW50ZXJmYWNlIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwIHtcbiAgICBjb3JlbWw6IENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGNwdTogQ3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgY3VkYTogQ3VkYUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGRtbDogRG1sRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgbm5hcGk6IE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgdGVuc29ycnQ6IFRlbnNvclJ0RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2FzbTogV2ViQXNzZW1ibHlFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3ZWJnbDogV2ViR0xFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3ZWJncHU6IFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdlYm5uOiBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHFubjogUW5uRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgeG5ucGFjazogWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICB9XG5cbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlck5hbWUgPSBrZXlvZiBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcDtcbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlckNvbmZpZyA9XG4gICAgfCBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcFtFeGVjdXRpb25Qcm92aWRlck5hbWVdXG4gICAgfCBFeGVjdXRpb25Qcm92aWRlck9wdGlvblxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJOYW1lXG4gICAgfCBzdHJpbmc7XG5cbiAgZXhwb3J0IGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2NwdSc7XG4gICAgdXNlQXJlbmE/OiBib29sZWFuO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3VkYUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjdWRhJztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIERtbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdkbWwnO1xuICAgIGRldmljZUlkPzogbnVtYmVyO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgVGVuc29yUnRFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAndGVuc29ycnQnO1xuICAgIGRldmljZUlkPzogbnVtYmVyO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViQXNzZW1ibHlFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2FzbSc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJnbCc7XG4gICAgLy8gVE9ETzogYWRkIGZsYWdzXG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBYbm5wYWNrRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3hubnBhY2snO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dlYmdwdSc7XG4gICAgcHJlZmVycmVkTGF5b3V0PzogJ05DSFcnIHwgJ05IV0MnO1xuICB9XG5cbiAgLy8gI3JlZ2lvbiBXZWJOTiBvcHRpb25zXG5cbiAgaW50ZXJmYWNlIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJubic7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBjcmVhdGluZyBhIFdlYk5OIE1MQ29udGV4dC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2Vibm4vI2RpY3RkZWYtbWxjb250ZXh0b3B0aW9uc1xuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTkNvbnRleHRPcHRpb25zIHtcbiAgICBkZXZpY2VUeXBlPzogJ2NwdScgfCAnZ3B1JyB8ICducHUnO1xuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2RlZmF1bHQnIHwgJ2xvdy1wb3dlcicgfCAnaGlnaC1wZXJmb3JtYW5jZSc7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aG91dCBNTENvbnRleHQuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYk5OT3B0aW9uc1dpdGhvdXRNTENvbnRleHQgZXh0ZW5kcyBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSwgV2ViTk5Db250ZXh0T3B0aW9ucyB7XG4gICAgY29udGV4dD86IG5ldmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyIHdpdGggTUxDb250ZXh0LlxuICAgKlxuICAgKiBXaGVuIE1MQ29udGV4dCBpcyBwcm92aWRlZCwgdGhlIGRldmljZVR5cGUgaXMgYWxzbyByZXF1aXJlZCBzbyB0aGF0IHRoZSBXZWJOTiBFUCBjYW4gZGV0ZXJtaW5lIHRoZSBwcmVmZXJyZWRcbiAgICogY2hhbm5lbCBsYXlvdXQuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dFxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0XG4gICAgZXh0ZW5kcyBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSxcbiAgICAgIE9taXQ8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPixcbiAgICAgIFJlcXVpcmVkPFBpY2s8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPj4ge1xuICAgIGNvbnRleHQ6IFRyeUdldEdsb2JhbFR5cGU8J01MQ29udGV4dCc+O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyIHdpdGggTUxDb250ZXh0IHdoaWNoIGlzIGNyZWF0ZWQgZnJvbSBHUFVEZXZpY2UuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dC1ncHVkZXZpY2VcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5PcHRpb25zV2ViR3B1IGV4dGVuZHMgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUge1xuICAgIGNvbnRleHQ6IFRyeUdldEdsb2JhbFR5cGU8J01MQ29udGV4dCc+O1xuICAgIGdwdURldmljZTogVHJ5R2V0R2xvYmFsVHlwZTwnR1BVRGV2aWNlJz47XG4gIH1cblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyLlxuICAgKi9cbiAgZXhwb3J0IHR5cGUgV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbiA9XG4gICAgfCBXZWJOTk9wdGlvbnNXaXRob3V0TUxDb250ZXh0XG4gICAgfCBXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0XG4gICAgfCBXZWJOTk9wdGlvbnNXZWJHcHU7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgUW5uRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3Fubic7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgUU5OIGJhY2tlbmQgdHlwZS4gRS5nLiwgJ2NwdScgb3IgJ2h0cCcuXG4gICAgICogTXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggYGJhY2tlbmRQYXRoYC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0ICdodHAnXG4gICAgICovXG4gICAgYmFja2VuZFR5cGU/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIHBhdGggdG8gdGhlIFFOTiBiYWNrZW5kIGxpYnJhcnkuXG4gICAgICogTXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggYGJhY2tlbmRUeXBlYC5cbiAgICAgKi9cbiAgICBiYWNrZW5kUGF0aD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHdoZXRoZXIgdG8gZW5hYmxlIEhUUCBGUDE2IHByZWNpc2lvbi5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBlbmFibGVGcDE2UHJlY2lzaW9uPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjb3JlbWwnO1xuICAgIC8qKlxuICAgICAqIFRoZSBiaXQgZmxhZ3MgZm9yIENvcmVNTCBleGVjdXRpb24gcHJvdmlkZXIuXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBDT1JFTUxfRkxBR19VU0VfQ1BVX09OTFkgPSAweDAwMVxuICAgICAqIENPUkVNTF9GTEFHX0VOQUJMRV9PTl9TVUJHUkFQSCA9IDB4MDAyXG4gICAgICogQ09SRU1MX0ZMQUdfT05MWV9FTkFCTEVfREVWSUNFX1dJVEhfQU5FID0gMHgwMDRcbiAgICAgKiBDT1JFTUxfRkxBR19PTkxZX0FMTE9XX1NUQVRJQ19JTlBVVF9TSEFQRVMgPSAweDAwOFxuICAgICAqIENPUkVNTF9GTEFHX0NSRUFURV9NTFBST0dSQU0gPSAweDAxMFxuICAgICAqIENPUkVNTF9GTEFHX1VTRV9DUFVfQU5EX0dQVSA9IDB4MDIwXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBTZWUgaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Byb3ZpZGVycy9jb3JlbWwvY29yZW1sX3Byb3ZpZGVyX2ZhY3RvcnkuaCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogVGhpcyBmbGFnIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcpLlxuICAgICAqL1xuICAgIGNvcmVNbEZsYWdzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byB1c2UgQ1BVIG9ubHkgaW4gQ29yZU1MIEVQLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIHVzZUNQVU9ubHk/OiBib29sZWFuO1xuICAgIHVzZUNQVUFuZEdQVT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB3aGV0aGVyIHRvIGVuYWJsZSBDb3JlTUwgRVAgb24gc3ViZ3JhcGguXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgZW5hYmxlT25TdWJncmFwaD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB3aGV0aGVyIHRvIG9ubHkgZW5hYmxlIENvcmVNTCBFUCBmb3IgQXBwbGUgZGV2aWNlcyB3aXRoIEFORSAoQXBwbGUgTmV1cmFsIEVuZ2luZSkuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgb25seUVuYWJsZURldmljZVdpdGhBTkU/OiBib29sZWFuO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgTm5hcGlFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnbm5hcGknO1xuICAgIHVzZUZQMTY/OiBib29sZWFuO1xuICAgIHVzZU5DSFc/OiBib29sZWFuO1xuICAgIGNwdURpc2FibGVkPzogYm9vbGVhbjtcbiAgICBjcHVPbmx5PzogYm9vbGVhbjtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcnVuIG9wdGlvbnNcblxuICAvKipcbiAgICogQSBzZXQgb2YgY29uZmlndXJhdGlvbnMgZm9yIGluZmVyZW5jZSBydW4gYmVoYXZpb3JcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUnVuT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogTG9nIHNldmVyaXR5IGxldmVsLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwIHwgMSB8IDIgfCAzIHwgNDtcblxuICAgIC8qKlxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgbG9nVmVyYm9zaXR5TGV2ZWw/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUZXJtaW5hdGUgYWxsIGluY29tcGxldGUgT3J0UnVuIGNhbGxzIGFzIHNvb24gYXMgcG9zc2libGUgaWYgdHJ1ZVxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqL1xuICAgIHRlcm1pbmF0ZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBBIHRhZyBmb3IgdGhlIFJ1bigpIGNhbGxzIHVzaW5nIHRoaXNcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICB0YWc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBzaW5nbGUgcnVuIGNvbmZpZ3VyYXRpb24gZW50cnkuIFNlZVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9zZXNzaW9uL1xuICAgICAqIG9ubnhydW50aW1lX3J1bl9vcHRpb25zX2NvbmZpZ19rZXlzLmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqIGV4dHJhOiB7XG4gICAgICogICBtZW1vcnk6IHtcbiAgICAgKiAgICAgZW5hYmxlX21lbW9yeV9hcmVuYV9zaHJpbmthZ2U6IFwiMVwiLFxuICAgICAqICAgfVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBleHRyYT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gdmFsdWUgbWV0YWRhdGFcblxuICAvKipcbiAgICogVGhlIGNvbW1vbiBwYXJ0IG9mIHRoZSB2YWx1ZSBtZXRhZGF0YSB0eXBlIGZvciBib3RoIHRlbnNvciBhbmQgbm9uLXRlbnNvciB2YWx1ZXMuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFZhbHVlTWV0YWRhdGFCYXNlIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgc3BlY2lmaWVkIGlucHV0IG9yIG91dHB1dC5cbiAgICAgKi9cbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyB0aGUgbWV0YWRhdGEgb2YgYSBub24tdGVuc29yIHZhbHVlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBOb25UZW5zb3JWYWx1ZU1ldGFkYXRhIGV4dGVuZHMgVmFsdWVNZXRhZGF0YUJhc2Uge1xuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdmFsdWUgaXMgYSB0ZW5zb3IuXG4gICAgICovXG4gICAgcmVhZG9ubHkgaXNUZW5zb3I6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIG1ldGFkYXRhIG9mIGEgdGVuc29yIHZhbHVlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBUZW5zb3JWYWx1ZU1ldGFkYXRhIGV4dGVuZHMgVmFsdWVNZXRhZGF0YUJhc2Uge1xuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdmFsdWUgaXMgYSB0ZW5zb3IuXG4gICAgICovXG4gICAgcmVhZG9ubHkgaXNUZW5zb3I6IHRydWU7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICAgKi9cbiAgICByZWFkb25seSB0eXBlOiBUZW5zb3IuVHlwZTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNoYXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgc2hhcGUgaXMgbm90IGRlZmluZWQsIHRoZSB2YWx1ZSB3aWxsIGFuIGVtcHR5IGFycmF5LiBPdGhlcndpc2UsIGl0IHdpbGwgYmUgYW4gYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBzaGFwZVxuICAgICAqIG9mIHRoZSB0ZW5zb3IuIEVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkgY2FuIGJlIGEgbnVtYmVyIG9yIGEgc3RyaW5nLiBJZiB0aGUgZWxlbWVudCBpcyBhIG51bWJlciwgaXQgcmVwcmVzZW50c1xuICAgICAqIHRoZSBjb3JyZXNwb25kaW5nIGRpbWVuc2lvbiBzaXplLiBJZiB0aGUgZWxlbWVudCBpcyBhIHN0cmluZywgaXQgcmVwcmVzZW50cyBhIHN5bWJvbGljIGRpbWVuc2lvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSBzaGFwZTogUmVhZG9ubHlBcnJheTxudW1iZXIgfCBzdHJpbmc+O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgdGhlIG1ldGFkYXRhIG9mIGEgdmFsdWUuXG4gICAqL1xuICBleHBvcnQgdHlwZSBWYWx1ZU1ldGFkYXRhID0gTm9uVGVuc29yVmFsdWVNZXRhZGF0YSB8IFRlbnNvclZhbHVlTWV0YWRhdGE7XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIHJ1bnRpbWUgaW5zdGFuY2Ugb2YgYW4gT05OWCBtb2RlbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBydW4oKVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIHRoZSBtb2RlbCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5JbnB1dFR5cGVgIGZvciBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuKGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLk91dHB1dFR5cGVgIGZvclxuICAgKiBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuKFxuICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcblxuICAvKipcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cbiAgICovXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9maWxpbmdcblxuICAvKipcbiAgICogU3RhcnQgcHJvZmlsaW5nLlxuICAgKi9cbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZDtcblxuICAvKipcbiAgICogRW5kIHByb2ZpbGluZy5cbiAgICovXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG1ldGFkYXRhXG5cbiAgLyoqXG4gICAqIEdldCBpbnB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldCBvdXRwdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IGlucHV0IG1ldGFkYXRhIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSBpbnB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBtZXRhZGF0YSBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gY3JlYXRlKClcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gT05OWCBtb2RlbCBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gdXJpIC0gVGhlIFVSSSBvciBmaWxlIHBhdGggb2YgdGhlIG1vZGVsIHRvIGxvYWQuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXG4gICAqL1xuICBjcmVhdGUodXJpOiBzdHJpbmcsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIHNlZ21lbnQgb2YgYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gYnl0ZU9mZnNldCAtIFRoZSBiZWdpbm5pbmcgb2YgdGhlIHNwZWNpZmllZCBwb3J0aW9uIG9mIHRoZSBhcnJheSBidWZmZXIuXG4gICAqIEBwYXJhbSBieXRlTGVuZ3RoIC0gVGhlIGxlbmd0aCBpbiBieXRlcyBvZiB0aGUgYXJyYXkgYnVmZmVyLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKFxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLFxuICAgIGJ5dGVPZmZzZXQ6IG51bWJlcixcbiAgICBieXRlTGVuZ3RoPzogbnVtYmVyLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24gYW5kIGxvYWQgbW9kZWwgYXN5bmNocm9ub3VzbHkgZnJvbSBhIFVpbnQ4QXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBIFVpbnQ4QXJyYXkgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cbiAgICovXG4gIGNyZWF0ZShidWZmZXI6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBJbmZlcmVuY2VTZXNzaW9uOiBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSA9IEluZmVyZW5jZVNlc3Npb25JbXBsO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBPcHRpb25zRm9ybWF0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMsIE9wdGlvbnNUZW5zb3JMYXlvdXQgfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JUb0RhdGFVcmxPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udmVyc2lvblV0aWxzIHtcbiAgLyoqXG4gICAqIGNyZWF0ZXMgYSBEYXRhVVJMIGluc3RhbmNlIGZyb20gdGVuc29yXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyBhIERhdGFVUkwgaW5zdGFuY2UgZnJvbSB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGBmb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIEByZXR1cm5zIGEgRGF0YVVSTCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBpbWFnZSBjb252ZXJ0ZWQgZnJvbSB0ZW5zb3IgZGF0YVxuICAgKi9cbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBjcmVhdGVzIGFuIEltYWdlRGF0YSBpbnN0YW5jZSBmcm9tIHRlbnNvclxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgYW4gSW1hZ2VEYXRhIGluc3RhbmNlIGZyb20gdGhlIHRlbnNvci5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgZm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiBAcmV0dXJucyBhbiBJbWFnZURhdGEgaW5zdGFuY2UgcmVwcmVzZW50aW5nIHRoZSBpbWFnZSBjb252ZXJ0ZWQgZnJvbSB0ZW5zb3IgZGF0YVxuICAgKi9cbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YTtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yLCBUeXBlZFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuZXhwb3J0IHR5cGUgSW1hZ2VGb3JtYXQgPSAnUkdCJyB8ICdSR0JBJyB8ICdCR1InIHwgJ1JCRyc7XG5leHBvcnQgdHlwZSBJbWFnZVRlbnNvckxheW91dCA9ICdOSFdDJyB8ICdOQ0hXJztcblxuLy8gdGhlIGZvbGxvd2luZyByZWdpb24gY29udGFpbnMgdHlwZSBkZWZpbml0aW9ucyBmb3IgY29uc3RydWN0aW5nIHRlbnNvciBmcm9tIGEgc3BlY2lmaWMgbG9jYXRpb24uXG5cbi8vICNyZWdpb24gdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgc3BlY2lmaWMgbG9jYXRpb25cblxuLyoqXG4gKiByZXByZXNlbnQgY29tbW9uIHByb3BlcnRpZXMgb2YgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvbi5cbiAqL1xuaW50ZXJmYWNlIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiBleHRlbmRzIFBpY2s8VGVuc29yLCAnZGltcyc+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgcmVhZG9ubHkgdHlwZTogVDtcbn1cblxuLyoqXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBHUFUgcmVzb3VyY2UuXG4gKi9cbmludGVyZmFjZSBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IHtcbiAgLyoqXG4gICAqIGFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxuICAgKlxuICAgKiBJZiBub3QgcHJvdmlkZWQsIHRoZSB0ZW5zb3IgdHJlYXQgdGhlIEdQVSBkYXRhIGFzIGV4dGVybmFsIHJlc291cmNlLlxuICAgKi9cbiAgZG93bmxvYWQ/KCk6IFByb21pc2U8VGVuc29yLkRhdGFUeXBlTWFwW1RdPjtcblxuICAvKipcbiAgICogYW4gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSB0ZW5zb3IgaXMgZGlzcG9zZWQuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgdGhlIHRlbnNvciB0cmVhdCB0aGUgR1BVIGRhdGEgYXMgZXh0ZXJuYWwgcmVzb3VyY2UuXG4gICAqL1xuICBkaXNwb3NlPygpOiB2b2lkO1xufVxuXG4vKipcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHBpbm5lZCBDUFUgYnVmZmVyXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuQ3B1UGlubmVkRGF0YVR5cGVzID0gVGVuc29yLkNwdVBpbm5lZERhdGFUeXBlcz5cbiAgZXh0ZW5kcyBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gYmUgJ2NwdS1waW5uZWQnLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246ICdjcHUtcGlubmVkJztcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIENQVSBwaW5uZWQgYnVmZmVyIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKi9cbiAgcmVhZG9ubHkgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdO1xufVxuXG4vKipcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcyA9IFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzPlxuICBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPixcbiAgICBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAndGV4dHVyZScuXG4gICAqL1xuICByZWFkb25seSBsb2NhdGlvbjogJ3RleHR1cmUnO1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgV2ViR0wgdGV4dHVyZSB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICovXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcbn1cblxuLyoqXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0gVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz5cbiAgZXh0ZW5kcyBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4sXG4gICAgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gYmUgJ2dwdS1idWZmZXInLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246ICdncHUtYnVmZmVyJztcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIFdlYkdQVSBidWZmZXIgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBncHVCdWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMgPSBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXM+XG4gIGV4dGVuZHMgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+LFxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICdtbC10ZW5zb3InLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246ICdtbC10ZW5zb3InO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBXZWJOTiBNTFRlbnNvciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICovXG4gIHJlYWRvbmx5IG1sVGVuc29yOiBUZW5zb3IuTUxUZW5zb3JUeXBlO1xufVxuXG4vLyAjZW5kcmVnaW9uXG5cbi8vIHRoZSBmb2xsb3dpbmcgcmVnaW9uIGNvbnRhaW5zIHR5cGUgZGVmaW5pdGlvbnMgb2YgZWFjaCBpbmRpdmlkdWFsIG9wdGlvbnMuXG4vLyB0aGUgdGVuc29yIGZhY3RvcnkgZnVuY3Rpb25zIHVzZSBhIGNvbXBvc2l0aW9uIG9mIHRob3NlIG9wdGlvbnMgYXMgdGhlIHBhcmFtZXRlciB0eXBlLlxuXG4vLyAjcmVnaW9uIE9wdGlvbnMgZmllbGRzXG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc0Zvcm1hdCB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGZvcm1hdCByZXByZXNlbnRlZCBpbiBSR0JBIGNvbG9yIHNwYWNlLlxuICAgKi9cbiAgZm9ybWF0PzogSW1hZ2VGb3JtYXQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc1RlbnNvckZvcm1hdCB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGZvcm1hdCBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBOT1RFOiB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIG9wdGlvbiAnZm9ybWF0Jy4gV2hpbGUgb3B0aW9uICdmb3JtYXQnIHJlcHJlc2VudHMgdGhlIG9yaWdpbmFsIGltYWdlLCAndGVuc29yRm9ybWF0J1xuICAgKiByZXByZXNlbnRzIHRoZSB0YXJnZXQgZm9ybWF0IG9mIHRoZSB0ZW5zb3IuIEEgdHJhbnNwb3NlIHdpbGwgYmUgcGVyZm9ybWVkIGlmIHRoZXkgYXJlIGRpZmZlcmVudC5cbiAgICovXG4gIHRlbnNvckZvcm1hdD86IEltYWdlRm9ybWF0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgZGF0YVR5cGU/OiAnZmxvYXQzMicgfCAndWludDgnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JMYXlvdXQge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSB0ZW5zb3IgbGF5b3V0IHdoZW4gcmVwcmVzZW50aW5nIGRhdGEgb2Ygb25lIG9yIG1vcmUgaW1hZ2UocykuXG4gICAqL1xuICB0ZW5zb3JMYXlvdXQ/OiBJbWFnZVRlbnNvckxheW91dDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zRGltZW5zaW9ucyB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGhlaWdodCBpbiBwaXhlbFxuICAgKi9cbiAgaGVpZ2h0PzogbnVtYmVyO1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSB3aWR0aCBpbiBwaXhlbFxuICAgKi9cbiAgd2lkdGg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSByZXNpemVkIGhlaWdodC4gSWYgb21pdHRlZCwgb3JpZ2luYWwgaGVpZ2h0IHdpbGwgYmUgdXNlZC5cbiAgICovXG4gIHJlc2l6ZWRIZWlnaHQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgcmVzaXplZCB3aWR0aCAtIGNhbiBiZSBhY2Nlc3NlZCB2aWEgdGVuc29yIGRpbWVuc2lvbnMgYXMgd2VsbFxuICAgKi9cbiAgcmVzaXplZFdpZHRoPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgbm9ybWFsaXphdGlvbiBwYXJhbWV0ZXJzIHdoZW4gcHJlcHJvY2Vzc2luZyB0aGUgaW1hZ2UgYXMgbW9kZWwgaW5wdXQuXG4gICAqXG4gICAqIERhdGEgZWxlbWVudCBhcmUgcmFuZ2VkIGZyb20gMCB0byAyNTUuXG4gICAqL1xuICBub3JtPzoge1xuICAgIC8qKlxuICAgICAqIFRoZSAnYmlhcycgdmFsdWUgZm9yIGltYWdlIG5vcm1hbGl6YXRpb24uXG4gICAgICogLSBJZiBvbWl0dGVkLCB1c2UgZGVmYXVsdCB2YWx1ZSAwLlxuICAgICAqIC0gSWYgaXQncyBhIHNpbmdsZSBudW1iZXIsIGFwcGx5IHRvIGVhY2ggY2hhbm5lbFxuICAgICAqIC0gSWYgaXQncyBhbiBhcnJheSBvZiAzIG9yIDQgbnVtYmVycywgYXBwbHkgZWxlbWVudC13aXNlLiBOdW1iZXIgb2YgZWxlbWVudHMgbmVlZCB0byBtYXRjaCB0aGUgbnVtYmVyIG9mIGNoYW5uZWxzXG4gICAgICogZm9yIHRoZSBjb3JyZXNwb25kaW5nIGltYWdlIGZvcm1hdFxuICAgICAqL1xuICAgIGJpYXM/OiBudW1iZXIgfCBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gfCBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICAvKipcbiAgICAgKiBUaGUgJ21lYW4nIHZhbHVlIGZvciBpbWFnZSBub3JtYWxpemF0aW9uLlxuICAgICAqIC0gSWYgb21pdHRlZCwgdXNlIGRlZmF1bHQgdmFsdWUgMjU1LlxuICAgICAqIC0gSWYgaXQncyBhIHNpbmdsZSBudW1iZXIsIGFwcGx5IHRvIGVhY2ggY2hhbm5lbFxuICAgICAqIC0gSWYgaXQncyBhbiBhcnJheSBvZiAzIG9yIDQgbnVtYmVycywgYXBwbHkgZWxlbWVudC13aXNlLiBOdW1iZXIgb2YgZWxlbWVudHMgbmVlZCB0byBtYXRjaCB0aGUgbnVtYmVyIG9mIGNoYW5uZWxzXG4gICAgICogZm9yIHRoZSBjb3JyZXNwb25kaW5nIGltYWdlIGZvcm1hdFxuICAgICAqL1xuICAgIG1lYW4/OiBudW1iZXIgfCBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gfCBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgfTtcbn1cblxuLy8gI2VuZHJlZ2lvblxuXG4vLyAjcmVnaW9uIE9wdGlvbnMgY29tcG9zaXRpb25cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9uc1xuICBleHRlbmRzIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQsXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsXG4gICAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnNcbiAgZXh0ZW5kcyBPcHRpb25SZXNpemVkRGltZW5zaW9ucyxcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0LFxuICAgIE9wdGlvbnNUZW5zb3JMYXlvdXQsXG4gICAgT3B0aW9uc1RlbnNvckRhdGFUeXBlLFxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21VcmxPcHRpb25zXG4gIGV4dGVuZHMgT3B0aW9uc0RpbWVuc2lvbnMsXG4gICAgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXG4gICAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcbiAgICBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zXG4gIGV4dGVuZHMgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXG4gICAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcbiAgICBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VCBleHRlbmRzIFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzPlxuICBleHRlbmRzIFJlcXVpcmVkPE9wdGlvbnNEaW1lbnNpb25zPixcbiAgICBPcHRpb25zRm9ybWF0LFxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IC8qIFRPRE86IGFkZCBtb3JlICovIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VCBleHRlbmRzIFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXM+XG4gIGV4dGVuZHMgUGljazxUZW5zb3IsICdkaW1zJz4sXG4gICAgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIGRhdGFUeXBlPzogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zPFQgZXh0ZW5kcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXM+XG4gIGV4dGVuZHMgUGljazxUZW5zb3IsICdkaW1zJz4sXG4gICAgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIGRhdGFUeXBlPzogVDtcbn1cblxuLy8gI2VuZHJlZ2lvblxuXG4vKipcbiAqIHR5cGUgVGVuc29yRmFjdG9yeSBkZWZpbmVzIHRoZSBmYWN0b3J5IGZ1bmN0aW9ucyBvZiAnVGVuc29yJyB0byBjcmVhdGUgdGVuc29yIGluc3RhbmNlcyBmcm9tIGV4aXN0aW5nIGRhdGEgb3JcbiAqIHJlc291cmNlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGYWN0b3J5IHtcbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGFuIEltYWdlRGF0YSBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIGltYWdlRGF0YSAtIHRoZSBJbWFnZURhdGEgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gSW1hZ2VEYXRhLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIC0gYGRhdGFUeXBlYDogYCdmbG9hdDMyJ2BcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tSW1hZ2UoXG4gICAgaW1hZ2VEYXRhOiBJbWFnZURhdGEsXG4gICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLFxuICApOiBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz4gfCBUeXBlZFRlbnNvcjwndWludDgnPj47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgSFRNTEltYWdlRWxlbWVudCBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIGltYWdlRWxlbWVudCAtIHRoZSBIVE1MSW1hZ2VFbGVtZW50IG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIEhUTUxJbWFnZUVsZW1lbnQuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21JbWFnZShcbiAgICBpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLFxuICApOiBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz4gfCBUeXBlZFRlbnNvcjwndWludDgnPj47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIFVSTFxuICAgKlxuICAgKiBAcGFyYW0gdXJsU291cmNlIC0gYSBzdHJpbmcgYXMgYSBVUkwgdG8gdGhlIGltYWdlIG9yIGEgZGF0YSBVUkwgY29udGFpbmluZyB0aGUgaW1hZ2UgZGF0YS5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFVSTC5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbUltYWdlKHVybFNvdXJjZTogc3RyaW5nLCBvcHRpb25zPzogVGVuc29yRnJvbVVybE9wdGlvbnMpOiBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz4gfCBUeXBlZFRlbnNvcjwndWludDgnPj47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGFuIEltYWdlQml0bWFwIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gYml0bWFwIC0gdGhlIEltYWdlQml0bWFwIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFVSTC5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbUltYWdlKFxuICAgIGJpdG1hcDogSW1hZ2VCaXRtYXAsXG4gICAgb3B0aW9uczogVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcbiAgICpcbiAgICogQHBhcmFtIHRleHR1cmUgLSB0aGUgV2ViR0xUZXh0dXJlIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFdlYkdMIHRleHR1cmUuXG4gICAqXG4gICAqIFRoZSBvcHRpb25zIGluY2x1ZGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAqIC0gYHdpZHRoYDogdGhlIHdpZHRoIG9mIHRoZSB0ZXh0dXJlLiBSZXF1aXJlZC5cbiAgICogLSBgaGVpZ2h0YDogdGhlIGhlaWdodCBvZiB0aGUgdGV4dHVyZS4gUmVxdWlyZWQuXG4gICAqIC0gYGZvcm1hdGA6IHRoZSBmb3JtYXQgb2YgdGhlIHRleHR1cmUuIElmIG9taXR0ZWQsIGFzc3VtZSAnUkdCQScuXG4gICAqIC0gYGRvd25sb2FkYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZG93bmxvYWQgdGhlIHRlbnNvciBkYXRhIGZyb20gR1BVIHRvIENQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhXG4gICAqIHdpbGwgbm90IGJlIGFibGUgdG8gZG93bmxvYWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndFxuICAgKiBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICogLSBgZGlzcG9zZWA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3Bvc2UgdGhlIHRlbnNvciBkYXRhIG9uIEdQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxuICAgKiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3QgbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbVRleHR1cmU8VCBleHRlbmRzIFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzID0gJ2Zsb2F0MzInPihcbiAgICB0ZXh0dXJlOiBUZW5zb3IuVGV4dHVyZVR5cGUsXG4gICAgb3B0aW9uczogVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQ+LFxuICApOiBUeXBlZFRlbnNvcjwnZmxvYXQzMic+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciAtIHRoZSBHUFVCdWZmZXIgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gV2ViR1BVIGJ1ZmZlci5cbiAgICpcbiAgICogVGhlIG9wdGlvbnMgaW5jbHVkZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICogLSBgZGF0YVR5cGVgOiB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGFzc3VtZSAnZmxvYXQzMicuXG4gICAqIC0gYGRpbXNgOiB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIFJlcXVpcmVkLlxuICAgKiAtIGBkb3dubG9hZGA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRvd25sb2FkIHRoZSB0ZW5zb3IgZGF0YSBmcm9tIEdQVSB0byBDUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YVxuICAgKiB3aWxsIG5vdCBiZSBhYmxlIHRvIGRvd25sb2FkLiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3RcbiAgICogbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqIC0gYGRpc3Bvc2VgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YSBvbiBHUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YSB3aWxsIG5vdCBiZSBkaXNwb3NlZC5cbiAgICogVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0IG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21HcHVCdWZmZXI8VCBleHRlbmRzIFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXM+KFxuICAgIGJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGUsXG4gICAgb3B0aW9uczogVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VD4sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIFdlYk5OIE1MVGVuc29yXG4gICAqXG4gICAqIEBwYXJhbSB0ZW5zb3IgLSB0aGUgTUxUZW5zb3Igb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gYSBXZWJOTiBNTFRlbnNvci5cbiAgICpcbiAgICogVGhlIG9wdGlvbnMgaW5jbHVkZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICogLSBgZGF0YVR5cGVgOiB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGFzc3VtZSAnZmxvYXQzMicuXG4gICAqIC0gYGRpbXNgOiB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIFJlcXVpcmVkLlxuICAgKiAtIGBkb3dubG9hZGA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRvd25sb2FkIHRoZSB0ZW5zb3IgZGF0YSBmcm9tIHRoZSBNTFRlbnNvciB0byBDUFUuIElmIG9taXR0ZWQsIHRoZSBNTFRlbnNvclxuICAgKiBkYXRhIHdpbGwgbm90IGJlIGFibGUgdG8gZG93bmxvYWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgdGhlIFdlYk5OIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy5cbiAgICogVXNlcnMgZG9uJ3QgbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqIC0gYGRpc3Bvc2VgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YSBvbiB0aGUgV2ViTk4gTUxUZW5zb3IuIElmIG9taXR0ZWQsIHRoZSBNTFRlbnNvciB3aWxsXG4gICAqIG5vdCBiZSBkaXNwb3NlZC4gVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSB0aGUgV2ViTk4gYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndCBuZWVkIHRvXG4gICAqIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tTUxUZW5zb3I8VCBleHRlbmRzIFRlbnNvci5NTFRlbnNvckRhdGFUeXBlcz4oXG4gICAgdGVuc29yOiBUZW5zb3IuTUxUZW5zb3JUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21NTFRlbnNvck9wdGlvbnM8VD4sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIHByZS1hbGxvY2F0ZWQgYnVmZmVyLiBUaGUgYnVmZmVyIHdpbGwgYmUgdXNlZCBhcyBhIHBpbm5lZCBidWZmZXIuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gdGhlIHRlbnNvciBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBidWZmZXIgLSBhIFR5cGVkQXJyYXkgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZS5cbiAgICogQHBhcmFtIGRpbXMgLSBzcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbVBpbm5lZEJ1ZmZlcjxUIGV4dGVuZHMgRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZyc+PihcbiAgICB0eXBlOiBULFxuICAgIGJ1ZmZlcjogVGVuc29yLkRhdGFUeXBlTWFwW1RdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTogVHlwZWRUZW5zb3I8VD47XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8qKlxuICogQSBzdHJpbmcgdGhhdCByZXByZXNlbnRzIGEgZmlsZSdzIFVSTCBvciBwYXRoLlxuICpcbiAqIFBhdGggaXMgdmFpbGFibGUgb25seSBpbiBvbm54cnVudGltZS1ub2RlIG9yIG9ubnhydW50aW1lLXdlYiBydW5uaW5nIGluIE5vZGUuanMuXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVVcmxPclBhdGggPSBzdHJpbmc7XG5cbi8qKlxuICogQSBCbG9iIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmaWxlLlxuICovXG5leHBvcnQgdHlwZSBGaWxlQmxvYiA9IEJsb2I7XG5cbi8qKlxuICogQSBVaW50OEFycmF5LCBBcnJheUJ1ZmZlciBvciBTaGFyZWRBcnJheUJ1ZmZlciBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmlsZSBjb250ZW50LlxuICpcbiAqIFdoZW4gaXQgaXMgYW4gQXJyYXlCdWZmZXIgb3IgU2hhcmVkQXJyYXlCdWZmZXIsIHRoZSB3aG9sZSBidWZmZXIgaXMgYXNzdW1lZCB0byBiZSB0aGUgZmlsZSBjb250ZW50LlxuICovXG5leHBvcnQgdHlwZSBGaWxlRGF0YSA9IFVpbnQ4QXJyYXkgfCBBcnJheUJ1ZmZlckxpa2U7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGZpbGUgdGhhdCBjYW4gYmUgbG9hZGVkIGJ5IHRoZSBPTk5YIFJ1bnRpbWUgSmF2YVNjcmlwdCBBUEkuXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVUeXBlID0gRmlsZVVybE9yUGF0aCB8IEZpbGVCbG9iIHwgRmlsZURhdGE7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBleHRlcm5hbCBkYXRhIGZpbGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZXJuYWxEYXRhRmlsZURlc2NyaXB0aW9uIHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGV4dGVybmFsIGRhdGEgZmlsZS5cbiAgICovXG4gIGRhdGE6IEZpbGVUeXBlO1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgZmlsZSBwYXRoLlxuICAgKi9cbiAgcGF0aDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXh0ZXJuYWwgZGF0YSBmaWxlLlxuICpcbiAqIFdoZW4gdXNpbmcgYSBzdHJpbmcsIGl0IHNob3VsZCBiZSBhIGZpbGUgVVJMIG9yIHBhdGggdGhhdCBpbiB0aGUgc2FtZSBkaXJlY3RvcnkgYXMgdGhlIG1vZGVsIGZpbGUuXG4gKi9cbmV4cG9ydCB0eXBlIEV4dGVybmFsRGF0YUZpbGVUeXBlID0gRXh0ZXJuYWxEYXRhRmlsZURlc2NyaXB0aW9uIHwgRmlsZVVybE9yUGF0aDtcblxuLyoqXG4gKiBPcHRpb25zIGZvciBtb2RlbCBsb2FkaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE9ubnhNb2RlbE9wdGlvbnMge1xuICAvKipcbiAgICogU3BlY2lmeWluZyBhIGxpc3Qgb2YgZmlsZXMgdGhhdCByZXByZXNlbnRzIHRoZSBleHRlcm5hbCBkYXRhLlxuICAgKi9cbiAgZXh0ZXJuYWxEYXRhPzogcmVhZG9ubHkgRXh0ZXJuYWxEYXRhRmlsZVR5cGVbXTtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG5leHBvcnQgdHlwZSBOb25UZW5zb3JUeXBlID0gbmV2ZXI7XG5cbi8qKlxuICogVHlwZSBPbm54VmFsdWUgUmVwcmVzZW50cyBib3RoIHRlbnNvcnMgYW5kIG5vbi10ZW5zb3JzIHZhbHVlIGZvciBtb2RlbCdzIGlucHV0cy9vdXRwdXRzLlxuICpcbiAqIE5PVEU6IGN1cnJlbnRseSBub3Qgc3VwcG9ydCBub24tdGVuc29yXG4gKi9cbmV4cG9ydCB0eXBlIE9ubnhWYWx1ZSA9IFRlbnNvciB8IE5vblRlbnNvclR5cGU7XG5cbi8qKlxuICogVHlwZSBPbm54VmFsdWVEYXRhTG9jYXRpb24gcmVwcmVzZW50cyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgb2YgYW4gT25ueFZhbHVlLlxuICovXG5leHBvcnQgdHlwZSBPbm54VmFsdWVEYXRhTG9jYXRpb24gPSBUZW5zb3IuRGF0YUxvY2F0aW9uO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKipcbiAqICMgT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJXG4gKlxuICogT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJIGlzIGEgdW5pZmllZCBBUEkgZm9yIGFsbCBKYXZhU2NyaXB0IHVzYWdlcywgaW5jbHVkaW5nIHRoZSBmb2xsb3dpbmcgTlBNIHBhY2thZ2VzOlxuICpcbiAqIC0gW29ubnhydW50aW1lLW5vZGVdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLW5vZGUpXG4gKiAtIFtvbm54cnVudGltZS13ZWJdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLXdlYilcbiAqIC0gW29ubnhydW50aW1lLXJlYWN0LW5hdGl2ZV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtcmVhY3QtbmF0aXZlKVxuICpcbiAqIFNlZSBhbHNvOlxuICogLSBbR2V0IFN0YXJ0ZWRdKGh0dHBzOi8vb25ueHJ1bnRpbWUuYWkvZG9jcy9nZXQtc3RhcnRlZC93aXRoLWphdmFzY3JpcHQvKVxuICogLSBbSW5mZXJlbmNlIGV4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lLWluZmVyZW5jZS1leGFtcGxlcy90cmVlL21haW4vanMpXG4gKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9iYWNrZW5kLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vZW52LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3IuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vdHJhY2UuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9vbm54LW1vZGVsLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAhISh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLm5vZGUpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJ3ZWJ3b3JrZXJcIiAvPlxuXG4vL1xuLy8gKiB0eXBlIGhhY2sgZm9yIFwiSFRNTEltYWdlRWxlbWVudFwiXG4vL1xuLy8gaW4gdHlwZXNjcmlwdCwgdGhlIHR5cGUgb2YgXCJIVE1MSW1hZ2VFbGVtZW50XCIgaXMgZGVmaW5lZCBpbiBsaWIuZG9tLmQudHMsIHdoaWNoIGlzIGNvbmZsaWN0IHdpdGggbGliLndlYndvcmtlci5kLnRzLlxuLy8gd2hlbiB3ZSB1c2Ugd2Vid29ya2VyLCB0aGUgbGliLndlYndvcmtlci5kLnRzIHdpbGwgYmUgdXNlZCwgd2hpY2ggZG9lcyBub3QgaGF2ZSBIVE1MSW1hZ2VFbGVtZW50IGRlZmluZWQuXG4vL1xuLy8gd2Ugd2lsbCBnZXQgdGhlIGZvbGxvd2luZyBlcnJvcnMgY29tcGxhaW5pbmcgdGhhdCBIVE1MSW1hZ2VFbGVtZW50IGlzIG5vdCBkZWZpbmVkOlxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gLi4vY29tbW9uL2Rpc3QvY2pzL3RlbnNvci1mYWN0b3J5LmQudHM6MTg3OjI5IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MSW1hZ2VFbGVtZW50Jy4gRGlkIHlvdSBtZWFuXG4vLyAnSFRNTExJRWxlbWVudCc/XG4vL1xuLy8gMTg3ICAgICBmcm9tSW1hZ2UoaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50LCBvcHRpb25zPzogVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMpOlxuLy8gUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XG4vL1xuLy8gbm9kZV9tb2R1bGVzL0B3ZWJncHUvdHlwZXMvZGlzdC9pbmRleC5kLnRzOjgzOjcgLSBlcnJvciBUUzI1NTI6IENhbm5vdCBmaW5kIG5hbWUgJ0hUTUxJbWFnZUVsZW1lbnQnLiBEaWQgeW91IG1lYW5cbi8vICdIVE1MTElFbGVtZW50Jz9cbi8vXG4vLyA4MyAgICAgfCBIVE1MSW1hZ2VFbGVtZW50XG4vLyAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XG4vL1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyBgSFRNTEltYWdlRWxlbWVudGAgaXMgb25seSB1c2VkIGluIHR5cGUgZGVjbGFyYXRpb24gYW5kIG5vdCBpbiByZWFsIGNvZGUuIFNvIHdlIGRlZmluZSBpdCBhcyBgdW5rbm93bmAgaGVyZSB0b1xuLy8gYnlwYXNzIHRoZSB0eXBlIGNoZWNrLlxuXG4vL1xuLy8gKiB0eXBlIGhhY2sgZm9yIFwiZG9jdW1lbnRcIlxuLy9cbi8vIGluIHR5cGVzY3JpcHQsIHRoZSB0eXBlIG9mIFwiZG9jdW1lbnRcIiBpcyBkZWZpbmVkIGluIGxpYi5kb20uZC50cywgc28gaXQncyBub3QgYXZhaWxhYmxlIGluIHdlYndvcmtlci5cbi8vXG4vLyB3ZSB3aWxsIGdldCB0aGUgZm9sbG93aW5nIGVycm9ycyBjb21wbGFpbmluZyB0aGF0IGRvY3VtZW50IGlzIG5vdCBkZWZpbmVkOlxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHM6NzozMyAtIGVycm9yIFRTMjU4NDogQ2Fubm90IGZpbmQgbmFtZSAnZG9jdW1lbnQnLiBEbyB5b3UgbmVlZCB0byBjaGFuZ2UgeW91ciB0YXJnZXRcbi8vIGxpYnJhcnk/IFRyeSBjaGFuZ2luZyB0aGUgJ2xpYicgY29tcGlsZXIgb3B0aW9uIHRvIGluY2x1ZGUgJ2RvbScuXG4vL1xuLy8gNyBleHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5cbi8vXG4vLyBsaWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50czo3OjYxIC0gZXJyb3IgVFMyNTg0OiBDYW5ub3QgZmluZCBuYW1lICdkb2N1bWVudCcuIERvIHlvdSBuZWVkIHRvIGNoYW5nZSB5b3VyIHRhcmdldFxuLy8gbGlicmFyeT8gVHJ5IGNoYW5naW5nIHRoZSAnbGliJyBjb21waWxlciBvcHRpb24gdG8gaW5jbHVkZSAnZG9tJy5cbi8vXG4vLyA3IGV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gKGRvY3VtZW50Py5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5cbi8vXG4vLyBsaWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50czo3Ojg4IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MU2NyaXB0RWxlbWVudCcuIERpZCB5b3UgbWVhblxuLy8gJ0hUTUxMSUVsZW1lbnQnP1xuLy9cbi8vIDcgZXhwb3J0IGNvbnN0IHNjcmlwdFNyYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAoZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmMgOlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+flxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyBgZG9jdW1lbnRgIGlzIHVzZWQgdG8gZ2V0IHRoZSBjdXJyZW50IHNjcmlwdCBVUkwsIHdoaWNoIGlzIG5vdCBhdmFpbGFibGUgaW4gd2Vid29ya2VyLiBUaGlzIGZpbGUgaXMgc2VydmVkIGFzIGFcbi8vIFwiZHVhbFwiIGZpbGUgZm9yIGVudHJpZXMgb2YgYm90aCB3ZWJ3b3JrZXIgYW5kIHRoZSBlc20gbW9kdWxlLlxuLy9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdHlwZSBIVE1MSW1hZ2VFbGVtZW50ID0gdW5rbm93bjtcbiAgdHlwZSBIVE1MU2NyaXB0RWxlbWVudCA9IHsgc3JjPzogc3RyaW5nIH07XG4gIGNvbnN0IGRvY3VtZW50OiB1bmRlZmluZWQgfCB7IGN1cnJlbnRTY3JpcHQ/OiBIVE1MU2NyaXB0RWxlbWVudCB9O1xufVxuXG4vKipcbiAqIEBzdW1tYXJ5XG4gKlxuICogVGhpcyBmaWxlIGlzIHNlcnZlZCBhcyBhIFwiZHVhbFwiIGZpbGUgZm9yIGJvdGggZW50cmllcyBvZiB0aGUgZm9sbG93aW5nOlxuICogLSBUaGUgcHJveHkgd29ya2VyIGl0c2VsZi5cbiAqICAgLSBXaGVuIHVzZWQgYXMgYSB3b3JrZXIsIGl0IGxpc3RlbnMgdG8gdGhlIG1lc3NhZ2VzIGZyb20gdGhlIG1haW4gdGhyZWFkIGFuZCBwZXJmb3JtcyB0aGUgY29ycmVzcG9uZGluZyBvcGVyYXRpb25zLlxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCBkaXJlY3RseSB1c2luZyBgbmV3IFdvcmtlcigpYCBpbiB0aGUgbWFpbiB0aHJlYWQuXG4gKlxuICogLSBUaGUgRVNNIG1vZHVsZSB0aGF0IGNyZWF0ZXMgdGhlIHByb3h5IHdvcmtlciAoYXMgYSB3b3JrZXIgbGF1bmNoZXIpLlxuICogICAtIFdoZW4gdXNlZCBhcyBhIHdvcmtlciBsYXVuY2hlciwgaXQgY3JlYXRlcyB0aGUgcHJveHkgd29ya2VyIGFuZCByZXR1cm5zIGl0LlxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCB1c2luZyBgaW1wb3J0KClgIGluIHRoZSBtYWluIHRocmVhZCwgd2l0aCB0aGUgcXVlcnkgcGFyYW1ldGVyIGBpbXBvcnQ9MWAuXG4gKlxuICogVGhpcyBmaWxlIHdpbGwgYmUgYWx3YXlzIGNvbXBpbGluZyBpbnRvIEVTTSBmb3JtYXQuXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTWVzc2FnZSwgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEgfSBmcm9tICcuLi9wcm94eS1tZXNzYWdlcy5qcyc7XG5pbXBvcnQge1xuICBjcmVhdGVTZXNzaW9uLFxuICBjb3B5RnJvbUV4dGVybmFsQnVmZmVyLFxuICBlbmRQcm9maWxpbmcsXG4gIGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzLFxuICBpbml0RXAsXG4gIGluaXRSdW50aW1lLFxuICByZWxlYXNlU2Vzc2lvbixcbiAgcnVuLFxufSBmcm9tICcuLi93YXNtLWNvcmUtaW1wbC5qcyc7XG5pbXBvcnQgeyBpbml0aWFsaXplV2ViQXNzZW1ibHkgfSBmcm9tICcuLi93YXNtLWZhY3RvcnkuanMnO1xuaW1wb3J0IHsgc2NyaXB0U3JjIH0gZnJvbSAnLi4vd2FzbS11dGlscy1pbXBvcnQuanMnO1xuXG5jb25zdCBXT1JLRVJfTkFNRSA9ICdvcnQtd2FzbS1wcm94eS13b3JrZXInO1xuY29uc3QgaXNQcm94eVdvcmtlciA9IGdsb2JhbFRoaXMuc2VsZj8ubmFtZSA9PT0gV09SS0VSX05BTUU7XG5cbmlmIChpc1Byb3h5V29ya2VyKSB7XG4gIC8vIFdvcmtlciB0aHJlYWRcbiAgc2VsZi5vbm1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudDxPcnRXYXNtTWVzc2FnZT4pOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IHR5cGUsIGluOiBtZXNzYWdlIH0gPSBldi5kYXRhO1xuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnaW5pdC13YXNtJzpcbiAgICAgICAgICBpbml0aWFsaXplV2ViQXNzZW1ibHkobWVzc2FnZSEud2FzbSkudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgaW5pdFJ1bnRpbWUobWVzc2FnZSEpLnRoZW4oXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdpbml0LWVwJzoge1xuICAgICAgICAgIGNvbnN0IHsgZXBOYW1lLCBlbnYgfSA9IG1lc3NhZ2UhO1xuICAgICAgICAgIGluaXRFcChlbnYsIGVwTmFtZSkudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnY29weS1mcm9tJzoge1xuICAgICAgICAgIGNvbnN0IHsgYnVmZmVyIH0gPSBtZXNzYWdlITtcbiAgICAgICAgICBjb25zdCBidWZmZXJEYXRhID0gY29weUZyb21FeHRlcm5hbEJ1ZmZlcihidWZmZXIpO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgb3V0OiBidWZmZXJEYXRhIH0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NyZWF0ZSc6IHtcbiAgICAgICAgICBjb25zdCB7IG1vZGVsLCBvcHRpb25zIH0gPSBtZXNzYWdlITtcbiAgICAgICAgICBjcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKS50aGVuKFxuICAgICAgICAgICAgKHNlc3Npb25NZXRhZGF0YSkgPT4ge1xuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIG91dDogc2Vzc2lvbk1ldGFkYXRhIH0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncmVsZWFzZSc6XG4gICAgICAgICAgcmVsZWFzZVNlc3Npb24obWVzc2FnZSEpO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncnVuJzoge1xuICAgICAgICAgIGNvbnN0IHsgc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9ucyB9ID0gbWVzc2FnZSE7XG4gICAgICAgICAgcnVuKHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG5ldyBBcnJheShvdXRwdXRJbmRpY2VzLmxlbmd0aCkuZmlsbChudWxsKSwgb3B0aW9ucykudGhlbihcbiAgICAgICAgICAgIChvdXRwdXRzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChvdXRwdXRzLnNvbWUoKG8pID0+IG9bM10gIT09ICdjcHUnKSkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyOiAnUHJveHkgZG9lcyBub3Qgc3VwcG9ydCBub24tY3B1IHRlbnNvciBsb2NhdGlvbi4nIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgeyB0eXBlLCBvdXQ6IG91dHB1dHMgfSBhcyBPcnRXYXNtTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgIGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzKFsuLi5pbnB1dHMsIC4uLm91dHB1dHNdIGFzIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10pLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2VuZC1wcm9maWxpbmcnOlxuICAgICAgICAgIGVuZFByb2ZpbGluZyhtZXNzYWdlISk7XG4gICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1Byb3h5V29ya2VyXG4gID8gbnVsbFxuICA6ICh1cmxPdmVycmlkZT86IHN0cmluZykgPT5cbiAgICAgIG5ldyBXb3JrZXIodXJsT3ZlcnJpZGUgPz8gc2NyaXB0U3JjISwgeyB0eXBlOiBCVUlMRF9ERUZTLklTX0VTTSA/ICdtb2R1bGUnIDogJ2NsYXNzaWMnLCBuYW1lOiBXT1JLRVJfTkFNRSB9KTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTW9kdWxlIH0gZnJvbSAnLi93YXNtLXR5cGVzJztcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vd2FzbS11dGlscy1lbnYnO1xuXG4vKipcbiAqIFRoZSBvcmlnaW4gb2YgdGhlIGN1cnJlbnQgbG9jYXRpb24uXG4gKlxuICogSW4gTm9kZS5qcywgdGhpcyBpcyB1bmRlZmluZWQuXG4gKi9cbmNvbnN0IG9yaWdpbiA9IGlzTm9kZSB8fCB0eXBlb2YgbG9jYXRpb24gPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogbG9jYXRpb24ub3JpZ2luO1xuXG4vKipcbiAqIFNvbWUgYnVuZGxlcnMgKGVnLiBXZWJwYWNrKSB3aWxsIHJld3JpdGUgYGltcG9ydC5tZXRhLnVybGAgdG8gYSBmaWxlIFVSTCBhdCBjb21waWxlIHRpbWUuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgYGltcG9ydC5tZXRhLnVybGAgc3RhcnRzIHdpdGggYGZpbGU6YCwgYnV0IHVzaW5nIHRoZSBgPmAgYW5kIGA8YCBvcGVyYXRvcnMgaW5zdGVhZCBvZlxuICogYHN0YXJ0c1dpdGhgIGZ1bmN0aW9uIHNvIHRoYXQgY29kZSBtaW5pbWl6ZXJzIGNhbiByZW1vdmUgdGhlIGRlYWQgY29kZSBjb3JyZWN0bHkuXG4gKlxuICogRm9yIGV4YW1wbGUsIGlmIHdlIHVzZSB0ZXJzZXIgdG8gbWluaWZ5IHRoZSBmb2xsb3dpbmcgY29kZTpcbiAqIGBgYGpzXG4gKiBpZiAoXCJmaWxlOi8vaGFyZC1jb2RlZC1maWxlbmFtZVwiLnN0YXJ0c1dpdGgoXCJmaWxlOlwiKSkge1xuICogICBjb25zb2xlLmxvZygxKVxuICogfSBlbHNlIHtcbiAqICAgY29uc29sZS5sb2coMilcbiAqIH1cbiAqXG4gKiBpZiAoXCJmaWxlOi8vaGFyZC1jb2RlZC1maWxlbmFtZVwiID4gXCJmaWxlOlwiICYmIFwiZmlsZTovL2hhcmQtY29kZWQtZmlsZW5hbWVcIiA8IFwiZmlsZTtcIikge1xuICogICBjb25zb2xlLmxvZygzKVxuICogfSBlbHNlIHtcbiAqICAgY29uc29sZS5sb2coNClcbiAqIH1cbiAqIGBgYFxuICpcbiAqIFRoZSBtaW5pZmllZCBjb2RlIHdpbGwgYmU6XG4gKiBgYGBqc1xuICogXCJmaWxlOi8vaGFyZC1jb2RlZC1maWxlbmFtZVwiLnN0YXJ0c1dpdGgoXCJmaWxlOlwiKT9jb25zb2xlLmxvZygxKTpjb25zb2xlLmxvZygyKSxjb25zb2xlLmxvZygzKTtcbiAqIGBgYFxuICpcbiAqICh1c2UgVGVyc2VyIDUuMzkuMCB3aXRoIGRlZmF1bHQgb3B0aW9ucywgaHR0cHM6Ly90cnkudGVyc2VyLm9yZy8pXG4gKlxuICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgaW1wb3J0Lm1ldGEudXJsIGlzIGhhcmRjb2RlZCBhcyBhIGZpbGUgVVJJLlxuICovXG5leHBvcnQgY29uc3QgaXNFc21JbXBvcnRNZXRhVXJsSGFyZGNvZGVkQXNGaWxlVXJpID1cbiAgQlVJTERfREVGUy5JU19FU00gJiYgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMISA+ICdmaWxlOicgJiYgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMISA8ICdmaWxlOyc7XG5cbmNvbnN0IGdldFNjcmlwdFNyYyA9ICgpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICAvLyBpZiBOb2RlanMsIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKGlzTm9kZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgLy8gaWYgSXQncyBFU00sIHVzZSBpbXBvcnQubWV0YS51cmxcbiAgaWYgKEJVSUxEX0RFRlMuSVNfRVNNKSB7XG4gICAgLy8gRm9yIEVTTSwgaWYgdGhlIGltcG9ydC5tZXRhLnVybCBpcyBhIGZpbGUgVVJMLCB0aGlzIHVzdWFsbHkgbWVhbnMgdGhlIGJ1bmRsZXIgcmV3cml0ZXMgYGltcG9ydC5tZXRhLnVybGAgdG9cbiAgICAvLyB0aGUgZmlsZSBwYXRoIGF0IGNvbXBpbGUgdGltZS4gSW4gdGhpcyBjYXNlLCB0aGlzIGZpbGUgcGF0aCBjYW5ub3QgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHJ1bnRpbWUgVVJMLlxuICAgIC8vXG4gICAgLy8gV2UgbmVlZCB0byB1c2UgdGhlIFVSTCBjb25zdHJ1Y3RvciBsaWtlIHRoaXM6XG4gICAgLy8gYGBganNcbiAgICAvLyBuZXcgVVJMKCdhY3R1YWwtYnVuZGxlLW5hbWUuanMnLCBpbXBvcnQubWV0YS51cmwpLmhyZWZcbiAgICAvLyBgYGBcbiAgICAvLyBTbyB0aGF0IGJ1bmRsZXIgY2FuIHByZXByb2Nlc3MgdGhlIFVSTCBjb3JyZWN0bHkuXG4gICAgaWYgKGlzRXNtSW1wb3J0TWV0YVVybEhhcmRjb2RlZEFzRmlsZVVyaSkge1xuICAgICAgLy8gaWYgdGhlIHJld3JpdHRlbiBVUkwgaXMgYSByZWxhdGl2ZSBwYXRoLCB3ZSBuZWVkIHRvIHVzZSB0aGUgb3JpZ2luIHRvIHJlc29sdmUgdGhlIFVSTC5cblxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBpcyBhIHdvcmthcm91bmQgZm9yIFZpdGUuXG4gICAgICAvL1xuICAgICAgLy8gVml0ZSB1c2VzIGEgYnVuZGxlcihyb2xsdXAvcm9sbGRvd24pIHRoYXQgZG9lcyBub3QgcmV3cml0ZSBgaW1wb3J0Lm1ldGEudXJsYCB0byBhIGZpbGUgVVJMLiBTbyBpbiB0aGVvcnksIHRoaXNcbiAgICAgIC8vIGNvZGUgcGF0aCBzaG91bGQgbm90IGJlIGV4ZWN1dGVkIGluIFZpdGUuIEhvd2V2ZXIsIHRoZSBidW5kbGVyIGRvZXMgbm90IGtub3cgaXQgYW5kIGl0IHN0aWxsIHRyeSB0byBsb2FkIHRoZVxuICAgICAgLy8gZm9sbG93aW5nIHBhdHRlcm46XG4gICAgICAvLyAtIGByZXR1cm4gbmV3IFVSTCgnZmlsZW5hbWUnLCBpbXBvcnQubWV0YS51cmwpLmhyZWZgXG4gICAgICAvL1xuICAgICAgLy8gQnkgcmVwbGFjaW5nIHRoZSBwYXR0ZXJuIGFib3ZlIHdpdGggdGhlIGZvbGxvd2luZyBjb2RlLCB3ZSBjYW4gc2tpcCB0aGUgcmVzb3VyY2UgbG9hZGluZyBiZWhhdmlvcjpcbiAgICAgIC8vIC0gYGNvbnN0IFVSTDIgPSBVUkw7IHJldHVybiBuZXcgVVJMMignZmlsZW5hbWUnLCBpbXBvcnQubWV0YS51cmwpLmhyZWY7YFxuICAgICAgLy9cbiAgICAgIC8vIEFuZCBpdCBzdGlsbCB3b3JrcyBpbiBXZWJwYWNrLlxuICAgICAgY29uc3QgVVJMMiA9IFVSTDtcbiAgICAgIHJldHVybiBuZXcgVVJMKG5ldyBVUkwyKEJVSUxEX0RFRlMuQlVORExFX0ZJTEVOQU1FLCBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwpLmhyZWYsIG9yaWdpbikuaHJlZjtcbiAgICB9XG5cbiAgICByZXR1cm4gQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IChkb2N1bWVudC5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjXG4gICAgOiAvLyB1c2UgYHNlbGYubG9jYXRpb24uaHJlZmAgaWYgYXZhaWxhYmxlXG4gICAgICB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gc2VsZi5sb2NhdGlvbj8uaHJlZlxuICAgICAgOiB1bmRlZmluZWQ7XG59O1xuXG4vKipcbiAqIFRoZSBjbGFzc2ljIHNjcmlwdCBzb3VyY2UgVVJMLiBUaGlzIGlzIG5vdCBhbHdheXMgYXZhaWxhYmxlIGluIG5vbiBFU01vZHVsZSBlbnZpcm9ubWVudHMuXG4gKlxuICogSW4gTm9kZS5qcywgdGhpcyBpcyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSBnZXRTY3JpcHRTcmMoKTtcblxuLyoqXG4gKiBJbmZlciB0aGUgd2FzbSBwYXRoIHByZWZpeCBmcm9tIHRoZSBzY3JpcHQgc291cmNlIFVSTC5cbiAqXG4gKiBAcmV0dXJucyBUaGUgaW5mZXJyZWQgd2FzbSBwYXRoIHByZWZpeCwgb3IgdW5kZWZpbmVkIGlmIHRoZSBzY3JpcHQgc291cmNlIFVSTCBpcyBub3QgYXZhaWxhYmxlIG9yIGlzIGEgYmxvYiBVUkwuXG4gKi9cbmV4cG9ydCBjb25zdCBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYyA9ICgpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoc2NyaXB0U3JjICYmICFzY3JpcHRTcmMuc3RhcnRzV2l0aCgnYmxvYjonKSkge1xuICAgIHJldHVybiBzY3JpcHRTcmMuc3Vic3RyaW5nKDAsIHNjcmlwdFNyYy5sYXN0SW5kZXhPZignLycpICsgMSk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGZpbGVuYW1lIHdpdGggcHJlZml4IGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLlxuICovXG5jb25zdCBpc1NhbWVPcmlnaW4gPSAoZmlsZW5hbWU6IHN0cmluZywgcHJlZml4T3ZlcnJpZGU/OiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlVXJsID0gcHJlZml4T3ZlcnJpZGUgPz8gc2NyaXB0U3JjO1xuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgPyBuZXcgVVJMKGZpbGVuYW1lLCBiYXNlVXJsKSA6IG5ldyBVUkwoZmlsZW5hbWUpO1xuICAgIHJldHVybiB1cmwub3JpZ2luID09PSBvcmlnaW47XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGlucHV0cyB0byBhbiBhYnNvbHV0ZSBVUkwgd2l0aCB0aGUgZ2l2ZW4gcHJlZml4IG92ZXJyaWRlLiBJZiBmYWlsZWQsIHJldHVybiB1bmRlZmluZWQuXG4gKi9cbmNvbnN0IG5vcm1hbGl6ZVVybCA9IChmaWxlbmFtZTogc3RyaW5nLCBwcmVmaXhPdmVycmlkZT86IHN0cmluZykgPT4ge1xuICBjb25zdCBiYXNlVXJsID0gcHJlZml4T3ZlcnJpZGUgPz8gc2NyaXB0U3JjO1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgPyBuZXcgVVJMKGZpbGVuYW1lLCBiYXNlVXJsKSA6IG5ldyBVUkwoZmlsZW5hbWUpO1xuICAgIHJldHVybiB1cmwuaHJlZjtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBmYWxsYmFjayBVUkwgaWYgYW4gYWJzb2x1dGUgVVJMIGNhbm5vdCBiZSBjcmVhdGVkIGJ5IHRoZSBub3JtYWxpemVVcmwgZnVuY3Rpb24uXG4gKi9cbmNvbnN0IGZhbGxiYWNrVXJsID0gKGZpbGVuYW1lOiBzdHJpbmcsIHByZWZpeE92ZXJyaWRlPzogc3RyaW5nKSA9PiBgJHtwcmVmaXhPdmVycmlkZSA/PyAnLi8nfSR7ZmlsZW5hbWV9YDtcblxuLyoqXG4gKiBUaGlzIGhlbHBlciBmdW5jdGlvbiBpcyB1c2VkIHRvIHByZWxvYWQgYSBtb2R1bGUgZnJvbSBhIFVSTC5cbiAqXG4gKiBJZiB0aGUgb3JpZ2luIG9mIHRoZSB3b3JrZXIgVVJMIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IG9yaWdpbiwgdGhlIHdvcmtlciBjYW5ub3QgYmUgbG9hZGVkIGRpcmVjdGx5LlxuICogU2VlIGRpc2N1c3Npb25zIGluIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvd29ya2VyLWxvYWRlci9pc3N1ZXMvMTU0XG4gKlxuICogSW4gdGhpcyBjYXNlLCB3ZSB3aWxsIGZldGNoIHRoZSB3b3JrZXIgVVJMIGFuZCBjcmVhdGUgYSBuZXcgQmxvYiBVUkwgd2l0aCB0aGUgc2FtZSBvcmlnaW4gYXMgYSB3b3JrYXJvdW5kLlxuICpcbiAqIEBwYXJhbSBhYnNvbHV0ZVVybCAtIFRoZSBhYnNvbHV0ZSBVUkwgdG8gcHJlbG9hZC5cbiAqXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbmV3IEJsb2IgVVJMXG4gKi9cbmNvbnN0IHByZWxvYWQgPSBhc3luYyAoYWJzb2x1dGVVcmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYWJzb2x1dGVVcmwsIHsgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicgfSk7XG4gIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xufTtcblxuLyoqXG4gKiBUaGlzIGhlbHBlciBmdW5jdGlvbiBpcyB1c2VkIHRvIGR5bmFtaWNhbGx5IGltcG9ydCBhIG1vZHVsZSBmcm9tIGEgVVJMLlxuICpcbiAqIFRoZSBidWlsZCBzY3JpcHQgaGFzIHNwZWNpYWwgaGFuZGxpbmcgZm9yIHRoaXMgZnVuY3Rpb24gdG8gZW5zdXJlIHRoYXQgdGhlIFVSTCBpcyBub3QgYnVuZGxlZCBpbnRvIHRoZSBmaW5hbCBvdXRwdXQuXG4gKlxuICogQHBhcmFtIHVybCAtIFRoZSBVUkwgdG8gaW1wb3J0LlxuICpcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGRlZmF1bHQgZXhwb3J0IG9mIHRoZSBtb2R1bGUuXG4gKi9cbmNvbnN0IGR5bmFtaWNJbXBvcnREZWZhdWx0ID0gYXN5bmMgPFQ+KHVybDogc3RyaW5nKTogUHJvbWlzZTxUPiA9PlxuICAoYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdXJsKSkuZGVmYXVsdDtcblxuLyoqXG4gKiBUaGUgcHJveHkgd29ya2VyIGZhY3RvcnkgaW1wb3J0ZWQgZnJvbSB0aGUgcHJveHkgd29ya2VyIG1vZHVsZS5cbiAqXG4gKiBUaGlzIGlzIG9ubHkgYXZhaWxhYmxlIHdoZW4gdGhlIFdlYkFzc2VtYmx5IHByb3h5IGlzIG5vdCBkaXNhYmxlZC5cbiAqL1xuY29uc3QgY3JlYXRlUHJveHlXb3JrZXI6ICgodXJsT3ZlcnJpZGU/OiBzdHJpbmcpID0+IFdvcmtlcikgfCB1bmRlZmluZWQgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuICBCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSA/IHVuZGVmaW5lZCA6IHJlcXVpcmUoJy4vcHJveHktd29ya2VyL21haW4nKS5kZWZhdWx0O1xuXG4vKipcbiAqIEltcG9ydCB0aGUgcHJveHkgd29ya2VyLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHM6XG4gKiAxLiBJZiBhIHByZWxvYWQgaXMgbmVlZGVkLCBpdCB3aWxsIHByZWxvYWQgdGhlIG1vZHVsZSBhbmQgcmV0dXJuIHRoZSBvYmplY3QgVVJMLlxuICogMi4gVXNlIHRoZSBwcm94eSB3b3JrZXIgZmFjdG9yeSB0byBjcmVhdGUgdGhlIHByb3h5IHdvcmtlci5cbiAqXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgb2YgMiBlbGVtZW50czpcbiAqICAgICAgICAgICAgLSBUaGUgb2JqZWN0IFVSTCBvZiB0aGUgcHJlbG9hZGVkIG1vZHVsZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHByZWxvYWQgaXMgbmVlZGVkLlxuICogICAgICAgICAgICAtIFRoZSBwcm94eSB3b3JrZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBpbXBvcnRQcm94eVdvcmtlciA9IGFzeW5jICgpOiBQcm9taXNlPFt1bmRlZmluZWQgfCBzdHJpbmcsIFdvcmtlcl0+ID0+IHtcbiAgaWYgKCFzY3JpcHRTcmMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIHByb3h5IHdvcmtlcjogY2Fubm90IGRldGVybWluZSB0aGUgc2NyaXB0IHNvdXJjZSBVUkwuJyk7XG4gIH1cblxuICAvLyBJZiB0aGUgc2NyaXB0IHNvdXJjZSBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbiwgd2UgY2FuIHVzZSB0aGUgZW1iZWRkZWQgcHJveHkgbW9kdWxlIGRpcmVjdGx5LlxuICBpZiAoaXNTYW1lT3JpZ2luKHNjcmlwdFNyYykpIHtcbiAgICByZXR1cm4gW3VuZGVmaW5lZCwgY3JlYXRlUHJveHlXb3JrZXIhKCldO1xuICB9XG5cbiAgLy8gT3RoZXJ3aXNlLCBuZWVkIHRvIHByZWxvYWRcbiAgY29uc3QgdXJsID0gYXdhaXQgcHJlbG9hZChzY3JpcHRTcmMpO1xuICByZXR1cm4gW3VybCwgY3JlYXRlUHJveHlXb3JrZXIhKHVybCldO1xufTtcblxuLyoqXG4gKiBUaGUgZW1iZWRkZWQgV2ViQXNzZW1ibHkgbW9kdWxlLlxuICpcbiAqIFRoaXMgaXMgb25seSBhdmFpbGFibGUgaW4gRVNNIGFuZCB3aGVuIGVtYmVkZGluZyBpcyBub3QgZGlzYWJsZWQuXG4gKi9cbmNvbnN0IGVtYmVkZGVkV2FzbU1vZHVsZTogRW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT4gfCB1bmRlZmluZWQgPVxuICBCVUlMRF9ERUZTLklTX0VTTSAmJiBCVUlMRF9ERUZTLkVOQUJMRV9CVU5ETEVfV0FTTV9KU1xuICAgID8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbiAgICAgIHJlcXVpcmUoXG4gICAgICAgICFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUFxuICAgICAgICAgID8gJy4uLy4uL2Rpc3Qvb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qcydcbiAgICAgICAgICA6ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVXG4gICAgICAgICAgICA/ICcuLi8uLi9kaXN0L29ydC13YXNtLXNpbWQtdGhyZWFkZWQuYXN5bmNpZnkubWpzJ1xuICAgICAgICAgICAgOiAnLi4vLi4vZGlzdC9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLm1qcycsXG4gICAgICApLmRlZmF1bHRcbiAgICA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBJbXBvcnQgdGhlIFdlYkFzc2VtYmx5IG1vZHVsZS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgcGVyZm9ybSB0aGUgZm9sbG93aW5nIHN0ZXBzOlxuICogMS4gSWYgdGhlIGVtYmVkZGVkIG1vZHVsZSBleGlzdHMgYW5kIG5vIGN1c3RvbSBVUkwgaXMgc3BlY2lmaWVkLCB1c2UgdGhlIGVtYmVkZGVkIG1vZHVsZS5cbiAqIDIuIElmIGEgcHJlbG9hZCBpcyBuZWVkZWQsIGl0IHdpbGwgcHJlbG9hZCB0aGUgbW9kdWxlIGFuZCByZXR1cm4gdGhlIG9iamVjdCBVUkwuXG4gKiAzLiBPdGhlcndpc2UsIGl0IHdpbGwgcGVyZm9ybSBhIGR5bmFtaWMgaW1wb3J0IG9mIHRoZSBtb2R1bGUuXG4gKlxuICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHR1cGxlIG9mIDIgZWxlbWVudHM6XG4gKiAgICAgICAgICAgIC0gVGhlIG9iamVjdCBVUkwgb2YgdGhlIHByZWxvYWRlZCBtb2R1bGUsIG9yIHVuZGVmaW5lZCBpZiBubyBwcmVsb2FkIGlzIG5lZWRlZC5cbiAqICAgICAgICAgICAgLSBUaGUgZGVmYXVsdCBleHBvcnQgb2YgdGhlIG1vZHVsZSwgd2hpY2ggaXMgYSBmYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGUgV2ViQXNzZW1ibHkgbW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgaW1wb3J0V2FzbU1vZHVsZSA9IGFzeW5jIChcbiAgdXJsT3ZlcnJpZGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgcHJlZml4T3ZlcnJpZGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgaXNNdWx0aVRocmVhZGVkOiBib29sZWFuLFxuICBpc1dhc21PdmVycmlkZGVuOiBib29sZWFuLFxuKTogUHJvbWlzZTxbdW5kZWZpbmVkIHwgc3RyaW5nLCBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPl0+ID0+IHtcbiAgLy9cbiAgLy8gQ2hlY2sgaWYgd2Ugc2hvdWxkIHVzZSB0aGUgZW1iZWRkZWQgbW9kdWxlLlxuICAvL1xuXG4gIC8vIFRvIHVzZSB0aGUgZW1iZWRkZWQgbW9kdWxlLCBpdCBzaG91bGQgYmUgYXZhaWxhYmxlLCBhbmQgbm8gVVJMIG92ZXJyaWRlIG9yIHByZWZpeCBvdmVycmlkZSBzaG91bGQgYmUgc3BlY2lmaWVkLlxuICBsZXQgdXNlRW1iZWRkZWRNb2R1bGUgPSBlbWJlZGRlZFdhc21Nb2R1bGUgJiYgISh1cmxPdmVycmlkZSB8fCBwcmVmaXhPdmVycmlkZSk7XG4gIGlmICh1c2VFbWJlZGRlZE1vZHVsZSkge1xuICAgIGlmICghc2NyaXB0U3JjKSB7XG4gICAgICAvLyBubyBVUkwgaW5mbyBhdmFpbGFibGUuXG4gICAgICAvL1xuICAgICAgLy8gTm90ZTogd2hlbiB0aGUgZW1iZWRkZWQgbW9kdWxlIGlzIGF2YWlsYWJsZSwgaXQgbWVhbnMgdGhlIGN1cnJlbnQgc2NyaXB0IGlzIEVTTS4gVXN1YWxseSwgaW4gRVNNLCB0aGVcbiAgICAgIC8vIGBpbXBvcnQubWV0YS51cmxgIGlzIGF2YWlsYWJsZS4gQnV0IGluIHNvbWUgY2FzZXMgKGVnLiBDbG91ZGZsYXJlIFdvcmtlcnMpLCB0aGUgdmFsdWUgb2YgYGltcG9ydC5tZXRhLnVybGBcbiAgICAgIC8vIGNhbiBiZSBgbnVsbGAgb3IgYHVuZGVmaW5lZGAuIEluIHRoaXMgY2FzZSwgd2UgY2FuIG9ubHkgbG9hZCB0aGUgZW1iZWRkZWQgbW9kdWxlIHdoZW46XG4gICAgICAvL1xuICAgICAgLy8gMS4gVGhlIFdlYkFzc2VtYmx5IG1vZHVsZSBiaW5hcnkgaXMgb3ZlcnJpZGRlbjpcbiAgICAgIC8vICAgIGBgYGpzXG4gICAgICAvLyAgICBlbnYud2FzbS53YXNtUGF0aHMgPSB1bmRlZmluZWQ7ICAvLyBvciBub3Qgc3BlY2lmaWVkXG4gICAgICAvLyAgICBlbnYud2FzbS53YXNtQmluYXJ5ID0gLyogYSBVaW50OEFycmF5IGNvbnRhaW5pbmcgdGhlIFdlYkFzc2VtYmx5IGJpbmFyeSAqLztcbiAgICAgIC8vICAgIGBgYFxuICAgICAgLy9cbiAgICAgIC8vIDIuIFRoZSBcIi53YXNtXCIgb25seSBpcyBvdmVycmlkZGVuLlxuICAgICAgLy8gICAgYGBganNcbiAgICAgIC8vICAgIGVudi53YXNtLndhc21QYXRocyA9IHsgd2FzbTogLyogVVJMIG9mIHRoZSAud2FzbSBmaWxlICovIH07XG4gICAgICAvLyAgICBgYGBcbiAgICAgIC8vXG4gICAgICBpZiAoaXNXYXNtT3ZlcnJpZGRlbiAmJiAhaXNNdWx0aVRocmVhZGVkKSB7XG4gICAgICAgIHVzZUVtYmVkZGVkTW9kdWxlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGRldGVybWluZSB0aGUgc2NyaXB0IHNvdXJjZSBVUkwuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIHRoZSBzY3JpcHQgc291cmNlIGlzIGF2YWlsYWJsZSwgd2UgY2FuIGNoZWNrIGlmIGl0IGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLlxuICAgICAgdXNlRW1iZWRkZWRNb2R1bGUgPSBpc1NhbWVPcmlnaW4oc2NyaXB0U3JjKTtcbiAgICB9XG4gIH1cbiAgaWYgKHVzZUVtYmVkZGVkTW9kdWxlKSB7XG4gICAgcmV0dXJuIFt1bmRlZmluZWQsIGVtYmVkZGVkV2FzbU1vZHVsZSFdO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHdhc21Nb2R1bGVGaWxlbmFtZSA9ICFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUFxuICAgICAgPyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qcydcbiAgICAgIDogIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFVcbiAgICAgICAgPyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5hc3luY2lmeS5tanMnXG4gICAgICAgIDogJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQubWpzJztcbiAgICBjb25zdCB3YXNtTW9kdWxlVXJsID0gdXJsT3ZlcnJpZGUgPz8gbm9ybWFsaXplVXJsKHdhc21Nb2R1bGVGaWxlbmFtZSwgcHJlZml4T3ZlcnJpZGUpO1xuICAgIC8vIG5lZWQgdG8gcHJlbG9hZCBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gICAgLy8gMS4gbm90IGluIE5vZGUuanMuXG4gICAgLy8gICAgLSBOb2RlLmpzIGRvZXMgbm90IGhhdmUgdGhlIHNhbWUgb3JpZ2luIHBvbGljeSBmb3IgY3JlYXRpbmcgd29ya2Vycy5cbiAgICAvLyAyLiBtdWx0aS10aHJlYWRlZCBpcyBlbmFibGVkLlxuICAgIC8vICAgIC0gSWYgbXVsdGktdGhyZWFkZWQgaXMgZGlzYWJsZWQsIG5vIHdvcmtlciB3aWxsIGJlIGNyZWF0ZWQuIFNvIHdlIGRvbid0IG5lZWQgdG8gcHJlbG9hZCB0aGUgbW9kdWxlLlxuICAgIC8vIDMuIHRoZSBhYnNvbHV0ZSBVUkwgaXMgYXZhaWxhYmxlLlxuICAgIC8vICAgIC0gSWYgdGhlIGFic29sdXRlIFVSTCBpcyBmYWlsZWQgdG8gYmUgY3JlYXRlZCwgdGhlIG9yaWdpbiBjYW5ub3QgYmUgZGV0ZXJtaW5lZC4gSW4gdGhpcyBjYXNlLCB3ZSB3aWxsIG5vdFxuICAgIC8vICAgIHByZWxvYWQgdGhlIG1vZHVsZS5cbiAgICAvLyA0LiB0aGUgd29ya2VyIFVSTCBpcyBub3QgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gICAgLy8gICAgLSBJZiB0aGUgd29ya2VyIFVSTCBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbiwgd2UgY2FuIGNyZWF0ZSB0aGUgd29ya2VyIGRpcmVjdGx5LlxuICAgIGNvbnN0IG5lZWRQcmVsb2FkID0gIWlzTm9kZSAmJiBpc011bHRpVGhyZWFkZWQgJiYgd2FzbU1vZHVsZVVybCAmJiAhaXNTYW1lT3JpZ2luKHdhc21Nb2R1bGVVcmwsIHByZWZpeE92ZXJyaWRlKTtcbiAgICBjb25zdCB1cmwgPSBuZWVkUHJlbG9hZFxuICAgICAgPyBhd2FpdCBwcmVsb2FkKHdhc21Nb2R1bGVVcmwpXG4gICAgICA6ICh3YXNtTW9kdWxlVXJsID8/IGZhbGxiYWNrVXJsKHdhc21Nb2R1bGVGaWxlbmFtZSwgcHJlZml4T3ZlcnJpZGUpKTtcbiAgICByZXR1cm4gW25lZWRQcmVsb2FkID8gdXJsIDogdW5kZWZpbmVkLCBhd2FpdCBkeW5hbWljSW1wb3J0RGVmYXVsdDxFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPj4odXJsKV07XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEVudiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB0eXBlIHsgT3J0V2FzbU1vZHVsZSB9IGZyb20gJy4vd2FzbS10eXBlcyc7XG5pbXBvcnQgeyBpbXBvcnRXYXNtTW9kdWxlLCBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYyB9IGZyb20gJy4vd2FzbS11dGlscy1pbXBvcnQnO1xuXG5sZXQgd2FzbTogT3J0V2FzbU1vZHVsZSB8IHVuZGVmaW5lZDtcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xubGV0IGFib3J0ZWQgPSBmYWxzZTtcblxuY29uc3QgaXNNdWx0aVRocmVhZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgLy8gSWYgJ1NoYXJlZEFycmF5QnVmZmVyJyBpcyBub3QgYXZhaWxhYmxlLCBXZWJBc3NlbWJseSB0aHJlYWRzIHdpbGwgbm90IHdvcmsuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBUZXN0IGZvciB0cmFuc2ZlcmFiaWxpdHkgb2YgU0FCcyAoZm9yIGJyb3dzZXJzLiBuZWVkZWQgZm9yIEZpcmVmb3gpXG4gICAgLy8gaHR0cHM6Ly9ncm91cHMuZ29vZ2xlLmNvbS9mb3J1bS8jIW1zZy9tb3ppbGxhLmRldi5wbGF0Zm9ybS9JSGtCWmxIRVRwQS9kd3NNTmNoV0VRQUpcbiAgICBpZiAodHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbmV3IE1lc3NhZ2VDaGFubmVsKCkucG9ydDEucG9zdE1lc3NhZ2UobmV3IFNoYXJlZEFycmF5QnVmZmVyKDEpKTtcbiAgICB9XG5cbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSB0aHJlYWRzIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgdGhyZWFkZWQgaW5zdHJ1Y3Rpb25zLlxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShcbiAgICAgIG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgMCwgOTcsIDExNSwgMTA5LCAxLCAwLCAwLCAwLCAxLCA0LCAxLCA5NiwgMCwgMCwgMywgMiwgMSwgMCwgNSwgNCwgMSwgMywgMSwgMSwgMTAsIDExLCAxLCA5LCAwLCA2NSwgMCwgMjU0LCAxNixcbiAgICAgICAgMiwgMCwgMjYsIDExLFxuICAgICAgXSksXG4gICAgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgaXNTaW1kU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICB0cnkge1xuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IFNJTUQgY2FwYWJpbGl0eSAoZm9yIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMpXG4gICAgLy8gVGhpcyB0eXBlZCBhcnJheSBpcyBhIFdlYkFzc2VtYmx5IHByb2dyYW0gY29udGFpbmluZyBTSU1EIGluc3RydWN0aW9ucy5cblxuICAgIC8vIFRoZSBiaW5hcnkgZGF0YSBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgZm9sbG93aW5nIGNvZGUgYnkgd2F0Mndhc206XG4gICAgLy9cbiAgICAvLyAobW9kdWxlXG4gICAgLy8gICAodHlwZSAkdDAgKGZ1bmMpKVxuICAgIC8vICAgKGZ1bmMgJGYwICh0eXBlICR0MClcbiAgICAvLyAgICAgKGRyb3BcbiAgICAvLyAgICAgICAoaTMyeDQuZG90X2kxNng4X3NcbiAgICAvLyAgICAgICAgIChpOHgxNi5zcGxhdFxuICAgIC8vICAgICAgICAgICAoaTMyLmNvbnN0IDApKVxuICAgIC8vICAgICAgICAgKHYxMjguY29uc3QgaTMyeDQgMHgwMDAwMDAwMCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCkpKSkpXG5cbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUoXG4gICAgICBuZXcgVWludDhBcnJheShbXG4gICAgICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgNCwgMSwgOTYsIDAsIDAsIDMsIDIsIDEsIDAsIDEwLCAzMCwgMSwgMjgsIDAsIDY1LCAwLCAyNTMsIDE1LCAyNTMsIDEyLCAwLCAwLCAwLFxuICAgICAgICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAyNTMsIDE4NiwgMSwgMjYsIDExLFxuICAgICAgXSksXG4gICAgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgaXNSZWxheGVkU2ltZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSBSZWxheGVkIFNJTUQgY2FwYWJpbGl0eSAoZm9yIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMpXG4gICAgLy8gVGhpcyB0eXBlZCBhcnJheSBpcyBhIFdlYkFzc2VtYmx5IHByb2dyYW0gY29udGFpbmluZyBSZWxheGVkIFNJTUQgaW5zdHJ1Y3Rpb25zLlxuXG4gICAgLy8gVGhlIGJpbmFyeSBkYXRhIGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBmb2xsb3dpbmcgY29kZSBieSB3YXQyd2FzbTpcbiAgICAvLyAobW9kdWxlXG4gICAgLy8gICAoZnVuYyAocmVzdWx0IHYxMjgpXG4gICAgLy8gICAgICBpMzIuY29uc3QgMVxuICAgIC8vICAgICAgaTh4MTYuc3BsYXRcbiAgICAvLyAgICAgIGkzMi5jb25zdCAyXG4gICAgLy8gICAgICBpOHgxNi5zcGxhdFxuICAgIC8vICAgICAgaTMyLmNvbnN0IDNcbiAgICAvLyAgICAgIGk4eDE2LnNwbGF0XG4gICAgLy8gICAgICBpMzJ4NC5yZWxheGVkX2RvdF9pOHgxNl9pN3gxNl9hZGRfc1xuICAgIC8vICAgKVxuICAgIC8vICApXG4gICAgcmV0dXJuIFdlYkFzc2VtYmx5LnZhbGlkYXRlKFxuICAgICAgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDUsIDEsIDk2LCAwLCAxLCAxMjMsIDMsIDIsIDEsIDAsIDEwLCAxOSwgMSwgMTcsIDAsIDY1LCAxLCAyNTMsIDE1LCA2NSwgMiwgMjUzLFxuICAgICAgICAxNSwgNjUsIDMsIDI1MywgMTUsIDI1MywgMTQ3LCAyLCAxMSxcbiAgICAgIF0pLFxuICAgICk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplV2ViQXNzZW1ibHkgPSBhc3luYyAoZmxhZ3M6IEVudi5XZWJBc3NlbWJseUZsYWdzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgY2FsbHMgdG8gJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpJyBkZXRlY3RlZC5cIik7XG4gIH1cbiAgaWYgKGFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcmV2aW91cyBjYWxsIHRvICdpbml0aWFsaXplV2ViQXNzZW1ibHkoKScgZmFpbGVkLlwiKTtcbiAgfVxuXG4gIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgLy8gd2FzbSBmbGFncyBhcmUgYWxyZWFkeSBpbml0aWFsaXplZFxuICBjb25zdCB0aW1lb3V0ID0gZmxhZ3MuaW5pdFRpbWVvdXQhO1xuICBsZXQgbnVtVGhyZWFkcyA9IGZsYWdzLm51bVRocmVhZHMhO1xuXG4gIC8vIGVuc3VyZSBTSU1EIGlzIHN1cHBvcnRlZFxuICBpZiAoZmxhZ3Muc2ltZCA9PT0gZmFsc2UpIHtcbiAgICAvLyBza2lwIFNJTUQgZmVhdHVyZSBjaGVja2luZyBhcyBpdCBpcyBkaXNhYmxlZCBleHBsaWNpdGx5IGJ5IHVzZXJcbiAgfSBlbHNlIGlmIChmbGFncy5zaW1kID09PSAncmVsYXhlZCcpIHtcbiAgICAvLyBjaGVjayBpZiByZWxheGVkIFNJTUQgaXMgc3VwcG9ydGVkXG4gICAgaWYgKCFpc1JlbGF4ZWRTaW1kU3VwcG9ydGVkKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVsYXhlZCBXZWJBc3NlbWJseSBTSU1EIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuJyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFpc1NpbWRTdXBwb3J0ZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV2ViQXNzZW1ibHkgU0lNRCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LicpO1xuICB9XG5cbiAgLy8gY2hlY2sgaWYgbXVsdGktdGhyZWFkaW5nIGlzIHN1cHBvcnRlZFxuICBjb25zdCBtdWx0aVRocmVhZFN1cHBvcnRlZCA9IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQoKTtcbiAgaWYgKG51bVRocmVhZHMgPiAxICYmICFtdWx0aVRocmVhZFN1cHBvcnRlZCkge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgIXNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ2Vudi53YXNtLm51bVRocmVhZHMgaXMgc2V0IHRvICcgK1xuICAgICAgICAgIG51bVRocmVhZHMgK1xuICAgICAgICAgICcsIGJ1dCB0aGlzIHdpbGwgbm90IHdvcmsgdW5sZXNzIHlvdSBlbmFibGUgY3Jvc3NPcmlnaW5Jc29sYXRlZCBtb2RlLiAnICtcbiAgICAgICAgICAnU2VlIGh0dHBzOi8vd2ViLmRldi9jcm9zcy1vcmlnaW4taXNvbGF0aW9uLWd1aWRlLyBmb3IgbW9yZSBpbmZvLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1dlYkFzc2VtYmx5IG11bHRpLXRocmVhZGluZyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LiAnICsgJ0ZhbGxpbmcgYmFjayB0byBzaW5nbGUtdGhyZWFkaW5nLicsXG4gICAgKTtcblxuICAgIC8vIHNldCBmbGFncy5udW1UaHJlYWRzIHRvIDEgc28gdGhhdCBPcnRJbml0KCkgd2lsbCBub3QgY3JlYXRlIGEgZ2xvYmFsIHRocmVhZCBwb29sLlxuICAgIGZsYWdzLm51bVRocmVhZHMgPSBudW1UaHJlYWRzID0gMTtcbiAgfVxuXG4gIGNvbnN0IHdhc21QYXRocyA9IGZsYWdzLndhc21QYXRocztcbiAgY29uc3Qgd2FzbVByZWZpeE92ZXJyaWRlID0gdHlwZW9mIHdhc21QYXRocyA9PT0gJ3N0cmluZycgPyB3YXNtUGF0aHMgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IG1qc1BhdGhPdmVycmlkZUZsYWcgPSAod2FzbVBhdGhzIGFzIEVudi5XYXNtRmlsZVBhdGhzKT8ubWpzO1xuICBjb25zdCBtanNQYXRoT3ZlcnJpZGUgPSAobWpzUGF0aE92ZXJyaWRlRmxhZyBhcyBVUkwpPy5ocmVmID8/IG1qc1BhdGhPdmVycmlkZUZsYWc7XG4gIGNvbnN0IHdhc21QYXRoT3ZlcnJpZGVGbGFnID0gKHdhc21QYXRocyBhcyBFbnYuV2FzbUZpbGVQYXRocyk/Lndhc207XG4gIGNvbnN0IHdhc21QYXRoT3ZlcnJpZGUgPSAod2FzbVBhdGhPdmVycmlkZUZsYWcgYXMgVVJMKT8uaHJlZiA/PyB3YXNtUGF0aE92ZXJyaWRlRmxhZztcbiAgY29uc3Qgd2FzbUJpbmFyeU92ZXJyaWRlID0gZmxhZ3Mud2FzbUJpbmFyeTtcblxuICBjb25zdCBbb2JqZWN0VXJsLCBvcnRXYXNtRmFjdG9yeV0gPSBhd2FpdCBpbXBvcnRXYXNtTW9kdWxlKFxuICAgIG1qc1BhdGhPdmVycmlkZSxcbiAgICB3YXNtUHJlZml4T3ZlcnJpZGUsXG4gICAgbnVtVGhyZWFkcyA+IDEsXG4gICAgISF3YXNtQmluYXJ5T3ZlcnJpZGUgfHwgISF3YXNtUGF0aE92ZXJyaWRlLFxuICApO1xuXG4gIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcblxuICBjb25zdCB0YXNrczogQXJyYXk8UHJvbWlzZTx2b2lkPj4gPSBbXTtcblxuICAvLyBwcm9taXNlIGZvciB0aW1lb3V0XG4gIGlmICh0aW1lb3V0ID4gMCkge1xuICAgIHRhc2tzLnB1c2goXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpc1RpbWVvdXQgPSB0cnVlO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLy8gcHJvbWlzZSBmb3IgbW9kdWxlIGluaXRpYWxpemF0aW9uXG4gIHRhc2tzLnB1c2goXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY29uZmlnOiBQYXJ0aWFsPE9ydFdhc21Nb2R1bGU+ID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG51bWJlciBvZiB0aHJlYWRzLiBXZWJBc3NlbWJseSB3aWxsIGNyZWF0ZSAoTW9kdWxlLm51bVRocmVhZHMgLSAxKSB3b3JrZXJzLiBJZiBpdCBpcyAxLCBubyB3b3JrZXIgd2lsbCBiZVxuICAgICAgICAgKiBjcmVhdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgbnVtVGhyZWFkcyxcbiAgICAgIH07XG5cbiAgICAgIGlmICh3YXNtQmluYXJ5T3ZlcnJpZGUpIHtcbiAgICAgICAgLy8gU2V0IGEgY3VzdG9tIGJ1ZmZlciB3aGljaCBjb250YWlucyB0aGUgV2ViQXNzZW1ibHkgYmluYXJ5LiBUaGlzIHdpbGwgc2tpcCB0aGUgd2FzbSBmaWxlIGZldGNoaW5nLlxuICAgICAgICBjb25maWcud2FzbUJpbmFyeSA9IHdhc21CaW5hcnlPdmVycmlkZTtcbiAgICAgIH0gZWxzZSBpZiAod2FzbVBhdGhPdmVycmlkZSB8fCB3YXNtUHJlZml4T3ZlcnJpZGUpIHtcbiAgICAgICAgLy8gQSBjYWxsYmFjayBmdW5jdGlvbiB0byBsb2NhdGUgdGhlIFdlYkFzc2VtYmx5IGZpbGUuIFRoZSBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNpbmNlIEVtc2NyaXB0ZW4gMy4xLjU4LCB0aGlzIGZ1bmN0aW9uIGlzIG9ubHkgY2FsbGVkIGZvciB0aGUgLndhc20gZmlsZS5cbiAgICAgICAgY29uZmlnLmxvY2F0ZUZpbGUgPSAoZmlsZU5hbWUpID0+IHdhc21QYXRoT3ZlcnJpZGUgPz8gd2FzbVByZWZpeE92ZXJyaWRlICsgZmlsZU5hbWU7XG4gICAgICB9IGVsc2UgaWYgKG1qc1BhdGhPdmVycmlkZSAmJiBtanNQYXRoT3ZlcnJpZGUuaW5kZXhPZignYmxvYjonKSAhPT0gMCkge1xuICAgICAgICAvLyBpZiBtanMgcGF0aCBpcyBzcGVjaWZpZWQsIHVzZSBpdCBhcyB0aGUgYmFzZSBwYXRoIGZvciB0aGUgLndhc20gZmlsZS5cbiAgICAgICAgY29uZmlnLmxvY2F0ZUZpbGUgPSAoZmlsZU5hbWUpID0+IG5ldyBVUkwoZmlsZU5hbWUsIG1qc1BhdGhPdmVycmlkZSkuaHJlZjtcbiAgICAgIH0gZWxzZSBpZiAob2JqZWN0VXJsKSB7XG4gICAgICAgIGNvbnN0IGluZmVycmVkV2FzbVBhdGhQcmVmaXggPSBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYygpO1xuICAgICAgICBpZiAoaW5mZXJyZWRXYXNtUGF0aFByZWZpeCkge1xuICAgICAgICAgIC8vIGlmIHRoZSB3YXNtIG1vZHVsZSBpcyBwcmVsb2FkZWQsIHVzZSB0aGUgaW5mZXJyZWQgd2FzbSBwYXRoIGFzIHRoZSBiYXNlIHBhdGggZm9yIHRoZSAud2FzbSBmaWxlLlxuICAgICAgICAgIGNvbmZpZy5sb2NhdGVGaWxlID0gKGZpbGVOYW1lKSA9PiBpbmZlcnJlZFdhc21QYXRoUHJlZml4ICsgZmlsZU5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb3J0V2FzbUZhY3RvcnkoY29uZmlnKS50aGVuKFxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHlcbiAgICAgICAgKG1vZHVsZSkgPT4ge1xuICAgICAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICB3YXNtID0gbW9kdWxlO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICBpZiAob2JqZWN0VXJsKSB7XG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBmYWlsZWQgdG8gaW5pdGlhbGl6ZVxuICAgICAgICAod2hhdCkgPT4ge1xuICAgICAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICAgIHJlamVjdCh3aGF0KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSksXG4gICk7XG5cbiAgYXdhaXQgUHJvbWlzZS5yYWNlKHRhc2tzKTtcblxuICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBXZWJBc3NlbWJseSBiYWNrZW5kIGluaXRpYWxpemluZyBmYWlsZWQgZHVlIHRvIHRpbWVvdXQ6ICR7dGltZW91dH1tc2ApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5zdGFuY2UgPSAoKTogT3J0V2FzbU1vZHVsZSA9PiB7XG4gIGlmIChpbml0aWFsaXplZCAmJiB3YXNtKSB7XG4gICAgcmV0dXJuIHdhc207XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IGlzIG5vdCBpbml0aWFsaXplZCB5ZXQuJyk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlzcG9zZSA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKGluaXRpYWxpemVkICYmICFpbml0aWFsaXppbmcgJiYgIWFib3J0ZWQpIHtcbiAgICAvLyBUT0RPOiBjdXJyZW50bHkgXCJQVGhyZWFkLnRlcm1pbmF0ZUFsbFRocmVhZHMoKVwiIGlzIG5vdCBleHBvc2VkIGluIHRoZSB3YXNtIG1vZHVsZS5cbiAgICAvLyAgICAgICBBbmQgdGhpcyBmdW5jdGlvbiBpcyBub3QgeWV0IGNhbGxlZCBieSBhbnkgY29kZS5cbiAgICAvLyAgICAgICBJZiBpdCBpcyBuZWVkZWQgaW4gdGhlIGZ1dHVyZSwgd2Ugc2hvdWxkIGV4cG9zZSBpdCBpbiB0aGUgd2FzbSBtb2R1bGUgYW5kIHVuY29tbWVudCB0aGUgZm9sbG93aW5nIGxpbmUuXG5cbiAgICAvLyB3YXNtPy5QVGhyZWFkPy50ZXJtaW5hdGVBbGxUaHJlYWRzKCk7XG4gICAgd2FzbSA9IHVuZGVmaW5lZDtcblxuICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgYWJvcnRlZCA9IHRydWU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGdldEluc3RhbmNlIH0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuXG5leHBvcnQgY29uc3QgYWxsb2NXYXNtU3RyaW5nID0gKGRhdGE6IHN0cmluZywgYWxsb2NzOiBudW1iZXJbXSk6IG51bWJlciA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IGRhdGFMZW5ndGggPSB3YXNtLmxlbmd0aEJ5dGVzVVRGOChkYXRhKSArIDE7XG4gIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MoZGF0YUxlbmd0aCk7XG4gIHdhc20uc3RyaW5nVG9VVEY4KGRhdGEsIGRhdGFPZmZzZXQsIGRhdGFMZW5ndGgpO1xuICBhbGxvY3MucHVzaChkYXRhT2Zmc2V0KTtcblxuICByZXR1cm4gZGF0YU9mZnNldDtcbn07XG5cbmludGVyZmFjZSBFeHRyYU9wdGlvbnNIYW5kbGVyIHtcbiAgKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBpdGVyYXRlRXh0cmFPcHRpb25zID0gKFxuICBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgcHJlZml4OiBzdHJpbmcsXG4gIHNlZW46IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+LFxuICBoYW5kbGVyOiBFeHRyYU9wdGlvbnNIYW5kbGVyLFxuKTogdm9pZCA9PiB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0JyAmJiBvcHRpb25zICE9PSBudWxsKSB7XG4gICAgaWYgKHNlZW4uaGFzKG9wdGlvbnMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBpbiBvcHRpb25zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlZW4uYWRkKG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwcmVmaXggPyBwcmVmaXggKyBrZXkgOiBrZXk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIG5hbWUgKyAnLicsIHNlZW4sIGhhbmRsZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGhhbmRsZXIobmFtZSwgdmFsdWUgPyAnMScgOiAnMCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGhhbmRsZSBleHRyYSBjb25maWcgdHlwZTogJHt0eXBlb2YgdmFsdWV9YCk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICogY2hlY2sgd2ViIGFzc2VtYmx5IEFQSSdzIGxhc3QgZXJyb3IgYW5kIHRocm93IGVycm9yIGlmIGFueSBlcnJvciBvY2N1cnJlZC5cbiAqIEBwYXJhbSBtZXNzYWdlIGEgbWVzc2FnZSB1c2VkIHdoZW4gYW4gZXJyb3Igb2NjdXJyZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBjaGVja0xhc3RFcnJvciA9IChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICB0cnkge1xuICAgIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xuICAgIGNvbnN0IHBhcmFtc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYygyICogcHRyU2l6ZSk7XG4gICAgd2FzbS5fT3J0R2V0TGFzdEVycm9yKHBhcmFtc09mZnNldCwgcGFyYW1zT2Zmc2V0ICsgcHRyU2l6ZSk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUocGFyYW1zT2Zmc2V0LCBwdHJTaXplID09PSA0ID8gJ2kzMicgOiAnaTY0JykpO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZVBvaW50ZXIgPSB3YXNtLmdldFZhbHVlKHBhcmFtc09mZnNldCArIHB0clNpemUsICcqJyk7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlUG9pbnRlciA/IHdhc20uVVRGOFRvU3RyaW5nKGVycm9yTWVzc2FnZVBvaW50ZXIpIDogJyc7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9IEVSUk9SX0NPREU6ICR7ZXJyb3JDb2RlfSwgRVJST1JfTUVTU0FHRTogJHtlcnJvck1lc3NhZ2V9YCk7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHsgZ2V0SW5zdGFuY2UgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBhbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zIH0gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuZXhwb3J0IGNvbnN0IHNldFJ1bk9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcbiAgY29uc3QgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IHJ1bk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdHJ5IHtcbiAgICBpZiAob3B0aW9ucz8ubG9nU2V2ZXJpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPSAyOyAvLyBEZWZhdWx0IHRvIHdhcm5pbmdcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCAhPT0gJ251bWJlcicgfHxcbiAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCkgfHxcbiAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHxcbiAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA+IDRcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNldmVyaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmxvZ1ZlcmJvc2l0eUxldmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgPSAwOyAvLyBEZWZhdWx0IHRvIDBcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy50ZXJtaW5hdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy50ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgdGFnRGF0YU9mZnNldCA9IDA7XG4gICAgaWYgKG9wdGlvbnM/LnRhZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YWdEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKG9wdGlvbnMudGFnLCBhbGxvY3MpO1xuICAgIH1cblxuICAgIHJ1bk9wdGlvbnNIYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVSdW5PcHRpb25zKFxuICAgICAgcnVuT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsISxcbiAgICAgIHJ1bk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwhLFxuICAgICAgISFydW5PcHRpb25zLnRlcm1pbmF0ZSEsXG4gICAgICB0YWdEYXRhT2Zmc2V0LFxuICAgICk7XG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgPT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY3JlYXRlIHJ1biBvcHRpb25zLlwiKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8uZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhvcHRpb25zLmV4dHJhLCAnJywgbmV3IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KCksIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoa2V5LCBhbGxvY3MpO1xuICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XG5cbiAgICAgICAgaWYgKHdhc20uX09ydEFkZFJ1bkNvbmZpZ0VudHJ5KHJ1bk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgcnVuIGNvbmZpZyBlbnRyeTogJHtrZXl9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBbcnVuT3B0aW9uc0hhbmRsZSwgYWxsb2NzXTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgYWxsb2NzLmZvckVhY2goKGFsbG9jKSA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHR5cGUgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHsgZ2V0SW5zdGFuY2UgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBhbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zIH0gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuY29uc3QgZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsID0gKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw6IHN0cmluZyB8IHVua25vd24pOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwpIHtcbiAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdiYXNpYyc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICdleHRlbmRlZCc6XG4gICAgICByZXR1cm4gMjtcbiAgICBjYXNlICdsYXlvdXQnOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSAnYWxsJzpcbiAgICAgIHJldHVybiA5OTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBncmFwaCBvcHRpbWl6YXRpb24gbGV2ZWw6ICR7Z3JhcGhPcHRpbWl6YXRpb25MZXZlbH1gKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0RXhlY3V0aW9uTW9kZSA9IChleGVjdXRpb25Nb2RlOiAnc2VxdWVudGlhbCcgfCAncGFyYWxsZWwnKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChleGVjdXRpb25Nb2RlKSB7XG4gICAgY2FzZSAnc2VxdWVudGlhbCc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdwYXJhbGxlbCc6XG4gICAgICByZXR1cm4gMTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBleGVjdXRpb24gbW9kZTogJHtleGVjdXRpb25Nb2RlfWApO1xuICB9XG59O1xuXG5jb25zdCBhcHBlbmREZWZhdWx0T3B0aW9ucyA9IChvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogdm9pZCA9PiB7XG4gIGlmICghb3B0aW9ucy5leHRyYSkge1xuICAgIG9wdGlvbnMuZXh0cmEgPSB7fTtcbiAgfVxuICBpZiAoIW9wdGlvbnMuZXh0cmEuc2Vzc2lvbikge1xuICAgIG9wdGlvbnMuZXh0cmEuc2Vzc2lvbiA9IHt9O1xuICB9XG4gIGNvbnN0IHNlc3Npb24gPSBvcHRpb25zLmV4dHJhLnNlc3Npb24gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgaWYgKCFzZXNzaW9uLnVzZV9vcnRfbW9kZWxfYnl0ZXNfZGlyZWN0bHkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5ID0gJzEnO1xuICB9XG5cbiAgLy8gaWYgdXNpbmcgSlNFUCB3aXRoIFdlYkdQVSwgYWx3YXlzIGRpc2FibGUgbWVtb3J5IHBhdHRlcm5cbiAgaWYgKFxuICAgIG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzICYmXG4gICAgb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMuc29tZSgoZXApID0+ICh0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lKSA9PT0gJ3dlYmdwdScpXG4gICkge1xuICAgIG9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybiA9IGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBhcHBlbmRTZXNzaW9uQ29uZmlnID0gKHNlc3Npb25PcHRpb25zSGFuZGxlOiBudW1iZXIsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBhbGxvY3M6IG51bWJlcltdKTogdm9pZCA9PiB7XG4gIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoa2V5LCBhbGxvY3MpO1xuICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XG4gIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICB9XG59O1xuXG5jb25zdCBhcHBlbmRFcE9wdGlvbiA9IChlcE9wdGlvbnM6IEFycmF5PFtudW1iZXIsIG51bWJlcl0+LCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgYWxsb2NzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xuICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuICBlcE9wdGlvbnMucHVzaChba2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0XSk7XG59O1xuXG5jb25zdCBzZXRFeGVjdXRpb25Qcm92aWRlcnMgPSBhc3luYyAoXG4gIHNlc3Npb25PcHRpb25zSGFuZGxlOiBudW1iZXIsXG4gIGV4ZWN1dGlvblByb3ZpZGVyczogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbi5FeGVjdXRpb25Qcm92aWRlckNvbmZpZ1tdLFxuICBhbGxvY3M6IG51bWJlcltdLFxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGZvciAoY29uc3QgZXAgb2YgZXhlY3V0aW9uUHJvdmlkZXJzKSB7XG4gICAgbGV0IGVwTmFtZSA9IHR5cGVvZiBlcCA9PT0gJ3N0cmluZycgPyBlcCA6IGVwLm5hbWU7XG4gICAgY29uc3QgZXBPcHRpb25zOiBBcnJheTxbbnVtYmVyLCBudW1iZXJdPiA9IFtdO1xuXG4gICAgLy8gY2hlY2sgRVAgbmFtZVxuICAgIHN3aXRjaCAoZXBOYW1lKSB7XG4gICAgICBjYXNlICd3ZWJubic6XG4gICAgICAgIGVwTmFtZSA9ICdXRUJOTic7XG4gICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3Qgd2Vibm5PcHRpb25zID0gZXAgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgIC8vIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XG4gICAgICAgICAgY29uc3QgZGV2aWNlVHlwZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8uZGV2aWNlVHlwZTtcbiAgICAgICAgICBpZiAoZGV2aWNlVHlwZSkge1xuICAgICAgICAgICAgYXBwZW5kU2Vzc2lvbkNvbmZpZyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwgJ2RldmljZVR5cGUnLCBkZXZpY2VUeXBlLCBhbGxvY3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dlYmdwdSc6XG4gICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgICAgIGVwTmFtZSA9ICdXZWJHUFUnO1xuICAgICAgICAgIGxldCBjdXN0b21EZXZpY2U6IEdQVURldmljZSB8IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21PcHRpb25zID0gZXAgYXMgdW5rbm93biBhcyB7IGRldmljZTogR1BVRGV2aWNlIH07XG4gICAgICAgICAgICBpZiAoY3VzdG9tT3B0aW9ucy5kZXZpY2UpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBHUFVEZXZpY2UgIT09ICd1bmRlZmluZWQnICYmIGN1c3RvbU9wdGlvbnMuZGV2aWNlIGluc3RhbmNlb2YgR1BVRGV2aWNlKSB7XG4gICAgICAgICAgICAgICAgY3VzdG9tRGV2aWNlID0gY3VzdG9tT3B0aW9ucy5kZXZpY2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEdQVSBkZXZpY2Ugc2V0IGluIFdlYkdQVSBFUCBvcHRpb25zLicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE86IGhhbmRsZSBtb3JlIG9wdGlvbnNcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpbmZvID0gZ2V0SW5zdGFuY2UoKS53ZWJncHVSZWdpc3RlckRldmljZSEoY3VzdG9tRGV2aWNlKTtcbiAgICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgY29uc3QgW2RldmljZUlkLCBpbnN0YW5jZUhhbmRsZSwgZGV2aWNlSGFuZGxlXSA9IGluZm87XG4gICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICdkZXZpY2VJZCcsIGRldmljZUlkLnRvU3RyaW5nKCksIGFsbG9jcyk7XG4gICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICd3ZWJncHVJbnN0YW5jZScsIGluc3RhbmNlSGFuZGxlLnRvU3RyaW5nKCksIGFsbG9jcyk7XG4gICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICd3ZWJncHVEZXZpY2UnLCBkZXZpY2VIYW5kbGUudG9TdHJpbmcoKSwgYWxsb2NzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXBOYW1lID0gJ0pTJztcbiAgICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3Qgd2ViZ3B1T3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgICAgICAgICBpZiAod2ViZ3B1T3B0aW9ucz8ucHJlZmVycmVkTGF5b3V0KSB7XG4gICAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCAhPT0gJ05DSFcnICYmIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkhXQycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHByZWZlcnJlZExheW91dCBtdXN0IGJlIGVpdGhlciAnTkNIVycgb3IgJ05IV0MnOiAke3dlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0fWApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGFwcGVuZFNlc3Npb25Db25maWcoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsICdwcmVmZXJyZWRMYXlvdXQnLCB3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCwgYWxsb2NzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd3YXNtJzpcbiAgICAgIGNhc2UgJ2NwdSc6XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgZXBOYW1lRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhlcE5hbWUsIGFsbG9jcyk7XG4gICAgY29uc3QgZXBPcHRpb25zQ291bnQgPSBlcE9wdGlvbnMubGVuZ3RoO1xuICAgIGxldCBrZXlzT2Zmc2V0ID0gMDtcbiAgICBsZXQgdmFsdWVzT2Zmc2V0ID0gMDtcbiAgICBpZiAoZXBPcHRpb25zQ291bnQgPiAwKSB7XG4gICAgICBrZXlzT2Zmc2V0ID0gZ2V0SW5zdGFuY2UoKS5fbWFsbG9jKGVwT3B0aW9uc0NvdW50ICogZ2V0SW5zdGFuY2UoKS5QVFJfU0laRSk7XG4gICAgICBhbGxvY3MucHVzaChrZXlzT2Zmc2V0KTtcbiAgICAgIHZhbHVlc09mZnNldCA9IGdldEluc3RhbmNlKCkuX21hbGxvYyhlcE9wdGlvbnNDb3VudCAqIGdldEluc3RhbmNlKCkuUFRSX1NJWkUpO1xuICAgICAgYWxsb2NzLnB1c2godmFsdWVzT2Zmc2V0KTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXBPcHRpb25zQ291bnQ7IGkrKykge1xuICAgICAgICBnZXRJbnN0YW5jZSgpLnNldFZhbHVlKGtleXNPZmZzZXQgKyBpICogZ2V0SW5zdGFuY2UoKS5QVFJfU0laRSwgZXBPcHRpb25zW2ldWzBdLCAnKicpO1xuICAgICAgICBnZXRJbnN0YW5jZSgpLnNldFZhbHVlKHZhbHVlc09mZnNldCArIGkgKiBnZXRJbnN0YW5jZSgpLlBUUl9TSVpFLCBlcE9wdGlvbnNbaV1bMV0sICcqJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChhd2FpdCBnZXRJbnN0YW5jZSgpLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcihcbiAgICAgICAgc2Vzc2lvbk9wdGlvbnNIYW5kbGUsXG4gICAgICAgIGVwTmFtZURhdGFPZmZzZXQsXG4gICAgICAgIGtleXNPZmZzZXQsXG4gICAgICAgIHZhbHVlc09mZnNldCxcbiAgICAgICAgZXBPcHRpb25zQ291bnQsXG4gICAgICApKSAhPT0gMFxuICAgICkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFwcGVuZCBleGVjdXRpb24gcHJvdmlkZXI6ICR7ZXBOYW1lfS5gKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzZXRTZXNzaW9uT3B0aW9ucyA9IGFzeW5jIChvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8W251bWJlciwgbnVtYmVyW11dPiA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xuICBjb25zdCBhbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3Qgc2Vzc2lvbk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBhcHBlbmREZWZhdWx0T3B0aW9ucyhzZXNzaW9uT3B0aW9ucyk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBncmFwaE9wdGltaXphdGlvbkxldmVsID0gZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsKHNlc3Npb25PcHRpb25zLmdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPz8gJ2FsbCcpO1xuICAgIGNvbnN0IGV4ZWN1dGlvbk1vZGUgPSBnZXRFeGVjdXRpb25Nb2RlKHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvbk1vZGUgPz8gJ3NlcXVlbnRpYWwnKTtcbiAgICBjb25zdCBsb2dJZERhdGFPZmZzZXQgPVxuICAgICAgdHlwZW9mIHNlc3Npb25PcHRpb25zLmxvZ0lkID09PSAnc3RyaW5nJyA/IGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5sb2dJZCwgYWxsb2NzKSA6IDA7XG5cbiAgICBjb25zdCBsb2dTZXZlcml0eUxldmVsID0gc2Vzc2lvbk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA/PyAyOyAvLyBEZWZhdWx0IHRvIDIgLSB3YXJuaW5nXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxvZ1NldmVyaXR5TGV2ZWwpIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPiA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nU2V2ZXJpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dWZXJib3NpdHlMZXZlbCA9IHNlc3Npb25PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID8/IDA7IC8vIERlZmF1bHQgdG8gMCAtIHZlcmJvc2VcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nVmVyYm9zaXR5TGV2ZWwpIHx8IGxvZ1ZlcmJvc2l0eUxldmVsIDwgMCB8fCBsb2dWZXJib3NpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nVmVyYm9zaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCA9XG4gICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCwgYWxsb2NzKVxuICAgICAgICA6IDA7XG5cbiAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZVNlc3Npb25PcHRpb25zKFxuICAgICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCxcbiAgICAgICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlQ3B1TWVtQXJlbmEsXG4gICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4sXG4gICAgICBleGVjdXRpb25Nb2RlLFxuICAgICAgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVQcm9maWxpbmcsXG4gICAgICAwLFxuICAgICAgbG9nSWREYXRhT2Zmc2V0LFxuICAgICAgbG9nU2V2ZXJpdHlMZXZlbCxcbiAgICAgIGxvZ1ZlcmJvc2l0eUxldmVsLFxuICAgICAgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCxcbiAgICApO1xuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjcmVhdGUgc2Vzc2lvbiBvcHRpb25zLlwiKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzKSB7XG4gICAgICBhd2FpdCBzZXRFeGVjdXRpb25Qcm92aWRlcnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycywgYWxsb2NzKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBlbmFibGVHcmFwaENhcHR1cmUgbXVzdCBiZSBhIGJvb2xlYW4gdmFsdWU6ICR7c2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlfWApO1xuICAgICAgfVxuICAgICAgYXBwZW5kU2Vzc2lvbkNvbmZpZyhcbiAgICAgICAgc2Vzc2lvbk9wdGlvbnNIYW5kbGUsXG4gICAgICAgICdlbmFibGVHcmFwaENhcHR1cmUnLFxuICAgICAgICBzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmUudG9TdHJpbmcoKSxcbiAgICAgICAgYWxsb2NzLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHNlc3Npb25PcHRpb25zLmZyZWVEaW1lbnNpb25PdmVycmlkZXMpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlIG5hbWUgbXVzdCBiZSBhIHN0cmluZzogJHtuYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSB8fCB2YWx1ZSA8IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlIHZhbHVlIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlcjogJHt2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYW1lT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKG5hbWUsIGFsbG9jcyk7XG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGUoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIG5hbWVPZmZzZXQsIHZhbHVlKSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZTogJHtuYW1lfSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmV4dHJhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnMoc2Vzc2lvbk9wdGlvbnMuZXh0cmEsICcnLCBuZXcgV2Vha1NldDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oKSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgYXBwZW5kU2Vzc2lvbkNvbmZpZyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5LCB2YWx1ZSwgYWxsb2NzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBbc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpICE9PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBzZXNzaW9uIG9wdGlvbnMuXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBhbGxvY3MuZm9yRWFjaCgoYWxsb2MpID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG4vLyBhIGR1bW15IHR5cGUgZGVjbGFyYXRpb24gZm9yIEZsb2F0MTZBcnJheSBpbiBjYXNlIGFueSBwb2x5ZmlsbCBpcyBhdmFpbGFibGUuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgY29uc3QgRmxvYXQxNkFycmF5OiBhbnk7XG59XG5cbi8vIFRoaXMgZmlsZSBpbmNsdWRlcyBjb21tb24gZGVmaW5pdGlvbnMuIFRoZXkgZG8gTk9UIGhhdmUgZGVwZW5kZW5jeSBvbiB0aGUgV2ViQXNzZW1ibHkgaW5zdGFuY2UuXG5cbi8qKlxuICogQ29waWVkIGZyb20gT05OWCBkZWZpbml0aW9uLiBVc2UgdGhpcyB0byBkcm9wIGRlcGVuZGVuY3kgJ29ubnhfcHJvdG8nIHRvIGRlY3JlYXNlIGNvbXBpbGVkIC5qcyBmaWxlIHNpemUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIERhdGFUeXBlIHtcbiAgdW5kZWZpbmVkID0gMCxcbiAgZmxvYXQgPSAxLFxuICB1aW50OCA9IDIsXG4gIGludDggPSAzLFxuICB1aW50MTYgPSA0LFxuICBpbnQxNiA9IDUsXG4gIGludDMyID0gNixcbiAgaW50NjQgPSA3LFxuICBzdHJpbmcgPSA4LFxuICBib29sID0gOSxcbiAgZmxvYXQxNiA9IDEwLFxuICBkb3VibGUgPSAxMSxcbiAgdWludDMyID0gMTIsXG4gIHVpbnQ2NCA9IDEzLFxuICBjb21wbGV4NjQgPSAxNCxcbiAgY29tcGxleDEyOCA9IDE1LFxuICBiZmxvYXQxNiA9IDE2LFxuXG4gIC8vIDQtYml0IGRhdGEtdHlwZXNcbiAgdWludDQgPSAyMSxcbiAgaW50NCA9IDIyLFxufVxuXG4vKipcbiAqIE1hcCBzdHJpbmcgdGVuc29yIGRhdGEgdG8gZW51bSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0gPSAodHlwZTogc3RyaW5nKTogRGF0YVR5cGUgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdpbnQ4JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ4O1xuICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50ODtcbiAgICBjYXNlICdib29sJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5ib29sO1xuICAgIGNhc2UgJ2ludDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQxNjtcbiAgICBjYXNlICd1aW50MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQxNjtcbiAgICBjYXNlICdpbnQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MzI7XG4gICAgY2FzZSAndWludDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MzI7XG4gICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZmxvYXQxNjtcbiAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5mbG9hdDtcbiAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5kb3VibGU7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5zdHJpbmc7XG4gICAgY2FzZSAnaW50NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDY0O1xuICAgIGNhc2UgJ3VpbnQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDY0O1xuICAgIGNhc2UgJ2ludDQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDQ7XG4gICAgY2FzZSAndWludDQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ0O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGVudW0gdmFsdWUgdG8gc3RyaW5nIHRlbnNvciBkYXRhXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyA9ICh0eXBlUHJvdG86IERhdGFUeXBlKTogVGVuc29yLlR5cGUgPT4ge1xuICBzd2l0Y2ggKHR5cGVQcm90bykge1xuICAgIGNhc2UgRGF0YVR5cGUuaW50ODpcbiAgICAgIHJldHVybiAnaW50OCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50ODpcbiAgICAgIHJldHVybiAndWludDgnO1xuICAgIGNhc2UgRGF0YVR5cGUuYm9vbDpcbiAgICAgIHJldHVybiAnYm9vbCc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQxNjpcbiAgICAgIHJldHVybiAnaW50MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDE2OlxuICAgICAgcmV0dXJuICd1aW50MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50MzI6XG4gICAgICByZXR1cm4gJ2ludDMyJztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQzMjpcbiAgICAgIHJldHVybiAndWludDMyJztcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0MTY6XG4gICAgICByZXR1cm4gJ2Zsb2F0MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUuZmxvYXQ6XG4gICAgICByZXR1cm4gJ2Zsb2F0MzInO1xuICAgIGNhc2UgRGF0YVR5cGUuZG91YmxlOlxuICAgICAgcmV0dXJuICdmbG9hdDY0JztcbiAgICBjYXNlIERhdGFUeXBlLnN0cmluZzpcbiAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICBjYXNlIERhdGFUeXBlLmludDY0OlxuICAgICAgcmV0dXJuICdpbnQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50NjQ6XG4gICAgICByZXR1cm4gJ3VpbnQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ0OlxuICAgICAgcmV0dXJuICdpbnQ0JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ0OlxuICAgICAgcmV0dXJuICd1aW50NCc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZVByb3RvfWApO1xuICB9XG59O1xuXG4vKipcbiAqIGdldCB0ZW5zb3Igc2l6ZSBpbiBieXRlcyBieSB0aGUgZ2l2ZW4gZGF0YSB0eXBlIGFuZCBkaW1lbnNpb25zXG4gKiBAcmV0dXJucyBzaXplIGluIGludGVnZXIgb3IgdW5kZWZpbmVkIGlmIHRoZSBkYXRhIHR5cGUgaXMgbm90IHN1cHBvcnRlZFxuICovXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXMgPSAoXG4gIGRhdGVUeXBlOiBudW1iZXIsXG4gIGRpbXNPclNpemU6IHJlYWRvbmx5IG51bWJlcltdIHwgbnVtYmVyLFxuKTogbnVtYmVyIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgZWxlbWVudFNpemUgPSBbXG4gICAgLTEsIC8vIHVuZGVmaW5lZCA9IDBcbiAgICA0LCAvLyBmbG9hdCA9IDFcbiAgICAxLCAvLyB1aW50OCA9IDJcbiAgICAxLCAvLyBpbnQ4ID0gM1xuICAgIDIsIC8vIHVpbnQxNiA9IDRcbiAgICAyLCAvLyBpbnQxNiA9IDVcbiAgICA0LCAvLyBpbnQzMiA9IDZcbiAgICA4LCAvLyBpbnQ2NCA9IDdcbiAgICAtMSwgLy8gc3RyaW5nID0gOFxuICAgIDEsIC8vIGJvb2wgPSA5XG4gICAgMiwgLy8gZmxvYXQxNiA9IDEwXG4gICAgOCwgLy8gZG91YmxlID0gMTFcbiAgICA0LCAvLyB1aW50MzIgPSAxMlxuICAgIDgsIC8vIHVpbnQ2NCA9IDEzXG4gICAgLTEsIC8vIGNvbXBsZXg2NCA9IDE0XG4gICAgLTEsIC8vIGNvbXBsZXgxMjggPSAxNVxuICAgIC0xLCAvLyBiZmxvYXQxNiA9IDE2XG4gICAgLTEsIC8vIEZMT0FUOEU0TTNGTiA9IDE3XG4gICAgLTEsIC8vIEZMT0FUOEU0TTNGTlVaID0gMThcbiAgICAtMSwgLy8gRkxPQVQ4RTVNMiA9IDE5XG4gICAgLTEsIC8vIEZMT0FUOEU1TTJGTlVaID0gMjBcbiAgICAwLjUsIC8vIHVpbnQ0ID0gMjFcbiAgICAwLjUsIC8vIGludDQgPSAyMlxuICBdW2RhdGVUeXBlXTtcblxuICBjb25zdCBzaXplID0gdHlwZW9mIGRpbXNPclNpemUgPT09ICdudW1iZXInID8gZGltc09yU2l6ZSA6IGRpbXNPclNpemUucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSk7XG4gIHJldHVybiBlbGVtZW50U2l6ZSA+IDAgPyBNYXRoLmNlaWwoc2l6ZSAqIGVsZW1lbnRTaXplKSA6IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogZ2V0IHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yIGJ5IHRoZSBnaXZlbiB0ZW5zb3IgdHlwZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gKFxuICB0eXBlOiBUZW5zb3IuVHlwZSxcbik6XG4gIHwgRmxvYXQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQ4QXJyYXlDb25zdHJ1Y3RvclxuICB8IFVpbnQxNkFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQxNkFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBGbG9hdDY0QXJyYXlDb25zdHJ1Y3RvclxuICB8IFVpbnQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICAvLyBhbGxvdyBGbG9hdDE2QXJyYXkgcG9seWZpbGwuXG4gICAgICByZXR1cm4gdHlwZW9mIEZsb2F0MTZBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgRmxvYXQxNkFycmF5LmZyb20gPyBGbG9hdDE2QXJyYXkgOiBVaW50MTZBcnJheTtcbiAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgIHJldHVybiBGbG9hdDMyQXJyYXk7XG4gICAgY2FzZSAndWludDgnOlxuICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XG4gICAgY2FzZSAnaW50OCc6XG4gICAgICByZXR1cm4gSW50OEFycmF5O1xuICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICByZXR1cm4gVWludDE2QXJyYXk7XG4gICAgY2FzZSAnaW50MTYnOlxuICAgICAgcmV0dXJuIEludDE2QXJyYXk7XG4gICAgY2FzZSAnaW50MzInOlxuICAgICAgcmV0dXJuIEludDMyQXJyYXk7XG4gICAgY2FzZSAnYm9vbCc6XG4gICAgICByZXR1cm4gVWludDhBcnJheTtcbiAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgIHJldHVybiBGbG9hdDY0QXJyYXk7XG4gICAgY2FzZSAndWludDMyJzpcbiAgICAgIHJldHVybiBVaW50MzJBcnJheTtcbiAgICBjYXNlICdpbnQ2NCc6XG4gICAgICByZXR1cm4gQmlnSW50NjRBcnJheTtcbiAgICBjYXNlICd1aW50NjQnOlxuICAgICAgcmV0dXJuIEJpZ1VpbnQ2NEFycmF5O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGU6ICR7dHlwZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgc3RyaW5nIGxvZyBsZXZlbCB0byBpbnRlZ2VyIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBsb2dMZXZlbFN0cmluZ1RvRW51bSA9IChsb2dMZXZlbD86ICd2ZXJib3NlJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcicgfCAnZmF0YWwnKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2dMZXZlbCkge1xuICAgIGNhc2UgJ3ZlcmJvc2UnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2ZhdGFsJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7bG9nTGV2ZWx9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGVuc29yIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IEdQVSBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSA9ICh0eXBlOiBUZW5zb3IuVHlwZSk6IHR5cGUgaXMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcyA9PlxuICB0eXBlID09PSAnZmxvYXQzMicgfHxcbiAgdHlwZSA9PT0gJ2Zsb2F0MTYnIHx8XG4gIHR5cGUgPT09ICdpbnQzMicgfHxcbiAgdHlwZSA9PT0gJ2ludDY0JyB8fFxuICB0eXBlID09PSAndWludDMyJyB8fFxuICB0eXBlID09PSAndWludDgnIHx8XG4gIHR5cGUgPT09ICdib29sJyB8fFxuICB0eXBlID09PSAndWludDQnIHx8XG4gIHR5cGUgPT09ICdpbnQ0JztcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBnaXZlbiB0ZW5zb3IgdHlwZSBpcyBzdXBwb3J0ZWQgYnkgV2ViTk4gTUxUZW5zb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlID0gKHR5cGU6IFRlbnNvci5UeXBlKTogdHlwZSBpcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMgPT5cbiAgdHlwZSA9PT0gJ2Zsb2F0MzInIHx8XG4gIHR5cGUgPT09ICdmbG9hdDE2JyB8fFxuICB0eXBlID09PSAnaW50MzInIHx8XG4gIHR5cGUgPT09ICdpbnQ2NCcgfHxcbiAgdHlwZSA9PT0gJ3VpbnQzMicgfHxcbiAgdHlwZSA9PT0gJ3VpbnQ2NCcgfHxcbiAgdHlwZSA9PT0gJ2ludDgnIHx8XG4gIHR5cGUgPT09ICd1aW50OCcgfHxcbiAgdHlwZSA9PT0gJ2Jvb2wnIHx8XG4gIHR5cGUgPT09ICd1aW50NCcgfHxcbiAgdHlwZSA9PT0gJ2ludDQnO1xuXG4vKipcbiAqIE1hcCBzdHJpbmcgZGF0YSBsb2NhdGlvbiB0byBpbnRlZ2VyIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0gPSAobG9jYXRpb246IFRlbnNvci5EYXRhTG9jYXRpb24pOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGxvY2F0aW9uKSB7XG4gICAgY2FzZSAnbm9uZSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAnY3B1LXBpbm5lZCc6XG4gICAgICByZXR1cm4gMjtcbiAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxuICAgICAgcmV0dXJuIDQ7XG4gICAgY2FzZSAnbWwtdGVuc29yJzpcbiAgICAgIHJldHVybiA1O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgbG9jYXRpb246ICR7bG9jYXRpb259YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGludGVnZXIgZGF0YSBsb2NhdGlvbiB0byBzdHJpbmcgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvbkVudW1Ub1N0cmluZyA9IChsb2NhdGlvbjogbnVtYmVyKTogVGVuc29yLkRhdGFMb2NhdGlvbiB8IHVuZGVmaW5lZCA9PlxuICAoWydub25lJywgJ2NwdScsICdjcHUtcGlubmVkJywgJ3RleHR1cmUnLCAnZ3B1LWJ1ZmZlcicsICdtbC10ZW5zb3InXSBhcyBjb25zdClbbG9jYXRpb25dO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBpc05vZGUgfSBmcm9tICcuL3dhc20tdXRpbHMtZW52JztcblxuLyoqXG4gKiBMb2FkIGEgZmlsZSBpbnRvIGEgVWludDhBcnJheS5cbiAqXG4gKiBAcGFyYW0gZmlsZSAtIHRoZSBmaWxlIHRvIGxvYWQuIENhbiBiZSBhIFVSTC9wYXRoLCBhIEJsb2IsIGFuIEFycmF5QnVmZmVyLCBvciBhIFVpbnQ4QXJyYXkuXG4gKiBAcmV0dXJucyBhIFVpbnQ4QXJyYXkgY29udGFpbmluZyB0aGUgZmlsZSBkYXRhLlxuICovXG5leHBvcnQgY29uc3QgbG9hZEZpbGUgPSBhc3luYyAoZmlsZTogc3RyaW5nIHwgQmxvYiB8IEFycmF5QnVmZmVyTGlrZSB8IFVpbnQ4QXJyYXkpOiBQcm9taXNlPFVpbnQ4QXJyYXk+ID0+IHtcbiAgaWYgKHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJykge1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIC8vIGxvYWQgZmlsZSBpbnRvIEFycmF5QnVmZmVyIGluIE5vZGUuanNcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgcmVhZEZpbGUgfSA9IHJlcXVpcmUoJ25vZGU6ZnMvcHJvbWlzZXMnKTtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IHJlYWRGaWxlKGZpbGUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VSUl9GU19GSUxFX1RPT19MQVJHRScpIHtcbiAgICAgICAgICAvLyBmaWxlIGlzIHRvbyBsYXJnZSwgdXNlIGZzLmNyZWF0ZVJlYWRTdHJlYW0gaW5zdGVhZFxuICAgICAgICAgIGNvbnN0IHsgY3JlYXRlUmVhZFN0cmVhbSB9ID0gcmVxdWlyZSgnbm9kZTpmcycpO1xuICAgICAgICAgIGNvbnN0IHN0cmVhbSA9IGNyZWF0ZVJlYWRTdHJlYW0oZmlsZSk7XG4gICAgICAgICAgY29uc3QgY2h1bmtzOiBVaW50OEFycmF5W10gPSBbXTtcbiAgICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHN0cmVhbSkge1xuICAgICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoQnVmZmVyLmNvbmNhdChjaHVua3MpKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBsb2FkIGZpbGUgaW50byBBcnJheUJ1ZmZlciBpbiBicm93c2Vyc1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChmaWxlKTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gbG9hZCBleHRlcm5hbCBkYXRhIGZpbGU6ICR7ZmlsZX1gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGhIZWFkZXIgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1MZW5ndGgnKTtcbiAgICAgIGNvbnN0IGZpbGVTaXplID0gY29udGVudExlbmd0aEhlYWRlciA/IHBhcnNlSW50KGNvbnRlbnRMZW5ndGhIZWFkZXIsIDEwKSA6IDA7XG4gICAgICBpZiAoZmlsZVNpemUgPCAxMDczNzQxODI0IC8qIDFHQiAqLykge1xuICAgICAgICAvLyB3aGVuIENvbnRlbnQtTGVuZ3RoIGhlYWRlciBpcyBub3Qgc2V0LCB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBmaWxlIHNpemUuIFdlIGFzc3VtZSBpdCBpcyBzbWFsbCBlbm91Z2ggdG9cbiAgICAgICAgLy8gbG9hZCBpbnRvIG1lbW9yeS5cbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZmlsZSBpcyB0b28gbGFyZ2UsIHVzZSBzdHJlYW0gaW5zdGVhZFxuICAgICAgICBpZiAoIXJlc3BvbnNlLmJvZHkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZhaWxlZCB0byBsb2FkIGV4dGVybmFsIGRhdGEgZmlsZTogJHtmaWxlfSwgbm8gcmVzcG9uc2UgYm9keS5gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWFkZXIgPSByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpO1xuXG4gICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gdHJ5IHRvIGNyZWF0ZSBBcnJheUJ1ZmZlciBkaXJlY3RseVxuICAgICAgICAgIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihmaWxlU2l6ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFJhbmdlRXJyb3IpIHtcbiAgICAgICAgICAgIC8vIHVzZSBXZWJBc3NlbWJseSBNZW1vcnkgdG8gYWxsb2NhdGUgbGFyZ2VyIEFycmF5QnVmZmVyXG4gICAgICAgICAgICBjb25zdCBwYWdlcyA9IE1hdGguY2VpbChmaWxlU2l6ZSAvIDY1NTM2KTtcbiAgICAgICAgICAgIGJ1ZmZlciA9IG5ldyBXZWJBc3NlbWJseS5NZW1vcnkoeyBpbml0aWFsOiBwYWdlcywgbWF4aW11bTogcGFnZXMgfSkuYnVmZmVyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgY29uc3QgY2h1bmsgPSBuZXcgVWludDhBcnJheShidWZmZXIsIG9mZnNldCwgY2h1bmtTaXplKTtcbiAgICAgICAgICBjaHVuay5zZXQodmFsdWUpO1xuICAgICAgICAgIG9mZnNldCArPSBjaHVua1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgMCwgZmlsZVNpemUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChmaWxlIGluc3RhbmNlb2YgQmxvYikge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShhd2FpdCBmaWxlLmFycmF5QnVmZmVyKCkpO1xuICB9IGVsc2UgaWYgKGZpbGUgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgcmV0dXJuIGZpbGU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGZpbGUpO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBXZWJOTiBBUEkgY3VycmVudGx5IGRvZXMgbm90IGhhdmUgYSBUeXBlU2NyaXB0IGRlZmluaXRpb24gZmlsZS4gVGhpcyBmaWxlIGlzIGEgd29ya2Fyb3VuZCB3aXRoIHR5cGVzIGdlbmVyYXRlZCBmcm9tXG4vLyBXZWJOTiBBUEkgc3BlY2lmaWNhdGlvbi5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJtYWNoaW5lbGVhcm5pbmcvd2Vibm4vaXNzdWVzLzY3N1xuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpzZXAvd2Vibm4vd2Vibm4uZC50c1wiIC8+XG5cbmltcG9ydCB7IEVudiwgSW5mZXJlbmNlU2Vzc2lvbiwgVGVuc29yLCBUUkFDRV9FVkVOVF9CRUdJTiwgVFJBQ0VfRVZFTlRfRU5EIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtcbiAgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsXG4gIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSxcbiAgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEsXG4gIFRlbnNvck1ldGFkYXRhLFxufSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCB7IHNldFJ1bk9wdGlvbnMgfSBmcm9tICcuL3J1bi1vcHRpb25zJztcbmltcG9ydCB7IHNldFNlc3Npb25PcHRpb25zIH0gZnJvbSAnLi9zZXNzaW9uLW9wdGlvbnMnO1xuaW1wb3J0IHtcbiAgY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXMsXG4gIGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bSxcbiAgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlLFxuICBpc01MVGVuc29yU3VwcG9ydGVkVHlwZSxcbiAgbG9nTGV2ZWxTdHJpbmdUb0VudW0sXG4gIHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nLFxuICB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bSxcbiAgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yLFxufSBmcm9tICcuL3dhc20tY29tbW9uJztcbmltcG9ydCB7IGdldEluc3RhbmNlIH0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuaW1wb3J0IHsgYWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciB9IGZyb20gJy4vd2FzbS11dGlscyc7XG5pbXBvcnQgeyBsb2FkRmlsZSB9IGZyb20gJy4vd2FzbS11dGlscy1sb2FkLWZpbGUnO1xuXG4vLyAjcmVnaW9uIEluaXRpYWxpemF0aW9uc1xuXG4vKipcbiAqIFRoZXJlIGFyZSA0IGRpZmZlcmVudCBcImluaXRpYWxpemF0aW9uXCIgc3RlcHMgZm9yIE9SVC4gVGhleSBoYXBwZW4gaW4gZGlmZmVyZW50IHBsYWNlcyBhbmQgZGlmZmVyZW50IHRpbWUuXG4gKlxuICogMS4gSmF2YVNjcmlwdCBpbml0aWFsaXphdGlvbiBmb3Igb25ueHJ1bnRpbWUtY29tbW9uIGFuZCBvbm54cnVudGltZS13ZWIuXG4gKiAgICBUaGlzIGlzIHRoZSBmaXJzdCBpbml0aWFsaXphdGlvbiBzdGVwLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBjYWxscyBvbm54cnVudGltZS1jb21tb24ncyByZWdpc3RlckJhY2tlbmQoKVxuICogZnVuY3Rpb24gbXVsdGlwbGUgdGltZXMgdG8gcmVnaXN0ZXIgYWxsIHRoZSBhdmFpbGFibGUgYmFja2VuZHMuIFRoZSBiYWNrZW5kIHJlZ2lzdHJhdGlvbiBpcyB2ZXJ5IGZhc3QuIEl0IG9ubHlcbiAqIHJlZ2lzdGVycyB0aGUgYmFja2VuZCBuYW1lIHdpdGggdGhlIHVuaW5pdGlhbGl6ZWQgYmFja2VuZCBvYmplY3QuIE5vIGhlYXZ5IGluaXRpYWxpemF0aW9uIGlzIGRvbmUgaW4gdGhpcyBzdGVwLlxuICogICAgUmVmZXIgdG8gd2ViL2xpYi9pbmRleC50cyBmb3IgdGhlIGJhY2tlbmQgcmVnaXN0cmF0aW9uLlxuICpcbiAqIDIuIFdlYkFzc2VtYmx5IGFydGlmYWN0IGluaXRpYWxpemF0aW9uLlxuICogICAgVGhpcyBoYXBwZW5zIHdoZW4gYW55IHJlZ2lzdGVyZWQgd2FzbSBiYWNrZW5kIGlzIHVzZWQgZm9yIHRoZSBmaXJzdCB0aW1lIChpZS4gYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBpc1xuICogY2FsbGVkKS4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgZG9lcyB0aGUgZm9sbG93aW5nczpcbiAqICAgICAtIGNyZWF0ZSBhIHByb3h5IHdvcmtlciBhbmQgbWFrZSBzdXJlIHRoZSBwcm94eSB3b3JrZXIgaXMgcmVhZHkgdG8gcmVjZWl2ZSBtZXNzYWdlcywgaWYgcHJveHkgaXMgZW5hYmxlZC5cbiAqICAgICAtIHBlcmZvcm0gZmVhdHVyZSBkZXRlY3Rpb24sIGxvY2F0ZSBjb3JyZWN0IFdlYkFzc2VtYmx5IGFydGlmYWN0IHBhdGggYW5kIGNhbGwgdGhlIEVtc2NyaXB0ZW4gZ2VuZXJhdGVkXG4gKiBKYXZhU2NyaXB0IGNvZGUgdG8gaW5pdGlhbGl6ZSB0aGUgV2ViQXNzZW1ibHkgcnVudGltZS5cbiAqICAgICAgICAgLSBpZiBwcm94eSBpcyBlbmFibGVkLCB0aGlzIHN0ZXAgaGFwcGVucyBpbiB0aGUgcHJveHkgd29ya2VyIHVzaW5nIG1lc3NhZ2UgJ2luaXQtd2FzbScuXG4gKiAgICAgICAgIC0gZG93bmxvYWRpbmcgdGhlICdvcnQtd2FzbXsuLi59Lndhc20nIGZpbGUgaXMgZG9uZSBpbiB0aGlzIHN0ZXAuXG4gKiAgICAgICAgIC0gaWYgbXVsdGktdGhyZWFkIGlzIGVuYWJsZWQsIG9uZSBvciBtb3JlIHdlYndvcmtlciB3aWxsIGJlIGNyZWF0ZWQgdG8gaW5pdGlhbGl6ZSB0aGUgUFRocmVhZCB0aHJlYWRwb29sLlxuICpcbiAqIDMuIE9SVCBlbnZpcm9ubWVudCBpbml0aWFsaXphdGlvbi5cbiAqICAgIFRoaXMgaGFwcGVucyBhZnRlciBzdGVwIDIuIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIHBlcmZvcm1zIE9OTlggUnVudGltZSBlbnZpcm9ubWVudCBpbml0aWFsaXphdGlvbi5cbiAqIEZ1bmN0aW9uIGBfT3J0SW5pdCgpYCBpcyBjYWxsZWQgaW4gdGhpcyBzdGVwLlxuICogICAgIC0gaWYgcHJveHkgaXMgZW5hYmxlZCwgdGhpcyBzdGVwIGhhcHBlbnMgaW4gdGhlIHByb3h5IHdvcmtlciB1c2luZyBtZXNzYWdlICdpbml0LW9ydCcuXG4gKiAgICAgLSBsb2dnaW5nIGxldmVsIChvcnQuZW52LmxvZ0xldmVsKSBhbmQgdGhyZWFkIG51bWJlciAob3J0LmVudi53YXNtLm51bVRocmVhZHMpIGFyZSBzZXQgaW4gdGhpcyBzdGVwLlxuICpcbiAqIDQuIFNlc3Npb24gaW5pdGlhbGl6YXRpb24uXG4gKiAgICBUaGlzIGhhcHBlbnMgd2hlbiBgb3J0LkluZmVyZW5jZVNlc3Npb24uY3JlYXRlKClgIGlzIGNhbGxlZC4gVW5saWtlIHRoZSBmaXJzdCAzIHN0ZXBzICh0aGV5IG9ubHkgY2FsbGVkIG9uY2UpLFxuICogdGhpcyBzdGVwIHdpbGwgYmUgZG9uZSBmb3IgZWFjaCBzZXNzaW9uLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBkb2VzIHRoZSBmb2xsb3dpbmdzOlxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVSTDpcbiAqICAgIC0gZG93bmxvYWQgdGhlIG1vZGVsIGRhdGEgZnJvbSB0aGUgVVJMLlxuICogICAgLSBjb3B5IHRoZSBtb2RlbCBkYXRhIHRvIHRoZSBXQVNNIGhlYXAuIChwcm94eTogJ2NvcHktZnJvbScpXG4gKiAgICAtIGRlcmVmZXJlbmNlIHRoZSBtb2RlbCBidWZmZXIuIFRoaXMgc3RlcCBhbGxvd3MgdGhlIG9yaWdpbmFsIEFycmF5QnVmZmVyIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxuICogICAgLSBjYWxsIGBfT3J0Q3JlYXRlU2Vzc2lvbigpYCB0byBjcmVhdGUgdGhlIHNlc3Npb24uIChwcm94eTogJ2NyZWF0ZScpXG4gKlxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVpbnQ4QXJyYXkgb2JqZWN0OlxuICogICAgLSBjb3B5IHRoZSBtb2RlbCBkYXRhIHRvIHRoZSBXQVNNIGhlYXAuIChwcm94eTogJ2NvcHktZnJvbScpXG4gKiAgICAtIGNhbGwgYF9PcnRDcmVhdGVTZXNzaW9uKClgIHRvIGNyZWF0ZSB0aGUgc2Vzc2lvbi4gKHByb3h5OiAnY3JlYXRlJylcbiAqXG4gKlxuICovXG5cbi8qKlxuICogaW5pdGlhbGl6ZSBPUlQgZW52aXJvbm1lbnQuXG4gKlxuICogQHBhcmFtIG51bVRocmVhZHMgU2V0R2xvYmFsSW50cmFPcE51bVRocmVhZHMobnVtVGhyZWFkcylcbiAqIEBwYXJhbSBsb2dnaW5nTGV2ZWwgQ3JlYXRlRW52KHN0YXRpY19jYXN0PE9ydExvZ2dpbmdMZXZlbD4obG9nZ2luZ19sZXZlbCkpXG4gKi9cbmNvbnN0IGluaXRPcnQgPSAobnVtVGhyZWFkczogbnVtYmVyLCBsb2dnaW5nTGV2ZWw6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCBlcnJvckNvZGUgPSBnZXRJbnN0YW5jZSgpLl9PcnRJbml0KG51bVRocmVhZHMsIGxvZ2dpbmdMZXZlbCk7XG4gIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGluaXRpYWxpemUgb25ueHJ1bnRpbWUuXCIpO1xuICB9XG59O1xuXG4vKipcbiAqIGluaXRpYWxpemUgcnVudGltZSBlbnZpcm9ubWVudC5cbiAqIEBwYXJhbSBlbnYgcGFzc2VkIGluIHRoZSBlbnZpcm9ubWVudCBjb25maWcgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgaW5pdFJ1bnRpbWUgPSBhc3luYyAoZW52OiBFbnYpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgLy8gaW5pdCBPUlRcbiAgaW5pdE9ydChlbnYud2FzbS5udW1UaHJlYWRzISwgbG9nTGV2ZWxTdHJpbmdUb0VudW0oZW52LmxvZ0xldmVsKSk7XG59O1xuXG4vKipcbiAqIHBlcmZvcm0gRVAgc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24uXG4gKlxuICogQHBhcmFtIGVudlxuICogQHBhcmFtIGVwTmFtZVxuICovXG5leHBvcnQgY29uc3QgaW5pdEVwID0gYXN5bmMgKGVudjogRW52LCBlcE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAvLyBpbml0aWFsaXplIEFTWU5DSUZZIHN1cHBvcnRcbiAgZ2V0SW5zdGFuY2UoKS5hc3luY0luaXQ/LigpO1xuXG4gIC8vIHBlcmZvcm0gV2ViR1BVIGF2YWlsYWJpbGl0eSBjaGVjayAoIGVpdGhlciBKU0VQIG9yIFdlYkdQVSBFUCApXG4gIGxldCB3ZWJncHVBZGFwdGVyID0gZW52LndlYmdwdS5hZGFwdGVyIGFzIEdQVUFkYXB0ZXIgfCBudWxsO1xuICBpZiAoZXBOYW1lID09PSAnd2ViZ3B1Jykge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhbmF2aWdhdG9yLmdwdSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJHUFUgaXMgbm90IHN1cHBvcnRlZCBpbiBjdXJyZW50IGVudmlyb25tZW50Jyk7XG4gICAgfVxuICAgIGlmICghd2ViZ3B1QWRhcHRlcikge1xuICAgICAgLy8gaWYgYWRhcHRlciBpcyBub3Qgc2V0LCByZXF1ZXN0IGEgbmV3IGFkYXB0ZXIuXG4gICAgICBjb25zdCBwb3dlclByZWZlcmVuY2UgPSBlbnYud2ViZ3B1LnBvd2VyUHJlZmVyZW5jZTtcbiAgICAgIGlmIChwb3dlclByZWZlcmVuY2UgIT09IHVuZGVmaW5lZCAmJiBwb3dlclByZWZlcmVuY2UgIT09ICdsb3ctcG93ZXInICYmIHBvd2VyUHJlZmVyZW5jZSAhPT0gJ2hpZ2gtcGVyZm9ybWFuY2UnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwb3dlclByZWZlcmVuY2Ugc2V0dGluZzogXCIke3Bvd2VyUHJlZmVyZW5jZX1cImApO1xuICAgICAgfVxuICAgICAgY29uc3QgZm9yY2VGYWxsYmFja0FkYXB0ZXIgPSBlbnYud2ViZ3B1LmZvcmNlRmFsbGJhY2tBZGFwdGVyO1xuICAgICAgaWYgKGZvcmNlRmFsbGJhY2tBZGFwdGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGZvcmNlRmFsbGJhY2tBZGFwdGVyICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGZvcmNlRmFsbGJhY2tBZGFwdGVyIHNldHRpbmc6IFwiJHtmb3JjZUZhbGxiYWNrQWRhcHRlcn1cImApO1xuICAgICAgfVxuICAgICAgd2ViZ3B1QWRhcHRlciA9IGF3YWl0IG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoeyBwb3dlclByZWZlcmVuY2UsIGZvcmNlRmFsbGJhY2tBZGFwdGVyIH0pO1xuICAgICAgaWYgKCF3ZWJncHVBZGFwdGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnRmFpbGVkIHRvIGdldCBHUFUgYWRhcHRlci4gJyArXG4gICAgICAgICAgICAnWW91IG1heSBuZWVkIHRvIGVuYWJsZSBmbGFnIFwiLS1lbmFibGUtdW5zYWZlLXdlYmdwdVwiIGlmIHlvdSBhcmUgdXNpbmcgQ2hyb21lLicsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGFkYXB0ZXIgaXMgc2V0LCB2YWxpZGF0ZSBpdC5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIHdlYmdwdUFkYXB0ZXIubGltaXRzICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICB0eXBlb2Ygd2ViZ3B1QWRhcHRlci5mZWF0dXJlcyAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgdHlwZW9mIHdlYmdwdUFkYXB0ZXIucmVxdWVzdERldmljZSAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBHUFUgYWRhcHRlciBzZXQgaW4gYGVudi53ZWJncHUuYWRhcHRlcmAuIEl0IG11c3QgYmUgYSBHUFVBZGFwdGVyIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBwZXJmb3JtIFdlYk5OIGF2YWlsYWJpbGl0eSBjaGVjayAoIGVpdGhlciBKU0VQIG9yIFdlYk5OIEVQIClcbiAgaWYgKGVwTmFtZSA9PT0gJ3dlYm5uJykge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhKG5hdmlnYXRvciBhcyB1bmtub3duIGFzIHsgbWw6IHVua25vd24gfSkubWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2ViTk4gaXMgbm90IHN1cHBvcnRlZCBpbiBjdXJyZW50IGVudmlyb25tZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gICAgY29uc3QgaW5pdEpzZXAgPSByZXF1aXJlKCcuL2pzZXAvaW5pdCcpLmluaXQ7XG5cbiAgICBpZiAoZXBOYW1lID09PSAnd2ViZ3B1Jykge1xuICAgICAgYXdhaXQgaW5pdEpzZXAoJ3dlYmdwdScsIGdldEluc3RhbmNlKCksIGVudiwgd2ViZ3B1QWRhcHRlcik7XG4gICAgfVxuICAgIGlmIChlcE5hbWUgPT09ICd3ZWJubicpIHtcbiAgICAgIGF3YWl0IGluaXRKc2VwKCd3ZWJubicsIGdldEluc3RhbmNlKCksIGVudik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSAmJiBlcE5hbWUgPT09ICd3ZWJncHUnKSB7XG4gICAgICBnZXRJbnN0YW5jZSgpLndlYmdwdUluaXQhKChkZXZpY2UpID0+IHtcbiAgICAgICAgZW52LndlYmdwdS5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCTk4gJiYgZXBOYW1lID09PSAnd2Vibm4nKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuICAgICAgY29uc3QgYmFja2VuZCA9IG5ldyAocmVxdWlyZSgnLi9qc2VwL2JhY2tlbmQtd2Vibm4nKS5XZWJOTkJhY2tlbmQpKGVudik7XG4gICAgICBnZXRJbnN0YW5jZSgpLndlYm5uSW5pdCEoW1xuICAgICAgICBiYWNrZW5kLFxuICAgICAgICAvLyB3ZWJublJlc2VydmVUZW5zb3JJZFxuICAgICAgICAoKSA9PiBiYWNrZW5kLnJlc2VydmVUZW5zb3JJZCgpLFxuICAgICAgICAvLyB3ZWJublJlbGVhc2VUZW5zb3JJZCxcbiAgICAgICAgKHRlbnNvcklkOiBudW1iZXIpID0+IGJhY2tlbmQucmVsZWFzZVRlbnNvcklkKHRlbnNvcklkKSxcbiAgICAgICAgLy8gd2Vibm5FbnN1cmVUZW5zb3JcbiAgICAgICAgYXN5bmMgKHNlc3Npb25JZDogbnVtYmVyIHwgdW5kZWZpbmVkLCB0ZW5zb3JJZDogbnVtYmVyLCBvbm54RGF0YVR5cGU6IG51bWJlciwgc2hhcGU6IG51bWJlcltdLCBjb3B5T2xkKSA9PlxuICAgICAgICAgIGJhY2tlbmQuZW5zdXJlVGVuc29yKHNlc3Npb25JZCwgdGVuc29ySWQsIG9ubnhEYXRhVHlwZSwgc2hhcGUsIGNvcHlPbGQpLFxuICAgICAgICAvLyB3ZWJublVwbG9hZFRlbnNvclxuICAgICAgICAodGVuc29ySWQ6IG51bWJlciwgZGF0YTogVWludDhBcnJheSkgPT4ge1xuICAgICAgICAgIGJhY2tlbmQudXBsb2FkVGVuc29yKHRlbnNvcklkLCBkYXRhKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gd2Vibm5Eb3dubG9hZFRlbnNvclxuICAgICAgICBhc3luYyAodGVuc29ySWQ6IG51bWJlciwgZHN0QnVmZmVyOiBBcnJheUJ1ZmZlclZpZXcgfCBBcnJheUJ1ZmZlcikgPT5cbiAgICAgICAgICBiYWNrZW5kLmRvd25sb2FkVGVuc29yKHRlbnNvcklkLCBkc3RCdWZmZXIpLFxuICAgICAgICAvLyB3ZWJublJlZ2lzdGVyTUxDb250ZXh0XG4gICAgICAgIChzZXNzaW9uSWQ6IG51bWJlciwgbWxDb250ZXh0OiBNTENvbnRleHQpID0+IGJhY2tlbmQucmVnaXN0ZXJNTENvbnRleHQoc2Vzc2lvbklkLCBtbENvbnRleHQpLFxuICAgICAgICAvLyB3ZWJubkVuYWJsZVRyYWNlRXZlbnRcbiAgICAgICAgISFlbnYudHJhY2UsXG4gICAgICBdKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vICNlbmRyZWdpb24gSW5pdGlhbGl6YXRpb25zXG5cbi8qKlxuICogdmFsaWQgZGF0YSBsb2NhdGlvbnMgZm9yIGlucHV0L291dHB1dCB0ZW5zb3JzLlxuICovXG50eXBlIFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0ID1cbiAgfCAnY3B1J1xuICB8ICdjcHUtcGlubmVkJ1xuICB8ICdncHUtYnVmZmVyJ1xuICB8ICdtbC10ZW5zb3InXG4gIC8vIFVzZSAnbWwtdGVuc29yJyBkdXJpbmcgaW5mZXJlbmNlLCBidXQgb3V0cHV0IGEgdGVuc29yIGxvY2F0ZWQgb24gdGhlIENQVS5cbiAgfCAnbWwtdGVuc29yLWNwdS1vdXRwdXQnO1xuXG50eXBlIElPQmluZGluZ1N0YXRlID0ge1xuICAvKipcbiAgICogdGhlIGhhbmRsZSBvZiBJTyBiaW5kaW5nLlxuICAgKi9cbiAgcmVhZG9ubHkgaGFuZGxlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cbiAgICpcbiAgICogdmFsdWUgaXMgb25lIG9mICdjcHUnLCAnY3B1LXBpbm5lZCcsICdncHUtYnVmZmVyJywgJ21sLXRlbnNvcicuXG4gICAqL1xuICByZWFkb25seSBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnM6IHJlYWRvbmx5IFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0W107XG5cbiAgLyoqXG4gICAqIGVudW0gdmFsdWUgb2YgdGhlIHByZWZlcnJlZCBsb2NhdGlvbiBmb3IgZWFjaCBvdXRwdXQgdGVuc29yLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZDogcmVhZG9ubHkgbnVtYmVyW107XG59O1xuXG4vKipcbiAqICB0dXBsZSBlbGVtZW50cyBhcmU6IEluZmVyZW5jZVNlc3Npb24gSUQ7IGlucHV0TmFtZXNVVEY4RW5jb2RlZDsgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZDsgYmluZGluZ1N0YXRlXG4gKi9cbnR5cGUgU2Vzc2lvbk1ldGFkYXRhID0gW1xuICBpbmZlcmVuY2VTZXNzaW9uSWQ6IG51bWJlcixcbiAgaW5wdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSxcbiAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZDogbnVtYmVyW10sXG4gIGJpbmRpbmdTdGF0ZTogSU9CaW5kaW5nU3RhdGUgfCBudWxsLFxuICBlbmFibGVHcmFwaENhcHR1cmU6IGJvb2xlYW4sXG4gIGlucHV0T3V0cHV0Qm91bmQ6IGJvb2xlYW4sXG5dO1xuXG5jb25zdCBhY3RpdmVTZXNzaW9ucyA9IG5ldyBNYXA8bnVtYmVyLCBTZXNzaW9uTWV0YWRhdGE+KCk7XG5cbi8qKlxuICogZ2V0IHRoZSBpbnB1dC9vdXRwdXQgY291bnQgb2YgdGhlIHNlc3Npb24uXG4gKiBAcGFyYW0gc2Vzc2lvbkhhbmRsZSB0aGUgaGFuZGxlIHJlcHJlc2VudGluZyB0aGUgc2Vzc2lvbi4gc2hvdWxkIGJlIG5vbi16ZXJvLlxuICogQHJldHVybnMgYSB0dXBsZSBpbmNsdWRpbmcgMiBudW1iZXJzLCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGNvdW50IGFuZCBvdXRwdXQgY291bnQuXG4gKi9cbmNvbnN0IGdldFNlc3Npb25JbnB1dE91dHB1dENvdW50ID0gKHNlc3Npb25IYW5kbGU6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICB0cnkge1xuICAgIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xuICAgIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoMiAqIHB0clNpemUpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldElucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSwgZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIHB0clNpemUpO1xuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IGNvdW50LlwiKTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IHB0clNpemUgPT09IDQgPyAnaTMyJyA6ICdpNjQnO1xuICAgIHJldHVybiBbTnVtYmVyKHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCwgdHlwZSkpLCBOdW1iZXIod2FzbS5nZXRWYWx1ZShkYXRhT2Zmc2V0ICsgcHRyU2l6ZSwgdHlwZSkpXTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gIH1cbn07XG5cbmNvbnN0IGdldFNlc3Npb25JbnB1dE91dHB1dE1ldGFkYXRhID0gKFxuICBzZXNzaW9uSGFuZGxlOiBudW1iZXIsXG4gIGluZGV4OiBudW1iZXIsXG4pOiBbbmFtZU9mZnNldDogbnVtYmVyLCBlbGVtZW50VHlwZTogbnVtYmVyLCBkaW1zPzogQXJyYXk8bnVtYmVyIHwgc3RyaW5nPl0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICBsZXQgbWV0YWRhdGFPZmZzZXQgPSAwO1xuICB0cnkge1xuICAgIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xuICAgIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoMiAqIHB0clNpemUpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldElucHV0T3V0cHV0TWV0YWRhdGEoc2Vzc2lvbkhhbmRsZSwgaW5kZXgsIGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBwdHJTaXplKTtcbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBzZXNzaW9uIGlucHV0L291dHB1dCBtZXRhZGF0YS5cIik7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBOdW1iZXIod2FzbS5nZXRWYWx1ZShkYXRhT2Zmc2V0LCAnKicpKTtcbiAgICBtZXRhZGF0YU9mZnNldCA9IE51bWJlcih3YXNtLmdldFZhbHVlKGRhdGFPZmZzZXQgKyBwdHJTaXplLCAnKicpKTtcbiAgICAvLyBnZXQgZWxlbWVudCB0eXBlXG4gICAgY29uc3QgZWxlbWVudFR5cGUgPSB3YXNtLkhFQVAzMlttZXRhZGF0YU9mZnNldCAvIDRdO1xuICAgIGlmIChlbGVtZW50VHlwZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtuYW1lT2Zmc2V0LCAwXTsgLy8gbm9uLXRlbnNvclxuICAgIH1cblxuICAgIC8vIGdldCBkaW1zIGNvdW50XG4gICAgY29uc3QgZGltc0NvdW50ID0gd2FzbS5IRUFQVTMyW21ldGFkYXRhT2Zmc2V0IC8gNCArIDFdO1xuICAgIC8vIGdldCBkaW1zXG4gICAgY29uc3QgZGltczogQXJyYXk8bnVtYmVyIHwgc3RyaW5nPiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltc0NvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IHN5bWJvbGljRGltTmFtZU9mZnNldCA9IE51bWJlcih3YXNtLmdldFZhbHVlKG1ldGFkYXRhT2Zmc2V0ICsgOCArIGkgKiBwdHJTaXplLCAnKicpKTtcbiAgICAgIGRpbXMucHVzaChcbiAgICAgICAgc3ltYm9saWNEaW1OYW1lT2Zmc2V0ICE9PSAwXG4gICAgICAgICAgPyB3YXNtLlVURjhUb1N0cmluZyhzeW1ib2xpY0RpbU5hbWVPZmZzZXQpXG4gICAgICAgICAgOiBOdW1iZXIod2FzbS5nZXRWYWx1ZShtZXRhZGF0YU9mZnNldCArIDggKyAoaSArIGRpbXNDb3VudCkgKiBwdHJTaXplLCAnKicpKSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBbbmFtZU9mZnNldCwgZWxlbWVudFR5cGUsIGRpbXNdO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgICBpZiAobWV0YWRhdGFPZmZzZXQgIT09IDApIHtcbiAgICAgIHdhc20uX09ydEZyZWUobWV0YWRhdGFPZmZzZXQpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBhbGxvY2F0ZSB0aGUgbWVtb3J5IGFuZCBtZW1jcHkgdGhlIGV4dGVybmFsIGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0gbW9kZWwgLSB0aGUgZXh0ZXJuYWwgYnVmZmVyIGNvbnRhaW5pbmcgdGhlIG1vZGVsIGRhdGEuIE11c3Qgbm90IGJlIHRoZSBzYW1lIGJ1ZmZlciBhcyB0aGUgV0FTTSBoZWFwLlxuICogQHJldHVybnMgYSAyLWVsZW1lbnRzIHR1cGxlIC0gdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIGFsbG9jYXRlZCBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIgPSAobW9kZWw6IFVpbnQ4QXJyYXkpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IG1vZGVsRGF0YU9mZnNldCA9IHdhc20uX21hbGxvYyhtb2RlbC5ieXRlTGVuZ3RoKTtcbiAgaWYgKG1vZGVsRGF0YU9mZnNldCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgY3JlYXRlIGEgc2Vzc2lvbi4gZmFpbGVkIHRvIGFsbG9jYXRlIGEgYnVmZmVyIG9mIHNpemUgJHttb2RlbC5ieXRlTGVuZ3RofS5gKTtcbiAgfVxuICB3YXNtLkhFQVBVOC5zZXQobW9kZWwsIG1vZGVsRGF0YU9mZnNldCk7XG4gIHJldHVybiBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbC5ieXRlTGVuZ3RoXTtcbn07XG5cbi8qKlxuICogY3JlYXRlIGFuIGluZmVyZW5jZSBzZXNzaW9uIGZyb20gYSBtb2RlbCBkYXRhIGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0gbW9kZWxEYXRhIC0gZWl0aGVyIGEgVWludDhBcnJheSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBtb2RlbCBkYXRhLCBvciBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGVcbiAqICAgICBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBtb2RlbCBkYXRhIGJ1ZmZlci5cbiAqIEBwYXJhbSBvcHRpb25zIGFuIG9wdGlvbmFsIHNlc3Npb24gb3B0aW9ucyBvYmplY3QuXG4gKiBAcmV0dXJucyBhIDMtZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyBbc2Vzc2lvbiBoYW5kbGUsIGlucHV0IG5hbWVzLCBvdXRwdXQgbmFtZXNdXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID0gYXN5bmMgKFxuICBtb2RlbERhdGE6IFVpbnQ4QXJyYXkgfCBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcbiAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4pOiBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4gPT4ge1xuICBsZXQgbW9kZWxEYXRhT2Zmc2V0OiBudW1iZXIsIG1vZGVsRGF0YUxlbmd0aDogbnVtYmVyO1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbERhdGEpKSB7XG4gICAgLy8gaWYgbW9kZWwgZGF0YSBpcyBhbiBhcnJheSwgaXQgbXVzdCBiZSBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YVxuICAgIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aF0gPSBtb2RlbERhdGE7XG4gIH0gZWxzZSBpZiAobW9kZWxEYXRhLmJ1ZmZlciA9PT0gd2FzbS5IRUFQVTguYnVmZmVyKSB7XG4gICAgLy8gaWYgbW9kZWwgZGF0YSB1c2VzIHRoZSBzYW1lIGJ1ZmZlciBhcyB0aGUgV0FTTSBoZWFwLCB3ZSBkb24ndCBuZWVkIHRvIGNvcHkgaXQuXG4gICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IFttb2RlbERhdGEuYnl0ZU9mZnNldCwgbW9kZWxEYXRhLmJ5dGVMZW5ndGhdO1xuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyd2lzZSwgY29weSB0aGUgbW9kZWwgZGF0YSB0byB0aGUgV0FTTSBoZWFwLlxuICAgIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aF0gPSBjb3B5RnJvbUV4dGVybmFsQnVmZmVyKG1vZGVsRGF0YSk7XG4gIH1cblxuICBsZXQgc2Vzc2lvbkhhbmRsZSA9IDA7XG4gIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGxldCBpb0JpbmRpbmdIYW5kbGUgPSAwO1xuICBsZXQgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBpbnB1dE5hbWVzVVRGOEVuY29kZWQgPSBbXTtcbiAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IFtdO1xuXG4gIHRyeSB7XG4gICAgW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdID0gYXdhaXQgc2V0U2Vzc2lvbk9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucz8uZXh0ZXJuYWxEYXRhICYmIHdhc20ubW91bnRFeHRlcm5hbERhdGEpIHtcbiAgICAgIGNvbnN0IGxvYWRpbmdQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIG9wdGlvbnMuZXh0ZXJuYWxEYXRhKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycgPyBmaWxlIDogZmlsZS5wYXRoO1xuICAgICAgICBsb2FkaW5nUHJvbWlzZXMucHVzaChcbiAgICAgICAgICBsb2FkRmlsZSh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycgPyBmaWxlIDogZmlsZS5kYXRhKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB3YXNtLm1vdW50RXh0ZXJuYWxEYXRhKHBhdGgsIGRhdGEpO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyB3YWl0IGZvciBhbGwgZXh0ZXJuYWwgZGF0YSBmaWxlcyB0byBiZSBsb2FkZWRcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGxvYWRpbmdQcm9taXNlcyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwcm92aWRlciBvZiBvcHRpb25zPy5leGVjdXRpb25Qcm92aWRlcnMgPz8gW10pIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyTmFtZSA9IHR5cGVvZiBwcm92aWRlciA9PT0gJ3N0cmluZycgPyBwcm92aWRlciA6IHByb3ZpZGVyLm5hbWU7XG4gICAgICBpZiAocHJvdmlkZXJOYW1lID09PSAnd2Vibm4nKSB7XG4gICAgICAgIHdhc20uc2hvdWxkVHJhbnNmZXJUb01MVGVuc29yID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvdmlkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3Qgd2Vibm5PcHRpb25zID0gcHJvdmlkZXIgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XG4gICAgICAgICAgY29uc3QgZ3B1RGV2aWNlID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OT3B0aW9uc1dlYkdwdSk/LmdwdURldmljZTtcbiAgICAgICAgICBjb25zdCBkZXZpY2VUeXBlID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OQ29udGV4dE9wdGlvbnMpPy5kZXZpY2VUeXBlO1xuICAgICAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8ucG93ZXJQcmVmZXJlbmNlO1xuICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gY29udGV4dCBhcyBNTENvbnRleHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChncHVEZXZpY2UpIHtcbiAgICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCB3YXNtLndlYm5uQ3JlYXRlTUxDb250ZXh0IShncHVEZXZpY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gYXdhaXQgd2FzbS53ZWJubkNyZWF0ZU1MQ29udGV4dCEoeyBkZXZpY2VUeXBlLCBwb3dlclByZWZlcmVuY2UgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCB3YXNtLndlYm5uQ3JlYXRlTUxDb250ZXh0ISgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNlc3Npb25IYW5kbGUgPSBhd2FpdCB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uKG1vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoLCBzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgd2FzbS53ZWJncHVPbkNyZWF0ZVNlc3Npb24/LihzZXNzaW9uSGFuZGxlKTtcbiAgICBpZiAoc2Vzc2lvbkhhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjcmVhdGUgYSBzZXNzaW9uLlwiKTtcbiAgICB9XG5cbiAgICB3YXNtLmpzZXBPbkNyZWF0ZVNlc3Npb24/LigpO1xuXG4gICAgLy8gY2xlYXIgY3VycmVudCBNTENvbnRleHQgYWZ0ZXIgc2Vzc2lvbiBjcmVhdGlvblxuICAgIGlmICh3YXNtLmN1cnJlbnRDb250ZXh0KSB7XG4gICAgICB3YXNtLndlYm5uUmVnaXN0ZXJNTENvbnRleHQhKHNlc3Npb25IYW5kbGUsIHdhc20uY3VycmVudENvbnRleHQpO1xuICAgICAgd2FzbS5jdXJyZW50Q29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgIHdhc20uc2hvdWxkVHJhbnNmZXJUb01MVGVuc29yID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBbaW5wdXRDb3VudCwgb3V0cHV0Q291bnRdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSk7XG5cbiAgICBjb25zdCBlbmFibGVHcmFwaENhcHR1cmUgPSAhIW9wdGlvbnM/LmVuYWJsZUdyYXBoQ2FwdHVyZTtcblxuICAgIGNvbnN0IGlucHV0TmFtZXMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXROYW1lcyA9IFtdO1xuICAgIGNvbnN0IGlucHV0TWV0YWRhdGE6IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdID0gW107XG4gICAgY29uc3Qgb3V0cHV0TWV0YWRhdGE6IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdID0gW107XG4gICAgY29uc3Qgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zOiBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dFtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IFtuYW1lT2Zmc2V0LCBlbGVtZW50VHlwZSwgc2hhcGVdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0TWV0YWRhdGEoc2Vzc2lvbkhhbmRsZSwgaSk7XG4gICAgICBpZiAobmFtZU9mZnNldCA9PT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBpbnB1dCBuYW1lLlwiKTtcbiAgICAgIH1cbiAgICAgIGlucHV0TmFtZXNVVEY4RW5jb2RlZC5wdXNoKG5hbWVPZmZzZXQpO1xuICAgICAgY29uc3QgbmFtZSA9IHdhc20uVVRGOFRvU3RyaW5nKG5hbWVPZmZzZXQpO1xuICAgICAgaW5wdXROYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgaW5wdXRNZXRhZGF0YS5wdXNoKFxuICAgICAgICBlbGVtZW50VHlwZSA9PT0gMFxuICAgICAgICAgID8geyBuYW1lLCBpc1RlbnNvcjogZmFsc2UgfVxuICAgICAgICAgIDogeyBuYW1lLCBpc1RlbnNvcjogdHJ1ZSwgdHlwZTogdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcoZWxlbWVudFR5cGUpLCBzaGFwZTogc2hhcGUhIH0sXG4gICAgICApO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IFtuYW1lT2Zmc2V0LCBlbGVtZW50VHlwZSwgc2hhcGVdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0TWV0YWRhdGEoc2Vzc2lvbkhhbmRsZSwgaSArIGlucHV0Q291bnQpO1xuICAgICAgaWYgKG5hbWVPZmZzZXQgPT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBnZXQgYW4gb3V0cHV0IG5hbWUuXCIpO1xuICAgICAgfVxuICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5wdXNoKG5hbWVPZmZzZXQpO1xuICAgICAgY29uc3QgbmFtZVN0cmluZyA9IHdhc20uVVRGOFRvU3RyaW5nKG5hbWVPZmZzZXQpO1xuICAgICAgb3V0cHV0TmFtZXMucHVzaChuYW1lU3RyaW5nKTtcbiAgICAgIG91dHB1dE1ldGFkYXRhLnB1c2goXG4gICAgICAgIGVsZW1lbnRUeXBlID09PSAwXG4gICAgICAgICAgPyB7IG5hbWU6IG5hbWVTdHJpbmcsIGlzVGVuc29yOiBmYWxzZSB9XG4gICAgICAgICAgOiB7IG5hbWU6IG5hbWVTdHJpbmcsIGlzVGVuc29yOiB0cnVlLCB0eXBlOiB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhlbGVtZW50VHlwZSksIHNoYXBlOiBzaGFwZSEgfSxcbiAgICAgICk7XG5cbiAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgfHwgIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcbiAgICAgICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2goJ2dwdS1idWZmZXInKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9XG4gICAgICAgICAgdHlwZW9mIG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBvcHRpb25zLnByZWZlcnJlZE91dHB1dExvY2F0aW9uXG4gICAgICAgICAgICA6IChvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj8uW25hbWVTdHJpbmddID8/ICdjcHUnKTtcbiAgICAgICAgY29uc3QgaXNHcmFwaE91dHB1dCA9IHdhc20ud2Vibm5Jc0dyYXBoT3V0cHV0O1xuICAgICAgICBpZiAobG9jYXRpb24gPT09ICdjcHUnICYmIGlzR3JhcGhPdXRwdXQgJiYgaXNHcmFwaE91dHB1dChzZXNzaW9uSGFuZGxlLCBuYW1lU3RyaW5nKSkge1xuICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKCdtbC10ZW5zb3ItY3B1LW91dHB1dCcpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhdGlvbiAhPT0gJ2NwdScgJiYgbG9jYXRpb24gIT09ICdjcHUtcGlubmVkJyAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInICYmIGxvY2F0aW9uICE9PSAnbWwtdGVuc29yJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCBwcmVmZXJyZWQgb3V0cHV0IGxvY2F0aW9uOiAke2xvY2F0aW9ufS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5hYmxlR3JhcGhDYXB0dXJlICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgTm90IHN1cHBvcnRlZCBwcmVmZXJyZWQgb3V0cHV0IGxvY2F0aW9uOiAke2xvY2F0aW9ufS4gT25seSAnZ3B1LWJ1ZmZlcicgbG9jYXRpb24gaXMgc3VwcG9ydGVkIHdoZW4gZW5hYmxlR3JhcGhDYXB0dXJlIGlzIHRydWUuYCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1c2UgSU8gYmluZGluZyBvbmx5IHdoZW4gYXQgbGVhc3Qgb25lIG91dHB1dCBpcyBwcmVmZXJyZWQgdG8gYmUgb24gR1BVLlxuICAgIGxldCBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKFxuICAgICAgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkgJiZcbiAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5zb21lKChsKSA9PiBsID09PSAnZ3B1LWJ1ZmZlcicgfHwgbCA9PT0gJ21sLXRlbnNvcicgfHwgbCA9PT0gJ21sLXRlbnNvci1jcHUtb3V0cHV0JylcbiAgICApIHtcbiAgICAgIGlvQmluZGluZ0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZUJpbmRpbmcoc2Vzc2lvbkhhbmRsZSk7XG4gICAgICBpZiAoaW9CaW5kaW5nSGFuZGxlID09PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY3JlYXRlIElPIGJpbmRpbmcuXCIpO1xuICAgICAgfVxuXG4gICAgICBiaW5kaW5nU3RhdGUgPSB7XG4gICAgICAgIGhhbmRsZTogaW9CaW5kaW5nSGFuZGxlLFxuICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsXG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IG91dHB1dFByZWZlcnJlZExvY2F0aW9uc1xuICAgICAgICAgIC8vICdtbC10ZW5zb3ItY3B1LW91dHB1dCcgaXMgdHJlYXRlZCBhcyAnbWwtdGVuc29yJyBmb3IgdGhlIHB1cnBvc2Ugb2YgSU8gYmluZGluZy5cbiAgICAgICAgICAubWFwKChsKSA9PiAobCA9PT0gJ21sLXRlbnNvci1jcHUtb3V0cHV0JyA/ICdtbC10ZW5zb3InIDogbCkpXG4gICAgICAgICAgLm1hcCgobCkgPT4gZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGwpKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25IYW5kbGUsIFtcbiAgICAgIHNlc3Npb25IYW5kbGUsXG4gICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLFxuICAgICAgYmluZGluZ1N0YXRlLFxuICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxuICAgICAgZmFsc2UsXG4gICAgXSk7XG4gICAgcmV0dXJuIFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzLCBvdXRwdXROYW1lcywgaW5wdXRNZXRhZGF0YSwgb3V0cHV0TWV0YWRhdGFdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goKGJ1ZikgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goKGJ1ZikgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcblxuICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgIT09IDApIHtcbiAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlQmluZGluZyhpb0JpbmRpbmdIYW5kbGUpICE9PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBJTyBiaW5kaW5nLlwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbkhhbmRsZSAhPT0gMCkge1xuICAgICAgaWYgKHdhc20uX09ydFJlbGVhc2VTZXNzaW9uKHNlc3Npb25IYW5kbGUpICE9PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBzZXNzaW9uLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLl9mcmVlKG1vZGVsRGF0YU9mZnNldCk7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zKHNlc3Npb25PcHRpb25zSGFuZGxlKSAhPT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2Ugc2Vzc2lvbiBvcHRpb25zLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYWxsb2NzLmZvckVhY2goKGFsbG9jKSA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG5cbiAgICAvLyB1bm1vdW50IGV4dGVybmFsIGRhdGEgaWYgbmVjZXNzYXJ5XG4gICAgd2FzbS51bm1vdW50RXh0ZXJuYWxEYXRhPy4oKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJlbGVhc2Ugc2Vzc2lvbi4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcbiAgfVxuICBjb25zdCBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZSwgZW5hYmxlR3JhcGhDYXB0dXJlXSA9IHNlc3Npb247XG5cbiAgaWYgKGlvQmluZGluZ1N0YXRlKSB7XG4gICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSkge1xuICAgICAgaWYgKHdhc20uX09ydENsZWFyQm91bmRPdXRwdXRzKGlvQmluZGluZ1N0YXRlLmhhbmRsZSkgIT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjbGVhciBib3VuZCBvdXRwdXRzLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHdhc20uX09ydFJlbGVhc2VCaW5kaW5nKGlvQmluZGluZ1N0YXRlLmhhbmRsZSkgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBJTyBiaW5kaW5nLlwiKTtcbiAgICB9XG4gIH1cblxuICB3YXNtLmpzZXBPblJlbGVhc2VTZXNzaW9uPy4oc2Vzc2lvbklkKTtcbiAgd2FzbS53ZWJubk9uUmVsZWFzZVNlc3Npb24/LihzZXNzaW9uSWQpO1xuICB3YXNtLndlYmdwdU9uUmVsZWFzZVNlc3Npb24/LihzZXNzaW9uSWQpO1xuXG4gIGlucHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKChidWYpID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG4gIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICBpZiAod2FzbS5fT3J0UmVsZWFzZVNlc3Npb24oc2Vzc2lvbkhhbmRsZSkgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2Ugc2Vzc2lvbi5cIik7XG4gIH1cbiAgYWN0aXZlU2Vzc2lvbnMuZGVsZXRlKHNlc3Npb25JZCk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yID0gYXN5bmMgKFxuICB0ZW5zb3I6IFRlbnNvck1ldGFkYXRhIHwgbnVsbCxcbiAgdGVuc29ySGFuZGxlczogbnVtYmVyW10sXG4gIGFsbG9jczogbnVtYmVyW10sXG4gIHNlc3Npb25JZDogbnVtYmVyLFxuICB0ZW5zb3JOYW1lVVRGOEVuY29kZWQ6IG51bWJlcixcbiAgaW5kZXg6IG51bWJlcixcbiAgZW5hYmxlR3JhcGhDYXB0dXJlID0gZmFsc2UsXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCF0ZW5zb3IpIHtcbiAgICB0ZW5zb3JIYW5kbGVzLnB1c2goMCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xuXG4gIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xuICBjb25zdCBkaW1zID0gdGVuc29yWzFdO1xuICBjb25zdCBsb2NhdGlvbiA9IHRlbnNvclszXTtcbiAgbGV0IGFjdHVhbExvY2F0aW9uID0gbG9jYXRpb247XG5cbiAgbGV0IHJhd0RhdGE6IG51bWJlcjtcbiAgbGV0IGRhdGFCeXRlTGVuZ3RoOiBudW1iZXI7XG5cbiAgaWYgKGRhdGFUeXBlID09PSAnc3RyaW5nJyAmJiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyB8fCBsb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xuICB9XG5cbiAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEV4dGVybmFsIGJ1ZmZlciBtdXN0IGJlIHByb3ZpZGVkIGZvciBpbnB1dC9vdXRwdXQgaW5kZXggJHtpbmRleH0gd2hlbiBlbmFibGVHcmFwaENhcHR1cmUgaXMgdHJ1ZS5gLFxuICAgICk7XG4gIH1cblxuICBpZiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgIGNvbnN0IGdwdUJ1ZmZlciA9IHRlbnNvclsyXS5ncHVCdWZmZXI7XG4gICAgZGF0YUJ5dGVMZW5ndGggPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyh0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksIGRpbXMpITtcblxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgICAgY29uc3QgcmVnaXN0ZXJCdWZmZXIgPSB3YXNtLndlYmdwdVJlZ2lzdGVyQnVmZmVyO1xuICAgICAgaWYgKCFyZWdpc3RlckJ1ZmZlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcImdwdS1idWZmZXJcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViR1BVLicpO1xuICAgICAgfVxuXG4gICAgICByYXdEYXRhID0gcmVnaXN0ZXJCdWZmZXIoZ3B1QnVmZmVyLCBzZXNzaW9uSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZWdpc3RlckJ1ZmZlciA9IHdhc20uanNlcFJlZ2lzdGVyQnVmZmVyO1xuICAgICAgaWYgKCFyZWdpc3RlckJ1ZmZlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcImdwdS1idWZmZXJcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViR1BVLicpO1xuICAgICAgfVxuICAgICAgcmF3RGF0YSA9IHJlZ2lzdGVyQnVmZmVyKHNlc3Npb25JZCwgaW5kZXgsIGdwdUJ1ZmZlciwgZGF0YUJ5dGVMZW5ndGgpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChsb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicpIHtcbiAgICBjb25zdCBtbFRlbnNvciA9IHRlbnNvclsyXS5tbFRlbnNvciBhcyBNTFRlbnNvcjtcbiAgICBkYXRhQnl0ZUxlbmd0aCA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgZGltcykhO1xuXG4gICAgY29uc3QgcmVnaXN0ZXJNTFRlbnNvciA9IHdhc20ud2Vibm5SZWdpc3Rlck1MVGVuc29yO1xuICAgIGlmICghcmVnaXN0ZXJNTFRlbnNvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgbG9jYXRpb24gXCJtbC10ZW5zb3JcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViTk4uJyk7XG4gICAgfVxuICAgIHJhd0RhdGEgPSByZWdpc3Rlck1MVGVuc29yKHNlc3Npb25JZCwgbWxUZW5zb3IsIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgZGltcyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICBkYXRhQnl0ZUxlbmd0aCA9IHB0clNpemUgKiBkYXRhLmxlbmd0aDtcbiAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHRlbnNvciBkYXRhIGF0IGluZGV4ICR7aX0gaXMgbm90IGEgc3RyaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgd2FzbS5zZXRWYWx1ZShyYXdEYXRhICsgaSAqIHB0clNpemUsIGFsbG9jV2FzbVN0cmluZyhkYXRhW2ldLCBhbGxvY3MpLCAnKicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpc0dyYXBoSW5wdXQgPSB3YXNtLndlYm5uSXNHcmFwaElucHV0O1xuICAgICAgY29uc3QgaXNHcmFwaE91dHB1dCA9IHdhc20ud2Vibm5Jc0dyYXBoT3V0cHV0O1xuICAgICAgaWYgKGRhdGFUeXBlICE9PSAnc3RyaW5nJyAmJiBpc0dyYXBoSW5wdXQgJiYgaXNHcmFwaE91dHB1dCkge1xuICAgICAgICBjb25zdCB0ZW5zb3JOYW1lID0gd2FzbS5VVEY4VG9TdHJpbmcodGVuc29yTmFtZVVURjhFbmNvZGVkKTtcbiAgICAgICAgLy8gUHJvbW90ZSB0aGUgdGVuc29yIHRvICdtbC10ZW5zb3InIGlmIGl0IGlzIGEgZ3JhcGggaW5wdXQuXG4gICAgICAgIGlmIChpc0dyYXBoSW5wdXQoc2Vzc2lvbklkLCB0ZW5zb3JOYW1lKSB8fCBpc0dyYXBoT3V0cHV0KHNlc3Npb25JZCwgdGVuc29yTmFtZSkpIHtcbiAgICAgICAgICBjb25zdCBkYXRhVHlwZUVudW0gPSB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSk7XG4gICAgICAgICAgZGF0YUJ5dGVMZW5ndGggPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyhkYXRhVHlwZUVudW0sIGRpbXMpITtcbiAgICAgICAgICBhY3R1YWxMb2NhdGlvbiA9ICdtbC10ZW5zb3InO1xuICAgICAgICAgIGNvbnN0IGNyZWF0ZVRlbXBvcmFyeVRlbnNvciA9IHdhc20ud2Vibm5DcmVhdGVUZW1wb3JhcnlUZW5zb3I7XG4gICAgICAgICAgY29uc3QgdXBsb2FkVGVuc29yID0gd2FzbS53ZWJublVwbG9hZFRlbnNvcjtcbiAgICAgICAgICBpZiAoIWNyZWF0ZVRlbXBvcmFyeVRlbnNvciB8fCAhdXBsb2FkVGVuc29yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcIm1sLXRlbnNvclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJOTi4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdGVuc29ySWQgPSBhd2FpdCBjcmVhdGVUZW1wb3JhcnlUZW5zb3Ioc2Vzc2lvbklkLCBkYXRhVHlwZUVudW0sIGRpbXMgYXMgbnVtYmVyW10pO1xuICAgICAgICAgIHVwbG9hZFRlbnNvcih0ZW5zb3JJZCwgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKSk7XG4gICAgICAgICAgcmF3RGF0YSA9IHRlbnNvcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgICAgIGFsbG9jcy5wdXNoKHJhd0RhdGEpO1xuICAgICAgICAgIHdhc20uSEVBUFU4LnNldChuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhQnl0ZUxlbmd0aCksIHJhd0RhdGEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICAgIGFsbG9jcy5wdXNoKHJhd0RhdGEpO1xuICAgICAgICB3YXNtLkhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YUJ5dGVMZW5ndGgpLCByYXdEYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIGRpbXMubGVuZ3RoKTtcbiAgdHJ5IHtcbiAgICBkaW1zLmZvckVhY2goKGQsIGluZGV4KSA9PiB3YXNtLnNldFZhbHVlKGRpbXNPZmZzZXQgKyBpbmRleCAqIHB0clNpemUsIGQsIHB0clNpemUgPT09IDQgPyAnaTMyJyA6ICdpNjQnKSk7XG4gICAgY29uc3QgdGVuc29yID0gd2FzbS5fT3J0Q3JlYXRlVGVuc29yKFxuICAgICAgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpLFxuICAgICAgcmF3RGF0YSxcbiAgICAgIGRhdGFCeXRlTGVuZ3RoLFxuICAgICAgZGltc09mZnNldCxcbiAgICAgIGRpbXMubGVuZ3RoLFxuICAgICAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGFjdHVhbExvY2F0aW9uKSxcbiAgICApO1xuICAgIGlmICh0ZW5zb3IgPT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBjcmVhdGUgdGVuc29yIGZvciBpbnB1dC9vdXRwdXQuIHNlc3Npb249JHtzZXNzaW9uSWR9LCBpbmRleD0ke2luZGV4fS5gKTtcbiAgICB9XG4gICAgdGVuc29ySGFuZGxlcy5wdXNoKHRlbnNvcik7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuXG4vKipcbiAqIHBlcmZvcm0gaW5mZXJlbmNlIHJ1blxuICovXG5leHBvcnQgY29uc3QgcnVuID0gYXN5bmMgKFxuICBzZXNzaW9uSWQ6IG51bWJlcixcbiAgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgaW5wdXRUZW5zb3JzOiBUZW5zb3JNZXRhZGF0YVtdLFxuICBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgb3V0cHV0VGVuc29yczogQXJyYXk8VGVuc29yTWV0YWRhdGEgfCBudWxsPixcbiAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxuKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBwdHJTaXplID0gd2FzbS5QVFJfU0laRTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBydW4gaW5mZXJlbmNlLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xuICB9XG4gIGNvbnN0IHNlc3Npb25IYW5kbGUgPSBzZXNzaW9uWzBdO1xuICBjb25zdCBpbnB1dE5hbWVzVVRGOEVuY29kZWQgPSBzZXNzaW9uWzFdO1xuICBjb25zdCBvdXRwdXROYW1lc1VURjhFbmNvZGVkID0gc2Vzc2lvblsyXTtcbiAgY29uc3QgaW9CaW5kaW5nU3RhdGUgPSBzZXNzaW9uWzNdO1xuICBjb25zdCBlbmFibGVHcmFwaENhcHR1cmUgPSBzZXNzaW9uWzRdO1xuICBjb25zdCBpbnB1dE91dHB1dEJvdW5kID0gc2Vzc2lvbls1XTtcblxuICBjb25zdCBpbnB1dENvdW50ID0gaW5wdXRJbmRpY2VzLmxlbmd0aDtcbiAgY29uc3Qgb3V0cHV0Q291bnQgPSBvdXRwdXRJbmRpY2VzLmxlbmd0aDtcblxuICBsZXQgcnVuT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGxldCBydW5PcHRpb25zQWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IGlucHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3Qgb3V0cHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3QgaW5wdXRPdXRwdXRBbGxvY3M6IG51bWJlcltdID0gW107XG5cbiAgY29uc3QgYmVmb3JlUnVuU3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICBjb25zdCBpbnB1dFZhbHVlc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhpbnB1dENvdW50ICogcHRyU2l6ZSk7XG4gIGNvbnN0IGlucHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIHB0clNpemUpO1xuICBjb25zdCBvdXRwdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2Mob3V0cHV0Q291bnQgKiBwdHJTaXplKTtcbiAgY29uc3Qgb3V0cHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2Mob3V0cHV0Q291bnQgKiBwdHJTaXplKTtcblxuICB0cnkge1xuICAgIFtydW5PcHRpb25zSGFuZGxlLCBydW5PcHRpb25zQWxsb2NzXSA9IHNldFJ1bk9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBUUkFDRV9FVkVOVF9CRUdJTignd2FzbSBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3InKTtcbiAgICAvLyBjcmVhdGUgaW5wdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICBhd2FpdCBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IoXG4gICAgICAgIGlucHV0VGVuc29yc1tpXSxcbiAgICAgICAgaW5wdXRUZW5zb3JIYW5kbGVzLFxuICAgICAgICBpbnB1dE91dHB1dEFsbG9jcyxcbiAgICAgICAgc2Vzc2lvbklkLFxuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5wdXRJbmRpY2VzW2ldXSxcbiAgICAgICAgaW5wdXRJbmRpY2VzW2ldLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBvdXRwdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgYXdhaXQgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKFxuICAgICAgICBvdXRwdXRUZW5zb3JzW2ldLFxuICAgICAgICBvdXRwdXRUZW5zb3JIYW5kbGVzLFxuICAgICAgICBpbnB1dE91dHB1dEFsbG9jcyxcbiAgICAgICAgc2Vzc2lvbklkLFxuICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkW291dHB1dEluZGljZXNbaV1dLFxuICAgICAgICBpbnB1dENvdW50ICsgb3V0cHV0SW5kaWNlc1tpXSxcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxuICAgICAgKTtcbiAgICB9XG4gICAgVFJBQ0VfRVZFTlRfRU5EKCd3YXNtIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcicpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgIHdhc20uc2V0VmFsdWUoaW5wdXRWYWx1ZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgaW5wdXRUZW5zb3JIYW5kbGVzW2ldLCAnKicpO1xuICAgICAgd2FzbS5zZXRWYWx1ZShpbnB1dE5hbWVzT2Zmc2V0ICsgaSAqIHB0clNpemUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZFtpbnB1dEluZGljZXNbaV1dLCAnKicpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgIHdhc20uc2V0VmFsdWUob3V0cHV0VmFsdWVzT2Zmc2V0ICsgaSAqIHB0clNpemUsIG91dHB1dFRlbnNvckhhbmRsZXNbaV0sICcqJyk7XG4gICAgICB3YXNtLnNldFZhbHVlKG91dHB1dE5hbWVzT2Zmc2V0ICsgaSAqIHB0clNpemUsIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbb3V0cHV0SW5kaWNlc1tpXV0sICcqJyk7XG4gICAgfVxuXG4gICAgaWYgKCghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgfHwgIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpICYmIGlvQmluZGluZ1N0YXRlICYmICFpbnB1dE91dHB1dEJvdW5kKSB7XG4gICAgICBjb25zdCB7IGhhbmRsZSwgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkIH0gPSBpb0JpbmRpbmdTdGF0ZTtcblxuICAgICAgaWYgKGlucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGggIT09IGlucHV0Q291bnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBpbnB1dCBjb3VudCBmcm9tIGZlZWRzICgke2lucHV0Q291bnR9KSBpcyBleHBlY3RlZCB0byBiZSBhbHdheXMgZXF1YWwgdG8gbW9kZWwncyBpbnB1dCBjb3VudCAoJHtpbnB1dE5hbWVzVVRGOEVuY29kZWQubGVuZ3RofSkuYCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgVFJBQ0VfRVZFTlRfQkVHSU4oJ3dhc20gYmluZElucHV0c091dHB1dHMnKTtcbiAgICAgIC8vIHByb2Nlc3MgaW5wdXRzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IGlucHV0SW5kaWNlc1tpXTtcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0QmluZElucHV0KGhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgaW5wdXRUZW5zb3JIYW5kbGVzW2ldKTtcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIGlucHV0WyR7aX1dIGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBwcm9jZXNzIHByZS1hbGxvY2F0ZWQgb3V0cHV0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gb3V0cHV0SW5kaWNlc1tpXTtcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBvdXRwdXRUZW5zb3JzW2ldPy5bM107IC8vIHVuZGVmaW5lZCBtZWFucyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuXG5cbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICAgICAgLy8gb3V0cHV0IGlzIHByZS1hbGxvY2F0ZWQuIGJpbmQgdGhlIHRlbnNvci5cbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRCaW5kT3V0cHV0KGhhbmRsZSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIG91dHB1dFRlbnNvckhhbmRsZXNbaV0sIDApO1xuICAgICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIHByZS1hbGxvY2F0ZWQgb3V0cHV0WyR7aX1dIGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb3V0cHV0IGlzIG5vdCBwcmUtYWxsb2NhdGVkLiByZXNldCBwcmVmZXJyZWQgbG9jYXRpb24uXG4gICAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0QmluZE91dHB1dChcbiAgICAgICAgICAgIGhhbmRsZSxcbiAgICAgICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWRbaW5kZXhdLFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgb3V0cHV0WyR7aX1dIHRvICR7b3V0cHV0UHJlZmVycmVkTG9jYXRpb25zW2ldfSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBUUkFDRV9FVkVOVF9FTkQoJ3dhc20gYmluZElucHV0c091dHB1dHMnKTtcbiAgICAgIGFjdGl2ZVNlc3Npb25zLnNldChzZXNzaW9uSWQsIFtcbiAgICAgICAgc2Vzc2lvbkhhbmRsZSxcbiAgICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLFxuICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLFxuICAgICAgICBpb0JpbmRpbmdTdGF0ZSxcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxuICAgICAgICB0cnVlLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgd2FzbS5qc2VwT25SdW5TdGFydD8uKHNlc3Npb25IYW5kbGUpO1xuICAgIHdhc20ud2Vibm5PblJ1blN0YXJ0Py4oc2Vzc2lvbkhhbmRsZSk7XG5cbiAgICBsZXQgZXJyb3JDb2RlOiBudW1iZXI7XG4gICAgaWYgKCghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgfHwgIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpICYmIGlvQmluZGluZ1N0YXRlKSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW5XaXRoQmluZGluZyhcbiAgICAgICAgc2Vzc2lvbkhhbmRsZSxcbiAgICAgICAgaW9CaW5kaW5nU3RhdGUuaGFuZGxlLFxuICAgICAgICBvdXRwdXRDb3VudCxcbiAgICAgICAgb3V0cHV0VmFsdWVzT2Zmc2V0LFxuICAgICAgICBydW5PcHRpb25zSGFuZGxlLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0UnVuKFxuICAgICAgICBzZXNzaW9uSGFuZGxlLFxuICAgICAgICBpbnB1dE5hbWVzT2Zmc2V0LFxuICAgICAgICBpbnB1dFZhbHVlc09mZnNldCxcbiAgICAgICAgaW5wdXRDb3VudCxcbiAgICAgICAgb3V0cHV0TmFtZXNPZmZzZXQsXG4gICAgICAgIG91dHB1dENvdW50LFxuICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsXG4gICAgICAgIHJ1bk9wdGlvbnNIYW5kbGUsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdmYWlsZWQgdG8gY2FsbCBPcnRSdW4oKS4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXQ6IFRlbnNvck1ldGFkYXRhW10gPSBbXTtcbiAgICBjb25zdCBvdXRwdXRQcm9taXNlczogQXJyYXk8UHJvbWlzZTxbbnVtYmVyLCBUZW5zb3IuRGF0YVR5cGVdPj4gPSBbXTtcblxuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCd3YXNtIFByb2Nlc3NPdXRwdXRUZW5zb3InKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IHRlbnNvciA9IE51bWJlcih3YXNtLmdldFZhbHVlKG91dHB1dFZhbHVlc09mZnNldCArIGkgKiBwdHJTaXplLCAnKicpKTtcbiAgICAgIGlmICh0ZW5zb3IgPT09IG91dHB1dFRlbnNvckhhbmRsZXNbaV0pIHtcbiAgICAgICAgLy8gb3V0cHV0IHRlbnNvciBpcyBwcmUtYWxsb2NhdGVkLiBubyBuZWVkIHRvIGNvcHkgZGF0YS5cbiAgICAgICAgb3V0cHV0LnB1c2gob3V0cHV0VGVuc29yc1tpXSEpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgICAgIC8vIHN0YWNrIGFsbG9jYXRlIDQgcG9pbnRlciB2YWx1ZVxuICAgICAgY29uc3QgdGVuc29yRGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogcHRyU2l6ZSk7XG5cbiAgICAgIGxldCBrZWVwT3V0cHV0VGVuc29yID0gZmFsc2U7XG4gICAgICBsZXQgdHlwZTogVGVuc29yLlR5cGUgfCB1bmRlZmluZWQsXG4gICAgICAgIGRhdGFPZmZzZXQgPSAwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0VGVuc29yRGF0YShcbiAgICAgICAgICB0ZW5zb3IsXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCxcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgcHRyU2l6ZSxcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgMiAqIHB0clNpemUsXG5cbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgMyAqIHB0clNpemUsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYWNjZXNzIG91dHB1dCB0ZW5zb3IgZGF0YSBvbiBpbmRleCAke2l9LmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IHB0clNpemUgPT09IDQgPyAnaTMyJyA6ICdpNjQnO1xuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IE51bWJlcih3YXNtLmdldFZhbHVlKHRlbnNvckRhdGFPZmZzZXQsIHZhbHVlVHlwZSkpO1xuICAgICAgICBkYXRhT2Zmc2V0ID0gd2FzbS5nZXRWYWx1ZSh0ZW5zb3JEYXRhT2Zmc2V0ICsgcHRyU2l6ZSwgJyonKTtcbiAgICAgICAgY29uc3QgZGltc09mZnNldCA9IHdhc20uZ2V0VmFsdWUodGVuc29yRGF0YU9mZnNldCArIHB0clNpemUgKiAyLCAnKicpO1xuICAgICAgICBjb25zdCBkaW1zTGVuZ3RoID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUodGVuc29yRGF0YU9mZnNldCArIHB0clNpemUgKiAzLCB2YWx1ZVR5cGUpKTtcbiAgICAgICAgY29uc3QgZGltcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRpbXMucHVzaChOdW1iZXIod2FzbS5nZXRWYWx1ZShkaW1zT2Zmc2V0ICsgaSAqIHB0clNpemUsIHZhbHVlVHlwZSkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2FzbS5fT3J0RnJlZShkaW1zT2Zmc2V0KSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZnJlZSBtZW1vcnkgZm9yIHRlbnNvciBkaW1zLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzaXplID0gZGltcy5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKTtcbiAgICAgICAgdHlwZSA9IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nKGRhdGFUeXBlKTtcblxuICAgICAgICBjb25zdCBwcmVmZXJyZWRMb2NhdGlvbiA9IGlvQmluZGluZ1N0YXRlPy5vdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbb3V0cHV0SW5kaWNlc1tpXV07XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgfHwgcHJlZmVycmVkTG9jYXRpb24gPT09ICdtbC10ZW5zb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN0cmluZ0RhdGE6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCArIGkgKiBwdHJTaXplLCAnKicpO1xuICAgICAgICAgICAgY29uc3QgbmV4dE9mZnNldCA9IHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCArIChpICsgMSkgKiBwdHJTaXplLCAnKicpO1xuICAgICAgICAgICAgY29uc3QgbWF4Qnl0ZXNUb1JlYWQgPSBpID09PSBzaXplIC0gMSA/IHVuZGVmaW5lZCA6IG5leHRPZmZzZXQgLSBvZmZzZXQ7XG4gICAgICAgICAgICBzdHJpbmdEYXRhLnB1c2god2FzbS5VVEY4VG9TdHJpbmcob2Zmc2V0LCBtYXhCeXRlc1RvUmVhZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgc3RyaW5nRGF0YSwgJ2NwdSddKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBhIGNlcnRhaW4gb3V0cHV0J3MgcHJlZmVycmVkIGxvY2F0aW9uIGlzIEdQVSBidXQgdGhlIHRlbnNvciBpcyBlbXB0eSwgd2Ugc3RpbGwgbmVlZCB0byBjcmVhdGUgYSBDUFVcbiAgICAgICAgICAvLyB0ZW5zb3IgZm9yIGl0LiBUaGVyZSBpcyBubyBtYXBwaW5nIEdQVSBidWZmZXIgZm9yIGFuIGVtcHR5IHRlbnNvci5cbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyAmJiBzaXplID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZ2V0QnVmZmVyID0gIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgPyB3YXNtLndlYmdwdUdldEJ1ZmZlciA6IHdhc20uanNlcEdldEJ1ZmZlcjtcbiAgICAgICAgICAgIGlmICghZ2V0QnVmZmVyKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJlZmVycmVkTG9jYXRpb24gXCJncHUtYnVmZmVyXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYkdQVS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IGdldEJ1ZmZlcihkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclNpemUgPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyhkYXRhVHlwZSwgc2l6ZSk7XG4gICAgICAgICAgICBpZiAoYnVmZmVyU2l6ZSA9PT0gdW5kZWZpbmVkIHx8ICFpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUodHlwZSkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZG8gbm90IHJlbGVhc2UgdGhlIHRlbnNvciByaWdodCBub3cuIGl0IHdpbGwgYmUgcmVsZWFzZWQgd2hlbiB1c2VyIGNhbGxzIHRlbnNvci5kaXNwb3NlKCkuXG4gICAgICAgICAgICBrZWVwT3V0cHV0VGVuc29yID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gICAgICAgICAgICAgIHdhc20ud2ViZ3B1UmVnaXN0ZXJCdWZmZXIhKGdwdUJ1ZmZlciwgc2Vzc2lvbklkLCBkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgICAgY29uc3QgZG93bmxvYWREYXRhRnVuY3Rpb24gPSB3YXNtLndlYmdwdUNyZWF0ZURvd25sb2FkZXIhKGdwdUJ1ZmZlciwgYnVmZmVyU2l6ZSwgc2Vzc2lvbklkKTtcbiAgICAgICAgICAgICAgb3V0cHV0LnB1c2goW1xuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgZGltcyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBncHVCdWZmZXIsXG4gICAgICAgICAgICAgICAgICBkb3dubG9hZDogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IGRvd25sb2FkRGF0YUZ1bmN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgKHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlISkpKGFycmF5QnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEgYXMgVGVuc29yLkRhdGFUeXBlTWFwW1RlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXNdO1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSB0ZW5zb3IuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2dwdS1idWZmZXInLFxuICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIGRpbXMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZ3B1QnVmZmVyLFxuICAgICAgICAgICAgICAgICAgZG93bmxvYWQ6IHdhc20uanNlcENyZWF0ZURvd25sb2FkZXIhKGdwdUJ1ZmZlciwgYnVmZmVyU2l6ZSwgdHlwZSksXG4gICAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcikgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2UgdGVuc29yLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdncHUtYnVmZmVyJyxcbiAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicgJiYgc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGVuc3VyZVRlbnNvciA9IHdhc20ud2Vibm5FbnN1cmVUZW5zb3I7XG4gICAgICAgICAgICBjb25zdCBpc0dyYXBoSW5wdXRPdXRwdXRUeXBlU3VwcG9ydGVkID0gd2FzbS53ZWJubklzR3JhcGhJbnB1dE91dHB1dFR5cGVTdXBwb3J0ZWQ7XG4gICAgICAgICAgICBpZiAoIWVuc3VyZVRlbnNvciB8fCAhaXNHcmFwaElucHV0T3V0cHV0VHlwZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZWZlcnJlZExvY2F0aW9uIFwibWwtdGVuc29yXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYk5OLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGVuc29yU2l6ZSA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKGRhdGFUeXBlLCBzaXplKTtcbiAgICAgICAgICAgIGlmICh0ZW5zb3JTaXplID09PSB1bmRlZmluZWQgfHwgIWlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlKHR5cGUpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzR3JhcGhJbnB1dE91dHB1dFR5cGVTdXBwb3J0ZWQoc2Vzc2lvbklkLCB0eXBlLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBwcmVmZXJyZWRMb2NhdGlvbiBcIm1sLXRlbnNvclwiIGZvciAke3R5cGV9IG91dHB1dCBpcyBub3Qgc3VwcG9ydGVkIGJ5IGN1cnJlbnQgV2ViTk4gQ29udGV4dC5gLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZ3JhcGggaGFzIGJlZW4gcGFydGl0aW9uZWQsIHRoZSBvdXRwdXQgdGVuc29yIG1heSBoYXZlIG5vdCBiZWVuIGNyZWF0ZWQuIEZvciB0aGlzIHJlYXNvbiwgd2UgdXNlXG4gICAgICAgICAgICAvLyBlbnN1cmVUZW5zb3IgdG8gZ2V0L2NyZWF0ZSB0aGUgTUxUZW5zb3IuIEluIHdoaWNoIGNhc2UsIHdlIGRvbid0IG5lZWQgdG8gY29weSB0aGUgZGF0YSBpZiBhIG5ldyB0ZW5zb3JcbiAgICAgICAgICAgIC8vIGhhcyBiZWVuIGNyZWF0ZWQuXG4gICAgICAgICAgICBjb25zdCBtbFRlbnNvciA9IGF3YWl0IGVuc3VyZVRlbnNvcihzZXNzaW9uSWQsIGRhdGFPZmZzZXQsIGRhdGFUeXBlLCBkaW1zLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIC8vIGRvIG5vdCByZWxlYXNlIHRoZSB0ZW5zb3IgcmlnaHQgbm93LiBpdCB3aWxsIGJlIHJlbGVhc2VkIHdoZW4gdXNlciBjYWxscyB0ZW5zb3IuZGlzcG9zZSgpLlxuICAgICAgICAgICAga2VlcE91dHB1dFRlbnNvciA9IHRydWU7XG5cbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcbiAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgZGltcyxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1sVGVuc29yLFxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiB3YXNtLndlYm5uQ3JlYXRlTUxUZW5zb3JEb3dubG9hZGVyIShkYXRhT2Zmc2V0LCB0eXBlKSxcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3YXNtLndlYm5uUmVsZWFzZVRlbnNvcklkIShkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnbWwtdGVuc29yJyxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdtbC10ZW5zb3ItY3B1LW91dHB1dCcgJiYgc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB3YXNtLndlYm5uQ3JlYXRlTUxUZW5zb3JEb3dubG9hZGVyIShkYXRhT2Zmc2V0LCB0eXBlIGFzIFRlbnNvci5NTFRlbnNvckRhdGFUeXBlcykoKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gb3V0cHV0Lmxlbmd0aDtcbiAgICAgICAgICAgIC8vIERlbGF5IHRoZSBkYXRhIGRvd25sb2FkIGFuZCByZWxlYXNpbmcgdGhlIHRlbnNvciB1bnRpbCB3ZSBjYW4gd2FpdCBmb3IgYWxsIG91dHB1dCB0ZW5zb3JzIHRvIGJlIGRvd25sb2FkZWQuXG4gICAgICAgICAgICBrZWVwT3V0cHV0VGVuc29yID0gdHJ1ZTtcbiAgICAgICAgICAgIG91dHB1dFByb21pc2VzLnB1c2goXG4gICAgICAgICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBbbnVtYmVyLCBUZW5zb3IuRGF0YVR5cGVdID0gW2luZGV4LCBhd2FpdCBkYXRhXTtcbiAgICAgICAgICAgICAgICB3YXNtLndlYm5uUmVsZWFzZVRlbnNvcklkIShkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgfSkoKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgW10sICdjcHUnXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgdHlwZWRBcnJheUNvbnN0cnVjdG9yKHNpemUpO1xuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKS5zZXQoXG4gICAgICAgICAgICAgIHdhc20uSEVBUFU4LnN1YmFycmF5KGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBkYXRhLmJ5dGVMZW5ndGgpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBkYXRhLCAnY3B1J10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIGRhdGFPZmZzZXQpIHtcbiAgICAgICAgICB3YXNtLl9mcmVlKGRhdGFPZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgha2VlcE91dHB1dFRlbnNvcikge1xuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpb0JpbmRpbmdTdGF0ZSAmJiAhZW5hYmxlR3JhcGhDYXB0dXJlKSB7XG4gICAgICBpZiAod2FzbS5fT3J0Q2xlYXJCb3VuZE91dHB1dHMoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKSAhPT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNsZWFyIGJvdW5kIG91dHB1dHMuXCIpO1xuICAgICAgfVxuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25JZCwgW1xuICAgICAgICBzZXNzaW9uSGFuZGxlLFxuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICAgIGZhbHNlLFxuICAgICAgXSk7XG4gICAgfVxuICAgIC8vIFdhaXQgZm9yIGFsbCBvdXRwdXQgdGVuc29yIGRhdGEgdG8gYmUgZG93bmxvYWRlZC5cbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgZGF0YV0gb2YgYXdhaXQgUHJvbWlzZS5hbGwob3V0cHV0UHJvbWlzZXMpKSB7XG4gICAgICBvdXRwdXRbaW5kZXhdWzJdID0gZGF0YTtcbiAgICB9XG4gICAgVFJBQ0VfRVZFTlRfRU5EKCd3YXNtIFByb2Nlc3NPdXRwdXRUZW5zb3InKTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20ud2Vibm5PblJ1bkVuZD8uKHNlc3Npb25IYW5kbGUpO1xuXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xuXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gICAgICBpbnB1dFRlbnNvcnMuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICBpZiAodCAmJiB0WzNdID09PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICB3YXNtLndlYmdwdVVucmVnaXN0ZXJCdWZmZXIhKHRbMl0uZ3B1QnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvdXRwdXRUZW5zb3JzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgaWYgKHQgJiYgdFszXSA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgd2FzbS53ZWJncHVVbnJlZ2lzdGVyQnVmZmVyISh0WzJdLmdwdUJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpbnB1dFRlbnNvckhhbmRsZXMuZm9yRWFjaCgodikgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XG4gICAgb3V0cHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKCh2KSA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcbiAgICBpbnB1dE91dHB1dEFsbG9jcy5mb3JFYWNoKChwKSA9PiB3YXNtLl9mcmVlKHApKTtcblxuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgcnVuT3B0aW9uc0FsbG9jcy5mb3JFYWNoKChwKSA9PiB3YXNtLl9mcmVlKHApKTtcbiAgfVxufTtcblxuLyoqXG4gKiBlbmQgcHJvZmlsaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBlbmRQcm9maWxpbmcgPSAoc2Vzc2lvbklkOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHNlc3Npb24gaWQnKTtcbiAgfVxuICBjb25zdCBzZXNzaW9uSGFuZGxlID0gc2Vzc2lvblswXTtcblxuICAvLyBwcm9maWxlIGZpbGUgbmFtZSBpcyBub3QgdXNlZCB5ZXQsIGJ1dCBpdCBtdXN0IGJlIGZyZWVkLlxuICBjb25zdCBwcm9maWxlRmlsZU5hbWUgPSB3YXNtLl9PcnRFbmRQcm9maWxpbmcoc2Vzc2lvbkhhbmRsZSk7XG4gIGlmIChwcm9maWxlRmlsZU5hbWUgPT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBwcm9maWxlIGZpbGUgbmFtZS5cIik7XG4gIH1cbiAgd2FzbS5fT3J0RnJlZShwcm9maWxlRmlsZU5hbWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzID0gKHRlbnNvcnM6IHJlYWRvbmx5IFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10pOiBBcnJheUJ1ZmZlckxpa2VbXSA9PiB7XG4gIGNvbnN0IGJ1ZmZlcnM6IEFycmF5QnVmZmVyTGlrZVtdID0gW107XG4gIGZvciAoY29uc3QgdGVuc29yIG9mIHRlbnNvcnMpIHtcbiAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSAmJiAnYnVmZmVyJyBpbiBkYXRhKSB7XG4gICAgICBidWZmZXJzLnB1c2goZGF0YS5idWZmZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnVmZmVycztcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGVudiwgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7XG4gIE9ydFdhc21NZXNzYWdlLFxuICBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcbiAgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLFxuICBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSxcbiAgVGVuc29yTWV0YWRhdGEsXG59IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0ICogYXMgY29yZSBmcm9tICcuL3dhc20tY29yZS1pbXBsJztcbmltcG9ydCB7IGluaXRpYWxpemVXZWJBc3NlbWJseSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7XG4gIGltcG9ydFByb3h5V29ya2VyLFxuICBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYyxcbiAgaXNFc21JbXBvcnRNZXRhVXJsSGFyZGNvZGVkQXNGaWxlVXJpLFxufSBmcm9tICcuL3dhc20tdXRpbHMtaW1wb3J0JztcblxuY29uc3QgaXNQcm94eSA9ICgpOiBib29sZWFuID0+ICEhZW52Lndhc20ucHJveHkgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbmxldCBwcm94eVdvcmtlcjogV29ya2VyIHwgdW5kZWZpbmVkO1xubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgYWJvcnRlZCA9IGZhbHNlO1xubGV0IHRlbXBvcmFyeU9iamVjdFVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG50eXBlIFByb21pc2VDYWxsYmFja3M8VCA9IHZvaWQ+ID0gW3Jlc29sdmU6IChyZXN1bHQ6IFQpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbjogdW5rbm93bikgPT4gdm9pZF07XG5sZXQgaW5pdFdhc21DYWxsYmFja3M6IFByb21pc2VDYWxsYmFja3M7XG5jb25zdCBxdWV1ZWRDYWxsYmFja3M6IE1hcDxPcnRXYXNtTWVzc2FnZVsndHlwZSddLCBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPHVua25vd24+Pj4gPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGVucXVldWVDYWxsYmFja3MgPSAodHlwZTogT3J0V2FzbU1lc3NhZ2VbJ3R5cGUnXSwgY2FsbGJhY2tzOiBQcm9taXNlQ2FsbGJhY2tzPHVua25vd24+KTogdm9pZCA9PiB7XG4gIGNvbnN0IHF1ZXVlID0gcXVldWVkQ2FsbGJhY2tzLmdldCh0eXBlKTtcbiAgaWYgKHF1ZXVlKSB7XG4gICAgcXVldWUucHVzaChjYWxsYmFja3MpO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlZENhbGxiYWNrcy5zZXQodHlwZSwgW2NhbGxiYWNrc10pO1xuICB9XG59O1xuXG5jb25zdCBlbnN1cmVXb3JrZXIgPSAoKTogdm9pZCA9PiB7XG4gIGlmIChpbml0aWFsaXppbmcgfHwgIWluaXRpYWxpemVkIHx8IGFib3J0ZWQgfHwgIXByb3h5V29ya2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b3JrZXIgbm90IHJlYWR5Jyk7XG4gIH1cbn07XG5cbmNvbnN0IG9uUHJveHlXb3JrZXJNZXNzYWdlID0gKGV2OiBNZXNzYWdlRXZlbnQ8T3J0V2FzbU1lc3NhZ2U+KTogdm9pZCA9PiB7XG4gIHN3aXRjaCAoZXYuZGF0YS50eXBlKSB7XG4gICAgY2FzZSAnaW5pdC13YXNtJzpcbiAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICBpbml0V2FzbUNhbGxiYWNrc1sxXShldi5kYXRhLmVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzWzBdKCk7XG4gICAgICB9XG4gICAgICBpZiAodGVtcG9yYXJ5T2JqZWN0VXJsKSB7XG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGVtcG9yYXJ5T2JqZWN0VXJsKTtcbiAgICAgICAgdGVtcG9yYXJ5T2JqZWN0VXJsID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5pdC1lcCc6XG4gICAgY2FzZSAnY29weS1mcm9tJzpcbiAgICBjYXNlICdjcmVhdGUnOlxuICAgIGNhc2UgJ3JlbGVhc2UnOlxuICAgIGNhc2UgJ3J1bic6XG4gICAgY2FzZSAnZW5kLXByb2ZpbGluZyc6IHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHF1ZXVlZENhbGxiYWNrcy5nZXQoZXYuZGF0YS50eXBlKSE7XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgY2FsbGJhY2tzLnNoaWZ0KCkhWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrcy5zaGlmdCgpIVswXShldi5kYXRhLm91dCEpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplV2ViQXNzZW1ibHlBbmRPcnRSdW50aW1lID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGluaXRpYWxpemluZykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm11bHRpcGxlIGNhbGxzIHRvICdpbml0V2FzbSgpJyBkZXRlY3RlZC5cIik7XG4gIH1cbiAgaWYgKGFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcmV2aW91cyBjYWxsIHRvICdpbml0V2FzbSgpJyBmYWlsZWQuXCIpO1xuICB9XG5cbiAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBwcm94eVdvcmtlcj8udGVybWluYXRlKCk7XG5cbiAgICAgIHZvaWQgaW1wb3J0UHJveHlXb3JrZXIoKS50aGVuKChbb2JqZWN0VXJsLCB3b3JrZXJdKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcHJveHlXb3JrZXIgPSB3b3JrZXI7XG4gICAgICAgICAgcHJveHlXb3JrZXIub25lcnJvciA9IChldjogRXJyb3JFdmVudCkgPT4gcmVqZWN0KGV2KTtcbiAgICAgICAgICBwcm94eVdvcmtlci5vbm1lc3NhZ2UgPSBvblByb3h5V29ya2VyTWVzc2FnZTtcbiAgICAgICAgICBpbml0V2FzbUNhbGxiYWNrcyA9IFtyZXNvbHZlLCByZWplY3RdO1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAnaW5pdC13YXNtJywgaW46IGVudiB9O1xuXG4gICAgICAgICAgLy8gaWYgdGhlIHByb3h5IHdvcmtlciBpcyBsb2FkZWQgZnJvbSBhIGJsb2IgVVJMLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGUgcGF0aCBpbmZvcm1hdGlvbiBpcyBub3QgbG9zdC5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIHdoZW4gYGVudi53YXNtLndhc21QYXRoc2AgaXMgbm90IHNldCwgd2UgbmVlZCB0byBwYXNzIHRoZSBwYXRoIGluZm9ybWF0aW9uIHRvIHRoZSB3b3JrZXIuXG4gICAgICAgICAgLy9cbiAgICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRU5BQkxFX0JVTkRMRV9XQVNNX0pTICYmICFtZXNzYWdlLmluIS53YXNtLndhc21QYXRocyAmJiBvYmplY3RVcmwpIHtcbiAgICAgICAgICAgIC8vIGZvciBhIGJ1aWxkIG5vdCBidW5kbGVkIHRoZSB3YXNtIEpTLCB3ZSBuZWVkIHRvIHBhc3MgdGhlIHBhdGggcHJlZml4IHRvIHRoZSB3b3JrZXIuXG4gICAgICAgICAgICAvLyB0aGUgcGF0aCBwcmVmaXggd2lsbCBiZSB1c2VkIHRvIHJlc29sdmUgdGhlIHBhdGggdG8gYm90aCB0aGUgd2FzbSBKUyBhbmQgdGhlIHdhc20gZmlsZS5cbiAgICAgICAgICAgIGNvbnN0IGluZmVycmVkV2FzbVBhdGhQcmVmaXggPSBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYygpO1xuICAgICAgICAgICAgaWYgKGluZmVycmVkV2FzbVBhdGhQcmVmaXgpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZS5pbiEud2FzbS53YXNtUGF0aHMgPSBpbmZlcnJlZFdhc21QYXRoUHJlZml4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIEJVSUxEX0RFRlMuSVNfRVNNICYmXG4gICAgICAgICAgICBCVUlMRF9ERUZTLkVOQUJMRV9CVU5ETEVfV0FTTV9KUyAmJlxuICAgICAgICAgICAgIW1lc3NhZ2UuaW4hLndhc20ud2FzbVBhdGhzICYmXG4gICAgICAgICAgICAob2JqZWN0VXJsIHx8IGlzRXNtSW1wb3J0TWV0YVVybEhhcmRjb2RlZEFzRmlsZVVyaSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIGZvciBhIGJ1aWxkIGJ1bmRsZWQgdGhlIHdhc20gSlMsIGlmIGVpdGhlciBvZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgaXMgbWV0OlxuICAgICAgICAgICAgLy8gLSB0aGUgcHJveHkgd29ya2VyIGlzIGxvYWRlZCBmcm9tIGEgYmxvYiBVUkxcbiAgICAgICAgICAgIC8vIC0gYGltcG9ydC5tZXRhLnVybGAgaXMgYSBmaWxlIFVSTCwgaXQgbWVhbnMgaXQgaXMgb3ZlcndyaXR0ZW4gYnkgdGhlIGJ1bmRsZXIuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gaW4gZWl0aGVyIGNhc2UsIHRoZSBwYXRoIGluZm9ybWF0aW9uIGlzIGxvc3QsIHdlIG5lZWQgdG8gcGFzcyB0aGUgcGF0aCBvZiB0aGUgLndhc20gZmlsZSB0byB0aGUgd29ya2VyLlxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB1c2UgdGhlIGJ1bmRsZXIgcHJlZmVycmVkIFVSTCBmb3JtYXQ6XG4gICAgICAgICAgICAvLyBuZXcgVVJMKCdmaWxlbmFtZScsIGltcG9ydC5tZXRhLnVybClcbiAgICAgICAgICAgIC8vIHNvIHRoYXQgdGhlIGJ1bmRsZXIgY2FuIGhhbmRsZSB0aGUgZmlsZSB1c2luZyBjb3JyZXNwb25kaW5nIGxvYWRlcnMuXG4gICAgICAgICAgICBtZXNzYWdlLmluIS53YXNtLndhc21QYXRocyA9IHtcbiAgICAgICAgICAgICAgd2FzbTogIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQXG4gICAgICAgICAgICAgICAgPyBuZXcgVVJMKCdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbScsIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCkuaHJlZlxuICAgICAgICAgICAgICAgIDogIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFVcbiAgICAgICAgICAgICAgICAgID8gbmV3IFVSTCgnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5hc3luY2lmeS53YXNtJywgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMKS5ocmVmXG4gICAgICAgICAgICAgICAgICA6IG5ldyBVUkwoJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbScsIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCkuaHJlZixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHByb3h5V29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgIHRlbXBvcmFyeU9iamVjdFVybCA9IG9iamVjdFVybDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KGVudi53YXNtKTtcbiAgICAgIGF3YWl0IGNvcmUuaW5pdFJ1bnRpbWUoZW52KTtcbiAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgIHRocm93IGU7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVPcnRFcCA9IGFzeW5jIChlcE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdpbml0LWVwJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdpbml0LWVwJywgaW46IHsgZXBOYW1lLCBlbnYgfSB9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IGNvcmUuaW5pdEVwKGVudiwgZXBOYW1lKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIgPSBhc3luYyAoYnVmZmVyOiBVaW50OEFycmF5KTogUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnY29weS1mcm9tJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdjb3B5LWZyb20nLCBpbjogeyBidWZmZXIgfSB9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFtidWZmZXIuYnVmZmVyXSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvcmUuY29weUZyb21FeHRlcm5hbEJ1ZmZlcihidWZmZXIpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9IGFzeW5jIChcbiAgbW9kZWw6IFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyIHwgVWludDhBcnJheSxcbiAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4pOiBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIC8vIGNoZWNrIHVuc3VwcG9ydGVkIG9wdGlvbnNcbiAgICBpZiAob3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2Vzc2lvbiBvcHRpb24gXCJwcmVmZXJyZWRPdXRwdXRMb2NhdGlvblwiIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdjcmVhdGUnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2NyZWF0ZScsIGluOiB7IG1vZGVsLCBvcHRpb25zOiB7IC4uLm9wdGlvbnMgfSB9IH07XG4gICAgICBjb25zdCB0cmFuc2ZlcmFibGU6IFRyYW5zZmVyYWJsZVtdID0gW107XG4gICAgICBpZiAobW9kZWwgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIHRyYW5zZmVyYWJsZS5wdXNoKG1vZGVsLmJ1ZmZlcik7XG4gICAgICB9XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgdHJhbnNmZXJhYmxlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29yZS5jcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gYXN5bmMgKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ3JlbGVhc2UnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ3JlbGVhc2UnLCBpbjogc2Vzc2lvbklkIH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29yZS5yZWxlYXNlU2Vzc2lvbihzZXNzaW9uSWQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcnVuID0gYXN5bmMgKFxuICBzZXNzaW9uSWQ6IG51bWJlcixcbiAgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgaW5wdXRzOiBUZW5zb3JNZXRhZGF0YVtdLFxuICBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgb3V0cHV0czogQXJyYXk8VGVuc29yTWV0YWRhdGEgfCBudWxsPixcbiAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxuKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgLy8gY2hlY2sgaW5wdXRzIGxvY2F0aW9uXG4gICAgaWYgKGlucHV0cy5zb21lKCh0KSA9PiB0WzNdICE9PSAnY3B1JykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW5wdXQgdGVuc29yIG9uIEdQVSBpcyBub3Qgc3VwcG9ydGVkIGZvciBwcm94eS4nKTtcbiAgICB9XG4gICAgLy8gY2hlY2sgb3V0cHV0cyBsb2NhdGlvblxuICAgIGlmIChvdXRwdXRzLnNvbWUoKHQpID0+IHQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZS1hbGxvY2F0ZWQgb3V0cHV0IHRlbnNvciBpcyBub3Qgc3VwcG9ydGVkIGZvciBwcm94eS4nKTtcbiAgICB9XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ3J1bicsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IHNlcmlhbGl6YWJsZUlucHV0cyA9IGlucHV0cyBhcyBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdOyAvLyBldmVyeSBpbnB1dCBpcyBvbiBDUFUuXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHtcbiAgICAgICAgdHlwZTogJ3J1bicsXG4gICAgICAgIGluOiB7IHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHM6IHNlcmlhbGl6YWJsZUlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9ucyB9LFxuICAgICAgfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBjb3JlLmV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzKHNlcmlhbGl6YWJsZUlucHV0cykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLnJ1bihzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IGFzeW5jIChzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdlbmQtcHJvZmlsaW5nJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdlbmQtcHJvZmlsaW5nJywgaW46IHNlc3Npb25JZCB9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvcmUuZW5kUHJvZmlsaW5nKHNlc3Npb25JZCk7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7XG4gIEluZmVyZW5jZVNlc3Npb24sXG4gIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyLFxuICBTZXNzaW9uSGFuZGxlcixcbiAgVGVuc29yLFxuICBUUkFDRV9GVU5DX0JFR0lOLFxuICBUUkFDRV9GVU5DX0VORCxcbn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHsgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsIFRlbnNvck1ldGFkYXRhIH0gZnJvbSAnLi9wcm94eS1tZXNzYWdlcyc7XG5pbXBvcnQgeyBjb3B5RnJvbUV4dGVybmFsQnVmZmVyLCBjcmVhdGVTZXNzaW9uLCBlbmRQcm9maWxpbmcsIHJlbGVhc2VTZXNzaW9uLCBydW4gfSBmcm9tICcuL3Byb3h5LXdyYXBwZXInO1xuaW1wb3J0IHsgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlLCBpc01MVGVuc29yU3VwcG9ydGVkVHlwZSB9IGZyb20gJy4vd2FzbS1jb21tb24nO1xuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWVudic7XG5pbXBvcnQgeyBsb2FkRmlsZSB9IGZyb20gJy4vd2FzbS11dGlscy1sb2FkLWZpbGUnO1xuXG5leHBvcnQgY29uc3QgZW5jb2RlVGVuc29yTWV0YWRhdGEgPSAodGVuc29yOiBUZW5zb3IsIGdldE5hbWU6ICgpID0+IHN0cmluZyk6IFRlbnNvck1ldGFkYXRhID0+IHtcbiAgc3dpdGNoICh0ZW5zb3IubG9jYXRpb24pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHRlbnNvci5kYXRhLCAnY3B1J107XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XG4gICAgICByZXR1cm4gW3RlbnNvci50eXBlLCB0ZW5zb3IuZGltcywgeyBncHVCdWZmZXI6IHRlbnNvci5ncHVCdWZmZXIgfSwgJ2dwdS1idWZmZXInXTtcbiAgICBjYXNlICdtbC10ZW5zb3InOlxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHsgbWxUZW5zb3I6IHRlbnNvci5tbFRlbnNvciB9LCAnbWwtdGVuc29yJ107XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvci5sb2NhdGlvbn0gZm9yICR7Z2V0TmFtZSgpfWApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZGVjb2RlVGVuc29yTWV0YWRhdGEgPSAodGVuc29yOiBUZW5zb3JNZXRhZGF0YSk6IFRlbnNvciA9PiB7XG4gIHN3aXRjaCAodGVuc29yWzNdKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHRlbnNvclswXSwgdGVuc29yWzJdLCB0ZW5zb3JbMV0pO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XG4gICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcbiAgICAgIGlmICghaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlKGRhdGFUeXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZGF0YSB0eXBlOiAke2RhdGFUeXBlfSBmb3IgZGVzZXJpYWxpemluZyBHUFUgdGVuc29yYCk7XG4gICAgICB9XG4gICAgICBjb25zdCB7IGdwdUJ1ZmZlciwgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IHRlbnNvclsyXTtcbiAgICAgIHJldHVybiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcihncHVCdWZmZXIsIHsgZGF0YVR5cGUsIGRpbXM6IHRlbnNvclsxXSwgZG93bmxvYWQsIGRpc3Bvc2UgfSk7XG4gICAgfVxuICAgIGNhc2UgJ21sLXRlbnNvcic6IHtcbiAgICAgIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xuICAgICAgaWYgKCFpc01MVGVuc29yU3VwcG9ydGVkVHlwZShkYXRhVHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGRhdGEgdHlwZTogJHtkYXRhVHlwZX0gZm9yIGRlc2VyaWFsaXppbmcgTUxUZW5zb3IgdGVuc29yYCk7XG4gICAgICB9XG4gICAgICBjb25zdCB7IG1sVGVuc29yLCBkb3dubG9hZCwgZGlzcG9zZSB9ID0gdGVuc29yWzJdO1xuICAgICAgcmV0dXJuIFRlbnNvci5mcm9tTUxUZW5zb3IobWxUZW5zb3IsIHsgZGF0YVR5cGUsIGRpbXM6IHRlbnNvclsxXSwgZG93bmxvYWQsIGRpc3Bvc2UgfSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBsb2NhdGlvbjogJHt0ZW5zb3JbM119YCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIgaW1wbGVtZW50cyBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciB7XG4gIHByaXZhdGUgc2Vzc2lvbklkOiBudW1iZXI7XG5cbiAgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG4gIG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcbiAgaW5wdXRNZXRhZGF0YTogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhW107XG4gIG91dHB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcblxuICBhc3luYyBmZXRjaE1vZGVsQW5kQ29weVRvV2FzbU1lbW9yeShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyPiB7XG4gICAgLy8gZmV0Y2ggbW9kZWwgZnJvbSB1cmwgYW5kIG1vdmUgdG8gd2FzbSBoZWFwLlxuICAgIHJldHVybiBjb3B5RnJvbUV4dGVybmFsQnVmZmVyKGF3YWl0IGxvYWRGaWxlKHBhdGgpKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRNb2RlbChwYXRoT3JCdWZmZXI6IHN0cmluZyB8IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIGxldCBtb2RlbDogUGFyYW1ldGVyczx0eXBlb2YgY3JlYXRlU2Vzc2lvbj5bMF07XG5cbiAgICBpZiAodHlwZW9mIHBhdGhPckJ1ZmZlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgLy8gbm9kZVxuICAgICAgICBtb2RlbCA9IGF3YWl0IGxvYWRGaWxlKHBhdGhPckJ1ZmZlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBicm93c2VyXG4gICAgICAgIC8vIGZldGNoIG1vZGVsIGFuZCBjb3B5IHRvIHdhc20gaGVhcC5cbiAgICAgICAgbW9kZWwgPSBhd2FpdCB0aGlzLmZldGNoTW9kZWxBbmRDb3B5VG9XYXNtTWVtb3J5KHBhdGhPckJ1ZmZlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZGVsID0gcGF0aE9yQnVmZmVyO1xuICAgIH1cblxuICAgIFt0aGlzLnNlc3Npb25JZCwgdGhpcy5pbnB1dE5hbWVzLCB0aGlzLm91dHB1dE5hbWVzLCB0aGlzLmlucHV0TWV0YWRhdGEsIHRoaXMub3V0cHV0TWV0YWRhdGFdID0gYXdhaXQgY3JlYXRlU2Vzc2lvbihcbiAgICAgIG1vZGVsLFxuICAgICAgb3B0aW9ucyxcbiAgICApO1xuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XG4gIH1cblxuICBhc3luYyBkaXNwb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiByZWxlYXNlU2Vzc2lvbih0aGlzLnNlc3Npb25JZCk7XG4gIH1cblxuICBhc3luYyBydW4oXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT4ge1xuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcbiAgICBjb25zdCBpbnB1dEFycmF5OiBUZW5zb3JbXSA9IFtdO1xuICAgIGNvbnN0IGlucHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBPYmplY3QuZW50cmllcyhmZWVkcykuZm9yRWFjaCgoa3ZwKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmlucHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGlucHV0ICcke25hbWV9J2ApO1xuICAgICAgfVxuICAgICAgaW5wdXRBcnJheS5wdXNoKHRlbnNvcik7XG4gICAgICBpbnB1dEluZGljZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvdXRwdXRBcnJheTogQXJyYXk8VGVuc29yIHwgbnVsbD4gPSBbXTtcbiAgICBjb25zdCBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIE9iamVjdC5lbnRyaWVzKGZldGNoZXMpLmZvckVhY2goKGt2cCkgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IGt2cFswXTtcbiAgICAgIGNvbnN0IHRlbnNvciA9IGt2cFsxXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vdXRwdXROYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgb3V0cHV0ICcke25hbWV9J2ApO1xuICAgICAgfVxuICAgICAgb3V0cHV0QXJyYXkucHVzaCh0ZW5zb3IpO1xuICAgICAgb3V0cHV0SW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGlucHV0cyA9IGlucHV0QXJyYXkubWFwKCh0LCBpKSA9PlxuICAgICAgZW5jb2RlVGVuc29yTWV0YWRhdGEodCwgKCkgPT4gYGlucHV0IFwiJHt0aGlzLmlucHV0TmFtZXNbaW5wdXRJbmRpY2VzW2ldXX1cImApLFxuICAgICk7XG4gICAgY29uc3Qgb3V0cHV0cyA9IG91dHB1dEFycmF5Lm1hcCgodCwgaSkgPT5cbiAgICAgIHQgPyBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgb3V0cHV0IFwiJHt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dfVwiYCkgOiBudWxsLFxuICAgICk7XG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgcnVuKHRoaXMuc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3V0cHV0cywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCByZXN1bHRNYXA6IFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGUgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdE1hcFt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dXSA9IG91dHB1dEFycmF5W2ldID8/IGRlY29kZVRlbnNvck1ldGFkYXRhKHJlc3VsdHNbaV0pO1xuICAgIH1cbiAgICBUUkFDRV9GVU5DX0VORCgpO1xuICAgIHJldHVybiByZXN1bHRNYXA7XG4gIH1cblxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICAvLyBUT0RPOiBpbXBsZW1lbnQgcHJvZmlsaW5nXG4gIH1cblxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgdm9pZCBlbmRQcm9maWxpbmcodGhpcy5zZXNzaW9uSWQpO1xuICB9XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEJhY2tlbmQsIGVudiwgSW5mZXJlbmNlU2Vzc2lvbiwgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgeyBpbml0aWFsaXplT3J0RXAsIGluaXRpYWxpemVXZWJBc3NlbWJseUFuZE9ydFJ1bnRpbWUgfSBmcm9tICcuL3dhc20vcHJveHktd3JhcHBlcic7XG5pbXBvcnQgeyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIgfSBmcm9tICcuL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZSc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyBhbGwgZmxhZ3MgZm9yIFdlYkFzc2VtYmx5LlxuICpcbiAqIFRob3NlIGZsYWdzIGFyZSBhY2Nlc3NpYmxlIGZyb20gYG9ydC5lbnYud2FzbWAuIFVzZXJzIGFyZSBhbGxvdyB0byBzZXQgdGhvc2UgZmxhZ3MgYmVmb3JlIHRoZSBmaXJzdCBpbmZlcmVuY2Ugc2Vzc2lvblxuICogYmVpbmcgY3JlYXRlZCwgdG8gb3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVGbGFncyA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5pbml0VGltZW91dCAhPT0gJ251bWJlcicgfHwgZW52Lndhc20uaW5pdFRpbWVvdXQgPCAwKSB7XG4gICAgZW52Lndhc20uaW5pdFRpbWVvdXQgPSAwO1xuICB9XG5cbiAgY29uc3Qgc2ltZCA9IGVudi53YXNtLnNpbWQ7XG4gIGlmICh0eXBlb2Ygc2ltZCAhPT0gJ2Jvb2xlYW4nICYmIHNpbWQgIT09IHVuZGVmaW5lZCAmJiBzaW1kICE9PSAnZml4ZWQnICYmIHNpbWQgIT09ICdyZWxheGVkJykge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKFxuICAgICAgYFByb3BlcnR5IFwiZW52Lndhc20uc2ltZFwiIGlzIHNldCB0byB1bmtub3duIHZhbHVlIFwiJHtzaW1kfVwiLiBSZXNldCBpdCB0byBcXGBmYWxzZVxcYCBhbmQgaWdub3JlIFNJTUQgZmVhdHVyZSBjaGVja2luZy5gLFxuICAgICk7XG4gICAgZW52Lndhc20uc2ltZCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5wcm94eSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZW52Lndhc20ucHJveHkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW52Lndhc20udHJhY2UgIT09ICdib29sZWFuJykge1xuICAgIGVudi53YXNtLnRyYWNlID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGVudi53YXNtLm51bVRocmVhZHMgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGVudi53YXNtLm51bVRocmVhZHMpIHx8IGVudi53YXNtLm51bVRocmVhZHMgPD0gMCkge1xuICAgIC8vIFRoZSBmb2xsb3dpbmcgbG9naWMgb25seSBhcHBsaWVzIHdoZW4gYG9ydC5lbnYud2FzbS5udW1UaHJlYWRzYCBpcyBub3Qgc2V0IGJ5IHVzZXIuIFdlIHdpbGwgYWx3YXlzIGhvbm9yIHVzZXInc1xuICAgIC8vIHNldHRpbmcgaWYgaXQgaXMgcHJvdmlkZWQuXG5cbiAgICAvLyBCcm93c2VyOiB3aGVuIGNyb3NzT3JpZ2luSXNvbGF0ZWQgaXMgZmFsc2UsIFNoYXJlZEFycmF5QnVmZmVyIGlzIG5vdCBhdmFpbGFibGUgc28gV2ViQXNzZW1ibHkgdGhyZWFkcyB3aWxsIG5vdFxuICAgIC8vIHdvcmsuIEluIHRoaXMgY2FzZSwgd2Ugd2lsbCBzZXQgbnVtVGhyZWFkcyB0byAxLlxuICAgIC8vXG4gICAgLy8gVGhlcmUgaXMgYW4gZXhjZXB0aW9uOiB3aGVuIHRoZSBicm93c2VyIGlzIGNvbmZpZ3VyZWQgdG8gZm9yY2UtZW5hYmxlIFNoYXJlZEFycmF5QnVmZmVyIChlLmcuIENocm9tdWltIHdpdGhcbiAgICAvLyAtLWVuYWJsZS1mZWF0dXJlcz1TaGFyZWRBcnJheUJ1ZmZlciksIGl0IGlzIHBvc3NpYmxlIHRoYXQgYHNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZGAgaXMgZmFsc2UgYW5kXG4gICAgLy8gU2hhcmVkQXJyYXlCdWZmZXIgaXMgYXZhaWxhYmxlIGF0IHRoZSBzYW1lIHRpbWUuIFRoaXMgaXMgdXN1YWxseSBmb3IgdGVzdGluZy4gSW4gdGhpcyBjYXNlLCAgd2Ugd2lsbCBzdGlsbCBzZXRcbiAgICAvLyBudW1UaHJlYWRzIHRvIDEgaGVyZS4gSWYgd2Ugd2FudCB0byBlbmFibGUgbXVsdGktdGhyZWFkaW5nIGluIHRlc3QsIHdlIHNob3VsZCBzZXQgYG9ydC5lbnYud2FzbS5udW1UaHJlYWRzYCB0byBhXG4gICAgLy8gdmFsdWUgZ3JlYXRlciB0aGFuIDEuXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiAhc2VsZi5jcm9zc09yaWdpbklzb2xhdGVkKSB7XG4gICAgICBlbnYud2FzbS5udW1UaHJlYWRzID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbnVtQ3B1TG9naWNhbENvcmVzID1cbiAgICAgICAgdHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCdub2RlOm9zJykuY3B1cygpLmxlbmd0aCA6IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5O1xuICAgICAgZW52Lndhc20ubnVtVGhyZWFkcyA9IE1hdGgubWluKDQsIE1hdGguY2VpbCgobnVtQ3B1TG9naWNhbENvcmVzIHx8IDEpIC8gMikpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kIGltcGxlbWVudHMgQmFja2VuZCB7XG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBXZWJBc3NlbWJseSBiYWNrZW5kLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIG9ubHkgb25jZSBmb3IgZWFjaCBiYWNrZW5kIG5hbWUuIEl0IHdpbGwgYmUgY2FsbGVkIHRoZSBmaXJzdCB0aW1lIHdoZW5cbiAgICogYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBpcyBjYWxsZWQgd2l0aCBhIHJlZ2lzdGVyZWQgYmFja2VuZCBuYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gYmFja2VuZE5hbWUgLSB0aGUgcmVnaXN0ZXJlZCBiYWNrZW5kIG5hbWUuXG4gICAqL1xuICBhc3luYyBpbml0KGJhY2tlbmROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBwb3B1bGF0ZSB3YXNtIGZsYWdzXG4gICAgaW5pdGlhbGl6ZUZsYWdzKCk7XG5cbiAgICAvLyBpbml0IHdhc21cbiAgICBhd2FpdCBpbml0aWFsaXplV2ViQXNzZW1ibHlBbmRPcnRSdW50aW1lKCk7XG5cbiAgICAvLyBwZXJmb3JtZSBFUCBzcGVjaWZpYyBpbml0aWFsaXphdGlvblxuICAgIGF3YWl0IGluaXRpYWxpemVPcnRFcChiYWNrZW5kTmFtZSk7XG4gIH1cbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgcGF0aDogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgYnVmZmVyOiBVaW50OEFycmF5LFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcbiAgYXN5bmMgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgcGF0aE9yQnVmZmVyOiBzdHJpbmcgfCBVaW50OEFycmF5LFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPiB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIoKTtcbiAgICBhd2FpdCBoYW5kbGVyLmxvYWRNb2RlbChwYXRoT3JCdWZmZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiBoYW5kbGVyO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB3YXNtQmFja2VuZCA9IG5ldyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCgpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzICovXG5cbi8vIFdlIHVzZSBcInJlcXVpcmVcIiBpbnN0ZWFkIG9mIFwiaW1wb3J0XCIgaGVyZSBiZWNhdXNlIGltcG9ydCBzdGF0ZW1lbnQgbXVzdCBiZSBwdXQgaW4gdG9wIGxldmVsLiBPdXIgY3VycmVudCBjb2RlIGRvZXNcbi8vIG5vdCBhbGxvdyBidW5kbGVyIHRvIHRyZWUtc2hha2luZyBjb2RlIGFzIGV4cGVjdGVkIGJlY2F1c2Ugc29tZSBjb2RlcyBhcmUgdHJlYXRlZCBhcyBoYXZpbmcgc2lkZSBlZmZlY3RzLlxuLy8gU28gd2UgaW1wb3J0IGNvZGUgaW5zaWRlIHRoZSBpZi1jbGF1c2UgdG8gYWxsb3cgYnVuZGxlciByZW1vdmUgdGhlIGNvZGUgc2FmZWx5LlxuXG5leHBvcnQgKiBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuaW1wb3J0ICogYXMgb3J0IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5leHBvcnQgZGVmYXVsdCBvcnQ7XG5cbmltcG9ydCB7IHJlZ2lzdGVyQmFja2VuZCwgZW52IH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xuXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHTCkge1xuICBjb25zdCBvbm54anNCYWNrZW5kID0gcmVxdWlyZSgnLi9iYWNrZW5kLW9ubnhqcycpLm9ubnhqc0JhY2tlbmQ7XG4gIHJlZ2lzdGVyQmFja2VuZCgnd2ViZ2wnLCBvbm54anNCYWNrZW5kLCAtMTApO1xufVxuXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQICYmICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnVGhlIGN1cnJlbnQgYnVpbGQgaXMgc3BlY2lmaWVkIHRvIGVuYWJsZSBib3RoIEpTRVAgYW5kIFdlYkdQVSBFUC4gVGhpcyBpcyBub3QgYSB2YWxpZCBjb25maWd1cmF0aW9uLiAnICtcbiAgICAgICdKU0VQIGFuZCBXZWJHUFUgRVBzIGNhbm5vdCBiZSBlbmFibGVkIGF0IHRoZSBzYW1lIHRpbWUuJyxcbiAgKTtcbn1cblxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCTk4gJiYgQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgJiYgQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ1RoZSBjdXJyZW50IGJ1aWxkIGlzIHNwZWNpZmllZCB0byBlbmFibGUgV2ViTk4gRVAgd2l0aG91dCBKU0VQIG9yIFdlYkdQVSBFUC4gVGhpcyBpcyBub3QgYSB2YWxpZCBjb25maWd1cmF0aW9uLiAnICtcbiAgICAgICdXZWJOTiBFUCByZXF1aXJlcyBlaXRoZXIgSlNFUCBvciBXZWJHUFUgRVAgdG8gYmUgZW5hYmxlZC4nLFxuICApO1xufVxuXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNKSB7XG4gIGNvbnN0IHdhc21CYWNrZW5kID0gcmVxdWlyZSgnLi9iYWNrZW5kLXdhc20nKS53YXNtQmFja2VuZDtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xuICAgIHJlZ2lzdGVyQmFja2VuZCgnd2ViZ3B1Jywgd2FzbUJhY2tlbmQsIDUpO1xuICB9XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQk5OKSB7XG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJubicsIHdhc21CYWNrZW5kLCA1KTtcbiAgfVxuICByZWdpc3RlckJhY2tlbmQoJ2NwdScsIHdhc21CYWNrZW5kLCAxMCk7XG4gIHJlZ2lzdGVyQmFja2VuZCgnd2FzbScsIHdhc21CYWNrZW5kLCAxMCk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnYudmVyc2lvbnMsICd3ZWInLCB7IHZhbHVlOiB2ZXJzaW9uLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IC9qcy9zY3JpcHRzL3VwZGF0ZS12ZXJzaW9uLnRzXG4vLyBEbyBub3QgbW9kaWZ5IGZpbGUgY29udGVudCBtYW51YWxseS5cblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMS4yMy4wJztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFnQk0sVUFDQSwwQkFZTyxpQkF3Q1AsZ0NBd0NPO0FBN0diOzs7QUFnQkEsTUFBTSxXQUFxQyxvQkFBSSxJQUFHO0FBQ2xELE1B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QSxJQUFBO0FBQUEsZUFBQUM7QUFBQSxJQUFBO0FBQUE7QUFTQTtBQUNBO0FBR0E7OztBQ1BPLE1BQU1DLFdBQVU7OztBREt2QixNQUFPLGdCQUFRO0FBS2YsTUFBSSxPQUEyQjtBQUM3QixVQUFNLGdCQUFnQixLQUE0QjtBQUNsRCxvQkFBZ0IsU0FBUyxlQUFlLEdBQUc7QUFBQSxFQUM3QztBQUVBLE1BQUksT0FBd0Q7QUFDMUQsVUFBTSxJQUFJO0FBQUEsTUFDUjtBQUFBLElBRUY7QUFBQSxFQUNGO0FBRUEsTUFBSSxPQUFtRjtBQUNyRixVQUFNLElBQUk7QUFBQSxNQUNSO0FBQUEsSUFFRjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLE1BQTBCO0FBQzVCLFVBQU1DLGVBQWMsMERBQTBCO0FBQzlDLFFBQWdDLE9BQTRCO0FBQzFELHNCQUFnQixVQUFVQSxjQUFhLENBQUM7QUFBQSxJQUMxQztBQUNBLFFBQUksT0FBMkI7QUFDN0Isc0JBQWdCLFNBQVNBLGNBQWEsQ0FBQztBQUFBLElBQ3pDO0FBQ0Esb0JBQWdCLE9BQU9BLGNBQWEsRUFBRTtBQUN0QyxvQkFBZ0IsUUFBUUEsY0FBYSxFQUFFO0FBQUEsRUFDekM7QUFFQSxTQUFPLGVBQWVDLEtBQUksVUFBVSxPQUFPLEVBQUUsT0FBT0MsVUFBUyxZQUFZLEtBQUssQ0FBQzsiLAogICJuYW1lcyI6IFsiaSIsICJlbnYiLCAiRmxvYXQxNkFycmF5IiwgIlRlbnNvciIsICJUZW5zb3IiLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJJbmZlcmVuY2VTZXNzaW9uIiwgIlRlbnNvciIsICJlbnYiLCAiZW52IiwgIndhc20iLCAid2FzbSIsICJ3YXNtIiwgImxvY2F0aW9uIiwgImVudiIsICJ3YXNtIiwgImxvY2F0aW9uIiwgImluZGV4IiwgInRlbnNvciIsICJlcnJvckNvZGUiLCAiaSIsICJpbml0aWFsaXppbmciLCAiaW5pdGlhbGl6ZWQiLCAiYWJvcnRlZCIsICJjb3B5RnJvbUV4dGVybmFsQnVmZmVyIiwgImNyZWF0ZVNlc3Npb24iLCAicmVsZWFzZVNlc3Npb24iLCAicnVuIiwgImVuZFByb2ZpbGluZyIsICJlbnYiLCAiVGVuc29yIiwgImNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIiLCAiY3JlYXRlU2Vzc2lvbiIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJJbmZlcmVuY2VTZXNzaW9uIiwgIlRlbnNvciIsICJlbnYiLCAidmVyc2lvbiIsICJ3YXNtQmFja2VuZCIsICJlbnYiLCAidmVyc2lvbiJdCn0K
