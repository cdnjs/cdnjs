"use strict";

exports.__esModule = true;
exports.ResponderTouchHistoryStore = void 0;
var _ResponderEventTypes = require("./ResponderEventTypes");
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Tracks the position and time of each active touch by `touch.identifier`. We
 * should typically only see IDs in the range of 1-20 because IDs get recycled
 * when touches end and start again.
 */

var __DEV__ = process.env.NODE_ENV !== 'production';
var MAX_TOUCH_BANK = 20;
function timestampForTouch(touch) {
  // The legacy internal implementation provides "timeStamp", which has been
  // renamed to "timestamp".
  return touch.timeStamp || touch.timestamp;
}

/**
 * TODO: Instead of making gestures recompute filtered velocity, we could
 * include a built in velocity computation that can be reused globally.
 */
function createTouchRecord(touch) {
  return {
    touchActive: true,
    startPageX: touch.pageX,
    startPageY: touch.pageY,
    startTimeStamp: timestampForTouch(touch),
    currentPageX: touch.pageX,
    currentPageY: touch.pageY,
    currentTimeStamp: timestampForTouch(touch),
    previousPageX: touch.pageX,
    previousPageY: touch.pageY,
    previousTimeStamp: timestampForTouch(touch)
  };
}
function resetTouchRecord(touchRecord, touch) {
  touchRecord.touchActive = true;
  touchRecord.startPageX = touch.pageX;
  touchRecord.startPageY = touch.pageY;
  touchRecord.startTimeStamp = timestampForTouch(touch);
  touchRecord.currentPageX = touch.pageX;
  touchRecord.currentPageY = touch.pageY;
  touchRecord.currentTimeStamp = timestampForTouch(touch);
  touchRecord.previousPageX = touch.pageX;
  touchRecord.previousPageY = touch.pageY;
  touchRecord.previousTimeStamp = timestampForTouch(touch);
}
function getTouchIdentifier(_ref) {
  var identifier = _ref.identifier;
  if (identifier == null) {
    console.error('Touch object is missing identifier.');
  }
  if (__DEV__) {
    if (identifier > MAX_TOUCH_BANK) {
      console.error('Touch identifier %s is greater than maximum supported %s which causes ' + 'performance issues backfilling array locations for all of the indices.', identifier, MAX_TOUCH_BANK);
    }
  }
  return identifier;
}
function recordTouchStart(touch, touchHistory) {
  var identifier = getTouchIdentifier(touch);
  var touchRecord = touchHistory.touchBank[identifier];
  if (touchRecord) {
    resetTouchRecord(touchRecord, touch);
  } else {
    touchHistory.touchBank[identifier] = createTouchRecord(touch);
  }
  touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
}
function recordTouchMove(touch, touchHistory) {
  var touchRecord = touchHistory.touchBank[getTouchIdentifier(touch)];
  if (touchRecord) {
    touchRecord.touchActive = true;
    touchRecord.previousPageX = touchRecord.currentPageX;
    touchRecord.previousPageY = touchRecord.currentPageY;
    touchRecord.previousTimeStamp = touchRecord.currentTimeStamp;
    touchRecord.currentPageX = touch.pageX;
    touchRecord.currentPageY = touch.pageY;
    touchRecord.currentTimeStamp = timestampForTouch(touch);
    touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
  } else {
    console.warn('Cannot record touch move without a touch start.\n', "Touch Move: " + printTouch(touch) + "\n", "Touch Bank: " + printTouchBank(touchHistory));
  }
}
function recordTouchEnd(touch, touchHistory) {
  var touchRecord = touchHistory.touchBank[getTouchIdentifier(touch)];
  if (touchRecord) {
    touchRecord.touchActive = false;
    touchRecord.previousPageX = touchRecord.currentPageX;
    touchRecord.previousPageY = touchRecord.currentPageY;
    touchRecord.previousTimeStamp = touchRecord.currentTimeStamp;
    touchRecord.currentPageX = touch.pageX;
    touchRecord.currentPageY = touch.pageY;
    touchRecord.currentTimeStamp = timestampForTouch(touch);
    touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
  } else {
    console.warn('Cannot record touch end without a touch start.\n', "Touch End: " + printTouch(touch) + "\n", "Touch Bank: " + printTouchBank(touchHistory));
  }
}
function printTouch(touch) {
  return JSON.stringify({
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
    timestamp: timestampForTouch(touch)
  });
}
function printTouchBank(touchHistory) {
  var touchBank = touchHistory.touchBank;
  var printed = JSON.stringify(touchBank.slice(0, MAX_TOUCH_BANK));
  if (touchBank.length > MAX_TOUCH_BANK) {
    printed += ' (original size: ' + touchBank.length + ')';
  }
  return printed;
}
class ResponderTouchHistoryStore {
  constructor() {
    this._touchHistory = {
      touchBank: [],
      //Array<TouchRecord>
      numberActiveTouches: 0,
      // If there is only one active touch, we remember its location. This prevents
      // us having to loop through all of the touches all the time in the most
      // common case.
      indexOfSingleActiveTouch: -1,
      mostRecentTimeStamp: 0
    };
  }
  recordTouchTrack(topLevelType, nativeEvent) {
    var touchHistory = this._touchHistory;
    if ((0, _ResponderEventTypes.isMoveish)(topLevelType)) {
      nativeEvent.changedTouches.forEach(touch => recordTouchMove(touch, touchHistory));
    } else if ((0, _ResponderEventTypes.isStartish)(topLevelType)) {
      nativeEvent.changedTouches.forEach(touch => recordTouchStart(touch, touchHistory));
      touchHistory.numberActiveTouches = nativeEvent.touches.length;
      if (touchHistory.numberActiveTouches === 1) {
        touchHistory.indexOfSingleActiveTouch = nativeEvent.touches[0].identifier;
      }
    } else if ((0, _ResponderEventTypes.isEndish)(topLevelType)) {
      nativeEvent.changedTouches.forEach(touch => recordTouchEnd(touch, touchHistory));
      touchHistory.numberActiveTouches = nativeEvent.touches.length;
      if (touchHistory.numberActiveTouches === 1) {
        var touchBank = touchHistory.touchBank;
        for (var i = 0; i < touchBank.length; i++) {
          var touchTrackToCheck = touchBank[i];
          if (touchTrackToCheck != null && touchTrackToCheck.touchActive) {
            touchHistory.indexOfSingleActiveTouch = i;
            break;
          }
        }
        if (__DEV__) {
          var activeRecord = touchBank[touchHistory.indexOfSingleActiveTouch];
          if (!(activeRecord != null && activeRecord.touchActive)) {
            console.error('Cannot find single active touch.');
          }
        }
      }
    }
  }
  get touchHistory() {
    return this._touchHistory;
  }
}
exports.ResponderTouchHistoryStore = ResponderTouchHistoryStore;