import { editorCss } from './styles/editor'
import { injectCss } from './styles/injector'
import { defaultCssTheme } from './styles/theme-default'
import { escapeHtml } from './utils/html-escape'
import Prism from 'prismjs'

export default class CodeFlask {
  constructor (selectorOrElement, opts) {
    if (!selectorOrElement) {
      // If no selector or element is passed to CodeFlask,
      // stop execution and throw error.
      throw Error('CodeFlask expects a parameter which is Element or a String selector')
    }

    if (!opts) {
      // If no selector or element is passed to CodeFlask,
      // stop execution and throw error.
      throw Error('CodeFlask expects an object containing options as second parameter')
    }

    if (selectorOrElement.nodeType) {
      // If it is an element, assign it directly
      this.editorRoot = selectorOrElement
    } else {
      // If it is a selector, tries to find element
      const editorRoot = document.querySelector(selectorOrElement)

      // If an element is found using this selector,
      // assign this element as the root element
      if (editorRoot) {
        this.editorRoot = editorRoot
      }
    }

    this.opts = opts
    this.startEditor()
  }

  startEditor () {
    const isCSSInjected = injectCss(editorCss, null, this.opts.styleParent)

    if (!isCSSInjected) {
      throw Error('Failed to inject CodeFlask CSS.')
    }

    // The order matters (pre > code). Don't change it
    // or things are going to break.
    this.createWrapper()
    this.createTextarea()
    this.createPre()
    this.createCode()

    this.runOptions()
    this.listenTextarea()
    this.populateDefault()
    this.updateCode(this.code)
  }

  createWrapper () {
    this.code = this.editorRoot.innerHTML
    this.editorRoot.innerHTML = ''
    this.elWrapper = this.createElement('div', this.editorRoot)
    this.elWrapper.classList.add('codeflask')
  }

  createTextarea () {
    this.elTextarea = this.createElement('textarea', this.elWrapper)
    this.elTextarea.classList.add('codeflask__textarea', 'codeflask__flatten')
  }

  createPre () {
    this.elPre = this.createElement('pre', this.elWrapper)
    this.elPre.classList.add('codeflask__pre', 'codeflask__flatten')
  }

  createCode () {
    this.elCode = this.createElement('code', this.elPre)
    this.elCode.classList.add('codeflask__code', `language-${this.opts.language || 'html'}`)
  }

  createLineNumbers () {
    this.elLineNumbers = this.createElement('div', this.elWrapper)
    this.elLineNumbers.classList.add('codeflask__lines')
    this.setLineNumber()
  }

  createElement (elementTag, whereToAppend) {
    const element = document.createElement(elementTag)
    whereToAppend.appendChild(element)

    return element
  }

  runOptions () {
    this.opts.rtl = this.opts.rtl || false
    this.opts.tabSize = this.opts.tabSize || 2
    this.opts.enableAutocorrect = this.opts.enableAutocorrect || false
    this.opts.lineNumbers = this.opts.lineNumbers || false
    this.opts.defaultTheme = this.opts.defaultTheme !== false
    this.opts.areaId = this.opts.areaId || null
    this.opts.ariaLabelledby = this.opts.ariaLabelledby || null
    this.opts.readonly = this.opts.readonly || null

    // if handleTabs is not either true or false, make it true by default
    if (typeof this.opts.handleTabs !== 'boolean') {
      this.opts.handleTabs = true
    }
    // if handleTabs is not either true or false, make it true by default
    if (typeof this.opts.handleSelfClosingCharacters !== 'boolean') {
      this.opts.handleSelfClosingCharacters = true
    }
    // if handleTabs is not either true or false, make it true by default
    if (typeof this.opts.handleNewLineIndentation !== 'boolean') {
      this.opts.handleNewLineIndentation = true
    }

    if (this.opts.rtl === true) {
      this.elTextarea.setAttribute('dir', 'rtl')
      this.elPre.setAttribute('dir', 'rtl')
    }

    if (this.opts.enableAutocorrect === false) {
      this.elTextarea.setAttribute('spellcheck', 'false')
      this.elTextarea.setAttribute('autocapitalize', 'off')
      this.elTextarea.setAttribute('autocomplete', 'off')
      this.elTextarea.setAttribute('autocorrect', 'off')
    }

    if (this.opts.lineNumbers) {
      this.elWrapper.classList.add('codeflask--has-line-numbers')
      this.createLineNumbers()
    }

    if (this.opts.defaultTheme) {
      injectCss(defaultCssTheme, 'theme-default', this.opts.styleParent)
    }

    if (this.opts.areaId) {
      this.elTextarea.setAttribute('id', this.opts.areaId)
    }

    if (this.opts.ariaLabelledby) {
      this.elTextarea.setAttribute('aria-labelledby', this.opts.ariaLabelledby)
    }

    if (this.opts.readonly) {
      this.enableReadonlyMode()
    }
  }

