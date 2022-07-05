/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import normalizeColor from './normalizeColor';
import normalizeValueWithProperty from './normalizeValueWithProperty';
const defaultOffset = {
  height: 0,
  width: 0
};

const resolveShadowValue = style => {
  const shadowColor = style.shadowColor,
        shadowOffset = style.shadowOffset,
        shadowOpacity = style.shadowOpacity,
        shadowRadius = style.shadowRadius;

  const _ref = shadowOffset || defaultOffset,
        height = _ref.height,
        width = _ref.width;

  const offsetX = normalizeValueWithProperty(width);
  const offsetY = normalizeValueWithProperty(height);
  const blurRadius = normalizeValueWithProperty(shadowRadius || 0);
  const color = normalizeColor(shadowColor || 'black', shadowOpacity);

  if (color != null && offsetX != null && offsetY != null && blurRadius != null) {
    return offsetX + " " + offsetY + " " + blurRadius + " " + color;
  }
};

export default resolveShadowValue;