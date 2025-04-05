// src/ghost.ts
import { exomeId as o } from "exome";

// src/create-id.ts
var t = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/ghost.ts
var e;
e = o;
var r = class {
  constructor() {
    this[e] = this.constructor.name + "-" + t();
  }
};
export {
  r as GhostExome
};
