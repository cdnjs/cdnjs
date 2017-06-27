/*! Jets.js - v0.11.0 - 2016-07-30
* http://NeXTs.github.com/Jets.js/
* Copyright (c) 2015 Denis Lukov; Licensed MIT */

;(function(root, definition) {
  if (typeof module != 'undefined') module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else root['Jets'] = definition();
}(this, function() {
  "use strict"

  function Jets(opts) {
    if( ! (this instanceof Jets)) {
      return new Jets(opts);
    }
    var self = this;
    ['searchTag', 'contentTag'].forEach(function(param) {
      var name = param.replace('Tag', ''),
        queryMethod = 'querySelector' + (param == 'contentTag' ? 'All' : '');
      self[name + '_tag'] = document[queryMethod](opts[param]);
      self[name + '_param'] = opts[param];
      if( ! self[name + '_tag']) {
        throw new Error('Error! Could not find ' + param + ' element');
      }
    });

    var defaults = {
      searchSelector: '*AND',
      hideBy: 'display:none',
      diacriticsMap: {}
    }

    self.options = {};
    ['columns', 'addImportant', 'searchSelector', 'hideBy', 'manualContentHandling', 'callSearchManually', 'diacriticsMap', 'didSearch', 'invert'].forEach(function(name) {
      self.options[name] = opts[name] || defaults[name];
    });
    if(this.options.searchSelector.length > 1) {
      var searchSelector = self.options['searchSelector'].trim();
      self.options.searchSelector = searchSelector.substr(0, 1);
      self.options.searchSelectorMode = searchSelector.substr(1).toUpperCase();
    }

    var last_search_query;
    self.search = function() {
      if(last_search_query == (last_search_query = self.search_tag.value)) return;
      self._applyCSS();
      self.options.didSearch && self.options.didSearch(self.search_tag.value);
    };
    self._onSearch = function(event) {
      if(event.type == 'keydown')
        return setTimeout(self.search, 0);
      self.search();
    };
    self.destroy = function() {
      if( ! self.options.callSearchManually) self._processEventListeners('remove');
      self._destroy();
    };

    if( ! self.options.callSearchManually) self._processEventListeners('add');
    self._addStyleTag();
    self._setJets();
    self._applyCSS();
  }

  Jets.prototype = {
    constructor: Jets,
    _processEventListeners: function(action) {
      ['input', 'keydown', 'change'].forEach(function(event_type) {
        this.search_tag[action + 'EventListener'](event_type, this._onSearch);
      }.bind(this));
    },
    _applyCSS: function() {
      var options = this.options,
        search_phrase = this.replaceDiacritics(this.search_tag.value.trim().toLowerCase().replace(/\s\s+/g, ' ')).replace(/\\/g, '\\\\'),
        words = options.searchSelectorMode
          ? search_phrase.split(' ').filter(function(item, pos, arr) { return arr.indexOf(item) == pos; })
          : [search_phrase],
        is_strict_selector = options.searchSelectorMode == 'AND',
        selectors = [];
      for(var i = 0, ii = words.length; i < ii; i++) {
        selectors.push((is_strict_selector ? this.content_param + '>' : '') + (options.invert ? '' : ':not(') + '[data-jets' +
          options.searchSelector + '="' + words[i] + '"]' + (options.invert ? '' : ')'));
      }
      var hide_rules = options.hideBy.split(';').filter(Boolean).map(function(rule) { return rule + (options.addImportant ? '!important' : '') });
      var css_rule = (is_strict_selector ? '' : this.content_param + '>') + selectors.join(is_strict_selector ? ',' : '') + '{' + hide_rules.join(';') + '}';
      this.styleTag.innerHTML = search_phrase.length ? css_rule : '';
    },
    _addStyleTag: function() {
      this.styleTag = document.createElement('style');
      document.head.appendChild(this.styleTag);
    },
    _getText: function(tag) {
      return tag && (tag.textContent || tag.innerText) || '';
    },
    _getContentTags: function(query) {
      return Array.prototype.slice.call(this.content_tag).reduce(function(all, elem) {
        return all.concat(Array.prototype.slice.call(elem.querySelectorAll(query || ':scope > *')));
      }, []);
    },
    _setJets: function(query, force) {
      var self = this,
        tags = self._getContentTags(force ? '' : query), text;
      for(var i = 0, tag; tag = tags[i]; i++) {
        if(tag.hasAttribute('data-jets') && ! force) continue;
        text = this.options.manualContentHandling
          ? this.options.manualContentHandling(tag)
          : self.options.columns && self.options.columns.length
            ? self.options.columns.map(function(column) {
                return self._getText(tag.children[column]);
              }).join(' ')
            : self._getText(tag);
        tag.setAttribute('data-jets', self.replaceDiacritics(text.trim().replace(/\s+/g, ' ').toLowerCase()));
      };
    },
    replaceDiacritics: function(text) {
      var diacritics = this.options.diacriticsMap;
      for(var letter in diacritics) if(diacritics.hasOwnProperty(letter)) {
        for(var i = 0, ii = diacritics[letter].length; i < ii; i++) {
          text = text.replace(new RegExp(diacritics[letter][i], 'g'), letter);
        }
      }
      return text;
    },
    update: function(force) {
      this._setJets(':scope > :not([data-jets])', force);
    },
    _destroy: function() {
      this.styleTag.parentNode && document.head.removeChild(this.styleTag);
      var tags = this._getContentTags();
      for(var i = 0, tag; tag = tags[i]; i++) {
        tag.removeAttribute('data-jets');
      }
    }
  }

  // :scope polyfill
  // http://stackoverflow.com/a/17989803/1221082
  ;(function(doc, proto) {
    try {
      doc.querySelector(':scope body');
    } catch (err) {
      ['querySelector', 'querySelectorAll'].forEach(function(method) {
        var nativ = proto[method];
        proto[method] = function(selectors) {
          if (/(^|,)\s*:scope/.test(selectors)) {
            var id = this.id;
            this.id = 'ID_' + Date.now();
            selectors = selectors.replace(/((^|,)\s*):scope/g, '$1#' + this.id);
            var result = doc[method](selectors);
            this.id = id;
            return result;
          } else {
            return nativ.call(this, selectors);
          }
        }
      });
    }
  })(window.document, Element.prototype);

  return Jets;
}));
