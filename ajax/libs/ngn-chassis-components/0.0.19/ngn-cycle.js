var NgnCycle = document.registerElement('ngn-cycle', {
  prototype: Object.create(HTMLElement.prototype, {
    initTpl: {
      enumerable: false,
      value: function () {
	var content = '<template> <style> @charset "UTF-8"; div { display: flex; flex: 1 1 auto; } div > section { display: none; flex: 1 1 auto; } ::content > section { display: none; flex: 1 1 auto; } div > section.active { display: flex; } ::content > section.active { display: flex; } </style> <div id="host"> <content></content> </div> </template> '.replace(/<(\/?)template(.*?)>/gi,'')
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
        this.initTpl()
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
        var curr = this.querySelector('.active')
        var next = curr.nextElementSibling
        curr && curr.classList.remove('active')
        if (curr && next) {
          next.classList.add('active')
        } else if (this.getAttribute('restart') === 'true') {
          // next = this.querySelector('section')
          next = this.children[0]
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
        var curr = this.querySelector('.active')
        var prev = curr.previousElementSibling
        curr && curr.classList.remove('active')
        if (curr && prev) {
          prev.classList.add('active')
        } else if (this.getAttribute('restart') === 'true') {
          // If current selection is first, display the last
          if (curr === this.children[0]) {
            prev = this.children[this.children.length - 1]
          } else {
            prev = this.children[0]
          }
          prev.classList.add('active')
        }
        this.dispatchEvent(new CustomEvent('change', {
          detail: {
            next: curr || null,
            section: prev || null
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
        var curr = this.querySelector('.active')
        curr && curr.classList.remove('active')
        var next = this.children[i - 1]
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
     * @method first
     * A helper method to display the first section.
     */
    first: {
      value: function (i) {
        this.show(1)
      }
    },

    /**
     * @method last
     * A helper method to display the first section.
     */
    last: {
      value: function (i) {
        this.show(this.children.length)
      }
    },
  })
})
