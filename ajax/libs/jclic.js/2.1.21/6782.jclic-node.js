"use strict";
exports.id = 6782;
exports.ids = [6782,5344,6565,8641];
exports.modules = {

/***/ 5344:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Encryption */
/**
 *  File    : report/Encryption.js
 *  Created : 18/06/2015
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
 *
 * Utilities to encrypt and decrypt strings using simple methods, just to avoid write
 * passwords in plain text in data and configuration files. Do not use it as a
 * secure cryptographic system!
 *
 * Based on {@link https://github.com/projectestac/jclic/blob/master/src/utilities/edu/xtec/util/Encryption.java Encryption}
 * utilities, created by Albert Llastarri for {@link https://github.com/projectestac/jclic JClic}.
 *
 * IMPORTANT: This is a shortened version of Encryption with only the methods needed to decrypt
 * stored passwords. Full version is on file `src/misc/encryption/Encryption.js`
 *
 * @abstract
 */
class Encryption {
  /**
   * Decrypts the given code
   * @param {string} txt - Code to be decrypted
   * @returns {string}
   */
  static Decrypt(txt) {
    if (txt === null || txt.length === 0)
      return null;
    const s = Encryption.decodify(txt);
    return s === Encryption.BLANK ? '' : s;
  }

  /**
   * @param {string} cA (was char[])
   * @param {number} fromIndex
   * @returns {string} (was char)
   */
  static hexCharArrayToChar(cA, fromIndex) {
    let n = 0;
    for (let i = 0; i <= 3; i++) {
      const j = Number.parseInt(cA[fromIndex + i], 16);
      if (isNaN(j))
        throw 'Invalid expression!';
      else
        n = n * 16 + j;
    }
    return String.fromCharCode(n);
  }

  /**
   * @param {string} cA - (was char[])
   * @param {number} fromIndex
   * @returns {number}
   */
  static hexCharArrayToInt(cA, fromIndex) {
    let n = 0;
    for (let i = 0; i <= 1; i++) {
      const j = Number.parseInt(cA[fromIndex + i], 16);
      if (isNaN(j))
        throw 'Invalid expression!';
      else
        n = n * 16 + j;
    }
    return n;
  }

  /**
   * @param {string} cA - (was char[])
   * @returns {string}
   */
  static decodifyZerosField(cA) {
    let
      sb = '',
      num = Number.parseInt(cA[0], 32),
      k = 0,
      i = 0;

    for (i = 0; num !== 0; i++) {
      while (num > 0) {
        sb = sb + cA[i * 3 + 1] + cA[i * 3 + 2];
        num--;
        k++;
      }
      if (cA.length > i * 3 + 3)
        num = Number.parseInt(cA[i * 3 + 3], 32);
      else
        num = 0;
    }
    for (let j = i * 3 + 1; j < cA.length; j++)
      sb = sb + cA[j];

    return Number.parseInt(k, 32) + sb;
  }

  /**
   * @param {string} cA - (was char[])
   * @returns {string} (was StringBuilder)
   */
  static decompressZeros(cA) {
    cA = Encryption.decodifyZerosField(cA);
    let
      numBytesZeros = Number.parseInt(cA[0], 32),
      iniNoZeros = numBytesZeros * 2 + 1,
      bFi = false,
      sb = '';

    for (let i = 0; i < numBytesZeros && !bFi; i++) {
      const zeros = Encryption.hexCharArrayToInt(cA, 1 + i * 2);
      let s = zeros.toString(2);
      while (s.length < 8)
        s = '0' + s;
      for (let j = 0; j <= 7 && !bFi; j++) {
        if (s[j] === '1')
          sb = sb + '0';
        else if (iniNoZeros < cA.length)
          sb = sb + cA[iniNoZeros++];
        else
          bFi = true;
      }
    }
    return sb;
  }

  /**
   * @param {string} sb1 - (was StringBuilder)
   * @returns {string}
   */
  static decodifyFromHex(sb1) {
    let sb = '', j = 0;
    for (let i = 0; j < sb1.length; i++) {
      const c = Encryption.hexCharArrayToChar(sb1, j);
      sb = sb + c;
      j += 4;
    }
    return sb;
  }

  /**
   * @param {string} s
   * @returns {string} (was char[])
   */
  static unchangeOrder(s) {
    let m = 0, n = s.length - 1;
    const cA = [];
    for (let p = 0; p < s.length; p++)
      cA[p] = '';
    for (let i = 0; i < s.length; i++)
      if (i % 2 === 0)
        cA[i] = s[m++];
      else
        cA[i] = s[n--];
    return cA.join('');
  }

  /**
   * @param {string} word
   * @returns {string}
   */
  static codify(word) {
    if (word.length > 24)
      throw 'Password is too large!';
    return Encryption.changeOrder(Encryption.compressZeros(Encryption.codifyToHexWord(word)));
  }

  /**
   * @param {string} word
   * @returns {string}
   */
  static decodify(word) {
    try {
      return Encryption.decodifyFromHex(Encryption.decompressZeros(Encryption.unchangeOrder(word)));
    } catch (_ex) { //The supplied word was not codified using this system
      return '';
    }
  }
}

/**
* Default bank password
* @type {string}
*/
Encryption.BLANK = '___blank___##';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Encryption);


/***/ }),

/***/ 6782:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports Reporter, ReporterInfo */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SessionReg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8641);
/* harmony import */ var _EncryptMin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5344);
/* harmony import */ var _SCORM_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6565);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1253);
/**
 *  File    : report/Reporter.js
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

/* global Promise, window */







/**
 * This class implements the basic operations related with the processing of times and scores
 * done by users playing JClic activities. These operations include: identification of users,
 * compilation of data coming from the activities, storage of this data for later use, and
 * presentation of summarized results.
 */
