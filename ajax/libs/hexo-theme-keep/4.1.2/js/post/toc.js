/* global KEEP */

function initTOC() {
  const pageContainer = document.querySelector('.page-container')
  const postPageContainer = document.querySelector('.post-page-container')
  const pcTocContainer = document.querySelector('.pc-post-toc')
  const tabletTocContainer = document.querySelector('.tablet-post-toc')

  if (KEEP.utils.hasToc) {
    KEEP.utils.tocHelper = {
      pcTocNavSections: [],

      tabletTocNavSections: [],

      // get active index
      getActiveIndex(navSections) {
        if (!Array.isArray(navSections)) return
        const offsetY = 20
        const { isHideHeader, headerWrapperDom } = KEEP.utils
        const headerH = isHideHeader ? 0 : headerWrapperDom.getBoundingClientRect().height
        let index = navSections.findIndex((element) => {
          return element && element.getBoundingClientRect().top - (offsetY + headerH) > 0
        })

        if (index === -1) {
          index = navSections.length - 1
        } else if (index > 0) {
          index--
        }
        return index
      },

      // active nav
      activeNav() {
        // pc
        this.activateNavByIndex(pcTocContainer, this.getActiveIndex(this.pcTocNavSections))

        // tablet
        this.activateNavByIndex(tabletTocContainer, this.getActiveIndex(this.tabletTocNavSections))
      },

      // register TOC Nav
      registerTocNav() {
        const register = (tocContainer) => {
          return [...tocContainer.querySelectorAll('.post-toc li a.nav-link')].map((element) => {
            const target = document.getElementById(
              decodeURI(element.getAttribute('href')).replace('#', '')
            )
            KEEP.utils.title2Top4HTag(element, target, 500)
            return target
          })
        }
        // pc
        this.pcTocNavSections = register(pcTocContainer)

        // tablet
        this.tabletTocNavSections = register(tabletTocContainer)
      },

      activateNavByIndex(tocContainer, index) {
        const target = tocContainer.querySelectorAll('.post-toc li a.nav-link')[index]
        if (!target || target.classList.contains('active-current')) return

        tocContainer.querySelectorAll('.post-toc .active').forEach((element) => {
          element.classList.remove('active', 'active-current')
        })
        target.classList.add('active', 'active-current')
        let parent = target.parentNode
        while (!parent.matches('.post-toc')) {
          if (parent.matches('li')) parent.classList.add('active')
          parent = parent.parentNode
        }
        // Scrolling to center active TOC element if TOC content is taller than viewport.
        const tocElement = tocContainer.querySelector('.post-toc-wrap')
        window.anime({
          targets: tocElement,
          duration: 200,
          easing: 'linear',
          scrollTop:
            tocElement.scrollTop -
            tocElement.offsetHeight / 2 +
            target.getBoundingClientRect().top -
            tocElement.getBoundingClientRect().top
        })
      },

      handleShowWhenHasToc() {
        const openHandle = () => {
          const styleStatus = KEEP.getStyleStatus()
          const key = 'isShowToc'
          if (styleStatus && styleStatus.hasOwnProperty(key)) {
            KEEP.utils.postHelper.hasToc(styleStatus[key])
          } else {
            KEEP.utils.postHelper.hasToc(true)
          }
        }

        const initOpenKey = 'init_open'

        if (KEEP.theme_config.toc.hasOwnProperty(initOpenKey)) {
          KEEP.theme_config.toc[initOpenKey] ? openHandle() : KEEP.utils.postHelper.hasToc(false)
        } else {
          openHandle()
        }
      }
    }
    KEEP.utils.tocHelper.handleShowWhenHasToc()
    KEEP.utils.tocHelper.registerTocNav()
  } else {
    pcTocContainer && postPageContainer.removeChild(pcTocContainer)
    if (tabletTocContainer) {
      pageContainer.removeChild(document.querySelector('.tablet-post-toc-mask'))
    }
  }
}

if (KEEP.theme_config?.pjax?.enable === true && KEEP.utils) {
  initTOC()
} else {
  window.addEventListener('DOMContentLoaded', initTOC)
}
