
// ionicons: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './ionicons.core.js';
import {
  Icon
} from './ionicons.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    Icon
  ], opts);
}
