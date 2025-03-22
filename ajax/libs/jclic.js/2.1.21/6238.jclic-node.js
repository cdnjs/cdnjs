"use strict";
exports.id = 6238;
exports.ids = [6238,9359,2366];
exports.modules = {

/***/ 9359:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActionReg */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/**
 *  File    : report/ActionReg.js
 *  Created : 17/05/2016
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */




/**
 * This class stores information about one specific action done by the current user while playing
 * an activity.
 *
 */
class ActionReg {
  /**
   * ActionReg constructor
   * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
   * @param {string}+ source - Description of the object on which the action is done.
   * @param {string}+ dest - Description of the object that acts as a target of the action (used in pairings)
   * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwise
   */
  constructor(type, source, dest, ok) {
    this.type = type;
    this.source = source || null;
    this.dest = dest || null;
    this.ok = ok || false;
    this.time = (new Date()).valueOf();
  }

  /**
   * Provides the data associated with this action in XML format suitable for a
   * {@link http://clic.xtec.cat/en/jclic/reports/|JClic Reports Server}.
   * @returns {external:jQuery}
   */
  $getXML() {
    const attr = { ok: this.ok, time: this.time };
    if (this.type)
      attr.type = this.type;
    if (this.source)
      attr.source = this.source;
    if (this.dest)
      attr.dest = this.dest;
    return jquery__WEBPACK_IMPORTED_MODULE_0___default()('<action/>', attr);
  }

  /**
   * Fills this ActionReg with data provided in XML format
   * @param {external:jQuery} $xml - The XML element to be processed, already wrapped as jQuery object
   */
  setProperties($xml) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, value) => {
      switch (name) {
        case 'type':
        case 'source':
        case 'dest':
          this[name] = value;
          break;
        case 'time':
          this[name] = Number(value);
          break;
        case 'ok':
          this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(value, false);
          break;
      }
    });
  }
}

Object.assign(ActionReg.prototype, {
  /**
   * The type of action (`click`, `write`, `move`, `select`...)
   * @name module:report/ActionReg.ActionReg#type
   * @type {string} */
  type: 'unknown',
  /**
   * Description of the object on which the action was done
   * @name module:report/ActionReg.ActionReg#source
   * @type {string} */
  source: null,
  /**
   * Description of the object that has acted as a target of the action (used in pairings)
   * @name module:report/ActionReg.ActionReg#dest
   * @type {string} */
  dest: null,
  /**
   * Time stamp taken when the action was done
   * @name module:report/ActionReg.ActionReg#time
   * @type {number} */
  time: 0,
  /**
   * `true` if the action was OK
   * @name module:report/ActionReg.ActionReg#isOk
   * @type {boolean} */
  isOk: false,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActionReg);


/***/ }),

/***/ 2366:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ActivityReg */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/* harmony import */ var _ActionReg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9359);
/**
 *  File    : report/ActivityReg.js
 *  Created : 17/05/2016
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */





/**
 * This class stores miscellaneous data obtained by the current user playing an {@link module:Activity.Activity Activity}.
 */
class ActivityReg {
  /**
   * ActivityReg constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} referenced by this object.
   */
  constructor(act) {
    this.name = act.name;
    this.code = act.code;
    this.actions = [];
    this.startTime = (new Date()).valueOf();
    this.minActions = act.getMinNumActions();
    this.reportActions = act.reportActions;
  }

  /**
   * Provides the data associated with the current activity in an XML format suitable for a
   * {@link http://clic.xtec.cat/en/jclic/reports/|JClic Reports Server}.
   * @returns {external:jQuery}
   */
  $getXML() {
    const attr = {
      start: this.startTime,
      time: this.totalTime,
      solved: this.solved,
      score: this.score,
      minActions: this.minActions,
      actions: this.numActions
    };
    if (this.name)
      attr.name = this.name;
    if (this.code)
      attr.code = this.code;
    if (!this.closed)
      attr.closed = false;
    if (this.reportActions)
      attr.reportActions = true;

    const $result = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<activity/>', attr);
    this.actions.forEach(ac => {
      $result.append(ac.$getXML());
    });
    return $result;
  }

  /**
   * Builds an object with relevant data about the results obtained by the current student in this activity
   * @returns {object} - The results of this activity
   */
  getData() {
    const result = {
      name: this.name,
      time: Math.round(this.totalTime / 10) / 100,
      solved: this.solved,
      score: this.score,
      minActions: this.minActions,
      actions: this.numActions,
      precision: this.getPrecision(),
      closed: this.closed
    };
    if (this.code)
      result.code = this.code;
    return result;
  }

