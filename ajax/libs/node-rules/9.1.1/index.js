"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// lib/index.ts
var _lodashclonedeep = require('lodash.clonedeep'); var _lodashclonedeep2 = _interopRequireDefault(_lodashclonedeep);
var _lodashisequal = require('lodash.isequal'); var _lodashisequal2 = _interopRequireDefault(_lodashisequal);
var RuleEngine = class {
  constructor(rules, options) {
    __publicField(this, "rules", []);
    __publicField(this, "activeRules", []);
    __publicField(this, "ignoreFactChanges", false);
    if (rules) {
      this.register(rules);
    }
    if (options) {
      this.ignoreFactChanges = options.ignoreFactChanges || false;
    }
  }
  init() {
    this.rules = [];
    this.activeRules = [];
  }
  register(rules) {
    if (Array.isArray(rules)) {
      this.rules.push(...rules);
    } else if (rules !== null && typeof rules === "object") {
      this.rules.push(rules);
    }
    this.sync();
  }
  sync() {
    this.activeRules = this.rules.filter((a) => {
      if (typeof a.on === "undefined") {
        a.on = true;
      }
      if (a.on === true) {
        return a;
      }
    });
    this.activeRules.sort((a, b) => {
      if (a.priority && b.priority) {
        return b.priority - a.priority;
      } else {
        return 0;
      }
    });
  }
  execute(fact, callback) {
    const thisHolder = this;
    let complete = false;
    const session = _lodashclonedeep2.default.call(void 0, fact);
    let lastSession = _lodashclonedeep2.default.call(void 0, fact);
    let rules = this.activeRules;
    const matchPath = [];
    const ignoreFactChanges = this.ignoreFactChanges;
    function FnRuleLoop(x) {
      const API = {
        rule: () => rules[x],
        when: (outcome) => {
          if (outcome) {
            const _consequence = rules[x].consequence;
            _consequence.ruleRef = rules[x].id || rules[x].name || `index_${x}`;
            thisHolder.nextTick(() => {
              matchPath.push(_consequence.ruleRef);
              _consequence.call(session, API, session);
            });
          } else {
            thisHolder.nextTick(() => {
              API.next();
            });
          }
        },
        restart: () => FnRuleLoop(0),
        stop: () => {
          complete = true;
          return FnRuleLoop(0);
        },
        next: () => {
          if (!ignoreFactChanges && !_lodashisequal2.default.call(void 0, lastSession, session)) {
            lastSession = _lodashclonedeep2.default.call(void 0, session);
            thisHolder.nextTick(() => {
              API.restart();
            });
          } else {
            thisHolder.nextTick(() => {
              return FnRuleLoop(x + 1);
            });
          }
        }
      };
      rules = thisHolder.activeRules;
      if (x < rules.length && !complete) {
        const _rule = rules[x].condition;
        _rule.call(session, API, session);
      } else {
        thisHolder.nextTick(() => {
          session.matchPath = matchPath;
          callback(session);
        });
      }
    }
    FnRuleLoop(0);
  }
  nextTick(callback) {
    (process == null ? void 0 : process.nextTick) ? process == null ? void 0 : process.nextTick(callback) : setTimeout(callback, 0);
  }
  findRules(query) {
    if (typeof query === "undefined") {
      return this.rules;
    }
    Object.keys(query).forEach((key) => query[key] === void 0 && delete query[key]);
    return this.rules.filter((rule) => {
      return Object.keys(query).some((key) => {
        return query[key] === rule[key];
      });
    });
  }
  turn(state, filter) {
    const rules = this.findRules(filter);
    for (let i = 0, j = rules.length; i < j; i++) {
      rules[i].on = state.toLowerCase() === "on";
    }
    this.sync();
  }
  prioritize(priority, filter) {
    const rules = this.findRules(filter);
    for (let i = 0, j = rules.length; i < j; i++) {
      rules[i].priority = priority;
    }
    this.sync();
  }
};


exports.RuleEngine = RuleEngine;
