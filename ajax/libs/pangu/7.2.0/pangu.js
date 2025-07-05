var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Pangu } from "../shared/index.js";
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
export {
  BrowserPangu,
  pangu as default,
  pangu
};
//# sourceMappingURL=pangu.js.map
