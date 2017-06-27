export default class Jump {
  jump(target, options = {}) {
    this.start = window.pageYOffset

    this.options = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback || undefined
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
    this.next = this._easing(this.timeElapsed, this.start, this.distance, this.options.duration)

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

  _easing(t, b, c, d) {
    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
    t /= d / 2
    if(t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }
}
