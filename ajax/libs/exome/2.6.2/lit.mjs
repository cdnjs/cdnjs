// src/lit.ts
import { subscribe as s } from "exome";
var t = class {
  constructor(e, i) {
    this.host = e;
    this.store = i;
    e.addController(this);
  }
  hostConnected() {
    this.unsubscribe = s(this.store, () => {
      this.host.requestUpdate();
    });
  }
  hostDisconnected() {
    var e;
    (e = this.unsubscribe) == null || e.call(this);
  }
};
export {
  t as StoreController
};
