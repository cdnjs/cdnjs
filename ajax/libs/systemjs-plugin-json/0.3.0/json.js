/*
  JSON plugin
*/

// this code allows named exports of valid identifiers in json to work with rollup
// so you can effectively "pick" a json value and have the other base-level json values excluded
// not comprehensive of course
function isValidIdentifier(exportName) {
  return exportName.match(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/);
}

module.exports = {
  translate: function(load) {
    var json = JSON.parse(load.source);
    if (this.builder && this.transpiler && !Array.isArray(json)) {
      load.metadata.format = 'esm';

      var namedExports = Object.keys(json);
      var validIdentifiers = namedExports.filter(isValidIdentifier);

      var output = ['exp' + 'ort var __useDefault = true;\n'];

      validIdentifiers.forEach(function (exportName) {
        output.push('exp' + 'ort var ' + exportName + ' = ' + JSON.stringify(json[exportName]) + ';\n');
      });

      output.push('exp' + 'ort default {\n');
      namedExports.forEach(function (exportName) {
        if (validIdentifiers.indexOf(exportName) !== -1) {
          output.push(exportName + ': ' + exportName + ',\n');
        }
        else {
          output.push(JSON.stringify(exportName) + ': ' + JSON.stringify(json[exportName]) + ',\n');
        }
      });

      output.push('};');

      return output.join('');
    }
    if (this.builder) {
      load.metadata.format = 'cjs';
      return 'module.exports = ' + JSON.stringify(json);
    }
  },
  instantiate: function(load) {
    if (!this.builder) {
      return JSON.parse(load.source);
    }
  }
}
