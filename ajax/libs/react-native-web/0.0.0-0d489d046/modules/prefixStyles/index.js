/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import createPrefixer from 'inline-style-prefixer/lib/createPrefixer';
import staticData from './static';
var prefixAll = createPrefixer(staticData);
export default prefixAll;