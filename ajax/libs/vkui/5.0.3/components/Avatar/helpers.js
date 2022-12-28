var MAX_FONT_SIZE = 30;
var MAX_IMAGE_BASE_SIZE = 96;
var RELATIVE_SIZE = MAX_FONT_SIZE / MAX_IMAGE_BASE_SIZE;

/**
 * По возможности выставляем размеры по дизайн-системе. Иначе высчитываем.
 */
export function getInitialsFontSize(avatarSize) {
  if (avatarSize <= 16) {
    return 5;
  } else if (avatarSize <= 24) {
    return 8;
  } else if (avatarSize <= 32) {
    return 10;
  } else if (avatarSize <= 36) {
    return 13;
  } else if (avatarSize <= 44) {
    return 14;
  } else if (avatarSize <= 48) {
    return 17;
  } else if (avatarSize < 56) {
    return 18;
  } else if (avatarSize <= 64) {
    return 21;
  } else if (avatarSize <= 88) {
    return 26;
  } else if (avatarSize <= MAX_IMAGE_BASE_SIZE) {
    return MAX_FONT_SIZE;
  }
  var calculatedFontSize = Math.ceil(avatarSize * RELATIVE_SIZE);
  var evenFix = calculatedFontSize % 2;
  return calculatedFontSize + evenFix;
}
//# sourceMappingURL=helpers.js.map