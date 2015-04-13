!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.TinyTerm=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var animation = require('./animation');
var DOM = require('./dom');
var history = require('./history');
var run = require('./run');
var shell = require('./shell');
var util = require('./util');

function TinyTerm (parent) {
  var domNodes;

  this.commands = {
    help: {
      fn: util.help,
      desc: 'Display helpful information about builtin commands.',
    }
  };

  this.indices = {
    loader: 0,
    cmdHistory: -1
  };

  this.loadInterval = null;
  this.cmdHistory = [];
  this.keysDown = {};
  this.flashed = false;

  this.commands.man = this.commands.help;
  this.aliases = {
    'man': true
  };

  domNodes = DOM.init(this, parent);
  Object.keys(domNodes).forEach((function (key) {
    this[key] = domNodes[key];
  }).bind(this));
}

TinyTerm.prototype.startLoading = animation.startLoading;
TinyTerm.prototype.stopLoading = animation.stopLoading;
TinyTerm.prototype.flash = history.flash;
TinyTerm.prototype.historyBack = history.back;
TinyTerm.prototype.historyFwd = history.fwd;
TinyTerm.prototype.focus = util.focus;
TinyTerm.prototype.help = util.help;
TinyTerm.prototype.print = util.print;
TinyTerm.prototype.autocomplete = shell.autocomplete;
TinyTerm.prototype.process = shell.process;
TinyTerm.prototype.register = shell.register;
TinyTerm.prototype.run = run;

