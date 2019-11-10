import { createMacro } from 'babel-plugin-macros';
import babelPlugin from 'babel-plugin-styled-components';
import { addDefault, addNamed } from '@babel/helper-module-imports';

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
      id = addDefault(program, 'styled-components', { nameHint: 'styled' });
      customImportName = id;
    } else {
      id = addNamed(program, refName, 'styled-components', { nameHint: refName });
    }

    // update references with the new identifiers
    references[refName].forEach(function (referencePath) {
      // eslint-disable-next-line no-param-reassign
      referencePath.node.name = id.name;
    });
  });

  // SECOND STEP : apply babel-plugin-styled-components to the file
  var stateWithOpts = _extends({}, state, { opts: config, customImportName: customImportName });
  program.traverse(babelPlugin({ types: t }).visitor, stateWithOpts);
}

var configName = 'styledComponents';

var index = createMacro(styledComponentsMacro, { configName: configName });

export default index;
//# sourceMappingURL=styled-components-macro.esm.js.map
