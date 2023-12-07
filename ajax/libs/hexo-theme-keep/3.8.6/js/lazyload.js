/* global KEEP */

KEEP.initLazyLoad = () => {
  const imgs = document.querySelectorAll('img')
  let now = Date.now()
  let needLoad = true

  function lazyload(imgs) {
    now = Date.now()
    needLoad = Array.from(imgs).some((i) => i.hasAttribute('lazyload'))

    const h = window.innerHeight
    const s = document.documentElement.scrollTop || document.body.scrollTop

    imgs.forEach((img) => {
      if (img.hasAttribute('lazyload') && !img.hasAttribute('loading')) {
        if (h + s > img.offsetTop) {
          img.setAttribute('loading', true)
          const loadImageTimeout = setTimeout(() => {
            const temp = new Image()
            const src = img.getAttribute('data-src')
            temp.src = src
            temp.onload = () => {
              img.src = src
              img.removeAttribute('lazyload')
              img.removeAttribute('loading')
              clearTimeout(loadImageTimeout)
            }
          }, 500)
        }
      }
    })
  }

  lazyload(imgs)

  window.onscroll = () => {
    if (Date.now() - now > 50 && needLoad) {
      lazyload(imgs)
    }
  }
}
