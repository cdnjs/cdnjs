/*! Clusterize.js - v0.12.0 - 2015-08-14
* http://NeXTs.github.com/Clusterize.js/
* Copyright (c) 2015 Denis Lukov; Licensed MIT */

;(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('Clusterize', function() {
  "use strict"

  // detect ie9 and lower
  // https://gist.github.com/padolsey/527683#comment-786682
  var ie = (function(){
    for( var v = 3,
             el = document.createElement('b'),
             all = el.all || [];
         el.innerHTML = '<!--[if gt IE ' + (++v) + ']><i><![endif]-->',
         all[0];
       ){}
    return v > 4 ? v : document.documentMode;
  }()),
  is_mac = navigator.platform.toLowerCase().indexOf('mac') + 1;

  var Clusterize = function(data) {
    if( ! (this instanceof Clusterize))
      return new Clusterize(data);
    var self = this;

    var defaults = {
      item_height: 0,
      block_height: 0,
      rows_in_block: 50,
      rows_in_cluster: 0,
      cluster_height: 0,
      blocks_in_cluster: 4,
      tag: null,
      content_tag: null,
      show_no_data_row: true,
      no_data_class: 'clusterize-no-data',
      no_data_text: 'No data',
      keep_parity: true,
      verify_change: false
    }

    // public parameters
    self.options = {};
    var options = ['rows_in_block', 'blocks_in_cluster', 'verify_change', 'show_no_data_row', 'no_data_class', 'no_data_text', 'keep_parity', 'tag'];
    for(var i = 0, option; option = options[i]; i++) {
      self.options[option] = typeof data[option] != 'undefined' && data[option] != null
        ? data[option]
        : defaults[option];
    }

    var elems = ['scroll', 'content'];
    for(var i = 0, elem; elem = elems[i]; i++) {
      self[elem + '_elem'] = data[elem + 'Id']
        ? document.getElementById(data[elem + 'Id'])
        : data[elem + 'Elem'];
      if( ! self[elem + '_elem'])
        throw new Error("Error! Could not find " + elem + " element");
    }

    // tabindex forces the browser to keep focus on the scrolling list, fixes #11
    if( ! self.content_elem.hasAttribute('tabindex'))
      self.content_elem.setAttribute('tabindex', 0);

    // private parameters
    var rows = isArray(data.rows)
        ? data.rows
        : self.fetchMarkup(),
      cache = {data: ''},
      scroll_top = self.scroll_elem.scrollTop;

    // get row height
    self.exploreEnvironment(rows);

    // append initial data
    self.insertToDOM(rows, cache);

    // restore the scroll position
    self.scroll_elem.scrollTop = scroll_top;

    // adding scroll handler
    var last_cluster = false,
    scroll_debounce = 0,
    pointer_events_set = false,
    scrollEv = function() {
      // fixes scrolling issue on Mac #3
      if (is_mac) {
          if( ! pointer_events_set) self.content_elem.style.pointerEvents = 'none';
          pointer_events_set = true;
          clearTimeout(scroll_debounce);
          scroll_debounce = setTimeout(function () {
              self.content_elem.style.pointerEvents = 'auto';
              pointer_events_set = false;
          }, 50);
      }
      if (last_cluster != (last_cluster = self.getClusterNum()))
        self.insertToDOM(rows, cache);
    },
    resize_debounce = 0,
    resizeEv = function() {
      clearTimeout(resize_debounce);
      resize_debounce = setTimeout(self.refresh, 100);
    }
    on('scroll', self.scroll_elem, scrollEv);
    on('resize', window, resizeEv);

    // public methods
    self.destroy = function(clean) {
      off('scroll', self.scroll_elem, scrollEv);
      off('resize', window, resizeEv);
      self.html((clean ? self.generateEmptyRow() : rows).join(''));
    }
    self.refresh = function() {
      self.getRowsHeight(rows) && self.update(rows);
    }
    self.update = function(new_rows) {
      rows = isArray(new_rows)
        ? new_rows
        : [];
      var scroll_top = self.scroll_elem.scrollTop;
      // fixes #39
      if(rows.length * self.options.item_height < scroll_top) {
        self.scroll_elem.scrollTop = 0;
        last_cluster = 0;
      }
      self.insertToDOM(rows, cache);
      self.scroll_elem.scrollTop = scroll_top;
    }
    self.clear = function() {
      self.update([]);
    }
    self.getRowsAmount = function() {
      return rows.length;
    }
    var add = function(where, _new_rows) {
      var new_rows = isArray(_new_rows)
        ? _new_rows
        : [];
      if( ! new_rows.length) return;
      rows = where == 'append'
        ? rows.concat(new_rows)
        : new_rows.concat(rows);
      self.insertToDOM(rows, cache);
    }
    self.append = function(rows) {
      add('append', rows);
    }
    self.prepend = function(rows) {
      add('prepend', rows);
    }
  }

  Clusterize.prototype = {
    constructor: Clusterize,
    // fetch existing markup
    fetchMarkup: function() {
      var rows = [], rows_nodes = this.getChildNodes(this.content_elem);
      while (rows_nodes.length) {
        rows.push(rows_nodes.shift().outerHTML);
      }
      return rows;
    },
    // get tag name, content tag name, tag height, calc cluster height
    exploreEnvironment: function(rows) {
      var opts = this.options;
      opts.content_tag = this.content_elem.tagName.toLowerCase();
      if( ! rows.length) return;
      if(ie && ie <= 9 && ! opts.tag) opts.tag = rows[0].match(/<([^>\s/]*)/)[1].toLowerCase();
      if(this.content_elem.children.length <= 1) this.html(rows[0] + rows[0] + rows[0]);
      if( ! opts.tag) opts.tag = this.content_elem.children[0].tagName.toLowerCase();
      this.getRowsHeight(rows);
    },
    getRowsHeight: function(rows) {
      var opts = this.options,
        prev_item_height = opts.item_height;
      opts.cluster_height = 0
      if( ! rows.length) return;
      var nodes = this.content_elem.children;
      opts.item_height = nodes[Math.ceil(nodes.length / 2)].offsetHeight;
      // consider table's border-spacing
      if(opts.tag == 'tr' && getStyle('borderCollapse', this.content_elem) != 'collapse')
        opts.item_height += parseInt(getStyle('borderSpacing', this.content_elem)) || 0;
      opts.block_height = opts.item_height * opts.rows_in_block;
      opts.rows_in_cluster = opts.blocks_in_cluster * opts.rows_in_block;
      opts.cluster_height = opts.blocks_in_cluster * opts.block_height;
      return prev_item_height != opts.item_height;
    },
    // get current cluster number
    getClusterNum: function () {
      return Math.floor(this.scroll_elem.scrollTop / (this.options.cluster_height - this.options.block_height)) || 0;
    },
    // generate empty row if no data provided
    generateEmptyRow: function() {
      var opts = this.options;
      if( ! opts.tag || ! opts.show_no_data_row) return [];
      var empty_row = document.createElement(opts.tag),
        no_data_content = document.createTextNode(opts.no_data_text), td;
      empty_row.className = opts.no_data_class;
      if(opts.tag == 'tr') {
        td = document.createElement('td');
        td.appendChild(no_data_content);
      }
      empty_row.appendChild(td || no_data_content);
      return [empty_row.outerHTML];
    },
    // generate cluster for current scroll position
    generate: function (rows, cluster_num) {
      var opts = this.options,
        rows_len = rows.length;
      if (rows_len < opts.rows_in_block) {
        return {
          rows_above: 0,
          rows: rows_len ? rows : this.generateEmptyRow()
        }
      }
      if( ! opts.cluster_height) {
        this.exploreEnvironment(rows);
      }
      var items_start = Math.max((opts.rows_in_cluster - opts.rows_in_block) * cluster_num, 0),
        items_end = items_start + opts.rows_in_cluster,
        top_space = items_start * opts.item_height,
        bottom_space = (rows_len - items_end) * opts.item_height,
        this_cluster_rows = [],
        rows_above = items_start;
      if(top_space > 0) {
        opts.keep_parity && this_cluster_rows.push(this.renderExtraTag('keep-parity'));
        this_cluster_rows.push(this.renderExtraTag('top-space', top_space));
      } else {
        rows_above++;
      }
      for (var i = items_start; i < items_end; i++) {
        rows[i] && this_cluster_rows.push(rows[i]);
      }
      bottom_space > 0 && this_cluster_rows.push(this.renderExtraTag('bottom-space', bottom_space));
      return {
        rows_above: rows_above,
        rows: this_cluster_rows
      }
    },
    renderExtraTag: function(class_name, height) {
      var tag = document.createElement(this.options.tag),
        clusterize_prefix = 'clusterize-';
      tag.className = [clusterize_prefix + 'extra-row', clusterize_prefix + class_name].join(' ');
      height && (tag.style.height = height + 'px');
      return tag.outerHTML;
    },
    // if necessary verify data changed and insert to DOM
    insertToDOM: function(rows, cache) {
      var data = this.generate(rows, this.getClusterNum()),
        outer_data = data.rows.join('');
      if( ! this.options.verify_change || this.options.verify_change && this.dataChanged(outer_data, cache)) {
        this.html(outer_data);
        this.options.content_tag == 'ol' && this.content_elem.setAttribute('start', data.rows_above);
      }
    },
    // unfortunately ie <= 9 does not allow to use innerHTML for table elements, so make a workaround
    html: function(data) {
      var content_elem = this.content_elem;
      if(ie && ie <= 9 && this.options.tag == 'tr') {
        var div = document.createElement('div'), last;
        div.innerHTML = '<table><tbody>' + data + '</tbody></table>';
        while((last = content_elem.lastChild)) {
          content_elem.removeChild(last);
        }
        var rows_nodes = this.getChildNodes(div.firstChild.firstChild);
        while (rows_nodes.length) {
          content_elem.appendChild(rows_nodes.shift());
        }
      } else {
        content_elem.innerHTML = data;
      }
    },
    getChildNodes: function(tag) {
      var child_nodes = tag.children,
          ie8_child_nodes_helper = [];
        for (var i = 0, ii = child_nodes.length; i < ii; i++) {
          ie8_child_nodes_helper.push(child_nodes[i]);
        }
        return Array.prototype.slice.call(ie8_child_nodes_helper);
    },
    dataChanged: function(data, cache) {
      var current_data = JSON.stringify(data),
        changed = current_data !== cache.data;
      return changed && (cache.data = current_data);
    }
  }

  // support functions
  function on(evt, element, fnc) {
    return element.addEventListener ? element.addEventListener(evt, fnc, false) : element.attachEvent("on" + evt, fnc);
  }
  function off(evt, element, fnc) {
    return element.removeEventListener ? element.removeEventListener(evt, fnc, false) : element.detachEvent("on" + evt, fnc);
  }
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
  function getStyle(prop, elem) {
    return window.getComputedStyle ? window.getComputedStyle(elem)[prop] : elem.currentStyle[prop];
  }

  return Clusterize;
}));