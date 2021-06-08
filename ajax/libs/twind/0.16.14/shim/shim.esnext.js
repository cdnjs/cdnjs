// src/shim/index.ts
import {setup as setupTW, createObserver} from "twind/observe";
export * from "twind";
if (typeof document !== "undefined" && typeof addEventListener == "function") {
  onload = () => {
    const script = document.querySelector('script[type="twind-config"]');
    setup(script ? JSON.parse(script.innerHTML) : {});
  };
  if (document.readyState === "loading") {
    addEventListener("DOMContentLoaded", onload);
  } else {
    timeoutRef = setTimeout(onload);
  }
}
var onload;
var timeoutRef;
var observer = createObserver();
var disconnect = () => {
  if (onload) {
    removeEventListener("DOMContentLoaded", onload);
    clearTimeout(timeoutRef);
  }
  observer.disconnect();
};
var setup = ({
  target = document.documentElement,
  ...config
} = {}) => {
  if (Object.keys(config).length) {
    setupTW(config);
  }
  disconnect();
  observer.observe(target);
  target.hidden = false;
};
export {
  disconnect,
  setup
};
//# sourceMappingURL=shim.esnext.js.map
