/* global KEEP */

KEEP.initUtils = () => {
  KEEP.utils = {
    rootHtmlDom: document.querySelector('html'),
    pageTopDom: document.querySelector('.page-main-content-top'),
    scrollProgressBarDom: document.querySelector('.scroll-progress-bar'),
    pjaxProgressBarDom: document.querySelector('.pjax-progress-bar'),
    pjaxProgressIcon: document.querySelector('.pjax-progress-icon'),
    back2TopBtn: document.querySelector('.tool-scroll-to-top'),
    headerWrapperDom: document.querySelector('.header-wrapper'),

    innerHeight: window.innerHeight,
    pjaxProgressBarTimer: null,
    prevScrollValue: 0,
    fontSizeLevel: 0,
    isHasScrollProgressBar: false,
    isHasScrollPercent: false,
    isHeaderTransparent: false,
    isHideHeader: true,
    hasToc: false,

    // initialization data
    initData() {
      const scroll = KEEP.theme_config?.scroll || {}
      const first_screen = KEEP.theme_config?.first_screen || {}
      this.isHasScrollProgressBar = scroll?.progress_bar === true
      this.isHasScrollPercent = scroll?.percent === true
      this.isHeaderTransparent =
        first_screen?.enable === true && !window.location.pathname.includes('/page/')
      if (!this.isHeaderTransparent) {
        this.headerWrapperDom.classList.remove('transparent-1', 'transparent-2')
      }
      this.isHideHeader = scroll?.hide_header !== false
    },

    // scroll Style Handle
    styleHandleWhenScroll() {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
      const clientHeight = window.innerHeight || document.documentElement.clientHeight

      const percent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100) || 0

      // back to top
      if (scrollTop > 10) {
        this.back2TopBtn.classList.add('show')
      } else {
        this.back2TopBtn.classList.remove('show')
      }

      // scroll progress bar
      if (this.isHasScrollProgressBar && this.scrollProgressBarDom) {
        const progressPercent = ((scrollTop / (scrollHeight - clientHeight)) * 100).toFixed(3)
        this.scrollProgressBarDom.style.visibility = percent === 0 ? 'hidden' : 'visible'
        this.scrollProgressBarDom.style.width = `${progressPercent}%`
      }

      // scroll percent
      if (this.isHasScrollPercent && this.back2TopBtn) {
        this.back2TopBtn.classList.add('show-percent')
        const percentDom = this.back2TopBtn.querySelector('.percent')
        if (percent === 0 || percent === undefined) {
          this.back2TopBtn.classList.remove('show')
        } else {
          this.back2TopBtn.classList.add('show')
          percentDom.innerHTML = percent.toFixed(0)
          if (percent > 99) {
            this.back2TopBtn.classList.add('show-arrow')
          } else {
            this.back2TopBtn.classList.remove('show-arrow')
          }
        }
      }

      // hide header handle
      if (scrollTop > this.prevScrollValue && scrollTop > this.innerHeight) {
        if (this.isHideHeader) {
          this.pageTopDom.classList.add('hide')
        }
        if (this.isHeaderTransparent) {
          this.headerWrapperDom.classList.remove('transparent-1', 'transparent-2')
        }
      } else {
        if (this.isHideHeader) {
          this.pageTopDom.classList.remove('hide')
        }
        if (this.isHeaderTransparent) {
          if (scrollTop <= this.headerWrapperDom.getBoundingClientRect().height) {
            this.headerWrapperDom.classList.remove('transparent-2')
            this.headerWrapperDom.classList.add('transparent-1')
          } else if (scrollTop < this.innerHeight) {
            this.headerWrapperDom.classList.add('transparent-2')
          }
        }
      }

      // header font color handle
      if (KEEP.theme_config?.first_screen?.enable === true) {
        if (scrollTop > this.innerHeight - this.pageTopDom.getBoundingClientRect().height) {
          this.pageTopDom.classList.add('reset-color')
        } else {
          this.pageTopDom.classList.remove('reset-color')
        }
      }

      this.prevScrollValue = scrollTop
    },

    // register window scroll event
    registerWindowScroll() {
      window.addEventListener('scroll', () => {
        // style handle when scroll
        this.styleHandleWhenScroll()

        // TOC scroll handle
        if (KEEP.theme_config?.toc?.enable === true && KEEP.utils?.tocHelper) {
          KEEP.utils.tocHelper.activeNav()
        }

        // header shrink
        KEEP.utils.headerShrink.headerShrink()

        // side tools bar show handle
        KEEP.utils.headerShrink.sideToolsBarShowHandle()
      })
    },

    // toggle show tools list
    toggleShowToolsList() {
      const sideToolsListDom = document.querySelector('.side-tools-list')
      const toggleShowToolsDom = document.querySelector('.tool-toggle-show')
      toggleShowToolsDom.addEventListener('click', (e) => {
        sideToolsListDom.classList.toggle('show')
        e.stopPropagation()
      })
      sideToolsListDom.querySelectorAll('.tools-item').forEach((item) => {
        item.addEventListener('click', (e) => {
          e.stopPropagation()
        })
      })
      document.addEventListener('click', () => {
        sideToolsListDom.classList.contains('show') && sideToolsListDom.classList.remove('show')
      })
    },

    // global font adjust
    globalFontAdjust() {
      const fontSize = document.defaultView.getComputedStyle(document.body).fontSize
      const fs = parseFloat(fontSize)

      const initFontSize = () => {
        const styleStatus = KEEP.getStyleStatus()
        if (styleStatus) {
          this.fontSizeLevel = styleStatus.fontSizeLevel
          setFontSize(this.fontSizeLevel)
        }
      }

      const setFontSize = (fontSizeLevel) => {
        this.rootHtmlDom.style.setProperty(
          'font-size',
          `${fs * (1 + fontSizeLevel * 0.05)}px`,
          'important'
        )
        KEEP.themeInfo.styleStatus.fontSizeLevel = fontSizeLevel
        KEEP.setStyleStatus()
      }

      initFontSize()

      document.querySelector('.tool-font-adjust-plus').addEventListener('click', () => {
        if (this.fontSizeLevel === 5) return
        this.fontSizeLevel++
        setFontSize(this.fontSizeLevel)
      })

      document.querySelector('.tool-font-adjust-minus').addEventListener('click', () => {
        if (this.fontSizeLevel <= 0) return
        this.fontSizeLevel--
        setFontSize(this.fontSizeLevel)
      })
    },

    // init has TOC
    initHasToc() {
      const tocNavDoms = document.querySelectorAll('.post-toc-wrap .post-toc li')
      if (tocNavDoms.length > 0) {
        this.hasToc = true
        document.body.classList.add('has-toc')
      } else {
        this.hasToc = false
        document.body.classList.remove('has-toc')
      }
    },

    // get dom zoom value
    getZoomValueOfDom(dom) {
      const tmp = Number((dom.style?.zoom || '1').replace('%', ''))
      return tmp > 1 ? tmp / 100 : tmp
    },

    // zoom in image
    zoomInImage() {
      let SIDE_GAP = 40
      let isZoomIn = false
      let curWinScrollY = 0
      let selectedImgDom = null
      const zoomInImgMask = document.querySelector('.zoom-in-image-mask')
      const zoomInImg = zoomInImgMask?.querySelector('.zoom-in-image')
      const imgDomList = [
        ...document.querySelectorAll('.keep-markdown-body img'),
        ...document.querySelectorAll('.photo-album-box img')
      ]

      const zoomOut = () => {
        if (isZoomIn) {
          isZoomIn = false
          curWinScrollY = 0
          zoomInImg && (zoomInImg.style.transform = `scale(1)`)
          zoomInImgMask && zoomInImgMask.classList.remove('show')
          setTimeout(() => {
            selectedImgDom && selectedImgDom.classList.remove('hide')
          }, 300)
        }
      }

      const zoomOutHandle = () => {
        zoomInImgMask &&
          zoomInImgMask.addEventListener('click', () => {
            zoomOut()
          })

        document.addEventListener('scroll', () => {
          if (isZoomIn && Math.abs(curWinScrollY - window.scrollY) >= 50) {
            zoomOut()
          }
        })
      }

      const setSideGap = () => {
        const w = document.body.offsetWidth
        if (w <= 500) {
          SIDE_GAP = 10
        } else if (w <= 800) {
          SIDE_GAP = 20
        } else {
          SIDE_GAP = 40
        }
      }

      if (imgDomList.length) {
        // Register zoom out events
        zoomOutHandle()

        imgDomList.forEach((img) => {
          // Zoom in handle
          img.addEventListener('click', () => {
            curWinScrollY = window.scrollY
            isZoomIn = !isZoomIn
            setSideGap()
            zoomInImg.setAttribute('src', img.getAttribute('src'))
            selectedImgDom = img

            if (isZoomIn) {
              const imgRect = selectedImgDom.getBoundingClientRect()

              const zoom = this.getZoomValueOfDom(selectedImgDom)

              for (let key in imgRect) {
                imgRect[key] = imgRect[key] * zoom
              }

              const imgW = imgRect.width
              const imgH = imgRect.height
              const imgL = imgRect.left
              const imgT = imgRect.top
              const winW = document.body.offsetWidth - SIDE_GAP * 2
              const winH = document.body.offsetHeight - SIDE_GAP * 2
              const scaleX = winW / imgW
              const scaleY = winH / imgH
              const scale = (scaleX < scaleY ? scaleX : scaleY) || 1
              const translateX = winW / 2 - (imgRect.x + imgW / 2) + SIDE_GAP
              const translateY = winH / 2 - (imgRect.y + imgH / 2) + SIDE_GAP

              selectedImgDom.classList.add('hide')
              zoomInImgMask.classList.add('show')

              zoomInImg.style.top = imgT + 'px'
              zoomInImg.style.left = imgL + 'px'
              zoomInImg.style.width = imgW + 'px'
              zoomInImg.style.height = imgH + 'px'
              zoomInImg.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) `
            }
          })
        })
      }
    },

    // set how long ago language
    setHowLongAgoLanguage(p1, p2) {
      return p2.replace(/%s/g, p1)
    },

    // get how long ago
    getHowLongAgo(timestamp) {
      const lang = KEEP.language_ago
      const __Y = Math.floor(timestamp / (60 * 60 * 24 * 30) / 12)
      const __M = Math.floor(timestamp / (60 * 60 * 24 * 30))
      const __W = Math.floor(timestamp / (60 * 60 * 24) / 7)
      const __d = Math.floor(timestamp / (60 * 60 * 24))
      const __h = Math.floor((timestamp / (60 * 60)) % 24)
      const __m = Math.floor((timestamp / 60) % 60)
      const __s = Math.floor(timestamp % 60)

      if (__Y > 0) {
        return this.setHowLongAgoLanguage(__Y, lang.year)
      } else if (__M > 0) {
        return this.setHowLongAgoLanguage(__M, lang.month)
      } else if (__W > 0) {
        return this.setHowLongAgoLanguage(__W, lang.week)
      } else if (__d > 0) {
        return this.setHowLongAgoLanguage(__d, lang.day)
      } else if (__h > 0) {
        return this.setHowLongAgoLanguage(__h, lang.hour)
      } else if (__m > 0) {
        return this.setHowLongAgoLanguage(__m, lang.minute)
      } else if (__s > 0) {
        return this.setHowLongAgoLanguage(__s, lang.second)
      }
    },

    // set how long age in home post block
    setHowLongAgoInHome() {
      const post = document.querySelectorAll('.post-meta-info .home-post-history')
      post &&
        post.forEach((v) => {
          const nowTimestamp = Date.now()
          const updatedTimestamp = new Date(v.dataset.updated).getTime()
          v.innerHTML = this.getHowLongAgo(Math.floor((nowTimestamp - updatedTimestamp) / 1000))
        })
    },

    // loading progress bar start
    pjaxProgressBarStart() {
      this.pjaxProgressBarTimer && clearInterval(this.pjaxProgressBarTimer)
      if (this.isHasScrollProgressBar) {
        this.scrollProgressBarDom.classList.add('hide')
      }

      this.pjaxProgressBarDom.style.width = '0'
      this.pjaxProgressIcon.classList.add('show')

      let width = 1
      const maxWidth = 99

      this.pjaxProgressBarDom.classList.add('show')
      this.pjaxProgressBarDom.style.width = width + '%'

      this.pjaxProgressBarTimer = setInterval(() => {
        width += 5
        if (width > maxWidth) width = maxWidth
        this.pjaxProgressBarDom.style.width = width + '%'
      }, 100)
    },

    // loading progress bar end
    pjaxProgressBarEnd() {
      this.pjaxProgressBarTimer && clearInterval(this.pjaxProgressBarTimer)
      this.pjaxProgressBarDom.style.width = '100%'

      const temp_1 = setTimeout(() => {
        this.pjaxProgressBarDom.classList.remove('show')
        this.pjaxProgressIcon.classList.remove('show')

        if (this.isHasScrollProgressBar) {
          this.scrollProgressBarDom.classList.remove('hide')
        }

        const temp_2 = setTimeout(() => {
          this.pjaxProgressBarDom.style.width = '0'
          clearTimeout(temp_1), clearTimeout(temp_2)
        }, 200)
      }, 200)
    },

    // insert tooltip content dom
    insertTooltipContent() {
      const { root } = KEEP.theme_config
      const isLazyLoadImg = KEEP.theme_config?.lazyload?.enable === true

      const init = () => {
        // tooltip
        document.querySelectorAll('.tooltip').forEach((element) => {
          const { tooltipContent, tooltipOffsetX, tooltipOffsetY } = element.dataset

          let styleCss = ''

          if (tooltipOffsetX) {
            styleCss += `left: ${tooltipOffsetX};`
          }

          if (tooltipOffsetY) {
            styleCss += `top: ${tooltipOffsetY};`
          }

          if (styleCss) {
            styleCss = `style="${styleCss}"`
          }

          if (tooltipContent) {
            element.insertAdjacentHTML(
              'afterbegin',
              `<span class="tooltip-content" ${styleCss}>${tooltipContent}</span>`
            )
          }
        })

        // tooltip-img
        const imgsSet = {}

        const hideTooltipImg = (dom, nameIdx, trigger = 'click') => {
          if (trigger === 'hover') {
            trigger = 'mouseout'
          }

          document.addEventListener(trigger, () => {
            if (imgsSet[nameIdx].isShowImg) {
              dom.classList.remove('show-img')
              imgsSet[nameIdx].isShowImg = false
            }
          })
        }

        const loadImg = (img, imgLoaded) => {
          const temp = new Image()
          const { src } = img.dataset
          temp.src = src
          temp.onload = () => {
            img.src = src
            img.removeAttribute('lazyload')
            imgLoaded = true
          }
        }

        // tooltip-img
        document.querySelectorAll('.tooltip-img').forEach((dom, idx) => {
          const {
            tooltipImgName,
            tooltipImgUrl,
            tooltipImgTip,
            tooltipImgTrigger = 'click',
            tooltipImgStyle
          } = dom.dataset

          let styleCss = ''

          if (tooltipImgStyle) {
            styleCss = `style="${tooltipImgStyle}"`
          }

          let tipDom = ''
          if (tooltipImgTip) {
            tipDom = `<div class="tip">${tooltipImgTip}</div>`
          }

          if (tooltipImgUrl) {
            const imgDomClass = `tooltip-img-${idx}-${tooltipImgName ? tooltipImgName : Date.now()}`
            const nameIdx = `${tooltipImgName}-${idx}`
            const tmpSrc = (/^(https?:\/\/)/.test(tooltipImgUrl) ? '' : root) + tooltipImgUrl

            const imgDom = `<img class="${imgDomClass}"
                              ${isLazyLoadImg ? 'lazyload' : ''}
                              ${isLazyLoadImg ? 'data-' : ''}src="${tmpSrc}"
                              alt="${imgDomClass}"
                            >`

            const imgTooltipBox = `<div ${styleCss} class="tooltip-img-box ${
              tipDom ? 'has-tip' : ''
            }">${imgDom}${tipDom}</div>`

            imgsSet[nameIdx] = {
              imgLoaded: false,
              isShowImg: false
            }

            dom.insertAdjacentHTML('afterbegin', imgTooltipBox)

            let eventTrigger = 'click'

            if (tooltipImgTrigger === 'hover') {
              eventTrigger = 'mouseover'
            }

            dom.addEventListener(eventTrigger, (e) => {
              if (isLazyLoadImg && !imgsSet[nameIdx].imgLoaded) {
                loadImg(
                  document.querySelector(`.tooltip-img-box img.${imgDomClass}`),
                  imgsSet[nameIdx].imgLoaded
                )
              }
              imgsSet[nameIdx].isShowImg = !imgsSet[nameIdx].isShowImg
              dom.classList.toggle('show-img')
              e.stopPropagation()
            })

            hideTooltipImg(dom, nameIdx, tooltipImgTrigger)
          }
        })
      }
      setTimeout(() => {
        init()
      }, 1000)
    },

    // busuanzi initialize handle
    siteCountInitialize() {
      if (KEEP.theme_config?.website_count?.busuanzi_count?.enable === true) {
        const tmpId = 'busuanzi-js'
        let script = document.body.querySelector(`#${tmpId}`)

        if (!script) {
          script = document.createElement('script')
          script.setAttribute('data-pjax', '')
          script.setAttribute('id', tmpId)
          script.async = true
          script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
          document.body.appendChild(script)
        }

        const getText = (selector) => {
          return document.querySelector(selector)?.innerText
        }

        script.onload = () => {
          setTimeout(() => {
            if (
              getText('#busuanzi_value_site_uv') ||
              getText('#busuanzi_value_site_pv') ||
              getText('#busuanzi_value_page_pv')
            ) {
              const tmpDom1 = document.querySelector('.footer .count-item .uv')
              const tmpDom2 = document.querySelector('.footer .count-item .pv')
              const tmpDom3 = document.querySelector('.post-meta-info .post-pv')
              tmpDom1 && (tmpDom1.style.display = 'flex')
              tmpDom2 && (tmpDom2.style.display = 'flex')
              tmpDom3 && (tmpDom3.style.display = 'inline-block')
            }
          }, 1000)
        }
      }
    },

    // page number jump handle
    pageNumberJump() {
      const inputDom = document.querySelector('.paginator .page-number-input')
      inputDom &&
        inputDom.addEventListener('change', (e) => {
          const min = 1
          const max = Number(e.target.max)
          let current = Number(e.target.value)

          if (current <= 0) {
            inputDom.value = min
            current = min
          }

          if (current > max) {
            inputDom.value = max
            current = max
          }

          const tempHref = window.location.href.replace(/\/$/, '').split('/page/')[0]

          if (current === 1) {
            window.location.href = tempHref
          } else {
            window.location.href = tempHref + '/page/' + current
          }
        })
    },

    // custom tabs tag active handle
    tabsActiveHandle() {
      const activeHandle = (navList, paneList, tab) => {
        navList.forEach((nav) => {
          if (tab.dataset.href === nav.dataset.href) {
            nav.classList.add('active')
          } else {
            nav.classList.remove('active')
          }
        })

        paneList.forEach((pane) => {
          if (tab.dataset.href === pane.id) {
            pane.classList.add('active')
          } else {
            pane.classList.remove('active')
          }
        })
      }

      const tabsList = document.querySelectorAll('.keep-tabs')
      tabsList.length &&
        tabsList.forEach((tabs) => {
          const tabNavList = tabs.querySelectorAll('.tabs-nav .tab')
          const tabPaneList = tabs.querySelectorAll('.tabs-content .tab-pane')
          tabNavList.forEach((tabNav) => {
            tabNav.addEventListener('click', () => {
              activeHandle(tabNavList, tabPaneList, tabNav)
            })
          })
        })
    },

    // first screen typewriter
    initTypewriter() {
      const fsc = KEEP.theme_config?.first_screen || {}
      const isHitokoto = fsc?.hitokoto === true

      if (fsc?.enable !== true) {
        return
      }

      if (fsc?.enable === true && !isHitokoto && !fsc?.description) {
        return
      }

      const descBox = document.querySelector('.first-screen-content .description')
      if (descBox) {
        descBox.style.opacity = '0'

        setTimeout(
          () => {
            descBox.style.opacity = '1'
            const descItemList = descBox.querySelectorAll('.desc-item')
            descItemList.forEach((descItem) => {
              const desc = descItem.querySelector('.desc')
              const cursor = descItem.querySelector('.cursor')
              const text = desc.innerHTML
              desc.innerHTML = ''
              let charIndex = 0

              if (text) {
                const typewriter = () => {
                  if (charIndex < text.length) {
                    desc.textContent += text.charAt(charIndex)
                    charIndex++
                    setTimeout(typewriter, 100)
                  } else {
                    cursor.style.display = 'none'
                  }
                }

                typewriter()
              }
            })
          },
          isHitokoto ? 400 : 300
        )
      }
    },

    // remove white space between children
    removeWhitespace(container) {
      if (!container) {
        return
      }

      const childNodes = container.childNodes
      const whitespaceNodes = []

      for (let i = 0; i < childNodes.length; i++) {
        const node = childNodes[i]

        if (node.nodeType === 3 && /^\s*$/.test(node.nodeValue)) {
          whitespaceNodes.push(node)
        }
      }

      for (const whitespaceNode of whitespaceNodes) {
        container.removeChild(whitespaceNode)
      }
    },
    trimPostMetaInfoBar() {
      this.removeWhitespace(document.querySelector('.post-meta-info-container .post-category-ul'))
      this.removeWhitespace(document.querySelector('.post-meta-info-container .post-tag-ul'))
    },

    // close website announcement
    closeWebsiteAnnouncement() {
      if (KEEP.theme_config?.home?.announcement) {
        const waDom = document.querySelector('.home-content-container .website-announcement')
        if (waDom) {
          const closeDom = waDom.querySelector('.close')
          closeDom.addEventListener('click', () => {
            waDom.style.display = 'none'
          })
        }
      }
    },

    // wrap table dom with div
    wrapTableWithBox() {
      document.querySelectorAll('table').forEach((element) => {
        const box = document.createElement('div')
        box.className = 'table-container'
        element.wrap(box)
      })
    },

    // H tag title to top
    title2Top4HTag(a, h, isHideHeader, duration = 200) {
      if (a && h) {
        a.addEventListener('click', (e) => {
          e.preventDefault()
          let winScrollY = window.scrollY
          winScrollY = winScrollY <= 1 ? -19 : winScrollY
          let offset = h.getBoundingClientRect().top + winScrollY

          if (!isHideHeader) {
            offset = offset - 60
          }

          window.anime({
            targets: document.scrollingElement,
            duration,
            easing: 'linear',
            scrollTop: offset,
            complete: () => {
              history.pushState(null, document.title, a.href)
              if (isHideHeader) {
                setTimeout(() => {
                  KEEP.utils.pageTopDom.classList.add('hide')
                }, 160)
              }
            }
          })
        })
      }
    },

    // A tag anchor jump handle
    aAnchorJump() {
      document.querySelectorAll('a.headerlink').forEach((a) => {
        this.title2Top4HTag(a, a.parentNode, this.isHideHeader, 10)
      })
    }
  }

  KEEP.utils.initData()
  KEEP.utils.registerWindowScroll()
  KEEP.utils.toggleShowToolsList()
  KEEP.utils.globalFontAdjust()
  KEEP.utils.initHasToc()
  KEEP.utils.zoomInImage()
  KEEP.utils.setHowLongAgoInHome()
  KEEP.utils.insertTooltipContent()
  KEEP.utils.siteCountInitialize()
  KEEP.utils.pageNumberJump()
  KEEP.utils.tabsActiveHandle()
  KEEP.utils.initTypewriter()
  KEEP.utils.trimPostMetaInfoBar()
  KEEP.utils.closeWebsiteAnnouncement()
  KEEP.utils.wrapTableWithBox()
  KEEP.utils.aAnchorJump()
}