module.exports = TinyTerm;

},{"./animation":2,"./dom":3,"./history":4,"./run":5,"./shell":6,"./util":7}],2:[function(require,module,exports){
function loadAnimation (term) {
  term.input.value = loadStates[term.indices.loader++];
  term.indices.loader = term.indices.loader % 4;
}

function startLoading () {
  this.input.disabled = true;
  this.loadInterval = window.setInterval(loadAnimation.bind(null, this), 120);
}

function stopLoading (disabled) {
  if (this.loadInterval) {
    window.clearInterval(this.loadInterval);
    this.loadInterval = null;

    this.input.value = '';
    if (!disabled) {
      this.input.disabled = false;
    }
  }
}

var loadStates = ['/', '-', '\\', '|'];

module.exports = {
	startLoading: startLoading,
	stopLoading: stopLoading
};

},{}],3:[function(require,module,exports){
function clickHandler () {
  if (window.getSelection().toString() === '') {
    this.focus();
  }
}

function inputHandler (e) {
  this.mirrorInner.textContent = this.input.value;
}

function keyDownHandler (e) {
  var key;

  e = e || window.event;
  key = e.keyCode;

  if (key === 9) { // tab
    e.preventDefault();

    if (!this.keysDown[9]) {
      this.autocomplete(this.input.value);
      this.keysDown[9] = true;
    }
  } else if (key === 13 && !(this.keysDown[16] || this.keysDown[18])) {
    e.preventDefault();
    submitHandler.call(this);
  } else if (!this.keysDown[key]) {
    this.keysDown[key] = true;

    if (key === 38) { // up
      this.historyBack();
    } else if (key === 40) { // down
      this.historyFwd();
    }

    if (this.flashed) {
      this.flashed = false;
    }
  }
}

function keyUpHandler (e) {
  var key;

  e = e || window.event;
  key = e.keyCode;

  if (this.keysDown[key]) {
    this.keysDown[key] = false;
  }
}

function submitHandler (e) {
  e = e || window.event;
  if (e) {
    e.preventDefault();
  }

  this.run();
}

function init (term, parent) {
  var fontStyle, fontSize, fontFamily, color, textShadow, charWidth;
  var fontProbe = document.createElement('div');
  var style = document.createElement('style');
  var container = document.createElement('div');
  var form = document.createElement('form');
  var inputContainer = document.createElement('div');
  var mirror = document.createElement('pre');
  var mirrorInner = document.createElement('span');
  var input = document.createElement('textarea');

  container.classList.add('tinyterm');
  inputContainer.classList.add('expander');

  fontProbe.textContent = '>';
  fontProbe.className = 'tinytermFontProbe';

  input.name = 'prompt';
  input.autocomplete = input.autocorrect = input.autocapitalize = 'off';
  input.spellcheck = false;

  mirror.appendChild(mirrorInner);
  mirror.appendChild(document.createElement('br'));
  inputContainer.appendChild(mirror);
  inputContainer.appendChild(input);
  form.appendChild(inputContainer);
  container.appendChild(fontProbe);
  container.appendChild(form);

  if (typeof parent !== 'object' || container.nodeName !== 'DIV') {
    parent = document.body;
  }

  parent.appendChild(container);

  fontStyle = window.getComputedStyle(fontProbe);
  fontSize = fontStyle.getPropertyValue('font-size');
  fontFamily = fontStyle.getPropertyValue('font-family');
  color = fontStyle.getPropertyValue('color');
  textShadow = fontStyle.getPropertyValue('text-shadow');
  fontProbe.style.fontSize = '20em';
  charWidth = fontProbe.offsetWidth / 20;
  container.removeChild(fontProbe);

  document.head.appendChild(style);

  sheet = style.sheet;
  sheet.insertRule('.tinyterm code, .tinyterm pre, .tinyterm textarea {\
    font-size: ' + fontSize + ';\
    font-family: ' + fontFamily + ';\
    color: ' + color + ';\
    text-shadow: ' + textShadow + '\
  }', 0);
  sheet.insertRule('.tinyterm code, .tinyterm .expander {\
    margin-left: ' + charWidth * 2 + 'px\
  }', 0);
  sheet.insertRule('.tinyterm code {\
    text-indent: -' + charWidth * 2 + 'px\
  }', 0);

  container.addEventListener('click', clickHandler.bind(term));
  input.addEventListener('keydown', keyDownHandler.bind(term));
  input.addEventListener('keyup', keyUpHandler.bind(term));
  input.addEventListener('input', inputHandler.bind(term));
  form.addEventListener('submit', submitHandler.bind(term));

  // added verbatim to TinyTerm object
  return {
    container: container,
    form: form,
    input: input,
    mirrorInner: mirrorInner
  };
}

module.exports = {
  init: init
};

},{}],4:[function(require,module,exports){
function back () {
  var newIndex = this.indices.cmdHistory + 1;
  var historyLength = this.cmdHistory.length - 1;

  if (newIndex > historyLength) {
    newIndex = historyLength;
    this.flash(true);
  }

  this.indices.cmdHistory = newIndex;
  this.input.value = this.cmdHistory[newIndex] || '';
}

function fwd () {
  var newIndex = this.indices.cmdHistory - 1;

  if (newIndex < 0) {
    newIndex = -1;
    this.flash(true);
  }

  this.indices.cmdHistory = newIndex;
  this.input.value = this.cmdHistory[newIndex] || '';
}

function flash (allowRepeat) {
  this.container.classList.add('flash');

  window.setTimeout((function () {
    this.container.classList.remove('flash');
  }).bind(this), 84);

  if (!allowRepeat) {
    this.flashed = true;
  }
}

module.exports = {
  back: back,
  fwd: fwd,
  flash: flash
};

},{}],5:[function(require,module,exports){
module.exports = function run (cb) {
  var cmd, out;

  cmd = this.form.prompt.value;
  this.startLoading();

  this.print('>&nbsp;' + cmd);

  this.cmdHistory = [cmd].concat(this.cmdHistory).slice(0, 60);
  this.indices.cmdHistory = -1;
  if (this.flashed) {
    this.flashed = false;
  }

  try {
    out = this.process(cmd);
  } catch (err) {
    out = err.toString();
    // propagate the error
    throw err;
  } finally {
    this.stopLoading();
    this.form.reset();
    this.mirrorInner.textContent = '';
    this.print(out);

    if (typeof cb === 'function') {
      cb();
    }
  }
};

},{}],6:[function(require,module,exports){
function autocomplete (target) {
  // naive
  function narrow (target, vals) {
    return vals.filter(function (val) {
      return !val.indexOf(target);
    });
  }

  var result = [];
  var words, cmd, args;

  if (target === '') {
    this.flash(true);
  } else {
    words = target.split(' ');

    if (words.length === 1 && target.slice(-1) !== ' ') {
      // trying to complete a command
      result = narrow(target, Object.keys(this.commands));
    } else {
      cmd = words[0];

      if (cmd) {
        args = this.commands[cmd].args;

        if (args) {
          result = narrow(words.slice(-1), args);
        }
      }
    }

    switch (result.length) {
      case 0:
        this.flash(true);
        break;
      case 1:
        this.input.value = words.slice(0, -1).concat(result).join(' ') + ' ';
        this.flashed = false;
        break;
      case 2:
        if (this.flashed) {
          this.print('> ' + target);
          this.print(result.join(' '));
        } else {
          this.flash();
        }
    }
  }

  return result;
}

// anything called asynchronously from process() runs in the bg
function process (cmd) {
  var args, out;

  cmd = cmd.split(' ');
  args = cmd.splice(1).filter(function (arg) {
    return arg.charAt(0) !== '-'; // strip options
  });
  // array to string
  cmd = cmd[0];

  if (this.commands[cmd]) {
    return this.commands[cmd].fn.apply(this, args);
  } else {
    return 'Command not found: ' + cmd;
  }
}

function register (name, command) {
  var fn, desc, aliases, args;

  if (typeof name !== 'string') {
    throw 'Must provide a name string to the TinyTerm constructor';
  }
  if (typeof command !== 'object') {
    throw 'Must provide a command object to the TinyTerm constructor';
  }

  fn = command.fn;
  desc = command.desc;
  aliases = command.aliases;
  args = command.args;

  if (typeof fn !== 'function') {
    throw 'command object requires a function "fn" in the TinyTerm constructor';
  }
  if (typeof desc !== 'string') {
    throw 'command object requires a string "desc" in the TinyTerm constructor';
  }

  this.commands[name] = command = {
    fn: fn,
    desc: desc
  };

  if (args && args.constructor === Array) {
    this.commands[name].args = args;
  }

  if (aliases && aliases.constructor === Array) {
    aliases.forEach((function (alias) {
      this.commands[alias] = command;
      this.aliases[alias] = true;
    }).bind(this));
  }
}

module.exports = {
  autocomplete: autocomplete,
  process: process,
  register: register
};

},{}],7:[function(require,module,exports){
function help (cmd) {
  cmd = this.commands[cmd];

  if (cmd) {
    return cmd.desc;
  } else {
    return Object.keys(this.commands).filter((function (key) {
      return !this.aliases[key];
    }).bind(this)).map((function (key) {
      return key + ': ' + this.commands[key].desc;
    }).bind(this));
  }
}

function focus () {
  this.input.focus();
}

function print (str, tag) {
  if (typeof tag !== 'string') {
    tag = 'code';
  }

  // checks for null and undefined
  if (str != null) {
    if (str.constructor === Array) {
      str.forEach(this.print.bind(this));
    } else {
      this.form.insertAdjacentHTML('beforebegin', '<' + tag + '>' + str +
        '</' + tag + '>');
    }
  }

  this.container.scrollTop = this.container.scrollHeight;
  this.focus();
}

module.exports = {
  help: help,
  focus: focus,
  print: print
};

},{}]},{},[1])(1)
});