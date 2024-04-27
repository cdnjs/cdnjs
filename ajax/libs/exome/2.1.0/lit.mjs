// src/lit.ts
import { subscribe as s } from "exome";
var t = class {
  constructor(e, r) {
    this.host = e;
    this.store = r;
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
