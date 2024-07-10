/*!
 * ONNX Runtime Web v1.19.0-esmtest.20240618-d229c160
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
      version = "1.19.0-esmtest.20240618-d229c160";
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
        (true ? null : false ? null : null).default
      ) : void 0;
      importWasmModule = async (urlOverride, prefixOverride, isMultiThreaded) => {
        if (false) {
          return [void 0, embeddedWasmModule];
        } else {
          const wasmModuleFilename = true ? "ort-training-wasm-simd-threaded.mjs" : false ? "ort-wasm-simd-threaded.jsep.mjs" : "ort-wasm-simd-threaded.mjs";
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
            numThreads
          };
          if (wasmPathOverride || wasmPrefixOverride) {
            config.locateFile = (fileName, scriptDirectory) => wasmPathOverride ?? (wasmPrefixOverride ?? scriptDirectory) + fileName;
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
        if (true) {
          if (env2.wasm.wasmPaths === void 0 && scriptSrc && scriptSrc.indexOf("blob:") !== 0) {
            env2.wasm.wasmPaths = scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);
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
          return Promise.resolve(handler);
        }
      };
    }
  });

  // web/lib/wasm/wasm-training-core-impl.ts
  var NO_TRAIN_FUNCS_MSG, ifErrCodeCheckLastError, createCheckpointHandle, getModelInputOutputCount, getModelInputOutputNamesLoop, getModelInputOutputNames, createTrainingSessionHandle, createAndAllocateTensors, moveOutputToTensorMetadataArr, lazyResetGrad, runTrainStep, runOptimizerStep, runEvalStep, getParametersSize, getContiguousParameters, loadParametersBuffer, releaseTrainingSessionAndCheckpoint;
  var init_wasm_training_core_impl = __esm({
    "web/lib/wasm/wasm-training-core-impl.ts"() {
      "use strict";
      init_run_options();
      init_session_options();
      init_wasm_common();
      init_wasm_core_impl();
      init_wasm_factory();
      init_wasm_utils();
      NO_TRAIN_FUNCS_MSG = "Built without training API's enabled. Use the onnxruntime-web/training import for training functionality, and make sure that all the correct artifacts are built & moved to the correct folder if using a custom build. Check https://onnxruntime.ai/docs/build/web.html for more information.";
      ifErrCodeCheckLastError = (errCode, message, checkNeqZero = true) => {
        if (checkNeqZero && errCode !== 0) {
          checkLastError(message);
        } else if (!checkNeqZero && errCode === 0) {
          checkLastError(message);
        }
      };
      createCheckpointHandle = (checkpointData) => {
        const wasm2 = getInstance();
        const [checkpointDataOffset, checkpointDataLength] = checkpointData;
        let checkpointHandle = 0;
        try {
          if (wasm2._OrtTrainingLoadCheckpoint) {
            checkpointHandle = wasm2._OrtTrainingLoadCheckpoint(checkpointDataOffset, checkpointDataLength);
          } else {
            throw new Error(NO_TRAIN_FUNCS_MSG);
          }
          ifErrCodeCheckLastError(checkpointHandle, "Error occurred when trying to create a CheckpointState", false);
          return checkpointHandle;
        } catch (e) {
          if (wasm2._OrtTrainingReleaseCheckpoint && checkpointHandle !== 0) {
            wasm2._OrtTrainingReleaseCheckpoint(checkpointHandle);
          }
          throw e;
        } finally {
          wasm2._OrtFree(checkpointData[0]);
        }
      };
      getModelInputOutputCount = (trainingSessionId, isEvalModel) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        try {
          const dataOffset = wasm2.stackAlloc(8);
          if (wasm2._OrtTrainingGetModelInputOutputCount) {
            const errorCode = wasm2._OrtTrainingGetModelInputOutputCount(trainingSessionId, dataOffset, dataOffset + 4, isEvalModel);
            ifErrCodeCheckLastError(errorCode, "Can't get session input/output count.");
            return [wasm2.HEAP32[dataOffset / 4], wasm2.HEAP32[dataOffset / 4 + 1]];
          } else {
            throw new Error(NO_TRAIN_FUNCS_MSG);
          }
        } finally {
          wasm2.stackRestore(stack);
        }
      };
      getModelInputOutputNamesLoop = (trainingSessionId, count, isInput, isEvalModel) => {
        const names = [];
        const wasm2 = getInstance();
        for (let i = 0; i < count; i++) {
          if (wasm2._OrtTrainingGetModelInputOutputName) {
            const name = wasm2._OrtTrainingGetModelInputOutputName(trainingSessionId, i, isInput, isEvalModel);
            ifErrCodeCheckLastError(name, `Can't get input or output name -- is input: ${isInput}, index ${i}`, false);
            names.push(wasm2.UTF8ToString(name));
            wasm2._free(name);
          } else {
            throw new Error(NO_TRAIN_FUNCS_MSG);
          }
        }
        return names;
      };
      getModelInputOutputNames = (trainingSessionId, isEvalModel) => {
        let inputNames = [];
        let outputNames = [];
        const [inputCount, outputCount] = getModelInputOutputCount(trainingSessionId, isEvalModel);
        inputNames = getModelInputOutputNamesLoop(trainingSessionId, inputCount, true, isEvalModel);
        outputNames = getModelInputOutputNamesLoop(trainingSessionId, outputCount, false, isEvalModel);
        return [inputNames, outputNames];
      };
      createTrainingSessionHandle = (checkpointHandle, trainModelData, evalModelData, optimizerModelData, options) => {
        const wasm2 = getInstance();
        let trainingSessionHandle = 0;
        let sessionOptionsHandle = 0;
        let allocs = [];
        try {
          [sessionOptionsHandle, allocs] = setSessionOptions(options);
          if (wasm2._OrtTrainingCreateSession) {
            trainingSessionHandle = wasm2._OrtTrainingCreateSession(
              sessionOptionsHandle,
              checkpointHandle,
              trainModelData[0],
              trainModelData[1],
              evalModelData[0],
              evalModelData[1],
              optimizerModelData[0],
              optimizerModelData[1]
            );
          } else {
            throw new Error(NO_TRAIN_FUNCS_MSG);
          }
          ifErrCodeCheckLastError(trainingSessionHandle, "Error occurred when trying to create a TrainingSession", false);
          return trainingSessionHandle;
        } catch (e) {
          if (wasm2._OrtTrainingReleaseSession && trainingSessionHandle !== 0) {
            wasm2._OrtTrainingReleaseSession(trainingSessionHandle);
          }
          throw e;
        } finally {
          wasm2._free(trainModelData[0]);
          wasm2._free(evalModelData[0]);
          wasm2._free(optimizerModelData[0]);
          if (sessionOptionsHandle !== 0) {
            wasm2._OrtReleaseSessionOptions(sessionOptionsHandle);
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
        }
      };
      createAndAllocateTensors = (trainingSessionId, indices, tensors, tensorHandles, inputOutputAllocs, indexAdd) => {
        const count = indices.length;
        for (let i = 0; i < count; i++) {
          prepareInputOutputTensor(
            tensors[i],
            tensorHandles,
            inputOutputAllocs,
            trainingSessionId,
            indexAdd + indices[i]
          );
        }
        const wasm2 = getInstance();
        const valuesOffset = wasm2.stackAlloc(count * 4);
        let valuesIndex = valuesOffset / 4;
        for (let i = 0; i < count; i++) {
          wasm2.HEAPU32[valuesIndex++] = tensorHandles[i];
        }
        return valuesOffset;
      };
      moveOutputToTensorMetadataArr = (outputValuesOffset, outputCount, outputTensorHandles, outputTensors) => {
        const wasm2 = getInstance();
        const output = [];
        for (let i = 0; i < outputCount; i++) {
          const tensor = wasm2.HEAPU32[outputValuesOffset / 4 + i];
          if (tensor === outputTensorHandles[i]) {
            output.push(outputTensors[i]);
            continue;
          }
          const beforeGetTensorDataStack = wasm2.stackSave();
          const tensorDataOffset = wasm2.stackAlloc(4 * 4);
          let type, dataOffset = 0;
          try {
            const errorCode = wasm2._OrtGetTensorData(
              tensor,
              tensorDataOffset,
              tensorDataOffset + 4,
              tensorDataOffset + 8,
              tensorDataOffset + 12
            );
            ifErrCodeCheckLastError(errorCode, `Can't access output tensor data on index ${i}.`);
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
            if (type === "string") {
              const stringData = [];
              let dataIndex = dataOffset / 4;
              for (let i2 = 0; i2 < size; i2++) {
                const offset = wasm2.HEAPU32[dataIndex++];
                const maxBytesToRead = i2 === size - 1 ? void 0 : wasm2.HEAPU32[dataIndex] - offset;
                stringData.push(wasm2.UTF8ToString(offset, maxBytesToRead));
              }
              output.push([type, dims, stringData, "cpu"]);
            } else {
              const typedArrayConstructor = tensorTypeToTypedArrayConstructor(type);
              const data = new typedArrayConstructor(size);
              new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(wasm2.HEAPU8.subarray(dataOffset, dataOffset + data.byteLength));
              output.push([type, dims, data, "cpu"]);
            }
          } finally {
            wasm2.stackRestore(beforeGetTensorDataStack);
            if (type === "string" && dataOffset) {
              wasm2._free(dataOffset);
            }
            wasm2._OrtReleaseTensor(tensor);
          }
        }
        return output;
      };
      lazyResetGrad = async (trainingSessionId) => {
        const wasm2 = getInstance();
        if (wasm2._OrtTrainingLazyResetGrad) {
          const errorCode = wasm2._OrtTrainingLazyResetGrad(trainingSessionId);
          ifErrCodeCheckLastError(errorCode, "Can't call lazyResetGrad.");
        } else {
          throw new Error(NO_TRAIN_FUNCS_MSG);
        }
      };
      runTrainStep = async (trainingSessionId, inputIndices, inputTensors, outputIndices, outputTensors, options) => {
        const wasm2 = getInstance();
        const inputCount = inputIndices.length;
        const outputCount = outputIndices.length;
        let runOptionsHandle = 0;
        let runOptionsAllocs = [];
        const inputTensorHandles = [];
        const outputTensorHandles = [];
        const inputOutputAllocs = [];
        const beforeRunStack = wasm2.stackSave();
        try {
          [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);
          const inputValuesOffset = createAndAllocateTensors(
            trainingSessionId,
            inputIndices,
            inputTensors,
            inputTensorHandles,
            inputOutputAllocs,
            0
          );
          const outputValuesOffset = createAndAllocateTensors(
            trainingSessionId,
            outputIndices,
            outputTensors,
            outputTensorHandles,
            inputOutputAllocs,
            inputCount
          );
          if (wasm2._OrtTrainingRunTrainStep) {
            const errorCode = wasm2._OrtTrainingRunTrainStep(
              trainingSessionId,
              inputValuesOffset,
              inputCount,
              outputValuesOffset,
              outputCount,
              runOptionsHandle
            );
            ifErrCodeCheckLastError(errorCode, "failed to call OrtTrainingRunTrainStep in the WebAssembly layer");
          } else {
            throw new Error(NO_TRAIN_FUNCS_MSG);
          }
          return moveOutputToTensorMetadataArr(outputValuesOffset, outputCount, outputTensorHandles, outputTensors);
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
      runOptimizerStep = async (trainingSessionId, options) => {
        const wasm2 = getInstance();
        let runOptionsHandle = 0;
        let runOptionsAllocs = [];
        try {
          [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);
          if (wasm2._OrtTrainingOptimizerStep) {
            const errCode = wasm2._OrtTrainingOptimizerStep(trainingSessionId, runOptionsHandle);
            ifErrCodeCheckLastError(errCode, "Failed to call OrtTrainingOptimizerStep in the WebAssembly layer");
          } else {
            throw new Error(NO_TRAIN_FUNCS_MSG);
          }
        } finally {
          if (runOptionsHandle !== 0) {
            wasm2._OrtReleaseRunOptions(runOptionsHandle);
          }
          runOptionsAllocs.forEach((p) => wasm2._free(p));
        }
      };
      runEvalStep = async (trainingSessionId, inputIndices, inputTensors, outputIndices, outputTensors, options) => {
        const wasm2 = getInstance();
        const inputCount = inputIndices.length;
        const outputCount = outputIndices.length;
        let runOptionsHandle = 0;
        let runOptionsAllocs = [];
        const inputTensorHandles = [];
        const outputTensorHandles = [];
        const inputOutputAllocs = [];
        const beforeRunStack = wasm2.stackSave();
        try {
          [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);
          const inputValuesOffset = createAndAllocateTensors(
            trainingSessionId,
            inputIndices,
            inputTensors,
            inputTensorHandles,
            inputOutputAllocs,
            0
          );
          const outputValuesOffset = createAndAllocateTensors(
            trainingSessionId,
            outputIndices,
            outputTensors,
            outputTensorHandles,
            inputOutputAllocs,
            inputCount
          );
          if (wasm2._OrtTrainingEvalStep) {
            const errorCode = wasm2._OrtTrainingEvalStep(
              trainingSessionId,
              inputValuesOffset,
              inputCount,
              outputValuesOffset,
              outputCount,
              runOptionsHandle
            );
            ifErrCodeCheckLastError(errorCode, "failed to call OrtTrainingEvalStep in the WebAssembly layer");
          } else {
            throw new Error(NO_TRAIN_FUNCS_MSG);
          }
          return moveOutputToTensorMetadataArr(outputValuesOffset, outputCount, outputTensorHandles, outputTensors);
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
      getParametersSize = (trainingSessionId, trainableOnly) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        try {
          const sizeOffset = wasm2.stackAlloc(4);
          if (wasm2._OrtTrainingGetParametersSize) {
            const errorCode = wasm2._OrtTrainingGetParametersSize(trainingSessionId, sizeOffset, trainableOnly);
            ifErrCodeCheckLastError(errorCode, "Can't get parameters size");
            return wasm2.HEAP32[sizeOffset / 4];
          } else {
            throw new Error(NO_TRAIN_FUNCS_MSG);
          }
        } finally {
          wasm2.stackRestore(stack);
        }
      };
      getContiguousParameters = async (trainingSessionId, trainableOnly) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        const tensorTypeAsString = "float32";
        const locationAsString = "cpu";
        const parametersSize = getParametersSize(trainingSessionId, trainableOnly);
        let tensor = 0;
        const paramsByteLength = 4 * parametersSize;
        const paramsOffset = wasm2._malloc(paramsByteLength);
        const dims = [parametersSize];
        const dimsOffset = wasm2.stackAlloc(4);
        const dimsIndex = dimsOffset / 4;
        wasm2.HEAP32[dimsIndex] = parametersSize;
        try {
          tensor = wasm2._OrtCreateTensor(
            tensorDataTypeStringToEnum(tensorTypeAsString),
            paramsOffset,
            paramsByteLength,
            dimsOffset,
            dims.length,
            dataLocationStringToEnum(locationAsString)
          );
          ifErrCodeCheckLastError(
            tensor,
            `Can't create tensor for getContiguousParameters. session=${trainingSessionId}.`,
            false
          );
          if (wasm2._OrtTrainingCopyParametersToBuffer) {
            const errCode = wasm2._OrtTrainingCopyParametersToBuffer(trainingSessionId, tensor, parametersSize, trainableOnly);
            ifErrCodeCheckLastError(errCode, "Can't get contiguous parameters.");
          } else {
            throw new Error(NO_TRAIN_FUNCS_MSG);
          }
          const typedArrayConstructor = tensorTypeToTypedArrayConstructor(tensorTypeAsString);
          const data = new typedArrayConstructor(parametersSize);
          const output = [];
          new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(wasm2.HEAPU8.subarray(paramsOffset, paramsOffset + paramsByteLength));
          output.push([tensorTypeAsString, dims, data, locationAsString]);
          if (output.length !== 1) {
            throw new Error(`something unexpected happened in the getContiguousParameters function. Expected output length of
     one, got ${output.length}`);
          } else {
            return output[0];
          }
        } finally {
          if (tensor !== 0) {
            wasm2._OrtReleaseTensor(tensor);
          }
          wasm2._free(paramsOffset);
          wasm2._free(dimsOffset);
          wasm2.stackRestore(stack);
        }
      };
      loadParametersBuffer = async (trainingSessionId, buffer, trainableOnly) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        const tensorTypeAsString = "float32";
        const locationAsString = "cpu";
        const bufferByteLength = buffer.length;
        const bufferCount = bufferByteLength / 4;
        const bufferOffset = wasm2._malloc(bufferByteLength);
        wasm2.HEAPU8.set(buffer, bufferOffset);
        const dimsOffset = wasm2.stackAlloc(4);
        wasm2.HEAP32[dimsOffset / 4] = bufferCount;
        const dimsLength = 1;
        let tensor = 0;
        try {
          tensor = wasm2._OrtCreateTensor(
            tensorDataTypeStringToEnum(tensorTypeAsString),
            bufferOffset,
            bufferByteLength,
            dimsOffset,
            dimsLength,
            dataLocationStringToEnum(locationAsString)
          );
          ifErrCodeCheckLastError(tensor, `Can't create tensor for input/output. session=${trainingSessionId}`, false);
          if (wasm2._OrtTrainingCopyParametersFromBuffer) {
            const errCode = wasm2._OrtTrainingCopyParametersFromBuffer(trainingSessionId, tensor, bufferCount, trainableOnly);
            ifErrCodeCheckLastError(errCode, "Can't copy buffer to parameters.");
          } else {
            throw new Error(NO_TRAIN_FUNCS_MSG);
          }
        } finally {
          if (tensor !== 0) {
            wasm2._OrtReleaseTensor(tensor);
          }
          wasm2.stackRestore(stack);
          wasm2._free(bufferOffset);
          wasm2._free(dimsOffset);
        }
      };
      releaseTrainingSessionAndCheckpoint = (checkpointId, sessionId) => {
        const wasm2 = getInstance();
        if (wasm2._OrtTrainingReleaseSession) {
          wasm2._OrtTrainingReleaseSession(sessionId);
        }
        if (wasm2._OrtTrainingReleaseCheckpoint) {
          wasm2._OrtTrainingReleaseCheckpoint(checkpointId);
        }
      };
    }
  });

  // web/lib/wasm/session-handler-training.ts
  var OnnxruntimeWebAssemblyTrainingSessionHandler;
  var init_session_handler_training = __esm({
    "web/lib/wasm/session-handler-training.ts"() {
      "use strict";
      init_session_handler_inference();
      init_wasm_core_impl();
      init_wasm_training_core_impl();
      OnnxruntimeWebAssemblyTrainingSessionHandler = class {
        constructor() {
          this.evalInputNames = [];
          this.evalOutputNames = [];
        }
        async uriOrBufferToHeap(uriOrBuffer) {
          let buffer;
          if (typeof uriOrBuffer === "string") {
            const response = await fetch(uriOrBuffer);
            const arrayBuffer = await response.arrayBuffer();
            buffer = new Uint8Array(arrayBuffer);
          } else {
            buffer = uriOrBuffer;
          }
          return copyFromExternalBuffer(buffer);
        }
        async createTrainingSession(checkpointStateUriOrBuffer, trainModelUriOrBuffer, evalModelUriOrBuffer, optimizerModelUriOrBuffer, options) {
          const checkpointData = await this.uriOrBufferToHeap(checkpointStateUriOrBuffer);
          const trainModelData = await this.uriOrBufferToHeap(trainModelUriOrBuffer);
          let evalModelData = [0, 0];
          let optimizerModelData = [0, 0];
          if (evalModelUriOrBuffer !== "") {
            evalModelData = await this.uriOrBufferToHeap(evalModelUriOrBuffer);
          }
          if (optimizerModelUriOrBuffer !== "") {
            optimizerModelData = await this.uriOrBufferToHeap(optimizerModelUriOrBuffer);
          }
          this.checkpointId = createCheckpointHandle(checkpointData);
          this.sessionId = createTrainingSessionHandle(this.checkpointId, trainModelData, evalModelData, optimizerModelData, options);
          [this.inputNames, this.outputNames] = getModelInputOutputNames(this.sessionId, false);
          if (evalModelUriOrBuffer !== "") {
            [this.evalInputNames, this.evalOutputNames] = getModelInputOutputNames(this.sessionId, true);
          }
        }
        /**
         * Helper method that converts a feeds or fetches datatype to two arrays, one of values and one that stores the
         * corresponding name as a number referring to the index in the list of names provided.
         *
         * @param feeds meant to match either SessionHandler.FeedsType or SessionHandler.FetchesType
         * @param names either inputNames or outputNames
         * @returns a tuple of a list of values and a list of indices.
         */
        convertMapIntoValuesArrayAndIndicesArray(feeds, names, mapFunc) {
          const values = [];
          const indices = [];
          Object.entries(feeds).forEach((kvp) => {
            const name = kvp[0];
            const tensor = kvp[1];
            const index = names.indexOf(name);
            if (index === -1) {
              throw new Error(`invalid input '${name}`);
            }
            values.push(tensor);
            indices.push(index);
          });
          const uList = values.map(mapFunc);
          return [values, indices, uList];
        }
        /**
         * Helper method that converts the TensorMetadata that the wasm-core functions return to the
         * SessionHandler.ReturnType. Any outputs in the provided outputArray that are falsy will be populated with the
         * corresponding result.
         *
         * @param results used to populate the resultMap if there is no value for that outputName already
         * @param outputArray used to populate the resultMap. If null or undefined, use the corresponding result from results
         * @param outputIndices specifies which outputName the corresponding value for outputArray refers to.
         * @returns a map of output names and OnnxValues.
         */
        convertTensorMetadataToReturnType(results, outputArray, outputIndices) {
          const resultMap = {};
          for (let i = 0; i < results.length; i++) {
            resultMap[this.outputNames[outputIndices[i]]] = outputArray[i] ?? decodeTensorMetadata(results[i]);
          }
          return resultMap;
        }
        async lazyResetGrad() {
          await lazyResetGrad(this.sessionId);
        }
        async runTrainStep(feeds, fetches, options) {
          const [, inputIndices, inputs] = this.convertMapIntoValuesArrayAndIndicesArray(
            feeds,
            this.inputNames,
            (t, i) => encodeTensorMetadata(t, () => `input "${this.inputNames[inputIndices[i]]}"`)
          );
          const [outputArray, outputIndices, outputs] = this.convertMapIntoValuesArrayAndIndicesArray(
            fetches,
            this.outputNames,
            (t, i) => t ? encodeTensorMetadata(t, () => `output "${this.outputNames[outputIndices[i]]}"`) : null
          );
          const results = await runTrainStep(this.sessionId, inputIndices, inputs, outputIndices, outputs, options);
          return this.convertTensorMetadataToReturnType(results, outputArray, outputIndices);
        }
        async runOptimizerStep(options) {
          await runOptimizerStep(this.sessionId, options);
        }
        async runEvalStep(feeds, fetches, options) {
          const [, inputIndices, inputs] = this.convertMapIntoValuesArrayAndIndicesArray(
            feeds,
            this.evalInputNames,
            (t, i) => encodeTensorMetadata(t, () => `input "${this.evalInputNames[inputIndices[i]]}"`)
          );
          const [outputArray, outputIndices, outputs] = this.convertMapIntoValuesArrayAndIndicesArray(
            fetches,
            this.evalOutputNames,
            (t, i) => t ? encodeTensorMetadata(t, () => `output "${this.evalOutputNames[outputIndices[i]]}"`) : null
          );
          const results = await runEvalStep(this.sessionId, inputIndices, inputs, outputIndices, outputs, options);
          return this.convertTensorMetadataToReturnType(results, outputArray, outputIndices);
        }
        async getParametersSize(trainableOnly) {
          return getParametersSize(this.sessionId, trainableOnly);
        }
        async loadParametersBuffer(array, trainableOnly) {
          await loadParametersBuffer(this.sessionId, array, trainableOnly);
        }
        async getContiguousParameters(trainableOnly) {
          const tensorResult = await getContiguousParameters(this.sessionId, trainableOnly);
          return decodeTensorMetadata(tensorResult);
        }
        async dispose() {
          return releaseTrainingSessionAndCheckpoint(this.checkpointId, this.sessionId);
        }
      };
    }
  });

  // web/lib/backend-wasm-training.ts
  var backend_wasm_training_exports = {};
  __export(backend_wasm_training_exports, {
    wasmBackend: () => wasmBackend
  });
  var OnnxruntimeTrainingWebAssemblyBackend, wasmBackend;
  var init_backend_wasm_training = __esm({
    "web/lib/backend-wasm-training.ts"() {
      "use strict";
      init_backend_wasm();
      init_session_handler_training();
      OnnxruntimeTrainingWebAssemblyBackend = class extends OnnxruntimeWebAssemblyBackend {
        async createTrainingSessionHandler(checkpointStateUriOrBuffer, trainModelUriOrBuffer, evalModelUriOrBuffer, optimizerModelUriOrBuffer, options) {
          const handler = new OnnxruntimeWebAssemblyTrainingSessionHandler();
          await handler.createTrainingSession(
            checkpointStateUriOrBuffer,
            trainModelUriOrBuffer,
            evalModelUriOrBuffer,
            optimizerModelUriOrBuffer,
            options
          );
          return Promise.resolve(handler);
        }
      };
      wasmBackend = new OnnxruntimeTrainingWebAssemblyBackend();
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
  var version2 = "1.19.0-esmtest.20240618-d229c160";

  // web/lib/index.ts
  var lib_default = esm_exports;
  if (false) {
    const onnxjsBackend = null.onnxjsBackend;
    registerBackend("webgl", onnxjsBackend, -10);
  }
  if (true) {
    const wasmBackend2 = false ? null.wasmBackend : (init_backend_wasm_training(), __toCommonJS(backend_wasm_training_exports)).wasmBackend;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdHJhY2UudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24udHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItY29udmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvb25ueC1tb2RlbC50cyIsICIuLi8uLi9jb21tb24vbGliL29ubngtdmFsdWUudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90cmFpbmluZy1zZXNzaW9uLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90cmFpbmluZy1zZXNzaW9uLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5kZXgudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1lbnYudHMiLCAiLi4vbGliL3dhc20vcHJveHktd29ya2VyL21haW4udHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHMiLCAiLi4vbGliL3dhc20vd2FzbS1mYWN0b3J5LnRzIiwgIi4uL2xpYi93YXNtL3dhc20tdXRpbHMudHMiLCAiLi4vbGliL3dhc20vcnVuLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vc2Vzc2lvbi1vcHRpb25zLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tY29tbW9uLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tdXRpbHMtbG9hZC1maWxlLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tY29yZS1pbXBsLnRzIiwgIi4uL2xpYi93YXNtL3Byb3h5LXdyYXBwZXIudHMiLCAiLi4vbGliL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZS50cyIsICIuLi9saWIvYmFja2VuZC13YXNtLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tdHJhaW5pbmctY29yZS1pbXBsLnRzIiwgIi4uL2xpYi93YXNtL3Nlc3Npb24taGFuZGxlci10cmFpbmluZy50cyIsICIuLi9saWIvYmFja2VuZC13YXNtLXRyYWluaW5nLnRzIiwgIi4uL2xpYi9pbmRleC50cyIsICIuLi9saWIvdmVyc2lvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7QmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kLmpzJztcclxuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcclxuXHJcbmludGVyZmFjZSBCYWNrZW5kSW5mbyB7XHJcbiAgYmFja2VuZDogQmFja2VuZDtcclxuICBwcmlvcml0eTogbnVtYmVyO1xyXG5cclxuICBpbml0UHJvbWlzZT86IFByb21pc2U8dm9pZD47XHJcbiAgaW5pdGlhbGl6ZWQ/OiBib29sZWFuO1xyXG4gIGFib3J0ZWQ/OiBib29sZWFuO1xyXG4gIGVycm9yPzogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBiYWNrZW5kczogTWFwPHN0cmluZywgQmFja2VuZEluZm8+ID0gbmV3IE1hcCgpO1xyXG5jb25zdCBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHk6IHN0cmluZ1tdID0gW107XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBiYWNrZW5kLlxyXG4gKlxyXG4gKiBAcGFyYW0gbmFtZSAtIHRoZSBuYW1lIGFzIGEga2V5IHRvIGxvb2t1cCBhcyBhbiBleGVjdXRpb24gcHJvdmlkZXIuXHJcbiAqIEBwYXJhbSBiYWNrZW5kIC0gdGhlIGJhY2tlbmQgb2JqZWN0LlxyXG4gKiBAcGFyYW0gcHJpb3JpdHkgLSBhbiBpbnRlZ2VyIGluZGljYXRpbmcgdGhlIHByaW9yaXR5IG9mIHRoZSBiYWNrZW5kLiBIaWdoZXIgbnVtYmVyIG1lYW5zIGhpZ2hlciBwcmlvcml0eS4gaWYgcHJpb3JpdHlcclxuICogPCAwLCBpdCB3aWxsIGJlIGNvbnNpZGVyZWQgYXMgYSAnYmV0YScgdmVyc2lvbiBhbmQgd2lsbCBub3QgYmUgdXNlZCBhcyBhIGZhbGxiYWNrIGJhY2tlbmQgYnkgZGVmYXVsdC5cclxuICpcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyQmFja2VuZCA9IChuYW1lOiBzdHJpbmcsIGJhY2tlbmQ6IEJhY2tlbmQsIHByaW9yaXR5OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICBpZiAoYmFja2VuZCAmJiB0eXBlb2YgYmFja2VuZC5pbml0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBjb25zdCBjdXJyZW50QmFja2VuZCA9IGJhY2tlbmRzLmdldChuYW1lKTtcclxuICAgIGlmIChjdXJyZW50QmFja2VuZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGJhY2tlbmRzLnNldChuYW1lLCB7YmFja2VuZCwgcHJpb3JpdHl9KTtcclxuICAgIH0gZWxzZSBpZiAoY3VycmVudEJhY2tlbmQucHJpb3JpdHkgPiBwcmlvcml0eSkge1xyXG4gICAgICAvLyBzYW1lIG5hbWUgaXMgYWxyZWFkeSByZWdpc3RlcmVkIHdpdGggYSBoaWdoZXIgcHJpb3JpdHkuIHNraXAgcmVnaXN0ZXJhdGlvbi5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIGlmIChjdXJyZW50QmFja2VuZC5wcmlvcml0eSA9PT0gcHJpb3JpdHkpIHtcclxuICAgICAgaWYgKGN1cnJlbnRCYWNrZW5kLmJhY2tlbmQgIT09IGJhY2tlbmQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCByZWdpc3RlciBiYWNrZW5kIFwiJHtuYW1lfVwiIHVzaW5nIHByaW9yaXR5ICR7cHJpb3JpdHl9YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJpb3JpdHkgPj0gMCkge1xyXG4gICAgICBjb25zdCBpID0gYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LmluZGV4T2YobmFtZSk7XHJcbiAgICAgIGlmIChpICE9PSAtMSkge1xyXG4gICAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJhY2tlbmRzLmdldChiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHlbaV0pIS5wcmlvcml0eSA8PSBwcmlvcml0eSkge1xyXG4gICAgICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnNwbGljZShpLCAwLCBuYW1lKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnB1c2gobmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSB2YWxpZCBiYWNrZW5kJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogVHJ5IHRvIHJlc29sdmUgYW5kIGluaXRpYWxpemUgYSBiYWNrZW5kLlxyXG4gKlxyXG4gKiBAcGFyYW0gYmFja2VuZE5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgYmFja2VuZC5cclxuICogQHJldHVybnMgdGhlIGJhY2tlbmQgaW5zdGFuY2UgaWYgcmVzb2x2ZWQgYW5kIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseSwgb3IgYW4gZXJyb3IgbWVzc2FnZSBpZiBmYWlsZWQuXHJcbiAqL1xyXG5jb25zdCB0cnlSZXNvbHZlQW5kSW5pdGlhbGl6ZUJhY2tlbmQgPSBhc3luYyhiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTxCYWNrZW5kfHN0cmluZz4gPT4ge1xyXG4gIGNvbnN0IGJhY2tlbmRJbmZvID0gYmFja2VuZHMuZ2V0KGJhY2tlbmROYW1lKTtcclxuICBpZiAoIWJhY2tlbmRJbmZvKSB7XHJcbiAgICByZXR1cm4gJ2JhY2tlbmQgbm90IGZvdW5kLic7XHJcbiAgfVxyXG5cclxuICBpZiAoYmFja2VuZEluZm8uaW5pdGlhbGl6ZWQpIHtcclxuICAgIHJldHVybiBiYWNrZW5kSW5mby5iYWNrZW5kO1xyXG4gIH0gZWxzZSBpZiAoYmFja2VuZEluZm8uYWJvcnRlZCkge1xyXG4gICAgcmV0dXJuIGJhY2tlbmRJbmZvLmVycm9yITtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3QgaXNJbml0aWFsaXppbmcgPSAhIWJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKCFpc0luaXRpYWxpemluZykge1xyXG4gICAgICAgIGJhY2tlbmRJbmZvLmluaXRQcm9taXNlID0gYmFja2VuZEluZm8uYmFja2VuZC5pbml0KGJhY2tlbmROYW1lKTtcclxuICAgICAgfVxyXG4gICAgICBhd2FpdCBiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcclxuICAgICAgYmFja2VuZEluZm8uaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKCFpc0luaXRpYWxpemluZykge1xyXG4gICAgICAgIGJhY2tlbmRJbmZvLmVycm9yID0gYCR7ZX1gO1xyXG4gICAgICAgIGJhY2tlbmRJbmZvLmFib3J0ZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBiYWNrZW5kSW5mby5lcnJvciE7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBkZWxldGUgYmFja2VuZEluZm8uaW5pdFByb21pc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlc29sdmUgZXhlY3V0aW9uIHByb3ZpZGVycyBmcm9tIHRoZSBzcGVjaWZpYyBzZXNzaW9uIG9wdGlvbnMuXHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRpb25zIC0gdGhlIHNlc3Npb24gb3B0aW9ucyBvYmplY3QuXHJcbiAqIEByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgb2YgYW4gaW5pdGlhbGl6ZWQgYmFja2VuZCBpbnN0YW5jZSBhbmQgYSBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0IHdpdGhcclxuICogZmlsdGVyZWQgRVAgbGlzdC5cclxuICpcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzID0gYXN5bmMob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XHJcbiAgICBQcm9taXNlPFtiYWNrZW5kOiBCYWNrZW5kLCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zXT4gPT4ge1xyXG4gICAgICAvLyBleHRyYWN0IGJhY2tlbmQgaGludHMgZnJvbSBzZXNzaW9uIG9wdGlvbnNcclxuICAgICAgY29uc3QgZXBzID0gb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMgfHwgW107XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRIaW50cyA9IGVwcy5tYXAoaSA9PiB0eXBlb2YgaSA9PT0gJ3N0cmluZycgPyBpIDogaS5uYW1lKTtcclxuICAgICAgY29uc3QgYmFja2VuZE5hbWVzID0gYmFja2VuZEhpbnRzLmxlbmd0aCA9PT0gMCA/IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eSA6IGJhY2tlbmRIaW50cztcclxuXHJcbiAgICAgIC8vIHRyeSB0byByZXNvbHZlIGFuZCBpbml0aWFsaXplIGFsbCByZXF1ZXN0ZWQgYmFja2VuZHNcclxuICAgICAgbGV0IGJhY2tlbmQ6IEJhY2tlbmR8dW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBlcnJvcnMgPSBbXTtcclxuICAgICAgY29uc3QgYXZhaWxhYmxlQmFja2VuZE5hbWVzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgIGZvciAoY29uc3QgYmFja2VuZE5hbWUgb2YgYmFja2VuZE5hbWVzKSB7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZVJlc3VsdCA9IGF3YWl0IHRyeVJlc29sdmVBbmRJbml0aWFsaXplQmFja2VuZChiYWNrZW5kTmFtZSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXNvbHZlUmVzdWx0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgZXJyb3JzLnB1c2goe25hbWU6IGJhY2tlbmROYW1lLCBlcnI6IHJlc29sdmVSZXN1bHR9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKCFiYWNrZW5kKSB7XHJcbiAgICAgICAgICAgIGJhY2tlbmQgPSByZXNvbHZlUmVzdWx0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGJhY2tlbmQgPT09IHJlc29sdmVSZXN1bHQpIHtcclxuICAgICAgICAgICAgYXZhaWxhYmxlQmFja2VuZE5hbWVzLmFkZChiYWNrZW5kTmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiBubyBiYWNrZW5kIGlzIGF2YWlsYWJsZSwgdGhyb3cgZXJyb3IuXHJcbiAgICAgIGlmICghYmFja2VuZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbm8gYXZhaWxhYmxlIGJhY2tlbmQgZm91bmQuIEVSUjogJHtlcnJvcnMubWFwKGUgPT4gYFske2UubmFtZX1dICR7ZS5lcnJ9YCkuam9pbignLCAnKX1gKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZm9yIGVhY2ggZXhwbGljaXRseSByZXF1ZXN0ZWQgYmFja2VuZCwgaWYgaXQncyBub3QgYXZhaWxhYmxlLCBvdXRwdXQgd2FybmluZyBtZXNzYWdlLlxyXG4gICAgICBmb3IgKGNvbnN0IHtuYW1lLCBlcnJ9IG9mIGVycm9ycykge1xyXG4gICAgICAgIGlmIChiYWNrZW5kSGludHMuaW5jbHVkZXMobmFtZSkpIHtcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oYHJlbW92aW5nIHJlcXVlc3RlZCBleGVjdXRpb24gcHJvdmlkZXIgXCIke1xyXG4gICAgICAgICAgICAgIG5hbWV9XCIgZnJvbSBzZXNzaW9uIG9wdGlvbnMgYmVjYXVzZSBpdCBpcyBub3QgYXZhaWxhYmxlOiAke2Vycn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkRXBzID0gZXBzLmZpbHRlcihpID0+IGF2YWlsYWJsZUJhY2tlbmROYW1lcy5oYXModHlwZW9mIGkgPT09ICdzdHJpbmcnID8gaSA6IGkubmFtZSkpO1xyXG5cclxuICAgICAgcmV0dXJuIFtcclxuICAgICAgICBiYWNrZW5kLCBuZXcgUHJveHkob3B0aW9ucywge1xyXG4gICAgICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnZXhlY3V0aW9uUHJvdmlkZXJzJykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZEVwcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICBdO1xyXG4gICAgfTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb259IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xyXG5pbXBvcnQge09ubnhWYWx1ZX0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcclxuaW1wb3J0IHtUcmFpbmluZ1Nlc3Npb259IGZyb20gJy4vdHJhaW5pbmctc2Vzc2lvbi5qcyc7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFNlc3Npb25IYW5kbGVyIHtcclxuICB0eXBlIEZlZWRzVHlwZSA9IHtbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlfTtcclxuICB0eXBlIEZldGNoZXNUeXBlID0ge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsfTtcclxuICB0eXBlIFJldHVyblR5cGUgPSB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHNoYXJlZCBTZXNzaW9uSGFuZGxlciBmdW5jdGlvbmFsaXR5XHJcbiAqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmludGVyZmFjZSBTZXNzaW9uSGFuZGxlciB7XHJcbiAgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcclxuICByZWFkb25seSBvdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnQgYSBoYW5kbGVyIGluc3RhbmNlIG9mIGFuIGluZmVyZW5jZSBzZXNzaW9uLlxyXG4gKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xyXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQ7XHJcbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQ7XHJcblxyXG4gIHJ1bihmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcclxuICAgICAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudCBhIGhhbmRsZXIgaW5zdGFuY2Ugb2YgYSB0cmFpbmluZyBpbmZlcmVuY2Ugc2Vzc2lvbi5cclxuICpcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xyXG4gIHJlYWRvbmx5IGV2YWxJbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcclxuICByZWFkb25seSBldmFsT3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xyXG5cclxuICBsYXp5UmVzZXRHcmFkKCk6IFByb21pc2U8dm9pZD47XHJcbiAgcnVuVHJhaW5TdGVwKFxyXG4gICAgICBmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLCBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcclxuICAgICAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlPjtcclxuICBydW5PcHRpbWl6ZXJTdGVwKG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XHJcbiAgcnVuRXZhbFN0ZXAoXHJcbiAgICAgIGZlZWRzOiBTZXNzaW9uSGFuZGxlci5GZWVkc1R5cGUsIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLFxyXG4gICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGU+O1xyXG5cclxuICBnZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxudW1iZXI+O1xyXG4gIGxvYWRQYXJhbWV0ZXJzQnVmZmVyKGJ1ZmZlcjogVWludDhBcnJheSwgdHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8dm9pZD47XHJcbiAgZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8T25ueFZhbHVlPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudCBhIGJhY2tlbmQgdGhhdCBwcm92aWRlcyBpbXBsZW1lbnRhdGlvbiBvZiBtb2RlbCBpbmZlcmVuY2luZy5cclxuICpcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBCYWNrZW5kIHtcclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBiYWNrZW5kIGFzeW5jaHJvbm91c2x5LiBTaG91bGQgdGhyb3cgd2hlbiBmYWlsZWQuXHJcbiAgICovXHJcbiAgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIodXJpT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XHJcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xyXG5cclxuICBjcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGVyP1xyXG4gICAgICAoY2hlY2twb2ludFN0YXRlVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlciwgdHJhaW5Nb2RlbFVyaU9yQnVmZmVyOiBUcmFpbmluZ1Nlc3Npb24uVXJpT3JCdWZmZXIsXHJcbiAgICAgICBldmFsTW9kZWxVcmlPckJ1ZmZlcjogVHJhaW5pbmdTZXNzaW9uLlVyaU9yQnVmZmVyLCBvcHRpbWl6ZXJNb2RlbFVyaU9yQnVmZmVyOiBUcmFpbmluZ1Nlc3Npb24uVXJpT3JCdWZmZXIsXHJcbiAgICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxUcmFpbmluZ1Nlc3Npb25IYW5kbGVyPjtcclxufVxyXG5cclxuZXhwb3J0IHtyZWdpc3RlckJhY2tlbmR9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IC9qcy9zY3JpcHRzL3VwZGF0ZS12ZXJzaW9uLnRzXG4vLyBEbyBub3QgbW9kaWZ5IGZpbGUgY29udGVudCBtYW51YWxseS5cblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMS4xOS4wLWVzbXRlc3QuMjAyNDA2MTgtZDIyOWMxNjAnO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge0Vudn0gZnJvbSAnLi9lbnYuanMnO1xyXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJy4vdmVyc2lvbi5qcyc7XHJcblxyXG50eXBlIExvZ0xldmVsVHlwZSA9IEVudlsnbG9nTGV2ZWwnXTtcclxuXHJcbmxldCBsb2dMZXZlbFZhbHVlOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+ID0gJ3dhcm5pbmcnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGVudjogRW52ID0ge1xyXG4gIHdhc206IHt9IGFzIEVudi5XZWJBc3NlbWJseUZsYWdzLFxyXG4gIHdlYmdsOiB7fSBhcyBFbnYuV2ViR0xGbGFncyxcclxuICB3ZWJncHU6IHt9IGFzIEVudi5XZWJHcHVGbGFncyxcclxuICB2ZXJzaW9uczoge2NvbW1vbjogdmVyc2lvbn0sXHJcblxyXG4gIHNldCBsb2dMZXZlbCh2YWx1ZTogTG9nTGV2ZWxUeXBlKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCBbJ3ZlcmJvc2UnLCAnaW5mbycsICd3YXJuaW5nJywgJ2Vycm9yJywgJ2ZhdGFsJ10uaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHt2YWx1ZX1gKTtcclxuICAgIH1cclxuICAgIGxvZ0xldmVsVmFsdWUgPSB2YWx1ZTtcclxuICB9LFxyXG4gIGdldCBsb2dMZXZlbCgpOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+IHtcclxuICAgIHJldHVybiBsb2dMZXZlbFZhbHVlO1xyXG4gIH0sXHJcbn07XHJcblxyXG4vLyBzZXQgcHJvcGVydHkgJ2xvZ0xldmVsJyBzbyB0aGF0IHRoZXkgY2FuIGJlIGNvcnJlY3RseSB0cmFuc2ZlcnJlZCB0byB3b3JrZXIgYnkgYHBvc3RNZXNzYWdlKClgLlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZW52LCAnbG9nTGV2ZWwnLCB7ZW51bWVyYWJsZTogdHJ1ZX0pO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7ZW52IGFzIGVudkltcGx9IGZyb20gJy4vZW52LWltcGwuanMnO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIEVudiB7XHJcbiAgZXhwb3J0IHR5cGUgV2FzbVBhdGhQcmVmaXggPSBzdHJpbmc7XHJcbiAgZXhwb3J0IGludGVyZmFjZSBXYXNtRmlsZVBhdGhzIHtcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSB0aGUgb3ZlcnJpZGUgcGF0aCBmb3IgdGhlIG1haW4gLndhc20gZmlsZS5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHBhdGggc2hvdWxkIGJlIGFuIGFic29sdXRlIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogSWYgbm90IG1vZGlmaWVkLCB0aGUgZmlsZW5hbWUgb2YgdGhlIC53YXNtIGZpbGUgaXM6XHJcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLndhc21gIGZvciBkZWZhdWx0IGJ1aWxkXHJcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbWAgZm9yIEpTRVAgYnVpbGQgKHdpdGggV2ViR1BVIGFuZCBXZWJOTilcclxuICAgICAqIC0gYG9ydC10cmFpbmluZy13YXNtLXNpbWQtdGhyZWFkZWQud2FzbWAgZm9yIHRyYWluaW5nIGJ1aWxkXHJcbiAgICAgKi9cclxuICAgIHdhc20/OiBVUkx8c3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IHRoZSBvdmVycmlkZSBwYXRoIGZvciB0aGUgbWFpbiAubWpzIGZpbGUuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBwYXRoIHNob3VsZCBiZSBhbiBhYnNvbHV0ZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAubWpzIGZpbGUgaXM6XHJcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLm1qc2AgZm9yIGRlZmF1bHQgYnVpbGRcclxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC5tanNgIGZvciBKU0VQIGJ1aWxkICh3aXRoIFdlYkdQVSBhbmQgV2ViTk4pXHJcbiAgICAgKiAtIGBvcnQtdHJhaW5pbmctd2FzbS1zaW1kLXRocmVhZGVkLm1qc2AgZm9yIHRyYWluaW5nIGJ1aWxkXHJcbiAgICAgKi9cclxuICAgIG1qcz86IFVSTHxzdHJpbmc7XHJcbiAgfVxyXG4gIGV4cG9ydCB0eXBlIFdhc21QcmVmaXhPckZpbGVQYXRocyA9IFdhc21QYXRoUHJlZml4fFdhc21GaWxlUGF0aHM7XHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJBc3NlbWJseUZsYWdzIHtcclxuICAgIC8qKlxyXG4gICAgICogc2V0IG9yIGdldCBudW1iZXIgb2YgdGhyZWFkKHMpLiBJZiBvbWl0dGVkIG9yIHNldCB0byAwLCBudW1iZXIgb2YgdGhyZWFkKHMpIHdpbGwgYmUgZGV0ZXJtaW5lZCBieSBzeXN0ZW0uIElmIHNldFxyXG4gICAgICogdG8gMSwgbm8gd29ya2VyIHRocmVhZCB3aWxsIGJlIHNwYXduZWQuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IHdoZW4gV2ViQXNzZW1ibHkgbXVsdGl0aHJlYWQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYDBgXHJcbiAgICAgKi9cclxuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gZW5hYmxlIFNJTUQuIElmIHNldCB0byBmYWxzZSwgU0lNRCB3aWxsIGJlIGZvcmNlbHkgZGlzYWJsZWQuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IHdoZW4gV2ViQXNzZW1ibHkgU0lNRCBmZWF0dXJlIGlzIGF2YWlsYWJsZSBpbiBjdXJyZW50IGNvbnRleHQuXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVGhpcyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLiBTaW5jZSBTSU1EIGlzIHN1cHBvcnRlZCBieSBhbGwgbWFqb3IgSmF2YVNjcmlwdCBlbmdpbmVzLCBub24tU0lNRFxyXG4gICAgICogYnVpbGQgaXMgbm8gbG9uZ2VyIHByb3ZpZGVkLiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcmVtb3ZlZCBpbiBmdXR1cmUgcmVsZWFzZS5cclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYHRydWVgXHJcbiAgICAgKi9cclxuICAgIHNpbWQ/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IG9yIGdldCBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIGVuYWJsZSB0cmFjZS5cclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYGVudi50cmFjZWAgaW5zdGVhZC4gSWYgYGVudi50cmFjZWAgaXMgc2V0LCB0aGlzIHByb3BlcnR5IHdpbGwgYmUgaWdub3JlZC5cclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxyXG4gICAgICovXHJcbiAgICB0cmFjZT86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IGEgbnVtYmVyIHNwZWNpZnlpbmcgdGhlIHRpbWVvdXQgZm9yIGluaXRpYWxpemF0aW9uIG9mIFdlYkFzc2VtYmx5IGJhY2tlbmQsIGluIG1pbGxpc2Vjb25kcy4gQSB6ZXJvXHJcbiAgICAgKiB2YWx1ZSBpbmRpY2F0ZXMgbm8gdGltZW91dCBpcyBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgMGBcclxuICAgICAqL1xyXG4gICAgaW5pdFRpbWVvdXQ/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYSBjdXN0b20gVVJMIHByZWZpeCB0byB0aGUgLndhc20vLm1qcyBmaWxlcywgb3IgYW4gb2JqZWN0IG9mIG92ZXJyaWRlcyBmb3IgYm90aCAud2FzbS8ubWpzIGZpbGUuIFRoZSBvdmVycmlkZVxyXG4gICAgICogcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cclxuICAgICAqL1xyXG4gICAgd2FzbVBhdGhzPzogV2FzbVByZWZpeE9yRmlsZVBhdGhzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIHByb3h5IHRoZSBleGVjdXRpb24gb2YgbWFpbiB0aHJlYWQgdG8gYSB3b3JrZXIgdGhyZWFkLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxyXG4gICAgICovXHJcbiAgICBwcm94eT86IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdMRmxhZ3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBXZWJHTCBDb250ZXh0IElEICh3ZWJnbCBvciB3ZWJnbDIpLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCd3ZWJnbDInYFxyXG4gICAgICovXHJcbiAgICBjb250ZXh0SWQ/OiAnd2ViZ2wnfCd3ZWJnbDInO1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIFdlYkdMIHJlbmRlcmluZyBjb250ZXh0LlxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBjb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XHJcbiAgICAvKipcclxuICAgICAqIFNldCBvciBnZXQgdGhlIG1heGltdW0gYmF0Y2ggc2l6ZSBmb3IgbWF0bXVsLiAwIG1lYW5zIHRvIGRpc2FibGUgYmF0Y2hpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWRcclxuICAgICAqL1xyXG4gICAgbWF0bXVsTWF4QmF0Y2hTaXplPzogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSB0ZXh0dXJlIGNhY2hlIG1vZGUuXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgJ2Z1bGwnYFxyXG4gICAgICovXHJcbiAgICB0ZXh0dXJlQ2FjaGVNb2RlPzogJ2luaXRpYWxpemVyT25seSd8J2Z1bGwnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwYWNrZWQgdGV4dHVyZSBtb2RlXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXHJcbiAgICAgKi9cclxuICAgIHBhY2s/OiBib29sZWFuO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHdoZXRoZXIgZW5hYmxlIGFzeW5jIGRvd25sb2FkLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxyXG4gICAgICovXHJcbiAgICBhc3luYz86IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdVByb2ZpbGluZ0RhdGFWMVRlbnNvck1ldGFkYXRhIHtcclxuICAgIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xyXG4gICAgZGF0YVR5cGU6IHN0cmluZztcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVQcm9maWxpbmdEYXRhVjEge1xyXG4gICAgdmVyc2lvbjogMTtcclxuICAgIGlucHV0c01ldGFkYXRhOiByZWFkb25seSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YVtdO1xyXG4gICAgb3V0cHV0c01ldGFkYXRhOiByZWFkb25seSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YVtdO1xyXG4gICAga2VybmVsSWQ6IG51bWJlcjtcclxuICAgIGtlcm5lbFR5cGU6IHN0cmluZztcclxuICAgIGtlcm5lbE5hbWU6IHN0cmluZztcclxuICAgIHByb2dyYW1OYW1lOiBzdHJpbmc7XHJcbiAgICBzdGFydFRpbWU6IG51bWJlcjtcclxuICAgIGVuZFRpbWU6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIGV4cG9ydCB0eXBlIFdlYkdwdVByb2ZpbGluZ0RhdGEgPSBXZWJHcHVQcm9maWxpbmdEYXRhVjE7XHJcblxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1RmxhZ3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgbW9kZS5cclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYGVudi53ZWJncHUucHJvZmlsaW5nLm1vZGVgIGluc3RlYWQuIElmIGBlbnYud2ViZ3B1LnByb2ZpbGluZy5tb2RlYCBpcyBzZXQsIHRoaXMgcHJvcGVydHkgd2lsbCBiZVxyXG4gICAgICogaWdub3JlZC5cclxuICAgICAqL1xyXG4gICAgcHJvZmlsaW5nTW9kZT86ICdvZmYnfCdkZWZhdWx0JztcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKi9cclxuICAgIHByb2ZpbGluZz86IHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIFNldCBvciBnZXQgdGhlIHByb2ZpbGluZyBtb2RlLlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAZGVmYXVsdFZhbHVlIGAnb2ZmJ2BcclxuICAgICAgICovXHJcbiAgICAgIG1vZGU/OiAnb2ZmJ3wnZGVmYXVsdCc7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogU2V0IG9yIGdldCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gYSBwcm9maWxpbmcgZGF0YSBpcyByZWNlaXZlZC4gSWYgbm90IHNldCwgdGhlIHByb2ZpbGluZyBkYXRhIHdpbGwgYmVcclxuICAgICAgICogcHJpbnRlZCB0byBjb25zb2xlLlxyXG4gICAgICAgKi9cclxuICAgICAgb25kYXRhPzogKGRhdGE6IFdlYkdwdVByb2ZpbGluZ0RhdGEpID0+IHZvaWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwb3dlciBwcmVmZXJlbmNlLlxyXG4gICAgICpcclxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBvbmx5IGhhcyBlZmZlY3QgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmVcclxuICAgICAqIHVzZWQgYXMgb3B0aW9ucyBmb3IgYG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoKWAuXHJcbiAgICAgKlxyXG4gICAgICogU2VlIHtAbGluayBodHRwczovL2dwdXdlYi5naXRodWIuaW8vZ3B1d2ViLyNkaWN0ZGVmLWdwdXJlcXVlc3RhZGFwdGVyb3B0aW9uc30gZm9yIG1vcmUgZGV0YWlscy5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB1bmRlZmluZWRgXHJcbiAgICAgKi9cclxuICAgIHBvd2VyUHJlZmVyZW5jZT86ICdsb3ctcG93ZXInfCdoaWdoLXBlcmZvcm1hbmNlJztcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgZm9yY2UgZmFsbGJhY2sgYWRhcHRlciBmbGFnLlxyXG4gICAgICpcclxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBvbmx5IGhhcyBlZmZlY3QgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmVcclxuICAgICAqIHVzZWQgYXMgb3B0aW9ucyBmb3IgYG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoKWAuXHJcbiAgICAgKlxyXG4gICAgICogU2VlIHtAbGluayBodHRwczovL2dwdXdlYi5naXRodWIuaW8vZ3B1d2ViLyNkaWN0ZGVmLWdwdXJlcXVlc3RhZGFwdGVyb3B0aW9uc30gZm9yIG1vcmUgZGV0YWlscy5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB1bmRlZmluZWRgXHJcbiAgICAgKi9cclxuICAgIGZvcmNlRmFsbGJhY2tBZGFwdGVyPzogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgYWRhcHRlciBmb3IgV2ViR1BVLlxyXG4gICAgICpcclxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBvbmx5IGhhcyBlZmZlY3QgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmVcclxuICAgICAqIHVzZWQgYXMgdGhlIEdQVSBhZGFwdGVyIGZvciB0aGUgdW5kZXJseWluZyBXZWJHUFUgYmFja2VuZCB0byBjcmVhdGUgR1BVIGRldmljZS5cclxuICAgICAqXHJcbiAgICAgKiBJZiB0aGlzIHByb3BlcnR5IGlzIG5vdCBzZXQsIGl0IHdpbGwgYmUgYXZhaWxhYmxlIHRvIGdldCBhZnRlciB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZVxyXG4gICAgICogdmFsdWUgd2lsbCBiZSB0aGUgR1BVIGFkYXB0ZXIgdGhhdCBjcmVhdGVkIGJ5IHRoZSB1bmRlcmx5aW5nIFdlYkdQVSBiYWNrZW5kLlxyXG4gICAgICpcclxuICAgICAqIFdoZW4gdXNlIHdpdGggVHlwZVNjcmlwdCwgdGhlIHR5cGUgb2YgdGhpcyBwcm9wZXJ0eSBpcyBgR1BVQWRhcHRlcmAgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cclxuICAgICAqIFVzZSBgY29uc3QgYWRhcHRlciA9IGVudi53ZWJncHUuYWRhcHRlciBhcyBHUFVBZGFwdGVyO2AgaW4gVHlwZVNjcmlwdCB0byBhY2Nlc3MgdGhpcyBwcm9wZXJ0eSB3aXRoIGNvcnJlY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBzZWUgY29tbWVudHMgb24ge0BsaW5rIFRlbnNvci5HcHVCdWZmZXJUeXBlfVxyXG4gICAgICovXHJcbiAgICBhZGFwdGVyOiB1bmtub3duO1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGRldmljZSBmb3IgV2ViR1BVLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgcHJvcGVydHkgaXMgb25seSBhdmFpbGFibGUgYWZ0ZXIgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLlxyXG4gICAgICpcclxuICAgICAqIFdoZW4gdXNlIHdpdGggVHlwZVNjcmlwdCwgdGhlIHR5cGUgb2YgdGhpcyBwcm9wZXJ0eSBpcyBgR1BVRGV2aWNlYCBkZWZpbmVkIGluIFwiQHdlYmdwdS90eXBlc1wiLlxyXG4gICAgICogVXNlIGBjb25zdCBkZXZpY2UgPSBlbnYud2ViZ3B1LmRldmljZSBhcyBHUFVEZXZpY2U7YCBpbiBUeXBlU2NyaXB0IHRvIGFjY2VzcyB0aGlzIHByb3BlcnR5IHdpdGggY29ycmVjdCB0eXBlLlxyXG4gICAgICpcclxuICAgICAqIHNlZSBjb21tZW50cyBvbiB7QGxpbmsgVGVuc29yLkdwdUJ1ZmZlclR5cGV9IGZvciBtb3JlIGRldGFpbHMgYWJvdXQgd2h5IG5vdCB1c2UgdHlwZXMgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgZGV2aWNlOiB1bmtub3duO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHdoZXRoZXIgdmFsaWRhdGUgaW5wdXQgY29udGVudC5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcclxuICAgICAqL1xyXG4gICAgdmFsaWRhdGVJbnB1dENvbnRlbnQ/OiBib29sZWFuO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFbnYge1xyXG4gIC8qKlxyXG4gICAqIHNldCB0aGUgc2V2ZXJpdHkgbGV2ZWwgZm9yIGxvZ2dpbmcuXHJcbiAgICpcclxuICAgKiBAZGVmYXVsdFZhbHVlIGAnd2FybmluZydgXHJcbiAgICovXHJcbiAgbG9nTGV2ZWw/OiAndmVyYm9zZSd8J2luZm8nfCd3YXJuaW5nJ3wnZXJyb3InfCdmYXRhbCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlIHdoZXRoZXIgcnVuIGluIGRlYnVnIG1vZGUuXHJcbiAgICpcclxuICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcclxuICAgKi9cclxuICBkZWJ1Zz86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXHJcbiAgICpcclxuICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcclxuICAgKi9cclxuICB0cmFjZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB2ZXJzaW9uIG9mIHRoZSBjdXJyZW50IHBhY2thZ2UuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgdmVyc2lvbnM6IHtcclxuICAgIHJlYWRvbmx5IGNvbW1vbjogc3RyaW5nO1xyXG4gICAgcmVhZG9ubHkgd2ViPzogc3RyaW5nO1xyXG4gICAgcmVhZG9ubHkgbm9kZT86IHN0cmluZztcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuICAgIHJlYWRvbmx5ICdyZWFjdC1uYXRpdmUnPzogc3RyaW5nO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViQXNzZW1ibHlcclxuICAgKi9cclxuICByZWFkb25seSB3YXNtOiBFbnYuV2ViQXNzZW1ibHlGbGFncztcclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJHTFxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHdlYmdsOiBFbnYuV2ViR0xGbGFncztcclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJHUFVcclxuICAgKi9cclxuICByZWFkb25seSB3ZWJncHU6IEVudi5XZWJHcHVGbGFncztcclxuXHJcbiAgW25hbWU6IHN0cmluZ106IHVua25vd247XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgYXMgYSBnbG9iYWwgc2luZ2xldG9uLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGVudjogRW52ID0gZW52SW1wbDtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge1RlbnNvclRvRGF0YVVybE9wdGlvbnMsIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9uc30gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi5qcyc7XHJcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvRGF0YVVSTCgpXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yVG9EYXRhVVJMID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9EYXRhVXJsT3B0aW9ucyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgY2FudmFzID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpIDogKG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSkpO1xyXG4gIGNhbnZhcy53aWR0aCA9IHRlbnNvci5kaW1zWzNdO1xyXG4gIGNhbnZhcy5oZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcclxuICBjb25zdCBwaXhlbHMyRENvbnRleHQgPVxyXG4gICAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyAoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgT2Zmc2NyZWVuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgbnVsbCk7XHJcblxyXG4gIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xyXG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcclxuICAgIGxldCB3aWR0aDogbnVtYmVyO1xyXG4gICAgbGV0IGhlaWdodDogbnVtYmVyO1xyXG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcclxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1syXTtcclxuICAgICAgaGVpZ2h0ID0gdGVuc29yLmRpbXNbM107XHJcbiAgICB9IGVsc2UgeyAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxyXG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzNdO1xyXG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbnB1dGZvcm1hdCA9IG9wdGlvbnM/LmZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5mb3JtYXQgOiAnUkdCJztcclxuXHJcbiAgICBjb25zdCBub3JtID0gb3B0aW9ucz8ubm9ybTtcclxuICAgIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLm1lYW4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBub3JtTWVhbiA9IFsyNTUsIDI1NSwgMjU1LCAyNTVdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiAobm9ybS5tZWFuKSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhblswXSwgbm9ybS5tZWFuWzFdLCBub3JtLm1lYW5bMl0sIDBdO1xyXG4gICAgICAgIGlmIChub3JtLm1lYW5bM10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgbm9ybU1lYW5bM10gPSBub3JtLm1lYW5bM107XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0uYmlhcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG5vcm1CaWFzID0gWzAsIDAsIDAsIDBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiAobm9ybS5iaWFzKSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xyXG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgbm9ybUJpYXNbM10gPSBub3JtLmJpYXNbM107XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XHJcbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcclxuICAgIGxldCByVGVuc29yUG9pbnRlciA9IDAsIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlLCBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDIsIGFUZW5zb3JQb2ludGVyID0gLTE7XHJcblxyXG4gICAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxyXG4gICAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcclxuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xyXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcclxuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xyXG4gICAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XHJcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xyXG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xyXG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XHJcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkJHJykge1xyXG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XHJcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xyXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdpZHRoOyBqKyspIHtcclxuICAgICAgICBjb25zdCBSID0gKCh0ZW5zb3IuZGF0YVtyVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMF0pICogbm9ybU1lYW5bMF07ICAvLyBSIHZhbHVlXHJcbiAgICAgICAgY29uc3QgRyA9ICgodGVuc29yLmRhdGFbZ1RlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzFdKSAqIG5vcm1NZWFuWzFdOyAgLy8gRyB2YWx1ZVxyXG4gICAgICAgIGNvbnN0IEIgPSAoKHRlbnNvci5kYXRhW2JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1syXSkgKiBub3JtTWVhblsyXTsgIC8vIEIgdmFsdWVcclxuICAgICAgICBjb25zdCBBID0gYVRlbnNvclBvaW50ZXIgPT09IC0xID9cclxuICAgICAgICAgICAgMjU1IDpcclxuICAgICAgICAgICAgKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107ICAvLyBBIHZhbHVlXHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9yZXN0cmljdC1wbHVzLW9wZXJhbmRzXHJcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKCcgKyBSICsgJywnICsgRyArICcsJyArIEIgKyAnLCcgKyBBICsgJyknO1xyXG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5maWxsUmVjdChqLCBpLCAxLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCd0b0RhdGFVUkwnIGluIGNhbnZhcykge1xyXG4gICAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0b0RhdGFVUkwgaXMgbm90IHN1cHBvcnRlZCcpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvSW1hZ2VEYXRhKClcclxuICovXHJcbmV4cG9ydCBjb25zdCB0ZW5zb3JUb0ltYWdlRGF0YSA9ICh0ZW5zb3I6IFRlbnNvciwgb3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YSA9PiB7XHJcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/XHJcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJykgOlxyXG4gICAgICBuZXcgT2Zmc2NyZWVuQ2FudmFzKDEsIDEpLmdldENvbnRleHQoJzJkJykgYXMgT2Zmc2NyZWVuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gIGxldCBpbWFnZTogSW1hZ2VEYXRhO1xyXG4gIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xyXG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcclxuICAgIGxldCB3aWR0aDogbnVtYmVyO1xyXG4gICAgbGV0IGhlaWdodDogbnVtYmVyO1xyXG4gICAgbGV0IGNoYW5uZWxzOiBudW1iZXI7XHJcbiAgICBpZiAob3B0aW9ucz8udGVuc29yTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xyXG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzJdO1xyXG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1sxXTtcclxuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1szXTtcclxuICAgIH0gZWxzZSB7ICAvLyBEZWZhdWx0IGxheW91dCBpcyBOQ1dIXHJcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbM107XHJcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xyXG4gICAgICBjaGFubmVscyA9IHRlbnNvci5kaW1zWzFdO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zICE9PSB1bmRlZmluZWQgPyAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQicpIDogJ1JHQic7XHJcblxyXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XHJcbiAgICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgbGV0IG5vcm1CaWFzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgbm9ybU1lYW4gPSBbMjU1LCAyNTUsIDI1NSwgMjU1XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2YgKG5vcm0ubWVhbikgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW5bMF0sIG5vcm0ubWVhblsxXSwgbm9ybS5tZWFuWzJdLCAyNTVdO1xyXG4gICAgICAgIGlmIChub3JtLm1lYW5bM10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgbm9ybU1lYW5bM10gPSBub3JtLm1lYW5bM107XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0uYmlhcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG5vcm1CaWFzID0gWzAsIDAsIDAsIDBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiAobm9ybS5iaWFzKSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xyXG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgbm9ybUJpYXNbM10gPSBub3JtLmJpYXNbM107XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XHJcbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLmZvcm1hdCAhPT0gdW5kZWZpbmVkICYmIChjaGFubmVscyA9PT0gNCAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQkEnKSB8fFxyXG4gICAgICAgICAgKGNoYW5uZWxzID09PSAzICYmIChvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQicgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdCR1InKSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBmb3JtYXQgZG9lc25cXCd0IG1hdGNoIGlucHV0IHRlbnNvciBkaW1zJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcclxuICAgIGNvbnN0IHN0ZXAgPSA0O1xyXG4gICAgbGV0IHJJbWFnZVBvaW50ZXIgPSAwLCBnSW1hZ2VQb2ludGVyID0gMSwgYkltYWdlUG9pbnRlciA9IDIsIGFJbWFnZVBvaW50ZXIgPSAzO1xyXG4gICAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCwgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMiwgYVRlbnNvclBvaW50ZXIgPSAtMTtcclxuXHJcbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XHJcbiAgICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0JBJykge1xyXG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xyXG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XHJcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcclxuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XHJcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcclxuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XHJcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcclxuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSQkcnKSB7XHJcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcclxuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcclxuICAgIH1cclxuXHJcbiAgICBpbWFnZSA9IHBpeGVsczJEQ29udGV4dC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQgKiB3aWR0aDtcclxuICAgICAgICAgckltYWdlUG9pbnRlciArPSBzdGVwLCBnSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYUltYWdlUG9pbnRlciArPSBzdGVwLCBpKyspIHtcclxuICAgICAgaW1hZ2UuZGF0YVtySW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbclRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzBdKSAqIG5vcm1NZWFuWzBdOyAgLy8gUiB2YWx1ZVxyXG4gICAgICBpbWFnZS5kYXRhW2dJbWFnZVBvaW50ZXJdID0gKCh0ZW5zb3IuZGF0YVtnVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMV0pICogbm9ybU1lYW5bMV07ICAvLyBHIHZhbHVlXHJcbiAgICAgIGltYWdlLmRhdGFbYkltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1syXSkgKiBub3JtTWVhblsyXTsgIC8vIEIgdmFsdWVcclxuICAgICAgaW1hZ2UuZGF0YVthSW1hZ2VQb2ludGVyXSA9IGFUZW5zb3JQb2ludGVyID09PSAtMSA/XHJcbiAgICAgICAgICAyNTUgOlxyXG4gICAgICAgICAgKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107ICAvLyBBIHZhbHVlXHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcclxuICB9XHJcbiAgcmV0dXJuIGltYWdlO1xyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7T3B0aW9uc0RpbWVuc2lvbnMsIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycywgT3B0aW9uc1RlbnNvckZvcm1hdCwgT3B0aW9uc1RlbnNvckxheW91dCwgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnMsIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLCBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucywgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zLCBUZW5zb3JGcm9tVXJsT3B0aW9uc30gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XHJcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcclxuaW1wb3J0IHtUZW5zb3IgYXMgVGVuc29ySW50ZXJmYWNlfSBmcm9tICcuL3RlbnNvci5qcyc7XHJcblxyXG5pbnRlcmZhY2UgQnVmZmVyVG9UZW5zb3JPcHRpb25zIGV4dGVuZHMgT3B0aW9uc0RpbWVuc2lvbnMsIE9wdGlvbnNUZW5zb3JMYXlvdXQsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNUZW5zb3JGb3JtYXQge31cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIGltYWdlIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0gYnVmZmVyIC0gRXh0cmFjdGVkIGltYWdlIGJ1ZmZlciBkYXRhIC0gYXNzdW1pbmcgUkdCQSBmb3JtYXRcclxuICogQHBhcmFtIGltYWdlRm9ybWF0IC0gaW5wdXQgaW1hZ2UgY29uZmlndXJhdGlvbiAtIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb25zIGhlaWdodCwgd2lkdGgsIGZvcm1hdFxyXG4gKiBAcGFyYW0gdGVuc29yRm9ybWF0IC0gb3V0cHV0IHRlbnNvciBjb25maWd1cmF0aW9uIC0gRGVmYXVsdCBpcyBSR0IgZm9ybWF0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYnVmZmVyVG9UZW5zb3IgPSAoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheXx1bmRlZmluZWQsIG9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyk6IFRlbnNvciA9PiB7XHJcbiAgaWYgKGJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGJ1ZmZlciBtdXN0IGJlIGRlZmluZWQnKTtcclxuICB9XHJcbiAgaWYgKG9wdGlvbnMuaGVpZ2h0ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy53aWR0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGhlaWdodCBhbmQgd2lkdGggbXVzdCBiZSBkZWZpbmVkJyk7XHJcbiAgfVxyXG4gIGlmIChvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05IV0MgVGVuc29yIGxheW91dCBpcyBub3Qgc3VwcG9ydGVkIHlldCcpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qge2hlaWdodCwgd2lkdGh9ID0gb3B0aW9ucztcclxuXHJcbiAgY29uc3Qgbm9ybSA9IG9wdGlvbnMubm9ybSA/PyB7bWVhbjogMjU1LCBiaWFzOiAwfTtcclxuICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG4gIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcblxyXG4gIGlmICh0eXBlb2YgKG5vcm0ubWVhbikgPT09ICdudW1iZXInKSB7XHJcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4hWzBdLCBub3JtLm1lYW4hWzFdLCBub3JtLm1lYW4hWzJdLCBub3JtLm1lYW4hWzNdID8/IDI1NV07XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIChub3JtLmJpYXMpID09PSAnbnVtYmVyJykge1xyXG4gICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcclxuICB9IGVsc2Uge1xyXG4gICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzIVswXSwgbm9ybS5iaWFzIVsxXSwgbm9ybS5iaWFzIVsyXSwgbm9ybS5iaWFzIVszXSA/PyAwXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQkEnO1xyXG4gIC8vIGRlZmF1bHQgdmFsdWUgaXMgUkdCQSBzaW5jZSBpbWFnZWRhdGEgYW5kIEhUTUxJbWFnZUVsZW1lbnQgdXNlcyBpdFxyXG5cclxuICBjb25zdCBvdXRwdXRmb3JtYXQgPVxyXG4gICAgICBvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRlbnNvckZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xyXG4gIGNvbnN0IHN0cmlkZSA9IGhlaWdodCAqIHdpZHRoO1xyXG4gIGNvbnN0IGZsb2F0MzJEYXRhID0gb3V0cHV0Zm9ybWF0ID09PSAnUkdCQScgPyBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDQpIDogbmV3IEZsb2F0MzJBcnJheShzdHJpZGUgKiAzKTtcclxuXHJcbiAgLy8gRGVmYXVsdCBwb2ludGVyIGFzc2lnbm1lbnRzXHJcbiAgbGV0IHN0ZXAgPSA0LCBySW1hZ2VQb2ludGVyID0gMCwgZ0ltYWdlUG9pbnRlciA9IDEsIGJJbWFnZVBvaW50ZXIgPSAyLCBhSW1hZ2VQb2ludGVyID0gMztcclxuICBsZXQgclRlbnNvclBvaW50ZXIgPSAwLCBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSwgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLCBhVGVuc29yUG9pbnRlciA9IC0xO1xyXG5cclxuICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XHJcbiAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xyXG4gICAgc3RlcCA9IDM7XHJcbiAgICBySW1hZ2VQb2ludGVyID0gMDtcclxuICAgIGdJbWFnZVBvaW50ZXIgPSAxO1xyXG4gICAgYkltYWdlUG9pbnRlciA9IDI7XHJcbiAgICBhSW1hZ2VQb2ludGVyID0gLTE7XHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgb3V0cHV0IHRlbnNvciBmb3JtYXRcclxuICBpZiAob3V0cHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcclxuICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcclxuICB9IGVsc2UgaWYgKG91dHB1dGZvcm1hdCA9PT0gJ1JCRycpIHtcclxuICAgIHJUZW5zb3JQb2ludGVyID0gMDtcclxuICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xyXG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xyXG4gIH0gZWxzZSBpZiAob3V0cHV0Zm9ybWF0ID09PSAnQkdSJykge1xyXG4gICAgYlRlbnNvclBvaW50ZXIgPSAwO1xyXG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XHJcbiAgICByVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmlkZTtcclxuICAgICAgIGkrKywgckltYWdlUG9pbnRlciArPSBzdGVwLCBiSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGdJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYUltYWdlUG9pbnRlciArPSBzdGVwKSB7XHJcbiAgICBmbG9hdDMyRGF0YVtyVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbckltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1swXSkgLyBub3JtTWVhblswXTtcclxuICAgIGZsb2F0MzJEYXRhW2dUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltnSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzFdKSAvIG5vcm1NZWFuWzFdO1xyXG4gICAgZmxvYXQzMkRhdGFbYlRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMl0pIC8gbm9ybU1lYW5bMl07XHJcbiAgICBpZiAoYVRlbnNvclBvaW50ZXIgIT09IC0xICYmIGFJbWFnZVBvaW50ZXIgIT09IC0xKSB7XHJcbiAgICAgIGZsb2F0MzJEYXRhW2FUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlclthSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzNdKSAvIG5vcm1NZWFuWzNdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRmxvYXQzMkFycmF5IC0+IG9ydC5UZW5zb3JcclxuICBjb25zdCBvdXRwdXRUZW5zb3IgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBUZW5zb3IoJ2Zsb2F0MzInLCBmbG9hdDMyRGF0YSwgWzEsIDQsIGhlaWdodCwgd2lkdGhdKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVGVuc29yKCdmbG9hdDMyJywgZmxvYXQzMkRhdGEsIFsxLCAzLCBoZWlnaHQsIHdpZHRoXSk7XHJcbiAgcmV0dXJuIG91dHB1dFRlbnNvcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUltYWdlKCkuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbUltYWdlID0gYXN5bmMoXHJcbiAgICBpbWFnZTogSW1hZ2VEYXRhfEhUTUxJbWFnZUVsZW1lbnR8SW1hZ2VCaXRtYXB8c3RyaW5nLFxyXG4gICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zfFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zfFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnN8XHJcbiAgICBUZW5zb3JGcm9tVXJsT3B0aW9ucyk6IFByb21pc2U8VGVuc29yPiA9PiB7XHJcbiAgLy8gY2hlY2tpbmcgdGhlIHR5cGUgb2YgaW1hZ2Ugb2JqZWN0XHJcbiAgY29uc3QgaXNIVE1MSW1hZ2VFbGUgPSB0eXBlb2YgKEhUTUxJbWFnZUVsZW1lbnQpICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgY29uc3QgaXNJbWFnZURhdGFFbGUgPSB0eXBlb2YgKEltYWdlRGF0YSkgIT09ICd1bmRlZmluZWQnICYmIGltYWdlIGluc3RhbmNlb2YgSW1hZ2VEYXRhO1xyXG4gIGNvbnN0IGlzSW1hZ2VCaXRtYXAgPSB0eXBlb2YgKEltYWdlQml0bWFwKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZUJpdG1hcDtcclxuICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiBpbWFnZSA9PT0gJ3N0cmluZyc7XHJcblxyXG4gIGxldCBkYXRhOiBVaW50OENsYW1wZWRBcnJheXx1bmRlZmluZWQ7XHJcbiAgbGV0IGJ1ZmZlclRvVGVuc29yT3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucyA/PyB7fTtcclxuXHJcbiAgY29uc3QgY3JlYXRlQ2FudmFzID0gKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgT2Zmc2NyZWVuQ2FudmFzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gbmV3IE9mZnNjcmVlbkNhbnZhcygxLCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudmFzIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNvbnN0IGNyZWF0ZUNhbnZhc0NvbnRleHQgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudHxPZmZzY3JlZW5DYW52YXMpID0+IHtcclxuICAgIGlmIChjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB9IGVsc2UgaWYgKGNhbnZhcyBpbnN0YW5jZW9mIE9mZnNjcmVlbkNhbnZhcykge1xyXG4gICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgT2Zmc2NyZWVuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuICAvLyBmaWxsaW5nIGFuZCBjaGVja2luZyBpbWFnZSBjb25maWd1cmF0aW9uIG9wdGlvbnNcclxuICBpZiAoaXNIVE1MSW1hZ2VFbGUpIHtcclxuICAgIC8vIEhUTUxJbWFnZUVsZW1lbnQgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgaXMgUkdCQSBieSBkZWZhdWx0XHJcbiAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMoKTtcclxuICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcclxuICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzKTtcclxuXHJcbiAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcclxuICAgICAgbGV0IGhlaWdodCA9IGltYWdlLmhlaWdodDtcclxuICAgICAgbGV0IHdpZHRoID0gaW1hZ2Uud2lkdGg7XHJcbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkSGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkV2lkdGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGhlaWdodCA9IG9wdGlvbnMucmVzaXplZEhlaWdodDtcclxuICAgICAgICB3aWR0aCA9IG9wdGlvbnMucmVzaXplZFdpZHRoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICBpZiAob3B0aW9ucy50ZW5zb3JGb3JtYXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBpbnB1dCBjb25maWcgZm9ybWF0IG11c3QgYmUgUkdCQSBmb3IgSFRNTEltYWdlRWxlbWVudCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMudGVuc29yRm9ybWF0ID0gJ1JHQkEnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy50ZW5zb3JGb3JtYXQgPSAnUkdCQSc7XHJcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcGl4ZWxzMkRDb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XHJcbiAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGlzSW1hZ2VEYXRhRWxlKSB7XHJcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZFdpZHRoICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkSGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVkSGVpZ2h0O1xyXG4gICAgICB3aWR0aCA9IG9wdGlvbnMucmVzaXplZFdpZHRoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICB3aWR0aCA9IGltYWdlLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucztcclxuICAgIH1cclxuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5mb3JtYXQgPSAnUkdCQSc7XHJcbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zdCB0ZW1wQ2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XHJcblxyXG4gICAgICB0ZW1wQ2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dCh0ZW1wQ2FudmFzKTtcclxuXHJcbiAgICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xyXG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5wdXRJbWFnZURhdGEoaW1hZ2UsIDAsIDApO1xyXG4gICAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEgPSBpbWFnZS5kYXRhO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoaXNJbWFnZUJpdG1hcCkge1xyXG4gICAgLy8gSW1hZ2VCaXRtYXAgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgbXVzdCBiZSBwcm92aWRlZCBieSB1c2VyXHJcbiAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgaW1hZ2UgY29uZmlnIHdpdGggZm9ybWF0IGZvciBJbWFnZWJpdG1hcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xyXG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xyXG4gICAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXMpO1xyXG5cclxuICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xyXG4gICAgICBjb25zdCBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XHJcbiAgICAgIGNvbnN0IHdpZHRoID0gaW1hZ2Uud2lkdGg7XHJcbiAgICAgIHBpeGVsczJEQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xyXG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcclxuICAgICAgcmV0dXJuIGJ1ZmZlclRvVGVuc29yKGRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGlzU3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMoKTtcclxuICAgICAgY29uc3QgY29udGV4dCA9IGNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzKTtcclxuICAgICAgaWYgKCFpbWFnZSB8fCAhY29udGV4dCkge1xyXG4gICAgICAgIHJldHVybiByZWplY3QoKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBuZXdJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBuZXdJbWFnZS5jcm9zc09yaWdpbiA9ICdBbm9ueW1vdXMnO1xyXG4gICAgICBuZXdJbWFnZS5zcmMgPSBpbWFnZTtcclxuICAgICAgbmV3SW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IG5ld0ltYWdlLndpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBuZXdJbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UobmV3SW1hZ2UsIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgaW1nID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgICAgIHJlc29sdmUoYnVmZmVyVG9UZW5zb3IoaW1nLmRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucykpO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgZGF0YSBwcm92aWRlZCBpcyBub3Qgc3VwcG9ydGVkIC0gYWJvcnRlZCB0ZW5zb3IgY3JlYXRpb24nKTtcclxuICB9XHJcblxyXG4gIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBidWZmZXJUb1RlbnNvcihkYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGRhdGEgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZCAtIGFib3J0ZWQgdGVuc29yIGNyZWF0aW9uJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tVGV4dHVyZSgpLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21UZXh0dXJlID0gPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZURhdGFUeXBlcz4oXHJcbiAgICB0ZXh0dXJlOiBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGUsIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPik6IFRlbnNvciA9PiB7XHJcbiAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIGRvd25sb2FkLCBkaXNwb3NlfSA9IG9wdGlvbnM7XHJcbiAgLy8gQWx3YXlzIGFzc3VtZSBSR0JBRjMyLiBUT0RPOiBzdXBwb3J0IGRpZmZlcmVudCB0ZXh0dXJlIGZvcm1hdFxyXG4gIGNvbnN0IGRpbXMgPSBbMSwgaGVpZ2h0LCB3aWR0aCwgNF07XHJcbiAgcmV0dXJuIG5ldyBUZW5zb3Ioe2xvY2F0aW9uOiAndGV4dHVyZScsIHR5cGU6ICdmbG9hdDMyJywgdGV4dHVyZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2V9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcigpLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21HcHVCdWZmZXIgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJEYXRhVHlwZXM+KFxyXG4gICAgZ3B1QnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyVHlwZSwgb3B0aW9uczogVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VD4pOiBUZW5zb3IgPT4ge1xyXG4gIGNvbnN0IHtkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2V9ID0gb3B0aW9ucztcclxuICByZXR1cm4gbmV3IFRlbnNvcih7bG9jYXRpb246ICdncHUtYnVmZmVyJywgdHlwZTogZGF0YVR5cGUgPz8gJ2Zsb2F0MzInLCBncHVCdWZmZXIsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21QaW5uZWRCdWZmZXIoKS5cclxuICovXHJcbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tUGlubmVkQnVmZmVyID0gPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuQ3B1UGlubmVkRGF0YVR5cGVzPihcclxuICAgIHR5cGU6IFQsIGJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlTWFwW1RdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3IgPT5cclxuICAgIG5ldyBUZW5zb3Ioe2xvY2F0aW9uOiAnY3B1LXBpbm5lZCcsIHR5cGUsIGRhdGE6IGJ1ZmZlciwgZGltczogZGltcyA/PyBbYnVmZmVyLmxlbmd0aF19KTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnLi90ZW5zb3IuanMnO1xyXG5cclxuZXhwb3J0IHR5cGUgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyA9IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yfFVpbnQ4QXJyYXlDb25zdHJ1Y3RvcnxJbnQ4QXJyYXlDb25zdHJ1Y3RvcnxcclxuICAgIFVpbnQxNkFycmF5Q29uc3RydWN0b3J8SW50MTZBcnJheUNvbnN0cnVjdG9yfEludDMyQXJyYXlDb25zdHJ1Y3RvcnxCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3J8VWludDhBcnJheUNvbnN0cnVjdG9yfFxyXG4gICAgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3J8VWludDMyQXJyYXlDb25zdHJ1Y3RvcnxCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yO1xyXG5leHBvcnQgdHlwZSBTdXBwb3J0ZWRUeXBlZEFycmF5ID0gSW5zdGFuY2VUeXBlPFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnM+O1xyXG5cclxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cclxuZXhwb3J0IGNvbnN0IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgPSBuZXcgTWFwPHN0cmluZywgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz4oW1xyXG4gIFsnZmxvYXQzMicsIEZsb2F0MzJBcnJheV0sXHJcbiAgWyd1aW50OCcsIFVpbnQ4QXJyYXldLFxyXG4gIFsnaW50OCcsIEludDhBcnJheV0sXHJcbiAgWyd1aW50MTYnLCBVaW50MTZBcnJheV0sXHJcbiAgWydpbnQxNicsIEludDE2QXJyYXldLFxyXG4gIFsnaW50MzInLCBJbnQzMkFycmF5XSxcclxuICBbJ2Jvb2wnLCBVaW50OEFycmF5XSxcclxuICBbJ2Zsb2F0NjQnLCBGbG9hdDY0QXJyYXldLFxyXG4gIFsndWludDMyJywgVWludDMyQXJyYXldLFxyXG5dKTtcclxuXHJcbi8vIGEgcnVudGltZSBtYXAgdGhhdCBtYXBzIHR5cGUgc3RyaW5nIHRvIFR5cGVkQXJyYXkgY29uc3RydWN0b3IuIFNob3VsZCBtYXRjaCBUZW5zb3IuRGF0YVR5cGVNYXAuXHJcbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQID0gbmV3IE1hcDxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLCBUZW5zb3IuVHlwZT4oW1xyXG4gIFtGbG9hdDMyQXJyYXksICdmbG9hdDMyJ10sXHJcbiAgW1VpbnQ4QXJyYXksICd1aW50OCddLFxyXG4gIFtJbnQ4QXJyYXksICdpbnQ4J10sXHJcbiAgW1VpbnQxNkFycmF5LCAndWludDE2J10sXHJcbiAgW0ludDE2QXJyYXksICdpbnQxNiddLFxyXG4gIFtJbnQzMkFycmF5LCAnaW50MzInXSxcclxuICBbRmxvYXQ2NEFycmF5LCAnZmxvYXQ2NCddLFxyXG4gIFtVaW50MzJBcnJheSwgJ3VpbnQzMiddLFxyXG5dKTtcclxuXHJcbi8vIGEgZHVtbXkgdHlwZSBkZWNsYXJhdGlvbiBmb3IgRmxvYXQxNkFycmF5IGluIGNhc2UgYW55IHBvbHlmaWxsIGlzIGF2YWlsYWJsZS5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBjb25zdCBGbG9hdDE2QXJyYXk6IGFueTtcclxufVxyXG5cclxuLy8gdGhlIGZvbGxvd2luZyBjb2RlIGFsbG93cyBkZWxheWluZyBleGVjdXRpb24gb2YgQmlnSW50L0Zsb2F0MTZBcnJheSBjaGVja2luZy4gVGhpcyBhbGxvd3MgbGF6eSBpbml0aWFsaXphdGlvbiBmb3JcclxuLy8gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCBhbmQgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCwgd2hpY2ggYWxsb3dzIEJpZ0ludC9GbG9hdDE2QXJyYXlcclxuLy8gcG9seWZpbGwgaWYgYXZhaWxhYmxlLlxyXG5sZXQgaXNUeXBlZEFycmF5Q2hlY2tlZCA9IGZhbHNlO1xyXG5leHBvcnQgY29uc3QgY2hlY2tUeXBlZEFycmF5ID0gKCkgPT4ge1xyXG4gIGlmICghaXNUeXBlZEFycmF5Q2hlY2tlZCkge1xyXG4gICAgaXNUeXBlZEFycmF5Q2hlY2tlZCA9IHRydWU7XHJcbiAgICBjb25zdCBpc0JpZ0ludDY0QXJyYXlBdmFpbGFibGUgPSB0eXBlb2YgQmlnSW50NjRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgQmlnSW50NjRBcnJheS5mcm9tO1xyXG4gICAgY29uc3QgaXNCaWdVaW50NjRBcnJheUF2YWlsYWJsZSA9IHR5cGVvZiBCaWdVaW50NjRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgQmlnVWludDY0QXJyYXkuZnJvbTtcclxuICAgIGNvbnN0IGlzRmxvYXQxNkFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEZsb2F0MTZBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgRmxvYXQxNkFycmF5LmZyb207XHJcblxyXG4gICAgaWYgKGlzQmlnSW50NjRBcnJheUF2YWlsYWJsZSkge1xyXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnaW50NjQnLCBCaWdJbnQ2NEFycmF5KTtcclxuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoQmlnSW50NjRBcnJheSwgJ2ludDY0Jyk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNCaWdVaW50NjRBcnJheUF2YWlsYWJsZSkge1xyXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgndWludDY0JywgQmlnVWludDY0QXJyYXkpO1xyXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLnNldChCaWdVaW50NjRBcnJheSwgJ3VpbnQ2NCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzRmxvYXQxNkFycmF5QXZhaWxhYmxlKSB7XHJcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuc2V0KCdmbG9hdDE2JywgRmxvYXQxNkFycmF5KTtcclxuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoRmxvYXQxNkFycmF5LCAnZmxvYXQxNicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gaWYgRmxvYXQxNkFycmF5IGlzIG5vdCBhdmFpbGFibGUsIHVzZSAnVWludDE2QXJyYXknIHRvIHN0b3JlIHRoZSBkYXRhLlxyXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnZmxvYXQxNicsIFVpbnQxNkFycmF5KTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHtDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMsIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycywgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc30gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XHJcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBjYWxjdWxhdGUgc2l6ZSBmcm9tIGRpbXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBkaW1zIHRoZSBkaW1zIGFycmF5LiBNYXkgYmUgYW4gaWxsZWdhbCBpbnB1dC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVTaXplID0gKGRpbXM6IHJlYWRvbmx5IHVua25vd25bXSk6IG51bWJlciA9PiB7XHJcbiAgbGV0IHNpemUgPSAxO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGltcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZGltID0gZGltc1tpXTtcclxuICAgIGlmICh0eXBlb2YgZGltICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzU2FmZUludGVnZXIoZGltKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYW4gaW50ZWdlciwgZ290OiAke2RpbX1gKTtcclxuICAgIH1cclxuICAgIGlmIChkaW0gPCAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290OiAke2RpbX1gKTtcclxuICAgIH1cclxuICAgIHNpemUgKj0gZGltO1xyXG4gIH1cclxuICByZXR1cm4gc2l6ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IucmVzaGFwZSgpXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yUmVzaGFwZSA9ICh0ZW5zb3I6IFRlbnNvciwgZGltczogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3IgPT4ge1xyXG4gIHN3aXRjaCAodGVuc29yLmxvY2F0aW9uKSB7XHJcbiAgICBjYXNlICdjcHUnOlxyXG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih0ZW5zb3IudHlwZSwgdGVuc29yLmRhdGEsIGRpbXMpO1xyXG4gICAgY2FzZSAnY3B1LXBpbm5lZCc6XHJcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcclxuICAgICAgICBsb2NhdGlvbjogJ2NwdS1waW5uZWQnLFxyXG4gICAgICAgIGRhdGE6IHRlbnNvci5kYXRhIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1snZGF0YSddLFxyXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxyXG4gICAgICAgIGRpbXMsXHJcbiAgICAgIH0pO1xyXG4gICAgY2FzZSAndGV4dHVyZSc6XHJcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcclxuICAgICAgICBsb2NhdGlvbjogJ3RleHR1cmUnLFxyXG4gICAgICAgIHRleHR1cmU6IHRlbnNvci50ZXh0dXJlLFxyXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcclxuICAgICAgICBkaW1zLFxyXG4gICAgICB9KTtcclxuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxyXG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XHJcbiAgICAgICAgbG9jYXRpb246ICdncHUtYnVmZmVyJyxcclxuICAgICAgICBncHVCdWZmZXI6IHRlbnNvci5ncHVCdWZmZXIsXHJcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXHJcbiAgICAgICAgZGltcyxcclxuICAgICAgfSk7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRlbnNvclJlc2hhcGU6IHRlbnNvciBsb2NhdGlvbiAke3RlbnNvci5sb2NhdGlvbn0gaXMgbm90IHN1cHBvcnRlZGApO1xyXG4gIH1cclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge3RlbnNvclRvRGF0YVVSTCwgdGVuc29yVG9JbWFnZURhdGF9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24taW1wbC5qcyc7XHJcbmltcG9ydCB7VGVuc29yVG9EYXRhVXJsT3B0aW9ucywgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcclxuaW1wb3J0IHt0ZW5zb3JGcm9tR3B1QnVmZmVyLCB0ZW5zb3JGcm9tSW1hZ2UsIHRlbnNvckZyb21QaW5uZWRCdWZmZXIsIHRlbnNvckZyb21UZXh0dXJlfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LWltcGwuanMnO1xyXG5pbXBvcnQge0NwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycywgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLCBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucywgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucywgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLCBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnMsIFRlbnNvckZyb21VcmxPcHRpb25zLCBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcclxuaW1wb3J0IHtjaGVja1R5cGVkQXJyYXksIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAsIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIFN1cHBvcnRlZFR5cGVkQXJyYXksIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnN9IGZyb20gJy4vdGVuc29yLWltcGwtdHlwZS1tYXBwaW5nLmpzJztcclxuaW1wb3J0IHtjYWxjdWxhdGVTaXplLCB0ZW5zb3JSZXNoYXBlfSBmcm9tICcuL3RlbnNvci11dGlscy1pbXBsLmpzJztcclxuaW1wb3J0IHtUZW5zb3IgYXMgVGVuc29ySW50ZXJmYWNlfSBmcm9tICcuL3RlbnNvci5qcyc7XHJcblxyXG4vLyB0eXBlIGFsaWFzZXMgZm9yIHRob3NlIGV4cG9ydGVkIGZyb20gVGVuc29yIGludGVyZmFjZVxyXG5cclxudHlwZSBUZW5zb3JUeXBlID0gVGVuc29ySW50ZXJmYWNlLlR5cGU7XHJcbnR5cGUgVGVuc29yRGF0YVR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuRGF0YVR5cGU7XHJcbnR5cGUgVGVuc29yRGF0YUxvY2F0aW9uID0gVGVuc29ySW50ZXJmYWNlLkRhdGFMb2NhdGlvbjtcclxudHlwZSBUZW5zb3JUZXh0dXJlVHlwZSA9IFRlbnNvckludGVyZmFjZS5UZXh0dXJlVHlwZTtcclxudHlwZSBUZW5zb3JHcHVCdWZmZXJUeXBlID0gVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlclR5cGU7XHJcblxyXG4vKipcclxuICogdGhlIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvciBpbnRlcmZhY2UuXHJcbiAqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZW5zb3IgaW1wbGVtZW50cyBUZW5zb3JJbnRlcmZhY2Uge1xyXG4gIC8vICNyZWdpb24gY29uc3RydWN0b3JzXHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICB0eXBlOiBUZW5zb3JUeXBlLCBkYXRhOiBUZW5zb3JEYXRhVHlwZXxyZWFkb25seSBzdHJpbmdbXXxyZWFkb25seSBudW1iZXJbXXxyZWFkb25seSBib29sZWFuW10sXHJcbiAgICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IENQVSB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuIFR5cGUgaXMgaW5mZXJyZWQgZnJvbSBkYXRhLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFRlbnNvckRhdGFUeXBlfHJlYWRvbmx5IHN0cmluZ1tdfHJlYWRvbmx5IGJvb2xlYW5bXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBwaW5uZWQgQ1BVIGRhdGEgd2l0aCB0aGUgZ2l2ZW4gdHlwZSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdjcHUtcGlubmVkJy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJHTCB0ZXh0dXJlIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAndGV4dHVyZScuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIFdlYkdQVSBidWZmZXIgd2l0aCB0aGUgZ2l2ZW4gdHlwZSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdncHUtYnVmZmVyJy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcclxuXHJcbiAgLyoqXHJcbiAgICogaW1wbGVtZW50YXRpb24uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIGFyZzA6IFRlbnNvclR5cGV8VGVuc29yRGF0YVR5cGV8cmVhZG9ubHkgc3RyaW5nW118cmVhZG9ubHkgYm9vbGVhbltdfENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc3xcclxuICAgICAgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc3xHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXHJcbiAgICAgIGFyZzE/OiBUZW5zb3JEYXRhVHlwZXxyZWFkb25seSBudW1iZXJbXXxyZWFkb25seSBzdHJpbmdbXXxyZWFkb25seSBib29sZWFuW10sIGFyZzI/OiByZWFkb25seSBudW1iZXJbXSkge1xyXG4gICAgLy8gcGVyZm9ybSBvbmUtdGltZSBjaGVjayBmb3IgQmlnSW50L0Zsb2F0MTZBcnJheSBzdXBwb3J0XHJcbiAgICBjaGVja1R5cGVkQXJyYXkoKTtcclxuXHJcbiAgICBsZXQgdHlwZTogVGVuc29yVHlwZTtcclxuICAgIGxldCBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdvYmplY3QnICYmICdsb2NhdGlvbicgaW4gYXJnMCkge1xyXG4gICAgICAvL1xyXG4gICAgICAvLyBjb25zdHJ1Y3RpbmcgdGVuc29yIGZyb20gc3BlY2lmaWMgbG9jYXRpb25cclxuICAgICAgLy9cclxuICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSBhcmcwLmxvY2F0aW9uO1xyXG4gICAgICB0eXBlID0gYXJnMC50eXBlO1xyXG4gICAgICBkaW1zID0gYXJnMC5kaW1zO1xyXG4gICAgICBzd2l0Y2ggKGFyZzAubG9jYXRpb24pIHtcclxuICAgICAgICBjYXNlICdjcHUtcGlubmVkJzoge1xyXG4gICAgICAgICAgY29uc3QgZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldCh0eXBlKTtcclxuICAgICAgICAgIGlmICghZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gcGlubmVkIGJ1ZmZlcmApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCEoYXJnMC5kYXRhIGluc3RhbmNlb2YgZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGJ1ZmZlciBzaG91bGQgYmUgb2YgdHlwZSAke2V4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yLm5hbWV9YCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmNwdURhdGEgPSBhcmcwLmRhdGE7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAndGV4dHVyZSc6IHtcclxuICAgICAgICAgIGlmICh0eXBlICE9PSAnZmxvYXQzMicpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gdGV4dHVyZWApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5ncHVUZXh0dXJlRGF0YSA9IGFyZzAudGV4dHVyZTtcclxuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XHJcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XHJcbiAgICAgICAgICBpZiAoKHR5cGUgIT09ICdmbG9hdDMyJyAmJiB0eXBlICE9PSAnZmxvYXQxNicgJiYgdHlwZSAhPT0gJ2ludDMyJyAmJiB0eXBlICE9PSAnaW50NjQnICYmIHR5cGUgIT09ICd1aW50MzInICYmXHJcbiAgICAgICAgICAgICAgIHR5cGUgIT09ICd1aW50OCcgJiYgdHlwZSAhPT0gJ2Jvb2wnKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBncHUgYnVmZmVyYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmdwdUJ1ZmZlckRhdGEgPSBhcmcwLmdwdUJ1ZmZlcjtcclxuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XHJcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbnNvciBjb25zdHJ1Y3RvcjogdW5zdXBwb3J0ZWQgbG9jYXRpb24gJyR7dGhpcy5kYXRhTG9jYXRpb259J2ApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL1xyXG4gICAgICAvLyBjb25zdHJ1Y3RpbmcgdGVuc29yIG9mIGxvY2F0aW9uICdjcHUnXHJcbiAgICAgIC8vXHJcbiAgICAgIGxldCBkYXRhOiBUZW5zb3JEYXRhVHlwZTtcclxuICAgICAgbGV0IG1heWJlRGltczogdHlwZW9mIGFyZzF8dHlwZW9mIGFyZzI7XHJcbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgYXJnMCBpcyB0eXBlIG9yIGRhdGFcclxuICAgICAgaWYgKHR5cGVvZiBhcmcwID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gT3ZlcnJpZGU6IGNvbnN0cnVjdG9yKHR5cGUsIGRhdGEsIC4uLilcclxuICAgICAgICAvL1xyXG4gICAgICAgIHR5cGUgPSBhcmcwO1xyXG4gICAgICAgIG1heWJlRGltcyA9IGFyZzI7XHJcbiAgICAgICAgaWYgKGFyZzAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAvLyBzdHJpbmcgdGVuc29yXHJcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJnMSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBzdHJpbmcgdGVuc29yXFwncyBkYXRhIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyB3ZSBkb24ndCBjaGVjayB3aGV0aGVyIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIGFycmF5IGlzIHN0cmluZzsgdGhpcyBpcyB0b28gc2xvdy4gd2UgYXNzdW1lIGl0J3MgY29ycmVjdCBhbmRcclxuICAgICAgICAgIC8vIGVycm9yIHdpbGwgYmUgcG9wdWxhdGVkIGF0IGluZmVyZW5jZVxyXG4gICAgICAgICAgZGF0YSA9IGFyZzE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIG51bWVyaWMgdGVuc29yXHJcbiAgICAgICAgICBjb25zdCB0eXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldChhcmcwKTtcclxuICAgICAgICAgIGlmICh0eXBlZEFycmF5Q29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0ZW5zb3IgdHlwZTogJHthcmcwfS5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzEpKSB7XHJcbiAgICAgICAgICAgIGlmIChhcmcwID09PSAnZmxvYXQxNicgJiYgdHlwZWRBcnJheUNvbnN0cnVjdG9yID09PSBVaW50MTZBcnJheSkge1xyXG4gICAgICAgICAgICAgIC8vIFdoZW4gbm8gRmxvYXQxNkFycmF5IHBvbHlmaWxsIGlzIHVzZWQsIHdlIGNhbm5vdCBjcmVhdGUgJ2Zsb2F0MTYnIHRlbnNvciBmcm9tIG51bWJlciBhcnJheS5cclxuICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgIC8vIFRocm93IGVycm9yIGhlcmUgYmVjYXVzZSB3aGVuIHVzZXIgdHJ5IHRvIHVzZSBudW1iZXIgYXJyYXkgYXMgZGF0YSxcclxuICAgICAgICAgICAgICAvLyBlLmcuIG5ldyBUZW5zb3IoJ2Zsb2F0MTYnLCBbMSwgMiwgMywgNF0sIGRpbXMpKSwgaXQgd2lsbCBhY3R1YWxseSBjYWxsXHJcbiAgICAgICAgICAgICAgLy8gVWludDE2QXJyYXkuZnJvbShhcmcxKSB3aGljaCBnZW5lcmF0ZXMgd3JvbmcgZGF0YS5cclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAnQ3JlYXRpbmcgYSBmbG9hdDE2IHRlbnNvciBmcm9tIG51bWJlciBhcnJheSBpcyBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgdXNlIFVpbnQxNkFycmF5IGFzIGRhdGEuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMCA9PT0gJ3VpbnQ2NCcgfHwgYXJnMCA9PT0gJ2ludDY0Jykge1xyXG4gICAgICAgICAgICAgIC8vIHVzZSAnYXMgYW55JyBoZXJlIGJlY2F1c2U6XHJcbiAgICAgICAgICAgICAgLy8gMS4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHR5cGUgb2YgJ0FycmF5LmlzQXJyYXkoKScgZG9lcyBub3Qgd29yayB3aXRoIHJlYWRvbmx5IGFycmF5cy5cclxuICAgICAgICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xNzAwMlxyXG4gICAgICAgICAgICAgIC8vIDIuIFR5cGVTY3JpcHQncyBjaGVjayBvbiB1bmlvbiB0eXBlIG9mICcoQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3IpLmZyb20oKSdcclxuICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBhY2NlcHQgcGFyYW1ldGVyIG1hcEZuLlxyXG4gICAgICAgICAgICAgIC8vIDMuIHBhcmFtZXRlcnMgb2YgJ1N1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMuZnJvbSgpJyBkb2VzIG5vdCBtYXRjaCB0aGUgcmVxdWlyZW1lbnQgb2YgdGhlIHVuaW9uXHJcbiAgICAgICAgICAgICAgLy8gdHlwZS5cclxuXHJcbiAgICAgICAgICAgICAgLy8gYXNzdW1lICdhcmcxJyBpcyBvZiB0eXBlIFwicmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgYmlnaW50W11cIiBoZXJlLlxyXG5cclxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgIGRhdGEgPSAodHlwZWRBcnJheUNvbnN0cnVjdG9yIGFzIGFueSkuZnJvbShhcmcxLCBCaWdJbnQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdXCIgaGVyZS5cclxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgIGRhdGEgPSAodHlwZWRBcnJheUNvbnN0cnVjdG9yIGFzIGFueSkuZnJvbShhcmcxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcxIGluc3RhbmNlb2YgdHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBhcmcxO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQSAke3R5cGV9IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mICR7dHlwZWRBcnJheUNvbnN0cnVjdG9yfWApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIE92ZXJyaWRlOiBjb25zdHJ1Y3RvcihkYXRhLCAuLi4pXHJcbiAgICAgICAgLy9cclxuICAgICAgICBtYXliZURpbXMgPSBhcmcxO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzApKSB7XHJcbiAgICAgICAgICAvLyBvbmx5IGJvb2xlYW5bXSBhbmQgc3RyaW5nW10gaXMgc3VwcG9ydGVkXHJcbiAgICAgICAgICBpZiAoYXJnMC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGVuc29yIHR5cGUgY2Fubm90IGJlIGluZmVycmVkIGZyb20gYW4gZW1wdHkgYXJyYXkuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBmaXJzdEVsZW1lbnRUeXBlID0gdHlwZW9mIGFyZzBbMF07XHJcbiAgICAgICAgICBpZiAoZmlyc3RFbGVtZW50VHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdHlwZSA9ICdzdHJpbmcnO1xyXG4gICAgICAgICAgICBkYXRhID0gYXJnMDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZmlyc3RFbGVtZW50VHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSAnYm9vbCc7XHJcbiAgICAgICAgICAgIC8vICdhcmcwJyBpcyBvZiB0eXBlICdib29sZWFuW10nLiBVaW50OEFycmF5LmZyb20oYm9vbGVhbltdKSBhY3R1YWxseSB3b3JrcywgYnV0IHR5cGVzY3JpcHQgdGhpbmtzIHRoaXMgaXNcclxuICAgICAgICAgICAgLy8gd3JvbmcgdHlwZS4gV2UgdXNlICdhcyBhbnknIHRvIG1ha2UgaXQgaGFwcHkuXHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgIGRhdGEgPSBVaW50OEFycmF5LmZyb20oYXJnMCBhcyBhbnlbXSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGVsZW1lbnQgdHlwZSBvZiBkYXRhIGFycmF5OiAke2ZpcnN0RWxlbWVudFR5cGV9LmApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBnZXQgdGVuc29yIHR5cGUgZnJvbSBUeXBlZEFycmF5XHJcbiAgICAgICAgICBjb25zdCBtYXBwZWRUeXBlID1cclxuICAgICAgICAgICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLmdldChhcmcwLmNvbnN0cnVjdG9yIGFzIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMpO1xyXG4gICAgICAgICAgaWYgKG1hcHBlZFR5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0eXBlIGZvciB0ZW5zb3IgZGF0YTogJHthcmcwLmNvbnN0cnVjdG9yfS5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHR5cGUgPSBtYXBwZWRUeXBlO1xyXG4gICAgICAgICAgZGF0YSA9IGFyZzAgYXMgU3VwcG9ydGVkVHlwZWRBcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHR5cGUgYW5kIGRhdGEgaXMgcHJvY2Vzc2VkLCBub3cgcHJvY2Vzc2luZyBkaW1zXHJcbiAgICAgIGlmIChtYXliZURpbXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIGFzc3VtZSAxLUQgdGVuc29yIGlmIGRpbXMgb21pdHRlZFxyXG4gICAgICAgIG1heWJlRGltcyA9IFtkYXRhLmxlbmd0aF07XHJcbiAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWF5YmVEaW1zKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgdGVuc29yXFwncyBkaW1zIG11c3QgYmUgYSBudW1iZXIgYXJyYXknKTtcclxuICAgICAgfVxyXG4gICAgICBkaW1zID0gbWF5YmVEaW1zIGFzIHJlYWRvbmx5IG51bWJlcltdO1xyXG5cclxuICAgICAgdGhpcy5jcHVEYXRhID0gZGF0YTtcclxuICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnY3B1JztcclxuICAgIH1cclxuXHJcbiAgICAvLyBwZXJmb3JtIGNoZWNrIG9uIGRpbXNcclxuICAgIGNvbnN0IHNpemUgPSBjYWxjdWxhdGVTaXplKGRpbXMpO1xyXG4gICAgLy8gaWYgZGF0YSBpcyBvbiBDUFUsIGNoZWNrIHdoZXRoZXIgZGF0YSBsZW5ndGggbWF0Y2hlcyB0ZW5zb3Igc2l6ZVxyXG4gICAgaWYgKHRoaXMuY3B1RGF0YSAmJiBzaXplICE9PSB0aGlzLmNwdURhdGEubGVuZ3RoKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yJ3Mgc2l6ZSgke3NpemV9KSBkb2VzIG5vdCBtYXRjaCBkYXRhIGxlbmd0aCgke3RoaXMuY3B1RGF0YS5sZW5ndGh9KS5gKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5kaW1zID0gZGltcztcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbiAgfVxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBmYWN0b3J5XHJcbiAgc3RhdGljIGFzeW5jIGZyb21JbWFnZShcclxuICAgICAgaW1hZ2U6IEltYWdlRGF0YXxIVE1MSW1hZ2VFbGVtZW50fEltYWdlQml0bWFwfHN0cmluZyxcclxuICAgICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zfFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zfFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnN8XHJcbiAgICAgIFRlbnNvckZyb21VcmxPcHRpb25zKTogUHJvbWlzZTxUZW5zb3JJbnRlcmZhY2U+IHtcclxuICAgIHJldHVybiB0ZW5zb3JGcm9tSW1hZ2UoaW1hZ2UsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21UZXh0dXJlPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZURhdGFUeXBlcz4oXHJcbiAgICAgIHRleHR1cmU6IFRlbnNvclRleHR1cmVUeXBlLCBvcHRpb25zOiBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VD4pOiBUZW5zb3JJbnRlcmZhY2Uge1xyXG4gICAgcmV0dXJuIHRlbnNvckZyb21UZXh0dXJlKHRleHR1cmUsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21HcHVCdWZmZXI8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJEYXRhVHlwZXM+KFxyXG4gICAgICBncHVCdWZmZXI6IFRlbnNvckdwdUJ1ZmZlclR5cGUsIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+KTogVGVuc29ySW50ZXJmYWNlIHtcclxuICAgIHJldHVybiB0ZW5zb3JGcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVBpbm5lZEJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkNwdVBpbm5lZERhdGFUeXBlcz4oXHJcbiAgICAgIHR5cGU6IFQsIGJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlTWFwW1RdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3Ige1xyXG4gICAgcmV0dXJuIHRlbnNvckZyb21QaW5uZWRCdWZmZXIodHlwZSwgYnVmZmVyLCBkaW1zKTtcclxuICB9XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBjb252ZXJzaW9uc1xyXG4gIHRvRGF0YVVSTChvcHRpb25zPzogVGVuc29yVG9EYXRhVXJsT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGVuc29yVG9EYXRhVVJMKHRoaXMsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YSB7XHJcbiAgICByZXR1cm4gdGVuc29yVG9JbWFnZURhdGEodGhpcywgb3B0aW9ucyk7XHJcbiAgfVxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBwdWJsaWMgZmllbGRzXHJcbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XHJcbiAgcmVhZG9ubHkgdHlwZTogVGVuc29yVHlwZTtcclxuICByZWFkb25seSBzaXplOiBudW1iZXI7XHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIHByaXZhdGUgZmllbGRzXHJcblxyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkYXRhTG9jYXRpb246IFRlbnNvckRhdGFMb2NhdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogc3RvcmVzIHRoZSBkYXRhIG9uIENQVSwgaWYgbG9jYXRpb24gaXMgJ2NwdScgb3IgJ2NwdS1waW5uZWQnLiBvdGhlcndpc2UgZW1wdHkuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcHVEYXRhPzogVGVuc29yRGF0YVR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyB0ZXh0dXJlIHdoZW4gbG9jYXRpb24gaXMgJ3RleHR1cmUnLiBvdGhlcndpc2UgZW1wdHkuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBncHVUZXh0dXJlRGF0YT86IFRlbnNvclRleHR1cmVUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgR1BVIGJ1ZmZlciB3aGVuIGxvY2F0aW9uIGlzICdncHUtYnVmZmVyJy4gb3RoZXJ3aXNlIGVtcHR5LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ3B1QnVmZmVyRGF0YT86IFRlbnNvckdwdUJ1ZmZlclR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkb3dubG9hZGVyIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgZG93bmxvYWRlcj8oKTogUHJvbWlzZTxUZW5zb3JEYXRhVHlwZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIGEgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGRhdGEgaXMgYmVpbmcgZG93bmxvYWRlZCBmcm9tIEdQVSB0byBDUFUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpc0Rvd25sb2FkaW5nPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogc3RvcmVzIGFuIG9wdGlvbmFsIGRpc3Bvc2VyIGZ1bmN0aW9uIHRvIGRpc3Bvc2UgdGhlIHVuZGVybHlpbmcgZGF0YS5cclxuICAgKi9cclxuICBwcml2YXRlIGRpc3Bvc2VyPygpOiB2b2lkO1xyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBwcm9wZXJ0aWVzXHJcbiAgZ2V0IGRhdGEoKTogVGVuc29yRGF0YVR5cGUge1xyXG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xyXG4gICAgaWYgKCF0aGlzLmNwdURhdGEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgJ1RoZSBkYXRhIGlzIG5vdCBvbiBDUFUuIFVzZSBgZ2V0RGF0YSgpYCB0byBkb3dubG9hZCBHUFUgZGF0YSB0byBDUFUsICcgK1xyXG4gICAgICAgICAgJ29yIHVzZSBgdGV4dHVyZWAgb3IgYGdwdUJ1ZmZlcmAgcHJvcGVydHkgdG8gYWNjZXNzIHRoZSBHUFUgZGF0YSBkaXJlY3RseS4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmNwdURhdGE7XHJcbiAgfVxyXG5cclxuICBnZXQgbG9jYXRpb24oKTogVGVuc29yRGF0YUxvY2F0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFMb2NhdGlvbjtcclxuICB9XHJcblxyXG4gIGdldCB0ZXh0dXJlKCk6IFRlbnNvclRleHR1cmVUeXBlIHtcclxuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcclxuICAgIGlmICghdGhpcy5ncHVUZXh0dXJlRGF0YSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBkYXRhIGlzIG5vdCBzdG9yZWQgYXMgYSBXZWJHTCB0ZXh0dXJlLicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZ3B1VGV4dHVyZURhdGE7XHJcbiAgfVxyXG5cclxuICBnZXQgZ3B1QnVmZmVyKCk6IFRlbnNvckdwdUJ1ZmZlclR5cGUge1xyXG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xyXG4gICAgaWYgKCF0aGlzLmdwdUJ1ZmZlckRhdGEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR1BVIGJ1ZmZlci4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmdwdUJ1ZmZlckRhdGE7XHJcbiAgfVxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBtZXRob2RzXHJcblxyXG4gIGFzeW5jIGdldERhdGEocmVsZWFzZURhdGE/OiBib29sZWFuKTogUHJvbWlzZTxUZW5zb3JEYXRhVHlwZT4ge1xyXG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xyXG4gICAgc3dpdGNoICh0aGlzLmRhdGFMb2NhdGlvbikge1xyXG4gICAgICBjYXNlICdjcHUnOlxyXG4gICAgICBjYXNlICdjcHUtcGlubmVkJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgICBjYXNlICd0ZXh0dXJlJzpcclxuICAgICAgY2FzZSAnZ3B1LWJ1ZmZlcic6IHtcclxuICAgICAgICBpZiAoIXRoaXMuZG93bmxvYWRlcikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgbm90IGNyZWF0ZWQgd2l0aCBhIHNwZWNpZmllZCBkYXRhIGRvd25sb2FkZXIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRG93bmxvYWRpbmcpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZG93bmxvYWRlcigpO1xyXG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnY3B1JztcclxuICAgICAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgaWYgKHJlbGVhc2VEYXRhICYmIHRoaXMuZGlzcG9zZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwb3NlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiBkYXRhO1xyXG5cclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZ2V0IGRhdGEgZnJvbSBsb2NhdGlvbjogJHt0aGlzLmRhdGFMb2NhdGlvbn1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGlzcG9zZXIpIHtcclxuICAgICAgdGhpcy5kaXNwb3NlcigpO1xyXG4gICAgICB0aGlzLmRpc3Bvc2VyID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jcHVEYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5ncHVUZXh0dXJlRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdub25lJztcclxuICB9XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiB0ZW5zb3IgdXRpbGl0aWVzXHJcbiAgcHJpdmF0ZSBlbnN1cmVWYWxpZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmRhdGFMb2NhdGlvbiA9PT0gJ25vbmUnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRlbnNvciBpcyBkaXNwb3NlZC4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2hhcGUoZGltczogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3JJbnRlcmZhY2Uge1xyXG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xyXG4gICAgaWYgKHRoaXMuZG93bmxvYWRlciB8fCB0aGlzLmRpc3Bvc2VyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJlc2hhcGUgYSB0ZW5zb3IgdGhhdCBvd25zIEdQVSByZXNvdXJjZS4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZW5zb3JSZXNoYXBlKHRoaXMsIGRpbXMpO1xyXG4gIH1cclxuICAvLyAjZW5kcmVnaW9uXHJcbn1cclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge1RlbnNvckZhY3Rvcnl9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xyXG5pbXBvcnQge1RlbnNvciBhcyBUZW5zb3JJbXBsfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcclxuaW1wb3J0IHtUeXBlZFRlbnNvclV0aWxzfSBmcm9tICcuL3RlbnNvci11dGlscy5qcyc7XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXHJcblxyXG4vKipcclxuICogcmVwcmVzZW50IGEgYmFzaWMgdGVuc29yIHdpdGggc3BlY2lmaWVkIGRpbWVuc2lvbnMgYW5kIGRhdGEgdHlwZS5cclxuICovXHJcbmludGVyZmFjZSBUeXBlZFRlbnNvckJhc2U8VCBleHRlbmRzIFRlbnNvci5UeXBlPiB7XHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBkaW1lbnNpb25zIG9mIHRoZSB0ZW5zb3IuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICByZWFkb25seSB0eXBlOiBUO1xyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgYnVmZmVyIGRhdGEgb2YgdGhlIHRlbnNvci5cclxuICAgKlxyXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBvbiBDUFUgKGVnLiBpdCdzIGluIHRoZSBmb3JtIG9mIFdlYkdMIHRleHR1cmUgb3IgV2ViR1BVIGJ1ZmZlciksIHRocm93IGVycm9yLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiBUZW5zb3IuRGF0YUxvY2F0aW9uO1xyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgV2ViR0wgdGV4dHVyZSB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cclxuICAgKlxyXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBvbiBHUFUgYXMgV2ViR0wgdGV4dHVyZSwgdGhyb3cgZXJyb3IuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgdGV4dHVyZTogVGVuc29yLlRleHR1cmVUeXBlO1xyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgV2ViR1BVIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cclxuICAgKlxyXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBvbiBHUFUgYXMgV2ViR1BVIGJ1ZmZlciwgdGhyb3cgZXJyb3IuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgZ3B1QnVmZmVyOiBUZW5zb3IuR3B1QnVmZmVyVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGRhdGEgaXMgb24gQ1BVLCByZXR1cm5zIHRoZSBkYXRhIGltbWVkaWF0ZWx5LlxyXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIEdQVSwgZG93bmxvYWRzIHRoZSBkYXRhIGFuZCByZXR1cm5zIHRoZSBwcm9taXNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJlbGVhc2VEYXRhIC0gd2hldGhlciByZWxlYXNlIHRoZSBkYXRhIG9uIEdQVS4gSWdub3JlIGlmIGRhdGEgaXMgYWxyZWFkeSBvbiBDUFUuXHJcbiAgICovXHJcbiAgZ2V0RGF0YShyZWxlYXNlRGF0YT86IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvci5EYXRhVHlwZU1hcFtUXT47XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3Bvc2UgdGhlIHRlbnNvciBkYXRhLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGRhdGEgaXMgb24gQ1BVLCByZW1vdmUgaXRzIGludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgdW5kZXJseWluZyBkYXRhLlxyXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIEdQVSwgcmVsZWFzZSB0aGUgZGF0YSBvbiBHUFUuXHJcbiAgICpcclxuICAgKiBBZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24sIHRoZSB0ZW5zb3IgaXMgY29uc2lkZXJlZCBubyBsb25nZXIgdmFsaWQuIEl0cyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnbm9uZScuXHJcbiAgICovXHJcbiAgZGlzcG9zZSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgVGVuc29yIHtcclxuICBpbnRlcmZhY2UgRGF0YVR5cGVNYXAge1xyXG4gICAgZmxvYXQzMjogRmxvYXQzMkFycmF5O1xyXG4gICAgdWludDg6IFVpbnQ4QXJyYXk7XHJcbiAgICBpbnQ4OiBJbnQ4QXJyYXk7XHJcbiAgICB1aW50MTY6IFVpbnQxNkFycmF5O1xyXG4gICAgaW50MTY6IEludDE2QXJyYXk7XHJcbiAgICBpbnQzMjogSW50MzJBcnJheTtcclxuICAgIGludDY0OiBCaWdJbnQ2NEFycmF5O1xyXG4gICAgc3RyaW5nOiBzdHJpbmdbXTtcclxuICAgIGJvb2w6IFVpbnQ4QXJyYXk7XHJcbiAgICBmbG9hdDE2OiBVaW50MTZBcnJheTsgIC8vIEtlZXAgdXNpbmcgVWludDE2QXJyYXkgdW50aWwgd2UgaGF2ZSBhIGNvbmNyZXRlIHNvbHV0aW9uIGZvciBmbG9hdCAxNi5cclxuICAgIGZsb2F0NjQ6IEZsb2F0NjRBcnJheTtcclxuICAgIHVpbnQzMjogVWludDMyQXJyYXk7XHJcbiAgICB1aW50NjQ6IEJpZ1VpbnQ2NEFycmF5O1xyXG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcclxuICAgIC8vIGNvbXBsZXgxMjg6IG5ldmVyO1xyXG4gICAgLy8gYmZsb2F0MTY6IG5ldmVyO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJmYWNlIEVsZW1lbnRUeXBlTWFwIHtcclxuICAgIGZsb2F0MzI6IG51bWJlcjtcclxuICAgIHVpbnQ4OiBudW1iZXI7XHJcbiAgICBpbnQ4OiBudW1iZXI7XHJcbiAgICB1aW50MTY6IG51bWJlcjtcclxuICAgIGludDE2OiBudW1iZXI7XHJcbiAgICBpbnQzMjogbnVtYmVyO1xyXG4gICAgaW50NjQ6IGJpZ2ludDtcclxuICAgIHN0cmluZzogc3RyaW5nO1xyXG4gICAgYm9vbDogYm9vbGVhbjtcclxuICAgIGZsb2F0MTY6IG51bWJlcjsgIC8vIEtlZXAgdXNpbmcgVWludDE2QXJyYXkgdW50aWwgd2UgaGF2ZSBhIGNvbmNyZXRlIHNvbHV0aW9uIGZvciBmbG9hdCAxNi5cclxuICAgIGZsb2F0NjQ6IG51bWJlcjtcclxuICAgIHVpbnQzMjogbnVtYmVyO1xyXG4gICAgdWludDY0OiBiaWdpbnQ7XHJcbiAgICAvLyBjb21wbGV4NjQ6IG5ldmVyO1xyXG4gICAgLy8gY29tcGxleDEyODogbmV2ZXI7XHJcbiAgICAvLyBiZmxvYXQxNjogbmV2ZXI7XHJcbiAgfVxyXG5cclxuICB0eXBlIERhdGFUeXBlID0gRGF0YVR5cGVNYXBbVHlwZV07XHJcbiAgdHlwZSBFbGVtZW50VHlwZSA9IEVsZW1lbnRUeXBlTWFwW1R5cGVdO1xyXG5cclxuICAvKipcclxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBwaW5uZWQgQ1BVIGJ1ZmZlclxyXG4gICAqL1xyXG4gIGV4cG9ydCB0eXBlIENwdVBpbm5lZERhdGFUeXBlcyA9IEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR0wgdGV4dHVyZVxyXG4gICAqL1xyXG4gIGV4cG9ydCB0eXBlIFRleHR1cmVUeXBlID0gV2ViR0xUZXh0dXJlO1xyXG5cclxuICAvKipcclxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXHJcbiAgICovXHJcbiAgZXhwb3J0IHR5cGUgVGV4dHVyZURhdGFUeXBlcyA9ICdmbG9hdDMyJztcclxuXHJcbiAgLyoqXHJcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR1BVIGJ1ZmZlclxyXG4gICAqXHJcbiAgICogVGhlIHJlYXNvbiB3aHkgd2UgZG9uJ3QgdXNlIHR5cGUgXCJHUFVCdWZmZXJcIiBkZWZpbmVkIGluIHdlYmdwdS5kLnRzIGZyb20gQHdlYmdwdS90eXBlcyBpcyBiZWNhdXNlIFwiQHdlYmdwdS90eXBlc1wiXHJcbiAgICogcmVxdWlyZXMgXCJAdHlwZXMvZG9tLXdlYmNvZGVjc1wiIGFzIHBlZXIgZGVwZW5kZW5jeSB3aGVuIHVzaW5nIFR5cGVTY3JpcHQgPCB2NS4xIGFuZCBpdHMgdmVyc2lvbiBuZWVkIHRvIGJlIGNob3NlblxyXG4gICAqIGNhcmVmdWxseSBhY2NvcmRpbmcgdG8gdGhlIFR5cGVTY3JpcHQgdmVyc2lvbiBiZWluZyB1c2VkLiBUaGlzIG1lYW5zIHNvIGZhciB0aGVyZSBpcyBub3QgYSB3YXkgdG8ga2VlcCBldmVyeVxyXG4gICAqIFR5cGVTY3JpcHQgdmVyc2lvbiBoYXBweS4gSXQgdHVybnMgb3V0IHRoYXQgd2Ugd2lsbCBlYXNpbHkgYnJva2UgdXNlcnMgb24gc29tZSBUeXBlU2NyaXB0IHZlcnNpb24uXHJcbiAgICpcclxuICAgKiBmb3IgbW9yZSBpbmZvIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3B1d2ViL3R5cGVzL2lzc3Vlcy8xMjdcclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJUeXBlID0ge3NpemU6IG51bWJlcjsgbWFwU3RhdGU6ICd1bm1hcHBlZCcgfCAncGVuZGluZycgfCAnbWFwcGVkJ307XHJcblxyXG4gIC8qKlxyXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJEYXRhVHlwZXMgPSAnZmxvYXQzMid8J2Zsb2F0MTYnfCdpbnQzMid8J2ludDY0J3wndWludDMyJ3wndWludDgnfCdib29sJztcclxuXHJcbiAgLyoqXHJcbiAgICogcmVwcmVzZW50IHdoZXJlIHRoZSB0ZW5zb3IgZGF0YSBpcyBzdG9yZWRcclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBEYXRhTG9jYXRpb24gPSAnbm9uZSd8J2NwdSd8J2NwdS1waW5uZWQnfCd0ZXh0dXJlJ3wnZ3B1LWJ1ZmZlcic7XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlcHJlc2VudCB0aGUgZGF0YSB0eXBlIG9mIGEgdGVuc29yXHJcbiAgICovXHJcbiAgZXhwb3J0IHR5cGUgVHlwZSA9IGtleW9mIERhdGFUeXBlTWFwO1xyXG59XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50IG11bHRpLWRpbWVuc2lvbmFsIGFycmF5cyB0byBmZWVkIHRvIG9yIGZldGNoIGZyb20gbW9kZWwgaW5mZXJlbmNpbmcuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVkVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4gZXh0ZW5kcyBUeXBlZFRlbnNvckJhc2U8VD4sIFR5cGVkVGVuc29yVXRpbHM8VD4ge31cclxuLyoqXHJcbiAqIFJlcHJlc2VudCBtdWx0aS1kaW1lbnNpb25hbCBhcnJheXMgdG8gZmVlZCB0byBvciBmZXRjaCBmcm9tIG1vZGVsIGluZmVyZW5jaW5nLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3IgZXh0ZW5kcyBUeXBlZFRlbnNvckJhc2U8VGVuc29yLlR5cGU+LCBUeXBlZFRlbnNvclV0aWxzPFRlbnNvci5UeXBlPiB7fVxyXG5cclxuLyoqXHJcbiAqIHR5cGUgVGVuc29yQ29uc3RydWN0b3IgZGVmaW5lcyB0aGUgY29uc3RydWN0b3JzIG9mICdUZW5zb3InIHRvIGNyZWF0ZSBDUFUgdGVuc29yIGluc3RhbmNlcy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yQ29uc3RydWN0b3IgZXh0ZW5kcyBUZW5zb3JGYWN0b3J5IHtcclxuICAvLyAjcmVnaW9uIENQVSB0ZW5zb3IgLSBzcGVjaWZ5IGVsZW1lbnQgdHlwZVxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3KHR5cGU6ICdzdHJpbmcnLCBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ3N0cmluZyddfHJlYWRvbmx5IHN0cmluZ1tdLFxyXG4gICAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyh0eXBlOiAnYm9vbCcsIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFsnYm9vbCddfHJlYWRvbmx5IGJvb2xlYW5bXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IDY0LWJpdCBpbnRlZ2VyIHR5cGVkIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldzxUIGV4dGVuZHMgJ3VpbnQ2NCd8J2ludDY0Jz4oXHJcbiAgICAgIHR5cGU6IFQsIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXXxyZWFkb25seSBiaWdpbnRbXXxyZWFkb25seSBudW1iZXJbXSxcclxuICAgICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8VD47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBudW1lcmljIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldzxUIGV4dGVuZHMgRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZyd8J2Jvb2wnfCd1aW50NjQnfCdpbnQ2NCc+PihcclxuICAgICAgdHlwZTogVCwgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdfHJlYWRvbmx5IG51bWJlcltdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjxUPjtcclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGluZmVyIGVsZW1lbnQgdHlwZXNcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3KGRhdGE6IEZsb2F0MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3KGRhdGE6IEludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDgnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyhkYXRhOiBVaW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDgnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcoZGF0YTogVWludDE2QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50MTYnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDE2IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyhkYXRhOiBJbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50MTYnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDMyIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyhkYXRhOiBJbnQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50MzInPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyhkYXRhOiBCaWdJbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50NjQnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHN0cmluZyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcoZGF0YTogcmVhZG9ubHkgc3RyaW5nW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdzdHJpbmcnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGJvb2wgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3KGRhdGE6IHJlYWRvbmx5IGJvb2xlYW5bXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3KGRhdGE6IEZsb2F0NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0NjQnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcoZGF0YTogVWludDMyQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50MzInPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcoZGF0YTogQmlnVWludDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50NjQnPjtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIENQVSB0ZW5zb3IgLSBmYWxsIGJhY2sgdG8gbm9uLWdlbmVyaWMgdGVuc29yIHR5cGUgZGVjbGFyYXRpb25cclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyh0eXBlOiBUZW5zb3IuVHlwZSwgZGF0YTogVGVuc29yLkRhdGFUeXBlfHJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IHN0cmluZ1tdfHJlYWRvbmx5IGJpZ2ludFtdfHJlYWRvbmx5IGJvb2xlYW5bXSxcclxuICAgICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yO1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3KGRhdGE6IFRlbnNvci5EYXRhVHlwZSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yO1xyXG4gIC8vICNlbmRyZWdpb25cclxufVxyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY29uc3QgVGVuc29yID0gVGVuc29ySW1wbCBhcyBUZW5zb3JDb25zdHJ1Y3RvcjtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge2Vudn0gZnJvbSAnLi9lbnYtaW1wbC5qcyc7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRSQUNFID0gKGRldmljZVR5cGU6IHN0cmluZywgbGFiZWw6IHN0cmluZykgPT4ge1xyXG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICBjb25zb2xlLnRpbWVTdGFtcChgJHtkZXZpY2VUeXBlfTo6T1JUOjoke2xhYmVsfWApO1xyXG59O1xyXG5cclxuY29uc3QgVFJBQ0VfRlVOQyA9IChtc2c6IHN0cmluZywgZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcclxuICBjb25zdCBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdCgvXFxyXFxufFxccnxcXG4vZykgfHwgW107XHJcbiAgbGV0IGhhc1RyYWNlRnVuYyA9IGZhbHNlO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChoYXNUcmFjZUZ1bmMgJiYgIXN0YWNrW2ldLmluY2x1ZGVzKCdUUkFDRV9GVU5DJykpIHtcclxuICAgICAgbGV0IGxhYmVsID0gYEZVTkNfJHttc2d9Ojoke3N0YWNrW2ldLnRyaW0oKS5zcGxpdCgnICcpWzFdfWA7XHJcbiAgICAgIGlmIChleHRyYU1zZykge1xyXG4gICAgICAgIGxhYmVsICs9IGA6OiR7ZXh0cmFNc2d9YDtcclxuICAgICAgfVxyXG4gICAgICBUUkFDRSgnQ1BVJywgbGFiZWwpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc3RhY2tbaV0uaW5jbHVkZXMoJ1RSQUNFX0ZVTkMnKSkge1xyXG4gICAgICBoYXNUcmFjZUZ1bmMgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgVFJBQ0VfRlVOQ19CRUdJTiA9IChleHRyYU1zZz86IHN0cmluZykgPT4ge1xyXG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgVFJBQ0VfRlVOQygnQkVHSU4nLCBleHRyYU1zZyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRSQUNFX0ZVTkNfRU5EID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBlbnYudHJhY2UgPT09ICd1bmRlZmluZWQnID8gIWVudi53YXNtLnRyYWNlIDogIWVudi50cmFjZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBUUkFDRV9GVU5DKCdFTkQnLCBleHRyYU1zZyk7XHJcbn07XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHtyZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVyc30gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xyXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb25IYW5kbGVyfSBmcm9tICcuL2JhY2tlbmQuanMnO1xyXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZX0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XHJcbmltcG9ydCB7T25ueFZhbHVlfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xyXG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnLi90ZW5zb3IuanMnO1xyXG5pbXBvcnQge1RSQUNFX0ZVTkNfQkVHSU4sIFRSQUNFX0ZVTkNfRU5EfSBmcm9tICcuL3RyYWNlLmpzJztcclxuXHJcbnR5cGUgU2Vzc2lvbk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlNlc3Npb25PcHRpb25zO1xyXG50eXBlIFJ1bk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlJ1bk9wdGlvbnM7XHJcbnR5cGUgRmVlZHNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5GZWVkc1R5cGU7XHJcbnR5cGUgRmV0Y2hlc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLkZldGNoZXNUeXBlO1xyXG50eXBlIFJldHVyblR5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlJldHVyblR5cGU7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5mZXJlbmNlU2Vzc2lvbiBpbXBsZW1lbnRzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2Uge1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoaGFuZGxlcjogSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIpIHtcclxuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgfVxyXG4gIHJ1bihmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XHJcbiAgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIGZldGNoZXM6IEZldGNoZXNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XHJcbiAgYXN5bmMgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xyXG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xyXG4gICAgY29uc3QgZmV0Y2hlczoge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV8bnVsbH0gPSB7fTtcclxuICAgIGxldCBvcHRpb25zOiBSdW5PcHRpb25zID0ge307XHJcbiAgICAvLyBjaGVjayBpbnB1dHNcclxuICAgIGlmICh0eXBlb2YgZmVlZHMgIT09ICdvYmplY3QnIHx8IGZlZWRzID09PSBudWxsIHx8IGZlZWRzIGluc3RhbmNlb2YgVGVuc29yIHx8IEFycmF5LmlzQXJyYXkoZmVlZHMpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICAnXFwnZmVlZHNcXCcgbXVzdCBiZSBhbiBvYmplY3QgdGhhdCB1c2UgaW5wdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpc0ZldGNoZXNFbXB0eSA9IHRydWU7XHJcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggb3ZlcnJpZGUgaXMgYmVpbmcgdXNlZFxyXG4gICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoYXJnMSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IGNhbm5vdCBiZSBudWxsLicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChhcmcxIGluc3RhbmNlb2YgVGVuc29yKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBjYW5ub3QgYmUgYSBUZW5zb3InKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcclxuICAgICAgICBpZiAoYXJnMS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2ZldGNoZXNcXCcgY2Fubm90IGJlIGFuIGVtcHR5IGFycmF5LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIG91dHB1dCBuYW1lc1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBhcmcxKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2ZldGNoZXNcXCcgbXVzdCBiZSBhIHN0cmluZyBhcnJheSBvciBhbiBvYmplY3QuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5vdXRwdXROYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2ZldGNoZXMnIGNvbnRhaW5zIGludmFsaWQgb3V0cHV0IG5hbWU6ICR7bmFtZX0uYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGRlY2lkZSB3aGV0aGVyIGFyZzEgaXMgZmV0Y2hlcyBvciBvcHRpb25zXHJcbiAgICAgICAgLy8gaWYgYW55IG91dHB1dCBuYW1lIGlzIHByZXNlbnQgYW5kIGl0cyB2YWx1ZSBpcyB2YWxpZCBPbm54VmFsdWUsIHdlIGNvbnNpZGVyIGl0IGZldGNoZXNcclxuICAgICAgICBsZXQgaXNGZXRjaGVzID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgYXJnMUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmcxKTtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xyXG4gICAgICAgICAgaWYgKGFyZzFLZXlzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHYgPSAoYXJnMSBhcyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLk51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSlbbmFtZV07XHJcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsIHx8IHYgaW5zdGFuY2VvZiBUZW5zb3IpIHtcclxuICAgICAgICAgICAgICBpc0ZldGNoZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0ZldGNoZXMpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gYXJnMjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9wdGlvbnMgPSBhcmcxIGFzIFJ1bk9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBtdXN0IGJlIFxcJ2ZldGNoZXNcXCcgb3IgXFwnb3B0aW9uc1xcJy4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBpZiBhbGwgaW5wdXRzIGFyZSBpbiBmZWVkXHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5pbnB1dE5hbWVzKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgZmVlZHNbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCAnJHtuYW1lfScgaXMgbWlzc2luZyBpbiAnZmVlZHMnLmApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxyXG4gICAgaWYgKGlzRmV0Y2hlc0VtcHR5KSB7XHJcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLm91dHB1dE5hbWVzKSB7XHJcbiAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmZWVkcywgZmV0Y2hlcyBhbmQgb3B0aW9ucyBhcmUgcHJlcGFyZWRcclxuXHJcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bihmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XHJcbiAgICBjb25zdCByZXR1cm5WYWx1ZToge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV9ID0ge307XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByZXN1bHRzKSB7XHJcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHRzLCBrZXkpKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1trZXldO1xyXG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBUZW5zb3IpIHtcclxuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSByZXN1bHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSBuZXcgVGVuc29yKHJlc3VsdC50eXBlLCByZXN1bHQuZGF0YSwgcmVzdWx0LmRpbXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcclxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmRpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGUocGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xyXG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XHJcbiAgc3RhdGljIGNyZWF0ZShidWZmZXI6IEFycmF5QnVmZmVyTGlrZSwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoPzogbnVtYmVyLCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOlxyXG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xyXG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBVaW50OEFycmF5LCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xyXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUoXHJcbiAgICAgIGFyZzA6IHN0cmluZ3xBcnJheUJ1ZmZlckxpa2V8VWludDhBcnJheSwgYXJnMT86IFNlc3Npb25PcHRpb25zfG51bWJlciwgYXJnMj86IG51bWJlcixcclxuICAgICAgYXJnMz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPiB7XHJcbiAgICBUUkFDRV9GVU5DX0JFR0lOKCk7XHJcbiAgICAvLyBlaXRoZXIgbG9hZCBmcm9tIGEgZmlsZSBvciBidWZmZXJcclxuICAgIGxldCBmaWxlUGF0aE9yVWludDhBcnJheTogc3RyaW5nfFVpbnQ4QXJyYXk7XHJcbiAgICBsZXQgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMgPSB7fTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcclxuICAgICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0JyAmJiBhcmcxICE9PSBudWxsKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IGFyZzE7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChhcmcwIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IGFyZzA7XHJcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBhcmcxO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ29wdGlvbnNcXCcgbXVzdCBiZSBhbiBvYmplY3QuJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgYXJnMCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8XHJcbiAgICAgICAgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgYXJnMCBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyKSkge1xyXG4gICAgICBjb25zdCBidWZmZXIgPSBhcmcwO1xyXG4gICAgICBsZXQgYnl0ZU9mZnNldCA9IDA7XHJcbiAgICAgIGxldCBieXRlTGVuZ3RoID0gYXJnMC5ieXRlTGVuZ3RoO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcclxuICAgICAgICBvcHRpb25zID0gYXJnMTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBieXRlT2Zmc2V0ID0gYXJnMTtcclxuICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVPZmZzZXQpKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnYnl0ZU9mZnNldFxcJyBtdXN0IGJlIGFuIGludGVnZXIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBieXRlT2Zmc2V0ID49IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2J5dGVPZmZzZXQnIGlzIG91dCBvZiByYW5nZSBbMCwgJHtidWZmZXIuYnl0ZUxlbmd0aH0pLmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBieXRlTGVuZ3RoID0gYXJnMC5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldDtcclxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICBieXRlTGVuZ3RoID0gYXJnMjtcclxuICAgICAgICAgIGlmICghTnVtYmVyLmlzU2FmZUludGVnZXIoYnl0ZUxlbmd0aCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2J5dGVMZW5ndGhcXCcgbXVzdCBiZSBhbiBpbnRlZ2VyLicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGJ5dGVMZW5ndGggPD0gMCB8fCBieXRlT2Zmc2V0ICsgYnl0ZUxlbmd0aCA+IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZUxlbmd0aCcgaXMgb3V0IG9mIHJhbmdlICgwLCAke2J1ZmZlci5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldH1dLmApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmczID09PSAnb2JqZWN0JyAmJiBhcmczICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmczO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnYnl0ZUxlbmd0aFxcJyBtdXN0IGJlIGEgbnVtYmVyLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xyXG4gICAgICB9XHJcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMF06IG11c3QgYmUgXFwncGF0aFxcJyBvciBcXCdidWZmZXJcXCcuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVzb2x2ZSBiYWNrZW5kLCB1cGRhdGUgc2Vzc2lvbiBvcHRpb25zIHdpdGggdmFsaWRhdGVkIEVQcywgYW5kIGNyZWF0ZSBzZXNzaW9uIGhhbmRsZXJcclxuICAgIGNvbnN0IFtiYWNrZW5kLCBvcHRpb25zV2l0aFZhbGlkYXRlZEVQc10gPSBhd2FpdCByZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVycyhvcHRpb25zKTtcclxuICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKGZpbGVQYXRoT3JVaW50OEFycmF5LCBvcHRpb25zV2l0aFZhbGlkYXRlZEVQcyk7XHJcbiAgICBUUkFDRV9GVU5DX0VORCgpO1xyXG4gICAgcmV0dXJuIG5ldyBJbmZlcmVuY2VTZXNzaW9uKGhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZCB7XHJcbiAgICB0aGlzLmhhbmRsZXIuc3RhcnRQcm9maWxpbmcoKTtcclxuICB9XHJcbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQge1xyXG4gICAgdGhpcy5oYW5kbGVyLmVuZFByb2ZpbGluZygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlucHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE5hbWVzO1xyXG4gIH1cclxuICBnZXQgb3V0cHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5vdXRwdXROYW1lcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlcjogSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI7XHJcbn1cclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbkltcGx9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24taW1wbC5qcyc7XHJcbmltcG9ydCB7T25ueE1vZGVsT3B0aW9uc30gZnJvbSAnLi9vbm54LW1vZGVsLmpzJztcclxuaW1wb3J0IHtPbm54VmFsdWUsIE9ubnhWYWx1ZURhdGFMb2NhdGlvbn0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cclxuXHJcbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcclxuICAvLyAjcmVnaW9uIGlucHV0L291dHB1dCB0eXBlc1xyXG5cclxuICB0eXBlIE9ubnhWYWx1ZU1hcFR5cGUgPSB7cmVhZG9ubHkgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX07XHJcbiAgdHlwZSBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUgPSB7cmVhZG9ubHkgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGx9O1xyXG5cclxuICAvKipcclxuICAgKiBBIGZlZWRzIChtb2RlbCBpbnB1dHMpIGlzIGFuIG9iamVjdCB0aGF0IHVzZXMgaW5wdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxyXG4gICAqL1xyXG4gIHR5cGUgRmVlZHNUeXBlID0gT25ueFZhbHVlTWFwVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmZXRjaGVzIChtb2RlbCBvdXRwdXRzKSBjb3VsZCBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZzpcclxuICAgKlxyXG4gICAqIC0gT21pdHRlZC4gVXNlIG1vZGVsJ3Mgb3V0cHV0IG5hbWVzIGRlZmluaXRpb24uXHJcbiAgICogLSBBbiBhcnJheSBvZiBzdHJpbmcgaW5kaWNhdGluZyB0aGUgb3V0cHV0IG5hbWVzLlxyXG4gICAqIC0gQW4gb2JqZWN0IHRoYXQgdXNlIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgb3IgbnVsbCBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cclxuICAgKlxyXG4gICAqIEByZW1hcmtcclxuICAgKiBkaWZmZXJlbnQgZnJvbSBpbnB1dCBhcmd1bWVudCwgaW4gb3V0cHV0LCBPbm54VmFsdWUgaXMgb3B0aW9uYWwuIElmIGFuIE9ubnhWYWx1ZSBpcyBwcmVzZW50IGl0IHdpbGwgYmVcclxuICAgKiB1c2VkIGFzIGEgcHJlLWFsbG9jYXRlZCB2YWx1ZSBieSB0aGUgaW5mZXJlbmNlIGVuZ2luZTsgaWYgb21pdHRlZCwgaW5mZXJlbmNlIGVuZ2luZSB3aWxsIGFsbG9jYXRlIGJ1ZmZlclxyXG4gICAqIGludGVybmFsbHkuXHJcbiAgICovXHJcbiAgdHlwZSBGZXRjaGVzVHlwZSA9IHJlYWRvbmx5IHN0cmluZ1tdfE51bGxhYmxlT25ueFZhbHVlTWFwVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBpbmZlcmVuY2luZyByZXR1cm4gdHlwZSBpcyBhbiBvYmplY3QgdGhhdCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXHJcbiAgICovXHJcbiAgdHlwZSBSZXR1cm5UeXBlID0gT25ueFZhbHVlTWFwVHlwZTtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIHNlc3Npb24gb3B0aW9uc1xyXG5cclxuICAvKipcclxuICAgKiBBIHNldCBvZiBjb25maWd1cmF0aW9ucyBmb3Igc2Vzc2lvbiBiZWhhdmlvci5cclxuICAgKi9cclxuICBleHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIGV4dGVuZHMgT25ueE1vZGVsT3B0aW9ucyB7XHJcbiAgICAvKipcclxuICAgICAqIEFuIGFycmF5IG9mIGV4ZWN1dGlvbiBwcm92aWRlciBvcHRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEFuIGV4ZWN1dGlvbiBwcm92aWRlciBvcHRpb24gY2FuIGJlIGEgc3RyaW5nIGluZGljYXRpbmcgdGhlIG5hbWUgb2YgdGhlIGV4ZWN1dGlvbiBwcm92aWRlcixcclxuICAgICAqIG9yIGFuIG9iamVjdCBvZiBjb3JyZXNwb25kaW5nIHR5cGUuXHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGlvblByb3ZpZGVycz86IHJlYWRvbmx5IEV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaW50cmEgT1AgdGhyZWFkcyBudW1iZXIuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkuXHJcbiAgICAgKi9cclxuICAgIGludHJhT3BOdW1UaHJlYWRzPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGludGVyIE9QIHRocmVhZHMgbnVtYmVyLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxyXG4gICAgICovXHJcbiAgICBpbnRlck9wTnVtVGhyZWFkcz86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZS5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXHJcbiAgICAgKi9cclxuICAgIGZyZWVEaW1lbnNpb25PdmVycmlkZXM/OiB7cmVhZG9ubHkgW2RpbWVuc2lvbk5hbWU6IHN0cmluZ106IG51bWJlcn07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3B0aW1pemF0aW9uIGxldmVsLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbD86ICdkaXNhYmxlZCd8J2Jhc2ljJ3wnZXh0ZW5kZWQnfCdhbGwnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciBlbmFibGUgQ1BVIG1lbW9yeSBhcmVuYS5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZUNwdU1lbUFyZW5hPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgZW5hYmxlIG1lbW9yeSBwYXR0ZXJuLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgZW5hYmxlTWVtUGF0dGVybj86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRpb24gbW9kZS5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXHJcbiAgICAgKi9cclxuICAgIGV4ZWN1dGlvbk1vZGU/OiAnc2VxdWVudGlhbCd8J3BhcmFsbGVsJztcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wdGltaXplZCBtb2RlbCBmaWxlIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogSWYgdGhpcyBzZXR0aW5nIGlzIHNwZWNpZmllZCwgdGhlIG9wdGltaXplZCBtb2RlbCB3aWxsIGJlIGR1bXBlZC4gSW4gYnJvd3NlciwgYSBibG9iIHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogd2l0aCBhIHBvcC11cCB3aW5kb3cuXHJcbiAgICAgKi9cclxuICAgIG9wdGltaXplZE1vZGVsRmlsZVBhdGg/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBwcm9maWxpbmcuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGEgcGxhY2Vob2xkZXIgZm9yIGEgZnV0dXJlIHVzZS5cclxuICAgICAqL1xyXG4gICAgZW5hYmxlUHJvZmlsaW5nPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGUgcHJlZml4IGZvciBwcm9maWxpbmcuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGEgcGxhY2Vob2xkZXIgZm9yIGEgZnV0dXJlIHVzZS5cclxuICAgICAqL1xyXG4gICAgcHJvZmlsZUZpbGVQcmVmaXg/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2cgSUQuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxyXG4gICAgICovXHJcbiAgICBsb2dJZD86IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXHJcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgbG9nU2V2ZXJpdHlMZXZlbD86IDB8MXwyfDN8NDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxyXG4gICAgICovXHJcbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgc3RyaW5nIGFzIGEgcHJlZmVycmVkIGRhdGEgbG9jYXRpb24gZm9yIGFsbCBvdXRwdXRzLCBvciBhbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIGFcclxuICAgICAqIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSBXZWIgZm9yIFdlYkdMIGFuZCBXZWJHUFUgRVAuXHJcbiAgICAgKi9cclxuICAgIHByZWZlcnJlZE91dHB1dExvY2F0aW9uPzogT25ueFZhbHVlRGF0YUxvY2F0aW9ufHtyZWFkb25seSBbb3V0cHV0TmFtZTogc3RyaW5nXTogT25ueFZhbHVlRGF0YUxvY2F0aW9ufTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgZW5hYmxlIGdyYXBoIGNhcHR1cmUuXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgV2ViIGZvciBXZWJHUFUgRVAuXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZUdyYXBoQ2FwdHVyZT86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZSBjb25maWd1cmF0aW9ucyBmb3IgYSBzZXNzaW9uLiBTZWVcclxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9zZXNzaW9uL1xyXG4gICAgICogb25ueHJ1bnRpbWVfc2Vzc2lvbl9vcHRpb25zX2NvbmZpZ19rZXlzLmhcclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGBgYGpzXHJcbiAgICAgKiBleHRyYToge1xyXG4gICAgICogICBzZXNzaW9uOiB7XHJcbiAgICAgKiAgICAgc2V0X2Rlbm9ybWFsX2FzX3plcm86IFwiMVwiLFxyXG4gICAgICogICAgIGRpc2FibGVfcHJlcGFja2luZzogXCIxXCJcclxuICAgICAqICAgfSxcclxuICAgICAqICAgb3B0aW1pemF0aW9uOiB7XHJcbiAgICAgKiAgICAgZW5hYmxlX2dlbHVfYXBwcm94aW1hdGlvbjogXCIxXCJcclxuICAgICAqICAgfVxyXG4gICAgICogfVxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIGV4dHJhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbiAgfVxyXG5cclxuICAvLyAjcmVnaW9uIGV4ZWN1dGlvbiBwcm92aWRlcnNcclxuXHJcbiAgLy8gQ3VycmVudGx5LCB3ZSBoYXZlIHRoZSBmb2xsb3dpbmcgYmFja2VuZHMgdG8gc3VwcG9ydCBleGVjdXRpb24gcHJvdmlkZXJzOlxyXG4gIC8vIEJhY2tlbmQgTm9kZS5qcyBiaW5kaW5nOiBzdXBwb3J0cyAnY3B1JywgJ2RtbCcgKHdpbjMyKSwgJ2NvcmVtbCcgKG1hY09TKSBhbmQgJ2N1ZGEnIChsaW51eCkuXHJcbiAgLy8gQmFja2VuZCBXZWJBc3NlbWJseTogc3VwcG9ydHMgJ2NwdScsICd3YXNtJywgJ3dlYmdwdScgYW5kICd3ZWJubicuXHJcbiAgLy8gQmFja2VuZCBPTk5YLmpzOiBzdXBwb3J0cyAnd2ViZ2wnLlxyXG4gIC8vIEJhY2tlbmQgUmVhY3QgTmF0aXZlOiBzdXBwb3J0cyAnY3B1JywgJ3hubnBhY2snLCAnY29yZW1sJyAoaU9TKSwgJ25uYXBpJyAoQW5kcm9pZCkuXHJcbiAgaW50ZXJmYWNlIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwIHtcclxuICAgIGNvcmVtbDogQ29yZU1MRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XHJcbiAgICBjcHU6IENwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgY3VkYTogQ3VkYUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgZG1sOiBEbWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIG5uYXBpOiBObmFwaUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgdGVuc29ycnQ6IFRlbnNvclJ0RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XHJcbiAgICB3YXNtOiBXZWJBc3NlbWJseUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgd2ViZ2w6IFdlYkdMRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XHJcbiAgICB3ZWJncHU6IFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgd2Vibm46IFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XHJcbiAgICBxbm46IFFubkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgeG5ucGFjazogWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gIH1cclxuXHJcbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlck5hbWUgPSBrZXlvZiBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcDtcclxuICB0eXBlIEV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnID1cclxuICAgICAgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25NYXBbRXhlY3V0aW9uUHJvdmlkZXJOYW1lXXxFeGVjdXRpb25Qcm92aWRlck9wdGlvbnxFeGVjdXRpb25Qcm92aWRlck5hbWV8c3RyaW5nO1xyXG5cclxuICBleHBvcnQgaW50ZXJmYWNlIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBDcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6ICdjcHUnO1xyXG4gICAgdXNlQXJlbmE/OiBib29sZWFuO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6ICdjdWRhJztcclxuICAgIGRldmljZUlkPzogbnVtYmVyO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIERtbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ2RtbCc7XHJcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBUZW5zb3JSdEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3RlbnNvcnJ0JztcclxuICAgIGRldmljZUlkPzogbnVtYmVyO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAnd2FzbSc7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJnbCc7XHJcbiAgICAvLyBUT0RPOiBhZGQgZmxhZ3NcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBYbm5wYWNrRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAneG5ucGFjayc7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAnd2ViZ3B1JztcclxuICAgIHByZWZlcnJlZExheW91dD86ICdOQ0hXJ3wnTkhXQyc7XHJcbiAgfVxyXG5cclxuICAvLyAjcmVnaW9uIFdlYk5OIG9wdGlvbnNcclxuXHJcbiAgaW50ZXJmYWNlIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3dlYm5uJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBXZWJOTiBNTENvbnRleHQuXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJubi8jZGljdGRlZi1tbGNvbnRleHRvcHRpb25zXHJcbiAgICovXHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTkNvbnRleHRPcHRpb25zIHtcclxuICAgIGRldmljZVR5cGU/OiAnY3B1J3wnZ3B1J3wnbnB1JztcclxuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XHJcbiAgICBwb3dlclByZWZlcmVuY2U/OiAnZGVmYXVsdCd8J2xvdy1wb3dlcid8J2hpZ2gtcGVyZm9ybWFuY2UnO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aG91dCBNTENvbnRleHQuXHJcbiAgICovXHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTk9wdGlvbnNXaXRob3V0TUxDb250ZXh0IGV4dGVuZHMgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUsIFdlYk5OQ29udGV4dE9wdGlvbnMge1xyXG4gICAgY29udGV4dD86IG5ldmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aCBNTENvbnRleHQuXHJcbiAgICpcclxuICAgKiBXaGVuIE1MQ29udGV4dCBpcyBwcm92aWRlZCwgdGhlIGRldmljZVR5cGUgaXMgYWxzbyByZXF1aXJlZCBzbyB0aGF0IHRoZSBXZWJOTiBFUCBjYW4gZGV0ZXJtaW5lIHRoZSBwcmVmZXJyZWRcclxuICAgKiBjaGFubmVsIGxheW91dC5cclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dFxyXG4gICAqL1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCBleHRlbmRzIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9taXQ8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXF1aXJlZDxQaWNrPFdlYk5OQ29udGV4dE9wdGlvbnMsICdkZXZpY2VUeXBlJz4+IHtcclxuICAgIGNvbnRleHQ6IHVua25vd24gLyogTUxDb250ZXh0ICovO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aCBNTENvbnRleHQgd2hpY2ggaXMgY3JlYXRlZCBmcm9tIEdQVURldmljZS5cclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dC1ncHVkZXZpY2VcclxuICAgKi9cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYk5OT3B0aW9uc1dlYkdwdSBleHRlbmRzIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lIHtcclxuICAgIGNvbnRleHQ6IHVua25vd24gLyogTUxDb250ZXh0ICovO1xyXG4gICAgZ3B1RGV2aWNlOiB1bmtub3duIC8qIEdQVURldmljZSAqLztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wdGlvbnMgZm9yIFdlYk5OIGV4ZWN1dGlvbiBwcm92aWRlci5cclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uID0gV2ViTk5PcHRpb25zV2l0aG91dE1MQ29udGV4dHxXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0fFdlYk5OT3B0aW9uc1dlYkdwdTtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICBleHBvcnQgaW50ZXJmYWNlIFFubkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3Fubic7XHJcbiAgICAvLyBUT0RPIGFkZCBmbGFnc1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ2NvcmVtbCc7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBiaXQgZmxhZ3MgZm9yIENvcmVNTCBleGVjdXRpb24gcHJvdmlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogYGBgXHJcbiAgICAgKiBDT1JFTUxfRkxBR19VU0VfQ1BVX09OTFkgPSAweDAwMVxyXG4gICAgICogQ09SRU1MX0ZMQUdfRU5BQkxFX09OX1NVQkdSQVBIID0gMHgwMDJcclxuICAgICAqIENPUkVNTF9GTEFHX09OTFlfRU5BQkxFX0RFVklDRV9XSVRIX0FORSA9IDB4MDA0XHJcbiAgICAgKiBDT1JFTUxfRkxBR19PTkxZX0FMTE9XX1NUQVRJQ19JTlBVVF9TSEFQRVMgPSAweDAwOFxyXG4gICAgICogQ09SRU1MX0ZMQUdfQ1JFQVRFX01MUFJPR1JBTSA9IDB4MDEwXHJcbiAgICAgKiBgYGBcclxuICAgICAqXHJcbiAgICAgKiBTZWUgaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Byb3ZpZGVycy9jb3JlbWwvY29yZW1sX3Byb3ZpZGVyX2ZhY3RvcnkuaCBmb3IgbW9yZSBkZXRhaWxzLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgZmxhZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nKS5cclxuICAgICAqL1xyXG4gICAgY29yZU1sRmxhZ3M/OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byB1c2UgQ1BVIG9ubHkgaW4gQ29yZU1MIEVQLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAocmVhY3QtbmF0aXZlKS5cclxuICAgICAqL1xyXG4gICAgdXNlQ1BVT25seT86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byBlbmFibGUgQ29yZU1MIEVQIG9uIHN1YmdyYXBoLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAocmVhY3QtbmF0aXZlKS5cclxuICAgICAqL1xyXG4gICAgZW5hYmxlT25TdWJncmFwaD86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byBvbmx5IGVuYWJsZSBDb3JlTUwgRVAgZm9yIEFwcGxlIGRldmljZXMgd2l0aCBBTkUgKEFwcGxlIE5ldXJhbCBFbmdpbmUpLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAocmVhY3QtbmF0aXZlKS5cclxuICAgICAqL1xyXG4gICAgb25seUVuYWJsZURldmljZVdpdGhBTkU/OiBib29sZWFuO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAnbm5hcGknO1xyXG4gICAgdXNlRlAxNj86IGJvb2xlYW47XHJcbiAgICB1c2VOQ0hXPzogYm9vbGVhbjtcclxuICAgIGNwdURpc2FibGVkPzogYm9vbGVhbjtcclxuICAgIGNwdU9ubHk/OiBib29sZWFuO1xyXG4gIH1cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBydW4gb3B0aW9uc1xyXG5cclxuICAvKipcclxuICAgKiBBIHNldCBvZiBjb25maWd1cmF0aW9ucyBmb3IgaW5mZXJlbmNlIHJ1biBiZWhhdmlvclxyXG4gICAqL1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgUnVuT3B0aW9ucyB7XHJcbiAgICAvKipcclxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXHJcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgbG9nU2V2ZXJpdHlMZXZlbD86IDB8MXwyfDN8NDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxyXG4gICAgICovXHJcbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlcm1pbmF0ZSBhbGwgaW5jb21wbGV0ZSBPcnRSdW4gY2FsbHMgYXMgc29vbiBhcyBwb3NzaWJsZSBpZiB0cnVlXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxyXG4gICAgICovXHJcbiAgICB0ZXJtaW5hdGU/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSB0YWcgZm9yIHRoZSBSdW4oKSBjYWxscyB1c2luZyB0aGlzXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxyXG4gICAgICovXHJcbiAgICB0YWc/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYSBzaW5nbGUgcnVuIGNvbmZpZ3VyYXRpb24gZW50cnkuIFNlZVxyXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Nlc3Npb24vXHJcbiAgICAgKiBvbm54cnVudGltZV9ydW5fb3B0aW9uc19jb25maWdfa2V5cy5oXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogYGBganNcclxuICAgICAqIGV4dHJhOiB7XHJcbiAgICAgKiAgIG1lbW9yeToge1xyXG4gICAgICogICAgIGVuYWJsZV9tZW1vcnlfYXJlbmFfc2hyaW5rYWdlOiBcIjFcIixcclxuICAgICAqICAgfVxyXG4gICAgICogfVxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIGV4dHJhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbiAgfVxyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gdmFsdWUgbWV0YWRhdGFcclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1pbnRlcmZhY2VcclxuICBpbnRlcmZhY2UgVmFsdWVNZXRhZGF0YSB7XHJcbiAgICAvLyBUQkRcclxuICB9XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudCBhIHJ1bnRpbWUgaW5zdGFuY2Ugb2YgYW4gT05OWCBtb2RlbC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbiB7XHJcbiAgLy8gI3JlZ2lvbiBydW4oKVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlIHRoZSBtb2RlbCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcyBhbmQgb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXHJcbiAgICovXHJcbiAgcnVuKGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcclxuXHJcbiAgLyoqXHJcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLklucHV0VHlwZWAgZm9yIGRldGFpbC5cclxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLk91dHB1dFR5cGVgIGZvclxyXG4gICAqIGRldGFpbC5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cclxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxyXG4gICAqL1xyXG4gIHJ1bihmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXHJcbiAgICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcclxuXHJcbiAgLyoqXHJcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cclxuICAgKi9cclxuICByZWxlYXNlKCk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBwcm9maWxpbmdcclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgcHJvZmlsaW5nLlxyXG4gICAqL1xyXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuZCBwcm9maWxpbmcuXHJcbiAgICovXHJcbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQ7XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBtZXRhZGF0YVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgaW5wdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBtb2RlbC5cclxuICAgKi9cclxuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG91dHB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcclxuXHJcbiAgLy8gLyoqXHJcbiAgLy8gICogR2V0IGlucHV0IG1ldGFkYXRhIG9mIHRoZSBsb2FkZWQgbW9kZWwuXHJcbiAgLy8gICovXHJcbiAgLy8gcmVhZG9ubHkgaW5wdXRNZXRhZGF0YTogUmVhZG9ubHlBcnJheTxSZWFkb25seTxJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGE+PjtcclxuXHJcbiAgLy8gLyoqXHJcbiAgLy8gICogR2V0IG91dHB1dCBtZXRhZGF0YSBvZiB0aGUgbG9hZGVkIG1vZGVsLlxyXG4gIC8vICAqL1xyXG4gIC8vIHJlYWRvbmx5IG91dHB1dE1ldGFkYXRhOiBSZWFkb25seUFycmF5PFJlYWRvbmx5PEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YT4+O1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbkZhY3Rvcnkge1xyXG4gIC8vICNyZWdpb24gY3JlYXRlKClcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gT05OWCBtb2RlbCBmaWxlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVyaSAtIFRoZSBVUkkgb3IgZmlsZSBwYXRoIG9mIHRoZSBtb2RlbCB0byBsb2FkLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cclxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cclxuICAgKi9cclxuICBjcmVhdGUodXJpOiBzdHJpbmcsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gYXJyYXkgYnVmZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQW4gQXJyYXlCdWZmZXIgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXHJcbiAgICovXHJcbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIHNlZ21lbnQgb2YgYW4gYXJyYXkgYnVmZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQW4gQXJyYXlCdWZmZXIgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cclxuICAgKiBAcGFyYW0gYnl0ZU9mZnNldCAtIFRoZSBiZWdpbm5pbmcgb2YgdGhlIHNwZWNpZmllZCBwb3J0aW9uIG9mIHRoZSBhcnJheSBidWZmZXIuXHJcbiAgICogQHBhcmFtIGJ5dGVMZW5ndGggLSBUaGUgbGVuZ3RoIGluIGJ5dGVzIG9mIHRoZSBhcnJheSBidWZmZXIuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxyXG4gICAqL1xyXG4gIGNyZWF0ZShidWZmZXI6IEFycmF5QnVmZmVyTGlrZSwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoPzogbnVtYmVyLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XHJcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGEgVWludDhBcnJheS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBIFVpbnQ4QXJyYXkgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXHJcbiAgICovXHJcbiAgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcbn1cclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNvbnN0IEluZmVyZW5jZVNlc3Npb246IEluZmVyZW5jZVNlc3Npb25GYWN0b3J5ID0gSW5mZXJlbmNlU2Vzc2lvbkltcGw7XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHtPcHRpb25zRm9ybWF0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMsIE9wdGlvbnNUZW5zb3JMYXlvdXR9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JUb0RhdGFVcmxPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyBleHRlbmRzIE9wdGlvbnNUZW5zb3JMYXlvdXQsIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb252ZXJzaW9uVXRpbHMge1xyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZXMgYSBEYXRhVVJMIGluc3RhbmNlIGZyb20gdGVuc29yXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBEYXRhVVJMIGluc3RhbmNlIGZyb20gdGhlIHRlbnNvci5cclxuICAgKlxyXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XHJcbiAgICogLSBgZm9ybWF0YDogYCdSR0InYFxyXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXHJcbiAgICogQHJldHVybnMgYSBEYXRhVVJMIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGltYWdlIGNvbnZlcnRlZCBmcm9tIHRlbnNvciBkYXRhXHJcbiAgICovXHJcbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGVzIGFuIEltYWdlRGF0YSBpbnN0YW5jZSBmcm9tIHRlbnNvclxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIGFuIEltYWdlRGF0YSBpbnN0YW5jZSBmcm9tIHRoZSB0ZW5zb3IuXHJcbiAgICpcclxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxyXG4gICAqIC0gYGZvcm1hdGA6IGAnUkdCJ2BcclxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxyXG4gICAqIEByZXR1cm5zIGFuIEltYWdlRGF0YSBpbnN0YW5jZSByZXByZXNlbnRpbmcgdGhlIGltYWdlIGNvbnZlcnRlZCBmcm9tIHRlbnNvciBkYXRhXHJcbiAgICovXHJcbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YTtcclxufVxyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7VGVuc29yLCBUeXBlZFRlbnNvcn0gZnJvbSAnLi90ZW5zb3IuanMnO1xyXG5cclxuZXhwb3J0IHR5cGUgSW1hZ2VGb3JtYXQgPSAnUkdCJ3wnUkdCQSd8J0JHUid8J1JCRyc7XHJcbmV4cG9ydCB0eXBlIEltYWdlVGVuc29yTGF5b3V0ID0gJ05IV0MnfCdOQ0hXJztcclxuXHJcbi8vIHRoZSBmb2xsb3dpbmcgcmVnaW9uIGNvbnRhaW5zIHR5cGUgZGVmaW5pdGlvbnMgZm9yIGNvbnN0cnVjdGluZyB0ZW5zb3IgZnJvbSBhIHNwZWNpZmljIGxvY2F0aW9uLlxyXG5cclxuLy8gI3JlZ2lvbiB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvblxyXG5cclxuLyoqXHJcbiAqIHJlcHJlc2VudCBjb21tb24gcHJvcGVydGllcyBvZiB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHNwZWNpZmljIGxvY2F0aW9uLlxyXG4gKi9cclxuaW50ZXJmYWNlIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiBleHRlbmRzIFBpY2s8VGVuc29yLCAnZGltcyc+IHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICByZWFkb25seSB0eXBlOiBUO1xyXG59XHJcblxyXG4vKipcclxuICogcmVwcmVzZW50IHRoZSBwYXJhbWV0ZXIgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgR1BVIHJlc291cmNlLlxyXG4gKi9cclxuaW50ZXJmYWNlIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xyXG4gIC8qKlxyXG4gICAqIGFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxyXG4gICAqXHJcbiAgICogSWYgbm90IHByb3ZpZGVkLCB0aGUgdGVuc29yIHRyZWF0IHRoZSBHUFUgZGF0YSBhcyBleHRlcm5hbCByZXNvdXJjZS5cclxuICAgKi9cclxuICBkb3dubG9hZD8oKTogUHJvbWlzZTxUZW5zb3IuRGF0YVR5cGVNYXBbVF0+O1xyXG5cclxuICAvKipcclxuICAgKiBhbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHRlbnNvciBpcyBkaXNwb3NlZC5cclxuICAgKlxyXG4gICAqIElmIG5vdCBwcm92aWRlZCwgdGhlIHRlbnNvciB0cmVhdCB0aGUgR1BVIGRhdGEgYXMgZXh0ZXJuYWwgcmVzb3VyY2UuXHJcbiAgICovXHJcbiAgZGlzcG9zZT8oKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHBpbm5lZCBDUFUgYnVmZmVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLkNwdVBpbm5lZERhdGFUeXBlcyA9IFRlbnNvci5DcHVQaW5uZWREYXRhVHlwZXM+IGV4dGVuZHNcclxuICAgIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gYmUgJ2NwdS1waW5uZWQnLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAnY3B1LXBpbm5lZCc7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB0aGUgQ1BVIHBpbm5lZCBidWZmZXIgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdO1xyXG59XHJcblxyXG4vKipcclxuICogcmVwcmVzZW50IHRoZSBwYXJhbWV0ZXIgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViR0wgdGV4dHVyZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcyA9IFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzPiBleHRlbmRzXHJcbiAgICBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4sIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAndGV4dHVyZScuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgbG9jYXRpb246ICd0ZXh0dXJlJztcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBXZWJHTCB0ZXh0dXJlIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0gVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz4gZXh0ZW5kc1xyXG4gICAgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+LCBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gYmUgJ2dwdS1idWZmZXInLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAnZ3B1LWJ1ZmZlcic7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB0aGUgV2ViR1BVIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cclxuICAgKi9cclxuICByZWFkb25seSBncHVCdWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlO1xyXG59XHJcblxyXG4vLyAjZW5kcmVnaW9uXHJcblxyXG4vLyB0aGUgZm9sbG93aW5nIHJlZ2lvbiBjb250YWlucyB0eXBlIGRlZmluaXRpb25zIG9mIGVhY2ggaW5kaXZpZHVhbCBvcHRpb25zLlxyXG4vLyB0aGUgdGVuc29yIGZhY3RvcnkgZnVuY3Rpb25zIHVzZSBhIGNvbXBvc2l0aW9uIG9mIHRob3NlIG9wdGlvbnMgYXMgdGhlIHBhcmFtZXRlciB0eXBlLlxyXG5cclxuLy8gI3JlZ2lvbiBPcHRpb25zIGZpZWxkc1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zRm9ybWF0IHtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGZvcm1hdCByZXByZXNlbnRlZCBpbiBSR0JBIGNvbG9yIHNwYWNlLlxyXG4gICAqL1xyXG4gIGZvcm1hdD86IEltYWdlRm9ybWF0O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JGb3JtYXQge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgaW1hZ2UgZm9ybWF0IG9mIHRoZSB0ZW5zb3IuXHJcbiAgICpcclxuICAgKiBOT1RFOiB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIG9wdGlvbiAnZm9ybWF0Jy4gV2hpbGUgb3B0aW9uICdmb3JtYXQnIHJlcHJlc2VudHMgdGhlIG9yaWdpbmFsIGltYWdlLCAndGVuc29yRm9ybWF0J1xyXG4gICAqIHJlcHJlc2VudHMgdGhlIHRhcmdldCBmb3JtYXQgb2YgdGhlIHRlbnNvci4gQSB0cmFuc3Bvc2Ugd2lsbCBiZSBwZXJmb3JtZWQgaWYgdGhleSBhcmUgZGlmZmVyZW50LlxyXG4gICAqL1xyXG4gIHRlbnNvckZvcm1hdD86IEltYWdlRm9ybWF0O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSB7XHJcbiAgLyoqXHJcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICBkYXRhVHlwZT86ICdmbG9hdDMyJ3wndWludDgnO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JMYXlvdXQge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgdGVuc29yIGxheW91dCB3aGVuIHJlcHJlc2VudGluZyBkYXRhIG9mIG9uZSBvciBtb3JlIGltYWdlKHMpLlxyXG4gICAqL1xyXG4gIHRlbnNvckxheW91dD86IEltYWdlVGVuc29yTGF5b3V0O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNEaW1lbnNpb25zIHtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGhlaWdodCBpbiBwaXhlbFxyXG4gICAqL1xyXG4gIGhlaWdodD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIHdpZHRoIGluIHBpeGVsXHJcbiAgICovXHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgcmVzaXplZCBoZWlnaHQuIElmIG9taXR0ZWQsIG9yaWdpbmFsIGhlaWdodCB3aWxsIGJlIHVzZWQuXHJcbiAgICovXHJcbiAgcmVzaXplZEhlaWdodD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgcmVzaXplZCB3aWR0aCAtIGNhbiBiZSBhY2Nlc3NlZCB2aWEgdGVuc29yIGRpbWVuc2lvbnMgYXMgd2VsbFxyXG4gICAqL1xyXG4gIHJlc2l6ZWRXaWR0aD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyBub3JtYWxpemF0aW9uIHBhcmFtZXRlcnMgd2hlbiBwcmVwcm9jZXNzaW5nIHRoZSBpbWFnZSBhcyBtb2RlbCBpbnB1dC5cclxuICAgKlxyXG4gICAqIERhdGEgZWxlbWVudCBhcmUgcmFuZ2VkIGZyb20gMCB0byAyNTUuXHJcbiAgICovXHJcbiAgbm9ybT86IHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlICdiaWFzJyB2YWx1ZSBmb3IgaW1hZ2Ugbm9ybWFsaXphdGlvbi5cclxuICAgICAqIC0gSWYgb21pdHRlZCwgdXNlIGRlZmF1bHQgdmFsdWUgMC5cclxuICAgICAqIC0gSWYgaXQncyBhIHNpbmdsZSBudW1iZXIsIGFwcGx5IHRvIGVhY2ggY2hhbm5lbFxyXG4gICAgICogLSBJZiBpdCdzIGFuIGFycmF5IG9mIDMgb3IgNCBudW1iZXJzLCBhcHBseSBlbGVtZW50LXdpc2UuIE51bWJlciBvZiBlbGVtZW50cyBuZWVkIHRvIG1hdGNoIHRoZSBudW1iZXIgb2YgY2hhbm5lbHNcclxuICAgICAqIGZvciB0aGUgY29ycmVzcG9uZGluZyBpbWFnZSBmb3JtYXRcclxuICAgICAqL1xyXG4gICAgYmlhcz86IG51bWJlcnxbbnVtYmVyLCBudW1iZXIsIG51bWJlcl18W251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcbiAgICAvKipcclxuICAgICAqIFRoZSAnbWVhbicgdmFsdWUgZm9yIGltYWdlIG5vcm1hbGl6YXRpb24uXHJcbiAgICAgKiAtIElmIG9taXR0ZWQsIHVzZSBkZWZhdWx0IHZhbHVlIDI1NS5cclxuICAgICAqIC0gSWYgaXQncyBhIHNpbmdsZSBudW1iZXIsIGFwcGx5IHRvIGVhY2ggY2hhbm5lbFxyXG4gICAgICogLSBJZiBpdCdzIGFuIGFycmF5IG9mIDMgb3IgNCBudW1iZXJzLCBhcHBseSBlbGVtZW50LXdpc2UuIE51bWJlciBvZiBlbGVtZW50cyBuZWVkIHRvIG1hdGNoIHRoZSBudW1iZXIgb2YgY2hhbm5lbHNcclxuICAgICAqIGZvciB0aGUgY29ycmVzcG9uZGluZyBpbWFnZSBmb3JtYXRcclxuICAgICAqL1xyXG4gICAgbWVhbj86IG51bWJlciB8IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG4gIH07XHJcbn1cclxuXHJcbi8vICNlbmRyZWdpb25cclxuXHJcbi8vICNyZWdpb24gT3B0aW9ucyBjb21wb3NpdGlvblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9ucyBleHRlbmRzIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLCBPcHRpb25zVGVuc29yRm9ybWF0LCBPcHRpb25zVGVuc29yTGF5b3V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3B0aW9uc1RlbnNvckRhdGFUeXBlLCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMgZXh0ZW5kcyBPcHRpb25SZXNpemVkRGltZW5zaW9ucywgT3B0aW9uc1RlbnNvckZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNUZW5zb3JMYXlvdXQsIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tVXJsT3B0aW9ucyBleHRlbmRzIE9wdGlvbnNEaW1lbnNpb25zLCBPcHRpb25SZXNpemVkRGltZW5zaW9ucywgT3B0aW9uc1RlbnNvckZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNUZW5zb3JMYXlvdXQsIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zIGV4dGVuZHMgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsIE9wdGlvbnNUZW5zb3JGb3JtYXQsIE9wdGlvbnNUZW5zb3JMYXlvdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLlRleHR1cmVEYXRhVHlwZXM+IGV4dGVuZHNcclxuICAgIFJlcXVpcmVkPE9wdGlvbnNEaW1lbnNpb25zPiwgT3B0aW9uc0Zvcm1hdCwgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4vKiBUT0RPOiBhZGQgbW9yZSAqLyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz4gZXh0ZW5kc1xyXG4gICAgUGljazxUZW5zb3IsICdkaW1zJz4sIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxyXG4gICAqL1xyXG4gIGRhdGFUeXBlPzogVDtcclxufVxyXG5cclxuLy8gI2VuZHJlZ2lvblxyXG5cclxuLyoqXHJcbiAqIHR5cGUgVGVuc29yRmFjdG9yeSBkZWZpbmVzIHRoZSBmYWN0b3J5IGZ1bmN0aW9ucyBvZiAnVGVuc29yJyB0byBjcmVhdGUgdGVuc29yIGluc3RhbmNlcyBmcm9tIGV4aXN0aW5nIGRhdGEgb3JcclxuICogcmVzb3VyY2VzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGYWN0b3J5IHtcclxuICAvKipcclxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhbiBJbWFnZURhdGEgb2JqZWN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW1hZ2VEYXRhIC0gdGhlIEltYWdlRGF0YSBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIEltYWdlRGF0YS5cclxuICAgKlxyXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XHJcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxyXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXHJcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21JbWFnZShpbWFnZURhdGE6IEltYWdlRGF0YSwgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zKTpcclxuICAgICAgUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+fFR5cGVkVGVuc29yPCd1aW50OCc+PjtcclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBIVE1MSW1hZ2VFbGVtZW50IG9iamVjdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGltYWdlRWxlbWVudCAtIHRoZSBIVE1MSW1hZ2VFbGVtZW50IG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gSFRNTEltYWdlRWxlbWVudC5cclxuICAgKlxyXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XHJcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxyXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXHJcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21JbWFnZShpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQsIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyk6XHJcbiAgICAgIFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPnxUeXBlZFRlbnNvcjwndWludDgnPj47XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIFVSTFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVybFNvdXJjZSAtIGEgc3RyaW5nIGFzIGEgVVJMIHRvIHRoZSBpbWFnZSBvciBhIGRhdGEgVVJMIGNvbnRhaW5pbmcgdGhlIGltYWdlIGRhdGEuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFVSTC5cclxuICAgKlxyXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XHJcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxyXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXHJcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21JbWFnZSh1cmxTb3VyY2U6IHN0cmluZywgb3B0aW9ucz86IFRlbnNvckZyb21VcmxPcHRpb25zKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+fFR5cGVkVGVuc29yPCd1aW50OCc+PjtcclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYW4gSW1hZ2VCaXRtYXAgb2JqZWN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0gYml0bWFwIC0gdGhlIEltYWdlQml0bWFwIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gVVJMLlxyXG4gICAqXHJcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcclxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXHJcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcclxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XHJcbiAgICovXHJcbiAgZnJvbUltYWdlKGJpdG1hcDogSW1hZ2VCaXRtYXAsIG9wdGlvbnM6IFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMpOlxyXG4gICAgICBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz58VHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB0ZXh0dXJlIC0gdGhlIFdlYkdMVGV4dHVyZSBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFdlYkdMIHRleHR1cmUuXHJcbiAgICpcclxuICAgKiBUaGUgb3B0aW9ucyBpbmNsdWRlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gICAqIC0gYHdpZHRoYDogdGhlIHdpZHRoIG9mIHRoZSB0ZXh0dXJlLiBSZXF1aXJlZC5cclxuICAgKiAtIGBoZWlnaHRgOiB0aGUgaGVpZ2h0IG9mIHRoZSB0ZXh0dXJlLiBSZXF1aXJlZC5cclxuICAgKiAtIGBmb3JtYXRgOiB0aGUgZm9ybWF0IG9mIHRoZSB0ZXh0dXJlLiBJZiBvbWl0dGVkLCBhc3N1bWUgJ1JHQkEnLlxyXG4gICAqIC0gYGRvd25sb2FkYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZG93bmxvYWQgdGhlIHRlbnNvciBkYXRhIGZyb20gR1BVIHRvIENQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhXHJcbiAgICogd2lsbCBub3QgYmUgYWJsZSB0byBkb3dubG9hZC4gVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0XHJcbiAgICogbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXHJcbiAgICogLSBgZGlzcG9zZWA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3Bvc2UgdGhlIHRlbnNvciBkYXRhIG9uIEdQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxyXG4gICAqIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndCBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21UZXh0dXJlPFQgZXh0ZW5kcyBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcyA9ICdmbG9hdDMyJz4oXHJcbiAgICAgIHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZSwgb3B0aW9uczogVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQ+KTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYnVmZmVyIC0gdGhlIEdQVUJ1ZmZlciBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFdlYkdQVSBidWZmZXIuXHJcbiAgICpcclxuICAgKiBUaGUgb3B0aW9ucyBpbmNsdWRlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gICAqIC0gYGRhdGFUeXBlYDogdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhc3N1bWUgJ2Zsb2F0MzInLlxyXG4gICAqIC0gYGRpbXNgOiB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIFJlcXVpcmVkLlxyXG4gICAqIC0gYGRvd25sb2FkYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZG93bmxvYWQgdGhlIHRlbnNvciBkYXRhIGZyb20gR1BVIHRvIENQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhXHJcbiAgICogd2lsbCBub3QgYmUgYWJsZSB0byBkb3dubG9hZC4gVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0XHJcbiAgICogbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXHJcbiAgICogLSBgZGlzcG9zZWA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3Bvc2UgdGhlIHRlbnNvciBkYXRhIG9uIEdQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxyXG4gICAqIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndCBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21HcHVCdWZmZXI8VCBleHRlbmRzIFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXM+KFxyXG4gICAgICBidWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlLCBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPik6IFR5cGVkVGVuc29yPFQ+O1xyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIHByZS1hbGxvY2F0ZWQgYnVmZmVyLiBUaGUgYnVmZmVyIHdpbGwgYmUgdXNlZCBhcyBhIHBpbm5lZCBidWZmZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdHlwZSAtIHRoZSB0ZW5zb3IgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBidWZmZXIgLSBhIFR5cGVkQXJyYXkgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZS5cclxuICAgKiBAcGFyYW0gZGltcyAtIHNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21QaW5uZWRCdWZmZXI8VCBleHRlbmRzIEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPj4oXHJcbiAgICAgIHR5cGU6IFQsIGJ1ZmZlcjogVGVuc29yLkRhdGFUeXBlTWFwW1RdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjxUPjtcclxufVxyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbi8qKlxyXG4gKiBBIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYSBmaWxlJ3MgVVJMIG9yIHBhdGguXHJcbiAqXHJcbiAqIFBhdGggaXMgdmFpbGFibGUgb25seSBpbiBvbm54cnVudGltZS1ub2RlIG9yIG9ubnhydW50aW1lLXdlYiBydW5uaW5nIGluIE5vZGUuanMuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBGaWxlVXJsT3JQYXRoID0gc3RyaW5nO1xyXG5cclxuLyoqXHJcbiAqIEEgQmxvYiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmlsZS5cclxuICovXHJcbmV4cG9ydCB0eXBlIEZpbGVCbG9iID0gQmxvYjtcclxuXHJcbi8qKlxyXG4gKiBBIFVpbnQ4QXJyYXksIEFycmF5QnVmZmVyIG9yIFNoYXJlZEFycmF5QnVmZmVyIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmaWxlIGNvbnRlbnQuXHJcbiAqXHJcbiAqIFdoZW4gaXQgaXMgYW4gQXJyYXlCdWZmZXIgb3IgU2hhcmVkQXJyYXlCdWZmZXIsIHRoZSB3aG9sZSBidWZmZXIgaXMgYXNzdW1lZCB0byBiZSB0aGUgZmlsZSBjb250ZW50LlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRmlsZURhdGEgPSBVaW50OEFycmF5fEFycmF5QnVmZmVyTGlrZTtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgZmlsZSB0aGF0IGNhbiBiZSBsb2FkZWQgYnkgdGhlIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSS5cclxuICovXHJcbmV4cG9ydCB0eXBlIEZpbGVUeXBlID0gRmlsZVVybE9yUGF0aHxGaWxlQmxvYnxGaWxlRGF0YTtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIGV4dGVybmFsIGRhdGEgZmlsZS5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZXJuYWxEYXRhRmlsZURlc2NyaXB0aW9uIHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBleHRlcm5hbCBkYXRhIGZpbGUuXHJcbiAgICovXHJcbiAgZGF0YTogRmlsZVR5cGU7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB0aGUgZmlsZSBwYXRoLlxyXG4gICAqL1xyXG4gIHBhdGg6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYW4gZXh0ZXJuYWwgZGF0YSBmaWxlLlxyXG4gKlxyXG4gKiBXaGVuIHVzaW5nIGEgc3RyaW5nLCBpdCBzaG91bGQgYmUgYSBmaWxlIFVSTCBvciBwYXRoIHRoYXQgaW4gdGhlIHNhbWUgZGlyZWN0b3J5IGFzIHRoZSBtb2RlbCBmaWxlLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRXh0ZXJuYWxEYXRhRmlsZVR5cGUgPSBFeHRlcm5hbERhdGFGaWxlRGVzY3JpcHRpb258RmlsZVVybE9yUGF0aDtcclxuXHJcbi8qKlxyXG4gKiBPcHRpb25zIGZvciBtb2RlbCBsb2FkaW5nLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBPbm54TW9kZWxPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5aW5nIGEgbGlzdCBvZiBmaWxlcyB0aGF0IHJlcHJlc2VudHMgdGhlIGV4dGVybmFsIGRhdGEuXHJcbiAgICovXHJcbiAgZXh0ZXJuYWxEYXRhPzogcmVhZG9ubHkgRXh0ZXJuYWxEYXRhRmlsZVR5cGVbXTtcclxufVxyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XHJcblxyXG5leHBvcnQgdHlwZSBOb25UZW5zb3JUeXBlID0gbmV2ZXI7XHJcblxyXG4vKipcclxuICogVHlwZSBPbm54VmFsdWUgUmVwcmVzZW50cyBib3RoIHRlbnNvcnMgYW5kIG5vbi10ZW5zb3JzIHZhbHVlIGZvciBtb2RlbCdzIGlucHV0cy9vdXRwdXRzLlxyXG4gKlxyXG4gKiBOT1RFOiBjdXJyZW50bHkgbm90IHN1cHBvcnQgbm9uLXRlbnNvclxyXG4gKi9cclxuZXhwb3J0IHR5cGUgT25ueFZhbHVlID0gVGVuc29yfE5vblRlbnNvclR5cGU7XHJcblxyXG4vKipcclxuICogVHlwZSBPbm54VmFsdWVEYXRhTG9jYXRpb24gcmVwcmVzZW50cyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgb2YgYW4gT25ueFZhbHVlLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgT25ueFZhbHVlRGF0YUxvY2F0aW9uID0gVGVuc29yLkRhdGFMb2NhdGlvbjtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge3Jlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XHJcbmltcG9ydCB7U2Vzc2lvbkhhbmRsZXIsIFRyYWluaW5nU2Vzc2lvbkhhbmRsZXJ9IGZyb20gJy4vYmFja2VuZC5qcyc7XHJcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9ufSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcclxuaW1wb3J0IHtPbm54VmFsdWV9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XHJcbmltcG9ydCB7VGVuc29yfSBmcm9tICcuL3RlbnNvci5qcyc7XHJcbmltcG9ydCB7VHJhaW5pbmdTZXNzaW9uIGFzIFRyYWluaW5nU2Vzc2lvbkludGVyZmFjZSwgVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9uc30gZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLmpzJztcclxuXHJcbnR5cGUgU2Vzc2lvbk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zO1xyXG50eXBlIEZlZWRzVHlwZSA9IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlO1xyXG50eXBlIEZldGNoZXNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbi5GZXRjaGVzVHlwZTtcclxudHlwZSBSZXR1cm5UeXBlID0gSW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlO1xyXG50eXBlIFJ1bk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnM7XHJcblxyXG5jb25zdCBub0JhY2tlbmRFcnJNc2c6IHN0cmluZyA9ICdUcmFpbmluZyBiYWNrZW5kIGNvdWxkIG5vdCBiZSByZXNvbHZlZC4gJyArXHJcbiAgICAnTWFrZSBzdXJlIHlvdVxcJ3JlIHVzaW5nIHRoZSBjb3JyZWN0IGNvbmZpZ3VyYXRpb24gJiBXZWJBc3NlbWJseSBmaWxlcy4nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWluaW5nU2Vzc2lvbiBpbXBsZW1lbnRzIFRyYWluaW5nU2Vzc2lvbkludGVyZmFjZSB7XHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihoYW5kbGVyOiBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyLCBoYXNPcHRpbWl6ZXJNb2RlbDogYm9vbGVhbiwgaGFzRXZhbE1vZGVsOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgdGhpcy5oYXNPcHRpbWl6ZXJNb2RlbCA9IGhhc09wdGltaXplck1vZGVsO1xyXG4gICAgdGhpcy5oYXNFdmFsTW9kZWwgPSBoYXNFdmFsTW9kZWw7XHJcbiAgfVxyXG4gIHByaXZhdGUgaGFuZGxlcjogVHJhaW5pbmdTZXNzaW9uSGFuZGxlcjtcclxuICBwcml2YXRlIGhhc09wdGltaXplck1vZGVsOiBib29sZWFuO1xyXG4gIHByaXZhdGUgaGFzRXZhbE1vZGVsOiBib29sZWFuO1xyXG5cclxuICBnZXQgdHJhaW5pbmdJbnB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuaW5wdXROYW1lcztcclxuICB9XHJcbiAgZ2V0IHRyYWluaW5nT3V0cHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5vdXRwdXROYW1lcztcclxuICB9XHJcblxyXG4gIGdldCBldmFsSW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XHJcbiAgICBpZiAodGhpcy5oYXNFdmFsTW9kZWwpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlci5ldmFsSW5wdXROYW1lcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyB0cmFpbmluZyBzZXNzaW9uIGhhcyBubyBldmFsTW9kZWwgbG9hZGVkLicpO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXQgZXZhbE91dHB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcclxuICAgIGlmICh0aGlzLmhhc0V2YWxNb2RlbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmV2YWxPdXRwdXROYW1lcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyB0cmFpbmluZyBzZXNzaW9uIGhhcyBubyBldmFsTW9kZWwgbG9hZGVkLicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZSh0cmFpbmluZ09wdGlvbnM6IFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnMsIHNlc3Npb25PcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOlxyXG4gICAgICBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbj4ge1xyXG4gICAgY29uc3QgZXZhbE1vZGVsOiBzdHJpbmd8VWludDhBcnJheSA9IHRyYWluaW5nT3B0aW9ucy5ldmFsTW9kZWwgfHwgJyc7XHJcbiAgICBjb25zdCBvcHRpbWl6ZXJNb2RlbDogc3RyaW5nfFVpbnQ4QXJyYXkgPSB0cmFpbmluZ09wdGlvbnMub3B0aW1pemVyTW9kZWwgfHwgJyc7XHJcbiAgICBjb25zdCBvcHRpb25zOiBTZXNzaW9uT3B0aW9ucyA9IHNlc3Npb25PcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIC8vIHJlc29sdmUgYmFja2VuZCwgdXBkYXRlIHNlc3Npb24gb3B0aW9ucyB3aXRoIHZhbGlkYXRlZCBFUHMsIGFuZCBjcmVhdGUgc2Vzc2lvbiBoYW5kbGVyXHJcbiAgICBjb25zdCBbYmFja2VuZCwgb3B0aW9uc1dpdGhWYWxpZGF0ZWRFUHNdID0gYXdhaXQgcmVzb2x2ZUJhY2tlbmRBbmRFeGVjdXRpb25Qcm92aWRlcnMob3B0aW9ucyk7XHJcbiAgICBpZiAoYmFja2VuZC5jcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGVyKSB7XHJcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBiYWNrZW5kLmNyZWF0ZVRyYWluaW5nU2Vzc2lvbkhhbmRsZXIoXHJcbiAgICAgICAgICB0cmFpbmluZ09wdGlvbnMuY2hlY2twb2ludFN0YXRlLCB0cmFpbmluZ09wdGlvbnMudHJhaW5Nb2RlbCwgZXZhbE1vZGVsLCBvcHRpbWl6ZXJNb2RlbCxcclxuICAgICAgICAgIG9wdGlvbnNXaXRoVmFsaWRhdGVkRVBzKTtcclxuICAgICAgcmV0dXJuIG5ldyBUcmFpbmluZ1Nlc3Npb24oaGFuZGxlciwgISF0cmFpbmluZ09wdGlvbnMub3B0aW1pemVyTW9kZWwsICEhdHJhaW5pbmdPcHRpb25zLmV2YWxNb2RlbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3Iobm9CYWNrZW5kRXJyTXNnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBmdW5jdGlvbiBmb3IgcnVuVHJhaW5TdGVwIGFuZCBmdXR1cmUgcnVuU3RlcCBtZXRob2RzIHRoYXQgaGFuZGxlcyB0aGUgdHlwZS1uYXJyb3dpbmcgY29udmVyc2lvbiBmcm9tXHJcbiAgICogdGhlIGdpdmVuIHBhcmFtZXRlcnMgdG8gU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUgYW5kIFJ1bk9wdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW5wdXROYW1lcyB0aGUgZmVlZHMgb2JqZWN0IGlzIGNoZWNrZWQgdGhhdCB0aGV5IGNvbnRhaW4gYWxsIGlucHV0IG5hbWVzIGluIHRoZSBwcm92aWRlZCBsaXN0IG9mIGlucHV0XHJcbiAgICogbmFtZXMuXHJcbiAgICogQHBhcmFtIG91dHB1dE5hbWVzIHRoZSBmZXRjaGVzIG9iamVjdCBpcyBjaGVja2VkIHRoYXQgdGhlaXIga2V5cyBtYXRjaCB1cCB3aXRoIHZhbGlkIG5hbWVzIGluIHRoZSBsaXN0IG9mIG91dHB1dFxyXG4gICAqIG5hbWVzLlxyXG4gICAqIEBwYXJhbSBmZWVkcyB0aGUgcmVxdWlyZWQgaW5wdXRcclxuICAgKiBAcGFyYW0gYXJnMSBuYXJyb3dlZCAmIGNvbnZlcnRlZCBpbnRvIHRoZSBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSBvciBSdW5PcHRpb25zIG9iamVjdFxyXG4gICAqIEBwYXJhbSBhcmcyIG9wdGlvbmFsIFJ1bk9wdGlvbnMgb2JqZWN0LlxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgdHlwZU5hcnJvd2luZ0ZvclJ1blN0ZXAoXHJcbiAgICAgIGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdLCBvdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW10sIGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLFxyXG4gICAgICBhcmcyPzogUnVuT3B0aW9ucyk6IFtTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSwgUnVuT3B0aW9uc10ge1xyXG4gICAgY29uc3QgZmV0Y2hlczoge1tuYW1lOiBzdHJpbmddOiBPbm54VmFsdWV8bnVsbH0gPSB7fTtcclxuICAgIGxldCBvcHRpb25zOiBSdW5PcHRpb25zID0ge307XHJcbiAgICAvLyBjaGVjayBpbnB1dHNcclxuICAgIGlmICh0eXBlb2YgZmVlZHMgIT09ICdvYmplY3QnIHx8IGZlZWRzID09PSBudWxsIHx8IGZlZWRzIGluc3RhbmNlb2YgVGVuc29yIHx8IEFycmF5LmlzQXJyYXkoZmVlZHMpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICAnXFwnZmVlZHNcXCcgbXVzdCBiZSBhbiBvYmplY3QgdGhhdCB1c2UgaW5wdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpc0ZldGNoZXNFbXB0eSA9IHRydWU7XHJcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggb3ZlcnJpZGUgaXMgYmVpbmcgdXNlZFxyXG4gICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoYXJnMSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IGNhbm5vdCBiZSBudWxsLicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChhcmcxIGluc3RhbmNlb2YgVGVuc29yKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnZmV0Y2hlc1xcJyBjYW5ub3QgYmUgYSBUZW5zb3InKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcclxuICAgICAgICBpZiAoYXJnMS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2ZldGNoZXNcXCcgY2Fubm90IGJlIGFuIGVtcHR5IGFycmF5LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIG91dHB1dCBuYW1lc1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBhcmcxKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcJ2ZldGNoZXNcXCcgbXVzdCBiZSBhIHN0cmluZyBhcnJheSBvciBhbiBvYmplY3QuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAob3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdmZXRjaGVzJyBjb250YWlucyBpbnZhbGlkIG91dHB1dCBuYW1lOiAke25hbWV9LmApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcclxuICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCdvcHRpb25zXFwnIG11c3QgYmUgYW4gb2JqZWN0LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBkZWNpZGUgd2hldGhlciBhcmcxIGlzIGZldGNoZXMgb3Igb3B0aW9uc1xyXG4gICAgICAgIC8vIGlmIGFueSBvdXRwdXQgbmFtZSBpcyBwcmVzZW50IGFuZCBpdHMgdmFsdWUgaXMgdmFsaWQgT25ueFZhbHVlLCB3ZSBjb25zaWRlciBpdCBmZXRjaGVzXHJcbiAgICAgICAgbGV0IGlzRmV0Y2hlcyA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGFyZzFLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJnMSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIG91dHB1dE5hbWVzKSB7XHJcbiAgICAgICAgICBpZiAoYXJnMUtleXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgdiA9IChhcmcxIGFzIEluZmVyZW5jZVNlc3Npb24uTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlKVtuYW1lXTtcclxuICAgICAgICAgICAgaWYgKHYgPT09IG51bGwgfHwgdiBpbnN0YW5jZW9mIFRlbnNvcikge1xyXG4gICAgICAgICAgICAgIGlzRmV0Y2hlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICBmZXRjaGVzW25hbWVdID0gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzRmV0Y2hlcykge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXFwnb3B0aW9uc1xcJyBtdXN0IGJlIGFuIG9iamVjdC4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzEgYXMgUnVuT3B0aW9ucztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IG11c3QgYmUgXFwnZmV0Y2hlc1xcJyBvciBcXCdvcHRpb25zXFwnLicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dHMgYXJlIGluIGZlZWRcclxuICAgIGZvciAoY29uc3QgbmFtZSBvZiBpbnB1dE5hbWVzKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgZmVlZHNbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCAnJHtuYW1lfScgaXMgbWlzc2luZyBpbiAnZmVlZHMnLmApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxyXG4gICAgaWYgKGlzRmV0Y2hlc0VtcHR5KSB7XHJcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBvdXRwdXROYW1lcykge1xyXG4gICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtmZXRjaGVzLCBvcHRpb25zXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBtZXRob2QgZm9yIHJ1blRyYWluU3RlcCBhbmQgYW55IG90aGVyIHJ1blN0ZXAgbWV0aG9kcy4gVGFrZXMgdGhlIFJldHVyblR5cGUgcmVzdWx0IGZyb20gdGhlIFNlc3Npb25IYW5kbGVyXHJcbiAgICogYW5kIGNoYW5nZXMgaXQgaW50byBhIG1hcCBvZiBUZW5zb3JzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJlc3VsdHNcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIGNvbnZlcnRIYW5kbGVyUmV0dXJuVHlwZVRvTWFwT2ZUZW5zb3JzKHJlc3VsdHM6IFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGUpOiBSZXR1cm5UeXBlIHtcclxuICAgIGNvbnN0IHJldHVyblZhbHVlOiB7W25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZX0gPSB7fTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3VsdHMpIHtcclxuICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdHMsIGtleSkpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW2tleV07XHJcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFRlbnNvcikge1xyXG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IHJlc3VsdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IG5ldyBUZW5zb3IocmVzdWx0LnR5cGUsIHJlc3VsdC5kYXRhLCByZXN1bHQuZGltcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgfVxyXG5cclxuICBhc3luYyBsYXp5UmVzZXRHcmFkKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgYXdhaXQgdGhpcy5oYW5kbGVyLmxhenlSZXNldEdyYWQoKTtcclxuICB9XHJcblxyXG4gIHJ1blRyYWluU3RlcChmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XHJcbiAgcnVuVHJhaW5TdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGZldGNoZXM6IEZldGNoZXNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XHJcbiAgYXN5bmMgcnVuVHJhaW5TdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xyXG4gICAgY29uc3QgW2ZldGNoZXMsIG9wdGlvbnNdID1cclxuICAgICAgICB0aGlzLnR5cGVOYXJyb3dpbmdGb3JSdW5TdGVwKHRoaXMudHJhaW5pbmdJbnB1dE5hbWVzLCB0aGlzLnRyYWluaW5nT3V0cHV0TmFtZXMsIGZlZWRzLCBhcmcxLCBhcmcyKTtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmhhbmRsZXIucnVuVHJhaW5TdGVwKGZlZWRzLCBmZXRjaGVzLCBvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmNvbnZlcnRIYW5kbGVyUmV0dXJuVHlwZVRvTWFwT2ZUZW5zb3JzKHJlc3VsdHMpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcnVuT3B0aW1pemVyU3RlcChvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zfHVuZGVmaW5lZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKHRoaXMuaGFzT3B0aW1pemVyTW9kZWwpIHtcclxuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bk9wdGltaXplclN0ZXAob3B0aW9ucyB8fCB7fSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgVHJhaW5pbmdTZXNzaW9uIGhhcyBubyBPcHRpbWl6ZXJNb2RlbCBsb2FkZWQuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBydW5FdmFsU3RlcChmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9uc3x1bmRlZmluZWQpOiBQcm9taXNlPFJldHVyblR5cGU+O1xyXG4gIHJ1bkV2YWxTdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGZldGNoZXM6IEZldGNoZXNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9uc3x1bmRlZmluZWQpOiBQcm9taXNlPFJldHVyblR5cGU+O1xyXG4gIGFzeW5jIHJ1bkV2YWxTdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZXxSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xyXG4gICAgaWYgKHRoaXMuaGFzRXZhbE1vZGVsKSB7XHJcbiAgICAgIGNvbnN0IFtmZXRjaGVzLCBvcHRpb25zXSA9XHJcbiAgICAgICAgICB0aGlzLnR5cGVOYXJyb3dpbmdGb3JSdW5TdGVwKHRoaXMuZXZhbElucHV0TmFtZXMsIHRoaXMuZXZhbE91dHB1dE5hbWVzLCBmZWVkcywgYXJnMSwgYXJnMik7XHJcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmhhbmRsZXIucnVuRXZhbFN0ZXAoZmVlZHMsIGZldGNoZXMsIG9wdGlvbnMpO1xyXG4gICAgICByZXR1cm4gdGhpcy5jb252ZXJ0SGFuZGxlclJldHVyblR5cGVUb01hcE9mVGVuc29ycyhyZXN1bHRzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBUcmFpbmluZ1Nlc3Npb24gaGFzIG5vIEV2YWxNb2RlbCBsb2FkZWQuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5ID0gdHJ1ZSk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmdldFBhcmFtZXRlcnNTaXplKHRyYWluYWJsZU9ubHkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYXJyYXk6IFVpbnQ4QXJyYXksIHRyYWluYWJsZU9ubHkgPSB0cnVlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBwYXJhbXNTaXplID0gYXdhaXQgdGhpcy5nZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5KTtcclxuICAgIC8vIGNoZWNraW5nIHRoYXQgdGhlIHNpemUgb2YgdGhlIFVpbnQ4QXJyYXkgaXMgZXF1aXZhbGVudCB0byB0aGUgYnl0ZSBsZW5ndGggb2YgYSBGbG9hdDMyQXJyYXkgb2YgdGhlIG51bWJlclxyXG4gICAgLy8gb2YgcGFyYW1ldGVyc1xyXG4gICAgaWYgKGFycmF5Lmxlbmd0aCAhPT0gNCAqIHBhcmFtc1NpemUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgJ1NpemUgb2YgdGhlIGJ1ZmZlciBwYXNzZWQgaW50byBsb2FkUGFyYW1ldGVyc0J1ZmZlciBtdXN0IG1hdGNoIHRoZSBudW1iZXIgb2YgcGFyYW1ldGVycyBpbiAnICtcclxuICAgICAgICAgICd0aGUgbW9kZWwuIFBsZWFzZSB1c2UgZ2V0UGFyYW1ldGVyc1NpemUgbWV0aG9kIHRvIGNoZWNrLicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5sb2FkUGFyYW1ldGVyc0J1ZmZlcihhcnJheSwgdHJhaW5hYmxlT25seSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRDb250aWd1b3VzUGFyYW1ldGVycyh0cmFpbmFibGVPbmx5ID0gdHJ1ZSk6IFByb21pc2U8T25ueFZhbHVlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKHRyYWluYWJsZU9ubHkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxufVxyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XHJcbmltcG9ydCB7T25ueFZhbHVlfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xyXG5pbXBvcnQge1RyYWluaW5nU2Vzc2lvbiBhcyBUcmFpbmluZ1Nlc3Npb25JbXBsfSBmcm9tICcuL3RyYWluaW5nLXNlc3Npb24taW1wbC5qcyc7XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXHJcblxyXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgVHJhaW5pbmdTZXNzaW9uIHtcclxuICAvKipcclxuICAgKiBFaXRoZXIgVVJJIGZpbGUgcGF0aCAoc3RyaW5nKSBvciBVaW50OEFycmF5IGNvbnRhaW5pbmcgbW9kZWwgb3IgY2hlY2twb2ludCBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICB0eXBlIFVyaU9yQnVmZmVyID0gc3RyaW5nfFVpbnQ4QXJyYXk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnQgYSBydW50aW1lIGluc3RhbmNlIG9mIGFuIE9OTlggdHJhaW5pbmcgc2Vzc2lvbixcclxuICogd2hpY2ggY29udGFpbnMgYSBtb2RlbCB0aGF0IGNhbiBiZSB0cmFpbmVkLCBhbmQsIG9wdGlvbmFsbHksXHJcbiAqIGFuIGV2YWwgYW5kIG9wdGltaXplciBtb2RlbC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uIHtcclxuICAvLyAjcmVnaW9uIHJ1bigpXHJcblxyXG4gIC8qKlxyXG4gICAqIExhemlseSByZXNldHMgdGhlIGdyYWRpZW50cyBvZiBhbGwgdHJhaW5hYmxlIHBhcmFtZXRlcnMgdG8gemVyby4gU2hvdWxkIGhhcHBlbiBhZnRlciB0aGUgaW52b2NhdGlvbiBvZlxyXG4gICAqIHJ1bk9wdGltaXplclN0ZXAuXHJcbiAgICovXHJcbiAgbGF6eVJlc2V0R3JhZCgpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAvKipcclxuICAgKiBSdW4gVHJhaW5TdGVwIGFzeW5jaHJvbm91c2x5IHdpdGggdGhlIGdpdmVuIGZlZWRzIGFuZCBvcHRpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5JbnB1dFR5cGVgIGZvclxyXG4gICBkZXRhaWwuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCB0cmFpbmluZy5cclxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxyXG4gICAqL1xyXG4gIHJ1blRyYWluU3RlcChmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOlxyXG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XHJcblxyXG4gIC8qKlxyXG4gICAqIFJ1biBhIHNpbmdsZSB0cmFpbiBzdGVwIHdpdGggdGhlIGdpdmVuIGlucHV0cyBhbmQgb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC5cclxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuXHJcbiAgICogZGV0YWlsLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgdHJhaW5pbmcuXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nXHJcbiAgIHZhbHVlcy5cclxuICAgKi9cclxuICBydW5UcmFpblN0ZXAoXHJcbiAgICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgZmV0Y2hlczogSW5mZXJlbmNlU2Vzc2lvbi5GZXRjaGVzVHlwZSxcclxuICAgICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcclxuXHJcbiAgLyoqXHJcbiAgICogUnVucyBhIHNpbmdsZSBvcHRpbWl6ZXIgc3RlcCwgd2hpY2ggcGVyZm9ybXMgd2VpZ2h0IHVwZGF0ZXMgZm9yIHRoZSB0cmFpbmFibGUgcGFyYW1ldGVycyB1c2luZyB0aGUgb3B0aW1pemVyIG1vZGVsLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCBvcHRpbWl6aW5nLlxyXG4gICAqL1xyXG4gIHJ1bk9wdGltaXplclN0ZXAob3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFJ1biBhIHNpbmdsZSBldmFsIHN0ZXAgd2l0aCB0aGUgZ2l2ZW4gaW5wdXRzIGFuZCBvcHRpb25zIHVzaW5nIHRoZSBldmFsIG1vZGVsLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgZXZhbCBzdGVwLlxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZ1xyXG4gICB2YWx1ZXMuXHJcbiAgICovXHJcbiAgcnVuRXZhbFN0ZXAoZmVlZHM6IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTpcclxuICAgICAgUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xyXG5cclxuICAvKipcclxuICAgKiBSdW4gYSBzaW5nbGUgZXZhbCBzdGVwIHdpdGggdGhlIGdpdmVuIGlucHV0cyBhbmQgb3B0aW9ucyB1c2luZyB0aGUgZXZhbCBtb2RlbC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC5cclxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuXHJcbiAgICogZGV0YWlsLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgZXZhbCBzdGVwLlxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZ1xyXG4gICB2YWx1ZXMuXHJcbiAgICovXHJcbiAgcnVuRXZhbFN0ZXAoXHJcbiAgICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgZmV0Y2hlczogSW5mZXJlbmNlU2Vzc2lvbi5GZXRjaGVzVHlwZSxcclxuICAgICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIGNvcHkgcGFyYW1ldGVyc1xyXG5cclxuICAvKipcclxuICAgKiBSZXRyaWV2ZXMgdGhlIHNpemUgb2YgYWxsIHBhcmFtZXRlcnMgZm9yIHRoZSB0cmFpbmluZyBzdGF0ZS4gQ2FsY3VsYXRlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHByaW1pdGl2ZSAoZGF0YXR5cGUgb2ZcclxuICAgKiB0aGUgcGFyYW1ldGVycykgZWxlbWVudHMgb2YgYWxsIHRoZSBwYXJhbWV0ZXJzIGluIHRoZSB0cmFpbmluZyBzdGF0ZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gV2hlbiBzZXQgdG8gdHJ1ZSwgdGhlIHNpemUgaXMgY2FsY3VsYXRlZCBmb3IgdHJhaW5hYmxlIHBhcmFtcyBvbmx5LiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXHJcbiAgICovXHJcbiAgZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8bnVtYmVyPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29waWVzIHBhcmFtZXRlciB2YWx1ZXMgZnJvbSB0aGUgZ2l2ZW4gYnVmZmVyIHRvIHRoZSB0cmFpbmluZyBzdGF0ZS4gQ3VycmVudGx5LCBvbmx5IHN1cHBvcnRpbmcgbW9kZWxzIHdpdGhcclxuICAgKiBwYXJhbWV0ZXJzIG9mIHR5cGUgRmxvYXQzMi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBIFVpbnQ4QXJyYXkgcmVwcmVzZW50YXRpb24gb2YgRmxvYXQzMiBwYXJhbWV0ZXJzLlxyXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gVHJ1ZSBpZiB0cmFpbmFibGUgcGFyYW1ldGVycyBvbmx5IHRvIGJlIG1vZGlmaWVkLCBmYWxzZSBvdGhlcndpc2UuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cclxuICAgKi9cclxuICBsb2FkUGFyYW1ldGVyc0J1ZmZlcihidWZmZXI6IFVpbnQ4QXJyYXksIHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAvKipcclxuICAgKiBDb3BpZXMgdGhlIG1vZGVsIHBhcmFtZXRlcnMgdG8gYSBjb250aWd1b3VzIGJ1ZmZlci4gVXN1YWxseSB1c2VkIGluIHRoZSBjb250ZXh0IG9mIEZlZGVyYXRlZCBMZWFybmluZy5cclxuICAgKiBDdXJyZW50bHksIG9ubHkgc3VwcG9ydGluZyBtb2RlbHMgd2l0aCBwYXJhbWV0ZXJzIG9mIHR5cGUgRmxvYXQzMi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gV2hlbiBzZXQgdG8gdHJ1ZSwgb25seSB0cmFpbmFibGUgcGFyYW1ldGVycyBhcmUgY29waWVkLiBUcmFpbmFibGUgcGFyYW1ldGVycyBhcmUgcGFyYW1ldGVyc1xyXG4gICAqIGZvciB3aGljaCByZXF1aXJlc19ncmFkIGlzIHNldCB0byB0cnVlLiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBGbG9hdDMyIE9ubnhWYWx1ZSBvZiB0aGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMuXHJcbiAgICovXHJcbiAgZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8T25ueFZhbHVlPjtcclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gcmVsZWFzZSgpXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbGVhc2UgdGhlIGluZmVyZW5jZSBzZXNzaW9uIGFuZCB0aGUgdW5kZXJseWluZyByZXNvdXJjZXMuXHJcbiAgICovXHJcbiAgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+O1xyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBtZXRhZGF0YVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgaW5wdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCB0cmFpbmluZyBtb2RlbC5cclxuICAgKi9cclxuICByZWFkb25seSB0cmFpbmluZ0lucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgb3V0cHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgdHJhaW5pbmcgbW9kZWwuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgdHJhaW5pbmdPdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBpbnB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIGV2YWwgbW9kZWwuIElzIGFuIGVtcHR5IGFycmF5IGlmIG5vIGV2YWwgbW9kZWwgaXMgbG9hZGVkLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGV2YWxJbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG91dHB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIGV2YWwgbW9kZWwuIElzIGFuIGVtcHR5IGFycmF5IGlmIG5vIGV2YWwgbW9kZWwgaXMgbG9hZGVkLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGV2YWxPdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIG9wdGlvbmFsIHBhcmFtZXRlcnMgdGhhdCBjYW4gYmUgcGFzc2VkIGludG8gdGhlIFRyYWluaW5nU2Vzc2lvbkZhY3RvcnkuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFVSSSBvciBidWZmZXIgZm9yIGEgLmNrcHQgZmlsZSB0aGF0IGNvbnRhaW5zIHRoZSBjaGVja3BvaW50IGZvciB0aGUgdHJhaW5pbmcgbW9kZWwuXHJcbiAgICovXHJcbiAgY2hlY2twb2ludFN0YXRlOiBUcmFpbmluZ1Nlc3Npb24uVXJpT3JCdWZmZXI7XHJcbiAgLyoqXHJcbiAgICogVVJJIG9yIGJ1ZmZlciBmb3IgdGhlIC5vbm54IHRyYWluaW5nIGZpbGUuXHJcbiAgICovXHJcbiAgdHJhaW5Nb2RlbDogVHJhaW5pbmdTZXNzaW9uLlVyaU9yQnVmZmVyO1xyXG4gIC8qKlxyXG4gICAqIE9wdGlvbmFsLiBVUkkgb3IgYnVmZmVyIGZvciB0aGUgLm9ubnggb3B0aW1pemVyIG1vZGVsIGZpbGUuXHJcbiAgICovXHJcbiAgb3B0aW1pemVyTW9kZWw/OiBUcmFpbmluZ1Nlc3Npb24uVXJpT3JCdWZmZXI7XHJcbiAgLyoqXHJcbiAgICogT3B0aW9uYWwuIFVSSSBvciBidWZmZXIgZm9yIHRoZSAub25ueCBldmFsIG1vZGVsIGZpbGUuXHJcbiAgICovXHJcbiAgZXZhbE1vZGVsPzogVHJhaW5pbmdTZXNzaW9uLlVyaU9yQnVmZmVyO1xyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lcyBtZXRob2Qgb3ZlcmxvYWQgcG9zc2liaWxpdGllcyBmb3IgY3JlYXRpbmcgYSBUcmFpbmluZ1Nlc3Npb24uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRyYWluaW5nU2Vzc2lvbkZhY3Rvcnkge1xyXG4gIC8vICNyZWdpb24gY3JlYXRlKClcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBUcmFpbmluZ1Nlc3Npb24gYW5kIGFzeW5jaHJvbm91c2x5IGxvYWRzIGFueSBtb2RlbHMgcGFzc2VkIGluIHRocm91Z2ggdHJhaW5pbmdPcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdHJhaW5pbmdPcHRpb25zIHNwZWNpZnkgbW9kZWxzIGFuZCBjaGVja3BvaW50cyB0byBsb2FkIGludG8gdGhlIFRyYWluaW5nIFNlc3Npb25cclxuICAgKiBAcGFyYW0gc2Vzc2lvbk9wdGlvbnMgc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciB0cmFpbmluZyBzZXNzaW9uIGJlaGF2aW9yXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBUcmFpbmluZ1Nlc3Npb24gb2JqZWN0XHJcbiAgICovXHJcbiAgY3JlYXRlKHRyYWluaW5nT3B0aW9uczogVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9ucywgc2Vzc2lvbk9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTpcclxuICAgICAgUHJvbWlzZTxUcmFpbmluZ1Nlc3Npb24+O1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcbn1cclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNvbnN0IFRyYWluaW5nU2Vzc2lvbjogVHJhaW5pbmdTZXNzaW9uRmFjdG9yeSA9IFRyYWluaW5nU2Vzc2lvbkltcGw7XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuLyoqXHJcbiAqICMgT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJXHJcbiAqXHJcbiAqIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSSBpcyBhIHVuaWZpZWQgQVBJIGZvciBhbGwgSmF2YVNjcmlwdCB1c2FnZXMsIGluY2x1ZGluZyB0aGUgZm9sbG93aW5nIE5QTSBwYWNrYWdlczpcclxuICpcclxuICogLSBbb25ueHJ1bnRpbWUtbm9kZV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtbm9kZSlcclxuICogLSBbb25ueHJ1bnRpbWUtd2ViXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS13ZWIpXHJcbiAqIC0gW29ubnhydW50aW1lLXJlYWN0LW5hdGl2ZV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtcmVhY3QtbmF0aXZlKVxyXG4gKlxyXG4gKiBTZWUgYWxzbzpcclxuICogLSBbR2V0IFN0YXJ0ZWRdKGh0dHBzOi8vb25ueHJ1bnRpbWUuYWkvZG9jcy9nZXQtc3RhcnRlZC93aXRoLWphdmFzY3JpcHQvKVxyXG4gKiAtIFtJbmZlcmVuY2UgZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUtaW5mZXJlbmNlLWV4YW1wbGVzL3RyZWUvbWFpbi9qcylcclxuICpcclxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXHJcbiAqL1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9iYWNrZW5kLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi9lbnYuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3IuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdHJhY2UuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL29ubngtbW9kZWwuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL29ubngtdmFsdWUuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3RyYWluaW5nLXNlc3Npb24uanMnO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmV4cG9ydCBjb25zdCBpc05vZGUgPSAhISh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLm5vZGUpO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIGxpYj1cIndlYndvcmtlclwiIC8+XHJcblxyXG4vL1xyXG4vLyAqIHR5cGUgaGFjayBmb3IgXCJIVE1MSW1hZ2VFbGVtZW50XCJcclxuLy9cclxuLy8gaW4gdHlwZXNjcmlwdCwgdGhlIHR5cGUgb2YgXCJIVE1MSW1hZ2VFbGVtZW50XCIgaXMgZGVmaW5lZCBpbiBsaWIuZG9tLmQudHMsIHdoaWNoIGlzIGNvbmZsaWN0IHdpdGggbGliLndlYndvcmtlci5kLnRzLlxyXG4vLyB3aGVuIHdlIHVzZSB3ZWJ3b3JrZXIsIHRoZSBsaWIud2Vid29ya2VyLmQudHMgd2lsbCBiZSB1c2VkLCB3aGljaCBkb2VzIG5vdCBoYXZlIEhUTUxJbWFnZUVsZW1lbnQgZGVmaW5lZC5cclxuLy9cclxuLy8gd2Ugd2lsbCBnZXQgdGhlIGZvbGxvd2luZyBlcnJvcnMgY29tcGxhaW5pbmcgdGhhdCBIVE1MSW1hZ2VFbGVtZW50IGlzIG5vdCBkZWZpbmVkOlxyXG4vL1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyAuLi9jb21tb24vZGlzdC9janMvdGVuc29yLWZhY3RvcnkuZC50czoxODc6MjkgLSBlcnJvciBUUzI1NTI6IENhbm5vdCBmaW5kIG5hbWUgJ0hUTUxJbWFnZUVsZW1lbnQnLiBEaWQgeW91IG1lYW5cclxuLy8gJ0hUTUxMSUVsZW1lbnQnP1xyXG4vL1xyXG4vLyAxODcgICAgIGZyb21JbWFnZShpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQsIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyk6XHJcbi8vIFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+PjtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XHJcbi8vXHJcbi8vIG5vZGVfbW9kdWxlcy9Ad2ViZ3B1L3R5cGVzL2Rpc3QvaW5kZXguZC50czo4Mzo3IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MSW1hZ2VFbGVtZW50Jy4gRGlkIHlvdSBtZWFuXHJcbi8vICdIVE1MTElFbGVtZW50Jz9cclxuLy9cclxuLy8gODMgICAgIHwgSFRNTEltYWdlRWxlbWVudFxyXG4vLyAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XHJcbi8vXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vXHJcbi8vIGBIVE1MSW1hZ2VFbGVtZW50YCBpcyBvbmx5IHVzZWQgaW4gdHlwZSBkZWNsYXJhdGlvbiBhbmQgbm90IGluIHJlYWwgY29kZS4gU28gd2UgZGVmaW5lIGl0IGFzIGB1bmtub3duYCBoZXJlIHRvXHJcbi8vIGJ5cGFzcyB0aGUgdHlwZSBjaGVjay5cclxuXHJcbi8vXHJcbi8vICogdHlwZSBoYWNrIGZvciBcImRvY3VtZW50XCJcclxuLy9cclxuLy8gaW4gdHlwZXNjcmlwdCwgdGhlIHR5cGUgb2YgXCJkb2N1bWVudFwiIGlzIGRlZmluZWQgaW4gbGliLmRvbS5kLnRzLCBzbyBpdCdzIG5vdCBhdmFpbGFibGUgaW4gd2Vid29ya2VyLlxyXG4vL1xyXG4vLyB3ZSB3aWxsIGdldCB0aGUgZm9sbG93aW5nIGVycm9ycyBjb21wbGFpbmluZyB0aGF0IGRvY3VtZW50IGlzIG5vdCBkZWZpbmVkOlxyXG4vL1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyBsaWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50czo3OjMzIC0gZXJyb3IgVFMyNTg0OiBDYW5ub3QgZmluZCBuYW1lICdkb2N1bWVudCcuIERvIHlvdSBuZWVkIHRvIGNoYW5nZSB5b3VyIHRhcmdldFxyXG4vLyBsaWJyYXJ5PyBUcnkgY2hhbmdpbmcgdGhlICdsaWInIGNvbXBpbGVyIG9wdGlvbiB0byBpbmNsdWRlICdkb20nLlxyXG4vL1xyXG4vLyA3IGV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gKGRvY3VtZW50Py5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH5+fn5+fn5+XHJcbi8vXHJcbi8vIGxpYi93YXNtL3dhc20tdXRpbHMtaW1wb3J0LnRzOjc6NjEgLSBlcnJvciBUUzI1ODQ6IENhbm5vdCBmaW5kIG5hbWUgJ2RvY3VtZW50Jy4gRG8geW91IG5lZWQgdG8gY2hhbmdlIHlvdXIgdGFyZ2V0XHJcbi8vIGxpYnJhcnk/IFRyeSBjaGFuZ2luZyB0aGUgJ2xpYicgY29tcGlsZXIgb3B0aW9uIHRvIGluY2x1ZGUgJ2RvbScuXHJcbi8vXHJcbi8vIDcgZXhwb3J0IGNvbnN0IHNjcmlwdFNyYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAoZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmMgOlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH5+fn5+fn5+XHJcbi8vXHJcbi8vIGxpYi93YXNtL3dhc20tdXRpbHMtaW1wb3J0LnRzOjc6ODggLSBlcnJvciBUUzI1NTI6IENhbm5vdCBmaW5kIG5hbWUgJ0hUTUxTY3JpcHRFbGVtZW50Jy4gRGlkIHlvdSBtZWFuXHJcbi8vICdIVE1MTElFbGVtZW50Jz9cclxuLy9cclxuLy8gNyBleHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5+fn5+fn5+fn5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuLy8gYGRvY3VtZW50YCBpcyB1c2VkIHRvIGdldCB0aGUgY3VycmVudCBzY3JpcHQgVVJMLCB3aGljaCBpcyBub3QgYXZhaWxhYmxlIGluIHdlYndvcmtlci4gVGhpcyBmaWxlIGlzIHNlcnZlZCBhcyBhXHJcbi8vIFwiZHVhbFwiIGZpbGUgZm9yIGVudHJpZXMgb2YgYm90aCB3ZWJ3b3JrZXIgYW5kIHRoZSBlc20gbW9kdWxlLlxyXG4vL1xyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgdHlwZSBIVE1MSW1hZ2VFbGVtZW50ID0gdW5rbm93bjtcclxuICB0eXBlIEhUTUxTY3JpcHRFbGVtZW50ID0ge3NyYz86IHN0cmluZ307XHJcbiAgY29uc3QgZG9jdW1lbnQ6IHVuZGVmaW5lZHx7Y3VycmVudFNjcmlwdD86IEhUTUxTY3JpcHRFbGVtZW50fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBzdW1tYXJ5XHJcbiAqXHJcbiAqIFRoaXMgZmlsZSBpcyBzZXJ2ZWQgYXMgYSBcImR1YWxcIiBmaWxlIGZvciBib3RoIGVudHJpZXMgb2YgdGhlIGZvbGxvd2luZzpcclxuICogLSBUaGUgcHJveHkgd29ya2VyIGl0c2VsZi5cclxuICogICAtIFdoZW4gdXNlZCBhcyBhIHdvcmtlciwgaXQgbGlzdGVucyB0byB0aGUgbWVzc2FnZXMgZnJvbSB0aGUgbWFpbiB0aHJlYWQgYW5kIHBlcmZvcm1zIHRoZSBjb3JyZXNwb25kaW5nIG9wZXJhdGlvbnMuXHJcbiAqICAgLSBTaG91bGQgYmUgaW1wb3J0ZWQgZGlyZWN0bHkgdXNpbmcgYG5ldyBXb3JrZXIoKWAgaW4gdGhlIG1haW4gdGhyZWFkLlxyXG4gKlxyXG4gKiAtIFRoZSBFU00gbW9kdWxlIHRoYXQgY3JlYXRlcyB0aGUgcHJveHkgd29ya2VyIChhcyBhIHdvcmtlciBsYXVuY2hlcikuXHJcbiAqICAgLSBXaGVuIHVzZWQgYXMgYSB3b3JrZXIgbGF1bmNoZXIsIGl0IGNyZWF0ZXMgdGhlIHByb3h5IHdvcmtlciBhbmQgcmV0dXJucyBpdC5cclxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCB1c2luZyBgaW1wb3J0KClgIGluIHRoZSBtYWluIHRocmVhZCwgd2l0aCB0aGUgcXVlcnkgcGFyYW1ldGVyIGBpbXBvcnQ9MWAuXHJcbiAqXHJcbiAqIFRoaXMgZmlsZSB3aWxsIGJlIGFsd2F5cyBjb21waWxpbmcgaW50byBFU00gZm9ybWF0LlxyXG4gKi9cclxuXHJcbmltcG9ydCB0eXBlIHtPcnRXYXNtTWVzc2FnZSwgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGF9IGZyb20gJy4uL3Byb3h5LW1lc3NhZ2VzLmpzJztcclxuaW1wb3J0IHtjcmVhdGVTZXNzaW9uLCBjb3B5RnJvbUV4dGVybmFsQnVmZmVyLCBlbmRQcm9maWxpbmcsIGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzLCBpbml0RXAsIGluaXRSdW50aW1lLCByZWxlYXNlU2Vzc2lvbiwgcnVufSBmcm9tICcuLi93YXNtLWNvcmUtaW1wbC5qcyc7XHJcbmltcG9ydCB7aW5pdGlhbGl6ZVdlYkFzc2VtYmx5fSBmcm9tICcuLi93YXNtLWZhY3RvcnkuanMnO1xyXG5pbXBvcnQge3NjcmlwdFNyY30gZnJvbSAnLi4vd2FzbS11dGlscy1pbXBvcnQuanMnO1xyXG5cclxuY29uc3QgV09SS0VSX05BTUUgPSAnb3J0LXdhc20tcHJveHktd29ya2VyJztcclxuY29uc3QgaXNQcm94eVdvcmtlciA9IGdsb2JhbFRoaXMuc2VsZj8ubmFtZSA9PT0gV09SS0VSX05BTUU7XHJcblxyXG5pZiAoaXNQcm94eVdvcmtlcikge1xyXG4gIC8vIFdvcmtlciB0aHJlYWRcclxuICBzZWxmLm9ubWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50PE9ydFdhc21NZXNzYWdlPik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3Qge3R5cGUsIGluIDogbWVzc2FnZX0gPSBldi5kYXRhO1xyXG4gICAgdHJ5IHtcclxuICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnaW5pdC13YXNtJzpcclxuICAgICAgICAgIGluaXRpYWxpemVXZWJBc3NlbWJseShtZXNzYWdlIS53YXNtKVxyXG4gICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdFJ1bnRpbWUobWVzc2FnZSEpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlLCBlcnJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGUsIGVycn0pO1xyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2luaXQtZXAnOiB7XHJcbiAgICAgICAgICBjb25zdCB7ZXBOYW1lLCBlbnZ9ID0gbWVzc2FnZSE7XHJcbiAgICAgICAgICBpbml0RXAoZW52LCBlcE5hbWUpXHJcbiAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZX0pO1xyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlLCBlcnJ9KTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnY29weS1mcm9tJzoge1xyXG4gICAgICAgICAgY29uc3Qge2J1ZmZlcn0gPSBtZXNzYWdlITtcclxuICAgICAgICAgIGNvbnN0IGJ1ZmZlckRhdGEgPSBjb3B5RnJvbUV4dGVybmFsQnVmZmVyKGJ1ZmZlcik7XHJcbiAgICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZSwgb3V0OiBidWZmZXJEYXRhfSBhcyBPcnRXYXNtTWVzc2FnZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnY3JlYXRlJzoge1xyXG4gICAgICAgICAgY29uc3Qge21vZGVsLCBvcHRpb25zfSA9IG1lc3NhZ2UhO1xyXG4gICAgICAgICAgY3JlYXRlU2Vzc2lvbihtb2RlbCwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgc2Vzc2lvbk1ldGFkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZSwgb3V0OiBzZXNzaW9uTWV0YWRhdGF9IGFzIE9ydFdhc21NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7dHlwZSwgZXJyfSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgJ3JlbGVhc2UnOlxyXG4gICAgICAgICAgcmVsZWFzZVNlc3Npb24obWVzc2FnZSEpO1xyXG4gICAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGV9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3J1bic6IHtcclxuICAgICAgICAgIGNvbnN0IHtzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvcHRpb25zfSA9IG1lc3NhZ2UhO1xyXG4gICAgICAgICAgcnVuKHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG5ldyBBcnJheShvdXRwdXRJbmRpY2VzLmxlbmd0aCkuZmlsbChudWxsKSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgb3V0cHV0cyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG91dHB1dHMuc29tZShvID0+IG9bM10gIT09ICdjcHUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGUsIGVycjogJ1Byb3h5IGRvZXMgbm90IHN1cHBvcnQgbm9uLWNwdSB0ZW5zb3IgbG9jYXRpb24uJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dHlwZSwgb3V0OiBvdXRwdXRzfSBhcyBPcnRXYXNtTWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyhbLi4uaW5wdXRzLCAuLi5vdXRwdXRzXSBhcyBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHt0eXBlLCBlcnJ9KTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnZW5kLXByb2ZpbGluZyc6XHJcbiAgICAgICAgICBlbmRQcm9maWxpbmcobWVzc2FnZSEpO1xyXG4gICAgICAgICAgcG9zdE1lc3NhZ2Uoe3R5cGV9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBwb3N0TWVzc2FnZSh7dHlwZSwgZXJyfSBhcyBPcnRXYXNtTWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaXNQcm94eVdvcmtlciA/XHJcbiAgICBudWxsIDpcclxuICAgICh1cmxPdmVycmlkZT86IHN0cmluZykgPT5cclxuICAgICAgICBuZXcgV29ya2VyKHVybE92ZXJyaWRlID8/IHNjcmlwdFNyYyEsIHt0eXBlOiBCVUlMRF9ERUZTLklTX0VTTSA/ICdtb2R1bGUnIDogJ2NsYXNzaWMnLCBuYW1lOiBXT1JLRVJfTkFNRX0pO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB0eXBlIHtPcnRXYXNtTW9kdWxlfSBmcm9tICcuL3dhc20tdHlwZXMnO1xyXG5pbXBvcnQge2lzTm9kZX0gZnJvbSAnLi93YXNtLXV0aWxzLWVudic7XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzaWMgc2NyaXB0IHNvdXJjZSBVUkwuIFRoaXMgaXMgbm90IGFsd2F5cyBhdmFpbGFibGUgaW4gbm9uIEVTTW9kdWxlIGVudmlyb25tZW50cy5cclxuICpcclxuICogSW4gTm9kZS5qcywgdGhpcyBpcyB1bmRlZmluZWQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2NyaXB0U3JjID1cclxuICAgIC8vIGlmIE5vZGVqcywgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgaXNOb2RlID8gdW5kZWZpbmVkIDpcclxuICAgICAgICAgICAgIC8vIGlmIEl0J3MgRVNNLCB1c2UgaW1wb3J0Lm1ldGEudXJsXHJcbiAgICAgICAgICAgICBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwgPz9cclxuICAgICAgICAvLyB1c2UgYGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjYCBpZiBhdmFpbGFibGVcclxuICAgICAgICAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudC5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBgc2VsZi5sb2NhdGlvbi5ocmVmYCBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmLmxvY2F0aW9uPy5ocmVmIDogdW5kZWZpbmVkKSk7XHJcblxyXG4vKipcclxuICogVGhlIG9yaWdpbiBvZiB0aGUgY3VycmVudCBsb2NhdGlvbi5cclxuICpcclxuICogSW4gTm9kZS5qcywgdGhpcyBpcyB1bmRlZmluZWQuXHJcbiAqL1xyXG5jb25zdCBvcmlnaW4gPSBpc05vZGUgfHwgdHlwZW9mIGxvY2F0aW9uID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGxvY2F0aW9uLm9yaWdpbjtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gZmlsZW5hbWUgd2l0aCBwcmVmaXggaXMgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXHJcbiAqL1xyXG5jb25zdCBpc1NhbWVPcmlnaW4gPSAoZmlsZW5hbWU6IHN0cmluZywgcHJlZml4T3ZlcnJpZGU/OiBzdHJpbmcpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgYmFzZVVybCA9IHByZWZpeE92ZXJyaWRlID8/IHNjcmlwdFNyYztcclxuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgPyBuZXcgVVJMKGZpbGVuYW1lLCBiYXNlVXJsKSA6IG5ldyBVUkwoZmlsZW5hbWUpO1xyXG4gICAgcmV0dXJuIHVybC5vcmlnaW4gPT09IG9yaWdpbjtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplIHRoZSBpbnB1dHMgdG8gYW4gYWJzb2x1dGUgVVJMIHdpdGggdGhlIGdpdmVuIHByZWZpeCBvdmVycmlkZS4gSWYgZmFpbGVkLCByZXR1cm4gdW5kZWZpbmVkLlxyXG4gKi9cclxuY29uc3Qgbm9ybWFsaXplVXJsID0gKGZpbGVuYW1lOiBzdHJpbmcsIHByZWZpeE92ZXJyaWRlPzogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgYmFzZVVybCA9IHByZWZpeE92ZXJyaWRlID8/IHNjcmlwdFNyYztcclxuICB0cnkge1xyXG4gICAgY29uc3QgdXJsID0gYmFzZVVybCA/IG5ldyBVUkwoZmlsZW5hbWUsIGJhc2VVcmwpIDogbmV3IFVSTChmaWxlbmFtZSk7XHJcbiAgICByZXR1cm4gdXJsLmhyZWY7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBmYWxsYmFjayBVUkwgaWYgYW4gYWJzb2x1dGUgVVJMIGNhbm5vdCBiZSBjcmVhdGVkIGJ5IHRoZSBub3JtYWxpemVVcmwgZnVuY3Rpb24uXHJcbiAqL1xyXG5jb25zdCBmYWxsYmFja1VybCA9IChmaWxlbmFtZTogc3RyaW5nLCBwcmVmaXhPdmVycmlkZT86IHN0cmluZykgPT4gYCR7cHJlZml4T3ZlcnJpZGUgPz8gJy4vJ30ke2ZpbGVuYW1lfWA7XHJcblxyXG4vKipcclxuICogVGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdXNlZCB0byBwcmVsb2FkIGEgbW9kdWxlIGZyb20gYSBVUkwuXHJcbiAqXHJcbiAqIElmIHRoZSBvcmlnaW4gb2YgdGhlIHdvcmtlciBVUkwgaXMgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgb3JpZ2luLCB0aGUgd29ya2VyIGNhbm5vdCBiZSBsb2FkZWQgZGlyZWN0bHkuXHJcbiAqIFNlZSBkaXNjdXNzaW9ucyBpbiBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3dvcmtlci1sb2FkZXIvaXNzdWVzLzE1NFxyXG4gKlxyXG4gKiBJbiB0aGlzIGNhc2UsIHdlIHdpbGwgZmV0Y2ggdGhlIHdvcmtlciBVUkwgYW5kIGNyZWF0ZSBhIG5ldyBCbG9iIFVSTCB3aXRoIHRoZSBzYW1lIG9yaWdpbiBhcyBhIHdvcmthcm91bmQuXHJcbiAqXHJcbiAqIEBwYXJhbSBhYnNvbHV0ZVVybCAtIFRoZSBhYnNvbHV0ZSBVUkwgdG8gcHJlbG9hZC5cclxuICpcclxuICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG5ldyBCbG9iIFVSTFxyXG4gKi9cclxuY29uc3QgcHJlbG9hZCA9IGFzeW5jKGFic29sdXRlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYWJzb2x1dGVVcmwsIHtjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ30pO1xyXG4gIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XHJcbiAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdXNlZCB0byBkeW5hbWljYWxseSBpbXBvcnQgYSBtb2R1bGUgZnJvbSBhIFVSTC5cclxuICpcclxuICogVGhlIGJ1aWxkIHNjcmlwdCBoYXMgc3BlY2lhbCBoYW5kbGluZyBmb3IgdGhpcyBmdW5jdGlvbiB0byBlbnN1cmUgdGhhdCB0aGUgVVJMIGlzIG5vdCBidW5kbGVkIGludG8gdGhlIGZpbmFsIG91dHB1dC5cclxuICpcclxuICogQHBhcmFtIHVybCAtIFRoZSBVUkwgdG8gaW1wb3J0LlxyXG4gKlxyXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBkZWZhdWx0IGV4cG9ydCBvZiB0aGUgbW9kdWxlLlxyXG4gKi9cclxuY29uc3QgZHluYW1pY0ltcG9ydERlZmF1bHQgPSBhc3luYzxUPih1cmw6IHN0cmluZyk6IFByb21pc2U8VD4gPT4gKGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHVybCkpLmRlZmF1bHQ7XHJcblxyXG4vKipcclxuICogVGhlIHByb3h5IHdvcmtlciBmYWN0b3J5IGltcG9ydGVkIGZyb20gdGhlIHByb3h5IHdvcmtlciBtb2R1bGUuXHJcbiAqXHJcbiAqIFRoaXMgaXMgb25seSBhdmFpbGFibGUgd2hlbiB0aGUgV2ViQXNzZW1ibHkgcHJveHkgaXMgbm90IGRpc2FibGVkLlxyXG4gKi9cclxuY29uc3QgY3JlYXRlUHJveHlXb3JrZXI6ICgodXJsT3ZlcnJpZGU/OiBzdHJpbmcpID0+IFdvcmtlcil8dW5kZWZpbmVkID1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXHJcbiAgICBCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSA/IHVuZGVmaW5lZCA6IHJlcXVpcmUoJy4vcHJveHktd29ya2VyL21haW4nKS5kZWZhdWx0O1xyXG5cclxuLyoqXHJcbiAqIEltcG9ydCB0aGUgcHJveHkgd29ya2VyLlxyXG4gKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgcGVyZm9ybSB0aGUgZm9sbG93aW5nIHN0ZXBzOlxyXG4gKiAxLiBJZiBhIHByZWxvYWQgaXMgbmVlZGVkLCBpdCB3aWxsIHByZWxvYWQgdGhlIG1vZHVsZSBhbmQgcmV0dXJuIHRoZSBvYmplY3QgVVJMLlxyXG4gKiAyLiBVc2UgdGhlIHByb3h5IHdvcmtlciBmYWN0b3J5IHRvIGNyZWF0ZSB0aGUgcHJveHkgd29ya2VyLlxyXG4gKlxyXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgb2YgMiBlbGVtZW50czpcclxuICogICAgICAgICAgICAtIFRoZSBvYmplY3QgVVJMIG9mIHRoZSBwcmVsb2FkZWQgbW9kdWxlLCBvciB1bmRlZmluZWQgaWYgbm8gcHJlbG9hZCBpcyBuZWVkZWQuXHJcbiAqICAgICAgICAgICAgLSBUaGUgcHJveHkgd29ya2VyLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGltcG9ydFByb3h5V29ya2VyID0gYXN5bmMoKTogUHJvbWlzZTxbdW5kZWZpbmVkIHwgc3RyaW5nLCBXb3JrZXJdPiA9PiB7XHJcbiAgaWYgKCFzY3JpcHRTcmMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgcHJveHkgd29ya2VyOiBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBzY3JpcHQgc291cmNlIFVSTC4nKTtcclxuICB9XHJcblxyXG4gIC8vIElmIHRoZSBzY3JpcHQgc291cmNlIGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLCB3ZSBjYW4gdXNlIHRoZSBlbWJlZGRlZCBwcm94eSBtb2R1bGUgZGlyZWN0bHkuXHJcbiAgaWYgKGlzU2FtZU9yaWdpbihzY3JpcHRTcmMpKSB7XHJcbiAgICByZXR1cm4gW3VuZGVmaW5lZCwgY3JlYXRlUHJveHlXb3JrZXIhKCldO1xyXG4gIH1cclxuXHJcbiAgLy8gT3RoZXJ3aXNlLCBuZWVkIHRvIHByZWxvYWRcclxuICBjb25zdCB1cmwgPSBhd2FpdCBwcmVsb2FkKHNjcmlwdFNyYyk7XHJcbiAgcmV0dXJuIFt1cmwsIGNyZWF0ZVByb3h5V29ya2VyISh1cmwpXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgZW1iZWRkZWQgV2ViQXNzZW1ibHkgbW9kdWxlLlxyXG4gKlxyXG4gKiBUaGlzIGlzIG9ubHkgYXZhaWxhYmxlIGluIEVTTSBhbmQgd2hlbiBlbWJlZGRpbmcgaXMgbm90IGRpc2FibGVkLlxyXG4gKi9cclxuY29uc3QgZW1iZWRkZWRXYXNtTW9kdWxlOiBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPnx1bmRlZmluZWQgPVxyXG4gICAgQlVJTERfREVGUy5JU19FU00gJiYgQlVJTERfREVGUy5ESVNBQkxFX0RZTkFNSUNfSU1QT1JUID9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXHJcbiAgICByZXF1aXJlKFxyXG4gICAgICAgICFCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkcgPyAnLi4vLi4vZGlzdC9vcnQtdHJhaW5pbmctd2FzbS1zaW1kLXRocmVhZGVkLm1qcycgOlxyXG4gICAgICAgICAgICAhQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgPyAnLi4vLi4vZGlzdC9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAubWpzJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuLi8uLi9kaXN0L29ydC13YXNtLXNpbWQtdGhyZWFkZWQubWpzJylcclxuICAgICAgICAuZGVmYXVsdCA6XHJcbiAgICB1bmRlZmluZWQ7XHJcblxyXG4vKipcclxuICogSW1wb3J0IHRoZSBXZWJBc3NlbWJseSBtb2R1bGUuXHJcbiAqXHJcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHM6XHJcbiAqIDEuIElmIEJVSUxEX0RFRlMuRElTQUJMRV9EWU5BTUlDX0lNUE9SVCBpcyB0cnVlLCB1c2UgdGhlIGVtYmVkZGVkIG1vZHVsZS5cclxuICogMi4gSWYgYSBwcmVsb2FkIGlzIG5lZWRlZCwgaXQgd2lsbCBwcmVsb2FkIHRoZSBtb2R1bGUgYW5kIHJldHVybiB0aGUgb2JqZWN0IFVSTC5cclxuICogMy4gT3RoZXJ3aXNlLCBpdCB3aWxsIHBlcmZvcm0gYSBkeW5hbWljIGltcG9ydCBvZiB0aGUgbW9kdWxlLlxyXG4gKlxyXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgb2YgMiBlbGVtZW50czpcclxuICogICAgICAgICAgICAtIFRoZSBvYmplY3QgVVJMIG9mIHRoZSBwcmVsb2FkZWQgbW9kdWxlLCBvciB1bmRlZmluZWQgaWYgbm8gcHJlbG9hZCBpcyBuZWVkZWQuXHJcbiAqICAgICAgICAgICAgLSBUaGUgZGVmYXVsdCBleHBvcnQgb2YgdGhlIG1vZHVsZSwgd2hpY2ggaXMgYSBmYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGUgV2ViQXNzZW1ibHkgbW9kdWxlLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGltcG9ydFdhc21Nb2R1bGUgPSBhc3luYyhcclxuICAgIHVybE92ZXJyaWRlOiBzdHJpbmd8dW5kZWZpbmVkLCBwcmVmaXhPdmVycmlkZTogc3RyaW5nfHVuZGVmaW5lZCxcclxuICAgIGlzTXVsdGlUaHJlYWRlZDogYm9vbGVhbik6IFByb21pc2U8W3VuZGVmaW5lZCB8IHN0cmluZywgRW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT5dPiA9PiB7XHJcbiAgaWYgKEJVSUxEX0RFRlMuRElTQUJMRV9EWU5BTUlDX0lNUE9SVCkge1xyXG4gICAgcmV0dXJuIFt1bmRlZmluZWQsIGVtYmVkZGVkV2FzbU1vZHVsZSFdO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCB3YXNtTW9kdWxlRmlsZW5hbWUgPSAhQlVJTERfREVGUy5ESVNBQkxFX1RSQUlOSU5HID8gJ29ydC10cmFpbmluZy13YXNtLXNpbWQtdGhyZWFkZWQubWpzJyA6XHJcbiAgICAgICAgIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC5tanMnIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5tanMnO1xyXG4gICAgY29uc3Qgd2FzbU1vZHVsZVVybCA9IHVybE92ZXJyaWRlID8/IG5vcm1hbGl6ZVVybCh3YXNtTW9kdWxlRmlsZW5hbWUsIHByZWZpeE92ZXJyaWRlKTtcclxuICAgIC8vIG5lZWQgdG8gcHJlbG9hZCBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XHJcbiAgICAvLyAxLiBub3QgaW4gTm9kZS5qcy5cclxuICAgIC8vICAgIC0gTm9kZS5qcyBkb2VzIG5vdCBoYXZlIHRoZSBzYW1lIG9yaWdpbiBwb2xpY3kgZm9yIGNyZWF0aW5nIHdvcmtlcnMuXHJcbiAgICAvLyAyLiBtdWx0aS10aHJlYWRlZCBpcyBlbmFibGVkLlxyXG4gICAgLy8gICAgLSBJZiBtdWx0aS10aHJlYWRlZCBpcyBkaXNhYmxlZCwgbm8gd29ya2VyIHdpbGwgYmUgY3JlYXRlZC4gU28gd2UgZG9uJ3QgbmVlZCB0byBwcmVsb2FkIHRoZSBtb2R1bGUuXHJcbiAgICAvLyAzLiB0aGUgYWJzb2x1dGUgVVJMIGlzIGF2YWlsYWJsZS5cclxuICAgIC8vICAgIC0gSWYgdGhlIGFic29sdXRlIFVSTCBpcyBmYWlsZWQgdG8gYmUgY3JlYXRlZCwgdGhlIG9yaWdpbiBjYW5ub3QgYmUgZGV0ZXJtaW5lZC4gSW4gdGhpcyBjYXNlLCB3ZSB3aWxsIG5vdFxyXG4gICAgLy8gICAgcHJlbG9hZCB0aGUgbW9kdWxlLlxyXG4gICAgLy8gNC4gdGhlIHdvcmtlciBVUkwgaXMgbm90IGZyb20gdGhlIHNhbWUgb3JpZ2luLlxyXG4gICAgLy8gICAgLSBJZiB0aGUgd29ya2VyIFVSTCBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbiwgd2UgY2FuIGNyZWF0ZSB0aGUgd29ya2VyIGRpcmVjdGx5LlxyXG4gICAgY29uc3QgbmVlZFByZWxvYWQgPSAhaXNOb2RlICYmIGlzTXVsdGlUaHJlYWRlZCAmJiB3YXNtTW9kdWxlVXJsICYmICFpc1NhbWVPcmlnaW4od2FzbU1vZHVsZVVybCwgcHJlZml4T3ZlcnJpZGUpO1xyXG4gICAgY29uc3QgdXJsID0gbmVlZFByZWxvYWQgPyAoYXdhaXQgcHJlbG9hZCh3YXNtTW9kdWxlVXJsKSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2FzbU1vZHVsZVVybCA/PyBmYWxsYmFja1VybCh3YXNtTW9kdWxlRmlsZW5hbWUsIHByZWZpeE92ZXJyaWRlKSk7XHJcbiAgICByZXR1cm4gW25lZWRQcmVsb2FkID8gdXJsIDogdW5kZWZpbmVkLCBhd2FpdCBkeW5hbWljSW1wb3J0RGVmYXVsdDxFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPj4odXJsKV07XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7RW52fSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xyXG5cclxuaW1wb3J0IHR5cGUge09ydFdhc21Nb2R1bGV9IGZyb20gJy4vd2FzbS10eXBlcyc7XHJcbmltcG9ydCB7aW1wb3J0V2FzbU1vZHVsZX0gZnJvbSAnLi93YXNtLXV0aWxzLWltcG9ydCc7XHJcblxyXG5sZXQgd2FzbTogT3J0V2FzbU1vZHVsZXx1bmRlZmluZWQ7XHJcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5sZXQgaW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbmxldCBhYm9ydGVkID0gZmFsc2U7XHJcblxyXG5jb25zdCBpc011bHRpVGhyZWFkU3VwcG9ydGVkID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gIC8vIElmICdTaGFyZWRBcnJheUJ1ZmZlcicgaXMgbm90IGF2YWlsYWJsZSwgV2ViQXNzZW1ibHkgdGhyZWFkcyB3aWxsIG5vdCB3b3JrLlxyXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgLy8gVGVzdCBmb3IgdHJhbnNmZXJhYmlsaXR5IG9mIFNBQnMgKGZvciBicm93c2Vycy4gbmVlZGVkIGZvciBGaXJlZm94KVxyXG4gICAgLy8gaHR0cHM6Ly9ncm91cHMuZ29vZ2xlLmNvbS9mb3J1bS8jIW1zZy9tb3ppbGxhLmRldi5wbGF0Zm9ybS9JSGtCWmxIRVRwQS9kd3NNTmNoV0VRQUpcclxuICAgIGlmICh0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIG5ldyBNZXNzYWdlQ2hhbm5lbCgpLnBvcnQxLnBvc3RNZXNzYWdlKG5ldyBTaGFyZWRBcnJheUJ1ZmZlcigxKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgdGhyZWFkcyBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcclxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgdGhyZWFkZWQgaW5zdHJ1Y3Rpb25zLlxyXG4gICAgcmV0dXJuIFdlYkFzc2VtYmx5LnZhbGlkYXRlKG5ldyBVaW50OEFycmF5KFtcclxuICAgICAgMCwgOTcsIDExNSwgMTA5LCAxLCAwLCAgMCwgIDAsIDEsIDQsIDEsICA5NiwgMCwgICAwLCAgMywgMiwgMSwgIDAsIDUsXHJcbiAgICAgIDQsIDEsICAzLCAgIDEsICAgMSwgMTAsIDExLCAxLCA5LCAwLCA2NSwgMCwgIDI1NCwgMTYsIDIsIDAsIDI2LCAxMVxyXG4gICAgXSkpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBpc1NpbWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IFNJTUQgY2FwYWJpbGl0eSAoZm9yIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMpXHJcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIFNJTUQgaW5zdHJ1Y3Rpb25zLlxyXG5cclxuICAgIC8vIFRoZSBiaW5hcnkgZGF0YSBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgZm9sbG93aW5nIGNvZGUgYnkgd2F0Mndhc206XHJcbiAgICAvL1xyXG4gICAgLy8gKG1vZHVsZVxyXG4gICAgLy8gICAodHlwZSAkdDAgKGZ1bmMpKVxyXG4gICAgLy8gICAoZnVuYyAkZjAgKHR5cGUgJHQwKVxyXG4gICAgLy8gICAgIChkcm9wXHJcbiAgICAvLyAgICAgICAoaTMyeDQuZG90X2kxNng4X3NcclxuICAgIC8vICAgICAgICAgKGk4eDE2LnNwbGF0XHJcbiAgICAvLyAgICAgICAgICAgKGkzMi5jb25zdCAwKSlcclxuICAgIC8vICAgICAgICAgKHYxMjguY29uc3QgaTMyeDQgMHgwMDAwMDAwMCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCkpKSkpXHJcblxyXG4gICAgcmV0dXJuIFdlYkFzc2VtYmx5LnZhbGlkYXRlKG5ldyBVaW50OEFycmF5KFtcclxuICAgICAgMCwgICA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDQsIDEsIDk2LCAwLCAwLCAzLCAyLCAxLCAwLCAxMCwgMzAsIDEsICAgMjgsICAwLCA2NSwgMCxcclxuICAgICAgMjUzLCAxNSwgMjUzLCAxMiwgIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAgMCwgIDI1MywgMTg2LCAxLCAyNiwgMTFcclxuICAgIF0pKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVXZWJBc3NlbWJseSA9IGFzeW5jKGZsYWdzOiBFbnYuV2ViQXNzZW1ibHlGbGFncyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGlmIChpbml0aWFsaXplZCkge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH1cclxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpcGxlIGNhbGxzIHRvIFxcJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpXFwnIGRldGVjdGVkLicpO1xyXG4gIH1cclxuICBpZiAoYWJvcnRlZCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcmV2aW91cyBjYWxsIHRvIFxcJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpXFwnIGZhaWxlZC4nKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemluZyA9IHRydWU7XHJcblxyXG4gIC8vIHdhc20gZmxhZ3MgYXJlIGFscmVhZHkgaW5pdGlhbGl6ZWRcclxuICBjb25zdCB0aW1lb3V0ID0gZmxhZ3MuaW5pdFRpbWVvdXQhO1xyXG4gIGxldCBudW1UaHJlYWRzID0gZmxhZ3MubnVtVGhyZWFkcyE7XHJcblxyXG4gIC8vIGVuc3VyZSBTSU1EIGlzIHN1cHBvcnRlZFxyXG4gIGlmICghaXNTaW1kU3VwcG9ydGVkKCkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignV2ViQXNzZW1ibHkgU0lNRCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LicpO1xyXG4gIH1cclxuXHJcbiAgLy8gY2hlY2sgaWYgbXVsdGktdGhyZWFkaW5nIGlzIHN1cHBvcnRlZFxyXG4gIGNvbnN0IG11bHRpVGhyZWFkU3VwcG9ydGVkID0gaXNNdWx0aVRocmVhZFN1cHBvcnRlZCgpO1xyXG4gIGlmIChudW1UaHJlYWRzID4gMSAmJiAhbXVsdGlUaHJlYWRTdXBwb3J0ZWQpIHtcclxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgIXNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZCkge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgICAnZW52Lndhc20ubnVtVGhyZWFkcyBpcyBzZXQgdG8gJyArIG51bVRocmVhZHMgK1xyXG4gICAgICAgICAgJywgYnV0IHRoaXMgd2lsbCBub3Qgd29yayB1bmxlc3MgeW91IGVuYWJsZSBjcm9zc09yaWdpbklzb2xhdGVkIG1vZGUuICcgK1xyXG4gICAgICAgICAgJ1NlZSBodHRwczovL3dlYi5kZXYvY3Jvc3Mtb3JpZ2luLWlzb2xhdGlvbi1ndWlkZS8gZm9yIG1vcmUgaW5mby4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICdXZWJBc3NlbWJseSBtdWx0aS10aHJlYWRpbmcgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC4gJyArXHJcbiAgICAgICAgJ0ZhbGxpbmcgYmFjayB0byBzaW5nbGUtdGhyZWFkaW5nLicpO1xyXG5cclxuICAgIC8vIHNldCBmbGFncy5udW1UaHJlYWRzIHRvIDEgc28gdGhhdCBPcnRJbml0KCkgd2lsbCBub3QgY3JlYXRlIGEgZ2xvYmFsIHRocmVhZCBwb29sLlxyXG4gICAgZmxhZ3MubnVtVGhyZWFkcyA9IG51bVRocmVhZHMgPSAxO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgd2FzbVBhdGhzID0gZmxhZ3Mud2FzbVBhdGhzO1xyXG4gIGNvbnN0IHdhc21QcmVmaXhPdmVycmlkZSA9IHR5cGVvZiB3YXNtUGF0aHMgPT09ICdzdHJpbmcnID8gd2FzbVBhdGhzIDogdW5kZWZpbmVkO1xyXG4gIGNvbnN0IG1qc1BhdGhPdmVycmlkZUZsYWcgPSAod2FzbVBhdGhzIGFzIEVudi5XYXNtRmlsZVBhdGhzKT8ubWpzO1xyXG4gIGNvbnN0IG1qc1BhdGhPdmVycmlkZSA9IChtanNQYXRoT3ZlcnJpZGVGbGFnIGFzIFVSTCk/LmhyZWYgPz8gbWpzUGF0aE92ZXJyaWRlRmxhZztcclxuICBjb25zdCB3YXNtUGF0aE92ZXJyaWRlRmxhZyA9ICh3YXNtUGF0aHMgYXMgRW52Lldhc21GaWxlUGF0aHMpPy53YXNtO1xyXG4gIGNvbnN0IHdhc21QYXRoT3ZlcnJpZGUgPSAod2FzbVBhdGhPdmVycmlkZUZsYWcgYXMgVVJMKT8uaHJlZiA/PyB3YXNtUGF0aE92ZXJyaWRlRmxhZztcclxuXHJcbiAgY29uc3QgW29iamVjdFVybCwgb3J0V2FzbUZhY3RvcnldID0gKGF3YWl0IGltcG9ydFdhc21Nb2R1bGUobWpzUGF0aE92ZXJyaWRlLCB3YXNtUHJlZml4T3ZlcnJpZGUsIG51bVRocmVhZHMgPiAxKSk7XHJcblxyXG4gIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3QgdGFza3M6IEFycmF5PFByb21pc2U8dm9pZD4+ID0gW107XHJcblxyXG4gIC8vIHByb21pc2UgZm9yIHRpbWVvdXRcclxuICBpZiAodGltZW91dCA+IDApIHtcclxuICAgIHRhc2tzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgfSkpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHJvbWlzZSBmb3IgbW9kdWxlIGluaXRpYWxpemF0aW9uXHJcbiAgdGFza3MucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBjb25maWc6IFBhcnRpYWw8T3J0V2FzbU1vZHVsZT4gPSB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUaGUgbnVtYmVyIG9mIHRocmVhZHMuIFdlYkFzc2VtYmx5IHdpbGwgY3JlYXRlIChNb2R1bGUubnVtVGhyZWFkcyAtIDEpIHdvcmtlcnMuIElmIGl0IGlzIDEsIG5vIHdvcmtlciB3aWxsIGJlXHJcbiAgICAgICAqIGNyZWF0ZWQuXHJcbiAgICAgICAqL1xyXG4gICAgICBudW1UaHJlYWRzLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAod2FzbVBhdGhPdmVycmlkZSB8fCB3YXNtUHJlZml4T3ZlcnJpZGUpIHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gbG9jYXRlIHRoZSBXZWJBc3NlbWJseSBmaWxlLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlLlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBTaW5jZSBFbXNjcmlwdGVuIDMuMS41OCwgdGhpcyBmdW5jdGlvbiBpcyBvbmx5IGNhbGxlZCBmb3IgdGhlIC53YXNtIGZpbGUuXHJcbiAgICAgICAqL1xyXG4gICAgICBjb25maWcubG9jYXRlRmlsZSA9IChmaWxlTmFtZSwgc2NyaXB0RGlyZWN0b3J5KSA9PlxyXG4gICAgICAgICAgd2FzbVBhdGhPdmVycmlkZSA/PyAod2FzbVByZWZpeE92ZXJyaWRlID8/IHNjcmlwdERpcmVjdG9yeSkgKyBmaWxlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBvcnRXYXNtRmFjdG9yeShjb25maWcpLnRoZW4oXHJcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgICAgbW9kdWxlID0+IHtcclxuICAgICAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgd2FzbSA9IG1vZHVsZTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgIGlmIChvYmplY3RVcmwpIHtcclxuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgZmFpbGVkIHRvIGluaXRpYWxpemVcclxuICAgICAgICAod2hhdCkgPT4ge1xyXG4gICAgICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHJlamVjdCh3aGF0KTtcclxuICAgICAgICB9KTtcclxuICB9KSk7XHJcblxyXG4gIGF3YWl0IFByb21pc2UucmFjZSh0YXNrcyk7XHJcblxyXG4gIGlmIChpc1RpbWVvdXQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgV2ViQXNzZW1ibHkgYmFja2VuZCBpbml0aWFsaXppbmcgZmFpbGVkIGR1ZSB0byB0aW1lb3V0OiAke3RpbWVvdXR9bXNgKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0SW5zdGFuY2UgPSAoKTogT3J0V2FzbU1vZHVsZSA9PiB7XHJcbiAgaWYgKGluaXRpYWxpemVkICYmIHdhc20pIHtcclxuICAgIHJldHVybiB3YXNtO1xyXG4gIH1cclxuXHJcbiAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBpcyBub3QgaW5pdGlhbGl6ZWQgeWV0LicpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRpc3Bvc2UgPSAoKTogdm9pZCA9PiB7XHJcbiAgaWYgKGluaXRpYWxpemVkICYmICFpbml0aWFsaXppbmcgJiYgIWFib3J0ZWQpIHtcclxuICAgIC8vIFRPRE86IGN1cnJlbnRseSBcIlBUaHJlYWQudGVybWluYXRlQWxsVGhyZWFkcygpXCIgaXMgbm90IGV4cG9zZWQgaW4gdGhlIHdhc20gbW9kdWxlLlxyXG4gICAgLy8gICAgICAgQW5kIHRoaXMgZnVuY3Rpb24gaXMgbm90IHlldCBjYWxsZWQgYnkgYW55IGNvZGUuXHJcbiAgICAvLyAgICAgICBJZiBpdCBpcyBuZWVkZWQgaW4gdGhlIGZ1dHVyZSwgd2Ugc2hvdWxkIGV4cG9zZSBpdCBpbiB0aGUgd2FzbSBtb2R1bGUgYW5kIHVuY29tbWVudCB0aGUgZm9sbG93aW5nIGxpbmUuXHJcblxyXG4gICAgLy8gd2FzbT8uUFRocmVhZD8udGVybWluYXRlQWxsVGhyZWFkcygpO1xyXG4gICAgd2FzbSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcclxuICAgIGluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICBhYm9ydGVkID0gdHJ1ZTtcclxuICB9XHJcbn07XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHtnZXRJbnN0YW5jZX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFsbG9jV2FzbVN0cmluZyA9IChkYXRhOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG5cclxuICBjb25zdCBkYXRhTGVuZ3RoID0gd2FzbS5sZW5ndGhCeXRlc1VURjgoZGF0YSkgKyAxO1xyXG4gIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MoZGF0YUxlbmd0aCk7XHJcbiAgd2FzbS5zdHJpbmdUb1VURjgoZGF0YSwgZGF0YU9mZnNldCwgZGF0YUxlbmd0aCk7XHJcbiAgYWxsb2NzLnB1c2goZGF0YU9mZnNldCk7XHJcblxyXG4gIHJldHVybiBkYXRhT2Zmc2V0O1xyXG59O1xyXG5cclxuaW50ZXJmYWNlIEV4dHJhT3B0aW9uc0hhbmRsZXIge1xyXG4gIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXRlcmF0ZUV4dHJhT3B0aW9ucyA9XHJcbiAgICAob3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIHByZWZpeDogc3RyaW5nLCBzZWVuOiBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PixcclxuICAgICBoYW5kbGVyOiBFeHRyYU9wdGlvbnNIYW5kbGVyKTogdm9pZCA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0JyAmJiBvcHRpb25zICE9PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHNlZW4uaGFzKG9wdGlvbnMpKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBpbiBvcHRpb25zJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlZW4uYWRkKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IChwcmVmaXgpID8gcHJlZml4ICsga2V5IDoga2V5O1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBuYW1lICsgJy4nLCBzZWVuLCBoYW5kbGVyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgaGFuZGxlcihuYW1lLCB2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICBoYW5kbGVyKG5hbWUsICh2YWx1ZSkgPyAnMScgOiAnMCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGhhbmRsZSBleHRyYSBjb25maWcgdHlwZTogJHt0eXBlb2YgdmFsdWV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4vKipcclxuICogY2hlY2sgd2ViIGFzc2VtYmx5IEFQSSdzIGxhc3QgZXJyb3IgYW5kIHRocm93IGVycm9yIGlmIGFueSBlcnJvciBvY2N1cnJlZC5cclxuICogQHBhcmFtIG1lc3NhZ2UgYSBtZXNzYWdlIHVzZWQgd2hlbiBhbiBlcnJvciBvY2N1cnJlZC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBjaGVja0xhc3RFcnJvciA9IChtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwYXJhbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoOCk7XHJcbiAgICB3YXNtLl9PcnRHZXRMYXN0RXJyb3IocGFyYW1zT2Zmc2V0LCBwYXJhbXNPZmZzZXQgKyA0KTtcclxuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uSEVBUDMyW3BhcmFtc09mZnNldCAvIDRdO1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlUG9pbnRlciA9IHdhc20uSEVBUFUzMltwYXJhbXNPZmZzZXQgLyA0ICsgMV07XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2VQb2ludGVyID8gd2FzbS5VVEY4VG9TdHJpbmcoZXJyb3JNZXNzYWdlUG9pbnRlcikgOiAnJztcclxuICAgIHRocm93IG5ldyBFcnJvcihgJHttZXNzYWdlfSBFUlJPUl9DT0RFOiAke2Vycm9yQ29kZX0sIEVSUk9SX01FU1NBR0U6ICR7ZXJyb3JNZXNzYWdlfWApO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcclxuaW1wb3J0IHthbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zfSBmcm9tICcuL3dhc20tdXRpbHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldFJ1bk9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuICBsZXQgcnVuT3B0aW9uc0hhbmRsZSA9IDA7XHJcbiAgY29uc3QgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBjb25zdCBydW5PcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICB0cnkge1xyXG4gICAgaWYgKG9wdGlvbnM/LmxvZ1NldmVyaXR5TGV2ZWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPSAyOyAgLy8gRGVmYXVsdCB0byB3YXJuaW5nXHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCkgfHxcclxuICAgICAgICBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8IG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA+IDQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgc2VydmVyaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWx9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnM/LmxvZ1ZlcmJvc2l0eUxldmVsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcnVuT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCA9IDA7ICAvLyBEZWZhdWx0IHRvIDBcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucz8udGVybWluYXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcnVuT3B0aW9ucy50ZXJtaW5hdGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGFnRGF0YU9mZnNldCA9IDA7XHJcbiAgICBpZiAob3B0aW9ucz8udGFnICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGFnRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhvcHRpb25zLnRhZywgYWxsb2NzKTtcclxuICAgIH1cclxuXHJcbiAgICBydW5PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlUnVuT3B0aW9ucyhcclxuICAgICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwhLCBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsISwgISFydW5PcHRpb25zLnRlcm1pbmF0ZSEsIHRhZ0RhdGFPZmZzZXQpO1xyXG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgPT09IDApIHtcclxuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIHJ1biBvcHRpb25zLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zPy5leHRyYSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnMob3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoa2V5LCBhbGxvY3MpO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh2YWx1ZSwgYWxsb2NzKTtcclxuXHJcbiAgICAgICAgaWYgKHdhc20uX09ydEFkZFJ1bkNvbmZpZ0VudHJ5KHJ1bk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcclxuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBydW4gY29uZmlnIGVudHJ5OiAke2tleX0gLSAke3ZhbHVlfS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbcnVuT3B0aW9uc0hhbmRsZSwgYWxsb2NzXTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xyXG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcclxuICAgIH1cclxuICAgIGFsbG9jcy5mb3JFYWNoKGFsbG9jID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcclxuaW1wb3J0IHthbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zfSBmcm9tICcuL3dhc20tdXRpbHMnO1xyXG5cclxuY29uc3QgZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsID0gKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw6IHN0cmluZ3x1bmtub3duKTogbnVtYmVyID0+IHtcclxuICBzd2l0Y2ggKGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwpIHtcclxuICAgIGNhc2UgJ2Rpc2FibGVkJzpcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICBjYXNlICdiYXNpYyc6XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgY2FzZSAnZXh0ZW5kZWQnOlxyXG4gICAgICByZXR1cm4gMjtcclxuICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgIHJldHVybiA5OTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZ3JhcGggb3B0aW1pemF0aW9uIGxldmVsOiAke2dyYXBoT3B0aW1pemF0aW9uTGV2ZWx9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZ2V0RXhlY3V0aW9uTW9kZSA9IChleGVjdXRpb25Nb2RlOiAnc2VxdWVudGlhbCd8J3BhcmFsbGVsJyk6IG51bWJlciA9PiB7XHJcbiAgc3dpdGNoIChleGVjdXRpb25Nb2RlKSB7XHJcbiAgICBjYXNlICdzZXF1ZW50aWFsJzpcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICBjYXNlICdwYXJhbGxlbCc6XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBleGVjdXRpb24gbW9kZTogJHtleGVjdXRpb25Nb2RlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGFwcGVuZERlZmF1bHRPcHRpb25zID0gKG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiB2b2lkID0+IHtcclxuICBpZiAoIW9wdGlvbnMuZXh0cmEpIHtcclxuICAgIG9wdGlvbnMuZXh0cmEgPSB7fTtcclxuICB9XHJcbiAgaWYgKCFvcHRpb25zLmV4dHJhLnNlc3Npb24pIHtcclxuICAgIG9wdGlvbnMuZXh0cmEuc2Vzc2lvbiA9IHt9O1xyXG4gIH1cclxuICBjb25zdCBzZXNzaW9uID0gb3B0aW9ucy5leHRyYS5zZXNzaW9uIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz47XHJcbiAgaWYgKCFzZXNzaW9uLnVzZV9vcnRfbW9kZWxfYnl0ZXNfZGlyZWN0bHkpIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcclxuICAgIHNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSA9ICcxJztcclxuICB9XHJcblxyXG4gIC8vIGlmIHVzaW5nIEpTRVAgd2l0aCBXZWJHUFUsIGFsd2F5cyBkaXNhYmxlIG1lbW9yeSBwYXR0ZXJuXHJcbiAgaWYgKG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzICYmXHJcbiAgICAgIG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzLnNvbWUoZXAgPT4gKHR5cGVvZiBlcCA9PT0gJ3N0cmluZycgPyBlcCA6IGVwLm5hbWUpID09PSAnd2ViZ3B1JykpIHtcclxuICAgIG9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybiA9IGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHNldEV4ZWN1dGlvblByb3ZpZGVycyA9XHJcbiAgICAoc2Vzc2lvbk9wdGlvbnNIYW5kbGU6IG51bWJlciwgZXhlY3V0aW9uUHJvdmlkZXJzOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLkV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnW10sXHJcbiAgICAgYWxsb2NzOiBudW1iZXJbXSk6IHZvaWQgPT4ge1xyXG4gICAgICBmb3IgKGNvbnN0IGVwIG9mIGV4ZWN1dGlvblByb3ZpZGVycykge1xyXG4gICAgICAgIGxldCBlcE5hbWUgPSB0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBFUCBuYW1lXHJcbiAgICAgICAgc3dpdGNoIChlcE5hbWUpIHtcclxuICAgICAgICAgIGNhc2UgJ3dlYm5uJzpcclxuICAgICAgICAgICAgZXBOYW1lID0gJ1dFQk5OJztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICBjb25zdCB3ZWJubk9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XHJcbiAgICAgICAgICAgICAgLy8gY29uc3QgY29udGV4dCA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0KT8uY29udGV4dDtcclxuICAgICAgICAgICAgICBjb25zdCBkZXZpY2VUeXBlID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OQ29udGV4dE9wdGlvbnMpPy5kZXZpY2VUeXBlO1xyXG4gICAgICAgICAgICAgIGNvbnN0IG51bVRocmVhZHMgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5Db250ZXh0T3B0aW9ucyk/Lm51bVRocmVhZHM7XHJcbiAgICAgICAgICAgICAgY29uc3QgcG93ZXJQcmVmZXJlbmNlID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OQ29udGV4dE9wdGlvbnMpPy5wb3dlclByZWZlcmVuY2U7XHJcbiAgICAgICAgICAgICAgaWYgKGRldmljZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoJ2RldmljZVR5cGUnLCBhbGxvY3MpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGRldmljZVR5cGUsIGFsbG9jcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PVxyXG4gICAgICAgICAgICAgICAgICAgIDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAnZGV2aWNlVHlwZScgLSAke2RldmljZVR5cGV9LmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAobnVtVGhyZWFkcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBKdXN0IGlnbm9yZSBpbnZhbGlkIHdlYm5uT3B0aW9ucy5udW1UaHJlYWRzLlxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVkTnVtVGhyZWFkcyA9XHJcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBudW1UaHJlYWRzICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihudW1UaHJlYWRzKSB8fCBudW1UaHJlYWRzIDwgMCkgPyAwIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bVRocmVhZHM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKCdudW1UaHJlYWRzJywgYWxsb2NzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh2YWxpZGF0ZWROdW1UaHJlYWRzLnRvU3RyaW5nKCksIGFsbG9jcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PVxyXG4gICAgICAgICAgICAgICAgICAgIDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAnbnVtVGhyZWFkcycgLSAke251bVRocmVhZHN9LmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAocG93ZXJQcmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKCdwb3dlclByZWZlcmVuY2UnLCBhbGxvY3MpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHBvd2VyUHJlZmVyZW5jZSwgYWxsb2NzKTtcclxuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XHJcbiAgICAgICAgICAgICAgICAgICAgMCkge1xyXG4gICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICdwb3dlclByZWZlcmVuY2UnIC0gJHtwb3dlclByZWZlcmVuY2V9LmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3dlYmdwdSc6XHJcbiAgICAgICAgICAgIGVwTmFtZSA9ICdKUyc7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgd2ViZ3B1T3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XHJcbiAgICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnM/LnByZWZlcnJlZExheW91dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkNIVycgJiYgd2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgIT09ICdOSFdDJykge1xyXG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHByZWZlcnJlZExheW91dCBtdXN0IGJlIGVpdGhlciAnTkNIVycgb3IgJ05IV0MnOiAke3dlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0fWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygncHJlZmVycmVkTGF5b3V0JywgYWxsb2NzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCwgYWxsb2NzKTtcclxuICAgICAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09XHJcbiAgICAgICAgICAgICAgICAgICAgMCkge1xyXG4gICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgIGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ3ByZWZlcnJlZExheW91dCcgLSAke3dlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0fS5gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICd3YXNtJzpcclxuICAgICAgICAgIGNhc2UgJ2NwdSc6XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlcE5hbWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGVwTmFtZSwgYWxsb2NzKTtcclxuICAgICAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QXBwZW5kRXhlY3V0aW9uUHJvdmlkZXIoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGVwTmFtZURhdGFPZmZzZXQpICE9PSAwKSB7XHJcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYXBwZW5kIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9LmApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRTZXNzaW9uT3B0aW9ucyA9IChvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlcltdXSA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgbGV0IHNlc3Npb25PcHRpb25zSGFuZGxlID0gMDtcclxuICBjb25zdCBhbGxvY3M6IG51bWJlcltdID0gW107XHJcblxyXG4gIGNvbnN0IHNlc3Npb25PcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICBhcHBlbmREZWZhdWx0T3B0aW9ucyhzZXNzaW9uT3B0aW9ucyk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBncmFwaE9wdGltaXphdGlvbkxldmVsID0gZ2V0R3JhcGhPcHRpbXphdGlvbkxldmVsKHNlc3Npb25PcHRpb25zLmdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPz8gJ2FsbCcpO1xyXG4gICAgY29uc3QgZXhlY3V0aW9uTW9kZSA9IGdldEV4ZWN1dGlvbk1vZGUoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uTW9kZSA/PyAnc2VxdWVudGlhbCcpO1xyXG4gICAgY29uc3QgbG9nSWREYXRhT2Zmc2V0ID1cclxuICAgICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMubG9nSWQgPT09ICdzdHJpbmcnID8gYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLmxvZ0lkLCBhbGxvY3MpIDogMDtcclxuXHJcbiAgICBjb25zdCBsb2dTZXZlcml0eUxldmVsID0gc2Vzc2lvbk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA/PyAyOyAgLy8gRGVmYXVsdCB0byAyIC0gd2FybmluZ1xyXG4gICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGxvZ1NldmVyaXR5TGV2ZWwpIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8IGxvZ1NldmVyaXR5TGV2ZWwgPiA0KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNlcnZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nU2V2ZXJpdHlMZXZlbH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsb2dWZXJib3NpdHlMZXZlbCA9IHNlc3Npb25PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID8/IDA7ICAvLyBEZWZhdWx0IHRvIDAgLSB2ZXJib3NlXHJcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nVmVyYm9zaXR5TGV2ZWwpIHx8IGxvZ1ZlcmJvc2l0eUxldmVsIDwgMCB8fCBsb2dWZXJib3NpdHlMZXZlbCA+IDQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtsb2dWZXJib3NpdHlMZXZlbH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0ID0gdHlwZW9mIHNlc3Npb25PcHRpb25zLm9wdGltaXplZE1vZGVsRmlsZVBhdGggPT09ICdzdHJpbmcnID9cclxuICAgICAgICBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCwgYWxsb2NzKSA6XHJcbiAgICAgICAgMDtcclxuXHJcbiAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZVNlc3Npb25PcHRpb25zKFxyXG4gICAgICAgIGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwsICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlQ3B1TWVtQXJlbmEsICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybiwgZXhlY3V0aW9uTW9kZSxcclxuICAgICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZVByb2ZpbGluZywgMCwgbG9nSWREYXRhT2Zmc2V0LCBsb2dTZXZlcml0eUxldmVsLCBsb2dWZXJib3NpdHlMZXZlbCxcclxuICAgICAgICBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0KTtcclxuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSA9PT0gMCkge1xyXG4gICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBjcmVhdGUgc2Vzc2lvbiBvcHRpb25zLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMpIHtcclxuICAgICAgc2V0RXhlY3V0aW9uUHJvdmlkZXJzKHNlc3Npb25PcHRpb25zSGFuZGxlLCBzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMsIGFsbG9jcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmVuYWJsZUdyYXBoQ2FwdHVyZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGVuYWJsZUdyYXBoQ2FwdHVyZSBtdXN0IGJlIGEgYm9vbGVhbiB2YWx1ZTogJHtzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmV9YCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygnZW5hYmxlR3JhcGhDYXB0dXJlJywgYWxsb2NzKTtcclxuICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLmVuYWJsZUdyYXBoQ2FwdHVyZS50b1N0cmluZygpLCBhbGxvY3MpO1xyXG4gICAgICBpZiAod2FzbS5fT3J0QWRkU2Vzc2lvbkNvbmZpZ0VudHJ5KHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XHJcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXHJcbiAgICAgICAgICAgIGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJ2VuYWJsZUdyYXBoQ2FwdHVyZScgLSAke3Nlc3Npb25PcHRpb25zLmVuYWJsZUdyYXBoQ2FwdHVyZX0uYCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykge1xyXG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlIG5hbWUgbXVzdCBiZSBhIHN0cmluZzogJHtuYW1lfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgfHwgdmFsdWUgPCAwKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlIHZhbHVlIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlcjogJHt2YWx1ZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmFtZU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhuYW1lLCBhbGxvY3MpO1xyXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRGcmVlRGltZW5zaW9uT3ZlcnJpZGUoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIG5hbWVPZmZzZXQsIHZhbHVlKSAhPT0gMCkge1xyXG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlOiAke25hbWV9IC0gJHt2YWx1ZX0uYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmV4dHJhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhzZXNzaW9uT3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGtleURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoa2V5LCBhbGxvY3MpO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh2YWx1ZSwgYWxsb2NzKTtcclxuXHJcbiAgICAgICAgaWYgKHdhc20uX09ydEFkZFNlc3Npb25Db25maWdFbnRyeShzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5RGF0YU9mZnNldCwgdmFsdWVEYXRhT2Zmc2V0KSAhPT0gMCkge1xyXG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAke2tleX0gLSAke3ZhbHVlfS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgIHdhc20uX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucyhzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XHJcbiAgICB9XHJcbiAgICBhbGxvY3MuZm9yRWFjaChhbGxvYyA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XHJcbiAgICB0aHJvdyBlO1xyXG4gIH1cclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge1RlbnNvcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbi8vIGEgZHVtbXkgdHlwZSBkZWNsYXJhdGlvbiBmb3IgRmxvYXQxNkFycmF5IGluIGNhc2UgYW55IHBvbHlmaWxsIGlzIGF2YWlsYWJsZS5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBjb25zdCBGbG9hdDE2QXJyYXk6IGFueTtcclxufVxyXG5cclxuLy8gVGhpcyBmaWxlIGluY2x1ZGVzIGNvbW1vbiBkZWZpbml0aW9ucy4gVGhleSBkbyBOT1QgaGF2ZSBkZXBlbmRlbmN5IG9uIHRoZSBXZWJBc3NlbWJseSBpbnN0YW5jZS5cclxuXHJcbi8qKlxyXG4gKiBDb3BpZWQgZnJvbSBPTk5YIGRlZmluaXRpb24uIFVzZSB0aGlzIHRvIGRyb3AgZGVwZW5kZW5jeSAnb25ueF9wcm90bycgdG8gZGVjcmVhc2UgY29tcGlsZWQgLmpzIGZpbGUgc2l6ZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBlbnVtIERhdGFUeXBlIHtcclxuICB1bmRlZmluZWQgPSAwLFxyXG4gIGZsb2F0ID0gMSxcclxuICB1aW50OCA9IDIsXHJcbiAgaW50OCA9IDMsXHJcbiAgdWludDE2ID0gNCxcclxuICBpbnQxNiA9IDUsXHJcbiAgaW50MzIgPSA2LFxyXG4gIGludDY0ID0gNyxcclxuICBzdHJpbmcgPSA4LFxyXG4gIGJvb2wgPSA5LFxyXG4gIGZsb2F0MTYgPSAxMCxcclxuICBkb3VibGUgPSAxMSxcclxuICB1aW50MzIgPSAxMixcclxuICB1aW50NjQgPSAxMyxcclxuICBjb21wbGV4NjQgPSAxNCxcclxuICBjb21wbGV4MTI4ID0gMTUsXHJcbiAgYmZsb2F0MTYgPSAxNlxyXG59XHJcblxyXG4vKipcclxuICogTWFwIHN0cmluZyB0ZW5zb3IgZGF0YSB0byBlbnVtIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0gPSAodHlwZTogc3RyaW5nKTogRGF0YVR5cGUgPT4ge1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSAnaW50OCc6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ4O1xyXG4gICAgY2FzZSAndWludDgnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDg7XHJcbiAgICBjYXNlICdib29sJzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLmJvb2w7XHJcbiAgICBjYXNlICdpbnQxNic6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQxNjtcclxuICAgIGNhc2UgJ3VpbnQxNic6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MTY7XHJcbiAgICBjYXNlICdpbnQzMic6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQzMjtcclxuICAgIGNhc2UgJ3VpbnQzMic6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MzI7XHJcbiAgICBjYXNlICdmbG9hdDE2JzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0MTY7XHJcbiAgICBjYXNlICdmbG9hdDMyJzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0O1xyXG4gICAgY2FzZSAnZmxvYXQ2NCc6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5kb3VibGU7XHJcbiAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUuc3RyaW5nO1xyXG4gICAgY2FzZSAnaW50NjQnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50NjQ7XHJcbiAgICBjYXNlICd1aW50NjQnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDY0O1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1hcCBlbnVtIHZhbHVlIHRvIHN0cmluZyB0ZW5zb3IgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nID0gKHR5cGVQcm90bzogRGF0YVR5cGUpOiBUZW5zb3IuVHlwZSA9PiB7XHJcbiAgc3dpdGNoICh0eXBlUHJvdG8pIHtcclxuICAgIGNhc2UgRGF0YVR5cGUuaW50ODpcclxuICAgICAgcmV0dXJuICdpbnQ4JztcclxuICAgIGNhc2UgRGF0YVR5cGUudWludDg6XHJcbiAgICAgIHJldHVybiAndWludDgnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5ib29sOlxyXG4gICAgICByZXR1cm4gJ2Jvb2wnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5pbnQxNjpcclxuICAgICAgcmV0dXJuICdpbnQxNic7XHJcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQxNjpcclxuICAgICAgcmV0dXJuICd1aW50MTYnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5pbnQzMjpcclxuICAgICAgcmV0dXJuICdpbnQzMic7XHJcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQzMjpcclxuICAgICAgcmV0dXJuICd1aW50MzInO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDE2OlxyXG4gICAgICByZXR1cm4gJ2Zsb2F0MTYnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDpcclxuICAgICAgcmV0dXJuICdmbG9hdDMyJztcclxuICAgIGNhc2UgRGF0YVR5cGUuZG91YmxlOlxyXG4gICAgICByZXR1cm4gJ2Zsb2F0NjQnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5zdHJpbmc6XHJcbiAgICAgIHJldHVybiAnc3RyaW5nJztcclxuICAgIGNhc2UgRGF0YVR5cGUuaW50NjQ6XHJcbiAgICAgIHJldHVybiAnaW50NjQnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS51aW50NjQ6XHJcbiAgICAgIHJldHVybiAndWludDY0JztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlUHJvdG99YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGdldCB0ZW5zb3IgZWxlbWVudCBzaXplIGluIGJ5dGVzIGJ5IHRoZSBnaXZlbiBkYXRhIHR5cGVcclxuICogQHJldHVybnMgc2l6ZSBpbiBpbnRlZ2VyIG9yIHVuZGVmaW5lZCBpZiB0aGUgZGF0YSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWRcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRUZW5zb3JFbGVtZW50U2l6ZSA9IChkYXRlVHlwZTogbnVtYmVyKTogbnVtYmVyfFxyXG4gICAgdW5kZWZpbmVkID0+IFt1bmRlZmluZWQsIDQsIDEsIDEsIDIsIDIsIDQsIDgsIHVuZGVmaW5lZCwgMSwgMiwgOCwgNCwgOCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1bZGF0ZVR5cGVdO1xyXG5cclxuLyoqXHJcbiAqIGdldCB0eXBlZCBhcnJheSBjb25zdHJ1Y3RvciBieSB0aGUgZ2l2ZW4gdGVuc29yIHR5cGVcclxuICovXHJcbmV4cG9ydCBjb25zdCB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3IgPSAodHlwZTogVGVuc29yLlR5cGUpOiBGbG9hdDMyQXJyYXlDb25zdHJ1Y3RvcnxVaW50OEFycmF5Q29uc3RydWN0b3J8XHJcbiAgICBJbnQ4QXJyYXlDb25zdHJ1Y3RvcnxVaW50MTZBcnJheUNvbnN0cnVjdG9yfEludDE2QXJyYXlDb25zdHJ1Y3RvcnxJbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfFxyXG4gICAgVWludDhBcnJheUNvbnN0cnVjdG9yfEZsb2F0NjRBcnJheUNvbnN0cnVjdG9yfFVpbnQzMkFycmF5Q29uc3RydWN0b3J8QmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvciA9PiB7XHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2Zsb2F0MTYnOlxyXG4gICAgICAgICAgLy8gYWxsb3cgRmxvYXQxNkFycmF5IHBvbHlmaWxsLlxyXG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBGbG9hdDE2QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEZsb2F0MTZBcnJheS5mcm9tID8gRmxvYXQxNkFycmF5IDogVWludDE2QXJyYXk7XHJcbiAgICAgICAgY2FzZSAnZmxvYXQzMic6XHJcbiAgICAgICAgICByZXR1cm4gRmxvYXQzMkFycmF5O1xyXG4gICAgICAgIGNhc2UgJ3VpbnQ4JzpcclxuICAgICAgICAgIHJldHVybiBVaW50OEFycmF5O1xyXG4gICAgICAgIGNhc2UgJ2ludDgnOlxyXG4gICAgICAgICAgcmV0dXJuIEludDhBcnJheTtcclxuICAgICAgICBjYXNlICd1aW50MTYnOlxyXG4gICAgICAgICAgcmV0dXJuIFVpbnQxNkFycmF5O1xyXG4gICAgICAgIGNhc2UgJ2ludDE2JzpcclxuICAgICAgICAgIHJldHVybiBJbnQxNkFycmF5O1xyXG4gICAgICAgIGNhc2UgJ2ludDMyJzpcclxuICAgICAgICAgIHJldHVybiBJbnQzMkFycmF5O1xyXG4gICAgICAgIGNhc2UgJ2Jvb2wnOlxyXG4gICAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XHJcbiAgICAgICAgY2FzZSAnZmxvYXQ2NCc6XHJcbiAgICAgICAgICByZXR1cm4gRmxvYXQ2NEFycmF5O1xyXG4gICAgICAgIGNhc2UgJ3VpbnQzMic6XHJcbiAgICAgICAgICByZXR1cm4gVWludDMyQXJyYXk7XHJcbiAgICAgICAgY2FzZSAnaW50NjQnOlxyXG4gICAgICAgICAgcmV0dXJuIEJpZ0ludDY0QXJyYXk7XHJcbiAgICAgICAgY2FzZSAndWludDY0JzpcclxuICAgICAgICAgIHJldHVybiBCaWdVaW50NjRBcnJheTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCB0eXBlOiAke3R5cGV9YCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4vKipcclxuICogTWFwIHN0cmluZyBsb2cgbGV2ZWwgdG8gaW50ZWdlciB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGxvZ0xldmVsU3RyaW5nVG9FbnVtID0gKGxvZ0xldmVsPzogJ3ZlcmJvc2UnfCdpbmZvJ3wnd2FybmluZyd8J2Vycm9yJ3wnZmF0YWwnKTogbnVtYmVyID0+IHtcclxuICBzd2l0Y2ggKGxvZ0xldmVsKSB7XHJcbiAgICBjYXNlICd2ZXJib3NlJzpcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICBjYXNlICdpbmZvJzpcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICBjYXNlICd3YXJuaW5nJzpcclxuICAgICAgcmV0dXJuIDI7XHJcbiAgICBjYXNlICdlcnJvcic6XHJcbiAgICAgIHJldHVybiAzO1xyXG4gICAgY2FzZSAnZmF0YWwnOlxyXG4gICAgICByZXR1cm4gNDtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHtsb2dMZXZlbH1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGVuc29yIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IEdQVSBidWZmZXJcclxuICovXHJcbmV4cG9ydCBjb25zdCBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUgPSAodHlwZTogVGVuc29yLlR5cGUpOiB0eXBlIGlzIFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXMgPT4gdHlwZSA9PT0gJ2Zsb2F0MzInIHx8XHJcbiAgICB0eXBlID09PSAnZmxvYXQxNicgfHwgdHlwZSA9PT0gJ2ludDMyJyB8fCB0eXBlID09PSAnaW50NjQnIHx8IHR5cGUgPT09ICd1aW50MzInIHx8IHR5cGUgPT09ICd1aW50OCcgfHxcclxuICAgIHR5cGUgPT09ICdib29sJztcclxuXHJcbi8qKlxyXG4gKiBNYXAgc3RyaW5nIGRhdGEgbG9jYXRpb24gdG8gaW50ZWdlciB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bSA9IChsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbik6IG51bWJlciA9PiB7XHJcbiAgc3dpdGNoIChsb2NhdGlvbikge1xyXG4gICAgY2FzZSAnbm9uZSc6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSAnY3B1JzpcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICBjYXNlICdjcHUtcGlubmVkJzpcclxuICAgICAgcmV0dXJuIDI7XHJcbiAgICBjYXNlICd0ZXh0dXJlJzpcclxuICAgICAgcmV0dXJuIDM7XHJcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcclxuICAgICAgcmV0dXJuIDQ7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgbG9jYXRpb246ICR7bG9jYXRpb259YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1hcCBpbnRlZ2VyIGRhdGEgbG9jYXRpb24gdG8gc3RyaW5nIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGF0YUxvY2F0aW9uRW51bVRvU3RyaW5nID0gKGxvY2F0aW9uOiBudW1iZXIpOiBUZW5zb3IuRGF0YUxvY2F0aW9ufHVuZGVmaW5lZCA9PlxyXG4gICAgKFsnbm9uZScsICdjcHUnLCAnY3B1LXBpbm5lZCcsICd0ZXh0dXJlJywgJ2dwdS1idWZmZXInXSBhcyBjb25zdClbbG9jYXRpb25dO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7aXNOb2RlfSBmcm9tICcuL3dhc20tdXRpbHMtZW52JztcclxuXHJcbi8qKlxyXG4gKiBMb2FkIGEgZmlsZSBpbnRvIGEgVWludDhBcnJheS5cclxuICpcclxuICogQHBhcmFtIGZpbGUgLSB0aGUgZmlsZSB0byBsb2FkLiBDYW4gYmUgYSBVUkwvcGF0aCwgYSBCbG9iLCBhbiBBcnJheUJ1ZmZlciwgb3IgYSBVaW50OEFycmF5LlxyXG4gKiBAcmV0dXJucyBhIFVpbnQ4QXJyYXkgY29udGFpbmluZyB0aGUgZmlsZSBkYXRhLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGxvYWRGaWxlID0gYXN5bmMoZmlsZTogc3RyaW5nfEJsb2J8QXJyYXlCdWZmZXJMaWtlfFVpbnQ4QXJyYXkpOiBQcm9taXNlPFVpbnQ4QXJyYXk+ID0+IHtcclxuICBpZiAodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBpZiAoaXNOb2RlKSB7XHJcbiAgICAgIC8vIGxvYWQgZmlsZSBpbnRvIEFycmF5QnVmZmVyIGluIE5vZGUuanNcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7cmVhZEZpbGV9ID0gcmVxdWlyZSgnbm9kZTpmcy9wcm9taXNlcycpO1xyXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShhd2FpdCByZWFkRmlsZShmaWxlKSk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAoZS5jb2RlID09PSAnRVJSX0ZTX0ZJTEVfVE9PX0xBUkdFJykge1xyXG4gICAgICAgICAgLy8gZmlsZSBpcyB0b28gbGFyZ2UsIHVzZSBmcy5jcmVhdGVSZWFkU3RyZWFtIGluc3RlYWRcclxuICAgICAgICAgIGNvbnN0IHtjcmVhdGVSZWFkU3RyZWFtfSA9IHJlcXVpcmUoJ25vZGU6ZnMnKTtcclxuICAgICAgICAgIGNvbnN0IHN0cmVhbSA9IGNyZWF0ZVJlYWRTdHJlYW0oZmlsZSk7XHJcbiAgICAgICAgICBjb25zdCBjaHVua3M6IFVpbnQ4QXJyYXlbXSA9IFtdO1xyXG4gICAgICAgICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBzdHJlYW0pIHtcclxuICAgICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KEJ1ZmZlci5jb25jYXQoY2h1bmtzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGxvYWQgZmlsZSBpbnRvIEFycmF5QnVmZmVyIGluIGJyb3dzZXJzXHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZmlsZSk7XHJcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZhaWxlZCB0byBsb2FkIGV4dGVybmFsIGRhdGEgZmlsZTogJHtmaWxlfWApO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGhIZWFkZXIgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1MZW5ndGgnKTtcclxuICAgICAgY29uc3QgZmlsZVNpemUgPSBjb250ZW50TGVuZ3RoSGVhZGVyID8gcGFyc2VJbnQoY29udGVudExlbmd0aEhlYWRlciwgMTApIDogMDtcclxuICAgICAgaWYgKGZpbGVTaXplIDwgMTA3Mzc0MTgyNCAvKiAxR0IgKi8pIHtcclxuICAgICAgICAvLyB3aGVuIENvbnRlbnQtTGVuZ3RoIGhlYWRlciBpcyBub3Qgc2V0LCB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBmaWxlIHNpemUuIFdlIGFzc3VtZSBpdCBpcyBzbWFsbCBlbm91Z2ggdG9cclxuICAgICAgICAvLyBsb2FkIGludG8gbWVtb3J5LlxyXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBmaWxlIGlzIHRvbyBsYXJnZSwgdXNlIHN0cmVhbSBpbnN0ZWFkXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5ib2R5KSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZhaWxlZCB0byBsb2FkIGV4dGVybmFsIGRhdGEgZmlsZTogJHtmaWxlfSwgbm8gcmVzcG9uc2UgYm9keS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlcjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gdHJ5IHRvIGNyZWF0ZSBBcnJheUJ1ZmZlciBkaXJlY3RseVxyXG4gICAgICAgICAgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGZpbGVTaXplKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFJhbmdlRXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gdXNlIFdlYkFzc2VtYmx5IE1lbW9yeSB0byBhbGxvY2F0ZSBsYXJnZXIgQXJyYXlCdWZmZXJcclxuICAgICAgICAgICAgY29uc3QgcGFnZXMgPSBNYXRoLmNlaWwoZmlsZVNpemUgLyA2NTUzNik7XHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IG5ldyBXZWJBc3NlbWJseS5NZW1vcnkoe2luaXRpYWw6IHBhZ2VzLCBtYXhpbXVtOiBwYWdlc30pLmJ1ZmZlcjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgIGNvbnN0IHtkb25lLCB2YWx1ZX0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xyXG4gICAgICAgICAgaWYgKGRvbmUpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBjaHVua1NpemUgPSB2YWx1ZS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgICAgY29uc3QgY2h1bmsgPSBuZXcgVWludDhBcnJheShidWZmZXIsIG9mZnNldCwgY2h1bmtTaXplKTtcclxuICAgICAgICAgIGNodW5rLnNldCh2YWx1ZSk7XHJcbiAgICAgICAgICBvZmZzZXQgKz0gY2h1bmtTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCAwLCBmaWxlU2l6ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfSBlbHNlIGlmIChmaWxlIGluc3RhbmNlb2YgQmxvYikge1xyXG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKSk7XHJcbiAgfSBlbHNlIGlmIChmaWxlIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgcmV0dXJuIGZpbGU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBuZXcgVWludDhBcnJheShmaWxlKTtcclxuICB9XHJcbn07XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHtFbnYsIEluZmVyZW5jZVNlc3Npb24sIFRlbnNvcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB7U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSwgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEsIFRlbnNvck1ldGFkYXRhfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcclxuaW1wb3J0IHtzZXRSdW5PcHRpb25zfSBmcm9tICcuL3J1bi1vcHRpb25zJztcclxuaW1wb3J0IHtzZXRTZXNzaW9uT3B0aW9uc30gZnJvbSAnLi9zZXNzaW9uLW9wdGlvbnMnO1xyXG5pbXBvcnQge2RhdGFMb2NhdGlvblN0cmluZ1RvRW51bSwgZ2V0VGVuc29yRWxlbWVudFNpemUsIGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSwgbG9nTGV2ZWxTdHJpbmdUb0VudW0sIHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nLCB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bSwgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yfSBmcm9tICcuL3dhc20tY29tbW9uJztcclxuaW1wb3J0IHtnZXRJbnN0YW5jZX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xyXG5pbXBvcnQge2FsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3J9IGZyb20gJy4vd2FzbS11dGlscyc7XHJcbmltcG9ydCB7bG9hZEZpbGV9IGZyb20gJy4vd2FzbS11dGlscy1sb2FkLWZpbGUnO1xyXG5cclxuLy8gI3JlZ2lvbiBJbml0aWFsaXphdGlvbnNcclxuXHJcbi8qKlxyXG4gKiBUaGVyZSBhcmUgNCBkaWZmZXJlbnQgXCJpbml0aWFsaXphdGlvblwiIHN0ZXBzIGZvciBPUlQuIFRoZXkgaGFwcGVuIGluIGRpZmZlcmVudCBwbGFjZXMgYW5kIGRpZmZlcmVudCB0aW1lLlxyXG4gKlxyXG4gKiAxLiBKYXZhU2NyaXB0IGluaXRpYWxpemF0aW9uIGZvciBvbm54cnVudGltZS1jb21tb24gYW5kIG9ubnhydW50aW1lLXdlYi5cclxuICogICAgVGhpcyBpcyB0aGUgZmlyc3QgaW5pdGlhbGl6YXRpb24gc3RlcC4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgY2FsbHMgb25ueHJ1bnRpbWUtY29tbW9uJ3MgcmVnaXN0ZXJCYWNrZW5kKClcclxuICogZnVuY3Rpb24gbXVsdGlwbGUgdGltZXMgdG8gcmVnaXN0ZXIgYWxsIHRoZSBhdmFpbGFibGUgYmFja2VuZHMuIFRoZSBiYWNrZW5kIHJlZ2lzdHJhdGlvbiBpcyB2ZXJ5IGZhc3QuIEl0IG9ubHlcclxuICogcmVnaXN0ZXJzIHRoZSBiYWNrZW5kIG5hbWUgd2l0aCB0aGUgdW5pbml0aWFsaXplZCBiYWNrZW5kIG9iamVjdC4gTm8gaGVhdnkgaW5pdGlhbGl6YXRpb24gaXMgZG9uZSBpbiB0aGlzIHN0ZXAuXHJcbiAqICAgIFJlZmVyIHRvIHdlYi9saWIvaW5kZXgudHMgZm9yIHRoZSBiYWNrZW5kIHJlZ2lzdHJhdGlvbi5cclxuICpcclxuICogMi4gV2ViQXNzZW1ibHkgYXJ0aWZhY3QgaW5pdGlhbGl6YXRpb24uXHJcbiAqICAgIFRoaXMgaGFwcGVucyB3aGVuIGFueSByZWdpc3RlcmVkIHdhc20gYmFja2VuZCBpcyB1c2VkIGZvciB0aGUgZmlyc3QgdGltZSAoaWUuIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgb3JcclxuICogYG9ydC5UcmFpbmluZ1Nlc3Npb24uY3JlYXRlKClgIGlzIGNhbGxlZCkuIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIGRvZXMgdGhlIGZvbGxvd2luZ3M6XHJcbiAqICAgICAtIGNyZWF0ZSBhIHByb3h5IHdvcmtlciBhbmQgbWFrZSBzdXJlIHRoZSBwcm94eSB3b3JrZXIgaXMgcmVhZHkgdG8gcmVjZWl2ZSBtZXNzYWdlcywgaWYgcHJveHkgaXMgZW5hYmxlZC5cclxuICogICAgIC0gcGVyZm9ybSBmZWF0dXJlIGRldGVjdGlvbiwgbG9jYXRlIGNvcnJlY3QgV2ViQXNzZW1ibHkgYXJ0aWZhY3QgcGF0aCBhbmQgY2FsbCB0aGUgRW1zY3JpcHRlbiBnZW5lcmF0ZWRcclxuICogSmF2YVNjcmlwdCBjb2RlIHRvIGluaXRpYWxpemUgdGhlIFdlYkFzc2VtYmx5IHJ1bnRpbWUuXHJcbiAqICAgICAgICAgLSBpZiBwcm94eSBpcyBlbmFibGVkLCB0aGlzIHN0ZXAgaGFwcGVucyBpbiB0aGUgcHJveHkgd29ya2VyIHVzaW5nIG1lc3NhZ2UgJ2luaXQtd2FzbScuXHJcbiAqICAgICAgICAgLSBkb3dubG9hZGluZyB0aGUgJ29ydC13YXNtey4uLn0ud2FzbScgZmlsZSBpcyBkb25lIGluIHRoaXMgc3RlcC5cclxuICogICAgICAgICAtIGlmIG11bHRpLXRocmVhZCBpcyBlbmFibGVkLCBvbmUgb3IgbW9yZSB3ZWJ3b3JrZXIgd2lsbCBiZSBjcmVhdGVkIHRvIGluaXRpYWxpemUgdGhlIFBUaHJlYWQgdGhyZWFkcG9vbC5cclxuICpcclxuICogMy4gT1JUIGVudmlyb25tZW50IGluaXRpYWxpemF0aW9uLlxyXG4gKiAgICBUaGlzIGhhcHBlbnMgYWZ0ZXIgc3RlcCAyLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBwZXJmb3JtcyBPTk5YIFJ1bnRpbWUgZW52aXJvbm1lbnQgaW5pdGlhbGl6YXRpb24uXHJcbiAqIEZ1bmN0aW9uIGBfT3J0SW5pdCgpYCBpcyBjYWxsZWQgaW4gdGhpcyBzdGVwLlxyXG4gKiAgICAgLSBpZiBwcm94eSBpcyBlbmFibGVkLCB0aGlzIHN0ZXAgaGFwcGVucyBpbiB0aGUgcHJveHkgd29ya2VyIHVzaW5nIG1lc3NhZ2UgJ2luaXQtb3J0Jy5cclxuICogICAgIC0gbG9nZ2luZyBsZXZlbCAob3J0LmVudi5sb2dMZXZlbCkgYW5kIHRocmVhZCBudW1iZXIgKG9ydC5lbnYud2FzbS5udW1UaHJlYWRzKSBhcmUgc2V0IGluIHRoaXMgc3RlcC5cclxuICpcclxuICogNC4gU2Vzc2lvbiBpbml0aWFsaXphdGlvbi5cclxuICogICAgVGhpcyBoYXBwZW5zIHdoZW4gYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBvciBgb3J0LlRyYWluaW5nU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkLiBVbmxpa2UgdGhlIGZpcnN0IDNcclxuICogc3RlcHMgKHRoZXkgb25seSBjYWxsZWQgb25jZSksIHRoaXMgc3RlcCB3aWxsIGJlIGRvbmUgZm9yIGVhY2ggc2Vzc2lvbi4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgZG9lcyB0aGVcclxuICogZm9sbG93aW5nczpcclxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVSTDpcclxuICogICAgLSBkb3dubG9hZCB0aGUgbW9kZWwgZGF0YSBmcm9tIHRoZSBVUkwuXHJcbiAqICAgIC0gY29weSB0aGUgbW9kZWwgZGF0YSB0byB0aGUgV0FTTSBoZWFwLiAocHJveHk6ICdjb3B5LWZyb20nKVxyXG4gKiAgICAtIGRlcmVmZXJlbmNlIHRoZSBtb2RlbCBidWZmZXIuIFRoaXMgc3RlcCBhbGxvd3MgdGhlIG9yaWdpbmFsIEFycmF5QnVmZmVyIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxyXG4gKiAgICAtIGNhbGwgYF9PcnRDcmVhdGVTZXNzaW9uKClgIHRvIGNyZWF0ZSB0aGUgc2Vzc2lvbi4gKHByb3h5OiAnY3JlYXRlJylcclxuICpcclxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVpbnQ4QXJyYXkgb2JqZWN0OlxyXG4gKiAgICAtIGNvcHkgdGhlIG1vZGVsIGRhdGEgdG8gdGhlIFdBU00gaGVhcC4gKHByb3h5OiAnY29weS1mcm9tJylcclxuICogICAgLSBjYWxsIGBfT3J0Q3JlYXRlU2Vzc2lvbigpYCB0byBjcmVhdGUgdGhlIHNlc3Npb24uIChwcm94eTogJ2NyZWF0ZScpXHJcbiAqXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGluaXRpYWxpemUgT1JUIGVudmlyb25tZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0gbnVtVGhyZWFkcyBTZXRHbG9iYWxJbnRyYU9wTnVtVGhyZWFkcyhudW1UaHJlYWRzKVxyXG4gKiBAcGFyYW0gbG9nZ2luZ0xldmVsIENyZWF0ZUVudihzdGF0aWNfY2FzdDxPcnRMb2dnaW5nTGV2ZWw+KGxvZ2dpbmdfbGV2ZWwpKVxyXG4gKi9cclxuY29uc3QgaW5pdE9ydCA9IChudW1UaHJlYWRzOiBudW1iZXIsIGxvZ2dpbmdMZXZlbDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgY29uc3QgZXJyb3JDb2RlID0gZ2V0SW5zdGFuY2UoKS5fT3J0SW5pdChudW1UaHJlYWRzLCBsb2dnaW5nTGV2ZWwpO1xyXG4gIGlmIChlcnJvckNvZGUgIT09IDApIHtcclxuICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGluaXRpYWxpemUgb25ueHJ1bnRpbWUuJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGludGlhbGl6ZSBydW50aW1lIGVudmlyb25tZW50LlxyXG4gKiBAcGFyYW0gZW52IHBhc3NlZCBpbiB0aGUgZW52aXJvbm1lbnQgY29uZmlnIG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpbml0UnVudGltZSA9IGFzeW5jKGVudjogRW52KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgLy8gaW5pdCBPUlRcclxuICBpbml0T3J0KGVudi53YXNtLm51bVRocmVhZHMhLCBsb2dMZXZlbFN0cmluZ1RvRW51bShlbnYubG9nTGV2ZWwpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBwZXJmb3JtIEVQIHNwZWNpZmljIGluaXRpYWxpemF0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0gZW52XHJcbiAqIEBwYXJhbSBlcE5hbWVcclxuICovXHJcbmV4cG9ydCBjb25zdCBpbml0RXAgPSBhc3luYyhlbnY6IEVudiwgZXBOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQKSB7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xyXG4gICAgY29uc3QgaW5pdEpzZXAgPSByZXF1aXJlKCcuL2pzZXAvaW5pdCcpLmluaXQ7XHJcblxyXG4gICAgaWYgKGVwTmFtZSA9PT0gJ3dlYmdwdScpIHtcclxuICAgICAgLy8gcGVyZm9ybSBXZWJHUFUgYXZhaWxhYmlsaXR5IGNoZWNrXHJcbiAgICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhbmF2aWdhdG9yLmdwdSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViR1BVIGlzIG5vdCBzdXBwb3J0ZWQgaW4gY3VycmVudCBlbnZpcm9ubWVudCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgYWRhcHRlciA9IGVudi53ZWJncHUuYWRhcHRlciBhcyBHUFVBZGFwdGVyIHwgbnVsbDtcclxuICAgICAgaWYgKCFhZGFwdGVyKSB7XHJcbiAgICAgICAgLy8gaWYgYWRhcHRlciBpcyBub3Qgc2V0LCByZXF1ZXN0IGEgbmV3IGFkYXB0ZXIuXHJcbiAgICAgICAgY29uc3QgcG93ZXJQcmVmZXJlbmNlID0gZW52LndlYmdwdS5wb3dlclByZWZlcmVuY2U7XHJcbiAgICAgICAgaWYgKHBvd2VyUHJlZmVyZW5jZSAhPT0gdW5kZWZpbmVkICYmIHBvd2VyUHJlZmVyZW5jZSAhPT0gJ2xvdy1wb3dlcicgJiZcclxuICAgICAgICAgICAgcG93ZXJQcmVmZXJlbmNlICE9PSAnaGlnaC1wZXJmb3JtYW5jZScpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwb3dlclByZWZlcmVuY2Ugc2V0dGluZzogXCIke3Bvd2VyUHJlZmVyZW5jZX1cImApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmb3JjZUZhbGxiYWNrQWRhcHRlciA9IGVudi53ZWJncHUuZm9yY2VGYWxsYmFja0FkYXB0ZXI7XHJcbiAgICAgICAgaWYgKGZvcmNlRmFsbGJhY2tBZGFwdGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGZvcmNlRmFsbGJhY2tBZGFwdGVyICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBmb3JjZUZhbGxiYWNrQWRhcHRlciBzZXR0aW5nOiBcIiR7Zm9yY2VGYWxsYmFja0FkYXB0ZXJ9XCJgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYWRhcHRlciA9IGF3YWl0IG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoe3Bvd2VyUHJlZmVyZW5jZSwgZm9yY2VGYWxsYmFja0FkYXB0ZXJ9KTtcclxuICAgICAgICBpZiAoIWFkYXB0ZXIpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAnRmFpbGVkIHRvIGdldCBHUFUgYWRhcHRlci4gJyArXHJcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgbmVlZCB0byBlbmFibGUgZmxhZyBcIi0tZW5hYmxlLXVuc2FmZS13ZWJncHVcIiBpZiB5b3UgYXJlIHVzaW5nIENocm9tZS4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gaWYgYWRhcHRlciBpcyBzZXQsIHZhbGlkYXRlIGl0LlxyXG4gICAgICAgIGlmICh0eXBlb2YgYWRhcHRlci5saW1pdHMgIT09ICdvYmplY3QnIHx8IHR5cGVvZiBhZGFwdGVyLmZlYXR1cmVzICE9PSAnb2JqZWN0JyB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgYWRhcHRlci5yZXF1ZXN0RGV2aWNlICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgR1BVIGFkYXB0ZXIgc2V0IGluIGBlbnYud2ViZ3B1LmFkYXB0ZXJgLiBJdCBtdXN0IGJlIGEgR1BVQWRhcHRlciBvYmplY3QuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBhd2FpdCBpbml0SnNlcCgnd2ViZ3B1JywgZ2V0SW5zdGFuY2UoKSwgZW52LCBhZGFwdGVyKTtcclxuICAgIH1cclxuICAgIGlmIChlcE5hbWUgPT09ICd3ZWJubicpIHtcclxuICAgICAgLy8gcGVyZm9ybSBXZWJOTiBhdmFpbGFiaWxpdHkgY2hlY2tcclxuICAgICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnIHx8ICEobmF2aWdhdG9yIGFzIHVua25vd24gYXMge21sOiB1bmtub3dufSkubWwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYk5OIGlzIG5vdCBzdXBwb3J0ZWQgaW4gY3VycmVudCBlbnZpcm9ubWVudCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhd2FpdCBpbml0SnNlcCgnd2Vibm4nLCBnZXRJbnN0YW5jZSgpLCBlbnYpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vICNlbmRyZWdpb24gSW5pdGlhbGl6YXRpb25zXHJcblxyXG4vKipcclxuICogdmFsaWQgZGF0YSBsb2NhdGlvbnMgZm9yIGlucHV0L291dHB1dCB0ZW5zb3JzLlxyXG4gKi9cclxudHlwZSBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dCA9ICdjcHUnfCdjcHUtcGlubmVkJ3wnZ3B1LWJ1ZmZlcic7XHJcblxyXG50eXBlIElPQmluZGluZ1N0YXRlID0ge1xyXG4gIC8qKlxyXG4gICAqIHRoZSBoYW5kbGUgb2YgSU8gYmluZGluZy5cclxuICAgKi9cclxuICByZWFkb25seSBoYW5kbGU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogdGhlIHByZWZlcnJlZCBsb2NhdGlvbiBmb3IgZWFjaCBvdXRwdXQgdGVuc29yLlxyXG4gICAqXHJcbiAgICogdmFsdWUgaXMgb25lIG9mICdjcHUnLCAnY3B1LXBpbm5lZCcsICdncHUtYnVmZmVyJy5cclxuICAgKi9cclxuICByZWFkb25seSBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnM6IHJlYWRvbmx5IFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0W107XHJcblxyXG4gIC8qKlxyXG4gICAqIGVudW0gdmFsdWUgb2YgdGhlIHByZWZlcnJlZCBsb2NhdGlvbiBmb3IgZWFjaCBvdXRwdXQgdGVuc29yLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IHJlYWRvbmx5IG51bWJlcltdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICB0dXBsZSBlbGVtZW50cyBhcmU6IEluZmVyZW5jZVNlc3Npb24gSUQ7IGlucHV0TmFtZXNVVEY4RW5jb2RlZDsgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZDsgYmluZGluZ1N0YXRlXHJcbiAqL1xyXG50eXBlIFNlc3Npb25NZXRhZGF0YSA9IFtcclxuICBpbmZlcmVuY2VTZXNzaW9uSWQ6IG51bWJlciwgaW5wdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZDogbnVtYmVyW10sXHJcbiAgYmluZGluZ1N0YXRlOiBJT0JpbmRpbmdTdGF0ZXxudWxsLCBlbmFibGVHcmFwaENhcHR1cmU6IGJvb2xlYW4sIGlucHV0T3V0cHV0Qm91bmQ6IGJvb2xlYW5cclxuXTtcclxuXHJcbmNvbnN0IGFjdGl2ZVNlc3Npb25zID0gbmV3IE1hcDxudW1iZXIsIFNlc3Npb25NZXRhZGF0YT4oKTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgdGhlIGlucHV0L291dHB1dCBjb3VudCBvZiB0aGUgc2Vzc2lvbi5cclxuICogQHBhcmFtIHNlc3Npb25IYW5kbGUgdGhlIGhhbmRsZSByZXByZXNlbnRpbmcgdGhlIHNlc3Npb24uIHNob3VsZCBiZSBub24temVyby5cclxuICogQHJldHVybnMgYSB0dXBsZSBpbmNsdWRpbmcgMiBudW1iZXJzLCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGNvdW50IGFuZCBvdXRwdXQgY291bnQuXHJcbiAqL1xyXG5jb25zdCBnZXRTZXNzaW9uSW5wdXRPdXRwdXRDb3VudCA9IChzZXNzaW9uSGFuZGxlOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoOCk7XHJcbiAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRHZXRJbnB1dE91dHB1dENvdW50KHNlc3Npb25IYW5kbGUsIGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyA0KTtcclxuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcclxuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IGNvdW50LicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt3YXNtLkhFQVAzMltkYXRhT2Zmc2V0IC8gNF0sIHdhc20uSEVBUDMyW2RhdGFPZmZzZXQgLyA0ICsgMV1dO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGFsbG9jYXRlIHRoZSBtZW1vcnkgYW5kIG1lbWNweSB0aGUgZXh0ZXJuYWwgYnVmZmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gbW9kZWwgLSB0aGUgZXh0ZXJuYWwgYnVmZmVyIGNvbnRhaW5pbmcgdGhlIG1vZGVsIGRhdGEuIE11c3Qgbm90IGJlIHRoZSBzYW1lIGJ1ZmZlciBhcyB0aGUgV0FTTSBoZWFwLlxyXG4gKiBAcmV0dXJucyBhIDItZWxlbWVudHMgdHVwbGUgLSB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgYWxsb2NhdGVkIGJ1ZmZlclxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIgPSAobW9kZWw6IFVpbnQ4QXJyYXkpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuICBjb25zdCBtb2RlbERhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MobW9kZWwuYnl0ZUxlbmd0aCk7XHJcbiAgaWYgKG1vZGVsRGF0YU9mZnNldCA9PT0gMCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBjcmVhdGUgYSBzZXNzaW9uLiBmYWlsZWQgdG8gYWxsb2NhdGUgYSBidWZmZXIgb2Ygc2l6ZSAke21vZGVsLmJ5dGVMZW5ndGh9LmApO1xyXG4gIH1cclxuICB3YXNtLkhFQVBVOC5zZXQobW9kZWwsIG1vZGVsRGF0YU9mZnNldCk7XHJcbiAgcmV0dXJuIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsLmJ5dGVMZW5ndGhdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGNyZWF0ZSBhbiBpbmZlcmVuY2Ugc2Vzc2lvbiBmcm9tIGEgbW9kZWwgZGF0YSBidWZmZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSBtb2RlbERhdGEgLSBlaXRoZXIgYSBVaW50OEFycmF5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG1vZGVsIGRhdGEsIG9yIGEgMi1lbGVtZW50cyB0dXBsZSBjb250YWluaW5nIHRoZVxyXG4gKiAgICAgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YSBidWZmZXIuXHJcbiAqIEBwYXJhbSBvcHRpb25zIGFuIG9wdGlvbmFsIHNlc3Npb24gb3B0aW9ucyBvYmplY3QuXHJcbiAqIEByZXR1cm5zIGEgMy1lbGVtZW50cyB0dXBsZSBjb250YWluaW5nIFtzZXNzaW9uIGhhbmRsZSwgaW5wdXQgbmFtZXMsIG91dHB1dCBuYW1lc11cclxuICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID0gYXN5bmMoXHJcbiAgICBtb2RlbERhdGE6IFVpbnQ4QXJyYXl8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsXHJcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPiA9PiB7XHJcbiAgbGV0IG1vZGVsRGF0YU9mZnNldDogbnVtYmVyLCBtb2RlbERhdGFMZW5ndGg6IG51bWJlcjtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkobW9kZWxEYXRhKSkge1xyXG4gICAgLy8gaWYgbW9kZWwgZGF0YSBpcyBhbiBhcnJheSwgaXQgbXVzdCBiZSBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YVxyXG4gICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IG1vZGVsRGF0YTtcclxuICB9IGVsc2UgaWYgKG1vZGVsRGF0YS5idWZmZXIgPT09IHdhc20uSEVBUFU4LmJ1ZmZlcikge1xyXG4gICAgLy8gaWYgbW9kZWwgZGF0YSB1c2VzIHRoZSBzYW1lIGJ1ZmZlciBhcyB0aGUgV0FTTSBoZWFwLCB3ZSBkb24ndCBuZWVkIHRvIGNvcHkgaXQuXHJcbiAgICBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGhdID0gW21vZGVsRGF0YS5ieXRlT2Zmc2V0LCBtb2RlbERhdGEuYnl0ZUxlbmd0aF07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIG90aGVyd2lzZSwgY29weSB0aGUgbW9kZWwgZGF0YSB0byB0aGUgV0FTTSBoZWFwLlxyXG4gICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIobW9kZWxEYXRhKTtcclxuICB9XHJcblxyXG4gIGxldCBzZXNzaW9uSGFuZGxlID0gMDtcclxuICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xyXG4gIGxldCBpb0JpbmRpbmdIYW5kbGUgPSAwO1xyXG4gIGxldCBhbGxvY3M6IG51bWJlcltdID0gW107XHJcbiAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gW107XHJcbiAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IFtdO1xyXG5cclxuICB0cnkge1xyXG4gICAgW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdID0gc2V0U2Vzc2lvbk9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnM/LmV4dGVybmFsRGF0YSAmJiB3YXNtLm1vdW50RXh0ZXJuYWxEYXRhKSB7XHJcbiAgICAgIGNvbnN0IGxvYWRpbmdQcm9taXNlcyA9IFtdO1xyXG4gICAgICBmb3IgKGNvbnN0IGZpbGUgb2Ygb3B0aW9ucy5leHRlcm5hbERhdGEpIHtcclxuICAgICAgICBjb25zdCBwYXRoID0gdHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnID8gZmlsZSA6IGZpbGUucGF0aDtcclxuICAgICAgICBsb2FkaW5nUHJvbWlzZXMucHVzaChsb2FkRmlsZSh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycgPyBmaWxlIDogZmlsZS5kYXRhKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgd2FzbS5tb3VudEV4dGVybmFsRGF0YSEocGF0aCwgZGF0YSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB3YWl0IGZvciBhbGwgZXh0ZXJuYWwgZGF0YSBmaWxlcyB0byBiZSBsb2FkZWRcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobG9hZGluZ1Byb21pc2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXNzaW9uSGFuZGxlID0gYXdhaXQgd2FzbS5fT3J0Q3JlYXRlU2Vzc2lvbihtb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aCwgc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xyXG4gICAgaWYgKHNlc3Npb25IYW5kbGUgPT09IDApIHtcclxuICAgICAgY2hlY2tMYXN0RXJyb3IoJ0NhblxcJ3QgY3JlYXRlIGEgc2Vzc2lvbi4nKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBbaW5wdXRDb3VudCwgb3V0cHV0Q291bnRdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSk7XHJcblxyXG4gICAgY29uc3QgZW5hYmxlR3JhcGhDYXB0dXJlID0gISFvcHRpb25zPy5lbmFibGVHcmFwaENhcHR1cmU7XHJcblxyXG4gICAgY29uc3QgaW5wdXROYW1lcyA9IFtdO1xyXG4gICAgY29uc3Qgb3V0cHV0TmFtZXMgPSBbXTtcclxuICAgIGNvbnN0IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcclxuICAgICAgY29uc3QgbmFtZSA9IHdhc20uX09ydEdldElucHV0TmFtZShzZXNzaW9uSGFuZGxlLCBpKTtcclxuICAgICAgaWYgKG5hbWUgPT09IDApIHtcclxuICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgYW4gaW5wdXQgbmFtZS4nKTtcclxuICAgICAgfVxyXG4gICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lKTtcclxuICAgICAgaW5wdXROYW1lcy5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG5hbWUpKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xyXG4gICAgICBjb25zdCBuYW1lID0gd2FzbS5fT3J0R2V0T3V0cHV0TmFtZShzZXNzaW9uSGFuZGxlLCBpKTtcclxuICAgICAgaWYgKG5hbWUgPT09IDApIHtcclxuICAgICAgICBjaGVja0xhc3RFcnJvcignQ2FuXFwndCBnZXQgYW4gb3V0cHV0IG5hbWUuJyk7XHJcbiAgICAgIH1cclxuICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5wdXNoKG5hbWUpO1xyXG4gICAgICBjb25zdCBuYW1lU3RyaW5nID0gd2FzbS5VVEY4VG9TdHJpbmcobmFtZSk7XHJcbiAgICAgIG91dHB1dE5hbWVzLnB1c2gobmFtZVN0cmluZyk7XHJcblxyXG4gICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMucHVzaCgnZ3B1LWJ1ZmZlcicpO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdHlwZW9mIG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uID09PSAnc3RyaW5nJyA/XHJcbiAgICAgICAgICAgIG9wdGlvbnMucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gOlxyXG4gICAgICAgICAgICBvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj8uW25hbWVTdHJpbmddID8/ICdjcHUnO1xyXG4gICAgICAgIGlmIChsb2NhdGlvbiAhPT0gJ2NwdScgJiYgbG9jYXRpb24gIT09ICdjcHUtcGlubmVkJyAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcHJlZmVycmVkIG91dHB1dCBsb2NhdGlvbjogJHtsb2NhdGlvbn0uYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbmFibGVHcmFwaENhcHR1cmUgJiYgbG9jYXRpb24gIT09ICdncHUtYnVmZmVyJykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHByZWZlcnJlZCBvdXRwdXQgbG9jYXRpb246ICR7XHJcbiAgICAgICAgICAgICAgbG9jYXRpb259LiBPbmx5ICdncHUtYnVmZmVyJyBsb2NhdGlvbiBpcyBzdXBwb3J0ZWQgd2hlbiBlbmFibGVHcmFwaENhcHR1cmUgaXMgdHJ1ZS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2gobG9jYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlIElPIGJpbmRpbmcgb25seSB3aGVuIGF0IGxlYXN0IG9uZSBvdXRwdXQgaXMgcHJlZmZlcmVkIHRvIGJlIG9uIEdQVS5cclxuICAgIGxldCBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlfG51bGwgPSBudWxsO1xyXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCAmJiBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMuc29tZShsID0+IGwgPT09ICdncHUtYnVmZmVyJykpIHtcclxuICAgICAgaW9CaW5kaW5nSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlQmluZGluZyhzZXNzaW9uSGFuZGxlKTtcclxuICAgICAgaWYgKGlvQmluZGluZ0hhbmRsZSA9PT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGNyZWF0ZSBJTyBiaW5kaW5nLicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBiaW5kaW5nU3RhdGUgPSB7XHJcbiAgICAgICAgaGFuZGxlOiBpb0JpbmRpbmdIYW5kbGUsXHJcbiAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLFxyXG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5tYXAobCA9PiBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obCkpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGl2ZVNlc3Npb25zLnNldChcclxuICAgICAgICBzZXNzaW9uSGFuZGxlLFxyXG4gICAgICAgIFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGJpbmRpbmdTdGF0ZSwgZW5hYmxlR3JhcGhDYXB0dXJlLCBmYWxzZV0pO1xyXG4gICAgcmV0dXJuIFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzLCBvdXRwdXROYW1lc107XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goYnVmID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XHJcbiAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goYnVmID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XHJcblxyXG4gICAgaWYgKGlvQmluZGluZ0hhbmRsZSAhPT0gMCkge1xyXG4gICAgICB3YXNtLl9PcnRSZWxlYXNlQmluZGluZyhpb0JpbmRpbmdIYW5kbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZXNzaW9uSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgIHdhc20uX09ydFJlbGVhc2VTZXNzaW9uKHNlc3Npb25IYW5kbGUpO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgZTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgd2FzbS5fZnJlZShtb2RlbERhdGFPZmZzZXQpO1xyXG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgIHdhc20uX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucyhzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XHJcbiAgICB9XHJcbiAgICBhbGxvY3MuZm9yRWFjaChhbGxvYyA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XHJcblxyXG4gICAgLy8gdW5tb3VudCBleHRlcm5hbCBkYXRhIGlmIG5lY2Vzc2FyeVxyXG4gICAgd2FzbS51bm1vdW50RXh0ZXJuYWxEYXRhPy4oKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVsZWFzZVNlc3Npb24gPSAoc2Vzc2lvbklkOiBudW1iZXIpOiB2b2lkID0+IHtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XHJcbiAgaWYgKCFzZXNzaW9uKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCByZWxlYXNlIHNlc3Npb24uIGludmFsaWQgc2Vzc2lvbiBpZDogJHtzZXNzaW9uSWR9YCk7XHJcbiAgfVxyXG4gIGNvbnN0IFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWQsIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsIGlvQmluZGluZ1N0YXRlLCBlbmFibGVHcmFwaENhcHR1cmVdID0gc2Vzc2lvbjtcclxuXHJcbiAgaWYgKGlvQmluZGluZ1N0YXRlKSB7XHJcbiAgICBpZiAoZW5hYmxlR3JhcGhDYXB0dXJlKSB7XHJcbiAgICAgIHdhc20uX09ydENsZWFyQm91bmRPdXRwdXRzKGlvQmluZGluZ1N0YXRlLmhhbmRsZSk7XHJcbiAgICB9XHJcbiAgICB3YXNtLl9PcnRSZWxlYXNlQmluZGluZyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpO1xyXG4gIH1cclxuXHJcbiAgd2FzbS5qc2VwT25SZWxlYXNlU2Vzc2lvbj8uKHNlc3Npb25JZCk7XHJcblxyXG4gIGlucHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKGJ1ZiA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xyXG4gIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaChidWYgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcclxuICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKTtcclxuICBhY3RpdmVTZXNzaW9ucy5kZWxldGUoc2Vzc2lvbklkKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IgPVxyXG4gICAgKHRlbnNvcjogVGVuc29yTWV0YWRhdGF8bnVsbCwgdGVuc29ySGFuZGxlczogbnVtYmVyW10sIGFsbG9jczogbnVtYmVyW10sIHNlc3Npb25JZDogbnVtYmVyLCBpbmRleDogbnVtYmVyLFxyXG4gICAgIGVuYWJsZUdyYXBoQ2FwdHVyZSA9IGZhbHNlKTogdm9pZCA9PiB7XHJcbiAgICAgIGlmICghdGVuc29yKSB7XHJcbiAgICAgICAgdGVuc29ySGFuZGxlcy5wdXNoKDApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcclxuICAgICAgY29uc3QgZGltcyA9IHRlbnNvclsxXTtcclxuICAgICAgY29uc3QgbG9jYXRpb24gPSB0ZW5zb3JbM107XHJcblxyXG4gICAgICBsZXQgcmF3RGF0YTogbnVtYmVyO1xyXG4gICAgICBsZXQgZGF0YUJ5dGVMZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgICAgIGlmIChkYXRhVHlwZSA9PT0gJ3N0cmluZycgJiYgbG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3RyaW5nIHRlbnNvciBpcyBub3Qgc3VwcG9ydGVkIG9uIEdQVS4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgRXh0ZXJuYWwgYnVmZmVyIG11c3QgYmUgcHJvdmlkZWQgZm9yIGlucHV0L291dHB1dCBpbmRleCAke2luZGV4fSB3aGVuIGVuYWJsZUdyYXBoQ2FwdHVyZSBpcyB0cnVlLmApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xyXG4gICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IHRlbnNvclsyXS5ncHVCdWZmZXIgYXMgR1BVQnVmZmVyO1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRTaXplSW5CeXRlcyA9IGdldFRlbnNvckVsZW1lbnRTaXplKHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSkhO1xyXG4gICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGltcy5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKSAqIGVsZW1lbnRTaXplSW5CeXRlcztcclxuXHJcbiAgICAgICAgY29uc3QgcmVnaXN0ZXJCdWZmZXIgPSB3YXNtLmpzZXBSZWdpc3RlckJ1ZmZlcjtcclxuICAgICAgICBpZiAoIXJlZ2lzdGVyQnVmZmVyKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcImdwdS1idWZmZXJcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViR1BVLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByYXdEYXRhID0gcmVnaXN0ZXJCdWZmZXIoc2Vzc2lvbklkLCBpbmRleCwgZ3B1QnVmZmVyLCBkYXRhQnl0ZUxlbmd0aCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgIC8vIHN0cmluZyB0ZW5zb3JcclxuICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gNCAqIGRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcclxuICAgICAgICAgIGxldCBkYXRhSW5kZXggPSByYXdEYXRhIC8gNDtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbaV0gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdGVuc29yIGRhdGEgYXQgaW5kZXggJHtpfSBpcyBub3QgYSBzdHJpbmdgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3YXNtLkhFQVBVMzJbZGF0YUluZGV4KytdID0gYWxsb2NXYXNtU3RyaW5nKGRhdGFbaV0sIGFsbG9jcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcclxuICAgICAgICAgIHdhc20uSEVBUFU4LnNldChuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhQnl0ZUxlbmd0aCksIHJhd0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xyXG4gICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDQgKiBkaW1zLmxlbmd0aCk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGRpbUluZGV4ID0gZGltc09mZnNldCAvIDQ7XHJcbiAgICAgICAgZGltcy5mb3JFYWNoKGQgPT4gd2FzbS5IRUFQMzJbZGltSW5kZXgrK10gPSBkKTtcclxuICAgICAgICBjb25zdCB0ZW5zb3IgPSB3YXNtLl9PcnRDcmVhdGVUZW5zb3IoXHJcbiAgICAgICAgICAgIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgcmF3RGF0YSwgZGF0YUJ5dGVMZW5ndGgsIGRpbXNPZmZzZXQsIGRpbXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obG9jYXRpb24pKTtcclxuICAgICAgICBpZiAodGVuc29yID09PSAwKSB7XHJcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgY3JlYXRlIHRlbnNvciBmb3IgaW5wdXQvb3V0cHV0LiBzZXNzaW9uPSR7c2Vzc2lvbklkfSwgaW5kZXg9JHtpbmRleH0uYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlbnNvckhhbmRsZXMucHVzaCh0ZW5zb3IpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbi8qKlxyXG4gKiBwZXJmb3JtIGluZmVyZW5jZSBydW5cclxuICovXHJcbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyhcclxuICAgIHNlc3Npb25JZDogbnVtYmVyLCBpbnB1dEluZGljZXM6IG51bWJlcltdLCBpbnB1dFRlbnNvcnM6IFRlbnNvck1ldGFkYXRhW10sIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxyXG4gICAgb3V0cHV0VGVuc29yczogQXJyYXk8VGVuc29yTWV0YWRhdGF8bnVsbD4sIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8VGVuc29yTWV0YWRhdGFbXT4gPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcclxuICBpZiAoIXNlc3Npb24pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJ1biBpbmZlcmVuY2UuIGludmFsaWQgc2Vzc2lvbiBpZDogJHtzZXNzaW9uSWR9YCk7XHJcbiAgfVxyXG4gIGNvbnN0IHNlc3Npb25IYW5kbGUgPSBzZXNzaW9uWzBdO1xyXG4gIGNvbnN0IGlucHV0TmFtZXNVVEY4RW5jb2RlZCA9IHNlc3Npb25bMV07XHJcbiAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IHNlc3Npb25bMl07XHJcbiAgY29uc3QgaW9CaW5kaW5nU3RhdGUgPSBzZXNzaW9uWzNdO1xyXG4gIGNvbnN0IGVuYWJsZUdyYXBoQ2FwdHVyZSA9IHNlc3Npb25bNF07XHJcbiAgY29uc3QgaW5wdXRPdXRwdXRCb3VuZCA9IHNlc3Npb25bNV07XHJcblxyXG4gIGNvbnN0IGlucHV0Q291bnQgPSBpbnB1dEluZGljZXMubGVuZ3RoO1xyXG4gIGNvbnN0IG91dHB1dENvdW50ID0gb3V0cHV0SW5kaWNlcy5sZW5ndGg7XHJcblxyXG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcclxuICBsZXQgcnVuT3B0aW9uc0FsbG9jczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgY29uc3QgaW5wdXRUZW5zb3JIYW5kbGVzOiBudW1iZXJbXSA9IFtdO1xyXG4gIGNvbnN0IG91dHB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XHJcbiAgY29uc3QgaW5wdXRPdXRwdXRBbGxvY3M6IG51bWJlcltdID0gW107XHJcblxyXG4gIGNvbnN0IGJlZm9yZVJ1blN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcclxuICBjb25zdCBpbnB1dFZhbHVlc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhpbnB1dENvdW50ICogNCk7XHJcbiAgY29uc3QgaW5wdXROYW1lc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhpbnB1dENvdW50ICogNCk7XHJcbiAgY29uc3Qgb3V0cHV0VmFsdWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XHJcbiAgY29uc3Qgb3V0cHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2Mob3V0cHV0Q291bnQgKiA0KTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIFtydW5PcHRpb25zSGFuZGxlLCBydW5PcHRpb25zQWxsb2NzXSA9IHNldFJ1bk9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgLy8gY3JlYXRlIGlucHV0IHRlbnNvcnNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcihcclxuICAgICAgICAgIGlucHV0VGVuc29yc1tpXSwgaW5wdXRUZW5zb3JIYW5kbGVzLCBpbnB1dE91dHB1dEFsbG9jcywgc2Vzc2lvbklkLCBpbnB1dEluZGljZXNbaV0sIGVuYWJsZUdyYXBoQ2FwdHVyZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIG91dHB1dCB0ZW5zb3JzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcclxuICAgICAgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKFxyXG4gICAgICAgICAgb3V0cHV0VGVuc29yc1tpXSwgb3V0cHV0VGVuc29ySGFuZGxlcywgaW5wdXRPdXRwdXRBbGxvY3MsIHNlc3Npb25JZCwgaW5wdXRDb3VudCArIG91dHB1dEluZGljZXNbaV0sXHJcbiAgICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpbnB1dFZhbHVlc0luZGV4ID0gaW5wdXRWYWx1ZXNPZmZzZXQgLyA0O1xyXG4gICAgbGV0IGlucHV0TmFtZXNJbmRleCA9IGlucHV0TmFtZXNPZmZzZXQgLyA0O1xyXG4gICAgbGV0IG91dHB1dFZhbHVlc0luZGV4ID0gb3V0cHV0VmFsdWVzT2Zmc2V0IC8gNDtcclxuICAgIGxldCBvdXRwdXROYW1lc0luZGV4ID0gb3V0cHV0TmFtZXNPZmZzZXQgLyA0O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcclxuICAgICAgd2FzbS5IRUFQVTMyW2lucHV0VmFsdWVzSW5kZXgrK10gPSBpbnB1dFRlbnNvckhhbmRsZXNbaV07XHJcbiAgICAgIHdhc20uSEVBUFUzMltpbnB1dE5hbWVzSW5kZXgrK10gPSBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5wdXRJbmRpY2VzW2ldXTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xyXG4gICAgICB3YXNtLkhFQVBVMzJbb3V0cHV0VmFsdWVzSW5kZXgrK10gPSBvdXRwdXRUZW5zb3JIYW5kbGVzW2ldO1xyXG4gICAgICB3YXNtLkhFQVBVMzJbb3V0cHV0TmFtZXNJbmRleCsrXSA9IG91dHB1dE5hbWVzVVRGOEVuY29kZWRbb3V0cHV0SW5kaWNlc1tpXV07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCAmJiBpb0JpbmRpbmdTdGF0ZSAmJiAhaW5wdXRPdXRwdXRCb3VuZCkge1xyXG4gICAgICBjb25zdCB7aGFuZGxlLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWR9ID0gaW9CaW5kaW5nU3RhdGU7XHJcblxyXG4gICAgICBpZiAoaW5wdXROYW1lc1VURjhFbmNvZGVkLmxlbmd0aCAhPT0gaW5wdXRDb3VudCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW5wdXQgY291bnQgZnJvbSBmZWVkcyAoJHtcclxuICAgICAgICAgICAgaW5wdXRDb3VudH0pIGlzIGV4cGVjdGVkIHRvIGJlIGFsd2F5cyBlcXVhbCB0byBtb2RlbCdzIGlucHV0IGNvdW50ICgke2lucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGh9KS5gKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcHJvY2VzcyBpbnB1dHNcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGlucHV0SW5kaWNlc1tpXTtcclxuICAgICAgICBjb25zdCBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRCaW5kSW5wdXQoaGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCBpbnB1dFRlbnNvckhhbmRsZXNbaV0pO1xyXG4gICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcclxuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIGlucHV0WyR7aX1dIGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHByb2Nlc3MgcHJlLWFsbG9jYXRlZCBvdXRwdXRzXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gb3V0cHV0SW5kaWNlc1tpXTtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IG91dHB1dFRlbnNvcnNbaV0/LlszXTsgIC8vIHVuZGVmaW5lZCBtZWFucyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuXHJcblxyXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xyXG4gICAgICAgICAgLy8gb3V0cHV0IGlzIHByZS1hbGxvY2F0ZWQuIGJpbmQgdGhlIHRlbnNvci5cclxuICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEJpbmRPdXRwdXQoaGFuZGxlLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgb3V0cHV0VGVuc29ySGFuZGxlc1tpXSwgMCk7XHJcbiAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIHByZS1hbGxvY2F0ZWQgb3V0cHV0WyR7aX1dIGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gb3V0cHV0IGlzIG5vdCBwcmUtYWxsb2NhdGVkLiByZXNldCBwcmVmZXJyZWQgbG9jYXRpb24uXHJcbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPVxyXG4gICAgICAgICAgICAgIHdhc20uX09ydEJpbmRPdXRwdXQoaGFuZGxlLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgMCwgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZFtpbmRleF0pO1xyXG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBvdXRwdXRbJHtpfV0gdG8gJHtvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbaV19IGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KFxyXG4gICAgICAgICAgc2Vzc2lvbklkLFxyXG4gICAgICAgICAgW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZCwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCwgaW9CaW5kaW5nU3RhdGUsIGVuYWJsZUdyYXBoQ2FwdHVyZSwgdHJ1ZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHdhc20uanNlcE9uUnVuU3RhcnQ/LihzZXNzaW9uSGFuZGxlKTtcclxuICAgIGxldCBlcnJvckNvZGU6IG51bWJlcjtcclxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgJiYgaW9CaW5kaW5nU3RhdGUpIHtcclxuICAgICAgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0UnVuV2l0aEJpbmRpbmcoXHJcbiAgICAgICAgICBzZXNzaW9uSGFuZGxlLCBpb0JpbmRpbmdTdGF0ZS5oYW5kbGUsIG91dHB1dENvdW50LCBvdXRwdXRWYWx1ZXNPZmZzZXQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0UnVuKFxyXG4gICAgICAgICAgc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc09mZnNldCwgaW5wdXRWYWx1ZXNPZmZzZXQsIGlucHV0Q291bnQsIG91dHB1dE5hbWVzT2Zmc2V0LCBvdXRwdXRDb3VudCxcclxuICAgICAgICAgIG91dHB1dFZhbHVlc09mZnNldCwgcnVuT3B0aW9uc0hhbmRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xyXG4gICAgICBjaGVja0xhc3RFcnJvcignZmFpbGVkIHRvIGNhbGwgT3J0UnVuKCkuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3V0cHV0OiBUZW5zb3JNZXRhZGF0YVtdID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHRlbnNvciA9IHdhc20uSEVBUFUzMltvdXRwdXRWYWx1ZXNPZmZzZXQgLyA0ICsgaV07XHJcbiAgICAgIGlmICh0ZW5zb3IgPT09IG91dHB1dFRlbnNvckhhbmRsZXNbaV0pIHtcclxuICAgICAgICAvLyBvdXRwdXQgdGVuc29yIGlzIHByZS1hbGxvY2F0ZWQuIG5vIG5lZWQgdG8gY29weSBkYXRhLlxyXG4gICAgICAgIG91dHB1dC5wdXNoKG91dHB1dFRlbnNvcnNbaV0hKTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcclxuICAgICAgLy8gc3RhY2sgYWxsb2NhdGUgNCBwb2ludGVyIHZhbHVlXHJcbiAgICAgIGNvbnN0IHRlbnNvckRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIDQpO1xyXG5cclxuICAgICAgbGV0IGtlZXBPdXRwdXRUZW5zb3IgPSBmYWxzZTtcclxuICAgICAgbGV0IHR5cGU6IFRlbnNvci5UeXBlfHVuZGVmaW5lZCwgZGF0YU9mZnNldCA9IDA7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0VGVuc29yRGF0YShcclxuICAgICAgICAgICAgdGVuc29yLCB0ZW5zb3JEYXRhT2Zmc2V0LCB0ZW5zb3JEYXRhT2Zmc2V0ICsgNCwgdGVuc29yRGF0YU9mZnNldCArIDgsIHRlbnNvckRhdGFPZmZzZXQgKyAxMik7XHJcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFjY2VzcyBvdXRwdXQgdGVuc29yIGRhdGEgb24gaW5kZXggJHtpfS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRlbnNvckRhdGFJbmRleCA9IHRlbnNvckRhdGFPZmZzZXQgLyA0O1xyXG4gICAgICAgIGNvbnN0IGRhdGFUeXBlID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcclxuICAgICAgICBkYXRhT2Zmc2V0ID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcclxuICAgICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcclxuICAgICAgICBjb25zdCBkaW1zTGVuZ3RoID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcclxuICAgICAgICBjb25zdCBkaW1zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGRpbXMucHVzaCh3YXNtLkhFQVBVMzJbZGltc09mZnNldCAvIDQgKyBpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdhc20uX09ydEZyZWUoZGltc09mZnNldCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNpemUgPSBkaW1zLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpO1xyXG4gICAgICAgIHR5cGUgPSB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhkYXRhVHlwZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByZWZlcnJlZExvY2F0aW9uID0gaW9CaW5kaW5nU3RhdGU/Lm91dHB1dFByZWZlcnJlZExvY2F0aW9uc1tvdXRwdXRJbmRpY2VzW2ldXTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBzdHJpbmdEYXRhOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgbGV0IGRhdGFJbmRleCA9IGRhdGFPZmZzZXQgLyA0O1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gd2FzbS5IRUFQVTMyW2RhdGFJbmRleCsrXTtcclxuICAgICAgICAgICAgY29uc3QgbWF4Qnl0ZXNUb1JlYWQgPSBpID09PSBzaXplIC0gMSA/IHVuZGVmaW5lZCA6IHdhc20uSEVBUFUzMltkYXRhSW5kZXhdIC0gb2Zmc2V0O1xyXG4gICAgICAgICAgICBzdHJpbmdEYXRhLnB1c2god2FzbS5VVEY4VG9TdHJpbmcob2Zmc2V0LCBtYXhCeXRlc1RvUmVhZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIHN0cmluZ0RhdGEsICdjcHUnXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIElmIGEgY2VydGFpbiBvdXRwdXQncyBwcmVmZXJyZWQgbG9jYXRpb24gaXMgR1BVIGJ1dCB0aGUgdGVuc29yIGlzIGVtcHR5LCB3ZSBzdGlsbCBuZWVkIHRvIGNyZWF0ZSBhIENQVVxyXG4gICAgICAgICAgLy8gdGVuc29yIGZvciBpdC4gVGhlcmUgaXMgbm8gbWFwcGluZyBHUFUgYnVmZmVyIGZvciBhbiBlbXB0eSB0ZW5zb3IuXHJcbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyAmJiBzaXplID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBnZXRCdWZmZXIgPSB3YXNtLmpzZXBHZXRCdWZmZXI7XHJcbiAgICAgICAgICAgIGlmICghZ2V0QnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmVmZXJyZWRMb2NhdGlvbiBcImdwdS1idWZmZXJcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViR1BVLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IGdldEJ1ZmZlcihkYXRhT2Zmc2V0KTtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudFNpemUgPSBnZXRUZW5zb3JFbGVtZW50U2l6ZShkYXRhVHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50U2l6ZSA9PT0gdW5kZWZpbmVkIHx8ICFpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUodHlwZSkpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBkbyBub3QgcmVsZWFzZSB0aGUgdGVuc29yIHJpZ2h0IG5vdy4gaXQgd2lsbCBiZSByZWxlYXNlZCB3aGVuIHVzZXIgY2FsbHMgdGVuc29yLmRpc3Bvc2UoKS5cclxuICAgICAgICAgICAga2VlcE91dHB1dFRlbnNvciA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChbXHJcbiAgICAgICAgICAgICAgdHlwZSwgZGltcywge1xyXG4gICAgICAgICAgICAgICAgZ3B1QnVmZmVyLFxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ6IHdhc20uanNlcENyZWF0ZURvd25sb2FkZXIhKGdwdUJ1ZmZlciwgc2l6ZSAqIGVsZW1lbnRTaXplLCB0eXBlKSxcclxuICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgJ2dwdS1idWZmZXInXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZWRBcnJheUNvbnN0cnVjdG9yID0gdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yKHR5cGUpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IHR5cGVkQXJyYXlDb25zdHJ1Y3RvcihzaXplKTtcclxuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgLnNldCh3YXNtLkhFQVBVOC5zdWJhcnJheShkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgZGF0YS5ieXRlTGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBkYXRhLCAnY3B1J10pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICB3YXNtLnN0YWNrUmVzdG9yZShiZWZvcmVHZXRUZW5zb3JEYXRhU3RhY2spO1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiBkYXRhT2Zmc2V0KSB7XHJcbiAgICAgICAgICB3YXNtLl9mcmVlKGRhdGFPZmZzZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWtlZXBPdXRwdXRUZW5zb3IpIHtcclxuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW9CaW5kaW5nU3RhdGUgJiYgIWVuYWJsZUdyYXBoQ2FwdHVyZSkge1xyXG4gICAgICB3YXNtLl9PcnRDbGVhckJvdW5kT3V0cHV0cyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpO1xyXG4gICAgICBhY3RpdmVTZXNzaW9ucy5zZXQoXHJcbiAgICAgICAgICBzZXNzaW9uSWQsXHJcbiAgICAgICAgICBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZSwgZW5hYmxlR3JhcGhDYXB0dXJlLCBmYWxzZV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xyXG5cclxuICAgIGlucHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKHYgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XHJcbiAgICBvdXRwdXRUZW5zb3JIYW5kbGVzLmZvckVhY2godiA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcclxuICAgIGlucHV0T3V0cHV0QWxsb2NzLmZvckVhY2gocCA9PiB3YXNtLl9mcmVlKHApKTtcclxuXHJcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xyXG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcclxuICAgIH1cclxuICAgIHJ1bk9wdGlvbnNBbGxvY3MuZm9yRWFjaChwID0+IHdhc20uX2ZyZWUocCkpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBlbmQgcHJvZmlsaW5nXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xyXG4gIGlmICghc2Vzc2lvbikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHNlc3Npb24gaWQnKTtcclxuICB9XHJcbiAgY29uc3Qgc2Vzc2lvbkhhbmRsZSA9IHNlc3Npb25bMF07XHJcblxyXG4gIC8vIHByb2ZpbGUgZmlsZSBuYW1lIGlzIG5vdCB1c2VkIHlldCwgYnV0IGl0IG11c3QgYmUgZnJlZWQuXHJcbiAgY29uc3QgcHJvZmlsZUZpbGVOYW1lID0gd2FzbS5fT3J0RW5kUHJvZmlsaW5nKHNlc3Npb25IYW5kbGUpO1xyXG4gIGlmIChwcm9maWxlRmlsZU5hbWUgPT09IDApIHtcclxuICAgIGNoZWNrTGFzdEVycm9yKCdDYW5cXCd0IGdldCBhbiBwcm9maWxlIGZpbGUgbmFtZS4nKTtcclxuICB9XHJcbiAgd2FzbS5fT3J0RnJlZShwcm9maWxlRmlsZU5hbWUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzID0gKHRlbnNvcnM6IHJlYWRvbmx5IFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10pOiBBcnJheUJ1ZmZlckxpa2VbXSA9PiB7XHJcbiAgY29uc3QgYnVmZmVyczogQXJyYXlCdWZmZXJMaWtlW10gPSBbXTtcclxuICBmb3IgKGNvbnN0IHRlbnNvciBvZiB0ZW5zb3JzKSB7XHJcbiAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpICYmICdidWZmZXInIGluIGRhdGEpIHtcclxuICAgICAgYnVmZmVycy5wdXNoKGRhdGEuYnVmZmVyKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGJ1ZmZlcnM7XHJcbn07XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHtlbnYsIEluZmVyZW5jZVNlc3Npb259IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcblxyXG5pbXBvcnQge09ydFdhc21NZXNzYWdlLCBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciwgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLCBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSwgVGVuc29yTWV0YWRhdGF9IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xyXG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJy4vd2FzbS1jb3JlLWltcGwnO1xyXG5pbXBvcnQge2luaXRpYWxpemVXZWJBc3NlbWJseX0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xyXG5pbXBvcnQge2ltcG9ydFByb3h5V29ya2VyfSBmcm9tICcuL3dhc20tdXRpbHMtaW1wb3J0JztcclxuXHJcbmNvbnN0IGlzUHJveHkgPSAoKTogYm9vbGVhbiA9PiAhIWVudi53YXNtLnByb3h5ICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XHJcbmxldCBwcm94eVdvcmtlcjogV29ya2VyfHVuZGVmaW5lZDtcclxubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xyXG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxubGV0IGFib3J0ZWQgPSBmYWxzZTtcclxubGV0IHRlbXBvcmFyeU9iamVjdFVybDogc3RyaW5nfHVuZGVmaW5lZDtcclxuXHJcbnR5cGUgUHJvbWlzZUNhbGxiYWNrczxUID0gdm9pZD4gPSBbcmVzb2x2ZTogKHJlc3VsdDogVCkgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uOiB1bmtub3duKSA9PiB2b2lkXTtcclxubGV0IGluaXRXYXNtQ2FsbGJhY2tzOiBQcm9taXNlQ2FsbGJhY2tzO1xyXG5jb25zdCBxdWV1ZWRDYWxsYmFja3M6IE1hcDxPcnRXYXNtTWVzc2FnZVsndHlwZSddLCBBcnJheTxQcm9taXNlQ2FsbGJhY2tzPHVua25vd24+Pj4gPSBuZXcgTWFwKCk7XHJcblxyXG5jb25zdCBlbnF1ZXVlQ2FsbGJhY2tzID0gKHR5cGU6IE9ydFdhc21NZXNzYWdlWyd0eXBlJ10sIGNhbGxiYWNrczogUHJvbWlzZUNhbGxiYWNrczx1bmtub3duPik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHF1ZXVlID0gcXVldWVkQ2FsbGJhY2tzLmdldCh0eXBlKTtcclxuICBpZiAocXVldWUpIHtcclxuICAgIHF1ZXVlLnB1c2goY2FsbGJhY2tzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcXVldWVkQ2FsbGJhY2tzLnNldCh0eXBlLCBbY2FsbGJhY2tzXSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZW5zdXJlV29ya2VyID0gKCk6IHZvaWQgPT4ge1xyXG4gIGlmIChpbml0aWFsaXppbmcgfHwgIWluaXRpYWxpemVkIHx8IGFib3J0ZWQgfHwgIXByb3h5V29ya2VyKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvcmtlciBub3QgcmVhZHknKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBvblByb3h5V29ya2VyTWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50PE9ydFdhc21NZXNzYWdlPik6IHZvaWQgPT4ge1xyXG4gIHN3aXRjaCAoZXYuZGF0YS50eXBlKSB7XHJcbiAgICBjYXNlICdpbml0LXdhc20nOlxyXG4gICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcclxuICAgICAgaWYgKGV2LmRhdGEuZXJyKSB7XHJcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgaW5pdFdhc21DYWxsYmFja3NbMV0oZXYuZGF0YS5lcnIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICBpbml0V2FzbUNhbGxiYWNrc1swXSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0ZW1wb3JhcnlPYmplY3RVcmwpIHtcclxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHRlbXBvcmFyeU9iamVjdFVybCk7XHJcbiAgICAgICAgdGVtcG9yYXJ5T2JqZWN0VXJsID0gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnaW5pdC1lcCc6XHJcbiAgICBjYXNlICdjb3B5LWZyb20nOlxyXG4gICAgY2FzZSAnY3JlYXRlJzpcclxuICAgIGNhc2UgJ3JlbGVhc2UnOlxyXG4gICAgY2FzZSAncnVuJzpcclxuICAgIGNhc2UgJ2VuZC1wcm9maWxpbmcnOiB7XHJcbiAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHF1ZXVlZENhbGxiYWNrcy5nZXQoZXYuZGF0YS50eXBlKSE7XHJcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xyXG4gICAgICAgIGNhbGxiYWNrcy5zaGlmdCgpIVsxXShldi5kYXRhLmVycik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FsbGJhY2tzLnNoaWZ0KCkhWzBdKGV2LmRhdGEub3V0ISk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBkZWZhdWx0OlxyXG4gIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSA9IGFzeW5jKCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGlmIChpbml0aWFsaXplZCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211bHRpcGxlIGNhbGxzIHRvIFxcJ2luaXRXYXNtKClcXCcgZGV0ZWN0ZWQuJyk7XHJcbiAgfVxyXG4gIGlmIChhYm9ydGVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzIGNhbGwgdG8gXFwnaW5pdFdhc20oKVxcJyBmYWlsZWQuJyk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xyXG5cclxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcHJveHlXb3JrZXI/LnRlcm1pbmF0ZSgpO1xyXG5cclxuICAgICAgdm9pZCBpbXBvcnRQcm94eVdvcmtlcigpLnRoZW4oKFtvYmplY3RVcmwsIHdvcmtlcl0pID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcHJveHlXb3JrZXIgPSB3b3JrZXI7XHJcbiAgICAgICAgICBwcm94eVdvcmtlci5vbmVycm9yID0gKGV2OiBFcnJvckV2ZW50KSA9PiByZWplY3QoZXYpO1xyXG4gICAgICAgICAgcHJveHlXb3JrZXIub25tZXNzYWdlID0gb25Qcm94eVdvcmtlck1lc3NhZ2U7XHJcbiAgICAgICAgICBpbml0V2FzbUNhbGxiYWNrcyA9IFtyZXNvbHZlLCByZWplY3RdO1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7dHlwZTogJ2luaXQtd2FzbScsIGluIDogZW52fTtcclxuICAgICAgICAgIHByb3h5V29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgdGVtcG9yYXJ5T2JqZWN0VXJsID0gb2JqZWN0VXJsO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIHJlamVjdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGluaXRpYWxpemVXZWJBc3NlbWJseShlbnYud2FzbSk7XHJcbiAgICAgIGF3YWl0IGNvcmUuaW5pdFJ1bnRpbWUoZW52KTtcclxuICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBhYm9ydGVkID0gdHJ1ZTtcclxuICAgICAgdGhyb3cgZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0aWFsaXplT3J0RXAgPSBhc3luYyhlcE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XHJcbiAgICBlbnN1cmVXb3JrZXIoKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2luaXQtZXAnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdpbml0LWVwJywgaW4gOiB7ZXBOYW1lLCBlbnZ9fTtcclxuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGF3YWl0IGNvcmUuaW5pdEVwKGVudiwgZXBOYW1lKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29weUZyb21FeHRlcm5hbEJ1ZmZlciA9IGFzeW5jKGJ1ZmZlcjogVWludDhBcnJheSk6IFByb21pc2U8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXI+ID0+IHtcclxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xyXG4gICAgZW5zdXJlV29ya2VyKCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnY29weS1mcm9tJywgW3Jlc29sdmUsIHJlamVjdF0pO1xyXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnY29weS1mcm9tJywgaW4gOiB7YnVmZmVyfX07XHJcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBbYnVmZmVyLmJ1ZmZlcl0pO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBjb3JlLmNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIoYnVmZmVyKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9XHJcbiAgICBhc3luYyhtb2RlbDogU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXJ8VWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxyXG4gICAgICAgIFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPiA9PiB7XHJcbiAgICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xyXG4gICAgICAgICAgICAvLyBjaGVjayB1bnN1cHBvcnRlZCBvcHRpb25zXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc2Vzc2lvbiBvcHRpb24gXCJwcmVmZXJyZWRPdXRwdXRMb2NhdGlvblwiIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVuc3VyZVdvcmtlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnY3JlYXRlJywgW3Jlc29sdmUsIHJlamVjdF0pO1xyXG4gICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdjcmVhdGUnLCBpbiA6IHttb2RlbCwgb3B0aW9uczogey4uLm9wdGlvbnN9fX07XHJcbiAgICAgICAgICAgICAgY29uc3QgdHJhbnNmZXJhYmxlOiBUcmFuc2ZlcmFibGVbXSA9IFtdO1xyXG4gICAgICAgICAgICAgIGlmIChtb2RlbCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZmVyYWJsZS5wdXNoKG1vZGVsLmJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCB0cmFuc2ZlcmFibGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb3JlLmNyZWF0ZVNlc3Npb24obW9kZWwsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG5leHBvcnQgY29uc3QgcmVsZWFzZVNlc3Npb24gPSBhc3luYyhzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XHJcbiAgICBlbnN1cmVXb3JrZXIoKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ3JlbGVhc2UnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge3R5cGU6ICdyZWxlYXNlJywgaW4gOiBzZXNzaW9uSWR9O1xyXG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29yZS5yZWxlYXNlU2Vzc2lvbihzZXNzaW9uSWQpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyhcclxuICAgIHNlc3Npb25JZDogbnVtYmVyLCBpbnB1dEluZGljZXM6IG51bWJlcltdLCBpbnB1dHM6IFRlbnNvck1ldGFkYXRhW10sIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxyXG4gICAgb3V0cHV0czogQXJyYXk8VGVuc29yTWV0YWRhdGF8bnVsbD4sIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8VGVuc29yTWV0YWRhdGFbXT4gPT4ge1xyXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XHJcbiAgICAvLyBjaGVjayBpbnB1dHMgbG9jYXRpb25cclxuICAgIGlmIChpbnB1dHMuc29tZSh0ID0+IHRbM10gIT09ICdjcHUnKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lucHV0IHRlbnNvciBvbiBHUFUgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XHJcbiAgICB9XHJcbiAgICAvLyBjaGVjayBvdXRwdXRzIGxvY2F0aW9uXHJcbiAgICBpZiAob3V0cHV0cy5zb21lKHQgPT4gdCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmUtYWxsb2NhdGVkIG91dHB1dCB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XHJcbiAgICB9XHJcbiAgICBlbnN1cmVXb3JrZXIoKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ3J1bicsIFtyZXNvbHZlLCByZWplY3RdKTtcclxuICAgICAgY29uc3Qgc2VyaWFsaXphYmxlSW5wdXRzID0gaW5wdXRzIGFzIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW107ICAvLyBldmVyeSBpbnB1dCBpcyBvbiBDUFUuXHJcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID1cclxuICAgICAgICAgIHt0eXBlOiAncnVuJywgaW4gOiB7c2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0czogc2VyaWFsaXphYmxlSW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvcHRpb25zfX07XHJcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBjb3JlLmV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzKHNlcmlhbGl6YWJsZUlucHV0cykpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBjb3JlLnJ1bihzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gYXN5bmMoc2Vzc2lvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xyXG4gICAgZW5zdXJlV29ya2VyKCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdlbmQtcHJvZmlsaW5nJywgW3Jlc29sdmUsIHJlamVjdF0pO1xyXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHt0eXBlOiAnZW5kLXByb2ZpbGluZycsIGluIDogc2Vzc2lvbklkfTtcclxuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvcmUuZW5kUHJvZmlsaW5nKHNlc3Npb25JZCk7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbiwgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIsIFNlc3Npb25IYW5kbGVyLCBUZW5zb3IsIFRSQUNFX0ZVTkNfQkVHSU4sIFRSQUNFX0ZVTkNfRU5EfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xyXG5cclxuaW1wb3J0IHtTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciwgVGVuc29yTWV0YWRhdGF9IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xyXG5pbXBvcnQge2NvcHlGcm9tRXh0ZXJuYWxCdWZmZXIsIGNyZWF0ZVNlc3Npb24sIGVuZFByb2ZpbGluZywgcmVsZWFzZVNlc3Npb24sIHJ1bn0gZnJvbSAnLi9wcm94eS13cmFwcGVyJztcclxuaW1wb3J0IHtpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGV9IGZyb20gJy4vd2FzbS1jb21tb24nO1xyXG5pbXBvcnQge2lzTm9kZX0gZnJvbSAnLi93YXNtLXV0aWxzLWVudic7XHJcbmltcG9ydCB7bG9hZEZpbGV9IGZyb20gJy4vd2FzbS11dGlscy1sb2FkLWZpbGUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGVuY29kZVRlbnNvck1ldGFkYXRhID0gKHRlbnNvcjogVGVuc29yLCBnZXROYW1lOiAoKSA9PiBzdHJpbmcpOiBUZW5zb3JNZXRhZGF0YSA9PiB7XHJcbiAgc3dpdGNoICh0ZW5zb3IubG9jYXRpb24pIHtcclxuICAgIGNhc2UgJ2NwdSc6XHJcbiAgICAgIHJldHVybiBbdGVuc29yLnR5cGUsIHRlbnNvci5kaW1zLCB0ZW5zb3IuZGF0YSwgJ2NwdSddO1xyXG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XHJcbiAgICAgIHJldHVybiBbdGVuc29yLnR5cGUsIHRlbnNvci5kaW1zLCB7Z3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyfSwgJ2dwdS1idWZmZXInXTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvci5sb2NhdGlvbn0gZm9yICR7Z2V0TmFtZSgpfWApO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWNvZGVUZW5zb3JNZXRhZGF0YSA9ICh0ZW5zb3I6IFRlbnNvck1ldGFkYXRhKTogVGVuc29yID0+IHtcclxuICBzd2l0Y2ggKHRlbnNvclszXSkge1xyXG4gICAgY2FzZSAnY3B1JzpcclxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3IodGVuc29yWzBdLCB0ZW5zb3JbMl0sIHRlbnNvclsxXSk7XHJcbiAgICBjYXNlICdncHUtYnVmZmVyJzoge1xyXG4gICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcclxuICAgICAgaWYgKCFpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUoZGF0YVR5cGUpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGRhdGEgdHlwZTogJHtkYXRhVHlwZX0gZm9yIGRlc2VyaWFsaXppbmcgR1BVIHRlbnNvcmApO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHtncHVCdWZmZXIsIGRvd25sb2FkLCBkaXNwb3NlfSA9IHRlbnNvclsyXTtcclxuICAgICAgcmV0dXJuIFRlbnNvci5mcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwge2RhdGFUeXBlLCBkaW1zOiB0ZW5zb3JbMV0sIGRvd25sb2FkLCBkaXNwb3NlfSk7XHJcbiAgICB9XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBsb2NhdGlvbjogJHt0ZW5zb3JbM119YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlTZXNzaW9uSGFuZGxlciBpbXBsZW1lbnRzIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIHtcclxuICBwcml2YXRlIHNlc3Npb25JZDogbnVtYmVyO1xyXG5cclxuICBpbnB1dE5hbWVzOiBzdHJpbmdbXTtcclxuICBvdXRwdXROYW1lczogc3RyaW5nW107XHJcblxyXG4gIGFzeW5jIGZldGNoTW9kZWxBbmRDb3B5VG9XYXNtTWVtb3J5KHBhdGg6IHN0cmluZyk6IFByb21pc2U8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXI+IHtcclxuICAgIC8vIGZldGNoIG1vZGVsIGZyb20gdXJsIGFuZCBtb3ZlIHRvIHdhc20gaGVhcC5cclxuICAgIHJldHVybiBjb3B5RnJvbUV4dGVybmFsQnVmZmVyKGF3YWl0IGxvYWRGaWxlKHBhdGgpKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGxvYWRNb2RlbChwYXRoT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xyXG4gICAgbGV0IG1vZGVsOiBQYXJhbWV0ZXJzPHR5cGVvZiBjcmVhdGVTZXNzaW9uPlswXTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHBhdGhPckJ1ZmZlciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgaWYgKGlzTm9kZSkge1xyXG4gICAgICAgIC8vIG5vZGVcclxuICAgICAgICBtb2RlbCA9IGF3YWl0IGxvYWRGaWxlKHBhdGhPckJ1ZmZlcik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gYnJvd3NlclxyXG4gICAgICAgIC8vIGZldGNoIG1vZGVsIGFuZCBjb3B5IHRvIHdhc20gaGVhcC5cclxuICAgICAgICBtb2RlbCA9IGF3YWl0IHRoaXMuZmV0Y2hNb2RlbEFuZENvcHlUb1dhc21NZW1vcnkocGF0aE9yQnVmZmVyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbW9kZWwgPSBwYXRoT3JCdWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgW3RoaXMuc2Vzc2lvbklkLCB0aGlzLmlucHV0TmFtZXMsIHRoaXMub3V0cHV0TmFtZXNdID0gYXdhaXQgY3JlYXRlU2Vzc2lvbihtb2RlbCwgb3B0aW9ucyk7XHJcbiAgICBUUkFDRV9GVU5DX0VORCgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiByZWxlYXNlU2Vzc2lvbih0aGlzLnNlc3Npb25JZCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBydW4oZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSwgZmV0Y2hlczogU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUsIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6XHJcbiAgICAgIFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT4ge1xyXG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xyXG4gICAgY29uc3QgaW5wdXRBcnJheTogVGVuc29yW10gPSBbXTtcclxuICAgIGNvbnN0IGlucHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcclxuICAgIE9iamVjdC5lbnRyaWVzKGZlZWRzKS5mb3JFYWNoKGt2cCA9PiB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSBrdnBbMF07XHJcbiAgICAgIGNvbnN0IHRlbnNvciA9IGt2cFsxXTtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmlucHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBpbnB1dCAnJHtuYW1lfSdgKTtcclxuICAgICAgfVxyXG4gICAgICBpbnB1dEFycmF5LnB1c2godGVuc29yKTtcclxuICAgICAgaW5wdXRJbmRpY2VzLnB1c2goaW5kZXgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgb3V0cHV0QXJyYXk6IEFycmF5PFRlbnNvcnxudWxsPiA9IFtdO1xyXG4gICAgY29uc3Qgb3V0cHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcclxuICAgIE9iamVjdC5lbnRyaWVzKGZldGNoZXMpLmZvckVhY2goa3ZwID0+IHtcclxuICAgICAgY29uc3QgbmFtZSA9IGt2cFswXTtcclxuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMub3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvdXRwdXQgJyR7bmFtZX0nYCk7XHJcbiAgICAgIH1cclxuICAgICAgb3V0cHV0QXJyYXkucHVzaCh0ZW5zb3IpO1xyXG4gICAgICBvdXRwdXRJbmRpY2VzLnB1c2goaW5kZXgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgaW5wdXRzID1cclxuICAgICAgICBpbnB1dEFycmF5Lm1hcCgodCwgaSkgPT4gZW5jb2RlVGVuc29yTWV0YWRhdGEodCwgKCkgPT4gYGlucHV0IFwiJHt0aGlzLmlucHV0TmFtZXNbaW5wdXRJbmRpY2VzW2ldXX1cImApKTtcclxuICAgIGNvbnN0IG91dHB1dHMgPSBvdXRwdXRBcnJheS5tYXAoXHJcbiAgICAgICAgKHQsIGkpID0+IHQgPyBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgb3V0cHV0IFwiJHt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dfVwiYCkgOiBudWxsKTtcclxuXHJcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgcnVuKHRoaXMuc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3V0cHV0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3QgcmVzdWx0TWFwOiBTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlID0ge307XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgcmVzdWx0TWFwW3RoaXMub3V0cHV0TmFtZXNbb3V0cHV0SW5kaWNlc1tpXV1dID0gb3V0cHV0QXJyYXlbaV0gPz8gZGVjb2RlVGVuc29yTWV0YWRhdGEocmVzdWx0c1tpXSk7XHJcbiAgICB9XHJcbiAgICBUUkFDRV9GVU5DX0VORCgpO1xyXG4gICAgcmV0dXJuIHJlc3VsdE1hcDtcclxuICB9XHJcblxyXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQge1xyXG4gICAgLy8gVE9ETzogaW1wbGVtZW50IHByb2ZpbGluZ1xyXG4gIH1cclxuXHJcbiAgZW5kUHJvZmlsaW5nKCk6IHZvaWQge1xyXG4gICAgdm9pZCBlbmRQcm9maWxpbmcodGhpcy5zZXNzaW9uSWQpO1xyXG4gIH1cclxufVxyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7QmFja2VuZCwgZW52LCBJbmZlcmVuY2VTZXNzaW9uLCBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB7aW5pdGlhbGl6ZU9ydEVwLCBpbml0aWFsaXplV2ViQXNzZW1ibHlBbmRPcnRSdW50aW1lfSBmcm9tICcuL3dhc20vcHJveHktd3JhcHBlcic7XHJcbmltcG9ydCB7T25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyfSBmcm9tICcuL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZSc7XHJcbmltcG9ydCB7c2NyaXB0U3JjfSBmcm9tICcuL3dhc20vd2FzbS11dGlscy1pbXBvcnQnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgYWxsIGZsYWdzIGZvciBXZWJBc3NlbWJseS5cclxuICpcclxuICogVGhvc2UgZmxhZ3MgYXJlIGFjY2Vzc2libGUgZnJvbSBgb3J0LmVudi53YXNtYC4gVXNlcnMgYXJlIGFsbG93IHRvIHNldCB0aG9zZSBmbGFncyBiZWZvcmUgdGhlIGZpcnN0IGluZmVyZW5jZSBzZXNzaW9uXHJcbiAqIGJlaW5nIGNyZWF0ZWQsIHRvIG92ZXJyaWRlIGRlZmF1bHQgdmFsdWUuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUZsYWdzID0gKCk6IHZvaWQgPT4ge1xyXG4gIGlmICh0eXBlb2YgZW52Lndhc20uaW5pdFRpbWVvdXQgIT09ICdudW1iZXInIHx8IGVudi53YXNtLmluaXRUaW1lb3V0IDwgMCkge1xyXG4gICAgZW52Lndhc20uaW5pdFRpbWVvdXQgPSAwO1xyXG4gIH1cclxuXHJcbiAgaWYgKGVudi53YXNtLnNpbWQgPT09IGZhbHNlKSB7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICdEZXByZWNhdGVkIHByb3BlcnR5IFwiZW52Lndhc20uc2ltZFwiIGlzIHNldCB0byBmYWxzZS4gJyArXHJcbiAgICAgICAgJ25vbi1TSU1EIGJ1aWxkIGlzIG5vIGxvbmdlciBwcm92aWRlZCwgYW5kIHRoaXMgc2V0dGluZyB3aWxsIGJlIGlnbm9yZWQuJyk7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIGVudi53YXNtLnByb3h5ICE9PSAnYm9vbGVhbicpIHtcclxuICAgIGVudi53YXNtLnByb3h5ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIGVudi53YXNtLnRyYWNlICE9PSAnYm9vbGVhbicpIHtcclxuICAgIGVudi53YXNtLnRyYWNlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIGVudi53YXNtLm51bVRocmVhZHMgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGVudi53YXNtLm51bVRocmVhZHMpIHx8IGVudi53YXNtLm51bVRocmVhZHMgPD0gMCkge1xyXG4gICAgLy8gVGhlIGZvbGxvd2luZyBsb2dpYyBvbmx5IGFwcGxpZXMgd2hlbiBgb3J0LmVudi53YXNtLm51bVRocmVhZHNgIGlzIG5vdCBzZXQgYnkgdXNlci4gV2Ugd2lsbCBhbHdheXMgaG9ub3IgdXNlcidzXHJcbiAgICAvLyBzZXR0aW5nIGlmIGl0IGlzIHByb3ZpZGVkLlxyXG5cclxuICAgIC8vIEJyb3dzZXI6IHdoZW4gY3Jvc3NPcmlnaW5Jc29sYXRlZCBpcyBmYWxzZSwgU2hhcmVkQXJyYXlCdWZmZXIgaXMgbm90IGF2YWlsYWJsZSBzbyBXZWJBc3NlbWJseSB0aHJlYWRzIHdpbGwgbm90XHJcbiAgICAvLyB3b3JrLiBJbiB0aGlzIGNhc2UsIHdlIHdpbGwgc2V0IG51bVRocmVhZHMgdG8gMS5cclxuICAgIC8vXHJcbiAgICAvLyBUaGVyZSBpcyBhbiBleGNlcHRpb246IHdoZW4gdGhlIGJyb3dzZXIgaXMgY29uZmlndXJlZCB0byBmb3JjZS1lbmFibGUgU2hhcmVkQXJyYXlCdWZmZXIgKGUuZy4gQ2hyb211aW0gd2l0aFxyXG4gICAgLy8gLS1lbmFibGUtZmVhdHVyZXM9U2hhcmVkQXJyYXlCdWZmZXIpLCBpdCBpcyBwb3NzaWJsZSB0aGF0IGBzZWxmLmNyb3NzT3JpZ2luSXNvbGF0ZWRgIGlzIGZhbHNlIGFuZFxyXG4gICAgLy8gU2hhcmVkQXJyYXlCdWZmZXIgaXMgYXZhaWxhYmxlIGF0IHRoZSBzYW1lIHRpbWUuIFRoaXMgaXMgdXN1YWxseSBmb3IgdGVzdGluZy4gSW4gdGhpcyBjYXNlLCAgd2Ugd2lsbCBzdGlsbCBzZXRcclxuICAgIC8vIG51bVRocmVhZHMgdG8gMSBoZXJlLiBJZiB3ZSB3YW50IHRvIGVuYWJsZSBtdWx0aS10aHJlYWRpbmcgaW4gdGVzdCwgd2Ugc2hvdWxkIHNldCBgb3J0LmVudi53YXNtLm51bVRocmVhZHNgIHRvIGFcclxuICAgIC8vIHZhbHVlIGdyZWF0ZXIgdGhhbiAxLlxyXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiAhc2VsZi5jcm9zc09yaWdpbklzb2xhdGVkKSB7XHJcbiAgICAgIGVudi53YXNtLm51bVRocmVhZHMgPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbnVtQ3B1TG9naWNhbENvcmVzID1cclxuICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgnbm9kZTpvcycpLmNwdXMoKS5sZW5ndGggOiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeTtcclxuICAgICAgZW52Lndhc20ubnVtVGhyZWFkcyA9IE1hdGgubWluKDQsIE1hdGguY2VpbCgobnVtQ3B1TG9naWNhbENvcmVzIHx8IDEpIC8gMikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfRFlOQU1JQ19JTVBPUlQpIHtcclxuICAgIC8vIG92ZXJ3cml0ZSB3YXNtIHBhdGhzIG92ZXJyaWRlIGlmIG5vdCBzZXRcclxuICAgIGlmIChlbnYud2FzbS53YXNtUGF0aHMgPT09IHVuZGVmaW5lZCAmJiBzY3JpcHRTcmMgJiYgc2NyaXB0U3JjLmluZGV4T2YoJ2Jsb2I6JykgIT09IDApIHtcclxuICAgICAgZW52Lndhc20ud2FzbVBhdGhzID0gc2NyaXB0U3JjLnN1YnN0cmluZygwLCBzY3JpcHRTcmMubGFzdEluZGV4T2YoJy8nKSArIDEpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCBpbXBsZW1lbnRzIEJhY2tlbmQge1xyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIFdlYkFzc2VtYmx5IGJhY2tlbmQuXHJcbiAgICpcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIG9ubHkgb25jZSBmb3IgZWFjaCBiYWNrZW5kIG5hbWUuIEl0IHdpbGwgYmUgY2FsbGVkIHRoZSBmaXJzdCB0aW1lIHdoZW5cclxuICAgKiBgb3J0LkluZmVyZW5jZVNlc3Npb24uY3JlYXRlKClgIGlzIGNhbGxlZCB3aXRoIGEgcmVnaXN0ZXJlZCBiYWNrZW5kIG5hbWUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYmFja2VuZE5hbWUgLSB0aGUgcmVnaXN0ZXJlZCBiYWNrZW5kIG5hbWUuXHJcbiAgICovXHJcbiAgYXN5bmMgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyBwb3B1bGF0ZSB3YXNtIGZsYWdzXHJcbiAgICBpbml0aWFsaXplRmxhZ3MoKTtcclxuXHJcbiAgICAvLyBpbml0IHdhc21cclxuICAgIGF3YWl0IGluaXRpYWxpemVXZWJBc3NlbWJseUFuZE9ydFJ1bnRpbWUoKTtcclxuXHJcbiAgICAvLyBwZXJmb3JtZSBFUCBzcGVjaWZpYyBpbml0aWFsaXphdGlvblxyXG4gICAgYXdhaXQgaW5pdGlhbGl6ZU9ydEVwKGJhY2tlbmROYW1lKTtcclxuICB9XHJcbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIocGF0aDogc3RyaW5nLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XHJcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xyXG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOlxyXG4gICAgICBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcclxuICBhc3luYyBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihwYXRoT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6XHJcbiAgICAgIFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+IHtcclxuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgT25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyKCk7XHJcbiAgICBhd2FpdCBoYW5kbGVyLmxvYWRNb2RlbChwYXRoT3JCdWZmZXIsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShoYW5kbGVyKTtcclxuICB9XHJcbn1cclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge0luZmVyZW5jZVNlc3Npb24sIFRlbnNvcn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB7U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsIFRlbnNvck1ldGFkYXRhfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcclxuaW1wb3J0IHtzZXRSdW5PcHRpb25zfSBmcm9tICcuL3J1bi1vcHRpb25zJztcclxuaW1wb3J0IHtzZXRTZXNzaW9uT3B0aW9uc30gZnJvbSAnLi9zZXNzaW9uLW9wdGlvbnMnO1xyXG5pbXBvcnQge2RhdGFMb2NhdGlvblN0cmluZ1RvRW51bSwgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcsIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtLCB0ZW5zb3JUeXBlVG9UeXBlZEFycmF5Q29uc3RydWN0b3J9IGZyb20gJy4vd2FzbS1jb21tb24nO1xyXG5pbXBvcnQge3ByZXBhcmVJbnB1dE91dHB1dFRlbnNvcn0gZnJvbSAnLi93YXNtLWNvcmUtaW1wbCc7XHJcbmltcG9ydCB7Z2V0SW5zdGFuY2V9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcclxuaW1wb3J0IHtjaGVja0xhc3RFcnJvcn0gZnJvbSAnLi93YXNtLXV0aWxzJztcclxuXHJcbmNvbnN0IE5PX1RSQUlOX0ZVTkNTX01TRyA9XHJcbiAgICAnQnVpbHQgd2l0aG91dCB0cmFpbmluZyBBUElcXCdzIGVuYWJsZWQuIFVzZSB0aGUgb25ueHJ1bnRpbWUtd2ViL3RyYWluaW5nIGltcG9ydCBmb3IgdHJhaW5pbmcgJyArXHJcbiAgICAnZnVuY3Rpb25hbGl0eSwgYW5kIG1ha2Ugc3VyZSB0aGF0IGFsbCB0aGUgY29ycmVjdCBhcnRpZmFjdHMgYXJlIGJ1aWx0ICYgbW92ZWQgdG8gdGhlIGNvcnJlY3QgZm9sZGVyIGlmICcgK1xyXG4gICAgJ3VzaW5nIGEgY3VzdG9tIGJ1aWxkLiBDaGVjayBodHRwczovL29ubnhydW50aW1lLmFpL2RvY3MvYnVpbGQvd2ViLmh0bWwgZm9yIG1vcmUgaW5mb3JtYXRpb24uJztcclxuXHJcbi8qKlxyXG4gKiBSdW5zIHRoZSBjaGVja0xhc3RFcnJvciBmdW5jdGlvbiB3aGljaCB3aWxsIHRocm93IGFuIGVycm9yLCBpZiB0aGUgcHJvdmlkZWQgZXJyb3IgY29kZSBtYXRjaGVzIHRoZSBzcGVjaWZpZWRcclxuICogcGF0dGVybiBmb3IgYW4gZXJyb3IgY29kZS5cclxuICogQHBhcmFtIGVyckNvZGUgbnVtYmVyIHRvIGV2YWx1YXRlZCBmb3IgaWYgaXQncyBhbiBlcnJvclxyXG4gKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlIHRvIHBhc3MgaW50byBjaGVja0xhc3RFcnJvclxyXG4gKiBAcGFyYW0gY2hlY2tOZXFaZXJvIHdoZW4gdHJ1ZSwgdHJlYXRzIG5vdCBlcXVhbCB0byB6ZXJvIGFzIGFuIGVycm9yLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgIFdoZW4gZmFsc2UsIHRyZWF0cyBlcXVhbCB0byB6ZXJvIGFzIGFuIGVycm9yLlxyXG4gKi9cclxuY29uc3QgaWZFcnJDb2RlQ2hlY2tMYXN0RXJyb3IgPSAoZXJyQ29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcsIGNoZWNrTmVxWmVybyA9IHRydWUpID0+IHtcclxuICBpZiAoY2hlY2tOZXFaZXJvICYmIGVyckNvZGUgIT09IDApIHtcclxuICAgIGNoZWNrTGFzdEVycm9yKG1lc3NhZ2UpO1xyXG4gIH0gZWxzZSBpZiAoIWNoZWNrTmVxWmVybyAmJiBlcnJDb2RlID09PSAwKSB7XHJcbiAgICBjaGVja0xhc3RFcnJvcihtZXNzYWdlKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlQ2hlY2twb2ludEhhbmRsZSA9IChjaGVja3BvaW50RGF0YTogU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIpOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG5cclxuICBjb25zdCBbY2hlY2twb2ludERhdGFPZmZzZXQsIGNoZWNrcG9pbnREYXRhTGVuZ3RoXSA9IGNoZWNrcG9pbnREYXRhO1xyXG4gIGxldCBjaGVja3BvaW50SGFuZGxlID0gMDtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGlmICh3YXNtLl9PcnRUcmFpbmluZ0xvYWRDaGVja3BvaW50KSB7XHJcbiAgICAgIGNoZWNrcG9pbnRIYW5kbGUgPSB3YXNtLl9PcnRUcmFpbmluZ0xvYWRDaGVja3BvaW50KGNoZWNrcG9pbnREYXRhT2Zmc2V0LCBjaGVja3BvaW50RGF0YUxlbmd0aCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVFJBSU5fRlVOQ1NfTVNHKTtcclxuICAgIH1cclxuXHJcbiAgICBpZkVyckNvZGVDaGVja0xhc3RFcnJvcihjaGVja3BvaW50SGFuZGxlLCAnRXJyb3Igb2NjdXJyZWQgd2hlbiB0cnlpbmcgdG8gY3JlYXRlIGEgQ2hlY2twb2ludFN0YXRlJywgZmFsc2UpO1xyXG4gICAgcmV0dXJuIGNoZWNrcG9pbnRIYW5kbGU7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgaWYgKHdhc20uX09ydFRyYWluaW5nUmVsZWFzZUNoZWNrcG9pbnQgJiYgY2hlY2twb2ludEhhbmRsZSAhPT0gMCkge1xyXG4gICAgICB3YXNtLl9PcnRUcmFpbmluZ1JlbGVhc2VDaGVja3BvaW50KGNoZWNrcG9pbnRIYW5kbGUpO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgZTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgLy8gZnJlZSBidWZmZXIgZnJvbSB3YXNtIGhlYXBcclxuICAgIHdhc20uX09ydEZyZWUoY2hlY2twb2ludERhdGFbMF0pO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGdldE1vZGVsSW5wdXRPdXRwdXRDb3VudCA9ICh0cmFpbmluZ1Nlc3Npb25JZDogbnVtYmVyLCBpc0V2YWxNb2RlbDogYm9vbGVhbik6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcclxuICB0cnkge1xyXG4gICAgY29uc3QgZGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg4KTtcclxuICAgIGlmICh3YXNtLl9PcnRUcmFpbmluZ0dldE1vZGVsSW5wdXRPdXRwdXRDb3VudCkge1xyXG4gICAgICBjb25zdCBlcnJvckNvZGUgPVxyXG4gICAgICAgICAgd2FzbS5fT3J0VHJhaW5pbmdHZXRNb2RlbElucHV0T3V0cHV0Q291bnQodHJhaW5pbmdTZXNzaW9uSWQsIGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyA0LCBpc0V2YWxNb2RlbCk7XHJcbiAgICAgIGlmRXJyQ29kZUNoZWNrTGFzdEVycm9yKGVycm9yQ29kZSwgJ0NhblxcJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IGNvdW50LicpO1xyXG4gICAgICByZXR1cm4gW3dhc20uSEVBUDMyW2RhdGFPZmZzZXQgLyA0XSwgd2FzbS5IRUFQMzJbZGF0YU9mZnNldCAvIDQgKyAxXV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVFJBSU5fRlVOQ1NfTVNHKTtcclxuICAgIH1cclxuICB9IGZpbmFsbHkge1xyXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGdldE1vZGVsSW5wdXRPdXRwdXROYW1lc0xvb3AgPVxyXG4gICAgKHRyYWluaW5nU2Vzc2lvbklkOiBudW1iZXIsIGNvdW50OiBudW1iZXIsIGlzSW5wdXQ6IGJvb2xlYW4sIGlzRXZhbE1vZGVsOiBib29sZWFuKTogc3RyaW5nW10gPT4ge1xyXG4gICAgICBjb25zdCBuYW1lcyA9IFtdO1xyXG4gICAgICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIGlmICh3YXNtLl9PcnRUcmFpbmluZ0dldE1vZGVsSW5wdXRPdXRwdXROYW1lKSB7XHJcbiAgICAgICAgICBjb25zdCBuYW1lID0gd2FzbS5fT3J0VHJhaW5pbmdHZXRNb2RlbElucHV0T3V0cHV0TmFtZSh0cmFpbmluZ1Nlc3Npb25JZCwgaSwgaXNJbnB1dCwgaXNFdmFsTW9kZWwpO1xyXG4gICAgICAgICAgaWZFcnJDb2RlQ2hlY2tMYXN0RXJyb3IobmFtZSwgYENhbid0IGdldCBpbnB1dCBvciBvdXRwdXQgbmFtZSAtLSBpcyBpbnB1dDogJHtpc0lucHV0fSwgaW5kZXggJHtpfWAsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICBuYW1lcy5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG5hbWUpKTtcclxuICAgICAgICAgIHdhc20uX2ZyZWUobmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihOT19UUkFJTl9GVU5DU19NU0cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmFtZXM7XHJcbiAgICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldE1vZGVsSW5wdXRPdXRwdXROYW1lcyA9ICh0cmFpbmluZ1Nlc3Npb25JZDogbnVtYmVyLCBpc0V2YWxNb2RlbDogYm9vbGVhbik6IFtzdHJpbmdbXSwgc3RyaW5nW11dID0+IHtcclxuICBsZXQgaW5wdXROYW1lczogc3RyaW5nW10gPSBbXTtcclxuICBsZXQgb3V0cHV0TmFtZXM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gIGNvbnN0IFtpbnB1dENvdW50LCBvdXRwdXRDb3VudF0gPSBnZXRNb2RlbElucHV0T3V0cHV0Q291bnQodHJhaW5pbmdTZXNzaW9uSWQsIGlzRXZhbE1vZGVsKTtcclxuXHJcbiAgaW5wdXROYW1lcyA9IGdldE1vZGVsSW5wdXRPdXRwdXROYW1lc0xvb3AodHJhaW5pbmdTZXNzaW9uSWQsIGlucHV0Q291bnQsIHRydWUsIGlzRXZhbE1vZGVsKTtcclxuICBvdXRwdXROYW1lcyA9IGdldE1vZGVsSW5wdXRPdXRwdXROYW1lc0xvb3AodHJhaW5pbmdTZXNzaW9uSWQsIG91dHB1dENvdW50LCBmYWxzZSwgaXNFdmFsTW9kZWwpO1xyXG5cclxuICByZXR1cm4gW2lucHV0TmFtZXMsIG91dHB1dE5hbWVzXTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGUgPVxyXG4gICAgKGNoZWNrcG9pbnRIYW5kbGU6IG51bWJlciwgdHJhaW5Nb2RlbERhdGE6IFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyLCBldmFsTW9kZWxEYXRhOiBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcclxuICAgICBvcHRpbWl6ZXJNb2RlbERhdGE6IFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyLCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogbnVtYmVyID0+IHtcclxuICAgICAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgICBsZXQgdHJhaW5pbmdTZXNzaW9uSGFuZGxlID0gMDtcclxuICAgICAgbGV0IHNlc3Npb25PcHRpb25zSGFuZGxlID0gMDtcclxuICAgICAgbGV0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdID0gc2V0U2Vzc2lvbk9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKHdhc20uX09ydFRyYWluaW5nQ3JlYXRlU2Vzc2lvbikge1xyXG4gICAgICAgICAgdHJhaW5pbmdTZXNzaW9uSGFuZGxlID0gd2FzbS5fT3J0VHJhaW5pbmdDcmVhdGVTZXNzaW9uKFxyXG4gICAgICAgICAgICAgIHNlc3Npb25PcHRpb25zSGFuZGxlLCBjaGVja3BvaW50SGFuZGxlLCB0cmFpbk1vZGVsRGF0YVswXSwgdHJhaW5Nb2RlbERhdGFbMV0sIGV2YWxNb2RlbERhdGFbMF0sXHJcbiAgICAgICAgICAgICAgZXZhbE1vZGVsRGF0YVsxXSwgb3B0aW1pemVyTW9kZWxEYXRhWzBdLCBvcHRpbWl6ZXJNb2RlbERhdGFbMV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVFJBSU5fRlVOQ1NfTVNHKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmRXJyQ29kZUNoZWNrTGFzdEVycm9yKHRyYWluaW5nU2Vzc2lvbkhhbmRsZSwgJ0Vycm9yIG9jY3VycmVkIHdoZW4gdHJ5aW5nIHRvIGNyZWF0ZSBhIFRyYWluaW5nU2Vzc2lvbicsIGZhbHNlKTtcclxuICAgICAgICByZXR1cm4gdHJhaW5pbmdTZXNzaW9uSGFuZGxlO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKHdhc20uX09ydFRyYWluaW5nUmVsZWFzZVNlc3Npb24gJiYgdHJhaW5pbmdTZXNzaW9uSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgICAgICB3YXNtLl9PcnRUcmFpbmluZ1JlbGVhc2VTZXNzaW9uKHRyYWluaW5nU2Vzc2lvbkhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgd2FzbS5fZnJlZSh0cmFpbk1vZGVsRGF0YVswXSk7XHJcbiAgICAgICAgd2FzbS5fZnJlZShldmFsTW9kZWxEYXRhWzBdKTtcclxuICAgICAgICB3YXNtLl9mcmVlKG9wdGltaXplck1vZGVsRGF0YVswXSk7XHJcblxyXG4gICAgICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xyXG4gICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zKHNlc3Npb25PcHRpb25zSGFuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYWxsb2NzLmZvckVhY2goYWxsb2MgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuLyoqXHJcbiAqIFByZXBhcmVzIGlucHV0IGFuZCBvdXRwdXQgdGVuc29ycyBieSBjcmVhdGluZyB0aGUgdGVuc29ycyBpbiB0aGUgV0FTTSBzaWRlIHRoZW4gY3JlYXRlcyBhIGxpc3Qgb2YgdGhlIGhhbmRsZXMgb2YgdGhlXHJcbiAqIFdBU00gdGVuc29ycy5cclxuICpcclxuICogQHBhcmFtIHRyYWluaW5nU2Vzc2lvbklkXHJcbiAqIEBwYXJhbSBpbmRpY2VzIGZvciBlYWNoIHRlbnNvciwgdGhlIGluZGV4IG9mIHRoZSBpbnB1dCBvciBvdXRwdXQgbmFtZSB0aGF0IHRoZSB0ZW5zb3IgY29ycmVzcG9uZHMgd2l0aFxyXG4gKiBAcGFyYW0gdGVuc29ycyBsaXN0IG9mIFRlbnNvck1ldGFEYXRhXHJcbiAqIEBwYXJhbSB0ZW5zb3JIYW5kbGVzIHNob3VsZCBwYXNzIGluIGFuIGVtcHR5IGxpc3Qgb2YgbnVtYmVyczsgbW9kaWZpZWQgaW4tcGxhY2UgYnkgdGhpcyBtZXRob2QgJiBzdG9yZXMgdGhlIHJlc3VsdGluZ1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVzIG9mIHRoZSBhbGxvY2F0ZWQgdGVuc29ycyBvbiB0aGUgaGVhcFxyXG4gKiBAcGFyYW0gaW5wdXRPdXRwdXRBbGxvY3MgbW9kaWZpZWQgaW4tcGxhY2UgYnkgdGhpcyBtZXRob2RcclxuICogQHBhcmFtIGluZGV4QWRkIGNvbnN0YW50IHRvIGFkZCB0byB0aGUgaW5kZXggdGhhdCBpcyBwYXNzZWQgdG8gcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yXHJcbiAqL1xyXG5jb25zdCBjcmVhdGVBbmRBbGxvY2F0ZVRlbnNvcnMgPVxyXG4gICAgKHRyYWluaW5nU2Vzc2lvbklkOiBudW1iZXIsIGluZGljZXM6IG51bWJlcltdLCB0ZW5zb3JzOiBBcnJheTxUZW5zb3JNZXRhZGF0YXxudWxsPiwgdGVuc29ySGFuZGxlczogbnVtYmVyW10sXHJcbiAgICAgaW5wdXRPdXRwdXRBbGxvY3M6IG51bWJlcltdLCBpbmRleEFkZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvdW50ID0gaW5kaWNlcy5sZW5ndGg7XHJcblxyXG4gICAgICAvLyBjcmVhdGVzIHRoZSB0ZW5zb3JzXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcihcclxuICAgICAgICAgICAgdGVuc29yc1tpXSwgdGVuc29ySGFuZGxlcywgaW5wdXRPdXRwdXRBbGxvY3MsIHRyYWluaW5nU2Vzc2lvbklkLCBpbmRleEFkZCArIGluZGljZXNbaV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBtb3ZlcyB0byBoZWFwXHJcbiAgICAgIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gICAgICBjb25zdCB2YWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoY291bnQgKiA0KTtcclxuICAgICAgbGV0IHZhbHVlc0luZGV4ID0gdmFsdWVzT2Zmc2V0IC8gNDtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgd2FzbS5IRUFQVTMyW3ZhbHVlc0luZGV4KytdID0gdGVuc29ySGFuZGxlc1tpXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHZhbHVlc09mZnNldDtcclxuICAgIH07XHJcblxyXG4vKipcclxuICogUmV0cmlldmVzIHRoZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBvdXRwdXQgdGVuc29yIGhhbmRsZXMsIGNvcGllcyB0byBhbiBhcnJheSwgYW5kIGZyZWVzIHRoZSBXQVNNIGluZm9ybWF0aW9uXHJcbiAqIGFzc29jaWF0ZWQgd2l0aCB0aGUgdGVuc29yIGhhbmRsZS5cclxuICpcclxuICogQHBhcmFtIG91dHB1dFZhbHVlc09mZnNldFxyXG4gKiBAcGFyYW0gb3V0cHV0Q291bnRcclxuICogQHJldHVybnMgbGlzdCBvZiBUZW5zb3JNZXRhZGF0YSByZXRyaWV2ZWQgZnJvbSB0aGUgb3V0cHV0IGhhbmRsZXMuXHJcbiAqL1xyXG5jb25zdCBtb3ZlT3V0cHV0VG9UZW5zb3JNZXRhZGF0YUFyciA9XHJcbiAgICAob3V0cHV0VmFsdWVzT2Zmc2V0OiBudW1iZXIsIG91dHB1dENvdW50OiBudW1iZXIsIG91dHB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdLFxyXG4gICAgIG91dHB1dFRlbnNvcnM6IEFycmF5PFRlbnNvck1ldGFkYXRhfG51bGw+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gICAgICBjb25zdCBvdXRwdXQ6IFRlbnNvck1ldGFkYXRhW10gPSBbXTtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHRlbnNvciA9IHdhc20uSEVBUFUzMltvdXRwdXRWYWx1ZXNPZmZzZXQgLyA0ICsgaV07XHJcbiAgICAgICAgaWYgKHRlbnNvciA9PT0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXSkge1xyXG4gICAgICAgICAgLy8gb3V0cHV0IHRlbnNvciBpcyBwcmUtYWxsb2NhdGVkLiBubyBuZWVkIHRvIGNvcHkgZGF0YS5cclxuICAgICAgICAgIG91dHB1dC5wdXNoKG91dHB1dFRlbnNvcnNbaV0hKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcclxuICAgICAgICAvLyBzdGFjayBhbGxvY2F0ZSA0IHBvaW50ZXIgdmFsdWVcclxuICAgICAgICBjb25zdCB0ZW5zb3JEYXRhT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDQgKiA0KTtcclxuXHJcbiAgICAgICAgbGV0IHR5cGU6IFRlbnNvci5UeXBlfHVuZGVmaW5lZCwgZGF0YU9mZnNldCA9IDA7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldFRlbnNvckRhdGEoXHJcbiAgICAgICAgICAgICAgdGVuc29yLCB0ZW5zb3JEYXRhT2Zmc2V0LCB0ZW5zb3JEYXRhT2Zmc2V0ICsgNCwgdGVuc29yRGF0YU9mZnNldCArIDgsIHRlbnNvckRhdGFPZmZzZXQgKyAxMik7XHJcbiAgICAgICAgICBpZkVyckNvZGVDaGVja0xhc3RFcnJvcihlcnJvckNvZGUsIGBDYW4ndCBhY2Nlc3Mgb3V0cHV0IHRlbnNvciBkYXRhIG9uIGluZGV4ICR7aX0uYCk7XHJcblxyXG4gICAgICAgICAgbGV0IHRlbnNvckRhdGFJbmRleCA9IHRlbnNvckRhdGFPZmZzZXQgLyA0O1xyXG4gICAgICAgICAgY29uc3QgZGF0YVR5cGUgPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xyXG4gICAgICAgICAgZGF0YU9mZnNldCA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XHJcbiAgICAgICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcclxuICAgICAgICAgIGNvbnN0IGRpbXNMZW5ndGggPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xyXG4gICAgICAgICAgY29uc3QgZGltcyA9IFtdO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGltcy5wdXNoKHdhc20uSEVBUFUzMltkaW1zT2Zmc2V0IC8gNCArIGldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHdhc20uX09ydEZyZWUoZGltc09mZnNldCk7XHJcblxyXG4gICAgICAgICAgY29uc3Qgc2l6ZSA9IGRpbXMucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSk7XHJcbiAgICAgICAgICB0eXBlID0gdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcoZGF0YVR5cGUpO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmdEYXRhOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgZGF0YUluZGV4ID0gZGF0YU9mZnNldCAvIDQ7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gd2FzbS5IRUFQVTMyW2RhdGFJbmRleCsrXTtcclxuICAgICAgICAgICAgICBjb25zdCBtYXhCeXRlc1RvUmVhZCA9IGkgPT09IHNpemUgLSAxID8gdW5kZWZpbmVkIDogd2FzbS5IRUFQVTMyW2RhdGFJbmRleF0gLSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgc3RyaW5nRGF0YS5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG9mZnNldCwgbWF4Qnl0ZXNUb1JlYWQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgc3RyaW5nRGF0YSwgJ2NwdSddKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG5ldyB0eXBlZEFycmF5Q29uc3RydWN0b3Ioc2l6ZSk7XHJcbiAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGEuYnl0ZUxlbmd0aClcclxuICAgICAgICAgICAgICAgIC5zZXQod2FzbS5IRUFQVTguc3ViYXJyYXkoZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aCkpO1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChbdHlwZSwgZGltcywgZGF0YSwgJ2NwdSddKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrKTtcclxuICAgICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiBkYXRhT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHdhc20uX2ZyZWUoZGF0YU9mZnNldCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBsYXp5UmVzZXRHcmFkID0gYXN5bmModHJhaW5pbmdTZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG5cclxuICBpZiAod2FzbS5fT3J0VHJhaW5pbmdMYXp5UmVzZXRHcmFkKSB7XHJcbiAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRUcmFpbmluZ0xhenlSZXNldEdyYWQodHJhaW5pbmdTZXNzaW9uSWQpO1xyXG4gICAgaWZFcnJDb2RlQ2hlY2tMYXN0RXJyb3IoZXJyb3JDb2RlLCAnQ2FuXFwndCBjYWxsIGxhenlSZXNldEdyYWQuJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihOT19UUkFJTl9GVU5DU19NU0cpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBydW5UcmFpblN0ZXAgPSBhc3luYyhcclxuICAgIHRyYWluaW5nU2Vzc2lvbklkOiBudW1iZXIsIGlucHV0SW5kaWNlczogbnVtYmVyW10sIGlucHV0VGVuc29yczogVGVuc29yTWV0YWRhdGFbXSwgb3V0cHV0SW5kaWNlczogbnVtYmVyW10sXHJcbiAgICBvdXRwdXRUZW5zb3JzOiBBcnJheTxUZW5zb3JNZXRhZGF0YXxudWxsPiwgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcblxyXG4gIGNvbnN0IGlucHV0Q291bnQgPSBpbnB1dEluZGljZXMubGVuZ3RoO1xyXG4gIGNvbnN0IG91dHB1dENvdW50ID0gb3V0cHV0SW5kaWNlcy5sZW5ndGg7XHJcblxyXG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcclxuICBsZXQgcnVuT3B0aW9uc0FsbG9jczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgY29uc3QgaW5wdXRUZW5zb3JIYW5kbGVzOiBudW1iZXJbXSA9IFtdO1xyXG4gIGNvbnN0IG91dHB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XHJcbiAgY29uc3QgaW5wdXRPdXRwdXRBbGxvY3M6IG51bWJlcltdID0gW107XHJcblxyXG4gIGNvbnN0IGJlZm9yZVJ1blN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIHByZXBhcmUgcGFyYW1ldGVycyBieSBtb3ZpbmcgdGhlbSB0byBoZWFwXHJcbiAgICBbcnVuT3B0aW9uc0hhbmRsZSwgcnVuT3B0aW9uc0FsbG9jc10gPSBzZXRSdW5PcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIGhhbmRsZSBpbnB1dHMgLS0geW91IGRvbid0IHdhbnQgYW55dGhpbmcgYWRkZWQgdG8gdGhlIGluZGV4XHJcbiAgICBjb25zdCBpbnB1dFZhbHVlc09mZnNldCA9IGNyZWF0ZUFuZEFsbG9jYXRlVGVuc29ycyhcclxuICAgICAgICB0cmFpbmluZ1Nlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dFRlbnNvcnMsIGlucHV0VGVuc29ySGFuZGxlcywgaW5wdXRPdXRwdXRBbGxvY3MsIDApO1xyXG4gICAgLy8gaGFuZGxlIG91dHB1dHNcclxuICAgIC8vIHlvdSB3YW50IGlucHV0Q291bnQgdG8gYmUgYWRkZWQgdG8gdGhlIGluZGV4IG9mIGV2ZXJ5IG91dHB1dCB0ZW5zb3IgcGFzc2VkIHRvIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvclxyXG4gICAgY29uc3Qgb3V0cHV0VmFsdWVzT2Zmc2V0ID0gY3JlYXRlQW5kQWxsb2NhdGVUZW5zb3JzKFxyXG4gICAgICAgIHRyYWluaW5nU2Vzc2lvbklkLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRUZW5zb3JzLCBvdXRwdXRUZW5zb3JIYW5kbGVzLCBpbnB1dE91dHB1dEFsbG9jcywgaW5wdXRDb3VudCk7XHJcblxyXG4gICAgaWYgKHdhc20uX09ydFRyYWluaW5nUnVuVHJhaW5TdGVwKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydFRyYWluaW5nUnVuVHJhaW5TdGVwKFxyXG4gICAgICAgICAgdHJhaW5pbmdTZXNzaW9uSWQsIGlucHV0VmFsdWVzT2Zmc2V0LCBpbnB1dENvdW50LCBvdXRwdXRWYWx1ZXNPZmZzZXQsIG91dHB1dENvdW50LCBydW5PcHRpb25zSGFuZGxlKTtcclxuICAgICAgaWZFcnJDb2RlQ2hlY2tMYXN0RXJyb3IoZXJyb3JDb2RlLCAnZmFpbGVkIHRvIGNhbGwgT3J0VHJhaW5pbmdSdW5UcmFpblN0ZXAgaW4gdGhlIFdlYkFzc2VtYmx5IGxheWVyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVFJBSU5fRlVOQ1NfTVNHKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbW92ZU91dHB1dFRvVGVuc29yTWV0YWRhdGFBcnIob3V0cHV0VmFsdWVzT2Zmc2V0LCBvdXRwdXRDb3VudCwgb3V0cHV0VGVuc29ySGFuZGxlcywgb3V0cHV0VGVuc29ycyk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHdhc20uc3RhY2tSZXN0b3JlKGJlZm9yZVJ1blN0YWNrKTtcclxuXHJcbiAgICBpbnB1dFRlbnNvckhhbmRsZXMuZm9yRWFjaCh2ID0+IHdhc20uX09ydFJlbGVhc2VUZW5zb3IodikpO1xyXG4gICAgb3V0cHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKHYgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XHJcbiAgICBpbnB1dE91dHB1dEFsbG9jcy5mb3JFYWNoKHAgPT4gd2FzbS5fZnJlZShwKSk7XHJcblxyXG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgIT09IDApIHtcclxuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XHJcbiAgICB9XHJcbiAgICBydW5PcHRpb25zQWxsb2NzLmZvckVhY2gocCA9PiB3YXNtLl9mcmVlKHApKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcnVuT3B0aW1pemVyU3RlcCA9XHJcbiAgICBhc3luYyh0cmFpbmluZ1Nlc3Npb25JZDogbnVtYmVyLCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xyXG4gIGxldCBydW5PcHRpb25zQWxsb2NzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICB0cnkge1xyXG4gICAgW3J1bk9wdGlvbnNIYW5kbGUsIHJ1bk9wdGlvbnNBbGxvY3NdID0gc2V0UnVuT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICBpZiAod2FzbS5fT3J0VHJhaW5pbmdPcHRpbWl6ZXJTdGVwKSB7XHJcbiAgICAgIGNvbnN0IGVyckNvZGUgPSB3YXNtLl9PcnRUcmFpbmluZ09wdGltaXplclN0ZXAodHJhaW5pbmdTZXNzaW9uSWQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xyXG4gICAgICBpZkVyckNvZGVDaGVja0xhc3RFcnJvcihlcnJDb2RlLCAnRmFpbGVkIHRvIGNhbGwgT3J0VHJhaW5pbmdPcHRpbWl6ZXJTdGVwIGluIHRoZSBXZWJBc3NlbWJseSBsYXllcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX1RSQUlOX0ZVTkNTX01TRyk7XHJcbiAgICB9XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgIHdhc20uX09ydFJlbGVhc2VSdW5PcHRpb25zKHJ1bk9wdGlvbnNIYW5kbGUpO1xyXG4gICAgfVxyXG4gICAgcnVuT3B0aW9uc0FsbG9jcy5mb3JFYWNoKHAgPT4gd2FzbS5fZnJlZShwKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJ1bkV2YWxTdGVwID0gYXN5bmMoXHJcbiAgICB0cmFpbmluZ1Nlc3Npb25JZDogbnVtYmVyLCBpbnB1dEluZGljZXM6IG51bWJlcltdLCBpbnB1dFRlbnNvcnM6IFRlbnNvck1ldGFkYXRhW10sIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxyXG4gICAgb3V0cHV0VGVuc29yczogQXJyYXk8VGVuc29yTWV0YWRhdGF8bnVsbD4sIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8VGVuc29yTWV0YWRhdGFbXT4gPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG5cclxuICBjb25zdCBpbnB1dENvdW50ID0gaW5wdXRJbmRpY2VzLmxlbmd0aDtcclxuICBjb25zdCBvdXRwdXRDb3VudCA9IG91dHB1dEluZGljZXMubGVuZ3RoO1xyXG5cclxuICBsZXQgcnVuT3B0aW9uc0hhbmRsZSA9IDA7XHJcbiAgbGV0IHJ1bk9wdGlvbnNBbGxvY3M6IG51bWJlcltdID0gW107XHJcblxyXG4gIGNvbnN0IGlucHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcclxuICBjb25zdCBvdXRwdXRUZW5zb3JIYW5kbGVzOiBudW1iZXJbXSA9IFtdO1xyXG4gIGNvbnN0IGlucHV0T3V0cHV0QWxsb2NzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBjb25zdCBiZWZvcmVSdW5TdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyBwcmVwYXJlIHBhcmFtZXRlcnMgYnkgbW92aW5nIHRoZW0gdG8gaGVhcFxyXG4gICAgW3J1bk9wdGlvbnNIYW5kbGUsIHJ1bk9wdGlvbnNBbGxvY3NdID0gc2V0UnVuT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICAvLyBoYW5kbGUgaW5wdXRzIC0tIHlvdSBkb24ndCB3YW50IGFueXRoaW5nIGFkZGVkIHRvIHRoZSBpbmRleFxyXG4gICAgY29uc3QgaW5wdXRWYWx1ZXNPZmZzZXQgPSBjcmVhdGVBbmRBbGxvY2F0ZVRlbnNvcnMoXHJcbiAgICAgICAgdHJhaW5pbmdTZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRUZW5zb3JzLCBpbnB1dFRlbnNvckhhbmRsZXMsIGlucHV0T3V0cHV0QWxsb2NzLCAwKTtcclxuICAgIC8vIGhhbmRsZSBvdXRwdXRzXHJcbiAgICAvLyB5b3Ugd2FudCBpbnB1dENvdW50IHRvIGJlIGFkZGVkIHRvIHRoZSBpbmRleCBvZiBldmVyeSBvdXRwdXQgdGVuc29yIHBhc3NlZCB0byBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3JcclxuICAgIGNvbnN0IG91dHB1dFZhbHVlc09mZnNldCA9IGNyZWF0ZUFuZEFsbG9jYXRlVGVuc29ycyhcclxuICAgICAgICB0cmFpbmluZ1Nlc3Npb25JZCwgb3V0cHV0SW5kaWNlcywgb3V0cHV0VGVuc29ycywgb3V0cHV0VGVuc29ySGFuZGxlcywgaW5wdXRPdXRwdXRBbGxvY3MsIGlucHV0Q291bnQpO1xyXG5cclxuICAgIGlmICh3YXNtLl9PcnRUcmFpbmluZ0V2YWxTdGVwKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydFRyYWluaW5nRXZhbFN0ZXAoXHJcbiAgICAgICAgICB0cmFpbmluZ1Nlc3Npb25JZCwgaW5wdXRWYWx1ZXNPZmZzZXQsIGlucHV0Q291bnQsIG91dHB1dFZhbHVlc09mZnNldCwgb3V0cHV0Q291bnQsIHJ1bk9wdGlvbnNIYW5kbGUpO1xyXG5cclxuICAgICAgaWZFcnJDb2RlQ2hlY2tMYXN0RXJyb3IoZXJyb3JDb2RlLCAnZmFpbGVkIHRvIGNhbGwgT3J0VHJhaW5pbmdFdmFsU3RlcCBpbiB0aGUgV2ViQXNzZW1ibHkgbGF5ZXInKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19UUkFJTl9GVU5DU19NU0cpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtb3ZlT3V0cHV0VG9UZW5zb3JNZXRhZGF0YUFycihvdXRwdXRWYWx1ZXNPZmZzZXQsIG91dHB1dENvdW50LCBvdXRwdXRUZW5zb3JIYW5kbGVzLCBvdXRwdXRUZW5zb3JzKTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xyXG5cclxuICAgIGlucHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKHYgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XHJcbiAgICBvdXRwdXRUZW5zb3JIYW5kbGVzLmZvckVhY2godiA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcclxuICAgIGlucHV0T3V0cHV0QWxsb2NzLmZvckVhY2gocCA9PiB3YXNtLl9mcmVlKHApKTtcclxuXHJcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xyXG4gICAgICB3YXNtLl9PcnRSZWxlYXNlUnVuT3B0aW9ucyhydW5PcHRpb25zSGFuZGxlKTtcclxuICAgIH1cclxuICAgIHJ1bk9wdGlvbnNBbGxvY3MuZm9yRWFjaChwID0+IHdhc20uX2ZyZWUocCkpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQYXJhbWV0ZXJzU2l6ZSA9ICh0cmFpbmluZ1Nlc3Npb25JZDogbnVtYmVyLCB0cmFpbmFibGVPbmx5OiBib29sZWFuKTogbnVtYmVyID0+IHtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzaXplT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDQpO1xyXG4gICAgaWYgKHdhc20uX09ydFRyYWluaW5nR2V0UGFyYW1ldGVyc1NpemUpIHtcclxuICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0VHJhaW5pbmdHZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmluZ1Nlc3Npb25JZCwgc2l6ZU9mZnNldCwgdHJhaW5hYmxlT25seSk7XHJcbiAgICAgIGlmRXJyQ29kZUNoZWNrTGFzdEVycm9yKGVycm9yQ29kZSwgJ0NhblxcJ3QgZ2V0IHBhcmFtZXRlcnMgc2l6ZScpO1xyXG5cclxuICAgICAgcmV0dXJuIHdhc20uSEVBUDMyW3NpemVPZmZzZXQgLyA0XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihOT19UUkFJTl9GVU5DU19NU0cpO1xyXG4gICAgfVxyXG4gIH0gZmluYWxseSB7XHJcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzID1cclxuICAgIGFzeW5jKHRyYWluaW5nU2Vzc2lvbklkOiBudW1iZXIsIHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvck1ldGFkYXRhPiA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xyXG5cclxuICBjb25zdCB0ZW5zb3JUeXBlQXNTdHJpbmcgPSAnZmxvYXQzMic7XHJcbiAgY29uc3QgbG9jYXRpb25Bc1N0cmluZyA9ICdjcHUnO1xyXG5cclxuICBjb25zdCBwYXJhbWV0ZXJzU2l6ZSA9IGdldFBhcmFtZXRlcnNTaXplKHRyYWluaW5nU2Vzc2lvbklkLCB0cmFpbmFibGVPbmx5KTtcclxuICBsZXQgdGVuc29yID0gMDtcclxuXHJcbiAgLy8gYWxsb2NhdGVzIGEgYnVmZmVyIG9mIHRoZSBjb3JyZWN0IHNpemUgb24gdGhlIFdBU00gaGVhcFxyXG4gIGNvbnN0IHBhcmFtc0J5dGVMZW5ndGggPSA0ICogcGFyYW1ldGVyc1NpemU7XHJcbiAgY29uc3QgcGFyYW1zT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKHBhcmFtc0J5dGVMZW5ndGgpO1xyXG5cclxuICAvLyBoYW5kbGVzIHRoZSBkaW1lbnNpb25zLXJlbGF0ZWQgY3JlYXRlVGVuc29yIHBhcmFtZXRlcnNcclxuICBjb25zdCBkaW1zID0gW3BhcmFtZXRlcnNTaXplXTtcclxuXHJcbiAgY29uc3QgZGltc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0KTtcclxuICBjb25zdCBkaW1zSW5kZXggPSBkaW1zT2Zmc2V0IC8gNDtcclxuICB3YXNtLkhFQVAzMltkaW1zSW5kZXhdID0gcGFyYW1ldGVyc1NpemU7XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyB3cmFwcyBhbGxvY2F0ZWQgYXJyYXkgaW4gYSB0ZW5zb3JcclxuICAgIHRlbnNvciA9IHdhc20uX09ydENyZWF0ZVRlbnNvcihcclxuICAgICAgICB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bSh0ZW5zb3JUeXBlQXNTdHJpbmcpLCBwYXJhbXNPZmZzZXQsIHBhcmFtc0J5dGVMZW5ndGgsIGRpbXNPZmZzZXQsIGRpbXMubGVuZ3RoLFxyXG4gICAgICAgIGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bShsb2NhdGlvbkFzU3RyaW5nKSk7XHJcbiAgICBpZkVyckNvZGVDaGVja0xhc3RFcnJvcihcclxuICAgICAgICB0ZW5zb3IsIGBDYW4ndCBjcmVhdGUgdGVuc29yIGZvciBnZXRDb250aWd1b3VzUGFyYW1ldGVycy4gc2Vzc2lvbj0ke3RyYWluaW5nU2Vzc2lvbklkfS5gLCBmYWxzZSk7XHJcblxyXG4gICAgaWYgKHdhc20uX09ydFRyYWluaW5nQ29weVBhcmFtZXRlcnNUb0J1ZmZlcikge1xyXG4gICAgICBjb25zdCBlcnJDb2RlID0gd2FzbS5fT3J0VHJhaW5pbmdDb3B5UGFyYW1ldGVyc1RvQnVmZmVyKHRyYWluaW5nU2Vzc2lvbklkLCB0ZW5zb3IsIHBhcmFtZXRlcnNTaXplLCB0cmFpbmFibGVPbmx5KTtcclxuICAgICAgaWZFcnJDb2RlQ2hlY2tMYXN0RXJyb3IoZXJyQ29kZSwgJ0NhblxcJ3QgZ2V0IGNvbnRpZ3VvdXMgcGFyYW1ldGVycy4nKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTk9fVFJBSU5fRlVOQ1NfTVNHKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb3BpZXMgZnJvbSBXQVNNIG1lbW9yeSB0byBhIEphdmFTY3JpcHQgdHlwZWQgYXJyYXksIHdoaWNoIGlzIHRoZW4gcHV0IGludG8gYSBUZW5zb3JNZXRhZGF0YSBvYmplY3RcclxuICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0ZW5zb3JUeXBlQXNTdHJpbmcpO1xyXG4gICAgY29uc3QgZGF0YSA9IG5ldyB0eXBlZEFycmF5Q29uc3RydWN0b3IocGFyYW1ldGVyc1NpemUpO1xyXG4gICAgY29uc3Qgb3V0cHV0OiBUZW5zb3JNZXRhZGF0YVtdID0gW107XHJcbiAgICBuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpXHJcbiAgICAgICAgLnNldCh3YXNtLkhFQVBVOC5zdWJhcnJheShwYXJhbXNPZmZzZXQsIHBhcmFtc09mZnNldCArIHBhcmFtc0J5dGVMZW5ndGgpKTtcclxuICAgIG91dHB1dC5wdXNoKFt0ZW5zb3JUeXBlQXNTdHJpbmcsIGRpbXMsIGRhdGEsIGxvY2F0aW9uQXNTdHJpbmddKTtcclxuICAgIGlmIChvdXRwdXQubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgc29tZXRoaW5nIHVuZXhwZWN0ZWQgaGFwcGVuZWQgaW4gdGhlIGdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzIGZ1bmN0aW9uLiBFeHBlY3RlZCBvdXRwdXQgbGVuZ3RoIG9mXHJcbiAgICAgb25lLCBnb3QgJHtvdXRwdXQubGVuZ3RofWApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG91dHB1dFswXTtcclxuICAgIH1cclxuICB9IGZpbmFsbHkge1xyXG4gICAgaWYgKHRlbnNvciAhPT0gMCkge1xyXG4gICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XHJcbiAgICB9XHJcbiAgICB3YXNtLl9mcmVlKHBhcmFtc09mZnNldCk7XHJcbiAgICB3YXNtLl9mcmVlKGRpbXNPZmZzZXQpO1xyXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2FkUGFyYW1ldGVyc0J1ZmZlciA9XHJcbiAgICBhc3luYyh0cmFpbmluZ1Nlc3Npb25JZDogbnVtYmVyLCBidWZmZXI6IFVpbnQ4QXJyYXksIHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XHJcblxyXG4gIGNvbnN0IHRlbnNvclR5cGVBc1N0cmluZyA9ICdmbG9hdDMyJztcclxuICBjb25zdCBsb2NhdGlvbkFzU3RyaW5nID0gJ2NwdSc7XHJcblxyXG4gIC8vIGFsbG9jYXRlcyAmIGNvcGllcyBKYXZhU2NyaXB0IGJ1ZmZlciB0byBXQVNNIGhlYXBcclxuICBjb25zdCBidWZmZXJCeXRlTGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcclxuICBjb25zdCBidWZmZXJDb3VudCA9IGJ1ZmZlckJ5dGVMZW5ndGggLyA0O1xyXG4gIGNvbnN0IGJ1ZmZlck9mZnNldCA9IHdhc20uX21hbGxvYyhidWZmZXJCeXRlTGVuZ3RoKTtcclxuICB3YXNtLkhFQVBVOC5zZXQoYnVmZmVyLCBidWZmZXJPZmZzZXQpO1xyXG5cclxuICAvLyBhbGxvY2F0ZXMgYW5kIGhhbmRsZXMgbW92aW5nIGRpbWVuc2lvbnMgaW5mb3JtYXRpb24gdG8gV0FTTSBtZW1vcnlcclxuICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDQpO1xyXG4gIHdhc20uSEVBUDMyW2RpbXNPZmZzZXQgLyA0XSA9IGJ1ZmZlckNvdW50O1xyXG4gIGNvbnN0IGRpbXNMZW5ndGggPSAxO1xyXG4gIGxldCB0ZW5zb3IgPSAwO1xyXG5cclxuICB0cnkge1xyXG4gICAgdGVuc29yID0gd2FzbS5fT3J0Q3JlYXRlVGVuc29yKFxyXG4gICAgICAgIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKHRlbnNvclR5cGVBc1N0cmluZyksIGJ1ZmZlck9mZnNldCwgYnVmZmVyQnl0ZUxlbmd0aCwgZGltc09mZnNldCwgZGltc0xlbmd0aCxcclxuICAgICAgICBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obG9jYXRpb25Bc1N0cmluZykpO1xyXG4gICAgaWZFcnJDb2RlQ2hlY2tMYXN0RXJyb3IodGVuc29yLCBgQ2FuJ3QgY3JlYXRlIHRlbnNvciBmb3IgaW5wdXQvb3V0cHV0LiBzZXNzaW9uPSR7dHJhaW5pbmdTZXNzaW9uSWR9YCwgZmFsc2UpO1xyXG5cclxuICAgIGlmICh3YXNtLl9PcnRUcmFpbmluZ0NvcHlQYXJhbWV0ZXJzRnJvbUJ1ZmZlcikge1xyXG4gICAgICBjb25zdCBlcnJDb2RlID0gd2FzbS5fT3J0VHJhaW5pbmdDb3B5UGFyYW1ldGVyc0Zyb21CdWZmZXIodHJhaW5pbmdTZXNzaW9uSWQsIHRlbnNvciwgYnVmZmVyQ291bnQsIHRyYWluYWJsZU9ubHkpO1xyXG4gICAgICBpZkVyckNvZGVDaGVja0xhc3RFcnJvcihlcnJDb2RlLCAnQ2FuXFwndCBjb3B5IGJ1ZmZlciB0byBwYXJhbWV0ZXJzLicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKE5PX1RSQUlOX0ZVTkNTX01TRyk7XHJcbiAgICB9XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGlmICh0ZW5zb3IgIT09IDApIHtcclxuICAgICAgd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpO1xyXG4gICAgfVxyXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xyXG4gICAgd2FzbS5fZnJlZShidWZmZXJPZmZzZXQpO1xyXG4gICAgd2FzbS5fZnJlZShkaW1zT2Zmc2V0KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVsZWFzZVRyYWluaW5nU2Vzc2lvbkFuZENoZWNrcG9pbnQgPSAoY2hlY2twb2ludElkOiBudW1iZXIsIHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcblxyXG4gIGlmICh3YXNtLl9PcnRUcmFpbmluZ1JlbGVhc2VTZXNzaW9uKSB7XHJcbiAgICB3YXNtLl9PcnRUcmFpbmluZ1JlbGVhc2VTZXNzaW9uKHNlc3Npb25JZCk7XHJcbiAgfVxyXG4gIGlmICh3YXNtLl9PcnRUcmFpbmluZ1JlbGVhc2VDaGVja3BvaW50KSB7XHJcbiAgICB3YXNtLl9PcnRUcmFpbmluZ1JlbGVhc2VDaGVja3BvaW50KGNoZWNrcG9pbnRJZCk7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7SW5mZXJlbmNlU2Vzc2lvbiwgT25ueFZhbHVlLCBTZXNzaW9uSGFuZGxlciwgVGVuc29yLCBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xyXG5cclxuaW1wb3J0IHtTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciwgVGVuc29yTWV0YWRhdGF9IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xyXG5pbXBvcnQge2RlY29kZVRlbnNvck1ldGFkYXRhLCBlbmNvZGVUZW5zb3JNZXRhZGF0YX0gZnJvbSAnLi9zZXNzaW9uLWhhbmRsZXItaW5mZXJlbmNlJztcclxuaW1wb3J0IHtjb3B5RnJvbUV4dGVybmFsQnVmZmVyfSBmcm9tICcuL3dhc20tY29yZS1pbXBsJztcclxuaW1wb3J0IHtjcmVhdGVDaGVja3BvaW50SGFuZGxlLCBjcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGUsIGdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzLCBnZXRNb2RlbElucHV0T3V0cHV0TmFtZXMsIGdldFBhcmFtZXRlcnNTaXplLCBsYXp5UmVzZXRHcmFkLCBsb2FkUGFyYW1ldGVyc0J1ZmZlciwgcmVsZWFzZVRyYWluaW5nU2Vzc2lvbkFuZENoZWNrcG9pbnQsIHJ1bkV2YWxTdGVwLCBydW5PcHRpbWl6ZXJTdGVwLCBydW5UcmFpblN0ZXB9IGZyb20gJy4vd2FzbS10cmFpbmluZy1jb3JlLWltcGwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlUcmFpbmluZ1Nlc3Npb25IYW5kbGVyIGltcGxlbWVudHMgVHJhaW5pbmdTZXNzaW9uSGFuZGxlciB7XHJcbiAgcHJpdmF0ZSBzZXNzaW9uSWQ6IG51bWJlcjtcclxuICBwcml2YXRlIGNoZWNrcG9pbnRJZDogbnVtYmVyO1xyXG5cclxuICBpbnB1dE5hbWVzOiBzdHJpbmdbXTtcclxuICBvdXRwdXROYW1lczogc3RyaW5nW107XHJcblxyXG4gIGV2YWxJbnB1dE5hbWVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIGV2YWxPdXRwdXROYW1lczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgYXN5bmMgdXJpT3JCdWZmZXJUb0hlYXAodXJpT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5KTogUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4ge1xyXG4gICAgbGV0IGJ1ZmZlcjogVWludDhBcnJheTtcclxuICAgIGlmICh0eXBlb2YgdXJpT3JCdWZmZXIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJpT3JCdWZmZXIpO1xyXG4gICAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XHJcbiAgICAgIGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJ1ZmZlciA9IHVyaU9yQnVmZmVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIoYnVmZmVyKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyZWF0ZVRyYWluaW5nU2Vzc2lvbihcclxuICAgICAgY2hlY2twb2ludFN0YXRlVXJpT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCB0cmFpbk1vZGVsVXJpT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LFxyXG4gICAgICBldmFsTW9kZWxVcmlPckJ1ZmZlcjogc3RyaW5nfFVpbnQ4QXJyYXksIG9wdGltaXplck1vZGVsVXJpT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LFxyXG4gICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKSB7XHJcbiAgICBjb25zdCBjaGVja3BvaW50RGF0YTogU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIgPSBhd2FpdCB0aGlzLnVyaU9yQnVmZmVyVG9IZWFwKGNoZWNrcG9pbnRTdGF0ZVVyaU9yQnVmZmVyKTtcclxuICAgIGNvbnN0IHRyYWluTW9kZWxEYXRhOiBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciA9IGF3YWl0IHRoaXMudXJpT3JCdWZmZXJUb0hlYXAodHJhaW5Nb2RlbFVyaU9yQnVmZmVyKTtcclxuICAgIC8vIDAgaXMgc3VwcG9zZWQgdG8gYmUgdGhlIG51bGxwdHJcclxuICAgIGxldCBldmFsTW9kZWxEYXRhOiBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciA9IFswLCAwXTtcclxuICAgIGxldCBvcHRpbWl6ZXJNb2RlbERhdGE6IFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyID0gWzAsIDBdO1xyXG5cclxuICAgIGlmIChldmFsTW9kZWxVcmlPckJ1ZmZlciAhPT0gJycpIHtcclxuICAgICAgZXZhbE1vZGVsRGF0YSA9IGF3YWl0IHRoaXMudXJpT3JCdWZmZXJUb0hlYXAoZXZhbE1vZGVsVXJpT3JCdWZmZXIpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGltaXplck1vZGVsVXJpT3JCdWZmZXIgIT09ICcnKSB7XHJcbiAgICAgIG9wdGltaXplck1vZGVsRGF0YSA9IGF3YWl0IHRoaXMudXJpT3JCdWZmZXJUb0hlYXAob3B0aW1pemVyTW9kZWxVcmlPckJ1ZmZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jaGVja3BvaW50SWQgPSBjcmVhdGVDaGVja3BvaW50SGFuZGxlKGNoZWNrcG9pbnREYXRhKTtcclxuICAgIHRoaXMuc2Vzc2lvbklkID1cclxuICAgICAgICBjcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGUodGhpcy5jaGVja3BvaW50SWQsIHRyYWluTW9kZWxEYXRhLCBldmFsTW9kZWxEYXRhLCBvcHRpbWl6ZXJNb2RlbERhdGEsIG9wdGlvbnMpO1xyXG4gICAgW3RoaXMuaW5wdXROYW1lcywgdGhpcy5vdXRwdXROYW1lc10gPSBnZXRNb2RlbElucHV0T3V0cHV0TmFtZXModGhpcy5zZXNzaW9uSWQsIGZhbHNlKTtcclxuICAgIGlmIChldmFsTW9kZWxVcmlPckJ1ZmZlciAhPT0gJycpIHtcclxuICAgICAgW3RoaXMuZXZhbElucHV0TmFtZXMsIHRoaXMuZXZhbE91dHB1dE5hbWVzXSA9IGdldE1vZGVsSW5wdXRPdXRwdXROYW1lcyh0aGlzLnNlc3Npb25JZCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgbWV0aG9kIHRoYXQgY29udmVydHMgYSBmZWVkcyBvciBmZXRjaGVzIGRhdGF0eXBlIHRvIHR3byBhcnJheXMsIG9uZSBvZiB2YWx1ZXMgYW5kIG9uZSB0aGF0IHN0b3JlcyB0aGVcclxuICAgKiBjb3JyZXNwb25kaW5nIG5hbWUgYXMgYSBudW1iZXIgcmVmZXJyaW5nIHRvIHRoZSBpbmRleCBpbiB0aGUgbGlzdCBvZiBuYW1lcyBwcm92aWRlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBmZWVkcyBtZWFudCB0byBtYXRjaCBlaXRoZXIgU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlIG9yIFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlXHJcbiAgICogQHBhcmFtIG5hbWVzIGVpdGhlciBpbnB1dE5hbWVzIG9yIG91dHB1dE5hbWVzXHJcbiAgICogQHJldHVybnMgYSB0dXBsZSBvZiBhIGxpc3Qgb2YgdmFsdWVzIGFuZCBhIGxpc3Qgb2YgaW5kaWNlcy5cclxuICAgKi9cclxuICBjb252ZXJ0TWFwSW50b1ZhbHVlc0FycmF5QW5kSW5kaWNlc0FycmF5PFQsIFU+KFxyXG4gICAgICBmZWVkczoge1tuYW1lOiBzdHJpbmddOiBUfSwgbmFtZXM6IHN0cmluZ1tdLCBtYXBGdW5jOiAodmFsOiBULCBpbmRleDogbnVtYmVyKSA9PiBVKTogW1RbXSwgbnVtYmVyW10sIFVbXV0ge1xyXG4gICAgY29uc3QgdmFsdWVzOiBUW10gPSBbXTtcclxuICAgIGNvbnN0IGluZGljZXM6IG51bWJlcltdID0gW107XHJcbiAgICBPYmplY3QuZW50cmllcyhmZWVkcykuZm9yRWFjaChrdnAgPT4ge1xyXG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xyXG4gICAgICBjb25zdCB0ZW5zb3IgPSBrdnBbMV07XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gbmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBpbnB1dCAnJHtuYW1lfWApO1xyXG4gICAgICB9XHJcbiAgICAgIHZhbHVlcy5wdXNoKHRlbnNvcik7XHJcbiAgICAgIGluZGljZXMucHVzaChpbmRleCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB1TGlzdCA9IHZhbHVlcy5tYXAobWFwRnVuYyk7XHJcbiAgICByZXR1cm4gW3ZhbHVlcywgaW5kaWNlcywgdUxpc3RdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIG1ldGhvZCB0aGF0IGNvbnZlcnRzIHRoZSBUZW5zb3JNZXRhZGF0YSB0aGF0IHRoZSB3YXNtLWNvcmUgZnVuY3Rpb25zIHJldHVybiB0byB0aGVcclxuICAgKiBTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlLiBBbnkgb3V0cHV0cyBpbiB0aGUgcHJvdmlkZWQgb3V0cHV0QXJyYXkgdGhhdCBhcmUgZmFsc3kgd2lsbCBiZSBwb3B1bGF0ZWQgd2l0aCB0aGVcclxuICAgKiBjb3JyZXNwb25kaW5nIHJlc3VsdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSByZXN1bHRzIHVzZWQgdG8gcG9wdWxhdGUgdGhlIHJlc3VsdE1hcCBpZiB0aGVyZSBpcyBubyB2YWx1ZSBmb3IgdGhhdCBvdXRwdXROYW1lIGFscmVhZHlcclxuICAgKiBAcGFyYW0gb3V0cHV0QXJyYXkgdXNlZCB0byBwb3B1bGF0ZSB0aGUgcmVzdWx0TWFwLiBJZiBudWxsIG9yIHVuZGVmaW5lZCwgdXNlIHRoZSBjb3JyZXNwb25kaW5nIHJlc3VsdCBmcm9tIHJlc3VsdHNcclxuICAgKiBAcGFyYW0gb3V0cHV0SW5kaWNlcyBzcGVjaWZpZXMgd2hpY2ggb3V0cHV0TmFtZSB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3Igb3V0cHV0QXJyYXkgcmVmZXJzIHRvLlxyXG4gICAqIEByZXR1cm5zIGEgbWFwIG9mIG91dHB1dCBuYW1lcyBhbmQgT25ueFZhbHVlcy5cclxuICAgKi9cclxuICBjb252ZXJ0VGVuc29yTWV0YWRhdGFUb1JldHVyblR5cGUoXHJcbiAgICAgIHJlc3VsdHM6IFRlbnNvck1ldGFkYXRhW10sIG91dHB1dEFycmF5OiBBcnJheTxUZW5zb3J8bnVsbD4sIG91dHB1dEluZGljZXM6IG51bWJlcltdKTogU2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZSB7XHJcbiAgICBjb25zdCByZXN1bHRNYXA6IFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGUgPSB7fTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICByZXN1bHRNYXBbdGhpcy5vdXRwdXROYW1lc1tvdXRwdXRJbmRpY2VzW2ldXV0gPSBvdXRwdXRBcnJheVtpXSA/PyBkZWNvZGVUZW5zb3JNZXRhZGF0YShyZXN1bHRzW2ldKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRNYXA7XHJcbiAgfVxyXG5cclxuICBhc3luYyBsYXp5UmVzZXRHcmFkKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgYXdhaXQgbGF6eVJlc2V0R3JhZCh0aGlzLnNlc3Npb25JZCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBydW5UcmFpblN0ZXAoXHJcbiAgICAgIGZlZWRzOiBTZXNzaW9uSGFuZGxlci5GZWVkc1R5cGUsIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLFxyXG4gICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGU+IHtcclxuICAgIGNvbnN0IFssIGlucHV0SW5kaWNlcywgaW5wdXRzXSA9IHRoaXMuY29udmVydE1hcEludG9WYWx1ZXNBcnJheUFuZEluZGljZXNBcnJheTxUZW5zb3IsIFRlbnNvck1ldGFkYXRhPihcclxuICAgICAgICBmZWVkcywgdGhpcy5pbnB1dE5hbWVzLFxyXG4gICAgICAgICh0LCBpKTogVGVuc29yTWV0YWRhdGEgPT4gZW5jb2RlVGVuc29yTWV0YWRhdGEodCwgKCkgPT4gYGlucHV0IFwiJHt0aGlzLmlucHV0TmFtZXNbaW5wdXRJbmRpY2VzW2ldXX1cImApKTtcclxuXHJcbiAgICBjb25zdCBbb3V0cHV0QXJyYXksIG91dHB1dEluZGljZXMsIG91dHB1dHNdID1cclxuICAgICAgICB0aGlzLmNvbnZlcnRNYXBJbnRvVmFsdWVzQXJyYXlBbmRJbmRpY2VzQXJyYXk8VGVuc29yfG51bGwsIFRlbnNvck1ldGFkYXRhfG51bGw+KFxyXG4gICAgICAgICAgICBmZXRjaGVzLCB0aGlzLm91dHB1dE5hbWVzLFxyXG4gICAgICAgICAgICAodCwgaSk6IFRlbnNvck1ldGFkYXRhfG51bGwgPT5cclxuICAgICAgICAgICAgICAgIHQgPyBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgb3V0cHV0IFwiJHt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dfVwiYCkgOiBudWxsKTtcclxuXHJcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgcnVuVHJhaW5TdGVwKHRoaXMuc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3V0cHV0cywgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0VGVuc29yTWV0YWRhdGFUb1JldHVyblR5cGUocmVzdWx0cywgb3V0cHV0QXJyYXksIG91dHB1dEluZGljZXMpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcnVuT3B0aW1pemVyU3RlcChvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IHJ1bk9wdGltaXplclN0ZXAodGhpcy5zZXNzaW9uSWQsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcnVuRXZhbFN0ZXAoXHJcbiAgICAgIGZlZWRzOiBTZXNzaW9uSGFuZGxlci5GZWVkc1R5cGUsIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLFxyXG4gICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGU+IHtcclxuICAgIGNvbnN0IFssIGlucHV0SW5kaWNlcywgaW5wdXRzXSA9IHRoaXMuY29udmVydE1hcEludG9WYWx1ZXNBcnJheUFuZEluZGljZXNBcnJheTxUZW5zb3IsIFRlbnNvck1ldGFkYXRhPihcclxuICAgICAgICBmZWVkcywgdGhpcy5ldmFsSW5wdXROYW1lcyxcclxuICAgICAgICAodCwgaSk6IFRlbnNvck1ldGFkYXRhID0+IGVuY29kZVRlbnNvck1ldGFkYXRhKHQsICgpID0+IGBpbnB1dCBcIiR7dGhpcy5ldmFsSW5wdXROYW1lc1tpbnB1dEluZGljZXNbaV1dfVwiYCkpO1xyXG5cclxuICAgIGNvbnN0IFtvdXRwdXRBcnJheSwgb3V0cHV0SW5kaWNlcywgb3V0cHV0c10gPVxyXG4gICAgICAgIHRoaXMuY29udmVydE1hcEludG9WYWx1ZXNBcnJheUFuZEluZGljZXNBcnJheTxUZW5zb3J8bnVsbCwgVGVuc29yTWV0YWRhdGF8bnVsbD4oXHJcbiAgICAgICAgICAgIGZldGNoZXMsIHRoaXMuZXZhbE91dHB1dE5hbWVzLFxyXG4gICAgICAgICAgICAodCwgaSk6IFRlbnNvck1ldGFkYXRhfG51bGwgPT5cclxuICAgICAgICAgICAgICAgIHQgPyBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgb3V0cHV0IFwiJHt0aGlzLmV2YWxPdXRwdXROYW1lc1tvdXRwdXRJbmRpY2VzW2ldXX1cImApIDogbnVsbCk7XHJcblxyXG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHJ1bkV2YWxTdGVwKHRoaXMuc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3V0cHV0cywgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0VGVuc29yTWV0YWRhdGFUb1JldHVyblR5cGUocmVzdWx0cywgb3V0cHV0QXJyYXksIG91dHB1dEluZGljZXMpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICByZXR1cm4gZ2V0UGFyYW1ldGVyc1NpemUodGhpcy5zZXNzaW9uSWQsIHRyYWluYWJsZU9ubHkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYXJyYXk6IFVpbnQ4QXJyYXksIHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IGxvYWRQYXJhbWV0ZXJzQnVmZmVyKHRoaXMuc2Vzc2lvbklkLCBhcnJheSwgdHJhaW5hYmxlT25seSk7XHJcbiAgfVxyXG4gIGFzeW5jIGdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPE9ubnhWYWx1ZT4ge1xyXG4gICAgY29uc3QgdGVuc29yUmVzdWx0ID0gYXdhaXQgZ2V0Q29udGlndW91c1BhcmFtZXRlcnModGhpcy5zZXNzaW9uSWQsIHRyYWluYWJsZU9ubHkpO1xyXG4gICAgcmV0dXJuIGRlY29kZVRlbnNvck1ldGFkYXRhKHRlbnNvclJlc3VsdCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBkaXNwb3NlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHJlbGVhc2VUcmFpbmluZ1Nlc3Npb25BbmRDaGVja3BvaW50KHRoaXMuY2hlY2twb2ludElkLCB0aGlzLnNlc3Npb25JZCk7XHJcbiAgfVxyXG59XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHtJbmZlcmVuY2VTZXNzaW9uLCBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xyXG5cclxuaW1wb3J0IHtPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kLXdhc20nO1xyXG5pbXBvcnQge09ubnhydW50aW1lV2ViQXNzZW1ibHlUcmFpbmluZ1Nlc3Npb25IYW5kbGVyfSBmcm9tICcuL3dhc20vc2Vzc2lvbi1oYW5kbGVyLXRyYWluaW5nJztcclxuXHJcbmNsYXNzIE9ubnhydW50aW1lVHJhaW5pbmdXZWJBc3NlbWJseUJhY2tlbmQgZXh0ZW5kcyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCB7XHJcbiAgYXN5bmMgY3JlYXRlVHJhaW5pbmdTZXNzaW9uSGFuZGxlcihcclxuICAgICAgY2hlY2twb2ludFN0YXRlVXJpT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LCB0cmFpbk1vZGVsVXJpT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LFxyXG4gICAgICBldmFsTW9kZWxVcmlPckJ1ZmZlcjogc3RyaW5nfFVpbnQ4QXJyYXksIG9wdGltaXplck1vZGVsVXJpT3JCdWZmZXI6IHN0cmluZ3xVaW50OEFycmF5LFxyXG4gICAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxUcmFpbmluZ1Nlc3Npb25IYW5kbGVyPiB7XHJcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IE9ubnhydW50aW1lV2ViQXNzZW1ibHlUcmFpbmluZ1Nlc3Npb25IYW5kbGVyKCk7XHJcbiAgICBhd2FpdCBoYW5kbGVyLmNyZWF0ZVRyYWluaW5nU2Vzc2lvbihcclxuICAgICAgICBjaGVja3BvaW50U3RhdGVVcmlPckJ1ZmZlciwgdHJhaW5Nb2RlbFVyaU9yQnVmZmVyLCBldmFsTW9kZWxVcmlPckJ1ZmZlciwgb3B0aW1pemVyTW9kZWxVcmlPckJ1ZmZlciwgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGhhbmRsZXIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHdhc21CYWNrZW5kID0gbmV3IE9ubnhydW50aW1lVHJhaW5pbmdXZWJBc3NlbWJseUJhY2tlbmQoKTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzICovXHJcblxyXG4vLyBXZSB1c2UgXCJyZXF1aXJlXCIgaW5zdGVhZCBvZiBcImltcG9ydFwiIGhlcmUgYmVjYXVzZSBpbXBvcnQgc3RhdGVtZW50IG11c3QgYmUgcHV0IGluIHRvcCBsZXZlbC4gT3VyIGN1cnJlbnQgY29kZSBkb2VzXHJcbi8vIG5vdCBhbGxvdyBidW5kbGVyIHRvIHRyZWUtc2hha2luZyBjb2RlIGFzIGV4cGVjdGVkIGJlY2F1c2Ugc29tZSBjb2RlcyBhcmUgdHJlYXRlZCBhcyBoYXZpbmcgc2lkZSBlZmZlY3RzLlxyXG4vLyBTbyB3ZSBpbXBvcnQgY29kZSBpbnNpZGUgdGhlIGlmLWNsYXVzZSB0byBhbGxvdyBidW5kbGVyIHJlbW92ZSB0aGUgY29kZSBzYWZlbHkuXHJcblxyXG5leHBvcnQgKiBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xyXG5pbXBvcnQgKiBhcyBvcnQgZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuZXhwb3J0IGRlZmF1bHQgb3J0O1xyXG5cclxuaW1wb3J0IHtyZWdpc3RlckJhY2tlbmQsIGVudn0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICcuL3ZlcnNpb24nO1xyXG5cclxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR0wpIHtcclxuICBjb25zdCBvbm54anNCYWNrZW5kID0gcmVxdWlyZSgnLi9iYWNrZW5kLW9ubnhqcycpLm9ubnhqc0JhY2tlbmQ7XHJcbiAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJnbCcsIG9ubnhqc0JhY2tlbmQsIC0xMCk7XHJcbn1cclxuXHJcbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU00pIHtcclxuICBjb25zdCB3YXNtQmFja2VuZCA9IEJVSUxEX0RFRlMuRElTQUJMRV9UUkFJTklORyA/IHJlcXVpcmUoJy4vYmFja2VuZC13YXNtLWluZmVyZW5jZScpLndhc21CYWNrZW5kIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vYmFja2VuZC13YXNtLXRyYWluaW5nJykud2FzbUJhY2tlbmQ7XHJcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCkge1xyXG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJncHUnLCB3YXNtQmFja2VuZCwgNSk7XHJcbiAgICByZWdpc3RlckJhY2tlbmQoJ3dlYm5uJywgd2FzbUJhY2tlbmQsIDUpO1xyXG4gIH1cclxuICByZWdpc3RlckJhY2tlbmQoJ2NwdScsIHdhc21CYWNrZW5kLCAxMCk7XHJcbiAgcmVnaXN0ZXJCYWNrZW5kKCd3YXNtJywgd2FzbUJhY2tlbmQsIDEwKTtcclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudi52ZXJzaW9ucywgJ3dlYicsIHt2YWx1ZTogdmVyc2lvbiwgZW51bWVyYWJsZTogdHJ1ZX0pO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgL2pzL3NjcmlwdHMvdXBkYXRlLXZlcnNpb24udHNcbi8vIERvIG5vdCBtb2RpZnkgZmlsZSBjb250ZW50IG1hbnVhbGx5LlxuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcxLjE5LjAtZXNtdGVzdC4yMDI0MDYxOC1kMjI5YzE2MCc7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQWdCTSxVQUNBLDBCQVlPLGlCQXdDUCxnQ0F3Q087QUE3R2I7OztBQWdCQSxNQUFNLFdBQXFDLG9CQUFJLElBQUc7QUFDbEQsTUFBTSwyQkFBcUMsQ0FBQTtBQVlwQyxNQUFNLGtCQUFrQixDQUFDLE1BQWMsU0FBa0IsYUFBMEI7QUFDeEYsWUFBSSxXQUFXLE9BQU8sUUFBUSxTQUFTLGNBQWMsT0FBTyxRQUFRLGtDQUFrQyxZQUFZO0FBQ2hILGdCQUFNLGlCQUFpQixTQUFTLElBQUks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LE9BQU9DLFVBQVMsWUFBWSxLQUFJLENBQUM7IiwKICAibmFtZXMiOiBbImkiLCAiZW52IiwgIlRlbnNvciIsICJUZW5zb3IiLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiVHJhaW5pbmdTZXNzaW9uIiwgIkluZmVyZW5jZVNlc3Npb24iLCAiVGVuc29yIiwgIlRyYWluaW5nU2Vzc2lvbiIsICJlbnYiLCAiZW52IiwgIndhc20iLCAid2FzbSIsICJ3YXNtIiwgImxvY2F0aW9uIiwgImVudiIsICJ3YXNtIiwgImxvY2F0aW9uIiwgInRlbnNvciIsICJlcnJvckNvZGUiLCAiaSIsICJpbml0aWFsaXppbmciLCAiaW5pdGlhbGl6ZWQiLCAiYWJvcnRlZCIsICJjb3B5RnJvbUV4dGVybmFsQnVmZmVyIiwgImNyZWF0ZVNlc3Npb24iLCAicmVsZWFzZVNlc3Npb24iLCAicnVuIiwgImVuZFByb2ZpbGluZyIsICJlbnYiLCAiVGVuc29yIiwgImNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIiLCAiY3JlYXRlU2Vzc2lvbiIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJ3YXNtIiwgImkiLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiVHJhaW5pbmdTZXNzaW9uIiwgImVudiIsICJ2ZXJzaW9uIiwgIndhc21CYWNrZW5kIiwgImVudiIsICJ2ZXJzaW9uIl0KfQo=
