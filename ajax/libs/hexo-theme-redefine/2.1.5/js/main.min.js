window.addEventListener("DOMContentLoaded",()=>{Global.themeInfo={theme:"Redefine v"+Global.theme_config.version,author:"EvanNotFound",repository:"https://github.com/EvanNotFound/hexo-theme-redefine"},Global.localStorageKey="Global-THEME-STATUS",Global.styleStatus={isExpandPageWidth:!1,isDark:!1,fontSizeLevel:0,isOpenPageAside:!0},Global.printThemeInfo=()=>{console.log(`      ______ __  __  ______  __    __  ______                       \r
     /\\__  _/\\ \\_\\ \\/\\  ___\\/\\ "-./  \\/\\  ___\\                      \r
     \\/_/\\ \\\\ \\  __ \\ \\  __\\\\ \\ \\-./\\ \\ \\  __\\                      \r
        \\ \\_\\\\ \\_\\ \\_\\ \\_____\\ \\_\\ \\ \\_\\ \\_____\\                    \r
         \\/_/ \\/_/\\/_/\\/_____/\\/_/  \\/_/\\/_____/                    \r
                                                               \r
 ______  ______  _____   ______  ______ __  __   __  ______    \r
/\\  == \\/\\  ___\\/\\  __-./\\  ___\\/\\  ___/\\ \\/\\ "-.\\ \\/\\  ___\\   \r
\\ \\  __<\\ \\  __\\\\ \\ \\/\\ \\ \\  __\\\\ \\  __\\ \\ \\ \\ \\-.  \\ \\  __\\   \r
 \\ \\_\\ \\_\\ \\_____\\ \\____-\\ \\_____\\ \\_\\  \\ \\_\\ \\_\\\\"\\_\\ \\_____\\ \r
  \\/_/ /_/\\/_____/\\/____/ \\/_____/\\/_/   \\/_/\\/_/ \\/_/\\/_____/\r
                                                               \r
  Github: https://github.com/EvanNotFound/hexo-theme-redefine`)},Global.setStyleStatus=()=>{localStorage.setItem(Global.localStorageKey,JSON.stringify(Global.styleStatus))},Global.getStyleStatus=()=>{var _=localStorage.getItem(Global.localStorageKey);if(_){for(var e in _=JSON.parse(_),Global.styleStatus)Global.styleStatus[e]=_[e];return _}return null},Global.refresh=()=>{Global.initUtils(),navbarShrink.init(),Global.data_config.masonry&&Global.initMasonry(),Global.initModeToggle(),Global.initBackToTop(),0!==Global.theme_config.home_banner.subtitle.text.length&&location.pathname===Global.hexo_config.root&&Global.initTyped("subtitle"),!0===Global.theme_config.plugins.mermaid.enable&&Global.initMermaid(),!0===Global.theme_config.navbar.search.enable&&Global.initLocalSearch(),!0===Global.theme_config.articles.code_block.copy&&Global.initCopyCode(),!0===Global.theme_config.articles.lazyload&&Global.initLazyLoad()},Global.printThemeInfo(),Global.refresh()});