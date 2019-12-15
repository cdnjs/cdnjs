/*
 * jQuery Spellchecker - v0.1.0 - 2012-10-20
 * https://github.com/badsyntax/jquery-spellchecker
 * Copyright (c) 2012 Richard Willis; Licensed MIT
 */

(function(window, $) {

  /* Config
   *************************/

  var defaultConfig = {
    lang: 'en',
    engine: {
      path: 'spellchecker.php',
      driver: 'PSpell'
    },
    local: {
      requestError: 'There was an error processing the request.',
      ignoreWord: 'Ignore word',
      ignoreAll: 'Ignore all',
      ignoreForever: 'Add to dictionary',
      loading: 'Loading...'
    },
    suggestBox: {
      numWords: 5,
      position: 'above',
      offset: 2
    },
    incorrectWords: {
      container: 'body' //selector
    }
  };

  var pluginName = 'spellchecker';

  /* Util
   *************************/

  if (!Function.prototype.bind) {
    Function.prototype.bind = function(scope) {
      return $.proxy(this, scope);
    };
  }

  var inherits = function(_sub, _super) {
    function F() {}
    F.prototype = _super.prototype;
    _sub.prototype = new F();
    _sub.prototype.constructor = _sub;
  };

  /* Events
   *************************/

  var Events = function(){
    this._handlers = {};
  };

  Events.prototype = {
    on: function(name, handler) {
      if (!this._handlers[name]) {
        this._handlers[name] = $.Callbacks();
      }
      this._handlers[name].add(handler);
    },
    trigger: function(name) {
      if (this._handlers[name]) {
        var args = Array.prototype.slice.call(arguments, 1);
        this._handlers[name].fireWith(this, args);
      }
    },
    handler: function(name) {
      return function(e) {
        this.trigger(name, e);
      }.bind(this);
    }
  };

  /* Base box
   *************************/

  var Box = function(config) {
    Events.call(this);
    this.config = config;
    this.createBox();
    this.bindEvents();
  };
  inherits(Box, Events);

  Box.prototype.onSelectWord = function(e) {

    e.stopPropagation();

    var element = $(e.currentTarget);
    var word = $.trim(element.text());

    this.trigger('select.word', e, word, element);
  };

  /* Incorrect words box
   *************************/

  var IncorrectWordsBox = function(config) {
    Box.apply(this, arguments);
  };
  inherits(IncorrectWordsBox, Box);

  IncorrectWordsBox.prototype.bindEvents = function() {
    this.container.on('click', 'a', this.onSelectWord.bind(this));
  };

  IncorrectWordsBox.prototype.createBox = function() {
    this.container = $([
      '<div class="' + pluginName + '-incorrectwords">',
      '</div>'
    ].join('')).appendTo(this.config.incorrectWords.container);
  };

  IncorrectWordsBox.prototype.addWords = function(words) {

    // Make array values unique
    words = $.grep(words, function(el, index){
        return index === $.inArray(el, words);
    });

    var html = $.map(words, function(word) {
      return '<a href="#">' + word + '</a>';
    }).join('');

    this.container.html(html).show();
  };

  IncorrectWordsBox.prototype.loading = function(show) {
    this.container.html(show ? this.config.local.loading : '');
  };

  /* Incorrect words inline
   *************************/

  var IncorrectWordsInline = function(config, parser, element) {
    Events.call(this);
    this.config = config;
    this.parser = parser;
    this.element = element;
    this.bindEvents();
  };
  inherits(IncorrectWordsInline, Events);

  IncorrectWordsInline.prototype.bindEvents = function() {
    this.element.on('click', '.' + pluginName + '-word-highlight', this.onSelectWord.bind(this));
  };

  IncorrectWordsInline.prototype.addWords = function(words) {
    var highlighted = this.parser.highlightWords(words);
    this.element.html(highlighted);
  };

  IncorrectWordsInline.prototype.loading = function() {};

  IncorrectWordsInline.prototype.onSelectWord = function(e) {

    e.preventDefault();
    e.stopPropagation();

    var element = $(e.currentTarget);
    var word = $.trim(element.data('word'));

    this.trigger('select.word', e, word, element);
  };

  /* Suggest box
   *************************/

  var SuggestBox = function(config, element) {
    this.element = element;
    this.body = this.element[0].nodeName === 'BODY' ? this.element : 'body';
    Box.apply(this, arguments);
  };
  inherits(SuggestBox, Box);

  SuggestBox.prototype.bindEvents = function() {
    var click = 'click.' + pluginName;
    this.container.on(click, this.onContainerClick.bind(this));
    this.container.on(click, '.ignore-word', this.handler('ignore.word'));
    this.container.on(click, '.ignore-all', this.handler('ignore.all'));
    this.container.on(click, '.ignore-forever', this.handler('ignore.forever'));
    this.container.on(click, '.words a', this.onSelectWord.bind(this));
    $('html').on(click, this.onWindowClick.bind(this));
    if (this.element[0].nodeName === 'BODY') {
      this.element.parent().on(click, this.onWindowClick.bind(this));
    }
  };

  SuggestBox.prototype.createBox = function() {

    var local = this.config.local;

    this.container = $([
      '<div class="' + pluginName + '-suggestbox">',
      ' <div class="footer">',
      '   <a href="#" class="ignore-word">' + local.ignoreWord + '</a>',
      '   <a href="#" class="ignore-all">' + local.ignoreAll + '</a>',
      '   <a href="#" class="ignore-forever">' + local.ignoreForever + '</a>',
      ' </div>',
      '</div>'
    ].join('')).appendTo(this.body);

    this.words = $([
      '<div class="words">',
      '</div>'
    ].join('')).prependTo(this.container);

    this.loadingMsg = $([
      '<div class="loading">',
      this.config.local.loading,
      '</div>'
    ].join(''));

    this.footer = this.container.find('.footer').hide();
  };

  SuggestBox.prototype.addWords = function(words) {

    var html = $.map(words, function(word) {
      return '<a href="#">' + word + '</a>';
    }).slice(0, this.config.suggestBox.numWords).join('');

    if (!html) {
      html = '<em>(No suggestions)</em>';
    }

    this.words.html(html);
  };

  SuggestBox.prototype.loadSuggestedWords = function(getWords, word, wordElement) {

    this.wordElement = $(wordElement);
    this.loading(true);

    getWords(word, this.onGetWords.bind(this));
  };

  SuggestBox.prototype.loading = function(show) {
    this.footer.hide();
    this.open();
    this.words.html(show ? this.loadingMsg : '');
    this.position();
  };

  SuggestBox.prototype.position = function() {

    var win = $(window);
    var element = this.wordElement.data('firstElement') || this.wordElement;
    var offset = element.offset();
    var boxOffset = this.config.suggestBox.offset;
    var containerHeight = this.container.outerHeight();

    var positionAbove = (offset.top - containerHeight - boxOffset);
    var positionBelow = (offset.top + element.outerHeight() + boxOffset);

    var left = offset.left;
    var top;

    if (this.config.suggestBox.position === 'below') {
      top = positionBelow;
      if (win.height() + win.scrollTop() < positionBelow + containerHeight) {
        top = positionAbove;
      }
    } else {
      top = positionAbove;
    }

    this.container.css({ top: top, left: left });
  };

  SuggestBox.prototype.open = function() {
    this.position();
    this.container.fadeIn(180);
  };

  SuggestBox.prototype.close = function() {
    this.container.fadeOut(100, function(){
      this.footer.hide();
    }.bind(this));
  };

  SuggestBox.prototype.detach = function() {
    this.container = this.container.detach();
  };

  SuggestBox.prototype.reattach = function() {
    this.container.appendTo(this.body);
  };

  SuggestBox.prototype.onGetWords = function(words) {
    this.loading(false);
    this.addWords(words);
    this.footer.show();
    this.position();
  };

  SuggestBox.prototype.onContainerClick = function(e) {
    e.stopPropagation();
  };

  SuggestBox.prototype.onWindowClick = function(e) {
    this.close();
  };

  /* Spellchecker engine
   *************************/

  var Engine = function(config) {

    this.config = config;

    this.defaultConfig = {
      url: config.engine.path,
      type: 'POST',
      dataType: 'json',
      cache: false,
      data: {
        lang: config.lang,
        driver: config.engine.driver
      },
      error: function() {
        alert(config.local.requestError);
      }.bind(this)
    };
  };

  Engine.prototype.makeRequest = function(config) {

    var defaultConfig = $.extend(true, {}, this.defaultConfig);

    return $.ajax($.extend(true, defaultConfig, config));
  };

  Engine.prototype.checkWords = function(text, callback) {
    return this.makeRequest({
      data: {
        action: 'get_incorrect_words',
        text: text
      },
      success: callback
    });
  };

  Engine.prototype.getSuggestedWords = function(word, callback) {
    return this.makeRequest({
      data: {
        action: 'get_suggestions',
        word: word
      },
      success: callback
    });
  };

  /* Spellchecker base parser
   *************************/

  var Parser = function(element) {
    this.element = element;
  };

  Parser.prototype.clean = function(text) {

    var tagExpression = '<[^>]+>';
    var punctuationExpression = '^[^a-zA-Z\\u00A1-\\uFFFF]|[^a-zA-Z\\u00A1-\\uFFFF]+[^a-zA-Z\\u00A1-\\uFFFF]|[^a-zA-Z\\u00A1-\\uFFFF]$|\\n|\\t|\\s{2,}';

    text = text.replace(new RegExp(tagExpression, 'g'), ''); // strip any html tags
    text = text.replace(new RegExp(punctuationExpression, 'g'), ' '); // strip any punctuation

    return $.trim(text);
  };

  /* Spellchecker text parser
   *************************/

  var TextParser = function() {
    Parser.apply(this, arguments);
  };
  inherits(TextParser, Parser);

  TextParser.prototype.getText = function() {
    return this.clean(this.element.val());
  };

  TextParser.prototype.replaceWordInText = function(text, oldWord, newWord) {
    return text
      .replace(
        new RegExp("([^a-zA-Z\\u00A1-\\uFFFF]?)(" + oldWord + ")([^a-zA-Z\\u00A1-\\uFFFF]?)", "g"),
        '$1' + newWord + '$3'
      )
      .replace(
        new RegExp("^(" + oldWord + ")([^a-zA-Z\\u00A1-\\uFFFF])", "g"),
        newWord + '$2'
      )
      .replace(
        new RegExp("([^a-zA-Z\\u00A1-\\uFFFF])(" + oldWord + ")$", "g"),
        '$1' + newWord
      );
  };

  TextParser.prototype.replaceWord = function(oldWord, replacement) {

    var oldText = this.element.val();
    var newText = this.replaceWordInText(oldText, oldWord, replacement);

    this.element.val(newText);
  };

  /* Spellchecker html parser
   *************************/

  var HtmlParser = function() {
    Parser.apply(this, arguments);
  };
  inherits(HtmlParser, Parser);

  HtmlParser.prototype.getText = function() {

    var element = this.element
      .clone()
      .find('[class^="spellchecker-"]')
      .remove()
      .end();

    var text = this.element.text();

    return this.clean(text);
  };

  HtmlParser.prototype.replaceText = function(regExp, replaceText) {
    window.findAndReplaceDOMText(regExp, this.element[0], replaceText);
  };

  HtmlParser.prototype.replaceWord = function(oldWord, replacement) {

    window.findAndReplaceDOMText.revert();

    var r = replacement;
    var replaced;
    var replaceFill;
    var c;
    var regExp = new RegExp('\\b' + oldWord + '\\b', 'g');

    this.replaceText(regExp, function(fill, i){

      // Reset the replacement for each match
      if (i !== c) {
        c = i;
        replacement = r;
        replaced = '';
      }

      replaceFill = replacement.substring(0, fill.length);
      replacement = replacement.substring(fill.length);
      replaced += fill;

      // Add remaining text to last node
      if (replaced === oldWord && replacement.length > 0) {
        replaceFill += replacement;
      }

      return document.createTextNode(replaceFill || '');
    });

    // Remove this word from the list of incorrect words
    this.incorrectWords = $.map(this.incorrectWords, function(word) {
      return word === oldWord ? null : word;
    });

    this.highlightWords(this.incorrectWords);
  };

  HtmlParser.prototype.highlightWords = function(incorrectWords) {

    if (!incorrectWords.length) {
      return;
    }

    this.incorrectWords = incorrectWords;

    var regExp = new RegExp('\\b' + incorrectWords.join('|') + '\\b', 'g');
    var c;
    var replaceElement;

    this.replaceText(regExp, function(fill, i) {

      // Replacement node
      var span = $('<span />', {
        'class': pluginName + '-word-highlight',
        'data-word': incorrectWords[i]
      });

      span.text(fill);

      // If we have a new match
      if (i !== c) {
        c = 0;
        replaceElement = span;
      }

      // We save the first replacement element so we
      // can position the suggest box correctly.
      span.data('firstElement', replaceElement);

      return span[0];
    });
  };

  /* Spellchecker
   *************************/

  var SpellChecker = function(element, config) {

    Events.call(this);

    this.element = $(element).attr('spellcheck', 'false');
    this.config = $.extend(true, defaultConfig, config);

    this.setupEngine();
    this.setupParser();
    this.setupSuggestBox();
    this.setupIncorrectWords();
    this.bindEvents();
  };
  inherits(SpellChecker, Events);

  SpellChecker.prototype.setupEngine = function() {
    this.engine = new Engine(this.config);
  };

  SpellChecker.prototype.setupSuggestBox = function() {
    this.suggestBox = new SuggestBox(this.config, this.element);
  };

  SpellChecker.prototype.setupIncorrectWords = function() {
    this.incorrectWords = this.config.parser === 'html' ? 
      new IncorrectWordsInline(this.config, this.parser, this.element) : 
      new IncorrectWordsBox(this.config, this.parser, this.element);
  };

  SpellChecker.prototype.setupParser = function() {
    this.parser = this.config.parser === 'html' ? 
      new HtmlParser(this.element) : 
      new TextParser(this.element);
  };

  SpellChecker.prototype.bindEvents = function() {
    this.on('check.fail', this.onCheckFail.bind(this));
    this.suggestBox.on('ignore.word', this.onIgnoreWord.bind(this));
    this.suggestBox.on('ignore.all', this.onIgnoreAll.bind(this));
    this.suggestBox.on('ignore.forever', this.onIgnoreForever.bind(this));
    this.suggestBox.on('select.word', this.onSuggestedWordSelect.bind(this));
    this.incorrectWords.on('select.word', this.onIncorrectWordSelect.bind(this));
  };

  /* Pubic API methods */

  SpellChecker.prototype.check = function() {
    this.incorrectWords.loading(true);
    var text = this.parser.getText();
    this.engine.checkWords(text, this.onCheckWords.bind(this));
  };

  SpellChecker.prototype.showSuggestedWords = function(word, element) {
    var getWords = this.engine.getSuggestedWords.bind(this.engine);
    this.suggestBox.loadSuggestedWords(getWords, word, element);
  };

  /* Event handlers */

  SpellChecker.prototype.onCheckWords = function(data) {

    this.incorrectWords.loading(false);

    var badWords = data.data;
    var outcome = badWords.length ? 'fail' : 'success';

    this.trigger('check.' + outcome, badWords);
  };

  SpellChecker.prototype.onCheckFail = function(badWords) {
    this.suggestBox.detach();
    this.incorrectWords.addWords(badWords);
    this.suggestBox.reattach();
  };

  SpellChecker.prototype.onSuggestedWordSelect = function(e, word, element) {
    e.preventDefault();
    this.suggestBox.close();
    this.suggestBox.detach();
    this.parser.replaceWord(this.incorrectWord, word);
    this.suggestBox.reattach();
    // this.incorrectWordElement.remove();
  };

  SpellChecker.prototype.onIgnoreWord = function() {
    alert('Ignore word');
  };

  SpellChecker.prototype.onIgnoreAll = function() {
    alert('Ignore all');
  };

  SpellChecker.prototype.onIgnoreForever = function() {
    alert('Ignore forever');
  };

  SpellChecker.prototype.onIncorrectWordSelect = function(e, word, element) {
    e.preventDefault();
    this.incorrectWord = word;
    this.incorrectWordElement = element;
    this.showSuggestedWords(word, element);
  };

  $.SpellChecker = SpellChecker;

}(this, jQuery));

