/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constrainedModel.js":
/*!*********************************!*\
  !*** ./src/constrainedModel.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "constrainedModel": () => (/* binding */ constrainedModel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_deepClone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/deepClone.js */ "./src/utils/deepClone.js");
/* harmony import */ var _utils_enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/enums.js */ "./src/utils/enums.js");


const constrainedModel = function (model, ranges, monaco) {
  const rangeConstructor = monaco.Range;
  const sortRangesInAscendingOrder = function (rangeObject1, rangeObject2) {
    const rangeA = rangeObject1.range;
    const rangeB = rangeObject2.range;
    if (
      rangeA[0] < rangeB[0] ||
      (rangeA[0] === rangeB[0] && rangeA[3] < rangeB[1])
    ) {
      return -1;
    }
  }
  const normalizeRange = function (range, content) {
    const lines = content.split('\n');
    const noOfLines = lines.length;
    const normalizedRange = [];
    range.forEach(function (value, index) {
      if (value === 0) {
        throw new Error('Range values cannot be zero');//No I18n
      }
      switch (index) {
        case 0: {
          if (value < 0) {
            throw new Error('Start Line of Range cannot be negative');//No I18n
          } else if (value > noOfLines) {
            throw new Error('Provided Start Line(' + value + ') is out of bounds. Max Lines in content is ' + noOfLines);//No I18n
          }
          normalizedRange[index] = value;
        }
          break;
        case 1: {
          let actualStartCol = value;
          const startLineNo = normalizedRange[0];
          const maxCols = lines[startLineNo - 1].length
          if (actualStartCol < 0) {
            actualStartCol = maxCols - Math.abs(actualStartCol);
            if (actualStartCol < 0) {
              throw new Error('Provided Start Column(' + value + ') is out of bounds. Max Column in line ' + startLineNo + ' is ' + maxCols);//No I18n
            }
          } else if (actualStartCol > (maxCols + 1)) {
            throw new Error('Provided Start Column(' + value + ') is out of bounds. Max Column in line ' + startLineNo + ' is ' + maxCols);//No I18n
          }
          normalizedRange[index] = actualStartCol;
        }
          break;
        case 2: {
          let actualEndLine = value;
          if (actualEndLine < 0) {
            actualEndLine = noOfLines - Math.abs(value);
            if (actualEndLine < 0) {
              throw new Error('Provided End Line(' + value + ') is out of bounds. Max Lines in content is ' + noOfLines);//No I18n
            }
            if (actualEndLine < normalizedRange[0]) {
              console.warn('Provided End Line(' + value + ') is less than the start Line, the Restriction may not behave as expected');//No I18n
            }
          } else if (value > noOfLines) {
            throw new Error('Provided End Line(' + value + ') is out of bounds. Max Lines in content is ' + noOfLines);//No I18n
          }
          normalizedRange[index] = actualEndLine;
        }
          break;
        case 3: {
          let actualEndCol = value;
          const endLineNo = normalizedRange[2];
          const maxCols = lines[endLineNo - 1].length
          if (actualEndCol < 0) {
            actualEndCol = maxCols - Math.abs(actualEndCol);
            if (actualEndCol < 0) {
              throw new Error('Provided End Column(' + value + ') is out of bounds. Max Column in line ' + endLineNo + ' is ' + maxCols);//No I18n
            }
          } else if (actualEndCol > (maxCols + 1)) {
            throw new Error('Provided Start Column(' + value + ') is out of bounds. Max Column in line ' + endLineNo + ' is ' + maxCols);//No I18n
          }
          normalizedRange[index] = actualEndCol;
        }
          break;
      }
    })
    return normalizedRange;
  }
  let restrictions = (0,_utils_deepClone_js__WEBPACK_IMPORTED_MODULE_0__.default)(ranges).sort(sortRangesInAscendingOrder);
  const prepareRestrictions = function (restrictions) {
    const content = model.getValue();
    restrictions.forEach(function (restriction, index) {
      const range = normalizeRange(restriction.range, content);
      const startLine = range[0];
      const startCol = range[1];
      const endLine = range[2];
      const endCol = range[3];
      restriction._originalRange = range.slice();
      restriction.range = new rangeConstructor(startLine, startCol, endLine, endCol);
      restriction.index = index;
      if (!restriction.allowMultiline) {
        restriction.allowMultiline = rangeConstructor.spansMultipleLines(restriction.range)
      }
      if (!restriction.label) {
        restriction.label = `[${startLine},${startCol} -> ${endLine}${endCol}]`;
      }
    });
  }
  const getCurrentEditableRanges = function () {
    return restrictions.reduce(function (acc, restriction) {
      acc[restriction.label] = {
        allowMultiline: restriction.allowMultiline || false,
        index: restriction.index,
        range: Object.assign({}, restriction.range),
        originalRange: restriction._originalRange.slice()
      };
      return acc;
    }, {});
  }
  const getValueInEditableRanges = function () {
    return restrictions.reduce(function (acc, restriction) {
      acc[restriction.label] = model.getValueInRange(restriction.range);
      return acc;
    }, {});
  }
  const updateValueInEditableRanges = function (object, forceMoveMarkers) {
    if (typeof object === 'object' && !Array.isArray(object)) {
      forceMoveMarkers = typeof forceMoveMarkers === 'boolean' ? forceMoveMarkers : false;
      const restrictionsMap = restrictions.reduce(function (acc, restriction) {
        if (restriction.label) {
          acc[restriction.label] = restriction;
        }
        return acc;
      }, {});
      for (let label in object) {
        const restriction = restrictionsMap[label];
        if (restriction) {
          const value = object[label];
          if (doesChangeHasMultilineConflict(restriction, value)) {
            throw new Error('Multiline change is not allowed for ' + label);
          }
          const newRange = (0,_utils_deepClone_js__WEBPACK_IMPORTED_MODULE_0__.default)(restriction.range);
          newRange.endLine = newRange.startLine + value.split('\n').length - 1;
          newRange.endColumn = value.split('\n').pop().length;
          if (isChangeInvalidAsPerUser(restriction, value, newRange)) {
            throw new Error('Change is invalidated by validate function of ' + label);
          }
          model.applyEdits([{
            forceMoveMarkers: !!forceMoveMarkers,
            range: restriction.range,
            text: value
          }]);
        } else {
          console.error('No restriction found for ' + label);
        }
      }
    } else {
      throw new Error('Value must be an object');//No I18n
    }
  }
  const disposeRestrictions = function () {
    model._restrictionChangeListener.dispose();
    window.removeEventListener("error", handleUnhandledPromiseRejection);
    delete model.editInRestrictedArea;
    delete model.disposeRestrictions;
    delete model.getValueInEditableRanges;
    delete model.updateValueInEditableRanges;
    delete model.updateRestrictions;
    delete model.getCurrentEditableRanges;
    delete model.toggleHighlightOfEditableAreas;
    delete model._hasHighlight;
    delete model._isRestrictedModel;
    delete model._isCursorAtCheckPoint;
    delete model._currentCursorPositions;
    delete model._editableRangeChangeListener;
    delete model._restrictionChangeListener;
    delete model._oldDecorations;
    delete model._oldDecorationsSource;
    return model;
  }
  const isCursorAtCheckPoint = function (positions) {
    positions.some(function (position) {
      const posLineNumber = position.lineNumber;
      const posCol = position.column;
      const length = restrictions.length;
      for (let i = 0; i < length; i++) {
        const range = restrictions[i].range;
        if (
          (range.startLineNumber === posLineNumber && range.startColumn === posCol) ||
          (range.endLineNumber === posLineNumber && range.endColumn === posCol)
        ) {
          model.pushStackElement();
          return true;
        }
      }
    });
  };
  const addEditableRangeListener = function (callback) {
    if (typeof callback === 'function') {
      model._editableRangeChangeListener.push(callback);
    }
  };
  const triggerChangeListenersWith = function (currentChanges, allChanges) {
    const currentRanges = getCurrentEditableRanges();
    model._editableRangeChangeListener.forEach(function (callback) {
      callback.call(model, currentChanges, allChanges, currentRanges);
    });
  };
  const doUndo = function () {
    return Promise.resolve().then(function () {
      model.editInRestrictedArea = true;
      model.undo();
      model.editInRestrictedArea = false;
      if (model._hasHighlight && model._oldDecorationsSource) {
        // id present in the decorations info will be omitted by monaco
        // So we don't need to remove the old decorations id
        model.deltaDecorations(model._oldDecorations, model._oldDecorationsSource);
        model._oldDecorationsSource.forEach(function (object) {
          object.range = model.getDecorationRange(object.id);
        });
      }
    });
  };
  const updateRange = function (restriction, range, finalLine, finalColumn, changes, changeIndex) {
    let oldRangeEndLineNumber = range.endLineNumber;
    let oldRangeEndColumn = range.endColumn;
    restriction.prevRange = range;
    restriction.range = range.setEndPosition(finalLine, finalColumn);
    const length = restrictions.length;
    let changesLength = changes.length;
    const diffInCol = finalColumn - oldRangeEndColumn;
    const diffInRow = finalLine - oldRangeEndLineNumber;

    const cursorPositions = model._currentCursorPositions || [];
    const noOfCursorPositions = cursorPositions.length;
    // if (noOfCursorPositions > 0) {
    if (changesLength !== noOfCursorPositions) {
      changes = changes.filter(function (change) {
        const range = change.range;
        for (let i = 0; i < noOfCursorPositions; i++) {
          const cursorPosition = cursorPositions[i];
          if (
            (range.startLineNumber === cursorPosition.startLineNumber) &&
            (range.endLineNumber === cursorPosition.endLineNumber) &&
            (range.startColumn === cursorPosition.startColumn) &&
            (range.endColumn === cursorPosition.endColumn)
          ) {
            return true;
          }
        }
        return false;
      });
      changesLength = changes.length;
    }
    if (diffInRow !== 0) {
      for (let i = restriction.index + 1; i < length; i++) {
        const nextRestriction = restrictions[i];
        const nextRange = nextRestriction.range;
        if (oldRangeEndLineNumber === nextRange.startLineNumber) {
          nextRange.startColumn += diffInCol;
        }
        if (oldRangeEndLineNumber === nextRange.endLineNumber) {
          nextRange.endColumn += diffInCol;
        }
        nextRange.startLineNumber += diffInRow;
        nextRange.endLineNumber += diffInRow;
        nextRestriction.range = nextRange;
      }
      for (let i = changeIndex + 1; i < changesLength; i++) {
        const nextChange = changes[i];
        const rangeInChange = nextChange.range;
        const rangeAsString = rangeInChange.toString();
        const rangeMapValue = rangeMap[rangeAsString];
        delete rangeMap[rangeAsString];
        if (oldRangeEndLineNumber === rangeInChange.startLineNumber) {
          rangeInChange.startColumn += diffInCol;
        }
        if (oldRangeEndLineNumber === rangeInChange.endLineNumber) {
          rangeInChange.endColumn += diffInCol;
        }
        rangeInChange.startLineNumber += diffInRow;
        rangeInChange.endLineNumber += diffInRow;
        nextChange.range = rangeInChange;
        rangeMap[rangeInChange.toString()] = rangeMapValue;
      }
    } else {
      // Only Column might have changed
      for (let i = restriction.index + 1; i < length; i++) {
        const nextRestriction = restrictions[i];
        const nextRange = nextRestriction.range;
        if (nextRange.startLineNumber > oldRangeEndLineNumber) {
          break;
        } else {
          nextRange.startColumn += diffInCol;
          nextRange.endColumn += diffInCol;
          nextRestriction.range = nextRange;
        }
      }
      for (let i = changeIndex + 1; i < changesLength; i++) {
        // rangeMap
        const nextChange = changes[i];
        const rangeInChange = nextChange.range;
        const rangeAsString = rangeInChange.toString();
        const rangeMapValue = rangeMap[rangeAsString];
        delete rangeMap[rangeAsString];
        if (rangeInChange.startLineNumber > oldRangeEndLineNumber) {
          rangeMap[rangeInChange.toString()] = rangeMapValue;
          break;
        } else {
          rangeInChange.startColumn += diffInCol;
          rangeInChange.endColumn += diffInCol;
          nextChange.range = rangeInChange;
          rangeMap[rangeInChange.toString()] = rangeMapValue;
        }
      }
    }
    // }
  };
  const getInfoFrom = function (change, editableRange) {
    const info = {};
    const range = change.range;
    // Get State
    if (change.text === '') {
      info.isDeletion = true;
    } else if (
      (range.startLineNumber === range.endLineNumber) &&
      (range.startColumn === range.endColumn)
    ) {
      info.isAddition = true;
    } else {
      info.isReplacement = true;
    }
    // Get Position Of Range
    info.startLineOfRange = range.startLineNumber === editableRange.startLineNumber;
    info.startColumnOfRange = range.startColumn === editableRange.startColumn;

    info.endLineOfRange = range.endLineNumber === editableRange.endLineNumber;
    info.endColumnOfRange = range.endColumn === editableRange.endColumn;

    info.middleLineOfRange = !info.startLineOfRange && !info.endLineOfRange;

    // Editable Range Span
    if (editableRange.startLineNumber === editableRange.endLineNumber) {
      info.rangeIsSingleLine = true;
    } else {
      info.rangeIsMultiLine = true;
    }
    return info;
  };
  const updateRestrictions = function (ranges) {
    restrictions = (0,_utils_deepClone_js__WEBPACK_IMPORTED_MODULE_0__.default)(ranges).sort(sortRangesInAscendingOrder);
    prepareRestrictions(restrictions);
  };
  const toggleHighlightOfEditableAreas = function () {
    if (!model._hasHighlight) {
      const decorations = restrictions.map(function (restriction) {
        const decoration = {
          range: restriction.range,
          options: {
            className: restriction.allowMultiline ?
              _utils_enums_js__WEBPACK_IMPORTED_MODULE_1__.default.MULTI_LINE_HIGHLIGHT_CLASS :
              _utils_enums_js__WEBPACK_IMPORTED_MODULE_1__.default.SINGLE_LINE_HIGHLIGHT_CLASS
          }
        }
        if (restriction.label) {
          decoration.hoverMessage = restriction.label;
        }
        return decoration;
      });
      model._oldDecorations = model.deltaDecorations([], decorations);
      model._oldDecorationsSource = decorations.map(function (decoration, index) {
        return Object.assign({}, decoration, { id: model._oldDecorations[index] });
      });
      model._hasHighlight = true;
    } else {
      model.deltaDecorations(model._oldDecorations, []);
      delete model._oldDecorations;
      delete model._oldDecorationsSource;
      model._hasHighlight = false;
    }
  }
  const handleUnhandledPromiseRejection = function () {
    console.debug('handler for unhandled promise rejection');
  };
  const setAllRangesToPrev = function (rangeMap) {
    for (let key in rangeMap) {
      const restriction = rangeMap[key];
      restriction.range = restriction.prevRange;
    }
  };
  const doesChangeHasMultilineConflict = function (restriction, text) {
    return !restriction.allowMultiline && text.includes('\n');
  };
  const isChangeInvalidAsPerUser = function (restriction, value, range) {
    return restriction.validate && !restriction.validate(value, range, restriction.lastInfo);
  }

  const manipulatorApi = {
    _isRestrictedModel: true,
    _isRestrictedValueValid: true,
    _editableRangeChangeListener: [],
    _isCursorAtCheckPoint: isCursorAtCheckPoint,
    _currentCursorPositions: []
  }

  prepareRestrictions(restrictions);
  model._hasHighlight = false;
  manipulatorApi._restrictionChangeListener = model.onDidChangeContent(function (contentChangedEvent) {
    const isUndoing = contentChangedEvent.isUndoing;
    model._isRestrictedValueValid = true;
    if (!(isUndoing && model.editInRestrictedArea)) {
      const changes = contentChangedEvent.changes.sort(sortRangesInAscendingOrder);
      const rangeMap = {};
      const length = restrictions.length;
      const isAllChangesValid = changes.every(function (change) {
        const editedRange = change.range;
        const rangeAsString = editedRange.toString();
        rangeMap[rangeAsString] = null;
        for (let i = 0; i < length; i++) {
          const restriction = restrictions[i];
          const range = restriction.range;
          if (range.containsRange(editedRange)) {
            if (doesChangeHasMultilineConflict(restriction, change.text)) {
              return false;
            }
            rangeMap[rangeAsString] = restriction;
            return true;
          }
        }
        return false;
      })
      if (isAllChangesValid) {
        changes.forEach(function (change, changeIndex) {
          const changedRange = change.range;
          const restriction = rangeMap[changedRange.toString()];
          const editableRange = restriction.range;
          const text = change.text || '';
          /**
           * Things to check before implementing the change
           * - A | D | R => Addition | Deletion | Replacement
           * - MC | SC => MultiLineChange | SingleLineChange
           * - SOR | MOR | EOR => Change Occured in - Start Of Range | Middle Of Range | End Of Range
           * - SSL | SML => Editable Range - Spans Single Line | Spans Multiple Line
           */
          const noOfLinesAdded = (text.match(/\n/g) || []).length;
          const noOfColsAddedAtLastLine = text.split(/\n/g).pop().length;

          const lineDiffInRange = changedRange.endLineNumber - changedRange.startLineNumber;
          const colDiffInRange = changedRange.endColumn - changedRange.startColumn;

          let finalLine = editableRange.endLineNumber;
          let finalColumn = editableRange.endColumn;

          let columnsCarriedToEnd = 0;
          if (
            (editableRange.endLineNumber === changedRange.startLineNumber) ||
            (editableRange.endLineNumber === changedRange.endLineNumber)
          ) {
            columnsCarriedToEnd += (editableRange.endColumn - changedRange.startColumn) + 1;
          }

          const info = getInfoFrom(change, editableRange);
          restriction.lastInfo = info;
          if (info.isAddition || info.isReplacement) {
            if (info.rangeIsSingleLine) {
              /**
               * Only Column Change has occurred , so regardless of the position of the change
               * Addition of noOfCols is enough
               */
              if (noOfLinesAdded === 0) {
                finalColumn += noOfColsAddedAtLastLine;
              } else {
                finalLine += noOfLinesAdded;
                if (info.startColumnOfRange) {
                  finalColumn += noOfColsAddedAtLastLine
                } else if (info.endColumnOfRange) {
                  finalColumn = (noOfColsAddedAtLastLine + 1)
                } else {
                  finalColumn = (noOfColsAddedAtLastLine + columnsCarriedToEnd)
                }
              }
            }
            if (info.rangeIsMultiLine) {
              // Handling for Start Of Range is not required
              finalLine += noOfLinesAdded;
              if (info.endLineOfRange) {
                if (noOfLinesAdded === 0) {
                  finalColumn += noOfColsAddedAtLastLine;
                } else {
                  finalColumn = (columnsCarriedToEnd + noOfColsAddedAtLastLine);
                }
              }
            }
          }
          if (info.isDeletion || info.isReplacement) {
            if (info.rangeIsSingleLine) {
              finalColumn -= colDiffInRange;
            }
            if (info.rangeIsMultiLine) {
              if (info.endLineOfRange) {
                finalLine -= lineDiffInRange;
                finalColumn -= colDiffInRange;
              } else {
                finalLine -= lineDiffInRange;
              }
            }
          }
          updateRange(restriction, editableRange, finalLine, finalColumn, changes, changeIndex);
        });
        const values = model.getValueInEditableRanges();
        const currentlyEditedRanges = {};
        for (let key in rangeMap) {
          const restriction = rangeMap[key];
          const range = restriction.range;
          const rangeString = restriction.label || range.toString();
          const value = values[rangeString];
          if (isChangeInvalidAsPerUser(restriction, value, range)) {
            setAllRangesToPrev(rangeMap);
            doUndo();
            return; // Breaks the loop and prevents the triggerChangeListener
          }
          currentlyEditedRanges[rangeString] = value;
        }
        if (model._hasHighlight) {
          model._oldDecorationsSource.forEach(function (object) {
            object.range = model.getDecorationRange(object.id);
          });
        }
        triggerChangeListenersWith(currentlyEditedRanges, values);
      } else {
        doUndo();
      }
    } else if (model.editInRestrictedArea) {
      model._isRestrictedValueValid = false;
    }
  });
  window.onerror = handleUnhandledPromiseRejection;
  const exposedApi = {
    editInRestrictedArea: false,
    getCurrentEditableRanges: getCurrentEditableRanges,
    getValueInEditableRanges: getValueInEditableRanges,
    disposeRestrictions: disposeRestrictions,
    onDidChangeContentInEditableRange: addEditableRangeListener,
    updateRestrictions: updateRestrictions,
    updateValueInEditableRanges: updateValueInEditableRanges,
    toggleHighlightOfEditableAreas: toggleHighlightOfEditableAreas
  }
  for (let funcName in manipulatorApi) {
    Object.defineProperty(model, funcName, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: manipulatorApi[funcName]
    })
  }
  for (let apiName in exposedApi) {
    Object.defineProperty(model, apiName, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: exposedApi[apiName]
    })
  }
  return model;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constrainedModel);

