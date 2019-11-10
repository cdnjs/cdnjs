(function(global, factory) {
    if (typeof exports === 'object' && typeof module == "object") { // CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) { // AMD
        define([], factory);
    } else { // Browser
        global.CodeFlask = factory();
    }
})(this, function() {

function CodeFlask(indent) {
    this.indent = indent || "    ";
    this.docroot = document;
}

CodeFlask.isString = function(x) {
    return Object.prototype.toString.call(x) === "[object String]";
}

CodeFlask.prototype.run = function(selector, opts) {
    var target = CodeFlask.isString(selector) ? this.docroot.querySelectorAll(selector) : [selector];
    opts = opts || {};

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

    var target = CodeFlask.isString(selector) ? this.docroot.querySelectorAll(selector) : selector;

    var i;
    for(i=0; i < target.length; i++) {
        this.scaffold(target[i], true, opts);
    }
    
    // Add the MutationObserver below for each one of the textAreas so we can listen
    // to when the dir attribute has been changed and also return the placeholder
    // dir attribute with it so it reflects the changes made to the textarea.
    var textAreas = this.docroot.getElementsByClassName("CodeFlask__textarea");
    for(var i = 0; i < textAreas.length; i++)
    {
      window.MutationObserver = window.MutationObserver
         || window.WebKitMutationObserver
         || window.MozMutationObserver;

      var target = textAreas[i];

      observer = new MutationObserver(function(mutation) {
        var textAreas = this.docroot.getElementsByClassName("CodeFlask__textarea");
          for(var i = 0; i < textAreas.length; i++)
           {
            // If the text direction values are different set them
            if(textAreas[i].nextSibling.getAttribute("dir") != textAreas[i].getAttribute("dir")){
                textAreas[i].nextSibling.setAttribute("dir", textAreas[i].getAttribute("dir"));
            }
           }
      }),
      config = {
         attributes: true,
         attributeFilter : ['dir']
      };
      observer.observe(target, config);
    }
}

CodeFlask.prototype.scaffold = function(target, isMultiple, opts) {
    var textarea = document.createElement('TEXTAREA'),
        highlightPre = document.createElement('PRE'),
        highlightCode = document.createElement('CODE'),
        initialCode = target.textContent,
        lang;

    if(opts && !opts.enableAutocorrect)
    {
        // disable autocorrect and spellcheck features
        textarea.setAttribute('spellcheck', 'false');
        textarea.setAttribute('autocapitalize', 'off');
        textarea.setAttribute('autocomplete', 'off');
        textarea.setAttribute('autocorrect', 'off');
    }
  
    if(opts)
    {
      lang = this.handleLanguage(opts.language || 'html');
    }

    this.defaultLanguage = target.dataset.language || lang || 'markup';


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
    
    // If RTL add the text-align attribute
    if(opts.rtl == true){
        textarea.setAttribute("dir", "rtl")
        highlightPre.setAttribute("dir", "rtl")
    }

    if(opts.lineNumbers) {
        highlightPre.classList.add('line-numbers');
        highlightPre.classList.add('CodeFlask__pre_line-numbers');
        highlightCode.classList.add('CodeFlask__code_line-numbers');
        textarea.classList.add('CodeFlask__textarea_line-numbers')
    }
    
    // Appending editor elements to DOM
    target.innerHTML = '';
    target.appendChild(textarea);
    target.appendChild(highlightPre);
    highlightPre.appendChild(highlightCode);

    // Render initial code inside tag
    textarea.value = initialCode;
    this.renderOutput(highlightCode, textarea);

    this.highlight(highlightCode);

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
        
        input.value = input.value.replace(/\t/g, self.indent);

        self.renderOutput(highlightCode, input);

        self.highlight(highlightCode);
    });

    textarea.addEventListener('keydown', function(e) {
        // If tab pressed, indent
        if (e.keyCode === 9) {
            e.preventDefault();
            var input   = this,
            selectionDir = input.selectionDirection,
            selStartPos = input.selectionStart,
            selEndPos   = input.selectionEnd,
            inputVal    = input.value;

            var beforeSelection = inputVal.substr(0, selStartPos),
            selectionVal        = inputVal.substring(selStartPos, selEndPos),
            afterSelection      = inputVal.substring(selEndPos);

            if (selStartPos !== selEndPos && selectionVal.length >= self.indent.length) {


                var currentLineStart = selStartPos - beforeSelection.split('\n').pop().length,
                startIndentLen  = self.indent.length,
                endIndentLen    = self.indent.length;

                //Unindent
                if (e.shiftKey) {
                    var currentLineStartStr = inputVal.substr(currentLineStart, self.indent.length);
                    //Line start whit indent
                    if (currentLineStartStr === self.indent) {

                        startIndentLen = -startIndentLen;

                        //Indent is in selection
                        if (currentLineStart > selStartPos) {
                            selectionVal = selectionVal.substring(0, currentLineStart) + selectionVal.substring(currentLineStart+self.indent.length);
                            endIndentLen = 0;
                        }
                        //Indent is in start of selection
                        else if (currentLineStart == selStartPos) {
                            startIndentLen = 0;
                            endIndentLen = 0;
                            selectionVal = selectionVal.substring(self.indent.length);
                        }
                        //Indent is before selection
                        else {
                            endIndentLen = -endIndentLen;
                            beforeSelection = beforeSelection.substring(0, currentLineStart) + beforeSelection.substring(currentLineStart+self.indent.length);
                        }

                    }
                    else{
                        startIndentLen = 0;
                        endIndentLen = 0;
                    }

                    selectionVal = selectionVal.replace(new RegExp('\n'+self.indent.split('').join('\\'), 'g'), '\n');          
                } 
                //Indent
                else {
                    beforeSelection = beforeSelection.substr(0, currentLineStart)+self.indent+beforeSelection.substring(currentLineStart, selStartPos);
                    selectionVal = selectionVal.replace(/\n/g, '\n'+self.indent);           
                }

                //Set new indented value
                input.value = beforeSelection+selectionVal+afterSelection;

                input.selectionStart        = selStartPos+startIndentLen;
                input.selectionEnd          = selStartPos+selectionVal.length+endIndentLen;
                input.selectionDirection    = selectionDir;
            
            }
            else{
                input.value             = beforeSelection+self.indent+afterSelection;
                input.selectionStart    = selStartPos+self.indent.length;
                input.selectionEnd      = selStartPos+self.indent.length;
            }
            
            self.renderOutput(highlightCode, input);
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

        highlightPre.scrollTop = roundedScroll;
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
    this.highlight(this.highlightCode);

    evt.initEvent("input", false, true);
    this.textarea.dispatchEvent(evt);
}

CodeFlask.prototype.highlight = function(highlightCode) {
    // Support both globally present Prism.js, and loading from module
    var Prism = window.Prism || require('prismjs')
    Prism.highlightElement(highlightCode);
}

return CodeFlask;
});