class Reporter {
  /**
   * Reporter constructor
   * @param {module:JClicPlayer.JClicPlayer} ps - The {@link module:JClicPlayer.JClicPlayer JClicPlayer} used to retrieve localized messages
   */
  constructor(ps) {
    this.ps = ps;
    this.sessions = [];
    this.started = new Date();
    this.initiated = false;
    this.info = new ReporterInfo(this);
  }

  /**
   * Registers a new type of reporter
   * @param {string} reporterName - The name used to identify this reporter
   * @param {function} reporterClass - The reporter class, usually extending Reporter
   * @returns {module:report/Reporter.Reporter} - The provided reporter class
   */
  static registerClass(reporterName, reporterClass) {
    Reporter.CLASSES[reporterName] = reporterClass;
    return reporterClass;
  }

  /**
   * Creates a new Reporter of the requested class
   * The resulting object must be prepared to operate with a call to its `init` method.
   * @param {string} className - Class name of the requested reporter. When `null`, a basic Reporter is created.
   * @param {module:JClicPlayer.JClicPlayer} ps - The {@link module:JClicPlayer.JClicPlayer JClicPlayer} used to retrieve localized messages
   * @returns {module:report/Reporter.Reporter}
   */
  static getReporter(className, ps) {
    let result = null;
    if (className === null) {
      className = 'Reporter';
      if (ps.options.hasOwnProperty('reporter'))
        className = ps.options.reporter;
    }
    if (Reporter.CLASSES.hasOwnProperty(className))
      result = new Reporter.CLASSES[className](ps);
    else
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .log */ .Rm)('error', 'Unknown reporter class: %s', className);

