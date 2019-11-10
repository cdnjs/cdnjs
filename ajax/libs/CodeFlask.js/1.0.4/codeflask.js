import { editor_css } from './styles/editor';
import { inject_css } from './styles/injector';
import { default_css_theme, FONT_SIZE } from './styles/theme-default';
import { escape_html } from './utils/html-escape';
import Prism from 'prismjs';

export default class CodeFlask {
  constructor(selectorOrElement, opts) {
    if (!selectorOrElement) {
      // If no selector or element is passed to CodeFlask,
      // stop execution and throw error.
      throw Error('CodeFlask expects a parameter which is Element or a String selector');
      return;
    }

    if (!opts) {
      // If no selector or element is passed to CodeFlask,
      // stop execution and throw error.
      throw Error('CodeFlask expects an object containing options as second parameter');
      return;
    }

    if (selectorOrElement.nodeType) {
      // If it is an element, assign it directly
      this.editorRoot = selectorOrElement;
    } else {
      // If it is a selector, tries to find element
      const editorRoot = document.querySelector(selectorOrElement);

      // If an element is found using this selector,
      // assign this element as the root element
      if (editorRoot) {
        this.editorRoot = editorRoot;
      }
    }

    this.opts = opts;
    this.startEditor();
  }

  startEditor() {
    const isCSSInjected = inject_css(editor_css);
    
    if (!isCSSInjected) {
      throw Error('Failed to inject CodeFlask CSS.');
      return;
    }

    // The order matters (pre > code). Don't change it
    // or things are going to break.
    this.createWrapper();
    this.createTextarea();
    this.createPre();
    this.createCode();

    this.runOptions();
    this.listenTextarea();
    this.populateDefault();
    this.updateCode(this.code);
  }

  createWrapper() {
    this.code = this.editorRoot.innerHTML;
    this.editorRoot.innerHTML = '';
    this.elWrapper = this.createElement('div', this.editorRoot);
    this.elWrapper.classList.add('codeflask');
  }

  createTextarea() {
    this.elTextarea = this.createElement('textarea', this.elWrapper);
    this.elTextarea.classList.add('codeflask__textarea', 'codeflask__flatten');
  }

  createPre() {
    this.elPre = this.createElement('pre', this.elWrapper);
    this.elPre.classList.add('codeflask__pre', 'codeflask__flatten');
  }

  createCode() {
    this.elCode = this.createElement('code', this.elPre);
    this.elCode.classList.add('codeflask__code', `language-${this.opts.language || 'html'}`);
  }

  createLineNumbers() {
    this.elLineNumbers = this.createElement('div', this.elWrapper);
    this.elLineNumbers.classList.add('codeflask__lines');
    this.setLineNumber();
  }

  createElement(elementTag, whereToAppend) {
    const element = document.createElement(elementTag);
    whereToAppend.appendChild(element);

    return element;
  }

  runOptions() {
    this.opts.rtl = this.opts.rtl || false;
    this.opts.tabSize = this.opts.tabSize || 2;
    this.opts.enableAutocorrect = this.opts.enableAutocorrect || false;
    this.opts.lineNumbers = this.opts.lineNumbers || false;
    this.opts.defaultTheme = this.opts.defaultTheme || true;

    if (this.opts.rtl === true) {
      this.elTextarea.setAttribute('dir', 'rtl');
      this.elPre.setAttribute('dir', 'rtl');
    }

    if (this.opts.enableAutocorrect === false) {
      this.elTextarea.setAttribute('spellcheck', 'false');
      this.elTextarea.setAttribute('autocapitalize', 'off');
      this.elTextarea.setAttribute('autocomplete', 'off');
      this.elTextarea.setAttribute('autocorrect', 'off');
    }

    if (this.opts.lineNumbers) {
      this.elWrapper.classList.add('codeflask--has-line-numbers');
      this.createLineNumbers();
    }

    if (this.opts.defaultTheme) {
      inject_css(default_css_theme, 'theme-default');
    }
  }

  updateLineNumbersCount() {
    let numberList = '';

    for (let i = 1; i <= this.lineNumber; i++) {
      numberList = numberList + `<span class="codeflask__lines__line">${i}</span>`;
    }

    this.elLineNumbers.innerHTML = numberList;
  }

