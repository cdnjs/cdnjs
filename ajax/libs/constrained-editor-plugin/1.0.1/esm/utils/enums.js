export const enums = {
  SINGLE_LINE_HIGHLIGHT_CLASS: 'editableArea--single-line',
  MULTI_LINE_HIGHLIGHT_CLASS: 'editableArea--multi-line'
}
export default enums;

require.config({ paths: { vs: '../node_modules/monaco-editor/dev/vs' } });
require(['vs/editor/editor.main'], function () {
  const container = document.getElementById('container')
  const editorInstance = monaco.editor.create(container, {
    value: [
      'const utils = {};',
      'function addKeysToUtils(){',
      '',
      '}',
      'addKeysToUtils();'
    ].join('\n'),
    language: 'javascript'
  });
  const model = editorInstance.getModel();

  // - Configuration for the Constrained Editor : Starts Here
  const constrainedInstance = constrainedEditor(monaco);
  constrainedInstance.initializeIn(editorInstance);
  constrainedInstance.addRestrictionsTo(model, [{
    // range : [ startLine, startColumn, endLine, endColumn ]
    range: [1, 7, 1, 12], // Range of Util Variable name
    label: 'utilName',
    validate: function (currentlyTypedValue, newRange, info) {
      const noSpaceAndSpecialChars = /^[a-z0-9A-Z]*$/;
      return noSpaceAndSpecialChars.test(currentlyTypedValue);
    }
  }, {
    range: [3, 1, 3, 1], // Range of Function definition
    allowMultiline: true,
    label: 'funcDefinition'
  }]);
  // Configuration for the Constrained Editor : Ends Here
});