    return result;
  }

  /**
   * Returns the `info` element associated to this Reporter.
   * @returns {module:report/Reporter.ReporterInfo}
   */
  getInfo() {
    return this.info.recalc();
  }

  /**
   * Gets a specific property from this reporting system
   * @param {string} key - Requested property
   * @param {string}+ defaultValue - Default return value when requested property does not exist
   * @returns {string}
   */
  getProperty(key, defaultValue) {
    return defaultValue;
  }

  /**
   * Gets a specific boolean property from this reporting system
   * @param {string} key - Requested property
   * @param {boolean}+ defaultValue - Default return when requested property does not exist
   * @returns {boolean}
   */
  getBooleanProperty(key, defaultValue) {
    const s = this.getProperty(key, defaultValue === true ? 'true' : 'false');
    return key === null ? defaultValue : s === 'true' ? true : false;
  }

  /**
   * Gets the list of groups or organizations currently registered in the system. This
   * method should be implemented by classes derived of `Reporter`.
   * @returns {external:Promise} - When fulfilled, an array of group data is returned as a result
   */
  getGroups() {
    return Promise.reject('No groups defined!');
  }

  /**
   * Gets the list of users currently registered in the system, optionally filtered by
   * a specific group ID. This method should be implemented by classes derived of `Reporter`.
   * @param {string}+ groupId - Optional group ID to be used as a filter criteria
   * @returns {external:Promise} - When fulfilled, an object with a collection of user data records
   * is returned
   */
  getUsers(groupId) {
    return Promise.reject('No users defined in ' + groupId);
  }

  /**
   * Gets extended data associated with a specific user. This is a method intended to be
   * implemented in subclasses.
   * @param {string} _userId - The requested user ID
   * @returns {external:Promise} - When fulfilled, an object with user data is returned.
   */
  getUserData(_userId) {
    return Promise.reject('Unknown user!');
  }

  /**
   * Gets extended data associated with a specific group or organization. This
   * is a method intended to be implemented in subclasses.
   * @param {string} _groupId - The requested group ID
   * @returns {external:Promise} - When fulfilled, an object with group data is returned.
   */
  getGroupData(_groupId) {
    return Promise.reject('Unknown group!');
  }

  /**
   * Checks if this reporting system manages its own database of users and groups. Defaults to `false`
   * @returns {boolean}
   */
  userBased() {
    if (this.bUserBased === null)
      this.bUserBased = this.getBooleanProperty('USER_TABLES', false);
    return this.bUserBased;
  }

  /**
   * Allows the current user to create a new group, and asks his name
   * @returns {external:Promise} - When fulfilled, the chosen name for the new group is returned.
   */
  promptForNewGroup() {
    // TODO: Implement promptForNewGroup
    return Promise.reject('Remote creation of groups not yet implemented!');
  }

  /**
   * Allows the current user to create a new user ID, and asks his ID and password
   * @returns {external:Promise} - When fulfilled, an object with the new user ID and password
   * is returned.
   */
  promptForNewUser() {
    // TODO: Implement promptForNewUser
    return Promise.reject('Remote creation of users not yet implemented!');
  }

  /**
   * Allows the current user to select its group or organization from the current groups list
   * @returns {external:Promise}
   */
  promptGroupId() {
    return new Promise((resolve, reject) => {
      if (!this.userBased())
        reject('This system does not manage users!');
      else {
        this.getGroups().then((groupList) => {
          // Creation of new groups not yet implemented!
          if (!groupList || groupList.length < 1)
            reject('No groups defined!');
          else {
            let sel = 0;
            const $groupSelect = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<select/>').attr({ size: Math.max(3, Math.min(15, groupList.length)) });
            groupList.forEach(g => $groupSelect.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<option/>').attr({ value: g.id }).text(g.name)));
            $groupSelect.change(ev => { sel = ev.target.selectedIndex; });
            this.ps.skin.showDlg(true, {
              main: [
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>', { class: 'subtitle' }).html((0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getMsg */ .qG)('Select group:')),
                $groupSelect],
              bottom: [
                this.ps.skin.$okDlgBtn,
                this.ps.skin.$cancelDlgBtn]
            }).then(() => {
              resolve(groupList[sel].id);
            }).catch(reject);
          }
        }).catch(reject);
      }
    });
  }

  /**
   * Asks for a valid user ID fulfilling the promise if found, rejecting it otherwise
   * @param {boolean}+ forcePrompt - Prompt also if `userId` is already defined (default is `false`)
   * @returns {external:Promise}
   */
  promptUserId(forcePrompt) {
    return new Promise((resolve, reject) => {
      if (this.userId !== null && !forcePrompt)
        resolve(this.userId);
      else if (!this.userBased())
        reject('This system does not manage users!');
      else {
        const $pwdInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input/>', { type: 'password', size: 8, maxlength: 64 });
        if (this.getBooleanProperty('SHOW_USER_LIST', true)) {
          this.promptGroupId().then(groupId => {
            this.getUsers(groupId).then(userList => {
              // Creation of new users not yet implemented
              // let userCreationAllowed = this.getBooleanProperty('ALLOW_CREATE_USERS', false)
              if (!userList || userList.length < 1)
                reject('Group ' + groupId + ' has no users!');
              else {
                let sel = -1;
                const $userSelect = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<select/>').attr({ size: Math.max(3, Math.min(15, userList.length)) });
                userList.forEach(u => $userSelect.append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<option/>').attr({ value: u.id }).text(u.name)));
                $userSelect.change(ev => { sel = ev.target.selectedIndex; });
                this.ps.skin.showDlg(true, {
                  main: [
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>', { class: 'subtitle' }).html((0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getMsg */ .qG)('Select user:')),
                    $userSelect,
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>', { class: 'subtitle' }).html((0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getMsg */ .qG)('Password:')).append($pwdInput)],
                  bottom: [
                    this.ps.skin.$okDlgBtn,
                    this.ps.skin.$cancelDlgBtn]
                }).then(() => {
                  if (sel >= 0) {
                    if (userList[sel].pwd && _EncryptMin_js__WEBPACK_IMPORTED_MODULE_2__["default"].Decrypt(userList[sel].pwd) !== $pwdInput.val()) {
                      window.alert((0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getMsg */ .qG)('Incorrect password'));
                      reject('Incorrect password');
                    } else {
                      this.userId = userList[sel].id;
                      resolve(this.userId);
                    }
                  } else
                    reject('No user has been selected');
                }).catch(reject);
              }
            }).catch(reject);
          }).catch(reject);
        } else {
          const $userInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<input/>', { type: 'text', size: 8, maxlength: 64 });
          this.ps.skin.showDlg(true, {
            main: [
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div/>').css({ 'text-align': 'right' })
                .append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>', { class: 'subtitle' }).html((0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getMsg */ .qG)('User:'))
                  .append($userInput))
                .append(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h2/>', { class: 'subtitle' }).html((0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getMsg */ .qG)('Password:'))
                  .append($pwdInput))],
            bottom: [
              this.ps.skin.$okDlgBtn,
              this.ps.skin.$cancelDlgBtn]
          }).then(() => {
            this.getUserData($userInput.val()).then(user => {
              if (user.pwd && _EncryptMin_js__WEBPACK_IMPORTED_MODULE_2__["default"].Decrypt(user.pwd) !== $pwdInput.val()) {
                window.alert((0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getMsg */ .qG)('Incorrect password'));
                reject('Incorrect password');
              } else {
                this.userId = user.id;
                resolve(this.userId);
              }
            }).catch(reject);
          }).catch(reject);
        }
      }
    });
  }

  /**
   * Builds a complex object containing all the results reported while playing activities
   * @returns {object} - The current results
   */
  getData() {

    // Force the re-calculation of all scores
    this.info.recalc();

    const result = {
      started: this.started.toISOString(),
      descriptionKey: this.descriptionKey,
      descriptionDetail: this.descriptionDetail,
      projects: this.info.numSessions,
      sequences: this.info.numSequences,
      activitiesDone: this.info.nActivities,
      playedOnce: this.info.nActPlayed,
      reportable: this.info.reportableActs,
      ratioPlayed: Math.round(this.info.ratioPlayed * 100),
      activitiesSolved: this.info.nActSolved,
      ratioSolved: Math.round(this.info.ratioSolved * 100),
      actScore: this.info.nActScore,
      partialScore: Math.round(this.info.partialScore * 100),
      globalScore: Math.round(this.info.globalScore * 100),
      time: Math.round(this.info.tTime / 10) / 100,
      actions: this.info.nActions,
      sessions: []
    };

    if (this.userId)
      result.userId = this.userId;
    else if (this.SCORM)
      result.user = this.SCORM.studentName + (this.SCORM.studentId === '' ? '' : ` (${this.SCORM.studentId})`);

    this.sessions.forEach(sr => {
      if (sr.getInfo().numSequences > 0)
        result.sessions.push(sr.getData(false, false));
    });

    return result;
  }

  /**
   * Initializes this report system with an optional set of parameters.
   * Returns a Promise, fulfilled when the reporter is fully initialized.
   * @param {object} [options] - Initial settings passed to the reporting system
   * @returns {external:Promise}
   */
  init(options) {
    if (!options)
      options = this.ps.options;
    this.userId = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getVal */ .eH)(options.user);
    this.sessionKey = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getVal */ .eH)(options.key);
    this.sessionContext = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getVal */ .eH)(options.context);
    this.groupCodeFilter = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getVal */ .eH)(options.groupCodeFilter);
    this.userCodeFilter = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .getVal */ .eH)(options.userCodeFilter);
    if (options.SCORM !== false) {
      this.SCORM = _SCORM_js__WEBPACK_IMPORTED_MODULE_3__["default"].getSCORM(this);
      if (this.SCORM !== null && this.descriptionKey === Reporter.prototype.descriptionKey)
        this.descriptionKey = this.SCORM.getScormType();
    }
    this.initiated = true;
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .log */ .Rm)('debug', 'Basic Reporter initialized');
    return Promise.resolve(true);
  }

  /**
   * Closes this reporting system
   * @returns {external:Promise} - A Promise object to be fullfilled when all pending tasks are finished.
   */
  end() {
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__/* .log */ .Rm)('debug', 'Basic Reporter ending');
    this.endSession();
    return Promise.resolve(true);
  }

  /**
   * Finalizes the current sequence
   */
  endSequence() {
    if (this.currentSession) {
      this.currentSession.endSequence();
      this.info.valid = false;
    }
  }

  /**
   * Finalizes the current session
   */
  endSession() {
    this.endSequence();
    this.currentSession = null;
  }

  /**
   * Creates a new group (method to be implemented in subclasses)
   * @param {object} _gd
   */
  newGroup(_gd) {
    throw "No database!";
  }

  /**
   * Creates a new user (method to be implemented in subclasses)
   * @param {object} _ud
   */
  newUser(_ud) {
    throw "No database!";
  }

  /**
   * This method should be invoked when a new session starts.
   * @param {module:project/JClicProject.JClicProject} jcp - The {@link module:project/JClicProject.JClicProject JClicProject} this session refers to.
   */
  newSession(jcp) {
    this.endSession();
    this.currentSession = new _SessionReg_js__WEBPACK_IMPORTED_MODULE_1__["default"](jcp);
    this.sessions.push(this.currentSession);
    this.info.valid = false;
  }

  /**
   * This method should be invoked when a new sequence starts
   * @param {module:bags/ActivitySequenceElement.ActivitySequenceElement} ase - The {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement} referenced by this sequence.
   */
  newSequence(ase) {
    if (this.currentSession) {
      this.currentSession.newSequence(ase);
      this.info.valid = false;
      if (this.SCORM)
        this.SCORM.commitInfo();
    }
  }

  /**
   * This method should be invoked when the user starts a new activity
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} reporter has just started
   */
  newActivity(act) {
    if (this.currentSession) {
      this.currentSession.newActivity(act);
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
    if (this.currentSession) {
      this.currentSession.endActivity(score, numActions, solved);
      this.info.valid = false;
    }
  }

  /**
   * Reports a new action done by the user while playing the current activity
   * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
   * @param {string}+ source - Description of the object on which the action is done.
   * @param {string}+ dest - Description of the object reporter acts as a target of the action (usually in pairings)
   * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwhise
   */
  newAction(type, source, dest, ok) {
    if (this.currentSession) {
      this.currentSession.newAction(type, source, dest, ok);
      this.info.valid = false;
    }
  }

  /**
   * Gets information about the current sequence
   * @returns {module:report/SequenceReg.SequenceRegInfo}
   */
  getCurrentSequenceInfo() {
    return this.currentSession === null ? null : this.currentSession.getCurrentSequenceInfo();
  }

  /**
   * Gets the name of the current sequence
   * @returns {string}
   */
  getCurrentSequenceTag() {
    return this.currentSession === null ? null : this.currentSession.getCurrentSequenceTag();
  }
}

