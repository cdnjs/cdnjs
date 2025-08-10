"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// lib/index.ts
var index_exports = {};
__export(index_exports, {
  RuleEngine: () => RuleEngine
});
module.exports = __toCommonJS(index_exports);
var import_lodash = __toESM(require("lodash.clonedeep"));
var import_lodash2 = __toESM(require("lodash.isequal"));
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
    const session = (0, import_lodash.default)(fact);
    let lastSession = (0, import_lodash.default)(fact);
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
          if (!ignoreFactChanges && !(0, import_lodash2.default)(lastSession, session)) {
            lastSession = (0, import_lodash.default)(session);
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
    Object.keys(query).forEach(
      (key) => query[key] === void 0 && delete query[key]
    );
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RuleEngine
});
