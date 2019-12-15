import { addDefault, addNamed } from '@babel/helper-module-imports';
import traverse from '@babel/traverse';
import { createMacro } from 'babel-plugin-macros';
import babelPlugin from 'babel-plugin-styled-components';

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

function styledComponentsMacro(_ref) {
  var references = _ref.references,
      state = _ref.state,
      t = _ref.babel.types,
      _ref$config = _ref.config,
      config = _ref$config === void 0 ? {} : _ref$config;
  var program = state.file.path; // FIRST STEP : replace `styled-components/macro` by `styled-components
  // references looks like this
  // { default: [path, path], css: [path], ... }

  var customImportName;
  Object.keys(references).forEach(function (refName) {
    // generate new identifier
    var id;

    if (refName === 'default') {
      id = addDefault(program, 'styled-components', {
        nameHint: 'styled'
      });
      customImportName = id;
    } else {
      id = addNamed(program, refName, 'styled-components', {
        nameHint: refName
      });
    } // update references with the new identifiers


    references[refName].forEach(function (referencePath) {
      // eslint-disable-next-line no-param-reassign
      referencePath.node.name = id.name;
    });
  }); // SECOND STEP : apply babel-plugin-styled-components to the file

  var stateWithOpts = _extends({}, state, {
    opts: config,
    customImportName: customImportName
  });

  traverse(program.parent, babelPlugin({
    types: t
  }).visitor, undefined, stateWithOpts);
}

var index = createMacro(styledComponentsMacro, {
  configName: 'styledComponents'
});

export default index;
//# sourceMappingURL=styled-components-macro.esm.js.map
