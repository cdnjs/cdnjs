/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

import * as TurboModuleRegistry from '../TurboModule/TurboModuleRegistry';

// The config has different keys depending on the type of the Node
// TODO(T54896888): Make these types strict

export default TurboModuleRegistry.get('NativeAnimatedModule');