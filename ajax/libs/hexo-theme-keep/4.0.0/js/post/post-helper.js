/* global KEEP */

function initPostHelper() {
  KEEP.utils.postHelper = {
    postPageContainerDom: document.querySelector('.post-page-container'),
    toggleShowTocBtn: document.querySelector('.toggle-show-toc'),
    toggleShowTocTabletBtn: document.querySelector('.toggle-show-toc-tablet'),
    toggleShowTocIcon: document.querySelector('.toggle-show-toc i'),
    mainContentDom: document.querySelector('.main-content'),
    postToolsDom: document.querySelector('.post-tools'),

    isShowToc: false,

    initToggleToc() {
      this.toggleShowTocBtn &&
        this.toggleShowTocBtn.addEventListener('click', () => {
          this.isShowToc = !this.isShowToc
          KEEP.themeInfo.styleStatus.isShowToc = this.isShowToc
          KEEP.setStyleStatus()
          this.handleToggleToc(this.isShowToc)
        })

      this.toggleShowTocTabletBtn &&
        this.toggleShowTocTabletBtn.addEventListener('click', () => {
          const tabletTocMask = document.querySelector('.tablet-post-toc-mask')
          const tabletToc = tabletTocMask.querySelector('.tablet-post-toc')

          document.body.style.overflow = `hidden`
          tabletTocMask.style.background = `rgba(0, 0, 0, 0.25)`
          tabletTocMask.style.visibility = `visible`
          tabletToc.style.transform = `translateX(0)`

          tabletTocMask.addEventListener('click', () => {
            document.body.style.overflow = ''
            tabletTocMask.style.background = `rgba(0, 0, 0, 0)`
            tabletTocMask.style.visibility = `hidden`
            tabletToc.style.transform = `translateX(-100%)`
          })
        })
    },

    handleToggleToc(isOpen) {
      if (isOpen) {
        this.postPageContainerDom.classList.add('show-toc')
        document.body.classList.add('has-toc')
      } else {
        this.postPageContainerDom.classList.remove('show-toc')
        document.body.classList.remove('has-toc')
      }

      setTimeout(() => {
        this.setPostToolsLayout()
      }, 120)
    },

    hasToc(isOpen) {
      if (this.toggleShowTocBtn) {
        this.toggleShowTocBtn.style.display = 'flex'
        this.isShowToc = isOpen
        this.handleToggleToc(isOpen)
      }
    },

    setPostToolsLayout(mcw) {
      const mainContainerWidth = mcw
        ? mcw
        : this.mainContentDom.getBoundingClientRect().width.toFixed(0)
      let offsetX = 5

      if (window.innerWidth <= 800) {
        offsetX = 3
      }

      const layout = KEEP.theme_config.toc?.layout === 'left' ? 'right' : 'left'
      this.postToolsDom.style.opacity = `1`
      this.postToolsDom.style[
        layout
      ] = `calc((100vw - ${mainContainerWidth}px) / 2 - ${offsetX}rem)`
    },

    initSetPostToolsLeft() {
      setTimeout(() => {
        this.setPostToolsLayout()
      }, 150)

      window.addEventListener('resize', () => {
        this.setPostToolsLayout()
      })
    },

    // go comment anchor
    goToComments() {
      const commentsAnchor = document.querySelector('#comments-anchor')
      const goToCommentsBtnList = [
        document.querySelector('.post-tools .go-to-comments'),
        document.querySelector('.exposed-tools-list .go-to-comments-tablet')
      ]

      goToCommentsBtnList.forEach((btn) => {
        if (btn && commentsAnchor) {
          btn.addEventListener('click', (event) => {
            event.preventDefault()
            let winScrollY = window.scrollY
            winScrollY = winScrollY === 0 ? -20 : winScrollY
            const offset = commentsAnchor.getBoundingClientRect().top + winScrollY
            window.anime({
              targets: document.scrollingElement,
              duration: 300,
              easing: 'linear',
              scrollTop: offset,
              complete: () => {
                setTimeout(() => {
                  KEEP.utils.pageTopDom.classList.add('hide')
                }, 150)
              }
            })
          })
        }
      })
    },

    // watch comments count
    watchPostCommentsCount() {
      const commentsCountDom = this.postToolsDom.querySelector('.post-comments-count')
      if (!commentsCountDom) return
      const config = { attributes: true, childList: true }

      const callback = function (mutationsList) {
        mutationsList.forEach((item) => {
          if (item.type === 'childList') {
            const count = Number(item.target.innerHTML)
            if (count > 0) {
              commentsCountDom.style.display = 'flex'
              if (count > 99) {
                commentsCountDom.innerHTML = '99+'
                observer.disconnect()
              }
            }
          }
        })
      }

      const observer = new MutationObserver(callback)
      observer.observe(commentsCountDom, config)
    },

    // set article aging tips
    setArticleAgingDays() {
      const agingTipsDom = document.querySelector('.article-content .article-aging-tips')
      if (agingTipsDom) {
        const daysDom = agingTipsDom.querySelector('.days')
        const nowTimestamp = Date.now()
        const tmpTimeLength = 24 * 60 * 60 * 1000
        const agingDaysTimestamp = (agingTipsDom.dataset?.agingDays || 30) * tmpTimeLength
        const postUpdateTimestamp = new Date(agingTipsDom.dataset.updateDate).getTime()
        const timeDifference = nowTimestamp - postUpdateTimestamp
        const timeDifferenceDays = (timeDifference / tmpTimeLength).toFixed(0)
        if (timeDifference >= agingDaysTimestamp) {
          daysDom.innerHTML = timeDifferenceDays
          agingTipsDom.style.display = 'block'
        }
      }
    },

    formatDatetime(fmt = 'YYYY-MM-DD hh:mm:ss', timestamp = Date.now()) {
      function padLeftZero(str) {
        return `00${str}`.substr(str.length)
      }

      const date = new Date(timestamp)

      if (/(y+)/.test(fmt) || /(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
      }

      const obj = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'd+': date.getDate(),
        'H+': date.getHours(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }

      for (const key in obj) {
        if (new RegExp(`(${key})`).test(fmt)) {
          const str = `${obj[key]}`
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
      }
      return fmt
    },

    resetPostUpdateDate() {
      const updateDateDom = document.querySelector(
        '.article-meta-info-container .article-update-date .pc'
      )
      const updated = new Date(updateDateDom.dataset.updated).getTime()
      const format = KEEP.theme_config.post?.datetime_format || 'YYYY-MM-DD HH:mm:ss'
      updateDateDom.innerHTML = this.formatDatetime(format, updated)
    }
  }

  KEEP.utils.postHelper.initSetPostToolsLeft()
  KEEP.utils.postHelper.setArticleAgingDays()
  KEEP.utils.postHelper.resetPostUpdateDate()

  if (KEEP.theme_config.toc?.enable === true) {
    KEEP.utils.postHelper.initToggleToc()
  }

  if (KEEP.theme_config.comment?.enable === true) {
    KEEP.utils.postHelper.goToComments()
    KEEP.utils.postHelper.watchPostCommentsCount()
  }
}

if (KEEP.theme_config.pjax?.enable === true && KEEP.utils) {
  initPostHelper()
} else {
  window.addEventListener('DOMContentLoaded', initPostHelper)
}