/***/ }),

/***/ "./src/utils/deepClone.js":
/*!********************************!*\
  !*** ./src/utils/deepClone.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deepClone": () => (/* binding */ deepClone),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const deepClone = (function () {
  const byPassPrimitives = function (value, callback) {
    if (typeof value !== 'object' || value === null) {
      return this.freeze ? Object.freeze(value) : value;
    }
    if (value instanceof Date) {
      return this.freeze ? Object.freeze(new Date(value)) : new Date(value);
    }
    return callback.call(this, value);
  }
  const cloneArray = function (array, callback) {
    const keys = Object.keys(array);
    const arrayClone = new Array(keys.length)
    for (let i = 0; i < keys.length; i++) {
      arrayClone[keys[i]] = byPassPrimitives.call(this, array[keys[i]], callback);
    }
    return arrayClone;
  }
  const cloner = function (object) {
    return byPassPrimitives.call(this, object, function (object) {
      if (Array.isArray(object)) {
        return cloneArray.call(this, object, cloner)
      }
      const clone = {};
      for (let key in object) {
        if (!this.withProto && Object.hasOwnProperty.call(object, key) === false) {
          continue;
        }
        clone[key] = byPassPrimitives.call(this, object[key], cloner);
      }
      return clone;
    })
  }
  const config = (function () {
    const constructOptionForCode = function (value) {
      const options = [
        'withProto',
        'freeze'
      ]
      this[value] = options.reduce(function (acc, option) {
        if (acc[option] = (value >= this[option])) {
          value -= this[option]
        }
        return acc;
      }.bind(this), {})
    }
    const codes = Object.create(Object.defineProperties({}, {
      withProto: { value: 1 },
      freeze: { value: 2 }
    }));
    for (let i = 0; i <= 3; i++) {
      constructOptionForCode.call(codes, i);
    }
    return codes;
  }());
  const methods = {
    withProto: cloner.bind(config[1]),
    andFreeze: cloner.bind(config[2]),
    withProtoAndFreeze: cloner.bind(config[3])
  }
  const API = cloner.bind(config[0]);
  for (let methodName in methods) {
    Object.defineProperty(API, methodName, {
      enumerable: false,
      writable: false,
      configurable: false,
      value: methods[methodName]
    })
  }
  return API;
}());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deepClone);

