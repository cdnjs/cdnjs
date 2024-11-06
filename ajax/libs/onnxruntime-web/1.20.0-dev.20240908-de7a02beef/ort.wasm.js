/*!
 * ONNX Runtime Web v1.20.0-dev.20240908-de7a02beef
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
      version = "1.20.0-dev.20240827-5d54dc1462";
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
                if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
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
                  if (arg0 === "float16" && typedArrayConstructor === Uint16Array || arg0 === "uint4" || arg0 === "int4") {
                    throw new TypeError(`Creating a ${arg0} tensor from number array is not supported. Please use ${typedArrayConstructor.name} as data.`);
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
        const wasmBinaryOverride = flags.wasmBinary;
        const [objectUrl, ortWasmFactory] = await importWasmModule(mjsPathOverride, wasmPrefixOverride, numThreads > 1);
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
                if (deviceType) {
                  const keyDataOffset = allocWasmString("deviceType", allocs);
                  const valueDataOffset = allocWasmString(deviceType, allocs);
                  if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                    checkLastError(`Can't set a session config entry: 'deviceType' - ${deviceType}.`);
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
                    checkLastError(`Can't set a session config entry: 'preferredLayout' - ${webgpuOptions.preferredLayout}.`);
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
  var tensorDataTypeStringToEnum, tensorDataTypeEnumToString, calculateTensorSizeInBytes, tensorTypeToTypedArrayConstructor, logLevelStringToEnum, isGpuBufferSupportedType, dataLocationStringToEnum;
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
              if (wasm2.currentContext) {
                throw new Error("WebNN execution provider is already set.");
              }
              if (typeof provider !== "string") {
                const webnnOptions = provider;
                const context = webnnOptions?.context;
                const gpuDevice = webnnOptions?.gpuDevice;
                const deviceType = webnnOptions?.deviceType;
                const numThreads = webnnOptions?.numThreads;
                const powerPreference = webnnOptions?.powerPreference;
                if (context) {
                  wasm2.currentContext = context;
                } else if (gpuDevice) {
                  wasm2.currentContext = await navigator.ml.createContext(gpuDevice);
                } else {
                  wasm2.currentContext = await navigator.ml.createContext({ deviceType, numThreads, powerPreference });
                }
              } else {
                wasm2.currentContext = await navigator.ml.createContext();
              }
              break;
            }
          }
          sessionHandle = await wasm2._OrtCreateSession(modelDataOffset, modelDataLength, sessionOptionsHandle);
          if (sessionHandle === 0) {
            checkLastError("Can't create a session.");
          }
          if (wasm2.currentContext) {
            wasm2.currentContext = void 0;
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
              outputPreferredLocationsEncoded: outputPreferredLocations.map((l) => dataLocationStringToEnum(l))
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
          dataByteLength = calculateTensorSizeInBytes(tensorDataTypeStringToEnum(dataType), dims);
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
              throw new Error(
                `input count from feeds (${inputCount}) is expected to be always equal to model's input count (${inputNamesUTF8Encoded.length}).`
              );
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
                  const bufferSize = calculateTensorSizeInBytes(dataType, size);
                  if (bufferSize === void 0 || !isGpuBufferSupportedType(type)) {
                    throw new Error(`Unsupported data type: ${type}`);
                  }
                  keepOutputTensor = true;
                  output.push([
                    type,
                    dims,
                    {
                      gpuBuffer,
                      download: wasm2.jsepCreateDownloader(gpuBuffer, bufferSize, type),
                      dispose: () => {
                        wasm2._OrtReleaseTensor(tensor);
                      }
                    },
                    "gpu-buffer"
                  ]);
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
            wasm2._OrtClearBoundOutputs(ioBindingState.handle);
            activeSessions.set(sessionId, [
              sessionHandle,
              inputNamesUTF8Encoded,
              outputNamesUTF8Encoded,
              ioBindingState,
              enableGraphCapture,
              false
            ]);
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
  var version2 = "1.20.0-dev.20240908-de7a02beef";

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdHJhY2UudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24udHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItY29udmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvb25ueC1tb2RlbC50cyIsICIuLi8uLi9jb21tb24vbGliL29ubngtdmFsdWUudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90cmFpbmluZy1zZXNzaW9uLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90cmFpbmluZy1zZXNzaW9uLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5kZXgudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1lbnYudHMiLCAiLi4vbGliL3dhc20vcHJveHktd29ya2VyL21haW4udHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHMiLCAiLi4vbGliL3dhc20vd2FzbS1mYWN0b3J5LnRzIiwgIi4uL2xpYi93YXNtL3dhc20tdXRpbHMudHMiLCAiLi4vbGliL3dhc20vcnVuLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vc2Vzc2lvbi1vcHRpb25zLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tY29tbW9uLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tdXRpbHMtbG9hZC1maWxlLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tY29yZS1pbXBsLnRzIiwgIi4uL2xpYi93YXNtL3Byb3h5LXdyYXBwZXIudHMiLCAiLi4vbGliL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZS50cyIsICIuLi9saWIvYmFja2VuZC13YXNtLnRzIiwgIi4uL2xpYi9iYWNrZW5kLXdhc20taW5mZXJlbmNlLnRzIiwgIi4uL2xpYi9pbmRleC50cyIsICIuLi9saWIvdmVyc2lvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEJhY2tlbmQgfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuXG5pbnRlcmZhY2UgQmFja2VuZEluZm8ge1xuICBiYWNrZW5kOiBCYWNrZW5kO1xuICBwcmlvcml0eTogbnVtYmVyO1xuXG4gIGluaXRQcm9taXNlPzogUHJvbWlzZTx2b2lkPjtcbiAgaW5pdGlhbGl6ZWQ/OiBib29sZWFuO1xuICBhYm9ydGVkPzogYm9vbGVhbjtcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmNvbnN0IGJhY2tlbmRzOiBNYXA8c3RyaW5nLCBCYWNrZW5kSW5mbz4gPSBuZXcgTWFwKCk7XG5jb25zdCBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHk6IHN0cmluZ1tdID0gW107XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBiYWNrZW5kLlxuICpcbiAqIEBwYXJhbSBuYW1lIC0gdGhlIG5hbWUgYXMgYSBrZXkgdG8gbG9va3VwIGFzIGFuIGV4ZWN1dGlvbiBwcm92aWRlci5cbiAqIEBwYXJhbSBiYWNrZW5kIC0gdGhlIGJhY2tlbmQgb2JqZWN0LlxuICogQHBhcmFtIHByaW9yaXR5IC0gYW4gaW50ZWdlciBpbmRpY2F0aW5nIHRoZSBwcmlvcml0eSBvZiB0aGUgYmFja2VuZC4gSGlnaGVyIG51bWJlciBtZWFucyBoaWdoZXIgcHJpb3JpdHkuIGlmIHByaW9yaXR5XG4gKiA8IDAsIGl0IHdpbGwgYmUgY29uc2lkZXJlZCBhcyBhICdiZXRhJyB2ZXJzaW9uIGFuZCB3aWxsIG5vdCBiZSB1c2VkIGFzIGEgZmFsbGJhY2sgYmFja2VuZCBieSBkZWZhdWx0LlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyQmFja2VuZCA9IChuYW1lOiBzdHJpbmcsIGJhY2tlbmQ6IEJhY2tlbmQsIHByaW9yaXR5OiBudW1iZXIpOiB2b2lkID0+IHtcbiAgaWYgKGJhY2tlbmQgJiYgdHlwZW9mIGJhY2tlbmQuaW5pdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgYmFja2VuZC5jcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IGN1cnJlbnRCYWNrZW5kID0gYmFja2VuZHMuZ2V0KG5hbWUpO1xuICAgIGlmIChjdXJyZW50QmFja2VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBiYWNrZW5kcy5zZXQobmFtZSwgeyBiYWNrZW5kLCBwcmlvcml0eSB9KTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kLnByaW9yaXR5ID4gcHJpb3JpdHkpIHtcbiAgICAgIC8vIHNhbWUgbmFtZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgd2l0aCBhIGhpZ2hlciBwcmlvcml0eS4gc2tpcCByZWdpc3RlcmF0aW9uLlxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEJhY2tlbmQucHJpb3JpdHkgPT09IHByaW9yaXR5KSB7XG4gICAgICBpZiAoY3VycmVudEJhY2tlbmQuYmFja2VuZCAhPT0gYmFja2VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCByZWdpc3RlciBiYWNrZW5kIFwiJHtuYW1lfVwiIHVzaW5nIHByaW9yaXR5ICR7cHJpb3JpdHl9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByaW9yaXR5ID49IDApIHtcbiAgICAgIGNvbnN0IGkgPSBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYmFja2VuZHMuZ2V0KGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eVtpXSkhLnByaW9yaXR5IDw9IHByaW9yaXR5KSB7XG4gICAgICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnNwbGljZShpLCAwLCBuYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5wdXNoKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSB2YWxpZCBiYWNrZW5kJyk7XG59O1xuXG4vKipcbiAqIFRyeSB0byByZXNvbHZlIGFuZCBpbml0aWFsaXplIGEgYmFja2VuZC5cbiAqXG4gKiBAcGFyYW0gYmFja2VuZE5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgYmFja2VuZC5cbiAqIEByZXR1cm5zIHRoZSBiYWNrZW5kIGluc3RhbmNlIGlmIHJlc29sdmVkIGFuZCBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHksIG9yIGFuIGVycm9yIG1lc3NhZ2UgaWYgZmFpbGVkLlxuICovXG5jb25zdCB0cnlSZXNvbHZlQW5kSW5pdGlhbGl6ZUJhY2tlbmQgPSBhc3luYyAoYmFja2VuZE5hbWU6IHN0cmluZyk6IFByb21pc2U8QmFja2VuZCB8IHN0cmluZz4gPT4ge1xuICBjb25zdCBiYWNrZW5kSW5mbyA9IGJhY2tlbmRzLmdldChiYWNrZW5kTmFtZSk7XG4gIGlmICghYmFja2VuZEluZm8pIHtcbiAgICByZXR1cm4gJ2JhY2tlbmQgbm90IGZvdW5kLic7XG4gIH1cblxuICBpZiAoYmFja2VuZEluZm8uaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcbiAgfSBlbHNlIGlmIChiYWNrZW5kSW5mby5hYm9ydGVkKSB7XG4gICAgcmV0dXJuIGJhY2tlbmRJbmZvLmVycm9yITtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpc0luaXRpYWxpemluZyA9ICEhYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghaXNJbml0aWFsaXppbmcpIHtcbiAgICAgICAgYmFja2VuZEluZm8uaW5pdFByb21pc2UgPSBiYWNrZW5kSW5mby5iYWNrZW5kLmluaXQoYmFja2VuZE5hbWUpO1xuICAgICAgfVxuICAgICAgYXdhaXQgYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgICBiYWNrZW5kSW5mby5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIWlzSW5pdGlhbGl6aW5nKSB7XG4gICAgICAgIGJhY2tlbmRJbmZvLmVycm9yID0gYCR7ZX1gO1xuICAgICAgICBiYWNrZW5kSW5mby5hYm9ydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiYWNrZW5kSW5mby5lcnJvciE7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGRlbGV0ZSBiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUmVzb2x2ZSBleGVjdXRpb24gcHJvdmlkZXJzIGZyb20gdGhlIHNwZWNpZmljIHNlc3Npb24gb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyAtIHRoZSBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0LlxuICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0dXBsZSBvZiBhbiBpbml0aWFsaXplZCBiYWNrZW5kIGluc3RhbmNlIGFuZCBhIHNlc3Npb24gb3B0aW9ucyBvYmplY3Qgd2l0aFxuICogZmlsdGVyZWQgRVAgbGlzdC5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCByZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVycyA9IGFzeW5jIChcbiAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbik6IFByb21pc2U8W2JhY2tlbmQ6IEJhY2tlbmQsIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnNdPiA9PiB7XG4gIC8vIGV4dHJhY3QgYmFja2VuZCBoaW50cyBmcm9tIHNlc3Npb24gb3B0aW9uc1xuICBjb25zdCBlcHMgPSBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyB8fCBbXTtcbiAgY29uc3QgYmFja2VuZEhpbnRzID0gZXBzLm1hcCgoaSkgPT4gKHR5cGVvZiBpID09PSAnc3RyaW5nJyA/IGkgOiBpLm5hbWUpKTtcbiAgY29uc3QgYmFja2VuZE5hbWVzID0gYmFja2VuZEhpbnRzLmxlbmd0aCA9PT0gMCA/IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eSA6IGJhY2tlbmRIaW50cztcblxuICAvLyB0cnkgdG8gcmVzb2x2ZSBhbmQgaW5pdGlhbGl6ZSBhbGwgcmVxdWVzdGVkIGJhY2tlbmRzXG4gIGxldCBiYWNrZW5kOiBCYWNrZW5kIHwgdW5kZWZpbmVkO1xuICBjb25zdCBlcnJvcnMgPSBbXTtcbiAgY29uc3QgYXZhaWxhYmxlQmFja2VuZE5hbWVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGZvciAoY29uc3QgYmFja2VuZE5hbWUgb2YgYmFja2VuZE5hbWVzKSB7XG4gICAgY29uc3QgcmVzb2x2ZVJlc3VsdCA9IGF3YWl0IHRyeVJlc29sdmVBbmRJbml0aWFsaXplQmFja2VuZChiYWNrZW5kTmFtZSk7XG4gICAgaWYgKHR5cGVvZiByZXNvbHZlUmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgZXJyb3JzLnB1c2goeyBuYW1lOiBiYWNrZW5kTmFtZSwgZXJyOiByZXNvbHZlUmVzdWx0IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWJhY2tlbmQpIHtcbiAgICAgICAgYmFja2VuZCA9IHJlc29sdmVSZXN1bHQ7XG4gICAgICB9XG4gICAgICBpZiAoYmFja2VuZCA9PT0gcmVzb2x2ZVJlc3VsdCkge1xuICAgICAgICBhdmFpbGFibGVCYWNrZW5kTmFtZXMuYWRkKGJhY2tlbmROYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBpZiBubyBiYWNrZW5kIGlzIGF2YWlsYWJsZSwgdGhyb3cgZXJyb3IuXG4gIGlmICghYmFja2VuZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgbm8gYXZhaWxhYmxlIGJhY2tlbmQgZm91bmQuIEVSUjogJHtlcnJvcnMubWFwKChlKSA9PiBgWyR7ZS5uYW1lfV0gJHtlLmVycn1gKS5qb2luKCcsICcpfWApO1xuICB9XG5cbiAgLy8gZm9yIGVhY2ggZXhwbGljaXRseSByZXF1ZXN0ZWQgYmFja2VuZCwgaWYgaXQncyBub3QgYXZhaWxhYmxlLCBvdXRwdXQgd2FybmluZyBtZXNzYWdlLlxuICBmb3IgKGNvbnN0IHsgbmFtZSwgZXJyIH0gb2YgZXJyb3JzKSB7XG4gICAgaWYgKGJhY2tlbmRIaW50cy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYHJlbW92aW5nIHJlcXVlc3RlZCBleGVjdXRpb24gcHJvdmlkZXIgXCIke25hbWV9XCIgZnJvbSBzZXNzaW9uIG9wdGlvbnMgYmVjYXVzZSBpdCBpcyBub3QgYXZhaWxhYmxlOiAke2Vycn1gLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBmaWx0ZXJlZEVwcyA9IGVwcy5maWx0ZXIoKGkpID0+IGF2YWlsYWJsZUJhY2tlbmROYW1lcy5oYXModHlwZW9mIGkgPT09ICdzdHJpbmcnID8gaSA6IGkubmFtZSkpO1xuXG4gIHJldHVybiBbXG4gICAgYmFja2VuZCxcbiAgICBuZXcgUHJveHkob3B0aW9ucywge1xuICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wKSA9PiB7XG4gICAgICAgIGlmIChwcm9wID09PSAnZXhlY3V0aW9uUHJvdmlkZXJzJykge1xuICAgICAgICAgIHJldHVybiBmaWx0ZXJlZEVwcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wKTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF07XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQgeyBPbm54VmFsdWUgfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuaW1wb3J0IHsgVHJhaW5pbmdTZXNzaW9uIH0gZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLmpzJztcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBTZXNzaW9uSGFuZGxlciB7XG4gIHR5cGUgRmVlZHNUeXBlID0geyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIH07XG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH07XG4gIHR5cGUgUmV0dXJuVHlwZSA9IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9O1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgc2hhcmVkIFNlc3Npb25IYW5kbGVyIGZ1bmN0aW9uYWxpdHlcbiAqXG4gKiBAaWdub3JlXG4gKi9cbmludGVyZmFjZSBTZXNzaW9uSGFuZGxlciB7XG4gIGRpc3Bvc2UoKTogUHJvbWlzZTx2b2lkPjtcblxuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIGhhbmRsZXIgaW5zdGFuY2Ugb2YgYW4gaW5mZXJlbmNlIHNlc3Npb24uXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xuICBlbmRQcm9maWxpbmcoKTogdm9pZDtcblxuICBydW4oXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgaGFuZGxlciBpbnN0YW5jZSBvZiBhIHRyYWluaW5nIGluZmVyZW5jZSBzZXNzaW9uLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xuICByZWFkb25seSBldmFsSW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG4gIHJlYWRvbmx5IGV2YWxPdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgbGF6eVJlc2V0R3JhZCgpOiBQcm9taXNlPHZvaWQ+O1xuICBydW5UcmFpblN0ZXAoXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG4gIHJ1bk9wdGltaXplclN0ZXAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbiAgcnVuRXZhbFN0ZXAoXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG5cbiAgZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8bnVtYmVyPjtcbiAgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYnVmZmVyOiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPjtcbiAgZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8T25ueFZhbHVlPjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBiYWNrZW5kIHRoYXQgcHJvdmlkZXMgaW1wbGVtZW50YXRpb24gb2YgbW9kZWwgaW5mZXJlbmNpbmcuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tlbmQge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmFja2VuZCBhc3luY2hyb25vdXNseS4gU2hvdWxkIHRocm93IHdoZW4gZmFpbGVkLlxuICAgKi9cbiAgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcblxuICBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihcbiAgICB1cmlPckJ1ZmZlcjogc3RyaW5nIHwgVWludDhBcnJheSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG5cbiAgY3JlYXRlVHJhaW5pbmdTZXNzaW9uSGFuZGxlcj8oXG4gICAgY2hlY2twb2ludFN0YXRlVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcixcbiAgICB0cmFpbk1vZGVsVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcixcbiAgICBldmFsTW9kZWxVcmlPckJ1ZmZlcjogVHJhaW5pbmdTZXNzaW9uLlVyaU9yQnVmZmVyLFxuICAgIG9wdGltaXplck1vZGVsVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcixcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbkhhbmRsZXI+O1xufVxuXG5leHBvcnQgeyByZWdpc3RlckJhY2tlbmQgfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgL2pzL3NjcmlwdHMvdXBkYXRlLXZlcnNpb24udHNcbi8vIERvIG5vdCBtb2RpZnkgZmlsZSBjb250ZW50IG1hbnVhbGx5LlxuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcxLjIwLjAtZGV2LjIwMjQwODI3LTVkNTRkYzE0NjInO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBFbnYgfSBmcm9tICcuL2Vudi5qcyc7XG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uLmpzJztcblxudHlwZSBMb2dMZXZlbFR5cGUgPSBFbnZbJ2xvZ0xldmVsJ107XG5cbmxldCBsb2dMZXZlbFZhbHVlOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+ID0gJ3dhcm5pbmcnO1xuXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSB7XG4gIHdhc206IHt9IGFzIEVudi5XZWJBc3NlbWJseUZsYWdzLFxuICB3ZWJnbDoge30gYXMgRW52LldlYkdMRmxhZ3MsXG4gIHdlYmdwdToge30gYXMgRW52LldlYkdwdUZsYWdzLFxuICB2ZXJzaW9uczogeyBjb21tb246IHZlcnNpb24gfSxcblxuICBzZXQgbG9nTGV2ZWwodmFsdWU6IExvZ0xldmVsVHlwZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IFsndmVyYm9zZScsICdpbmZvJywgJ3dhcm5pbmcnLCAnZXJyb3InLCAnZmF0YWwnXS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHt2YWx1ZX1gKTtcbiAgICB9XG4gICAgbG9nTGV2ZWxWYWx1ZSA9IHZhbHVlO1xuICB9LFxuICBnZXQgbG9nTGV2ZWwoKTogUmVxdWlyZWQ8TG9nTGV2ZWxUeXBlPiB7XG4gICAgcmV0dXJuIGxvZ0xldmVsVmFsdWU7XG4gIH0sXG59O1xuXG4vLyBzZXQgcHJvcGVydHkgJ2xvZ0xldmVsJyBzbyB0aGF0IHRoZXkgY2FuIGJlIGNvcnJlY3RseSB0cmFuc2ZlcnJlZCB0byB3b3JrZXIgYnkgYHBvc3RNZXNzYWdlKClgLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudiwgJ2xvZ0xldmVsJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBlbnYgYXMgZW52SW1wbCB9IGZyb20gJy4vZW52LWltcGwuanMnO1xuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgRW52IHtcbiAgZXhwb3J0IHR5cGUgV2FzbVBhdGhQcmVmaXggPSBzdHJpbmc7XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2FzbUZpbGVQYXRocyB7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgb3ZlcnJpZGUgcGF0aCBmb3IgdGhlIG1haW4gLndhc20gZmlsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKlxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAud2FzbSBmaWxlIGlzOlxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbWAgZm9yIGRlZmF1bHQgYnVpbGRcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbWAgZm9yIEpTRVAgYnVpbGQgKHdpdGggV2ViR1BVIGFuZCBXZWJOTilcbiAgICAgKiAtIGBvcnQtdHJhaW5pbmctd2FzbS1zaW1kLXRocmVhZGVkLndhc21gIGZvciB0cmFpbmluZyBidWlsZFxuICAgICAqL1xuICAgIHdhc20/OiBVUkwgfCBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgb3ZlcnJpZGUgcGF0aCBmb3IgdGhlIG1haW4gLm1qcyBmaWxlLlxuICAgICAqXG4gICAgICogVGhpcyBwYXRoIHNob3VsZCBiZSBhbiBhYnNvbHV0ZSBwYXRoLlxuICAgICAqXG4gICAgICogSWYgbm90IG1vZGlmaWVkLCB0aGUgZmlsZW5hbWUgb2YgdGhlIC5tanMgZmlsZSBpczpcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLm1qc2AgZm9yIGRlZmF1bHQgYnVpbGRcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAubWpzYCBmb3IgSlNFUCBidWlsZCAod2l0aCBXZWJHUFUgYW5kIFdlYk5OKVxuICAgICAqIC0gYG9ydC10cmFpbmluZy13YXNtLXNpbWQtdGhyZWFkZWQubWpzYCBmb3IgdHJhaW5pbmcgYnVpbGRcbiAgICAgKi9cbiAgICBtanM/OiBVUkwgfCBzdHJpbmc7XG4gIH1cbiAgZXhwb3J0IHR5cGUgV2FzbVByZWZpeE9yRmlsZVBhdGhzID0gV2FzbVBhdGhQcmVmaXggfCBXYXNtRmlsZVBhdGhzO1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgbnVtYmVyIG9mIHRocmVhZChzKS4gSWYgb21pdHRlZCBvciBzZXQgdG8gMCwgbnVtYmVyIG9mIHRocmVhZChzKSB3aWxsIGJlIGRldGVybWluZWQgYnkgc3lzdGVtLiBJZiBzZXRcbiAgICAgKiB0byAxLCBubyB3b3JrZXIgdGhyZWFkIHdpbGwgYmUgc3Bhd25lZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IG11bHRpdGhyZWFkIGZlYXR1cmUgaXMgYXZhaWxhYmxlIGluIGN1cnJlbnQgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYDBgXG4gICAgICovXG4gICAgbnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgU0lNRC4gSWYgc2V0IHRvIGZhbHNlLCBTSU1EIHdpbGwgYmUgZm9yY2VseSBkaXNhYmxlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IFNJTUQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVGhpcyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLiBTaW5jZSBTSU1EIGlzIHN1cHBvcnRlZCBieSBhbGwgbWFqb3IgSmF2YVNjcmlwdCBlbmdpbmVzLCBub24tU0lNRFxuICAgICAqIGJ1aWxkIGlzIG5vIGxvbmdlciBwcm92aWRlZC4gVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHJlbGVhc2UuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdHJ1ZWBcbiAgICAgKi9cbiAgICBzaW1kPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYGVudi50cmFjZWAgaW5zdGVhZC4gSWYgYGVudi50cmFjZWAgaXMgc2V0LCB0aGlzIHByb3BlcnR5IHdpbGwgYmUgaWdub3JlZC5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICB0cmFjZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IGEgbnVtYmVyIHNwZWNpZnlpbmcgdGhlIHRpbWVvdXQgZm9yIGluaXRpYWxpemF0aW9uIG9mIFdlYkFzc2VtYmx5IGJhY2tlbmQsIGluIG1pbGxpc2Vjb25kcy4gQSB6ZXJvXG4gICAgICogdmFsdWUgaW5kaWNhdGVzIG5vIHRpbWVvdXQgaXMgc2V0LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgMGBcbiAgICAgKi9cbiAgICBpbml0VGltZW91dD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFNldCBhIGN1c3RvbSBVUkwgcHJlZml4IHRvIHRoZSAud2FzbS8ubWpzIGZpbGVzLCBvciBhbiBvYmplY3Qgb2Ygb3ZlcnJpZGVzIGZvciBib3RoIC53YXNtLy5tanMgZmlsZS4gVGhlIG92ZXJyaWRlXG4gICAgICogcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKi9cbiAgICB3YXNtUGF0aHM/OiBXYXNtUHJlZml4T3JGaWxlUGF0aHM7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBjdXN0b20gYnVmZmVyIHdoaWNoIGNvbnRhaW5zIHRoZSBXZWJBc3NlbWJseSBiaW5hcnkuIElmIHRoaXMgcHJvcGVydHkgaXMgc2V0LCB0aGUgYHdhc21QYXRoc2AgcHJvcGVydHkgd2lsbFxuICAgICAqIGJlIGlnbm9yZWQuXG4gICAgICovXG4gICAgd2FzbUJpbmFyeT86IEFycmF5QnVmZmVyTGlrZSB8IFVpbnQ4QXJyYXk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gcHJveHkgdGhlIGV4ZWN1dGlvbiBvZiBtYWluIHRocmVhZCB0byBhIHdvcmtlciB0aHJlYWQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBwcm94eT86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdMRmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIFdlYkdMIENvbnRleHQgSUQgKHdlYmdsIG9yIHdlYmdsMikuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAnd2ViZ2wyJ2BcbiAgICAgKi9cbiAgICBjb250ZXh0SWQ/OiAnd2ViZ2wnIHwgJ3dlYmdsMic7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBXZWJHTCByZW5kZXJpbmcgY29udGV4dC5cbiAgICAgKi9cbiAgICByZWFkb25seSBjb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgbWF4aW11bSBiYXRjaCBzaXplIGZvciBtYXRtdWwuIDAgbWVhbnMgdG8gZGlzYWJsZSBiYXRjaGluZy5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgbWF0bXVsTWF4QmF0Y2hTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHRleHR1cmUgY2FjaGUgbW9kZS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCdmdWxsJ2BcbiAgICAgKi9cbiAgICB0ZXh0dXJlQ2FjaGVNb2RlPzogJ2luaXRpYWxpemVyT25seScgfCAnZnVsbCc7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgcGFja2VkIHRleHR1cmUgbW9kZVxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICovXG4gICAgcGFjaz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB3aGV0aGVyIGVuYWJsZSBhc3luYyBkb3dubG9hZC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIGFzeW5jPzogYm9vbGVhbjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1UHJvZmlsaW5nRGF0YVYxVGVuc29yTWV0YWRhdGEge1xuICAgIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xuICAgIGRhdGFUeXBlOiBzdHJpbmc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVQcm9maWxpbmdEYXRhVjEge1xuICAgIHZlcnNpb246IDE7XG4gICAgaW5wdXRzTWV0YWRhdGE6IHJlYWRvbmx5IFdlYkdwdVByb2ZpbGluZ0RhdGFWMVRlbnNvck1ldGFkYXRhW107XG4gICAgb3V0cHV0c01ldGFkYXRhOiByZWFkb25seSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YVtdO1xuICAgIGtlcm5lbElkOiBudW1iZXI7XG4gICAga2VybmVsVHlwZTogc3RyaW5nO1xuICAgIGtlcm5lbE5hbWU6IHN0cmluZztcbiAgICBwcm9ncmFtTmFtZTogc3RyaW5nO1xuICAgIHN0YXJ0VGltZTogbnVtYmVyO1xuICAgIGVuZFRpbWU6IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIFdlYkdwdVByb2ZpbGluZ0RhdGEgPSBXZWJHcHVQcm9maWxpbmdEYXRhVjE7XG5cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVGbGFncyB7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYGVudi53ZWJncHUucHJvZmlsaW5nLm1vZGVgIGluc3RlYWQuIElmIGBlbnYud2ViZ3B1LnByb2ZpbGluZy5tb2RlYCBpcyBzZXQsIHRoaXMgcHJvcGVydHkgd2lsbCBiZVxuICAgICAqIGlnbm9yZWQuXG4gICAgICovXG4gICAgcHJvZmlsaW5nTW9kZT86ICdvZmYnIHwgJ2RlZmF1bHQnO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHByb2ZpbGluZyBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIHByb2ZpbGluZz86IHtcbiAgICAgIC8qKlxuICAgICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXG4gICAgICAgKlxuICAgICAgICogQGRlZmF1bHRWYWx1ZSBgJ29mZidgXG4gICAgICAgKi9cbiAgICAgIG1vZGU/OiAnb2ZmJyB8ICdkZWZhdWx0JztcblxuICAgICAgLyoqXG4gICAgICAgKiBTZXQgb3IgZ2V0IGEgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBhIHByb2ZpbGluZyBkYXRhIGlzIHJlY2VpdmVkLiBJZiBub3Qgc2V0LCB0aGUgcHJvZmlsaW5nIGRhdGEgd2lsbCBiZVxuICAgICAgICogcHJpbnRlZCB0byBjb25zb2xlLlxuICAgICAgICovXG4gICAgICBvbmRhdGE/OiAoZGF0YTogV2ViR3B1UHJvZmlsaW5nRGF0YSkgPT4gdm9pZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHBvd2VyIHByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgb25seSBoYXMgZWZmZWN0IGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlXG4gICAgICogdXNlZCBhcyBvcHRpb25zIGZvciBgbmF2aWdhdG9yLmdwdS5yZXF1ZXN0QWRhcHRlcigpYC5cbiAgICAgKlxuICAgICAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9ncHV3ZWIuZ2l0aHViLmlvL2dwdXdlYi8jZGljdGRlZi1ncHVyZXF1ZXN0YWRhcHRlcm9wdGlvbnN9IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB1bmRlZmluZWRgXG4gICAgICovXG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2xvdy1wb3dlcicgfCAnaGlnaC1wZXJmb3JtYW5jZSc7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgZm9yY2UgZmFsbGJhY2sgYWRhcHRlciBmbGFnLlxuICAgICAqXG4gICAgICogU2V0dGluZyB0aGlzIHByb3BlcnR5IG9ubHkgaGFzIGVmZmVjdCBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGUgdmFsdWUgd2lsbCBiZVxuICAgICAqIHVzZWQgYXMgb3B0aW9ucyBmb3IgYG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoKWAuXG4gICAgICpcbiAgICAgKiBTZWUge0BsaW5rIGh0dHBzOi8vZ3B1d2ViLmdpdGh1Yi5pby9ncHV3ZWIvI2RpY3RkZWYtZ3B1cmVxdWVzdGFkYXB0ZXJvcHRpb25zfSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdW5kZWZpbmVkYFxuICAgICAqL1xuICAgIGZvcmNlRmFsbGJhY2tBZGFwdGVyPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBhZGFwdGVyIGZvciBXZWJHUFUuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgb25seSBoYXMgZWZmZWN0IGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlXG4gICAgICogdXNlZCBhcyB0aGUgR1BVIGFkYXB0ZXIgZm9yIHRoZSB1bmRlcmx5aW5nIFdlYkdQVSBiYWNrZW5kIHRvIGNyZWF0ZSBHUFUgZGV2aWNlLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBwcm9wZXJ0eSBpcyBub3Qgc2V0LCBpdCB3aWxsIGJlIGF2YWlsYWJsZSB0byBnZXQgYWZ0ZXIgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGVcbiAgICAgKiB2YWx1ZSB3aWxsIGJlIHRoZSBHUFUgYWRhcHRlciB0aGF0IGNyZWF0ZWQgYnkgdGhlIHVuZGVybHlpbmcgV2ViR1BVIGJhY2tlbmQuXG4gICAgICpcbiAgICAgKiBXaGVuIHVzZSB3aXRoIFR5cGVTY3JpcHQsIHRoZSB0eXBlIG9mIHRoaXMgcHJvcGVydHkgaXMgYEdQVUFkYXB0ZXJgIGRlZmluZWQgaW4gXCJAd2ViZ3B1L3R5cGVzXCIuXG4gICAgICogVXNlIGBjb25zdCBhZGFwdGVyID0gZW52LndlYmdwdS5hZGFwdGVyIGFzIEdQVUFkYXB0ZXI7YCBpbiBUeXBlU2NyaXB0IHRvIGFjY2VzcyB0aGlzIHByb3BlcnR5IHdpdGggY29ycmVjdCB0eXBlLlxuICAgICAqXG4gICAgICogc2VlIGNvbW1lbnRzIG9uIHtAbGluayBUZW5zb3IuR3B1QnVmZmVyVHlwZX1cbiAgICAgKi9cbiAgICBhZGFwdGVyOiB1bmtub3duO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGV2aWNlIGZvciBXZWJHUFUuXG4gICAgICpcbiAgICAgKiBUaGlzIHByb3BlcnR5IGlzIG9ubHkgYXZhaWxhYmxlIGFmdGVyIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC5cbiAgICAgKlxuICAgICAqIFdoZW4gdXNlIHdpdGggVHlwZVNjcmlwdCwgdGhlIHR5cGUgb2YgdGhpcyBwcm9wZXJ0eSBpcyBgR1BVRGV2aWNlYCBkZWZpbmVkIGluIFwiQHdlYmdwdS90eXBlc1wiLlxuICAgICAqIFVzZSBgY29uc3QgZGV2aWNlID0gZW52LndlYmdwdS5kZXZpY2UgYXMgR1BVRGV2aWNlO2AgaW4gVHlwZVNjcmlwdCB0byBhY2Nlc3MgdGhpcyBwcm9wZXJ0eSB3aXRoIGNvcnJlY3QgdHlwZS5cbiAgICAgKlxuICAgICAqIHNlZSBjb21tZW50cyBvbiB7QGxpbmsgVGVuc29yLkdwdUJ1ZmZlclR5cGV9IGZvciBtb3JlIGRldGFpbHMgYWJvdXQgd2h5IG5vdCB1c2UgdHlwZXMgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cbiAgICAgKi9cbiAgICByZWFkb25seSBkZXZpY2U6IHVua25vd247XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB3aGV0aGVyIHZhbGlkYXRlIGlucHV0IGNvbnRlbnQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICB2YWxpZGF0ZUlucHV0Q29udGVudD86IGJvb2xlYW47XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnYge1xuICAvKipcbiAgICogc2V0IHRoZSBzZXZlcml0eSBsZXZlbCBmb3IgbG9nZ2luZy5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgJ3dhcm5pbmcnYFxuICAgKi9cbiAgbG9nTGV2ZWw/OiAndmVyYm9zZScgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InIHwgJ2ZhdGFsJztcblxuICAvKipcbiAgICogSW5kaWNhdGUgd2hldGhlciBydW4gaW4gZGVidWcgbW9kZS5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAqL1xuICBkZWJ1Zz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXG4gICAqXG4gICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgKi9cbiAgdHJhY2U/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBHZXQgdmVyc2lvbiBvZiB0aGUgY3VycmVudCBwYWNrYWdlLlxuICAgKi9cbiAgcmVhZG9ubHkgdmVyc2lvbnM6IHtcbiAgICByZWFkb25seSBjb21tb246IHN0cmluZztcbiAgICByZWFkb25seSB3ZWI/OiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgbm9kZT86IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgcmVhZG9ubHkgJ3JlYWN0LW5hdGl2ZSc/OiBzdHJpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViQXNzZW1ibHlcbiAgICovXG4gIHJlYWRvbmx5IHdhc206IEVudi5XZWJBc3NlbWJseUZsYWdzO1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkdMXG4gICAqL1xuICByZWFkb25seSB3ZWJnbDogRW52LldlYkdMRmxhZ3M7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViR1BVXG4gICAqL1xuICByZWFkb25seSB3ZWJncHU6IEVudi5XZWJHcHVGbGFncztcblxuICBbbmFtZTogc3RyaW5nXTogdW5rbm93bjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgYXMgYSBnbG9iYWwgc2luZ2xldG9uLlxuICovXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSBlbnZJbXBsO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3JUb0RhdGFVcmxPcHRpb25zLCBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMgfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IudG9EYXRhVVJMKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclRvRGF0YVVSTCA9ICh0ZW5zb3I6IFRlbnNvciwgb3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBjYW52YXMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykgOiBuZXcgT2Zmc2NyZWVuQ2FudmFzKDEsIDEpO1xuICBjYW52YXMud2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgY2FudmFzLmhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhc1xuICAgIHwgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgfCBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgICB8IG51bGw7XG5cbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1szXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucz8uZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5tZWFuID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuWzBdLCBub3JtLm1lYW5bMV0sIG5vcm0ubWVhblsyXSwgMF07XG4gICAgICAgIGlmIChub3JtLm1lYW5bM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1NZWFuWzNdID0gbm9ybS5tZWFuWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1CaWFzID0gWzAsIDAsIDAsIDBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xuICAgICAgICBpZiAobm9ybS5iaWFzWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtQmlhc1szXSA9IG5vcm0uYmlhc1szXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0cmlkZSA9IGhlaWdodCAqIHdpZHRoO1xuICAgIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICAgIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSxcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XG4gICAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IFIgPSAoKHRlbnNvci5kYXRhW3JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1swXSkgKiBub3JtTWVhblswXTsgLy8gUiB2YWx1ZVxuICAgICAgICBjb25zdCBHID0gKCh0ZW5zb3IuZGF0YVtnVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMV0pICogbm9ybU1lYW5bMV07IC8vIEcgdmFsdWVcbiAgICAgICAgY29uc3QgQiA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAvLyBCIHZhbHVlXG4gICAgICAgIGNvbnN0IEEgPSBhVGVuc29yUG9pbnRlciA9PT0gLTEgPyAyNTUgOiAoKHRlbnNvci5kYXRhW2FUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1szXSkgKiBub3JtTWVhblszXTsgLy8gQSB2YWx1ZVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3Jlc3RyaWN0LXBsdXMtb3BlcmFuZHNcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKCcgKyBSICsgJywnICsgRyArICcsJyArIEIgKyAnLCcgKyBBICsgJyknO1xuICAgICAgICBwaXhlbHMyRENvbnRleHQuZmlsbFJlY3QoaiwgaSwgMSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgndG9EYXRhVVJMJyBpbiBjYW52YXMpIHtcbiAgICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndG9EYXRhVVJMIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvSW1hZ2VEYXRhKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclRvSW1hZ2VEYXRhID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhID0+IHtcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID1cbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJylcbiAgICAgIDogKG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSkuZ2V0Q29udGV4dCgnMmQnKSBhcyBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICBsZXQgaW1hZ2U6IEltYWdlRGF0YTtcbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IGNoYW5uZWxzOiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1sxXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbM107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZmF1bHQgbGF5b3V0IGlzIE5DV0hcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbM107XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbMV07XG4gICAgfVxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5tZWFuID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuWzBdLCBub3JtLm1lYW5bMV0sIG5vcm0ubWVhblsyXSwgMjU1XTtcbiAgICAgICAgaWYgKG5vcm0ubWVhblszXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybU1lYW5bM10gPSBub3JtLm1lYW5bM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLmJpYXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybUJpYXMgPSBbMCwgMCwgMCwgMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5iaWFzID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1CaWFzWzNdID0gbm9ybS5iaWFzWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKFxuICAgICAgICAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCAmJiBjaGFubmVscyA9PT0gNCAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQkEnKSB8fFxuICAgICAgICAoY2hhbm5lbHMgPT09IDMgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdSR0InICYmIG9wdGlvbnMuZm9ybWF0ICE9PSAnQkdSJylcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZW5zb3IgZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggaW5wdXQgdGVuc29yIGRpbXNcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCBwb2ludGVyIGFzc2lnbm1lbnRzXG4gICAgY29uc3Qgc3RlcCA9IDQ7XG4gICAgbGV0IHJJbWFnZVBvaW50ZXIgPSAwLFxuICAgICAgZ0ltYWdlUG9pbnRlciA9IDEsXG4gICAgICBiSW1hZ2VQb2ludGVyID0gMixcbiAgICAgIGFJbWFnZVBvaW50ZXIgPSAzO1xuICAgIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSxcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XG4gICAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfVxuXG4gICAgaW1hZ2UgPSBwaXhlbHMyRENvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgZm9yIChcbiAgICAgIGxldCBpID0gMDtcbiAgICAgIGkgPCBoZWlnaHQgKiB3aWR0aDtcbiAgICAgIHJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBiSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGFJbWFnZVBvaW50ZXIgKz0gc3RlcCwgaSsrXG4gICAgKSB7XG4gICAgICBpbWFnZS5kYXRhW3JJbWFnZVBvaW50ZXJdID0gKCh0ZW5zb3IuZGF0YVtyVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMF0pICogbm9ybU1lYW5bMF07IC8vIFIgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbZ0ltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgLy8gRyB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtiSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAvLyBCIHZhbHVlXG4gICAgICBpbWFnZS5kYXRhW2FJbWFnZVBvaW50ZXJdID1cbiAgICAgICAgYVRlbnNvclBvaW50ZXIgPT09IC0xID8gMjU1IDogKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107IC8vIEEgdmFsdWVcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbiAgcmV0dXJuIGltYWdlO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtcbiAgT3B0aW9uc0RpbWVuc2lvbnMsXG4gIE9wdGlvbnNGb3JtYXQsXG4gIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcbiAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLFxuICBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyxcbiAgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zLFxuICBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbn0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7IFRlbnNvciBhcyBUZW5zb3JJbnRlcmZhY2UgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmludGVyZmFjZSBCdWZmZXJUb1RlbnNvck9wdGlvbnNcbiAgZXh0ZW5kcyBPcHRpb25zRGltZW5zaW9ucyxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcbiAgICBPcHRpb25zRm9ybWF0LFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQge31cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIGltYWdlIG9iamVjdFxuICpcbiAqIEBwYXJhbSBidWZmZXIgLSBFeHRyYWN0ZWQgaW1hZ2UgYnVmZmVyIGRhdGEgLSBhc3N1bWluZyBSR0JBIGZvcm1hdFxuICogQHBhcmFtIGltYWdlRm9ybWF0IC0gaW5wdXQgaW1hZ2UgY29uZmlndXJhdGlvbiAtIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb25zIGhlaWdodCwgd2lkdGgsIGZvcm1hdFxuICogQHBhcmFtIHRlbnNvckZvcm1hdCAtIG91dHB1dCB0ZW5zb3IgY29uZmlndXJhdGlvbiAtIERlZmF1bHQgaXMgUkdCIGZvcm1hdFxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9UZW5zb3IgPSAoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheSB8IHVuZGVmaW5lZCwgb3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zKTogVGVuc29yID0+IHtcbiAgaWYgKGJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBidWZmZXIgbXVzdCBiZSBkZWZpbmVkJyk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGVpZ2h0ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy53aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBoZWlnaHQgYW5kIHdpZHRoIG11c3QgYmUgZGVmaW5lZCcpO1xuICB9XG4gIGlmIChvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOSFdDIFRlbnNvciBsYXlvdXQgaXMgbm90IHN1cHBvcnRlZCB5ZXQnKTtcbiAgfVxuXG4gIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gb3B0aW9ucztcblxuICBjb25zdCBub3JtID0gb3B0aW9ucy5ub3JtID8/IHsgbWVhbjogMjU1LCBiaWFzOiAwIH07XG4gIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbiAgaWYgKHR5cGVvZiBub3JtLm1lYW4gPT09ICdudW1iZXInKSB7XG4gICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgfSBlbHNlIHtcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4hWzBdLCBub3JtLm1lYW4hWzFdLCBub3JtLm1lYW4hWzJdLCBub3JtLm1lYW4hWzNdID8/IDI1NV07XG4gIH1cblxuICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcbiAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICB9IGVsc2Uge1xuICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcyFbMF0sIG5vcm0uYmlhcyFbMV0sIG5vcm0uYmlhcyFbMl0sIG5vcm0uYmlhcyFbM10gPz8gMF07XG4gIH1cblxuICBjb25zdCBpbnB1dGZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0JBJztcbiAgLy8gZGVmYXVsdCB2YWx1ZSBpcyBSR0JBIHNpbmNlIGltYWdlZGF0YSBhbmQgSFRNTEltYWdlRWxlbWVudCB1c2VzIGl0XG5cbiAgY29uc3Qgb3V0cHV0Zm9ybWF0ID1cbiAgICBvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRlbnNvckZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgY29uc3QgZmxvYXQzMkRhdGEgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBGbG9hdDMyQXJyYXkoc3RyaWRlICogNCkgOiBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDMpO1xuXG4gIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICBsZXQgc3RlcCA9IDQsXG4gICAgckltYWdlUG9pbnRlciA9IDAsXG4gICAgZ0ltYWdlUG9pbnRlciA9IDEsXG4gICAgYkltYWdlUG9pbnRlciA9IDIsXG4gICAgYUltYWdlUG9pbnRlciA9IDM7XG4gIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsXG4gICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLFxuICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgc3RlcCA9IDM7XG4gICAgckltYWdlUG9pbnRlciA9IDA7XG4gICAgZ0ltYWdlUG9pbnRlciA9IDE7XG4gICAgYkltYWdlUG9pbnRlciA9IDI7XG4gICAgYUltYWdlUG9pbnRlciA9IC0xO1xuICB9XG5cbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIG91dHB1dCB0ZW5zb3IgZm9ybWF0XG4gIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdCR1InKSB7XG4gICAgYlRlbnNvclBvaW50ZXIgPSAwO1xuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgIHJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgfVxuXG4gIGZvciAoXG4gICAgbGV0IGkgPSAwO1xuICAgIGkgPCBzdHJpZGU7XG4gICAgaSsrLCBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXBcbiAgKSB7XG4gICAgZmxvYXQzMkRhdGFbclRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW3JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMF0pIC8gbm9ybU1lYW5bMF07XG4gICAgZmxvYXQzMkRhdGFbZ1RlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2dJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMV0pIC8gbm9ybU1lYW5bMV07XG4gICAgZmxvYXQzMkRhdGFbYlRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMl0pIC8gbm9ybU1lYW5bMl07XG4gICAgaWYgKGFUZW5zb3JQb2ludGVyICE9PSAtMSAmJiBhSW1hZ2VQb2ludGVyICE9PSAtMSkge1xuICAgICAgZmxvYXQzMkRhdGFbYVRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2FJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbM10pIC8gbm9ybU1lYW5bM107XG4gICAgfVxuICB9XG5cbiAgLy8gRmxvYXQzMkFycmF5IC0+IG9ydC5UZW5zb3JcbiAgY29uc3Qgb3V0cHV0VGVuc29yID1cbiAgICBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJ1xuICAgICAgPyBuZXcgVGVuc29yKCdmbG9hdDMyJywgZmxvYXQzMkRhdGEsIFsxLCA0LCBoZWlnaHQsIHdpZHRoXSlcbiAgICAgIDogbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgMywgaGVpZ2h0LCB3aWR0aF0pO1xuICByZXR1cm4gb3V0cHV0VGVuc29yO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUltYWdlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tSW1hZ2UgPSBhc3luYyAoXG4gIGltYWdlOiBJbWFnZURhdGEgfCBIVE1MSW1hZ2VFbGVtZW50IHwgSW1hZ2VCaXRtYXAgfCBzdHJpbmcsXG4gIG9wdGlvbnM/OlxuICAgIHwgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcbiAgICB8IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zXG4gICAgfCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zXG4gICAgfCBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbik6IFByb21pc2U8VGVuc29yPiA9PiB7XG4gIC8vIGNoZWNraW5nIHRoZSB0eXBlIG9mIGltYWdlIG9iamVjdFxuICBjb25zdCBpc0hUTUxJbWFnZUVsZSA9IHR5cGVvZiBIVE1MSW1hZ2VFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGNvbnN0IGlzSW1hZ2VEYXRhRWxlID0gdHlwZW9mIEltYWdlRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGE7XG4gIGNvbnN0IGlzSW1hZ2VCaXRtYXAgPSB0eXBlb2YgSW1hZ2VCaXRtYXAgIT09ICd1bmRlZmluZWQnICYmIGltYWdlIGluc3RhbmNlb2YgSW1hZ2VCaXRtYXA7XG4gIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIGltYWdlID09PSAnc3RyaW5nJztcblxuICBsZXQgZGF0YTogVWludDhDbGFtcGVkQXJyYXkgfCB1bmRlZmluZWQ7XG4gIGxldCBidWZmZXJUb1RlbnNvck9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnMgPz8ge307XG5cbiAgY29uc3QgY3JlYXRlQ2FudmFzID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgT2Zmc2NyZWVuQ2FudmFzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudmFzIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGNyZWF0ZUNhbnZhc0NvbnRleHQgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IE9mZnNjcmVlbkNhbnZhcykgPT4ge1xuICAgIGlmIChjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgcmV0dXJuIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH0gZWxzZSBpZiAoY2FudmFzIGluc3RhbmNlb2YgT2Zmc2NyZWVuQ2FudmFzKSB7XG4gICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgT2Zmc2NyZWVuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG4gIC8vIGZpbGxpbmcgYW5kIGNoZWNraW5nIGltYWdlIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICBpZiAoaXNIVE1MSW1hZ2VFbGUpIHtcbiAgICAvLyBIVE1MSW1hZ2VFbGVtZW50IC0gaW1hZ2Ugb2JqZWN0IC0gZm9ybWF0IGlzIFJHQkEgYnkgZGVmYXVsdFxuICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xuICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXMpO1xuXG4gICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgICBsZXQgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgbGV0IHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZEhlaWdodCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZFdpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVkSGVpZ2h0O1xuICAgICAgICB3aWR0aCA9IG9wdGlvbnMucmVzaXplZFdpZHRoO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIGlmIChvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBpbnB1dCBjb25maWcgZm9ybWF0IG11c3QgYmUgUkdCQSBmb3IgSFRNTEltYWdlRWxlbWVudCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy50ZW5zb3JGb3JtYXQgPSAnUkdCQSc7XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMudGVuc29yRm9ybWF0ID0gJ1JHQkEnO1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIH1cblxuICAgICAgcGl4ZWxzMkRDb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XG4gICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNJbWFnZURhdGFFbGUpIHtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZFdpZHRoICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkSGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGhlaWdodCA9IG9wdGlvbnMucmVzaXplZEhlaWdodDtcbiAgICAgIHdpZHRoID0gb3B0aW9ucy5yZXNpemVkV2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgIHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmZvcm1hdCA9ICdSR0JBJztcbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgdGVtcENhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xuXG4gICAgICB0ZW1wQ2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dCh0ZW1wQ2FudmFzKTtcblxuICAgICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgICAgIHBpeGVsczJEQ29udGV4dC5wdXRJbWFnZURhdGEoaW1hZ2UsIDAsIDApO1xuICAgICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBpbWFnZS5kYXRhO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ltYWdlQml0bWFwKSB7XG4gICAgLy8gSW1hZ2VCaXRtYXAgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgbXVzdCBiZSBwcm92aWRlZCBieSB1c2VyXG4gICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBpbWFnZSBjb25maWcgd2l0aCBmb3JtYXQgZm9yIEltYWdlYml0bWFwJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyk7XG5cbiAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgIGNvbnN0IHdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICBwaXhlbHMyRENvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG4gICAgICByZXR1cm4gYnVmZmVyVG9UZW5zb3IoZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzU3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xuICAgICAgY29uc3QgY29udGV4dCA9IGNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzKTtcbiAgICAgIGlmICghaW1hZ2UgfHwgIWNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIG5ld0ltYWdlLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XG4gICAgICBuZXdJbWFnZS5zcmMgPSBpbWFnZTtcbiAgICAgIG5ld0ltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY2FudmFzLndpZHRoID0gbmV3SW1hZ2Uud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBuZXdJbWFnZS5oZWlnaHQ7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKG5ld0ltYWdlLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjb25zdCBpbWcgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIHJlc29sdmUoYnVmZmVyVG9UZW5zb3IoaW1nLmRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGRhdGEgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZCAtIGFib3J0ZWQgdGVuc29yIGNyZWF0aW9uJyk7XG4gIH1cblxuICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGJ1ZmZlclRvVGVuc29yKGRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBkYXRhIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWQgLSBhYm9ydGVkIHRlbnNvciBjcmVhdGlvbicpO1xuICB9XG59O1xuXG4vKipcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tVGV4dHVyZSgpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbVRleHR1cmUgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5UZXh0dXJlRGF0YVR5cGVzPihcbiAgdGV4dHVyZTogVGVuc29ySW50ZXJmYWNlLlRleHR1cmVUeXBlLFxuICBvcHRpb25zOiBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VD4sXG4pOiBUZW5zb3IgPT4ge1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGRvd25sb2FkLCBkaXNwb3NlIH0gPSBvcHRpb25zO1xuICAvLyBBbHdheXMgYXNzdW1lIFJHQkFGMzIuIFRPRE86IHN1cHBvcnQgZGlmZmVyZW50IHRleHR1cmUgZm9ybWF0XG4gIGNvbnN0IGRpbXMgPSBbMSwgaGVpZ2h0LCB3aWR0aCwgNF07XG4gIHJldHVybiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICd0ZXh0dXJlJywgdHlwZTogJ2Zsb2F0MzInLCB0ZXh0dXJlLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZSB9KTtcbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21HcHVCdWZmZXIoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21HcHVCdWZmZXIgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJEYXRhVHlwZXM+KFxuICBncHVCdWZmZXI6IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlLFxuICBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPixcbik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHsgZGF0YVR5cGUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0gPSBvcHRpb25zO1xuICByZXR1cm4gbmV3IFRlbnNvcih7IGxvY2F0aW9uOiAnZ3B1LWJ1ZmZlcicsIHR5cGU6IGRhdGFUeXBlID8/ICdmbG9hdDMyJywgZ3B1QnVmZmVyLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZSB9KTtcbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21QaW5uZWRCdWZmZXIoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21QaW5uZWRCdWZmZXIgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxuICB0eXBlOiBULFxuICBidWZmZXI6IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZU1hcFtUXSxcbiAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuKTogVGVuc29yID0+IG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ2NwdS1waW5uZWQnLCB0eXBlLCBkYXRhOiBidWZmZXIsIGRpbXM6IGRpbXMgPz8gW2J1ZmZlci5sZW5ndGhdIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPVxuICB8IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvcjtcbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXkgPSBJbnN0YW5jZVR5cGU8U3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz47XG5cbi8vIGEgcnVudGltZSBtYXAgdGhhdCBtYXBzIHR5cGUgc3RyaW5nIHRvIFR5cGVkQXJyYXkgY29uc3RydWN0b3IuIFNob3VsZCBtYXRjaCBUZW5zb3IuRGF0YVR5cGVNYXAuXG5leHBvcnQgY29uc3QgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCA9IG5ldyBNYXA8c3RyaW5nLCBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzPihbXG4gIFsnZmxvYXQzMicsIEZsb2F0MzJBcnJheV0sXG4gIFsndWludDgnLCBVaW50OEFycmF5XSxcbiAgWydpbnQ4JywgSW50OEFycmF5XSxcbiAgWyd1aW50MTYnLCBVaW50MTZBcnJheV0sXG4gIFsnaW50MTYnLCBJbnQxNkFycmF5XSxcbiAgWydpbnQzMicsIEludDMyQXJyYXldLFxuICBbJ2Jvb2wnLCBVaW50OEFycmF5XSxcbiAgWydmbG9hdDY0JywgRmxvYXQ2NEFycmF5XSxcbiAgWyd1aW50MzInLCBVaW50MzJBcnJheV0sXG4gIFsnaW50NCcsIFVpbnQ4QXJyYXldLFxuICBbJ3VpbnQ0JywgVWludDhBcnJheV0sXG5dKTtcblxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQID0gbmV3IE1hcDxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLCBUZW5zb3IuVHlwZT4oW1xuICBbRmxvYXQzMkFycmF5LCAnZmxvYXQzMiddLFxuICBbVWludDhBcnJheSwgJ3VpbnQ4J10sXG4gIFtJbnQ4QXJyYXksICdpbnQ4J10sXG4gIFtVaW50MTZBcnJheSwgJ3VpbnQxNiddLFxuICBbSW50MTZBcnJheSwgJ2ludDE2J10sXG4gIFtJbnQzMkFycmF5LCAnaW50MzInXSxcbiAgW0Zsb2F0NjRBcnJheSwgJ2Zsb2F0NjQnXSxcbiAgW1VpbnQzMkFycmF5LCAndWludDMyJ10sXG5dKTtcblxuLy8gYSBkdW1teSB0eXBlIGRlY2xhcmF0aW9uIGZvciBGbG9hdDE2QXJyYXkgaW4gY2FzZSBhbnkgcG9seWZpbGwgaXMgYXZhaWxhYmxlLlxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIGNvbnN0IEZsb2F0MTZBcnJheTogYW55O1xufVxuXG4vLyB0aGUgZm9sbG93aW5nIGNvZGUgYWxsb3dzIGRlbGF5aW5nIGV4ZWN1dGlvbiBvZiBCaWdJbnQvRmxvYXQxNkFycmF5IGNoZWNraW5nLiBUaGlzIGFsbG93cyBsYXp5IGluaXRpYWxpemF0aW9uIGZvclxuLy8gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCBhbmQgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCwgd2hpY2ggYWxsb3dzIEJpZ0ludC9GbG9hdDE2QXJyYXlcbi8vIHBvbHlmaWxsIGlmIGF2YWlsYWJsZS5cbmxldCBpc1R5cGVkQXJyYXlDaGVja2VkID0gZmFsc2U7XG5leHBvcnQgY29uc3QgY2hlY2tUeXBlZEFycmF5ID0gKCkgPT4ge1xuICBpZiAoIWlzVHlwZWRBcnJheUNoZWNrZWQpIHtcbiAgICBpc1R5cGVkQXJyYXlDaGVja2VkID0gdHJ1ZTtcbiAgICBjb25zdCBpc0JpZ0ludDY0QXJyYXlBdmFpbGFibGUgPSB0eXBlb2YgQmlnSW50NjRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgQmlnSW50NjRBcnJheS5mcm9tO1xuICAgIGNvbnN0IGlzQmlnVWludDY0QXJyYXlBdmFpbGFibGUgPSB0eXBlb2YgQmlnVWludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEJpZ1VpbnQ2NEFycmF5LmZyb207XG4gICAgY29uc3QgaXNGbG9hdDE2QXJyYXlBdmFpbGFibGUgPSB0eXBlb2YgRmxvYXQxNkFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBGbG9hdDE2QXJyYXkuZnJvbTtcblxuICAgIGlmIChpc0JpZ0ludDY0QXJyYXlBdmFpbGFibGUpIHtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuc2V0KCdpbnQ2NCcsIEJpZ0ludDY0QXJyYXkpO1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoQmlnSW50NjRBcnJheSwgJ2ludDY0Jyk7XG4gICAgfVxuICAgIGlmIChpc0JpZ1VpbnQ2NEFycmF5QXZhaWxhYmxlKSB7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgndWludDY0JywgQmlnVWludDY0QXJyYXkpO1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoQmlnVWludDY0QXJyYXksICd1aW50NjQnKTtcbiAgICB9XG4gICAgaWYgKGlzRmxvYXQxNkFycmF5QXZhaWxhYmxlKSB7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnZmxvYXQxNicsIEZsb2F0MTZBcnJheSk7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLnNldChGbG9hdDE2QXJyYXksICdmbG9hdDE2Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIEZsb2F0MTZBcnJheSBpcyBub3QgYXZhaWxhYmxlLCB1c2UgJ1VpbnQxNkFycmF5JyB0byBzdG9yZSB0aGUgZGF0YS5cbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuc2V0KCdmbG9hdDE2JywgVWludDE2QXJyYXkpO1xuICAgIH1cbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtcbiAgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG59IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3ItaW1wbC5qcyc7XG5cbi8qKlxuICogY2FsY3VsYXRlIHNpemUgZnJvbSBkaW1zLlxuICpcbiAqIEBwYXJhbSBkaW1zIHRoZSBkaW1zIGFycmF5LiBNYXkgYmUgYW4gaWxsZWdhbCBpbnB1dC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVNpemUgPSAoZGltczogcmVhZG9ubHkgdW5rbm93bltdKTogbnVtYmVyID0+IHtcbiAgbGV0IHNpemUgPSAxO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBkaW0gPSBkaW1zW2ldO1xuICAgIGlmICh0eXBlb2YgZGltICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzU2FmZUludGVnZXIoZGltKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgZGltc1ske2l9XSBtdXN0IGJlIGFuIGludGVnZXIsIGdvdDogJHtkaW19YCk7XG4gICAgfVxuICAgIGlmIChkaW0gPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgZGltc1ske2l9XSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIsIGdvdDogJHtkaW19YCk7XG4gICAgfVxuICAgIHNpemUgKj0gZGltO1xuICB9XG4gIHJldHVybiBzaXplO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IucmVzaGFwZSgpXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JSZXNoYXBlID0gKHRlbnNvcjogVGVuc29yLCBkaW1zOiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvciA9PiB7XG4gIHN3aXRjaCAodGVuc29yLmxvY2F0aW9uKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHRlbnNvci50eXBlLCB0ZW5zb3IuZGF0YSwgZGltcyk7XG4gICAgY2FzZSAnY3B1LXBpbm5lZCc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAnY3B1LXBpbm5lZCcsXG4gICAgICAgIGRhdGE6IHRlbnNvci5kYXRhIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1snZGF0YSddLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGNhc2UgJ3RleHR1cmUnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3Ioe1xuICAgICAgICBsb2NhdGlvbjogJ3RleHR1cmUnLFxuICAgICAgICB0ZXh0dXJlOiB0ZW5zb3IudGV4dHVyZSxcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XG4gICAgICAgIGxvY2F0aW9uOiAnZ3B1LWJ1ZmZlcicsXG4gICAgICAgIGdwdUJ1ZmZlcjogdGVuc29yLmdwdUJ1ZmZlcixcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXG4gICAgICAgIGRpbXMsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0ZW5zb3JSZXNoYXBlOiB0ZW5zb3IgbG9jYXRpb24gJHt0ZW5zb3IubG9jYXRpb259IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgdGVuc29yVG9EYXRhVVJMLCB0ZW5zb3JUb0ltYWdlRGF0YSB9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24taW1wbC5qcyc7XG5pbXBvcnQgeyBUZW5zb3JUb0RhdGFVcmxPcHRpb25zLCBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMgfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcbmltcG9ydCB7XG4gIHRlbnNvckZyb21HcHVCdWZmZXIsXG4gIHRlbnNvckZyb21JbWFnZSxcbiAgdGVuc29yRnJvbVBpbm5lZEJ1ZmZlcixcbiAgdGVuc29yRnJvbVRleHR1cmUsXG59IGZyb20gJy4vdGVuc29yLWZhY3RvcnktaW1wbC5qcyc7XG5pbXBvcnQge1xuICBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycyxcbiAgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLFxuICBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyxcbiAgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zLFxuICBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbiAgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVycyxcbn0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQge1xuICBjaGVja1R5cGVkQXJyYXksXG4gIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAsXG4gIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsXG4gIFN1cHBvcnRlZFR5cGVkQXJyYXksXG4gIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMsXG59IGZyb20gJy4vdGVuc29yLWltcGwtdHlwZS1tYXBwaW5nLmpzJztcbmltcG9ydCB7IGNhbGN1bGF0ZVNpemUsIHRlbnNvclJlc2hhcGUgfSBmcm9tICcuL3RlbnNvci11dGlscy1pbXBsLmpzJztcbmltcG9ydCB7IFRlbnNvciBhcyBUZW5zb3JJbnRlcmZhY2UgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbi8vIHR5cGUgYWxpYXNlcyBmb3IgdGhvc2UgZXhwb3J0ZWQgZnJvbSBUZW5zb3IgaW50ZXJmYWNlXG5cbnR5cGUgVGVuc29yVHlwZSA9IFRlbnNvckludGVyZmFjZS5UeXBlO1xudHlwZSBUZW5zb3JEYXRhVHlwZSA9IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZTtcbnR5cGUgVGVuc29yRGF0YUxvY2F0aW9uID0gVGVuc29ySW50ZXJmYWNlLkRhdGFMb2NhdGlvbjtcbnR5cGUgVGVuc29yVGV4dHVyZVR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGU7XG50eXBlIFRlbnNvckdwdUJ1ZmZlclR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyVHlwZTtcblxuLyoqXG4gKiB0aGUgaW1wbGVtZW50YXRpb24gb2YgVGVuc29yIGludGVyZmFjZS5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBUZW5zb3IgaW1wbGVtZW50cyBUZW5zb3JJbnRlcmZhY2Uge1xuICAvLyAjcmVnaW9uIGNvbnN0cnVjdG9yc1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgQ1BVIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHR5cGU6IFRlbnNvclR5cGUsXG4gICAgZGF0YTogVGVuc29yRGF0YVR5cGUgfCByZWFkb25seSBzdHJpbmdbXSB8IHJlYWRvbmx5IG51bWJlcltdIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLiBUeXBlIGlzIGluZmVycmVkIGZyb20gZGF0YS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFRlbnNvckRhdGFUeXBlIHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBib29sZWFuW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBwaW5uZWQgQ1BVIGRhdGEgd2l0aCB0aGUgZ2l2ZW4gdHlwZSBhbmQgZGltcy5cbiAgICpcbiAgICogVGVuc29yJ3MgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ2NwdS1waW5uZWQnLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIFdlYkdMIHRleHR1cmUgd2l0aCB0aGUgZ2l2ZW4gdHlwZSBhbmQgZGltcy5cbiAgICpcbiAgICogVGVuc29yJ3MgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ3RleHR1cmUnLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVycyk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJHUFUgYnVmZmVyIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdncHUtYnVmZmVyJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycyk7XG5cbiAgLyoqXG4gICAqIGltcGxlbWVudGF0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgYXJnMDpcbiAgICAgIHwgVGVuc29yVHlwZVxuICAgICAgfCBUZW5zb3JEYXRhVHlwZVxuICAgICAgfCByZWFkb25seSBzdHJpbmdbXVxuICAgICAgfCByZWFkb25seSBib29sZWFuW11cbiAgICAgIHwgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzXG4gICAgICB8IFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnNcbiAgICAgIHwgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICAgIGFyZzE/OiBUZW5zb3JEYXRhVHlwZSB8IHJlYWRvbmx5IG51bWJlcltdIHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBib29sZWFuW10sXG4gICAgYXJnMj86IHJlYWRvbmx5IG51bWJlcltdLFxuICApIHtcbiAgICAvLyBwZXJmb3JtIG9uZS10aW1lIGNoZWNrIGZvciBCaWdJbnQvRmxvYXQxNkFycmF5IHN1cHBvcnRcbiAgICBjaGVja1R5cGVkQXJyYXkoKTtcblxuICAgIGxldCB0eXBlOiBUZW5zb3JUeXBlO1xuICAgIGxldCBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcblxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ29iamVjdCcgJiYgJ2xvY2F0aW9uJyBpbiBhcmcwKSB7XG4gICAgICAvL1xuICAgICAgLy8gY29uc3RydWN0aW5nIHRlbnNvciBmcm9tIHNwZWNpZmljIGxvY2F0aW9uXG4gICAgICAvL1xuICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSBhcmcwLmxvY2F0aW9uO1xuICAgICAgdHlwZSA9IGFyZzAudHlwZTtcbiAgICAgIGRpbXMgPSBhcmcwLmRpbXM7XG4gICAgICBzd2l0Y2ggKGFyZzAubG9jYXRpb24pIHtcbiAgICAgICAgY2FzZSAnY3B1LXBpbm5lZCc6IHtcbiAgICAgICAgICBjb25zdCBleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuZ2V0KHR5cGUpO1xuICAgICAgICAgIGlmICghZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIHBpbm5lZCBidWZmZXJgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEoYXJnMC5kYXRhIGluc3RhbmNlb2YgZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBidWZmZXIgc2hvdWxkIGJlIG9mIHR5cGUgJHtleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3Rvci5uYW1lfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNwdURhdGEgPSBhcmcwLmRhdGE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndGV4dHVyZSc6IHtcbiAgICAgICAgICBpZiAodHlwZSAhPT0gJ2Zsb2F0MzInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSB0ZXh0dXJlYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZ3B1VGV4dHVyZURhdGEgPSBhcmcwLnRleHR1cmU7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Zsb2F0MzInICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnZmxvYXQxNicgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQzMicgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQ2NCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50MzInICYmXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDgnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnYm9vbCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50NCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQ0J1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gZ3B1IGJ1ZmZlcmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmdwdUJ1ZmZlckRhdGEgPSBhcmcwLmdwdUJ1ZmZlcjtcbiAgICAgICAgICB0aGlzLmRvd25sb2FkZXIgPSBhcmcwLmRvd25sb2FkO1xuICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSBhcmcwLmRpc3Bvc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbnNvciBjb25zdHJ1Y3RvcjogdW5zdXBwb3J0ZWQgbG9jYXRpb24gJyR7dGhpcy5kYXRhTG9jYXRpb259J2ApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL1xuICAgICAgLy8gY29uc3RydWN0aW5nIHRlbnNvciBvZiBsb2NhdGlvbiAnY3B1J1xuICAgICAgLy9cbiAgICAgIGxldCBkYXRhOiBUZW5zb3JEYXRhVHlwZTtcbiAgICAgIGxldCBtYXliZURpbXM6IHR5cGVvZiBhcmcxIHwgdHlwZW9mIGFyZzI7XG4gICAgICAvLyBjaGVjayB3aGV0aGVyIGFyZzAgaXMgdHlwZSBvciBkYXRhXG4gICAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIE92ZXJyaWRlOiBjb25zdHJ1Y3Rvcih0eXBlLCBkYXRhLCAuLi4pXG4gICAgICAgIC8vXG4gICAgICAgIHR5cGUgPSBhcmcwO1xuICAgICAgICBtYXliZURpbXMgPSBhcmcyO1xuICAgICAgICBpZiAoYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQSBzdHJpbmcgdGVuc29yJ3MgZGF0YSBtdXN0IGJlIGEgc3RyaW5nIGFycmF5LlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2UgZG9uJ3QgY2hlY2sgd2hldGhlciBldmVyeSBlbGVtZW50IGluIHRoZSBhcnJheSBpcyBzdHJpbmc7IHRoaXMgaXMgdG9vIHNsb3cuIHdlIGFzc3VtZSBpdCdzIGNvcnJlY3QgYW5kXG4gICAgICAgICAgLy8gZXJyb3Igd2lsbCBiZSBwb3B1bGF0ZWQgYXQgaW5mZXJlbmNlXG4gICAgICAgICAgZGF0YSA9IGFyZzE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbnVtZXJpYyB0ZW5zb3JcbiAgICAgICAgICBjb25zdCB0eXBlZEFycmF5Q29uc3RydWN0b3IgPSBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLmdldChhcmcwKTtcbiAgICAgICAgICBpZiAodHlwZWRBcnJheUNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuc3VwcG9ydGVkIHRlbnNvciB0eXBlOiAke2FyZzB9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICAgICAgaWYgKChhcmcwID09PSAnZmxvYXQxNicgJiYgdHlwZWRBcnJheUNvbnN0cnVjdG9yID09PSBVaW50MTZBcnJheSkgfHwgYXJnMCA9PT0gJ3VpbnQ0JyB8fCBhcmcwID09PSAnaW50NCcpIHtcbiAgICAgICAgICAgICAgLy8gLSAnZmxvYXQxNic6XG4gICAgICAgICAgICAgIC8vICAgV2hlbiBubyBGbG9hdDE2QXJyYXkgcG9seWZpbGwgaXMgdXNlZCwgd2UgY2Fubm90IGNyZWF0ZSAnZmxvYXQxNicgdGVuc29yIGZyb20gbnVtYmVyIGFycmF5LlxuICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAvLyAgIFRocm93IGVycm9yIGhlcmUgYmVjYXVzZSB3aGVuIHVzZXIgdHJ5IHRvIHVzZSBudW1iZXIgYXJyYXkgYXMgZGF0YSxcbiAgICAgICAgICAgICAgLy8gICBlLmcuIG5ldyBUZW5zb3IoJ2Zsb2F0MTYnLCBbMSwgMiwgMywgNF0sIGRpbXMpKSwgaXQgd2lsbCBhY3R1YWxseSBjYWxsXG4gICAgICAgICAgICAgIC8vICAgVWludDE2QXJyYXkuZnJvbShhcmcxKSB3aGljaCBnZW5lcmF0ZXMgd3JvbmcgZGF0YS5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gLSAndWludDQnIGFuZCAnaW50NCc6XG4gICAgICAgICAgICAgIC8vICAgVWludDhBcnJheS5mcm9tKGFyZzEpIHdpbGwgZ2VuZXJhdGUgd3JvbmcgZGF0YSBmb3IgJ3VpbnQ0JyBhbmQgJ2ludDQnIHRlbnNvci5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgICBgQ3JlYXRpbmcgYSAke2FyZzB9IHRlbnNvciBmcm9tIG51bWJlciBhcnJheSBpcyBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgdXNlICR7dHlwZWRBcnJheUNvbnN0cnVjdG9yLm5hbWV9IGFzIGRhdGEuYCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMCA9PT0gJ3VpbnQ2NCcgfHwgYXJnMCA9PT0gJ2ludDY0Jykge1xuICAgICAgICAgICAgICAvLyB1c2UgJ2FzIGFueScgaGVyZSBiZWNhdXNlOlxuICAgICAgICAgICAgICAvLyAxLiBUeXBlU2NyaXB0J3MgY2hlY2sgb24gdHlwZSBvZiAnQXJyYXkuaXNBcnJheSgpJyBkb2VzIG5vdCB3b3JrIHdpdGggcmVhZG9ubHkgYXJyYXlzLlxuICAgICAgICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xNzAwMlxuICAgICAgICAgICAgICAvLyAyLiBUeXBlU2NyaXB0J3MgY2hlY2sgb24gdW5pb24gdHlwZSBvZiAnKEJpZ0ludDY0QXJyYXlDb25zdHJ1Y3RvcnxCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yKS5mcm9tKCknXG4gICAgICAgICAgICAgIC8vIGRvZXMgbm90IGFjY2VwdCBwYXJhbWV0ZXIgbWFwRm4uXG4gICAgICAgICAgICAgIC8vIDMuIHBhcmFtZXRlcnMgb2YgJ1N1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMuZnJvbSgpJyBkb2VzIG5vdCBtYXRjaCB0aGUgcmVxdWlyZW1lbnQgb2YgdGhlIHVuaW9uXG4gICAgICAgICAgICAgIC8vIHR5cGUuXG5cbiAgICAgICAgICAgICAgLy8gYXNzdW1lICdhcmcxJyBpcyBvZiB0eXBlIFwicmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgYmlnaW50W11cIiBoZXJlLlxuXG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgIGRhdGEgPSAodHlwZWRBcnJheUNvbnN0cnVjdG9yIGFzIGFueSkuZnJvbShhcmcxLCBCaWdJbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gYXNzdW1lICdhcmcxJyBpcyBvZiB0eXBlIFwicmVhZG9ubHkgbnVtYmVyW11cIiBoZXJlLlxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICBkYXRhID0gKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciBhcyBhbnkpLmZyb20oYXJnMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcxIGluc3RhbmNlb2YgdHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICBkYXRhID0gYXJnMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQSAke3R5cGV9IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mICR7dHlwZWRBcnJheUNvbnN0cnVjdG9yfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gT3ZlcnJpZGU6IGNvbnN0cnVjdG9yKGRhdGEsIC4uLilcbiAgICAgICAgLy9cbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMCkpIHtcbiAgICAgICAgICAvLyBvbmx5IGJvb2xlYW5bXSBhbmQgc3RyaW5nW10gaXMgc3VwcG9ydGVkXG4gICAgICAgICAgaWYgKGFyZzAubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUZW5zb3IgdHlwZSBjYW5ub3QgYmUgaW5mZXJyZWQgZnJvbSBhbiBlbXB0eSBhcnJheS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZmlyc3RFbGVtZW50VHlwZSA9IHR5cGVvZiBhcmcwWzBdO1xuICAgICAgICAgIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdHlwZSA9ICdzdHJpbmcnO1xuICAgICAgICAgICAgZGF0YSA9IGFyZzA7XG4gICAgICAgICAgfSBlbHNlIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnYm9vbCc7XG4gICAgICAgICAgICAvLyAnYXJnMCcgaXMgb2YgdHlwZSAnYm9vbGVhbltdJy4gVWludDhBcnJheS5mcm9tKGJvb2xlYW5bXSkgYWN0dWFsbHkgd29ya3MsIGJ1dCB0eXBlc2NyaXB0IHRoaW5rcyB0aGlzIGlzXG4gICAgICAgICAgICAvLyB3cm9uZyB0eXBlLiBXZSB1c2UgJ2FzIGFueScgdG8gbWFrZSBpdCBoYXBweS5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzAgYXMgYW55W10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIGVsZW1lbnQgdHlwZSBvZiBkYXRhIGFycmF5OiAke2ZpcnN0RWxlbWVudFR5cGV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBnZXQgdGVuc29yIHR5cGUgZnJvbSBUeXBlZEFycmF5XG4gICAgICAgICAgY29uc3QgbWFwcGVkVHlwZSA9IE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuZ2V0KFxuICAgICAgICAgICAgYXJnMC5jb25zdHJ1Y3RvciBhcyBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKG1hcHBlZFR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5zdXBwb3J0ZWQgdHlwZSBmb3IgdGVuc29yIGRhdGE6ICR7YXJnMC5jb25zdHJ1Y3Rvcn0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHR5cGUgPSBtYXBwZWRUeXBlO1xuICAgICAgICAgIGRhdGEgPSBhcmcwIGFzIFN1cHBvcnRlZFR5cGVkQXJyYXk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdHlwZSBhbmQgZGF0YSBpcyBwcm9jZXNzZWQsIG5vdyBwcm9jZXNzaW5nIGRpbXNcbiAgICAgIGlmIChtYXliZURpbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBhc3N1bWUgMS1EIHRlbnNvciBpZiBkaW1zIG9taXR0ZWRcbiAgICAgICAgbWF5YmVEaW1zID0gW2RhdGEubGVuZ3RoXTtcbiAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWF5YmVEaW1zKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQSB0ZW5zb3IncyBkaW1zIG11c3QgYmUgYSBudW1iZXIgYXJyYXlcIik7XG4gICAgICB9XG4gICAgICBkaW1zID0gbWF5YmVEaW1zIGFzIHJlYWRvbmx5IG51bWJlcltdO1xuXG4gICAgICB0aGlzLmNwdURhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnY3B1JztcbiAgICB9XG5cbiAgICAvLyBwZXJmb3JtIGNoZWNrIG9uIGRpbXNcbiAgICBjb25zdCBzaXplID0gY2FsY3VsYXRlU2l6ZShkaW1zKTtcbiAgICAvLyBpZiBkYXRhIGlzIG9uIENQVSwgY2hlY2sgd2hldGhlciBkYXRhIGxlbmd0aCBtYXRjaGVzIHRlbnNvciBzaXplXG4gICAgaWYgKHRoaXMuY3B1RGF0YSAmJiBzaXplICE9PSB0aGlzLmNwdURhdGEubGVuZ3RoKSB7XG4gICAgICBpZiAoKHR5cGUgPT09ICd1aW50NCcgfHwgdHlwZSA9PT0gJ2ludDQnKSAmJiBNYXRoLmNlaWwoc2l6ZSAvIDIpID09PSB0aGlzLmNwdURhdGEubGVuZ3RoKSB7XG4gICAgICAgIC8vIGZvciAodSlpbnQ0LCB0aGUgZGF0YSBsZW5ndGggaXMgaGFsZiBvZiB0aGUgdGVuc29yIHNpemUuIFNvIHdlIGNoZWNrIHRoaXMgc3BlY2lhbCBjYXNlIHdoZW4gc2l6ZSBpcyBvZGQuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbnNvcidzIHNpemUoJHtzaXplfSkgZG9lcyBub3QgbWF0Y2ggZGF0YSBsZW5ndGgoJHt0aGlzLmNwdURhdGEubGVuZ3RofSkuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmRpbXMgPSBkaW1zO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gZmFjdG9yeVxuICBzdGF0aWMgYXN5bmMgZnJvbUltYWdlKFxuICAgIGltYWdlOiBJbWFnZURhdGEgfCBIVE1MSW1hZ2VFbGVtZW50IHwgSW1hZ2VCaXRtYXAgfCBzdHJpbmcsXG4gICAgb3B0aW9ucz86XG4gICAgICB8IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zXG4gICAgICB8IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zXG4gICAgICB8IFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnNcbiAgICAgIHwgVGVuc29yRnJvbVVybE9wdGlvbnMsXG4gICk6IFByb21pc2U8VGVuc29ySW50ZXJmYWNlPiB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21JbWFnZShpbWFnZSwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRleHR1cmU8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5UZXh0dXJlRGF0YVR5cGVzPihcbiAgICB0ZXh0dXJlOiBUZW5zb3JUZXh0dXJlVHlwZSxcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VD4sXG4gICk6IFRlbnNvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21UZXh0dXJlKHRleHR1cmUsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21HcHVCdWZmZXI8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJEYXRhVHlwZXM+KFxuICAgIGdwdUJ1ZmZlcjogVGVuc29yR3B1QnVmZmVyVHlwZSxcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPixcbiAgKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbUdwdUJ1ZmZlcihncHVCdWZmZXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21QaW5uZWRCdWZmZXI8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxuICAgIHR5cGU6IFQsXG4gICAgYnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuRGF0YVR5cGVNYXBbVF0sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUZW5zb3Ige1xuICAgIHJldHVybiB0ZW5zb3JGcm9tUGlubmVkQnVmZmVyKHR5cGUsIGJ1ZmZlciwgZGltcyk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBjb252ZXJzaW9uc1xuICB0b0RhdGFVUkwob3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0ZW5zb3JUb0RhdGFVUkwodGhpcywgb3B0aW9ucyk7XG4gIH1cblxuICB0b0ltYWdlRGF0YShvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhIHtcbiAgICByZXR1cm4gdGVuc29yVG9JbWFnZURhdGEodGhpcywgb3B0aW9ucyk7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHVibGljIGZpZWxkc1xuICByZWFkb25seSBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcbiAgcmVhZG9ubHkgdHlwZTogVGVuc29yVHlwZTtcbiAgcmVhZG9ubHkgc2l6ZTogbnVtYmVyO1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcml2YXRlIGZpZWxkc1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhLlxuICAgKi9cbiAgcHJpdmF0ZSBkYXRhTG9jYXRpb246IFRlbnNvckRhdGFMb2NhdGlvbjtcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSBkYXRhIG9uIENQVSwgaWYgbG9jYXRpb24gaXMgJ2NwdScgb3IgJ2NwdS1waW5uZWQnLiBvdGhlcndpc2UgZW1wdHkuXG4gICAqL1xuICBwcml2YXRlIGNwdURhdGE/OiBUZW5zb3JEYXRhVHlwZTtcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSB1bmRlcmx5aW5nIHRleHR1cmUgd2hlbiBsb2NhdGlvbiBpcyAndGV4dHVyZScuIG90aGVyd2lzZSBlbXB0eS5cbiAgICovXG4gIHByaXZhdGUgZ3B1VGV4dHVyZURhdGE/OiBUZW5zb3JUZXh0dXJlVHlwZTtcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSB1bmRlcmx5aW5nIEdQVSBidWZmZXIgd2hlbiBsb2NhdGlvbiBpcyAnZ3B1LWJ1ZmZlcicuIG90aGVyd2lzZSBlbXB0eS5cbiAgICovXG4gIHByaXZhdGUgZ3B1QnVmZmVyRGF0YT86IFRlbnNvckdwdUJ1ZmZlclR5cGU7XG5cbiAgLyoqXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkb3dubG9hZGVyIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxuICAgKi9cbiAgcHJpdmF0ZSBkb3dubG9hZGVyPygpOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPjtcblxuICAvKipcbiAgICogYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0aGUgZGF0YSBpcyBiZWluZyBkb3dubG9hZGVkIGZyb20gR1BVIHRvIENQVS5cbiAgICovXG4gIHByaXZhdGUgaXNEb3dubG9hZGluZz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkaXNwb3NlciBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB1bmRlcmx5aW5nIGRhdGEuXG4gICAqL1xuICBwcml2YXRlIGRpc3Bvc2VyPygpOiB2b2lkO1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9wZXJ0aWVzXG4gIGdldCBkYXRhKCk6IFRlbnNvckRhdGFUeXBlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKCF0aGlzLmNwdURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSBkYXRhIGlzIG5vdCBvbiBDUFUuIFVzZSBgZ2V0RGF0YSgpYCB0byBkb3dubG9hZCBHUFUgZGF0YSB0byBDUFUsICcgK1xuICAgICAgICAgICdvciB1c2UgYHRleHR1cmVgIG9yIGBncHVCdWZmZXJgIHByb3BlcnR5IHRvIGFjY2VzcyB0aGUgR1BVIGRhdGEgZGlyZWN0bHkuJyxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNwdURhdGE7XG4gIH1cblxuICBnZXQgbG9jYXRpb24oKTogVGVuc29yRGF0YUxvY2F0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhTG9jYXRpb247XG4gIH1cblxuICBnZXQgdGV4dHVyZSgpOiBUZW5zb3JUZXh0dXJlVHlwZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICghdGhpcy5ncHVUZXh0dXJlRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR0wgdGV4dHVyZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1VGV4dHVyZURhdGE7XG4gIH1cblxuICBnZXQgZ3B1QnVmZmVyKCk6IFRlbnNvckdwdUJ1ZmZlclR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuZ3B1QnVmZmVyRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR1BVIGJ1ZmZlci4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ3B1QnVmZmVyRGF0YTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBtZXRob2RzXG5cbiAgYXN5bmMgZ2V0RGF0YShyZWxlYXNlRGF0YT86IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPiB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIHN3aXRjaCAodGhpcy5kYXRhTG9jYXRpb24pIHtcbiAgICAgIGNhc2UgJ2NwdSc6XG4gICAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICAgIGNhc2UgJ3RleHR1cmUnOlxuICAgICAgY2FzZSAnZ3B1LWJ1ZmZlcic6IHtcbiAgICAgICAgaWYgKCF0aGlzLmRvd25sb2FkZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBub3QgY3JlYXRlZCB3aXRoIGEgc3BlY2lmaWVkIGRhdGEgZG93bmxvYWRlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgYmVpbmcgZG93bmxvYWRlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZG93bmxvYWRlcigpO1xuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xuICAgICAgICAgIHRoaXMuY3B1RGF0YSA9IGRhdGE7XG5cbiAgICAgICAgICBpZiAocmVsZWFzZURhdGEgJiYgdGhpcy5kaXNwb3Nlcikge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlcigpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZ2V0IGRhdGEgZnJvbSBsb2NhdGlvbjogJHt0aGlzLmRhdGFMb2NhdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRG93bmxvYWRpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgIHRoaXMuZGlzcG9zZXIoKTtcbiAgICAgIHRoaXMuZGlzcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuY3B1RGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRvd25sb2FkZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnbm9uZSc7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB0ZW5zb3IgdXRpbGl0aWVzXG4gIHByaXZhdGUgZW5zdXJlVmFsaWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YUxvY2F0aW9uID09PSAnbm9uZScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRlbnNvciBpcyBkaXNwb3NlZC4nKTtcbiAgICB9XG4gIH1cblxuICByZXNoYXBlKGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKHRoaXMuZG93bmxvYWRlciB8fCB0aGlzLmRpc3Bvc2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZXNoYXBlIGEgdGVuc29yIHRoYXQgb3ducyBHUFUgcmVzb3VyY2UuJyk7XG4gICAgfVxuICAgIHJldHVybiB0ZW5zb3JSZXNoYXBlKHRoaXMsIGRpbXMpO1xuICB9XG4gIC8vICNlbmRyZWdpb25cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgVGVuc29yRmFjdG9yeSB9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckltcGwgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7IFR5cGVkVGVuc29yVXRpbHMgfSBmcm9tICcuL3RlbnNvci11dGlscy5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuLyoqXG4gKiByZXByZXNlbnQgYSBiYXNpYyB0ZW5zb3Igd2l0aCBzcGVjaWZpZWQgZGltZW5zaW9ucyBhbmQgZGF0YSB0eXBlLlxuICovXG5pbnRlcmZhY2UgVHlwZWRUZW5zb3JCYXNlPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xuICAvKipcbiAgICogR2V0IHRoZSBkaW1lbnNpb25zIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSB0eXBlOiBUO1xuICAvKipcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gQ1BVIChlZy4gaXQncyBpbiB0aGUgZm9ybSBvZiBXZWJHTCB0ZXh0dXJlIG9yIFdlYkdQVSBidWZmZXIpLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcbiAgLyoqXG4gICAqIEdldCB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbjtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR0wgdGV4dHVyZSB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHTCB0ZXh0dXJlLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcbiAgLyoqXG4gICAqIEdldCB0aGUgV2ViR1BVIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHUFUgYnVmZmVyLCB0aHJvdyBlcnJvci5cbiAgICovXG4gIHJlYWRvbmx5IGdwdUJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGU7XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYnVmZmVyIGRhdGEgb2YgdGhlIHRlbnNvci5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgb24gQ1BVLCByZXR1cm5zIHRoZSBkYXRhIGltbWVkaWF0ZWx5LlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBHUFUsIGRvd25sb2FkcyB0aGUgZGF0YSBhbmQgcmV0dXJucyB0aGUgcHJvbWlzZS5cbiAgICpcbiAgICogQHBhcmFtIHJlbGVhc2VEYXRhIC0gd2hldGhlciByZWxlYXNlIHRoZSBkYXRhIG9uIEdQVS4gSWdub3JlIGlmIGRhdGEgaXMgYWxyZWFkeSBvbiBDUFUuXG4gICAqL1xuICBnZXREYXRhKHJlbGVhc2VEYXRhPzogYm9vbGVhbik6IFByb21pc2U8VGVuc29yLkRhdGFUeXBlTWFwW1RdPjtcblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgdGVuc29yIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIENQVSwgcmVtb3ZlIGl0cyBpbnRlcm5hbCByZWZlcmVuY2UgdG8gdGhlIHVuZGVybHlpbmcgZGF0YS5cbiAgICogSWYgdGhlIGRhdGEgaXMgb24gR1BVLCByZWxlYXNlIHRoZSBkYXRhIG9uIEdQVS5cbiAgICpcbiAgICogQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCB0aGUgdGVuc29yIGlzIGNvbnNpZGVyZWQgbm8gbG9uZ2VyIHZhbGlkLiBJdHMgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ25vbmUnLlxuICAgKi9cbiAgZGlzcG9zZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgVGVuc29yIHtcbiAgaW50ZXJmYWNlIERhdGFUeXBlTWFwIHtcbiAgICBmbG9hdDMyOiBGbG9hdDMyQXJyYXk7XG4gICAgdWludDg6IFVpbnQ4QXJyYXk7XG4gICAgaW50ODogSW50OEFycmF5O1xuICAgIHVpbnQxNjogVWludDE2QXJyYXk7XG4gICAgaW50MTY6IEludDE2QXJyYXk7XG4gICAgaW50MzI6IEludDMyQXJyYXk7XG4gICAgaW50NjQ6IEJpZ0ludDY0QXJyYXk7XG4gICAgc3RyaW5nOiBzdHJpbmdbXTtcbiAgICBib29sOiBVaW50OEFycmF5O1xuICAgIGZsb2F0MTY6IFVpbnQxNkFycmF5OyAvLyBLZWVwIHVzaW5nIFVpbnQxNkFycmF5IHVudGlsIHdlIGhhdmUgYSBjb25jcmV0ZSBzb2x1dGlvbiBmb3IgZmxvYXQgMTYuXG4gICAgZmxvYXQ2NDogRmxvYXQ2NEFycmF5O1xuICAgIHVpbnQzMjogVWludDMyQXJyYXk7XG4gICAgdWludDY0OiBCaWdVaW50NjRBcnJheTtcbiAgICAvLyBjb21wbGV4NjQ6IG5ldmVyO1xuICAgIC8vIGNvbXBsZXgxMjg6IG5ldmVyO1xuICAgIC8vIGJmbG9hdDE2OiBuZXZlcjtcbiAgICB1aW50NDogVWludDhBcnJheTtcbiAgICBpbnQ0OiBJbnQ4QXJyYXk7XG4gIH1cblxuICBpbnRlcmZhY2UgRWxlbWVudFR5cGVNYXAge1xuICAgIGZsb2F0MzI6IG51bWJlcjtcbiAgICB1aW50ODogbnVtYmVyO1xuICAgIGludDg6IG51bWJlcjtcbiAgICB1aW50MTY6IG51bWJlcjtcbiAgICBpbnQxNjogbnVtYmVyO1xuICAgIGludDMyOiBudW1iZXI7XG4gICAgaW50NjQ6IGJpZ2ludDtcbiAgICBzdHJpbmc6IHN0cmluZztcbiAgICBib29sOiBib29sZWFuO1xuICAgIGZsb2F0MTY6IG51bWJlcjsgLy8gS2VlcCB1c2luZyBVaW50MTZBcnJheSB1bnRpbCB3ZSBoYXZlIGEgY29uY3JldGUgc29sdXRpb24gZm9yIGZsb2F0IDE2LlxuICAgIGZsb2F0NjQ6IG51bWJlcjtcbiAgICB1aW50MzI6IG51bWJlcjtcbiAgICB1aW50NjQ6IGJpZ2ludDtcbiAgICAvLyBjb21wbGV4NjQ6IG5ldmVyO1xuICAgIC8vIGNvbXBsZXgxMjg6IG5ldmVyO1xuICAgIC8vIGJmbG9hdDE2OiBuZXZlcjtcbiAgICB1aW50NDogbnVtYmVyO1xuICAgIGludDQ6IG51bWJlcjtcbiAgfVxuXG4gIHR5cGUgRGF0YVR5cGUgPSBEYXRhVHlwZU1hcFtUeXBlXTtcbiAgdHlwZSBFbGVtZW50VHlwZSA9IEVsZW1lbnRUeXBlTWFwW1R5cGVdO1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBwaW5uZWQgQ1BVIGJ1ZmZlclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgQ3B1UGlubmVkRGF0YVR5cGVzID0gRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZyc+O1xuXG4gIC8qKlxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJHTCB0ZXh0dXJlXG4gICAqL1xuICBleHBvcnQgdHlwZSBUZXh0dXJlVHlwZSA9IFdlYkdMVGV4dHVyZTtcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViR0wgdGV4dHVyZVxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVGV4dHVyZURhdGFUeXBlcyA9ICdmbG9hdDMyJztcblxuICAvKipcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR1BVIGJ1ZmZlclxuICAgKlxuICAgKiBUaGUgcmVhc29uIHdoeSB3ZSBkb24ndCB1c2UgdHlwZSBcIkdQVUJ1ZmZlclwiIGRlZmluZWQgaW4gd2ViZ3B1LmQudHMgZnJvbSBAd2ViZ3B1L3R5cGVzIGlzIGJlY2F1c2UgXCJAd2ViZ3B1L3R5cGVzXCJcbiAgICogcmVxdWlyZXMgXCJAdHlwZXMvZG9tLXdlYmNvZGVjc1wiIGFzIHBlZXIgZGVwZW5kZW5jeSB3aGVuIHVzaW5nIFR5cGVTY3JpcHQgPCB2NS4xIGFuZCBpdHMgdmVyc2lvbiBuZWVkIHRvIGJlIGNob3NlblxuICAgKiBjYXJlZnVsbHkgYWNjb3JkaW5nIHRvIHRoZSBUeXBlU2NyaXB0IHZlcnNpb24gYmVpbmcgdXNlZC4gVGhpcyBtZWFucyBzbyBmYXIgdGhlcmUgaXMgbm90IGEgd2F5IHRvIGtlZXAgZXZlcnlcbiAgICogVHlwZVNjcmlwdCB2ZXJzaW9uIGhhcHB5LiBJdCB0dXJucyBvdXQgdGhhdCB3ZSB3aWxsIGVhc2lseSBicm9rZSB1c2VycyBvbiBzb21lIFR5cGVTY3JpcHQgdmVyc2lvbi5cbiAgICpcbiAgICogZm9yIG1vcmUgaW5mbyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2dwdXdlYi90eXBlcy9pc3N1ZXMvMTI3XG4gICAqL1xuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJUeXBlID0geyBzaXplOiBudW1iZXI7IG1hcFN0YXRlOiAndW5tYXBwZWQnIHwgJ3BlbmRpbmcnIHwgJ21hcHBlZCcgfTtcblxuICAvKipcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViR1BVIGJ1ZmZlclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgR3B1QnVmZmVyRGF0YVR5cGVzID0gJ2Zsb2F0MzInIHwgJ2Zsb2F0MTYnIHwgJ2ludDMyJyB8ICdpbnQ2NCcgfCAndWludDMyJyB8ICd1aW50OCcgfCAnYm9vbCc7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB3aGVyZSB0aGUgdGVuc29yIGRhdGEgaXMgc3RvcmVkXG4gICAqL1xuICBleHBvcnQgdHlwZSBEYXRhTG9jYXRpb24gPSAnbm9uZScgfCAnY3B1JyB8ICdjcHUtcGlubmVkJyB8ICd0ZXh0dXJlJyB8ICdncHUtYnVmZmVyJztcblxuICAvKipcbiAgICogcmVwcmVzZW50IHRoZSBkYXRhIHR5cGUgb2YgYSB0ZW5zb3JcbiAgICovXG4gIGV4cG9ydCB0eXBlIFR5cGUgPSBrZXlvZiBEYXRhVHlwZU1hcDtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgbXVsdGktZGltZW5zaW9uYWwgYXJyYXlzIHRvIGZlZWQgdG8gb3IgZmV0Y2ggZnJvbSBtb2RlbCBpbmZlcmVuY2luZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUeXBlZFRlbnNvcjxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IGV4dGVuZHMgVHlwZWRUZW5zb3JCYXNlPFQ+LCBUeXBlZFRlbnNvclV0aWxzPFQ+IHt9XG4vKipcbiAqIFJlcHJlc2VudCBtdWx0aS1kaW1lbnNpb25hbCBhcnJheXMgdG8gZmVlZCB0byBvciBmZXRjaCBmcm9tIG1vZGVsIGluZmVyZW5jaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvciBleHRlbmRzIFR5cGVkVGVuc29yQmFzZTxUZW5zb3IuVHlwZT4sIFR5cGVkVGVuc29yVXRpbHM8VGVuc29yLlR5cGU+IHt9XG5cbi8qKlxuICogdHlwZSBUZW5zb3JDb25zdHJ1Y3RvciBkZWZpbmVzIHRoZSBjb25zdHJ1Y3RvcnMgb2YgJ1RlbnNvcicgdG8gY3JlYXRlIENQVSB0ZW5zb3IgaW5zdGFuY2VzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckNvbnN0cnVjdG9yIGV4dGVuZHMgVGVuc29yRmFjdG9yeSB7XG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIHNwZWNpZnkgZWxlbWVudCB0eXBlXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgc3RyaW5nIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoXG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwWydzdHJpbmcnXSB8IHJlYWRvbmx5IHN0cmluZ1tdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTogVHlwZWRUZW5zb3I8J3N0cmluZyc+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgYm9vbCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKFxuICAgIHR5cGU6ICdib29sJyxcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ2Jvb2wnXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk6IFR5cGVkVGVuc29yPCdib29sJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyA2NC1iaXQgaW50ZWdlciB0eXBlZCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgPFQgZXh0ZW5kcyAndWludDY0JyB8ICdpbnQ2NCc+KFxuICAgIHR5cGU6IFQsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgYmlnaW50W10gfCByZWFkb25seSBudW1iZXJbXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgbnVtZXJpYyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgPFQgZXh0ZW5kcyBFeGNsdWRlPFRlbnNvci5UeXBlLCAnc3RyaW5nJyB8ICdib29sJyB8ICd1aW50NjQnIHwgJ2ludDY0Jz4+KFxuICAgIHR5cGU6IFQsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgbnVtYmVyW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUeXBlZFRlbnNvcjxUPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGluZmVyIGVsZW1lbnQgdHlwZXNcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEZsb2F0MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBVaW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogVWludDE2QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50MTYnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDE2IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBJbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50MTYnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDMyIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBJbnQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBCaWdJbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50NjQnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHN0cmluZyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogcmVhZG9ubHkgc3RyaW5nW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdzdHJpbmcnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGJvb2wgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IHJlYWRvbmx5IGJvb2xlYW5bXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEZsb2F0NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0NjQnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogVWludDMyQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogQmlnVWludDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50NjQnPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gZmFsbCBiYWNrIHRvIG5vbi1nZW5lcmljIHRlbnNvciB0eXBlIGRlY2xhcmF0aW9uXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKFxuICAgIHR5cGU6IFRlbnNvci5UeXBlLFxuICAgIGRhdGE6IFRlbnNvci5EYXRhVHlwZSB8IHJlYWRvbmx5IG51bWJlcltdIHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBiaWdpbnRbXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk6IFRlbnNvcjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBUZW5zb3IuRGF0YVR5cGUsIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvcjtcbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgVGVuc29yID0gVGVuc29ySW1wbCBhcyBUZW5zb3JDb25zdHJ1Y3RvcjtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgZW52IH0gZnJvbSAnLi9lbnYtaW1wbC5qcyc7XG5cbi8qKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY29uc3QgVFJBQ0UgPSAoZGV2aWNlVHlwZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgY29uc29sZS50aW1lU3RhbXAoYCR7ZGV2aWNlVHlwZX06Ok9SVDo6JHtsYWJlbH1gKTtcbn07XG5cbmNvbnN0IFRSQUNFX0ZVTkMgPSAobXNnOiBzdHJpbmcsIGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KC9cXHJcXG58XFxyfFxcbi9nKSB8fCBbXTtcbiAgbGV0IGhhc1RyYWNlRnVuYyA9IGZhbHNlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGhhc1RyYWNlRnVuYyAmJiAhc3RhY2tbaV0uaW5jbHVkZXMoJ1RSQUNFX0ZVTkMnKSkge1xuICAgICAgbGV0IGxhYmVsID0gYEZVTkNfJHttc2d9Ojoke3N0YWNrW2ldLnRyaW0oKS5zcGxpdCgnICcpWzFdfWA7XG4gICAgICBpZiAoZXh0cmFNc2cpIHtcbiAgICAgICAgbGFiZWwgKz0gYDo6JHtleHRyYU1zZ31gO1xuICAgICAgfVxuICAgICAgVFJBQ0UoJ0NQVScsIGxhYmVsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN0YWNrW2ldLmluY2x1ZGVzKCdUUkFDRV9GVU5DJykpIHtcbiAgICAgIGhhc1RyYWNlRnVuYyA9IHRydWU7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFX0ZVTkNfQkVHSU4gPSAoZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcbiAgaWYgKHR5cGVvZiBlbnYudHJhY2UgPT09ICd1bmRlZmluZWQnID8gIWVudi53YXNtLnRyYWNlIDogIWVudi50cmFjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBUUkFDRV9GVU5DKCdCRUdJTicsIGV4dHJhTXNnKTtcbn07XG5cbi8qKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY29uc3QgVFJBQ0VfRlVOQ19FTkQgPSAoZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcbiAgaWYgKHR5cGVvZiBlbnYudHJhY2UgPT09ICd1bmRlZmluZWQnID8gIWVudi53YXNtLnRyYWNlIDogIWVudi50cmFjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBUUkFDRV9GVU5DKCdFTkQnLCBleHRyYU1zZyk7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVycyB9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIH0gZnJvbSAnLi9iYWNrZW5kLmpzJztcbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZSB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuaW1wb3J0IHsgT25ueFZhbHVlIH0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcbmltcG9ydCB7IFRSQUNFX0ZVTkNfQkVHSU4sIFRSQUNFX0ZVTkNfRU5EIH0gZnJvbSAnLi90cmFjZS5qcyc7XG5cbnR5cGUgU2Vzc2lvbk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlNlc3Npb25PcHRpb25zO1xudHlwZSBSdW5PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5SdW5PcHRpb25zO1xudHlwZSBGZWVkc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLkZlZWRzVHlwZTtcbnR5cGUgRmV0Y2hlc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLkZldGNoZXNUeXBlO1xudHlwZSBSZXR1cm5UeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5SZXR1cm5UeXBlO1xuXG5leHBvcnQgY2xhc3MgSW5mZXJlbmNlU2Vzc2lvbiBpbXBsZW1lbnRzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2Uge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKGhhbmRsZXI6IEluZmVyZW5jZVNlc3Npb25IYW5kbGVyKSB7XG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgfVxuICBydW4oZmVlZHM6IEZlZWRzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBydW4oZmVlZHM6IEZlZWRzVHlwZSwgZmV0Y2hlczogRmV0Y2hlc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgYXN5bmMgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZSB8IFJ1bk9wdGlvbnMsIGFyZzI/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIGNvbnN0IGZldGNoZXM6IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGwgfSA9IHt9O1xuICAgIGxldCBvcHRpb25zOiBSdW5PcHRpb25zID0ge307XG4gICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgaWYgKHR5cGVvZiBmZWVkcyAhPT0gJ29iamVjdCcgfHwgZmVlZHMgPT09IG51bGwgfHwgZmVlZHMgaW5zdGFuY2VvZiBUZW5zb3IgfHwgQXJyYXkuaXNBcnJheShmZWVkcykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIFwiJ2ZlZWRzJyBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IHVzZSBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXCIsXG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCBpc0ZldGNoZXNFbXB0eSA9IHRydWU7XG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG92ZXJyaWRlIGlzIGJlaW5nIHVzZWRcbiAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoYXJnMSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChhcmcxIGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZmV0Y2hlcycgY2Fubm90IGJlIGEgVGVuc29yXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICBpZiAoYXJnMS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2ZldGNoZXMnIGNhbm5vdCBiZSBhbiBlbXB0eSBhcnJheS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgLy8gb3V0cHV0IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBhcmcxKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidmZXRjaGVzJyBtdXN0IGJlIGEgc3RyaW5nIGFycmF5IG9yIGFuIG9iamVjdC5cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLm91dHB1dE5hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2ZldGNoZXMnIGNvbnRhaW5zIGludmFsaWQgb3V0cHV0IG5hbWU6ICR7bmFtZX0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRlY2lkZSB3aGV0aGVyIGFyZzEgaXMgZmV0Y2hlcyBvciBvcHRpb25zXG4gICAgICAgIC8vIGlmIGFueSBvdXRwdXQgbmFtZSBpcyBwcmVzZW50IGFuZCBpdHMgdmFsdWUgaXMgdmFsaWQgT25ueFZhbHVlLCB3ZSBjb25zaWRlciBpdCBmZXRjaGVzXG4gICAgICAgIGxldCBpc0ZldGNoZXMgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgYXJnMUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmcxKTtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMub3V0cHV0TmFtZXMpIHtcbiAgICAgICAgICBpZiAoYXJnMUtleXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSAoYXJnMSBhcyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLk51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSlbbmFtZV07XG4gICAgICAgICAgICBpZiAodiA9PT0gbnVsbCB8fCB2IGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlcyA9IHRydWU7XG4gICAgICAgICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZldGNoZXMpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzEgYXMgUnVuT3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5leHBlY3RlZCBhcmd1bWVudFsxXTogbXVzdCBiZSAnZmV0Y2hlcycgb3IgJ29wdGlvbnMnLlwiKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBpZiBhbGwgaW5wdXRzIGFyZSBpbiBmZWVkXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMuaW5wdXROYW1lcykge1xuICAgICAgaWYgKHR5cGVvZiBmZWVkc1tuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCAnJHtuYW1lfScgaXMgbWlzc2luZyBpbiAnZmVlZHMnLmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIG5vIGZldGNoZXMgaXMgc3BlY2lmaWVkLCB3ZSB1c2UgdGhlIGZ1bGwgb3V0cHV0IG5hbWVzIGxpc3RcbiAgICBpZiAoaXNGZXRjaGVzRW1wdHkpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLm91dHB1dE5hbWVzKSB7XG4gICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZlZWRzLCBmZXRjaGVzIGFuZCBvcHRpb25zIGFyZSBwcmVwYXJlZFxuXG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuaGFuZGxlci5ydW4oZmVlZHMsIGZldGNoZXMsIG9wdGlvbnMpO1xuICAgIGNvbnN0IHJldHVyblZhbHVlOiB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfSA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3VsdHMpIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHRzLCBrZXkpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNba2V5XTtcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IG5ldyBUZW5zb3IocmVzdWx0LnR5cGUsIHJlc3VsdC5kYXRhLCByZXN1bHQuZGltcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICBhc3luYyByZWxlYXNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBjcmVhdGUoXG4gICAgYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsXG4gICAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICAgIGJ5dGVMZW5ndGg/OiBudW1iZXIsXG4gICAgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPjtcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShcbiAgICBhcmcwOiBzdHJpbmcgfCBBcnJheUJ1ZmZlckxpa2UgfCBVaW50OEFycmF5LFxuICAgIGFyZzE/OiBTZXNzaW9uT3B0aW9ucyB8IG51bWJlcixcbiAgICBhcmcyPzogbnVtYmVyLFxuICAgIGFyZzM/OiBTZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIC8vIGVpdGhlciBsb2FkIGZyb20gYSBmaWxlIG9yIGJ1ZmZlclxuICAgIGxldCBmaWxlUGF0aE9yVWludDhBcnJheTogc3RyaW5nIHwgVWludDhBcnJheTtcbiAgICBsZXQgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMgPSB7fTtcblxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXJnMCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBhcmcwIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcbiAgICAgICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGFyZzAgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcilcbiAgICApIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGFyZzA7XG4gICAgICBsZXQgYnl0ZU9mZnNldCA9IDA7XG4gICAgICBsZXQgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aDtcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0gYXJnMTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGJ5dGVPZmZzZXQgPSBhcmcxO1xuICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVPZmZzZXQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCInYnl0ZU9mZnNldCcgbXVzdCBiZSBhbiBpbnRlZ2VyLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYnl0ZU9mZnNldCA+PSBidWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZU9mZnNldCcgaXMgb3V0IG9mIHJhbmdlIFswLCAke2J1ZmZlci5ieXRlTGVuZ3RofSkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXQ7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBieXRlTGVuZ3RoID0gYXJnMjtcbiAgICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVMZW5ndGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIidieXRlTGVuZ3RoJyBtdXN0IGJlIGFuIGludGVnZXIuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYnl0ZUxlbmd0aCA8PSAwIHx8IGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoID4gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnYnl0ZUxlbmd0aCcgaXMgb3V0IG9mIHJhbmdlICgwLCAke2J1ZmZlci5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldH1dLmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzMgPT09ICdvYmplY3QnICYmIGFyZzMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmczO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidieXRlTGVuZ3RoJyBtdXN0IGJlIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICB9XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIGFyZ3VtZW50WzBdOiBtdXN0IGJlICdwYXRoJyBvciAnYnVmZmVyJy5cIik7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBiYWNrZW5kLCB1cGRhdGUgc2Vzc2lvbiBvcHRpb25zIHdpdGggdmFsaWRhdGVkIEVQcywgYW5kIGNyZWF0ZSBzZXNzaW9uIGhhbmRsZXJcbiAgICBjb25zdCBbYmFja2VuZCwgb3B0aW9uc1dpdGhWYWxpZGF0ZWRFUHNdID0gYXdhaXQgcmVzb2x2ZUJhY2tlbmRBbmRFeGVjdXRpb25Qcm92aWRlcnMob3B0aW9ucyk7XG4gICAgY29uc3QgaGFuZGxlciA9IGF3YWl0IGJhY2tlbmQuY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoZmlsZVBhdGhPclVpbnQ4QXJyYXksIG9wdGlvbnNXaXRoVmFsaWRhdGVkRVBzKTtcbiAgICBUUkFDRV9GVU5DX0VORCgpO1xuICAgIHJldHVybiBuZXcgSW5mZXJlbmNlU2Vzc2lvbihoYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlci5zdGFydFByb2ZpbGluZygpO1xuICB9XG4gIGVuZFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZXIuZW5kUHJvZmlsaW5nKCk7XG4gIH1cblxuICBnZXQgaW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE5hbWVzO1xuICB9XG4gIGdldCBvdXRwdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5vdXRwdXROYW1lcztcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlcjogSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbkltcGwgfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLWltcGwuanMnO1xuaW1wb3J0IHsgT25ueE1vZGVsT3B0aW9ucyB9IGZyb20gJy4vb25ueC1tb2RlbC5qcyc7XG5pbXBvcnQgeyBPbm54VmFsdWUsIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiB9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIEluZmVyZW5jZVNlc3Npb24ge1xuICAvLyAjcmVnaW9uIGlucHV0L291dHB1dCB0eXBlc1xuXG4gIHR5cGUgT25ueFZhbHVlTWFwVHlwZSA9IHsgcmVhZG9ubHkgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9O1xuICB0eXBlIE51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSA9IHsgcmVhZG9ubHkgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGwgfTtcblxuICAvKipcbiAgICogQSBmZWVkcyAobW9kZWwgaW5wdXRzKSBpcyBhbiBvYmplY3QgdGhhdCB1c2VzIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHR5cGUgRmVlZHNUeXBlID0gT25ueFZhbHVlTWFwVHlwZTtcblxuICAvKipcbiAgICogQSBmZXRjaGVzIChtb2RlbCBvdXRwdXRzKSBjb3VsZCBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZzpcbiAgICpcbiAgICogLSBPbWl0dGVkLiBVc2UgbW9kZWwncyBvdXRwdXQgbmFtZXMgZGVmaW5pdGlvbi5cbiAgICogLSBBbiBhcnJheSBvZiBzdHJpbmcgaW5kaWNhdGluZyB0aGUgb3V0cHV0IG5hbWVzLlxuICAgKiAtIEFuIG9iamVjdCB0aGF0IHVzZSBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIG9yIG51bGwgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqXG4gICAqIEByZW1hcmtcbiAgICogZGlmZmVyZW50IGZyb20gaW5wdXQgYXJndW1lbnQsIGluIG91dHB1dCwgT25ueFZhbHVlIGlzIG9wdGlvbmFsLiBJZiBhbiBPbm54VmFsdWUgaXMgcHJlc2VudCBpdCB3aWxsIGJlXG4gICAqIHVzZWQgYXMgYSBwcmUtYWxsb2NhdGVkIHZhbHVlIGJ5IHRoZSBpbmZlcmVuY2UgZW5naW5lOyBpZiBvbWl0dGVkLCBpbmZlcmVuY2UgZW5naW5lIHdpbGwgYWxsb2NhdGUgYnVmZmVyXG4gICAqIGludGVybmFsbHkuXG4gICAqL1xuICB0eXBlIEZldGNoZXNUeXBlID0gcmVhZG9ubHkgc3RyaW5nW10gfCBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLyoqXG4gICAqIEEgaW5mZXJlbmNpbmcgcmV0dXJuIHR5cGUgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgdHlwZSBSZXR1cm5UeXBlID0gT25ueFZhbHVlTWFwVHlwZTtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBzZXNzaW9uIG9wdGlvbnNcblxuICAvKipcbiAgICogQSBzZXQgb2YgY29uZmlndXJhdGlvbnMgZm9yIHNlc3Npb24gYmVoYXZpb3IuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIGV4dGVuZHMgT25ueE1vZGVsT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgZXhlY3V0aW9uIHByb3ZpZGVyIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBBbiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9uIGNhbiBiZSBhIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBuYW1lIG9mIHRoZSBleGVjdXRpb24gcHJvdmlkZXIsXG4gICAgICogb3IgYW4gb2JqZWN0IG9mIGNvcnJlc3BvbmRpbmcgdHlwZS5cbiAgICAgKi9cbiAgICBleGVjdXRpb25Qcm92aWRlcnM/OiByZWFkb25seSBFeGVjdXRpb25Qcm92aWRlckNvbmZpZ1tdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGludHJhIE9QIHRocmVhZHMgbnVtYmVyLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgaW50cmFPcE51bVRocmVhZHM/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50ZXIgT1AgdGhyZWFkcyBudW1iZXIuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICBpbnRlck9wTnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBmcmVlRGltZW5zaW9uT3ZlcnJpZGVzPzogeyByZWFkb25seSBbZGltZW5zaW9uTmFtZTogc3RyaW5nXTogbnVtYmVyIH07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3B0aW1pemF0aW9uIGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGdyYXBoT3B0aW1pemF0aW9uTGV2ZWw/OiAnZGlzYWJsZWQnIHwgJ2Jhc2ljJyB8ICdleHRlbmRlZCcgfCAnYWxsJztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIENQVSBtZW1vcnkgYXJlbmEuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlQ3B1TWVtQXJlbmE/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBlbmFibGUgbWVtb3J5IHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZW5hYmxlTWVtUGF0dGVybj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBleGVjdXRpb25Nb2RlPzogJ3NlcXVlbnRpYWwnIHwgJ3BhcmFsbGVsJztcblxuICAgIC8qKlxuICAgICAqIE9wdGltaXplZCBtb2RlbCBmaWxlIHBhdGguXG4gICAgICpcbiAgICAgKiBJZiB0aGlzIHNldHRpbmcgaXMgc3BlY2lmaWVkLCB0aGUgb3B0aW1pemVkIG1vZGVsIHdpbGwgYmUgZHVtcGVkLiBJbiBicm93c2VyLCBhIGJsb2Igd2lsbCBiZSBjcmVhdGVkXG4gICAgICogd2l0aCBhIHBvcC11cCB3aW5kb3cuXG4gICAgICovXG4gICAgb3B0aW1pemVkTW9kZWxGaWxlUGF0aD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIHByb2ZpbGluZy5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIGZ1dHVyZSB1c2UuXG4gICAgICovXG4gICAgZW5hYmxlUHJvZmlsaW5nPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEZpbGUgcHJlZml4IGZvciBwcm9maWxpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYSBwbGFjZWhvbGRlciBmb3IgYSBmdXR1cmUgdXNlLlxuICAgICAqL1xuICAgIHByb2ZpbGVGaWxlUHJlZml4Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIElELlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ0lkPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogTG9nIHNldmVyaXR5IGxldmVsLiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwIHwgMSB8IDIgfCAzIHwgNDtcblxuICAgIC8qKlxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgbG9nVmVyYm9zaXR5TGV2ZWw/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHN0cmluZyBhcyBhIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGZvciBhbGwgb3V0cHV0cywgb3IgYW4gb2JqZWN0IHRoYXQgdXNlIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBhXG4gICAgICogcHJlZmVycmVkIGRhdGEgbG9jYXRpb24gYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgV2ViIGZvciBXZWJHTCBhbmQgV2ViR1BVIEVQLlxuICAgICAqL1xuICAgIHByZWZlcnJlZE91dHB1dExvY2F0aW9uPzogT25ueFZhbHVlRGF0YUxvY2F0aW9uIHwgeyByZWFkb25seSBbb3V0cHV0TmFtZTogc3RyaW5nXTogT25ueFZhbHVlRGF0YUxvY2F0aW9uIH07XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBncmFwaCBjYXB0dXJlLlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSBXZWIgZm9yIFdlYkdQVSBFUC5cbiAgICAgKi9cbiAgICBlbmFibGVHcmFwaENhcHR1cmU/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogU3RvcmUgY29uZmlndXJhdGlvbnMgZm9yIGEgc2Vzc2lvbi4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Nlc3Npb24vXG4gICAgICogb25ueHJ1bnRpbWVfc2Vzc2lvbl9vcHRpb25zX2NvbmZpZ19rZXlzLmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBganNcbiAgICAgKiBleHRyYToge1xuICAgICAqICAgc2Vzc2lvbjoge1xuICAgICAqICAgICBzZXRfZGVub3JtYWxfYXNfemVybzogXCIxXCIsXG4gICAgICogICAgIGRpc2FibGVfcHJlcGFja2luZzogXCIxXCJcbiAgICAgKiAgIH0sXG4gICAgICogICBvcHRpbWl6YXRpb246IHtcbiAgICAgKiAgICAgZW5hYmxlX2dlbHVfYXBwcm94aW1hdGlvbjogXCIxXCJcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZXh0cmE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgfVxuXG4gIC8vICNyZWdpb24gZXhlY3V0aW9uIHByb3ZpZGVyc1xuXG4gIC8vIEN1cnJlbnRseSwgd2UgaGF2ZSB0aGUgZm9sbG93aW5nIGJhY2tlbmRzIHRvIHN1cHBvcnQgZXhlY3V0aW9uIHByb3ZpZGVyczpcbiAgLy8gQmFja2VuZCBOb2RlLmpzIGJpbmRpbmc6IHN1cHBvcnRzICdjcHUnLCAnZG1sJyAod2luMzIpLCAnY29yZW1sJyAobWFjT1MpIGFuZCAnY3VkYScgKGxpbnV4KS5cbiAgLy8gQmFja2VuZCBXZWJBc3NlbWJseTogc3VwcG9ydHMgJ2NwdScsICd3YXNtJywgJ3dlYmdwdScgYW5kICd3ZWJubicuXG4gIC8vIEJhY2tlbmQgT05OWC5qczogc3VwcG9ydHMgJ3dlYmdsJy5cbiAgLy8gQmFja2VuZCBSZWFjdCBOYXRpdmU6IHN1cHBvcnRzICdjcHUnLCAneG5ucGFjaycsICdjb3JlbWwnIChpT1MpLCAnbm5hcGknIChBbmRyb2lkKS5cbiAgaW50ZXJmYWNlIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwIHtcbiAgICBjb3JlbWw6IENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGNwdTogQ3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgY3VkYTogQ3VkYUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGRtbDogRG1sRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgbm5hcGk6IE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgdGVuc29ycnQ6IFRlbnNvclJ0RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2FzbTogV2ViQXNzZW1ibHlFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3ZWJnbDogV2ViR0xFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3ZWJncHU6IFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdlYm5uOiBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHFubjogUW5uRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgeG5ucGFjazogWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICB9XG5cbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlck5hbWUgPSBrZXlvZiBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcDtcbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlckNvbmZpZyA9XG4gICAgfCBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcFtFeGVjdXRpb25Qcm92aWRlck5hbWVdXG4gICAgfCBFeGVjdXRpb25Qcm92aWRlck9wdGlvblxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJOYW1lXG4gICAgfCBzdHJpbmc7XG5cbiAgZXhwb3J0IGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ2NwdSc7XG4gICAgdXNlQXJlbmE/OiBib29sZWFuO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3VkYUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjdWRhJztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIERtbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdkbWwnO1xuICAgIGRldmljZUlkPzogbnVtYmVyO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgVGVuc29yUnRFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAndGVuc29ycnQnO1xuICAgIGRldmljZUlkPzogbnVtYmVyO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViQXNzZW1ibHlFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2FzbSc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJnbCc7XG4gICAgLy8gVE9ETzogYWRkIGZsYWdzXG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBYbm5wYWNrRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3hubnBhY2snO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dlYmdwdSc7XG4gICAgcHJlZmVycmVkTGF5b3V0PzogJ05DSFcnIHwgJ05IV0MnO1xuICB9XG5cbiAgLy8gI3JlZ2lvbiBXZWJOTiBvcHRpb25zXG5cbiAgaW50ZXJmYWNlIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJubic7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBjcmVhdGluZyBhIFdlYk5OIE1MQ29udGV4dC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2Vibm4vI2RpY3RkZWYtbWxjb250ZXh0b3B0aW9uc1xuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTkNvbnRleHRPcHRpb25zIHtcbiAgICBkZXZpY2VUeXBlPzogJ2NwdScgfCAnZ3B1JyB8ICducHUnO1xuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2RlZmF1bHQnIHwgJ2xvdy1wb3dlcicgfCAnaGlnaC1wZXJmb3JtYW5jZSc7XG4gIH1cblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aG91dCBNTENvbnRleHQuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYk5OT3B0aW9uc1dpdGhvdXRNTENvbnRleHQgZXh0ZW5kcyBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSwgV2ViTk5Db250ZXh0T3B0aW9ucyB7XG4gICAgY29udGV4dD86IG5ldmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyIHdpdGggTUxDb250ZXh0LlxuICAgKlxuICAgKiBXaGVuIE1MQ29udGV4dCBpcyBwcm92aWRlZCwgdGhlIGRldmljZVR5cGUgaXMgYWxzbyByZXF1aXJlZCBzbyB0aGF0IHRoZSBXZWJOTiBFUCBjYW4gZGV0ZXJtaW5lIHRoZSBwcmVmZXJyZWRcbiAgICogY2hhbm5lbCBsYXlvdXQuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dFxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0XG4gICAgZXh0ZW5kcyBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSxcbiAgICAgIE9taXQ8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPixcbiAgICAgIFJlcXVpcmVkPFBpY2s8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPj4ge1xuICAgIGNvbnRleHQ6IHVua25vd24gLyogTUxDb250ZXh0ICovO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyIHdpdGggTUxDb250ZXh0IHdoaWNoIGlzIGNyZWF0ZWQgZnJvbSBHUFVEZXZpY2UuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dC1ncHVkZXZpY2VcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5PcHRpb25zV2ViR3B1IGV4dGVuZHMgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUge1xuICAgIGNvbnRleHQ6IHVua25vd24gLyogTUxDb250ZXh0ICovO1xuICAgIGdwdURldmljZTogdW5rbm93biAvKiBHUFVEZXZpY2UgKi87XG4gIH1cblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyLlxuICAgKi9cbiAgZXhwb3J0IHR5cGUgV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbiA9XG4gICAgfCBXZWJOTk9wdGlvbnNXaXRob3V0TUxDb250ZXh0XG4gICAgfCBXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0XG4gICAgfCBXZWJOTk9wdGlvbnNXZWJHcHU7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgUW5uRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3Fubic7XG4gICAgLy8gVE9ETyBhZGQgZmxhZ3NcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjb3JlbWwnO1xuICAgIC8qKlxuICAgICAqIFRoZSBiaXQgZmxhZ3MgZm9yIENvcmVNTCBleGVjdXRpb24gcHJvdmlkZXIuXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBDT1JFTUxfRkxBR19VU0VfQ1BVX09OTFkgPSAweDAwMVxuICAgICAqIENPUkVNTF9GTEFHX0VOQUJMRV9PTl9TVUJHUkFQSCA9IDB4MDAyXG4gICAgICogQ09SRU1MX0ZMQUdfT05MWV9FTkFCTEVfREVWSUNFX1dJVEhfQU5FID0gMHgwMDRcbiAgICAgKiBDT1JFTUxfRkxBR19PTkxZX0FMTE9XX1NUQVRJQ19JTlBVVF9TSEFQRVMgPSAweDAwOFxuICAgICAqIENPUkVNTF9GTEFHX0NSRUFURV9NTFBST0dSQU0gPSAweDAxMFxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogU2VlIGluY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9wcm92aWRlcnMvY29yZW1sL2NvcmVtbF9wcm92aWRlcl9mYWN0b3J5LmggZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIFRoaXMgZmxhZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nKS5cbiAgICAgKi9cbiAgICBjb3JlTWxGbGFncz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHdoZXRoZXIgdG8gdXNlIENQVSBvbmx5IGluIENvcmVNTCBFUC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAocmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICB1c2VDUFVPbmx5PzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHdoZXRoZXIgdG8gZW5hYmxlIENvcmVNTCBFUCBvbiBzdWJncmFwaC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAocmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICBlbmFibGVPblN1YmdyYXBoPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHdoZXRoZXIgdG8gb25seSBlbmFibGUgQ29yZU1MIEVQIGZvciBBcHBsZSBkZXZpY2VzIHdpdGggQU5FIChBcHBsZSBOZXVyYWwgRW5naW5lKS5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAocmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICBvbmx5RW5hYmxlRGV2aWNlV2l0aEFORT86IGJvb2xlYW47XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBObmFwaUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdubmFwaSc7XG4gICAgdXNlRlAxNj86IGJvb2xlYW47XG4gICAgdXNlTkNIVz86IGJvb2xlYW47XG4gICAgY3B1RGlzYWJsZWQ/OiBib29sZWFuO1xuICAgIGNwdU9ubHk/OiBib29sZWFuO1xuICB9XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBydW4gb3B0aW9uc1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBjb25maWd1cmF0aW9ucyBmb3IgaW5mZXJlbmNlIHJ1biBiZWhhdmlvclxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBSdW5PcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBMb2cgc2V2ZXJpdHkgbGV2ZWwuIFNlZVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9jb21tb24vbG9nZ2luZy9zZXZlcml0eS5oXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgbG9nU2V2ZXJpdHlMZXZlbD86IDAgfCAxIHwgMiB8IDMgfCA0O1xuXG4gICAgLyoqXG4gICAgICogTG9nIHZlcmJvc2l0eSBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKi9cbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRlcm1pbmF0ZSBhbGwgaW5jb21wbGV0ZSBPcnRSdW4gY2FsbHMgYXMgc29vbiBhcyBwb3NzaWJsZSBpZiB0cnVlXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICovXG4gICAgdGVybWluYXRlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEEgdGFnIGZvciB0aGUgUnVuKCkgY2FsbHMgdXNpbmcgdGhpc1xuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIHRhZz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNldCBhIHNpbmdsZSBydW4gY29uZmlndXJhdGlvbiBlbnRyeS4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL3Nlc3Npb24vXG4gICAgICogb25ueHJ1bnRpbWVfcnVuX29wdGlvbnNfY29uZmlnX2tleXMuaFxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogZXh0cmE6IHtcbiAgICAgKiAgIG1lbW9yeToge1xuICAgICAqICAgICBlbmFibGVfbWVtb3J5X2FyZW5hX3Nocmlua2FnZTogXCIxXCIsXG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGV4dHJhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiB2YWx1ZSBtZXRhZGF0YVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlXG4gIGludGVyZmFjZSBWYWx1ZU1ldGFkYXRhIHtcbiAgICAvLyBUQkRcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBydW50aW1lIGluc3RhbmNlIG9mIGFuIE9OTlggbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbiB7XG4gIC8vICNyZWdpb24gcnVuKClcblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1bihmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgdGhlIG1vZGVsIGFzeW5jaHJvbm91c2x5IHdpdGggdGhlIGdpdmVuIGZlZWRzLCBmZXRjaGVzIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLklucHV0VHlwZWAgZm9yIGRldGFpbC5cbiAgICogQHBhcmFtIGZldGNoZXMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgb3V0cHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5PdXRwdXRUeXBlYCBmb3JcbiAgICogZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1bihcbiAgICBmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsXG4gICAgZmV0Y2hlczogSW5mZXJlbmNlU2Vzc2lvbi5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcmVsZWFzZSgpXG5cbiAgLyoqXG4gICAqIFJlbGVhc2UgdGhlIGluZmVyZW5jZSBzZXNzaW9uIGFuZCB0aGUgdW5kZXJseWluZyByZXNvdXJjZXMuXG4gICAqL1xuICByZWxlYXNlKCk6IFByb21pc2U8dm9pZD47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHJvZmlsaW5nXG5cbiAgLyoqXG4gICAqIFN0YXJ0IHByb2ZpbGluZy5cbiAgICovXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEVuZCBwcm9maWxpbmcuXG4gICAqL1xuICBlbmRQcm9maWxpbmcoKTogdm9pZDtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBtZXRhZGF0YVxuXG4gIC8qKlxuICAgKiBHZXQgaW5wdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgICovXG4gIHJlYWRvbmx5IGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBHZXQgb3V0cHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSBvdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLy8gLyoqXG4gIC8vICAqIEdldCBpbnB1dCBtZXRhZGF0YSBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAvLyAgKi9cbiAgLy8gcmVhZG9ubHkgaW5wdXRNZXRhZGF0YTogUmVhZG9ubHlBcnJheTxSZWFkb25seTxJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGE+PjtcblxuICAvLyAvKipcbiAgLy8gICogR2V0IG91dHB1dCBtZXRhZGF0YSBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAvLyAgKi9cbiAgLy8gcmVhZG9ubHkgb3V0cHV0TWV0YWRhdGE6IFJlYWRvbmx5QXJyYXk8UmVhZG9ubHk8SW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhPj47XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZmVyZW5jZVNlc3Npb25GYWN0b3J5IHtcbiAgLy8gI3JlZ2lvbiBjcmVhdGUoKVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24gYW5kIGxvYWQgbW9kZWwgYXN5bmNocm9ub3VzbHkgZnJvbSBhbiBPTk5YIG1vZGVsIGZpbGUuXG4gICAqXG4gICAqIEBwYXJhbSB1cmkgLSBUaGUgVVJJIG9yIGZpbGUgcGF0aCBvZiB0aGUgbW9kZWwgdG8gbG9hZC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cbiAgICovXG4gIGNyZWF0ZSh1cmk6IHN0cmluZywgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24gYW5kIGxvYWQgbW9kZWwgYXN5bmNocm9ub3VzbHkgZnJvbSBhbiBhcnJheSBidWZlci5cbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciAtIEFuIEFycmF5QnVmZmVyIHJlcHJlc2VudGF0aW9uIG9mIGFuIE9OTlggbW9kZWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXG4gICAqL1xuICBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gc2VnbWVudCBvZiBhbiBhcnJheSBidWZlci5cbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciAtIEFuIEFycmF5QnVmZmVyIHJlcHJlc2VudGF0aW9uIG9mIGFuIE9OTlggbW9kZWwuXG4gICAqIEBwYXJhbSBieXRlT2Zmc2V0IC0gVGhlIGJlZ2lubmluZyBvZiB0aGUgc3BlY2lmaWVkIHBvcnRpb24gb2YgdGhlIGFycmF5IGJ1ZmZlci5cbiAgICogQHBhcmFtIGJ5dGVMZW5ndGggLSBUaGUgbGVuZ3RoIGluIGJ5dGVzIG9mIHRoZSBhcnJheSBidWZmZXIuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXG4gICAqL1xuICBjcmVhdGUoXG4gICAgYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsXG4gICAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICAgIGJ5dGVMZW5ndGg/OiBudW1iZXIsXG4gICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGEgVWludDhBcnJheS5cbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciAtIEEgVWludDhBcnJheSByZXByZXNlbnRhdGlvbiBvZiBhbiBPTk5YIG1vZGVsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IEluZmVyZW5jZVNlc3Npb246IEluZmVyZW5jZVNlc3Npb25GYWN0b3J5ID0gSW5mZXJlbmNlU2Vzc2lvbkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycywgT3B0aW9uc1RlbnNvckxheW91dCB9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvclRvRGF0YVVybE9wdGlvbnMgZXh0ZW5kcyBPcHRpb25zVGVuc29yTGF5b3V0LCBPcHRpb25zRm9ybWF0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMgZXh0ZW5kcyBPcHRpb25zVGVuc29yTGF5b3V0LCBPcHRpb25zRm9ybWF0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cblxuZXhwb3J0IGludGVyZmFjZSBDb252ZXJzaW9uVXRpbHMge1xuICAvKipcbiAgICogY3JlYXRlcyBhIERhdGFVUkwgaW5zdGFuY2UgZnJvbSB0ZW5zb3JcbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgRGF0YVVSTCBpbnN0YW5jZSBmcm9tIHRoZSB0ZW5zb3IuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYGZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogQHJldHVybnMgYSBEYXRhVVJMIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGltYWdlIGNvbnZlcnRlZCBmcm9tIHRlbnNvciBkYXRhXG4gICAqL1xuICB0b0RhdGFVUkwob3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIGNyZWF0ZXMgYW4gSW1hZ2VEYXRhIGluc3RhbmNlIGZyb20gdGVuc29yXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyBhbiBJbWFnZURhdGEgaW5zdGFuY2UgZnJvbSB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGBmb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIEByZXR1cm5zIGFuIEltYWdlRGF0YSBpbnN0YW5jZSByZXByZXNlbnRpbmcgdGhlIGltYWdlIGNvbnZlcnRlZCBmcm9tIHRlbnNvciBkYXRhXG4gICAqL1xuICB0b0ltYWdlRGF0YShvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhO1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IsIFR5cGVkVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG5leHBvcnQgdHlwZSBJbWFnZUZvcm1hdCA9ICdSR0InIHwgJ1JHQkEnIHwgJ0JHUicgfCAnUkJHJztcbmV4cG9ydCB0eXBlIEltYWdlVGVuc29yTGF5b3V0ID0gJ05IV0MnIHwgJ05DSFcnO1xuXG4vLyB0aGUgZm9sbG93aW5nIHJlZ2lvbiBjb250YWlucyB0eXBlIGRlZmluaXRpb25zIGZvciBjb25zdHJ1Y3RpbmcgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvbi5cblxuLy8gI3JlZ2lvbiB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvblxuXG4vKipcbiAqIHJlcHJlc2VudCBjb21tb24gcHJvcGVydGllcyBvZiB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHNwZWNpZmljIGxvY2F0aW9uLlxuICovXG5pbnRlcmZhY2UgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IGV4dGVuZHMgUGljazxUZW5zb3IsICdkaW1zJz4ge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSB0eXBlOiBUO1xufVxuXG4vKipcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIEdQVSByZXNvdXJjZS5cbiAqL1xuaW50ZXJmYWNlIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xuICAvKipcbiAgICogYW4gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZG93bmxvYWQgZGF0YSBmcm9tIEdQVSB0byBDUFUuXG4gICAqXG4gICAqIElmIG5vdCBwcm92aWRlZCwgdGhlIHRlbnNvciB0cmVhdCB0aGUgR1BVIGRhdGEgYXMgZXh0ZXJuYWwgcmVzb3VyY2UuXG4gICAqL1xuICBkb3dubG9hZD8oKTogUHJvbWlzZTxUZW5zb3IuRGF0YVR5cGVNYXBbVF0+O1xuXG4gIC8qKlxuICAgKiBhbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHRlbnNvciBpcyBkaXNwb3NlZC5cbiAgICpcbiAgICogSWYgbm90IHByb3ZpZGVkLCB0aGUgdGVuc29yIHRyZWF0IHRoZSBHUFUgZGF0YSBhcyBleHRlcm5hbCByZXNvdXJjZS5cbiAgICovXG4gIGRpc3Bvc2U/KCk6IHZvaWQ7XG59XG5cbi8qKlxuICogcmVwcmVzZW50IHRoZSBwYXJhbWV0ZXIgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgcGlubmVkIENQVSBidWZmZXJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VCBleHRlbmRzIFRlbnNvci5DcHVQaW5uZWREYXRhVHlwZXMgPSBUZW5zb3IuQ3B1UGlubmVkRGF0YVR5cGVzPlxuICBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAnY3B1LXBpbm5lZCcuXG4gICAqL1xuICByZWFkb25seSBsb2NhdGlvbjogJ2NwdS1waW5uZWQnO1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgQ1BVIHBpbm5lZCBidWZmZXIgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF07XG59XG5cbi8qKlxuICogcmVwcmVzZW50IHRoZSBwYXJhbWV0ZXIgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViR0wgdGV4dHVyZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VCBleHRlbmRzIFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzID0gVGVuc29yLlRleHR1cmVEYXRhVHlwZXM+XG4gIGV4dGVuZHMgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+LFxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICd0ZXh0dXJlJy5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAndGV4dHVyZSc7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBXZWJHTCB0ZXh0dXJlIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKi9cbiAgcmVhZG9ubHkgdGV4dHVyZTogVGVuc29yLlRleHR1cmVUeXBlO1xufVxuXG4vKipcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VCBleHRlbmRzIFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXMgPSBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzPlxuICBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPixcbiAgICBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAnZ3B1LWJ1ZmZlcicuXG4gICAqL1xuICByZWFkb25seSBsb2NhdGlvbjogJ2dwdS1idWZmZXInO1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgV2ViR1BVIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICovXG4gIHJlYWRvbmx5IGdwdUJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGU7XG59XG5cbi8vICNlbmRyZWdpb25cblxuLy8gdGhlIGZvbGxvd2luZyByZWdpb24gY29udGFpbnMgdHlwZSBkZWZpbml0aW9ucyBvZiBlYWNoIGluZGl2aWR1YWwgb3B0aW9ucy5cbi8vIHRoZSB0ZW5zb3IgZmFjdG9yeSBmdW5jdGlvbnMgdXNlIGEgY29tcG9zaXRpb24gb2YgdGhvc2Ugb3B0aW9ucyBhcyB0aGUgcGFyYW1ldGVyIHR5cGUuXG5cbi8vICNyZWdpb24gT3B0aW9ucyBmaWVsZHNcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zRm9ybWF0IHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgaW1hZ2UgZm9ybWF0IHJlcHJlc2VudGVkIGluIFJHQkEgY29sb3Igc3BhY2UuXG4gICAqL1xuICBmb3JtYXQ/OiBJbWFnZUZvcm1hdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zVGVuc29yRm9ybWF0IHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgaW1hZ2UgZm9ybWF0IG9mIHRoZSB0ZW5zb3IuXG4gICAqXG4gICAqIE5PVEU6IHRoaXMgaXMgZGlmZmVyZW50IGZyb20gb3B0aW9uICdmb3JtYXQnLiBXaGlsZSBvcHRpb24gJ2Zvcm1hdCcgcmVwcmVzZW50cyB0aGUgb3JpZ2luYWwgaW1hZ2UsICd0ZW5zb3JGb3JtYXQnXG4gICAqIHJlcHJlc2VudHMgdGhlIHRhcmdldCBmb3JtYXQgb2YgdGhlIHRlbnNvci4gQSB0cmFuc3Bvc2Ugd2lsbCBiZSBwZXJmb3JtZWQgaWYgdGhleSBhcmUgZGlmZmVyZW50LlxuICAgKi9cbiAgdGVuc29yRm9ybWF0PzogSW1hZ2VGb3JtYXQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc1RlbnNvckRhdGFUeXBlIHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICBkYXRhVHlwZT86ICdmbG9hdDMyJyB8ICd1aW50OCc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc1RlbnNvckxheW91dCB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIHRlbnNvciBsYXlvdXQgd2hlbiByZXByZXNlbnRpbmcgZGF0YSBvZiBvbmUgb3IgbW9yZSBpbWFnZShzKS5cbiAgICovXG4gIHRlbnNvckxheW91dD86IEltYWdlVGVuc29yTGF5b3V0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNEaW1lbnNpb25zIHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgaW1hZ2UgaGVpZ2h0IGluIHBpeGVsXG4gICAqL1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIHdpZHRoIGluIHBpeGVsXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25SZXNpemVkRGltZW5zaW9ucyB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIHJlc2l6ZWQgaGVpZ2h0LiBJZiBvbWl0dGVkLCBvcmlnaW5hbCBoZWlnaHQgd2lsbCBiZSB1c2VkLlxuICAgKi9cbiAgcmVzaXplZEhlaWdodD86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyByZXNpemVkIHdpZHRoIC0gY2FuIGJlIGFjY2Vzc2VkIHZpYSB0ZW5zb3IgZGltZW5zaW9ucyBhcyB3ZWxsXG4gICAqL1xuICByZXNpemVkV2lkdGg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyBub3JtYWxpemF0aW9uIHBhcmFtZXRlcnMgd2hlbiBwcmVwcm9jZXNzaW5nIHRoZSBpbWFnZSBhcyBtb2RlbCBpbnB1dC5cbiAgICpcbiAgICogRGF0YSBlbGVtZW50IGFyZSByYW5nZWQgZnJvbSAwIHRvIDI1NS5cbiAgICovXG4gIG5vcm0/OiB7XG4gICAgLyoqXG4gICAgICogVGhlICdiaWFzJyB2YWx1ZSBmb3IgaW1hZ2Ugbm9ybWFsaXphdGlvbi5cbiAgICAgKiAtIElmIG9taXR0ZWQsIHVzZSBkZWZhdWx0IHZhbHVlIDAuXG4gICAgICogLSBJZiBpdCdzIGEgc2luZ2xlIG51bWJlciwgYXBwbHkgdG8gZWFjaCBjaGFubmVsXG4gICAgICogLSBJZiBpdCdzIGFuIGFycmF5IG9mIDMgb3IgNCBudW1iZXJzLCBhcHBseSBlbGVtZW50LXdpc2UuIE51bWJlciBvZiBlbGVtZW50cyBuZWVkIHRvIG1hdGNoIHRoZSBudW1iZXIgb2YgY2hhbm5lbHNcbiAgICAgKiBmb3IgdGhlIGNvcnJlc3BvbmRpbmcgaW1hZ2UgZm9ybWF0XG4gICAgICovXG4gICAgYmlhcz86IG51bWJlciB8IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIC8qKlxuICAgICAqIFRoZSAnbWVhbicgdmFsdWUgZm9yIGltYWdlIG5vcm1hbGl6YXRpb24uXG4gICAgICogLSBJZiBvbWl0dGVkLCB1c2UgZGVmYXVsdCB2YWx1ZSAyNTUuXG4gICAgICogLSBJZiBpdCdzIGEgc2luZ2xlIG51bWJlciwgYXBwbHkgdG8gZWFjaCBjaGFubmVsXG4gICAgICogLSBJZiBpdCdzIGFuIGFycmF5IG9mIDMgb3IgNCBudW1iZXJzLCBhcHBseSBlbGVtZW50LXdpc2UuIE51bWJlciBvZiBlbGVtZW50cyBuZWVkIHRvIG1hdGNoIHRoZSBudW1iZXIgb2YgY2hhbm5lbHNcbiAgICAgKiBmb3IgdGhlIGNvcnJlc3BvbmRpbmcgaW1hZ2UgZm9ybWF0XG4gICAgICovXG4gICAgbWVhbj86IG51bWJlciB8IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICB9O1xufVxuXG4vLyAjZW5kcmVnaW9uXG5cbi8vICNyZWdpb24gT3B0aW9ucyBjb21wb3NpdGlvblxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zXG4gIGV4dGVuZHMgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXG4gICAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcbiAgICBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9uc1xuICBleHRlbmRzIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQsXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsXG4gICAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbVVybE9wdGlvbnNcbiAgZXh0ZW5kcyBPcHRpb25zRGltZW5zaW9ucyxcbiAgICBPcHRpb25SZXNpemVkRGltZW5zaW9ucyxcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0LFxuICAgIE9wdGlvbnNUZW5zb3JMYXlvdXQsXG4gICAgT3B0aW9uc1RlbnNvckRhdGFUeXBlLFxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnNcbiAgZXh0ZW5kcyBPcHRpb25SZXNpemVkRGltZW5zaW9ucyxcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0LFxuICAgIE9wdGlvbnNUZW5zb3JMYXlvdXQsXG4gICAgT3B0aW9uc1RlbnNvckRhdGFUeXBlLFxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLlRleHR1cmVEYXRhVHlwZXM+XG4gIGV4dGVuZHMgUmVxdWlyZWQ8T3B0aW9uc0RpbWVuc2lvbnM+LFxuICAgIE9wdGlvbnNGb3JtYXQsXG4gICAgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4gLyogVE9ETzogYWRkIG1vcmUgKi8ge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz5cbiAgZXh0ZW5kcyBQaWNrPFRlbnNvciwgJ2RpbXMnPixcbiAgICBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XG4gIC8qKlxuICAgKiBEZXNjcmliZXMgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgZGF0YVR5cGU/OiBUO1xufVxuXG4vLyAjZW5kcmVnaW9uXG5cbi8qKlxuICogdHlwZSBUZW5zb3JGYWN0b3J5IGRlZmluZXMgdGhlIGZhY3RvcnkgZnVuY3Rpb25zIG9mICdUZW5zb3InIHRvIGNyZWF0ZSB0ZW5zb3IgaW5zdGFuY2VzIGZyb20gZXhpc3RpbmcgZGF0YSBvclxuICogcmVzb3VyY2VzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZhY3Rvcnkge1xuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYW4gSW1hZ2VEYXRhIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2VEYXRhIC0gdGhlIEltYWdlRGF0YSBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBJbWFnZURhdGEuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21JbWFnZShcbiAgICBpbWFnZURhdGE6IEltYWdlRGF0YSxcbiAgICBvcHRpb25zPzogVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsXG4gICk6IFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+PjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBIVE1MSW1hZ2VFbGVtZW50IG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2VFbGVtZW50IC0gdGhlIEhUTUxJbWFnZUVsZW1lbnQgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gSFRNTEltYWdlRWxlbWVudC5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbUltYWdlKFxuICAgIGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCxcbiAgICBvcHRpb25zPzogVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMsXG4gICk6IFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+PjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gVVJMXG4gICAqXG4gICAqIEBwYXJhbSB1cmxTb3VyY2UgLSBhIHN0cmluZyBhcyBhIFVSTCB0byB0aGUgaW1hZ2Ugb3IgYSBkYXRhIFVSTCBjb250YWluaW5nIHRoZSBpbWFnZSBkYXRhLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gVVJMLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIC0gYGRhdGFUeXBlYDogYCdmbG9hdDMyJ2BcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tSW1hZ2UodXJsU291cmNlOiBzdHJpbmcsIG9wdGlvbnM/OiBUZW5zb3JGcm9tVXJsT3B0aW9ucyk6IFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+PjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYW4gSW1hZ2VCaXRtYXAgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBiaXRtYXAgLSB0aGUgSW1hZ2VCaXRtYXAgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gVVJMLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIC0gYGRhdGFUeXBlYDogYCdmbG9hdDMyJ2BcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tSW1hZ2UoXG4gICAgYml0bWFwOiBJbWFnZUJpdG1hcCxcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zLFxuICApOiBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz4gfCBUeXBlZFRlbnNvcjwndWludDgnPj47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgV2ViR0wgdGV4dHVyZVxuICAgKlxuICAgKiBAcGFyYW0gdGV4dHVyZSAtIHRoZSBXZWJHTFRleHR1cmUgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gV2ViR0wgdGV4dHVyZS5cbiAgICpcbiAgICogVGhlIG9wdGlvbnMgaW5jbHVkZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICogLSBgd2lkdGhgOiB0aGUgd2lkdGggb2YgdGhlIHRleHR1cmUuIFJlcXVpcmVkLlxuICAgKiAtIGBoZWlnaHRgOiB0aGUgaGVpZ2h0IG9mIHRoZSB0ZXh0dXJlLiBSZXF1aXJlZC5cbiAgICogLSBgZm9ybWF0YDogdGhlIGZvcm1hdCBvZiB0aGUgdGV4dHVyZS4gSWYgb21pdHRlZCwgYXNzdW1lICdSR0JBJy5cbiAgICogLSBgZG93bmxvYWRgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkb3dubG9hZCB0aGUgdGVuc29yIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGFcbiAgICogd2lsbCBub3QgYmUgYWJsZSB0byBkb3dubG9hZC4gVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0XG4gICAqIG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKiAtIGBkaXNwb3NlYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdGVuc29yIGRhdGEgb24gR1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGEgd2lsbCBub3QgYmUgZGlzcG9zZWQuXG4gICAqIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndCBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tVGV4dHVyZTxUIGV4dGVuZHMgVGVuc29yLlRleHR1cmVEYXRhVHlwZXMgPSAnZmxvYXQzMic+KFxuICAgIHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZSxcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VD4sXG4gICk6IFR5cGVkVGVuc29yPCdmbG9hdDMyJz47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgV2ViR1BVIGJ1ZmZlclxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gdGhlIEdQVUJ1ZmZlciBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBXZWJHUFUgYnVmZmVyLlxuICAgKlxuICAgKiBUaGUgb3B0aW9ucyBpbmNsdWRlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgKiAtIGBkYXRhVHlwZWA6IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYXNzdW1lICdmbG9hdDMyJy5cbiAgICogLSBgZGltc2A6IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gUmVxdWlyZWQuXG4gICAqIC0gYGRvd25sb2FkYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZG93bmxvYWQgdGhlIHRlbnNvciBkYXRhIGZyb20gR1BVIHRvIENQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhXG4gICAqIHdpbGwgbm90IGJlIGFibGUgdG8gZG93bmxvYWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndFxuICAgKiBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICogLSBgZGlzcG9zZWA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3Bvc2UgdGhlIHRlbnNvciBkYXRhIG9uIEdQVS4gSWYgb21pdHRlZCwgdGhlIEdQVSBkYXRhIHdpbGwgbm90IGJlIGRpc3Bvc2VkLlxuICAgKiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3QgbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbUdwdUJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gICAgYnVmZmVyOiBUZW5zb3IuR3B1QnVmZmVyVHlwZSxcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPixcbiAgKTogVHlwZWRUZW5zb3I8VD47XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgcHJlLWFsbG9jYXRlZCBidWZmZXIuIFRoZSBidWZmZXIgd2lsbCBiZSB1c2VkIGFzIGEgcGlubmVkIGJ1ZmZlci5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSB0aGUgdGVuc29yIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGJ1ZmZlciAtIGEgVHlwZWRBcnJheSBjb3JyZXNwb25kaW5nIHRvIHRoZSB0eXBlLlxuICAgKiBAcGFyYW0gZGltcyAtIHNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICpcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tUGlubmVkQnVmZmVyPFQgZXh0ZW5kcyBFeGNsdWRlPFRlbnNvci5UeXBlLCAnc3RyaW5nJz4+KFxuICAgIHR5cGU6IFQsXG4gICAgYnVmZmVyOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF0sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUeXBlZFRlbnNvcjxUPjtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLyoqXG4gKiBBIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYSBmaWxlJ3MgVVJMIG9yIHBhdGguXG4gKlxuICogUGF0aCBpcyB2YWlsYWJsZSBvbmx5IGluIG9ubnhydW50aW1lLW5vZGUgb3Igb25ueHJ1bnRpbWUtd2ViIHJ1bm5pbmcgaW4gTm9kZS5qcy5cbiAqL1xuZXhwb3J0IHR5cGUgRmlsZVVybE9yUGF0aCA9IHN0cmluZztcblxuLyoqXG4gKiBBIEJsb2Igb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGZpbGUuXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVCbG9iID0gQmxvYjtcblxuLyoqXG4gKiBBIFVpbnQ4QXJyYXksIEFycmF5QnVmZmVyIG9yIFNoYXJlZEFycmF5QnVmZmVyIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmaWxlIGNvbnRlbnQuXG4gKlxuICogV2hlbiBpdCBpcyBhbiBBcnJheUJ1ZmZlciBvciBTaGFyZWRBcnJheUJ1ZmZlciwgdGhlIHdob2xlIGJ1ZmZlciBpcyBhc3N1bWVkIHRvIGJlIHRoZSBmaWxlIGNvbnRlbnQuXG4gKi9cbmV4cG9ydCB0eXBlIEZpbGVEYXRhID0gVWludDhBcnJheSB8IEFycmF5QnVmZmVyTGlrZTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZmlsZSB0aGF0IGNhbiBiZSBsb2FkZWQgYnkgdGhlIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSS5cbiAqL1xuZXhwb3J0IHR5cGUgRmlsZVR5cGUgPSBGaWxlVXJsT3JQYXRoIHwgRmlsZUJsb2IgfCBGaWxlRGF0YTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGV4dGVybmFsIGRhdGEgZmlsZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeHRlcm5hbERhdGFGaWxlRGVzY3JpcHRpb24ge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgZXh0ZXJuYWwgZGF0YSBmaWxlLlxuICAgKi9cbiAgZGF0YTogRmlsZVR5cGU7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBmaWxlIHBhdGguXG4gICAqL1xuICBwYXRoOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBleHRlcm5hbCBkYXRhIGZpbGUuXG4gKlxuICogV2hlbiB1c2luZyBhIHN0cmluZywgaXQgc2hvdWxkIGJlIGEgZmlsZSBVUkwgb3IgcGF0aCB0aGF0IGluIHRoZSBzYW1lIGRpcmVjdG9yeSBhcyB0aGUgbW9kZWwgZmlsZS5cbiAqL1xuZXhwb3J0IHR5cGUgRXh0ZXJuYWxEYXRhRmlsZVR5cGUgPSBFeHRlcm5hbERhdGFGaWxlRGVzY3JpcHRpb24gfCBGaWxlVXJsT3JQYXRoO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIG1vZGVsIGxvYWRpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT25ueE1vZGVsT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5aW5nIGEgbGlzdCBvZiBmaWxlcyB0aGF0IHJlcHJlc2VudHMgdGhlIGV4dGVybmFsIGRhdGEuXG4gICAqL1xuICBleHRlcm5hbERhdGE/OiByZWFkb25seSBFeHRlcm5hbERhdGFGaWxlVHlwZVtdO1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmV4cG9ydCB0eXBlIE5vblRlbnNvclR5cGUgPSBuZXZlcjtcblxuLyoqXG4gKiBUeXBlIE9ubnhWYWx1ZSBSZXByZXNlbnRzIGJvdGggdGVuc29ycyBhbmQgbm9uLXRlbnNvcnMgdmFsdWUgZm9yIG1vZGVsJ3MgaW5wdXRzL291dHB1dHMuXG4gKlxuICogTk9URTogY3VycmVudGx5IG5vdCBzdXBwb3J0IG5vbi10ZW5zb3JcbiAqL1xuZXhwb3J0IHR5cGUgT25ueFZhbHVlID0gVGVuc29yIHwgTm9uVGVuc29yVHlwZTtcblxuLyoqXG4gKiBUeXBlIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiByZXByZXNlbnRzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSBvZiBhbiBPbm54VmFsdWUuXG4gKi9cbmV4cG9ydCB0eXBlIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiA9IFRlbnNvci5EYXRhTG9jYXRpb247XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzIH0gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xuaW1wb3J0IHsgU2Vzc2lvbkhhbmRsZXIsIFRyYWluaW5nU2Vzc2lvbkhhbmRsZXIgfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQgeyBPbm54VmFsdWUgfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuaW1wb3J0IHsgVHJhaW5pbmdTZXNzaW9uIGFzIFRyYWluaW5nU2Vzc2lvbkludGVyZmFjZSwgVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9ucyB9IGZyb20gJy4vdHJhaW5pbmctc2Vzc2lvbi5qcyc7XG5cbnR5cGUgU2Vzc2lvbk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zO1xudHlwZSBGZWVkc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZTtcbnR5cGUgRmV0Y2hlc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlO1xudHlwZSBSZXR1cm5UeXBlID0gSW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlO1xudHlwZSBSdW5PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zO1xuXG5jb25zdCBub0JhY2tlbmRFcnJNc2c6IHN0cmluZyA9XG4gICdUcmFpbmluZyBiYWNrZW5kIGNvdWxkIG5vdCBiZSByZXNvbHZlZC4gJyArIFwiTWFrZSBzdXJlIHlvdSdyZSB1c2luZyB0aGUgY29ycmVjdCBjb25maWd1cmF0aW9uICYgV2ViQXNzZW1ibHkgZmlsZXMuXCI7XG5cbmV4cG9ydCBjbGFzcyBUcmFpbmluZ1Nlc3Npb24gaW1wbGVtZW50cyBUcmFpbmluZ1Nlc3Npb25JbnRlcmZhY2Uge1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKGhhbmRsZXI6IFRyYWluaW5nU2Vzc2lvbkhhbmRsZXIsIGhhc09wdGltaXplck1vZGVsOiBib29sZWFuLCBoYXNFdmFsTW9kZWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgIHRoaXMuaGFzT3B0aW1pemVyTW9kZWwgPSBoYXNPcHRpbWl6ZXJNb2RlbDtcbiAgICB0aGlzLmhhc0V2YWxNb2RlbCA9IGhhc0V2YWxNb2RlbDtcbiAgfVxuICBwcml2YXRlIGhhbmRsZXI6IFRyYWluaW5nU2Vzc2lvbkhhbmRsZXI7XG4gIHByaXZhdGUgaGFzT3B0aW1pemVyTW9kZWw6IGJvb2xlYW47XG4gIHByaXZhdGUgaGFzRXZhbE1vZGVsOiBib29sZWFuO1xuXG4gIGdldCB0cmFpbmluZ0lucHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuaW5wdXROYW1lcztcbiAgfVxuICBnZXQgdHJhaW5pbmdPdXRwdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5vdXRwdXROYW1lcztcbiAgfVxuXG4gIGdldCBldmFsSW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuaGFzRXZhbE1vZGVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmV2YWxJbnB1dE5hbWVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgdHJhaW5pbmcgc2Vzc2lvbiBoYXMgbm8gZXZhbE1vZGVsIGxvYWRlZC4nKTtcbiAgICB9XG4gIH1cbiAgZ2V0IGV2YWxPdXRwdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuaGFzRXZhbE1vZGVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmV2YWxPdXRwdXROYW1lcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHRyYWluaW5nIHNlc3Npb24gaGFzIG5vIGV2YWxNb2RlbCBsb2FkZWQuJyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShcbiAgICB0cmFpbmluZ09wdGlvbnM6IFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnMsXG4gICAgc2Vzc2lvbk9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUcmFpbmluZ1Nlc3Npb24+IHtcbiAgICBjb25zdCBldmFsTW9kZWw6IHN0cmluZyB8IFVpbnQ4QXJyYXkgPSB0cmFpbmluZ09wdGlvbnMuZXZhbE1vZGVsIHx8ICcnO1xuICAgIGNvbnN0IG9wdGltaXplck1vZGVsOiBzdHJpbmcgfCBVaW50OEFycmF5ID0gdHJhaW5pbmdPcHRpb25zLm9wdGltaXplck1vZGVsIHx8ICcnO1xuICAgIGNvbnN0IG9wdGlvbnM6IFNlc3Npb25PcHRpb25zID0gc2Vzc2lvbk9wdGlvbnMgfHwge307XG5cbiAgICAvLyByZXNvbHZlIGJhY2tlbmQsIHVwZGF0ZSBzZXNzaW9uIG9wdGlvbnMgd2l0aCB2YWxpZGF0ZWQgRVBzLCBhbmQgY3JlYXRlIHNlc3Npb24gaGFuZGxlclxuICAgIGNvbnN0IFtiYWNrZW5kLCBvcHRpb25zV2l0aFZhbGlkYXRlZEVQc10gPSBhd2FpdCByZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVycyhvcHRpb25zKTtcbiAgICBpZiAoYmFja2VuZC5jcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGVyKSB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gYXdhaXQgYmFja2VuZC5jcmVhdGVUcmFpbmluZ1Nlc3Npb25IYW5kbGVyKFxuICAgICAgICB0cmFpbmluZ09wdGlvbnMuY2hlY2twb2ludFN0YXRlLFxuICAgICAgICB0cmFpbmluZ09wdGlvbnMudHJhaW5Nb2RlbCxcbiAgICAgICAgZXZhbE1vZGVsLFxuICAgICAgICBvcHRpbWl6ZXJNb2RlbCxcbiAgICAgICAgb3B0aW9uc1dpdGhWYWxpZGF0ZWRFUHMsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG5ldyBUcmFpbmluZ1Nlc3Npb24oaGFuZGxlciwgISF0cmFpbmluZ09wdGlvbnMub3B0aW1pemVyTW9kZWwsICEhdHJhaW5pbmdPcHRpb25zLmV2YWxNb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihub0JhY2tlbmRFcnJNc2cpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gZm9yIHJ1blRyYWluU3RlcCBhbmQgZnV0dXJlIHJ1blN0ZXAgbWV0aG9kcyB0aGF0IGhhbmRsZXMgdGhlIHR5cGUtbmFycm93aW5nIGNvbnZlcnNpb24gZnJvbVxuICAgKiB0aGUgZ2l2ZW4gcGFyYW1ldGVycyB0byBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSBhbmQgUnVuT3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGlucHV0TmFtZXMgdGhlIGZlZWRzIG9iamVjdCBpcyBjaGVja2VkIHRoYXQgdGhleSBjb250YWluIGFsbCBpbnB1dCBuYW1lcyBpbiB0aGUgcHJvdmlkZWQgbGlzdCBvZiBpbnB1dFxuICAgKiBuYW1lcy5cbiAgICogQHBhcmFtIG91dHB1dE5hbWVzIHRoZSBmZXRjaGVzIG9iamVjdCBpcyBjaGVja2VkIHRoYXQgdGhlaXIga2V5cyBtYXRjaCB1cCB3aXRoIHZhbGlkIG5hbWVzIGluIHRoZSBsaXN0IG9mIG91dHB1dFxuICAgKiBuYW1lcy5cbiAgICogQHBhcmFtIGZlZWRzIHRoZSByZXF1aXJlZCBpbnB1dFxuICAgKiBAcGFyYW0gYXJnMSBuYXJyb3dlZCAmIGNvbnZlcnRlZCBpbnRvIHRoZSBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSBvciBSdW5PcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0gYXJnMiBvcHRpb25hbCBSdW5PcHRpb25zIG9iamVjdC5cbiAgICogQHJldHVybnNcbiAgICovXG4gIHR5cGVOYXJyb3dpbmdGb3JSdW5TdGVwKFxuICAgIGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdLFxuICAgIG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXSxcbiAgICBmZWVkczogRmVlZHNUeXBlLFxuICAgIGFyZzE/OiBGZXRjaGVzVHlwZSB8IFJ1bk9wdGlvbnMsXG4gICAgYXJnMj86IFJ1bk9wdGlvbnMsXG4gICk6IFtTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSwgUnVuT3B0aW9uc10ge1xuICAgIGNvbnN0IGZldGNoZXM6IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGwgfSA9IHt9O1xuICAgIGxldCBvcHRpb25zOiBSdW5PcHRpb25zID0ge307XG4gICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgaWYgKHR5cGVvZiBmZWVkcyAhPT0gJ29iamVjdCcgfHwgZmVlZHMgPT09IG51bGwgfHwgZmVlZHMgaW5zdGFuY2VvZiBUZW5zb3IgfHwgQXJyYXkuaXNBcnJheShmZWVkcykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIFwiJ2ZlZWRzJyBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IHVzZSBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXCIsXG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCBpc0ZldGNoZXNFbXB0eSA9IHRydWU7XG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG92ZXJyaWRlIGlzIGJlaW5nIHVzZWRcbiAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoYXJnMSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChhcmcxIGluc3RhbmNlb2YgVGVuc29yKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZmV0Y2hlcycgY2Fubm90IGJlIGEgVGVuc29yXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICBpZiAoYXJnMS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2ZldGNoZXMnIGNhbm5vdCBiZSBhbiBlbXB0eSBhcnJheS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgLy8gb3V0cHV0IG5hbWVzXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBhcmcxKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidmZXRjaGVzJyBtdXN0IGJlIGEgc3RyaW5nIGFycmF5IG9yIGFuIG9iamVjdC5cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvdXRwdXROYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdmZXRjaGVzJyBjb250YWlucyBpbnZhbGlkIG91dHB1dCBuYW1lOiAke25hbWV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkZWNpZGUgd2hldGhlciBhcmcxIGlzIGZldGNoZXMgb3Igb3B0aW9uc1xuICAgICAgICAvLyBpZiBhbnkgb3V0cHV0IG5hbWUgaXMgcHJlc2VudCBhbmQgaXRzIHZhbHVlIGlzIHZhbGlkIE9ubnhWYWx1ZSwgd2UgY29uc2lkZXIgaXQgZmV0Y2hlc1xuICAgICAgICBsZXQgaXNGZXRjaGVzID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFyZzFLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJnMSk7XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBvdXRwdXROYW1lcykge1xuICAgICAgICAgIGlmIChhcmcxS2V5cy5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdiA9IChhcmcxIGFzIEluZmVyZW5jZVNlc3Npb24uTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlKVtuYW1lXTtcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsIHx8IHYgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRmV0Y2hlcykge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0gYXJnMSBhcyBSdW5PcHRpb25zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBtdXN0IGJlICdmZXRjaGVzJyBvciAnb3B0aW9ucycuXCIpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGFsbCBpbnB1dHMgYXJlIGluIGZlZWRcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgaW5wdXROYW1lcykge1xuICAgICAgaWYgKHR5cGVvZiBmZWVkc1tuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCAnJHtuYW1lfScgaXMgbWlzc2luZyBpbiAnZmVlZHMnLmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIG5vIGZldGNoZXMgaXMgc3BlY2lmaWVkLCB3ZSB1c2UgdGhlIGZ1bGwgb3V0cHV0IG5hbWVzIGxpc3RcbiAgICBpZiAoaXNGZXRjaGVzRW1wdHkpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBvdXRwdXROYW1lcykge1xuICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2ZldGNoZXMsIG9wdGlvbnNdO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgZm9yIHJ1blRyYWluU3RlcCBhbmQgYW55IG90aGVyIHJ1blN0ZXAgbWV0aG9kcy4gVGFrZXMgdGhlIFJldHVyblR5cGUgcmVzdWx0IGZyb20gdGhlIFNlc3Npb25IYW5kbGVyXG4gICAqIGFuZCBjaGFuZ2VzIGl0IGludG8gYSBtYXAgb2YgVGVuc29ycy5cbiAgICpcbiAgICogQHBhcmFtIHJlc3VsdHNcbiAgICogQHJldHVybnNcbiAgICovXG4gIGNvbnZlcnRIYW5kbGVyUmV0dXJuVHlwZVRvTWFwT2ZUZW5zb3JzKHJlc3VsdHM6IFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGUpOiBSZXR1cm5UeXBlIHtcbiAgICBjb25zdCByZXR1cm5WYWx1ZTogeyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIH0gPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByZXN1bHRzKSB7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0cywga2V5KSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW2tleV07XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSBuZXcgVGVuc29yKHJlc3VsdC50eXBlLCByZXN1bHQuZGF0YSwgcmVzdWx0LmRpbXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxuXG4gIGFzeW5jIGxhenlSZXNldEdyYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5oYW5kbGVyLmxhenlSZXNldEdyYWQoKTtcbiAgfVxuXG4gIHJ1blRyYWluU3RlcChmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIHJ1blRyYWluU3RlcChmZWVkczogRmVlZHNUeXBlLCBmZXRjaGVzOiBGZXRjaGVzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBhc3luYyBydW5UcmFpblN0ZXAoZmVlZHM6IEZlZWRzVHlwZSwgYXJnMT86IEZldGNoZXNUeXBlIHwgUnVuT3B0aW9ucywgYXJnMj86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+IHtcbiAgICBjb25zdCBbZmV0Y2hlcywgb3B0aW9uc10gPSB0aGlzLnR5cGVOYXJyb3dpbmdGb3JSdW5TdGVwKFxuICAgICAgdGhpcy50cmFpbmluZ0lucHV0TmFtZXMsXG4gICAgICB0aGlzLnRyYWluaW5nT3V0cHV0TmFtZXMsXG4gICAgICBmZWVkcyxcbiAgICAgIGFyZzEsXG4gICAgICBhcmcyLFxuICAgICk7XG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuaGFuZGxlci5ydW5UcmFpblN0ZXAoZmVlZHMsIGZldGNoZXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmNvbnZlcnRIYW5kbGVyUmV0dXJuVHlwZVRvTWFwT2ZUZW5zb3JzKHJlc3VsdHMpO1xuICB9XG5cbiAgYXN5bmMgcnVuT3B0aW1pemVyU3RlcChvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zIHwgdW5kZWZpbmVkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuaGFzT3B0aW1pemVyTW9kZWwpIHtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlci5ydW5PcHRpbWl6ZXJTdGVwKG9wdGlvbnMgfHwge30pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgVHJhaW5pbmdTZXNzaW9uIGhhcyBubyBPcHRpbWl6ZXJNb2RlbCBsb2FkZWQuJyk7XG4gICAgfVxuICB9XG5cbiAgcnVuRXZhbFN0ZXAoZmVlZHM6IEZlZWRzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMgfCB1bmRlZmluZWQpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBydW5FdmFsU3RlcChmZWVkczogRmVlZHNUeXBlLCBmZXRjaGVzOiBGZXRjaGVzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMgfCB1bmRlZmluZWQpOiBQcm9taXNlPFJldHVyblR5cGU+O1xuICBhc3luYyBydW5FdmFsU3RlcChmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGUgfCBSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xuICAgIGlmICh0aGlzLmhhc0V2YWxNb2RlbCkge1xuICAgICAgY29uc3QgW2ZldGNoZXMsIG9wdGlvbnNdID0gdGhpcy50eXBlTmFycm93aW5nRm9yUnVuU3RlcChcbiAgICAgICAgdGhpcy5ldmFsSW5wdXROYW1lcyxcbiAgICAgICAgdGhpcy5ldmFsT3V0cHV0TmFtZXMsXG4gICAgICAgIGZlZWRzLFxuICAgICAgICBhcmcxLFxuICAgICAgICBhcmcyLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmhhbmRsZXIucnVuRXZhbFN0ZXAoZmVlZHMsIGZldGNoZXMsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXMuY29udmVydEhhbmRsZXJSZXR1cm5UeXBlVG9NYXBPZlRlbnNvcnMocmVzdWx0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBUcmFpbmluZ1Nlc3Npb24gaGFzIG5vIEV2YWxNb2RlbCBsb2FkZWQuJyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seSA9IHRydWUpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seSk7XG4gIH1cblxuICBhc3luYyBsb2FkUGFyYW1ldGVyc0J1ZmZlcihhcnJheTogVWludDhBcnJheSwgdHJhaW5hYmxlT25seSA9IHRydWUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXJhbXNTaXplID0gYXdhaXQgdGhpcy5nZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5KTtcbiAgICAvLyBjaGVja2luZyB0aGF0IHRoZSBzaXplIG9mIHRoZSBVaW50OEFycmF5IGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJ5dGUgbGVuZ3RoIG9mIGEgRmxvYXQzMkFycmF5IG9mIHRoZSBudW1iZXJcbiAgICAvLyBvZiBwYXJhbWV0ZXJzXG4gICAgaWYgKGFycmF5Lmxlbmd0aCAhPT0gNCAqIHBhcmFtc1NpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1NpemUgb2YgdGhlIGJ1ZmZlciBwYXNzZWQgaW50byBsb2FkUGFyYW1ldGVyc0J1ZmZlciBtdXN0IG1hdGNoIHRoZSBudW1iZXIgb2YgcGFyYW1ldGVycyBpbiAnICtcbiAgICAgICAgICAndGhlIG1vZGVsLiBQbGVhc2UgdXNlIGdldFBhcmFtZXRlcnNTaXplIG1ldGhvZCB0byBjaGVjay4nLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5sb2FkUGFyYW1ldGVyc0J1ZmZlcihhcnJheSwgdHJhaW5hYmxlT25seSk7XG4gIH1cblxuICBhc3luYyBnZXRDb250aWd1b3VzUGFyYW1ldGVycyh0cmFpbmFibGVPbmx5ID0gdHJ1ZSk6IFByb21pc2U8T25ueFZhbHVlPiB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5nZXRDb250aWd1b3VzUGFyYW1ldGVycyh0cmFpbmFibGVPbmx5KTtcbiAgfVxuXG4gIGFzeW5jIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5kaXNwb3NlKCk7XG4gIH1cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuaW1wb3J0IHsgT25ueFZhbHVlIH0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmltcG9ydCB7IFRyYWluaW5nU2Vzc2lvbiBhcyBUcmFpbmluZ1Nlc3Npb25JbXBsIH0gZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLWltcGwuanMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBUcmFpbmluZ1Nlc3Npb24ge1xuICAvKipcbiAgICogRWl0aGVyIFVSSSBmaWxlIHBhdGggKHN0cmluZykgb3IgVWludDhBcnJheSBjb250YWluaW5nIG1vZGVsIG9yIGNoZWNrcG9pbnQgaW5mb3JtYXRpb24uXG4gICAqL1xuICB0eXBlIFVyaU9yQnVmZmVyID0gc3RyaW5nIHwgVWludDhBcnJheTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBydW50aW1lIGluc3RhbmNlIG9mIGFuIE9OTlggdHJhaW5pbmcgc2Vzc2lvbixcbiAqIHdoaWNoIGNvbnRhaW5zIGEgbW9kZWwgdGhhdCBjYW4gYmUgdHJhaW5lZCwgYW5kLCBvcHRpb25hbGx5LFxuICogYW4gZXZhbCBhbmQgb3B0aW1pemVyIG1vZGVsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYWluaW5nU2Vzc2lvbiB7XG4gIC8vICNyZWdpb24gcnVuKClcblxuICAvKipcbiAgICogTGF6aWx5IHJlc2V0cyB0aGUgZ3JhZGllbnRzIG9mIGFsbCB0cmFpbmFibGUgcGFyYW1ldGVycyB0byB6ZXJvLiBTaG91bGQgaGFwcGVuIGFmdGVyIHRoZSBpbnZvY2F0aW9uIG9mXG4gICAqIHJ1bk9wdGltaXplclN0ZXAuXG4gICAqL1xuICBsYXp5UmVzZXRHcmFkKCk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJ1biBUcmFpblN0ZXAgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3JcbiAgIGRldGFpbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCB0cmFpbmluZy5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHJ1blRyYWluU3RlcChcbiAgICBmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsXG4gICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8qKlxuICAgKiBSdW4gYSBzaW5nbGUgdHJhaW4gc3RlcCB3aXRoIHRoZSBnaXZlbiBpbnB1dHMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC5cbiAgICogQHBhcmFtIGZldGNoZXMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgb3V0cHV0LlxuICAgKiBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgdHJhaW5pbmcuXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZ1xuICAgdmFsdWVzLlxuICAgKi9cbiAgcnVuVHJhaW5TdGVwKFxuICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvKipcbiAgICogUnVucyBhIHNpbmdsZSBvcHRpbWl6ZXIgc3RlcCwgd2hpY2ggcGVyZm9ybXMgd2VpZ2h0IHVwZGF0ZXMgZm9yIHRoZSB0cmFpbmFibGUgcGFyYW1ldGVycyB1c2luZyB0aGUgb3B0aW1pemVyIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIG9wdGltaXppbmcuXG4gICAqL1xuICBydW5PcHRpbWl6ZXJTdGVwKG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSdW4gYSBzaW5nbGUgZXZhbCBzdGVwIHdpdGggdGhlIGdpdmVuIGlucHV0cyBhbmQgb3B0aW9ucyB1c2luZyB0aGUgZXZhbCBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGV2YWwgc3RlcC5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nXG4gICB2YWx1ZXMuXG4gICAqL1xuICBydW5FdmFsU3RlcChcbiAgICBmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsXG4gICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8qKlxuICAgKiBSdW4gYSBzaW5nbGUgZXZhbCBzdGVwIHdpdGggdGhlIGdpdmVuIGlucHV0cyBhbmQgb3B0aW9ucyB1c2luZyB0aGUgZXZhbCBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LlxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuXG4gICAqIGRldGFpbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCBldmFsIHN0ZXAuXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZ1xuICAgdmFsdWVzLlxuICAgKi9cbiAgcnVuRXZhbFN0ZXAoXG4gICAgZmVlZHM6IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlLFxuICAgIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXG4gICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGNvcHkgcGFyYW1ldGVyc1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIHNpemUgb2YgYWxsIHBhcmFtZXRlcnMgZm9yIHRoZSB0cmFpbmluZyBzdGF0ZS4gQ2FsY3VsYXRlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHByaW1pdGl2ZSAoZGF0YXR5cGUgb2ZcbiAgICogdGhlIHBhcmFtZXRlcnMpIGVsZW1lbnRzIG9mIGFsbCB0aGUgcGFyYW1ldGVycyBpbiB0aGUgdHJhaW5pbmcgc3RhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gV2hlbiBzZXQgdG8gdHJ1ZSwgdGhlIHNpemUgaXMgY2FsY3VsYXRlZCBmb3IgdHJhaW5hYmxlIHBhcmFtcyBvbmx5LiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gICAqL1xuICBnZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxudW1iZXI+O1xuXG4gIC8qKlxuICAgKiBDb3BpZXMgcGFyYW1ldGVyIHZhbHVlcyBmcm9tIHRoZSBnaXZlbiBidWZmZXIgdG8gdGhlIHRyYWluaW5nIHN0YXRlLiBDdXJyZW50bHksIG9ubHkgc3VwcG9ydGluZyBtb2RlbHMgd2l0aFxuICAgKiBwYXJhbWV0ZXJzIG9mIHR5cGUgRmxvYXQzMi5cbiAgICpcbiAgICogQHBhcmFtIGJ1ZmZlciAtIEEgVWludDhBcnJheSByZXByZXNlbnRhdGlvbiBvZiBGbG9hdDMyIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB0cmFpbmFibGVPbmx5IC0gVHJ1ZSBpZiB0cmFpbmFibGUgcGFyYW1ldGVycyBvbmx5IHRvIGJlIG1vZGlmaWVkLCBmYWxzZSBvdGhlcndpc2UuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICovXG4gIGxvYWRQYXJhbWV0ZXJzQnVmZmVyKGJ1ZmZlcjogVWludDhBcnJheSwgdHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIENvcGllcyB0aGUgbW9kZWwgcGFyYW1ldGVycyB0byBhIGNvbnRpZ3VvdXMgYnVmZmVyLiBVc3VhbGx5IHVzZWQgaW4gdGhlIGNvbnRleHQgb2YgRmVkZXJhdGVkIExlYXJuaW5nLlxuICAgKiBDdXJyZW50bHksIG9ubHkgc3VwcG9ydGluZyBtb2RlbHMgd2l0aCBwYXJhbWV0ZXJzIG9mIHR5cGUgRmxvYXQzMi5cbiAgICpcbiAgICogQHBhcmFtIHRyYWluYWJsZU9ubHkgLSBXaGVuIHNldCB0byB0cnVlLCBvbmx5IHRyYWluYWJsZSBwYXJhbWV0ZXJzIGFyZSBjb3BpZWQuIFRyYWluYWJsZSBwYXJhbWV0ZXJzIGFyZSBwYXJhbWV0ZXJzXG4gICAqIGZvciB3aGljaCByZXF1aXJlc19ncmFkIGlzIHNldCB0byB0cnVlLiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgRmxvYXQzMiBPbm54VmFsdWUgb2YgdGhlIHJlcXVlc3RlZCBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8T25ueFZhbHVlPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcmVsZWFzZSgpXG5cbiAgLyoqXG4gICAqIFJlbGVhc2UgdGhlIGluZmVyZW5jZSBzZXNzaW9uIGFuZCB0aGUgdW5kZXJseWluZyByZXNvdXJjZXMuXG4gICAqL1xuICByZWxlYXNlKCk6IFByb21pc2U8dm9pZD47XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG1ldGFkYXRhXG5cbiAgLyoqXG4gICAqIEdldCBpbnB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIHRyYWluaW5nIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgdHJhaW5pbmdJbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IG91dHB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIHRyYWluaW5nIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgdHJhaW5pbmdPdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldCBpbnB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIGV2YWwgbW9kZWwuIElzIGFuIGVtcHR5IGFycmF5IGlmIG5vIGV2YWwgbW9kZWwgaXMgbG9hZGVkLlxuICAgKi9cbiAgcmVhZG9ubHkgZXZhbElucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBHZXQgb3V0cHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgZXZhbCBtb2RlbC4gSXMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZXZhbCBtb2RlbCBpcyBsb2FkZWQuXG4gICAqL1xuICByZWFkb25seSBldmFsT3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBvcHRpb25hbCBwYXJhbWV0ZXJzIHRoYXQgY2FuIGJlIHBhc3NlZCBpbnRvIHRoZSBUcmFpbmluZ1Nlc3Npb25GYWN0b3J5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYWluaW5nU2Vzc2lvbkNyZWF0ZU9wdGlvbnMge1xuICAvKipcbiAgICogVVJJIG9yIGJ1ZmZlciBmb3IgYSAuY2twdCBmaWxlIHRoYXQgY29udGFpbnMgdGhlIGNoZWNrcG9pbnQgZm9yIHRoZSB0cmFpbmluZyBtb2RlbC5cbiAgICovXG4gIGNoZWNrcG9pbnRTdGF0ZTogVHJhaW5pbmdTZXNzaW9uLlVyaU9yQnVmZmVyO1xuICAvKipcbiAgICogVVJJIG9yIGJ1ZmZlciBmb3IgdGhlIC5vbm54IHRyYWluaW5nIGZpbGUuXG4gICAqL1xuICB0cmFpbk1vZGVsOiBUcmFpbmluZ1Nlc3Npb24uVXJpT3JCdWZmZXI7XG4gIC8qKlxuICAgKiBPcHRpb25hbC4gVVJJIG9yIGJ1ZmZlciBmb3IgdGhlIC5vbm54IG9wdGltaXplciBtb2RlbCBmaWxlLlxuICAgKi9cbiAgb3B0aW1pemVyTW9kZWw/OiBUcmFpbmluZ1Nlc3Npb24uVXJpT3JCdWZmZXI7XG4gIC8qKlxuICAgKiBPcHRpb25hbC4gVVJJIG9yIGJ1ZmZlciBmb3IgdGhlIC5vbm54IGV2YWwgbW9kZWwgZmlsZS5cbiAgICovXG4gIGV2YWxNb2RlbD86IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcjtcbn1cblxuLyoqXG4gKiBEZWZpbmVzIG1ldGhvZCBvdmVybG9hZCBwb3NzaWJpbGl0aWVzIGZvciBjcmVhdGluZyBhIFRyYWluaW5nU2Vzc2lvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb25GYWN0b3J5IHtcbiAgLy8gI3JlZ2lvbiBjcmVhdGUoKVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFRyYWluaW5nU2Vzc2lvbiBhbmQgYXN5bmNocm9ub3VzbHkgbG9hZHMgYW55IG1vZGVscyBwYXNzZWQgaW4gdGhyb3VnaCB0cmFpbmluZ09wdGlvbnNcbiAgICpcbiAgICogQHBhcmFtIHRyYWluaW5nT3B0aW9ucyBzcGVjaWZ5IG1vZGVscyBhbmQgY2hlY2twb2ludHMgdG8gbG9hZCBpbnRvIHRoZSBUcmFpbmluZyBTZXNzaW9uXG4gICAqIEBwYXJhbSBzZXNzaW9uT3B0aW9ucyBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIHRyYWluaW5nIHNlc3Npb24gYmVoYXZpb3JcbiAgICpcbiAgICogQHJldHVybnMgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgVHJhaW5pbmdTZXNzaW9uIG9iamVjdFxuICAgKi9cbiAgY3JlYXRlKFxuICAgIHRyYWluaW5nT3B0aW9uczogVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9ucyxcbiAgICBzZXNzaW9uT3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4gICk6IFByb21pc2U8VHJhaW5pbmdTZXNzaW9uPjtcblxuICAvLyAjZW5kcmVnaW9uXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBjb25zdCBUcmFpbmluZ1Nlc3Npb246IFRyYWluaW5nU2Vzc2lvbkZhY3RvcnkgPSBUcmFpbmluZ1Nlc3Npb25JbXBsO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKipcbiAqICMgT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJXG4gKlxuICogT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJIGlzIGEgdW5pZmllZCBBUEkgZm9yIGFsbCBKYXZhU2NyaXB0IHVzYWdlcywgaW5jbHVkaW5nIHRoZSBmb2xsb3dpbmcgTlBNIHBhY2thZ2VzOlxuICpcbiAqIC0gW29ubnhydW50aW1lLW5vZGVdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLW5vZGUpXG4gKiAtIFtvbm54cnVudGltZS13ZWJdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLXdlYilcbiAqIC0gW29ubnhydW50aW1lLXJlYWN0LW5hdGl2ZV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtcmVhY3QtbmF0aXZlKVxuICpcbiAqIFNlZSBhbHNvOlxuICogLSBbR2V0IFN0YXJ0ZWRdKGh0dHBzOi8vb25ueHJ1bnRpbWUuYWkvZG9jcy9nZXQtc3RhcnRlZC93aXRoLWphdmFzY3JpcHQvKVxuICogLSBbSW5mZXJlbmNlIGV4YW1wbGVzXShodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lLWluZmVyZW5jZS1leGFtcGxlcy90cmVlL21haW4vanMpXG4gKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9iYWNrZW5kLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vZW52LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3IuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vdHJhY2UuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9vbm54LW1vZGVsLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RyYWluaW5nLXNlc3Npb24uanMnO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5leHBvcnQgY29uc3QgaXNOb2RlID0gISEodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MudmVyc2lvbnMgJiYgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlKTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuLy8vIDxyZWZlcmVuY2UgbGliPVwid2Vid29ya2VyXCIgLz5cblxuLy9cbi8vICogdHlwZSBoYWNrIGZvciBcIkhUTUxJbWFnZUVsZW1lbnRcIlxuLy9cbi8vIGluIHR5cGVzY3JpcHQsIHRoZSB0eXBlIG9mIFwiSFRNTEltYWdlRWxlbWVudFwiIGlzIGRlZmluZWQgaW4gbGliLmRvbS5kLnRzLCB3aGljaCBpcyBjb25mbGljdCB3aXRoIGxpYi53ZWJ3b3JrZXIuZC50cy5cbi8vIHdoZW4gd2UgdXNlIHdlYndvcmtlciwgdGhlIGxpYi53ZWJ3b3JrZXIuZC50cyB3aWxsIGJlIHVzZWQsIHdoaWNoIGRvZXMgbm90IGhhdmUgSFRNTEltYWdlRWxlbWVudCBkZWZpbmVkLlxuLy9cbi8vIHdlIHdpbGwgZ2V0IHRoZSBmb2xsb3dpbmcgZXJyb3JzIGNvbXBsYWluaW5nIHRoYXQgSFRNTEltYWdlRWxlbWVudCBpcyBub3QgZGVmaW5lZDpcbi8vXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9cbi8vIC4uL2NvbW1vbi9kaXN0L2Nqcy90ZW5zb3ItZmFjdG9yeS5kLnRzOjE4NzoyOSAtIGVycm9yIFRTMjU1MjogQ2Fubm90IGZpbmQgbmFtZSAnSFRNTEltYWdlRWxlbWVudCcuIERpZCB5b3UgbWVhblxuLy8gJ0hUTUxMSUVsZW1lbnQnP1xuLy9cbi8vIDE4NyAgICAgZnJvbUltYWdlKGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zKTpcbi8vIFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+Pjtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5+fn5+fn5+flxuLy9cbi8vIG5vZGVfbW9kdWxlcy9Ad2ViZ3B1L3R5cGVzL2Rpc3QvaW5kZXguZC50czo4Mzo3IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MSW1hZ2VFbGVtZW50Jy4gRGlkIHlvdSBtZWFuXG4vLyAnSFRNTExJRWxlbWVudCc/XG4vL1xuLy8gODMgICAgIHwgSFRNTEltYWdlRWxlbWVudFxuLy8gICAgICAgICAgfn5+fn5+fn5+fn5+fn5+flxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gYEhUTUxJbWFnZUVsZW1lbnRgIGlzIG9ubHkgdXNlZCBpbiB0eXBlIGRlY2xhcmF0aW9uIGFuZCBub3QgaW4gcmVhbCBjb2RlLiBTbyB3ZSBkZWZpbmUgaXQgYXMgYHVua25vd25gIGhlcmUgdG9cbi8vIGJ5cGFzcyB0aGUgdHlwZSBjaGVjay5cblxuLy9cbi8vICogdHlwZSBoYWNrIGZvciBcImRvY3VtZW50XCJcbi8vXG4vLyBpbiB0eXBlc2NyaXB0LCB0aGUgdHlwZSBvZiBcImRvY3VtZW50XCIgaXMgZGVmaW5lZCBpbiBsaWIuZG9tLmQudHMsIHNvIGl0J3Mgbm90IGF2YWlsYWJsZSBpbiB3ZWJ3b3JrZXIuXG4vL1xuLy8gd2Ugd2lsbCBnZXQgdGhlIGZvbGxvd2luZyBlcnJvcnMgY29tcGxhaW5pbmcgdGhhdCBkb2N1bWVudCBpcyBub3QgZGVmaW5lZDpcbi8vXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9cbi8vIGxpYi93YXNtL3dhc20tdXRpbHMtaW1wb3J0LnRzOjc6MzMgLSBlcnJvciBUUzI1ODQ6IENhbm5vdCBmaW5kIG5hbWUgJ2RvY3VtZW50Jy4gRG8geW91IG5lZWQgdG8gY2hhbmdlIHlvdXIgdGFyZ2V0XG4vLyBsaWJyYXJ5PyBUcnkgY2hhbmdpbmcgdGhlICdsaWInIGNvbXBpbGVyIG9wdGlvbiB0byBpbmNsdWRlICdkb20nLlxuLy9cbi8vIDcgZXhwb3J0IGNvbnN0IHNjcmlwdFNyYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAoZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmMgOlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH5+fn5+fn5+XG4vL1xuLy8gbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHM6Nzo2MSAtIGVycm9yIFRTMjU4NDogQ2Fubm90IGZpbmQgbmFtZSAnZG9jdW1lbnQnLiBEbyB5b3UgbmVlZCB0byBjaGFuZ2UgeW91ciB0YXJnZXRcbi8vIGxpYnJhcnk/IFRyeSBjaGFuZ2luZyB0aGUgJ2xpYicgY29tcGlsZXIgb3B0aW9uIHRvIGluY2x1ZGUgJ2RvbScuXG4vL1xuLy8gNyBleHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH5+fn5+fn5+XG4vL1xuLy8gbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHM6Nzo4OCAtIGVycm9yIFRTMjU1MjogQ2Fubm90IGZpbmQgbmFtZSAnSFRNTFNjcmlwdEVsZW1lbnQnLiBEaWQgeW91IG1lYW5cbi8vICdIVE1MTElFbGVtZW50Jz9cbi8vXG4vLyA3IGV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gKGRvY3VtZW50Py5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5+fn5+fn5+fn5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gYGRvY3VtZW50YCBpcyB1c2VkIHRvIGdldCB0aGUgY3VycmVudCBzY3JpcHQgVVJMLCB3aGljaCBpcyBub3QgYXZhaWxhYmxlIGluIHdlYndvcmtlci4gVGhpcyBmaWxlIGlzIHNlcnZlZCBhcyBhXG4vLyBcImR1YWxcIiBmaWxlIGZvciBlbnRyaWVzIG9mIGJvdGggd2Vid29ya2VyIGFuZCB0aGUgZXNtIG1vZHVsZS5cbi8vXG5kZWNsYXJlIGdsb2JhbCB7XG4gIHR5cGUgSFRNTEltYWdlRWxlbWVudCA9IHVua25vd247XG4gIHR5cGUgSFRNTFNjcmlwdEVsZW1lbnQgPSB7IHNyYz86IHN0cmluZyB9O1xuICBjb25zdCBkb2N1bWVudDogdW5kZWZpbmVkIHwgeyBjdXJyZW50U2NyaXB0PzogSFRNTFNjcmlwdEVsZW1lbnQgfTtcbn1cblxuLyoqXG4gKiBAc3VtbWFyeVxuICpcbiAqIFRoaXMgZmlsZSBpcyBzZXJ2ZWQgYXMgYSBcImR1YWxcIiBmaWxlIGZvciBib3RoIGVudHJpZXMgb2YgdGhlIGZvbGxvd2luZzpcbiAqIC0gVGhlIHByb3h5IHdvcmtlciBpdHNlbGYuXG4gKiAgIC0gV2hlbiB1c2VkIGFzIGEgd29ya2VyLCBpdCBsaXN0ZW5zIHRvIHRoZSBtZXNzYWdlcyBmcm9tIHRoZSBtYWluIHRocmVhZCBhbmQgcGVyZm9ybXMgdGhlIGNvcnJlc3BvbmRpbmcgb3BlcmF0aW9ucy5cbiAqICAgLSBTaG91bGQgYmUgaW1wb3J0ZWQgZGlyZWN0bHkgdXNpbmcgYG5ldyBXb3JrZXIoKWAgaW4gdGhlIG1haW4gdGhyZWFkLlxuICpcbiAqIC0gVGhlIEVTTSBtb2R1bGUgdGhhdCBjcmVhdGVzIHRoZSBwcm94eSB3b3JrZXIgKGFzIGEgd29ya2VyIGxhdW5jaGVyKS5cbiAqICAgLSBXaGVuIHVzZWQgYXMgYSB3b3JrZXIgbGF1bmNoZXIsIGl0IGNyZWF0ZXMgdGhlIHByb3h5IHdvcmtlciBhbmQgcmV0dXJucyBpdC5cbiAqICAgLSBTaG91bGQgYmUgaW1wb3J0ZWQgdXNpbmcgYGltcG9ydCgpYCBpbiB0aGUgbWFpbiB0aHJlYWQsIHdpdGggdGhlIHF1ZXJ5IHBhcmFtZXRlciBgaW1wb3J0PTFgLlxuICpcbiAqIFRoaXMgZmlsZSB3aWxsIGJlIGFsd2F5cyBjb21waWxpbmcgaW50byBFU00gZm9ybWF0LlxuICovXG5cbmltcG9ydCB0eXBlIHsgT3J0V2FzbU1lc3NhZ2UsIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhIH0gZnJvbSAnLi4vcHJveHktbWVzc2FnZXMuanMnO1xuaW1wb3J0IHtcbiAgY3JlYXRlU2Vzc2lvbixcbiAgY29weUZyb21FeHRlcm5hbEJ1ZmZlcixcbiAgZW5kUHJvZmlsaW5nLFxuICBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyxcbiAgaW5pdEVwLFxuICBpbml0UnVudGltZSxcbiAgcmVsZWFzZVNlc3Npb24sXG4gIHJ1bixcbn0gZnJvbSAnLi4vd2FzbS1jb3JlLWltcGwuanMnO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5IH0gZnJvbSAnLi4vd2FzbS1mYWN0b3J5LmpzJztcbmltcG9ydCB7IHNjcmlwdFNyYyB9IGZyb20gJy4uL3dhc20tdXRpbHMtaW1wb3J0LmpzJztcblxuY29uc3QgV09SS0VSX05BTUUgPSAnb3J0LXdhc20tcHJveHktd29ya2VyJztcbmNvbnN0IGlzUHJveHlXb3JrZXIgPSBnbG9iYWxUaGlzLnNlbGY/Lm5hbWUgPT09IFdPUktFUl9OQU1FO1xuXG5pZiAoaXNQcm94eVdvcmtlcikge1xuICAvLyBXb3JrZXIgdGhyZWFkXG4gIHNlbGYub25tZXNzYWdlID0gKGV2OiBNZXNzYWdlRXZlbnQ8T3J0V2FzbU1lc3NhZ2U+KTogdm9pZCA9PiB7XG4gICAgY29uc3QgeyB0eXBlLCBpbjogbWVzc2FnZSB9ID0gZXYuZGF0YTtcbiAgICB0cnkge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2luaXQtd2FzbSc6XG4gICAgICAgICAgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KG1lc3NhZ2UhLndhc20pLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGluaXRSdW50aW1lKG1lc3NhZ2UhKS50aGVuKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVyciB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW5pdC1lcCc6IHtcbiAgICAgICAgICBjb25zdCB7IGVwTmFtZSwgZW52IH0gPSBtZXNzYWdlITtcbiAgICAgICAgICBpbml0RXAoZW52LCBlcE5hbWUpLnRoZW4oXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NvcHktZnJvbSc6IHtcbiAgICAgICAgICBjb25zdCB7IGJ1ZmZlciB9ID0gbWVzc2FnZSE7XG4gICAgICAgICAgY29uc3QgYnVmZmVyRGF0YSA9IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIoYnVmZmVyKTtcbiAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIG91dDogYnVmZmVyRGF0YSB9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdjcmVhdGUnOiB7XG4gICAgICAgICAgY29uc3QgeyBtb2RlbCwgb3B0aW9ucyB9ID0gbWVzc2FnZSE7XG4gICAgICAgICAgY3JlYXRlU2Vzc2lvbihtb2RlbCwgb3B0aW9ucykudGhlbihcbiAgICAgICAgICAgIChzZXNzaW9uTWV0YWRhdGEpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBvdXQ6IHNlc3Npb25NZXRhZGF0YSB9IGFzIE9ydFdhc21NZXNzYWdlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3JlbGVhc2UnOlxuICAgICAgICAgIHJlbGVhc2VTZXNzaW9uKG1lc3NhZ2UhKTtcbiAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3J1bic6IHtcbiAgICAgICAgICBjb25zdCB7IHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG9wdGlvbnMgfSA9IG1lc3NhZ2UhO1xuICAgICAgICAgIHJ1bihzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBuZXcgQXJyYXkob3V0cHV0SW5kaWNlcy5sZW5ndGgpLmZpbGwobnVsbCksIG9wdGlvbnMpLnRoZW4oXG4gICAgICAgICAgICAob3V0cHV0cykgPT4ge1xuICAgICAgICAgICAgICBpZiAob3V0cHV0cy5zb21lKChvKSA9PiBvWzNdICE9PSAnY3B1JykpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVycjogJ1Byb3h5IGRvZXMgbm90IHN1cHBvcnQgbm9uLWNwdSB0ZW5zb3IgbG9jYXRpb24uJyB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZShcbiAgICAgICAgICAgICAgICAgIHsgdHlwZSwgb3V0OiBvdXRwdXRzIH0gYXMgT3J0V2FzbU1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyhbLi4uaW5wdXRzLCAuLi5vdXRwdXRzXSBhcyBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVyciB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdlbmQtcHJvZmlsaW5nJzpcbiAgICAgICAgICBlbmRQcm9maWxpbmcobWVzc2FnZSEpO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQcm94eVdvcmtlclxuICA/IG51bGxcbiAgOiAodXJsT3ZlcnJpZGU/OiBzdHJpbmcpID0+XG4gICAgICBuZXcgV29ya2VyKHVybE92ZXJyaWRlID8/IHNjcmlwdFNyYyEsIHsgdHlwZTogQlVJTERfREVGUy5JU19FU00gPyAnbW9kdWxlJyA6ICdjbGFzc2ljJywgbmFtZTogV09SS0VSX05BTUUgfSk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB0eXBlIHsgT3J0V2FzbU1vZHVsZSB9IGZyb20gJy4vd2FzbS10eXBlcyc7XG5pbXBvcnQgeyBpc05vZGUgfSBmcm9tICcuL3dhc20tdXRpbHMtZW52JztcblxuLyoqXG4gKiBUaGUgY2xhc3NpYyBzY3JpcHQgc291cmNlIFVSTC4gVGhpcyBpcyBub3QgYWx3YXlzIGF2YWlsYWJsZSBpbiBub24gRVNNb2R1bGUgZW52aXJvbm1lbnRzLlxuICpcbiAqIEluIE5vZGUuanMsIHRoaXMgaXMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3Qgc2NyaXB0U3JjID1cbiAgLy8gaWYgTm9kZWpzLCByZXR1cm4gdW5kZWZpbmVkXG4gIGlzTm9kZVxuICAgID8gdW5kZWZpbmVkXG4gICAgOiAvLyBpZiBJdCdzIEVTTSwgdXNlIGltcG9ydC5tZXRhLnVybFxuICAgICAgKEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCA/P1xuICAgICAgLy8gdXNlIGBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY2AgaWYgYXZhaWxhYmxlXG4gICAgICAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IChkb2N1bWVudC5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjXG4gICAgICAgIDogLy8gdXNlIGBzZWxmLmxvY2F0aW9uLmhyZWZgIGlmIGF2YWlsYWJsZVxuICAgICAgICAgIHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgID8gc2VsZi5sb2NhdGlvbj8uaHJlZlxuICAgICAgICAgIDogdW5kZWZpbmVkKSk7XG5cbi8qKlxuICogVGhlIG9yaWdpbiBvZiB0aGUgY3VycmVudCBsb2NhdGlvbi5cbiAqXG4gKiBJbiBOb2RlLmpzLCB0aGlzIGlzIHVuZGVmaW5lZC5cbiAqL1xuY29uc3Qgb3JpZ2luID0gaXNOb2RlIHx8IHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBsb2NhdGlvbi5vcmlnaW47XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGZpbGVuYW1lIHdpdGggcHJlZml4IGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLlxuICovXG5jb25zdCBpc1NhbWVPcmlnaW4gPSAoZmlsZW5hbWU6IHN0cmluZywgcHJlZml4T3ZlcnJpZGU/OiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlVXJsID0gcHJlZml4T3ZlcnJpZGUgPz8gc2NyaXB0U3JjO1xuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgPyBuZXcgVVJMKGZpbGVuYW1lLCBiYXNlVXJsKSA6IG5ldyBVUkwoZmlsZW5hbWUpO1xuICAgIHJldHVybiB1cmwub3JpZ2luID09PSBvcmlnaW47XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGlucHV0cyB0byBhbiBhYnNvbHV0ZSBVUkwgd2l0aCB0aGUgZ2l2ZW4gcHJlZml4IG92ZXJyaWRlLiBJZiBmYWlsZWQsIHJldHVybiB1bmRlZmluZWQuXG4gKi9cbmNvbnN0IG5vcm1hbGl6ZVVybCA9IChmaWxlbmFtZTogc3RyaW5nLCBwcmVmaXhPdmVycmlkZT86IHN0cmluZykgPT4ge1xuICBjb25zdCBiYXNlVXJsID0gcHJlZml4T3ZlcnJpZGUgPz8gc2NyaXB0U3JjO1xuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgPyBuZXcgVVJMKGZpbGVuYW1lLCBiYXNlVXJsKSA6IG5ldyBVUkwoZmlsZW5hbWUpO1xuICAgIHJldHVybiB1cmwuaHJlZjtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBmYWxsYmFjayBVUkwgaWYgYW4gYWJzb2x1dGUgVVJMIGNhbm5vdCBiZSBjcmVhdGVkIGJ5IHRoZSBub3JtYWxpemVVcmwgZnVuY3Rpb24uXG4gKi9cbmNvbnN0IGZhbGxiYWNrVXJsID0gKGZpbGVuYW1lOiBzdHJpbmcsIHByZWZpeE92ZXJyaWRlPzogc3RyaW5nKSA9PiBgJHtwcmVmaXhPdmVycmlkZSA/PyAnLi8nfSR7ZmlsZW5hbWV9YDtcblxuLyoqXG4gKiBUaGlzIGhlbHBlciBmdW5jdGlvbiBpcyB1c2VkIHRvIHByZWxvYWQgYSBtb2R1bGUgZnJvbSBhIFVSTC5cbiAqXG4gKiBJZiB0aGUgb3JpZ2luIG9mIHRoZSB3b3JrZXIgVVJMIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IG9yaWdpbiwgdGhlIHdvcmtlciBjYW5ub3QgYmUgbG9hZGVkIGRpcmVjdGx5LlxuICogU2VlIGRpc2N1c3Npb25zIGluIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvd29ya2VyLWxvYWRlci9pc3N1ZXMvMTU0XG4gKlxuICogSW4gdGhpcyBjYXNlLCB3ZSB3aWxsIGZldGNoIHRoZSB3b3JrZXIgVVJMIGFuZCBjcmVhdGUgYSBuZXcgQmxvYiBVUkwgd2l0aCB0aGUgc2FtZSBvcmlnaW4gYXMgYSB3b3JrYXJvdW5kLlxuICpcbiAqIEBwYXJhbSBhYnNvbHV0ZVVybCAtIFRoZSBhYnNvbHV0ZSBVUkwgdG8gcHJlbG9hZC5cbiAqXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbmV3IEJsb2IgVVJMXG4gKi9cbmNvbnN0IHByZWxvYWQgPSBhc3luYyAoYWJzb2x1dGVVcmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYWJzb2x1dGVVcmwsIHsgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicgfSk7XG4gIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xufTtcblxuLyoqXG4gKiBUaGlzIGhlbHBlciBmdW5jdGlvbiBpcyB1c2VkIHRvIGR5bmFtaWNhbGx5IGltcG9ydCBhIG1vZHVsZSBmcm9tIGEgVVJMLlxuICpcbiAqIFRoZSBidWlsZCBzY3JpcHQgaGFzIHNwZWNpYWwgaGFuZGxpbmcgZm9yIHRoaXMgZnVuY3Rpb24gdG8gZW5zdXJlIHRoYXQgdGhlIFVSTCBpcyBub3QgYnVuZGxlZCBpbnRvIHRoZSBmaW5hbCBvdXRwdXQuXG4gKlxuICogQHBhcmFtIHVybCAtIFRoZSBVUkwgdG8gaW1wb3J0LlxuICpcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGRlZmF1bHQgZXhwb3J0IG9mIHRoZSBtb2R1bGUuXG4gKi9cbmNvbnN0IGR5bmFtaWNJbXBvcnREZWZhdWx0ID0gYXN5bmMgPFQ+KHVybDogc3RyaW5nKTogUHJvbWlzZTxUPiA9PlxuICAoYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdXJsKSkuZGVmYXVsdDtcblxuLyoqXG4gKiBUaGUgcHJveHkgd29ya2VyIGZhY3RvcnkgaW1wb3J0ZWQgZnJvbSB0aGUgcHJveHkgd29ya2VyIG1vZHVsZS5cbiAqXG4gKiBUaGlzIGlzIG9ubHkgYXZhaWxhYmxlIHdoZW4gdGhlIFdlYkFzc2VtYmx5IHByb3h5IGlzIG5vdCBkaXNhYmxlZC5cbiAqL1xuY29uc3QgY3JlYXRlUHJveHlXb3JrZXI6ICgodXJsT3ZlcnJpZGU/OiBzdHJpbmcpID0+IFdvcmtlcikgfCB1bmRlZmluZWQgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuICBCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSA/IHVuZGVmaW5lZCA6IHJlcXVpcmUoJy4vcHJveHktd29ya2VyL21haW4nKS5kZWZhdWx0O1xuXG4vKipcbiAqIEltcG9ydCB0aGUgcHJveHkgd29ya2VyLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHM6XG4gKiAxLiBJZiBhIHByZWxvYWQgaXMgbmVlZGVkLCBpdCB3aWxsIHByZWxvYWQgdGhlIG1vZHVsZSBhbmQgcmV0dXJuIHRoZSBvYmplY3QgVVJMLlxuICogMi4gVXNlIHRoZSBwcm94eSB3b3JrZXIgZmFjdG9yeSB0byBjcmVhdGUgdGhlIHByb3h5IHdvcmtlci5cbiAqXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgb2YgMiBlbGVtZW50czpcbiAqICAgICAgICAgICAgLSBUaGUgb2JqZWN0IFVSTCBvZiB0aGUgcHJlbG9hZGVkIG1vZHVsZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHByZWxvYWQgaXMgbmVlZGVkLlxuICogICAgICAgICAgICAtIFRoZSBwcm94eSB3b3JrZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBpbXBvcnRQcm94eVdvcmtlciA9IGFzeW5jICgpOiBQcm9taXNlPFt1bmRlZmluZWQgfCBzdHJpbmcsIFdvcmtlcl0+ID0+IHtcbiAgaWYgKCFzY3JpcHRTcmMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIHByb3h5IHdvcmtlcjogY2Fubm90IGRldGVybWluZSB0aGUgc2NyaXB0IHNvdXJjZSBVUkwuJyk7XG4gIH1cblxuICAvLyBJZiB0aGUgc2NyaXB0IHNvdXJjZSBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbiwgd2UgY2FuIHVzZSB0aGUgZW1iZWRkZWQgcHJveHkgbW9kdWxlIGRpcmVjdGx5LlxuICBpZiAoaXNTYW1lT3JpZ2luKHNjcmlwdFNyYykpIHtcbiAgICByZXR1cm4gW3VuZGVmaW5lZCwgY3JlYXRlUHJveHlXb3JrZXIhKCldO1xuICB9XG5cbiAgLy8gT3RoZXJ3aXNlLCBuZWVkIHRvIHByZWxvYWRcbiAgY29uc3QgdXJsID0gYXdhaXQgcHJlbG9hZChzY3JpcHRTcmMpO1xuICByZXR1cm4gW3VybCwgY3JlYXRlUHJveHlXb3JrZXIhKHVybCldO1xufTtcblxuLyoqXG4gKiBUaGUgZW1iZWRkZWQgV2ViQXNzZW1ibHkgbW9kdWxlLlxuICpcbiAqIFRoaXMgaXMgb25seSBhdmFpbGFibGUgaW4gRVNNIGFuZCB3aGVuIGVtYmVkZGluZyBpcyBub3QgZGlzYWJsZWQuXG4gKi9cbmNvbnN0IGVtYmVkZGVkV2FzbU1vZHVsZTogRW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT4gfCB1bmRlZmluZWQgPVxuICBCVUlMRF9ERUZTLklTX0VTTSAmJiBCVUlMRF9ERUZTLkRJU0FCTEVfRFlOQU1JQ19JTVBPUlRcbiAgICA/IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gICAgICByZXF1aXJlKFxuICAgICAgICAhQlVJTERfREVGUy5ESVNBQkxFX1RSQUlOSU5HXG4gICAgICAgICAgPyAnLi4vLi4vZGlzdC9vcnQtdHJhaW5pbmctd2FzbS1zaW1kLXRocmVhZGVkLm1qcydcbiAgICAgICAgICA6ICFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUFxuICAgICAgICAgICAgPyAnLi4vLi4vZGlzdC9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAubWpzJ1xuICAgICAgICAgICAgOiAnLi4vLi4vZGlzdC9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLm1qcycsXG4gICAgICApLmRlZmF1bHRcbiAgICA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBJbXBvcnQgdGhlIFdlYkFzc2VtYmx5IG1vZHVsZS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgcGVyZm9ybSB0aGUgZm9sbG93aW5nIHN0ZXBzOlxuICogMS4gSWYgQlVJTERfREVGUy5ESVNBQkxFX0RZTkFNSUNfSU1QT1JUIGlzIHRydWUsIHVzZSB0aGUgZW1iZWRkZWQgbW9kdWxlLlxuICogMi4gSWYgYSBwcmVsb2FkIGlzIG5lZWRlZCwgaXQgd2lsbCBwcmVsb2FkIHRoZSBtb2R1bGUgYW5kIHJldHVybiB0aGUgb2JqZWN0IFVSTC5cbiAqIDMuIE90aGVyd2lzZSwgaXQgd2lsbCBwZXJmb3JtIGEgZHluYW1pYyBpbXBvcnQgb2YgdGhlIG1vZHVsZS5cbiAqXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgb2YgMiBlbGVtZW50czpcbiAqICAgICAgICAgICAgLSBUaGUgb2JqZWN0IFVSTCBvZiB0aGUgcHJlbG9hZGVkIG1vZHVsZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHByZWxvYWQgaXMgbmVlZGVkLlxuICogICAgICAgICAgICAtIFRoZSBkZWZhdWx0IGV4cG9ydCBvZiB0aGUgbW9kdWxlLCB3aGljaCBpcyBhIGZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBXZWJBc3NlbWJseSBtb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBpbXBvcnRXYXNtTW9kdWxlID0gYXN5bmMgKFxuICB1cmxPdmVycmlkZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBwcmVmaXhPdmVycmlkZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBpc011bHRpVGhyZWFkZWQ6IGJvb2xlYW4sXG4pOiBQcm9taXNlPFt1bmRlZmluZWQgfCBzdHJpbmcsIEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+XT4gPT4ge1xuICBpZiAoQlVJTERfREVGUy5ESVNBQkxFX0RZTkFNSUNfSU1QT1JUKSB7XG4gICAgcmV0dXJuIFt1bmRlZmluZWQsIGVtYmVkZGVkV2FzbU1vZHVsZSFdO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHdhc21Nb2R1bGVGaWxlbmFtZSA9ICFCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkdcbiAgICAgID8gJ29ydC10cmFpbmluZy13YXNtLXNpbWQtdGhyZWFkZWQubWpzJ1xuICAgICAgOiAhQlVJTERfREVGUy5ESVNBQkxFX0pTRVBcbiAgICAgICAgPyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qcydcbiAgICAgICAgOiAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5tanMnO1xuICAgIGNvbnN0IHdhc21Nb2R1bGVVcmwgPSB1cmxPdmVycmlkZSA/PyBub3JtYWxpemVVcmwod2FzbU1vZHVsZUZpbGVuYW1lLCBwcmVmaXhPdmVycmlkZSk7XG4gICAgLy8gbmVlZCB0byBwcmVsb2FkIGlmIGFsbCBvZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAgICAvLyAxLiBub3QgaW4gTm9kZS5qcy5cbiAgICAvLyAgICAtIE5vZGUuanMgZG9lcyBub3QgaGF2ZSB0aGUgc2FtZSBvcmlnaW4gcG9saWN5IGZvciBjcmVhdGluZyB3b3JrZXJzLlxuICAgIC8vIDIuIG11bHRpLXRocmVhZGVkIGlzIGVuYWJsZWQuXG4gICAgLy8gICAgLSBJZiBtdWx0aS10aHJlYWRlZCBpcyBkaXNhYmxlZCwgbm8gd29ya2VyIHdpbGwgYmUgY3JlYXRlZC4gU28gd2UgZG9uJ3QgbmVlZCB0byBwcmVsb2FkIHRoZSBtb2R1bGUuXG4gICAgLy8gMy4gdGhlIGFic29sdXRlIFVSTCBpcyBhdmFpbGFibGUuXG4gICAgLy8gICAgLSBJZiB0aGUgYWJzb2x1dGUgVVJMIGlzIGZhaWxlZCB0byBiZSBjcmVhdGVkLCB0aGUgb3JpZ2luIGNhbm5vdCBiZSBkZXRlcm1pbmVkLiBJbiB0aGlzIGNhc2UsIHdlIHdpbGwgbm90XG4gICAgLy8gICAgcHJlbG9hZCB0aGUgbW9kdWxlLlxuICAgIC8vIDQuIHRoZSB3b3JrZXIgVVJMIGlzIG5vdCBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cbiAgICAvLyAgICAtIElmIHRoZSB3b3JrZXIgVVJMIGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLCB3ZSBjYW4gY3JlYXRlIHRoZSB3b3JrZXIgZGlyZWN0bHkuXG4gICAgY29uc3QgbmVlZFByZWxvYWQgPSAhaXNOb2RlICYmIGlzTXVsdGlUaHJlYWRlZCAmJiB3YXNtTW9kdWxlVXJsICYmICFpc1NhbWVPcmlnaW4od2FzbU1vZHVsZVVybCwgcHJlZml4T3ZlcnJpZGUpO1xuICAgIGNvbnN0IHVybCA9IG5lZWRQcmVsb2FkXG4gICAgICA/IGF3YWl0IHByZWxvYWQod2FzbU1vZHVsZVVybClcbiAgICAgIDogKHdhc21Nb2R1bGVVcmwgPz8gZmFsbGJhY2tVcmwod2FzbU1vZHVsZUZpbGVuYW1lLCBwcmVmaXhPdmVycmlkZSkpO1xuICAgIHJldHVybiBbbmVlZFByZWxvYWQgPyB1cmwgOiB1bmRlZmluZWQsIGF3YWl0IGR5bmFtaWNJbXBvcnREZWZhdWx0PEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+Pih1cmwpXTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgRW52IH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTW9kdWxlIH0gZnJvbSAnLi93YXNtLXR5cGVzJztcbmltcG9ydCB7IGltcG9ydFdhc21Nb2R1bGUgfSBmcm9tICcuL3dhc20tdXRpbHMtaW1wb3J0JztcblxubGV0IHdhc206IE9ydFdhc21Nb2R1bGUgfCB1bmRlZmluZWQ7XG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBpbml0aWFsaXppbmcgPSBmYWxzZTtcbmxldCBhYm9ydGVkID0gZmFsc2U7XG5cbmNvbnN0IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIC8vIElmICdTaGFyZWRBcnJheUJ1ZmZlcicgaXMgbm90IGF2YWlsYWJsZSwgV2ViQXNzZW1ibHkgdGhyZWFkcyB3aWxsIG5vdCB3b3JrLlxuICBpZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gVGVzdCBmb3IgdHJhbnNmZXJhYmlsaXR5IG9mIFNBQnMgKGZvciBicm93c2Vycy4gbmVlZGVkIGZvciBGaXJlZm94KVxuICAgIC8vIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vZm9ydW0vIyFtc2cvbW96aWxsYS5kZXYucGxhdGZvcm0vSUhrQlpsSEVUcEEvZHdzTU5jaFdFUUFKXG4gICAgaWYgKHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5ldyBNZXNzYWdlQ2hhbm5lbCgpLnBvcnQxLnBvc3RNZXNzYWdlKG5ldyBTaGFyZWRBcnJheUJ1ZmZlcigxKSk7XG4gICAgfVxuXG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgdGhyZWFkcyBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIHRocmVhZGVkIGluc3RydWN0aW9ucy5cbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUoXG4gICAgICBuZXcgVWludDhBcnJheShbXG4gICAgICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgNCwgMSwgOTYsIDAsIDAsIDMsIDIsIDEsIDAsIDUsIDQsIDEsIDMsIDEsIDEsIDEwLCAxMSwgMSwgOSwgMCwgNjUsIDAsIDI1NCwgMTYsXG4gICAgICAgIDIsIDAsIDI2LCAxMSxcbiAgICAgIF0pLFxuICAgICk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGlzU2ltZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSBTSU1EIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgU0lNRCBpbnN0cnVjdGlvbnMuXG5cbiAgICAvLyBUaGUgYmluYXJ5IGRhdGEgaXMgZ2VuZXJhdGVkIGZyb20gdGhlIGZvbGxvd2luZyBjb2RlIGJ5IHdhdDJ3YXNtOlxuICAgIC8vXG4gICAgLy8gKG1vZHVsZVxuICAgIC8vICAgKHR5cGUgJHQwIChmdW5jKSlcbiAgICAvLyAgIChmdW5jICRmMCAodHlwZSAkdDApXG4gICAgLy8gICAgIChkcm9wXG4gICAgLy8gICAgICAgKGkzMng0LmRvdF9pMTZ4OF9zXG4gICAgLy8gICAgICAgICAoaTh4MTYuc3BsYXRcbiAgICAvLyAgICAgICAgICAgKGkzMi5jb25zdCAwKSlcbiAgICAvLyAgICAgICAgICh2MTI4LmNvbnN0IGkzMng0IDB4MDAwMDAwMDAgMHgwMDAwMDAwMCAweDAwMDAwMDAwIDB4MDAwMDAwMDApKSkpKVxuXG4gICAgcmV0dXJuIFdlYkFzc2VtYmx5LnZhbGlkYXRlKFxuICAgICAgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDQsIDEsIDk2LCAwLCAwLCAzLCAyLCAxLCAwLCAxMCwgMzAsIDEsIDI4LCAwLCA2NSwgMCwgMjUzLCAxNSwgMjUzLCAxMiwgMCwgMCwgMCxcbiAgICAgICAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMjUzLCAxODYsIDEsIDI2LCAxMSxcbiAgICAgIF0pLFxuICAgICk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplV2ViQXNzZW1ibHkgPSBhc3luYyAoZmxhZ3M6IEVudi5XZWJBc3NlbWJseUZsYWdzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgY2FsbHMgdG8gJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpJyBkZXRlY3RlZC5cIik7XG4gIH1cbiAgaWYgKGFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcmV2aW91cyBjYWxsIHRvICdpbml0aWFsaXplV2ViQXNzZW1ibHkoKScgZmFpbGVkLlwiKTtcbiAgfVxuXG4gIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgLy8gd2FzbSBmbGFncyBhcmUgYWxyZWFkeSBpbml0aWFsaXplZFxuICBjb25zdCB0aW1lb3V0ID0gZmxhZ3MuaW5pdFRpbWVvdXQhO1xuICBsZXQgbnVtVGhyZWFkcyA9IGZsYWdzLm51bVRocmVhZHMhO1xuXG4gIC8vIGVuc3VyZSBTSU1EIGlzIHN1cHBvcnRlZFxuICBpZiAoIWlzU2ltZFN1cHBvcnRlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBTSU1EIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuJyk7XG4gIH1cblxuICAvLyBjaGVjayBpZiBtdWx0aS10aHJlYWRpbmcgaXMgc3VwcG9ydGVkXG4gIGNvbnN0IG11bHRpVGhyZWFkU3VwcG9ydGVkID0gaXNNdWx0aVRocmVhZFN1cHBvcnRlZCgpO1xuICBpZiAobnVtVGhyZWFkcyA+IDEgJiYgIW11bHRpVGhyZWFkU3VwcG9ydGVkKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiAhc2VsZi5jcm9zc09yaWdpbklzb2xhdGVkKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnZW52Lndhc20ubnVtVGhyZWFkcyBpcyBzZXQgdG8gJyArXG4gICAgICAgICAgbnVtVGhyZWFkcyArXG4gICAgICAgICAgJywgYnV0IHRoaXMgd2lsbCBub3Qgd29yayB1bmxlc3MgeW91IGVuYWJsZSBjcm9zc09yaWdpbklzb2xhdGVkIG1vZGUuICcgK1xuICAgICAgICAgICdTZWUgaHR0cHM6Ly93ZWIuZGV2L2Nyb3NzLW9yaWdpbi1pc29sYXRpb24tZ3VpZGUvIGZvciBtb3JlIGluZm8uJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnV2ViQXNzZW1ibHkgbXVsdGktdGhyZWFkaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuICcgKyAnRmFsbGluZyBiYWNrIHRvIHNpbmdsZS10aHJlYWRpbmcuJyxcbiAgICApO1xuXG4gICAgLy8gc2V0IGZsYWdzLm51bVRocmVhZHMgdG8gMSBzbyB0aGF0IE9ydEluaXQoKSB3aWxsIG5vdCBjcmVhdGUgYSBnbG9iYWwgdGhyZWFkIHBvb2wuXG4gICAgZmxhZ3MubnVtVGhyZWFkcyA9IG51bVRocmVhZHMgPSAxO1xuICB9XG5cbiAgY29uc3Qgd2FzbVBhdGhzID0gZmxhZ3Mud2FzbVBhdGhzO1xuICBjb25zdCB3YXNtUHJlZml4T3ZlcnJpZGUgPSB0eXBlb2Ygd2FzbVBhdGhzID09PSAnc3RyaW5nJyA/IHdhc21QYXRocyA6IHVuZGVmaW5lZDtcbiAgY29uc3QgbWpzUGF0aE92ZXJyaWRlRmxhZyA9ICh3YXNtUGF0aHMgYXMgRW52Lldhc21GaWxlUGF0aHMpPy5tanM7XG4gIGNvbnN0IG1qc1BhdGhPdmVycmlkZSA9IChtanNQYXRoT3ZlcnJpZGVGbGFnIGFzIFVSTCk/LmhyZWYgPz8gbWpzUGF0aE92ZXJyaWRlRmxhZztcbiAgY29uc3Qgd2FzbVBhdGhPdmVycmlkZUZsYWcgPSAod2FzbVBhdGhzIGFzIEVudi5XYXNtRmlsZVBhdGhzKT8ud2FzbTtcbiAgY29uc3Qgd2FzbVBhdGhPdmVycmlkZSA9ICh3YXNtUGF0aE92ZXJyaWRlRmxhZyBhcyBVUkwpPy5ocmVmID8/IHdhc21QYXRoT3ZlcnJpZGVGbGFnO1xuICBjb25zdCB3YXNtQmluYXJ5T3ZlcnJpZGUgPSBmbGFncy53YXNtQmluYXJ5O1xuXG4gIGNvbnN0IFtvYmplY3RVcmwsIG9ydFdhc21GYWN0b3J5XSA9IGF3YWl0IGltcG9ydFdhc21Nb2R1bGUobWpzUGF0aE92ZXJyaWRlLCB3YXNtUHJlZml4T3ZlcnJpZGUsIG51bVRocmVhZHMgPiAxKTtcblxuICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG5cbiAgY29uc3QgdGFza3M6IEFycmF5PFByb21pc2U8dm9pZD4+ID0gW107XG5cbiAgLy8gcHJvbWlzZSBmb3IgdGltZW91dFxuICBpZiAodGltZW91dCA+IDApIHtcbiAgICB0YXNrcy5wdXNoKFxuICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIC8vIHByb21pc2UgZm9yIG1vZHVsZSBpbml0aWFsaXphdGlvblxuICB0YXNrcy5wdXNoKFxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNvbmZpZzogUGFydGlhbDxPcnRXYXNtTW9kdWxlPiA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2YgdGhyZWFkcy4gV2ViQXNzZW1ibHkgd2lsbCBjcmVhdGUgKE1vZHVsZS5udW1UaHJlYWRzIC0gMSkgd29ya2Vycy4gSWYgaXQgaXMgMSwgbm8gd29ya2VyIHdpbGwgYmVcbiAgICAgICAgICogY3JlYXRlZC5cbiAgICAgICAgICovXG4gICAgICAgIG51bVRocmVhZHMsXG4gICAgICB9O1xuXG4gICAgICBpZiAod2FzbUJpbmFyeU92ZXJyaWRlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgYSBjdXN0b20gYnVmZmVyIHdoaWNoIGNvbnRhaW5zIHRoZSBXZWJBc3NlbWJseSBiaW5hcnkuIFRoaXMgd2lsbCBza2lwIHRoZSB3YXNtIGZpbGUgZmV0Y2hpbmcuXG4gICAgICAgICAqL1xuICAgICAgICBjb25maWcud2FzbUJpbmFyeSA9IHdhc21CaW5hcnlPdmVycmlkZTtcbiAgICAgIH0gZWxzZSBpZiAod2FzbVBhdGhPdmVycmlkZSB8fCB3YXNtUHJlZml4T3ZlcnJpZGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gbG9jYXRlIHRoZSBXZWJBc3NlbWJseSBmaWxlLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBTaW5jZSBFbXNjcmlwdGVuIDMuMS41OCwgdGhpcyBmdW5jdGlvbiBpcyBvbmx5IGNhbGxlZCBmb3IgdGhlIC53YXNtIGZpbGUuXG4gICAgICAgICAqL1xuICAgICAgICBjb25maWcubG9jYXRlRmlsZSA9IChmaWxlTmFtZSwgc2NyaXB0RGlyZWN0b3J5KSA9PlxuICAgICAgICAgIHdhc21QYXRoT3ZlcnJpZGUgPz8gKHdhc21QcmVmaXhPdmVycmlkZSA/PyBzY3JpcHREaXJlY3RvcnkpICsgZmlsZU5hbWU7XG4gICAgICB9XG5cbiAgICAgIG9ydFdhc21GYWN0b3J5KGNvbmZpZykudGhlbihcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5XG4gICAgICAgIChtb2R1bGUpID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgd2FzbSA9IG1vZHVsZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgaWYgKG9iamVjdFVybCkge1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgZmFpbGVkIHRvIGluaXRpYWxpemVcbiAgICAgICAgKHdoYXQpID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3Qod2hhdCk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0pLFxuICApO1xuXG4gIGF3YWl0IFByb21pc2UucmFjZSh0YXNrcyk7XG5cbiAgaWYgKGlzVGltZW91dCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgV2ViQXNzZW1ibHkgYmFja2VuZCBpbml0aWFsaXppbmcgZmFpbGVkIGR1ZSB0byB0aW1lb3V0OiAke3RpbWVvdXR9bXNgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEluc3RhbmNlID0gKCk6IE9ydFdhc21Nb2R1bGUgPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQgJiYgd2FzbSkge1xuICAgIHJldHVybiB3YXNtO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBpcyBub3QgaW5pdGlhbGl6ZWQgeWV0LicpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpc3Bvc2UgPSAoKTogdm9pZCA9PiB7XG4gIGlmIChpbml0aWFsaXplZCAmJiAhaW5pdGlhbGl6aW5nICYmICFhYm9ydGVkKSB7XG4gICAgLy8gVE9ETzogY3VycmVudGx5IFwiUFRocmVhZC50ZXJtaW5hdGVBbGxUaHJlYWRzKClcIiBpcyBub3QgZXhwb3NlZCBpbiB0aGUgd2FzbSBtb2R1bGUuXG4gICAgLy8gICAgICAgQW5kIHRoaXMgZnVuY3Rpb24gaXMgbm90IHlldCBjYWxsZWQgYnkgYW55IGNvZGUuXG4gICAgLy8gICAgICAgSWYgaXQgaXMgbmVlZGVkIGluIHRoZSBmdXR1cmUsIHdlIHNob3VsZCBleHBvc2UgaXQgaW4gdGhlIHdhc20gbW9kdWxlIGFuZCB1bmNvbW1lbnQgdGhlIGZvbGxvd2luZyBsaW5lLlxuXG4gICAgLy8gd2FzbT8uUFRocmVhZD8udGVybWluYXRlQWxsVGhyZWFkcygpO1xuICAgIHdhc20gPSB1bmRlZmluZWQ7XG5cbiAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIGFib3J0ZWQgPSB0cnVlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IGFsbG9jV2FzbVN0cmluZyA9IChkYXRhOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiBudW1iZXIgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBkYXRhTGVuZ3RoID0gd2FzbS5sZW5ndGhCeXRlc1VURjgoZGF0YSkgKyAxO1xuICBjb25zdCBkYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKGRhdGFMZW5ndGgpO1xuICB3YXNtLnN0cmluZ1RvVVRGOChkYXRhLCBkYXRhT2Zmc2V0LCBkYXRhTGVuZ3RoKTtcbiAgYWxsb2NzLnB1c2goZGF0YU9mZnNldCk7XG5cbiAgcmV0dXJuIGRhdGFPZmZzZXQ7XG59O1xuXG5pbnRlcmZhY2UgRXh0cmFPcHRpb25zSGFuZGxlciB7XG4gIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgaXRlcmF0ZUV4dHJhT3B0aW9ucyA9IChcbiAgb3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gIHByZWZpeDogc3RyaW5nLFxuICBzZWVuOiBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PixcbiAgaGFuZGxlcjogRXh0cmFPcHRpb25zSGFuZGxlcixcbik6IHZvaWQgPT4ge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xuICAgIGlmIChzZWVuLmhhcyhvcHRpb25zKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgaW4gb3B0aW9ucycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWVuLmFkZChvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBPYmplY3QuZW50cmllcyhvcHRpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBjb25zdCBuYW1lID0gcHJlZml4ID8gcHJlZml4ICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBuYW1lICsgJy4nLCBzZWVuLCBoYW5kbGVyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgaGFuZGxlcihuYW1lLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlID8gJzEnIDogJzAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBoYW5kbGUgZXh0cmEgY29uZmlnIHR5cGU6ICR7dHlwZW9mIHZhbHVlfWApO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIGNoZWNrIHdlYiBhc3NlbWJseSBBUEkncyBsYXN0IGVycm9yIGFuZCB0aHJvdyBlcnJvciBpZiBhbnkgZXJyb3Igb2NjdXJyZWQuXG4gKiBAcGFyYW0gbWVzc2FnZSBhIG1lc3NhZ2UgdXNlZCB3aGVuIGFuIGVycm9yIG9jY3VycmVkLlxuICovXG5leHBvcnQgY29uc3QgY2hlY2tMYXN0RXJyb3IgPSAobWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJhbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoOCk7XG4gICAgd2FzbS5fT3J0R2V0TGFzdEVycm9yKHBhcmFtc09mZnNldCwgcGFyYW1zT2Zmc2V0ICsgNCk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5IRUFQMzJbcGFyYW1zT2Zmc2V0IC8gNF07XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlUG9pbnRlciA9IHdhc20uSEVBUFUzMltwYXJhbXNPZmZzZXQgLyA0ICsgMV07XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlUG9pbnRlciA/IHdhc20uVVRGOFRvU3RyaW5nKGVycm9yTWVzc2FnZVBvaW50ZXIpIDogJyc7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9IEVSUk9SX0NPREU6ICR7ZXJyb3JDb2RlfSwgRVJST1JfTUVTU0FHRTogJHtlcnJvck1lc3NhZ2V9YCk7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHsgZ2V0SW5zdGFuY2UgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBhbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zIH0gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuZXhwb3J0IGNvbnN0IHNldFJ1bk9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcbiAgY29uc3QgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IHJ1bk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdHJ5IHtcbiAgICBpZiAob3B0aW9ucz8ubG9nU2V2ZXJpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPSAyOyAvLyBEZWZhdWx0IHRvIHdhcm5pbmdcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCAhPT0gJ251bWJlcicgfHxcbiAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCkgfHxcbiAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHxcbiAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA+IDRcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNlcnZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dTZXZlcml0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5sb2dWZXJib3NpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID0gMDsgLy8gRGVmYXVsdCB0byAwXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8udGVybWluYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMudGVybWluYXRlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHRhZ0RhdGFPZmZzZXQgPSAwO1xuICAgIGlmIChvcHRpb25zPy50YWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFnRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhvcHRpb25zLnRhZywgYWxsb2NzKTtcbiAgICB9XG5cbiAgICBydW5PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlUnVuT3B0aW9ucyhcbiAgICAgIHJ1bk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCEsXG4gICAgICBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsISxcbiAgICAgICEhcnVuT3B0aW9ucy50ZXJtaW5hdGUhLFxuICAgICAgdGFnRGF0YU9mZnNldCxcbiAgICApO1xuICAgIGlmIChydW5PcHRpb25zSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNyZWF0ZSBydW4gb3B0aW9ucy5cIik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmV4dHJhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnMob3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRSdW5Db25maWdFbnRyeShydW5PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHJ1biBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3J1bk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIGFsbG9jcy5mb3JFYWNoKChhbGxvYykgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7IGFsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3IsIGl0ZXJhdGVFeHRyYU9wdGlvbnMgfSBmcm9tICcuL3dhc20tdXRpbHMnO1xuXG5jb25zdCBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwgPSAoZ3JhcGhPcHRpbWl6YXRpb25MZXZlbDogc3RyaW5nIHwgdW5rbm93bik6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAoZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCkge1xuICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ2V4dGVuZGVkJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gOTk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZ3JhcGggb3B0aW1pemF0aW9uIGxldmVsOiAke2dyYXBoT3B0aW1pemF0aW9uTGV2ZWx9YCk7XG4gIH1cbn07XG5cbmNvbnN0IGdldEV4ZWN1dGlvbk1vZGUgPSAoZXhlY3V0aW9uTW9kZTogJ3NlcXVlbnRpYWwnIHwgJ3BhcmFsbGVsJyk6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAoZXhlY3V0aW9uTW9kZSkge1xuICAgIGNhc2UgJ3NlcXVlbnRpYWwnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAncGFyYWxsZWwnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZXhlY3V0aW9uIG1vZGU6ICR7ZXhlY3V0aW9uTW9kZX1gKTtcbiAgfVxufTtcblxuY29uc3QgYXBwZW5kRGVmYXVsdE9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IHZvaWQgPT4ge1xuICBpZiAoIW9wdGlvbnMuZXh0cmEpIHtcbiAgICBvcHRpb25zLmV4dHJhID0ge307XG4gIH1cbiAgaWYgKCFvcHRpb25zLmV4dHJhLnNlc3Npb24pIHtcbiAgICBvcHRpb25zLmV4dHJhLnNlc3Npb24gPSB7fTtcbiAgfVxuICBjb25zdCBzZXNzaW9uID0gb3B0aW9ucy5leHRyYS5zZXNzaW9uIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGlmICghc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIHNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSA9ICcxJztcbiAgfVxuXG4gIC8vIGlmIHVzaW5nIEpTRVAgd2l0aCBXZWJHUFUsIGFsd2F5cyBkaXNhYmxlIG1lbW9yeSBwYXR0ZXJuXG4gIGlmIChcbiAgICBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyAmJlxuICAgIG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzLnNvbWUoKGVwKSA9PiAodHlwZW9mIGVwID09PSAnc3RyaW5nJyA/IGVwIDogZXAubmFtZSkgPT09ICd3ZWJncHUnKVxuICApIHtcbiAgICBvcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4gPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3Qgc2V0RXhlY3V0aW9uUHJvdmlkZXJzID0gKFxuICBzZXNzaW9uT3B0aW9uc0hhbmRsZTogbnVtYmVyLFxuICBleGVjdXRpb25Qcm92aWRlcnM6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uRXhlY3V0aW9uUHJvdmlkZXJDb25maWdbXSxcbiAgYWxsb2NzOiBudW1iZXJbXSxcbik6IHZvaWQgPT4ge1xuICBmb3IgKGNvbnN0IGVwIG9mIGV4ZWN1dGlvblByb3ZpZGVycykge1xuICAgIGxldCBlcE5hbWUgPSB0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lO1xuXG4gICAgLy8gY2hlY2sgRVAgbmFtZVxuICAgIHN3aXRjaCAoZXBOYW1lKSB7XG4gICAgICBjYXNlICd3ZWJubic6XG4gICAgICAgIGVwTmFtZSA9ICdXRUJOTic7XG4gICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3Qgd2Vibm5PcHRpb25zID0gZXAgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgIC8vIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XG4gICAgICAgICAgY29uc3QgZGV2aWNlVHlwZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8uZGV2aWNlVHlwZTtcbiAgICAgICAgICBpZiAoZGV2aWNlVHlwZSkge1xuICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygnZGV2aWNlVHlwZScsIGFsbG9jcyk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoZGV2aWNlVHlwZSwgYWxsb2NzKTtcbiAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAnZGV2aWNlVHlwZScgLSAke2RldmljZVR5cGV9LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dlYmdwdSc6XG4gICAgICAgIGVwTmFtZSA9ICdKUyc7XG4gICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3Qgd2ViZ3B1T3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnM/LnByZWZlcnJlZExheW91dCkge1xuICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkNIVycgJiYgd2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgIT09ICdOSFdDJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHByZWZlcnJlZExheW91dCBtdXN0IGJlIGVpdGhlciAnTkNIVycgb3IgJ05IV0MnOiAke3dlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygncHJlZmVycmVkTGF5b3V0JywgYWxsb2NzKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCwgYWxsb2NzKTtcbiAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAncHJlZmVycmVkTGF5b3V0JyAtICR7d2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXR9LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dhc20nOlxuICAgICAgY2FzZSAnY3B1JzpcbiAgICAgICAgY29udGludWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZXhlY3V0aW9uIHByb3ZpZGVyOiAke2VwTmFtZX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBlcE5hbWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGVwTmFtZSwgYWxsb2NzKTtcbiAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QXBwZW5kRXhlY3V0aW9uUHJvdmlkZXIoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGVwTmFtZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYXBwZW5kIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9LmApO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNldFNlc3Npb25PcHRpb25zID0gKG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGNvbnN0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBzZXNzaW9uT3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGFwcGVuZERlZmF1bHRPcHRpb25zKHNlc3Npb25PcHRpb25zKTtcblxuICB0cnkge1xuICAgIGNvbnN0IGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPSBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwoc2Vzc2lvbk9wdGlvbnMuZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCA/PyAnYWxsJyk7XG4gICAgY29uc3QgZXhlY3V0aW9uTW9kZSA9IGdldEV4ZWN1dGlvbk1vZGUoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uTW9kZSA/PyAnc2VxdWVudGlhbCcpO1xuICAgIGNvbnN0IGxvZ0lkRGF0YU9mZnNldCA9XG4gICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMubG9nSWQgPT09ICdzdHJpbmcnID8gYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLmxvZ0lkLCBhbGxvY3MpIDogMDtcblxuICAgIGNvbnN0IGxvZ1NldmVyaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID8/IDI7IC8vIERlZmF1bHQgdG8gMiAtIHdhcm5pbmdcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nU2V2ZXJpdHlMZXZlbCkgfHwgbG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHwgbG9nU2V2ZXJpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNlcnZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nU2V2ZXJpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dWZXJib3NpdHlMZXZlbCA9IHNlc3Npb25PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID8/IDA7IC8vIERlZmF1bHQgdG8gMCAtIHZlcmJvc2VcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nVmVyYm9zaXR5TGV2ZWwpIHx8IGxvZ1ZlcmJvc2l0eUxldmVsIDwgMCB8fCBsb2dWZXJib3NpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nVmVyYm9zaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCA9XG4gICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCwgYWxsb2NzKVxuICAgICAgICA6IDA7XG5cbiAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZVNlc3Npb25PcHRpb25zKFxuICAgICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCxcbiAgICAgICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlQ3B1TWVtQXJlbmEsXG4gICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4sXG4gICAgICBleGVjdXRpb25Nb2RlLFxuICAgICAgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVQcm9maWxpbmcsXG4gICAgICAwLFxuICAgICAgbG9nSWREYXRhT2Zmc2V0LFxuICAgICAgbG9nU2V2ZXJpdHlMZXZlbCxcbiAgICAgIGxvZ1ZlcmJvc2l0eUxldmVsLFxuICAgICAgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCxcbiAgICApO1xuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjcmVhdGUgc2Vzc2lvbiBvcHRpb25zLlwiKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzKSB7XG4gICAgICBzZXRFeGVjdXRpb25Qcm92aWRlcnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycywgYWxsb2NzKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBlbmFibGVHcmFwaENhcHR1cmUgbXVzdCBiZSBhIGJvb2xlYW4gdmFsdWU6ICR7c2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlfWApO1xuICAgICAgfVxuICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygnZW5hYmxlR3JhcGhDYXB0dXJlJywgYWxsb2NzKTtcbiAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmUudG9TdHJpbmcoKSwgYWxsb2NzKTtcbiAgICAgIGlmICh3YXNtLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXG4gICAgICAgICAgYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAnZW5hYmxlR3JhcGhDYXB0dXJlJyAtICR7c2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlfS5gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nOiAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIodmFsdWUpIHx8IHZhbHVlIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgdmFsdWUgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyOiAke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcobmFtZSwgYWxsb2NzKTtcbiAgICAgICAgaWYgKHdhc20uX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZShzZXNzaW9uT3B0aW9uc0hhbmRsZSwgbmFtZU9mZnNldCwgdmFsdWUpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlOiAke25hbWV9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhzZXNzaW9uT3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cbiAgICBhbGxvY3MuZm9yRWFjaCgoYWxsb2MpID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG4vLyBhIGR1bW15IHR5cGUgZGVjbGFyYXRpb24gZm9yIEZsb2F0MTZBcnJheSBpbiBjYXNlIGFueSBwb2x5ZmlsbCBpcyBhdmFpbGFibGUuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgY29uc3QgRmxvYXQxNkFycmF5OiBhbnk7XG59XG5cbi8vIFRoaXMgZmlsZSBpbmNsdWRlcyBjb21tb24gZGVmaW5pdGlvbnMuIFRoZXkgZG8gTk9UIGhhdmUgZGVwZW5kZW5jeSBvbiB0aGUgV2ViQXNzZW1ibHkgaW5zdGFuY2UuXG5cbi8qKlxuICogQ29waWVkIGZyb20gT05OWCBkZWZpbml0aW9uLiBVc2UgdGhpcyB0byBkcm9wIGRlcGVuZGVuY3kgJ29ubnhfcHJvdG8nIHRvIGRlY3JlYXNlIGNvbXBpbGVkIC5qcyBmaWxlIHNpemUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIERhdGFUeXBlIHtcbiAgdW5kZWZpbmVkID0gMCxcbiAgZmxvYXQgPSAxLFxuICB1aW50OCA9IDIsXG4gIGludDggPSAzLFxuICB1aW50MTYgPSA0LFxuICBpbnQxNiA9IDUsXG4gIGludDMyID0gNixcbiAgaW50NjQgPSA3LFxuICBzdHJpbmcgPSA4LFxuICBib29sID0gOSxcbiAgZmxvYXQxNiA9IDEwLFxuICBkb3VibGUgPSAxMSxcbiAgdWludDMyID0gMTIsXG4gIHVpbnQ2NCA9IDEzLFxuICBjb21wbGV4NjQgPSAxNCxcbiAgY29tcGxleDEyOCA9IDE1LFxuICBiZmxvYXQxNiA9IDE2LFxuXG4gIC8vIDQtYml0IGRhdGEtdHlwZXNcbiAgdWludDQgPSAyMSxcbiAgaW50NCA9IDIyLFxufVxuXG4vKipcbiAqIE1hcCBzdHJpbmcgdGVuc29yIGRhdGEgdG8gZW51bSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0gPSAodHlwZTogc3RyaW5nKTogRGF0YVR5cGUgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdpbnQ4JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ4O1xuICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50ODtcbiAgICBjYXNlICdib29sJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5ib29sO1xuICAgIGNhc2UgJ2ludDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQxNjtcbiAgICBjYXNlICd1aW50MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQxNjtcbiAgICBjYXNlICdpbnQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MzI7XG4gICAgY2FzZSAndWludDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MzI7XG4gICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZmxvYXQxNjtcbiAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5mbG9hdDtcbiAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5kb3VibGU7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5zdHJpbmc7XG4gICAgY2FzZSAnaW50NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDY0O1xuICAgIGNhc2UgJ3VpbnQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDY0O1xuICAgIGNhc2UgJ2ludDQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDQ7XG4gICAgY2FzZSAndWludDQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ0O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGVudW0gdmFsdWUgdG8gc3RyaW5nIHRlbnNvciBkYXRhXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyA9ICh0eXBlUHJvdG86IERhdGFUeXBlKTogVGVuc29yLlR5cGUgPT4ge1xuICBzd2l0Y2ggKHR5cGVQcm90bykge1xuICAgIGNhc2UgRGF0YVR5cGUuaW50ODpcbiAgICAgIHJldHVybiAnaW50OCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50ODpcbiAgICAgIHJldHVybiAndWludDgnO1xuICAgIGNhc2UgRGF0YVR5cGUuYm9vbDpcbiAgICAgIHJldHVybiAnYm9vbCc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQxNjpcbiAgICAgIHJldHVybiAnaW50MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDE2OlxuICAgICAgcmV0dXJuICd1aW50MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50MzI6XG4gICAgICByZXR1cm4gJ2ludDMyJztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQzMjpcbiAgICAgIHJldHVybiAndWludDMyJztcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0MTY6XG4gICAgICByZXR1cm4gJ2Zsb2F0MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUuZmxvYXQ6XG4gICAgICByZXR1cm4gJ2Zsb2F0MzInO1xuICAgIGNhc2UgRGF0YVR5cGUuZG91YmxlOlxuICAgICAgcmV0dXJuICdmbG9hdDY0JztcbiAgICBjYXNlIERhdGFUeXBlLnN0cmluZzpcbiAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICBjYXNlIERhdGFUeXBlLmludDY0OlxuICAgICAgcmV0dXJuICdpbnQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50NjQ6XG4gICAgICByZXR1cm4gJ3VpbnQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ0OlxuICAgICAgcmV0dXJuICdpbnQ0JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ0OlxuICAgICAgcmV0dXJuICd1aW50NCc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZVByb3RvfWApO1xuICB9XG59O1xuXG4vKipcbiAqIGdldCB0ZW5zb3Igc2l6ZSBpbiBieXRlcyBieSB0aGUgZ2l2ZW4gZGF0YSB0eXBlIGFuZCBkaW1lbnNpb25zXG4gKiBAcmV0dXJucyBzaXplIGluIGludGVnZXIgb3IgdW5kZWZpbmVkIGlmIHRoZSBkYXRhIHR5cGUgaXMgbm90IHN1cHBvcnRlZFxuICovXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXMgPSAoXG4gIGRhdGVUeXBlOiBudW1iZXIsXG4gIGRpbXNPclNpemU6IHJlYWRvbmx5IG51bWJlcltdIHwgbnVtYmVyLFxuKTogbnVtYmVyIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgZWxlbWVudFNpemUgPSBbXG4gICAgLTEsIC8vIHVuZGVmaW5lZCA9IDBcbiAgICA0LCAvLyBmbG9hdCA9IDFcbiAgICAxLCAvLyB1aW50OCA9IDJcbiAgICAxLCAvLyBpbnQ4ID0gM1xuICAgIDIsIC8vIHVpbnQxNiA9IDRcbiAgICAyLCAvLyBpbnQxNiA9IDVcbiAgICA0LCAvLyBpbnQzMiA9IDZcbiAgICA4LCAvLyBpbnQ2NCA9IDdcbiAgICAtMSwgLy8gc3RyaW5nID0gOFxuICAgIDEsIC8vIGJvb2wgPSA5XG4gICAgMiwgLy8gZmxvYXQxNiA9IDEwXG4gICAgOCwgLy8gZG91YmxlID0gMTFcbiAgICA0LCAvLyB1aW50MzIgPSAxMlxuICAgIDgsIC8vIHVpbnQ2NCA9IDEzXG4gICAgLTEsIC8vIGNvbXBsZXg2NCA9IDE0XG4gICAgLTEsIC8vIGNvbXBsZXgxMjggPSAxNVxuICAgIC0xLCAvLyBiZmxvYXQxNiA9IDE2XG4gICAgLTEsIC8vIEZMT0FUOEU0TTNGTiA9IDE3XG4gICAgLTEsIC8vIEZMT0FUOEU0TTNGTlVaID0gMThcbiAgICAtMSwgLy8gRkxPQVQ4RTVNMiA9IDE5XG4gICAgLTEsIC8vIEZMT0FUOEU1TTJGTlVaID0gMjBcbiAgICAwLjUsIC8vIHVpbnQ0ID0gMjFcbiAgICAwLjUsIC8vIGludDQgPSAyMlxuICBdW2RhdGVUeXBlXTtcblxuICBjb25zdCBzaXplID0gdHlwZW9mIGRpbXNPclNpemUgPT09ICdudW1iZXInID8gZGltc09yU2l6ZSA6IGRpbXNPclNpemUucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSk7XG4gIHJldHVybiBlbGVtZW50U2l6ZSA+IDAgPyBNYXRoLmNlaWwoc2l6ZSAqIGVsZW1lbnRTaXplKSA6IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogZ2V0IHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yIGJ5IHRoZSBnaXZlbiB0ZW5zb3IgdHlwZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gKFxuICB0eXBlOiBUZW5zb3IuVHlwZSxcbik6XG4gIHwgRmxvYXQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQ4QXJyYXlDb25zdHJ1Y3RvclxuICB8IFVpbnQxNkFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQxNkFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBGbG9hdDY0QXJyYXlDb25zdHJ1Y3RvclxuICB8IFVpbnQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICAvLyBhbGxvdyBGbG9hdDE2QXJyYXkgcG9seWZpbGwuXG4gICAgICByZXR1cm4gdHlwZW9mIEZsb2F0MTZBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgRmxvYXQxNkFycmF5LmZyb20gPyBGbG9hdDE2QXJyYXkgOiBVaW50MTZBcnJheTtcbiAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgIHJldHVybiBGbG9hdDMyQXJyYXk7XG4gICAgY2FzZSAndWludDgnOlxuICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XG4gICAgY2FzZSAnaW50OCc6XG4gICAgICByZXR1cm4gSW50OEFycmF5O1xuICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICByZXR1cm4gVWludDE2QXJyYXk7XG4gICAgY2FzZSAnaW50MTYnOlxuICAgICAgcmV0dXJuIEludDE2QXJyYXk7XG4gICAgY2FzZSAnaW50MzInOlxuICAgICAgcmV0dXJuIEludDMyQXJyYXk7XG4gICAgY2FzZSAnYm9vbCc6XG4gICAgICByZXR1cm4gVWludDhBcnJheTtcbiAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgIHJldHVybiBGbG9hdDY0QXJyYXk7XG4gICAgY2FzZSAndWludDMyJzpcbiAgICAgIHJldHVybiBVaW50MzJBcnJheTtcbiAgICBjYXNlICdpbnQ2NCc6XG4gICAgICByZXR1cm4gQmlnSW50NjRBcnJheTtcbiAgICBjYXNlICd1aW50NjQnOlxuICAgICAgcmV0dXJuIEJpZ1VpbnQ2NEFycmF5O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGU6ICR7dHlwZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgc3RyaW5nIGxvZyBsZXZlbCB0byBpbnRlZ2VyIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBsb2dMZXZlbFN0cmluZ1RvRW51bSA9IChsb2dMZXZlbD86ICd2ZXJib3NlJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcicgfCAnZmF0YWwnKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2dMZXZlbCkge1xuICAgIGNhc2UgJ3ZlcmJvc2UnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2ZhdGFsJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7bG9nTGV2ZWx9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGVuc29yIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IEdQVSBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSA9ICh0eXBlOiBUZW5zb3IuVHlwZSk6IHR5cGUgaXMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcyA9PlxuICB0eXBlID09PSAnZmxvYXQzMicgfHxcbiAgdHlwZSA9PT0gJ2Zsb2F0MTYnIHx8XG4gIHR5cGUgPT09ICdpbnQzMicgfHxcbiAgdHlwZSA9PT0gJ2ludDY0JyB8fFxuICB0eXBlID09PSAndWludDMyJyB8fFxuICB0eXBlID09PSAndWludDgnIHx8XG4gIHR5cGUgPT09ICdib29sJyB8fFxuICB0eXBlID09PSAndWludDQnIHx8XG4gIHR5cGUgPT09ICdpbnQ0JztcblxuLyoqXG4gKiBNYXAgc3RyaW5nIGRhdGEgbG9jYXRpb24gdG8gaW50ZWdlciB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtID0gKGxvY2F0aW9uOiBUZW5zb3IuRGF0YUxvY2F0aW9uKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2NhdGlvbikge1xuICAgIGNhc2UgJ25vbmUnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgcmV0dXJuIDI7XG4gICAgY2FzZSAndGV4dHVyZSc6XG4gICAgICByZXR1cm4gMztcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgbG9jYXRpb246ICR7bG9jYXRpb259YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGludGVnZXIgZGF0YSBsb2NhdGlvbiB0byBzdHJpbmcgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvbkVudW1Ub1N0cmluZyA9IChsb2NhdGlvbjogbnVtYmVyKTogVGVuc29yLkRhdGFMb2NhdGlvbiB8IHVuZGVmaW5lZCA9PlxuICAoWydub25lJywgJ2NwdScsICdjcHUtcGlubmVkJywgJ3RleHR1cmUnLCAnZ3B1LWJ1ZmZlciddIGFzIGNvbnN0KVtsb2NhdGlvbl07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vd2FzbS11dGlscy1lbnYnO1xuXG4vKipcbiAqIExvYWQgYSBmaWxlIGludG8gYSBVaW50OEFycmF5LlxuICpcbiAqIEBwYXJhbSBmaWxlIC0gdGhlIGZpbGUgdG8gbG9hZC4gQ2FuIGJlIGEgVVJML3BhdGgsIGEgQmxvYiwgYW4gQXJyYXlCdWZmZXIsIG9yIGEgVWludDhBcnJheS5cbiAqIEByZXR1cm5zIGEgVWludDhBcnJheSBjb250YWluaW5nIHRoZSBmaWxlIGRhdGEuXG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkRmlsZSA9IGFzeW5jIChmaWxlOiBzdHJpbmcgfCBCbG9iIHwgQXJyYXlCdWZmZXJMaWtlIHwgVWludDhBcnJheSk6IFByb21pc2U8VWludDhBcnJheT4gPT4ge1xuICBpZiAodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgLy8gbG9hZCBmaWxlIGludG8gQXJyYXlCdWZmZXIgaW4gTm9kZS5qc1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyByZWFkRmlsZSB9ID0gcmVxdWlyZSgnbm9kZTpmcy9wcm9taXNlcycpO1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgcmVhZEZpbGUoZmlsZSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZS5jb2RlID09PSAnRVJSX0ZTX0ZJTEVfVE9PX0xBUkdFJykge1xuICAgICAgICAgIC8vIGZpbGUgaXMgdG9vIGxhcmdlLCB1c2UgZnMuY3JlYXRlUmVhZFN0cmVhbSBpbnN0ZWFkXG4gICAgICAgICAgY29uc3QgeyBjcmVhdGVSZWFkU3RyZWFtIH0gPSByZXF1aXJlKCdub2RlOmZzJyk7XG4gICAgICAgICAgY29uc3Qgc3RyZWFtID0gY3JlYXRlUmVhZFN0cmVhbShmaWxlKTtcbiAgICAgICAgICBjb25zdCBjaHVua3M6IFVpbnQ4QXJyYXlbXSA9IFtdO1xuICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2Ygc3RyZWFtKSB7XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGxvYWQgZmlsZSBpbnRvIEFycmF5QnVmZmVyIGluIGJyb3dzZXJzXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGZpbGUpO1xuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZhaWxlZCB0byBsb2FkIGV4dGVybmFsIGRhdGEgZmlsZTogJHtmaWxlfWApO1xuICAgICAgfVxuICAgICAgY29uc3QgY29udGVudExlbmd0aEhlYWRlciA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LUxlbmd0aCcpO1xuICAgICAgY29uc3QgZmlsZVNpemUgPSBjb250ZW50TGVuZ3RoSGVhZGVyID8gcGFyc2VJbnQoY29udGVudExlbmd0aEhlYWRlciwgMTApIDogMDtcbiAgICAgIGlmIChmaWxlU2l6ZSA8IDEwNzM3NDE4MjQgLyogMUdCICovKSB7XG4gICAgICAgIC8vIHdoZW4gQ29udGVudC1MZW5ndGggaGVhZGVyIGlzIG5vdCBzZXQsIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGZpbGUgc2l6ZS4gV2UgYXNzdW1lIGl0IGlzIHNtYWxsIGVub3VnaCB0b1xuICAgICAgICAvLyBsb2FkIGludG8gbWVtb3J5LlxuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmaWxlIGlzIHRvbyBsYXJnZSwgdXNlIHN0cmVhbSBpbnN0ZWFkXG4gICAgICAgIGlmICghcmVzcG9uc2UuYm9keSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZmFpbGVkIHRvIGxvYWQgZXh0ZXJuYWwgZGF0YSBmaWxlOiAke2ZpbGV9LCBubyByZXNwb25zZSBib2R5LmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7XG5cbiAgICAgICAgbGV0IGJ1ZmZlcjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyB0cnkgdG8gY3JlYXRlIEFycmF5QnVmZmVyIGRpcmVjdGx5XG4gICAgICAgICAgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGZpbGVTaXplKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgUmFuZ2VFcnJvcikge1xuICAgICAgICAgICAgLy8gdXNlIFdlYkFzc2VtYmx5IE1lbW9yeSB0byBhbGxvY2F0ZSBsYXJnZXIgQXJyYXlCdWZmZXJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VzID0gTWF0aC5jZWlsKGZpbGVTaXplIC8gNjU1MzYpO1xuICAgICAgICAgICAgYnVmZmVyID0gbmV3IFdlYkFzc2VtYmx5Lk1lbW9yeSh7IGluaXRpYWw6IHBhZ2VzLCBtYXhpbXVtOiBwYWdlcyB9KS5idWZmZXI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgY2h1bmtTaXplID0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICAgICAgICBjb25zdCBjaHVuayA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgb2Zmc2V0LCBjaHVua1NpemUpO1xuICAgICAgICAgIGNodW5rLnNldCh2YWx1ZSk7XG4gICAgICAgICAgb2Zmc2V0ICs9IGNodW5rU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCAwLCBmaWxlU2l6ZSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGZpbGUgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKSk7XG4gIH0gZWxzZSBpZiAoZmlsZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICByZXR1cm4gZmlsZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZmlsZSk7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFdlYk5OIEFQSSBjdXJyZW50bHkgZG9lcyBub3QgaGF2ZSBhIFR5cGVTY3JpcHQgZGVmaW5pdGlvbiBmaWxlLiBUaGlzIGZpbGUgaXMgYSB3b3JrYXJvdW5kIHdpdGggdHlwZXMgZ2VuZXJhdGVkIGZyb21cbi8vIFdlYk5OIEFQSSBzcGVjaWZpY2F0aW9uLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYm1hY2hpbmVsZWFybmluZy93ZWJubi9pc3N1ZXMvNjc3XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianNlcC93ZWJubi93ZWJubi5kLnRzXCIgLz5cblxuaW1wb3J0IHsgRW52LCBJbmZlcmVuY2VTZXNzaW9uLCBUZW5zb3IgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge1xuICBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcbiAgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLFxuICBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSxcbiAgVGVuc29yTWV0YWRhdGEsXG59IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xuaW1wb3J0IHsgc2V0UnVuT3B0aW9ucyB9IGZyb20gJy4vcnVuLW9wdGlvbnMnO1xuaW1wb3J0IHsgc2V0U2Vzc2lvbk9wdGlvbnMgfSBmcm9tICcuL3Nlc3Npb24tb3B0aW9ucyc7XG5pbXBvcnQge1xuICBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyxcbiAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtLFxuICBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUsXG4gIGxvZ0xldmVsU3RyaW5nVG9FbnVtLFxuICB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyxcbiAgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0sXG4gIHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcixcbn0gZnJvbSAnLi93YXNtLWNvbW1vbic7XG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7IGFsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3IgfSBmcm9tICcuL3dhc20tdXRpbHMnO1xuaW1wb3J0IHsgbG9hZEZpbGUgfSBmcm9tICcuL3dhc20tdXRpbHMtbG9hZC1maWxlJztcblxuLy8gI3JlZ2lvbiBJbml0aWFsaXphdGlvbnNcblxuLyoqXG4gKiBUaGVyZSBhcmUgNCBkaWZmZXJlbnQgXCJpbml0aWFsaXphdGlvblwiIHN0ZXBzIGZvciBPUlQuIFRoZXkgaGFwcGVuIGluIGRpZmZlcmVudCBwbGFjZXMgYW5kIGRpZmZlcmVudCB0aW1lLlxuICpcbiAqIDEuIEphdmFTY3JpcHQgaW5pdGlhbGl6YXRpb24gZm9yIG9ubnhydW50aW1lLWNvbW1vbiBhbmQgb25ueHJ1bnRpbWUtd2ViLlxuICogICAgVGhpcyBpcyB0aGUgZmlyc3QgaW5pdGlhbGl6YXRpb24gc3RlcC4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgY2FsbHMgb25ueHJ1bnRpbWUtY29tbW9uJ3MgcmVnaXN0ZXJCYWNrZW5kKClcbiAqIGZ1bmN0aW9uIG11bHRpcGxlIHRpbWVzIHRvIHJlZ2lzdGVyIGFsbCB0aGUgYXZhaWxhYmxlIGJhY2tlbmRzLiBUaGUgYmFja2VuZCByZWdpc3RyYXRpb24gaXMgdmVyeSBmYXN0LiBJdCBvbmx5XG4gKiByZWdpc3RlcnMgdGhlIGJhY2tlbmQgbmFtZSB3aXRoIHRoZSB1bmluaXRpYWxpemVkIGJhY2tlbmQgb2JqZWN0LiBObyBoZWF2eSBpbml0aWFsaXphdGlvbiBpcyBkb25lIGluIHRoaXMgc3RlcC5cbiAqICAgIFJlZmVyIHRvIHdlYi9saWIvaW5kZXgudHMgZm9yIHRoZSBiYWNrZW5kIHJlZ2lzdHJhdGlvbi5cbiAqXG4gKiAyLiBXZWJBc3NlbWJseSBhcnRpZmFjdCBpbml0aWFsaXphdGlvbi5cbiAqICAgIFRoaXMgaGFwcGVucyB3aGVuIGFueSByZWdpc3RlcmVkIHdhc20gYmFja2VuZCBpcyB1c2VkIGZvciB0aGUgZmlyc3QgdGltZSAoaWUuIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgb3JcbiAqIGBvcnQuVHJhaW5pbmdTZXNzaW9uLmNyZWF0ZSgpYCBpcyBjYWxsZWQpLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBkb2VzIHRoZSBmb2xsb3dpbmdzOlxuICogICAgIC0gY3JlYXRlIGEgcHJveHkgd29ya2VyIGFuZCBtYWtlIHN1cmUgdGhlIHByb3h5IHdvcmtlciBpcyByZWFkeSB0byByZWNlaXZlIG1lc3NhZ2VzLCBpZiBwcm94eSBpcyBlbmFibGVkLlxuICogICAgIC0gcGVyZm9ybSBmZWF0dXJlIGRldGVjdGlvbiwgbG9jYXRlIGNvcnJlY3QgV2ViQXNzZW1ibHkgYXJ0aWZhY3QgcGF0aCBhbmQgY2FsbCB0aGUgRW1zY3JpcHRlbiBnZW5lcmF0ZWRcbiAqIEphdmFTY3JpcHQgY29kZSB0byBpbml0aWFsaXplIHRoZSBXZWJBc3NlbWJseSBydW50aW1lLlxuICogICAgICAgICAtIGlmIHByb3h5IGlzIGVuYWJsZWQsIHRoaXMgc3RlcCBoYXBwZW5zIGluIHRoZSBwcm94eSB3b3JrZXIgdXNpbmcgbWVzc2FnZSAnaW5pdC13YXNtJy5cbiAqICAgICAgICAgLSBkb3dubG9hZGluZyB0aGUgJ29ydC13YXNtey4uLn0ud2FzbScgZmlsZSBpcyBkb25lIGluIHRoaXMgc3RlcC5cbiAqICAgICAgICAgLSBpZiBtdWx0aS10aHJlYWQgaXMgZW5hYmxlZCwgb25lIG9yIG1vcmUgd2Vid29ya2VyIHdpbGwgYmUgY3JlYXRlZCB0byBpbml0aWFsaXplIHRoZSBQVGhyZWFkIHRocmVhZHBvb2wuXG4gKlxuICogMy4gT1JUIGVudmlyb25tZW50IGluaXRpYWxpemF0aW9uLlxuICogICAgVGhpcyBoYXBwZW5zIGFmdGVyIHN0ZXAgMi4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgcGVyZm9ybXMgT05OWCBSdW50aW1lIGVudmlyb25tZW50IGluaXRpYWxpemF0aW9uLlxuICogRnVuY3Rpb24gYF9PcnRJbml0KClgIGlzIGNhbGxlZCBpbiB0aGlzIHN0ZXAuXG4gKiAgICAgLSBpZiBwcm94eSBpcyBlbmFibGVkLCB0aGlzIHN0ZXAgaGFwcGVucyBpbiB0aGUgcHJveHkgd29ya2VyIHVzaW5nIG1lc3NhZ2UgJ2luaXQtb3J0Jy5cbiAqICAgICAtIGxvZ2dpbmcgbGV2ZWwgKG9ydC5lbnYubG9nTGV2ZWwpIGFuZCB0aHJlYWQgbnVtYmVyIChvcnQuZW52Lndhc20ubnVtVGhyZWFkcykgYXJlIHNldCBpbiB0aGlzIHN0ZXAuXG4gKlxuICogNC4gU2Vzc2lvbiBpbml0aWFsaXphdGlvbi5cbiAqICAgIFRoaXMgaGFwcGVucyB3aGVuIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgb3IgYG9ydC5UcmFpbmluZ1Nlc3Npb24uY3JlYXRlKClgIGlzIGNhbGxlZC4gVW5saWtlIHRoZSBmaXJzdCAzXG4gKiBzdGVwcyAodGhleSBvbmx5IGNhbGxlZCBvbmNlKSwgdGhpcyBzdGVwIHdpbGwgYmUgZG9uZSBmb3IgZWFjaCBzZXNzaW9uLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBkb2VzIHRoZVxuICogZm9sbG93aW5nczpcbiAqICAgIElmIHRoZSBwYXJhbWV0ZXIgaXMgYSBVUkw6XG4gKiAgICAtIGRvd25sb2FkIHRoZSBtb2RlbCBkYXRhIGZyb20gdGhlIFVSTC5cbiAqICAgIC0gY29weSB0aGUgbW9kZWwgZGF0YSB0byB0aGUgV0FTTSBoZWFwLiAocHJveHk6ICdjb3B5LWZyb20nKVxuICogICAgLSBkZXJlZmVyZW5jZSB0aGUgbW9kZWwgYnVmZmVyLiBUaGlzIHN0ZXAgYWxsb3dzIHRoZSBvcmlnaW5hbCBBcnJheUJ1ZmZlciB0byBiZSBnYXJiYWdlIGNvbGxlY3RlZC5cbiAqICAgIC0gY2FsbCBgX09ydENyZWF0ZVNlc3Npb24oKWAgdG8gY3JlYXRlIHRoZSBzZXNzaW9uLiAocHJveHk6ICdjcmVhdGUnKVxuICpcbiAqICAgIElmIHRoZSBwYXJhbWV0ZXIgaXMgYSBVaW50OEFycmF5IG9iamVjdDpcbiAqICAgIC0gY29weSB0aGUgbW9kZWwgZGF0YSB0byB0aGUgV0FTTSBoZWFwLiAocHJveHk6ICdjb3B5LWZyb20nKVxuICogICAgLSBjYWxsIGBfT3J0Q3JlYXRlU2Vzc2lvbigpYCB0byBjcmVhdGUgdGhlIHNlc3Npb24uIChwcm94eTogJ2NyZWF0ZScpXG4gKlxuICpcbiAqL1xuXG4vKipcbiAqIGluaXRpYWxpemUgT1JUIGVudmlyb25tZW50LlxuICpcbiAqIEBwYXJhbSBudW1UaHJlYWRzIFNldEdsb2JhbEludHJhT3BOdW1UaHJlYWRzKG51bVRocmVhZHMpXG4gKiBAcGFyYW0gbG9nZ2luZ0xldmVsIENyZWF0ZUVudihzdGF0aWNfY2FzdDxPcnRMb2dnaW5nTGV2ZWw+KGxvZ2dpbmdfbGV2ZWwpKVxuICovXG5jb25zdCBpbml0T3J0ID0gKG51bVRocmVhZHM6IG51bWJlciwgbG9nZ2luZ0xldmVsOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgY29uc3QgZXJyb3JDb2RlID0gZ2V0SW5zdGFuY2UoKS5fT3J0SW5pdChudW1UaHJlYWRzLCBsb2dnaW5nTGV2ZWwpO1xuICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBpbml0aWFsaXplIG9ubnhydW50aW1lLlwiKTtcbiAgfVxufTtcblxuLyoqXG4gKiBpbml0aWFsaXplIHJ1bnRpbWUgZW52aXJvbm1lbnQuXG4gKiBAcGFyYW0gZW52IHBhc3NlZCBpbiB0aGUgZW52aXJvbm1lbnQgY29uZmlnIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRSdW50aW1lID0gYXN5bmMgKGVudjogRW52KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIC8vIGluaXQgT1JUXG4gIGluaXRPcnQoZW52Lndhc20ubnVtVGhyZWFkcyEsIGxvZ0xldmVsU3RyaW5nVG9FbnVtKGVudi5sb2dMZXZlbCkpO1xufTtcblxuLyoqXG4gKiBwZXJmb3JtIEVQIHNwZWNpZmljIGluaXRpYWxpemF0aW9uLlxuICpcbiAqIEBwYXJhbSBlbnZcbiAqIEBwYXJhbSBlcE5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRFcCA9IGFzeW5jIChlbnY6IEVudiwgZXBOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gICAgY29uc3QgaW5pdEpzZXAgPSByZXF1aXJlKCcuL2pzZXAvaW5pdCcpLmluaXQ7XG5cbiAgICBpZiAoZXBOYW1lID09PSAnd2ViZ3B1Jykge1xuICAgICAgLy8gcGVyZm9ybSBXZWJHUFUgYXZhaWxhYmlsaXR5IGNoZWNrXG4gICAgICBpZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgfHwgIW5hdmlnYXRvci5ncHUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJHUFUgaXMgbm90IHN1cHBvcnRlZCBpbiBjdXJyZW50IGVudmlyb25tZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBhZGFwdGVyID0gZW52LndlYmdwdS5hZGFwdGVyIGFzIEdQVUFkYXB0ZXIgfCBudWxsO1xuICAgICAgaWYgKCFhZGFwdGVyKSB7XG4gICAgICAgIC8vIGlmIGFkYXB0ZXIgaXMgbm90IHNldCwgcmVxdWVzdCBhIG5ldyBhZGFwdGVyLlxuICAgICAgICBjb25zdCBwb3dlclByZWZlcmVuY2UgPSBlbnYud2ViZ3B1LnBvd2VyUHJlZmVyZW5jZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBvd2VyUHJlZmVyZW5jZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgcG93ZXJQcmVmZXJlbmNlICE9PSAnbG93LXBvd2VyJyAmJlxuICAgICAgICAgIHBvd2VyUHJlZmVyZW5jZSAhPT0gJ2hpZ2gtcGVyZm9ybWFuY2UnXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwb3dlclByZWZlcmVuY2Ugc2V0dGluZzogXCIke3Bvd2VyUHJlZmVyZW5jZX1cImApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcmNlRmFsbGJhY2tBZGFwdGVyID0gZW52LndlYmdwdS5mb3JjZUZhbGxiYWNrQWRhcHRlcjtcbiAgICAgICAgaWYgKGZvcmNlRmFsbGJhY2tBZGFwdGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGZvcmNlRmFsbGJhY2tBZGFwdGVyICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZm9yY2VGYWxsYmFja0FkYXB0ZXIgc2V0dGluZzogXCIke2ZvcmNlRmFsbGJhY2tBZGFwdGVyfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgYWRhcHRlciA9IGF3YWl0IG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoeyBwb3dlclByZWZlcmVuY2UsIGZvcmNlRmFsbGJhY2tBZGFwdGVyIH0pO1xuICAgICAgICBpZiAoIWFkYXB0ZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnRmFpbGVkIHRvIGdldCBHUFUgYWRhcHRlci4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IG5lZWQgdG8gZW5hYmxlIGZsYWcgXCItLWVuYWJsZS11bnNhZmUtd2ViZ3B1XCIgaWYgeW91IGFyZSB1c2luZyBDaHJvbWUuJyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBhZGFwdGVyIGlzIHNldCwgdmFsaWRhdGUgaXQuXG4gICAgICAgIGlmIChcbiAgICAgICAgICB0eXBlb2YgYWRhcHRlci5saW1pdHMgIT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgdHlwZW9mIGFkYXB0ZXIuZmVhdHVyZXMgIT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgdHlwZW9mIGFkYXB0ZXIucmVxdWVzdERldmljZSAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgR1BVIGFkYXB0ZXIgc2V0IGluIGBlbnYud2ViZ3B1LmFkYXB0ZXJgLiBJdCBtdXN0IGJlIGEgR1BVQWRhcHRlciBvYmplY3QuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXdhaXQgaW5pdEpzZXAoJ3dlYmdwdScsIGdldEluc3RhbmNlKCksIGVudiwgYWRhcHRlcik7XG4gICAgfVxuICAgIGlmIChlcE5hbWUgPT09ICd3ZWJubicpIHtcbiAgICAgIC8vIHBlcmZvcm0gV2ViTk4gYXZhaWxhYmlsaXR5IGNoZWNrXG4gICAgICBpZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgfHwgIShuYXZpZ2F0b3IgYXMgdW5rbm93biBhcyB7IG1sOiB1bmtub3duIH0pLm1sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViTk4gaXMgbm90IHN1cHBvcnRlZCBpbiBjdXJyZW50IGVudmlyb25tZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IGluaXRKc2VwKCd3ZWJubicsIGdldEluc3RhbmNlKCksIGVudik7XG4gICAgfVxuICB9XG59O1xuXG4vLyAjZW5kcmVnaW9uIEluaXRpYWxpemF0aW9uc1xuXG4vKipcbiAqIHZhbGlkIGRhdGEgbG9jYXRpb25zIGZvciBpbnB1dC9vdXRwdXQgdGVuc29ycy5cbiAqL1xudHlwZSBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dCA9ICdjcHUnIHwgJ2NwdS1waW5uZWQnIHwgJ2dwdS1idWZmZXInO1xuXG50eXBlIElPQmluZGluZ1N0YXRlID0ge1xuICAvKipcbiAgICogdGhlIGhhbmRsZSBvZiBJTyBiaW5kaW5nLlxuICAgKi9cbiAgcmVhZG9ubHkgaGFuZGxlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cbiAgICpcbiAgICogdmFsdWUgaXMgb25lIG9mICdjcHUnLCAnY3B1LXBpbm5lZCcsICdncHUtYnVmZmVyJy5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogcmVhZG9ubHkgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXTtcblxuICAvKipcbiAgICogZW51bSB2YWx1ZSBvZiB0aGUgcHJlZmVycmVkIGxvY2F0aW9uIGZvciBlYWNoIG91dHB1dCB0ZW5zb3IuXG4gICAqL1xuICByZWFkb25seSBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkOiByZWFkb25seSBudW1iZXJbXTtcbn07XG5cbi8qKlxuICogIHR1cGxlIGVsZW1lbnRzIGFyZTogSW5mZXJlbmNlU2Vzc2lvbiBJRDsgaW5wdXROYW1lc1VURjhFbmNvZGVkOyBvdXRwdXROYW1lc1VURjhFbmNvZGVkOyBiaW5kaW5nU3RhdGVcbiAqL1xudHlwZSBTZXNzaW9uTWV0YWRhdGEgPSBbXG4gIGluZmVyZW5jZVNlc3Npb25JZDogbnVtYmVyLFxuICBpbnB1dE5hbWVzVVRGOEVuY29kZWQ6IG51bWJlcltdLFxuICBvdXRwdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSxcbiAgYmluZGluZ1N0YXRlOiBJT0JpbmRpbmdTdGF0ZSB8IG51bGwsXG4gIGVuYWJsZUdyYXBoQ2FwdHVyZTogYm9vbGVhbixcbiAgaW5wdXRPdXRwdXRCb3VuZDogYm9vbGVhbixcbl07XG5cbmNvbnN0IGFjdGl2ZVNlc3Npb25zID0gbmV3IE1hcDxudW1iZXIsIFNlc3Npb25NZXRhZGF0YT4oKTtcblxuLyoqXG4gKiBnZXQgdGhlIGlucHV0L291dHB1dCBjb3VudCBvZiB0aGUgc2Vzc2lvbi5cbiAqIEBwYXJhbSBzZXNzaW9uSGFuZGxlIHRoZSBoYW5kbGUgcmVwcmVzZW50aW5nIHRoZSBzZXNzaW9uLiBzaG91bGQgYmUgbm9uLXplcm8uXG4gKiBAcmV0dXJucyBhIHR1cGxlIGluY2x1ZGluZyAyIG51bWJlcnMsIHJlcHJlc2VudGluZyB0aGUgaW5wdXQgY291bnQgYW5kIG91dHB1dCBjb3VudC5cbiAqL1xuY29uc3QgZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQgPSAoc2Vzc2lvbkhhbmRsZTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg4KTtcbiAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRHZXRJbnB1dE91dHB1dENvdW50KHNlc3Npb25IYW5kbGUsIGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyA0KTtcbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBzZXNzaW9uIGlucHV0L291dHB1dCBjb3VudC5cIik7XG4gICAgfVxuICAgIHJldHVybiBbd2FzbS5IRUFQMzJbZGF0YU9mZnNldCAvIDRdLCB3YXNtLkhFQVAzMltkYXRhT2Zmc2V0IC8gNCArIDFdXTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogYWxsb2NhdGUgdGhlIG1lbW9yeSBhbmQgbWVtY3B5IHRoZSBleHRlcm5hbCBidWZmZXIuXG4gKlxuICogQHBhcmFtIG1vZGVsIC0gdGhlIGV4dGVybmFsIGJ1ZmZlciBjb250YWluaW5nIHRoZSBtb2RlbCBkYXRhLiBNdXN0IG5vdCBiZSB0aGUgc2FtZSBidWZmZXIgYXMgdGhlIFdBU00gaGVhcC5cbiAqIEByZXR1cm5zIGEgMi1lbGVtZW50cyB0dXBsZSAtIHRoZSBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBhbGxvY2F0ZWQgYnVmZmVyXG4gKi9cbmV4cG9ydCBjb25zdCBjb3B5RnJvbUV4dGVybmFsQnVmZmVyID0gKG1vZGVsOiBVaW50OEFycmF5KTogW251bWJlciwgbnVtYmVyXSA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBtb2RlbERhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MobW9kZWwuYnl0ZUxlbmd0aCk7XG4gIGlmIChtb2RlbERhdGFPZmZzZXQgPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGNyZWF0ZSBhIHNlc3Npb24uIGZhaWxlZCB0byBhbGxvY2F0ZSBhIGJ1ZmZlciBvZiBzaXplICR7bW9kZWwuYnl0ZUxlbmd0aH0uYCk7XG4gIH1cbiAgd2FzbS5IRUFQVTguc2V0KG1vZGVsLCBtb2RlbERhdGFPZmZzZXQpO1xuICByZXR1cm4gW21vZGVsRGF0YU9mZnNldCwgbW9kZWwuYnl0ZUxlbmd0aF07XG59O1xuXG4vKipcbiAqIGNyZWF0ZSBhbiBpbmZlcmVuY2Ugc2Vzc2lvbiBmcm9tIGEgbW9kZWwgZGF0YSBidWZmZXIuXG4gKlxuICogQHBhcmFtIG1vZGVsRGF0YSAtIGVpdGhlciBhIFVpbnQ4QXJyYXkgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbW9kZWwgZGF0YSwgb3IgYSAyLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgdGhlXG4gKiAgICAgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YSBidWZmZXIuXG4gKiBAcGFyYW0gb3B0aW9ucyBhbiBvcHRpb25hbCBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0LlxuICogQHJldHVybnMgYSAzLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgW3Nlc3Npb24gaGFuZGxlLCBpbnB1dCBuYW1lcywgb3V0cHV0IG5hbWVzXVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9IGFzeW5jIChcbiAgbW9kZWxEYXRhOiBVaW50OEFycmF5IHwgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsXG4gIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuKTogUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+ID0+IHtcbiAgbGV0IG1vZGVsRGF0YU9mZnNldDogbnVtYmVyLCBtb2RlbERhdGFMZW5ndGg6IG51bWJlcjtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkobW9kZWxEYXRhKSkge1xuICAgIC8vIGlmIG1vZGVsIGRhdGEgaXMgYW4gYXJyYXksIGl0IG11c3QgYmUgYSAyLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIG1vZGVsIGRhdGFcbiAgICBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGhdID0gbW9kZWxEYXRhO1xuICB9IGVsc2UgaWYgKG1vZGVsRGF0YS5idWZmZXIgPT09IHdhc20uSEVBUFU4LmJ1ZmZlcikge1xuICAgIC8vIGlmIG1vZGVsIGRhdGEgdXNlcyB0aGUgc2FtZSBidWZmZXIgYXMgdGhlIFdBU00gaGVhcCwgd2UgZG9uJ3QgbmVlZCB0byBjb3B5IGl0LlxuICAgIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aF0gPSBbbW9kZWxEYXRhLmJ5dGVPZmZzZXQsIG1vZGVsRGF0YS5ieXRlTGVuZ3RoXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGhlcndpc2UsIGNvcHkgdGhlIG1vZGVsIGRhdGEgdG8gdGhlIFdBU00gaGVhcC5cbiAgICBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGhdID0gY29weUZyb21FeHRlcm5hbEJ1ZmZlcihtb2RlbERhdGEpO1xuICB9XG5cbiAgbGV0IHNlc3Npb25IYW5kbGUgPSAwO1xuICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xuICBsZXQgaW9CaW5kaW5nSGFuZGxlID0gMDtcbiAgbGV0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gW107XG4gIGNvbnN0IG91dHB1dE5hbWVzVVRGOEVuY29kZWQgPSBbXTtcblxuICB0cnkge1xuICAgIFtzZXNzaW9uT3B0aW9uc0hhbmRsZSwgYWxsb2NzXSA9IHNldFNlc3Npb25PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnM/LmV4dGVybmFsRGF0YSAmJiB3YXNtLm1vdW50RXh0ZXJuYWxEYXRhKSB7XG4gICAgICBjb25zdCBsb2FkaW5nUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBvcHRpb25zLmV4dGVybmFsRGF0YSkge1xuICAgICAgICBjb25zdCBwYXRoID0gdHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnID8gZmlsZSA6IGZpbGUucGF0aDtcbiAgICAgICAgbG9hZGluZ1Byb21pc2VzLnB1c2goXG4gICAgICAgICAgbG9hZEZpbGUodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnID8gZmlsZSA6IGZpbGUuZGF0YSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgd2FzbS5tb3VudEV4dGVybmFsRGF0YSEocGF0aCwgZGF0YSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIHdhaXQgZm9yIGFsbCBleHRlcm5hbCBkYXRhIGZpbGVzIHRvIGJlIGxvYWRlZFxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobG9hZGluZ1Byb21pc2VzKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3ZpZGVyIG9mIG9wdGlvbnM/LmV4ZWN1dGlvblByb3ZpZGVycyA/PyBbXSkge1xuICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gdHlwZW9mIHByb3ZpZGVyID09PSAnc3RyaW5nJyA/IHByb3ZpZGVyIDogcHJvdmlkZXIubmFtZTtcbiAgICAgIGlmIChwcm92aWRlck5hbWUgPT09ICd3ZWJubicpIHtcbiAgICAgICAgaWYgKHdhc20uY3VycmVudENvbnRleHQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYk5OIGV4ZWN1dGlvbiBwcm92aWRlciBpcyBhbHJlYWR5IHNldC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHByb3ZpZGVyICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIGNvbnN0IHdlYm5uT3B0aW9ucyA9IHByb3ZpZGVyIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICAgICAgICBjb25zdCBjb250ZXh0ID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OT3B0aW9uc1dpdGhNTENvbnRleHQpPy5jb250ZXh0O1xuICAgICAgICAgIGNvbnN0IGdwdURldmljZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTk9wdGlvbnNXZWJHcHUpPy5ncHVEZXZpY2U7XG4gICAgICAgICAgY29uc3QgZGV2aWNlVHlwZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8uZGV2aWNlVHlwZTtcbiAgICAgICAgICBjb25zdCBudW1UaHJlYWRzID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OQ29udGV4dE9wdGlvbnMpPy5udW1UaHJlYWRzO1xuICAgICAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8ucG93ZXJQcmVmZXJlbmNlO1xuICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gY29udGV4dCBhcyBNTENvbnRleHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChncHVEZXZpY2UpIHtcbiAgICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCBuYXZpZ2F0b3IubWwuY3JlYXRlQ29udGV4dChncHVEZXZpY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gYXdhaXQgbmF2aWdhdG9yLm1sLmNyZWF0ZUNvbnRleHQoeyBkZXZpY2VUeXBlLCBudW1UaHJlYWRzLCBwb3dlclByZWZlcmVuY2UgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCBuYXZpZ2F0b3IubWwuY3JlYXRlQ29udGV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNlc3Npb25IYW5kbGUgPSBhd2FpdCB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uKG1vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoLCBzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgaWYgKHNlc3Npb25IYW5kbGUgPT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY3JlYXRlIGEgc2Vzc2lvbi5cIik7XG4gICAgfVxuXG4gICAgLy8gY2xlYXIgY3VycmVudCBNTENvbnRleHQgYWZ0ZXIgc2Vzc2lvbiBjcmVhdGlvblxuICAgIGlmICh3YXNtLmN1cnJlbnRDb250ZXh0KSB7XG4gICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IFtpbnB1dENvdW50LCBvdXRwdXRDb3VudF0gPSBnZXRTZXNzaW9uSW5wdXRPdXRwdXRDb3VudChzZXNzaW9uSGFuZGxlKTtcblxuICAgIGNvbnN0IGVuYWJsZUdyYXBoQ2FwdHVyZSA9ICEhb3B0aW9ucz8uZW5hYmxlR3JhcGhDYXB0dXJlO1xuXG4gICAgY29uc3QgaW5wdXROYW1lcyA9IFtdO1xuICAgIGNvbnN0IG91dHB1dE5hbWVzID0gW107XG4gICAgY29uc3Qgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zOiBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dFtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IG5hbWUgPSB3YXNtLl9PcnRHZXRJbnB1dE5hbWUoc2Vzc2lvbkhhbmRsZSwgaSk7XG4gICAgICBpZiAobmFtZSA9PT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBpbnB1dCBuYW1lLlwiKTtcbiAgICAgIH1cbiAgICAgIGlucHV0TmFtZXNVVEY4RW5jb2RlZC5wdXNoKG5hbWUpO1xuICAgICAgaW5wdXROYW1lcy5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG5hbWUpKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCBuYW1lID0gd2FzbS5fT3J0R2V0T3V0cHV0TmFtZShzZXNzaW9uSGFuZGxlLCBpKTtcbiAgICAgIGlmIChuYW1lID09PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZ2V0IGFuIG91dHB1dCBuYW1lLlwiKTtcbiAgICAgIH1cbiAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lKTtcbiAgICAgIGNvbnN0IG5hbWVTdHJpbmcgPSB3YXNtLlVURjhUb1N0cmluZyhuYW1lKTtcbiAgICAgIG91dHB1dE5hbWVzLnB1c2gobmFtZVN0cmluZyk7XG5cbiAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX0pTRVApIHtcbiAgICAgICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2goJ2dwdS1idWZmZXInKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9XG4gICAgICAgICAgdHlwZW9mIG9wdGlvbnM/LnByZWZlcnJlZE91dHB1dExvY2F0aW9uID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBvcHRpb25zLnByZWZlcnJlZE91dHB1dExvY2F0aW9uXG4gICAgICAgICAgICA6IChvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj8uW25hbWVTdHJpbmddID8/ICdjcHUnKTtcbiAgICAgICAgaWYgKGxvY2F0aW9uICE9PSAnY3B1JyAmJiBsb2NhdGlvbiAhPT0gJ2NwdS1waW5uZWQnICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcHJlZmVycmVkIG91dHB1dCBsb2NhdGlvbjogJHtsb2NhdGlvbn0uYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYE5vdCBzdXBwb3J0ZWQgcHJlZmVycmVkIG91dHB1dCBsb2NhdGlvbjogJHtsb2NhdGlvbn0uIE9ubHkgJ2dwdS1idWZmZXInIGxvY2F0aW9uIGlzIHN1cHBvcnRlZCB3aGVuIGVuYWJsZUdyYXBoQ2FwdHVyZSBpcyB0cnVlLmAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMucHVzaChsb2NhdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXNlIElPIGJpbmRpbmcgb25seSB3aGVuIGF0IGxlYXN0IG9uZSBvdXRwdXQgaXMgcHJlZmZlcmVkIHRvIGJlIG9uIEdQVS5cbiAgICBsZXQgYmluZGluZ1N0YXRlOiBJT0JpbmRpbmdTdGF0ZSB8IG51bGwgPSBudWxsO1xuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgJiYgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnNvbWUoKGwpID0+IGwgPT09ICdncHUtYnVmZmVyJykpIHtcbiAgICAgIGlvQmluZGluZ0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZUJpbmRpbmcoc2Vzc2lvbkhhbmRsZSk7XG4gICAgICBpZiAoaW9CaW5kaW5nSGFuZGxlID09PSAwKSB7XG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY3JlYXRlIElPIGJpbmRpbmcuXCIpO1xuICAgICAgfVxuXG4gICAgICBiaW5kaW5nU3RhdGUgPSB7XG4gICAgICAgIGhhbmRsZTogaW9CaW5kaW5nSGFuZGxlLFxuICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsXG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5tYXAoKGwpID0+IGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bShsKSksXG4gICAgICB9O1xuICAgIH1cblxuICAgIGFjdGl2ZVNlc3Npb25zLnNldChzZXNzaW9uSGFuZGxlLCBbXG4gICAgICBzZXNzaW9uSGFuZGxlLFxuICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLFxuICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCxcbiAgICAgIGJpbmRpbmdTdGF0ZSxcbiAgICAgIGVuYWJsZUdyYXBoQ2FwdHVyZSxcbiAgICAgIGZhbHNlLFxuICAgIF0pO1xuICAgIHJldHVybiBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lcywgb3V0cHV0TmFtZXNdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goKGJ1ZikgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goKGJ1ZikgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcblxuICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgIT09IDApIHtcbiAgICAgIHdhc20uX09ydFJlbGVhc2VCaW5kaW5nKGlvQmluZGluZ0hhbmRsZSk7XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25IYW5kbGUgIT09IDApIHtcbiAgICAgIHdhc20uX09ydFJlbGVhc2VTZXNzaW9uKHNlc3Npb25IYW5kbGUpO1xuICAgIH1cbiAgICB0aHJvdyBlO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uX2ZyZWUobW9kZWxEYXRhT2Zmc2V0KTtcbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgIT09IDApIHtcbiAgICAgIHdhc20uX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucyhzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIGFsbG9jcy5mb3JFYWNoKChhbGxvYykgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xuXG4gICAgLy8gdW5tb3VudCBleHRlcm5hbCBkYXRhIGlmIG5lY2Vzc2FyeVxuICAgIHdhc20udW5tb3VudEV4dGVybmFsRGF0YT8uKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByZWxlYXNlU2Vzc2lvbiA9IChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xuICBpZiAoIXNlc3Npb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCByZWxlYXNlIHNlc3Npb24uIGludmFsaWQgc2Vzc2lvbiBpZDogJHtzZXNzaW9uSWR9YCk7XG4gIH1cbiAgY29uc3QgW3Nlc3Npb25IYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZCwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCwgaW9CaW5kaW5nU3RhdGUsIGVuYWJsZUdyYXBoQ2FwdHVyZV0gPSBzZXNzaW9uO1xuXG4gIGlmIChpb0JpbmRpbmdTdGF0ZSkge1xuICAgIGlmIChlbmFibGVHcmFwaENhcHR1cmUpIHtcbiAgICAgIHdhc20uX09ydENsZWFyQm91bmRPdXRwdXRzKGlvQmluZGluZ1N0YXRlLmhhbmRsZSk7XG4gICAgfVxuICAgIHdhc20uX09ydFJlbGVhc2VCaW5kaW5nKGlvQmluZGluZ1N0YXRlLmhhbmRsZSk7XG4gIH1cblxuICB3YXNtLmpzZXBPblJlbGVhc2VTZXNzaW9uPy4oc2Vzc2lvbklkKTtcblxuICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLmZvckVhY2goKGJ1ZikgPT4gd2FzbS5fT3J0RnJlZShidWYpKTtcbiAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb24oc2Vzc2lvbkhhbmRsZSk7XG4gIGFjdGl2ZVNlc3Npb25zLmRlbGV0ZShzZXNzaW9uSWQpO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXBhcmVJbnB1dE91dHB1dFRlbnNvciA9IChcbiAgdGVuc29yOiBUZW5zb3JNZXRhZGF0YSB8IG51bGwsXG4gIHRlbnNvckhhbmRsZXM6IG51bWJlcltdLFxuICBhbGxvY3M6IG51bWJlcltdLFxuICBzZXNzaW9uSWQ6IG51bWJlcixcbiAgaW5kZXg6IG51bWJlcixcbiAgZW5hYmxlR3JhcGhDYXB0dXJlID0gZmFsc2UsXG4pOiB2b2lkID0+IHtcbiAgaWYgKCF0ZW5zb3IpIHtcbiAgICB0ZW5zb3JIYW5kbGVzLnB1c2goMCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG5cbiAgY29uc3QgZGF0YVR5cGUgPSB0ZW5zb3JbMF07XG4gIGNvbnN0IGRpbXMgPSB0ZW5zb3JbMV07XG4gIGNvbnN0IGxvY2F0aW9uID0gdGVuc29yWzNdO1xuXG4gIGxldCByYXdEYXRhOiBudW1iZXI7XG4gIGxldCBkYXRhQnl0ZUxlbmd0aDogbnVtYmVyO1xuXG4gIGlmIChkYXRhVHlwZSA9PT0gJ3N0cmluZycgJiYgbG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgIHRocm93IG5ldyBFcnJvcignU3RyaW5nIHRlbnNvciBpcyBub3Qgc3VwcG9ydGVkIG9uIEdQVS4nKTtcbiAgfVxuXG4gIGlmIChlbmFibGVHcmFwaENhcHR1cmUgJiYgbG9jYXRpb24gIT09ICdncHUtYnVmZmVyJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBFeHRlcm5hbCBidWZmZXIgbXVzdCBiZSBwcm92aWRlZCBmb3IgaW5wdXQvb3V0cHV0IGluZGV4ICR7aW5kZXh9IHdoZW4gZW5hYmxlR3JhcGhDYXB0dXJlIGlzIHRydWUuYCxcbiAgICApO1xuICB9XG5cbiAgaWYgKGxvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICBjb25zdCBncHVCdWZmZXIgPSB0ZW5zb3JbMl0uZ3B1QnVmZmVyIGFzIEdQVUJ1ZmZlcjtcbiAgICBkYXRhQnl0ZUxlbmd0aCA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgZGltcykhO1xuXG4gICAgY29uc3QgcmVnaXN0ZXJCdWZmZXIgPSB3YXNtLmpzZXBSZWdpc3RlckJ1ZmZlcjtcbiAgICBpZiAoIXJlZ2lzdGVyQnVmZmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcImdwdS1idWZmZXJcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViR1BVLicpO1xuICAgIH1cbiAgICByYXdEYXRhID0gcmVnaXN0ZXJCdWZmZXIoc2Vzc2lvbklkLCBpbmRleCwgZ3B1QnVmZmVyLCBkYXRhQnl0ZUxlbmd0aCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICBkYXRhQnl0ZUxlbmd0aCA9IDQgKiBkYXRhLmxlbmd0aDtcbiAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICBsZXQgZGF0YUluZGV4ID0gcmF3RGF0YSAvIDQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHRlbnNvciBkYXRhIGF0IGluZGV4ICR7aX0gaXMgbm90IGEgc3RyaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgd2FzbS5IRUFQVTMyW2RhdGFJbmRleCsrXSA9IGFsbG9jV2FzbVN0cmluZyhkYXRhW2ldLCBhbGxvY3MpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICB3YXNtLkhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YUJ5dGVMZW5ndGgpLCByYXdEYXRhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIGRpbXMubGVuZ3RoKTtcbiAgdHJ5IHtcbiAgICBsZXQgZGltSW5kZXggPSBkaW1zT2Zmc2V0IC8gNDtcbiAgICBkaW1zLmZvckVhY2goKGQpID0+ICh3YXNtLkhFQVAzMltkaW1JbmRleCsrXSA9IGQpKTtcbiAgICBjb25zdCB0ZW5zb3IgPSB3YXNtLl9PcnRDcmVhdGVUZW5zb3IoXG4gICAgICB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksXG4gICAgICByYXdEYXRhLFxuICAgICAgZGF0YUJ5dGVMZW5ndGgsXG4gICAgICBkaW1zT2Zmc2V0LFxuICAgICAgZGltcy5sZW5ndGgsXG4gICAgICBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obG9jYXRpb24pLFxuICAgICk7XG4gICAgaWYgKHRlbnNvciA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGNyZWF0ZSB0ZW5zb3IgZm9yIGlucHV0L291dHB1dC4gc2Vzc2lvbj0ke3Nlc3Npb25JZH0sIGluZGV4PSR7aW5kZXh9LmApO1xuICAgIH1cbiAgICB0ZW5zb3JIYW5kbGVzLnB1c2godGVuc29yKTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogcGVyZm9ybSBpbmZlcmVuY2UgcnVuXG4gKi9cbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyAoXG4gIHNlc3Npb25JZDogbnVtYmVyLFxuICBpbnB1dEluZGljZXM6IG51bWJlcltdLFxuICBpbnB1dFRlbnNvcnM6IFRlbnNvck1ldGFkYXRhW10sXG4gIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxuICBvdXRwdXRUZW5zb3JzOiBBcnJheTxUZW5zb3JNZXRhZGF0YSB8IG51bGw+LFxuICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4pOiBQcm9taXNlPFRlbnNvck1ldGFkYXRhW10+ID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcnVuIGluZmVyZW5jZS4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcbiAgfVxuICBjb25zdCBzZXNzaW9uSGFuZGxlID0gc2Vzc2lvblswXTtcbiAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gc2Vzc2lvblsxXTtcbiAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IHNlc3Npb25bMl07XG4gIGNvbnN0IGlvQmluZGluZ1N0YXRlID0gc2Vzc2lvblszXTtcbiAgY29uc3QgZW5hYmxlR3JhcGhDYXB0dXJlID0gc2Vzc2lvbls0XTtcbiAgY29uc3QgaW5wdXRPdXRwdXRCb3VuZCA9IHNlc3Npb25bNV07XG5cbiAgY29uc3QgaW5wdXRDb3VudCA9IGlucHV0SW5kaWNlcy5sZW5ndGg7XG4gIGNvbnN0IG91dHB1dENvdW50ID0gb3V0cHV0SW5kaWNlcy5sZW5ndGg7XG5cbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xuICBsZXQgcnVuT3B0aW9uc0FsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBpbnB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IG91dHB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IGlucHV0T3V0cHV0QWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IGJlZm9yZVJ1blN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgY29uc3QgaW5wdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIDQpO1xuICBjb25zdCBpbnB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKGlucHV0Q291bnQgKiA0KTtcbiAgY29uc3Qgb3V0cHV0VmFsdWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG4gIGNvbnN0IG91dHB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG5cbiAgdHJ5IHtcbiAgICBbcnVuT3B0aW9uc0hhbmRsZSwgcnVuT3B0aW9uc0FsbG9jc10gPSBzZXRSdW5PcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgLy8gY3JlYXRlIGlucHV0IHRlbnNvcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKFxuICAgICAgICBpbnB1dFRlbnNvcnNbaV0sXG4gICAgICAgIGlucHV0VGVuc29ySGFuZGxlcyxcbiAgICAgICAgaW5wdXRPdXRwdXRBbGxvY3MsXG4gICAgICAgIHNlc3Npb25JZCxcbiAgICAgICAgaW5wdXRJbmRpY2VzW2ldLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBvdXRwdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yKFxuICAgICAgICBvdXRwdXRUZW5zb3JzW2ldLFxuICAgICAgICBvdXRwdXRUZW5zb3JIYW5kbGVzLFxuICAgICAgICBpbnB1dE91dHB1dEFsbG9jcyxcbiAgICAgICAgc2Vzc2lvbklkLFxuICAgICAgICBpbnB1dENvdW50ICsgb3V0cHV0SW5kaWNlc1tpXSxcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBsZXQgaW5wdXRWYWx1ZXNJbmRleCA9IGlucHV0VmFsdWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgaW5wdXROYW1lc0luZGV4ID0gaW5wdXROYW1lc09mZnNldCAvIDQ7XG4gICAgbGV0IG91dHB1dFZhbHVlc0luZGV4ID0gb3V0cHV0VmFsdWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgb3V0cHV0TmFtZXNJbmRleCA9IG91dHB1dE5hbWVzT2Zmc2V0IC8gNDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5IRUFQVTMyW2lucHV0VmFsdWVzSW5kZXgrK10gPSBpbnB1dFRlbnNvckhhbmRsZXNbaV07XG4gICAgICB3YXNtLkhFQVBVMzJbaW5wdXROYW1lc0luZGV4KytdID0gaW5wdXROYW1lc1VURjhFbmNvZGVkW2lucHV0SW5kaWNlc1tpXV07XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgd2FzbS5IRUFQVTMyW291dHB1dFZhbHVlc0luZGV4KytdID0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXTtcbiAgICAgIHdhc20uSEVBUFUzMltvdXRwdXROYW1lc0luZGV4KytdID0gb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtvdXRwdXRJbmRpY2VzW2ldXTtcbiAgICB9XG5cbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQICYmIGlvQmluZGluZ1N0YXRlICYmICFpbnB1dE91dHB1dEJvdW5kKSB7XG4gICAgICBjb25zdCB7IGhhbmRsZSwgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkIH0gPSBpb0JpbmRpbmdTdGF0ZTtcblxuICAgICAgaWYgKGlucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGggIT09IGlucHV0Q291bnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBpbnB1dCBjb3VudCBmcm9tIGZlZWRzICgke2lucHV0Q291bnR9KSBpcyBleHBlY3RlZCB0byBiZSBhbHdheXMgZXF1YWwgdG8gbW9kZWwncyBpbnB1dCBjb3VudCAoJHtpbnB1dE5hbWVzVVRGOEVuY29kZWQubGVuZ3RofSkuYCxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gcHJvY2VzcyBpbnB1dHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaW5wdXRJbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRCaW5kSW5wdXQoaGFuZGxlLCBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCBpbnB1dFRlbnNvckhhbmRsZXNbaV0pO1xuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgaW5wdXRbJHtpfV0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHByb2Nlc3MgcHJlLWFsbG9jYXRlZCBvdXRwdXRzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBvdXRwdXRJbmRpY2VzW2ldO1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IG91dHB1dFRlbnNvcnNbaV0/LlszXTsgLy8gdW5kZWZpbmVkIG1lYW5zIG91dHB1dCBpcyBub3QgcHJlLWFsbG9jYXRlZC5cblxuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAvLyBvdXRwdXQgaXMgcHJlLWFsbG9jYXRlZC4gYmluZCB0aGUgdGVuc29yLlxuICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEJpbmRPdXRwdXQoaGFuZGxlLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgb3V0cHV0VGVuc29ySGFuZGxlc1tpXSwgMCk7XG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xuICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGJpbmQgcHJlLWFsbG9jYXRlZCBvdXRwdXRbJHtpfV0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuIHJlc2V0IHByZWZlcnJlZCBsb2NhdGlvbi5cbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRCaW5kT3V0cHV0KFxuICAgICAgICAgICAgaGFuZGxlLFxuICAgICAgICAgICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZFtpbmRleF0sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBvdXRwdXRbJHtpfV0gdG8gJHtvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbaV19IGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFjdGl2ZVNlc3Npb25zLnNldChzZXNzaW9uSWQsIFtcbiAgICAgICAgc2Vzc2lvbkhhbmRsZSxcbiAgICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLFxuICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLFxuICAgICAgICBpb0JpbmRpbmdTdGF0ZSxcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxuICAgICAgICB0cnVlLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgd2FzbS5qc2VwT25SdW5TdGFydD8uKHNlc3Npb25IYW5kbGUpO1xuICAgIGxldCBlcnJvckNvZGU6IG51bWJlcjtcbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQICYmIGlvQmluZGluZ1N0YXRlKSB7XG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW5XaXRoQmluZGluZyhcbiAgICAgICAgc2Vzc2lvbkhhbmRsZSxcbiAgICAgICAgaW9CaW5kaW5nU3RhdGUuaGFuZGxlLFxuICAgICAgICBvdXRwdXRDb3VudCxcbiAgICAgICAgb3V0cHV0VmFsdWVzT2Zmc2V0LFxuICAgICAgICBydW5PcHRpb25zSGFuZGxlLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0UnVuKFxuICAgICAgICBzZXNzaW9uSGFuZGxlLFxuICAgICAgICBpbnB1dE5hbWVzT2Zmc2V0LFxuICAgICAgICBpbnB1dFZhbHVlc09mZnNldCxcbiAgICAgICAgaW5wdXRDb3VudCxcbiAgICAgICAgb3V0cHV0TmFtZXNPZmZzZXQsXG4gICAgICAgIG91dHB1dENvdW50LFxuICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsXG4gICAgICAgIHJ1bk9wdGlvbnNIYW5kbGUsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdmYWlsZWQgdG8gY2FsbCBPcnRSdW4oKS4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXQ6IFRlbnNvck1ldGFkYXRhW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgdGVuc29yID0gd2FzbS5IRUFQVTMyW291dHB1dFZhbHVlc09mZnNldCAvIDQgKyBpXTtcbiAgICAgIGlmICh0ZW5zb3IgPT09IG91dHB1dFRlbnNvckhhbmRsZXNbaV0pIHtcbiAgICAgICAgLy8gb3V0cHV0IHRlbnNvciBpcyBwcmUtYWxsb2NhdGVkLiBubyBuZWVkIHRvIGNvcHkgZGF0YS5cbiAgICAgICAgb3V0cHV0LnB1c2gob3V0cHV0VGVuc29yc1tpXSEpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgICAgIC8vIHN0YWNrIGFsbG9jYXRlIDQgcG9pbnRlciB2YWx1ZVxuICAgICAgY29uc3QgdGVuc29yRGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYyg0ICogNCk7XG5cbiAgICAgIGxldCBrZWVwT3V0cHV0VGVuc29yID0gZmFsc2U7XG4gICAgICBsZXQgdHlwZTogVGVuc29yLlR5cGUgfCB1bmRlZmluZWQsXG4gICAgICAgIGRhdGFPZmZzZXQgPSAwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0VGVuc29yRGF0YShcbiAgICAgICAgICB0ZW5zb3IsXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCxcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgNCxcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgOCxcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgMTIsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYWNjZXNzIG91dHB1dCB0ZW5zb3IgZGF0YSBvbiBpbmRleCAke2l9LmApO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0ZW5zb3JEYXRhSW5kZXggPSB0ZW5zb3JEYXRhT2Zmc2V0IC8gNDtcbiAgICAgICAgY29uc3QgZGF0YVR5cGUgPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBkYXRhT2Zmc2V0ID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgY29uc3QgZGltc09mZnNldCA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGNvbnN0IGRpbXNMZW5ndGggPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBjb25zdCBkaW1zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZGltcy5wdXNoKHdhc20uSEVBUFUzMltkaW1zT2Zmc2V0IC8gNCArIGldKTtcbiAgICAgICAgfVxuICAgICAgICB3YXNtLl9PcnRGcmVlKGRpbXNPZmZzZXQpO1xuXG4gICAgICAgIGNvbnN0IHNpemUgPSBkaW1zLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpO1xuICAgICAgICB0eXBlID0gdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcoZGF0YVR5cGUpO1xuXG4gICAgICAgIGNvbnN0IHByZWZlcnJlZExvY2F0aW9uID0gaW9CaW5kaW5nU3RhdGU/Lm91dHB1dFByZWZlcnJlZExvY2F0aW9uc1tvdXRwdXRJbmRpY2VzW2ldXTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBzdHJpbmdEYXRhOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgIGxldCBkYXRhSW5kZXggPSBkYXRhT2Zmc2V0IC8gNDtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gd2FzbS5IRUFQVTMyW2RhdGFJbmRleCsrXTtcbiAgICAgICAgICAgIGNvbnN0IG1heEJ5dGVzVG9SZWFkID0gaSA9PT0gc2l6ZSAtIDEgPyB1bmRlZmluZWQgOiB3YXNtLkhFQVBVMzJbZGF0YUluZGV4XSAtIG9mZnNldDtcbiAgICAgICAgICAgIHN0cmluZ0RhdGEucHVzaCh3YXNtLlVURjhUb1N0cmluZyhvZmZzZXQsIG1heEJ5dGVzVG9SZWFkKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBzdHJpbmdEYXRhLCAnY3B1J10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIGEgY2VydGFpbiBvdXRwdXQncyBwcmVmZXJyZWQgbG9jYXRpb24gaXMgR1BVIGJ1dCB0aGUgdGVuc29yIGlzIGVtcHR5LCB3ZSBzdGlsbCBuZWVkIHRvIGNyZWF0ZSBhIENQVVxuICAgICAgICAgIC8vIHRlbnNvciBmb3IgaXQuIFRoZXJlIGlzIG5vIG1hcHBpbmcgR1BVIGJ1ZmZlciBmb3IgYW4gZW1wdHkgdGVuc29yLlxuICAgICAgICAgIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ2dwdS1idWZmZXInICYmIHNpemUgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBnZXRCdWZmZXIgPSB3YXNtLmpzZXBHZXRCdWZmZXI7XG4gICAgICAgICAgICBpZiAoIWdldEJ1ZmZlcikge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZWZlcnJlZExvY2F0aW9uIFwiZ3B1LWJ1ZmZlclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJHUFUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBncHVCdWZmZXIgPSBnZXRCdWZmZXIoZGF0YU9mZnNldCk7XG4gICAgICAgICAgICBjb25zdCBidWZmZXJTaXplID0gY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXMoZGF0YVR5cGUsIHNpemUpO1xuICAgICAgICAgICAgaWYgKGJ1ZmZlclNpemUgPT09IHVuZGVmaW5lZCB8fCAhaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlKHR5cGUpKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRvIG5vdCByZWxlYXNlIHRoZSB0ZW5zb3IgcmlnaHQgbm93LiBpdCB3aWxsIGJlIHJlbGVhc2VkIHdoZW4gdXNlciBjYWxscyB0ZW5zb3IuZGlzcG9zZSgpLlxuICAgICAgICAgICAga2VlcE91dHB1dFRlbnNvciA9IHRydWU7XG5cbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcbiAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgZGltcyxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGdwdUJ1ZmZlcixcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogd2FzbS5qc2VwQ3JlYXRlRG93bmxvYWRlciEoZ3B1QnVmZmVyLCBidWZmZXJTaXplLCB0eXBlKSxcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgJ2dwdS1idWZmZXInLFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgdHlwZWRBcnJheUNvbnN0cnVjdG9yKHNpemUpO1xuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKS5zZXQoXG4gICAgICAgICAgICAgIHdhc20uSEVBUFU4LnN1YmFycmF5KGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBkYXRhLmJ5dGVMZW5ndGgpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBkYXRhLCAnY3B1J10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIGRhdGFPZmZzZXQpIHtcbiAgICAgICAgICB3YXNtLl9mcmVlKGRhdGFPZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgha2VlcE91dHB1dFRlbnNvcikge1xuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpb0JpbmRpbmdTdGF0ZSAmJiAhZW5hYmxlR3JhcGhDYXB0dXJlKSB7XG4gICAgICB3YXNtLl9PcnRDbGVhckJvdW5kT3V0cHV0cyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpO1xuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25JZCwgW1xuICAgICAgICBzZXNzaW9uSGFuZGxlLFxuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICAgIGZhbHNlLFxuICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xuXG4gICAgaW5wdXRUZW5zb3JIYW5kbGVzLmZvckVhY2goKHYpID0+IHdhc20uX09ydFJlbGVhc2VUZW5zb3IodikpO1xuICAgIG91dHB1dFRlbnNvckhhbmRsZXMuZm9yRWFjaCgodikgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XG4gICAgaW5wdXRPdXRwdXRBbGxvY3MuZm9yRWFjaCgocCkgPT4gd2FzbS5fZnJlZShwKSk7XG5cbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIHJ1bk9wdGlvbnNBbGxvY3MuZm9yRWFjaCgocCkgPT4gd2FzbS5fZnJlZShwKSk7XG4gIH1cbn07XG5cbi8qKlxuICogZW5kIHByb2ZpbGluZ1xuICovXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzZXNzaW9uIGlkJyk7XG4gIH1cbiAgY29uc3Qgc2Vzc2lvbkhhbmRsZSA9IHNlc3Npb25bMF07XG5cbiAgLy8gcHJvZmlsZSBmaWxlIG5hbWUgaXMgbm90IHVzZWQgeWV0LCBidXQgaXQgbXVzdCBiZSBmcmVlZC5cbiAgY29uc3QgcHJvZmlsZUZpbGVOYW1lID0gd2FzbS5fT3J0RW5kUHJvZmlsaW5nKHNlc3Npb25IYW5kbGUpO1xuICBpZiAocHJvZmlsZUZpbGVOYW1lID09PSAwKSB7XG4gICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBnZXQgYW4gcHJvZmlsZSBmaWxlIG5hbWUuXCIpO1xuICB9XG4gIHdhc20uX09ydEZyZWUocHJvZmlsZUZpbGVOYW1lKTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyA9ICh0ZW5zb3JzOiByZWFkb25seSBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKTogQXJyYXlCdWZmZXJMaWtlW10gPT4ge1xuICBjb25zdCBidWZmZXJzOiBBcnJheUJ1ZmZlckxpa2VbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHRlbnNvciBvZiB0ZW5zb3JzKSB7XG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkgJiYgJ2J1ZmZlcicgaW4gZGF0YSkge1xuICAgICAgYnVmZmVycy5wdXNoKGRhdGEuYnVmZmVyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ1ZmZlcnM7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBlbnYsIEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge1xuICBPcnRXYXNtTWVzc2FnZSxcbiAgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsXG4gIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSxcbiAgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEsXG4gIFRlbnNvck1ldGFkYXRhLFxufSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnLi93YXNtLWNvcmUtaW1wbCc7XG5pbXBvcnQgeyBpbml0aWFsaXplV2ViQXNzZW1ibHkgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBpbXBvcnRQcm94eVdvcmtlciB9IGZyb20gJy4vd2FzbS11dGlscy1pbXBvcnQnO1xuXG5jb25zdCBpc1Byb3h5ID0gKCk6IGJvb2xlYW4gPT4gISFlbnYud2FzbS5wcm94eSAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xubGV0IHByb3h5V29ya2VyOiBXb3JrZXIgfCB1bmRlZmluZWQ7XG5sZXQgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBhYm9ydGVkID0gZmFsc2U7XG5sZXQgdGVtcG9yYXJ5T2JqZWN0VXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbnR5cGUgUHJvbWlzZUNhbGxiYWNrczxUID0gdm9pZD4gPSBbcmVzb2x2ZTogKHJlc3VsdDogVCkgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uOiB1bmtub3duKSA9PiB2b2lkXTtcbmxldCBpbml0V2FzbUNhbGxiYWNrczogUHJvbWlzZUNhbGxiYWNrcztcbmNvbnN0IHF1ZXVlZENhbGxiYWNrczogTWFwPE9ydFdhc21NZXNzYWdlWyd0eXBlJ10sIEFycmF5PFByb21pc2VDYWxsYmFja3M8dW5rbm93bj4+PiA9IG5ldyBNYXAoKTtcblxuY29uc3QgZW5xdWV1ZUNhbGxiYWNrcyA9ICh0eXBlOiBPcnRXYXNtTWVzc2FnZVsndHlwZSddLCBjYWxsYmFja3M6IFByb21pc2VDYWxsYmFja3M8dW5rbm93bj4pOiB2b2lkID0+IHtcbiAgY29uc3QgcXVldWUgPSBxdWV1ZWRDYWxsYmFja3MuZ2V0KHR5cGUpO1xuICBpZiAocXVldWUpIHtcbiAgICBxdWV1ZS5wdXNoKGNhbGxiYWNrcyk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWVkQ2FsbGJhY2tzLnNldCh0eXBlLCBbY2FsbGJhY2tzXSk7XG4gIH1cbn07XG5cbmNvbnN0IGVuc3VyZVdvcmtlciA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKGluaXRpYWxpemluZyB8fCAhaW5pdGlhbGl6ZWQgfHwgYWJvcnRlZCB8fCAhcHJveHlXb3JrZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvcmtlciBub3QgcmVhZHknKTtcbiAgfVxufTtcblxuY29uc3Qgb25Qcm94eVdvcmtlck1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudDxPcnRXYXNtTWVzc2FnZT4pOiB2b2lkID0+IHtcbiAgc3dpdGNoIChldi5kYXRhLnR5cGUpIHtcbiAgICBjYXNlICdpbml0LXdhc20nOlxuICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgaW5pdFdhc21DYWxsYmFja3NbMF0oKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wb3JhcnlPYmplY3RVcmwpIHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0ZW1wb3JhcnlPYmplY3RVcmwpO1xuICAgICAgICB0ZW1wb3JhcnlPYmplY3RVcmwgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbml0LWVwJzpcbiAgICBjYXNlICdjb3B5LWZyb20nOlxuICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgY2FzZSAncmVsZWFzZSc6XG4gICAgY2FzZSAncnVuJzpcbiAgICBjYXNlICdlbmQtcHJvZmlsaW5nJzoge1xuICAgICAgY29uc3QgY2FsbGJhY2tzID0gcXVldWVkQ2FsbGJhY2tzLmdldChldi5kYXRhLnR5cGUpITtcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBjYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2tzLnNoaWZ0KCkhWzBdKGV2LmRhdGEub3V0ISk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVXZWJBc3NlbWJseUFuZE9ydFJ1bnRpbWUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgY2FsbHMgdG8gJ2luaXRXYXNtKCknIGRldGVjdGVkLlwiKTtcbiAgfVxuICBpZiAoYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInByZXZpb3VzIGNhbGwgdG8gJ2luaXRXYXNtKCknIGZhaWxlZC5cIik7XG4gIH1cblxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHByb3h5V29ya2VyPy50ZXJtaW5hdGUoKTtcblxuICAgICAgdm9pZCBpbXBvcnRQcm94eVdvcmtlcigpLnRoZW4oKFtvYmplY3RVcmwsIHdvcmtlcl0pID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwcm94eVdvcmtlciA9IHdvcmtlcjtcbiAgICAgICAgICBwcm94eVdvcmtlci5vbmVycm9yID0gKGV2OiBFcnJvckV2ZW50KSA9PiByZWplY3QoZXYpO1xuICAgICAgICAgIHByb3h5V29ya2VyLm9ubWVzc2FnZSA9IG9uUHJveHlXb3JrZXJNZXNzYWdlO1xuICAgICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzID0gW3Jlc29sdmUsIHJlamVjdF07XG4gICAgICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdpbml0LXdhc20nLCBpbjogZW52IH07XG4gICAgICAgICAgcHJveHlXb3JrZXIucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgdGVtcG9yYXJ5T2JqZWN0VXJsID0gb2JqZWN0VXJsO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICB9LCByZWplY3QpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBpbml0aWFsaXplV2ViQXNzZW1ibHkoZW52Lndhc20pO1xuICAgICAgYXdhaXQgY29yZS5pbml0UnVudGltZShlbnYpO1xuICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZU9ydEVwID0gYXN5bmMgKGVwTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2luaXQtZXAnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2luaXQtZXAnLCBpbjogeyBlcE5hbWUsIGVudiB9IH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgY29yZS5pbml0RXAoZW52LCBlcE5hbWUpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29weUZyb21FeHRlcm5hbEJ1ZmZlciA9IGFzeW5jIChidWZmZXI6IFVpbnQ4QXJyYXkpOiBQcm9taXNlPFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdjb3B5LWZyb20nLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2NvcHktZnJvbScsIGluOiB7IGJ1ZmZlciB9IH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgW2J1ZmZlci5idWZmZXJdKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29yZS5jb3B5RnJvbUV4dGVybmFsQnVmZmVyKGJ1ZmZlcik7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID0gYXN5bmMgKFxuICBtb2RlbDogU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIgfCBVaW50OEFycmF5LFxuICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbik6IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgLy8gY2hlY2sgdW5zdXBwb3J0ZWQgb3B0aW9uc1xuICAgIGlmIChvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXNzaW9uIG9wdGlvbiBcInByZWZlcnJlZE91dHB1dExvY2F0aW9uXCIgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XG4gICAgfVxuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2NyZWF0ZScsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAnY3JlYXRlJywgaW46IHsgbW9kZWwsIG9wdGlvbnM6IHsgLi4ub3B0aW9ucyB9IH0gfTtcbiAgICAgIGNvbnN0IHRyYW5zZmVyYWJsZTogVHJhbnNmZXJhYmxlW10gPSBbXTtcbiAgICAgIGlmIChtb2RlbCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgdHJhbnNmZXJhYmxlLnB1c2gobW9kZWwuYnVmZmVyKTtcbiAgICAgIH1cbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCB0cmFuc2ZlcmFibGUpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLmNyZWF0ZVNlc3Npb24obW9kZWwsIG9wdGlvbnMpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVsZWFzZVNlc3Npb24gPSBhc3luYyAoc2Vzc2lvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygncmVsZWFzZScsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAncmVsZWFzZScsIGluOiBzZXNzaW9uSWQgfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb3JlLnJlbGVhc2VTZXNzaW9uKHNlc3Npb25JZCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyAoXG4gIHNlc3Npb25JZDogbnVtYmVyLFxuICBpbnB1dEluZGljZXM6IG51bWJlcltdLFxuICBpbnB1dHM6IFRlbnNvck1ldGFkYXRhW10sXG4gIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxuICBvdXRwdXRzOiBBcnJheTxUZW5zb3JNZXRhZGF0YSB8IG51bGw+LFxuICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4pOiBQcm9taXNlPFRlbnNvck1ldGFkYXRhW10+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICAvLyBjaGVjayBpbnB1dHMgbG9jYXRpb25cbiAgICBpZiAoaW5wdXRzLnNvbWUoKHQpID0+IHRbM10gIT09ICdjcHUnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnB1dCB0ZW5zb3Igb24gR1BVIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICAvLyBjaGVjayBvdXRwdXRzIGxvY2F0aW9uXG4gICAgaWYgKG91dHB1dHMuc29tZSgodCkgPT4gdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncHJlLWFsbG9jYXRlZCBvdXRwdXQgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygncnVuJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3Qgc2VyaWFsaXphYmxlSW5wdXRzID0gaW5wdXRzIGFzIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW107IC8vIGV2ZXJ5IGlucHV0IGlzIG9uIENQVS5cbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge1xuICAgICAgICB0eXBlOiAncnVuJyxcbiAgICAgICAgaW46IHsgc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0czogc2VyaWFsaXphYmxlSW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvcHRpb25zIH0sXG4gICAgICB9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIGNvcmUuZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMoc2VyaWFsaXphYmxlSW5wdXRzKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvcmUucnVuKHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG91dHB1dHMsIG9wdGlvbnMpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gYXN5bmMgKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2VuZC1wcm9maWxpbmcnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2VuZC1wcm9maWxpbmcnLCBpbjogc2Vzc2lvbklkIH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29yZS5lbmRQcm9maWxpbmcoc2Vzc2lvbklkKTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtcbiAgSW5mZXJlbmNlU2Vzc2lvbixcbiAgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIsXG4gIFNlc3Npb25IYW5kbGVyLFxuICBUZW5zb3IsXG4gIFRSQUNFX0ZVTkNfQkVHSU4sXG4gIFRSQUNFX0ZVTkNfRU5ELFxufSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgeyBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciwgVGVuc29yTWV0YWRhdGEgfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCB7IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIsIGNyZWF0ZVNlc3Npb24sIGVuZFByb2ZpbGluZywgcmVsZWFzZVNlc3Npb24sIHJ1biB9IGZyb20gJy4vcHJveHktd3JhcHBlcic7XG5pbXBvcnQgeyBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUgfSBmcm9tICcuL3dhc20tY29tbW9uJztcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vd2FzbS11dGlscy1lbnYnO1xuaW1wb3J0IHsgbG9hZEZpbGUgfSBmcm9tICcuL3dhc20tdXRpbHMtbG9hZC1maWxlJztcblxuZXhwb3J0IGNvbnN0IGVuY29kZVRlbnNvck1ldGFkYXRhID0gKHRlbnNvcjogVGVuc29yLCBnZXROYW1lOiAoKSA9PiBzdHJpbmcpOiBUZW5zb3JNZXRhZGF0YSA9PiB7XG4gIHN3aXRjaCAodGVuc29yLmxvY2F0aW9uKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBbdGVuc29yLnR5cGUsIHRlbnNvci5kaW1zLCB0ZW5zb3IuZGF0YSwgJ2NwdSddO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHsgZ3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyIH0sICdncHUtYnVmZmVyJ107XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvci5sb2NhdGlvbn0gZm9yICR7Z2V0TmFtZSgpfWApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZGVjb2RlVGVuc29yTWV0YWRhdGEgPSAodGVuc29yOiBUZW5zb3JNZXRhZGF0YSk6IFRlbnNvciA9PiB7XG4gIHN3aXRjaCAodGVuc29yWzNdKSB7XG4gICAgY2FzZSAnY3B1JzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHRlbnNvclswXSwgdGVuc29yWzJdLCB0ZW5zb3JbMV0pO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XG4gICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcbiAgICAgIGlmICghaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlKGRhdGFUeXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZGF0YSB0eXBlOiAke2RhdGFUeXBlfSBmb3IgZGVzZXJpYWxpemluZyBHUFUgdGVuc29yYCk7XG4gICAgICB9XG4gICAgICBjb25zdCB7IGdwdUJ1ZmZlciwgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IHRlbnNvclsyXTtcbiAgICAgIHJldHVybiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcihncHVCdWZmZXIsIHsgZGF0YVR5cGUsIGRpbXM6IHRlbnNvclsxXSwgZG93bmxvYWQsIGRpc3Bvc2UgfSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBsb2NhdGlvbjogJHt0ZW5zb3JbM119YCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIgaW1wbGVtZW50cyBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciB7XG4gIHByaXZhdGUgc2Vzc2lvbklkOiBudW1iZXI7XG5cbiAgaW5wdXROYW1lczogc3RyaW5nW107XG4gIG91dHB1dE5hbWVzOiBzdHJpbmdbXTtcblxuICBhc3luYyBmZXRjaE1vZGVsQW5kQ29weVRvV2FzbU1lbW9yeShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyPiB7XG4gICAgLy8gZmV0Y2ggbW9kZWwgZnJvbSB1cmwgYW5kIG1vdmUgdG8gd2FzbSBoZWFwLlxuICAgIHJldHVybiBjb3B5RnJvbUV4dGVybmFsQnVmZmVyKGF3YWl0IGxvYWRGaWxlKHBhdGgpKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRNb2RlbChwYXRoT3JCdWZmZXI6IHN0cmluZyB8IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIGxldCBtb2RlbDogUGFyYW1ldGVyczx0eXBlb2YgY3JlYXRlU2Vzc2lvbj5bMF07XG5cbiAgICBpZiAodHlwZW9mIHBhdGhPckJ1ZmZlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgLy8gbm9kZVxuICAgICAgICBtb2RlbCA9IGF3YWl0IGxvYWRGaWxlKHBhdGhPckJ1ZmZlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBicm93c2VyXG4gICAgICAgIC8vIGZldGNoIG1vZGVsIGFuZCBjb3B5IHRvIHdhc20gaGVhcC5cbiAgICAgICAgbW9kZWwgPSBhd2FpdCB0aGlzLmZldGNoTW9kZWxBbmRDb3B5VG9XYXNtTWVtb3J5KHBhdGhPckJ1ZmZlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZGVsID0gcGF0aE9yQnVmZmVyO1xuICAgIH1cblxuICAgIFt0aGlzLnNlc3Npb25JZCwgdGhpcy5pbnB1dE5hbWVzLCB0aGlzLm91dHB1dE5hbWVzXSA9IGF3YWl0IGNyZWF0ZVNlc3Npb24obW9kZWwsIG9wdGlvbnMpO1xuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XG4gIH1cblxuICBhc3luYyBkaXNwb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiByZWxlYXNlU2Vzc2lvbih0aGlzLnNlc3Npb25JZCk7XG4gIH1cblxuICBhc3luYyBydW4oXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT4ge1xuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcbiAgICBjb25zdCBpbnB1dEFycmF5OiBUZW5zb3JbXSA9IFtdO1xuICAgIGNvbnN0IGlucHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcbiAgICBPYmplY3QuZW50cmllcyhmZWVkcykuZm9yRWFjaCgoa3ZwKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmlucHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGlucHV0ICcke25hbWV9J2ApO1xuICAgICAgfVxuICAgICAgaW5wdXRBcnJheS5wdXNoKHRlbnNvcik7XG4gICAgICBpbnB1dEluZGljZXMucHVzaChpbmRleCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvdXRwdXRBcnJheTogQXJyYXk8VGVuc29yIHwgbnVsbD4gPSBbXTtcbiAgICBjb25zdCBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIE9iamVjdC5lbnRyaWVzKGZldGNoZXMpLmZvckVhY2goKGt2cCkgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IGt2cFswXTtcbiAgICAgIGNvbnN0IHRlbnNvciA9IGt2cFsxXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vdXRwdXROYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgb3V0cHV0ICcke25hbWV9J2ApO1xuICAgICAgfVxuICAgICAgb3V0cHV0QXJyYXkucHVzaCh0ZW5zb3IpO1xuICAgICAgb3V0cHV0SW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGlucHV0cyA9IGlucHV0QXJyYXkubWFwKCh0LCBpKSA9PlxuICAgICAgZW5jb2RlVGVuc29yTWV0YWRhdGEodCwgKCkgPT4gYGlucHV0IFwiJHt0aGlzLmlucHV0TmFtZXNbaW5wdXRJbmRpY2VzW2ldXX1cImApLFxuICAgICk7XG4gICAgY29uc3Qgb3V0cHV0cyA9IG91dHB1dEFycmF5Lm1hcCgodCwgaSkgPT5cbiAgICAgIHQgPyBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgb3V0cHV0IFwiJHt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dfVwiYCkgOiBudWxsLFxuICAgICk7XG5cbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgcnVuKHRoaXMuc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3V0cHV0cywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCByZXN1bHRNYXA6IFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGUgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdE1hcFt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dXSA9IG91dHB1dEFycmF5W2ldID8/IGRlY29kZVRlbnNvck1ldGFkYXRhKHJlc3VsdHNbaV0pO1xuICAgIH1cbiAgICBUUkFDRV9GVU5DX0VORCgpO1xuICAgIHJldHVybiByZXN1bHRNYXA7XG4gIH1cblxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICAvLyBUT0RPOiBpbXBsZW1lbnQgcHJvZmlsaW5nXG4gIH1cblxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgdm9pZCBlbmRQcm9maWxpbmcodGhpcy5zZXNzaW9uSWQpO1xuICB9XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEJhY2tlbmQsIGVudiwgSW5mZXJlbmNlU2Vzc2lvbiwgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgeyBpbml0aWFsaXplT3J0RXAsIGluaXRpYWxpemVXZWJBc3NlbWJseUFuZE9ydFJ1bnRpbWUgfSBmcm9tICcuL3dhc20vcHJveHktd3JhcHBlcic7XG5pbXBvcnQgeyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIgfSBmcm9tICcuL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZSc7XG5pbXBvcnQgeyBzY3JpcHRTcmMgfSBmcm9tICcuL3dhc20vd2FzbS11dGlscy1pbXBvcnQnO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgYWxsIGZsYWdzIGZvciBXZWJBc3NlbWJseS5cbiAqXG4gKiBUaG9zZSBmbGFncyBhcmUgYWNjZXNzaWJsZSBmcm9tIGBvcnQuZW52Lndhc21gLiBVc2VycyBhcmUgYWxsb3cgdG8gc2V0IHRob3NlIGZsYWdzIGJlZm9yZSB0aGUgZmlyc3QgaW5mZXJlbmNlIHNlc3Npb25cbiAqIGJlaW5nIGNyZWF0ZWQsIHRvIG92ZXJyaWRlIGRlZmF1bHQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplRmxhZ3MgPSAoKTogdm9pZCA9PiB7XG4gIGlmICh0eXBlb2YgZW52Lndhc20uaW5pdFRpbWVvdXQgIT09ICdudW1iZXInIHx8IGVudi53YXNtLmluaXRUaW1lb3V0IDwgMCkge1xuICAgIGVudi53YXNtLmluaXRUaW1lb3V0ID0gMDtcbiAgfVxuXG4gIGlmIChlbnYud2FzbS5zaW1kID09PSBmYWxzZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ0RlcHJlY2F0ZWQgcHJvcGVydHkgXCJlbnYud2FzbS5zaW1kXCIgaXMgc2V0IHRvIGZhbHNlLiAnICtcbiAgICAgICAgJ25vbi1TSU1EIGJ1aWxkIGlzIG5vIGxvbmdlciBwcm92aWRlZCwgYW5kIHRoaXMgc2V0dGluZyB3aWxsIGJlIGlnbm9yZWQuJyxcbiAgICApO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5wcm94eSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZW52Lndhc20ucHJveHkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW52Lndhc20udHJhY2UgIT09ICdib29sZWFuJykge1xuICAgIGVudi53YXNtLnRyYWNlID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGVudi53YXNtLm51bVRocmVhZHMgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGVudi53YXNtLm51bVRocmVhZHMpIHx8IGVudi53YXNtLm51bVRocmVhZHMgPD0gMCkge1xuICAgIC8vIFRoZSBmb2xsb3dpbmcgbG9naWMgb25seSBhcHBsaWVzIHdoZW4gYG9ydC5lbnYud2FzbS5udW1UaHJlYWRzYCBpcyBub3Qgc2V0IGJ5IHVzZXIuIFdlIHdpbGwgYWx3YXlzIGhvbm9yIHVzZXInc1xuICAgIC8vIHNldHRpbmcgaWYgaXQgaXMgcHJvdmlkZWQuXG5cbiAgICAvLyBCcm93c2VyOiB3aGVuIGNyb3NzT3JpZ2luSXNvbGF0ZWQgaXMgZmFsc2UsIFNoYXJlZEFycmF5QnVmZmVyIGlzIG5vdCBhdmFpbGFibGUgc28gV2ViQXNzZW1ibHkgdGhyZWFkcyB3aWxsIG5vdFxuICAgIC8vIHdvcmsuIEluIHRoaXMgY2FzZSwgd2Ugd2lsbCBzZXQgbnVtVGhyZWFkcyB0byAxLlxuICAgIC8vXG4gICAgLy8gVGhlcmUgaXMgYW4gZXhjZXB0aW9uOiB3aGVuIHRoZSBicm93c2VyIGlzIGNvbmZpZ3VyZWQgdG8gZm9yY2UtZW5hYmxlIFNoYXJlZEFycmF5QnVmZmVyIChlLmcuIENocm9tdWltIHdpdGhcbiAgICAvLyAtLWVuYWJsZS1mZWF0dXJlcz1TaGFyZWRBcnJheUJ1ZmZlciksIGl0IGlzIHBvc3NpYmxlIHRoYXQgYHNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZGAgaXMgZmFsc2UgYW5kXG4gICAgLy8gU2hhcmVkQXJyYXlCdWZmZXIgaXMgYXZhaWxhYmxlIGF0IHRoZSBzYW1lIHRpbWUuIFRoaXMgaXMgdXN1YWxseSBmb3IgdGVzdGluZy4gSW4gdGhpcyBjYXNlLCAgd2Ugd2lsbCBzdGlsbCBzZXRcbiAgICAvLyBudW1UaHJlYWRzIHRvIDEgaGVyZS4gSWYgd2Ugd2FudCB0byBlbmFibGUgbXVsdGktdGhyZWFkaW5nIGluIHRlc3QsIHdlIHNob3VsZCBzZXQgYG9ydC5lbnYud2FzbS5udW1UaHJlYWRzYCB0byBhXG4gICAgLy8gdmFsdWUgZ3JlYXRlciB0aGFuIDEuXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiAhc2VsZi5jcm9zc09yaWdpbklzb2xhdGVkKSB7XG4gICAgICBlbnYud2FzbS5udW1UaHJlYWRzID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbnVtQ3B1TG9naWNhbENvcmVzID1cbiAgICAgICAgdHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCdub2RlOm9zJykuY3B1cygpLmxlbmd0aCA6IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5O1xuICAgICAgZW52Lndhc20ubnVtVGhyZWFkcyA9IE1hdGgubWluKDQsIE1hdGguY2VpbCgobnVtQ3B1TG9naWNhbENvcmVzIHx8IDEpIC8gMikpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX0RZTkFNSUNfSU1QT1JUKSB7XG4gICAgLy8gb3ZlcndyaXRlIHdhc20gcGF0aHMgb3ZlcnJpZGUgaWYgbm90IHNldFxuICAgIGlmIChlbnYud2FzbS53YXNtUGF0aHMgPT09IHVuZGVmaW5lZCAmJiBzY3JpcHRTcmMgJiYgc2NyaXB0U3JjLmluZGV4T2YoJ2Jsb2I6JykgIT09IDApIHtcbiAgICAgIGVudi53YXNtLndhc21QYXRocyA9IHNjcmlwdFNyYy5zdWJzdHJpbmcoMCwgc2NyaXB0U3JjLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCBpbXBsZW1lbnRzIEJhY2tlbmQge1xuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgV2ViQXNzZW1ibHkgYmFja2VuZC5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBvbmx5IG9uY2UgZm9yIGVhY2ggYmFja2VuZCBuYW1lLiBJdCB3aWxsIGJlIGNhbGxlZCB0aGUgZmlyc3QgdGltZSB3aGVuXG4gICAqIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkIHdpdGggYSByZWdpc3RlcmVkIGJhY2tlbmQgbmFtZS5cbiAgICpcbiAgICogQHBhcmFtIGJhY2tlbmROYW1lIC0gdGhlIHJlZ2lzdGVyZWQgYmFja2VuZCBuYW1lLlxuICAgKi9cbiAgYXN5bmMgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gcG9wdWxhdGUgd2FzbSBmbGFnc1xuICAgIGluaXRpYWxpemVGbGFncygpO1xuXG4gICAgLy8gaW5pdCB3YXNtXG4gICAgYXdhaXQgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSgpO1xuXG4gICAgLy8gcGVyZm9ybWUgRVAgc3BlY2lmaWMgaW5pdGlhbGl6YXRpb25cbiAgICBhd2FpdCBpbml0aWFsaXplT3J0RXAoYmFja2VuZE5hbWUpO1xuICB9XG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKFxuICAgIHBhdGg6IHN0cmluZyxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKFxuICAgIGJ1ZmZlcjogVWludDhBcnJheSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG4gIGFzeW5jIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKFxuICAgIHBhdGhPckJ1ZmZlcjogc3RyaW5nIHwgVWludDhBcnJheSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgT25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyKCk7XG4gICAgYXdhaXQgaGFuZGxlci5sb2FkTW9kZWwocGF0aE9yQnVmZmVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGhhbmRsZXIpO1xuICB9XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kIH0gZnJvbSAnLi9iYWNrZW5kLXdhc20nO1xuZXhwb3J0IGNvbnN0IHdhc21CYWNrZW5kID0gbmV3IE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kKCk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXMsIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMgKi9cblxuLy8gV2UgdXNlIFwicmVxdWlyZVwiIGluc3RlYWQgb2YgXCJpbXBvcnRcIiBoZXJlIGJlY2F1c2UgaW1wb3J0IHN0YXRlbWVudCBtdXN0IGJlIHB1dCBpbiB0b3AgbGV2ZWwuIE91ciBjdXJyZW50IGNvZGUgZG9lc1xuLy8gbm90IGFsbG93IGJ1bmRsZXIgdG8gdHJlZS1zaGFraW5nIGNvZGUgYXMgZXhwZWN0ZWQgYmVjYXVzZSBzb21lIGNvZGVzIGFyZSB0cmVhdGVkIGFzIGhhdmluZyBzaWRlIGVmZmVjdHMuXG4vLyBTbyB3ZSBpbXBvcnQgY29kZSBpbnNpZGUgdGhlIGlmLWNsYXVzZSB0byBhbGxvdyBidW5kbGVyIHJlbW92ZSB0aGUgY29kZSBzYWZlbHkuXG5cbmV4cG9ydCAqIGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5pbXBvcnQgKiBhcyBvcnQgZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0IG9ydDtcblxuaW1wb3J0IHsgcmVnaXN0ZXJCYWNrZW5kLCBlbnYgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbic7XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdMKSB7XG4gIGNvbnN0IG9ubnhqc0JhY2tlbmQgPSByZXF1aXJlKCcuL2JhY2tlbmQtb25ueGpzJykub25ueGpzQmFja2VuZDtcbiAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJnbCcsIG9ubnhqc0JhY2tlbmQsIC0xMCk7XG59XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU00pIHtcbiAgY29uc3Qgd2FzbUJhY2tlbmQgPSBCVUlMRF9ERUZTLkRJU0FCTEVfVFJBSU5JTkdcbiAgICA/IHJlcXVpcmUoJy4vYmFja2VuZC13YXNtLWluZmVyZW5jZScpLndhc21CYWNrZW5kXG4gICAgOiByZXF1aXJlKCcuL2JhY2tlbmQtd2FzbS10cmFpbmluZycpLndhc21CYWNrZW5kO1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQKSB7XG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJncHUnLCB3YXNtQmFja2VuZCwgNSk7XG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJubicsIHdhc21CYWNrZW5kLCA1KTtcbiAgfVxuICByZWdpc3RlckJhY2tlbmQoJ2NwdScsIHdhc21CYWNrZW5kLCAxMCk7XG4gIHJlZ2lzdGVyQmFja2VuZCgnd2FzbScsIHdhc21CYWNrZW5kLCAxMCk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnYudmVyc2lvbnMsICd3ZWInLCB7IHZhbHVlOiB2ZXJzaW9uLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IC9qcy9zY3JpcHRzL3VwZGF0ZS12ZXJzaW9uLnRzXG4vLyBEbyBub3QgbW9kaWZ5IGZpbGUgY29udGVudCBtYW51YWxseS5cblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMS4yMC4wLWRldi4yMDI0MDkwOC1kZTdhMDJiZWVmJztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BZ0JNLFVBQ0EsMEJBWU8saUJBd0NQLGdDQXdDTztBQTdHYjs7O0FBZ0JBLE1BQU0sV0FBcUMsb0JBQUksSUFBRztBQUNsRCxNQUFNLDJCQUFxQyxDQUFBO0FBWXBDLE1BQU0sa0JBQWtCLENBQUMsTUFBYyxTQUFrQixhQUEwQjtBQUN4RixZQUFJLFdBQVcsT0FBTyxRQUFRLFNBQVMsY0FBYyxPQUFPLFFBQVEsa0NBQWtDLFlBQVk7QUFDaEgsZ0JBQU0saUJBQWlCLFNBQVMsSUFBSSxJQUFJO0FBQ3hDLGNBQUksbUJBQW1CLFFBQVc7QUFDaEMscUJBQVMsSUFBSSxNQUFNLEVBQUUsU0FBUyxTQUFRLENBQUU7cUJBQy9CLGVBQWUsV0FBVyxVQUFVO0FBRTdDO3FCQUNTLGVBQWUsYUFBYSxVQUFVO0FBQy9DLGdCQUFJLGVBQWUsWUFBWSxTQUFTO0FBQ3RDLG9CQUFNLElBQUksTUFBTSw0QkFBNEIsSUFBSSxvQkFBb0IsUUFBUSxFQUFFOzs7QUFJbEYsY0FBSSxZQUFZLEdBQUc7QUFDakIsa0JBQU0sSUFBSSx5QkFBeUIsUUFBUSxJQUFJO0FBQy9DLGdCQUFJLE1BQU0sSUFBSTtBQUNaLHVDQUF5QixPQUFPLEdBQUcsQ0FBQzs7QUFHdEMscUJBQVNBLEtBQUksR0FBR0Es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IiwgIlRlbnNvciIsICJUZW5zb3IiLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiVHJhaW5pbmdTZXNzaW9uIiwgIkluZmVyZW5jZVNlc3Npb24iLCAiVGVuc29yIiwgIlRyYWluaW5nU2Vzc2lvbiIsICJlbnYiLCAiZW52IiwgIndhc20iLCAid2FzbSIsICJ3YXNtIiwgImxvY2F0aW9uIiwgImVudiIsICJ3YXNtIiwgImxvY2F0aW9uIiwgInRlbnNvciIsICJlcnJvckNvZGUiLCAiaSIsICJpbml0aWFsaXppbmciLCAiaW5pdGlhbGl6ZWQiLCAiYWJvcnRlZCIsICJjb3B5RnJvbUV4dGVybmFsQnVmZmVyIiwgImNyZWF0ZVNlc3Npb24iLCAicmVsZWFzZVNlc3Npb24iLCAicnVuIiwgImVuZFByb2ZpbGluZyIsICJlbnYiLCAiVGVuc29yIiwgImNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIiLCAiY3JlYXRlU2Vzc2lvbiIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJJbmZlcmVuY2VTZXNzaW9uIiwgIlRlbnNvciIsICJUcmFpbmluZ1Nlc3Npb24iLCAiZW52IiwgInZlcnNpb24iLCAid2FzbUJhY2tlbmQiLCAiZW52IiwgInZlcnNpb24iXQp9Cg==
