class TonicTemplate {
  constructor (rawText, templateStrings, unsafe) {
    this.isTonicTemplate = true
    this.unsafe = unsafe
    this.rawText = rawText
    this.templateStrings = templateStrings
  }

  valueOf () { return this.rawText }
  toString () { return this.rawText }
}

class Tonic extends window.HTMLElement {
  constructor () {
    super()
    const state = Tonic._states[super.id]
    delete Tonic._states[super.id]
    this._state = state || {}
    this.preventRenderOnReconnect = false
    this.props = {}
    this.elements = [...this.children]
    this.elements.__children__ = true
    this.nodes = [...this.childNodes]
    this.nodes.__children__ = true
    this._events()
  }

  static _createId () {
    return `tonic${Tonic._index++}`
  }

  static _splitName (s) {
    return s.match(/[A-Z][a-z]*/g).join('-')
  }

  static _normalizeAttrs (o, x = {}) {
    [...o].forEach(o => (x[o.name] = o.value))
    return x
  }

  _checkId () {
    const _id = super.id
    if (!_id) {
      const html = this.outerHTML.replace(this.innerHTML, '...')
      throw new Error(`Component: ${html} has no id`)
    }
    return _id
  }

  get state () {
    return (this._checkId(), this._state)
  }

  set state (newState) {
    this._state = (this._checkId(), newState)
  }

  get id () { return this._checkId() }

  set id (newId) { super.id = newId }

  _events () {
    const hp = Object.getOwnPropertyNames(window.HTMLElement.prototype)
    for (const p of this._props) {
      if (hp.indexOf('on' + p) === -1) continue
      this.addEventListener(p, this)
    }
  }

  _prop (o) {
    const id = this._id
    const p = `__${id}__${Tonic._createId()}__`
    Tonic._data[id] = Tonic._data[id] || {}
    Tonic._data[id][p] = o
    return p
  }

  _placehold (r) {
    const id = this._id
    const ref = `placehold:${id}:${Tonic._createId()}__`
    Tonic._children[id] = Tonic._children[id] || {}
    Tonic._children[id][ref] = r
    return ref
  }

  static match (el, s) {
    if (!el.matches) el = el.parentElement
    return el.matches(s) ? el : el.closest(s)
  }

  static getPropertyNames (proto) {
    const props = []
    while (proto && proto !== Tonic.prototype) {
      props.push(...Object.getOwnPropertyNames(proto))
      proto = Object.getPrototypeOf(proto)
    }
    return props
  }

  static add (c, htmlName) {
    const hasValidName = htmlName || (c.name && c.name.length > 1)
    if (!hasValidName) {
      throw Error('Mangling. https://bit.ly/2TkJ6zP')
    }

    if (!htmlName) htmlName = Tonic._splitName(c.name).toLowerCase()
    if (window.customElements.get(htmlName)) {
      throw new Error(`Cannot Tonic.add(${c.name}, '${htmlName}') twice`)
    }

    if (!c.prototype || !c.prototype.isTonicComponent) {
      const tmp = { [c.name]: class extends Tonic {} }[c.name]
      tmp.prototype.render = c
      c = tmp
    }

    c.prototype._props = Tonic.getPropertyNames(c.prototype)

    Tonic._reg[htmlName] = c
    Tonic._tags = Object.keys(Tonic._reg).join()
    window.customElements.define(htmlName, c)

    if (typeof c.stylesheet === 'function') {
      Tonic.registerStyles(c.stylesheet)
    }

    return c
  }

  static registerStyles (stylesheetFn) {
    if (Tonic._stylesheetRegistry.includes(stylesheetFn)) return
    Tonic._stylesheetRegistry.push(stylesheetFn)

    const styleNode = document.createElement('style')
    if (Tonic.nonce) styleNode.setAttribute('nonce', Tonic.nonce)
    styleNode.appendChild(document.createTextNode(stylesheetFn()))
    if (document.head) document.head.appendChild(styleNode)
  }

