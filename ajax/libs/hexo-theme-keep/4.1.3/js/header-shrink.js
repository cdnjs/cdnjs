/* global KEEP */

KEEP.initHeaderShrink = () => {
  KEEP.utils.headerShrink = {
    headerWrapperDom: null,
    isHeaderShrink: false,
    headerHeight: 70,

    init() {
      this.headerWrapperDom = document.querySelector('.header-wrapper')
      if (this.headerWrapperDom) {
        this.headerHeight = this.headerWrapperDom.getBoundingClientRect().height
      }
    },

    headerShrink() {
      const fullPageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
      if (fullPageHeight < window.innerHeight + 2 * this.headerHeight) {
        return
      }

      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
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

    sideToolsBarShowHandle() {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      const sideToolsDom = document.querySelector('.side-tools .side-tools-container')
      if (scrollTop > this.headerHeight / 2) {
        sideToolsDom.classList.add('show')
      } else {
        sideToolsDom.classList.remove('show')
      }
    },

    toggleHeaderDrawerShow() {
      const domList = [document.querySelector('.window-mask'), document.querySelector('.menu-bar')]

      if (KEEP.theme_config?.pjax?.enable === true) {
        domList.push(
          ...document.querySelectorAll('.header-drawer .drawer-menu-list .drawer-menu-item')
        )
      }

      domList.forEach((v) => {
        v.addEventListener('click', () => {
          document.body.classList.toggle('show-header-drawer')
        })
      })
    }
  }
  KEEP.utils.headerShrink.init()
  KEEP.utils.headerShrink.headerShrink()
  KEEP.utils.headerShrink.toggleHeaderDrawerShow()
}