  updateLineNumbersCount () {
    let numberList = ''

    for (let i = 1; i <= this.lineNumber; i++) {
      numberList = numberList + `<span class="codeflask__lines__line">${i}</span>`
    }

    this.elLineNumbers.innerHTML = numberList
  }

  listenTextarea () {
    this.elTextarea.addEventListener('input', (e) => {
      this.code = e.target.value
      this.elCode.innerHTML = escapeHtml(e.target.value)
      this.highlight()
      setTimeout(() => {
        this.runUpdate()
        this.setLineNumber()
      }, 1)
    })

    this.elTextarea.addEventListener('keydown', (e) => {
      this.handleTabs(e)
      this.handleSelfClosingCharacters(e)
      this.handleNewLineIndentation(e)
    })

    this.elTextarea.addEventListener('scroll', (e) => {
      this.elPre.style.transform = `translate3d(-${e.target.scrollLeft}px, -${e.target.scrollTop}px, 0)`
      if (this.elLineNumbers) {
        this.elLineNumbers.style.transform = `translate3d(0, -${e.target.scrollTop}px, 0)`
      }
    })
  }

  handleTabs (e) {
    if (this.opts.handleTabs) {
      if (e.keyCode !== 9) {
        return
      }
      e.preventDefault()

      var input = this.elTextarea
      var selectionDir = input.selectionDirection
      var selStartPos = input.selectionStart
      var selEndPos = input.selectionEnd
      var inputVal = input.value

      var beforeSelection = inputVal.substr(0, selStartPos)
      var selectionVal = inputVal.substring(selStartPos, selEndPos)
      var afterSelection = inputVal.substring(selEndPos)
      const indent = ' '.repeat(this.opts.tabSize)

      if (selStartPos !== selEndPos && selectionVal.length >= indent.length) {
        var currentLineStart = selStartPos - beforeSelection.split('\n').pop().length
        var startIndentLen = indent.length
        var endIndentLen = indent.length

        // Unindent
        if (e.shiftKey) {
          var currentLineStartStr = inputVal.substr(currentLineStart, indent.length)
          // Line start whit indent
          if (currentLineStartStr === indent) {
            startIndentLen = -startIndentLen

            if (currentLineStart > selStartPos) {
              // Indent is in selection
              selectionVal = selectionVal.substring(0, currentLineStart) + selectionVal.substring(currentLineStart + indent.length)
              endIndentLen = 0
            } else if (currentLineStart === selStartPos) {
              // Indent is in start of selection
              startIndentLen = 0
              endIndentLen = 0
              selectionVal = selectionVal.substring(indent.length)
            } else {
              // Indent is before selection
              endIndentLen = -endIndentLen
              beforeSelection = beforeSelection.substring(0, currentLineStart) + beforeSelection.substring(currentLineStart + indent.length)
            }
          } else {
            startIndentLen = 0
            endIndentLen = 0
          }

          selectionVal = selectionVal.replace(new RegExp('\n' + indent.split('').join('\\'), 'g'), '\n')
        } else {
          // Indent
          beforeSelection = beforeSelection.substr(0, currentLineStart) + indent + beforeSelection.substring(currentLineStart, selStartPos)
          selectionVal = selectionVal.replace(/\n/g, '\n' + indent)
        }

        // Set new indented value
        input.value = beforeSelection + selectionVal + afterSelection

        input.selectionStart = selStartPos + startIndentLen
        input.selectionEnd = selStartPos + selectionVal.length + endIndentLen
        input.selectionDirection = selectionDir
      } else {
        input.value = beforeSelection + indent + afterSelection
        input.selectionStart = selStartPos + indent.length
        input.selectionEnd = selStartPos + indent.length
      }

      var newCode = input.value
      this.updateCode(newCode)
      this.elTextarea.selectionEnd = selEndPos + this.opts.tabSize
    }
  }

