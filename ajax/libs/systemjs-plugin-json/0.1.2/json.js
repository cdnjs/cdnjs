/*
  JSON plugin
*/

define({
  translate: function(load) {
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