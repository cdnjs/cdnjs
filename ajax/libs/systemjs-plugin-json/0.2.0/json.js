/*
  JSON plugin
*/

define({
  translate: function(load) {
    if (this.builder && this.transpiler) {
      load.metadata.format = 'esm';
      return 'exp' + 'ort var __useDefault = true; exp' + 'ort default ' + JSON.stringify(JSON.parse(load.source)) + ';';
    }
    if (this.builder) {
      load.metadata.format = 'cjs';
      return 'module.exports = ' + JSON.stringify(JSON.parse(load.source));
    }
  },
  instantiate: function(load) {
    if (!this.builder)
      return JSON.parse(load.source);
  }
});