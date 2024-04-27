// src/ghost.ts
import { exomeId as e } from "exome";

// src/create-id.ts
var t = () => (Date.now().toString(36) + (Math.random() * 1e3 ^ 1).toString(36)).toUpperCase();

// src/ghost.ts
var o, r = class {
  constructor() {
    this[o] = this.constructor.name + "-" + t();
  }
};
o = e;
export {
  r as GhostExome
};