/***/ }),

/***/ "./src/utils/definedErrors.js":
/*!************************************!*\
  !*** ./src/utils/definedErrors.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypeMustBe": () => (/* binding */ TypeMustBe),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const TypeMustBe = function (type, key, additional) {
  return 'The value for the ' + key + ' should be of type ' + (Array.isArray(type) ? type.join(' | ') : type) + '. ' + (additional || '')
}
const definedErrors = {
  TypeMustBe : TypeMustBe
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (definedErrors);

/***/ }),

/***/ "./src/utils/enums.js":
/*!****************************!*\
  !*** ./src/utils/enums.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enums": () => (/* binding */ enums),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const enums = {
  SINGLE_LINE_HIGHLIGHT_CLASS: 'editableArea--single-line',
  MULTI_LINE_HIGHLIGHT_CLASS: 'editableArea--multi-line'
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (enums);

/***/ }),

/***/ "./src/utils/validators.js":
/*!*********************************!*\
  !*** ./src/utils/validators.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validators);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./src/constrainedEditor.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "constrainedEditor": () => (/* binding */ constrainedEditor),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_validators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/validators.js */ "./src/utils/validators.js");
/* harmony import */ var _utils_definedErrors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/definedErrors.js */ "./src/utils/definedErrors.js");
/* harmony import */ var _constrainedModel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constrainedModel.js */ "./src/constrainedModel.js");




