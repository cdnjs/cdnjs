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
  const OPERATORS_BASE = "\\+\\*=&";
  const OPERATORS_WITH_HYPHEN = `${OPERATORS_BASE}\\-`;
  const OPERATORS_NO_HYPHEN = OPERATORS_BASE;
  const GRADE_OPERATORS = "\\+\\-\\*";
  const QUOTES = '`"\u05F4';
  const LEFT_BRACKETS_BASIC = "\\(\\[\\{";
  const RIGHT_BRACKETS_BASIC = "\\)\\]\\}";
  const LEFT_BRACKETS_EXTENDED = "\\(\\[\\{<>\u201C";
  const RIGHT_BRACKETS_EXTENDED = "\\)\\]\\}<>\u201D";
  const ANS_CJK_AFTER = `${A}\u0370-\u03FF0-9@\\$%\\^&\\*\\-\\+\\\\=\xA1-\xFF\u2150-\u218F\u2700\u2014\u27BF`;
  const ANS_BEFORE_CJK = `${A}\u0370-\u03FF0-9\\$%\\^&\\*\\-\\+\\\\=\xA1-\xFF\u2150-\u218F\u2700\u2014\u27BF`;
  const FILE_PATH_DIRS = "home|root|usr|etc|var|opt|tmp|dev|mnt|proc|sys|bin|boot|lib|media|run|sbin|srv|node_modules|path|project|src|dist|test|tests|docs|templates|assets|public|static|config|scripts|tools|build|out|target|your|\\.claude|\\.git|\\.vscode";
  const FILE_PATH_CHARS = "[A-Za-z0-9_\\-\\.@\\+\\*]+";
  const UNIX_ABSOLUTE_FILE_PATH = new RegExp(`/(?:\\.?(?:${FILE_PATH_DIRS})|\\.(?:[A-Za-z0-9_\\-]+))(?:/${FILE_PATH_CHARS})*`);
  const UNIX_RELATIVE_FILE_PATH = new RegExp(`(?:\\./)?(?:${FILE_PATH_DIRS})(?:/${FILE_PATH_CHARS})+`);
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
  const CJK_QUOTE = new RegExp(`([${CJK}])([${QUOTES}])`, "g");
  const QUOTE_CJK = new RegExp(`([${QUOTES}])([${CJK}])`, "g");
  const FIX_QUOTE_ANY_QUOTE = new RegExp(`([${QUOTES}]+)[ ]*(.+?)[ ]*([${QUOTES}]+)`, "g");
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
      __publicField(this, "items", []);
      __publicField(this, "index", 0);
      __publicField(this, "pattern");
      this.placeholder = placeholder;
      this.startDelimiter = startDelimiter;
      this.endDelimiter = endDelimiter;
      const escapedStart = this.startDelimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const escapedEnd = this.endDelimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      this.pattern = new RegExp(`${escapedStart}${this.placeholder}(\\d+)${escapedEnd}`, "g");
    }
    store(item) {
      this.items[this.index] = item;
      return `${this.startDelimiter}${this.placeholder}${this.index++}${this.endDelimiter}`;
    }
    restore(text) {
      return text.replace(this.pattern, (_match, index) => {
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
      this.version = "7.2.0";
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
      const backtickManager = new PlaceholderReplacer("BACKTICK_CONTENT_", "\uE004", "\uE005");
      newText = newText.replace(/`([^`]+)`/g, (_match, content) => {
        return `\`${backtickManager.store(content)}\``;
      });
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
        const bracketPatterns = [
          { pattern: /<([^<>]*)>/g, open: "<", close: ">" },
          { pattern: /\(([^()]*)\)/g, open: "(", close: ")" },
          { pattern: /\[([^\[\]]*)\]/g, open: "[", close: "]" },
          { pattern: /\{([^{}]*)\}/g, open: "{", close: "}" }
        ];
        for (const { pattern, open, close } of bracketPatterns) {
          text2 = text2.replace(pattern, (_match, innerContent) => {
            if (!innerContent) {
              return `${open}${close}`;
            }
            const trimmedContent = innerContent.replace(/^ +| +$/g, "");
            return `${open}${trimmedContent}${close}`;
          });
        }
        return text2;
      };
      newText = fixBracketSpacing(newText);
      if (hasHtmlTags) {
        newText = htmlTagManager.restore(newText);
      }
      newText = backtickManager.restore(newText);
      return newText;
    }
    hasProperSpacing(text) {
      return this.spacingText(text) === text;
    }
  }
  class DomWalker {
    static collectTextNodes(contextNode, reverse = false) {
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
    static canIgnoreNode(node) {
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
    static isFirstTextChild(parentNode, targetNode) {
      const { childNodes } = parentNode;
      for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        if (childNode.nodeType !== Node.COMMENT_NODE && childNode.textContent) {
          return childNode === targetNode;
        }
      }
      return false;
    }
    static isLastTextChild(parentNode, targetNode) {
      const { childNodes } = parentNode;
      for (let i = childNodes.length - 1; i > -1; i--) {
        const childNode = childNodes[i];
        if (childNode.nodeType !== Node.COMMENT_NODE && childNode.textContent) {
          return childNode === targetNode;
        }
      }
      return false;
    }
    static isSpecificTag(node, tagRegex) {
      return !!(node && node.nodeName && tagRegex.test(node.nodeName));
    }
    static isContentEditable(node) {
      return node instanceof HTMLElement && (node.isContentEditable || node.getAttribute("g_editable") === "true");
    }
    static hasIgnoredClass(node) {
      if (node instanceof Element && node.classList.contains(this.ignoredClass)) {
        return true;
      }
      if (node.parentNode && node.parentNode instanceof Element && node.parentNode.classList.contains(this.ignoredClass)) {
        return true;
      }
      return false;
    }
  }
  __publicField(DomWalker, "blockTags", /^(div|p|h1|h2|h3|h4|h5|h6)$/i);
  __publicField(DomWalker, "ignoredTags", /^(code|pre|script|style|textarea|iframe|input)$/i);
  __publicField(DomWalker, "presentationalTags", /^(b|code|del|em|i|s|strong|kbd)$/i);
  __publicField(DomWalker, "spaceLikeTags", /^(br|hr|i|img|pangu)$/i);
  __publicField(DomWalker, "spaceSensitiveTags", /^(a|del|pre|s|strike|u)$/i);
  __publicField(DomWalker, "ignoredClass", "no-pangu-spacing");
  class TaskQueue {
    constructor() {
      __publicField(this, "queue", []);
      __publicField(this, "isProcessing", false);
      __publicField(this, "onComplete");
    }
    add(task) {
      this.queue.push(task);
      this.scheduleProcessing();
    }
    clear() {
      this.queue.length = 0;
      this.onComplete = void 0;
    }
    setOnComplete(onComplete) {
      this.onComplete = onComplete;
    }
    get length() {
      return this.queue.length;
    }
    scheduleProcessing() {
      if (!this.isProcessing && this.queue.length > 0) {
        this.isProcessing = true;
        requestIdleCallback((deadline) => this.process(deadline), { timeout: 5e3 });
      }
    }
    process(deadline) {
      var _a;
      while (deadline.timeRemaining() > 0 && this.queue.length > 0) {
        const task = this.queue.shift();
        task == null ? void 0 : task();
      }
      this.isProcessing = false;
      if (this.queue.length > 0) {
        this.scheduleProcessing();
      } else {
        (_a = this.onComplete) == null ? void 0 : _a.call(this);
      }
    }
  }
  class TaskScheduler {
    constructor() {
      __publicField(this, "config", {
        enabled: true,
        chunkSize: 40,
        // Process 40 text nodes per idle cycle
        timeout: 2e3
        // 2 second timeout for idle processing
      });
      __publicField(this, "taskQueue", new TaskQueue());
    }
    get queue() {
      return this.taskQueue;
    }
    processInChunks(items, processor, onComplete) {
      if (!this.config.enabled) {
        processor(items);
        onComplete == null ? void 0 : onComplete();
        return;
      }
      if (items.length === 0) {
        onComplete == null ? void 0 : onComplete();
        return;
      }
      if (onComplete) {
        this.taskQueue.setOnComplete(onComplete);
      }
      const chunks = [];
      for (let i = 0; i < items.length; i += this.config.chunkSize) {
        chunks.push(items.slice(i, i + this.config.chunkSize));
      }
      for (const chunk of chunks) {
        this.taskQueue.add(() => {
          processor(chunk);
        });
      }
    }
    clear() {
      this.taskQueue.clear();
    }
    updateConfig(config) {
      Object.assign(this.config, config);
    }
  }
  class VisibilityDetector {
    constructor() {
      __publicField(this, "config", {
        enabled: true,
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
      });
    }
    isElementVisuallyHidden(element) {
      if (!this.config.enabled) {
        return false;
      }
      const style = getComputedStyle(element);
      const patterns = this.config.commonHiddenPatterns;
      if (patterns.displayNone && style.display === "none") {
        return true;
      }
      if (patterns.visibilityHidden && style.visibility === "hidden") {
        return true;
      }
      if (patterns.opacityZero && parseFloat(style.opacity) === 0) {
        return true;
      }
      if (patterns.clipRect) {
        const clip = style.clip;
        if (clip && (clip.includes("rect(1px, 1px, 1px, 1px)") || clip.includes("rect(0px, 0px, 0px, 0px)") || clip.includes("rect(0, 0, 0, 0)"))) {
          return true;
        }
      }
      if (patterns.heightWidth1px) {
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
      if (!this.config.enabled) {
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
    shouldSkipSpacingBeforeNode(node) {
      if (!this.config.enabled) {
        return false;
      }
      let previousNode = node.previousSibling;
      if (!previousNode && node.parentElement) {
        let parent = node.parentElement;
        while (parent && !previousNode) {
          previousNode = parent.previousSibling;
          if (!previousNode) {
            parent = parent.parentElement;
          }
        }
      }
      if (previousNode) {
        if (previousNode instanceof Element && this.isElementVisuallyHidden(previousNode)) {
          return true;
        } else if (previousNode instanceof Text && previousNode.parentElement && this.isElementVisuallyHidden(previousNode.parentElement)) {
          return true;
        }
      }
      return false;
    }
    updateConfig(config) {
      Object.assign(this.config, config);
      if (config.commonHiddenPatterns) {
        Object.assign(this.config.commonHiddenPatterns, config.commonHiddenPatterns);
      }
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
      super(...arguments);
      __publicField(this, "isAutoSpacingPageExecuted", false);
      __publicField(this, "autoSpacingPageObserver", null);
      __publicField(this, "taskScheduler", new TaskScheduler());
      __publicField(this, "visibilityDetector", new VisibilityDetector());
    }
    // PUBLIC
    autoSpacingPage({ pageDelayMs = 1e3, nodeDelayMs = 500, nodeMaxWaitMs = 2e3 } = {}) {
      if (!(document.body instanceof Node)) {
        return;
      }
      if (this.isAutoSpacingPageExecuted) {
        return;
      }
      this.isAutoSpacingPageExecuted = true;
      this.waitForVideosToLoad(pageDelayMs, once(() => this.spacingPage()));
      this.setupAutoSpacingPageObserver(nodeDelayMs, nodeMaxWaitMs);
    }
    spacingPage() {
      const title = document.querySelector("head > title");
      if (title) {
        this.spacingNode(title);
      }
      this.spacingNode(document.body);
    }
    spacingNode(contextNode) {
      const textNodes = DomWalker.collectTextNodes(contextNode, true);
      if (this.taskScheduler.config.enabled) {
        this.spacingTextNodesInQueue(textNodes);
      } else {
        this.spacingTextNodes(textNodes);
      }
    }
    stopAutoSpacingPage() {
      if (this.autoSpacingPageObserver) {
        this.autoSpacingPageObserver.disconnect();
        this.autoSpacingPageObserver = null;
      }
      this.isAutoSpacingPageExecuted = false;
    }
    isElementVisuallyHidden(element) {
      return this.visibilityDetector.isElementVisuallyHidden(element);
    }
    // INTERNAL
    // TODO: Refactor this method - it's too large and handles too many responsibilities
    spacingTextNodes(textNodes) {
      let currentTextNode;
      let nextTextNode = null;
      for (let i = 0; i < textNodes.length; i++) {
        currentTextNode = textNodes[i];
        if (!currentTextNode) {
          continue;
        }
        if (DomWalker.canIgnoreNode(currentTextNode)) {
          nextTextNode = currentTextNode;
          continue;
        }
        if (currentTextNode instanceof Text) {
          if (this.visibilityDetector.config.enabled && currentTextNode.data.startsWith(" ") && this.visibilityDetector.shouldSkipSpacingBeforeNode(currentTextNode)) {
            currentTextNode.data = currentTextNode.data.substring(1);
          }
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
          if (currentTextNode.nextSibling && DomWalker.spaceLikeTags.test(currentTextNode.nextSibling.nodeName)) {
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
          while (currentAncestor.parentNode && DomWalker.isLastTextChild(currentAncestor.parentNode, currentAncestor) && !DomWalker.spaceSensitiveTags.test(currentAncestor.parentNode.nodeName)) {
            currentAncestor = currentAncestor.parentNode;
          }
          let nextAncestor = nextTextNode;
          while (nextAncestor.parentNode && DomWalker.isFirstTextChild(nextAncestor.parentNode, nextAncestor) && !DomWalker.spaceSensitiveTags.test(nextAncestor.parentNode.nodeName)) {
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
            while (nextNode.parentNode && !DomWalker.spaceSensitiveTags.test(nextNode.nodeName) && DomWalker.isFirstTextChild(nextNode.parentNode, nextNode)) {
              nextNode = nextNode.parentNode;
            }
            let currentNode = currentTextNode;
            while (currentNode.parentNode && !DomWalker.spaceSensitiveTags.test(currentNode.nodeName) && DomWalker.isLastTextChild(currentNode.parentNode, currentNode)) {
              currentNode = currentNode.parentNode;
            }
            if (currentNode.nextSibling) {
              if (DomWalker.spaceLikeTags.test(currentNode.nextSibling.nodeName)) {
                nextTextNode = currentTextNode;
                continue;
              }
            }
            if (!DomWalker.blockTags.test(currentNode.nodeName)) {
              if (!DomWalker.spaceSensitiveTags.test(nextNode.nodeName)) {
                if (!DomWalker.ignoredTags.test(nextNode.nodeName) && !DomWalker.blockTags.test(nextNode.nodeName)) {
                  if (nextTextNode.previousSibling) {
                    if (!DomWalker.spaceLikeTags.test(nextTextNode.previousSibling.nodeName)) {
                      if (nextTextNode instanceof Text && !nextTextNode.data.startsWith(" ")) {
                        if (!this.visibilityDetector.shouldSkipSpacingBeforeNode(nextTextNode)) {
                          nextTextNode.data = ` ${nextTextNode.data}`;
                        }
                      }
                    }
                  } else {
                    if (!DomWalker.canIgnoreNode(nextTextNode)) {
                      if (nextTextNode instanceof Text && !nextTextNode.data.startsWith(" ")) {
                        if (!this.visibilityDetector.shouldSkipSpacingBeforeNode(nextTextNode)) {
                          nextTextNode.data = ` ${nextTextNode.data}`;
                        }
                      }
                    }
                  }
                }
              } else if (!DomWalker.spaceSensitiveTags.test(currentNode.nodeName)) {
                if (currentTextNode instanceof Text && !currentTextNode.data.endsWith(" ")) {
                  if (!this.visibilityDetector.shouldSkipSpacingAfterNode(currentTextNode)) {
                    currentTextNode.data = `${currentTextNode.data} `;
                  }
                }
              } else {
                if (!this.visibilityDetector.shouldSkipSpacingAfterNode(currentTextNode)) {
                  const panguSpace = document.createElement("pangu");
                  panguSpace.innerHTML = " ";
                  if (nextNode.parentNode) {
                    if (nextNode.previousSibling) {
                      if (!DomWalker.spaceLikeTags.test(nextNode.previousSibling.nodeName)) {
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
    spacingTextNodesInQueue(textNodes, onComplete) {
      if (this.visibilityDetector.config.enabled) {
        if (this.taskScheduler.config.enabled) {
          this.taskScheduler.queue.add(() => {
            this.spacingTextNodes(textNodes);
          });
          if (onComplete) {
            this.taskScheduler.queue.setOnComplete(onComplete);
          }
        } else {
          this.spacingTextNodes(textNodes);
          onComplete == null ? void 0 : onComplete();
        }
        return;
      }
      const task = (chunkedTextNodes) => this.spacingTextNodes(chunkedTextNodes);
      this.taskScheduler.processInChunks(textNodes, task, onComplete);
    }
    waitForVideosToLoad(delayMs, onLoaded) {
      const videos = Array.from(document.getElementsByTagName("video"));
      if (videos.length === 0) {
        setTimeout(onLoaded, delayMs);
      } else {
        const allVideosLoaded = videos.every((video) => video.readyState >= 3);
        if (allVideosLoaded) {
          setTimeout(onLoaded, delayMs);
        } else {
          let loadedCount = 0;
          const videoCount = videos.length;
          const checkAllLoaded = () => {
            loadedCount++;
            if (loadedCount >= videoCount) {
              setTimeout(onLoaded, delayMs);
            }
          };
          for (const video of videos) {
            if (video.readyState >= 3) {
              checkAllLoaded();
            } else {
              video.addEventListener("loadeddata", checkAllLoaded, { once: true });
            }
          }
          setTimeout(onLoaded, delayMs + 5e3);
        }
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
          const titleElement = document.querySelector("head > title");
          if (titleElement) {
            this.spacingNode(titleElement);
          }
        },
        nodeDelayMs,
        nodeMaxWaitMs
      );
      const debouncedSpacingNode = debounce(
        () => {
          if (this.taskScheduler.config.enabled) {
            const nodesToProcess = [...queue];
            queue.length = 0;
            if (nodesToProcess.length > 0) {
              const allTextNodes = [];
              for (const node of nodesToProcess) {
                const textNodes = DomWalker.collectTextNodes(node, true);
                allTextNodes.push(...textNodes);
              }
              this.spacingTextNodesInQueue(allTextNodes);
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
      this.autoSpacingPageObserver.observe(document.head, {
        characterData: true,
        childList: true,
        subtree: true
        // Need subtree to observe text node changes inside title
      });
      this.autoSpacingPageObserver.observe(document.body, {
        characterData: true,
        childList: true,
        subtree: true
      });
    }
  }
  const pangu = new BrowserPangu();
  pangu.BrowserPangu = BrowserPangu;
  return pangu;
});
//# sourceMappingURL=pangu.umd.js.map
