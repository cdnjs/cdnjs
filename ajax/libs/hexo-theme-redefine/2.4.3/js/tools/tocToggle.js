/* global function */

export function initTocToggle() {
  Global.utils.TocToggle = {
    toggleBar: document.querySelector(".page-aside-toggle"),
    postPageContainerDom: document.querySelector(".post-page-container"),
    toggleBarIcon: document.querySelector(".page-aside-toggle i"),
    articleContentContainerDom: document.querySelector(
      ".article-content-container",
    ),
    mainContentDom: document.querySelector(".main-content"),

    isOpenPageAside: false,

    initToggleBarButton() {
      this.toggleBar &&
        this.toggleBar.addEventListener("click", () => {
          this.isOpenPageAside = !this.isOpenPageAside;
          Global.styleStatus.isOpenPageAside = this.isOpenPageAside;
          Global.setStyleStatus();
          this.changePageLayoutWhenOpenToggle(this.isOpenPageAside);
        });
    },

    changePageLayoutWhenOpenToggle(isOpen) {
      this.toggleBarIcon &&
        (this.toggleBarIcon.className = isOpen
          ? "fas fa-indent"
          : "fas fa-outdent");
      this.postPageContainerDom.className = isOpen
        ? "post-page-container show-toc"
        : "post-page-container";
      this.mainContentDom.className = isOpen
        ? "main-content has-toc"
        : "main-content";
    },

    pageAsideHandleOfTOC(isOpen) {
      this.toggleBar.style.display = "flex";
      this.isOpenPageAside = isOpen;
      this.changePageLayoutWhenOpenToggle(isOpen);
    },
  };
  Global.utils.TocToggle.initToggleBarButton();
}

try {
  swup.hooks.on("page:view", () => {
    initTocToggle();
  });
} catch (e) {}

document.addEventListener("DOMContentLoaded", initTocToggle);
