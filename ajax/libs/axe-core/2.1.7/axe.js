/*! aXe v2.1.7
 * Copyright (c) 2016 Deque Systems, Inc.
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
  // A window reference is required to access the axe object in a "global".
  var global = window;
  var document = window.document;
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  /*exported axe, commons */
  /*global axeFunction, module, define */
  // exported namespace for aXe
  var axe = axe || {};
  axe.version = '2.1.7';
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      'use strict';
      return axe;
    });
  }
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports && typeof axeFunction.toString === 'function') {
    axe.source = '(' + axeFunction.toString() + ')(this, this.document);';
    module.exports = axe;
  }
  if (typeof window.getComputedStyle === 'function') {
    window.axe = axe;
  }
  // local namespace for common functions
  var commons;
  'use strict';
  /*exported utils */
  var utils = axe.utils = {};
  'use strict';
  /*exported helpers */
  var helpers = {};
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  /*global Rule, Check, RuleResult, commons: true */
  function getDefaultConfiguration(audit) {
    'use strict';
    var config;
    if (audit) {
      config = axe.utils.clone(audit);
      // Commons are configured into axe like everything else,
      // however because things go funky if we have multiple commons objects
      // we're not using the copy of that.
      config.commons = audit.commons;
    } else {
      config = {};
    }
    config.reporter = config.reporter || null;
    config.rules = config.rules || [];
    config.checks = config.checks || [];
    config.data = Object.assign({
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
  /**
 * Constructor which holds configured rules and information about the document under test
 */
  function Audit(audit) {
    // defaults
    this.brand = 'axe';
    this.application = 'axeAPI';
    this.tagExclude = [ 'experimental' ];
    this.defaultConfig = audit;
    this._init();
  }
  /**
 * Initializes the rules and checks
 */
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
    this._constructHelpUrls();
  };
  /**
 * Adds a new command to the audit
 */
  Audit.prototype.registerCommand = function(command) {
    'use strict';
    this.commands[command.id] = command.callback;
  };
  /**
 * Adds a new rule to the Audit.  If a rule with specified ID already exists, it will be overridden
 * @param {Object} spec Rule specification object
 */
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
  /**
 * Adds a new check to the Audit.  If a Check with specified ID already exists, it will be
 * reconfigured
 *
 * @param {Object} spec Check specification object
 */
  Audit.prototype.addCheck = function(spec) {
    /*jshint evil:true */
    'use strict';
    var metadata = spec.metadata;
    if ((typeof metadata === 'undefined' ? 'undefined' : _typeof(metadata)) === 'object') {
      this.data.checks[spec.id] = metadata;
      // Transform messages into functions:
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
  /**
 * Runs the Audit; which in turn should call `run` on each rule.
 * @async
 * @param  {Context}   context The scope definition/context for analysis (include/exclude)
 * @param  {Object}    options Options object to pass into rules and/or disable rules or checks
 * @param  {Function} fn       Callback function to fire when audit is complete
 */
  Audit.prototype.run = function(context, options, resolve, reject) {
    'use strict';
    this.validateOptions(options);
    var q = axe.utils.queue();
    this.rules.forEach(function(rule) {
      if (axe.utils.ruleShouldRun(rule, context, options)) {
        q.defer(function(res, rej) {
          rule.run(context, options, res, function(err) {
            if (!options.debug) {
              var errResult = Object.assign(new RuleResult(rule), {
                result: axe.constants.CANTTELL,
                description: 'An error occured while running this rule',
                message: err.message,
                help: err.stack || err.message,
                error: err
              });
              res(errResult);
            } else {
              rej(err);
            }
          });
        });
      }
    });
    q.then(function(results) {
      resolve(results.filter(function(result) {
        return !!result;
      }));
    }).catch(reject);
  };
  /**
 * Runs Rule `after` post processing functions
 * @param  {Array} results  Array of RuleResults to postprocess
 * @param  {Mixed} options  Options object to pass into rules and/or disable rules or checks
 */
  Audit.prototype.after = function(results, options) {
    'use strict';
    var rules = this.rules;
    return results.map(function(ruleResult) {
      var rule = axe.utils.findBy(rules, 'id', ruleResult.id);
      return rule.after(ruleResult, options);
    });
  };
  /**
 * Get the rule with a given ID
 * @param  {string}
 * @return {Rule}
 */
  Audit.prototype.getRule = function(ruleId) {
    return this.rules.find(function(rule) {
      return rule.id === ruleId;
    });
  };
  /**
 * Ensure all rules that are expected to run exist
 * @throws {Error} If any tag or rule specified in options is unknown
 * @param  {Object} options  Options object
 * @return {Object}          Validated options object
 */
  Audit.prototype.validateOptions = function(options) {
    'use strict';
    var audit = this;
    // Validate runOnly
    if (_typeof(options.runOnly) === 'object') {
      var only = options.runOnly;
      // Check if every value in options.runOnly is a known rule ID
      if (only.type === 'rule' && Array.isArray(only.value)) {
        only.value.forEach(function(ruleId) {
          if (!audit.getRule(ruleId)) {
            throw new Error('unknown rule `' + ruleId + '` in options.runOnly');
          }
        });
      } else {
        if (Array.isArray(only.value) && only.value.length > 0) {
          var tags = [].concat(only.value);
          audit.rules.forEach(function(rule) {
            var tagPos, i, l;
            if (!tags) {
              return;
            }
            // Remove any known tag
            for (i = 0, l = rule.tags.length; i < l; i++) {
              tagPos = tags.indexOf(rule.tags[i]);
              if (tagPos !== -1) {
                tags.splice(tagPos, 1);
              }
            }
          });
          if (tags.length !== 0) {
            throw new Error('could not find tags `' + tags.join('`, `') + '`');
          }
        }
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
  /*
 * Updates the default options and then applies them
 * @param  {Mixed} options  Options object
 */
  Audit.prototype.setBranding = function(branding) {
    'use strict';
    if (branding && branding.hasOwnProperty('brand') && branding.brand && typeof branding.brand === 'string') {
      this.brand = branding.brand;
    }
    if (branding && branding.hasOwnProperty('application') && branding.application && typeof branding.application === 'string') {
      this.application = branding.application;
    }
    this._constructHelpUrls();
  };
  /**
 * For all the rules, create the helpUrl and add it to the data for that rule
 */
  Audit.prototype._constructHelpUrls = function() {
    var _this = this;
    var version = axe.version.substring(0, axe.version.lastIndexOf('.'));
    this.rules.forEach(function(rule) {
      _this.data.rules[rule.id] = _this.data.rules[rule.id] || {};
      _this.data.rules[rule.id].helpUrl = 'https://dequeuniversity.com/rules/' + _this.brand + '/' + version + '/' + rule.id + '?' + 'application=' + _this.application;
    });
  };
  /**
 * Reset the default rules, checks and meta data
 */
  Audit.prototype.resetRulesAndChecks = function() {
    'use strict';
    this._init();
  };
  'use strict';
  /*exported CheckResult */
  /**
 * Constructor for the result of checks
 * @param {Check} check
 */
  function CheckResult(check) {
    'use strict';
    /**
  * ID of the check.  Unique in the context of a rule.
  * @type {String}
  */
    this.id = check.id;
    /**
  * Any data passed by Check (by calling `this.data()`)
  * @type {Mixed}
  */
    this.data = null;
    /**
  * Any node that is related to the Check, specified by calling `this.relatedNodes([HTMLElement...])` inside the Check
  * @type {Array}
  */
    this.relatedNodes = [];
    /**
  * The return value of the Check's evaluate function
  * @type {Mixed}
  */
    this.result = null;
  }
  'use strict';
  /*global CheckResult */
  function createExecutionContext(spec) {
    /*jshint evil:true */
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
  /**
 * Unique ID for the check.  Checks may be re-used, so there may be additional instances of checks
 * with the same ID.
 * @type {String}
 */
  // Check.prototype.id;
  /**
 * Free-form options that are passed as the second parameter to the `evaluate`
 * @type {Mixed}
 */
  // Check.prototype.options;
  /**
 * The actual code, accepts 2 parameters: node (the node under test), options (see this.options).
 * This function is run in the context of a checkHelper, which has the following methods
 * - `async()` - if called, the check is considered to be asynchronous; returns a callback function
 * - `data()` - free-form data object, associated to the `CheckResult` which is specific to each node
 * @type {Function}
 */
  // Check.prototype.evaluate;
  /**
 * Optional. Filter and/or modify checks for all nodes
 * @type {Function}
 */
  // Check.prototype.after;
  /**
 * enabled by default, if false, this check will not be included in the rule's evaluation
 * @type {Boolean}
 */
  Check.prototype.enabled = true;
  /**
 * Run the check's evaluate function (call `this.evaluate(node, options)`)
 * @param  {HTMLElement} node  The node to test
 * @param  {Object} options    The options that override the defaults and provide additional
 *                             information for the check
 * @param  {Function} callback Function to fire when check is complete
 */
  Check.prototype.run = function(node, options, resolve, reject) {
    'use strict';
    options = options || {};
    var enabled = options.hasOwnProperty('enabled') ? options.enabled : this.enabled, checkOptions = options.options || this.options;
    if (enabled) {
      var checkResult = new CheckResult(this);
      var checkHelper = axe.utils.checkHelper(checkResult, resolve, reject);
      var result;
      try {
        result = this.evaluate.call(checkHelper, node, checkOptions);
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
  /**
 * Override a check's settings after construction to allow for changing options
 * without having to implement the entire check
 *
 * @param {Object} spec - the specification of the attributes to be changed
 */
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
  /*exported Context */
  /*global isNodeInContext */
  /**
 * Pushes a unique frame onto `frames` array, filtering any hidden iframes
 * @private
 * @param  {Array} collection The array of unique frames that is being operated on
 * @param  {HTMLElement} frame   The frame to push onto Context
 */
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
  /**
 * Unshift selectors of matching iframes
 * @private
 * @param  {Context} context 	  The context object to operate on and assign to
 * @param  {String} type          The "type" of context, 'include' or 'exclude'
 * @param  {Array} selectorArray  Array of CSS selectors, each element represents a frame;
 * where the last element is the actual node
 */
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
  /**
 * Normalize the input of "context" so that many different methods of input are accepted
 * @private
 * @param  {Mixed} context  The configuration object passed to `Context`
 * @return {Object}         Normalized context spec to include both `include` and `exclude` arrays
 */
  function normalizeContext(context) {
    'use strict';
    // typeof NodeList.length in PhantomJS === function
    if (context && (typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object' || context instanceof NodeList) {
      if (context instanceof Node) {
        return {
          include: [ context ],
          exclude: []
        };
      }
      if (context.hasOwnProperty('include') || context.hasOwnProperty('exclude')) {
        return {
          include: context.include || [ document ],
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
  /**
 * Finds frames in context, converts selectors to Element references and pushes unique frames
 * @private
 * @param  {Context} context The instance of Context to operate on
 * @param  {String} type     The "type" of thing to parse, "include" or "exclude"
 * @return {Array}           Parsed array of matching elements
 */
  function parseSelectorArray(context, type) {
    'use strict';
    var item, result = [];
    for (var i = 0, l = context[type].length; i < l; i++) {
      item = context[type][i];
      // selector
      if (typeof item === 'string') {
        result = result.concat(axe.utils.toArray(document.querySelectorAll(item)));
        break;
      } else {
        if (item && item.length && !(item instanceof Node)) {
          if (item.length > 1) {
            pushUniqueFrameSelector(context, type, item);
          } else {
            result = result.concat(axe.utils.toArray(document.querySelectorAll(item[0])));
          }
        } else {
          result.push(item);
        }
      }
    }
    // filter nulls
    return result.filter(function(r) {
      return r;
    });
  }
  /**
 * Check that the context, as well as each frame includes at least 1 element
 * @private
 * @param  {context} context
 * @return {Error}
 */
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
  /**
 * Holds context of includes, excludes and frames for analysis.
 *
 * @todo  clarify and sync changes to design doc
 * Context : {IncludeStrings} || {
 *   // defaults to document/all
 *   include: {IncludeStrings},
 *   exclude : {ExcludeStrings}
 * }
 *
 * IncludeStrings : [{CSSSelectorArray}] || Node
 * ExcludeStrings : [{CSSSelectorArray}]
 * `CSSSelectorArray` an Array of selector strings that addresses a Node in a multi-frame document. All addresses
 * are in this form regardless of whether the document contains any frames.To evaluate the selectors to
 * find the node referenced by the array, evaluate the selectors in-order, starting in window.top. If N
 * is the length of the array, then the first N-1 selectors should result in an iframe and the last
 * selector should result in the specific node.
 *
 * @param {Object} spec Configuration or "specification" object
 */
  function Context(spec) {
    'use strict';
    var self = this;
    this.frames = [];
    this.initiator = spec && typeof spec.initiator === 'boolean' ? spec.initiator : true;
    this.page = false;
    spec = normalizeContext(spec);
    this.exclude = spec.exclude;
    this.include = spec.include;
    this.include = parseSelectorArray(this, 'include');
    this.exclude = parseSelectorArray(this, 'exclude');
    axe.utils.select('frame, iframe', this).forEach(function(frame) {
      if (isNodeInContext(frame, self)) {
        pushUniqueFrame(self.frames, frame);
      }
    });
    if (this.include.length === 1 && this.include[0] === document) {
      this.page = true;
    }
    // Validate outside of a frame
    var err = validateContext(this);
    if (err instanceof Error) {
      throw err;
    }
  }
  'use strict';
  /*exported RuleResult */
  /**
 * Constructor for the result of Rules
 * @param {Rule} rule
 */
  function RuleResult(rule) {
    'use strict';
    /**
  * The ID of the Rule whom this result belongs to
  * @type {String}
  */
    this.id = rule.id;
    /**
  * The calculated result of the Rule, either PASS, FAIL or NA
  * @type {String}
  */
    this.result = axe.constants.NA;
    /**
  * Whether the Rule is a "pageLevel" rule
  * @type {Boolean}
  */
    this.pageLevel = rule.pageLevel;
    /**
  * Impact of the violation
  * @type {String}  Plain-english impact or null if rule passes
  */
    this.impact = null;
    /**
  * Holds information regarding nodes and individual CheckResults
  * @type {Array}
  */
    this.nodes = [];
  }
  'use strict';
  /*global RuleResult, createExecutionContext */
  function Rule(spec, parentAudit) {
    /*jshint maxcomplexity:11 */
    'use strict';
    this._audit = parentAudit;
    /**
  * The code, or string ID of the rule
  * @type {String}
  */
    this.id = spec.id;
    /**
  * Selector that this rule applies to
  * @type {String}
  */
    this.selector = spec.selector || '*';
    /**
  * Whether to exclude hiddden elements form analysis.  Defaults to true.
  * @type {Boolean}
  */
    this.excludeHidden = typeof spec.excludeHidden === 'boolean' ? spec.excludeHidden : true;
    /**
  * Flag to enable or disable rule
  * @type {Boolean}
  */
    this.enabled = typeof spec.enabled === 'boolean' ? spec.enabled : true;
    /**
  * Denotes if the rule should be run if Context is not an entire page AND whether
  * the Rule should be satisified regardless of Node
  * @type {Boolean}
  */
    this.pageLevel = typeof spec.pageLevel === 'boolean' ? spec.pageLevel : false;
    /**
  * Checks that any may return true to satisfy rule
  * @type {Array}
  */
    this.any = spec.any || [];
    /**
  * Checks that must all return true to satisfy rule
  * @type {Array}
  */
    this.all = spec.all || [];
    /**
  * Checks that none may return true to satisfy rule
  * @type {Array}
  */
    this.none = spec.none || [];
    /**
  * Tags associated to this rule
  * @type {Array}
  */
    this.tags = spec.tags || [];
    if (spec.matches) {
      /**
   * Optional function to test if rule should be run against a node, overrides Rule#matches
   * @type {Function}
   */
      this.matches = createExecutionContext(spec.matches);
    }
  }
  /**
 * Optionally test each node against a `matches` function to determine if the rule should run against
 * a given node.  Defaults to `true`.
 * @return {Boolean}    Whether the rule should run
 */
  Rule.prototype.matches = function() {
    'use strict';
    return true;
  };
  /**
 * Selects `HTMLElement`s based on configured selector
 * @param  {Context} context The resolved Context object
 * @return {Array}           All matching `HTMLElement`s
 */
  Rule.prototype.gather = function(context) {
    'use strict';
    var elements = axe.utils.select(this.selector, context);
    if (this.excludeHidden) {
      return elements.filter(function(element) {
        return !axe.utils.isHidden(element);
      });
    }
    return elements;
  };
  Rule.prototype.runChecks = function(type, node, options, resolve, reject) {
    'use strict';
    var self = this;
    var checkQueue = axe.utils.queue();
    this[type].forEach(function(c) {
      var check = self._audit.checks[c.id || c];
      var option = axe.utils.getCheckOption(check, self.id, options);
      checkQueue.defer(function(res, rej) {
        check.run(node, option, res, rej);
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
  /**
 * Runs the Rule's `evaluate` function
 * @param  {Context}   context  The resolved Context object
 * @param  {Mixed}   options  Options specific to this rule
 * @param  {Function} callback Function to call when evaluate is complete; receives a RuleResult instance
 */
  Rule.prototype.run = function(context, options, resolve, reject) {
    'use strict';
    var nodes = this.gather(context);
    var q = axe.utils.queue();
    var self = this;
    var ruleResult;
    ruleResult = new RuleResult(this);
    nodes.forEach(function(node) {
      if (self.matches(node)) {
        q.defer(function(resolveNode, rejectNode) {
          var checkQueue = axe.utils.queue();
          checkQueue.defer(function(res, rej) {
            self.runChecks('any', node, options, res, rej);
          });
          checkQueue.defer(function(res, rej) {
            self.runChecks('all', node, options, res, rej);
          });
          checkQueue.defer(function(res, rej) {
            self.runChecks('none', node, options, res, rej);
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
                result.node = new axe.utils.DqElement(node);
                ruleResult.nodes.push(result);
              }
            }
            resolveNode();
          }).catch(rejectNode);
        });
      }
    });
    q.then(function() {
      resolve(ruleResult);
    }).catch(reject);
  };
  /**
 * Iterates the rule's Checks looking for ones that have an after function
 * @private
 * @param  {Rule} rule The rule to check for after checks
 * @return {Array}      Checks that have an after function
 */
  function findAfterChecks(rule) {
    'use strict';
    return axe.utils.getAllChecks(rule).map(function(c) {
      var check = rule._audit.checks[c.id || c];
      return check && typeof check.after === 'function' ? check : null;
    }).filter(Boolean);
  }
  /**
 * Finds and collates all results for a given Check on a specific Rule
 * @private
 * @param  {Array} nodes RuleResult#nodes; array of 'detail' objects
 * @param  {String} checkID The ID of the Check to find
 * @return {Array}         Matching CheckResults
 */
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
  /**
 * Runs all of the Rule's Check#after methods
 * @param  {RuleResult} result  The "pre-after" RuleResult
 * @param  {Mixed} options Options specific to the rule
 * @return {RuleResult}         The RuleResult as filtered by after functions
 */
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
  /**
 * Reconfigure a rule after it has been added
 * @param {Object} spec - the attributes to be reconfigured
 */
  Rule.prototype.configure = function(spec) {
    /*jshint maxcomplexity:14 */
    /*jshint maxstatements:20 */
    /*jshint evil:true */
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
      results: [],
      resultGroups: [],
      resultGroupMap: {},
      impact: Object.freeze([ 'minor', 'moderate', 'serious', 'critical' ])
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
    // Freeze everything
    Object.freeze(constants.results);
    Object.freeze(constants.resultGroups);
    Object.freeze(constants.resultGroupMap);
    Object.freeze(constants);
    // Ensure that constants can not be changed
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
  /*jshint devel: true */
  /**
 * Logs a message to the developer console (if it exists and is active).
 */
  axe.log = function() {
    'use strict';
    if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object' && console.log) {
      // IE does not support console.log.apply
      Function.prototype.apply.call(console.log, console, arguments);
    }
  };
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  /**
 * Starts analysis on the current document and its subframes
 * 
 * @param  {Object}   context  The `Context` specification object @see Context
 * @param  {Array}    options  Optional RuleOptions
 * @param  {Function} callback The function to invoke when analysis is complete; receives an array of `RuleResult`s
 */
  axe.a11yCheck = function(context, options, callback) {
    'use strict';
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!options || (typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
      options = {};
    }
    var audit = axe._audit;
    if (!audit) {
      throw new Error('No audit configured');
    }
    options.reporter = options.reporter || audit.reporter || 'v2';
    var reporter = axe.getReporter(options.reporter);
    axe._runRules(context, options, function(results) {
      var res = reporter(results, options, callback);
      if (res !== undefined) {
        callback(res);
      }
    }, axe.log);
  };
  'use strict';
  function cleanupPlugins(resolve, reject) {
    'use strict';
    if (!axe._audit) {
      throw new Error('No audit configured');
    }
    var q = axe.utils.queue();
    // If a plugin fails it's cleanup, we still want the others to run
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
    axe.utils.toArray(document.querySelectorAll('frame, iframe')).forEach(function(frame) {
      q.defer(function(res, rej) {
        return axe.utils.sendCommandToFrame(frame, {
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
  /* global reporters */
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
    if (spec.rules) {
      spec.rules.forEach(function(rule) {
        audit.addRule(rule);
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
  }
  axe.configure = configureChecksRulesAndBranding;
  'use strict';
  /**
 * Searches and returns rules that contain a tag in the list of tags.
 * @param  {Array}   tags  Optional array of tags
 * @return {Array}  Array of rules
 */
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
  /*global Audit, runRules, cleanupPlugins */
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
    if (context.include && !context.include.length) {
      context.include = [ document ];
    }
    var options = data && data.options || {};
    switch (data.command) {
     case 'rules':
      return runRules(context, options, resolve, reject);

     case 'cleanup-plugin':
      return cleanupPlugins(resolve, reject);

     default:
      // go through the registered commands
      if (axe._audit && axe._audit.commands && axe._audit.commands[data.command]) {
        return axe._audit.commands[data.command](data, callback);
      }
    }
  }
  /**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specification" object
 * @private
 */
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
  /*global axe */
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
  /*global Context */
  /*exported runRules */
  /**
 * Starts analysis on the current document and its subframes
 * @private
 * @param  {Object}   context  The `Context` specification object @see Context
 * @param  {Array}    options  Optional RuleOptions
 * @param  {Function} callback The function to invoke when analysis is complete; receives an array of `RuleResult`s
 */
  function runRules(context, options, resolve, reject) {
    'use strict';
    context = new Context(context);
    var q = axe.utils.queue();
    var audit = axe._audit;
    if (context.frames.length) {
      q.defer(function(res, rej) {
        axe.utils.collectResultsFromFrames(context, options, 'rules', null, res, rej);
      });
    }
    q.defer(function(res, rej) {
      audit.run(context, options, res, rej);
    });
    q.then(function(data) {
      try {
        // Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
        var results = axe.utils.mergeResults(data.map(function(d) {
          return {
            results: d
          };
        }));
        // after should only run once, so ensure we are in the top level window
        if (context.initiator) {
          results = audit.after(results, options);
          results.forEach(axe.utils.publishMetaData);
          results = results.map(axe.utils.finalizeRuleResult);
        }
        try {
          resolve(results);
        } catch (e) {
          axe.log(e);
        }
      } catch (e) {
        reject(e);
      }
    }).catch(reject);
  }
  axe._runRules = runRules;
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  /* global Promise */
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
  /**
 * Normalize the optional params of axe.run()
 * @param  {object}   context
 * @param  {object}   options
 * @param  {Function} callback
 * @return {object}            With 3 keys: context, options, callback
 */
  function normalizeRunParams(context, options, callback) {
    'use strict';
    var typeErr = new TypeError('axe.run arguments are invalid');
    // Determine the context
    if (!isContext(context)) {
      if (callback !== undefined) {
        // Either context is invalid or there are too many params
        throw typeErr;
      }
      // Set default and shift one over
      callback = options;
      options = context;
      context = document;
    }
    // Determine the options
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
      if (callback !== undefined) {
        // Either options is invalid or there are too many params
        throw typeErr;
      }
      // Set default and shift one over
      callback = options;
      options = {};
    }
    // Set the callback or noop;
    if (typeof callback !== 'function' && callback !== undefined) {
      throw typeErr;
    }
    return {
      context: context,
      options: options,
      callback: callback || noop
    };
  }
  /**
 * Runs a number of rules against the provided HTML page and returns the
 * resulting issue list
 *
 * @param  {Object}   context  (optional) Defines the scope of the analysis
 * @param  {Object}   options  (optional) Set of options passed into rules or checks
 * @param  {Function} callback (optional) The callback when axe is done, given 2 params:
 *                             - Error    If any errors occured, otherwise null
 *                             - Results  The results object / array, or undefined on error
 * @return {Promise}           Resolves with the axe results. Only available when natively supported
 */
  axe.run = function(context, options, callback) {
    'use strict';
    if (!axe._audit) {
      throw new Error('No audit configured');
    }
    var args = normalizeRunParams(context, options, callback);
    context = args.context;
    options = args.options;
    callback = args.callback;
    // set defaults:
    options.reporter = options.reporter || axe._audit.reporter || 'v1';
    var p = void 0;
    var reject = noop;
    var resolve = noop;
    if (window.Promise && callback === noop) {
      p = new Promise(function(_resolve, _reject) {
        reject = _reject;
        resolve = _resolve;
      });
    }
    axe._runRules(context, options, function(rawResults) {
      var respond = function respond(results) {
        try {
          callback(null, results);
        } catch (e) {
          axe.log(e);
        }
        resolve(results);
      };
      try {
        var reporter = axe.getReporter(options.reporter);
        var results = reporter(rawResults, options, respond);
        if (results !== undefined) {
          respond(results);
        }
      } catch (err) {
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
  /*global helpers */
  /**
 * Finds failing Checks and combines each help message into an array
 * @param  {Object} nodeData Individual "detail" object to generate help messages for
 * @return {String}          failure messages
 */
  helpers.failureSummary = function failureSummary(nodeData) {
    'use strict';
    var failingChecks = {};
    // combine "all" and "none" as messaging is the same
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
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  /*global helpers */
  function normalizeRelatedNodes(node, xpath) {
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
            html: relatedNode.source,
            target: relatedNode.selector
          };
          if (xpath) {
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
      resultObject[key] = (resultObject[key] || []).map(function(ruleResult) {
        ruleResult = Object.assign({}, ruleResult);
        if (Array.isArray(ruleResult.nodes) && ruleResult.nodes.length > 0) {
          ruleResult.nodes = ruleResult.nodes.map(function(subResult) {
            if (_typeof(subResult.node) === 'object') {
              subResult.html = subResult.node.source;
              subResult.target = subResult.node.selector;
              if (options.xpath) {
                subResult.xpath = subResult.node.xpath;
              }
            }
            delete subResult.result;
            delete subResult.node;
            normalizeRelatedNodes(subResult, options.xpath);
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
  /*global helpers */
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
  /*global helpers */
  axe.addReporter('no-passes', function(results, options, callback) {
    'use strict';
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
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
  /*global helpers */
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
  /*global helpers */
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
  /**
 * From a list of values, find the one with the greatest weight according to
 * the supplied map
 * @param  {object} params Contains 3 properties:
 * - map: a map indicating the order of values to run in
 *        example: ['small', 'medium', 'large']
 * - values: Array of values to take the highest from
 * - initial: optional starting value
 */
  axe.utils.aggregate = function(map, values, initial) {
    values = values.slice();
    if (initial) {
      values.push(initial);
    }
    var sorting = values.map(function(val) {
      return map.indexOf(val);
    }).sort();
    // Stupid NodeJS array.sort functor doesn't work!!
    return map[sorting.pop()];
  };
  'use strict';
  var checkMap = [];
  checkMap[axe.constants.PASS_PRIO] = true;
  checkMap[axe.constants.CANTTELL_PRIO] = null;
  checkMap[axe.constants.FAIL_PRIO] = false;
  /**
 * Map over the any / all / none properties
 */
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
    // Create a copy
    var nodeResult = Object.assign({}, nodeResOriginal);
    // map each result value to a priority
    anyAllNone(nodeResult, function(check, type) {
      var i = checkMap.indexOf(check.result);
      // default to cantTell
      check.priority = i !== -1 ? i : axe.constants.CANTTELL_PRIO;
      if (type === 'none') {
        // For none, reverse the outcome
        check.priority = 4 - check.priority;
      }
    });
    // Find the result with the highest priority
    var priorities = anyAllNone(nodeResult, function(c) {
      return c.priority;
    });
    nodeResult.priority = Math.max(priorities.all.reduce(function(a, b) {
      return Math.max(a, b);
    }, 0), priorities.none.reduce(function(a, b) {
      return Math.max(a, b);
    }, 0), // get the lowest passing of 'any' defaulting
    // to 0 by wrapping around 4 to 0 (inapplicable)
    priorities.any.reduce(function(a, b) {
      return Math.min(a, b);
    }, 4) % 4);
    // Of each type, filter out all results not matching the final priority
    var impacts = [];
    checkTypes.forEach(function(type) {
      nodeResult[type] = nodeResult[type].filter(function(check) {
        return check.priority === nodeResult.priority;
      });
      nodeResult[type].forEach(function(check) {
        return impacts.push(check.impact);
      });
    });
    // for failed nodes, define the impact
    if (nodeResult.priority === axe.constants.FAIL_PRIO) {
      nodeResult.impact = axe.utils.aggregate(axe.constants.impact, impacts);
    } else {
      nodeResult.impact = null;
    }
    // Delete the old result and priority properties
    anyAllNone(nodeResult, function(c) {
      delete c.result;
      delete c.priority;
    });
    // Convert the index to a result string value
    nodeResult.result = axe.constants.results[nodeResult.priority];
    delete nodeResult.priority;
    return nodeResult;
  };
  'use strict';
  function copyToGroup(resultObject, subResult, group) {
    var resultCopy = Object.assign({}, subResult);
    resultCopy.nodes = (resultCopy[group] || []).concat();
    axe.constants.resultGroups.forEach(function(group) {
      delete resultCopy[group];
    });
    resultObject[group].push(resultCopy);
  }
  /**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
  axe.utils.aggregateResult = function(results) {
    var resultObject = {};
    // Create an array for each type
    axe.constants.resultGroups.forEach(function(groupName) {
      return resultObject[groupName] = [];
    });
    // Fill the array with nodes
    results.forEach(function(subResult) {
      if (subResult.error) {
        copyToGroup(resultObject, subResult, axe.constants.CANTTELL_GROUP);
      } else {
        if (subResult.result === axe.constants.NA) {
          copyToGroup(resultObject, subResult, axe.constants.NA_GROUP);
        } else {
          axe.constants.resultGroups.forEach(function(group) {
            if (Array.isArray(subResult[group]) && subResult[group].length > 0) {
              copyToGroup(resultObject, subResult, group);
            }
          });
        }
      }
    });
    return resultObject;
  };
  'use strict';
  (function() {
    /**
  * Calculates the result of a Rule based on its types and the result of its child Checks
  * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
  */
    axe.utils.aggregateRule = function(subResults) {
      var ruleResult = {};
      // For each node, retrieve the result and impact
      subResults = subResults.map(function(subResult) {
        // Known result
        if (subResult.any && subResult.all && subResult.none) {
          return axe.utils.aggregateChecks(subResult);
        } else {
          if (Array.isArray(subResult.node)) {
            return axe.utils.finalizeRuleResult(subResult);
          } else {
            throw new TypeError('Invalid Result type');
          }
        }
      });
      // Aggregate the result
      var resultList = subResults.map(function(node) {
        return node.result;
      });
      ruleResult.result = axe.utils.aggregate(axe.constants.results, resultList, ruleResult.result);
      // Create an array for each type
      axe.constants.resultGroups.forEach(function(group) {
        return ruleResult[group] = [];
      });
      // Fill the array with nodes
      subResults.forEach(function(subResult) {
        var groupName = axe.constants.resultGroupMap[subResult.result];
        ruleResult[groupName].push(subResult);
      });
      // Take the highest impact of failed rules
      var failGroup = axe.constants.FAIL_GROUP;
      if (ruleResult[failGroup].length > 0) {
        // Get the impact of all violations
        var impactList = ruleResult[failGroup].map(function(failure) {
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
  /* global axe*/
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
  /**
 * Helper to denote which checks are asyncronous and provide callbacks and pass data back to the CheckResult
 * @param  {CheckResult}   checkResult The target object
 * @param  {Function} callback    The callback to expose when `this.async()` is called
 * @return {Object}               Bound to `this` for a check's fn
 */
  axe.utils.checkHelper = function checkHelper(checkResult, resolve, reject) {
    'use strict';
    return {
      isAsync: false,
      async: function async() {
        this.isAsync = true;
        return function(result) {
          if (result instanceof Error === false) {
            checkResult.value = result;
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
          return new axe.utils.DqElement(element);
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
  /**
 * Deeply clones an object or array
 * @param  {Mixed} obj The object/array to clone
 * @return {Mixed}     A clone of the initial object or array
 */
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
        // jshint forin: false
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
    return new Error(message + ': ' + axe.utils.getSelector(node));
  }
  /**
 * Sends a command to an instance of axe in the specified frame
 * @param  {Element}  node       The frame element to send the message to
 * @param  {Object}   parameters Parameters to pass to the frame
 * @param  {Function} callback   Function to call when results from the frame has returned
 */
  axe.utils.sendCommandToFrame = function(node, parameters, resolve, reject) {
    'use strict';
    var win = node.contentWindow;
    if (!win) {
      axe.log('Frame does not have a content window', node);
      resolve(null);
      return;
    }
    // give the frame .5s to respond to 'axe.ping', else log failed response
    var timeout = setTimeout(function() {
      // This double timeout is important for allowing iframes to respond
      // DO NOT REMOVE
      timeout = setTimeout(function() {
        var errMsg = err('No response from frame', node);
        if (!parameters.debug) {
          axe.log(errMsg);
          resolve(null);
        } else {
          reject(errMsg);
        }
      }, 0);
    }, 500);
    // send 'axe.ping' to the frame
    axe.utils.respondable(win, 'axe.ping', null, undefined, function() {
      clearTimeout(timeout);
      // Give aXe 30s to respond to 'axe.start'
      timeout = setTimeout(function() {
        reject(err('Axe in frame timed out', node));
      }, 3e4);
      // send 'axe.start' and send the callback if it responded
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
  /**
 * Sends a message to axe running in frames to start analysis and collate results (via `mergeResults`)
 * @private
 * @param  {Context}  context   The resolved Context object
 * @param  {Object}   options   Options object (as passed to `runRules`)
 * @param  {string}   command   Command sent to all frames
 * @param  {Array}    parameter Array of values to be passed along side the command
 * @param  {Function} callback  Function to call when results from all frames have returned
 */
  function collectResultsFromFrames(context, options, command, parameter, resolve, reject) {
    'use strict';
    var q = axe.utils.queue();
    var frames = context.frames;
    // Tell each axe running in each frame to collect results
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
    // Combine results from all frames and give it back
    q.then(function(data) {
      resolve(axe.utils.mergeResults(data));
    }).catch(reject);
  }
  axe.utils.collectResultsFromFrames = collectResultsFromFrames;
  'use strict';
  /**
 * Wrapper for Node#contains; PhantomJS does not support Node#contains and erroneously reports that it does
 * @param  {HTMLElement} node      The candidate container node
 * @param  {HTMLElement} otherNode The node to test is contained by `node`
 * @return {Boolean}           Whether `node` contains `otherNode`
 */
  axe.utils.contains = function(node, otherNode) {
    //jshint bitwise: false
    'use strict';
    if (typeof node.contains === 'function') {
      return node.contains(otherNode);
    }
    return !!(node.compareDocumentPosition(otherNode) & 16);
  };
  'use strict';
  /*exported DqElement */
  function truncate(str, maxLength) {
    'use strict';
    maxLength = maxLength || 300;
    if (str.length > maxLength) {
      var index = str.indexOf('>');
      str = str.substring(0, index + 1);
    }
    return str;
  }
  function getSource(element) {
    'use strict';
    var source = element.outerHTML;
    if (!source && typeof XMLSerializer === 'function') {
      source = new XMLSerializer().serializeToString(element);
    }
    return truncate(source || '');
  }
  /**
 * "Serialized" `HTMLElement`. It will calculate the CSS selector,
 * grab the source (outerHTML) and offer an array for storing frame paths
 * @param {HTMLElement} element The element to serialize
 * @param {Object} spec Properties to use in place of the element when instantiated on Elements from other frames
 */
  function DqElement(element, spec) {
    'use strict';
    spec = spec || {};
    /**
  * A unique CSS selector for the element
  * @type {String}
  */
    this.selector = spec.selector || [ axe.utils.getSelector(element) ];
    /**
  * Xpath to the element
  */
    this.xpath = spec.xpath || [ axe.utils.getXpath(element) ];
    /**
  * The generated HTML source code of the element
  * @type {String}
  */
    this.source = spec.source !== undefined ? spec.source : getSource(element);
    /**
  * The element which this object is based off or the containing frame, used for sorting.
  * Excluded in toJSON method.
  * @type {HTMLElement}
  */
    this.element = element;
  }
  DqElement.prototype.toJSON = function() {
    'use strict';
    return {
      selector: this.selector,
      source: this.source,
      xpath: this.xpath
    };
  };
  DqElement.fromFrame = function(node, frame) {
    node.selector.unshift(frame.selector);
    node.xpath.unshift(frame.xpath);
    return new axe.utils.DqElement(frame.element, node);
  };
  axe.utils.DqElement = DqElement;
  'use strict';
  /**
 * Polyfill for Element#matches
 * @param {HTMLElement} node The element to test
 * @param {String} selector The selector to test element against
 * @return {Boolean}
 */
  axe.utils.matchesSelector = function() {
    'use strict';
    var method;
    function getMethod(win) {
      var index, candidate, elProto = win.Element.prototype, candidates = [ 'matches', 'matchesSelector', 'mozMatchesSelector', 'webkitMatchesSelector', 'msMatchesSelector' ], length = candidates.length;
      for (index = 0; index < length; index++) {
        candidate = candidates[index];
        if (elProto[candidate]) {
          return candidate;
        }
      }
    }
    return function(node, selector) {
      if (!method || !node[method]) {
        method = getMethod(node.ownerDocument.defaultView);
      }
      return node[method](selector);
    };
  }();
  'use strict';
  /**
 * Escapes a property value of a CSS selector
 * @see https://github.com/mathiasbynens/CSS.escape/
 * @see http://dev.w3.org/csswg/cssom/#serialize-an-identifier
 * @param  {String} value The piece of the selector to escape
 * @return {String}        The escaped selector
 */
  axe.utils.escapeSelector = function(value) {
    'use strict';
    /*jshint bitwise: true, eqeqeq: false, maxcomplexity: 14, maxstatements: 23, onevar: false, -W041: false */
    var string = String(value);
    var length = string.length;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = string.charCodeAt(0);
    while (++index < length) {
      codeUnit = string.charCodeAt(index);
      // Note: there’s no need to special-case astral symbols, surrogate
      // pairs, or lone surrogates.
      // If the character is NULL (U+0000), then throw an
      // `InvalidCharacterError` exception and terminate these steps.
      if (codeUnit == 0) {
        throw new Error('INVALID_CHARACTER_ERR');
      }
      if (// If the character is in the range [\1-\1F] (U+0001 to U+001F) or
      // [\7F-\9F] (U+007F to U+009F), […]
      codeUnit >= 1 && codeUnit <= 31 || codeUnit >= 127 && codeUnit <= 159 || // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      index == 0 && codeUnit >= 48 && codeUnit <= 57 || // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
      index == 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit == 45) {
        // http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
        result += '\\' + codeUnit.toString(16) + ' ';
        continue;
      }
      // If the character is the second character and is `-` (U+002D) and the
      // first character is `-` as well, […]
      if (index == 1 && codeUnit == 45 && firstCodeUnit == 45) {
        // http://dev.w3.org/csswg/cssom/#escape-a-character
        result += '\\' + string.charAt(index);
        continue;
      }
      // If the character is not handled by one of the above rules and is
      // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
      // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
      // U+005A), or [a-z] (U+0061 to U+007A), […]
      if (codeUnit >= 128 || codeUnit == 45 || codeUnit == 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
        // the character itself
        result += string.charAt(index);
        continue;
      }
      // Otherwise, the escaped character.
      // http://dev.w3.org/csswg/cssom/#escape-a-character
      result += '\\' + string.charAt(index);
    }
    return result;
  };
  'use strict';
  /**
 * Extends metadata onto result object and executes any functions
 * @param  {Object} to   The target of the extend
 * @param  {Object} from Metadata to extend
 */
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
  /**
 * Process rule results, grouping them by outcome
 * @param ruleResult {object}
 * @return {object}
 */
  axe.utils.finalizeRuleResult = function(ruleResult) {
    Object.assign(ruleResult, axe.utils.aggregateRule(ruleResult.nodes));
    delete ruleResult.nodes;
    return ruleResult;
  };
  'use strict';
  var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
  };
  /**
 * Iterates an array of objects looking for a property with a specific value
 * @param  {Array} array  The array of objects to iterate
 * @param  {String} key   The property name to test against
 * @param  {Mixed} value  The value to find
 * @return {Object}       The first matching object or `undefined` if no match
 */
  axe.utils.findBy = function(array, key, value) {
    if (Array.isArray(array)) {
      return array.find(function(obj) {
        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj[key] === value;
      });
    }
  };
  'use strict';
  /**
 * Gets all Checks (or CheckResults) for a given Rule or RuleResult
 * @param {RuleResult|Rule} rule
 */
  axe.utils.getAllChecks = function getAllChecks(object) {
    'use strict';
    var result = [];
    return result.concat(object.any || []).concat(object.all || []).concat(object.none || []);
  };
  'use strict';
  /**
 * Determines which CheckOption to use, either defined on the rule options, global check options or the check itself
 * @param  {Check} check    The Check object
 * @param  {String} ruleID  The ID of the rule
 * @param  {Object} options Options object as passed to main API
 * @return {Object}         The resolved object with `options` and `enabled` keys
 */
  axe.utils.getCheckOption = function(check, ruleID, options) {
    'use strict';
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
      options: opts
    };
  };
  'use strict';
  /**
 * Gets the index of element siblings that have the same nodeName
 * Intended for use with the CSS psuedo-class `:nth-of-type()` and xpath node index
 * @param  {HTMLElement} element The element to test
 * @return {Number}         The number of preceeding siblings with the same nodeName
 * @private
 */
  function nthOfType(element) {
    'use strict';
    var index = 1, type = element.nodeName.toUpperCase();
    /*jshint boss:true */
    element = element.previousElementSibling;
    while (element) {
      if (element.nodeName.toUpperCase() === type) {
        index++;
      }
      element = element.previousElementSibling;
    }
    return index;
  }
  /**
 * Checks if an element has siblings with the same selector
 * @param  {HTMLElement} node     The element to test
 * @param  {String} selector The CSS selector to test
 * @return {Boolean}          Whether any of element's siblings matches selector
 * @private
 */
  function siblingsHaveSameSelector(node, selector) {
    'use strict';
    var index, sibling, siblings = node.parentNode.children;
    if (!siblings) {
      return false;
    }
    var length = siblings.length;
    for (index = 0; index < length; index++) {
      sibling = siblings[index];
      if (sibling !== node && axe.utils.matchesSelector(sibling, selector)) {
        return true;
      }
    }
    return false;
  }
  /**
 * Gets a unique CSS selector
 * @param  {HTMLElement} node The element to get the selector for
 * @return {String}      Unique CSS selector for the node
 */
  axe.utils.getSelector = function getSelector(node) {
    //jshint maxstatements: 21
    'use strict';
    function escape(p) {
      return axe.utils.escapeSelector(p);
    }
    var parts = [], part;
    while (node.parentNode) {
      part = '';
      if (node.id && document.querySelectorAll('#' + axe.utils.escapeSelector(node.id)).length === 1) {
        parts.unshift('#' + axe.utils.escapeSelector(node.id));
        break;
      }
      if (node.className && typeof node.className === 'string') {
        part = '.' + node.className.trim().split(/\s+/).map(escape).join('.');
        if (part === '.' || siblingsHaveSameSelector(node, part)) {
          part = '';
        }
      }
      if (!part) {
        part = axe.utils.escapeSelector(node.nodeName).toLowerCase();
        if (part === 'html' || part === 'body') {
          parts.unshift(part);
          break;
        }
        if (siblingsHaveSameSelector(node, part)) {
          part += ':nth-of-type(' + nthOfType(node) + ')';
        }
      }
      parts.unshift(part);
      node = node.parentNode;
    }
    return parts.join(' > ');
  };
  'use strict';
  /*global axe */
  //jshint maxstatements: false, maxcomplexity: false
  function getXPathArray(node, path) {
    var sibling, count;
    // Gets an XPath for an element which describes its hierarchical location.
    if (!node) {
      return [];
    }
    if (!path && node.nodeType === 9) {
      // special case for when we are called and give the document itself as the starting node
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
    } else {
      if (node.nextSibling) {
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
    }
    if (node.nodeType === 1) {
      var element = {};
      element.str = node.nodeName.toLowerCase();
      // add the id and the count so we can construct robust versions of the xpath
      if (node.getAttribute && node.getAttribute('id') && node.ownerDocument.querySelectorAll('#' + axe.utils.escapeSelector(node.id)).length === 1) {
        element.id = node.getAttribute('id');
      }
      if (count > 1) {
        element.count = count;
      }
      path.push(element);
    }
    return path;
  }
  // Robust is intended to allow xpaths to be robust to changes in the HTML structure of the page
  // This means always use the id when present
  // Non robust means always use the count (i.e. the exact position of the element)
  // Ironically this is a bit of a misnomer because in very, very dynamic pages (e.g. where ids are generated on the fly)
  // the non-ribust Xpaths will work whereas the robust ones will not work
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
  /*exported injectStyle */
  /*global axe*/
  var styleSheet;
  function injectStyle(style) {
    'use strict';
    if (styleSheet && styleSheet.parentNode) {
      // append the style to the existing sheet
      if (styleSheet.styleSheet === undefined) {
        // Not old IE
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
      // Not old IE
      styleSheet.appendChild(document.createTextNode(style));
    } else {
      styleSheet.styleSheet.cssText = style;
    }
    head.appendChild(styleSheet);
    return styleSheet;
  }
  axe.utils.injectStyle = injectStyle;
  'use strict';
  /**
 * Determine whether an element is visible
 *
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} The element's visibilty status
 */
  axe.utils.isHidden = function isHidden(el, recursed) {
    'use strict';
    // 9 === Node.DOCUMENT
    if (el.nodeType === 9) {
      return false;
    }
    var style = window.getComputedStyle(el, null);
    if (!style || !el.parentNode || style.getPropertyValue('display') === 'none' || !recursed && // visibility is only accurate on the first element
    style.getPropertyValue('visibility') === 'hidden' || el.getAttribute('aria-hidden') === 'true') {
      return true;
    }
    return axe.utils.isHidden(el.parentNode, true);
  };
  'use strict';
  /**
* Adds the owning frame's CSS selector onto each instance of DqElement
* @private
* @param  {Array} resultSet `nodes` array on a `RuleResult`
* @param  {HTMLElement} frameElement  The frame element
* @param  {String} frameSelector     Unique CSS selector for the frame
*/
  function pushFrame(resultSet, frameElement, frameSelector) {
    'use strict';
    var frameXpath = axe.utils.getXpath(frameElement);
    var frameSpec = {
      element: frameElement,
      selector: frameSelector,
      xpath: frameXpath
    };
    resultSet.forEach(function(res) {
      res.node = axe.utils.DqElement.fromFrame(res.node, frameSpec);
      var checks = axe.utils.getAllChecks(res);
      if (checks.length) {
        checks.forEach(function(check) {
          check.relatedNodes = check.relatedNodes.map(function(node) {
            return axe.utils.DqElement.fromFrame(node, frameSpec);
          });
        });
      }
    });
  }
  /**
* Adds `to` to `from` and then re-sorts by DOM order
* @private
* @param  {Array} target  `nodes` array on a `RuleResult`
* @param  {Array} to   `nodes` array on a `RuleResult`
* @return {Array}      The merged and sorted result
*/
  function spliceNodes(target, to) {
    'use strict';
    var firstFromFrame = to[0].node, sorterResult, t;
    for (var i = 0, l = target.length; i < l; i++) {
      t = target[i].node;
      sorterResult = axe.utils.nodeSorter(t.element, firstFromFrame.element);
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
  /**
* Merges one or more RuleResults (possibly from different frames) into one RuleResult
* @private
* @param  {Array} frameResults  Array of objects including the RuleResults as `results` and frame as `frame`
* @return {Array}              The merged RuleResults; should only have one result per rule
*/
  axe.utils.mergeResults = function mergeResults(frameResults) {
    'use strict';
    var result = [];
    frameResults.forEach(function(frameResult) {
      var results = normalizeResult(frameResult);
      if (!results || !results.length) {
        return;
      }
      results.forEach(function(ruleResult) {
        if (ruleResult.nodes && frameResult.frame) {
          pushFrame(ruleResult.nodes, frameResult.frameElement, frameResult.frame);
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
  /**
 * Array#sort callback to sort nodes by DOM order
 * @private
 * @param  {Node} a
 * @param  {Node} b
 * @return {Integer}   @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Sort
 */
  axe.utils.nodeSorter = function nodeSorter(a, b) {
    /*jshint bitwise: false */
    'use strict';
    if (a === b) {
      return 0;
    }
    if (a.compareDocumentPosition(b) & 4) {
      // a before b
      return -1;
    }
    return 1;
  };
  'use strict';
  // jshint ignore: start
  /*
 These pollyfills came directly from the ES Specification it's self
 Contained within:
  - Object.assign
  - Array.prototype.find
*/
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
    Array.prototype.find = function(predicate) {
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
    };
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
      // startup
      document.head.appendChild(style);
      while ((current = document.elementFromPoint(x, y)) && elements.indexOf(current) === -1) {
        // push the element and its current style
        elements.push(current);
        previousPointerEvents.push({
          value: current.style.getPropertyValue(cssProp),
          priority: current.style.getPropertyPriority(cssProp)
        });
        // add "pointer-events: none", to get to the underlying element
        current.style.setProperty(cssProp, cssDisableVal, 'important');
      }
      // restore the previous pointer-events values
      for (i = previousPointerEvents.length; !!(d = previousPointerEvents[--i]); ) {
        elements[i].style.setProperty(cssProp, d.value ? d.value : '', d.priority);
      }
      // teardown;
      document.head.removeChild(style);
      return elements;
    };
  };
  if (typeof window.addEventListener === 'function') {
    document.elementsFromPoint = axe.utils.pollyfillElementsFromPoint();
  }
  if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement) {
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
          // NaN !== NaN
          return true;
        }
        k++;
      }
      return false;
    };
  }
  // Production steps of ECMA-262, Edition 5, 15.4.4.17
  // Reference: http://es5.github.io/#x15.4.4.17
  if (!Array.prototype.some) {
    Array.prototype.some = function(fun) {
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
    };
  }
  'use strict';
  function extender(checksData, shouldBeTrue) {
    'use strict';
    return function(check) {
      var sourceData = checksData[check.id] || {};
      var messages = sourceData.messages || {};
      var data = Object.assign({}, sourceData);
      delete data.messages;
      data.message = check.result === shouldBeTrue ? messages.pass : messages.fail;
      axe.utils.extendMetaData(check, data);
    };
  }
  /**
 * Publish metadata from axe._audit.data
 * @param  {RuleResult} result Result to publish to
 * @private
 */
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
    /**
  * Create an asynchronous "queue", list of functions to be invoked in parallel, but not necessarily returned in order
  * @return {Queue} The newly generated "queue"
  */
    function queue() {
      var tasks = [];
      var started = 0;
      var remaining = 0;
      // number of tasks not yet finished
      var completeQueue = noop;
      var complete = false;
      var err;
      // By default, wait until the next tick,
      // if no catch was set, throw to console.
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
        // reset tasks
        completeQueue = noop;
        // notify catch
        failed(msg);
        // return unfinished work
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
        /**
    * Defer a function that may or may not run asynchronously.
    *
    * First parameter should be the function to execute with subsequent
    * parameters being passed as arguments to that function
    */
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
          } else {
            if (complete) {
              throw new Error('Queue already completed');
            }
          }
          tasks.push(fn);
          ++remaining;
          pop();
          return q;
        },
        /**
    * The callback to execute once all "deferred" functions have completed.  Will only be invoked once.
    * @param  {Function} f The callback, receives an array of the return/callbacked
    * values of each of the "deferred" functions
    */
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
        'catch': function _catch(fn) {
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
        /**
    * Abort the "queue" and prevent `then` function from firing
    * @param  {Function} fn The callback to execute; receives an array of the results which have completed
    */
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
  /*global uuid, utils, axe */
  (function(exports) {
    'use strict';
    var messages = {}, subscribers = {};
    /**
  * get the unique string to be used to identify our instance of aXe
  * @private
  */
    function _getSource() {
      var application = 'axe', version = '', src;
      if (typeof axe !== 'undefined' && axe._audit && !axe._audit.application) {
        application = axe._audit.application;
      }
      if (typeof axe !== 'undefined') {
        version = axe.version;
      }
      src = application + '.' + version;
      return src;
    }
    /**
  * Verify the received message is from the "respondable" module
  * @private
  * @param  {Object} postedMessage The message received via postMessage
  * @return {Boolean}              `true` if the message is verified from respondable
  */
    function verify(postedMessage) {
      if (// Check incoming message is valid
      (typeof postedMessage === 'undefined' ? 'undefined' : _typeof(postedMessage)) === 'object' && typeof postedMessage.uuid === 'string' && postedMessage._respondable === true) {
        var messageSource = _getSource();
        // Check the version matches
        // Allow free communication with axe test
        return postedMessage._source === messageSource || postedMessage._source === 'axe.x.y.z' || messageSource === 'axe.x.y.z';
      }
      return false;
    }
    /**
  * Posts the message to correct frame.
  * This abstraction necessary because IE9 & 10 do not support posting Objects; only strings
  * @private
  * @param  {Window}   win      The `window` to post the message to
  * @param  {String}   topic    The topic of the message
  * @param  {Object}   message  The message content
  * @param  {String}   uuid     The UUID, or pseudo-unique ID of the message
  * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
  * @param  {Function} callback The function to invoke when/if the message is responded to
  */
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
    /**
  * Post a message to a window who may or may not respond to it.
  * @param  {Window}   win      The window to post the message to
  * @param  {String}   topic    The topic of the message
  * @param  {Object}   message  The message content
  * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
  * @param  {Function} callback The function to invoke when/if the message is responded to
  */
    function respondable(win, topic, message, keepalive, callback) {
      var id = uuid.v1();
      post(win, topic, message, id, keepalive, callback);
    }
    /**
  * Subscribe to messages sent via the `respondable` module.
  *
  * Axe._load uses this to listen for messages from other frames
  *
  * @param  {String}   topic    The topic to listen to
  * @param  {Function} callback The function to invoke when a message is received
  */
    respondable.subscribe = function(topic, callback) {
      subscribers[topic] = callback;
    };
    /**
  * checks if the current context is inside a frame
  * @return {Boolean}
  */
    respondable.isInFrame = function(win) {
      win = win || window;
      return !!win.frameElement;
    };
    /**
  * Helper closure to create a function that may be used to respond to a message
  * @private
  * @param  {Window} source The window from which the message originated
  * @param  {String} topic  The topic of the message
  * @param  {String} uuid   The "unique" ID of the original message
  * @return {Function}      A function that may be invoked to respond to the message
  */
    function createResponder(source, topic, uuid) {
      return function(message, keepalive, callback) {
        post(source, topic, message, uuid, keepalive, callback);
      };
    }
    /**
  * Publishes the "respondable" message to the appropriate subscriber
  * @private
  * @param  {Event} event The event object of the postMessage
  * @param  {Object} data  The data sent with the message
  * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
  */
    function publish(target, data, keepalive) {
      var topic = data.topic;
      var subscriber = subscribers[topic];
      if (subscriber) {
        var responder = createResponder(target, null, data.uuid);
        subscriber(data.message, keepalive, responder);
      }
    }
    /**
  * Convert a javascript Error into something that can be stringified
  * @param  {Error} error  Any type of error
  * @return {Object}       Processable object
  */
    function buildErrorObject(error) {
      var msg = error.message || 'Unknown error occurred';
      var ErrConstructor = window[error.name] || Error;
      if (error.stack) {
        msg += '\n' + error.stack.replace(error.message, '');
      }
      return new ErrConstructor(msg);
    }
    /**
  * Parse the received message for processing
  * @param  {string} dataString Message received
  * @return {object}            Object to be used for pub/sub
  */
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
        // jshint maxstatements: 20
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
  /**
 * Check if a rule matches the value of runOnly type=tag
 * @private
 * @param  {object} rule
 * @param  {object}	runOnly Value of runOnly with type=tags
 * @return {bool}
 */
  function matchTags(rule, runOnly) {
    // jshint maxcomplexity: 11
    'use strict';
    var include, exclude, matching;
    var defaultExclude = axe._audit && axe._audit.tagExclude ? axe._audit.tagExclude : [];
    // normalize include/exclude
    if (runOnly.include || runOnly.exclude) {
      // Wrap include and exclude if it's not already an array
      include = runOnly.include || [];
      include = Array.isArray(include) ? include : [ include ];
      exclude = runOnly.exclude || [];
      exclude = Array.isArray(exclude) ? exclude : [ exclude ];
      // add defaults, unless mentioned in include
      exclude = exclude.concat(defaultExclude.filter(function(tag) {
        return include.indexOf(tag) === -1;
      }));
    } else {
      include = Array.isArray(runOnly) ? runOnly : [ runOnly ];
      // exclude the defaults not included
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
  /**
 * Determines whether a rule should run
 * @param  {Rule}    rule     The rule to test
 * @param  {Context} context  The context of the Audit
 * @param  {Object}  options  Options object
 * @return {Boolean}
 */
  axe.utils.ruleShouldRun = function(rule, context, options) {
    'use strict';
    var runOnly = options.runOnly || {};
    var ruleOptions = (options.rules || {})[rule.id];
    // Never run page level rules if the context is not on the page
    if (rule.pageLevel && !context.page) {
      return false;
    } else {
      if (runOnly.type === 'rule') {
        return runOnly.values.indexOf(rule.id) !== -1;
      } else {
        if (ruleOptions && typeof ruleOptions.enabled === 'boolean') {
          return ruleOptions.enabled;
        } else {
          if (runOnly.type === 'tag' && runOnly.values) {
            return matchTags(rule, runOnly.values);
          } else {
            return matchTags(rule, []);
          }
        }
      }
    }
  };
  'use strict';
  /**
 * Get the deepest node in a given collection
 * @private
 * @param  {Array} collection Array of nodes to test
 * @return {Node}             The deepest node
 */
  function getDeepest(collection) {
    'use strict';
    return collection.sort(function(a, b) {
      if (axe.utils.contains(a, b)) {
        return 1;
      }
      return -1;
    })[0];
  }
  /**
 * Determines if a node is included or excluded in a given context
 * @private
 * @param  {Node}  node     The node to test
 * @param  {Object}  context "Resolved" context object, @see resolveContext
 * @return {Boolean}         [description]
 */
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
  /**
 * Pushes unique nodes that are in context to an array
 * @private
 * @param  {Array} result  The array to push to
 * @param  {Array} nodes   The list of nodes to push
 * @param  {Object} context The "resolved" context object, @see resolveContext
 */
  function pushNode(result, nodes, context) {
    'use strict';
    for (var i = 0, l = nodes.length; i < l; i++) {
      if (result.indexOf(nodes[i]) === -1 && isNodeInContext(nodes[i], context)) {
        result.push(nodes[i]);
      }
    }
  }
  /**
 * Selects elements which match `select` that are included and excluded via the `Context` object
 * @param  {String} selector  CSS selector of the HTMLElements to select
 * @param  {Context} context  The "resolved" context object, @see Context
 * @return {Array}            Matching nodes sorted by DOM order
 */
  axe.utils.select = function select(selector, context) {
    'use strict';
    var result = [], candidate;
    for (var i = 0, l = context.include.length; i < l; i++) {
      candidate = context.include[i];
      if (candidate.nodeType === candidate.ELEMENT_NODE && axe.utils.matchesSelector(candidate, selector)) {
        pushNode(result, [ candidate ], context);
      }
      pushNode(result, candidate.querySelectorAll(selector), context);
    }
    return result.sort(axe.utils.nodeSorter);
  };
  'use strict';
  /**
 * Converts array-like (numerical indicies and `length` property) structures to actual, real arrays
 * @param  {Mixed} thing Array-like thing to convert
 * @return {Array}
 */
  axe.utils.toArray = function(thing) {
    'use strict';
    return Array.prototype.slice.call(thing);
  };
  'use strict';
  /*jshint bitwise: false, eqeqeq: false, curly: false, strict: false, eqnull: true,
maxstatements: false, maxcomplexity: false */
  //     uuid.js
  //
  //     Copyright (c) 2010-2012 Robert Kieffer
  //     MIT License - http://opensource.org/licenses/mit-license.php
  var uuid;
  (function(_global) {
    // Unique ID creation requires a high quality random # generator.  We feature
    // detect to determine the best RNG source, normalizing to a function that
    // returns 128-bits of randomness, since that's what's usually required
    var _rng;
    // Allow for MSIE11 msCrypto
    var _crypto = _global.crypto || _global.msCrypto;
    if (!_rng && _crypto && _crypto.getRandomValues) {
      // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
      //
      // Moderately fast, high quality
      var _rnds8 = new Uint8Array(16);
      _rng = function whatwgRNG() {
        _crypto.getRandomValues(_rnds8);
        return _rnds8;
      };
    }
    if (!_rng) {
      // Math.random()-based (RNG)
      //
      // If all else fails, use Math.random().  It's fast, but is of unspecified
      // quality.
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
    // Buffer class to use
    var BufferClass = typeof _global.Buffer == 'function' ? _global.Buffer : Array;
    // Maps for number <-> hex string conversion
    var _byteToHex = [];
    var _hexToByte = {};
    for (var i = 0; i < 256; i++) {
      _byteToHex[i] = (i + 256).toString(16).substr(1);
      _hexToByte[_byteToHex[i]] = i;
    }
    // **`parse()` - Parse a UUID into it's component bytes**
    function parse(s, buf, offset) {
      var i = buf && offset || 0, ii = 0;
      buf = buf || [];
      s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
        if (ii < 16) {
          // Don't overflow!
          buf[i + ii++] = _hexToByte[oct];
        }
      });
      // Zero out remaining bytes if string was short
      while (ii < 16) {
        buf[i + ii++] = 0;
      }
      return buf;
    }
    // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
    function unparse(buf, offset) {
      var i = offset || 0, bth = _byteToHex;
      return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
    }
    // **`v1()` - Generate time-based UUID**
    //
    // Inspired by https://github.com/LiosK/UUID.js
    // and http://docs.python.org/library/uuid.html
    // random #'s we need to init node and clockseq
    var _seedBytes = _rng();
    // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
    var _nodeId = [ _seedBytes[0] | 1, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5] ];
    // Per 4.2.2, randomize (14 bit) clockseq
    var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 16383;
    // Previous uuid creation time
    var _lastMSecs = 0, _lastNSecs = 0;
    // See https://github.com/broofa/node-uuid for API details
    function v1(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || [];
      options = options || {};
      var clockseq = options.clockseq != null ? options.clockseq : _clockseq;
      // UUID timestamps are 100 nano-second units since the Gregorian epoch,
      // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
      // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
      // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
      var msecs = options.msecs != null ? options.msecs : new Date().getTime();
      // Per 4.2.1.2, use count of uuid's generated during the current clock
      // cycle to simulate higher resolution clock
      var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;
      // Time since last uuid creation (in msecs)
      var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      // Per 4.2.1.2, Bump clockseq on clock regression
      if (dt < 0 && options.clockseq == null) {
        clockseq = clockseq + 1 & 16383;
      }
      // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
      // time interval
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
        nsecs = 0;
      }
      // Per 4.2.1.2 Throw error if too many uuids are requested
      if (nsecs >= 1e4) {
        throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
      msecs += 122192928e5;
      // `time_low`
      var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      // `time_mid`
      var tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      // `time_high_and_version`
      b[i++] = tmh >>> 24 & 15 | 16;
      // include version
      b[i++] = tmh >>> 16 & 255;
      // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
      b[i++] = clockseq >>> 8 | 128;
      // `clock_seq_low`
      b[i++] = clockseq & 255;
      // `node`
      var node = options.node || _nodeId;
      for (var n = 0; n < 6; n++) {
        b[i + n] = node[n];
      }
      return buf ? buf : unparse(b);
    }
    // **`v4()` - Generate random UUID**
    // See https://github.com/broofa/node-uuid for API details
    function v4(options, buf, offset) {
      // Deprecated - 'format' argument, as supported in v1.2
      var i = buf && offset || 0;
      if (typeof options == 'string') {
        buf = options == 'binary' ? new BufferClass(16) : null;
        options = null;
      }
      options = options || {};
      var rnds = options.random || (options.rng || _rng)();
      // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      // Copy bytes to buffer, if provided
      if (buf) {
        for (var ii = 0; ii < 16; ii++) {
          buf[i + ii] = rnds[ii];
        }
      }
      return buf || unparse(rnds);
    }
    // Export public API
    uuid = v4;
    uuid.v1 = v1;
    uuid.v4 = v4;
    uuid.parse = parse;
    uuid.unparse = unparse;
    uuid.BufferClass = BufferClass;
  })(window);
  'use strict';
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
          description: 'Ensures related <input type="checkbox"> elements have a group and that that group designation is consistent',
          help: 'Checkbox inputs with the same name attribute value must be part of a group'
        },
        'color-contrast': {
          description: 'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
          help: 'Elements must have sufficient color contrast'
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
        'duplicate-id': {
          description: 'Ensures every id attribute value is unique',
          help: 'id attribute value must be unique'
        },
        'empty-heading': {
          description: 'Ensures headings have discernible text',
          help: 'Headings must not be empty'
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
        'href-no-hash': {
          description: 'Ensures that href values are valid link references to promote only using anchors as links',
          help: 'Anchors must only be used as links and must therefore have an href value that is a valid reference. Otherwise you should probably usa a button'
        },
        'html-has-lang': {
          description: 'Ensures every HTML document has a lang attribute',
          help: '<html> element must have a lang attribute'
        },
        'html-lang-valid': {
          description: 'Ensures the lang attribute of the <html> element has a valid value',
          help: '<html> element must have a valid value for the lang attribute'
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
        radiogroup: {
          description: 'Ensures related <input type="radio"> elements have a group and that the group designation is consistent',
          help: 'Radio inputs with the same name attribute value must be part of a group'
        },
        region: {
          description: 'Ensures all content is contained within a landmark region',
          help: 'Content should be contained in a landmark region'
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
          description: 'Ensures the first link on the page is a skip link',
          help: 'The page should have a skip link as its first link'
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
          help: 'All th element and elements with role=columnheader/rowheader must data cells which it describes'
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
          impact: 'critical',
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
          impact: 'critical',
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
          impact: 'critical',
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
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'aria-labelledby attribute exists and references elements that are visible to screen readers';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty or not visible';
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
            fail: function anonymous(it) {
              var out = 'The multimedia element does not have a captions track';
              return out;
            }
          }
        },
        'is-on-screen': {
          impact: 'minor',
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
          impact: 'moderate',
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
          impact: 'moderate',
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
          impact: 'critical',
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
          impact: 'moderate',
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
              } else {
                if (code === 'empty-legend') {
                  out += 'Legend does not have text that is visible to screen readers';
                } else {
                  if (code === 'mixed-inputs') {
                    out += 'Fieldset contains unrelated inputs';
                  } else {
                    if (code === 'no-group-label') {
                      out += 'ARIA group does not have aria-label or aria-labelledby';
                    } else {
                      if (code === 'group-mixed-inputs') {
                        out += 'ARIA group contains unrelated inputs';
                      } else {
                        out += 'Element does not have a containing fieldset or ARIA group';
                      }
                    }
                  }
                }
              }
              return out;
            }
          }
        },
        'color-contrast': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = '';
              if (it.data && it.data.contrastRatio) {
                out += 'Element has sufficient color contrast of ' + it.data.contrastRatio;
              } else {
                out += 'Unable to determine contrast ratio';
              }
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element has insufficient color contrast of ' + it.data.contrastRatio + ' (foreground color: ' + it.data.fgColor + ', background color: ' + it.data.bgColor + ', font size: ' + it.data.fontSize + ', font weight: ' + it.data.fontWeight + ')';
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
          impact: 'moderate',
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
        'duplicate-id': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Document has no elements that share the same id attribute';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Document has multiple elements with the same id attribute: ' + it.data;
              return out;
            }
          }
        },
        'has-visible-text': {
          impact: 'critical',
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
          impact: 'minor',
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
        'href-no-hash': {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Anchor does not have a href quals #';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Anchor has a href quals #';
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
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'Links can be distinguished from surrounding text in a way that does not rely on color';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Links can not be distinguished from surrounding text in a way that does not rely on color';
              return out;
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
          impact: 'critical',
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
              var out = '<meta> tag does not prevent significant zooming';
              return out;
            },
            fail: function anonymous(it) {
              var out = '<meta> tag limits zooming';
              return out;
            }
          }
        },
        'meta-viewport': {
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = '<meta> tag does not disable zooming';
              return out;
            },
            fail: function anonymous(it) {
              var out = '<meta> tag disables zooming';
              return out;
            }
          }
        },
        region: {
          impact: 'moderate',
          messages: {
            pass: function anonymous(it) {
              var out = 'Content contained by ARIA landmark';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Content not contained by an ARIA landmark';
              return out;
            }
          }
        },
        'html5-scope': {
          impact: 'serious',
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
          impact: 'critical',
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
          impact: 'moderate',
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
          impact: 'critical',
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
          impact: 'critical',
          messages: {
            pass: function anonymous(it) {
              var out = 'All table header cells refer to data cells';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Not all table header cells refer to data cells';
              return out;
            }
          }
        },
        description: {
          impact: 'serious',
          messages: {
            pass: function anonymous(it) {
              var out = 'The multimedia element has an audio description track';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'The multimedia element does not have an audio description track';
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
      }
    },
    rules: [ {
      id: 'accesskeys',
      selector: '[accesskey]',
      excludeHidden: false,
      tags: [ 'wcag2a', 'wcag211' ],
      all: [],
      any: [],
      none: [ 'accesskeys' ]
    }, {
      id: 'area-alt',
      selector: 'map area[href]',
      excludeHidden: false,
      tags: [ 'wcag2a', 'wcag111', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'non-empty-alt', 'non-empty-title', 'aria-label', 'aria-labelledby' ],
      none: []
    }, {
      id: 'aria-allowed-attr',
      matches: function matches(node) {
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
      tags: [ 'wcag2a', 'wcag411', 'wcag412' ],
      all: [],
      any: [ 'aria-allowed-attr' ],
      none: []
    }, {
      id: 'aria-required-attr',
      selector: '[role]',
      tags: [ 'wcag2a', 'wcag411', 'wcag412' ],
      all: [],
      any: [ 'aria-required-attr' ],
      none: []
    }, {
      id: 'aria-required-children',
      selector: '[role]',
      tags: [ 'wcag2a', 'wcag131' ],
      all: [],
      any: [ 'aria-required-children' ],
      none: []
    }, {
      id: 'aria-required-parent',
      selector: '[role]',
      tags: [ 'wcag2a', 'wcag131' ],
      all: [],
      any: [ 'aria-required-parent' ],
      none: []
    }, {
      id: 'aria-roles',
      selector: '[role]',
      tags: [ 'wcag2a', 'wcag131', 'wcag411', 'wcag412' ],
      all: [],
      any: [],
      none: [ 'invalidrole', 'abstractrole' ]
    }, {
      id: 'aria-valid-attr-value',
      matches: function matches(node) {
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
      tags: [ 'wcag2a', 'wcag131', 'wcag411', 'wcag412' ],
      all: [],
      any: [ {
        options: [],
        id: 'aria-valid-attr-value'
      } ],
      none: []
    }, {
      id: 'aria-valid-attr',
      matches: function matches(node) {
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
      tags: [ 'wcag2a', 'wcag411' ],
      all: [],
      any: [ {
        options: [],
        id: 'aria-valid-attr'
      } ],
      none: []
    }, {
      id: 'audio-caption',
      selector: 'audio',
      excludeHidden: false,
      tags: [ 'wcag2a', 'wcag122', 'section508', 'section508.22.a' ],
      all: [],
      any: [],
      none: [ 'caption' ]
    }, {
      id: 'blink',
      selector: 'blink',
      excludeHidden: false,
      tags: [ 'wcag2a', 'wcag222', 'section508', 'section508.22.j' ],
      all: [],
      any: [],
      none: [ 'is-on-screen' ]
    }, {
      id: 'button-name',
      selector: 'button, [role="button"], input[type="button"], input[type="submit"], input[type="reset"]',
      tags: [ 'wcag2a', 'wcag412', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'non-empty-if-present', 'non-empty-value', 'button-has-visible-text', 'aria-label', 'aria-labelledby', 'role-presentation', 'role-none' ],
      none: [ 'focusable-no-name' ]
    }, {
      id: 'bypass',
      selector: 'html',
      pageLevel: true,
      matches: function matches(node) {
        return !!node.querySelector('a[href]');
      },
      tags: [ 'wcag2a', 'wcag241', 'section508', 'section508.22.o' ],
      all: [],
      any: [ 'internal-link-present', 'header-present', 'landmark' ],
      none: []
    }, {
      id: 'checkboxgroup',
      selector: 'input[type=checkbox][name]',
      tags: [ 'best-practice' ],
      all: [],
      any: [ 'group-labelledby', 'fieldset' ],
      none: []
    }, {
      id: 'color-contrast',
      matches: function matches(node) {
        /* global document */
        var nodeName = node.nodeName.toUpperCase(), nodeType = node.type, doc = document;
        if (node.getAttribute('aria-disabled') === 'true') {
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
        if (nodeName === 'BUTTON' && node.disabled) {
          return false;
        }
        // check if the element is a label for a disabled control
        if (nodeName === 'LABEL') {
          // explicit label of disabled input
          var candidate = node.htmlFor && doc.getElementById(node.htmlFor);
          if (candidate && candidate.disabled) {
            return false;
          }
          var candidate = node.querySelector('input:not([type="hidden"]):not([type="image"])' + ':not([type="button"]):not([type="submit"]):not([type="reset"]), select, textarea');
          if (candidate && candidate.disabled) {
            return false;
          }
        }
        // label of disabled control associated w/ aria-labelledby
        if (node.id) {
          var candidate = doc.querySelector('[aria-labelledby~=' + axe.commons.utils.escapeSelector(node.id) + ']');
          if (candidate && candidate.disabled) {
            return false;
          }
        }
        if (axe.commons.text.visible(node, false, true) === '') {
          return false;
        }
        var range = document.createRange(), childNodes = node.childNodes, length = childNodes.length, child, index;
        for (index = 0; index < length; index++) {
          child = childNodes[index];
          if (child.nodeType === 3 && axe.commons.text.sanitize(child.nodeValue) !== '') {
            range.selectNodeContents(child);
          }
        }
        var rects = range.getClientRects();
        length = rects.length;
        for (index = 0; index < length; index++) {
          //check to see if the rectangle impinges
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
      tags: [ 'wcag2aa', 'wcag143' ],
      all: [],
      any: [ 'color-contrast' ],
      none: []
    }, {
      id: 'definition-list',
      selector: 'dl:not([role])',
      tags: [ 'wcag2a', 'wcag131' ],
      all: [],
      any: [],
      none: [ 'structured-dlitems', 'only-dlitems' ]
    }, {
      id: 'dlitem',
      selector: 'dd:not([role]), dt:not([role])',
      tags: [ 'wcag2a', 'wcag131' ],
      all: [],
      any: [ 'dlitem' ],
      none: []
    }, {
      id: 'document-title',
      selector: 'html',
      matches: function matches(node) {
        /* global window */
        return window.self === window.top;
      },
      tags: [ 'wcag2a', 'wcag242' ],
      all: [],
      any: [ 'doc-has-title' ],
      none: []
    }, {
      id: 'duplicate-id',
      selector: '[id]',
      excludeHidden: false,
      tags: [ 'wcag2a', 'wcag411' ],
      all: [],
      any: [ 'duplicate-id' ],
      none: []
    }, {
      id: 'empty-heading',
      selector: 'h1, h2, h3, h4, h5, h6, [role="heading"]',
      enabled: true,
      tags: [ 'best-practice' ],
      all: [],
      any: [ 'has-visible-text', 'role-presentation', 'role-none' ],
      none: []
    }, {
      id: 'frame-title-unique',
      selector: 'frame[title]:not([title=\'\']), iframe[title]:not([title=\'\'])',
      matches: function matches(node) {
        var title = node.getAttribute('title');
        return !!(title ? axe.commons.text.sanitize(title).trim() : '');
      },
      tags: [ 'best-practice' ],
      all: [],
      any: [],
      none: [ 'unique-frame-title' ]
    }, {
      id: 'frame-title',
      selector: 'frame, iframe',
      tags: [ 'wcag2a', 'wcag241', 'section508', 'section508.22.i' ],
      all: [],
      any: [ 'aria-label', 'aria-labelledby', 'non-empty-title', 'role-presentation', 'role-none' ],
      none: []
    }, {
      id: 'heading-order',
      selector: 'h1,h2,h3,h4,h5,h6,[role=heading]',
      enabled: false,
      tags: [ 'best-practice' ],
      all: [],
      any: [ 'heading-order' ],
      none: []
    }, {
      id: 'href-no-hash',
      selector: 'a[href]',
      enabled: false,
      tags: [ 'best-practice' ],
      all: [],
      any: [ 'href-no-hash' ],
      none: []
    }, {
      id: 'html-has-lang',
      selector: 'html',
      tags: [ 'wcag2a', 'wcag311' ],
      all: [],
      any: [ 'has-lang' ],
      none: []
    }, {
      id: 'html-lang-valid',
      selector: 'html[lang]',
      tags: [ 'wcag2a', 'wcag311' ],
      all: [],
      any: [],
      none: [ {
        options: [ 'aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'in', 'io', 'is', 'it', 'iu', 'iw', 'ja', 'ji', 'jv', 'jw', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mo', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu' ],
        id: 'valid-lang'
      } ]
    }, {
      id: 'image-alt',
      selector: 'img',
      tags: [ 'wcag2a', 'wcag111', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'has-alt', 'aria-label', 'aria-labelledby', 'non-empty-title', 'role-presentation', 'role-none' ],
      none: []
    }, {
      id: 'image-redundant-alt',
      selector: 'button, [role="button"], a[href], p, li, td, th',
      tags: [ 'best-practice' ],
      all: [],
      any: [],
      none: [ 'duplicate-img-label' ]
    }, {
      id: 'input-image-alt',
      selector: 'input[type="image"]',
      tags: [ 'wcag2a', 'wcag111', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'non-empty-alt', 'aria-label', 'aria-labelledby', 'non-empty-title' ],
      none: []
    }, {
      id: 'label-title-only',
      selector: 'input:not([type=\'hidden\']):not([type=\'image\']):not([type=\'button\']):not([type=\'submit\']):not([type=\'reset\']), select, textarea',
      enabled: false,
      tags: [ 'best-practice' ],
      all: [],
      any: [],
      none: [ 'title-only' ]
    }, {
      id: 'label',
      selector: 'input:not([type=\'hidden\']):not([type=\'image\']):not([type=\'button\']):not([type=\'submit\']):not([type=\'reset\']), select, textarea',
      tags: [ 'wcag2a', 'wcag332', 'wcag131', 'section508', 'section508.22.n' ],
      all: [],
      any: [ 'aria-label', 'aria-labelledby', 'implicit-label', 'explicit-label', 'non-empty-title' ],
      none: [ 'help-same-as-label', 'multiple-label' ]
    }, {
      id: 'layout-table',
      selector: 'table',
      matches: function matches(node) {
        return !axe.commons.table.isDataTable(node);
      },
      tags: [ 'wcag2a', 'wcag131' ],
      all: [],
      any: [],
      none: [ 'has-th', 'has-caption', 'has-summary' ]
    }, {
      id: 'link-in-text-block',
      selector: 'a[href]:not([role]), *[role=link]',
      matches: function matches(node) {
        var text = axe.commons.text.sanitize(node.textContent);
        if (!text) {
          return false;
        }
        if (!axe.commons.dom.isVisible(node, false)) {
          return false;
        }
        return axe.commons.dom.isInTextBlock(node);
      },
      excludeHidden: false,
      enabled: false,
      tags: [ 'experimental', 'wcag2a', 'wcag141' ],
      all: [ 'link-in-text-block' ],
      any: [],
      none: []
    }, {
      id: 'link-name',
      selector: 'a[href]:not([role="button"]), [role=link][href]',
      tags: [ 'wcag2a', 'wcag111', 'wcag412', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', 'role-presentation', 'role-none' ],
      none: [ 'focusable-no-name' ]
    }, {
      id: 'list',
      selector: 'ul:not([role]), ol:not([role])',
      tags: [ 'wcag2a', 'wcag131' ],
      all: [],
      any: [],
      none: [ 'only-listitems' ]
    }, {
      id: 'listitem',
      selector: 'li:not([role])',
      tags: [ 'wcag2a', 'wcag131' ],
      all: [],
      any: [ 'listitem' ],
      none: []
    }, {
      id: 'marquee',
      selector: 'marquee',
      excludeHidden: false,
      tags: [ 'wcag2a', 'wcag222' ],
      all: [],
      any: [],
      none: [ 'is-on-screen' ]
    }, {
      id: 'meta-refresh',
      selector: 'meta[http-equiv="refresh"]',
      excludeHidden: false,
      tags: [ 'wcag2a', 'wcag2aaa', 'wcag221', 'wcag224', 'wcag325' ],
      all: [],
      any: [ 'meta-refresh' ],
      none: []
    }, {
      id: 'meta-viewport-large',
      selector: 'meta[name="viewport"]',
      excludeHidden: false,
      tags: [ 'best-practice' ],
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
      tags: [ 'wcag2aa', 'wcag144' ],
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
      tags: [ 'wcag2a', 'wcag111', 'section508', 'section508.22.a' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', 'non-empty-title' ],
      none: []
    }, {
      id: 'radiogroup',
      selector: 'input[type=radio][name]',
      tags: [ 'best-practice' ],
      all: [],
      any: [ 'group-labelledby', 'fieldset' ],
      none: []
    }, {
      id: 'region',
      selector: 'html',
      pageLevel: true,
      enabled: false,
      tags: [ 'best-practice' ],
      all: [],
      any: [ 'region' ],
      none: []
    }, {
      id: 'scope-attr-valid',
      selector: 'td[scope], th[scope]',
      enabled: true,
      tags: [ 'best-practice' ],
      all: [ 'html5-scope', 'scope-value' ],
      any: [],
      none: []
    }, {
      id: 'server-side-image-map',
      selector: 'img[ismap]',
      tags: [ 'wcag2a', 'wcag211', 'section508', 'section508.22.f' ],
      all: [],
      any: [],
      none: [ 'exists' ]
    }, {
      id: 'skip-link',
      selector: 'a[href]',
      pageLevel: true,
      enabled: false,
      tags: [ 'best-practice' ],
      all: [],
      any: [ 'skip-link' ],
      none: []
    }, {
      id: 'tabindex',
      selector: '[tabindex]',
      tags: [ 'best-practice' ],
      all: [],
      any: [ 'tabindex' ],
      none: []
    }, {
      id: 'table-duplicate-name',
      selector: 'table',
      tags: [ 'best-practice' ],
      all: [],
      any: [],
      none: [ 'same-caption-summary' ]
    }, {
      id: 'table-fake-caption',
      selector: 'table',
      matches: function matches(node) {
        return axe.commons.table.isDataTable(node);
      },
      tags: [ 'experimental', 'wcag2a', 'wcag131', 'section508', 'section508.22.g' ],
      all: [ 'caption-faked' ],
      any: [],
      none: []
    }, {
      id: 'td-has-header',
      selector: 'table',
      matches: function matches(node) {
        if (axe.commons.table.isDataTable(node)) {
          var tableArray = axe.commons.table.toArray(node);
          return tableArray.length >= 3 && tableArray[0].length >= 3 && tableArray[1].length >= 3 && tableArray[2].length >= 3;
        }
        return false;
      },
      tags: [ 'experimental', 'wcag2a', 'wcag131', 'section508', 'section508.22.g' ],
      all: [ 'td-has-header' ],
      any: [],
      none: []
    }, {
      id: 'td-headers-attr',
      selector: 'table',
      tags: [ 'wcag2a', 'wcag131', 'section508', 'section508.22.g' ],
      all: [ 'td-headers-attr' ],
      any: [],
      none: []
    }, {
      id: 'th-has-data-cells',
      selector: 'table',
      matches: function matches(node) {
        return axe.commons.table.isDataTable(node);
      },
      tags: [ 'wcag2a', 'wcag131', 'section508', 'section508.22.g' ],
      all: [ 'th-has-data-cells' ],
      any: [],
      none: []
    }, {
      id: 'valid-lang',
      selector: '[lang]:not(html), [xml\\:lang]:not(html)',
      tags: [ 'wcag2aa', 'wcag312' ],
      all: [],
      any: [],
      none: [ {
        options: [ 'aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'in', 'io', 'is', 'it', 'iu', 'iw', 'ja', 'ji', 'jv', 'jw', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mo', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu' ],
        id: 'valid-lang'
      } ]
    }, {
      id: 'video-caption',
      selector: 'video',
      excludeHidden: false,
      tags: [ 'wcag2a', 'wcag122', 'wcag123', 'section508', 'section508.22.a' ],
      all: [],
      any: [],
      none: [ 'caption' ]
    }, {
      id: 'video-description',
      selector: 'video',
      excludeHidden: false,
      tags: [ 'wcag2aa', 'wcag125', 'section508', 'section508.22.b' ],
      all: [],
      any: [],
      none: [ 'description' ]
    } ],
    checks: [ {
      id: 'abstractrole',
      evaluate: function evaluate(node, options) {
        return axe.commons.aria.getRoleType(node.getAttribute('role')) === 'abstract';
      }
    }, {
      id: 'aria-allowed-attr',
      evaluate: function evaluate(node, options) {
        var invalid = [];
        var attr, attrName, allowed, role = node.getAttribute('role'), attrs = node.attributes;
        if (!role) {
          role = axe.commons.aria.implicitRole(node);
        }
        allowed = axe.commons.aria.allowedAttr(role);
        if (role && allowed) {
          for (var i = 0, l = attrs.length; i < l; i++) {
            attr = attrs[i];
            attrName = attr.name;
            if (axe.commons.aria.validateAttr(attrName) && allowed.indexOf(attrName) === -1) {
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
      id: 'invalidrole',
      evaluate: function evaluate(node, options) {
        return !axe.commons.aria.isValidRole(node.getAttribute('role'));
      }
    }, {
      id: 'aria-required-attr',
      evaluate: function evaluate(node, options) {
        var missing = [];
        if (node.hasAttributes()) {
          var attr, role = node.getAttribute('role'), required = axe.commons.aria.requiredAttr(role);
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
      evaluate: function evaluate(node, options) {
        var requiredOwned = axe.commons.aria.requiredOwned, implicitNodes = axe.commons.aria.implicitNodes, matchesSelector = axe.commons.utils.matchesSelector, idrefs = axe.commons.dom.idrefs;
        function owns(node, role, ariaOwned) {
          if (node === null) {
            return false;
          }
          var implicit = implicitNodes(role), selector = [ '[role="' + role + '"]' ];
          if (implicit) {
            selector = selector.concat(implicit);
          }
          selector = selector.join(',');
          return ariaOwned ? matchesSelector(node, selector) || !!node.querySelector(selector) : !!node.querySelector(selector);
        }
        function ariaOwns(nodes, role) {
          var index, length;
          for (index = 0, length = nodes.length; index < length; index++) {
            if (nodes[index] === null) {
              continue;
            }
            if (owns(nodes[index], role, true)) {
              return true;
            }
          }
          return false;
        }
        function missingRequiredChildren(node, childRoles, all) {
          var i, l = childRoles.length, missing = [], ownedElements = idrefs(node, 'aria-owns');
          for (i = 0; i < l; i++) {
            var r = childRoles[i];
            if (owns(node, r) || ariaOwns(ownedElements, r)) {
              if (!all) {
                return null;
              }
            } else {
              if (all) {
                missing.push(r);
              }
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
        var missing = missingRequiredChildren(node, childRoles, all);
        if (!missing) {
          return true;
        }
        this.data(missing);
        return false;
      }
    }, {
      id: 'aria-required-parent',
      evaluate: function evaluate(node, options) {
        function getSelector(role) {
          var impliedNative = axe.commons.aria.implicitNodes(role) || [];
          return impliedNative.concat('[role="' + role + '"]').join(',');
        }
        function getMissingContext(element, requiredContext, includeElement) {
          var index, length, role = element.getAttribute('role'), missing = [];
          if (!requiredContext) {
            requiredContext = axe.commons.aria.requiredContext(role);
          }
          if (!requiredContext) {
            return null;
          }
          for (index = 0, length = requiredContext.length; index < length; index++) {
            if (includeElement && axe.utils.matchesSelector(element, getSelector(requiredContext[index]))) {
              return null;
            }
            if (axe.commons.dom.findUp(element, getSelector(requiredContext[index]))) {
              //if one matches, it passes
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
            if (element.id) {
              o = document.querySelector('[aria-owns~=' + axe.commons.utils.escapeSelector(element.id) + ']');
              if (o) {
                owners.push(o);
              }
            }
            element = element.parentNode;
          }
          return owners.length ? owners : null;
        }
        var missingParents = getMissingContext(node);
        if (!missingParents) {
          return true;
        }
        var owners = getAriaOwners(node);
        if (owners) {
          for (var i = 0, l = owners.length; i < l; i++) {
            missingParents = getMissingContext(owners[i], missingParents, true);
            if (!missingParents) {
              return true;
            }
          }
        }
        this.data(missingParents);
        return false;
      }
    }, {
      id: 'aria-valid-attr-value',
      evaluate: function evaluate(node, options) {
        options = Array.isArray(options) ? options : [];
        var invalid = [], aria = /^aria-/;
        var attr, attrName, attrs = node.attributes;
        for (var i = 0, l = attrs.length; i < l; i++) {
          attr = attrs[i];
          attrName = attr.name;
          if (options.indexOf(attrName) === -1 && aria.test(attrName) && !axe.commons.aria.validateAttrValue(node, attrName)) {
            invalid.push(attrName + '="' + attr.nodeValue + '"');
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
      evaluate: function evaluate(node, options) {
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
      id: 'color-contrast',
      evaluate: function evaluate(node, options) {
        if (!axe.commons.dom.isVisible(node, false)) {
          return true;
        }
        var noScroll = !!(options || {}).noScroll;
        var bgNodes = [], bgColor = axe.commons.color.getBackgroundColor(node, bgNodes, noScroll), fgColor = axe.commons.color.getForegroundColor(node, noScroll);
        //We don't know, so we'll pass it provisionally
        if (fgColor === null || bgColor === null) {
          return undefined;
        }
        var nodeStyle = window.getComputedStyle(node);
        var fontSize = parseFloat(nodeStyle.getPropertyValue('font-size'));
        var fontWeight = nodeStyle.getPropertyValue('font-weight');
        var bold = [ 'bold', 'bolder', '600', '700', '800', '900' ].indexOf(fontWeight) !== -1;
        var cr = axe.commons.color.hasValidContrastRatio(bgColor, fgColor, fontSize, bold);
        this.data({
          fgColor: fgColor.toHexString(),
          bgColor: bgColor.toHexString(),
          contrastRatio: cr.contrastRatio.toFixed(2),
          fontSize: (fontSize * 72 / 96).toFixed(1) + 'pt',
          fontWeight: bold ? 'bold' : 'normal'
        });
        if (!cr.isValid) {
          this.relatedNodes(bgNodes);
        }
        return cr.isValid;
      }
    }, {
      id: 'link-in-text-block',
      evaluate: function evaluate(node, options) {
        /* global axe*/
        var color = axe.commons.color;
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
        var parentBlock = node.parentNode;
        while (parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
          parentBlock = parentBlock.parentNode;
        }
        // TODO: Check the :visited state of the link
        if (color.elementIsDistinct(node, parentBlock)) {
          return true;
        } else {
          // Check if contrast of foreground is sufficient
          var nodeColor, parentColor;
          nodeColor = color.getForegroundColor(node);
          parentColor = color.getForegroundColor(parentBlock);
          if (!nodeColor || !parentColor) {
            return undefined;
          }
          var contrast = getContrast(nodeColor, parentColor);
          if (contrast === 1) {
            return true;
          } else {
            if (contrast >= 3) {
              return undefined;
            }
          }
          // Check if contrast of background is sufficient
          nodeColor = color.getBackgroundColor(node);
          parentColor = color.getBackgroundColor(parentBlock);
          if (!nodeColor || !parentColor || getContrast(nodeColor, parentColor) >= 3) {
            return undefined;
          }
        }
        // TODO: We should check the focus / hover style too
        return false;
      }
    }, {
      id: 'fieldset',
      evaluate: function evaluate(node, options) {
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
        function runCheck(element) {
          var name = axe.commons.utils.escapeSelector(node.name);
          var matchingNodes = document.querySelectorAll('input[type="' + axe.commons.utils.escapeSelector(node.type) + '"][name="' + name + '"]');
          if (matchingNodes.length < 2) {
            return true;
          }
          var fieldset = axe.commons.dom.findUp(element, 'fieldset');
          var group = axe.commons.dom.findUp(element, '[role="group"]' + (node.type === 'radio' ? ',[role="radiogroup"]' : ''));
          if (!group && !fieldset) {
            failureCode = 'no-group';
            self.relatedNodes(spliceCurrentNode(matchingNodes, element));
            return false;
          }
          return fieldset ? checkFieldset(fieldset, name) : checkARIAGroup(group, name);
        }
        var data = {
          name: node.getAttribute('name'),
          type: node.getAttribute('type')
        };
        var result = runCheck(node);
        if (!result) {
          data.failureCode = failureCode;
        }
        this.data(data);
        return result;
      },
      after: function after(results, options) {
        var seen = {};
        return results.filter(function(result) {
          // passes can pass through
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
      evaluate: function evaluate(node, options) {
        this.data({
          name: node.getAttribute('name'),
          type: node.getAttribute('type')
        });
        var matchingNodes = document.querySelectorAll('input[type="' + axe.commons.utils.escapeSelector(node.type) + '"][name="' + axe.commons.utils.escapeSelector(node.name) + '"]');
        if (matchingNodes.length <= 1) {
          return true;
        }
        // Check to see if there's an aria-labelledby value that all nodes have in common
        return [].map.call(matchingNodes, function(m) {
          var l = m.getAttribute('aria-labelledby');
          return l ? l.split(/\s+/) : [];
        }).reduce(function(prev, curr) {
          return prev.filter(function(n) {
            return curr.indexOf(n) !== -1;
          });
        }).filter(function(n) {
          var labelNode = document.getElementById(n);
          return labelNode && axe.commons.text.accessibleText(labelNode);
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
      evaluate: function evaluate(node, options) {
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
      evaluate: function evaluate(node, options) {
        var tabIndex = node.getAttribute('tabindex'), isFocusable = axe.commons.dom.isFocusable(node) && tabIndex > -1;
        if (!isFocusable) {
          return false;
        }
        return !axe.commons.text.accessibleText(node);
      }
    }, {
      id: 'tabindex',
      evaluate: function evaluate(node, options) {
        return node.tabIndex <= 0;
      }
    }, {
      id: 'duplicate-img-label',
      evaluate: function evaluate(node, options) {
        var imgs = node.querySelectorAll('img');
        var text = axe.commons.text.visible(node, true).toLowerCase();
        if (text === '') {
          return false;
        }
        for (var i = 0, len = imgs.length; i < len; i++) {
          var img = imgs[i];
          var imgAlt = axe.commons.text.accessibleText(img).toLowerCase();
          if (imgAlt === text && img.getAttribute('role') !== 'presentation' && axe.commons.dom.isVisible(img)) {
            return true;
          }
        }
        return false;
      }
    }, {
      id: 'explicit-label',
      evaluate: function evaluate(node, options) {
        if (node.id) {
          var label = document.querySelector('label[for="' + axe.commons.utils.escapeSelector(node.id) + '"]');
          if (label) {
            return !!axe.commons.text.accessibleText(label);
          }
        }
        return false;
      }
    }, {
      id: 'help-same-as-label',
      evaluate: function evaluate(node, options) {
        var labelText = axe.commons.text.label(node), check = node.getAttribute('title');
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
      id: 'implicit-label',
      evaluate: function evaluate(node, options) {
        var label = axe.commons.dom.findUp(node, 'label');
        if (label) {
          return !!axe.commons.text.accessibleText(label);
        }
        return false;
      }
    }, {
      id: 'multiple-label',
      evaluate: function evaluate(node, options) {
        var labels = [].slice.call(document.querySelectorAll('label[for="' + axe.commons.utils.escapeSelector(node.id) + '"]')), parent = node.parentNode;
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
      evaluate: function evaluate(node, options) {
        var labelText = axe.commons.text.label(node);
        return !labelText && !!(node.getAttribute('title') || node.getAttribute('aria-describedby'));
      }
    }, {
      id: 'has-lang',
      evaluate: function evaluate(node, options) {
        return !!(node.getAttribute('lang') || node.getAttribute('xml:lang') || '').trim();
      }
    }, {
      id: 'valid-lang',
      options: [ 'aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'in', 'io', 'is', 'it', 'iu', 'iw', 'ja', 'ji', 'jv', 'jw', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mo', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu' ],
      evaluate: function evaluate(node, options) {
        function getBaseLang(lang) {
          return lang.trim().split('-')[0].toLowerCase();
        }
        var langs, invalid;
        langs = (options || []).map(getBaseLang);
        invalid = [ 'lang', 'xml:lang' ].reduce(function(invalid, langAttr) {
          var langVal = node.getAttribute(langAttr);
          if (typeof langVal !== 'string') {
            return invalid;
          }
          var baselangVal = getBaseLang(langVal);
          // Edge sets lang to an empty string when xml:lang is set
          // so we need to ignore empty strings here
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
      id: 'dlitem',
      evaluate: function evaluate(node, options) {
        return node.parentNode.tagName === 'DL';
      }
    }, {
      id: 'has-listitem',
      evaluate: function evaluate(node, options) {
        var children = node.children;
        if (children.length === 0) {
          return true;
        }
        for (var i = 0; i < children.length; i++) {
          if (children[i].nodeName.toUpperCase() === 'LI') {
            return false;
          }
        }
        return true;
      }
    }, {
      id: 'listitem',
      evaluate: function evaluate(node, options) {
        if ([ 'UL', 'OL' ].indexOf(node.parentNode.nodeName.toUpperCase()) !== -1) {
          return true;
        }
        return node.parentNode.getAttribute('role') === 'list';
      }
    }, {
      id: 'only-dlitems',
      evaluate: function evaluate(node, options) {
        var child, nodeName, bad = [], children = node.childNodes, permitted = [ 'STYLE', 'META', 'LINK', 'MAP', 'AREA', 'SCRIPT', 'DATALIST', 'TEMPLATE' ], hasNonEmptyTextNode = false;
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          var nodeName = child.nodeName.toUpperCase();
          if (child.nodeType === 1 && nodeName !== 'DT' && nodeName !== 'DD' && permitted.indexOf(nodeName) === -1) {
            bad.push(child);
          } else {
            if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
              hasNonEmptyTextNode = true;
            }
          }
        }
        if (bad.length) {
          this.relatedNodes(bad);
        }
        var retVal = !!bad.length || hasNonEmptyTextNode;
        return retVal;
      }
    }, {
      id: 'only-listitems',
      evaluate: function evaluate(node, options) {
        var child, nodeName, bad = [], children = node.childNodes, permitted = [ 'STYLE', 'META', 'LINK', 'MAP', 'AREA', 'SCRIPT', 'DATALIST', 'TEMPLATE' ], hasNonEmptyTextNode = false;
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nodeName = child.nodeName.toUpperCase();
          if (child.nodeType === 1 && nodeName !== 'LI' && permitted.indexOf(nodeName) === -1) {
            bad.push(child);
          } else {
            if (child.nodeType === 3 && child.nodeValue.trim() !== '') {
              hasNonEmptyTextNode = true;
            }
          }
        }
        if (bad.length) {
          this.relatedNodes(bad);
        }
        return !!bad.length || hasNonEmptyTextNode;
      }
    }, {
      id: 'structured-dlitems',
      evaluate: function evaluate(node, options) {
        var children = node.children;
        if (!children || !children.length) {
          return false;
        }
        var hasDt = false, hasDd = false, nodeName;
        for (var i = 0; i < children.length; i++) {
          nodeName = children[i].nodeName.toUpperCase();
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
      evaluate: function evaluate(node, options) {
        return !node.querySelector('track[kind=captions]');
      }
    }, {
      id: 'description',
      evaluate: function evaluate(node, options) {
        return !node.querySelector('track[kind=descriptions]');
      }
    }, {
      id: 'meta-viewport-large',
      evaluate: function evaluate(node, options) {
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
          return false;
        }
        if (result['maximum-scale'] && parseFloat(result['maximum-scale']) < minimum) {
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
      evaluate: function evaluate(node, options) {
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
          return false;
        }
        if (result['maximum-scale'] && parseFloat(result['maximum-scale']) < minimum) {
          return false;
        }
        return true;
      },
      options: {
        scaleMinimum: 2
      }
    }, {
      id: 'header-present',
      evaluate: function evaluate(node, options) {
        return !!node.querySelector('h1, h2, h3, h4, h5, h6, [role="heading"]');
      }
    }, {
      id: 'heading-order',
      evaluate: function evaluate(node, options) {
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
      id: 'href-no-hash',
      evaluate: function evaluate(node, options) {
        var href = node.getAttribute('href');
        if (href === '#') {
          return false;
        }
        return true;
      }
    }, {
      id: 'internal-link-present',
      evaluate: function evaluate(node, options) {
        return !!node.querySelector('a[href^="#"]');
      }
    }, {
      id: 'landmark',
      evaluate: function evaluate(node, options) {
        return node.getElementsByTagName('main').length > 0 || !!node.querySelector('[role="main"]');
      }
    }, {
      id: 'meta-refresh',
      evaluate: function evaluate(node, options) {
        var content = node.getAttribute('content') || '', parsedParams = content.split(/[;,]/);
        return content === '' || parsedParams[0] === '0';
      }
    }, {
      id: 'region',
      evaluate: function evaluate(node, options) {
        //jshint latedef: false
        var landmarkRoles = axe.commons.aria.getRolesByType('landmark'), firstLink = node.querySelector('a[href]');
        function isSkipLink(n) {
          return firstLink && axe.commons.dom.isFocusable(axe.commons.dom.getElementByReference(firstLink, 'href')) && firstLink === n;
        }
        function isLandmark(n) {
          var role = n.getAttribute('role');
          return role && landmarkRoles.indexOf(role) !== -1;
        }
        function checkRegion(n) {
          if (isLandmark(n)) {
            return null;
          }
          if (isSkipLink(n)) {
            return getViolatingChildren(n);
          }
          if (axe.commons.dom.isVisible(n, true) && (axe.commons.text.visible(n, true, true) || axe.commons.dom.isVisualContent(n))) {
            return n;
          }
          return getViolatingChildren(n);
        }
        function getViolatingChildren(n) {
          var children = axe.commons.utils.toArray(n.children);
          if (children.length === 0) {
            return [];
          }
          return children.map(checkRegion).filter(function(c) {
            return c !== null;
          }).reduce(function(a, b) {
            return a.concat(b);
          }, []);
        }
        var v = getViolatingChildren(node);
        this.relatedNodes(v);
        return !v.length;
      },
      after: function after(results, options) {
        return [ results[0] ];
      }
    }, {
      id: 'skip-link',
      evaluate: function evaluate(node, options) {
        return axe.commons.dom.isFocusable(axe.commons.dom.getElementByReference(node, 'href'));
      },
      after: function after(results, options) {
        return [ results[0] ];
      }
    }, {
      id: 'unique-frame-title',
      evaluate: function evaluate(node, options) {
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
      id: 'aria-label',
      evaluate: function evaluate(node, options) {
        var label = node.getAttribute('aria-label');
        return !!(label ? axe.commons.text.sanitize(label).trim() : '');
      }
    }, {
      id: 'aria-labelledby',
      evaluate: function evaluate(node, options) {
        var getIdRefs = axe.commons.dom.idrefs;
        return getIdRefs(node, 'aria-labelledby').some(function(elm) {
          return elm && axe.commons.text.accessibleText(elm, true);
        });
      }
    }, {
      id: 'button-has-visible-text',
      evaluate: function evaluate(node, options) {
        var nodeName = node.nodeName.toUpperCase();
        var role = node.getAttribute('role');
        var label = void 0;
        if (nodeName === 'BUTTON' || role === 'button' && nodeName !== 'INPUT') {
          label = axe.commons.text.accessibleText(node);
          this.data(label);
          return !!label;
        } else {
          return false;
        }
      }
    }, {
      id: 'doc-has-title',
      evaluate: function evaluate(node, options) {
        var title = document.title;
        return !!(title ? axe.commons.text.sanitize(title).trim() : '');
      }
    }, {
      id: 'duplicate-id',
      evaluate: function evaluate(node, options) {
        // Since empty ID's are not meaningful and are ignored by Edge, we'll
        // let those pass.
        if (!node.id.trim()) {
          return true;
        }
        var matchingNodes = document.querySelectorAll('[id="' + axe.commons.utils.escapeSelector(node.id) + '"]');
        var related = [];
        for (var i = 0; i < matchingNodes.length; i++) {
          if (matchingNodes[i] !== node) {
            related.push(matchingNodes[i]);
          }
        }
        if (related.length) {
          this.relatedNodes(related);
        }
        this.data(node.getAttribute('id'));
        return matchingNodes.length <= 1;
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
      id: 'exists',
      evaluate: function evaluate(node, options) {
        return true;
      }
    }, {
      id: 'has-alt',
      evaluate: function evaluate(node, options) {
        return node.hasAttribute('alt');
      }
    }, {
      id: 'has-visible-text',
      evaluate: function evaluate(node, options) {
        return axe.commons.text.accessibleText(node).length > 0;
      }
    }, {
      id: 'is-on-screen',
      evaluate: function evaluate(node, options) {
        // From a visual perspective
        return axe.commons.dom.isVisible(node, false) && !axe.commons.dom.isOffscreen(node);
      }
    }, {
      id: 'non-empty-alt',
      evaluate: function evaluate(node, options) {
        var label = node.getAttribute('alt');
        return !!(label ? axe.commons.text.sanitize(label).trim() : '');
      }
    }, {
      id: 'non-empty-if-present',
      evaluate: function evaluate(node, options) {
        // Check for 'default' names, which are given to reset and submit buttons
        var nodeName = node.nodeName.toUpperCase();
        var type = (node.getAttribute('type') || '').toLowerCase();
        var label = node.getAttribute('value');
        this.data(label);
        if (nodeName === 'INPUT' && [ 'submit', 'reset' ].indexOf(type) !== -1) {
          return label === null;
        }
        return false;
      }
    }, {
      id: 'non-empty-title',
      evaluate: function evaluate(node, options) {
        var title = node.getAttribute('title');
        return !!(title ? axe.commons.text.sanitize(title).trim() : '');
      }
    }, {
      id: 'non-empty-value',
      evaluate: function evaluate(node, options) {
        var label = node.getAttribute('value');
        return !!(label ? axe.commons.text.sanitize(label).trim() : '');
      }
    }, {
      id: 'role-none',
      evaluate: function evaluate(node, options) {
        return node.getAttribute('role') === 'none';
      }
    }, {
      id: 'role-presentation',
      evaluate: function evaluate(node, options) {
        return node.getAttribute('role') === 'presentation';
      }
    }, {
      id: 'caption-faked',
      evaluate: function evaluate(node, options) {
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
      evaluate: function evaluate(node, options) {
        return !!node.caption;
      }
    }, {
      id: 'has-summary',
      evaluate: function evaluate(node, options) {
        return !!node.summary;
      }
    }, {
      id: 'has-th',
      evaluate: function evaluate(node, options) {
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
      evaluate: function evaluate(node, options) {
        if (!axe.commons.dom.isHTML5(document)) {
          return false;
        }
        return node.nodeName.toUpperCase() === 'TH';
      }
    }, {
      id: 'same-caption-summary',
      evaluate: function evaluate(node, options) {
        return !!(node.summary && node.caption) && node.summary === axe.commons.text.accessibleText(node.caption);
      }
    }, {
      id: 'scope-value',
      evaluate: function evaluate(node, options) {
        options = options || {};
        var value = node.getAttribute('scope').toLowerCase();
        var validVals = [ 'row', 'col', 'rowgroup', 'colgroup' ] || options.values;
        return validVals.indexOf(value) !== -1;
      }
    }, {
      id: 'td-has-header',
      evaluate: function evaluate(node, options) {
        var tableUtils = axe.commons.table;
        var badCells = [];
        var cells = tableUtils.getAllCells(node);
        cells.forEach(function(cell) {
          // For each non-empty data cell that doesn't have an aria label
          if (cell.textContent.trim() !== '' && tableUtils.isDataCell(cell) && !axe.commons.aria.label(cell)) {
            // Check if it has any headers
            var hasHeaders = tableUtils.getHeaders(cell);
            hasHeaders = hasHeaders.reduce(function(hasHeaders, header) {
              return hasHeaders || header !== null && !!header.textContent.trim();
            }, false);
            // If no headers, put it on the naughty list
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
      evaluate: function evaluate(node, options) {
        var cells = [];
        for (var rowIndex = 0, rowLength = node.rows.length; rowIndex < rowLength; rowIndex++) {
          var row = node.rows[rowIndex];
          for (var cellIndex = 0, cellLength = row.cells.length; cellIndex < cellLength; cellIndex++) {
            cells.push(row.cells[cellIndex]);
          }
        }
        var ids = cells.reduce(function(ids, cell) {
          if (cell.id) {
            ids.push(cell.id);
          }
          return ids;
        }, []);
        var badCells = cells.reduce(function(badCells, cell) {
          var isSelf, notOfTable;
          // Get a list all the values of the headers attribute
          var headers = (cell.getAttribute('headers') || '').split(/\s/).reduce(function(headers, header) {
            header = header.trim();
            if (header) {
              headers.push(header);
            }
            return headers;
          }, []);
          if (headers.length !== 0) {
            // Check if the cell's id is in this list
            if (cell.id) {
              isSelf = headers.indexOf(cell.id.trim()) !== -1;
            }
            // Check if the headers are of cells inside the table
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
      evaluate: function evaluate(node, options) {
        var tableUtils = axe.commons.table;
        var cells = tableUtils.getAllCells(node);
        var checkResult = this;
        // Get a list of all headers reffed to in this rule
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
        // Get all the headers
        var headers = cells.filter(function(cell) {
          if (axe.commons.text.sanitize(cell.textContent) === '') {
            return false;
          }
          return cell.nodeName.toUpperCase() === 'TH' || [ 'rowheader', 'columnheader' ].indexOf(cell.getAttribute('role')) !== -1;
        });
        var tableGrid = tableUtils.toGrid(node);
        // Look for all the bad headers
        return headers.reduce(function(res, header) {
          if (header.id && reffedHeaders.indexOf(header.id) !== -1) {
            return !res ? res : true;
          }
          var hasCell = false;
          var pos = tableUtils.getCellPosition(header, tableGrid);
          // Look for any data cells or row headers that this might refer to
          if (tableUtils.isColumnHeader(header)) {
            hasCell = tableUtils.traverse('down', pos, tableGrid).reduce(function(out, cell) {
              return out || cell.textContent.trim() !== '' && !tableUtils.isColumnHeader(cell);
            }, false);
          }
          // Look for any data cells or column headers that this might refer to
          if (!hasCell && tableUtils.isRowHeader(header)) {
            hasCell = tableUtils.traverse('right', pos, tableGrid).reduce(function(out, cell) {
              return out || cell.textContent.trim() !== '' && !tableUtils.isRowHeader(cell);
            }, false);
          }
          // report the node as having failed
          if (!hasCell) {
            checkResult.relatedNodes(header);
          }
          return res && hasCell;
        }, true);
      }
    } ],
    commons: function() {
      /*exported commons */
      var commons = {};
      var aria = commons.aria = {}, lookupTables = aria._lut = {};
      lookupTables.attributes = {
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
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-hidden': {
          type: 'boolean',
          values: [ 'true', 'false' ]
        },
        'aria-invalid': {
          type: 'nmtoken',
          values: [ 'true', 'false', 'spelling', 'grammar' ]
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
      lookupTables.globalAttributes = [ 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-describedby', 'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant' ];
      lookupTables.role = {
        alert: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        alertdialog: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        application: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        article: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'article' ]
        },
        banner: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'header' ]
        },
        button: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-pressed' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'button', 'input[type="button"]', 'input[type="image"]', 'input[type="reset"]', 'input[type="submit"]', 'summary' ]
        },
        cell: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-colindex', 'aria-colspan', 'aria-rowindex', 'aria-rowspan' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'row' ],
          implicit: [ 'td', 'th' ]
        },
        checkbox: {
          type: 'widget',
          attributes: {
            required: [ 'aria-checked' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'input[type="checkbox"]' ]
        },
        columnheader: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-sort', 'aria-readonly', 'aria-selected', 'aria-required' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'row' ],
          implicit: [ 'th' ]
        },
        combobox: {
          type: 'composite',
          attributes: {
            required: [ 'aria-expanded' ],
            allowed: [ 'aria-autocomplete', 'aria-required', 'aria-activedescendant' ]
          },
          owned: {
            all: [ 'listbox', 'textbox' ]
          },
          nameFrom: [ 'author' ],
          context: null
        },
        command: {
          nameFrom: [ 'author' ],
          type: 'abstract'
        },
        complementary: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'aside' ]
        },
        composite: {
          nameFrom: [ 'author' ],
          type: 'abstract'
        },
        contentinfo: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'footer' ]
        },
        definition: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'dd' ]
        },
        dialog: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'dialog' ]
        },
        directory: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null
        },
        document: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'body' ]
        },
        form: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'form' ]
        },
        grid: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-level', 'aria-multiselectable', 'aria-readonly', 'aria-activedescendant', 'aria-expanded' ]
          },
          owned: {
            one: [ 'rowgroup', 'row' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'table' ]
        },
        gridcell: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-selected', 'aria-readonly', 'aria-expanded', 'aria-required' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'row' ],
          implicit: [ 'td', 'th' ]
        },
        group: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'details', 'optgroup' ]
        },
        heading: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-level', 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]
        },
        img: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'img' ]
        },
        input: {
          nameFrom: [ 'author' ],
          type: 'abstract'
        },
        landmark: {
          nameFrom: [ 'author' ],
          type: 'abstract'
        },
        link: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'a[href]' ]
        },
        list: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: {
            all: [ 'listitem' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'ol', 'ul', 'dl' ]
        },
        listbox: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-multiselectable', 'aria-required', 'aria-expanded' ]
          },
          owned: {
            all: [ 'option' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'select' ]
        },
        listitem: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-level', 'aria-posinset', 'aria-setsize', 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'list' ],
          implicit: [ 'li', 'dt' ]
        },
        log: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        main: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'main' ]
        },
        marquee: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        math: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'math' ]
        },
        menu: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded' ]
          },
          owned: {
            one: [ 'menuitem', 'menuitemradio', 'menuitemcheckbox' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'menu[type="context"]' ]
        },
        menubar: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        menuitem: {
          type: 'widget',
          attributes: null,
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'menu', 'menubar' ],
          implicit: [ 'menuitem[type="command"]' ]
        },
        menuitemcheckbox: {
          type: 'widget',
          attributes: {
            required: [ 'aria-checked' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'menu', 'menubar' ],
          implicit: [ 'menuitem[type="checkbox"]' ]
        },
        menuitemradio: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-selected', 'aria-posinset', 'aria-setsize' ],
            required: [ 'aria-checked' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'menu', 'menubar' ],
          implicit: [ 'menuitem[type="radio"]' ]
        },
        navigation: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'nav' ]
        },
        none: {
          type: 'structure',
          attributes: null,
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        note: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        option: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-selected', 'aria-posinset', 'aria-setsize', 'aria-checked' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'listbox' ],
          implicit: [ 'option' ]
        },
        presentation: {
          type: 'structure',
          attributes: null,
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        progressbar: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-valuetext', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'progress' ]
        },
        radio: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-selected', 'aria-posinset', 'aria-setsize' ],
            required: [ 'aria-checked' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null,
          implicit: [ 'input[type="radio"]' ]
        },
        radiogroup: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-required', 'aria-expanded' ]
          },
          owned: {
            all: [ 'radio' ]
          },
          nameFrom: [ 'author' ],
          context: null
        },
        range: {
          nameFrom: [ 'author' ],
          type: 'abstract'
        },
        region: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'section' ]
        },
        roletype: {
          type: 'abstract'
        },
        row: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-level', 'aria-selected', 'aria-activedescendant', 'aria-expanded' ]
          },
          owned: {
            one: [ 'cell', 'columnheader', 'rowheader', 'gridcell' ]
          },
          nameFrom: [ 'author', 'contents' ],
          context: [ 'rowgroup', 'grid', 'treegrid', 'table' ],
          implicit: [ 'tr' ]
        },
        rowgroup: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded' ]
          },
          owned: {
            all: [ 'row' ]
          },
          nameFrom: [ 'author', 'contents' ],
          context: [ 'grid', 'table' ],
          implicit: [ 'tbody', 'thead', 'tfoot' ]
        },
        rowheader: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-sort', 'aria-required', 'aria-readonly', 'aria-expanded', 'aria-selected' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'row' ],
          implicit: [ 'th' ]
        },
        scrollbar: {
          type: 'widget',
          attributes: {
            required: [ 'aria-controls', 'aria-orientation', 'aria-valuenow', 'aria-valuemax', 'aria-valuemin' ],
            allowed: [ 'aria-valuetext' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        search: {
          type: 'landmark',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        searchbox: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-readonly', 'aria-required' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'input[type="search"]' ]
        },
        section: {
          nameFrom: [ 'author', 'contents' ],
          type: 'abstract'
        },
        sectionhead: {
          nameFrom: [ 'author', 'contents' ],
          type: 'abstract'
        },
        select: {
          nameFrom: [ 'author' ],
          type: 'abstract'
        },
        separator: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-expanded', 'aria-orientation' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'hr' ]
        },
        slider: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-valuetext', 'aria-orientation' ],
            required: [ 'aria-valuenow', 'aria-valuemax', 'aria-valuemin' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'input[type="range"]' ]
        },
        spinbutton: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-valuetext', 'aria-required' ],
            required: [ 'aria-valuenow', 'aria-valuemax', 'aria-valuemin' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'input[type="number"]' ]
        },
        status: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'output' ]
        },
        structure: {
          type: 'abstract'
        },
        'switch': {
          type: 'widget',
          attributes: {
            required: [ 'aria-checked' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null
        },
        tab: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-selected', 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'tablist' ]
        },
        table: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-colcount', 'aria-rowcount' ]
          },
          owned: {
            one: [ 'rowgroup', 'row' ]
          },
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'table' ]
        },
        tablist: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded', 'aria-level', 'aria-multiselectable' ]
          },
          owned: {
            all: [ 'tab' ]
          },
          nameFrom: [ 'author' ],
          context: null
        },
        tabpanel: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        text: {
          type: 'structure',
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null
        },
        textbox: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-autocomplete', 'aria-multiline', 'aria-readonly', 'aria-required' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'input[type="text"]', 'input[type="email"]', 'input[type="password"]', 'input[type="tel"]', 'input[type="url"]', 'input:not([type])', 'textarea' ]
        },
        timer: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null
        },
        toolbar: {
          type: 'structure',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author' ],
          context: null,
          implicit: [ 'menu[type="toolbar"]' ]
        },
        tooltip: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-expanded' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: null
        },
        tree: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-multiselectable', 'aria-required', 'aria-expanded' ]
          },
          owned: {
            all: [ 'treeitem' ]
          },
          nameFrom: [ 'author' ],
          context: null
        },
        treegrid: {
          type: 'composite',
          attributes: {
            allowed: [ 'aria-activedescendant', 'aria-expanded', 'aria-level', 'aria-multiselectable', 'aria-readonly', 'aria-required' ]
          },
          owned: {
            all: [ 'treeitem' ]
          },
          nameFrom: [ 'author' ],
          context: null
        },
        treeitem: {
          type: 'widget',
          attributes: {
            allowed: [ 'aria-checked', 'aria-selected', 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize' ]
          },
          owned: null,
          nameFrom: [ 'author', 'contents' ],
          context: [ 'treegrid', 'tree' ]
        },
        widget: {
          type: 'abstract'
        },
        window: {
          nameFrom: [ 'author' ],
          type: 'abstract'
        }
      };
      var color = {};
      commons.color = color;
      /*exported dom */
      var dom = commons.dom = {};
      /*exported table */
      var table = commons.table = {};
      /*exported text */
      var text = commons.text = {};
      /*exported utils */
      /*global axe */
      var utils = commons.utils = axe.utils;
      /*global aria, axe, lookupTables */
      /**
   * Get required attributes for a given role
   * @param  {String} role The role to check
   * @return {Array}
   */
      aria.requiredAttr = function(role) {
        'use strict';
        var roles = lookupTables.role[role], attr = roles && roles.attributes && roles.attributes.required;
        return attr || [];
      };
      /**
   * Get allowed attributes for a given role
   * @param  {String} role The role to check
   * @return {Array}
   */
      aria.allowedAttr = function(role) {
        'use strict';
        var roles = lookupTables.role[role], attr = roles && roles.attributes && roles.attributes.allowed || [], requiredAttr = roles && roles.attributes && roles.attributes.required || [];
        return attr.concat(lookupTables.globalAttributes).concat(requiredAttr);
      };
      /**
   * Check if an aria- attribute name is valid
   * @param  {String} att The attribute name
   * @return {Boolean}
   */
      aria.validateAttr = function(att) {
        'use strict';
        return !!lookupTables.attributes[att];
      };
      /**
   * Validate the value of an ARIA attribute
   * @param  {HTMLElement} node The element to check
   * @param  {String} attr The name of the attribute
   * @return {Boolean}
   */
      aria.validateAttrValue = function(node, attr) {
        //jshint maxcomplexity: 12
        'use strict';
        var matches, list, doc = document, value = node.getAttribute(attr), attrInfo = lookupTables.attributes[attr];
        if (!attrInfo) {
          return true;
        }
        switch (attrInfo.type) {
         case 'boolean':
         case 'nmtoken':
          return typeof value === 'string' && attrInfo.values.indexOf(value.toLowerCase()) !== -1;

         case 'nmtokens':
          list = axe.utils.tokenList(value);
          // Check if any value isn't in the list of values
          return list.reduce(function(result, token) {
            return result && attrInfo.values.indexOf(token) !== -1;
          }, list.length !== 0);

         case 'idref':
          return !!(value && doc.getElementById(value));

         case 'idrefs':
          list = axe.utils.tokenList(value);
          // Check if any value isn't in the list of values
          return list.reduce(function(result, token) {
            return !!(result && doc.getElementById(token));
          }, list.length !== 0);

         case 'string':
          // anything goes
          return true;

         case 'decimal':
          matches = value.match(/^[-+]?([0-9]*)\.?([0-9]*)$/);
          return !!(matches && (matches[1] || matches[2]));

         case 'int':
          return /^[-+]?[0-9]+$/.test(value);
        }
      };
      /*global aria, dom, text */
      /**
   * Gets the accessible ARIA label text of a given element
   * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
   * @param  {HTMLElement} node The element to test
   * @return {Mixed}      String of visible text, or `null` if no label is found
   */
      aria.label = function(node) {
        var ref, candidate;
        if (node.getAttribute('aria-labelledby')) {
          // aria-labelledby
          ref = dom.idrefs(node, 'aria-labelledby');
          candidate = ref.map(function(thing) {
            return thing ? text.visible(thing, true) : '';
          }).join(' ').trim();
          if (candidate) {
            return candidate;
          }
        }
        // aria-label
        candidate = node.getAttribute('aria-label');
        if (candidate) {
          candidate = text.sanitize(candidate).trim();
          if (candidate) {
            return candidate;
          }
        }
        return null;
      };
      /*global aria, lookupTables, axe */
      /**
   * Check if a given role is valid
   * @param  {String}  role The role to check
   * @return {Boolean}
   */
      aria.isValidRole = function(role) {
        'use strict';
        if (lookupTables.role[role]) {
          return true;
        }
        return false;
      };
      /**
   * Get the roles that get name from contents
   * @return {Array}           Array of roles that match the type
   */
      aria.getRolesWithNameFromContents = function() {
        return Object.keys(lookupTables.role).filter(function(r) {
          return lookupTables.role[r].nameFrom && lookupTables.role[r].nameFrom.indexOf('contents') !== -1;
        });
      };
      /**
   * Get the roles that have a certain "type"
   * @param  {String} roleType The roletype to check
   * @return {Array}           Array of roles that match the type
   */
      aria.getRolesByType = function(roleType) {
        return Object.keys(lookupTables.role).filter(function(r) {
          return lookupTables.role[r].type === roleType;
        });
      };
      /**
   * Get the "type" of role; either widget, composite, abstract, landmark or `null`
   * @param  {String} role The role to check
   * @return {Mixed}       String if a matching role and its type are found, otherwise `null`
   */
      aria.getRoleType = function(role) {
        var r = lookupTables.role[role];
        return r && r.type || null;
      };
      /**
   * Get the required owned (children) roles for a given role
   * @param  {String} role The role to check
   * @return {Mixed}       Either an Array of required owned elements or `null` if there are none
   */
      aria.requiredOwned = function(role) {
        'use strict';
        var owned = null, roles = lookupTables.role[role];
        if (roles) {
          owned = axe.utils.clone(roles.owned);
        }
        return owned;
      };
      /**
   * Get the required context (parent) roles for a given role
   * @param  {String} role The role to check
   * @return {Mixed}       Either an Array of required context elements or `null` if there are none
   */
      aria.requiredContext = function(role) {
        'use strict';
        var context = null, roles = lookupTables.role[role];
        if (roles) {
          context = axe.utils.clone(roles.context);
        }
        return context;
      };
      /**
   * Get a list of CSS selectors of nodes that have an implicit role
   * @param  {String} role The role to check
   * @return {Mixed}       Either an Array of CSS selectors or `null` if there are none
   */
      aria.implicitNodes = function(role) {
        'use strict';
        var implicit = null, roles = lookupTables.role[role];
        if (roles && roles.implicit) {
          implicit = axe.utils.clone(roles.implicit);
        }
        return implicit;
      };
      /**
   * Get the implicit role for a given node
   * @param  {HTMLElement} node The node to test
   * @return {Mixed}      Either the role or `null` if there is none
   */
      aria.implicitRole = function(node) {
        'use strict';
        var role, r, candidate, roles = lookupTables.role;
        for (role in roles) {
          if (roles.hasOwnProperty(role)) {
            r = roles[role];
            if (r.implicit) {
              for (var index = 0, length = r.implicit.length; index < length; index++) {
                candidate = r.implicit[index];
                if (axe.utils.matchesSelector(node, candidate)) {
                  return role;
                }
              }
            }
          }
        }
        return null;
      };
      /*global color */
      /**
   * @constructor
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   */
      color.Color = function(red, green, blue, alpha) {
        /** @type {number} */
        this.red = red;
        /** @type {number} */
        this.green = green;
        /** @type {number} */
        this.blue = blue;
        /** @type {number} */
        this.alpha = alpha;
        /**
    * Provide the hex string value for the color
    * @return {string}
    */
        this.toHexString = function() {
          var redString = Math.round(this.red).toString(16);
          var greenString = Math.round(this.green).toString(16);
          var blueString = Math.round(this.blue).toString(16);
          return '#' + (this.red > 15.5 ? redString : '0' + redString) + (this.green > 15.5 ? greenString : '0' + greenString) + (this.blue > 15.5 ? blueString : '0' + blueString);
        };
        var rgbRegex = /^rgb\((\d+), (\d+), (\d+)\)$/;
        var rgbaRegex = /^rgba\((\d+), (\d+), (\d+), (\d*(\.\d+)?)\)/;
        /**
    * Set the color value based on a CSS RGB/RGBA string
    * @param  {string}  rgb  The string value
    */
        this.parseRgbString = function(colorString) {
          // IE can pass transparent as value instead of rgba
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
        /**
    * Get the relative luminance value
    * using algorithm from http://www.w3.org/WAI/GL/wiki/Relative_luminance
    * @return {number} The luminance value, ranges from 0 to 1
    */
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
      /**
   * Combine the two given color according to alpha blending.
   * @param {Color} fgColor
   * @param {Color} bgColor
   * @return {Color}
   */
      color.flattenColors = function(fgColor, bgColor) {
        var alpha = fgColor.alpha;
        var r = (1 - alpha) * bgColor.red + alpha * fgColor.red;
        var g = (1 - alpha) * bgColor.green + alpha * fgColor.green;
        var b = (1 - alpha) * bgColor.blue + alpha * fgColor.blue;
        var a = fgColor.alpha + bgColor.alpha * (1 - fgColor.alpha);
        return new color.Color(r, g, b, a);
      };
      /**
   * Get the contrast of two colors
   * @param  {Color}  bgcolor  Background color
   * @param  {Color}  fgcolor  Foreground color
   * @return {number} The contrast ratio
   */
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
      /**
   * Check whether certain text properties meet WCAG contrast rules
   * @param  {Color}  bgcolor  Background color
   * @param  {Color}  fgcolor  Foreground color
   * @param  {number}  fontSize  Font size of text, in pixels
   * @param  {boolean}  isBold  Whether the text is bold
   * @return {{isValid: boolean, contrastRatio: number}}
   */
      color.hasValidContrastRatio = function(bg, fg, fontSize, isBold) {
        var contrast = color.getContrast(bg, fg);
        var isSmallFont = isBold && Math.ceil(fontSize * 72) / 96 < 14 || !isBold && Math.ceil(fontSize * 72) / 96 < 18;
        return {
          isValid: isSmallFont && contrast >= 4.5 || !isSmallFont && contrast >= 3,
          contrastRatio: contrast
        };
      };
      /*global color */
      function _getFonts(style) {
        return style.getPropertyValue('font-family').split(/[,;]/g).map(function(font) {
          return font.trim().toLowerCase();
        });
      }
      function elementIsDistinct(node, ancestorNode) {
        var nodeStyle = window.getComputedStyle(node);
        // Check if the link has a background
        if (nodeStyle.getPropertyValue('background-image') !== 'none') {
          return true;
        }
        // Check if the link has a border or outline
        var hasBorder = [ 'border-bottom', 'border-top', 'outline' ].reduce(function(result, edge) {
          var borderClr = new color.Color();
          borderClr.parseRgbString(nodeStyle.getPropertyValue(edge + '-color'));
          // Check if a border/outline was specified
          // or if the current border edge / outline
          return result || nodeStyle.getPropertyValue(edge + '-style') !== 'none' && parseFloat(nodeStyle.getPropertyValue(edge + '-width')) > 0 && borderClr.alpha !== 0;
        }, false);
        if (hasBorder) {
          return true;
        }
        var parentStyle = window.getComputedStyle(ancestorNode);
        // Compare fonts
        if (_getFonts(nodeStyle)[0] !== _getFonts(parentStyle)[0]) {
          return true;
        }
        var hasStyle = [ 'text-decoration-line', 'text-decoration-style', 'font-weight', 'font-style', 'font-size' ].reduce(function(result, cssProp) {
          return result || nodeStyle.getPropertyValue(cssProp) !== parentStyle.getPropertyValue(cssProp);
        }, false);
        var tDec = nodeStyle.getPropertyValue('text-decoration');
        if (tDec.split(' ').length < 3) {
          // old style CSS text decoration
          hasStyle = hasStyle || tDec !== parentStyle.getPropertyValue('text-decoration');
        }
        return hasStyle;
      }
      color.elementIsDistinct = elementIsDistinct;
      /* global color, dom */
      var graphicNodes = [ 'IMG', 'CANVAS', 'OBJECT', 'IFRAME', 'VIDEO', 'SVG' ];
      function elmHasImage(elm, style) {
        var nodeName = elm.nodeName.toUpperCase();
        if (graphicNodes.includes(nodeName)) {
          return true;
        }
        style = style || window.getComputedStyle(elm);
        return style.getPropertyValue('background-image') !== 'none';
      }
      /**
   * Returns the non-alpha-blended background color of an element
   * @param {Element} elm
   * @return {Color}
   */
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
      function calculateObscuringAlpha(elmIndex, elmStack) {
        var totalAlpha = 0;
        if (elmIndex > 0) {
          // there are elements above our element, check if they are contribute to the background
          for (var i = elmIndex - 1; i >= 0; i--) {
            var bgElm = elmStack[i];
            var bgElmStyle = window.getComputedStyle(bgElm);
            var bgColor = getBgColor(bgElm, bgElmStyle);
            if (bgColor.alpha) {
              totalAlpha += bgColor.alpha;
            } else {
              // remove elements not contributing to the background
              elmStack.splice(i, 1);
            }
          }
        }
        return totalAlpha;
      }
      /**
   * Get all elements rendered underneath the current element, 
   * in the order in which it is rendered
   */
      color.getBackgroundStack = function(elm) {
        var rect = elm.getBoundingClientRect();
        var x = void 0, y = void 0;
        if (rect.left > window.innerWidth) {
          return;
        }
        if (rect.top > window.innerWidth) {
          return;
        }
        x = Math.min(Math.ceil(rect.left + rect.width / 2), window.innerWidth - 1);
        y = Math.min(Math.ceil(rect.top + rect.height / 2), window.innerHeight - 1);
        var elmStack = document.elementsFromPoint(x, y);
        elmStack = dom.reduceToElementsBelowFloating(elmStack, elm);
        var bodyIndex = elmStack.indexOf(document.body);
        if (// Check that the body background is the page's background
        bodyIndex > 1 && // only if there are negative z-index elements
        !elmHasImage(document.documentElement) && getBgColor(document.documentElement).alpha === 0) {
          // Remove body and html from it's current place
          elmStack.splice(bodyIndex, 1);
          elmStack.splice(elmStack.indexOf(document.documentElement), 1);
          // Put the body background as the lowest element
          elmStack.push(document.body);
        }
        // Return all elements BELOW the current element, null if the element is undefined
        var elmIndex = elmStack.indexOf(elm);
        if (calculateObscuringAlpha(elmIndex, elmStack) >= .99) {
          // if the total of the elements above our element results in total obscuring, return null
          return null;
        }
        return elmIndex !== -1 ? elmStack : null;
      };
      color.getBackgroundColor = function(elm) {
        var bgElms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var noScroll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (noScroll !== true) {
          elm.scrollIntoView();
        }
        var bgColors = [];
        var elmStack = color.getBackgroundStack(elm);
        // Search the stack until we have an alpha === 1 background
        (elmStack || []).some(function(bgElm) {
          var bgElmStyle = window.getComputedStyle(bgElm);
          // Get the background color
          var bgColor = getBgColor(bgElm, bgElmStyle);
          if (// abort if a node is outside it's parent and its parent has a background
          elm !== bgElm && !dom.visuallyContains(elm, bgElm) && bgColor.alpha !== 0 || // OR if the background elm is a graphic
          elmHasImage(bgElm, bgElmStyle)) {
            bgColors = null;
            bgElms.push(bgElm);
            return true;
          }
          if (bgColor.alpha !== 0) {
            // store elements contributing to the br color.
            bgElms.push(bgElm);
            bgColors.push(bgColor);
            // Exit if the background is opaque
            return bgColor.alpha === 1;
          } else {
            return false;
          }
        });
        if (bgColors !== null && elmStack !== null) {
          // Mix the colors together, on top of a default white
          bgColors.push(new color.Color(255, 255, 255, 1));
          return bgColors.reduce(color.flattenColors);
        }
        return null;
      };
      /**
   * Determines whether an element has a fully opaque background, whether solid color or an image
   * @param {Element} node
   * @return {Boolean} false if the background is transparent, true otherwise
   */
      dom.isOpaque = function(node) {
        var style = window.getComputedStyle(node);
        return elmHasImage(node, style) || getBgColor(node, style).alpha === 1;
      };
      /*global color */
      /**
   * Returns the flattened foreground color of an element, or null if it can't be determined because
   * of transparency
   * @param {Element} node
   * @param {Boolean} noScroll (default false)
   * @return {Color}
   */
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
          return null;
        }
        return color.flattenColors(fgColor, bgColor);
      };
      /* global dom */
      /**
   * Reduce an array of elements to only those that are below a 'floating' element.
   *
   * @param {Array} elements
   * @param {Element} targetNode
   * @returns {Array}
   */
      dom.reduceToElementsBelowFloating = function(elements, targetNode) {
        var floatingPositions = [ 'fixed', 'sticky' ], finalElements = [], targetFound = false, index, currentNode, style;
        // Filter out elements that are temporarily floating above the target
        for (index = 0; index < elements.length; ++index) {
          currentNode = elements[index];
          if (currentNode === targetNode) {
            targetFound = true;
          }
          style = window.getComputedStyle(currentNode);
          if (!targetFound && floatingPositions.indexOf(style.position) !== -1) {
            //Target was not found yet, so it must be under this floating thing (and will not always be under it)
            finalElements = [];
            continue;
          }
          finalElements.push(currentNode);
        }
        return finalElements;
      };
      /*global dom, axe */
      /**
   * recusively walk up the DOM, checking for a node which matches a selector
   *
   * **WARNING:** this should be used sparingly, as it's not even close to being performant
   *
   * @param {HTMLElement|String} element The starting HTMLElement
   * @param {String} selector The selector for the HTMLElement
   * @return {HTMLElement|null} Either the matching HTMLElement or `null` if there was no match
   */
      dom.findUp = function(element, target) {
        'use strict';
        /*jslint browser:true*/
        var parent, matches = document.querySelectorAll(target), length = matches.length;
        if (!length) {
          return null;
        }
        matches = axe.utils.toArray(matches);
        parent = element.parentNode;
        // recrusively walk up the DOM, checking each parent node
        while (parent && matches.indexOf(parent) === -1) {
          parent = parent.parentNode;
        }
        return parent;
      };
      /*global dom */
      dom.getElementByReference = function(node, attr) {
        'use strict';
        var candidate, fragment = node.getAttribute(attr), doc = document;
        if (fragment && fragment.charAt(0) === '#') {
          fragment = fragment.substring(1);
          candidate = doc.getElementById(fragment);
          if (candidate) {
            return candidate;
          }
          candidate = doc.getElementsByName(fragment);
          if (candidate.length) {
            return candidate[0];
          }
        }
        return null;
      };
      /*global dom */
      /**
   * Get the coordinates of the element passed into the function relative to the document
   *
   * #### Returns
   *
   * Returns a `Object` with the following properties, which
   * each hold a value representing the pixels for each of the
   * respective coordinates:
   *
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   * - `width`
   * - `height`
   *
   * @param {HTMLElement} el The HTMLElement
   */
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
      /*global dom */
      /**
   * Get the scroll offset of the document passed in
   *
   * @param {Document} element The element to evaluate, defaults to document
   * @return {Object} Contains the attributes `x` and `y` which contain the scroll offsets
   */
      dom.getScrollOffset = function(element) {
        'use strict';
        if (!element.nodeType && element.document) {
          element = element.document;
        }
        // 9 === Node.DOCUMENT_NODE
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
      /*global dom */
      /**
   * Gets the width and height of the viewport; used to calculate the right and bottom boundaries of the viewable area.
   *
   * @api private
   * @param  {Object}  window The `window` object that should be measured
   * @return {Object}  Object with the `width` and `height` of the viewport
   */
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
      /*global dom, axe */
      /**
   * Get elements referenced via a space-separated token attribute; it will insert `null` for any Element that is not found
   * @param  {HTMLElement} node
   * @param  {String} attr The name of attribute
   * @return {Array}      Array of elements (or `null` if not found)
   */
      dom.idrefs = function(node, attr) {
        'use strict';
        var index, length, doc = document, result = [], idrefs = node.getAttribute(attr);
        if (idrefs) {
          idrefs = axe.utils.tokenList(idrefs);
          for (index = 0, length = idrefs.length; index < length; index++) {
            result.push(doc.getElementById(idrefs[index]));
          }
        }
        return result;
      };
      /*global dom */
      /* jshint maxcomplexity: 20 */
      /**
   * Determines if an element is focusable
   * @param {HTMLelement} element The HTMLelement
   * @return {Boolean} The element's focusability status
   */
      dom.isFocusable = function(el) {
        'use strict';
        if (!el || el.disabled || !dom.isVisible(el) && el.nodeName.toUpperCase() !== 'AREA') {
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
        // check if the tabindex is specified and a parseable number
        var tabindex = el.getAttribute('tabindex');
        if (tabindex && !isNaN(parseInt(tabindex, 10))) {
          return true;
        }
        return false;
      };
      /*global dom */
      dom.isHTML5 = function(doc) {
        var node = doc.doctype;
        if (node === null) {
          return false;
        }
        return node.name === 'html' && !node.publicId && !node.systemId;
      };
      /* global axe, dom, window */
      function walkDomNode(node, functor) {
        'use strict';
        var shouldWalk = functor(node);
        node = node.firstChild;
        while (node) {
          if (shouldWalk !== false) {
            walkDomNode(node, functor);
          }
          node = node.nextSibling;
        }
      }
      var blockLike = [ 'block', 'list-item', 'table', 'flex', 'grid', 'inline-block' ];
      function isBlock(elm) {
        'use strict';
        var display = window.getComputedStyle(elm).getPropertyValue('display');
        return blockLike.indexOf(display) !== -1 || display.substr(0, 6) === 'table-';
      }
      dom.isInTextBlock = function isInTextBlock(node) {
        // jshint maxcomplexity: 15
        'use strict';
        // Ignore if the link is a block
        if (isBlock(node)) {
          return false;
        }
        // Find the closest parent
        var parentBlock = node.parentNode;
        while (parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
          parentBlock = parentBlock.parentNode;
        }
        // Find all the text part of the parent block not in a link, and all the text in a link
        var parentText = '';
        var linkText = '';
        var inBrBlock = 0;
        // We want to ignore hidden text, and if br / hr is used, only use the section of the parent 
        // that has the link we're looking at
        walkDomNode(parentBlock, function(currNode) {
          // We're already passed it, skip everything else
          if (inBrBlock === 2) {
            return false;
          }
          if (currNode.nodeType === 3) {
            // Add the text to the parent
            parentText += currNode.nodeValue;
          }
          // Ignore any node that's not an element (or text as above)
          if (currNode.nodeType !== 1) {
            return;
          }
          var nodeName = (currNode.nodeName || '').toUpperCase();
          // BR and HR elements break the line
          if ([ 'BR', 'HR' ].indexOf(nodeName) !== -1) {
            if (inBrBlock === 0) {
              parentText = '';
              linkText = '';
            } else {
              inBrBlock = 2;
            }
          } else {
            if (currNode.style.display === 'none' || currNode.style.overflow === 'hidden' || [ '', null, 'none' ].indexOf(currNode.style.float) === -1 || [ '', null, 'relative' ].indexOf(currNode.style.position) === -1) {
              return false;
            } else {
              if (nodeName === 'A' && currNode.href || (currNode.getAttribute('role') || '').toLowerCase() === 'link') {
                if (currNode === node) {
                  inBrBlock = 1;
                }
                // Grab all the text from this element, but don't walk down it's children
                linkText += currNode.textContent;
                return false;
              }
            }
          }
        });
        parentText = axe.commons.text.sanitize(parentText);
        linkText = axe.commons.text.sanitize(linkText);
        return parentText.length > linkText.length;
      };
      /*global dom */
      dom.isNode = function(candidate) {
        'use strict';
        return candidate instanceof Node;
      };
      /*global dom */
      dom.isOffscreen = function(element) {
        'use strict';
        var leftBoundary, docElement = document.documentElement, dir = window.getComputedStyle(document.body || docElement).getPropertyValue('direction'), coords = dom.getElementCoordinates(element);
        // bottom edge beyond
        if (coords.bottom < 0) {
          return true;
        }
        if (dir === 'ltr') {
          if (coords.right < 0) {
            return true;
          }
        } else {
          leftBoundary = Math.max(docElement.scrollWidth, dom.getViewportSize(window).width);
          if (coords.left > leftBoundary) {
            return true;
          }
        }
        return false;
      };
      /*global dom */
      /*jshint maxcomplexity: 11 */
      /**
   * Determines if an element is hidden with the clip rect technique
   * @param  {String}  clip Computed property value of clip
   * @return {Boolean}
   */
      function isClipped(clip) {
        'use strict';
        var matches = clip.match(/rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/);
        if (matches && matches.length === 5) {
          return matches[3] - matches[1] <= 0 && matches[2] - matches[4] <= 0;
        }
        return false;
      }
      /**
   * Determine whether an element is visible
   *
   * @param {HTMLElement} el The HTMLElement
   * @param {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
   * @return {Boolean} The element's visibilty status
   */
      dom.isVisible = function(el, screenReader, recursed) {
        'use strict';
        var style, nodeName = el.nodeName.toUpperCase(), parent = el.parentNode;
        // 9 === Node.DOCUMENT
        if (el.nodeType === 9) {
          return true;
        }
        style = window.getComputedStyle(el, null);
        if (style === null) {
          return false;
        }
        if (style.getPropertyValue('display') === 'none' || nodeName.toUpperCase() === 'STYLE' || nodeName.toUpperCase() === 'SCRIPT' || !screenReader && isClipped(style.getPropertyValue('clip')) || !recursed && (// visibility is only accurate on the first element
        style.getPropertyValue('visibility') === 'hidden' || // position does not matter if it was already calculated
        !screenReader && dom.isOffscreen(el)) || screenReader && el.getAttribute('aria-hidden') === 'true') {
          return false;
        }
        if (parent) {
          return dom.isVisible(parent, screenReader, true);
        }
        return false;
      };
      /*global dom */
      /*jshint maxcomplexity: 20 */
      /**
   * Check if an element is an inherently visual element
   * @param  {object}  candidate The node to check
   * @return {Boolean}
   */
      dom.isVisualContent = function(candidate) {
        'use strict';
        switch (candidate.tagName.toUpperCase()) {
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
          return candidate.type !== 'hidden';

         default:
          return false;
        }
      };
      /* global dom */
      /* jshint maxcomplexity: 11 */
      /**
   * Checks whether a parent element visually contains its child, either directly or via scrolling.
   * Assumes that |parent| is an ancestor of |node|.
   * @param {Element} node
   * @param {Element} parent
   * @return {boolean} True if node is visually contained within parent
   */
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
        //In theory, we should just be able to look at the scroll area as a superset of the parentRect,
        //but that's not true in Firefox
        if (rect.left < parentScrollArea.left && rect.left < parentRect.left || rect.top < parentScrollArea.top && rect.top < parentRect.top || rect.right > parentScrollArea.right && rect.right > parentRect.right || rect.bottom > parentScrollArea.bottom && rect.bottom > parentRect.bottom) {
          return false;
        }
        var style = window.getComputedStyle(parent);
        if (rect.right > parentRect.right || rect.bottom > parentRect.bottom) {
          return style.overflow === 'scroll' || style.overflow === 'auto' || style.overflow === 'hidden' || parent instanceof HTMLBodyElement || parent instanceof HTMLHtmlElement;
        }
        return true;
      };
      /* global dom */
      /* jshint maxcomplexity: 11 */
      /**
   * Checks whether a parent element visually overlaps a rectangle, either directly or via scrolling.
   * @param {DOMRect} rect
   * @param {Element} parent
   * @return {boolean} True if rect is visually contained within parent
   */
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
        //In theory, we should just be able to look at the scroll area as a superset of the parentRect,
        //but that's not true in Firefox
        if (rect.left > parentScrollArea.right && rect.left > parentRect.right || rect.top > parentScrollArea.bottom && rect.top > parentRect.bottom || rect.right < parentScrollArea.left && rect.right < parentRect.left || rect.bottom < parentScrollArea.top && rect.bottom < parentRect.top) {
          return false;
        }
        var style = window.getComputedStyle(parent);
        if (rect.left > parentRect.right || rect.top > parentRect.bottom) {
          return style.overflow === 'scroll' || style.overflow === 'auto' || parent instanceof HTMLBodyElement || parent instanceof HTMLHtmlElement;
        }
        return true;
      };
      /* global table */
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
      /*global table, dom */
      /**
   * Get the x, y coordinates of a table cell; normalized for rowspan and colspan
   * @param  {HTMLTableCelLElement} cell The table cell of which to get the position
   * @return {Object}      Object with `x` and `y` properties of the coordinates
   */
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
      /*global table */
      /**
   * Get any associated table headers for a `HTMLTableCellElement`
   * @param  {HTMLTableCellElement} cell The cell of which to get headers
   * @return {Array}      Array of headers associated to the table cell
   */
      table.getHeaders = function(cell) {
        if (cell.hasAttribute('headers')) {
          return commons.dom.idrefs(cell, 'headers');
        }
        var tableGrid = commons.table.toGrid(commons.dom.findUp(cell, 'table'));
        var position = commons.table.getCellPosition(cell, tableGrid);
        // TODO: RTL text
        var rowHeaders = table.traverse('left', position, tableGrid).filter(function(cell) {
          return table.isRowHeader(cell);
        });
        var colHeaders = table.traverse('up', position, tableGrid).filter(function(cell) {
          return table.isColumnHeader(cell);
        });
        return [].concat(rowHeaders, colHeaders).reverse();
      };
      /*global table, dom */
      /**
   * Determine if a `HTMLTableCellElement` is a column header
   * @param  {HTMLTableCellElement}  node The table cell to test
   * @return {Boolean}
   */
      table.getScope = function(cell) {
        var scope = cell.getAttribute('scope');
        var role = cell.getAttribute('role');
        if (cell instanceof Element === false || [ 'TD', 'TH' ].indexOf(cell.nodeName.toUpperCase()) === -1) {
          throw new TypeError('Expected TD or TH element');
        }
        if (role === 'columnheader') {
          return 'col';
        } else {
          if (role === 'rowheader') {
            return 'row';
          } else {
            if (scope === 'col' || scope === 'row') {
              return scope;
            } else {
              if (cell.nodeName.toUpperCase() !== 'TH') {
                return false;
              }
            }
          }
        }
        var tableGrid = table.toGrid(dom.findUp(cell, 'table'));
        var pos = table.getCellPosition(cell);
        // The element is in a row with all th elements, that makes it a column header
        var headerRow = tableGrid[pos.y].reduce(function(headerRow, cell) {
          return headerRow && cell.nodeName.toUpperCase() === 'TH';
        }, true);
        if (headerRow) {
          return 'col';
        }
        // The element is in a column with all th elements, that makes it a row header
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
      /*global table */
      /**
   * Determine if a `HTMLTableCellElement` is a column header
   * @param  {HTMLTableCellElement}  node The table cell to test
   * @return {Boolean}
   */
      table.isColumnHeader = function(node) {
        return [ 'col', 'auto' ].indexOf(table.getScope(node)) !== -1;
      };
      /*global table */
      /**
   * Determine if a `HTMLTableCellElement` is a data cell
   * @param  {HTMLTableCellElement}  node The table cell to test
   * @return {Boolean}
   */
      table.isDataCell = function(cell) {
        // @see http://www.whatwg.org/specs/web-apps/current-work/multipage/tables.html#empty-cell
        if (!cell.children.length && !cell.textContent.trim()) {
          return false;
        }
        return cell.nodeName.toUpperCase() === 'TD';
      };
      /*global table, dom */
      /*jshint maxstatements: 70, maxcomplexity: 40 */
      /**
   * Determines whether a table is a data table
   * @param  {HTMLTableElement}  node The table to test
   * @return {Boolean}
   * @see http://asurkov.blogspot.co.uk/2011/10/data-vs-layout-table.html
   */
      table.isDataTable = function(node) {
        var role = node.getAttribute('role');
        // The element is not focusable and has role=presentation
        if ((role === 'presentation' || role === 'none') && !dom.isFocusable(node)) {
          return false;
        }
        // Table inside editable area is data table always since the table structure is crucial for table editing
        if (node.getAttribute('contenteditable') === 'true' || dom.findUp(node, '[contenteditable="true"]')) {
          return true;
        }
        // Table having ARIA table related role is data table
        if (role === 'grid' || role === 'treegrid' || role === 'table') {
          return true;
        }
        // Table having ARIA landmark role is data table
        if (commons.aria.getRoleType(role) === 'landmark') {
          return true;
        }
        // Table having datatable="0" attribute is layout table
        if (node.getAttribute('datatable') === '0') {
          return false;
        }
        // Table having summary attribute is data table
        if (node.getAttribute('summary')) {
          return true;
        }
        // Table having legitimate data table structures is data table
        if (node.tHead || node.tFoot || node.caption) {
          return true;
        }
        // colgroup / col - colgroup is magically generated
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
            if ([ 'columnheader', 'rowheader' ].indexOf(cell.getAttribute('role')) !== -1) {
              return true;
            }
            // abbr element as a single child element of table cell
            if (cell.children.length === 1 && cell.children[0].nodeName.toUpperCase() === 'ABBR') {
              return true;
            }
            cells++;
          }
        }
        // Table having nested table is layout table
        if (node.getElementsByTagName('table').length) {
          return false;
        }
        // Table having only one row or column is layout table (row)
        if (rowLength < 2) {
          return false;
        }
        // Table having only one row or column is layout table (column)
        var sampleRow = node.rows[Math.ceil(rowLength / 2)];
        if (sampleRow.cells.length === 1 && sampleRow.cells[0].colSpan === 1) {
          return false;
        }
        // Table having many columns (>= 5) is data table
        if (sampleRow.cells.length >= 5) {
          return true;
        }
        // Table having borders around cells is data table
        if (hasBorder) {
          return true;
        }
        // Table having differently colored rows is data table
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
        // Table having many rows (>= 20) is data table
        if (rowLength >= 20) {
          return true;
        }
        // Wide table (more than 95% of the document width) is layout table
        if (dom.getElementCoordinates(node).width > dom.getViewportSize(window).width * .95) {
          return false;
        }
        // Table having small amount of cells (<= 10) is layout table
        if (cells < 10) {
          return false;
        }
        // Table containing embed, object, applet of iframe elements (typical advertisements elements) is layout table
        if (node.querySelector('object, embed, iframe, applet')) {
          return false;
        }
        // Otherwise it's data table
        return true;
      };
      /*global table, axe */
      /**
   * Determine if a `HTMLTableCellElement` is a header
   * @param  {HTMLTableCellElement}  node The table cell to test
   * @return {Boolean}
   */
      table.isHeader = function(cell) {
        if (table.isColumnHeader(cell) || table.isRowHeader(cell)) {
          return true;
        }
        if (cell.id) {
          return !!document.querySelector('[headers~="' + axe.utils.escapeSelector(cell.id) + '"]');
        }
        return false;
      };
      /*global table */
      /**
   * Determine if a `HTMLTableCellElement` is a row header
   * @param  {HTMLTableCellElement}  node The table cell to test
   * @return {Boolean}
   */
      table.isRowHeader = function(node) {
        return [ 'row', 'auto' ].indexOf(table.getScope(node)) !== -1;
      };
      /*global table */
      /**
   * Converts a table to an Array of arrays, normalized for row and column spans
   * @param  {HTMLTableElement} node The table to convert
   * @return {Array}      Array of rows and cells
   */
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
      // This was the old name
      table.toArray = table.toGrid;
      /* global table */
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
              // abort
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
        /**
    * Traverses a table in a given direction, passing it to the callback
    * @param  {object}   dir      Direction that will be added recursively {x: 1, y: 0};
    * @param  {object}   start    x/y coordinate: {x: 0, y: 0};
    * @param  {array}    [table]  A matrix of the table obtained using axe.commons.table.toArray (OPTIONAL)
    * @param  {Function} callback Function to which each cell will be passed
    * @return {nodeElemtn}        If the callback returns true, the traversal will end and the cell will be returned
    */
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
      /*global text, dom, aria, axe */
      /*jshint maxstatements: 25, maxcomplexity: 19 */
      var defaultButtonValues = {
        submit: 'Submit',
        reset: 'Reset'
      };
      var inputTypes = [ 'text', 'search', 'tel', 'url', 'email', 'date', 'time', 'number', 'range', 'color' ];
      var phrasingElements = [ 'A', 'EM', 'STRONG', 'SMALL', 'MARK', 'ABBR', 'DFN', 'I', 'B', 'S', 'U', 'CODE', 'VAR', 'SAMP', 'KBD', 'SUP', 'SUB', 'Q', 'CITE', 'SPAN', 'BDO', 'BDI', 'BR', 'WBR', 'INS', 'DEL', 'IMG', 'EMBED', 'OBJECT', 'IFRAME', 'MAP', 'AREA', 'SCRIPT', 'NOSCRIPT', 'RUBY', 'VIDEO', 'AUDIO', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'LABEL', 'OUTPUT', 'DATALIST', 'KEYGEN', 'PROGRESS', 'COMMAND', 'CANVAS', 'TIME', 'METER' ];
      /**
   * Find a non-ARIA label for an element
   *
   * @param {HTMLElement} element The HTMLElement
   * @return {HTMLElement} The label element, or null if none is found
   */
      function findLabel(element) {
        var ref = null;
        if (element.id) {
          ref = document.querySelector('label[for="' + axe.utils.escapeSelector(element.id) + '"]');
          if (ref) {
            return ref;
          }
        }
        ref = dom.findUp(element, 'label');
        return ref;
      }
      function isButton(element) {
        return [ 'button', 'reset', 'submit' ].indexOf(element.type) !== -1;
      }
      function isInput(element) {
        var nodeName = element.nodeName.toUpperCase();
        return nodeName === 'TEXTAREA' || nodeName === 'SELECT' || nodeName === 'INPUT' && element.type.toLowerCase() !== 'hidden';
      }
      function shouldCheckSubtree(element) {
        return [ 'BUTTON', 'SUMMARY', 'A' ].indexOf(element.nodeName.toUpperCase()) !== -1;
      }
      function shouldNeverCheckSubtree(element) {
        return [ 'TABLE', 'FIGURE' ].indexOf(element.nodeName.toUpperCase()) !== -1;
      }
      /**
   * Calculate value of a form element when treated as a value
   *
   * @param {HTMLElement} element The HTMLElement
   * @return {string} The calculated value
   */
      function formValueText(element) {
        var nodeName = element.nodeName.toUpperCase();
        if (nodeName === 'INPUT') {
          if (!element.hasAttribute('type') || inputTypes.indexOf(element.getAttribute('type').toLowerCase()) !== -1 && element.value) {
            return element.value;
          }
          return '';
        }
        if (nodeName === 'SELECT') {
          var opts = element.options;
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
        if (nodeName === 'TEXTAREA' && element.value) {
          return element.value;
        }
        return '';
      }
      function checkDescendant(element, nodeName) {
        var candidate = element.querySelector(nodeName.toLowerCase());
        if (candidate) {
          return text.accessibleText(candidate);
        }
        return '';
      }
      /**
   * Determine whether an element can be an embedded control
   *
   * @param {HTMLElement} element The HTMLElement
   * @return {boolean} True if embedded control
   */
      function isEmbeddedControl(e) {
        if (!e) {
          return false;
        }
        switch (e.nodeName.toUpperCase()) {
         case 'SELECT':
         case 'TEXTAREA':
          return true;

         case 'INPUT':
          return !e.hasAttribute('type') || inputTypes.indexOf(e.getAttribute('type').toLowerCase()) !== -1;

         default:
          return false;
        }
      }
      function shouldCheckAlt(element) {
        var nodeName = element.nodeName.toUpperCase();
        return nodeName === 'INPUT' && element.type.toLowerCase() === 'image' || [ 'IMG', 'APPLET', 'AREA' ].indexOf(nodeName) !== -1;
      }
      function nonEmptyText(t) {
        return !!text.sanitize(t);
      }
      /**
   * Determine the accessible text of an element, using logic from ARIA:
   * http://www.w3.org/TR/html-aam-1.0/
   * http://www.w3.org/TR/wai-aria/roles#textalternativecomputation
   *
   * @param {HTMLElement} element The HTMLElement
   * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
   * @return {string}
   */
      text.accessibleText = function(element, inLabelledByContext) {
        var accessibleNameComputation;
        var encounteredNodes = [];
        function getInnerText(element, inLabelledByContext, inControlContext) {
          var nodes = element.childNodes;
          var returnText = '';
          var node;
          for (var i = 0; i < nodes.length; i++) {
            node = nodes[i];
            if (node.nodeType === 3) {
              returnText += node.textContent;
            } else {
              if (node.nodeType === 1) {
                if (phrasingElements.indexOf(node.nodeName.toUpperCase()) === -1) {
                  returnText += ' ';
                }
                returnText += accessibleNameComputation(nodes[i], inLabelledByContext, inControlContext);
              }
            }
          }
          return returnText;
        }
        function checkNative(element, inLabelledByContext, inControlContext) {
          // jshint maxstatements:30
          var returnText = '';
          var nodeName = element.nodeName.toUpperCase();
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
            returnText = element.getAttribute('title') || element.getAttribute('summary') || '';
            if (nonEmptyText(returnText)) {
              return returnText;
            }
          }
          if (shouldCheckAlt(element)) {
            return element.getAttribute('alt') || '';
          }
          if (isInput(element) && !inControlContext) {
            if (isButton(element)) {
              return element.value || element.title || defaultButtonValues[element.type] || '';
            }
            var labelElement = findLabel(element);
            if (labelElement) {
              return accessibleNameComputation(labelElement, inLabelledByContext, true);
            }
          }
          return '';
        }
        function checkARIA(element, inLabelledByContext, inControlContext) {
          if (!inLabelledByContext && element.hasAttribute('aria-labelledby')) {
            return text.sanitize(dom.idrefs(element, 'aria-labelledby').map(function(l) {
              if (element === l) {
                encounteredNodes.pop();
              }
              //let element be encountered twice
              return accessibleNameComputation(l, true, element !== l);
            }).join(' '));
          }
          if (!(inControlContext && isEmbeddedControl(element)) && element.hasAttribute('aria-label')) {
            return text.sanitize(element.getAttribute('aria-label'));
          }
          return '';
        }
        /**
    * Determine the accessible text of an element, using logic from ARIA:
    * http://www.w3.org/TR/accname-aam-1.1/#mapping_additional_nd_name
    *
    * @param {HTMLElement} element The HTMLElement
    * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
    * @param {Boolean} inControlContext True when in the context of textifying a widget
    * @return {string}
    */
        accessibleNameComputation = function accessibleNameComputation(element, inLabelledByContext, inControlContext) {
          'use strict';
          var returnText;
          // If the node was already checked or is null, skip
          if (element === null || encounteredNodes.indexOf(element) !== -1) {
            return '';
          } else {
            if (!inLabelledByContext && !dom.isVisible(element, true)) {
              return '';
            }
          }
          encounteredNodes.push(element);
          var role = element.getAttribute('role');
          //Step 2b & 2c
          returnText = checkARIA(element, inLabelledByContext, inControlContext);
          if (nonEmptyText(returnText)) {
            return returnText;
          }
          //Step 2d - native attribute or elements
          returnText = checkNative(element, inLabelledByContext, inControlContext);
          if (nonEmptyText(returnText)) {
            return returnText;
          }
          //Step 2e
          if (inControlContext) {
            returnText = formValueText(element);
            if (nonEmptyText(returnText)) {
              return returnText;
            }
          }
          //Step 2f
          if (!shouldNeverCheckSubtree(element) && (!role || aria.getRolesWithNameFromContents().indexOf(role) !== -1)) {
            returnText = getInnerText(element, inLabelledByContext, inControlContext);
            if (nonEmptyText(returnText)) {
              return returnText;
            }
          }
          //Step 2g - if text node, return value (handled in getInnerText)
          //Step 2h
          if (element.hasAttribute('title')) {
            return element.getAttribute('title');
          }
          return '';
        };
        return text.sanitize(accessibleNameComputation(element, inLabelledByContext));
      };
      /*global text, dom, axe, aria */
      /**
   * Gets the visible text of a label for a given input
   * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
   * @param  {HTMLElement} node The input to test
   * @return {Mixed}      String of visible text, or `null` if no label is found
   */
      text.label = function(node) {
        var ref, candidate;
        candidate = aria.label(node);
        if (candidate) {
          return candidate;
        }
        // explicit label
        if (node.id) {
          ref = document.querySelector('label[for="' + axe.utils.escapeSelector(node.id) + '"]');
          candidate = ref && text.visible(ref, true);
          if (candidate) {
            return candidate;
          }
        }
        ref = dom.findUp(node, 'label');
        candidate = ref && text.visible(ref, true);
        if (candidate) {
          return candidate;
        }
        return null;
      };
      /*global text */
      text.sanitize = function(str) {
        'use strict';
        return str.replace(/\r\n/g, '\n').replace(/\u00A0/g, ' ').replace(/[\s]{2,}/g, ' ').trim();
      };
      /*global text, dom */
      text.visible = function(element, screenReader, noRecursing) {
        'use strict';
        var index, child, nodeValue, childNodes = element.childNodes, length = childNodes.length, result = '';
        for (index = 0; index < length; index++) {
          child = childNodes[index];
          if (child.nodeType === 3) {
            nodeValue = child.nodeValue;
            if (nodeValue && dom.isVisible(element, screenReader)) {
              result += child.nodeValue;
            }
          } else {
            if (!noRecursing) {
              result += text.visible(child, screenReader);
            }
          }
        }
        return text.sanitize(result);
      };
      /*global axe */
      axe.utils.toArray = function(thing) {
        'use strict';
        return Array.prototype.slice.call(thing);
      };
      /*global axe */
      axe.utils.tokenList = function(str) {
        'use strict';
        return str.trim().replace(/\s{2,}/g, ' ').split(' ');
      };
      return commons;
    }()
  });
})(typeof window === 'object' ? window : this);