  listenTextarea() {
    this.elTextarea.addEventListener('input', (e) => {
      this.code = e.target.value;
      this.elCode.innerHTML = escape_html(e.target.value);
      this.highlight();
      setTimeout(() => {
        this.runUpdate();
        this.setLineNumber();
      }, 1);

    });

    this.elTextarea.addEventListener('keydown', (e) => {
      this.handleTabs(e);
      this.handleSelfClosingCharacters(e);
      this.handleNewLineIndentation(e);
    });

    this.elTextarea.addEventListener('scroll', (e) => {
      this.elPre.style.transform = `translate3d(-${e.target.scrollLeft}px, -${e.target.scrollTop}px, 0)`;
      this.elLineNumbers.style.transform = `translate3d(0, -${e.target.scrollTop}px, 0)`;
    });
  }

  handleTabs(e) {
    if (e.keyCode !== 9) {
      return;
    }
    e.preventDefault();

    const tabCode = 9;
    const pressedCode = e.keyCode;
    const selectionStart = this.elTextarea.selectionStart;
    const selectionEnd = this.elTextarea.selectionEnd;
    const newCode = `${this.code.substring(0, selectionStart)}${' '.repeat(this.opts.tabSize)}${this.code.substring(selectionEnd)}`;

    this.updateCode(newCode);
    this.elTextarea.selectionEnd = selectionEnd + this.opts.tabSize;
  }

  handleSelfClosingCharacters(e) {
    const openChars = ['(', '[', '{', '<'];
    const key = e.key;

    if (!openChars.includes(key)) {
      return;
    }

    switch(key) {
      case '(':
      this.closeCharacter(')');
      break;

      case '[':
      this.closeCharacter(']');
      break;

      case '{':
      this.closeCharacter('}');
      break;

      case '<':
      this.closeCharacter('>');
      break;
    }
  }

  setLineNumber() {
    this.lineNumber = this.code.split('\n').length;
    console.log(this.lineNumber);

    if (this.opts.lineNumbers) {
      this.updateLineNumbersCount();
    }
  }

  handleNewLineIndentation(e) {
    if (e.keyCode !== 13) {
      return;
    };

    // TODO: Make this shit work right

    // const selectionStart = this.elTextarea.selectionStart;
    // const selectionEnd = this.elTextarea.selectionEnd;
    // const allLines = this.code.split('\n').length;
    // const lines = this.code.substring(0, selectionStart).split('\n');
    // const currentLine = lines.length;
    // const lastLine = lines[currentLine - 1];

    // console.log(currentLine, allLines);

    // if (lastLine !== undefined && currentLine < allLines) {
    //   e.preventDefault();
    //   const spaces = lastLine.match(/^ {1,}/);

    //   if (spaces) {
    //     console.log(spaces[0].length);
    //     const newCode = `${this.code.substring(0, selectionStart)}\n${' '.repeat(spaces[0].length)}${this.code.substring(selectionEnd)}`;
    //     this.updateCode(newCode);
    //     setTimeout(() => {
    //       this.elTextarea.selectionEnd = selectionEnd + spaces[0].length + 1;
    //     }, 0);
    //   }
    // }
  }

  closeCharacter(closeChar) {
    const selectionStart = this.elTextarea.selectionStart;
    const selectionEnd = this.elTextarea.selectionEnd;
    const newCode = `${this.code.substring(0, selectionStart)}${closeChar}${this.code.substring(selectionEnd)}`;

    this.updateCode(newCode);
    this.elTextarea.selectionEnd = selectionEnd;
  }

  updateCode(newCode) {
    this.code = newCode;
    this.elTextarea.value = newCode;
    this.elCode.innerHTML = escape_html(newCode);
    this.highlight();
    setTimeout(this.runUpdate, 1);
  }

  updateLanguage(newLanguage) {
    const oldLanguage = this.opts.language;
    this.elCode.classList.remove(`language-${oldLanguage}`);
    this.elCode.classList.add(`language-${newLanguage}`);
    this.opts.language = newLanguage;
    this.highlight();
  }

  addLanguage(name, options) {
    Prism.languages[name] = options;
  }

  populateDefault() {
    this.updateCode(this.code);
  }

  highlight() {
    Prism.highlightElement(this.elCode, false);
  }

  onUpdate(callback) {
    if (callback && {}.toString.call(callback) !== '[object Function]') {
      throw Error('CodeFlask expects callback of type Function');
      return;
    }

    this.updateCallBack = callback;
  }

  getCode() {
    return this.code;
  }

  runUpdate() {
    if (this.updateCallBack) {
      this.updateCallBack(this.code);
    }
  }
}