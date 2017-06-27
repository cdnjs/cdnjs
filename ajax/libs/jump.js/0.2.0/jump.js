import easeInOutQuad from './easing'

export default class Jump {
  jump(target, options = {}) {
    this.start = window.pageYOffset

    this.options = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback || undefined,
      easing: options.easing || easeInOutQuad
    }

    this.distance = typeof target === 'string'
      ? this.options.offset + document.querySelector(target).getBoundingClientRect().top
      : target

    requestAnimationFrame(time => this._loop(time))
  }

  _loop(time) {
    if(!this.timeStart) {
      this.timeStart = time
    }

    this.timeElapsed = time - this.timeStart
    this.next = this.options.easing(this.timeElapsed, this.start, this.distance, this.options.duration)

    window.scrollTo(0, this.next)

    this.timeElapsed < this.options.duration
      ? requestAnimationFrame(time => this._loop(time))
      : this._end()
  }

  _end() {
    window.scrollTo(0, this.start + this.distance)

    typeof this.options.callback === 'function' && this.options.callback.call()
    this.timeStart = false
  }
}