Object.assign(Reporter.prototype, {
  /**
   * The {@link module:report/Reporter.ReporterInfo ReporterInfo} used to calculate and store global results.
   * @name module:report/Reporter.Reporter#info
   * @type {module:report/Reporter.ReporterInfo} */
  info: null,
  /**
   * The {@link module:JClicPlayer.JClicPlayer JClicPlayer} used to retrieve messages
   * @name module:report/Reporter.Reporter#ps
   * @type {module:JClicPlayer.JClicPlayer} */
  ps: null,
  /**
   * A valid SCORM bridge, or `null` if no SCORM API detected.
   * @name module:report/Reporter.Reporter#SCORM */
  SCORM: null,
  /**
   * User ID currently associated with this reporting system
   * @name module:report/Reporter.Reporter#userId
   * @type {string} */
  userId: null,
  /**
   * Optional key to be added as a field in session records
   * @name module:report/Reporter.Reporter#sessionKey
   * @type {string} */
  sessionKey: null,
  /**
   * A second optional key to be reported as a field in session records
   * @name module:report/Reporter.Reporter#sessionContext
   * @type {string} */
  sessionContext: null,
  /**
   * Optional filter key to be used in the group selection dialog
   * @name module:report/Reporter.Reporter#groupCodeFilter
   * @type {string} */
  groupCodeFilter: null,
  /**
   * Another optional filter key to be used in the user selection dialog
   * @name module:report/Reporter.Reporter#userCodeFilter
   * @type {string} */
  userCodeFilter: null,
  /**
   * Description of this reporting system
   * @name module:report/Reporter.Reporter#descriptionKey
   * @type {string} */
  descriptionKey: 'Results are not currently being saved',
  /**
   * Additional info to display after the reporter's `description`
   * @name module:report/Reporter.Reporter#descriptionDetail
   * @type {string} */
  descriptionDetail: '',
  /**
   * Starting date and time of this report
   * @name module:report/Reporter.Reporter#started
   * @type {external:Date} */
  started: null,
  /**
   * Array of sessions included in this report
   * @name module:report/Reporter.Reporter#sessions
   * @type {module:report/SessionReg.SessionReg[]} */
  sessions: [],
  /**
   * Currently active session
   * @name module:report/Reporter.Reporter#currentSession
   * @type {module:report/SessionReg.SessionReg} */
  currentSession: null,
  /**
   * `true` if the system was successfully initiated, `false` otherwise
   * @name module:report/Reporter.Reporter#initiated
   * @type {boolean} */
  initiated: false,
  /**
   * `true` if the system is connected to a database with user's data.
   * When `false`, a generic ID will be used.
   * @name module:report/Reporter.Reporter#bUserBased
   * @type {boolean} */
  bUserBased: null,
  /**
   * Maximum number of incorrect UserID attempts
   * @name module:report/Reporter.Reporter#MAX_USERID_PROMPT_ATTEMPTS
   * @type {number} */
  MAX_USERID_PROMPT_ATTEMPTS: 3,
});

