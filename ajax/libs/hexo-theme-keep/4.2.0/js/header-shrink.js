/* global KEEP */

KEEP.initHeaderShrink = () => {
  KEEP.utils.headerShrink = {
    headerWrapperDom: null,
    isHeaderShrink: false,
    headerHeight: 70,
    drawerMenuListDom: document.querySelector('.header-drawer .drawer-menu-list'),
    windowMaskDom: document.querySelector('.window-mask'),

    init() {
      this.headerWrapperDom = document.querySelector('.header-wrapper')
      if (this.headerWrapperDom) {
        this.headerHeight = this.headerWrapperDom.getBoundingClientRect().height
      }
    },

    headerShrink() {
      const fullPageHeight = KEEP.utils.getFullPageHeight()
      if (fullPageHeight < window.innerHeight + 2 * this.headerHeight) {
        return
      }

      const scrollTop = KEEP.utils.getScrollTop()
      const isHeaderTransparent =
        KEEP.theme_config?.first_screen?.enable === true &&
        !window.location.pathname.includes('/page/')

      if (!this.isHeaderShrink && scrollTop > this.headerHeight) {
        this.isHeaderShrink = true
        document.body.classList.add('header-shrink')
        if (isHeaderTransparent) {
          this.headerWrapperDom.classList.add('transparent-2')
        }
      } else if (this.isHeaderShrink && scrollTop <= this.headerHeight) {
        this.isHeaderShrink = false
        document.body.classList.remove('header-shrink')
        if (isHeaderTransparent) {
          this.headerWrapperDom.classList.remove('transparent-2')
        }
      }
    },

    cleanHeaderShrink() {
      document.body.classList.remove('header-shrink')
      this.isHeaderShrink = false
    },

    sideToolsBarShowHandle() {
      const scrollTop = KEEP.utils.getScrollTop()
      const sideToolsDom = document.querySelector('.side-tools .side-tools-container')
      if (scrollTop > this.headerHeight / 2) {
        sideToolsDom.classList.add('show')
      } else {
        sideToolsDom.classList.remove('show')
      }
    },

    toggleHeaderDrawerShow() {
      const domList = [this.windowMaskDom, document.querySelector('.menu-bar')]

      if (KEEP.theme_config?.pjax?.enable === true) {
        domList.push(...this.drawerMenuListDom.querySelectorAll('.not-sub-menu'))
        domList.push(...this.drawerMenuListDom.querySelectorAll('.has-sub-menu .sub-menu-item'))
      }

      domList.forEach((v) => {
        v.addEventListener('click', () => {
          document.body.classList.toggle('show-header-drawer')
        })
      })
    },

    // menu nav jump handle
    menuNavJumpHandle() {
      const menuLabels = this.drawerMenuListDom.querySelectorAll('.has-sub-menu .drawer-menu-label')
      menuLabels.forEach((menu) => {
        menu.addEventListener('click', () => {
          menu.parentElement.classList.toggle('show-sub-menu')
        })
      })
    },

    closeHeaderDrawer() {
      const siteInfoDom = document.querySelector('.header-wrapper .header-content .left')
      siteInfoDom.addEventListener('click', () => {
        document.body.classList.remove('show-header-drawer')
      })
    }
  }
  KEEP.utils.headerShrink.init()
  KEEP.utils.headerShrink.headerShrink()
  KEEP.utils.headerShrink.toggleHeaderDrawerShow()
  KEEP.utils.headerShrink.menuNavJumpHandle()
  KEEP.utils.headerShrink.closeHeaderDrawer()
  KEEP.utils.headerShrink.cleanHeaderShrink()
}
