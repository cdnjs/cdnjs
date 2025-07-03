(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.pangu = factory());
})(this, function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  const CJK = "\u2E80-\u2EFF\u2F00-\u2FDF\u3040-\u309F\u30A0-\u30FA\u30FC-\u30FF\u3100-\u312F\u3200-\u32FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF";
  const AN = "A-Za-z0-9";
  const A = "A-Za-z";
  const UPPER_AN = "A-Z0-9";
  const OPERATORS_WITH_HYPHEN = "\\+\\-\\*=&";
  const OPERATORS_NO_HYPHEN = "\\+\\*=&";
  const GRADE_OPERATORS = "\\+\\-\\*";
  const QUOTES_FULL = '`"\u05F4';
  const LEFT_BRACKETS_BASIC = "\\(\\[\\{";
  const RIGHT_BRACKETS_BASIC = "\\)\\]\\}";
  const LEFT_BRACKETS_EXTENDED = "\\(\\[\\{<>\u201C";
  const RIGHT_BRACKETS_EXTENDED = "\\)\\]\\}<>\u201D";
  const ANS_CJK_AFTER = `${A}\u0370-\u03FF0-9@\\$%\\^&\\*\\-\\+\\\\=\xA1-\xFF\u2150-\u218F\u2700\u2014\u27BF`;
  const ANS_BEFORE_CJK = `${A}\u0370-\u03FF0-9\\$%\\^&\\*\\-\\+\\\\=\xA1-\xFF\u2150-\u218F\u2700\u2014\u27BF`;
  const UNIX_ABSOLUTE_FILE_PATH = /\/(?:\.?(?:home|root|usr|etc|var|opt|tmp|dev|mnt|proc|sys|bin|boot|lib|media|run|sbin|srv|node_modules|path|project|src|dist|test|tests|docs|templates|assets|public|static|config|scripts|tools|build|out|target|your)|\.(?:[A-Za-z0-9_\-]+))(?:\/[A-Za-z0-9_\-\.@\+\*]+)*/;
  const UNIX_RELATIVE_FILE_PATH = /(?:\.\/)?(?:src|dist|test|tests|docs|templates|assets|public|static|config|scripts|tools|build|out|target|node_modules|\.claude|\.git|\.vscode)(?:\/[A-Za-z0-9_\-\.@\+\*]+)+/;
  const WINDOWS_FILE_PATH = /[A-Z]:\\(?:[A-Za-z0-9_\-\. ]+\\?)+/;
  const ANY_CJK = new RegExp(`[${CJK}]`);
  const CJK_PUNCTUATION = new RegExp(`([${CJK}])([!;,\\?:]+)(?=[${CJK}${AN}])`, "g");
  const AN_PUNCTUATION_CJK = new RegExp(`([${AN}])([!;,\\?]+)([${CJK}])`, "g");
  const CJK_TILDE = new RegExp(`([${CJK}])(~+)(?!=)(?=[${CJK}${AN}])`, "g");
  const CJK_TILDE_EQUALS = new RegExp(`([${CJK}])(~=)`, "g");
  const CJK_PERIOD = new RegExp(`([${CJK}])(\\.)(?![${AN}\\./])(?=[${CJK}${AN}])`, "g");
  const AN_PERIOD_CJK = new RegExp(`([${AN}])(\\.)([${CJK}])`, "g");
  const AN_COLON_CJK = new RegExp(`([${AN}])(:)([${CJK}])`, "g");
  const DOTS_CJK = new RegExp(`([\\.]{2,}|\u2026)([${CJK}])`, "g");
  const FIX_CJK_COLON_ANS = new RegExp(`([${CJK}])\\:([${UPPER_AN}\\(\\)])`, "g");
  const CJK_QUOTE = new RegExp(`([${CJK}])([${QUOTES_FULL}])`, "g");
  const QUOTE_CJK = new RegExp(`([${QUOTES_FULL}])([${CJK}])`, "g");
  const FIX_QUOTE_ANY_QUOTE = new RegExp(`([${QUOTES_FULL}]+)[ ]*(.+?)[ ]*([${QUOTES_FULL}]+)`, "g");
  const QUOTE_AN = new RegExp(`([\u201D])([${AN}])`, "g");
  const CJK_QUOTE_AN = new RegExp(`([${CJK}])(")([${AN}])`, "g");
  const CJK_SINGLE_QUOTE_BUT_POSSESSIVE = new RegExp(`([${CJK}])('[^s])`, "g");
  const SINGLE_QUOTE_CJK = new RegExp(`(')([${CJK}])`, "g");
  const FIX_POSSESSIVE_SINGLE_QUOTE = new RegExp(`([${AN}${CJK}])( )('s)`, "g");
  const HASH_ANS_CJK_HASH = new RegExp(`([${CJK}])(#)([${CJK}]+)(#)([${CJK}])`, "g");
  const CJK_HASH = new RegExp(`([${CJK}])(#([^ ]))`, "g");
  const HASH_CJK = new RegExp(`(([^ ])#)([${CJK}])`, "g");
  const CJK_OPERATOR_ANS = new RegExp(`([${CJK}])([${OPERATORS_WITH_HYPHEN}])([${AN}])`, "g");
  const ANS_OPERATOR_CJK = new RegExp(`([${AN}])([${OPERATORS_WITH_HYPHEN}])([${CJK}])`, "g");
  const ANS_OPERATOR_ANS = new RegExp(`([${AN}])([${OPERATORS_NO_HYPHEN}])([${AN}])`, "g");
  const ANS_HYPHEN_ANS_NOT_COMPOUND = new RegExp(`([A-Za-z])(-(?![a-z]))([A-Za-z0-9])|([A-Za-z]+[0-9]+)(-(?![a-z]))([0-9])|([0-9])(-(?![a-z0-9]))([A-Za-z])`, "g");
  const CJK_SLASH_CJK = new RegExp(`([${CJK}])([/])([${CJK}])`, "g");
  const CJK_SLASH_ANS = new RegExp(`([${CJK}])([/])([${AN}])`, "g");
  const ANS_SLASH_CJK = new RegExp(`([${AN}])([/])([${CJK}])`, "g");
  const ANS_SLASH_ANS = new RegExp(`([${AN}])([/])([${AN}])`, "g");
  const SINGLE_LETTER_GRADE_CJK = new RegExp(`\\b([${A}])([${GRADE_OPERATORS}])([${CJK}])`, "g");
  const CJK_LESS_THAN = new RegExp(`([${CJK}])(<)([${AN}])`, "g");
  const LESS_THAN_CJK = new RegExp(`([${AN}])(<)([${CJK}])`, "g");
  const CJK_GREATER_THAN = new RegExp(`([${CJK}])(>)([${AN}])`, "g");
  const GREATER_THAN_CJK = new RegExp(`([${AN}])(>)([${CJK}])`, "g");
  const ANS_LESS_THAN_ANS = new RegExp(`([${AN}])(<)([${AN}])`, "g");
  const ANS_GREATER_THAN_ANS = new RegExp(`([${AN}])(>)([${AN}])`, "g");
  const CJK_LEFT_BRACKET = new RegExp(`([${CJK}])([${LEFT_BRACKETS_EXTENDED}])`, "g");
  const RIGHT_BRACKET_CJK = new RegExp(`([${RIGHT_BRACKETS_EXTENDED}])([${CJK}])`, "g");
  const ANS_CJK_LEFT_BRACKET_ANY_RIGHT_BRACKET = new RegExp(`([${AN}${CJK}])[ ]*([\u201C])([${AN}${CJK}\\-_ ]+)([\u201D])`, "g");
  const LEFT_BRACKET_ANY_RIGHT_BRACKET_ANS_CJK = new RegExp(`([\u201C])([${AN}${CJK}\\-_ ]+)([\u201D])[ ]*([${AN}${CJK}])`, "g");
  const AN_LEFT_BRACKET = new RegExp(`([${AN}])(?<!\\.[${AN}]*)([${LEFT_BRACKETS_BASIC}])`, "g");
  const RIGHT_BRACKET_AN = new RegExp(`([${RIGHT_BRACKETS_BASIC}])([${AN}])`, "g");
  const CJK_UNIX_ABSOLUTE_FILE_PATH = new RegExp(`([${CJK}])(${UNIX_ABSOLUTE_FILE_PATH.source})`, "g");
  const CJK_UNIX_RELATIVE_FILE_PATH = new RegExp(`([${CJK}])(${UNIX_RELATIVE_FILE_PATH.source})`, "g");
  const CJK_WINDOWS_PATH = new RegExp(`([${CJK}])(${WINDOWS_FILE_PATH.source})`, "g");
  const UNIX_ABSOLUTE_FILE_PATH_SLASH_CJK = new RegExp(`(${UNIX_ABSOLUTE_FILE_PATH.source}/)([${CJK}])`, "g");
  const UNIX_RELATIVE_FILE_PATH_SLASH_CJK = new RegExp(`(${UNIX_RELATIVE_FILE_PATH.source}/)([${CJK}])`, "g");
  const CJK_ANS = new RegExp(`([${CJK}])([${ANS_CJK_AFTER}])`, "g");
  const ANS_CJK = new RegExp(`([${ANS_BEFORE_CJK}])([${CJK}])`, "g");
  const S_A = new RegExp(`(%)([${A}])`, "g");
  const MIDDLE_DOT = /([ ]*)([\u00b7\u2022\u2027])([ ]*)/g;
  class PlaceholderReplacer {
    constructor(placeholder, startDelimiter, endDelimiter) {
      __publicField(this, "placeholder");
      __publicField(this, "items", []);
      __publicField(this, "index", 0);
      __publicField(this, "startDelimiter");
      __publicField(this, "endDelimiter");
      this.placeholder = placeholder;
      this.startDelimiter = startDelimiter;
      this.endDelimiter = endDelimiter;
    }
    store(item) {
      this.items[this.index] = item;
      return `${this.startDelimiter}${this.placeholder}${this.index++}${this.endDelimiter}`;
    }
    restore(text) {
      const pattern = new RegExp(`${this.startDelimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${this.placeholder}(\\d+)${this.endDelimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g");
      return text.replace(pattern, (_match, index) => {
        return this.items[parseInt(index, 10)] || "";
      });
    }
    reset() {
      this.items = [];
      this.index = 0;
    }
  }
  class Pangu {
    constructor() {
      __publicField(this, "version");
      this.version = "7.0.0";
    }
    spacingText(text) {
      if (typeof text !== "string") {
        console.warn(`spacingText(text) only accepts string but got ${typeof text}`);
        return text;
      }
      if (text.length <= 1 || !ANY_CJK.test(text)) {
        return text;
      }
      const self2 = this;
      let newText = text;
      const htmlTagManager = new PlaceholderReplacer("HTML_TAG_PLACEHOLDER_", "\uE000", "\uE001");
      let hasHtmlTags = false;
      if (newText.includes("<")) {
        hasHtmlTags = true;
        const HTML_TAG_PATTERN = /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s+[^>]*)?>/g;
        newText = newText.replace(HTML_TAG_PATTERN, (match) => {
          const processedTag = match.replace(/(\w+)="([^"]*)"/g, (_attrMatch, attrName, attrValue) => {
            const processedValue = self2.spacingText(attrValue);
            return `${attrName}="${processedValue}"`;
          });
          return htmlTagManager.store(processedTag);
        });
      }
      newText = newText.replace(DOTS_CJK, "$1 $2");
      newText = newText.replace(CJK_PUNCTUATION, "$1$2 ");
      newText = newText.replace(AN_PUNCTUATION_CJK, "$1$2 $3");
      newText = newText.replace(CJK_TILDE, "$1$2 ");
      newText = newText.replace(CJK_TILDE_EQUALS, "$1 $2 ");
      newText = newText.replace(CJK_PERIOD, "$1$2 ");
      newText = newText.replace(AN_PERIOD_CJK, "$1$2 $3");
      newText = newText.replace(AN_COLON_CJK, "$1$2 $3");
      newText = newText.replace(FIX_CJK_COLON_ANS, "$1\uFF1A$2");
      newText = newText.replace(CJK_QUOTE, "$1 $2");
      newText = newText.replace(QUOTE_CJK, "$1 $2");
      newText = newText.replace(FIX_QUOTE_ANY_QUOTE, "$1$2$3");
      newText = newText.replace(QUOTE_AN, "$1 $2");
      newText = newText.replace(CJK_QUOTE_AN, "$1$2 $3");
      newText = newText.replace(FIX_POSSESSIVE_SINGLE_QUOTE, "$1's");
      const singleQuoteCJKManager = new PlaceholderReplacer("SINGLE_QUOTE_CJK_PLACEHOLDER_", "\uE030", "\uE031");
      const SINGLE_QUOTE_PURE_CJK = new RegExp(`(')([${CJK}]+)(')`, "g");
      newText = newText.replace(SINGLE_QUOTE_PURE_CJK, (match) => {
        return singleQuoteCJKManager.store(match);
      });
      newText = newText.replace(CJK_SINGLE_QUOTE_BUT_POSSESSIVE, "$1 $2");
      newText = newText.replace(SINGLE_QUOTE_CJK, "$1 $2");
      newText = singleQuoteCJKManager.restore(newText);
      const textLength = newText.length;
      const slashCount = (newText.match(/\//g) || []).length;
      if (slashCount === 0) {
        if (textLength >= 5) {
          newText = newText.replace(HASH_ANS_CJK_HASH, "$1 $2$3$4 $5");
        }
        newText = newText.replace(CJK_HASH, "$1 $2");
        newText = newText.replace(HASH_CJK, "$1 $3");
      } else if (slashCount <= 1) {
        if (textLength >= 5) {
          newText = newText.replace(HASH_ANS_CJK_HASH, "$1 $2$3$4 $5");
        }
        newText = newText.replace(CJK_HASH, "$1 $2");
        newText = newText.replace(HASH_CJK, "$1 $3");
      } else {
        if (textLength >= 5) {
          newText = newText.replace(HASH_ANS_CJK_HASH, "$1 $2$3$4 $5");
        }
        newText = newText.replace(new RegExp(`([^/])([${CJK}])(#[A-Za-z0-9]+)$`), "$1$2 $3");
      }
      const compoundWordManager = new PlaceholderReplacer("COMPOUND_WORD_PLACEHOLDER_", "\uE010", "\uE011");
      const COMPOUND_WORD_PATTERN = /\b(?:[A-Za-z0-9]*[a-z][A-Za-z0-9]*-[A-Za-z0-9]+|[A-Za-z0-9]+-[A-Za-z0-9]*[a-z][A-Za-z0-9]*|[A-Za-z]+-[0-9]+|[A-Za-z]+[0-9]+-[A-Za-z0-9]+)(?:-[A-Za-z0-9]+)*\b/g;
      newText = newText.replace(COMPOUND_WORD_PATTERN, (match) => {
        return compoundWordManager.store(match);
      });
      newText = newText.replace(SINGLE_LETTER_GRADE_CJK, "$1$2 $3");
      newText = newText.replace(CJK_OPERATOR_ANS, "$1 $2 $3");
      newText = newText.replace(ANS_OPERATOR_CJK, "$1 $2 $3");
      newText = newText.replace(ANS_OPERATOR_ANS, "$1 $2 $3");
      newText = newText.replace(ANS_HYPHEN_ANS_NOT_COMPOUND, (match, ...groups) => {
        if (groups[0] && groups[1] && groups[2]) {
          return `${groups[0]} ${groups[1]} ${groups[2]}`;
        } else if (groups[3] && groups[4] && groups[5]) {
          return `${groups[3]} ${groups[4]} ${groups[5]}`;
        } else if (groups[6] && groups[7] && groups[8]) {
          return `${groups[6]} ${groups[7]} ${groups[8]}`;
        }
        return match;
      });
      newText = newText.replace(CJK_LESS_THAN, "$1 $2 $3");
      newText = newText.replace(LESS_THAN_CJK, "$1 $2 $3");
      newText = newText.replace(ANS_LESS_THAN_ANS, "$1 $2 $3");
      newText = newText.replace(CJK_GREATER_THAN, "$1 $2 $3");
      newText = newText.replace(GREATER_THAN_CJK, "$1 $2 $3");
      newText = newText.replace(ANS_GREATER_THAN_ANS, "$1 $2 $3");
      newText = newText.replace(CJK_UNIX_ABSOLUTE_FILE_PATH, "$1 $2");
      newText = newText.replace(CJK_UNIX_RELATIVE_FILE_PATH, "$1 $2");
      newText = newText.replace(CJK_WINDOWS_PATH, "$1 $2");
      newText = newText.replace(UNIX_ABSOLUTE_FILE_PATH_SLASH_CJK, "$1 $2");
      newText = newText.replace(UNIX_RELATIVE_FILE_PATH_SLASH_CJK, "$1 $2");
      if (slashCount === 1) {
        const filePathManager = new PlaceholderReplacer("FILE_PATH_PLACEHOLDER_", "\uE020", "\uE021");
        const allFilePathPattern = new RegExp(`(${UNIX_ABSOLUTE_FILE_PATH.source}|${UNIX_RELATIVE_FILE_PATH.source})`, "g");
        newText = newText.replace(allFilePathPattern, (match) => {
          return filePathManager.store(match);
        });
        newText = newText.replace(CJK_SLASH_CJK, "$1 $2 $3");
        newText = newText.replace(CJK_SLASH_ANS, "$1 $2 $3");
        newText = newText.replace(ANS_SLASH_CJK, "$1 $2 $3");
        newText = newText.replace(ANS_SLASH_ANS, "$1 $2 $3");
        newText = filePathManager.restore(newText);
      }
      newText = compoundWordManager.restore(newText);
      newText = newText.replace(CJK_LEFT_BRACKET, "$1 $2");
      newText = newText.replace(RIGHT_BRACKET_CJK, "$1 $2");
      newText = newText.replace(ANS_CJK_LEFT_BRACKET_ANY_RIGHT_BRACKET, "$1 $2$3$4");
      newText = newText.replace(LEFT_BRACKET_ANY_RIGHT_BRACKET_ANS_CJK, "$1$2$3 $4");
      newText = newText.replace(AN_LEFT_BRACKET, "$1 $2");
      newText = newText.replace(RIGHT_BRACKET_AN, "$1 $2");
      newText = newText.replace(CJK_ANS, "$1 $2");
      newText = newText.replace(ANS_CJK, "$1 $2");
      newText = newText.replace(S_A, "$1 $2");
      newText = newText.replace(MIDDLE_DOT, "\u30FB");
      const fixBracketSpacing = (text2) => {
        const processBracket = (pattern, openBracket, closeBracket) => {
          text2 = text2.replace(pattern, (_match, innerContent) => {
            if (!innerContent) {
              return `${openBracket}${closeBracket}`;
            }
            const trimmedContent = innerContent.replace(/^ +| +$/g, "");
            return `${openBracket}${trimmedContent}${closeBracket}`;
          });
        };
        processBracket(/<([^<>]*)>/g, "<", ">");
        processBracket(/\(([^()]*)\)/g, "(", ")");
        processBracket(/\[([^\[\]]*)\]/g, "[", "]");
        processBracket(/\{([^{}]*)\}/g, "{", "}");
        return text2;
      };
      newText = fixBracketSpacing(newText);
      if (hasHtmlTags) {
        newText = htmlTagManager.restore(newText);
      }
      return newText;
    }
    // alias for spacingText()
    spacing(text) {
      return this.spacingText(text);
    }
    hasProperSpacing(text) {
      return this.spacingText(text) === text;
    }
    convertToFullwidth(symbols) {
      return symbols.replace(/~/g, "\uFF5E").replace(/!/g, "\uFF01").replace(/;/g, "\uFF1B").replace(/:/g, "\uFF1A").replace(/,/g, "\uFF0C").replace(/\./g, "\u3002").replace(/\?/g, "\uFF1F");
    }
  }
  class IdleQueue {
    constructor() {
      __publicField(this, "queue", []);
      __publicField(this, "isProcessing", false);
      __publicField(this, "requestIdleCallback");
      __publicField(this, "totalItems", 0);
      __publicField(this, "processedItems", 0);
      __publicField(this, "callbacks", {});
      if (typeof window.requestIdleCallback === "function") {
        this.requestIdleCallback = window.requestIdleCallback.bind(window);
      } else {
        this.requestIdleCallback = (callback, _options) => {
          const start = performance.now();
          return window.setTimeout(() => {
            callback({
              didTimeout: false,
              timeRemaining() {
                return Math.max(0, 16 - (performance.now() - start));
              }
            });
          }, 0);
        };
      }
    }
    add(work) {
      this.queue.push(work);
      this.totalItems++;
      this.scheduleProcessing();
    }
    clear() {
      this.queue.length = 0;
      this.totalItems = 0;
      this.processedItems = 0;
      this.callbacks = {};
    }
    setCallbacks(callbacks) {
      this.callbacks = callbacks;
    }
    get length() {
      return this.queue.length;
    }
    get progress() {
      return {
        processed: this.processedItems,
        total: this.totalItems,
        percentage: this.totalItems > 0 ? this.processedItems / this.totalItems * 100 : 0
      };
    }
    scheduleProcessing() {
      if (!this.isProcessing && this.queue.length > 0) {
        this.isProcessing = true;
        this.requestIdleCallback((deadline) => this.process(deadline), { timeout: 5e3 });
      }
    }
    process(deadline) {
      var _a, _b, _c, _d;
      while (deadline.timeRemaining() > 0 && this.queue.length > 0) {
        const work = this.queue.shift();
        work == null ? void 0 : work();
        this.processedItems++;
        (_b = (_a = this.callbacks).onProgress) == null ? void 0 : _b.call(_a, this.processedItems, this.totalItems);
      }
      this.isProcessing = false;
      if (this.queue.length > 0) {
        this.scheduleProcessing();
      } else if (this.processedItems === this.totalItems && this.totalItems > 0) {
        (_d = (_c = this.callbacks).onComplete) == null ? void 0 : _d.call(_c);
        this.totalItems = 0;
        this.processedItems = 0;
      }
    }
  }
  class PerformanceMonitor {
    constructor(enabled = false) {
      __publicField(this, "metrics", /* @__PURE__ */ new Map());
      __publicField(this, "enabled");
      this.enabled = enabled;
    }
    measure(label, fn) {
      if (!this.enabled) {
        return fn();
      }
      const start = performance.now();
      const result = fn();
      const duration = performance.now() - start;
      if (!this.metrics.has(label)) {
        this.metrics.set(label, []);
      }
      this.metrics.get(label).push(duration);
      return result;
    }
    getStats(label) {
      const times = this.metrics.get(label);
      if (!times || times.length === 0) {
        return null;
      }
      const total = times.reduce((a, b) => a + b, 0);
      return {
        count: times.length,
        avg: total / times.length,
        min: Math.min(...times),
        max: Math.max(...times),
        total
      };
    }
    getAllStats() {
      const report = {};
      for (const [label] of this.metrics) {
        const stats = this.getStats(label);
        if (stats) {
          report[label] = stats;
        }
      }
      return report;
    }
    reset() {
      this.metrics.clear();
    }
    setEnabled(enabled) {
      this.enabled = enabled;
    }
    logResults() {
      if (!this.enabled) {
        return;
      }
      const report = this.getAllStats();
      if (Object.keys(report).length === 0) {
        return;
      }
      console.group("\u{1F680} Pangu.js Performance Report");
      console.table(report);
      console.groupEnd();
    }
  }
  function once(func) {
    let executed = false;
    return function(...args) {
      if (executed) {
        return void 0;
      }
      executed = true;
      return func(...args);
    };
  }
  function debounce(func, delay, mustRunDelay = Infinity) {
    let timer = null;
    let startTime = null;
    return function(...args) {
      const currentTime = Date.now();
      if (timer) {
        clearTimeout(timer);
      }
      if (!startTime) {
        startTime = currentTime;
      }
      if (currentTime - startTime >= mustRunDelay) {
        func(...args);
        startTime = currentTime;
      } else {
        timer = window.setTimeout(() => {
          func(...args);
        }, delay);
      }
    };
  }
  class BrowserPangu extends Pangu {
    constructor() {
      super();
      __publicField(this, "isAutoSpacingPageExecuted");
      __publicField(this, "autoSpacingPageObserver");
      __publicField(this, "performanceMonitor");
      __publicField(this, "idleQueue");
      __publicField(this, "idleSpacingConfig");
      __publicField(this, "visibilityCheckConfig");
      __publicField(this, "blockTags");
      __publicField(this, "ignoredTags");
      __publicField(this, "presentationalTags");
      __publicField(this, "spaceLikeTags");
      __publicField(this, "spaceSensitiveTags");
      __publicField(this, "ignoredClass");
      this.isAutoSpacingPageExecuted = false;
      this.autoSpacingPageObserver = null;
      this.performanceMonitor = new PerformanceMonitor();
      this.idleQueue = new IdleQueue();
      this.idleSpacingConfig = {
        enabled: false,
        // Disabled by default for backward compatibility
        chunkSize: 10,
        // Process 10 text nodes per idle cycle
        timeout: 5e3
        // 5 second timeout for idle processing
      };
      this.visibilityCheckConfig = {
        enabled: true,
        // Enable for testing in Chrome extension
        checkDuringIdle: true,
        // Use idle time for visibility checks
        commonHiddenPatterns: {
          clipRect: true,
          // clip: rect(1px, 1px, 1px, 1px) patterns
          displayNone: true,
          // display: none
          visibilityHidden: true,
          // visibility: hidden
          opacityZero: true,
          // opacity: 0
          heightWidth1px: true
          // height: 1px; width: 1px
        }
      };
      this.blockTags = /^(div|p|h1|h2|h3|h4|h5|h6)$/i;
      this.ignoredTags = /^(code|pre|script|style|textarea|iframe|input)$/i;
      this.presentationalTags = /^(b|code|del|em|i|s|strong|kbd)$/i;
      this.spaceLikeTags = /^(br|hr|i|img|pangu)$/i;
      this.spaceSensitiveTags = /^(a|del|pre|s|strike|u)$/i;
      this.ignoredClass = "no-pangu-spacing";
    }
    autoSpacingPage({ pageDelayMs = 1e3, nodeDelayMs = 500, nodeMaxWaitMs = 2e3 } = {}) {
      if (!(document.body instanceof Node)) {
        return;
      }
      if (this.isAutoSpacingPageExecuted) {
        return;
      }
      this.isAutoSpacingPageExecuted = true;
      const spacingPageOnce = once(() => {
        this.spacingPage();
      });
      const videos = document.getElementsByTagName("video");
      if (videos.length === 0) {
        setTimeout(() => {
          spacingPageOnce();
        }, pageDelayMs);
      } else {
        for (let i = 0; i < videos.length; i++) {
          const video = videos[i];
          if (video.readyState === 4) {
            setTimeout(() => {
              spacingPageOnce();
            }, 3e3);
            break;
          }
          video.addEventListener("loadeddata", () => {
            setTimeout(() => {
              spacingPageOnce();
            }, 4e3);
          });
        }
      }
      this.setupAutoSpacingPageObserver(nodeDelayMs, nodeMaxWaitMs);
    }
    spacingPage() {
      this.performanceMonitor.measure("spacingPage", () => {
        this.spacingPageTitle();
        this.spacingPageBody();
      });
      this.performanceMonitor.logResults();
    }
    spacingPageTitle() {
      this.performanceMonitor.measure("spacingPageTitle", () => {
        const titleElement = document.querySelector("head > title");
        if (titleElement) {
          this.spacingNode(titleElement);
        }
      });
    }
    spacingPageBody() {
      this.performanceMonitor.measure("spacingPageBody", () => {
        this.spacingNode(document.body);
      });
    }
    spacingNode(contextNode) {
      this.spacingNodeWithTreeWalker(contextNode);
    }
    spacingElementById(idName) {
      const element = document.getElementById(idName);
      if (element) {
        this.spacingNode(element);
      }
    }
    spacingElementByClassName(className) {
      const elements = document.getElementsByClassName(className);
      for (let i = 0; i < elements.length; i++) {
        this.spacingNode(elements[i]);
      }
    }
    spacingElementByTagName(tagName) {
      const elements = document.getElementsByTagName(tagName);
      for (let i = 0; i < elements.length; i++) {
        this.spacingNode(elements[i]);
      }
    }
    stopAutoSpacingPage() {
      if (this.autoSpacingPageObserver) {
        this.autoSpacingPageObserver.disconnect();
        this.autoSpacingPageObserver = null;
      }
      this.isAutoSpacingPageExecuted = false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isContentEditable(node) {
      return node.isContentEditable || node.getAttribute && node.getAttribute("g_editable") === "true";
    }
    isSpecificTag(node, tagRegex) {
      return node && node.nodeName && tagRegex.test(node.nodeName);
    }
    isInsideSpecificTag(node, tagRegex, checkCurrent = false) {
      let currentNode = node;
      if (checkCurrent) {
        if (this.isSpecificTag(currentNode, tagRegex)) {
          return true;
        }
      }
      while (currentNode.parentNode) {
        currentNode = currentNode.parentNode;
        if (this.isSpecificTag(currentNode, tagRegex)) {
          return true;
        }
      }
      return false;
    }
    hasIgnoredClass(node) {
      if (node instanceof Element && node.classList.contains(this.ignoredClass)) {
        return true;
      }
      if (node.parentNode && node.parentNode instanceof Element && node.parentNode.classList.contains(this.ignoredClass)) {
        return true;
      }
      return false;
    }
    canIgnoreNode(node) {
      let currentNode = node;
      if (currentNode && (this.isSpecificTag(currentNode, this.ignoredTags) || this.isContentEditable(currentNode) || this.hasIgnoredClass(currentNode))) {
        return true;
      }
      while (currentNode.parentNode) {
        currentNode = currentNode.parentNode;
        if (currentNode && (this.isSpecificTag(currentNode, this.ignoredTags) || this.isContentEditable(currentNode))) {
          return true;
        }
      }
      return false;
    }
    isFirstTextChild(parentNode, targetNode) {
      const { childNodes } = parentNode;
      for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        if (childNode.nodeType !== Node.COMMENT_NODE && childNode.textContent) {
          return childNode === targetNode;
        }
      }
      return false;
    }
    isLastTextChild(parentNode, targetNode) {
      const { childNodes } = parentNode;
      for (let i = childNodes.length - 1; i > -1; i--) {
        const childNode = childNodes[i];
        if (childNode.nodeType !== Node.COMMENT_NODE && childNode.textContent) {
          return childNode === targetNode;
        }
      }
      return false;
    }
    processTextNodes(textNodes) {
      let currentTextNode;
      let nextTextNode = null;
      for (let i = 0; i < textNodes.length; i++) {
        currentTextNode = textNodes[i];
        if (!currentTextNode) {
          continue;
        }
        if (this.canIgnoreNode(currentTextNode)) {
          nextTextNode = currentTextNode;
          continue;
        }
        if (currentTextNode instanceof Text) {
          if (currentTextNode.data.length === 1 && /["\u201c\u201d]/.test(currentTextNode.data)) {
            if (currentTextNode.previousSibling) {
              const prevNode = currentTextNode.previousSibling;
              if (prevNode.nodeType === Node.ELEMENT_NODE && prevNode.textContent) {
                const lastChar = prevNode.textContent.slice(-1);
                if (/[\u4e00-\u9fff]/.test(lastChar)) {
                  currentTextNode.data = ` ${currentTextNode.data}`;
                }
              }
            }
          } else {
            const newText = this.spacingText(currentTextNode.data);
            if (currentTextNode.data !== newText) {
              currentTextNode.data = newText;
            }
          }
        }
        if (nextTextNode) {
          if (currentTextNode.nextSibling && this.spaceLikeTags.test(currentTextNode.nextSibling.nodeName)) {
            nextTextNode = currentTextNode;
            continue;
          }
          if (!(currentTextNode instanceof Text) || !(nextTextNode instanceof Text)) {
            continue;
          }
          const currentEndsWithSpace = currentTextNode.data.endsWith(" ");
          const nextStartsWithSpace = nextTextNode.data.startsWith(" ");
          let hasWhitespaceBetween = false;
          let currentAncestor = currentTextNode;
          while (currentAncestor.parentNode && this.isLastTextChild(currentAncestor.parentNode, currentAncestor) && !this.spaceSensitiveTags.test(currentAncestor.parentNode.nodeName)) {
            currentAncestor = currentAncestor.parentNode;
          }
          let nextAncestor = nextTextNode;
          while (nextAncestor.parentNode && this.isFirstTextChild(nextAncestor.parentNode, nextAncestor) && !this.spaceSensitiveTags.test(nextAncestor.parentNode.nodeName)) {
            nextAncestor = nextAncestor.parentNode;
          }
          let nodeBetween = currentAncestor.nextSibling;
          while (nodeBetween && nodeBetween !== nextAncestor) {
            if (nodeBetween.nodeType === Node.TEXT_NODE && nodeBetween.textContent && /\s/.test(nodeBetween.textContent)) {
              hasWhitespaceBetween = true;
              break;
            }
            nodeBetween = nodeBetween.nextSibling;
          }
          if (currentEndsWithSpace || nextStartsWithSpace || hasWhitespaceBetween) {
            nextTextNode = currentTextNode;
            continue;
          }
          const testText = currentTextNode.data.slice(-1) + nextTextNode.data.slice(0, 1);
          const testNewText = this.spacingText(testText);
          const currentLast = currentTextNode.data.slice(-1);
          const nextFirst = nextTextNode.data.slice(0, 1);
          const isQuote = (char) => /["\u201c\u201d]/.test(char);
          const isCJK = (char) => /[\u4e00-\u9fff]/.test(char);
          const skipSpacing = isQuote(currentLast) && isCJK(nextFirst) || isCJK(currentLast) && isQuote(nextFirst);
          if (testNewText !== testText && !skipSpacing) {
            let nextNode = nextTextNode;
            while (nextNode.parentNode && !this.spaceSensitiveTags.test(nextNode.nodeName) && this.isFirstTextChild(nextNode.parentNode, nextNode)) {
              nextNode = nextNode.parentNode;
            }
            let currentNode = currentTextNode;
            while (currentNode.parentNode && !this.spaceSensitiveTags.test(currentNode.nodeName) && this.isLastTextChild(currentNode.parentNode, currentNode)) {
              currentNode = currentNode.parentNode;
            }
            if (currentNode.nextSibling) {
              if (this.spaceLikeTags.test(currentNode.nextSibling.nodeName)) {
                nextTextNode = currentTextNode;
                continue;
              }
            }
            if (!this.blockTags.test(currentNode.nodeName)) {
              if (!this.spaceSensitiveTags.test(nextNode.nodeName)) {
                if (!this.ignoredTags.test(nextNode.nodeName) && !this.blockTags.test(nextNode.nodeName)) {
                  if (nextTextNode.previousSibling) {
                    if (!this.spaceLikeTags.test(nextTextNode.previousSibling.nodeName)) {
                      if (nextTextNode instanceof Text && !nextTextNode.data.startsWith(" ")) {
                        if (!this.shouldSkipSpacingAfterNode(currentTextNode)) {
                          nextTextNode.data = ` ${nextTextNode.data}`;
                        }
                      }
                    }
                  } else {
                    if (!this.canIgnoreNode(nextTextNode)) {
                      if (nextTextNode instanceof Text && !nextTextNode.data.startsWith(" ")) {
                        if (!this.shouldSkipSpacingAfterNode(currentTextNode)) {
                          nextTextNode.data = ` ${nextTextNode.data}`;
                        }
                      }
                    }
                  }
                }
              } else if (!this.spaceSensitiveTags.test(currentNode.nodeName)) {
                if (currentTextNode instanceof Text && !currentTextNode.data.endsWith(" ")) {
                  if (!this.shouldSkipSpacingAfterNode(currentTextNode)) {
                    currentTextNode.data = `${currentTextNode.data} `;
                  }
                }
              } else {
                if (!this.shouldSkipSpacingAfterNode(currentTextNode)) {
                  const panguSpace = document.createElement("pangu");
                  panguSpace.innerHTML = " ";
                  if (nextNode.parentNode) {
                    if (nextNode.previousSibling) {
                      if (!this.spaceLikeTags.test(nextNode.previousSibling.nodeName)) {
                        nextNode.parentNode.insertBefore(panguSpace, nextNode);
                      }
                    } else {
                      nextNode.parentNode.insertBefore(panguSpace, nextNode);
                    }
                  }
                  if (!panguSpace.previousElementSibling) {
                    if (panguSpace.parentNode) {
                      panguSpace.parentNode.removeChild(panguSpace);
                    }
                  }
                }
              }
            }
          }
        }
        nextTextNode = currentTextNode;
      }
    }
    collectTextNodes(contextNode, reverse = false) {
      const nodes = [];
      if (!contextNode || contextNode instanceof DocumentFragment) {
        return nodes;
      }
      const walker = document.createTreeWalker(contextNode, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          if (!node.nodeValue || !/\S/.test(node.nodeValue)) {
            return NodeFilter.FILTER_REJECT;
          }
          let currentNode = node;
          while (currentNode) {
            if (currentNode instanceof Element) {
              if (this.ignoredTags.test(currentNode.nodeName)) {
                return NodeFilter.FILTER_REJECT;
              }
              if (this.isContentEditable(currentNode)) {
                return NodeFilter.FILTER_REJECT;
              }
              if (currentNode.classList.contains(this.ignoredClass)) {
                return NodeFilter.FILTER_REJECT;
              }
            }
            currentNode = currentNode.parentNode;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      while (walker.nextNode()) {
        nodes.push(walker.currentNode);
      }
      return reverse ? nodes.reverse() : nodes;
    }
    spacingNodeWithTreeWalker(contextNode) {
      if (!(contextNode instanceof Node) || contextNode instanceof DocumentFragment) {
        return;
      }
      const textNodes = this.performanceMonitor.measure("collectTextNodes", () => {
        return this.collectTextNodes(contextNode, true);
      });
      if (this.idleSpacingConfig.enabled) {
        this.processTextNodesWithIdleCallback(textNodes);
      } else {
        this.performanceMonitor.measure("processTextNodes", () => {
          this.processTextNodes(textNodes);
        });
      }
    }
    processTextNodesWithIdleCallback(textNodes, callbacks) {
      var _a;
      if (textNodes.length === 0) {
        (_a = callbacks == null ? void 0 : callbacks.onComplete) == null ? void 0 : _a.call(callbacks);
        return;
      }
      if (callbacks) {
        this.idleQueue.setCallbacks(callbacks);
      }
      const chunkSize = this.idleSpacingConfig.chunkSize;
      const chunks = [];
      for (let i = 0; i < textNodes.length; i += chunkSize) {
        chunks.push(textNodes.slice(i, i + chunkSize));
      }
      for (const [index, chunk] of chunks.entries()) {
        this.idleQueue.add(() => {
          this.performanceMonitor.measure(`processTextNodesChunk${index}`, () => {
            this.processTextNodes(chunk);
          });
        });
      }
    }
    setupAutoSpacingPageObserver(nodeDelayMs, nodeMaxWaitMs) {
      if (this.autoSpacingPageObserver) {
        this.autoSpacingPageObserver.disconnect();
        this.autoSpacingPageObserver = null;
      }
      const queue = [];
      const debouncedSpacingTitle = debounce(
        () => {
          this.spacingPageTitle();
        },
        nodeDelayMs,
        nodeMaxWaitMs
      );
      const debouncedSpacingNode = debounce(
        () => {
          if (this.idleSpacingConfig.enabled) {
            const nodesToProcess = [...queue];
            queue.length = 0;
            if (nodesToProcess.length > 0) {
              this.spacingNodesWithIdleCallback(nodesToProcess);
            }
          } else {
            while (queue.length) {
              const node = queue.shift();
              if (node) {
                this.spacingNode(node);
              }
            }
          }
        },
        nodeDelayMs,
        nodeMaxWaitMs
      );
      this.autoSpacingPageObserver = new MutationObserver((mutations) => {
        var _a;
        let titleChanged = false;
        for (const mutation of mutations) {
          if (((_a = mutation.target.parentNode) == null ? void 0 : _a.nodeName) === "TITLE" || mutation.target.nodeName === "TITLE") {
            titleChanged = true;
            continue;
          }
          switch (mutation.type) {
            case "characterData":
              const { target: node } = mutation;
              if (node.nodeType === Node.TEXT_NODE && node.parentNode) {
                queue.push(node.parentNode);
              }
              break;
            case "childList":
              for (const node2 of mutation.addedNodes) {
                if (node2.nodeType === Node.ELEMENT_NODE) {
                  queue.push(node2);
                } else if (node2.nodeType === Node.TEXT_NODE && node2.parentNode) {
                  queue.push(node2.parentNode);
                }
              }
              break;
          }
        }
        if (titleChanged) {
          debouncedSpacingTitle();
        }
        debouncedSpacingNode();
      });
      this.autoSpacingPageObserver.observe(document.body, {
        characterData: true,
        childList: true,
        subtree: true
      });
      this.autoSpacingPageObserver.observe(document.head, {
        characterData: true,
        childList: true,
        subtree: true
        // Need subtree to observe text node changes inside title
      });
    }
    // Performance monitoring methods
    enablePerformanceMonitoring() {
      this.performanceMonitor.setEnabled(true);
    }
    disablePerformanceMonitoring() {
      this.performanceMonitor.setEnabled(false);
    }
    getPerformanceReport() {
      return this.performanceMonitor.getAllStats();
    }
    getPerformanceStats(label) {
      return this.performanceMonitor.getStats(label);
    }
    resetPerformanceMetrics() {
      this.performanceMonitor.reset();
    }
    logPerformanceResults() {
      this.performanceMonitor.logResults();
    }
    // Idle processing configuration methods
    enableIdleSpacing(config) {
      this.idleSpacingConfig = {
        ...this.idleSpacingConfig,
        enabled: true,
        ...config
      };
    }
    disableIdleSpacing() {
      this.idleSpacingConfig.enabled = false;
      this.idleQueue.clear();
    }
    getIdleSpacingConfig() {
      return { ...this.idleSpacingConfig };
    }
    getIdleQueueLength() {
      return this.idleQueue.length;
    }
    clearIdleQueue() {
      this.idleQueue.clear();
    }
    getIdleProgress() {
      return this.idleQueue.progress;
    }
    spacingPageWithIdleCallback(callbacks) {
      var _a;
      if (!this.idleSpacingConfig.enabled) {
        this.spacingPage();
        (_a = callbacks == null ? void 0 : callbacks.onComplete) == null ? void 0 : _a.call(callbacks);
        return;
      }
      this.spacingPageTitle();
      this.spacingNodeWithIdleCallback(document.body, callbacks);
    }
    spacingNodeWithIdleCallback(contextNode, callbacks) {
      var _a, _b;
      if (!this.idleSpacingConfig.enabled) {
        this.spacingNode(contextNode);
        (_a = callbacks == null ? void 0 : callbacks.onComplete) == null ? void 0 : _a.call(callbacks);
        return;
      }
      if (!(contextNode instanceof Node) || contextNode instanceof DocumentFragment) {
        (_b = callbacks == null ? void 0 : callbacks.onComplete) == null ? void 0 : _b.call(callbacks);
        return;
      }
      const textNodes = this.performanceMonitor.measure("collectTextNodes", () => {
        return this.collectTextNodes(contextNode, true);
      });
      this.processTextNodesWithIdleCallback(textNodes, callbacks);
    }
    spacingNodesWithIdleCallback(nodes, callbacks) {
      var _a, _b;
      if (!this.idleSpacingConfig.enabled) {
        for (const node of nodes) {
          this.spacingNode(node);
        }
        (_a = callbacks == null ? void 0 : callbacks.onComplete) == null ? void 0 : _a.call(callbacks);
        return;
      }
      if (nodes.length === 0) {
        (_b = callbacks == null ? void 0 : callbacks.onComplete) == null ? void 0 : _b.call(callbacks);
        return;
      }
      const allTextNodes = [];
      for (const node of nodes) {
        if (!(node instanceof Node) || node instanceof DocumentFragment) {
          continue;
        }
        const textNodes = this.performanceMonitor.measure("collectTextNodes", () => {
          return this.collectTextNodes(node, true);
        });
        allTextNodes.push(...textNodes);
      }
      this.processTextNodesWithIdleCallback(allTextNodes, callbacks);
    }
    // Visibility check configuration methods
    enableVisibilityCheck(config) {
      this.visibilityCheckConfig = {
        ...this.visibilityCheckConfig,
        enabled: true,
        ...config
      };
    }
    disableVisibilityCheck() {
      this.visibilityCheckConfig.enabled = false;
    }
    getVisibilityCheckConfig() {
      return { ...this.visibilityCheckConfig };
    }
    // Visibility checking utility methods
    isElementVisuallyHidden(element) {
      if (!this.visibilityCheckConfig.enabled) {
        return false;
      }
      const style = window.getComputedStyle(element);
      const config = this.visibilityCheckConfig.commonHiddenPatterns;
      if (config.displayNone && style.display === "none") {
        return true;
      }
      if (config.visibilityHidden && style.visibility === "hidden") {
        return true;
      }
      if (config.opacityZero && parseFloat(style.opacity) === 0) {
        return true;
      }
      if (config.clipRect) {
        const clip = style.clip;
        if (clip && (clip.includes("rect(1px, 1px, 1px, 1px)") || clip.includes("rect(0px, 0px, 0px, 0px)") || clip.includes("rect(0, 0, 0, 0)"))) {
          return true;
        }
      }
      if (config.heightWidth1px) {
        const height = parseInt(style.height, 10);
        const width = parseInt(style.width, 10);
        if (height === 1 && width === 1) {
          const overflow = style.overflow;
          const position = style.position;
          if (overflow === "hidden" && position === "absolute") {
            return true;
          }
        }
      }
      return false;
    }
    shouldSkipSpacingAfterNode(node) {
      if (!this.visibilityCheckConfig.enabled) {
        return false;
      }
      let elementToCheck = null;
      if (node instanceof Element) {
        elementToCheck = node;
      } else if (node.parentElement) {
        elementToCheck = node.parentElement;
      }
      if (elementToCheck && this.isElementVisuallyHidden(elementToCheck)) {
        return true;
      }
      let currentElement = elementToCheck == null ? void 0 : elementToCheck.parentElement;
      while (currentElement) {
        if (this.isElementVisuallyHidden(currentElement)) {
          return true;
        }
        currentElement = currentElement.parentElement;
      }
      return false;
    }
  }
  const pangu = new BrowserPangu();
  pangu.BrowserPangu = BrowserPangu;
  return pangu;
});
//# sourceMappingURL=pangu.umd.js.map