/**
 * This object stores the global results of a {@link module:Reporter.Reporter Reporter}
 */
class ReporterInfo {
  /**
   * ReporterInfo constructor
   * @param {module:report/Reporter.Reporter} rep - The {@link module:Reporter.Reporter Reporter} associated tho this `Info` object.
   */
  constructor(rep) {
    this.rep = rep;
  }

  /**
   * Clears all data associated with this ReporterInfo
   */
  clear() {
    this.numSessions = this.numSequences = this.nActivities = this.reportableActs = this.nActSolved =
      this.nActPlayed = this.nActScore = this.nActions = this.ratioSolved = this.ratioPlayed =
      this.tScore = this.tTime = this.partialScore = this.globalScore = 0;
    this.valid = false;
  }

  /**
   * Computes the value of all global variables based on the data stored in `sessions`
   * @returns {module:report/Reporter.ReporterInfo} - This "info" object
   */
  recalc() {
    if (!this.valid) {
      this.clear();
      this.rep.sessions.forEach(ses => {
        const inf = ses.getInfo();
        this.reportableActs += inf.sReg.reportableActs;
        if (inf.numSequences > 0) {
          this.numSessions++;
          this.numSequences += inf.numSequences;
          if (inf.nActivities > 0) {
            this.nActivities += inf.nActivities;
            this.nActPlayed += inf.sReg.actNames.length;
            this.nActSolved += inf.nActSolved;
            this.nActions += inf.nActions;
            if (inf.nActScore > 0) {
              this.tScore += inf.tScore * inf.nActScore;
              this.nActScore += inf.nActScore;
            }
            this.tTime += inf.tTime;
          }
        }
      });
      if (this.nActivities > 0) {
        this.ratioSolved = this.nActSolved / this.nActivities;
        if (this.reportableActs > 0)
          this.ratioPlayed = this.nActPlayed / this.reportableActs;
        this.partialScore = this.tScore / (this.nActScore * 100);
        this.globalScore = this.partialScore * this.ratioPlayed;
      }
      this.valid = true;
    }
    return this;
  }
}

Object.assign(ReporterInfo.prototype, {
  /**
   * The Reporter linked to this Info object
   * @name module:report/Reporter.ReporterInfo#rep
   * @type {module:report/Reporter.Reporter}
   */
  rep: null,
  /**
   * When `false`, data must be recalculated
   * @name module:report/Reporter.ReporterInfo#valid
   * @type {boolean} */
  valid: false,
  /**
   * Number of sessions registered
   * @name module:report/Reporter.ReporterInfo#numSessions
   * @type {number} */
  numSessions: 0,
  /**
   * Number of sequences played
   * @name module:report/Reporter.ReporterInfo#numSequences
   * @type {number} */
  numSequences: 0,
  /**
   * Number of activities played
   * @name module:report/Reporter.ReporterInfo#nActivities
   * @type {number} */
  nActivities: 0,
  /**
   * Number of activities in existing in the played projects suitable to be reported
   * @name module:report/Reporter.ReporterInfo#reportableActs
   * @type {number} */
  reportableActs: 0,
  /**
   * Number of activities solved
   * @name module:report/Reporter.ReporterInfo#nActSolved
   * @type {number} */
  nActSolved: 0,
  /**
   * Number of different activities played
   * @name module:report/Reporter.ReporterInfo#nActPlayed
   * @type {number} */
  nActPlayed: 0,
  /**
   * Global score obtained in all sessions registered by this reporter
   * @name module:report/Reporter.ReporterInfo#nActScore
   * @type {number} */
  nActScore: 0,
  /**
   * Number of actions done by the user while in this working session
   * @name module:report/Reporter.ReporterInfo#nActions
   * @type {number} */
  nActions: 0,
  /**
   * Percentage of solved activities
   * @name module:report/Reporter.ReporterInfo#ratioSolved
   * @type {number} */
  ratioSolved: 0,
  /**
   * Percentage of reportable activities played
   * @name module:report/Reporter.ReporterInfo#ratioPlayed
   * @type {number} */
  ratioPlayed: 0,
  /**
   * Sum of the scores of all the activities played
   * @name module:report/Reporter.ReporterInfo#tScore
   * @type {number} */
  tScore: 0,
  /**
   * Global score obtained
   * @name module:report/Reporter.ReporterInfo#partialScore
   * @type {number} */
  partialScore: 0,
  /**
   * Sum of the playing time reported by each activity (not always equals to the sum of all session's time)
   * @name module:report/Reporter.ReporterInfo#tTime
   * @type {number} */
  tTime: 0,
  /**
   * Final score based on the percent of reportable activities played. If the user plays all the
   * activities, this result equals to `partialScore`.
   * @name module:report/Reporter.ReporterInfo#globalScore
   * @type {number} */
  globalScore: 0,
});

Reporter.Info = ReporterInfo;

/**
 * Static list of classes derived from Reporter. It should be filled by Reporter classes at declaration time.
 * @type {object}
 */
