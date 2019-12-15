(function($) {
  var RSS = function(target, url, options, callback) {
    this.target = target
    this.url = url
    this.html = []
    this.options = jQuery.extend({
      ssl: false,
      limit: null,
      key: null,
      layoutTemplate: '<ul>{entries}</ul>',
      entryTemplate: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>',
      tokens: {},
      outputMode: 'json'
    }, options || {})
    this.callback = callback
  }

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
      , entryTemplate = this.options.entryTemplate

    this.load(function(data) {
      self.entries = data.responseData.feed.entries

      jQuery(self.entries).each(function() {
        var entry     = this
          , entryHTML = entryTemplate

        if(self.isRelevant(entry)) {
          var evaluatedString = self.evaluateStringForEntry(entryTemplate, entry)
          self.html.push(evaluatedString)
        }
      })

      var html = self.html.join("\n")

      if(!!self.options.entryTemplate)
        html = self.options.layoutTemplate.replace("{entries}", html)
      else
        html = (jQuery(html).length == 0) ? jQuery("<div>" + html + "</div>") : jQuery(html)

      self.target.append(html)

      if ($.isFunction(self.callback)) {
        self.callback.call(this);
      }
    })
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
      bodyPlain:      entry.content.replace(/<\/?[^>]+>/gi, ''),
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