function constrainedEditor(monaco) {
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
  const { isInstanceValid, isModelValid, isRangesValid } = _utils_validators_js__WEBPACK_IMPORTED_MODULE_0__.default.initWith(monaco);
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
        (0,_utils_definedErrors_js__WEBPACK_IMPORTED_MODULE_1__.TypeMustBe)(
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
        const modelToConstrain = (0,_constrainedModel_js__WEBPACK_IMPORTED_MODULE_2__.default)(model, ranges, monaco, manipulator._editorInstance);
        _uriRestrictionMap[modelToConstrain.uri.toString()] = modelToConstrain;
        return modelToConstrain;
      } else {
        throw new Error(
          (0,_utils_definedErrors_js__WEBPACK_IMPORTED_MODULE_1__.TypeMustBe)(
            'Array<RangeRestrictionObject>',
            'ranges',
            'Please refer constrained editor documentation for proper structure'
          )
        )
      }
    } else {
      throw new Error(
        (0,_utils_definedErrors_js__WEBPACK_IMPORTED_MODULE_1__.TypeMustBe)(
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
        (0,_utils_definedErrors_js__WEBPACK_IMPORTED_MODULE_1__.TypeMustBe)(
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constrainedEditor);

})();

window.constrainedEditor = __webpack_exports__.default;
/******/ })()
;
//# sourceMappingURL=constrainedEditorPlugin.js.map