Reporter.CLASSES = { 'Reporter': Reporter };

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Reporter);


/***/ }),

/***/ 6565:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export SCORM */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1253);
/**
 *  File    : report/SCORM.js
 *  Created : 18/07/2016
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

/* global window */




/**
 * This class detects if JClic.js is running in an SCORM environment and, if true,
 * exposes the methods needed to notify the results of activities.
 * Both SCORM 1.2 and 2004 are supported.
 */
class SCORM {
  /**
   * SCORM constructor
   * @param {object} API - The global SCORM API object
   * @param {module:report/Reporter.Reporter} reporter - The {@link module:Reporter.Reporter Reporter} associated to this SCORM object
   */
  constructor(API, reporter) {
    this.API = API;
    // Check if 'API' has a function named 'Initialized'
    if (typeof API.Initialize === 'function')
      this.is2004 = true;
    else {
      // SCORM 1.2
      this.prefix = 'LMS';
      this.core = 'cmi.core.';
    }
    this.reporter = reporter;
  }

  /**
   * Recursive function used to find the SCORM "API" object
   * @param {object} win - The 'window' object to scan for global SCORM API objects
   * @param {number} tries - Recursive attempts currently achieved
   * @returns {object} - The global SCORM API object, or `null` if not found
   */
  static scanForAPI(win, tries) {
    if (win.API_1484_11 && win.API_1184_11.Initialize && win.API_1184_11.SetValue && win.API_1184_11.Commit)
      return win.API_1184_11;
    else if (win.API && win.API.LMSInitialize && win.API.LMSSetValue && win.API.LMSCommit)
      return win.API;
    else if (win.parent && win.parent !== win && tries++ < SCORM.DISCOVER_MAX_TRIES)
      return SCORM.scanForAPI(win.parent, tries);
    else
      return null;
  }

  /**
   * Checks for the presence of a SCORM API on the current browser session.
   * @param {module:report/Reporter.Reporter} reporter - The {@link module:Reporter.Reporter Reporter} linked to the requested SCORM object
   * @returns {module:report/SCORM.SCORM} - A valid SCORM object, or `null` if no SCORM API was found.
   */
  static getSCORM(reporter) {
    let result = null;
    try {
      let api = SCORM.scanForAPI(window, 0);
      if (api === null && window.opener)
        api = SCORM.scanForAPI(window.opener, 0);

      if (api) {
        result = new SCORM(api, reporter);
        if (!result.initialize())
          result = null;
      }
    } catch (ex) {
      result = null;
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('warn', 'Unable to use SCORM: %s', ex.toString());
    }
    return result;
  }

  /**
   * Initializes communication with the SCORM API
   * @returns {boolean}
   */
  initialize() {
    let result = false;
    try {
      result = this.API[this.prefix + 'Initialize']('');
      if (result) {
        this.studentId = this.getValue(this.core + (this.is2004 ? 'learner_id' : 'student_id'));
        this.studentName = this.getValue(this.core + (this.is2004 ? 'learner_name' : 'student_name'));
        this.setValue(this.core + 'score.min', 0);
        this.setValue(this.core + 'score.max', 100);
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('unload', () => {
          this.commitInfo();
          this.terminate();
          this.API = null;
        });
      }
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('debug', 'SCORM initialized');
    } catch (ex) {
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('error', `Error initializing SCORM API: ${ex.message}`);
    }
    return result;
  }

  /**
   * Terminates communication with the SCORM API
   * @returns {boolean}
   */
  terminate() {
    let result = false;
    try {
      result = this.API[this.is2004 ? 'Terminate' : 'LMSFinish']('');
    } catch (ex) {
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('error', `Error terminating SCORM API: ${ex.message}`);
    }
    return result;
  }

  /**
   * Commits the current information to the SCORM API
   */
  commitInfo() {
    const
      info = this.reporter.getInfo(),
      score = Math.round(info.globalScore * 100),
      time = this.getTimeExpression(info.tTime);

    this.setValue(this.core + 'score.raw', score);
    this.setValue(this.core + 'session_time', time);
    this.commit();
    (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('debug', `SCORM results reported: ${score} (${time})`);
  }

  /**
   * Commits current pending data to the SCORM API
   * @returns {boolean}
   */
  commit() {
    let result = false;
    try {
      result = this.API[this.prefix + 'Commit']('');
    } catch (ex) {
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('error', `Error commiting data to the SCORM API: ${ex.message}`);
    }
    return result;
  }

  /**
   * Sends a specific value to the SCORM API
   * @param {string} key - A SCORM valid key
   * @param {string|number} value - The value associated with this key
   * @returns {string}
   */
  setValue(key, value) {
    let result = false;
    try {
      result = this.API[this.prefix + 'SetValue'](key, value);
    } catch (ex) {
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('error', `Error setting value "${value}" to "${key}" in SCORM API: ${ex.message}`);
    }
    return result;
  }

  /**
   * Gets a specific value from the SCORM API
   * @param {string} key - A SCORM valid key
   * @returns {string} - The value associated with the provided key, or `null` if not found
   */
  getValue(key) {
    let result = false;
    try {
      result = this.API[this.prefix + 'GetValue'](key);
    } catch (ex) {
      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_1__/* .log */ .Rm)('error', `Error retrieving "${key}" from SCORM API: ${ex.message}`);
    }
    return result;
  }

  /**
   * Gets a string expression of the given time (in milliseconds) suitable for a SCORM transaction.
   * @see {@link http://www.ostyn.com/standards/scorm/samples/ISOTimeForSCORM.htm}
   * @param {number} millis - The amount of time, in milliseconds
   * @returns {string} - An ISO8601 valid expression
   */
  getTimeExpression(millis) {
    const
      d = new Date(millis),
      h = d.getUTCHours(),
      m = d.getUTCMinutes(),
      s = d.getUTCSeconds();

    return this.is2004 ?
      `PT${h}H${m}M${s}S` :
      `${('0000' + h).slice(-4)}:${('00' + m).slice(-2)}:${('00' + s).slice(-2)}`;
  }

