"use strict";
exports.id = 8837;
exports.ids = [8837];
exports.modules = {

/***/ 8837:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports TCPReporter, ReportBean */
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7750);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Reporter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6782);
/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1253);
/**
 *  File    : report/TCPReporter.js
 *  Created : 08/06/2016
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

/* global Promise, document, window, XMLSerializer */





/**
 * This special case of {@link module:Reporter.Reporter Reporter} connects with an external service reporter providing
 * the {@link https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide JClic Reports API}.
 * Connection parameters to the reports server (`path`, `service`, `userId`, `key`, `context`...)
 * are passed through the `options` element of {@link module:JClicPlayer.JClicPlayer JClicPlayer} (acting as {@link module:JClicPlayer.JClicPlayer JClicPlayer}).
 * @extends module:reports/Reporter.Reporter
 */
class TCPReporter extends _Reporter_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * TCPReporter constructor
   * @param {module:JClicPlayer.JClicPlayer} ps - The {@link module:JClicPlayer.JClicPlayer JClicPlayer} used to retrieve settings and localized messages
   */
  constructor(ps) {
    super(ps);
    this.tasks = [];
  }

  /**
   * Gets a specific property from this reporting system
   * @override
   * @param {string} key - Requested property
   * @param {string}+ defaultValue - Default return value when requested property does not exist
   * @returns {string}
   */
  getProperty(key, defaultValue) {
    return this.dbProperties !== null && this.dbProperties.hasOwnProperty(key) ?
      this.dbProperties[key] :
      defaultValue;
  }

  /**
   * Adds a new element to the list of report beans pending to be transmitted.
   * @param {module:report/TCPReporter.ReportBean} bean
   */
  addTask(bean) {
    if (this.processingTasks) {
      if (this.waitingTasks === null)
        this.waitingTasks = [bean];
      else
        this.waitingTasks.push(bean);
    } else
      this.tasks.push(bean);
  }

  /**
   * Transmits all report beans currently stored in `tasks` to the reports server
   * @returns {external:Promise}
   */
  flushTasksPromise() {
    if (this.processingTasks || this.currentSessionId === null ||
      this.tasks.length === 0 || this.serviceUrl === null) {
      // The task list cannot be processed now. Pass and wait until the next timer cycle:
      if (this.processingTasks)
        this.forceFlush = true;
      return Promise.resolve(true);
    }
    else {
      // Set up the `processingTasks` flag to avoid re-entrant processing
      this.processingTasks = true;

      const reportBean = new ReportBean('multiple');
      for (let i = 0; i < this.tasks.length; i++)
        reportBean.appendData(this.tasks[i].$bean);

      (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .log */ .Rm)('debug', 'Reporting:', reportBean.$bean[0]);

      return new Promise((resolve, reject) => {
        this.transaction(reportBean.$bean)
          .done((_data, _textStatus, _jqXHR) => {
            // TODO: Check returned message for possible errors on the server side
            this.failCount = 0;

            // Clear waiting tasks
            if (this.waitingTasks) {
              this.tasks = this.waitingTasks;
              this.waitingTasks = null;
            }
            else {
              this.forceFlush = false;
              this.tasks = [];
            }

            if (this.forceFlush && this.tasks.length > 0) {
              this.forceFlush = false;
              this.processingTasks = false;
              this.flushTasksPromise().then(() => {
                resolve(true);
              });
            }
            else {
              this.forceFlush = false;
              resolve(true);
              this.processingTasks = false;
            }
          })
          .fail((jqXHR, textStatus, errorThrown) => {
            if (++this.failCount > this.maxFails)
              this.stopReporting().then();
            reject(`Error reporting results to ${this.serviceUrl} [${textStatus} ${errorThrown}]`);
            this.processingTasks = false;
          });
      });
    }
  }

  /**
   * Initializes this report system with an optional set of parameters.
   * Returns a Promise, fulfilled when the reporter is fully initialized.
   * @override
   * @param {object} [options] - Initial settings passed to the reporting system
   * @returns {external:Promise}
   */
  init(options) {
    if (typeof options === 'undefined' || options === null)
      options = this.ps.options;
    super.init(options);
    this.initiated = false;
    this.stopReporting();

    this.serverPath = options.path || this.DEFAULT_SERVER_PATH;
    this.descriptionDetail = this.serverPath;
    let serverService = options.service || this.DEFAULT_SERVER_SERVICE;
    if (!(0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .startsWith */ .w1)(serverService, '/'))
      serverService = `/${serverService}`;
    const serverProtocol = options.protocol || this.DEFAULT_SERVER_PROTOCOL;
    this.serviceUrl = `${serverProtocol}://${this.serverPath}${serverService}`;

    const bean = new ReportBean('get_properties');
    return new Promise((resolve, reject) => {
      this.transaction(bean.$bean)
        .done((data, _textStatus, _jqXHR) => {
          this.dbProperties = {};
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(data).find('param').each((_n, param) => {
            const $param = jquery__WEBPACK_IMPORTED_MODULE_0___default()(param);
            this.dbProperties[$param.attr('name')] = $param.attr('value');
          });
          this.promptUserId(false).then(userId => {
            this.userId = userId;
            const tl = options.lap || this.getProperty('TIME_LAP', this.DEFAULT_TIMER_LAP);
            this.timerLap = Math.min(30, Math.max(1, parseInt(tl)));
            this.timer = window.setInterval(() => this.flushTasksPromise().then(), this.timerLap * 1000);
            // Warn before leaving the current page with unsaved data:
            this.beforeUnloadFunction = event => {
              if (this.serviceUrl !== null &&
                (this.tasks.length > 0 || this.processingTasks)) {
                this.flushTasksPromise().then();
                const result = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getMsg */ .qG)('Please wait until the results of your activities are sent to the reports system');
                if (event)
                  event.returnValue = result;
                return result;
              }
            };
            window.addEventListener('beforeunload', this.beforeUnloadFunction);
            this.initiated = true;
            resolve(true);
          }).catch(msg => {
            this.stopReporting();
            reject(`Error getting the user ID: ${msg}`);
          });
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          this.stopReporting();
          reject(`Error initializing reports service ${this.serviceUrl} [${textStatus} ${errorThrown}]`);
        });
    });
  }

  /**
   * This method should be invoked when a new session starts.
   * @override
   * @param {module:project/JClicProject.JClicProject} jcp - The {@link module:project/JClicProject.JClicProject JClicProject} this session refers to.
   */
  newSession(jcp) {
    super.newSession(jcp);
    if (this.serviceUrl && this.userId !== null) {
      // Session ID will be obtained when reporting first activity
      this.currentSessionId = null;
    }
  }

  /**
   * Creates a new session in the remote database and records its ID for future use
   * @param {boolean} forceNewSession - When `true`, a new session will always be created.
   * @returns {external:Promise} - A Promise reporter will be successfully resolved
   * only when `currentSessionId` have a valid value.
   */
  createDBSession(forceNewSession) {
    if (this.currentSessionId !== null && !forceNewSession)
      // A valid session is available, so just return it
      return Promise.resolve(this.currentSessionId);
    else
      // A new session must be created:
      return new Promise((resolve, reject) => {
        if (this.initiated && this.userId !== null && this.currentSession !== null) {
          this.flushTasksPromise().then(() => {
            this.currentSessionId = null;
            const bean = new ReportBean('add session');

            bean.setParam('project', this.currentSession.projectName);
            bean.setParam('activities', Number(this.currentSession.reportableActs));
            bean.setParam('time', Number(this.currentSession.started));
            bean.setParam('code', this.currentSession.code);
            bean.setParam('user', this.userId);
            bean.setParam('key', this.sessionKey);
            bean.setParam('context', this.sessionContext);

            this.transaction(bean.$bean)
              .done((data, _textStatus, _jqXHR) => {
                this.currentSessionId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(data).find('param[name="session"]').attr('value');
                resolve(this.currentSessionId);
              })
              .fail((jqXHR, textStatus, errorThrown) => {
                this.stopReporting();
                reject(`Error creating new reports session in ${this.serviceUrl} [${textStatus} ${errorThrown}]`);
              });
          });
        } else
          reject('Unable to start session in remote server!');
      });
  }

  /**
   * Closes this reporting system
   * @override
   * @returns {external:Promise} - A promise to be fullfilled when all pending tasks are finished, or _null_ if not active.
   */
  end() {
    this.reportActivity(true);
    return this.stopReporting().then(super.end());
  }

  /**
   * Performs a transaction on the remote server
   * @param {external:jQuery} $xml - The XML element to be transmited, wrapped into a jQuery object
   * @returns {external:jqXHR} - The {@link external:jqXHR} obtained as a result of a call to `$.ajax`.
   * This object should be treated as a Promise or
   * as a JQuery {@link https://api.jquery.com/category/deferred-object|Deferred} object.
   */
  transaction($xml) {
    return this.serviceUrl === null ?
      null :
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        method: 'POST',
        url: this.serviceUrl,
        data: '<?xml version="1.0" encoding="UTF-8"?>' +
          (new XMLSerializer()).serializeToString($xml.get(0)).replace('minactions', 'minActions').replace('reportactions', 'reportActions'),
        contentType: 'text/xml',
        dataType: 'xml'
      });
  }

  /**
   * Gets the list of current groups or organizations registered on this reporting system.
   * @override
   * @returns {external:Promise} - When fulfilled, an array of group data is returned as a result
   */
  getGroups() {
    return new Promise((resolve, reject) => {
      if (!this.userBased())
        reject('This system does not manage users!');
      else {
        const bean = new ReportBean('get groups');
        this.transaction(bean.$bean)
          .done((data, _textStatus, _jqXHR) => {
            const currentGroups = [];
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(data).find('group').each((_n, gr) => {
              const $group = jquery__WEBPACK_IMPORTED_MODULE_0___default()(gr);
              currentGroups.push({ id: $group.attr('id'), name: $group.attr('name') });
            });
            resolve(currentGroups);
          })
          .fail((jqXHR, textStatus, errorThrown) => {
            reject(`Error retrieving groups list from ${this.serviceUrl} [${textStatus} ${errorThrown}]`);
          });
      }
    });
  }

  /**
   * Gets the list of users currently registered in the system, optionally filtered by
   * a specific group ID.
   * @override
   * @param {string}+ groupId - Optional group ID to be used as a filter criteria
   * @returns {external:Promise} - When fulfilled, an object with a collection of user data records
   * is returned
   */
  getUsers(groupId) {
    return new Promise((resolve, reject) => {
      if (!this.userBased())
        reject('This system does not manage users!');
      else {
        const bean = new ReportBean('get users');
        if (typeof groupId !== 'undefined' && groupId !== null)
          bean.setParam('group', groupId);
        this.transaction(bean.$bean)
          .done((data, _textStatus, _jqXHR) => {
            const currentUsers = [];
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(data).find('user').each((_n, usr) => {
              const $user = jquery__WEBPACK_IMPORTED_MODULE_0___default()(usr);
              const user = { id: $user.attr('id'), name: $user.attr('name') };
              if ($user.attr('pwd'))
                user.pwd = $user.attr('pwd');
              currentUsers.push(user);
            });
            resolve(currentUsers);
          })
          .fail((jqXHR, textStatus, errorThrown) => {
            reject(`Error retrieving users list from ${this.serviceUrl} [${textStatus} ${errorThrown}]`);
          });
      }
    });
  }

  /**
   * Gets extended data associated with a specific user.
   * @param {string} userId - The requested user ID
   * @returns {external:Promise} - When fulfilled, an object with user data is returned.
   */
  getUserData(userId) {
    return new Promise((resolve, reject) => {
      if (!this.userBased())
        reject('This system does not manage users!');
      else {
        const bean = new ReportBean('get user data');

        if (typeof userId !== 'undefined' && userId !== null)
          bean.setParam('user', userId);
        else
          reject('Invalid user ID');

        this.transaction(bean.$bean)
          .done((data, _textStatus, _jqXHR) => {
            const $user = jquery__WEBPACK_IMPORTED_MODULE_0___default()(data).find('user');
            if ($user.length !== 1) {
              window.alert((0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getMsg */ .qG)('Invalid user'));
              resolve('Invalid user ID');
            } else {
              const user = { id: $user.attr('id'), name: $user.attr('name') };
              if ($user.attr('pwd'))
                user.pwd = $user.attr('pwd');
              resolve(user);
            }
          })
          .fail((jqXHR, textStatus, errorThrown) => {
            reject(`Error retrieving user data from ${this.serviceUrl} [${textStatus} ${errorThrown}]`);
          });
      }
    });
  }

  /**
   * Stops the reporting system, usually as a result of repeated errors or because the player
   * shuts down.
   * @returns {external:Promise} - A promise to be fullfilled when all pending tasks are finished.
   */
  stopReporting() {
    let result = null;
    if (this.timer >= 0) {
      window.clearInterval(this.timer);
      this.timer = -1;
    }
    if (this.beforeUnloadFunction) {
      window.removeEventListener('beforeunload', this.beforeUnloadFunction);
      this.beforeUnloadFunction = null;
    }
    if (this.initiated) {
      result = this.flushTasksPromise().then(() => {
        this.serviceUrl = null;
        this.descriptionDetail = `${this.serverPath} (${(0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getMsg */ .qG)('not connected')})`;
        this.initiated = false;
      });
    }
    return result || Promise.resolve(true);
  }

  /**
   * Prepares a {@link module:report/TCPReporter.ReportBean ReportBean} object with information related to the current
   * activity, and pushes it into the list of pending `tasks`, to be processed by the main `timer`.
   * @param {boolean} flushNow - When `true`, the activity data will be sent to server as soon as possible
   */
  reportActivity(flushNow) {
    if (this.lastActivity) {
      if (!this.lastActivity.closed)
        this.lastActivity.closeActivity();
      const
        actCount = this.actCount++,
        act = this.lastActivity;
      this.createDBSession(false).then(() => {
        const bean = new ReportBean('add activity');
        bean.setParam('session', this.currentSessionId);
        bean.setParam('num', actCount);
        bean.appendData(act.$getXML());
        this.addTask(bean);
        if (flushNow)
          this.flushTasksPromise().then();
      });
    }
    if (this.currentSession !== null &&
      this.currentSession.currentSequence !== null &&
      this.currentSession.currentSequence.currentActivity !== this.lastActivity) {
      this.lastActivity = this.currentSession.currentSequence.currentActivity;
    } else
      this.lastActivity = null;
  }

  /**
   * This method should be invoked when the user starts a new activity
   * @override
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} reporter has just started
   */
  newActivity(act) {
    super.newActivity(act);
    this.reportActivity(false);
  }

  /**
   * This method should be called when the current activity finishes. Data about user's final results
   * on the activity will then be saved.
   * @override
   * @param {number} score - The final score, usually in a 0-100 scale.
   * @param {number} numActions - The total number of actions done by the user to solve the activity
   * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
   */
  endActivity(score, numActions, solved) {
    super.endActivity(score, numActions, solved);
    this.reportActivity(true);
  }
}

