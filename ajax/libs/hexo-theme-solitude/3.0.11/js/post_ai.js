class AIPostRenderer {
  static ANIMATION_DELAY_MS = 30;
  static AI_EXPLANATION_SELECTOR = ".ai-explanation";
  static AI_TAG_SELECTOR = ".ai-tag";

  init() {
    this.tagElement = document.querySelector(AIPostRenderer.AI_TAG_SELECTOR);
    this.isAnimating = false;
    this.aiContent = PAGE_CONFIG?.ai_text || "";
    this.explanationElement = document.querySelector(
      AIPostRenderer.AI_EXPLANATION_SELECTOR
    );
    this.renderAIContent();
  }

  renderAIContent() {
    if (!this.validateElements() || !this.aiContent) return;

    this.prepareAnimation();
    this.startTextAnimation();
  }

  validateElements() {
    return this.explanationElement && this.tagElement && !this.isAnimating;
  }

  prepareAnimation() {
    this.isAnimating = true;
    this.tagElement.classList.add("loadingAI");
    this.explanationElement.innerHTML = "";
  }

  startTextAnimation() {
    const animate = (index) => {
      if (index >= this.aiContent.length) {
        this.completeAnimation();
        return;
      }

      this.appendCharacter(this.aiContent[index]);
      setTimeout(() => animate(index + 1), AIPostRenderer.ANIMATION_DELAY_MS);
    };

    animate(0);
  }

  appendCharacter(char) {
    const charElement = document.createElement("span");
    charElement.className = "char";
    charElement.textContent = char;
    this.explanationElement.appendChild(charElement);
  }

  completeAnimation() {
    this.isAnimating = false;
    this.tagElement.classList.remove("loadingAI");
  }
}

const ai = new AIPostRenderer();