  handleSelfClosingCharacters (e) {
    if (!this.opts.handleSelfClosingCharacters) return
    const openChars = ['(', '[', '{', '<', '\'', '"']
    const closeChars = [')', ']', '}', '>', '\'', '"']
    const key = e.key

    if (!openChars.includes(key) && !closeChars.includes(key)) {
      return
    }

    switch (key) {
      case '(':
      case ')':
        this.closeCharacter(key)
        break

      case '[':
      case ']':
        this.closeCharacter(key)
        break

      case '{':
      case '}':
        this.closeCharacter(key)
        break

      case '<':
      case '>':
        this.closeCharacter(key)
        break

      case '\'':
        this.closeCharacter(key)
        break

      case '"':
        this.closeCharacter(key)
        break
    }
  }

  setLineNumber () {
    this.lineNumber = this.code.split('\n').length

    if (this.opts.lineNumbers) {
      this.updateLineNumbersCount()
    }
  }

  handleNewLineIndentation (e) {
    if (!this.opts.handleNewLineIndentation) return
    if (e.keyCode !== 13) {
      return
    }

    e.preventDefault()
    var input = this.elTextarea
    var selStartPos = input.selectionStart
    var selEndPos = input.selectionEnd
    var inputVal = input.value

    var beforeSelection = inputVal.substr(0, selStartPos)
    var afterSelection = inputVal.substring(selEndPos)

    var lineStart = inputVal.lastIndexOf('\n', selStartPos - 1)
    var spaceLast = lineStart + inputVal.slice(lineStart + 1).search(/[^ ]|$/)
    var indent = (spaceLast > lineStart) ? (spaceLast - lineStart) : 0
    var newCode = beforeSelection + '\n' + ' '.repeat(indent) + afterSelection

    input.value = newCode
    input.selectionStart = selStartPos + indent + 1
    input.selectionEnd = selStartPos + indent + 1

    this.updateCode(input.value)
  }

  closeCharacter (char) {
    const selectionStart = this.elTextarea.selectionStart
    const selectionEnd = this.elTextarea.selectionEnd

    if (!this.skipCloseChar(char)) {
      let closeChar = char
      switch (char) {
        case '(':
          closeChar = String.fromCharCode(char.charCodeAt() + 1)
          break
        case '<':
        case '{':
        case '[':
          closeChar = String.fromCharCode(char.charCodeAt() + 2)
          break
      }
      const selectionText = this.code.substring(selectionStart, selectionEnd)
      const newCode = `${this.code.substring(0, selectionStart)}${selectionText}${closeChar}${this.code.substring(selectionEnd)}`
      this.updateCode(newCode)
    } else {
      const skipChar = this.code.substr(selectionEnd, 1) === char
      const newSelectionEnd = skipChar ? selectionEnd + 1 : selectionEnd
      const closeChar = !skipChar && ['\'', '"'].includes(char) ? char : ''
      const newCode = `${this.code.substring(0, selectionStart)}${closeChar}${this.code.substring(newSelectionEnd)}`
      this.updateCode(newCode)
      this.elTextarea.selectionEnd = ++this.elTextarea.selectionStart
    }

    this.elTextarea.selectionEnd = selectionStart
  }

  skipCloseChar (char) {
    const selectionStart = this.elTextarea.selectionStart
    const selectionEnd = this.elTextarea.selectionEnd
    const hasSelection = Math.abs(selectionEnd - selectionStart) > 0
    return [')', '}', ']', '>'].includes(char) || (['\'', '"'].includes(char) && !hasSelection)
  }

  updateCode (newCode) {
    this.code = newCode
    this.elTextarea.value = newCode
    this.elCode.innerHTML = escapeHtml(newCode)
    this.highlight()
    this.setLineNumber()
    setTimeout(this.runUpdate.bind(this), 1)
  }

  updateLanguage (newLanguage) {
    const oldLanguage = this.opts.language
    this.elCode.classList.remove(`language-${oldLanguage}`)
    this.elCode.classList.add(`language-${newLanguage}`)
    this.opts.language = newLanguage
    this.highlight()
  }

  addLanguage (name, options) {
    Prism.languages[name] = options
  }

  populateDefault () {
    this.updateCode(this.code)
  }

  highlight () {
    Prism.highlightElement(this.elCode, false)
  }

  onUpdate (callback) {
    if (callback && {}.toString.call(callback) !== '[object Function]') {
      throw Error('CodeFlask expects callback of type Function')
    }

    this.updateCallBack = callback
  }

  getCode () {
    return this.code
  }

  runUpdate () {
    if (this.updateCallBack) {
      this.updateCallBack(this.code)
    }
  }

  enableReadonlyMode () {
    this.elTextarea.setAttribute('readonly', true)
  }

  disableReadonlyMode () {
    this.elTextarea.removeAttribute('readonly')
  }
}