Object.assign(TCPReporter.prototype, {
  /**
   * Description of this reporting system
   * @name module:report/TCPReporter.TCPReporter#descriptionKey
   * @override
   * @type {string} */
  descriptionKey: 'Reporting to remote server',
  /**
   * Additional info to display after the reporter's `description`
   * @name module:report/TCPReporter.TCPReporter#descriptionDetail
   * @override
   * @type {string} */
  descriptionDetail: '(not connected)',
  /**
   * Main path of the reports server (without protocol nor service)
   * @name module:report/TCPReporter.TCPReporter#serverPath
   * @type {string} */
  serverPath: '',
  /**
   * Function to be called by the browser before leaving the current page
   * @name module:report/TCPReporter.TCPReporter#beforeUnloadFunction
   * @type {function} */
  beforeUnloadFunction: null,
  /**
   * Identifier of the current session, provided by the server
   * @name module:report/TCPReporter.TCPReporter#currentSessionId
   * @type {string} */
  currentSessionId: '',
  /**
   * Last activity reported
   * @name module:report/TCPReporter.TCPReporter#lastActivity
   * @type {module:report/ActivityReg.ActivityReg} */
  lastActivity: null,
  /**
   * Number of activities processed
   * @name module:report/TCPReporter.TCPReporter#actCount
   * @type {number} */
  actCount: 0,
  /**
   * Service URL of the JClic Reports server
   * @name module:report/TCPReporter.TCPReporter#serviceUrl
   * @type {string} */
  serviceUrl: null,
  /**
   * Object used to store specific properties of the connected reports system
   * @name module:report/TCPReporter.TCPReporter#dbProperties
   * @type {object} */
  dbProperties: null,
  /**
   * List of {@link module:report/TCPReporter.ReportBean ReportBean} objects pending to be processed
   * @name module:report/TCPReporter.TCPReporter#tasks
   * @type {module:report/TCPReporter.ReportBean[]} */
  tasks: null,
  /**
   * Waiting list of tasks, to be used while `tasks` is being processed
   * @name module:report/TCPReporter.TCPReporter#waitingTasks
   * @type {module:report/TCPReporter.ReportBean[]} */
  waitingTasks: null,
  /**
   * Flag used to indicate if `transaction` is currently running
   * @name module:report/TCPReporter.TCPReporter#processingTasks
   * @type {boolean} */
  processingTasks: false,
  /**
   * Force processing of pending tasks as soon as possible
   * @name module:report/TCPReporter.TCPReporter#forceFlush
   * @type {boolean} */
  forceFlush: false,
  /**
   * Identifier of the background function obtained with a call to `window.setInterval`
   * @name module:report/TCPReporter.TCPReporter#timer
   * @type {number} */
  timer: -1,
  /**
   * Time between calls to the background function, in seconds
   * @name module:report/TCPReporter.TCPReporter#timerLap
   * @type {number} */
  timerLap: 5,
  /**
   * Counter of unsuccessful connection attempts with the report server
   * @name module:report/TCPReporter.TCPReporter#failCount
   * @type {number} */
  failCount: 0,
  /**
   * Maximum number of failed attempts allowed before disconnecting
   * @name module:report/TCPReporter.TCPReporter#maxFails
   * @type {number} */
  maxFails: 5,
  /**
   * Default path of JClic Reports Server
   * @name module:report/TCPReporter.TCPReporter#DEFAULT_SERVER_PATH
   * @type {string} */
  DEFAULT_SERVER_PATH: 'localhost:9000',
  /**
   * Default name for the reports service
   * @name module:report/TCPReporter.TCPReporter#DEFAULT_SERVER_SERVICE
   * @type {string} */
  DEFAULT_SERVER_SERVICE: '/JClicReportService',
  /**
   * Default server protocol
   * Use always 'https' except when in 'http' and protocol not set in options
   * @name module:report/TCPReporter.TCPReporter#DEFAULT_SERVER_PROTOCOL
   * @type {string} */
  DEFAULT_SERVER_PROTOCOL: (document && document.location && document.location.protocol === 'http:') ? 'http' : 'https',
  /**
   * Default lap between calls to `flushTasks`, in seconds
   * @name module:report/TCPReporter.TCPReporter#DEFAULT_TIMER_LAP
   * @type {number} */
  DEFAULT_TIMER_LAP: 20,
});

