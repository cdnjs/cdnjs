class AIPostRenderer {
  static ANIMATION_DELAY_MS = 30;
  static AI_EXPLANATION_SELECTOR = ".ai-explanation";
  static AI_TAG_SELECTOR = ".ai-tag";

  constructor() {
    this.startTextAnimation = this.startTextAnimation.bind(this);
    this.animationFrame = null;
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", this.initialize.bind(this));
    } else {
      this.initialize();
    }
  }

  initialize() {
    this.cacheElements();
    this.validateContent() && this.renderAIContent();
  }

  cacheElements() {
    this.refs = new WeakMap();
    this.refs.set(document, {
      explanationElement: document.querySelector(
        AIPostRenderer.AI_EXPLANATION_SELECTOR
      ),
      tagElement: document.querySelector(AIPostRenderer.AI_TAG_SELECTOR),
    });

    const { explanationElement, tagElement } = this.refs.get(document) || {};
    this.explanationElement = explanationElement;
    this.tagElement = tagElement;
  }

  validateContent() {
    return !!(
      this.explanationElement &&
      this.tagElement &&
      this.aiContent.length &&
      !this.isAnimating
    );
  }

  renderAIContent() {
    this.prepareAnimation();
    this.animationFrame = requestAnimationFrame(() =>
      this.startTextAnimation(0)
    );
  }

  prepareAnimation() {
    this.isAnimating = true;
    this.tagElement.classList.add("loadingAI");
    this.explanationElement.textContent = "";
  }

  startTextAnimation(index) {
    if (index >= this.aiContent.length) {
      this.completeAnimation();
      return;
    }

    this.appendCharacter(this.aiContent[index]);
    this.animationFrame = requestAnimationFrame(() =>
      this.startTextAnimation(index + 1)
    );
  }

  appendCharacter(char) {
    if (!this.fragment) this.fragment = document.createDocumentFragment();

    const charElement = document.createElement("span");
    charElement.className = "char";
    charElement.textContent = char;
    this.fragment.appendChild(charElement);

    if (this.fragment.childNodes.length % 1 === 0) {
      this.explanationElement.appendChild(this.fragment);
      this.fragment = null;
    }
  }

  completeAnimation() {
    if (this.fragment) {
      this.explanationElement.appendChild(this.fragment);
      this.fragment = null;
    }

    cancelAnimationFrame(this.animationFrame);
    this.isAnimating = false;
    this.tagElement.classList.remove("loadingAI");

    const event = new CustomEvent("aiRenderComplete", {
      detail: { element: this.explanationElement },
    });
    document.dispatchEvent(event);
  }

  get aiContent() {
    return PAGE_CONFIG?.ai_text || "";
  }
}

const aiPostRenderer = (() => {
  let instance;
  return () => {
    if (!instance) {
      instance = new AIPostRenderer();
      instance.init();
    }
    return instance;
  };
})();

const ai = aiPostRenderer();