  static escape (s) {
    return s.replace(Tonic.ESC, c => Tonic.MAP[c])
  }

  static unsafeRawString (s, templateStrings) {
    return new TonicTemplate(s, templateStrings, true)
  }

  dispatch (eventName, detail = null) {
    const opts = { bubbles: true, detail }
    this.dispatchEvent(new window.CustomEvent(eventName, opts))
  }

  html (strings, ...values) {
    const refs = o => {
      if (o && o.__children__) return this._placehold(o)
      if (o && o.isTonicTemplate) return o.rawText
      switch (Object.prototype.toString.call(o)) {
        case '[object HTMLCollection]':
        case '[object NodeList]': return this._placehold([...o])
        case '[object Array]':
          if (o.every(x => x.isTonicTemplate && !x.unsafe)) {
            return new TonicTemplate(o.join('\n'), null, false)
          }
          return this._prop(o)
        case '[object Object]':
        case '[object Function]': return this._prop(o)
        case '[object NamedNodeMap]':
          return this._prop(Tonic._normalizeAttrs(o))
        case '[object Number]': return `${o}__float`
        case '[object String]': return Tonic.escape(o)
        case '[object Boolean]': return `${o}__boolean`
        case '[object Null]': return `${o}__null`
        case '[object HTMLElement]':
          return this._placehold([o])
      }
      if (
        typeof o === 'object' && o && o.nodeType === 1 &&
        typeof o.cloneNode === 'function'
      ) {
        return this._placehold([o])
      }
      return o
    }

    const out = []
    for (let i = 0; i < strings.length - 1; i++) {
      out.push(strings[i], refs(values[i]))
    }
    out.push(strings[strings.length - 1])

    const htmlStr = out.join('').replace(Tonic.SPREAD, (_, p) => {
      const o = Tonic._data[p.split('__')[1]][p]
      return Object.entries(o).map(([key, value]) => {
        const k = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        if (value === true) return k
        else if (value) return `${k}="${Tonic.escape(String(value))}"`
        else return ''
      }).filter(Boolean).join(' ')
    })
    return new TonicTemplate(htmlStr, strings, false)
  }

  scheduleReRender (oldProps) {
    if (this.pendingReRender) return this.pendingReRender

    this.pendingReRender = new Promise(resolve => setTimeout(() => {
      if (!this.isInDocument(this.shadowRoot || this)) return
      const p = this._set(this.shadowRoot || this, this.render)
      this.pendingReRender = null

      if (p && p.then) {
        return p.then(() => {
          this.updated && this.updated(oldProps)
          resolve()
        })
      }

      this.updated && this.updated(oldProps)
      resolve()
    }, 0))

    return this.pendingReRender
  }

  reRender (o = this.props) {
    const oldProps = { ...this.props }
    this.props = typeof o === 'function' ? o(oldProps) : o
    return this.scheduleReRender(oldProps)
  }

  handleEvent (e) {
    this[e.type](e)
  }

  _drainIterator (target, iterator) {
    return iterator.next().then((result) => {
      this._set(target, null, result.value)
      if (result.done) return
      return this._drainIterator(target, iterator)
    })
  }

  _set (target, render, content = '') {
    for (const node of target.querySelectorAll(Tonic._tags)) {
      if (!node.isTonicComponent) continue

      const id = node.getAttribute('id')
      if (!id || !Tonic._refIds.includes(id)) continue
      Tonic._states[id] = node.state
    }

    if (render instanceof Tonic.AsyncFunction) {
      return render.call(this).then(content => this._apply(target, content))
    } else if (render instanceof Tonic.AsyncFunctionGenerator) {
      return this._drainIterator(target, render.call(this))
    } else if (render === null) {
      this._apply(target, content)
    } else if (render instanceof Function) {
      this._apply(target, render.call(this) || '')
    }
  }