/**
 * This inner class encapsulates a chunk of information in XML format, ready to be
 * transmitted to the remote reports server.
 */
class ReportBean {
  /**
   * ReportBean constructor
   * @param id {string} - The main identifier of this ReportBean. Current valid values are:
   * `get property`, `get_properties`, `add session`, `add activity`, `get groups`, `get users`,
   * `get user data`, `get group data`, `new group`, `new user` and `multiple`.
   * @param $data {external:jQuery}+ - Optional XML data to be added to this bean
   */
  constructor(id, $data) {
    this.$bean = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<bean/>').attr({ id: id });
    if ($data)
      this.appendData($data);
  }

  /**
   * Adds  an XML element to the bean
   * @param {external:jQuery} $data - The XML element to be added to this bean
   */
  appendData($data) {
    if ($data) {
      this.$bean.append($data);
    }
  }

  /**
   * Adds an XML element of type `param` to this ReportBean
   * @param {string} name - The key name of the parameter
   * @param {string|number|boolean} value - The value of the parameter
   */
  setParam(name, value) {
    if (typeof value !== 'undefined' && value !== null)
      this.appendData(jquery__WEBPACK_IMPORTED_MODULE_0___default()('<param/>').attr({ name: name, value: value }));
  }
}

Object.assign(ReportBean.prototype, {
  /**
   * The main jQuery XML object managed by this ReportBean
   * @name module:report/TCPReporter.ReportBean#$bean
   * @type {external:jQuery} */
  $bean: null,
});

TCPReporter.ReportBean = ReportBean;

// Register class in Reporter.CLASSES
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Reporter_js__WEBPACK_IMPORTED_MODULE_1__["default"].registerClass('TCPReporter', TCPReporter));


/***/ })

};
;
//# sourceMappingURL=8837.jclic-node.js.map