const validators = {
  initWith: function (monaco) {
    const dummyDiv = document.createElement('div');
    const dummyEditorInstance = monaco.editor.create(dummyDiv);
    const editorInstanceConstructorName = dummyEditorInstance.constructor.name;
    const editorModelConstructorName = dummyEditorInstance.getModel().constructor.name;
    const instanceCheck = function (valueToValidate) {
      return valueToValidate.constructor.name === editorInstanceConstructorName;
    }
    const modelCheck = function (valueToValidate) {
      return valueToValidate.constructor.name === editorModelConstructorName;
    }
    const rangesCheck = function (ranges) {
      if (Array.isArray(ranges)) {
        return ranges.every(function (rangeObj) {
          if (typeof rangeObj === 'object' && rangeObj.constructor.name === 'Object') {
            if (!rangeObj.hasOwnProperty('range')) return false;
            if (!Array.isArray(rangeObj.range)) return false;
            if (rangeObj.range.length !== 4) return false;
            if (!(rangeObj.range.every(num => num > 0 && parseInt(num) === num))) return false;
            if (rangeObj.hasOwnProperty('allowMultiline')) {
              if (typeof rangeObj.allowMultiline !== 'boolean') return false;
            }
            if (rangeObj.hasOwnProperty('label')) {
              if (typeof rangeObj.label !== 'string') return false;
            }
            if (rangeObj.hasOwnProperty('validate')) {
              if (typeof rangeObj.validate !== 'function') return false;
            }
            return true;
          }
          return false;
        });
      }
      return false;
    }
    return {
      isInstanceValid: instanceCheck,
      isModelValid: modelCheck,
      isRangesValid: rangesCheck
    }
  }
}
export default validators;