  _apply (target, content) {
    if (content && content.isTonicTemplate) {
      content = content.rawText
    } else if (typeof content === 'string') {
      content = Tonic.escape(content)
    }

    if (typeof content === 'string') {
      if (this.stylesheet) {
        content = `<style nonce=${Tonic.nonce || ''}>${this.stylesheet()}</style>${content}`
      }

      target.innerHTML = content

      if (this.styles) {
        const styles = this.styles()
        for (const node of target.querySelectorAll('[styles]')) {
          for (const s of node.getAttribute('styles').split(/\s+/)) {
            Object.assign(node.style, styles[s.trim()])
          }
        }
      }

      const children = Tonic._children[this._id] || {}

      const walk = (node, fn) => {
        if (node.nodeType === 3) {
          const id = node.textContent.trim()
          if (children[id]) fn(node, children[id], id)
        }

        const childNodes = node.childNodes
        if (!childNodes) return

        for (let i = 0; i < childNodes.length; i++) {
          walk(childNodes[i], fn)
        }
      }

      walk(target, (node, children, id) => {
        for (const child of children) {
          node.parentNode.insertBefore(child, node)
        }
        delete Tonic._children[this._id][id]
        node.parentNode.removeChild(node)
      })
    } else {
      target.innerHTML = ''
      target.appendChild(content.cloneNode(true))
    }
  }

  connectedCallback () {
    this.root = this.shadowRoot || this // here for back compat

    if (super.id && !Tonic._refIds.includes(super.id)) {
      Tonic._refIds.push(super.id)
    }
    const cc = s => s.replace(/-(.)/g, (_, m) => m.toUpperCase())

    for (const { name: _name, value } of this.attributes) {
      const name = cc(_name)
      const p = this.props[name] = value

      if (/__\w+__\w+__/.test(p)) {
        const { 1: root } = p.split('__')
        this.props[name] = Tonic._data[root][p]
      } else if (/\d+__float/.test(p)) {
        this.props[name] = parseFloat(p, 10)
      } else if (p === 'null__null') {
        this.props[name] = null
      } else if (/\w+__boolean/.test(p)) {
        this.props[name] = p.includes('true')
      } else if (/placehold:\w+:\w+__/.test(p)) {
        const { 1: root } = p.split(':')
        this.props[name] = Tonic._children[root][p][0]
      }
    }

    this.props = Object.assign(
      this.defaults ? this.defaults() : {},
      this.props
    )

    this._id = this._id || Tonic._createId()

    this.willConnect && this.willConnect()

    if (!this.isInDocument(this.root)) return
    if (!this.preventRenderOnReconnect) {
      if (!this._source) {
        this._source = this.innerHTML
      } else {
        this.innerHTML = this._source
      }
      const p = this._set(this.root, this.render)
      if (p && p.then) return p.then(() => this.connected && this.connected())
    }

    this.connected && this.connected()
  }

  isInDocument (target) {
    const root = target.getRootNode()
    return root === document || root.toString() === '[object ShadowRoot]'
  }

  disconnectedCallback () {
    this.disconnected && this.disconnected()
    delete Tonic._data[this._id]
    delete Tonic._children[this._id]
  }
}

Tonic.prototype.isTonicComponent = true

Object.assign(Tonic, {
  _tags: '',
  _refIds: [],
  _data: {},
  _states: {},
  _children: {},
  _reg: {},
  _stylesheetRegistry: [],
  _index: 0,
  version: typeof require !== 'undefined' ? require('./package').version : null,
  SPREAD: /\.\.\.\s?(__\w+__\w+__)/g,
  ESC: /["&'<>`/]/g,
  AsyncFunctionGenerator: async function * () {}.constructor,
  AsyncFunction: async function () {}.constructor,
  MAP: { '"': '&quot;', '&': '&amp;', '\'': '&#x27;', '<': '&lt;', '>': '&gt;', '`': '&#x60;', '/': '&#x2F;' }
})

export default Tonic