  /**
   * Gets the SCORM type of this SCORM object
   * @returns {string}
   */
  getScormType() {
    return `SCORM ${this.is2004 ? '2004' : '1.2'}`;
  }
}

Object.assign(SCORM.prototype, {
  /**
   * True when the API is of type SCORM 2004, false for SCORM 1.2
   * @name module:report/SCORM.SCORM#is2004
   * @type {boolean} */
  is2004: false,
  /**
   * The Reporter associated to this SCORM object
   * @name module:report/SCORM.SCORM#reporter
   * @type {module:report/Reporter.Reporter} */
  reporter: null,
  /**
   * Prefix to be used in SCORM function names. Should be 'LMS' for SCORM 1.2
   * @name module:report/SCORM.SCORM#prefix
   * @type {string} */
  prefix: '',
  /**
   * Prefix used in core SCORM keys. Should be 'cmi.core.' for 1.2 and 'cmi.' for 2004
   * @name module:report/SCORM.SCORM#core
   * @type {string} */
  core: 'cmi.',
  /**
   * SCORM API object used to communicate with the LMS
   * @name module:report/SCORM.SCORM#API
   * @type {object} */
  API: null,
  /**
   * The student ID retrieved from the SCORM API
   * @name module:report/SCORM.SCORM#studentId
   * @type {string} */
  studentId: '',
  /**
   * The student name retrieved from the SCORM API
   * @name module:report/SCORM.SCORM#studentName
   * @type {string} */
  studentName: '',
});

/**
 * Maximum recursive attempts allowed to find the global SCORM API object
 * @type {number} */
SCORM.DISCOVER_MAX_TRIES = 50;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SCORM);


/***/ }),

/***/ 8641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports SessionReg, SessionRegInfo */
/* harmony import */ var _SequenceReg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6238);
/**
 *  File    : report/SessionReg.js
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
 *  (c) 2000-2020 Catalan Educational Telematic Network (XTEC)
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
 * This class encapsulates data of a user's working session, usually associated to a single {@link module:project/JClicProject.JClicProject JClicProject}
 * It's main component is `sequences`, an array of {@link module:report/SequenceReg.SequenceReg SequenceReg} objects.
 */
class SessionReg {
  /**
   * SessionReg constructor
   * @param {module:project/JClicProject.JClicProject} project - The JClicProject referenced by this session.
   * @param {string} [code] - Optional code to be used by this SessionReg
   */
  constructor(project, code) {
    this.projectName = project.name;
    this.code = code || project.code;
    this.sequences = [];
    this.actNames = [];
    this.started = new Date();
    this.info = new SessionRegInfo(this);
    this.reportableActs = project.reportableActs;
  }

  /**
   * Builds a complex object with the results of all activities done during this working session
   * @param {boolean} recalcInfo - When `true`, global variables (number of sequences, score, total time...)
   * will be recalculated from the data stored in the {@link module:report/SequenceReg.SequenceReg SequenceReg} objects.
   * @param {boolean} includeEmpty - When `true`, sequences without reported activities will be also included in the results
   * @returns {object} - An object containing the full session data
   */
  getData(recalcInfo, includeEmpty) {
    if (recalcInfo)
      this.info.recalc();

    const result = {
      projectName: this.projectName,
      played: this.info.nActivities,
      ratioPlayed: Math.round(this.info.ratioPlayed * 100),
      solved: this.info.nActSolved,
      ratioSolved: Math.round(this.info.ratioSolved * 100),
      actions: this.info.nActions,
      score: this.info.tScore,
      time: Math.round(this.info.tTime / 10) / 100,
      sequences: []
    };

    this.sequences.forEach(s => {
      const seq = s.getData();
      if (includeEmpty || seq.activities.length > 0)
        result.sequences.push(seq);
    });
    return result;
  }

  /**
   * Returns the `info` element associated to this SessionReg.
   * @returns {module:report/SessionReg.SessionRegInfo}
   */
  getInfo() {
    return this.info.recalc();
  }

  /**
   * Closes this session
   */
  end() {
    this.endSequence();
  }

  /**
   * This method should be called when the current working session finishes.
   */
  endSequence() {
    if (this.currentSequence && this.currentSequence.totalTime === 0)
      this.currentSequence.endSequence();
    this.currentSequence = null;
    this.info.valid = false;
  }

  /**
   * This method should be invoked when a new sequence starts
   * @param {module:bags/ActivitySequenceElement.ActivitySequenceElement} ase - The {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement} referenced by this sequence.
   */
  newSequence(ase) {
    this.endSequence();
    this.currentSequence = new _SequenceReg_js__WEBPACK_IMPORTED_MODULE_0__["default"](ase);
    this.sequences.push(this.currentSequence);
    this.info.valid = false;
  }