  /**
   * Fills this ActivityReg with data provided in XML format
   * @param {external:jQuery} $xml -The XML element to be processed, already wrapped as jQuery object
   */
  setProperties($xml) {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .attrForEach */ .GM)($xml.get(0).attributes, (name, value) => {
      switch (name) {
        case 'name':
        case 'code':
          this[name] = value;
          break;
        case 'start':
        case 'time':
        case 'score':
        case 'minActions':
        case 'actions':
          this[name] = Number(value);
          break;
        case 'solved':
        case 'closed':
        case 'reportActions':
          this[name] = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getBoolean */ .pW)(value, false);
          break;
      }
    });
    $xml.children('action').each((_n, child) => {
      const action = new _ActionReg_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
      action.setProperties(jquery__WEBPACK_IMPORTED_MODULE_0___default()(child));
      this.actions.push(action);
    });
  }

  /**
   * Reports a new action done by the user while playing the current activity
   * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
   * @param {string}+ source - Description of the object on which the action is done.
   * @param {string}+ dest - Description of the object that acts as a target of the action (used in pairings)
   * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwise
   */
  newAction(type, source, dest, ok) {
    if (!this.closed) {
      this.lastAction = new _ActionReg_js__WEBPACK_IMPORTED_MODULE_2__["default"](type, source, dest, ok);
      this.actions.push(this.lastAction);
    }
  }

  /**
   * Retrieves a specific {@link module:report/ActionReg.ActionReg ActionReg} element from `actions`
   * @param {number} index - The nth action to be retrieved
   * @returns {module:report/ActionReg.ActionReg}
   */
  getActionReg(index) {
    return index >= this.actions.length ? null : this.actions[index];
  }

  /**
   * Closes the current activity, adjusting total time if needed
   */
  closeActivity() {
    if (!this.closed) {
      if (this.lastAction)
        this.totalTime = this.lastAction.time - this.startTime;
      else
        this.totalTime = (new Date()).valueOf() - this.startTime;
      this.closed = true;
    }
  }

  /**
   * calculates the final score obtained by the user in this activity.
   * The algorithm used takes in account the minimal number of actions needed, the actions
   * really done by the user, and if the activity was finally solved or not.
   * @returns {number}
   */
  getPrecision() {
    let result = 0;
    if (this.closed && this.minActions > 0 && this.numActions > 0) {
      if (this.solved) {
        if (this.numActions < this.minActions)
          result = 100;
        else
          result = Math.round(this.minActions * 100 / this.numActions);
      } else
        result = Math.round(100 * (this.score * this.score) / (this.minActions * this.numActions));
    }
    return result;
  }

  /**
   * This method should be called when the current activity finishes. Data about user's final results
   * on the activity will then be saved.
   * @param {number} score - The final score, usually in a 0-100 scale.
   * @param {number} numActions - The total number of actions done by the user to solve the activity
   * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
   */
  endActivity(score, numActions, solved) {
    if (!this.closed) {
      this.solved = solved;
      this.numActions = numActions;
      this.score = score;
      this.closeActivity();
    }
  }
}

Object.assign(ActivityReg.prototype, {
  /**
   * Name of the associated activity
   * @name module:report/ActivityReg.ActivityReg#name
   * @type {string} */
  name: '',
  /**
   * Optional code assigned to this activity, used for later filtering
   * @name module:report/ActivityReg.ActivityReg#code
   * @type {string} */
  code: '',
  /**
   * Timestamp when the user starts playing the activity
   * @name module:report/ActivityReg.ActivityReg#startTime
   * @type {number} */
  startTime: 0,
  /**
   * Total time spent by the user in the activity, measured in milliseconds
   * @name module:report/ActivityReg.ActivityReg#totalTime
   * @type {number} */
  totalTime: 0,
  /**
   * Collection of actions done by the user while playing the activity
   * @name module:report/ActivityReg.ActivityReg#actions
   * @type {module:report/ActionReg.ActionReg[]} */
  actions: [],
  /**
   * `true` only when the user has finished and solved the activity
   * @name module:report/ActivityReg.ActivityReg#solved
   * @type {boolean} */
  solved: false,
  /**
   * Last {@link module:report/ActionReg.ActionReg ActionReg} performed by the user in this activity
   * @name module:report/ActivityReg.ActivityReg#lastAction
   * @type {module:report/ActionReg.ActionReg} */
  lastAction: null,
  /**
   * Final score obtained by the current user in this activity
   * @name module:report/ActivityReg.ActivityReg#score
   * @type {number} */
  score: 0,
  /**
   * Minimum number of actions needed to solve the activity
   * @name module:report/ActivityReg.ActivityReg#minActions
   * @type {number} */
  minActions: 0,
  /**
   * `true` when the activity has finished, `false` for the activity that is currently playing
   * @name module:report/ActivityReg.ActivityReg#closed
   * @type {boolean} */
  closed: false,
  /**
   * `true` when this type of activity should record specific actions done by the users
   * @name module:report/ActivityReg.ActivityReg#reportActions
   * @type {boolean} */
  reportActions: false,
  /**
   * Number of actions done by the user playing this activity
   * @name module:report/ActivityReg.ActivityReg#numActions
   * @type {number} */
  numActions: 0,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActivityReg);


/***/ }),

