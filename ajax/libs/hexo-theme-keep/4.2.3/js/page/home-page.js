/* global KEEP */

function homePageHandler() {
  const { post_datetime, post_datetime_format, announcement } = KEEP.theme_config?.home || {}
  const fsc = KEEP.theme_config?.first_screen || {}

  // reset home post update datetime
  const resetHomePostUpdateDate = () => {
    if (post_datetime === 'updated' && post_datetime_format) {
      const datetimeDoms = document.querySelectorAll('.post-meta-info .home-post-history')
      datetimeDoms.forEach((datetimeDom) => {
        const updated = new Date(datetimeDom.dataset.updated).getTime()
        const format = post_datetime_format || KEEP.themeInfo.defaultDatetimeFormat
        datetimeDom.innerHTML = KEEP.utils.formatDatetime(format, updated)
      })
    }
  }

  // set how long age in home post block
  const setHowLongAgoInHome = () => {
    if (post_datetime_format && post_datetime_format !== 'ago') {
      return
    }
    const datetimeDoms = document.querySelectorAll('.post-meta-info .home-post-history')
    datetimeDoms.forEach((v) => {
      const nowTimestamp = Date.now()
      const updatedTimestamp = new Date(v.dataset.updated).getTime()
      v.innerHTML = KEEP.utils.getHowLongAgo(Math.floor((nowTimestamp - updatedTimestamp) / 1000))
    })
  }

  // close website announcement
  const closeWebsiteAnnouncement = () => {
    if (announcement) {
      const waDom = document.querySelector('.home-content-container .website-announcement')
      if (waDom) {
        const closeDom = waDom.querySelector('.close')
        closeDom.addEventListener('click', () => {
          waDom.style.display = 'none'
        })
      }
    }
  }

  // first screen typewriter
  const initTypewriter = () => {
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
  }

  resetHomePostUpdateDate()
  setHowLongAgoInHome()
  closeWebsiteAnnouncement()
  initTypewriter()
}

if (KEEP.theme_config?.pjax?.enable === true && KEEP.utils) {
  homePageHandler()
} else {
  window.addEventListener('DOMContentLoaded', homePageHandler)
}
