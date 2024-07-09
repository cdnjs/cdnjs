/*!
 * ONNX Runtime Web v1.19.0-dev.20240608-bd61ae530b
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
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
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
      version = "1.19.0-dev.20240531-35697d2421";
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
            if (options.format !== void 0 && (channels === 4 && options.format !== "RGBA") || channels === 3 && (options.format !== "RGB" && options.format !== "BGR")) {
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
  var bufferToTensor, tensorFromImage, tensorFromTexture, tensorFromGpuBuffer, tensorFromPinnedBuffer;
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
          if (canvas instanceof HTMLCanvasElement) {
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
        ["uint32", Uint32Array]
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
          const isFloat16ArrayAvailable = typeof Float16Array !== "undefined" && Float16Array.from;
          if (isBigInt64ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64", BigInt64Array);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array, "int64");
          }
          if (isBigUint64ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64", BigUint64Array);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array, "uint64");
          }
          if (isFloat16ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Float16Array);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(Float16Array, "float16");
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
                if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint8" && type !== "bool") {
                  throw new TypeError(`unsupported type "${type}" to create tensor from gpu buffer`);
                }
                this.gpuBufferData = arg0.gpuBuffer;
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
                  if (arg0 === "float16" && typedArrayConstructor === Uint16Array) {
                    throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");
                  } else if (arg0 === "uint64" || arg0 === "int64") {
                    data = typedArrayConstructor.from(arg1, BigInt);
                  } else {
                    data = typedArrayConstructor.from(arg1);
                  }
                } else if (arg1 instanceof typedArrayConstructor) {
                  data = arg1;
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
            throw new Error(`Tensor's size(${size}) does not match data length(${this.cpuData.length}).`);
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
        // #endregion
        // #region methods
        async getData(releaseData) {
          this.ensureValid();
          switch (this.dataLocation) {
            case "cpu":
            case "cpu-pinned":
              return this.data;
            case "texture":
            case "gpu-buffer": {
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
  var TRACE, TRACE_FUNC, TRACE_FUNC_BEGIN, TRACE_FUNC_END;
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
          TRACE_FUNC_END();
          return returnValue;
        }
        async release() {
          return this.handler.dispose();
        }
        static async create(arg0, arg1, arg2, arg3) {
          TRACE_FUNC_BEGIN();
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

  // common/dist/esm/training-session-impl.js
  var noBackendErrMsg, TrainingSession;
  var init_training_session_impl = __esm({
    "common/dist/esm/training-session-impl.js"() {
      "use strict";
      init_backend_impl();
      init_tensor();
      noBackendErrMsg = "Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.";
      TrainingSession = class _TrainingSession {
        constructor(handler, hasOptimizerModel, hasEvalModel) {
          this.handler = handler;
          this.hasOptimizerModel = hasOptimizerModel;
          this.hasEvalModel = hasEvalModel;
        }
        get trainingInputNames() {
          return this.handler.inputNames;
        }
        get trainingOutputNames() {
          return this.handler.outputNames;
        }
        get evalInputNames() {
          if (this.hasEvalModel) {
            return this.handler.evalInputNames;
          } else {
            throw new Error("This training session has no evalModel loaded.");
          }
        }
        get evalOutputNames() {
          if (this.hasEvalModel) {
            return this.handler.evalOutputNames;
          } else {
            throw new Error("This training session has no evalModel loaded.");
          }
        }
        static async create(trainingOptions, sessionOptions) {
          const evalModel = trainingOptions.evalModel || "";
          const optimizerModel = trainingOptions.optimizerModel || "";
          const options = sessionOptions || {};
          const [backend, optionsWithValidatedEPs] = await resolveBackendAndExecutionProviders(options);
          if (backend.createTrainingSessionHandler) {
            const handler = await backend.createTrainingSessionHandler(trainingOptions.checkpointState, trainingOptions.trainModel, evalModel, optimizerModel, optionsWithValidatedEPs);
            return new _TrainingSession(handler, !!trainingOptions.optimizerModel, !!trainingOptions.evalModel);
          } else {
            throw new Error(noBackendErrMsg);
          }
        }
        /**
         * Helper function for runTrainStep and future runStep methods that handles the type-narrowing conversion from
         * the given parameters to SessionHandler.FetchesType and RunOptions.
         *
         * @param inputNames the feeds object is checked that they contain all input names in the provided list of input
         * names.
         * @param outputNames the fetches object is checked that their keys match up with valid names in the list of output
         * names.
         * @param feeds the required input
         * @param arg1 narrowed & converted into the SessionHandler.FetchesType or RunOptions object
         * @param arg2 optional RunOptions object.
         * @returns
         */
        typeNarrowingForRunStep(inputNames, outputNames, feeds, arg1, arg2) {
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
                if (outputNames.indexOf(name) === -1) {
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
              for (const name of outputNames) {
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
          for (const name of inputNames) {
            if (typeof feeds[name] === "undefined") {
              throw new Error(`input '${name}' is missing in 'feeds'.`);
            }
          }
          if (isFetchesEmpty) {
            for (const name of outputNames) {
              fetches[name] = null;
            }
          }
          return [fetches, options];
        }
        /**
         * Helper method for runTrainStep and any other runStep methods. Takes the ReturnType result from the SessionHandler
         * and changes it into a map of Tensors.
         *
         * @param results
         * @returns
         */
        convertHandlerReturnTypeToMapOfTensors(results) {
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
          return returnValue;
        }
        async lazyResetGrad() {
          await this.handler.lazyResetGrad();
        }
        async runTrainStep(feeds, arg1, arg2) {
          const [fetches, options] = this.typeNarrowingForRunStep(this.trainingInputNames, this.trainingOutputNames, feeds, arg1, arg2);
          const results = await this.handler.runTrainStep(feeds, fetches, options);
          return this.convertHandlerReturnTypeToMapOfTensors(results);
        }
        async runOptimizerStep(options) {
          if (this.hasOptimizerModel) {
            await this.handler.runOptimizerStep(options || {});
          } else {
            throw new Error("This TrainingSession has no OptimizerModel loaded.");
          }
        }
        async runEvalStep(feeds, arg1, arg2) {
          if (this.hasEvalModel) {
            const [fetches, options] = this.typeNarrowingForRunStep(this.evalInputNames, this.evalOutputNames, feeds, arg1, arg2);
            const results = await this.handler.runEvalStep(feeds, fetches, options);
            return this.convertHandlerReturnTypeToMapOfTensors(results);
          } else {
            throw new Error("This TrainingSession has no EvalModel loaded.");
          }
        }
        async getParametersSize(trainableOnly = true) {
          return this.handler.getParametersSize(trainableOnly);
        }
        async loadParametersBuffer(array, trainableOnly = true) {
          const paramsSize = await this.getParametersSize(trainableOnly);
          if (array.length !== 4 * paramsSize) {
            throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");
          }
          return this.handler.loadParametersBuffer(array, trainableOnly);
        }
        async getContiguousParameters(trainableOnly = true) {
          return this.handler.getContiguousParameters(trainableOnly);
        }
        async release() {
          return this.handler.dispose();
        }
      };
    }
  });

  // common/dist/esm/training-session.js
  var TrainingSession2;
  var init_training_session = __esm({
    "common/dist/esm/training-session.js"() {
      "use strict";
      init_training_session_impl();
      TrainingSession2 = TrainingSession;
    }
  });

  // common/dist/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    InferenceSession: () => InferenceSession2,
    TRACE: () => TRACE,
    TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
    TRACE_FUNC_END: () => TRACE_FUNC_END,
    Tensor: () => Tensor2,
    TrainingSession: () => TrainingSession2,
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
      init_training_session();
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
  var scriptSrc, origin, isSameOrigin, normalizeUrl, fallbackUrl, preload, dynamicImportDefault, createProxyWorker, importProxyWorker, embeddedWasmModule, importWasmModule;
  var init_wasm_utils_import = __esm({
    "web/lib/wasm/wasm-utils-import.ts"() {
      "use strict";
      init_wasm_utils_env();
      scriptSrc = // if Nodejs, return undefined
      isNode ? void 0 : (
        // use `document.currentScript.src` if available
        typeof document !== "undefined" ? document.currentScript?.src : (
          // use `self.location.href` if available
          typeof self !== "undefined" ? self.location?.href : void 0
        )
      );
      origin = isNode || typeof location === "undefined" ? void 0 : location.origin;
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
      importWasmModule = async (urlOverride, prefixOverride, isMultiThreaded) => {
        if (false) {
          return [void 0, embeddedWasmModule];
        } else {
          const wasmModuleFilename = false ? "ort-training-wasm-simd-threaded.mjs" : false ? "ort-wasm-simd-threaded.jsep.mjs" : "ort-wasm-simd-threaded.mjs";
          const wasmModuleUrl = urlOverride ?? normalizeUrl(wasmModuleFilename, prefixOverride);
          const needPreload = !isNode && isMultiThreaded && wasmModuleUrl && !isSameOrigin(wasmModuleUrl, prefixOverride);
          const url = needPreload ? await preload(wasmModuleUrl) : wasmModuleUrl ?? fallbackUrl(wasmModuleFilename, prefixOverride);
          return [needPreload ? url : void 0, await dynamicImportDefault(url)];
        }
      };
    }
  });

  // web/lib/wasm/wasm-factory.ts
  var wasm, initialized, initializing, aborted, isMultiThreadSupported, isSimdSupported, initializeWebAssembly, getInstance;
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
          return WebAssembly.validate(new Uint8Array([
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
          ]));
        } catch (e) {
          return false;
        }
      };
      isSimdSupported = () => {
        try {
          return WebAssembly.validate(new Uint8Array([
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
          ]));
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
        if (!isSimdSupported()) {
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
        const [objectUrl, ortWasmFactory] = await importWasmModule(mjsPathOverride, wasmPrefixOverride, numThreads > 1);
        let isTimeout = false;
        const tasks = [];
        if (timeout > 0) {
          tasks.push(new Promise((resolve) => {
            setTimeout(() => {
              isTimeout = true;
              resolve();
            }, timeout);
          }));
        }
        tasks.push(new Promise((resolve, reject) => {
          const config = {
            /**
             * The number of threads. WebAssembly will create (Module.numThreads - 1) workers. If it is 1, no worker will be
             * created.
             */
            numThreads,
            /**
             * A callback function to locate the WebAssembly file. The function should return the full path of the file.
             *
             * Since Emscripten 3.1.58, this function is only called for the .wasm file.
             */
            locateFile: (fileName, scriptDirectory) => wasmPathOverride ?? (wasmPrefixOverride ?? scriptDirectory) + fileName
          };
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
        }));
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
          const paramsOffset = wasm2.stackAlloc(8);
          wasm2._OrtGetLastError(paramsOffset, paramsOffset + 4);
          const errorCode = wasm2.HEAP32[paramsOffset / 4];
          const errorMessagePointer = wasm2.HEAPU32[paramsOffset / 4 + 1];
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
            throw new Error(`log serverity level is not valid: ${options.logSeverityLevel}`);
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
  var getGraphOptimzationLevel, getExecutionMode, appendDefaultOptions, setExecutionProviders, setSessionOptions;
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
      setExecutionProviders = (sessionOptionsHandle, executionProviders, allocs) => {
        for (const ep of executionProviders) {
          let epName = typeof ep === "string" ? ep : ep.name;
          switch (epName) {
            case "webnn":
              epName = "WEBNN";
              if (typeof ep !== "string") {
                const webnnOptions = ep;
                const deviceType = webnnOptions?.deviceType;
                const numThreads = webnnOptions?.numThreads;
                const powerPreference = webnnOptions?.powerPreference;
                if (deviceType) {
                  const keyDataOffset = allocWasmString("deviceType", allocs);
                  const valueDataOffset = allocWasmString(deviceType, allocs);
                  if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                    checkLastError(`Can't set a session config entry: 'deviceType' - ${deviceType}.`);
                  }
                }
                if (numThreads !== void 0) {
                  const validatedNumThreads = typeof numThreads !== "number" || !Number.isInteger(numThreads) || numThreads < 0 ? 0 : numThreads;
                  const keyDataOffset = allocWasmString("numThreads", allocs);
                  const valueDataOffset = allocWasmString(validatedNumThreads.toString(), allocs);
                  if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                    checkLastError(`Can't set a session config entry: 'numThreads' - ${numThreads}.`);
                  }
                }
                if (powerPreference) {
                  const keyDataOffset = allocWasmString("powerPreference", allocs);
                  const valueDataOffset = allocWasmString(powerPreference, allocs);
                  if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                    checkLastError(`Can't set a session config entry: 'powerPreference' - ${powerPreference}.`);
                  }
                }
              }
              break;
            case "webgpu":
              epName = "JS";
              if (typeof ep !== "string") {
                const webgpuOptions = ep;
                if (webgpuOptions?.preferredLayout) {
                  if (webgpuOptions.preferredLayout !== "NCHW" && webgpuOptions.preferredLayout !== "NHWC") {
                    throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${webgpuOptions.preferredLayout}`);
                  }
                  const keyDataOffset = allocWasmString("preferredLayout", allocs);
                  const valueDataOffset = allocWasmString(webgpuOptions.preferredLayout, allocs);
                  if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                    checkLastError(
                      `Can't set a session config entry: 'preferredLayout' - ${webgpuOptions.preferredLayout}.`
                    );
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
          if (getInstance()._OrtAppendExecutionProvider(sessionOptionsHandle, epNameDataOffset) !== 0) {
            checkLastError(`Can't append execution provider: ${epName}.`);
          }
        }
      };
      setSessionOptions = (options) => {
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
            throw new Error(`log serverity level is not valid: ${logSeverityLevel}`);
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
            setExecutionProviders(sessionOptionsHandle, sessionOptions.executionProviders, allocs);
          }
          if (sessionOptions.enableGraphCapture !== void 0) {
            if (typeof sessionOptions.enableGraphCapture !== "boolean") {
              throw new Error(`enableGraphCapture must be a boolean value: ${sessionOptions.enableGraphCapture}`);
            }
            const keyDataOffset = allocWasmString("enableGraphCapture", allocs);
            const valueDataOffset = allocWasmString(sessionOptions.enableGraphCapture.toString(), allocs);
            if (wasm2._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
              checkLastError(
                `Can't set a session config entry: 'enableGraphCapture' - ${sessionOptions.enableGraphCapture}.`
              );
            }
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
              const keyDataOffset = allocWasmString(key, allocs);
              const valueDataOffset = allocWasmString(value, allocs);
              if (wasm2._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                checkLastError(`Can't set a session config entry: ${key} - ${value}.`);
              }
            });
          }
          return [sessionOptionsHandle, allocs];
        } catch (e) {
          if (sessionOptionsHandle !== 0) {
            wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
          throw e;
        }
      };
    }
  });

  // web/lib/wasm/wasm-common.ts
  var tensorDataTypeStringToEnum, tensorDataTypeEnumToString, getTensorElementSize, tensorTypeToTypedArrayConstructor, logLevelStringToEnum, isGpuBufferSupportedType, dataLocationStringToEnum;
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
          default:
            throw new Error(`unsupported data type: ${typeProto}`);
        }
      };
      getTensorElementSize = (dateType) => [void 0, 4, 1, 1, 2, 2, 4, 8, void 0, 1, 2, 8, 4, 8, void 0, void 0, void 0][dateType];
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
      isGpuBufferSupportedType = (type) => type === "float32" || type === "float16" || type === "int32" || type === "int64" || type === "uint32" || type === "uint8" || type === "bool";
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
  var initOrt, initRuntime, initEp, activeSessions, getSessionInputOutputCount, copyFromExternalBuffer, createSession, releaseSession, prepareInputOutputTensor, run, endProfiling, extractTransferableBuffers;
  var init_wasm_core_impl = __esm({
    "web/lib/wasm/wasm-core-impl.ts"() {
      "use strict";
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
        if (false) {
          const initJsep = null.init;
          if (epName === "webgpu") {
            if (typeof navigator === "undefined" || !navigator.gpu) {
              throw new Error("WebGPU is not supported in current environment");
            }
            let adapter = env3.webgpu.adapter;
            if (!adapter) {
              const powerPreference = env3.webgpu.powerPreference;
              if (powerPreference !== void 0 && powerPreference !== "low-power" && powerPreference !== "high-performance") {
                throw new Error(`Invalid powerPreference setting: "${powerPreference}"`);
              }
              const forceFallbackAdapter = env3.webgpu.forceFallbackAdapter;
              if (forceFallbackAdapter !== void 0 && typeof forceFallbackAdapter !== "boolean") {
                throw new Error(`Invalid forceFallbackAdapter setting: "${forceFallbackAdapter}"`);
              }
              adapter = await navigator.gpu.requestAdapter({ powerPreference, forceFallbackAdapter });
              if (!adapter) {
                throw new Error(
                  'Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.'
                );
              }
            } else {
              if (typeof adapter.limits !== "object" || typeof adapter.features !== "object" || typeof adapter.requestDevice !== "function") {
                throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
              }
            }
            await initJsep("webgpu", getInstance(), env3, adapter);
          }
          if (epName === "webnn") {
            if (typeof navigator === "undefined" || !navigator.ml) {
              throw new Error("WebNN is not supported in current environment");
            }
            await initJsep("webnn", getInstance(), env3);
          }
        }
      };
      activeSessions = /* @__PURE__ */ new Map();
      getSessionInputOutputCount = (sessionHandle) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        try {
          const dataOffset = wasm2.stackAlloc(8);
          const errorCode = wasm2._OrtGetInputOutputCount(sessionHandle, dataOffset, dataOffset + 4);
          if (errorCode !== 0) {
            checkLastError("Can't get session input/output count.");
          }
          return [wasm2.HEAP32[dataOffset / 4], wasm2.HEAP32[dataOffset / 4 + 1]];
        } finally {
          wasm2.stackRestore(stack);
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
          [sessionOptionsHandle, allocs] = setSessionOptions(options);
          if (options?.externalData && wasm2.mountExternalData) {
            const loadingPromises = [];
            for (const file of options.externalData) {
              const path = typeof file === "string" ? file : file.path;
              loadingPromises.push(loadFile(typeof file === "string" ? file : file.data).then((data) => {
                wasm2.mountExternalData(path, data);
              }));
            }
            await Promise.all(loadingPromises);
          }
          sessionHandle = await wasm2._OrtCreateSession(modelDataOffset, modelDataLength, sessionOptionsHandle);
          if (sessionHandle === 0) {
            checkLastError("Can't create a session.");
          }
          const [inputCount, outputCount] = getSessionInputOutputCount(sessionHandle);
          const enableGraphCapture = !!options?.enableGraphCapture;
          const inputNames = [];
          const outputNames = [];
          const outputPreferredLocations = [];
          for (let i = 0; i < inputCount; i++) {
            const name = wasm2._OrtGetInputName(sessionHandle, i);
            if (name === 0) {
              checkLastError("Can't get an input name.");
            }
            inputNamesUTF8Encoded.push(name);
            inputNames.push(wasm2.UTF8ToString(name));
          }
          for (let i = 0; i < outputCount; i++) {
            const name = wasm2._OrtGetOutputName(sessionHandle, i);
            if (name === 0) {
              checkLastError("Can't get an output name.");
            }
            outputNamesUTF8Encoded.push(name);
            const nameString = wasm2.UTF8ToString(name);
            outputNames.push(nameString);
            if (false) {
              if (enableGraphCapture && options?.preferredOutputLocation === void 0) {
                outputPreferredLocations.push("gpu-buffer");
                continue;
              }
              const location2 = typeof options?.preferredOutputLocation === "string" ? options.preferredOutputLocation : options?.preferredOutputLocation?.[nameString] ?? "cpu";
              if (location2 !== "cpu" && location2 !== "cpu-pinned" && location2 !== "gpu-buffer") {
                throw new Error(`Not supported preferred output location: ${location2}.`);
              }
              if (enableGraphCapture && location2 !== "gpu-buffer") {
                throw new Error(`Not supported preferred output location: ${location2}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);
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
              outputPreferredLocationsEncoded: outputPreferredLocations.map((l) => dataLocationStringToEnum(l))
            };
          }
          activeSessions.set(
            sessionHandle,
            [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, bindingState, enableGraphCapture, false]
          );
          return [sessionHandle, inputNames, outputNames];
        } catch (e) {
          inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
          outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
          if (ioBindingHandle !== 0) {
            wasm2._OrtReleaseBinding(ioBindingHandle);
          }
          if (sessionHandle !== 0) {
            wasm2._OrtReleaseSession(sessionHandle);
          }
          throw e;
        } finally {
          wasm2._free(modelDataOffset);
          if (sessionOptionsHandle !== 0) {
            wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);
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
            wasm2._OrtClearBoundOutputs(ioBindingState.handle);
          }
          wasm2._OrtReleaseBinding(ioBindingState.handle);
        }
        wasm2.jsepOnReleaseSession?.(sessionId);
        inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        wasm2._OrtReleaseSession(sessionHandle);
        activeSessions.delete(sessionId);
      };
      prepareInputOutputTensor = (tensor, tensorHandles, allocs, sessionId, index, enableGraphCapture = false) => {
        if (!tensor) {
          tensorHandles.push(0);
          return;
        }
        const wasm2 = getInstance();
        const dataType = tensor[0];
        const dims = tensor[1];
        const location2 = tensor[3];
        let rawData;
        let dataByteLength;
        if (dataType === "string" && location2 === "gpu-buffer") {
          throw new Error("String tensor is not supported on GPU.");
        }
        if (enableGraphCapture && location2 !== "gpu-buffer") {
          throw new Error(
            `External buffer must be provided for input/output index ${index} when enableGraphCapture is true.`
          );
        }
        if (location2 === "gpu-buffer") {
          const gpuBuffer = tensor[2].gpuBuffer;
          const elementSizeInBytes = getTensorElementSize(tensorDataTypeStringToEnum(dataType));
          dataByteLength = dims.reduce((a, b) => a * b, 1) * elementSizeInBytes;
          const registerBuffer = wasm2.jsepRegisterBuffer;
          if (!registerBuffer) {
            throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
          }
          rawData = registerBuffer(sessionId, index, gpuBuffer, dataByteLength);
        } else {
          const data = tensor[2];
          if (Array.isArray(data)) {
            dataByteLength = 4 * data.length;
            rawData = wasm2._malloc(dataByteLength);
            allocs.push(rawData);
            let dataIndex = rawData / 4;
            for (let i = 0; i < data.length; i++) {
              if (typeof data[i] !== "string") {
                throw new TypeError(`tensor data at index ${i} is not a string`);
              }
              wasm2.HEAPU32[dataIndex++] = allocWasmString(data[i], allocs);
            }
          } else {
            dataByteLength = data.byteLength;
            rawData = wasm2._malloc(dataByteLength);
            allocs.push(rawData);
            wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
          }
        }
        const stack = wasm2.stackSave();
        const dimsOffset = wasm2.stackAlloc(4 * dims.length);
        try {
          let dimIndex = dimsOffset / 4;
          dims.forEach((d) => wasm2.HEAP32[dimIndex++] = d);
          const tensor2 = wasm2._OrtCreateTensor(
            tensorDataTypeStringToEnum(dataType),
            rawData,
            dataByteLength,
            dimsOffset,
            dims.length,
            dataLocationStringToEnum(location2)
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
        const inputValuesOffset = wasm2.stackAlloc(inputCount * 4);
        const inputNamesOffset = wasm2.stackAlloc(inputCount * 4);
        const outputValuesOffset = wasm2.stackAlloc(outputCount * 4);
        const outputNamesOffset = wasm2.stackAlloc(outputCount * 4);
        try {
          [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);
          for (let i = 0; i < inputCount; i++) {
            prepareInputOutputTensor(
              inputTensors[i],
              inputTensorHandles,
              inputOutputAllocs,
              sessionId,
              inputIndices[i],
              enableGraphCapture
            );
          }
          for (let i = 0; i < outputCount; i++) {
            prepareInputOutputTensor(
              outputTensors[i],
              outputTensorHandles,
              inputOutputAllocs,
              sessionId,
              inputCount + outputIndices[i],
              enableGraphCapture
            );
          }
          let inputValuesIndex = inputValuesOffset / 4;
          let inputNamesIndex = inputNamesOffset / 4;
          let outputValuesIndex = outputValuesOffset / 4;
          let outputNamesIndex = outputNamesOffset / 4;
          for (let i = 0; i < inputCount; i++) {
            wasm2.HEAPU32[inputValuesIndex++] = inputTensorHandles[i];
            wasm2.HEAPU32[inputNamesIndex++] = inputNamesUTF8Encoded[inputIndices[i]];
          }
          for (let i = 0; i < outputCount; i++) {
            wasm2.HEAPU32[outputValuesIndex++] = outputTensorHandles[i];
            wasm2.HEAPU32[outputNamesIndex++] = outputNamesUTF8Encoded[outputIndices[i]];
          }
          if (false) {
            const { handle, outputPreferredLocations, outputPreferredLocationsEncoded } = ioBindingState;
            if (inputNamesUTF8Encoded.length !== inputCount) {
              throw new Error(`input count from feeds (${inputCount}) is expected to be always equal to model's input count (${inputNamesUTF8Encoded.length}).`);
            }
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
                const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], 0, outputPreferredLocationsEncoded[index]);
                if (errorCode2 !== 0) {
                  checkLastError(`Can't bind output[${i}] to ${outputPreferredLocations[i]} for session=${sessionId}.`);
                }
              }
            }
            activeSessions.set(
              sessionId,
              [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState, enableGraphCapture, true]
            );
          }
          wasm2.jsepOnRunStart?.(sessionHandle);
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
          for (let i = 0; i < outputCount; i++) {
            const tensor = wasm2.HEAPU32[outputValuesOffset / 4 + i];
            if (tensor === outputTensorHandles[i]) {
              output.push(outputTensors[i]);
              continue;
            }
            const beforeGetTensorDataStack = wasm2.stackSave();
            const tensorDataOffset = wasm2.stackAlloc(4 * 4);
            let keepOutputTensor = false;
            let type, dataOffset = 0;
            try {
              const errorCode2 = wasm2._OrtGetTensorData(
                tensor,
                tensorDataOffset,
                tensorDataOffset + 4,
                tensorDataOffset + 8,
                tensorDataOffset + 12
              );
              if (errorCode2 !== 0) {
                checkLastError(`Can't access output tensor data on index ${i}.`);
              }
              let tensorDataIndex = tensorDataOffset / 4;
              const dataType = wasm2.HEAPU32[tensorDataIndex++];
              dataOffset = wasm2.HEAPU32[tensorDataIndex++];
              const dimsOffset = wasm2.HEAPU32[tensorDataIndex++];
              const dimsLength = wasm2.HEAPU32[tensorDataIndex++];
              const dims = [];
              for (let i2 = 0; i2 < dimsLength; i2++) {
                dims.push(wasm2.HEAPU32[dimsOffset / 4 + i2]);
              }
              wasm2._OrtFree(dimsOffset);
              const size = dims.reduce((a, b) => a * b, 1);
              type = tensorDataTypeEnumToString(dataType);
              const preferredLocation = ioBindingState?.outputPreferredLocations[outputIndices[i]];
              if (type === "string") {
                if (preferredLocation === "gpu-buffer") {
                  throw new Error("String tensor is not supported on GPU.");
                }
                const stringData = [];
                let dataIndex = dataOffset / 4;
                for (let i2 = 0; i2 < size; i2++) {
                  const offset = wasm2.HEAPU32[dataIndex++];
                  const maxBytesToRead = i2 === size - 1 ? void 0 : wasm2.HEAPU32[dataIndex] - offset;
                  stringData.push(wasm2.UTF8ToString(offset, maxBytesToRead));
                }
                output.push([type, dims, stringData, "cpu"]);
              } else {
                if (preferredLocation === "gpu-buffer" && size > 0) {
                  const getBuffer = wasm2.jsepGetBuffer;
                  if (!getBuffer) {
                    throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                  }
                  const gpuBuffer = getBuffer(dataOffset);
                  const elementSize = getTensorElementSize(dataType);
                  if (elementSize === void 0 || !isGpuBufferSupportedType(type)) {
                    throw new Error(`Unsupported data type: ${type}`);
                  }
                  keepOutputTensor = true;
                  output.push([
                    type,
                    dims,
                    {
                      gpuBuffer,
                      download: wasm2.jsepCreateDownloader(gpuBuffer, size * elementSize, type),
                      dispose: () => {
                        wasm2._OrtReleaseTensor(tensor);
                      }
                    },
                    "gpu-buffer"
                  ]);
                } else {
                  const typedArrayConstructor = tensorTypeToTypedArrayConstructor(type);
                  const data = new typedArrayConstructor(size);
                  new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(wasm2.HEAPU8.subarray(dataOffset, dataOffset + data.byteLength));
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
            wasm2._OrtClearBoundOutputs(ioBindingState.handle);
            activeSessions.set(
              sessionId,
              [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState, enableGraphCapture, false]
            );
          }
          return output;
        } finally {
          wasm2.stackRestore(beforeRunStack);
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
            const message = { type: "run", in: { sessionId, inputIndices, inputs: serializableInputs, outputIndices, options } };
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
          [this.sessionId, this.inputNames, this.outputNames] = await createSession2(model, options);
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
          const inputs = inputArray.map((t, i) => encodeTensorMetadata(t, () => `input "${this.inputNames[inputIndices[i]]}"`));
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
  var initializeFlags, OnnxruntimeWebAssemblyBackend;
  var init_backend_wasm = __esm({
    "web/lib/backend-wasm.ts"() {
      "use strict";
      init_esm();
      init_proxy_wrapper();
      init_session_handler_inference();
      init_wasm_utils_import();
      initializeFlags = () => {
        if (typeof env2.wasm.initTimeout !== "number" || env2.wasm.initTimeout < 0) {
          env2.wasm.initTimeout = 0;
        }
        if (env2.wasm.simd === false) {
          console.warn(
            'Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'
          );
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
        if (env2.wasm.wasmPaths === void 0 && scriptSrc && scriptSrc.indexOf("blob:") !== 0) {
          env2.wasm.wasmPaths = scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);
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
          return Promise.resolve(handler);
        }
      };
    }
  });

  // web/lib/backend-wasm-inference.ts
  var backend_wasm_inference_exports = {};
  __export(backend_wasm_inference_exports, {
    wasmBackend: () => wasmBackend
  });
  var wasmBackend;
  var init_backend_wasm_inference = __esm({
    "web/lib/backend-wasm-inference.ts"() {
      "use strict";
      init_backend_wasm();
      wasmBackend = new OnnxruntimeWebAssemblyBackend();
    }
  });

  // web/lib/index.ts
  var lib_exports = {};
  __export(lib_exports, {
    InferenceSession: () => InferenceSession2,
    TRACE: () => TRACE,
    TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
    TRACE_FUNC_END: () => TRACE_FUNC_END,
    Tensor: () => Tensor2,
    TrainingSession: () => TrainingSession2,
    default: () => lib_default,
    env: () => env2,
    registerBackend: () => registerBackend
  });
  init_esm();
  init_esm();
  init_esm();

  // web/lib/version.ts
  var version2 = "1.19.0-dev.20240608-bd61ae530b";

  // web/lib/index.ts
  var lib_default = esm_exports;
  if (false) {
    const onnxjsBackend = null.onnxjsBackend;
    registerBackend("webgl", onnxjsBackend, -10);
  }
  if (true) {
    const wasmBackend2 = true ? (init_backend_wasm_inference(), __toCommonJS(backend_wasm_inference_exports)).wasmBackend : null.wasmBackend;
    if (false) {
      registerBackend("webgpu", wasmBackend2, 5);
      registerBackend("webnn", wasmBackend2, 5);
    }
    registerBackend("cpu", wasmBackend2, 10);
    registerBackend("wasm", wasmBackend2, 10);
  }
  Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
  return __toCommonJS(lib_exports);
})();
typeof exports=="object"&&typeof module=="object"&&(module.exports=ort);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdHJhY2UudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24udHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItY29udmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvb25ueC1tb2RlbC50cyIsICIuLi8uLi9jb21tb24vbGliL29ubngtdmFsdWUudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90cmFpbmluZy1zZXNzaW9uLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90cmFpbmluZy1zZXNzaW9uLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5kZXgudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1lbnYudHMiLCAiLi4vbGliL3dhc20vcHJveHktd29ya2VyL21haW4udHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHMiLCAiLi4vbGliL3dhc20vd2FzbS1mYWN0b3J5LnRzIiwgIi4uL2xpYi93YXNtL3dhc20tdXRpbHMudHMiLCAiLi4vbGliL3dhc20vcnVuLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vc2Vzc2lvbi1vcHRpb25zLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tY29tbW9uLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tdXRpbHMtbG9hZC1maWxlLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tY29yZS1pbXBsLnRzIiwgIi4uL2xpYi93YXNtL3Byb3h5LXdyYXBwZXIudHMiLCAiLi4vbGliL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZS50cyIsICIuLi9saWIvYmFja2VuZC13YXNtLnRzIiwgIi4uL2xpYi9iYWNrZW5kLXdhc20taW5mZXJlbmNlLnRzIiwgIi4uL2xpYi9pbmRleC50cyIsICIuLi9saWIvdmVyc2lvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7QmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kLmpzJztcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5cbmludGVyZmFjZSBCYWNrZW5kSW5mbyB7XG4gIGJhY2tlbmQ6IEJhY2tlbmQ7XG4gIHByaW9yaXR5OiBudW1iZXI7XG5cbiAgaW5pdFByb21pc2U/OiBQcm9taXNlPHZvaWQ+O1xuICBpbml0aWFsaXplZD86IGJvb2xlYW47XG4gIGFib3J0ZWQ/OiBib29sZWFuO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuY29uc3QgYmFja2VuZHM6IE1hcDxzdHJpbmcsIEJhY2tlbmRJbmZvPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eTogc3RyaW5nW10gPSBbXTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIGJhY2tlbmQuXG4gKlxuICogQHBhcmFtIG5hbWUgLSB0aGUgbmFtZSBhcyBhIGtleSB0byBsb29rdXAgYXMgYW4gZXhlY3V0aW9uIHByb3ZpZGVyLlxuICogQHBhcmFtIGJhY2tlbmQgLSB0aGUgYmFja2VuZCBvYmplY3QuXG4gKiBAcGFyYW0gcHJpb3JpdHkgLSBhbiBpbnRlZ2VyIGluZGljYXRpbmcgdGhlIHByaW9yaXR5IG9mIHRoZSBiYWNrZW5kLiBIaWdoZXIgbnVtYmVyIG1lYW5zIGhpZ2hlciBwcmlvcml0eS4gaWYgcHJpb3JpdHlcbiAqIDwgMCwgaXQgd2lsbCBiZSBjb25zaWRlcmVkIGFzIGEgJ2JldGEnIHZlcnNpb24gYW5kIHdpbGwgbm90IGJlIHVzZWQgYXMgYSBmYWxsYmFjayBiYWNrZW5kIGJ5IGRlZmF1bHQuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJCYWNrZW5kID0gKG5hbWU6IHN0cmluZywgYmFja2VuZDogQmFja2VuZCwgcHJpb3JpdHk6IG51bWJlcik6IHZvaWQgPT4ge1xuICBpZiAoYmFja2VuZCAmJiB0eXBlb2YgYmFja2VuZC5pbml0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgY3VycmVudEJhY2tlbmQgPSBiYWNrZW5kcy5nZXQobmFtZSk7XG4gICAgaWYgKGN1cnJlbnRCYWNrZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJhY2tlbmRzLnNldChuYW1lLCB7YmFja2VuZCwgcHJpb3JpdHl9KTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kLnByaW9yaXR5ID4gcHJpb3JpdHkpIHtcbiAgICAgIC8vIHNhbWUgbmFtZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgd2l0aCBhIGhpZ2hlciBwcmlvcml0eS4gc2tpcCByZWdpc3RlcmF0aW9uLlxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEJhY2tlbmQucHJpb3JpdHkgPT09IHByaW9yaXR5KSB7XG4gICAgICBpZiAoY3VycmVudEJhY2tlbmQuYmFja2VuZCAhPT0gYmFja2VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCByZWdpc3RlciBiYWNrZW5kIFwiJHtuYW1lfVwiIHVzaW5nIHByaW9yaXR5ICR7cHJpb3JpdHl9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByaW9yaXR5ID49IDApIHtcbiAgICAgIGNvbnN0IGkgPSBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYmFja2VuZHMuZ2V0KGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eVtpXSkhLnByaW9yaXR5IDw9IHByaW9yaXR5KSB7XG4gICAgICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnNwbGljZShpLCAwLCBuYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5wdXNoKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSB2YWxpZCBiYWNrZW5kJyk7XG59O1xuXG4vKipcbiAqIFRyeSB0byByZXNvbHZlIGFuZCBpbml0aWFsaXplIGEgYmFja2VuZC5cbiAqXG4gKiBAcGFyYW0gYmFja2VuZE5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgYmFja2VuZC5cbiAqIEByZXR1cm5zIHRoZSBiYWNrZW5kIGluc3RhbmNlIGlmIHJlc29sdmVkIGFuZCBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHksIG9yIGFuIGVycm9yIG1lc3NhZ2UgaWYgZmFpbGVkLlxuICovXG5jb25zdCB0cnlSZXNvbHZlQW5kSW5pdGlhbGl6ZUJhY2tlbmQgPSBhc3luYyhiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTxCYWNrZW5kfHN0cmluZz4gPT4ge1xuICBjb25zdCBiYWNrZW5kSW5mbyA9IGJhY2tlbmRzLmdldChiYWNrZW5kTmFtZSk7XG4gIGlmICghYmFja2VuZEluZm8pIHtcbiAgICByZXR1cm4gJ2JhY2tlbmQgbm90IGZvdW5kLic7XG4gIH1cblxuICBpZiAoYmFja2VuZEluZm8uaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcbiAgfSBlbHNlIGlmIChiYWNrZW5kSW5mby5hYm9ydGVkKSB7XG4gICAgcmV0dXJuIGJhY2tlbmRJbmZvLmVycm9yITtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpc0luaXRpYWxpemluZyA9ICEhYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghaXNJbml0aWFsaXppbmcpIHtcbiAgICAgICAgYmFja2VuZEluZm8uaW5pdFByb21pc2UgPSBiYWNrZW5kSW5mby5iYWNrZW5kLmluaXQoYmFja2VuZE5hbWUpO1xuICAgICAgfVxuICAgICAgYXdhaXQgYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgICBiYWNrZW5kSW5mby5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIWlzSW5pdGlhbGl6aW5nKSB7XG4gICAgICAgIGJhY2tlbmRJbmZvLmVycm9yID0gYCR7ZX1gO1xuICAgICAgICBiYWNrZW5kSW5mby5hYm9ydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiYWNrZW5kSW5mby5lcnJvciE7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGRlbGV0ZSBiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUmVzb2x2ZSBleGVjdXRpb24gcHJvdmlkZXJzIGZyb20gdGhlIHNwZWNpZmljIHNlc3Npb24gb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyAtIHRoZSBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0LlxuICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0dXBsZSBvZiBhbiBpbml0aWFsaXplZCBiYWNrZW5kIGluc3RhbmNlIGFuZCBhIHNlc3Npb24gb3B0aW9ucyBvYmplY3Qgd2l0aFxuICogZmlsdGVyZWQgRVAgbGlzdC5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCByZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVycyA9IGFzeW5jKG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgIFByb21pc2U8W2JhY2tlbmQ6IEJhY2tlbmQsIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnNdPiA9PiB7XG4gICAgICAvLyBleHRyYWN0IGJhY2tlbmQgaGludHMgZnJvbSBzZXNzaW9uIG9wdGlvbnNcbiAgICAgIGNvbnN0IGVwcyA9IG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzIHx8IFtdO1xuICAgICAgY29uc3QgYmFja2VuZEhpbnRzID0gZXBzLm1hcChpID0+IHR5cGVvZiBpID09PSAnc3RyaW5nJyA/IGkgOiBpLm5hbWUpO1xuICAgICAgY29uc3QgYmFja2VuZE5hbWVzID0gYmFja2VuZEhpbnRzLmxlbmd0aCA9PT0gMCA/IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eSA6IGJhY2tlbmRIaW50cztcblxuICAgICAgLy8gdHJ5IHRvIHJlc29sdmUgYW5kIGluaXRpYWxpemUgYWxsIHJlcXVlc3RlZCBiYWNrZW5kc1xuICAgICAgbGV0IGJhY2tlbmQ6IEJhY2tlbmR8dW5kZWZpbmVkO1xuICAgICAgY29uc3QgZXJyb3JzID0gW107XG4gICAgICBjb25zdCBhdmFpbGFibGVCYWNrZW5kTmFtZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGZvciAoY29uc3QgYmFja2VuZE5hbWUgb2YgYmFja2VuZE5hbWVzKSB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVSZXN1bHQgPSBhd2FpdCB0cnlSZXNvbHZlQW5kSW5pdGlhbGl6ZUJhY2tlbmQoYmFja2VuZE5hbWUpO1xuICAgICAgICBpZiAodHlwZW9mIHJlc29sdmVSZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2goe25hbWU6IGJhY2tlbmROYW1lLCBlcnI6IHJlc29sdmVSZXN1bHR9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWJhY2tlbmQpIHtcbiAgICAgICAgICAgIGJhY2tlbmQgPSByZXNvbHZlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYmFja2VuZCA9PT0gcmVzb2x2ZVJlc3VsdCkge1xuICAgICAgICAgICAgYXZhaWxhYmxlQmFja2VuZE5hbWVzLmFkZChiYWNrZW5kTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIG5vIGJhY2tlbmQgaXMgYXZhaWxhYmxlLCB0aHJvdyBlcnJvci5cbiAgICAgIGlmICghYmFja2VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vIGF2YWlsYWJsZSBiYWNrZW5kIGZvdW5kLiBFUlI6ICR7ZXJyb3JzLm1hcChlID0+IGBbJHtlLm5hbWV9XSAke2UuZXJyfWApLmpvaW4oJywgJyl9YCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGZvciBlYWNoIGV4cGxpY2l0bHkgcmVxdWVzdGVkIGJhY2tlbmQsIGlmIGl0J3Mgbm90IGF2YWlsYWJsZSwgb3V0cHV0IHdhcm5pbmcgbWVzc2FnZS5cbiAgICAgIGZvciAoY29uc3Qge25hbWUsIGVycn0gb2YgZXJyb3JzKSB7XG4gICAgICAgIGlmIChiYWNrZW5kSGludHMuaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUud2FybihgcmVtb3ZpbmcgcmVxdWVzdGVkIGV4ZWN1dGlvbiBwcm92aWRlciBcIiR7XG4gICAgICAgICAgICAgIG5hbWV9XCIgZnJvbSBzZXNzaW9uIG9wdGlvbnMgYmVjYXVzZSBpdCBpcyBub3QgYXZhaWxhYmxlOiAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWx0ZXJlZEVwcyA9IGVwcy5maWx0ZXIoaSA9PiBhdmFpbGFibGVCYWNrZW5kTmFtZXMuaGFzKHR5cGVvZiBpID09PSAnc3RyaW5nJyA/IGkgOiBpLm5hbWUpKTtcblxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgYmFja2VuZCwgbmV3IFByb3h5KG9wdGlvbnMsIHtcbiAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3ApID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnZXhlY3V0aW9uUHJvdmlkZXJzJykge1xuICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRFcHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdO1xuICAgIH07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7VHJhaW5pbmdTZXNzaW9ufSBmcm9tICcuL3RyYWluaW5nLXNlc3Npb24uanMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFNlc3Npb25IYW5kbGVyIHtcbiAgdHlwZSBGZWVkc1R5cGUgPSB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX07XG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGx9O1xuICB0eXBlIFJldHVyblR5cGUgPSB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX07XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBzaGFyZWQgU2Vzc2lvbkhhbmRsZXIgZnVuY3Rpb25hbGl0eVxuICpcbiAqIEBpZ25vcmVcbiAqL1xuaW50ZXJmYWNlIFNlc3Npb25IYW5kbGVyIHtcbiAgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIHJlYWRvbmx5IGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuICByZWFkb25seSBvdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgaGFuZGxlciBpbnN0YW5jZSBvZiBhbiBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgZXh0ZW5kcyBTZXNzaW9uSGFuZGxlciB7XG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQ7XG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIHJ1bihmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgaGFuZGxlciBpbnN0YW5jZSBvZiBhIHRyYWluaW5nIGluZmVyZW5jZSBzZXNzaW9uLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xuICByZWFkb25seSBldmFsSW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG4gIHJlYWRvbmx5IGV2YWxPdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgbGF6eVJlc2V0R3JhZCgpOiBQcm9taXNlPHZvaWQ+O1xuICBydW5UcmFpblN0ZXAoXG4gICAgICBmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG4gIHJ1bk9wdGltaXplclN0ZXAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbiAgcnVuRXZhbFN0ZXAoXG4gICAgICBmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG5cbiAgZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8bnVtYmVyPjtcbiAgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYnVmZmVyOiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPjtcbiAgZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8T25ueFZhbHVlPjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBiYWNrZW5kIHRoYXQgcHJvdmlkZXMgaW1wbGVtZW50YXRpb24gb2YgbW9kZWwgaW5mZXJlbmNpbmcuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tlbmQge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmFja2VuZCBhc3luY2hyb25vdXNseS4gU2hvdWxkIHRocm93IHdoZW4gZmFpbGVkLlxuICAgKi9cbiAgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcblxuICBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcih1cmlPckJ1ZmZlcjogc3RyaW5nfFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xuXG4gIGNyZWF0ZVRyYWluaW5nU2Vzc2lvbkhhbmRsZXI/XG4gICAgICAoY2hlY2twb2ludFN0YXRlVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlciwgdHJhaW5Nb2RlbFVyaU9yQnVmZmVyOiBUcmFpbmluZ1Nlc3Npb24uVXJpT3JCdWZmZXIsXG4gICAgICAgZXZhbE1vZGVsVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlciwgb3B0aW1pemVyTW9kZWxVcmlPckJ1ZmZlcjogVHJhaW5pbmdTZXNzaW9uLlVyaU9yQnVmZmVyLFxuICAgICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbkhhbmRsZXI+O1xufVxuXG5leHBvcnQge3JlZ2lzdGVyQmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IC9qcy9zY3JpcHRzL3VwZGF0ZS12ZXJzaW9uLnRzXG4vLyBEbyBub3QgbW9kaWZ5IGZpbGUgY29udGVudCBtYW51YWxseS5cblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMS4xOS4wLWRldi4yMDI0MDUzMS0zNTY5N2QyNDIxJztcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtFbnZ9IGZyb20gJy4vZW52LmpzJztcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAnLi92ZXJzaW9uLmpzJztcblxudHlwZSBMb2dMZXZlbFR5cGUgPSBFbnZbJ2xvZ0xldmVsJ107XG5cbmxldCBsb2dMZXZlbFZhbHVlOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+ID0gJ3dhcm5pbmcnO1xuXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSB7XG4gIHdhc206IHt9IGFzIEVudi5XZWJBc3NlbWJseUZsYWdzLFxuICB3ZWJnbDoge30gYXMgRW52LldlYkdMRmxhZ3MsXG4gIHdlYmdwdToge30gYXMgRW52LldlYkdwdUZsYWdzLFxuICB2ZXJzaW9uczoge2NvbW1vbjogdmVyc2lvbn0sXG5cbiAgc2V0IGxvZ0xldmVsKHZhbHVlOiBMb2dMZXZlbFR5cGUpIHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCBbJ3ZlcmJvc2UnLCAnaW5mbycsICd3YXJuaW5nJywgJ2Vycm9yJywgJ2ZhdGFsJ10uaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7dmFsdWV9YCk7XG4gICAgfVxuICAgIGxvZ0xldmVsVmFsdWUgPSB2YWx1ZTtcbiAgfSxcbiAgZ2V0IGxvZ0xldmVsKCk6IFJlcXVpcmVkPExvZ0xldmVsVHlwZT4ge1xuICAgIHJldHVybiBsb2dMZXZlbFZhbHVlO1xuICB9LFxufTtcblxuLy8gc2V0IHByb3BlcnR5ICdsb2dMZXZlbCcgc28gdGhhdCB0aGV5IGNhbiBiZSBjb3JyZWN0bHkgdHJhbnNmZXJyZWQgdG8gd29ya2VyIGJ5IGBwb3N0TWVzc2FnZSgpYC5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnYsICdsb2dMZXZlbCcsIHtlbnVtZXJhYmxlOiB0cnVlfSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7ZW52IGFzIGVudkltcGx9IGZyb20gJy4vZW52LWltcGwuanMnO1xuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgRW52IHtcbiAgZXhwb3J0IHR5cGUgV2FzbVBhdGhQcmVmaXggPSBzdHJpbmc7XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2FzbUZpbGVQYXRocyB7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgb3ZlcnJpZGUgcGF0aCBmb3IgdGhlIG1haW4gLndhc20gZmlsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKlxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAud2FzbSBmaWxlIGlzOlxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbWAgZm9yIGRlZmF1bHQgYnVpbGRcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbWAgZm9yIEpTRVAgYnVpbGQgKHdpdGggV2ViR1BVIGFuZCBXZWJOTilcbiAgICAgKiAtIGBvcnQtdHJhaW5pbmctd2FzbS1zaW1kLXRocmVhZGVkLndhc21gIGZvciB0cmFpbmluZyBidWlsZFxuICAgICAqL1xuICAgIHdhc20/OiBVUkx8c3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIG92ZXJyaWRlIHBhdGggZm9yIHRoZSBtYWluIC5tanMgZmlsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKlxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAubWpzIGZpbGUgaXM6XG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5tanNgIGZvciBkZWZhdWx0IGJ1aWxkXG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qc2AgZm9yIEpTRVAgYnVpbGQgKHdpdGggV2ViR1BVIGFuZCBXZWJOTilcbiAgICAgKiAtIGBvcnQtdHJhaW5pbmctd2FzbS1zaW1kLXRocmVhZGVkLm1qc2AgZm9yIHRyYWluaW5nIGJ1aWxkXG4gICAgICovXG4gICAgbWpzPzogVVJMfHN0cmluZztcbiAgfVxuICBleHBvcnQgdHlwZSBXYXNtUHJlZml4T3JGaWxlUGF0aHMgPSBXYXNtUGF0aFByZWZpeHxXYXNtRmlsZVBhdGhzO1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgbnVtYmVyIG9mIHRocmVhZChzKS4gSWYgb21pdHRlZCBvciBzZXQgdG8gMCwgbnVtYmVyIG9mIHRocmVhZChzKSB3aWxsIGJlIGRldGVybWluZWQgYnkgc3lzdGVtLiBJZiBzZXRcbiAgICAgKiB0byAxLCBubyB3b3JrZXIgdGhyZWFkIHdpbGwgYmUgc3Bhd25lZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IG11bHRpdGhyZWFkIGZlYXR1cmUgaXMgYXZhaWxhYmxlIGluIGN1cnJlbnQgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYDBgXG4gICAgICovXG4gICAgbnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgU0lNRC4gSWYgc2V0IHRvIGZhbHNlLCBTSU1EIHdpbGwgYmUgZm9yY2VseSBkaXNhYmxlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IFNJTUQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVGhpcyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLiBTaW5jZSBTSU1EIGlzIHN1cHBvcnRlZCBieSBhbGwgbWFqb3IgSmF2YVNjcmlwdCBlbmdpbmVzLCBub24tU0lNRFxuICAgICAqIGJ1aWxkIGlzIG5vIGxvbmdlciBwcm92aWRlZC4gVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHJlbGVhc2UuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdHJ1ZWBcbiAgICAgKi9cbiAgICBzaW1kPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYGVudi50cmFjZWAgaW5zdGVhZC4gSWYgYGVudi50cmFjZWAgaXMgc2V0LCB0aGlzIHByb3BlcnR5IHdpbGwgYmUgaWdub3JlZC5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICB0cmFjZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IGEgbnVtYmVyIHNwZWNpZnlpbmcgdGhlIHRpbWVvdXQgZm9yIGluaXRpYWxpemF0aW9uIG9mIFdlYkFzc2VtYmx5IGJhY2tlbmQsIGluIG1pbGxpc2Vjb25kcy4gQSB6ZXJvXG4gICAgICogdmFsdWUgaW5kaWNhdGVzIG5vIHRpbWVvdXQgaXMgc2V0LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgMGBcbiAgICAgKi9cbiAgICBpbml0VGltZW91dD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFNldCBhIGN1c3RvbSBVUkwgcHJlZml4IHRvIHRoZSAud2FzbS8ubWpzIGZpbGVzLCBvciBhbiBvYmplY3Qgb2Ygb3ZlcnJpZGVzIGZvciBib3RoIC53YXNtLy5tanMgZmlsZS4gVGhlIG92ZXJyaWRlXG4gICAgICogcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKi9cbiAgICB3YXNtUGF0aHM/OiBXYXNtUHJlZml4T3JGaWxlUGF0aHM7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gcHJveHkgdGhlIGV4ZWN1dGlvbiBvZiBtYWluIHRocmVhZCB0byBhIHdvcmtlciB0aHJlYWQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBwcm94eT86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdMRmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIFdlYkdMIENvbnRleHQgSUQgKHdlYmdsIG9yIHdlYmdsMikuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAnd2ViZ2wyJ2BcbiAgICAgKi9cbiAgICBjb250ZXh0SWQ/OiAnd2ViZ2wnfCd3ZWJnbDInO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgV2ViR0wgcmVuZGVyaW5nIGNvbnRleHQuXG4gICAgICovXG4gICAgcmVhZG9ubHkgY29udGV4dDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIG1heGltdW0gYmF0Y2ggc2l6ZSBmb3IgbWF0bXVsLiAwIG1lYW5zIHRvIGRpc2FibGUgYmF0Y2hpbmcuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIG1hdG11bE1heEJhdGNoU2l6ZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSB0ZXh0dXJlIGNhY2hlIG1vZGUuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAnZnVsbCdgXG4gICAgICovXG4gICAgdGV4dHVyZUNhY2hlTW9kZT86ICdpbml0aWFsaXplck9ubHknfCdmdWxsJztcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwYWNrZWQgdGV4dHVyZSBtb2RlXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBwYWNrPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHdoZXRoZXIgZW5hYmxlIGFzeW5jIGRvd25sb2FkLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICovXG4gICAgYXN5bmM/OiBib29sZWFuO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YSB7XG4gICAgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG4gICAgZGF0YVR5cGU6IHN0cmluZztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdVByb2ZpbGluZ0RhdGFWMSB7XG4gICAgdmVyc2lvbjogMTtcbiAgICBpbnB1dHNNZXRhZGF0YTogcmVhZG9ubHkgV2ViR3B1UHJvZmlsaW5nRGF0YVYxVGVuc29yTWV0YWRhdGFbXTtcbiAgICBvdXRwdXRzTWV0YWRhdGE6IHJlYWRvbmx5IFdlYkdwdVByb2ZpbGluZ0RhdGFWMVRlbnNvck1ldGFkYXRhW107XG4gICAga2VybmVsSWQ6IG51bWJlcjtcbiAgICBrZXJuZWxUeXBlOiBzdHJpbmc7XG4gICAga2VybmVsTmFtZTogc3RyaW5nO1xuICAgIHByb2dyYW1OYW1lOiBzdHJpbmc7XG4gICAgc3RhcnRUaW1lOiBudW1iZXI7XG4gICAgZW5kVGltZTogbnVtYmVyO1xuICB9XG5cbiAgZXhwb3J0IHR5cGUgV2ViR3B1UHJvZmlsaW5nRGF0YSA9IFdlYkdwdVByb2ZpbGluZ0RhdGFWMTtcblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUZsYWdzIHtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgbW9kZS5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBgZW52LndlYmdwdS5wcm9maWxpbmcubW9kZWAgaW5zdGVhZC4gSWYgYGVudi53ZWJncHUucHJvZmlsaW5nLm1vZGVgIGlzIHNldCwgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlXG4gICAgICogaWdub3JlZC5cbiAgICAgKi9cbiAgICBwcm9maWxpbmdNb2RlPzogJ29mZid8J2RlZmF1bHQnO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHByb2ZpbGluZyBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIHByb2ZpbGluZz86IHtcbiAgICAgIC8qKlxuICAgICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXG4gICAgICAgKlxuICAgICAgICogQGRlZmF1bHRWYWx1ZSBgJ29mZidgXG4gICAgICAgKi9cbiAgICAgIG1vZGU/OiAnb2ZmJ3wnZGVmYXVsdCc7XG5cbiAgICAgIC8qKlxuICAgICAgICogU2V0IG9yIGdldCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gYSBwcm9maWxpbmcgZGF0YSBpcyByZWNlaXZlZC4gSWYgbm90IHNldCwgdGhlIHByb2ZpbGluZyBkYXRhIHdpbGwgYmVcbiAgICAgICAqIHByaW50ZWQgdG8gY29uc29sZS5cbiAgICAgICAqL1xuICAgICAgb25kYXRhPzogKGRhdGE6IFdlYkdwdVByb2ZpbGluZ0RhdGEpID0+IHZvaWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwb3dlciBwcmVmZXJlbmNlLlxuICAgICAqXG4gICAgICogU2V0dGluZyB0aGlzIHByb3BlcnR5IG9ubHkgaGFzIGVmZmVjdCBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGUgdmFsdWUgd2lsbCBiZVxuICAgICAqIHVzZWQgYXMgb3B0aW9ucyBmb3IgYG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoKWAuXG4gICAgICpcbiAgICAgKiBTZWUge0BsaW5rIGh0dHBzOi8vZ3B1d2ViLmdpdGh1Yi5pby9ncHV3ZWIvI2RpY3RkZWYtZ3B1cmVxdWVzdGFkYXB0ZXJvcHRpb25zfSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdW5kZWZpbmVkYFxuICAgICAqL1xuICAgIHBvd2VyUHJlZmVyZW5jZT86ICdsb3ctcG93ZXInfCdoaWdoLXBlcmZvcm1hbmNlJztcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBmb3JjZSBmYWxsYmFjayBhZGFwdGVyIGZsYWcuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgb25seSBoYXMgZWZmZWN0IGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlXG4gICAgICogdXNlZCBhcyBvcHRpb25zIGZvciBgbmF2aWdhdG9yLmdwdS5yZXF1ZXN0QWRhcHRlcigpYC5cbiAgICAgKlxuICAgICAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9ncHV3ZWIuZ2l0aHViLmlvL2dwdXdlYi8jZGljdGRlZi1ncHVyZXF1ZXN0YWRhcHRlcm9wdGlvbnN9IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB1bmRlZmluZWRgXG4gICAgICovXG4gICAgZm9yY2VGYWxsYmFja0FkYXB0ZXI/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIGFkYXB0ZXIgZm9yIFdlYkdQVS5cbiAgICAgKlxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBvbmx5IGhhcyBlZmZlY3QgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmVcbiAgICAgKiB1c2VkIGFzIHRoZSBHUFUgYWRhcHRlciBmb3IgdGhlIHVuZGVybHlpbmcgV2ViR1BVIGJhY2tlbmQgdG8gY3JlYXRlIEdQVSBkZXZpY2UuXG4gICAgICpcbiAgICAgKiBJZiB0aGlzIHByb3BlcnR5IGlzIG5vdCBzZXQsIGl0IHdpbGwgYmUgYXZhaWxhYmxlIHRvIGdldCBhZnRlciB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZVxuICAgICAqIHZhbHVlIHdpbGwgYmUgdGhlIEdQVSBhZGFwdGVyIHRoYXQgY3JlYXRlZCBieSB0aGUgdW5kZXJseWluZyBXZWJHUFUgYmFja2VuZC5cbiAgICAgKlxuICAgICAqIFdoZW4gdXNlIHdpdGggVHlwZVNjcmlwdCwgdGhlIHR5cGUgb2YgdGhpcyBwcm9wZXJ0eSBpcyBgR1BVQWRhcHRlcmAgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cbiAgICAgKiBVc2UgYGNvbnN0IGFkYXB0ZXIgPSBlbnYud2ViZ3B1LmFkYXB0ZXIgYXMgR1BVQWRhcHRlcjtgIGluIFR5cGVTY3JpcHQgdG8gYWNjZXNzIHRoaXMgcHJvcGVydHkgd2l0aCBjb3JyZWN0IHR5cGUuXG4gICAgICpcbiAgICAgKiBzZWUgY29tbWVudHMgb24ge0BsaW5rIFRlbnNvci5HcHVCdWZmZXJUeXBlfVxuICAgICAqL1xuICAgIGFkYXB0ZXI6IHVua25vd247XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkZXZpY2UgZm9yIFdlYkdQVS5cbiAgICAgKlxuICAgICAqIFRoaXMgcHJvcGVydHkgaXMgb25seSBhdmFpbGFibGUgYWZ0ZXIgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLlxuICAgICAqXG4gICAgICogV2hlbiB1c2Ugd2l0aCBUeXBlU2NyaXB0LCB0aGUgdHlwZSBvZiB0aGlzIHByb3BlcnR5IGlzIGBHUFVEZXZpY2VgIGRlZmluZWQgaW4gXCJAd2ViZ3B1L3R5cGVzXCIuXG4gICAgICogVXNlIGBjb25zdCBkZXZpY2UgPSBlbnYud2ViZ3B1LmRldmljZSBhcyBHUFVEZXZpY2U7YCBpbiBUeXBlU2NyaXB0IHRvIGFjY2VzcyB0aGlzIHByb3BlcnR5IHdpdGggY29ycmVjdCB0eXBlLlxuICAgICAqXG4gICAgICogc2VlIGNvbW1lbnRzIG9uIHtAbGluayBUZW5zb3IuR3B1QnVmZmVyVHlwZX0gZm9yIG1vcmUgZGV0YWlscyBhYm91dCB3aHkgbm90IHVzZSB0eXBlcyBkZWZpbmVkIGluIFwiQHdlYmdwdS90eXBlc1wiLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGRldmljZTogdW5rbm93bjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHdoZXRoZXIgdmFsaWRhdGUgaW5wdXQgY29udGVudC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIHZhbGlkYXRlSW5wdXRDb250ZW50PzogYm9vbGVhbjtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudiB7XG4gIC8qKlxuICAgKiBzZXQgdGhlIHNldmVyaXR5IGxldmVsIGZvciBsb2dnaW5nLlxuICAgKlxuICAgKiBAZGVmYXVsdFZhbHVlIGAnd2FybmluZydgXG4gICAqL1xuICBsb2dMZXZlbD86ICd2ZXJib3NlJ3wnaW5mbyd8J3dhcm5pbmcnfCdlcnJvcid8J2ZhdGFsJztcblxuICAvKipcbiAgICogSW5kaWNhdGUgd2hldGhlciBydW4gaW4gZGVidWcgbW9kZS5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAqL1xuICBkZWJ1Zz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXG4gICAqXG4gICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgKi9cbiAgdHJhY2U/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBHZXQgdmVyc2lvbiBvZiB0aGUgY3VycmVudCBwYWNrYWdlLlxuICAgKi9cbiAgcmVhZG9ubHkgdmVyc2lvbnM6IHtcbiAgICByZWFkb25seSBjb21tb246IHN0cmluZztcbiAgICByZWFkb25seSB3ZWI/OiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgbm9kZT86IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgcmVhZG9ubHkgJ3JlYWN0LW5hdGl2ZSc/OiBzdHJpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViQXNzZW1ibHlcbiAgICovXG4gIHJlYWRvbmx5IHdhc206IEVudi5XZWJBc3NlbWJseUZsYWdzO1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkdMXG4gICAqL1xuICByZWFkb25seSB3ZWJnbDogRW52LldlYkdMRmxhZ3M7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViR1BVXG4gICAqL1xuICByZWFkb25seSB3ZWJncHU6IEVudi5XZWJHcHVGbGFncztcblxuICBbbmFtZTogc3RyaW5nXTogdW5rbm93bjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgYXMgYSBnbG9iYWwgc2luZ2xldG9uLlxuICovXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSBlbnZJbXBsO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge1RlbnNvclRvRGF0YVVybE9wdGlvbnMsIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9uc30gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi5qcyc7XG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci50b0RhdGFVUkwoKVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVG9EYXRhVVJMID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9EYXRhVXJsT3B0aW9ucyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSA6IChuZXcgT2Zmc2NyZWVuQ2FudmFzKDEsIDEpKTtcbiAgY2FudmFzLndpZHRoID0gdGVuc29yLmRpbXNbM107XG4gIGNhbnZhcy5oZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID1cbiAgICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIChDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsKTtcblxuICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCAmIGZvcm1hdFxuICAgIGxldCB3aWR0aDogbnVtYmVyO1xuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICBpZiAob3B0aW9ucz8udGVuc29yTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzNdO1xuICAgIH0gZWxzZSB7ICAvLyBEZWZhdWx0IGxheW91dCBpcyBOQ1dIXG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzNdO1xuICAgICAgaGVpZ2h0ID0gdGVuc29yLmRpbXNbMl07XG4gICAgfVxuXG4gICAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zPy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQic7XG5cbiAgICBjb25zdCBub3JtID0gb3B0aW9ucz8ubm9ybTtcbiAgICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLm1lYW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybU1lYW4gPSBbMjU1LCAyNTUsIDI1NSwgMjU1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiAobm9ybS5tZWFuKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhblswXSwgbm9ybS5tZWFuWzFdLCBub3JtLm1lYW5bMl0sIDBdO1xuICAgICAgICBpZiAobm9ybS5tZWFuWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtTWVhblszXSA9IG5vcm0ubWVhblszXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0uYmlhcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBub3JtQmlhcyA9IFswLCAwLCAwLCAwXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiAobm9ybS5iaWFzKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xuICAgICAgICBpZiAobm9ybS5iaWFzWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtQmlhc1szXSA9IG5vcm0uYmlhc1szXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0cmlkZSA9IGhlaWdodCAqIHdpZHRoO1xuICAgIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICAgIGxldCByVGVuc29yUG9pbnRlciA9IDAsIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlLCBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDIsIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XG4gICAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IFIgPSAoKHRlbnNvci5kYXRhW3JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1swXSkgKiBub3JtTWVhblswXTsgIC8vIFIgdmFsdWVcbiAgICAgICAgY29uc3QgRyA9ICgodGVuc29yLmRhdGFbZ1RlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzFdKSAqIG5vcm1NZWFuWzFdOyAgLy8gRyB2YWx1ZVxuICAgICAgICBjb25zdCBCID0gKCh0ZW5zb3IuZGF0YVtiVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMl0pICogbm9ybU1lYW5bMl07ICAvLyBCIHZhbHVlXG4gICAgICAgIGNvbnN0IEEgPSBhVGVuc29yUG9pbnRlciA9PT0gLTEgP1xuICAgICAgICAgICAgMjU1IDpcbiAgICAgICAgICAgICgodGVuc29yLmRhdGFbYVRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzNdKSAqIG5vcm1NZWFuWzNdOyAgLy8gQSB2YWx1ZVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3Jlc3RyaWN0LXBsdXMtb3BlcmFuZHNcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKCcgKyBSICsgJywnICsgRyArICcsJyArIEIgKyAnLCcgKyBBICsgJyknO1xuICAgICAgICBwaXhlbHMyRENvbnRleHQuZmlsbFJlY3QoaiwgaSwgMSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgndG9EYXRhVVJMJyBpbiBjYW52YXMpIHtcbiAgICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndG9EYXRhVVJMIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvSW1hZ2VEYXRhKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclRvSW1hZ2VEYXRhID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhID0+IHtcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/XG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpIDpcbiAgICAgIG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSkuZ2V0Q29udGV4dCgnMmQnKSBhcyBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIGxldCBpbWFnZTogSW1hZ2VEYXRhO1xuICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCAmIGZvcm1hdFxuICAgIGxldCB3aWR0aDogbnVtYmVyO1xuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICBsZXQgY2hhbm5lbHM6IG51bWJlcjtcbiAgICBpZiAob3B0aW9ucz8udGVuc29yTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzFdO1xuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1szXTtcbiAgICB9IGVsc2UgeyAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1sxXTtcbiAgICB9XG4gICAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zICE9PSB1bmRlZmluZWQgPyAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQicpIDogJ1JHQic7XG5cbiAgICBjb25zdCBub3JtID0gb3B0aW9ucz8ubm9ybTtcbiAgICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLm1lYW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybU1lYW4gPSBbMjU1LCAyNTUsIDI1NSwgMjU1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiAobm9ybS5tZWFuKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhblswXSwgbm9ybS5tZWFuWzFdLCBub3JtLm1lYW5bMl0sIDI1NV07XG4gICAgICAgIGlmIChub3JtLm1lYW5bM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1NZWFuWzNdID0gbm9ybS5tZWFuWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1CaWFzID0gWzAsIDAsIDAsIDBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIChub3JtLmJpYXMpID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1CaWFzWzNdID0gbm9ybS5iaWFzWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgJiYgKGNoYW5uZWxzID09PSA0ICYmIG9wdGlvbnMuZm9ybWF0ICE9PSAnUkdCQScpIHx8XG4gICAgICAgICAgKGNoYW5uZWxzID09PSAzICYmIChvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQicgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdCR1InKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgZm9ybWF0IGRvZXNuXFwndCBtYXRjaCBpbnB1dCB0ZW5zb3IgZGltcycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICAgIGNvbnN0IHN0ZXAgPSA0O1xuICAgIGxldCBySW1hZ2VQb2ludGVyID0gMCwgZ0ltYWdlUG9pbnRlciA9IDEsIGJJbWFnZVBvaW50ZXIgPSAyLCBhSW1hZ2VQb2ludGVyID0gMztcbiAgICBsZXQgclRlbnNvclBvaW50ZXIgPSAwLCBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSwgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLCBhVGVuc29yUG9pbnRlciA9IC0xO1xuXG4gICAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICAgIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQkEnKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfSBlbHNlIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JCRycpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgIH1cblxuICAgIGltYWdlID0gcGl4ZWxzMkRDb250ZXh0LmNyZWF0ZUltYWdlRGF0YSh3aWR0aCwgaGVpZ2h0KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVpZ2h0ICogd2lkdGg7XG4gICAgICAgICBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGdJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYkltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGkrKykge1xuICAgICAgaW1hZ2UuZGF0YVtySW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbclRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzBdKSAqIG5vcm1NZWFuWzBdOyAgLy8gUiB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtnSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbZ1RlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzFdKSAqIG5vcm1NZWFuWzFdOyAgLy8gRyB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtiSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAgLy8gQiB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVthSW1hZ2VQb2ludGVyXSA9IGFUZW5zb3JQb2ludGVyID09PSAtMSA/XG4gICAgICAgICAgMjU1IDpcbiAgICAgICAgICAoKHRlbnNvci5kYXRhW2FUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1szXSkgKiBub3JtTWVhblszXTsgIC8vIEEgdmFsdWVcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgfVxuICByZXR1cm4gaW1hZ2U7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge09wdGlvbnNEaW1lbnNpb25zLCBPcHRpb25zRm9ybWF0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMsIE9wdGlvbnNUZW5zb3JGb3JtYXQsIE9wdGlvbnNUZW5zb3JMYXlvdXQsIFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9ucywgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMsIFRlbnNvckZyb21UZXh0dXJlT3B0aW9ucywgVGVuc29yRnJvbVVybE9wdGlvbnN9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLWltcGwuanMnO1xuaW1wb3J0IHtUZW5zb3IgYXMgVGVuc29ySW50ZXJmYWNlfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmludGVyZmFjZSBCdWZmZXJUb1RlbnNvck9wdGlvbnMgZXh0ZW5kcyBPcHRpb25zRGltZW5zaW9ucywgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNUZW5zb3JGb3JtYXQge31cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIGltYWdlIG9iamVjdFxuICpcbiAqIEBwYXJhbSBidWZmZXIgLSBFeHRyYWN0ZWQgaW1hZ2UgYnVmZmVyIGRhdGEgLSBhc3N1bWluZyBSR0JBIGZvcm1hdFxuICogQHBhcmFtIGltYWdlRm9ybWF0IC0gaW5wdXQgaW1hZ2UgY29uZmlndXJhdGlvbiAtIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb25zIGhlaWdodCwgd2lkdGgsIGZvcm1hdFxuICogQHBhcmFtIHRlbnNvckZvcm1hdCAtIG91dHB1dCB0ZW5zb3IgY29uZmlndXJhdGlvbiAtIERlZmF1bHQgaXMgUkdCIGZvcm1hdFxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9UZW5zb3IgPSAoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheXx1bmRlZmluZWQsIG9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyk6IFRlbnNvciA9PiB7XG4gIGlmIChidWZmZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgYnVmZmVyIG11c3QgYmUgZGVmaW5lZCcpO1xuICB9XG4gIGlmIChvcHRpb25zLmhlaWdodCA9PT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMud2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgaGVpZ2h0IGFuZCB3aWR0aCBtdXN0IGJlIGRlZmluZWQnKTtcbiAgfVxuICBpZiAob3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xuICAgIHRocm93IG5ldyBFcnJvcignTkhXQyBUZW5zb3IgbGF5b3V0IGlzIG5vdCBzdXBwb3J0ZWQgeWV0Jyk7XG4gIH1cblxuICBjb25zdCB7aGVpZ2h0LCB3aWR0aH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IG5vcm0gPSBvcHRpb25zLm5vcm0gPz8ge21lYW46IDI1NSwgYmlhczogMH07XG4gIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbiAgaWYgKHR5cGVvZiAobm9ybS5tZWFuKSA9PT0gJ251bWJlcicpIHtcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICB9IGVsc2Uge1xuICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiFbMF0sIG5vcm0ubWVhbiFbMV0sIG5vcm0ubWVhbiFbMl0sIG5vcm0ubWVhbiFbM10gPz8gMjU1XTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgKG5vcm0uYmlhcykgPT09ICdudW1iZXInKSB7XG4gICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcbiAgfSBlbHNlIHtcbiAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMhWzBdLCBub3JtLmJpYXMhWzFdLCBub3JtLmJpYXMhWzJdLCBub3JtLmJpYXMhWzNdID8/IDBdO1xuICB9XG5cbiAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5mb3JtYXQgOiAnUkdCQSc7XG4gIC8vIGRlZmF1bHQgdmFsdWUgaXMgUkdCQSBzaW5jZSBpbWFnZWRhdGEgYW5kIEhUTUxJbWFnZUVsZW1lbnQgdXNlcyBpdFxuXG4gIGNvbnN0IG91dHB1dGZvcm1hdCA9XG4gICAgICBvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRlbnNvckZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgY29uc3QgZmxvYXQzMkRhdGEgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBGbG9hdDMyQXJyYXkoc3RyaWRlICogNCkgOiBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDMpO1xuXG4gIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICBsZXQgc3RlcCA9IDQsIHJJbWFnZVBvaW50ZXIgPSAwLCBnSW1hZ2VQb2ludGVyID0gMSwgYkltYWdlUG9pbnRlciA9IDIsIGFJbWFnZVBvaW50ZXIgPSAzO1xuICBsZXQgclRlbnNvclBvaW50ZXIgPSAwLCBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSwgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLCBhVGVuc29yUG9pbnRlciA9IC0xO1xuXG4gIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBpbnB1dCBpbWFnZSBmb3JtYXRcbiAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xuICAgIHN0ZXAgPSAzO1xuICAgIHJJbWFnZVBvaW50ZXIgPSAwO1xuICAgIGdJbWFnZVBvaW50ZXIgPSAxO1xuICAgIGJJbWFnZVBvaW50ZXIgPSAyO1xuICAgIGFJbWFnZVBvaW50ZXIgPSAtMTtcbiAgfVxuXG4gIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBvdXRwdXQgdGVuc29yIGZvcm1hdFxuICBpZiAob3V0cHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XG4gIH0gZWxzZSBpZiAob3V0cHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gIH0gZWxzZSBpZiAob3V0cHV0Zm9ybWF0ID09PSAnQkdSJykge1xuICAgIGJUZW5zb3JQb2ludGVyID0gMDtcbiAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICByVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmlkZTtcbiAgICAgICBpKyssIHJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYkltYWdlUG9pbnRlciArPSBzdGVwLCBnSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGFJbWFnZVBvaW50ZXIgKz0gc3RlcCkge1xuICAgIGZsb2F0MzJEYXRhW3JUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltySW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzBdKSAvIG5vcm1NZWFuWzBdO1xuICAgIGZsb2F0MzJEYXRhW2dUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltnSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzFdKSAvIG5vcm1NZWFuWzFdO1xuICAgIGZsb2F0MzJEYXRhW2JUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltiSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzJdKSAvIG5vcm1NZWFuWzJdO1xuICAgIGlmIChhVGVuc29yUG9pbnRlciAhPT0gLTEgJiYgYUltYWdlUG9pbnRlciAhPT0gLTEpIHtcbiAgICAgIGZsb2F0MzJEYXRhW2FUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlclthSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzNdKSAvIG5vcm1NZWFuWzNdO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZsb2F0MzJBcnJheSAtPiBvcnQuVGVuc29yXG4gIGNvbnN0IG91dHB1dFRlbnNvciA9IG91dHB1dGZvcm1hdCA9PT0gJ1JHQkEnID8gbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgNCwgaGVpZ2h0LCB3aWR0aF0pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVGVuc29yKCdmbG9hdDMyJywgZmxvYXQzMkRhdGEsIFsxLCAzLCBoZWlnaHQsIHdpZHRoXSk7XG4gIHJldHVybiBvdXRwdXRUZW5zb3I7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tSW1hZ2UoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21JbWFnZSA9IGFzeW5jKFxuICAgIGltYWdlOiBJbWFnZURhdGF8SFRNTEltYWdlRWxlbWVudHxJbWFnZUJpdG1hcHxzdHJpbmcsXG4gICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zfFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zfFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnN8XG4gICAgVGVuc29yRnJvbVVybE9wdGlvbnMpOiBQcm9taXNlPFRlbnNvcj4gPT4ge1xuICAvLyBjaGVja2luZyB0aGUgdHlwZSBvZiBpbWFnZSBvYmplY3RcbiAgY29uc3QgaXNIVE1MSW1hZ2VFbGUgPSB0eXBlb2YgKEhUTUxJbWFnZUVsZW1lbnQpICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGNvbnN0IGlzSW1hZ2VEYXRhRWxlID0gdHlwZW9mIChJbWFnZURhdGEpICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEltYWdlRGF0YTtcbiAgY29uc3QgaXNJbWFnZUJpdG1hcCA9IHR5cGVvZiAoSW1hZ2VCaXRtYXApICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEltYWdlQml0bWFwO1xuICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiBpbWFnZSA9PT0gJ3N0cmluZyc7XG5cbiAgbGV0IGRhdGE6IFVpbnQ4Q2xhbXBlZEFycmF5fHVuZGVmaW5lZDtcbiAgbGV0IGJ1ZmZlclRvVGVuc29yT3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucyA/PyB7fTtcblxuICBjb25zdCBjcmVhdGVDYW52YXMgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBPZmZzY3JlZW5DYW52YXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gbmV3IE9mZnNjcmVlbkNhbnZhcygxLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW52YXMgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgY3JlYXRlQ2FudmFzQ29udGV4dCA9IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50fE9mZnNjcmVlbkNhbnZhcykgPT4ge1xuICAgIGlmIChjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgcmV0dXJuIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH0gZWxzZSBpZiAoY2FudmFzIGluc3RhbmNlb2YgT2Zmc2NyZWVuQ2FudmFzKSB7XG4gICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgT2Zmc2NyZWVuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG4gIC8vIGZpbGxpbmcgYW5kIGNoZWNraW5nIGltYWdlIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICBpZiAoaXNIVE1MSW1hZ2VFbGUpIHtcbiAgICAvLyBIVE1MSW1hZ2VFbGVtZW50IC0gaW1hZ2Ugb2JqZWN0IC0gZm9ybWF0IGlzIFJHQkEgYnkgZGVmYXVsdFxuICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xuICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXMpO1xuXG4gICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZEhlaWdodCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZFdpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVkSGVpZ2h0O1xuICAgICAgICB3aWR0aCA9IG9wdGlvbnMucmVzaXplZFdpZHRoO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIGlmIChvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBpbnB1dCBjb25maWcgZm9ybWF0IG11c3QgYmUgUkdCQSBmb3IgSFRNTEltYWdlRWxlbWVudCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy50ZW5zb3JGb3JtYXQgPSAnUkdCQSc7XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMudGVuc29yRm9ybWF0ID0gJ1JHQkEnO1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIH1cblxuICAgICAgcGl4ZWxzMkRDb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XG4gICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNJbWFnZURhdGFFbGUpIHtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZFdpZHRoICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkSGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGhlaWdodCA9IG9wdGlvbnMucmVzaXplZEhlaWdodDtcbiAgICAgIHdpZHRoID0gb3B0aW9ucy5yZXNpemVkV2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgIHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmZvcm1hdCA9ICdSR0JBJztcbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgdGVtcENhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xuXG4gICAgICB0ZW1wQ2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dCh0ZW1wQ2FudmFzKTtcblxuICAgICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5wdXRJbWFnZURhdGEoaW1hZ2UsIDAsIDApO1xuICAgICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBpbWFnZS5kYXRhO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ltYWdlQml0bWFwKSB7XG4gICAgLy8gSW1hZ2VCaXRtYXAgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgbXVzdCBiZSBwcm92aWRlZCBieSB1c2VyXG4gICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBpbWFnZSBjb25maWcgd2l0aCBmb3JtYXQgZm9yIEltYWdlYml0bWFwJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyk7XG5cbiAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgIGNvbnN0IHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICBwaXhlbHMyRENvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG4gICAgICByZXR1cm4gYnVmZmVyVG9UZW5zb3IoZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzU3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xuICAgICAgY29uc3QgY29udGV4dCA9IGNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzKTtcbiAgICAgIGlmICghaW1hZ2UgfHwgIWNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIG5ld0ltYWdlLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XG4gICAgICBuZXdJbWFnZS5zcmMgPSBpbWFnZTtcbiAgICAgIG5ld0ltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY2FudmFzLndpZHRoID0gbmV3SW1hZ2Uud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBuZXdJbWFnZS5oZWlnaHQ7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKG5ld0ltYWdlLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjb25zdCBpbWcgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIHJlc29sdmUoYnVmZmVyVG9UZW5zb3IoaW1nLmRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGRhdGEgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZCAtIGFib3J0ZWQgdGVuc29yIGNyZWF0aW9uJyk7XG4gIH1cblxuICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGJ1ZmZlclRvVGVuc29yKGRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBkYXRhIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWQgLSBhYm9ydGVkIHRlbnNvciBjcmVhdGlvbicpO1xuICB9XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tVGV4dHVyZSgpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbVRleHR1cmUgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5UZXh0dXJlRGF0YVR5cGVzPihcbiAgICB0ZXh0dXJlOiBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGUsIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBkb3dubG9hZCwgZGlzcG9zZX0gPSBvcHRpb25zO1xuICAvLyBBbHdheXMgYXNzdW1lIFJHQkFGMzIuIFRPRE86IHN1cHBvcnQgZGlmZmVyZW50IHRleHR1cmUgZm9ybWF0XG4gIGNvbnN0IGRpbXMgPSBbMSwgaGVpZ2h0LCB3aWR0aCwgNF07XG4gIHJldHVybiBuZXcgVGVuc29yKHtsb2NhdGlvbjogJ3RleHR1cmUnLCB0eXBlOiAnZmxvYXQzMicsIHRleHR1cmUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlfSk7XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tR3B1QnVmZmVyKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tR3B1QnVmZmVyID0gPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyRGF0YVR5cGVzPihcbiAgICBncHVCdWZmZXI6IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlLCBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHtkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2V9ID0gb3B0aW9ucztcbiAgcmV0dXJuIG5ldyBUZW5zb3Ioe2xvY2F0aW9uOiAnZ3B1LWJ1ZmZlcicsIHR5cGU6IGRhdGFUeXBlID8/ICdmbG9hdDMyJywgZ3B1QnVmZmVyLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZX0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbVBpbm5lZEJ1ZmZlcigpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbVBpbm5lZEJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkNwdVBpbm5lZERhdGFUeXBlcz4oXG4gICAgdHlwZTogVCwgYnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuRGF0YVR5cGVNYXBbVF0sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvciA9PlxuICAgIG5ldyBUZW5zb3Ioe2xvY2F0aW9uOiAnY3B1LXBpbm5lZCcsIHR5cGUsIGRhdGE6IGJ1ZmZlciwgZGltczogZGltcyA/PyBbYnVmZmVyLmxlbmd0aF19KTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLmpzJztcblxuZXhwb3J0IHR5cGUgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyA9IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yfFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxJbnQ4QXJyYXlDb25zdHJ1Y3RvcnxcbiAgICBVaW50MTZBcnJheUNvbnN0cnVjdG9yfEludDE2QXJyYXlDb25zdHJ1Y3RvcnxJbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxcbiAgICBGbG9hdDY0QXJyYXlDb25zdHJ1Y3RvcnxVaW50MzJBcnJheUNvbnN0cnVjdG9yfEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3I7XG5leHBvcnQgdHlwZSBTdXBwb3J0ZWRUeXBlZEFycmF5ID0gSW5zdGFuY2VUeXBlPFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnM+O1xuXG4vLyBhIHJ1bnRpbWUgbWFwIHRoYXQgbWFwcyB0eXBlIHN0cmluZyB0byBUeXBlZEFycmF5IGNvbnN0cnVjdG9yLiBTaG91bGQgbWF0Y2ggVGVuc29yLkRhdGFUeXBlTWFwLlxuZXhwb3J0IGNvbnN0IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgPSBuZXcgTWFwPHN0cmluZywgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz4oW1xuICBbJ2Zsb2F0MzInLCBGbG9hdDMyQXJyYXldLFxuICBbJ3VpbnQ4JywgVWludDhBcnJheV0sXG4gIFsnaW50OCcsIEludDhBcnJheV0sXG4gIFsndWludDE2JywgVWludDE2QXJyYXldLFxuICBbJ2ludDE2JywgSW50MTZBcnJheV0sXG4gIFsnaW50MzInLCBJbnQzMkFycmF5XSxcbiAgWydib29sJywgVWludDhBcnJheV0sXG4gIFsnZmxvYXQ2NCcsIEZsb2F0NjRBcnJheV0sXG4gIFsndWludDMyJywgVWludDMyQXJyYXldLFxuXSk7XG5cbi8vIGEgcnVudGltZSBtYXAgdGhhdCBtYXBzIHR5cGUgc3RyaW5nIHRvIFR5cGVkQXJyYXkgY29uc3RydWN0b3IuIFNob3VsZCBtYXRjaCBUZW5zb3IuRGF0YVR5cGVNYXAuXG5leHBvcnQgY29uc3QgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCA9IG5ldyBNYXA8U3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycywgVGVuc29yLlR5cGU+KFtcbiAgW0Zsb2F0MzJBcnJheSwgJ2Zsb2F0MzInXSxcbiAgW1VpbnQ4QXJyYXksICd1aW50OCddLFxuICBbSW50OEFycmF5LCAnaW50OCddLFxuICBbVWludDE2QXJyYXksICd1aW50MTYnXSxcbiAgW0ludDE2QXJyYXksICdpbnQxNiddLFxuICBbSW50MzJBcnJheSwgJ2ludDMyJ10sXG4gIFtGbG9hdDY0QXJyYXksICdmbG9hdDY0J10sXG4gIFtVaW50MzJBcnJheSwgJ3VpbnQzMiddLFxuXSk7XG5cbi8vIGEgZHVtbXkgdHlwZSBkZWNsYXJhdGlvbiBmb3IgRmxvYXQxNkFycmF5IGluIGNhc2UgYW55IHBvbHlmaWxsIGlzIGF2YWlsYWJsZS5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiwgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBjb25zdCBGbG9hdDE2QXJyYXk6IGFueTtcbn1cblxuLy8gdGhlIGZvbGxvd2luZyBjb2RlIGFsbG93cyBkZWxheWluZyBleGVjdXRpb24gb2YgQmlnSW50L0Zsb2F0MTZBcnJheSBjaGVja2luZy4gVGhpcyBhbGxvd3MgbGF6eSBpbml0aWFsaXphdGlvbiBmb3Jcbi8vIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgYW5kIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIHdoaWNoIGFsbG93cyBCaWdJbnQvRmxvYXQxNkFycmF5XG4vLyBwb2x5ZmlsbCBpZiBhdmFpbGFibGUuXG5sZXQgaXNUeXBlZEFycmF5Q2hlY2tlZCA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IGNoZWNrVHlwZWRBcnJheSA9ICgpID0+IHtcbiAgaWYgKCFpc1R5cGVkQXJyYXlDaGVja2VkKSB7XG4gICAgaXNUeXBlZEFycmF5Q2hlY2tlZCA9IHRydWU7XG4gICAgY29uc3QgaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ0ludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEJpZ0ludDY0QXJyYXkuZnJvbTtcbiAgICBjb25zdCBpc0JpZ1VpbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ1VpbnQ2NEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBCaWdVaW50NjRBcnJheS5mcm9tO1xuICAgIGNvbnN0IGlzRmxvYXQxNkFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEZsb2F0MTZBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgRmxvYXQxNkFycmF5LmZyb207XG5cbiAgICBpZiAoaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlKSB7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnaW50NjQnLCBCaWdJbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ0ludDY0QXJyYXksICdpbnQ2NCcpO1xuICAgIH1cbiAgICBpZiAoaXNCaWdVaW50NjRBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ3VpbnQ2NCcsIEJpZ1VpbnQ2NEFycmF5KTtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ1VpbnQ2NEFycmF5LCAndWludDY0Jyk7XG4gICAgfVxuICAgIGlmIChpc0Zsb2F0MTZBcnJheUF2YWlsYWJsZSkge1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ2Zsb2F0MTYnLCBGbG9hdDE2QXJyYXkpO1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoRmxvYXQxNkFycmF5LCAnZmxvYXQxNicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBGbG9hdDE2QXJyYXkgaXMgbm90IGF2YWlsYWJsZSwgdXNlICdVaW50MTZBcnJheScgdG8gc3RvcmUgdGhlIGRhdGEuXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnZmxvYXQxNicsIFVpbnQxNkFycmF5KTtcbiAgICB9XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7Q3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzLCBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnN9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLWltcGwuanMnO1xuXG4vKipcbiAqIGNhbGN1bGF0ZSBzaXplIGZyb20gZGltcy5cbiAqXG4gKiBAcGFyYW0gZGltcyB0aGUgZGltcyBhcnJheS4gTWF5IGJlIGFuIGlsbGVnYWwgaW5wdXQuXG4gKi9cbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVTaXplID0gKGRpbXM6IHJlYWRvbmx5IHVua25vd25bXSk6IG51bWJlciA9PiB7XG4gIGxldCBzaXplID0gMTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZGltID0gZGltc1tpXTtcbiAgICBpZiAodHlwZW9mIGRpbSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc1NhZmVJbnRlZ2VyKGRpbSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGRpbXNbJHtpfV0gbXVzdCBiZSBhbiBpbnRlZ2VyLCBnb3Q6ICR7ZGltfWApO1xuICAgIH1cbiAgICBpZiAoZGltIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYGRpbXNbJHtpfV0gbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyLCBnb3Q6ICR7ZGltfWApO1xuICAgIH1cbiAgICBzaXplICo9IGRpbTtcbiAgfVxuICByZXR1cm4gc2l6ZTtcbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnJlc2hhcGUoKVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yUmVzaGFwZSA9ICh0ZW5zb3I6IFRlbnNvciwgZGltczogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3IgPT4ge1xuICBzd2l0Y2ggKHRlbnNvci5sb2NhdGlvbikge1xuICAgIGNhc2UgJ2NwdSc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih0ZW5zb3IudHlwZSwgdGVuc29yLmRhdGEsIGRpbXMpO1xuICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3Ioe1xuICAgICAgICBsb2NhdGlvbjogJ2NwdS1waW5uZWQnLFxuICAgICAgICBkYXRhOiB0ZW5zb3IuZGF0YSBhcyBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ2RhdGEnXSxcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXG4gICAgICAgIGRpbXMsXG4gICAgICB9KTtcbiAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICd0ZXh0dXJlJyxcbiAgICAgICAgdGV4dHVyZTogdGVuc29yLnRleHR1cmUsXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3Ioe1xuICAgICAgICBsb2NhdGlvbjogJ2dwdS1idWZmZXInLFxuICAgICAgICBncHVCdWZmZXI6IHRlbnNvci5ncHVCdWZmZXIsXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdGVuc29yUmVzaGFwZTogdGVuc29yIGxvY2F0aW9uICR7dGVuc29yLmxvY2F0aW9ufSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7dGVuc29yVG9EYXRhVVJMLCB0ZW5zb3JUb0ltYWdlRGF0YX0gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi1pbXBsLmpzJztcbmltcG9ydCB7VGVuc29yVG9EYXRhVXJsT3B0aW9ucywgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcbmltcG9ydCB7dGVuc29yRnJvbUdwdUJ1ZmZlciwgdGVuc29yRnJvbUltYWdlLCB0ZW5zb3JGcm9tUGlubmVkQnVmZmVyLCB0ZW5zb3JGcm9tVGV4dHVyZX0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS1pbXBsLmpzJztcbmltcG9ydCB7Q3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzLCBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsIFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9ucywgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMsIFRlbnNvckZyb21UZXh0dXJlT3B0aW9ucywgVGVuc29yRnJvbVVybE9wdGlvbnMsIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnN9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHtjaGVja1R5cGVkQXJyYXksIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAsIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIFN1cHBvcnRlZFR5cGVkQXJyYXksIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnN9IGZyb20gJy4vdGVuc29yLWltcGwtdHlwZS1tYXBwaW5nLmpzJztcbmltcG9ydCB7Y2FsY3VsYXRlU2l6ZSwgdGVuc29yUmVzaGFwZX0gZnJvbSAnLi90ZW5zb3ItdXRpbHMtaW1wbC5qcyc7XG5pbXBvcnQge1RlbnNvciBhcyBUZW5zb3JJbnRlcmZhY2V9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLy8gdHlwZSBhbGlhc2VzIGZvciB0aG9zZSBleHBvcnRlZCBmcm9tIFRlbnNvciBpbnRlcmZhY2VcblxudHlwZSBUZW5zb3JUeXBlID0gVGVuc29ySW50ZXJmYWNlLlR5cGU7XG50eXBlIFRlbnNvckRhdGFUeXBlID0gVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlO1xudHlwZSBUZW5zb3JEYXRhTG9jYXRpb24gPSBUZW5zb3JJbnRlcmZhY2UuRGF0YUxvY2F0aW9uO1xudHlwZSBUZW5zb3JUZXh0dXJlVHlwZSA9IFRlbnNvckludGVyZmFjZS5UZXh0dXJlVHlwZTtcbnR5cGUgVGVuc29yR3B1QnVmZmVyVHlwZSA9IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlO1xuXG4vKipcbiAqIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IgaW50ZXJmYWNlLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNsYXNzIFRlbnNvciBpbXBsZW1lbnRzIFRlbnNvckludGVyZmFjZSB7XG4gIC8vICNyZWdpb24gY29uc3RydWN0b3JzXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICB0eXBlOiBUZW5zb3JUeXBlLCBkYXRhOiBUZW5zb3JEYXRhVHlwZXxyZWFkb25seSBzdHJpbmdbXXxyZWFkb25seSBudW1iZXJbXXxyZWFkb25seSBib29sZWFuW10sXG4gICAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IENQVSB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuIFR5cGUgaXMgaW5mZXJyZWQgZnJvbSBkYXRhLlxuICAgKi9cbiAgY29uc3RydWN0b3IoZGF0YTogVGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYm9vbGVhbltdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgcGlubmVkIENQVSBkYXRhIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdjcHUtcGlubmVkJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJHTCB0ZXh0dXJlIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICd0ZXh0dXJlJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgV2ViR1BVIGJ1ZmZlciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxuICAgKlxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnZ3B1LWJ1ZmZlcicuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgYXJnMDogVGVuc29yVHlwZXxUZW5zb3JEYXRhVHlwZXxyZWFkb25seSBzdHJpbmdbXXxyZWFkb25seSBib29sZWFuW118Q3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzfFxuICAgICAgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc3xHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gICAgICBhcmcxPzogVGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYm9vbGVhbltdLCBhcmcyPzogcmVhZG9ubHkgbnVtYmVyW10pIHtcbiAgICAvLyBwZXJmb3JtIG9uZS10aW1lIGNoZWNrIGZvciBCaWdJbnQvRmxvYXQxNkFycmF5IHN1cHBvcnRcbiAgICBjaGVja1R5cGVkQXJyYXkoKTtcblxuICAgIGxldCB0eXBlOiBUZW5zb3JUeXBlO1xuICAgIGxldCBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcblxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ29iamVjdCcgJiYgJ2xvY2F0aW9uJyBpbiBhcmcwKSB7XG4gICAgICAvL1xuICAgICAgLy8gY29uc3RydWN0aW5nIHRlbnNvciBmcm9tIHNwZWNpZmljIGxvY2F0aW9uXG4gICAgICAvL1xuICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSBhcmcwLmxvY2F0aW9uO1xuICAgICAgdHlwZSA9IGFyZzAudHlwZTtcbiAgICAgIGRpbXMgPSBhcmcwLmRpbXM7XG4gICAgICBzd2l0Y2ggKGFyZzAubG9jYXRpb24pIHtcbiAgICAgICAgY2FzZSAnY3B1LXBpbm5lZCc6IHtcbiAgICAgICAgICBjb25zdCBleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuZ2V0KHR5cGUpO1xuICAgICAgICAgIGlmICghZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIHBpbm5lZCBidWZmZXJgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEoYXJnMC5kYXRhIGluc3RhbmNlb2YgZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBidWZmZXIgc2hvdWxkIGJlIG9mIHR5cGUgJHtleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3Rvci5uYW1lfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNwdURhdGEgPSBhcmcwLmRhdGE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndGV4dHVyZSc6IHtcbiAgICAgICAgICBpZiAodHlwZSAhPT0gJ2Zsb2F0MzInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSB0ZXh0dXJlYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZ3B1VGV4dHVyZURhdGEgPSBhcmcwLnRleHR1cmU7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XG4gICAgICAgICAgaWYgKCh0eXBlICE9PSAnZmxvYXQzMicgJiYgdHlwZSAhPT0gJ2Zsb2F0MTYnICYmIHR5cGUgIT09ICdpbnQzMicgJiYgdHlwZSAhPT0gJ2ludDY0JyAmJiB0eXBlICE9PSAndWludDMyJyAmJlxuICAgICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ4JyAmJiB0eXBlICE9PSAnYm9vbCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBncHUgYnVmZmVyYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IGFyZzAuZ3B1QnVmZmVyO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XG4gICAgICAgICAgdGhpcy5kaXNwb3NlciA9IGFyZzAuZGlzcG9zZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yIGNvbnN0cnVjdG9yOiB1bnN1cHBvcnRlZCBsb2NhdGlvbiAnJHt0aGlzLmRhdGFMb2NhdGlvbn0nYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vXG4gICAgICAvLyBjb25zdHJ1Y3RpbmcgdGVuc29yIG9mIGxvY2F0aW9uICdjcHUnXG4gICAgICAvL1xuICAgICAgbGV0IGRhdGE6IFRlbnNvckRhdGFUeXBlO1xuICAgICAgbGV0IG1heWJlRGltczogdHlwZW9mIGFyZzF8dHlwZW9mIGFyZzI7XG4gICAgICAvLyBjaGVjayB3aGV0aGVyIGFyZzAgaXMgdHlwZSBvciBkYXRhXG4gICAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIE92ZXJyaWRlOiBjb25zdHJ1Y3Rvcih0eXBlLCBkYXRhLCAuLi4pXG4gICAgICAgIC8vXG4gICAgICAgIHR5cGUgPSBhcmcwO1xuICAgICAgICBtYXliZURpbXMgPSBhcmcyO1xuICAgICAgICBpZiAoYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHN0cmluZyB0ZW5zb3JcXCdzIGRhdGEgbXVzdCBiZSBhIHN0cmluZyBhcnJheS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2UgZG9uJ3QgY2hlY2sgd2hldGhlciBldmVyeSBlbGVtZW50IGluIHRoZSBhcnJheSBpcyBzdHJpbmc7IHRoaXMgaXMgdG9vIHNsb3cuIHdlIGFzc3VtZSBpdCdzIGNvcnJlY3QgYW5kXG4gICAgICAgICAgLy8gZXJyb3Igd2lsbCBiZSBwb3B1bGF0ZWQgYXQgaW5mZXJlbmNlXG4gICAgICAgICAgZGF0YSA9IGFyZzE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbnVtZXJpYyB0ZW5zb3JcbiAgICAgICAgICBjb25zdCB0eXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldChhcmcwKTtcbiAgICAgICAgICBpZiAodHlwZWRBcnJheUNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuc3VwcG9ydGVkIHRlbnNvciB0eXBlOiAke2FyZzB9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICAgICAgaWYgKGFyZzAgPT09ICdmbG9hdDE2JyAmJiB0eXBlZEFycmF5Q29uc3RydWN0b3IgPT09IFVpbnQxNkFycmF5KSB7XG4gICAgICAgICAgICAgIC8vIFdoZW4gbm8gRmxvYXQxNkFycmF5IHBvbHlmaWxsIGlzIHVzZWQsIHdlIGNhbm5vdCBjcmVhdGUgJ2Zsb2F0MTYnIHRlbnNvciBmcm9tIG51bWJlciBhcnJheS5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gVGhyb3cgZXJyb3IgaGVyZSBiZWNhdXNlIHdoZW4gdXNlciB0cnkgdG8gdXNlIG51bWJlciBhcnJheSBhcyBkYXRhLFxuICAgICAgICAgICAgICAvLyBlLmcuIG5ldyBUZW5zb3IoJ2Zsb2F0MTYnLCBbMSwgMiwgMywgNF0sIGRpbXMpKSwgaXQgd2lsbCBhY3R1YWxseSBjYWxsXG4gICAgICAgICAgICAgIC8vIFVpbnQxNkFycmF5LmZyb20oYXJnMSkgd2hpY2ggZ2VuZXJhdGVzIHdyb25nIGRhdGEuXG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAnQ3JlYXRpbmcgYSBmbG9hdDE2IHRlbnNvciBmcm9tIG51bWJlciBhcnJheSBpcyBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgdXNlIFVpbnQxNkFycmF5IGFzIGRhdGEuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZzAgPT09ICd1aW50NjQnIHx8IGFyZzAgPT09ICdpbnQ2NCcpIHtcbiAgICAgICAgICAgICAgLy8gdXNlICdhcyBhbnknIGhlcmUgYmVjYXVzZTpcbiAgICAgICAgICAgICAgLy8gMS4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHR5cGUgb2YgJ0FycmF5LmlzQXJyYXkoKScgZG9lcyBub3Qgd29yayB3aXRoIHJlYWRvbmx5IGFycmF5cy5cbiAgICAgICAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTcwMDJcbiAgICAgICAgICAgICAgLy8gMi4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHVuaW9uIHR5cGUgb2YgJyhCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3J8QmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvcikuZnJvbSgpJ1xuICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBhY2NlcHQgcGFyYW1ldGVyIG1hcEZuLlxuICAgICAgICAgICAgICAvLyAzLiBwYXJhbWV0ZXJzIG9mICdTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLmZyb20oKScgZG9lcyBub3QgbWF0Y2ggdGhlIHJlcXVpcmVtZW50IG9mIHRoZSB1bmlvblxuICAgICAgICAgICAgICAvLyB0eXBlLlxuXG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IGJpZ2ludFtdXCIgaGVyZS5cblxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICBkYXRhID0gKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciBhcyBhbnkpLmZyb20oYXJnMSwgQmlnSW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdXCIgaGVyZS5cbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgZGF0YSA9ICh0eXBlZEFycmF5Q29uc3RydWN0b3IgYXMgYW55KS5mcm9tKGFyZzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMSBpbnN0YW5jZW9mIHR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgZGF0YSA9IGFyZzE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEEgJHt0eXBlfSB0ZW5zb3IncyBkYXRhIG11c3QgYmUgdHlwZSBvZiAke3R5cGVkQXJyYXlDb25zdHJ1Y3Rvcn1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIE92ZXJyaWRlOiBjb25zdHJ1Y3RvcihkYXRhLCAuLi4pXG4gICAgICAgIC8vXG4gICAgICAgIG1heWJlRGltcyA9IGFyZzE7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzApKSB7XG4gICAgICAgICAgLy8gb25seSBib29sZWFuW10gYW5kIHN0cmluZ1tdIGlzIHN1cHBvcnRlZFxuICAgICAgICAgIGlmIChhcmcwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGVuc29yIHR5cGUgY2Fubm90IGJlIGluZmVycmVkIGZyb20gYW4gZW1wdHkgYXJyYXkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGZpcnN0RWxlbWVudFR5cGUgPSB0eXBlb2YgYXJnMFswXTtcbiAgICAgICAgICBpZiAoZmlyc3RFbGVtZW50VHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnc3RyaW5nJztcbiAgICAgICAgICAgIGRhdGEgPSBhcmcwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZmlyc3RFbGVtZW50VHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0eXBlID0gJ2Jvb2wnO1xuICAgICAgICAgICAgLy8gJ2FyZzAnIGlzIG9mIHR5cGUgJ2Jvb2xlYW5bXScuIFVpbnQ4QXJyYXkuZnJvbShib29sZWFuW10pIGFjdHVhbGx5IHdvcmtzLCBidXQgdHlwZXNjcmlwdCB0aGlua3MgdGhpcyBpc1xuICAgICAgICAgICAgLy8gd3JvbmcgdHlwZS4gV2UgdXNlICdhcyBhbnknIHRvIG1ha2UgaXQgaGFwcHkuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgZGF0YSA9IFVpbnQ4QXJyYXkuZnJvbShhcmcwIGFzIGFueVtdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBlbGVtZW50IHR5cGUgb2YgZGF0YSBhcnJheTogJHtmaXJzdEVsZW1lbnRUeXBlfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZ2V0IHRlbnNvciB0eXBlIGZyb20gVHlwZWRBcnJheVxuICAgICAgICAgIGNvbnN0IG1hcHBlZFR5cGUgPVxuICAgICAgICAgICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLmdldChhcmcwLmNvbnN0cnVjdG9yIGFzIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMpO1xuICAgICAgICAgIGlmIChtYXBwZWRUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuc3VwcG9ydGVkIHR5cGUgZm9yIHRlbnNvciBkYXRhOiAke2FyZzAuY29uc3RydWN0b3J9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0eXBlID0gbWFwcGVkVHlwZTtcbiAgICAgICAgICBkYXRhID0gYXJnMCBhcyBTdXBwb3J0ZWRUeXBlZEFycmF5O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHR5cGUgYW5kIGRhdGEgaXMgcHJvY2Vzc2VkLCBub3cgcHJvY2Vzc2luZyBkaW1zXG4gICAgICBpZiAobWF5YmVEaW1zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gYXNzdW1lIDEtRCB0ZW5zb3IgaWYgZGltcyBvbWl0dGVkXG4gICAgICAgIG1heWJlRGltcyA9IFtkYXRhLmxlbmd0aF07XG4gICAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KG1heWJlRGltcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQSB0ZW5zb3JcXCdzIGRpbXMgbXVzdCBiZSBhIG51bWJlciBhcnJheScpO1xuICAgICAgfVxuICAgICAgZGltcyA9IG1heWJlRGltcyBhcyByZWFkb25seSBudW1iZXJbXTtcblxuICAgICAgdGhpcy5jcHVEYXRhID0gZGF0YTtcbiAgICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gJ2NwdSc7XG4gICAgfVxuXG4gICAgLy8gcGVyZm9ybSBjaGVjayBvbiBkaW1zXG4gICAgY29uc3Qgc2l6ZSA9IGNhbGN1bGF0ZVNpemUoZGltcyk7XG4gICAgLy8gaWYgZGF0YSBpcyBvbiBDUFUsIGNoZWNrIHdoZXRoZXIgZGF0YSBsZW5ndGggbWF0Y2hlcyB0ZW5zb3Igc2l6ZVxuICAgIGlmICh0aGlzLmNwdURhdGEgJiYgc2l6ZSAhPT0gdGhpcy5jcHVEYXRhLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUZW5zb3IncyBzaXplKCR7c2l6ZX0pIGRvZXMgbm90IG1hdGNoIGRhdGEgbGVuZ3RoKCR7dGhpcy5jcHVEYXRhLmxlbmd0aH0pLmApO1xuICAgIH1cblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5kaW1zID0gZGltcztcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGZhY3RvcnlcbiAgc3RhdGljIGFzeW5jIGZyb21JbWFnZShcbiAgICAgIGltYWdlOiBJbWFnZURhdGF8SFRNTEltYWdlRWxlbWVudHxJbWFnZUJpdG1hcHxzdHJpbmcsXG4gICAgICBvcHRpb25zPzogVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnN8VGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnN8VGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9uc3xcbiAgICAgIFRlbnNvckZyb21VcmxPcHRpb25zKTogUHJvbWlzZTxUZW5zb3JJbnRlcmZhY2U+IHtcbiAgICByZXR1cm4gdGVuc29yRnJvbUltYWdlKGltYWdlLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVGV4dHVyZTxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLlRleHR1cmVEYXRhVHlwZXM+KFxuICAgICAgdGV4dHVyZTogVGVuc29yVGV4dHVyZVR5cGUsIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPik6IFRlbnNvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21UZXh0dXJlKHRleHR1cmUsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21HcHVCdWZmZXI8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJEYXRhVHlwZXM+KFxuICAgICAgZ3B1QnVmZmVyOiBUZW5zb3JHcHVCdWZmZXJUeXBlLCBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPik6IFRlbnNvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21HcHVCdWZmZXIoZ3B1QnVmZmVyLCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUGlubmVkQnVmZmVyPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuQ3B1UGlubmVkRGF0YVR5cGVzPihcbiAgICAgIHR5cGU6IFQsIGJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlTWFwW1RdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3Ige1xuICAgIHJldHVybiB0ZW5zb3JGcm9tUGlubmVkQnVmZmVyKHR5cGUsIGJ1ZmZlciwgZGltcyk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBjb252ZXJzaW9uc1xuICB0b0RhdGFVUkwob3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0ZW5zb3JUb0RhdGFVUkwodGhpcywgb3B0aW9ucyk7XG4gIH1cblxuICB0b0ltYWdlRGF0YShvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhIHtcbiAgICByZXR1cm4gdGVuc29yVG9JbWFnZURhdGEodGhpcywgb3B0aW9ucyk7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHVibGljIGZpZWxkc1xuICByZWFkb25seSBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcbiAgcmVhZG9ubHkgdHlwZTogVGVuc29yVHlwZTtcbiAgcmVhZG9ubHkgc2l6ZTogbnVtYmVyO1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcml2YXRlIGZpZWxkc1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhLlxuICAgKi9cbiAgcHJpdmF0ZSBkYXRhTG9jYXRpb246IFRlbnNvckRhdGFMb2NhdGlvbjtcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSBkYXRhIG9uIENQVSwgaWYgbG9jYXRpb24gaXMgJ2NwdScgb3IgJ2NwdS1waW5uZWQnLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGNwdURhdGE/OiBUZW5zb3JEYXRhVHlwZTtcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSB1bmRlcmx5aW5nIHRleHR1cmUgd2hlbiBsb2NhdGlvbiBpcyAndGV4dHVyZScuIG90aGVyd2lzZSBlbXB0eS5cbiAgICovXG4gIHByaXZhdGUgZ3B1VGV4dHVyZURhdGE/OiBUZW5zb3JUZXh0dXJlVHlwZTtcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSB1bmRlcmx5aW5nIEdQVSBidWZmZXIgd2hlbiBsb2NhdGlvbiBpcyAnZ3B1LWJ1ZmZlcicuIG90aGVyd2lzZSBlbXB0eS5cbiAgICovXG4gIHByaXZhdGUgZ3B1QnVmZmVyRGF0YT86IFRlbnNvckdwdUJ1ZmZlclR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkb3dubG9hZGVyIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxuICAgKi9cbiAgcHJpdmF0ZSBkb3dubG9hZGVyPygpOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPjtcblxuICAvKipcbiAgICogYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0aGUgZGF0YSBpcyBiZWluZyBkb3dubG9hZGVkIGZyb20gR1BVIHRvIENQVS5cbiAgICovXG4gIHByaXZhdGUgaXNEb3dubG9hZGluZz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkaXNwb3NlciBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB1bmRlcmx5aW5nIGRhdGEuXG4gICAqL1xuICBwcml2YXRlIGRpc3Bvc2VyPygpOiB2b2lkO1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9wZXJ0aWVzXG4gIGdldCBkYXRhKCk6IFRlbnNvckRhdGFUeXBlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKCF0aGlzLmNwdURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnVGhlIGRhdGEgaXMgbm90IG9uIENQVS4gVXNlIGBnZXREYXRhKClgIHRvIGRvd25sb2FkIEdQVSBkYXRhIHRvIENQVSwgJyArXG4gICAgICAgICAgJ29yIHVzZSBgdGV4dHVyZWAgb3IgYGdwdUJ1ZmZlcmAgcHJvcGVydHkgdG8gYWNjZXNzIHRoZSBHUFUgZGF0YSBkaXJlY3RseS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3B1RGF0YTtcbiAgfVxuXG4gIGdldCBsb2NhdGlvbigpOiBUZW5zb3JEYXRhTG9jYXRpb24ge1xuICAgIHJldHVybiB0aGlzLmRhdGFMb2NhdGlvbjtcbiAgfVxuXG4gIGdldCB0ZXh0dXJlKCk6IFRlbnNvclRleHR1cmVUeXBlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKCF0aGlzLmdwdVRleHR1cmVEYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBkYXRhIGlzIG5vdCBzdG9yZWQgYXMgYSBXZWJHTCB0ZXh0dXJlLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ncHVUZXh0dXJlRGF0YTtcbiAgfVxuXG4gIGdldCBncHVCdWZmZXIoKTogVGVuc29yR3B1QnVmZmVyVHlwZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICghdGhpcy5ncHVCdWZmZXJEYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBkYXRhIGlzIG5vdCBzdG9yZWQgYXMgYSBXZWJHUFUgYnVmZmVyLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ncHVCdWZmZXJEYXRhO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG1ldGhvZHNcblxuICBhc3luYyBnZXREYXRhKHJlbGVhc2VEYXRhPzogYm9vbGVhbik6IFByb21pc2U8VGVuc29yRGF0YVR5cGU+IHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgc3dpdGNoICh0aGlzLmRhdGFMb2NhdGlvbikge1xuICAgICAgY2FzZSAnY3B1JzpcbiAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICBjYXNlICdncHUtYnVmZmVyJzoge1xuICAgICAgICBpZiAoIXRoaXMuZG93bmxvYWRlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIG5vdCBjcmVhdGVkIHdpdGggYSBzcGVjaWZpZWQgZGF0YSBkb3dubG9hZGVyLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzRG93bmxvYWRpbmcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBiZWluZyBkb3dubG9hZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5kb3dubG9hZGVyKCk7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gJ2NwdSc7XG4gICAgICAgICAgdGhpcy5jcHVEYXRhID0gZGF0YTtcblxuICAgICAgICAgIGlmIChyZWxlYXNlRGF0YSAmJiB0aGlzLmRpc3Bvc2VyKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2VyKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBkYXRhO1xuXG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGdldCBkYXRhIGZyb20gbG9jYXRpb246ICR7dGhpcy5kYXRhTG9jYXRpb259YCk7XG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBiZWluZyBkb3dubG9hZGVkLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRpc3Bvc2VyKSB7XG4gICAgICB0aGlzLmRpc3Bvc2VyKCk7XG4gICAgICB0aGlzLmRpc3Bvc2VyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLmNwdURhdGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5ncHVUZXh0dXJlRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmdwdUJ1ZmZlckRhdGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kb3dubG9hZGVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gJ25vbmUnO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gdGVuc29yIHV0aWxpdGllc1xuICBwcml2YXRlIGVuc3VyZVZhbGlkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRhdGFMb2NhdGlvbiA9PT0gJ25vbmUnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0ZW5zb3IgaXMgZGlzcG9zZWQuJyk7XG4gICAgfVxuICB9XG5cbiAgcmVzaGFwZShkaW1zOiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvckludGVyZmFjZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICh0aGlzLmRvd25sb2FkZXIgfHwgdGhpcy5kaXNwb3Nlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVzaGFwZSBhIHRlbnNvciB0aGF0IG93bnMgR1BVIHJlc291cmNlLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGVuc29yUmVzaGFwZSh0aGlzLCBkaW1zKTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7VGVuc29yRmFjdG9yeX0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQge1RlbnNvciBhcyBUZW5zb3JJbXBsfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7VHlwZWRUZW5zb3JVdGlsc30gZnJvbSAnLi90ZW5zb3ItdXRpbHMuanMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXG5cbi8qKlxuICogcmVwcmVzZW50IGEgYmFzaWMgdGVuc29yIHdpdGggc3BlY2lmaWVkIGRpbWVuc2lvbnMgYW5kIGRhdGEgdHlwZS5cbiAqL1xuaW50ZXJmYWNlIFR5cGVkVGVuc29yQmFzZTxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IHtcbiAgLyoqXG4gICAqIEdldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG4gIC8qKlxuICAgKiBHZXQgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgcmVhZG9ubHkgdHlwZTogVDtcbiAgLyoqXG4gICAqIEdldCB0aGUgYnVmZmVyIGRhdGEgb2YgdGhlIHRlbnNvci5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIENQVSAoZWcuIGl0J3MgaW4gdGhlIGZvcm0gb2YgV2ViR0wgdGV4dHVyZSBvciBXZWJHUFUgYnVmZmVyKSwgdGhyb3cgZXJyb3IuXG4gICAqL1xuICByZWFkb25seSBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF07XG4gIC8qKlxuICAgKiBHZXQgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246IFRlbnNvci5EYXRhTG9jYXRpb247XG4gIC8qKlxuICAgKiBHZXQgdGhlIFdlYkdMIHRleHR1cmUgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBvbiBHUFUgYXMgV2ViR0wgdGV4dHVyZSwgdGhyb3cgZXJyb3IuXG4gICAqL1xuICByZWFkb25seSB0ZXh0dXJlOiBUZW5zb3IuVGV4dHVyZVR5cGU7XG4gIC8qKlxuICAgKiBHZXQgdGhlIFdlYkdQVSBidWZmZXIgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBvbiBHUFUgYXMgV2ViR1BVIGJ1ZmZlciwgdGhyb3cgZXJyb3IuXG4gICAqL1xuICByZWFkb25seSBncHVCdWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJ1ZmZlciBkYXRhIG9mIHRoZSB0ZW5zb3IuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIENQVSwgcmV0dXJucyB0aGUgZGF0YSBpbW1lZGlhdGVseS5cbiAgICogSWYgdGhlIGRhdGEgaXMgb24gR1BVLCBkb3dubG9hZHMgdGhlIGRhdGEgYW5kIHJldHVybnMgdGhlIHByb21pc2UuXG4gICAqXG4gICAqIEBwYXJhbSByZWxlYXNlRGF0YSAtIHdoZXRoZXIgcmVsZWFzZSB0aGUgZGF0YSBvbiBHUFUuIElnbm9yZSBpZiBkYXRhIGlzIGFscmVhZHkgb24gQ1BVLlxuICAgKi9cbiAgZ2V0RGF0YShyZWxlYXNlRGF0YT86IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvci5EYXRhVHlwZU1hcFtUXT47XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRlbnNvciBkYXRhLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBDUFUsIHJlbW92ZSBpdHMgaW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGRhdGEuXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIEdQVSwgcmVsZWFzZSB0aGUgZGF0YSBvbiBHUFUuXG4gICAqXG4gICAqIEFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiwgdGhlIHRlbnNvciBpcyBjb25zaWRlcmVkIG5vIGxvbmdlciB2YWxpZC4gSXRzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdub25lJy5cbiAgICovXG4gIGRpc3Bvc2UoKTogdm9pZDtcbn1cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFRlbnNvciB7XG4gIGludGVyZmFjZSBEYXRhVHlwZU1hcCB7XG4gICAgZmxvYXQzMjogRmxvYXQzMkFycmF5O1xuICAgIHVpbnQ4OiBVaW50OEFycmF5O1xuICAgIGludDg6IEludDhBcnJheTtcbiAgICB1aW50MTY6IFVpbnQxNkFycmF5O1xuICAgIGludDE2OiBJbnQxNkFycmF5O1xuICAgIGludDMyOiBJbnQzMkFycmF5O1xuICAgIGludDY0OiBCaWdJbnQ2NEFycmF5O1xuICAgIHN0cmluZzogc3RyaW5nW107XG4gICAgYm9vbDogVWludDhBcnJheTtcbiAgICBmbG9hdDE2OiBVaW50MTZBcnJheTsgIC8vIEtlZXAgdXNpbmcgVWludDE2QXJyYXkgdW50aWwgd2UgaGF2ZSBhIGNvbmNyZXRlIHNvbHV0aW9uIGZvciBmbG9hdCAxNi5cbiAgICBmbG9hdDY0OiBGbG9hdDY0QXJyYXk7XG4gICAgdWludDMyOiBVaW50MzJBcnJheTtcbiAgICB1aW50NjQ6IEJpZ1VpbnQ2NEFycmF5O1xuICAgIC8vIGNvbXBsZXg2NDogbmV2ZXI7XG4gICAgLy8gY29tcGxleDEyODogbmV2ZXI7XG4gICAgLy8gYmZsb2F0MTY6IG5ldmVyO1xuICB9XG5cbiAgaW50ZXJmYWNlIEVsZW1lbnRUeXBlTWFwIHtcbiAgICBmbG9hdDMyOiBudW1iZXI7XG4gICAgdWludDg6IG51bWJlcjtcbiAgICBpbnQ4OiBudW1iZXI7XG4gICAgdWludDE2OiBudW1iZXI7XG4gICAgaW50MTY6IG51bWJlcjtcbiAgICBpbnQzMjogbnVtYmVyO1xuICAgIGludDY0OiBiaWdpbnQ7XG4gICAgc3RyaW5nOiBzdHJpbmc7XG4gICAgYm9vbDogYm9vbGVhbjtcbiAgICBmbG9hdDE2OiBudW1iZXI7ICAvLyBLZWVwIHVzaW5nIFVpbnQxNkFycmF5IHVudGlsIHdlIGhhdmUgYSBjb25jcmV0ZSBzb2x1dGlvbiBmb3IgZmxvYXQgMTYuXG4gICAgZmxvYXQ2NDogbnVtYmVyO1xuICAgIHVpbnQzMjogbnVtYmVyO1xuICAgIHVpbnQ2NDogYmlnaW50O1xuICAgIC8vIGNvbXBsZXg2NDogbmV2ZXI7XG4gICAgLy8gY29tcGxleDEyODogbmV2ZXI7XG4gICAgLy8gYmZsb2F0MTY6IG5ldmVyO1xuICB9XG5cbiAgdHlwZSBEYXRhVHlwZSA9IERhdGFUeXBlTWFwW1R5cGVdO1xuICB0eXBlIEVsZW1lbnRUeXBlID0gRWxlbWVudFR5cGVNYXBbVHlwZV07XG5cbiAgLyoqXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHBpbm5lZCBDUFUgYnVmZmVyXG4gICAqL1xuICBleHBvcnQgdHlwZSBDcHVQaW5uZWREYXRhVHlwZXMgPSBFeGNsdWRlPFRlbnNvci5UeXBlLCAnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIHR5cGUgYWxpYXMgZm9yIFdlYkdMIHRleHR1cmVcbiAgICovXG4gIGV4cG9ydCB0eXBlIFRleHR1cmVUeXBlID0gV2ViR0xUZXh0dXJlO1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXG4gICAqL1xuICBleHBvcnQgdHlwZSBUZXh0dXJlRGF0YVR5cGVzID0gJ2Zsb2F0MzInO1xuXG4gIC8qKlxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJHUFUgYnVmZmVyXG4gICAqXG4gICAqIFRoZSByZWFzb24gd2h5IHdlIGRvbid0IHVzZSB0eXBlIFwiR1BVQnVmZmVyXCIgZGVmaW5lZCBpbiB3ZWJncHUuZC50cyBmcm9tIEB3ZWJncHUvdHlwZXMgaXMgYmVjYXVzZSBcIkB3ZWJncHUvdHlwZXNcIlxuICAgKiByZXF1aXJlcyBcIkB0eXBlcy9kb20td2ViY29kZWNzXCIgYXMgcGVlciBkZXBlbmRlbmN5IHdoZW4gdXNpbmcgVHlwZVNjcmlwdCA8IHY1LjEgYW5kIGl0cyB2ZXJzaW9uIG5lZWQgdG8gYmUgY2hvc2VuXG4gICAqIGNhcmVmdWxseSBhY2NvcmRpbmcgdG8gdGhlIFR5cGVTY3JpcHQgdmVyc2lvbiBiZWluZyB1c2VkLiBUaGlzIG1lYW5zIHNvIGZhciB0aGVyZSBpcyBub3QgYSB3YXkgdG8ga2VlcCBldmVyeVxuICAgKiBUeXBlU2NyaXB0IHZlcnNpb24gaGFwcHkuIEl0IHR1cm5zIG91dCB0aGF0IHdlIHdpbGwgZWFzaWx5IGJyb2tlIHVzZXJzIG9uIHNvbWUgVHlwZVNjcmlwdCB2ZXJzaW9uLlxuICAgKlxuICAgKiBmb3IgbW9yZSBpbmZvIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3B1d2ViL3R5cGVzL2lzc3Vlcy8xMjdcbiAgICovXG4gIGV4cG9ydCB0eXBlIEdwdUJ1ZmZlclR5cGUgPSB7c2l6ZTogbnVtYmVyOyBtYXBTdGF0ZTogJ3VubWFwcGVkJyB8ICdwZW5kaW5nJyB8ICdtYXBwZWQnfTtcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViR1BVIGJ1ZmZlclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgR3B1QnVmZmVyRGF0YVR5cGVzID0gJ2Zsb2F0MzInfCdmbG9hdDE2J3wnaW50MzInfCdpbnQ2NCd8J3VpbnQzMid8J3VpbnQ4J3wnYm9vbCc7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB3aGVyZSB0aGUgdGVuc29yIGRhdGEgaXMgc3RvcmVkXG4gICAqL1xuICBleHBvcnQgdHlwZSBEYXRhTG9jYXRpb24gPSAnbm9uZSd8J2NwdSd8J2NwdS1waW5uZWQnfCd0ZXh0dXJlJ3wnZ3B1LWJ1ZmZlcic7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB0aGUgZGF0YSB0eXBlIG9mIGEgdGVuc29yXG4gICAqL1xuICBleHBvcnQgdHlwZSBUeXBlID0ga2V5b2YgRGF0YVR5cGVNYXA7XG59XG5cbi8qKlxuICogUmVwcmVzZW50IG11bHRpLWRpbWVuc2lvbmFsIGFycmF5cyB0byBmZWVkIHRvIG9yIGZldGNoIGZyb20gbW9kZWwgaW5mZXJlbmNpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWRUZW5zb3I8VCBleHRlbmRzIFRlbnNvci5UeXBlPiBleHRlbmRzIFR5cGVkVGVuc29yQmFzZTxUPiwgVHlwZWRUZW5zb3JVdGlsczxUPiB7fVxuLyoqXG4gKiBSZXByZXNlbnQgbXVsdGktZGltZW5zaW9uYWwgYXJyYXlzIHRvIGZlZWQgdG8gb3IgZmV0Y2ggZnJvbSBtb2RlbCBpbmZlcmVuY2luZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW5zb3IgZXh0ZW5kcyBUeXBlZFRlbnNvckJhc2U8VGVuc29yLlR5cGU+LCBUeXBlZFRlbnNvclV0aWxzPFRlbnNvci5UeXBlPiB7fVxuXG4vKipcbiAqIHR5cGUgVGVuc29yQ29uc3RydWN0b3IgZGVmaW5lcyB0aGUgY29uc3RydWN0b3JzIG9mICdUZW5zb3InIHRvIGNyZWF0ZSBDUFUgdGVuc29yIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JDb25zdHJ1Y3RvciBleHRlbmRzIFRlbnNvckZhY3Rvcnkge1xuICAvLyAjcmVnaW9uIENQVSB0ZW5zb3IgLSBzcGVjaWZ5IGVsZW1lbnQgdHlwZVxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHN0cmluZyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcodHlwZTogJ3N0cmluZycsIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFsnc3RyaW5nJ118cmVhZG9ubHkgc3RyaW5nW10sXG4gICAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyh0eXBlOiAnYm9vbCcsIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFsnYm9vbCddfHJlYWRvbmx5IGJvb2xlYW5bXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IDY0LWJpdCBpbnRlZ2VyIHR5cGVkIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldzxUIGV4dGVuZHMgJ3VpbnQ2NCd8J2ludDY0Jz4oXG4gICAgICB0eXBlOiBULCBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF18cmVhZG9ubHkgYmlnaW50W118cmVhZG9ubHkgbnVtYmVyW10sXG4gICAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjxUPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IG51bWVyaWMgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3PFQgZXh0ZW5kcyBFeGNsdWRlPFRlbnNvci5UeXBlLCAnc3RyaW5nJ3wnYm9vbCd8J3VpbnQ2NCd8J2ludDY0Jz4+KFxuICAgICAgdHlwZTogVCwgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdfHJlYWRvbmx5IG51bWJlcltdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjxUPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGluZmVyIGVsZW1lbnQgdHlwZXNcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogRmxvYXQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnZmxvYXQzMic+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW50OCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBJbnQ4QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50OCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBVaW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBVaW50MTZBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQxNic+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW50MTYgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogSW50MTZBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBJbnQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IEJpZ0ludDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdpbnQ2NCc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgc3RyaW5nIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IHJlYWRvbmx5IHN0cmluZ1tdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IHJlYWRvbmx5IGJvb2xlYW5bXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogRmxvYXQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnZmxvYXQ2NCc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDMyIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3KGRhdGE6IFVpbnQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcoZGF0YTogQmlnVWludDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50NjQnPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gZmFsbCBiYWNrIHRvIG5vbi1nZW5lcmljIHRlbnNvciB0eXBlIGRlY2xhcmF0aW9uXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcodHlwZTogVGVuc29yLlR5cGUsIGRhdGE6IFRlbnNvci5EYXRhVHlwZXxyZWFkb25seSBudW1iZXJbXXxyZWFkb25seSBzdHJpbmdbXXxyZWFkb25seSBiaWdpbnRbXXxyZWFkb25seSBib29sZWFuW10sXG4gICAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3I7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyhkYXRhOiBUZW5zb3IuRGF0YVR5cGUsIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvcjtcbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgVGVuc29yID0gVGVuc29ySW1wbCBhcyBUZW5zb3JDb25zdHJ1Y3RvcjtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtlbnZ9IGZyb20gJy4vZW52LWltcGwuanMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFID0gKGRldmljZVR5cGU6IHN0cmluZywgbGFiZWw6IHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUudGltZVN0YW1wKGAke2RldmljZVR5cGV9OjpPUlQ6OiR7bGFiZWx9YCk7XG59O1xuXG5jb25zdCBUUkFDRV9GVU5DID0gKG1zZzogc3RyaW5nLCBleHRyYU1zZz86IHN0cmluZykgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdCgvXFxyXFxufFxccnxcXG4vZykgfHwgW107XG4gIGxldCBoYXNUcmFjZUZ1bmMgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgIGlmIChoYXNUcmFjZUZ1bmMgJiYgIXN0YWNrW2ldLmluY2x1ZGVzKCdUUkFDRV9GVU5DJykpIHtcbiAgICAgIGxldCBsYWJlbCA9IGBGVU5DXyR7bXNnfTo6JHtzdGFja1tpXS50cmltKCkuc3BsaXQoJyAnKVsxXX1gO1xuICAgICAgaWYgKGV4dHJhTXNnKSB7XG4gICAgICAgIGxhYmVsICs9IGA6OiR7ZXh0cmFNc2d9YDtcbiAgICAgIH1cbiAgICAgIFRSQUNFKCdDUFUnLCBsYWJlbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdGFja1tpXS5pbmNsdWRlcygnVFJBQ0VfRlVOQycpKSB7XG4gICAgICBoYXNUcmFjZUZ1bmMgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9GVU5DX0JFR0lOID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnQkVHSU4nLCBleHRyYU1zZyk7XG59O1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFX0ZVTkNfRU5EID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnRU5EJywgZXh0cmFNc2cpO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtyZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVyc30gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcn0gZnJvbSAnLi9iYWNrZW5kLmpzJztcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcbmltcG9ydCB7T25ueFZhbHVlfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLmpzJztcbmltcG9ydCB7VFJBQ0VfRlVOQ19CRUdJTiwgVFJBQ0VfRlVOQ19FTkR9IGZyb20gJy4vdHJhY2UuanMnO1xuXG50eXBlIFNlc3Npb25PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5TZXNzaW9uT3B0aW9ucztcbnR5cGUgUnVuT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuUnVuT3B0aW9ucztcbnR5cGUgRmVlZHNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5GZWVkc1R5cGU7XG50eXBlIEZldGNoZXNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5GZXRjaGVzVHlwZTtcbnR5cGUgUmV0dXJuVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuUmV0dXJuVHlwZTtcblxuZXhwb3J0IGNsYXNzIEluZmVyZW5jZVNlc3Npb24gaW1wbGVtZW50cyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihoYW5kbGVyOiBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcikge1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gIH1cbiAgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIGZldGNoZXM6IEZldGNoZXNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIGFzeW5jIHJ1bihmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGV8UnVuT3B0aW9ucywgYXJnMj86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+IHtcbiAgICBUUkFDRV9GVU5DX0JFR0lOKCk7XG4gICAgY29uc3QgZmV0Y2hlczoge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV8bnVsbH0gPSB7fTtcbiAgICBsZXQgb3B0aW9uczogUnVuT3B0aW9ucyA9IHt9O1xuICAgIC8vIGNoZWNrIGlucHV0c1xuICAgIGlmICh0eXBlb2YgZmVlZHMgIT09ICdvYmplY3QnIHx8IGZlZWRzID09PSBudWxsIHx8IGZlZWRzIGluc3RhbmNlb2YgVGVuc29yIHx8IEFycmF5LmlzQXJyYXkoZmVlZHMpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICdcXCdmZWVkc1xcJyBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IHVzZSBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuJyk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmV0Y2hlc0VtcHR5ID0gdHJ1ZTtcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggb3ZlcnJpZGUgaXMgYmVpbmcgdXNlZFxuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChhcmcxID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZzEgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBjYW5ub3QgYmUgYSBUZW5zb3InKTtcbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgaWYgKGFyZzEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBjYW5ub3QgYmUgYW4gZW1wdHkgYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgLy8gb3V0cHV0IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBhcmcxKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBtdXN0IGJlIGEgc3RyaW5nIGFycmF5IG9yIGFuIG9iamVjdC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMub3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnZmV0Y2hlcycgY29udGFpbnMgaW52YWxpZCBvdXRwdXQgbmFtZTogJHtuYW1lfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkZWNpZGUgd2hldGhlciBhcmcxIGlzIGZldGNoZXMgb3Igb3B0aW9uc1xuICAgICAgICAvLyBpZiBhbnkgb3V0cHV0IG5hbWUgaXMgcHJlc2VudCBhbmQgaXRzIHZhbHVlIGlzIHZhbGlkIE9ubnhWYWx1ZSwgd2UgY29uc2lkZXIgaXQgZmV0Y2hlc1xuICAgICAgICBsZXQgaXNGZXRjaGVzID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFyZzFLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJnMSk7XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLm91dHB1dE5hbWVzKSB7XG4gICAgICAgICAgaWYgKGFyZzFLZXlzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gKGFyZzEgYXMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5OdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUpW25hbWVdO1xuICAgICAgICAgICAgaWYgKHYgPT09IG51bGwgfHwgdiBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICAgICAgICBpc0ZldGNoZXMgPSB0cnVlO1xuICAgICAgICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICBmZXRjaGVzW25hbWVdID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGZXRjaGVzKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gYXJnMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzEgYXMgUnVuT3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBtdXN0IGJlIFxcJ2ZldGNoZXNcXCcgb3IgXFwnb3B0aW9uc1xcJy4nKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiBhbGwgaW5wdXRzIGFyZSBpbiBmZWVkXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMuaW5wdXROYW1lcykge1xuICAgICAgaWYgKHR5cGVvZiBmZWVkc1tuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCAnJHtuYW1lfScgaXMgbWlzc2luZyBpbiAnZmVlZHMnLmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIG5vIGZldGNoZXMgaXMgc3BlY2lmaWVkLCB3ZSB1c2UgdGhlIGZ1bGwgb3V0cHV0IG5hbWVzIGxpc3RcbiAgICBpZiAoaXNGZXRjaGVzRW1wdHkpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLm91dHB1dE5hbWVzKSB7XG4gICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZlZWRzLCBmZXRjaGVzIGFuZCBvcHRpb25zIGFyZSBwcmVwYXJlZFxuXG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuaGFuZGxlci5ydW4oZmVlZHMsIGZldGNoZXMsIG9wdGlvbnMpO1xuICAgIGNvbnN0IHJldHVyblZhbHVlOiB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX0gPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByZXN1bHRzKSB7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0cywga2V5KSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW2tleV07XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSBuZXcgVGVuc29yKHJlc3VsdC50eXBlLCByZXN1bHQuZGF0YSwgcmVzdWx0LmRpbXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG5cbiAgYXN5bmMgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUocGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg/OiBudW1iZXIsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPjtcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShcbiAgICAgIGFyZzA6IHN0cmluZ3xBcnJheUJ1ZmZlckxpa2V8VWludDhBcnJheSwgYXJnMT86IFNlc3Npb25PcHRpb25zfG51bWJlciwgYXJnMj86IG51bWJlcixcbiAgICAgIGFyZzM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT4ge1xuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcbiAgICAvLyBlaXRoZXIgbG9hZCBmcm9tIGEgZmlsZSBvciBidWZmZXJcbiAgICBsZXQgZmlsZVBhdGhPclVpbnQ4QXJyYXk6IHN0cmluZ3xVaW50OEFycmF5O1xuICAgIGxldCBvcHRpb25zOiBTZXNzaW9uT3B0aW9ucyA9IHt9O1xuXG4gICAgaWYgKHR5cGVvZiBhcmcwID09PSAnc3RyaW5nJykge1xuICAgICAgZmlsZVBhdGhPclVpbnQ4QXJyYXkgPSBhcmcwO1xuICAgICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0JyAmJiBhcmcxICE9PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmcxO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFyZzAgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IGFyZzA7XG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucyA9IGFyZzE7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGFyZzAgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fFxuICAgICAgICAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBhcmcwIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIpKSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBhcmcwO1xuICAgICAgbGV0IGJ5dGVPZmZzZXQgPSAwO1xuICAgICAgbGV0IGJ5dGVMZW5ndGggPSBhcmcwLmJ5dGVMZW5ndGg7XG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucyA9IGFyZzE7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxID09PSAnbnVtYmVyJykge1xuICAgICAgICBieXRlT2Zmc2V0ID0gYXJnMTtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihieXRlT2Zmc2V0KSkge1xuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdieXRlT2Zmc2V0XFwnIG11c3QgYmUgYW4gaW50ZWdlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYnl0ZU9mZnNldCA+PSBidWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZU9mZnNldCcgaXMgb3V0IG9mIHJhbmdlIFswLCAke2J1ZmZlci5ieXRlTGVuZ3RofSkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXQ7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBieXRlTGVuZ3RoID0gYXJnMjtcbiAgICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVMZW5ndGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnYnl0ZUxlbmd0aFxcJyBtdXN0IGJlIGFuIGludGVnZXIuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChieXRlTGVuZ3RoIDw9IDAgfHwgYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGggPiBidWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdieXRlTGVuZ3RoJyBpcyBvdXQgb2YgcmFuZ2UgKDAsICR7YnVmZmVyLmJ5dGVMZW5ndGggLSBieXRlT2Zmc2V0fV0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMyA9PT0gJ29iamVjdCcgJiYgYXJnMyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGFyZzM7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2J5dGVMZW5ndGhcXCcgbXVzdCBiZSBhIG51bWJlci4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5leHBlY3RlZCBhcmd1bWVudFswXTogbXVzdCBiZSBcXCdwYXRoXFwnIG9yIFxcJ2J1ZmZlclxcJy4nKTtcbiAgICB9XG5cbiAgICAvLyByZXNvbHZlIGJhY2tlbmQsIHVwZGF0ZSBzZXNzaW9uIG9wdGlvbnMgd2l0aCB2YWxpZGF0ZWQgRVBzLCBhbmQgY3JlYXRlIHNlc3Npb24gaGFuZGxlclxuICAgIGNvbnN0IFtiYWNrZW5kLCBvcHRpb25zV2l0aFZhbGlkYXRlZEVQc10gPSBhd2FpdCByZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVycyhvcHRpb25zKTtcbiAgICBjb25zdCBoYW5kbGVyID0gYXdhaXQgYmFja2VuZC5jcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihmaWxlUGF0aE9yVWludDhBcnJheSwgb3B0aW9uc1dpdGhWYWxpZGF0ZWRFUHMpO1xuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XG4gICAgcmV0dXJuIG5ldyBJbmZlcmVuY2VTZXNzaW9uKGhhbmRsZXIpO1xuICB9XG5cbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVyLnN0YXJ0UHJvZmlsaW5nKCk7XG4gIH1cbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlci5lbmRQcm9maWxpbmcoKTtcbiAgfVxuXG4gIGdldCBpbnB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmlucHV0TmFtZXM7XG4gIH1cbiAgZ2V0IG91dHB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLm91dHB1dE5hbWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVyOiBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcjtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9uIGFzIEluZmVyZW5jZVNlc3Npb25JbXBsfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLWltcGwuanMnO1xuaW1wb3J0IHtPbm54TW9kZWxPcHRpb25zfSBmcm9tICcuL29ubngtbW9kZWwuanMnO1xuaW1wb3J0IHtPbm54VmFsdWUsIE9ubnhWYWx1ZURhdGFMb2NhdGlvbn0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlZGVjbGFyZSAqL1xuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgSW5mZXJlbmNlU2Vzc2lvbiB7XG4gIC8vICNyZWdpb24gaW5wdXQvb3V0cHV0IHR5cGVzXG5cbiAgdHlwZSBPbm54VmFsdWVNYXBUeXBlID0ge3JlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV9O1xuICB0eXBlIE51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSA9IHtyZWFkb25seSBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIHwgbnVsbH07XG5cbiAgLyoqXG4gICAqIEEgZmVlZHMgKG1vZGVsIGlucHV0cykgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqL1xuICB0eXBlIEZlZWRzVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLyoqXG4gICAqIEEgZmV0Y2hlcyAobW9kZWwgb3V0cHV0cykgY291bGQgYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAqXG4gICAqIC0gT21pdHRlZC4gVXNlIG1vZGVsJ3Mgb3V0cHV0IG5hbWVzIGRlZmluaXRpb24uXG4gICAqIC0gQW4gYXJyYXkgb2Ygc3RyaW5nIGluZGljYXRpbmcgdGhlIG91dHB1dCBuYW1lcy5cbiAgICogLSBBbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBvciBudWxsIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKlxuICAgKiBAcmVtYXJrXG4gICAqIGRpZmZlcmVudCBmcm9tIGlucHV0IGFyZ3VtZW50LCBpbiBvdXRwdXQsIE9ubnhWYWx1ZSBpcyBvcHRpb25hbC4gSWYgYW4gT25ueFZhbHVlIGlzIHByZXNlbnQgaXQgd2lsbCBiZVxuICAgKiB1c2VkIGFzIGEgcHJlLWFsbG9jYXRlZCB2YWx1ZSBieSB0aGUgaW5mZXJlbmNlIGVuZ2luZTsgaWYgb21pdHRlZCwgaW5mZXJlbmNlIGVuZ2luZSB3aWxsIGFsbG9jYXRlIGJ1ZmZlclxuICAgKiBpbnRlcm5hbGx5LlxuICAgKi9cbiAgdHlwZSBGZXRjaGVzVHlwZSA9IHJlYWRvbmx5IHN0cmluZ1tdfE51bGxhYmxlT25ueFZhbHVlTWFwVHlwZTtcblxuICAvKipcbiAgICogQSBpbmZlcmVuY2luZyByZXR1cm4gdHlwZSBpcyBhbiBvYmplY3QgdGhhdCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqL1xuICB0eXBlIFJldHVyblR5cGUgPSBPbm54VmFsdWVNYXBUeXBlO1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHNlc3Npb24gb3B0aW9uc1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBjb25maWd1cmF0aW9ucyBmb3Igc2Vzc2lvbiBiZWhhdmlvci5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgU2Vzc2lvbk9wdGlvbnMgZXh0ZW5kcyBPbm54TW9kZWxPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEFuIGV4ZWN1dGlvbiBwcm92aWRlciBvcHRpb24gY2FuIGJlIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIGV4ZWN1dGlvbiBwcm92aWRlcixcbiAgICAgKiBvciBhbiBvYmplY3Qgb2YgY29ycmVzcG9uZGluZyB0eXBlLlxuICAgICAqL1xuICAgIGV4ZWN1dGlvblByb3ZpZGVycz86IHJlYWRvbmx5IEV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50cmEgT1AgdGhyZWFkcyBudW1iZXIuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICBpbnRyYU9wTnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlciBPUCB0aHJlYWRzIG51bWJlci5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIGludGVyT3BOdW1UaHJlYWRzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGZyZWVEaW1lbnNpb25PdmVycmlkZXM/OiB7cmVhZG9ubHkgW2RpbWVuc2lvbk5hbWU6IHN0cmluZ106IG51bWJlcn07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3B0aW1pemF0aW9uIGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw/OiAnZGlzYWJsZWQnfCdiYXNpYyd8J2V4dGVuZGVkJ3wnYWxsJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIENQVSBtZW1vcnkgYXJlbmEuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlQ3B1TWVtQXJlbmE/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBlbmFibGUgbWVtb3J5IHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlTWVtUGF0dGVybj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBleGVjdXRpb25Nb2RlPzogJ3NlcXVlbnRpYWwnfCdwYXJhbGxlbCc7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpbWl6ZWQgbW9kZWwgZmlsZSBwYXRoLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBzZXR0aW5nIGlzIHNwZWNpZmllZCwgdGhlIG9wdGltaXplZCBtb2RlbCB3aWxsIGJlIGR1bXBlZC4gSW4gYnJvd3NlciwgYSBibG9iIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIHdpdGggYSBwb3AtdXAgd2luZG93LlxuICAgICAqL1xuICAgIG9wdGltaXplZE1vZGVsRmlsZVBhdGg/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBwcm9maWxpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYSBwbGFjZWhvbGRlciBmb3IgYSBmdXR1cmUgdXNlLlxuICAgICAqL1xuICAgIGVuYWJsZVByb2ZpbGluZz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBGaWxlIHByZWZpeCBmb3IgcHJvZmlsaW5nLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGEgcGxhY2Vob2xkZXIgZm9yIGEgZnV0dXJlIHVzZS5cbiAgICAgKi9cbiAgICBwcm9maWxlRmlsZVByZWZpeD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIExvZyBJRC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dJZD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dTZXZlcml0eUxldmVsPzogMHwxfDJ8M3w0O1xuXG4gICAgLyoqXG4gICAgICogTG9nIHZlcmJvc2l0eSBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKi9cbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgc3RyaW5nIGFzIGEgcHJlZmVycmVkIGRhdGEgbG9jYXRpb24gZm9yIGFsbCBvdXRwdXRzLCBvciBhbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIGFcbiAgICAgKiBwcmVmZXJyZWQgZGF0YSBsb2NhdGlvbiBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSBXZWIgZm9yIFdlYkdMIGFuZCBXZWJHUFUgRVAuXG4gICAgICovXG4gICAgcHJlZmVycmVkT3V0cHV0TG9jYXRpb24/OiBPbm54VmFsdWVEYXRhTG9jYXRpb258e3JlYWRvbmx5IFtvdXRwdXROYW1lOiBzdHJpbmddOiBPbm54VmFsdWVEYXRhTG9jYXRpb259O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBlbmFibGUgZ3JhcGggY2FwdHVyZS5cbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgV2ViIGZvciBXZWJHUFUgRVAuXG4gICAgICovXG4gICAgZW5hYmxlR3JhcGhDYXB0dXJlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGNvbmZpZ3VyYXRpb25zIGZvciBhIHNlc3Npb24uIFNlZVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9zZXNzaW9uL1xuICAgICAqIG9ubnhydW50aW1lX3Nlc3Npb25fb3B0aW9uc19jb25maWdfa2V5cy5oXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGpzXG4gICAgICogZXh0cmE6IHtcbiAgICAgKiAgIHNlc3Npb246IHtcbiAgICAgKiAgICAgc2V0X2Rlbm9ybWFsX2FzX3plcm86IFwiMVwiLFxuICAgICAqICAgICBkaXNhYmxlX3ByZXBhY2tpbmc6IFwiMVwiXG4gICAgICogICB9LFxuICAgICAqICAgb3B0aW1pemF0aW9uOiB7XG4gICAgICogICAgIGVuYWJsZV9nZWx1X2FwcHJveGltYXRpb246IFwiMVwiXG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGV4dHJhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH1cblxuICAvLyAjcmVnaW9uIGV4ZWN1dGlvbiBwcm92aWRlcnNcblxuICAvLyBDdXJyZW50bHksIHdlIGhhdmUgdGhlIGZvbGxvd2luZyBiYWNrZW5kcyB0byBzdXBwb3J0IGV4ZWN1dGlvbiBwcm92aWRlcnM6XG4gIC8vIEJhY2tlbmQgTm9kZS5qcyBiaW5kaW5nOiBzdXBwb3J0cyAnY3B1JywgJ2RtbCcgKHdpbjMyKSwgJ2NvcmVtbCcgKG1hY09TKSBhbmQgJ2N1ZGEnIChsaW51eCkuXG4gIC8vIEJhY2tlbmQgV2ViQXNzZW1ibHk6IHN1cHBvcnRzICdjcHUnLCAnd2FzbScsICd3ZWJncHUnIGFuZCAnd2Vibm4nLlxuICAvLyBCYWNrZW5kIE9OTlguanM6IHN1cHBvcnRzICd3ZWJnbCcuXG4gIC8vIEJhY2tlbmQgUmVhY3QgTmF0aXZlOiBzdXBwb3J0cyAnY3B1JywgJ3hubnBhY2snLCAnY29yZW1sJyAoaU9TKSwgJ25uYXBpJyAoQW5kcm9pZCkuXG4gIGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcCB7XG4gICAgY29yZW1sOiBDb3JlTUxFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBjcHU6IENwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGN1ZGE6IEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBkbWw6IERtbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIG5uYXBpOiBObmFwaUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHRlbnNvcnJ0OiBUZW5zb3JSdEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdhc206IFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2ViZ2w6IFdlYkdMRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2ViZ3B1OiBXZWJHcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3ZWJubjogV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBxbm46IFFubkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHhubnBhY2s6IFhubnBhY2tFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgfVxuXG4gIHR5cGUgRXhlY3V0aW9uUHJvdmlkZXJOYW1lID0ga2V5b2YgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25NYXA7XG4gIHR5cGUgRXhlY3V0aW9uUHJvdmlkZXJDb25maWcgPVxuICAgICAgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25NYXBbRXhlY3V0aW9uUHJvdmlkZXJOYW1lXXxFeGVjdXRpb25Qcm92aWRlck9wdGlvbnxFeGVjdXRpb25Qcm92aWRlck5hbWV8c3RyaW5nO1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjcHUnO1xuICAgIHVzZUFyZW5hPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnY3VkYSc7XG4gICAgZGV2aWNlSWQ/OiBudW1iZXI7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBEbWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnZG1sJztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFRlbnNvclJ0RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3RlbnNvcnJ0JztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dhc20nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2ViZ2wnO1xuICAgIC8vIFRPRE86IGFkZCBmbGFnc1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd4bm5wYWNrJztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJncHUnO1xuICAgIHByZWZlcnJlZExheW91dD86ICdOQ0hXJ3wnTkhXQyc7XG4gIH1cblxuICAvLyAjcmVnaW9uIFdlYk5OIG9wdGlvbnNcblxuICBpbnRlcmZhY2UgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUgZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dlYm5uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgc2V0IG9mIG9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgV2ViTk4gTUxDb250ZXh0LlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJubi8jZGljdGRlZi1tbGNvbnRleHRvcHRpb25zXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYk5OQ29udGV4dE9wdGlvbnMge1xuICAgIGRldmljZVR5cGU/OiAnY3B1J3wnZ3B1J3wnbnB1JztcbiAgICBudW1UaHJlYWRzPzogbnVtYmVyO1xuICAgIHBvd2VyUHJlZmVyZW5jZT86ICdkZWZhdWx0J3wnbG93LXBvd2VyJ3wnaGlnaC1wZXJmb3JtYW5jZSc7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aG91dCBNTENvbnRleHQuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYk5OT3B0aW9uc1dpdGhvdXRNTENvbnRleHQgZXh0ZW5kcyBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSwgV2ViTk5Db250ZXh0T3B0aW9ucyB7XG4gICAgY29udGV4dD86IG5ldmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyIHdpdGggTUxDb250ZXh0LlxuICAgKlxuICAgKiBXaGVuIE1MQ29udGV4dCBpcyBwcm92aWRlZCwgdGhlIGRldmljZVR5cGUgaXMgYWxzbyByZXF1aXJlZCBzbyB0aGF0IHRoZSBXZWJOTiBFUCBjYW4gZGV0ZXJtaW5lIHRoZSBwcmVmZXJyZWRcbiAgICogY2hhbm5lbCBsYXlvdXQuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dFxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0IGV4dGVuZHMgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9taXQ8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVxdWlyZWQ8UGljazxXZWJOTkNvbnRleHRPcHRpb25zLCAnZGV2aWNlVHlwZSc+PiB7XG4gICAgY29udGV4dDogdW5rbm93biAvKiBNTENvbnRleHQgKi87XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aCBNTENvbnRleHQgd2hpY2ggaXMgY3JlYXRlZCBmcm9tIEdQVURldmljZS5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2Vibm4vI2RvbS1tbC1jcmVhdGVjb250ZXh0LWdwdWRldmljZVxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTk9wdGlvbnNXZWJHcHUgZXh0ZW5kcyBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSB7XG4gICAgY29udGV4dDogdW5rbm93biAvKiBNTENvbnRleHQgKi87XG4gICAgZ3B1RGV2aWNlOiB1bmtub3duIC8qIEdQVURldmljZSAqLztcbiAgfVxuXG4gIC8qKlxuICAgKiBPcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIuXG4gICAqL1xuICBleHBvcnQgdHlwZSBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uID0gV2ViTk5PcHRpb25zV2l0aG91dE1MQ29udGV4dHxXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0fFdlYk5OT3B0aW9uc1dlYkdwdTtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgZXhwb3J0IGludGVyZmFjZSBRbm5FeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAncW5uJztcbiAgICAvLyBUT0RPIGFkZCBmbGFnc1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29yZU1MRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2NvcmVtbCc7XG4gICAgLyoqXG4gICAgICogVGhlIGJpdCBmbGFncyBmb3IgQ29yZU1MIGV4ZWN1dGlvbiBwcm92aWRlci5cbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqIENPUkVNTF9GTEFHX1VTRV9DUFVfT05MWSA9IDB4MDAxXG4gICAgICogQ09SRU1MX0ZMQUdfRU5BQkxFX09OX1NVQkdSQVBIID0gMHgwMDJcbiAgICAgKiBDT1JFTUxfRkxBR19PTkxZX0VOQUJMRV9ERVZJQ0VfV0lUSF9BTkUgPSAweDAwNFxuICAgICAqIENPUkVNTF9GTEFHX09OTFlfQUxMT1dfU1RBVElDX0lOUFVUX1NIQVBFUyA9IDB4MDA4XG4gICAgICogQ09SRU1MX0ZMQUdfQ1JFQVRFX01MUFJPR1JBTSA9IDB4MDEwXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBTZWUgaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Byb3ZpZGVycy9jb3JlbWwvY29yZW1sX3Byb3ZpZGVyX2ZhY3RvcnkuaCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogVGhpcyBmbGFnIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcpLlxuICAgICAqL1xuICAgIGNvcmVNbEZsYWdzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byB1c2UgQ1BVIG9ubHkgaW4gQ29yZU1MIEVQLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIHVzZUNQVU9ubHk/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byBlbmFibGUgQ29yZU1MIEVQIG9uIHN1YmdyYXBoLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIGVuYWJsZU9uU3ViZ3JhcGg/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byBvbmx5IGVuYWJsZSBDb3JlTUwgRVAgZm9yIEFwcGxlIGRldmljZXMgd2l0aCBBTkUgKEFwcGxlIE5ldXJhbCBFbmdpbmUpLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIG9ubHlFbmFibGVEZXZpY2VXaXRoQU5FPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ25uYXBpJztcbiAgICB1c2VGUDE2PzogYm9vbGVhbjtcbiAgICB1c2VOQ0hXPzogYm9vbGVhbjtcbiAgICBjcHVEaXNhYmxlZD86IGJvb2xlYW47XG4gICAgY3B1T25seT86IGJvb2xlYW47XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHJ1biBvcHRpb25zXG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIGNvbmZpZ3VyYXRpb25zIGZvciBpbmZlcmVuY2UgcnVuIGJlaGF2aW9yXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFJ1bk9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dTZXZlcml0eUxldmVsPzogMHwxfDJ8M3w0O1xuXG4gICAgLyoqXG4gICAgICogTG9nIHZlcmJvc2l0eSBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKi9cbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRlcm1pbmF0ZSBhbGwgaW5jb21wbGV0ZSBPcnRSdW4gY2FsbHMgYXMgc29vbiBhcyBwb3NzaWJsZSBpZiB0cnVlXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgdGVybWluYXRlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEEgdGFnIGZvciB0aGUgUnVuKCkgY2FsbHMgdXNpbmcgdGhpc1xuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIHRhZz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNldCBhIHNpbmdsZSBydW4gY29uZmlndXJhdGlvbiBlbnRyeS4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Nlc3Npb24vXG4gICAgICogb25ueHJ1bnRpbWVfcnVuX29wdGlvbnNfY29uZmlnX2tleXMuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogZXh0cmE6IHtcbiAgICAgKiAgIG1lbW9yeToge1xuICAgICAqICAgICBlbmFibGVfbWVtb3J5X2FyZW5hX3Nocmlua2FnZTogXCIxXCIsXG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGV4dHJhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB2YWx1ZSBtZXRhZGF0YVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlXG4gIGludGVyZmFjZSBWYWx1ZU1ldGFkYXRhIHtcbiAgICAvLyBUQkRcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBydW50aW1lIGluc3RhbmNlIG9mIGFuIE9OTlggbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbiB7XG4gIC8vICNyZWdpb24gcnVuKClcblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1bihmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgdGhlIG1vZGVsIGFzeW5jaHJvbm91c2x5IHdpdGggdGhlIGdpdmVuIGZlZWRzLCBmZXRjaGVzIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLklucHV0VHlwZWAgZm9yIGRldGFpbC5cbiAgICogQHBhcmFtIGZldGNoZXMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgb3V0cHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5PdXRwdXRUeXBlYCBmb3JcbiAgICogZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1bihmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHJlbGVhc2UoKVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlIHRoZSBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgdGhlIHVuZGVybHlpbmcgcmVzb3VyY2VzLlxuICAgKi9cbiAgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHByb2ZpbGluZ1xuXG4gIC8qKlxuICAgKiBTdGFydCBwcm9maWxpbmcuXG4gICAqL1xuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBFbmQgcHJvZmlsaW5nLlxuICAgKi9cbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQ7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0YWRhdGFcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8vIC8qKlxuICAvLyAgKiBHZXQgaW5wdXQgbWV0YWRhdGEgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgLy8gICovXG4gIC8vIHJlYWRvbmx5IGlucHV0TWV0YWRhdGE6IFJlYWRvbmx5QXJyYXk8UmVhZG9ubHk8SW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhPj47XG5cbiAgLy8gLyoqXG4gIC8vICAqIEdldCBvdXRwdXQgbWV0YWRhdGEgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgLy8gICovXG4gIC8vIHJlYWRvbmx5IG91dHB1dE1ldGFkYXRhOiBSZWFkb25seUFycmF5PFJlYWRvbmx5PEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YT4+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gY3JlYXRlKClcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gT05OWCBtb2RlbCBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gdXJpIC0gVGhlIFVSSSBvciBmaWxlIHBhdGggb2YgdGhlIG1vZGVsIHRvIGxvYWQuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXG4gICAqL1xuICBjcmVhdGUodXJpOiBzdHJpbmcsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIHNlZ21lbnQgb2YgYW4gYXJyYXkgYnVmZXIuXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBbiBBcnJheUJ1ZmZlciByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gYnl0ZU9mZnNldCAtIFRoZSBiZWdpbm5pbmcgb2YgdGhlIHNwZWNpZmllZCBwb3J0aW9uIG9mIHRoZSBhcnJheSBidWZmZXIuXG4gICAqIEBwYXJhbSBieXRlTGVuZ3RoIC0gVGhlIGxlbmd0aCBpbiBieXRlcyBvZiB0aGUgYXJyYXkgYnVmZmVyLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg/OiBudW1iZXIsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGEgVWludDhBcnJheS5cbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciAtIEEgVWludDhBcnJheSByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IEluZmVyZW5jZVNlc3Npb246IEluZmVyZW5jZVNlc3Npb25GYWN0b3J5ID0gSW5mZXJlbmNlU2Vzc2lvbkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7T3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLCBPcHRpb25zVGVuc29yTGF5b3V0fSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JUb0RhdGFVcmxPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udmVyc2lvblV0aWxzIHtcbiAgLyoqXG4gICAqIGNyZWF0ZXMgYSBEYXRhVVJMIGluc3RhbmNlIGZyb20gdGVuc29yXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyBhIERhdGFVUkwgaW5zdGFuY2UgZnJvbSB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGBmb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIEByZXR1cm5zIGEgRGF0YVVSTCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBpbWFnZSBjb252ZXJ0ZWQgZnJvbSB0ZW5zb3IgZGF0YVxuICAgKi9cbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBjcmVhdGVzIGFuIEltYWdlRGF0YSBpbnN0YW5jZSBmcm9tIHRlbnNvclxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgYW4gSW1hZ2VEYXRhIGluc3RhbmNlIGZyb20gdGhlIHRlbnNvci5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgZm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiBAcmV0dXJucyBhbiBJbWFnZURhdGEgaW5zdGFuY2UgcmVwcmVzZW50aW5nIHRoZSBpbWFnZSBjb252ZXJ0ZWQgZnJvbSB0ZW5zb3IgZGF0YVxuICAgKi9cbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YTtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3IsIFR5cGVkVGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmV4cG9ydCB0eXBlIEltYWdlRm9ybWF0ID0gJ1JHQid8J1JHQkEnfCdCR1InfCdSQkcnO1xuZXhwb3J0IHR5cGUgSW1hZ2VUZW5zb3JMYXlvdXQgPSAnTkhXQyd8J05DSFcnO1xuXG4vLyB0aGUgZm9sbG93aW5nIHJlZ2lvbiBjb250YWlucyB0eXBlIGRlZmluaXRpb25zIGZvciBjb25zdHJ1Y3RpbmcgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvbi5cblxuLy8gI3JlZ2lvbiB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvblxuXG4vKipcbiAqIHJlcHJlc2VudCBjb21tb24gcHJvcGVydGllcyBvZiB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHNwZWNpZmljIGxvY2F0aW9uLlxuICovXG5pbnRlcmZhY2UgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IGV4dGVuZHMgUGljazxUZW5zb3IsICdkaW1zJz4ge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSB0eXBlOiBUO1xufVxuXG4vKipcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIEdQVSByZXNvdXJjZS5cbiAqL1xuaW50ZXJmYWNlIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xuICAvKipcbiAgICogYW4gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZG93bmxvYWQgZGF0YSBmcm9tIEdQVSB0byBDUFUuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgdGhlIHRlbnNvciB0cmVhdCB0aGUgR1BVIGRhdGEgYXMgZXh0ZXJuYWwgcmVzb3VyY2UuXG4gICAqL1xuICBkb3dubG9hZD8oKTogUHJvbWlzZTxUZW5zb3IuRGF0YVR5cGVNYXBbVF0+O1xuXG4gIC8qKlxuICAgKiBhbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHRlbnNvciBpcyBkaXNwb3NlZC5cbiAgICpcbiAgICogSWYgbm90IHByb3ZpZGVkLCB0aGUgdGVuc29yIHRyZWF0IHRoZSBHUFUgZGF0YSBhcyBleHRlcm5hbCByZXNvdXJjZS5cbiAgICovXG4gIGRpc3Bvc2U/KCk6IHZvaWQ7XG59XG5cbi8qKlxuICogcmVwcmVzZW50IHRoZSBwYXJhbWV0ZXIgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgcGlubmVkIENQVSBidWZmZXJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VCBleHRlbmRzIFRlbnNvci5DcHVQaW5uZWREYXRhVHlwZXMgPSBUZW5zb3IuQ3B1UGlubmVkRGF0YVR5cGVzPiBleHRlbmRzXG4gICAgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICdjcHUtcGlubmVkJy5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAnY3B1LXBpbm5lZCc7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBDUFUgcGlubmVkIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICovXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcbn1cblxuLyoqXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLlRleHR1cmVEYXRhVHlwZXMgPSBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcz4gZXh0ZW5kc1xuICAgIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiwgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gYmUgJ3RleHR1cmUnLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246ICd0ZXh0dXJlJztcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIFdlYkdMIHRleHR1cmUgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqL1xuICByZWFkb25seSB0ZXh0dXJlOiBUZW5zb3IuVGV4dHVyZVR5cGU7XG59XG5cbi8qKlxuICogcmVwcmVzZW50IHRoZSBwYXJhbWV0ZXIgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViR1BVIGJ1ZmZlclxuICovXG5leHBvcnQgaW50ZXJmYWNlIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcyA9IFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXM+IGV4dGVuZHNcbiAgICBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4sIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICdncHUtYnVmZmVyJy5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAnZ3B1LWJ1ZmZlcic7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBXZWJHUFUgYnVmZmVyIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKi9cbiAgcmVhZG9ubHkgZ3B1QnVmZmVyOiBUZW5zb3IuR3B1QnVmZmVyVHlwZTtcbn1cblxuLy8gI2VuZHJlZ2lvblxuXG4vLyB0aGUgZm9sbG93aW5nIHJlZ2lvbiBjb250YWlucyB0eXBlIGRlZmluaXRpb25zIG9mIGVhY2ggaW5kaXZpZHVhbCBvcHRpb25zLlxuLy8gdGhlIHRlbnNvciBmYWN0b3J5IGZ1bmN0aW9ucyB1c2UgYSBjb21wb3NpdGlvbiBvZiB0aG9zZSBvcHRpb25zIGFzIHRoZSBwYXJhbWV0ZXIgdHlwZS5cblxuLy8gI3JlZ2lvbiBPcHRpb25zIGZpZWxkc1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNGb3JtYXQge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSBmb3JtYXQgcmVwcmVzZW50ZWQgaW4gUkdCQSBjb2xvciBzcGFjZS5cbiAgICovXG4gIGZvcm1hdD86IEltYWdlRm9ybWF0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JGb3JtYXQge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSBmb3JtYXQgb2YgdGhlIHRlbnNvci5cbiAgICpcbiAgICogTk9URTogdGhpcyBpcyBkaWZmZXJlbnQgZnJvbSBvcHRpb24gJ2Zvcm1hdCcuIFdoaWxlIG9wdGlvbiAnZm9ybWF0JyByZXByZXNlbnRzIHRoZSBvcmlnaW5hbCBpbWFnZSwgJ3RlbnNvckZvcm1hdCdcbiAgICogcmVwcmVzZW50cyB0aGUgdGFyZ2V0IGZvcm1hdCBvZiB0aGUgdGVuc29yLiBBIHRyYW5zcG9zZSB3aWxsIGJlIHBlcmZvcm1lZCBpZiB0aGV5IGFyZSBkaWZmZXJlbnQuXG4gICAqL1xuICB0ZW5zb3JGb3JtYXQ/OiBJbWFnZUZvcm1hdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zVGVuc29yRGF0YVR5cGUge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIGRhdGFUeXBlPzogJ2Zsb2F0MzInfCd1aW50OCc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc1RlbnNvckxheW91dCB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIHRlbnNvciBsYXlvdXQgd2hlbiByZXByZXNlbnRpbmcgZGF0YSBvZiBvbmUgb3IgbW9yZSBpbWFnZShzKS5cbiAgICovXG4gIHRlbnNvckxheW91dD86IEltYWdlVGVuc29yTGF5b3V0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNEaW1lbnNpb25zIHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgaW1hZ2UgaGVpZ2h0IGluIHBpeGVsXG4gICAqL1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIHdpZHRoIGluIHBpeGVsXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25SZXNpemVkRGltZW5zaW9ucyB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIHJlc2l6ZWQgaGVpZ2h0LiBJZiBvbWl0dGVkLCBvcmlnaW5hbCBoZWlnaHQgd2lsbCBiZSB1c2VkLlxuICAgKi9cbiAgcmVzaXplZEhlaWdodD86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyByZXNpemVkIHdpZHRoIC0gY2FuIGJlIGFjY2Vzc2VkIHZpYSB0ZW5zb3IgZGltZW5zaW9ucyBhcyB3ZWxsXG4gICAqL1xuICByZXNpemVkV2lkdGg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyBub3JtYWxpemF0aW9uIHBhcmFtZXRlcnMgd2hlbiBwcmVwcm9jZXNzaW5nIHRoZSBpbWFnZSBhcyBtb2RlbCBpbnB1dC5cbiAgICpcbiAgICogRGF0YSBlbGVtZW50IGFyZSByYW5nZWQgZnJvbSAwIHRvIDI1NS5cbiAgICovXG4gIG5vcm0/OiB7XG4gICAgLyoqXG4gICAgICogVGhlICdiaWFzJyB2YWx1ZSBmb3IgaW1hZ2Ugbm9ybWFsaXphdGlvbi5cbiAgICAgKiAtIElmIG9taXR0ZWQsIHVzZSBkZWZhdWx0IHZhbHVlIDAuXG4gICAgICogLSBJZiBpdCdzIGEgc2luZ2xlIG51bWJlciwgYXBwbHkgdG8gZWFjaCBjaGFubmVsXG4gICAgICogLSBJZiBpdCdzIGFuIGFycmF5IG9mIDMgb3IgNCBudW1iZXJzLCBhcHBseSBlbGVtZW50LXdpc2UuIE51bWJlciBvZiBlbGVtZW50cyBuZWVkIHRvIG1hdGNoIHRoZSBudW1iZXIgb2YgY2hhbm5lbHNcbiAgICAgKiBmb3IgdGhlIGNvcnJlc3BvbmRpbmcgaW1hZ2UgZm9ybWF0XG4gICAgICovXG4gICAgYmlhcz86IG51bWJlcnxbbnVtYmVyLCBudW1iZXIsIG51bWJlcl18W251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgLyoqXG4gICAgICogVGhlICdtZWFuJyB2YWx1ZSBmb3IgaW1hZ2Ugbm9ybWFsaXphdGlvbi5cbiAgICAgKiAtIElmIG9taXR0ZWQsIHVzZSBkZWZhdWx0IHZhbHVlIDI1NS5cbiAgICAgKiAtIElmIGl0J3MgYSBzaW5nbGUgbnVtYmVyLCBhcHBseSB0byBlYWNoIGNoYW5uZWxcbiAgICAgKiAtIElmIGl0J3MgYW4gYXJyYXkgb2YgMyBvciA0IG51bWJlcnMsIGFwcGx5IGVsZW1lbnQtd2lzZS4gTnVtYmVyIG9mIGVsZW1lbnRzIG5lZWQgdG8gbWF0Y2ggdGhlIG51bWJlciBvZiBjaGFubmVsc1xuICAgICAqIGZvciB0aGUgY29ycmVzcG9uZGluZyBpbWFnZSBmb3JtYXRcbiAgICAgKi9cbiAgICBtZWFuPzogbnVtYmVyIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIH07XG59XG5cbi8vICNlbmRyZWdpb25cblxuLy8gI3JlZ2lvbiBPcHRpb25zIGNvbXBvc2l0aW9uXG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMgZXh0ZW5kcyBPcHRpb25SZXNpemVkRGltZW5zaW9ucywgT3B0aW9uc1RlbnNvckZvcm1hdCwgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zIGV4dGVuZHMgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsIE9wdGlvbnNUZW5zb3JGb3JtYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc1RlbnNvckRhdGFUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21VcmxPcHRpb25zIGV4dGVuZHMgT3B0aW9uc0RpbWVuc2lvbnMsIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLCBPcHRpb25zVGVuc29yRm9ybWF0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNUZW5zb3JMYXlvdXQsIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zIGV4dGVuZHMgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsIE9wdGlvbnNUZW5zb3JGb3JtYXQsIE9wdGlvbnNUZW5zb3JMYXlvdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLlRleHR1cmVEYXRhVHlwZXM+IGV4dGVuZHNcbiAgICBSZXF1aXJlZDxPcHRpb25zRGltZW5zaW9ucz4sIE9wdGlvbnNGb3JtYXQsIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+LyogVE9ETzogYWRkIG1vcmUgKi8ge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz4gZXh0ZW5kc1xuICAgIFBpY2s8VGVuc29yLCAnZGltcyc+LCBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgZGF0YVR5cGU/OiBUO1xufVxuXG4vLyAjZW5kcmVnaW9uXG5cbi8qKlxuICogdHlwZSBUZW5zb3JGYWN0b3J5IGRlZmluZXMgdGhlIGZhY3RvcnkgZnVuY3Rpb25zIG9mICdUZW5zb3InIHRvIGNyZWF0ZSB0ZW5zb3IgaW5zdGFuY2VzIGZyb20gZXhpc3RpbmcgZGF0YSBvclxuICogcmVzb3VyY2VzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZhY3Rvcnkge1xuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYW4gSW1hZ2VEYXRhIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2VEYXRhIC0gdGhlIEltYWdlRGF0YSBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBJbWFnZURhdGEuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21JbWFnZShpbWFnZURhdGE6IEltYWdlRGF0YSwgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zKTpcbiAgICAgIFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPnxUeXBlZFRlbnNvcjwndWludDgnPj47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgSFRNTEltYWdlRWxlbWVudCBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIGltYWdlRWxlbWVudCAtIHRoZSBIVE1MSW1hZ2VFbGVtZW50IG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIEhUTUxJbWFnZUVsZW1lbnQuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21JbWFnZShpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQsIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyk6XG4gICAgICBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz58VHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBVUkxcbiAgICpcbiAgICogQHBhcmFtIHVybFNvdXJjZSAtIGEgc3RyaW5nIGFzIGEgVVJMIHRvIHRoZSBpbWFnZSBvciBhIGRhdGEgVVJMIGNvbnRhaW5pbmcgdGhlIGltYWdlIGRhdGEuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBVUkwuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21JbWFnZSh1cmxTb3VyY2U6IHN0cmluZywgb3B0aW9ucz86IFRlbnNvckZyb21VcmxPcHRpb25zKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+fFR5cGVkVGVuc29yPCd1aW50OCc+PjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYW4gSW1hZ2VCaXRtYXAgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBiaXRtYXAgLSB0aGUgSW1hZ2VCaXRtYXAgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gVVJMLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIC0gYGRhdGFUeXBlYDogYCdmbG9hdDMyJ2BcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tSW1hZ2UoYml0bWFwOiBJbWFnZUJpdG1hcCwgb3B0aW9uczogVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz58VHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcbiAgICpcbiAgICogQHBhcmFtIHRleHR1cmUgLSB0aGUgV2ViR0xUZXh0dXJlIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFdlYkdMIHRleHR1cmUuXG4gICAqXG4gICAqIFRoZSBvcHRpb25zIGluY2x1ZGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAqIC0gYHdpZHRoYDogdGhlIHdpZHRoIG9mIHRoZSB0ZXh0dXJlLiBSZXF1aXJlZC5cbiAgICogLSBgaGVpZ2h0YDogdGhlIGhlaWdodCBvZiB0aGUgdGV4dHVyZS4gUmVxdWlyZWQuXG4gICAqIC0gYGZvcm1hdGA6IHRoZSBmb3JtYXQgb2YgdGhlIHRleHR1cmUuIElmIG9taXR0ZWQsIGFzc3VtZSAnUkdCQScuXG4gICAqIC0gYGRvd25sb2FkYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZG93bmxvYWQgdGhlIHRlbnNvciBkYXRhIGZyb20gR1BVIHRvIENQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhXG4gICAqIHdpbGwgbm90IGJlIGFibGUgdG8gZG93bmxvYWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndFxuICAgKiBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICogLSBgZGlzcG9zZWA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3Bvc2UgdGhlIHRlbnNvciBkYXRhIG9uIEdQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxuICAgKiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3QgbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbVRleHR1cmU8VCBleHRlbmRzIFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzID0gJ2Zsb2F0MzInPihcbiAgICAgIHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZSwgb3B0aW9uczogVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQ+KTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSB0aGUgR1BVQnVmZmVyIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFdlYkdQVSBidWZmZXIuXG4gICAqXG4gICAqIFRoZSBvcHRpb25zIGluY2x1ZGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAqIC0gYGRhdGFUeXBlYDogdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhc3N1bWUgJ2Zsb2F0MzInLlxuICAgKiAtIGBkaW1zYDogdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBSZXF1aXJlZC5cbiAgICogLSBgZG93bmxvYWRgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkb3dubG9hZCB0aGUgdGVuc29yIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGFcbiAgICogd2lsbCBub3QgYmUgYWJsZSB0byBkb3dubG9hZC4gVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0XG4gICAqIG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKiAtIGBkaXNwb3NlYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdGVuc29yIGRhdGEgb24gR1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGEgd2lsbCBub3QgYmUgZGlzcG9zZWQuXG4gICAqIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndCBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tR3B1QnVmZmVyPFQgZXh0ZW5kcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzPihcbiAgICAgIGJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGUsIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+KTogVHlwZWRUZW5zb3I8VD47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgcHJlLWFsbG9jYXRlZCBidWZmZXIuIFRoZSBidWZmZXIgd2lsbCBiZSB1c2VkIGFzIGEgcGlubmVkIGJ1ZmZlci5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSB0aGUgdGVuc29yIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGJ1ZmZlciAtIGEgVHlwZWRBcnJheSBjb3JyZXNwb25kaW5nIHRvIHRoZSB0eXBlLlxuICAgKiBAcGFyYW0gZGltcyAtIHNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICpcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tUGlubmVkQnVmZmVyPFQgZXh0ZW5kcyBFeGNsdWRlPFRlbnNvci5UeXBlLCAnc3RyaW5nJz4+KFxuICAgICAgdHlwZTogVCwgYnVmZmVyOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF0sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPFQ+O1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKipcbiAqIEEgc3RyaW5nIHRoYXQgcmVwcmVzZW50cyBhIGZpbGUncyBVUkwgb3IgcGF0aC5cbiAqXG4gKiBQYXRoIGlzIHZhaWxhYmxlIG9ubHkgaW4gb25ueHJ1bnRpbWUtbm9kZSBvciBvbm54cnVudGltZS13ZWIgcnVubmluZyBpbiBOb2RlLmpzLlxuICovXG5leHBvcnQgdHlwZSBGaWxlVXJsT3JQYXRoID0gc3RyaW5nO1xuXG4vKipcbiAqIEEgQmxvYiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmlsZS5cbiAqL1xuZXhwb3J0IHR5cGUgRmlsZUJsb2IgPSBCbG9iO1xuXG4vKipcbiAqIEEgVWludDhBcnJheSwgQXJyYXlCdWZmZXIgb3IgU2hhcmVkQXJyYXlCdWZmZXIgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGZpbGUgY29udGVudC5cbiAqXG4gKiBXaGVuIGl0IGlzIGFuIEFycmF5QnVmZmVyIG9yIFNoYXJlZEFycmF5QnVmZmVyLCB0aGUgd2hvbGUgYnVmZmVyIGlzIGFzc3VtZWQgdG8gYmUgdGhlIGZpbGUgY29udGVudC5cbiAqL1xuZXhwb3J0IHR5cGUgRmlsZURhdGEgPSBVaW50OEFycmF5fEFycmF5QnVmZmVyTGlrZTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZmlsZSB0aGF0IGNhbiBiZSBsb2FkZWQgYnkgdGhlIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSS5cbiAqL1xuZXhwb3J0IHR5cGUgRmlsZVR5cGUgPSBGaWxlVXJsT3JQYXRofEZpbGVCbG9ifEZpbGVEYXRhO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXh0ZXJuYWwgZGF0YSBmaWxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVybmFsRGF0YUZpbGVEZXNjcmlwdGlvbiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBleHRlcm5hbCBkYXRhIGZpbGUuXG4gICAqL1xuICBkYXRhOiBGaWxlVHlwZTtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGZpbGUgcGF0aC5cbiAgICovXG4gIHBhdGg6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGV4dGVybmFsIGRhdGEgZmlsZS5cbiAqXG4gKiBXaGVuIHVzaW5nIGEgc3RyaW5nLCBpdCBzaG91bGQgYmUgYSBmaWxlIFVSTCBvciBwYXRoIHRoYXQgaW4gdGhlIHNhbWUgZGlyZWN0b3J5IGFzIHRoZSBtb2RlbCBmaWxlLlxuICovXG5leHBvcnQgdHlwZSBFeHRlcm5hbERhdGFGaWxlVHlwZSA9IEV4dGVybmFsRGF0YUZpbGVEZXNjcmlwdGlvbnxGaWxlVXJsT3JQYXRoO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIG1vZGVsIGxvYWRpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT25ueE1vZGVsT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5aW5nIGEgbGlzdCBvZiBmaWxlcyB0aGF0IHJlcHJlc2VudHMgdGhlIGV4dGVybmFsIGRhdGEuXG4gICAqL1xuICBleHRlcm5hbERhdGE/OiByZWFkb25seSBFeHRlcm5hbERhdGFGaWxlVHlwZVtdO1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG5leHBvcnQgdHlwZSBOb25UZW5zb3JUeXBlID0gbmV2ZXI7XG5cbi8qKlxuICogVHlwZSBPbm54VmFsdWUgUmVwcmVzZW50cyBib3RoIHRlbnNvcnMgYW5kIG5vbi10ZW5zb3JzIHZhbHVlIGZvciBtb2RlbCdzIGlucHV0cy9vdXRwdXRzLlxuICpcbiAqIE5PVEU6IGN1cnJlbnRseSBub3Qgc3VwcG9ydCBub24tdGVuc29yXG4gKi9cbmV4cG9ydCB0eXBlIE9ubnhWYWx1ZSA9IFRlbnNvcnxOb25UZW5zb3JUeXBlO1xuXG4vKipcbiAqIFR5cGUgT25ueFZhbHVlRGF0YUxvY2F0aW9uIHJlcHJlc2VudHMgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIG9mIGFuIE9ubnhWYWx1ZS5cbiAqL1xuZXhwb3J0IHR5cGUgT25ueFZhbHVlRGF0YUxvY2F0aW9uID0gVGVuc29yLkRhdGFMb2NhdGlvbjtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtyZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVyc30gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xuaW1wb3J0IHtTZXNzaW9uSGFuZGxlciwgVHJhaW5pbmdTZXNzaW9uSGFuZGxlcn0gZnJvbSAnLi9iYWNrZW5kLmpzJztcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcbmltcG9ydCB7T25ueFZhbHVlfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuaW1wb3J0IHtUZW5zb3J9IGZyb20gJy4vdGVuc29yLmpzJztcbmltcG9ydCB7VHJhaW5pbmdTZXNzaW9uIGFzIFRyYWluaW5nU2Vzc2lvbkludGVyZmFjZSwgVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9uc30gZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLmpzJztcblxudHlwZSBTZXNzaW9uT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnM7XG50eXBlIEZlZWRzVHlwZSA9IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlO1xudHlwZSBGZXRjaGVzVHlwZSA9IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGU7XG50eXBlIFJldHVyblR5cGUgPSBJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU7XG50eXBlIFJ1bk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnM7XG5cbmNvbnN0IG5vQmFja2VuZEVyck1zZzogc3RyaW5nID0gJ1RyYWluaW5nIGJhY2tlbmQgY291bGQgbm90IGJlIHJlc29sdmVkLiAnICtcbiAgICAnTWFrZSBzdXJlIHlvdVxcJ3JlIHVzaW5nIHRoZSBjb3JyZWN0IGNvbmZpZ3VyYXRpb24gJiBXZWJBc3NlbWJseSBmaWxlcy4nO1xuXG5leHBvcnQgY2xhc3MgVHJhaW5pbmdTZXNzaW9uIGltcGxlbWVudHMgVHJhaW5pbmdTZXNzaW9uSW50ZXJmYWNlIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihoYW5kbGVyOiBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyLCBoYXNPcHRpbWl6ZXJNb2RlbDogYm9vbGVhbiwgaGFzRXZhbE1vZGVsOiBib29sZWFuKSB7XG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICB0aGlzLmhhc09wdGltaXplck1vZGVsID0gaGFzT3B0aW1pemVyTW9kZWw7XG4gICAgdGhpcy5oYXNFdmFsTW9kZWwgPSBoYXNFdmFsTW9kZWw7XG4gIH1cbiAgcHJpdmF0ZSBoYW5kbGVyOiBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyO1xuICBwcml2YXRlIGhhc09wdGltaXplck1vZGVsOiBib29sZWFuO1xuICBwcml2YXRlIGhhc0V2YWxNb2RlbDogYm9vbGVhbjtcblxuICBnZXQgdHJhaW5pbmdJbnB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmlucHV0TmFtZXM7XG4gIH1cbiAgZ2V0IHRyYWluaW5nT3V0cHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIub3V0cHV0TmFtZXM7XG4gIH1cblxuICBnZXQgZXZhbElucHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLmhhc0V2YWxNb2RlbCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5ldmFsSW5wdXROYW1lcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHRyYWluaW5nIHNlc3Npb24gaGFzIG5vIGV2YWxNb2RlbCBsb2FkZWQuJyk7XG4gICAgfVxuICB9XG4gIGdldCBldmFsT3V0cHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLmhhc0V2YWxNb2RlbCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5ldmFsT3V0cHV0TmFtZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyB0cmFpbmluZyBzZXNzaW9uIGhhcyBubyBldmFsTW9kZWwgbG9hZGVkLicpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUodHJhaW5pbmdPcHRpb25zOiBUcmFpbmluZ1Nlc3Npb25DcmVhdGVPcHRpb25zLCBzZXNzaW9uT3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTpcbiAgICAgIFByb21pc2U8VHJhaW5pbmdTZXNzaW9uPiB7XG4gICAgY29uc3QgZXZhbE1vZGVsOiBzdHJpbmd8VWludDhBcnJheSA9IHRyYWluaW5nT3B0aW9ucy5ldmFsTW9kZWwgfHwgJyc7XG4gICAgY29uc3Qgb3B0aW1pemVyTW9kZWw6IHN0cmluZ3xVaW50OEFycmF5ID0gdHJhaW5pbmdPcHRpb25zLm9wdGltaXplck1vZGVsIHx8ICcnO1xuICAgIGNvbnN0IG9wdGlvbnM6IFNlc3Npb25PcHRpb25zID0gc2Vzc2lvbk9wdGlvbnMgfHwge307XG5cbiAgICAvLyByZXNvbHZlIGJhY2tlbmQsIHVwZGF0ZSBzZXNzaW9uIG9wdGlvbnMgd2l0aCB2YWxpZGF0ZWQgRVBzLCBhbmQgY3JlYXRlIHNlc3Npb24gaGFuZGxlclxuICAgIGNvbnN0IFtiYWNrZW5kLCBvcHRpb25zV2l0aFZhbGlkYXRlZEVQc10gPSBhd2FpdCByZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVycyhvcHRpb25zKTtcbiAgICBpZiAoYmFja2VuZC5jcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGVyKSB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gYXdhaXQgYmFja2VuZC5jcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGVyKFxuICAgICAgICAgIHRyYWluaW5nT3B0aW9ucy5jaGVja3BvaW50U3RhdGUsIHRyYWluaW5nT3B0aW9ucy50cmFpbk1vZGVsLCBldmFsTW9kZWwsIG9wdGltaXplck1vZGVsLFxuICAgICAgICAgIG9wdGlvbnNXaXRoVmFsaWRhdGVkRVBzKTtcbiAgICAgIHJldHVybiBuZXcgVHJhaW5pbmdTZXNzaW9uKGhhbmRsZXIsICEhdHJhaW5pbmdPcHRpb25zLm9wdGltaXplck1vZGVsLCAhIXRyYWluaW5nT3B0aW9ucy5ldmFsTW9kZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3Iobm9CYWNrZW5kRXJyTXNnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIGZ1bmN0aW9uIGZvciBydW5UcmFpblN0ZXAgYW5kIGZ1dHVyZSBydW5TdGVwIG1ldGhvZHMgdGhhdCBoYW5kbGVzIHRoZSB0eXBlLW5hcnJvd2luZyBjb252ZXJzaW9uIGZyb21cbiAgICogdGhlIGdpdmVuIHBhcmFtZXRlcnMgdG8gU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUgYW5kIFJ1bk9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBpbnB1dE5hbWVzIHRoZSBmZWVkcyBvYmplY3QgaXMgY2hlY2tlZCB0aGF0IHRoZXkgY29udGFpbiBhbGwgaW5wdXQgbmFtZXMgaW4gdGhlIHByb3ZpZGVkIGxpc3Qgb2YgaW5wdXRcbiAgICogbmFtZXMuXG4gICAqIEBwYXJhbSBvdXRwdXROYW1lcyB0aGUgZmV0Y2hlcyBvYmplY3QgaXMgY2hlY2tlZCB0aGF0IHRoZWlyIGtleXMgbWF0Y2ggdXAgd2l0aCB2YWxpZCBuYW1lcyBpbiB0aGUgbGlzdCBvZiBvdXRwdXRcbiAgICogbmFtZXMuXG4gICAqIEBwYXJhbSBmZWVkcyB0aGUgcmVxdWlyZWQgaW5wdXRcbiAgICogQHBhcmFtIGFyZzEgbmFycm93ZWQgJiBjb252ZXJ0ZWQgaW50byB0aGUgU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUgb3IgUnVuT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIGFyZzIgb3B0aW9uYWwgUnVuT3B0aW9ucyBvYmplY3QuXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICB0eXBlTmFycm93aW5nRm9yUnVuU3RlcChcbiAgICAgIGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdLCBvdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW10sIGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLFxuICAgICAgYXJnMj86IFJ1bk9wdGlvbnMpOiBbU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUsIFJ1bk9wdGlvbnNdIHtcbiAgICBjb25zdCBmZXRjaGVzOiB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZXxudWxsfSA9IHt9O1xuICAgIGxldCBvcHRpb25zOiBSdW5PcHRpb25zID0ge307XG4gICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgaWYgKHR5cGVvZiBmZWVkcyAhPT0gJ29iamVjdCcgfHwgZmVlZHMgPT09IG51bGwgfHwgZmVlZHMgaW5zdGFuY2VvZiBUZW5zb3IgfHwgQXJyYXkuaXNBcnJheShmZWVkcykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgJ1xcJ2ZlZWRzXFwnIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgdXNlIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy4nKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGZXRjaGVzRW1wdHkgPSB0cnVlO1xuICAgIC8vIGRldGVybWluZSB3aGljaCBvdmVycmlkZSBpcyBiZWluZyB1c2VkXG4gICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGFyZzEgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5leHBlY3RlZCBhcmd1bWVudFsxXTogY2Fubm90IGJlIG51bGwuJyk7XG4gICAgICB9XG4gICAgICBpZiAoYXJnMSBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIGNhbm5vdCBiZSBhIFRlbnNvcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICBpZiAoYXJnMS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIGNhbm5vdCBiZSBhbiBlbXB0eSBhcnJheS4nKTtcbiAgICAgICAgfVxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAvLyBvdXRwdXQgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGFyZzEpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdmZXRjaGVzXFwnIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkgb3IgYW4gb2JqZWN0LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnZmV0Y2hlcycgY29udGFpbnMgaW52YWxpZCBvdXRwdXQgbmFtZTogJHtuYW1lfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkZWNpZGUgd2hldGhlciBhcmcxIGlzIGZldGNoZXMgb3Igb3B0aW9uc1xuICAgICAgICAvLyBpZiBhbnkgb3V0cHV0IG5hbWUgaXMgcHJlc2VudCBhbmQgaXRzIHZhbHVlIGlzIHZhbGlkIE9ubnhWYWx1ZSwgd2UgY29uc2lkZXIgaXQgZmV0Y2hlc1xuICAgICAgICBsZXQgaXNGZXRjaGVzID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFyZzFLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJnMSk7XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBvdXRwdXROYW1lcykge1xuICAgICAgICAgIGlmIChhcmcxS2V5cy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdiA9IChhcmcxIGFzIEluZmVyZW5jZVNlc3Npb24uTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlKVtuYW1lXTtcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsIHx8IHYgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRmV0Y2hlcykge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMgPSBhcmcxIGFzIFJ1bk9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5leHBlY3RlZCBhcmd1bWVudFsxXTogbXVzdCBiZSBcXCdmZXRjaGVzXFwnIG9yIFxcJ29wdGlvbnNcXCcuJyk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgYWxsIGlucHV0cyBhcmUgaW4gZmVlZFxuICAgIGZvciAoY29uc3QgbmFtZSBvZiBpbnB1dE5hbWVzKSB7XG4gICAgICBpZiAodHlwZW9mIGZlZWRzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlucHV0ICcke25hbWV9JyBpcyBtaXNzaW5nIGluICdmZWVkcycuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxuICAgIGlmIChpc0ZldGNoZXNFbXB0eSkge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIG91dHB1dE5hbWVzKSB7XG4gICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbZmV0Y2hlcywgb3B0aW9uc107XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIG1ldGhvZCBmb3IgcnVuVHJhaW5TdGVwIGFuZCBhbnkgb3RoZXIgcnVuU3RlcCBtZXRob2RzLiBUYWtlcyB0aGUgUmV0dXJuVHlwZSByZXN1bHQgZnJvbSB0aGUgU2Vzc2lvbkhhbmRsZXJcbiAgICogYW5kIGNoYW5nZXMgaXQgaW50byBhIG1hcCBvZiBUZW5zb3JzLlxuICAgKlxuICAgKiBAcGFyYW0gcmVzdWx0c1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgY29udmVydEhhbmRsZXJSZXR1cm5UeXBlVG9NYXBPZlRlbnNvcnMocmVzdWx0czogU2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZSk6IFJldHVyblR5cGUge1xuICAgIGNvbnN0IHJldHVyblZhbHVlOiB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX0gPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByZXN1bHRzKSB7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0cywga2V5KSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW2tleV07XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSBuZXcgVGVuc29yKHJlc3VsdC50eXBlLCByZXN1bHQuZGF0YSwgcmVzdWx0LmRpbXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxuXG4gIGFzeW5jIGxhenlSZXNldEdyYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5oYW5kbGVyLmxhenlSZXNldEdyYWQoKTtcbiAgfVxuXG4gIHJ1blRyYWluU3RlcChmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIHJ1blRyYWluU3RlcChmZWVkczogRmVlZHNUeXBlLCBmZXRjaGVzOiBGZXRjaGVzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBhc3luYyBydW5UcmFpblN0ZXAoZmVlZHM6IEZlZWRzVHlwZSwgYXJnMT86IEZldGNoZXNUeXBlfFJ1bk9wdGlvbnMsIGFyZzI/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPiB7XG4gICAgY29uc3QgW2ZldGNoZXMsIG9wdGlvbnNdID1cbiAgICAgICAgdGhpcy50eXBlTmFycm93aW5nRm9yUnVuU3RlcCh0aGlzLnRyYWluaW5nSW5wdXROYW1lcywgdGhpcy50cmFpbmluZ091dHB1dE5hbWVzLCBmZWVkcywgYXJnMSwgYXJnMik7XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuaGFuZGxlci5ydW5UcmFpblN0ZXAoZmVlZHMsIGZldGNoZXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmNvbnZlcnRIYW5kbGVyUmV0dXJuVHlwZVRvTWFwT2ZUZW5zb3JzKHJlc3VsdHMpO1xuICB9XG5cbiAgYXN5bmMgcnVuT3B0aW1pemVyU3RlcChvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zfHVuZGVmaW5lZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmhhc09wdGltaXplck1vZGVsKSB7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZXIucnVuT3B0aW1pemVyU3RlcChvcHRpb25zIHx8IHt9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIFRyYWluaW5nU2Vzc2lvbiBoYXMgbm8gT3B0aW1pemVyTW9kZWwgbG9hZGVkLicpO1xuICAgIH1cbiAgfVxuXG4gIHJ1bkV2YWxTdGVwKGZlZWRzOiBGZWVkc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zfHVuZGVmaW5lZCk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIHJ1bkV2YWxTdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGZldGNoZXM6IEZldGNoZXNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9uc3x1bmRlZmluZWQpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBhc3luYyBydW5FdmFsU3RlcChmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGV8UnVuT3B0aW9ucywgYXJnMj86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+IHtcbiAgICBpZiAodGhpcy5oYXNFdmFsTW9kZWwpIHtcbiAgICAgIGNvbnN0IFtmZXRjaGVzLCBvcHRpb25zXSA9XG4gICAgICAgICAgdGhpcy50eXBlTmFycm93aW5nRm9yUnVuU3RlcCh0aGlzLmV2YWxJbnB1dE5hbWVzLCB0aGlzLmV2YWxPdXRwdXROYW1lcywgZmVlZHMsIGFyZzEsIGFyZzIpO1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuaGFuZGxlci5ydW5FdmFsU3RlcChmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gdGhpcy5jb252ZXJ0SGFuZGxlclJldHVyblR5cGVUb01hcE9mVGVuc29ycyhyZXN1bHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIFRyYWluaW5nU2Vzc2lvbiBoYXMgbm8gRXZhbE1vZGVsIGxvYWRlZC4nKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5ID0gdHJ1ZSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5nZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5KTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRQYXJhbWV0ZXJzQnVmZmVyKGFycmF5OiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5ID0gdHJ1ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhcmFtc1NpemUgPSBhd2FpdCB0aGlzLmdldFBhcmFtZXRlcnNTaXplKHRyYWluYWJsZU9ubHkpO1xuICAgIC8vIGNoZWNraW5nIHRoYXQgdGhlIHNpemUgb2YgdGhlIFVpbnQ4QXJyYXkgaXMgZXF1aXZhbGVudCB0byB0aGUgYnl0ZSBsZW5ndGggb2YgYSBGbG9hdDMyQXJyYXkgb2YgdGhlIG51bWJlclxuICAgIC8vIG9mIHBhcmFtZXRlcnNcbiAgICBpZiAoYXJyYXkubGVuZ3RoICE9PSA0ICogcGFyYW1zU2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdTaXplIG9mIHRoZSBidWZmZXIgcGFzc2VkIGludG8gbG9hZFBhcmFtZXRlcnNCdWZmZXIgbXVzdCBtYXRjaCB0aGUgbnVtYmVyIG9mIHBhcmFtZXRlcnMgaW4gJyArXG4gICAgICAgICAgJ3RoZSBtb2RlbC4gUGxlYXNlIHVzZSBnZXRQYXJhbWV0ZXJzU2l6ZSBtZXRob2QgdG8gY2hlY2suJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIubG9hZFBhcmFtZXRlcnNCdWZmZXIoYXJyYXksIHRyYWluYWJsZU9ubHkpO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seSA9IHRydWUpOiBQcm9taXNlPE9ubnhWYWx1ZT4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seSk7XG4gIH1cblxuICBhc3luYyByZWxlYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xuICB9XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7VHJhaW5pbmdTZXNzaW9uIGFzIFRyYWluaW5nU2Vzc2lvbkltcGx9IGZyb20gJy4vdHJhaW5pbmctc2Vzc2lvbi1pbXBsLmpzJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlZGVjbGFyZSAqL1xuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgVHJhaW5pbmdTZXNzaW9uIHtcbiAgLyoqXG4gICAqIEVpdGhlciBVUkkgZmlsZSBwYXRoIChzdHJpbmcpIG9yIFVpbnQ4QXJyYXkgY29udGFpbmluZyBtb2RlbCBvciBjaGVja3BvaW50IGluZm9ybWF0aW9uLlxuICAgKi9cbiAgdHlwZSBVcmlPckJ1ZmZlciA9IHN0cmluZ3xVaW50OEFycmF5O1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIHJ1bnRpbWUgaW5zdGFuY2Ugb2YgYW4gT05OWCB0cmFpbmluZyBzZXNzaW9uLFxuICogd2hpY2ggY29udGFpbnMgYSBtb2RlbCB0aGF0IGNhbiBiZSB0cmFpbmVkLCBhbmQsIG9wdGlvbmFsbHksXG4gKiBhbiBldmFsIGFuZCBvcHRpbWl6ZXIgbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBydW4oKVxuXG4gIC8qKlxuICAgKiBMYXppbHkgcmVzZXRzIHRoZSBncmFkaWVudHMgb2YgYWxsIHRyYWluYWJsZSBwYXJhbWV0ZXJzIHRvIHplcm8uIFNob3VsZCBoYXBwZW4gYWZ0ZXIgdGhlIGludm9jYXRpb24gb2ZcbiAgICogcnVuT3B0aW1pemVyU3RlcC5cbiAgICovXG4gIGxhenlSZXNldEdyYWQoKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUnVuIFRyYWluU3RlcCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5JbnB1dFR5cGVgIGZvclxuICAgZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIHRyYWluaW5nLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuVHJhaW5TdGVwKGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIFJ1biBhIHNpbmdsZSB0cmFpbiBzdGVwIHdpdGggdGhlIGdpdmVuIGlucHV0cyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LlxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuXG4gICAqIGRldGFpbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCB0cmFpbmluZy5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nXG4gICB2YWx1ZXMuXG4gICAqL1xuICBydW5UcmFpblN0ZXAoXG4gICAgICBmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXG4gICAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8qKlxuICAgKiBSdW5zIGEgc2luZ2xlIG9wdGltaXplciBzdGVwLCB3aGljaCBwZXJmb3JtcyB3ZWlnaHQgdXBkYXRlcyBmb3IgdGhlIHRyYWluYWJsZSBwYXJhbWV0ZXJzIHVzaW5nIHRoZSBvcHRpbWl6ZXIgbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgb3B0aW1pemluZy5cbiAgICovXG4gIHJ1bk9wdGltaXplclN0ZXAob3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJ1biBhIHNpbmdsZSBldmFsIHN0ZXAgd2l0aCB0aGUgZ2l2ZW4gaW5wdXRzIGFuZCBvcHRpb25zIHVzaW5nIHRoZSBldmFsIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgZXZhbCBzdGVwLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmdcbiAgIHZhbHVlcy5cbiAgICovXG4gIHJ1bkV2YWxTdGVwKGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIFJ1biBhIHNpbmdsZSBldmFsIHN0ZXAgd2l0aCB0aGUgZ2l2ZW4gaW5wdXRzIGFuZCBvcHRpb25zIHVzaW5nIHRoZSBldmFsIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuXG4gICAqIEBwYXJhbSBmZXRjaGVzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIG91dHB1dC5cbiAgICogZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGV2YWwgc3RlcC5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nXG4gICB2YWx1ZXMuXG4gICAqL1xuICBydW5FdmFsU3RlcChcbiAgICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgZmV0Y2hlczogSW5mZXJlbmNlU2Vzc2lvbi5GZXRjaGVzVHlwZSxcbiAgICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gY29weSBwYXJhbWV0ZXJzXG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgc2l6ZSBvZiBhbGwgcGFyYW1ldGVycyBmb3IgdGhlIHRyYWluaW5nIHN0YXRlLiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBudW1iZXIgb2YgcHJpbWl0aXZlIChkYXRhdHlwZSBvZlxuICAgKiB0aGUgcGFyYW1ldGVycykgZWxlbWVudHMgb2YgYWxsIHRoZSBwYXJhbWV0ZXJzIGluIHRoZSB0cmFpbmluZyBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRyYWluYWJsZU9ubHkgLSBXaGVuIHNldCB0byB0cnVlLCB0aGUgc2l6ZSBpcyBjYWxjdWxhdGVkIGZvciB0cmFpbmFibGUgcGFyYW1zIG9ubHkuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICovXG4gIGdldFBhcmFtZXRlcnNTaXplKHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPG51bWJlcj47XG5cbiAgLyoqXG4gICAqIENvcGllcyBwYXJhbWV0ZXIgdmFsdWVzIGZyb20gdGhlIGdpdmVuIGJ1ZmZlciB0byB0aGUgdHJhaW5pbmcgc3RhdGUuIEN1cnJlbnRseSwgb25seSBzdXBwb3J0aW5nIG1vZGVscyB3aXRoXG4gICAqIHBhcmFtZXRlcnMgb2YgdHlwZSBGbG9hdDMyLlxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQSBVaW50OEFycmF5IHJlcHJlc2VudGF0aW9uIG9mIEZsb2F0MzIgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHRyYWluYWJsZU9ubHkgLSBUcnVlIGlmIHRyYWluYWJsZSBwYXJhbWV0ZXJzIG9ubHkgdG8gYmUgbW9kaWZpZWQsIGZhbHNlIG90aGVyd2lzZS4gRGVmYXVsdCB2YWx1ZSBpcyB0cnVlLlxuICAgKi9cbiAgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYnVmZmVyOiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogQ29waWVzIHRoZSBtb2RlbCBwYXJhbWV0ZXJzIHRvIGEgY29udGlndW91cyBidWZmZXIuIFVzdWFsbHkgdXNlZCBpbiB0aGUgY29udGV4dCBvZiBGZWRlcmF0ZWQgTGVhcm5pbmcuXG4gICAqIEN1cnJlbnRseSwgb25seSBzdXBwb3J0aW5nIG1vZGVscyB3aXRoIHBhcmFtZXRlcnMgb2YgdHlwZSBGbG9hdDMyLlxuICAgKlxuICAgKiBAcGFyYW0gdHJhaW5hYmxlT25seSAtIFdoZW4gc2V0IHRvIHRydWUsIG9ubHkgdHJhaW5hYmxlIHBhcmFtZXRlcnMgYXJlIGNvcGllZC4gVHJhaW5hYmxlIHBhcmFtZXRlcnMgYXJlIHBhcmFtZXRlcnNcbiAgICogZm9yIHdoaWNoIHJlcXVpcmVzX2dyYWQgaXMgc2V0IHRvIHRydWUuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBGbG9hdDMyIE9ubnhWYWx1ZSBvZiB0aGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMuXG4gICAqL1xuICBnZXRDb250aWd1b3VzUGFyYW1ldGVycyh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxPbm54VmFsdWU+O1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcblxuICAvKipcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cbiAgICovXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0YWRhdGFcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgdHJhaW5pbmcgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSB0cmFpbmluZ0lucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBHZXQgb3V0cHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgdHJhaW5pbmcgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSB0cmFpbmluZ091dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgZXZhbCBtb2RlbC4gSXMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZXZhbCBtb2RlbCBpcyBsb2FkZWQuXG4gICAqL1xuICByZWFkb25seSBldmFsSW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldCBvdXRwdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBldmFsIG1vZGVsLiBJcyBhbiBlbXB0eSBhcnJheSBpZiBubyBldmFsIG1vZGVsIGlzIGxvYWRlZC5cbiAgICovXG4gIHJlYWRvbmx5IGV2YWxPdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIG9wdGlvbmFsIHBhcmFtZXRlcnMgdGhhdCBjYW4gYmUgcGFzc2VkIGludG8gdGhlIFRyYWluaW5nU2Vzc2lvbkZhY3RvcnkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBVUkkgb3IgYnVmZmVyIGZvciBhIC5ja3B0IGZpbGUgdGhhdCBjb250YWlucyB0aGUgY2hlY2twb2ludCBmb3IgdGhlIHRyYWluaW5nIG1vZGVsLlxuICAgKi9cbiAgY2hlY2twb2ludFN0YXRlOiBUcmFpbmluZ1Nlc3Npb24uVXJpT3JCdWZmZXI7XG4gIC8qKlxuICAgKiBVUkkgb3IgYnVmZmVyIGZvciB0aGUgLm9ubnggdHJhaW5pbmcgZmlsZS5cbiAgICovXG4gIHRyYWluTW9kZWw6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcjtcbiAgLyoqXG4gICAqIE9wdGlvbmFsLiBVUkkgb3IgYnVmZmVyIGZvciB0aGUgLm9ubnggb3B0aW1pemVyIG1vZGVsIGZpbGUuXG4gICAqL1xuICBvcHRpbWl6ZXJNb2RlbD86IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcjtcbiAgLyoqXG4gICAqIE9wdGlvbmFsLiBVUkkgb3IgYnVmZmVyIGZvciB0aGUgLm9ubnggZXZhbCBtb2RlbCBmaWxlLlxuICAgKi9cbiAgZXZhbE1vZGVsPzogVHJhaW5pbmdTZXNzaW9uLlVyaU9yQnVmZmVyO1xufVxuXG4vKipcbiAqIERlZmluZXMgbWV0aG9kIG92ZXJsb2FkIHBvc3NpYmlsaXRpZXMgZm9yIGNyZWF0aW5nIGEgVHJhaW5pbmdTZXNzaW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYWluaW5nU2Vzc2lvbkZhY3Rvcnkge1xuICAvLyAjcmVnaW9uIGNyZWF0ZSgpXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgVHJhaW5pbmdTZXNzaW9uIGFuZCBhc3luY2hyb25vdXNseSBsb2FkcyBhbnkgbW9kZWxzIHBhc3NlZCBpbiB0aHJvdWdoIHRyYWluaW5nT3B0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0gdHJhaW5pbmdPcHRpb25zIHNwZWNpZnkgbW9kZWxzIGFuZCBjaGVja3BvaW50cyB0byBsb2FkIGludG8gdGhlIFRyYWluaW5nIFNlc3Npb25cbiAgICogQHBhcmFtIHNlc3Npb25PcHRpb25zIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgdHJhaW5pbmcgc2Vzc2lvbiBiZWhhdmlvclxuICAgKlxuICAgKiBAcmV0dXJucyBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBUcmFpbmluZ1Nlc3Npb24gb2JqZWN0XG4gICAqL1xuICBjcmVhdGUodHJhaW5pbmdPcHRpb25zOiBUcmFpbmluZ1Nlc3Npb25DcmVhdGVPcHRpb25zLCBzZXNzaW9uT3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxUcmFpbmluZ1Nlc3Npb24+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IFRyYWluaW5nU2Vzc2lvbjogVHJhaW5pbmdTZXNzaW9uRmFjdG9yeSA9IFRyYWluaW5nU2Vzc2lvbkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8qKlxuICogIyBPTk5YIFJ1bnRpbWUgSmF2YVNjcmlwdCBBUElcbiAqXG4gKiBPTk5YIFJ1bnRpbWUgSmF2YVNjcmlwdCBBUEkgaXMgYSB1bmlmaWVkIEFQSSBmb3IgYWxsIEphdmFTY3JpcHQgdXNhZ2VzLCBpbmNsdWRpbmcgdGhlIGZvbGxvd2luZyBOUE0gcGFja2FnZXM6XG4gKlxuICogLSBbb25ueHJ1bnRpbWUtbm9kZV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtbm9kZSlcbiAqIC0gW29ubnhydW50aW1lLXdlYl0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtd2ViKVxuICogLSBbb25ueHJ1bnRpbWUtcmVhY3QtbmF0aXZlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS1yZWFjdC1uYXRpdmUpXG4gKlxuICogU2VlIGFsc286XG4gKiAtIFtHZXQgU3RhcnRlZF0oaHR0cHM6Ly9vbm54cnVudGltZS5haS9kb2NzL2dldC1zdGFydGVkL3dpdGgtamF2YXNjcmlwdC8pXG4gKiAtIFtJbmZlcmVuY2UgZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUtaW5mZXJlbmNlLWV4YW1wbGVzL3RyZWUvbWFpbi9qcylcbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2JhY2tlbmQuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9lbnYuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90cmFjZS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29ubngtbW9kZWwuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vdHJhaW5pbmctc2Vzc2lvbi5qcyc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAhISh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLm5vZGUpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJ3ZWJ3b3JrZXJcIiAvPlxuXG4vL1xuLy8gKiB0eXBlIGhhY2sgZm9yIFwiSFRNTEltYWdlRWxlbWVudFwiXG4vL1xuLy8gaW4gdHlwZXNjcmlwdCwgdGhlIHR5cGUgb2YgXCJIVE1MSW1hZ2VFbGVtZW50XCIgaXMgZGVmaW5lZCBpbiBsaWIuZG9tLmQudHMsIHdoaWNoIGlzIGNvbmZsaWN0IHdpdGggbGliLndlYndvcmtlci5kLnRzLlxuLy8gd2hlbiB3ZSB1c2Ugd2Vid29ya2VyLCB0aGUgbGliLndlYndvcmtlci5kLnRzIHdpbGwgYmUgdXNlZCwgd2hpY2ggZG9lcyBub3QgaGF2ZSBIVE1MSW1hZ2VFbGVtZW50IGRlZmluZWQuXG4vL1xuLy8gd2Ugd2lsbCBnZXQgdGhlIGZvbGxvd2luZyBlcnJvcnMgY29tcGxhaW5pbmcgdGhhdCBIVE1MSW1hZ2VFbGVtZW50IGlzIG5vdCBkZWZpbmVkOlxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gLi4vY29tbW9uL2Rpc3QvY2pzL3RlbnNvci1mYWN0b3J5LmQudHM6MTg3OjI5IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MSW1hZ2VFbGVtZW50Jy4gRGlkIHlvdSBtZWFuXG4vLyAnSFRNTExJRWxlbWVudCc/XG4vL1xuLy8gMTg3ICAgICBmcm9tSW1hZ2UoaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50LCBvcHRpb25zPzogVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMpOlxuLy8gUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XG4vL1xuLy8gbm9kZV9tb2R1bGVzL0B3ZWJncHUvdHlwZXMvZGlzdC9pbmRleC5kLnRzOjgzOjcgLSBlcnJvciBUUzI1NTI6IENhbm5vdCBmaW5kIG5hbWUgJ0hUTUxJbWFnZUVsZW1lbnQnLiBEaWQgeW91IG1lYW5cbi8vICdIVE1MTElFbGVtZW50Jz9cbi8vXG4vLyA4MyAgICAgfCBIVE1MSW1hZ2VFbGVtZW50XG4vLyAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XG4vL1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyBgSFRNTEltYWdlRWxlbWVudGAgaXMgb25seSB1c2VkIGluIHR5cGUgZGVjbGFyYXRpb24gYW5kIG5vdCBpbiByZWFsIGNvZGUuIFNvIHdlIGRlZmluZSBpdCBhcyBgdW5rbm93bmAgaGVyZSB0b1xuLy8gYnlwYXNzIHRoZSB0eXBlIGNoZWNrLlxuXG4vL1xuLy8gKiB0eXBlIGhhY2sgZm9yIFwiZG9jdW1lbnRcIlxuLy9cbi8vIGluIHR5cGVzY3JpcHQsIHRoZSB0eXBlIG9mIFwiZG9jdW1lbnRcIiBpcyBkZWZpbmVkIGluIGxpYi5kb20uZC50cywgc28gaXQncyBub3QgYXZhaWxhYmxlIGluIHdlYndvcmtlci5cbi8vXG4vLyB3ZSB3aWxsIGdldCB0aGUgZm9sbG93aW5nIGVycm9ycyBjb21wbGFpbmluZyB0aGF0IGRvY3VtZW50IGlzIG5vdCBkZWZpbmVkOlxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHM6NzozMyAtIGVycm9yIFRTMjU4NDogQ2Fubm90IGZpbmQgbmFtZSAnZG9jdW1lbnQnLiBEbyB5b3UgbmVlZCB0byBjaGFuZ2UgeW91ciB0YXJnZXRcbi8vIGxpYnJhcnk/IFRyeSBjaGFuZ2luZyB0aGUgJ2xpYicgY29tcGlsZXIgb3B0aW9uIHRvIGluY2x1ZGUgJ2RvbScuXG4vL1xuLy8gNyBleHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5cbi8vXG4vLyBsaWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50czo3OjYxIC0gZXJyb3IgVFMyNTg0OiBDYW5ub3QgZmluZCBuYW1lICdkb2N1bWVudCcuIERvIHlvdSBuZWVkIHRvIGNoYW5nZSB5b3VyIHRhcmdldFxuLy8gbGlicmFyeT8gVHJ5IGNoYW5naW5nIHRoZSAnbGliJyBjb21waWxlciBvcHRpb24gdG8gaW5jbHVkZSAnZG9tJy5cbi8vXG4vLyA3IGV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gKGRvY3VtZW50Py5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5cbi8vXG4vLyBsaWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50czo3Ojg4IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MU2NyaXB0RWxlbWVudCcuIERpZCB5b3UgbWVhblxuLy8gJ0hUTUxMSUVsZW1lbnQnP1xuLy9cbi8vIDcgZXhwb3J0IGNvbnN0IHNjcmlwdFNyYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAoZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmMgOlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+flxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyBgZG9jdW1lbnRgIGlzIHVzZWQgdG8gZ2V0IHRoZSBjdXJyZW50IHNjcmlwdCBVUkwsIHdoaWNoIGlzIG5vdCBhdmFpbGFibGUgaW4gd2Vid29ya2VyLiBUaGlzIGZpbGUgaXMgc2VydmVkIGFzIGFcbi8vIFwiZHVhbFwiIGZpbGUgZm9yIGVudHJpZXMgb2YgYm90aCB3ZWJ3b3JrZXIgYW5kIHRoZSBlc20gbW9kdWxlLlxuLy9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdHlwZSBIVE1MSW1hZ2VFbGVtZW50ID0gdW5rbm93bjtcbiAgdHlwZSBIVE1MU2NyaXB0RWxlbWVudCA9IHtzcmM/OiBzdHJpbmd9O1xuICBjb25zdCBkb2N1bWVudDogdW5kZWZpbmVkfHtjdXJyZW50U2NyaXB0PzogSFRNTFNjcmlwdEVsZW1lbnR9O1xufVxuXG4vKipcbiAqIEBzdW1tYXJ5XG4gKlxuICogVGhpcyBmaWxlIGlzIHNlcnZlZCBhcyBhIFwiZHVhbFwiIGZpbGUgZm9yIGJvdGggZW50cmllcyBvZiB0aGUgZm9sbG93aW5nOlxuICogLSBUaGUgcHJveHkgd29ya2VyIGl0c2VsZi5cbiAqICAgLSBXaGVuIHVzZWQgYXMgYSB3b3JrZXIsIGl0IGxpc3RlbnMgdG8gdGhlIG1lc3NhZ2VzIGZyb20gdGhlIG1haW4gdGhyZWFkIGFuZCBwZXJmb3JtcyB0aGUgY29ycmVzcG9uZGluZyBvcGVyYXRpb25zLlxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCBkaXJlY3RseSB1c2luZyBgbmV3IFdvcmtlcigpYCBpbiB0aGUgbWFpbiB0aHJlYWQuXG4gKlxuICogLSBUaGUgRVNNIG1vZHVsZSB0aGF0IGNyZWF0ZXMgdGhlIHByb3h5IHdvcmtlciAoYXMgYSB3b3JrZXIgbGF1bmNoZXIpLlxuICogICAtIFdoZW4gdXNlZCBhcyBhIHdvcmtlciBsYXVuY2hlciwgaXQgY3JlYXRlcyB0aGUgcHJveHkgd29ya2VyIGFuZCByZXR1cm5zIGl0LlxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCB1c2luZyBgaW1wb3J0KClgIGluIHRoZSBtYWluIHRocmVhZCwgd2l0aCB0aGUgcXVlcnkgcGFyYW1ldGVyIGBpbXBvcnQ9MWAuXG4gKlxuICogVGhpcyBmaWxlIHdpbGwgYmUgYWx3YXlzIGNvbXBpbGluZyBpbnRvIEVTTSBmb3JtYXQuXG4gKi9cblxuaW1wb3J0IHR5cGUge09ydFdhc21NZXNzYWdlLCBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YX0gZnJvbSAnLi4vcHJveHktbWVzc2FnZXMuanMnO1xuaW1wb3J0IHtjcmVhdGVTZXNzaW9uLCBjb3B5RnJvbUV4dGVybmFsQnVmZmVyLCBlbmRQcm9maWxpbmcsIGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzLCBpbml0RXAsIGluaXRSdW50aW1lLCByZWxlYXNlU2Vzc2lvbiwgcnVufSBmcm9tICcuLi93YXNtLWNvcmUtaW1wbC5qcyc7XG5pbXBvcnQge2luaXRpYWxpemVXZWJBc3NlbWJseX0gZnJvbSAnLi4vd2FzbS1mYWN0b3J5LmpzJztcbmltcG9ydCB7c2NyaXB0U3JjfSBmcm9tICcuLi93YXNtLXV0aWxzLWltcG9ydC5qcyc7XG5cbmNvbnN0IFdPUktFUl9OQU1FID0gJ29ydC13YXNtLXByb3h5LXdvcmtlcic7XG5jb25zdCBpc1Byb3h5V29ya2VyID0gZ2xvYmFsVGhpcy5zZWxmPy5uYW1lID09PSBXT1JLRVJfTkFNRTtcblxuaWYgKGlzUHJveHlXb3JrZXIpIHtcbiAgLy8gV29ya2VyIHRocmVhZFxuICBzZWxmLm9ubWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50PE9ydFdhc21NZXNzYWdlPik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHt0eXBlLCBpbiA6IG1lc3NhZ2V9ID0gZXYuZGF0YTtcbiAgICB0cnkge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2luaXQtd2FzbSc6XG4gICAgICAgICAgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KG1lc3NhZ2UhLndhc20pXG4gICAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbml0UnVudGltZShtZXNzYWdlISkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZSwgZXJyfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZSwgZXJyfSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW5pdC1lcCc6IHtcbiAgICAgICAgICBjb25zdCB7ZXBOYW1lLCBlbnZ9ID0gbWVzc2FnZSE7XG4gICAgICAgICAgaW5pdEVwKGVudiwgZXBOYW1lKVxuICAgICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGV9KTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZSwgZXJyfSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdjb3B5LWZyb20nOiB7XG4gICAgICAgICAgY29uc3Qge2J1ZmZlcn0gPSBtZXNzYWdlITtcbiAgICAgICAgICBjb25zdCBidWZmZXJEYXRhID0gY29weUZyb21FeHRlcm5hbEJ1ZmZlcihidWZmZXIpO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlLCBvdXQ6IGJ1ZmZlckRhdGF9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdjcmVhdGUnOiB7XG4gICAgICAgICAgY29uc3Qge21vZGVsLCBvcHRpb25zfSA9IG1lc3NhZ2UhO1xuICAgICAgICAgIGNyZWF0ZVNlc3Npb24obW9kZWwsIG9wdGlvbnMpXG4gICAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICAgc2Vzc2lvbk1ldGFkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGUsIG91dDogc2Vzc2lvbk1ldGFkYXRhfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGUsIGVycn0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncmVsZWFzZSc6XG4gICAgICAgICAgcmVsZWFzZVNlc3Npb24obWVzc2FnZSEpO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3J1bic6IHtcbiAgICAgICAgICBjb25zdCB7c2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9uc30gPSBtZXNzYWdlITtcbiAgICAgICAgICBydW4oc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgbmV3IEFycmF5KG91dHB1dEluZGljZXMubGVuZ3RoKS5maWxsKG51bGwpLCBvcHRpb25zKVxuICAgICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICAgIG91dHB1dHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3V0cHV0cy5zb21lKG8gPT4gb1szXSAhPT0gJ2NwdScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGUsIGVycjogJ1Byb3h5IGRvZXMgbm90IHN1cHBvcnQgbm9uLWNwdSB0ZW5zb3IgbG9jYXRpb24uJ30pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dHlwZSwgb3V0OiBvdXRwdXRzfSBhcyBPcnRXYXNtTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMoWy4uLmlucHV0cywgLi4ub3V0cHV0c10gYXMgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGUsIGVycn0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnZW5kLXByb2ZpbGluZyc6XG4gICAgICAgICAgZW5kUHJvZmlsaW5nKG1lc3NhZ2UhKTtcbiAgICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZX0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGUsIGVycn0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQcm94eVdvcmtlciA/XG4gICAgbnVsbCA6XG4gICAgKHVybE92ZXJyaWRlPzogc3RyaW5nKSA9PlxuICAgICAgICBuZXcgV29ya2VyKHVybE92ZXJyaWRlID8/IHNjcmlwdFNyYyEsIHt0eXBlOiBCVUlMRF9ERUZTLklTX0VTTSA/ICdtb2R1bGUnIDogJ2NsYXNzaWMnLCBuYW1lOiBXT1JLRVJfTkFNRX0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgdHlwZSB7T3J0V2FzbU1vZHVsZX0gZnJvbSAnLi93YXNtLXR5cGVzJztcbmltcG9ydCB7aXNOb2RlfSBmcm9tICcuL3dhc20tdXRpbHMtZW52JztcblxuLyoqXG4gKiBUaGUgY2xhc3NpYyBzY3JpcHQgc291cmNlIFVSTC4gVGhpcyBpcyBub3QgYWx3YXlzIGF2YWlsYWJsZSBpbiBub24gRVNNb2R1bGUgZW52aXJvbm1lbnRzLlxuICpcbiAqIEluIE5vZGUuanMsIHRoaXMgaXMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3Qgc2NyaXB0U3JjID1cbiAgICAvLyBpZiBOb2RlanMsIHJldHVybiB1bmRlZmluZWRcbiAgICBpc05vZGUgPyB1bmRlZmluZWQgOlxuICAgICAgICAgICAgIC8vIGlmIEl0J3MgRVNNLCB1c2UgaW1wb3J0Lm1ldGEudXJsXG4gICAgICAgICAgICAgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMID8/XG4gICAgICAgIC8vIHVzZSBgZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNgIGlmIGF2YWlsYWJsZVxuICAgICAgICAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudC5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgYHNlbGYubG9jYXRpb24uaHJlZmAgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYubG9jYXRpb24/LmhyZWYgOiB1bmRlZmluZWQpKTtcblxuLyoqXG4gKiBUaGUgb3JpZ2luIG9mIHRoZSBjdXJyZW50IGxvY2F0aW9uLlxuICpcbiAqIEluIE5vZGUuanMsIHRoaXMgaXMgdW5kZWZpbmVkLlxuICovXG5jb25zdCBvcmlnaW4gPSBpc05vZGUgfHwgdHlwZW9mIGxvY2F0aW9uID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGxvY2F0aW9uLm9yaWdpbjtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gZmlsZW5hbWUgd2l0aCBwcmVmaXggaXMgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gKi9cbmNvbnN0IGlzU2FtZU9yaWdpbiA9IChmaWxlbmFtZTogc3RyaW5nLCBwcmVmaXhPdmVycmlkZT86IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcmVmaXhPdmVycmlkZSA/PyBzY3JpcHRTcmM7XG4gICAgY29uc3QgdXJsID0gYmFzZVVybCA/IG5ldyBVUkwoZmlsZW5hbWUsIGJhc2VVcmwpIDogbmV3IFVSTChmaWxlbmFtZSk7XG4gICAgcmV0dXJuIHVybC5vcmlnaW4gPT09IG9yaWdpbjtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgaW5wdXRzIHRvIGFuIGFic29sdXRlIFVSTCB3aXRoIHRoZSBnaXZlbiBwcmVmaXggb3ZlcnJpZGUuIElmIGZhaWxlZCwgcmV0dXJuIHVuZGVmaW5lZC5cbiAqL1xuY29uc3Qgbm9ybWFsaXplVXJsID0gKGZpbGVuYW1lOiBzdHJpbmcsIHByZWZpeE92ZXJyaWRlPzogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGJhc2VVcmwgPSBwcmVmaXhPdmVycmlkZSA/PyBzY3JpcHRTcmM7XG4gIHRyeSB7XG4gICAgY29uc3QgdXJsID0gYmFzZVVybCA/IG5ldyBVUkwoZmlsZW5hbWUsIGJhc2VVcmwpIDogbmV3IFVSTChmaWxlbmFtZSk7XG4gICAgcmV0dXJuIHVybC5ocmVmO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIGZhbGxiYWNrIFVSTCBpZiBhbiBhYnNvbHV0ZSBVUkwgY2Fubm90IGJlIGNyZWF0ZWQgYnkgdGhlIG5vcm1hbGl6ZVVybCBmdW5jdGlvbi5cbiAqL1xuY29uc3QgZmFsbGJhY2tVcmwgPSAoZmlsZW5hbWU6IHN0cmluZywgcHJlZml4T3ZlcnJpZGU/OiBzdHJpbmcpID0+IGAke3ByZWZpeE92ZXJyaWRlID8/ICcuLyd9JHtmaWxlbmFtZX1gO1xuXG4vKipcbiAqIFRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcHJlbG9hZCBhIG1vZHVsZSBmcm9tIGEgVVJMLlxuICpcbiAqIElmIHRoZSBvcmlnaW4gb2YgdGhlIHdvcmtlciBVUkwgaXMgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgb3JpZ2luLCB0aGUgd29ya2VyIGNhbm5vdCBiZSBsb2FkZWQgZGlyZWN0bHkuXG4gKiBTZWUgZGlzY3Vzc2lvbnMgaW4gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi93b3JrZXItbG9hZGVyL2lzc3Vlcy8xNTRcbiAqXG4gKiBJbiB0aGlzIGNhc2UsIHdlIHdpbGwgZmV0Y2ggdGhlIHdvcmtlciBVUkwgYW5kIGNyZWF0ZSBhIG5ldyBCbG9iIFVSTCB3aXRoIHRoZSBzYW1lIG9yaWdpbiBhcyBhIHdvcmthcm91bmQuXG4gKlxuICogQHBhcmFtIGFic29sdXRlVXJsIC0gVGhlIGFic29sdXRlIFVSTCB0byBwcmVsb2FkLlxuICpcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBuZXcgQmxvYiBVUkxcbiAqL1xuY29uc3QgcHJlbG9hZCA9IGFzeW5jKGFic29sdXRlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFic29sdXRlVXJsLCB7Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbid9KTtcbiAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG59O1xuXG4vKipcbiAqIFRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZHluYW1pY2FsbHkgaW1wb3J0IGEgbW9kdWxlIGZyb20gYSBVUkwuXG4gKlxuICogVGhlIGJ1aWxkIHNjcmlwdCBoYXMgc3BlY2lhbCBoYW5kbGluZyBmb3IgdGhpcyBmdW5jdGlvbiB0byBlbnN1cmUgdGhhdCB0aGUgVVJMIGlzIG5vdCBidW5kbGVkIGludG8gdGhlIGZpbmFsIG91dHB1dC5cbiAqXG4gKiBAcGFyYW0gdXJsIC0gVGhlIFVSTCB0byBpbXBvcnQuXG4gKlxuICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgZGVmYXVsdCBleHBvcnQgb2YgdGhlIG1vZHVsZS5cbiAqL1xuY29uc3QgZHluYW1pY0ltcG9ydERlZmF1bHQgPSBhc3luYzxUPih1cmw6IHN0cmluZyk6IFByb21pc2U8VD4gPT4gKGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHVybCkpLmRlZmF1bHQ7XG5cbi8qKlxuICogVGhlIHByb3h5IHdvcmtlciBmYWN0b3J5IGltcG9ydGVkIGZyb20gdGhlIHByb3h5IHdvcmtlciBtb2R1bGUuXG4gKlxuICogVGhpcyBpcyBvbmx5IGF2YWlsYWJsZSB3aGVuIHRoZSBXZWJBc3NlbWJseSBwcm94eSBpcyBub3QgZGlzYWJsZWQuXG4gKi9cbmNvbnN0IGNyZWF0ZVByb3h5V29ya2VyOiAoKHVybE92ZXJyaWRlPzogc3RyaW5nKSA9PiBXb3JrZXIpfHVuZGVmaW5lZCA9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbiAgICBCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSA/IHVuZGVmaW5lZCA6IHJlcXVpcmUoJy4vcHJveHktd29ya2VyL21haW4nKS5kZWZhdWx0O1xuXG4vKipcbiAqIEltcG9ydCB0aGUgcHJveHkgd29ya2VyLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHM6XG4gKiAxLiBJZiBhIHByZWxvYWQgaXMgbmVlZGVkLCBpdCB3aWxsIHByZWxvYWQgdGhlIG1vZHVsZSBhbmQgcmV0dXJuIHRoZSBvYmplY3QgVVJMLlxuICogMi4gVXNlIHRoZSBwcm94eSB3b3JrZXIgZmFjdG9yeSB0byBjcmVhdGUgdGhlIHByb3h5IHdvcmtlci5cbiAqXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgb2YgMiBlbGVtZW50czpcbiAqICAgICAgICAgICAgLSBUaGUgb2JqZWN0IFVSTCBvZiB0aGUgcHJlbG9hZGVkIG1vZHVsZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHByZWxvYWQgaXMgbmVlZGVkLlxuICogICAgICAgICAgICAtIFRoZSBwcm94eSB3b3JrZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBpbXBvcnRQcm94eVdvcmtlciA9IGFzeW5jKCk6IFByb21pc2U8W3VuZGVmaW5lZCB8IHN0cmluZywgV29ya2VyXT4gPT4ge1xuICBpZiAoIXNjcmlwdFNyYykge1xuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgcHJveHkgd29ya2VyOiBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBzY3JpcHQgc291cmNlIFVSTC4nKTtcbiAgfVxuXG4gIC8vIElmIHRoZSBzY3JpcHQgc291cmNlIGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLCB3ZSBjYW4gdXNlIHRoZSBlbWJlZGRlZCBwcm94eSBtb2R1bGUgZGlyZWN0bHkuXG4gIGlmIChpc1NhbWVPcmlnaW4oc2NyaXB0U3JjKSkge1xuICAgIHJldHVybiBbdW5kZWZpbmVkLCBjcmVhdGVQcm94eVdvcmtlciEoKV07XG4gIH1cblxuICAvLyBPdGhlcndpc2UsIG5lZWQgdG8gcHJlbG9hZFxuICBjb25zdCB1cmwgPSBhd2FpdCBwcmVsb2FkKHNjcmlwdFNyYyk7XG4gIHJldHVybiBbdXJsLCBjcmVhdGVQcm94eVdvcmtlciEodXJsKV07XG59O1xuXG4vKipcbiAqIFRoZSBlbWJlZGRlZCBXZWJBc3NlbWJseSBtb2R1bGUuXG4gKlxuICogVGhpcyBpcyBvbmx5IGF2YWlsYWJsZSBpbiBFU00gYW5kIHdoZW4gZW1iZWRkaW5nIGlzIG5vdCBkaXNhYmxlZC5cbiAqL1xuY29uc3QgZW1iZWRkZWRXYXNtTW9kdWxlOiBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPnx1bmRlZmluZWQgPVxuICAgIEJVSUxEX0RFRlMuSVNfRVNNICYmIEJVSUxEX0RFRlMuRElTQUJMRV9EWU5BTUlDX0lNUE9SVCA/XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbiAgICByZXF1aXJlKFxuICAgICAgICAhQlVJTERfREVGUy5ESVNBQkxFX1RSQUlOSU5HID8gJy4uLy4uL2Rpc3Qvb3J0LXRyYWluaW5nLXdhc20tc2ltZC10aHJlYWRlZC5tanMnIDpcbiAgICAgICAgICAgICFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCA/ICcuLi8uLi9kaXN0L29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC5tanMnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuLi8uLi9kaXN0L29ydC13YXNtLXNpbWQtdGhyZWFkZWQubWpzJylcbiAgICAgICAgLmRlZmF1bHQgOlxuICAgIHVuZGVmaW5lZDtcblxuLyoqXG4gKiBJbXBvcnQgdGhlIFdlYkFzc2VtYmx5IG1vZHVsZS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgcGVyZm9ybSB0aGUgZm9sbG93aW5nIHN0ZXBzOlxuICogMS4gSWYgQlVJTERfREVGUy5ESVNBQkxFX0RZTkFNSUNfSU1QT1JUIGlzIHRydWUsIHVzZSB0aGUgZW1iZWRkZWQgbW9kdWxlLlxuICogMi4gSWYgYSBwcmVsb2FkIGlzIG5lZWRlZCwgaXQgd2lsbCBwcmVsb2FkIHRoZSBtb2R1bGUgYW5kIHJldHVybiB0aGUgb2JqZWN0IFVSTC5cbiAqIDMuIE90aGVyd2lzZSwgaXQgd2lsbCBwZXJmb3JtIGEgZHluYW1pYyBpbXBvcnQgb2YgdGhlIG1vZHVsZS5cbiAqXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgb2YgMiBlbGVtZW50czpcbiAqICAgICAgICAgICAgLSBUaGUgb2JqZWN0IFVSTCBvZiB0aGUgcHJlbG9hZGVkIG1vZHVsZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHByZWxvYWQgaXMgbmVlZGVkLlxuICogICAgICAgICAgICAtIFRoZSBkZWZhdWx0IGV4cG9ydCBvZiB0aGUgbW9kdWxlLCB3aGljaCBpcyBhIGZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBXZWJBc3NlbWJseSBtb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBpbXBvcnRXYXNtTW9kdWxlID0gYXN5bmMoXG4gICAgdXJsT3ZlcnJpZGU6IHN0cmluZ3x1bmRlZmluZWQsIHByZWZpeE92ZXJyaWRlOiBzdHJpbmd8dW5kZWZpbmVkLFxuICAgIGlzTXVsdGlUaHJlYWRlZDogYm9vbGVhbik6IFByb21pc2U8W3VuZGVmaW5lZCB8IHN0cmluZywgRW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT5dPiA9PiB7XG4gIGlmIChCVUlMRF9ERUZTLkRJU0FCTEVfRFlOQU1JQ19JTVBPUlQpIHtcbiAgICByZXR1cm4gW3VuZGVmaW5lZCwgZW1iZWRkZWRXYXNtTW9kdWxlIV07XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgd2FzbU1vZHVsZUZpbGVuYW1lID0gIUJVSUxEX0RFRlMuRElTQUJMRV9UUkFJTklORyA/ICdvcnQtdHJhaW5pbmctd2FzbS1zaW1kLXRocmVhZGVkLm1qcycgOlxuICAgICAgICAhQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qcycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5tanMnO1xuICAgIGNvbnN0IHdhc21Nb2R1bGVVcmwgPSB1cmxPdmVycmlkZSA/PyBub3JtYWxpemVVcmwod2FzbU1vZHVsZUZpbGVuYW1lLCBwcmVmaXhPdmVycmlkZSk7XG4gICAgLy8gbmVlZCB0byBwcmVsb2FkIGlmIGFsbCBvZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAgICAvLyAxLiBub3QgaW4gTm9kZS5qcy5cbiAgICAvLyAgICAtIE5vZGUuanMgZG9lcyBub3QgaGF2ZSB0aGUgc2FtZSBvcmlnaW4gcG9saWN5IGZvciBjcmVhdGluZyB3b3JrZXJzLlxuICAgIC8vIDIuIG11bHRpLXRocmVhZGVkIGlzIGVuYWJsZWQuXG4gICAgLy8gICAgLSBJZiBtdWx0aS10aHJlYWRlZCBpcyBkaXNhYmxlZCwgbm8gd29ya2VyIHdpbGwgYmUgY3JlYXRlZC4gU28gd2UgZG9uJ3QgbmVlZCB0byBwcmVsb2FkIHRoZSBtb2R1bGUuXG4gICAgLy8gMy4gdGhlIGFic29sdXRlIFVSTCBpcyBhdmFpbGFibGUuXG4gICAgLy8gICAgLSBJZiB0aGUgYWJzb2x1dGUgVVJMIGlzIGZhaWxlZCB0byBiZSBjcmVhdGVkLCB0aGUgb3JpZ2luIGNhbm5vdCBiZSBkZXRlcm1pbmVkLiBJbiB0aGlzIGNhc2UsIHdlIHdpbGwgbm90XG4gICAgLy8gICAgcHJlbG9hZCB0aGUgbW9kdWxlLlxuICAgIC8vIDQuIHRoZSB3b3JrZXIgVVJMIGlzIG5vdCBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cbiAgICAvLyAgICAtIElmIHRoZSB3b3JrZXIgVVJMIGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLCB3ZSBjYW4gY3JlYXRlIHRoZSB3b3JrZXIgZGlyZWN0bHkuXG4gICAgY29uc3QgbmVlZFByZWxvYWQgPSAhaXNOb2RlICYmIGlzTXVsdGlUaHJlYWRlZCAmJiB3YXNtTW9kdWxlVXJsICYmICFpc1NhbWVPcmlnaW4od2FzbU1vZHVsZVVybCwgcHJlZml4T3ZlcnJpZGUpO1xuICAgIGNvbnN0IHVybCA9IG5lZWRQcmVsb2FkID8gKGF3YWl0IHByZWxvYWQod2FzbU1vZHVsZVVybCkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3YXNtTW9kdWxlVXJsID8/IGZhbGxiYWNrVXJsKHdhc21Nb2R1bGVGaWxlbmFtZSwgcHJlZml4T3ZlcnJpZGUpKTtcbiAgICByZXR1cm4gW25lZWRQcmVsb2FkID8gdXJsIDogdW5kZWZpbmVkLCBhd2FpdCBkeW5hbWljSW1wb3J0RGVmYXVsdDxFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPj4odXJsKV07XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7RW52fSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgdHlwZSB7T3J0V2FzbU1vZHVsZX0gZnJvbSAnLi93YXNtLXR5cGVzJztcbmltcG9ydCB7aW1wb3J0V2FzbU1vZHVsZX0gZnJvbSAnLi93YXNtLXV0aWxzLWltcG9ydCc7XG5cbmxldCB3YXNtOiBPcnRXYXNtTW9kdWxlfHVuZGVmaW5lZDtcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xubGV0IGFib3J0ZWQgPSBmYWxzZTtcblxuY29uc3QgaXNNdWx0aVRocmVhZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgLy8gSWYgJ1NoYXJlZEFycmF5QnVmZmVyJyBpcyBub3QgYXZhaWxhYmxlLCBXZWJBc3NlbWJseSB0aHJlYWRzIHdpbGwgbm90IHdvcmsuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBUZXN0IGZvciB0cmFuc2ZlcmFiaWxpdHkgb2YgU0FCcyAoZm9yIGJyb3dzZXJzLiBuZWVkZWQgZm9yIEZpcmVmb3gpXG4gICAgLy8gaHR0cHM6Ly9ncm91cHMuZ29vZ2xlLmNvbS9mb3J1bS8jIW1zZy9tb3ppbGxhLmRldi5wbGF0Zm9ybS9JSGtCWmxIRVRwQS9kd3NNTmNoV0VRQUpcbiAgICBpZiAodHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbmV3IE1lc3NhZ2VDaGFubmVsKCkucG9ydDEucG9zdE1lc3NhZ2UobmV3IFNoYXJlZEFycmF5QnVmZmVyKDEpKTtcbiAgICB9XG5cbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSB0aHJlYWRzIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgdGhyZWFkZWQgaW5zdHJ1Y3Rpb25zLlxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsICAwLCAgMCwgMSwgNCwgMSwgIDk2LCAwLCAgIDAsICAzLCAyLCAxLCAgMCwgNSxcbiAgICAgIDQsIDEsICAzLCAgIDEsICAgMSwgMTAsIDExLCAxLCA5LCAwLCA2NSwgMCwgIDI1NCwgMTYsIDIsIDAsIDI2LCAxMVxuICAgIF0pKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgaXNTaW1kU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICB0cnkge1xuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IFNJTUQgY2FwYWJpbGl0eSAoZm9yIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMpXG4gICAgLy8gVGhpcyB0eXBlZCBhcnJheSBpcyBhIFdlYkFzc2VtYmx5IHByb2dyYW0gY29udGFpbmluZyBTSU1EIGluc3RydWN0aW9ucy5cblxuICAgIC8vIFRoZSBiaW5hcnkgZGF0YSBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgZm9sbG93aW5nIGNvZGUgYnkgd2F0Mndhc206XG4gICAgLy9cbiAgICAvLyAobW9kdWxlXG4gICAgLy8gICAodHlwZSAkdDAgKGZ1bmMpKVxuICAgIC8vICAgKGZ1bmMgJGYwICh0eXBlICR0MClcbiAgICAvLyAgICAgKGRyb3BcbiAgICAvLyAgICAgICAoaTMyeDQuZG90X2kxNng4X3NcbiAgICAvLyAgICAgICAgIChpOHgxNi5zcGxhdFxuICAgIC8vICAgICAgICAgICAoaTMyLmNvbnN0IDApKVxuICAgIC8vICAgICAgICAgKHYxMjguY29uc3QgaTMyeDQgMHgwMDAwMDAwMCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCkpKSkpXG5cbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMCwgICA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDQsIDEsIDk2LCAwLCAwLCAzLCAyLCAxLCAwLCAxMCwgMzAsIDEsICAgMjgsICAwLCA2NSwgMCxcbiAgICAgIDI1MywgMTUsIDI1MywgMTIsICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgIDAsICAyNTMsIDE4NiwgMSwgMjYsIDExXG4gICAgXSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5ID0gYXN5bmMoZmxhZ3M6IEVudi5XZWJBc3NlbWJseUZsYWdzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtdWx0aXBsZSBjYWxscyB0byBcXCdpbml0aWFsaXplV2ViQXNzZW1ibHkoKVxcJyBkZXRlY3RlZC4nKTtcbiAgfVxuICBpZiAoYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJldmlvdXMgY2FsbCB0byBcXCdpbml0aWFsaXplV2ViQXNzZW1ibHkoKVxcJyBmYWlsZWQuJyk7XG4gIH1cblxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gIC8vIHdhc20gZmxhZ3MgYXJlIGFscmVhZHkgaW5pdGlhbGl6ZWRcbiAgY29uc3QgdGltZW91dCA9IGZsYWdzLmluaXRUaW1lb3V0ITtcbiAgbGV0IG51bVRocmVhZHMgPSBmbGFncy5udW1UaHJlYWRzITtcblxuICAvLyBlbnN1cmUgU0lNRCBpcyBzdXBwb3J0ZWRcbiAgaWYgKCFpc1NpbWRTdXBwb3J0ZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV2ViQXNzZW1ibHkgU0lNRCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LicpO1xuICB9XG5cbiAgLy8gY2hlY2sgaWYgbXVsdGktdGhyZWFkaW5nIGlzIHN1cHBvcnRlZFxuICBjb25zdCBtdWx0aVRocmVhZFN1cHBvcnRlZCA9IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQoKTtcbiAgaWYgKG51bVRocmVhZHMgPiAxICYmICFtdWx0aVRocmVhZFN1cHBvcnRlZCkge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgIXNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAnZW52Lndhc20ubnVtVGhyZWFkcyBpcyBzZXQgdG8gJyArIG51bVRocmVhZHMgK1xuICAgICAgICAgICcsIGJ1dCB0aGlzIHdpbGwgbm90IHdvcmsgdW5sZXNzIHlvdSBlbmFibGUgY3Jvc3NPcmlnaW5Jc29sYXRlZCBtb2RlLiAnICtcbiAgICAgICAgICAnU2VlIGh0dHBzOi8vd2ViLmRldi9jcm9zcy1vcmlnaW4taXNvbGF0aW9uLWd1aWRlLyBmb3IgbW9yZSBpbmZvLicpO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKFxuICAgICAgICAnV2ViQXNzZW1ibHkgbXVsdGktdGhyZWFkaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuICcgK1xuICAgICAgICAnRmFsbGluZyBiYWNrIHRvIHNpbmdsZS10aHJlYWRpbmcuJyk7XG5cbiAgICAvLyBzZXQgZmxhZ3MubnVtVGhyZWFkcyB0byAxIHNvIHRoYXQgT3J0SW5pdCgpIHdpbGwgbm90IGNyZWF0ZSBhIGdsb2JhbCB0aHJlYWQgcG9vbC5cbiAgICBmbGFncy5udW1UaHJlYWRzID0gbnVtVGhyZWFkcyA9IDE7XG4gIH1cblxuICBjb25zdCB3YXNtUGF0aHMgPSBmbGFncy53YXNtUGF0aHM7XG4gIGNvbnN0IHdhc21QcmVmaXhPdmVycmlkZSA9IHR5cGVvZiB3YXNtUGF0aHMgPT09ICdzdHJpbmcnID8gd2FzbVBhdGhzIDogdW5kZWZpbmVkO1xuICBjb25zdCBtanNQYXRoT3ZlcnJpZGVGbGFnID0gKHdhc21QYXRocyBhcyBFbnYuV2FzbUZpbGVQYXRocyk/Lm1qcztcbiAgY29uc3QgbWpzUGF0aE92ZXJyaWRlID0gKG1qc1BhdGhPdmVycmlkZUZsYWcgYXMgVVJMKT8uaHJlZiA/PyBtanNQYXRoT3ZlcnJpZGVGbGFnO1xuICBjb25zdCB3YXNtUGF0aE92ZXJyaWRlRmxhZyA9ICh3YXNtUGF0aHMgYXMgRW52Lldhc21GaWxlUGF0aHMpPy53YXNtO1xuICBjb25zdCB3YXNtUGF0aE92ZXJyaWRlID0gKHdhc21QYXRoT3ZlcnJpZGVGbGFnIGFzIFVSTCk/LmhyZWYgPz8gd2FzbVBhdGhPdmVycmlkZUZsYWc7XG5cbiAgY29uc3QgW29iamVjdFVybCwgb3J0V2FzbUZhY3RvcnldID0gKGF3YWl0IGltcG9ydFdhc21Nb2R1bGUobWpzUGF0aE92ZXJyaWRlLCB3YXNtUHJlZml4T3ZlcnJpZGUsIG51bVRocmVhZHMgPiAxKSk7XG5cbiAgbGV0IGlzVGltZW91dCA9IGZhbHNlO1xuXG4gIGNvbnN0IHRhc2tzOiBBcnJheTxQcm9taXNlPHZvaWQ+PiA9IFtdO1xuXG4gIC8vIHByb21pc2UgZm9yIHRpbWVvdXRcbiAgaWYgKHRpbWVvdXQgPiAwKSB7XG4gICAgdGFza3MucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH0pKTtcbiAgfVxuXG4gIC8vIHByb21pc2UgZm9yIG1vZHVsZSBpbml0aWFsaXphdGlvblxuICB0YXNrcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjb25maWc6IFBhcnRpYWw8T3J0V2FzbU1vZHVsZT4gPSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBudW1iZXIgb2YgdGhyZWFkcy4gV2ViQXNzZW1ibHkgd2lsbCBjcmVhdGUgKE1vZHVsZS5udW1UaHJlYWRzIC0gMSkgd29ya2Vycy4gSWYgaXQgaXMgMSwgbm8gd29ya2VyIHdpbGwgYmVcbiAgICAgICAqIGNyZWF0ZWQuXG4gICAgICAgKi9cbiAgICAgIG51bVRocmVhZHMsXG4gICAgICAvKipcbiAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gbG9jYXRlIHRoZSBXZWJBc3NlbWJseSBmaWxlLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlLlxuICAgICAgICpcbiAgICAgICAqIFNpbmNlIEVtc2NyaXB0ZW4gMy4xLjU4LCB0aGlzIGZ1bmN0aW9uIGlzIG9ubHkgY2FsbGVkIGZvciB0aGUgLndhc20gZmlsZS5cbiAgICAgICAqL1xuICAgICAgbG9jYXRlRmlsZTogKGZpbGVOYW1lLCBzY3JpcHREaXJlY3RvcnkpID0+IHdhc21QYXRoT3ZlcnJpZGUgPz8gKHdhc21QcmVmaXhPdmVycmlkZSA/PyBzY3JpcHREaXJlY3RvcnkpICsgZmlsZU5hbWVcbiAgICB9O1xuXG4gICAgb3J0V2FzbUZhY3RvcnkoY29uZmlnKS50aGVuKFxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHlcbiAgICAgICAgbW9kdWxlID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgd2FzbSA9IG1vZHVsZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgaWYgKG9iamVjdFVybCkge1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgZmFpbGVkIHRvIGluaXRpYWxpemVcbiAgICAgICAgKHdoYXQpID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3Qod2hhdCk7XG4gICAgICAgIH0pO1xuICB9KSk7XG5cbiAgYXdhaXQgUHJvbWlzZS5yYWNlKHRhc2tzKTtcblxuICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBXZWJBc3NlbWJseSBiYWNrZW5kIGluaXRpYWxpemluZyBmYWlsZWQgZHVlIHRvIHRpbWVvdXQ6ICR7dGltZW91dH1tc2ApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0SW5zdGFuY2UgPSAoKTogT3J0V2FzbU1vZHVsZSA9PiB7XG4gIGlmIChpbml0aWFsaXplZCAmJiB3YXNtKSB7XG4gICAgcmV0dXJuIHdhc207XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IGlzIG5vdCBpbml0aWFsaXplZCB5ZXQuJyk7XG59O1xuXG5leHBvcnQgY29uc3QgZGlzcG9zZSA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKGluaXRpYWxpemVkICYmICFpbml0aWFsaXppbmcgJiYgIWFib3J0ZWQpIHtcbiAgICAvLyBUT0RPOiBjdXJyZW50bHkgXCJQVGhyZWFkLnRlcm1pbmF0ZUFsbFRocmVhZHMoKVwiIGlzIG5vdCBleHBvc2VkIGluIHRoZSB3YXNtIG1vZHVsZS5cbiAgICAvLyAgICAgICBBbmQgdGhpcyBmdW5jdGlvbiBpcyBub3QgeWV0IGNhbGxlZCBieSBhbnkgY29kZS5cbiAgICAvLyAgICAgICBJZiBpdCBpcyBuZWVkZWQgaW4gdGhlIGZ1dHVyZSwgd2Ugc2hvdWxkIGV4cG9zZSBpdCBpbiB0aGUgd2FzbSBtb2R1bGUgYW5kIHVuY29tbWVudCB0aGUgZm9sbG93aW5nIGxpbmUuXG5cbiAgICAvLyB3YXNtPy5QVGhyZWFkPy50ZXJtaW5hdGVBbGxUaHJlYWRzKCk7XG4gICAgd2FzbSA9IHVuZGVmaW5lZDtcblxuICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgYWJvcnRlZCA9IHRydWU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IGFsbG9jV2FzbVN0cmluZyA9IChkYXRhOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiBudW1iZXIgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBkYXRhTGVuZ3RoID0gd2FzbS5sZW5ndGhCeXRlc1VURjgoZGF0YSkgKyAxO1xuICBjb25zdCBkYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKGRhdGFMZW5ndGgpO1xuICB3YXNtLnN0cmluZ1RvVVRGOChkYXRhLCBkYXRhT2Zmc2V0LCBkYXRhTGVuZ3RoKTtcbiAgYWxsb2NzLnB1c2goZGF0YU9mZnNldCk7XG5cbiAgcmV0dXJuIGRhdGFPZmZzZXQ7XG59O1xuXG5pbnRlcmZhY2UgRXh0cmFPcHRpb25zSGFuZGxlciB7XG4gIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgaXRlcmF0ZUV4dHJhT3B0aW9ucyA9XG4gICAgKG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBwcmVmaXg6IHN0cmluZywgc2VlbjogV2Vha1NldDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4sXG4gICAgIGhhbmRsZXI6IEV4dHJhT3B0aW9uc0hhbmRsZXIpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0JyAmJiBvcHRpb25zICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChzZWVuLmhhcyhvcHRpb25zKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGluIG9wdGlvbnMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWVuLmFkZChvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBPYmplY3QuZW50cmllcyhvcHRpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgY29uc3QgbmFtZSA9IChwcmVmaXgpID8gcHJlZml4ICsga2V5IDoga2V5O1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnModmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIG5hbWUgKyAnLicsIHNlZW4sIGhhbmRsZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGhhbmRsZXIobmFtZSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICBoYW5kbGVyKG5hbWUsICh2YWx1ZSkgPyAnMScgOiAnMCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgaGFuZGxlIGV4dHJhIGNvbmZpZyB0eXBlOiAke3R5cGVvZiB2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuLyoqXG4gKiBjaGVjayB3ZWIgYXNzZW1ibHkgQVBJJ3MgbGFzdCBlcnJvciBhbmQgdGhyb3cgZXJyb3IgaWYgYW55IGVycm9yIG9jY3VycmVkLlxuICogQHBhcmFtIG1lc3NhZ2UgYSBtZXNzYWdlIHVzZWQgd2hlbiBhbiBlcnJvciBvY2N1cnJlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNoZWNrTGFzdEVycm9yID0gKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFyYW1zT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDgpO1xuICAgIHdhc20uX09ydEdldExhc3RFcnJvcihwYXJhbXNPZmZzZXQsIHBhcmFtc09mZnNldCArIDQpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uSEVBUDMyW3BhcmFtc09mZnNldCAvIDRdO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZVBvaW50ZXIgPSB3YXNtLkhFQVBVMzJbcGFyYW1zT2Zmc2V0IC8gNCArIDFdO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZVBvaW50ZXIgPyB3YXNtLlVURjhUb1N0cmluZyhlcnJvck1lc3NhZ2VQb2ludGVyKSA6ICcnO1xuICAgIHRocm93IG5ldyBFcnJvcihgJHttZXNzYWdlfSBFUlJPUl9DT0RFOiAke2Vycm9yQ29kZX0sIEVSUk9SX01FU1NBR0U6ICR7ZXJyb3JNZXNzYWdlfWApO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge2dldEluc3RhbmNlfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQge2FsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3IsIGl0ZXJhdGVFeHRyYU9wdGlvbnN9IGZyb20gJy4vd2FzbS11dGlscyc7XG5cbmV4cG9ydCBjb25zdCBzZXRSdW5PcHRpb25zID0gKG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlcltdXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBsZXQgcnVuT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGNvbnN0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBydW5PcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRyeSB7XG4gICAgaWYgKG9wdGlvbnM/LmxvZ1NldmVyaXR5TGV2ZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID0gMjsgIC8vIERlZmF1bHQgdG8gd2FybmluZ1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCkgfHxcbiAgICAgICAgb3B0aW9ucy5sb2dTZXZlcml0eUxldmVsIDwgMCB8fCBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPiA0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXJ2ZXJpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke29wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8ubG9nVmVyYm9zaXR5TGV2ZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCA9IDA7ICAvLyBEZWZhdWx0IHRvIDBcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtvcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy50ZXJtaW5hdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcnVuT3B0aW9ucy50ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgdGFnRGF0YU9mZnNldCA9IDA7XG4gICAgaWYgKG9wdGlvbnM/LnRhZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YWdEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKG9wdGlvbnMudGFnLCBhbGxvY3MpO1xuICAgIH1cblxuICAgIHJ1bk9wdGlvbnNIYW5kbGUgPSB3YXNtLl9PcnRDcmVhdGVSdW5PcHRpb25zKFxuICAgICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwhLCBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsISwgISFydW5PcHRpb25zLnRlcm1pbmF0ZSEsIHRhZ0RhdGFPZmZzZXQpO1xuICAgIGlmIChydW5PcHRpb25zSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgcnVuIG9wdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmV4dHJhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnMob3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRSdW5Db25maWdFbnRyeShydW5PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHJ1biBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3J1bk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIGFsbG9jcy5mb3JFYWNoKGFsbG9jID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb259IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7YWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9uc30gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuY29uc3QgZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsID0gKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw6IHN0cmluZ3x1bmtub3duKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChncmFwaE9wdGltaXphdGlvbkxldmVsKSB7XG4gICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAnZXh0ZW5kZWQnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAnYWxsJzpcbiAgICAgIHJldHVybiA5OTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBncmFwaCBvcHRpbWl6YXRpb24gbGV2ZWw6ICR7Z3JhcGhPcHRpbWl6YXRpb25MZXZlbH1gKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0RXhlY3V0aW9uTW9kZSA9IChleGVjdXRpb25Nb2RlOiAnc2VxdWVudGlhbCd8J3BhcmFsbGVsJyk6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAoZXhlY3V0aW9uTW9kZSkge1xuICAgIGNhc2UgJ3NlcXVlbnRpYWwnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAncGFyYWxsZWwnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZXhlY3V0aW9uIG1vZGU6ICR7ZXhlY3V0aW9uTW9kZX1gKTtcbiAgfVxufTtcblxuY29uc3QgYXBwZW5kRGVmYXVsdE9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IHZvaWQgPT4ge1xuICBpZiAoIW9wdGlvbnMuZXh0cmEpIHtcbiAgICBvcHRpb25zLmV4dHJhID0ge307XG4gIH1cbiAgaWYgKCFvcHRpb25zLmV4dHJhLnNlc3Npb24pIHtcbiAgICBvcHRpb25zLmV4dHJhLnNlc3Npb24gPSB7fTtcbiAgfVxuICBjb25zdCBzZXNzaW9uID0gb3B0aW9ucy5leHRyYS5zZXNzaW9uIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGlmICghc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIHNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSA9ICcxJztcbiAgfVxuXG4gIC8vIGlmIHVzaW5nIEpTRVAgd2l0aCBXZWJHUFUsIGFsd2F5cyBkaXNhYmxlIG1lbW9yeSBwYXR0ZXJuXG4gIGlmIChvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyAmJlxuICAgICAgb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMuc29tZShlcCA9PiAodHlwZW9mIGVwID09PSAnc3RyaW5nJyA/IGVwIDogZXAubmFtZSkgPT09ICd3ZWJncHUnKSkge1xuICAgIG9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybiA9IGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBzZXRFeGVjdXRpb25Qcm92aWRlcnMgPVxuICAgIChzZXNzaW9uT3B0aW9uc0hhbmRsZTogbnVtYmVyLCBleGVjdXRpb25Qcm92aWRlcnM6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uRXhlY3V0aW9uUHJvdmlkZXJDb25maWdbXSxcbiAgICAgYWxsb2NzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xuICAgICAgZm9yIChjb25zdCBlcCBvZiBleGVjdXRpb25Qcm92aWRlcnMpIHtcbiAgICAgICAgbGV0IGVwTmFtZSA9IHR5cGVvZiBlcCA9PT0gJ3N0cmluZycgPyBlcCA6IGVwLm5hbWU7XG5cbiAgICAgICAgLy8gY2hlY2sgRVAgbmFtZVxuICAgICAgICBzd2l0Y2ggKGVwTmFtZSkge1xuICAgICAgICAgIGNhc2UgJ3dlYm5uJzpcbiAgICAgICAgICAgIGVwTmFtZSA9ICdXRUJOTic7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb25zdCB3ZWJubk9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgICAgICAgICAgIC8vIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XG4gICAgICAgICAgICAgIGNvbnN0IGRldmljZVR5cGUgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5Db250ZXh0T3B0aW9ucyk/LmRldmljZVR5cGU7XG4gICAgICAgICAgICAgIGNvbnN0IG51bVRocmVhZHMgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5Db250ZXh0T3B0aW9ucyk/Lm51bVRocmVhZHM7XG4gICAgICAgICAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8ucG93ZXJQcmVmZXJlbmNlO1xuICAgICAgICAgICAgICBpZiAoZGV2aWNlVHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ2RldmljZVR5cGUnLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhkZXZpY2VUeXBlLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XG4gICAgICAgICAgICAgICAgICAgIDApIHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ2RldmljZVR5cGUnIC0gJHtkZXZpY2VUeXBlfS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKG51bVRocmVhZHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIEp1c3QgaWdub3JlIGludmFsaWQgd2Vibm5PcHRpb25zLm51bVRocmVhZHMuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVkTnVtVGhyZWFkcyA9XG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgbnVtVGhyZWFkcyAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIobnVtVGhyZWFkcykgfHwgbnVtVGhyZWFkcyA8IDApID8gMCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtVGhyZWFkcztcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKCdudW1UaHJlYWRzJywgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsaWRhdGVkTnVtVGhyZWFkcy50b1N0cmluZygpLCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XG4gICAgICAgICAgICAgICAgICAgIDApIHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ251bVRocmVhZHMnIC0gJHtudW1UaHJlYWRzfS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHBvd2VyUHJlZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ3Bvd2VyUHJlZmVyZW5jZScsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHBvd2VyUHJlZmVyZW5jZSwgYWxsb2NzKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PVxuICAgICAgICAgICAgICAgICAgICAwKSB7XG4gICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICdwb3dlclByZWZlcmVuY2UnIC0gJHtwb3dlclByZWZlcmVuY2V9LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd2ViZ3B1JzpcbiAgICAgICAgICAgIGVwTmFtZSA9ICdKUyc7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb25zdCB3ZWJncHVPcHRpb25zID0gZXAgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJHcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnM/LnByZWZlcnJlZExheW91dCkge1xuICAgICAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCAhPT0gJ05DSFcnICYmIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkhXQycpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgcHJlZmVycmVkTGF5b3V0IG11c3QgYmUgZWl0aGVyICdOQ0hXJyBvciAnTkhXQyc6ICR7d2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXR9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ3ByZWZlcnJlZExheW91dCcsIGFsbG9jcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0LCBhbGxvY3MpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XG4gICAgICAgICAgICAgICAgICAgIDApIHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgIGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ3ByZWZlcnJlZExheW91dCcgLSAke3dlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0fS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3dhc20nOlxuICAgICAgICAgIGNhc2UgJ2NwdSc6XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlcE5hbWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGVwTmFtZSwgYWxsb2NzKTtcbiAgICAgICAgaWYgKGdldEluc3RhbmNlKCkuX09ydEFwcGVuZEV4ZWN1dGlvblByb3ZpZGVyKHNlc3Npb25PcHRpb25zSGFuZGxlLCBlcE5hbWVEYXRhT2Zmc2V0KSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBhcHBlbmQgZXhlY3V0aW9uIHByb3ZpZGVyOiAke2VwTmFtZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG5leHBvcnQgY29uc3Qgc2V0U2Vzc2lvbk9wdGlvbnMgPSAob3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBbbnVtYmVyLCBudW1iZXJbXV0gPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgbGV0IHNlc3Npb25PcHRpb25zSGFuZGxlID0gMDtcbiAgY29uc3QgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IHNlc3Npb25PcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgYXBwZW5kRGVmYXVsdE9wdGlvbnMoc2Vzc2lvbk9wdGlvbnMpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCA9IGdldEdyYXBoT3B0aW16YXRpb25MZXZlbChzZXNzaW9uT3B0aW9ucy5ncmFwaE9wdGltaXphdGlvbkxldmVsID8/ICdhbGwnKTtcbiAgICBjb25zdCBleGVjdXRpb25Nb2RlID0gZ2V0RXhlY3V0aW9uTW9kZShzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Nb2RlID8/ICdzZXF1ZW50aWFsJyk7XG4gICAgY29uc3QgbG9nSWREYXRhT2Zmc2V0ID1cbiAgICAgICAgdHlwZW9mIHNlc3Npb25PcHRpb25zLmxvZ0lkID09PSAnc3RyaW5nJyA/IGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5sb2dJZCwgYWxsb2NzKSA6IDA7XG5cbiAgICBjb25zdCBsb2dTZXZlcml0eUxldmVsID0gc2Vzc2lvbk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA/PyAyOyAgLy8gRGVmYXVsdCB0byAyIC0gd2FybmluZ1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihsb2dTZXZlcml0eUxldmVsKSB8fCBsb2dTZXZlcml0eUxldmVsIDwgMCB8fCBsb2dTZXZlcml0eUxldmVsID4gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgc2VydmVyaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtsb2dTZXZlcml0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGxvZ1ZlcmJvc2l0eUxldmVsID0gc2Vzc2lvbk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgPz8gMDsgIC8vIERlZmF1bHQgdG8gMCAtIHZlcmJvc2VcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nVmVyYm9zaXR5TGV2ZWwpIHx8IGxvZ1ZlcmJvc2l0eUxldmVsIDwgMCB8fCBsb2dWZXJib3NpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nVmVyYm9zaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCA9IHR5cGVvZiBzZXNzaW9uT3B0aW9ucy5vcHRpbWl6ZWRNb2RlbEZpbGVQYXRoID09PSAnc3RyaW5nJyA/XG4gICAgICAgIGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5vcHRpbWl6ZWRNb2RlbEZpbGVQYXRoLCBhbGxvY3MpIDpcbiAgICAgICAgMDtcblxuICAgIHNlc3Npb25PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlU2Vzc2lvbk9wdGlvbnMoXG4gICAgICAgIGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwsICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlQ3B1TWVtQXJlbmEsICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybiwgZXhlY3V0aW9uTW9kZSxcbiAgICAgICAgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVQcm9maWxpbmcsIDAsIGxvZ0lkRGF0YU9mZnNldCwgbG9nU2V2ZXJpdHlMZXZlbCwgbG9nVmVyYm9zaXR5TGV2ZWwsXG4gICAgICAgIG9wdGltaXplZE1vZGVsRmlsZVBhdGhPZmZzZXQpO1xuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIHNlc3Npb24gb3B0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzKSB7XG4gICAgICBzZXRFeGVjdXRpb25Qcm92aWRlcnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycywgYWxsb2NzKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBlbmFibGVHcmFwaENhcHR1cmUgbXVzdCBiZSBhIGJvb2xlYW4gdmFsdWU6ICR7c2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlfWApO1xuICAgICAgfVxuICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygnZW5hYmxlR3JhcGhDYXB0dXJlJywgYWxsb2NzKTtcbiAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmUudG9TdHJpbmcoKSwgYWxsb2NzKTtcbiAgICAgIGlmICh3YXNtLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXG4gICAgICAgICAgICBgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICdlbmFibGVHcmFwaENhcHR1cmUnIC0gJHtzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmV9LmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nOiAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIodmFsdWUpIHx8IHZhbHVlIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgdmFsdWUgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyOiAke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcobmFtZSwgYWxsb2NzKTtcbiAgICAgICAgaWYgKHdhc20uX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZShzZXNzaW9uT3B0aW9uc0hhbmRsZSwgbmFtZU9mZnNldCwgdmFsdWUpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlOiAke25hbWV9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhzZXNzaW9uT3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cbiAgICBhbGxvY3MuZm9yRWFjaChhbGxvYyA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtUZW5zb3J9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbi8vIGEgZHVtbXkgdHlwZSBkZWNsYXJhdGlvbiBmb3IgRmxvYXQxNkFycmF5IGluIGNhc2UgYW55IHBvbHlmaWxsIGlzIGF2YWlsYWJsZS5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiwgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBjb25zdCBGbG9hdDE2QXJyYXk6IGFueTtcbn1cblxuLy8gVGhpcyBmaWxlIGluY2x1ZGVzIGNvbW1vbiBkZWZpbml0aW9ucy4gVGhleSBkbyBOT1QgaGF2ZSBkZXBlbmRlbmN5IG9uIHRoZSBXZWJBc3NlbWJseSBpbnN0YW5jZS5cblxuLyoqXG4gKiBDb3BpZWQgZnJvbSBPTk5YIGRlZmluaXRpb24uIFVzZSB0aGlzIHRvIGRyb3AgZGVwZW5kZW5jeSAnb25ueF9wcm90bycgdG8gZGVjcmVhc2UgY29tcGlsZWQgLmpzIGZpbGUgc2l6ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gRGF0YVR5cGUge1xuICB1bmRlZmluZWQgPSAwLFxuICBmbG9hdCA9IDEsXG4gIHVpbnQ4ID0gMixcbiAgaW50OCA9IDMsXG4gIHVpbnQxNiA9IDQsXG4gIGludDE2ID0gNSxcbiAgaW50MzIgPSA2LFxuICBpbnQ2NCA9IDcsXG4gIHN0cmluZyA9IDgsXG4gIGJvb2wgPSA5LFxuICBmbG9hdDE2ID0gMTAsXG4gIGRvdWJsZSA9IDExLFxuICB1aW50MzIgPSAxMixcbiAgdWludDY0ID0gMTMsXG4gIGNvbXBsZXg2NCA9IDE0LFxuICBjb21wbGV4MTI4ID0gMTUsXG4gIGJmbG9hdDE2ID0gMTZcbn1cblxuLyoqXG4gKiBNYXAgc3RyaW5nIHRlbnNvciBkYXRhIHRvIGVudW0gdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtID0gKHR5cGU6IHN0cmluZyk6IERhdGFUeXBlID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnaW50OCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50ODtcbiAgICBjYXNlICd1aW50OCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDg7XG4gICAgY2FzZSAnYm9vbCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuYm9vbDtcbiAgICBjYXNlICdpbnQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MTY7XG4gICAgY2FzZSAndWludDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MTY7XG4gICAgY2FzZSAnaW50MzInOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDMyO1xuICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDMyO1xuICAgIGNhc2UgJ2Zsb2F0MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0MTY7XG4gICAgY2FzZSAnZmxvYXQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZmxvYXQ7XG4gICAgY2FzZSAnZmxvYXQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZG91YmxlO1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuc3RyaW5nO1xuICAgIGNhc2UgJ2ludDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ2NDtcbiAgICBjYXNlICd1aW50NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ2NDtcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xuICB9XG59O1xuXG4vKipcbiAqIE1hcCBlbnVtIHZhbHVlIHRvIHN0cmluZyB0ZW5zb3IgZGF0YVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcgPSAodHlwZVByb3RvOiBEYXRhVHlwZSk6IFRlbnNvci5UeXBlID0+IHtcbiAgc3dpdGNoICh0eXBlUHJvdG8pIHtcbiAgICBjYXNlIERhdGFUeXBlLmludDg6XG4gICAgICByZXR1cm4gJ2ludDgnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDg6XG4gICAgICByZXR1cm4gJ3VpbnQ4JztcbiAgICBjYXNlIERhdGFUeXBlLmJvb2w6XG4gICAgICByZXR1cm4gJ2Jvb2wnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50MTY6XG4gICAgICByZXR1cm4gJ2ludDE2JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQxNjpcbiAgICAgIHJldHVybiAndWludDE2JztcbiAgICBjYXNlIERhdGFUeXBlLmludDMyOlxuICAgICAgcmV0dXJuICdpbnQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50MzI6XG4gICAgICByZXR1cm4gJ3VpbnQzMic7XG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDE2OlxuICAgICAgcmV0dXJuICdmbG9hdDE2JztcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0OlxuICAgICAgcmV0dXJuICdmbG9hdDMyJztcbiAgICBjYXNlIERhdGFUeXBlLmRvdWJsZTpcbiAgICAgIHJldHVybiAnZmxvYXQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS5zdHJpbmc6XG4gICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ2NDpcbiAgICAgIHJldHVybiAnaW50NjQnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDY0OlxuICAgICAgcmV0dXJuICd1aW50NjQnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGVQcm90b31gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBnZXQgdGVuc29yIGVsZW1lbnQgc2l6ZSBpbiBieXRlcyBieSB0aGUgZ2l2ZW4gZGF0YSB0eXBlXG4gKiBAcmV0dXJucyBzaXplIGluIGludGVnZXIgb3IgdW5kZWZpbmVkIGlmIHRoZSBkYXRhIHR5cGUgaXMgbm90IHN1cHBvcnRlZFxuICovXG5leHBvcnQgY29uc3QgZ2V0VGVuc29yRWxlbWVudFNpemUgPSAoZGF0ZVR5cGU6IG51bWJlcik6IG51bWJlcnxcbiAgICB1bmRlZmluZWQgPT4gW3VuZGVmaW5lZCwgNCwgMSwgMSwgMiwgMiwgNCwgOCwgdW5kZWZpbmVkLCAxLCAyLCA4LCA0LCA4LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXVtkYXRlVHlwZV07XG5cbi8qKlxuICogZ2V0IHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yIGJ5IHRoZSBnaXZlbiB0ZW5zb3IgdHlwZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gKHR5cGU6IFRlbnNvci5UeXBlKTogRmxvYXQzMkFycmF5Q29uc3RydWN0b3J8VWludDhBcnJheUNvbnN0cnVjdG9yfFxuICAgIEludDhBcnJheUNvbnN0cnVjdG9yfFVpbnQxNkFycmF5Q29uc3RydWN0b3J8SW50MTZBcnJheUNvbnN0cnVjdG9yfEludDMyQXJyYXlDb25zdHJ1Y3RvcnxCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3J8XG4gICAgVWludDhBcnJheUNvbnN0cnVjdG9yfEZsb2F0NjRBcnJheUNvbnN0cnVjdG9yfFVpbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvciA9PiB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICAgICAgLy8gYWxsb3cgRmxvYXQxNkFycmF5IHBvbHlmaWxsLlxuICAgICAgICAgIHJldHVybiB0eXBlb2YgRmxvYXQxNkFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBGbG9hdDE2QXJyYXkuZnJvbSA/IEZsb2F0MTZBcnJheSA6IFVpbnQxNkFycmF5O1xuICAgICAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgICAgICByZXR1cm4gRmxvYXQzMkFycmF5O1xuICAgICAgICBjYXNlICd1aW50OCc6XG4gICAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XG4gICAgICAgIGNhc2UgJ2ludDgnOlxuICAgICAgICAgIHJldHVybiBJbnQ4QXJyYXk7XG4gICAgICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICAgICAgcmV0dXJuIFVpbnQxNkFycmF5O1xuICAgICAgICBjYXNlICdpbnQxNic6XG4gICAgICAgICAgcmV0dXJuIEludDE2QXJyYXk7XG4gICAgICAgIGNhc2UgJ2ludDMyJzpcbiAgICAgICAgICByZXR1cm4gSW50MzJBcnJheTtcbiAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XG4gICAgICAgIGNhc2UgJ2Zsb2F0NjQnOlxuICAgICAgICAgIHJldHVybiBGbG9hdDY0QXJyYXk7XG4gICAgICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICAgICAgcmV0dXJuIFVpbnQzMkFycmF5O1xuICAgICAgICBjYXNlICdpbnQ2NCc6XG4gICAgICAgICAgcmV0dXJuIEJpZ0ludDY0QXJyYXk7XG4gICAgICAgIGNhc2UgJ3VpbnQ2NCc6XG4gICAgICAgICAgcmV0dXJuIEJpZ1VpbnQ2NEFycmF5O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZTogJHt0eXBlfWApO1xuICAgICAgfVxuICAgIH07XG5cbi8qKlxuICogTWFwIHN0cmluZyBsb2cgbGV2ZWwgdG8gaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgbG9nTGV2ZWxTdHJpbmdUb0VudW0gPSAobG9nTGV2ZWw/OiAndmVyYm9zZSd8J2luZm8nfCd3YXJuaW5nJ3wnZXJyb3InfCdmYXRhbCcpOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGxvZ0xldmVsKSB7XG4gICAgY2FzZSAndmVyYm9zZSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdpbmZvJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAnZXJyb3InOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSAnZmF0YWwnOlxuICAgICAgcmV0dXJuIDQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHtsb2dMZXZlbH1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBnaXZlbiB0ZW5zb3IgdHlwZSBpcyBzdXBwb3J0ZWQgYnkgR1BVIGJ1ZmZlclxuICovXG5leHBvcnQgY29uc3QgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlID0gKHR5cGU6IFRlbnNvci5UeXBlKTogdHlwZSBpcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0+IHR5cGUgPT09ICdmbG9hdDMyJyB8fFxuICAgIHR5cGUgPT09ICdmbG9hdDE2JyB8fCB0eXBlID09PSAnaW50MzInIHx8IHR5cGUgPT09ICdpbnQ2NCcgfHwgdHlwZSA9PT0gJ3VpbnQzMicgfHwgdHlwZSA9PT0gJ3VpbnQ4JyB8fFxuICAgIHR5cGUgPT09ICdib29sJztcblxuLyoqXG4gKiBNYXAgc3RyaW5nIGRhdGEgbG9jYXRpb24gdG8gaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtID0gKGxvY2F0aW9uOiBUZW5zb3IuRGF0YUxvY2F0aW9uKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2NhdGlvbikge1xuICAgIGNhc2UgJ25vbmUnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgbG9jYXRpb246ICR7bG9jYXRpb259YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGludGVnZXIgZGF0YSBsb2NhdGlvbiB0byBzdHJpbmcgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvbkVudW1Ub1N0cmluZyA9IChsb2NhdGlvbjogbnVtYmVyKTogVGVuc29yLkRhdGFMb2NhdGlvbnx1bmRlZmluZWQgPT5cbiAgICAoWydub25lJywgJ2NwdScsICdjcHUtcGlubmVkJywgJ3RleHR1cmUnLCAnZ3B1LWJ1ZmZlciddIGFzIGNvbnN0KVtsb2NhdGlvbl07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7aXNOb2RlfSBmcm9tICcuL3dhc20tdXRpbHMtZW52JztcblxuLyoqXG4gKiBMb2FkIGEgZmlsZSBpbnRvIGEgVWludDhBcnJheS5cbiAqXG4gKiBAcGFyYW0gZmlsZSAtIHRoZSBmaWxlIHRvIGxvYWQuIENhbiBiZSBhIFVSTC9wYXRoLCBhIEJsb2IsIGFuIEFycmF5QnVmZmVyLCBvciBhIFVpbnQ4QXJyYXkuXG4gKiBAcmV0dXJucyBhIFVpbnQ4QXJyYXkgY29udGFpbmluZyB0aGUgZmlsZSBkYXRhLlxuICovXG5leHBvcnQgY29uc3QgbG9hZEZpbGUgPSBhc3luYyhmaWxlOiBzdHJpbmd8QmxvYnxBcnJheUJ1ZmZlckxpa2V8VWludDhBcnJheSk6IFByb21pc2U8VWludDhBcnJheT4gPT4ge1xuICBpZiAodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgLy8gbG9hZCBmaWxlIGludG8gQXJyYXlCdWZmZXIgaW4gTm9kZS5qc1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge3JlYWRGaWxlfSA9IHJlcXVpcmUoJ25vZGU6ZnMvcHJvbWlzZXMnKTtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IHJlYWRGaWxlKGZpbGUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VSUl9GU19GSUxFX1RPT19MQVJHRScpIHtcbiAgICAgICAgICAvLyBmaWxlIGlzIHRvbyBsYXJnZSwgdXNlIGZzLmNyZWF0ZVJlYWRTdHJlYW0gaW5zdGVhZFxuICAgICAgICAgIGNvbnN0IHtjcmVhdGVSZWFkU3RyZWFtfSA9IHJlcXVpcmUoJ25vZGU6ZnMnKTtcbiAgICAgICAgICBjb25zdCBzdHJlYW0gPSBjcmVhdGVSZWFkU3RyZWFtKGZpbGUpO1xuICAgICAgICAgIGNvbnN0IGNodW5rczogVWludDhBcnJheVtdID0gW107XG4gICAgICAgICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBzdHJlYW0pIHtcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KEJ1ZmZlci5jb25jYXQoY2h1bmtzKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbG9hZCBmaWxlIGludG8gQXJyYXlCdWZmZXIgaW4gYnJvd3NlcnNcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZmlsZSk7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgZmFpbGVkIHRvIGxvYWQgZXh0ZXJuYWwgZGF0YSBmaWxlOiAke2ZpbGV9YCk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb250ZW50TGVuZ3RoSGVhZGVyID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtTGVuZ3RoJyk7XG4gICAgICBjb25zdCBmaWxlU2l6ZSA9IGNvbnRlbnRMZW5ndGhIZWFkZXIgPyBwYXJzZUludChjb250ZW50TGVuZ3RoSGVhZGVyLCAxMCkgOiAwO1xuICAgICAgaWYgKGZpbGVTaXplIDwgMTA3Mzc0MTgyNCAvKiAxR0IgKi8pIHtcbiAgICAgICAgLy8gd2hlbiBDb250ZW50LUxlbmd0aCBoZWFkZXIgaXMgbm90IHNldCwgd2UgY2Fubm90IGRldGVybWluZSB0aGUgZmlsZSBzaXplLiBXZSBhc3N1bWUgaXQgaXMgc21hbGwgZW5vdWdoIHRvXG4gICAgICAgIC8vIGxvYWQgaW50byBtZW1vcnkuXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGZpbGUgaXMgdG9vIGxhcmdlLCB1c2Ugc3RyZWFtIGluc3RlYWRcbiAgICAgICAgaWYgKCFyZXNwb25zZS5ib2R5KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gbG9hZCBleHRlcm5hbCBkYXRhIGZpbGU6ICR7ZmlsZX0sIG5vIHJlc3BvbnNlIGJvZHkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcblxuICAgICAgICBsZXQgYnVmZmVyO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIHRyeSB0byBjcmVhdGUgQXJyYXlCdWZmZXIgZGlyZWN0bHlcbiAgICAgICAgICBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoZmlsZVNpemUpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBSYW5nZUVycm9yKSB7XG4gICAgICAgICAgICAvLyB1c2UgV2ViQXNzZW1ibHkgTWVtb3J5IHRvIGFsbG9jYXRlIGxhcmdlciBBcnJheUJ1ZmZlclxuICAgICAgICAgICAgY29uc3QgcGFnZXMgPSBNYXRoLmNlaWwoZmlsZVNpemUgLyA2NTUzNik7XG4gICAgICAgICAgICBidWZmZXIgPSBuZXcgV2ViQXNzZW1ibHkuTWVtb3J5KHtpbml0aWFsOiBwYWdlcywgbWF4aW11bTogcGFnZXN9KS5idWZmZXI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgY29uc3QgY2h1bmsgPSBuZXcgVWludDhBcnJheShidWZmZXIsIG9mZnNldCwgY2h1bmtTaXplKTtcbiAgICAgICAgICBjaHVuay5zZXQodmFsdWUpO1xuICAgICAgICAgIG9mZnNldCArPSBjaHVua1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgMCwgZmlsZVNpemUpO1xuICAgICAgfVxuICAgIH1cblxuICB9IGVsc2UgaWYgKGZpbGUgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKSk7XG4gIH0gZWxzZSBpZiAoZmlsZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICByZXR1cm4gZmlsZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZmlsZSk7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7RW52LCBJbmZlcmVuY2VTZXNzaW9uLCBUZW5zb3J9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSwgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEsIFRlbnNvck1ldGFkYXRhfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCB7c2V0UnVuT3B0aW9uc30gZnJvbSAnLi9ydW4tb3B0aW9ucyc7XG5pbXBvcnQge3NldFNlc3Npb25PcHRpb25zfSBmcm9tICcuL3Nlc3Npb24tb3B0aW9ucyc7XG5pbXBvcnQge2RhdGFMb2NhdGlvblN0cmluZ1RvRW51bSwgZ2V0VGVuc29yRWxlbWVudFNpemUsIGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSwgbG9nTGV2ZWxTdHJpbmdUb0VudW0sIHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nLCB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bSwgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yfSBmcm9tICcuL3dhc20tY29tbW9uJztcbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7YWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvcn0gZnJvbSAnLi93YXNtLXV0aWxzJztcbmltcG9ydCB7bG9hZEZpbGV9IGZyb20gJy4vd2FzbS11dGlscy1sb2FkLWZpbGUnO1xuXG4vLyAjcmVnaW9uIEluaXRpYWxpemF0aW9uc1xuXG4vKipcbiAqIFRoZXJlIGFyZSA0IGRpZmZlcmVudCBcImluaXRpYWxpemF0aW9uXCIgc3RlcHMgZm9yIE9SVC4gVGhleSBoYXBwZW4gaW4gZGlmZmVyZW50IHBsYWNlcyBhbmQgZGlmZmVyZW50IHRpbWUuXG4gKlxuICogMS4gSmF2YVNjcmlwdCBpbml0aWFsaXphdGlvbiBmb3Igb25ueHJ1bnRpbWUtY29tbW9uIGFuZCBvbm54cnVudGltZS13ZWIuXG4gKiAgICBUaGlzIGlzIHRoZSBmaXJzdCBpbml0aWFsaXphdGlvbiBzdGVwLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBjYWxscyBvbm54cnVudGltZS1jb21tb24ncyByZWdpc3RlckJhY2tlbmQoKVxuICogZnVuY3Rpb24gbXVsdGlwbGUgdGltZXMgdG8gcmVnaXN0ZXIgYWxsIHRoZSBhdmFpbGFibGUgYmFja2VuZHMuIFRoZSBiYWNrZW5kIHJlZ2lzdHJhdGlvbiBpcyB2ZXJ5IGZhc3QuIEl0IG9ubHlcbiAqIHJlZ2lzdGVycyB0aGUgYmFja2VuZCBuYW1lIHdpdGggdGhlIHVuaW5pdGlhbGl6ZWQgYmFja2VuZCBvYmplY3QuIE5vIGhlYXZ5IGluaXRpYWxpemF0aW9uIGlzIGRvbmUgaW4gdGhpcyBzdGVwLlxuICogICAgUmVmZXIgdG8gd2ViL2xpYi9pbmRleC50cyBmb3IgdGhlIGJhY2tlbmQgcmVnaXN0cmF0aW9uLlxuICpcbiAqIDIuIFdlYkFzc2VtYmx5IGFydGlmYWN0IGluaXRpYWxpemF0aW9uLlxuICogICAgVGhpcyBoYXBwZW5zIHdoZW4gYW55IHJlZ2lzdGVyZWQgd2FzbSBiYWNrZW5kIGlzIHVzZWQgZm9yIHRoZSBmaXJzdCB0aW1lIChpZS4gYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBvclxuICogYG9ydC5UcmFpbmluZ1Nlc3Npb24uY3JlYXRlKClgIGlzIGNhbGxlZCkuIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIGRvZXMgdGhlIGZvbGxvd2luZ3M6XG4gKiAgICAgLSBjcmVhdGUgYSBwcm94eSB3b3JrZXIgYW5kIG1ha2Ugc3VyZSB0aGUgcHJveHkgd29ya2VyIGlzIHJlYWR5IHRvIHJlY2VpdmUgbWVzc2FnZXMsIGlmIHByb3h5IGlzIGVuYWJsZWQuXG4gKiAgICAgLSBwZXJmb3JtIGZlYXR1cmUgZGV0ZWN0aW9uLCBsb2NhdGUgY29ycmVjdCBXZWJBc3NlbWJseSBhcnRpZmFjdCBwYXRoIGFuZCBjYWxsIHRoZSBFbXNjcmlwdGVuIGdlbmVyYXRlZFxuICogSmF2YVNjcmlwdCBjb2RlIHRvIGluaXRpYWxpemUgdGhlIFdlYkFzc2VtYmx5IHJ1bnRpbWUuXG4gKiAgICAgICAgIC0gaWYgcHJveHkgaXMgZW5hYmxlZCwgdGhpcyBzdGVwIGhhcHBlbnMgaW4gdGhlIHByb3h5IHdvcmtlciB1c2luZyBtZXNzYWdlICdpbml0LXdhc20nLlxuICogICAgICAgICAtIGRvd25sb2FkaW5nIHRoZSAnb3J0LXdhc217Li4ufS53YXNtJyBmaWxlIGlzIGRvbmUgaW4gdGhpcyBzdGVwLlxuICogICAgICAgICAtIGlmIG11bHRpLXRocmVhZCBpcyBlbmFibGVkLCBvbmUgb3IgbW9yZSB3ZWJ3b3JrZXIgd2lsbCBiZSBjcmVhdGVkIHRvIGluaXRpYWxpemUgdGhlIFBUaHJlYWQgdGhyZWFkcG9vbC5cbiAqXG4gKiAzLiBPUlQgZW52aXJvbm1lbnQgaW5pdGlhbGl6YXRpb24uXG4gKiAgICBUaGlzIGhhcHBlbnMgYWZ0ZXIgc3RlcCAyLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBwZXJmb3JtcyBPTk5YIFJ1bnRpbWUgZW52aXJvbm1lbnQgaW5pdGlhbGl6YXRpb24uXG4gKiBGdW5jdGlvbiBgX09ydEluaXQoKWAgaXMgY2FsbGVkIGluIHRoaXMgc3RlcC5cbiAqICAgICAtIGlmIHByb3h5IGlzIGVuYWJsZWQsIHRoaXMgc3RlcCBoYXBwZW5zIGluIHRoZSBwcm94eSB3b3JrZXIgdXNpbmcgbWVzc2FnZSAnaW5pdC1vcnQnLlxuICogICAgIC0gbG9nZ2luZyBsZXZlbCAob3J0LmVudi5sb2dMZXZlbCkgYW5kIHRocmVhZCBudW1iZXIgKG9ydC5lbnYud2FzbS5udW1UaHJlYWRzKSBhcmUgc2V0IGluIHRoaXMgc3RlcC5cbiAqXG4gKiA0LiBTZXNzaW9uIGluaXRpYWxpemF0aW9uLlxuICogICAgVGhpcyBoYXBwZW5zIHdoZW4gYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBvciBgb3J0LlRyYWluaW5nU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkLiBVbmxpa2UgdGhlIGZpcnN0IDNcbiAqIHN0ZXBzICh0aGV5IG9ubHkgY2FsbGVkIG9uY2UpLCB0aGlzIHN0ZXAgd2lsbCBiZSBkb25lIGZvciBlYWNoIHNlc3Npb24uIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIGRvZXMgdGhlXG4gKiBmb2xsb3dpbmdzOlxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVSTDpcbiAqICAgIC0gZG93bmxvYWQgdGhlIG1vZGVsIGRhdGEgZnJvbSB0aGUgVVJMLlxuICogICAgLSBjb3B5IHRoZSBtb2RlbCBkYXRhIHRvIHRoZSBXQVNNIGhlYXAuIChwcm94eTogJ2NvcHktZnJvbScpXG4gKiAgICAtIGRlcmVmZXJlbmNlIHRoZSBtb2RlbCBidWZmZXIuIFRoaXMgc3RlcCBhbGxvd3MgdGhlIG9yaWdpbmFsIEFycmF5QnVmZmVyIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxuICogICAgLSBjYWxsIGBfT3J0Q3JlYXRlU2Vzc2lvbigpYCB0byBjcmVhdGUgdGhlIHNlc3Npb24uIChwcm94eTogJ2NyZWF0ZScpXG4gKlxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVpbnQ4QXJyYXkgb2JqZWN0OlxuICogICAgLSBjb3B5IHRoZSBtb2RlbCBkYXRhIHRvIHRoZSBXQVNNIGhlYXAuIChwcm94eTogJ2NvcHktZnJvbScpXG4gKiAgICAtIGNhbGwgYF9PcnRDcmVhdGVTZXNzaW9uKClgIHRvIGNyZWF0ZSB0aGUgc2Vzc2lvbi4gKHByb3h5OiAnY3JlYXRlJylcbiAqXG4gKlxuICovXG5cbi8qKlxuICogaW5pdGlhbGl6ZSBPUlQgZW52aXJvbm1lbnQuXG4gKlxuICogQHBhcmFtIG51bVRocmVhZHMgU2V0R2xvYmFsSW50cmFPcE51bVRocmVhZHMobnVtVGhyZWFkcylcbiAqIEBwYXJhbSBsb2dnaW5nTGV2ZWwgQ3JlYXRlRW52KHN0YXRpY19jYXN0PE9ydExvZ2dpbmdMZXZlbD4obG9nZ2luZ19sZXZlbCkpXG4gKi9cbmNvbnN0IGluaXRPcnQgPSAobnVtVGhyZWFkczogbnVtYmVyLCBsb2dnaW5nTGV2ZWw6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCBlcnJvckNvZGUgPSBnZXRJbnN0YW5jZSgpLl9PcnRJbml0KG51bVRocmVhZHMsIGxvZ2dpbmdMZXZlbCk7XG4gIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBpbml0aWFsaXplIG9ubnhydW50aW1lLicpO1xuICB9XG59O1xuXG4vKipcbiAqIGludGlhbGl6ZSBydW50aW1lIGVudmlyb25tZW50LlxuICogQHBhcmFtIGVudiBwYXNzZWQgaW4gdGhlIGVudmlyb25tZW50IGNvbmZpZyBvYmplY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0UnVudGltZSA9IGFzeW5jKGVudjogRW52KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIC8vIGluaXQgT1JUXG4gIGluaXRPcnQoZW52Lndhc20ubnVtVGhyZWFkcyEsIGxvZ0xldmVsU3RyaW5nVG9FbnVtKGVudi5sb2dMZXZlbCkpO1xufTtcblxuLyoqXG4gKiBwZXJmb3JtIEVQIHNwZWNpZmljIGluaXRpYWxpemF0aW9uLlxuICpcbiAqIEBwYXJhbSBlbnZcbiAqIEBwYXJhbSBlcE5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRFcCA9IGFzeW5jKGVudjogRW52LCBlcE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbiAgICBjb25zdCBpbml0SnNlcCA9IHJlcXVpcmUoJy4vanNlcC9pbml0JykuaW5pdDtcblxuICAgIGlmIChlcE5hbWUgPT09ICd3ZWJncHUnKSB7XG4gICAgICAvLyBwZXJmb3JtIFdlYkdQVSBhdmFpbGFiaWxpdHkgY2hlY2tcbiAgICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhbmF2aWdhdG9yLmdwdSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkdQVSBpcyBub3Qgc3VwcG9ydGVkIGluIGN1cnJlbnQgZW52aXJvbm1lbnQnKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGFkYXB0ZXIgPSBlbnYud2ViZ3B1LmFkYXB0ZXIgYXMgR1BVQWRhcHRlciB8IG51bGw7XG4gICAgICBpZiAoIWFkYXB0ZXIpIHtcbiAgICAgICAgLy8gaWYgYWRhcHRlciBpcyBub3Qgc2V0LCByZXF1ZXN0IGEgbmV3IGFkYXB0ZXIuXG4gICAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9IGVudi53ZWJncHUucG93ZXJQcmVmZXJlbmNlO1xuICAgICAgICBpZiAocG93ZXJQcmVmZXJlbmNlICE9PSB1bmRlZmluZWQgJiYgcG93ZXJQcmVmZXJlbmNlICE9PSAnbG93LXBvd2VyJyAmJlxuICAgICAgICAgICAgcG93ZXJQcmVmZXJlbmNlICE9PSAnaGlnaC1wZXJmb3JtYW5jZScpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcG93ZXJQcmVmZXJlbmNlIHNldHRpbmc6IFwiJHtwb3dlclByZWZlcmVuY2V9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3JjZUZhbGxiYWNrQWRhcHRlciA9IGVudi53ZWJncHUuZm9yY2VGYWxsYmFja0FkYXB0ZXI7XG4gICAgICAgIGlmIChmb3JjZUZhbGxiYWNrQWRhcHRlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBmb3JjZUZhbGxiYWNrQWRhcHRlciAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGZvcmNlRmFsbGJhY2tBZGFwdGVyIHNldHRpbmc6IFwiJHtmb3JjZUZhbGxiYWNrQWRhcHRlcn1cImApO1xuICAgICAgICB9XG4gICAgICAgIGFkYXB0ZXIgPSBhd2FpdCBuYXZpZ2F0b3IuZ3B1LnJlcXVlc3RBZGFwdGVyKHtwb3dlclByZWZlcmVuY2UsIGZvcmNlRmFsbGJhY2tBZGFwdGVyfSk7XG4gICAgICAgIGlmICghYWRhcHRlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgJ0ZhaWxlZCB0byBnZXQgR1BVIGFkYXB0ZXIuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBuZWVkIHRvIGVuYWJsZSBmbGFnIFwiLS1lbmFibGUtdW5zYWZlLXdlYmdwdVwiIGlmIHlvdSBhcmUgdXNpbmcgQ2hyb21lLicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBhZGFwdGVyIGlzIHNldCwgdmFsaWRhdGUgaXQuXG4gICAgICAgIGlmICh0eXBlb2YgYWRhcHRlci5saW1pdHMgIT09ICdvYmplY3QnIHx8IHR5cGVvZiBhZGFwdGVyLmZlYXR1cmVzICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICAgICAgdHlwZW9mIGFkYXB0ZXIucmVxdWVzdERldmljZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBHUFUgYWRhcHRlciBzZXQgaW4gYGVudi53ZWJncHUuYWRhcHRlcmAuIEl0IG11c3QgYmUgYSBHUFVBZGFwdGVyIG9iamVjdC4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCBpbml0SnNlcCgnd2ViZ3B1JywgZ2V0SW5zdGFuY2UoKSwgZW52LCBhZGFwdGVyKTtcbiAgICB9XG4gICAgaWYgKGVwTmFtZSA9PT0gJ3dlYm5uJykge1xuICAgICAgLy8gcGVyZm9ybSBXZWJOTiBhdmFpbGFiaWxpdHkgY2hlY2tcbiAgICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhKG5hdmlnYXRvciBhcyB1bmtub3duIGFzIHttbDogdW5rbm93bn0pLm1sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViTk4gaXMgbm90IHN1cHBvcnRlZCBpbiBjdXJyZW50IGVudmlyb25tZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IGluaXRKc2VwKCd3ZWJubicsIGdldEluc3RhbmNlKCksIGVudik7XG4gICAgfVxuICB9XG59O1xuXG4vLyAjZW5kcmVnaW9uIEluaXRpYWxpemF0aW9uc1xuXG4vKipcbiAqIHZhbGlkIGRhdGEgbG9jYXRpb25zIGZvciBpbnB1dC9vdXRwdXQgdGVuc29ycy5cbiAqL1xudHlwZSBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dCA9ICdjcHUnfCdjcHUtcGlubmVkJ3wnZ3B1LWJ1ZmZlcic7XG5cbnR5cGUgSU9CaW5kaW5nU3RhdGUgPSB7XG4gIC8qKlxuICAgKiB0aGUgaGFuZGxlIG9mIElPIGJpbmRpbmcuXG4gICAqL1xuICByZWFkb25seSBoYW5kbGU6IG51bWJlcjtcblxuICAvKipcbiAgICogdGhlIHByZWZlcnJlZCBsb2NhdGlvbiBmb3IgZWFjaCBvdXRwdXQgdGVuc29yLlxuICAgKlxuICAgKiB2YWx1ZSBpcyBvbmUgb2YgJ2NwdScsICdjcHUtcGlubmVkJywgJ2dwdS1idWZmZXInLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zOiByZWFkb25seSBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dFtdO1xuXG4gIC8qKlxuICAgKiBlbnVtIHZhbHVlIG9mIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IHJlYWRvbmx5IG51bWJlcltdO1xufTtcblxuLyoqXG4gKiAgdHVwbGUgZWxlbWVudHMgYXJlOiBJbmZlcmVuY2VTZXNzaW9uIElEOyBpbnB1dE5hbWVzVVRGOEVuY29kZWQ7IG91dHB1dE5hbWVzVVRGOEVuY29kZWQ7IGJpbmRpbmdTdGF0ZVxuICovXG50eXBlIFNlc3Npb25NZXRhZGF0YSA9IFtcbiAgaW5mZXJlbmNlU2Vzc2lvbklkOiBudW1iZXIsIGlucHV0TmFtZXNVVEY4RW5jb2RlZDogbnVtYmVyW10sIG91dHB1dE5hbWVzVVRGOEVuY29kZWQ6IG51bWJlcltdLFxuICBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlfG51bGwsIGVuYWJsZUdyYXBoQ2FwdHVyZTogYm9vbGVhbiwgaW5wdXRPdXRwdXRCb3VuZDogYm9vbGVhblxuXTtcblxuY29uc3QgYWN0aXZlU2Vzc2lvbnMgPSBuZXcgTWFwPG51bWJlciwgU2Vzc2lvbk1ldGFkYXRhPigpO1xuXG4vKipcbiAqIGdldCB0aGUgaW5wdXQvb3V0cHV0IGNvdW50IG9mIHRoZSBzZXNzaW9uLlxuICogQHBhcmFtIHNlc3Npb25IYW5kbGUgdGhlIGhhbmRsZSByZXByZXNlbnRpbmcgdGhlIHNlc3Npb24uIHNob3VsZCBiZSBub24temVyby5cbiAqIEByZXR1cm5zIGEgdHVwbGUgaW5jbHVkaW5nIDIgbnVtYmVycywgcmVwcmVzZW50aW5nIHRoZSBpbnB1dCBjb3VudCBhbmQgb3V0cHV0IGNvdW50LlxuICovXG5jb25zdCBnZXRTZXNzaW9uSW5wdXRPdXRwdXRDb3VudCA9IChzZXNzaW9uSGFuZGxlOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDgpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldElucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSwgZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIDQpO1xuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGdldCBzZXNzaW9uIGlucHV0L291dHB1dCBjb3VudC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIFt3YXNtLkhFQVAzMltkYXRhT2Zmc2V0IC8gNF0sIHdhc20uSEVBUDMyW2RhdGFPZmZzZXQgLyA0ICsgMV1dO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgfVxufTtcblxuLyoqXG4gKiBhbGxvY2F0ZSB0aGUgbWVtb3J5IGFuZCBtZW1jcHkgdGhlIGV4dGVybmFsIGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0gbW9kZWwgLSB0aGUgZXh0ZXJuYWwgYnVmZmVyIGNvbnRhaW5pbmcgdGhlIG1vZGVsIGRhdGEuIE11c3Qgbm90IGJlIHRoZSBzYW1lIGJ1ZmZlciBhcyB0aGUgV0FTTSBoZWFwLlxuICogQHJldHVybnMgYSAyLWVsZW1lbnRzIHR1cGxlIC0gdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIGFsbG9jYXRlZCBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIgPSAobW9kZWw6IFVpbnQ4QXJyYXkpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IG1vZGVsRGF0YU9mZnNldCA9IHdhc20uX21hbGxvYyhtb2RlbC5ieXRlTGVuZ3RoKTtcbiAgaWYgKG1vZGVsRGF0YU9mZnNldCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgY3JlYXRlIGEgc2Vzc2lvbi4gZmFpbGVkIHRvIGFsbG9jYXRlIGEgYnVmZmVyIG9mIHNpemUgJHttb2RlbC5ieXRlTGVuZ3RofS5gKTtcbiAgfVxuICB3YXNtLkhFQVBVOC5zZXQobW9kZWwsIG1vZGVsRGF0YU9mZnNldCk7XG4gIHJldHVybiBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbC5ieXRlTGVuZ3RoXTtcbn07XG5cbi8qKlxuICogY3JlYXRlIGFuIGluZmVyZW5jZSBzZXNzaW9uIGZyb20gYSBtb2RlbCBkYXRhIGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0gbW9kZWxEYXRhIC0gZWl0aGVyIGEgVWludDhBcnJheSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBtb2RlbCBkYXRhLCBvciBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGVcbiAqICAgICBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBtb2RlbCBkYXRhIGJ1ZmZlci5cbiAqIEBwYXJhbSBvcHRpb25zIGFuIG9wdGlvbmFsIHNlc3Npb24gb3B0aW9ucyBvYmplY3QuXG4gKiBAcmV0dXJucyBhIDMtZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyBbc2Vzc2lvbiBoYW5kbGUsIGlucHV0IG5hbWVzLCBvdXRwdXQgbmFtZXNdXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID0gYXN5bmMoXG4gICAgbW9kZWxEYXRhOiBVaW50OEFycmF5fFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+ID0+IHtcbiAgbGV0IG1vZGVsRGF0YU9mZnNldDogbnVtYmVyLCBtb2RlbERhdGFMZW5ndGg6IG51bWJlcjtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkobW9kZWxEYXRhKSkge1xuICAgIC8vIGlmIG1vZGVsIGRhdGEgaXMgYW4gYXJyYXksIGl0IG11c3QgYmUgYSAyLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIG1vZGVsIGRhdGFcbiAgICBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGhdID0gbW9kZWxEYXRhO1xuICB9IGVsc2UgaWYgKG1vZGVsRGF0YS5idWZmZXIgPT09IHdhc20uSEVBUFU4LmJ1ZmZlcikge1xuICAgIC8vIGlmIG1vZGVsIGRhdGEgdXNlcyB0aGUgc2FtZSBidWZmZXIgYXMgdGhlIFdBU00gaGVhcCwgd2UgZG9uJ3QgbmVlZCB0byBjb3B5IGl0LlxuICAgIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aF0gPSBbbW9kZWxEYXRhLmJ5dGVPZmZzZXQsIG1vZGVsRGF0YS5ieXRlTGVuZ3RoXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGhlcndpc2UsIGNvcHkgdGhlIG1vZGVsIGRhdGEgdG8gdGhlIFdBU00gaGVhcC5cbiAgICBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGhdID0gY29weUZyb21FeHRlcm5hbEJ1ZmZlcihtb2RlbERhdGEpO1xuICB9XG5cbiAgbGV0IHNlc3Npb25IYW5kbGUgPSAwO1xuICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xuICBsZXQgaW9CaW5kaW5nSGFuZGxlID0gMDtcbiAgbGV0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gW107XG4gIGNvbnN0IG91dHB1dE5hbWVzVVRGOEVuY29kZWQgPSBbXTtcblxuICB0cnkge1xuICAgIFtzZXNzaW9uT3B0aW9uc0hhbmRsZSwgYWxsb2NzXSA9IHNldFNlc3Npb25PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnM/LmV4dGVybmFsRGF0YSAmJiB3YXNtLm1vdW50RXh0ZXJuYWxEYXRhKSB7XG4gICAgICBjb25zdCBsb2FkaW5nUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBvcHRpb25zLmV4dGVybmFsRGF0YSkge1xuICAgICAgICBjb25zdCBwYXRoID0gdHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnID8gZmlsZSA6IGZpbGUucGF0aDtcbiAgICAgICAgbG9hZGluZ1Byb21pc2VzLnB1c2gobG9hZEZpbGUodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnID8gZmlsZSA6IGZpbGUuZGF0YSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICB3YXNtLm1vdW50RXh0ZXJuYWxEYXRhIShwYXRoLCBkYXRhKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICAvLyB3YWl0IGZvciBhbGwgZXh0ZXJuYWwgZGF0YSBmaWxlcyB0byBiZSBsb2FkZWRcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGxvYWRpbmdQcm9taXNlcyk7XG4gICAgfVxuXG4gICAgc2Vzc2lvbkhhbmRsZSA9IGF3YWl0IHdhc20uX09ydENyZWF0ZVNlc3Npb24obW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGgsIHNlc3Npb25PcHRpb25zSGFuZGxlKTtcbiAgICBpZiAoc2Vzc2lvbkhhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIGEgc2Vzc2lvbi4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBbaW5wdXRDb3VudCwgb3V0cHV0Q291bnRdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSk7XG5cbiAgICBjb25zdCBlbmFibGVHcmFwaENhcHR1cmUgPSAhIW9wdGlvbnM/LmVuYWJsZUdyYXBoQ2FwdHVyZTtcblxuICAgIGNvbnN0IGlucHV0TmFtZXMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXROYW1lcyA9IFtdO1xuICAgIGNvbnN0IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCBuYW1lID0gd2FzbS5fT3J0R2V0SW5wdXROYW1lKHNlc3Npb25IYW5kbGUsIGkpO1xuICAgICAgaWYgKG5hbWUgPT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgZ2V0IGFuIGlucHV0IG5hbWUuJyk7XG4gICAgICB9XG4gICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lKTtcbiAgICAgIGlucHV0TmFtZXMucHVzaCh3YXNtLlVURjhUb1N0cmluZyhuYW1lKSk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgbmFtZSA9IHdhc20uX09ydEdldE91dHB1dE5hbWUoc2Vzc2lvbkhhbmRsZSwgaSk7XG4gICAgICBpZiAobmFtZSA9PT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgYW4gb3V0cHV0IG5hbWUuJyk7XG4gICAgICB9XG4gICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLnB1c2gobmFtZSk7XG4gICAgICBjb25zdCBuYW1lU3RyaW5nID0gd2FzbS5VVEY4VG9TdHJpbmcobmFtZSk7XG4gICAgICBvdXRwdXROYW1lcy5wdXNoKG5hbWVTdHJpbmcpO1xuXG4gICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQKSB7XG4gICAgICAgIGlmIChlbmFibGVHcmFwaENhcHR1cmUgJiYgb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKCdncHUtYnVmZmVyJyk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0eXBlb2Ygb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgIG9wdGlvbnMucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gOlxuICAgICAgICAgICAgb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24/LltuYW1lU3RyaW5nXSA/PyAnY3B1JztcbiAgICAgICAgaWYgKGxvY2F0aW9uICE9PSAnY3B1JyAmJiBsb2NhdGlvbiAhPT0gJ2NwdS1waW5uZWQnICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcHJlZmVycmVkIG91dHB1dCBsb2NhdGlvbjogJHtsb2NhdGlvbn0uYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHByZWZlcnJlZCBvdXRwdXQgbG9jYXRpb246ICR7XG4gICAgICAgICAgICAgIGxvY2F0aW9ufS4gT25seSAnZ3B1LWJ1ZmZlcicgbG9jYXRpb24gaXMgc3VwcG9ydGVkIHdoZW4gZW5hYmxlR3JhcGhDYXB0dXJlIGlzIHRydWUuYCk7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2gobG9jYXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVzZSBJTyBiaW5kaW5nIG9ubHkgd2hlbiBhdCBsZWFzdCBvbmUgb3V0cHV0IGlzIHByZWZmZXJlZCB0byBiZSBvbiBHUFUuXG4gICAgbGV0IGJpbmRpbmdTdGF0ZTogSU9CaW5kaW5nU3RhdGV8bnVsbCA9IG51bGw7XG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCAmJiBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMuc29tZShsID0+IGwgPT09ICdncHUtYnVmZmVyJykpIHtcbiAgICAgIGlvQmluZGluZ0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZUJpbmRpbmcoc2Vzc2lvbkhhbmRsZSk7XG4gICAgICBpZiAoaW9CaW5kaW5nSGFuZGxlID09PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBJTyBiaW5kaW5nLicpO1xuICAgICAgfVxuXG4gICAgICBiaW5kaW5nU3RhdGUgPSB7XG4gICAgICAgIGhhbmRsZTogaW9CaW5kaW5nSGFuZGxlLFxuICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsXG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5tYXAobCA9PiBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obCkpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBhY3RpdmVTZXNzaW9ucy5zZXQoXG4gICAgICAgIHNlc3Npb25IYW5kbGUsXG4gICAgICAgIFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGJpbmRpbmdTdGF0ZSwgZW5hYmxlR3JhcGhDYXB0dXJlLCBmYWxzZV0pO1xuICAgIHJldHVybiBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lcywgb3V0cHV0TmFtZXNdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goYnVmID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG4gICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuXG4gICAgaWYgKGlvQmluZGluZ0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nSGFuZGxlKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbkhhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb24oc2Vzc2lvbkhhbmRsZSk7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5fZnJlZShtb2RlbERhdGFPZmZzZXQpO1xuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zKHNlc3Npb25PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgYWxsb2NzLmZvckVhY2goYWxsb2MgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xuXG4gICAgLy8gdW5tb3VudCBleHRlcm5hbCBkYXRhIGlmIG5lY2Vzc2FyeVxuICAgIHdhc20udW5tb3VudEV4dGVybmFsRGF0YT8uKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByZWxlYXNlU2Vzc2lvbiA9IChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCByZWxlYXNlIHNlc3Npb24uIGludmFsaWQgc2Vzc2lvbiBpZDogJHtzZXNzaW9uSWR9YCk7XG4gIH1cbiAgY29uc3QgW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZCwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCwgaW9CaW5kaW5nU3RhdGUsIGVuYWJsZUdyYXBoQ2FwdHVyZV0gPSBzZXNzaW9uO1xuXG4gIGlmIChpb0JpbmRpbmdTdGF0ZSkge1xuICAgIGlmIChlbmFibGVHcmFwaENhcHR1cmUpIHtcbiAgICAgIHdhc20uX09ydENsZWFyQm91bmRPdXRwdXRzKGlvQmluZGluZ1N0YXRlLmhhbmRsZSk7XG4gICAgfVxuICAgIHdhc20uX09ydFJlbGVhc2VCaW5kaW5nKGlvQmluZGluZ1N0YXRlLmhhbmRsZSk7XG4gIH1cblxuICB3YXNtLmpzZXBPblJlbGVhc2VTZXNzaW9uPy4oc2Vzc2lvbklkKTtcblxuICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKTtcbiAgYWN0aXZlU2Vzc2lvbnMuZGVsZXRlKHNlc3Npb25JZCk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yID1cbiAgICAodGVuc29yOiBUZW5zb3JNZXRhZGF0YXxudWxsLCB0ZW5zb3JIYW5kbGVzOiBudW1iZXJbXSwgYWxsb2NzOiBudW1iZXJbXSwgc2Vzc2lvbklkOiBudW1iZXIsIGluZGV4OiBudW1iZXIsXG4gICAgIGVuYWJsZUdyYXBoQ2FwdHVyZSA9IGZhbHNlKTogdm9pZCA9PiB7XG4gICAgICBpZiAoIXRlbnNvcikge1xuICAgICAgICB0ZW5zb3JIYW5kbGVzLnB1c2goMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgICAgIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xuICAgICAgY29uc3QgZGltcyA9IHRlbnNvclsxXTtcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGVuc29yWzNdO1xuXG4gICAgICBsZXQgcmF3RGF0YTogbnVtYmVyO1xuICAgICAgbGV0IGRhdGFCeXRlTGVuZ3RoOiBudW1iZXI7XG5cbiAgICAgIGlmIChkYXRhVHlwZSA9PT0gJ3N0cmluZycgJiYgbG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbmFibGVHcmFwaENhcHR1cmUgJiYgbG9jYXRpb24gIT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgRXh0ZXJuYWwgYnVmZmVyIG11c3QgYmUgcHJvdmlkZWQgZm9yIGlucHV0L291dHB1dCBpbmRleCAke2luZGV4fSB3aGVuIGVuYWJsZUdyYXBoQ2FwdHVyZSBpcyB0cnVlLmApO1xuICAgICAgfVxuXG4gICAgICBpZiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICBjb25zdCBncHVCdWZmZXIgPSB0ZW5zb3JbMl0uZ3B1QnVmZmVyIGFzIEdQVUJ1ZmZlcjtcbiAgICAgICAgY29uc3QgZWxlbWVudFNpemVJbkJ5dGVzID0gZ2V0VGVuc29yRWxlbWVudFNpemUodGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpKSE7XG4gICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGltcy5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKSAqIGVsZW1lbnRTaXplSW5CeXRlcztcblxuICAgICAgICBjb25zdCByZWdpc3RlckJ1ZmZlciA9IHdhc20uanNlcFJlZ2lzdGVyQnVmZmVyO1xuICAgICAgICBpZiAoIXJlZ2lzdGVyQnVmZmVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgbG9jYXRpb24gXCJncHUtYnVmZmVyXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYkdQVS4nKTtcbiAgICAgICAgfVxuICAgICAgICByYXdEYXRhID0gcmVnaXN0ZXJCdWZmZXIoc2Vzc2lvbklkLCBpbmRleCwgZ3B1QnVmZmVyLCBkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgLy8gc3RyaW5nIHRlbnNvclxuICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gNCAqIGRhdGEubGVuZ3RoO1xuICAgICAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgICAgIGFsbG9jcy5wdXNoKHJhd0RhdGEpO1xuICAgICAgICAgIGxldCBkYXRhSW5kZXggPSByYXdEYXRhIC8gNDtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtpXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdGVuc29yIGRhdGEgYXQgaW5kZXggJHtpfSBpcyBub3QgYSBzdHJpbmdgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdhc20uSEVBUFUzMltkYXRhSW5kZXgrK10gPSBhbGxvY1dhc21TdHJpbmcoZGF0YVtpXSwgYWxsb2NzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YUJ5dGVMZW5ndGggPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XG4gICAgICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICAgICAgd2FzbS5IRUFQVTguc2V0KG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGFCeXRlTGVuZ3RoKSwgcmF3RGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xuICAgICAgY29uc3QgZGltc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogZGltcy5sZW5ndGgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IGRpbUluZGV4ID0gZGltc09mZnNldCAvIDQ7XG4gICAgICAgIGRpbXMuZm9yRWFjaChkID0+IHdhc20uSEVBUDMyW2RpbUluZGV4KytdID0gZCk7XG4gICAgICAgIGNvbnN0IHRlbnNvciA9IHdhc20uX09ydENyZWF0ZVRlbnNvcihcbiAgICAgICAgICAgIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgcmF3RGF0YSwgZGF0YUJ5dGVMZW5ndGgsIGRpbXNPZmZzZXQsIGRpbXMubGVuZ3RoLFxuICAgICAgICAgICAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGxvY2F0aW9uKSk7XG4gICAgICAgIGlmICh0ZW5zb3IgPT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgY3JlYXRlIHRlbnNvciBmb3IgaW5wdXQvb3V0cHV0LiBzZXNzaW9uPSR7c2Vzc2lvbklkfSwgaW5kZXg9JHtpbmRleH0uYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGVuc29ySGFuZGxlcy5wdXNoKHRlbnNvcik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gICAgICB9XG4gICAgfTtcblxuLyoqXG4gKiBwZXJmb3JtIGluZmVyZW5jZSBydW5cbiAqL1xuZXhwb3J0IGNvbnN0IHJ1biA9IGFzeW5jKFxuICAgIHNlc3Npb25JZDogbnVtYmVyLCBpbnB1dEluZGljZXM6IG51bWJlcltdLCBpbnB1dFRlbnNvcnM6IFRlbnNvck1ldGFkYXRhW10sIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxuICAgIG91dHB1dFRlbnNvcnM6IEFycmF5PFRlbnNvck1ldGFkYXRhfG51bGw+LCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPFRlbnNvck1ldGFkYXRhW10+ID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcnVuIGluZmVyZW5jZS4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcbiAgfVxuICBjb25zdCBzZXNzaW9uSGFuZGxlID0gc2Vzc2lvblswXTtcbiAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gc2Vzc2lvblsxXTtcbiAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IHNlc3Npb25bMl07XG4gIGNvbnN0IGlvQmluZGluZ1N0YXRlID0gc2Vzc2lvblszXTtcbiAgY29uc3QgZW5hYmxlR3JhcGhDYXB0dXJlID0gc2Vzc2lvbls0XTtcbiAgY29uc3QgaW5wdXRPdXRwdXRCb3VuZCA9IHNlc3Npb25bNV07XG5cbiAgY29uc3QgaW5wdXRDb3VudCA9IGlucHV0SW5kaWNlcy5sZW5ndGg7XG4gIGNvbnN0IG91dHB1dENvdW50ID0gb3V0cHV0SW5kaWNlcy5sZW5ndGg7XG5cbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xuICBsZXQgcnVuT3B0aW9uc0FsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBpbnB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IG91dHB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IGlucHV0T3V0cHV0QWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IGJlZm9yZVJ1blN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgY29uc3QgaW5wdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIDQpO1xuICBjb25zdCBpbnB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKGlucHV0Q291bnQgKiA0KTtcbiAgY29uc3Qgb3V0cHV0VmFsdWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG4gIGNvbnN0IG91dHB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG5cbiAgdHJ5IHtcbiAgICBbcnVuT3B0aW9uc0hhbmRsZSwgcnVuT3B0aW9uc0FsbG9jc10gPSBzZXRSdW5PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgLy8gY3JlYXRlIGlucHV0IHRlbnNvcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKFxuICAgICAgICAgIGlucHV0VGVuc29yc1tpXSwgaW5wdXRUZW5zb3JIYW5kbGVzLCBpbnB1dE91dHB1dEFsbG9jcywgc2Vzc2lvbklkLCBpbnB1dEluZGljZXNbaV0sIGVuYWJsZUdyYXBoQ2FwdHVyZSk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG91dHB1dCB0ZW5zb3JzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IoXG4gICAgICAgICAgb3V0cHV0VGVuc29yc1tpXSwgb3V0cHV0VGVuc29ySGFuZGxlcywgaW5wdXRPdXRwdXRBbGxvY3MsIHNlc3Npb25JZCwgaW5wdXRDb3VudCArIG91dHB1dEluZGljZXNbaV0sXG4gICAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlKTtcbiAgICB9XG5cbiAgICBsZXQgaW5wdXRWYWx1ZXNJbmRleCA9IGlucHV0VmFsdWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgaW5wdXROYW1lc0luZGV4ID0gaW5wdXROYW1lc09mZnNldCAvIDQ7XG4gICAgbGV0IG91dHB1dFZhbHVlc0luZGV4ID0gb3V0cHV0VmFsdWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgb3V0cHV0TmFtZXNJbmRleCA9IG91dHB1dE5hbWVzT2Zmc2V0IC8gNDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5IRUFQVTMyW2lucHV0VmFsdWVzSW5kZXgrK10gPSBpbnB1dFRlbnNvckhhbmRsZXNbaV07XG4gICAgICB3YXNtLkhFQVBVMzJbaW5wdXROYW1lc0luZGV4KytdID0gaW5wdXROYW1lc1VURjhFbmNvZGVkW2lucHV0SW5kaWNlc1tpXV07XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5IRUFQVTMyW291dHB1dFZhbHVlc0luZGV4KytdID0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXTtcbiAgICAgIHdhc20uSEVBUFUzMltvdXRwdXROYW1lc0luZGV4KytdID0gb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtvdXRwdXRJbmRpY2VzW2ldXTtcbiAgICB9XG5cbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQICYmIGlvQmluZGluZ1N0YXRlICYmICFpbnB1dE91dHB1dEJvdW5kKSB7XG4gICAgICBjb25zdCB7aGFuZGxlLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWR9ID0gaW9CaW5kaW5nU3RhdGU7XG5cbiAgICAgIGlmIChpbnB1dE5hbWVzVVRGOEVuY29kZWQubGVuZ3RoICE9PSBpbnB1dENvdW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW5wdXQgY291bnQgZnJvbSBmZWVkcyAoJHtcbiAgICAgICAgICAgIGlucHV0Q291bnR9KSBpcyBleHBlY3RlZCB0byBiZSBhbHdheXMgZXF1YWwgdG8gbW9kZWwncyBpbnB1dCBjb3VudCAoJHtpbnB1dE5hbWVzVVRGOEVuY29kZWQubGVuZ3RofSkuYCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHByb2Nlc3MgaW5wdXRzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IGlucHV0SW5kaWNlc1tpXTtcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0QmluZElucHV0KGhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgaW5wdXRUZW5zb3JIYW5kbGVzW2ldKTtcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIGlucHV0WyR7aX1dIGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBwcm9jZXNzIHByZS1hbGxvY2F0ZWQgb3V0cHV0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gb3V0cHV0SW5kaWNlc1tpXTtcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBvdXRwdXRUZW5zb3JzW2ldPy5bM107ICAvLyB1bmRlZmluZWQgbWVhbnMgb3V0cHV0IGlzIG5vdCBwcmUtYWxsb2NhdGVkLlxuXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgIC8vIG91dHB1dCBpcyBwcmUtYWxsb2NhdGVkLiBiaW5kIHRoZSB0ZW5zb3IuXG4gICAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0QmluZE91dHB1dChoYW5kbGUsIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCBvdXRwdXRUZW5zb3JIYW5kbGVzW2ldLCAwKTtcbiAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBwcmUtYWxsb2NhdGVkIG91dHB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG91dHB1dCBpcyBub3QgcHJlLWFsbG9jYXRlZC4gcmVzZXQgcHJlZmVycmVkIGxvY2F0aW9uLlxuICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9XG4gICAgICAgICAgICAgIHdhc20uX09ydEJpbmRPdXRwdXQoaGFuZGxlLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgMCwgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZFtpbmRleF0pO1xuICAgICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIG91dHB1dFske2l9XSB0byAke291dHB1dFByZWZlcnJlZExvY2F0aW9uc1tpXX0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KFxuICAgICAgICAgIHNlc3Npb25JZCxcbiAgICAgICAgICBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZSwgZW5hYmxlR3JhcGhDYXB0dXJlLCB0cnVlXSk7XG4gICAgfVxuXG4gICAgd2FzbS5qc2VwT25SdW5TdGFydD8uKHNlc3Npb25IYW5kbGUpO1xuICAgIGxldCBlcnJvckNvZGU6IG51bWJlcjtcbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQICYmIGlvQmluZGluZ1N0YXRlKSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW5XaXRoQmluZGluZyhcbiAgICAgICAgICBzZXNzaW9uSGFuZGxlLCBpb0JpbmRpbmdTdGF0ZS5oYW5kbGUsIG91dHB1dENvdW50LCBvdXRwdXRWYWx1ZXNPZmZzZXQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW4oXG4gICAgICAgICAgc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc09mZnNldCwgaW5wdXRWYWx1ZXNPZmZzZXQsIGlucHV0Q291bnQsIG91dHB1dE5hbWVzT2Zmc2V0LCBvdXRwdXRDb3VudCxcbiAgICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cblxuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdmYWlsZWQgdG8gY2FsbCBPcnRSdW4oKS4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXQ6IFRlbnNvck1ldGFkYXRhW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgdGVuc29yID0gd2FzbS5IRUFQVTMyW291dHB1dFZhbHVlc09mZnNldCAvIDQgKyBpXTtcbiAgICAgIGlmICh0ZW5zb3IgPT09IG91dHB1dFRlbnNvckhhbmRsZXNbaV0pIHtcbiAgICAgICAgLy8gb3V0cHV0IHRlbnNvciBpcyBwcmUtYWxsb2NhdGVkLiBubyBuZWVkIHRvIGNvcHkgZGF0YS5cbiAgICAgICAgb3V0cHV0LnB1c2gob3V0cHV0VGVuc29yc1tpXSEpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgICAgIC8vIHN0YWNrIGFsbG9jYXRlIDQgcG9pbnRlciB2YWx1ZVxuICAgICAgY29uc3QgdGVuc29yRGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogNCk7XG5cbiAgICAgIGxldCBrZWVwT3V0cHV0VGVuc29yID0gZmFsc2U7XG4gICAgICBsZXQgdHlwZTogVGVuc29yLlR5cGV8dW5kZWZpbmVkLCBkYXRhT2Zmc2V0ID0gMDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldFRlbnNvckRhdGEoXG4gICAgICAgICAgICB0ZW5zb3IsIHRlbnNvckRhdGFPZmZzZXQsIHRlbnNvckRhdGFPZmZzZXQgKyA0LCB0ZW5zb3JEYXRhT2Zmc2V0ICsgOCwgdGVuc29yRGF0YU9mZnNldCArIDEyKTtcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBhY2Nlc3Mgb3V0cHV0IHRlbnNvciBkYXRhIG9uIGluZGV4ICR7aX0uYCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRlbnNvckRhdGFJbmRleCA9IHRlbnNvckRhdGFPZmZzZXQgLyA0O1xuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGRhdGFPZmZzZXQgPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgY29uc3QgZGltc0xlbmd0aCA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGNvbnN0IGRpbXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBkaW1zLnB1c2god2FzbS5IRUFQVTMyW2RpbXNPZmZzZXQgLyA0ICsgaV0pO1xuICAgICAgICB9XG4gICAgICAgIHdhc20uX09ydEZyZWUoZGltc09mZnNldCk7XG5cbiAgICAgICAgY29uc3Qgc2l6ZSA9IGRpbXMucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSk7XG4gICAgICAgIHR5cGUgPSB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhkYXRhVHlwZSk7XG5cbiAgICAgICAgY29uc3QgcHJlZmVycmVkTG9jYXRpb24gPSBpb0JpbmRpbmdTdGF0ZT8ub3V0cHV0UHJlZmVycmVkTG9jYXRpb25zW291dHB1dEluZGljZXNbaV1dO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN0cmluZ0RhdGE6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgbGV0IGRhdGFJbmRleCA9IGRhdGFPZmZzZXQgLyA0O1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB3YXNtLkhFQVBVMzJbZGF0YUluZGV4KytdO1xuICAgICAgICAgICAgY29uc3QgbWF4Qnl0ZXNUb1JlYWQgPSBpID09PSBzaXplIC0gMSA/IHVuZGVmaW5lZCA6IHdhc20uSEVBUFUzMltkYXRhSW5kZXhdIC0gb2Zmc2V0O1xuICAgICAgICAgICAgc3RyaW5nRGF0YS5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG9mZnNldCwgbWF4Qnl0ZXNUb1JlYWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIHN0cmluZ0RhdGEsICdjcHUnXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgYSBjZXJ0YWluIG91dHB1dCdzIHByZWZlcnJlZCBsb2NhdGlvbiBpcyBHUFUgYnV0IHRoZSB0ZW5zb3IgaXMgZW1wdHksIHdlIHN0aWxsIG5lZWQgdG8gY3JlYXRlIGEgQ1BVXG4gICAgICAgICAgLy8gdGVuc29yIGZvciBpdC4gVGhlcmUgaXMgbm8gbWFwcGluZyBHUFUgYnVmZmVyIGZvciBhbiBlbXB0eSB0ZW5zb3IuXG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgJiYgc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGdldEJ1ZmZlciA9IHdhc20uanNlcEdldEJ1ZmZlcjtcbiAgICAgICAgICAgIGlmICghZ2V0QnVmZmVyKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJlZmVycmVkTG9jYXRpb24gXCJncHUtYnVmZmVyXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYkdQVS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IGdldEJ1ZmZlcihkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTaXplID0gZ2V0VGVuc29yRWxlbWVudFNpemUoZGF0YVR5cGUpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRTaXplID09PSB1bmRlZmluZWQgfHwgIWlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSh0eXBlKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkbyBub3QgcmVsZWFzZSB0aGUgdGVuc29yIHJpZ2h0IG5vdy4gaXQgd2lsbCBiZSByZWxlYXNlZCB3aGVuIHVzZXIgY2FsbHMgdGVuc29yLmRpc3Bvc2UoKS5cbiAgICAgICAgICAgIGtlZXBPdXRwdXRUZW5zb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBvdXRwdXQucHVzaChbXG4gICAgICAgICAgICAgIHR5cGUsIGRpbXMsIHtcbiAgICAgICAgICAgICAgICBncHVCdWZmZXIsXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6IHdhc20uanNlcENyZWF0ZURvd25sb2FkZXIhKGdwdUJ1ZmZlciwgc2l6ZSAqIGVsZW1lbnRTaXplLCB0eXBlKSxcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnZ3B1LWJ1ZmZlcidcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlZEFycmF5Q29uc3RydWN0b3IgPSB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3IodHlwZSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IHR5cGVkQXJyYXlDb25zdHJ1Y3RvcihzaXplKTtcbiAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGEuYnl0ZUxlbmd0aClcbiAgICAgICAgICAgICAgICAuc2V0KHdhc20uSEVBUFU4LnN1YmFycmF5KGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBkYXRhLmJ5dGVMZW5ndGgpKTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBkYXRhLCAnY3B1J10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIGRhdGFPZmZzZXQpIHtcbiAgICAgICAgICB3YXNtLl9mcmVlKGRhdGFPZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgha2VlcE91dHB1dFRlbnNvcikge1xuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpb0JpbmRpbmdTdGF0ZSAmJiAhZW5hYmxlR3JhcGhDYXB0dXJlKSB7XG4gICAgICB3YXNtLl9PcnRDbGVhckJvdW5kT3V0cHV0cyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpO1xuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KFxuICAgICAgICAgIHNlc3Npb25JZCxcbiAgICAgICAgICBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZSwgZW5hYmxlR3JhcGhDYXB0dXJlLCBmYWxzZV0pO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKGJlZm9yZVJ1blN0YWNrKTtcblxuICAgIGlucHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKHYgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XG4gICAgb3V0cHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKHYgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XG4gICAgaW5wdXRPdXRwdXRBbGxvY3MuZm9yRWFjaChwID0+IHdhc20uX2ZyZWUocCkpO1xuXG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgIHdhc20uX09ydFJlbGVhc2VSdW5PcHRpb25zKHJ1bk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cbiAgICBydW5PcHRpb25zQWxsb2NzLmZvckVhY2gocCA9PiB3YXNtLl9mcmVlKHApKTtcbiAgfVxufTtcblxuLyoqXG4gKiBlbmQgcHJvZmlsaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBlbmRQcm9maWxpbmcgPSAoc2Vzc2lvbklkOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHNlc3Npb24gaWQnKTtcbiAgfVxuICBjb25zdCBzZXNzaW9uSGFuZGxlID0gc2Vzc2lvblswXTtcblxuICAvLyBwcm9maWxlIGZpbGUgbmFtZSBpcyBub3QgdXNlZCB5ZXQsIGJ1dCBpdCBtdXN0IGJlIGZyZWVkLlxuICBjb25zdCBwcm9maWxlRmlsZU5hbWUgPSB3YXNtLl9PcnRFbmRQcm9maWxpbmcoc2Vzc2lvbkhhbmRsZSk7XG4gIGlmIChwcm9maWxlRmlsZU5hbWUgPT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgYW4gcHJvZmlsZSBmaWxlIG5hbWUuJyk7XG4gIH1cbiAgd2FzbS5fT3J0RnJlZShwcm9maWxlRmlsZU5hbWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzID0gKHRlbnNvcnM6IHJlYWRvbmx5IFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10pOiBBcnJheUJ1ZmZlckxpa2VbXSA9PiB7XG4gIGNvbnN0IGJ1ZmZlcnM6IEFycmF5QnVmZmVyTGlrZVtdID0gW107XG4gIGZvciAoY29uc3QgdGVuc29yIG9mIHRlbnNvcnMpIHtcbiAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSAmJiAnYnVmZmVyJyBpbiBkYXRhKSB7XG4gICAgICBidWZmZXJzLnB1c2goZGF0YS5idWZmZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnVmZmVycztcbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7ZW52LCBJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge09ydFdhc21NZXNzYWdlLCBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciwgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLCBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSwgVGVuc29yTWV0YWRhdGF9IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0ICogYXMgY29yZSBmcm9tICcuL3dhc20tY29yZS1pbXBsJztcbmltcG9ydCB7aW5pdGlhbGl6ZVdlYkFzc2VtYmx5fSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQge2ltcG9ydFByb3h5V29ya2VyfSBmcm9tICcuL3dhc20tdXRpbHMtaW1wb3J0JztcblxuY29uc3QgaXNQcm94eSA9ICgpOiBib29sZWFuID0+ICEhZW52Lndhc20ucHJveHkgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbmxldCBwcm94eVdvcmtlcjogV29ya2VyfHVuZGVmaW5lZDtcbmxldCBpbml0aWFsaXppbmcgPSBmYWxzZTtcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xubGV0IGFib3J0ZWQgPSBmYWxzZTtcbmxldCB0ZW1wb3JhcnlPYmplY3RVcmw6IHN0cmluZ3x1bmRlZmluZWQ7XG5cbnR5cGUgUHJvbWlzZUNhbGxiYWNrczxUID0gdm9pZD4gPSBbcmVzb2x2ZTogKHJlc3VsdDogVCkgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uOiB1bmtub3duKSA9PiB2b2lkXTtcbmxldCBpbml0V2FzbUNhbGxiYWNrczogUHJvbWlzZUNhbGxiYWNrcztcbmNvbnN0IHF1ZXVlZENhbGxiYWNrczogTWFwPE9ydFdhc21NZXNzYWdlWyd0eXBlJ10sIEFycmF5PFByb21pc2VDYWxsYmFja3M8dW5rbm93bj4+PiA9IG5ldyBNYXAoKTtcblxuY29uc3QgZW5xdWV1ZUNhbGxiYWNrcyA9ICh0eXBlOiBPcnRXYXNtTWVzc2FnZVsndHlwZSddLCBjYWxsYmFja3M6IFByb21pc2VDYWxsYmFja3M8dW5rbm93bj4pOiB2b2lkID0+IHtcbiAgY29uc3QgcXVldWUgPSBxdWV1ZWRDYWxsYmFja3MuZ2V0KHR5cGUpO1xuICBpZiAocXVldWUpIHtcbiAgICBxdWV1ZS5wdXNoKGNhbGxiYWNrcyk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWVkQ2FsbGJhY2tzLnNldCh0eXBlLCBbY2FsbGJhY2tzXSk7XG4gIH1cbn07XG5cbmNvbnN0IGVuc3VyZVdvcmtlciA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKGluaXRpYWxpemluZyB8fCAhaW5pdGlhbGl6ZWQgfHwgYWJvcnRlZCB8fCAhcHJveHlXb3JrZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvcmtlciBub3QgcmVhZHknKTtcbiAgfVxufTtcblxuY29uc3Qgb25Qcm94eVdvcmtlck1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudDxPcnRXYXNtTWVzc2FnZT4pOiB2b2lkID0+IHtcbiAgc3dpdGNoIChldi5kYXRhLnR5cGUpIHtcbiAgICBjYXNlICdpbml0LXdhc20nOlxuICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgaW5pdFdhc21DYWxsYmFja3NbMF0oKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wb3JhcnlPYmplY3RVcmwpIHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0ZW1wb3JhcnlPYmplY3RVcmwpO1xuICAgICAgICB0ZW1wb3JhcnlPYmplY3RVcmwgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbml0LWVwJzpcbiAgICBjYXNlICdjb3B5LWZyb20nOlxuICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgY2FzZSAncmVsZWFzZSc6XG4gICAgY2FzZSAncnVuJzpcbiAgICBjYXNlICdlbmQtcHJvZmlsaW5nJzoge1xuICAgICAgY29uc3QgY2FsbGJhY2tzID0gcXVldWVkQ2FsbGJhY2tzLmdldChldi5kYXRhLnR5cGUpITtcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBjYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2tzLnNoaWZ0KCkhWzBdKGV2LmRhdGEub3V0ISk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgfVxufTtcblxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSA9IGFzeW5jKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGluaXRpYWxpemluZykge1xuICAgIHRocm93IG5ldyBFcnJvcignbXVsdGlwbGUgY2FsbHMgdG8gXFwnaW5pdFdhc20oKVxcJyBkZXRlY3RlZC4nKTtcbiAgfVxuICBpZiAoYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJldmlvdXMgY2FsbCB0byBcXCdpbml0V2FzbSgpXFwnIGZhaWxlZC4nKTtcbiAgfVxuXG4gIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcHJveHlXb3JrZXI/LnRlcm1pbmF0ZSgpO1xuXG4gICAgICB2b2lkIGltcG9ydFByb3h5V29ya2VyKCkudGhlbigoW29iamVjdFVybCwgd29ya2VyXSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHByb3h5V29ya2VyID0gd29ya2VyO1xuICAgICAgICAgIHByb3h5V29ya2VyLm9uZXJyb3IgPSAoZXY6IEVycm9yRXZlbnQpID0+IHJlamVjdChldik7XG4gICAgICAgICAgcHJveHlXb3JrZXIub25tZXNzYWdlID0gb25Qcm94eVdvcmtlck1lc3NhZ2U7XG4gICAgICAgICAgaW5pdFdhc21DYWxsYmFja3MgPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnaW5pdC13YXNtJywgaW4gOiBlbnZ9O1xuICAgICAgICAgIHByb3h5V29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgIHRlbXBvcmFyeU9iamVjdFVybCA9IG9iamVjdFVybDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBpbml0aWFsaXplV2ViQXNzZW1ibHkoZW52Lndhc20pO1xuICAgICAgYXdhaXQgY29yZS5pbml0UnVudGltZShlbnYpO1xuICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZU9ydEVwID0gYXN5bmMoZXBOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnaW5pdC1lcCcsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdpbml0LWVwJywgaW4gOiB7ZXBOYW1lLCBlbnZ9fTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhd2FpdCBjb3JlLmluaXRFcChlbnYsIGVwTmFtZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb3B5RnJvbUV4dGVybmFsQnVmZmVyID0gYXN5bmMoYnVmZmVyOiBVaW50OEFycmF5KTogUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnY29weS1mcm9tJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2NvcHktZnJvbScsIGluIDoge2J1ZmZlcn19O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFtidWZmZXIuYnVmZmVyXSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvcmUuY29weUZyb21FeHRlcm5hbEJ1ZmZlcihidWZmZXIpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9XG4gICAgYXN5bmMobW9kZWw6IFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyfFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcbiAgICAgICAgUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+ID0+IHtcbiAgICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xuICAgICAgICAgICAgLy8gY2hlY2sgdW5zdXBwb3J0ZWQgb3B0aW9uc1xuICAgICAgICAgICAgaWYgKG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc2Vzc2lvbiBvcHRpb24gXCJwcmVmZXJyZWRPdXRwdXRMb2NhdGlvblwiIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5zdXJlV29ya2VyKCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgIGVucXVldWVDYWxsYmFja3MoJ2NyZWF0ZScsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2NyZWF0ZScsIGluIDoge21vZGVsLCBvcHRpb25zOiB7Li4ub3B0aW9uc319fTtcbiAgICAgICAgICAgICAgY29uc3QgdHJhbnNmZXJhYmxlOiBUcmFuc2ZlcmFibGVbXSA9IFtdO1xuICAgICAgICAgICAgICBpZiAobW9kZWwgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmZXJhYmxlLnB1c2gobW9kZWwuYnVmZmVyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgdHJhbnNmZXJhYmxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY29yZS5jcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbmV4cG9ydCBjb25zdCByZWxlYXNlU2Vzc2lvbiA9IGFzeW5jKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ3JlbGVhc2UnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAncmVsZWFzZScsIGluIDogc2Vzc2lvbklkfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb3JlLnJlbGVhc2VTZXNzaW9uKHNlc3Npb25JZCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyhcbiAgICBzZXNzaW9uSWQ6IG51bWJlciwgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSwgaW5wdXRzOiBUZW5zb3JNZXRhZGF0YVtdLCBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcbiAgICBvdXRwdXRzOiBBcnJheTxUZW5zb3JNZXRhZGF0YXxudWxsPiwgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgLy8gY2hlY2sgaW5wdXRzIGxvY2F0aW9uXG4gICAgaWYgKGlucHV0cy5zb21lKHQgPT4gdFszXSAhPT0gJ2NwdScpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lucHV0IHRlbnNvciBvbiBHUFUgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XG4gICAgfVxuICAgIC8vIGNoZWNrIG91dHB1dHMgbG9jYXRpb25cbiAgICBpZiAob3V0cHV0cy5zb21lKHQgPT4gdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncHJlLWFsbG9jYXRlZCBvdXRwdXQgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygncnVuJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3Qgc2VyaWFsaXphYmxlSW5wdXRzID0gaW5wdXRzIGFzIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW107ICAvLyBldmVyeSBpbnB1dCBpcyBvbiBDUFUuXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9XG4gICAgICAgICAge3R5cGU6ICdydW4nLCBpbiA6IHtzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzOiBzZXJpYWxpemFibGVJbnB1dHMsIG91dHB1dEluZGljZXMsIG9wdGlvbnN9fTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBjb3JlLmV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzKHNlcmlhbGl6YWJsZUlucHV0cykpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLnJ1bihzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IGFzeW5jKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2VuZC1wcm9maWxpbmcnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnZW5kLXByb2ZpbGluZycsIGluIDogc2Vzc2lvbklkfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb3JlLmVuZFByb2ZpbGluZyhzZXNzaW9uSWQpO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb24sIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyLCBTZXNzaW9uSGFuZGxlciwgVGVuc29yLCBUUkFDRV9GVU5DX0JFR0lOLCBUUkFDRV9GVU5DX0VORH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciwgVGVuc29yTWV0YWRhdGF9IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0IHtjb3B5RnJvbUV4dGVybmFsQnVmZmVyLCBjcmVhdGVTZXNzaW9uLCBlbmRQcm9maWxpbmcsIHJlbGVhc2VTZXNzaW9uLCBydW59IGZyb20gJy4vcHJveHktd3JhcHBlcic7XG5pbXBvcnQge2lzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZX0gZnJvbSAnLi93YXNtLWNvbW1vbic7XG5pbXBvcnQge2lzTm9kZX0gZnJvbSAnLi93YXNtLXV0aWxzLWVudic7XG5pbXBvcnQge2xvYWRGaWxlfSBmcm9tICcuL3dhc20tdXRpbHMtbG9hZC1maWxlJztcblxuZXhwb3J0IGNvbnN0IGVuY29kZVRlbnNvck1ldGFkYXRhID0gKHRlbnNvcjogVGVuc29yLCBnZXROYW1lOiAoKSA9PiBzdHJpbmcpOiBUZW5zb3JNZXRhZGF0YSA9PiB7XG4gIHN3aXRjaCAodGVuc29yLmxvY2F0aW9uKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBbdGVuc29yLnR5cGUsIHRlbnNvci5kaW1zLCB0ZW5zb3IuZGF0YSwgJ2NwdSddO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHtncHVCdWZmZXI6IHRlbnNvci5ncHVCdWZmZXJ9LCAnZ3B1LWJ1ZmZlciddO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBsb2NhdGlvbjogJHt0ZW5zb3IubG9jYXRpb259IGZvciAke2dldE5hbWUoKX1gKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRlY29kZVRlbnNvck1ldGFkYXRhID0gKHRlbnNvcjogVGVuc29yTWV0YWRhdGEpOiBUZW5zb3IgPT4ge1xuICBzd2l0Y2ggKHRlbnNvclszXSkge1xuICAgIGNhc2UgJ2NwdSc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih0ZW5zb3JbMF0sIHRlbnNvclsyXSwgdGVuc29yWzFdKTtcbiAgICBjYXNlICdncHUtYnVmZmVyJzoge1xuICAgICAgY29uc3QgZGF0YVR5cGUgPSB0ZW5zb3JbMF07XG4gICAgICBpZiAoIWlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZShkYXRhVHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGRhdGEgdHlwZTogJHtkYXRhVHlwZX0gZm9yIGRlc2VyaWFsaXppbmcgR1BVIHRlbnNvcmApO1xuICAgICAgfVxuICAgICAgY29uc3Qge2dwdUJ1ZmZlciwgZG93bmxvYWQsIGRpc3Bvc2V9ID0gdGVuc29yWzJdO1xuICAgICAgcmV0dXJuIFRlbnNvci5mcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwge2RhdGFUeXBlLCBkaW1zOiB0ZW5zb3JbMV0sIGRvd25sb2FkLCBkaXNwb3NlfSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBsb2NhdGlvbjogJHt0ZW5zb3JbM119YCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIgaW1wbGVtZW50cyBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciB7XG4gIHByaXZhdGUgc2Vzc2lvbklkOiBudW1iZXI7XG5cbiAgaW5wdXROYW1lczogc3RyaW5nW107XG4gIG91dHB1dE5hbWVzOiBzdHJpbmdbXTtcblxuICBhc3luYyBmZXRjaE1vZGVsQW5kQ29weVRvV2FzbU1lbW9yeShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyPiB7XG4gICAgLy8gZmV0Y2ggbW9kZWwgZnJvbSB1cmwgYW5kIG1vdmUgdG8gd2FzbSBoZWFwLlxuICAgIHJldHVybiBjb3B5RnJvbUV4dGVybmFsQnVmZmVyKGF3YWl0IGxvYWRGaWxlKHBhdGgpKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRNb2RlbChwYXRoT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcbiAgICBsZXQgbW9kZWw6IFBhcmFtZXRlcnM8dHlwZW9mIGNyZWF0ZVNlc3Npb24+WzBdO1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoT3JCdWZmZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgIC8vIG5vZGVcbiAgICAgICAgbW9kZWwgPSBhd2FpdCBsb2FkRmlsZShwYXRoT3JCdWZmZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYnJvd3NlclxuICAgICAgICAvLyBmZXRjaCBtb2RlbCBhbmQgY29weSB0byB3YXNtIGhlYXAuXG4gICAgICAgIG1vZGVsID0gYXdhaXQgdGhpcy5mZXRjaE1vZGVsQW5kQ29weVRvV2FzbU1lbW9yeShwYXRoT3JCdWZmZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtb2RlbCA9IHBhdGhPckJ1ZmZlcjtcbiAgICB9XG5cbiAgICBbdGhpcy5zZXNzaW9uSWQsIHRoaXMuaW5wdXROYW1lcywgdGhpcy5vdXRwdXROYW1lc10gPSBhd2FpdCBjcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcbiAgICBUUkFDRV9GVU5DX0VORCgpO1xuICB9XG5cbiAgYXN5bmMgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gcmVsZWFzZVNlc3Npb24odGhpcy5zZXNzaW9uSWQpO1xuICB9XG5cbiAgYXN5bmMgcnVuKGZlZWRzOiBTZXNzaW9uSGFuZGxlci5GZWVkc1R5cGUsIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIGNvbnN0IGlucHV0QXJyYXk6IFRlbnNvcltdID0gW107XG4gICAgY29uc3QgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIE9iamVjdC5lbnRyaWVzKGZlZWRzKS5mb3JFYWNoKGt2cCA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmlucHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGlucHV0ICcke25hbWV9J2ApO1xuICAgICAgfVxuICAgICAgaW5wdXRBcnJheS5wdXNoKHRlbnNvcik7XG4gICAgICBpbnB1dEluZGljZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvdXRwdXRBcnJheTogQXJyYXk8VGVuc29yfG51bGw+ID0gW107XG4gICAgY29uc3Qgb3V0cHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBPYmplY3QuZW50cmllcyhmZXRjaGVzKS5mb3JFYWNoKGt2cCA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm91dHB1dE5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvdXRwdXQgJyR7bmFtZX0nYCk7XG4gICAgICB9XG4gICAgICBvdXRwdXRBcnJheS5wdXNoKHRlbnNvcik7XG4gICAgICBvdXRwdXRJbmRpY2VzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaW5wdXRzID1cbiAgICAgICAgaW5wdXRBcnJheS5tYXAoKHQsIGkpID0+IGVuY29kZVRlbnNvck1ldGFkYXRhKHQsICgpID0+IGBpbnB1dCBcIiR7dGhpcy5pbnB1dE5hbWVzW2lucHV0SW5kaWNlc1tpXV19XCJgKSk7XG4gICAgY29uc3Qgb3V0cHV0cyA9IG91dHB1dEFycmF5Lm1hcChcbiAgICAgICAgKHQsIGkpID0+IHQgPyBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgb3V0cHV0IFwiJHt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dfVwiYCkgOiBudWxsKTtcblxuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBydW4odGhpcy5zZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHJlc3VsdE1hcDogU2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZSA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0TWFwW3RoaXMub3V0cHV0TmFtZXNbb3V0cHV0SW5kaWNlc1tpXV1dID0gb3V0cHV0QXJyYXlbaV0gPz8gZGVjb2RlVGVuc29yTWV0YWRhdGEocmVzdWx0c1tpXSk7XG4gICAgfVxuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XG4gICAgcmV0dXJuIHJlc3VsdE1hcDtcbiAgfVxuXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCBwcm9maWxpbmdcbiAgfVxuXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB2b2lkIGVuZFByb2ZpbGluZyh0aGlzLnNlc3Npb25JZCk7XG4gIH1cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtCYWNrZW5kLCBlbnYsIEluZmVyZW5jZVNlc3Npb24sIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge2luaXRpYWxpemVPcnRFcCwgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZX0gZnJvbSAnLi93YXNtL3Byb3h5LXdyYXBwZXInO1xuaW1wb3J0IHtPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXJ9IGZyb20gJy4vd2FzbS9zZXNzaW9uLWhhbmRsZXItaW5mZXJlbmNlJztcbmltcG9ydCB7c2NyaXB0U3JjfSBmcm9tICcuL3dhc20vd2FzbS11dGlscy1pbXBvcnQnO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgYWxsIGZsYWdzIGZvciBXZWJBc3NlbWJseS5cbiAqXG4gKiBUaG9zZSBmbGFncyBhcmUgYWNjZXNzaWJsZSBmcm9tIGBvcnQuZW52Lndhc21gLiBVc2VycyBhcmUgYWxsb3cgdG8gc2V0IHRob3NlIGZsYWdzIGJlZm9yZSB0aGUgZmlyc3QgaW5mZXJlbmNlIHNlc3Npb25cbiAqIGJlaW5nIGNyZWF0ZWQsIHRvIG92ZXJyaWRlIGRlZmF1bHQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplRmxhZ3MgPSAoKTogdm9pZCA9PiB7XG4gIGlmICh0eXBlb2YgZW52Lndhc20uaW5pdFRpbWVvdXQgIT09ICdudW1iZXInIHx8IGVudi53YXNtLmluaXRUaW1lb3V0IDwgMCkge1xuICAgIGVudi53YXNtLmluaXRUaW1lb3V0ID0gMDtcbiAgfVxuXG4gIGlmIChlbnYud2FzbS5zaW1kID09PSBmYWxzZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKFxuICAgICAgICAnRGVwcmVjYXRlZCBwcm9wZXJ0eSBcImVudi53YXNtLnNpbWRcIiBpcyBzZXQgdG8gZmFsc2UuICcgK1xuICAgICAgICAnbm9uLVNJTUQgYnVpbGQgaXMgbm8gbG9uZ2VyIHByb3ZpZGVkLCBhbmQgdGhpcyBzZXR0aW5nIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW52Lndhc20ucHJveHkgIT09ICdib29sZWFuJykge1xuICAgIGVudi53YXNtLnByb3h5ID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGVudi53YXNtLnRyYWNlICE9PSAnYm9vbGVhbicpIHtcbiAgICBlbnYud2FzbS50cmFjZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5udW1UaHJlYWRzICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihlbnYud2FzbS5udW1UaHJlYWRzKSB8fCBlbnYud2FzbS5udW1UaHJlYWRzIDw9IDApIHtcbiAgICAvLyBUaGUgZm9sbG93aW5nIGxvZ2ljIG9ubHkgYXBwbGllcyB3aGVuIGBvcnQuZW52Lndhc20ubnVtVGhyZWFkc2AgaXMgbm90IHNldCBieSB1c2VyLiBXZSB3aWxsIGFsd2F5cyBob25vciB1c2VyJ3NcbiAgICAvLyBzZXR0aW5nIGlmIGl0IGlzIHByb3ZpZGVkLlxuXG4gICAgLy8gQnJvd3Nlcjogd2hlbiBjcm9zc09yaWdpbklzb2xhdGVkIGlzIGZhbHNlLCBTaGFyZWRBcnJheUJ1ZmZlciBpcyBub3QgYXZhaWxhYmxlIHNvIFdlYkFzc2VtYmx5IHRocmVhZHMgd2lsbCBub3RcbiAgICAvLyB3b3JrLiBJbiB0aGlzIGNhc2UsIHdlIHdpbGwgc2V0IG51bVRocmVhZHMgdG8gMS5cbiAgICAvL1xuICAgIC8vIFRoZXJlIGlzIGFuIGV4Y2VwdGlvbjogd2hlbiB0aGUgYnJvd3NlciBpcyBjb25maWd1cmVkIHRvIGZvcmNlLWVuYWJsZSBTaGFyZWRBcnJheUJ1ZmZlciAoZS5nLiBDaHJvbXVpbSB3aXRoXG4gICAgLy8gLS1lbmFibGUtZmVhdHVyZXM9U2hhcmVkQXJyYXlCdWZmZXIpLCBpdCBpcyBwb3NzaWJsZSB0aGF0IGBzZWxmLmNyb3NzT3JpZ2luSXNvbGF0ZWRgIGlzIGZhbHNlIGFuZFxuICAgIC8vIFNoYXJlZEFycmF5QnVmZmVyIGlzIGF2YWlsYWJsZSBhdCB0aGUgc2FtZSB0aW1lLiBUaGlzIGlzIHVzdWFsbHkgZm9yIHRlc3RpbmcuIEluIHRoaXMgY2FzZSwgIHdlIHdpbGwgc3RpbGwgc2V0XG4gICAgLy8gbnVtVGhyZWFkcyB0byAxIGhlcmUuIElmIHdlIHdhbnQgdG8gZW5hYmxlIG11bHRpLXRocmVhZGluZyBpbiB0ZXN0LCB3ZSBzaG91bGQgc2V0IGBvcnQuZW52Lndhc20ubnVtVGhyZWFkc2AgdG8gYVxuICAgIC8vIHZhbHVlIGdyZWF0ZXIgdGhhbiAxLlxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgIXNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZCkge1xuICAgICAgZW52Lndhc20ubnVtVGhyZWFkcyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG51bUNwdUxvZ2ljYWxDb3JlcyA9XG4gICAgICAgICAgdHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCdub2RlOm9zJykuY3B1cygpLmxlbmd0aCA6IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5O1xuICAgICAgZW52Lndhc20ubnVtVGhyZWFkcyA9IE1hdGgubWluKDQsIE1hdGguY2VpbCgobnVtQ3B1TG9naWNhbENvcmVzIHx8IDEpIC8gMikpO1xuICAgIH1cbiAgfVxuXG4gIC8vIG92ZXJ3cml0ZSB3YXNtIHBhdGhzIG92ZXJyaWRlIGlmIG5vdCBzZXRcbiAgaWYgKGVudi53YXNtLndhc21QYXRocyA9PT0gdW5kZWZpbmVkICYmIHNjcmlwdFNyYyAmJiBzY3JpcHRTcmMuaW5kZXhPZignYmxvYjonKSAhPT0gMCkge1xuICAgIGVudi53YXNtLndhc21QYXRocyA9IHNjcmlwdFNyYy5zdWJzdHJpbmcoMCwgc2NyaXB0U3JjLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kIGltcGxlbWVudHMgQmFja2VuZCB7XG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBXZWJBc3NlbWJseSBiYWNrZW5kLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIG9ubHkgb25jZSBmb3IgZWFjaCBiYWNrZW5kIG5hbWUuIEl0IHdpbGwgYmUgY2FsbGVkIHRoZSBmaXJzdCB0aW1lIHdoZW5cbiAgICogYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBpcyBjYWxsZWQgd2l0aCBhIHJlZ2lzdGVyZWQgYmFja2VuZCBuYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gYmFja2VuZE5hbWUgLSB0aGUgcmVnaXN0ZXJlZCBiYWNrZW5kIG5hbWUuXG4gICAqL1xuICBhc3luYyBpbml0KGJhY2tlbmROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBwb3B1bGF0ZSB3YXNtIGZsYWdzXG4gICAgaW5pdGlhbGl6ZUZsYWdzKCk7XG5cbiAgICAvLyBpbml0IHdhc21cbiAgICBhd2FpdCBpbml0aWFsaXplV2ViQXNzZW1ibHlBbmRPcnRSdW50aW1lKCk7XG5cbiAgICAvLyBwZXJmb3JtZSBFUCBzcGVjaWZpYyBpbml0aWFsaXphdGlvblxuICAgIGF3YWl0IGluaXRpYWxpemVPcnRFcChiYWNrZW5kTmFtZSk7XG4gIH1cbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIocGF0aDogc3RyaW5nLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoYnVmZmVyOiBVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcbiAgYXN5bmMgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIocGF0aE9yQnVmZmVyOiBzdHJpbmd8VWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgT25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyKCk7XG4gICAgYXdhaXQgaGFuZGxlci5sb2FkTW9kZWwocGF0aE9yQnVmZmVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGhhbmRsZXIpO1xuICB9XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7T25ueHJ1bnRpbWVXZWJBc3NlbWJseUJhY2tlbmR9IGZyb20gJy4vYmFja2VuZC13YXNtJztcbmV4cG9ydCBjb25zdCB3YXNtQmFja2VuZCA9IG5ldyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCgpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzICovXG5cbi8vIFdlIHVzZSBcInJlcXVpcmVcIiBpbnN0ZWFkIG9mIFwiaW1wb3J0XCIgaGVyZSBiZWNhdXNlIGltcG9ydCBzdGF0ZW1lbnQgbXVzdCBiZSBwdXQgaW4gdG9wIGxldmVsLiBPdXIgY3VycmVudCBjb2RlIGRvZXNcbi8vIG5vdCBhbGxvdyBidW5kbGVyIHRvIHRyZWUtc2hha2luZyBjb2RlIGFzIGV4cGVjdGVkIGJlY2F1c2Ugc29tZSBjb2RlcyBhcmUgdHJlYXRlZCBhcyBoYXZpbmcgc2lkZSBlZmZlY3RzLlxuLy8gU28gd2UgaW1wb3J0IGNvZGUgaW5zaWRlIHRoZSBpZi1jbGF1c2UgdG8gYWxsb3cgYnVuZGxlciByZW1vdmUgdGhlIGNvZGUgc2FmZWx5LlxuXG5leHBvcnQgKiBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuaW1wb3J0ICogYXMgb3J0IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5leHBvcnQgZGVmYXVsdCBvcnQ7XG5cbmltcG9ydCB7cmVnaXN0ZXJCYWNrZW5kLCBlbnZ9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5pbXBvcnQge3ZlcnNpb259IGZyb20gJy4vdmVyc2lvbic7XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdMKSB7XG4gIGNvbnN0IG9ubnhqc0JhY2tlbmQgPSByZXF1aXJlKCcuL2JhY2tlbmQtb25ueGpzJykub25ueGpzQmFja2VuZDtcbiAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJnbCcsIG9ubnhqc0JhY2tlbmQsIC0xMCk7XG59XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU00pIHtcbiAgY29uc3Qgd2FzbUJhY2tlbmQgPSBCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkcgPyByZXF1aXJlKCcuL2JhY2tlbmQtd2FzbS1pbmZlcmVuY2UnKS53YXNtQmFja2VuZCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZSgnLi9iYWNrZW5kLXdhc20tdHJhaW5pbmcnKS53YXNtQmFja2VuZDtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCkge1xuICAgIHJlZ2lzdGVyQmFja2VuZCgnd2ViZ3B1Jywgd2FzbUJhY2tlbmQsIDUpO1xuICAgIHJlZ2lzdGVyQmFja2VuZCgnd2Vibm4nLCB3YXNtQmFja2VuZCwgNSk7XG4gIH1cbiAgcmVnaXN0ZXJCYWNrZW5kKCdjcHUnLCB3YXNtQmFja2VuZCwgMTApO1xuICByZWdpc3RlckJhY2tlbmQoJ3dhc20nLCB3YXNtQmFja2VuZCwgMTApO1xufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZW52LnZlcnNpb25zLCAnd2ViJywge3ZhbHVlOiB2ZXJzaW9uLCBlbnVtZXJhYmxlOiB0cnVlfSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgL2pzL3NjcmlwdHMvdXBkYXRlLXZlcnNpb24udHNcbi8vIERvIG5vdCBtb2RpZnkgZmlsZSBjb250ZW50IG1hbnVhbGx5LlxuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcxLjE5LjAtZGV2LjIwMjQwNjA4LWJkNjFhZTUzMGInO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFnQk0sVUFDQSwwQkFZTyxpQkF3Q1AsZ0NBd0NPO0FBN0diOzs7QUFnQkEsTUFBTSxXQUFxQyxvQkFBSSxJQUFHO0FBQ2xELE1BQU0sMkJBQXFDLENBQUE7QUFZcEMsTUFBTSxrQkFBa0IsQ0FBQyxNQUFjLFNBQWtCLGFBQTBCO0FBQ3hGLFlBQUksV0FBVyxPQUFPLFFBQVEsU0FBUyxjQUFjLE9BQU8sUUFBUSxrQ0FBa0MsWUFBWTtBQUNoSCxnQkFBTSxpQkFBaUIsU0FBUyxJQUFJLElBQUk7QUFDeEMsY0FBSSxtQkFBbUIsUUFBVztBQUNoQyxxQkFBUyxJQUFJLE1BQU0sRUFBQyxTQUFTLFNBQVEsQ0FBQztxQkFDN0IsZUFBZSxXQUFXLFVBQVU7QUFFN0M7cUJBQ1MsZUFBZSxhQUFhLFVBQVU7QUFDL0MsZ0JBQUksZUFBZSxZQUFZLFNBQVM7QUFDdEMsb0JBQU0sSUFBSSxNQUFNLDRCQUE0QixJQUFJLG9CQUFvQixRQUFRLEVBQUU7OztBQUlsRixjQUFJLFlBQVksR0FBRztBQUNqQixrQkFBTSxJQUFJLHlCQUF5QixRQUFRLElBQUk7QUFDL0Ms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QU8sUUFBUSxRQUFRLE9BQU87QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQTtBQUFBOzs7QUMzRkE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlhO0FBSmI7QUFBQTtBQUFBO0FBR0E7QUFDTyxNQUFNLGNBQWMsSUFBSSw4QkFBOEI7QUFBQTtBQUFBOzs7QUNKN0Q7QUFBQTtBQUFBLDRCQUFBQztBQUFBLElBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQUFDO0FBQUEsSUFBQSx1QkFBQUM7QUFBQSxJQUFBO0FBQUEsZUFBQUM7QUFBQSxJQUFBO0FBQUE7QUFTQTtBQUNBO0FBR0E7OztBQ1BPLE1BQU1DLFdBQVU7OztBREt2QixNQUFPLGNBQVE7QUFLZixNQUFJLE9BQTJCO0FBQzdCLFVBQU0sZ0JBQWdCLEtBQTRCO0FBQ2xELG9CQUFnQixTQUFTLGVBQWUsR0FBRztBQUFBLEVBQzdDO0FBRUEsTUFBSSxNQUEwQjtBQUM1QixVQUFNQyxlQUFjLE9BQThCLDhFQUFvQyxjQUNwQyxLQUFtQztBQUNyRixRQUFJLE9BQTBCO0FBQzVCLHNCQUFnQixVQUFVQSxjQUFhLENBQUM7QUFDeEMsc0JBQWdCLFNBQVNBLGNBQWEsQ0FBQztBQUFBLElBQ3pDO0FBQ0Esb0JBQWdCLE9BQU9BLGNBQWEsRUFBRTtBQUN0QyxvQkFBZ0IsUUFBUUEsY0FBYSxFQUFFO0FBQUEsRUFDekM7QUFFQSxTQUFPLGVBQWVDLEtBQUksVUFBVSxPQUFPLEVBQUMsT0FBT0MsVUFBUyxZQUFZLEtBQUksQ0FBQzsiLAogICJuYW1lcyI6IFsiaSIsICJlbnYiLCAiVGVuc29yIiwgIlRlbnNvciIsICJJbmZlcmVuY2VTZXNzaW9uIiwgIlRlbnNvciIsICJUcmFpbmluZ1Nlc3Npb24iLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiVHJhaW5pbmdTZXNzaW9uIiwgImVudiIsICJlbnYiLCAid2FzbSIsICJ3YXNtIiwgIndhc20iLCAibG9jYXRpb24iLCAiZW52IiwgIndhc20iLCAibG9jYXRpb24iLCAidGVuc29yIiwgImVycm9yQ29kZSIsICJpIiwgImluaXRpYWxpemluZyIsICJpbml0aWFsaXplZCIsICJhYm9ydGVkIiwgImNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIiLCAiY3JlYXRlU2Vzc2lvbiIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJUZW5zb3IiLCAiY29weUZyb21FeHRlcm5hbEJ1ZmZlciIsICJjcmVhdGVTZXNzaW9uIiwgInJlbGVhc2VTZXNzaW9uIiwgInJ1biIsICJlbmRQcm9maWxpbmciLCAiZW52IiwgIkluZmVyZW5jZVNlc3Npb24iLCAiVGVuc29yIiwgIlRyYWluaW5nU2Vzc2lvbiIsICJlbnYiLCAidmVyc2lvbiIsICJ3YXNtQmFja2VuZCIsICJlbnYiLCAidmVyc2lvbiJdCn0K
