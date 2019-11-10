// ionicons: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './ionicons.core.js';
import {
  Icon
} from './ionicons.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    Icon
  ], opts);
}