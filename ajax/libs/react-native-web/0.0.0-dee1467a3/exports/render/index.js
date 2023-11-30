/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import { hydrate as domLegacyHydrate, render as domLegacyRender } from 'react-dom';
import { createRoot as domCreateRoot, hydrateRoot as domHydrateRoot } from 'react-dom/client';
import unmountComponentAtNode from '../unmountComponentAtNode';
import { createSheet } from '../StyleSheet/dom';
export function hydrate(element, container) {
  var rootNode = container.getRootNode();
  createSheet(rootNode);
  return domHydrateRoot(container, element);
}
export default function render(element, container) {
  var rootNode = container.getRootNode();
  var reactRoot = domCreateRoot(container);
  reactRoot.render(element);
  createSheet(rootNode);
  return reactRoot;
}
export function hydrateLegacy(element, container, callback) {
  var rootNode = container.getRootNode();
  domLegacyHydrate(element, container, callback);
  createSheet(rootNode);
  return {
    unmount: function unmount() {
      return unmountComponentAtNode(container);
    }
  };
}
export function renderLegacy(element, container, callback) {
  var rootNode = container.getRootNode();
  domLegacyRender(element, container, callback);
  createSheet(rootNode);
  return {
    unmount: function unmount() {
      return unmountComponentAtNode(container);
    }
  };
}