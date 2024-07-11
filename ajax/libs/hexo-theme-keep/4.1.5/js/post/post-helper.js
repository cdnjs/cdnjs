/* global KEEP */

async function initPostHelper() {
  const encryptClassName = 'encrypt'

  KEEP.utils.postHelper = {
    postPageContainerDom: document.querySelector('.post-page-container'),
    toggleShowTocBtn: document.querySelector('.toggle-show-toc'),
    toggleShowTocTabletBtn: document.querySelector('.toggle-show-toc-tablet'),
    mainContentDom: document.querySelector('.main-content'),
    postToolsDom: document.querySelector('.post-tools'),
    isShowToc: false,

    initToggleToc() {
      this.toggleShowTocBtn &&
        this.toggleShowTocBtn.addEventListener('click', () => {
          if (this.postPageContainerDom.classList.contains(encryptClassName)) {
            return
          }
          this.isShowToc = !this.isShowToc
          KEEP.themeInfo.styleStatus.isShowToc = this.isShowToc
          KEEP.setStyleStatus()
          this.handleToggleToc(this.isShowToc)
        })

      this.toggleShowTocTabletBtn &&
        this.toggleShowTocTabletBtn.addEventListener('click', () => {
          if (this.postPageContainerDom.classList.contains(encryptClassName)) {
            return
          }

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
      }, 100)
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
        KEEP.utils.title2Top4HTag(btn, commentsAnchor, 300)
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

    // set post aging tips
    setArticleAgingDays() {
      const agingTipsDom = document.querySelector('.post-content .post-aging-tips')
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

    // reset post update datetime
    resetPostUpdateDate() {
      const updateDateDom = document.querySelector(
        '.post-meta-info-container .post-update-date .datetime'
      )
      const updated = new Date(updateDateDom.dataset.updated).getTime()
      const format = KEEP.theme_config.post?.datetime_format || KEEP.themeInfo.defaultDatetimeFormat
      updateDateDom.innerHTML = KEEP.utils.formatDatetime(format, updated)
    },

    // enable full screen
    enableFullScreen() {
      const fsb = document.querySelector('.post-tools-container .full-screen')
      if (fsb) {
        const icon = fsb.querySelector('i')

        const isFullScreen = () => {
          return (
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement
          )
        }

        const toggleFullScreen = () => {
          if (!isFullScreen()) {
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen()
            } else if (document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullScreen) {
              document.documentElement.webkitRequestFullScreen()
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen()
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen()
            }
          }
        }

        const handleFullscreenChange = () => {
          if (isFullScreen()) {
            icon.classList.remove('fa-expand')
            icon.classList.add('fa-compress')
          } else {
            icon.classList.remove('fa-compress')
            icon.classList.add('fa-expand')
          }
        }

        fsb.addEventListener('click', function () {
          toggleFullScreen()
        })

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener('mozfullscreenchange', handleFullscreenChange)
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
      }
    },

    hexToBuffer(hex) {
      const typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)))
      return typedArray.buffer
    },

    async decrypt(encrypted, key) {
      const algorithm = { name: 'AES-CBC', iv: this.hexToBuffer(encrypted.iv) }
      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        this.hexToBuffer(key),
        algorithm,
        false,
        ['decrypt']
      )
      const decrypted = await crypto.subtle.decrypt(
        algorithm,
        cryptoKey,
        this.hexToBuffer(encrypted.encryptedData)
      )
      const decoder = new TextDecoder()
      return decoder.decode(decrypted)
    },

    // encrypt toc handle
    encryptTocHandle(show) {
      setTimeout(() => {
        const tocDom = document.querySelector('.pc-post-toc')
        if (tocDom) {
          this.handleToggleToc(show)
          if (show) {
            tocDom?.removeAttribute('style')
          } else {
            tocDom.style.display = 'none'
          }
        }
      })
    },

    // post encrypt handle
    async postEncryptHandle() {
      const postContentDom = document.querySelector('.post-content')
      const encryptBoxDom = postContentDom.querySelector('.post-encrypt-box')
      const lockIconDom = document.querySelector('.post-tools-list .post-lock')
      const sessionKey = `${KEEP.themeInfo.encryptKey}#${location.pathname}`
      const lockClassName = `decrypt`

      if (encryptBoxDom) {
        this.encryptTocHandle(false)
        const { secret, ep, content, iv } = encryptBoxDom.dataset

        encryptBoxDom.removeAttribute('data-secret')
        encryptBoxDom.removeAttribute('data-iv')
        encryptBoxDom.removeAttribute('data-ep')
        encryptBoxDom.removeAttribute('data-content')

        const pwdInput = encryptBoxDom.querySelector('.password-input')

        const doDecrypt = async (isDecrypted = false) => {
          const pwdVal = pwdInput.value
          const dp = await this.decrypt({ iv, encryptedData: ep }, secret)

          const ddc = async () => {
            const dc = await this.decrypt({ iv, encryptedData: content }, secret)
            encryptBoxDom.style.display = 'none'
            postContentDom.removeChild(encryptBoxDom)
            this.postPageContainerDom.classList.remove(encryptClassName)
            this.encryptTocHandle(true)
            postContentDom.querySelector('.post').innerHTML = dc
            setTimeout(() => {
              KEEP.initLazyLoad()
              KEEP.initCodeBlock()
              KEEP.initTOC()
              KEEP.utils.zoomInImage()
              KEEP.utils.insertTooltipContent()
              KEEP.utils.tabsActiveHandle()
              KEEP.utils.wrapTableWithBox()
              KEEP.utils.aAnchorJump()
            })
            lockIconDom.classList.add(lockClassName)
            lockIconDom.classList.add('tooltip')
            sessionStorage.setItem(`${KEEP.themeInfo.encryptKey}#${location.pathname}`, '1')
          }

          if (isDecrypted) {
            await ddc()
            return
          }

          if (pwdVal === dp) {
            await ddc()
          } else {
            pwdInput.classList.add('error')
          }
        }

        const decrypted = sessionStorage.getItem(sessionKey)

        if (decrypted) {
          await doDecrypt(true)
        }

        pwdInput.addEventListener('keydown', async (e) => {
          if (pwdInput.value === '') {
            pwdInput.classList.remove('error')
          }

          if (e.keyCode === 13) {
            await doDecrypt()
            e.preventDefault()
          }
        })

        pwdInput.addEventListener('keyup', async (e) => {
          if (pwdInput.value === '') {
            pwdInput.classList.remove('error')
          }
        })

        lockIconDom.addEventListener('click', () => {
          if (lockIconDom.classList.contains(lockClassName)) {
            lockIconDom.classList.remove(lockClassName)
            sessionStorage.removeItem(sessionKey)
            location.reload()
          }
        })
      }
    }
  }

  KEEP.utils.postHelper.initSetPostToolsLeft()
  KEEP.utils.postHelper.setArticleAgingDays()
  KEEP.utils.postHelper.resetPostUpdateDate()
  KEEP.utils.postHelper.enableFullScreen()

  if (KEEP.utils.postHelper.postPageContainerDom.classList.contains(encryptClassName)) {
    await KEEP.utils.postHelper.postEncryptHandle()
  }

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
