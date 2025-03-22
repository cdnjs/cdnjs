"use strict";
exports.id = 2366;
exports.ids = [2366,9359];
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


/***/ })

};
;
//# sourceMappingURL=2366.jclic-node.js.map