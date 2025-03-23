/*!
 * ONNX Runtime Web v1.21.0-dev.20241024-d9ca84ef96
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
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
    version = "1.20.0-dev.20241016-2b8fc5529b";
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
              if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint64" && type !== "int8" && type !== "uint8" && type !== "bool") {
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
    main_default = isProxyWorker ? null : (urlOverride) => new Worker(urlOverride ?? scriptSrc, { type: true ? "module" : "classic", name: WORKER_NAME });
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
      // if It's ESM, use import.meta.url
      import.meta.url ?? // use `document.currentScript.src` if available
      (typeof document !== "undefined" ? document.currentScript?.src : (
        // use `self.location.href` if available
        typeof self !== "undefined" ? self.location?.href : void 0
      ))
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
      (false ? null : null).default
    ) : void 0;
    importWasmModule = async (urlOverride, prefixOverride, isMultiThreaded) => {
      if (false) {
        return [void 0, embeddedWasmModule];
      } else {
        const wasmModuleFilename = false ? "ort-wasm-simd-threaded.jsep.mjs" : "ort-wasm-simd-threaded.mjs";
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
    isMLTensorSupportedType = (type) => type === "float32" || type === "float16" || type === "int32" || type === "int64" || type === "uint32" || type === "uint64" || type === "int8" || type === "uint8" || type === "bool";
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
            wasm2.shouldTransferToMLTensor = false;
            if (wasm2.currentContext) {
              throw new Error("WebNN execution provider is already set.");
            }
            if (typeof provider !== "string") {
              const webnnOptions = provider;
              const context = webnnOptions?.context;
              const gpuDevice = webnnOptions?.gpuDevice;
              const deviceType = webnnOptions?.deviceType;
              const powerPreference = webnnOptions?.powerPreference;
              if (context) {
                wasm2.currentContext = context;
              } else if (gpuDevice) {
                wasm2.currentContext = await navigator.ml.createContext(gpuDevice);
              } else {
                wasm2.currentContext = await navigator.ml.createContext({ deviceType, powerPreference });
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
        wasm2.jsepOnCreateSession?.();
        if (wasm2.currentContext) {
          wasm2.jsepRegisterMLContext(sessionHandle, wasm2.currentContext);
          wasm2.currentContext = void 0;
          wasm2.shouldTransferToMLTensor = true;
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
        const registerBuffer = wasm2.jsepRegisterBuffer;
        if (!registerBuffer) {
          throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
        }
        rawData = registerBuffer(sessionId, index, gpuBuffer, dataByteLength);
      } else if (location2 === "ml-tensor") {
        const mlTensor = tensor[2].mlTensor;
        dataByteLength = calculateTensorSizeInBytes(tensorDataTypeStringToEnum(dataType), dims);
        const registerMLTensor = wasm2.jsepRegisterMLTensor;
        if (!registerMLTensor) {
          throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
        }
        rawData = registerMLTensor(mlTensor, tensorDataTypeStringToEnum(dataType), dims);
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
        wasm2.jsepOnRunStart?.(sessionHandle);
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
              if (preferredLocation === "gpu-buffer" || preferredLocation === "ml-tensor") {
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
              } else if (preferredLocation === "ml-tensor" && size > 0) {
                const ensureTensor = wasm2.jsepEnsureTensor;
                if (!ensureTensor) {
                  throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
                }
                const tensorSize = calculateTensorSizeInBytes(dataType, size);
                if (tensorSize === void 0 || !isMLTensorSupportedType(type)) {
                  throw new Error(`Unsupported data type: ${type}`);
                }
                const mlTensor = await ensureTensor(dataOffset, dataType, dims, false);
                keepOutputTensor = true;
                output.push([
                  type,
                  dims,
                  {
                    mlTensor,
                    download: wasm2.jsepCreateMLTensorDownloader(dataOffset, type),
                    dispose: () => {
                      wasm2.jsepReleaseTensorId(dataOffset);
                      wasm2._OrtReleaseTensor(tensor);
                    }
                  },
                  "ml-tensor"
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
    wasmBackend = new OnnxruntimeWebAssemblyBackend();
  }
});

// web/lib/index.ts
init_esm();
init_esm();
init_esm();

// web/lib/version.ts
var version2 = "1.21.0-dev.20241024-d9ca84ef96";

// web/lib/index.ts
var lib_default = esm_exports;
if (false) {
  const onnxjsBackend = null.onnxjsBackend;
  registerBackend("webgl", onnxjsBackend, -10);
}
if (true) {
  const wasmBackend2 = (init_backend_wasm(), __toCommonJS(backend_wasm_exports)).wasmBackend;
  if (false) {
    registerBackend("webgpu", wasmBackend2, 5);
    registerBackend("webnn", wasmBackend2, 5);
  }
  registerBackend("cpu", wasmBackend2, 10);
  registerBackend("wasm", wasmBackend2, 10);
}
Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
export {
  InferenceSession2 as InferenceSession,
  TRACE,
  TRACE_FUNC_BEGIN,
  TRACE_FUNC_END,
  Tensor2 as Tensor,
  TrainingSession2 as TrainingSession,
  lib_default as default,
  env2 as env,
  registerBackend
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdHJhY2UudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24udHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItY29udmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvb25ueC1tb2RlbC50cyIsICIuLi8uLi9jb21tb24vbGliL29ubngtdmFsdWUudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90cmFpbmluZy1zZXNzaW9uLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90cmFpbmluZy1zZXNzaW9uLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5kZXgudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1lbnYudHMiLCAiLi4vbGliL3dhc20vcHJveHktd29ya2VyL21haW4udHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHMiLCAiLi4vbGliL3dhc20vd2FzbS1mYWN0b3J5LnRzIiwgIi4uL2xpYi93YXNtL3dhc20tdXRpbHMudHMiLCAiLi4vbGliL3dhc20vcnVuLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vc2Vzc2lvbi1vcHRpb25zLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tY29tbW9uLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tdXRpbHMtbG9hZC1maWxlLnRzIiwgIi4uL2xpYi93YXNtL3dhc20tY29yZS1pbXBsLnRzIiwgIi4uL2xpYi93YXNtL3Byb3h5LXdyYXBwZXIudHMiLCAiLi4vbGliL3dhc20vc2Vzc2lvbi1oYW5kbGVyLWluZmVyZW5jZS50cyIsICIuLi9saWIvYmFja2VuZC13YXNtLnRzIiwgIi4uL2xpYi9pbmRleC50cyIsICIuLi9saWIvdmVyc2lvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEJhY2tlbmQgfSBmcm9tICcuL2JhY2tlbmQuanMnO1xuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xuXG5pbnRlcmZhY2UgQmFja2VuZEluZm8ge1xuICBiYWNrZW5kOiBCYWNrZW5kO1xuICBwcmlvcml0eTogbnVtYmVyO1xuXG4gIGluaXRQcm9taXNlPzogUHJvbWlzZTx2b2lkPjtcbiAgaW5pdGlhbGl6ZWQ/OiBib29sZWFuO1xuICBhYm9ydGVkPzogYm9vbGVhbjtcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmNvbnN0IGJhY2tlbmRzOiBNYXA8c3RyaW5nLCBCYWNrZW5kSW5mbz4gPSBuZXcgTWFwKCk7XG5jb25zdCBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHk6IHN0cmluZ1tdID0gW107XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBiYWNrZW5kLlxuICpcbiAqIEBwYXJhbSBuYW1lIC0gdGhlIG5hbWUgYXMgYSBrZXkgdG8gbG9va3VwIGFzIGFuIGV4ZWN1dGlvbiBwcm92aWRlci5cbiAqIEBwYXJhbSBiYWNrZW5kIC0gdGhlIGJhY2tlbmQgb2JqZWN0LlxuICogQHBhcmFtIHByaW9yaXR5IC0gYW4gaW50ZWdlciBpbmRpY2F0aW5nIHRoZSBwcmlvcml0eSBvZiB0aGUgYmFja2VuZC4gSGlnaGVyIG51bWJlciBtZWFucyBoaWdoZXIgcHJpb3JpdHkuIGlmIHByaW9yaXR5XG4gKiA8IDAsIGl0IHdpbGwgYmUgY29uc2lkZXJlZCBhcyBhICdiZXRhJyB2ZXJzaW9uIGFuZCB3aWxsIG5vdCBiZSB1c2VkIGFzIGEgZmFsbGJhY2sgYmFja2VuZCBieSBkZWZhdWx0LlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyQmFja2VuZCA9IChuYW1lOiBzdHJpbmcsIGJhY2tlbmQ6IEJhY2tlbmQsIHByaW9yaXR5OiBudW1iZXIpOiB2b2lkID0+IHtcbiAgaWYgKGJhY2tlbmQgJiYgdHlwZW9mIGJhY2tlbmQuaW5pdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgYmFja2VuZC5jcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IGN1cnJlbnRCYWNrZW5kID0gYmFja2VuZHMuZ2V0KG5hbWUpO1xuICAgIGlmIChjdXJyZW50QmFja2VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBiYWNrZW5kcy5zZXQobmFtZSwgeyBiYWNrZW5kLCBwcmlvcml0eSB9KTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kLnByaW9yaXR5ID4gcHJpb3JpdHkpIHtcbiAgICAgIC8vIHNhbWUgbmFtZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgd2l0aCBhIGhpZ2hlciBwcmlvcml0eS4gc2tpcCByZWdpc3RlcmF0aW9uLlxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEJhY2tlbmQucHJpb3JpdHkgPT09IHByaW9yaXR5KSB7XG4gICAgICBpZiAoY3VycmVudEJhY2tlbmQuYmFja2VuZCAhPT0gYmFja2VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCByZWdpc3RlciBiYWNrZW5kIFwiJHtuYW1lfVwiIHVzaW5nIHByaW9yaXR5ICR7cHJpb3JpdHl9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByaW9yaXR5ID49IDApIHtcbiAgICAgIGNvbnN0IGkgPSBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuaW5kZXhPZihuYW1lKTtcbiAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYmFja2VuZHMuZ2V0KGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eVtpXSkhLnByaW9yaXR5IDw9IHByaW9yaXR5KSB7XG4gICAgICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnNwbGljZShpLCAwLCBuYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5wdXNoKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSB2YWxpZCBiYWNrZW5kJyk7XG59O1xuXG4vKipcbiAqIFRyeSB0byByZXNvbHZlIGFuZCBpbml0aWFsaXplIGEgYmFja2VuZC5cbiAqXG4gKiBAcGFyYW0gYmFja2VuZE5hbWUgLSB0aGUgbmFtZSBvZiB0aGUgYmFja2VuZC5cbiAqIEByZXR1cm5zIHRoZSBiYWNrZW5kIGluc3RhbmNlIGlmIHJlc29sdmVkIGFuZCBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHksIG9yIGFuIGVycm9yIG1lc3NhZ2UgaWYgZmFpbGVkLlxuICovXG5jb25zdCB0cnlSZXNvbHZlQW5kSW5pdGlhbGl6ZUJhY2tlbmQgPSBhc3luYyAoYmFja2VuZE5hbWU6IHN0cmluZyk6IFByb21pc2U8QmFja2VuZCB8IHN0cmluZz4gPT4ge1xuICBjb25zdCBiYWNrZW5kSW5mbyA9IGJhY2tlbmRzLmdldChiYWNrZW5kTmFtZSk7XG4gIGlmICghYmFja2VuZEluZm8pIHtcbiAgICByZXR1cm4gJ2JhY2tlbmQgbm90IGZvdW5kLic7XG4gIH1cblxuICBpZiAoYmFja2VuZEluZm8uaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcbiAgfSBlbHNlIGlmIChiYWNrZW5kSW5mby5hYm9ydGVkKSB7XG4gICAgcmV0dXJuIGJhY2tlbmRJbmZvLmVycm9yITtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpc0luaXRpYWxpemluZyA9ICEhYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghaXNJbml0aWFsaXppbmcpIHtcbiAgICAgICAgYmFja2VuZEluZm8uaW5pdFByb21pc2UgPSBiYWNrZW5kSW5mby5iYWNrZW5kLmluaXQoYmFja2VuZE5hbWUpO1xuICAgICAgfVxuICAgICAgYXdhaXQgYmFja2VuZEluZm8uaW5pdFByb21pc2U7XG4gICAgICBiYWNrZW5kSW5mby5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIWlzSW5pdGlhbGl6aW5nKSB7XG4gICAgICAgIGJhY2tlbmRJbmZvLmVycm9yID0gYCR7ZX1gO1xuICAgICAgICBiYWNrZW5kSW5mby5hYm9ydGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiYWNrZW5kSW5mby5lcnJvciE7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGRlbGV0ZSBiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUmVzb2x2ZSBleGVjdXRpb24gcHJvdmlkZXJzIGZyb20gdGhlIHNwZWNpZmljIHNlc3Npb24gb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyAtIHRoZSBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0LlxuICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0dXBsZSBvZiBhbiBpbml0aWFsaXplZCBiYWNrZW5kIGluc3RhbmNlIGFuZCBhIHNlc3Npb24gb3B0aW9ucyBvYmplY3Qgd2l0aFxuICogZmlsdGVyZWQgRVAgbGlzdC5cbiAqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCByZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVycyA9IGFzeW5jIChcbiAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbik6IFByb21pc2U8W2JhY2tlbmQ6IEJhY2tlbmQsIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnNdPiA9PiB7XG4gIC8vIGV4dHJhY3QgYmFja2VuZCBoaW50cyBmcm9tIHNlc3Npb24gb3B0aW9uc1xuICBjb25zdCBlcHMgPSBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyB8fCBbXTtcbiAgY29uc3QgYmFja2VuZEhpbnRzID0gZXBzLm1hcCgoaSkgPT4gKHR5cGVvZiBpID09PSAnc3RyaW5nJyA/IGkgOiBpLm5hbWUpKTtcbiAgY29uc3QgYmFja2VuZE5hbWVzID0gYmFja2VuZEhpbnRzLmxlbmd0aCA9PT0gMCA/IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eSA6IGJhY2tlbmRIaW50cztcblxuICAvLyB0cnkgdG8gcmVzb2x2ZSBhbmQgaW5pdGlhbGl6ZSBhbGwgcmVxdWVzdGVkIGJhY2tlbmRzXG4gIGxldCBiYWNrZW5kOiBCYWNrZW5kIHwgdW5kZWZpbmVkO1xuICBjb25zdCBlcnJvcnMgPSBbXTtcbiAgY29uc3QgYXZhaWxhYmxlQmFja2VuZE5hbWVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGZvciAoY29uc3QgYmFja2VuZE5hbWUgb2YgYmFja2VuZE5hbWVzKSB7XG4gICAgY29uc3QgcmVzb2x2ZVJlc3VsdCA9IGF3YWl0IHRyeVJlc29sdmVBbmRJbml0aWFsaXplQmFja2VuZChiYWNrZW5kTmFtZSk7XG4gICAgaWYgKHR5cGVvZiByZXNvbHZlUmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgZXJyb3JzLnB1c2goeyBuYW1lOiBiYWNrZW5kTmFtZSwgZXJyOiByZXNvbHZlUmVzdWx0IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWJhY2tlbmQpIHtcbiAgICAgICAgYmFja2VuZCA9IHJlc29sdmVSZXN1bHQ7XG4gICAgICB9XG4gICAgICBpZiAoYmFja2VuZCA9PT0gcmVzb2x2ZVJlc3VsdCkge1xuICAgICAgICBhdmFpbGFibGVCYWNrZW5kTmFtZXMuYWRkKGJhY2tlbmROYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBpZiBubyBiYWNrZW5kIGlzIGF2YWlsYWJsZSwgdGhyb3cgZXJyb3IuXG4gIGlmICghYmFja2VuZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgbm8gYXZhaWxhYmxlIGJhY2tlbmQgZm91bmQuIEVSUjogJHtlcnJvcnMubWFwKChlKSA9PiBgWyR7ZS5uYW1lfV0gJHtlLmVycn1gKS5qb2luKCcsICcpfWApO1xuICB9XG5cbiAgLy8gZm9yIGVhY2ggZXhwbGljaXRseSByZXF1ZXN0ZWQgYmFja2VuZCwgaWYgaXQncyBub3QgYXZhaWxhYmxlLCBvdXRwdXQgd2FybmluZyBtZXNzYWdlLlxuICBmb3IgKGNvbnN0IHsgbmFtZSwgZXJyIH0gb2YgZXJyb3JzKSB7XG4gICAgaWYgKGJhY2tlbmRIaW50cy5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYHJlbW92aW5nIHJlcXVlc3RlZCBleGVjdXRpb24gcHJvdmlkZXIgXCIke25hbWV9XCIgZnJvbSBzZXNzaW9uIG9wdGlvbnMgYmVjYXVzZSBpdCBpcyBub3QgYXZhaWxhYmxlOiAke2Vycn1gLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBmaWx0ZXJlZEVwcyA9IGVwcy5maWx0ZXIoKGkpID0+IGF2YWlsYWJsZUJhY2tlbmROYW1lcy5oYXModHlwZW9mIGkgPT09ICdzdHJpbmcnID8gaSA6IGkubmFtZSkpO1xuXG4gIHJldHVybiBbXG4gICAgYmFja2VuZCxcbiAgICBuZXcgUHJveHkob3B0aW9ucywge1xuICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wKSA9PiB7XG4gICAgICAgIGlmIChwcm9wID09PSAnZXhlY3V0aW9uUHJvdmlkZXJzJykge1xuICAgICAgICAgIHJldHVybiBmaWx0ZXJlZEVwcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wKTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF07XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQgeyBPbm54VmFsdWUgfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuaW1wb3J0IHsgVHJhaW5pbmdTZXNzaW9uIH0gZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLmpzJztcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBTZXNzaW9uSGFuZGxlciB7XG4gIHR5cGUgRmVlZHNUeXBlID0geyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIH07XG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH07XG4gIHR5cGUgUmV0dXJuVHlwZSA9IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9O1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgc2hhcmVkIFNlc3Npb25IYW5kbGVyIGZ1bmN0aW9uYWxpdHlcbiAqXG4gKiBAaWdub3JlXG4gKi9cbmludGVyZmFjZSBTZXNzaW9uSGFuZGxlciB7XG4gIGRpc3Bvc2UoKTogUHJvbWlzZTx2b2lkPjtcblxuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIGhhbmRsZXIgaW5zdGFuY2Ugb2YgYW4gaW5mZXJlbmNlIHNlc3Npb24uXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xuICBlbmRQcm9maWxpbmcoKTogdm9pZDtcblxuICBydW4oXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG59XG5cbi8qKlxuICogUmVwcmVzZW50IGEgaGFuZGxlciBpbnN0YW5jZSBvZiBhIHRyYWluaW5nIGluZmVyZW5jZSBzZXNzaW9uLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFpbmluZ1Nlc3Npb25IYW5kbGVyIGV4dGVuZHMgU2Vzc2lvbkhhbmRsZXIge1xuICByZWFkb25seSBldmFsSW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG4gIHJlYWRvbmx5IGV2YWxPdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgbGF6eVJlc2V0R3JhZCgpOiBQcm9taXNlPHZvaWQ+O1xuICBydW5UcmFpblN0ZXAoXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG4gIHJ1bk9wdGltaXplclN0ZXAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTx2b2lkPjtcbiAgcnVuRXZhbFN0ZXAoXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XG5cbiAgZ2V0UGFyYW1ldGVyc1NpemUodHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8bnVtYmVyPjtcbiAgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYnVmZmVyOiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPjtcbiAgZ2V0Q29udGlndW91c1BhcmFtZXRlcnModHJhaW5hYmxlT25seTogYm9vbGVhbik6IFByb21pc2U8T25ueFZhbHVlPjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBiYWNrZW5kIHRoYXQgcHJvdmlkZXMgaW1wbGVtZW50YXRpb24gb2YgbW9kZWwgaW5mZXJlbmNpbmcuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tlbmQge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmFja2VuZCBhc3luY2hyb25vdXNseS4gU2hvdWxkIHRocm93IHdoZW4gZmFpbGVkLlxuICAgKi9cbiAgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcblxuICBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihcbiAgICB1cmlPckJ1ZmZlcjogc3RyaW5nIHwgVWludDhBcnJheSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XG5cbiAgY3JlYXRlVHJhaW5pbmdTZXNzaW9uSGFuZGxlcj8oXG4gICAgY2hlY2twb2ludFN0YXRlVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcixcbiAgICB0cmFpbk1vZGVsVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcixcbiAgICBldmFsTW9kZWxVcmlPckJ1ZmZlcjogVHJhaW5pbmdTZXNzaW9uLlVyaU9yQnVmZmVyLFxuICAgIG9wdGltaXplck1vZGVsVXJpT3JCdWZmZXI6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcixcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbkhhbmRsZXI+O1xufVxuXG5leHBvcnQgeyByZWdpc3RlckJhY2tlbmQgfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgL2pzL3NjcmlwdHMvdXBkYXRlLXZlcnNpb24udHNcbi8vIERvIG5vdCBtb2RpZnkgZmlsZSBjb250ZW50IG1hbnVhbGx5LlxuXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcxLjIwLjAtZGV2LjIwMjQxMDE2LTJiOGZjNTUyOWInO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBFbnYgfSBmcm9tICcuL2Vudi5qcyc7XG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uLmpzJztcblxudHlwZSBMb2dMZXZlbFR5cGUgPSBFbnZbJ2xvZ0xldmVsJ107XG5cbmxldCBsb2dMZXZlbFZhbHVlOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+ID0gJ3dhcm5pbmcnO1xuXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSB7XG4gIHdhc206IHt9IGFzIEVudi5XZWJBc3NlbWJseUZsYWdzLFxuICB3ZWJnbDoge30gYXMgRW52LldlYkdMRmxhZ3MsXG4gIHdlYmdwdToge30gYXMgRW52LldlYkdwdUZsYWdzLFxuICB2ZXJzaW9uczogeyBjb21tb246IHZlcnNpb24gfSxcblxuICBzZXQgbG9nTGV2ZWwodmFsdWU6IExvZ0xldmVsVHlwZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IFsndmVyYm9zZScsICdpbmZvJywgJ3dhcm5pbmcnLCAnZXJyb3InLCAnZmF0YWwnXS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbG9nZ2luZyBsZXZlbDogJHt2YWx1ZX1gKTtcbiAgICB9XG4gICAgbG9nTGV2ZWxWYWx1ZSA9IHZhbHVlO1xuICB9LFxuICBnZXQgbG9nTGV2ZWwoKTogUmVxdWlyZWQ8TG9nTGV2ZWxUeXBlPiB7XG4gICAgcmV0dXJuIGxvZ0xldmVsVmFsdWU7XG4gIH0sXG59O1xuXG4vLyBzZXQgcHJvcGVydHkgJ2xvZ0xldmVsJyBzbyB0aGF0IHRoZXkgY2FuIGJlIGNvcnJlY3RseSB0cmFuc2ZlcnJlZCB0byB3b3JrZXIgYnkgYHBvc3RNZXNzYWdlKClgLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudiwgJ2xvZ0xldmVsJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBlbnYgYXMgZW52SW1wbCB9IGZyb20gJy4vZW52LWltcGwuanMnO1xuXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgRW52IHtcbiAgZXhwb3J0IHR5cGUgV2FzbVBhdGhQcmVmaXggPSBzdHJpbmc7XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2FzbUZpbGVQYXRocyB7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgb3ZlcnJpZGUgcGF0aCBmb3IgdGhlIG1haW4gLndhc20gZmlsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKlxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAud2FzbSBmaWxlIGlzOlxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbWAgZm9yIGRlZmF1bHQgYnVpbGRcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAud2FzbWAgZm9yIEpTRVAgYnVpbGQgKHdpdGggV2ViR1BVIGFuZCBXZWJOTilcbiAgICAgKiAtIGBvcnQtdHJhaW5pbmctd2FzbS1zaW1kLXRocmVhZGVkLndhc21gIGZvciB0cmFpbmluZyBidWlsZFxuICAgICAqL1xuICAgIHdhc20/OiBVUkwgfCBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgb3ZlcnJpZGUgcGF0aCBmb3IgdGhlIG1haW4gLm1qcyBmaWxlLlxuICAgICAqXG4gICAgICogVGhpcyBwYXRoIHNob3VsZCBiZSBhbiBhYnNvbHV0ZSBwYXRoLlxuICAgICAqXG4gICAgICogSWYgbm90IG1vZGlmaWVkLCB0aGUgZmlsZW5hbWUgb2YgdGhlIC5tanMgZmlsZSBpczpcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLm1qc2AgZm9yIGRlZmF1bHQgYnVpbGRcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAubWpzYCBmb3IgSlNFUCBidWlsZCAod2l0aCBXZWJHUFUgYW5kIFdlYk5OKVxuICAgICAqIC0gYG9ydC10cmFpbmluZy13YXNtLXNpbWQtdGhyZWFkZWQubWpzYCBmb3IgdHJhaW5pbmcgYnVpbGRcbiAgICAgKi9cbiAgICBtanM/OiBVUkwgfCBzdHJpbmc7XG4gIH1cbiAgZXhwb3J0IHR5cGUgV2FzbVByZWZpeE9yRmlsZVBhdGhzID0gV2FzbVBhdGhQcmVmaXggfCBXYXNtRmlsZVBhdGhzO1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgbnVtYmVyIG9mIHRocmVhZChzKS4gSWYgb21pdHRlZCBvciBzZXQgdG8gMCwgbnVtYmVyIG9mIHRocmVhZChzKSB3aWxsIGJlIGRldGVybWluZWQgYnkgc3lzdGVtLiBJZiBzZXRcbiAgICAgKiB0byAxLCBubyB3b3JrZXIgdGhyZWFkIHdpbGwgYmUgc3Bhd25lZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IG11bHRpdGhyZWFkIGZlYXR1cmUgaXMgYXZhaWxhYmxlIGluIGN1cnJlbnQgY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYDBgXG4gICAgICovXG4gICAgbnVtVGhyZWFkcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgU0lNRC4gSWYgc2V0IHRvIGZhbHNlLCBTSU1EIHdpbGwgYmUgZm9yY2VseSBkaXNhYmxlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IFNJTUQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVGhpcyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLiBTaW5jZSBTSU1EIGlzIHN1cHBvcnRlZCBieSBhbGwgbWFqb3IgSmF2YVNjcmlwdCBlbmdpbmVzLCBub24tU0lNRFxuICAgICAqIGJ1aWxkIGlzIG5vIGxvbmdlciBwcm92aWRlZC4gVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHJlbGVhc2UuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdHJ1ZWBcbiAgICAgKi9cbiAgICBzaW1kPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYGVudi50cmFjZWAgaW5zdGVhZC4gSWYgYGVudi50cmFjZWAgaXMgc2V0LCB0aGlzIHByb3BlcnR5IHdpbGwgYmUgaWdub3JlZC5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICB0cmFjZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IGEgbnVtYmVyIHNwZWNpZnlpbmcgdGhlIHRpbWVvdXQgZm9yIGluaXRpYWxpemF0aW9uIG9mIFdlYkFzc2VtYmx5IGJhY2tlbmQsIGluIG1pbGxpc2Vjb25kcy4gQSB6ZXJvXG4gICAgICogdmFsdWUgaW5kaWNhdGVzIG5vIHRpbWVvdXQgaXMgc2V0LlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgMGBcbiAgICAgKi9cbiAgICBpbml0VGltZW91dD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFNldCBhIGN1c3RvbSBVUkwgcHJlZml4IHRvIHRoZSAud2FzbS8ubWpzIGZpbGVzLCBvciBhbiBvYmplY3Qgb2Ygb3ZlcnJpZGVzIGZvciBib3RoIC53YXNtLy5tanMgZmlsZS4gVGhlIG92ZXJyaWRlXG4gICAgICogcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cbiAgICAgKi9cbiAgICB3YXNtUGF0aHM/OiBXYXNtUHJlZml4T3JGaWxlUGF0aHM7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBjdXN0b20gYnVmZmVyIHdoaWNoIGNvbnRhaW5zIHRoZSBXZWJBc3NlbWJseSBiaW5hcnkuIElmIHRoaXMgcHJvcGVydHkgaXMgc2V0LCB0aGUgYHdhc21QYXRoc2AgcHJvcGVydHkgd2lsbFxuICAgICAqIGJlIGlnbm9yZWQuXG4gICAgICovXG4gICAgd2FzbUJpbmFyeT86IEFycmF5QnVmZmVyTGlrZSB8IFVpbnQ4QXJyYXk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gcHJveHkgdGhlIGV4ZWN1dGlvbiBvZiBtYWluIHRocmVhZCB0byBhIHdvcmtlciB0aHJlYWQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICBwcm94eT86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdMRmxhZ3Mge1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIFdlYkdMIENvbnRleHQgSUQgKHdlYmdsIG9yIHdlYmdsMikuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAnd2ViZ2wyJ2BcbiAgICAgKi9cbiAgICBjb250ZXh0SWQ/OiAnd2ViZ2wnIHwgJ3dlYmdsMic7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBXZWJHTCByZW5kZXJpbmcgY29udGV4dC5cbiAgICAgKi9cbiAgICByZWFkb25seSBjb250ZXh0OiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgbWF4aW11bSBiYXRjaCBzaXplIGZvciBtYXRtdWwuIDAgbWVhbnMgdG8gZGlzYWJsZSBiYXRjaGluZy5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgbWF0bXVsTWF4QmF0Y2hTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHRleHR1cmUgY2FjaGUgbW9kZS5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCdmdWxsJ2BcbiAgICAgKi9cbiAgICB0ZXh0dXJlQ2FjaGVNb2RlPzogJ2luaXRpYWxpemVyT25seScgfCAnZnVsbCc7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgcGFja2VkIHRleHR1cmUgbW9kZVxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAgICovXG4gICAgcGFjaz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB3aGV0aGVyIGVuYWJsZSBhc3luYyBkb3dubG9hZC5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgICAqL1xuICAgIGFzeW5jPzogYm9vbGVhbjtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1UHJvZmlsaW5nRGF0YVYxVGVuc29yTWV0YWRhdGEge1xuICAgIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xuICAgIGRhdGFUeXBlOiBzdHJpbmc7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVQcm9maWxpbmdEYXRhVjEge1xuICAgIHZlcnNpb246IDE7XG4gICAgaW5wdXRzTWV0YWRhdGE6IHJlYWRvbmx5IFdlYkdwdVByb2ZpbGluZ0RhdGFWMVRlbnNvck1ldGFkYXRhW107XG4gICAgb3V0cHV0c01ldGFkYXRhOiByZWFkb25seSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YVtdO1xuICAgIGtlcm5lbElkOiBudW1iZXI7XG4gICAga2VybmVsVHlwZTogc3RyaW5nO1xuICAgIGtlcm5lbE5hbWU6IHN0cmluZztcbiAgICBwcm9ncmFtTmFtZTogc3RyaW5nO1xuICAgIHN0YXJ0VGltZTogbnVtYmVyO1xuICAgIGVuZFRpbWU6IG51bWJlcjtcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIFdlYkdwdVByb2ZpbGluZ0RhdGEgPSBXZWJHcHVQcm9maWxpbmdEYXRhVjE7XG5cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVGbGFncyB7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYGVudi53ZWJncHUucHJvZmlsaW5nLm1vZGVgIGluc3RlYWQuIElmIGBlbnYud2ViZ3B1LnByb2ZpbGluZy5tb2RlYCBpcyBzZXQsIHRoaXMgcHJvcGVydHkgd2lsbCBiZVxuICAgICAqIGlnbm9yZWQuXG4gICAgICovXG4gICAgcHJvZmlsaW5nTW9kZT86ICdvZmYnIHwgJ2RlZmF1bHQnO1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHByb2ZpbGluZyBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIHByb2ZpbGluZz86IHtcbiAgICAgIC8qKlxuICAgICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXG4gICAgICAgKlxuICAgICAgICogQGRlZmF1bHRWYWx1ZSBgJ29mZidgXG4gICAgICAgKi9cbiAgICAgIG1vZGU/OiAnb2ZmJyB8ICdkZWZhdWx0JztcblxuICAgICAgLyoqXG4gICAgICAgKiBTZXQgb3IgZ2V0IGEgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBhIHByb2ZpbGluZyBkYXRhIGlzIHJlY2VpdmVkLiBJZiBub3Qgc2V0LCB0aGUgcHJvZmlsaW5nIGRhdGEgd2lsbCBiZVxuICAgICAgICogcHJpbnRlZCB0byBjb25zb2xlLlxuICAgICAgICovXG4gICAgICBvbmRhdGE/OiAoZGF0YTogV2ViR3B1UHJvZmlsaW5nRGF0YSkgPT4gdm9pZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCBvciBnZXQgdGhlIHBvd2VyIHByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgb25seSBoYXMgZWZmZWN0IGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlXG4gICAgICogdXNlZCBhcyBvcHRpb25zIGZvciBgbmF2aWdhdG9yLmdwdS5yZXF1ZXN0QWRhcHRlcigpYC5cbiAgICAgKlxuICAgICAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9ncHV3ZWIuZ2l0aHViLmlvL2dwdXdlYi8jZGljdGRlZi1ncHVyZXF1ZXN0YWRhcHRlcm9wdGlvbnN9IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB1bmRlZmluZWRgXG4gICAgICovXG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2xvdy1wb3dlcicgfCAnaGlnaC1wZXJmb3JtYW5jZSc7XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB0aGUgZm9yY2UgZmFsbGJhY2sgYWRhcHRlciBmbGFnLlxuICAgICAqXG4gICAgICogU2V0dGluZyB0aGlzIHByb3BlcnR5IG9ubHkgaGFzIGVmZmVjdCBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGUgdmFsdWUgd2lsbCBiZVxuICAgICAqIHVzZWQgYXMgb3B0aW9ucyBmb3IgYG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoKWAuXG4gICAgICpcbiAgICAgKiBTZWUge0BsaW5rIGh0dHBzOi8vZ3B1d2ViLmdpdGh1Yi5pby9ncHV3ZWIvI2RpY3RkZWYtZ3B1cmVxdWVzdGFkYXB0ZXJvcHRpb25zfSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdW5kZWZpbmVkYFxuICAgICAqL1xuICAgIGZvcmNlRmFsbGJhY2tBZGFwdGVyPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBhZGFwdGVyIGZvciBXZWJHUFUuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgb25seSBoYXMgZWZmZWN0IGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlXG4gICAgICogdXNlZCBhcyB0aGUgR1BVIGFkYXB0ZXIgZm9yIHRoZSB1bmRlcmx5aW5nIFdlYkdQVSBiYWNrZW5kIHRvIGNyZWF0ZSBHUFUgZGV2aWNlLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBwcm9wZXJ0eSBpcyBub3Qgc2V0LCBpdCB3aWxsIGJlIGF2YWlsYWJsZSB0byBnZXQgYWZ0ZXIgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGVcbiAgICAgKiB2YWx1ZSB3aWxsIGJlIHRoZSBHUFUgYWRhcHRlciB0aGF0IGNyZWF0ZWQgYnkgdGhlIHVuZGVybHlpbmcgV2ViR1BVIGJhY2tlbmQuXG4gICAgICpcbiAgICAgKiBXaGVuIHVzZSB3aXRoIFR5cGVTY3JpcHQsIHRoZSB0eXBlIG9mIHRoaXMgcHJvcGVydHkgaXMgYEdQVUFkYXB0ZXJgIGRlZmluZWQgaW4gXCJAd2ViZ3B1L3R5cGVzXCIuXG4gICAgICogVXNlIGBjb25zdCBhZGFwdGVyID0gZW52LndlYmdwdS5hZGFwdGVyIGFzIEdQVUFkYXB0ZXI7YCBpbiBUeXBlU2NyaXB0IHRvIGFjY2VzcyB0aGlzIHByb3BlcnR5IHdpdGggY29ycmVjdCB0eXBlLlxuICAgICAqXG4gICAgICogc2VlIGNvbW1lbnRzIG9uIHtAbGluayBUZW5zb3IuR3B1QnVmZmVyVHlwZX1cbiAgICAgKi9cbiAgICBhZGFwdGVyOiB1bmtub3duO1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGV2aWNlIGZvciBXZWJHUFUuXG4gICAgICpcbiAgICAgKiBUaGlzIHByb3BlcnR5IGlzIG9ubHkgYXZhaWxhYmxlIGFmdGVyIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC5cbiAgICAgKlxuICAgICAqIFdoZW4gdXNlIHdpdGggVHlwZVNjcmlwdCwgdGhlIHR5cGUgb2YgdGhpcyBwcm9wZXJ0eSBpcyBgR1BVRGV2aWNlYCBkZWZpbmVkIGluIFwiQHdlYmdwdS90eXBlc1wiLlxuICAgICAqIFVzZSBgY29uc3QgZGV2aWNlID0gZW52LndlYmdwdS5kZXZpY2UgYXMgR1BVRGV2aWNlO2AgaW4gVHlwZVNjcmlwdCB0byBhY2Nlc3MgdGhpcyBwcm9wZXJ0eSB3aXRoIGNvcnJlY3QgdHlwZS5cbiAgICAgKlxuICAgICAqIHNlZSBjb21tZW50cyBvbiB7QGxpbmsgVGVuc29yLkdwdUJ1ZmZlclR5cGV9IGZvciBtb3JlIGRldGFpbHMgYWJvdXQgd2h5IG5vdCB1c2UgdHlwZXMgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cbiAgICAgKi9cbiAgICByZWFkb25seSBkZXZpY2U6IHVua25vd247XG4gICAgLyoqXG4gICAgICogU2V0IG9yIGdldCB3aGV0aGVyIHZhbGlkYXRlIGlucHV0IGNvbnRlbnQuXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcbiAgICAgKi9cbiAgICB2YWxpZGF0ZUlucHV0Q29udGVudD86IGJvb2xlYW47XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnYge1xuICAvKipcbiAgICogc2V0IHRoZSBzZXZlcml0eSBsZXZlbCBmb3IgbG9nZ2luZy5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgJ3dhcm5pbmcnYFxuICAgKi9cbiAgbG9nTGV2ZWw/OiAndmVyYm9zZScgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InIHwgJ2ZhdGFsJztcblxuICAvKipcbiAgICogSW5kaWNhdGUgd2hldGhlciBydW4gaW4gZGVidWcgbW9kZS5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXG4gICAqL1xuICBkZWJ1Zz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXG4gICAqXG4gICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxuICAgKi9cbiAgdHJhY2U/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBHZXQgdmVyc2lvbiBvZiB0aGUgY3VycmVudCBwYWNrYWdlLlxuICAgKi9cbiAgcmVhZG9ubHkgdmVyc2lvbnM6IHtcbiAgICByZWFkb25seSBjb21tb246IHN0cmluZztcbiAgICByZWFkb25seSB3ZWI/OiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgbm9kZT86IHN0cmluZztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgcmVhZG9ubHkgJ3JlYWN0LW5hdGl2ZSc/OiBzdHJpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViQXNzZW1ibHlcbiAgICovXG4gIHJlYWRvbmx5IHdhc206IEVudi5XZWJBc3NlbWJseUZsYWdzO1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkdMXG4gICAqL1xuICByZWFkb25seSB3ZWJnbDogRW52LldlYkdMRmxhZ3M7XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViR1BVXG4gICAqL1xuICByZWFkb25seSB3ZWJncHU6IEVudi5XZWJHcHVGbGFncztcblxuICBbbmFtZTogc3RyaW5nXTogdW5rbm93bjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgYXMgYSBnbG9iYWwgc2luZ2xldG9uLlxuICovXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSBlbnZJbXBsO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3JUb0RhdGFVcmxPcHRpb25zLCBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMgfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IudG9EYXRhVVJMKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclRvRGF0YVVSTCA9ICh0ZW5zb3I6IFRlbnNvciwgb3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBjYW52YXMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykgOiBuZXcgT2Zmc2NyZWVuQ2FudmFzKDEsIDEpO1xuICBjYW52YXMud2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgY2FudmFzLmhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhc1xuICAgIHwgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgfCBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgICB8IG51bGw7XG5cbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1szXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1szXTtcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucz8uZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5tZWFuID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuWzBdLCBub3JtLm1lYW5bMV0sIG5vcm0ubWVhblsyXSwgMF07XG4gICAgICAgIGlmIChub3JtLm1lYW5bM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1NZWFuWzNdID0gbm9ybS5tZWFuWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1CaWFzID0gWzAsIDAsIDAsIDBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xuICAgICAgICBpZiAobm9ybS5iaWFzWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub3JtQmlhc1szXSA9IG5vcm0uYmlhc1szXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0cmlkZSA9IGhlaWdodCAqIHdpZHRoO1xuICAgIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICAgIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSxcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XG4gICAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB3aWR0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IFIgPSAoKHRlbnNvci5kYXRhW3JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1swXSkgKiBub3JtTWVhblswXTsgLy8gUiB2YWx1ZVxuICAgICAgICBjb25zdCBHID0gKCh0ZW5zb3IuZGF0YVtnVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMV0pICogbm9ybU1lYW5bMV07IC8vIEcgdmFsdWVcbiAgICAgICAgY29uc3QgQiA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAvLyBCIHZhbHVlXG4gICAgICAgIGNvbnN0IEEgPSBhVGVuc29yUG9pbnRlciA9PT0gLTEgPyAyNTUgOiAoKHRlbnNvci5kYXRhW2FUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1szXSkgKiBub3JtTWVhblszXTsgLy8gQSB2YWx1ZVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3Jlc3RyaWN0LXBsdXMtb3BlcmFuZHNcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKCcgKyBSICsgJywnICsgRyArICcsJyArIEIgKyAnLCcgKyBBICsgJyknO1xuICAgICAgICBwaXhlbHMyRENvbnRleHQuZmlsbFJlY3QoaiwgaSwgMSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgndG9EYXRhVVJMJyBpbiBjYW52YXMpIHtcbiAgICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndG9EYXRhVVJMIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvSW1hZ2VEYXRhKClcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvclRvSW1hZ2VEYXRhID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhID0+IHtcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID1cbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJylcbiAgICAgIDogKG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSkuZ2V0Q29udGV4dCgnMmQnKSBhcyBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xuICBsZXQgaW1hZ2U6IEltYWdlRGF0YTtcbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XG4gICAgLy8gRGVmYXVsdCB2YWx1ZXMgZm9yIGhlaWdodCBhbmQgd2lkdGggJiBmb3JtYXRcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XG4gICAgbGV0IGNoYW5uZWxzOiBudW1iZXI7XG4gICAgaWYgKG9wdGlvbnM/LnRlbnNvckxheW91dCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1sxXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbM107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZmF1bHQgbGF5b3V0IGlzIE5DV0hcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbM107XG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcbiAgICAgIGNoYW5uZWxzID0gdGVuc29yLmRpbXNbMV07XG4gICAgfVxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5tZWFuID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuWzBdLCBub3JtLm1lYW5bMV0sIG5vcm0ubWVhblsyXSwgMjU1XTtcbiAgICAgICAgaWYgKG5vcm0ubWVhblszXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9ybU1lYW5bM10gPSBub3JtLm1lYW5bM107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLmJpYXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9ybUJpYXMgPSBbMCwgMCwgMCwgMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5iaWFzID09PSAnbnVtYmVyJykge1xuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG5vcm1CaWFzWzNdID0gbm9ybS5iaWFzWzNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKFxuICAgICAgICAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCAmJiBjaGFubmVscyA9PT0gNCAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQkEnKSB8fFxuICAgICAgICAoY2hhbm5lbHMgPT09IDMgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdSR0InICYmIG9wdGlvbnMuZm9ybWF0ICE9PSAnQkdSJylcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZW5zb3IgZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggaW5wdXQgdGVuc29yIGRpbXNcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCBwb2ludGVyIGFzc2lnbm1lbnRzXG4gICAgY29uc3Qgc3RlcCA9IDQ7XG4gICAgbGV0IHJJbWFnZVBvaW50ZXIgPSAwLFxuICAgICAgZ0ltYWdlUG9pbnRlciA9IDEsXG4gICAgICBiSW1hZ2VQb2ludGVyID0gMixcbiAgICAgIGFJbWFnZVBvaW50ZXIgPSAzO1xuICAgIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSxcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XG4gICAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xuICAgICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkJHJykge1xuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XG4gICAgfVxuXG4gICAgaW1hZ2UgPSBwaXhlbHMyRENvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgZm9yIChcbiAgICAgIGxldCBpID0gMDtcbiAgICAgIGkgPCBoZWlnaHQgKiB3aWR0aDtcbiAgICAgIHJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBiSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGFJbWFnZVBvaW50ZXIgKz0gc3RlcCwgaSsrXG4gICAgKSB7XG4gICAgICBpbWFnZS5kYXRhW3JJbWFnZVBvaW50ZXJdID0gKCh0ZW5zb3IuZGF0YVtyVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMF0pICogbm9ybU1lYW5bMF07IC8vIFIgdmFsdWVcbiAgICAgIGltYWdlLmRhdGFbZ0ltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgLy8gRyB2YWx1ZVxuICAgICAgaW1hZ2UuZGF0YVtiSW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbYlRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzJdKSAqIG5vcm1NZWFuWzJdOyAvLyBCIHZhbHVlXG4gICAgICBpbWFnZS5kYXRhW2FJbWFnZVBvaW50ZXJdID1cbiAgICAgICAgYVRlbnNvclBvaW50ZXIgPT09IC0xID8gMjU1IDogKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107IC8vIEEgdmFsdWVcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XG4gIH1cbiAgcmV0dXJuIGltYWdlO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtcbiAgT3B0aW9uc0RpbWVuc2lvbnMsXG4gIE9wdGlvbnNGb3JtYXQsXG4gIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcbiAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsXG4gIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLFxuICBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyxcbiAgVGVuc29yRnJvbU1MVGVuc29yT3B0aW9ucyxcbiAgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zLFxuICBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbn0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcbmltcG9ydCB7IFRlbnNvciBhcyBUZW5zb3JJbnRlcmZhY2UgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmludGVyZmFjZSBCdWZmZXJUb1RlbnNvck9wdGlvbnNcbiAgZXh0ZW5kcyBPcHRpb25zRGltZW5zaW9ucyxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcbiAgICBPcHRpb25zRm9ybWF0LFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQge31cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIGltYWdlIG9iamVjdFxuICpcbiAqIEBwYXJhbSBidWZmZXIgLSBFeHRyYWN0ZWQgaW1hZ2UgYnVmZmVyIGRhdGEgLSBhc3N1bWluZyBSR0JBIGZvcm1hdFxuICogQHBhcmFtIGltYWdlRm9ybWF0IC0gaW5wdXQgaW1hZ2UgY29uZmlndXJhdGlvbiAtIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb25zIGhlaWdodCwgd2lkdGgsIGZvcm1hdFxuICogQHBhcmFtIHRlbnNvckZvcm1hdCAtIG91dHB1dCB0ZW5zb3IgY29uZmlndXJhdGlvbiAtIERlZmF1bHQgaXMgUkdCIGZvcm1hdFxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9UZW5zb3IgPSAoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheSB8IHVuZGVmaW5lZCwgb3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zKTogVGVuc29yID0+IHtcbiAgaWYgKGJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBidWZmZXIgbXVzdCBiZSBkZWZpbmVkJyk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGVpZ2h0ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy53aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbWFnZSBoZWlnaHQgYW5kIHdpZHRoIG11c3QgYmUgZGVmaW5lZCcpO1xuICB9XG4gIGlmIChvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOSFdDIFRlbnNvciBsYXlvdXQgaXMgbm90IHN1cHBvcnRlZCB5ZXQnKTtcbiAgfVxuXG4gIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gb3B0aW9ucztcblxuICBjb25zdCBub3JtID0gb3B0aW9ucy5ub3JtID8/IHsgbWVhbjogMjU1LCBiaWFzOiAwIH07XG4gIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbiAgaWYgKHR5cGVvZiBub3JtLm1lYW4gPT09ICdudW1iZXInKSB7XG4gICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcbiAgfSBlbHNlIHtcbiAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4hWzBdLCBub3JtLm1lYW4hWzFdLCBub3JtLm1lYW4hWzJdLCBub3JtLm1lYW4hWzNdID8/IDI1NV07XG4gIH1cblxuICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcbiAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xuICB9IGVsc2Uge1xuICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcyFbMF0sIG5vcm0uYmlhcyFbMV0sIG5vcm0uYmlhcyFbMl0sIG5vcm0uYmlhcyFbM10gPz8gMF07XG4gIH1cblxuICBjb25zdCBpbnB1dGZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0JBJztcbiAgLy8gZGVmYXVsdCB2YWx1ZSBpcyBSR0JBIHNpbmNlIGltYWdlZGF0YSBhbmQgSFRNTEltYWdlRWxlbWVudCB1c2VzIGl0XG5cbiAgY29uc3Qgb3V0cHV0Zm9ybWF0ID1cbiAgICBvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRlbnNvckZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xuICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcbiAgY29uc3QgZmxvYXQzMkRhdGEgPSBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJyA/IG5ldyBGbG9hdDMyQXJyYXkoc3RyaWRlICogNCkgOiBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDMpO1xuXG4gIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xuICBsZXQgc3RlcCA9IDQsXG4gICAgckltYWdlUG9pbnRlciA9IDAsXG4gICAgZ0ltYWdlUG9pbnRlciA9IDEsXG4gICAgYkltYWdlUG9pbnRlciA9IDIsXG4gICAgYUltYWdlUG9pbnRlciA9IDM7XG4gIGxldCByVGVuc29yUG9pbnRlciA9IDAsXG4gICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsXG4gICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLFxuICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XG5cbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxuICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XG4gICAgc3RlcCA9IDM7XG4gICAgckltYWdlUG9pbnRlciA9IDA7XG4gICAgZ0ltYWdlUG9pbnRlciA9IDE7XG4gICAgYkltYWdlUG9pbnRlciA9IDI7XG4gICAgYUltYWdlUG9pbnRlciA9IC0xO1xuICB9XG5cbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIG91dHB1dCB0ZW5zb3IgZm9ybWF0XG4gIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSR0JBJykge1xuICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSQkcnKSB7XG4gICAgclRlbnNvclBvaW50ZXIgPSAwO1xuICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdCR1InKSB7XG4gICAgYlRlbnNvclBvaW50ZXIgPSAwO1xuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xuICAgIHJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcbiAgfVxuXG4gIGZvciAoXG4gICAgbGV0IGkgPSAwO1xuICAgIGkgPCBzdHJpZGU7XG4gICAgaSsrLCBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXBcbiAgKSB7XG4gICAgZmxvYXQzMkRhdGFbclRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW3JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMF0pIC8gbm9ybU1lYW5bMF07XG4gICAgZmxvYXQzMkRhdGFbZ1RlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2dJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMV0pIC8gbm9ybU1lYW5bMV07XG4gICAgZmxvYXQzMkRhdGFbYlRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMl0pIC8gbm9ybU1lYW5bMl07XG4gICAgaWYgKGFUZW5zb3JQb2ludGVyICE9PSAtMSAmJiBhSW1hZ2VQb2ludGVyICE9PSAtMSkge1xuICAgICAgZmxvYXQzMkRhdGFbYVRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2FJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbM10pIC8gbm9ybU1lYW5bM107XG4gICAgfVxuICB9XG5cbiAgLy8gRmxvYXQzMkFycmF5IC0+IG9ydC5UZW5zb3JcbiAgY29uc3Qgb3V0cHV0VGVuc29yID1cbiAgICBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJ1xuICAgICAgPyBuZXcgVGVuc29yKCdmbG9hdDMyJywgZmxvYXQzMkRhdGEsIFsxLCA0LCBoZWlnaHQsIHdpZHRoXSlcbiAgICAgIDogbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgMywgaGVpZ2h0LCB3aWR0aF0pO1xuICByZXR1cm4gb3V0cHV0VGVuc29yO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUltYWdlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tSW1hZ2UgPSBhc3luYyAoXG4gIGltYWdlOiBJbWFnZURhdGEgfCBIVE1MSW1hZ2VFbGVtZW50IHwgSW1hZ2VCaXRtYXAgfCBzdHJpbmcsXG4gIG9wdGlvbnM/OlxuICAgIHwgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcbiAgICB8IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zXG4gICAgfCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zXG4gICAgfCBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcbik6IFByb21pc2U8VGVuc29yPiA9PiB7XG4gIC8vIGNoZWNraW5nIHRoZSB0eXBlIG9mIGltYWdlIG9iamVjdFxuICBjb25zdCBpc0hUTUxJbWFnZUVsZSA9IHR5cGVvZiBIVE1MSW1hZ2VFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGNvbnN0IGlzSW1hZ2VEYXRhRWxlID0gdHlwZW9mIEltYWdlRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGE7XG4gIGNvbnN0IGlzSW1hZ2VCaXRtYXAgPSB0eXBlb2YgSW1hZ2VCaXRtYXAgIT09ICd1bmRlZmluZWQnICYmIGltYWdlIGluc3RhbmNlb2YgSW1hZ2VCaXRtYXA7XG4gIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIGltYWdlID09PSAnc3RyaW5nJztcblxuICBsZXQgZGF0YTogVWludDhDbGFtcGVkQXJyYXkgfCB1bmRlZmluZWQ7XG4gIGxldCBidWZmZXJUb1RlbnNvck9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnMgPz8ge307XG5cbiAgY29uc3QgY3JlYXRlQ2FudmFzID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgT2Zmc2NyZWVuQ2FudmFzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudmFzIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGNyZWF0ZUNhbnZhc0NvbnRleHQgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IE9mZnNjcmVlbkNhbnZhcykgPT4ge1xuICAgIGlmICh0eXBlb2YgSFRNTENhbnZhc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfSBlbHNlIGlmIChjYW52YXMgaW5zdGFuY2VvZiBPZmZzY3JlZW5DYW52YXMpIHtcbiAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgLy8gZmlsbGluZyBhbmQgY2hlY2tpbmcgaW1hZ2UgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gIGlmIChpc0hUTUxJbWFnZUVsZSkge1xuICAgIC8vIEhUTUxJbWFnZUVsZW1lbnQgLSBpbWFnZSBvYmplY3QgLSBmb3JtYXQgaXMgUkdCQSBieSBkZWZhdWx0XG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyk7XG5cbiAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgIGxldCBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICBsZXQgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkSGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZWRIZWlnaHQ7XG4gICAgICAgIHdpZHRoID0gb3B0aW9ucy5yZXNpemVkV2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgaWYgKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGlucHV0IGNvbmZpZyBmb3JtYXQgbXVzdCBiZSBSR0JBIGZvciBIVE1MSW1hZ2VFbGVtZW50Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLnRlbnNvckZvcm1hdCA9ICdSR0JBJztcbiAgICAgICAgfVxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy50ZW5zb3JGb3JtYXQgPSAnUkdCQSc7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuICAgICAgfVxuXG4gICAgICBwaXhlbHMyRENvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcbiAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ltYWdlRGF0YUVsZSkge1xuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcblxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkV2lkdGggIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRIZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVkSGVpZ2h0O1xuICAgICAgd2lkdGggPSBvcHRpb25zLnJlc2l6ZWRXaWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuZm9ybWF0ID0gJ1JHQkEnO1xuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XG5cbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB0ZW1wQ2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG5cbiAgICAgIHRlbXBDYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgIHRlbXBDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KHRlbXBDYW52YXMpO1xuXG4gICAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZSwgMCwgMCk7XG4gICAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGltYWdlLmRhdGE7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzSW1hZ2VCaXRtYXApIHtcbiAgICAvLyBJbWFnZUJpdG1hcCAtIGltYWdlIG9iamVjdCAtIGZvcm1hdCBtdXN0IGJlIHByb3ZpZGVkIGJ5IHVzZXJcbiAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGltYWdlIGNvbmZpZyB3aXRoIGZvcm1hdCBmb3IgSW1hZ2ViaXRtYXAnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMoKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzKTtcblxuICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgY29uc3Qgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgIHBpeGVsczJEQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcbiAgICAgIHJldHVybiBidWZmZXJUb1RlbnNvcihkYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNTdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXMpO1xuICAgICAgaWYgKCFpbWFnZSB8fCAhY29udGV4dCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgbmV3SW1hZ2UuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJztcbiAgICAgIG5ld0ltYWdlLnNyYyA9IGltYWdlO1xuICAgICAgbmV3SW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjYW52YXMud2lkdGggPSBuZXdJbWFnZS53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IG5ld0ltYWdlLmhlaWdodDtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UobmV3SW1hZ2UsIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGNvbnN0IGltZyA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgcmVzb2x2ZShidWZmZXJUb1RlbnNvcihpbWcuZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgZGF0YSBwcm92aWRlZCBpcyBub3Qgc3VwcG9ydGVkIC0gYWJvcnRlZCB0ZW5zb3IgY3JlYXRpb24nKTtcbiAgfVxuXG4gIGlmIChkYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYnVmZmVyVG9UZW5zb3IoZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGRhdGEgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZCAtIGFib3J0ZWQgdGVuc29yIGNyZWF0aW9uJyk7XG4gIH1cbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21UZXh0dXJlKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tVGV4dHVyZSA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLlRleHR1cmVEYXRhVHlwZXM+KFxuICB0ZXh0dXJlOiBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGUsXG4gIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcbik6IFRlbnNvciA9PiB7XG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIC8vIEFsd2F5cyBhc3N1bWUgUkdCQUYzMi4gVE9ETzogc3VwcG9ydCBkaWZmZXJlbnQgdGV4dHVyZSBmb3JtYXRcbiAgY29uc3QgZGltcyA9IFsxLCBoZWlnaHQsIHdpZHRoLCA0XTtcbiAgcmV0dXJuIG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ3RleHR1cmUnLCB0eXBlOiAnZmxvYXQzMicsIHRleHR1cmUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcigpLlxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbUdwdUJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXG4gIGdwdUJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlclR5cGUsXG4gIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+LFxuKTogVGVuc29yID0+IHtcbiAgY29uc3QgeyBkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICdncHUtYnVmZmVyJywgdHlwZTogZGF0YVR5cGUgPz8gJ2Zsb2F0MzInLCBncHVCdWZmZXIsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xufTtcblxuLyoqXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbU1MVGVuc29yKCkuXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tTUxUZW5zb3IgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5NTFRlbnNvckRhdGFUeXBlcz4oXG4gIG1sVGVuc29yOiBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JUeXBlLFxuICBvcHRpb25zOiBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zPFQ+LFxuKTogVGVuc29yID0+IHtcbiAgY29uc3QgeyBkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICdtbC10ZW5zb3InLCB0eXBlOiBkYXRhVHlwZSA/PyAnZmxvYXQzMicsIG1sVGVuc29yLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZSB9KTtcbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21QaW5uZWRCdWZmZXIoKS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21QaW5uZWRCdWZmZXIgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxuICB0eXBlOiBULFxuICBidWZmZXI6IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZU1hcFtUXSxcbiAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuKTogVGVuc29yID0+IG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ2NwdS1waW5uZWQnLCB0eXBlLCBkYXRhOiBidWZmZXIsIGRpbXM6IGRpbXMgPz8gW2J1ZmZlci5sZW5ndGhdIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPVxuICB8IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MTZBcnJheUNvbnN0cnVjdG9yXG4gIHwgSW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yXG4gIHwgVWludDhBcnJheUNvbnN0cnVjdG9yXG4gIHwgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50MzJBcnJheUNvbnN0cnVjdG9yXG4gIHwgQmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvcjtcbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXkgPSBJbnN0YW5jZVR5cGU8U3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz47XG5cbi8vIGEgcnVudGltZSBtYXAgdGhhdCBtYXBzIHR5cGUgc3RyaW5nIHRvIFR5cGVkQXJyYXkgY29uc3RydWN0b3IuIFNob3VsZCBtYXRjaCBUZW5zb3IuRGF0YVR5cGVNYXAuXG5leHBvcnQgY29uc3QgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCA9IG5ldyBNYXA8c3RyaW5nLCBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzPihbXG4gIFsnZmxvYXQzMicsIEZsb2F0MzJBcnJheV0sXG4gIFsndWludDgnLCBVaW50OEFycmF5XSxcbiAgWydpbnQ4JywgSW50OEFycmF5XSxcbiAgWyd1aW50MTYnLCBVaW50MTZBcnJheV0sXG4gIFsnaW50MTYnLCBJbnQxNkFycmF5XSxcbiAgWydpbnQzMicsIEludDMyQXJyYXldLFxuICBbJ2Jvb2wnLCBVaW50OEFycmF5XSxcbiAgWydmbG9hdDY0JywgRmxvYXQ2NEFycmF5XSxcbiAgWyd1aW50MzInLCBVaW50MzJBcnJheV0sXG4gIFsnaW50NCcsIFVpbnQ4QXJyYXldLFxuICBbJ3VpbnQ0JywgVWludDhBcnJheV0sXG5dKTtcblxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQID0gbmV3IE1hcDxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLCBUZW5zb3IuVHlwZT4oW1xuICBbRmxvYXQzMkFycmF5LCAnZmxvYXQzMiddLFxuICBbVWludDhBcnJheSwgJ3VpbnQ4J10sXG4gIFtJbnQ4QXJyYXksICdpbnQ4J10sXG4gIFtVaW50MTZBcnJheSwgJ3VpbnQxNiddLFxuICBbSW50MTZBcnJheSwgJ2ludDE2J10sXG4gIFtJbnQzMkFycmF5LCAnaW50MzInXSxcbiAgW0Zsb2F0NjRBcnJheSwgJ2Zsb2F0NjQnXSxcbiAgW1VpbnQzMkFycmF5LCAndWludDMyJ10sXG5dKTtcblxuLy8gYSBkdW1teSB0eXBlIGRlY2xhcmF0aW9uIGZvciBGbG9hdDE2QXJyYXkgaW4gY2FzZSBhbnkgcG9seWZpbGwgaXMgYXZhaWxhYmxlLlxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIGNvbnN0IEZsb2F0MTZBcnJheTogYW55O1xufVxuXG4vLyB0aGUgZm9sbG93aW5nIGNvZGUgYWxsb3dzIGRlbGF5aW5nIGV4ZWN1dGlvbiBvZiBCaWdJbnQvRmxvYXQxNkFycmF5IGNoZWNraW5nLiBUaGlzIGFsbG93cyBsYXp5IGluaXRpYWxpemF0aW9uIGZvclxuLy8gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCBhbmQgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCwgd2hpY2ggYWxsb3dzIEJpZ0ludC9GbG9hdDE2QXJyYXlcbi8vIHBvbHlmaWxsIGlmIGF2YWlsYWJsZS5cbmxldCBpc1R5cGVkQXJyYXlDaGVja2VkID0gZmFsc2U7XG5leHBvcnQgY29uc3QgY2hlY2tUeXBlZEFycmF5ID0gKCkgPT4ge1xuICBpZiAoIWlzVHlwZWRBcnJheUNoZWNrZWQpIHtcbiAgICBpc1R5cGVkQXJyYXlDaGVja2VkID0gdHJ1ZTtcbiAgICBjb25zdCBpc0JpZ0ludDY0QXJyYXlBdmFpbGFibGUgPSB0eXBlb2YgQmlnSW50NjRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgQmlnSW50NjRBcnJheS5mcm9tO1xuICAgIGNvbnN0IGlzQmlnVWludDY0QXJyYXlBdmFpbGFibGUgPSB0eXBlb2YgQmlnVWludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEJpZ1VpbnQ2NEFycmF5LmZyb207XG4gICAgY29uc3QgaXNGbG9hdDE2QXJyYXlBdmFpbGFibGUgPSB0eXBlb2YgRmxvYXQxNkFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBGbG9hdDE2QXJyYXkuZnJvbTtcblxuICAgIGlmIChpc0JpZ0ludDY0QXJyYXlBdmFpbGFibGUpIHtcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuc2V0KCdpbnQ2NCcsIEJpZ0ludDY0QXJyYXkpO1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoQmlnSW50NjRBcnJheSwgJ2ludDY0Jyk7XG4gICAgfVxuICAgIGlmIChpc0JpZ1VpbnQ2NEFycmF5QXZhaWxhYmxlKSB7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgndWludDY0JywgQmlnVWludDY0QXJyYXkpO1xuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoQmlnVWludDY0QXJyYXksICd1aW50NjQnKTtcbiAgICB9XG4gICAgaWYgKGlzRmxvYXQxNkFycmF5QXZhaWxhYmxlKSB7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnZmxvYXQxNicsIEZsb2F0MTZBcnJheSk7XG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLnNldChGbG9hdDE2QXJyYXksICdmbG9hdDE2Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIEZsb2F0MTZBcnJheSBpcyBub3QgYXZhaWxhYmxlLCB1c2UgJ1VpbnQxNkFycmF5JyB0byBzdG9yZSB0aGUgZGF0YS5cbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuc2V0KCdmbG9hdDE2JywgVWludDE2QXJyYXkpO1xuICAgIH1cbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtcbiAgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gIE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxuICBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJy4vdGVuc29yLWltcGwuanMnO1xuXG4vKipcbiAqIGNhbGN1bGF0ZSBzaXplIGZyb20gZGltcy5cbiAqXG4gKiBAcGFyYW0gZGltcyB0aGUgZGltcyBhcnJheS4gTWF5IGJlIGFuIGlsbGVnYWwgaW5wdXQuXG4gKi9cbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVTaXplID0gKGRpbXM6IHJlYWRvbmx5IHVua25vd25bXSk6IG51bWJlciA9PiB7XG4gIGxldCBzaXplID0gMTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZGltID0gZGltc1tpXTtcbiAgICBpZiAodHlwZW9mIGRpbSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc1NhZmVJbnRlZ2VyKGRpbSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGRpbXNbJHtpfV0gbXVzdCBiZSBhbiBpbnRlZ2VyLCBnb3Q6ICR7ZGltfWApO1xuICAgIH1cbiAgICBpZiAoZGltIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYGRpbXNbJHtpfV0gbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyLCBnb3Q6ICR7ZGltfWApO1xuICAgIH1cbiAgICBzaXplICo9IGRpbTtcbiAgfVxuICByZXR1cm4gc2l6ZTtcbn07XG5cbi8qKlxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnJlc2hhcGUoKVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yUmVzaGFwZSA9ICh0ZW5zb3I6IFRlbnNvciwgZGltczogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3IgPT4ge1xuICBzd2l0Y2ggKHRlbnNvci5sb2NhdGlvbikge1xuICAgIGNhc2UgJ2NwdSc6XG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih0ZW5zb3IudHlwZSwgdGVuc29yLmRhdGEsIGRpbXMpO1xuICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3Ioe1xuICAgICAgICBsb2NhdGlvbjogJ2NwdS1waW5uZWQnLFxuICAgICAgICBkYXRhOiB0ZW5zb3IuZGF0YSBhcyBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ2RhdGEnXSxcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXG4gICAgICAgIGRpbXMsXG4gICAgICB9KTtcbiAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICd0ZXh0dXJlJyxcbiAgICAgICAgdGV4dHVyZTogdGVuc29yLnRleHR1cmUsXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcbiAgICAgICAgZGltcyxcbiAgICAgIH0pO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3Ioe1xuICAgICAgICBsb2NhdGlvbjogJ2dwdS1idWZmZXInLFxuICAgICAgICBncHVCdWZmZXI6IHRlbnNvci5ncHVCdWZmZXIsXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgY2FzZSAnbWwtdGVuc29yJzpcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcbiAgICAgICAgbG9jYXRpb246ICdtbC10ZW5zb3InLFxuICAgICAgICBtbFRlbnNvcjogdGVuc29yLm1sVGVuc29yLFxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBNTFRlbnNvckNvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxuICAgICAgICBkaW1zLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdGVuc29yUmVzaGFwZTogdGVuc29yIGxvY2F0aW9uICR7dGVuc29yLmxvY2F0aW9ufSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IHRlbnNvclRvRGF0YVVSTCwgdGVuc29yVG9JbWFnZURhdGEgfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLWltcGwuanMnO1xuaW1wb3J0IHsgVGVuc29yVG9EYXRhVXJsT3B0aW9ucywgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zIH0gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi5qcyc7XG5pbXBvcnQge1xuICB0ZW5zb3JGcm9tR3B1QnVmZmVyLFxuICB0ZW5zb3JGcm9tSW1hZ2UsXG4gIHRlbnNvckZyb21NTFRlbnNvcixcbiAgdGVuc29yRnJvbVBpbm5lZEJ1ZmZlcixcbiAgdGVuc29yRnJvbVRleHR1cmUsXG59IGZyb20gJy4vdGVuc29yLWZhY3RvcnktaW1wbC5qcyc7XG5pbXBvcnQge1xuICBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycyxcbiAgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG4gIFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zLFxuICBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zLFxuICBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9ucyxcbiAgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMsXG4gIFRlbnNvckZyb21NTFRlbnNvck9wdGlvbnMsXG4gIFRlbnNvckZyb21UZXh0dXJlT3B0aW9ucyxcbiAgVGVuc29yRnJvbVVybE9wdGlvbnMsXG4gIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXG59IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuaW1wb3J0IHtcbiAgY2hlY2tUeXBlZEFycmF5LFxuICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLFxuICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLFxuICBTdXBwb3J0ZWRUeXBlZEFycmF5LFxuICBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLFxufSBmcm9tICcuL3RlbnNvci1pbXBsLXR5cGUtbWFwcGluZy5qcyc7XG5pbXBvcnQgeyBjYWxjdWxhdGVTaXplLCB0ZW5zb3JSZXNoYXBlIH0gZnJvbSAnLi90ZW5zb3ItdXRpbHMtaW1wbC5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgYXMgVGVuc29ySW50ZXJmYWNlIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xuXG4vLyB0eXBlIGFsaWFzZXMgZm9yIHRob3NlIGV4cG9ydGVkIGZyb20gVGVuc29yIGludGVyZmFjZVxuXG50eXBlIFRlbnNvclR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuVHlwZTtcbnR5cGUgVGVuc29yRGF0YVR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuRGF0YVR5cGU7XG50eXBlIFRlbnNvckRhdGFMb2NhdGlvbiA9IFRlbnNvckludGVyZmFjZS5EYXRhTG9jYXRpb247XG50eXBlIFRlbnNvclRleHR1cmVUeXBlID0gVGVuc29ySW50ZXJmYWNlLlRleHR1cmVUeXBlO1xudHlwZSBUZW5zb3JHcHVCdWZmZXJUeXBlID0gVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlclR5cGU7XG50eXBlIFRlbnNvck1MVGVuc29yVHlwZSA9IFRlbnNvckludGVyZmFjZS5NTFRlbnNvclR5cGU7XG5cbi8qKlxuICogdGhlIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvciBpbnRlcmZhY2UuXG4gKlxuICogQGlnbm9yZVxuICovXG5leHBvcnQgY2xhc3MgVGVuc29yIGltcGxlbWVudHMgVGVuc29ySW50ZXJmYWNlIHtcbiAgLy8gI3JlZ2lvbiBjb25zdHJ1Y3RvcnNcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IENQVSB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICB0eXBlOiBUZW5zb3JUeXBlLFxuICAgIGRhdGE6IFRlbnNvckRhdGFUeXBlIHwgVWludDhDbGFtcGVkQXJyYXkgfCByZWFkb25seSBzdHJpbmdbXSB8IHJlYWRvbmx5IG51bWJlcltdIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLiBUeXBlIGlzIGluZmVycmVkIGZyb20gZGF0YS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGRhdGE6IFRlbnNvckRhdGFUeXBlIHwgVWludDhDbGFtcGVkQXJyYXkgfCByZWFkb25seSBzdHJpbmdbXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBwaW5uZWQgQ1BVIGRhdGEgd2l0aCB0aGUgZ2l2ZW4gdHlwZSBhbmQgZGltcy5cbiAgICpcbiAgICogVGVuc29yJ3MgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ2NwdS1waW5uZWQnLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIFdlYkdMIHRleHR1cmUgd2l0aCB0aGUgZ2l2ZW4gdHlwZSBhbmQgZGltcy5cbiAgICpcbiAgICogVGVuc29yJ3MgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ3RleHR1cmUnLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVycyk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJHUFUgYnVmZmVyIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdncHUtYnVmZmVyJy5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycyk7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIFdlYk5OIE1MVGVuc29yIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXG4gICAqXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdtbC10ZW5zb3InLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGFyZzA6XG4gICAgICB8IFRlbnNvclR5cGVcbiAgICAgIHwgVGVuc29yRGF0YVR5cGVcbiAgICAgIHwgVWludDhDbGFtcGVkQXJyYXlcbiAgICAgIHwgcmVhZG9ubHkgc3RyaW5nW11cbiAgICAgIHwgcmVhZG9ubHkgYm9vbGVhbltdXG4gICAgICB8IENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1xuICAgICAgfCBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzXG4gICAgICB8IEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVyc1xuICAgICAgfCBNTFRlbnNvckNvbnN0cnVjdG9yUGFyYW1ldGVycyxcbiAgICBhcmcxPzogVGVuc29yRGF0YVR5cGUgfCBVaW50OENsYW1wZWRBcnJheSB8IHJlYWRvbmx5IG51bWJlcltdIHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBib29sZWFuW10sXG4gICAgYXJnMj86IHJlYWRvbmx5IG51bWJlcltdLFxuICApIHtcbiAgICAvLyBwZXJmb3JtIG9uZS10aW1lIGNoZWNrIGZvciBCaWdJbnQvRmxvYXQxNkFycmF5IHN1cHBvcnRcbiAgICBjaGVja1R5cGVkQXJyYXkoKTtcblxuICAgIGxldCB0eXBlOiBUZW5zb3JUeXBlO1xuICAgIGxldCBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcblxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ29iamVjdCcgJiYgJ2xvY2F0aW9uJyBpbiBhcmcwKSB7XG4gICAgICAvL1xuICAgICAgLy8gY29uc3RydWN0aW5nIHRlbnNvciBmcm9tIHNwZWNpZmljIGxvY2F0aW9uXG4gICAgICAvL1xuICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSBhcmcwLmxvY2F0aW9uO1xuICAgICAgdHlwZSA9IGFyZzAudHlwZTtcbiAgICAgIGRpbXMgPSBhcmcwLmRpbXM7XG4gICAgICBzd2l0Y2ggKGFyZzAubG9jYXRpb24pIHtcbiAgICAgICAgY2FzZSAnY3B1LXBpbm5lZCc6IHtcbiAgICAgICAgICBjb25zdCBleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuZ2V0KHR5cGUpO1xuICAgICAgICAgIGlmICghZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIHBpbm5lZCBidWZmZXJgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEoYXJnMC5kYXRhIGluc3RhbmNlb2YgZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBidWZmZXIgc2hvdWxkIGJlIG9mIHR5cGUgJHtleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3Rvci5uYW1lfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNwdURhdGEgPSBhcmcwLmRhdGE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAndGV4dHVyZSc6IHtcbiAgICAgICAgICBpZiAodHlwZSAhPT0gJ2Zsb2F0MzInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSB0ZXh0dXJlYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZ3B1VGV4dHVyZURhdGEgPSBhcmcwLnRleHR1cmU7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Zsb2F0MzInICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnZmxvYXQxNicgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQzMicgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQ2NCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50MzInICYmXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDgnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnYm9vbCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50NCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQ0J1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gZ3B1IGJ1ZmZlcmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmdwdUJ1ZmZlckRhdGEgPSBhcmcwLmdwdUJ1ZmZlcjtcbiAgICAgICAgICB0aGlzLmRvd25sb2FkZXIgPSBhcmcwLmRvd25sb2FkO1xuICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSBhcmcwLmRpc3Bvc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnbWwtdGVuc29yJzoge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGUgIT09ICdmbG9hdDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Zsb2F0MTYnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50MzInICYmXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50NjQnICYmXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDMyJyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ2NCcgJiZcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQ4JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ4JyAmJlxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Jvb2wnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBNTFRlbnNvcmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1sVGVuc29yRGF0YSA9IGFyZzAubWxUZW5zb3I7XG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUZW5zb3IgY29uc3RydWN0b3I6IHVuc3VwcG9ydGVkIGxvY2F0aW9uICcke3RoaXMuZGF0YUxvY2F0aW9ufSdgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3Igb2YgbG9jYXRpb24gJ2NwdSdcbiAgICAgIC8vXG4gICAgICBsZXQgZGF0YTogVGVuc29yRGF0YVR5cGU7XG4gICAgICBsZXQgbWF5YmVEaW1zOiB0eXBlb2YgYXJnMSB8IHR5cGVvZiBhcmcyO1xuICAgICAgLy8gY2hlY2sgd2hldGhlciBhcmcwIGlzIHR5cGUgb3IgZGF0YVxuICAgICAgaWYgKHR5cGVvZiBhcmcwID09PSAnc3RyaW5nJykge1xuICAgICAgICAvL1xuICAgICAgICAvLyBPdmVycmlkZTogY29uc3RydWN0b3IodHlwZSwgZGF0YSwgLi4uKVxuICAgICAgICAvL1xuICAgICAgICB0eXBlID0gYXJnMDtcbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMjtcbiAgICAgICAgaWYgKGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgLy8gc3RyaW5nIHRlbnNvclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcmcxKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkEgc3RyaW5nIHRlbnNvcidzIGRhdGEgbXVzdCBiZSBhIHN0cmluZyBhcnJheS5cIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIGRvbid0IGNoZWNrIHdoZXRoZXIgZXZlcnkgZWxlbWVudCBpbiB0aGUgYXJyYXkgaXMgc3RyaW5nOyB0aGlzIGlzIHRvbyBzbG93LiB3ZSBhc3N1bWUgaXQncyBjb3JyZWN0IGFuZFxuICAgICAgICAgIC8vIGVycm9yIHdpbGwgYmUgcG9wdWxhdGVkIGF0IGluZmVyZW5jZVxuICAgICAgICAgIGRhdGEgPSBhcmcxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG51bWVyaWMgdGVuc29yXG4gICAgICAgICAgY29uc3QgdHlwZWRBcnJheUNvbnN0cnVjdG9yID0gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5nZXQoYXJnMCk7XG4gICAgICAgICAgaWYgKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0ZW5zb3IgdHlwZTogJHthcmcwfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgICAgIGlmICgoYXJnMCA9PT0gJ2Zsb2F0MTYnICYmIHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9PT0gVWludDE2QXJyYXkpIHx8IGFyZzAgPT09ICd1aW50NCcgfHwgYXJnMCA9PT0gJ2ludDQnKSB7XG4gICAgICAgICAgICAgIC8vIC0gJ2Zsb2F0MTYnOlxuICAgICAgICAgICAgICAvLyAgIFdoZW4gbm8gRmxvYXQxNkFycmF5IHBvbHlmaWxsIGlzIHVzZWQsIHdlIGNhbm5vdCBjcmVhdGUgJ2Zsb2F0MTYnIHRlbnNvciBmcm9tIG51bWJlciBhcnJheS5cbiAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgLy8gICBUaHJvdyBlcnJvciBoZXJlIGJlY2F1c2Ugd2hlbiB1c2VyIHRyeSB0byB1c2UgbnVtYmVyIGFycmF5IGFzIGRhdGEsXG4gICAgICAgICAgICAgIC8vICAgZS5nLiBuZXcgVGVuc29yKCdmbG9hdDE2JywgWzEsIDIsIDMsIDRdLCBkaW1zKSksIGl0IHdpbGwgYWN0dWFsbHkgY2FsbFxuICAgICAgICAgICAgICAvLyAgIFVpbnQxNkFycmF5LmZyb20oYXJnMSkgd2hpY2ggZ2VuZXJhdGVzIHdyb25nIGRhdGEuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIC8vIC0gJ3VpbnQ0JyBhbmQgJ2ludDQnOlxuICAgICAgICAgICAgICAvLyAgIFVpbnQ4QXJyYXkuZnJvbShhcmcxKSB3aWxsIGdlbmVyYXRlIHdyb25nIGRhdGEgZm9yICd1aW50NCcgYW5kICdpbnQ0JyB0ZW5zb3IuXG4gICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgYENyZWF0aW5nIGEgJHthcmcwfSB0ZW5zb3IgZnJvbSBudW1iZXIgYXJyYXkgaXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIHVzZSAke3R5cGVkQXJyYXlDb25zdHJ1Y3Rvci5uYW1lfSBhcyBkYXRhLmAsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZzAgPT09ICd1aW50NjQnIHx8IGFyZzAgPT09ICdpbnQ2NCcpIHtcbiAgICAgICAgICAgICAgLy8gdXNlICdhcyBhbnknIGhlcmUgYmVjYXVzZTpcbiAgICAgICAgICAgICAgLy8gMS4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHR5cGUgb2YgJ0FycmF5LmlzQXJyYXkoKScgZG9lcyBub3Qgd29yayB3aXRoIHJlYWRvbmx5IGFycmF5cy5cbiAgICAgICAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTcwMDJcbiAgICAgICAgICAgICAgLy8gMi4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHVuaW9uIHR5cGUgb2YgJyhCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3J8QmlnVWludDY0QXJyYXlDb25zdHJ1Y3RvcikuZnJvbSgpJ1xuICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBhY2NlcHQgcGFyYW1ldGVyIG1hcEZuLlxuICAgICAgICAgICAgICAvLyAzLiBwYXJhbWV0ZXJzIG9mICdTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLmZyb20oKScgZG9lcyBub3QgbWF0Y2ggdGhlIHJlcXVpcmVtZW50IG9mIHRoZSB1bmlvblxuICAgICAgICAgICAgICAvLyB0eXBlLlxuXG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IGJpZ2ludFtdXCIgaGVyZS5cblxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICBkYXRhID0gKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciBhcyBhbnkpLmZyb20oYXJnMSwgQmlnSW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdXCIgaGVyZS5cbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICAgZGF0YSA9ICh0eXBlZEFycmF5Q29uc3RydWN0b3IgYXMgYW55KS5mcm9tKGFyZzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMSBpbnN0YW5jZW9mIHR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgZGF0YSA9IGFyZzE7XG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcxIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChhcmcwID09PSAndWludDgnKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSBVaW50OEFycmF5LmZyb20oYXJnMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBIFVpbnQ4Q2xhbXBlZEFycmF5IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mIHVpbnQ4YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEEgJHt0eXBlfSB0ZW5zb3IncyBkYXRhIG11c3QgYmUgdHlwZSBvZiAke3R5cGVkQXJyYXlDb25zdHJ1Y3Rvcn1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIE92ZXJyaWRlOiBjb25zdHJ1Y3RvcihkYXRhLCAuLi4pXG4gICAgICAgIC8vXG4gICAgICAgIG1heWJlRGltcyA9IGFyZzE7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzApKSB7XG4gICAgICAgICAgLy8gb25seSBib29sZWFuW10gYW5kIHN0cmluZ1tdIGlzIHN1cHBvcnRlZFxuICAgICAgICAgIGlmIChhcmcwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGVuc29yIHR5cGUgY2Fubm90IGJlIGluZmVycmVkIGZyb20gYW4gZW1wdHkgYXJyYXkuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGZpcnN0RWxlbWVudFR5cGUgPSB0eXBlb2YgYXJnMFswXTtcbiAgICAgICAgICBpZiAoZmlyc3RFbGVtZW50VHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnc3RyaW5nJztcbiAgICAgICAgICAgIGRhdGEgPSBhcmcwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZmlyc3RFbGVtZW50VHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0eXBlID0gJ2Jvb2wnO1xuICAgICAgICAgICAgLy8gJ2FyZzAnIGlzIG9mIHR5cGUgJ2Jvb2xlYW5bXScuIFVpbnQ4QXJyYXkuZnJvbShib29sZWFuW10pIGFjdHVhbGx5IHdvcmtzLCBidXQgdHlwZXNjcmlwdCB0aGlua3MgdGhpcyBpc1xuICAgICAgICAgICAgLy8gd3JvbmcgdHlwZS4gV2UgdXNlICdhcyBhbnknIHRvIG1ha2UgaXQgaGFwcHkuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgZGF0YSA9IFVpbnQ4QXJyYXkuZnJvbShhcmcwIGFzIGFueVtdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBlbGVtZW50IHR5cGUgb2YgZGF0YSBhcnJheTogJHtmaXJzdEVsZW1lbnRUeXBlfS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYXJnMCBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5KSB7XG4gICAgICAgICAgdHlwZSA9ICd1aW50OCc7XG4gICAgICAgICAgZGF0YSA9IFVpbnQ4QXJyYXkuZnJvbShhcmcwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBnZXQgdGVuc29yIHR5cGUgZnJvbSBUeXBlZEFycmF5XG4gICAgICAgICAgY29uc3QgbWFwcGVkVHlwZSA9IE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuZ2V0KFxuICAgICAgICAgICAgYXJnMC5jb25zdHJ1Y3RvciBhcyBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKG1hcHBlZFR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5zdXBwb3J0ZWQgdHlwZSBmb3IgdGVuc29yIGRhdGE6ICR7YXJnMC5jb25zdHJ1Y3Rvcn0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHR5cGUgPSBtYXBwZWRUeXBlO1xuICAgICAgICAgIGRhdGEgPSBhcmcwIGFzIFN1cHBvcnRlZFR5cGVkQXJyYXk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdHlwZSBhbmQgZGF0YSBpcyBwcm9jZXNzZWQsIG5vdyBwcm9jZXNzaW5nIGRpbXNcbiAgICAgIGlmIChtYXliZURpbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBhc3N1bWUgMS1EIHRlbnNvciBpZiBkaW1zIG9taXR0ZWRcbiAgICAgICAgbWF5YmVEaW1zID0gW2RhdGEubGVuZ3RoXTtcbiAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWF5YmVEaW1zKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQSB0ZW5zb3IncyBkaW1zIG11c3QgYmUgYSBudW1iZXIgYXJyYXlcIik7XG4gICAgICB9XG4gICAgICBkaW1zID0gbWF5YmVEaW1zIGFzIHJlYWRvbmx5IG51bWJlcltdO1xuXG4gICAgICB0aGlzLmNwdURhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnY3B1JztcbiAgICB9XG5cbiAgICAvLyBwZXJmb3JtIGNoZWNrIG9uIGRpbXNcbiAgICBjb25zdCBzaXplID0gY2FsY3VsYXRlU2l6ZShkaW1zKTtcbiAgICAvLyBpZiBkYXRhIGlzIG9uIENQVSwgY2hlY2sgd2hldGhlciBkYXRhIGxlbmd0aCBtYXRjaGVzIHRlbnNvciBzaXplXG4gICAgaWYgKHRoaXMuY3B1RGF0YSAmJiBzaXplICE9PSB0aGlzLmNwdURhdGEubGVuZ3RoKSB7XG4gICAgICBpZiAoKHR5cGUgPT09ICd1aW50NCcgfHwgdHlwZSA9PT0gJ2ludDQnKSAmJiBNYXRoLmNlaWwoc2l6ZSAvIDIpID09PSB0aGlzLmNwdURhdGEubGVuZ3RoKSB7XG4gICAgICAgIC8vIGZvciAodSlpbnQ0LCB0aGUgZGF0YSBsZW5ndGggaXMgaGFsZiBvZiB0aGUgdGVuc29yIHNpemUuIFNvIHdlIGNoZWNrIHRoaXMgc3BlY2lhbCBjYXNlIHdoZW4gc2l6ZSBpcyBvZGQuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbnNvcidzIHNpemUoJHtzaXplfSkgZG9lcyBub3QgbWF0Y2ggZGF0YSBsZW5ndGgoJHt0aGlzLmNwdURhdGEubGVuZ3RofSkuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmRpbXMgPSBkaW1zO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gZmFjdG9yeVxuICBzdGF0aWMgYXN5bmMgZnJvbUltYWdlKFxuICAgIGltYWdlOiBJbWFnZURhdGEgfCBIVE1MSW1hZ2VFbGVtZW50IHwgSW1hZ2VCaXRtYXAgfCBzdHJpbmcsXG4gICAgb3B0aW9ucz86XG4gICAgICB8IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zXG4gICAgICB8IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zXG4gICAgICB8IFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnNcbiAgICAgIHwgVGVuc29yRnJvbVVybE9wdGlvbnMsXG4gICk6IFByb21pc2U8VGVuc29ySW50ZXJmYWNlPiB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21JbWFnZShpbWFnZSwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRleHR1cmU8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5UZXh0dXJlRGF0YVR5cGVzPihcbiAgICB0ZXh0dXJlOiBUZW5zb3JUZXh0dXJlVHlwZSxcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VD4sXG4gICk6IFRlbnNvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21UZXh0dXJlKHRleHR1cmUsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21HcHVCdWZmZXI8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJEYXRhVHlwZXM+KFxuICAgIGdwdUJ1ZmZlcjogVGVuc29yR3B1QnVmZmVyVHlwZSxcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPixcbiAgKTogVGVuc29ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGVuc29yRnJvbUdwdUJ1ZmZlcihncHVCdWZmZXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21NTFRlbnNvcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLk1MVGVuc29yRGF0YVR5cGVzPihcbiAgICBtbFRlbnNvcjogVGVuc29yTUxUZW5zb3JUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21NTFRlbnNvck9wdGlvbnM8VD4sXG4gICk6IFRlbnNvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21NTFRlbnNvcihtbFRlbnNvciwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVBpbm5lZEJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkNwdVBpbm5lZERhdGFUeXBlcz4oXG4gICAgdHlwZTogVCxcbiAgICBidWZmZXI6IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZU1hcFtUXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk6IFRlbnNvciB7XG4gICAgcmV0dXJuIHRlbnNvckZyb21QaW5uZWRCdWZmZXIodHlwZSwgYnVmZmVyLCBkaW1zKTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIGNvbnZlcnNpb25zXG4gIHRvRGF0YVVSTChvcHRpb25zPzogVGVuc29yVG9EYXRhVXJsT3B0aW9ucyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRlbnNvclRvRGF0YVVSTCh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHRvSW1hZ2VEYXRhKG9wdGlvbnM/OiBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMpOiBJbWFnZURhdGEge1xuICAgIHJldHVybiB0ZW5zb3JUb0ltYWdlRGF0YSh0aGlzLCBvcHRpb25zKTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwdWJsaWMgZmllbGRzXG4gIHJlYWRvbmx5IGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xuICByZWFkb25seSB0eXBlOiBUZW5zb3JUeXBlO1xuICByZWFkb25seSBzaXplOiBudW1iZXI7XG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHByaXZhdGUgZmllbGRzXG5cbiAgLyoqXG4gICAqIHN0b3JlcyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXG4gICAqL1xuICBwcml2YXRlIGRhdGFMb2NhdGlvbjogVGVuc29yRGF0YUxvY2F0aW9uO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIGRhdGEgb24gQ1BVLCBpZiBsb2NhdGlvbiBpcyAnY3B1JyBvciAnY3B1LXBpbm5lZCcuIG90aGVyd2lzZSBlbXB0eS5cbiAgICovXG4gIHByaXZhdGUgY3B1RGF0YT86IFRlbnNvckRhdGFUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgdGV4dHVyZSB3aGVuIGxvY2F0aW9uIGlzICd0ZXh0dXJlJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBncHVUZXh0dXJlRGF0YT86IFRlbnNvclRleHR1cmVUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgR1BVIGJ1ZmZlciB3aGVuIGxvY2F0aW9uIGlzICdncHUtYnVmZmVyJy4gb3RoZXJ3aXNlIGVtcHR5LlxuICAgKi9cbiAgcHJpdmF0ZSBncHVCdWZmZXJEYXRhPzogVGVuc29yR3B1QnVmZmVyVHlwZTtcblxuICAvKipcbiAgICogc3RvcmVzIHRoZSB1bmRlcmx5aW5nIFdlYk5OIE1MVGVuc29yIHdoZW4gbG9jYXRpb24gaXMgJ21sLXRlbnNvcicuIG90aGVyd2lzZSBlbXB0eS5cbiAgICovXG4gIHByaXZhdGUgbWxUZW5zb3JEYXRhPzogVGVuc29yTUxUZW5zb3JUeXBlO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgYW4gb3B0aW9uYWwgZG93bmxvYWRlciBmdW5jdGlvbiB0byBkb3dubG9hZCBkYXRhIGZyb20gR1BVIHRvIENQVS5cbiAgICovXG4gIHByaXZhdGUgZG93bmxvYWRlcj8oKTogUHJvbWlzZTxUZW5zb3JEYXRhVHlwZT47XG5cbiAgLyoqXG4gICAqIGEgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGRhdGEgaXMgYmVpbmcgZG93bmxvYWRlZCBmcm9tIEdQVSB0byBDUFUuXG4gICAqL1xuICBwcml2YXRlIGlzRG93bmxvYWRpbmc/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBzdG9yZXMgYW4gb3B0aW9uYWwgZGlzcG9zZXIgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdW5kZXJseWluZyBkYXRhLlxuICAgKi9cbiAgcHJpdmF0ZSBkaXNwb3Nlcj8oKTogdm9pZDtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gcHJvcGVydGllc1xuICBnZXQgZGF0YSgpOiBUZW5zb3JEYXRhVHlwZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICghdGhpcy5jcHVEYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUaGUgZGF0YSBpcyBub3Qgb24gQ1BVLiBVc2UgYGdldERhdGEoKWAgdG8gZG93bmxvYWQgR1BVIGRhdGEgdG8gQ1BVLCAnICtcbiAgICAgICAgICAnb3IgdXNlIGB0ZXh0dXJlYCBvciBgZ3B1QnVmZmVyYCBwcm9wZXJ0eSB0byBhY2Nlc3MgdGhlIEdQVSBkYXRhIGRpcmVjdGx5LicsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jcHVEYXRhO1xuICB9XG5cbiAgZ2V0IGxvY2F0aW9uKCk6IFRlbnNvckRhdGFMb2NhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YUxvY2F0aW9uO1xuICB9XG5cbiAgZ2V0IHRleHR1cmUoKTogVGVuc29yVGV4dHVyZVR5cGUge1xuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcbiAgICBpZiAoIXRoaXMuZ3B1VGV4dHVyZURhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgaXMgbm90IHN0b3JlZCBhcyBhIFdlYkdMIHRleHR1cmUuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdwdVRleHR1cmVEYXRhO1xuICB9XG5cbiAgZ2V0IGdwdUJ1ZmZlcigpOiBUZW5zb3JHcHVCdWZmZXJUeXBlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKCF0aGlzLmdwdUJ1ZmZlckRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgaXMgbm90IHN0b3JlZCBhcyBhIFdlYkdQVSBidWZmZXIuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdwdUJ1ZmZlckRhdGE7XG4gIH1cblxuICBnZXQgbWxUZW5zb3IoKTogVGVuc29yTUxUZW5zb3JUeXBlIHtcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XG4gICAgaWYgKCF0aGlzLm1sVGVuc29yRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViTk4gTUxUZW5zb3IuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm1sVGVuc29yRGF0YTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBtZXRob2RzXG5cbiAgYXN5bmMgZ2V0RGF0YShyZWxlYXNlRGF0YT86IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPiB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIHN3aXRjaCAodGhpcy5kYXRhTG9jYXRpb24pIHtcbiAgICAgIGNhc2UgJ2NwdSc6XG4gICAgICBjYXNlICdjcHUtcGlubmVkJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICAgIGNhc2UgJ3RleHR1cmUnOlxuICAgICAgY2FzZSAnZ3B1LWJ1ZmZlcic6XG4gICAgICBjYXNlICdtbC10ZW5zb3InOiB7XG4gICAgICAgIGlmICghdGhpcy5kb3dubG9hZGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgbm90IGNyZWF0ZWQgd2l0aCBhIHNwZWNpZmllZCBkYXRhIGRvd25sb2FkZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNEb3dubG9hZGluZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLmlzRG93bmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmRvd25sb2FkZXIoKTtcbiAgICAgICAgICB0aGlzLmRvd25sb2FkZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnY3B1JztcbiAgICAgICAgICB0aGlzLmNwdURhdGEgPSBkYXRhO1xuXG4gICAgICAgICAgaWYgKHJlbGVhc2VEYXRhICYmIHRoaXMuZGlzcG9zZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGdldCBkYXRhIGZyb20gbG9jYXRpb246ICR7dGhpcy5kYXRhTG9jYXRpb259YCk7XG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBiZWluZyBkb3dubG9hZGVkLicpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRpc3Bvc2VyKSB7XG4gICAgICB0aGlzLmRpc3Bvc2VyKCk7XG4gICAgICB0aGlzLmRpc3Bvc2VyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLmNwdURhdGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5ncHVUZXh0dXJlRGF0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmdwdUJ1ZmZlckRhdGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5tbFRlbnNvckRhdGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kb3dubG9hZGVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gJ25vbmUnO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gdGVuc29yIHV0aWxpdGllc1xuICBwcml2YXRlIGVuc3VyZVZhbGlkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRhdGFMb2NhdGlvbiA9PT0gJ25vbmUnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0ZW5zb3IgaXMgZGlzcG9zZWQuJyk7XG4gICAgfVxuICB9XG5cbiAgcmVzaGFwZShkaW1zOiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvckludGVyZmFjZSB7XG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xuICAgIGlmICh0aGlzLmRvd25sb2FkZXIgfHwgdGhpcy5kaXNwb3Nlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVzaGFwZSBhIHRlbnNvciB0aGF0IG93bnMgR1BVIHJlc291cmNlLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGVuc29yUmVzaGFwZSh0aGlzLCBkaW1zKTtcbiAgfVxuICAvLyAjZW5kcmVnaW9uXG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IFRlbnNvckZhY3RvcnkgfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcbmltcG9ydCB7IFRlbnNvciBhcyBUZW5zb3JJbXBsIH0gZnJvbSAnLi90ZW5zb3ItaW1wbC5qcyc7XG5pbXBvcnQgeyBUeXBlZFRlbnNvclV0aWxzIH0gZnJvbSAnLi90ZW5zb3ItdXRpbHMuanMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXG5cbi8qKlxuICogcmVwcmVzZW50IGEgYmFzaWMgdGVuc29yIHdpdGggc3BlY2lmaWVkIGRpbWVuc2lvbnMgYW5kIGRhdGEgdHlwZS5cbiAqL1xuaW50ZXJmYWNlIFR5cGVkVGVuc29yQmFzZTxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IHtcbiAgLyoqXG4gICAqIEdldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XG4gIC8qKlxuICAgKiBHZXQgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxuICAgKi9cbiAgcmVhZG9ubHkgdHlwZTogVDtcbiAgLyoqXG4gICAqIEdldCB0aGUgYnVmZmVyIGRhdGEgb2YgdGhlIHRlbnNvci5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIENQVSAoZWcuIGl0J3MgaW4gdGhlIGZvcm0gb2YgV2ViR0wgdGV4dHVyZSBvciBXZWJHUFUgYnVmZmVyKSwgdGhyb3cgZXJyb3IuXG4gICAqL1xuICByZWFkb25seSBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF07XG4gIC8qKlxuICAgKiBHZXQgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246IFRlbnNvci5EYXRhTG9jYXRpb247XG4gIC8qKlxuICAgKiBHZXQgdGhlIFdlYkdMIHRleHR1cmUgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBvbiBHUFUgYXMgV2ViR0wgdGV4dHVyZSwgdGhyb3cgZXJyb3IuXG4gICAqL1xuICByZWFkb25seSB0ZXh0dXJlOiBUZW5zb3IuVGV4dHVyZVR5cGU7XG4gIC8qKlxuICAgKiBHZXQgdGhlIFdlYkdQVSBidWZmZXIgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqXG4gICAqIElmIHRoZSBkYXRhIGlzIG5vdCBvbiBHUFUgYXMgV2ViR1BVIGJ1ZmZlciwgdGhyb3cgZXJyb3IuXG4gICAqL1xuICByZWFkb25seSBncHVCdWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFdlYk5OIE1MVGVuc29yIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3QgaW4gYSBXZWJOTiBNTFRlbnNvciwgdGhyb3cgZXJyb3IuXG4gICAqL1xuICByZWFkb25seSBtbFRlbnNvcjogVGVuc29yLk1MVGVuc29yVHlwZTtcblxuICAvKipcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxuICAgKlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBDUFUsIHJldHVybnMgdGhlIGRhdGEgaW1tZWRpYXRlbHkuXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIEdQVSwgZG93bmxvYWRzIHRoZSBkYXRhIGFuZCByZXR1cm5zIHRoZSBwcm9taXNlLlxuICAgKlxuICAgKiBAcGFyYW0gcmVsZWFzZURhdGEgLSB3aGV0aGVyIHJlbGVhc2UgdGhlIGRhdGEgb24gR1BVLiBJZ25vcmUgaWYgZGF0YSBpcyBhbHJlYWR5IG9uIENQVS5cbiAgICovXG4gIGdldERhdGEocmVsZWFzZURhdGE/OiBib29sZWFuKTogUHJvbWlzZTxUZW5zb3IuRGF0YVR5cGVNYXBbVF0+O1xuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICpcbiAgICogSWYgdGhlIGRhdGEgaXMgb24gQ1BVLCByZW1vdmUgaXRzIGludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgdW5kZXJseWluZyBkYXRhLlxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBHUFUsIHJlbGVhc2UgdGhlIGRhdGEgb24gR1BVLlxuICAgKlxuICAgKiBBZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24sIHRoZSB0ZW5zb3IgaXMgY29uc2lkZXJlZCBubyBsb25nZXIgdmFsaWQuIEl0cyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnbm9uZScuXG4gICAqL1xuICBkaXNwb3NlKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBUZW5zb3Ige1xuICBpbnRlcmZhY2UgRGF0YVR5cGVNYXAge1xuICAgIGZsb2F0MzI6IEZsb2F0MzJBcnJheTtcbiAgICB1aW50ODogVWludDhBcnJheTtcbiAgICBpbnQ4OiBJbnQ4QXJyYXk7XG4gICAgdWludDE2OiBVaW50MTZBcnJheTtcbiAgICBpbnQxNjogSW50MTZBcnJheTtcbiAgICBpbnQzMjogSW50MzJBcnJheTtcbiAgICBpbnQ2NDogQmlnSW50NjRBcnJheTtcbiAgICBzdHJpbmc6IHN0cmluZ1tdO1xuICAgIGJvb2w6IFVpbnQ4QXJyYXk7XG4gICAgZmxvYXQxNjogVWludDE2QXJyYXk7IC8vIEtlZXAgdXNpbmcgVWludDE2QXJyYXkgdW50aWwgd2UgaGF2ZSBhIGNvbmNyZXRlIHNvbHV0aW9uIGZvciBmbG9hdCAxNi5cbiAgICBmbG9hdDY0OiBGbG9hdDY0QXJyYXk7XG4gICAgdWludDMyOiBVaW50MzJBcnJheTtcbiAgICB1aW50NjQ6IEJpZ1VpbnQ2NEFycmF5O1xuICAgIC8vIGNvbXBsZXg2NDogbmV2ZXI7XG4gICAgLy8gY29tcGxleDEyODogbmV2ZXI7XG4gICAgLy8gYmZsb2F0MTY6IG5ldmVyO1xuICAgIHVpbnQ0OiBVaW50OEFycmF5O1xuICAgIGludDQ6IEludDhBcnJheTtcbiAgfVxuXG4gIGludGVyZmFjZSBFbGVtZW50VHlwZU1hcCB7XG4gICAgZmxvYXQzMjogbnVtYmVyO1xuICAgIHVpbnQ4OiBudW1iZXI7XG4gICAgaW50ODogbnVtYmVyO1xuICAgIHVpbnQxNjogbnVtYmVyO1xuICAgIGludDE2OiBudW1iZXI7XG4gICAgaW50MzI6IG51bWJlcjtcbiAgICBpbnQ2NDogYmlnaW50O1xuICAgIHN0cmluZzogc3RyaW5nO1xuICAgIGJvb2w6IGJvb2xlYW47XG4gICAgZmxvYXQxNjogbnVtYmVyOyAvLyBLZWVwIHVzaW5nIFVpbnQxNkFycmF5IHVudGlsIHdlIGhhdmUgYSBjb25jcmV0ZSBzb2x1dGlvbiBmb3IgZmxvYXQgMTYuXG4gICAgZmxvYXQ2NDogbnVtYmVyO1xuICAgIHVpbnQzMjogbnVtYmVyO1xuICAgIHVpbnQ2NDogYmlnaW50O1xuICAgIC8vIGNvbXBsZXg2NDogbmV2ZXI7XG4gICAgLy8gY29tcGxleDEyODogbmV2ZXI7XG4gICAgLy8gYmZsb2F0MTY6IG5ldmVyO1xuICAgIHVpbnQ0OiBudW1iZXI7XG4gICAgaW50NDogbnVtYmVyO1xuICB9XG5cbiAgdHlwZSBEYXRhVHlwZSA9IERhdGFUeXBlTWFwW1R5cGVdO1xuICB0eXBlIEVsZW1lbnRUeXBlID0gRWxlbWVudFR5cGVNYXBbVHlwZV07XG5cbiAgLyoqXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHBpbm5lZCBDUFUgYnVmZmVyXG4gICAqL1xuICBleHBvcnQgdHlwZSBDcHVQaW5uZWREYXRhVHlwZXMgPSBFeGNsdWRlPFRlbnNvci5UeXBlLCAnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIHR5cGUgYWxpYXMgZm9yIFdlYkdMIHRleHR1cmVcbiAgICovXG4gIGV4cG9ydCB0eXBlIFRleHR1cmVUeXBlID0gV2ViR0xUZXh0dXJlO1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXG4gICAqL1xuICBleHBvcnQgdHlwZSBUZXh0dXJlRGF0YVR5cGVzID0gJ2Zsb2F0MzInO1xuXG4gIC8qKlxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJHUFUgYnVmZmVyXG4gICAqXG4gICAqIFRoZSByZWFzb24gd2h5IHdlIGRvbid0IHVzZSB0eXBlIFwiR1BVQnVmZmVyXCIgZGVmaW5lZCBpbiB3ZWJncHUuZC50cyBmcm9tIEB3ZWJncHUvdHlwZXMgaXMgYmVjYXVzZSBcIkB3ZWJncHUvdHlwZXNcIlxuICAgKiByZXF1aXJlcyBcIkB0eXBlcy9kb20td2ViY29kZWNzXCIgYXMgcGVlciBkZXBlbmRlbmN5IHdoZW4gdXNpbmcgVHlwZVNjcmlwdCA8IHY1LjEgYW5kIGl0cyB2ZXJzaW9uIG5lZWQgdG8gYmUgY2hvc2VuXG4gICAqIGNhcmVmdWxseSBhY2NvcmRpbmcgdG8gdGhlIFR5cGVTY3JpcHQgdmVyc2lvbiBiZWluZyB1c2VkLiBUaGlzIG1lYW5zIHNvIGZhciB0aGVyZSBpcyBub3QgYSB3YXkgdG8ga2VlcCBldmVyeVxuICAgKiBUeXBlU2NyaXB0IHZlcnNpb24gaGFwcHkuIEl0IHR1cm5zIG91dCB0aGF0IHdlIHdpbGwgZWFzaWx5IGJyb2tlIHVzZXJzIG9uIHNvbWUgVHlwZVNjcmlwdCB2ZXJzaW9uLlxuICAgKlxuICAgKiBmb3IgbW9yZSBpbmZvIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZ3B1d2ViL3R5cGVzL2lzc3Vlcy8xMjdcbiAgICovXG4gIGV4cG9ydCB0eXBlIEdwdUJ1ZmZlclR5cGUgPSB7IHNpemU6IG51bWJlcjsgbWFwU3RhdGU6ICd1bm1hcHBlZCcgfCAncGVuZGluZycgfCAnbWFwcGVkJyB9O1xuXG4gIC8qKlxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJOTiBNTFRlbnNvclxuICAgKlxuICAgKiBUaGUgc3BlY2lmaWNhdGlvbiBmb3IgV2ViTk4ncyBNTFRlbnNvciBpcyBjdXJyZW50bHkgaW4gZmx1eC5cbiAgICovXG4gIGV4cG9ydCB0eXBlIE1MVGVuc29yVHlwZSA9IHVua25vd247XG5cbiAgLyoqXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcbiAgICovXG4gIGV4cG9ydCB0eXBlIEdwdUJ1ZmZlckRhdGFUeXBlcyA9ICdmbG9hdDMyJyB8ICdmbG9hdDE2JyB8ICdpbnQzMicgfCAnaW50NjQnIHwgJ3VpbnQzMicgfCAndWludDgnIHwgJ2Jvb2wnO1xuXG4gIC8qKlxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJOTiBNTFRlbnNvclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgTUxUZW5zb3JEYXRhVHlwZXMgPVxuICAgIHwgJ2Zsb2F0MzInXG4gICAgfCAnZmxvYXQxNidcbiAgICB8ICdpbnQ4J1xuICAgIHwgJ3VpbnQ4J1xuICAgIHwgJ2ludDMyJ1xuICAgIHwgJ3VpbnQzMidcbiAgICB8ICdpbnQ2NCdcbiAgICB8ICd1aW50NjQnXG4gICAgfCAnYm9vbCc7XG5cbiAgLyoqXG4gICAqIHJlcHJlc2VudCB3aGVyZSB0aGUgdGVuc29yIGRhdGEgaXMgc3RvcmVkXG4gICAqL1xuICBleHBvcnQgdHlwZSBEYXRhTG9jYXRpb24gPSAnbm9uZScgfCAnY3B1JyB8ICdjcHUtcGlubmVkJyB8ICd0ZXh0dXJlJyB8ICdncHUtYnVmZmVyJyB8ICdtbC10ZW5zb3InO1xuXG4gIC8qKlxuICAgKiByZXByZXNlbnQgdGhlIGRhdGEgdHlwZSBvZiBhIHRlbnNvclxuICAgKi9cbiAgZXhwb3J0IHR5cGUgVHlwZSA9IGtleW9mIERhdGFUeXBlTWFwO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBtdWx0aS1kaW1lbnNpb25hbCBhcnJheXMgdG8gZmVlZCB0byBvciBmZXRjaCBmcm9tIG1vZGVsIGluZmVyZW5jaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVkVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4gZXh0ZW5kcyBUeXBlZFRlbnNvckJhc2U8VD4sIFR5cGVkVGVuc29yVXRpbHM8VD4ge31cbi8qKlxuICogUmVwcmVzZW50IG11bHRpLWRpbWVuc2lvbmFsIGFycmF5cyB0byBmZWVkIHRvIG9yIGZldGNoIGZyb20gbW9kZWwgaW5mZXJlbmNpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yIGV4dGVuZHMgVHlwZWRUZW5zb3JCYXNlPFRlbnNvci5UeXBlPiwgVHlwZWRUZW5zb3JVdGlsczxUZW5zb3IuVHlwZT4ge31cblxuLyoqXG4gKiB0eXBlIFRlbnNvckNvbnN0cnVjdG9yIGRlZmluZXMgdGhlIGNvbnN0cnVjdG9ycyBvZiAnVGVuc29yJyB0byBjcmVhdGUgQ1BVIHRlbnNvciBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yQ29uc3RydWN0b3IgZXh0ZW5kcyBUZW5zb3JGYWN0b3J5IHtcbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gc3BlY2lmeSBlbGVtZW50IHR5cGVcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ3N0cmluZyddIHwgcmVhZG9ubHkgc3RyaW5nW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoXG4gICAgdHlwZTogJ2Jvb2wnLFxuICAgIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFsnYm9vbCddIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcbiAgKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSBhIFVpbnQ4Q2xhbXBlZEFycmF5LCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3ICh0eXBlOiAndWludDgnLCBkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyA2NC1iaXQgaW50ZWdlciB0eXBlZCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgPFQgZXh0ZW5kcyAndWludDY0JyB8ICdpbnQ2NCc+KFxuICAgIHR5cGU6IFQsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgYmlnaW50W10gfCByZWFkb25seSBudW1iZXJbXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgbnVtZXJpYyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgPFQgZXh0ZW5kcyBFeGNsdWRlPFRlbnNvci5UeXBlLCAnc3RyaW5nJyB8ICdib29sJyB8ICd1aW50NjQnIHwgJ2ludDY0Jz4+KFxuICAgIHR5cGU6IFQsXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgbnVtYmVyW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUeXBlZFRlbnNvcjxUPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGluZmVyIGVsZW1lbnQgdHlwZXNcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEZsb2F0MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBVaW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDgnPjtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MTYgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IFVpbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogSW50MTZBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDE2Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogSW50MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogQmlnSW50NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IHJlYWRvbmx5IHN0cmluZ1tdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiByZWFkb25seSBib29sZWFuW10sIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdib29sJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBmbG9hdDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChkYXRhOiBGbG9hdDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdmbG9hdDY0Jz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IFVpbnQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDMyJz47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXG4gICAqL1xuICBuZXcgKGRhdGE6IEJpZ1VpbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDY0Jz47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGZhbGwgYmFjayB0byBub24tZ2VuZXJpYyB0ZW5zb3IgdHlwZSBkZWNsYXJhdGlvblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKi9cbiAgbmV3IChcbiAgICB0eXBlOiBUZW5zb3IuVHlwZSxcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGUgfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IHN0cmluZ1tdIHwgcmVhZG9ubHkgYmlnaW50W10gfCByZWFkb25seSBib29sZWFuW10sXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxuICApOiBUZW5zb3I7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cbiAgICovXG4gIG5ldyAoZGF0YTogVGVuc29yLkRhdGFUeXBlLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3I7XG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IFRlbnNvciA9IFRlbnNvckltcGwgYXMgVGVuc29yQ29uc3RydWN0b3I7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IGVudiB9IGZyb20gJy4vZW52LWltcGwuanMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFID0gKGRldmljZVR5cGU6IHN0cmluZywgbGFiZWw6IHN0cmluZykgPT4ge1xuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUudGltZVN0YW1wKGAke2RldmljZVR5cGV9OjpPUlQ6OiR7bGFiZWx9YCk7XG59O1xuXG5jb25zdCBUUkFDRV9GVU5DID0gKG1zZzogc3RyaW5nLCBleHRyYU1zZz86IHN0cmluZykgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdCgvXFxyXFxufFxccnxcXG4vZykgfHwgW107XG4gIGxldCBoYXNUcmFjZUZ1bmMgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xuICAgIGlmIChoYXNUcmFjZUZ1bmMgJiYgIXN0YWNrW2ldLmluY2x1ZGVzKCdUUkFDRV9GVU5DJykpIHtcbiAgICAgIGxldCBsYWJlbCA9IGBGVU5DXyR7bXNnfTo6JHtzdGFja1tpXS50cmltKCkuc3BsaXQoJyAnKVsxXX1gO1xuICAgICAgaWYgKGV4dHJhTXNnKSB7XG4gICAgICAgIGxhYmVsICs9IGA6OiR7ZXh0cmFNc2d9YDtcbiAgICAgIH1cbiAgICAgIFRSQUNFKCdDUFUnLCBsYWJlbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdGFja1tpXS5pbmNsdWRlcygnVFJBQ0VfRlVOQycpKSB7XG4gICAgICBoYXNUcmFjZUZ1bmMgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmV4cG9ydCBjb25zdCBUUkFDRV9GVU5DX0JFR0lOID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnQkVHSU4nLCBleHRyYU1zZyk7XG59O1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IFRSQUNFX0ZVTkNfRU5EID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgVFJBQ0VfRlVOQygnRU5EJywgZXh0cmFNc2cpO1xufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVzb2x2ZUJhY2tlbmRBbmRFeGVjdXRpb25Qcm92aWRlcnMgfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciB9IGZyb20gJy4vYmFja2VuZC5qcyc7XG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIGFzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UgfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcbmltcG9ydCB7IE9ubnhWYWx1ZSB9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5pbXBvcnQgeyBUUkFDRV9GVU5DX0JFR0lOLCBUUkFDRV9GVU5DX0VORCB9IGZyb20gJy4vdHJhY2UuanMnO1xuXG50eXBlIFNlc3Npb25PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5TZXNzaW9uT3B0aW9ucztcbnR5cGUgUnVuT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuUnVuT3B0aW9ucztcbnR5cGUgRmVlZHNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5GZWVkc1R5cGU7XG50eXBlIEZldGNoZXNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5GZXRjaGVzVHlwZTtcbnR5cGUgUmV0dXJuVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuUmV0dXJuVHlwZTtcblxuZXhwb3J0IGNsYXNzIEluZmVyZW5jZVNlc3Npb24gaW1wbGVtZW50cyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihoYW5kbGVyOiBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcikge1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gIH1cbiAgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIGZldGNoZXM6IEZldGNoZXNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIGFzeW5jIHJ1bihmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGUgfCBSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcbiAgICBjb25zdCBmZXRjaGVzOiB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH0gPSB7fTtcbiAgICBsZXQgb3B0aW9uczogUnVuT3B0aW9ucyA9IHt9O1xuICAgIC8vIGNoZWNrIGlucHV0c1xuICAgIGlmICh0eXBlb2YgZmVlZHMgIT09ICdvYmplY3QnIHx8IGZlZWRzID09PSBudWxsIHx8IGZlZWRzIGluc3RhbmNlb2YgVGVuc29yIHx8IEFycmF5LmlzQXJyYXkoZmVlZHMpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBcIidmZWVkcycgbXVzdCBiZSBhbiBvYmplY3QgdGhhdCB1c2UgaW5wdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlwiLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGZXRjaGVzRW1wdHkgPSB0cnVlO1xuICAgIC8vIGRldGVybWluZSB3aGljaCBvdmVycmlkZSBpcyBiZWluZyB1c2VkXG4gICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGFyZzEgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5leHBlY3RlZCBhcmd1bWVudFsxXTogY2Fubm90IGJlIG51bGwuJyk7XG4gICAgICB9XG4gICAgICBpZiAoYXJnMSBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2ZldGNoZXMnIGNhbm5vdCBiZSBhIFRlbnNvclwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcbiAgICAgICAgaWYgKGFyZzEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidmZXRjaGVzJyBjYW5ub3QgYmUgYW4gZW1wdHkgYXJyYXkuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgIC8vIG91dHB1dCBuYW1lc1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgYXJnMSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZmV0Y2hlcycgbXVzdCBiZSBhIHN0cmluZyBhcnJheSBvciBhbiBvYmplY3QuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5vdXRwdXROYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdmZXRjaGVzJyBjb250YWlucyBpbnZhbGlkIG91dHB1dCBuYW1lOiAke25hbWV9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xuICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkZWNpZGUgd2hldGhlciBhcmcxIGlzIGZldGNoZXMgb3Igb3B0aW9uc1xuICAgICAgICAvLyBpZiBhbnkgb3V0cHV0IG5hbWUgaXMgcHJlc2VudCBhbmQgaXRzIHZhbHVlIGlzIHZhbGlkIE9ubnhWYWx1ZSwgd2UgY29uc2lkZXIgaXQgZmV0Y2hlc1xuICAgICAgICBsZXQgaXNGZXRjaGVzID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFyZzFLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJnMSk7XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLm91dHB1dE5hbWVzKSB7XG4gICAgICAgICAgaWYgKGFyZzFLZXlzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gKGFyZzEgYXMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5OdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUpW25hbWVdO1xuICAgICAgICAgICAgaWYgKHYgPT09IG51bGwgfHwgdiBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICAgICAgICBpc0ZldGNoZXMgPSB0cnVlO1xuICAgICAgICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICBmZXRjaGVzW25hbWVdID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGZXRjaGVzKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gYXJnMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMgPSBhcmcxIGFzIFJ1bk9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuZXhwZWN0ZWQgYXJndW1lbnRbMV06IG11c3QgYmUgJ2ZldGNoZXMnIG9yICdvcHRpb25zJy5cIik7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgYWxsIGlucHV0cyBhcmUgaW4gZmVlZFxuICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLmlucHV0TmFtZXMpIHtcbiAgICAgIGlmICh0eXBlb2YgZmVlZHNbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW5wdXQgJyR7bmFtZX0nIGlzIG1pc3NpbmcgaW4gJ2ZlZWRzJy5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBubyBmZXRjaGVzIGlzIHNwZWNpZmllZCwgd2UgdXNlIHRoZSBmdWxsIG91dHB1dCBuYW1lcyBsaXN0XG4gICAgaWYgKGlzRmV0Y2hlc0VtcHR5KSB7XG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xuICAgICAgICBmZXRjaGVzW25hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmZWVkcywgZmV0Y2hlcyBhbmQgb3B0aW9ucyBhcmUgcHJlcGFyZWRcblxuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0aGlzLmhhbmRsZXIucnVuKGZlZWRzLCBmZXRjaGVzLCBvcHRpb25zKTtcbiAgICBjb25zdCByZXR1cm5WYWx1ZTogeyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIH0gPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByZXN1bHRzKSB7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0cywga2V5KSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW2tleV07XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgICByZXR1cm5WYWx1ZVtrZXldID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSBuZXcgVGVuc29yKHJlc3VsdC50eXBlLCByZXN1bHQuZGF0YSwgcmVzdWx0LmRpbXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG5cbiAgYXN5bmMgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUocGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xuICBzdGF0aWMgY3JlYXRlKFxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLFxuICAgIGJ5dGVPZmZzZXQ6IG51bWJlcixcbiAgICBieXRlTGVuZ3RoPzogbnVtYmVyLFxuICAgIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPjtcbiAgc3RhdGljIGNyZWF0ZShidWZmZXI6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XG4gIHN0YXRpYyBhc3luYyBjcmVhdGUoXG4gICAgYXJnMDogc3RyaW5nIHwgQXJyYXlCdWZmZXJMaWtlIHwgVWludDhBcnJheSxcbiAgICBhcmcxPzogU2Vzc2lvbk9wdGlvbnMgfCBudW1iZXIsXG4gICAgYXJnMj86IG51bWJlcixcbiAgICBhcmczPzogU2Vzc2lvbk9wdGlvbnMsXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT4ge1xuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcbiAgICAvLyBlaXRoZXIgbG9hZCBmcm9tIGEgZmlsZSBvciBidWZmZXJcbiAgICBsZXQgZmlsZVBhdGhPclVpbnQ4QXJyYXk6IHN0cmluZyB8IFVpbnQ4QXJyYXk7XG4gICAgbGV0IG9wdGlvbnM6IFNlc3Npb25PcHRpb25zID0ge307XG5cbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IGFyZzA7XG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucyA9IGFyZzE7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFyZzAgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IGFyZzA7XG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucyA9IGFyZzE7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgYXJnMCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8XG4gICAgICAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBhcmcwIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIpXG4gICAgKSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBhcmcwO1xuICAgICAgbGV0IGJ5dGVPZmZzZXQgPSAwO1xuICAgICAgbGV0IGJ5dGVMZW5ndGggPSBhcmcwLmJ5dGVMZW5ndGg7XG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucyA9IGFyZzE7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxID09PSAnbnVtYmVyJykge1xuICAgICAgICBieXRlT2Zmc2V0ID0gYXJnMTtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihieXRlT2Zmc2V0KSkge1xuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiJ2J5dGVPZmZzZXQnIG11c3QgYmUgYW4gaW50ZWdlci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2J5dGVPZmZzZXQnIGlzIG91dCBvZiByYW5nZSBbMCwgJHtidWZmZXIuYnl0ZUxlbmd0aH0pLmApO1xuICAgICAgICB9XG4gICAgICAgIGJ5dGVMZW5ndGggPSBhcmcwLmJ5dGVMZW5ndGggLSBieXRlT2Zmc2V0O1xuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgYnl0ZUxlbmd0aCA9IGFyZzI7XG4gICAgICAgICAgaWYgKCFOdW1iZXIuaXNTYWZlSW50ZWdlcihieXRlTGVuZ3RoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCInYnl0ZUxlbmd0aCcgbXVzdCBiZSBhbiBpbnRlZ2VyLlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJ5dGVMZW5ndGggPD0gMCB8fCBieXRlT2Zmc2V0ICsgYnl0ZUxlbmd0aCA+IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2J5dGVMZW5ndGgnIGlzIG91dCBvZiByYW5nZSAoMCwgJHtidWZmZXIuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXR9XS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmczID09PSAnb2JqZWN0JyAmJiBhcmczICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gYXJnMztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmczICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInYnl0ZUxlbmd0aCcgbXVzdCBiZSBhIG51bWJlci5cIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICAgICAgfVxuICAgICAgZmlsZVBhdGhPclVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5leHBlY3RlZCBhcmd1bWVudFswXTogbXVzdCBiZSAncGF0aCcgb3IgJ2J1ZmZlcicuXCIpO1xuICAgIH1cblxuICAgIC8vIHJlc29sdmUgYmFja2VuZCwgdXBkYXRlIHNlc3Npb24gb3B0aW9ucyB3aXRoIHZhbGlkYXRlZCBFUHMsIGFuZCBjcmVhdGUgc2Vzc2lvbiBoYW5kbGVyXG4gICAgY29uc3QgW2JhY2tlbmQsIG9wdGlvbnNXaXRoVmFsaWRhdGVkRVBzXSA9IGF3YWl0IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzKG9wdGlvbnMpO1xuICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKGZpbGVQYXRoT3JVaW50OEFycmF5LCBvcHRpb25zV2l0aFZhbGlkYXRlZEVQcyk7XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgICByZXR1cm4gbmV3IEluZmVyZW5jZVNlc3Npb24oaGFuZGxlcik7XG4gIH1cblxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZXIuc3RhcnRQcm9maWxpbmcoKTtcbiAgfVxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVyLmVuZFByb2ZpbGluZygpO1xuICB9XG5cbiAgZ2V0IGlucHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuaW5wdXROYW1lcztcbiAgfVxuICBnZXQgb3V0cHV0TmFtZXMoKTogcmVhZG9ubHkgc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXIub3V0cHV0TmFtZXM7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZXI6IEluZmVyZW5jZVNlc3Npb25IYW5kbGVyO1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIGFzIEluZmVyZW5jZVNlc3Npb25JbXBsIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLmpzJztcbmltcG9ydCB7IE9ubnhNb2RlbE9wdGlvbnMgfSBmcm9tICcuL29ubngtbW9kZWwuanMnO1xuaW1wb3J0IHsgT25ueFZhbHVlLCBPbm54VmFsdWVEYXRhTG9jYXRpb24gfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXG5cbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBpbnB1dC9vdXRwdXQgdHlwZXNcblxuICB0eXBlIE9ubnhWYWx1ZU1hcFR5cGUgPSB7IHJlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfTtcbiAgdHlwZSBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUgPSB7IHJlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH07XG5cbiAgLyoqXG4gICAqIEEgZmVlZHMgKG1vZGVsIGlucHV0cykgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqL1xuICB0eXBlIEZlZWRzVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLyoqXG4gICAqIEEgZmV0Y2hlcyAobW9kZWwgb3V0cHV0cykgY291bGQgYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAqXG4gICAqIC0gT21pdHRlZC4gVXNlIG1vZGVsJ3Mgb3V0cHV0IG5hbWVzIGRlZmluaXRpb24uXG4gICAqIC0gQW4gYXJyYXkgb2Ygc3RyaW5nIGluZGljYXRpbmcgdGhlIG91dHB1dCBuYW1lcy5cbiAgICogLSBBbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBvciBudWxsIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKlxuICAgKiBAcmVtYXJrXG4gICAqIGRpZmZlcmVudCBmcm9tIGlucHV0IGFyZ3VtZW50LCBpbiBvdXRwdXQsIE9ubnhWYWx1ZSBpcyBvcHRpb25hbC4gSWYgYW4gT25ueFZhbHVlIGlzIHByZXNlbnQgaXQgd2lsbCBiZVxuICAgKiB1c2VkIGFzIGEgcHJlLWFsbG9jYXRlZCB2YWx1ZSBieSB0aGUgaW5mZXJlbmNlIGVuZ2luZTsgaWYgb21pdHRlZCwgaW5mZXJlbmNlIGVuZ2luZSB3aWxsIGFsbG9jYXRlIGJ1ZmZlclxuICAgKiBpbnRlcm5hbGx5LlxuICAgKi9cbiAgdHlwZSBGZXRjaGVzVHlwZSA9IHJlYWRvbmx5IHN0cmluZ1tdIHwgTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlO1xuXG4gIC8qKlxuICAgKiBBIGluZmVyZW5jaW5nIHJldHVybiB0eXBlIGlzIGFuIG9iamVjdCB0aGF0IHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICovXG4gIHR5cGUgUmV0dXJuVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gc2Vzc2lvbiBvcHRpb25zXG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIGNvbmZpZ3VyYXRpb25zIGZvciBzZXNzaW9uIGJlaGF2aW9yLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uT3B0aW9ucyBleHRlbmRzIE9ubnhNb2RlbE9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGV4ZWN1dGlvbiBwcm92aWRlciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQW4gZXhlY3V0aW9uIHByb3ZpZGVyIG9wdGlvbiBjYW4gYmUgYSBzdHJpbmcgaW5kaWNhdGluZyB0aGUgbmFtZSBvZiB0aGUgZXhlY3V0aW9uIHByb3ZpZGVyLFxuICAgICAqIG9yIGFuIG9iamVjdCBvZiBjb3JyZXNwb25kaW5nIHR5cGUuXG4gICAgICovXG4gICAgZXhlY3V0aW9uUHJvdmlkZXJzPzogcmVhZG9ubHkgRXhlY3V0aW9uUHJvdmlkZXJDb25maWdbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRyYSBPUCB0aHJlYWRzIG51bWJlci5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIGludHJhT3BOdW1UaHJlYWRzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGludGVyIE9QIHRocmVhZHMgbnVtYmVyLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkuXG4gICAgICovXG4gICAgaW50ZXJPcE51bVRocmVhZHM/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZnJlZURpbWVuc2lvbk92ZXJyaWRlcz86IHsgcmVhZG9ubHkgW2RpbWVuc2lvbk5hbWU6IHN0cmluZ106IG51bWJlciB9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9wdGltaXphdGlvbiBsZXZlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBncmFwaE9wdGltaXphdGlvbkxldmVsPzogJ2Rpc2FibGVkJyB8ICdiYXNpYycgfCAnZXh0ZW5kZWQnIHwgJ2FsbCc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBDUFUgbWVtb3J5IGFyZW5hLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGVuYWJsZUNwdU1lbUFyZW5hPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZW5hYmxlIG1lbW9yeSBwYXR0ZXJuLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxuICAgICAqL1xuICAgIGVuYWJsZU1lbVBhdHRlcm4/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogRXhlY3V0aW9uIG1vZGUuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgZXhlY3V0aW9uTW9kZT86ICdzZXF1ZW50aWFsJyB8ICdwYXJhbGxlbCc7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpbWl6ZWQgbW9kZWwgZmlsZSBwYXRoLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBzZXR0aW5nIGlzIHNwZWNpZmllZCwgdGhlIG9wdGltaXplZCBtb2RlbCB3aWxsIGJlIGR1bXBlZC4gSW4gYnJvd3NlciwgYSBibG9iIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIHdpdGggYSBwb3AtdXAgd2luZG93LlxuICAgICAqL1xuICAgIG9wdGltaXplZE1vZGVsRmlsZVBhdGg/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBwcm9maWxpbmcuXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYSBwbGFjZWhvbGRlciBmb3IgYSBmdXR1cmUgdXNlLlxuICAgICAqL1xuICAgIGVuYWJsZVByb2ZpbGluZz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBGaWxlIHByZWZpeCBmb3IgcHJvZmlsaW5nLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGEgcGxhY2Vob2xkZXIgZm9yIGEgZnV0dXJlIHVzZS5cbiAgICAgKi9cbiAgICBwcm9maWxlRmlsZVByZWZpeD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIExvZyBJRC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dJZD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dTZXZlcml0eUxldmVsPzogMCB8IDEgfCAyIHwgMyB8IDQ7XG5cbiAgICAvKipcbiAgICAgKiBMb2cgdmVyYm9zaXR5IGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqL1xuICAgIGxvZ1ZlcmJvc2l0eUxldmVsPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBzdHJpbmcgYXMgYSBwcmVmZXJyZWQgZGF0YSBsb2NhdGlvbiBmb3IgYWxsIG91dHB1dHMsIG9yIGFuIG9iamVjdCB0aGF0IHVzZSBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgYVxuICAgICAqIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIFdlYiBmb3IgV2ViR0wgYW5kIFdlYkdQVSBFUC5cbiAgICAgKi9cbiAgICBwcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj86IE9ubnhWYWx1ZURhdGFMb2NhdGlvbiB8IHsgcmVhZG9ubHkgW291dHB1dE5hbWU6IHN0cmluZ106IE9ubnhWYWx1ZURhdGFMb2NhdGlvbiB9O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBlbmFibGUgZ3JhcGggY2FwdHVyZS5cbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgV2ViIGZvciBXZWJHUFUgRVAuXG4gICAgICovXG4gICAgZW5hYmxlR3JhcGhDYXB0dXJlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGNvbmZpZ3VyYXRpb25zIGZvciBhIHNlc3Npb24uIFNlZVxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9zZXNzaW9uL1xuICAgICAqIG9ubnhydW50aW1lX3Nlc3Npb25fb3B0aW9uc19jb25maWdfa2V5cy5oXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYGpzXG4gICAgICogZXh0cmE6IHtcbiAgICAgKiAgIHNlc3Npb246IHtcbiAgICAgKiAgICAgc2V0X2Rlbm9ybWFsX2FzX3plcm86IFwiMVwiLFxuICAgICAqICAgICBkaXNhYmxlX3ByZXBhY2tpbmc6IFwiMVwiXG4gICAgICogICB9LFxuICAgICAqICAgb3B0aW1pemF0aW9uOiB7XG4gICAgICogICAgIGVuYWJsZV9nZWx1X2FwcHJveGltYXRpb246IFwiMVwiXG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGV4dHJhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH1cblxuICAvLyAjcmVnaW9uIGV4ZWN1dGlvbiBwcm92aWRlcnNcblxuICAvLyBDdXJyZW50bHksIHdlIGhhdmUgdGhlIGZvbGxvd2luZyBiYWNrZW5kcyB0byBzdXBwb3J0IGV4ZWN1dGlvbiBwcm92aWRlcnM6XG4gIC8vIEJhY2tlbmQgTm9kZS5qcyBiaW5kaW5nOiBzdXBwb3J0cyAnY3B1JywgJ2RtbCcgKHdpbjMyKSwgJ2NvcmVtbCcgKG1hY09TKSBhbmQgJ2N1ZGEnIChsaW51eCkuXG4gIC8vIEJhY2tlbmQgV2ViQXNzZW1ibHk6IHN1cHBvcnRzICdjcHUnLCAnd2FzbScsICd3ZWJncHUnIGFuZCAnd2Vibm4nLlxuICAvLyBCYWNrZW5kIE9OTlguanM6IHN1cHBvcnRzICd3ZWJnbCcuXG4gIC8vIEJhY2tlbmQgUmVhY3QgTmF0aXZlOiBzdXBwb3J0cyAnY3B1JywgJ3hubnBhY2snLCAnY29yZW1sJyAoaU9TKSwgJ25uYXBpJyAoQW5kcm9pZCkuXG4gIGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcCB7XG4gICAgY29yZW1sOiBDb3JlTUxFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBjcHU6IENwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIGN1ZGE6IEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBkbWw6IERtbEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIG5uYXBpOiBObmFwaUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHRlbnNvcnJ0OiBUZW5zb3JSdEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHdhc206IFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2ViZ2w6IFdlYkdMRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgd2ViZ3B1OiBXZWJHcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICB3ZWJubjogV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgICBxbm46IFFubkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgIHhubnBhY2s6IFhubnBhY2tFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcbiAgfVxuXG4gIHR5cGUgRXhlY3V0aW9uUHJvdmlkZXJOYW1lID0ga2V5b2YgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25NYXA7XG4gIHR5cGUgRXhlY3V0aW9uUHJvdmlkZXJDb25maWcgPVxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25NYXBbRXhlY3V0aW9uUHJvdmlkZXJOYW1lXVxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25cbiAgICB8IEV4ZWN1dGlvblByb3ZpZGVyTmFtZVxuICAgIHwgc3RyaW5nO1xuXG4gIGV4cG9ydCBpbnRlcmZhY2UgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdjcHUnO1xuICAgIHVzZUFyZW5hPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnY3VkYSc7XG4gICAgZGV2aWNlSWQ/OiBudW1iZXI7XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBEbWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnZG1sJztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFRlbnNvclJ0RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3RlbnNvcnJ0JztcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkFzc2VtYmx5RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ3dhc20nO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2ViZ2wnO1xuICAgIC8vIFRPRE86IGFkZCBmbGFnc1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd4bm5wYWNrJztcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJncHUnO1xuICAgIHByZWZlcnJlZExheW91dD86ICdOQ0hXJyB8ICdOSFdDJztcbiAgfVxuXG4gIC8vICNyZWdpb24gV2ViTk4gb3B0aW9uc1xuXG4gIGludGVyZmFjZSBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnd2Vibm4nO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBXZWJOTiBNTENvbnRleHQuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkaWN0ZGVmLW1sY29udGV4dG9wdGlvbnNcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5Db250ZXh0T3B0aW9ucyB7XG4gICAgZGV2aWNlVHlwZT86ICdjcHUnIHwgJ2dwdScgfCAnbnB1JztcbiAgICBudW1UaHJlYWRzPzogbnVtYmVyO1xuICAgIHBvd2VyUHJlZmVyZW5jZT86ICdkZWZhdWx0JyB8ICdsb3ctcG93ZXInIHwgJ2hpZ2gtcGVyZm9ybWFuY2UnO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyIHdpdGhvdXQgTUxDb250ZXh0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTk9wdGlvbnNXaXRob3V0TUxDb250ZXh0IGV4dGVuZHMgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUsIFdlYk5OQ29udGV4dE9wdGlvbnMge1xuICAgIGNvbnRleHQ/OiBuZXZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgc2V0IG9mIG9wdGlvbnMgZm9yIFdlYk5OIGV4ZWN1dGlvbiBwcm92aWRlciB3aXRoIE1MQ29udGV4dC5cbiAgICpcbiAgICogV2hlbiBNTENvbnRleHQgaXMgcHJvdmlkZWQsIHRoZSBkZXZpY2VUeXBlIGlzIGFsc28gcmVxdWlyZWQgc28gdGhhdCB0aGUgV2ViTk4gRVAgY2FuIGRldGVybWluZSB0aGUgcHJlZmVycmVkXG4gICAqIGNoYW5uZWwgbGF5b3V0LlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJubi8jZG9tLW1sLWNyZWF0ZWNvbnRleHRcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dFxuICAgIGV4dGVuZHMgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUsXG4gICAgICBPbWl0PFdlYk5OQ29udGV4dE9wdGlvbnMsICdkZXZpY2VUeXBlJz4sXG4gICAgICBSZXF1aXJlZDxQaWNrPFdlYk5OQ29udGV4dE9wdGlvbnMsICdkZXZpY2VUeXBlJz4+IHtcbiAgICBjb250ZXh0OiB1bmtub3duIC8qIE1MQ29udGV4dCAqLztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgc2V0IG9mIG9wdGlvbnMgZm9yIFdlYk5OIGV4ZWN1dGlvbiBwcm92aWRlciB3aXRoIE1MQ29udGV4dCB3aGljaCBpcyBjcmVhdGVkIGZyb20gR1BVRGV2aWNlLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJubi8jZG9tLW1sLWNyZWF0ZWNvbnRleHQtZ3B1ZGV2aWNlXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFdlYk5OT3B0aW9uc1dlYkdwdSBleHRlbmRzIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lIHtcbiAgICBjb250ZXh0OiB1bmtub3duIC8qIE1MQ29udGV4dCAqLztcbiAgICBncHVEZXZpY2U6IHVua25vd24gLyogR1BVRGV2aWNlICovO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgZm9yIFdlYk5OIGV4ZWN1dGlvbiBwcm92aWRlci5cbiAgICovXG4gIGV4cG9ydCB0eXBlIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gPVxuICAgIHwgV2ViTk5PcHRpb25zV2l0aG91dE1MQ29udGV4dFxuICAgIHwgV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dFxuICAgIHwgV2ViTk5PcHRpb25zV2ViR3B1O1xuXG4gIC8vICNlbmRyZWdpb25cblxuICBleHBvcnQgaW50ZXJmYWNlIFFubkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xuICAgIHJlYWRvbmx5IG5hbWU6ICdxbm4nO1xuICAgIC8vIFRPRE8gYWRkIGZsYWdzXG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBDb3JlTUxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcbiAgICByZWFkb25seSBuYW1lOiAnY29yZW1sJztcbiAgICAvKipcbiAgICAgKiBUaGUgYml0IGZsYWdzIGZvciBDb3JlTUwgZXhlY3V0aW9uIHByb3ZpZGVyLlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogQ09SRU1MX0ZMQUdfVVNFX0NQVV9PTkxZID0gMHgwMDFcbiAgICAgKiBDT1JFTUxfRkxBR19FTkFCTEVfT05fU1VCR1JBUEggPSAweDAwMlxuICAgICAqIENPUkVNTF9GTEFHX09OTFlfRU5BQkxFX0RFVklDRV9XSVRIX0FORSA9IDB4MDA0XG4gICAgICogQ09SRU1MX0ZMQUdfT05MWV9BTExPV19TVEFUSUNfSU5QVVRfU0hBUEVTID0gMHgwMDhcbiAgICAgKiBDT1JFTUxfRkxBR19DUkVBVEVfTUxQUk9HUkFNID0gMHgwMTBcbiAgICAgKiBDT1JFTUxfRkxBR19VU0VfQ1BVX0FORF9HUFUgPSAweDAyMFxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogU2VlIGluY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9wcm92aWRlcnMvY29yZW1sL2NvcmVtbF9wcm92aWRlcl9mYWN0b3J5LmggZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIFRoaXMgZmxhZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nKS5cbiAgICAgKi9cbiAgICBjb3JlTWxGbGFncz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHdoZXRoZXIgdG8gdXNlIENQVSBvbmx5IGluIENvcmVNTCBFUC5cbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAocmVhY3QtbmF0aXZlKS5cbiAgICAgKi9cbiAgICB1c2VDUFVPbmx5PzogYm9vbGVhbjtcbiAgICB1c2VDUFVBbmRHUFU/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byBlbmFibGUgQ29yZU1MIEVQIG9uIHN1YmdyYXBoLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIGVuYWJsZU9uU3ViZ3JhcGg/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byBvbmx5IGVuYWJsZSBDb3JlTUwgRVAgZm9yIEFwcGxlIGRldmljZXMgd2l0aCBBTkUgKEFwcGxlIE5ldXJhbCBFbmdpbmUpLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxuICAgICAqL1xuICAgIG9ubHlFbmFibGVEZXZpY2VXaXRoQU5FPzogYm9vbGVhbjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XG4gICAgcmVhZG9ubHkgbmFtZTogJ25uYXBpJztcbiAgICB1c2VGUDE2PzogYm9vbGVhbjtcbiAgICB1c2VOQ0hXPzogYm9vbGVhbjtcbiAgICBjcHVEaXNhYmxlZD86IGJvb2xlYW47XG4gICAgY3B1T25seT86IGJvb2xlYW47XG4gIH1cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHJ1biBvcHRpb25zXG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIGNvbmZpZ3VyYXRpb25zIGZvciBpbmZlcmVuY2UgcnVuIGJlaGF2aW9yXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFJ1bk9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcbiAgICAgKi9cbiAgICBsb2dTZXZlcml0eUxldmVsPzogMCB8IDEgfCAyIHwgMyB8IDQ7XG5cbiAgICAvKipcbiAgICAgKiBMb2cgdmVyYm9zaXR5IGxldmVsLlxuICAgICAqXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxuICAgICAqL1xuICAgIGxvZ1ZlcmJvc2l0eUxldmVsPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGVybWluYXRlIGFsbCBpbmNvbXBsZXRlIE9ydFJ1biBjYWxscyBhcyBzb29uIGFzIHBvc3NpYmxlIGlmIHRydWVcbiAgICAgKlxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcbiAgICAgKi9cbiAgICB0ZXJtaW5hdGU/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQSB0YWcgZm9yIHRoZSBSdW4oKSBjYWxscyB1c2luZyB0aGlzXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXG4gICAgICovXG4gICAgdGFnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU2V0IGEgc2luZ2xlIHJ1biBjb25maWd1cmF0aW9uIGVudHJ5LiBTZWVcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvc2Vzc2lvbi9cbiAgICAgKiBvbm54cnVudGltZV9ydW5fb3B0aW9uc19jb25maWdfa2V5cy5oXG4gICAgICpcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiBleHRyYToge1xuICAgICAqICAgbWVtb3J5OiB7XG4gICAgICogICAgIGVuYWJsZV9tZW1vcnlfYXJlbmFfc2hyaW5rYWdlOiBcIjFcIixcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgZXh0cmE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHZhbHVlIG1ldGFkYXRhXG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1pbnRlcmZhY2VcbiAgaW50ZXJmYWNlIFZhbHVlTWV0YWRhdGEge1xuICAgIC8vIFRCRFxuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIHJ1bnRpbWUgaW5zdGFuY2Ugb2YgYW4gT05OWCBtb2RlbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBydW4oKVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIHRoZSBtb2RlbCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5JbnB1dFR5cGVgIGZvciBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuKGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvKipcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLk91dHB1dFR5cGVgIGZvclxuICAgKiBkZXRhaWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuKFxuICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSxcbiAgICBmZXRjaGVzOiBJbmZlcmVuY2VTZXNzaW9uLkZldGNoZXNUeXBlLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcblxuICAvKipcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cbiAgICovXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9maWxpbmdcblxuICAvKipcbiAgICogU3RhcnQgcHJvZmlsaW5nLlxuICAgKi9cbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZDtcblxuICAvKipcbiAgICogRW5kIHByb2ZpbGluZy5cbiAgICovXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG1ldGFkYXRhXG5cbiAgLyoqXG4gICAqIEdldCBpbnB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxuICAgKi9cbiAgcmVhZG9ubHkgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldCBvdXRwdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBtb2RlbC5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvLyAvKipcbiAgLy8gICogR2V0IGlucHV0IG1ldGFkYXRhIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gIC8vICAqL1xuICAvLyByZWFkb25seSBpbnB1dE1ldGFkYXRhOiBSZWFkb25seUFycmF5PFJlYWRvbmx5PEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YT4+O1xuXG4gIC8vIC8qKlxuICAvLyAgKiBHZXQgb3V0cHV0IG1ldGFkYXRhIG9mIHRoZSBsb2FkZWQgbW9kZWwuXG4gIC8vICAqL1xuICAvLyByZWFkb25seSBvdXRwdXRNZXRhZGF0YTogUmVhZG9ubHlBcnJheTxSZWFkb25seTxJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGE+PjtcblxuICAvLyAjZW5kcmVnaW9uXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbkZhY3Rvcnkge1xuICAvLyAjcmVnaW9uIGNyZWF0ZSgpXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGFuIE9OTlggbW9kZWwgZmlsZS5cbiAgICpcbiAgICogQHBhcmFtIHVyaSAtIFRoZSBVUkkgb3IgZmlsZSBwYXRoIG9mIHRoZSBtb2RlbCB0byBsb2FkLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxuICAgKi9cbiAgY3JlYXRlKHVyaTogc3RyaW5nLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGFuIGFycmF5IGJ1ZmVyLlxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQW4gQXJyYXlCdWZmZXIgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cbiAgICovXG4gIGNyZWF0ZShidWZmZXI6IEFycmF5QnVmZmVyTGlrZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24gYW5kIGxvYWQgbW9kZWwgYXN5bmNocm9ub3VzbHkgZnJvbSBzZWdtZW50IG9mIGFuIGFycmF5IGJ1ZmVyLlxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQW4gQXJyYXlCdWZmZXIgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cbiAgICogQHBhcmFtIGJ5dGVPZmZzZXQgLSBUaGUgYmVnaW5uaW5nIG9mIHRoZSBzcGVjaWZpZWQgcG9ydGlvbiBvZiB0aGUgYXJyYXkgYnVmZmVyLlxuICAgKiBAcGFyYW0gYnl0ZUxlbmd0aCAtIFRoZSBsZW5ndGggaW4gYnl0ZXMgb2YgdGhlIGFycmF5IGJ1ZmZlci5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cbiAgICovXG4gIGNyZWF0ZShcbiAgICBidWZmZXI6IEFycmF5QnVmZmVyTGlrZSxcbiAgICBieXRlT2Zmc2V0OiBudW1iZXIsXG4gICAgYnl0ZUxlbmd0aD86IG51bWJlcixcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYSBVaW50OEFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQSBVaW50OEFycmF5IHJlcHJlc2VudGF0aW9uIG9mIGFuIE9OTlggbW9kZWwuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXG4gICAqL1xuICBjcmVhdGUoYnVmZmVyOiBVaW50OEFycmF5LCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG5leHBvcnQgY29uc3QgSW5mZXJlbmNlU2Vzc2lvbjogSW5mZXJlbmNlU2Vzc2lvbkZhY3RvcnkgPSBJbmZlcmVuY2VTZXNzaW9uSW1wbDtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLCBPcHRpb25zVGVuc29yTGF5b3V0IH0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yVG9EYXRhVXJsT3B0aW9ucyBleHRlbmRzIE9wdGlvbnNUZW5zb3JMYXlvdXQsIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyBleHRlbmRzIE9wdGlvbnNUZW5zb3JMYXlvdXQsIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbnZlcnNpb25VdGlscyB7XG4gIC8qKlxuICAgKiBjcmVhdGVzIGEgRGF0YVVSTCBpbnN0YW5jZSBmcm9tIHRlbnNvclxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBEYXRhVVJMIGluc3RhbmNlIGZyb20gdGhlIHRlbnNvci5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgZm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiBAcmV0dXJucyBhIERhdGFVUkwgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgaW1hZ2UgY29udmVydGVkIGZyb20gdGVuc29yIGRhdGFcbiAgICovXG4gIHRvRGF0YVVSTChvcHRpb25zPzogVGVuc29yVG9EYXRhVXJsT3B0aW9ucyk6IHN0cmluZztcblxuICAvKipcbiAgICogY3JlYXRlcyBhbiBJbWFnZURhdGEgaW5zdGFuY2UgZnJvbSB0ZW5zb3JcbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIGFuIEltYWdlRGF0YSBpbnN0YW5jZSBmcm9tIHRoZSB0ZW5zb3IuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYGZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogQHJldHVybnMgYW4gSW1hZ2VEYXRhIGluc3RhbmNlIHJlcHJlc2VudGluZyB0aGUgaW1hZ2UgY29udmVydGVkIGZyb20gdGVuc29yIGRhdGFcbiAgICovXG4gIHRvSW1hZ2VEYXRhKG9wdGlvbnM/OiBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMpOiBJbWFnZURhdGE7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IFRlbnNvciwgVHlwZWRUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5cbmV4cG9ydCB0eXBlIEltYWdlRm9ybWF0ID0gJ1JHQicgfCAnUkdCQScgfCAnQkdSJyB8ICdSQkcnO1xuZXhwb3J0IHR5cGUgSW1hZ2VUZW5zb3JMYXlvdXQgPSAnTkhXQycgfCAnTkNIVyc7XG5cbi8vIHRoZSBmb2xsb3dpbmcgcmVnaW9uIGNvbnRhaW5zIHR5cGUgZGVmaW5pdGlvbnMgZm9yIGNvbnN0cnVjdGluZyB0ZW5zb3IgZnJvbSBhIHNwZWNpZmljIGxvY2F0aW9uLlxuXG4vLyAjcmVnaW9uIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHNwZWNpZmljIGxvY2F0aW9uXG5cbi8qKlxuICogcmVwcmVzZW50IGNvbW1vbiBwcm9wZXJ0aWVzIG9mIHRoZSBwYXJhbWV0ZXIgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgc3BlY2lmaWMgbG9jYXRpb24uXG4gKi9cbmludGVyZmFjZSBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4gZXh0ZW5kcyBQaWNrPFRlbnNvciwgJ2RpbXMnPiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIHJlYWRvbmx5IHR5cGU6IFQ7XG59XG5cbi8qKlxuICogcmVwcmVzZW50IHRoZSBwYXJhbWV0ZXIgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgR1BVIHJlc291cmNlLlxuICovXG5pbnRlcmZhY2UgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VCBleHRlbmRzIFRlbnNvci5UeXBlPiB7XG4gIC8qKlxuICAgKiBhbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0byBkb3dubG9hZCBkYXRhIGZyb20gR1BVIHRvIENQVS5cbiAgICpcbiAgICogSWYgbm90IHByb3ZpZGVkLCB0aGUgdGVuc29yIHRyZWF0IHRoZSBHUFUgZGF0YSBhcyBleHRlcm5hbCByZXNvdXJjZS5cbiAgICovXG4gIGRvd25sb2FkPygpOiBQcm9taXNlPFRlbnNvci5EYXRhVHlwZU1hcFtUXT47XG5cbiAgLyoqXG4gICAqIGFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgdGVuc29yIGlzIGRpc3Bvc2VkLlxuICAgKlxuICAgKiBJZiBub3QgcHJvdmlkZWQsIHRoZSB0ZW5zb3IgdHJlYXQgdGhlIEdQVSBkYXRhIGFzIGV4dGVybmFsIHJlc291cmNlLlxuICAgKi9cbiAgZGlzcG9zZT8oKTogdm9pZDtcbn1cblxuLyoqXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBwaW5uZWQgQ1BVIGJ1ZmZlclxuICovXG5leHBvcnQgaW50ZXJmYWNlIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLkNwdVBpbm5lZERhdGFUeXBlcyA9IFRlbnNvci5DcHVQaW5uZWREYXRhVHlwZXM+XG4gIGV4dGVuZHMgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICdjcHUtcGlubmVkJy5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAnY3B1LXBpbm5lZCc7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBDUFUgcGlubmVkIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cbiAgICovXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcbn1cblxuLyoqXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLlRleHR1cmVEYXRhVHlwZXMgPSBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcz5cbiAgZXh0ZW5kcyBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4sXG4gICAgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gYmUgJ3RleHR1cmUnLlxuICAgKi9cbiAgcmVhZG9ubHkgbG9jYXRpb246ICd0ZXh0dXJlJztcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIFdlYkdMIHRleHR1cmUgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqL1xuICByZWFkb25seSB0ZXh0dXJlOiBUZW5zb3IuVGV4dHVyZVR5cGU7XG59XG5cbi8qKlxuICogcmVwcmVzZW50IHRoZSBwYXJhbWV0ZXIgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViR1BVIGJ1ZmZlclxuICovXG5leHBvcnQgaW50ZXJmYWNlIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcyA9IFRlbnNvci5HcHVCdWZmZXJEYXRhVHlwZXM+XG4gIGV4dGVuZHMgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+LFxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICdncHUtYnVmZmVyJy5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAnZ3B1LWJ1ZmZlcic7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBXZWJHUFUgYnVmZmVyIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxuICAgKi9cbiAgcmVhZG9ubHkgZ3B1QnVmZmVyOiBUZW5zb3IuR3B1QnVmZmVyVHlwZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNTFRlbnNvckNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLk1MVGVuc29yRGF0YVR5cGVzID0gVGVuc29yLk1MVGVuc29yRGF0YVR5cGVzPlxuICBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPixcbiAgICBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAnbWwtdGVuc29yJy5cbiAgICovXG4gIHJlYWRvbmx5IGxvY2F0aW9uOiAnbWwtdGVuc29yJztcblxuICAvKipcbiAgICogU3BlY2lmeSB0aGUgV2ViTk4gTUxUZW5zb3IgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXG4gICAqL1xuICByZWFkb25seSBtbFRlbnNvcjogVGVuc29yLk1MVGVuc29yVHlwZTtcbn1cblxuLy8gI2VuZHJlZ2lvblxuXG4vLyB0aGUgZm9sbG93aW5nIHJlZ2lvbiBjb250YWlucyB0eXBlIGRlZmluaXRpb25zIG9mIGVhY2ggaW5kaXZpZHVhbCBvcHRpb25zLlxuLy8gdGhlIHRlbnNvciBmYWN0b3J5IGZ1bmN0aW9ucyB1c2UgYSBjb21wb3NpdGlvbiBvZiB0aG9zZSBvcHRpb25zIGFzIHRoZSBwYXJhbWV0ZXIgdHlwZS5cblxuLy8gI3JlZ2lvbiBPcHRpb25zIGZpZWxkc1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNGb3JtYXQge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSBmb3JtYXQgcmVwcmVzZW50ZWQgaW4gUkdCQSBjb2xvciBzcGFjZS5cbiAgICovXG4gIGZvcm1hdD86IEltYWdlRm9ybWF0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JGb3JtYXQge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSBmb3JtYXQgb2YgdGhlIHRlbnNvci5cbiAgICpcbiAgICogTk9URTogdGhpcyBpcyBkaWZmZXJlbnQgZnJvbSBvcHRpb24gJ2Zvcm1hdCcuIFdoaWxlIG9wdGlvbiAnZm9ybWF0JyByZXByZXNlbnRzIHRoZSBvcmlnaW5hbCBpbWFnZSwgJ3RlbnNvckZvcm1hdCdcbiAgICogcmVwcmVzZW50cyB0aGUgdGFyZ2V0IGZvcm1hdCBvZiB0aGUgdGVuc29yLiBBIHRyYW5zcG9zZSB3aWxsIGJlIHBlcmZvcm1lZCBpZiB0aGV5IGFyZSBkaWZmZXJlbnQuXG4gICAqL1xuICB0ZW5zb3JGb3JtYXQ/OiBJbWFnZUZvcm1hdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zVGVuc29yRGF0YVR5cGUge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cbiAgICovXG4gIGRhdGFUeXBlPzogJ2Zsb2F0MzInIHwgJ3VpbnQ4Jztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zVGVuc29yTGF5b3V0IHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgdGVuc29yIGxheW91dCB3aGVuIHJlcHJlc2VudGluZyBkYXRhIG9mIG9uZSBvciBtb3JlIGltYWdlKHMpLlxuICAgKi9cbiAgdGVuc29yTGF5b3V0PzogSW1hZ2VUZW5zb3JMYXlvdXQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc0RpbWVuc2lvbnMge1xuICAvKipcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSBoZWlnaHQgaW4gcGl4ZWxcbiAgICovXG4gIGhlaWdodD86IG51bWJlcjtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgaW1hZ2Ugd2lkdGggaW4gcGl4ZWxcbiAgICovXG4gIHdpZHRoPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zIHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgcmVzaXplZCBoZWlnaHQuIElmIG9taXR0ZWQsIG9yaWdpbmFsIGhlaWdodCB3aWxsIGJlIHVzZWQuXG4gICAqL1xuICByZXNpemVkSGVpZ2h0PzogbnVtYmVyO1xuICAvKipcbiAgICogRGVzY3JpYmVzIHJlc2l6ZWQgd2lkdGggLSBjYW4gYmUgYWNjZXNzZWQgdmlhIHRlbnNvciBkaW1lbnNpb25zIGFzIHdlbGxcbiAgICovXG4gIHJlc2l6ZWRXaWR0aD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge1xuICAvKipcbiAgICogRGVzY3JpYmVzIG5vcm1hbGl6YXRpb24gcGFyYW1ldGVycyB3aGVuIHByZXByb2Nlc3NpbmcgdGhlIGltYWdlIGFzIG1vZGVsIGlucHV0LlxuICAgKlxuICAgKiBEYXRhIGVsZW1lbnQgYXJlIHJhbmdlZCBmcm9tIDAgdG8gMjU1LlxuICAgKi9cbiAgbm9ybT86IHtcbiAgICAvKipcbiAgICAgKiBUaGUgJ2JpYXMnIHZhbHVlIGZvciBpbWFnZSBub3JtYWxpemF0aW9uLlxuICAgICAqIC0gSWYgb21pdHRlZCwgdXNlIGRlZmF1bHQgdmFsdWUgMC5cbiAgICAgKiAtIElmIGl0J3MgYSBzaW5nbGUgbnVtYmVyLCBhcHBseSB0byBlYWNoIGNoYW5uZWxcbiAgICAgKiAtIElmIGl0J3MgYW4gYXJyYXkgb2YgMyBvciA0IG51bWJlcnMsIGFwcGx5IGVsZW1lbnQtd2lzZS4gTnVtYmVyIG9mIGVsZW1lbnRzIG5lZWQgdG8gbWF0Y2ggdGhlIG51bWJlciBvZiBjaGFubmVsc1xuICAgICAqIGZvciB0aGUgY29ycmVzcG9uZGluZyBpbWFnZSBmb3JtYXRcbiAgICAgKi9cbiAgICBiaWFzPzogbnVtYmVyIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gICAgLyoqXG4gICAgICogVGhlICdtZWFuJyB2YWx1ZSBmb3IgaW1hZ2Ugbm9ybWFsaXphdGlvbi5cbiAgICAgKiAtIElmIG9taXR0ZWQsIHVzZSBkZWZhdWx0IHZhbHVlIDI1NS5cbiAgICAgKiAtIElmIGl0J3MgYSBzaW5nbGUgbnVtYmVyLCBhcHBseSB0byBlYWNoIGNoYW5uZWxcbiAgICAgKiAtIElmIGl0J3MgYW4gYXJyYXkgb2YgMyBvciA0IG51bWJlcnMsIGFwcGx5IGVsZW1lbnQtd2lzZS4gTnVtYmVyIG9mIGVsZW1lbnRzIG5lZWQgdG8gbWF0Y2ggdGhlIG51bWJlciBvZiBjaGFubmVsc1xuICAgICAqIGZvciB0aGUgY29ycmVzcG9uZGluZyBpbWFnZSBmb3JtYXRcbiAgICAgKi9cbiAgICBtZWFuPzogbnVtYmVyIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG4gIH07XG59XG5cbi8vICNlbmRyZWdpb25cblxuLy8gI3JlZ2lvbiBPcHRpb25zIGNvbXBvc2l0aW9uXG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcbiAgZXh0ZW5kcyBPcHRpb25SZXNpemVkRGltZW5zaW9ucyxcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0LFxuICAgIE9wdGlvbnNUZW5zb3JMYXlvdXQsXG4gICAgT3B0aW9uc1RlbnNvckRhdGFUeXBlLFxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zXG4gIGV4dGVuZHMgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXG4gICAgT3B0aW9uc1RlbnNvckZvcm1hdCxcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcbiAgICBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cblxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tVXJsT3B0aW9uc1xuICBleHRlbmRzIE9wdGlvbnNEaW1lbnNpb25zLFxuICAgIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQsXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsXG4gICAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9uc1xuICBleHRlbmRzIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLFxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQsXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcbiAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsXG4gICAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQgZXh0ZW5kcyBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcz5cbiAgZXh0ZW5kcyBSZXF1aXJlZDxPcHRpb25zRGltZW5zaW9ucz4sXG4gICAgT3B0aW9uc0Zvcm1hdCxcbiAgICBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiAvKiBUT0RPOiBhZGQgbW9yZSAqLyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQgZXh0ZW5kcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzPlxuICBleHRlbmRzIFBpY2s8VGVuc29yLCAnZGltcyc+LFxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICBkYXRhVHlwZT86IFQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbU1MVGVuc29yT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLk1MVGVuc29yRGF0YVR5cGVzPlxuICBleHRlbmRzIFBpY2s8VGVuc29yLCAnZGltcyc+LFxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXG4gICAqL1xuICBkYXRhVHlwZT86IFQ7XG59XG5cbi8vICNlbmRyZWdpb25cblxuLyoqXG4gKiB0eXBlIFRlbnNvckZhY3RvcnkgZGVmaW5lcyB0aGUgZmFjdG9yeSBmdW5jdGlvbnMgb2YgJ1RlbnNvcicgdG8gY3JlYXRlIHRlbnNvciBpbnN0YW5jZXMgZnJvbSBleGlzdGluZyBkYXRhIG9yXG4gKiByZXNvdXJjZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRmFjdG9yeSB7XG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhbiBJbWFnZURhdGEgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZURhdGEgLSB0aGUgSW1hZ2VEYXRhIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIEltYWdlRGF0YS5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbUltYWdlKFxuICAgIGltYWdlRGF0YTogSW1hZ2VEYXRhLFxuICAgIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIEhUTUxJbWFnZUVsZW1lbnQgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZUVsZW1lbnQgLSB0aGUgSFRNTEltYWdlRWxlbWVudCBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBIVE1MSW1hZ2VFbGVtZW50LlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXG4gICAqIC0gYGRhdGFUeXBlYDogYCdmbG9hdDMyJ2BcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tSW1hZ2UoXG4gICAgaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBVUkxcbiAgICpcbiAgICogQHBhcmFtIHVybFNvdXJjZSAtIGEgc3RyaW5nIGFzIGEgVVJMIHRvIHRoZSBpbWFnZSBvciBhIGRhdGEgVVJMIGNvbnRhaW5pbmcgdGhlIGltYWdlIGRhdGEuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBVUkwuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21JbWFnZSh1cmxTb3VyY2U6IHN0cmluZywgb3B0aW9ucz86IFRlbnNvckZyb21VcmxPcHRpb25zKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhbiBJbWFnZUJpdG1hcCBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIGJpdG1hcCAtIHRoZSBJbWFnZUJpdG1hcCBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBVUkwuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21JbWFnZShcbiAgICBiaXRtYXA6IEltYWdlQml0bWFwLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsXG4gICk6IFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+PjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXG4gICAqXG4gICAqIEBwYXJhbSB0ZXh0dXJlIC0gdGhlIFdlYkdMVGV4dHVyZSBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBXZWJHTCB0ZXh0dXJlLlxuICAgKlxuICAgKiBUaGUgb3B0aW9ucyBpbmNsdWRlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgKiAtIGB3aWR0aGA6IHRoZSB3aWR0aCBvZiB0aGUgdGV4dHVyZS4gUmVxdWlyZWQuXG4gICAqIC0gYGhlaWdodGA6IHRoZSBoZWlnaHQgb2YgdGhlIHRleHR1cmUuIFJlcXVpcmVkLlxuICAgKiAtIGBmb3JtYXRgOiB0aGUgZm9ybWF0IG9mIHRoZSB0ZXh0dXJlLiBJZiBvbWl0dGVkLCBhc3N1bWUgJ1JHQkEnLlxuICAgKiAtIGBkb3dubG9hZGA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRvd25sb2FkIHRoZSB0ZW5zb3IgZGF0YSBmcm9tIEdQVSB0byBDUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YVxuICAgKiB3aWxsIG5vdCBiZSBhYmxlIHRvIGRvd25sb2FkLiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3RcbiAgICogbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqIC0gYGRpc3Bvc2VgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YSBvbiBHUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YSB3aWxsIG5vdCBiZSBkaXNwb3NlZC5cbiAgICogVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0IG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21UZXh0dXJlPFQgZXh0ZW5kcyBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcyA9ICdmbG9hdDMyJz4oXG4gICAgdGV4dHVyZTogVGVuc29yLlRleHR1cmVUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcbiAgKTogVHlwZWRUZW5zb3I8J2Zsb2F0MzInPjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXG4gICAqXG4gICAqIEBwYXJhbSBidWZmZXIgLSB0aGUgR1BVQnVmZmVyIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFdlYkdQVSBidWZmZXIuXG4gICAqXG4gICAqIFRoZSBvcHRpb25zIGluY2x1ZGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAqIC0gYGRhdGFUeXBlYDogdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhc3N1bWUgJ2Zsb2F0MzInLlxuICAgKiAtIGBkaW1zYDogdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBSZXF1aXJlZC5cbiAgICogLSBgZG93bmxvYWRgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkb3dubG9hZCB0aGUgdGVuc29yIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGFcbiAgICogd2lsbCBub3QgYmUgYWJsZSB0byBkb3dubG9hZC4gVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0XG4gICAqIG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKiAtIGBkaXNwb3NlYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdGVuc29yIGRhdGEgb24gR1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGEgd2lsbCBub3QgYmUgZGlzcG9zZWQuXG4gICAqIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndCBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XG4gICAqL1xuICBmcm9tR3B1QnVmZmVyPFQgZXh0ZW5kcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzPihcbiAgICBidWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlLFxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+LFxuICApOiBUeXBlZFRlbnNvcjxUPjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBXZWJOTiBNTFRlbnNvclxuICAgKlxuICAgKiBAcGFyYW0gdGVuc29yIC0gdGhlIE1MVGVuc29yIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIGEgV2ViTk4gTUxUZW5zb3IuXG4gICAqXG4gICAqIFRoZSBvcHRpb25zIGluY2x1ZGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gICAqIC0gYGRhdGFUeXBlYDogdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhc3N1bWUgJ2Zsb2F0MzInLlxuICAgKiAtIGBkaW1zYDogdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBSZXF1aXJlZC5cbiAgICogLSBgZG93bmxvYWRgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkb3dubG9hZCB0aGUgdGVuc29yIGRhdGEgZnJvbSB0aGUgTUxUZW5zb3IgdG8gQ1BVLiBJZiBvbWl0dGVkLCB0aGUgTUxUZW5zb3JcbiAgICogZGF0YSB3aWxsIG5vdCBiZSBhYmxlIHRvIGRvd25sb2FkLiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IHRoZSBXZWJOTiBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuXG4gICAqIFVzZXJzIGRvbid0IG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxuICAgKiAtIGBkaXNwb3NlYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdGVuc29yIGRhdGEgb24gdGhlIFdlYk5OIE1MVGVuc29yLiBJZiBvbWl0dGVkLCB0aGUgTUxUZW5zb3Igd2lsbFxuICAgKiBub3QgYmUgZGlzcG9zZWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgdGhlIFdlYk5OIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3QgbmVlZCB0b1xuICAgKiBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxuICAgKi9cbiAgZnJvbU1MVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXM+KFxuICAgIHRlbnNvcjogVGVuc29yLk1MVGVuc29yVHlwZSxcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zPFQ+LFxuICApOiBUeXBlZFRlbnNvcjxUPjtcblxuICAvKipcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBwcmUtYWxsb2NhdGVkIGJ1ZmZlci4gVGhlIGJ1ZmZlciB3aWxsIGJlIHVzZWQgYXMgYSBwaW5uZWQgYnVmZmVyLlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSAtIHRoZSB0ZW5zb3IgZWxlbWVudCB0eXBlLlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gYSBUeXBlZEFycmF5IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGUuXG4gICAqIEBwYXJhbSBkaW1zIC0gc3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxuICAgKlxuICAgKiBAcmV0dXJucyBhIHRlbnNvciBvYmplY3RcbiAgICovXG4gIGZyb21QaW5uZWRCdWZmZXI8VCBleHRlbmRzIEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPj4oXG4gICAgdHlwZTogVCxcbiAgICBidWZmZXI6IFRlbnNvci5EYXRhVHlwZU1hcFtUXSxcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKipcbiAqIEEgc3RyaW5nIHRoYXQgcmVwcmVzZW50cyBhIGZpbGUncyBVUkwgb3IgcGF0aC5cbiAqXG4gKiBQYXRoIGlzIHZhaWxhYmxlIG9ubHkgaW4gb25ueHJ1bnRpbWUtbm9kZSBvciBvbm54cnVudGltZS13ZWIgcnVubmluZyBpbiBOb2RlLmpzLlxuICovXG5leHBvcnQgdHlwZSBGaWxlVXJsT3JQYXRoID0gc3RyaW5nO1xuXG4vKipcbiAqIEEgQmxvYiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmlsZS5cbiAqL1xuZXhwb3J0IHR5cGUgRmlsZUJsb2IgPSBCbG9iO1xuXG4vKipcbiAqIEEgVWludDhBcnJheSwgQXJyYXlCdWZmZXIgb3IgU2hhcmVkQXJyYXlCdWZmZXIgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGZpbGUgY29udGVudC5cbiAqXG4gKiBXaGVuIGl0IGlzIGFuIEFycmF5QnVmZmVyIG9yIFNoYXJlZEFycmF5QnVmZmVyLCB0aGUgd2hvbGUgYnVmZmVyIGlzIGFzc3VtZWQgdG8gYmUgdGhlIGZpbGUgY29udGVudC5cbiAqL1xuZXhwb3J0IHR5cGUgRmlsZURhdGEgPSBVaW50OEFycmF5IHwgQXJyYXlCdWZmZXJMaWtlO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBmaWxlIHRoYXQgY2FuIGJlIGxvYWRlZCBieSB0aGUgT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJLlxuICovXG5leHBvcnQgdHlwZSBGaWxlVHlwZSA9IEZpbGVVcmxPclBhdGggfCBGaWxlQmxvYiB8IEZpbGVEYXRhO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXh0ZXJuYWwgZGF0YSBmaWxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVybmFsRGF0YUZpbGVEZXNjcmlwdGlvbiB7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBleHRlcm5hbCBkYXRhIGZpbGUuXG4gICAqL1xuICBkYXRhOiBGaWxlVHlwZTtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGZpbGUgcGF0aC5cbiAgICovXG4gIHBhdGg6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGV4dGVybmFsIGRhdGEgZmlsZS5cbiAqXG4gKiBXaGVuIHVzaW5nIGEgc3RyaW5nLCBpdCBzaG91bGQgYmUgYSBmaWxlIFVSTCBvciBwYXRoIHRoYXQgaW4gdGhlIHNhbWUgZGlyZWN0b3J5IGFzIHRoZSBtb2RlbCBmaWxlLlxuICovXG5leHBvcnQgdHlwZSBFeHRlcm5hbERhdGFGaWxlVHlwZSA9IEV4dGVybmFsRGF0YUZpbGVEZXNjcmlwdGlvbiB8IEZpbGVVcmxPclBhdGg7XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgbW9kZWwgbG9hZGluZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPbm54TW9kZWxPcHRpb25zIHtcbiAgLyoqXG4gICAqIFNwZWNpZnlpbmcgYSBsaXN0IG9mIGZpbGVzIHRoYXQgcmVwcmVzZW50cyB0aGUgZXh0ZXJuYWwgZGF0YS5cbiAgICovXG4gIGV4dGVybmFsRGF0YT86IHJlYWRvbmx5IEV4dGVybmFsRGF0YUZpbGVUeXBlW107XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcblxuZXhwb3J0IHR5cGUgTm9uVGVuc29yVHlwZSA9IG5ldmVyO1xuXG4vKipcbiAqIFR5cGUgT25ueFZhbHVlIFJlcHJlc2VudHMgYm90aCB0ZW5zb3JzIGFuZCBub24tdGVuc29ycyB2YWx1ZSBmb3IgbW9kZWwncyBpbnB1dHMvb3V0cHV0cy5cbiAqXG4gKiBOT1RFOiBjdXJyZW50bHkgbm90IHN1cHBvcnQgbm9uLXRlbnNvclxuICovXG5leHBvcnQgdHlwZSBPbm54VmFsdWUgPSBUZW5zb3IgfCBOb25UZW5zb3JUeXBlO1xuXG4vKipcbiAqIFR5cGUgT25ueFZhbHVlRGF0YUxvY2F0aW9uIHJlcHJlc2VudHMgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIG9mIGFuIE9ubnhWYWx1ZS5cbiAqL1xuZXhwb3J0IHR5cGUgT25ueFZhbHVlRGF0YUxvY2F0aW9uID0gVGVuc29yLkRhdGFMb2NhdGlvbjtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVzb2x2ZUJhY2tlbmRBbmRFeGVjdXRpb25Qcm92aWRlcnMgfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XG5pbXBvcnQgeyBTZXNzaW9uSGFuZGxlciwgVHJhaW5pbmdTZXNzaW9uSGFuZGxlciB9IGZyb20gJy4vYmFja2VuZC5qcyc7XG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIGFzIEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcbmltcG9ydCB7IE9ubnhWYWx1ZSB9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XG5pbXBvcnQgeyBUcmFpbmluZ1Nlc3Npb24gYXMgVHJhaW5pbmdTZXNzaW9uSW50ZXJmYWNlLCBUcmFpbmluZ1Nlc3Npb25DcmVhdGVPcHRpb25zIH0gZnJvbSAnLi90cmFpbmluZy1zZXNzaW9uLmpzJztcblxudHlwZSBTZXNzaW9uT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnM7XG50eXBlIEZlZWRzVHlwZSA9IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlO1xudHlwZSBGZXRjaGVzVHlwZSA9IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGU7XG50eXBlIFJldHVyblR5cGUgPSBJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU7XG50eXBlIFJ1bk9wdGlvbnMgPSBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnM7XG5cbmNvbnN0IG5vQmFja2VuZEVyck1zZzogc3RyaW5nID1cbiAgJ1RyYWluaW5nIGJhY2tlbmQgY291bGQgbm90IGJlIHJlc29sdmVkLiAnICsgXCJNYWtlIHN1cmUgeW91J3JlIHVzaW5nIHRoZSBjb3JyZWN0IGNvbmZpZ3VyYXRpb24gJiBXZWJBc3NlbWJseSBmaWxlcy5cIjtcblxuZXhwb3J0IGNsYXNzIFRyYWluaW5nU2Vzc2lvbiBpbXBsZW1lbnRzIFRyYWluaW5nU2Vzc2lvbkludGVyZmFjZSB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IoaGFuZGxlcjogVHJhaW5pbmdTZXNzaW9uSGFuZGxlciwgaGFzT3B0aW1pemVyTW9kZWw6IGJvb2xlYW4sIGhhc0V2YWxNb2RlbDogYm9vbGVhbikge1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgdGhpcy5oYXNPcHRpbWl6ZXJNb2RlbCA9IGhhc09wdGltaXplck1vZGVsO1xuICAgIHRoaXMuaGFzRXZhbE1vZGVsID0gaGFzRXZhbE1vZGVsO1xuICB9XG4gIHByaXZhdGUgaGFuZGxlcjogVHJhaW5pbmdTZXNzaW9uSGFuZGxlcjtcbiAgcHJpdmF0ZSBoYXNPcHRpbWl6ZXJNb2RlbDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBoYXNFdmFsTW9kZWw6IGJvb2xlYW47XG5cbiAgZ2V0IHRyYWluaW5nSW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE5hbWVzO1xuICB9XG4gIGdldCB0cmFpbmluZ091dHB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLm91dHB1dE5hbWVzO1xuICB9XG5cbiAgZ2V0IGV2YWxJbnB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5oYXNFdmFsTW9kZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZXZhbElucHV0TmFtZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyB0cmFpbmluZyBzZXNzaW9uIGhhcyBubyBldmFsTW9kZWwgbG9hZGVkLicpO1xuICAgIH1cbiAgfVxuICBnZXQgZXZhbE91dHB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5oYXNFdmFsTW9kZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZXZhbE91dHB1dE5hbWVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgdHJhaW5pbmcgc2Vzc2lvbiBoYXMgbm8gZXZhbE1vZGVsIGxvYWRlZC4nKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY3JlYXRlKFxuICAgIHRyYWluaW5nT3B0aW9uczogVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9ucyxcbiAgICBzZXNzaW9uT3B0aW9ucz86IFNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPFRyYWluaW5nU2Vzc2lvbj4ge1xuICAgIGNvbnN0IGV2YWxNb2RlbDogc3RyaW5nIHwgVWludDhBcnJheSA9IHRyYWluaW5nT3B0aW9ucy5ldmFsTW9kZWwgfHwgJyc7XG4gICAgY29uc3Qgb3B0aW1pemVyTW9kZWw6IHN0cmluZyB8IFVpbnQ4QXJyYXkgPSB0cmFpbmluZ09wdGlvbnMub3B0aW1pemVyTW9kZWwgfHwgJyc7XG4gICAgY29uc3Qgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMgPSBzZXNzaW9uT3B0aW9ucyB8fCB7fTtcblxuICAgIC8vIHJlc29sdmUgYmFja2VuZCwgdXBkYXRlIHNlc3Npb24gb3B0aW9ucyB3aXRoIHZhbGlkYXRlZCBFUHMsIGFuZCBjcmVhdGUgc2Vzc2lvbiBoYW5kbGVyXG4gICAgY29uc3QgW2JhY2tlbmQsIG9wdGlvbnNXaXRoVmFsaWRhdGVkRVBzXSA9IGF3YWl0IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzKG9wdGlvbnMpO1xuICAgIGlmIChiYWNrZW5kLmNyZWF0ZVRyYWluaW5nU2Vzc2lvbkhhbmRsZXIpIHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBhd2FpdCBiYWNrZW5kLmNyZWF0ZVRyYWluaW5nU2Vzc2lvbkhhbmRsZXIoXG4gICAgICAgIHRyYWluaW5nT3B0aW9ucy5jaGVja3BvaW50U3RhdGUsXG4gICAgICAgIHRyYWluaW5nT3B0aW9ucy50cmFpbk1vZGVsLFxuICAgICAgICBldmFsTW9kZWwsXG4gICAgICAgIG9wdGltaXplck1vZGVsLFxuICAgICAgICBvcHRpb25zV2l0aFZhbGlkYXRlZEVQcyxcbiAgICAgICk7XG4gICAgICByZXR1cm4gbmV3IFRyYWluaW5nU2Vzc2lvbihoYW5kbGVyLCAhIXRyYWluaW5nT3B0aW9ucy5vcHRpbWl6ZXJNb2RlbCwgISF0cmFpbmluZ09wdGlvbnMuZXZhbE1vZGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG5vQmFja2VuZEVyck1zZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBmdW5jdGlvbiBmb3IgcnVuVHJhaW5TdGVwIGFuZCBmdXR1cmUgcnVuU3RlcCBtZXRob2RzIHRoYXQgaGFuZGxlcyB0aGUgdHlwZS1uYXJyb3dpbmcgY29udmVyc2lvbiBmcm9tXG4gICAqIHRoZSBnaXZlbiBwYXJhbWV0ZXJzIHRvIFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlIGFuZCBSdW5PcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gaW5wdXROYW1lcyB0aGUgZmVlZHMgb2JqZWN0IGlzIGNoZWNrZWQgdGhhdCB0aGV5IGNvbnRhaW4gYWxsIGlucHV0IG5hbWVzIGluIHRoZSBwcm92aWRlZCBsaXN0IG9mIGlucHV0XG4gICAqIG5hbWVzLlxuICAgKiBAcGFyYW0gb3V0cHV0TmFtZXMgdGhlIGZldGNoZXMgb2JqZWN0IGlzIGNoZWNrZWQgdGhhdCB0aGVpciBrZXlzIG1hdGNoIHVwIHdpdGggdmFsaWQgbmFtZXMgaW4gdGhlIGxpc3Qgb2Ygb3V0cHV0XG4gICAqIG5hbWVzLlxuICAgKiBAcGFyYW0gZmVlZHMgdGhlIHJlcXVpcmVkIGlucHV0XG4gICAqIEBwYXJhbSBhcmcxIG5hcnJvd2VkICYgY29udmVydGVkIGludG8gdGhlIFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlIG9yIFJ1bk9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSBhcmcyIG9wdGlvbmFsIFJ1bk9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgdHlwZU5hcnJvd2luZ0ZvclJ1blN0ZXAoXG4gICAgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW10sXG4gICAgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdLFxuICAgIGZlZWRzOiBGZWVkc1R5cGUsXG4gICAgYXJnMT86IEZldGNoZXNUeXBlIHwgUnVuT3B0aW9ucyxcbiAgICBhcmcyPzogUnVuT3B0aW9ucyxcbiAgKTogW1Nlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLCBSdW5PcHRpb25zXSB7XG4gICAgY29uc3QgZmV0Y2hlczogeyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIHwgbnVsbCB9ID0ge307XG4gICAgbGV0IG9wdGlvbnM6IFJ1bk9wdGlvbnMgPSB7fTtcbiAgICAvLyBjaGVjayBpbnB1dHNcbiAgICBpZiAodHlwZW9mIGZlZWRzICE9PSAnb2JqZWN0JyB8fCBmZWVkcyA9PT0gbnVsbCB8fCBmZWVkcyBpbnN0YW5jZW9mIFRlbnNvciB8fCBBcnJheS5pc0FycmF5KGZlZWRzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgXCInZmVlZHMnIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgdXNlIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cIixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmV0Y2hlc0VtcHR5ID0gdHJ1ZTtcbiAgICAvLyBkZXRlcm1pbmUgd2hpY2ggb3ZlcnJpZGUgaXMgYmVpbmcgdXNlZFxuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChhcmcxID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuZXhwZWN0ZWQgYXJndW1lbnRbMV06IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZzEgaW5zdGFuY2VvZiBUZW5zb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidmZXRjaGVzJyBjYW5ub3QgYmUgYSBUZW5zb3JcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZzEpKSB7XG4gICAgICAgIGlmIChhcmcxLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZmV0Y2hlcycgY2Fubm90IGJlIGFuIGVtcHR5IGFycmF5LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAvLyBvdXRwdXQgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGFyZzEpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2ZldGNoZXMnIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkgb3IgYW4gb2JqZWN0LlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG91dHB1dE5hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2ZldGNoZXMnIGNvbnRhaW5zIGludmFsaWQgb3V0cHV0IG5hbWU6ICR7bmFtZX0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XG4gICAgICAgICAgb3B0aW9ucyA9IGFyZzI7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGRlY2lkZSB3aGV0aGVyIGFyZzEgaXMgZmV0Y2hlcyBvciBvcHRpb25zXG4gICAgICAgIC8vIGlmIGFueSBvdXRwdXQgbmFtZSBpcyBwcmVzZW50IGFuZCBpdHMgdmFsdWUgaXMgdmFsaWQgT25ueFZhbHVlLCB3ZSBjb25zaWRlciBpdCBmZXRjaGVzXG4gICAgICAgIGxldCBpc0ZldGNoZXMgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgYXJnMUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmcxKTtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIG91dHB1dE5hbWVzKSB7XG4gICAgICAgICAgaWYgKGFyZzFLZXlzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gKGFyZzEgYXMgSW5mZXJlbmNlU2Vzc2lvbi5OdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUpW25hbWVdO1xuICAgICAgICAgICAgaWYgKHYgPT09IG51bGwgfHwgdiBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICAgICAgICBpc0ZldGNoZXMgPSB0cnVlO1xuICAgICAgICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICBmZXRjaGVzW25hbWVdID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGZXRjaGVzKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gYXJnMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMgPSBhcmcxIGFzIFJ1bk9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuZXhwZWN0ZWQgYXJndW1lbnRbMV06IG11c3QgYmUgJ2ZldGNoZXMnIG9yICdvcHRpb25zJy5cIik7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgYWxsIGlucHV0cyBhcmUgaW4gZmVlZFxuICAgIGZvciAoY29uc3QgbmFtZSBvZiBpbnB1dE5hbWVzKSB7XG4gICAgICBpZiAodHlwZW9mIGZlZWRzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlucHV0ICcke25hbWV9JyBpcyBtaXNzaW5nIGluICdmZWVkcycuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxuICAgIGlmIChpc0ZldGNoZXNFbXB0eSkge1xuICAgICAgZm9yIChjb25zdCBuYW1lIG9mIG91dHB1dE5hbWVzKSB7XG4gICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbZmV0Y2hlcywgb3B0aW9uc107XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIG1ldGhvZCBmb3IgcnVuVHJhaW5TdGVwIGFuZCBhbnkgb3RoZXIgcnVuU3RlcCBtZXRob2RzLiBUYWtlcyB0aGUgUmV0dXJuVHlwZSByZXN1bHQgZnJvbSB0aGUgU2Vzc2lvbkhhbmRsZXJcbiAgICogYW5kIGNoYW5nZXMgaXQgaW50byBhIG1hcCBvZiBUZW5zb3JzLlxuICAgKlxuICAgKiBAcGFyYW0gcmVzdWx0c1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgY29udmVydEhhbmRsZXJSZXR1cm5UeXBlVG9NYXBPZlRlbnNvcnMocmVzdWx0czogU2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZSk6IFJldHVyblR5cGUge1xuICAgIGNvbnN0IHJldHVyblZhbHVlOiB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfSA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3VsdHMpIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHRzLCBrZXkpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNba2V5XTtcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFRlbnNvcikge1xuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IG5ldyBUZW5zb3IocmVzdWx0LnR5cGUsIHJlc3VsdC5kYXRhLCByZXN1bHQuZGltcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG5cbiAgYXN5bmMgbGF6eVJlc2V0R3JhZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmhhbmRsZXIubGF6eVJlc2V0R3JhZCgpO1xuICB9XG5cbiAgcnVuVHJhaW5TdGVwKGZlZWRzOiBGZWVkc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcbiAgcnVuVHJhaW5TdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGZldGNoZXM6IEZldGNoZXNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIGFzeW5jIHJ1blRyYWluU3RlcChmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGUgfCBSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xuICAgIGNvbnN0IFtmZXRjaGVzLCBvcHRpb25zXSA9IHRoaXMudHlwZU5hcnJvd2luZ0ZvclJ1blN0ZXAoXG4gICAgICB0aGlzLnRyYWluaW5nSW5wdXROYW1lcyxcbiAgICAgIHRoaXMudHJhaW5pbmdPdXRwdXROYW1lcyxcbiAgICAgIGZlZWRzLFxuICAgICAgYXJnMSxcbiAgICAgIGFyZzIsXG4gICAgKTtcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5oYW5kbGVyLnJ1blRyYWluU3RlcChmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuY29udmVydEhhbmRsZXJSZXR1cm5UeXBlVG9NYXBPZlRlbnNvcnMocmVzdWx0cyk7XG4gIH1cblxuICBhc3luYyBydW5PcHRpbWl6ZXJTdGVwKG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMgfCB1bmRlZmluZWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5oYXNPcHRpbWl6ZXJNb2RlbCkge1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bk9wdGltaXplclN0ZXAob3B0aW9ucyB8fCB7fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBUcmFpbmluZ1Nlc3Npb24gaGFzIG5vIE9wdGltaXplck1vZGVsIGxvYWRlZC4nKTtcbiAgICB9XG4gIH1cblxuICBydW5FdmFsU3RlcChmZWVkczogRmVlZHNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyB8IHVuZGVmaW5lZCk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIHJ1bkV2YWxTdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGZldGNoZXM6IEZldGNoZXNUeXBlLCBvcHRpb25zPzogUnVuT3B0aW9ucyB8IHVuZGVmaW5lZCk6IFByb21pc2U8UmV0dXJuVHlwZT47XG4gIGFzeW5jIHJ1bkV2YWxTdGVwKGZlZWRzOiBGZWVkc1R5cGUsIGFyZzE/OiBGZXRjaGVzVHlwZSB8IFJ1bk9wdGlvbnMsIGFyZzI/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPiB7XG4gICAgaWYgKHRoaXMuaGFzRXZhbE1vZGVsKSB7XG4gICAgICBjb25zdCBbZmV0Y2hlcywgb3B0aW9uc10gPSB0aGlzLnR5cGVOYXJyb3dpbmdGb3JSdW5TdGVwKFxuICAgICAgICB0aGlzLmV2YWxJbnB1dE5hbWVzLFxuICAgICAgICB0aGlzLmV2YWxPdXRwdXROYW1lcyxcbiAgICAgICAgZmVlZHMsXG4gICAgICAgIGFyZzEsXG4gICAgICAgIGFyZzIsXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuaGFuZGxlci5ydW5FdmFsU3RlcChmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gdGhpcy5jb252ZXJ0SGFuZGxlclJldHVyblR5cGVUb01hcE9mVGVuc29ycyhyZXN1bHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIFRyYWluaW5nU2Vzc2lvbiBoYXMgbm8gRXZhbE1vZGVsIGxvYWRlZC4nKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5ID0gdHJ1ZSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5nZXRQYXJhbWV0ZXJzU2l6ZSh0cmFpbmFibGVPbmx5KTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRQYXJhbWV0ZXJzQnVmZmVyKGFycmF5OiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5ID0gdHJ1ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhcmFtc1NpemUgPSBhd2FpdCB0aGlzLmdldFBhcmFtZXRlcnNTaXplKHRyYWluYWJsZU9ubHkpO1xuICAgIC8vIGNoZWNraW5nIHRoYXQgdGhlIHNpemUgb2YgdGhlIFVpbnQ4QXJyYXkgaXMgZXF1aXZhbGVudCB0byB0aGUgYnl0ZSBsZW5ndGggb2YgYSBGbG9hdDMyQXJyYXkgb2YgdGhlIG51bWJlclxuICAgIC8vIG9mIHBhcmFtZXRlcnNcbiAgICBpZiAoYXJyYXkubGVuZ3RoICE9PSA0ICogcGFyYW1zU2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnU2l6ZSBvZiB0aGUgYnVmZmVyIHBhc3NlZCBpbnRvIGxvYWRQYXJhbWV0ZXJzQnVmZmVyIG11c3QgbWF0Y2ggdGhlIG51bWJlciBvZiBwYXJhbWV0ZXJzIGluICcgK1xuICAgICAgICAgICd0aGUgbW9kZWwuIFBsZWFzZSB1c2UgZ2V0UGFyYW1ldGVyc1NpemUgbWV0aG9kIHRvIGNoZWNrLicsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmxvYWRQYXJhbWV0ZXJzQnVmZmVyKGFycmF5LCB0cmFpbmFibGVPbmx5KTtcbiAgfVxuXG4gIGFzeW5jIGdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKHRyYWluYWJsZU9ubHkgPSB0cnVlKTogUHJvbWlzZTxPbm54VmFsdWU+IHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmdldENvbnRpZ3VvdXNQYXJhbWV0ZXJzKHRyYWluYWJsZU9ubHkpO1xuICB9XG5cbiAgYXN5bmMgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmRpc3Bvc2UoKTtcbiAgfVxufVxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5pbXBvcnQgeyBPbm54VmFsdWUgfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xuaW1wb3J0IHsgVHJhaW5pbmdTZXNzaW9uIGFzIFRyYWluaW5nU2Vzc2lvbkltcGwgfSBmcm9tICcuL3RyYWluaW5nLXNlc3Npb24taW1wbC5qcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cblxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFRyYWluaW5nU2Vzc2lvbiB7XG4gIC8qKlxuICAgKiBFaXRoZXIgVVJJIGZpbGUgcGF0aCAoc3RyaW5nKSBvciBVaW50OEFycmF5IGNvbnRhaW5pbmcgbW9kZWwgb3IgY2hlY2twb2ludCBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHR5cGUgVXJpT3JCdWZmZXIgPSBzdHJpbmcgfCBVaW50OEFycmF5O1xufVxuXG4vKipcbiAqIFJlcHJlc2VudCBhIHJ1bnRpbWUgaW5zdGFuY2Ugb2YgYW4gT05OWCB0cmFpbmluZyBzZXNzaW9uLFxuICogd2hpY2ggY29udGFpbnMgYSBtb2RlbCB0aGF0IGNhbiBiZSB0cmFpbmVkLCBhbmQsIG9wdGlvbmFsbHksXG4gKiBhbiBldmFsIGFuZCBvcHRpbWl6ZXIgbW9kZWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uIHtcbiAgLy8gI3JlZ2lvbiBydW4oKVxuXG4gIC8qKlxuICAgKiBMYXppbHkgcmVzZXRzIHRoZSBncmFkaWVudHMgb2YgYWxsIHRyYWluYWJsZSBwYXJhbWV0ZXJzIHRvIHplcm8uIFNob3VsZCBoYXBwZW4gYWZ0ZXIgdGhlIGludm9jYXRpb24gb2ZcbiAgICogcnVuT3B0aW1pemVyU3RlcC5cbiAgICovXG4gIGxhenlSZXNldEdyYWQoKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUnVuIFRyYWluU3RlcCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5JbnB1dFR5cGVgIGZvclxuICAgZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIHRyYWluaW5nLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgKi9cbiAgcnVuVHJhaW5TdGVwKFxuICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIFJ1biBhIHNpbmdsZSB0cmFpbiBzdGVwIHdpdGggdGhlIGdpdmVuIGlucHV0cyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LlxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuXG4gICAqIGRldGFpbC5cbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCB0cmFpbmluZy5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nXG4gICB2YWx1ZXMuXG4gICAqL1xuICBydW5UcmFpblN0ZXAoXG4gICAgZmVlZHM6IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlLFxuICAgIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXG4gICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xuXG4gIC8qKlxuICAgKiBSdW5zIGEgc2luZ2xlIG9wdGltaXplciBzdGVwLCB3aGljaCBwZXJmb3JtcyB3ZWlnaHQgdXBkYXRlcyBmb3IgdGhlIHRyYWluYWJsZSBwYXJhbWV0ZXJzIHVzaW5nIHRoZSBvcHRpbWl6ZXIgbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgb3B0aW1pemluZy5cbiAgICovXG4gIHJ1bk9wdGltaXplclN0ZXAob3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJ1biBhIHNpbmdsZSBldmFsIHN0ZXAgd2l0aCB0aGUgZ2l2ZW4gaW5wdXRzIGFuZCBvcHRpb25zIHVzaW5nIHRoZSBldmFsIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgZXZhbCBzdGVwLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmdcbiAgIHZhbHVlcy5cbiAgICovXG4gIHJ1bkV2YWxTdGVwKFxuICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLyoqXG4gICAqIFJ1biBhIHNpbmdsZSBldmFsIHN0ZXAgd2l0aCB0aGUgZ2l2ZW4gaW5wdXRzIGFuZCBvcHRpb25zIHVzaW5nIHRoZSBldmFsIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuXG4gICAqIEBwYXJhbSBmZXRjaGVzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIG91dHB1dC5cbiAgICogZGV0YWlsLlxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGV2YWwgc3RlcC5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nXG4gICB2YWx1ZXMuXG4gICAqL1xuICBydW5FdmFsU3RlcChcbiAgICBmZWVkczogSW5mZXJlbmNlU2Vzc2lvbi5GZWVkc1R5cGUsXG4gICAgZmV0Y2hlczogSW5mZXJlbmNlU2Vzc2lvbi5GZXRjaGVzVHlwZSxcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24uUmV0dXJuVHlwZT47XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gY29weSBwYXJhbWV0ZXJzXG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgc2l6ZSBvZiBhbGwgcGFyYW1ldGVycyBmb3IgdGhlIHRyYWluaW5nIHN0YXRlLiBDYWxjdWxhdGVzIHRoZSB0b3RhbCBudW1iZXIgb2YgcHJpbWl0aXZlIChkYXRhdHlwZSBvZlxuICAgKiB0aGUgcGFyYW1ldGVycykgZWxlbWVudHMgb2YgYWxsIHRoZSBwYXJhbWV0ZXJzIGluIHRoZSB0cmFpbmluZyBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHRyYWluYWJsZU9ubHkgLSBXaGVuIHNldCB0byB0cnVlLCB0aGUgc2l6ZSBpcyBjYWxjdWxhdGVkIGZvciB0cmFpbmFibGUgcGFyYW1zIG9ubHkuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICovXG4gIGdldFBhcmFtZXRlcnNTaXplKHRyYWluYWJsZU9ubHk6IGJvb2xlYW4pOiBQcm9taXNlPG51bWJlcj47XG5cbiAgLyoqXG4gICAqIENvcGllcyBwYXJhbWV0ZXIgdmFsdWVzIGZyb20gdGhlIGdpdmVuIGJ1ZmZlciB0byB0aGUgdHJhaW5pbmcgc3RhdGUuIEN1cnJlbnRseSwgb25seSBzdXBwb3J0aW5nIG1vZGVscyB3aXRoXG4gICAqIHBhcmFtZXRlcnMgb2YgdHlwZSBGbG9hdDMyLlxuICAgKlxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQSBVaW50OEFycmF5IHJlcHJlc2VudGF0aW9uIG9mIEZsb2F0MzIgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHRyYWluYWJsZU9ubHkgLSBUcnVlIGlmIHRyYWluYWJsZSBwYXJhbWV0ZXJzIG9ubHkgdG8gYmUgbW9kaWZpZWQsIGZhbHNlIG90aGVyd2lzZS4gRGVmYXVsdCB2YWx1ZSBpcyB0cnVlLlxuICAgKi9cbiAgbG9hZFBhcmFtZXRlcnNCdWZmZXIoYnVmZmVyOiBVaW50OEFycmF5LCB0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogQ29waWVzIHRoZSBtb2RlbCBwYXJhbWV0ZXJzIHRvIGEgY29udGlndW91cyBidWZmZXIuIFVzdWFsbHkgdXNlZCBpbiB0aGUgY29udGV4dCBvZiBGZWRlcmF0ZWQgTGVhcm5pbmcuXG4gICAqIEN1cnJlbnRseSwgb25seSBzdXBwb3J0aW5nIG1vZGVscyB3aXRoIHBhcmFtZXRlcnMgb2YgdHlwZSBGbG9hdDMyLlxuICAgKlxuICAgKiBAcGFyYW0gdHJhaW5hYmxlT25seSAtIFdoZW4gc2V0IHRvIHRydWUsIG9ubHkgdHJhaW5hYmxlIHBhcmFtZXRlcnMgYXJlIGNvcGllZC4gVHJhaW5hYmxlIHBhcmFtZXRlcnMgYXJlIHBhcmFtZXRlcnNcbiAgICogZm9yIHdoaWNoIHJlcXVpcmVzX2dyYWQgaXMgc2V0IHRvIHRydWUuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBGbG9hdDMyIE9ubnhWYWx1ZSBvZiB0aGUgcmVxdWVzdGVkIHBhcmFtZXRlcnMuXG4gICAqL1xuICBnZXRDb250aWd1b3VzUGFyYW1ldGVycyh0cmFpbmFibGVPbmx5OiBib29sZWFuKTogUHJvbWlzZTxPbm54VmFsdWU+O1xuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiByZWxlYXNlKClcblxuICAvKipcbiAgICogUmVsZWFzZSB0aGUgaW5mZXJlbmNlIHNlc3Npb24gYW5kIHRoZSB1bmRlcmx5aW5nIHJlc291cmNlcy5cbiAgICovXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gbWV0YWRhdGFcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgdHJhaW5pbmcgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSB0cmFpbmluZ0lucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBHZXQgb3V0cHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgdHJhaW5pbmcgbW9kZWwuXG4gICAqL1xuICByZWFkb25seSB0cmFpbmluZ091dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgZXZhbCBtb2RlbC4gSXMgYW4gZW1wdHkgYXJyYXkgaWYgbm8gZXZhbCBtb2RlbCBpcyBsb2FkZWQuXG4gICAqL1xuICByZWFkb25seSBldmFsSW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldCBvdXRwdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBldmFsIG1vZGVsLiBJcyBhbiBlbXB0eSBhcnJheSBpZiBubyBldmFsIG1vZGVsIGlzIGxvYWRlZC5cbiAgICovXG4gIHJlYWRvbmx5IGV2YWxPdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XG5cbiAgLy8gI2VuZHJlZ2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIG9wdGlvbmFsIHBhcmFtZXRlcnMgdGhhdCBjYW4gYmUgcGFzc2VkIGludG8gdGhlIFRyYWluaW5nU2Vzc2lvbkZhY3RvcnkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdTZXNzaW9uQ3JlYXRlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBVUkkgb3IgYnVmZmVyIGZvciBhIC5ja3B0IGZpbGUgdGhhdCBjb250YWlucyB0aGUgY2hlY2twb2ludCBmb3IgdGhlIHRyYWluaW5nIG1vZGVsLlxuICAgKi9cbiAgY2hlY2twb2ludFN0YXRlOiBUcmFpbmluZ1Nlc3Npb24uVXJpT3JCdWZmZXI7XG4gIC8qKlxuICAgKiBVUkkgb3IgYnVmZmVyIGZvciB0aGUgLm9ubnggdHJhaW5pbmcgZmlsZS5cbiAgICovXG4gIHRyYWluTW9kZWw6IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcjtcbiAgLyoqXG4gICAqIE9wdGlvbmFsLiBVUkkgb3IgYnVmZmVyIGZvciB0aGUgLm9ubnggb3B0aW1pemVyIG1vZGVsIGZpbGUuXG4gICAqL1xuICBvcHRpbWl6ZXJNb2RlbD86IFRyYWluaW5nU2Vzc2lvbi5VcmlPckJ1ZmZlcjtcbiAgLyoqXG4gICAqIE9wdGlvbmFsLiBVUkkgb3IgYnVmZmVyIGZvciB0aGUgLm9ubnggZXZhbCBtb2RlbCBmaWxlLlxuICAgKi9cbiAgZXZhbE1vZGVsPzogVHJhaW5pbmdTZXNzaW9uLlVyaU9yQnVmZmVyO1xufVxuXG4vKipcbiAqIERlZmluZXMgbWV0aG9kIG92ZXJsb2FkIHBvc3NpYmlsaXRpZXMgZm9yIGNyZWF0aW5nIGEgVHJhaW5pbmdTZXNzaW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYWluaW5nU2Vzc2lvbkZhY3Rvcnkge1xuICAvLyAjcmVnaW9uIGNyZWF0ZSgpXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgVHJhaW5pbmdTZXNzaW9uIGFuZCBhc3luY2hyb25vdXNseSBsb2FkcyBhbnkgbW9kZWxzIHBhc3NlZCBpbiB0aHJvdWdoIHRyYWluaW5nT3B0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0gdHJhaW5pbmdPcHRpb25zIHNwZWNpZnkgbW9kZWxzIGFuZCBjaGVja3BvaW50cyB0byBsb2FkIGludG8gdGhlIFRyYWluaW5nIFNlc3Npb25cbiAgICogQHBhcmFtIHNlc3Npb25PcHRpb25zIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgdHJhaW5pbmcgc2Vzc2lvbiBiZWhhdmlvclxuICAgKlxuICAgKiBAcmV0dXJucyBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBUcmFpbmluZ1Nlc3Npb24gb2JqZWN0XG4gICAqL1xuICBjcmVhdGUoXG4gICAgdHJhaW5pbmdPcHRpb25zOiBUcmFpbmluZ1Nlc3Npb25DcmVhdGVPcHRpb25zLFxuICAgIHNlc3Npb25PcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUcmFpbmluZ1Nlc3Npb24+O1xuXG4gIC8vICNlbmRyZWdpb25cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuZXhwb3J0IGNvbnN0IFRyYWluaW5nU2Vzc2lvbjogVHJhaW5pbmdTZXNzaW9uRmFjdG9yeSA9IFRyYWluaW5nU2Vzc2lvbkltcGw7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8qKlxuICogIyBPTk5YIFJ1bnRpbWUgSmF2YVNjcmlwdCBBUElcbiAqXG4gKiBPTk5YIFJ1bnRpbWUgSmF2YVNjcmlwdCBBUEkgaXMgYSB1bmlmaWVkIEFQSSBmb3IgYWxsIEphdmFTY3JpcHQgdXNhZ2VzLCBpbmNsdWRpbmcgdGhlIGZvbGxvd2luZyBOUE0gcGFja2FnZXM6XG4gKlxuICogLSBbb25ueHJ1bnRpbWUtbm9kZV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtbm9kZSlcbiAqIC0gW29ubnhydW50aW1lLXdlYl0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtd2ViKVxuICogLSBbb25ueHJ1bnRpbWUtcmVhY3QtbmF0aXZlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS1yZWFjdC1uYXRpdmUpXG4gKlxuICogU2VlIGFsc286XG4gKiAtIFtHZXQgU3RhcnRlZF0oaHR0cHM6Ly9vbm54cnVudGltZS5haS9kb2NzL2dldC1zdGFydGVkL3dpdGgtamF2YXNjcmlwdC8pXG4gKiAtIFtJbmZlcmVuY2UgZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUtaW5mZXJlbmNlLWV4YW1wbGVzL3RyZWUvbWFpbi9qcylcbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2JhY2tlbmQuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9lbnYuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xuZXhwb3J0ICogZnJvbSAnLi90cmFjZS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL29ubngtbW9kZWwuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vdHJhaW5pbmctc2Vzc2lvbi5qcyc7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAhISh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLm5vZGUpO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJ3ZWJ3b3JrZXJcIiAvPlxuXG4vL1xuLy8gKiB0eXBlIGhhY2sgZm9yIFwiSFRNTEltYWdlRWxlbWVudFwiXG4vL1xuLy8gaW4gdHlwZXNjcmlwdCwgdGhlIHR5cGUgb2YgXCJIVE1MSW1hZ2VFbGVtZW50XCIgaXMgZGVmaW5lZCBpbiBsaWIuZG9tLmQudHMsIHdoaWNoIGlzIGNvbmZsaWN0IHdpdGggbGliLndlYndvcmtlci5kLnRzLlxuLy8gd2hlbiB3ZSB1c2Ugd2Vid29ya2VyLCB0aGUgbGliLndlYndvcmtlci5kLnRzIHdpbGwgYmUgdXNlZCwgd2hpY2ggZG9lcyBub3QgaGF2ZSBIVE1MSW1hZ2VFbGVtZW50IGRlZmluZWQuXG4vL1xuLy8gd2Ugd2lsbCBnZXQgdGhlIGZvbGxvd2luZyBlcnJvcnMgY29tcGxhaW5pbmcgdGhhdCBIVE1MSW1hZ2VFbGVtZW50IGlzIG5vdCBkZWZpbmVkOlxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gLi4vY29tbW9uL2Rpc3QvY2pzL3RlbnNvci1mYWN0b3J5LmQudHM6MTg3OjI5IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MSW1hZ2VFbGVtZW50Jy4gRGlkIHlvdSBtZWFuXG4vLyAnSFRNTExJRWxlbWVudCc/XG4vL1xuLy8gMTg3ICAgICBmcm9tSW1hZ2UoaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50LCBvcHRpb25zPzogVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMpOlxuLy8gUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XG4vL1xuLy8gbm9kZV9tb2R1bGVzL0B3ZWJncHUvdHlwZXMvZGlzdC9pbmRleC5kLnRzOjgzOjcgLSBlcnJvciBUUzI1NTI6IENhbm5vdCBmaW5kIG5hbWUgJ0hUTUxJbWFnZUVsZW1lbnQnLiBEaWQgeW91IG1lYW5cbi8vICdIVE1MTElFbGVtZW50Jz9cbi8vXG4vLyA4MyAgICAgfCBIVE1MSW1hZ2VFbGVtZW50XG4vLyAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XG4vL1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyBgSFRNTEltYWdlRWxlbWVudGAgaXMgb25seSB1c2VkIGluIHR5cGUgZGVjbGFyYXRpb24gYW5kIG5vdCBpbiByZWFsIGNvZGUuIFNvIHdlIGRlZmluZSBpdCBhcyBgdW5rbm93bmAgaGVyZSB0b1xuLy8gYnlwYXNzIHRoZSB0eXBlIGNoZWNrLlxuXG4vL1xuLy8gKiB0eXBlIGhhY2sgZm9yIFwiZG9jdW1lbnRcIlxuLy9cbi8vIGluIHR5cGVzY3JpcHQsIHRoZSB0eXBlIG9mIFwiZG9jdW1lbnRcIiBpcyBkZWZpbmVkIGluIGxpYi5kb20uZC50cywgc28gaXQncyBub3QgYXZhaWxhYmxlIGluIHdlYndvcmtlci5cbi8vXG4vLyB3ZSB3aWxsIGdldCB0aGUgZm9sbG93aW5nIGVycm9ycyBjb21wbGFpbmluZyB0aGF0IGRvY3VtZW50IGlzIG5vdCBkZWZpbmVkOlxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHM6NzozMyAtIGVycm9yIFRTMjU4NDogQ2Fubm90IGZpbmQgbmFtZSAnZG9jdW1lbnQnLiBEbyB5b3UgbmVlZCB0byBjaGFuZ2UgeW91ciB0YXJnZXRcbi8vIGxpYnJhcnk/IFRyeSBjaGFuZ2luZyB0aGUgJ2xpYicgY29tcGlsZXIgb3B0aW9uIHRvIGluY2x1ZGUgJ2RvbScuXG4vL1xuLy8gNyBleHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5cbi8vXG4vLyBsaWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50czo3OjYxIC0gZXJyb3IgVFMyNTg0OiBDYW5ub3QgZmluZCBuYW1lICdkb2N1bWVudCcuIERvIHlvdSBuZWVkIHRvIGNoYW5nZSB5b3VyIHRhcmdldFxuLy8gbGlicmFyeT8gVHJ5IGNoYW5naW5nIHRoZSAnbGliJyBjb21waWxlciBvcHRpb24gdG8gaW5jbHVkZSAnZG9tJy5cbi8vXG4vLyA3IGV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gKGRvY3VtZW50Py5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5cbi8vXG4vLyBsaWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50czo3Ojg4IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MU2NyaXB0RWxlbWVudCcuIERpZCB5b3UgbWVhblxuLy8gJ0hUTUxMSUVsZW1lbnQnP1xuLy9cbi8vIDcgZXhwb3J0IGNvbnN0IHNjcmlwdFNyYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAoZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmMgOlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+flxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vXG4vLyBgZG9jdW1lbnRgIGlzIHVzZWQgdG8gZ2V0IHRoZSBjdXJyZW50IHNjcmlwdCBVUkwsIHdoaWNoIGlzIG5vdCBhdmFpbGFibGUgaW4gd2Vid29ya2VyLiBUaGlzIGZpbGUgaXMgc2VydmVkIGFzIGFcbi8vIFwiZHVhbFwiIGZpbGUgZm9yIGVudHJpZXMgb2YgYm90aCB3ZWJ3b3JrZXIgYW5kIHRoZSBlc20gbW9kdWxlLlxuLy9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdHlwZSBIVE1MSW1hZ2VFbGVtZW50ID0gdW5rbm93bjtcbiAgdHlwZSBIVE1MU2NyaXB0RWxlbWVudCA9IHsgc3JjPzogc3RyaW5nIH07XG4gIGNvbnN0IGRvY3VtZW50OiB1bmRlZmluZWQgfCB7IGN1cnJlbnRTY3JpcHQ/OiBIVE1MU2NyaXB0RWxlbWVudCB9O1xufVxuXG4vKipcbiAqIEBzdW1tYXJ5XG4gKlxuICogVGhpcyBmaWxlIGlzIHNlcnZlZCBhcyBhIFwiZHVhbFwiIGZpbGUgZm9yIGJvdGggZW50cmllcyBvZiB0aGUgZm9sbG93aW5nOlxuICogLSBUaGUgcHJveHkgd29ya2VyIGl0c2VsZi5cbiAqICAgLSBXaGVuIHVzZWQgYXMgYSB3b3JrZXIsIGl0IGxpc3RlbnMgdG8gdGhlIG1lc3NhZ2VzIGZyb20gdGhlIG1haW4gdGhyZWFkIGFuZCBwZXJmb3JtcyB0aGUgY29ycmVzcG9uZGluZyBvcGVyYXRpb25zLlxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCBkaXJlY3RseSB1c2luZyBgbmV3IFdvcmtlcigpYCBpbiB0aGUgbWFpbiB0aHJlYWQuXG4gKlxuICogLSBUaGUgRVNNIG1vZHVsZSB0aGF0IGNyZWF0ZXMgdGhlIHByb3h5IHdvcmtlciAoYXMgYSB3b3JrZXIgbGF1bmNoZXIpLlxuICogICAtIFdoZW4gdXNlZCBhcyBhIHdvcmtlciBsYXVuY2hlciwgaXQgY3JlYXRlcyB0aGUgcHJveHkgd29ya2VyIGFuZCByZXR1cm5zIGl0LlxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCB1c2luZyBgaW1wb3J0KClgIGluIHRoZSBtYWluIHRocmVhZCwgd2l0aCB0aGUgcXVlcnkgcGFyYW1ldGVyIGBpbXBvcnQ9MWAuXG4gKlxuICogVGhpcyBmaWxlIHdpbGwgYmUgYWx3YXlzIGNvbXBpbGluZyBpbnRvIEVTTSBmb3JtYXQuXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTWVzc2FnZSwgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEgfSBmcm9tICcuLi9wcm94eS1tZXNzYWdlcy5qcyc7XG5pbXBvcnQge1xuICBjcmVhdGVTZXNzaW9uLFxuICBjb3B5RnJvbUV4dGVybmFsQnVmZmVyLFxuICBlbmRQcm9maWxpbmcsXG4gIGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzLFxuICBpbml0RXAsXG4gIGluaXRSdW50aW1lLFxuICByZWxlYXNlU2Vzc2lvbixcbiAgcnVuLFxufSBmcm9tICcuLi93YXNtLWNvcmUtaW1wbC5qcyc7XG5pbXBvcnQgeyBpbml0aWFsaXplV2ViQXNzZW1ibHkgfSBmcm9tICcuLi93YXNtLWZhY3RvcnkuanMnO1xuaW1wb3J0IHsgc2NyaXB0U3JjIH0gZnJvbSAnLi4vd2FzbS11dGlscy1pbXBvcnQuanMnO1xuXG5jb25zdCBXT1JLRVJfTkFNRSA9ICdvcnQtd2FzbS1wcm94eS13b3JrZXInO1xuY29uc3QgaXNQcm94eVdvcmtlciA9IGdsb2JhbFRoaXMuc2VsZj8ubmFtZSA9PT0gV09SS0VSX05BTUU7XG5cbmlmIChpc1Byb3h5V29ya2VyKSB7XG4gIC8vIFdvcmtlciB0aHJlYWRcbiAgc2VsZi5vbm1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudDxPcnRXYXNtTWVzc2FnZT4pOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IHR5cGUsIGluOiBtZXNzYWdlIH0gPSBldi5kYXRhO1xuICAgIHRyeSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnaW5pdC13YXNtJzpcbiAgICAgICAgICBpbml0aWFsaXplV2ViQXNzZW1ibHkobWVzc2FnZSEud2FzbSkudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgaW5pdFJ1bnRpbWUobWVzc2FnZSEpLnRoZW4oXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdpbml0LWVwJzoge1xuICAgICAgICAgIGNvbnN0IHsgZXBOYW1lLCBlbnYgfSA9IG1lc3NhZ2UhO1xuICAgICAgICAgIGluaXRFcChlbnYsIGVwTmFtZSkudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnY29weS1mcm9tJzoge1xuICAgICAgICAgIGNvbnN0IHsgYnVmZmVyIH0gPSBtZXNzYWdlITtcbiAgICAgICAgICBjb25zdCBidWZmZXJEYXRhID0gY29weUZyb21FeHRlcm5hbEJ1ZmZlcihidWZmZXIpO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgb3V0OiBidWZmZXJEYXRhIH0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NyZWF0ZSc6IHtcbiAgICAgICAgICBjb25zdCB7IG1vZGVsLCBvcHRpb25zIH0gPSBtZXNzYWdlITtcbiAgICAgICAgICBjcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKS50aGVuKFxuICAgICAgICAgICAgKHNlc3Npb25NZXRhZGF0YSkgPT4ge1xuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIG91dDogc2Vzc2lvbk1ldGFkYXRhIH0gYXMgT3J0V2FzbU1lc3NhZ2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAncmVsZWFzZSc6XG4gICAgICAgICAgcmVsZWFzZVNlc3Npb24obWVzc2FnZSEpO1xuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncnVuJzoge1xuICAgICAgICAgIGNvbnN0IHsgc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9ucyB9ID0gbWVzc2FnZSE7XG4gICAgICAgICAgcnVuKHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG5ldyBBcnJheShvdXRwdXRJbmRpY2VzLmxlbmd0aCkuZmlsbChudWxsKSwgb3B0aW9ucykudGhlbihcbiAgICAgICAgICAgIChvdXRwdXRzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChvdXRwdXRzLnNvbWUoKG8pID0+IG9bM10gIT09ICdjcHUnKSkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyOiAnUHJveHkgZG9lcyBub3Qgc3VwcG9ydCBub24tY3B1IHRlbnNvciBsb2NhdGlvbi4nIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgeyB0eXBlLCBvdXQ6IG91dHB1dHMgfSBhcyBPcnRXYXNtTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgIGV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzKFsuLi5pbnB1dHMsIC4uLm91dHB1dHNdIGFzIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW10pLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2VuZC1wcm9maWxpbmcnOlxuICAgICAgICAgIGVuZFByb2ZpbGluZyhtZXNzYWdlISk7XG4gICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSBhcyBPcnRXYXNtTWVzc2FnZSk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1Byb3h5V29ya2VyXG4gID8gbnVsbFxuICA6ICh1cmxPdmVycmlkZT86IHN0cmluZykgPT5cbiAgICAgIG5ldyBXb3JrZXIodXJsT3ZlcnJpZGUgPz8gc2NyaXB0U3JjISwgeyB0eXBlOiBCVUlMRF9ERUZTLklTX0VTTSA/ICdtb2R1bGUnIDogJ2NsYXNzaWMnLCBuYW1lOiBXT1JLRVJfTkFNRSB9KTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTW9kdWxlIH0gZnJvbSAnLi93YXNtLXR5cGVzJztcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vd2FzbS11dGlscy1lbnYnO1xuXG4vKipcbiAqIFRoZSBjbGFzc2ljIHNjcmlwdCBzb3VyY2UgVVJMLiBUaGlzIGlzIG5vdCBhbHdheXMgYXZhaWxhYmxlIGluIG5vbiBFU01vZHVsZSBlbnZpcm9ubWVudHMuXG4gKlxuICogSW4gTm9kZS5qcywgdGhpcyBpcyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPVxuICAvLyBpZiBOb2RlanMsIHJldHVybiB1bmRlZmluZWRcbiAgaXNOb2RlXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IC8vIGlmIEl0J3MgRVNNLCB1c2UgaW1wb3J0Lm1ldGEudXJsXG4gICAgICAoQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMID8/XG4gICAgICAvLyB1c2UgYGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjYCBpZiBhdmFpbGFibGVcbiAgICAgICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmNcbiAgICAgICAgOiAvLyB1c2UgYHNlbGYubG9jYXRpb24uaHJlZmAgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgPyBzZWxmLmxvY2F0aW9uPy5ocmVmXG4gICAgICAgICAgOiB1bmRlZmluZWQpKTtcblxuLyoqXG4gKiBUaGUgb3JpZ2luIG9mIHRoZSBjdXJyZW50IGxvY2F0aW9uLlxuICpcbiAqIEluIE5vZGUuanMsIHRoaXMgaXMgdW5kZWZpbmVkLlxuICovXG5jb25zdCBvcmlnaW4gPSBpc05vZGUgfHwgdHlwZW9mIGxvY2F0aW9uID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGxvY2F0aW9uLm9yaWdpbjtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gZmlsZW5hbWUgd2l0aCBwcmVmaXggaXMgZnJvbSB0aGUgc2FtZSBvcmlnaW4uXG4gKi9cbmNvbnN0IGlzU2FtZU9yaWdpbiA9IChmaWxlbmFtZTogc3RyaW5nLCBwcmVmaXhPdmVycmlkZT86IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGJhc2VVcmwgPSBwcmVmaXhPdmVycmlkZSA/PyBzY3JpcHRTcmM7XG4gICAgY29uc3QgdXJsID0gYmFzZVVybCA/IG5ldyBVUkwoZmlsZW5hbWUsIGJhc2VVcmwpIDogbmV3IFVSTChmaWxlbmFtZSk7XG4gICAgcmV0dXJuIHVybC5vcmlnaW4gPT09IG9yaWdpbjtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgaW5wdXRzIHRvIGFuIGFic29sdXRlIFVSTCB3aXRoIHRoZSBnaXZlbiBwcmVmaXggb3ZlcnJpZGUuIElmIGZhaWxlZCwgcmV0dXJuIHVuZGVmaW5lZC5cbiAqL1xuY29uc3Qgbm9ybWFsaXplVXJsID0gKGZpbGVuYW1lOiBzdHJpbmcsIHByZWZpeE92ZXJyaWRlPzogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGJhc2VVcmwgPSBwcmVmaXhPdmVycmlkZSA/PyBzY3JpcHRTcmM7XG4gIHRyeSB7XG4gICAgY29uc3QgdXJsID0gYmFzZVVybCA/IG5ldyBVUkwoZmlsZW5hbWUsIGJhc2VVcmwpIDogbmV3IFVSTChmaWxlbmFtZSk7XG4gICAgcmV0dXJuIHVybC5ocmVmO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIGZhbGxiYWNrIFVSTCBpZiBhbiBhYnNvbHV0ZSBVUkwgY2Fubm90IGJlIGNyZWF0ZWQgYnkgdGhlIG5vcm1hbGl6ZVVybCBmdW5jdGlvbi5cbiAqL1xuY29uc3QgZmFsbGJhY2tVcmwgPSAoZmlsZW5hbWU6IHN0cmluZywgcHJlZml4T3ZlcnJpZGU/OiBzdHJpbmcpID0+IGAke3ByZWZpeE92ZXJyaWRlID8/ICcuLyd9JHtmaWxlbmFtZX1gO1xuXG4vKipcbiAqIFRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcHJlbG9hZCBhIG1vZHVsZSBmcm9tIGEgVVJMLlxuICpcbiAqIElmIHRoZSBvcmlnaW4gb2YgdGhlIHdvcmtlciBVUkwgaXMgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgb3JpZ2luLCB0aGUgd29ya2VyIGNhbm5vdCBiZSBsb2FkZWQgZGlyZWN0bHkuXG4gKiBTZWUgZGlzY3Vzc2lvbnMgaW4gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi93b3JrZXItbG9hZGVyL2lzc3Vlcy8xNTRcbiAqXG4gKiBJbiB0aGlzIGNhc2UsIHdlIHdpbGwgZmV0Y2ggdGhlIHdvcmtlciBVUkwgYW5kIGNyZWF0ZSBhIG5ldyBCbG9iIFVSTCB3aXRoIHRoZSBzYW1lIG9yaWdpbiBhcyBhIHdvcmthcm91bmQuXG4gKlxuICogQHBhcmFtIGFic29sdXRlVXJsIC0gVGhlIGFic29sdXRlIFVSTCB0byBwcmVsb2FkLlxuICpcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBuZXcgQmxvYiBVUkxcbiAqL1xuY29uc3QgcHJlbG9hZCA9IGFzeW5jIChhYnNvbHV0ZVVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhYnNvbHV0ZVVybCwgeyBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyB9KTtcbiAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG59O1xuXG4vKipcbiAqIFRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZHluYW1pY2FsbHkgaW1wb3J0IGEgbW9kdWxlIGZyb20gYSBVUkwuXG4gKlxuICogVGhlIGJ1aWxkIHNjcmlwdCBoYXMgc3BlY2lhbCBoYW5kbGluZyBmb3IgdGhpcyBmdW5jdGlvbiB0byBlbnN1cmUgdGhhdCB0aGUgVVJMIGlzIG5vdCBidW5kbGVkIGludG8gdGhlIGZpbmFsIG91dHB1dC5cbiAqXG4gKiBAcGFyYW0gdXJsIC0gVGhlIFVSTCB0byBpbXBvcnQuXG4gKlxuICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgZGVmYXVsdCBleHBvcnQgb2YgdGhlIG1vZHVsZS5cbiAqL1xuY29uc3QgZHluYW1pY0ltcG9ydERlZmF1bHQgPSBhc3luYyA8VD4odXJsOiBzdHJpbmcpOiBQcm9taXNlPFQ+ID0+XG4gIChhd2FpdCBpbXBvcnQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB1cmwpKS5kZWZhdWx0O1xuXG4vKipcbiAqIFRoZSBwcm94eSB3b3JrZXIgZmFjdG9yeSBpbXBvcnRlZCBmcm9tIHRoZSBwcm94eSB3b3JrZXIgbW9kdWxlLlxuICpcbiAqIFRoaXMgaXMgb25seSBhdmFpbGFibGUgd2hlbiB0aGUgV2ViQXNzZW1ibHkgcHJveHkgaXMgbm90IGRpc2FibGVkLlxuICovXG5jb25zdCBjcmVhdGVQcm94eVdvcmtlcjogKCh1cmxPdmVycmlkZT86IHN0cmluZykgPT4gV29ya2VyKSB8IHVuZGVmaW5lZCA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gIEJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZID8gdW5kZWZpbmVkIDogcmVxdWlyZSgnLi9wcm94eS13b3JrZXIvbWFpbicpLmRlZmF1bHQ7XG5cbi8qKlxuICogSW1wb3J0IHRoZSBwcm94eSB3b3JrZXIuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIHBlcmZvcm0gdGhlIGZvbGxvd2luZyBzdGVwczpcbiAqIDEuIElmIGEgcHJlbG9hZCBpcyBuZWVkZWQsIGl0IHdpbGwgcHJlbG9hZCB0aGUgbW9kdWxlIGFuZCByZXR1cm4gdGhlIG9iamVjdCBVUkwuXG4gKiAyLiBVc2UgdGhlIHByb3h5IHdvcmtlciBmYWN0b3J5IHRvIGNyZWF0ZSB0aGUgcHJveHkgd29ya2VyLlxuICpcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0dXBsZSBvZiAyIGVsZW1lbnRzOlxuICogICAgICAgICAgICAtIFRoZSBvYmplY3QgVVJMIG9mIHRoZSBwcmVsb2FkZWQgbW9kdWxlLCBvciB1bmRlZmluZWQgaWYgbm8gcHJlbG9hZCBpcyBuZWVkZWQuXG4gKiAgICAgICAgICAgIC0gVGhlIHByb3h5IHdvcmtlci5cbiAqL1xuZXhwb3J0IGNvbnN0IGltcG9ydFByb3h5V29ya2VyID0gYXN5bmMgKCk6IFByb21pc2U8W3VuZGVmaW5lZCB8IHN0cmluZywgV29ya2VyXT4gPT4ge1xuICBpZiAoIXNjcmlwdFNyYykge1xuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgcHJveHkgd29ya2VyOiBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBzY3JpcHQgc291cmNlIFVSTC4nKTtcbiAgfVxuXG4gIC8vIElmIHRoZSBzY3JpcHQgc291cmNlIGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLCB3ZSBjYW4gdXNlIHRoZSBlbWJlZGRlZCBwcm94eSBtb2R1bGUgZGlyZWN0bHkuXG4gIGlmIChpc1NhbWVPcmlnaW4oc2NyaXB0U3JjKSkge1xuICAgIHJldHVybiBbdW5kZWZpbmVkLCBjcmVhdGVQcm94eVdvcmtlciEoKV07XG4gIH1cblxuICAvLyBPdGhlcndpc2UsIG5lZWQgdG8gcHJlbG9hZFxuICBjb25zdCB1cmwgPSBhd2FpdCBwcmVsb2FkKHNjcmlwdFNyYyk7XG4gIHJldHVybiBbdXJsLCBjcmVhdGVQcm94eVdvcmtlciEodXJsKV07XG59O1xuXG4vKipcbiAqIFRoZSBlbWJlZGRlZCBXZWJBc3NlbWJseSBtb2R1bGUuXG4gKlxuICogVGhpcyBpcyBvbmx5IGF2YWlsYWJsZSBpbiBFU00gYW5kIHdoZW4gZW1iZWRkaW5nIGlzIG5vdCBkaXNhYmxlZC5cbiAqL1xuY29uc3QgZW1iZWRkZWRXYXNtTW9kdWxlOiBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPiB8IHVuZGVmaW5lZCA9XG4gIEJVSUxEX0RFRlMuSVNfRVNNICYmIEJVSUxEX0RFRlMuRElTQUJMRV9EWU5BTUlDX0lNUE9SVFxuICAgID8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbiAgICAgIHJlcXVpcmUoXG4gICAgICAgICFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUFxuICAgICAgICAgID8gJy4uLy4uL2Rpc3Qvb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qcydcbiAgICAgICAgICA6ICcuLi8uLi9kaXN0L29ydC13YXNtLXNpbWQtdGhyZWFkZWQubWpzJyxcbiAgICAgICkuZGVmYXVsdFxuICAgIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEltcG9ydCB0aGUgV2ViQXNzZW1ibHkgbW9kdWxlLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHM6XG4gKiAxLiBJZiBCVUlMRF9ERUZTLkRJU0FCTEVfRFlOQU1JQ19JTVBPUlQgaXMgdHJ1ZSwgdXNlIHRoZSBlbWJlZGRlZCBtb2R1bGUuXG4gKiAyLiBJZiBhIHByZWxvYWQgaXMgbmVlZGVkLCBpdCB3aWxsIHByZWxvYWQgdGhlIG1vZHVsZSBhbmQgcmV0dXJuIHRoZSBvYmplY3QgVVJMLlxuICogMy4gT3RoZXJ3aXNlLCBpdCB3aWxsIHBlcmZvcm0gYSBkeW5hbWljIGltcG9ydCBvZiB0aGUgbW9kdWxlLlxuICpcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0dXBsZSBvZiAyIGVsZW1lbnRzOlxuICogICAgICAgICAgICAtIFRoZSBvYmplY3QgVVJMIG9mIHRoZSBwcmVsb2FkZWQgbW9kdWxlLCBvciB1bmRlZmluZWQgaWYgbm8gcHJlbG9hZCBpcyBuZWVkZWQuXG4gKiAgICAgICAgICAgIC0gVGhlIGRlZmF1bHQgZXhwb3J0IG9mIHRoZSBtb2R1bGUsIHdoaWNoIGlzIGEgZmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIFdlYkFzc2VtYmx5IG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGltcG9ydFdhc21Nb2R1bGUgPSBhc3luYyAoXG4gIHVybE92ZXJyaWRlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIHByZWZpeE92ZXJyaWRlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIGlzTXVsdGlUaHJlYWRlZDogYm9vbGVhbixcbik6IFByb21pc2U8W3VuZGVmaW5lZCB8IHN0cmluZywgRW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT5dPiA9PiB7XG4gIGlmIChCVUlMRF9ERUZTLkRJU0FCTEVfRFlOQU1JQ19JTVBPUlQpIHtcbiAgICByZXR1cm4gW3VuZGVmaW5lZCwgZW1iZWRkZWRXYXNtTW9kdWxlIV07XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgd2FzbU1vZHVsZUZpbGVuYW1lID0gIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQXG4gICAgICA/ICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAubWpzJ1xuICAgICAgOiAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5tanMnO1xuICAgIGNvbnN0IHdhc21Nb2R1bGVVcmwgPSB1cmxPdmVycmlkZSA/PyBub3JtYWxpemVVcmwod2FzbU1vZHVsZUZpbGVuYW1lLCBwcmVmaXhPdmVycmlkZSk7XG4gICAgLy8gbmVlZCB0byBwcmVsb2FkIGlmIGFsbCBvZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAgICAvLyAxLiBub3QgaW4gTm9kZS5qcy5cbiAgICAvLyAgICAtIE5vZGUuanMgZG9lcyBub3QgaGF2ZSB0aGUgc2FtZSBvcmlnaW4gcG9saWN5IGZvciBjcmVhdGluZyB3b3JrZXJzLlxuICAgIC8vIDIuIG11bHRpLXRocmVhZGVkIGlzIGVuYWJsZWQuXG4gICAgLy8gICAgLSBJZiBtdWx0aS10aHJlYWRlZCBpcyBkaXNhYmxlZCwgbm8gd29ya2VyIHdpbGwgYmUgY3JlYXRlZC4gU28gd2UgZG9uJ3QgbmVlZCB0byBwcmVsb2FkIHRoZSBtb2R1bGUuXG4gICAgLy8gMy4gdGhlIGFic29sdXRlIFVSTCBpcyBhdmFpbGFibGUuXG4gICAgLy8gICAgLSBJZiB0aGUgYWJzb2x1dGUgVVJMIGlzIGZhaWxlZCB0byBiZSBjcmVhdGVkLCB0aGUgb3JpZ2luIGNhbm5vdCBiZSBkZXRlcm1pbmVkLiBJbiB0aGlzIGNhc2UsIHdlIHdpbGwgbm90XG4gICAgLy8gICAgcHJlbG9hZCB0aGUgbW9kdWxlLlxuICAgIC8vIDQuIHRoZSB3b3JrZXIgVVJMIGlzIG5vdCBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cbiAgICAvLyAgICAtIElmIHRoZSB3b3JrZXIgVVJMIGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLCB3ZSBjYW4gY3JlYXRlIHRoZSB3b3JrZXIgZGlyZWN0bHkuXG4gICAgY29uc3QgbmVlZFByZWxvYWQgPSAhaXNOb2RlICYmIGlzTXVsdGlUaHJlYWRlZCAmJiB3YXNtTW9kdWxlVXJsICYmICFpc1NhbWVPcmlnaW4od2FzbU1vZHVsZVVybCwgcHJlZml4T3ZlcnJpZGUpO1xuICAgIGNvbnN0IHVybCA9IG5lZWRQcmVsb2FkXG4gICAgICA/IGF3YWl0IHByZWxvYWQod2FzbU1vZHVsZVVybClcbiAgICAgIDogKHdhc21Nb2R1bGVVcmwgPz8gZmFsbGJhY2tVcmwod2FzbU1vZHVsZUZpbGVuYW1lLCBwcmVmaXhPdmVycmlkZSkpO1xuICAgIHJldHVybiBbbmVlZFByZWxvYWQgPyB1cmwgOiB1bmRlZmluZWQsIGF3YWl0IGR5bmFtaWNJbXBvcnREZWZhdWx0PEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+Pih1cmwpXTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgRW52IH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTW9kdWxlIH0gZnJvbSAnLi93YXNtLXR5cGVzJztcbmltcG9ydCB7IGltcG9ydFdhc21Nb2R1bGUgfSBmcm9tICcuL3dhc20tdXRpbHMtaW1wb3J0JztcblxubGV0IHdhc206IE9ydFdhc21Nb2R1bGUgfCB1bmRlZmluZWQ7XG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBpbml0aWFsaXppbmcgPSBmYWxzZTtcbmxldCBhYm9ydGVkID0gZmFsc2U7XG5cbmNvbnN0IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIC8vIElmICdTaGFyZWRBcnJheUJ1ZmZlcicgaXMgbm90IGF2YWlsYWJsZSwgV2ViQXNzZW1ibHkgdGhyZWFkcyB3aWxsIG5vdCB3b3JrLlxuICBpZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gVGVzdCBmb3IgdHJhbnNmZXJhYmlsaXR5IG9mIFNBQnMgKGZvciBicm93c2Vycy4gbmVlZGVkIGZvciBGaXJlZm94KVxuICAgIC8vIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vZm9ydW0vIyFtc2cvbW96aWxsYS5kZXYucGxhdGZvcm0vSUhrQlpsSEVUcEEvZHdzTU5jaFdFUUFKXG4gICAgaWYgKHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5ldyBNZXNzYWdlQ2hhbm5lbCgpLnBvcnQxLnBvc3RNZXNzYWdlKG5ldyBTaGFyZWRBcnJheUJ1ZmZlcigxKSk7XG4gICAgfVxuXG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgdGhyZWFkcyBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIHRocmVhZGVkIGluc3RydWN0aW9ucy5cbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUoXG4gICAgICBuZXcgVWludDhBcnJheShbXG4gICAgICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgNCwgMSwgOTYsIDAsIDAsIDMsIDIsIDEsIDAsIDUsIDQsIDEsIDMsIDEsIDEsIDEwLCAxMSwgMSwgOSwgMCwgNjUsIDAsIDI1NCwgMTYsXG4gICAgICAgIDIsIDAsIDI2LCAxMSxcbiAgICAgIF0pLFxuICAgICk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGlzU2ltZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSBTSU1EIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgU0lNRCBpbnN0cnVjdGlvbnMuXG5cbiAgICAvLyBUaGUgYmluYXJ5IGRhdGEgaXMgZ2VuZXJhdGVkIGZyb20gdGhlIGZvbGxvd2luZyBjb2RlIGJ5IHdhdDJ3YXNtOlxuICAgIC8vXG4gICAgLy8gKG1vZHVsZVxuICAgIC8vICAgKHR5cGUgJHQwIChmdW5jKSlcbiAgICAvLyAgIChmdW5jICRmMCAodHlwZSAkdDApXG4gICAgLy8gICAgIChkcm9wXG4gICAgLy8gICAgICAgKGkzMng0LmRvdF9pMTZ4OF9zXG4gICAgLy8gICAgICAgICAoaTh4MTYuc3BsYXRcbiAgICAvLyAgICAgICAgICAgKGkzMi5jb25zdCAwKSlcbiAgICAvLyAgICAgICAgICh2MTI4LmNvbnN0IGkzMng0IDB4MDAwMDAwMDAgMHgwMDAwMDAwMCAweDAwMDAwMDAwIDB4MDAwMDAwMDApKSkpKVxuXG4gICAgcmV0dXJuIFdlYkFzc2VtYmx5LnZhbGlkYXRlKFxuICAgICAgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDQsIDEsIDk2LCAwLCAwLCAzLCAyLCAxLCAwLCAxMCwgMzAsIDEsIDI4LCAwLCA2NSwgMCwgMjUzLCAxNSwgMjUzLCAxMiwgMCwgMCwgMCxcbiAgICAgICAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMjUzLCAxODYsIDEsIDI2LCAxMSxcbiAgICAgIF0pLFxuICAgICk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplV2ViQXNzZW1ibHkgPSBhc3luYyAoZmxhZ3M6IEVudi5XZWJBc3NlbWJseUZsYWdzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgY2FsbHMgdG8gJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpJyBkZXRlY3RlZC5cIik7XG4gIH1cbiAgaWYgKGFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcmV2aW91cyBjYWxsIHRvICdpbml0aWFsaXplV2ViQXNzZW1ibHkoKScgZmFpbGVkLlwiKTtcbiAgfVxuXG4gIGluaXRpYWxpemluZyA9IHRydWU7XG5cbiAgLy8gd2FzbSBmbGFncyBhcmUgYWxyZWFkeSBpbml0aWFsaXplZFxuICBjb25zdCB0aW1lb3V0ID0gZmxhZ3MuaW5pdFRpbWVvdXQhO1xuICBsZXQgbnVtVGhyZWFkcyA9IGZsYWdzLm51bVRocmVhZHMhO1xuXG4gIC8vIGVuc3VyZSBTSU1EIGlzIHN1cHBvcnRlZFxuICBpZiAoIWlzU2ltZFN1cHBvcnRlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBTSU1EIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuJyk7XG4gIH1cblxuICAvLyBjaGVjayBpZiBtdWx0aS10aHJlYWRpbmcgaXMgc3VwcG9ydGVkXG4gIGNvbnN0IG11bHRpVGhyZWFkU3VwcG9ydGVkID0gaXNNdWx0aVRocmVhZFN1cHBvcnRlZCgpO1xuICBpZiAobnVtVGhyZWFkcyA+IDEgJiYgIW11bHRpVGhyZWFkU3VwcG9ydGVkKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiAhc2VsZi5jcm9zc09yaWdpbklzb2xhdGVkKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnZW52Lndhc20ubnVtVGhyZWFkcyBpcyBzZXQgdG8gJyArXG4gICAgICAgICAgbnVtVGhyZWFkcyArXG4gICAgICAgICAgJywgYnV0IHRoaXMgd2lsbCBub3Qgd29yayB1bmxlc3MgeW91IGVuYWJsZSBjcm9zc09yaWdpbklzb2xhdGVkIG1vZGUuICcgK1xuICAgICAgICAgICdTZWUgaHR0cHM6Ly93ZWIuZGV2L2Nyb3NzLW9yaWdpbi1pc29sYXRpb24tZ3VpZGUvIGZvciBtb3JlIGluZm8uJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnV2ViQXNzZW1ibHkgbXVsdGktdGhyZWFkaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuICcgKyAnRmFsbGluZyBiYWNrIHRvIHNpbmdsZS10aHJlYWRpbmcuJyxcbiAgICApO1xuXG4gICAgLy8gc2V0IGZsYWdzLm51bVRocmVhZHMgdG8gMSBzbyB0aGF0IE9ydEluaXQoKSB3aWxsIG5vdCBjcmVhdGUgYSBnbG9iYWwgdGhyZWFkIHBvb2wuXG4gICAgZmxhZ3MubnVtVGhyZWFkcyA9IG51bVRocmVhZHMgPSAxO1xuICB9XG5cbiAgY29uc3Qgd2FzbVBhdGhzID0gZmxhZ3Mud2FzbVBhdGhzO1xuICBjb25zdCB3YXNtUHJlZml4T3ZlcnJpZGUgPSB0eXBlb2Ygd2FzbVBhdGhzID09PSAnc3RyaW5nJyA/IHdhc21QYXRocyA6IHVuZGVmaW5lZDtcbiAgY29uc3QgbWpzUGF0aE92ZXJyaWRlRmxhZyA9ICh3YXNtUGF0aHMgYXMgRW52Lldhc21GaWxlUGF0aHMpPy5tanM7XG4gIGNvbnN0IG1qc1BhdGhPdmVycmlkZSA9IChtanNQYXRoT3ZlcnJpZGVGbGFnIGFzIFVSTCk/LmhyZWYgPz8gbWpzUGF0aE92ZXJyaWRlRmxhZztcbiAgY29uc3Qgd2FzbVBhdGhPdmVycmlkZUZsYWcgPSAod2FzbVBhdGhzIGFzIEVudi5XYXNtRmlsZVBhdGhzKT8ud2FzbTtcbiAgY29uc3Qgd2FzbVBhdGhPdmVycmlkZSA9ICh3YXNtUGF0aE92ZXJyaWRlRmxhZyBhcyBVUkwpPy5ocmVmID8/IHdhc21QYXRoT3ZlcnJpZGVGbGFnO1xuICBjb25zdCB3YXNtQmluYXJ5T3ZlcnJpZGUgPSBmbGFncy53YXNtQmluYXJ5O1xuXG4gIGNvbnN0IFtvYmplY3RVcmwsIG9ydFdhc21GYWN0b3J5XSA9IGF3YWl0IGltcG9ydFdhc21Nb2R1bGUobWpzUGF0aE92ZXJyaWRlLCB3YXNtUHJlZml4T3ZlcnJpZGUsIG51bVRocmVhZHMgPiAxKTtcblxuICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG5cbiAgY29uc3QgdGFza3M6IEFycmF5PFByb21pc2U8dm9pZD4+ID0gW107XG5cbiAgLy8gcHJvbWlzZSBmb3IgdGltZW91dFxuICBpZiAodGltZW91dCA+IDApIHtcbiAgICB0YXNrcy5wdXNoKFxuICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIC8vIHByb21pc2UgZm9yIG1vZHVsZSBpbml0aWFsaXphdGlvblxuICB0YXNrcy5wdXNoKFxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNvbmZpZzogUGFydGlhbDxPcnRXYXNtTW9kdWxlPiA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2YgdGhyZWFkcy4gV2ViQXNzZW1ibHkgd2lsbCBjcmVhdGUgKE1vZHVsZS5udW1UaHJlYWRzIC0gMSkgd29ya2Vycy4gSWYgaXQgaXMgMSwgbm8gd29ya2VyIHdpbGwgYmVcbiAgICAgICAgICogY3JlYXRlZC5cbiAgICAgICAgICovXG4gICAgICAgIG51bVRocmVhZHMsXG4gICAgICB9O1xuXG4gICAgICBpZiAod2FzbUJpbmFyeU92ZXJyaWRlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgYSBjdXN0b20gYnVmZmVyIHdoaWNoIGNvbnRhaW5zIHRoZSBXZWJBc3NlbWJseSBiaW5hcnkuIFRoaXMgd2lsbCBza2lwIHRoZSB3YXNtIGZpbGUgZmV0Y2hpbmcuXG4gICAgICAgICAqL1xuICAgICAgICBjb25maWcud2FzbUJpbmFyeSA9IHdhc21CaW5hcnlPdmVycmlkZTtcbiAgICAgIH0gZWxzZSBpZiAod2FzbVBhdGhPdmVycmlkZSB8fCB3YXNtUHJlZml4T3ZlcnJpZGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gbG9jYXRlIHRoZSBXZWJBc3NlbWJseSBmaWxlLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBTaW5jZSBFbXNjcmlwdGVuIDMuMS41OCwgdGhpcyBmdW5jdGlvbiBpcyBvbmx5IGNhbGxlZCBmb3IgdGhlIC53YXNtIGZpbGUuXG4gICAgICAgICAqL1xuICAgICAgICBjb25maWcubG9jYXRlRmlsZSA9IChmaWxlTmFtZSwgc2NyaXB0RGlyZWN0b3J5KSA9PlxuICAgICAgICAgIHdhc21QYXRoT3ZlcnJpZGUgPz8gKHdhc21QcmVmaXhPdmVycmlkZSA/PyBzY3JpcHREaXJlY3RvcnkpICsgZmlsZU5hbWU7XG4gICAgICB9XG5cbiAgICAgIG9ydFdhc21GYWN0b3J5KGNvbmZpZykudGhlbihcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5XG4gICAgICAgIChtb2R1bGUpID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgd2FzbSA9IG1vZHVsZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgaWYgKG9iamVjdFVybCkge1xuICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgZmFpbGVkIHRvIGluaXRpYWxpemVcbiAgICAgICAgKHdoYXQpID0+IHtcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3Qod2hhdCk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0pLFxuICApO1xuXG4gIGF3YWl0IFByb21pc2UucmFjZSh0YXNrcyk7XG5cbiAgaWYgKGlzVGltZW91dCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgV2ViQXNzZW1ibHkgYmFja2VuZCBpbml0aWFsaXppbmcgZmFpbGVkIGR1ZSB0byB0aW1lb3V0OiAke3RpbWVvdXR9bXNgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEluc3RhbmNlID0gKCk6IE9ydFdhc21Nb2R1bGUgPT4ge1xuICBpZiAoaW5pdGlhbGl6ZWQgJiYgd2FzbSkge1xuICAgIHJldHVybiB3YXNtO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBpcyBub3QgaW5pdGlhbGl6ZWQgeWV0LicpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpc3Bvc2UgPSAoKTogdm9pZCA9PiB7XG4gIGlmIChpbml0aWFsaXplZCAmJiAhaW5pdGlhbGl6aW5nICYmICFhYm9ydGVkKSB7XG4gICAgLy8gVE9ETzogY3VycmVudGx5IFwiUFRocmVhZC50ZXJtaW5hdGVBbGxUaHJlYWRzKClcIiBpcyBub3QgZXhwb3NlZCBpbiB0aGUgd2FzbSBtb2R1bGUuXG4gICAgLy8gICAgICAgQW5kIHRoaXMgZnVuY3Rpb24gaXMgbm90IHlldCBjYWxsZWQgYnkgYW55IGNvZGUuXG4gICAgLy8gICAgICAgSWYgaXQgaXMgbmVlZGVkIGluIHRoZSBmdXR1cmUsIHdlIHNob3VsZCBleHBvc2UgaXQgaW4gdGhlIHdhc20gbW9kdWxlIGFuZCB1bmNvbW1lbnQgdGhlIGZvbGxvd2luZyBsaW5lLlxuXG4gICAgLy8gd2FzbT8uUFRocmVhZD8udGVybWluYXRlQWxsVGhyZWFkcygpO1xuICAgIHdhc20gPSB1bmRlZmluZWQ7XG5cbiAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIGFib3J0ZWQgPSB0cnVlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IGFsbG9jV2FzbVN0cmluZyA9IChkYXRhOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiBudW1iZXIgPT4ge1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBkYXRhTGVuZ3RoID0gd2FzbS5sZW5ndGhCeXRlc1VURjgoZGF0YSkgKyAxO1xuICBjb25zdCBkYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKGRhdGFMZW5ndGgpO1xuICB3YXNtLnN0cmluZ1RvVVRGOChkYXRhLCBkYXRhT2Zmc2V0LCBkYXRhTGVuZ3RoKTtcbiAgYWxsb2NzLnB1c2goZGF0YU9mZnNldCk7XG5cbiAgcmV0dXJuIGRhdGFPZmZzZXQ7XG59O1xuXG5pbnRlcmZhY2UgRXh0cmFPcHRpb25zSGFuZGxlciB7XG4gIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgaXRlcmF0ZUV4dHJhT3B0aW9ucyA9IChcbiAgb3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gIHByZWZpeDogc3RyaW5nLFxuICBzZWVuOiBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PixcbiAgaGFuZGxlcjogRXh0cmFPcHRpb25zSGFuZGxlcixcbik6IHZvaWQgPT4ge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xuICAgIGlmIChzZWVuLmhhcyhvcHRpb25zKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgaW4gb3B0aW9ucycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWVuLmFkZChvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBPYmplY3QuZW50cmllcyhvcHRpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBjb25zdCBuYW1lID0gcHJlZml4ID8gcHJlZml4ICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBuYW1lICsgJy4nLCBzZWVuLCBoYW5kbGVyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgaGFuZGxlcihuYW1lLCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlID8gJzEnIDogJzAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBoYW5kbGUgZXh0cmEgY29uZmlnIHR5cGU6ICR7dHlwZW9mIHZhbHVlfWApO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIGNoZWNrIHdlYiBhc3NlbWJseSBBUEkncyBsYXN0IGVycm9yIGFuZCB0aHJvdyBlcnJvciBpZiBhbnkgZXJyb3Igb2NjdXJyZWQuXG4gKiBAcGFyYW0gbWVzc2FnZSBhIG1lc3NhZ2UgdXNlZCB3aGVuIGFuIGVycm9yIG9jY3VycmVkLlxuICovXG5leHBvcnQgY29uc3QgY2hlY2tMYXN0RXJyb3IgPSAobWVzc2FnZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJhbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoOCk7XG4gICAgd2FzbS5fT3J0R2V0TGFzdEVycm9yKHBhcmFtc09mZnNldCwgcGFyYW1zT2Zmc2V0ICsgNCk7XG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5IRUFQMzJbcGFyYW1zT2Zmc2V0IC8gNF07XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlUG9pbnRlciA9IHdhc20uSEVBUFUzMltwYXJhbXNPZmZzZXQgLyA0ICsgMV07XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlUG9pbnRlciA/IHdhc20uVVRGOFRvU3RyaW5nKGVycm9yTWVzc2FnZVBvaW50ZXIpIDogJyc7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9IEVSUk9SX0NPREU6ICR7ZXJyb3JDb2RlfSwgRVJST1JfTUVTU0FHRTogJHtlcnJvck1lc3NhZ2V9YCk7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHsgZ2V0SW5zdGFuY2UgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBhbGxvY1dhc21TdHJpbmcsIGNoZWNrTGFzdEVycm9yLCBpdGVyYXRlRXh0cmFPcHRpb25zIH0gZnJvbSAnLi93YXNtLXV0aWxzJztcblxuZXhwb3J0IGNvbnN0IHNldFJ1bk9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcbiAgY29uc3QgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IHJ1bk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdHJ5IHtcbiAgICBpZiAob3B0aW9ucz8ubG9nU2V2ZXJpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPSAyOyAvLyBEZWZhdWx0IHRvIHdhcm5pbmdcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCAhPT0gJ251bWJlcicgfHxcbiAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCkgfHxcbiAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHxcbiAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA+IDRcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNlcnZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dTZXZlcml0eUxldmVsfWApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5sb2dWZXJib3NpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID0gMDsgLy8gRGVmYXVsdCB0byAwXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8udGVybWluYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJ1bk9wdGlvbnMudGVybWluYXRlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHRhZ0RhdGFPZmZzZXQgPSAwO1xuICAgIGlmIChvcHRpb25zPy50YWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFnRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhvcHRpb25zLnRhZywgYWxsb2NzKTtcbiAgICB9XG5cbiAgICBydW5PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlUnVuT3B0aW9ucyhcbiAgICAgIHJ1bk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCEsXG4gICAgICBydW5PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsISxcbiAgICAgICEhcnVuT3B0aW9ucy50ZXJtaW5hdGUhLFxuICAgICAgdGFnRGF0YU9mZnNldCxcbiAgICApO1xuICAgIGlmIChydW5PcHRpb25zSGFuZGxlID09PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNyZWF0ZSBydW4gb3B0aW9ucy5cIik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmV4dHJhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnMob3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRSdW5Db25maWdFbnRyeShydW5PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHJ1biBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3J1bk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIGFsbG9jcy5mb3JFYWNoKChhbGxvYykgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcbmltcG9ydCB7IGFsbG9jV2FzbVN0cmluZywgY2hlY2tMYXN0RXJyb3IsIGl0ZXJhdGVFeHRyYU9wdGlvbnMgfSBmcm9tICcuL3dhc20tdXRpbHMnO1xuXG5jb25zdCBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwgPSAoZ3JhcGhPcHRpbWl6YXRpb25MZXZlbDogc3RyaW5nIHwgdW5rbm93bik6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAoZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCkge1xuICAgIGNhc2UgJ2Rpc2FibGVkJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ2V4dGVuZGVkJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ2FsbCc6XG4gICAgICByZXR1cm4gOTk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZ3JhcGggb3B0aW1pemF0aW9uIGxldmVsOiAke2dyYXBoT3B0aW1pemF0aW9uTGV2ZWx9YCk7XG4gIH1cbn07XG5cbmNvbnN0IGdldEV4ZWN1dGlvbk1vZGUgPSAoZXhlY3V0aW9uTW9kZTogJ3NlcXVlbnRpYWwnIHwgJ3BhcmFsbGVsJyk6IG51bWJlciA9PiB7XG4gIHN3aXRjaCAoZXhlY3V0aW9uTW9kZSkge1xuICAgIGNhc2UgJ3NlcXVlbnRpYWwnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAncGFyYWxsZWwnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZXhlY3V0aW9uIG1vZGU6ICR7ZXhlY3V0aW9uTW9kZX1gKTtcbiAgfVxufTtcblxuY29uc3QgYXBwZW5kRGVmYXVsdE9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IHZvaWQgPT4ge1xuICBpZiAoIW9wdGlvbnMuZXh0cmEpIHtcbiAgICBvcHRpb25zLmV4dHJhID0ge307XG4gIH1cbiAgaWYgKCFvcHRpb25zLmV4dHJhLnNlc3Npb24pIHtcbiAgICBvcHRpb25zLmV4dHJhLnNlc3Npb24gPSB7fTtcbiAgfVxuICBjb25zdCBzZXNzaW9uID0gb3B0aW9ucy5leHRyYS5zZXNzaW9uIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGlmICghc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIHNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSA9ICcxJztcbiAgfVxuXG4gIC8vIGlmIHVzaW5nIEpTRVAgd2l0aCBXZWJHUFUsIGFsd2F5cyBkaXNhYmxlIG1lbW9yeSBwYXR0ZXJuXG4gIGlmIChcbiAgICBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyAmJlxuICAgIG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzLnNvbWUoKGVwKSA9PiAodHlwZW9mIGVwID09PSAnc3RyaW5nJyA/IGVwIDogZXAubmFtZSkgPT09ICd3ZWJncHUnKVxuICApIHtcbiAgICBvcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4gPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3Qgc2V0RXhlY3V0aW9uUHJvdmlkZXJzID0gKFxuICBzZXNzaW9uT3B0aW9uc0hhbmRsZTogbnVtYmVyLFxuICBleGVjdXRpb25Qcm92aWRlcnM6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uRXhlY3V0aW9uUHJvdmlkZXJDb25maWdbXSxcbiAgYWxsb2NzOiBudW1iZXJbXSxcbik6IHZvaWQgPT4ge1xuICBmb3IgKGNvbnN0IGVwIG9mIGV4ZWN1dGlvblByb3ZpZGVycykge1xuICAgIGxldCBlcE5hbWUgPSB0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lO1xuXG4gICAgLy8gY2hlY2sgRVAgbmFtZVxuICAgIHN3aXRjaCAoZXBOYW1lKSB7XG4gICAgICBjYXNlICd3ZWJubic6XG4gICAgICAgIGVwTmFtZSA9ICdXRUJOTic7XG4gICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3Qgd2Vibm5PcHRpb25zID0gZXAgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgIC8vIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XG4gICAgICAgICAgY29uc3QgZGV2aWNlVHlwZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8uZGV2aWNlVHlwZTtcbiAgICAgICAgICBpZiAoZGV2aWNlVHlwZSkge1xuICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygnZGV2aWNlVHlwZScsIGFsbG9jcyk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcoZGV2aWNlVHlwZSwgYWxsb2NzKTtcbiAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAnZGV2aWNlVHlwZScgLSAke2RldmljZVR5cGV9LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dlYmdwdSc6XG4gICAgICAgIGVwTmFtZSA9ICdKUyc7XG4gICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3Qgd2ViZ3B1T3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViR3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XG4gICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnM/LnByZWZlcnJlZExheW91dCkge1xuICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkNIVycgJiYgd2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgIT09ICdOSFdDJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHByZWZlcnJlZExheW91dCBtdXN0IGJlIGVpdGhlciAnTkNIVycgb3IgJ05IV0MnOiAke3dlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygncHJlZmVycmVkTGF5b3V0JywgYWxsb2NzKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyh3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCwgYWxsb2NzKTtcbiAgICAgICAgICAgIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAncHJlZmVycmVkTGF5b3V0JyAtICR7d2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXR9LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dhc20nOlxuICAgICAgY2FzZSAnY3B1JzpcbiAgICAgICAgY29udGludWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZXhlY3V0aW9uIHByb3ZpZGVyOiAke2VwTmFtZX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBlcE5hbWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGVwTmFtZSwgYWxsb2NzKTtcbiAgICBpZiAoZ2V0SW5zdGFuY2UoKS5fT3J0QXBwZW5kRXhlY3V0aW9uUHJvdmlkZXIoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGVwTmFtZURhdGFPZmZzZXQpICE9PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYXBwZW5kIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9LmApO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNldFNlc3Npb25PcHRpb25zID0gKG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogW251bWJlciwgbnVtYmVyW11dID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGNvbnN0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBzZXNzaW9uT3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGFwcGVuZERlZmF1bHRPcHRpb25zKHNlc3Npb25PcHRpb25zKTtcblxuICB0cnkge1xuICAgIGNvbnN0IGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPSBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwoc2Vzc2lvbk9wdGlvbnMuZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCA/PyAnYWxsJyk7XG4gICAgY29uc3QgZXhlY3V0aW9uTW9kZSA9IGdldEV4ZWN1dGlvbk1vZGUoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uTW9kZSA/PyAnc2VxdWVudGlhbCcpO1xuICAgIGNvbnN0IGxvZ0lkRGF0YU9mZnNldCA9XG4gICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMubG9nSWQgPT09ICdzdHJpbmcnID8gYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLmxvZ0lkLCBhbGxvY3MpIDogMDtcblxuICAgIGNvbnN0IGxvZ1NldmVyaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID8/IDI7IC8vIERlZmF1bHQgdG8gMiAtIHdhcm5pbmdcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nU2V2ZXJpdHlMZXZlbCkgfHwgbG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHwgbG9nU2V2ZXJpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHNlcnZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nU2V2ZXJpdHlMZXZlbH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dWZXJib3NpdHlMZXZlbCA9IHNlc3Npb25PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID8/IDA7IC8vIERlZmF1bHQgdG8gMCAtIHZlcmJvc2VcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nVmVyYm9zaXR5TGV2ZWwpIHx8IGxvZ1ZlcmJvc2l0eUxldmVsIDwgMCB8fCBsb2dWZXJib3NpdHlMZXZlbCA+IDQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nVmVyYm9zaXR5TGV2ZWx9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCA9XG4gICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCwgYWxsb2NzKVxuICAgICAgICA6IDA7XG5cbiAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZVNlc3Npb25PcHRpb25zKFxuICAgICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCxcbiAgICAgICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlQ3B1TWVtQXJlbmEsXG4gICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4sXG4gICAgICBleGVjdXRpb25Nb2RlLFxuICAgICAgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVQcm9maWxpbmcsXG4gICAgICAwLFxuICAgICAgbG9nSWREYXRhT2Zmc2V0LFxuICAgICAgbG9nU2V2ZXJpdHlMZXZlbCxcbiAgICAgIGxvZ1ZlcmJvc2l0eUxldmVsLFxuICAgICAgb3B0aW1pemVkTW9kZWxGaWxlUGF0aE9mZnNldCxcbiAgICApO1xuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjcmVhdGUgc2Vzc2lvbiBvcHRpb25zLlwiKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzKSB7XG4gICAgICBzZXRFeGVjdXRpb25Qcm92aWRlcnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycywgYWxsb2NzKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBlbmFibGVHcmFwaENhcHR1cmUgbXVzdCBiZSBhIGJvb2xlYW4gdmFsdWU6ICR7c2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlfWApO1xuICAgICAgfVxuICAgICAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZygnZW5hYmxlR3JhcGhDYXB0dXJlJywgYWxsb2NzKTtcbiAgICAgIGNvbnN0IHZhbHVlRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmUudG9TdHJpbmcoKSwgYWxsb2NzKTtcbiAgICAgIGlmICh3YXNtLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXG4gICAgICAgICAgYENhbid0IHNldCBhIHNlc3Npb24gY29uZmlnIGVudHJ5OiAnZW5hYmxlR3JhcGhDYXB0dXJlJyAtICR7c2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlfS5gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2Vzc2lvbk9wdGlvbnMuZnJlZURpbWVuc2lvbk92ZXJyaWRlcykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nOiAke25hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIodmFsdWUpIHx8IHZhbHVlIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgdmFsdWUgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyOiAke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcobmFtZSwgYWxsb2NzKTtcbiAgICAgICAgaWYgKHdhc20uX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZShzZXNzaW9uT3B0aW9uc0hhbmRsZSwgbmFtZU9mZnNldCwgdmFsdWUpICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IHNldCBhIGZyZWUgZGltZW5zaW9uIG92ZXJyaWRlOiAke25hbWV9IC0gJHt2YWx1ZX0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXh0cmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyhzZXNzaW9uT3B0aW9ucy5leHRyYSwgJycsIG5ldyBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PigpLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcbiAgICAgICAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xuXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgc2Vzc2lvbiBjb25maWcgZW50cnk6ICR7a2V5fSAtICR7dmFsdWV9LmApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XG4gICAgICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpO1xuICAgIH1cbiAgICBhbGxvY3MuZm9yRWFjaCgoYWxsb2MpID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG4vLyBhIGR1bW15IHR5cGUgZGVjbGFyYXRpb24gZm9yIEZsb2F0MTZBcnJheSBpbiBjYXNlIGFueSBwb2x5ZmlsbCBpcyBhdmFpbGFibGUuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgY29uc3QgRmxvYXQxNkFycmF5OiBhbnk7XG59XG5cbi8vIFRoaXMgZmlsZSBpbmNsdWRlcyBjb21tb24gZGVmaW5pdGlvbnMuIFRoZXkgZG8gTk9UIGhhdmUgZGVwZW5kZW5jeSBvbiB0aGUgV2ViQXNzZW1ibHkgaW5zdGFuY2UuXG5cbi8qKlxuICogQ29waWVkIGZyb20gT05OWCBkZWZpbml0aW9uLiBVc2UgdGhpcyB0byBkcm9wIGRlcGVuZGVuY3kgJ29ubnhfcHJvdG8nIHRvIGRlY3JlYXNlIGNvbXBpbGVkIC5qcyBmaWxlIHNpemUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIERhdGFUeXBlIHtcbiAgdW5kZWZpbmVkID0gMCxcbiAgZmxvYXQgPSAxLFxuICB1aW50OCA9IDIsXG4gIGludDggPSAzLFxuICB1aW50MTYgPSA0LFxuICBpbnQxNiA9IDUsXG4gIGludDMyID0gNixcbiAgaW50NjQgPSA3LFxuICBzdHJpbmcgPSA4LFxuICBib29sID0gOSxcbiAgZmxvYXQxNiA9IDEwLFxuICBkb3VibGUgPSAxMSxcbiAgdWludDMyID0gMTIsXG4gIHVpbnQ2NCA9IDEzLFxuICBjb21wbGV4NjQgPSAxNCxcbiAgY29tcGxleDEyOCA9IDE1LFxuICBiZmxvYXQxNiA9IDE2LFxuXG4gIC8vIDQtYml0IGRhdGEtdHlwZXNcbiAgdWludDQgPSAyMSxcbiAgaW50NCA9IDIyLFxufVxuXG4vKipcbiAqIE1hcCBzdHJpbmcgdGVuc29yIGRhdGEgdG8gZW51bSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0gPSAodHlwZTogc3RyaW5nKTogRGF0YVR5cGUgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdpbnQ4JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ4O1xuICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50ODtcbiAgICBjYXNlICdib29sJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5ib29sO1xuICAgIGNhc2UgJ2ludDE2JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQxNjtcbiAgICBjYXNlICd1aW50MTYnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQxNjtcbiAgICBjYXNlICdpbnQzMic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MzI7XG4gICAgY2FzZSAndWludDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MzI7XG4gICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICByZXR1cm4gRGF0YVR5cGUuZmxvYXQxNjtcbiAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5mbG9hdDtcbiAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5kb3VibGU7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiBEYXRhVHlwZS5zdHJpbmc7XG4gICAgY2FzZSAnaW50NjQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDY0O1xuICAgIGNhc2UgJ3VpbnQ2NCc6XG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDY0O1xuICAgIGNhc2UgJ2ludDQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDQ7XG4gICAgY2FzZSAndWludDQnOlxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ0O1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGVudW0gdmFsdWUgdG8gc3RyaW5nIHRlbnNvciBkYXRhXG4gKi9cbmV4cG9ydCBjb25zdCB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyA9ICh0eXBlUHJvdG86IERhdGFUeXBlKTogVGVuc29yLlR5cGUgPT4ge1xuICBzd2l0Y2ggKHR5cGVQcm90bykge1xuICAgIGNhc2UgRGF0YVR5cGUuaW50ODpcbiAgICAgIHJldHVybiAnaW50OCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50ODpcbiAgICAgIHJldHVybiAndWludDgnO1xuICAgIGNhc2UgRGF0YVR5cGUuYm9vbDpcbiAgICAgIHJldHVybiAnYm9vbCc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQxNjpcbiAgICAgIHJldHVybiAnaW50MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUudWludDE2OlxuICAgICAgcmV0dXJuICd1aW50MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUuaW50MzI6XG4gICAgICByZXR1cm4gJ2ludDMyJztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQzMjpcbiAgICAgIHJldHVybiAndWludDMyJztcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0MTY6XG4gICAgICByZXR1cm4gJ2Zsb2F0MTYnO1xuICAgIGNhc2UgRGF0YVR5cGUuZmxvYXQ6XG4gICAgICByZXR1cm4gJ2Zsb2F0MzInO1xuICAgIGNhc2UgRGF0YVR5cGUuZG91YmxlOlxuICAgICAgcmV0dXJuICdmbG9hdDY0JztcbiAgICBjYXNlIERhdGFUeXBlLnN0cmluZzpcbiAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICBjYXNlIERhdGFUeXBlLmludDY0OlxuICAgICAgcmV0dXJuICdpbnQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS51aW50NjQ6XG4gICAgICByZXR1cm4gJ3VpbnQ2NCc7XG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ0OlxuICAgICAgcmV0dXJuICdpbnQ0JztcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ0OlxuICAgICAgcmV0dXJuICd1aW50NCc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZVByb3RvfWApO1xuICB9XG59O1xuXG4vKipcbiAqIGdldCB0ZW5zb3Igc2l6ZSBpbiBieXRlcyBieSB0aGUgZ2l2ZW4gZGF0YSB0eXBlIGFuZCBkaW1lbnNpb25zXG4gKiBAcmV0dXJucyBzaXplIGluIGludGVnZXIgb3IgdW5kZWZpbmVkIGlmIHRoZSBkYXRhIHR5cGUgaXMgbm90IHN1cHBvcnRlZFxuICovXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXMgPSAoXG4gIGRhdGVUeXBlOiBudW1iZXIsXG4gIGRpbXNPclNpemU6IHJlYWRvbmx5IG51bWJlcltdIHwgbnVtYmVyLFxuKTogbnVtYmVyIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgZWxlbWVudFNpemUgPSBbXG4gICAgLTEsIC8vIHVuZGVmaW5lZCA9IDBcbiAgICA0LCAvLyBmbG9hdCA9IDFcbiAgICAxLCAvLyB1aW50OCA9IDJcbiAgICAxLCAvLyBpbnQ4ID0gM1xuICAgIDIsIC8vIHVpbnQxNiA9IDRcbiAgICAyLCAvLyBpbnQxNiA9IDVcbiAgICA0LCAvLyBpbnQzMiA9IDZcbiAgICA4LCAvLyBpbnQ2NCA9IDdcbiAgICAtMSwgLy8gc3RyaW5nID0gOFxuICAgIDEsIC8vIGJvb2wgPSA5XG4gICAgMiwgLy8gZmxvYXQxNiA9IDEwXG4gICAgOCwgLy8gZG91YmxlID0gMTFcbiAgICA0LCAvLyB1aW50MzIgPSAxMlxuICAgIDgsIC8vIHVpbnQ2NCA9IDEzXG4gICAgLTEsIC8vIGNvbXBsZXg2NCA9IDE0XG4gICAgLTEsIC8vIGNvbXBsZXgxMjggPSAxNVxuICAgIC0xLCAvLyBiZmxvYXQxNiA9IDE2XG4gICAgLTEsIC8vIEZMT0FUOEU0TTNGTiA9IDE3XG4gICAgLTEsIC8vIEZMT0FUOEU0TTNGTlVaID0gMThcbiAgICAtMSwgLy8gRkxPQVQ4RTVNMiA9IDE5XG4gICAgLTEsIC8vIEZMT0FUOEU1TTJGTlVaID0gMjBcbiAgICAwLjUsIC8vIHVpbnQ0ID0gMjFcbiAgICAwLjUsIC8vIGludDQgPSAyMlxuICBdW2RhdGVUeXBlXTtcblxuICBjb25zdCBzaXplID0gdHlwZW9mIGRpbXNPclNpemUgPT09ICdudW1iZXInID8gZGltc09yU2l6ZSA6IGRpbXNPclNpemUucmVkdWNlKChhLCBiKSA9PiBhICogYiwgMSk7XG4gIHJldHVybiBlbGVtZW50U2l6ZSA+IDAgPyBNYXRoLmNlaWwoc2l6ZSAqIGVsZW1lbnRTaXplKSA6IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogZ2V0IHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yIGJ5IHRoZSBnaXZlbiB0ZW5zb3IgdHlwZVxuICovXG5leHBvcnQgY29uc3QgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gKFxuICB0eXBlOiBUZW5zb3IuVHlwZSxcbik6XG4gIHwgRmxvYXQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQ4QXJyYXlDb25zdHJ1Y3RvclxuICB8IFVpbnQxNkFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQxNkFycmF5Q29uc3RydWN0b3JcbiAgfCBJbnQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3JcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcbiAgfCBGbG9hdDY0QXJyYXlDb25zdHJ1Y3RvclxuICB8IFVpbnQzMkFycmF5Q29uc3RydWN0b3JcbiAgfCBCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnZmxvYXQxNic6XG4gICAgICAvLyBhbGxvdyBGbG9hdDE2QXJyYXkgcG9seWZpbGwuXG4gICAgICByZXR1cm4gdHlwZW9mIEZsb2F0MTZBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgRmxvYXQxNkFycmF5LmZyb20gPyBGbG9hdDE2QXJyYXkgOiBVaW50MTZBcnJheTtcbiAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgIHJldHVybiBGbG9hdDMyQXJyYXk7XG4gICAgY2FzZSAndWludDgnOlxuICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XG4gICAgY2FzZSAnaW50OCc6XG4gICAgICByZXR1cm4gSW50OEFycmF5O1xuICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICByZXR1cm4gVWludDE2QXJyYXk7XG4gICAgY2FzZSAnaW50MTYnOlxuICAgICAgcmV0dXJuIEludDE2QXJyYXk7XG4gICAgY2FzZSAnaW50MzInOlxuICAgICAgcmV0dXJuIEludDMyQXJyYXk7XG4gICAgY2FzZSAnYm9vbCc6XG4gICAgICByZXR1cm4gVWludDhBcnJheTtcbiAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgIHJldHVybiBGbG9hdDY0QXJyYXk7XG4gICAgY2FzZSAndWludDMyJzpcbiAgICAgIHJldHVybiBVaW50MzJBcnJheTtcbiAgICBjYXNlICdpbnQ2NCc6XG4gICAgICByZXR1cm4gQmlnSW50NjRBcnJheTtcbiAgICBjYXNlICd1aW50NjQnOlxuICAgICAgcmV0dXJuIEJpZ1VpbnQ2NEFycmF5O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGU6ICR7dHlwZX1gKTtcbiAgfVxufTtcblxuLyoqXG4gKiBNYXAgc3RyaW5nIGxvZyBsZXZlbCB0byBpbnRlZ2VyIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBsb2dMZXZlbFN0cmluZ1RvRW51bSA9IChsb2dMZXZlbD86ICd2ZXJib3NlJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdlcnJvcicgfCAnZmF0YWwnKTogbnVtYmVyID0+IHtcbiAgc3dpdGNoIChsb2dMZXZlbCkge1xuICAgIGNhc2UgJ3ZlcmJvc2UnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgIHJldHVybiAyO1xuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2ZhdGFsJzpcbiAgICAgIHJldHVybiA0O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7bG9nTGV2ZWx9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGVuc29yIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IEdQVSBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSA9ICh0eXBlOiBUZW5zb3IuVHlwZSk6IHR5cGUgaXMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcyA9PlxuICB0eXBlID09PSAnZmxvYXQzMicgfHxcbiAgdHlwZSA9PT0gJ2Zsb2F0MTYnIHx8XG4gIHR5cGUgPT09ICdpbnQzMicgfHxcbiAgdHlwZSA9PT0gJ2ludDY0JyB8fFxuICB0eXBlID09PSAndWludDMyJyB8fFxuICB0eXBlID09PSAndWludDgnIHx8XG4gIHR5cGUgPT09ICdib29sJyB8fFxuICB0eXBlID09PSAndWludDQnIHx8XG4gIHR5cGUgPT09ICdpbnQ0JztcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBnaXZlbiB0ZW5zb3IgdHlwZSBpcyBzdXBwb3J0ZWQgYnkgV2ViTk4gTUxUZW5zb3JcbiAqL1xuZXhwb3J0IGNvbnN0IGlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlID0gKHR5cGU6IFRlbnNvci5UeXBlKTogdHlwZSBpcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMgPT5cbiAgdHlwZSA9PT0gJ2Zsb2F0MzInIHx8XG4gIHR5cGUgPT09ICdmbG9hdDE2JyB8fFxuICB0eXBlID09PSAnaW50MzInIHx8XG4gIHR5cGUgPT09ICdpbnQ2NCcgfHxcbiAgdHlwZSA9PT0gJ3VpbnQzMicgfHxcbiAgdHlwZSA9PT0gJ3VpbnQ2NCcgfHxcbiAgdHlwZSA9PT0gJ2ludDgnIHx8XG4gIHR5cGUgPT09ICd1aW50OCcgfHxcbiAgdHlwZSA9PT0gJ2Jvb2wnO1xuXG4vKipcbiAqIE1hcCBzdHJpbmcgZGF0YSBsb2NhdGlvbiB0byBpbnRlZ2VyIHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0gPSAobG9jYXRpb246IFRlbnNvci5EYXRhTG9jYXRpb24pOiBudW1iZXIgPT4ge1xuICBzd2l0Y2ggKGxvY2F0aW9uKSB7XG4gICAgY2FzZSAnbm9uZSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSAnY3B1LXBpbm5lZCc6XG4gICAgICByZXR1cm4gMjtcbiAgICBjYXNlICd0ZXh0dXJlJzpcbiAgICAgIHJldHVybiAzO1xuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxuICAgICAgcmV0dXJuIDQ7XG4gICAgY2FzZSAnbWwtdGVuc29yJzpcbiAgICAgIHJldHVybiA1O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGRhdGEgbG9jYXRpb246ICR7bG9jYXRpb259YCk7XG4gIH1cbn07XG5cbi8qKlxuICogTWFwIGludGVnZXIgZGF0YSBsb2NhdGlvbiB0byBzdHJpbmcgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvbkVudW1Ub1N0cmluZyA9IChsb2NhdGlvbjogbnVtYmVyKTogVGVuc29yLkRhdGFMb2NhdGlvbiB8IHVuZGVmaW5lZCA9PlxuICAoWydub25lJywgJ2NwdScsICdjcHUtcGlubmVkJywgJ3RleHR1cmUnLCAnZ3B1LWJ1ZmZlcicsICdtbC10ZW5zb3InXSBhcyBjb25zdClbbG9jYXRpb25dO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBpc05vZGUgfSBmcm9tICcuL3dhc20tdXRpbHMtZW52JztcblxuLyoqXG4gKiBMb2FkIGEgZmlsZSBpbnRvIGEgVWludDhBcnJheS5cbiAqXG4gKiBAcGFyYW0gZmlsZSAtIHRoZSBmaWxlIHRvIGxvYWQuIENhbiBiZSBhIFVSTC9wYXRoLCBhIEJsb2IsIGFuIEFycmF5QnVmZmVyLCBvciBhIFVpbnQ4QXJyYXkuXG4gKiBAcmV0dXJucyBhIFVpbnQ4QXJyYXkgY29udGFpbmluZyB0aGUgZmlsZSBkYXRhLlxuICovXG5leHBvcnQgY29uc3QgbG9hZEZpbGUgPSBhc3luYyAoZmlsZTogc3RyaW5nIHwgQmxvYiB8IEFycmF5QnVmZmVyTGlrZSB8IFVpbnQ4QXJyYXkpOiBQcm9taXNlPFVpbnQ4QXJyYXk+ID0+IHtcbiAgaWYgKHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJykge1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIC8vIGxvYWQgZmlsZSBpbnRvIEFycmF5QnVmZmVyIGluIE5vZGUuanNcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgcmVhZEZpbGUgfSA9IHJlcXVpcmUoJ25vZGU6ZnMvcHJvbWlzZXMnKTtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IHJlYWRGaWxlKGZpbGUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VSUl9GU19GSUxFX1RPT19MQVJHRScpIHtcbiAgICAgICAgICAvLyBmaWxlIGlzIHRvbyBsYXJnZSwgdXNlIGZzLmNyZWF0ZVJlYWRTdHJlYW0gaW5zdGVhZFxuICAgICAgICAgIGNvbnN0IHsgY3JlYXRlUmVhZFN0cmVhbSB9ID0gcmVxdWlyZSgnbm9kZTpmcycpO1xuICAgICAgICAgIGNvbnN0IHN0cmVhbSA9IGNyZWF0ZVJlYWRTdHJlYW0oZmlsZSk7XG4gICAgICAgICAgY29uc3QgY2h1bmtzOiBVaW50OEFycmF5W10gPSBbXTtcbiAgICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHN0cmVhbSkge1xuICAgICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoQnVmZmVyLmNvbmNhdChjaHVua3MpKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBsb2FkIGZpbGUgaW50byBBcnJheUJ1ZmZlciBpbiBicm93c2Vyc1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChmaWxlKTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gbG9hZCBleHRlcm5hbCBkYXRhIGZpbGU6ICR7ZmlsZX1gKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGhIZWFkZXIgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1MZW5ndGgnKTtcbiAgICAgIGNvbnN0IGZpbGVTaXplID0gY29udGVudExlbmd0aEhlYWRlciA/IHBhcnNlSW50KGNvbnRlbnRMZW5ndGhIZWFkZXIsIDEwKSA6IDA7XG4gICAgICBpZiAoZmlsZVNpemUgPCAxMDczNzQxODI0IC8qIDFHQiAqLykge1xuICAgICAgICAvLyB3aGVuIENvbnRlbnQtTGVuZ3RoIGhlYWRlciBpcyBub3Qgc2V0LCB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBmaWxlIHNpemUuIFdlIGFzc3VtZSBpdCBpcyBzbWFsbCBlbm91Z2ggdG9cbiAgICAgICAgLy8gbG9hZCBpbnRvIG1lbW9yeS5cbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZmlsZSBpcyB0b28gbGFyZ2UsIHVzZSBzdHJlYW0gaW5zdGVhZFxuICAgICAgICBpZiAoIXJlc3BvbnNlLmJvZHkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZhaWxlZCB0byBsb2FkIGV4dGVybmFsIGRhdGEgZmlsZTogJHtmaWxlfSwgbm8gcmVzcG9uc2UgYm9keS5gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWFkZXIgPSByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpO1xuXG4gICAgICAgIGxldCBidWZmZXI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gdHJ5IHRvIGNyZWF0ZSBBcnJheUJ1ZmZlciBkaXJlY3RseVxuICAgICAgICAgIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihmaWxlU2l6ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFJhbmdlRXJyb3IpIHtcbiAgICAgICAgICAgIC8vIHVzZSBXZWJBc3NlbWJseSBNZW1vcnkgdG8gYWxsb2NhdGUgbGFyZ2VyIEFycmF5QnVmZmVyXG4gICAgICAgICAgICBjb25zdCBwYWdlcyA9IE1hdGguY2VpbChmaWxlU2l6ZSAvIDY1NTM2KTtcbiAgICAgICAgICAgIGJ1ZmZlciA9IG5ldyBXZWJBc3NlbWJseS5NZW1vcnkoeyBpbml0aWFsOiBwYWdlcywgbWF4aW11bTogcGFnZXMgfSkuYnVmZmVyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgY29uc3QgY2h1bmsgPSBuZXcgVWludDhBcnJheShidWZmZXIsIG9mZnNldCwgY2h1bmtTaXplKTtcbiAgICAgICAgICBjaHVuay5zZXQodmFsdWUpO1xuICAgICAgICAgIG9mZnNldCArPSBjaHVua1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgMCwgZmlsZVNpemUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChmaWxlIGluc3RhbmNlb2YgQmxvYikge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShhd2FpdCBmaWxlLmFycmF5QnVmZmVyKCkpO1xuICB9IGVsc2UgaWYgKGZpbGUgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgcmV0dXJuIGZpbGU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGZpbGUpO1xuICB9XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBXZWJOTiBBUEkgY3VycmVudGx5IGRvZXMgbm90IGhhdmUgYSBUeXBlU2NyaXB0IGRlZmluaXRpb24gZmlsZS4gVGhpcyBmaWxlIGlzIGEgd29ya2Fyb3VuZCB3aXRoIHR5cGVzIGdlbmVyYXRlZCBmcm9tXG4vLyBXZWJOTiBBUEkgc3BlY2lmaWNhdGlvbi5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJtYWNoaW5lbGVhcm5pbmcvd2Vibm4vaXNzdWVzLzY3N1xuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImpzZXAvd2Vibm4vd2Vibm4uZC50c1wiIC8+XG5cbmltcG9ydCB7IEVudiwgSW5mZXJlbmNlU2Vzc2lvbiwgVGVuc29yIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcblxuaW1wb3J0IHtcbiAgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsXG4gIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSxcbiAgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEsXG4gIFRlbnNvck1ldGFkYXRhLFxufSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCB7IHNldFJ1bk9wdGlvbnMgfSBmcm9tICcuL3J1bi1vcHRpb25zJztcbmltcG9ydCB7IHNldFNlc3Npb25PcHRpb25zIH0gZnJvbSAnLi9zZXNzaW9uLW9wdGlvbnMnO1xuaW1wb3J0IHtcbiAgY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXMsXG4gIGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bSxcbiAgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlLFxuICBpc01MVGVuc29yU3VwcG9ydGVkVHlwZSxcbiAgbG9nTGV2ZWxTdHJpbmdUb0VudW0sXG4gIHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nLFxuICB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bSxcbiAgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yLFxufSBmcm9tICcuL3dhc20tY29tbW9uJztcbmltcG9ydCB7IGdldEluc3RhbmNlIH0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xuaW1wb3J0IHsgYWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciB9IGZyb20gJy4vd2FzbS11dGlscyc7XG5pbXBvcnQgeyBsb2FkRmlsZSB9IGZyb20gJy4vd2FzbS11dGlscy1sb2FkLWZpbGUnO1xuXG4vLyAjcmVnaW9uIEluaXRpYWxpemF0aW9uc1xuXG4vKipcbiAqIFRoZXJlIGFyZSA0IGRpZmZlcmVudCBcImluaXRpYWxpemF0aW9uXCIgc3RlcHMgZm9yIE9SVC4gVGhleSBoYXBwZW4gaW4gZGlmZmVyZW50IHBsYWNlcyBhbmQgZGlmZmVyZW50IHRpbWUuXG4gKlxuICogMS4gSmF2YVNjcmlwdCBpbml0aWFsaXphdGlvbiBmb3Igb25ueHJ1bnRpbWUtY29tbW9uIGFuZCBvbm54cnVudGltZS13ZWIuXG4gKiAgICBUaGlzIGlzIHRoZSBmaXJzdCBpbml0aWFsaXphdGlvbiBzdGVwLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBjYWxscyBvbm54cnVudGltZS1jb21tb24ncyByZWdpc3RlckJhY2tlbmQoKVxuICogZnVuY3Rpb24gbXVsdGlwbGUgdGltZXMgdG8gcmVnaXN0ZXIgYWxsIHRoZSBhdmFpbGFibGUgYmFja2VuZHMuIFRoZSBiYWNrZW5kIHJlZ2lzdHJhdGlvbiBpcyB2ZXJ5IGZhc3QuIEl0IG9ubHlcbiAqIHJlZ2lzdGVycyB0aGUgYmFja2VuZCBuYW1lIHdpdGggdGhlIHVuaW5pdGlhbGl6ZWQgYmFja2VuZCBvYmplY3QuIE5vIGhlYXZ5IGluaXRpYWxpemF0aW9uIGlzIGRvbmUgaW4gdGhpcyBzdGVwLlxuICogICAgUmVmZXIgdG8gd2ViL2xpYi9pbmRleC50cyBmb3IgdGhlIGJhY2tlbmQgcmVnaXN0cmF0aW9uLlxuICpcbiAqIDIuIFdlYkFzc2VtYmx5IGFydGlmYWN0IGluaXRpYWxpemF0aW9uLlxuICogICAgVGhpcyBoYXBwZW5zIHdoZW4gYW55IHJlZ2lzdGVyZWQgd2FzbSBiYWNrZW5kIGlzIHVzZWQgZm9yIHRoZSBmaXJzdCB0aW1lIChpZS4gYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBpc1xuICogY2FsbGVkKS4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgZG9lcyB0aGUgZm9sbG93aW5nczpcbiAqICAgICAtIGNyZWF0ZSBhIHByb3h5IHdvcmtlciBhbmQgbWFrZSBzdXJlIHRoZSBwcm94eSB3b3JrZXIgaXMgcmVhZHkgdG8gcmVjZWl2ZSBtZXNzYWdlcywgaWYgcHJveHkgaXMgZW5hYmxlZC5cbiAqICAgICAtIHBlcmZvcm0gZmVhdHVyZSBkZXRlY3Rpb24sIGxvY2F0ZSBjb3JyZWN0IFdlYkFzc2VtYmx5IGFydGlmYWN0IHBhdGggYW5kIGNhbGwgdGhlIEVtc2NyaXB0ZW4gZ2VuZXJhdGVkXG4gKiBKYXZhU2NyaXB0IGNvZGUgdG8gaW5pdGlhbGl6ZSB0aGUgV2ViQXNzZW1ibHkgcnVudGltZS5cbiAqICAgICAgICAgLSBpZiBwcm94eSBpcyBlbmFibGVkLCB0aGlzIHN0ZXAgaGFwcGVucyBpbiB0aGUgcHJveHkgd29ya2VyIHVzaW5nIG1lc3NhZ2UgJ2luaXQtd2FzbScuXG4gKiAgICAgICAgIC0gZG93bmxvYWRpbmcgdGhlICdvcnQtd2FzbXsuLi59Lndhc20nIGZpbGUgaXMgZG9uZSBpbiB0aGlzIHN0ZXAuXG4gKiAgICAgICAgIC0gaWYgbXVsdGktdGhyZWFkIGlzIGVuYWJsZWQsIG9uZSBvciBtb3JlIHdlYndvcmtlciB3aWxsIGJlIGNyZWF0ZWQgdG8gaW5pdGlhbGl6ZSB0aGUgUFRocmVhZCB0aHJlYWRwb29sLlxuICpcbiAqIDMuIE9SVCBlbnZpcm9ubWVudCBpbml0aWFsaXphdGlvbi5cbiAqICAgIFRoaXMgaGFwcGVucyBhZnRlciBzdGVwIDIuIEluIHRoaXMgc3RlcCwgb25ueHJ1bnRpbWUtd2ViIHBlcmZvcm1zIE9OTlggUnVudGltZSBlbnZpcm9ubWVudCBpbml0aWFsaXphdGlvbi5cbiAqIEZ1bmN0aW9uIGBfT3J0SW5pdCgpYCBpcyBjYWxsZWQgaW4gdGhpcyBzdGVwLlxuICogICAgIC0gaWYgcHJveHkgaXMgZW5hYmxlZCwgdGhpcyBzdGVwIGhhcHBlbnMgaW4gdGhlIHByb3h5IHdvcmtlciB1c2luZyBtZXNzYWdlICdpbml0LW9ydCcuXG4gKiAgICAgLSBsb2dnaW5nIGxldmVsIChvcnQuZW52LmxvZ0xldmVsKSBhbmQgdGhyZWFkIG51bWJlciAob3J0LmVudi53YXNtLm51bVRocmVhZHMpIGFyZSBzZXQgaW4gdGhpcyBzdGVwLlxuICpcbiAqIDQuIFNlc3Npb24gaW5pdGlhbGl6YXRpb24uXG4gKiAgICBUaGlzIGhhcHBlbnMgd2hlbiBgb3J0LkluZmVyZW5jZVNlc3Npb24uY3JlYXRlKClgIGlzIGNhbGxlZC4gVW5saWtlIHRoZSBmaXJzdCAzIHN0ZXBzICh0aGV5IG9ubHkgY2FsbGVkIG9uY2UpLFxuICogdGhpcyBzdGVwIHdpbGwgYmUgZG9uZSBmb3IgZWFjaCBzZXNzaW9uLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBkb2VzIHRoZSBmb2xsb3dpbmdzOlxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVSTDpcbiAqICAgIC0gZG93bmxvYWQgdGhlIG1vZGVsIGRhdGEgZnJvbSB0aGUgVVJMLlxuICogICAgLSBjb3B5IHRoZSBtb2RlbCBkYXRhIHRvIHRoZSBXQVNNIGhlYXAuIChwcm94eTogJ2NvcHktZnJvbScpXG4gKiAgICAtIGRlcmVmZXJlbmNlIHRoZSBtb2RlbCBidWZmZXIuIFRoaXMgc3RlcCBhbGxvd3MgdGhlIG9yaWdpbmFsIEFycmF5QnVmZmVyIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxuICogICAgLSBjYWxsIGBfT3J0Q3JlYXRlU2Vzc2lvbigpYCB0byBjcmVhdGUgdGhlIHNlc3Npb24uIChwcm94eTogJ2NyZWF0ZScpXG4gKlxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVpbnQ4QXJyYXkgb2JqZWN0OlxuICogICAgLSBjb3B5IHRoZSBtb2RlbCBkYXRhIHRvIHRoZSBXQVNNIGhlYXAuIChwcm94eTogJ2NvcHktZnJvbScpXG4gKiAgICAtIGNhbGwgYF9PcnRDcmVhdGVTZXNzaW9uKClgIHRvIGNyZWF0ZSB0aGUgc2Vzc2lvbi4gKHByb3h5OiAnY3JlYXRlJylcbiAqXG4gKlxuICovXG5cbi8qKlxuICogaW5pdGlhbGl6ZSBPUlQgZW52aXJvbm1lbnQuXG4gKlxuICogQHBhcmFtIG51bVRocmVhZHMgU2V0R2xvYmFsSW50cmFPcE51bVRocmVhZHMobnVtVGhyZWFkcylcbiAqIEBwYXJhbSBsb2dnaW5nTGV2ZWwgQ3JlYXRlRW52KHN0YXRpY19jYXN0PE9ydExvZ2dpbmdMZXZlbD4obG9nZ2luZ19sZXZlbCkpXG4gKi9cbmNvbnN0IGluaXRPcnQgPSAobnVtVGhyZWFkczogbnVtYmVyLCBsb2dnaW5nTGV2ZWw6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCBlcnJvckNvZGUgPSBnZXRJbnN0YW5jZSgpLl9PcnRJbml0KG51bVRocmVhZHMsIGxvZ2dpbmdMZXZlbCk7XG4gIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGluaXRpYWxpemUgb25ueHJ1bnRpbWUuXCIpO1xuICB9XG59O1xuXG4vKipcbiAqIGluaXRpYWxpemUgcnVudGltZSBlbnZpcm9ubWVudC5cbiAqIEBwYXJhbSBlbnYgcGFzc2VkIGluIHRoZSBlbnZpcm9ubWVudCBjb25maWcgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgaW5pdFJ1bnRpbWUgPSBhc3luYyAoZW52OiBFbnYpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgLy8gaW5pdCBPUlRcbiAgaW5pdE9ydChlbnYud2FzbS5udW1UaHJlYWRzISwgbG9nTGV2ZWxTdHJpbmdUb0VudW0oZW52LmxvZ0xldmVsKSk7XG59O1xuXG4vKipcbiAqIHBlcmZvcm0gRVAgc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24uXG4gKlxuICogQHBhcmFtIGVudlxuICogQHBhcmFtIGVwTmFtZVxuICovXG5leHBvcnQgY29uc3QgaW5pdEVwID0gYXN5bmMgKGVudjogRW52LCBlcE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbiAgICBjb25zdCBpbml0SnNlcCA9IHJlcXVpcmUoJy4vanNlcC9pbml0JykuaW5pdDtcblxuICAgIGlmIChlcE5hbWUgPT09ICd3ZWJncHUnKSB7XG4gICAgICAvLyBwZXJmb3JtIFdlYkdQVSBhdmFpbGFiaWxpdHkgY2hlY2tcbiAgICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhbmF2aWdhdG9yLmdwdSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkdQVSBpcyBub3Qgc3VwcG9ydGVkIGluIGN1cnJlbnQgZW52aXJvbm1lbnQnKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGFkYXB0ZXIgPSBlbnYud2ViZ3B1LmFkYXB0ZXIgYXMgR1BVQWRhcHRlciB8IG51bGw7XG4gICAgICBpZiAoIWFkYXB0ZXIpIHtcbiAgICAgICAgLy8gaWYgYWRhcHRlciBpcyBub3Qgc2V0LCByZXF1ZXN0IGEgbmV3IGFkYXB0ZXIuXG4gICAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9IGVudi53ZWJncHUucG93ZXJQcmVmZXJlbmNlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcG93ZXJQcmVmZXJlbmNlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICBwb3dlclByZWZlcmVuY2UgIT09ICdsb3ctcG93ZXInICYmXG4gICAgICAgICAgcG93ZXJQcmVmZXJlbmNlICE9PSAnaGlnaC1wZXJmb3JtYW5jZSdcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBvd2VyUHJlZmVyZW5jZSBzZXR0aW5nOiBcIiR7cG93ZXJQcmVmZXJlbmNlfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9yY2VGYWxsYmFja0FkYXB0ZXIgPSBlbnYud2ViZ3B1LmZvcmNlRmFsbGJhY2tBZGFwdGVyO1xuICAgICAgICBpZiAoZm9yY2VGYWxsYmFja0FkYXB0ZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZm9yY2VGYWxsYmFja0FkYXB0ZXIgIT09ICdib29sZWFuJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBmb3JjZUZhbGxiYWNrQWRhcHRlciBzZXR0aW5nOiBcIiR7Zm9yY2VGYWxsYmFja0FkYXB0ZXJ9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICBhZGFwdGVyID0gYXdhaXQgbmF2aWdhdG9yLmdwdS5yZXF1ZXN0QWRhcHRlcih7IHBvd2VyUHJlZmVyZW5jZSwgZm9yY2VGYWxsYmFja0FkYXB0ZXIgfSk7XG4gICAgICAgIGlmICghYWRhcHRlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdGYWlsZWQgdG8gZ2V0IEdQVSBhZGFwdGVyLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgbmVlZCB0byBlbmFibGUgZmxhZyBcIi0tZW5hYmxlLXVuc2FmZS13ZWJncHVcIiBpZiB5b3UgYXJlIHVzaW5nIENocm9tZS4nLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIGFkYXB0ZXIgaXMgc2V0LCB2YWxpZGF0ZSBpdC5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHR5cGVvZiBhZGFwdGVyLmxpbWl0cyAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgICB0eXBlb2YgYWRhcHRlci5mZWF0dXJlcyAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgICB0eXBlb2YgYWRhcHRlci5yZXF1ZXN0RGV2aWNlICE9PSAnZnVuY3Rpb24nXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBHUFUgYWRhcHRlciBzZXQgaW4gYGVudi53ZWJncHUuYWRhcHRlcmAuIEl0IG11c3QgYmUgYSBHUFVBZGFwdGVyIG9iamVjdC4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCBpbml0SnNlcCgnd2ViZ3B1JywgZ2V0SW5zdGFuY2UoKSwgZW52LCBhZGFwdGVyKTtcbiAgICB9XG4gICAgaWYgKGVwTmFtZSA9PT0gJ3dlYm5uJykge1xuICAgICAgLy8gcGVyZm9ybSBXZWJOTiBhdmFpbGFiaWxpdHkgY2hlY2tcbiAgICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhKG5hdmlnYXRvciBhcyB1bmtub3duIGFzIHsgbWw6IHVua25vd24gfSkubWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJOTiBpcyBub3Qgc3VwcG9ydGVkIGluIGN1cnJlbnQgZW52aXJvbm1lbnQnKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgaW5pdEpzZXAoJ3dlYm5uJywgZ2V0SW5zdGFuY2UoKSwgZW52KTtcbiAgICB9XG4gIH1cbn07XG5cbi8vICNlbmRyZWdpb24gSW5pdGlhbGl6YXRpb25zXG5cbi8qKlxuICogdmFsaWQgZGF0YSBsb2NhdGlvbnMgZm9yIGlucHV0L291dHB1dCB0ZW5zb3JzLlxuICovXG50eXBlIFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0ID0gJ2NwdScgfCAnY3B1LXBpbm5lZCcgfCAnZ3B1LWJ1ZmZlcicgfCAnbWwtdGVuc29yJztcblxudHlwZSBJT0JpbmRpbmdTdGF0ZSA9IHtcbiAgLyoqXG4gICAqIHRoZSBoYW5kbGUgb2YgSU8gYmluZGluZy5cbiAgICovXG4gIHJlYWRvbmx5IGhhbmRsZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiB0aGUgcHJlZmVycmVkIGxvY2F0aW9uIGZvciBlYWNoIG91dHB1dCB0ZW5zb3IuXG4gICAqXG4gICAqIHZhbHVlIGlzIG9uZSBvZiAnY3B1JywgJ2NwdS1waW5uZWQnLCAnZ3B1LWJ1ZmZlcicsICdtbC10ZW5zb3InLlxuICAgKi9cbiAgcmVhZG9ubHkgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zOiByZWFkb25seSBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dFtdO1xuXG4gIC8qKlxuICAgKiBlbnVtIHZhbHVlIG9mIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQ6IHJlYWRvbmx5IG51bWJlcltdO1xufTtcblxuLyoqXG4gKiAgdHVwbGUgZWxlbWVudHMgYXJlOiBJbmZlcmVuY2VTZXNzaW9uIElEOyBpbnB1dE5hbWVzVVRGOEVuY29kZWQ7IG91dHB1dE5hbWVzVVRGOEVuY29kZWQ7IGJpbmRpbmdTdGF0ZVxuICovXG50eXBlIFNlc3Npb25NZXRhZGF0YSA9IFtcbiAgaW5mZXJlbmNlU2Vzc2lvbklkOiBudW1iZXIsXG4gIGlucHV0TmFtZXNVVEY4RW5jb2RlZDogbnVtYmVyW10sXG4gIG91dHB1dE5hbWVzVVRGOEVuY29kZWQ6IG51bWJlcltdLFxuICBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlIHwgbnVsbCxcbiAgZW5hYmxlR3JhcGhDYXB0dXJlOiBib29sZWFuLFxuICBpbnB1dE91dHB1dEJvdW5kOiBib29sZWFuLFxuXTtcblxuY29uc3QgYWN0aXZlU2Vzc2lvbnMgPSBuZXcgTWFwPG51bWJlciwgU2Vzc2lvbk1ldGFkYXRhPigpO1xuXG4vKipcbiAqIGdldCB0aGUgaW5wdXQvb3V0cHV0IGNvdW50IG9mIHRoZSBzZXNzaW9uLlxuICogQHBhcmFtIHNlc3Npb25IYW5kbGUgdGhlIGhhbmRsZSByZXByZXNlbnRpbmcgdGhlIHNlc3Npb24uIHNob3VsZCBiZSBub24temVyby5cbiAqIEByZXR1cm5zIGEgdHVwbGUgaW5jbHVkaW5nIDIgbnVtYmVycywgcmVwcmVzZW50aW5nIHRoZSBpbnB1dCBjb3VudCBhbmQgb3V0cHV0IGNvdW50LlxuICovXG5jb25zdCBnZXRTZXNzaW9uSW5wdXRPdXRwdXRDb3VudCA9IChzZXNzaW9uSGFuZGxlOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDgpO1xuICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldElucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSwgZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIDQpO1xuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IGNvdW50LlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFt3YXNtLkhFQVAzMltkYXRhT2Zmc2V0IC8gNF0sIHdhc20uSEVBUDMyW2RhdGFPZmZzZXQgLyA0ICsgMV1dO1xuICB9IGZpbmFsbHkge1xuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgfVxufTtcblxuLyoqXG4gKiBhbGxvY2F0ZSB0aGUgbWVtb3J5IGFuZCBtZW1jcHkgdGhlIGV4dGVybmFsIGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0gbW9kZWwgLSB0aGUgZXh0ZXJuYWwgYnVmZmVyIGNvbnRhaW5pbmcgdGhlIG1vZGVsIGRhdGEuIE11c3Qgbm90IGJlIHRoZSBzYW1lIGJ1ZmZlciBhcyB0aGUgV0FTTSBoZWFwLlxuICogQHJldHVybnMgYSAyLWVsZW1lbnRzIHR1cGxlIC0gdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIGFsbG9jYXRlZCBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIgPSAobW9kZWw6IFVpbnQ4QXJyYXkpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IG1vZGVsRGF0YU9mZnNldCA9IHdhc20uX21hbGxvYyhtb2RlbC5ieXRlTGVuZ3RoKTtcbiAgaWYgKG1vZGVsRGF0YU9mZnNldCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgY3JlYXRlIGEgc2Vzc2lvbi4gZmFpbGVkIHRvIGFsbG9jYXRlIGEgYnVmZmVyIG9mIHNpemUgJHttb2RlbC5ieXRlTGVuZ3RofS5gKTtcbiAgfVxuICB3YXNtLkhFQVBVOC5zZXQobW9kZWwsIG1vZGVsRGF0YU9mZnNldCk7XG4gIHJldHVybiBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbC5ieXRlTGVuZ3RoXTtcbn07XG5cbi8qKlxuICogY3JlYXRlIGFuIGluZmVyZW5jZSBzZXNzaW9uIGZyb20gYSBtb2RlbCBkYXRhIGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0gbW9kZWxEYXRhIC0gZWl0aGVyIGEgVWludDhBcnJheSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBtb2RlbCBkYXRhLCBvciBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGVcbiAqICAgICBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBtb2RlbCBkYXRhIGJ1ZmZlci5cbiAqIEBwYXJhbSBvcHRpb25zIGFuIG9wdGlvbmFsIHNlc3Npb24gb3B0aW9ucyBvYmplY3QuXG4gKiBAcmV0dXJucyBhIDMtZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyBbc2Vzc2lvbiBoYW5kbGUsIGlucHV0IG5hbWVzLCBvdXRwdXQgbmFtZXNdXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID0gYXN5bmMgKFxuICBtb2RlbERhdGE6IFVpbnQ4QXJyYXkgfCBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcbiAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXG4pOiBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4gPT4ge1xuICBsZXQgbW9kZWxEYXRhT2Zmc2V0OiBudW1iZXIsIG1vZGVsRGF0YUxlbmd0aDogbnVtYmVyO1xuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbERhdGEpKSB7XG4gICAgLy8gaWYgbW9kZWwgZGF0YSBpcyBhbiBhcnJheSwgaXQgbXVzdCBiZSBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YVxuICAgIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aF0gPSBtb2RlbERhdGE7XG4gIH0gZWxzZSBpZiAobW9kZWxEYXRhLmJ1ZmZlciA9PT0gd2FzbS5IRUFQVTguYnVmZmVyKSB7XG4gICAgLy8gaWYgbW9kZWwgZGF0YSB1c2VzIHRoZSBzYW1lIGJ1ZmZlciBhcyB0aGUgV0FTTSBoZWFwLCB3ZSBkb24ndCBuZWVkIHRvIGNvcHkgaXQuXG4gICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IFttb2RlbERhdGEuYnl0ZU9mZnNldCwgbW9kZWxEYXRhLmJ5dGVMZW5ndGhdO1xuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyd2lzZSwgY29weSB0aGUgbW9kZWwgZGF0YSB0byB0aGUgV0FTTSBoZWFwLlxuICAgIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aF0gPSBjb3B5RnJvbUV4dGVybmFsQnVmZmVyKG1vZGVsRGF0YSk7XG4gIH1cblxuICBsZXQgc2Vzc2lvbkhhbmRsZSA9IDA7XG4gIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XG4gIGxldCBpb0JpbmRpbmdIYW5kbGUgPSAwO1xuICBsZXQgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBpbnB1dE5hbWVzVVRGOEVuY29kZWQgPSBbXTtcbiAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IFtdO1xuXG4gIHRyeSB7XG4gICAgW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdID0gc2V0U2Vzc2lvbk9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBpZiAob3B0aW9ucz8uZXh0ZXJuYWxEYXRhICYmIHdhc20ubW91bnRFeHRlcm5hbERhdGEpIHtcbiAgICAgIGNvbnN0IGxvYWRpbmdQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIG9wdGlvbnMuZXh0ZXJuYWxEYXRhKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycgPyBmaWxlIDogZmlsZS5wYXRoO1xuICAgICAgICBsb2FkaW5nUHJvbWlzZXMucHVzaChcbiAgICAgICAgICBsb2FkRmlsZSh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycgPyBmaWxlIDogZmlsZS5kYXRhKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB3YXNtLm1vdW50RXh0ZXJuYWxEYXRhIShwYXRoLCBkYXRhKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gd2FpdCBmb3IgYWxsIGV4dGVybmFsIGRhdGEgZmlsZXMgdG8gYmUgbG9hZGVkXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChsb2FkaW5nUHJvbWlzZXMpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgcHJvdmlkZXIgb2Ygb3B0aW9ucz8uZXhlY3V0aW9uUHJvdmlkZXJzID8/IFtdKSB7XG4gICAgICBjb25zdCBwcm92aWRlck5hbWUgPSB0eXBlb2YgcHJvdmlkZXIgPT09ICdzdHJpbmcnID8gcHJvdmlkZXIgOiBwcm92aWRlci5uYW1lO1xuICAgICAgaWYgKHByb3ZpZGVyTmFtZSA9PT0gJ3dlYm5uJykge1xuICAgICAgICB3YXNtLnNob3VsZFRyYW5zZmVyVG9NTFRlbnNvciA9IGZhbHNlO1xuICAgICAgICBpZiAod2FzbS5jdXJyZW50Q29udGV4dCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyIGlzIGFscmVhZHkgc2V0LicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJvdmlkZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3Qgd2Vibm5PcHRpb25zID0gcHJvdmlkZXIgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XG4gICAgICAgICAgY29uc3QgZ3B1RGV2aWNlID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OT3B0aW9uc1dlYkdwdSk/LmdwdURldmljZTtcbiAgICAgICAgICBjb25zdCBkZXZpY2VUeXBlID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OQ29udGV4dE9wdGlvbnMpPy5kZXZpY2VUeXBlO1xuICAgICAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8ucG93ZXJQcmVmZXJlbmNlO1xuICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gY29udGV4dCBhcyBNTENvbnRleHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChncHVEZXZpY2UpIHtcbiAgICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCBuYXZpZ2F0b3IubWwuY3JlYXRlQ29udGV4dChncHVEZXZpY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gYXdhaXQgbmF2aWdhdG9yLm1sLmNyZWF0ZUNvbnRleHQoeyBkZXZpY2VUeXBlLCBwb3dlclByZWZlcmVuY2UgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCBuYXZpZ2F0b3IubWwuY3JlYXRlQ29udGV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNlc3Npb25IYW5kbGUgPSBhd2FpdCB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uKG1vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoLCBzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XG4gICAgaWYgKHNlc3Npb25IYW5kbGUgPT09IDApIHtcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY3JlYXRlIGEgc2Vzc2lvbi5cIik7XG4gICAgfVxuXG4gICAgd2FzbS5qc2VwT25DcmVhdGVTZXNzaW9uPy4oKTtcblxuICAgIC8vIGNsZWFyIGN1cnJlbnQgTUxDb250ZXh0IGFmdGVyIHNlc3Npb24gY3JlYXRpb25cbiAgICBpZiAod2FzbS5jdXJyZW50Q29udGV4dCkge1xuICAgICAgd2FzbS5qc2VwUmVnaXN0ZXJNTENvbnRleHQhKHNlc3Npb25IYW5kbGUsIHdhc20uY3VycmVudENvbnRleHQpO1xuICAgICAgd2FzbS5jdXJyZW50Q29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgIHdhc20uc2hvdWxkVHJhbnNmZXJUb01MVGVuc29yID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBbaW5wdXRDb3VudCwgb3V0cHV0Q291bnRdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSk7XG5cbiAgICBjb25zdCBlbmFibGVHcmFwaENhcHR1cmUgPSAhIW9wdGlvbnM/LmVuYWJsZUdyYXBoQ2FwdHVyZTtcblxuICAgIGNvbnN0IGlucHV0TmFtZXMgPSBbXTtcbiAgICBjb25zdCBvdXRwdXROYW1lcyA9IFtdO1xuICAgIGNvbnN0IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCBuYW1lID0gd2FzbS5fT3J0R2V0SW5wdXROYW1lKHNlc3Npb25IYW5kbGUsIGkpO1xuICAgICAgaWYgKG5hbWUgPT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBnZXQgYW4gaW5wdXQgbmFtZS5cIik7XG4gICAgICB9XG4gICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lKTtcbiAgICAgIGlucHV0TmFtZXMucHVzaCh3YXNtLlVURjhUb1N0cmluZyhuYW1lKSk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgY29uc3QgbmFtZSA9IHdhc20uX09ydEdldE91dHB1dE5hbWUoc2Vzc2lvbkhhbmRsZSwgaSk7XG4gICAgICBpZiAobmFtZSA9PT0gMCkge1xuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBvdXRwdXQgbmFtZS5cIik7XG4gICAgICB9XG4gICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLnB1c2gobmFtZSk7XG4gICAgICBjb25zdCBuYW1lU3RyaW5nID0gd2FzbS5VVEY4VG9TdHJpbmcobmFtZSk7XG4gICAgICBvdXRwdXROYW1lcy5wdXNoKG5hbWVTdHJpbmcpO1xuXG4gICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQKSB7XG4gICAgICAgIGlmIChlbmFibGVHcmFwaENhcHR1cmUgJiYgb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKCdncHUtYnVmZmVyJyk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbG9jYXRpb24gPVxuICAgICAgICAgIHR5cGVvZiBvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbiA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gb3B0aW9ucy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvblxuICAgICAgICAgICAgOiAob3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24/LltuYW1lU3RyaW5nXSA/PyAnY3B1Jyk7XG4gICAgICAgIGlmIChsb2NhdGlvbiAhPT0gJ2NwdScgJiYgbG9jYXRpb24gIT09ICdjcHUtcGlubmVkJyAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInICYmIGxvY2F0aW9uICE9PSAnbWwtdGVuc29yJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnRlZCBwcmVmZXJyZWQgb3V0cHV0IGxvY2F0aW9uOiAke2xvY2F0aW9ufS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5hYmxlR3JhcGhDYXB0dXJlICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgTm90IHN1cHBvcnRlZCBwcmVmZXJyZWQgb3V0cHV0IGxvY2F0aW9uOiAke2xvY2F0aW9ufS4gT25seSAnZ3B1LWJ1ZmZlcicgbG9jYXRpb24gaXMgc3VwcG9ydGVkIHdoZW4gZW5hYmxlR3JhcGhDYXB0dXJlIGlzIHRydWUuYCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKGxvY2F0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1c2UgSU8gYmluZGluZyBvbmx5IHdoZW4gYXQgbGVhc3Qgb25lIG91dHB1dCBpcyBwcmVmZXJyZWQgdG8gYmUgb24gR1BVLlxuICAgIGxldCBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCAmJiBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMuc29tZSgobCkgPT4gbCA9PT0gJ2dwdS1idWZmZXInIHx8IGwgPT09ICdtbC10ZW5zb3InKSkge1xuICAgICAgaW9CaW5kaW5nSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlQmluZGluZyhzZXNzaW9uSGFuZGxlKTtcbiAgICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgPT09IDApIHtcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjcmVhdGUgSU8gYmluZGluZy5cIik7XG4gICAgICB9XG5cbiAgICAgIGJpbmRpbmdTdGF0ZSA9IHtcbiAgICAgICAgaGFuZGxlOiBpb0JpbmRpbmdIYW5kbGUsXG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucyxcbiAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZDogb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLm1hcCgobCkgPT4gZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGwpKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25IYW5kbGUsIFtcbiAgICAgIHNlc3Npb25IYW5kbGUsXG4gICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLFxuICAgICAgYmluZGluZ1N0YXRlLFxuICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxuICAgICAgZmFsc2UsXG4gICAgXSk7XG4gICAgcmV0dXJuIFtzZXNzaW9uSGFuZGxlLCBpbnB1dE5hbWVzLCBvdXRwdXROYW1lc107XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuXG4gICAgaWYgKGlvQmluZGluZ0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nSGFuZGxlKTtcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbkhhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb24oc2Vzc2lvbkhhbmRsZSk7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5fZnJlZShtb2RlbERhdGFPZmZzZXQpO1xuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zKHNlc3Npb25PcHRpb25zSGFuZGxlKTtcbiAgICB9XG4gICAgYWxsb2NzLmZvckVhY2goKGFsbG9jKSA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XG5cbiAgICAvLyB1bm1vdW50IGV4dGVybmFsIGRhdGEgaWYgbmVjZXNzYXJ5XG4gICAgd2FzbS51bm1vdW50RXh0ZXJuYWxEYXRhPy4oKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJlbGVhc2Ugc2Vzc2lvbi4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcbiAgfVxuICBjb25zdCBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZSwgZW5hYmxlR3JhcGhDYXB0dXJlXSA9IHNlc3Npb247XG5cbiAgaWYgKGlvQmluZGluZ1N0YXRlKSB7XG4gICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSkge1xuICAgICAgd2FzbS5fT3J0Q2xlYXJCb3VuZE91dHB1dHMoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKTtcbiAgICB9XG4gICAgd2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKTtcbiAgfVxuXG4gIHdhc20uanNlcE9uUmVsZWFzZVNlc3Npb24/LihzZXNzaW9uSWQpO1xuXG4gIGlucHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKChidWYpID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XG4gIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xuICB3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKTtcbiAgYWN0aXZlU2Vzc2lvbnMuZGVsZXRlKHNlc3Npb25JZCk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJlcGFyZUlucHV0T3V0cHV0VGVuc29yID0gKFxuICB0ZW5zb3I6IFRlbnNvck1ldGFkYXRhIHwgbnVsbCxcbiAgdGVuc29ySGFuZGxlczogbnVtYmVyW10sXG4gIGFsbG9jczogbnVtYmVyW10sXG4gIHNlc3Npb25JZDogbnVtYmVyLFxuICBpbmRleDogbnVtYmVyLFxuICBlbmFibGVHcmFwaENhcHR1cmUgPSBmYWxzZSxcbik6IHZvaWQgPT4ge1xuICBpZiAoIXRlbnNvcikge1xuICAgIHRlbnNvckhhbmRsZXMucHVzaCgwKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcbiAgY29uc3QgZGltcyA9IHRlbnNvclsxXTtcbiAgY29uc3QgbG9jYXRpb24gPSB0ZW5zb3JbM107XG5cbiAgbGV0IHJhd0RhdGE6IG51bWJlcjtcbiAgbGV0IGRhdGFCeXRlTGVuZ3RoOiBudW1iZXI7XG5cbiAgaWYgKGRhdGFUeXBlID09PSAnc3RyaW5nJyAmJiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyB8fCBsb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xuICB9XG5cbiAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEV4dGVybmFsIGJ1ZmZlciBtdXN0IGJlIHByb3ZpZGVkIGZvciBpbnB1dC9vdXRwdXQgaW5kZXggJHtpbmRleH0gd2hlbiBlbmFibGVHcmFwaENhcHR1cmUgaXMgdHJ1ZS5gLFxuICAgICk7XG4gIH1cblxuICBpZiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xuICAgIGNvbnN0IGdwdUJ1ZmZlciA9IHRlbnNvclsyXS5ncHVCdWZmZXIgYXMgR1BVQnVmZmVyO1xuICAgIGRhdGFCeXRlTGVuZ3RoID0gY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXModGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpLCBkaW1zKSE7XG5cbiAgICBjb25zdCByZWdpc3RlckJ1ZmZlciA9IHdhc20uanNlcFJlZ2lzdGVyQnVmZmVyO1xuICAgIGlmICghcmVnaXN0ZXJCdWZmZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIGxvY2F0aW9uIFwiZ3B1LWJ1ZmZlclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJHUFUuJyk7XG4gICAgfVxuICAgIHJhd0RhdGEgPSByZWdpc3RlckJ1ZmZlcihzZXNzaW9uSWQsIGluZGV4LCBncHVCdWZmZXIsIGRhdGFCeXRlTGVuZ3RoKTtcbiAgfSBlbHNlIGlmIChsb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicpIHtcbiAgICBjb25zdCBtbFRlbnNvciA9IHRlbnNvclsyXS5tbFRlbnNvciBhcyBNTFRlbnNvcjtcbiAgICBkYXRhQnl0ZUxlbmd0aCA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgZGltcykhO1xuXG4gICAgY29uc3QgcmVnaXN0ZXJNTFRlbnNvciA9IHdhc20uanNlcFJlZ2lzdGVyTUxUZW5zb3I7XG4gICAgaWYgKCFyZWdpc3Rlck1MVGVuc29yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcIm1sLXRlbnNvclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJOTi4nKTtcbiAgICB9XG4gICAgcmF3RGF0YSA9IHJlZ2lzdGVyTUxUZW5zb3IobWxUZW5zb3IsIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtKGRhdGFUeXBlKSwgZGltcyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAvLyBzdHJpbmcgdGVuc29yXG4gICAgICBkYXRhQnl0ZUxlbmd0aCA9IDQgKiBkYXRhLmxlbmd0aDtcbiAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICBsZXQgZGF0YUluZGV4ID0gcmF3RGF0YSAvIDQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHRlbnNvciBkYXRhIGF0IGluZGV4ICR7aX0gaXMgbm90IGEgc3RyaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgd2FzbS5IRUFQVTMyW2RhdGFJbmRleCsrXSA9IGFsbG9jV2FzbVN0cmluZyhkYXRhW2ldLCBhbGxvY3MpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xuICAgICAgYWxsb2NzLnB1c2gocmF3RGF0YSk7XG4gICAgICB3YXNtLkhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YUJ5dGVMZW5ndGgpLCByYXdEYXRhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIGRpbXMubGVuZ3RoKTtcbiAgdHJ5IHtcbiAgICBsZXQgZGltSW5kZXggPSBkaW1zT2Zmc2V0IC8gNDtcbiAgICBkaW1zLmZvckVhY2goKGQpID0+ICh3YXNtLkhFQVAzMltkaW1JbmRleCsrXSA9IGQpKTtcbiAgICBjb25zdCB0ZW5zb3IgPSB3YXNtLl9PcnRDcmVhdGVUZW5zb3IoXG4gICAgICB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksXG4gICAgICByYXdEYXRhLFxuICAgICAgZGF0YUJ5dGVMZW5ndGgsXG4gICAgICBkaW1zT2Zmc2V0LFxuICAgICAgZGltcy5sZW5ndGgsXG4gICAgICBkYXRhTG9jYXRpb25TdHJpbmdUb0VudW0obG9jYXRpb24pLFxuICAgICk7XG4gICAgaWYgKHRlbnNvciA9PT0gMCkge1xuICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGNyZWF0ZSB0ZW5zb3IgZm9yIGlucHV0L291dHB1dC4gc2Vzc2lvbj0ke3Nlc3Npb25JZH0sIGluZGV4PSR7aW5kZXh9LmApO1xuICAgIH1cbiAgICB0ZW5zb3JIYW5kbGVzLnB1c2godGVuc29yKTtcbiAgfSBmaW5hbGx5IHtcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogcGVyZm9ybSBpbmZlcmVuY2UgcnVuXG4gKi9cbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyAoXG4gIHNlc3Npb25JZDogbnVtYmVyLFxuICBpbnB1dEluZGljZXM6IG51bWJlcltdLFxuICBpbnB1dFRlbnNvcnM6IFRlbnNvck1ldGFkYXRhW10sXG4gIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxuICBvdXRwdXRUZW5zb3JzOiBBcnJheTxUZW5zb3JNZXRhZGF0YSB8IG51bGw+LFxuICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4pOiBQcm9taXNlPFRlbnNvck1ldGFkYXRhW10+ID0+IHtcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcbiAgaWYgKCFzZXNzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcnVuIGluZmVyZW5jZS4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcbiAgfVxuICBjb25zdCBzZXNzaW9uSGFuZGxlID0gc2Vzc2lvblswXTtcbiAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gc2Vzc2lvblsxXTtcbiAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IHNlc3Npb25bMl07XG4gIGNvbnN0IGlvQmluZGluZ1N0YXRlID0gc2Vzc2lvblszXTtcbiAgY29uc3QgZW5hYmxlR3JhcGhDYXB0dXJlID0gc2Vzc2lvbls0XTtcbiAgY29uc3QgaW5wdXRPdXRwdXRCb3VuZCA9IHNlc3Npb25bNV07XG5cbiAgY29uc3QgaW5wdXRDb3VudCA9IGlucHV0SW5kaWNlcy5sZW5ndGg7XG4gIGNvbnN0IG91dHB1dENvdW50ID0gb3V0cHV0SW5kaWNlcy5sZW5ndGg7XG5cbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xuICBsZXQgcnVuT3B0aW9uc0FsbG9jczogbnVtYmVyW10gPSBbXTtcblxuICBjb25zdCBpbnB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IG91dHB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IGlucHV0T3V0cHV0QWxsb2NzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0IGJlZm9yZVJ1blN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcbiAgY29uc3QgaW5wdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIDQpO1xuICBjb25zdCBpbnB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKGlucHV0Q291bnQgKiA0KTtcbiAgY29uc3Qgb3V0cHV0VmFsdWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG4gIGNvbnN0IG91dHB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogNCk7XG5cbiAgdHJ5IHtcbiAgICAvLyBXZWJOTiBiYWNrZW5kIG5lZWRzIHRoZSBhY3RpdmUgc2Vzc2lvbiB0byBjaGVjayBNTFRlbnNvcnMgd2l0aCB0aGUgY3VycmVudCBjb250ZXh0LlxuICAgIHdhc20uanNlcE9uUnVuU3RhcnQ/LihzZXNzaW9uSGFuZGxlKTtcblxuICAgIFtydW5PcHRpb25zSGFuZGxlLCBydW5PcHRpb25zQWxsb2NzXSA9IHNldFJ1bk9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAvLyBjcmVhdGUgaW5wdXQgdGVuc29yc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IoXG4gICAgICAgIGlucHV0VGVuc29yc1tpXSxcbiAgICAgICAgaW5wdXRUZW5zb3JIYW5kbGVzLFxuICAgICAgICBpbnB1dE91dHB1dEFsbG9jcyxcbiAgICAgICAgc2Vzc2lvbklkLFxuICAgICAgICBpbnB1dEluZGljZXNbaV0sXG4gICAgICAgIGVuYWJsZUdyYXBoQ2FwdHVyZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIG91dHB1dCB0ZW5zb3JzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IoXG4gICAgICAgIG91dHB1dFRlbnNvcnNbaV0sXG4gICAgICAgIG91dHB1dFRlbnNvckhhbmRsZXMsXG4gICAgICAgIGlucHV0T3V0cHV0QWxsb2NzLFxuICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgIGlucHV0Q291bnQgKyBvdXRwdXRJbmRpY2VzW2ldLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCBpbnB1dFZhbHVlc0luZGV4ID0gaW5wdXRWYWx1ZXNPZmZzZXQgLyA0O1xuICAgIGxldCBpbnB1dE5hbWVzSW5kZXggPSBpbnB1dE5hbWVzT2Zmc2V0IC8gNDtcbiAgICBsZXQgb3V0cHV0VmFsdWVzSW5kZXggPSBvdXRwdXRWYWx1ZXNPZmZzZXQgLyA0O1xuICAgIGxldCBvdXRwdXROYW1lc0luZGV4ID0gb3V0cHV0TmFtZXNPZmZzZXQgLyA0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XG4gICAgICB3YXNtLkhFQVBVMzJbaW5wdXRWYWx1ZXNJbmRleCsrXSA9IGlucHV0VGVuc29ySGFuZGxlc1tpXTtcbiAgICAgIHdhc20uSEVBUFUzMltpbnB1dE5hbWVzSW5kZXgrK10gPSBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5wdXRJbmRpY2VzW2ldXTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XG4gICAgICB3YXNtLkhFQVBVMzJbb3V0cHV0VmFsdWVzSW5kZXgrK10gPSBvdXRwdXRUZW5zb3JIYW5kbGVzW2ldO1xuICAgICAgd2FzbS5IRUFQVTMyW291dHB1dE5hbWVzSW5kZXgrK10gPSBvdXRwdXROYW1lc1VURjhFbmNvZGVkW291dHB1dEluZGljZXNbaV1dO1xuICAgIH1cblxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgJiYgaW9CaW5kaW5nU3RhdGUgJiYgIWlucHV0T3V0cHV0Qm91bmQpIHtcbiAgICAgIGNvbnN0IHsgaGFuZGxlLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMsIG91dHB1dFByZWZlcnJlZExvY2F0aW9uc0VuY29kZWQgfSA9IGlvQmluZGluZ1N0YXRlO1xuXG4gICAgICBpZiAoaW5wdXROYW1lc1VURjhFbmNvZGVkLmxlbmd0aCAhPT0gaW5wdXRDb3VudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYGlucHV0IGNvdW50IGZyb20gZmVlZHMgKCR7aW5wdXRDb3VudH0pIGlzIGV4cGVjdGVkIHRvIGJlIGFsd2F5cyBlcXVhbCB0byBtb2RlbCdzIGlucHV0IGNvdW50ICgke2lucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGh9KS5gLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBwcm9jZXNzIGlucHV0c1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBpbnB1dEluZGljZXNbaV07XG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydEJpbmRJbnB1dChoYW5kbGUsIGlucHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIGlucHV0VGVuc29ySGFuZGxlc1tpXSk7XG4gICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBpbnB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcHJvY2VzcyBwcmUtYWxsb2NhdGVkIG91dHB1dHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCBpbmRleCA9IG91dHB1dEluZGljZXNbaV07XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gb3V0cHV0VGVuc29yc1tpXT8uWzNdOyAvLyB1bmRlZmluZWQgbWVhbnMgb3V0cHV0IGlzIG5vdCBwcmUtYWxsb2NhdGVkLlxuXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgIC8vIG91dHB1dCBpcyBwcmUtYWxsb2NhdGVkLiBiaW5kIHRoZSB0ZW5zb3IuXG4gICAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0QmluZE91dHB1dChoYW5kbGUsIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbaW5kZXhdLCBvdXRwdXRUZW5zb3JIYW5kbGVzW2ldLCAwKTtcbiAgICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBwcmUtYWxsb2NhdGVkIG91dHB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG91dHB1dCBpcyBub3QgcHJlLWFsbG9jYXRlZC4gcmVzZXQgcHJlZmVycmVkIGxvY2F0aW9uLlxuICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEJpbmRPdXRwdXQoXG4gICAgICAgICAgICBoYW5kbGUsXG4gICAgICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkW2luZGV4XSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBiaW5kIG91dHB1dFske2l9XSB0byAke291dHB1dFByZWZlcnJlZExvY2F0aW9uc1tpXX0gZm9yIHNlc3Npb249JHtzZXNzaW9uSWR9LmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25JZCwgW1xuICAgICAgICBzZXNzaW9uSGFuZGxlLFxuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICAgIHRydWUsXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICBsZXQgZXJyb3JDb2RlOiBudW1iZXI7XG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCAmJiBpb0JpbmRpbmdTdGF0ZSkge1xuICAgICAgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0UnVuV2l0aEJpbmRpbmcoXG4gICAgICAgIHNlc3Npb25IYW5kbGUsXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLmhhbmRsZSxcbiAgICAgICAgb3V0cHV0Q291bnQsXG4gICAgICAgIG91dHB1dFZhbHVlc09mZnNldCxcbiAgICAgICAgcnVuT3B0aW9uc0hhbmRsZSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydFJ1bihcbiAgICAgICAgc2Vzc2lvbkhhbmRsZSxcbiAgICAgICAgaW5wdXROYW1lc09mZnNldCxcbiAgICAgICAgaW5wdXRWYWx1ZXNPZmZzZXQsXG4gICAgICAgIGlucHV0Q291bnQsXG4gICAgICAgIG91dHB1dE5hbWVzT2Zmc2V0LFxuICAgICAgICBvdXRwdXRDb3VudCxcbiAgICAgICAgb3V0cHV0VmFsdWVzT2Zmc2V0LFxuICAgICAgICBydW5PcHRpb25zSGFuZGxlLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICBjaGVja0xhc3RFcnJvcignZmFpbGVkIHRvIGNhbGwgT3J0UnVuKCkuJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0OiBUZW5zb3JNZXRhZGF0YVtdID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IHRlbnNvciA9IHdhc20uSEVBUFUzMltvdXRwdXRWYWx1ZXNPZmZzZXQgLyA0ICsgaV07XG4gICAgICBpZiAodGVuc29yID09PSBvdXRwdXRUZW5zb3JIYW5kbGVzW2ldKSB7XG4gICAgICAgIC8vIG91dHB1dCB0ZW5zb3IgaXMgcHJlLWFsbG9jYXRlZC4gbm8gbmVlZCB0byBjb3B5IGRhdGEuXG4gICAgICAgIG91dHB1dC5wdXNoKG91dHB1dFRlbnNvcnNbaV0hKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJlZm9yZUdldFRlbnNvckRhdGFTdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XG4gICAgICAvLyBzdGFjayBhbGxvY2F0ZSA0IHBvaW50ZXIgdmFsdWVcbiAgICAgIGNvbnN0IHRlbnNvckRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIDQpO1xuXG4gICAgICBsZXQga2VlcE91dHB1dFRlbnNvciA9IGZhbHNlO1xuICAgICAgbGV0IHR5cGU6IFRlbnNvci5UeXBlIHwgdW5kZWZpbmVkLFxuICAgICAgICBkYXRhT2Zmc2V0ID0gMDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldFRlbnNvckRhdGEoXG4gICAgICAgICAgdGVuc29yLFxuICAgICAgICAgIHRlbnNvckRhdGFPZmZzZXQsXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCArIDQsXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCArIDgsXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCArIDEyLFxuICAgICAgICApO1xuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFjY2VzcyBvdXRwdXQgdGVuc29yIGRhdGEgb24gaW5kZXggJHtpfS5gKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGVuc29yRGF0YUluZGV4ID0gdGVuc29yRGF0YU9mZnNldCAvIDQ7XG4gICAgICAgIGNvbnN0IGRhdGFUeXBlID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgZGF0YU9mZnNldCA9IHdhc20uSEVBUFUzMlt0ZW5zb3JEYXRhSW5kZXgrK107XG4gICAgICAgIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLkhFQVBVMzJbdGVuc29yRGF0YUluZGV4KytdO1xuICAgICAgICBjb25zdCBkaW1zTGVuZ3RoID0gd2FzbS5IRUFQVTMyW3RlbnNvckRhdGFJbmRleCsrXTtcbiAgICAgICAgY29uc3QgZGltcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRpbXMucHVzaCh3YXNtLkhFQVBVMzJbZGltc09mZnNldCAvIDQgKyBpXSk7XG4gICAgICAgIH1cbiAgICAgICAgd2FzbS5fT3J0RnJlZShkaW1zT2Zmc2V0KTtcblxuICAgICAgICBjb25zdCBzaXplID0gZGltcy5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKTtcbiAgICAgICAgdHlwZSA9IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nKGRhdGFUeXBlKTtcblxuICAgICAgICBjb25zdCBwcmVmZXJyZWRMb2NhdGlvbiA9IGlvQmluZGluZ1N0YXRlPy5vdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbb3V0cHV0SW5kaWNlc1tpXV07XG5cbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgfHwgcHJlZmVycmVkTG9jYXRpb24gPT09ICdtbC10ZW5zb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0cmluZyB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBvbiBHUFUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN0cmluZ0RhdGE6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgbGV0IGRhdGFJbmRleCA9IGRhdGFPZmZzZXQgLyA0O1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB3YXNtLkhFQVBVMzJbZGF0YUluZGV4KytdO1xuICAgICAgICAgICAgY29uc3QgbWF4Qnl0ZXNUb1JlYWQgPSBpID09PSBzaXplIC0gMSA/IHVuZGVmaW5lZCA6IHdhc20uSEVBUFUzMltkYXRhSW5kZXhdIC0gb2Zmc2V0O1xuICAgICAgICAgICAgc3RyaW5nRGF0YS5wdXNoKHdhc20uVVRGOFRvU3RyaW5nKG9mZnNldCwgbWF4Qnl0ZXNUb1JlYWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIHN0cmluZ0RhdGEsICdjcHUnXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSWYgYSBjZXJ0YWluIG91dHB1dCdzIHByZWZlcnJlZCBsb2NhdGlvbiBpcyBHUFUgYnV0IHRoZSB0ZW5zb3IgaXMgZW1wdHksIHdlIHN0aWxsIG5lZWQgdG8gY3JlYXRlIGEgQ1BVXG4gICAgICAgICAgLy8gdGVuc29yIGZvciBpdC4gVGhlcmUgaXMgbm8gbWFwcGluZyBHUFUgYnVmZmVyIGZvciBhbiBlbXB0eSB0ZW5zb3IuXG4gICAgICAgICAgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgJiYgc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGdldEJ1ZmZlciA9IHdhc20uanNlcEdldEJ1ZmZlcjtcbiAgICAgICAgICAgIGlmICghZ2V0QnVmZmVyKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJlZmVycmVkTG9jYXRpb24gXCJncHUtYnVmZmVyXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYkdQVS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGdwdUJ1ZmZlciA9IGdldEJ1ZmZlcihkYXRhT2Zmc2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclNpemUgPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyhkYXRhVHlwZSwgc2l6ZSk7XG4gICAgICAgICAgICBpZiAoYnVmZmVyU2l6ZSA9PT0gdW5kZWZpbmVkIHx8ICFpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUodHlwZSkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZG8gbm90IHJlbGVhc2UgdGhlIHRlbnNvciByaWdodCBub3cuIGl0IHdpbGwgYmUgcmVsZWFzZWQgd2hlbiB1c2VyIGNhbGxzIHRlbnNvci5kaXNwb3NlKCkuXG4gICAgICAgICAgICBrZWVwT3V0cHV0VGVuc29yID0gdHJ1ZTtcblxuICAgICAgICAgICAgb3V0cHV0LnB1c2goW1xuICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICBkaW1zLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZ3B1QnVmZmVyLFxuICAgICAgICAgICAgICAgIGRvd25sb2FkOiB3YXNtLmpzZXBDcmVhdGVEb3dubG9hZGVyIShncHVCdWZmZXIsIGJ1ZmZlclNpemUsIHR5cGUpLFxuICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAnZ3B1LWJ1ZmZlcicsXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByZWZlcnJlZExvY2F0aW9uID09PSAnbWwtdGVuc29yJyAmJiBzaXplID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZW5zdXJlVGVuc29yID0gd2FzbS5qc2VwRW5zdXJlVGVuc29yO1xuICAgICAgICAgICAgaWYgKCFlbnN1cmVUZW5zb3IpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmVmZXJyZWRMb2NhdGlvbiBcIm1sLXRlbnNvclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJOTi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRlbnNvclNpemUgPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyhkYXRhVHlwZSwgc2l6ZSk7XG4gICAgICAgICAgICBpZiAodGVuc29yU2l6ZSA9PT0gdW5kZWZpbmVkIHx8ICFpc01MVGVuc29yU3VwcG9ydGVkVHlwZSh0eXBlKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZ3JhcGggaGFzIGJlZW4gcGFydGl0aW9uZWQsIHRoZSBvdXRwdXQgdGVuc29yIG1heSBoYXZlIG5vdCBiZWVuIGNyZWF0ZWQuIEZvciB0aGlzIHJlYXNvbiwgd2UgdXNlXG4gICAgICAgICAgICAvLyBlbnN1cmVUZW5zb3IgdG8gZ2V0L2NyZWF0ZSB0aGUgTUxUZW5zb3IuIEluIHdoaWNoIGNhc2UsIHdlIGRvbid0IG5lZWQgdG8gY29weSB0aGUgZGF0YSBpZiBhIG5ldyB0ZW5zb3JcbiAgICAgICAgICAgIC8vIGhhcyBiZWVuIGNyZWF0ZWQuXG4gICAgICAgICAgICBjb25zdCBtbFRlbnNvciA9IGF3YWl0IGVuc3VyZVRlbnNvcihkYXRhT2Zmc2V0LCBkYXRhVHlwZSwgZGltcywgZmFsc2UpO1xuXG4gICAgICAgICAgICAvLyBkbyBub3QgcmVsZWFzZSB0aGUgdGVuc29yIHJpZ2h0IG5vdy4gaXQgd2lsbCBiZSByZWxlYXNlZCB3aGVuIHVzZXIgY2FsbHMgdGVuc29yLmRpc3Bvc2UoKS5cbiAgICAgICAgICAgIGtlZXBPdXRwdXRUZW5zb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBvdXRwdXQucHVzaChbXG4gICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgIGRpbXMsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtbFRlbnNvcixcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogd2FzbS5qc2VwQ3JlYXRlTUxUZW5zb3JEb3dubG9hZGVyIShkYXRhT2Zmc2V0LCB0eXBlKSxcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3YXNtLmpzZXBSZWxlYXNlVGVuc29ySWQhKGRhdGFPZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICdtbC10ZW5zb3InLFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgdHlwZWRBcnJheUNvbnN0cnVjdG9yKHNpemUpO1xuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKS5zZXQoXG4gICAgICAgICAgICAgIHdhc20uSEVBUFU4LnN1YmFycmF5KGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBkYXRhLmJ5dGVMZW5ndGgpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBkYXRhLCAnY3B1J10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIGRhdGFPZmZzZXQpIHtcbiAgICAgICAgICB3YXNtLl9mcmVlKGRhdGFPZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgha2VlcE91dHB1dFRlbnNvcikge1xuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpb0JpbmRpbmdTdGF0ZSAmJiAhZW5hYmxlR3JhcGhDYXB0dXJlKSB7XG4gICAgICB3YXNtLl9PcnRDbGVhckJvdW5kT3V0cHV0cyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpO1xuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25JZCwgW1xuICAgICAgICBzZXNzaW9uSGFuZGxlLFxuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLFxuICAgICAgICBlbmFibGVHcmFwaENhcHR1cmUsXG4gICAgICAgIGZhbHNlLFxuICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0gZmluYWxseSB7XG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xuXG4gICAgaW5wdXRUZW5zb3JIYW5kbGVzLmZvckVhY2goKHYpID0+IHdhc20uX09ydFJlbGVhc2VUZW5zb3IodikpO1xuICAgIG91dHB1dFRlbnNvckhhbmRsZXMuZm9yRWFjaCgodikgPT4gd2FzbS5fT3J0UmVsZWFzZVRlbnNvcih2KSk7XG4gICAgaW5wdXRPdXRwdXRBbGxvY3MuZm9yRWFjaCgocCkgPT4gd2FzbS5fZnJlZShwKSk7XG5cbiAgICBpZiAocnVuT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XG4gICAgfVxuICAgIHJ1bk9wdGlvbnNBbGxvY3MuZm9yRWFjaCgocCkgPT4gd2FzbS5fZnJlZShwKSk7XG4gIH1cbn07XG5cbi8qKlxuICogZW5kIHByb2ZpbGluZ1xuICovXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnMuZ2V0KHNlc3Npb25JZCk7XG4gIGlmICghc2Vzc2lvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzZXNzaW9uIGlkJyk7XG4gIH1cbiAgY29uc3Qgc2Vzc2lvbkhhbmRsZSA9IHNlc3Npb25bMF07XG5cbiAgLy8gcHJvZmlsZSBmaWxlIG5hbWUgaXMgbm90IHVzZWQgeWV0LCBidXQgaXQgbXVzdCBiZSBmcmVlZC5cbiAgY29uc3QgcHJvZmlsZUZpbGVOYW1lID0gd2FzbS5fT3J0RW5kUHJvZmlsaW5nKHNlc3Npb25IYW5kbGUpO1xuICBpZiAocHJvZmlsZUZpbGVOYW1lID09PSAwKSB7XG4gICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBnZXQgYW4gcHJvZmlsZSBmaWxlIG5hbWUuXCIpO1xuICB9XG4gIHdhc20uX09ydEZyZWUocHJvZmlsZUZpbGVOYW1lKTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyA9ICh0ZW5zb3JzOiByZWFkb25seSBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKTogQXJyYXlCdWZmZXJMaWtlW10gPT4ge1xuICBjb25zdCBidWZmZXJzOiBBcnJheUJ1ZmZlckxpa2VbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHRlbnNvciBvZiB0ZW5zb3JzKSB7XG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkgJiYgJ2J1ZmZlcicgaW4gZGF0YSkge1xuICAgICAgYnVmZmVycy5wdXNoKGRhdGEuYnVmZmVyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ1ZmZlcnM7XG59O1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBlbnYsIEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQge1xuICBPcnRXYXNtTWVzc2FnZSxcbiAgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsXG4gIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSxcbiAgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEsXG4gIFRlbnNvck1ldGFkYXRhLFxufSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnLi93YXNtLWNvcmUtaW1wbCc7XG5pbXBvcnQgeyBpbml0aWFsaXplV2ViQXNzZW1ibHkgfSBmcm9tICcuL3dhc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBpbXBvcnRQcm94eVdvcmtlciB9IGZyb20gJy4vd2FzbS11dGlscy1pbXBvcnQnO1xuXG5jb25zdCBpc1Byb3h5ID0gKCk6IGJvb2xlYW4gPT4gISFlbnYud2FzbS5wcm94eSAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xubGV0IHByb3h5V29ya2VyOiBXb3JrZXIgfCB1bmRlZmluZWQ7XG5sZXQgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmxldCBhYm9ydGVkID0gZmFsc2U7XG5sZXQgdGVtcG9yYXJ5T2JqZWN0VXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbnR5cGUgUHJvbWlzZUNhbGxiYWNrczxUID0gdm9pZD4gPSBbcmVzb2x2ZTogKHJlc3VsdDogVCkgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uOiB1bmtub3duKSA9PiB2b2lkXTtcbmxldCBpbml0V2FzbUNhbGxiYWNrczogUHJvbWlzZUNhbGxiYWNrcztcbmNvbnN0IHF1ZXVlZENhbGxiYWNrczogTWFwPE9ydFdhc21NZXNzYWdlWyd0eXBlJ10sIEFycmF5PFByb21pc2VDYWxsYmFja3M8dW5rbm93bj4+PiA9IG5ldyBNYXAoKTtcblxuY29uc3QgZW5xdWV1ZUNhbGxiYWNrcyA9ICh0eXBlOiBPcnRXYXNtTWVzc2FnZVsndHlwZSddLCBjYWxsYmFja3M6IFByb21pc2VDYWxsYmFja3M8dW5rbm93bj4pOiB2b2lkID0+IHtcbiAgY29uc3QgcXVldWUgPSBxdWV1ZWRDYWxsYmFja3MuZ2V0KHR5cGUpO1xuICBpZiAocXVldWUpIHtcbiAgICBxdWV1ZS5wdXNoKGNhbGxiYWNrcyk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWVkQ2FsbGJhY2tzLnNldCh0eXBlLCBbY2FsbGJhY2tzXSk7XG4gIH1cbn07XG5cbmNvbnN0IGVuc3VyZVdvcmtlciA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKGluaXRpYWxpemluZyB8fCAhaW5pdGlhbGl6ZWQgfHwgYWJvcnRlZCB8fCAhcHJveHlXb3JrZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3dvcmtlciBub3QgcmVhZHknKTtcbiAgfVxufTtcblxuY29uc3Qgb25Qcm94eVdvcmtlck1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudDxPcnRXYXNtTWVzc2FnZT4pOiB2b2lkID0+IHtcbiAgc3dpdGNoIChldi5kYXRhLnR5cGUpIHtcbiAgICBjYXNlICdpbml0LXdhc20nOlxuICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzWzFdKGV2LmRhdGEuZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgaW5pdFdhc21DYWxsYmFja3NbMF0oKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wb3JhcnlPYmplY3RVcmwpIHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0ZW1wb3JhcnlPYmplY3RVcmwpO1xuICAgICAgICB0ZW1wb3JhcnlPYmplY3RVcmwgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbml0LWVwJzpcbiAgICBjYXNlICdjb3B5LWZyb20nOlxuICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgY2FzZSAncmVsZWFzZSc6XG4gICAgY2FzZSAncnVuJzpcbiAgICBjYXNlICdlbmQtcHJvZmlsaW5nJzoge1xuICAgICAgY29uc3QgY2FsbGJhY2tzID0gcXVldWVkQ2FsbGJhY2tzLmdldChldi5kYXRhLnR5cGUpITtcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xuICAgICAgICBjYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2tzLnNoaWZ0KCkhWzBdKGV2LmRhdGEub3V0ISk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVXZWJBc3NlbWJseUFuZE9ydFJ1bnRpbWUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgY2FsbHMgdG8gJ2luaXRXYXNtKCknIGRldGVjdGVkLlwiKTtcbiAgfVxuICBpZiAoYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInByZXZpb3VzIGNhbGwgdG8gJ2luaXRXYXNtKCknIGZhaWxlZC5cIik7XG4gIH1cblxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHByb3h5V29ya2VyPy50ZXJtaW5hdGUoKTtcblxuICAgICAgdm9pZCBpbXBvcnRQcm94eVdvcmtlcigpLnRoZW4oKFtvYmplY3RVcmwsIHdvcmtlcl0pID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwcm94eVdvcmtlciA9IHdvcmtlcjtcbiAgICAgICAgICBwcm94eVdvcmtlci5vbmVycm9yID0gKGV2OiBFcnJvckV2ZW50KSA9PiByZWplY3QoZXYpO1xuICAgICAgICAgIHByb3h5V29ya2VyLm9ubWVzc2FnZSA9IG9uUHJveHlXb3JrZXJNZXNzYWdlO1xuICAgICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzID0gW3Jlc29sdmUsIHJlamVjdF07XG4gICAgICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdpbml0LXdhc20nLCBpbjogZW52IH07XG4gICAgICAgICAgcHJveHlXb3JrZXIucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgdGVtcG9yYXJ5T2JqZWN0VXJsID0gb2JqZWN0VXJsO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICB9LCByZWplY3QpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBpbml0aWFsaXplV2ViQXNzZW1ibHkoZW52Lndhc20pO1xuICAgICAgYXdhaXQgY29yZS5pbml0UnVudGltZShlbnYpO1xuICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZU9ydEVwID0gYXN5bmMgKGVwTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2luaXQtZXAnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2luaXQtZXAnLCBpbjogeyBlcE5hbWUsIGVudiB9IH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgY29yZS5pbml0RXAoZW52LCBlcE5hbWUpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29weUZyb21FeHRlcm5hbEJ1ZmZlciA9IGFzeW5jIChidWZmZXI6IFVpbnQ4QXJyYXkpOiBQcm9taXNlPFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdjb3B5LWZyb20nLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2NvcHktZnJvbScsIGluOiB7IGJ1ZmZlciB9IH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgW2J1ZmZlci5idWZmZXJdKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29yZS5jb3B5RnJvbUV4dGVybmFsQnVmZmVyKGJ1ZmZlcik7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID0gYXN5bmMgKFxuICBtb2RlbDogU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIgfCBVaW50OEFycmF5LFxuICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcbik6IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgLy8gY2hlY2sgdW5zdXBwb3J0ZWQgb3B0aW9uc1xuICAgIGlmIChvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXNzaW9uIG9wdGlvbiBcInByZWZlcnJlZE91dHB1dExvY2F0aW9uXCIgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XG4gICAgfVxuICAgIGVuc3VyZVdvcmtlcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2NyZWF0ZScsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAnY3JlYXRlJywgaW46IHsgbW9kZWwsIG9wdGlvbnM6IHsgLi4ub3B0aW9ucyB9IH0gfTtcbiAgICAgIGNvbnN0IHRyYW5zZmVyYWJsZTogVHJhbnNmZXJhYmxlW10gPSBbXTtcbiAgICAgIGlmIChtb2RlbCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgdHJhbnNmZXJhYmxlLnB1c2gobW9kZWwuYnVmZmVyKTtcbiAgICAgIH1cbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCB0cmFuc2ZlcmFibGUpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb3JlLmNyZWF0ZVNlc3Npb24obW9kZWwsIG9wdGlvbnMpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVsZWFzZVNlc3Npb24gPSBhc3luYyAoc2Vzc2lvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygncmVsZWFzZScsIFtyZXNvbHZlLCByZWplY3RdKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAncmVsZWFzZScsIGluOiBzZXNzaW9uSWQgfTtcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb3JlLnJlbGVhc2VTZXNzaW9uKHNlc3Npb25JZCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyAoXG4gIHNlc3Npb25JZDogbnVtYmVyLFxuICBpbnB1dEluZGljZXM6IG51bWJlcltdLFxuICBpbnB1dHM6IFRlbnNvck1ldGFkYXRhW10sXG4gIG91dHB1dEluZGljZXM6IG51bWJlcltdLFxuICBvdXRwdXRzOiBBcnJheTxUZW5zb3JNZXRhZGF0YSB8IG51bGw+LFxuICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXG4pOiBQcm9taXNlPFRlbnNvck1ldGFkYXRhW10+ID0+IHtcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcbiAgICAvLyBjaGVjayBpbnB1dHMgbG9jYXRpb25cbiAgICBpZiAoaW5wdXRzLnNvbWUoKHQpID0+IHRbM10gIT09ICdjcHUnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnB1dCB0ZW5zb3Igb24gR1BVIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICAvLyBjaGVjayBvdXRwdXRzIGxvY2F0aW9uXG4gICAgaWYgKG91dHB1dHMuc29tZSgodCkgPT4gdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncHJlLWFsbG9jYXRlZCBvdXRwdXQgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xuICAgIH1cbiAgICBlbnN1cmVXb3JrZXIoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygncnVuJywgW3Jlc29sdmUsIHJlamVjdF0pO1xuICAgICAgY29uc3Qgc2VyaWFsaXphYmxlSW5wdXRzID0gaW5wdXRzIGFzIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW107IC8vIGV2ZXJ5IGlucHV0IGlzIG9uIENQVS5cbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge1xuICAgICAgICB0eXBlOiAncnVuJyxcbiAgICAgICAgaW46IHsgc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0czogc2VyaWFsaXphYmxlSW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvcHRpb25zIH0sXG4gICAgICB9O1xuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIGNvcmUuZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMoc2VyaWFsaXphYmxlSW5wdXRzKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvcmUucnVuKHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG91dHB1dHMsIG9wdGlvbnMpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gYXN5bmMgKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XG4gICAgZW5zdXJlV29ya2VyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2VuZC1wcm9maWxpbmcnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2VuZC1wcm9maWxpbmcnLCBpbjogc2Vzc2lvbklkIH07XG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29yZS5lbmRQcm9maWxpbmcoc2Vzc2lvbklkKTtcbiAgfVxufTtcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHtcbiAgSW5mZXJlbmNlU2Vzc2lvbixcbiAgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIsXG4gIFNlc3Npb25IYW5kbGVyLFxuICBUZW5zb3IsXG4gIFRSQUNFX0ZVTkNfQkVHSU4sXG4gIFRSQUNFX0ZVTkNfRU5ELFxufSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuXG5pbXBvcnQgeyBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciwgVGVuc29yTWV0YWRhdGEgfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcbmltcG9ydCB7IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIsIGNyZWF0ZVNlc3Npb24sIGVuZFByb2ZpbGluZywgcmVsZWFzZVNlc3Npb24sIHJ1biB9IGZyb20gJy4vcHJveHktd3JhcHBlcic7XG5pbXBvcnQgeyBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUsIGlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlIH0gZnJvbSAnLi93YXNtLWNvbW1vbic7XG5pbXBvcnQgeyBpc05vZGUgfSBmcm9tICcuL3dhc20tdXRpbHMtZW52JztcbmltcG9ydCB7IGxvYWRGaWxlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWxvYWQtZmlsZSc7XG5cbmV4cG9ydCBjb25zdCBlbmNvZGVUZW5zb3JNZXRhZGF0YSA9ICh0ZW5zb3I6IFRlbnNvciwgZ2V0TmFtZTogKCkgPT4gc3RyaW5nKTogVGVuc29yTWV0YWRhdGEgPT4ge1xuICBzd2l0Y2ggKHRlbnNvci5sb2NhdGlvbikge1xuICAgIGNhc2UgJ2NwdSc6XG4gICAgICByZXR1cm4gW3RlbnNvci50eXBlLCB0ZW5zb3IuZGltcywgdGVuc29yLmRhdGEsICdjcHUnXTtcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcbiAgICAgIHJldHVybiBbdGVuc29yLnR5cGUsIHRlbnNvci5kaW1zLCB7IGdwdUJ1ZmZlcjogdGVuc29yLmdwdUJ1ZmZlciB9LCAnZ3B1LWJ1ZmZlciddO1xuICAgIGNhc2UgJ21sLXRlbnNvcic6XG4gICAgICByZXR1cm4gW3RlbnNvci50eXBlLCB0ZW5zb3IuZGltcywgeyBtbFRlbnNvcjogdGVuc29yLm1sVGVuc29yIH0sICdtbC10ZW5zb3InXTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGRhdGEgbG9jYXRpb246ICR7dGVuc29yLmxvY2F0aW9ufSBmb3IgJHtnZXROYW1lKCl9YCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkZWNvZGVUZW5zb3JNZXRhZGF0YSA9ICh0ZW5zb3I6IFRlbnNvck1ldGFkYXRhKTogVGVuc29yID0+IHtcbiAgc3dpdGNoICh0ZW5zb3JbM10pIHtcbiAgICBjYXNlICdjcHUnOlxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3IodGVuc29yWzBdLCB0ZW5zb3JbMl0sIHRlbnNvclsxXSk7XG4gICAgY2FzZSAnZ3B1LWJ1ZmZlcic6IHtcbiAgICAgIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xuICAgICAgaWYgKCFpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUoZGF0YVR5cGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbm90IHN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7ZGF0YVR5cGV9IGZvciBkZXNlcmlhbGl6aW5nIEdQVSB0ZW5zb3JgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgZ3B1QnVmZmVyLCBkb3dubG9hZCwgZGlzcG9zZSB9ID0gdGVuc29yWzJdO1xuICAgICAgcmV0dXJuIFRlbnNvci5mcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwgeyBkYXRhVHlwZSwgZGltczogdGVuc29yWzFdLCBkb3dubG9hZCwgZGlzcG9zZSB9KTtcbiAgICB9XG4gICAgY2FzZSAnbWwtdGVuc29yJzoge1xuICAgICAgY29uc3QgZGF0YVR5cGUgPSB0ZW5zb3JbMF07XG4gICAgICBpZiAoIWlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlKGRhdGFUeXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZGF0YSB0eXBlOiAke2RhdGFUeXBlfSBmb3IgZGVzZXJpYWxpemluZyBNTFRlbnNvciB0ZW5zb3JgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgbWxUZW5zb3IsIGRvd25sb2FkLCBkaXNwb3NlIH0gPSB0ZW5zb3JbMl07XG4gICAgICByZXR1cm4gVGVuc29yLmZyb21NTFRlbnNvcihtbFRlbnNvciwgeyBkYXRhVHlwZSwgZGltczogdGVuc29yWzFdLCBkb3dubG9hZCwgZGlzcG9zZSB9KTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvclszXX1gKTtcbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlTZXNzaW9uSGFuZGxlciBpbXBsZW1lbnRzIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIHtcbiAgcHJpdmF0ZSBzZXNzaW9uSWQ6IG51bWJlcjtcblxuICBpbnB1dE5hbWVzOiBzdHJpbmdbXTtcbiAgb3V0cHV0TmFtZXM6IHN0cmluZ1tdO1xuXG4gIGFzeW5jIGZldGNoTW9kZWxBbmRDb3B5VG9XYXNtTWVtb3J5KHBhdGg6IHN0cmluZyk6IFByb21pc2U8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXI+IHtcbiAgICAvLyBmZXRjaCBtb2RlbCBmcm9tIHVybCBhbmQgbW92ZSB0byB3YXNtIGhlYXAuXG4gICAgcmV0dXJuIGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIoYXdhaXQgbG9hZEZpbGUocGF0aCkpO1xuICB9XG5cbiAgYXN5bmMgbG9hZE1vZGVsKHBhdGhPckJ1ZmZlcjogc3RyaW5nIHwgVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBUUkFDRV9GVU5DX0JFR0lOKCk7XG4gICAgbGV0IG1vZGVsOiBQYXJhbWV0ZXJzPHR5cGVvZiBjcmVhdGVTZXNzaW9uPlswXTtcblxuICAgIGlmICh0eXBlb2YgcGF0aE9yQnVmZmVyID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAvLyBub2RlXG4gICAgICAgIG1vZGVsID0gYXdhaXQgbG9hZEZpbGUocGF0aE9yQnVmZmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJyb3dzZXJcbiAgICAgICAgLy8gZmV0Y2ggbW9kZWwgYW5kIGNvcHkgdG8gd2FzbSBoZWFwLlxuICAgICAgICBtb2RlbCA9IGF3YWl0IHRoaXMuZmV0Y2hNb2RlbEFuZENvcHlUb1dhc21NZW1vcnkocGF0aE9yQnVmZmVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbW9kZWwgPSBwYXRoT3JCdWZmZXI7XG4gICAgfVxuXG4gICAgW3RoaXMuc2Vzc2lvbklkLCB0aGlzLmlucHV0TmFtZXMsIHRoaXMub3V0cHV0TmFtZXNdID0gYXdhaXQgY3JlYXRlU2Vzc2lvbihtb2RlbCwgb3B0aW9ucyk7XG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcbiAgfVxuXG4gIGFzeW5jIGRpc3Bvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHJlbGVhc2VTZXNzaW9uKHRoaXMuc2Vzc2lvbklkKTtcbiAgfVxuXG4gIGFzeW5jIHJ1bihcbiAgICBmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLFxuICAgIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLFxuICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlPiB7XG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xuICAgIGNvbnN0IGlucHV0QXJyYXk6IFRlbnNvcltdID0gW107XG4gICAgY29uc3QgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICAgIE9iamVjdC5lbnRyaWVzKGZlZWRzKS5mb3JFYWNoKChrdnApID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBrdnBbMF07XG4gICAgICBjb25zdCB0ZW5zb3IgPSBrdnBbMV07XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5wdXROYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgaW5wdXQgJyR7bmFtZX0nYCk7XG4gICAgICB9XG4gICAgICBpbnB1dEFycmF5LnB1c2godGVuc29yKTtcbiAgICAgIGlucHV0SW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG91dHB1dEFycmF5OiBBcnJheTxUZW5zb3IgfCBudWxsPiA9IFtdO1xuICAgIGNvbnN0IG91dHB1dEluZGljZXM6IG51bWJlcltdID0gW107XG4gICAgT2JqZWN0LmVudHJpZXMoZmV0Y2hlcykuZm9yRWFjaCgoa3ZwKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga3ZwWzBdO1xuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm91dHB1dE5hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvdXRwdXQgJyR7bmFtZX0nYCk7XG4gICAgICB9XG4gICAgICBvdXRwdXRBcnJheS5wdXNoKHRlbnNvcik7XG4gICAgICBvdXRwdXRJbmRpY2VzLnB1c2goaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaW5wdXRzID0gaW5wdXRBcnJheS5tYXAoKHQsIGkpID0+XG4gICAgICBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgaW5wdXQgXCIke3RoaXMuaW5wdXROYW1lc1tpbnB1dEluZGljZXNbaV1dfVwiYCksXG4gICAgKTtcbiAgICBjb25zdCBvdXRwdXRzID0gb3V0cHV0QXJyYXkubWFwKCh0LCBpKSA9PlxuICAgICAgdCA/IGVuY29kZVRlbnNvck1ldGFkYXRhKHQsICgpID0+IGBvdXRwdXQgXCIke3RoaXMub3V0cHV0TmFtZXNbb3V0cHV0SW5kaWNlc1tpXV19XCJgKSA6IG51bGwsXG4gICAgKTtcblxuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBydW4odGhpcy5zZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IHJlc3VsdE1hcDogU2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZSA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0TWFwW3RoaXMub3V0cHV0TmFtZXNbb3V0cHV0SW5kaWNlc1tpXV1dID0gb3V0cHV0QXJyYXlbaV0gPz8gZGVjb2RlVGVuc29yTWV0YWRhdGEocmVzdWx0c1tpXSk7XG4gICAgfVxuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XG4gICAgcmV0dXJuIHJlc3VsdE1hcDtcbiAgfVxuXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQge1xuICAgIC8vIFRPRE86IGltcGxlbWVudCBwcm9maWxpbmdcbiAgfVxuXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkIHtcbiAgICB2b2lkIGVuZFByb2ZpbGluZyh0aGlzLnNlc3Npb25JZCk7XG4gIH1cbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgQmFja2VuZCwgZW52LCBJbmZlcmVuY2VTZXNzaW9uLCBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5cbmltcG9ydCB7IGluaXRpYWxpemVPcnRFcCwgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSB9IGZyb20gJy4vd2FzbS9wcm94eS13cmFwcGVyJztcbmltcG9ydCB7IE9ubnhydW50aW1lV2ViQXNzZW1ibHlTZXNzaW9uSGFuZGxlciB9IGZyb20gJy4vd2FzbS9zZXNzaW9uLWhhbmRsZXItaW5mZXJlbmNlJztcbmltcG9ydCB7IHNjcmlwdFNyYyB9IGZyb20gJy4vd2FzbS93YXNtLXV0aWxzLWltcG9ydCc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyBhbGwgZmxhZ3MgZm9yIFdlYkFzc2VtYmx5LlxuICpcbiAqIFRob3NlIGZsYWdzIGFyZSBhY2Nlc3NpYmxlIGZyb20gYG9ydC5lbnYud2FzbWAuIFVzZXJzIGFyZSBhbGxvdyB0byBzZXQgdGhvc2UgZmxhZ3MgYmVmb3JlIHRoZSBmaXJzdCBpbmZlcmVuY2Ugc2Vzc2lvblxuICogYmVpbmcgY3JlYXRlZCwgdG8gb3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVGbGFncyA9ICgpOiB2b2lkID0+IHtcbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5pbml0VGltZW91dCAhPT0gJ251bWJlcicgfHwgZW52Lndhc20uaW5pdFRpbWVvdXQgPCAwKSB7XG4gICAgZW52Lndhc20uaW5pdFRpbWVvdXQgPSAwO1xuICB9XG5cbiAgaWYgKGVudi53YXNtLnNpbWQgPT09IGZhbHNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnRGVwcmVjYXRlZCBwcm9wZXJ0eSBcImVudi53YXNtLnNpbWRcIiBpcyBzZXQgdG8gZmFsc2UuICcgK1xuICAgICAgICAnbm9uLVNJTUQgYnVpbGQgaXMgbm8gbG9uZ2VyIHByb3ZpZGVkLCBhbmQgdGhpcyBzZXR0aW5nIHdpbGwgYmUgaWdub3JlZC4nLFxuICAgICk7XG4gIH1cblxuICBpZiAodHlwZW9mIGVudi53YXNtLnByb3h5ICE9PSAnYm9vbGVhbicpIHtcbiAgICBlbnYud2FzbS5wcm94eSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbnYud2FzbS50cmFjZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgZW52Lndhc20udHJhY2UgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW52Lndhc20ubnVtVGhyZWFkcyAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIoZW52Lndhc20ubnVtVGhyZWFkcykgfHwgZW52Lndhc20ubnVtVGhyZWFkcyA8PSAwKSB7XG4gICAgLy8gVGhlIGZvbGxvd2luZyBsb2dpYyBvbmx5IGFwcGxpZXMgd2hlbiBgb3J0LmVudi53YXNtLm51bVRocmVhZHNgIGlzIG5vdCBzZXQgYnkgdXNlci4gV2Ugd2lsbCBhbHdheXMgaG9ub3IgdXNlcidzXG4gICAgLy8gc2V0dGluZyBpZiBpdCBpcyBwcm92aWRlZC5cblxuICAgIC8vIEJyb3dzZXI6IHdoZW4gY3Jvc3NPcmlnaW5Jc29sYXRlZCBpcyBmYWxzZSwgU2hhcmVkQXJyYXlCdWZmZXIgaXMgbm90IGF2YWlsYWJsZSBzbyBXZWJBc3NlbWJseSB0aHJlYWRzIHdpbGwgbm90XG4gICAgLy8gd29yay4gSW4gdGhpcyBjYXNlLCB3ZSB3aWxsIHNldCBudW1UaHJlYWRzIHRvIDEuXG4gICAgLy9cbiAgICAvLyBUaGVyZSBpcyBhbiBleGNlcHRpb246IHdoZW4gdGhlIGJyb3dzZXIgaXMgY29uZmlndXJlZCB0byBmb3JjZS1lbmFibGUgU2hhcmVkQXJyYXlCdWZmZXIgKGUuZy4gQ2hyb211aW0gd2l0aFxuICAgIC8vIC0tZW5hYmxlLWZlYXR1cmVzPVNoYXJlZEFycmF5QnVmZmVyKSwgaXQgaXMgcG9zc2libGUgdGhhdCBgc2VsZi5jcm9zc09yaWdpbklzb2xhdGVkYCBpcyBmYWxzZSBhbmRcbiAgICAvLyBTaGFyZWRBcnJheUJ1ZmZlciBpcyBhdmFpbGFibGUgYXQgdGhlIHNhbWUgdGltZS4gVGhpcyBpcyB1c3VhbGx5IGZvciB0ZXN0aW5nLiBJbiB0aGlzIGNhc2UsICB3ZSB3aWxsIHN0aWxsIHNldFxuICAgIC8vIG51bVRocmVhZHMgdG8gMSBoZXJlLiBJZiB3ZSB3YW50IHRvIGVuYWJsZSBtdWx0aS10aHJlYWRpbmcgaW4gdGVzdCwgd2Ugc2hvdWxkIHNldCBgb3J0LmVudi53YXNtLm51bVRocmVhZHNgIHRvIGFcbiAgICAvLyB2YWx1ZSBncmVhdGVyIHRoYW4gMS5cbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmICFzZWxmLmNyb3NzT3JpZ2luSXNvbGF0ZWQpIHtcbiAgICAgIGVudi53YXNtLm51bVRocmVhZHMgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBudW1DcHVMb2dpY2FsQ29yZXMgPVxuICAgICAgICB0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUoJ25vZGU6b3MnKS5jcHVzKCkubGVuZ3RoIDogbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3k7XG4gICAgICBlbnYud2FzbS5udW1UaHJlYWRzID0gTWF0aC5taW4oNCwgTWF0aC5jZWlsKChudW1DcHVMb2dpY2FsQ29yZXMgfHwgMSkgLyAyKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfRFlOQU1JQ19JTVBPUlQpIHtcbiAgICAvLyBvdmVyd3JpdGUgd2FzbSBwYXRocyBvdmVycmlkZSBpZiBub3Qgc2V0XG4gICAgaWYgKGVudi53YXNtLndhc21QYXRocyA9PT0gdW5kZWZpbmVkICYmIHNjcmlwdFNyYyAmJiBzY3JpcHRTcmMuaW5kZXhPZignYmxvYjonKSAhPT0gMCkge1xuICAgICAgZW52Lndhc20ud2FzbVBhdGhzID0gc2NyaXB0U3JjLnN1YnN0cmluZygwLCBzY3JpcHRTcmMubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kIGltcGxlbWVudHMgQmFja2VuZCB7XG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBXZWJBc3NlbWJseSBiYWNrZW5kLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIG9ubHkgb25jZSBmb3IgZWFjaCBiYWNrZW5kIG5hbWUuIEl0IHdpbGwgYmUgY2FsbGVkIHRoZSBmaXJzdCB0aW1lIHdoZW5cbiAgICogYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBpcyBjYWxsZWQgd2l0aCBhIHJlZ2lzdGVyZWQgYmFja2VuZCBuYW1lLlxuICAgKlxuICAgKiBAcGFyYW0gYmFja2VuZE5hbWUgLSB0aGUgcmVnaXN0ZXJlZCBiYWNrZW5kIG5hbWUuXG4gICAqL1xuICBhc3luYyBpbml0KGJhY2tlbmROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBwb3B1bGF0ZSB3YXNtIGZsYWdzXG4gICAgaW5pdGlhbGl6ZUZsYWdzKCk7XG5cbiAgICAvLyBpbml0IHdhc21cbiAgICBhd2FpdCBpbml0aWFsaXplV2ViQXNzZW1ibHlBbmRPcnRSdW50aW1lKCk7XG5cbiAgICAvLyBwZXJmb3JtZSBFUCBzcGVjaWZpYyBpbml0aWFsaXphdGlvblxuICAgIGF3YWl0IGluaXRpYWxpemVPcnRFcChiYWNrZW5kTmFtZSk7XG4gIH1cbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgcGF0aDogc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgYnVmZmVyOiBVaW50OEFycmF5LFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcbiAgYXN5bmMgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXG4gICAgcGF0aE9yQnVmZmVyOiBzdHJpbmcgfCBVaW50OEFycmF5LFxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPiB7XG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIoKTtcbiAgICBhd2FpdCBoYW5kbGVyLmxvYWRNb2RlbChwYXRoT3JCdWZmZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaGFuZGxlcik7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHdhc21CYWNrZW5kID0gbmV3IE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kKCk7XG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXMsIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMgKi9cblxuLy8gV2UgdXNlIFwicmVxdWlyZVwiIGluc3RlYWQgb2YgXCJpbXBvcnRcIiBoZXJlIGJlY2F1c2UgaW1wb3J0IHN0YXRlbWVudCBtdXN0IGJlIHB1dCBpbiB0b3AgbGV2ZWwuIE91ciBjdXJyZW50IGNvZGUgZG9lc1xuLy8gbm90IGFsbG93IGJ1bmRsZXIgdG8gdHJlZS1zaGFraW5nIGNvZGUgYXMgZXhwZWN0ZWQgYmVjYXVzZSBzb21lIGNvZGVzIGFyZSB0cmVhdGVkIGFzIGhhdmluZyBzaWRlIGVmZmVjdHMuXG4vLyBTbyB3ZSBpbXBvcnQgY29kZSBpbnNpZGUgdGhlIGlmLWNsYXVzZSB0byBhbGxvdyBidW5kbGVyIHJlbW92ZSB0aGUgY29kZSBzYWZlbHkuXG5cbmV4cG9ydCAqIGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XG5pbXBvcnQgKiBhcyBvcnQgZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0IG9ydDtcblxuaW1wb3J0IHsgcmVnaXN0ZXJCYWNrZW5kLCBlbnYgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xuaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbic7XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdMKSB7XG4gIGNvbnN0IG9ubnhqc0JhY2tlbmQgPSByZXF1aXJlKCcuL2JhY2tlbmQtb25ueGpzJykub25ueGpzQmFja2VuZDtcbiAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJnbCcsIG9ubnhqc0JhY2tlbmQsIC0xMCk7XG59XG5cbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU00pIHtcbiAgY29uc3Qgd2FzbUJhY2tlbmQgPSByZXF1aXJlKCcuL2JhY2tlbmQtd2FzbScpLndhc21CYWNrZW5kO1xuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQKSB7XG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJncHUnLCB3YXNtQmFja2VuZCwgNSk7XG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJubicsIHdhc21CYWNrZW5kLCA1KTtcbiAgfVxuICByZWdpc3RlckJhY2tlbmQoJ2NwdScsIHdhc21CYWNrZW5kLCAxMCk7XG4gIHJlZ2lzdGVyQmFja2VuZCgnd2FzbScsIHdhc21CYWNrZW5kLCAxMCk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnYudmVyc2lvbnMsICd3ZWInLCB7IHZhbHVlOiB2ZXJzaW9uLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IC9qcy9zY3JpcHRzL3VwZGF0ZS12ZXJzaW9uLnRzXG4vLyBEbyBub3QgbW9kaWZ5IGZpbGUgY29udGVudCBtYW51YWxseS5cblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMS4yMS4wLWRldi4yMDI0MTAyNC1kOWNhODRlZjk2JztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQWdCTSxVQUNBLDBCQVlPLGlCQXdDUCxnQ0F3Q087QUE3R2I7OztBQWdCQSxJQUFNLFdBQXFDLG9CQUFJLElBQUc7QUFDbEQsSUFBTSwyQkFBcUMsQ0FBQTtBQVlwQyxJQUFNLGtCQUFrQixDQUFDLE1BQWMsU0FBa0IsYUFBMEI7QUFDeEYsVUFBSSxXQUFXLE9BQU8sUUFBUSxTQUFTLGNBQWMsT0FBTyxRQUFRLGtDQUFrQyxZQUFZO0FBQ2hILGNBQU0saUJBQWlCLFNBQVMsSUFBSSxJQUFJO0FBQ3hDLFlBQUksbUJBQW1CLFFBQVc7QUFDaEMsbUJBQVMsSUFBSSxNQUFNLEVBQUUsU0FBUyxTQUFRLENBQUU7bUJBQy9CLGVBQWUsV0FBVyxVQUFVO0FBRTdDO21CQUNTLGVBQWUsYUFBYSxVQUFVO0FBQy9DLGNBQUksZUFBZSxZQUFZLFNBQVM7QUFDdEMsa0JBQU0sSUFBSSxNQUFNLDRCQUE0QixJQUFJLG9CQUFvQixRQUFRLEVBQUU7OztBQUlsRixZQUFJLFlBQVksR0FBRztBQUNqQixnQkFBTSxJQUFJLHlCQUF5QixRQUFRLElBQUk7QUFDL0MsY0FBSSxNQUFNLElBQUk7QUFDWixxQ0FBeUIsT0FBTyxHQUFHLENBQUM7O0FBR3RDLG1CQUFTQSxLQUFJLEdBQUdBLEtBQUkseUJBQXlCLFFBQVFBLE1BQUs7QUFDeEQsZ0JBQUksU0FBUyxJQUFJLHlCQUF5QkEsRUFBQyxDQUFDLEVBQUcsWUFBWSxVQUFVO0FBQ25FLHVDQUF5QixPQUFPQSxJQUFHLEdBQUcsSUFBSTtB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O0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSztBQUFBLFlBQzNHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsVUFDWixDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0YsU0FBUyxHQUFHO0FBQ1YsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBRUEsSUFBTSxrQkFBa0IsTUFBZTtBQUNyQyxVQUFJO0FBZUYsZUFBTyxZQUFZO0FBQUEsVUFDakIsSUFBSSxXQUFXO0FBQUEsWUFDYjtBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsWUFBSztBQUFBLFlBQUs7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUk7QUFBQSxZQUFHO0FBQUEsWUFBSTtBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSTtBQUFBLFlBQUs7QUFBQSxZQUFJO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUM3RztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFHO0FBQUEsWUFBRztBQUFBLFlBQUc7QUFBQSxZQUFLO0FBQUEsWUFBSztBQUFBLFlBQUc7QUFBQSxZQUFJO0FBQUEsVUFDMUQsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGLFNBQVMsR0FBRztBQUNWLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUVPLElBQU0sd0JBQXdCLE9BQU8sVUFBK0M7QUFDekYsVUFBSSxhQUFhO0FBQ2YsZUFBTyxRQUFRLFFBQVE7QUFBQSxNQUN6QjtBQUNBLFVBQUksY0FBYztBQUNoQixjQUFNLElBQUksTUFBTSx1REFBdUQ7QUFBQSxNQUN6RTtBQUNBLFVBQUksU0FBUztBQUNYLGNBQU0sSUFBSSxNQUFNLG9EQUFvRDtBQUFBLE1BQ3RFO0FBRUEscUJBQWU7QUFHZixZQUFNLFVBQVUsTUFBTTtBQUN0QixVQUFJLGFBQWEsTUFBTTtBQUd2QixVQUFJLENBQUMsZ0JBQWdCLEdBQUc7QUFDdEIsY0FBTSxJQUFJLE1BQU0sK0RBQStEO0FBQUEsTUFDakY7QUFHQSxZQUFNLHVCQUF1Qix1QkFBdUI7QUFDcEQsVUFBSSxhQUFhLEtBQUssQ0FBQyxzQkFBc0I7QUFDM0MsWUFBSSxPQUFPLFNBQVMsZUFBZSxDQUFDLEtBQUsscUJBQXFCO0FBRTVELGtCQUFRO0FBQUEsWUFDTixtQ0FDRSxhQUNBO0FBQUEsVUFFSjtBQUFBLFFBQ0Y7QUFHQSxnQkFBUTtBQUFBLFVBQ047QUFBQSxRQUNGO0FBR0EsY0FBTSxhQUFhLGFBQWE7QUFBQSxNQUNsQztBQUVBLFlBQU0sWUFBWSxNQUFNO0FBQ3hCLFlBQU0scUJBQXFCLE9BQU8sY0FBYyxXQUFXLFlBQVk7QUFDdkUsWUFBTSxzQkFBdUIsV0FBaUM7QUFDOUQsWUFBTSxrQkFBbUIscUJBQTZCLFFBQVE7QUFDOUQsWUFBTSx1QkFBd0IsV0FBaUM7QUFDL0QsWUFBTSxtQkFBb0Isc0JBQThCLFFBQVE7QUFDaEUsWUFBTSxxQkFBcUIsTUFBTTtBQUVqQyxZQUFNLENBQUMsV0FBVyxjQUFjLElBQUksTUFBTSxpQkFBaUIsaUJBQWlCLG9CQUFvQixhQUFhLENBQUM7QUFFOUcsVUFBSSxZQUFZO0FBRWhCLFlBQU0sUUFBOEIsQ0FBQztBQUdyQyxVQUFJLFVBQVUsR0FBRztBQUNmLGNBQU07QUFBQSxVQUNKLElBQUksUUFBUSxDQUFDLFlBQVk7QUFDdkIsdUJBQVcsTUFBTTtBQUNmLDBCQUFZO0FBQ1osc0JBQVE7QUFBQSxZQUNWLEdBQUcsT0FBTztBQUFBLFVBQ1osQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBR0EsWUFBTTtBQUFBLFFBQ0osSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQy9CLGdCQUFNLFNBQWlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUtyQztBQUFBLFVBQ0Y7QUFFQSxjQUFJLG9CQUFvQjtBQUl0QixtQkFBTyxhQUFhO0FBQUEsVUFDdEIsV0FBVyxvQkFBb0Isb0JBQW9CO0FBTWpELG1CQUFPLGFBQWEsQ0FBQyxVQUFVLG9CQUM3QixxQkFBcUIsc0JBQXNCLG1CQUFtQjtBQUFBLFVBQ2xFO0FBRUEseUJBQWUsTUFBTSxFQUFFO0FBQUE7QUFBQSxZQUVyQixDQUFDLFdBQVc7QUFDViw2QkFBZTtBQUNmLDRCQUFjO0FBQ2QscUJBQU87QUFDUCxzQkFBUTtBQUNSLGtCQUFJLFdBQVc7QUFDYixvQkFBSSxnQkFBZ0IsU0FBUztBQUFBLGNBQy9CO0FBQUEsWUFDRjtBQUFBO0FBQUEsWUFFQSxDQUFDLFNBQVM7QUFDUiw2QkFBZTtBQUNmLHdCQUFVO0FBQ1YscUJBQU8sSUFBSTtBQUFBLFlBQ2I7QUFBQSxVQUNGO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUVBLFlBQU0sUUFBUSxLQUFLLEtBQUs7QUFFeEIsVUFBSSxXQUFXO0FBQ2IsY0FBTSxJQUFJLE1BQU0sMkRBQTJELE9BQU8sSUFBSTtBQUFBLE1BQ3hGO0FBQUEsSUFDRjtBQUVPLElBQU0sY0FBYyxNQUFxQjtBQUM5QyxVQUFJLGVBQWUsTUFBTTtBQUN2QixlQUFPO0FBQUEsTUFDVDtBQUVBLFlBQU0sSUFBSSxNQUFNLHFDQUFxQztBQUFBLElBQ3ZEO0FBQUE7QUFBQTs7O0FDcE1BLElBS2EsaUJBZUEscUJBZ0NBO0FBcERiO0FBQUE7QUFBQTtBQUdBO0FBRU8sSUFBTSxrQkFBa0IsQ0FBQyxNQUFjLFdBQTZCO0FBQ3pFLFlBQU1DLFFBQU8sWUFBWTtBQUV6QixZQUFNLGFBQWFBLE1BQUssZ0JBQWdCLElBQUksSUFBSTtBQUNoRCxZQUFNLGFBQWFBLE1BQUssUUFBUSxVQUFVO0FBQzFDLE1BQUFBLE1BQUssYUFBYSxNQUFNLFlBQVksVUFBVTtBQUM5QyxhQUFPLEtBQUssVUFBVTtBQUV0QixhQUFPO0FBQUEsSUFDVDtBQU1PLElBQU0sc0JBQXNCLENBQ2pDLFNBQ0EsUUFDQSxNQUNBLFlBQ1M7QUFDVCxVQUFJLE9BQU8sV0FBVyxZQUFZLFlBQVksTUFBTTtBQUNsRCxZQUFJLEtBQUssSUFBSSxPQUFPLEdBQUc7QUFDckIsZ0JBQU0sSUFBSSxNQUFNLCtCQUErQjtBQUFBLFFBQ2pELE9BQU87QUFDTCxlQUFLLElBQUksT0FBTztBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUVBLGFBQU8sUUFBUSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxLQUFLLE1BQU07QUFDaEQsY0FBTSxPQUFPLFNBQVMsU0FBUyxNQUFNO0FBQ3JDLFlBQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsOEJBQW9CLE9BQWtDLE9BQU8sS0FBSyxNQUFNLE9BQU87QUFBQSxRQUNqRixXQUFXLE9BQU8sVUFBVSxZQUFZLE9BQU8sVUFBVSxVQUFVO0FBQ2pFLGtCQUFRLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFBQSxRQUNoQyxXQUFXLE9BQU8sVUFBVSxXQUFXO0FBQ3JDLGtCQUFRLE1BQU0sUUFBUSxNQUFNLEdBQUc7QUFBQSxRQUNqQyxPQUFPO0FBQ0wsZ0JBQU0sSUFBSSxNQUFNLG1DQUFtQyxPQUFPLEtBQUssRUFBRTtBQUFBLFFBQ25FO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQU1PLElBQU0saUJBQWlCLENBQUMsWUFBMEI7QUFDdkQsWUFBTUEsUUFBTyxZQUFZO0FBRXpCLFlBQU0sUUFBUUEsTUFBSyxVQUFVO0FBQzdCLFVBQUk7QUFDRixjQUFNLGVBQWVBLE1BQUssV0FBVyxDQUFDO0FBQ3RDLFFBQUFBLE1BQUssaUJBQWlCLGNBQWMsZUFBZSxDQUFDO0FBQ3BELGNBQU0sWUFBWUEsTUFBSyxPQUFPLGVBQWUsQ0FBQztBQUM5QyxjQUFNLHNCQUFzQkEsTUFBSyxRQUFRLGVBQWUsSUFBSSxDQUFDO0FBQzdELGNBQU0sZUFBZSxzQkFBc0JBLE1BQUssYUFBYSxtQkFBbUIsSUFBSTtBQUNwRixjQUFNLElBQUksTUFBTSxHQUFHLE9BQU8sZ0JBQWdCLFNBQVMsb0JBQW9CLFlBQVksRUFBRTtBQUFBLE1BQ3ZGLFVBQUU7QUFDQSxRQUFBQSxNQUFLLGFBQWEsS0FBSztBQUFBLE1BQ3pCO0FBQUEsSUFDRjtBQUFBO0FBQUE7OztBQ2xFQSxJQVFhO0FBUmI7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQUVPLElBQU0sZ0JBQWdCLENBQUMsWUFBNkQ7QUFDekYsWUFBTUMsUUFBTyxZQUFZO0FBQ3pCLFVBQUksbUJBQW1CO0FBQ3ZCLFlBQU0sU0FBbUIsQ0FBQztBQUUxQixZQUFNLGFBQTBDLFdBQVcsQ0FBQztBQUU1RCxVQUFJO0FBQ0YsWUFBSSxTQUFTLHFCQUFxQixRQUFXO0FBQzNDLHFCQUFXLG1CQUFtQjtBQUFBLFFBQ2hDLFdBQ0UsT0FBTyxRQUFRLHFCQUFxQixZQUNwQyxDQUFDLE9BQU8sVUFBVSxRQUFRLGdCQUFnQixLQUMxQyxRQUFRLG1CQUFtQixLQUMzQixRQUFRLG1CQUFtQixHQUMzQjtBQUNBLGdCQUFNLElBQUksTUFBTSxxQ0FBcUMsUUFBUSxnQkFBZ0IsRUFBRTtBQUFBLFFBQ2pGO0FBRUEsWUFBSSxTQUFTLHNCQUFzQixRQUFXO0FBQzVDLHFCQUFXLG9CQUFvQjtBQUFBLFFBQ2pDLFdBQVcsT0FBTyxRQUFRLHNCQUFzQixZQUFZLENBQUMsT0FBTyxVQUFVLFFBQVEsaUJBQWlCLEdBQUc7QUFDeEcsZ0JBQU0sSUFBSSxNQUFNLHFDQUFxQyxRQUFRLGlCQUFpQixFQUFFO0FBQUEsUUFDbEY7QUFFQSxZQUFJLFNBQVMsY0FBYyxRQUFXO0FBQ3BDLHFCQUFXLFlBQVk7QUFBQSxRQUN6QjtBQUVBLFlBQUksZ0JBQWdCO0FBQ3BCLFlBQUksU0FBUyxRQUFRLFFBQVc7QUFDOUIsMEJBQWdCLGdCQUFnQixRQUFRLEtBQUssTUFBTTtBQUFBLFFBQ3JEO0FBRUEsMkJBQW1CQSxNQUFLO0FBQUEsVUFDdEIsV0FBVztBQUFBLFVBQ1gsV0FBVztBQUFBLFVBQ1gsQ0FBQyxDQUFDLFdBQVc7QUFBQSxVQUNiO0FBQUEsUUFDRjtBQUNBLFlBQUkscUJBQXFCLEdBQUc7QUFDMUIseUJBQWUsMkJBQTJCO0FBQUEsUUFDNUM7QUFFQSxZQUFJLFNBQVMsVUFBVSxRQUFXO0FBQ2hDLDhCQUFvQixRQUFRLE9BQU8sSUFBSSxvQkFBSSxRQUFpQyxHQUFHLENBQUMsS0FBSyxVQUFVO0FBQzdGLGtCQUFNLGdCQUFnQixnQkFBZ0IsS0FBSyxNQUFNO0FBQ2pELGtCQUFNLGtCQUFrQixnQkFBZ0IsT0FBTyxNQUFNO0FBRXJELGdCQUFJQSxNQUFLLHNCQUFzQixrQkFBa0IsZUFBZSxlQUFlLE1BQU0sR0FBRztBQUN0Riw2QkFBZSxpQ0FBaUMsR0FBRyxNQUFNLEtBQUssR0FBRztBQUFBLFlBQ25FO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSDtBQUVBLGVBQU8sQ0FBQyxrQkFBa0IsTUFBTTtBQUFBLE1BQ2xDLFNBQVMsR0FBRztBQUNWLFlBQUkscUJBQXFCLEdBQUc7QUFDMUIsVUFBQUEsTUFBSyxzQkFBc0IsZ0JBQWdCO0FBQUEsUUFDN0M7QUFDQSxlQUFPLFFBQVEsQ0FBQyxVQUFVQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0FBQzNDLGNBQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBO0FBQUE7OztBQ3ZFQSxJQVFNLDBCQWVBLGtCQVdBLHNCQXNCQSx1QkF1RE87QUEvR2I7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQUVBLElBQU0sMkJBQTJCLENBQUMsMkJBQXFEO0FBQ3JGLGNBQVEsd0JBQXdCO0FBQUEsUUFDOUIsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVDtBQUNFLGdCQUFNLElBQUksTUFBTSx5Q0FBeUMsc0JBQXNCLEVBQUU7QUFBQSxNQUNyRjtBQUFBLElBQ0Y7QUFFQSxJQUFNLG1CQUFtQixDQUFDLGtCQUFxRDtBQUM3RSxjQUFRLGVBQWU7QUFBQSxRQUNyQixLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1Q7QUFDRSxnQkFBTSxJQUFJLE1BQU0sK0JBQStCLGFBQWEsRUFBRTtBQUFBLE1BQ2xFO0FBQUEsSUFDRjtBQUVBLElBQU0sdUJBQXVCLENBQUMsWUFBbUQ7QUFDL0UsVUFBSSxDQUFDLFFBQVEsT0FBTztBQUNsQixnQkFBUSxRQUFRLENBQUM7QUFBQSxNQUNuQjtBQUNBLFVBQUksQ0FBQyxRQUFRLE1BQU0sU0FBUztBQUMxQixnQkFBUSxNQUFNLFVBQVUsQ0FBQztBQUFBLE1BQzNCO0FBQ0EsWUFBTSxVQUFVLFFBQVEsTUFBTTtBQUM5QixVQUFJLENBQUMsUUFBUSw4QkFBOEI7QUFFekMsZ0JBQVEsK0JBQStCO0FBQUEsTUFDekM7QUFHQSxVQUNFLFFBQVEsc0JBQ1IsUUFBUSxtQkFBbUIsS0FBSyxDQUFDLFFBQVEsT0FBTyxPQUFPLFdBQVcsS0FBSyxHQUFHLFVBQVUsUUFBUSxHQUM1RjtBQUNBLGdCQUFRLG1CQUFtQjtBQUFBLE1BQzdCO0FBQUEsSUFDRjtBQUVBLElBQU0sd0JBQXdCLENBQzVCLHNCQUNBLG9CQUNBLFdBQ1M7QUFDVCxpQkFBVyxNQUFNLG9CQUFvQjtBQUNuQyxZQUFJLFNBQVMsT0FBTyxPQUFPLFdBQVcsS0FBSyxHQUFHO0FBRzlDLGdCQUFRLFFBQVE7QUFBQSxVQUNkLEtBQUs7QUFDSCxxQkFBUztBQUNULGdCQUFJLE9BQU8sT0FBTyxVQUFVO0FBQzFCLG9CQUFNLGVBQWU7QUFFckIsb0JBQU0sYUFBYyxjQUF1RDtBQUMzRSxrQkFBSSxZQUFZO0FBQ2Qsc0JBQU0sZ0JBQWdCLGdCQUFnQixjQUFjLE1BQU07QUFDMUQsc0JBQU0sa0JBQWtCLGdCQUFnQixZQUFZLE1BQU07QUFDMUQsb0JBQUksWUFBWSxFQUFFLDBCQUEwQixzQkFBc0IsZUFBZSxlQUFlLE1BQU0sR0FBRztBQUN2RyxpQ0FBZSxvREFBb0QsVUFBVSxHQUFHO0FBQUEsZ0JBQ2xGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFDQTtBQUFBLFVBQ0YsS0FBSztBQUNILHFCQUFTO0FBQ1QsZ0JBQUksT0FBTyxPQUFPLFVBQVU7QUFDMUIsb0JBQU0sZ0JBQWdCO0FBQ3RCLGtCQUFJLGVBQWUsaUJBQWlCO0FBQ2xDLG9CQUFJLGNBQWMsb0JBQW9CLFVBQVUsY0FBYyxvQkFBb0IsUUFBUTtBQUN4Rix3QkFBTSxJQUFJLE1BQU0sb0RBQW9ELGNBQWMsZUFBZSxFQUFFO0FBQUEsZ0JBQ3JHO0FBQ0Esc0JBQU0sZ0JBQWdCLGdCQUFnQixtQkFBbUIsTUFBTTtBQUMvRCxzQkFBTSxrQkFBa0IsZ0JBQWdCLGNBQWMsaUJBQWlCLE1BQU07QUFDN0Usb0JBQUksWUFBWSxFQUFFLDBCQUEwQixzQkFBc0IsZUFBZSxlQUFlLE1BQU0sR0FBRztBQUN2RyxpQ0FBZSx5REFBeUQsY0FBYyxlQUFlLEdBQUc7QUFBQSxnQkFDMUc7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUNBO0FBQUEsVUFDRixLQUFLO0FBQUEsVUFDTCxLQUFLO0FBQ0g7QUFBQSxVQUNGO0FBQ0Usa0JBQU0sSUFBSSxNQUFNLHFDQUFxQyxNQUFNLEVBQUU7QUFBQSxRQUNqRTtBQUVBLGNBQU0sbUJBQW1CLGdCQUFnQixRQUFRLE1BQU07QUFDdkQsWUFBSSxZQUFZLEVBQUUsNEJBQTRCLHNCQUFzQixnQkFBZ0IsTUFBTSxHQUFHO0FBQzNGLHlCQUFlLG9DQUFvQyxNQUFNLEdBQUc7QUFBQSxRQUM5RDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRU8sSUFBTSxvQkFBb0IsQ0FBQyxZQUFrRTtBQUNsRyxZQUFNQyxRQUFPLFlBQVk7QUFDekIsVUFBSSx1QkFBdUI7QUFDM0IsWUFBTSxTQUFtQixDQUFDO0FBRTFCLFlBQU0saUJBQWtELFdBQVcsQ0FBQztBQUNwRSwyQkFBcUIsY0FBYztBQUVuQyxVQUFJO0FBQ0YsY0FBTSx5QkFBeUIseUJBQXlCLGVBQWUsMEJBQTBCLEtBQUs7QUFDdEcsY0FBTSxnQkFBZ0IsaUJBQWlCLGVBQWUsaUJBQWlCLFlBQVk7QUFDbkYsY0FBTSxrQkFDSixPQUFPLGVBQWUsVUFBVSxXQUFXLGdCQUFnQixlQUFlLE9BQU8sTUFBTSxJQUFJO0FBRTdGLGNBQU0sbUJBQW1CLGVBQWUsb0JBQW9CO0FBQzVELFlBQUksQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLEtBQUssbUJBQW1CLEtBQUssbUJBQW1CLEdBQUc7QUFDdkYsZ0JBQU0sSUFBSSxNQUFNLHFDQUFxQyxnQkFBZ0IsRUFBRTtBQUFBLFFBQ3pFO0FBRUEsY0FBTSxvQkFBb0IsZUFBZSxxQkFBcUI7QUFDOUQsWUFBSSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsS0FBSyxvQkFBb0IsS0FBSyxvQkFBb0IsR0FBRztBQUMxRixnQkFBTSxJQUFJLE1BQU0scUNBQXFDLGlCQUFpQixFQUFFO0FBQUEsUUFDMUU7QUFFQSxjQUFNLCtCQUNKLE9BQU8sZUFBZSwyQkFBMkIsV0FDN0MsZ0JBQWdCLGVBQWUsd0JBQXdCLE1BQU0sSUFDN0Q7QUFFTiwrQkFBdUJBLE1BQUs7QUFBQSxVQUMxQjtBQUFBLFVBQ0EsQ0FBQyxDQUFDLGVBQWU7QUFBQSxVQUNqQixDQUFDLENBQUMsZUFBZTtBQUFBLFVBQ2pCO0FBQUEsVUFDQSxDQUFDLENBQUMsZUFBZTtBQUFBLFVBQ2pCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFDQSxZQUFJLHlCQUF5QixHQUFHO0FBQzlCLHlCQUFlLCtCQUErQjtBQUFBLFFBQ2hEO0FBRUEsWUFBSSxlQUFlLG9CQUFvQjtBQUNyQyxnQ0FBc0Isc0JBQXNCLGVBQWUsb0JBQW9CLE1BQU07QUFBQSxRQUN2RjtBQUVBLFlBQUksZUFBZSx1QkFBdUIsUUFBVztBQUNuRCxjQUFJLE9BQU8sZUFBZSx1QkFBdUIsV0FBVztBQUMxRCxrQkFBTSxJQUFJLE1BQU0sK0NBQStDLGVBQWUsa0JBQWtCLEVBQUU7QUFBQSxVQUNwRztBQUNBLGdCQUFNLGdCQUFnQixnQkFBZ0Isc0JBQXNCLE1BQU07QUFDbEUsZ0JBQU0sa0JBQWtCLGdCQUFnQixlQUFlLG1CQUFtQixTQUFTLEdBQUcsTUFBTTtBQUM1RixjQUFJQSxNQUFLLDBCQUEwQixzQkFBc0IsZUFBZSxlQUFlLE1BQU0sR0FBRztBQUM5RjtBQUFBLGNBQ0UsNERBQTRELGVBQWUsa0JBQWtCO0FBQUEsWUFDL0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUVBLFlBQUksZUFBZSx3QkFBd0I7QUFDekMscUJBQVcsQ0FBQyxNQUFNLEtBQUssS0FBSyxPQUFPLFFBQVEsZUFBZSxzQkFBc0IsR0FBRztBQUNqRixnQkFBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixvQkFBTSxJQUFJLE1BQU0sa0RBQWtELElBQUksRUFBRTtBQUFBLFlBQzFFO0FBQ0EsZ0JBQUksT0FBTyxVQUFVLFlBQVksQ0FBQyxPQUFPLFVBQVUsS0FBSyxLQUFLLFFBQVEsR0FBRztBQUN0RSxvQkFBTSxJQUFJLE1BQU0saUVBQWlFLEtBQUssRUFBRTtBQUFBLFlBQzFGO0FBQ0Esa0JBQU0sYUFBYSxnQkFBZ0IsTUFBTSxNQUFNO0FBQy9DLGdCQUFJQSxNQUFLLDZCQUE2QixzQkFBc0IsWUFBWSxLQUFLLE1BQU0sR0FBRztBQUNwRiw2QkFBZSx3Q0FBd0MsSUFBSSxNQUFNLEtBQUssR0FBRztBQUFBLFlBQzNFO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSxZQUFJLGVBQWUsVUFBVSxRQUFXO0FBQ3RDLDhCQUFvQixlQUFlLE9BQU8sSUFBSSxvQkFBSSxRQUFpQyxHQUFHLENBQUMsS0FBSyxVQUFVO0FBQ3BHLGtCQUFNLGdCQUFnQixnQkFBZ0IsS0FBSyxNQUFNO0FBQ2pELGtCQUFNLGtCQUFrQixnQkFBZ0IsT0FBTyxNQUFNO0FBRXJELGdCQUFJQSxNQUFLLDBCQUEwQixzQkFBc0IsZUFBZSxlQUFlLE1BQU0sR0FBRztBQUM5Riw2QkFBZSxxQ0FBcUMsR0FBRyxNQUFNLEtBQUssR0FBRztBQUFBLFlBQ3ZFO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSDtBQUVBLGVBQU8sQ0FBQyxzQkFBc0IsTUFBTTtBQUFBLE1BQ3RDLFNBQVMsR0FBRztBQUNWLFlBQUkseUJBQXlCLEdBQUc7QUFDOUIsVUFBQUEsTUFBSywwQkFBMEIsb0JBQW9CO0FBQUEsUUFDckQ7QUFDQSxlQUFPLFFBQVEsQ0FBQyxVQUFVQSxNQUFLLE1BQU0sS0FBSyxDQUFDO0FBQzNDLGNBQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBO0FBQUE7OztBQy9NQSxJQTJDYSw0QkF5Q0EsNEJBMENBLDRCQXFDQSxtQ0FnREEsc0JBb0JBLDBCQWNBLHlCQWNBO0FBblFiO0FBQUE7QUFBQTtBQTJDTyxJQUFNLDZCQUE2QixDQUFDLFNBQTJCO0FBQ3BFLGNBQVEsTUFBTTtBQUFBLFFBQ1osS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBRVQ7QUFDRSxnQkFBTSxJQUFJLE1BQU0sMEJBQTBCLElBQUksRUFBRTtBQUFBLE1BQ3BEO0FBQUEsSUFDRjtBQUtPLElBQU0sNkJBQTZCLENBQUMsY0FBcUM7QUFDOUUsY0FBUSxXQUFXO0FBQUEsUUFDakIsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBRVQ7QUFDRSxnQkFBTSxJQUFJLE1BQU0sMEJBQTBCLFNBQVMsRUFBRTtBQUFBLE1BQ3pEO0FBQUEsSUFDRjtBQU1PLElBQU0sNkJBQTZCLENBQ3hDLFVBQ0EsZUFDdUI7QUFDdkIsWUFBTSxjQUFjO0FBQUEsUUFDbEI7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLE1BQ0YsRUFBRSxRQUFRO0FBRVYsWUFBTSxPQUFPLE9BQU8sZUFBZSxXQUFXLGFBQWEsV0FBVyxPQUFPLENBQUMsR0FBRyxNQUFNLElBQUksR0FBRyxDQUFDO0FBQy9GLGFBQU8sY0FBYyxJQUFJLEtBQUssS0FBSyxPQUFPLFdBQVcsSUFBSTtBQUFBLElBQzNEO0FBS08sSUFBTSxvQ0FBb0MsQ0FDL0MsU0FZK0I7QUFDL0IsY0FBUSxNQUFNO0FBQUEsUUFDWixLQUFLO0FBRUgsaUJBQU8sT0FBTyxpQkFBaUIsZUFBZSxhQUFhLE9BQU8sZUFBZTtBQUFBLFFBQ25GLEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVDtBQUNFLGdCQUFNLElBQUksTUFBTSxxQkFBcUIsSUFBSSxFQUFFO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBS08sSUFBTSx1QkFBdUIsQ0FBQyxhQUEwRTtBQUM3RyxjQUFRLFVBQVU7QUFBQSxRQUNoQixLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1Q7QUFDRSxnQkFBTSxJQUFJLE1BQU0sOEJBQThCLFFBQVEsRUFBRTtBQUFBLE1BQzVEO0FBQUEsSUFDRjtBQUtPLElBQU0sMkJBQTJCLENBQUMsU0FDdkMsU0FBUyxhQUNULFNBQVMsYUFDVCxTQUFTLFdBQ1QsU0FBUyxXQUNULFNBQVMsWUFDVCxTQUFTLFdBQ1QsU0FBUyxVQUNULFNBQVMsV0FDVCxTQUFTO0FBS0osSUFBTSwwQkFBMEIsQ0FBQyxTQUN0QyxTQUFTLGFBQ1QsU0FBUyxhQUNULFNBQVMsV0FDVCxTQUFTLFdBQ1QsU0FBUyxZQUNULFNBQVMsWUFDVCxTQUFTLFVBQ1QsU0FBUyxXQUNULFNBQVM7QUFLSixJQUFNLDJCQUEyQixDQUFDQyxjQUEwQztBQUNqRixjQUFRQSxXQUFVO0FBQUEsUUFDaEIsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1QsS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU87QUFBQSxRQUNULEtBQUs7QUFDSCxpQkFBTztBQUFBLFFBQ1Q7QUFDRSxnQkFBTSxJQUFJLE1BQU0sOEJBQThCQSxTQUFRLEVBQUU7QUFBQSxNQUM1RDtBQUFBLElBQ0Y7QUFBQTtBQUFBOzs7QUNwUkEsSUFXYTtBQVhiO0FBQUE7QUFBQTtBQUdBO0FBUU8sSUFBTSxXQUFXLE9BQU8sU0FBNEU7QUFDekcsVUFBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixZQUFJLFFBQVE7QUFFVixjQUFJO0FBQ0Ysa0JBQU0sRUFBRSxTQUFTLElBQUksVUFBUSxrQkFBa0I7QUFDL0MsbUJBQU8sSUFBSSxXQUFXLE1BQU0sU0FBUyxJQUFJLENBQUM7QUFBQSxVQUM1QyxTQUFTLEdBQUc7QUFDVixnQkFBSSxFQUFFLFNBQVMseUJBQXlCO0FBRXRDLG9CQUFNLEVBQUUsaUJBQWlCLElBQUksVUFBUSxTQUFTO0FBQzlDLG9CQUFNLFNBQVMsaUJBQWlCLElBQUk7QUFDcEMsb0JBQU0sU0FBdUIsQ0FBQztBQUM5QiwrQkFBaUIsU0FBUyxRQUFRO0FBQ2hDLHVCQUFPLEtBQUssS0FBSztBQUFBLGNBQ25CO0FBQ0EscUJBQU8sSUFBSSxXQUFXLE9BQU8sT0FBTyxNQUFNLENBQUM7QUFBQSxZQUM3QztBQUNBLGtCQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0YsT0FBTztBQUVMLGdCQUFNLFdBQVcsTUFBTSxNQUFNLElBQUk7QUFDakMsY0FBSSxDQUFDLFNBQVMsSUFBSTtBQUNoQixrQkFBTSxJQUFJLE1BQU0sc0NBQXNDLElBQUksRUFBRTtBQUFBLFVBQzlEO0FBQ0EsZ0JBQU0sc0JBQXNCLFNBQVMsUUFBUSxJQUFJLGdCQUFnQjtBQUNqRSxnQkFBTSxXQUFXLHNCQUFzQixTQUFTLHFCQUFxQixFQUFFLElBQUk7QUFDM0UsY0FBSSxXQUFXLFlBQXNCO0FBR25DLG1CQUFPLElBQUksV0FBVyxNQUFNLFNBQVMsWUFBWSxDQUFDO0FBQUEsVUFDcEQsT0FBTztBQUVMLGdCQUFJLENBQUMsU0FBUyxNQUFNO0FBQ2xCLG9CQUFNLElBQUksTUFBTSxzQ0FBc0MsSUFBSSxxQkFBcUI7QUFBQSxZQUNqRjtBQUNBLGtCQUFNLFNBQVMsU0FBUyxLQUFLLFVBQVU7QUFFdkMsZ0JBQUk7QUFDSixnQkFBSTtBQUVGLHVCQUFTLElBQUksWUFBWSxRQUFRO0FBQUEsWUFDbkMsU0FBUyxHQUFHO0FBQ1Ysa0JBQUksYUFBYSxZQUFZO0FBRTNCLHNCQUFNLFFBQVEsS0FBSyxLQUFLLFdBQVcsS0FBSztBQUN4Qyx5QkFBUyxJQUFJLFlBQVksT0FBTyxFQUFFLFNBQVMsT0FBTyxTQUFTLE1BQU0sQ0FBQyxFQUFFO0FBQUEsY0FDdEUsT0FBTztBQUNMLHNCQUFNO0FBQUEsY0FDUjtBQUFBLFlBQ0Y7QUFFQSxnQkFBSSxTQUFTO0FBRWIsbUJBQU8sTUFBTTtBQUNYLG9CQUFNLEVBQUUsTUFBTSxNQUFNLElBQUksTUFBTSxPQUFPLEtBQUs7QUFDMUMsa0JBQUksTUFBTTtBQUNSO0FBQUEsY0FDRjtBQUNBLG9CQUFNLFlBQVksTUFBTTtBQUN4QixvQkFBTSxRQUFRLElBQUksV0FBVyxRQUFRLFFBQVEsU0FBUztBQUN0RCxvQkFBTSxJQUFJLEtBQUs7QUFDZix3QkFBVTtBQUFBLFlBQ1o7QUFDQSxtQkFBTyxJQUFJLFdBQVcsUUFBUSxHQUFHLFFBQVE7QUFBQSxVQUMzQztBQUFBLFFBQ0Y7QUFBQSxNQUNGLFdBQVcsZ0JBQWdCLE1BQU07QUFDL0IsZUFBTyxJQUFJLFdBQVcsTUFBTSxLQUFLLFlBQVksQ0FBQztBQUFBLE1BQ2hELFdBQVcsZ0JBQWdCLFlBQVk7QUFDckMsZUFBTztBQUFBLE1BQ1QsT0FBTztBQUNMLGVBQU8sSUFBSSxXQUFXLElBQUk7QUFBQSxNQUM1QjtBQUFBLElBQ0Y7QUFBQTtBQUFBOzs7QUN0RkEsSUFpRk0sU0FXTyxhQVdBLFFBK0ZQLGdCQU9BLDRCQXFCTyx3QkFrQkEsZUFpTEEsZ0JBdUJBLDBCQWtHQSxLQWtVQSxjQWdCQTtBQWgzQmI7QUFBQTtBQUFBO0FBZ0JBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQW1EQSxJQUFNLFVBQVUsQ0FBQyxZQUFvQixpQkFBK0I7QUFDbEUsWUFBTSxZQUFZLFlBQVksRUFBRSxTQUFTLFlBQVksWUFBWTtBQUNqRSxVQUFJLGNBQWMsR0FBRztBQUNuQix1QkFBZSwrQkFBK0I7QUFBQSxNQUNoRDtBQUFBLElBQ0Y7QUFNTyxJQUFNLGNBQWMsT0FBT0MsU0FBNEI7QUFFNUQsY0FBUUEsS0FBSSxLQUFLLFlBQWEscUJBQXFCQSxLQUFJLFFBQVEsQ0FBQztBQUFBLElBQ2xFO0FBUU8sSUFBTSxTQUFTLE9BQU9BLE1BQVUsV0FBa0M7QUFDdkUsVUFBSSxPQUEwQjtBQUU1QixjQUFNLFdBQVcsS0FBdUI7QUFFeEMsWUFBSSxXQUFXLFVBQVU7QUFFdkIsY0FBSSxPQUFPLGNBQWMsZUFBZSxDQUFDLFVBQVUsS0FBSztBQUN0RCxrQkFBTSxJQUFJLE1BQU0sZ0RBQWdEO0FBQUEsVUFDbEU7QUFFQSxjQUFJLFVBQVVBLEtBQUksT0FBTztBQUN6QixjQUFJLENBQUMsU0FBUztBQUVaLGtCQUFNLGtCQUFrQkEsS0FBSSxPQUFPO0FBQ25DLGdCQUNFLG9CQUFvQixVQUNwQixvQkFBb0IsZUFDcEIsb0JBQW9CLG9CQUNwQjtBQUNBLG9CQUFNLElBQUksTUFBTSxxQ0FBcUMsZUFBZSxHQUFHO0FBQUEsWUFDekU7QUFDQSxrQkFBTSx1QkFBdUJBLEtBQUksT0FBTztBQUN4QyxnQkFBSSx5QkFBeUIsVUFBYSxPQUFPLHlCQUF5QixXQUFXO0FBQ25GLG9CQUFNLElBQUksTUFBTSwwQ0FBMEMsb0JBQW9CLEdBQUc7QUFBQSxZQUNuRjtBQUNBLHNCQUFVLE1BQU0sVUFBVSxJQUFJLGVBQWUsRUFBRSxpQkFBaUIscUJBQXFCLENBQUM7QUFDdEYsZ0JBQUksQ0FBQyxTQUFTO0FBQ1osb0JBQU0sSUFBSTtBQUFBLGdCQUNSO0FBQUEsY0FFRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGLE9BQU87QUFFTCxnQkFDRSxPQUFPLFFBQVEsV0FBVyxZQUMxQixPQUFPLFFBQVEsYUFBYSxZQUM1QixPQUFPLFFBQVEsa0JBQWtCLFlBQ2pDO0FBQ0Esb0JBQU0sSUFBSSxNQUFNLGtGQUFrRjtBQUFBLFlBQ3BHO0FBQUEsVUFDRjtBQUVBLGdCQUFNLFNBQVMsVUFBVSxZQUFZLEdBQUdBLE1BQUssT0FBTztBQUFBLFFBQ3REO0FBQ0EsWUFBSSxXQUFXLFNBQVM7QUFFdEIsY0FBSSxPQUFPLGNBQWMsZUFBZSxDQUFFLFVBQXlDLElBQUk7QUFDckYsa0JBQU0sSUFBSSxNQUFNLCtDQUErQztBQUFBLFVBQ2pFO0FBRUEsZ0JBQU0sU0FBUyxTQUFTLFlBQVksR0FBR0EsSUFBRztBQUFBLFFBQzVDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUF3Q0EsSUFBTSxpQkFBaUIsb0JBQUksSUFBNkI7QUFPeEQsSUFBTSw2QkFBNkIsQ0FBQyxrQkFBNEM7QUFDOUUsWUFBTUMsUUFBTyxZQUFZO0FBQ3pCLFlBQU0sUUFBUUEsTUFBSyxVQUFVO0FBQzdCLFVBQUk7QUFDRixjQUFNLGFBQWFBLE1BQUssV0FBVyxDQUFDO0FBQ3BDLGNBQU0sWUFBWUEsTUFBSyx3QkFBd0IsZUFBZSxZQUFZLGFBQWEsQ0FBQztBQUN4RixZQUFJLGNBQWMsR0FBRztBQUNuQix5QkFBZSx1Q0FBdUM7QUFBQSxRQUN4RDtBQUNBLGVBQU8sQ0FBQ0EsTUFBSyxPQUFPLGFBQWEsQ0FBQyxHQUFHQSxNQUFLLE9BQU8sYUFBYSxJQUFJLENBQUMsQ0FBQztBQUFBLE1BQ3RFLFVBQUU7QUFDQSxRQUFBQSxNQUFLLGFBQWEsS0FBSztBQUFBLE1BQ3pCO0FBQUEsSUFDRjtBQVFPLElBQU0seUJBQXlCLENBQUMsVUFBd0M7QUFDN0UsWUFBTUEsUUFBTyxZQUFZO0FBQ3pCLFlBQU0sa0JBQWtCQSxNQUFLLFFBQVEsTUFBTSxVQUFVO0FBQ3JELFVBQUksb0JBQW9CLEdBQUc7QUFDekIsY0FBTSxJQUFJLE1BQU0sK0RBQStELE1BQU0sVUFBVSxHQUFHO0FBQUEsTUFDcEc7QUFDQSxNQUFBQSxNQUFLLE9BQU8sSUFBSSxPQUFPLGVBQWU7QUFDdEMsYUFBTyxDQUFDLGlCQUFpQixNQUFNLFVBQVU7QUFBQSxJQUMzQztBQVVPLElBQU0sZ0JBQWdCLE9BQzNCLFdBQ0EsWUFDeUM7QUFDekMsVUFBSSxpQkFBeUI7QUFDN0IsWUFBTUEsUUFBTyxZQUFZO0FBRXpCLFVBQUksTUFBTSxRQUFRLFNBQVMsR0FBRztBQUU1QixTQUFDLGlCQUFpQixlQUFlLElBQUk7QUFBQSxNQUN2QyxXQUFXLFVBQVUsV0FBV0EsTUFBSyxPQUFPLFFBQVE7QUFFbEQsU0FBQyxpQkFBaUIsZUFBZSxJQUFJLENBQUMsVUFBVSxZQUFZLFVBQVUsVUFBVTtBQUFBLE1BQ2xGLE9BQU87QUFFTCxTQUFDLGlCQUFpQixlQUFlLElBQUksdUJBQXVCLFNBQVM7QUFBQSxNQUN2RTtBQUVBLFVBQUksZ0JBQWdCO0FBQ3BCLFVBQUksdUJBQXVCO0FBQzNCLFVBQUksa0JBQWtCO0FBQ3RCLFVBQUksU0FBbUIsQ0FBQztBQUN4QixZQUFNLHdCQUF3QixDQUFDO0FBQy9CLFlBQU0seUJBQXlCLENBQUM7QUFFaEMsVUFBSTtBQUNGLFNBQUMsc0JBQXNCLE1BQU0sSUFBSSxrQkFBa0IsT0FBTztBQUUxRCxZQUFJLFNBQVMsZ0JBQWdCQSxNQUFLLG1CQUFtQjtBQUNuRCxnQkFBTSxrQkFBa0IsQ0FBQztBQUN6QixxQkFBVyxRQUFRLFFBQVEsY0FBYztBQUN2QyxrQkFBTSxPQUFPLE9BQU8sU0FBUyxXQUFXLE9BQU8sS0FBSztBQUNwRCw0QkFBZ0I7QUFBQSxjQUNkLFNBQVMsT0FBTyxTQUFTLFdBQVcsT0FBTyxLQUFLLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUztBQUNuRSxnQkFBQUEsTUFBSyxrQkFBbUIsTUFBTSxJQUFJO0FBQUEsY0FDcEMsQ0FBQztBQUFBLFlBQ0g7QUFBQSxVQUNGO0FBR0EsZ0JBQU0sUUFBUSxJQUFJLGVBQWU7QUFBQSxRQUNuQztBQUVBLG1CQUFXLFlBQVksU0FBUyxzQkFBc0IsQ0FBQyxHQUFHO0FBQ3hELGdCQUFNLGVBQWUsT0FBTyxhQUFhLFdBQVcsV0FBVyxTQUFTO0FBQ3hFLGNBQUksaUJBQWlCLFNBQVM7QUFDNUIsWUFBQUEsTUFBSywyQkFBMkI7QUFDaEMsZ0JBQUlBLE1BQUssZ0JBQWdCO0FBQ3ZCLG9CQUFNLElBQUksTUFBTSwwQ0FBMEM7QUFBQSxZQUM1RDtBQUNBLGdCQUFJLE9BQU8sYUFBYSxVQUFVO0FBQ2hDLG9CQUFNLGVBQWU7QUFDckIsb0JBQU0sVUFBVyxjQUE2RDtBQUM5RSxvQkFBTSxZQUFhLGNBQXNEO0FBQ3pFLG9CQUFNLGFBQWMsY0FBdUQ7QUFDM0Usb0JBQU0sa0JBQW1CLGNBQXVEO0FBQ2hGLGtCQUFJLFNBQVM7QUFDWCxnQkFBQUEsTUFBSyxpQkFBaUI7QUFBQSxjQUN4QixXQUFXLFdBQVc7QUFDcEIsZ0JBQUFBLE1BQUssaUJBQWlCLE1BQU0sVUFBVSxHQUFHLGNBQWMsU0FBUztBQUFBLGNBQ2xFLE9BQU87QUFDTCxnQkFBQUEsTUFBSyxpQkFBaUIsTUFBTSxVQUFVLEdBQUcsY0FBYyxFQUFFLFlBQVksZ0JBQWdCLENBQUM7QUFBQSxjQUN4RjtBQUFBLFlBQ0YsT0FBTztBQUNMLGNBQUFBLE1BQUssaUJBQWlCLE1BQU0sVUFBVSxHQUFHLGNBQWM7QUFBQSxZQUN6RDtBQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSx3QkFBZ0IsTUFBTUEsTUFBSyxrQkFBa0IsaUJBQWlCLGlCQUFpQixvQkFBb0I7QUFDbkcsWUFBSSxrQkFBa0IsR0FBRztBQUN2Qix5QkFBZSx5QkFBeUI7QUFBQSxRQUMxQztBQUVBLFFBQUFBLE1BQUssc0JBQXNCO0FBRzNCLFlBQUlBLE1BQUssZ0JBQWdCO0FBQ3ZCLFVBQUFBLE1BQUssc0JBQXVCLGVBQWVBLE1BQUssY0FBYztBQUM5RCxVQUFBQSxNQUFLLGlCQUFpQjtBQUN0QixVQUFBQSxNQUFLLDJCQUEyQjtBQUFBLFFBQ2xDO0FBRUEsY0FBTSxDQUFDLFlBQVksV0FBVyxJQUFJLDJCQUEyQixhQUFhO0FBRTFFLGNBQU0scUJBQXFCLENBQUMsQ0FBQyxTQUFTO0FBRXRDLGNBQU0sYUFBYSxDQUFDO0FBQ3BCLGNBQU0sY0FBYyxDQUFDO0FBQ3JCLGNBQU0sMkJBQXdFLENBQUM7QUFDL0UsaUJBQVMsSUFBSSxHQUFHLElBQUksWUFBWSxLQUFLO0FBQ25DLGdCQUFNLE9BQU9BLE1BQUssaUJBQWlCLGVBQWUsQ0FBQztBQUNuRCxjQUFJLFNBQVMsR0FBRztBQUNkLDJCQUFlLDBCQUEwQjtBQUFBLFVBQzNDO0FBQ0EsZ0NBQXNCLEtBQUssSUFBSTtBQUMvQixxQkFBVyxLQUFLQSxNQUFLLGFBQWEsSUFBSSxDQUFDO0FBQUEsUUFDekM7QUFDQSxpQkFBUyxJQUFJLEdBQUcsSUFBSSxhQUFhLEtBQUs7QUFDcEMsZ0JBQU0sT0FBT0EsTUFBSyxrQkFBa0IsZUFBZSxDQUFDO0FBQ3BELGNBQUksU0FBUyxHQUFHO0FBQ2QsMkJBQWUsMkJBQTJCO0FBQUEsVUFDNUM7QUFDQSxpQ0FBdUIsS0FBSyxJQUFJO0FBQ2hDLGdCQUFNLGFBQWFBLE1BQUssYUFBYSxJQUFJO0FBQ3pDLHNCQUFZLEtBQUssVUFBVTtBQUUzQixjQUFJLE9BQTBCO0FBQzVCLGdCQUFJLHNCQUFzQixTQUFTLDRCQUE0QixRQUFXO0FBQ3hFLHVDQUF5QixLQUFLLFlBQVk7QUFDMUM7QUFBQSxZQUNGO0FBQ0Esa0JBQU1DLFlBQ0osT0FBTyxTQUFTLDRCQUE0QixXQUN4QyxRQUFRLDBCQUNQLFNBQVMsMEJBQTBCLFVBQVUsS0FBSztBQUN6RCxnQkFBSUEsY0FBYSxTQUFTQSxjQUFhLGdCQUFnQkEsY0FBYSxnQkFBZ0JBLGNBQWEsYUFBYTtBQUM1RyxvQkFBTSxJQUFJLE1BQU0sNENBQTRDQSxTQUFRLEdBQUc7QUFBQSxZQUN6RTtBQUNBLGdCQUFJLHNCQUFzQkEsY0FBYSxjQUFjO0FBQ25ELG9CQUFNLElBQUk7QUFBQSxnQkFDUiw0Q0FBNENBLFNBQVE7QUFBQSxjQUN0RDtBQUFBLFlBQ0Y7QUFDQSxxQ0FBeUIsS0FBS0EsU0FBUTtBQUFBLFVBQ3hDO0FBQUEsUUFDRjtBQUdBLFlBQUksZUFBc0M7QUFDMUMsWUFBSSxPQUEyRztBQUM3Ryw0QkFBa0JELE1BQUssa0JBQWtCLGFBQWE7QUFDdEQsY0FBSSxvQkFBb0IsR0FBRztBQUN6QiwyQkFBZSwwQkFBMEI7QUFBQSxVQUMzQztBQUVBLHlCQUFlO0FBQUEsWUFDYixRQUFRO0FBQUEsWUFDUjtBQUFBLFlBQ0EsaUNBQWlDLHlCQUF5QixJQUFJLENBQUMsTUFBTSx5QkFBeUIsQ0FBQyxDQUFDO0FBQUEsVUFDbEc7QUFBQSxRQUNGO0FBRUEsdUJBQWUsSUFBSSxlQUFlO0FBQUEsVUFDaEM7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0YsQ0FBQztBQUNELGVBQU8sQ0FBQyxlQUFlLFlBQVksV0FBVztBQUFBLE1BQ2hELFNBQVMsR0FBRztBQUNWLDhCQUFzQixRQUFRLENBQUMsUUFBUUEsTUFBSyxTQUFTLEdBQUcsQ0FBQztBQUN6RCwrQkFBdUIsUUFBUSxDQUFDLFFBQVFBLE1BQUssU0FBUyxHQUFHLENBQUM7QUFFMUQsWUFBSSxvQkFBb0IsR0FBRztBQUN6QixVQUFBQSxNQUFLLG1CQUFtQixlQUFlO0FBQUEsUUFDekM7QUFFQSxZQUFJLGtCQUFrQixHQUFHO0FBQ3ZCLFVBQUFBLE1BQUssbUJBQW1CLGFBQWE7QUFBQSxRQUN2QztBQUNBLGNBQU07QUFBQSxNQUNSLFVBQUU7QUFDQSxRQUFBQSxNQUFLLE1BQU0sZUFBZTtBQUMxQixZQUFJLHlCQUF5QixHQUFHO0FBQzlCLFVBQUFBLE1BQUssMEJBQTBCLG9CQUFvQjtBQUFBLFFBQ3JEO0FBQ0EsZUFBTyxRQUFRLENBQUMsVUFBVUEsTUFBSyxNQUFNLEtBQUssQ0FBQztBQUczQyxRQUFBQSxNQUFLLHNCQUFzQjtBQUFBLE1BQzdCO0FBQUEsSUFDRjtBQUVPLElBQU0saUJBQWlCLENBQUMsY0FBNEI7QUFDekQsWUFBTUEsUUFBTyxZQUFZO0FBQ3pCLFlBQU0sVUFBVSxlQUFlLElBQUksU0FBUztBQUM1QyxVQUFJLENBQUMsU0FBUztBQUNaLGNBQU0sSUFBSSxNQUFNLCtDQUErQyxTQUFTLEVBQUU7QUFBQSxNQUM1RTtBQUNBLFlBQU0sQ0FBQyxlQUFlLHVCQUF1Qix3QkFBd0IsZ0JBQWdCLGtCQUFrQixJQUFJO0FBRTNHLFVBQUksZ0JBQWdCO0FBQ2xCLFlBQUksb0JBQW9CO0FBQ3RCLFVBQUFBLE1BQUssc0JBQXNCLGVBQWUsTUFBTTtBQUFBLFFBQ2xEO0FBQ0EsUUFBQUEsTUFBSyxtQkFBbUIsZUFBZSxNQUFNO0FBQUEsTUFDL0M7QUFFQSxNQUFBQSxNQUFLLHVCQUF1QixTQUFTO0FBRXJDLDRCQUFzQixRQUFRLENBQUMsUUFBUUEsTUFBSyxTQUFTLEdBQUcsQ0FBQztBQUN6RCw2QkFBdUIsUUFBUSxDQUFDLFFBQVFBLE1BQUssU0FBUyxHQUFHLENBQUM7QUFDMUQsTUFBQUEsTUFBSyxtQkFBbUIsYUFBYTtBQUNyQyxxQkFBZSxPQUFPLFNBQVM7QUFBQSxJQUNqQztBQUVPLElBQU0sMkJBQTJCLENBQ3RDLFFBQ0EsZUFDQSxRQUNBLFdBQ0EsT0FDQSxxQkFBcUIsVUFDWjtBQUNULFVBQUksQ0FBQyxRQUFRO0FBQ1gsc0JBQWMsS0FBSyxDQUFDO0FBQ3BCO0FBQUEsTUFDRjtBQUVBLFlBQU1BLFFBQU8sWUFBWTtBQUV6QixZQUFNLFdBQVcsT0FBTyxDQUFDO0FBQ3pCLFlBQU0sT0FBTyxPQUFPLENBQUM7QUFDckIsWUFBTUMsWUFBVyxPQUFPLENBQUM7QUFFekIsVUFBSTtBQUNKLFVBQUk7QUFFSixVQUFJLGFBQWEsYUFBYUEsY0FBYSxnQkFBZ0JBLGNBQWEsY0FBYztBQUNwRixjQUFNLElBQUksTUFBTSx3Q0FBd0M7QUFBQSxNQUMxRDtBQUVBLFVBQUksc0JBQXNCQSxjQUFhLGNBQWM7QUFDbkQsY0FBTSxJQUFJO0FBQUEsVUFDUiwyREFBMkQsS0FBSztBQUFBLFFBQ2xFO0FBQUEsTUFDRjtBQUVBLFVBQUlBLGNBQWEsY0FBYztBQUM3QixjQUFNLFlBQVksT0FBTyxDQUFDLEVBQUU7QUFDNUIseUJBQWlCLDJCQUEyQiwyQkFBMkIsUUFBUSxHQUFHLElBQUk7QUFFdEYsY0FBTSxpQkFBaUJELE1BQUs7QUFDNUIsWUFBSSxDQUFDLGdCQUFnQjtBQUNuQixnQkFBTSxJQUFJLE1BQU0scUVBQXFFO0FBQUEsUUFDdkY7QUFDQSxrQkFBVSxlQUFlLFdBQVcsT0FBTyxXQUFXLGNBQWM7QUFBQSxNQUN0RSxXQUFXQyxjQUFhLGFBQWE7QUFDbkMsY0FBTSxXQUFXLE9BQU8sQ0FBQyxFQUFFO0FBQzNCLHlCQUFpQiwyQkFBMkIsMkJBQTJCLFFBQVEsR0FBRyxJQUFJO0FBRXRGLGNBQU0sbUJBQW1CRCxNQUFLO0FBQzlCLFlBQUksQ0FBQyxrQkFBa0I7QUFDckIsZ0JBQU0sSUFBSSxNQUFNLG1FQUFtRTtBQUFBLFFBQ3JGO0FBQ0Esa0JBQVUsaUJBQWlCLFVBQVUsMkJBQTJCLFFBQVEsR0FBRyxJQUFJO0FBQUEsTUFDakYsT0FBTztBQUNMLGNBQU0sT0FBTyxPQUFPLENBQUM7QUFFckIsWUFBSSxNQUFNLFFBQVEsSUFBSSxHQUFHO0FBRXZCLDJCQUFpQixJQUFJLEtBQUs7QUFDMUIsb0JBQVVBLE1BQUssUUFBUSxjQUFjO0FBQ3JDLGlCQUFPLEtBQUssT0FBTztBQUNuQixjQUFJLFlBQVksVUFBVTtBQUMxQixtQkFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsS0FBSztBQUNwQyxnQkFBSSxPQUFPLEtBQUssQ0FBQyxNQUFNLFVBQVU7QUFDL0Isb0JBQU0sSUFBSSxVQUFVLHdCQUF3QixDQUFDLGtCQUFrQjtBQUFBLFlBQ2pFO0FBQ0EsWUFBQUEsTUFBSyxRQUFRLFdBQVcsSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLEdBQUcsTUFBTTtBQUFBLFVBQzdEO0FBQUEsUUFDRixPQUFPO0FBQ0wsMkJBQWlCLEtBQUs7QUFDdEIsb0JBQVVBLE1BQUssUUFBUSxjQUFjO0FBQ3JDLGlCQUFPLEtBQUssT0FBTztBQUNuQixVQUFBQSxNQUFLLE9BQU8sSUFBSSxJQUFJLFdBQVcsS0FBSyxRQUFRLEtBQUssWUFBWSxjQUFjLEdBQUcsT0FBTztBQUFBLFFBQ3ZGO0FBQUEsTUFDRjtBQUVBLFlBQU0sUUFBUUEsTUFBSyxVQUFVO0FBQzdCLFlBQU0sYUFBYUEsTUFBSyxXQUFXLElBQUksS0FBSyxNQUFNO0FBQ2xELFVBQUk7QUFDRixZQUFJLFdBQVcsYUFBYTtBQUM1QixhQUFLLFFBQVEsQ0FBQyxNQUFPQSxNQUFLLE9BQU8sVUFBVSxJQUFJLENBQUU7QUFDakQsY0FBTUUsVUFBU0YsTUFBSztBQUFBLFVBQ2xCLDJCQUEyQixRQUFRO0FBQUEsVUFDbkM7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsS0FBSztBQUFBLFVBQ0wseUJBQXlCQyxTQUFRO0FBQUEsUUFDbkM7QUFDQSxZQUFJQyxZQUFXLEdBQUc7QUFDaEIseUJBQWUsaURBQWlELFNBQVMsV0FBVyxLQUFLLEdBQUc7QUFBQSxRQUM5RjtBQUNBLHNCQUFjLEtBQUtBLE9BQU07QUFBQSxNQUMzQixVQUFFO0FBQ0EsUUFBQUYsTUFBSyxhQUFhLEtBQUs7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFLTyxJQUFNLE1BQU0sT0FDakIsV0FDQSxjQUNBLGNBQ0EsZUFDQSxlQUNBLFlBQzhCO0FBQzlCLFlBQU1BLFFBQU8sWUFBWTtBQUN6QixZQUFNLFVBQVUsZUFBZSxJQUFJLFNBQVM7QUFDNUMsVUFBSSxDQUFDLFNBQVM7QUFDWixjQUFNLElBQUksTUFBTSw2Q0FBNkMsU0FBUyxFQUFFO0FBQUEsTUFDMUU7QUFDQSxZQUFNLGdCQUFnQixRQUFRLENBQUM7QUFDL0IsWUFBTSx3QkFBd0IsUUFBUSxDQUFDO0FBQ3ZDLFlBQU0seUJBQXlCLFFBQVEsQ0FBQztBQUN4QyxZQUFNLGlCQUFpQixRQUFRLENBQUM7QUFDaEMsWUFBTSxxQkFBcUIsUUFBUSxDQUFDO0FBQ3BDLFlBQU0sbUJBQW1CLFFBQVEsQ0FBQztBQUVsQyxZQUFNLGFBQWEsYUFBYTtBQUNoQyxZQUFNLGNBQWMsY0FBYztBQUVsQyxVQUFJLG1CQUFtQjtBQUN2QixVQUFJLG1CQUE2QixDQUFDO0FBRWxDLFlBQU0scUJBQStCLENBQUM7QUFDdEMsWUFBTSxzQkFBZ0MsQ0FBQztBQUN2QyxZQUFNLG9CQUE4QixDQUFDO0FBRXJDLFlBQU0saUJBQWlCQSxNQUFLLFVBQVU7QUFDdEMsWUFBTSxvQkFBb0JBLE1BQUssV0FBVyxhQUFhLENBQUM7QUFDeEQsWUFBTSxtQkFBbUJBLE1BQUssV0FBVyxhQUFhLENBQUM7QUFDdkQsWUFBTSxxQkFBcUJBLE1BQUssV0FBVyxjQUFjLENBQUM7QUFDMUQsWUFBTSxvQkFBb0JBLE1BQUssV0FBVyxjQUFjLENBQUM7QUFFekQsVUFBSTtBQUVGLFFBQUFBLE1BQUssaUJBQWlCLGFBQWE7QUFFbkMsU0FBQyxrQkFBa0IsZ0JBQWdCLElBQUksY0FBYyxPQUFPO0FBRzVELGlCQUFTLElBQUksR0FBRyxJQUFJLFlBQVksS0FBSztBQUNuQztBQUFBLFlBQ0UsYUFBYSxDQUFDO0FBQUEsWUFDZDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQSxhQUFhLENBQUM7QUFBQSxZQUNkO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFHQSxpQkFBUyxJQUFJLEdBQUcsSUFBSSxhQUFhLEtBQUs7QUFDcEM7QUFBQSxZQUNFLGNBQWMsQ0FBQztBQUFBLFlBQ2Y7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0EsYUFBYSxjQUFjLENBQUM7QUFBQSxZQUM1QjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxtQkFBbUIsb0JBQW9CO0FBQzNDLFlBQUksa0JBQWtCLG1CQUFtQjtBQUN6QyxZQUFJLG9CQUFvQixxQkFBcUI7QUFDN0MsWUFBSSxtQkFBbUIsb0JBQW9CO0FBQzNDLGlCQUFTLElBQUksR0FBRyxJQUFJLFlBQVksS0FBSztBQUNuQyxVQUFBQSxNQUFLLFFBQVEsa0JBQWtCLElBQUksbUJBQW1CLENBQUM7QUFDdkQsVUFBQUEsTUFBSyxRQUFRLGlCQUFpQixJQUFJLHNCQUFzQixhQUFhLENBQUMsQ0FBQztBQUFBLFFBQ3pFO0FBQ0EsaUJBQVMsSUFBSSxHQUFHLElBQUksYUFBYSxLQUFLO0FBQ3BDLFVBQUFBLE1BQUssUUFBUSxtQkFBbUIsSUFBSSxvQkFBb0IsQ0FBQztBQUN6RCxVQUFBQSxNQUFLLFFBQVEsa0JBQWtCLElBQUksdUJBQXVCLGNBQWMsQ0FBQyxDQUFDO0FBQUEsUUFDNUU7QUFFQSxZQUFJLE9BQWlFO0FBQ25FLGdCQUFNLEVBQUUsUUFBUSwwQkFBMEIsZ0NBQWdDLElBQUk7QUFFOUUsY0FBSSxzQkFBc0IsV0FBVyxZQUFZO0FBQy9DLGtCQUFNLElBQUk7QUFBQSxjQUNSLDJCQUEyQixVQUFVLDREQUE0RCxzQkFBc0IsTUFBTTtBQUFBLFlBQy9IO0FBQUEsVUFDRjtBQUdBLG1CQUFTLElBQUksR0FBRyxJQUFJLFlBQVksS0FBSztBQUNuQyxrQkFBTSxRQUFRLGFBQWEsQ0FBQztBQUM1QixrQkFBTUcsYUFBWSxNQUFNSCxNQUFLLGNBQWMsUUFBUSxzQkFBc0IsS0FBSyxHQUFHLG1CQUFtQixDQUFDLENBQUM7QUFDdEcsZ0JBQUlHLGVBQWMsR0FBRztBQUNuQiw2QkFBZSxvQkFBb0IsQ0FBQyxpQkFBaUIsU0FBUyxHQUFHO0FBQUEsWUFDbkU7QUFBQSxVQUNGO0FBR0EsbUJBQVMsSUFBSSxHQUFHLElBQUksYUFBYSxLQUFLO0FBQ3BDLGtCQUFNLFFBQVEsY0FBYyxDQUFDO0FBQzdCLGtCQUFNRixZQUFXLGNBQWMsQ0FBQyxJQUFJLENBQUM7QUFFckMsZ0JBQUlBLFdBQVU7QUFFWixvQkFBTUUsYUFBWUgsTUFBSyxlQUFlLFFBQVEsdUJBQXVCLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQUM7QUFDdEcsa0JBQUlHLGVBQWMsR0FBRztBQUNuQiwrQkFBZSxtQ0FBbUMsQ0FBQyxpQkFBaUIsU0FBUyxHQUFHO0FBQUEsY0FDbEY7QUFBQSxZQUNGLE9BQU87QUFFTCxvQkFBTUEsYUFBWUgsTUFBSztBQUFBLGdCQUNyQjtBQUFBLGdCQUNBLHVCQUF1QixLQUFLO0FBQUEsZ0JBQzVCO0FBQUEsZ0JBQ0EsZ0NBQWdDLEtBQUs7QUFBQSxjQUN2QztBQUNBLGtCQUFJRyxlQUFjLEdBQUc7QUFDbkIsK0JBQWUscUJBQXFCLENBQUMsUUFBUSx5QkFBeUIsQ0FBQyxDQUFDLGdCQUFnQixTQUFTLEdBQUc7QUFBQSxjQUN0RztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQ0EseUJBQWUsSUFBSSxXQUFXO0FBQUEsWUFDNUI7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0g7QUFFQSxZQUFJO0FBQ0osWUFBSSxPQUE0QztBQUM5QyxzQkFBWSxNQUFNSCxNQUFLO0FBQUEsWUFDckI7QUFBQSxZQUNBLGVBQWU7QUFBQSxZQUNmO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRixPQUFPO0FBQ0wsc0JBQVksTUFBTUEsTUFBSztBQUFBLFlBQ3JCO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxjQUFjLEdBQUc7QUFDbkIseUJBQWUsMEJBQTBCO0FBQUEsUUFDM0M7QUFFQSxjQUFNLFNBQTJCLENBQUM7QUFFbEMsaUJBQVMsSUFBSSxHQUFHLElBQUksYUFBYSxLQUFLO0FBQ3BDLGdCQUFNLFNBQVNBLE1BQUssUUFBUSxxQkFBcUIsSUFBSSxDQUFDO0FBQ3RELGNBQUksV0FBVyxvQkFBb0IsQ0FBQyxHQUFHO0FBRXJDLG1CQUFPLEtBQUssY0FBYyxDQUFDLENBQUU7QUFDN0I7QUFBQSxVQUNGO0FBRUEsZ0JBQU0sMkJBQTJCQSxNQUFLLFVBQVU7QUFFaEQsZ0JBQU0sbUJBQW1CQSxNQUFLLFdBQVcsSUFBSSxDQUFDO0FBRTlDLGNBQUksbUJBQW1CO0FBQ3ZCLGNBQUksTUFDRixhQUFhO0FBQ2YsY0FBSTtBQUNGLGtCQUFNRyxhQUFZSCxNQUFLO0FBQUEsY0FDckI7QUFBQSxjQUNBO0FBQUEsY0FDQSxtQkFBbUI7QUFBQSxjQUNuQixtQkFBbUI7QUFBQSxjQUNuQixtQkFBbUI7QUFBQSxZQUNyQjtBQUNBLGdCQUFJRyxlQUFjLEdBQUc7QUFDbkIsNkJBQWUsNENBQTRDLENBQUMsR0FBRztBQUFBLFlBQ2pFO0FBQ0EsZ0JBQUksa0JBQWtCLG1CQUFtQjtBQUN6QyxrQkFBTSxXQUFXSCxNQUFLLFFBQVEsaUJBQWlCO0FBQy9DLHlCQUFhQSxNQUFLLFFBQVEsaUJBQWlCO0FBQzNDLGtCQUFNLGFBQWFBLE1BQUssUUFBUSxpQkFBaUI7QUFDakQsa0JBQU0sYUFBYUEsTUFBSyxRQUFRLGlCQUFpQjtBQUNqRCxrQkFBTSxPQUFPLENBQUM7QUFDZCxxQkFBU0ksS0FBSSxHQUFHQSxLQUFJLFlBQVlBLE1BQUs7QUFDbkMsbUJBQUssS0FBS0osTUFBSyxRQUFRLGFBQWEsSUFBSUksRUFBQyxDQUFDO0FBQUEsWUFDNUM7QUFDQSxZQUFBSixNQUFLLFNBQVMsVUFBVTtBQUV4QixrQkFBTSxPQUFPLEtBQUssT0FBTyxDQUFDLEdBQUcsTUFBTSxJQUFJLEdBQUcsQ0FBQztBQUMzQyxtQkFBTywyQkFBMkIsUUFBUTtBQUUxQyxrQkFBTSxvQkFBb0IsZ0JBQWdCLHlCQUF5QixjQUFjLENBQUMsQ0FBQztBQUVuRixnQkFBSSxTQUFTLFVBQVU7QUFDckIsa0JBQUksc0JBQXNCLGdCQUFnQixzQkFBc0IsYUFBYTtBQUMzRSxzQkFBTSxJQUFJLE1BQU0sd0NBQXdDO0FBQUEsY0FDMUQ7QUFDQSxvQkFBTSxhQUF1QixDQUFDO0FBQzlCLGtCQUFJLFlBQVksYUFBYTtBQUM3Qix1QkFBU0ksS0FBSSxHQUFHQSxLQUFJLE1BQU1BLE1BQUs7QUFDN0Isc0JBQU0sU0FBU0osTUFBSyxRQUFRLFdBQVc7QUFDdkMsc0JBQU0saUJBQWlCSSxPQUFNLE9BQU8sSUFBSSxTQUFZSixNQUFLLFFBQVEsU0FBUyxJQUFJO0FBQzlFLDJCQUFXLEtBQUtBLE1BQUssYUFBYSxRQUFRLGNBQWMsQ0FBQztBQUFBLGNBQzNEO0FBQ0EscUJBQU8sS0FBSyxDQUFDLE1BQU0sTUFBTSxZQUFZLEtBQUssQ0FBQztBQUFBLFlBQzdDLE9BQU87QUFHTCxrQkFBSSxzQkFBc0IsZ0JBQWdCLE9BQU8sR0FBRztBQUNsRCxzQkFBTSxZQUFZQSxNQUFLO0FBQ3ZCLG9CQUFJLENBQUMsV0FBVztBQUNkLHdCQUFNLElBQUksTUFBTSx1RUFBdUU7QUFBQSxnQkFDekY7QUFDQSxzQkFBTSxZQUFZLFVBQVUsVUFBVTtBQUN0QyxzQkFBTSxhQUFhLDJCQUEyQixVQUFVLElBQUk7QUFDNUQsb0JBQUksZUFBZSxVQUFhLENBQUMseUJBQXlCLElBQUksR0FBRztBQUMvRCx3QkFBTSxJQUFJLE1BQU0sMEJBQTBCLElBQUksRUFBRTtBQUFBLGdCQUNsRDtBQUdBLG1DQUFtQjtBQUVuQix1QkFBTyxLQUFLO0FBQUEsa0JBQ1Y7QUFBQSxrQkFDQTtBQUFBLGtCQUNBO0FBQUEsb0JBQ0U7QUFBQSxvQkFDQSxVQUFVQSxNQUFLLHFCQUFzQixXQUFXLFlBQVksSUFBSTtBQUFBLG9CQUNoRSxTQUFTLE1BQU07QUFDYixzQkFBQUEsTUFBSyxrQkFBa0IsTUFBTTtBQUFBLG9CQUMvQjtBQUFBLGtCQUNGO0FBQUEsa0JBQ0E7QUFBQSxnQkFDRixDQUFDO0FBQUEsY0FDSCxXQUFXLHNCQUFzQixlQUFlLE9BQU8sR0FBRztBQUN4RCxzQkFBTSxlQUFlQSxNQUFLO0FBQzFCLG9CQUFJLENBQUMsY0FBYztBQUNqQix3QkFBTSxJQUFJLE1BQU0scUVBQXFFO0FBQUEsZ0JBQ3ZGO0FBQ0Esc0JBQU0sYUFBYSwyQkFBMkIsVUFBVSxJQUFJO0FBQzVELG9CQUFJLGVBQWUsVUFBYSxDQUFDLHdCQUF3QixJQUFJLEdBQUc7QUFDOUQsd0JBQU0sSUFBSSxNQUFNLDBCQUEwQixJQUFJLEVBQUU7QUFBQSxnQkFDbEQ7QUFLQSxzQkFBTSxXQUFXLE1BQU0sYUFBYSxZQUFZLFVBQVUsTUFBTSxLQUFLO0FBR3JFLG1DQUFtQjtBQUVuQix1QkFBTyxLQUFLO0FBQUEsa0JBQ1Y7QUFBQSxrQkFDQTtBQUFBLGtCQUNBO0FBQUEsb0JBQ0U7QUFBQSxvQkFDQSxVQUFVQSxNQUFLLDZCQUE4QixZQUFZLElBQUk7QUFBQSxvQkFDN0QsU0FBUyxNQUFNO0FBQ2Isc0JBQUFBLE1BQUssb0JBQXFCLFVBQVU7QUFDcEMsc0JBQUFBLE1BQUssa0JBQWtCLE1BQU07QUFBQSxvQkFDL0I7QUFBQSxrQkFDRjtBQUFBLGtCQUNBO0FBQUEsZ0JBQ0YsQ0FBQztBQUFBLGNBQ0gsT0FBTztBQUNMLHNCQUFNLHdCQUF3QixrQ0FBa0MsSUFBSTtBQUNwRSxzQkFBTSxPQUFPLElBQUksc0JBQXNCLElBQUk7QUFDM0Msb0JBQUksV0FBVyxLQUFLLFFBQVEsS0FBSyxZQUFZLEtBQUssVUFBVSxFQUFFO0FBQUEsa0JBQzVEQSxNQUFLLE9BQU8sU0FBUyxZQUFZLGFBQWEsS0FBSyxVQUFVO0FBQUEsZ0JBQy9EO0FBQ0EsdUJBQU8sS0FBSyxDQUFDLE1BQU0sTUFBTSxNQUFNLEtBQUssQ0FBQztBQUFBLGNBQ3ZDO0FBQUEsWUFDRjtBQUFBLFVBQ0YsVUFBRTtBQUNBLFlBQUFBLE1BQUssYUFBYSx3QkFBd0I7QUFDMUMsZ0JBQUksU0FBUyxZQUFZLFlBQVk7QUFDbkMsY0FBQUEsTUFBSyxNQUFNLFVBQVU7QUFBQSxZQUN2QjtBQUNBLGdCQUFJLENBQUMsa0JBQWtCO0FBQ3JCLGNBQUFBLE1BQUssa0JBQWtCLE1BQU07QUFBQSxZQUMvQjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxrQkFBa0IsQ0FBQyxvQkFBb0I7QUFDekMsVUFBQUEsTUFBSyxzQkFBc0IsZUFBZSxNQUFNO0FBQ2hELHlCQUFlLElBQUksV0FBVztBQUFBLFlBQzVCO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGLENBQUM7QUFBQSxRQUNIO0FBQ0EsZUFBTztBQUFBLE1BQ1QsVUFBRTtBQUNBLFFBQUFBLE1BQUssYUFBYSxjQUFjO0FBRWhDLDJCQUFtQixRQUFRLENBQUMsTUFBTUEsTUFBSyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNELDRCQUFvQixRQUFRLENBQUMsTUFBTUEsTUFBSyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzVELDBCQUFrQixRQUFRLENBQUMsTUFBTUEsTUFBSyxNQUFNLENBQUMsQ0FBQztBQUU5QyxZQUFJLHFCQUFxQixHQUFHO0FBQzFCLFVBQUFBLE1BQUssc0JBQXNCLGdCQUFnQjtBQUFBLFFBQzdDO0FBQ0EseUJBQWlCLFFBQVEsQ0FBQyxNQUFNQSxNQUFLLE1BQU0sQ0FBQyxDQUFDO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBS08sSUFBTSxlQUFlLENBQUMsY0FBNEI7QUFDdkQsWUFBTUEsUUFBTyxZQUFZO0FBQ3pCLFlBQU0sVUFBVSxlQUFlLElBQUksU0FBUztBQUM1QyxVQUFJLENBQUMsU0FBUztBQUNaLGNBQU0sSUFBSSxNQUFNLG9CQUFvQjtBQUFBLE1BQ3RDO0FBQ0EsWUFBTSxnQkFBZ0IsUUFBUSxDQUFDO0FBRy9CLFlBQU0sa0JBQWtCQSxNQUFLLGlCQUFpQixhQUFhO0FBQzNELFVBQUksb0JBQW9CLEdBQUc7QUFDekIsdUJBQWUsaUNBQWlDO0FBQUEsTUFDbEQ7QUFDQSxNQUFBQSxNQUFLLFNBQVMsZUFBZTtBQUFBLElBQy9CO0FBRU8sSUFBTSw2QkFBNkIsQ0FBQyxZQUFzRTtBQUMvRyxZQUFNLFVBQTZCLENBQUM7QUFDcEMsaUJBQVcsVUFBVSxTQUFTO0FBQzVCLGNBQU0sT0FBTyxPQUFPLENBQUM7QUFDckIsWUFBSSxDQUFDLE1BQU0sUUFBUSxJQUFJLEtBQUssWUFBWSxNQUFNO0FBQzVDLGtCQUFRLEtBQUssS0FBSyxNQUFNO0FBQUEsUUFDMUI7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQTtBQUFBOzs7QUN6M0JBLElBZ0JNLFNBQ0YsYUFDQUssZUFDQUMsY0FDQUMsVUFDQSxvQkFHQSxtQkFDRSxpQkFFQSxrQkFTQSxjQU1BLHNCQWtDTyxvQ0E2Q0EsaUJBYUFDLHlCQWFBQyxnQkF3QkFDLGlCQWFBQyxNQWdDQUM7QUF4TmI7QUFBQTtBQUFBO0FBR0E7QUFTQTtBQUNBO0FBQ0E7QUFFQSxJQUFNLFVBQVUsTUFBZSxDQUFDLENBQUNDLEtBQUksS0FBSyxTQUFTLE9BQU8sYUFBYTtBQUV2RSxJQUFJUixnQkFBZTtBQUNuQixJQUFJQyxlQUFjO0FBQ2xCLElBQUlDLFdBQVU7QUFLZCxJQUFNLGtCQUFpRixvQkFBSSxJQUFJO0FBRS9GLElBQU0sbUJBQW1CLENBQUMsTUFBOEIsY0FBK0M7QUFDckcsWUFBTSxRQUFRLGdCQUFnQixJQUFJLElBQUk7QUFDdEMsVUFBSSxPQUFPO0FBQ1QsY0FBTSxLQUFLLFNBQVM7QUFBQSxNQUN0QixPQUFPO0FBQ0wsd0JBQWdCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUFBLE1BQ3ZDO0FBQUEsSUFDRjtBQUVBLElBQU0sZUFBZSxNQUFZO0FBQy9CLFVBQUlGLGlCQUFnQixDQUFDQyxnQkFBZUMsWUFBVyxDQUFDLGFBQWE7QUFDM0QsY0FBTSxJQUFJLE1BQU0sa0JBQWtCO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBRUEsSUFBTSx1QkFBdUIsQ0FBQyxPQUEyQztBQUN2RSxjQUFRLEdBQUcsS0FBSyxNQUFNO0FBQUEsUUFDcEIsS0FBSztBQUNILFVBQUFGLGdCQUFlO0FBQ2YsY0FBSSxHQUFHLEtBQUssS0FBSztBQUNmLFlBQUFFLFdBQVU7QUFDViw4QkFBa0IsQ0FBQyxFQUFFLEdBQUcsS0FBSyxHQUFHO0FBQUEsVUFDbEMsT0FBTztBQUNMLFlBQUFELGVBQWM7QUFDZCw4QkFBa0IsQ0FBQyxFQUFFO0FBQUEsVUFDdkI7QUFDQSxjQUFJLG9CQUFvQjtBQUN0QixnQkFBSSxnQkFBZ0Isa0JBQWtCO0FBQ3RDLGlDQUFxQjtBQUFBLFVBQ3ZCO0FBQ0E7QUFBQSxRQUNGLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUssaUJBQWlCO0FBQ3BCLGdCQUFNLFlBQVksZ0JBQWdCLElBQUksR0FBRyxLQUFLLElBQUk7QUFDbEQsY0FBSSxHQUFHLEtBQUssS0FBSztBQUNmLHNCQUFVLE1BQU0sRUFBRyxDQUFDLEVBQUUsR0FBRyxLQUFLLEdBQUc7QUFBQSxVQUNuQyxPQUFPO0FBQ0wsc0JBQVUsTUFBTSxFQUFHLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBSTtBQUFBLFVBQ3BDO0FBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRU8sSUFBTSxxQ0FBcUMsWUFBMkI7QUFDM0UsVUFBSUEsY0FBYTtBQUNmO0FBQUEsTUFDRjtBQUNBLFVBQUlELGVBQWM7QUFDaEIsY0FBTSxJQUFJLE1BQU0sMENBQTBDO0FBQUEsTUFDNUQ7QUFDQSxVQUFJRSxVQUFTO0FBQ1gsY0FBTSxJQUFJLE1BQU0sdUNBQXVDO0FBQUEsTUFDekQ7QUFFQSxNQUFBRixnQkFBZTtBQUVmLFVBQXNDLFFBQVEsR0FBRztBQUMvQyxlQUFPLElBQUksUUFBYyxDQUFDLFNBQVMsV0FBVztBQUM1Qyx1QkFBYSxVQUFVO0FBRXZCLGVBQUssa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUMsV0FBVyxNQUFNLE1BQU07QUFDckQsZ0JBQUk7QUFDRiw0QkFBYztBQUNkLDBCQUFZLFVBQVUsQ0FBQyxPQUFtQixPQUFPLEVBQUU7QUFDbkQsMEJBQVksWUFBWTtBQUN4QixrQ0FBb0IsQ0FBQyxTQUFTLE1BQU07QUFDcEMsb0JBQU0sVUFBMEIsRUFBRSxNQUFNLGFBQWEsSUFBSVEsS0FBSTtBQUM3RCwwQkFBWSxZQUFZLE9BQU87QUFDL0IsbUNBQXFCO0FBQUEsWUFDdkIsU0FBUyxHQUFHO0FBQ1YscUJBQU8sQ0FBQztBQUFBLFlBQ1Y7QUFBQSxVQUNGLEdBQUcsTUFBTTtBQUFBLFFBQ1gsQ0FBQztBQUFBLE1BQ0gsT0FBTztBQUNMLFlBQUk7QUFDRixnQkFBTSxzQkFBc0JBLEtBQUksSUFBSTtBQUNwQyxnQkFBVyxZQUFZQSxJQUFHO0FBQzFCLFVBQUFQLGVBQWM7QUFBQSxRQUNoQixTQUFTLEdBQUc7QUFDVixVQUFBQyxXQUFVO0FBQ1YsZ0JBQU07QUFBQSxRQUNSLFVBQUU7QUFDQSxVQUFBRixnQkFBZTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFTyxJQUFNLGtCQUFrQixPQUFPLFdBQWtDO0FBQ3RFLFVBQXNDLFFBQVEsR0FBRztBQUMvQyxxQkFBYTtBQUNiLGVBQU8sSUFBSSxRQUFjLENBQUMsU0FBUyxXQUFXO0FBQzVDLDJCQUFpQixXQUFXLENBQUMsU0FBUyxNQUFNLENBQUM7QUFDN0MsZ0JBQU0sVUFBMEIsRUFBRSxNQUFNLFdBQVcsSUFBSSxFQUFFLFFBQVEsS0FBQVEsS0FBSSxFQUFFO0FBQ3ZFLHNCQUFhLFlBQVksT0FBTztBQUFBLFFBQ2xDLENBQUM7QUFBQSxNQUNILE9BQU87QUFDTCxjQUFXLE9BQU9BLE1BQUssTUFBTTtBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUVPLElBQU1MLDBCQUF5QixPQUFPLFdBQTREO0FBQ3ZHLFVBQXNDLFFBQVEsR0FBRztBQUMvQyxxQkFBYTtBQUNiLGVBQU8sSUFBSSxRQUFvQyxDQUFDLFNBQVMsV0FBVztBQUNsRSwyQkFBaUIsYUFBYSxDQUFDLFNBQVMsTUFBTSxDQUFDO0FBQy9DLGdCQUFNLFVBQTBCLEVBQUUsTUFBTSxhQUFhLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDcEUsc0JBQWEsWUFBWSxTQUFTLENBQUMsT0FBTyxNQUFNLENBQUM7QUFBQSxRQUNuRCxDQUFDO0FBQUEsTUFDSCxPQUFPO0FBQ0wsZUFBWSx1QkFBdUIsTUFBTTtBQUFBLE1BQzNDO0FBQUEsSUFDRjtBQUVPLElBQU1DLGlCQUFnQixPQUMzQixPQUNBLFlBQ3lDO0FBQ3pDLFVBQXNDLFFBQVEsR0FBRztBQUUvQyxZQUFJLFNBQVMseUJBQXlCO0FBQ3BDLGdCQUFNLElBQUksTUFBTSxzRUFBc0U7QUFBQSxRQUN4RjtBQUNBLHFCQUFhO0FBQ2IsZUFBTyxJQUFJLFFBQXFDLENBQUMsU0FBUyxXQUFXO0FBQ25FLDJCQUFpQixVQUFVLENBQUMsU0FBUyxNQUFNLENBQUM7QUFDNUMsZ0JBQU0sVUFBMEIsRUFBRSxNQUFNLFVBQVUsSUFBSSxFQUFFLE9BQU8sU0FBUyxFQUFFLEdBQUcsUUFBUSxFQUFFLEVBQUU7QUFDekYsZ0JBQU0sZUFBK0IsQ0FBQztBQUN0QyxjQUFJLGlCQUFpQixZQUFZO0FBQy9CLHlCQUFhLEtBQUssTUFBTSxNQUFNO0FBQUEsVUFDaEM7QUFDQSxzQkFBYSxZQUFZLFNBQVMsWUFBWTtBQUFBLFFBQ2hELENBQUM7QUFBQSxNQUNILE9BQU87QUFDTCxlQUFZLGNBQWMsT0FBTyxPQUFPO0FBQUEsTUFDMUM7QUFBQSxJQUNGO0FBRU8sSUFBTUMsa0JBQWlCLE9BQU8sY0FBcUM7QUFDeEUsVUFBc0MsUUFBUSxHQUFHO0FBQy9DLHFCQUFhO0FBQ2IsZUFBTyxJQUFJLFFBQWMsQ0FBQyxTQUFTLFdBQVc7QUFDNUMsMkJBQWlCLFdBQVcsQ0FBQyxTQUFTLE1BQU0sQ0FBQztBQUM3QyxnQkFBTSxVQUEwQixFQUFFLE1BQU0sV0FBVyxJQUFJLFVBQVU7QUFDakUsc0JBQWEsWUFBWSxPQUFPO0FBQUEsUUFDbEMsQ0FBQztBQUFBLE1BQ0gsT0FBTztBQUNMLFFBQUssZUFBZSxTQUFTO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBRU8sSUFBTUMsT0FBTSxPQUNqQixXQUNBLGNBQ0EsUUFDQSxlQUNBLFNBQ0EsWUFDOEI7QUFDOUIsVUFBc0MsUUFBUSxHQUFHO0FBRS9DLFlBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxLQUFLLEdBQUc7QUFDdEMsZ0JBQU0sSUFBSSxNQUFNLGlEQUFpRDtBQUFBLFFBQ25FO0FBRUEsWUFBSSxRQUFRLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztBQUMxQixnQkFBTSxJQUFJLE1BQU0seURBQXlEO0FBQUEsUUFDM0U7QUFDQSxxQkFBYTtBQUNiLGVBQU8sSUFBSSxRQUFzQyxDQUFDLFNBQVMsV0FBVztBQUNwRSwyQkFBaUIsT0FBTyxDQUFDLFNBQVMsTUFBTSxDQUFDO0FBQ3pDLGdCQUFNLHFCQUFxQjtBQUMzQixnQkFBTSxVQUEwQjtBQUFBLFlBQzlCLE1BQU07QUFBQSxZQUNOLElBQUksRUFBRSxXQUFXLGNBQWMsUUFBUSxvQkFBb0IsZUFBZSxRQUFRO0FBQUEsVUFDcEY7QUFDQSxzQkFBYSxZQUFZLFNBQWMsMkJBQTJCLGtCQUFrQixDQUFDO0FBQUEsUUFDdkYsQ0FBQztBQUFBLE1BQ0gsT0FBTztBQUNMLGVBQVksSUFBSSxXQUFXLGNBQWMsUUFBUSxlQUFlLFNBQVMsT0FBTztBQUFBLE1BQ2xGO0FBQUEsSUFDRjtBQUVPLElBQU1DLGdCQUFlLE9BQU8sY0FBcUM7QUFDdEUsVUFBc0MsUUFBUSxHQUFHO0FBQy9DLHFCQUFhO0FBQ2IsZUFBTyxJQUFJLFFBQWMsQ0FBQyxTQUFTLFdBQVc7QUFDNUMsMkJBQWlCLGlCQUFpQixDQUFDLFNBQVMsTUFBTSxDQUFDO0FBQ25ELGdCQUFNLFVBQTBCLEVBQUUsTUFBTSxpQkFBaUIsSUFBSSxVQUFVO0FBQ3ZFLHNCQUFhLFlBQVksT0FBTztBQUFBLFFBQ2xDLENBQUM7QUFBQSxNQUNILE9BQU87QUFDTCxRQUFLLGFBQWEsU0FBUztBQUFBLE1BQzdCO0FBQUEsSUFDRjtBQUFBO0FBQUE7OztBQ25PQSxJQWtCYSxzQkFhQSxzQkF5QkE7QUF4RGI7QUFBQTtBQUFBO0FBR0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLElBQU0sdUJBQXVCLENBQUMsUUFBZ0IsWUFBMEM7QUFDN0YsY0FBUSxPQUFPLFVBQVU7QUFBQSxRQUN2QixLQUFLO0FBQ0gsaUJBQU8sQ0FBQyxPQUFPLE1BQU0sT0FBTyxNQUFNLE9BQU8sTUFBTSxLQUFLO0FBQUEsUUFDdEQsS0FBSztBQUNILGlCQUFPLENBQUMsT0FBTyxNQUFNLE9BQU8sTUFBTSxFQUFFLFdBQVcsT0FBTyxVQUFVLEdBQUcsWUFBWTtBQUFBLFFBQ2pGLEtBQUs7QUFDSCxpQkFBTyxDQUFDLE9BQU8sTUFBTSxPQUFPLE1BQU0sRUFBRSxVQUFVLE9BQU8sU0FBUyxHQUFHLFdBQVc7QUFBQSxRQUM5RTtBQUNFLGdCQUFNLElBQUksTUFBTSwwQkFBMEIsT0FBTyxRQUFRLFFBQVEsUUFBUSxDQUFDLEVBQUU7QUFBQSxNQUNoRjtBQUFBLElBQ0Y7QUFFTyxJQUFNLHVCQUF1QixDQUFDLFdBQW1DO0FBQ3RFLGNBQVEsT0FBTyxDQUFDLEdBQUc7QUFBQSxRQUNqQixLQUFLO0FBQ0gsaUJBQU8sSUFBSUUsUUFBTyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztBQUFBLFFBQ25ELEtBQUssY0FBYztBQUNqQixnQkFBTSxXQUFXLE9BQU8sQ0FBQztBQUN6QixjQUFJLENBQUMseUJBQXlCLFFBQVEsR0FBRztBQUN2QyxrQkFBTSxJQUFJLE1BQU0sNEJBQTRCLFFBQVEsK0JBQStCO0FBQUEsVUFDckY7QUFDQSxnQkFBTSxFQUFFLFdBQVcsVUFBVSxRQUFRLElBQUksT0FBTyxDQUFDO0FBQ2pELGlCQUFPQSxRQUFPLGNBQWMsV0FBVyxFQUFFLFVBQVUsTUFBTSxPQUFPLENBQUMsR0FBRyxVQUFVLFFBQVEsQ0FBQztBQUFBLFFBQ3pGO0FBQUEsUUFDQSxLQUFLLGFBQWE7QUFDaEIsZ0JBQU0sV0FBVyxPQUFPLENBQUM7QUFDekIsY0FBSSxDQUFDLHdCQUF3QixRQUFRLEdBQUc7QUFDdEMsa0JBQU0sSUFBSSxNQUFNLDRCQUE0QixRQUFRLG9DQUFvQztBQUFBLFVBQzFGO0FBQ0EsZ0JBQU0sRUFBRSxVQUFVLFVBQVUsUUFBUSxJQUFJLE9BQU8sQ0FBQztBQUNoRCxpQkFBT0EsUUFBTyxhQUFhLFVBQVUsRUFBRSxVQUFVLE1BQU0sT0FBTyxDQUFDLEdBQUcsVUFBVSxRQUFRLENBQUM7QUFBQSxRQUN2RjtBQUFBLFFBQ0E7QUFDRSxnQkFBTSxJQUFJLE1BQU0sMEJBQTBCLE9BQU8sQ0FBQyxDQUFDLEVBQUU7QUFBQSxNQUN6RDtBQUFBLElBQ0Y7QUFFTyxJQUFNLHVDQUFOLE1BQThFO0FBQUEsTUFNbkYsTUFBTSw4QkFBOEIsTUFBbUQ7QUFFckYsZUFBT0Msd0JBQXVCLE1BQU0sU0FBUyxJQUFJLENBQUM7QUFBQSxNQUNwRDtBQUFBLE1BRUEsTUFBTSxVQUFVLGNBQW1DLFNBQTBEO0FBQzNHLHlCQUFpQjtBQUNqQixZQUFJO0FBRUosWUFBSSxPQUFPLGlCQUFpQixVQUFVO0FBQ3BDLGNBQUksUUFBUTtBQUVWLG9CQUFRLE1BQU0sU0FBUyxZQUFZO0FBQUEsVUFDckMsT0FBTztBQUdMLG9CQUFRLE1BQU0sS0FBSyw4QkFBOEIsWUFBWTtBQUFBLFVBQy9EO0FBQUEsUUFDRixPQUFPO0FBQ0wsa0JBQVE7QUFBQSxRQUNWO0FBRUEsU0FBQyxLQUFLLFdBQVcsS0FBSyxZQUFZLEtBQUssV0FBVyxJQUFJLE1BQU1DLGVBQWMsT0FBTyxPQUFPO0FBQ3hGLHVCQUFlO0FBQUEsTUFDakI7QUFBQSxNQUVBLE1BQU0sVUFBeUI7QUFDN0IsZUFBT0MsZ0JBQWUsS0FBSyxTQUFTO0FBQUEsTUFDdEM7QUFBQSxNQUVBLE1BQU0sSUFDSixPQUNBLFNBQ0EsU0FDb0M7QUFDcEMseUJBQWlCO0FBQ2pCLGNBQU0sYUFBdUIsQ0FBQztBQUM5QixjQUFNLGVBQXlCLENBQUM7QUFDaEMsZUFBTyxRQUFRLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUTtBQUNyQyxnQkFBTSxPQUFPLElBQUksQ0FBQztBQUNsQixnQkFBTSxTQUFTLElBQUksQ0FBQztBQUNwQixnQkFBTSxRQUFRLEtBQUssV0FBVyxRQUFRLElBQUk7QUFDMUMsY0FBSSxVQUFVLElBQUk7QUFDaEIsa0JBQU0sSUFBSSxNQUFNLGtCQUFrQixJQUFJLEdBQUc7QUFBQSxVQUMzQztBQUNBLHFCQUFXLEtBQUssTUFBTTtBQUN0Qix1QkFBYSxLQUFLLEtBQUs7QUFBQSxRQUN6QixDQUFDO0FBRUQsY0FBTSxjQUFvQyxDQUFDO0FBQzNDLGNBQU0sZ0JBQTBCLENBQUM7QUFDakMsZUFBTyxRQUFRLE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBUTtBQUN2QyxnQkFBTSxPQUFPLElBQUksQ0FBQztBQUNsQixnQkFBTSxTQUFTLElBQUksQ0FBQztBQUNwQixnQkFBTSxRQUFRLEtBQUssWUFBWSxRQUFRLElBQUk7QUFDM0MsY0FBSSxVQUFVLElBQUk7QUFDaEIsa0JBQU0sSUFBSSxNQUFNLG1CQUFtQixJQUFJLEdBQUc7QUFBQSxVQUM1QztBQUNBLHNCQUFZLEtBQUssTUFBTTtBQUN2Qix3QkFBYyxLQUFLLEtBQUs7QUFBQSxRQUMxQixDQUFDO0FBRUQsY0FBTSxTQUFTLFdBQVc7QUFBQSxVQUFJLENBQUMsR0FBRyxNQUNoQyxxQkFBcUIsR0FBRyxNQUFNLFVBQVUsS0FBSyxXQUFXLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRztBQUFBLFFBQzdFO0FBQ0EsY0FBTSxVQUFVLFlBQVk7QUFBQSxVQUFJLENBQUMsR0FBRyxNQUNsQyxJQUFJLHFCQUFxQixHQUFHLE1BQU0sV0FBVyxLQUFLLFlBQVksY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUk7QUFBQSxRQUN4RjtBQUVBLGNBQU0sVUFBVSxNQUFNQyxLQUFJLEtBQUssV0FBVyxjQUFjLFFBQVEsZUFBZSxTQUFTLE9BQU87QUFFL0YsY0FBTSxZQUF1QyxDQUFDO0FBQzlDLGlCQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsUUFBUSxLQUFLO0FBQ3ZDLG9CQUFVLEtBQUssWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUsscUJBQXFCLFFBQVEsQ0FBQyxDQUFDO0FBQUEsUUFDbkc7QUFDQSx1QkFBZTtBQUNmLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFFQSxpQkFBdUI7QUFBQSxNQUV2QjtBQUFBLE1BRUEsZUFBcUI7QUFDbkIsYUFBS0MsY0FBYSxLQUFLLFNBQVM7QUFBQSxNQUNsQztBQUFBLElBQ0Y7QUFBQTtBQUFBOzs7QUNwSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFlYSxpQkFrREEsK0JBcUNBO0FBdEdiO0FBQUE7QUFBQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBUU8sSUFBTSxrQkFBa0IsTUFBWTtBQUN6QyxVQUFJLE9BQU9DLEtBQUksS0FBSyxnQkFBZ0IsWUFBWUEsS0FBSSxLQUFLLGNBQWMsR0FBRztBQUN4RSxRQUFBQSxLQUFJLEtBQUssY0FBYztBQUFBLE1BQ3pCO0FBRUEsVUFBSUEsS0FBSSxLQUFLLFNBQVMsT0FBTztBQUUzQixnQkFBUTtBQUFBLFVBQ047QUFBQSxRQUVGO0FBQUEsTUFDRjtBQUVBLFVBQUksT0FBT0EsS0FBSSxLQUFLLFVBQVUsV0FBVztBQUN2QyxRQUFBQSxLQUFJLEtBQUssUUFBUTtBQUFBLE1BQ25CO0FBRUEsVUFBSSxPQUFPQSxLQUFJLEtBQUssVUFBVSxXQUFXO0FBQ3ZDLFFBQUFBLEtBQUksS0FBSyxRQUFRO0FBQUEsTUFDbkI7QUFFQSxVQUFJLE9BQU9BLEtBQUksS0FBSyxlQUFlLFlBQVksQ0FBQyxPQUFPLFVBQVVBLEtBQUksS0FBSyxVQUFVLEtBQUtBLEtBQUksS0FBSyxjQUFjLEdBQUc7QUFZakgsWUFBSSxPQUFPLFNBQVMsZUFBZSxDQUFDLEtBQUsscUJBQXFCO0FBQzVELFVBQUFBLEtBQUksS0FBSyxhQUFhO0FBQUEsUUFDeEIsT0FBTztBQUNMLGdCQUFNLHFCQUNKLE9BQU8sY0FBYyxjQUFjLFVBQVEsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLFVBQVU7QUFDbEYsVUFBQUEsS0FBSSxLQUFLLGFBQWEsS0FBSyxJQUFJLEdBQUcsS0FBSyxNQUFNLHNCQUFzQixLQUFLLENBQUMsQ0FBQztBQUFBLFFBQzVFO0FBQUEsTUFDRjtBQUVBLFVBQUksTUFBb0M7QUFFdEMsWUFBSUEsS0FBSSxLQUFLLGNBQWMsVUFBYSxhQUFhLFVBQVUsUUFBUSxPQUFPLE1BQU0sR0FBRztBQUNyRixVQUFBQSxLQUFJLEtBQUssWUFBWSxVQUFVLFVBQVUsR0FBRyxVQUFVLFlBQVksR0FBRyxJQUFJLENBQUM7QUFBQSxRQUM1RTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRU8sSUFBTSxnQ0FBTixNQUF1RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVM1RCxNQUFNLEtBQUssYUFBb0M7QUFFN0Msd0JBQWdCO0FBR2hCLGNBQU0sbUNBQW1DO0FBR3pDLGNBQU0sZ0JBQWdCLFdBQVc7QUFBQSxNQUNuQztBQUFBLE1BU0EsTUFBTSw4QkFDSixjQUNBLFNBQ2tDO0FBQ2xDLGNBQU0sVUFBVSxJQUFJLHFDQUFxQztBQUN6RCxjQUFNLFFBQVEsVUFBVSxjQUFjLE9BQU87QUFDN0MsZUFBTyxRQUFRLFFBQVEsT0FBTztBQUFBLE1BQ2hDO0FBQUEsSUFDRjtBQUVPLElBQU0sY0FBYyxJQUFJLDhCQUE4QjtBQUFBO0FBQUE7OztBQzdGN0Q7QUFDQTtBQUdBOzs7QUNQTyxJQUFNQyxXQUFVOzs7QURLdkIsSUFBTyxjQUFRO0FBS2YsSUFBSSxPQUEyQjtBQUM3QixRQUFNLGdCQUFnQixLQUE0QjtBQUNsRCxrQkFBZ0IsU0FBUyxlQUFlLEdBQUc7QUFDN0M7QUFFQSxJQUFJLE1BQTBCO0FBQzVCLFFBQU1DLGVBQWMsMERBQTBCO0FBQzlDLE1BQUksT0FBMEI7QUFDNUIsb0JBQWdCLFVBQVVBLGNBQWEsQ0FBQztBQUN4QyxvQkFBZ0IsU0FBU0EsY0FBYSxDQUFDO0FBQUEsRUFDekM7QUFDQSxrQkFBZ0IsT0FBT0EsY0FBYSxFQUFFO0FBQ3RDLGtCQUFnQixRQUFRQSxjQUFhLEVBQUU7QUFDekM7QUFFQSxPQUFPLGVBQWVDLEtBQUksVUFBVSxPQUFPLEVBQUUsT0FBT0MsVUFBUyxZQUFZLEtBQUssQ0FBQzsiLAogICJuYW1lcyI6IFsiaSIsICJlbnYiLCAiVGVuc29yIiwgIlRlbnNvciIsICJJbmZlcmVuY2VTZXNzaW9uIiwgIlRlbnNvciIsICJUcmFpbmluZ1Nlc3Npb24iLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiVHJhaW5pbmdTZXNzaW9uIiwgImVudiIsICJlbnYiLCAid2FzbSIsICJ3YXNtIiwgIndhc20iLCAibG9jYXRpb24iLCAiZW52IiwgIndhc20iLCAibG9jYXRpb24iLCAidGVuc29yIiwgImVycm9yQ29kZSIsICJpIiwgImluaXRpYWxpemluZyIsICJpbml0aWFsaXplZCIsICJhYm9ydGVkIiwgImNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIiLCAiY3JlYXRlU2Vzc2lvbiIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJUZW5zb3IiLCAiY29weUZyb21FeHRlcm5hbEJ1ZmZlciIsICJjcmVhdGVTZXNzaW9uIiwgInJlbGVhc2VTZXNzaW9uIiwgInJ1biIsICJlbmRQcm9maWxpbmciLCAiZW52IiwgInZlcnNpb24iLCAid2FzbUJhY2tlbmQiLCAiZW52IiwgInZlcnNpb24iXQp9Cg==
