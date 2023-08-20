import validators from './utils/validators.js';
import { TypeMustBe } from './utils/definedErrors.js';
import constrainedModel from './constrainedModel.js';

export function constrainedEditor(monaco) {
  /**
   * Injected Dependencies
   */
  if (monaco === undefined) {
    throw new Error([
      "Please pass the monaco global variable into function as",
      "(eg:)constrainedEditor({ range : monaco.range });",
    ].join('\n'));
  }
  /**
   *
   * @param {Object} editorInstance This should be the monaco editor instance.
   * @description This is the listener function to check whether the cursor is at checkpoints
   * (i.e) the point where editable and non editable portions meet
   */
  const listenerFn = function (editorInstance) {
    const model = editorInstance.getModel();
    if (model._isCursorAtCheckPoint) {
      const selections = editorInstance.getSelections();
      const positions = selections.map(function (selection) {
        return {
          lineNumber: selection.positionLineNumber,
          column: selection.positionColumn
        }
      });
      model._isCursorAtCheckPoint(positions);
      model._currentCursorPositions = selections;
    }
  }
  const _uriRestrictionMap = {};
  const { isInstanceValid, isModelValid, isRangesValid } = validators.initWith(monaco);
  /**
   *
   * @param {Object} editorInstance This should be the monaco editor instance
   * @returns {Boolean}
   */
  const initInEditorInstance = function (editorInstance) {
    if (isInstanceValid(editorInstance)) {
      let domNode = editorInstance.getDomNode();
      manipulator._listener = listenerFn.bind(API, editorInstance);
      manipulator._editorInstance = editorInstance;
      manipulator._editorInstance._isInDevMode = false;
      domNode.addEventListener('keydown', manipulator._listener, true);
      manipulator._onChangeModelDisposable = editorInstance.onDidChangeModel(function () {
        // domNode - refers old dom node
        domNode && domNode.removeEventListener('keydown', manipulator._listener, true)
        const newDomNode = editorInstance.getDomNode(); // Gets Current dom node
        newDomNode && newDomNode.addEventListener('keydown', manipulator._listener, true);
        domNode = newDomNode;
      })
      return true;
    } else {
      throw new Error(
        TypeMustBe(
          'ICodeEditor',
          'editorInstance',
          'This type interface can be found in monaco editor documentation'
        )
      )
    }
  }
  /**
   *
   * @param {Object} model This should be the monaco editor model instance. Refer https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.itextmodel.html
   * @param {*} ranges This should be the array of range objects. Refer constrained editor plugin documentation
   * @returns model
   */
  const addRestrictionsTo = function (model, ranges) {
    if (isModelValid(model)) {
      if (isRangesValid(ranges)) {
        const modelToConstrain = constrainedModel(model, ranges, monaco, manipulator._editorInstance);
        _uriRestrictionMap[modelToConstrain.uri.toString()] = modelToConstrain;
        return modelToConstrain;
      } else {
        throw new Error(
          TypeMustBe(
            'Array<RangeRestrictionObject>',
            'ranges',
            'Please refer constrained editor documentation for proper structure'
          )
        )
      }
    } else {
      throw new Error(
        TypeMustBe(
          'ICodeEditor',
          'editorInstance',
          'This type interface can be found in monaco editor documentation'
        )
      )
    }
  }
  /**
   *
   * @param {Object} model This should be the monaco editor model instance. Refer https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.itextmodel.html
   * @returns {Boolean} True if the restrictions are removed
   */
  const removeRestrictionsIn = function (model) {
    if (isModelValid(model)) {
      const uri = model.uri.toString();
      const restrictedModel = _uriRestrictionMap[uri];
      if (restrictedModel) {
        return restrictedModel.disposeRestrictions();
      } else {
        console.warn('Current Model is not a restricted Model');
        return false;
      }
    } else {
      throw new Error(
        TypeMustBe(
          'ICodeEditor',
          'editorInstance',
          'This type interface can be found in monaco editor documentation'
        )
      )
    }
  }
  /**
   *
   * @returns {Boolean} True if the constrainer is disposed
   */
  const disposeConstrainer = function () {
    if (manipulator._editorInstance) {
      const instance = manipulator._editorInstance;
      const domNode = instance.getDomNode();
      domNode && domNode.removeEventListener('keydown', manipulator._listener);
      manipulator._onChangeModelDisposable && manipulator._onChangeModelDisposable.dispose();
      delete manipulator._listener;
      delete manipulator._editorInstance._isInDevMode;
      delete manipulator._editorInstance._devModeAction;
      delete manipulator._editorInstance;
      delete manipulator._onChangeModelDisposable;
      for (let key in _uriRestrictionMap) {
        delete _uriRestrictionMap[key];
      }
      return true;
    }
    return false;
  }
  /**
   * @description This function used to make the developer to find the ranges of selected portions
   */
  const toggleDevMode = function () {
    if (manipulator._editorInstance._isInDevMode) {
      manipulator._editorInstance._isInDevMode = false;
      manipulator._editorInstance._devModeAction.dispose();
      delete manipulator._editorInstance._devModeAction;
    } else {
      manipulator._editorInstance._isInDevMode = true;
      manipulator._editorInstance._devModeAction = manipulator._editorInstance.addAction({
        id: 'showRange',
        label: 'Show Range in console',
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        run: function (editor) {
          const selections = editor.getSelections();
          const ranges = selections.reduce(function (acc, { startLineNumber, endLineNumber, startColumn, endColumn }) {
            acc.push('range : ' + JSON.stringify([
              startLineNumber,
              startColumn,
              endLineNumber,
              endColumn
            ]));
            return acc;
          }, []).join('\n');
          console.log(`Selected Ranges : \n` + JSON.stringify(ranges, null, 2));
        }
      });
    }
  }

  /**
   * Main Function starts here
   */
  // @internal
  const manipulator = {
    /**
     * These variables should not be modified by external code
     * This has to be used for debugging and testing
     */
    _listener: null,
    _editorInstance: null,
    _uriRestrictionMap: _uriRestrictionMap,
    _injectedResources: monaco
  }
  const API = Object.create(manipulator);
  const exposedMethods = {
    /**
     * These functions are exposed to the user
     * These functions should be protected from editing
     */
    initializeIn: initInEditorInstance,
    addRestrictionsTo: addRestrictionsTo,
    removeRestrictionsIn: removeRestrictionsIn,
    disposeConstrainer: disposeConstrainer,
    toggleDevMode: toggleDevMode
  }
  for (let methodName in exposedMethods) {
    Object.defineProperty(API, methodName, {
      enumerable: false,
      writable: false,
      configurable: false,
      value: exposedMethods[methodName]
    })
  }
  return Object.freeze(API);
}

export default constrainedEditor;
