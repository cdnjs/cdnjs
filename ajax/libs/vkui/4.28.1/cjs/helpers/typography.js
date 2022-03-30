"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveWeight = resolveWeight;

function resolveWeight(weight) {
  switch (weight) {
    case "regular":
      return "3";

    case "semibold":
      return "2";

    case "medium":
    case "bold":
    case "heavy":
      return "1";

    default:
      return weight;
  }
}
//# sourceMappingURL=typography.js.map