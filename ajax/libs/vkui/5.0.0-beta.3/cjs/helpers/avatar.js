"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcInitialsAvatarColor = calcInitialsAvatarColor;
/**
 * Вычисляет цвет InitialsAvatar на основании переданного идентификатора объекта
 */
function calcInitialsAvatarColor(objectId) {
  return objectId % 6 + 1;
}
//# sourceMappingURL=avatar.js.map