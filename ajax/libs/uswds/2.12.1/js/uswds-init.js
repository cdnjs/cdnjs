/* eslint-disable no-var */
(function uswdsInit () {
  "use strict";
  var loadingClass = "usa-js-loading";
  var fallback;

  document.documentElement.classList.add(loadingClass);
  function revertClass() {
    document.documentElement.classList.remove(loadingClass);
  }

  fallback = setTimeout(revertClass, 8000);

  function verifyLoaded() {
    if (window.uswdsPresent) {
      clearTimeout(fallback);
      revertClass();
      document.removeEventListener("load", verifyLoaded, true);
    }
  }

  document.addEventListener("load", verifyLoaded, true);
}());
