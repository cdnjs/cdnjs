function initPanguJS() {
  // Add space between Chinese and English
  pangu.spacingElementByClassName("markdown-body");

  pangu.autoSpacingPage();
}

document.addEventListener("DOMContentLoaded", initPanguJS);

try {
  swup.hooks.on("page:view", initPanguJS);
} catch (e) {}