/***/ 6238:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports SequenceReg, SequenceRegInfo */
/* harmony import */ var _ActivityReg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2366);
/**
 *  File    : report/SequenceReg.js
 *  Created : 17/05/2016
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */



/**
 * This class stores the results of the activities related to an {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}.
 * It's main component is an array of {@link module:report/ActivityReg.ActivityReg ActivityReg} elements.
 */
class SequenceReg {
  /**
   * SequenceReg constructor
   * @param {module:bags/ActivitySequenceElement.ActivitySequenceElement} ase - The {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement} related to this sequence.
   */
  constructor(ase) {
    this.name = ase.tag;
    this.description = ase.description;
    this.activities = [];
    this.currentActivity = null;
    this.totalTime = 0;
    this.closed = false;
    this.info = new SequenceRegInfo(this);
  }

  /**
   * Builds a complex object with data about the results of the activities done in this sequence
   * @returns {object} - The sequence results
   */
  getData() {
    const result = {
      sequence: this.name,
      activities: []
    };
    this.activities.forEach(act => result.activities.push(act.getData()));
    return result;
  }

  /**
   * Returns the `info` element associated to this SequenceReg.
   * @returns {module:report/SequenceReg.SequenceRegInfo}
   */
  getInfo() {
    return this.info.recalc();
  }

  /**
   * This method should be called when the current working session finishes.
   */
  endSequence() {
    if (this.currentActivity && this.activities.length > 0) {
      if (!this.currentActivity.closed)
        this.currentActivity.closeActivity();
      this.totalTime = this.currentActivity.startTime + this.currentActivity.totalTime - this.activities[0].startTime;
      this.info.valid = false;
    }
  }

  /**
   * This method should be invoked when the user starts a new activity
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} that has just started
   */
  newActivity(act) {
    if (!this.closed) {
      this.currentActivity = new _ActivityReg_js__WEBPACK_IMPORTED_MODULE_0__["default"](act);
      this.activities.push(this.currentActivity);
      this.info.valid = false;
    }
  }

  /**
   * This method should be called when the current activity finishes. Data about user's final results
   * on the activity will then be saved.
   * @param {number} score - The final score, usually in a 0-100 scale.
   * @param {number} numActions - The total number of actions done by the user to solve the activity
   * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
   */
  endActivity(score, numActions, solved) {
    if (this.currentActivity) {
      this.currentActivity.endActivity(score, numActions, solved);
      this.info.valid = false;
    }
  }

  /**
   * Reports a new action done by the user while playing the current activity
   * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
   * @param {string}+ source - Description of the object on which the action is done.
   * @param {string}+ dest - Description of the object that acts as a target of the action (used in pairings)
   * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwise
   */
  newAction(type, source, dest, ok) {
    if (this.currentActivity) {
      this.currentActivity.newAction(type, source, dest, ok);
      this.info.valid = false;
    }
  }
}

