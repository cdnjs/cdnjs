// src/server/index.ts
import {executionAsyncId, createHook} from "node:async_hooks";
import {virtualSheet} from "twind/sheets";
export * from "twind";
export * from "twind/sheets";
var asyncVirtualSheet = () => {
  const sheet = virtualSheet();
  const initial = sheet.reset();
  const store = new Map();
  const asyncHook = createHook({
    init(asyncId, type, triggerAsyncId) {
      const snapshot = store.get(triggerAsyncId);
      if (snapshot) {
        store.set(asyncId, snapshot);
      }
    },
    before(asyncId) {
      const snapshot = store.get(asyncId);
      if (snapshot) {
        sheet.reset(snapshot.state);
      }
    },
    after(asyncId) {
      const snapshot = store.get(asyncId);
      if (snapshot) {
        snapshot.state = sheet.reset(initial);
      }
    },
    destroy(asyncId) {
      store.delete(asyncId);
    }
  }).enable();
  return {
    get target() {
      return sheet.target;
    },
    insert: sheet.insert,
    init: sheet.init,
    reset: () => {
      const asyncId = executionAsyncId();
      const snapshot = store.get(asyncId);
      if (snapshot) {
        snapshot.state = void 0;
      } else {
        store.set(asyncId, {state: void 0});
      }
      sheet.reset();
    },
    enable: () => asyncHook.enable(),
    disable: () => asyncHook.disable()
  };
};
export {
  asyncVirtualSheet
};
//# sourceMappingURL=server.js.map
