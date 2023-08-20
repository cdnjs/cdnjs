import deepClone from './utils/deepClone.js';
import enums from './utils/enums.js';
export const constrainedModel = function (model, ranges, monaco) {
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
  let restrictions = deepClone(ranges).sort(sortRangesInAscendingOrder);
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
          const newRange = deepClone(restriction.range);
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
    restrictions = deepClone(ranges).sort(sortRangesInAscendingOrder);
    prepareRestrictions(restrictions);
  };
  const toggleHighlightOfEditableAreas = function () {
    if (!model._hasHighlight) {
      const decorations = restrictions.map(function (restriction) {
        const decoration = {
          range: restriction.range,
          options: {
            className: restriction.allowMultiline ?
              enums.MULTI_LINE_HIGHLIGHT_CLASS :
              enums.SINGLE_LINE_HIGHLIGHT_CLASS
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
export default constrainedModel;