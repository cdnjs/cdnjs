function CodeFlask(indent) {
  this.indent = indent || "    ";
}

CodeFlask.prototype.run = function(selector, opts) {
    var target = document.querySelectorAll(selector);

    if(target.length > 1) {
        throw 'CodeFlask.js ERROR: run() expects only one element, ' +
        target.length + ' given. Use .runAll() instead.';
    } else {
        this.scaffold(target[0], false, opts);
    }
}

CodeFlask.prototype.runAll = function(selector, opts) {
    // Remove update API for bulk rendering
    this.update = null;
    this.onUpdate = null;

    var target = document.querySelectorAll(selector);

    var i;
    for(i=0; i < target.length; i++) {
        this.scaffold(target[i], true, opts);
    }
}

CodeFlask.prototype.scaffold = function(target, isMultiple, opts) {
    var textarea = document.createElement('TEXTAREA'),
        highlightPre = document.createElement('PRE'),
        highlightCode = document.createElement('CODE'),
        initialCode = target.textContent,
        lang;

    if(!opts.enableAutocorrect == true)
    {
        // disable autocorrect and spellcheck features
        textarea.setAttribute('spellcheck', 'false');
        textarea.setAttribute('autocapitalize', 'off');
        textarea.setAttribute('autocomplete', 'off');
        textarea.setAttribute('autocorrect', 'off');
    }

    opts.language = this.handleLanguage(opts.language);

    this.defaultLanguage = target.dataset.language || opts.language || 'markup';


    // Prevent these vars from being refreshed when rendering multiple
    // instances
    if(!isMultiple) {
        this.textarea = textarea;
        this.highlightCode = highlightCode;
    }

    target.classList.add('CodeFlask');
    textarea.classList.add('CodeFlask__textarea');
    highlightPre.classList.add('CodeFlask__pre');
    highlightCode.classList.add('CodeFlask__code');
    highlightCode.classList.add('language-' + this.defaultLanguage);

    // Fixing iOS "drunk-text" issue
    if(/iPad|iPhone|iPod/.test(navigator.platform)) {
        highlightCode.style.paddingLeft = '3px';
    }

    // Appending editor elements to DOM
    target.innerHTML = '';
    target.appendChild(textarea);
    target.appendChild(highlightPre);
    highlightPre.appendChild(highlightCode);

    // Render initial code inside tag
    textarea.value = initialCode;
    this.renderOutput(highlightCode, textarea);

    Prism.highlightAll();

    this.handleInput(textarea, highlightCode, highlightPre);
    this.handleScroll(textarea, highlightPre);

}

CodeFlask.prototype.renderOutput = function(highlightCode, input) {
    highlightCode.innerHTML = input.value.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;") + "\n";
}

CodeFlask.prototype.handleInput = function(textarea, highlightCode, highlightPre) {
    var self = this,
        input,
        selStartPos,
        inputVal,
        roundedScroll,
        currentLineStart,
        indentLength;

    textarea.addEventListener('input', function(e) {
        input = this;

        self.renderOutput(highlightCode, input);

        Prism.highlightAll();
    });

    textarea.addEventListener('keydown', function(e) {
        input = this,
        selStartPos = input.selectionStart,
        inputVal = input.value;
        currentLineStart = selStartPos - input.value.substr(0, selStartPos).split("\n").pop().length;

        // If tab pressed, indent
        if (e.keyCode === 9) {
          e.preventDefault();

          // Allow shift-tab
          if (e.shiftKey) {
            indentLength = self.indent.length;

            // If the current line begins with the indent, unindent
            if (inputVal.substring(currentLineStart, currentLineStart + indentLength) == self.indent) {
              input.value = inputVal.substring(0, currentLineStart) +
                            inputVal.substring(currentLineStart + indentLength, input.value.length);
              input.selectionStart = selStartPos - self.indent.length;
              input.selectionEnd = selStartPos - self.indent.length;
            }
          } else {
            input.value = inputVal.substring(0, selStartPos) + self.indent +
                          inputVal.substring(selStartPos, input.value.length);
            input.selectionStart = selStartPos + self.indent.length;
            input.selectionEnd = selStartPos + self.indent.length;
          }

            highlightCode.innerHTML = input.value.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;") + "\n";
            Prism.highlightAll();
        }
    });
}

CodeFlask.prototype.handleScroll = function(textarea, highlightPre) {
    textarea.addEventListener('scroll', function(){

        roundedScroll = Math.floor(this.scrollTop);

        // Fixes issue of desync text on mouse wheel, fuck Firefox.
        if(navigator.userAgent.toLowerCase().indexOf('firefox') < 0) {
            this.scrollTop = roundedScroll;
        }

        highlightPre.style.top = "-" + roundedScroll + "px";
    });
}

CodeFlask.prototype.handleLanguage = function(lang) {
    if(lang.match(/html|xml|xhtml|svg/)) {
        return 'markup';
    } else  if(lang.match(/js/)) {
        return 'javascript';
    } else {
        return lang;
    }
}

CodeFlask.prototype.onUpdate = function(cb) {
    if(typeof(cb) == "function") {
        this.textarea.addEventListener('input', function(e) {
            cb(this.value);
        });
    }else{
        throw 'CodeFlask.js ERROR: onUpdate() expects function, ' +
        typeof(cb) + ' given instead.';
    }
}

CodeFlask.prototype.update = function(string) {
    var evt = document.createEvent("HTMLEvents");

    this.textarea.value = string;
    this.renderOutput(this.highlightCode, this.textarea);
    Prism.highlightAll();

    evt.initEvent("input", false, true);
    this.textarea.dispatchEvent(evt);
}