  /**
   * This method should be invoked when the user starts a new activity
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} that has just started
   */
  newActivity(act) {
    if (this.currentSequence) {
      // Save activity name if not yet registered
      if (this.actNames.indexOf(act.name) === -1)
        this.actNames.push(act.name);
      this.currentSequence.newActivity(act);
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
    if (this.currentSequence) {
      this.currentSequence.endActivity(score, numActions, solved);
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
    if (this.currentSequence) {
      this.currentSequence.newAction(type, source, dest, ok);
      this.info.valid = false;
    }
  }

  /**
   * Gets the name of the current sequence
   * @returns {string}
   */
  getCurrentSequenceTag() {
    return this.currentSequence ? this.currentSequence.name : null;
  }

  /**
   * Gets information about the current sequence
   * @returns {module:report/SequenceReg.SequenceRegInfo}
   */
  getCurrentSequenceInfo() {
    return this.currentSequence ? this.currentSequence.getInfo() : null;
  }
}

Object.assign(SessionReg.prototype, {
  /**
   * Number of activities suitable to be reported in this session
   * @name module:report/SessionReg.SessionReg#reportableActs
   * @type {number} */
  reportableActs: 0,
  /**
   * Array with unique names of the activities being reported in this session
   * @name module:report/SessionReg.SessionReg#actNames
   * @type {string[]} */
  actNames: null,
  /**
   * List of sequences done in this session
   * @name module:report/SessionReg.SessionReg#sequences
   * @type {module:report/SequenceReg.SequenceReg[]} */
  sequences: null,
  /**
   * The sequence currently active
   * @name module:report/SessionReg.SessionReg#currentSequence
   * @type {module:report/SequenceReg.SequenceReg} */
  currentSequence: null,
  /**
   * Starting date and time of this session
   * @name module:report/SessionReg.SessionReg#started
   * @type {external:Date} */
  started: null,
  /**
   * Name of the {@link module:project/JClicProject.JClicProject JClicProject} associated to this session
   * @name module:report/SessionReg.SessionReg#projectName
   * @type {string} */
  projectName: '',
  /**
   * Current session info
   * @name module:report/SessionReg.SessionReg#info
   * @type {module:report/SessionReg.SessionRegInfo} */
  info: null,
  /**
   * Optional code to be used with this session
   * @name module:report/SessionReg.SessionReg#code
   * @type {string} */
  code: null,
});

/**
 * This object stores the global results of a {@link module:report/SessionReg.SessionReg SessionReg}
 */
class SessionRegInfo {
  /**
   * SessionRegInfo constructor
   * @param {module:report/SessionReg.SessionReg} sReg - The {@link module:report/SessionReg.SessionReg SessionReg} associated tho this `Info` object.
   */
  constructor(sReg) {
    this.sReg = sReg;
  }

  /**
   * Clears all data associated with this working session
   */
  clear() {
    this.numSequences = this.nActivities = this.nActSolved = this.nActScore = 0;
    this.ratioSolved = this.ratioPlayed = this.nActions = this.tScore = this.tTime = 0;
    this.valid = false;
  }

  /**
   * Computes the value of all global variables based on the data stored in `sequences`
   * @returns {module:report/SessionReg.SessionRegInfo} - This "info" object
   */
  recalc() {
    if (!this.valid) {
      this.clear();
      this.sReg.sequences.forEach(sr => {
        const sri = sr.getInfo();
        if (sri.nActivities > 0) {
          this.numSequences++;
          if (sri.nActClosed > 0) {
            this.nActivities += sri.nActClosed;
            this.nActions += sri.nActions;
            if (sri.nActScore > 0) {
              this.nActScore += sri.nActScore;
              this.tScore += sri.tScore * sri.nActScore;
            }
            this.tTime += sri.tTime;
            this.nActSolved += sri.nActSolved;
          }
        }
      });
      if (this.nActScore > 0)
        this.tScore = Math.round(this.tScore / this.nActScore);
      if (this.nActivities > 0) {
        this.ratioSolved = this.nActSolved / this.nActivities;
        if (this.sReg.reportableActs > 0)
          this.ratioPlayed = this.sReg.actNames.length / this.sReg.reportableActs;
      }
      this.valid = true;
    }
    return this;
  }
}

Object.assign(SessionRegInfo.prototype, {
  /**
   * The SessionReg linked to this Info object
   * @name module:report/SessionReg.SessionRegInfo#sReg
   * @type {module:report/SessionReg.SessionReg} */
  sReg: null,
  /**
   * When `false`, this session info needs to be recalculated
   * @name module:report/SessionReg.SessionRegInfo#valid
   * @type {boolean} */
  valid: false,
  /**
   * Number of sequences played
   * @name module:report/SessionReg.SessionRegInfo#numSequences
   * @type {number} */
  numSequences: 0,
  /**
   * Number of activities played
   * @name module:report/SessionReg.SessionRegInfo#nActivities
   * @type {number} */
  nActivities: 0,
  /**
   * Number of activities solved
   * @name module:report/SessionReg.SessionRegInfo#nActSolved
   * @type {number} */
  nActSolved: 0,
  /**
   * Number of activities with score > 0
   * @name module:report/SessionReg.SessionRegInfo#nActScore
   * @type {number} */
  nActScore: 0,
  /**
   * Percentage of solved activities
   * @name module:report/SessionReg.SessionRegInfo#ratioSolved
   * @type {number} */
  ratioSolved: 0,
  /**
   * Percentage of reportable activities played
   * @name module:report/SessionReg.SessionRegInfo#ratioPlayed
   * @type {number} */
  ratioPlayed: 0,
  /**
   * Number of actions done by the user while in this working session
   * @name module:report/SessionReg.SessionRegInfo#nActions
   * @type {number} */
  nActions: 0,
  /**
   * Sum of the scores of all the activities played
   * @name module:report/SessionReg.SessionRegInfo#tScore
   * @type {number} */
  tScore: 0,
  /**
   * Sum of the playing time reported by each activity (not always equals to the session's total time)
   * @name module:report/SessionReg.SessionRegInfo#tTime
   * @type {number} */
  tTime: 0,
});

SessionReg.Info = SessionRegInfo;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SessionReg);


/***/ })

};
;
//# sourceMappingURL=6782.jclic-node.js.map