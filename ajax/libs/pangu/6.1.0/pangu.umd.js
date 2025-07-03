(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.pangu = factory());
})(this, function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  const CJK = "\u2E80-\u2EFF\u2F00-\u2FDF\u3040-\u309F\u30A0-\u30FA\u30FC-\u30FF\u3100-\u312F\u3200-\u32FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF";
  const UNIX_ABSOLUTE_FILE_PATH = /\/(?:\.?(?:home|root|usr|etc|var|opt|tmp|dev|mnt|proc|sys|bin|boot|lib|media|run|sbin|srv|node_modules|path|project|src|dist|test|tests|docs|templates|assets|public|static|config|scripts|tools|build|out|target|your)|\.(?:[A-Za-z0-9_\-]+))(?:\/[A-Za-z0-9_\-\.@\+\*]+)*/;
  const UNIX_RELATIVE_FILE_PATH = /(?:\.\/)?(?:src|dist|test|tests|docs|templates|assets|public|static|config|scripts|tools|build|out|target|node_modules|\.claude|\.git|\.vscode)(?:\/[A-Za-z0-9_\-\.@\+\*]+)+/;
  const WINDOWS_FILE_PATH = /[A-Z]:\\(?:[A-Za-z0-9_\-\. ]+\\?)+/;
  const ANY_CJK = new RegExp(`[${CJK}]`);
  const CONVERT_TO_FULLWIDTH_CJK_SYMBOLS_CJK = new RegExp(`([${CJK}])[ ]*([\\:]+|\\.)[ ]*([${CJK}])`, "g");
  const CONVERT_TO_FULLWIDTH_CJK_SYMBOLS = new RegExp(`([${CJK}])[ ]*([~\\!;,\\?]+)[ ]*`, "g");
  const DOTS_CJK = new RegExp(`([\\.]{2,}|\u2026)([${CJK}])`, "g");
  const FIX_CJK_COLON_ANS = new RegExp(`([${CJK}])\\:([A-Z0-9\\(\\)])`, "g");
  const CJK_QUOTE = new RegExp(`([${CJK}])([\`"\u05F4])`, "g");
  const QUOTE_CJK = new RegExp(`([\`"\u05F4])([${CJK}])`, "g");
  const FIX_QUOTE_ANY_QUOTE = /([`"\u05f4]+)[ ]*(.+?)[ ]*([`"\u05f4]+)/g;
  const QUOTE_AN = /([\u201d])([A-Za-z0-9])/g;
  const CJK_QUOTE_AN = new RegExp(`([${CJK}])(")([A-Za-z0-9])`, "g");
  const CJK_SINGLE_QUOTE_BUT_POSSESSIVE = new RegExp(`([${CJK}])('[^s])`, "g");
  const SINGLE_QUOTE_CJK = new RegExp(`(')([${CJK}])`, "g");
  const FIX_POSSESSIVE_SINGLE_QUOTE = new RegExp(`([A-Za-z0-9${CJK}])( )('s)`, "g");
  const HASH_ANS_CJK_HASH = new RegExp(`([${CJK}])(#)([${CJK}]+)(#)([${CJK}])`, "g");
  const CJK_HASH = new RegExp(`([${CJK}])(#([^ ]))`, "g");
  const HASH_CJK = new RegExp(`(([^ ])#)([${CJK}])`, "g");
  const CJK_OPERATOR_ANS = new RegExp(`([${CJK}])([\\+\\-\\*=&])([A-Za-z0-9])`, "g");
  const ANS_OPERATOR_CJK = new RegExp(`([A-Za-z0-9])([\\+\\-\\*=&])([${CJK}])`, "g");
  const ANS_OPERATOR_ANS = new RegExp(`([A-Za-z0-9])([\\+\\*=&])([A-Za-z0-9])`, "g");
  const ANS_HYPHEN_ANS_NOT_COMPOUND = new RegExp(`([A-Za-z])(-(?![a-z]))([A-Za-z0-9])|([A-Za-z]+[0-9]+)(-(?![a-z]))([0-9])|([0-9])(-(?![a-z0-9]))([A-Za-z])`, "g");
  const CJK_SLASH_CJK = new RegExp(`([${CJK}])([/])([${CJK}])`, "g");
  const CJK_SLASH_ANS = new RegExp(`([${CJK}])([/])([A-Za-z0-9])`, "g");
  const ANS_SLASH_CJK = new RegExp(`([A-Za-z0-9])([/])([${CJK}])`, "g");
  const ANS_SLASH_ANS = new RegExp(`([A-Za-z0-9])([/])([A-Za-z0-9])`, "g");
  const SINGLE_LETTER_GRADE_CJK = new RegExp(`\\b([A-Za-z])([\\+\\-\\*])([${CJK}])`, "g");
  const CJK_LESS_THAN = new RegExp(`([${CJK}])(<)([A-Za-z0-9])`, "g");
  const LESS_THAN_CJK = new RegExp(`([A-Za-z0-9])(<)([${CJK}])`, "g");
  const CJK_GREATER_THAN = new RegExp(`([${CJK}])(>)([A-Za-z0-9])`, "g");
  const GREATER_THAN_CJK = new RegExp(`([A-Za-z0-9])(>)([${CJK}])`, "g");
  const ANS_LESS_THAN_ANS = new RegExp(`([A-Za-z0-9])(<)([A-Za-z0-9])`, "g");
  const ANS_GREATER_THAN_ANS = new RegExp(`([A-Za-z0-9])(>)([A-Za-z0-9])`, "g");
  const CJK_LEFT_BRACKET = new RegExp(`([${CJK}])([\\(\\[\\{<>\u201C])`, "g");
  const RIGHT_BRACKET_CJK = new RegExp(`([\\)\\]\\}<>\u201D])([${CJK}])`, "g");
  const ANS_CJK_LEFT_BRACKET_ANY_RIGHT_BRACKET = new RegExp(`([A-Za-z0-9${CJK}])[ ]*([\u201C])([A-Za-z0-9${CJK}\\-_ ]+)([\u201D])`, "g");
  const LEFT_BRACKET_ANY_RIGHT_BRACKET_ANS_CJK = new RegExp(`([\u201C])([A-Za-z0-9${CJK}\\-_ ]+)([\u201D])[ ]*([A-Za-z0-9${CJK}])`, "g");
  const AN_LEFT_BRACKET = new RegExp("([A-Za-z0-9])(?<!\\.[A-Za-z0-9]*)([\\(\\[\\{])", "g");
  const RIGHT_BRACKET_AN = /([\)\]\}])([A-Za-z0-9])/g;
  const CJK_UNIX_ABSOLUTE_FILE_PATH = new RegExp(`([${CJK}])(${UNIX_ABSOLUTE_FILE_PATH.source})`, "g");
  const CJK_UNIX_RELATIVE_FILE_PATH = new RegExp(`([${CJK}])(${UNIX_RELATIVE_FILE_PATH.source})`, "g");
  const CJK_WINDOWS_PATH = new RegExp(`([${CJK}])(${WINDOWS_FILE_PATH.source})`, "g");
  const UNIX_ABSOLUTE_FILE_PATH_SLASH_CJK = new RegExp(`(${UNIX_ABSOLUTE_FILE_PATH.source}/)([${CJK}])`, "g");
  const UNIX_RELATIVE_FILE_PATH_SLASH_CJK = new RegExp(`(${UNIX_RELATIVE_FILE_PATH.source}/)([${CJK}])`, "g");
  const CJK_ANS = new RegExp(`([${CJK}])([A-Za-z\u0370-\u03FF0-9@\\$%\\^&\\*\\-\\+\\\\=\xA1-\xFF\u2150-\u218F\u2700\u2014\u27BF])`, "g");
  const ANS_CJK = new RegExp(`([A-Za-z\u0370-\u03FF0-9~\\$%\\^&\\*\\-\\+\\\\=!;:,\\.\\?\xA1-\xFF\u2150-\u218F\u2700\u2014\u27BF])([${CJK}])`, "g");
  const S_A = /(%)([A-Za-z])/g;
  const MIDDLE_DOT = /([ ]*)([\u00b7\u2022\u2027])([ ]*)/g;
  class Pangu {
    constructor() {
      __publicField(this, "version");
      this.version = "6.1.0";
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
      const htmlTags = [];
      const HTML_TAG_PLACEHOLDER = "\0HTML_TAG_PLACEHOLDER_";
      let hasHtmlTags = false;
      if (newText.includes("<")) {
        hasHtmlTags = true;
        const HTML_TAG_PATTERN = /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s+[^>]*)?>/g;
        newText = newText.replace(HTML_TAG_PATTERN, (match) => {
          const processedTag = match.replace(/(\w+)="([^"]*)"/g, (_attrMatch, attrName, attrValue) => {
            const processedValue = self2.spacingText(attrValue);
            return `${attrName}="${processedValue}"`;
          });
          const index = htmlTags.length;
          htmlTags.push(processedTag);
          return `${HTML_TAG_PLACEHOLDER}${index}\0`;
        });
      }
      newText = newText.replace(CONVERT_TO_FULLWIDTH_CJK_SYMBOLS_CJK, (_match, leftCjk, symbols, rightCjk) => {
        const fullwidthSymbols = self2.convertToFullwidth(symbols);
        return `${leftCjk}${fullwidthSymbols}${rightCjk}`;
      });
      newText = newText.replace(CONVERT_TO_FULLWIDTH_CJK_SYMBOLS, (_match, cjk, symbols) => {
        const fullwidthSymbols = self2.convertToFullwidth(symbols);
        return `${cjk}${fullwidthSymbols}`;
      });
      newText = newText.replace(DOTS_CJK, "$1 $2");
      newText = newText.replace(FIX_CJK_COLON_ANS, "$1\uFF1A$2");
      newText = newText.replace(CJK_QUOTE, "$1 $2");
      newText = newText.replace(QUOTE_CJK, "$1 $2");
      newText = newText.replace(FIX_QUOTE_ANY_QUOTE, "$1$2$3");
      newText = newText.replace(QUOTE_AN, "$1 $2");
      newText = newText.replace(CJK_QUOTE_AN, "$1$2 $3");
      newText = newText.replace(CJK_SINGLE_QUOTE_BUT_POSSESSIVE, "$1 $2");
      newText = newText.replace(SINGLE_QUOTE_CJK, "$1 $2");
      newText = newText.replace(FIX_POSSESSIVE_SINGLE_QUOTE, "$1's");
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
      const COMPOUND_WORD_PLACEHOLDER = "\uE002";
      const compoundWords = [];
      let compoundIndex = 0;
      const COMPOUND_WORD_PATTERN = /\b(?:[A-Za-z0-9]*[a-z][A-Za-z0-9]*-[A-Za-z0-9]+|[A-Za-z0-9]+-[A-Za-z0-9]*[a-z][A-Za-z0-9]*|[A-Za-z]+-[0-9]+|[A-Za-z]+[0-9]+-[A-Za-z0-9]+)(?:-[A-Za-z0-9]+)*\b/g;
      newText = newText.replace(COMPOUND_WORD_PATTERN, (match) => {
        compoundWords[compoundIndex] = match;
        return `${COMPOUND_WORD_PLACEHOLDER}${compoundIndex++}\uE003`;
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
        const FILE_PATH_PLACEHOLDER = "\uE000";
        const filePaths = [];
        let pathIndex = 0;
        const allFilePathPattern = new RegExp(`(${UNIX_ABSOLUTE_FILE_PATH.source}|${UNIX_RELATIVE_FILE_PATH.source})`, "g");
        newText = newText.replace(allFilePathPattern, (match) => {
          filePaths[pathIndex] = match;
          return `${FILE_PATH_PLACEHOLDER}${pathIndex++}\uE001`;
        });
        newText = newText.replace(CJK_SLASH_CJK, "$1 $2 $3");
        newText = newText.replace(CJK_SLASH_ANS, "$1 $2 $3");
        newText = newText.replace(ANS_SLASH_CJK, "$1 $2 $3");
        newText = newText.replace(ANS_SLASH_ANS, "$1 $2 $3");
        const FILE_PATH_RESTORE = new RegExp(`${FILE_PATH_PLACEHOLDER}(\\d+)\uE001`, "g");
        newText = newText.replace(FILE_PATH_RESTORE, (_match, index) => {
          return filePaths[parseInt(index, 10)] || "";
        });
      }
      const COMPOUND_WORD_RESTORE = new RegExp(`${COMPOUND_WORD_PLACEHOLDER}(\\d+)\uE003`, "g");
      newText = newText.replace(COMPOUND_WORD_RESTORE, (_match, index) => {
        return compoundWords[parseInt(index, 10)] || "";
      });
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
        const HTML_TAG_RESTORE = new RegExp(`${HTML_TAG_PLACEHOLDER}(\\d+)\0`, "g");
        newText = newText.replace(HTML_TAG_RESTORE, (_match, index) => {
          return htmlTags[parseInt(index, 10)] || "";
        });
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
      __publicField(this, "blockTags");
      __publicField(this, "ignoredTags");
      __publicField(this, "presentationalTags");
      __publicField(this, "spaceLikeTags");
      __publicField(this, "spaceSensitiveTags");
      __publicField(this, "ignoredClass");
      this.isAutoSpacingPageExecuted = false;
      this.autoSpacingPageObserver = null;
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
      this.spacingPageTitle();
      this.spacingPageBody();
    }
    spacingPageTitle() {
      const xPathQuery = "/html/head/title/text()";
      this.spacingNodeByXPath(xPathQuery, document);
    }
    spacingPageBody() {
      let xPathQuery = "/html/body//*/text()[normalize-space(.)]";
      for (const tag of ["script", "style", "textarea"]) {
        xPathQuery = `${xPathQuery}[translate(name(..),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")!="${tag}"]`;
      }
      this.spacingNodeByXPath(xPathQuery, document);
    }
    spacingNode(contextNode) {
      let xPathQuery = ".//*/text()[normalize-space(.)]";
      if (contextNode instanceof Element && contextNode.children && contextNode.children.length === 0) {
        xPathQuery = ".//text()[normalize-space(.)]";
      }
      this.spacingNodeByXPath(xPathQuery, contextNode);
    }
    spacingElementById(idName) {
      const xPathQuery = `id("${idName}")//text()`;
      this.spacingNodeByXPath(xPathQuery, document);
    }
    spacingElementByClassName(className) {
      const xPathQuery = `//*[contains(concat(" ", normalize-space(@class), " "), "${className}")]//text()`;
      this.spacingNodeByXPath(xPathQuery, document);
    }
    spacingElementByTagName(tagName) {
      const xPathQuery = `//${tagName}//text()`;
      this.spacingNodeByXPath(xPathQuery, document);
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    spacingNodeByXPath(xPathQuery, contextNode) {
      if (!(contextNode instanceof Node) || contextNode instanceof DocumentFragment) {
        return;
      }
      const textNodes = document.evaluate(xPathQuery, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      let currentTextNode;
      let nextTextNode = null;
      for (let i = textNodes.snapshotLength - 1; i > -1; --i) {
        currentTextNode = textNodes.snapshotItem(i);
        if (!currentTextNode) {
          continue;
        }
        if (currentTextNode.parentNode && this.isSpecificTag(currentTextNode.parentNode, this.presentationalTags) && !this.isInsideSpecificTag(currentTextNode.parentNode, this.ignoredTags)) {
          const elementNode = currentTextNode.parentNode;
          if (elementNode.previousSibling) {
            const { previousSibling } = elementNode;
            if (previousSibling.nodeType === Node.TEXT_NODE) {
              const testText = previousSibling.data.slice(-1) + currentTextNode.data.charAt(0);
              const testNewText = this.spacingText(testText);
              if (testText !== testNewText) {
                previousSibling.data = `${previousSibling.data} `;
              }
            }
          }
          if (elementNode.nextSibling) {
            const { nextSibling } = elementNode;
            if (nextSibling.nodeType === Node.TEXT_NODE) {
              const testText = currentTextNode.data.slice(-1) + nextSibling.data.charAt(0);
              const testNewText = this.spacingText(testText);
              if (testText !== testNewText) {
                nextSibling.data = ` ${nextSibling.data}`;
              }
            }
          }
        }
        if (this.canIgnoreNode(currentTextNode)) {
          nextTextNode = currentTextNode;
          continue;
        }
        if (currentTextNode instanceof Text) {
          const newText = this.spacingText(currentTextNode.data);
          if (currentTextNode.data !== newText) {
            currentTextNode.data = newText;
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
          const testText = currentTextNode.data.slice(-1) + nextTextNode.data.slice(0, 1);
          const testNewText = this.spacingText(testText);
          if (testNewText !== testText) {
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
                      if (nextTextNode instanceof Text) {
                        nextTextNode.data = ` ${nextTextNode.data}`;
                      }
                    }
                  } else {
                    if (!this.canIgnoreNode(nextTextNode)) {
                      if (nextTextNode instanceof Text) {
                        nextTextNode.data = ` ${nextTextNode.data}`;
                      }
                    }
                  }
                }
              } else if (!this.spaceSensitiveTags.test(currentNode.nodeName)) {
                if (currentTextNode instanceof Text) {
                  currentTextNode.data = `${currentTextNode.data} `;
                }
              } else {
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
        nextTextNode = currentTextNode;
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
          while (queue.length) {
            const node = queue.shift();
            if (node) {
              this.spacingNode(node);
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
  }
  const pangu = new BrowserPangu();
  pangu.BrowserPangu = BrowserPangu;
  return pangu;
});
//# sourceMappingURL=pangu.umd.js.map
