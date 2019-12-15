'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var helperModuleImports = require('@babel/helper-module-imports');
var traverse = _interopDefault(require('@babel/traverse'));
var babelPluginMacros = require('babel-plugin-macros');
var babelPlugin = _interopDefault(require('babel-plugin-styled-components'));

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

// 

function styledComponentsMacro(_ref) {
  var references = _ref.references,
      state = _ref.state,
      t = _ref.babel.types,
      _ref$config = _ref.config,
      config = _ref$config === undefined ? {} : _ref$config;

  var program = state.file.path;

  // FIRST STEP : replace `styled-components/macro` by `styled-components
  // references looks like this
  // { default: [path, path], css: [path], ... }
  var customImportName = void 0;
  Object.keys(references).forEach(function (refName) {
    // generate new identifier
    var id = void 0;
    if (refName === 'default') {
      id = helperModuleImports.addDefault(program, 'styled-components', { nameHint: 'styled' });
      customImportName = id;
    } else {
      id = helperModuleImports.addNamed(program, refName, 'styled-components', { nameHint: refName });
    }

    // update references with the new identifiers
    references[refName].forEach(function (referencePath) {
      // eslint-disable-next-line no-param-reassign
      referencePath.node.name = id.name;
    });
  });

  // SECOND STEP : apply babel-plugin-styled-components to the file
  var stateWithOpts = _extends({}, state, { opts: config, customImportName: customImportName });
  traverse(program.parent, babelPlugin({ types: t }).visitor, undefined, stateWithOpts);
}

var configName = 'styledComponents';

var index = babelPluginMacros.createMacro(styledComponentsMacro, { configName: configName });

exports.default = index;
//# sourceMappingURL=styled-components-macro.cjs.js.map
