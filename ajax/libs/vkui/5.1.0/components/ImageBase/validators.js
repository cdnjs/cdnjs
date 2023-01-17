import { warnOnce } from '../../lib/warnOnce';
import { imageBaseSizes } from './types';
import { getBadgeIconSizeByImageBaseSize, getFallbackIconSizeByImageBaseSize, getOverlayIconSizeByImageBaseSize } from './helpers';

/**
 * Пример,
 *
 * Icon28User -> 28
 * Icon12Circle1 -> 12
 * Icon12Circle2 -> 12
 */
function parseIconSizeByDisplayName(displayName) {
  if (typeof displayName !== 'string') {
    return null;
  }
  var rawSize = displayName.replace(/\d+$/g, '') // удаляем цифры в конце
  .replace(/\D/g, ''); // удаляем всё, что не является числом
  var size = Number(rawSize);
  return size > 0 ? size : null;
}
function parseIconSizeByWidthProp(width) {
  if (typeof width !== 'string' && typeof width !== 'number') {
    return null;
  }
  var size = Number(width);
  return size > 0 ? size : null;
}
function getElementDisplayName(element) {
  var _element$type$display;
  return (_element$type$display = element.type.displayName) !== null && _element$type$display !== void 0 ? _element$type$display : null;
}
function getElementWidthProp(element) {
  var _element$props$width;
  return (_element$props$width = element.props.width) !== null && _element$props$width !== void 0 ? _element$props$width : null;
}
function getIconSizeByElement(element) {
  var sizeByDisplayName = parseIconSizeByDisplayName(getElementDisplayName(element));
  var sizeByWidth = parseIconSizeByWidthProp(getElementWidthProp(element));
  return sizeByWidth ? sizeByWidth : sizeByDisplayName;
}
function validateIconComponentSizeByImageSize(imageSize, iconProp, selectorFn, logger) {
  var iconSize = getIconSizeByElement(iconProp.value);
  if (iconSize === null) {
    return;
  }
  var result = selectorFn(imageSize);
  if (result === iconSize || result === selectorFn.MAX_SIZE && iconSize >= result) {
    return;
  }
  var iconName = getElementDisplayName(iconProp.value);
  var propMessage = iconName ? "".concat(iconProp.name, "={<").concat(iconName, " />}") : iconProp.name;
  logger("\u0420\u0430\u0437\u043C\u0435\u0440 `".concat(propMessage, "` \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u0438\u0437\u0430\u0439\u043D-\u0441\u0438\u0441\u0442\u0435\u043C\u0435. \u0414\u043B\u044F `size={").concat(imageSize, "}` \u0440\u0430\u0437\u043C\u0435\u0440 \u0438\u043A\u043E\u043D\u043A\u0438 \u0434\u043B\u044F `").concat(iconProp.name, "` \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C <Icon").concat(result, "<name> />. \u0415\u0441\u043B\u0438 \u0442\u0430\u043A\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430 \u043D\u0435\u0442, \u0442\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 <").concat(iconName, " width={").concat(result, "} height={").concat(result, "} />"), 'log');
}
var warnImageBase = warnOnce('ImageBase');
export function validateFallbackIcon(imageSize, iconProp) {
  return validateIconComponentSizeByImageSize(imageSize, iconProp, getFallbackIconSizeByImageBaseSize, warnImageBase);
}
var mapOfExpectedSize = new Set(imageBaseSizes);
var arrayOfSizes = Object.keys(mapOfExpectedSize).map(function (str) {
  return Number(str);
});
var maxSize = arrayOfSizes.reduce(function (maxSize, size) {
  return size > maxSize ? size : maxSize;
}, 0);
export function validateSize(imageSize) {
  if (imageSize > maxSize || mapOfExpectedSize.has(imageSize)) {
    return;
  }
  warnImageBase("`size={".concat(imageSize, "}` \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u0438\u0437\u0430\u0439\u043D-\u0441\u0438\u0441\u0442\u0435\u043C\u0435. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432: ").concat(arrayOfSizes.join(' | ')), 'log');
}
var warnImageBaseBadge = warnOnce('ImageBase.Badge');
export function validateBadgeIcon(imageSize, iconProp) {
  if (imageSize < 24 && iconProp) {
    return warnImageBaseBadge('Не используйте бейдж при `size < 24`.', 'log');
  }
  validateIconComponentSizeByImageSize(imageSize, iconProp, getBadgeIconSizeByImageBaseSize, warnImageBaseBadge);
}
var warnImageBaseOverlay = warnOnce('ImageBase.Overlay');
export function validateOverlayIcon(imageSize, iconProp) {
  validateIconComponentSizeByImageSize(imageSize, iconProp, getOverlayIconSizeByImageBaseSize, warnImageBaseOverlay);
}
//# sourceMappingURL=validators.js.map