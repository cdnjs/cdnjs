
// ionicons: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './ionicons.core.js';
import { COMPONENTS } from './ionicons.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
