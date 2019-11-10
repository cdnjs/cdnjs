/*
 * jQuery Spellchecker - v0.2.0 - 2012-11-02
 * https://github.com/badsyntax/jquery-spellchecker
 * Copyright (c) 2012 Richard Willis; Licensed MIT
 */

(function(window, $) {

  /* Config
   *************************/

  var defaultConfig = {
    lang: 'en',
    webservice: {
      path: 'spellchecker.php',
      driver: 'PSpell'
    },
    local: {
      requestError: 'There was an error processing the request.',
      ignoreWord: 'Ignore word',
      ignoreAll: 'Ignore all',
      ignoreForever: 'Add to dictionary',
      loading: 'Loading...',
      noSuggestions: '(No suggestions)'
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

  /* Character sets
   *************************/

  var punctuationChars = '\\u0021-\\u0023\\u0025-\\u002A\\u002C-\\u002F\\u003A\\u003B\\u003F\\u0040\\u005B-\\u005D\\u005F\\u007B\\u007D\\u00A1\\u00A7\\u00AB\\u00B6\\u00B7\\u00BB\\u00BF\\u037E\\u0387\\u055A-\\u055F\\u0589\\u058A\\u05BE\\u05C0\\u05C3\\u05C6\\u05F3\\u05F4\\u0609\\u060A\\u060C\\u060D\\u061B\\u061E\\u061F\\u066A-\\u066D\\u06D4\\u0700-\\u070D\\u07F7-\\u07F9\\u0830-\\u083E\\u085E\\u0964\\u0965\\u0970\\u0AF0\\u0DF4\\u0E4F\\u0E5A\\u0E5B\\u0F04-\\u0F12\\u0F14\\u0F3A-\\u0F3D\\u0F85\\u0FD0-\\u0FD4\\u0FD9\\u0FDA\\u104A-\\u104F\\u10FB\\u1360-\\u1368\\u1400\\u166D\\u166E\\u169B\\u169C\\u16EB-\\u16ED\\u1735\\u1736\\u17D4-\\u17D6\\u17D8-\\u17DA\\u1800-\\u180A\\u1944\\u1945\\u1A1E\\u1A1F\\u1AA0-\\u1AA6\\u1AA8-\\u1AAD\\u1B5A-\\u1B60\\u1BFC-\\u1BFF\\u1C3B-\\u1C3F\\u1C7E\\u1C7F\\u1CC0-\\u1CC7\\u1CD3\\u2010-\\u2027\\u2030-\\u2043\\u2045-\\u2051\\u2053-\\u205E\\u207D\\u207E\\u208D\\u208E\\u2329\\u232A\\u2768-\\u2775\\u27C5\\u27C6\\u27E6-\\u27EF\\u2983-\\u2998\\u29D8-\\u29DB\\u29FC\\u29FD\\u2CF9-\\u2CFC\\u2CFE\\u2CFF\\u2D70\\u2E00-\\u2E2E\\u2E30-\\u2E3B\\u3001-\\u3003\\u3008-\\u3011\\u3014-\\u301F\\u3030\\u303D\\u30A0\\u30FB\\uA4FE\\uA4FF\\uA60D-\\uA60F\\uA673\\uA67E\\uA6F2-\\uA6F7\\uA874-\\uA877\\uA8CE\\uA8CF\\uA8F8-\\uA8FA\\uA92E\\uA92F\\uA95F\\uA9C1-\\uA9CD\\uA9DE\\uA9DF\\uAA5C-\\uAA5F\\uAADE\\uAADF\\uAAF0\\uAAF1\\uABEB\\uFD3E\\uFD3F\\uFE10-\\uFE19\\uFE30-\\uFE52\\uFE54-\\uFE61\\uFE63\\uFE68\\uFE6A\\uFE6B\\uFF01-\\uFF03\\uFF05-\\uFF0A\\uFF0C-\\uFF0F\\uFF1A\\uFF1B\\uFF1F\\uFF20\\uFF3B-\\uFF3D\\uFF3F\\uFF5B\\uFF5D\\uFF5F-\\uFF65';
  var letterChars = '\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0\\u08A2-\\u08AC\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA697\\uA6A0-\\uA6E5\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA793\\uA7A0-\\uA7AA\\uA7F8-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA80-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC';

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

  /* Handlers 
   *************************/

  var selectWordHandler = function(handlerName) {

    return function(e) {
    
      e.preventDefault();
      e.stopPropagation();

      var element = $(e.currentTarget);
      var word = $.trim(element.data('word') || element.text());
    
      this.trigger(handlerName, e, word, element);

    }.bind(this);
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

  /* Incorrect words box
   *************************/

  var IncorrectWordsBox = function(config) {
    Box.apply(this, arguments);
  };
  inherits(IncorrectWordsBox, Box);

  IncorrectWordsBox.prototype.bindEvents = function() {
    this.container.on('click', 'a', selectWordHandler.call(this, 'select.word'));
  };

  IncorrectWordsBox.prototype.createBox = function() {
    this.container = $([
      '<div class="' + pluginName + '-incorrectwords">',
      '</div>'
    ].join('')).hide().appendTo(this.config.incorrectWords.container);
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

  IncorrectWordsBox.prototype.removeWord = function(elem) {
    elem.remove();
    if (this.container.children().length === 0) {
      this.container.hide();
    }
  };

  IncorrectWordsBox.prototype.destroy = function() {
    this.container.empty().remove();
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
    this.element.on('click', '.' + pluginName + '-word-highlight', selectWordHandler.call(this, 'select.word'));
  };

  IncorrectWordsInline.prototype.addWords = function(words) {
    var highlighted = this.parser.highlightWords(words);
    this.element.html(highlighted);
  };

  IncorrectWordsInline.prototype.loading = function() {};

  IncorrectWordsInline.prototype.removeWord = function(elem) {};

  IncorrectWordsInline.prototype.destroy = function() {
    window.findAndReplaceDOMText.revert();
  };

  /* Suggest box
   *************************/

  var SuggestBox = function(config, element) {
    this.element = element;
    this.body = (this.element.length && this.element[0].nodeName === 'BODY') ? this.element : 'body';
    Box.apply(this, arguments);
  };
  inherits(SuggestBox, Box);

  SuggestBox.prototype.bindEvents = function() {
    var click = 'click.' + pluginName;
    this.container.on(click, this.onContainerClick.bind(this));
    this.container.on(click, '.ignore-word', selectWordHandler.call(this, 'ignore.word'));
    this.container.on(click, '.ignore-all', this.handler('ignore.all'));
    this.container.on(click, '.ignore-forever', this.handler('ignore.forever'));
    this.container.on(click, '.words a', selectWordHandler.call(this, 'select.word'));
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

    var html;

    if (!words.length) {
      html = '<em>' + this.config.local.noSuggestions + '</em>';
    } else {
      html = $.map(words, function(word) {
        return '<a href="#">' + word + '</a>';
      }).slice(0, this.config.suggestBox.numWords).join('');
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

  SuggestBox.prototype.destroy = function() {
    this.container.empty().remove();
  };

  /* Spellchecker web service
   *************************/

  var WebService = function(config) {

    this.config = config;

    this.defaultConfig = {
      url: config.webservice.path,
      type: 'POST',
      dataType: 'json',
      cache: false,
      data: {
        lang: config.lang,
        driver: config.webservice.driver
      },
      error: function() {
        alert(config.local.requestError);
      }.bind(this)
    };
  };

  WebService.prototype.makeRequest = function(config) {

    var defaultConfig = $.extend(true, {}, this.defaultConfig);

    return $.ajax($.extend(true, defaultConfig, config));
  };

  WebService.prototype.checkWords = function(text, callback) {
    return this.makeRequest({
      data: {
        action: 'get_incorrect_words',
        text: text
      },
      success: callback
    });
  };

  WebService.prototype.getSuggestedWords = function(word, callback) {
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

    text = ' ' + text + ' '; // Typecast to string to prevent exceptions;
    text = text.replace(new RegExp('<[^>]+>', 'g'), ''); // strip any html tags

    var puncExpr = [
      '[' + punctuationChars + ']+\\s+[' + punctuationChars + ']+', // punctuation(s) with leading and trailing whitespace(s)
      '[' + punctuationChars + ']+\\s+',                            // puncutation(s) with trailing whitespace(s)
      '\\s+[' + punctuationChars + ']+'                             // punctuation(s) with leading whitespace(s)
    ].join('|');

    text = text.replace(new RegExp(puncExpr, 'g'), ' '); // strip any punctuation
    text = $.trim(text.replace(/\s{2,}/g, ' '));      // remove extra whitespace

    // Remove numbers
    text = $.map(text.split(' '), function(word) {
      return (/^\d+$/.test(word)) ? null : word;
    }).join(' ');

    return text;
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
    var regex = new RegExp('(^|[^' + letterChars + '])(' + oldWord + ')(?=[^' + letterChars + ']|$)', 'g');
    return text.replace(regex, '$1' + newWord);
  };

  TextParser.prototype.replaceWord = function(oldWord, replacement) {
    var newText = this.replaceWordInText(this.element.val(), oldWord, replacement);
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

  HtmlParser.prototype.replaceText = function(regExp, replaceText, captureGroup) {
    window.findAndReplaceDOMText(regExp, this.element[0], replaceText, captureGroup);
  };

  HtmlParser.prototype.replaceWord = function(oldWord, replacement) {

    window.findAndReplaceDOMText.revert();

    var regExp = new RegExp('(^|[^' + letterChars + '])(' + oldWord + ')(?=[^' + letterChars + ']|$)', 'g');

    this.replaceText(regExp, this.replaceTextHandler(oldWord, replacement), 2);

    // Remove this word from the list of incorrect words
    this.incorrectWords = $.map(this.incorrectWords, function(word) {
      return word === oldWord ? null : word;
    });

    this.highlightWords(this.incorrectWords);
  };

  HtmlParser.prototype.replaceTextHandler = function(oldWord, replacement){

    var r = replacement;
    var replaced;
    var replaceFill;
    var c;

    return function(fill, i) {

      // Reset the replacement for each match
      if (i !== c) {
        c = i;
        replacement = r;
        replaced = '';
      }

      replaceFill = replacement.substring(0, fill.length);
      replacement = replacement.substr(fill.length);
      replaced += fill;

      // Add remaining text to last node
      if (replaced === oldWord) {
        replaceFill += replacement;
      }

      return document.createTextNode(replaceFill);
    };
  };

  HtmlParser.prototype.highlightWords = function(incorrectWords) {

    if (!incorrectWords.length) {
      return;
    }
    this.incorrectWords = incorrectWords;

    var regExp = new RegExp('(^|[^' + letterChars + '])(' + incorrectWords.join('|') + ')(?=[^' + letterChars + ']|$)', 'g');

    this.replaceText(regExp, this.highlightWordsHandler(incorrectWords), 2);
  };

  HtmlParser.prototype.highlightWordsHandler = function(incorrectWords) {

    var c;
    var replaceElement;

    return function(fill, i) {
      // Replacement node
      var span = $('<span />', {
        'class': pluginName + '-word-highlight'
      });

      // If we have a new match
      if (i !== c) {
        c = i;
        replaceElement = span;
      }
      
      span
      .text(fill)
      .data({
        'firstElement': replaceElement,
        'word': incorrectWords[i]
      });

      return span[0];
    };
  };

  HtmlParser.prototype.ignoreWord = function(oldWord, replacement) {
    this.replaceWord(oldWord, replacement);
  };

  /* Spellchecker
   *************************/

  var SpellChecker = function(element, config) {

    Events.call(this);

    this.element = $(element).attr('spellcheck', 'false');
    this.config = $.extend(true, defaultConfig, config);

    this.setupWebService();
    this.setupParser();
    this.setupSuggestBox();
    this.setupIncorrectWords();
    this.bindEvents();
  };
  inherits(SpellChecker, Events);

  SpellChecker.prototype.setupWebService = function() {
    this.webservice = new WebService(this.config);
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
    this.suggestBox.on('select.word', this.onSelectWord.bind(this));
    this.incorrectWords.on('select.word', this.onIncorrectWordSelect.bind(this));
  };

  /* Pubic API methods */

  SpellChecker.prototype.check = function() {
    this.incorrectWords.loading(true);
    var text = this.parser.getText();
    this.webservice.checkWords(text, this.onCheckWords.bind(this));
  };

  SpellChecker.prototype.showSuggestedWords = function(word, element) {
    var getWords = this.webservice.getSuggestedWords.bind(this.webservice);
    this.suggestBox.loadSuggestedWords(getWords, word, element);
  };

  SpellChecker.prototype.replaceWord = function(oldWord, replacement) {
    this.suggestBox.close();
    this.suggestBox.detach();
    this.parser.replaceWord(oldWord, replacement);
    this.suggestBox.reattach();
    this.incorrectWords.removeWord(this.incorrectWordElement);
  };

  SpellChecker.prototype.destroy = function() {
    this.suggestBox.destroy();
    this.incorrectWords.destroy();
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

  SpellChecker.prototype.onSelectWord = function(e, word, element) {
    e.preventDefault();
    this.replaceWord(this.incorrectWord, word);
  };

  SpellChecker.prototype.onIgnoreWord = function(e, word, element) {
    e.preventDefault();
    this.replaceWord(this.incorrectWord, this.incorrectWord);
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
 * Some small changes were made by Richard Willis to allow this
 * code to pass the project-configured jshint
 *
 * findAndReplaceDOMText v 0.2
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
   * @param {Number} captureGroup A number specifiying which capture
   *  group to use in the match. (optional)
   */
  function findAndReplaceDOMText(regex, node, replacementNode, captureGroup) {

    var m, matches = [], text = _getText(node);
    var replaceFn = _genReplacer(replacementNode);

    if (!text) { return; }

    if (regex.global) {
      while (!!(m = regex.exec(text))) {
        matches.push(_getMatchIndexes(m, captureGroup));
      }
    } else {
      m = text.match(regex);
      matches.push(_getMatchIndexes(m, captureGroup));
    }

    if (matches.length) {
      _stepThroughMatches(node, matches, replaceFn);
    }
  }

  /**
   * Gets the start and end indexes of a match
   */
  function _getMatchIndexes(m, captureGroup) {

    captureGroup = captureGroup || 0;
 
    if (!m[0]) throw 'findAndReplaceDOMText cannot handle zero-length matches';
 
    var index = m.index;

    if (captureGroup > 0) {
      var cg = m[captureGroup];
      if (!cg) throw 'Invalid capture group';
      index += m[0].indexOf(cg);
      m[0] = cg;
    } 

    return [ index, index + m[0].length, [ m[0] ] ];
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

    if (!!(node = node.firstChild)) do {
      txt += _getText(node);
    } while (!!(node = node.nextSibling));

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
          before, after;

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