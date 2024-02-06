import { navigationState } from "../utils.js";

export const navbarShrink = {
  navbarDom: document.querySelector(".navbar-container"),
  leftAsideDom: document.querySelector(".page-aside"),
  isnavbarShrink: false,
  navbarHeight: 0,

  init() {
    this.navbarHeight = this.navbarDom.getBoundingClientRect().height;
    this.shrink();
    this.togglenavbarDrawerShow();
    this.toggleSubmenu();
    window.addEventListener("scroll", () => {
      this.shrink();
    });
  },

  shrink() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (!this.isnavbarShrink && scrollTop > this.navbarHeight) {
      this.isnavbarShrink = true;
      document.body.classList.add("navbar-shrink");
    } else if (this.isnavbarShrink && scrollTop <= this.navbarHeight) {
      this.isnavbarShrink = false;
      document.body.classList.remove("navbar-shrink");
    }
  },

  togglenavbarDrawerShow() {
    const domList = [
      document.querySelector(".window-mask"),
      document.querySelector(".navbar-bar"),
    ];

    if (document.querySelector(".navbar-drawer")) {
      domList.push(
        ...document.querySelectorAll(
          ".navbar-drawer .drawer-navbar-list .drawer-navbar-item",
        ),
        ...document.querySelectorAll(".navbar-drawer .tag-count-item"),
      );
    }

    domList.forEach((v) => {
      if (!v.dataset.navbarInitialized) {
        v.dataset.navbarInitialized = 1;
        v.addEventListener("click", () => {
          document.body.classList.toggle("navbar-drawer-show");
        });
      }
    });

    const logoTitleDom = document.querySelector(
      ".navbar-container .navbar-content .logo-title",
    );
    if (logoTitleDom && !logoTitleDom.dataset.navbarInitialized) {
      logoTitleDom.dataset.navbarInitialized = 1;
      logoTitleDom.addEventListener("click", () => {
        document.body.classList.remove("navbar-drawer-show");
      });
    }
  },

  toggleSubmenu() {
    const toggleElements = document.querySelectorAll("[navbar-data-toggle]");

    toggleElements.forEach((toggle) => {
      if (!toggle.dataset.eventListenerAdded) {
        toggle.dataset.eventListenerAdded = "true";
        toggle.addEventListener("click", function () {
          // console.log("click");
          const target = document.querySelector(
            '[data-target="' + this.getAttribute("navbar-data-toggle") + '"]',
          );
          const submenuItems = target.children; // Get submenu items
          const icon = this.querySelector(".fa-chevron-right");

          if (target) {
            const isVisible = !target.classList.contains("hidden");

            if (icon) {
              icon.classList.toggle("icon-rotated", !isVisible);
            }

            if (isVisible) {
              // Animate to hide (reverse stagger effect)
              anime({
                targets: submenuItems,
                opacity: 0,
                translateY: -10,
                duration: 300,
                easing: "easeInQuart",
                delay: anime.stagger(80, { start: 20, direction: "reverse" }),
                complete: function () {
                  target.classList.add("hidden");
                },
              });
            } else {
              // Animate to show with stagger effect
              target.classList.remove("hidden");

              anime({
                targets: submenuItems,
                opacity: [0, 1],
                translateY: [10, 0],
                duration: 300,
                easing: "easeOutQuart",
                delay: anime.stagger(80, { start: 20 }),
              });
            }
          }
        });
      }
    });
  },
};

try {
  swup.hooks.on("page:view", () => {
    navbarShrink.init();
    navigationState.isNavigating = false;
  });

  swup.hooks.on("visit:start", () => {
    navigationState.isNavigating = true;
    document.body.classList.remove("navbar-shrink");
  });
} catch (error) {}

document.addEventListener("DOMContentLoaded", () => {
  navbarShrink.init();
});
