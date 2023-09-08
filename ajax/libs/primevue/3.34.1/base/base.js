this.primevue = this.primevue || {};
this.primevue.base = (function (exports, usestyle) {
    'use strict';

    var styles = "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n.p-hidden-accessible input,\n.p-hidden-accessible select {\n    transform: scale(0);\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n}\n";
    var _useStyle = usestyle.useStyle(styles, {
        name: 'base',
        manual: true
      }),
      loadBaseStyle = _useStyle.load;
    var Base = {
      styles: styles
    };

    exports["default"] = Base;
    exports.loadBaseStyle = loadBaseStyle;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, primevue.usestyle);
