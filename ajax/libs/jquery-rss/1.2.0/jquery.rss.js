(function($) {
  "use strict";

  var RSS = function(target, url, options, callback) {
    this.target       = target
    this.url          = url
    this.html         = []
    this.effectQueue  = []
    this.callback     = callback

    this.options = jQuery.extend({
      ssl: false,
      limit: null,
      key: null,
      layoutTemplate: '<ul>{entries}</ul>',
      entryTemplate: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>',
      tokens: {},
      outputMode: 'json',
      effect: 'show'
    }, options || {})
  }

  RSS.htmlTags = ["doctype", "html", "head", "title", "base", "link", "meta", "style", "script", "noscript", "body", "article", "nav", "aside", "section", "header", "footer", "h1-h6", "hgroup", "address", "p", "hr", "pre", "blockquote", "ol", "ul", "li", "dl", "dt", "dd", "figure", "figcaption", "div", "table", "caption", "thead", "tbody", "tfoot", "tr", "th", "td", "col", "colgroup", "form", "fieldset", "legend", "label", "input", "button", "select", "datalist", "optgroup", "option", "textarea", "keygen", "output", "progress", "meter", "details", "summary", "command", "menu", "del", "ins", "img", "iframe", "embed", "object", "param", "video", "audio", "source", "canvas", "track", "map", "area", "a", "em", "strong", "i", "b", "u", "s", "small", "abbr", "q", "cite", "dfn", "sub", "sup", "time", "code", "kbd", "samp", "var", "mark", "bdi", "bdo", "ruby", "rt", "rp", "span", "br", "wbr"]

  RSS.prototype.load = function(callback) {
    var apiProtocol = "http" + (this.options.ssl ? "s" : "")
      , apiHost     = apiProtocol + "://ajax.googleapis.com/ajax/services/feed/load"
      , apiUrl      = apiHost + "?v=1.0&output=" + this.options.outputMode + "&callback=?&q=" + encodeURIComponent(this.url)
      , self        = this

    if (this.options.limit != null) apiUrl += "&num=" + this.options.limit;
    if (this.options.key != null)   apiUrl += "&key=" + this.options.key;

    $.getJSON(apiUrl, callback)
  }

  RSS.prototype.render = function() {
    var self          = this

    this.load(function(data) {
      self.entries = data.responseData.feed.entries

      var html = self.generateHTMLForEntries()

      self.target.append(html.layout)

      if (html.entries.length !== 0) {
        self.appendEntriesAndApplyEffects(html.layout, html.entries)
      }

      if (self.effectQueue.length > 0) {
        self.executeEffectQueue(self.callback)
      } else {
        $.isFunction(self.callback) && self.callback.call(self);
      }
    })
  }

  RSS.prototype.appendEntriesAndApplyEffects = function(target, entries) {
    var self = this

    entries.forEach(function(entry) {
      var $html = self.wrapContent(entry)

      if(self.options.effect === 'show') {
        target.append($html)
      } else {
        $html.css({ display: 'none' })
        self.target.append($html)
        self.applyEffect($html, self.options.effect)
      }
    })
  }

  RSS.prototype.generateHTMLForEntries = function() {
    var self   = this
      , result = {
          entries: [],
          layout:  null
        }

    jQuery(this.entries).each(function() {
      var entry     = this

      if(self.isRelevant(entry)) {
        var evaluatedString = self.evaluateStringForEntry(self.options.entryTemplate, entry)
        result.entries.push(evaluatedString)
      }
    })

    if(!!this.options.entryTemplate) {
      // we have an entryTemplate
      result.layout = this.wrapContent(this.options.layoutTemplate.replace("{entries}", ''))
    } else {
      // no entryTemplate available
      result.layout = this.wrapContent(result.entries.join("\n"))
    }

    return result
  }

  RSS.prototype.wrapContent = function(content) {
    if($.trim(content).indexOf('<') !== 0) {
      // the content has no html => create a surrounding div
      return $("<div>" + content + "</div>")
    } else {
      // the content has html => don't touch it
      return $(content)
    }
  }

  RSS.prototype.applyEffect = function($element, effect, callback) {
    var self = this

    switch(effect) {
      case 'slide':
        $element.slideDown('slow', callback)
        break
      case 'slideFast':
        $element.slideDown(callback)
        break
      case 'slideSynced':
        self.effectQueue.push({ element: $element, effect: 'slide' })
        break
      case 'slideFastSynced':
        self.effectQueue.push({ element: $element, effect: 'slideFast' })
        break
    }
  }

  RSS.prototype.executeEffectQueue = function(callback) {
    var self = this

    this.effectQueue.reverse()

    var executeEffectQueueItem = function() {
      var item = self.effectQueue.pop()

      if(item) {
        self.applyEffect(item.element, item.effect, executeEffectQueueItem)
      } else {
        callback && callback()
      }
    }

    executeEffectQueueItem()
  }

  RSS.prototype.evaluateStringForEntry = function(string, entry) {
    var result = string
      , self   = this

    jQuery(string.match(/(\{.*?\})/g)).each(function() {
      var token = this.toString()
      result = result.replace(token, self.getValueForToken(token, entry))
    })

    return result
  }

  RSS.prototype.isRelevant = function(entry) {
    var tokenMap = this.getTokenMap(entry)

    if(this.options.filter) {
      if(this.options.filterLimit && (this.options.filterLimit == this.html.length)) {
        return false
      } else {
        return this.options.filter(entry, tokenMap)
      }
    } else {
      return true
    }
  }

  RSS.prototype.getTokenMap = function(entry) {
    return jQuery.extend({
      url:            entry.link,
      author:         entry.author,
      date:           entry.publishedDate,
      title:          entry.title,
      body:           entry.content,
      shortBody:      entry.contentSnippet,

      bodyPlain:      (function(entry) {
        var result = entry.content
          .replace(/<script[\\r\\\s\S]*<\/script>/mgi, '')
          .replace(/<\/?[^>]+>/gi, '')

        for(var i = 0; i < RSS.htmlTags.length; i++) {
          result = result.replace(new RegExp('<' + RSS.htmlTags[i], 'gi'), '')
        }

        return result
      })(entry),

      shortBodyPlain: entry.contentSnippet.replace(/<\/?[^>]+>/gi, ''),
      index:          jQuery.inArray(entry, this.entries),
      totalEntries:   this.entries.length,

      teaserImage:    (function(entry){
        try { return entry.content.match(/(<img.*?>)/gi)[0] }
        catch(e) { return "" }
      })(entry),

      teaserImageUrl: (function(entry) {
        try { return entry.content.match(/(<img.*?>)/gi)[0].match(/src="(.*?)"/)[1] }
        catch(e) { return "" }
      })(entry)
    }, this.options.tokens)
  }

  RSS.prototype.getValueForToken = function(_token, entry) {
    var tokenMap = this.getTokenMap(entry)
      , token    = _token.replace(/[\{\}]/g, '')
      , result   = tokenMap[token]

    if(typeof result != 'undefined')
      return ((typeof result == 'function') ? result(entry, tokenMap) : result)
    else
      throw new Error('Unknown token: ' + _token)
  }

  $.fn.rss = function(url, options, callback) {
    new RSS(this, url, options, callback).render()
  }
})(jQuery)
