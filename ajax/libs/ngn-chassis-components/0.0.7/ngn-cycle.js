var NgnCycle = document.registerElement('ngn-cycle', {
  prototype: Object.create(HTMLElement.prototype, {
    history: {
      enumerable: false,
      value: []
    },

    initTpl: {
      enumerable: false,
      value: function () {
	var content = '<template> <style> @charset "UTF-8"; div { display: flex; flex: 1 1 auto; border: 1px solid red; } div > section { display: none; flex: 1 1 auto; } ::content > section { display: none; flex: 1 1 auto; } div > section.active { display: flex; } ::content > section.active { display: flex; } </style> <div> <content></content> </div> </template> '.replace(/<(\/?)template(.*?)>/gi,'')
	var shadow = this.createShadowRoot()
	var ph = document.createElement('p')
	ph.insertAdjacentHTML('afterbegin', content)
	Array.prototype.slice.call(ph.children).forEach(function (el) {
		shadow.appendChild(document.importNode(el, true))
	})
	delete ph
}

    },

    createdCallback: {
      value: function () {
        var me = this

        this.initTpl()

        this.addEventListener('change', function (e) {
          me.history.push(e.detail)
        })
      }
    },

    /**
     * @method next
     * Display the next screen.
     * @param {function} callback
     * Executed when the operation is complete.
     */
    next: {
      value: function (callback) {
        var curr = this.querySelector('section.active')
        var next = curr.nextElementSibling
        curr && curr.classList.remove('active')
        if (curr && next) {
          next.classList.add('active')
        } else if (this.getAttribute('restart') === 'true') {
          next = this.querySelector('section')
          next.classList.add('active')
        }
        this.dispatchEvent(new CustomEvent('change', {
          detail: {
            previous: curr || null,
            section: next || null
          }
        }))
        callback && callback(next || null)
      }
    },

    /**
     * @method previous
     * Display the previous screen.
     * @param {function} callback
     * Executed when the operation is complete.
     */
    previous: {
      value: function (callback) {
        var curr = this.querySelector('section.active')
        var prev = curr.previousElementSibling
        curr && curr.classList.remove('active')
        if (curr && prev) {
          prev.classList.add('active')
        } else if (this.getAttribute('restart') === 'true') {
          prev = this.querySelector('section:last-of-type')
          prev.classList.add('active')
        }
        this.dispatchEvent(new CustomEvent('change', {
          detail: {
            next: curr || null,
            section: curr || null
          }
        }))
        callback && callback(prev || null)
      }
    },

    /**
     * @method show
     * Show the specified screen (1-based index, i.e. first element is 1).
     * @param {number} index
     * The index of the screen to display.
     */
    show: {
      value: function (i) {
        var curr = this.querySelector('section.active')
        curr && curr.classList.remove('active')
        var next = this.querySelector('section:nth-of-type(' + i + ')')
        next && next.classList.add('active')
        this.dispatchEvent(new CustomEvent('change', {
          detail: {
            previous: curr || null,
            section: next || null
          }
        }))
      }
    },

    /**
     * @method back
     * Go back in the history.
     * @param {number} [index=1]
     * The number of actions to revert through.
     */
    back: {
      value: function (i) {
        i = i || 1
        var action = this.history[this.history.length - i]
        this.history.splice(this.history.length - i, this.history.length)
        action = action.previous ? action.previous : action.next
        this.querySelector('section.active').classList.remove('active')
        action.classList.add('active')
      }
    }
  })
})