Object.assign(SequenceReg.prototype, {
  /**
   * The `tag` member of the associated {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}
   * @name module:report/SequenceReg.SequenceReg#name
   * @type {string} */
  name: '',
  /**
   * Optional description given to the {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}
   * @name module:report/SequenceReg.SequenceReg#description
   * @type {string} */
  description: '',
  /**
   * Collection of all the {@link module:report/ActivityReg.ActivityReg ActivityReg} elements done during this sequence.
   * @name module:report/SequenceReg.SequenceReg#activities
   * @type {module:report/ActivityReg.ActivityReg[]} */
  activities: [],
  /**
   * Registry linked to the {@link module:Activity.Activity Activity} that is currently running
   * @name module:report/SequenceReg.SequenceReg#currentActivity
   * @type {module:report/ActivityReg.ActivityReg} */
  currentActivity: null,
  /**
   * Total time spent on the activities of this sequence
   * @name module:report/SequenceReg.SequenceReg#totalTime
   * @type {number} */
  totalTime: 0,
  /**
   * Flag indicating if the sequence is closed or already available for more activities
   * @name module:report/SequenceReg.SequenceReg#closed
   * @type {boolean} */
  closed: false,
  /**
   * Object with global information associated to this sequence
   * @name module:report/SequenceReg.SequenceReg#info
   * @type {module:report/SequenceReg.SequenceRegInfo} */
  info: null,
});

/**
 * This object stores the global results of a {@link module:report/SequenceReg.SequenceReg SequenceReg}
 */
class SequenceRegInfo {
  /**
   * SequenceRegInfo constructor
   * @param {module:report/SequenceReg.SequenceReg} sqReg - The {@link module:report/SequenceReg.SequenceReg SequenceReg} associated tho this `Info` object.
   */
  constructor(sqReg) {
    this.sqReg = sqReg;
  }

  /**
   * Clears all global data associated with this sequence
   */
  clear() {
    this.nActivities = this.nActClosed = this.nActSolved = this.nActScore = 0;
    this.ratioSolved = this.nActions = this.tScore = this.tTime = 0;
    this.valid = false;
  }

  /**
   * Computes the value of all global variables based on the data stored in `activities`
   * @returns {module:report/SequenceReg.SequenceRegInfo} - This "info" object
   */
  recalc() {
    if (!this.valid) {
      this.clear();
      this.nActivities = this.sqReg.activities.length;
      if (this.nActivities > 0) {
        this.sqReg.activities.forEach(ar => {
          if (ar.closed) {
            this.nActClosed++;
            this.tTime += ar.totalTime;
            this.nActions += ar.numActions;
            if (ar.solved)
              this.nActSolved++;
            const r = ar.getPrecision();
            if (r >= 0) {
              this.tScore += r;
              this.nActScore++;
            }
          }
        });
        if (this.nActClosed > 0)
          this.ratioSolved = this.nActSolved / this.nActClosed;
        if (this.nActScore > 0)
          this.tScore = Math.round(this.tScore / this.nActScore);
      }
      this.valid = true;
    }
    return this;
  }
}

Object.assign(SequenceRegInfo.prototype, {
  /**
   * The {@link module:report/SequenceReg.SequenceReg SequenceReg} associated to this "info" object
   * @name module:report/SequenceReg.SequenceRegInfo#sqReg
   * @type {module:report/SequenceReg.SequenceReg} */
  sqReg: null,
  /**
   * When `false`, data must be recalculated
   * @name module:report/SequenceReg.SequenceRegInfo#valid
   * @type {boolean} */
  valid: false,
  /**
   * Number of activities played in this sequence
   * @name module:report/SequenceReg.SequenceRegInfo#nActivities
   * @type {number} */
  nActivities: 0,
  /**
   * Number of activities already closed
   * @name module:report/SequenceReg.SequenceRegInfo#nActClosed
   * @type {number} */
  nActClosed: 0,
  /**
   * Number of activities solved
   * @name module:report/SequenceReg.SequenceRegInfo#nActSolved
   * @type {number} */
  nActSolved: 0,
  /**
   * Number of activities with score > 0
   * @name module:report/SequenceReg.SequenceRegInfo#nActScore
   * @type {number} */
  nActScore: 0,
  /**
   * Percentage of solved activities
   * @name module:report/SequenceReg.SequenceRegInfo#ratioSolved
   * @type {number} */
  ratioSolved: 0,
  /**
   * Number of actions done by the user while in this sequence
   * @name module:report/SequenceReg.SequenceRegInfo#nActions
   * @type {number} */
  nActions: 0,
  /**
   * Sum of the scores of all the activities played
   * @name module:report/SequenceReg.SequenceRegInfo#tScore
   * @type {number} */
  tScore: 0,
  /**
   * Sum of the playing time reported by each activity (not always equals to the sequence's total time)
   * @name module:report/SequenceReg.SequenceRegInfo#tTime
   * @type {number} */
  tTime: 0,
});

SequenceReg.Info = SequenceRegInfo;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SequenceReg);


/***/ })

};
;
//# sourceMappingURL=6238.jclic-node.js.map