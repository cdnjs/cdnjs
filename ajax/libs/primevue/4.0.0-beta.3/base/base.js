this.primevue = this.primevue || {};
this.primevue.base = (function () {
    'use strict';

    var Base = {
      _loadedStyleNames: new Set(),
      getLoadedStyleNames: function getLoadedStyleNames() {
        return this._loadedStyleNames;
      },
      isStyleNameLoaded: function isStyleNameLoaded(name) {
        return this._loadedStyleNames.has(name);
      },
      setLoadedStyleName: function setLoadedStyleName(name) {
        this._loadedStyleNames.add(name);
      },
      deleteLoadedStyleName: function deleteLoadedStyleName(name) {
        this._loadedStyleNames["delete"](name);
      },
      clearLoadedStyleNames: function clearLoadedStyleNames() {
        this._loadedStyleNames.clear();
      }
    };

    return Base;

})();
