/*! aXe v3.1.2
 * Copyright (c) 2018 Deque Systems, Inc.
 *
 * Your use of this Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This entire copyright notice must appear in every copy of this file you
 * distribute or in any file that contains substantial portions of this source
 * code.
 */
(function axeFunction(window) {
  var global = window;
  var document = window.document;
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  var axe = axe || {};
  axe.version = '3.1.2';
  if (typeof define === 'function' && define.amd) {
    define('axe-core', [], function() {
      'use strict';
      return axe;
    });
  }
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports && typeof axeFunction.toString === 'function') {
    axe.source = '(' + axeFunction.toString() + ')(typeof window === "object" ? window : this);';
    module.exports = axe;
  }
  if (typeof window.getComputedStyle === 'function') {
    window.axe = axe;
  }
  var commons;
  function SupportError(error) {
    this.name = 'SupportError';
    this.cause = error.cause;
    this.message = '`' + error.cause + '` - feature unsupported in your environment.';
    if (error.ruleId) {
      this.ruleId = error.ruleId;
      this.message += ' Skipping ' + this.ruleId + ' rule.';
    }
    this.stack = new Error().stack;
  }
  SupportError.prototype = Object.create(Error.prototype);
  SupportError.prototype.constructor = SupportError;
  'use strict';
  axe.imports = {};
  'use strict';
  var utils = axe.utils = {};
  'use strict';
  var helpers = {};
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function getDefaultConfiguration(audit) {
    'use strict';
    var config;
    if (audit) {
      config = axe.utils.clone(audit);
      config.commons = audit.commons;
    } else {
      config = {};
    }
    config.reporter = config.reporter || null;
    config.rules = config.rules || [];
    config.checks = config.checks || [];
    config.data = _extends({
      checks: {},
      rules: {}
    }, config.data);
    return config;
  }
  function unpackToObject(collection, audit, method) {
    'use strict';
    var i, l;
    for (i = 0, l = collection.length; i < l; i++) {
      audit[method](collection[i]);
    }
  }
  function Audit(audit) {
    this.brand = 'axe';
    this.application = 'axeAPI';
    this.tagExclude = [ 'experimental' ];
    this.defaultConfig = audit;
    this._init();
    this._defaultLocale = null;
  }
  Audit.prototype._setDefaultLocale = function() {
    if (this._defaultLocale) {
      return;
    }
    var locale = {
      checks: {},
      rules: {}
    };
    var checkIDs = Object.keys(this.data.checks);
    for (var i = 0; i < checkIDs.length; i++) {
      var id = checkIDs[i];
      var check = this.data.checks[id];
      var _check$messages = check.messages, pass = _check$messages.pass, fail = _check$messages.fail, incomplete = _check$messages.incomplete;
      locale.checks[id] = {
        pass: pass,
        fail: fail,
        incomplete: incomplete
      };
    }
    var ruleIDs = Object.keys(this.data.rules);
    for (var _i = 0; _i < ruleIDs.length; _i++) {
      var _id = ruleIDs[_i];
      var rule = this.data.rules[_id];
      var description = rule.description, help = rule.help;
      locale.rules[_id] = {
        description: description,
        help: help
      };
    }
    this._defaultLocale = locale;
  };
  Audit.prototype._resetLocale = function() {
    var defaultLocale = this._defaultLocale;
    if (!defaultLocale) {
      return;
    }
    this.applyLocale(defaultLocale);
  };
  var mergeCheckLocale = function mergeCheckLocale(a, b) {
    var pass = b.pass, fail = b.fail;
    if (typeof pass === 'string') {
      pass = axe.imports.doT.compile(pass);
    }
    if (typeof fail === 'string') {
      fail = axe.imports.doT.compile(fail);
    }
    return _extends({}, a, {
      messages: {
        pass: pass || a.messages.pass,
        fail: fail || a.messages.fail,
        incomplete: _typeof(a.messages.incomplete) === 'object' ? _extends({}, a.messages.incomplete, b.incomplete) : b.incomplete
      }
    });
  };
  var mergeRuleLocale = function mergeRuleLocale(a, b) {
    var help = b.help, description = b.description;
    if (typeof help === 'string') {
      help = axe.imports.doT.compile(help);
    }
    if (typeof description === 'string') {
      description = axe.imports.doT.compile(description);
    }
    return _extends({}, a, {
      help: help || a.help,
      description: description || a.description
    });
  };
  Audit.prototype._applyCheckLocale = function(checks) {
    var keys = Object.keys(checks);
    for (var i = 0; i < keys.length; i++) {
      var id = keys[i];
      if (!this.data.checks[id]) {
        throw new Error('Locale provided for unknown check: "' + id + '"');
      }
      this.data.checks[id] = mergeCheckLocale(this.data.checks[id], checks[id]);
    }
  };
  Audit.prototype._applyRuleLocale = function(rules) {
    var keys = Object.keys(rules);
    for (var i = 0; i < keys.length; i++) {
      var id = keys[i];
      if (!this.data.rules[id]) {
        throw new Error('Locale provided for unknown rule: "' + id + '"');
      }
      this.data.rules[id] = mergeRuleLocale(this.data.rules[id], rules[id]);
    }
  };
  Audit.prototype.applyLocale = function(locale) {
    this._setDefaultLocale();
    if (locale.checks) {
      this._applyCheckLocale(locale.checks);
    }
    if (locale.rules) {
      this._applyRuleLocale(locale.rules);
    }
  };
  Audit.prototype._init = function() {
    var audit = getDefaultConfiguration(this.defaultConfig);
    axe.commons = commons = audit.commons;
    this.reporter = audit.reporter;
    this.commands = {};
    this.rules = [];
    this.checks = {};
    unpackToObject(audit.rules, this, 'addRule');
    unpackToObject(audit.checks, this, 'addCheck');
    this.data = {};
    this.data.checks = audit.data && audit.data.checks || {};
    this.data.rules = audit.data && audit.data.rules || {};
    this.data.failureSummaries = audit.data && audit.data.failureSummaries || {};
    this.data.incompleteFallbackMessage = audit.data && audit.data.incompleteFallbackMessage || '';
    this._constructHelpUrls();
  };
  Audit.prototype.registerCommand = function(command) {
    'use strict';
    this.commands[command.id] = command.callback;
  };
  Audit.prototype.addRule = function(spec) {
    'use strict';
    if (spec.metadata) {
      this.data.rules[spec.id] = spec.metadata;
    }
    var rule = this.getRule(spec.id);
    if (rule) {
      rule.configure(spec);
    } else {
      this.rules.push(new Rule(spec, this));
    }
  };
  Audit.prototype.addCheck = function(spec) {
    'use strict';
    var metadata = spec.metadata;
    if ((typeof metadata === 'undefined' ? 'undefined' : _typeof(metadata)) === 'object') {
      this.data.checks[spec.id] = metadata;
      if (_typeof(metadata.messages) === 'object') {
        Object.keys(metadata.messages).filter(function(prop) {
          return metadata.messages.hasOwnProperty(prop) && typeof metadata.messages[prop] === 'string';
        }).forEach(function(prop) {
          if (metadata.messages[prop].indexOf('function') === 0) {
            metadata.messages[prop] = new Function('return ' + metadata.messages[prop] + ';')();
          }
        });
      }
    }
    if (this.checks[spec.id]) {
      this.checks[spec.id].configure(spec);
    } else {
      this.checks[spec.id] = new Check(spec);
    }
  };
  function getRulesToRun(rules, context, options) {
    var base = {
      now: [],
      later: []
    };
    var splitRules = rules.reduce(function(out, rule) {
      if (!axe.utils.ruleShouldRun(rule, context, options)) {
        return out;
      }
      if (rule.preload) {
        out.later.push(rule);
        return out;
      }
      out.now.push(rule);
      return out;
    }, base);
    return splitRules;
  }
  function getDefferedRule(rule, context, options) {
    var markStart = void 0;
    var markEnd = void 0;
    if (options.performanceTimer) {
      markStart = 'mark_rule_start_' + rule.id;
      markEnd = 'mark_rule_end_' + rule.id;
      axe.utils.performanceTimer.mark(markStart);
    }
    return function(resolve, reject) {
      rule.run(context, options, function(ruleResult) {
        if (options.performanceTimer) {
          axe.utils.performanceTimer.mark(markEnd);
          axe.utils.performanceTimer.measure('rule_' + rule.id, markStart, markEnd);
        }
        resolve(ruleResult);
      }, function(err) {
        if (!options.debug) {
          var errResult = Object.assign(new RuleResult(rule), {
            result: axe.constants.CANTTELL,
            description: 'An error occured while running this rule',
            message: err.message,
            stack: err.stack,
            error: err
          });
          resolve(errResult);
        } else {
          reject(err);
        }
      });
    };
  }
  Audit.prototype.run = function(context, options, resolve, reject) {
    'use strict';
    this.normalizeOptions(options);
    axe._selectCache = [];
    var allRulesToRun = getRulesToRun(this.rules, context, options);
    var runNowRules = allRulesToRun.now;
    var runLaterRules = allRulesToRun.later;
    var nowRulesQueue = axe.utils.queue();
    runNowRules.forEach(function(rule) {
      nowRulesQueue.defer(getDefferedRule(rule, context, options));
    });
    var preloaderQueue = axe.utils.queue();
    if (runLaterRules.length) {
      preloaderQueue.defer(function(res, rej) {
        axe.utils.preload(options).then(function(preloadResults) {
          var assets = preloadResults[0];
          res(assets);
        }).catch(function(err) {
          console.warn('Couldn\'t load preload assets: ', err);
          var assets = undefined;
          res(assets);
        });
      });
    }
    var queueForNowRulesAndPreloader = axe.utils.queue();
    queueForNowRulesAndPreloader.defer(nowRulesQueue);
    queueForNowRulesAndPreloader.defer(preloaderQueue);
    queueForNowRulesAndPreloader.then(function(nowRulesAndPreloaderResults) {
      var assetsFromQueue = nowRulesAndPreloaderResults.pop();
      if (assetsFromQueue && assetsFromQueue.length) {
        var assets = assetsFromQueue[0];
        if (assets) {
          context = _extends({}, context, assets);
        }
      }
      var nowRulesResults = nowRulesAndPreloaderResults[0];
      if (!runLaterRules.length) {
        axe._selectCache = undefined;
        resolve(nowRulesResults.filter(function(result) {
          return !!result;
        }));
        return;
      }
      var laterRulesQueue = axe.utils.queue();
      runLaterRules.forEach(function(rule) {
        var deferredRule = getDefferedRule(rule, context, options);
        laterRulesQueue.defer(deferredRule);
      });
      laterRulesQueue.then(function(laterRuleResults) {
        axe._selectCache = undefined;
        resolve(nowRulesResults.concat(laterRuleResults).filter(function(result) {
          return !!result;
        }));
      }).catch(reject);
    }).catch(reject);
  };
  Audit.prototype.after = function(results, options) {
    'use strict';
    var rules = this.rules;
    return results.map(function(ruleResult) {
      var rule = axe.utils.findBy(rules, 'id', ruleResult.id);
      if (!rule) {
        throw new Error('Result for unknown rule. You may be running mismatch aXe-core versions');
      }
      return rule.after(ruleResult, options);
    });
  };
  Audit.prototype.getRule = function(ruleId) {
    return this.rules.find(function(rule) {
      return rule.id === ruleId;
    });
  };
  Audit.prototype.normalizeOptions = function(options) {
    'use strict';
    var audit = this;
    if (_typeof(options.runOnly) === 'object') {
      if (Array.isArray(options.runOnly)) {
        options.runOnly = {
          type: 'tag',
          values: options.runOnly
        };
      }
      var only = options.runOnly;
      if (only.value && !only.values) {
        only.values = only.value;
        delete only.value;
      }
      if (!Array.isArray(only.values) || only.values.length === 0) {
        throw new Error('runOnly.values must be a non-empty array');
      }
      if ([ 'rule', 'rules' ].includes(only.type)) {
        only.type = 'rule';
        only.values.forEach(function(ruleId) {
          if (!audit.getRule(ruleId)) {
            throw new Error('unknown rule `' + ruleId + '` in options.runOnly');
          }
        });
      } else if ([ 'tag', 'tags', undefined ].includes(only.type)) {
        only.type = 'tag';
        var unmatchedTags = audit.rules.reduce(function(unmatchedTags, rule) {
          return unmatchedTags.length ? unmatchedTags.filter(function(tag) {
            return !rule.tags.includes(tag);
          }) : unmatchedTags;
        }, only.values);
        if (unmatchedTags.length !== 0) {
          throw new Error('Could not find tags `' + unmatchedTags.join('`, `') + '`');
        }
      } else {
        throw new Error('Unknown runOnly type \'' + only.type + '\'');
      }
    }
    if (_typeof(options.rules) === 'object') {
      Object.keys(options.rules).forEach(function(ruleId) {
        if (!audit.getRule(ruleId)) {
          throw new Error('unknown rule `' + ruleId + '` in options.rules');
        }
      });
    }
    return options;
  };
  Audit.prototype.setBranding = function(branding) {
    'use strict';
    var previous = {
      brand: this.brand,
      application: this.application
    };
    if (branding && branding.hasOwnProperty('brand') && branding.brand && typeof branding.brand === 'string') {
      this.brand = branding.brand;
    }
    if (branding && branding.hasOwnProperty('application') && branding.application && typeof branding.application === 'string') {
      this.application = branding.application;
    }
    this._constructHelpUrls(previous);
  };
  function getHelpUrl(_ref, ruleId, version) {
    var brand = _ref.brand, application = _ref.application;
    return axe.constants.helpUrlBase + brand + '/' + (version || axe.version.substring(0, axe.version.lastIndexOf('.'))) + '/' + ruleId + '?application=' + application;
  }
  Audit.prototype._constructHelpUrls = function() {
    var _this = this;
    var previous = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var version = (axe.version.match(/^[1-9][0-9]*\.[0-9]+/) || [ 'x.y' ])[0];
    this.rules.forEach(function(rule) {
      if (!_this.data.rules[rule.id]) {
        _this.data.rules[rule.id] = {};
      }
      var metaData = _this.data.rules[rule.id];
      if (typeof metaData.helpUrl !== 'string' || previous && metaData.helpUrl === getHelpUrl(previous, rule.id, version)) {
        metaData.helpUrl = getHelpUrl(_this, rule.id, version);
      }
    });
  };
  Audit.prototype.resetRulesAndChecks = function() {
    'use strict';
    this._init();
    this._resetLocale();
  };
  'use strict';
  function CheckResult(check) {
    'use strict';
    this.id = check.id;
    this.data = null;
    this.relatedNodes = [];
    this.result = null;
  }
  'use strict';
  function createExecutionContext(spec) {
    'use strict';
    if (typeof spec === 'string') {
      return new Function('return ' + spec + ';')();
    }
    return spec;
  }
  function Check(spec) {
    if (spec) {
      this.id = spec.id;
      this.configure(spec);
    }
  }
  Check.prototype.enabled = true;
  Check.prototype.run = function(node, options, context, resolve, reject) {
    'use strict';
    options = options || {};
    var enabled = options.hasOwnProperty('enabled') ? options.enabled : this.enabled, checkOptions = options.options || this.options;
    if (enabled) {
      var checkResult = new CheckResult(this);
      var checkHelper = axe.utils.checkHelper(checkResult, options, resolve, reject);
      var result;
      try {
        result = this.evaluate.call(checkHelper, node.actualNode, checkOptions, node, context);
      } catch (e) {
        reject(e);
        return;
      }
      if (!checkHelper.isAsync) {
        checkResult.result = result;
        setTimeout(function() {
          resolve(checkResult);
        }, 0);
      }
    } else {
      resolve(null);
    }
  };
  Check.prototype.configure = function(spec) {
    var _this = this;
    [ 'options', 'enabled' ].filter(function(prop) {
      return spec.hasOwnProperty(prop);
    }).forEach(function(prop) {
      return _this[prop] = spec[prop];
    });
    [ 'evaluate', 'after' ].filter(function(prop) {
      return spec.hasOwnProperty(prop);
    }).forEach(function(prop) {
      return _this[prop] = createExecutionContext(spec[prop]);
    });
  };
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  function pushUniqueFrame(collection, frame) {
    'use strict';
    if (axe.utils.isHidden(frame)) {
      return;
    }
    var fr = axe.utils.findBy(collection, 'node', frame);
    if (!fr) {
      collection.push({
        node: frame,
        include: [],
        exclude: []
      });
    }
  }
  function pushUniqueFrameSelector(context, type, selectorArray) {
    'use strict';
    context.frames = context.frames || [];
    var result, frame;
    var frames = document.querySelectorAll(selectorArray.shift());
    frameloop: for (var i = 0, l = frames.length; i < l; i++) {
      frame = frames[i];
      for (var j = 0, l2 = context.frames.length; j < l2; j++) {
        if (context.frames[j].node === frame) {
          context.frames[j][type].push(selectorArray);
          break frameloop;
        }
      }
      result = {
        node: frame,
        include: [],
        exclude: []
      };
      if (selectorArray) {
        result[type].push(selectorArray);
      }
      context.frames.push(result);
    }
  }
  function normalizeContext(context) {
    'use strict';
    if (context && (typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object' || context instanceof NodeList) {
      if (context instanceof Node) {
        return {
          include: [ context ],
          exclude: []
        };
      }
      if (context.hasOwnProperty('include') || context.hasOwnProperty('exclude')) {
        return {
          include: context.include && +context.include.length ? context.include : [ document ],
          exclude: context.exclude || []
        };
      }
      if (context.length === +context.length) {
        return {
          include: context,
          exclude: []
        };
      }
    }
    if (typeof context === 'string') {
      return {
        include: [ context ],
        exclude: []
      };
    }
    return {
      include: [ document ],
      exclude: []
    };
  }
  function parseSelectorArray(context, type) {
    'use strict';
    var item, result = [], nodeList;
    for (var i = 0, l = context[type].length; i < l; i++) {
      item = context[type][i];
      if (typeof item === 'string') {
        nodeList = Array.from(document.querySelectorAll(item));
        result = result.concat(nodeList.map(function(node) {
          return axe.utils.getNodeFromTree(context.flatTree[0], node);
        }));
        break;
      } else if (item && item.length && !(item instanceof Node)) {
        if (item.length > 1) {
          pushUniqueFrameSelector(context, type, item);
        } else {
          nodeList = Array.from(document.querySelectorAll(item[0]));
          result = result.concat(nodeList.map(function(node) {
            return axe.utils.getNodeFromTree(context.flatTree[0], node);
          }));
        }
      } else if (item instanceof Node) {
        if (item.documentElement instanceof Node) {
          result.push(context.flatTree[0]);
        } else {
          result.push(axe.utils.getNodeFromTree(context.flatTree[0], item));
        }
      }
    }
    return result.filter(function(r) {
      return r;
    });
  }
  function validateContext(context) {
    'use strict';
    if (context.include.length === 0) {
      if (context.frames.length === 0) {
        var env = axe.utils.respondable.isInFrame() ? 'frame' : 'page';
        return new Error('No elements found for include in ' + env + ' Context');
      }
      context.frames.forEach(function(frame, i) {
        if (frame.include.length === 0) {
          return new Error('No elements found for include in Context of frame ' + i);
        }
      });
    }
  }
  function getRootNode(_ref) {
    var include = _ref.include, exclude = _ref.exclude;
    var selectors = Array.from(include).concat(Array.from(exclude));
    var localDocument = selectors.reduce(function(result, item) {
      if (result) {
        return result;
      } else if (item instanceof Element) {
        return item.ownerDocument;
      } else if (item instanceof Document) {
        return item;
      }
    }, null);
    return (localDocument || document).documentElement;
  }
  function Context(spec) {
    'use strict';
    var _this = this;
    this.frames = [];
    this.initiator = spec && typeof spec.initiator === 'boolean' ? spec.initiator : true;
    this.page = false;
    spec = normalizeContext(spec);
    this.flatTree = axe.utils.getFlattenedTree(getRootNode(spec));
    this.exclude = spec.exclude;
    this.include = spec.include;
    this.include = parseSelectorArray(this, 'include');
    this.exclude = parseSelectorArray(this, 'exclude');
    axe.utils.select('frame, iframe', this).forEach(function(frame) {
      if (isNodeInContext(frame, _this)) {
        pushUniqueFrame(_this.frames, frame.actualNode);
      }
    });
    if (this.include.length === 1 && this.include[0].actualNode === document.documentElement) {
      this.page = true;
    }
    var err = validateContext(this);
    if (err instanceof Error) {
      throw err;
    }
    if (!Array.isArray(this.include)) {
      this.include = Array.from(this.include);
    }
    this.include.sort(axe.utils.nodeSorter);
  }
  'use strict';
  function RuleResult(rule) {
    'use strict';
    this.id = rule.id;
    this.result = axe.constants.NA;
    this.pageLevel = rule.pageLevel;
    this.impact = null;
    this.nodes = [];
  }
  'use strict';
  function Rule(spec, parentAudit) {
    'use strict';
    this._audit = parentAudit;
    this.id = spec.id;
    this.selector = spec.selector || '*';
    this.excludeHidden = typeof spec.excludeHidden === 'boolean' ? spec.excludeHidden : true;
    this.enabled = typeof spec.enabled === 'boolean' ? spec.enabled : true;
    this.pageLevel = typeof spec.pageLevel === 'boolean' ? spec.pageLevel : false;
    this.any = spec.any || [];
    this.all = spec.all || [];
    this.none = spec.none || [];
    this.tags = spec.tags || [];
    this.preload = spec.preload ? true : false;
    if (spec.matches) {
      this.matches = createExecutionContext(spec.matches);
    }
  }
  Rule.prototype.matches = function() {
    'use strict';
    return true;
  };
  Rule.prototype.gather = function(context) {
    'use strict';
    var elements = axe.utils.select(this.selector, context);
    if (this.excludeHidden) {
      return elements.filter(function(element) {
        return !axe.utils.isHidden(element.actualNode);
      });
    }
    return elements;
  };
  Rule.prototype.runChecks = function(type, node, options, context, resolve, reject) {
    'use strict';
    var self = this;
    var checkQueue = axe.utils.queue();
    this[type].forEach(function(c) {
      var check = self._audit.checks[c.id || c];
      var option = axe.utils.getCheckOption(check, self.id, options);
      checkQueue.defer(function(res, rej) {
        check.run(node, option, context, res, rej);
      });
    });
    checkQueue.then(function(results) {
      results = results.filter(function(check) {
        return check;
      });
      resolve({
        type: type,
        results: results
      });
    }).catch(reject);
  };
  Rule.prototype.run = function(context, options, resolve, reject) {
    var _this = this;
    var q = axe.utils.queue();
    var ruleResult = new RuleResult(this);
    var markStart = 'mark_runchecks_start_' + this.id;
    var markEnd = 'mark_runchecks_end_' + this.id;
    var nodes = void 0;
    try {
      nodes = this.gather(context).filter(function(node) {
        return _this.matches(node.actualNode, node);
      });
    } catch (error) {
      reject(new SupportError({
        cause: error,
        ruleId: this.id
      }));
      return;
    }
    if (options.performanceTimer) {
      axe.log('gather (', nodes.length, '):', axe.utils.performanceTimer.timeElapsed() + 'ms');
      axe.utils.performanceTimer.mark(markStart);
    }
    nodes.forEach(function(node) {
      q.defer(function(resolveNode, rejectNode) {
        var checkQueue = axe.utils.queue();
        [ 'any', 'all', 'none' ].forEach(function(type) {
          checkQueue.defer(function(res, rej) {
            _this.runChecks(type, node, options, context, res, rej);
          });
        });
        checkQueue.then(function(results) {
          if (results.length) {
            var hasResults = false, result = {};
            results.forEach(function(r) {
              var res = r.results.filter(function(result) {
                return result;
              });
              result[r.type] = res;
              if (res.length) {
                hasResults = true;
              }
            });
            if (hasResults) {
              result.node = new axe.utils.DqElement(node.actualNode, options);
              ruleResult.nodes.push(result);
            }
          }
          resolveNode();
        }).catch(function(err) {
          return rejectNode(err);
        });
      });
    });
    if (options.performanceTimer) {
      axe.utils.performanceTimer.mark(markEnd);
      axe.utils.performanceTimer.measure('runchecks_' + this.id, markStart, markEnd);
    }
    q.then(function() {
      return resolve(ruleResult);
    }).catch(function(error) {
      return reject(error);
    });
  };
  function findAfterChecks(rule) {
    'use strict';
    return axe.utils.getAllChecks(rule).map(function(c) {
      var check = rule._audit.checks[c.id || c];
      return check && typeof check.after === 'function' ? check : null;
    }).filter(Boolean);
  }
  function findCheckResults(nodes, checkID) {
    'use strict';
    var checkResults = [];
    nodes.forEach(function(nodeResult) {
      var checks = axe.utils.getAllChecks(nodeResult);
      checks.forEach(function(checkResult) {
        if (checkResult.id === checkID) {
          checkResults.push(checkResult);
        }
      });
    });
    return checkResults;
  }
  function filterChecks(checks) {
    'use strict';
    return checks.filter(function(check) {
      return check.filtered !== true;
    });
  }
  function sanitizeNodes(result) {
    'use strict';
    var checkTypes = [ 'any', 'all', 'none' ];
    var nodes = result.nodes.filter(function(detail) {
      var length = 0;
      checkTypes.forEach(function(type) {
        detail[type] = filterChecks(detail[type]);
        length += detail[type].length;
      });
      return length > 0;
    });
    if (result.pageLevel && nodes.length) {
      nodes = [ nodes.reduce(function(a, b) {
        if (a) {
          checkTypes.forEach(function(type) {
            a[type].push.apply(a[type], b[type]);
          });
          return a;
        }
      }) ];
    }
    return nodes;
  }
  Rule.prototype.after = function(result, options) {
    'use strict';
    var afterChecks = findAfterChecks(this);
    var ruleID = this.id;
    afterChecks.forEach(function(check) {
      var beforeResults = findCheckResults(result.nodes, check.id);
      var option = axe.utils.getCheckOption(check, ruleID, options);
      var afterResults = check.after(beforeResults, option);
      beforeResults.forEach(function(item) {
        if (afterResults.indexOf(item) === -1) {
          item.filtered = true;
        }
      });
    });
    result.nodes = sanitizeNodes(result);
    return result;
  };
  Rule.prototype.configure = function(spec) {
    'use strict';
    if (spec.hasOwnProperty('selector')) {
      this.selector = spec.selector;
    }
    if (spec.hasOwnProperty('excludeHidden')) {
      this.excludeHidden = typeof spec.excludeHidden === 'boolean' ? spec.excludeHidden : true;
    }
    if (spec.hasOwnProperty('enabled')) {
      this.enabled = typeof spec.enabled === 'boolean' ? spec.enabled : true;
    }
    if (spec.hasOwnProperty('pageLevel')) {
      this.pageLevel = typeof spec.pageLevel === 'boolean' ? spec.pageLevel : false;
    }
    if (spec.hasOwnProperty('any')) {
      this.any = spec.any;
    }
    if (spec.hasOwnProperty('all')) {
      this.all = spec.all;
    }
    if (spec.hasOwnProperty('none')) {
      this.none = spec.none;
    }
    if (spec.hasOwnProperty('tags')) {
      this.tags = spec.tags;
    }
    if (spec.hasOwnProperty('matches')) {
      if (typeof spec.matches === 'string') {
        this.matches = new Function('return ' + spec.matches + ';')();
      } else {
        this.matches = spec.matches;
      }
    }
  };
  'use strict';
  (function(axe) {
    var definitions = [ {
      name: 'NA',
      value: 'inapplicable',
      priority: 0,
      group: 'inapplicable'
    }, {
      name: 'PASS',
      value: 'passed',
      priority: 1,
      group: 'passes'
    }, {
      name: 'CANTTELL',
      value: 'cantTell',
      priority: 2,
      group: 'incomplete'
    }, {
      name: 'FAIL',
      value: 'failed',
      priority: 3,
      group: 'violations'
    } ];
    var constants = {
      helpUrlBase: 'https://dequeuniversity.com/rules/',
      results: [],
      resultGroups: [],
      resultGroupMap: {},
      impact: Object.freeze([ 'minor', 'moderate', 'serious', 'critical' ]),
      preloadAssets: Object.freeze([ 'cssom' ]),
      preloadAssetsTimeout: 1e4
    };
    definitions.forEach(function(definition) {
      var name = definition.name;
      var value = definition.value;
      var priority = definition.priority;
      var group = definition.group;
      constants[name] = value;
      constants[name + '_PRIO'] = priority;
      constants[name + '_GROUP'] = group;
      constants.results[priority] = value;
      constants.resultGroups[priority] = group;
      constants.resultGroupMap[value] = group;
    });
    Object.freeze(constants.results);
    Object.freeze(constants.resultGroups);
    Object.freeze(constants.resultGroupMap);
    Object.freeze(constants);
    Object.defineProperty(axe, 'constants', {
      value: constants,
      enumerable: true,
      configurable: false,
      writable: false
    });
  })(axe);
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  axe.imports['axios'] = function() {
    return function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
          exports: {},
          id: moduleId,
          loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.p = '';
      return __webpack_require__(0);
    }([ function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(1);
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var bind = __webpack_require__(3);
      var Axios = __webpack_require__(5);
      var defaults = __webpack_require__(6);
      function createInstance(defaultConfig) {
        var context = new Axios(defaultConfig);
        var instance = bind(Axios.prototype.request, context);
        utils.extend(instance, Axios.prototype, context);
        utils.extend(instance, context);
        return instance;
      }
      var axios = createInstance(defaults);
      axios.Axios = Axios;
      axios.create = function create(instanceConfig) {
        return createInstance(utils.merge(defaults, instanceConfig));
      };
      axios.Cancel = __webpack_require__(23);
      axios.CancelToken = __webpack_require__(24);
      axios.isCancel = __webpack_require__(20);
      axios.all = function all(promises) {
        return Promise.all(promises);
      };
      axios.spread = __webpack_require__(25);
      module.exports = axios;
      module.exports.default = axios;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var bind = __webpack_require__(3);
      var isBuffer = __webpack_require__(4);
      var toString = Object.prototype.toString;
      function isArray(val) {
        return toString.call(val) === '[object Array]';
      }
      function isArrayBuffer(val) {
        return toString.call(val) === '[object ArrayBuffer]';
      }
      function isFormData(val) {
        return typeof FormData !== 'undefined' && val instanceof FormData;
      }
      function isArrayBufferView(val) {
        var result;
        if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
          result = ArrayBuffer.isView(val);
        } else {
          result = val && val.buffer && val.buffer instanceof ArrayBuffer;
        }
        return result;
      }
      function isString(val) {
        return typeof val === 'string';
      }
      function isNumber(val) {
        return typeof val === 'number';
      }
      function isUndefined(val) {
        return typeof val === 'undefined';
      }
      function isObject(val) {
        return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
      }
      function isDate(val) {
        return toString.call(val) === '[object Date]';
      }
      function isFile(val) {
        return toString.call(val) === '[object File]';
      }
      function isBlob(val) {
        return toString.call(val) === '[object Blob]';
      }
      function isFunction(val) {
        return toString.call(val) === '[object Function]';
      }
      function isStream(val) {
        return isObject(val) && isFunction(val.pipe);
      }
      function isURLSearchParams(val) {
        return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
      }
      function trim(str) {
        return str.replace(/^\s*/, '').replace(/\s*$/, '');
      }
      function isStandardBrowserEnv() {
        if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
          return false;
        }
        return typeof window !== 'undefined' && typeof document !== 'undefined';
      }
      function forEach(obj, fn) {
        if (obj === null || typeof obj === 'undefined') {
          return;
        }
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
          obj = [ obj ];
        }
        if (isArray(obj)) {
          for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
          }
        } else {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              fn.call(null, obj[key], key, obj);
            }
          }
        }
      }
      function merge() {
        var result = {};
        function assignValue(val, key) {
          if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
            result[key] = merge(result[key], val);
          } else {
            result[key] = val;
          }
        }
        for (var i = 0, l = arguments.length; i < l; i++) {
          forEach(arguments[i], assignValue);
        }
        return result;
      }
      function extend(a, b, thisArg) {
        forEach(b, function assignValue(val, key) {
          if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg);
          } else {
            a[key] = val;
          }
        });
        return a;
      }
      module.exports = {
        isArray: isArray,
        isArrayBuffer: isArrayBuffer,
        isBuffer: isBuffer,
        isFormData: isFormData,
        isArrayBufferView: isArrayBufferView,
        isString: isString,
        isNumber: isNumber,
        isObject: isObject,
        isUndefined: isUndefined,
        isDate: isDate,
        isFile: isFile,
        isBlob: isBlob,
        isFunction: isFunction,
        isStream: isStream,
        isURLSearchParams: isURLSearchParams,
        isStandardBrowserEnv: isStandardBrowserEnv,
        forEach: forEach,
        merge: merge,
        extend: extend,
        trim: trim
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function bind(fn, thisArg) {
        return function wrap() {
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          return fn.apply(thisArg, args);
        };
      };
    }, function(module, exports) {
      module.exports = function(obj) {
        return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
      };
      function isBuffer(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
      }
      function isSlowBuffer(obj) {
        return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
      }
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var defaults = __webpack_require__(6);
      var utils = __webpack_require__(2);
      var InterceptorManager = __webpack_require__(17);
      var dispatchRequest = __webpack_require__(18);
      function Axios(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager(),
          response: new InterceptorManager()
        };
      }
      Axios.prototype.request = function request(config) {
        if (typeof config === 'string') {
          config = utils.merge({
            url: arguments[0]
          }, arguments[1]);
        }
        config = utils.merge(defaults, {
          method: 'get'
        }, this.defaults, config);
        config.method = config.method.toLowerCase();
        var chain = [ dispatchRequest, undefined ];
        var promise = Promise.resolve(config);
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          chain.push(interceptor.fulfilled, interceptor.rejected);
        });
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      };
      utils.forEach([ 'delete', 'get', 'head', 'options' ], function forEachMethodNoData(method) {
        Axios.prototype[method] = function(url, config) {
          return this.request(utils.merge(config || {}, {
            method: method,
            url: url
          }));
        };
      });
      utils.forEach([ 'post', 'put', 'patch' ], function forEachMethodWithData(method) {
        Axios.prototype[method] = function(url, data, config) {
          return this.request(utils.merge(config || {}, {
            method: method,
            url: url,
            data: data
          }));
        };
      });
      module.exports = Axios;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var normalizeHeaderName = __webpack_require__(7);
      var DEFAULT_CONTENT_TYPE = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      function setContentTypeIfUnset(headers, value) {
        if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
          headers['Content-Type'] = value;
        }
      }
      function getDefaultAdapter() {
        var adapter;
        if (typeof XMLHttpRequest !== 'undefined') {
          adapter = __webpack_require__(8);
        } else if (typeof process !== 'undefined') {
          adapter = __webpack_require__(8);
        }
        return adapter;
      }
      var defaults = {
        adapter: getDefaultAdapter(),
        transformRequest: [ function transformRequest(data, headers) {
          normalizeHeaderName(headers, 'Content-Type');
          if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
            return data;
          }
          if (utils.isArrayBufferView(data)) {
            return data.buffer;
          }
          if (utils.isURLSearchParams(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            return data.toString();
          }
          if (utils.isObject(data)) {
            setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
            return JSON.stringify(data);
          }
          return data;
        } ],
        transformResponse: [ function transformResponse(data) {
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch (e) {}
          }
          return data;
        } ],
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        validateStatus: function validateStatus(status) {
          return status >= 200 && status < 300;
        }
      };
      defaults.headers = {
        common: {
          Accept: 'application/json, text/plain, */*'
        }
      };
      utils.forEach([ 'delete', 'get', 'head' ], function forEachMethodNoData(method) {
        defaults.headers[method] = {};
      });
      utils.forEach([ 'post', 'put', 'patch' ], function forEachMethodWithData(method) {
        defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
      });
      module.exports = defaults;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = function normalizeHeaderName(headers, normalizedName) {
        utils.forEach(headers, function processHeader(value, name) {
          if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
          }
        });
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var settle = __webpack_require__(9);
      var buildURL = __webpack_require__(12);
      var parseHeaders = __webpack_require__(13);
      var isURLSameOrigin = __webpack_require__(14);
      var createError = __webpack_require__(10);
      var btoa = typeof window !== 'undefined' && window.btoa && window.btoa.bind(window) || __webpack_require__(15);
      module.exports = function xhrAdapter(config) {
        return new Promise(function dispatchXhrRequest(resolve, reject) {
          var requestData = config.data;
          var requestHeaders = config.headers;
          if (utils.isFormData(requestData)) {
            delete requestHeaders['Content-Type'];
          }
          var request = new XMLHttpRequest();
          var loadEvent = 'onreadystatechange';
          var xDomain = false;
          if ('production' !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
            request = new window.XDomainRequest();
            loadEvent = 'onload';
            xDomain = true;
            request.onprogress = function handleProgress() {};
            request.ontimeout = function handleTimeout() {};
          }
          if (config.auth) {
            var username = config.auth.username || '';
            var password = config.auth.password || '';
            requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
          }
          request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
          request.timeout = config.timeout;
          request[loadEvent] = function handleLoad() {
            if (!request || request.readyState !== 4 && !xDomain) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            }
            var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
            var response = {
              data: responseData,
              status: request.status === 1223 ? 204 : request.status,
              statusText: request.status === 1223 ? 'No Content' : request.statusText,
              headers: responseHeaders,
              config: config,
              request: request
            };
            settle(resolve, reject, response);
            request = null;
          };
          request.onerror = function handleError() {
            reject(createError('Network Error', config, null, request));
            request = null;
          };
          request.ontimeout = function handleTimeout() {
            reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request));
            request = null;
          };
          if (utils.isStandardBrowserEnv()) {
            var cookies = __webpack_require__(16);
            var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
            if (xsrfValue) {
              requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }
          }
          if ('setRequestHeader' in request) {
            utils.forEach(requestHeaders, function setRequestHeader(val, key) {
              if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
                delete requestHeaders[key];
              } else {
                request.setRequestHeader(key, val);
              }
            });
          }
          if (config.withCredentials) {
            request.withCredentials = true;
          }
          if (config.responseType) {
            try {
              request.responseType = config.responseType;
            } catch (e) {
              if (config.responseType !== 'json') {
                throw e;
              }
            }
          }
          if (typeof config.onDownloadProgress === 'function') {
            request.addEventListener('progress', config.onDownloadProgress);
          }
          if (typeof config.onUploadProgress === 'function' && request.upload) {
            request.upload.addEventListener('progress', config.onUploadProgress);
          }
          if (config.cancelToken) {
            config.cancelToken.promise.then(function onCanceled(cancel) {
              if (!request) {
                return;
              }
              request.abort();
              reject(cancel);
              request = null;
            });
          }
          if (requestData === undefined) {
            requestData = null;
          }
          request.send(requestData);
        });
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var createError = __webpack_require__(10);
      module.exports = function settle(resolve, reject, response) {
        var validateStatus = response.config.validateStatus;
        if (!response.status || !validateStatus || validateStatus(response.status)) {
          resolve(response);
        } else {
          reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
        }
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var enhanceError = __webpack_require__(11);
      module.exports = function createError(message, config, code, request, response) {
        var error = new Error(message);
        return enhanceError(error, config, code, request, response);
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function enhanceError(error, config, code, request, response) {
        error.config = config;
        if (code) {
          error.code = code;
        }
        error.request = request;
        error.response = response;
        return error;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
      }
      module.exports = function buildURL(url, params, paramsSerializer) {
        if (!params) {
          return url;
        }
        var serializedParams;
        if (paramsSerializer) {
          serializedParams = paramsSerializer(params);
        } else if (utils.isURLSearchParams(params)) {
          serializedParams = params.toString();
        } else {
          var parts = [];
          utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === 'undefined') {
              return;
            }
            if (utils.isArray(val)) {
              key = key + '[]';
            } else {
              val = [ val ];
            }
            utils.forEach(val, function parseValue(v) {
              if (utils.isDate(v)) {
                v = v.toISOString();
              } else if (utils.isObject(v)) {
                v = JSON.stringify(v);
              }
              parts.push(encode(key) + '=' + encode(v));
            });
          });
          serializedParams = parts.join('&');
        }
        if (serializedParams) {
          url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
        }
        return url;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var ignoreDuplicateOf = [ 'age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent' ];
      module.exports = function parseHeaders(headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
          return parsed;
        }
        utils.forEach(headers.split('\n'), function parser(line) {
          i = line.indexOf(':');
          key = utils.trim(line.substr(0, i)).toLowerCase();
          val = utils.trim(line.substr(i + 1));
          if (key) {
            if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
              return;
            }
            if (key === 'set-cookie') {
              parsed[key] = (parsed[key] ? parsed[key] : []).concat([ val ]);
            } else {
              parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
          }
        });
        return parsed;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;
        function resolveURL(url) {
          var href = url;
          if (msie) {
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute('href', href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin(requestURL) {
          var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      }() : function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      }();
    }, function(module, exports) {
      'use strict';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      function E() {
        this.message = 'String contains an invalid character';
      }
      E.prototype = new Error();
      E.prototype.code = 5;
      E.prototype.name = 'InvalidCharacterError';
      function btoa(input) {
        var str = String(input);
        var output = '';
        for (var block, charCode, idx = 0, map = chars; str.charAt(idx | 0) || (map = '=', 
        idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
          charCode = str.charCodeAt(idx += 3 / 4);
          if (charCode > 255) {
            throw new E();
          }
          block = block << 8 | charCode;
        }
        return output;
      }
      module.exports = btoa;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }
            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }
            if (secure === true) {
              cookie.push('secure');
            }
            document.cookie = cookie.join('; ');
          },
          read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return match ? decodeURIComponent(match[3]) : null;
          },
          remove: function remove(name) {
            this.write(name, '', Date.now() - 864e5);
          }
        };
      }() : function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() {
            return null;
          },
          remove: function remove() {}
        };
      }();
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      function InterceptorManager() {
        this.handlers = [];
      }
      InterceptorManager.prototype.use = function use(fulfilled, rejected) {
        this.handlers.push({
          fulfilled: fulfilled,
          rejected: rejected
        });
        return this.handlers.length - 1;
      };
      InterceptorManager.prototype.eject = function eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      };
      InterceptorManager.prototype.forEach = function forEach(fn) {
        utils.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      };
      module.exports = InterceptorManager;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var transformData = __webpack_require__(19);
      var isCancel = __webpack_require__(20);
      var defaults = __webpack_require__(6);
      var isAbsoluteURL = __webpack_require__(21);
      var combineURLs = __webpack_require__(22);
      function throwIfCancellationRequested(config) {
        if (config.cancelToken) {
          config.cancelToken.throwIfRequested();
        }
      }
      module.exports = function dispatchRequest(config) {
        throwIfCancellationRequested(config);
        if (config.baseURL && !isAbsoluteURL(config.url)) {
          config.url = combineURLs(config.baseURL, config.url);
        }
        config.headers = config.headers || {};
        config.data = transformData(config.data, config.headers, config.transformRequest);
        config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});
        utils.forEach([ 'delete', 'get', 'head', 'post', 'put', 'patch', 'common' ], function cleanHeaderConfig(method) {
          delete config.headers[method];
        });
        var adapter = config.adapter || defaults.adapter;
        return adapter(config).then(function onAdapterResolution(response) {
          throwIfCancellationRequested(config);
          response.data = transformData(response.data, response.headers, config.transformResponse);
          return response;
        }, function onAdapterRejection(reason) {
          if (!isCancel(reason)) {
            throwIfCancellationRequested(config);
            if (reason && reason.response) {
              reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
            }
          }
          return Promise.reject(reason);
        });
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = function transformData(data, headers, fns) {
        utils.forEach(fns, function transform(fn) {
          data = fn(data, headers);
        });
        return data;
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function isCancel(value) {
        return !!(value && value.__CANCEL__);
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function isAbsoluteURL(url) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function combineURLs(baseURL, relativeURL) {
        return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
      };
    }, function(module, exports) {
      'use strict';
      function Cancel(message) {
        this.message = message;
      }
      Cancel.prototype.toString = function toString() {
        return 'Cancel' + (this.message ? ': ' + this.message : '');
      };
      Cancel.prototype.__CANCEL__ = true;
      module.exports = Cancel;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var Cancel = __webpack_require__(23);
      function CancelToken(executor) {
        if (typeof executor !== 'function') {
          throw new TypeError('executor must be a function.');
        }
        var resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });
        var token = this;
        executor(function cancel(message) {
          if (token.reason) {
            return;
          }
          token.reason = new Cancel(message);
          resolvePromise(token.reason);
        });
      }
      CancelToken.prototype.throwIfRequested = function throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      };
      CancelToken.source = function source() {
        var cancel;
        var token = new CancelToken(function executor(c) {
          cancel = c;
        });
        return {
          token: token,
          cancel: cancel
        };
      };
      module.exports = CancelToken;
    }, function(module, exports) {
      'use strict';
      module.exports = function spread(callback) {
        return function wrap(arr) {
          return callback.apply(null, arr);
        };
      };
    } ]);
  }();
  'use strict';
  axe.imports['doT'] = function(module, exports, define, require, process) {
    var global = Function('return this')();
    var __old_global__ = global['doT'];
    (function() {
      'use strict';
      var doT = {
        name: 'doT',
        version: '1.1.1',
        templateSettings: {
          evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
          interpolate: /\{\{=([\s\S]+?)\}\}/g,
          encode: /\{\{!([\s\S]+?)\}\}/g,
          use: /\{\{#([\s\S]+?)\}\}/g,
          useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
          define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
          defineParams: /^\s*([\w$]+):([\s\S]+)/,
          conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
          iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
          varname: 'it',
          strip: true,
          append: true,
          selfcontained: false,
          doNotSkipEncoded: false
        },
        template: undefined,
        compile: undefined,
        log: true
      }, _globals;
      doT.encodeHTMLSource = function(doNotSkipEncoded) {
        var encodeHTMLRules = {
          '&': '&#38;',
          '<': '&#60;',
          '>': '&#62;',
          '"': '&#34;',
          '\'': '&#39;',
          '/': '&#47;'
        }, matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
        return function(code) {
          return code ? code.toString().replace(matchHTML, function(m) {
            return encodeHTMLRules[m] || m;
          }) : '';
        };
      };
      _globals = function() {
        return this || (0, eval)('this');
      }();
      if (typeof module !== 'undefined' && module.exports) {
        module.exports = doT;
      } else if (typeof define === 'function' && define.amd) {
        define(function() {
          return doT;
        });
      } else {
        _globals.doT = doT;
      }
      var startend = {
        append: {
          start: '\'+(',
          end: ')+\'',
          startencode: '\'+encodeHTML('
        },
        split: {
          start: '\';out+=(',
          end: ');out+=\'',
          startencode: '\';out+=encodeHTML('
        }
      }, skip = /$^/;
      function resolveDefs(c, block, def) {
        return (typeof block === 'string' ? block : block.toString()).replace(c.define || skip, function(m, code, assign, value) {
          if (code.indexOf('def.') === 0) {
            code = code.substring(4);
          }
          if (!(code in def)) {
            if (assign === ':') {
              if (c.defineParams) {
                value.replace(c.defineParams, function(m, param, v) {
                  def[code] = {
                    arg: param,
                    text: v
                  };
                });
              }
              if (!(code in def)) {
                def[code] = value;
              }
            } else {
              new Function('def', 'def[\'' + code + '\']=' + value)(def);
            }
          }
          return '';
        }).replace(c.use || skip, function(m, code) {
          if (c.useParams) {
            code = code.replace(c.useParams, function(m, s, d, param) {
              if (def[d] && def[d].arg && param) {
                var rw = (d + ':' + param).replace(/'|\\/g, '_');
                def.__exp = def.__exp || {};
                def.__exp[rw] = def[d].text.replace(new RegExp('(^|[^\\w$])' + def[d].arg + '([^\\w$])', 'g'), '$1' + param + '$2');
                return s + 'def.__exp[\'' + rw + '\']';
              }
            });
          }
          var v = new Function('def', 'return ' + code)(def);
          return v ? resolveDefs(c, v, def) : v;
        });
      }
      function unescape(code) {
        return code.replace(/\\('|\\)/g, '$1').replace(/[\r\t\n]/g, ' ');
      }
      doT.template = function(tmpl, c, def) {
        c = c || doT.templateSettings;
        var cse = c.append ? startend.append : startend.split, needhtmlencode, sid = 0, indv, str = c.use || c.define ? resolveDefs(c, tmpl, def || {}) : tmpl;
        str = ('var out=\'' + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, ' ').replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, '') : str).replace(/'|\\/g, '\\$&').replace(c.interpolate || skip, function(m, code) {
          return cse.start + unescape(code) + cse.end;
        }).replace(c.encode || skip, function(m, code) {
          needhtmlencode = true;
          return cse.startencode + unescape(code) + cse.end;
        }).replace(c.conditional || skip, function(m, elsecase, code) {
          return elsecase ? code ? '\';}else if(' + unescape(code) + '){out+=\'' : '\';}else{out+=\'' : code ? '\';if(' + unescape(code) + '){out+=\'' : '\';}out+=\'';
        }).replace(c.iterate || skip, function(m, iterate, vname, iname) {
          if (!iterate) {
            return '\';} } out+=\'';
          }
          sid += 1;
          indv = iname || 'i' + sid;
          iterate = unescape(iterate);
          return '\';var arr' + sid + '=' + iterate + ';if(arr' + sid + '){var ' + vname + ',' + indv + '=-1,l' + sid + '=arr' + sid + '.length-1;while(' + indv + '<l' + sid + '){' + vname + '=arr' + sid + '[' + indv + '+=1];out+=\'';
        }).replace(c.evaluate || skip, function(m, code) {
          return '\';' + unescape(code) + 'out+=\'';
        }) + '\';return out;').replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r').replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, '');
        if (needhtmlencode) {
          if (!c.selfcontained && _globals && !_globals._encodeHTML) {
            _globals._encodeHTML = doT.encodeHTMLSource(c.doNotSkipEncoded);
          }
          str = 'var encodeHTML = typeof _encodeHTML !== \'undefined\' ? _encodeHTML : (' + doT.encodeHTMLSource.toString() + '(' + (c.doNotSkipEncoded || '') + '));' + str;
        }
        try {
          return new Function(c.varname, str);
        } catch (e) {
          if (typeof console !== 'undefined') {
            console.log('Could not create a template function: ' + str);
          }
          throw e;
        }
      };
      doT.compile = function(tmpl, def) {
        return doT.template(tmpl, null, def);
      };
    })();
    var lib = global['doT'];
    delete global['doT'];
    if (__old_global__) {
      global['doT'] = __old_global__;
    }
    return lib;
  }();
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  axe.log = function() {
    'use strict';
    if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object' && console.log) {
      Function.prototype.apply.call(console.log, console, arguments);
    }
  };
  'use strict';
  function cleanupPlugins(resolve, reject) {
    'use strict';
    resolve = resolve || function() {};
    reject = reject || axe.log;
    if (!axe._audit) {
      throw new Error('No audit configured');
    }
    var q = axe.utils.queue();
    var cleanupErrors = [];
    Object.keys(axe.plugins).forEach(function(key) {
      q.defer(function(res) {
        var rej = function rej(err) {
          cleanupErrors.push(err);
          res();
        };
        try {
          axe.plugins[key].cleanup(res, rej);
        } catch (err) {
          rej(err);
        }
      });
    });
    var flattenedTree = axe.utils.getFlattenedTree(document.body);
    axe.utils.querySelectorAll(flattenedTree, 'iframe, frame').forEach(function(node) {
      q.defer(function(res, rej) {
        return axe.utils.sendCommandToFrame(node.actualNode, {
          command: 'cleanup-plugin'
        }, res, rej);
      });
    });
    q.then(function(results) {
      if (cleanupErrors.length === 0) {
        resolve(results);
      } else {
        reject(cleanupErrors);
      }
    }).catch(reject);
  }
  axe.cleanup = cleanupPlugins;
  'use strict';
  function configureChecksRulesAndBranding(spec) {
    'use strict';
    var audit;
    audit = axe._audit;
    if (!audit) {
      throw new Error('No audit configured');
    }
    if (spec.reporter && (typeof spec.reporter === 'function' || reporters[spec.reporter])) {
      audit.reporter = spec.reporter;
    }
    if (spec.checks) {
      spec.checks.forEach(function(check) {
        audit.addCheck(check);
      });
    }
    var modifiedRules = [];
    if (spec.rules) {
      spec.rules.forEach(function(rule) {
        modifiedRules.push(rule.id);
        audit.addRule(rule);
      });
    }
    if (spec.disableOtherRules) {
      audit.rules.forEach(function(rule) {
        if (modifiedRules.includes(rule.id) === false) {
          rule.enabled = false;
        }
      });
    }
    if (typeof spec.branding !== 'undefined') {
      audit.setBranding(spec.branding);
    } else {
      audit._constructHelpUrls();
    }
    if (spec.tagExclude) {
      audit.tagExclude = spec.tagExclude;
    }
    if (spec.locale) {
      audit.applyLocale(spec.locale);
    }
  }
  axe.configure = configureChecksRulesAndBranding;
  'use strict';
  axe.getRules = function(tags) {
    'use strict';
    tags = tags || [];
    var matchingRules = !tags.length ? axe._audit.rules : axe._audit.rules.filter(function(item) {
      return !!tags.filter(function(tag) {
        return item.tags.indexOf(tag) !== -1;
      }).length;
    });
    var ruleData = axe._audit.data.rules || {};
    return matchingRules.map(function(matchingRule) {
      var rd = ruleData[matchingRule.id] || {};
      return {
        ruleId: matchingRule.id,
        description: rd.description,
        help: rd.help,
        helpUrl: rd.helpUrl,
        tags: matchingRule.tags
      };
    });
  };
  'use strict';
  function runCommand(data, keepalive, callback) {
    'use strict';
    var resolve = callback;
    var reject = function reject(err) {
      if (err instanceof Error === false) {
        err = new Error(err);
      }
      callback(err);
    };
    var context = data && data.context || {};
    if (context.hasOwnProperty('include') && !context.include.length) {
      context.include = [ document ];
    }
    var options = data && data.options || {};
    switch (data.command) {
     case 'rules':
      return runRules(context, options, function(results, cleanup) {
        resolve(results);
        cleanup();
      }, reject);

     case 'cleanup-plugin':
      return cleanupPlugins(resolve, reject);

     default:
      if (axe._audit && axe._audit.commands && axe._audit.commands[data.command]) {
        return axe._audit.commands[data.command](data, callback);
      }
    }
  }
  axe._load = function(audit) {
    'use strict';
    axe.utils.respondable.subscribe('axe.ping', function(data, keepalive, respond) {
      respond({
        axe: true
      });
    });
    axe.utils.respondable.subscribe('axe.start', runCommand);
    axe._audit = new Audit(audit);
  };
  'use strict';
  var axe = axe || {};
  axe.plugins = {};
  function Plugin(spec) {
    'use strict';
    this._run = spec.run;
    this._collect = spec.collect;
    this._registry = {};
    spec.commands.forEach(function(command) {
      axe._audit.registerCommand(command);
    });
  }
  Plugin.prototype.run = function() {
    'use strict';
    return this._run.apply(this, arguments);
  };
  Plugin.prototype.collect = function() {
    'use strict';
    return this._collect.apply(this, arguments);
  };
  Plugin.prototype.cleanup = function(done) {
    'use strict';
    var q = axe.utils.queue();
    var that = this;
    Object.keys(this._registry).forEach(function(key) {
      q.defer(function(done) {
        that._registry[key].cleanup(done);
      });
    });
    q.then(function() {
      done();
    });
  };
  Plugin.prototype.add = function(impl) {
    'use strict';
    this._registry[impl.id] = impl;
  };
  axe.registerPlugin = function(plugin) {
    'use strict';
    axe.plugins[plugin.id] = new Plugin(plugin);
  };
  'use strict';
  var reporters = {};
  var defaultReporter;
  axe.getReporter = function(reporter) {
    'use strict';
    if (typeof reporter === 'string' && reporters[reporter]) {
      return reporters[reporter];
    }
    if (typeof reporter === 'function') {
      return reporter;
    }
    return defaultReporter;
  };
  axe.addReporter = function registerReporter(name, cb, isDefault) {
    'use strict';
    reporters[name] = cb;
    if (isDefault) {
      defaultReporter = cb;
    }
  };
  'use strict';
  function resetConfiguration() {
    'use strict';
    var audit = axe._audit;
    if (!audit) {
      throw new Error('No audit configured');
    }
    audit.resetRulesAndChecks();
  }
  axe.reset = resetConfiguration;
  'use strict';
  function cleanup() {
    axe._tree = undefined;
    axe._selectorData = undefined;
  }
  function runRules(context, options, resolve, reject) {
    'use strict';
    try {
      context = new Context(context);
      axe._tree = context.flatTree;
      axe._selectorData = axe.utils.getSelectorData(context.flatTree);
    } catch (e) {
      cleanup();
      return reject(e);
    }
    var q = axe.utils.queue();
    var audit = axe._audit;
    if (options.performanceTimer) {
      axe.utils.performanceTimer.auditStart();
    }
    if (context.frames.length && options.iframes !== false) {
      q.defer(function(res, rej) {
        axe.utils.collectResultsFromFrames(context, options, 'rules', null, res, rej);
      });
    }
    var scrollState = void 0;
    q.defer(function(res, rej) {
      if (options.restoreScroll) {
        scrollState = axe.utils.getScrollState();
      }
      audit.run(context, options, res, rej);
    });
    q.then(function(data) {
      try {
        if (scrollState) {
          axe.utils.setScrollState(scrollState);
        }
        if (options.performanceTimer) {
          axe.utils.performanceTimer.auditEnd();
        }
        var results = axe.utils.mergeResults(data.map(function(results) {
          return {
            results: results
          };
        }));
        if (context.initiator) {
          results = audit.after(results, options);
          results.forEach(axe.utils.publishMetaData);
          results = results.map(axe.utils.finalizeRuleResult);
        }
        try {
          resolve(results, cleanup);
        } catch (e) {
          cleanup();
          axe.log(e);
        }
      } catch (e) {
        cleanup();
        reject(e);
      }
    }).catch(function(e) {
      cleanup();
      reject(e);
    });
  }
  axe._runRules = runRules;
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  function isContext(potential) {
    'use strict';
    switch (true) {
     case typeof potential === 'string':
     case Array.isArray(potential):
     case Node && potential instanceof Node:
     case NodeList && potential instanceof NodeList:
      return true;

     case (typeof potential === 'undefined' ? 'undefined' : _typeof(potential)) !== 'object':
      return false;

     case potential.include !== undefined:
     case potential.exclude !== undefined:
     case typeof potential.length === 'number':
      return true;

     default:
      return false;
    }
  }
  var noop = function noop() {};
  function normalizeRunParams(context, options, callback) {
    'use strict';
    var typeErr = new TypeError('axe.run arguments are invalid');
    if (!isContext(context)) {
      if (callback !== undefined) {
        throw typeErr;
      }
      callback = options;
      options = context;
      context = document;
    }
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
      if (callback !== undefined) {
        throw typeErr;
      }
      callback = options;
      options = {};
    }
    if (typeof callback !== 'function' && callback !== undefined) {
      throw typeErr;
    }
    return {
      context: context,
      options: options,
      callback: callback || noop
    };
  }
  axe.run = function(context, options, callback) {
    'use strict';
    if (!axe._audit) {
      throw new Error('No audit configured');
    }
    var args = normalizeRunParams(context, options, callback);
    context = args.context;
    options = args.options;
    callback = args.callback;
    options.reporter = options.reporter || axe._audit.reporter || 'v1';
    if (options.performanceTimer) {
      axe.utils.performanceTimer.start();
    }
    var p = void 0;
    var reject = noop;
    var resolve = noop;
    if (typeof Promise === 'function' && callback === noop) {
      p = new Promise(function(_resolve, _reject) {
        reject = _reject;
        resolve = _resolve;
      });
    }
    axe._runRules(context, options, function(rawResults, cleanup) {
      var respond = function respond(results) {
        cleanup();
        try {
          callback(null, results);
        } catch (e) {
          axe.log(e);
        }
        resolve(results);
      };
      if (options.performanceTimer) {
        axe.utils.performanceTimer.end();
      }
      try {
        var reporter = axe.getReporter(options.reporter);
        var results = reporter(rawResults, options, respond);
        if (results !== undefined) {
          respond(results);
        }
      } catch (err) {
        cleanup();
        callback(err);
        reject(err);
      }
    }, function(err) {
      callback(err);
      reject(err);
    });
    return p;
  };
  'use strict';
  helpers.failureSummary = function failureSummary(nodeData) {
    'use strict';
    var failingChecks = {};
    failingChecks.none = nodeData.none.concat(nodeData.all);
    failingChecks.any = nodeData.any;
    return Object.keys(failingChecks).map(function(key) {
      if (!failingChecks[key].length) {
        return;
      }
      var sum = axe._audit.data.failureSummaries[key];
      if (sum && typeof sum.failureMessage === 'function') {
        return sum.failureMessage(failingChecks[key].map(function(check) {
          return check.message || '';
        }));
      }
    }).filter(function(i) {
      return i !== undefined;
    }).join('\n\n');
  };
  'use strict';
  helpers.incompleteFallbackMessage = function incompleteFallbackMessage() {
    'use strict';
    return axe._audit.data.incompleteFallbackMessage();
  };
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  function normalizeRelatedNodes(node, options) {
    'use strict';
    [ 'any', 'all', 'none' ].forEach(function(type) {
      if (!Array.isArray(node[type])) {
        return;
      }
      node[type].filter(function(checkRes) {
        return Array.isArray(checkRes.relatedNodes);
      }).forEach(function(checkRes) {
        checkRes.relatedNodes = checkRes.relatedNodes.map(function(relatedNode) {
          var res = {
            html: relatedNode.source
          };
          if (options.elementRef && !relatedNode.fromFrame) {
            res.element = relatedNode.element;
          }
          if (options.selectors !== false || relatedNode.fromFrame) {
            res.target = relatedNode.selector;
          }
          if (options.xpath) {
            res.xpath = relatedNode.xpath;
          }
          return res;
        });
      });
    });
  }
  var resultKeys = axe.constants.resultGroups;
  helpers.processAggregate = function(results, options) {
    var resultObject = axe.utils.aggregateResult(results);
    resultObject.timestamp = new Date().toISOString();
    resultObject.url = window.location.href;
    resultKeys.forEach(function(key) {
      if (options.resultTypes && !options.resultTypes.includes(key)) {
        (resultObject[key] || []).forEach(function(ruleResult) {
          if (Array.isArray(ruleResult.nodes) && ruleResult.nodes.length > 0) {
            ruleResult.nodes = [ ruleResult.nodes[0] ];
          }
        });
      }
      resultObject[key] = (resultObject[key] || []).map(function(ruleResult) {
        ruleResult = Object.assign({}, ruleResult);
        if (Array.isArray(ruleResult.nodes) && ruleResult.nodes.length > 0) {
          ruleResult.nodes = ruleResult.nodes.map(function(subResult) {
            if (_typeof(subResult.node) === 'object') {
              subResult.html = subResult.node.source;
              if (options.elementRef && !subResult.node.fromFrame) {
                subResult.element = subResult.node.element;
              }
              if (options.selectors !== false || subResult.node.fromFrame) {
                subResult.target = subResult.node.selector;
              }
              if (options.xpath) {
                subResult.xpath = subResult.node.xpath;
              }
            }
            delete subResult.result;
            delete subResult.node;
            normalizeRelatedNodes(subResult, options);
            return subResult;
          });
        }
        resultKeys.forEach(function(key) {
          return delete ruleResult[key];
        });
        delete ruleResult.pageLevel;
        delete ruleResult.result;
        return ruleResult;
      });
    });
    return resultObject;
  };
  'use strict';
  axe.addReporter('na', function(results, options, callback) {
    'use strict';
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    var out = helpers.processAggregate(results, options);
    callback({
      violations: out.violations,
      passes: out.passes,
      incomplete: out.incomplete,
      inapplicable: out.inapplicable,
      timestamp: out.timestamp,
      url: out.url
    });
  });
  'use strict';
  axe.addReporter('no-passes', function(results, options, callback) {
    'use strict';
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options.resultTypes = [ 'violations' ];
    var out = helpers.processAggregate(results, options);
    callback({
      violations: out.violations,
      timestamp: out.timestamp,
      url: out.url
    });
  });
  'use strict';
  axe.addReporter('raw', function(results, options, callback) {
    'use strict';
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    callback(results);
  });
  'use strict';
  axe.addReporter('v1', function(results, options, callback) {
    'use strict';
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    var out = helpers.processAggregate(results, options);
    out.violations.forEach(function(result) {
      return result.nodes.forEach(function(nodeResult) {
        nodeResult.failureSummary = helpers.failureSummary(nodeResult);
      });
    });
    callback({
      violations: out.violations,
      passes: out.passes,
      incomplete: out.incomplete,
      inapplicable: out.inapplicable,
      timestamp: out.timestamp,
      url: out.url
    });
  });
  'use strict';
  axe.addReporter('v2', function(results, options, callback) {
    'use strict';
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    var out = helpers.processAggregate(results, options);
    callback({
      violations: out.violations,
      passes: out.passes,
      incomplete: out.incomplete,
      inapplicable: out.inapplicable,
      timestamp: out.timestamp,
      url: out.url
    });
  }, true);
  'use strict';
  axe.utils.aggregate = function(map, values, initial) {
    values = values.slice();
    if (initial) {
      values.push(initial);
    }
    var sorting = values.map(function(val) {
      return map.indexOf(val);
    }).sort();
    return map[sorting.pop()];
  };
  'use strict';
  var _axe$constants = axe.constants, CANTTELL_PRIO = _axe$constants.CANTTELL_PRIO, FAIL_PRIO = _axe$constants.FAIL_PRIO;
  var checkMap = [];
  checkMap[axe.constants.PASS_PRIO] = true;
  checkMap[axe.constants.CANTTELL_PRIO] = null;
  checkMap[axe.constants.FAIL_PRIO] = false;
  var checkTypes = [ 'any', 'all', 'none' ];
  function anyAllNone(obj, functor) {
    return checkTypes.reduce(function(out, type) {
      out[type] = (obj[type] || []).map(function(val) {
        return functor(val, type);
      });
      return out;
    }, {});
  }
  axe.utils.aggregateChecks = function(nodeResOriginal) {
    var nodeResult = Object.assign({}, nodeResOriginal);
    anyAllNone(nodeResult, function(check, type) {
      var i = typeof check.result === 'undefined' ? -1 : checkMap.indexOf(check.result);
      check.priority = i !== -1 ? i : axe.constants.CANTTELL_PRIO;
      if (type === 'none') {
        if (check.priority === axe.constants.PASS_PRIO) {
          check.priority = axe.constants.FAIL_PRIO;
        } else if (check.priority === axe.constants.FAIL_PRIO) {
          check.priority = axe.constants.PASS_PRIO;
        }
      }
    });
    var priorities = {
      all: nodeResult.all.reduce(function(a, b) {
        return Math.max(a, b.priority);
      }, 0),
      none: nodeResult.none.reduce(function(a, b) {
        return Math.max(a, b.priority);
      }, 0),
      any: nodeResult.any.reduce(function(a, b) {
        return Math.min(a, b.priority);
      }, 4) % 4
    };
    nodeResult.priority = Math.max(priorities.all, priorities.none, priorities.any);
    var impacts = [];
    checkTypes.forEach(function(type) {
      nodeResult[type] = nodeResult[type].filter(function(check) {
        return check.priority === nodeResult.priority && check.priority === priorities[type];
      });
      nodeResult[type].forEach(function(check) {
        return impacts.push(check.impact);
      });
    });
    if ([ CANTTELL_PRIO, FAIL_PRIO ].includes(nodeResult.priority)) {
      nodeResult.impact = axe.utils.aggregate(axe.constants.impact, impacts);
    } else {
      nodeResult.impact = null;
    }
    anyAllNone(nodeResult, function(c) {
      delete c.result;
      delete c.priority;
    });
    nodeResult.result = axe.constants.results[nodeResult.priority];
    delete nodeResult.priority;
    return nodeResult;
  };
  'use strict';
  (function() {
    axe.utils.aggregateNodeResults = function(nodeResults) {
      var ruleResult = {};
      nodeResults = nodeResults.map(function(nodeResult) {
        if (nodeResult.any && nodeResult.all && nodeResult.none) {
          return axe.utils.aggregateChecks(nodeResult);
        } else if (Array.isArray(nodeResult.node)) {
          return axe.utils.finalizeRuleResult(nodeResult);
        } else {
          throw new TypeError('Invalid Result type');
        }
      });
      if (nodeResults && nodeResults.length) {
        var resultList = nodeResults.map(function(node) {
          return node.result;
        });
        ruleResult.result = axe.utils.aggregate(axe.constants.results, resultList, ruleResult.result);
      } else {
        ruleResult.result = 'inapplicable';
      }
      axe.constants.resultGroups.forEach(function(group) {
        return ruleResult[group] = [];
      });
      nodeResults.forEach(function(nodeResult) {
        var groupName = axe.constants.resultGroupMap[nodeResult.result];
        ruleResult[groupName].push(nodeResult);
      });
      var impactGroup = axe.constants.FAIL_GROUP;
      if (ruleResult[impactGroup].length === 0) {
        impactGroup = axe.constants.CANTTELL_GROUP;
      }
      if (ruleResult[impactGroup].length > 0) {
        var impactList = ruleResult[impactGroup].map(function(failure) {
          return failure.impact;
        });
        ruleResult.impact = axe.utils.aggregate(axe.constants.impact, impactList) || null;
      } else {
        ruleResult.impact = null;
      }
      return ruleResult;
    };
  })();
  'use strict';
  function copyToGroup(resultObject, subResult, group) {
    var resultCopy = Object.assign({}, subResult);
    resultCopy.nodes = (resultCopy[group] || []).concat();
    axe.constants.resultGroups.forEach(function(group) {
      delete resultCopy[group];
    });
    resultObject[group].push(resultCopy);
  }
  axe.utils.aggregateResult = function(results) {
    var resultObject = {};
    axe.constants.resultGroups.forEach(function(groupName) {
      return resultObject[groupName] = [];
    });
    results.forEach(function(subResult) {
      if (subResult.error) {
        copyToGroup(resultObject, subResult, axe.constants.CANTTELL_GROUP);
      } else if (subResult.result === axe.constants.NA) {
        copyToGroup(resultObject, subResult, axe.constants.NA_GROUP);
      } else {
        axe.constants.resultGroups.forEach(function(group) {
          if (Array.isArray(subResult[group]) && subResult[group].length > 0) {
            copyToGroup(resultObject, subResult, group);
          }
        });
      }
    });
    return resultObject;
  };
  'use strict';
  function areStylesSet(el, styles, stopAt) {
    'use strict';
    var styl = window.getComputedStyle(el, null);
    var set = false;
    if (!styl) {
      return false;
    }
    styles.forEach(function(att) {
      if (styl.getPropertyValue(att.property) === att.value) {
        set = true;
      }
    });
    if (set) {
      return true;
    }
    if (el.nodeName.toUpperCase() === stopAt.toUpperCase() || !el.parentNode) {
      return false;
    }
    return areStylesSet(el.parentNode, styles, stopAt);
  }
  axe.utils.areStylesSet = areStylesSet;
  'use strict';
  axe.utils.checkHelper = function checkHelper(checkResult, options, resolve, reject) {
    'use strict';
    return {
      isAsync: false,
      async: function async() {
        this.isAsync = true;
        return function(result) {
          if (result instanceof Error === false) {
            checkResult.result = result;
            resolve(checkResult);
          } else {
            reject(result);
          }
        };
      },
      data: function data(_data) {
        checkResult.data = _data;
      },
      relatedNodes: function relatedNodes(nodes) {
        nodes = nodes instanceof Node ? [ nodes ] : axe.utils.toArray(nodes);
        checkResult.relatedNodes = nodes.map(function(element) {
          return new axe.utils.DqElement(element, options);
        });
      }
    };
  };
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  axe.utils.clone = function(obj) {
    'use strict';
    var index, length, out = obj;
    if (obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
      if (Array.isArray(obj)) {
        out = [];
        for (index = 0, length = obj.length; index < length; index++) {
          out[index] = axe.utils.clone(obj[index]);
        }
      } else {
        out = {};
        for (index in obj) {
          out[index] = axe.utils.clone(obj[index]);
        }
      }
    }
    return out;
  };
  'use strict';
  function err(message, node) {
    'use strict';
    var selector;
    if (axe._tree) {
      selector = axe.utils.getSelector(node);
    }
    return new Error(message + ': ' + (selector || node));
  }
  axe.utils.sendCommandToFrame = function(node, parameters, resolve, reject) {
    'use strict';
    var win = node.contentWindow;
    if (!win) {
      axe.log('Frame does not have a content window', node);
      resolve(null);
      return;
    }
    var timeout = setTimeout(function() {
      timeout = setTimeout(function() {
        if (!parameters.debug) {
          resolve(null);
        } else {
          reject(err('No response from frame', node));
        }
      }, 0);
    }, 500);
    axe.utils.respondable(win, 'axe.ping', null, undefined, function() {
      clearTimeout(timeout);
      var frameWaitTime = parameters.options && parameters.options.frameWaitTime || 6e4;
      timeout = setTimeout(function() {
        reject(err('Axe in frame timed out', node));
      }, frameWaitTime);
      axe.utils.respondable(win, 'axe.start', parameters, undefined, function(data) {
        clearTimeout(timeout);
        if (data instanceof Error === false) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  };
  function collectResultsFromFrames(context, options, command, parameter, resolve, reject) {
    'use strict';
    var q = axe.utils.queue();
    var frames = context.frames;
    frames.forEach(function(frame) {
      var params = {
        options: options,
        command: command,
        parameter: parameter,
        context: {
          initiator: false,
          page: context.page,
          include: frame.include || [],
          exclude: frame.exclude || []
        }
      };
      q.defer(function(res, rej) {
        var node = frame.node;
        axe.utils.sendCommandToFrame(node, params, function(data) {
          if (data) {
            return res({
              results: data,
              frameElement: node,
              frame: axe.utils.getSelector(node)
            });
          }
          res(null);
        }, rej);
      });
    });
    q.then(function(data) {
      resolve(axe.utils.mergeResults(data, options));
    }).catch(reject);
  }
  axe.utils.collectResultsFromFrames = collectResultsFromFrames;
  'use strict';
  axe.utils.contains = function(node, otherNode) {
    'use strict';
    function containsShadowChild(node, otherNode) {
      if (node.shadowId === otherNode.shadowId) {
        return true;
      }
      return !!node.children.find(function(child) {
        return containsShadowChild(child, otherNode);
      });
    }
    if (node.shadowId || otherNode.shadowId) {
      return containsShadowChild(node, otherNode);
    }
    if (typeof node.actualNode.contains === 'function') {
      return node.actualNode.contains(otherNode.actualNode);
    }
    return !!(node.actualNode.compareDocumentPosition(otherNode.actualNode) & 16);
  };
  'use strict';
  (function(axe) {
    function CssSelectorParser() {
      this.pseudos = {};
      this.attrEqualityMods = {};
      this.ruleNestingOperators = {};
      this.substitutesEnabled = false;
    }
    CssSelectorParser.prototype.registerSelectorPseudos = function(name) {
      for (var j = 0, len = arguments.length; j < len; j++) {
        name = arguments[j];
        this.pseudos[name] = 'selector';
      }
      return this;
    };
    CssSelectorParser.prototype.unregisterSelectorPseudos = function(name) {
      for (var j = 0, len = arguments.length; j < len; j++) {
        name = arguments[j];
        delete this.pseudos[name];
      }
      return this;
    };
    CssSelectorParser.prototype.registerNumericPseudos = function(name) {
      for (var j = 0, len = arguments.length; j < len; j++) {
        name = arguments[j];
        this.pseudos[name] = 'numeric';
      }
      return this;
    };
    CssSelectorParser.prototype.unregisterNumericPseudos = function(name) {
      for (var j = 0, len = arguments.length; j < len; j++) {
        name = arguments[j];
        delete this.pseudos[name];
      }
      return this;
    };
    CssSelectorParser.prototype.registerNestingOperators = function(operator) {
      for (var j = 0, len = arguments.length; j < len; j++) {
        operator = arguments[j];
        this.ruleNestingOperators[operator] = true;
      }
      return this;
    };
    CssSelectorParser.prototype.unregisterNestingOperators = function(operator) {
      for (var j = 0, len = arguments.length; j < len; j++) {
        operator = arguments[j];
        delete this.ruleNestingOperators[operator];
      }
      return this;
    };
    CssSelectorParser.prototype.registerAttrEqualityMods = function(mod) {
      for (var j = 0, len = arguments.length; j < len; j++) {
        mod = arguments[j];
        this.attrEqualityMods[mod] = true;
      }
      return this;
    };
    CssSelectorParser.prototype.unregisterAttrEqualityMods = function(mod) {
      for (var j = 0, len = arguments.length; j < len; j++) {
        mod = arguments[j];
        delete this.attrEqualityMods[mod];
      }
      return this;
    };
    CssSelectorParser.prototype.enableSubstitutes = function() {
      this.substitutesEnabled = true;
      return this;
    };
    CssSelectorParser.prototype.disableSubstitutes = function() {
      this.substitutesEnabled = false;
      return this;
    };
    function isIdentStart(c) {
      return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c === '-' || c === '_';
    }
    function isIdent(c) {
      return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9' || c === '-' || c === '_';
    }
    function isHex(c) {
      return c >= 'a' && c <= 'f' || c >= 'A' && c <= 'F' || c >= '0' && c <= '9';
    }
    function isDecimal(c) {
      return c >= '0' && c <= '9';
    }
    function isAttrMatchOperator(chr) {
      return chr === '=' || chr === '^' || chr === '$' || chr === '*' || chr === '~';
    }
    var identSpecialChars = {
      '!': true,
      '"': true,
      '#': true,
      $: true,
      '%': true,
      '&': true,
      '\'': true,
      '(': true,
      ')': true,
      '*': true,
      '+': true,
      ',': true,
      '.': true,
      '/': true,
      ';': true,
      '<': true,
      '=': true,
      '>': true,
      '?': true,
      '@': true,
      '[': true,
      '\\': true,
      ']': true,
      '^': true,
      '`': true,
      '{': true,
      '|': true,
      '}': true,
      '~': true
    };
    var strReplacementsRev = {
      '\n': '\\n',
      '\r': '\\r',
      '\t': '\\t',
      '\f': '\\f',
      '\v': '\\v'
    };
    var singleQuoteEscapeChars = {
      n: '\n',
      r: '\r',
      t: '\t',
      f: '\f',
      '\\': '\\',
      '\'': '\''
    };
    var doubleQuotesEscapeChars = {
      n: '\n',
      r: '\r',
      t: '\t',
      f: '\f',
      '\\': '\\',
      '"': '"'
    };
    function ParseContext(str, pos, pseudos, attrEqualityMods, ruleNestingOperators, substitutesEnabled) {
      var chr, getIdent, getStr, l, skipWhitespace;
      l = str.length;
      chr = null;
      getStr = function getStr(quote, escapeTable) {
        var esc, hex, result;
        result = '';
        pos++;
        chr = str.charAt(pos);
        while (pos < l) {
          if (chr === quote) {
            pos++;
            return result;
          } else if (chr === '\\') {
            pos++;
            chr = str.charAt(pos);
            if (chr === quote) {
              result += quote;
            } else if (esc = escapeTable[chr]) {
              result += esc;
            } else if (isHex(chr)) {
              hex = chr;
              pos++;
              chr = str.charAt(pos);
              while (isHex(chr)) {
                hex += chr;
                pos++;
                chr = str.charAt(pos);
              }
              if (chr === ' ') {
                pos++;
                chr = str.charAt(pos);
              }
              result += String.fromCharCode(parseInt(hex, 16));
              continue;
            } else {
              result += chr;
            }
          } else {
            result += chr;
          }
          pos++;
          chr = str.charAt(pos);
        }
        return result;
      };
      getIdent = function getIdent() {
        var result = '';
        chr = str.charAt(pos);
        while (pos < l) {
          if (isIdent(chr)) {
            result += chr;
          } else if (chr === '\\') {
            pos++;
            if (pos >= l) {
              throw Error('Expected symbol but end of file reached.');
            }
            chr = str.charAt(pos);
            if (identSpecialChars[chr]) {
              result += chr;
            } else if (isHex(chr)) {
              var hex = chr;
              pos++;
              chr = str.charAt(pos);
              while (isHex(chr)) {
                hex += chr;
                pos++;
                chr = str.charAt(pos);
              }
              if (chr === ' ') {
                pos++;
                chr = str.charAt(pos);
              }
              result += String.fromCharCode(parseInt(hex, 16));
              continue;
            } else {
              result += chr;
            }
          } else {
            return result;
          }
          pos++;
          chr = str.charAt(pos);
        }
        return result;
      };
      skipWhitespace = function skipWhitespace() {
        chr = str.charAt(pos);
        var result = false;
        while (chr === ' ' || chr === '\t' || chr === '\n' || chr === '\r' || chr === '\f') {
          result = true;
          pos++;
          chr = str.charAt(pos);
        }
        return result;
      };
      this.parse = function() {
        var res = this.parseSelector();
        if (pos < l) {
          throw Error('Rule expected but "' + str.charAt(pos) + '" found.');
        }
        return res;
      };
      this.parseSelector = function() {
        var res;
        var selector = res = this.parseSingleSelector();
        chr = str.charAt(pos);
        while (chr === ',') {
          pos++;
          skipWhitespace();
          if (res.type !== 'selectors') {
            res = {
              type: 'selectors',
              selectors: [ selector ]
            };
          }
          selector = this.parseSingleSelector();
          if (!selector) {
            throw Error('Rule expected after ",".');
          }
          res.selectors.push(selector);
        }
        return res;
      };
      this.parseSingleSelector = function() {
        skipWhitespace();
        var selector = {
          type: 'ruleSet'
        };
        var rule = this.parseRule();
        if (!rule) {
          return null;
        }
        var currentRule = selector;
        while (rule) {
          rule.type = 'rule';
          currentRule.rule = rule;
          currentRule = rule;
          skipWhitespace();
          chr = str.charAt(pos);
          if (pos >= l || chr === ',' || chr === ')') {
            break;
          }
          if (ruleNestingOperators[chr]) {
            var op = chr;
            pos++;
            skipWhitespace();
            rule = this.parseRule();
            if (!rule) {
              throw Error('Rule expected after "' + op + '".');
            }
            rule.nestingOperator = op;
          } else {
            rule = this.parseRule();
            if (rule) {
              rule.nestingOperator = null;
            }
          }
        }
        return selector;
      };
      this.parseRule = function() {
        var rule = null;
        while (pos < l) {
          chr = str.charAt(pos);
          if (chr === '*') {
            pos++;
            (rule = rule || {}).tagName = '*';
          } else if (isIdentStart(chr) || chr === '\\') {
            (rule = rule || {}).tagName = getIdent();
          } else if (chr === '.') {
            pos++;
            rule = rule || {};
            (rule.classNames = rule.classNames || []).push(getIdent());
          } else if (chr === '#') {
            pos++;
            (rule = rule || {}).id = getIdent();
          } else if (chr === '[') {
            pos++;
            skipWhitespace();
            var attr = {
              name: getIdent()
            };
            skipWhitespace();
            if (chr === ']') {
              pos++;
            } else {
              var operator = '';
              if (attrEqualityMods[chr]) {
                operator = chr;
                pos++;
                chr = str.charAt(pos);
              }
              if (pos >= l) {
                throw Error('Expected "=" but end of file reached.');
              }
              if (chr !== '=') {
                throw Error('Expected "=" but "' + chr + '" found.');
              }
              attr.operator = operator + '=';
              pos++;
              skipWhitespace();
              var attrValue = '';
              attr.valueType = 'string';
              if (chr === '"') {
                attrValue = getStr('"', doubleQuotesEscapeChars);
              } else if (chr === '\'') {
                attrValue = getStr('\'', singleQuoteEscapeChars);
              } else if (substitutesEnabled && chr === '$') {
                pos++;
                attrValue = getIdent();
                attr.valueType = 'substitute';
              } else {
                while (pos < l) {
                  if (chr === ']') {
                    break;
                  }
                  attrValue += chr;
                  pos++;
                  chr = str.charAt(pos);
                }
                attrValue = attrValue.trim();
              }
              skipWhitespace();
              if (pos >= l) {
                throw Error('Expected "]" but end of file reached.');
              }
              if (chr !== ']') {
                throw Error('Expected "]" but "' + chr + '" found.');
              }
              pos++;
              attr.value = attrValue;
            }
            rule = rule || {};
            (rule.attrs = rule.attrs || []).push(attr);
          } else if (chr === ':') {
            pos++;
            var pseudoName = getIdent();
            var pseudo = {
              name: pseudoName
            };
            if (chr === '(') {
              pos++;
              var value = '';
              skipWhitespace();
              if (pseudos[pseudoName] === 'selector') {
                pseudo.valueType = 'selector';
                value = this.parseSelector();
              } else {
                pseudo.valueType = pseudos[pseudoName] || 'string';
                if (chr === '"') {
                  value = getStr('"', doubleQuotesEscapeChars);
                } else if (chr === '\'') {
                  value = getStr('\'', singleQuoteEscapeChars);
                } else if (substitutesEnabled && chr === '$') {
                  pos++;
                  value = getIdent();
                  pseudo.valueType = 'substitute';
                } else {
                  while (pos < l) {
                    if (chr === ')') {
                      break;
                    }
                    value += chr;
                    pos++;
                    chr = str.charAt(pos);
                  }
                  value = value.trim();
                }
                skipWhitespace();
              }
              if (pos >= l) {
                throw Error('Expected ")" but end of file reached.');
              }
              if (chr !== ')') {
                throw Error('Expected ")" but "' + chr + '" found.');
              }
              pos++;
              pseudo.value = value;
            }
            rule = rule || {};
            (rule.pseudos = rule.pseudos || []).push(pseudo);
          } else {
            break;
          }
        }
        return rule;
      };
      return this;
    }
    CssSelectorParser.prototype.parse = function(str) {
      var context = new ParseContext(str, 0, this.pseudos, this.attrEqualityMods, this.ruleNestingOperators, this.substitutesEnabled);
      return context.parse();
    };
    CssSelectorParser.prototype.escapeIdentifier = function(s) {
      var result = '';
      var i = 0;
      var len = s.length;
      while (i < len) {
        var chr = s.charAt(i);
        if (identSpecialChars[chr]) {
          result += '\\' + chr;
        } else {
          if (!(chr === '_' || chr === '-' || chr >= 'A' && chr <= 'Z' || chr >= 'a' && chr <= 'z' || i !== 0 && chr >= '0' && chr <= '9')) {
            var charCode = chr.charCodeAt(0);
            if ((charCode & 63488) === 55296) {
              var extraCharCode = s.charCodeAt(i++);
              if ((charCode & 64512) !== 55296 || (extraCharCode & 64512) !== 56320) {
                throw Error('UCS-2(decode): illegal sequence');
              }
              charCode = ((charCode & 1023) << 10) + (extraCharCode & 1023) + 65536;
            }
            result += '\\' + charCode.toString(16) + ' ';
          } else {
            result += chr;
          }
        }
        i++;
      }
      return result;
    };
    CssSelectorParser.prototype.escapeStr = function(s) {
      var result = '';
      var i = 0;
      var len = s.length;
      var chr, replacement;
      while (i < len) {
        chr = s.charAt(i);
        if (chr === '"') {
          chr = '\\"';
        } else if (chr === '\\') {
          chr = '\\\\';
        } else if (replacement = strReplacementsRev[chr]) {
          chr = replacement;
        }
        result += chr;
        i++;
      }
      return '"' + result + '"';
    };
    CssSelectorParser.prototype.render = function(path) {
      return this._renderEntity(path).trim();
    };
    CssSelectorParser.prototype._renderEntity = function(entity) {
      var currentEntity, parts, res;
      res = '';
      switch (entity.type) {
       case 'ruleSet':
        currentEntity = entity.rule;
        parts = [];
        while (currentEntity) {
          if (currentEntity.nestingOperator) {
            parts.push(currentEntity.nestingOperator);
          }
          parts.push(this._renderEntity(currentEntity));
          currentEntity = currentEntity.rule;
        }
        res = parts.join(' ');
        break;

       case 'selectors':
        res = entity.selectors.map(this._renderEntity, this).join(', ');
        break;

       case 'rule':
        if (entity.tagName) {
          if (entity.tagName === '*') {
            res = '*';
          } else {
            res = this.escapeIdentifier(entity.tagName);
          }
        }
        if (entity.id) {
          res += '#' + this.escapeIdentifier(entity.id);
        }
        if (entity.classNames) {
          res += entity.classNames.map(function(cn) {
            return '.' + this.escapeIdentifier(cn);
          }, this).join('');
        }
        if (entity.attrs) {
          res += entity.attrs.map(function(attr) {
            if (attr.operator) {
              if (attr.valueType === 'substitute') {
                return '[' + this.escapeIdentifier(attr.name) + attr.operator + '$' + attr.value + ']';
              } else {
                return '[' + this.escapeIdentifier(attr.name) + attr.operator + this.escapeStr(attr.value) + ']';
              }
            } else {
              return '[' + this.escapeIdentifier(attr.name) + ']';
            }
          }, this).join('');
        }
        if (entity.pseudos) {
          res += entity.pseudos.map(function(pseudo) {
            if (pseudo.valueType) {
              if (pseudo.valueType === 'selector') {
                return ':' + this.escapeIdentifier(pseudo.name) + '(' + this._renderEntity(pseudo.value) + ')';
              } else if (pseudo.valueType === 'substitute') {
                return ':' + this.escapeIdentifier(pseudo.name) + '($' + pseudo.value + ')';
              } else if (pseudo.valueType === 'numeric') {
                return ':' + this.escapeIdentifier(pseudo.name) + '(' + pseudo.value + ')';
              } else {
                return ':' + this.escapeIdentifier(pseudo.name) + '(' + this.escapeIdentifier(pseudo.value) + ')';
              }
            } else {
              return ':' + this.escapeIdentifier(pseudo.name);
            }
          }, this).join('');
        }
        break;

       default:
        throw Error('Unknown entity type: "' + entity.type(+'".'));
      }
      return res;
    };
    var parser = new CssSelectorParser();
    parser.registerNestingOperators('>');
    axe.utils.cssParser = parser;
  })(axe);
  'use strict';
  function truncate(str, maxLength) {
    maxLength = maxLength || 300;
    if (str.length > maxLength) {
      var index = str.indexOf('>');
      str = str.substring(0, index + 1);
    }
    return str;
  }
  function getSource(element) {
    var source = element.outerHTML;
    if (!source && typeof XMLSerializer === 'function') {
      source = new XMLSerializer().serializeToString(element);
    }
    return truncate(source || '');
  }
  function DqElement(element, options, spec) {
    this._fromFrame = !!spec;
    this.spec = spec || {};
    if (options && options.absolutePaths) {
      this._options = {
        toRoot: true
      };
    }
    this.source = this.spec.source !== undefined ? this.spec.source : getSource(element);
    this._element = element;
  }
  DqElement.prototype = {
    get selector() {
      return this.spec.selector || [ axe.utils.getSelector(this.element, this._options) ];
    },
    get xpath() {
      return this.spec.xpath || [ axe.utils.getXpath(this.element) ];
    },
    get element() {
      return this._element;
    },
    get fromFrame() {
      return this._fromFrame;
    },
    toJSON: function toJSON() {
      'use strict';
      return {
        selector: this.selector,
        source: this.source,
        xpath: this.xpath
      };
    }
  };
  DqElement.fromFrame = function(node, options, frame) {
    node.selector.unshift(frame.selector);
    node.xpath.unshift(frame.xpath);
    return new axe.utils.DqElement(frame.element, options, node);
  };
  axe.utils.DqElement = DqElement;
  'use strict';
  axe.utils.matchesSelector = function() {
    'use strict';
    var method;
    function getMethod(node) {
      var index, candidate, candidates = [ 'matches', 'matchesSelector', 'mozMatchesSelector', 'webkitMatchesSelector', 'msMatchesSelector' ], length = candidates.length;
      for (index = 0; index < length; index++) {
        candidate = candidates[index];
        if (node[candidate]) {
          return candidate;
        }
      }
    }
    return function(node, selector) {
      if (!method || !node[method]) {
        method = getMethod(node);
      }
      return node[method](selector);
    };
  }();
  'use strict';
  axe.utils.escapeSelector = function(value) {
    'use strict';
    var string = String(value);
    var length = string.length;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = string.charCodeAt(0);
    while (++index < length) {
      codeUnit = string.charCodeAt(index);
      if (codeUnit == 0) {
        result += '�';
        continue;
      }
      if (codeUnit >= 1 && codeUnit <= 31 || codeUnit == 127 || index == 0 && codeUnit >= 48 && codeUnit <= 57 || index == 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit == 45) {
        result += '\\' + codeUnit.toString(16) + ' ';
        continue;
      }
      if (index == 0 && length == 1 && codeUnit == 45) {
        result += '\\' + string.charAt(index);
        continue;
      }
      if (codeUnit >= 128 || codeUnit == 45 || codeUnit == 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
        result += string.charAt(index);
        continue;
      }
      result += '\\' + string.charAt(index);
    }
    return result;
  };
  'use strict';
  axe.utils.extendMetaData = function(to, from) {
    Object.assign(to, from);
    Object.keys(from).filter(function(prop) {
      return typeof from[prop] === 'function';
    }).forEach(function(prop) {
      to[prop] = null;
      try {
        to[prop] = from[prop](to);
      } catch (e) {}
    });
  };
  'use strict';
  axe.utils.finalizeRuleResult = function(ruleResult) {
    Object.assign(ruleResult, axe.utils.aggregateNodeResults(ruleResult.nodes));
    delete ruleResult.nodes;
    return ruleResult;
  };
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  axe.utils.findBy = function(array, key, value) {
    if (Array.isArray(array)) {
      return array.find(function(obj) {
        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj[key] === value;
      });
    }
  };
  'use strict';
  var axe = axe || {
    utils: {}
  };
  function virtualDOMfromNode(node, shadowId) {
    return {
      shadowId: shadowId,
      children: [],
      actualNode: node
    };
  }
  function getSlotChildren(node) {
    var retVal = [];
    node = node.firstChild;
    while (node) {
      retVal.push(node);
      node = node.nextSibling;
    }
    return retVal;
  }
  axe.utils.getFlattenedTree = function(node, shadowId) {
    var retVal, realArray, nodeName;
    function reduceShadowDOM(res, child) {
      var replacements = axe.utils.getFlattenedTree(child, shadowId);
      if (replacements) {
        res = res.concat(replacements);
      }
      return res;
    }
    if (node.documentElement) {
      node = node.documentElement;
    }
    nodeName = node.nodeName.toLowerCase();
    if (axe.utils.isShadowRoot(node)) {
      retVal = virtualDOMfromNode(node, shadowId);
      shadowId = 'a' + Math.random().toString().substring(2);
      realArray = Array.from(node.shadowRoot.childNodes);
      retVal.children = realArray.reduce(reduceShadowDOM, []);
      return [ retVal ];
    } else {
      if (nodeName === 'content') {
        realArray = Array.from(node.getDistributedNodes());
        return realArray.reduce(reduceShadowDOM, []);
      } else if (nodeName === 'slot' && typeof node.assignedNodes === 'function') {
        realArray = Array.from(node.assignedNodes());
        if (!realArray.length) {
          realArray = getSlotChildren(node);
        }
        var styl = window.getComputedStyle(node);
        if (false && styl.display !== 'contents') {
          retVal = virtualDOMfromNode(node, shadowId);
          retVal.children = realArray.reduce(reduceShadowDOM, []);
          return [ retVal ];
        } else {
          return realArray.reduce(reduceShadowDOM, []);
        }
      } else {
        if (node.nodeType === 1) {
          retVal = virtualDOMfromNode(node, shadowId);
          realArray = Array.from(node.childNodes);
          retVal.children = realArray.reduce(reduceShadowDOM, []);
          return [ retVal ];
        } else if (node.nodeType === 3) {
          return [ virtualDOMfromNode(node) ];
        }
        return undefined;
      }
    }
  };
  axe.utils.getNodeFromTree = function(vNode, node) {
    var found;
    if (vNode.actualNode === node) {
      return vNode;
    }
    vNode.children.forEach(function(candidate) {
      var retVal;
      if (candidate.actualNode === node) {
        found = candidate;
      } else {
        retVal = axe.utils.getNodeFromTree(candidate, node);
        if (retVal) {
          found = retVal;
        }
      }
    });
    return found;
  };
  'use strict';
  axe.utils.getAllChecks = function getAllChecks(object) {
    'use strict';
    var result = [];
    return result.concat(object.any || []).concat(object.all || []).concat(object.none || []);
  };
  'use strict';
  axe.utils.getCheckOption = function(check, ruleID, options) {
    var ruleCheckOption = ((options.rules && options.rules[ruleID] || {}).checks || {})[check.id];
    var checkOption = (options.checks || {})[check.id];
    var enabled = check.enabled;
    var opts = check.options;
    if (checkOption) {
      if (checkOption.hasOwnProperty('enabled')) {
        enabled = checkOption.enabled;
      }
      if (checkOption.hasOwnProperty('options')) {
        opts = checkOption.options;
      }
    }
    if (ruleCheckOption) {
      if (ruleCheckOption.hasOwnProperty('enabled')) {
        enabled = ruleCheckOption.enabled;
      }
      if (ruleCheckOption.hasOwnProperty('options')) {
        opts = ruleCheckOption.options;
      }
    }
    return {
      enabled: enabled,
      options: opts,
      absolutePaths: options.absolutePaths
    };
  };
  'use strict';
  var _slicedToArray = function() {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) {
            break;
          }
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i['return']) {
            _i['return']();
          }
        } finally {
          if (_d) {
            throw _e;
          }
        }
      }
      return _arr;
    }
    return function(arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  }();
  function isMostlyNumbers() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return str.length !== 0 && (str.match(/[0-9]/g) || '').length >= str.length / 2;
  }
  function splitString(str, splitIndex) {
    return [ str.substring(0, splitIndex), str.substring(splitIndex) ];
  }
  function trimRight(str) {
    return str.replace(/\s+$/, '');
  }
  function uriParser(url) {
    var original = url;
    var protocol = '', domain = '', port = '', path = '', query = '', hash = '';
    if (url.includes('#')) {
      var _splitString = splitString(url, url.indexOf('#'));
      var _splitString2 = _slicedToArray(_splitString, 2);
      url = _splitString2[0];
      hash = _splitString2[1];
    }
    if (url.includes('?')) {
      var _splitString3 = splitString(url, url.indexOf('?'));
      var _splitString4 = _slicedToArray(_splitString3, 2);
      url = _splitString4[0];
      query = _splitString4[1];
    }
    if (url.includes('://')) {
      var _url$split = url.split('://');
      var _url$split2 = _slicedToArray(_url$split, 2);
      protocol = _url$split2[0];
      url = _url$split2[1];
      var _splitString5 = splitString(url, url.indexOf('/'));
      var _splitString6 = _slicedToArray(_splitString5, 2);
      domain = _splitString6[0];
      url = _splitString6[1];
    } else if (url.substr(0, 2) === '//') {
      url = url.substr(2);
      var _splitString7 = splitString(url, url.indexOf('/'));
      var _splitString8 = _slicedToArray(_splitString7, 2);
      domain = _splitString8[0];
      url = _splitString8[1];
    }
    if (domain.substr(0, 4) === 'www.') {
      domain = domain.substr(4);
    }
    if (domain && domain.includes(':')) {
      var _splitString9 = splitString(domain, domain.indexOf(':'));
      var _splitString10 = _slicedToArray(_splitString9, 2);
      domain = _splitString10[0];
      port = _splitString10[1];
    }
    path = url;
    return {
      original: original,
      protocol: protocol,
      domain: domain,
      port: port,
      path: path,
      query: query,
      hash: hash
    };
  }
  axe.utils.getFriendlyUriEnd = function getFriendlyUriEnd() {
    var uri = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (uri.length <= 1 || uri.substr(0, 5) === 'data:' || uri.substr(0, 11) === 'javascript:' || uri.includes('?')) {
      return;
    }
    var currentDomain = options.currentDomain, _options$maxLength = options.maxLength, maxLength = _options$maxLength === undefined ? 25 : _options$maxLength;
    var _uriParser = uriParser(uri), path = _uriParser.path, domain = _uriParser.domain, hash = _uriParser.hash;
    var pathEnd = path.substr(path.substr(0, path.length - 2).lastIndexOf('/') + 1);
    if (hash) {
      if (pathEnd && (pathEnd + hash).length <= maxLength) {
        return trimRight(pathEnd + hash);
      } else if (pathEnd.length < 2 && hash.length > 2 && hash.length <= maxLength) {
        return trimRight(hash);
      } else {
        return;
      }
    } else if (domain && domain.length < maxLength && path.length <= 1) {
      return trimRight(domain + path);
    }
    if (path === '/' + pathEnd && domain && currentDomain && domain !== currentDomain && (domain + path).length <= maxLength) {
      return trimRight(domain + path);
    }
    var lastDotIndex = pathEnd.lastIndexOf('.');
    if ((lastDotIndex === -1 || lastDotIndex > 1) && (lastDotIndex !== -1 || pathEnd.length > 2) && pathEnd.length <= maxLength && !pathEnd.match(/index(\.[a-zA-Z]{2-4})?/) && !isMostlyNumbers(pathEnd)) {
      return trimRight(pathEnd);
    }
  };
  'use strict';
  axe.utils.getRootNode = function getRootNode(node) {
    var doc = node.getRootNode && node.getRootNode() || document;
    if (doc === node) {
      doc = document;
    }
    return doc;
  };
  'use strict';
  var escapeSelector = axe.utils.escapeSelector;
  var isXHTML = void 0;
  var ignoredAttributes = [ 'class', 'style', 'id', 'selected', 'checked', 'disabled', 'tabindex', 'aria-checked', 'aria-selected', 'aria-invalid', 'aria-activedescendant', 'aria-busy', 'aria-disabled', 'aria-expanded', 'aria-grabbed', 'aria-pressed', 'aria-valuenow' ];
  var MAXATTRIBUTELENGTH = 31;
  function getAttributeNameValue(node, at) {
    var name = at.name;
    var atnv = void 0;
    if (name.indexOf('href') !== -1 || name.indexOf('src') !== -1) {
      var friendly = axe.utils.getFriendlyUriEnd(node.getAttribute(name));
      if (friendly) {
        var value = encodeURI(friendly);
        if (value) {
          atnv = escapeSelector(at.name) + '$="' + value + '"';
        } else {
          return;
        }
      } else {
        atnv = escapeSelector(at.name) + '="' + node.getAttribute(name) + '"';
      }
    } else {
      atnv = escapeSelector(name) + '="' + escapeSelector(at.value) + '"';
    }
    return atnv;
  }
  function countSort(a, b) {
    return a.count < b.count ? -1 : a.count === b.count ? 0 : 1;
  }
  function filterAttributes(at) {
    return !ignoredAttributes.includes(at.name) && at.name.indexOf(':') === -1 && (!at.value || at.value.length < MAXATTRIBUTELENGTH);
  }
  axe.utils.getSelectorData = function(domTree) {
    var data = {
      classes: {},
      tags: {},
      attributes: {}
    };
    domTree = Array.isArray(domTree) ? domTree : [ domTree ];
    var currentLevel = domTree.slice();
    var stack = [];
    var _loop = function _loop() {
      var current = currentLevel.pop();
      var node = current.actualNode;
      if (!!node.querySelectorAll) {
        var tag = node.nodeName;
        if (data.tags[tag]) {
          data.tags[tag]++;
        } else {
          data.tags[tag] = 1;
        }
        if (node.classList) {
          Array.from(node.classList).forEach(function(cl) {
            var ind = escapeSelector(cl);
            if (data.classes[ind]) {
              data.classes[ind]++;
            } else {
              data.classes[ind] = 1;
            }
          });
        }
        if (node.attributes) {
          Array.from(node.attributes).filter(filterAttributes).forEach(function(at) {
            var atnv = getAttributeNameValue(node, at);
            if (atnv) {
              if (data.attributes[atnv]) {
                data.attributes[atnv]++;
              } else {
                data.attributes[atnv] = 1;
              }
            }
          });
        }
      }
      if (current.children.length) {
        stack.push(currentLevel);
        currentLevel = current.children.slice();
      }
      while (!currentLevel.length && stack.length) {
        currentLevel = stack.pop();
      }
    };
    while (currentLevel.length) {
      _loop();
    }
    return data;
  };
  function uncommonClasses(node, selectorData) {
    var retVal = [];
    var classData = selectorData.classes;
    var tagData = selectorData.tags;
    if (node.classList) {
      Array.from(node.classList).forEach(function(cl) {
        var ind = escapeSelector(cl);
        if (classData[ind] < tagData[node.nodeName]) {
          retVal.push({
            name: ind,
            count: classData[ind],
            species: 'class'
          });
        }
      });
    }
    return retVal.sort(countSort);
  }
  function getNthChildString(elm, selector) {
    var siblings = elm.parentNode && Array.from(elm.parentNode.children || '') || [];
    var hasMatchingSiblings = siblings.find(function(sibling) {
      return sibling !== elm && axe.utils.matchesSelector(sibling, selector);
    });
    if (hasMatchingSiblings) {
      var nthChild = 1 + siblings.indexOf(elm);
      return ':nth-child(' + nthChild + ')';
    } else {
      return '';
    }
  }
  function getElmId(elm) {
    if (!elm.getAttribute('id')) {
      return;
    }
    var doc = elm.getRootNode && elm.getRootNode() || document;
    var id = '#' + escapeSelector(elm.getAttribute('id') || '');
    if (!id.match(/player_uid_/) && doc.querySelectorAll(id).length === 1) {
      return id;
    }
  }
  function getBaseSelector(elm) {
    if (typeof isXHTML === 'undefined') {
      isXHTML = axe.utils.isXHTML(document);
    }
    return escapeSelector(isXHTML ? elm.localName : elm.nodeName.toLowerCase());
  }
  function uncommonAttributes(node, selectorData) {
    var retVal = [];
    var attData = selectorData.attributes;
    var tagData = selectorData.tags;
    if (node.attributes) {
      Array.from(node.attributes).filter(filterAttributes).forEach(function(at) {
        var atnv = getAttributeNameValue(node, at);
        if (atnv && attData[atnv] < tagData[node.nodeName]) {
          retVal.push({
            name: atnv,
            count: attData[atnv],
            species: 'attribute'
          });
        }
      });
    }
    return retVal.sort(countSort);
  }
  function getThreeLeastCommonFeatures(elm, selectorData) {
    var selector = '';
    var features = void 0;
    var clss = uncommonClasses(elm, selectorData);
    var atts = uncommonAttributes(elm, selectorData);
    if (clss.length && clss[0].count === 1) {
      features = [ clss[0] ];
    } else if (atts.length && atts[0].count === 1) {
      features = [ atts[0] ];
      selector = getBaseSelector(elm);
    } else {
      features = clss.concat(atts);
      features.sort(countSort);
      features = features.slice(0, 3);
      if (!features.some(function(feat) {
        return feat.species === 'class';
      })) {
        selector = getBaseSelector(elm);
      } else {
        features.sort(function(a, b) {
          return a.species !== b.species && a.species === 'class' ? -1 : a.species === b.species ? 0 : 1;
        });
      }
    }
    return selector += features.reduce(function(val, feat) {
      switch (feat.species) {
       case 'class':
        return val + '.' + feat.name;

       case 'attribute':
        return val + '[' + feat.name + ']';
      }
      return val;
    }, '');
  }
  function generateSelector(elm, options, doc) {
    if (!axe._selectorData) {
      throw new Error('Expect axe._selectorData to be set up');
    }
    var _options$toRoot = options.toRoot, toRoot = _options$toRoot === undefined ? false : _options$toRoot;
    var selector = void 0;
    var similar = void 0;
    do {
      var features = getElmId(elm);
      if (!features) {
        features = getThreeLeastCommonFeatures(elm, axe._selectorData);
        features += getNthChildString(elm, features);
      }
      if (selector) {
        selector = features + ' > ' + selector;
      } else {
        selector = features;
      }
      if (!similar) {
        similar = Array.from(doc.querySelectorAll(selector));
      } else {
        similar = similar.filter(function(item) {
          return axe.utils.matchesSelector(item, selector);
        });
      }
      elm = elm.parentElement;
    } while ((similar.length > 1 || toRoot) && elm && elm.nodeType !== 11);
    if (similar.length === 1) {
      return selector;
    } else if (selector.indexOf(' > ') !== -1) {
      return ':root' + selector.substring(selector.indexOf(' > '));
    }
    return ':root';
  }
  axe.utils.getSelector = function createUniqueSelector(elm) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!elm) {
      return '';
    }
    var doc = elm.getRootNode && elm.getRootNode() || document;
    if (doc.nodeType === 11) {
      var stack = [];
      while (doc.nodeType === 11) {
        stack.push({
          elm: elm,
          doc: doc
        });
        elm = doc.host;
        doc = elm.getRootNode();
      }
      stack.push({
        elm: elm,
        doc: doc
      });
      return stack.reverse().map(function(comp) {
        return generateSelector(comp.elm, options, comp.doc);
      });
    } else {
      return generateSelector(elm, options, doc);
    }
  };
  'use strict';
  function getXPathArray(node, path) {
    var sibling, count;
    if (!node) {
      return [];
    }
    if (!path && node.nodeType === 9) {
      path = [ {
        str: 'html'
      } ];
      return path;
    }
    path = path || [];
    if (node.parentNode && node.parentNode !== node) {
      path = getXPathArray(node.parentNode, path);
    }
    if (node.previousSibling) {
      count = 1;
      sibling = node.previousSibling;
      do {
        if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
          count++;
        }
        sibling = sibling.previousSibling;
      } while (sibling);
      if (count === 1) {
        count = null;
      }
    } else if (node.nextSibling) {
      sibling = node.nextSibling;
      do {
        if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
          count = 1;
          sibling = null;
        } else {
          count = null;
          sibling = sibling.previousSibling;
        }
      } while (sibling);
    }
    if (node.nodeType === 1) {
      var element = {};
      element.str = node.nodeName.toLowerCase();
      var id = node.getAttribute && axe.utils.escapeSelector(node.getAttribute('id'));
      if (id && node.ownerDocument.querySelectorAll('#' + id).length === 1) {
        element.id = node.getAttribute('id');
      }
      if (count > 1) {
        element.count = count;
      }
      path.push(element);
    }
    return path;
  }
  function xpathToString(xpathArray) {
    return xpathArray.reduce(function(str, elm) {
      if (elm.id) {
        return '/' + elm.str + '[@id=\'' + elm.id + '\']';
      } else {
        return str + ('/' + elm.str) + (elm.count > 0 ? '[' + elm.count + ']' : '');
      }
    }, '');
  }
  axe.utils.getXpath = function getXpath(node) {
    var xpathArray = getXPathArray(node);
    return xpathToString(xpathArray);
  };
  'use strict';
  var styleSheet;
  function injectStyle(style) {
    'use strict';
    if (styleSheet && styleSheet.parentNode) {
      if (styleSheet.styleSheet === undefined) {
        styleSheet.appendChild(document.createTextNode(style));
      } else {
        styleSheet.styleSheet.cssText += style;
      }
      return styleSheet;
    }
    if (!style) {
      return;
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    if (styleSheet.styleSheet === undefined) {
      styleSheet.appendChild(document.createTextNode(style));
    } else {
      styleSheet.styleSheet.cssText = style;
    }
    head.appendChild(styleSheet);
    return styleSheet;
  }
  axe.utils.injectStyle = injectStyle;
  'use strict';
  axe.utils.isHidden = function isHidden(el, recursed) {
    'use strict';
    var parent;
    if (el.nodeType === 9) {
      return false;
    }
    if (el.nodeType === 11) {
      el = el.host;
    }
    var style = window.getComputedStyle(el, null);
    if (!style || !el.parentNode || style.getPropertyValue('display') === 'none' || !recursed && style.getPropertyValue('visibility') === 'hidden' || el.getAttribute('aria-hidden') === 'true') {
      return true;
    }
    parent = el.assignedSlot ? el.assignedSlot : el.parentNode;
    return axe.utils.isHidden(parent, true);
  };
  'use strict';
  var possibleShadowRoots = [ 'article', 'aside', 'blockquote', 'body', 'div', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'main', 'nav', 'p', 'section', 'span' ];
  axe.utils.isShadowRoot = function isShadowRoot(node) {
    var nodeName = node.nodeName.toLowerCase();
    if (node.shadowRoot) {
      if (/^[a-z][a-z0-9_.-]*-[a-z0-9_.-]*$/.test(nodeName) || possibleShadowRoots.includes(nodeName)) {
        return true;
      }
    }
    return false;
  };
  'use strict';
  axe.utils.isXHTML = function(doc) {
    'use strict';
    if (!doc.createElement) {
      return false;
    }
    return doc.createElement('A').localName === 'A';
  };
  'use strict';
  function pushFrame(resultSet, options, frameElement, frameSelector) {
    'use strict';
    var frameXpath = axe.utils.getXpath(frameElement);
    var frameSpec = {
      element: frameElement,
      selector: frameSelector,
      xpath: frameXpath
    };
    resultSet.forEach(function(res) {
      res.node = axe.utils.DqElement.fromFrame(res.node, options, frameSpec);
      var checks = axe.utils.getAllChecks(res);
      if (checks.length) {
        checks.forEach(function(check) {
          check.relatedNodes = check.relatedNodes.map(function(node) {
            return axe.utils.DqElement.fromFrame(node, options, frameSpec);
          });
        });
      }
    });
  }
  function spliceNodes(target, to) {
    'use strict';
    var firstFromFrame = to[0].node, sorterResult, t;
    for (var i = 0, l = target.length; i < l; i++) {
      t = target[i].node;
      sorterResult = axe.utils.nodeSorter({
        actualNode: t.element
      }, {
        actualNode: firstFromFrame.element
      });
      if (sorterResult > 0 || sorterResult === 0 && firstFromFrame.selector.length < t.selector.length) {
        target.splice.apply(target, [ i, 0 ].concat(to));
        return;
      }
    }
    target.push.apply(target, to);
  }
  function normalizeResult(result) {
    'use strict';
    if (!result || !result.results) {
      return null;
    }
    if (!Array.isArray(result.results)) {
      return [ result.results ];
    }
    if (!result.results.length) {
      return null;
    }
    return result.results;
  }
  axe.utils.mergeResults = function mergeResults(frameResults, options) {
    'use strict';
    var result = [];
    frameResults.forEach(function(frameResult) {
      var results = normalizeResult(frameResult);
      if (!results || !results.length) {
        return;
      }
      results.forEach(function(ruleResult) {
        if (ruleResult.nodes && frameResult.frame) {
          pushFrame(ruleResult.nodes, options, frameResult.frameElement, frameResult.frame);
        }
        var res = axe.utils.findBy(result, 'id', ruleResult.id);
        if (!res) {
          result.push(ruleResult);
        } else {
          if (ruleResult.nodes.length) {
            spliceNodes(res.nodes, ruleResult.nodes);
          }
        }
      });
    });
    return result;
  };
  'use strict';
  axe.utils.nodeSorter = function nodeSorter(a, b) {
    'use strict';
    if (a.actualNode === b.actualNode) {
      return 0;
    }
    if (a.actualNode.compareDocumentPosition(b.actualNode) & 4) {
      return -1;
    }
    return 1;
  };
  'use strict';
  utils.performanceTimer = function() {
    'use strict';
    function now() {
      if (window.performance && window.performance) {
        return window.performance.now();
      }
    }
    var originalTime = null;
    var lastRecordedTime = now();
    return {
      start: function start() {
        this.mark('mark_axe_start');
      },
      end: function end() {
        this.mark('mark_axe_end');
        this.measure('axe', 'mark_axe_start', 'mark_axe_end');
        this.logMeasures('axe');
      },
      auditStart: function auditStart() {
        this.mark('mark_audit_start');
      },
      auditEnd: function auditEnd() {
        this.mark('mark_audit_end');
        this.measure('audit_start_to_end', 'mark_audit_start', 'mark_audit_end');
        this.logMeasures();
      },
      mark: function mark(markName) {
        if (window.performance && window.performance.mark !== undefined) {
          window.performance.mark(markName);
        }
      },
      measure: function measure(measureName, startMark, endMark) {
        if (window.performance && window.performance.measure !== undefined) {
          window.performance.measure(measureName, startMark, endMark);
        }
      },
      logMeasures: function logMeasures(measureName) {
        function log(req) {
          axe.log('Measure ' + req.name + ' took ' + req.duration + 'ms');
        }
        if (window.performance && window.performance.getEntriesByType !== undefined) {
          var measures = window.performance.getEntriesByType('measure');
          for (var i = 0; i < measures.length; ++i) {
            var req = measures[i];
            if (req.name === measureName) {
              log(req);
              return;
            }
            log(req);
          }
        }
      },
      timeElapsed: function timeElapsed() {
        return now() - lastRecordedTime;
      },
      reset: function reset() {
        if (!originalTime) {
          originalTime = now();
        }
        lastRecordedTime = now();
      }
    };
  }();
  'use strict';
  if (typeof Object.assign !== 'function') {
    (function() {
      Object.assign = function(target) {
        'use strict';
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source !== undefined && source !== null) {
            for (var nextKey in source) {
              if (source.hasOwnProperty(nextKey)) {
                output[nextKey] = source[nextKey];
              }
            }
          }
        }
        return output;
      };
    })();
  }
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function value(predicate) {
        if (this === null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;
        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
        return undefined;
      }
    });
  }
  axe.utils.pollyfillElementsFromPoint = function() {
    if (document.elementsFromPoint) {
      return document.elementsFromPoint;
    }
    if (document.msElementsFromPoint) {
      return document.msElementsFromPoint;
    }
    var usePointer = function() {
      var element = document.createElement('x');
      element.style.cssText = 'pointer-events:auto';
      return element.style.pointerEvents === 'auto';
    }();
    var cssProp = usePointer ? 'pointer-events' : 'visibility';
    var cssDisableVal = usePointer ? 'none' : 'hidden';
    var style = document.createElement('style');
    style.innerHTML = usePointer ? '* { pointer-events: all }' : '* { visibility: visible }';
    return function(x, y) {
      var current, i, d;
      var elements = [];
      var previousPointerEvents = [];
      document.head.appendChild(style);
      while ((current = document.elementFromPoint(x, y)) && elements.indexOf(current) === -1) {
        elements.push(current);
        previousPointerEvents.push({
          value: current.style.getPropertyValue(cssProp),
          priority: current.style.getPropertyPriority(cssProp)
        });
        current.style.setProperty(cssProp, cssDisableVal, 'important');
      }
      if (elements.indexOf(document.documentElement) < elements.length - 1) {
        elements.splice(elements.indexOf(document.documentElement), 1);
        elements.push(document.documentElement);
      }
      for (i = previousPointerEvents.length; !!(d = previousPointerEvents[--i]); ) {
        elements[i].style.setProperty(cssProp, d.value ? d.value : '', d.priority);
      }
      document.head.removeChild(style);
      return elements;
    };
  };
  if (typeof window.addEventListener === 'function') {
    document.elementsFromPoint = axe.utils.pollyfillElementsFromPoint();
  }
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function value(searchElement) {
        'use strict';
        var O = Object(this);
        var len = parseInt(O.length, 10) || 0;
        if (len === 0) {
          return false;
        }
        var n = parseInt(arguments[1], 10) || 0;
        var k;
        if (n >= 0) {
          k = n;
        } else {
          k = len + n;
          if (k < 0) {
            k = 0;
          }
        }
        var currentElement;
        while (k < len) {
          currentElement = O[k];
          if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
            return true;
          }
          k++;
        }
        return false;
      }
    });
  }
  if (!Array.prototype.some) {
    Object.defineProperty(Array.prototype, 'some', {
      value: function value(fun) {
        'use strict';
        if (this == null) {
          throw new TypeError('Array.prototype.some called on null or undefined');
        }
        if (typeof fun !== 'function') {
          throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
          if (i in t && fun.call(thisArg, t[i], i, t)) {
            return true;
          }
        }
        return false;
      }
    });
  }
  if (!Array.from) {
    Object.defineProperty(Array, 'from', {
      value: function() {
        var toStr = Object.prototype.toString;
        var isCallable = function isCallable(fn) {
          return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function toInteger(value) {
          var number = Number(value);
          if (isNaN(number)) {
            return 0;
          }
          if (number === 0 || !isFinite(number)) {
            return number;
          }
          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function toLength(value) {
          var len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
        };
        return function from(arrayLike) {
          var C = this;
          var items = Object(arrayLike);
          if (arrayLike == null) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
          }
          var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          var T;
          if (typeof mapFn !== 'undefined') {
            if (!isCallable(mapFn)) {
              throw new TypeError('Array.from: when provided, the second argument must be a function');
            }
            if (arguments.length > 2) {
              T = arguments[2];
            }
          }
          var len = toLength(items.length);
          var A = isCallable(C) ? Object(new C(len)) : new Array(len);
          var k = 0;
          var kValue;
          while (k < len) {
            kValue = items[k];
            if (mapFn) {
              A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
            } else {
              A[k] = kValue;
            }
            k += 1;
          }
          A.length = len;
          return A;
        };
      }()
    });
  }
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      if (typeof start !== 'number') {
        start = 0;
      }
      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
  'use strict';
  function loadCssom(_ref, timeout, convertTextToStylesheetFn) {
    var root = _ref.root, shadowId = _ref.shadowId;
    function getExternalStylesheet(_ref2) {
      var resolve = _ref2.resolve, reject = _ref2.reject, url = _ref2.url;
      axe.imports.axios({
        method: 'get',
        url: url,
        timeout: timeout
      }).then(function(_ref3) {
        var data = _ref3.data;
        var sheet = convertTextToStylesheetFn({
          data: data,
          isExternal: true,
          shadowId: shadowId,
          root: root
        });
        resolve(sheet);
      }).catch(reject);
    }
    var q = axe.utils.queue();
    var rootStyleSheets = root.styleSheets ? Array.from(root.styleSheets) : null;
    if (!rootStyleSheets) {
      return q;
    }
    var sheetHrefs = [];
    var sheets = rootStyleSheets.filter(function(sheet) {
      var sheetAlreadyExists = false;
      if (sheet.href) {
        if (!sheetHrefs.includes(sheet.href)) {
          sheetHrefs.push(sheet.href);
        } else {
          sheetAlreadyExists = true;
        }
      }
      var isPrintMedia = Array.from(sheet.media).includes('print');
      return !isPrintMedia && !sheetAlreadyExists;
    });
    sheets.forEach(function(sheet) {
      try {
        var cssRules = sheet.cssRules;
        var rules = Array.from(cssRules);
        var importRules = rules.filter(function(r) {
          return r.href;
        });
        if (!importRules.length) {
          q.defer(function(resolve) {
            return resolve({
              sheet: sheet,
              isExternal: false,
              shadowId: shadowId,
              root: root
            });
          });
          return;
        }
        importRules.forEach(function(rule) {
          q.defer(function(resolve, reject) {
            getExternalStylesheet({
              resolve: resolve,
              reject: reject,
              url: rule.href
            });
          });
        });
        var inlineRules = rules.filter(function(rule) {
          return !rule.href;
        });
        var inlineRulesCssText = inlineRules.reduce(function(out, rule) {
          out.push(rule.cssText);
          return out;
        }, []).join();
        q.defer(function(resolve) {
          return resolve(convertTextToStylesheetFn({
            data: inlineRulesCssText,
            shadowId: shadowId,
            root: root,
            isExternal: false
          }));
        });
      } catch (e) {
        q.defer(function(resolve, reject) {
          getExternalStylesheet({
            resolve: resolve,
            reject: reject,
            url: sheet.href
          });
        });
      }
    }, []);
    return q;
  }
  function getAllRootsInTree(tree) {
    var ids = [];
    var documents = axe.utils.querySelectorAllFilter(tree, '*', function(node) {
      if (ids.includes(node.shadowId)) {
        return false;
      }
      ids.push(node.shadowId);
      return true;
    }).map(function(node) {
      return {
        shadowId: node.shadowId,
        root: axe.utils.getRootNode(node.actualNode)
      };
    });
    return documents;
  }
  axe.utils.preloadCssom = function preloadCssom(_ref4) {
    var timeout = _ref4.timeout, _ref4$treeRoot = _ref4.treeRoot, treeRoot = _ref4$treeRoot === undefined ? axe._tree[0] : _ref4$treeRoot;
    var roots = axe.utils.uniqueArray(getAllRootsInTree(treeRoot), []);
    var q = axe.utils.queue();
    if (!roots.length) {
      return q;
    }
    var dynamicDoc = document.implementation.createHTMLDocument();
    function convertTextToStylesheet(_ref5) {
      var data = _ref5.data, isExternal = _ref5.isExternal, shadowId = _ref5.shadowId, root = _ref5.root;
      var style = dynamicDoc.createElement('style');
      style.type = 'text/css';
      style.appendChild(dynamicDoc.createTextNode(data));
      dynamicDoc.head.appendChild(style);
      return {
        sheet: style.sheet,
        isExternal: isExternal,
        shadowId: shadowId,
        root: root
      };
    }
    q.defer(function(resolve, reject) {
      roots.reduce(function(out, root) {
        out.defer(function(resolve, reject) {
          loadCssom(root, timeout, convertTextToStylesheet).then(resolve).catch(reject);
        });
        return out;
      }, axe.utils.queue()).then(function(assets) {
        resolve(assets.reduce(function(out, cssomSheets) {
          return out.concat(cssomSheets);
        }, []));
      }).catch(reject);
    });
    return q;
  };
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function isValidPreloadObject(preload) {
    return (typeof preload === 'undefined' ? 'undefined' : _typeof(preload)) === 'object' && Array.isArray(preload.assets);
  }
  axe.utils.shouldPreload = function shouldPreload(options) {
    if (!options || !options.preload) {
      return false;
    }
    if (typeof options.preload === 'boolean') {
      return options.preload;
    }
    return isValidPreloadObject(options.preload);
  };
  axe.utils.getPreloadConfig = function getPreloadConfig(options) {
    var config = {
      assets: axe.constants.preloadAssets,
      timeout: axe.constants.preloadAssetsTimeout
    };
    if (typeof options.preload === 'boolean') {
      return config;
    }
    var areRequestedAssetsValid = options.preload.assets.every(function(a) {
      return axe.constants.preloadAssets.includes(a.toLowerCase());
    });
    if (!areRequestedAssetsValid) {
      throw new Error('Requested assets, not supported. ' + ('Supported assets are: ' + axe.constants.preloadAssets.join(', ') + '.'));
    }
    config.assets = axe.utils.uniqueArray(options.preload.assets.map(function(a) {
      return a.toLowerCase();
    }), []);
    if (options.preload.timeout && typeof options.preload.timeout === 'number' && !Number.isNaN(options.preload.timeout)) {
      config.timeout = options.preload.timeout;
    }
    return config;
  };
  axe.utils.preload = function preload(options) {
    var preloadFunctionsMap = {
      cssom: axe.utils.preloadCssom
    };
    var q = axe.utils.queue();
    var shouldPreload = axe.utils.shouldPreload(options);
    if (!shouldPreload) {
      return q;
    }
    var preloadConfig = axe.utils.getPreloadConfig(options);
    preloadConfig.assets.forEach(function(asset) {
      q.defer(function(resolve, reject) {
        preloadFunctionsMap[asset](preloadConfig).then(function(results) {
          resolve(_defineProperty({}, asset, results[0]));
        }).catch(reject);
      });
    });
    return q;
  };
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  function getIncompleteReason(checkData, messages) {
    function getDefaultMsg(messages) {
      if (messages.incomplete && messages.incomplete.default) {
        return messages.incomplete.default;
      } else {
        return helpers.incompleteFallbackMessage();
      }
    }
    if (checkData && checkData.missingData) {
      try {
        var msg = messages.incomplete[checkData.missingData[0].reason];
        if (!msg) {
          throw new Error();
        }
        return msg;
      } catch (e) {
        if (typeof checkData.missingData === 'string') {
          return messages.incomplete[checkData.missingData];
        } else {
          return getDefaultMsg(messages);
        }
      }
    } else {
      return getDefaultMsg(messages);
    }
  }
  function extender(checksData, shouldBeTrue) {
    'use strict';
    return function(check) {
      var sourceData = checksData[check.id] || {};
      var messages = sourceData.messages || {};
      var data = Object.assign({}, sourceData);
      delete data.messages;
      if (check.result === undefined) {
        if (_typeof(messages.incomplete) === 'object') {
          data.message = function() {
            return getIncompleteReason(check.data, messages);
          };
        } else {
          data.message = messages.incomplete;
        }
      } else {
        data.message = check.result === shouldBeTrue ? messages.pass : messages.fail;
      }
      axe.utils.extendMetaData(check, data);
    };
  }
  axe.utils.publishMetaData = function(ruleResult) {
    'use strict';
    var checksData = axe._audit.data.checks || {};
    var rulesData = axe._audit.data.rules || {};
    var rule = axe.utils.findBy(axe._audit.rules, 'id', ruleResult.id) || {};
    ruleResult.tags = axe.utils.clone(rule.tags || []);
    var shouldBeTrue = extender(checksData, true);
    var shouldBeFalse = extender(checksData, false);
    ruleResult.nodes.forEach(function(detail) {
      detail.any.forEach(shouldBeTrue);
      detail.all.forEach(shouldBeTrue);
      detail.none.forEach(shouldBeFalse);
    });
    axe.utils.extendMetaData(ruleResult, axe.utils.clone(rulesData[ruleResult.id] || {}));
  };
  'use strict';
  var convertExpressions = function convertExpressions() {};
  var matchExpressions = function matchExpressions() {};
  function matchesTag(node, exp) {
    return node.nodeType === 1 && (exp.tag === '*' || node.nodeName.toLowerCase() === exp.tag);
  }
  function matchesClasses(node, exp) {
    return !exp.classes || exp.classes.reduce(function(result, cl) {
      return result && node.className && node.className.match(cl.regexp);
    }, true);
  }
  function matchesAttributes(node, exp) {
    return !exp.attributes || exp.attributes.reduce(function(result, att) {
      var nodeAtt = node.getAttribute(att.key);
      return result && nodeAtt !== null && (!att.value || att.test(nodeAtt));
    }, true);
  }
  function matchesId(node, exp) {
    return !exp.id || node.id === exp.id;
  }
  function matchesPseudos(target, exp) {
    if (!exp.pseudos || exp.pseudos.reduce(function(result, pseudo) {
      if (pseudo.name === 'not') {
        return result && !matchExpressions([ target ], pseudo.expressions, false).length;
      }
      throw new Error('the pseudo selector ' + pseudo.name + ' has not yet been implemented');
    }, true)) {
      return true;
    }
    return false;
  }
  var escapeRegExp = function() {
    var from = /(?=[\-\[\]{}()*+?.\\\^$|,#\s])/g;
    var to = '\\';
    return function(string) {
      return string.replace(from, to);
    };
  }();
  var reUnescape = /\\/g;
  function convertAttributes(atts) {
    if (!atts) {
      return;
    }
    return atts.map(function(att) {
      var attributeKey = att.name.replace(reUnescape, '');
      var attributeValue = (att.value || '').replace(reUnescape, '');
      var test, regexp;
      switch (att.operator) {
       case '^=':
        regexp = new RegExp('^' + escapeRegExp(attributeValue));
        break;

       case '$=':
        regexp = new RegExp(escapeRegExp(attributeValue) + '$');
        break;

       case '~=':
        regexp = new RegExp('(^|\\s)' + escapeRegExp(attributeValue) + '(\\s|$)');
        break;

       case '|=':
        regexp = new RegExp('^' + escapeRegExp(attributeValue) + '(-|$)');
        break;

       case '=':
        test = function test(value) {
          return attributeValue === value;
        };
        break;

       case '*=':
        test = function test(value) {
          return value && value.includes(attributeValue);
        };
        break;

       case '!=':
        test = function test(value) {
          return attributeValue !== value;
        };
        break;

       default:
        test = function test(value) {
          return !!value;
        };
      }
      if (attributeValue === '' && /^[*$^]=$/.test(att.operator)) {
        test = function test() {
          return false;
        };
      }
      if (!test) {
        test = function test(value) {
          return value && regexp.test(value);
        };
      }
      return {
        key: attributeKey,
        value: attributeValue,
        test: test
      };
    });
  }
  function convertClasses(classes) {
    if (!classes) {
      return;
    }
    return classes.map(function(className) {
      className = className.replace(reUnescape, '');
      return {
        value: className,
        regexp: new RegExp('(^|\\s)' + escapeRegExp(className) + '(\\s|$)')
      };
    });
  }
  function convertPseudos(pseudos) {
    if (!pseudos) {
      return;
    }
    return pseudos.map(function(p) {
      var expressions;
      if (p.name === 'not') {
        expressions = axe.utils.cssParser.parse(p.value);
        expressions = expressions.selectors ? expressions.selectors : [ expressions ];
        expressions = convertExpressions(expressions);
      }
      return {
        name: p.name,
        expressions: expressions,
        value: p.value
      };
    });
  }
  convertExpressions = function convertExpressions(expressions) {
    return expressions.map(function(exp) {
      var newExp = [];
      var rule = exp.rule;
      while (rule) {
        newExp.push({
          tag: rule.tagName ? rule.tagName.toLowerCase() : '*',
          combinator: rule.nestingOperator ? rule.nestingOperator : ' ',
          id: rule.id,
          attributes: convertAttributes(rule.attrs),
          classes: convertClasses(rule.classNames),
          pseudos: convertPseudos(rule.pseudos)
        });
        rule = rule.rule;
      }
      return newExp;
    });
  };
  function createLocalVariables(nodes, anyLevel, thisLevel, parentShadowId) {
    var retVal = {
      nodes: nodes.slice(),
      anyLevel: anyLevel,
      thisLevel: thisLevel,
      parentShadowId: parentShadowId
    };
    retVal.nodes.reverse();
    return retVal;
  }
  function matchesSelector(node, exp) {
    return matchesTag(node.actualNode, exp[0]) && matchesClasses(node.actualNode, exp[0]) && matchesAttributes(node.actualNode, exp[0]) && matchesId(node.actualNode, exp[0]) && matchesPseudos(node, exp[0]);
  }
  matchExpressions = function matchExpressions(domTree, expressions, recurse, filter) {
    var stack = [];
    var nodes = Array.isArray(domTree) ? domTree : [ domTree ];
    var currentLevel = createLocalVariables(nodes, expressions, [], domTree[0].shadowId);
    var result = [];
    while (currentLevel.nodes.length) {
      var node = currentLevel.nodes.pop();
      var childOnly = [];
      var childAny = [];
      var combined = currentLevel.anyLevel.slice().concat(currentLevel.thisLevel);
      var added = false;
      for (var i = 0; i < combined.length; i++) {
        var exp = combined[i];
        if (matchesSelector(node, exp) && (!exp[0].id || node.shadowId === currentLevel.parentShadowId)) {
          if (exp.length === 1) {
            if (!added && (!filter || filter(node))) {
              result.push(node);
              added = true;
            }
          } else {
            var rest = exp.slice(1);
            if ([ ' ', '>' ].includes(rest[0].combinator) === false) {
              throw new Error('axe.utils.querySelectorAll does not support the combinator: ' + exp[1].combinator);
            }
            if (rest[0].combinator === '>') {
              childOnly.push(rest);
            } else {
              childAny.push(rest);
            }
          }
        }
        if (currentLevel.anyLevel.includes(exp) && (!exp[0].id || node.shadowId === currentLevel.parentShadowId)) {
          childAny.push(exp);
        }
      }
      if (node.children && node.children.length && recurse) {
        stack.push(currentLevel);
        currentLevel = createLocalVariables(node.children, childAny, childOnly, node.shadowId);
      }
      while (!currentLevel.nodes.length && stack.length) {
        currentLevel = stack.pop();
      }
    }
    return result;
  };
  axe.utils.querySelectorAll = function(domTree, selector) {
    return axe.utils.querySelectorAllFilter(domTree, selector);
  };
  axe.utils.querySelectorAllFilter = function(domTree, selector, filter) {
    domTree = Array.isArray(domTree) ? domTree : [ domTree ];
    var expressions = axe.utils.cssParser.parse(selector);
    expressions = expressions.selectors ? expressions.selectors : [ expressions ];
    expressions = convertExpressions(expressions);
    return matchExpressions(domTree, expressions, true, filter);
  };
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  (function() {
    'use strict';
    function noop() {}
    function funcGuard(f) {
      if (typeof f !== 'function') {
        throw new TypeError('Queue methods require functions as arguments');
      }
    }
    function queue() {
      var tasks = [];
      var started = 0;
      var remaining = 0;
      var completeQueue = noop;
      var complete = false;
      var err;
      var defaultFail = function defaultFail(e) {
        err = e;
        setTimeout(function() {
          if (err !== undefined && err !== null) {
            axe.log('Uncaught error (of queue)', err);
          }
        }, 1);
      };
      var failed = defaultFail;
      function createResolve(i) {
        return function(r) {
          tasks[i] = r;
          remaining -= 1;
          if (!remaining && completeQueue !== noop) {
            complete = true;
            completeQueue(tasks);
          }
        };
      }
      function abort(msg) {
        completeQueue = noop;
        failed(msg);
        return tasks;
      }
      function pop() {
        var length = tasks.length;
        for (;started < length; started++) {
          var task = tasks[started];
          try {
            task.call(null, createResolve(started), abort);
          } catch (e) {
            abort(e);
          }
        }
      }
      var q = {
        defer: function defer(fn) {
          if ((typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object' && fn.then && fn.catch) {
            var defer = fn;
            fn = function fn(resolve, reject) {
              defer.then(resolve).catch(reject);
            };
          }
          funcGuard(fn);
          if (err !== undefined) {
            return;
          } else if (complete) {
            throw new Error('Queue already completed');
          }
          tasks.push(fn);
          ++remaining;
          pop();
          return q;
        },
        then: function then(fn) {
          funcGuard(fn);
          if (completeQueue !== noop) {
            throw new Error('queue `then` already set');
          }
          if (!err) {
            completeQueue = fn;
            if (!remaining) {
              complete = true;
              completeQueue(tasks);
            }
          }
          return q;
        },
        catch: function _catch(fn) {
          funcGuard(fn);
          if (failed !== defaultFail) {
            throw new Error('queue `catch` already set');
          }
          if (!err) {
            failed = fn;
          } else {
            fn(err);
            err = null;
          }
          return q;
        },
        abort: abort
      };
      return q;
    }
    axe.utils.queue = queue;
  })();
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  (function(exports) {
    'use strict';
    var messages = {}, subscribers = {}, errorTypes = Object.freeze([ 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError' ]);
    function _getSource() {
      var application = 'axeAPI', version = '', src;
      if (typeof axe !== 'undefined' && axe._audit && axe._audit.application) {
        application = axe._audit.application;
      }
      if (typeof axe !== 'undefined') {
        version = axe.version;
      }
      src = application + '.' + version;
      return src;
    }
    function verify(postedMessage) {
      if ((typeof postedMessage === 'undefined' ? 'undefined' : _typeof(postedMessage)) === 'object' && typeof postedMessage.uuid === 'string' && postedMessage._respondable === true) {
        var messageSource = _getSource();
        return postedMessage._source === messageSource || postedMessage._source === 'axeAPI.x.y.z' || messageSource === 'axeAPI.x.y.z';
      }
      return false;
    }
    function post(win, topic, message, uuid, keepalive, callback) {
      var error;
      if (message instanceof Error) {
        error = {
          name: message.name,
          message: message.message,
          stack: message.stack
        };
        message = undefined;
      }
      var data = {
        uuid: uuid,
        topic: topic,
        message: message,
        error: error,
        _respondable: true,
        _source: _getSource(),
        _keepalive: keepalive
      };
      if (typeof callback === 'function') {
        messages[uuid] = callback;
      }
      win.postMessage(JSON.stringify(data), '*');
    }
    function respondable(win, topic, message, keepalive, callback) {
      var id = uuid.v1();
      post(win, topic, message, id, keepalive, callback);
    }
    respondable.subscribe = function(topic, callback) {
      subscribers[topic] = callback;
    };
    respondable.isInFrame = function(win) {
      win = win || window;
      return !!win.frameElement;
    };
    function createResponder(source, topic, uuid) {
      return function(message, keepalive, callback) {
        post(source, topic, message, uuid, keepalive, callback);
      };
    }
    function publish(source, data, keepalive) {
      var topic = data.topic;
      var subscriber = subscribers[topic];
      if (subscriber) {
        var responder = createResponder(source, null, data.uuid);
        subscriber(data.message, keepalive, responder);
      }
    }
    function buildErrorObject(error) {
      var msg = error.message || 'Unknown error occurred';
      var errorName = errorTypes.includes(error.name) ? error.name : 'Error';
      var ErrConstructor = window[errorName] || Error;
      if (error.stack) {
        msg += '\n' + error.stack.replace(error.message, '');
      }
      return new ErrConstructor(msg);
    }
    function parseMessage(dataString) {
      var data;
      if (typeof dataString !== 'string') {
        return;
      }
      try {
        data = JSON.parse(dataString);
      } catch (ex) {}
      if (!verify(data)) {
        return;
      }
      if (_typeof(data.error) === 'object') {
        data.error = buildErrorObject(data.error);
      } else {
        data.error = undefined;
      }
      return data;
    }
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('message', function(e) {
        var data = parseMessage(e.data);
        if (!data) {
          return;
        }
        var uuid = data.uuid;
        var keepalive = data._keepalive;
        var callback = messages[uuid];
        if (callback) {
          var result = data.error || data.message;
          var responder = createResponder(e.source, data.topic, uuid);
          callback(result, keepalive, responder);
          if (!keepalive) {
            delete messages[uuid];
          }
        }
        if (!data.error) {
          try {
            publish(e.source, data, keepalive);
          } catch (err) {
            post(e.source, data.topic, err, uuid, false);
          }
        }
      }, false);
    }
    exports.respondable = respondable;
  })(utils);
  'use strict';
  function matchTags(rule, runOnly) {
    'use strict';
    var include, exclude, matching;
    var defaultExclude = axe._audit && axe._audit.tagExclude ? axe._audit.tagExclude : [];
    if (runOnly.hasOwnProperty('include') || runOnly.hasOwnProperty('exclude')) {
      include = runOnly.include || [];
      include = Array.isArray(include) ? include : [ include ];
      exclude = runOnly.exclude || [];
      exclude = Array.isArray(exclude) ? exclude : [ exclude ];
      exclude = exclude.concat(defaultExclude.filter(function(tag) {
        return include.indexOf(tag) === -1;
      }));
    } else {
      include = Array.isArray(runOnly) ? runOnly : [ runOnly ];
      exclude = defaultExclude.filter(function(tag) {
        return include.indexOf(tag) === -1;
      });
    }
    matching = include.some(function(tag) {
      return rule.tags.indexOf(tag) !== -1;
    });
    if (matching || include.length === 0 && rule.enabled !== false) {
      return exclude.every(function(tag) {
        return rule.tags.indexOf(tag) === -1;
      });
    } else {
      return false;
    }
  }
  axe.utils.ruleShouldRun = function(rule, context, options) {
    'use strict';
    var runOnly = options.runOnly || {};
    var ruleOptions = (options.rules || {})[rule.id];
    if (rule.pageLevel && !context.page) {
      return false;
    } else if (runOnly.type === 'rule') {
      return runOnly.values.indexOf(rule.id) !== -1;
    } else if (ruleOptions && typeof ruleOptions.enabled === 'boolean') {
      return ruleOptions.enabled;
    } else if (runOnly.type === 'tag' && runOnly.values) {
      return matchTags(rule, runOnly.values);
    } else {
      return matchTags(rule, []);
    }
  };
  'use strict';
  function getScroll(elm) {
    var style = window.getComputedStyle(elm);
    var visibleOverflowY = style.getPropertyValue('overflow-y') === 'visible';
    var visibleOverflowX = style.getPropertyValue('overflow-x') === 'visible';
    if (!visibleOverflowY && elm.scrollHeight > elm.clientHeight || !visibleOverflowX && elm.scrollWidth > elm.clientWidth) {
      return {
        elm: elm,
        top: elm.scrollTop,
        left: elm.scrollLeft
      };
    }
  }
  function setScroll(elm, top, left) {
    if (elm === window) {
      return elm.scroll(top, left);
    } else {
      elm.scrollTop = top;
      elm.scrollLeft = left;
    }
  }
  function getElmScrollRecursive(root) {
    return Array.from(root.children).reduce(function(scrolls, elm) {
      var scroll = getScroll(elm);
      if (scroll) {
        scrolls.push(scroll);
      }
      return scrolls.concat(getElmScrollRecursive(elm));
    }, []);
  }
  axe.utils.getScrollState = function getScrollState() {
    var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var root = win.document.documentElement;
    var windowScroll = [ win.pageXOffset !== undefined ? {
      elm: win,
      top: win.pageYOffset,
      left: win.pageXOffset
    } : {
      elm: root,
      top: root.scrollTop,
      left: root.scrollLeft
    } ];
    return windowScroll.concat(getElmScrollRecursive(document.body));
  };
  axe.utils.setScrollState = function setScrollState(scrollState) {
    scrollState.forEach(function(_ref) {
      var elm = _ref.elm, top = _ref.top, left = _ref.left;
      return setScroll(elm, top, left);
    });
  };
  'use strict';
  function getDeepest(collection) {
    'use strict';
    return collection.sort(function(a, b) {
      if (axe.utils.contains(a, b)) {
        return 1;
      }
      return -1;
    })[0];
  }
  function isNodeInContext(node, context) {
    'use strict';
    var include = context.include && getDeepest(context.include.filter(function(candidate) {
      return axe.utils.contains(candidate, node);
    }));
    var exclude = context.exclude && getDeepest(context.exclude.filter(function(candidate) {
      return axe.utils.contains(candidate, node);
    }));
    if (!exclude && include || exclude && axe.utils.contains(exclude, include)) {
      return true;
    }
    return false;
  }
  function pushNode(result, nodes) {
    'use strict';
    var temp;
    if (result.length === 0) {
      return nodes;
    }
    if (result.length < nodes.length) {
      temp = result;
      result = nodes;
      nodes = temp;
    }
    for (var i = 0, l = nodes.length; i < l; i++) {
      if (!result.includes(nodes[i])) {
        result.push(nodes[i]);
      }
    }
    return result;
  }
  function reduceIncludes(includes) {
    return includes.reduce(function(res, el) {
      if (!res.length || !res[res.length - 1].actualNode.contains(el.actualNode)) {
        res.push(el);
      }
      return res;
    }, []);
  }
  axe.utils.select = function select(selector, context) {
    'use strict';
    var result = [], candidate;
    if (axe._selectCache) {
      for (var j = 0, l = axe._selectCache.length; j < l; j++) {
        var item = axe._selectCache[j];
        if (item.selector === selector) {
          return item.result;
        }
      }
    }
    var curried = function(context) {
      return function(node) {
        return isNodeInContext(node, context);
      };
    }(context);
    var reducedIncludes = reduceIncludes(context.include);
    for (var i = 0; i < reducedIncludes.length; i++) {
      candidate = reducedIncludes[i];
      if (candidate.actualNode.nodeType === candidate.actualNode.ELEMENT_NODE && axe.utils.matchesSelector(candidate.actualNode, selector) && curried(candidate)) {
        result = pushNode(result, [ candidate ]);
      }
      result = pushNode(result, axe.utils.querySelectorAllFilter(candidate, selector, curried));
    }
    if (axe._selectCache) {
      axe._selectCache.push({
        selector: selector,
        result: result
      });
    }
    return result;
  };
  'use strict';
  axe.utils.toArray = function(thing) {
    'use strict';
    return Array.prototype.slice.call(thing);
  };
  axe.utils.uniqueArray = function(arr1, arr2) {
    return arr1.concat(arr2).filter(function(elem, pos, arr) {
      return arr.indexOf(elem) === pos;
    });
  };
  'use strict';
  var uuid;
  (function(_global) {
    var _rng;
    var _crypto = _global.crypto || _global.msCrypto;
    if (!_rng && _crypto && _crypto.getRandomValues) {
      var _rnds8 = new Uint8Array(16);
      _rng = function whatwgRNG() {
        _crypto.getRandomValues(_rnds8);
        return _rnds8;
      };
    }
    if (!_rng) {
      var _rnds = new Array(16);
      _rng = function _rng() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 3) === 0) {
            r = Math.random() * 4294967296;
          }
          _rnds[i] = r >>> ((i & 3) << 3) & 255;
        }
        return _rnds;
      };
    }
    var BufferClass = typeof _global.Buffer == 'function' ? _global.Buffer : Array;
    var _byteToHex = [];
    var _hexToByte = {};
    for (var i = 0; i < 256; i++) {
      _byteToHex[i] = (i + 256).toString(16).substr(1);
      _hexToByte[_byteToHex[i]] = i;
    }
    function parse(s, buf, offset) {
      var i = buf && offset || 0, ii = 0;
      buf = buf || [];
      s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
        if (ii < 16) {
          buf[i + ii++] = _hexToByte[oct];
        }
      });
      while (ii < 16) {
        buf[i + ii++] = 0;
      }
      return buf;
    }
    function unparse(buf, offset) {
      var i = offset || 0, bth = _byteToHex;
      return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
    }
    var _seedBytes = _rng();
    var _nodeId = [ _seedBytes[0] | 1, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5] ];
    var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 16383;
    var _lastMSecs = 0, _lastNSecs = 0;
    function v1(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || [];
      options = options || {};
      var clockseq = options.clockseq != null ? options.clockseq : _clockseq;
      var msecs = options.msecs != null ? options.msecs : new Date().getTime();
      var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;
      var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq == null) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      var tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      var node = options.node || _nodeId;
      for (var n = 0; n < 6; n++) {
        b[i + n] = node[n];
      }
      return buf ? buf : unparse(b);
    }
    function v4(options, buf, offset) {
      var i = buf && offset || 0;
      if (typeof options == 'string') {
        buf = options == 'binary' ? new BufferClass(16) : null;
        options = null;
      }
      options = options || {};
      var rnds = options.random || (options.rng || _rng)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        for (var ii = 0; ii < 16; ii++) {
          buf[i + ii] = rnds[ii];
        }
      }
      return buf || unparse(rnds);
    }
    uuid = v4;
    uuid.v1 = v1;
    uuid.v4 = v4;
    uuid.parse = parse;
    uuid.unparse = unparse;
    uuid.BufferClass = BufferClass;
  })(window);
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  axe._load({
    data: {
      rules: {
        accesskeys: {
          description: 'Ensures every accesskey attribute value is unique',
          help: 'accesskey attribute value must be unique'
        },
        'area-alt': {
          description: 'Ensures <area> elements of image maps have alternate text',
          help: 'Active <area> elements must have alternate text'
        },
        'aria-allowed-attr': {
          description: 'Ensures ARIA attributes are allowed for an element\'s role',
          help: 'Elements must only use allowed ARIA attributes'
        },
        'aria-allowed-role': {
          description: 'Ensures role attribute has an appropriate value for the element',
          help: 'ARIA role must be appropriate for the element'
        },
        'aria-dpub-role-fallback': {
          description: 'Ensures unsupported DPUB roles are only used on elements with implicit fallback roles',
          help: 'Unsupported DPUB ARIA roles should be used on elements with implicit fallback roles'
        },
        'aria-hidden-body': {
          description: 'Ensures aria-hidden=\'true\' is not present on the document body.',
          help: 'aria-hidden=\'true\' must not be present on the document body'
        },
        'aria-required-attr': {
          description: 'Ensures elements with ARIA roles have all required ARIA attributes',
          help: 'Required ARIA attributes must be provided'
        },
        'aria-required-children': {
          description: 'Ensures elements with an ARIA role that require child roles contain them',
          help: 'Certain ARIA roles must contain particular children'
        },
        'aria-required-parent': {
          description: 'Ensures elements with an ARIA role that require parent roles are contained by them',
          help: 'Certain ARIA roles must be contained by particular parents'
        },
        'aria-roles': {
          description: 'Ensures all elements with a role attribute use a valid value',
          help: 'ARIA roles used must conform to valid values'
        },
        'aria-valid-attr-value': {
          description: 'Ensures all ARIA attributes have valid values',
          help: 'ARIA attributes must conform to valid values'
        },
        'aria-valid-attr': {
          description: 'Ensures attributes that begin with aria- are valid ARIA attributes',
          help: 'ARIA attributes must conform to valid names'
        },
        'audio-caption': {
          description: 'Ensures <audio> elements have captions',
          help: '<audio> elements must have a captions track'
        },
        'autocomplete-valid': {
          description: 'Ensure the autocomplete attribute is correct and suitable for the form field',
          help: 'autocomplete attribute must be used correctly'
        },
        blink: {
          description: 'Ensures <blink> elements are not used',
          help: '<blink> elements are deprecated and must not be used'
        },
        'button-name': {
          description: 'Ensures buttons have discernible text',
          help: 'Buttons must have discernible text'
        },
        bypass: {
          description: 'Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content',
          help: 'Page must have means to bypass repeated blocks'
        },
        checkboxgroup: {
          description: 'Ensures related <input type="checkbox"> elements have a group and that the group designation is consistent',
          help: 'Checkbox inputs with the same name attribute value must be part of a group'
        },
        'color-contrast': {
          description: 'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast'
        },
        'css-orientation-lock': {
          description: 'Ensures content is not locked to any specific display orientation, and the content is operable in all display orientations',
          help: 'CSS Media queries are not used to lock display orientation'
        },
        'definition-list': {
          description: 'Ensures <dl> elements are structured correctly',
          help: '<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script> or <template> elements'
        },
        dlitem: {
          description: 'Ensures <dt> and <dd> elements are contained by a <dl>',
          help: '<dt> and <dd> elements must be contained by a <dl>'
        },
        'document-title': {
          description: 'Ensures each HTML document contains a non-empty <title> element',
          help: 'Documents must have <title> element to aid in navigation'
        },
        'duplicate-id-active': {
          description: 'Ensures every id attribute value of active elements is unique',
          help: 'IDs of active elements must be unique'
        },
        'duplicate-id-aria': {
          description: 'Ensures every id attribute value used in ARIA and in labels is unique',
          help: 'IDs used in ARIA and labels must be unique'
        },
        'duplicate-id': {
          description: 'Ensures every id attribute value is unique',
          help: 'id attribute value must be unique'
        },
        'empty-heading': {
          description: 'Ensures headings have discernible text',
          help: 'Headings must not be empty'
        },
        'focus-order-semantics': {
          description: 'Ensures elements in the focus order have an appropriate role',
          help: 'Elements in the focus order need a role appropriate for interactive content'
        },
        'frame-tested': {
          description: 'Ensures <iframe> and <frame> elements contain the axe-core script',
          help: 'Frames must be tested with axe-core'
        },
        'frame-title-unique': {
          description: 'Ensures <iframe> and <frame> elements contain a unique title attribute',
          help: 'Frames must have a unique title attribute'
        },
        'frame-title': {
          description: 'Ensures <iframe> and <frame> elements contain a non-empty title attribute',
          help: 'Frames must have title attribute'
        },
        'heading-order': {
          description: 'Ensures the order of headings is semantically correct',
          help: 'Heading levels should only increase by one'
        },
        'hidden-content': {
          description: 'Informs users about hidden content.',
          help: 'Hidden content on the page cannot be analyzed'
        },
        'html-has-lang': {
          description: 'Ensures every HTML document has a lang attribute',
          help: '<html> element must have a lang attribute'
        },
        'html-lang-valid': {
          description: 'Ensures the lang attribute of the <html> element has a valid value',
          help: '<html> element must have a valid value for the lang attribute'
        },
        'html-xml-lang-mismatch': {
          description: 'Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page',
          help: 'HTML elements with lang and xml:lang must have the same base language'
        },
        'image-alt': {
          description: 'Ensures <img> elements have alternate text or a role of none or presentation',
          help: 'Images must have alternate text'
        },
        'image-redundant-alt': {
          description: 'Ensure button and link text is not repeated as image alternative',
          help: 'Text of buttons and links should not be repeated in the image alternative'
        },
        'input-image-alt': {
          description: 'Ensures <input type="image"> elements have alternate text',
          help: 'Image buttons must have alternate text'
        },
        'label-title-only': {
          description: 'Ensures that every form element is not solely labeled using the title or aria-describedby attributes',
          help: 'Form elements should have a visible label'
        },
        label: {
          description: 'Ensures every form element has a label',
          help: 'Form elements must have labels'
        },
        'landmark-banner-is-top-level': {
          description: 'Ensures the banner landmark is at top level',
          help: 'Banner landmark must not be contained in another landmark'
        },
        'landmark-contentinfo-is-top-level': {
          description: 'Ensures the contentinfo landmark is at top level',
          help: 'Contentinfo landmark must not be contained in another landmark'
        },
        'landmark-main-is-top-level': {
          description: 'Ensures the main landmark is at top level',
          help: 'Main landmark must not be contained in another landmark'
        },
        'landmark-no-duplicate-banner': {
          description: 'Ensures the page has at most one banner landmark',
          help: 'Page must not have more than one banner landmark'
        },
        'landmark-no-duplicate-contentinfo': {
          description: 'Ensures the page has at most one contentinfo landmark',
          help: 'Page must not have more than one contentinfo landmark'
        },
        'landmark-one-main': {
          description: 'Ensures the page has only one main landmark and each iframe in the page has at most one main landmark',
          help: 'Page must have one main landmark'
        },
        'layout-table': {
          description: 'Ensures presentational <table> elements do not use <th>, <caption> elements or the summary attribute',
          help: 'Layout tables must not use data table elements'
        },
        'link-in-text-block': {
          description: 'Links can be distinguished without relying on color',
          help: 'Links must be distinguished from surrounding text in a way that does not rely on color'
        },
        'link-name': {
          description: 'Ensures links have discernible text',
          help: 'Links must have discernible text'
        },
        list: {
          description: 'Ensures that lists are structured correctly',
          help: '<ul> and <ol> must only directly contain <li>, <script> or <template> elements'
        },
        listitem: {
          description: 'Ensures <li> elements are used semantically',
          help: '<li> elements must be contained in a <ul> or <ol>'
        },
        marquee: {
          description: 'Ensures <marquee> elements are not used',
          help: '<marquee> elements are deprecated and must not be used'
        },
        'meta-refresh': {
          description: 'Ensures <meta http-equiv="refresh"> is not used',
          help: 'Timed refresh must not exist'
        },
        'meta-viewport-large': {
          description: 'Ensures <meta name="viewport"> can scale a significant amount',
          help: 'Users should be able to zoom and scale the text up to 500%'
        },
        'meta-viewport': {
          description: 'Ensures <meta name="viewport"> does not disable text scaling and zooming',
          help: 'Zooming and scaling must not be disabled'
        },
        'object-alt': {
          description: 'Ensures <object> elements have alternate text',
          help: '<object> elements must have alternate text'
        },
        'p-as-heading': {
          description: 'Ensure p elements are not used to style headings',
          help: 'Bold, italic text and font-size are not used to style p elements as a heading'
        },
        'page-has-heading-one': {
          description: 'Ensure that the page, or at least one of its frames contains a level-one heading',
          help: 'Page must contain a level-one heading'
        },
        radiogroup: {
          description: 'Ensures related <input type="radio"> elements have a group and that the group designation is consistent',
          help: 'Radio inputs with the same name attribute value must be part of a group'
        },
        region: {
          description: 'Ensures all page content is contained by landmarks',
          help: 'All page content must be contained by landmarks'
        },
        'scope-attr-valid': {
          description: 'Ensures the scope attribute is used correctly on tables',
          help: 'scope attribute should be used correctly'
        },
        'server-side-image-map': {
          description: 'Ensures that server-side image maps are not used',
          help: 'Server-side image maps must not be used'
        },
        'skip-link': {
          description: 'Ensure all skip links have a focusable target',
          help: 'The skip-link target should exist and be focusable'
        },
        tabindex: {
          description: 'Ensures tabindex attribute values are not greater than 0',
          help: 'Elements should not have tabindex greater than zero'
        },
        'table-duplicate-name': {
          description: 'Ensure that tables do not have the same summary and caption',
          help: 'The <caption> element should not contain the same text as the summary attribute'
        },
        'table-fake-caption': {
          description: 'Ensure that tables with a caption use the <caption> element.',
          help: 'Data or header cells should not be used to give caption to a data table.'
        },
        'td-has-header': {
          description: 'Ensure that each non-empty data cell in a large table has one or more table headers',
          help: 'All non-empty td element in table larger than 3 by 3 must have an associated table header'
        },
        'td-headers-attr': {
          description: 'Ensure that each cell in a table using the headers refers to another cell in that table',
          help: 'All cells in a table element that use the headers attribute must only refer to other cells of that same table'
        },
        'th-has-data-cells': {
          description: 'Ensure that each table header in a data table refers to data cells',
          help: 'All th elements and elements with role=columnheader/rowheader must have data cells they describe'
        },
        'valid-lang': {
          description: 'Ensures lang attributes have valid values',
          help: 'lang attribute must have a valid value'
        },
        'video-caption': {
          description: 'Ensures <video> elements have captions',
          help: '<video> elements must have captions'
        },
        'video-description': {
          description: 'Ensures <video> elements have audio descriptions',
          help: '<video> elements must have an audio description track'
        }
      },
      checks: {
        accesskeys: {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Accesskey attribute value is unique';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Document has multiple elements with the same accesskey';
              return out;
            }
          }
        },
        'non-empty-alt': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element has a non-empty alt attribute';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element has no alt attribute or the alt attribute is empty';
              return out;
            }
          }
        },
        'non-empty-title': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element has a title attribute';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element has no title attribute or the title attribute is empty';
              return out;
            }
          }
        },
        'aria-label': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'aria-label attribute exists and is not empty';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'aria-label attribute does not exist or is empty';
              return out;
            }
          }
        },
        'aria-labelledby': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'aria-labelledby attribute exists and references elements that are visible to screen readers';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty';
              return out;
            }
          }
        },
        'aria-allowed-attr': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'ARIA attributes are used correctly for the defined role';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'ARIA attribute' + (it.data && it.data.length > 1 ? 's are' : ' is') + ' not allowed:';
              var arr1 = it.data;
              if (arr1) {
                var value, i1 = -1, l1 = arr1.length - 1;
                while (i1 < l1) {
                  value = arr1[i1 += 1];
                  out += ' ' + value;
                }
              }
              return out;
            }
          }
        },
        'aria-allowed-role': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'ARIA role is allowed for given element';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'role' + (it.data && it.data.length > 1 ? 's' : '') + ' ' + it.data.join(', ') + ' ' + (it.data && it.data.length > 1 ? 'are' : ' is') + ' not allowed for given element';
              return out;
            }
          }
        },
        'implicit-role-fallback': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element’s implicit ARIA role is an appropriate fallback';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element’s implicit ARIA role is not a good fallback for the (unsupported) role';
              return out;
            }
          }
        },
        'aria-hidden-body': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'No aria-hidden attribute is present on document body';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'aria-hidden=true should not be present on the document body';
              return out;
            }
          }
        },
        'aria-required-attr': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'All required ARIA attributes are present';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Required ARIA attribute' + (it.data && it.data.length > 1 ? 's' : '') + ' not present:';
              var arr1 = it.data;
              if (arr1) {
                var value, i1 = -1, l1 = arr1.length - 1;
                while (i1 < l1) {
                  value = arr1[i1 += 1];
                  out += ' ' + value;
                }
              }
              return out;
            }
          }
        },
        'aria-required-children': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Required ARIA children are present';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Required ARIA ' + (it.data && it.data.length > 1 ? 'children' : 'child') + ' role not present:';
              var arr1 = it.data;
              if (arr1) {
                var value, i1 = -1, l1 = arr1.length - 1;
                while (i1 < l1) {
                  value = arr1[i1 += 1];
                  out += ' ' + value;
                }
              }
              return out;
            },
            incomplete: function anonymous(it) {
              var out = 'Expecting ARIA ' + (it.data && it.data.length > 1 ? 'children' : 'child') + ' role to be added:';
              var arr1 = it.data;
              if (arr1) {
                var value, i1 = -1, l1 = arr1.length - 1;
                while (i1 < l1) {
                  value = arr1[i1 += 1];
                  out += ' ' + value;
                }
              }
              return out;
            }
          }
        },
        'aria-required-parent': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Required ARIA parent role present';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Required ARIA parent' + (it.data && it.data.length > 1 ? 's' : '') + ' role not present:';
              var arr1 = it.data;
              if (arr1) {
                var value, i1 = -1, l1 = arr1.length - 1;
                while (i1 < l1) {
                  value = arr1[i1 += 1];
                  out += ' ' + value;
                }
              }
              return out;
            }
          }
        },
        invalidrole: {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'ARIA role is valid';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Role must be one of the valid ARIA roles';
              return out;
            }
          }
        },
        abstractrole: {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Abstract roles are not used';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Abstract roles cannot be directly used';
              return out;
            }
          }
        },
        unsupportedrole: {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'ARIA role is supported';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'The role used is not widely supported in assistive technologies';
              return out;
            }
          }
        },
        'aria-valid-attr-value': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'ARIA attribute values are valid';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Invalid ARIA attribute value' + (it.data && it.data.length > 1 ? 's' : '') + ':';
              var arr1 = it.data;
              if (arr1) {
                var value, i1 = -1, l1 = arr1.length - 1;
                while (i1 < l1) {
                  value = arr1[i1 += 1];
                  out += ' ' + value;
                }
              }
              return out;
            }
          }
        },
        'aria-errormessage': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Uses a supported aria-errormessage technique';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'aria-errormessage value' + (it.data && it.data.length > 1 ? 's' : '') + ' ';
              var arr1 = it.data;
              if (arr1) {
                var value, i1 = -1, l1 = arr1.length - 1;
                while (i1 < l1) {
                  value = arr1[i1 += 1];
                  out += ' `' + value;
                }
              }
              out += '` must use a technique to announce the message (e.g., aria-live, aria-describedby, role=alert, etc.)';
              return out;
            }
          }
        },
        'aria-valid-attr': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'ARIA attribute name' + (it.data && it.data.length > 1 ? 's' : '') + ' are valid';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Invalid ARIA attribute name' + (it.data && it.data.length > 1 ? 's' : '') + ':';
              var arr1 = it.data;
              if (arr1) {
                var value, i1 = -1, l1 = arr1.length - 1;
                while (i1 < l1) {
                  value = arr1[i1 += 1];
                  out += ' ' + value;
                }
              }
              return out;
            }
          }
        },
        caption: {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'The multimedia element has a captions track';
              return out;
            },
            incomplete: function anonymous(it) {
              var out = 'Check that captions is available for the element';
              return out;
            }
          }
        },
        'autocomplete-valid': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'the autocomplete attribute is correctly formatted';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'the autocomplete attribute is incorrectly formatted';
              return out;
            }
          }
        },
        'autocomplete-appropriate': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'the autocomplete value is on an appropriate element';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'the autocomplete value is inappropriate for this type of input';
              return out;
            }
          }
        },
        'is-on-screen': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element is not visible';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element is visible';
              return out;
            }
          }
        },
        'non-empty-if-present': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element ';
              if (it.data) {
                out += 'has a non-empty value attribute';
              } else {
                out += 'does not have a value attribute';
              }
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element has a value attribute and the value attribute is empty';
              return out;
            }
          }
        },
        'non-empty-value': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element has a non-empty value attribute';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element has no value attribute or the value attribute is empty';
              return out;
            }
          }
        },
        'button-has-visible-text': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element has inner text that is visible to screen readers';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element does not have inner text that is visible to screen readers';
              return out;
            }
          }
        },
        'role-presentation': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element\'s default semantics were overriden with role="presentation"';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element\'s default semantics were not overridden with role="presentation"';
              return out;
            }
          }
        },
        'role-none': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element\'s default semantics were overriden with role="none"';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element\'s default semantics were not overridden with role="none"';
              return out;
            }
          }
        },
        'focusable-no-name': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element is not in tab order or has accessible text';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element is in tab order and does not have accessible text';
              return out;
            }
          }
        },
        'internal-link-present': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Valid skip link found';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'No valid skip link found';
              return out;
            }
          }
        },
        'header-present': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Page has a header';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Page does not have a header';
              return out;
            }
          }
        },
        landmark: {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Page has a landmark region';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Page does not have a landmark region';
              return out;
            }
          }
        },
        'group-labelledby': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'All elements with the name "' + it.data.name + '" reference the same element with aria-labelledby';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'All elements with the name "' + it.data.name + '" do not reference the same element with aria-labelledby';
              return out;
            }
          }
        },
        fieldset: {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element is contained in a fieldset';
              return out;
            },
            fail: function anonymous(it) {
              var out = '';
              var code = it.data && it.data.failureCode;
              if (code === 'no-legend') {
                out += 'Fieldset does not have a legend as its first child';
              } else if (code === 'empty-legend') {
                out += 'Legend does not have text that is visible to screen readers';
              } else if (code === 'mixed-inputs') {
                out += 'Fieldset contains unrelated inputs';
              } else if (code === 'no-group-label') {
                out += 'ARIA group does not have aria-label or aria-labelledby';
              } else if (code === 'group-mixed-inputs') {
                out += 'ARIA group contains unrelated inputs';
              } else {
                out += 'Element does not have a containing fieldset or ARIA group';
              }
              return out;
            }
          }
        },
        'color-contrast': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element has sufficient color contrast of ' + it.data.contrastRatio;
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element has insufficient color contrast of ' + it.data.contrastRatio + ' (foreground color: ' + it.data.fgColor + ', background color: ' + it.data.bgColor + ', font size: ' + it.data.fontSize + ', font weight: ' + it.data.fontWeight + '). Expected contrast ratio of ' + it.data.expectedContrastRatio;
              return out;
            },
            incomplete: {
              bgImage: 'Element\'s background color could not be determined due to a background image',
              bgGradient: 'Element\'s background color could not be determined due to a background gradient',
              imgNode: 'Element\'s background color could not be determined because element contains an image node',
              bgOverlap: 'Element\'s background color could not be determined because it is overlapped by another element',
              fgAlpha: 'Element\'s foreground color could not be determined because of alpha transparency',
              elmPartiallyObscured: 'Element\'s background color could not be determined because it\'s partially obscured by another element',
              elmPartiallyObscuring: 'Element\'s background color could not be determined because it partially overlaps other elements',
              outsideViewport: 'Element\'s background color could not be determined because it\'s outside the viewport',
              equalRatio: 'Element has a 1:1 contrast ratio with the background',
              shortTextContent: 'Element content is too short to determine if it is actual text content',
              default: 'Unable to determine contrast ratio'
            }
          }
        },
        'css-orientation-lock': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Display is operable, and orientation lock does not exist';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'CSS Orientation lock is applied, and makes display inoperable';
              return out;
            }
          }
        },
        'structured-dlitems': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'When not empty, element has both <dt> and <dd> elements';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'When not empty, element does not have at least one <dt> element followed by at least one <dd> element';
              return out;
            }
          }
        },
        'only-dlitems': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'List element only has direct children that are allowed inside <dt> or <dd> elements';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'List element has direct children that are not allowed inside <dt> or <dd> elements';
              return out;
            }
          }
        },
        dlitem: {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Description list item has a <dl> parent element';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Description list item does not have a <dl> parent element';
              return out;
            }
          }
        },
        'doc-has-title': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Document has a non-empty <title> element';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Document does not have a non-empty <title> element';
              return out;
            }
          }
        },
        'duplicate-id-active': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Document has no active elements that share the same id attribute';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Document has active elements with the same id attribute: ' + it.data;
              return out;
            }
          }
        },
        'duplicate-id-aria': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Document has no elements referenced with ARIA or labels that share the same id attribute';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Document has multiple elements referenced with ARIA with the same id attribute: ' + it.data;
              return out;
            }
          }
        },
        'duplicate-id': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Document has no static elements that share the same id attribute';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Document has multiple static elements with the same id attribute';
              return out;
            }
          }
        },
        'has-visible-text': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element has text that is visible to screen readers';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element does not have text that is visible to screen readers';
              return out;
            }
          }
        },
        'has-widget-role': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element has a widget role.';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element does not have a widget role.';
              return out;
            }
          }
        },
        'valid-scrollable-semantics': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element has valid semantics for an element in the focus order.';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element has invalid semantics for an element in the focus order.';
              return out;
            }
          }
        },
        'frame-tested': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'The iframe was tested with axe-core';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'The iframe could not be tested with axe-core';
              return out;
            },
            incomplete: function anonymous(it) {
              var out = 'The iframe still has to be tested with axe-core';
              return out;
            }
          }
        },
        'unique-frame-title': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element\'s title attribute is unique';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element\'s title attribute is not unique';
              return out;
            }
          }
        },
        'heading-order': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Heading order valid';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Heading order invalid';
              return out;
            }
          }
        },
        'hidden-content': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'All content on the page has been analyzed.';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'There were problems analyzing the content on this page.';
              return out;
            },
            incomplete: function anonymous(it) {
              var out = 'There is hidden content on the page that was not analyzed. You will need to trigger the display of this content in order to analyze it.';
              return out;
            }
          }
        },
        'has-lang': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'The <html> element has a lang attribute';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'The <html> element does not have a lang attribute';
              return out;
            }
          }
        },
        'valid-lang': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Value of lang attribute is included in the list of valid languages';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Value of lang attribute not included in the list of valid languages';
              return out;
            }
          }
        },
        'xml-lang-mismatch': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Lang and xml:lang attributes have the same base language';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Lang and xml:lang attributes do not have the same base language';
              return out;
            }
          }
        },
        'has-alt': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element has an alt attribute';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element does not have an alt attribute';
              return out;
            }
          }
        },
        'duplicate-img-label': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element does not duplicate existing text in <img> alt text';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element contains <img> element with alt text that duplicates existing text';
              return out;
            }
          }
        },
        'title-only': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Form element does not solely use title attribute for its label';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Only title used to generate label for form element';
              return out;
            }
          }
        },
        'implicit-label': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Form element has an implicit (wrapped) <label>';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Form element does not have an implicit (wrapped) <label>';
              return out;
            }
          }
        },
        'explicit-label': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Form element has an explicit <label>';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Form element does not have an explicit <label>';
              return out;
            }
          }
        },
        'help-same-as-label': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Help text (title or aria-describedby) does not duplicate label text';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Help text (title or aria-describedby) text is the same as the label text';
              return out;
            }
          }
        },
        'multiple-label': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Form element does not have multiple <label> elements';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Form element has multiple <label> elements';
              return out;
            }
          }
        },
        'hidden-explicit-label': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Form element has a visible explicit <label>';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Form element has explicit <label> that is hidden';
              return out;
            }
          }
        },
        'landmark-is-top-level': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'The ' + it.data.role + ' landmark is at the top level.';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'The ' + it.data.role + ' landmark is contained in another landmark.';
              return out;
            }
          }
        },
        'page-no-duplicate-banner': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Document has no more than one banner landmark';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Document has more than one banner landmark';
              return out;
            }
          }
        },
        'page-no-duplicate-contentinfo': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Page does not have more than one contentinfo landmark';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Page has more than one contentinfo landmark';
              return out;
            }
          }
        },
        'page-has-main': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Page has at least one main landmark';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Page does not have a main landmark';
              return out;
            }
          }
        },
        'page-no-duplicate-main': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Page does not have more than one main landmark';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Page has more than one main landmark';
              return out;
            }
          }
        },
        'has-th': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Layout table does not use <th> elements';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Layout table uses <th> elements';
              return out;
            }
          }
        },
        'has-caption': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Layout table does not use <caption> element';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Layout table uses <caption> element';
              return out;
            }
          }
        },
        'has-summary': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Layout table does not use summary attribute';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Layout table uses summary attribute';
              return out;
            }
          }
        },
        'link-in-text-block': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Links can be distinguished from surrounding text in some way other than by color';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Links need to be distinguished from surrounding text in some way other than by color';
              return out;
            },
            incomplete: {
              bgContrast: 'Element\'s contrast ratio could not be determined. Check for a distinct hover/focus style',
              bgImage: 'Element\'s contrast ratio could not be determined due to a background image',
              bgGradient: 'Element\'s contrast ratio could not be determined due to a background gradient',
              imgNode: 'Element\'s contrast ratio could not be determined because element contains an image node',
              bgOverlap: 'Element\'s contrast ratio could not be determined because of element overlap',
              default: 'Unable to determine contrast ratio'
            }
          }
        },
        'only-listitems': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'List element only has direct children that are allowed inside <li> elements';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'List element has direct children that are not allowed inside <li> elements';
              return out;
            }
          }
        },
        listitem: {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'List item has a <ul>, <ol> or role="list" parent element';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'List item does not have a <ul>, <ol> or role="list" parent element';
              return out;
            }
          }
        },
        'meta-refresh': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = '<meta> tag does not immediately refresh the page';
              return out;
            },
            fail: function anonymous(it) {
              var out = '<meta> tag forces timed refresh of page';
              return out;
            }
          }
        },
        'meta-viewport-large': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = '<meta> tag does not prevent significant zooming on mobile devices';
              return out;
            },
            fail: function anonymous(it) {
              var out = '<meta> tag limits zooming on mobile devices';
              return out;
            }
          }
        },
        'meta-viewport': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = '<meta> tag does not disable zooming on mobile devices';
              return out;
            },
            fail: function anonymous(it) {
              var out = '' + it.data + ' on <meta> tag disables zooming on mobile devices';
              return out;
            }
          }
        },
        'p-as-heading': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = '<p> elements are not styled as headings';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Heading elements should be used instead of styled p elements';
              return out;
            }
          }
        },
        'page-has-heading-one': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Page has at least one level-one heading';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Page must have a level-one heading';
              return out;
            }
          }
        },
        region: {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'All page content is contained by landmarks';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Some page content is not contained by landmarks';
              return out;
            }
          }
        },
        'html5-scope': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Scope attribute is only used on table header elements (<th>)';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'In HTML 5, scope attributes may only be used on table header elements (<th>)';
              return out;
            }
          }
        },
        'scope-value': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Scope attribute is used correctly';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'The value of the scope attribute may only be \'row\' or \'col\'';
              return out;
            }
          }
        },
        exists: {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element does not exist';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element exists';
              return out;
            }
          }
        },
        'skip-link': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Skip link target exists';
              return out;
            },
            incomplete: function anonymous(it) {
              var out = 'Skip link target should become visible on activation';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'No skip link target';
              return out;
            }
          }
        },
        tabindex: {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element does not have a tabindex greater than 0';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element has a tabindex greater than 0';
              return out;
            }
          }
        },
        'same-caption-summary': {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Content of summary attribute and <caption> are not duplicated';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Content of summary attribute and <caption> element are identical';
              return out;
            }
          }
        },
        'caption-faked': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'The first row of a table is not used as a caption';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'The first row of the table should be a caption instead of a table cell';
              return out;
            }
          }
        },
        'td-has-header': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'All non-empty data cells have table headers';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Some non-empty data cells do not have table headers';
              return out;
            }
          }
        },
        'td-headers-attr': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'The headers attribute is exclusively used to refer to other cells in the table';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'The headers attribute is not exclusively used to refer to other cells in the table';
              return out;
            }
          }
        },
        'th-has-data-cells': {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'All table header cells refer to data cells';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Not all table header cells refer to data cells';
              return out;
            },
            incomplete: function anonymous(it) {
              var out = 'Table data cells are missing or empty';
              return out;
            }
          }
        },
        description: {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'The multimedia element has an audio description track';
              return out;
            },
            incomplete: function anonymous(it) {
              var out = 'Check that audio description is available for the element';
              return out;
            }
          }
        }
      },
      failureSummaries: {
        any: {
          failureMessage: function anonymous(it) {
            var out = 'Fix any of the following:';
            var arr1 = it;
            if (arr1) {
              var value, i1 = -1, l1 = arr1.length - 1;
              while (i1 < l1) {
                value = arr1[i1 += 1];
                out += '\n  ' + value.split('\n').join('\n  ');
              }
            }
            return out;
          }
        },
        none: {
          failureMessage: function anonymous(it) {
            var out = 'Fix all of the following:';
            var arr1 = it;
            if (arr1) {
              var value, i1 = -1, l1 = arr1.length - 1;
              while (i1 < l1) {
                value = arr1[i1 += 1];
                out += '\n  ' + value.split('\n').join('\n  ');
              }
            }
            return out;
          }
        }
      },
      incompleteFallbackMessage: function anonymous(it) {
        var out = 'aXe couldn\'t tell the reason. Time to break out the element inspector!';
        return out;
      }
    },
    rules: [ {
      id: 'accesskeys',
      selector: '[accesskey]',
      excludeHidden: false,
      tags: [ 'best-practice', 'cat.keyboard' ],
      all: [],
      any: [],
      none: [ 'accesskeys' ]
    }, {
      id: 'area-alt',
      selector: 'map area[href]',
      excludeHidden: false,
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag111', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'non-empty-alt', 'non-empty-title', 'aria-label', 'aria-labelledby' ],
      none: []
    }, {
      id: 'aria-allowed-attr',
      matches: function matches(node, virtualNode) {
        var role = node.getAttribute('role');
        if (!role) {
          role = axe.commons.aria.implicitRole(node);
        }
        var allowed = axe.commons.aria.allowedAttr(role);
        if (role && allowed) {
          var aria = /^aria-/;
          if (node.hasAttributes()) {
            var attrs = node.attributes;
            for (var i = 0, l = attrs.length; i < l; i++) {
              if (aria.test(attrs[i].name)) {
                return true;
              }
            }
          }
        }
        return false;
      },
      tags: [ 'cat.aria', 'wcag2a', 'wcag412' ],
      all: [],
      any: [ 'aria-allowed-attr' ],
      none: []
    }, {
      id: 'aria-allowed-role',
      excludeHidden: false,
      selector: '[role]',
      matches: function matches(node, virtualNode) {
        return axe.commons.aria.getRole(node, {
          noImplicit: true,
          dpub: true,
          fallback: true
        }) !== null;
      },
      tags: [ 'cat.aria', 'best-practice' ],
      all: [],
      any: [ {
        options: {
          allowImplicit: true,
          ignoredTags: []
        },
        id: 'aria-allowed-role'
      } ],
      none: []
    }, {
      id: 'aria-dpub-role-fallback',
      selector: '[role]',
      matches: function matches(node, virtualNode) {
        var role = node.getAttribute('role');
        return [ 'doc-backlink', 'doc-biblioentry', 'doc-biblioref', 'doc-cover', 'doc-endnote', 'doc-glossref', 'doc-noteref' ].includes(role);
      },
      tags: [ 'cat.aria', 'wcag2a', 'wcag131' ],
      all: [ 'implicit-role-fallback' ],
      any: [],
      none: []
    }, {
      id: 'aria-hidden-body',
      selector: 'body',
      excludeHidden: false,
      tags: [ 'cat.aria', 'wcag2a', 'wcag412' ],
      all: [],
      any: [ 'aria-hidden-body' ],
      none: []
    }, {
      id: 'aria-required-attr',
      selector: '[role]',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412' ],
      all: [],
      any: [ 'aria-required-attr' ],
      none: []
    }, {
      id: 'aria-required-children',
      selector: '[role]',
      tags: [ 'cat.aria', 'wcag2a', 'wcag131' ],
      all: [],
      any: [ {
        options: {
          reviewEmpty: [ 'listbox' ]
        },
        id: 'aria-required-children'
      } ],
      none: []
    }, {
      id: 'aria-required-parent',
      selector: '[role]',
      tags: [ 'cat.aria', 'wcag2a', 'wcag131' ],
      all: [],
      any: [ 'aria-required-parent' ],
      none: []
    }, {
      id: 'aria-roles',
      selector: '[role]',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412' ],
      all: [],
      any: [],
      none: [ 'invalidrole', 'abstractrole', 'unsupportedrole' ]
    }, {
      id: 'aria-valid-attr-value',
      matches: function matches(node, virtualNode) {
        var aria = /^aria-/;
        if (node.hasAttributes()) {
          var attrs = node.attributes;
          for (var i = 0, l = attrs.length; i < l; i++) {
            if (aria.test(attrs[i].name)) {
              return true;
            }
          }
        }
        return false;
      },
      tags: [ 'cat.aria', 'wcag2a', 'wcag412' ],
      all: [ {
        options: [],
        id: 'aria-valid-attr-value'
      }, 'aria-errormessage' ],
      any: [],
      none: []
    }, {
      id: 'aria-valid-attr',
      matches: function matches(node, virtualNode) {
        var aria = /^aria-/;
        if (node.hasAttributes()) {
          var attrs = node.attributes;
          for (var i = 0, l = attrs.length; i < l; i++) {
            if (aria.test(attrs[i].name)) {
              return true;
            }
          }
        }
        return false;
      },
      tags: [ 'cat.aria', 'wcag2a', 'wcag412' ],
      all: [],
      any: [ {
        options: [],
        id: 'aria-valid-attr'
      } ],
      none: []
    }, {
      id: 'audio-caption',
      selector: 'audio',
      enabled: false,
      excludeHidden: false,
      tags: [ 'cat.time-and-media', 'wcag2a', 'wcag121', 'section508', 'section508.22.a' ],
      all: [],
      any: [],
      none: [ 'caption' ]
    }, {
      id: 'autocomplete-valid',
      matches: function matches(node, virtualNode) {
        var _axe$commons = axe.commons, text = _axe$commons.text, aria = _axe$commons.aria, dom = _axe$commons.dom;
        var autocomplete = node.getAttribute('autocomplete');
        if (!autocomplete || text.sanitize(autocomplete) === '') {
          return false;
        }
        var nodeName = node.nodeName.toUpperCase();
        if ([ 'TEXTAREA', 'INPUT', 'SELECT' ].includes(nodeName) === false) {
          return false;
        }
        var excludedInputTypes = [ 'submit', 'reset', 'button', 'hidden' ];
        if (nodeName === 'INPUT' && excludedInputTypes.includes(node.type)) {
          return false;
        }
        var ariaDisabled = node.getAttribute('aria-disabled') || 'false';
        if (node.disabled || ariaDisabled.toLowerCase() === 'true') {
          return false;
        }
        var role = node.getAttribute('role');
        var tabIndex = node.getAttribute('tabindex');
        if (tabIndex === '-1' && role) {
          var roleDef = aria.lookupTable.role[role];
          if (roleDef === undefined || roleDef.type !== 'widget') {
            return false;
          }
        }
        if (tabIndex === '-1' && !dom.isVisible(node, false) && !dom.isVisible(node, true)) {
          return false;
        }
        return true;
      },
      tags: [ 'cat.forms', 'wcag21aa', 'wcag135' ],
      all: [ 'autocomplete-valid', 'autocomplete-appropriate' ],
      any: [],
      none: []
    }, {
      id: 'blink',
      selector: 'blink',
      excludeHidden: false,
      tags: [ 'cat.time-and-media', 'wcag2a', 'wcag222', 'section508', 'section508.22.j' ],
      all: [],
      any: [],
      none: [ 'is-on-screen' ]
    }, {
      id: 'button-name',
      selector: 'button, [role="button"], input[type="button"], input[type="submit"], input[type="reset"]',
      tags: [ 'cat.name-role-value', 'wcag2a', 'wcag412', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'non-empty-if-present', 'non-empty-value', 'button-has-visible-text', 'aria-label', 'aria-labelledby', 'role-presentation', 'role-none', 'non-empty-title' ],
      none: [ 'focusable-no-name' ]
    }, {
      id: 'bypass',
      selector: 'html',
      pageLevel: true,
      matches: function matches(node, virtualNode) {
        return !!node.querySelector('a[href]');
      },
      tags: [ 'cat.keyboard', 'wcag2a', 'wcag241', 'section508', 'section508.22.o' ],
      all: [],
      any: [ 'internal-link-present', 'header-present', 'landmark' ],
      none: []
    }, {
      id: 'checkboxgroup',
      selector: 'input[type=checkbox][name]',
      tags: [ 'cat.forms', 'best-practice' ],
      all: [],
      any: [ 'group-labelledby', 'fieldset' ],
      none: []
    }, {
      id: 'color-contrast',
      matches: function matches(node, virtualNode) {
        var nodeName = node.nodeName.toUpperCase(), nodeType = node.type;
        if (node.getAttribute('aria-disabled') === 'true' || axe.commons.dom.findUpVirtual(virtualNode, '[aria-disabled="true"]')) {
          return false;
        }
        if (nodeName === 'INPUT') {
          return [ 'hidden', 'range', 'color', 'checkbox', 'radio', 'image' ].indexOf(nodeType) === -1 && !node.disabled;
        }
        if (nodeName === 'SELECT') {
          return !!node.options.length && !node.disabled;
        }
        if (nodeName === 'TEXTAREA') {
          return !node.disabled;
        }
        if (nodeName === 'OPTION') {
          return false;
        }
        if (nodeName === 'BUTTON' && node.disabled || axe.commons.dom.findUpVirtual(virtualNode, 'button[disabled]')) {
          return false;
        }
        if (nodeName === 'FIELDSET' && node.disabled || axe.commons.dom.findUpVirtual(virtualNode, 'fieldset[disabled]')) {
          return false;
        }
        var nodeParentLabel = axe.commons.dom.findUpVirtual(virtualNode, 'label');
        if (nodeName === 'LABEL' || nodeParentLabel) {
          var relevantNode = node;
          var relevantVirtualNode = virtualNode;
          if (nodeParentLabel) {
            relevantNode = nodeParentLabel;
            relevantVirtualNode = axe.utils.getNodeFromTree(axe._tree[0], nodeParentLabel);
          }
          var doc = axe.commons.dom.getRootNode(relevantNode);
          var candidate = relevantNode.htmlFor && doc.getElementById(relevantNode.htmlFor);
          if (candidate && candidate.disabled) {
            return false;
          }
          var candidate = axe.utils.querySelectorAll(relevantVirtualNode, 'input:not([type="hidden"]):not([type="image"])' + ':not([type="button"]):not([type="submit"]):not([type="reset"]), select, textarea');
          if (candidate.length && candidate[0].actualNode.disabled) {
            return false;
          }
        }
        if (node.getAttribute('id')) {
          var id = axe.commons.utils.escapeSelector(node.getAttribute('id'));
          var _doc = axe.commons.dom.getRootNode(node);
          var candidate = _doc.querySelector('[aria-labelledby~=' + id + ']');
          if (candidate && candidate.disabled) {
            return false;
          }
        }
        if (axe.commons.text.visibleVirtual(virtualNode, false, true) === '') {
          return false;
        }
        var range = document.createRange(), childNodes = virtualNode.children, length = childNodes.length, child, index;
        for (index = 0; index < length; index++) {
          child = childNodes[index];
          if (child.actualNode.nodeType === 3 && axe.commons.text.sanitize(child.actualNode.nodeValue) !== '') {
            range.selectNodeContents(child.actualNode);
          }
        }
        var rects = range.getClientRects();
        length = rects.length;
        for (index = 0; index < length; index++) {
          if (axe.commons.dom.visuallyOverlaps(rects[index], node)) {
            return true;
          }
        }
        return false;
      },
      excludeHidden: false,
      options: {
        noScroll: false
      },
      tags: [ 'cat.color', 'wcag2aa', 'wcag143' ],
      all: [],
      any: [ 'color-contrast' ],
      none: []
    }, {
      id: 'css-orientation-lock',
      selector: 'html',
      tags: [ 'cat.structure', 'wcag262', 'wcag21aa', 'experimental' ],
      all: [ 'css-orientation-lock' ],
      any: [],
      none: [],
      preload: true
    }, {
      id: 'definition-list',
      selector: 'dl',
      matches: function matches(node, virtualNode) {
        return !node.getAttribute('role');
      },
      tags: [ 'cat.structure', 'wcag2a', 'wcag131' ],
      all: [],
      any: [],
      none: [ 'structured-dlitems', 'only-dlitems' ]
    }, {
      id: 'dlitem',
      selector: 'dd, dt',
      matches: function matches(node, virtualNode) {
        return !node.getAttribute('role');
      },
      tags: [ 'cat.structure', 'wcag2a', 'wcag131' ],
      all: [],
      any: [ 'dlitem' ],
      none: []
    }, {
      id: 'document-title',
      selector: 'html',
      matches: function matches(node, virtualNode) {
        return node.ownerDocument.defaultView.self === node.ownerDocument.defaultView.top;
      },
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag242' ],
      all: [],
      any: [ 'doc-has-title' ],
      none: []
    }, {
      id: 'duplicate-id-active',
      selector: '[id]',
      matches: function matches(node, virtualNode) {
        var _axe$commons2 = axe.commons, dom = _axe$commons2.dom, aria = _axe$commons2.aria;
        var id = node.getAttribute('id').trim();
        var idSelector = '*[id="' + axe.utils.escapeSelector(id) + '"]';
        var idMatchingElms = Array.from(dom.getRootNode(node).querySelectorAll(idSelector));
        return idMatchingElms.some(dom.isFocusable) && !aria.isAccessibleRef(node);
      },
      excludeHidden: false,
      tags: [ 'cat.parsing', 'wcag2a', 'wcag411' ],
      all: [],
      any: [ 'duplicate-id-active' ],
      none: []
    }, {
      id: 'duplicate-id-aria',
      selector: '[id]',
      matches: function matches(node, virtualNode) {
        return axe.commons.aria.isAccessibleRef(node);
      },
      excludeHidden: false,
      tags: [ 'cat.parsing', 'wcag2a', 'wcag411' ],
      all: [],
      any: [ 'duplicate-id-aria' ],
      none: []
    }, {
      id: 'duplicate-id',
      selector: '[id]',
      matches: function matches(node, virtualNode) {
        var _axe$commons3 = axe.commons, dom = _axe$commons3.dom, aria = _axe$commons3.aria;
        var id = node.getAttribute('id').trim();
        var idSelector = '*[id="' + axe.utils.escapeSelector(id) + '"]';
        var idMatchingElms = Array.from(dom.getRootNode(node).querySelectorAll(idSelector));
        return idMatchingElms.every(function(elm) {
          return !dom.isFocusable(elm);
        }) && !aria.isAccessibleRef(node);
      },
      excludeHidden: false,
      tags: [ 'cat.parsing', 'wcag2a', 'wcag411' ],
      all: [],
      any: [ 'duplicate-id' ],
      none: []
    }, {
      id: 'empty-heading',
      selector: 'h1, h2, h3, h4, h5, h6, [role="heading"]',
      matches: function matches(node, virtualNode) {
        var explicitRoles = void 0;
        if (node.hasAttribute('role')) {
          explicitRoles = node.getAttribute('role').split(/\s+/i).filter(axe.commons.aria.isValidRole);
        }
        if (explicitRoles && explicitRoles.length > 0) {
          return explicitRoles.includes('heading');
        } else {
          return axe.commons.aria.implicitRole(node) === 'heading';
        }
      },
      tags: [ 'cat.name-role-value', 'best-practice' ],
      all: [],
      any: [ 'has-visible-text' ],
      none: []
    }, {
      id: 'focus-order-semantics',
      selector: 'div, h1, h2, h3, h4, h5, h6, [role=heading], p, span',
      matches: function matches(node, virtualNode) {
        return axe.commons.dom.insertedIntoFocusOrder(node);
      },
      tags: [ 'cat.keyboard', 'best-practice', 'experimental' ],
      all: [],
      any: [ {
        options: [],
        id: 'has-widget-role'
      }, {
        options: [],
        id: 'valid-scrollable-semantics'
      } ],
      none: []
    }, {
      id: 'frame-tested',
      selector: 'frame, iframe',
      tags: [ 'cat.structure', 'review-item' ],
      all: [ {
        options: {
          isViolation: false
        },
        id: 'frame-tested'
      } ],
      any: [],
      none: []
    }, {
      id: 'frame-title-unique',
      selector: 'frame[title], iframe[title]',
      matches: function matches(node, virtualNode) {
        var title = node.getAttribute('title');
        return !!(title ? axe.commons.text.sanitize(title).trim() : '');
      },
      tags: [ 'cat.text-alternatives', 'best-practice' ],
      all: [],
      any: [],
      none: [ 'unique-frame-title' ]
    }, {
      id: 'frame-title',
      selector: 'frame, iframe',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag241', 'wcag412', 'section508', 'section508.22.i' ],
      all: [],
      any: [ 'aria-label', 'aria-labelledby', 'non-empty-title', 'role-presentation', 'role-none' ],
      none: []
    }, {
      id: 'heading-order',
      selector: 'h1, h2, h3, h4, h5, h6, [role=heading]',
      matches: function matches(node, virtualNode) {
        var explicitRoles = void 0;
        if (node.hasAttribute('role')) {
          explicitRoles = node.getAttribute('role').split(/\s+/i).filter(axe.commons.aria.isValidRole);
        }
        if (explicitRoles && explicitRoles.length > 0) {
          return explicitRoles.includes('heading');
        } else {
          return axe.commons.aria.implicitRole(node) === 'heading';
        }
      },
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ 'heading-order' ],
      none: []
    }, {
      id: 'hidden-content',
      selector: '*',
      excludeHidden: false,
      tags: [ 'cat.structure', 'experimental', 'review-item' ],
      all: [],
      any: [ 'hidden-content' ],
      none: []
    }, {
      id: 'html-has-lang',
      selector: 'html',
      tags: [ 'cat.language', 'wcag2a', 'wcag311' ],
      all: [],
      any: [ 'has-lang' ],
      none: []
    }, {
      id: 'html-lang-valid',
      selector: 'html[lang]',
      tags: [ 'cat.language', 'wcag2a', 'wcag311' ],
      all: [],
      any: [],
      none: [ 'valid-lang' ]
    }, {
      id: 'html-xml-lang-mismatch',
      selector: 'html[lang][xml\\:lang]',
      matches: function matches(node, virtualNode) {
        var getBaseLang = axe.commons.utils.getBaseLang;
        var primaryLangValue = getBaseLang(node.getAttribute('lang'));
        var primaryXmlLangValue = getBaseLang(node.getAttribute('xml:lang'));
        return axe.utils.validLangs().includes(primaryLangValue) && axe.utils.validLangs().includes(primaryXmlLangValue);
      },
      tags: [ 'cat.language', 'wcag2a', 'wcag311' ],
      all: [ 'xml-lang-mismatch' ],
      any: [],
      none: []
    }, {
      id: 'image-alt',
      selector: 'img, [role=\'img\']:not(svg)',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag111', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'has-alt', 'aria-label', 'aria-labelledby', 'non-empty-title', 'role-presentation', 'role-none' ],
      none: []
    }, {
      id: 'image-redundant-alt',
      selector: 'button, [role="button"], a[href], p, li, td, th',
      tags: [ 'cat.text-alternatives', 'best-practice' ],
      all: [],
      any: [],
      none: [ 'duplicate-img-label' ]
    }, {
      id: 'input-image-alt',
      selector: 'input[type="image"]',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag111', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'non-empty-alt', 'aria-label', 'aria-labelledby', 'non-empty-title' ],
      none: []
    }, {
      id: 'label-title-only',
      selector: 'input, select, textarea',
      matches: function matches(node, virtualNode) {
        if (node.nodeName.toLowerCase() !== 'input' || node.hasAttribute('type') === false) {
          return true;
        }
        var type = node.getAttribute('type').toLowerCase();
        return [ 'hidden', 'image', 'button', 'submit', 'reset' ].includes(type) === false;
      },
      tags: [ 'cat.forms', 'best-practice' ],
      all: [],
      any: [],
      none: [ 'title-only' ]
    }, {
      id: 'label',
      selector: 'input, select, textarea',
      matches: function matches(node, virtualNode) {
        if (node.nodeName.toLowerCase() !== 'input' || node.hasAttribute('type') === false) {
          return true;
        }
        var type = node.getAttribute('type').toLowerCase();
        return [ 'hidden', 'image', 'button', 'submit', 'reset' ].includes(type) === false;
      },
      tags: [ 'cat.forms', 'wcag2a', 'wcag332', 'wcag131', 'section508', 'section508.22.n' ],
      all: [],
      any: [ 'aria-label', 'aria-labelledby', 'implicit-label', 'explicit-label', 'non-empty-title' ],
      none: [ 'help-same-as-label', 'multiple-label', 'hidden-explicit-label' ]
    }, {
      id: 'landmark-banner-is-top-level',
      selector: 'header:not([role]), [role=banner]',
      matches: function matches(node, virtualNode) {
        var nativeScopeFilter = 'article, aside, main, nav, section';
        return node.hasAttribute('role') || !axe.commons.dom.findUpVirtual(virtualNode, nativeScopeFilter);
      },
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ 'landmark-is-top-level' ],
      none: []
    }, {
      id: 'landmark-contentinfo-is-top-level',
      selector: 'footer:not([role]), [role=contentinfo]',
      matches: function matches(node, virtualNode) {
        var nativeScopeFilter = 'article, aside, main, nav, section';
        return node.hasAttribute('role') || !axe.commons.dom.findUpVirtual(virtualNode, nativeScopeFilter);
      },
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ 'landmark-is-top-level' ],
      none: []
    }, {
      id: 'landmark-main-is-top-level',
      selector: 'main:not([role]), [role=main]',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ 'landmark-is-top-level' ],
      none: []
    }, {
      id: 'landmark-no-duplicate-banner',
      selector: 'html',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ {
        options: {
          selector: 'header:not([role]), [role=banner]',
          nativeScopeFilter: 'article, aside, main, nav, section'
        },
        id: 'page-no-duplicate-banner'
      } ],
      none: []
    }, {
      id: 'landmark-no-duplicate-contentinfo',
      selector: 'html',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ {
        options: {
          selector: 'footer:not([role]), [role=contentinfo]',
          nativeScopeFilter: 'article, aside, main, nav, section'
        },
        id: 'page-no-duplicate-contentinfo'
      } ],
      none: []
    }, {
      id: 'landmark-one-main',
      selector: 'html',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [ {
        options: {
          selector: 'main:not([role]), [role=\'main\']'
        },
        id: 'page-has-main'
      }, {
        options: {
          selector: 'main:not([role]), [role=\'main\']'
        },
        id: 'page-no-duplicate-main'
      } ],
      any: [],
      none: []
    }, {
      id: 'layout-table',
      selector: 'table',
      matches: function matches(node, virtualNode) {
        var role = (node.getAttribute('role') || '').toLowerCase();
        return !((role === 'presentation' || role === 'none') && !axe.commons.dom.isFocusable(node)) && !axe.commons.table.isDataTable(node);
      },
      tags: [ 'cat.semantics', 'wcag2a', 'wcag131' ],
      all: [],
      any: [],
      none: [ 'has-th', 'has-caption', 'has-summary' ]
    }, {
      id: 'link-in-text-block',
      selector: 'a[href], [role=link]',
      matches: function matches(node, virtualNode) {
        var text = axe.commons.text.sanitize(node.textContent);
        var role = node.getAttribute('role');
        if (role && role !== 'link') {
          return false;
        }
        if (!text) {
          return false;
        }
        if (!axe.commons.dom.isVisible(node, false)) {
          return false;
        }
        return axe.commons.dom.isInTextBlock(node);
      },
      excludeHidden: false,
      tags: [ 'cat.color', 'experimental', 'wcag2a', 'wcag141' ],
      all: [ 'link-in-text-block' ],
      any: [],
      none: []
    }, {
      id: 'link-name',
      selector: 'a[href], [role=link][href]',
      matches: function matches(node, virtualNode) {
        return node.getAttribute('role') !== 'button';
      },
      tags: [ 'cat.name-role-value', 'wcag2a', 'wcag412', 'wcag244', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', 'role-presentation', 'role-none' ],
      none: [ 'focusable-no-name' ]
    }, {
      id: 'list',
      selector: 'ul, ol',
      matches: function matches(node, virtualNode) {
        return !node.getAttribute('role');
      },
      tags: [ 'cat.structure', 'wcag2a', 'wcag131' ],
      all: [],
      any: [],
      none: [ 'only-listitems' ]
    }, {
      id: 'listitem',
      selector: 'li',
      matches: function matches(node, virtualNode) {
        return !node.getAttribute('role');
      },
      tags: [ 'cat.structure', 'wcag2a', 'wcag131' ],
      all: [],
      any: [ 'listitem' ],
      none: []
    }, {
      id: 'marquee',
      selector: 'marquee',
      excludeHidden: false,
      tags: [ 'cat.parsing', 'wcag2a', 'wcag222' ],
      all: [],
      any: [],
      none: [ 'is-on-screen' ]
    }, {
      id: 'meta-refresh',
      selector: 'meta[http-equiv="refresh"]',
      excludeHidden: false,
      tags: [ 'cat.time', 'wcag2a', 'wcag2aaa', 'wcag221', 'wcag224', 'wcag325' ],
      all: [],
      any: [ 'meta-refresh' ],
      none: []
    }, {
      id: 'meta-viewport-large',
      selector: 'meta[name="viewport"]',
      excludeHidden: false,
      tags: [ 'cat.sensory-and-visual-cues', 'best-practice' ],
      all: [],
      any: [ {
        options: {
          scaleMinimum: 5,
          lowerBound: 2
        },
        id: 'meta-viewport-large'
      } ],
      none: []
    }, {
      id: 'meta-viewport',
      selector: 'meta[name="viewport"]',
      excludeHidden: false,
      tags: [ 'cat.sensory-and-visual-cues', 'wcag2aa', 'wcag144' ],
      all: [],
      any: [ {
        options: {
          scaleMinimum: 2
        },
        id: 'meta-viewport'
      } ],
      none: []
    }, {
      id: 'object-alt',
      selector: 'object',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag111', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', 'non-empty-title' ],
      none: []
    }, {
      id: 'p-as-heading',
      selector: 'p',
      matches: function matches(node, virtualNode) {
        var children = Array.from(node.parentNode.childNodes);
        var nodeText = node.textContent.trim();
        var isSentence = /[.!?:;](?![.!?:;])/g;
        if (nodeText.length === 0 || (nodeText.match(isSentence) || []).length >= 2) {
          return false;
        }
        var siblingsAfter = children.slice(children.indexOf(node) + 1).filter(function(elm) {
          return elm.nodeName.toUpperCase() === 'P' && elm.textContent.trim() !== '';
        });
        return siblingsAfter.length !== 0;
      },
      tags: [ 'cat.semantics', 'wcag2a', 'wcag131', 'experimental' ],
      all: [ {
        options: {
          margins: [ {
            weight: 150,
            italic: true
          }, {
            weight: 150,
            size: 1.15
          }, {
            italic: true,
            size: 1.15
          }, {
            size: 1.4
          } ]
        },
        id: 'p-as-heading'
      } ],
      any: [],
      none: []
    }, {
      id: 'page-has-heading-one',
      selector: 'html',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [ {
        options: {
          selector: 'h1:not([role]), [role="heading"][aria-level="1"]'
        },
        id: 'page-has-heading-one'
      } ],
      any: [],
      none: []
    }, {
      id: 'radiogroup',
      selector: 'input[type=radio][name]',
      tags: [ 'cat.forms', 'best-practice' ],
      all: [],
      any: [ 'group-labelledby', 'fieldset' ],
      none: []
    }, {
      id: 'region',
      selector: 'html',
      pageLevel: true,
      tags: [ 'cat.keyboard', 'best-practice' ],
      all: [],
      any: [ 'region' ],
      none: []
    }, {
      id: 'scope-attr-valid',
      selector: 'td[scope], th[scope]',
      tags: [ 'cat.tables', 'best-practice' ],
      all: [ 'html5-scope', 'scope-value' ],
      any: [],
      none: []
    }, {
      id: 'server-side-image-map',
      selector: 'img[ismap]',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag211', 'section508', 'section508.22.f' ],
      all: [],
      any: [],
      none: [ 'exists' ]
    }, {
      id: 'skip-link',
      selector: 'a[href]',
      matches: function matches(node, virtualNode) {
        return /^#[^/!]/.test(node.getAttribute('href'));
      },
      tags: [ 'cat.keyboard', 'best-practice' ],
      all: [],
      any: [ 'skip-link' ],
      none: []
    }, {
      id: 'tabindex',
      selector: '[tabindex]',
      tags: [ 'cat.keyboard', 'best-practice' ],
      all: [],
      any: [ 'tabindex' ],
      none: []
    }, {
      id: 'table-duplicate-name',
      selector: 'table',
      tags: [ 'cat.tables', 'best-practice' ],
      all: [],
      any: [],
      none: [ 'same-caption-summary' ]
    }, {
      id: 'table-fake-caption',
      selector: 'table',
      matches: function matches(node, virtualNode) {
        return axe.commons.table.isDataTable(node);
      },
      tags: [ 'cat.tables', 'experimental', 'wcag2a', 'wcag131', 'section508', 'section508.22.g' ],
      all: [ 'caption-faked' ],
      any: [],
      none: []
    }, {
      id: 'td-has-header',
      selector: 'table',
      matches: function matches(node, virtualNode) {
        if (axe.commons.table.isDataTable(node)) {
          var tableArray = axe.commons.table.toArray(node);
          return tableArray.length >= 3 && tableArray[0].length >= 3 && tableArray[1].length >= 3 && tableArray[2].length >= 3;
        }
        return false;
      },
      tags: [ 'cat.tables', 'experimental', 'wcag2a', 'wcag131', 'section508', 'section508.22.g' ],
      all: [ 'td-has-header' ],
      any: [],
      none: []
    }, {
      id: 'td-headers-attr',
      selector: 'table',
      tags: [ 'cat.tables', 'wcag2a', 'wcag131', 'section508', 'section508.22.g' ],
      all: [ 'td-headers-attr' ],
      any: [],
      none: []
    }, {
      id: 'th-has-data-cells',
      selector: 'table',
      matches: function matches(node, virtualNode) {
        return axe.commons.table.isDataTable(node);
      },
      tags: [ 'cat.tables', 'wcag2a', 'wcag131', 'section508', 'section508.22.g' ],
      all: [ 'th-has-data-cells' ],
      any: [],
      none: []
    }, {
      id: 'valid-lang',
      selector: '[lang], [xml\\:lang]',
      matches: function matches(node, virtualNode) {
        return node.nodeName.toLowerCase() !== 'html';
      },
      tags: [ 'cat.language', 'wcag2aa', 'wcag312' ],
      all: [],
      any: [],
      none: [ 'valid-lang' ]
    }, {
      id: 'video-caption',
      selector: 'video',
      excludeHidden: false,
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag122', 'section508', 'section508.22.a' ],
      all: [],
      any: [],
      none: [ 'caption' ]
    }, {
      id: 'video-description',
      selector: 'video',
      excludeHidden: false,
      tags: [ 'cat.text-alternatives', 'wcag2aa', 'wcag125', 'section508', 'section508.22.b' ],
      all: [],
      any: [],
      none: [ 'description' ]
    } ],
    checks: [ {
      id: 'abstractrole',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return axe.commons.aria.getRoleType(node.getAttribute('role')) === 'abstract';
      }
    }, {
      id: 'aria-allowed-attr',
      evaluate: function evaluate(node, options, virtualNode, context) {
        options = options || {};
        var invalid = [];
        var attr, attrName, allowed, role = node.getAttribute('role'), attrs = node.attributes;
        if (!role) {
          role = axe.commons.aria.implicitRole(node);
        }
        allowed = axe.commons.aria.allowedAttr(role);
        if (Array.isArray(options[role])) {
          allowed = axe.utils.uniqueArray(options[role].concat(allowed));
        }
        if (role && allowed) {
          for (var i = 0, l = attrs.length; i < l; i++) {
            attr = attrs[i];
            attrName = attr.name;
            if (axe.commons.aria.validateAttr(attrName) && !allowed.includes(attrName)) {
              invalid.push(attrName + '="' + attr.nodeValue + '"');
            }
          }
        }
        if (invalid.length) {
          this.data(invalid);
          return false;
        }
        return true;
      }
    }, {
      id: 'aria-allowed-role',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var _ref = options || {}, _ref$allowImplicit = _ref.allowImplicit, allowImplicit = _ref$allowImplicit === undefined ? true : _ref$allowImplicit, _ref$ignoredTags = _ref.ignoredTags, ignoredTags = _ref$ignoredTags === undefined ? [] : _ref$ignoredTags;
        var tagName = node.nodeName.toUpperCase();
        if (ignoredTags.map(function(t) {
          return t.toUpperCase();
        }).includes(tagName)) {
          return true;
        }
        var unallowedRoles = axe.commons.aria.getElementUnallowedRoles(node, allowImplicit);
        if (unallowedRoles.length) {
          this.data(unallowedRoles);
          return false;
        }
        return true;
      },
      options: {
        allowImplicit: true,
        ignoredTags: []
      }
    }, {
      id: 'aria-hidden-body',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return node.getAttribute('aria-hidden') !== 'true';
      }
    }, {
      id: 'aria-errormessage',
      evaluate: function evaluate(node, options, virtualNode, context) {
        options = Array.isArray(options) ? options : [];
        var attr = node.getAttribute('aria-errormessage'), hasAttr = node.hasAttribute('aria-errormessage');
        var doc = axe.commons.dom.getRootNode(node);
        function validateAttrValue() {
          var idref = attr && doc.getElementById(attr);
          if (idref) {
            return idref.getAttribute('role') === 'alert' || idref.getAttribute('aria-live') === 'assertive' || axe.utils.tokenList(node.getAttribute('aria-describedby') || '').indexOf(attr) > -1;
          }
        }
        if (options.indexOf(attr) === -1 && hasAttr) {
          if (!validateAttrValue()) {
            this.data(axe.utils.tokenList(attr));
            return false;
          }
        }
        return true;
      }
    }, {
      id: 'has-widget-role',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var role = node.getAttribute('role');
        if (role === null) {
          return false;
        }
        var roleType = axe.commons.aria.getRoleType(role);
        return roleType === 'widget' || roleType === 'composite';
      },
      options: []
    }, {
      id: 'implicit-role-fallback',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var role = node.getAttribute('role');
        if (role === null || !axe.commons.aria.isValidRole(role)) {
          return true;
        }
        var roleType = axe.commons.aria.getRoleType(role);
        return axe.commons.aria.implicitRole(node) === roleType;
      }
    }, {
      id: 'invalidrole',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return !axe.commons.aria.isValidRole(node.getAttribute('role'), {
          allowAbstract: true
        });
      }
    }, {
      id: 'aria-required-attr',
      evaluate: function evaluate(node, options, virtualNode, context) {
        options = options || {};
        var missing = [];
        if (node.hasAttributes()) {
          var attr, role = node.getAttribute('role'), required = axe.commons.aria.requiredAttr(role);
          if (Array.isArray(options[role])) {
            required = axe.utils.uniqueArray(options[role], required);
          }
          if (role && required) {
            for (var i = 0, l = required.length; i < l; i++) {
              attr = required[i];
              if (!node.getAttribute(attr)) {
                missing.push(attr);
              }
            }
          }
        }
        if (missing.length) {
          this.data(missing);
          return false;
        }
        return true;
      }
    }, {
      id: 'aria-required-children',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var requiredOwned = axe.commons.aria.requiredOwned;
        var implicitNodes = axe.commons.aria.implicitNodes;
        var matchesSelector = axe.commons.utils.matchesSelector;
        var idrefs = axe.commons.dom.idrefs;
        var reviewEmpty = options && Array.isArray(options.reviewEmpty) ? options.reviewEmpty : [];
        function owns(node, virtualTree, role, ariaOwned) {
          if (node === null) {
            return false;
          }
          var implicit = implicitNodes(role), selector = [ '[role="' + role + '"]' ];
          if (implicit) {
            selector = selector.concat(implicit);
          }
          selector = selector.join(',');
          return ariaOwned ? matchesSelector(node, selector) || !!axe.utils.querySelectorAll(virtualTree, selector)[0] : !!axe.utils.querySelectorAll(virtualTree, selector)[0];
        }
        function ariaOwns(nodes, role) {
          var index, length;
          for (index = 0, length = nodes.length; index < length; index++) {
            if (nodes[index] === null) {
              continue;
            }
            var virtualTree = axe.utils.getNodeFromTree(axe._tree[0], nodes[index]);
            if (owns(nodes[index], virtualTree, role, true)) {
              return true;
            }
          }
          return false;
        }
        function missingRequiredChildren(node, childRoles, all, role) {
          var i, l = childRoles.length, missing = [], ownedElements = idrefs(node, 'aria-owns');
          for (i = 0; i < l; i++) {
            var r = childRoles[i];
            if (owns(node, virtualNode, r) || ariaOwns(ownedElements, r)) {
              if (!all) {
                return null;
              }
            } else {
              if (all) {
                missing.push(r);
              }
            }
          }
          if (role === 'combobox') {
            var textboxIndex = missing.indexOf('textbox');
            var textTypeInputs = [ 'text', 'search', 'email', 'url', 'tel' ];
            if (textboxIndex >= 0 && node.tagName === 'INPUT' && textTypeInputs.includes(node.type)) {
              missing.splice(textboxIndex, 1);
            }
            var listboxIndex = missing.indexOf('listbox');
            var expanded = node.getAttribute('aria-expanded');
            if (listboxIndex >= 0 && (!expanded || expanded === 'false')) {
              missing.splice(listboxIndex, 1);
            }
          }
          if (missing.length) {
            return missing;
          }
          if (!all && childRoles.length) {
            return childRoles;
          }
          return null;
        }
        var role = node.getAttribute('role');
        var required = requiredOwned(role);
        if (!required) {
          return true;
        }
        var all = false;
        var childRoles = required.one;
        if (!childRoles) {
          var all = true;
          childRoles = required.all;
        }
        var missing = missingRequiredChildren(node, childRoles, all, role);
        if (!missing) {
          return true;
        }
        this.data(missing);
        if (reviewEmpty.includes(role)) {
          return undefined;
        } else {
          return false;
        }
      },
      options: {
        reviewEmpty: [ 'listbox' ]
      }
    }, {
      id: 'aria-required-parent',
      evaluate: function evaluate(node, options, virtualNode, context) {
        function getSelector(role) {
          var impliedNative = axe.commons.aria.implicitNodes(role) || [];
          return impliedNative.concat('[role="' + role + '"]').join(',');
        }
        function getMissingContext(virtualNode, requiredContext, includeElement) {
          var index, length, role = virtualNode.actualNode.getAttribute('role'), missing = [];
          if (!requiredContext) {
            requiredContext = axe.commons.aria.requiredContext(role);
          }
          if (!requiredContext) {
            return null;
          }
          for (index = 0, length = requiredContext.length; index < length; index++) {
            if (includeElement && axe.utils.matchesSelector(virtualNode.actualNode, getSelector(requiredContext[index]))) {
              return null;
            }
            if (axe.commons.dom.findUpVirtual(virtualNode, getSelector(requiredContext[index]))) {
              return null;
            } else {
              missing.push(requiredContext[index]);
            }
          }
          return missing;
        }
        function getAriaOwners(element) {
          var owners = [], o = null;
          while (element) {
            if (element.getAttribute('id')) {
              var id = axe.commons.utils.escapeSelector(element.getAttribute('id'));
              var doc = axe.commons.dom.getRootNode(element);
              o = doc.querySelector('[aria-owns~=' + id + ']');
              if (o) {
                owners.push(o);
              }
            }
            element = element.parentElement;
          }
          return owners.length ? owners : null;
        }
        var missingParents = getMissingContext(virtualNode);
        if (!missingParents) {
          return true;
        }
        var owners = getAriaOwners(node);
        if (owners) {
          for (var i = 0, l = owners.length; i < l; i++) {
            missingParents = getMissingContext(axe.utils.getNodeFromTree(axe._tree[0], owners[i]), missingParents, true);
            if (!missingParents) {
              return true;
            }
          }
        }
        this.data(missingParents);
        return false;
      }
    }, {
      id: 'unsupportedrole',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return !axe.commons.aria.isValidRole(node.getAttribute('role'), {
          flagUnsupported: true
        });
      }
    }, {
      id: 'aria-valid-attr-value',
      evaluate: function evaluate(node, options, virtualNode, context) {
        options = Array.isArray(options) ? options : [];
        var invalid = [], aria = /^aria-/;
        var attr, attrName, attrs = node.attributes;
        var skipAttrs = [ 'aria-errormessage' ];
        for (var i = 0, l = attrs.length; i < l; i++) {
          attr = attrs[i];
          attrName = attr.name;
          if (!skipAttrs.includes(attrName)) {
            if (options.indexOf(attrName) === -1 && aria.test(attrName) && !axe.commons.aria.validateAttrValue(node, attrName)) {
              invalid.push(attrName + '="' + attr.nodeValue + '"');
            }
          }
        }
        if (invalid.length) {
          this.data(invalid);
          return false;
        }
        return true;
      },
      options: []
    }, {
      id: 'aria-valid-attr',
      evaluate: function evaluate(node, options, virtualNode, context) {
        options = Array.isArray(options) ? options : [];
        var invalid = [], aria = /^aria-/;
        var attr, attrs = node.attributes;
        for (var i = 0, l = attrs.length; i < l; i++) {
          attr = attrs[i].name;
          if (options.indexOf(attr) === -1 && aria.test(attr) && !axe.commons.aria.validateAttr(attr)) {
            invalid.push(attr);
          }
        }
        if (invalid.length) {
          this.data(invalid);
          return false;
        }
        return true;
      },
      options: []
    }, {
      id: 'valid-scrollable-semantics',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var VALID_TAG_NAMES_FOR_SCROLLABLE_REGIONS = {
          ARTICLE: true,
          ASIDE: true,
          NAV: true,
          SECTION: true
        };
        var VALID_ROLES_FOR_SCROLLABLE_REGIONS = {
          application: true,
          banner: false,
          complementary: true,
          contentinfo: true,
          form: true,
          main: true,
          navigation: true,
          region: true,
          search: false
        };
        function validScrollableTagName(node) {
          var tagName = node.tagName.toUpperCase();
          return VALID_TAG_NAMES_FOR_SCROLLABLE_REGIONS[tagName] || false;
        }
        function validScrollableRole(node) {
          var role = node.getAttribute('role');
          if (!role) {
            return false;
          }
          return VALID_ROLES_FOR_SCROLLABLE_REGIONS[role.toLowerCase()] || false;
        }
        function validScrollableSemantics(node) {
          return validScrollableRole(node) || validScrollableTagName(node);
        }
        return validScrollableSemantics(node);
      },
      options: []
    }, {
      id: 'color-contrast',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var _axe$commons4 = axe.commons, dom = _axe$commons4.dom, color = _axe$commons4.color, text = _axe$commons4.text;
        if (!dom.isVisible(node, false)) {
          return true;
        }
        var noScroll = !!(options || {}).noScroll;
        var bgNodes = [];
        var bgColor = color.getBackgroundColor(node, bgNodes, noScroll);
        var fgColor = color.getForegroundColor(node, noScroll);
        var nodeStyle = window.getComputedStyle(node);
        var fontSize = parseFloat(nodeStyle.getPropertyValue('font-size'));
        var fontWeight = nodeStyle.getPropertyValue('font-weight');
        var bold = [ 'bold', 'bolder', '600', '700', '800', '900' ].indexOf(fontWeight) !== -1;
        var cr = color.hasValidContrastRatio(bgColor, fgColor, fontSize, bold);
        var truncatedResult = Math.floor(cr.contrastRatio * 100) / 100;
        var missing = void 0;
        if (bgColor === null) {
          missing = color.incompleteData.get('bgColor');
        }
        var equalRatio = truncatedResult === 1;
        var shortTextContent = text.visibleVirtual(virtualNode, false, true).length === 1;
        if (equalRatio) {
          missing = color.incompleteData.set('bgColor', 'equalRatio');
        } else if (shortTextContent) {
          missing = 'shortTextContent';
        }
        var data = {
          fgColor: fgColor ? fgColor.toHexString() : undefined,
          bgColor: bgColor ? bgColor.toHexString() : undefined,
          contrastRatio: cr ? truncatedResult : undefined,
          fontSize: (fontSize * 72 / 96).toFixed(1) + 'pt',
          fontWeight: bold ? 'bold' : 'normal',
          missingData: missing,
          expectedContrastRatio: cr.expectedContrastRatio + ':1'
        };
        this.data(data);
        if (fgColor === null || bgColor === null || equalRatio || shortTextContent && !cr.isValid) {
          missing = null;
          color.incompleteData.clear();
          this.relatedNodes(bgNodes);
          return undefined;
        }
        if (!cr.isValid) {
          this.relatedNodes(bgNodes);
        }
        return cr.isValid;
      }
    }, {
      id: 'link-in-text-block',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var _axe$commons5 = axe.commons, color = _axe$commons5.color, dom = _axe$commons5.dom;
        function getContrast(color1, color2) {
          var c1lum = color1.getRelativeLuminance();
          var c2lum = color2.getRelativeLuminance();
          return (Math.max(c1lum, c2lum) + .05) / (Math.min(c1lum, c2lum) + .05);
        }
        var blockLike = [ 'block', 'list-item', 'table', 'flex', 'grid', 'inline-block' ];
        function isBlock(elm) {
          var display = window.getComputedStyle(elm).getPropertyValue('display');
          return blockLike.indexOf(display) !== -1 || display.substr(0, 6) === 'table-';
        }
        if (isBlock(node)) {
          return false;
        }
        var parentBlock = dom.getComposedParent(node);
        while (parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
          parentBlock = dom.getComposedParent(parentBlock);
        }
        this.relatedNodes([ parentBlock ]);
        if (color.elementIsDistinct(node, parentBlock)) {
          return true;
        } else {
          var nodeColor, parentColor;
          nodeColor = color.getForegroundColor(node);
          parentColor = color.getForegroundColor(parentBlock);
          if (!nodeColor || !parentColor) {
            return undefined;
          }
          var contrast = getContrast(nodeColor, parentColor);
          if (contrast === 1) {
            return true;
          } else if (contrast >= 3) {
            axe.commons.color.incompleteData.set('fgColor', 'bgContrast');
            this.data({
              missingData: axe.commons.color.incompleteData.get('fgColor')
            });
            axe.commons.color.incompleteData.clear();
            return undefined;
          }
          nodeColor = color.getBackgroundColor(node);
          parentColor = color.getBackgroundColor(parentBlock);
          if (!nodeColor || !parentColor || getContrast(nodeColor, parentColor) >= 3) {
            var reason = void 0;
            if (!nodeColor || !parentColor) {
              reason = axe.commons.color.incompleteData.get('bgColor');
            } else {
              reason = 'bgContrast';
            }
            axe.commons.color.incompleteData.set('fgColor', reason);
            this.data({
              missingData: axe.commons.color.incompleteData.get('fgColor')
            });
            axe.commons.color.incompleteData.clear();
            return undefined;
          }
        }
        return false;
      }
    }, {
      id: 'autocomplete-appropriate',
      evaluate: function evaluate(node, options, virtualNode, context) {
        if (node.nodeName.toUpperCase() !== 'INPUT') {
          return true;
        }
        var number = [ 'text', 'search', 'number' ];
        var url = [ 'text', 'search', 'url' ];
        var allowedTypesMap = {
          bday: [ 'text', 'search', 'date' ],
          email: [ 'text', 'search', 'email' ],
          'cc-exp': [ 'text', 'search', 'month' ],
          'street-address': [],
          tel: [ 'text', 'search', 'tel' ],
          'cc-exp-month': number,
          'cc-exp-year': number,
          'transaction-amount': number,
          'bday-day': number,
          'bday-month': number,
          'bday-year': number,
          'new-password': [ 'text', 'search', 'password' ],
          'current-password': [ 'text', 'search', 'password' ],
          url: url,
          photo: url,
          impp: url
        };
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
          Object.keys(options).forEach(function(key) {
            if (!allowedTypesMap[key]) {
              allowedTypesMap[key] = [];
            }
            allowedTypesMap[key] = allowedTypesMap[key].concat(options[key]);
          });
        }
        var autocomplete = node.getAttribute('autocomplete');
        var autocompleteTerms = autocomplete.split(/\s+/g).map(function(term) {
          return term.toLowerCase();
        });
        var purposeTerm = autocompleteTerms[autocompleteTerms.length - 1];
        if (axe.commons.text.autocomplete.stateTerms.includes(purposeTerm)) {
          return true;
        }
        var allowedTypes = allowedTypesMap[purposeTerm];
        if (typeof allowedTypes === 'undefined') {
          return node.type === 'text';
        }
        return allowedTypes.includes(node.type);
      }
    }, {
      id: 'autocomplete-valid',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var autocomplete = node.getAttribute('autocomplete') || '';
        return axe.commons.text.isValidAutocomplete(autocomplete, options);
      }
    }, {
      id: 'fieldset',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var failureCode, self = this;
        function getUnrelatedElements(parent, name) {
          return axe.commons.utils.toArray(parent.querySelectorAll('select,textarea,button,input:not([name="' + name + '"]):not([type="hidden"])'));
        }
        function checkFieldset(group, name) {
          var firstNode = group.firstElementChild;
          if (!firstNode || firstNode.nodeName.toUpperCase() !== 'LEGEND') {
            self.relatedNodes([ group ]);
            failureCode = 'no-legend';
            return false;
          }
          if (!axe.commons.text.accessibleText(firstNode)) {
            self.relatedNodes([ firstNode ]);
            failureCode = 'empty-legend';
            return false;
          }
          var otherElements = getUnrelatedElements(group, name);
          if (otherElements.length) {
            self.relatedNodes(otherElements);
            failureCode = 'mixed-inputs';
            return false;
          }
          return true;
        }
        function checkARIAGroup(group, name) {
          var hasLabelledByText = axe.commons.dom.idrefs(group, 'aria-labelledby').some(function(element) {
            return element && axe.commons.text.accessibleText(element);
          });
          var ariaLabel = group.getAttribute('aria-label');
          if (!hasLabelledByText && !(ariaLabel && axe.commons.text.sanitize(ariaLabel))) {
            self.relatedNodes(group);
            failureCode = 'no-group-label';
            return false;
          }
          var otherElements = getUnrelatedElements(group, name);
          if (otherElements.length) {
            self.relatedNodes(otherElements);
            failureCode = 'group-mixed-inputs';
            return false;
          }
          return true;
        }
        function spliceCurrentNode(nodes, current) {
          return axe.commons.utils.toArray(nodes).filter(function(candidate) {
            return candidate !== current;
          });
        }
        function runCheck(virtualNode) {
          var name = axe.commons.utils.escapeSelector(virtualNode.actualNode.name);
          var root = axe.commons.dom.getRootNode(virtualNode.actualNode);
          var matchingNodes = root.querySelectorAll('input[type="' + axe.commons.utils.escapeSelector(virtualNode.actualNode.type) + '"][name="' + name + '"]');
          if (matchingNodes.length < 2) {
            return true;
          }
          var fieldset = axe.commons.dom.findUpVirtual(virtualNode, 'fieldset');
          var group = axe.commons.dom.findUpVirtual(virtualNode, '[role="group"]' + (virtualNode.actualNode.type === 'radio' ? ',[role="radiogroup"]' : ''));
          if (!group && !fieldset) {
            failureCode = 'no-group';
            self.relatedNodes(spliceCurrentNode(matchingNodes, virtualNode.actualNode));
            return false;
          } else if (fieldset) {
            return checkFieldset(fieldset, name);
          } else {
            return checkARIAGroup(group, name);
          }
        }
        var data = {
          name: node.getAttribute('name'),
          type: node.getAttribute('type')
        };
        var result = runCheck(virtualNode);
        if (!result) {
          data.failureCode = failureCode;
        }
        this.data(data);
        return result;
      },
      after: function after(results, options) {
        var seen = {};
        return results.filter(function(result) {
          if (result.result) {
            return true;
          }
          var data = result.data;
          if (data) {
            seen[data.type] = seen[data.type] || {};
            if (!seen[data.type][data.name]) {
              seen[data.type][data.name] = [ data ];
              return true;
            }
            var hasBeenSeen = seen[data.type][data.name].some(function(candidate) {
              return candidate.failureCode === data.failureCode;
            });
            if (!hasBeenSeen) {
              seen[data.type][data.name].push(data);
            }
            return !hasBeenSeen;
          }
          return false;
        });
      }
    }, {
      id: 'group-labelledby',
      evaluate: function evaluate(node, options, virtualNode, context) {
        this.data({
          name: node.getAttribute('name'),
          type: node.getAttribute('type')
        });
        var doc = axe.commons.dom.getRootNode(node);
        var matchingNodes = doc.querySelectorAll('input[type="' + axe.commons.utils.escapeSelector(node.type) + '"][name="' + axe.commons.utils.escapeSelector(node.name) + '"]');
        if (matchingNodes.length <= 1) {
          return true;
        }
        return [].map.call(matchingNodes, function(m) {
          var l = m.getAttribute('aria-labelledby');
          return l ? l.split(/\s+/) : [];
        }).reduce(function(prev, curr) {
          return prev.filter(function(n) {
            return curr.includes(n);
          });
        }).filter(function(n) {
          var labelNode = doc.getElementById(n);
          return labelNode && axe.commons.text.accessibleText(labelNode, true);
        }).length !== 0;
      },
      after: function after(results, options) {
        var seen = {};
        return results.filter(function(result) {
          var data = result.data;
          if (data) {
            seen[data.type] = seen[data.type] || {};
            if (!seen[data.type][data.name]) {
              seen[data.type][data.name] = true;
              return true;
            }
          }
          return false;
        });
      }
    }, {
      id: 'accesskeys',
      evaluate: function evaluate(node, options, virtualNode, context) {
        if (axe.commons.dom.isVisible(node, false)) {
          this.data(node.getAttribute('accesskey'));
          this.relatedNodes([ node ]);
        }
        return true;
      },
      after: function after(results, options) {
        var seen = {};
        return results.filter(function(r) {
          if (!r.data) {
            return false;
          }
          var key = r.data.toUpperCase();
          if (!seen[key]) {
            seen[key] = r;
            r.relatedNodes = [];
            return true;
          }
          seen[key].relatedNodes.push(r.relatedNodes[0]);
          return false;
        }).map(function(r) {
          r.result = !!r.relatedNodes.length;
          return r;
        });
      }
    }, {
      id: 'focusable-no-name',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var tabIndex = node.getAttribute('tabindex'), inFocusOrder = axe.commons.dom.isFocusable(node) && tabIndex > -1;
        if (!inFocusOrder) {
          return false;
        }
        return !axe.commons.text.accessibleTextVirtual(virtualNode);
      }
    }, {
      id: 'landmark-is-top-level',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var landmarks = axe.commons.aria.getRolesByType('landmark');
        var parent = axe.commons.dom.getComposedParent(node);
        this.data({
          role: node.getAttribute('role') || axe.commons.aria.implicitRole(node)
        });
        while (parent) {
          var role = parent.getAttribute('role');
          if (!role && parent.tagName.toLowerCase() !== 'form') {
            role = axe.commons.aria.implicitRole(parent);
          }
          if (role && landmarks.includes(role)) {
            return false;
          }
          parent = axe.commons.dom.getComposedParent(parent);
        }
        return true;
      }
    }, {
      id: 'page-has-heading-one',
      evaluate: function evaluate(node, options, virtualNode, context) {
        if (!options || !options.selector || typeof options.selector !== 'string') {
          throw new TypeError('visible-in-page requires options.selector to be a string');
        }
        var matchingElms = axe.utils.querySelectorAll(virtualNode, options.selector);
        this.relatedNodes(matchingElms.map(function(vNode) {
          return vNode.actualNode;
        }));
        return matchingElms.length > 0;
      },
      after: function after(results, options) {
        var elmUsedAnywhere = results.some(function(frameResult) {
          return frameResult.result === true;
        });
        if (elmUsedAnywhere) {
          results.forEach(function(result) {
            result.result = true;
          });
        }
        return results;
      },
      options: {
        selector: 'h1:not([role]), [role="heading"][aria-level="1"]'
      }
    }, {
      id: 'page-has-main',
      evaluate: function evaluate(node, options, virtualNode, context) {
        if (!options || !options.selector || typeof options.selector !== 'string') {
          throw new TypeError('visible-in-page requires options.selector to be a string');
        }
        var matchingElms = axe.utils.querySelectorAll(virtualNode, options.selector);
        this.relatedNodes(matchingElms.map(function(vNode) {
          return vNode.actualNode;
        }));
        return matchingElms.length > 0;
      },
      after: function after(results, options) {
        var elmUsedAnywhere = results.some(function(frameResult) {
          return frameResult.result === true;
        });
        if (elmUsedAnywhere) {
          results.forEach(function(result) {
            result.result = true;
          });
        }
        return results;
      },
      options: {
        selector: 'main:not([role]), [role=\'main\']'
      }
    }, {
      id: 'page-no-duplicate-banner',
      evaluate: function evaluate(node, options, virtualNode, context) {
        if (!options || !options.selector || typeof options.selector !== 'string') {
          throw new TypeError('visible-in-page requires options.selector to be a string');
        }
        var elms = axe.utils.querySelectorAll(virtualNode, options.selector);
        if (typeof options.nativeScopeFilter === 'string') {
          elms = elms.filter(function(elm) {
            return elm.actualNode.hasAttribute('role') || !axe.commons.dom.findUpVirtual(elm, options.nativeScopeFilter);
          });
        }
        this.relatedNodes(elms.map(function(elm) {
          return elm.actualNode;
        }));
        return elms.length <= 1;
      },
      options: {
        selector: 'header:not([role]), [role=banner]',
        nativeScopeFilter: 'article, aside, main, nav, section'
      }
    }, {
      id: 'page-no-duplicate-contentinfo',
      evaluate: function evaluate(node, options, virtualNode, context) {
        if (!options || !options.selector || typeof options.selector !== 'string') {
          throw new TypeError('visible-in-page requires options.selector to be a string');
        }
        var elms = axe.utils.querySelectorAll(virtualNode, options.selector);
        if (typeof options.nativeScopeFilter === 'string') {
          elms = elms.filter(function(elm) {
            return elm.actualNode.hasAttribute('role') || !axe.commons.dom.findUpVirtual(elm, options.nativeScopeFilter);
          });
        }
        this.relatedNodes(elms.map(function(elm) {
          return elm.actualNode;
        }));
        return elms.length <= 1;
      },
      options: {
        selector: 'footer:not([role]), [role=contentinfo]',
        nativeScopeFilter: 'article, aside, main, nav, section'
      }
    }, {
      id: 'page-no-duplicate-main',
      evaluate: function evaluate(node, options, virtualNode, context) {
        if (!options || !options.selector || typeof options.selector !== 'string') {
          throw new TypeError('visible-in-page requires options.selector to be a string');
        }
        var elms = axe.utils.querySelectorAll(virtualNode, options.selector);
        if (typeof options.nativeScopeFilter === 'string') {
          elms = elms.filter(function(elm) {
            return elm.actualNode.hasAttribute('role') || !axe.commons.dom.findUpVirtual(elm, options.nativeScopeFilter);
          });
        }
        this.relatedNodes(elms.map(function(elm) {
          return elm.actualNode;
        }));
        return elms.length <= 1;
      },
      options: {
        selector: 'main:not([role]), [role=\'main\']'
      }
    }, {
      id: 'tabindex',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return node.tabIndex <= 0;
      }
    }, {
      id: 'duplicate-img-label',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var text = axe.commons.text.visibleVirtual(virtualNode, true).toLowerCase();
        if (text === '') {
          return false;
        }
        var images = axe.utils.querySelectorAll(virtualNode, 'img').filter(function(_ref2) {
          var actualNode = _ref2.actualNode;
          return axe.commons.dom.isVisible(actualNode) && ![ 'none', 'presentation' ].includes(actualNode.getAttribute('role'));
        });
        return images.some(function(img) {
          return text === axe.commons.text.accessibleTextVirtual(img).toLowerCase();
        });
      }
    }, {
      id: 'explicit-label',
      evaluate: function evaluate(node, options, virtualNode, context) {
        if (node.getAttribute('id')) {
          var root = axe.commons.dom.getRootNode(node);
          var id = axe.commons.utils.escapeSelector(node.getAttribute('id'));
          var label = root.querySelector('label[for="' + id + '"]');
          if (label) {
            if (!axe.commons.dom.isVisible(label)) {
              return true;
            } else {
              return !!axe.commons.text.accessibleText(label);
            }
          }
        }
        return false;
      }
    }, {
      id: 'help-same-as-label',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var labelText = axe.commons.text.labelVirtual(virtualNode), check = node.getAttribute('title');
        if (!labelText) {
          return false;
        }
        if (!check) {
          check = '';
          if (node.getAttribute('aria-describedby')) {
            var ref = axe.commons.dom.idrefs(node, 'aria-describedby');
            check = ref.map(function(thing) {
              return thing ? axe.commons.text.accessibleText(thing) : '';
            }).join('');
          }
        }
        return axe.commons.text.sanitize(check) === axe.commons.text.sanitize(labelText);
      },
      enabled: false
    }, {
      id: 'hidden-explicit-label',
      evaluate: function evaluate(node, options, virtualNode, context) {
        if (node.getAttribute('id')) {
          var root = axe.commons.dom.getRootNode(node);
          var id = axe.commons.utils.escapeSelector(node.getAttribute('id'));
          var label = root.querySelector('label[for="' + id + '"]');
          if (label && !axe.commons.dom.isVisible(label)) {
            return true;
          }
        }
        return false;
      }
    }, {
      id: 'implicit-label',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var label = axe.commons.dom.findUpVirtual(virtualNode, 'label');
        if (label) {
          return !!axe.commons.text.accessibleTextVirtual(label);
        }
        return false;
      }
    }, {
      id: 'multiple-label',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var id = axe.commons.utils.escapeSelector(node.getAttribute('id'));
        var labels = Array.from(document.querySelectorAll('label[for="' + id + '"]'));
        var parent = node.parentNode;
        if (labels.length) {
          labels = labels.filter(function(label, index) {
            if (index === 0 && !axe.commons.dom.isVisible(label, true) || axe.commons.dom.isVisible(label, true)) {
              return label;
            }
          });
        }
        while (parent) {
          if (parent.tagName === 'LABEL' && labels.indexOf(parent) === -1) {
            labels.push(parent);
          }
          parent = parent.parentNode;
        }
        this.relatedNodes(labels);
        return labels.length > 1;
      }
    }, {
      id: 'title-only',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var labelText = axe.commons.text.labelVirtual(virtualNode);
        return !labelText && !!(node.getAttribute('title') || node.getAttribute('aria-describedby'));
      }
    }, {
      id: 'has-lang',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return !!(node.getAttribute('lang') || node.getAttribute('xml:lang') || '').trim();
      }
    }, {
      id: 'valid-lang',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var langs, invalid;
        langs = (options ? options : axe.commons.utils.validLangs()).map(axe.commons.utils.getBaseLang);
        invalid = [ 'lang', 'xml:lang' ].reduce(function(invalid, langAttr) {
          var langVal = node.getAttribute(langAttr);
          if (typeof langVal !== 'string') {
            return invalid;
          }
          var baselangVal = axe.commons.utils.getBaseLang(langVal);
          if (baselangVal !== '' && langs.indexOf(baselangVal) === -1) {
            invalid.push(langAttr + '="' + node.getAttribute(langAttr) + '"');
          }
          return invalid;
        }, []);
        if (invalid.length) {
          this.data(invalid);
          return true;
        }
        return false;
      }
    }, {
      id: 'xml-lang-mismatch',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var getBaseLang = axe.commons.utils.getBaseLang;
        var primaryLangValue = getBaseLang(node.getAttribute('lang'));
        var primaryXmlLangValue = getBaseLang(node.getAttribute('xml:lang'));
        return primaryLangValue === primaryXmlLangValue;
      }
    }, {
      id: 'dlitem',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var parent = axe.commons.dom.getComposedParent(node);
        var parentTagName = parent.nodeName.toUpperCase();
        if (parentTagName !== 'DL') {
          return false;
        }
        var parentRole = (parent.getAttribute('role') || '').toLowerCase();
        if (!parentRole || !axe.commons.aria.isValidRole(parentRole)) {
          return true;
        }
        if (parentRole === 'list') {
          return true;
        }
        return false;
      }
    }, {
      id: 'has-listitem',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return virtualNode.children.every(function(_ref3) {
          var actualNode = _ref3.actualNode;
          return actualNode.nodeName.toUpperCase() !== 'LI';
        });
      }
    }, {
      id: 'listitem',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var parent = axe.commons.dom.getComposedParent(node);
        if (!parent) {
          return undefined;
        }
        var parentTagName = parent.nodeName.toUpperCase();
        var parentRole = (parent.getAttribute('role') || '').toLowerCase();
        if (parentRole === 'list') {
          return true;
        }
        if (parentRole && axe.commons.aria.isValidRole(parentRole)) {
          return false;
        }
        return [ 'UL', 'OL' ].includes(parentTagName);
      }
    }, {
      id: 'only-dlitems',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var _axe$commons6 = axe.commons, dom = _axe$commons6.dom, aria = _axe$commons6.aria;
        var ALLOWED_ROLES = [ 'definition', 'term', 'list' ];
        var base = {
          badNodes: [],
          hasNonEmptyTextNode: false
        };
        var content = virtualNode.children.reduce(function(content, child) {
          var actualNode = child.actualNode;
          if (actualNode.nodeName.toUpperCase() === 'DIV' && aria.getRole(actualNode) === null) {
            return content.concat(child.children);
          }
          return content.concat(child);
        }, []);
        var result = content.reduce(function(out, childNode) {
          var actualNode = childNode.actualNode;
          var tagName = actualNode.nodeName.toUpperCase();
          if (actualNode.nodeType === 1 && dom.isVisible(actualNode, true, false)) {
            var explicitRole = aria.getRole(actualNode, {
              noImplicit: true
            });
            if (tagName !== 'DT' && tagName !== 'DD' || explicitRole) {
              if (!ALLOWED_ROLES.includes(explicitRole)) {
                out.badNodes.push(actualNode);
              }
            }
          } else if (actualNode.nodeType === 3 && actualNode.nodeValue.trim() !== '') {
            out.hasNonEmptyTextNode = true;
          }
          return out;
        }, base);
        if (result.badNodes.length) {
          this.relatedNodes(result.badNodes);
        }
        return !!result.badNodes.length || result.hasNonEmptyTextNode;
      }
    }, {
      id: 'only-listitems',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var dom = axe.commons.dom;
        var getIsListItemRole = function getIsListItemRole(role, tagName) {
          return role === 'listitem' || tagName === 'LI' && !role;
        };
        var getHasListItem = function getHasListItem(hasListItem, tagName, isListItemRole) {
          return hasListItem || tagName === 'LI' && isListItemRole || isListItemRole;
        };
        var base = {
          badNodes: [],
          isEmpty: true,
          hasNonEmptyTextNode: false,
          hasListItem: false,
          liItemsWithRole: 0
        };
        var out = virtualNode.children.reduce(function(out, _ref4) {
          var actualNode = _ref4.actualNode;
          var tagName = actualNode.nodeName.toUpperCase();
          if (actualNode.nodeType === 1 && dom.isVisible(actualNode, true, false)) {
            var role = (actualNode.getAttribute('role') || '').toLowerCase();
            var isListItemRole = getIsListItemRole(role, tagName);
            out.hasListItem = getHasListItem(out.hasListItem, tagName, isListItemRole);
            if (isListItemRole) {
              out.isEmpty = false;
            }
            if (tagName === 'LI' && !isListItemRole) {
              out.liItemsWithRole++;
            }
            if (tagName !== 'LI' && !isListItemRole) {
              out.badNodes.push(actualNode);
            }
          }
          if (actualNode.nodeType === 3) {
            if (actualNode.nodeValue.trim() !== '') {
              out.hasNonEmptyTextNode = true;
            }
          }
          return out;
        }, base);
        var virtualNodeChildrenOfTypeLi = virtualNode.children.filter(function(_ref5) {
          var actualNode = _ref5.actualNode;
          return actualNode.nodeName.toUpperCase() === 'LI';
        });
        var allLiItemsHaveRole = out.liItemsWithRole > 0 && virtualNodeChildrenOfTypeLi.length === out.liItemsWithRole;
        if (out.badNodes.length) {
          this.relatedNodes(out.badNodes);
        }
        var isInvalidListItem = !(out.hasListItem || out.isEmpty && !allLiItemsHaveRole);
        return isInvalidListItem || !!out.badNodes.length || out.hasNonEmptyTextNode;
      }
    }, {
      id: 'structured-dlitems',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var children = virtualNode.children;
        if (!children || !children.length) {
          return false;
        }
        var hasDt = false, hasDd = false, nodeName;
        for (var i = 0; i < children.length; i++) {
          nodeName = children[i].actualNode.nodeName.toUpperCase();
          if (nodeName === 'DT') {
            hasDt = true;
          }
          if (hasDt && nodeName === 'DD') {
            return false;
          }
          if (nodeName === 'DD') {
            hasDd = true;
          }
        }
        return hasDt || hasDd;
      }
    }, {
      id: 'caption',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var tracks = axe.utils.querySelectorAll(virtualNode, 'track');
        var hasCaptions = tracks.some(function(_ref6) {
          var actualNode = _ref6.actualNode;
          return (actualNode.getAttribute('kind') || '').toLowerCase() === 'captions';
        });
        return hasCaptions ? false : undefined;
      }
    }, {
      id: 'description',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var tracks = axe.utils.querySelectorAll(virtualNode, 'track');
        var hasDescriptions = tracks.some(function(_ref7) {
          var actualNode = _ref7.actualNode;
          return (actualNode.getAttribute('kind') || '').toLowerCase() === 'descriptions';
        });
        return hasDescriptions ? false : undefined;
      }
    }, {
      id: 'frame-tested',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var resolve = this.async();
        var _Object$assign = Object.assign({
          isViolation: false,
          timeout: 500
        }, options), isViolation = _Object$assign.isViolation, timeout = _Object$assign.timeout;
        var timer = setTimeout(function() {
          timer = setTimeout(function() {
            timer = null;
            resolve(isViolation ? false : undefined);
          }, 0);
        }, timeout);
        axe.utils.respondable(node.contentWindow, 'axe.ping', null, undefined, function() {
          if (timer !== null) {
            clearTimeout(timer);
            resolve(true);
          }
        });
      },
      options: {
        isViolation: false
      }
    }, {
      id: 'css-orientation-lock',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var _ref8 = context || {}, _ref8$cssom = _ref8.cssom, cssom = _ref8$cssom === undefined ? undefined : _ref8$cssom;
        if (!cssom || !cssom.length) {
          return undefined;
        }
        var rulesGroupByDocumentFragment = cssom.reduce(function(out, _ref9) {
          var sheet = _ref9.sheet, root = _ref9.root, shadowId = _ref9.shadowId;
          var key = shadowId ? shadowId : 'topDocument';
          if (!out[key]) {
            out[key] = {
              root: root,
              rules: []
            };
          }
          if (!sheet || !sheet.cssRules) {
            return out;
          }
          var rules = Array.from(sheet.cssRules);
          out[key].rules = out[key].rules.concat(rules);
          return out;
        }, {});
        var isLocked = false;
        var relatedElements = [];
        Object.keys(rulesGroupByDocumentFragment).forEach(function(key) {
          var _rulesGroupByDocument = rulesGroupByDocumentFragment[key], root = _rulesGroupByDocument.root, rules = _rulesGroupByDocument.rules;
          var mediaRules = rules.filter(function(r) {
            return r.type === 4;
          });
          if (!mediaRules || !mediaRules.length) {
            return;
          }
          var orientationRules = mediaRules.filter(function(r) {
            var cssText = r.cssText;
            return /orientation:\s+landscape/i.test(cssText) || /orientation:\s+portrait/i.test(cssText);
          });
          if (!orientationRules || !orientationRules.length) {
            return;
          }
          orientationRules.forEach(function(r) {
            if (!r.cssRules.length) {
              return;
            }
            Array.from(r.cssRules).forEach(function(cssRule) {
              if (!cssRule.selectorText) {
                return;
              }
              if (cssRule.style.length <= 0) {
                return;
              }
              var transformStyleValue = cssRule.style.transform || false;
              if (!transformStyleValue) {
                return;
              }
              var rotate = transformStyleValue.match(/rotate\(([^)]+)deg\)/);
              var deg = parseInt(rotate && rotate[1] || 0);
              var locked = deg % 90 === 0 && deg % 180 !== 0;
              if (locked && cssRule.selectorText.toUpperCase() !== 'HTML') {
                var selector = cssRule.selectorText;
                var elms = Array.from(root.querySelectorAll(selector));
                if (elms && elms.length) {
                  relatedElements = relatedElements.concat(elms);
                }
              }
              isLocked = locked;
            });
          });
        });
        if (!isLocked) {
          return true;
        }
        if (relatedElements.length) {
          this.relatedNodes(relatedElements);
        }
        return false;
      }
    }, {
      id: 'meta-viewport-large',
      evaluate: function evaluate(node, options, virtualNode, context) {
        options = options || {};
        var params, content = node.getAttribute('content') || '', parsedParams = content.split(/[;,]/), result = {}, minimum = options.scaleMinimum || 2, lowerBound = options.lowerBound || false;
        for (var i = 0, l = parsedParams.length; i < l; i++) {
          params = parsedParams[i].split('=');
          var key = params.shift().toLowerCase();
          if (key && params.length) {
            result[key.trim()] = params.shift().trim().toLowerCase();
          }
        }
        if (lowerBound && result['maximum-scale'] && parseFloat(result['maximum-scale']) < lowerBound) {
          return true;
        }
        if (!lowerBound && result['user-scalable'] === 'no') {
          this.data('user-scalable=no');
          return false;
        }
        if (result['maximum-scale'] && parseFloat(result['maximum-scale']) < minimum) {
          this.data('maximum-scale');
          return false;
        }
        return true;
      },
      options: {
        scaleMinimum: 5,
        lowerBound: 2
      }
    }, {
      id: 'meta-viewport',
      evaluate: function evaluate(node, options, virtualNode, context) {
        options = options || {};
        var params, content = node.getAttribute('content') || '', parsedParams = content.split(/[;,]/), result = {}, minimum = options.scaleMinimum || 2, lowerBound = options.lowerBound || false;
        for (var i = 0, l = parsedParams.length; i < l; i++) {
          params = parsedParams[i].split('=');
          var key = params.shift().toLowerCase();
          if (key && params.length) {
            result[key.trim()] = params.shift().trim().toLowerCase();
          }
        }
        if (lowerBound && result['maximum-scale'] && parseFloat(result['maximum-scale']) < lowerBound) {
          return true;
        }
        if (!lowerBound && result['user-scalable'] === 'no') {
          this.data('user-scalable=no');
          return false;
        }
        if (result['maximum-scale'] && parseFloat(result['maximum-scale']) < minimum) {
          this.data('maximum-scale');
          return false;
        }
        return true;
      },
      options: {
        scaleMinimum: 2
      }
    }, {
      id: 'header-present',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return !!axe.utils.querySelectorAll(virtualNode, 'h1, h2, h3, h4, h5, h6, [role="heading"]')[0];
      }
    }, {
      id: 'heading-order',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var ariaHeadingLevel = node.getAttribute('aria-level');
        if (ariaHeadingLevel !== null) {
          this.data(parseInt(ariaHeadingLevel, 10));
          return true;
        }
        var headingLevel = node.tagName.match(/H(\d)/);
        if (headingLevel) {
          this.data(parseInt(headingLevel[1], 10));
          return true;
        }
        return true;
      },
      after: function after(results, options) {
        if (results.length < 2) {
          return results;
        }
        var prevLevel = results[0].data;
        for (var i = 1; i < results.length; i++) {
          if (results[i].result && results[i].data > prevLevel + 1) {
            results[i].result = false;
          }
          prevLevel = results[i].data;
        }
        return results;
      }
    }, {
      id: 'internal-link-present',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var links = axe.utils.querySelectorAll(virtualNode, 'a[href]');
        return links.some(function(vLink) {
          return /^#[^/!]/.test(vLink.actualNode.getAttribute('href'));
        });
      }
    }, {
      id: 'landmark',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return axe.utils.querySelectorAll(virtualNode, 'main, [role="main"]').length > 0;
      }
    }, {
      id: 'meta-refresh',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var content = node.getAttribute('content') || '', parsedParams = content.split(/[;,]/);
        return content === '' || parsedParams[0] === '0';
      }
    }, {
      id: 'p-as-heading',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var siblings = Array.from(node.parentNode.children);
        var currentIndex = siblings.indexOf(node);
        options = options || {};
        var margins = options.margins || [];
        var nextSibling = siblings.slice(currentIndex + 1).find(function(elm) {
          return elm.nodeName.toUpperCase() === 'P';
        });
        var prevSibling = siblings.slice(0, currentIndex).reverse().find(function(elm) {
          return elm.nodeName.toUpperCase() === 'P';
        });
        function getTextContainer(elm) {
          var nextNode = elm;
          var outerText = elm.textContent.trim();
          var innerText = outerText;
          while (innerText === outerText && nextNode !== undefined) {
            var i = -1;
            elm = nextNode;
            if (elm.children.length === 0) {
              return elm;
            }
            do {
              i++;
              innerText = elm.children[i].textContent.trim();
            } while (innerText === '' && i + 1 < elm.children.length);
            nextNode = elm.children[i];
          }
          return elm;
        }
        function normalizeFontWeight(weight) {
          switch (weight) {
           case 'lighter':
            return 100;

           case 'normal':
            return 400;

           case 'bold':
            return 700;

           case 'bolder':
            return 900;
          }
          weight = parseInt(weight);
          return !isNaN(weight) ? weight : 400;
        }
        function getStyleValues(node) {
          var style = window.getComputedStyle(getTextContainer(node));
          return {
            fontWeight: normalizeFontWeight(style.getPropertyValue('font-weight')),
            fontSize: parseInt(style.getPropertyValue('font-size')),
            isItalic: style.getPropertyValue('font-style') === 'italic'
          };
        }
        function isHeaderStyle(styleA, styleB, margins) {
          return margins.reduce(function(out, margin) {
            return out || (!margin.size || styleA.fontSize / margin.size > styleB.fontSize) && (!margin.weight || styleA.fontWeight - margin.weight > styleB.fontWeight) && (!margin.italic || styleA.isItalic && !styleB.isItalic);
          }, false);
        }
        var currStyle = getStyleValues(node);
        var nextStyle = nextSibling ? getStyleValues(nextSibling) : null;
        var prevStyle = prevSibling ? getStyleValues(prevSibling) : null;
        if (!nextStyle || !isHeaderStyle(currStyle, nextStyle, margins)) {
          return true;
        }
        var blockquote = axe.commons.dom.findUpVirtual(virtualNode, 'blockquote');
        if (blockquote && blockquote.nodeName.toUpperCase() === 'BLOCKQUOTE') {
          return undefined;
        }
        if (prevStyle && !isHeaderStyle(currStyle, prevStyle, margins)) {
          return undefined;
        }
        return false;
      },
      options: {
        margins: [ {
          weight: 150,
          italic: true
        }, {
          weight: 150,
          size: 1.15
        }, {
          italic: true,
          size: 1.15
        }, {
          size: 1.4
        } ]
      }
    }, {
      id: 'region',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var _axe$commons7 = axe.commons, dom = _axe$commons7.dom, aria = _axe$commons7.aria;
        function getSkiplink(virtualNode) {
          var firstLink = axe.utils.querySelectorAll(virtualNode, 'a[href]')[0];
          if (firstLink && axe.commons.dom.getElementByReference(firstLink.actualNode, 'href')) {
            return firstLink.actualNode;
          }
        }
        var skipLink = getSkiplink(virtualNode);
        var landmarkRoles = aria.getRolesByType('landmark');
        var implicitLandmarks = landmarkRoles.reduce(function(arr, role) {
          return arr.concat(aria.implicitNodes(role));
        }, []).filter(function(r) {
          return r !== null;
        });
        function isSkipLink(vNode) {
          return skipLink && skipLink === vNode.actualNode;
        }
        function isRegion(virtualNode) {
          var node = virtualNode.actualNode;
          var explicitRole = axe.commons.aria.getRole(node, {
            noImplicit: true
          });
          var ariaLive = (node.getAttribute('aria-live') || '').toLowerCase().trim();
          if (explicitRole) {
            return explicitRole === 'dialog' || landmarkRoles.includes(explicitRole);
          }
          if ([ 'assertive', 'polite' ].includes(ariaLive)) {
            return true;
          }
          return implicitLandmarks.some(function(implicitSelector) {
            var matches = axe.utils.matchesSelector(node, implicitSelector);
            if (node.tagName.toLowerCase() === 'form') {
              var titleAttr = node.getAttribute('title');
              var title = titleAttr && titleAttr.trim() !== '' ? axe.commons.text.sanitize(titleAttr) : null;
              return matches && (!!aria.labelVirtual(virtualNode) || !!title);
            }
            return matches;
          });
        }
        function findRegionlessElms(virtualNode) {
          var node = virtualNode.actualNode;
          if (isRegion(virtualNode) || isSkipLink(virtualNode) || !dom.isVisible(node, true)) {
            return [];
          } else if (dom.hasContent(node, true)) {
            return [ node ];
          } else {
            return virtualNode.children.filter(function(_ref10) {
              var actualNode = _ref10.actualNode;
              return actualNode.nodeType === 1;
            }).map(findRegionlessElms).reduce(function(a, b) {
              return a.concat(b);
            }, []);
          }
        }
        var regionlessNodes = findRegionlessElms(virtualNode);
        this.relatedNodes(regionlessNodes);
        return regionlessNodes.length === 0;
      },
      after: function after(results, options) {
        return [ results[0] ];
      }
    }, {
      id: 'skip-link',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var target = axe.commons.dom.getElementByReference(node, 'href');
        if (target) {
          return axe.commons.dom.isVisible(target, true) || undefined;
        }
        return false;
      }
    }, {
      id: 'unique-frame-title',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var title = axe.commons.text.sanitize(node.title).trim().toLowerCase();
        this.data(title);
        return true;
      },
      after: function after(results, options) {
        var titles = {};
        results.forEach(function(r) {
          titles[r.data] = titles[r.data] !== undefined ? ++titles[r.data] : 0;
        });
        results.forEach(function(r) {
          r.result = !!titles[r.data];
        });
        return results;
      }
    }, {
      id: 'duplicate-id-active',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var id = node.getAttribute('id').trim();
        if (!id) {
          return true;
        }
        var root = axe.commons.dom.getRootNode(node);
        var matchingNodes = Array.from(root.querySelectorAll('[id="' + axe.commons.utils.escapeSelector(id) + '"]')).filter(function(foundNode) {
          return foundNode !== node;
        });
        if (matchingNodes.length) {
          this.relatedNodes(matchingNodes);
        }
        this.data(id);
        return matchingNodes.length === 0;
      },
      after: function after(results, options) {
        var uniqueIds = [];
        return results.filter(function(r) {
          if (uniqueIds.indexOf(r.data) === -1) {
            uniqueIds.push(r.data);
            return true;
          }
          return false;
        });
      }
    }, {
      id: 'duplicate-id-aria',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var id = node.getAttribute('id').trim();
        if (!id) {
          return true;
        }
        var root = axe.commons.dom.getRootNode(node);
        var matchingNodes = Array.from(root.querySelectorAll('[id="' + axe.commons.utils.escapeSelector(id) + '"]')).filter(function(foundNode) {
          return foundNode !== node;
        });
        if (matchingNodes.length) {
          this.relatedNodes(matchingNodes);
        }
        this.data(id);
        return matchingNodes.length === 0;
      },
      after: function after(results, options) {
        var uniqueIds = [];
        return results.filter(function(r) {
          if (uniqueIds.indexOf(r.data) === -1) {
            uniqueIds.push(r.data);
            return true;
          }
          return false;
        });
      }
    }, {
      id: 'duplicate-id',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var id = node.getAttribute('id').trim();
        if (!id) {
          return true;
        }
        var root = axe.commons.dom.getRootNode(node);
        var matchingNodes = Array.from(root.querySelectorAll('[id="' + axe.commons.utils.escapeSelector(id) + '"]')).filter(function(foundNode) {
          return foundNode !== node;
        });
        if (matchingNodes.length) {
          this.relatedNodes(matchingNodes);
        }
        this.data(id);
        return matchingNodes.length === 0;
      },
      after: function after(results, options) {
        var uniqueIds = [];
        return results.filter(function(r) {
          if (uniqueIds.indexOf(r.data) === -1) {
            uniqueIds.push(r.data);
            return true;
          }
          return false;
        });
      }
    }, {
      id: 'aria-label',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var label = node.getAttribute('aria-label');
        return !!(label ? axe.commons.text.sanitize(label).trim() : '');
      }
    }, {
      id: 'aria-labelledby',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var getIdRefs = axe.commons.dom.idrefs;
        return getIdRefs(node, 'aria-labelledby').some(function(elm) {
          return elm && axe.commons.text.accessibleText(elm, true);
        });
      }
    }, {
      id: 'button-has-visible-text',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var nodeName = node.nodeName.toUpperCase();
        var role = node.getAttribute('role');
        var label = void 0;
        if (nodeName === 'BUTTON' || role === 'button' && nodeName !== 'INPUT') {
          label = axe.commons.text.accessibleTextVirtual(virtualNode);
          this.data(label);
          return !!label;
        } else {
          return false;
        }
      }
    }, {
      id: 'doc-has-title',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var title = document.title;
        return !!(title ? axe.commons.text.sanitize(title).trim() : '');
      }
    }, {
      id: 'exists',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return true;
      }
    }, {
      id: 'has-alt',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var nn = node.nodeName.toLowerCase();
        return node.hasAttribute('alt') && (nn === 'img' || nn === 'input' || nn === 'area');
      }
    }, {
      id: 'has-visible-text',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return axe.commons.text.accessibleTextVirtual(virtualNode).length > 0;
      }
    }, {
      id: 'is-on-screen',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return axe.commons.dom.isVisible(node, false) && !axe.commons.dom.isOffscreen(node);
      }
    }, {
      id: 'non-empty-alt',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var label = node.getAttribute('alt');
        return !!(label ? axe.commons.text.sanitize(label).trim() : '');
      }
    }, {
      id: 'non-empty-if-present',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var nodeName = node.nodeName.toUpperCase();
        var type = (node.getAttribute('type') || '').toLowerCase();
        var label = node.getAttribute('value');
        this.data(label);
        if (nodeName === 'INPUT' && [ 'submit', 'reset' ].includes(type)) {
          return label === null;
        }
        return false;
      }
    }, {
      id: 'non-empty-title',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var title = node.getAttribute('title');
        return !!(title ? axe.commons.text.sanitize(title).trim() : '');
      }
    }, {
      id: 'non-empty-value',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var label = node.getAttribute('value');
        return !!(label ? axe.commons.text.sanitize(label).trim() : '');
      }
    }, {
      id: 'role-none',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return node.getAttribute('role') === 'none';
      }
    }, {
      id: 'role-presentation',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return node.getAttribute('role') === 'presentation';
      }
    }, {
      id: 'caption-faked',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var table = axe.commons.table.toGrid(node);
        var firstRow = table[0];
        if (table.length <= 1 || firstRow.length <= 1 || node.rows.length <= 1) {
          return true;
        }
        return firstRow.reduce(function(out, curr, i) {
          return out || curr !== firstRow[i + 1] && firstRow[i + 1] !== undefined;
        }, false);
      }
    }, {
      id: 'has-caption',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return !!node.caption;
      }
    }, {
      id: 'has-summary',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return !!node.summary;
      }
    }, {
      id: 'has-th',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var row, cell, badCells = [];
        for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
          row = node.rows[rowIndex];
          for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
            cell = row.cells[cellIndex];
            if (cell.nodeName.toUpperCase() === 'TH' || [ 'rowheader', 'columnheader' ].indexOf(cell.getAttribute('role')) !== -1) {
              badCells.push(cell);
            }
          }
        }
        if (badCells.length) {
          this.relatedNodes(badCells);
          return true;
        }
        return false;
      }
    }, {
      id: 'html5-scope',
      evaluate: function evaluate(node, options, virtualNode, context) {
        if (!axe.commons.dom.isHTML5(document)) {
          return true;
        }
        return node.nodeName.toUpperCase() === 'TH';
      }
    }, {
      id: 'same-caption-summary',
      evaluate: function evaluate(node, options, virtualNode, context) {
        return !!(node.summary && node.caption) && node.summary.toLowerCase() === axe.commons.text.accessibleText(node.caption).toLowerCase();
      }
    }, {
      id: 'scope-value',
      evaluate: function evaluate(node, options, virtualNode, context) {
        options = options || {};
        var value = node.getAttribute('scope').toLowerCase();
        var validVals = [ 'row', 'col', 'rowgroup', 'colgroup' ] || options.values;
        return validVals.indexOf(value) !== -1;
      }
    }, {
      id: 'td-has-header',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var tableUtils = axe.commons.table;
        var badCells = [];
        var cells = tableUtils.getAllCells(node);
        cells.forEach(function(cell) {
          if (axe.commons.dom.hasContent(cell) && tableUtils.isDataCell(cell) && !axe.commons.aria.label(cell)) {
            var hasHeaders = tableUtils.getHeaders(cell).some(function(header) {
              return header !== null && !!axe.commons.dom.hasContent(header);
            });
            if (!hasHeaders) {
              badCells.push(cell);
            }
          }
        });
        if (badCells.length) {
          this.relatedNodes(badCells);
          return false;
        }
        return true;
      }
    }, {
      id: 'td-headers-attr',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var cells = [];
        for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
          var row = node.rows[rowIndex];
          for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
            cells.push(row.cells[cellIndex]);
          }
        }
        var ids = cells.reduce(function(ids, cell) {
          if (cell.getAttribute('id')) {
            ids.push(cell.getAttribute('id'));
          }
          return ids;
        }, []);
        var badCells = cells.reduce(function(badCells, cell) {
          var isSelf, notOfTable;
          var headers = (cell.getAttribute('headers') || '').split(/\s/).reduce(function(headers, header) {
            header = header.trim();
            if (header) {
              headers.push(header);
            }
            return headers;
          }, []);
          if (headers.length !== 0) {
            if (cell.getAttribute('id')) {
              isSelf = headers.indexOf(cell.getAttribute('id').trim()) !== -1;
            }
            notOfTable = headers.reduce(function(fail, header) {
              return fail || ids.indexOf(header) === -1;
            }, false);
            if (isSelf || notOfTable) {
              badCells.push(cell);
            }
          }
          return badCells;
        }, []);
        if (badCells.length > 0) {
          this.relatedNodes(badCells);
          return false;
        } else {
          return true;
        }
      }
    }, {
      id: 'th-has-data-cells',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var tableUtils = axe.commons.table;
        var cells = tableUtils.getAllCells(node);
        var checkResult = this;
        var reffedHeaders = [];
        cells.forEach(function(cell) {
          var headers = cell.getAttribute('headers');
          if (headers) {
            reffedHeaders = reffedHeaders.concat(headers.split(/\s+/));
          }
          var ariaLabel = cell.getAttribute('aria-labelledby');
          if (ariaLabel) {
            reffedHeaders = reffedHeaders.concat(ariaLabel.split(/\s+/));
          }
        });
        var headers = cells.filter(function(cell) {
          if (axe.commons.text.sanitize(cell.textContent) === '') {
            return false;
          }
          return cell.nodeName.toUpperCase() === 'TH' || [ 'rowheader', 'columnheader' ].indexOf(cell.getAttribute('role')) !== -1;
        });
        var tableGrid = tableUtils.toGrid(node);
        var out = headers.reduce(function(res, header) {
          if (header.getAttribute('id') && reffedHeaders.includes(header.getAttribute('id'))) {
            return !res ? res : true;
          }
          var hasCell = false;
          var pos = tableUtils.getCellPosition(header, tableGrid);
          if (tableUtils.isColumnHeader(header)) {
            hasCell = tableUtils.traverse('down', pos, tableGrid).reduce(function(out, cell) {
              return out || axe.commons.dom.hasContent(cell) && !tableUtils.isColumnHeader(cell);
            }, false);
          }
          if (!hasCell && tableUtils.isRowHeader(header)) {
            hasCell = tableUtils.traverse('right', pos, tableGrid).reduce(function(out, cell) {
              return out || axe.commons.dom.hasContent(cell) && !tableUtils.isRowHeader(cell);
            }, false);
          }
          if (!hasCell) {
            checkResult.relatedNodes(header);
          }
          return res && hasCell;
        }, true);
        return out ? true : undefined;
      }
    }, {
      id: 'hidden-content',
      evaluate: function evaluate(node, options, virtualNode, context) {
        var whitelist = [ 'SCRIPT', 'HEAD', 'TITLE', 'NOSCRIPT', 'STYLE', 'TEMPLATE' ];
        if (!whitelist.includes(node.tagName.toUpperCase()) && axe.commons.dom.hasContentVirtual(virtualNode)) {
          var styles = window.getComputedStyle(node);
          if (styles.getPropertyValue('display') === 'none') {
            return undefined;
          } else if (styles.getPropertyValue('visibility') === 'hidden') {
            var parent = axe.commons.dom.getComposedParent(node);
            var parentStyle = parent && window.getComputedStyle(parent);
            if (!parentStyle || parentStyle.getPropertyValue('visibility') !== 'hidden') {
              return undefined;
            }
          }
        }
        return true;
      }
    } ],
    commons: function() {
      var commons = {};
      var aria = commons.aria = {}, lookupTable = aria.lookupTable = {};
      lookupTable.attributes = {
        'aria-activedescendant': {
          type: 'idref'
        },
        'aria-atomic': {
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-autocomplete': {
          type: 'nmtoken',
          values: [ 'inline', 'list', 'both', 'none' ]
        },
        'aria-busy': {
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-checked': {
          type: 'nmtoken',
          values: [ 'true', 'false', 'mixed', 'undefined' ]
        },
        'aria-colcount': {
          type: 'int'
        },
        'aria-colindex': {
          type: 'int'
        },
        'aria-colspan': {
          type: 'int'
        },
        'aria-controls': {
          type: 'idrefs'
        },
        'aria-current': {
          type: 'nmtoken',
          values: [ 'page', 'step', 'location', 'date', 'time', 'true', 'false' ]
        },
        'aria-describedby': {
          type: 'idrefs'
        },
        'aria-disabled': {
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-dropeffect': {
          type: 'nmtokens',
          values: [ 'copy', 'move', 'reference', 'execute', 'popup', 'none' ]
        },
        'aria-errormessage': {
          type: 'idref'
        },
        'aria-expanded': {
          type: 'nmtoken',
          values: [ 'true', 'false', 'undefined' ]
        },
        'aria-flowto': {
          type: 'idrefs'
        },
        'aria-grabbed': {
          type: 'nmtoken',
          values: [ 'true', 'false', 'undefined' ]
        },
        'aria-haspopup': {
          type: 'nmtoken',
          values: [ 'true', 'false', 'menu', 'listbox', 'tree', 'grid', 'dialog' ]
        },
        'aria-hidden': {
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-invalid': {
          type: 'nmtoken',
          values: [ 'true', 'false', 'spelling', 'grammar' ]
        },
        'aria-keyshortcuts': {
          type: 'string'
        },
        'aria-label': {
          type: 'string'
        },
        'aria-labelledby': {
          type: 'idrefs'
        },
        'aria-level': {
          type: 'int'
        },
        'aria-live': {
          type: 'nmtoken',
          values: [ 'off', 'polite', 'assertive' ]
        },
        'aria-modal': {
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-multiline': {
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-multiselectable': {
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-orientation': {
          type: 'nmtoken',
          values: [ 'horizontal', 'vertical' ]
        },
        'aria-owns': {
          type: 'idrefs'
        },
        'aria-placeholder': {
          type: 'string'
        },
        'aria-posinset': {
          type: 'int'
        },
        'aria-pressed': {
          type: 'nmtoken',
          values: [ 'true', 'false', 'mixed', 'undefined' ]
        },
        'aria-readonly': {
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-relevant': {
          type: 'nmtokens',
          values: [ 'additions', 'removals', 'text', 'all' ]
        },
        'aria-required': {
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-rowcount': {
          type: 'int'
        },
        'aria-rowindex': {
          type: 'int'
        },
        'aria-rowspan': {
          type: 'int'
        },
        'aria-selected': {
          type: 'nmtoken',
          values: [ 'true', 'false', 'undefined' ]
        },
        'aria-setsize': {
          type: 'int'
        },
        'aria-sort': {
          type: 'nmtoken',
          values: [ 'ascending', 'descending', 'other', 'none' ]
        },
        'aria-valuemax': {
          type: 'decimal'
        },
        'aria-valuemin': {
          type: 'decimal'
        },
        'aria-valuenow': {
          type: 'decimal'
        },
        'aria-valuetext': {
          type: 'string'
        }
      };
      lookupTable.globalAttributes = [ 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant' ];
      var elementConditions = {
        CANNOT_HAVE_LIST_ATTRIBUTE: function CANNOT_HAVE_LIST_ATTRIBUTE(node) {
          var nodeAttrs = Array.from(node.attributes).map(function(a) {
            return a.name.toUpperCase();
          });
          if (nodeAttrs.includes('LIST')) {
            return false;
          }
          return true;
        },
        CANNOT_HAVE_HREF_ATTRIBUTE: function CANNOT_HAVE_HREF_ATTRIBUTE(node) {
          var nodeAttrs = Array.from(node.attributes).map(function(a) {
            return a.name.toUpperCase();
          });
          if (nodeAttrs.includes('HREF')) {
            return false;
          }
          return true;
        },
        MUST_HAVE_HREF_ATTRIBUTE: function MUST_HAVE_HREF_ATTRIBUTE(node) {
          if (!node.href) {
            return false;
          }
          return true;
        },
        MUST_HAVE_SIZE_ATTRIBUTE_WITH_VALUE_GREATER_THAN_1: function MUST_HAVE_SIZE_ATTRIBUTE_WITH_VALUE_GREATER_THAN_1(node) {
          var attr = 'SIZE';
          var nodeAttrs = Array.from(node.attributes).map(function(a) {
            return a.name.toUpperCase();
          });
          if (!nodeAttrs.includes(attr)) {
            return false;
          }
          return Number(node.getAttribute(attr)) > 1;
        },
        MUST_HAVE_ALT_ATTRIBUTE: function MUST_HAVE_ALT_ATTRIBUTE(node) {
          var attr = 'ALT';
          var nodeAttrs = Array.from(node.attributes).map(function(a) {
            return a.name.toUpperCase();
          });
          if (!nodeAttrs.includes(attr)) {
            return false;
          }
          return true;
        },
        MUST_HAVE_ALT_ATTRIBUTE_WITH_VALUE: function MUST_HAVE_ALT_ATTRIBUTE_WITH_VALUE(node) {
          var attr = 'ALT';
          var nodeAttrs = Array.from(node.attributes).map(function(a) {
            return a.name.toUpperCase();
          });
          if (!nodeAttrs.includes(attr)) {
            return false;
          }
          var attrValue = node.getAttribute(attr);
          return attrValue && attrValue.length > 0;
        }
      };
      lookupTable.role = {
        alert: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        alertdialog: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-modal', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'DIALOG', 'SECTION' ]
        },
        application: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'ARTICLE', 'AUDIO', 'EMBED', 'IFRAME', 'OBJECT', 'SECTION', 'SVG', 'VIDEO' ]
        },
        article: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-posinset', 'aria-setsize', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'article' ],
          unsupported: false
        },
        banner: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'header' ],
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        button: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-pressed', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'button', 'input[type="button"]', 'input[type="image"]', 'input[type="reset"]', 'input[type="submit"]', 'summary' ],
          unsupported: false,
          allowedElements: [ {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        cell: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-colindex', 'aria-colspan', 'aria-rowindex', 'aria-rowspan', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'row' ],
          implicit: [ 'td', 'th' ],
          unsupported: false
        },
        checkbox: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-checked', 'aria-required', 'aria-readonly', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'input[type="checkbox"]' ],
          unsupported: false,
          allowedElements: [ 'BUTTON' ]
        },
        columnheader: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-colindex', 'aria-colspan', 'aria-expanded', 'aria-rowindex', 'aria-rowspan', 'aria-required', 'aria-readonly', 'aria-selected', 'aria-sort', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'row' ],
          implicit: [ 'th' ],
          unsupported: false
        },
        combobox: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-autocomplete', 'aria-required', 'aria-activedescendant', 'aria-orientation', 'aria-errormessage' ],
            required: [ 'aria-expanded' ]
          },
          owned: {
            all: [ 'listbox', 'textbox' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'TEXT'
            }
          } ]
        },
        command: {
          nameFrom: [ 'author' ],
          type: 'abstract',
          unsupported: false
        },
        complementary: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'aside' ],
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        composite: {
          nameFrom: [ 'author' ],
          type: 'abstract',
          unsupported: false
        },
        contentinfo: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'footer' ],
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        definition: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'dd', 'dfn' ],
          unsupported: false
        },
        dialog: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-modal', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'dialog' ],
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        directory: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'OL', 'UL' ]
        },
        document: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'body' ],
          unsupported: false,
          allowedElements: [ 'ARTICLE', 'EMBED', 'IFRAME', 'SECTION', 'SVG', 'OBJECT' ]
        },
        'doc-abstract': {
          type: 'section',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-acknowledgments': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-afterword': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-appendix': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-backlink': {
          type: 'link',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          unsupported: false,
          allowedElements: [ {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        'doc-biblioentry': {
          type: 'listitem',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: [ 'doc-bibliography' ],
          unsupported: false,
          allowedElements: [ 'LI' ]
        },
        'doc-bibliography': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-biblioref': {
          type: 'link',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          unsupported: false,
          allowedElements: [ {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        'doc-chapter': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-colophon': {
          type: 'section',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-conclusion': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-cover': {
          type: 'img',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false
        },
        'doc-credit': {
          type: 'section',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-credits': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-dedication': {
          type: 'section',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-endnote': {
          type: 'listitem',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: [ 'doc-endnotes' ],
          unsupported: false,
          allowedElements: [ 'LI' ]
        },
        'doc-endnotes': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: [ 'doc-endnote' ],
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-epigraph': {
          type: 'section',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false
        },
        'doc-epilogue': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-errata': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-example': {
          type: 'section',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'ASIDE', 'SECTION' ]
        },
        'doc-footnote': {
          type: 'section',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'ASIDE', 'FOOTER', 'HEADER' ]
        },
        'doc-foreword': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-glossary': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: [ 'term', 'definition' ],
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'DL' ]
        },
        'doc-glossref': {
          type: 'link',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author', 'contents' ],
          context: null,
          unsupported: false,
          allowedElements: [ {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        'doc-index': {
          type: 'navigation',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'NAV', 'SECTION' ]
        },
        'doc-introduction': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-noteref': {
          type: 'link',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          namefrom: [ 'author', 'contents' ],
          context: null,
          unsupported: false,
          allowedElements: [ {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        'doc-notice': {
          type: 'note',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-pagebreak': {
          type: 'separator',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'HR' ]
        },
        'doc-pagelist': {
          type: 'navigation',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'NAV', 'SECTION' ]
        },
        'doc-part': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-preface': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-prologue': {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-pullquote': {
          type: 'none',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'ASIDE', 'SECTION' ]
        },
        'doc-qna': {
          type: 'section',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        'doc-subtitle': {
          type: 'sectionhead',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'H1', 'H2', 'H3', 'H4', 'H5', 'H6' ]
        },
        'doc-tip': {
          type: 'note',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'ASIDE' ]
        },
        'doc-toc': {
          type: 'navigation',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          namefrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'NAV', 'SECTION' ]
        },
        feed: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: {
            one: [ 'article' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'ARTICLE', 'ASIDE', 'SECTION' ]
        },
        figure: {
          type: 'structure',
          unsupported: true
        },
        form: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'form' ],
          unsupported: false
        },
        grid: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded', 'aria-colcount', 'aria-level', 'aria-multiselectable', 'aria-readonly', 'aria-rowcount', 'aria-errormessage' ]
          },
          owned: {
            one: [ 'rowgroup', 'row' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'table' ],
          unsupported: false
        },
        gridcell: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-colindex', 'aria-colspan', 'aria-expanded', 'aria-rowindex', 'aria-rowspan', 'aria-selected', 'aria-readonly', 'aria-required', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'row' ],
          implicit: [ 'td', 'th' ],
          unsupported: false
        },
        group: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'details', 'optgroup' ],
          unsupported: false,
          allowedElements: [ 'DL', 'FIGCAPTION', 'FIELDSET', 'FIGURE', 'FOOTER', 'HEADER', 'OL', 'UL' ]
        },
        heading: {
          type: 'structure',
          attributes: {
            required: [ 'aria-level' ],
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ],
          unsupported: false
        },
        img: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'img' ],
          unsupported: false,
          allowedElements: [ 'EMBED', 'IFRAME', 'OBJECT', 'SVG' ]
        },
        input: {
          nameFrom: [ 'author' ],
          type: 'abstract',
          unsupported: false
        },
        landmark: {
          nameFrom: [ 'author' ],
          type: 'abstract',
          unsupported: false
        },
        link: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'a[href]' ],
          unsupported: false,
          allowedElements: [ 'BUTTON', {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'IMAGE'
            }
          }, {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'IMAGE'
            }
          } ]
        },
        list: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: {
            all: [ 'listitem' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'ol', 'ul', 'dl' ],
          unsupported: false
        },
        listbox: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-multiselectable', 'aria-required', 'aria-expanded', 'aria-orientation', 'aria-errormessage' ]
          },
          owned: {
            all: [ 'option' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'select' ],
          unsupported: false,
          allowedElements: [ 'OL', 'UL' ]
        },
        listitem: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-level', 'aria-posinset', 'aria-setsize', 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'list' ],
          implicit: [ 'li', 'dt' ],
          unsupported: false
        },
        log: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        main: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'main' ],
          unsupported: false,
          allowedElements: [ 'ARTICLE', 'SECTION' ]
        },
        marquee: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        math: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'math' ],
          unsupported: false
        },
        menu: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded', 'aria-orientation', 'aria-errormessage' ]
          },
          owned: {
            one: [ 'menuitem', 'menuitemradio', 'menuitemcheckbox' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'menu[type="context"]' ],
          unsupported: false,
          allowedElements: [ 'OL', 'UL' ]
        },
        menubar: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded', 'aria-orientation', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'OL', 'UL' ]
        },
        menuitem: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-posinset', 'aria-setsize', 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'menu', 'menubar' ],
          implicit: [ 'menuitem[type="command"]' ],
          unsupported: false,
          allowedElements: [ 'BUTTON', 'LI', {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'IMAGE'
            }
          }, {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'BUTTON'
            }
          }, {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        menuitemcheckbox: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-checked', 'aria-posinset', 'aria-setsize', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'menu', 'menubar' ],
          implicit: [ 'menuitem[type="checkbox"]' ],
          unsupported: false,
          allowedElements: [ 'BUTTON', 'LI', {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'CHECKBOX'
            }
          }, {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'IMAGE'
            }
          }, {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'BUTTON'
            }
          }, {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        menuitemradio: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-checked', 'aria-selected', 'aria-posinset', 'aria-setsize', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'menu', 'menubar' ],
          implicit: [ 'menuitem[type="radio"]' ],
          unsupported: false,
          allowedElements: [ 'BUTTON', 'LI', {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'IMAGE'
            }
          }, {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'BUTTON'
            }
          }, {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        navigation: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'nav' ],
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        none: {
          type: 'structure',
          attributes: null,
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'ARTICLE', 'ASIDE', 'DL', 'EMBED', 'FIGCAPTION', 'FIELDSET', 'FIGURE', 'FOOTER', 'FORM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER', 'LI', 'SECTION', 'OL', {
            tagName: 'IMG',
            condition: elementConditions.MUST_HAVE_ALT_ATTRIBUTE
          } ]
        },
        note: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'ASIDE' ]
        },
        option: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-selected', 'aria-posinset', 'aria-setsize', 'aria-checked', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'listbox' ],
          implicit: [ 'option' ],
          unsupported: false,
          allowedElements: [ 'BUTTON', 'LI', {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'CHECKBOX'
            }
          }, {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'BUTTON'
            }
          }, {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        presentation: {
          type: 'structure',
          attributes: null,
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'ARTICLE', 'ASIDE', 'DL', 'EMBED', 'FIGCAPTION', 'FIELDSET', 'FIGURE', 'FOOTER', 'FORM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER', 'HR', 'LI', 'OL', 'SECTION', 'UL', {
            tagName: 'IMG',
            condition: elementConditions.MUST_HAVE_ALT_ATTRIBUTE
          } ]
        },
        progressbar: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-valuetext', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin', 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'progress' ],
          unsupported: false
        },
        radio: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-selected', 'aria-posinset', 'aria-setsize', 'aria-required', 'aria-errormessage' ],
            required: [ 'aria-checked' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'input[type="radio"]' ],
          unsupported: false,
          allowedElements: [ 'BUTTON', 'LI', {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'IMAGE'
            }
          }, {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'BUTTON'
            }
          } ]
        },
        radiogroup: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-required', 'aria-expanded', 'aria-readonly', 'aria-errormessage' ]
          },
          owned: {
            all: [ 'radio' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'OL', 'UL' ]
        },
        range: {
          nameFrom: [ 'author' ],
          type: 'abstract',
          unsupported: false
        },
        region: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'section[aria-label]', 'section[aria-labelledby]', 'section[title]' ],
          unsupported: false,
          allowedElements: [ 'ARTICLE', 'ASIDE' ]
        },
        roletype: {
          type: 'abstract',
          unsupported: false
        },
        row: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-colindex', 'aria-expanded', 'aria-level', 'aria-selected', 'aria-rowindex', 'aria-errormessage' ]
          },
          owned: {
            one: [ 'cell', 'columnheader', 'rowheader', 'gridcell' ]
          },
          nameFrom: [ 'author', 'contents' ],
          context: [ 'rowgroup', 'grid', 'treegrid', 'table' ],
          implicit: [ 'tr' ],
          unsupported: false
        },
        rowgroup: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded', 'aria-errormessage' ]
          },
          owned: {
            all: [ 'row' ]
          },
          nameFrom: [ 'author', 'contents' ],
          context: [ 'grid', 'table' ],
          implicit: [ 'tbody', 'thead', 'tfoot' ],
          unsupported: false
        },
        rowheader: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-colindex', 'aria-colspan', 'aria-expanded', 'aria-rowindex', 'aria-rowspan', 'aria-required', 'aria-readonly', 'aria-selected', 'aria-sort', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'row' ],
          implicit: [ 'th' ],
          unsupported: false
        },
        scrollbar: {
          type: 'widget',
          attributes: {
            required: [ 'aria-controls', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin' ],
            allowed: [ 'aria-valuetext', 'aria-orientation', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false
        },
        search: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'ASIDE', 'FORM', 'SECTION' ]
        },
        searchbox: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-readonly', 'aria-required', 'aria-placeholder', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'input[type="search"]' ],
          unsupported: false,
          allowedElements: [ {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'TEXT'
            }
          } ]
        },
        section: {
          nameFrom: [ 'author', 'contents' ],
          type: 'abstract',
          unsupported: false
        },
        sectionhead: {
          nameFrom: [ 'author', 'contents' ],
          type: 'abstract',
          unsupported: false
        },
        select: {
          nameFrom: [ 'author' ],
          type: 'abstract',
          unsupported: false
        },
        separator: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-orientation', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin', 'aria-valuetext', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'hr' ],
          unsupported: false,
          allowedElements: [ 'LI' ]
        },
        slider: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-valuetext', 'aria-orientation', 'aria-readonly', 'aria-errormessage' ],
            required: [ 'aria-valuenow', 'aria-valuemax', 'aria-valuemin' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'input[type="range"]' ],
          unsupported: false
        },
        spinbutton: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-valuetext', 'aria-required', 'aria-readonly', 'aria-errormessage' ],
            required: [ 'aria-valuenow', 'aria-valuemax', 'aria-valuemin' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'input[type="number"]' ],
          unsupported: false,
          allowedElements: [ {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'TEXT'
            }
          } ]
        },
        status: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'output' ],
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        structure: {
          type: 'abstract',
          unsupported: false
        },
        switch: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-errormessage' ],
            required: [ 'aria-checked' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'BUTTON', {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'CHECKBOX'
            }
          }, {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'IMAGE'
            }
          }, {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'BUTTON'
            }
          }, {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        tab: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-selected', 'aria-expanded', 'aria-setsize', 'aria-posinset', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'tablist' ],
          unsupported: false,
          allowedElements: [ 'BUTTON', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', {
            tagName: 'INPUT',
            attributes: {
              TYPE: 'BUTTON'
            }
          }, {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        table: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-colcount', 'aria-rowcount', 'aria-errormessage' ]
          },
          owned: {
            one: [ 'rowgroup', 'row' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'table' ],
          unsupported: false
        },
        tablist: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded', 'aria-level', 'aria-multiselectable', 'aria-orientation', 'aria-errormessage' ]
          },
          owned: {
            all: [ 'tab' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'OL', 'UL' ]
        },
        tabpanel: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'SECTION' ]
        },
        term: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'dt' ],
          unsupported: false
        },
        textbox: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-readonly', 'aria-required', 'aria-placeholder', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'input[type="text"]', 'input[type="email"]', 'input[type="password"]', 'input[type="tel"]', 'input[type="url"]', 'input:not([type])', 'textarea' ],
          unsupported: false
        },
        timer: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false
        },
        toolbar: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded', 'aria-orientation', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'menu[type="toolbar"]' ],
          unsupported: false,
          allowedElements: [ 'OL', 'UL' ]
        },
        tooltip: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          unsupported: false
        },
        tree: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-multiselectable', 'aria-required', 'aria-expanded', 'aria-orientation', 'aria-errormessage' ]
          },
          owned: {
            all: [ 'treeitem' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false,
          allowedElements: [ 'OL', 'UL' ]
        },
        treegrid: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-colcount', 'aria-expanded', 'aria-level', 'aria-multiselectable', 'aria-readonly', 'aria-required', 'aria-rowcount', 'aria-orientation', 'aria-errormessage' ]
          },
          owned: {
            one: [ 'rowgroup', 'row' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          unsupported: false
        },
        treeitem: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-checked', 'aria-selected', 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize', 'aria-errormessage' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'group', 'tree' ],
          unsupported: false,
          allowedElements: [ 'LI', {
            tagName: 'A',
            condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
          } ]
        },
        widget: {
          type: 'abstract',
          unsupported: false
        },
        window: {
          nameFrom: [ 'author' ],
          type: 'abstract',
          unsupported: false
        }
      };
      lookupTable.elementsAllowedNoRole = [ {
        tagName: 'AREA',
        condition: elementConditions.MUST_HAVE_HREF_ATTRIBUTE
      }, 'BASE', 'BODY', 'CAPTION', 'COL', 'COLGROUP', 'DATALIST', 'DD', 'DETAILS', 'DT', 'HEAD', 'HTML', {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'COLOR'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'DATE'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'DATETIME'
        }
      }, {
        tagName: 'INPUT',
        condition: elementConditions.CANNOT_HAVE_LIST_ATTRIBUTE,
        attributes: {
          TYPE: 'EMAIL'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'FILE'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'HIDDEN'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'MONTH'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'NUMBER'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'PASSWORD'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'RANGE'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'RESET'
        }
      }, {
        tagName: 'INPUT',
        condition: elementConditions.CANNOT_HAVE_LIST_ATTRIBUTE,
        attributes: {
          TYPE: 'SEARCH'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'SUBMIT'
        }
      }, {
        tagName: 'INPUT',
        condition: elementConditions.CANNOT_HAVE_LIST_ATTRIBUTE,
        attributes: {
          TYPE: 'TEL'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'TIME'
        }
      }, {
        tagName: 'INPUT',
        condition: elementConditions.CANNOT_HAVE_LIST_ATTRIBUTE,
        attributes: {
          TYPE: 'URL'
        }
      }, {
        tagName: 'INPUT',
        attributes: {
          TYPE: 'WEEK'
        }
      }, 'KEYGEN', 'LABEL', 'LEGEND', {
        tagName: 'LINK',
        attributes: {
          TYPE: 'HREF'
        }
      }, 'MAIN', 'MAP', 'MATH', {
        tagName: 'MENU',
        attributes: {
          TYPE: 'CONTEXT'
        }
      }, {
        tagName: 'MENUITEM',
        attributes: {
          TYPE: 'COMMAND'
        }
      }, {
        tagName: 'MENUITEM',
        attributes: {
          TYPE: 'CHECKBOX'
        }
      }, {
        tagName: 'MENUITEM',
        attributes: {
          TYPE: 'RADIO'
        }
      }, 'META', 'METER', 'NOSCRIPT', 'OPTGROUP', 'PARAM', 'PICTURE', 'PROGRESS', 'SCRIPT', {
        tagName: 'SELECT',
        condition: elementConditions.MUST_HAVE_SIZE_ATTRIBUTE_WITH_VALUE_GREATER_THAN_1,
        attributes: {
          TYPE: 'MULTIPLE'
        }
      }, 'SOURCE', 'STYLE', 'TEMPLATE', 'TEXTAREA', 'TITLE', 'TRACK', 'CLIPPATH', 'CURSOR', 'DEFS', 'DESC', 'FEBLEND', 'FECOLORMATRIX', 'FECOMPONENTTRANSFER', 'FECOMPOSITE', 'FECONVOLVEMATRIX', 'FEDIFFUSELIGHTING', 'FEDISPLACEMENTMAP', 'FEDISTANTLIGHT', 'FEDROPSHADOW', 'FEFLOOD', 'FEFUNCA', 'FEFUNCB', 'FEFUNCG', 'FEFUNCR', 'FEGAUSSIANBLUR', 'FEIMAGE', 'FEMERGE', 'FEMERGENODE', 'FEMORPHOLOGY', 'FEOFFSET', 'FEPOINTLIGHT', 'FESPECULARLIGHTING', 'FESPOTLIGHT', 'FETILE', 'FETURBULENCE', 'FILTER', 'HATCH', 'HATCHPATH', 'LINEARGRADIENT', 'MARKER', 'MASK', 'MESHGRADIENT', 'MESHPATCH', 'MESHROW', 'METADATA', 'MPATH', 'PATTERN', 'RADIALGRADIENT', 'SOLIDCOLOR', 'STOP', 'SWITCH', 'VIEW' ];
      lookupTable.elementsAllowedAnyRole = [ {
        tagName: 'A',
        condition: elementConditions.CANNOT_HAVE_HREF_ATTRIBUTE
      }, 'ABBR', 'ADDRESS', 'CANVAS', 'DIV', 'P', 'PRE', 'BLOCKQUOTE', 'INS', 'DEL', 'OUTPUT', 'SPAN', 'TABLE', 'TBODY', 'THEAD', 'TFOOT', 'TD', 'EM', 'STRONG', 'SMALL', 'S', 'CITE', 'Q', 'DFN', 'ABBR', 'TIME', 'CODE', 'VAR', 'SAMP', 'KBD', 'SUB', 'SUP', 'I', 'B', 'U', 'MARK', 'RUBY', 'RT', 'RP', 'BDI', 'BDO', 'BR', 'WBR', 'TH', 'TR' ];
      lookupTable.evaluateRoleForElement = {
        A: function A(_ref11) {
          var node = _ref11.node, out = _ref11.out;
          if (node.namespaceURI === 'http://www.w3.org/2000/svg') {
            return true;
          }
          if (node.href.length) {
            return out;
          }
          return true;
        },
        AREA: function AREA(_ref12) {
          var node = _ref12.node;
          return !node.href;
        },
        BUTTON: function BUTTON(_ref13) {
          var node = _ref13.node, role = _ref13.role, out = _ref13.out;
          if (node.getAttribute('type') === 'menu') {
            return role === 'menuitem';
          }
          return out;
        },
        IMG: function IMG(_ref14) {
          var node = _ref14.node, out = _ref14.out;
          if (node.alt) {
            return !out;
          }
          return out;
        },
        INPUT: function INPUT(_ref15) {
          var node = _ref15.node, role = _ref15.role, out = _ref15.out;
          switch (node.type) {
           case 'button':
           case 'image':
            return out;

           case 'checkbox':
            if (role === 'button' && node.hasAttribute('aria-pressed')) {
              return true;
            }
            return out;

           case 'radio':
            return role === 'menuitemradio';

           case 'text':
            return role === 'combobox' || role === 'searchbox' || role === 'spinbutton';

           default:
            return false;
          }
        },
        LI: function LI(_ref16) {
          var node = _ref16.node, out = _ref16.out;
          var hasImplicitListitemRole = axe.utils.matchesSelector(node, 'ol li, ul li');
          if (hasImplicitListitemRole) {
            return out;
          }
          return true;
        },
        LINK: function LINK(_ref17) {
          var node = _ref17.node;
          return !node.href;
        },
        MENU: function MENU(_ref18) {
          var node = _ref18.node;
          if (node.getAttribute('type') === 'context') {
            return false;
          }
          return true;
        },
        OPTION: function OPTION(_ref19) {
          var node = _ref19.node;
          var withinOptionList = axe.utils.matchesSelector(node, 'select > option, datalist > option, optgroup > option');
          return !withinOptionList;
        },
        SELECT: function SELECT(_ref20) {
          var node = _ref20.node, role = _ref20.role;
          return !node.multiple && node.size <= 1 && role === 'menu';
        },
        SVG: function SVG(_ref21) {
          var node = _ref21.node, out = _ref21.out;
          if (node.parentNode && node.parentNode.namespaceURI === 'http://www.w3.org/2000/svg') {
            return true;
          }
          return out;
        }
      };
      var color = {};
      commons.color = color;
      var dom = commons.dom = {};
      var table = commons.table = {};
      var text = commons.text = {
        EdgeFormDefaults: {}
      };
      var utils = commons.utils = axe.utils;
      aria.requiredAttr = function(role) {
        'use strict';
        var roles = aria.lookupTable.role[role], attr = roles && roles.attributes && roles.attributes.required;
        return attr || [];
      };
      aria.allowedAttr = function(role) {
        'use strict';
        var roles = aria.lookupTable.role[role], attr = roles && roles.attributes && roles.attributes.allowed || [], requiredAttr = roles && roles.attributes && roles.attributes.required || [];
        return attr.concat(aria.lookupTable.globalAttributes).concat(requiredAttr);
      };
      aria.validateAttr = function(att) {
        'use strict';
        return !!aria.lookupTable.attributes[att];
      };
      aria.validateAttrValue = function validateAttrValue(node, attr) {
        'use strict';
        var matches, list, value = node.getAttribute(attr), attrInfo = aria.lookupTable.attributes[attr];
        var doc = dom.getRootNode(node);
        if (!attrInfo) {
          return true;
        }
        switch (attrInfo.type) {
         case 'boolean':
         case 'nmtoken':
          return typeof value === 'string' && attrInfo.values.includes(value.toLowerCase());

         case 'nmtokens':
          list = axe.utils.tokenList(value);
          return list.reduce(function(result, token) {
            return result && attrInfo.values.includes(token);
          }, list.length !== 0);

         case 'idref':
          if (value.trim().length === 0) {
            return true;
          }
          return !!(value && doc.getElementById(value));

         case 'idrefs':
          if (value.trim().length === 0) {
            return true;
          }
          list = axe.utils.tokenList(value);
          return list.some(function(token) {
            return doc.getElementById(token);
          });

         case 'string':
          return true;

         case 'decimal':
          matches = value.match(/^[-+]?([0-9]*)\.?([0-9]*)$/);
          return !!(matches && (matches[1] || matches[2]));

         case 'int':
          return /^[-+]?[0-9]+$/.test(value);
        }
      };
      function getRoleSegments(node) {
        var roles = [];
        if (!node) {
          return roles;
        }
        if (node.hasAttribute('role')) {
          var nodeRoles = axe.utils.tokenList(node.getAttribute('role').toLowerCase());
          roles = roles.concat(nodeRoles);
        }
        if (node.hasAttributeNS('http://www.idpf.org/2007/ops', 'type')) {
          var epubRoles = axe.utils.tokenList(node.getAttributeNS('http://www.idpf.org/2007/ops', 'type').toLowerCase()).map(function(role) {
            return 'doc-' + role;
          });
          roles = roles.concat(epubRoles);
        }
        roles = roles.filter(function(role) {
          return axe.commons.aria.isValidRole(role);
        });
        return roles;
      }
      aria.getElementUnallowedRoles = function getElementUnallowedRoles(node) {
        var allowImplicit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var tagName = node.nodeName.toUpperCase();
        if (!axe.utils.isHtmlElement(node)) {
          return [];
        }
        var roleSegments = getRoleSegments(node);
        var implicitRole = axe.commons.aria.implicitRole(node);
        var unallowedRoles = roleSegments.filter(function(role) {
          if (allowImplicit && role === implicitRole) {
            return false;
          }
          if (!allowImplicit && !(role === 'row' && tagName === 'TR' && axe.utils.matchesSelector(node, 'table[role="grid"] > tr'))) {
            return true;
          }
          if (!aria.isAriaRoleAllowedOnElement(node, role)) {
            return true;
          }
        });
        return unallowedRoles;
      };
      aria.getRole = function getRole(node) {
        var _ref22 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, noImplicit = _ref22.noImplicit, fallback = _ref22.fallback, abstracts = _ref22.abstracts, dpub = _ref22.dpub;
        var roleAttr = (node.getAttribute('role') || '').trim().toLowerCase();
        var roleList = fallback ? axe.utils.tokenList(roleAttr) : [ roleAttr ];
        var validRoles = roleList.filter(function(role) {
          if (!dpub && role.substr(0, 4) === 'doc-') {
            return false;
          }
          return aria.isValidRole(role, {
            allowAbstract: abstracts
          });
        });
        var explicitRole = validRoles[0];
        if (!explicitRole && !noImplicit) {
          return aria.implicitRole(node);
        }
        return explicitRole || null;
      };
      function findDomNode(node, functor) {
        if (functor(node)) {
          return node;
        }
        for (var i = 0; i < node.children.length; i++) {
          var out = findDomNode(node.children[i], functor);
          if (out) {
            return out;
          }
        }
      }
      aria.isAccessibleRef = function isAccessibleRef(node) {
        node = node.actualNode || node;
        var root = dom.getRootNode(node);
        root = root.documentElement || root;
        var id = node.id;
        var refAttrs = Object.keys(aria.lookupTable.attributes).filter(function(attr) {
          var type = aria.lookupTable.attributes[attr].type;
          return /^idrefs?$/.test(type);
        });
        var refElm = findDomNode(root, function(elm) {
          if (elm.nodeType !== 1) {
            return;
          }
          if (elm.nodeName.toUpperCase() === 'LABEL' && elm.getAttribute('for') === id) {
            return true;
          }
          return refAttrs.filter(function(attr) {
            return elm.hasAttribute(attr);
          }).some(function(attr) {
            var attrValue = elm.getAttribute(attr);
            if (aria.lookupTable.attributes[attr].type === 'idref') {
              return attrValue === id;
            }
            return axe.utils.tokenList(attrValue).includes(id);
          });
        });
        return typeof refElm !== 'undefined';
      };
      aria.isAriaRoleAllowedOnElement = function isAriaRoleAllowedOnElement(node, role) {
        var tagName = node.nodeName.toUpperCase();
        var lookupTable = axe.commons.aria.lookupTable;
        if (aria.validateNodeAndAttributes(node, lookupTable.elementsAllowedNoRole)) {
          return false;
        }
        if (aria.validateNodeAndAttributes(node, lookupTable.elementsAllowedAnyRole)) {
          return true;
        }
        var roleValue = lookupTable.role[role];
        if (!roleValue) {
          return false;
        }
        if (!(roleValue.allowedElements && Array.isArray(roleValue.allowedElements) && roleValue.allowedElements.length)) {
          return false;
        }
        var out = false;
        out = aria.validateNodeAndAttributes(node, roleValue.allowedElements);
        if (Object.keys(lookupTable.evaluateRoleForElement).includes(tagName)) {
          out = lookupTable.evaluateRoleForElement[tagName]({
            node: node,
            role: role,
            out: out
          });
        }
        return out;
      };
      aria.labelVirtual = function(_ref23) {
        var actualNode = _ref23.actualNode;
        var ref = void 0, candidate = void 0;
        if (actualNode.getAttribute('aria-labelledby')) {
          ref = dom.idrefs(actualNode, 'aria-labelledby');
          candidate = ref.map(function(thing) {
            var vNode = axe.utils.getNodeFromTree(axe._tree[0], thing);
            return vNode ? text.visibleVirtual(vNode, true) : '';
          }).join(' ').trim();
          if (candidate) {
            return candidate;
          }
        }
        candidate = actualNode.getAttribute('aria-label');
        if (candidate) {
          candidate = text.sanitize(candidate).trim();
          if (candidate) {
            return candidate;
          }
        }
        return null;
      };
      aria.label = function(node) {
        node = axe.utils.getNodeFromTree(axe._tree[0], node);
        return aria.labelVirtual(node);
      };
      aria.isValidRole = function(role) {
        var _ref24 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, allowAbstract = _ref24.allowAbstract, _ref24$flagUnsupporte = _ref24.flagUnsupported, flagUnsupported = _ref24$flagUnsupporte === undefined ? false : _ref24$flagUnsupporte;
        var roleDefinition = aria.lookupTable.role[role];
        var isRoleUnsupported = roleDefinition ? roleDefinition.unsupported : false;
        if (!roleDefinition || flagUnsupported && isRoleUnsupported) {
          return false;
        }
        return allowAbstract ? true : roleDefinition.type !== 'abstract';
      };
      aria.getRolesWithNameFromContents = function() {
        return Object.keys(aria.lookupTable.role).filter(function(r) {
          return aria.lookupTable.role[r].nameFrom && aria.lookupTable.role[r].nameFrom.indexOf('contents') !== -1;
        });
      };
      aria.getRolesByType = function(roleType) {
        return Object.keys(aria.lookupTable.role).filter(function(r) {
          return aria.lookupTable.role[r].type === roleType;
        });
      };
      aria.getRoleType = function(role) {
        var r = aria.lookupTable.role[role];
        return r && r.type || null;
      };
      aria.requiredOwned = function(role) {
        'use strict';
        var owned = null, roles = aria.lookupTable.role[role];
        if (roles) {
          owned = axe.utils.clone(roles.owned);
        }
        return owned;
      };
      aria.requiredContext = function(role) {
        'use strict';
        var context = null, roles = aria.lookupTable.role[role];
        if (roles) {
          context = axe.utils.clone(roles.context);
        }
        return context;
      };
      aria.implicitNodes = function(role) {
        'use strict';
        var implicit = null, roles = aria.lookupTable.role[role];
        if (roles && roles.implicit) {
          implicit = axe.utils.clone(roles.implicit);
        }
        return implicit;
      };
      aria.implicitRole = function(node) {
        'use strict';
        var isValidImplicitRole = function isValidImplicitRole(set, role) {
          var validForNodeType = function validForNodeType(implicitNodeTypeSelector) {
            return axe.utils.matchesSelector(node, implicitNodeTypeSelector);
          };
          if (role.implicit && role.implicit.some(validForNodeType)) {
            set.push(role.name);
          }
          return set;
        };
        var sortRolesByOptimalAriaContext = function sortRolesByOptimalAriaContext(roles, ariaAttributes) {
          var getScore = function getScore(role) {
            var allowedAriaAttributes = aria.allowedAttr(role);
            return allowedAriaAttributes.reduce(function(score, attribute) {
              return score + (ariaAttributes.indexOf(attribute) > -1 ? 1 : 0);
            }, 0);
          };
          var scored = roles.map(function(role) {
            return {
              score: getScore(role),
              name: role
            };
          });
          var sorted = scored.sort(function(scoredRoleA, scoredRoleB) {
            return scoredRoleB.score - scoredRoleA.score;
          });
          return sorted.map(function(sortedRole) {
            return sortedRole.name;
          });
        };
        var roles = Object.keys(aria.lookupTable.role).map(function(role) {
          var lookup = aria.lookupTable.role[role];
          return {
            name: role,
            implicit: lookup && lookup.implicit
          };
        });
        var availableImplicitRoles = roles.reduce(isValidImplicitRole, []);
        if (!availableImplicitRoles.length) {
          return null;
        }
        var nodeAttributes = node.attributes;
        var ariaAttributes = [];
        for (var i = 0, j = nodeAttributes.length; i < j; i++) {
          var attr = nodeAttributes[i];
          if (attr.name.match(/^aria-/)) {
            ariaAttributes.push(attr.name);
          }
        }
        return sortRolesByOptimalAriaContext(availableImplicitRoles, ariaAttributes).shift();
      };
      aria.validateNodeAndAttributes = function validateNodeAndAttributes(node, constraintsArray) {
        var tagName = node.nodeName.toUpperCase();
        var stringConstraints = constraintsArray.filter(function(c) {
          return typeof c === 'string';
        });
        if (stringConstraints.includes(tagName)) {
          return true;
        }
        var objectConstraints = constraintsArray.filter(function(c) {
          return (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object';
        }).filter(function(c) {
          return c.tagName === tagName;
        });
        var nodeAttrs = Array.from(node.attributes).map(function(a) {
          return a.name.toUpperCase();
        });
        var validConstraints = objectConstraints.filter(function(c) {
          if (!c.attributes) {
            if (c.condition) {
              return true;
            }
            return false;
          }
          var keys = Object.keys(c.attributes);
          if (!keys.length) {
            return false;
          }
          var keepConstraint = false;
          keys.forEach(function(k) {
            if (!nodeAttrs.includes(k)) {
              return;
            }
            var attrValue = node.getAttribute(k).trim().toUpperCase();
            if (attrValue === c.attributes[k]) {
              keepConstraint = true;
            }
          });
          return keepConstraint;
        });
        if (!validConstraints.length) {
          return false;
        }
        var out = true;
        validConstraints.forEach(function(c) {
          if (c.condition && typeof c.condition === 'function') {
            out = c.condition(node);
          }
        });
        return out;
      };
      color.Color = function(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
        this.toHexString = function() {
          var redString = Math.round(this.red).toString(16);
          var greenString = Math.round(this.green).toString(16);
          var blueString = Math.round(this.blue).toString(16);
          return '#' + (this.red > 15.5 ? redString : '0' + redString) + (this.green > 15.5 ? greenString : '0' + greenString) + (this.blue > 15.5 ? blueString : '0' + blueString);
        };
        var rgbRegex = /^rgb\((\d+), (\d+), (\d+)\)$/;
        var rgbaRegex = /^rgba\((\d+), (\d+), (\d+), (\d*(\.\d+)?)\)/;
        this.parseRgbString = function(colorString) {
          if (colorString === 'transparent') {
            this.red = 0;
            this.green = 0;
            this.blue = 0;
            this.alpha = 0;
            return;
          }
          var match = colorString.match(rgbRegex);
          if (match) {
            this.red = parseInt(match[1], 10);
            this.green = parseInt(match[2], 10);
            this.blue = parseInt(match[3], 10);
            this.alpha = 1;
            return;
          }
          match = colorString.match(rgbaRegex);
          if (match) {
            this.red = parseInt(match[1], 10);
            this.green = parseInt(match[2], 10);
            this.blue = parseInt(match[3], 10);
            this.alpha = parseFloat(match[4]);
            return;
          }
        };
        this.getRelativeLuminance = function() {
          var rSRGB = this.red / 255;
          var gSRGB = this.green / 255;
          var bSRGB = this.blue / 255;
          var r = rSRGB <= .03928 ? rSRGB / 12.92 : Math.pow((rSRGB + .055) / 1.055, 2.4);
          var g = gSRGB <= .03928 ? gSRGB / 12.92 : Math.pow((gSRGB + .055) / 1.055, 2.4);
          var b = bSRGB <= .03928 ? bSRGB / 12.92 : Math.pow((bSRGB + .055) / 1.055, 2.4);
          return .2126 * r + .7152 * g + .0722 * b;
        };
      };
      color.flattenColors = function(fgColor, bgColor) {
        var alpha = fgColor.alpha;
        var r = (1 - alpha) * bgColor.red + alpha * fgColor.red;
        var g = (1 - alpha) * bgColor.green + alpha * fgColor.green;
        var b = (1 - alpha) * bgColor.blue + alpha * fgColor.blue;
        var a = fgColor.alpha + bgColor.alpha * (1 - fgColor.alpha);
        return new color.Color(r, g, b, a);
      };
      color.getContrast = function(bgColor, fgColor) {
        if (!fgColor || !bgColor) {
          return null;
        }
        if (fgColor.alpha < 1) {
          fgColor = color.flattenColors(fgColor, bgColor);
        }
        var bL = bgColor.getRelativeLuminance();
        var fL = fgColor.getRelativeLuminance();
        return (Math.max(fL, bL) + .05) / (Math.min(fL, bL) + .05);
      };
      color.hasValidContrastRatio = function(bg, fg, fontSize, isBold) {
        var contrast = color.getContrast(bg, fg);
        var isSmallFont = isBold && Math.ceil(fontSize * 72) / 96 < 14 || !isBold && Math.ceil(fontSize * 72) / 96 < 18;
        var expectedContrastRatio = isSmallFont ? 4.5 : 3;
        return {
          isValid: contrast > expectedContrastRatio,
          contrastRatio: contrast,
          expectedContrastRatio: expectedContrastRatio
        };
      };
      function _getFonts(style) {
        return style.getPropertyValue('font-family').split(/[,;]/g).map(function(font) {
          return font.trim().toLowerCase();
        });
      }
      function elementIsDistinct(node, ancestorNode) {
        var nodeStyle = window.getComputedStyle(node);
        if (nodeStyle.getPropertyValue('background-image') !== 'none') {
          return true;
        }
        var hasBorder = [ 'border-bottom', 'border-top', 'outline' ].reduce(function(result, edge) {
          var borderClr = new color.Color();
          borderClr.parseRgbString(nodeStyle.getPropertyValue(edge + '-color'));
          return result || nodeStyle.getPropertyValue(edge + '-style') !== 'none' && parseFloat(nodeStyle.getPropertyValue(edge + '-width')) > 0 && borderClr.alpha !== 0;
        }, false);
        if (hasBorder) {
          return true;
        }
        var parentStyle = window.getComputedStyle(ancestorNode);
        if (_getFonts(nodeStyle)[0] !== _getFonts(parentStyle)[0]) {
          return true;
        }
        var hasStyle = [ 'text-decoration-line', 'text-decoration-style', 'font-weight', 'font-style', 'font-size' ].reduce(function(result, cssProp) {
          return result || nodeStyle.getPropertyValue(cssProp) !== parentStyle.getPropertyValue(cssProp);
        }, false);
        var tDec = nodeStyle.getPropertyValue('text-decoration');
        if (tDec.split(' ').length < 3) {
          hasStyle = hasStyle || tDec !== parentStyle.getPropertyValue('text-decoration');
        }
        return hasStyle;
      }
      color.elementIsDistinct = elementIsDistinct;
      var graphicNodes = [ 'IMG', 'CANVAS', 'OBJECT', 'IFRAME', 'VIDEO', 'SVG' ];
      function elmHasImage(elm, style) {
        var nodeName = elm.nodeName.toUpperCase();
        if (graphicNodes.includes(nodeName)) {
          axe.commons.color.incompleteData.set('bgColor', 'imgNode');
          return true;
        }
        style = style || window.getComputedStyle(elm);
        var bgImageStyle = style.getPropertyValue('background-image');
        var hasBgImage = bgImageStyle !== 'none';
        if (hasBgImage) {
          var hasGradient = /gradient/.test(bgImageStyle);
          axe.commons.color.incompleteData.set('bgColor', hasGradient ? 'bgGradient' : 'bgImage');
        }
        return hasBgImage;
      }
      function getBgColor(elm, elmStyle) {
        elmStyle = elmStyle || window.getComputedStyle(elm);
        var bgColor = new color.Color();
        bgColor.parseRgbString(elmStyle.getPropertyValue('background-color'));
        if (bgColor.alpha !== 0) {
          var opacity = elmStyle.getPropertyValue('opacity');
          bgColor.alpha = bgColor.alpha * opacity;
        }
        return bgColor;
      }
      function contentOverlapping(targetElement, bgNode) {
        var targetRect = targetElement.getClientRects()[0];
        var obscuringElements = dom.shadowElementsFromPoint(targetRect.left, targetRect.top);
        if (obscuringElements) {
          for (var i = 0; i < obscuringElements.length; i++) {
            if (obscuringElements[i] !== targetElement && obscuringElements[i] === bgNode) {
              return true;
            }
          }
        }
        return false;
      }
      function calculateObscuringAlpha(elmIndex, elmStack, originalElm) {
        var totalAlpha = 0;
        if (elmIndex > 0) {
          for (var i = elmIndex - 1; i >= 0; i--) {
            var bgElm = elmStack[i];
            var bgElmStyle = window.getComputedStyle(bgElm);
            var bgColor = getBgColor(bgElm, bgElmStyle);
            if (bgColor.alpha && contentOverlapping(originalElm, bgElm)) {
              totalAlpha += bgColor.alpha;
            } else {
              elmStack.splice(i, 1);
            }
          }
        }
        return totalAlpha;
      }
      function elmPartiallyObscured(elm, bgElm, bgColor) {
        var obscured = elm !== bgElm && !dom.visuallyContains(elm, bgElm) && bgColor.alpha !== 0;
        if (obscured) {
          axe.commons.color.incompleteData.set('bgColor', 'elmPartiallyObscured');
        }
        return obscured;
      }
      function includeMissingElements(elmStack, elm) {
        var elementMap = {
          TD: [ 'TR', 'TBODY' ],
          TH: [ 'TR', 'THEAD' ],
          INPUT: [ 'LABEL' ]
        };
        var tagArray = elmStack.map(function(elm) {
          return elm.tagName;
        });
        var bgNodes = elmStack;
        for (var candidate in elementMap) {
          if (tagArray.includes(candidate)) {
            for (var candidateIndex in elementMap[candidate]) {
              if (candidate.hasOwnProperty(candidateIndex)) {
                var ancestorMatch = axe.commons.dom.findUp(elm, elementMap[candidate][candidateIndex]);
                if (ancestorMatch && elmStack.indexOf(ancestorMatch) === -1) {
                  var overlaps = axe.commons.dom.visuallyOverlaps(elm.getBoundingClientRect(), ancestorMatch);
                  if (overlaps) {
                    bgNodes.splice(tagArray.indexOf(candidate) + 1, 0, ancestorMatch);
                  }
                }
                if (elm.tagName === elementMap[candidate][candidateIndex] && tagArray.indexOf(elm.tagName) === -1) {
                  bgNodes.splice(tagArray.indexOf(candidate) + 1, 0, elm);
                }
              }
            }
          }
        }
        return bgNodes;
      }
      function sortPageBackground(elmStack) {
        var bodyIndex = elmStack.indexOf(document.body);
        var bgNodes = elmStack;
        if (bodyIndex > 1 && !elmHasImage(document.documentElement) && getBgColor(document.documentElement).alpha === 0) {
          bgNodes.splice(bodyIndex, 1);
          bgNodes.splice(elmStack.indexOf(document.documentElement), 1);
          bgNodes.push(document.body);
        }
        return bgNodes;
      }
      color.getCoords = function(rect) {
        var x = void 0, y = void 0;
        if (rect.left > window.innerWidth) {
          return;
        }
        if (rect.top > window.innerHeight) {
          return;
        }
        x = Math.min(Math.ceil(rect.left + rect.width / 2), window.innerWidth - 1);
        y = Math.min(Math.ceil(rect.top + rect.height / 2), window.innerHeight - 1);
        return {
          x: x,
          y: y
        };
      };
      color.getRectStack = function(elm) {
        var boundingCoords = color.getCoords(elm.getBoundingClientRect());
        if (boundingCoords) {
          var boundingStack = dom.shadowElementsFromPoint(boundingCoords.x, boundingCoords.y);
          var rects = Array.from(elm.getClientRects());
          if (rects && rects.length > 1) {
            var filteredArr = rects.filter(function(rect) {
              return rect.width && rect.width > 0;
            }).map(function(rect) {
              var coords = color.getCoords(rect);
              if (coords) {
                return dom.shadowElementsFromPoint(coords.x, coords.y);
              }
            });
            filteredArr.splice(0, 0, boundingStack);
            return filteredArr;
          } else {
            return [ boundingStack ];
          }
        }
        return null;
      };
      color.filteredRectStack = function(elm) {
        var rectStack = color.getRectStack(elm);
        if (rectStack && rectStack.length === 1) {
          return rectStack[0];
        } else if (rectStack && rectStack.length > 1) {
          var boundingStack = rectStack.shift();
          var isSame = void 0;
          rectStack.forEach(function(rectList, index) {
            if (index === 0) {
              return;
            }
            var rectA = rectStack[index - 1], rectB = rectStack[index];
            isSame = rectA.every(function(element, elementIndex) {
              return element === rectB[elementIndex];
            }) || boundingStack.includes(elm);
          });
          if (!isSame) {
            axe.commons.color.incompleteData.set('bgColor', 'elmPartiallyObscuring');
            return null;
          }
          return rectStack[0];
        } else {
          axe.commons.color.incompleteData.set('bgColor', 'outsideViewport');
          return null;
        }
      };
      color.getBackgroundStack = function(elm) {
        var elmStack = color.filteredRectStack(elm);
        if (elmStack === null) {
          return null;
        }
        elmStack = includeMissingElements(elmStack, elm);
        elmStack = dom.reduceToElementsBelowFloating(elmStack, elm);
        elmStack = sortPageBackground(elmStack);
        var elmIndex = elmStack.indexOf(elm);
        if (calculateObscuringAlpha(elmIndex, elmStack, elm) >= .99) {
          axe.commons.color.incompleteData.set('bgColor', 'bgOverlap');
          return null;
        }
        return elmIndex !== -1 ? elmStack : null;
      };
      color.getBackgroundColor = function(elm) {
        var bgElms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var noScroll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (noScroll !== true) {
          var alignToTop = elm.clientHeight - 2 >= window.innerHeight * 2;
          elm.scrollIntoView(alignToTop);
        }
        var bgColors = [];
        var elmStack = color.getBackgroundStack(elm);
        (elmStack || []).some(function(bgElm) {
          var bgElmStyle = window.getComputedStyle(bgElm);
          var bgColor = getBgColor(bgElm, bgElmStyle);
          if (elmPartiallyObscured(elm, bgElm, bgColor) || elmHasImage(bgElm, bgElmStyle)) {
            bgColors = null;
            bgElms.push(bgElm);
            return true;
          }
          if (bgColor.alpha !== 0) {
            bgElms.push(bgElm);
            bgColors.push(bgColor);
            return bgColor.alpha === 1;
          } else {
            return false;
          }
        });
        if (bgColors !== null && elmStack !== null) {
          bgColors.push(new color.Color(255, 255, 255, 1));
          var colors = bgColors.reduce(color.flattenColors);
          return colors;
        }
        return null;
      };
      dom.isOpaque = function(node) {
        var style = window.getComputedStyle(node);
        return elmHasImage(node, style) || getBgColor(node, style).alpha === 1;
      };
      color.getForegroundColor = function(node, noScroll) {
        var nodeStyle = window.getComputedStyle(node);
        var fgColor = new color.Color();
        fgColor.parseRgbString(nodeStyle.getPropertyValue('color'));
        var opacity = nodeStyle.getPropertyValue('opacity');
        fgColor.alpha = fgColor.alpha * opacity;
        if (fgColor.alpha === 1) {
          return fgColor;
        }
        var bgColor = color.getBackgroundColor(node, [], noScroll);
        if (bgColor === null) {
          var reason = axe.commons.color.incompleteData.get('bgColor');
          axe.commons.color.incompleteData.set('fgColor', reason);
          return null;
        }
        return color.flattenColors(fgColor, bgColor);
      };
      color.incompleteData = function() {
        var data = {};
        return {
          set: function set(key, reason) {
            if (typeof key !== 'string') {
              throw new Error('Incomplete data: key must be a string');
            }
            if (reason) {
              data[key] = reason;
            }
            return data[key];
          },
          get: function get(key) {
            return data[key];
          },
          clear: function clear() {
            data = {};
          }
        };
      }();
      dom.reduceToElementsBelowFloating = function(elements, targetNode) {
        var floatingPositions = [ 'fixed', 'sticky' ], finalElements = [], targetFound = false, index, currentNode, style;
        for (index = 0; index < elements.length; ++index) {
          currentNode = elements[index];
          if (currentNode === targetNode) {
            targetFound = true;
          }
          style = window.getComputedStyle(currentNode);
          if (!targetFound && floatingPositions.indexOf(style.position) !== -1) {
            finalElements = [];
            continue;
          }
          finalElements.push(currentNode);
        }
        return finalElements;
      };
      dom.findElmsInContext = function(_ref25) {
        var context = _ref25.context, value = _ref25.value, attr = _ref25.attr, _ref25$elm = _ref25.elm, elm = _ref25$elm === undefined ? '' : _ref25$elm;
        var root = void 0;
        var escapedValue = axe.utils.escapeSelector(value);
        if (context.nodeType === 9 || context.nodeType === 11) {
          root = context;
        } else {
          root = dom.getRootNode(context);
        }
        return Array.from(root.querySelectorAll(elm + '[' + attr + '=' + escapedValue + ']'));
      };
      dom.findUp = function(element, target) {
        return dom.findUpVirtual(axe.utils.getNodeFromTree(axe._tree[0], element), target);
      };
      dom.findUpVirtual = function(element, target) {
        var parent = void 0;
        parent = element.actualNode;
        if (!element.shadowId && typeof element.actualNode.closest === 'function') {
          var match = element.actualNode.closest(target);
          if (match) {
            return match;
          }
          return null;
        }
        do {
          parent = parent.assignedSlot ? parent.assignedSlot : parent.parentNode;
          if (parent && parent.nodeType === 11) {
            parent = parent.host;
          }
        } while (parent && !axe.utils.matchesSelector(parent, target) && parent !== document.documentElement);
        if (!axe.utils.matchesSelector(parent, target)) {
          return null;
        }
        return parent;
      };
      dom.getComposedParent = function getComposedParent(element) {
        if (element.assignedSlot) {
          return getComposedParent(element.assignedSlot);
        } else if (element.parentNode) {
          var parentNode = element.parentNode;
          if (parentNode.nodeType === 1) {
            return parentNode;
          } else if (parentNode.host) {
            return parentNode.host;
          }
        }
        return null;
      };
      dom.getElementByReference = function(node, attr) {
        var fragment = node.getAttribute(attr);
        if (fragment && fragment.charAt(0) === '#') {
          fragment = decodeURIComponent(fragment.substring(1));
          var candidate = document.getElementById(fragment);
          if (candidate) {
            return candidate;
          }
          candidate = document.getElementsByName(fragment);
          if (candidate.length) {
            return candidate[0];
          }
        }
        return null;
      };
      dom.getElementCoordinates = function(element) {
        'use strict';
        var scrollOffset = dom.getScrollOffset(document), xOffset = scrollOffset.left, yOffset = scrollOffset.top, coords = element.getBoundingClientRect();
        return {
          top: coords.top + yOffset,
          right: coords.right + xOffset,
          bottom: coords.bottom + yOffset,
          left: coords.left + xOffset,
          width: coords.right - coords.left,
          height: coords.bottom - coords.top
        };
      };
      dom.getRootNode = axe.utils.getRootNode;
      dom.getScrollOffset = function(element) {
        'use strict';
        if (!element.nodeType && element.document) {
          element = element.document;
        }
        if (element.nodeType === 9) {
          var docElement = element.documentElement, body = element.body;
          return {
            left: docElement && docElement.scrollLeft || body && body.scrollLeft || 0,
            top: docElement && docElement.scrollTop || body && body.scrollTop || 0
          };
        }
        return {
          left: element.scrollLeft,
          top: element.scrollTop
        };
      };
      dom.getViewportSize = function(win) {
        'use strict';
        var body, doc = win.document, docElement = doc.documentElement;
        if (win.innerWidth) {
          return {
            width: win.innerWidth,
            height: win.innerHeight
          };
        }
        if (docElement) {
          return {
            width: docElement.clientWidth,
            height: docElement.clientHeight
          };
        }
        body = doc.body;
        return {
          width: body.clientWidth,
          height: body.clientHeight
        };
      };
      var hiddenTextElms = [ 'HEAD', 'TITLE', 'TEMPLATE', 'SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'VIDEO', 'AUDIO', 'NOSCRIPT' ];
      function hasChildTextNodes(elm) {
        if (!hiddenTextElms.includes(elm.actualNode.nodeName.toUpperCase())) {
          return elm.children.some(function(_ref26) {
            var actualNode = _ref26.actualNode;
            return actualNode.nodeType === 3 && actualNode.nodeValue.trim();
          });
        }
      }
      dom.hasContentVirtual = function(elm, noRecursion) {
        return hasChildTextNodes(elm) || dom.isVisualContent(elm.actualNode) || !!aria.labelVirtual(elm) || !noRecursion && elm.children.some(function(child) {
          return child.actualNode.nodeType === 1 && dom.hasContentVirtual(child);
        });
      };
      dom.hasContent = function hasContent(elm, noRecursion) {
        elm = axe.utils.getNodeFromTree(axe._tree[0], elm);
        return dom.hasContentVirtual(elm, noRecursion);
      };
      dom.idrefs = function(node, attr) {
        'use strict';
        var index, length, doc = dom.getRootNode(node), result = [], idrefs = node.getAttribute(attr);
        if (idrefs) {
          idrefs = axe.utils.tokenList(idrefs);
          for (index = 0, length = idrefs.length; index < length; index++) {
            result.push(doc.getElementById(idrefs[index]));
          }
        }
        return result;
      };
      function focusDisabled(el) {
        return el.disabled || !dom.isVisible(el, true) && el.nodeName.toUpperCase() !== 'AREA';
      }
      dom.isFocusable = function(el) {
        'use strict';
        if (focusDisabled(el)) {
          return false;
        } else if (dom.isNativelyFocusable(el)) {
          return true;
        }
        var tabindex = el.getAttribute('tabindex');
        if (tabindex && !isNaN(parseInt(tabindex, 10))) {
          return true;
        }
        return false;
      };
      dom.isNativelyFocusable = function(el) {
        'use strict';
        if (!el || focusDisabled(el)) {
          return false;
        }
        switch (el.nodeName.toUpperCase()) {
         case 'A':
         case 'AREA':
          if (el.href) {
            return true;
          }
          break;

         case 'INPUT':
          return el.type !== 'hidden';

         case 'TEXTAREA':
         case 'SELECT':
         case 'DETAILS':
         case 'BUTTON':
          return true;
        }
        return false;
      };
      dom.insertedIntoFocusOrder = function(el) {
        return el.tabIndex > -1 && dom.isFocusable(el) && !dom.isNativelyFocusable(el);
      };
      dom.isHTML5 = function(doc) {
        var node = doc.doctype;
        if (node === null) {
          return false;
        }
        return node.name === 'html' && !node.publicId && !node.systemId;
      };
      function walkDomNode(node, functor) {
        if (functor(node.actualNode) !== false) {
          node.children.forEach(function(child) {
            return walkDomNode(child, functor);
          });
        }
      }
      var blockLike = [ 'block', 'list-item', 'table', 'flex', 'grid', 'inline-block' ];
      function isBlock(elm) {
        var display = window.getComputedStyle(elm).getPropertyValue('display');
        return blockLike.includes(display) || display.substr(0, 6) === 'table-';
      }
      function getBlockParent(node) {
        var parentBlock = dom.getComposedParent(node);
        while (parentBlock && !isBlock(parentBlock)) {
          parentBlock = dom.getComposedParent(parentBlock);
        }
        return axe.utils.getNodeFromTree(axe._tree[0], parentBlock);
      }
      dom.isInTextBlock = function isInTextBlock(node) {
        if (isBlock(node)) {
          return false;
        }
        var virtualParent = getBlockParent(node);
        var parentText = '';
        var linkText = '';
        var inBrBlock = 0;
        walkDomNode(virtualParent, function(currNode) {
          if (inBrBlock === 2) {
            return false;
          }
          if (currNode.nodeType === 3) {
            parentText += currNode.nodeValue;
          }
          if (currNode.nodeType !== 1) {
            return;
          }
          var nodeName = (currNode.nodeName || '').toUpperCase();
          if ([ 'BR', 'HR' ].includes(nodeName)) {
            if (inBrBlock === 0) {
              parentText = '';
              linkText = '';
            } else {
              inBrBlock = 2;
            }
          } else if (currNode.style.display === 'none' || currNode.style.overflow === 'hidden' || ![ '', null, 'none' ].includes(currNode.style.float) || ![ '', null, 'relative' ].includes(currNode.style.position)) {
            return false;
          } else if (nodeName === 'A' && currNode.href || (currNode.getAttribute('role') || '').toLowerCase() === 'link') {
            if (currNode === node) {
              inBrBlock = 1;
            }
            linkText += currNode.textContent;
            return false;
          }
        });
        parentText = axe.commons.text.sanitize(parentText);
        linkText = axe.commons.text.sanitize(linkText);
        return parentText.length > linkText.length;
      };
      dom.isNode = function(element) {
        'use strict';
        return element instanceof Node;
      };
      function noParentScrolled(element, offset) {
        element = dom.getComposedParent(element);
        while (element && element.nodeName.toLowerCase() !== 'html') {
          if (element.scrollTop) {
            offset += element.scrollTop;
            if (offset >= 0) {
              return false;
            }
          }
          element = dom.getComposedParent(element);
        }
        return true;
      }
      dom.isOffscreen = function(element) {
        var leftBoundary = void 0;
        var docElement = document.documentElement;
        var styl = window.getComputedStyle(element);
        var dir = window.getComputedStyle(document.body || docElement).getPropertyValue('direction');
        var coords = dom.getElementCoordinates(element);
        if (coords.bottom < 0 && (noParentScrolled(element, coords.bottom) || styl.position === 'absolute')) {
          return true;
        }
        if (coords.left === 0 && coords.right === 0) {
          return false;
        }
        if (dir === 'ltr') {
          if (coords.right <= 0) {
            return true;
          }
        } else {
          leftBoundary = Math.max(docElement.scrollWidth, dom.getViewportSize(window).width);
          if (coords.left >= leftBoundary) {
            return true;
          }
        }
        return false;
      };
      function isClipped(clip) {
        'use strict';
        var matches = clip.match(/rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/);
        if (matches && matches.length === 5) {
          return matches[3] - matches[1] <= 0 && matches[2] - matches[4] <= 0;
        }
        return false;
      }
      dom.isVisible = function(el, screenReader, recursed) {
        'use strict';
        var style, nodeName, parent;
        if (el.nodeType === 9) {
          return true;
        }
        if (el.nodeType === 11) {
          el = el.host;
        }
        style = window.getComputedStyle(el, null);
        if (style === null) {
          return false;
        }
        nodeName = el.nodeName.toUpperCase();
        if (style.getPropertyValue('display') === 'none' || nodeName.toUpperCase() === 'STYLE' || nodeName.toUpperCase() === 'SCRIPT' || !screenReader && isClipped(style.getPropertyValue('clip')) || !recursed && (style.getPropertyValue('visibility') === 'hidden' || !screenReader && dom.isOffscreen(el)) || screenReader && el.getAttribute('aria-hidden') === 'true') {
          return false;
        }
        parent = el.assignedSlot ? el.assignedSlot : el.parentNode;
        if (parent) {
          return dom.isVisible(parent, screenReader, true);
        }
        return false;
      };
      var visualRoles = [ 'checkbox', 'img', 'radio', 'range', 'slider', 'spinbutton', 'textbox' ];
      dom.isVisualContent = function(element) {
        var role = element.getAttribute('role');
        if (role) {
          return visualRoles.indexOf(role) !== -1;
        }
        switch (element.tagName.toUpperCase()) {
         case 'IMG':
         case 'IFRAME':
         case 'OBJECT':
         case 'VIDEO':
         case 'AUDIO':
         case 'CANVAS':
         case 'SVG':
         case 'MATH':
         case 'BUTTON':
         case 'SELECT':
         case 'TEXTAREA':
         case 'KEYGEN':
         case 'PROGRESS':
         case 'METER':
          return true;

         case 'INPUT':
          return element.type !== 'hidden';

         default:
          return false;
        }
      };
      dom.shadowElementsFromPoint = function(nodeX, nodeY) {
        var root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
        var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        if (i > 999) {
          throw new Error('Infinite loop detected');
        }
        return Array.from(root.elementsFromPoint(nodeX, nodeY)).filter(function(nodes) {
          return dom.getRootNode(nodes) === root;
        }).reduce(function(stack, elm) {
          if (axe.utils.isShadowRoot(elm)) {
            var shadowStack = dom.shadowElementsFromPoint(nodeX, nodeY, elm.shadowRoot, i + 1);
            stack = stack.concat(shadowStack);
            if (stack.length && axe.commons.dom.visuallyContains(stack[0], elm)) {
              stack.push(elm);
            }
          } else {
            stack.push(elm);
          }
          return stack;
        }, []);
      };
      dom.visuallyContains = function(node, parent) {
        var rectBound = node.getBoundingClientRect();
        var margin = .01;
        var rect = {
          top: rectBound.top + margin,
          bottom: rectBound.bottom - margin,
          left: rectBound.left + margin,
          right: rectBound.right - margin
        };
        var parentRect = parent.getBoundingClientRect();
        var parentTop = parentRect.top;
        var parentLeft = parentRect.left;
        var parentScrollArea = {
          top: parentTop - parent.scrollTop,
          bottom: parentTop - parent.scrollTop + parent.scrollHeight,
          left: parentLeft - parent.scrollLeft,
          right: parentLeft - parent.scrollLeft + parent.scrollWidth
        };
        var style = window.getComputedStyle(parent);
        if (style.getPropertyValue('display') === 'inline') {
          return true;
        }
        if (rect.left < parentScrollArea.left && rect.left < parentRect.left || rect.top < parentScrollArea.top && rect.top < parentRect.top || rect.right > parentScrollArea.right && rect.right > parentRect.right || rect.bottom > parentScrollArea.bottom && rect.bottom > parentRect.bottom) {
          return false;
        }
        if (rect.right > parentRect.right || rect.bottom > parentRect.bottom) {
          return style.overflow === 'scroll' || style.overflow === 'auto' || style.overflow === 'hidden' || parent instanceof HTMLBodyElement || parent instanceof HTMLHtmlElement;
        }
        return true;
      };
      dom.visuallyOverlaps = function(rect, parent) {
        var parentRect = parent.getBoundingClientRect();
        var parentTop = parentRect.top;
        var parentLeft = parentRect.left;
        var parentScrollArea = {
          top: parentTop - parent.scrollTop,
          bottom: parentTop - parent.scrollTop + parent.scrollHeight,
          left: parentLeft - parent.scrollLeft,
          right: parentLeft - parent.scrollLeft + parent.scrollWidth
        };
        if (rect.left > parentScrollArea.right && rect.left > parentRect.right || rect.top > parentScrollArea.bottom && rect.top > parentRect.bottom || rect.right < parentScrollArea.left && rect.right < parentRect.left || rect.bottom < parentScrollArea.top && rect.bottom < parentRect.top) {
          return false;
        }
        var style = window.getComputedStyle(parent);
        if (rect.left > parentRect.right || rect.top > parentRect.bottom) {
          return style.overflow === 'scroll' || style.overflow === 'auto' || parent instanceof HTMLBodyElement || parent instanceof HTMLHtmlElement;
        }
        return true;
      };
      table.getAllCells = function(tableElm) {
        var rowIndex, cellIndex, rowLength, cellLength;
        var cells = [];
        for (rowIndex = 0, rowLength = tableElm.rows.length; rowIndex < rowLength; rowIndex++) {
          for (cellIndex = 0, cellLength = tableElm.rows[rowIndex].cells.length; cellIndex < cellLength; cellIndex++) {
            cells.push(tableElm.rows[rowIndex].cells[cellIndex]);
          }
        }
        return cells;
      };
      table.getCellPosition = function(cell, tableGrid) {
        var rowIndex, index;
        if (!tableGrid) {
          tableGrid = table.toGrid(dom.findUp(cell, 'table'));
        }
        for (rowIndex = 0; rowIndex < tableGrid.length; rowIndex++) {
          if (tableGrid[rowIndex]) {
            index = tableGrid[rowIndex].indexOf(cell);
            if (index !== -1) {
              return {
                x: index,
                y: rowIndex
              };
            }
          }
        }
      };
      table.getHeaders = function(cell) {
        if (cell.hasAttribute('headers')) {
          return commons.dom.idrefs(cell, 'headers');
        }
        var tableGrid = commons.table.toGrid(commons.dom.findUp(cell, 'table'));
        var position = commons.table.getCellPosition(cell, tableGrid);
        var rowHeaders = table.traverse('left', position, tableGrid).filter(function(cell) {
          return table.isRowHeader(cell);
        });
        var colHeaders = table.traverse('up', position, tableGrid).filter(function(cell) {
          return table.isColumnHeader(cell);
        });
        return [].concat(rowHeaders, colHeaders).reverse();
      };
      table.getScope = function(cell) {
        var scope = cell.getAttribute('scope');
        var role = cell.getAttribute('role');
        if (cell instanceof Element === false || [ 'TD', 'TH' ].indexOf(cell.nodeName.toUpperCase()) === -1) {
          throw new TypeError('Expected TD or TH element');
        }
        if (role === 'columnheader') {
          return 'col';
        } else if (role === 'rowheader') {
          return 'row';
        } else if (scope === 'col' || scope === 'row') {
          return scope;
        } else if (cell.nodeName.toUpperCase() !== 'TH') {
          return false;
        }
        var tableGrid = table.toGrid(dom.findUp(cell, 'table'));
        var pos = table.getCellPosition(cell);
        var headerRow = tableGrid[pos.y].reduce(function(headerRow, cell) {
          return headerRow && cell.nodeName.toUpperCase() === 'TH';
        }, true);
        if (headerRow) {
          return 'col';
        }
        var headerCol = tableGrid.map(function(col) {
          return col[pos.x];
        }).reduce(function(headerCol, cell) {
          return headerCol && cell.nodeName.toUpperCase() === 'TH';
        }, true);
        if (headerCol) {
          return 'row';
        }
        return 'auto';
      };
      table.isColumnHeader = function(element) {
        return [ 'col', 'auto' ].indexOf(table.getScope(element)) !== -1;
      };
      table.isDataCell = function(cell) {
        if (!cell.children.length && !cell.textContent.trim()) {
          return false;
        }
        var role = cell.getAttribute('role');
        if (axe.commons.aria.isValidRole(role)) {
          return [ 'cell', 'gridcell' ].includes(role);
        } else {
          return cell.nodeName.toUpperCase() === 'TD';
        }
      };
      table.isDataTable = function(node) {
        var role = (node.getAttribute('role') || '').toLowerCase();
        if ((role === 'presentation' || role === 'none') && !dom.isFocusable(node)) {
          return false;
        }
        if (node.getAttribute('contenteditable') === 'true' || dom.findUp(node, '[contenteditable="true"]')) {
          return true;
        }
        if (role === 'grid' || role === 'treegrid' || role === 'table') {
          return true;
        }
        if (commons.aria.getRoleType(role) === 'landmark') {
          return true;
        }
        if (node.getAttribute('datatable') === '0') {
          return false;
        }
        if (node.getAttribute('summary')) {
          return true;
        }
        if (node.tHead || node.tFoot || node.caption) {
          return true;
        }
        for (var childIndex = 0, childLength = node.children.length; childIndex < childLength; childIndex++) {
          if (node.children[childIndex].nodeName.toUpperCase() === 'COLGROUP') {
            return true;
          }
        }
        var cells = 0;
        var rowLength = node.rows.length;
        var row, cell;
        var hasBorder = false;
        for (var rowIndex = 0; rowIndex < rowLength; rowIndex++) {
          row = node.rows[rowIndex];
          for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
            cell = row.cells[cellIndex];
            if (cell.nodeName.toUpperCase() === 'TH') {
              return true;
            }
            if (!hasBorder && (cell.offsetWidth !== cell.clientWidth || cell.offsetHeight !== cell.clientHeight)) {
              hasBorder = true;
            }
            if (cell.getAttribute('scope') || cell.getAttribute('headers') || cell.getAttribute('abbr')) {
              return true;
            }
            if ([ 'columnheader', 'rowheader' ].includes((cell.getAttribute('role') || '').toLowerCase())) {
              return true;
            }
            if (cell.children.length === 1 && cell.children[0].nodeName.toUpperCase() === 'ABBR') {
              return true;
            }
            cells++;
          }
        }
        if (node.getElementsByTagName('table').length) {
          return false;
        }
        if (rowLength < 2) {
          return false;
        }
        var sampleRow = node.rows[Math.ceil(rowLength / 2)];
        if (sampleRow.cells.length === 1 && sampleRow.cells[0].colSpan === 1) {
          return false;
        }
        if (sampleRow.cells.length >= 5) {
          return true;
        }
        if (hasBorder) {
          return true;
        }
        var bgColor, bgImage;
        for (rowIndex = 0; rowIndex < rowLength; rowIndex++) {
          row = node.rows[rowIndex];
          if (bgColor && bgColor !== window.getComputedStyle(row).getPropertyValue('background-color')) {
            return true;
          } else {
            bgColor = window.getComputedStyle(row).getPropertyValue('background-color');
          }
          if (bgImage && bgImage !== window.getComputedStyle(row).getPropertyValue('background-image')) {
            return true;
          } else {
            bgImage = window.getComputedStyle(row).getPropertyValue('background-image');
          }
        }
        if (rowLength >= 20) {
          return true;
        }
        if (dom.getElementCoordinates(node).width > dom.getViewportSize(window).width * .95) {
          return false;
        }
        if (cells < 10) {
          return false;
        }
        if (node.querySelector('object, embed, iframe, applet')) {
          return false;
        }
        return true;
      };
      table.isHeader = function(cell) {
        if (table.isColumnHeader(cell) || table.isRowHeader(cell)) {
          return true;
        }
        if (cell.getAttribute('id')) {
          var id = axe.utils.escapeSelector(cell.getAttribute('id'));
          return !!document.querySelector('[headers~="' + id + '"]');
        }
        return false;
      };
      table.isRowHeader = function(cell) {
        return [ 'row', 'auto' ].includes(table.getScope(cell));
      };
      table.toGrid = function(node) {
        var table = [];
        var rows = node.rows;
        for (var i = 0, rowLength = rows.length; i < rowLength; i++) {
          var cells = rows[i].cells;
          table[i] = table[i] || [];
          var columnIndex = 0;
          for (var j = 0, cellLength = cells.length; j < cellLength; j++) {
            for (var colSpan = 0; colSpan < cells[j].colSpan; colSpan++) {
              for (var rowSpan = 0; rowSpan < cells[j].rowSpan; rowSpan++) {
                table[i + rowSpan] = table[i + rowSpan] || [];
                while (table[i + rowSpan][columnIndex]) {
                  columnIndex++;
                }
                table[i + rowSpan][columnIndex] = cells[j];
              }
              columnIndex++;
            }
          }
        }
        return table;
      };
      table.toArray = table.toGrid;
      (function(table) {
        var traverseTable = function traverseTable(dir, position, tableGrid, callback) {
          var result;
          var cell = tableGrid[position.y] ? tableGrid[position.y][position.x] : undefined;
          if (!cell) {
            return [];
          }
          if (typeof callback === 'function') {
            result = callback(cell, position, tableGrid);
            if (result === true) {
              return [ cell ];
            }
          }
          result = traverseTable(dir, {
            x: position.x + dir.x,
            y: position.y + dir.y
          }, tableGrid, callback);
          result.unshift(cell);
          return result;
        };
        table.traverse = function(dir, startPos, tableGrid, callback) {
          if (Array.isArray(startPos)) {
            callback = tableGrid;
            tableGrid = startPos;
            startPos = {
              x: 0,
              y: 0
            };
          }
          if (typeof dir === 'string') {
            switch (dir) {
             case 'left':
              dir = {
                x: -1,
                y: 0
              };
              break;

             case 'up':
              dir = {
                x: 0,
                y: -1
              };
              break;

             case 'right':
              dir = {
                x: 1,
                y: 0
              };
              break;

             case 'down':
              dir = {
                x: 0,
                y: 1
              };
              break;
            }
          }
          return traverseTable(dir, {
            x: startPos.x + dir.x,
            y: startPos.y + dir.y
          }, tableGrid, callback);
        };
      })(table);
      var defaultButtonValues = {
        submit: 'Submit',
        reset: 'Reset'
      };
      var inputTypes = [ 'text', 'search', 'tel', 'url', 'email', 'date', 'time', 'number', 'range', 'color' ];
      var phrasingElements = [ 'A', 'EM', 'STRONG', 'SMALL', 'MARK', 'ABBR', 'DFN', 'I', 'B', 'S', 'U', 'CODE', 'VAR', 'SAMP', 'KBD', 'SUP', 'SUB', 'Q', 'CITE', 'SPAN', 'BDO', 'BDI', 'BR', 'WBR', 'INS', 'DEL', 'IMG', 'EMBED', 'OBJECT', 'IFRAME', 'MAP', 'AREA', 'SCRIPT', 'NOSCRIPT', 'RUBY', 'VIDEO', 'AUDIO', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'LABEL', 'OUTPUT', 'DATALIST', 'KEYGEN', 'PROGRESS', 'COMMAND', 'CANVAS', 'TIME', 'METER' ];
      function findLabel(virtualNode) {
        var label = void 0;
        if (virtualNode.actualNode.id) {
          label = dom.findElmsInContext({
            elm: 'label',
            attr: 'for',
            value: virtualNode.actualNode.id,
            context: virtualNode.actualNode
          })[0];
        }
        if (!label) {
          label = dom.findUpVirtual(virtualNode, 'label');
        }
        return axe.utils.getNodeFromTree(axe._tree[0], label);
      }
      function isButton(_ref27) {
        var actualNode = _ref27.actualNode;
        return [ 'button', 'reset', 'submit' ].includes(actualNode.type.toLowerCase());
      }
      function isInput(_ref28) {
        var actualNode = _ref28.actualNode;
        var nodeName = actualNode.nodeName.toUpperCase();
        return nodeName === 'TEXTAREA' || nodeName === 'SELECT' || nodeName === 'INPUT' && actualNode.type.toLowerCase() !== 'hidden';
      }
      function shouldCheckSubtree(_ref29) {
        var actualNode = _ref29.actualNode;
        return [ 'BUTTON', 'SUMMARY', 'A' ].includes(actualNode.nodeName.toUpperCase());
      }
      function shouldNeverCheckSubtree(_ref30) {
        var actualNode = _ref30.actualNode;
        return [ 'TABLE', 'FIGURE', 'SELECT' ].includes(actualNode.nodeName.toUpperCase());
      }
      function formValueText(_ref31, inLabelledByContext) {
        var actualNode = _ref31.actualNode;
        var nodeName = actualNode.nodeName.toUpperCase();
        if (nodeName === 'INPUT') {
          if (!actualNode.hasAttribute('type') || inputTypes.includes(actualNode.type.toLowerCase())) {
            return actualNode.value;
          }
          return '';
        }
        if (nodeName === 'SELECT' && inLabelledByContext) {
          var opts = actualNode.options;
          if (opts && opts.length) {
            var returnText = '';
            for (var i = 0; i < opts.length; i++) {
              if (opts[i].selected) {
                returnText += ' ' + opts[i].text;
              }
            }
            return text.sanitize(returnText);
          }
          return '';
        }
        if (nodeName === 'TEXTAREA' && actualNode.value) {
          return actualNode.value;
        }
        return '';
      }
      function checkDescendant(_ref32, nodeName) {
        var actualNode = _ref32.actualNode;
        var candidate = actualNode.querySelector(nodeName.toLowerCase());
        if (candidate) {
          return text.accessibleText(candidate);
        }
        return '';
      }
      function isEmbeddedControl(elm) {
        if (!elm) {
          return false;
        }
        var actualNode = elm.actualNode;
        switch (actualNode.nodeName.toUpperCase()) {
         case 'SELECT':
         case 'TEXTAREA':
          return true;

         case 'INPUT':
          return !actualNode.hasAttribute('type') || inputTypes.includes(actualNode.getAttribute('type').toLowerCase());

         default:
          return false;
        }
      }
      function shouldCheckAlt(_ref33) {
        var actualNode = _ref33.actualNode;
        var nodeName = actualNode.nodeName.toUpperCase();
        return [ 'IMG', 'APPLET', 'AREA' ].includes(nodeName) || nodeName === 'INPUT' && actualNode.type.toLowerCase() === 'image';
      }
      function nonEmptyText(t) {
        return !!text.sanitize(t);
      }
      text.accessibleText = function accessibleText(element, inLabelledByContext) {
        var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], element);
        return axe.commons.text.accessibleTextVirtual(virtualNode, inLabelledByContext);
      };
      text.accessibleTextVirtual = function accessibleTextVirtual(element, inLabelledByContext) {
        var accessibleNameComputation = void 0;
        var encounteredNodes = [];
        if (element instanceof Node) {
          element = axe.utils.getNodeFromTree(axe._tree[0], element);
        }
        function getInnerText(element, inLabelledByContext, inControlContext) {
          return element.children.reduce(function(returnText, child) {
            var actualNode = child.actualNode;
            if (actualNode.nodeType === 3) {
              returnText += actualNode.nodeValue;
            } else if (actualNode.nodeType === 1) {
              if (!phrasingElements.includes(actualNode.nodeName.toUpperCase())) {
                returnText += ' ';
              }
              returnText += accessibleNameComputation(child, inLabelledByContext, inControlContext);
            }
            return returnText;
          }, '');
        }
        function getLayoutTableText(element) {
          if (!axe.commons.table.isDataTable(element.actualNode) && axe.commons.table.getAllCells(element.actualNode).length === 1) {
            return getInnerText(element, false, false).trim();
          }
          return '';
        }
        function checkNative(element, inLabelledByContext, inControlContext) {
          var returnText = '';
          var actualNode = element.actualNode;
          var nodeName = actualNode.nodeName.toUpperCase();
          if (shouldCheckSubtree(element)) {
            returnText = getInnerText(element, false, false) || '';
            if (nonEmptyText(returnText)) {
              return returnText;
            }
          }
          if (nodeName === 'FIGURE') {
            returnText = checkDescendant(element, 'figcaption');
            if (nonEmptyText(returnText)) {
              return returnText;
            }
          }
          if (nodeName === 'TABLE') {
            returnText = checkDescendant(element, 'caption');
            if (nonEmptyText(returnText)) {
              return returnText;
            }
            returnText = actualNode.getAttribute('title') || actualNode.getAttribute('summary') || getLayoutTableText(element) || '';
            if (nonEmptyText(returnText)) {
              return returnText;
            }
          }
          if (shouldCheckAlt(element)) {
            return actualNode.getAttribute('alt') || '';
          }
          if (isInput(element) && !inControlContext) {
            if (isButton(element)) {
              return actualNode.value || actualNode.title || defaultButtonValues[actualNode.type] || '';
            }
            var labelElement = findLabel(element);
            if (labelElement) {
              return accessibleNameComputation(labelElement, inLabelledByContext, true);
            }
          }
          return '';
        }
        function checkARIA(element, inLabelledByContext, inControlContext) {
          var returnText = '';
          var actualNode = element.actualNode;
          if (!inLabelledByContext && actualNode.hasAttribute('aria-labelledby')) {
            returnText = text.sanitize(dom.idrefs(actualNode, 'aria-labelledby').map(function(label) {
              if (label !== null) {
                if (actualNode === label) {
                  encounteredNodes.pop();
                }
                var vLabel = axe.utils.getNodeFromTree(axe._tree[0], label);
                return accessibleNameComputation(vLabel, true, actualNode !== label);
              } else {
                return '';
              }
            }).join(' '));
          }
          if (!returnText && !(inControlContext && isEmbeddedControl(element)) && actualNode.hasAttribute('aria-label')) {
            return text.sanitize(actualNode.getAttribute('aria-label'));
          }
          return returnText;
        }
        accessibleNameComputation = function accessibleNameComputation(element, inLabelledByContext, inControlContext) {
          var returnText = void 0;
          if (!element || encounteredNodes.includes(element)) {
            return '';
          } else if (element !== null && element.actualNode instanceof Node !== true) {
            throw new Error('Invalid argument. Virtual Node must be provided');
          } else if (!inLabelledByContext && !dom.isVisible(element.actualNode, true)) {
            return '';
          }
          encounteredNodes.push(element);
          var role = element.actualNode.getAttribute('role');
          returnText = checkARIA(element, inLabelledByContext, inControlContext);
          if (nonEmptyText(returnText)) {
            return returnText;
          }
          returnText = checkNative(element, inLabelledByContext, inControlContext);
          if (nonEmptyText(returnText)) {
            return returnText;
          }
          if (inControlContext) {
            returnText = formValueText(element, inLabelledByContext);
            if (nonEmptyText(returnText)) {
              return returnText;
            }
          }
          if ((inLabelledByContext || !shouldNeverCheckSubtree(element)) && (!role || aria.getRolesWithNameFromContents().indexOf(role) !== -1)) {
            returnText = getInnerText(element, inLabelledByContext, inControlContext);
            if (nonEmptyText(returnText)) {
              return returnText;
            }
          }
          if (element.actualNode.hasAttribute('title')) {
            return element.actualNode.getAttribute('title');
          }
          return '';
        };
        return text.sanitize(accessibleNameComputation(element, inLabelledByContext));
      };
      var autocomplete = {
        stateTerms: [ 'on', 'off' ],
        standaloneTerms: [ 'name', 'honorific-prefix', 'given-name', 'additional-name', 'family-name', 'honorific-suffix', 'nickname', 'username', 'new-password', 'current-password', 'organization-title', 'organization', 'street-address', 'address-line1', 'address-line2', 'address-line3', 'address-level4', 'address-level3', 'address-level2', 'address-level1', 'country', 'country-name', 'postal-code', 'cc-name', 'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-exp', 'cc-exp-month', 'cc-exp-year', 'cc-csc', 'cc-type', 'transaction-currency', 'transaction-amount', 'language', 'bday', 'bday-day', 'bday-month', 'bday-year', 'sex', 'url', 'photo' ],
        qualifiers: [ 'home', 'work', 'mobile', 'fax', 'pager' ],
        qualifiedTerms: [ 'tel', 'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-local-prefix', 'tel-local-suffix', 'tel-extension', 'email', 'impp' ],
        locations: [ 'billing', 'shipping' ]
      };
      text.autocomplete = autocomplete;
      text.isValidAutocomplete = function isValidAutocomplete(autocomplete) {
        var _ref34 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref34$looseTyped = _ref34.looseTyped, looseTyped = _ref34$looseTyped === undefined ? false : _ref34$looseTyped, _ref34$stateTerms = _ref34.stateTerms, stateTerms = _ref34$stateTerms === undefined ? [] : _ref34$stateTerms, _ref34$locations = _ref34.locations, locations = _ref34$locations === undefined ? [] : _ref34$locations, _ref34$qualifiers = _ref34.qualifiers, qualifiers = _ref34$qualifiers === undefined ? [] : _ref34$qualifiers, _ref34$standaloneTerm = _ref34.standaloneTerms, standaloneTerms = _ref34$standaloneTerm === undefined ? [] : _ref34$standaloneTerm, _ref34$qualifiedTerms = _ref34.qualifiedTerms, qualifiedTerms = _ref34$qualifiedTerms === undefined ? [] : _ref34$qualifiedTerms;
        autocomplete = autocomplete.toLowerCase().trim();
        stateTerms = stateTerms.concat(text.autocomplete.stateTerms);
        if (stateTerms.includes(autocomplete) || autocomplete === '') {
          return true;
        }
        qualifiers = qualifiers.concat(text.autocomplete.qualifiers);
        locations = locations.concat(text.autocomplete.locations);
        standaloneTerms = standaloneTerms.concat(text.autocomplete.standaloneTerms);
        qualifiedTerms = qualifiedTerms.concat(text.autocomplete.qualifiedTerms);
        var autocompleteTerms = autocomplete.split(/\s+/g);
        if (!looseTyped) {
          if (autocompleteTerms[0].length > 8 && autocompleteTerms[0].substr(0, 8) === 'section-') {
            autocompleteTerms.shift();
          }
          if (locations.includes(autocompleteTerms[0])) {
            autocompleteTerms.shift();
          }
          if (qualifiers.includes(autocompleteTerms[0])) {
            autocompleteTerms.shift();
            standaloneTerms = [];
          }
          if (autocompleteTerms.length !== 1) {
            return false;
          }
        }
        var purposeTerm = autocompleteTerms[autocompleteTerms.length - 1];
        return standaloneTerms.includes(purposeTerm) || qualifiedTerms.includes(purposeTerm);
      };
      text.labelVirtual = function(node) {
        var ref, candidate, doc;
        candidate = aria.labelVirtual(node);
        if (candidate) {
          return candidate;
        }
        if (node.actualNode.id) {
          var id = axe.commons.utils.escapeSelector(node.actualNode.getAttribute('id'));
          doc = axe.commons.dom.getRootNode(node.actualNode);
          ref = doc.querySelector('label[for="' + id + '"]');
          candidate = ref && text.visible(ref, true);
          if (candidate) {
            return candidate;
          }
        }
        ref = dom.findUpVirtual(node, 'label');
        candidate = ref && text.visible(ref, true);
        if (candidate) {
          return candidate;
        }
        return null;
      };
      text.label = function(node) {
        node = axe.utils.getNodeFromTree(axe._tree[0], node);
        return text.labelVirtual(node);
      };
      text.sanitize = function(str) {
        'use strict';
        return str.replace(/\r\n/g, '\n').replace(/\u00A0/g, ' ').replace(/[\s]{2,}/g, ' ').trim();
      };
      text.visibleVirtual = function(element, screenReader, noRecursing) {
        var result = element.children.map(function(child) {
          if (child.actualNode.nodeType === 3) {
            var nodeValue = child.actualNode.nodeValue;
            if (nodeValue && dom.isVisible(element.actualNode, screenReader)) {
              return nodeValue;
            }
          } else if (!noRecursing) {
            return text.visibleVirtual(child, screenReader);
          }
        }).join('');
        return text.sanitize(result);
      };
      text.visible = function(element, screenReader, noRecursing) {
        element = axe.utils.getNodeFromTree(axe._tree[0], element);
        return text.visibleVirtual(element, screenReader, noRecursing);
      };
      axe.utils.getBaseLang = function getBaseLang(lang) {
        if (!lang) {
          return '';
        }
        return lang.trim().split('-')[0].toLowerCase();
      };
      var htmlTags = [ 'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'math', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr' ];
      axe.utils.isHtmlElement = function isHtmlElement(node) {
        var tagName = node.nodeName.toLowerCase();
        return htmlTags.includes(tagName) && node.namespaceURI !== 'http://www.w3.org/2000/svg';
      };
      axe.utils.tokenList = function(str) {
        'use strict';
        return str.trim().replace(/\s{2,}/g, ' ').split(' ');
      };
      var langs = [ 'aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'in', 'io', 'is', 'it', 'iu', 'iw', 'ja', 'ji', 'jv', 'jw', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mo', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu', 'aaa', 'aab', 'aac', 'aad', 'aae', 'aaf', 'aag', 'aah', 'aai', 'aak', 'aal', 'aam', 'aan', 'aao', 'aap', 'aaq', 'aas', 'aat', 'aau', 'aav', 'aaw', 'aax', 'aaz', 'aba', 'abb', 'abc', 'abd', 'abe', 'abf', 'abg', 'abh', 'abi', 'abj', 'abl', 'abm', 'abn', 'abo', 'abp', 'abq', 'abr', 'abs', 'abt', 'abu', 'abv', 'abw', 'abx', 'aby', 'abz', 'aca', 'acb', 'acd', 'ace', 'acf', 'ach', 'aci', 'ack', 'acl', 'acm', 'acn', 'acp', 'acq', 'acr', 'acs', 'act', 'acu', 'acv', 'acw', 'acx', 'acy', 'acz', 'ada', 'adb', 'add', 'ade', 'adf', 'adg', 'adh', 'adi', 'adj', 'adl', 'adn', 'ado', 'adp', 'adq', 'adr', 'ads', 'adt', 'adu', 'adw', 'adx', 'ady', 'adz', 'aea', 'aeb', 'aec', 'aed', 'aee', 'aek', 'ael', 'aem', 'aen', 'aeq', 'aer', 'aes', 'aeu', 'aew', 'aey', 'aez', 'afa', 'afb', 'afd', 'afe', 'afg', 'afh', 'afi', 'afk', 'afn', 'afo', 'afp', 'afs', 'aft', 'afu', 'afz', 'aga', 'agb', 'agc', 'agd', 'age', 'agf', 'agg', 'agh', 'agi', 'agj', 'agk', 'agl', 'agm', 'agn', 'ago', 'agp', 'agq', 'agr', 'ags', 'agt', 'agu', 'agv', 'agw', 'agx', 'agy', 'agz', 'aha', 'ahb', 'ahg', 'ahh', 'ahi', 'ahk', 'ahl', 'ahm', 'ahn', 'aho', 'ahp', 'ahr', 'ahs', 'aht', 'aia', 'aib', 'aic', 'aid', 'aie', 'aif', 'aig', 'aih', 'aii', 'aij', 'aik', 'ail', 'aim', 'ain', 'aio', 'aip', 'aiq', 'air', 'ais', 'ait', 'aiw', 'aix', 'aiy', 'aja', 'ajg', 'aji', 'ajn', 'ajp', 'ajt', 'aju', 'ajw', 'ajz', 'akb', 'akc', 'akd', 'ake', 'akf', 'akg', 'akh', 'aki', 'akj', 'akk', 'akl', 'akm', 'ako', 'akp', 'akq', 'akr', 'aks', 'akt', 'aku', 'akv', 'akw', 'akx', 'aky', 'akz', 'ala', 'alc', 'ald', 'ale', 'alf', 'alg', 'alh', 'ali', 'alj', 'alk', 'all', 'alm', 'aln', 'alo', 'alp', 'alq', 'alr', 'als', 'alt', 'alu', 'alv', 'alw', 'alx', 'aly', 'alz', 'ama', 'amb', 'amc', 'ame', 'amf', 'amg', 'ami', 'amj', 'amk', 'aml', 'amm', 'amn', 'amo', 'amp', 'amq', 'amr', 'ams', 'amt', 'amu', 'amv', 'amw', 'amx', 'amy', 'amz', 'ana', 'anb', 'anc', 'and', 'ane', 'anf', 'ang', 'anh', 'ani', 'anj', 'ank', 'anl', 'anm', 'ann', 'ano', 'anp', 'anq', 'anr', 'ans', 'ant', 'anu', 'anv', 'anw', 'anx', 'any', 'anz', 'aoa', 'aob', 'aoc', 'aod', 'aoe', 'aof', 'aog', 'aoh', 'aoi', 'aoj', 'aok', 'aol', 'aom', 'aon', 'aor', 'aos', 'aot', 'aou', 'aox', 'aoz', 'apa', 'apb', 'apc', 'apd', 'ape', 'apf', 'apg', 'aph', 'api', 'apj', 'apk', 'apl', 'apm', 'apn', 'apo', 'app', 'apq', 'apr', 'aps', 'apt', 'apu', 'apv', 'apw', 'apx', 'apy', 'apz', 'aqa', 'aqc', 'aqd', 'aqg', 'aql', 'aqm', 'aqn', 'aqp', 'aqr', 'aqt', 'aqz', 'arb', 'arc', 'ard', 'are', 'arh', 'ari', 'arj', 'ark', 'arl', 'arn', 'aro', 'arp', 'arq', 'arr', 'ars', 'art', 'aru', 'arv', 'arw', 'arx', 'ary', 'arz', 'asa', 'asb', 'asc', 'asd', 'ase', 'asf', 'asg', 'ash', 'asi', 'asj', 'ask', 'asl', 'asn', 'aso', 'asp', 'asq', 'asr', 'ass', 'ast', 'asu', 'asv', 'asw', 'asx', 'asy', 'asz', 'ata', 'atb', 'atc', 'atd', 'ate', 'atg', 'ath', 'ati', 'atj', 'atk', 'atl', 'atm', 'atn', 'ato', 'atp', 'atq', 'atr', 'ats', 'att', 'atu', 'atv', 'atw', 'atx', 'aty', 'atz', 'aua', 'aub', 'auc', 'aud', 'aue', 'auf', 'aug', 'auh', 'aui', 'auj', 'auk', 'aul', 'aum', 'aun', 'auo', 'aup', 'auq', 'aur', 'aus', 'aut', 'auu', 'auw', 'aux', 'auy', 'auz', 'avb', 'avd', 'avi', 'avk', 'avl', 'avm', 'avn', 'avo', 'avs', 'avt', 'avu', 'avv', 'awa', 'awb', 'awc', 'awd', 'awe', 'awg', 'awh', 'awi', 'awk', 'awm', 'awn', 'awo', 'awr', 'aws', 'awt', 'awu', 'awv', 'aww', 'awx', 'awy', 'axb', 'axe', 'axg', 'axk', 'axl', 'axm', 'axx', 'aya', 'ayb', 'ayc', 'ayd', 'aye', 'ayg', 'ayh', 'ayi', 'ayk', 'ayl', 'ayn', 'ayo', 'ayp', 'ayq', 'ayr', 'ays', 'ayt', 'ayu', 'ayx', 'ayy', 'ayz', 'aza', 'azb', 'azc', 'azd', 'azg', 'azj', 'azm', 'azn', 'azo', 'azt', 'azz', 'baa', 'bab', 'bac', 'bad', 'bae', 'baf', 'bag', 'bah', 'bai', 'baj', 'bal', 'ban', 'bao', 'bap', 'bar', 'bas', 'bat', 'bau', 'bav', 'baw', 'bax', 'bay', 'baz', 'bba', 'bbb', 'bbc', 'bbd', 'bbe', 'bbf', 'bbg', 'bbh', 'bbi', 'bbj', 'bbk', 'bbl', 'bbm', 'bbn', 'bbo', 'bbp', 'bbq', 'bbr', 'bbs', 'bbt', 'bbu', 'bbv', 'bbw', 'bbx', 'bby', 'bbz', 'bca', 'bcb', 'bcc', 'bcd', 'bce', 'bcf', 'bcg', 'bch', 'bci', 'bcj', 'bck', 'bcl', 'bcm', 'bcn', 'bco', 'bcp', 'bcq', 'bcr', 'bcs', 'bct', 'bcu', 'bcv', 'bcw', 'bcy', 'bcz', 'bda', 'bdb', 'bdc', 'bdd', 'bde', 'bdf', 'bdg', 'bdh', 'bdi', 'bdj', 'bdk', 'bdl', 'bdm', 'bdn', 'bdo', 'bdp', 'bdq', 'bdr', 'bds', 'bdt', 'bdu', 'bdv', 'bdw', 'bdx', 'bdy', 'bdz', 'bea', 'beb', 'bec', 'bed', 'bee', 'bef', 'beg', 'beh', 'bei', 'bej', 'bek', 'bem', 'beo', 'bep', 'beq', 'ber', 'bes', 'bet', 'beu', 'bev', 'bew', 'bex', 'bey', 'bez', 'bfa', 'bfb', 'bfc', 'bfd', 'bfe', 'bff', 'bfg', 'bfh', 'bfi', 'bfj', 'bfk', 'bfl', 'bfm', 'bfn', 'bfo', 'bfp', 'bfq', 'bfr', 'bfs', 'bft', 'bfu', 'bfw', 'bfx', 'bfy', 'bfz', 'bga', 'bgb', 'bgc', 'bgd', 'bge', 'bgf', 'bgg', 'bgi', 'bgj', 'bgk', 'bgl', 'bgm', 'bgn', 'bgo', 'bgp', 'bgq', 'bgr', 'bgs', 'bgt', 'bgu', 'bgv', 'bgw', 'bgx', 'bgy', 'bgz', 'bha', 'bhb', 'bhc', 'bhd', 'bhe', 'bhf', 'bhg', 'bhh', 'bhi', 'bhj', 'bhk', 'bhl', 'bhm', 'bhn', 'bho', 'bhp', 'bhq', 'bhr', 'bhs', 'bht', 'bhu', 'bhv', 'bhw', 'bhx', 'bhy', 'bhz', 'bia', 'bib', 'bic', 'bid', 'bie', 'bif', 'big', 'bij', 'bik', 'bil', 'bim', 'bin', 'bio', 'bip', 'biq', 'bir', 'bit', 'biu', 'biv', 'biw', 'bix', 'biy', 'biz', 'bja', 'bjb', 'bjc', 'bjd', 'bje', 'bjf', 'bjg', 'bjh', 'bji', 'bjj', 'bjk', 'bjl', 'bjm', 'bjn', 'bjo', 'bjp', 'bjq', 'bjr', 'bjs', 'bjt', 'bju', 'bjv', 'bjw', 'bjx', 'bjy', 'bjz', 'bka', 'bkb', 'bkc', 'bkd', 'bkf', 'bkg', 'bkh', 'bki', 'bkj', 'bkk', 'bkl', 'bkm', 'bkn', 'bko', 'bkp', 'bkq', 'bkr', 'bks', 'bkt', 'bku', 'bkv', 'bkw', 'bkx', 'bky', 'bkz', 'bla', 'blb', 'blc', 'bld', 'ble', 'blf', 'blg', 'blh', 'bli', 'blj', 'blk', 'bll', 'blm', 'bln', 'blo', 'blp', 'blq', 'blr', 'bls', 'blt', 'blv', 'blw', 'blx', 'bly', 'blz', 'bma', 'bmb', 'bmc', 'bmd', 'bme', 'bmf', 'bmg', 'bmh', 'bmi', 'bmj', 'bmk', 'bml', 'bmm', 'bmn', 'bmo', 'bmp', 'bmq', 'bmr', 'bms', 'bmt', 'bmu', 'bmv', 'bmw', 'bmx', 'bmy', 'bmz', 'bna', 'bnb', 'bnc', 'bnd', 'bne', 'bnf', 'bng', 'bni', 'bnj', 'bnk', 'bnl', 'bnm', 'bnn', 'bno', 'bnp', 'bnq', 'bnr', 'bns', 'bnt', 'bnu', 'bnv', 'bnw', 'bnx', 'bny', 'bnz', 'boa', 'bob', 'boe', 'bof', 'bog', 'boh', 'boi', 'boj', 'bok', 'bol', 'bom', 'bon', 'boo', 'bop', 'boq', 'bor', 'bot', 'bou', 'bov', 'bow', 'box', 'boy', 'boz', 'bpa', 'bpb', 'bpd', 'bpg', 'bph', 'bpi', 'bpj', 'bpk', 'bpl', 'bpm', 'bpn', 'bpo', 'bpp', 'bpq', 'bpr', 'bps', 'bpt', 'bpu', 'bpv', 'bpw', 'bpx', 'bpy', 'bpz', 'bqa', 'bqb', 'bqc', 'bqd', 'bqf', 'bqg', 'bqh', 'bqi', 'bqj', 'bqk', 'bql', 'bqm', 'bqn', 'bqo', 'bqp', 'bqq', 'bqr', 'bqs', 'bqt', 'bqu', 'bqv', 'bqw', 'bqx', 'bqy', 'bqz', 'bra', 'brb', 'brc', 'brd', 'brf', 'brg', 'brh', 'bri', 'brj', 'brk', 'brl', 'brm', 'brn', 'bro', 'brp', 'brq', 'brr', 'brs', 'brt', 'bru', 'brv', 'brw', 'brx', 'bry', 'brz', 'bsa', 'bsb', 'bsc', 'bse', 'bsf', 'bsg', 'bsh', 'bsi', 'bsj', 'bsk', 'bsl', 'bsm', 'bsn', 'bso', 'bsp', 'bsq', 'bsr', 'bss', 'bst', 'bsu', 'bsv', 'bsw', 'bsx', 'bsy', 'bta', 'btb', 'btc', 'btd', 'bte', 'btf', 'btg', 'bth', 'bti', 'btj', 'btk', 'btl', 'btm', 'btn', 'bto', 'btp', 'btq', 'btr', 'bts', 'btt', 'btu', 'btv', 'btw', 'btx', 'bty', 'btz', 'bua', 'bub', 'buc', 'bud', 'bue', 'buf', 'bug', 'buh', 'bui', 'buj', 'buk', 'bum', 'bun', 'buo', 'bup', 'buq', 'bus', 'but', 'buu', 'buv', 'buw', 'bux', 'buy', 'buz', 'bva', 'bvb', 'bvc', 'bvd', 'bve', 'bvf', 'bvg', 'bvh', 'bvi', 'bvj', 'bvk', 'bvl', 'bvm', 'bvn', 'bvo', 'bvp', 'bvq', 'bvr', 'bvt', 'bvu', 'bvv', 'bvw', 'bvx', 'bvy', 'bvz', 'bwa', 'bwb', 'bwc', 'bwd', 'bwe', 'bwf', 'bwg', 'bwh', 'bwi', 'bwj', 'bwk', 'bwl', 'bwm', 'bwn', 'bwo', 'bwp', 'bwq', 'bwr', 'bws', 'bwt', 'bwu', 'bww', 'bwx', 'bwy', 'bwz', 'bxa', 'bxb', 'bxc', 'bxd', 'bxe', 'bxf', 'bxg', 'bxh', 'bxi', 'bxj', 'bxk', 'bxl', 'bxm', 'bxn', 'bxo', 'bxp', 'bxq', 'bxr', 'bxs', 'bxu', 'bxv', 'bxw', 'bxx', 'bxz', 'bya', 'byb', 'byc', 'byd', 'bye', 'byf', 'byg', 'byh', 'byi', 'byj', 'byk', 'byl', 'bym', 'byn', 'byo', 'byp', 'byq', 'byr', 'bys', 'byt', 'byv', 'byw', 'byx', 'byy', 'byz', 'bza', 'bzb', 'bzc', 'bzd', 'bze', 'bzf', 'bzg', 'bzh', 'bzi', 'bzj', 'bzk', 'bzl', 'bzm', 'bzn', 'bzo', 'bzp', 'bzq', 'bzr', 'bzs', 'bzt', 'bzu', 'bzv', 'bzw', 'bzx', 'bzy', 'bzz', 'caa', 'cab', 'cac', 'cad', 'cae', 'caf', 'cag', 'cah', 'cai', 'caj', 'cak', 'cal', 'cam', 'can', 'cao', 'cap', 'caq', 'car', 'cas', 'cau', 'cav', 'caw', 'cax', 'cay', 'caz', 'cba', 'cbb', 'cbc', 'cbd', 'cbe', 'cbg', 'cbh', 'cbi', 'cbj', 'cbk', 'cbl', 'cbn', 'cbo', 'cbq', 'cbr', 'cbs', 'cbt', 'cbu', 'cbv', 'cbw', 'cby', 'cca', 'ccc', 'ccd', 'cce', 'ccg', 'cch', 'ccj', 'ccl', 'ccm', 'ccn', 'cco', 'ccp', 'ccq', 'ccr', 'ccs', 'cda', 'cdc', 'cdd', 'cde', 'cdf', 'cdg', 'cdh', 'cdi', 'cdj', 'cdm', 'cdn', 'cdo', 'cdr', 'cds', 'cdy', 'cdz', 'cea', 'ceb', 'ceg', 'cek', 'cel', 'cen', 'cet', 'cfa', 'cfd', 'cfg', 'cfm', 'cga', 'cgc', 'cgg', 'cgk', 'chb', 'chc', 'chd', 'chf', 'chg', 'chh', 'chj', 'chk', 'chl', 'chm', 'chn', 'cho', 'chp', 'chq', 'chr', 'cht', 'chw', 'chx', 'chy', 'chz', 'cia', 'cib', 'cic', 'cid', 'cie', 'cih', 'cik', 'cim', 'cin', 'cip', 'cir', 'ciw', 'ciy', 'cja', 'cje', 'cjh', 'cji', 'cjk', 'cjm', 'cjn', 'cjo', 'cjp', 'cjr', 'cjs', 'cjv', 'cjy', 'cka', 'ckb', 'ckh', 'ckl', 'ckn', 'cko', 'ckq', 'ckr', 'cks', 'ckt', 'cku', 'ckv', 'ckx', 'cky', 'ckz', 'cla', 'clc', 'cld', 'cle', 'clh', 'cli', 'clj', 'clk', 'cll', 'clm', 'clo', 'clt', 'clu', 'clw', 'cly', 'cma', 'cmc', 'cme', 'cmg', 'cmi', 'cmk', 'cml', 'cmm', 'cmn', 'cmo', 'cmr', 'cms', 'cmt', 'cna', 'cnb', 'cnc', 'cng', 'cnh', 'cni', 'cnk', 'cnl', 'cno', 'cnr', 'cns', 'cnt', 'cnu', 'cnw', 'cnx', 'coa', 'cob', 'coc', 'cod', 'coe', 'cof', 'cog', 'coh', 'coj', 'cok', 'col', 'com', 'con', 'coo', 'cop', 'coq', 'cot', 'cou', 'cov', 'cow', 'cox', 'coy', 'coz', 'cpa', 'cpb', 'cpc', 'cpe', 'cpf', 'cpg', 'cpi', 'cpn', 'cpo', 'cpp', 'cps', 'cpu', 'cpx', 'cpy', 'cqd', 'cqu', 'cra', 'crb', 'crc', 'crd', 'crf', 'crg', 'crh', 'cri', 'crj', 'crk', 'crl', 'crm', 'crn', 'cro', 'crp', 'crq', 'crr', 'crs', 'crt', 'crv', 'crw', 'crx', 'cry', 'crz', 'csa', 'csb', 'csc', 'csd', 'cse', 'csf', 'csg', 'csh', 'csi', 'csj', 'csk', 'csl', 'csm', 'csn', 'cso', 'csq', 'csr', 'css', 'cst', 'csu', 'csv', 'csw', 'csy', 'csz', 'cta', 'ctc', 'ctd', 'cte', 'ctg', 'cth', 'ctl', 'ctm', 'ctn', 'cto', 'ctp', 'cts', 'ctt', 'ctu', 'ctz', 'cua', 'cub', 'cuc', 'cug', 'cuh', 'cui', 'cuj', 'cuk', 'cul', 'cum', 'cuo', 'cup', 'cuq', 'cur', 'cus', 'cut', 'cuu', 'cuv', 'cuw', 'cux', 'cuy', 'cvg', 'cvn', 'cwa', 'cwb', 'cwd', 'cwe', 'cwg', 'cwt', 'cya', 'cyb', 'cyo', 'czh', 'czk', 'czn', 'czo', 'czt', 'daa', 'dac', 'dad', 'dae', 'daf', 'dag', 'dah', 'dai', 'daj', 'dak', 'dal', 'dam', 'dao', 'dap', 'daq', 'dar', 'das', 'dau', 'dav', 'daw', 'dax', 'day', 'daz', 'dba', 'dbb', 'dbd', 'dbe', 'dbf', 'dbg', 'dbi', 'dbj', 'dbl', 'dbm', 'dbn', 'dbo', 'dbp', 'dbq', 'dbr', 'dbt', 'dbu', 'dbv', 'dbw', 'dby', 'dcc', 'dcr', 'dda', 'ddd', 'dde', 'ddg', 'ddi', 'ddj', 'ddn', 'ddo', 'ddr', 'dds', 'ddw', 'dec', 'ded', 'dee', 'def', 'deg', 'deh', 'dei', 'dek', 'del', 'dem', 'den', 'dep', 'deq', 'der', 'des', 'dev', 'dez', 'dga', 'dgb', 'dgc', 'dgd', 'dge', 'dgg', 'dgh', 'dgi', 'dgk', 'dgl', 'dgn', 'dgo', 'dgr', 'dgs', 'dgt', 'dgu', 'dgw', 'dgx', 'dgz', 'dha', 'dhd', 'dhg', 'dhi', 'dhl', 'dhm', 'dhn', 'dho', 'dhr', 'dhs', 'dhu', 'dhv', 'dhw', 'dhx', 'dia', 'dib', 'dic', 'did', 'dif', 'dig', 'dih', 'dii', 'dij', 'dik', 'dil', 'dim', 'din', 'dio', 'dip', 'diq', 'dir', 'dis', 'dit', 'diu', 'diw', 'dix', 'diy', 'diz', 'dja', 'djb', 'djc', 'djd', 'dje', 'djf', 'dji', 'djj', 'djk', 'djl', 'djm', 'djn', 'djo', 'djr', 'dju', 'djw', 'dka', 'dkk', 'dkl', 'dkr', 'dks', 'dkx', 'dlg', 'dlk', 'dlm', 'dln', 'dma', 'dmb', 'dmc', 'dmd', 'dme', 'dmg', 'dmk', 'dml', 'dmm', 'dmn', 'dmo', 'dmr', 'dms', 'dmu', 'dmv', 'dmw', 'dmx', 'dmy', 'dna', 'dnd', 'dne', 'dng', 'dni', 'dnj', 'dnk', 'dnn', 'dnr', 'dnt', 'dnu', 'dnv', 'dnw', 'dny', 'doa', 'dob', 'doc', 'doe', 'dof', 'doh', 'doi', 'dok', 'dol', 'don', 'doo', 'dop', 'doq', 'dor', 'dos', 'dot', 'dov', 'dow', 'dox', 'doy', 'doz', 'dpp', 'dra', 'drb', 'drc', 'drd', 'dre', 'drg', 'drh', 'dri', 'drl', 'drn', 'dro', 'drq', 'drr', 'drs', 'drt', 'dru', 'drw', 'dry', 'dsb', 'dse', 'dsh', 'dsi', 'dsl', 'dsn', 'dso', 'dsq', 'dta', 'dtb', 'dtd', 'dth', 'dti', 'dtk', 'dtm', 'dtn', 'dto', 'dtp', 'dtr', 'dts', 'dtt', 'dtu', 'dty', 'dua', 'dub', 'duc', 'dud', 'due', 'duf', 'dug', 'duh', 'dui', 'duj', 'duk', 'dul', 'dum', 'dun', 'duo', 'dup', 'duq', 'dur', 'dus', 'duu', 'duv', 'duw', 'dux', 'duy', 'duz', 'dva', 'dwa', 'dwl', 'dwr', 'dws', 'dwu', 'dww', 'dwy', 'dya', 'dyb', 'dyd', 'dyg', 'dyi', 'dym', 'dyn', 'dyo', 'dyu', 'dyy', 'dza', 'dzd', 'dze', 'dzg', 'dzl', 'dzn', 'eaa', 'ebg', 'ebk', 'ebo', 'ebr', 'ebu', 'ecr', 'ecs', 'ecy', 'eee', 'efa', 'efe', 'efi', 'ega', 'egl', 'ego', 'egx', 'egy', 'ehu', 'eip', 'eit', 'eiv', 'eja', 'eka', 'ekc', 'eke', 'ekg', 'eki', 'ekk', 'ekl', 'ekm', 'eko', 'ekp', 'ekr', 'eky', 'ele', 'elh', 'eli', 'elk', 'elm', 'elo', 'elp', 'elu', 'elx', 'ema', 'emb', 'eme', 'emg', 'emi', 'emk', 'emm', 'emn', 'emo', 'emp', 'ems', 'emu', 'emw', 'emx', 'emy', 'ena', 'enb', 'enc', 'end', 'enf', 'enh', 'enl', 'enm', 'enn', 'eno', 'enq', 'enr', 'enu', 'env', 'enw', 'enx', 'eot', 'epi', 'era', 'erg', 'erh', 'eri', 'erk', 'ero', 'err', 'ers', 'ert', 'erw', 'ese', 'esg', 'esh', 'esi', 'esk', 'esl', 'esm', 'esn', 'eso', 'esq', 'ess', 'esu', 'esx', 'esy', 'etb', 'etc', 'eth', 'etn', 'eto', 'etr', 'ets', 'ett', 'etu', 'etx', 'etz', 'euq', 'eve', 'evh', 'evn', 'ewo', 'ext', 'eya', 'eyo', 'eza', 'eze', 'faa', 'fab', 'fad', 'faf', 'fag', 'fah', 'fai', 'faj', 'fak', 'fal', 'fam', 'fan', 'fap', 'far', 'fat', 'fau', 'fax', 'fay', 'faz', 'fbl', 'fcs', 'fer', 'ffi', 'ffm', 'fgr', 'fia', 'fie', 'fil', 'fip', 'fir', 'fit', 'fiu', 'fiw', 'fkk', 'fkv', 'fla', 'flh', 'fli', 'fll', 'fln', 'flr', 'fly', 'fmp', 'fmu', 'fnb', 'fng', 'fni', 'fod', 'foi', 'fom', 'fon', 'for', 'fos', 'fox', 'fpe', 'fqs', 'frc', 'frd', 'frk', 'frm', 'fro', 'frp', 'frq', 'frr', 'frs', 'frt', 'fse', 'fsl', 'fss', 'fub', 'fuc', 'fud', 'fue', 'fuf', 'fuh', 'fui', 'fuj', 'fum', 'fun', 'fuq', 'fur', 'fut', 'fuu', 'fuv', 'fuy', 'fvr', 'fwa', 'fwe', 'gaa', 'gab', 'gac', 'gad', 'gae', 'gaf', 'gag', 'gah', 'gai', 'gaj', 'gak', 'gal', 'gam', 'gan', 'gao', 'gap', 'gaq', 'gar', 'gas', 'gat', 'gau', 'gav', 'gaw', 'gax', 'gay', 'gaz', 'gba', 'gbb', 'gbc', 'gbd', 'gbe', 'gbf', 'gbg', 'gbh', 'gbi', 'gbj', 'gbk', 'gbl', 'gbm', 'gbn', 'gbo', 'gbp', 'gbq', 'gbr', 'gbs', 'gbu', 'gbv', 'gbw', 'gbx', 'gby', 'gbz', 'gcc', 'gcd', 'gce', 'gcf', 'gcl', 'gcn', 'gcr', 'gct', 'gda', 'gdb', 'gdc', 'gdd', 'gde', 'gdf', 'gdg', 'gdh', 'gdi', 'gdj', 'gdk', 'gdl', 'gdm', 'gdn', 'gdo', 'gdq', 'gdr', 'gds', 'gdt', 'gdu', 'gdx', 'gea', 'geb', 'gec', 'ged', 'geg', 'geh', 'gei', 'gej', 'gek', 'gel', 'gem', 'geq', 'ges', 'gev', 'gew', 'gex', 'gey', 'gez', 'gfk', 'gft', 'gfx', 'gga', 'ggb', 'ggd', 'gge', 'ggg', 'ggk', 'ggl', 'ggn', 'ggo', 'ggr', 'ggt', 'ggu', 'ggw', 'gha', 'ghc', 'ghe', 'ghh', 'ghk', 'ghl', 'ghn', 'gho', 'ghr', 'ghs', 'ght', 'gia', 'gib', 'gic', 'gid', 'gie', 'gig', 'gih', 'gil', 'gim', 'gin', 'gio', 'gip', 'giq', 'gir', 'gis', 'git', 'giu', 'giw', 'gix', 'giy', 'giz', 'gji', 'gjk', 'gjm', 'gjn', 'gjr', 'gju', 'gka', 'gkd', 'gke', 'gkn', 'gko', 'gkp', 'gku', 'glc', 'gld', 'glh', 'gli', 'glj', 'glk', 'gll', 'glo', 'glr', 'glu', 'glw', 'gly', 'gma', 'gmb', 'gmd', 'gme', 'gmg', 'gmh', 'gml', 'gmm', 'gmn', 'gmq', 'gmu', 'gmv', 'gmw', 'gmx', 'gmy', 'gmz', 'gna', 'gnb', 'gnc', 'gnd', 'gne', 'gng', 'gnh', 'gni', 'gnj', 'gnk', 'gnl', 'gnm', 'gnn', 'gno', 'gnq', 'gnr', 'gnt', 'gnu', 'gnw', 'gnz', 'goa', 'gob', 'goc', 'god', 'goe', 'gof', 'gog', 'goh', 'goi', 'goj', 'gok', 'gol', 'gom', 'gon', 'goo', 'gop', 'goq', 'gor', 'gos', 'got', 'gou', 'gow', 'gox', 'goy', 'goz', 'gpa', 'gpe', 'gpn', 'gqa', 'gqi', 'gqn', 'gqr', 'gqu', 'gra', 'grb', 'grc', 'grd', 'grg', 'grh', 'gri', 'grj', 'grk', 'grm', 'gro', 'grq', 'grr', 'grs', 'grt', 'gru', 'grv', 'grw', 'grx', 'gry', 'grz', 'gse', 'gsg', 'gsl', 'gsm', 'gsn', 'gso', 'gsp', 'gss', 'gsw', 'gta', 'gti', 'gtu', 'gua', 'gub', 'guc', 'gud', 'gue', 'guf', 'gug', 'guh', 'gui', 'guk', 'gul', 'gum', 'gun', 'guo', 'gup', 'guq', 'gur', 'gus', 'gut', 'guu', 'guv', 'guw', 'gux', 'guz', 'gva', 'gvc', 'gve', 'gvf', 'gvj', 'gvl', 'gvm', 'gvn', 'gvo', 'gvp', 'gvr', 'gvs', 'gvy', 'gwa', 'gwb', 'gwc', 'gwd', 'gwe', 'gwf', 'gwg', 'gwi', 'gwj', 'gwm', 'gwn', 'gwr', 'gwt', 'gwu', 'gww', 'gwx', 'gxx', 'gya', 'gyb', 'gyd', 'gye', 'gyf', 'gyg', 'gyi', 'gyl', 'gym', 'gyn', 'gyo', 'gyr', 'gyy', 'gza', 'gzi', 'gzn', 'haa', 'hab', 'hac', 'had', 'hae', 'haf', 'hag', 'hah', 'hai', 'haj', 'hak', 'hal', 'ham', 'han', 'hao', 'hap', 'haq', 'har', 'has', 'hav', 'haw', 'hax', 'hay', 'haz', 'hba', 'hbb', 'hbn', 'hbo', 'hbu', 'hca', 'hch', 'hdn', 'hds', 'hdy', 'hea', 'hed', 'heg', 'heh', 'hei', 'hem', 'hgm', 'hgw', 'hhi', 'hhr', 'hhy', 'hia', 'hib', 'hid', 'hif', 'hig', 'hih', 'hii', 'hij', 'hik', 'hil', 'him', 'hio', 'hir', 'hit', 'hiw', 'hix', 'hji', 'hka', 'hke', 'hkk', 'hkn', 'hks', 'hla', 'hlb', 'hld', 'hle', 'hlt', 'hlu', 'hma', 'hmb', 'hmc', 'hmd', 'hme', 'hmf', 'hmg', 'hmh', 'hmi', 'hmj', 'hmk', 'hml', 'hmm', 'hmn', 'hmp', 'hmq', 'hmr', 'hms', 'hmt', 'hmu', 'hmv', 'hmw', 'hmx', 'hmy', 'hmz', 'hna', 'hnd', 'hne', 'hnh', 'hni', 'hnj', 'hnn', 'hno', 'hns', 'hnu', 'hoa', 'hob', 'hoc', 'hod', 'hoe', 'hoh', 'hoi', 'hoj', 'hok', 'hol', 'hom', 'hoo', 'hop', 'hor', 'hos', 'hot', 'hov', 'how', 'hoy', 'hoz', 'hpo', 'hps', 'hra', 'hrc', 'hre', 'hrk', 'hrm', 'hro', 'hrp', 'hrr', 'hrt', 'hru', 'hrw', 'hrx', 'hrz', 'hsb', 'hsh', 'hsl', 'hsn', 'hss', 'hti', 'hto', 'hts', 'htu', 'htx', 'hub', 'huc', 'hud', 'hue', 'huf', 'hug', 'huh', 'hui', 'huj', 'huk', 'hul', 'hum', 'huo', 'hup', 'huq', 'hur', 'hus', 'hut', 'huu', 'huv', 'huw', 'hux', 'huy', 'huz', 'hvc', 'hve', 'hvk', 'hvn', 'hvv', 'hwa', 'hwc', 'hwo', 'hya', 'hyw', 'hyx', 'iai', 'ian', 'iap', 'iar', 'iba', 'ibb', 'ibd', 'ibe', 'ibg', 'ibh', 'ibi', 'ibl', 'ibm', 'ibn', 'ibr', 'ibu', 'iby', 'ica', 'ich', 'icl', 'icr', 'ida', 'idb', 'idc', 'idd', 'ide', 'idi', 'idr', 'ids', 'idt', 'idu', 'ifa', 'ifb', 'ife', 'iff', 'ifk', 'ifm', 'ifu', 'ify', 'igb', 'ige', 'igg', 'igl', 'igm', 'ign', 'igo', 'igs', 'igw', 'ihb', 'ihi', 'ihp', 'ihw', 'iin', 'iir', 'ijc', 'ije', 'ijj', 'ijn', 'ijo', 'ijs', 'ike', 'iki', 'ikk', 'ikl', 'iko', 'ikp', 'ikr', 'iks', 'ikt', 'ikv', 'ikw', 'ikx', 'ikz', 'ila', 'ilb', 'ilg', 'ili', 'ilk', 'ill', 'ilm', 'ilo', 'ilp', 'ils', 'ilu', 'ilv', 'ilw', 'ima', 'ime', 'imi', 'iml', 'imn', 'imo', 'imr', 'ims', 'imy', 'inb', 'inc', 'ine', 'ing', 'inh', 'inj', 'inl', 'inm', 'inn', 'ino', 'inp', 'ins', 'int', 'inz', 'ior', 'iou', 'iow', 'ipi', 'ipo', 'iqu', 'iqw', 'ira', 'ire', 'irh', 'iri', 'irk', 'irn', 'iro', 'irr', 'iru', 'irx', 'iry', 'isa', 'isc', 'isd', 'ise', 'isg', 'ish', 'isi', 'isk', 'ism', 'isn', 'iso', 'isr', 'ist', 'isu', 'itb', 'itc', 'itd', 'ite', 'iti', 'itk', 'itl', 'itm', 'ito', 'itr', 'its', 'itt', 'itv', 'itw', 'itx', 'ity', 'itz', 'ium', 'ivb', 'ivv', 'iwk', 'iwm', 'iwo', 'iws', 'ixc', 'ixl', 'iya', 'iyo', 'iyx', 'izh', 'izi', 'izr', 'izz', 'jaa', 'jab', 'jac', 'jad', 'jae', 'jaf', 'jah', 'jaj', 'jak', 'jal', 'jam', 'jan', 'jao', 'jaq', 'jar', 'jas', 'jat', 'jau', 'jax', 'jay', 'jaz', 'jbe', 'jbi', 'jbj', 'jbk', 'jbn', 'jbo', 'jbr', 'jbt', 'jbu', 'jbw', 'jcs', 'jct', 'jda', 'jdg', 'jdt', 'jeb', 'jee', 'jeg', 'jeh', 'jei', 'jek', 'jel', 'jen', 'jer', 'jet', 'jeu', 'jgb', 'jge', 'jgk', 'jgo', 'jhi', 'jhs', 'jia', 'jib', 'jic', 'jid', 'jie', 'jig', 'jih', 'jii', 'jil', 'jim', 'jio', 'jiq', 'jit', 'jiu', 'jiv', 'jiy', 'jje', 'jjr', 'jka', 'jkm', 'jko', 'jkp', 'jkr', 'jku', 'jle', 'jls', 'jma', 'jmb', 'jmc', 'jmd', 'jmi', 'jml', 'jmn', 'jmr', 'jms', 'jmw', 'jmx', 'jna', 'jnd', 'jng', 'jni', 'jnj', 'jnl', 'jns', 'job', 'jod', 'jog', 'jor', 'jos', 'jow', 'jpa', 'jpr', 'jpx', 'jqr', 'jra', 'jrb', 'jrr', 'jrt', 'jru', 'jsl', 'jua', 'jub', 'juc', 'jud', 'juh', 'jui', 'juk', 'jul', 'jum', 'jun', 'juo', 'jup', 'jur', 'jus', 'jut', 'juu', 'juw', 'juy', 'jvd', 'jvn', 'jwi', 'jya', 'jye', 'jyy', 'kaa', 'kab', 'kac', 'kad', 'kae', 'kaf', 'kag', 'kah', 'kai', 'kaj', 'kak', 'kam', 'kao', 'kap', 'kaq', 'kar', 'kav', 'kaw', 'kax', 'kay', 'kba', 'kbb', 'kbc', 'kbd', 'kbe', 'kbf', 'kbg', 'kbh', 'kbi', 'kbj', 'kbk', 'kbl', 'kbm', 'kbn', 'kbo', 'kbp', 'kbq', 'kbr', 'kbs', 'kbt', 'kbu', 'kbv', 'kbw', 'kbx', 'kby', 'kbz', 'kca', 'kcb', 'kcc', 'kcd', 'kce', 'kcf', 'kcg', 'kch', 'kci', 'kcj', 'kck', 'kcl', 'kcm', 'kcn', 'kco', 'kcp', 'kcq', 'kcr', 'kcs', 'kct', 'kcu', 'kcv', 'kcw', 'kcx', 'kcy', 'kcz', 'kda', 'kdc', 'kdd', 'kde', 'kdf', 'kdg', 'kdh', 'kdi', 'kdj', 'kdk', 'kdl', 'kdm', 'kdn', 'kdo', 'kdp', 'kdq', 'kdr', 'kdt', 'kdu', 'kdv', 'kdw', 'kdx', 'kdy', 'kdz', 'kea', 'keb', 'kec', 'ked', 'kee', 'kef', 'keg', 'keh', 'kei', 'kej', 'kek', 'kel', 'kem', 'ken', 'keo', 'kep', 'keq', 'ker', 'kes', 'ket', 'keu', 'kev', 'kew', 'kex', 'key', 'kez', 'kfa', 'kfb', 'kfc', 'kfd', 'kfe', 'kff', 'kfg', 'kfh', 'kfi', 'kfj', 'kfk', 'kfl', 'kfm', 'kfn', 'kfo', 'kfp', 'kfq', 'kfr', 'kfs', 'kft', 'kfu', 'kfv', 'kfw', 'kfx', 'kfy', 'kfz', 'kga', 'kgb', 'kgc', 'kgd', 'kge', 'kgf', 'kgg', 'kgh', 'kgi', 'kgj', 'kgk', 'kgl', 'kgm', 'kgn', 'kgo', 'kgp', 'kgq', 'kgr', 'kgs', 'kgt', 'kgu', 'kgv', 'kgw', 'kgx', 'kgy', 'kha', 'khb', 'khc', 'khd', 'khe', 'khf', 'khg', 'khh', 'khi', 'khj', 'khk', 'khl', 'khn', 'kho', 'khp', 'khq', 'khr', 'khs', 'kht', 'khu', 'khv', 'khw', 'khx', 'khy', 'khz', 'kia', 'kib', 'kic', 'kid', 'kie', 'kif', 'kig', 'kih', 'kii', 'kij', 'kil', 'kim', 'kio', 'kip', 'kiq', 'kis', 'kit', 'kiu', 'kiv', 'kiw', 'kix', 'kiy', 'kiz', 'kja', 'kjb', 'kjc', 'kjd', 'kje', 'kjf', 'kjg', 'kjh', 'kji', 'kjj', 'kjk', 'kjl', 'kjm', 'kjn', 'kjo', 'kjp', 'kjq', 'kjr', 'kjs', 'kjt', 'kju', 'kjv', 'kjx', 'kjy', 'kjz', 'kka', 'kkb', 'kkc', 'kkd', 'kke', 'kkf', 'kkg', 'kkh', 'kki', 'kkj', 'kkk', 'kkl', 'kkm', 'kkn', 'kko', 'kkp', 'kkq', 'kkr', 'kks', 'kkt', 'kku', 'kkv', 'kkw', 'kkx', 'kky', 'kkz', 'kla', 'klb', 'klc', 'kld', 'kle', 'klf', 'klg', 'klh', 'kli', 'klj', 'klk', 'kll', 'klm', 'kln', 'klo', 'klp', 'klq', 'klr', 'kls', 'klt', 'klu', 'klv', 'klw', 'klx', 'kly', 'klz', 'kma', 'kmb', 'kmc', 'kmd', 'kme', 'kmf', 'kmg', 'kmh', 'kmi', 'kmj', 'kmk', 'kml', 'kmm', 'kmn', 'kmo', 'kmp', 'kmq', 'kmr', 'kms', 'kmt', 'kmu', 'kmv', 'kmw', 'kmx', 'kmy', 'kmz', 'kna', 'knb', 'knc', 'knd', 'kne', 'knf', 'kng', 'kni', 'knj', 'knk', 'knl', 'knm', 'knn', 'kno', 'knp', 'knq', 'knr', 'kns', 'knt', 'knu', 'knv', 'knw', 'knx', 'kny', 'knz', 'koa', 'koc', 'kod', 'koe', 'kof', 'kog', 'koh', 'koi', 'koj', 'kok', 'kol', 'koo', 'kop', 'koq', 'kos', 'kot', 'kou', 'kov', 'kow', 'kox', 'koy', 'koz', 'kpa', 'kpb', 'kpc', 'kpd', 'kpe', 'kpf', 'kpg', 'kph', 'kpi', 'kpj', 'kpk', 'kpl', 'kpm', 'kpn', 'kpo', 'kpp', 'kpq', 'kpr', 'kps', 'kpt', 'kpu', 'kpv', 'kpw', 'kpx', 'kpy', 'kpz', 'kqa', 'kqb', 'kqc', 'kqd', 'kqe', 'kqf', 'kqg', 'kqh', 'kqi', 'kqj', 'kqk', 'kql', 'kqm', 'kqn', 'kqo', 'kqp', 'kqq', 'kqr', 'kqs', 'kqt', 'kqu', 'kqv', 'kqw', 'kqx', 'kqy', 'kqz', 'kra', 'krb', 'krc', 'krd', 'kre', 'krf', 'krh', 'kri', 'krj', 'krk', 'krl', 'krm', 'krn', 'kro', 'krp', 'krr', 'krs', 'krt', 'kru', 'krv', 'krw', 'krx', 'kry', 'krz', 'ksa', 'ksb', 'ksc', 'ksd', 'kse', 'ksf', 'ksg', 'ksh', 'ksi', 'ksj', 'ksk', 'ksl', 'ksm', 'ksn', 'kso', 'ksp', 'ksq', 'ksr', 'kss', 'kst', 'ksu', 'ksv', 'ksw', 'ksx', 'ksy', 'ksz', 'kta', 'ktb', 'ktc', 'ktd', 'kte', 'ktf', 'ktg', 'kth', 'kti', 'ktj', 'ktk', 'ktl', 'ktm', 'ktn', 'kto', 'ktp', 'ktq', 'ktr', 'kts', 'ktt', 'ktu', 'ktv', 'ktw', 'ktx', 'kty', 'ktz', 'kub', 'kuc', 'kud', 'kue', 'kuf', 'kug', 'kuh', 'kui', 'kuj', 'kuk', 'kul', 'kum', 'kun', 'kuo', 'kup', 'kuq', 'kus', 'kut', 'kuu', 'kuv', 'kuw', 'kux', 'kuy', 'kuz', 'kva', 'kvb', 'kvc', 'kvd', 'kve', 'kvf', 'kvg', 'kvh', 'kvi', 'kvj', 'kvk', 'kvl', 'kvm', 'kvn', 'kvo', 'kvp', 'kvq', 'kvr', 'kvs', 'kvt', 'kvu', 'kvv', 'kvw', 'kvx', 'kvy', 'kvz', 'kwa', 'kwb', 'kwc', 'kwd', 'kwe', 'kwf', 'kwg', 'kwh', 'kwi', 'kwj', 'kwk', 'kwl', 'kwm', 'kwn', 'kwo', 'kwp', 'kwq', 'kwr', 'kws', 'kwt', 'kwu', 'kwv', 'kww', 'kwx', 'kwy', 'kwz', 'kxa', 'kxb', 'kxc', 'kxd', 'kxe', 'kxf', 'kxh', 'kxi', 'kxj', 'kxk', 'kxl', 'kxm', 'kxn', 'kxo', 'kxp', 'kxq', 'kxr', 'kxs', 'kxt', 'kxu', 'kxv', 'kxw', 'kxx', 'kxy', 'kxz', 'kya', 'kyb', 'kyc', 'kyd', 'kye', 'kyf', 'kyg', 'kyh', 'kyi', 'kyj', 'kyk', 'kyl', 'kym', 'kyn', 'kyo', 'kyp', 'kyq', 'kyr', 'kys', 'kyt', 'kyu', 'kyv', 'kyw', 'kyx', 'kyy', 'kyz', 'kza', 'kzb', 'kzc', 'kzd', 'kze', 'kzf', 'kzg', 'kzh', 'kzi', 'kzj', 'kzk', 'kzl', 'kzm', 'kzn', 'kzo', 'kzp', 'kzq', 'kzr', 'kzs', 'kzt', 'kzu', 'kzv', 'kzw', 'kzx', 'kzy', 'kzz', 'laa', 'lab', 'lac', 'lad', 'lae', 'laf', 'lag', 'lah', 'lai', 'laj', 'lak', 'lal', 'lam', 'lan', 'lap', 'laq', 'lar', 'las', 'lau', 'law', 'lax', 'lay', 'laz', 'lba', 'lbb', 'lbc', 'lbe', 'lbf', 'lbg', 'lbi', 'lbj', 'lbk', 'lbl', 'lbm', 'lbn', 'lbo', 'lbq', 'lbr', 'lbs', 'lbt', 'lbu', 'lbv', 'lbw', 'lbx', 'lby', 'lbz', 'lcc', 'lcd', 'lce', 'lcf', 'lch', 'lcl', 'lcm', 'lcp', 'lcq', 'lcs', 'lda', 'ldb', 'ldd', 'ldg', 'ldh', 'ldi', 'ldj', 'ldk', 'ldl', 'ldm', 'ldn', 'ldo', 'ldp', 'ldq', 'lea', 'leb', 'lec', 'led', 'lee', 'lef', 'leg', 'leh', 'lei', 'lej', 'lek', 'lel', 'lem', 'len', 'leo', 'lep', 'leq', 'ler', 'les', 'let', 'leu', 'lev', 'lew', 'lex', 'ley', 'lez', 'lfa', 'lfn', 'lga', 'lgb', 'lgg', 'lgh', 'lgi', 'lgk', 'lgl', 'lgm', 'lgn', 'lgq', 'lgr', 'lgt', 'lgu', 'lgz', 'lha', 'lhh', 'lhi', 'lhl', 'lhm', 'lhn', 'lhp', 'lhs', 'lht', 'lhu', 'lia', 'lib', 'lic', 'lid', 'lie', 'lif', 'lig', 'lih', 'lii', 'lij', 'lik', 'lil', 'lio', 'lip', 'liq', 'lir', 'lis', 'liu', 'liv', 'liw', 'lix', 'liy', 'liz', 'lja', 'lje', 'lji', 'ljl', 'ljp', 'ljw', 'ljx', 'lka', 'lkb', 'lkc', 'lkd', 'lke', 'lkh', 'lki', 'lkj', 'lkl', 'lkm', 'lkn', 'lko', 'lkr', 'lks', 'lkt', 'lku', 'lky', 'lla', 'llb', 'llc', 'lld', 'lle', 'llf', 'llg', 'llh', 'lli', 'llj', 'llk', 'lll', 'llm', 'lln', 'llo', 'llp', 'llq', 'lls', 'llu', 'llx', 'lma', 'lmb', 'lmc', 'lmd', 'lme', 'lmf', 'lmg', 'lmh', 'lmi', 'lmj', 'lmk', 'lml', 'lmm', 'lmn', 'lmo', 'lmp', 'lmq', 'lmr', 'lmu', 'lmv', 'lmw', 'lmx', 'lmy', 'lmz', 'lna', 'lnb', 'lnd', 'lng', 'lnh', 'lni', 'lnj', 'lnl', 'lnm', 'lnn', 'lno', 'lns', 'lnu', 'lnw', 'lnz', 'loa', 'lob', 'loc', 'loe', 'lof', 'log', 'loh', 'loi', 'loj', 'lok', 'lol', 'lom', 'lon', 'loo', 'lop', 'loq', 'lor', 'los', 'lot', 'lou', 'lov', 'low', 'lox', 'loy', 'loz', 'lpa', 'lpe', 'lpn', 'lpo', 'lpx', 'lra', 'lrc', 'lre', 'lrg', 'lri', 'lrk', 'lrl', 'lrm', 'lrn', 'lro', 'lrr', 'lrt', 'lrv', 'lrz', 'lsa', 'lsd', 'lse', 'lsg', 'lsh', 'lsi', 'lsl', 'lsm', 'lso', 'lsp', 'lsr', 'lss', 'lst', 'lsy', 'ltc', 'ltg', 'lth', 'lti', 'ltn', 'lto', 'lts', 'ltu', 'lua', 'luc', 'lud', 'lue', 'luf', 'lui', 'luj', 'luk', 'lul', 'lum', 'lun', 'luo', 'lup', 'luq', 'lur', 'lus', 'lut', 'luu', 'luv', 'luw', 'luy', 'luz', 'lva', 'lvk', 'lvs', 'lvu', 'lwa', 'lwe', 'lwg', 'lwh', 'lwl', 'lwm', 'lwo', 'lws', 'lwt', 'lwu', 'lww', 'lya', 'lyg', 'lyn', 'lzh', 'lzl', 'lzn', 'lzz', 'maa', 'mab', 'mad', 'mae', 'maf', 'mag', 'mai', 'maj', 'mak', 'mam', 'man', 'map', 'maq', 'mas', 'mat', 'mau', 'mav', 'maw', 'max', 'maz', 'mba', 'mbb', 'mbc', 'mbd', 'mbe', 'mbf', 'mbh', 'mbi', 'mbj', 'mbk', 'mbl', 'mbm', 'mbn', 'mbo', 'mbp', 'mbq', 'mbr', 'mbs', 'mbt', 'mbu', 'mbv', 'mbw', 'mbx', 'mby', 'mbz', 'mca', 'mcb', 'mcc', 'mcd', 'mce', 'mcf', 'mcg', 'mch', 'mci', 'mcj', 'mck', 'mcl', 'mcm', 'mcn', 'mco', 'mcp', 'mcq', 'mcr', 'mcs', 'mct', 'mcu', 'mcv', 'mcw', 'mcx', 'mcy', 'mcz', 'mda', 'mdb', 'mdc', 'mdd', 'mde', 'mdf', 'mdg', 'mdh', 'mdi', 'mdj', 'mdk', 'mdl', 'mdm', 'mdn', 'mdp', 'mdq', 'mdr', 'mds', 'mdt', 'mdu', 'mdv', 'mdw', 'mdx', 'mdy', 'mdz', 'mea', 'meb', 'mec', 'med', 'mee', 'mef', 'meg', 'meh', 'mei', 'mej', 'mek', 'mel', 'mem', 'men', 'meo', 'mep', 'meq', 'mer', 'mes', 'met', 'meu', 'mev', 'mew', 'mey', 'mez', 'mfa', 'mfb', 'mfc', 'mfd', 'mfe', 'mff', 'mfg', 'mfh', 'mfi', 'mfj', 'mfk', 'mfl', 'mfm', 'mfn', 'mfo', 'mfp', 'mfq', 'mfr', 'mfs', 'mft', 'mfu', 'mfv', 'mfw', 'mfx', 'mfy', 'mfz', 'mga', 'mgb', 'mgc', 'mgd', 'mge', 'mgf', 'mgg', 'mgh', 'mgi', 'mgj', 'mgk', 'mgl', 'mgm', 'mgn', 'mgo', 'mgp', 'mgq', 'mgr', 'mgs', 'mgt', 'mgu', 'mgv', 'mgw', 'mgx', 'mgy', 'mgz', 'mha', 'mhb', 'mhc', 'mhd', 'mhe', 'mhf', 'mhg', 'mhh', 'mhi', 'mhj', 'mhk', 'mhl', 'mhm', 'mhn', 'mho', 'mhp', 'mhq', 'mhr', 'mhs', 'mht', 'mhu', 'mhw', 'mhx', 'mhy', 'mhz', 'mia', 'mib', 'mic', 'mid', 'mie', 'mif', 'mig', 'mih', 'mii', 'mij', 'mik', 'mil', 'mim', 'min', 'mio', 'mip', 'miq', 'mir', 'mis', 'mit', 'miu', 'miw', 'mix', 'miy', 'miz', 'mja', 'mjb', 'mjc', 'mjd', 'mje', 'mjg', 'mjh', 'mji', 'mjj', 'mjk', 'mjl', 'mjm', 'mjn', 'mjo', 'mjp', 'mjq', 'mjr', 'mjs', 'mjt', 'mju', 'mjv', 'mjw', 'mjx', 'mjy', 'mjz', 'mka', 'mkb', 'mkc', 'mke', 'mkf', 'mkg', 'mkh', 'mki', 'mkj', 'mkk', 'mkl', 'mkm', 'mkn', 'mko', 'mkp', 'mkq', 'mkr', 'mks', 'mkt', 'mku', 'mkv', 'mkw', 'mkx', 'mky', 'mkz', 'mla', 'mlb', 'mlc', 'mld', 'mle', 'mlf', 'mlh', 'mli', 'mlj', 'mlk', 'mll', 'mlm', 'mln', 'mlo', 'mlp', 'mlq', 'mlr', 'mls', 'mlu', 'mlv', 'mlw', 'mlx', 'mlz', 'mma', 'mmb', 'mmc', 'mmd', 'mme', 'mmf', 'mmg', 'mmh', 'mmi', 'mmj', 'mmk', 'mml', 'mmm', 'mmn', 'mmo', 'mmp', 'mmq', 'mmr', 'mmt', 'mmu', 'mmv', 'mmw', 'mmx', 'mmy', 'mmz', 'mna', 'mnb', 'mnc', 'mnd', 'mne', 'mnf', 'mng', 'mnh', 'mni', 'mnj', 'mnk', 'mnl', 'mnm', 'mnn', 'mno', 'mnp', 'mnq', 'mnr', 'mns', 'mnt', 'mnu', 'mnv', 'mnw', 'mnx', 'mny', 'mnz', 'moa', 'moc', 'mod', 'moe', 'mof', 'mog', 'moh', 'moi', 'moj', 'mok', 'mom', 'moo', 'mop', 'moq', 'mor', 'mos', 'mot', 'mou', 'mov', 'mow', 'mox', 'moy', 'moz', 'mpa', 'mpb', 'mpc', 'mpd', 'mpe', 'mpg', 'mph', 'mpi', 'mpj', 'mpk', 'mpl', 'mpm', 'mpn', 'mpo', 'mpp', 'mpq', 'mpr', 'mps', 'mpt', 'mpu', 'mpv', 'mpw', 'mpx', 'mpy', 'mpz', 'mqa', 'mqb', 'mqc', 'mqe', 'mqf', 'mqg', 'mqh', 'mqi', 'mqj', 'mqk', 'mql', 'mqm', 'mqn', 'mqo', 'mqp', 'mqq', 'mqr', 'mqs', 'mqt', 'mqu', 'mqv', 'mqw', 'mqx', 'mqy', 'mqz', 'mra', 'mrb', 'mrc', 'mrd', 'mre', 'mrf', 'mrg', 'mrh', 'mrj', 'mrk', 'mrl', 'mrm', 'mrn', 'mro', 'mrp', 'mrq', 'mrr', 'mrs', 'mrt', 'mru', 'mrv', 'mrw', 'mrx', 'mry', 'mrz', 'msb', 'msc', 'msd', 'mse', 'msf', 'msg', 'msh', 'msi', 'msj', 'msk', 'msl', 'msm', 'msn', 'mso', 'msp', 'msq', 'msr', 'mss', 'mst', 'msu', 'msv', 'msw', 'msx', 'msy', 'msz', 'mta', 'mtb', 'mtc', 'mtd', 'mte', 'mtf', 'mtg', 'mth', 'mti', 'mtj', 'mtk', 'mtl', 'mtm', 'mtn', 'mto', 'mtp', 'mtq', 'mtr', 'mts', 'mtt', 'mtu', 'mtv', 'mtw', 'mtx', 'mty', 'mua', 'mub', 'muc', 'mud', 'mue', 'mug', 'muh', 'mui', 'muj', 'muk', 'mul', 'mum', 'mun', 'muo', 'mup', 'muq', 'mur', 'mus', 'mut', 'muu', 'muv', 'mux', 'muy', 'muz', 'mva', 'mvb', 'mvd', 'mve', 'mvf', 'mvg', 'mvh', 'mvi', 'mvk', 'mvl', 'mvm', 'mvn', 'mvo', 'mvp', 'mvq', 'mvr', 'mvs', 'mvt', 'mvu', 'mvv', 'mvw', 'mvx', 'mvy', 'mvz', 'mwa', 'mwb', 'mwc', 'mwd', 'mwe', 'mwf', 'mwg', 'mwh', 'mwi', 'mwj', 'mwk', 'mwl', 'mwm', 'mwn', 'mwo', 'mwp', 'mwq', 'mwr', 'mws', 'mwt', 'mwu', 'mwv', 'mww', 'mwx', 'mwy', 'mwz', 'mxa', 'mxb', 'mxc', 'mxd', 'mxe', 'mxf', 'mxg', 'mxh', 'mxi', 'mxj', 'mxk', 'mxl', 'mxm', 'mxn', 'mxo', 'mxp', 'mxq', 'mxr', 'mxs', 'mxt', 'mxu', 'mxv', 'mxw', 'mxx', 'mxy', 'mxz', 'myb', 'myc', 'myd', 'mye', 'myf', 'myg', 'myh', 'myi', 'myj', 'myk', 'myl', 'mym', 'myn', 'myo', 'myp', 'myq', 'myr', 'mys', 'myt', 'myu', 'myv', 'myw', 'myx', 'myy', 'myz', 'mza', 'mzb', 'mzc', 'mzd', 'mze', 'mzg', 'mzh', 'mzi', 'mzj', 'mzk', 'mzl', 'mzm', 'mzn', 'mzo', 'mzp', 'mzq', 'mzr', 'mzs', 'mzt', 'mzu', 'mzv', 'mzw', 'mzx', 'mzy', 'mzz', 'naa', 'nab', 'nac', 'nad', 'nae', 'naf', 'nag', 'nah', 'nai', 'naj', 'nak', 'nal', 'nam', 'nan', 'nao', 'nap', 'naq', 'nar', 'nas', 'nat', 'naw', 'nax', 'nay', 'naz', 'nba', 'nbb', 'nbc', 'nbd', 'nbe', 'nbf', 'nbg', 'nbh', 'nbi', 'nbj', 'nbk', 'nbm', 'nbn', 'nbo', 'nbp', 'nbq', 'nbr', 'nbs', 'nbt', 'nbu', 'nbv', 'nbw', 'nbx', 'nby', 'nca', 'ncb', 'ncc', 'ncd', 'nce', 'ncf', 'ncg', 'nch', 'nci', 'ncj', 'nck', 'ncl', 'ncm', 'ncn', 'nco', 'ncp', 'ncq', 'ncr', 'ncs', 'nct', 'ncu', 'ncx', 'ncz', 'nda', 'ndb', 'ndc', 'ndd', 'ndf', 'ndg', 'ndh', 'ndi', 'ndj', 'ndk', 'ndl', 'ndm', 'ndn', 'ndp', 'ndq', 'ndr', 'nds', 'ndt', 'ndu', 'ndv', 'ndw', 'ndx', 'ndy', 'ndz', 'nea', 'neb', 'nec', 'ned', 'nee', 'nef', 'neg', 'neh', 'nei', 'nej', 'nek', 'nem', 'nen', 'neo', 'neq', 'ner', 'nes', 'net', 'neu', 'nev', 'new', 'nex', 'ney', 'nez', 'nfa', 'nfd', 'nfl', 'nfr', 'nfu', 'nga', 'ngb', 'ngc', 'ngd', 'nge', 'ngf', 'ngg', 'ngh', 'ngi', 'ngj', 'ngk', 'ngl', 'ngm', 'ngn', 'ngo', 'ngp', 'ngq', 'ngr', 'ngs', 'ngt', 'ngu', 'ngv', 'ngw', 'ngx', 'ngy', 'ngz', 'nha', 'nhb', 'nhc', 'nhd', 'nhe', 'nhf', 'nhg', 'nhh', 'nhi', 'nhk', 'nhm', 'nhn', 'nho', 'nhp', 'nhq', 'nhr', 'nht', 'nhu', 'nhv', 'nhw', 'nhx', 'nhy', 'nhz', 'nia', 'nib', 'nic', 'nid', 'nie', 'nif', 'nig', 'nih', 'nii', 'nij', 'nik', 'nil', 'nim', 'nin', 'nio', 'niq', 'nir', 'nis', 'nit', 'niu', 'niv', 'niw', 'nix', 'niy', 'niz', 'nja', 'njb', 'njd', 'njh', 'nji', 'njj', 'njl', 'njm', 'njn', 'njo', 'njr', 'njs', 'njt', 'nju', 'njx', 'njy', 'njz', 'nka', 'nkb', 'nkc', 'nkd', 'nke', 'nkf', 'nkg', 'nkh', 'nki', 'nkj', 'nkk', 'nkm', 'nkn', 'nko', 'nkp', 'nkq', 'nkr', 'nks', 'nkt', 'nku', 'nkv', 'nkw', 'nkx', 'nkz', 'nla', 'nlc', 'nle', 'nlg', 'nli', 'nlj', 'nlk', 'nll', 'nlm', 'nln', 'nlo', 'nlq', 'nlr', 'nlu', 'nlv', 'nlw', 'nlx', 'nly', 'nlz', 'nma', 'nmb', 'nmc', 'nmd', 'nme', 'nmf', 'nmg', 'nmh', 'nmi', 'nmj', 'nmk', 'nml', 'nmm', 'nmn', 'nmo', 'nmp', 'nmq', 'nmr', 'nms', 'nmt', 'nmu', 'nmv', 'nmw', 'nmx', 'nmy', 'nmz', 'nna', 'nnb', 'nnc', 'nnd', 'nne', 'nnf', 'nng', 'nnh', 'nni', 'nnj', 'nnk', 'nnl', 'nnm', 'nnn', 'nnp', 'nnq', 'nnr', 'nns', 'nnt', 'nnu', 'nnv', 'nnw', 'nnx', 'nny', 'nnz', 'noa', 'noc', 'nod', 'noe', 'nof', 'nog', 'noh', 'noi', 'noj', 'nok', 'nol', 'nom', 'non', 'noo', 'nop', 'noq', 'nos', 'not', 'nou', 'nov', 'now', 'noy', 'noz', 'npa', 'npb', 'npg', 'nph', 'npi', 'npl', 'npn', 'npo', 'nps', 'npu', 'npx', 'npy', 'nqg', 'nqk', 'nql', 'nqm', 'nqn', 'nqo', 'nqq', 'nqy', 'nra', 'nrb', 'nrc', 'nre', 'nrf', 'nrg', 'nri', 'nrk', 'nrl', 'nrm', 'nrn', 'nrp', 'nrr', 'nrt', 'nru', 'nrx', 'nrz', 'nsa', 'nsc', 'nsd', 'nse', 'nsf', 'nsg', 'nsh', 'nsi', 'nsk', 'nsl', 'nsm', 'nsn', 'nso', 'nsp', 'nsq', 'nsr', 'nss', 'nst', 'nsu', 'nsv', 'nsw', 'nsx', 'nsy', 'nsz', 'ntd', 'nte', 'ntg', 'nti', 'ntj', 'ntk', 'ntm', 'nto', 'ntp', 'ntr', 'nts', 'ntu', 'ntw', 'ntx', 'nty', 'ntz', 'nua', 'nub', 'nuc', 'nud', 'nue', 'nuf', 'nug', 'nuh', 'nui', 'nuj', 'nuk', 'nul', 'num', 'nun', 'nuo', 'nup', 'nuq', 'nur', 'nus', 'nut', 'nuu', 'nuv', 'nuw', 'nux', 'nuy', 'nuz', 'nvh', 'nvm', 'nvo', 'nwa', 'nwb', 'nwc', 'nwe', 'nwg', 'nwi', 'nwm', 'nwo', 'nwr', 'nwx', 'nwy', 'nxa', 'nxd', 'nxe', 'nxg', 'nxi', 'nxk', 'nxl', 'nxm', 'nxn', 'nxo', 'nxq', 'nxr', 'nxu', 'nxx', 'nyb', 'nyc', 'nyd', 'nye', 'nyf', 'nyg', 'nyh', 'nyi', 'nyj', 'nyk', 'nyl', 'nym', 'nyn', 'nyo', 'nyp', 'nyq', 'nyr', 'nys', 'nyt', 'nyu', 'nyv', 'nyw', 'nyx', 'nyy', 'nza', 'nzb', 'nzd', 'nzi', 'nzk', 'nzm', 'nzs', 'nzu', 'nzy', 'nzz', 'oaa', 'oac', 'oar', 'oav', 'obi', 'obk', 'obl', 'obm', 'obo', 'obr', 'obt', 'obu', 'oca', 'och', 'oco', 'ocu', 'oda', 'odk', 'odt', 'odu', 'ofo', 'ofs', 'ofu', 'ogb', 'ogc', 'oge', 'ogg', 'ogo', 'ogu', 'oht', 'ohu', 'oia', 'oin', 'ojb', 'ojc', 'ojg', 'ojp', 'ojs', 'ojv', 'ojw', 'oka', 'okb', 'okd', 'oke', 'okg', 'okh', 'oki', 'okj', 'okk', 'okl', 'okm', 'okn', 'oko', 'okr', 'oks', 'oku', 'okv', 'okx', 'ola', 'old', 'ole', 'olk', 'olm', 'olo', 'olr', 'olt', 'olu', 'oma', 'omb', 'omc', 'ome', 'omg', 'omi', 'omk', 'oml', 'omn', 'omo', 'omp', 'omq', 'omr', 'omt', 'omu', 'omv', 'omw', 'omx', 'ona', 'onb', 'one', 'ong', 'oni', 'onj', 'onk', 'onn', 'ono', 'onp', 'onr', 'ons', 'ont', 'onu', 'onw', 'onx', 'ood', 'oog', 'oon', 'oor', 'oos', 'opa', 'opk', 'opm', 'opo', 'opt', 'opy', 'ora', 'orc', 'ore', 'org', 'orh', 'orn', 'oro', 'orr', 'ors', 'ort', 'oru', 'orv', 'orw', 'orx', 'ory', 'orz', 'osa', 'osc', 'osi', 'oso', 'osp', 'ost', 'osu', 'osx', 'ota', 'otb', 'otd', 'ote', 'oti', 'otk', 'otl', 'otm', 'otn', 'oto', 'otq', 'otr', 'ots', 'ott', 'otu', 'otw', 'otx', 'oty', 'otz', 'oua', 'oub', 'oue', 'oui', 'oum', 'oun', 'ovd', 'owi', 'owl', 'oyb', 'oyd', 'oym', 'oyy', 'ozm', 'paa', 'pab', 'pac', 'pad', 'pae', 'paf', 'pag', 'pah', 'pai', 'pak', 'pal', 'pam', 'pao', 'pap', 'paq', 'par', 'pas', 'pat', 'pau', 'pav', 'paw', 'pax', 'pay', 'paz', 'pbb', 'pbc', 'pbe', 'pbf', 'pbg', 'pbh', 'pbi', 'pbl', 'pbm', 'pbn', 'pbo', 'pbp', 'pbr', 'pbs', 'pbt', 'pbu', 'pbv', 'pby', 'pbz', 'pca', 'pcb', 'pcc', 'pcd', 'pce', 'pcf', 'pcg', 'pch', 'pci', 'pcj', 'pck', 'pcl', 'pcm', 'pcn', 'pcp', 'pcr', 'pcw', 'pda', 'pdc', 'pdi', 'pdn', 'pdo', 'pdt', 'pdu', 'pea', 'peb', 'ped', 'pee', 'pef', 'peg', 'peh', 'pei', 'pej', 'pek', 'pel', 'pem', 'peo', 'pep', 'peq', 'pes', 'pev', 'pex', 'pey', 'pez', 'pfa', 'pfe', 'pfl', 'pga', 'pgd', 'pgg', 'pgi', 'pgk', 'pgl', 'pgn', 'pgs', 'pgu', 'pgy', 'pgz', 'pha', 'phd', 'phg', 'phh', 'phi', 'phk', 'phl', 'phm', 'phn', 'pho', 'phq', 'phr', 'pht', 'phu', 'phv', 'phw', 'pia', 'pib', 'pic', 'pid', 'pie', 'pif', 'pig', 'pih', 'pii', 'pij', 'pil', 'pim', 'pin', 'pio', 'pip', 'pir', 'pis', 'pit', 'piu', 'piv', 'piw', 'pix', 'piy', 'piz', 'pjt', 'pka', 'pkb', 'pkc', 'pkg', 'pkh', 'pkn', 'pko', 'pkp', 'pkr', 'pks', 'pkt', 'pku', 'pla', 'plb', 'plc', 'pld', 'ple', 'plf', 'plg', 'plh', 'plj', 'plk', 'pll', 'pln', 'plo', 'plp', 'plq', 'plr', 'pls', 'plt', 'plu', 'plv', 'plw', 'ply', 'plz', 'pma', 'pmb', 'pmc', 'pmd', 'pme', 'pmf', 'pmh', 'pmi', 'pmj', 'pmk', 'pml', 'pmm', 'pmn', 'pmo', 'pmq', 'pmr', 'pms', 'pmt', 'pmu', 'pmw', 'pmx', 'pmy', 'pmz', 'pna', 'pnb', 'pnc', 'pne', 'png', 'pnh', 'pni', 'pnj', 'pnk', 'pnl', 'pnm', 'pnn', 'pno', 'pnp', 'pnq', 'pnr', 'pns', 'pnt', 'pnu', 'pnv', 'pnw', 'pnx', 'pny', 'pnz', 'poc', 'pod', 'poe', 'pof', 'pog', 'poh', 'poi', 'pok', 'pom', 'pon', 'poo', 'pop', 'poq', 'pos', 'pot', 'pov', 'pow', 'pox', 'poy', 'poz', 'ppa', 'ppe', 'ppi', 'ppk', 'ppl', 'ppm', 'ppn', 'ppo', 'ppp', 'ppq', 'ppr', 'pps', 'ppt', 'ppu', 'pqa', 'pqe', 'pqm', 'pqw', 'pra', 'prb', 'prc', 'prd', 'pre', 'prf', 'prg', 'prh', 'pri', 'prk', 'prl', 'prm', 'prn', 'pro', 'prp', 'prq', 'prr', 'prs', 'prt', 'pru', 'prw', 'prx', 'pry', 'prz', 'psa', 'psc', 'psd', 'pse', 'psg', 'psh', 'psi', 'psl', 'psm', 'psn', 'pso', 'psp', 'psq', 'psr', 'pss', 'pst', 'psu', 'psw', 'psy', 'pta', 'pth', 'pti', 'ptn', 'pto', 'ptp', 'ptq', 'ptr', 'ptt', 'ptu', 'ptv', 'ptw', 'pty', 'pua', 'pub', 'puc', 'pud', 'pue', 'puf', 'pug', 'pui', 'puj', 'puk', 'pum', 'puo', 'pup', 'puq', 'pur', 'put', 'puu', 'puw', 'pux', 'puy', 'puz', 'pwa', 'pwb', 'pwg', 'pwi', 'pwm', 'pwn', 'pwo', 'pwr', 'pww', 'pxm', 'pye', 'pym', 'pyn', 'pys', 'pyu', 'pyx', 'pyy', 'pzn', 'qaa..qtz', 'qua', 'qub', 'quc', 'qud', 'quf', 'qug', 'quh', 'qui', 'quk', 'qul', 'qum', 'qun', 'qup', 'quq', 'qur', 'qus', 'quv', 'quw', 'qux', 'quy', 'quz', 'qva', 'qvc', 'qve', 'qvh', 'qvi', 'qvj', 'qvl', 'qvm', 'qvn', 'qvo', 'qvp', 'qvs', 'qvw', 'qvy', 'qvz', 'qwa', 'qwc', 'qwe', 'qwh', 'qwm', 'qws', 'qwt', 'qxa', 'qxc', 'qxh', 'qxl', 'qxn', 'qxo', 'qxp', 'qxq', 'qxr', 'qxs', 'qxt', 'qxu', 'qxw', 'qya', 'qyp', 'raa', 'rab', 'rac', 'rad', 'raf', 'rag', 'rah', 'rai', 'raj', 'rak', 'ral', 'ram', 'ran', 'rao', 'rap', 'raq', 'rar', 'ras', 'rat', 'rau', 'rav', 'raw', 'rax', 'ray', 'raz', 'rbb', 'rbk', 'rbl', 'rbp', 'rcf', 'rdb', 'rea', 'reb', 'ree', 'reg', 'rei', 'rej', 'rel', 'rem', 'ren', 'rer', 'res', 'ret', 'rey', 'rga', 'rge', 'rgk', 'rgn', 'rgr', 'rgs', 'rgu', 'rhg', 'rhp', 'ria', 'rie', 'rif', 'ril', 'rim', 'rin', 'rir', 'rit', 'riu', 'rjg', 'rji', 'rjs', 'rka', 'rkb', 'rkh', 'rki', 'rkm', 'rkt', 'rkw', 'rma', 'rmb', 'rmc', 'rmd', 'rme', 'rmf', 'rmg', 'rmh', 'rmi', 'rmk', 'rml', 'rmm', 'rmn', 'rmo', 'rmp', 'rmq', 'rmr', 'rms', 'rmt', 'rmu', 'rmv', 'rmw', 'rmx', 'rmy', 'rmz', 'rna', 'rnd', 'rng', 'rnl', 'rnn', 'rnp', 'rnr', 'rnw', 'roa', 'rob', 'roc', 'rod', 'roe', 'rof', 'rog', 'rol', 'rom', 'roo', 'rop', 'ror', 'rou', 'row', 'rpn', 'rpt', 'rri', 'rro', 'rrt', 'rsb', 'rsi', 'rsl', 'rsm', 'rtc', 'rth', 'rtm', 'rts', 'rtw', 'rub', 'ruc', 'rue', 'ruf', 'rug', 'ruh', 'rui', 'ruk', 'ruo', 'rup', 'ruq', 'rut', 'ruu', 'ruy', 'ruz', 'rwa', 'rwk', 'rwm', 'rwo', 'rwr', 'rxd', 'rxw', 'ryn', 'rys', 'ryu', 'rzh', 'saa', 'sab', 'sac', 'sad', 'sae', 'saf', 'sah', 'sai', 'saj', 'sak', 'sal', 'sam', 'sao', 'sap', 'saq', 'sar', 'sas', 'sat', 'sau', 'sav', 'saw', 'sax', 'say', 'saz', 'sba', 'sbb', 'sbc', 'sbd', 'sbe', 'sbf', 'sbg', 'sbh', 'sbi', 'sbj', 'sbk', 'sbl', 'sbm', 'sbn', 'sbo', 'sbp', 'sbq', 'sbr', 'sbs', 'sbt', 'sbu', 'sbv', 'sbw', 'sbx', 'sby', 'sbz', 'sca', 'scb', 'sce', 'scf', 'scg', 'sch', 'sci', 'sck', 'scl', 'scn', 'sco', 'scp', 'scq', 'scs', 'sct', 'scu', 'scv', 'scw', 'scx', 'sda', 'sdb', 'sdc', 'sde', 'sdf', 'sdg', 'sdh', 'sdj', 'sdk', 'sdl', 'sdm', 'sdn', 'sdo', 'sdp', 'sdr', 'sds', 'sdt', 'sdu', 'sdv', 'sdx', 'sdz', 'sea', 'seb', 'sec', 'sed', 'see', 'sef', 'seg', 'seh', 'sei', 'sej', 'sek', 'sel', 'sem', 'sen', 'seo', 'sep', 'seq', 'ser', 'ses', 'set', 'seu', 'sev', 'sew', 'sey', 'sez', 'sfb', 'sfe', 'sfm', 'sfs', 'sfw', 'sga', 'sgb', 'sgc', 'sgd', 'sge', 'sgg', 'sgh', 'sgi', 'sgj', 'sgk', 'sgl', 'sgm', 'sgn', 'sgo', 'sgp', 'sgr', 'sgs', 'sgt', 'sgu', 'sgw', 'sgx', 'sgy', 'sgz', 'sha', 'shb', 'shc', 'shd', 'she', 'shg', 'shh', 'shi', 'shj', 'shk', 'shl', 'shm', 'shn', 'sho', 'shp', 'shq', 'shr', 'shs', 'sht', 'shu', 'shv', 'shw', 'shx', 'shy', 'shz', 'sia', 'sib', 'sid', 'sie', 'sif', 'sig', 'sih', 'sii', 'sij', 'sik', 'sil', 'sim', 'sio', 'sip', 'siq', 'sir', 'sis', 'sit', 'siu', 'siv', 'siw', 'six', 'siy', 'siz', 'sja', 'sjb', 'sjd', 'sje', 'sjg', 'sjk', 'sjl', 'sjm', 'sjn', 'sjo', 'sjp', 'sjr', 'sjs', 'sjt', 'sju', 'sjw', 'ska', 'skb', 'skc', 'skd', 'ske', 'skf', 'skg', 'skh', 'ski', 'skj', 'skk', 'skm', 'skn', 'sko', 'skp', 'skq', 'skr', 'sks', 'skt', 'sku', 'skv', 'skw', 'skx', 'sky', 'skz', 'sla', 'slc', 'sld', 'sle', 'slf', 'slg', 'slh', 'sli', 'slj', 'sll', 'slm', 'sln', 'slp', 'slq', 'slr', 'sls', 'slt', 'slu', 'slw', 'slx', 'sly', 'slz', 'sma', 'smb', 'smc', 'smd', 'smf', 'smg', 'smh', 'smi', 'smj', 'smk', 'sml', 'smm', 'smn', 'smp', 'smq', 'smr', 'sms', 'smt', 'smu', 'smv', 'smw', 'smx', 'smy', 'smz', 'snb', 'snc', 'sne', 'snf', 'sng', 'snh', 'sni', 'snj', 'snk', 'snl', 'snm', 'snn', 'sno', 'snp', 'snq', 'snr', 'sns', 'snu', 'snv', 'snw', 'snx', 'sny', 'snz', 'soa', 'sob', 'soc', 'sod', 'soe', 'sog', 'soh', 'soi', 'soj', 'sok', 'sol', 'son', 'soo', 'sop', 'soq', 'sor', 'sos', 'sou', 'sov', 'sow', 'sox', 'soy', 'soz', 'spb', 'spc', 'spd', 'spe', 'spg', 'spi', 'spk', 'spl', 'spm', 'spn', 'spo', 'spp', 'spq', 'spr', 'sps', 'spt', 'spu', 'spv', 'spx', 'spy', 'sqa', 'sqh', 'sqj', 'sqk', 'sqm', 'sqn', 'sqo', 'sqq', 'sqr', 'sqs', 'sqt', 'squ', 'sra', 'srb', 'src', 'sre', 'srf', 'srg', 'srh', 'sri', 'srk', 'srl', 'srm', 'srn', 'sro', 'srq', 'srr', 'srs', 'srt', 'sru', 'srv', 'srw', 'srx', 'sry', 'srz', 'ssa', 'ssb', 'ssc', 'ssd', 'sse', 'ssf', 'ssg', 'ssh', 'ssi', 'ssj', 'ssk', 'ssl', 'ssm', 'ssn', 'sso', 'ssp', 'ssq', 'ssr', 'sss', 'sst', 'ssu', 'ssv', 'ssx', 'ssy', 'ssz', 'sta', 'stb', 'std', 'ste', 'stf', 'stg', 'sth', 'sti', 'stj', 'stk', 'stl', 'stm', 'stn', 'sto', 'stp', 'stq', 'str', 'sts', 'stt', 'stu', 'stv', 'stw', 'sty', 'sua', 'sub', 'suc', 'sue', 'sug', 'sui', 'suj', 'suk', 'sul', 'sum', 'suq', 'sur', 'sus', 'sut', 'suv', 'suw', 'sux', 'suy', 'suz', 'sva', 'svb', 'svc', 'sve', 'svk', 'svm', 'svr', 'svs', 'svx', 'swb', 'swc', 'swf', 'swg', 'swh', 'swi', 'swj', 'swk', 'swl', 'swm', 'swn', 'swo', 'swp', 'swq', 'swr', 'sws', 'swt', 'swu', 'swv', 'sww', 'swx', 'swy', 'sxb', 'sxc', 'sxe', 'sxg', 'sxk', 'sxl', 'sxm', 'sxn', 'sxo', 'sxr', 'sxs', 'sxu', 'sxw', 'sya', 'syb', 'syc', 'syd', 'syi', 'syk', 'syl', 'sym', 'syn', 'syo', 'syr', 'sys', 'syw', 'syx', 'syy', 'sza', 'szb', 'szc', 'szd', 'sze', 'szg', 'szl', 'szn', 'szp', 'szs', 'szv', 'szw', 'taa', 'tab', 'tac', 'tad', 'tae', 'taf', 'tag', 'tai', 'taj', 'tak', 'tal', 'tan', 'tao', 'tap', 'taq', 'tar', 'tas', 'tau', 'tav', 'taw', 'tax', 'tay', 'taz', 'tba', 'tbb', 'tbc', 'tbd', 'tbe', 'tbf', 'tbg', 'tbh', 'tbi', 'tbj', 'tbk', 'tbl', 'tbm', 'tbn', 'tbo', 'tbp', 'tbq', 'tbr', 'tbs', 'tbt', 'tbu', 'tbv', 'tbw', 'tbx', 'tby', 'tbz', 'tca', 'tcb', 'tcc', 'tcd', 'tce', 'tcf', 'tcg', 'tch', 'tci', 'tck', 'tcl', 'tcm', 'tcn', 'tco', 'tcp', 'tcq', 'tcs', 'tct', 'tcu', 'tcw', 'tcx', 'tcy', 'tcz', 'tda', 'tdb', 'tdc', 'tdd', 'tde', 'tdf', 'tdg', 'tdh', 'tdi', 'tdj', 'tdk', 'tdl', 'tdm', 'tdn', 'tdo', 'tdq', 'tdr', 'tds', 'tdt', 'tdu', 'tdv', 'tdx', 'tdy', 'tea', 'teb', 'tec', 'ted', 'tee', 'tef', 'teg', 'teh', 'tei', 'tek', 'tem', 'ten', 'teo', 'tep', 'teq', 'ter', 'tes', 'tet', 'teu', 'tev', 'tew', 'tex', 'tey', 'tez', 'tfi', 'tfn', 'tfo', 'tfr', 'tft', 'tga', 'tgb', 'tgc', 'tgd', 'tge', 'tgf', 'tgg', 'tgh', 'tgi', 'tgj', 'tgn', 'tgo', 'tgp', 'tgq', 'tgr', 'tgs', 'tgt', 'tgu', 'tgv', 'tgw', 'tgx', 'tgy', 'tgz', 'thc', 'thd', 'the', 'thf', 'thh', 'thi', 'thk', 'thl', 'thm', 'thn', 'thp', 'thq', 'thr', 'ths', 'tht', 'thu', 'thv', 'thw', 'thx', 'thy', 'thz', 'tia', 'tic', 'tid', 'tie', 'tif', 'tig', 'tih', 'tii', 'tij', 'tik', 'til', 'tim', 'tin', 'tio', 'tip', 'tiq', 'tis', 'tit', 'tiu', 'tiv', 'tiw', 'tix', 'tiy', 'tiz', 'tja', 'tjg', 'tji', 'tjl', 'tjm', 'tjn', 'tjo', 'tjs', 'tju', 'tjw', 'tka', 'tkb', 'tkd', 'tke', 'tkf', 'tkg', 'tkk', 'tkl', 'tkm', 'tkn', 'tkp', 'tkq', 'tkr', 'tks', 'tkt', 'tku', 'tkv', 'tkw', 'tkx', 'tkz', 'tla', 'tlb', 'tlc', 'tld', 'tlf', 'tlg', 'tlh', 'tli', 'tlj', 'tlk', 'tll', 'tlm', 'tln', 'tlo', 'tlp', 'tlq', 'tlr', 'tls', 'tlt', 'tlu', 'tlv', 'tlw', 'tlx', 'tly', 'tma', 'tmb', 'tmc', 'tmd', 'tme', 'tmf', 'tmg', 'tmh', 'tmi', 'tmj', 'tmk', 'tml', 'tmm', 'tmn', 'tmo', 'tmp', 'tmq', 'tmr', 'tms', 'tmt', 'tmu', 'tmv', 'tmw', 'tmy', 'tmz', 'tna', 'tnb', 'tnc', 'tnd', 'tne', 'tnf', 'tng', 'tnh', 'tni', 'tnk', 'tnl', 'tnm', 'tnn', 'tno', 'tnp', 'tnq', 'tnr', 'tns', 'tnt', 'tnu', 'tnv', 'tnw', 'tnx', 'tny', 'tnz', 'tob', 'toc', 'tod', 'toe', 'tof', 'tog', 'toh', 'toi', 'toj', 'tol', 'tom', 'too', 'top', 'toq', 'tor', 'tos', 'tou', 'tov', 'tow', 'tox', 'toy', 'toz', 'tpa', 'tpc', 'tpe', 'tpf', 'tpg', 'tpi', 'tpj', 'tpk', 'tpl', 'tpm', 'tpn', 'tpo', 'tpp', 'tpq', 'tpr', 'tpt', 'tpu', 'tpv', 'tpw', 'tpx', 'tpy', 'tpz', 'tqb', 'tql', 'tqm', 'tqn', 'tqo', 'tqp', 'tqq', 'tqr', 'tqt', 'tqu', 'tqw', 'tra', 'trb', 'trc', 'trd', 'tre', 'trf', 'trg', 'trh', 'tri', 'trj', 'trk', 'trl', 'trm', 'trn', 'tro', 'trp', 'trq', 'trr', 'trs', 'trt', 'tru', 'trv', 'trw', 'trx', 'try', 'trz', 'tsa', 'tsb', 'tsc', 'tsd', 'tse', 'tsf', 'tsg', 'tsh', 'tsi', 'tsj', 'tsk', 'tsl', 'tsm', 'tsp', 'tsq', 'tsr', 'tss', 'tst', 'tsu', 'tsv', 'tsw', 'tsx', 'tsy', 'tsz', 'tta', 'ttb', 'ttc', 'ttd', 'tte', 'ttf', 'ttg', 'tth', 'tti', 'ttj', 'ttk', 'ttl', 'ttm', 'ttn', 'tto', 'ttp', 'ttq', 'ttr', 'tts', 'ttt', 'ttu', 'ttv', 'ttw', 'tty', 'ttz', 'tua', 'tub', 'tuc', 'tud', 'tue', 'tuf', 'tug', 'tuh', 'tui', 'tuj', 'tul', 'tum', 'tun', 'tuo', 'tup', 'tuq', 'tus', 'tut', 'tuu', 'tuv', 'tuw', 'tux', 'tuy', 'tuz', 'tva', 'tvd', 'tve', 'tvk', 'tvl', 'tvm', 'tvn', 'tvo', 'tvs', 'tvt', 'tvu', 'tvw', 'tvy', 'twa', 'twb', 'twc', 'twd', 'twe', 'twf', 'twg', 'twh', 'twl', 'twm', 'twn', 'two', 'twp', 'twq', 'twr', 'twt', 'twu', 'tww', 'twx', 'twy', 'txa', 'txb', 'txc', 'txe', 'txg', 'txh', 'txi', 'txj', 'txm', 'txn', 'txo', 'txq', 'txr', 'txs', 'txt', 'txu', 'txx', 'txy', 'tya', 'tye', 'tyh', 'tyi', 'tyj', 'tyl', 'tyn', 'typ', 'tyr', 'tys', 'tyt', 'tyu', 'tyv', 'tyx', 'tyz', 'tza', 'tzh', 'tzj', 'tzl', 'tzm', 'tzn', 'tzo', 'tzx', 'uam', 'uan', 'uar', 'uba', 'ubi', 'ubl', 'ubr', 'ubu', 'uby', 'uda', 'ude', 'udg', 'udi', 'udj', 'udl', 'udm', 'udu', 'ues', 'ufi', 'uga', 'ugb', 'uge', 'ugn', 'ugo', 'ugy', 'uha', 'uhn', 'uis', 'uiv', 'uji', 'uka', 'ukg', 'ukh', 'ukk', 'ukl', 'ukp', 'ukq', 'uks', 'uku', 'ukw', 'uky', 'ula', 'ulb', 'ulc', 'ule', 'ulf', 'uli', 'ulk', 'ull', 'ulm', 'uln', 'ulu', 'ulw', 'uma', 'umb', 'umc', 'umd', 'umg', 'umi', 'umm', 'umn', 'umo', 'ump', 'umr', 'ums', 'umu', 'una', 'und', 'une', 'ung', 'unk', 'unm', 'unn', 'unp', 'unr', 'unu', 'unx', 'unz', 'uok', 'upi', 'upv', 'ura', 'urb', 'urc', 'ure', 'urf', 'urg', 'urh', 'uri', 'urj', 'urk', 'url', 'urm', 'urn', 'uro', 'urp', 'urr', 'urt', 'uru', 'urv', 'urw', 'urx', 'ury', 'urz', 'usa', 'ush', 'usi', 'usk', 'usp', 'usu', 'uta', 'ute', 'utp', 'utr', 'utu', 'uum', 'uun', 'uur', 'uuu', 'uve', 'uvh', 'uvl', 'uwa', 'uya', 'uzn', 'uzs', 'vaa', 'vae', 'vaf', 'vag', 'vah', 'vai', 'vaj', 'val', 'vam', 'van', 'vao', 'vap', 'var', 'vas', 'vau', 'vav', 'vay', 'vbb', 'vbk', 'vec', 'ved', 'vel', 'vem', 'veo', 'vep', 'ver', 'vgr', 'vgt', 'vic', 'vid', 'vif', 'vig', 'vil', 'vin', 'vis', 'vit', 'viv', 'vka', 'vki', 'vkj', 'vkk', 'vkl', 'vkm', 'vko', 'vkp', 'vkt', 'vku', 'vlp', 'vls', 'vma', 'vmb', 'vmc', 'vmd', 'vme', 'vmf', 'vmg', 'vmh', 'vmi', 'vmj', 'vmk', 'vml', 'vmm', 'vmp', 'vmq', 'vmr', 'vms', 'vmu', 'vmv', 'vmw', 'vmx', 'vmy', 'vmz', 'vnk', 'vnm', 'vnp', 'vor', 'vot', 'vra', 'vro', 'vrs', 'vrt', 'vsi', 'vsl', 'vsv', 'vto', 'vum', 'vun', 'vut', 'vwa', 'waa', 'wab', 'wac', 'wad', 'wae', 'waf', 'wag', 'wah', 'wai', 'waj', 'wak', 'wal', 'wam', 'wan', 'wao', 'wap', 'waq', 'war', 'was', 'wat', 'wau', 'wav', 'waw', 'wax', 'way', 'waz', 'wba', 'wbb', 'wbe', 'wbf', 'wbh', 'wbi', 'wbj', 'wbk', 'wbl', 'wbm', 'wbp', 'wbq', 'wbr', 'wbs', 'wbt', 'wbv', 'wbw', 'wca', 'wci', 'wdd', 'wdg', 'wdj', 'wdk', 'wdu', 'wdy', 'wea', 'wec', 'wed', 'weg', 'weh', 'wei', 'wem', 'wen', 'weo', 'wep', 'wer', 'wes', 'wet', 'weu', 'wew', 'wfg', 'wga', 'wgb', 'wgg', 'wgi', 'wgo', 'wgu', 'wgw', 'wgy', 'wha', 'whg', 'whk', 'whu', 'wib', 'wic', 'wie', 'wif', 'wig', 'wih', 'wii', 'wij', 'wik', 'wil', 'wim', 'win', 'wir', 'wit', 'wiu', 'wiv', 'wiw', 'wiy', 'wja', 'wji', 'wka', 'wkb', 'wkd', 'wkl', 'wku', 'wkw', 'wky', 'wla', 'wlc', 'wle', 'wlg', 'wli', 'wlk', 'wll', 'wlm', 'wlo', 'wlr', 'wls', 'wlu', 'wlv', 'wlw', 'wlx', 'wly', 'wma', 'wmb', 'wmc', 'wmd', 'wme', 'wmh', 'wmi', 'wmm', 'wmn', 'wmo', 'wms', 'wmt', 'wmw', 'wmx', 'wnb', 'wnc', 'wnd', 'wne', 'wng', 'wni', 'wnk', 'wnm', 'wnn', 'wno', 'wnp', 'wnu', 'wnw', 'wny', 'woa', 'wob', 'woc', 'wod', 'woe', 'wof', 'wog', 'woi', 'wok', 'wom', 'won', 'woo', 'wor', 'wos', 'wow', 'woy', 'wpc', 'wra', 'wrb', 'wrd', 'wrg', 'wrh', 'wri', 'wrk', 'wrl', 'wrm', 'wrn', 'wro', 'wrp', 'wrr', 'wrs', 'wru', 'wrv', 'wrw', 'wrx', 'wry', 'wrz', 'wsa', 'wsg', 'wsi', 'wsk', 'wsr', 'wss', 'wsu', 'wsv', 'wtf', 'wth', 'wti', 'wtk', 'wtm', 'wtw', 'wua', 'wub', 'wud', 'wuh', 'wul', 'wum', 'wun', 'wur', 'wut', 'wuu', 'wuv', 'wux', 'wuy', 'wwa', 'wwb', 'wwo', 'wwr', 'www', 'wxa', 'wxw', 'wya', 'wyb', 'wyi', 'wym', 'wyr', 'wyy', 'xaa', 'xab', 'xac', 'xad', 'xae', 'xag', 'xai', 'xaj', 'xak', 'xal', 'xam', 'xan', 'xao', 'xap', 'xaq', 'xar', 'xas', 'xat', 'xau', 'xav', 'xaw', 'xay', 'xba', 'xbb', 'xbc', 'xbd', 'xbe', 'xbg', 'xbi', 'xbj', 'xbm', 'xbn', 'xbo', 'xbp', 'xbr', 'xbw', 'xbx', 'xby', 'xcb', 'xcc', 'xce', 'xcg', 'xch', 'xcl', 'xcm', 'xcn', 'xco', 'xcr', 'xct', 'xcu', 'xcv', 'xcw', 'xcy', 'xda', 'xdc', 'xdk', 'xdm', 'xdo', 'xdy', 'xeb', 'xed', 'xeg', 'xel', 'xem', 'xep', 'xer', 'xes', 'xet', 'xeu', 'xfa', 'xga', 'xgb', 'xgd', 'xgf', 'xgg', 'xgi', 'xgl', 'xgm', 'xgn', 'xgr', 'xgu', 'xgw', 'xha', 'xhc', 'xhd', 'xhe', 'xhr', 'xht', 'xhu', 'xhv', 'xia', 'xib', 'xii', 'xil', 'xin', 'xip', 'xir', 'xis', 'xiv', 'xiy', 'xjb', 'xjt', 'xka', 'xkb', 'xkc', 'xkd', 'xke', 'xkf', 'xkg', 'xkh', 'xki', 'xkj', 'xkk', 'xkl', 'xkn', 'xko', 'xkp', 'xkq', 'xkr', 'xks', 'xkt', 'xku', 'xkv', 'xkw', 'xkx', 'xky', 'xkz', 'xla', 'xlb', 'xlc', 'xld', 'xle', 'xlg', 'xli', 'xln', 'xlo', 'xlp', 'xls', 'xlu', 'xly', 'xma', 'xmb', 'xmc', 'xmd', 'xme', 'xmf', 'xmg', 'xmh', 'xmj', 'xmk', 'xml', 'xmm', 'xmn', 'xmo', 'xmp', 'xmq', 'xmr', 'xms', 'xmt', 'xmu', 'xmv', 'xmw', 'xmx', 'xmy', 'xmz', 'xna', 'xnb', 'xnd', 'xng', 'xnh', 'xni', 'xnk', 'xnn', 'xno', 'xnr', 'xns', 'xnt', 'xnu', 'xny', 'xnz', 'xoc', 'xod', 'xog', 'xoi', 'xok', 'xom', 'xon', 'xoo', 'xop', 'xor', 'xow', 'xpa', 'xpc', 'xpe', 'xpg', 'xpi', 'xpj', 'xpk', 'xpm', 'xpn', 'xpo', 'xpp', 'xpq', 'xpr', 'xps', 'xpt', 'xpu', 'xpy', 'xqa', 'xqt', 'xra', 'xrb', 'xrd', 'xre', 'xrg', 'xri', 'xrm', 'xrn', 'xrq', 'xrr', 'xrt', 'xru', 'xrw', 'xsa', 'xsb', 'xsc', 'xsd', 'xse', 'xsh', 'xsi', 'xsj', 'xsl', 'xsm', 'xsn', 'xso', 'xsp', 'xsq', 'xsr', 'xss', 'xsu', 'xsv', 'xsy', 'xta', 'xtb', 'xtc', 'xtd', 'xte', 'xtg', 'xth', 'xti', 'xtj', 'xtl', 'xtm', 'xtn', 'xto', 'xtp', 'xtq', 'xtr', 'xts', 'xtt', 'xtu', 'xtv', 'xtw', 'xty', 'xtz', 'xua', 'xub', 'xud', 'xug', 'xuj', 'xul', 'xum', 'xun', 'xuo', 'xup', 'xur', 'xut', 'xuu', 'xve', 'xvi', 'xvn', 'xvo', 'xvs', 'xwa', 'xwc', 'xwd', 'xwe', 'xwg', 'xwj', 'xwk', 'xwl', 'xwo', 'xwr', 'xwt', 'xww', 'xxb', 'xxk', 'xxm', 'xxr', 'xxt', 'xya', 'xyb', 'xyj', 'xyk', 'xyl', 'xyt', 'xyy', 'xzh', 'xzm', 'xzp', 'yaa', 'yab', 'yac', 'yad', 'yae', 'yaf', 'yag', 'yah', 'yai', 'yaj', 'yak', 'yal', 'yam', 'yan', 'yao', 'yap', 'yaq', 'yar', 'yas', 'yat', 'yau', 'yav', 'yaw', 'yax', 'yay', 'yaz', 'yba', 'ybb', 'ybd', 'ybe', 'ybh', 'ybi', 'ybj', 'ybk', 'ybl', 'ybm', 'ybn', 'ybo', 'ybx', 'yby', 'ych', 'ycl', 'ycn', 'ycp', 'yda', 'ydd', 'yde', 'ydg', 'ydk', 'yds', 'yea', 'yec', 'yee', 'yei', 'yej', 'yel', 'yen', 'yer', 'yes', 'yet', 'yeu', 'yev', 'yey', 'yga', 'ygi', 'ygl', 'ygm', 'ygp', 'ygr', 'ygs', 'ygu', 'ygw', 'yha', 'yhd', 'yhl', 'yhs', 'yia', 'yif', 'yig', 'yih', 'yii', 'yij', 'yik', 'yil', 'yim', 'yin', 'yip', 'yiq', 'yir', 'yis', 'yit', 'yiu', 'yiv', 'yix', 'yiy', 'yiz', 'yka', 'ykg', 'yki', 'ykk', 'ykl', 'ykm', 'ykn', 'yko', 'ykr', 'ykt', 'yku', 'yky', 'yla', 'ylb', 'yle', 'ylg', 'yli', 'yll', 'ylm', 'yln', 'ylo', 'ylr', 'ylu', 'yly', 'yma', 'ymb', 'ymc', 'ymd', 'yme', 'ymg', 'ymh', 'ymi', 'ymk', 'yml', 'ymm', 'ymn', 'ymo', 'ymp', 'ymq', 'ymr', 'yms', 'ymt', 'ymx', 'ymz', 'yna', 'ynd', 'yne', 'yng', 'ynh', 'ynk', 'ynl', 'ynn', 'yno', 'ynq', 'yns', 'ynu', 'yob', 'yog', 'yoi', 'yok', 'yol', 'yom', 'yon', 'yos', 'yot', 'yox', 'yoy', 'ypa', 'ypb', 'ypg', 'yph', 'ypk', 'ypm', 'ypn', 'ypo', 'ypp', 'ypz', 'yra', 'yrb', 'yre', 'yri', 'yrk', 'yrl', 'yrm', 'yrn', 'yro', 'yrs', 'yrw', 'yry', 'ysc', 'ysd', 'ysg', 'ysl', 'ysn', 'yso', 'ysp', 'ysr', 'yss', 'ysy', 'yta', 'ytl', 'ytp', 'ytw', 'yty', 'yua', 'yub', 'yuc', 'yud', 'yue', 'yuf', 'yug', 'yui', 'yuj', 'yuk', 'yul', 'yum', 'yun', 'yup', 'yuq', 'yur', 'yut', 'yuu', 'yuw', 'yux', 'yuy', 'yuz', 'yva', 'yvt', 'ywa', 'ywg', 'ywl', 'ywn', 'ywq', 'ywr', 'ywt', 'ywu', 'yww', 'yxa', 'yxg', 'yxl', 'yxm', 'yxu', 'yxy', 'yyr', 'yyu', 'yyz', 'yzg', 'yzk', 'zaa', 'zab', 'zac', 'zad', 'zae', 'zaf', 'zag', 'zah', 'zai', 'zaj', 'zak', 'zal', 'zam', 'zao', 'zap', 'zaq', 'zar', 'zas', 'zat', 'zau', 'zav', 'zaw', 'zax', 'zay', 'zaz', 'zbc', 'zbe', 'zbl', 'zbt', 'zbw', 'zca', 'zch', 'zdj', 'zea', 'zeg', 'zeh', 'zen', 'zga', 'zgb', 'zgh', 'zgm', 'zgn', 'zgr', 'zhb', 'zhd', 'zhi', 'zhn', 'zhw', 'zhx', 'zia', 'zib', 'zik', 'zil', 'zim', 'zin', 'zir', 'ziw', 'ziz', 'zka', 'zkb', 'zkd', 'zkg', 'zkh', 'zkk', 'zkn', 'zko', 'zkp', 'zkr', 'zkt', 'zku', 'zkv', 'zkz', 'zle', 'zlj', 'zlm', 'zln', 'zlq', 'zls', 'zlw', 'zma', 'zmb', 'zmc', 'zmd', 'zme', 'zmf', 'zmg', 'zmh', 'zmi', 'zmj', 'zmk', 'zml', 'zmm', 'zmn', 'zmo', 'zmp', 'zmq', 'zmr', 'zms', 'zmt', 'zmu', 'zmv', 'zmw', 'zmx', 'zmy', 'zmz', 'zna', 'znd', 'zne', 'zng', 'znk', 'zns', 'zoc', 'zoh', 'zom', 'zoo', 'zoq', 'zor', 'zos', 'zpa', 'zpb', 'zpc', 'zpd', 'zpe', 'zpf', 'zpg', 'zph', 'zpi', 'zpj', 'zpk', 'zpl', 'zpm', 'zpn', 'zpo', 'zpp', 'zpq', 'zpr', 'zps', 'zpt', 'zpu', 'zpv', 'zpw', 'zpx', 'zpy', 'zpz', 'zqe', 'zra', 'zrg', 'zrn', 'zro', 'zrp', 'zrs', 'zsa', 'zsk', 'zsl', 'zsm', 'zsr', 'zsu', 'zte', 'ztg', 'ztl', 'ztm', 'ztn', 'ztp', 'ztq', 'zts', 'ztt', 'ztu', 'ztx', 'zty', 'zua', 'zuh', 'zum', 'zun', 'zuy', 'zwa', 'zxx', 'zyb', 'zyg', 'zyj', 'zyn', 'zyp', 'zza', 'zzj' ];
      axe.utils.validLangs = function() {
        'use strict';
        return langs;
      };
      return commons;
    }()
  });
})(typeof window === 'object' ? window : this);