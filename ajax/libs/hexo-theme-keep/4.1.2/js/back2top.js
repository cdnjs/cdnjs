/* global KEEP */

KEEP.initBack2Top = () => {
  KEEP.utils.back2Top = {
    back2BottomBtn: document.querySelector('.tool-scroll-to-bottom'),
    back2TopBtn: document.querySelector('.tool-scroll-to-top'),

    back2top() {
      window.anime({
        targets: document.scrollingElement,
        easing: 'easeOutExpo',
        scrollTop: 0
      })
    },

    back2Bottom() {
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
      window.anime({
        targets: document.scrollingElement,
        easing: 'easeInExpo',
        scrollTop: scrollHeight
      })
    },

    initBack2Top() {
      this.back2TopBtn &&
        this.back2TopBtn.addEventListener('click', () => {
          this.back2top()
        })
    },

    initBack2Bottom() {
      this.back2BottomBtn &&
        this.back2BottomBtn.addEventListener('click', () => {
          this.back2Bottom()
        })
    }
  }

  KEEP.utils.back2Top.initBack2Top()
  KEEP.utils.back2Top.initBack2Bottom()
}