/**
 * findAndReplaceDOMText v 0.11
 * @author James Padolsey http://james.padolsey.com
 * @license http://unlicense.org/UNLICENSE
 *
 * Matches the text of a DOM node against a regular expression
 * and replaces each match (or node-separated portions of the match)
 * in the specified element.
 *
 * Example: Wrap 'test' in <em>:
 *   <p id="target">This is a test</p>
 *   <script>
 *     findAndReplaceDOMText(
 *       /test/,
 *       document.getElementById('target'),
 *       'em'
 *     );
 *   </script>
 */
window.findAndReplaceDOMText = (function() {

  /** 
   * findAndReplaceDOMText
   * 
   * Locates matches and replaces with replacementNode
   *
   * @param {RegExp} regex The regular expression to match
   * @param {Node} node Element or Text node to search within
   * @param {String|Element|Function} replacementNode A NodeName,
   *  Node to clone, or a function which returns a node to use
   *  as the replacement node.
   */
  function findAndReplaceDOMText(regex, node, replacementNode) {

    var m, index, matches = [], text = _getText(node);
    var replaceFn = _genReplacer(replacementNode);

    if (!text) { return; }

    if (regex.global) {
      while (m = regex.exec(text)) {
        if (!m[0]) {
          throw 'findAndReplaceDOMText cannot handle zero-length matches';
        }
        matches.push([regex.lastIndex - m[0].length, regex.lastIndex, m]);
      }
    } else {
      m = text.match(regex);
      index = text.indexOf(m[0]);
      if (!m[0]) {
        throw 'findAndReplaceDOMText cannot handle zero-length matches';
      }
      matches.push([index, index + m[0].length, m]);
    }

    if (matches.length) {
      _stepThroughMatches(node, matches, replaceFn);
    }

  }

  /**
   * Gets aggregate text of a node without resorting
   * to broken innerText/textContent
   */
  function _getText(node) {

    if (node.nodeType === 3) {
      return node.data;
    }

    var txt = '';

    if (node = node.firstChild) {
      do {
        txt += _getText(node);
      } while (node = node.nextSibling);
    }

    return txt;

  }

  /** 
   * Steps through the target node, looking for matches, and
   * calling replaceFn when a match is found.
   */
  function _stepThroughMatches(node, matches, replaceFn) {

    var after, before,
        startNode,
        endNode,
        startNodeIndex,
        endNodeIndex,
        innerNodes = [],
        atIndex = 0,
        curNode = node,
        matchLocation = matches.shift(),
        matchIndex = 0;

    out: while (true) {

      if (curNode.nodeType === 3) {
        if (!endNode && curNode.length + atIndex >= matchLocation[1]) {
          // We've found the ending
          endNode = curNode;
          endNodeIndex = matchLocation[1] - atIndex;
        } else if (startNode) {
          // Intersecting node
          innerNodes.push(curNode);
        }
        if (!startNode && curNode.length + atIndex > matchLocation[0]) {
          // We've found the match start
          startNode = curNode;
          startNodeIndex = matchLocation[0] - atIndex;
        }
        atIndex += curNode.length;
      }

      if (startNode && endNode) {
        curNode = replaceFn({
          startNode: startNode,
          startNodeIndex: startNodeIndex,
          endNode: endNode,
          endNodeIndex: endNodeIndex,
          innerNodes: innerNodes,
          match: matchLocation[2],
          matchIndex: matchIndex
        });
        // replaceFn has to return the node that replaced the endNode
        // and then we step back so we can continue from the end of the 
        // match:
        atIndex -= (endNode.length - endNodeIndex);
        startNode = null;
        endNode = null;
        innerNodes = [];
        matchLocation = matches.shift();
        matchIndex++;
        if (!matchLocation) {
          break; // no more matches
        }
      } else if (curNode.firstChild || curNode.nextSibling) {
        // Move down or forward:
        curNode = curNode.firstChild || curNode.nextSibling;
        continue;
      }

      // Move forward or up:
      while (true) {
        if (curNode.nextSibling) {
          curNode = curNode.nextSibling;
          break;
        } else if (curNode.parentNode !== node) {
          curNode = curNode.parentNode;
        } else {
          break out;
        }
      }

    }

  }

  var reverts;
  /**
   * Reverts the last findAndReplaceDOMText process
   */
  findAndReplaceDOMText.revert = function revert() {
    for (var i = 0, l = reverts.length; i < l; ++i) {
      reverts[i]();
    }
    reverts = [];
  };

  /** 
   * Generates the actual replaceFn which splits up text nodes
   * and inserts the replacement element.
   */
  function _genReplacer(nodeName) {

    reverts = [];

    var makeReplacementNode;

    if (typeof nodeName !== 'function') {
      var stencilNode = nodeName.nodeType ? nodeName : document.createElement(nodeName);
      makeReplacementNode = function(fill) {
        var clone = document.createElement('div'),
            el;
        clone.innerHTML = stencilNode.outerHTML || new window.XMLSerializer().serializeToString(stencilNode);
        el = clone.firstChild;
        if (fill) {
          el.appendChild(document.createTextNode(fill));
        }
        return el;
      };
    } else {
      makeReplacementNode = nodeName;
    }

    return function replace(range) {

      var startNode = range.startNode,
          endNode = range.endNode,
          matchIndex = range.matchIndex,
          before,
          after;

      if (startNode === endNode) {
        var node = startNode;
        if (range.startNodeIndex > 0) {
          // Add `before` text node (before the match)
          before = document.createTextNode(node.data.substring(0, range.startNodeIndex));
          node.parentNode.insertBefore(before, node);
        }

        // Create the replacement node:
        var el = makeReplacementNode(range.match[0], matchIndex);
        node.parentNode.insertBefore(el, node);
        if (range.endNodeIndex < node.length) {
          // Add `after` text node (after the match)
          after = document.createTextNode(node.data.substring(range.endNodeIndex));
          node.parentNode.insertBefore(after, node);
        }
        node.parentNode.removeChild(node);
        reverts.push(function() {
          var pnode = el.parentNode;
          pnode.insertBefore(el.firstChild, el);
          pnode.removeChild(el);
          pnode.normalize();
        });
        return el;
      } else {
        // Replace startNode -> [innerNodes...] -> endNode (in that order)
        before = document.createTextNode(startNode.data.substring(0, range.startNodeIndex));
        after = document.createTextNode(endNode.data.substring(range.endNodeIndex));
        var elA = makeReplacementNode(startNode.data.substring(range.startNodeIndex), matchIndex);
        var innerEls = [];
        for (var i = 0, l = range.innerNodes.length; i < l; ++i) {
          var innerNode = range.innerNodes[i];
          var innerEl = makeReplacementNode(innerNode.data, matchIndex);
          innerNode.parentNode.replaceChild(innerEl, innerNode);
          innerEls.push(innerEl);
        }
        var elB = makeReplacementNode(endNode.data.substring(0, range.endNodeIndex), matchIndex);
        startNode.parentNode.insertBefore(before, startNode);
        startNode.parentNode.insertBefore(elA, startNode);
        startNode.parentNode.removeChild(startNode);
        endNode.parentNode.insertBefore(elB, endNode);
        endNode.parentNode.insertBefore(after, endNode);
        endNode.parentNode.removeChild(endNode);
        reverts.push(function() {
          innerEls.unshift(elA);
          innerEls.push(elB);
          for (var i = 0, l = innerEls.length; i < l; ++i) {
            var el = innerEls[i];
            var pnode = el.parentNode;
            pnode.insertBefore(el.firstChild, el);
            pnode.removeChild(el);
            pnode.normalize();
          }
        });
        return elB;
      }
    };

  }

  return findAndReplaceDOMText;

}());