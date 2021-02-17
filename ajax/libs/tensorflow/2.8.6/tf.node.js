/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tfjsCore = require('@tensorflow/tfjs-core');
var tfjsLayers = require('@tensorflow/tfjs-layers');
var tfjsConverter = require('@tensorflow/tfjs-converter');
var tfjsData = require('@tensorflow/tfjs-data');
var tfjsBackendCpu = require('@tensorflow/tfjs-backend-cpu');
var tfjsBackendWebgl = require('@tensorflow/tfjs-backend-webgl');

/** @license See the LICENSE file. */
// This code is auto-generated, do not modify this file!
var version = '2.8.6';

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var version$1 = {
    'tfjs-core': tfjsCore.version_core,
    'tfjs-backend-cpu': tfjsBackendCpu.version_cpu,
    'tfjs-backend-webgl': tfjsBackendWebgl.version_webgl,
    'tfjs-data': tfjsData.version_data,
    'tfjs-layers': tfjsLayers.version_layers,
    'tfjs-converter': tfjsConverter.version_converter,
    'tfjs': version
};

Object.keys(tfjsCore).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return tfjsCore[k];
    }
  });
});
Object.keys(tfjsLayers).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return tfjsLayers[k];
    }
  });
});
Object.keys(tfjsConverter).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return tfjsConverter[k];
    }
  });
});
exports.data = tfjsData;
exports.version = version$1;
//# sourceMappingURL=tf.node.js.map
