/* global function */


Global.initModeToggle = () => {

  Global.utils.modeToggle = {

    modeToggleButton_dom: document.querySelector('.tool-dark-light-toggle'),
    iconDom: document.querySelector('.tool-dark-light-toggle i'),
    mermaidLightTheme: typeof Global.theme_config.mermaid !== 'undefined' && typeof Global.theme_config.mermaid.style !== 'undefined' && typeof Global.theme_config.mermaid.style.light !== 'undefined' ? Global.theme_config.mermaid.style.light : 'default',
    mermaidDarkTheme: typeof Global.theme_config.mermaid !== 'undefined' && typeof Global.theme_config.mermaid.style !== 'undefined' && typeof Global.theme_config.mermaid.style.dark !== 'undefined' ? Global.theme_config.mermaid.style.dark : 'dark',
    

    enableLightMode() {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      this.iconDom.className = 'fa-regular fa-moon';
      Global.styleStatus.isDark = false;
      Global.setStyleStatus();
      this.mermaidLightInit();
    },

    enableDarkMode() {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      this.iconDom.className = 'fa-regular fa-brightness';
      Global.styleStatus.isDark = true;
      Global.setStyleStatus();
      this.mermaidDarkInit();
    },

    mermaidLightInit() {
      if (window.mermaid) {
        mermaid.initialize({
            theme: this.mermaidLightTheme,
        });
      }
    },

    mermaidDarkInit() {
      if (window.mermaid) {
        mermaid.initialize({
            theme: this.mermaidDarkTheme,
        });
      }
    },

    isDarkPrefersColorScheme() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    },

    initModeStatus() {
      const styleStatus = Global.getStyleStatus();

      if (styleStatus) {
        styleStatus.isDark ? this.enableDarkMode() : this.enableLightMode();
      } else {
        this.isDarkPrefersColorScheme().matches ? this.enableDarkMode() : this.enableLightMode();
      }
    },

    initModeToggleButton() {
      this.modeToggleButton_dom.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        isDark ? this.enableLightMode() : this.enableDarkMode();
      });
    },

    initModeAutoTrigger() {
      const isDarkMode = this.isDarkPrefersColorScheme();
      isDarkMode.addEventListener('change', e => {
        e.matches ? this.enableDarkMode() : this.enableLightMode();
      });
    }
  }

  Global.utils.modeToggle.initModeStatus();
  Global.utils.modeToggle.initModeToggleButton();
  Global.utils.modeToggle.initModeAutoTrigger();
};
