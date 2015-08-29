/*! Clusterize.js - v0.5.0 - 2015-05-05
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
  }());

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

    // private parameters
    var rows = data.rows || [],
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
    scrollEv = function () {
      if (last_cluster != (last_cluster = self.getClusterNum()))
        self.insertToDOM(rows, cache);
    }
    on('scroll', self.scroll_elem, scrollEv);

    // public methods
    self.destroy = function(clean) {
      off('scroll', self.scroll_elem, scrollEv);
      self.html(clean ? self.generateEmptyRow().join('') : rows.join(''));
    }
    self.update = function(new_rows) {
      rows = isArray(new_rows)
        ? new_rows
        : [];
      var scroll_top = self.scroll_elem.scrollTop;
      self.insertToDOM(rows, cache);
      self.scroll_elem.scrollTop = scroll_top;
    }
    self.append = function(_new_rows) {
      var new_rows = isArray(_new_rows)
        ? _new_rows
        : [];
      if( ! new_rows.length) return;
      rows = rows.concat(new_rows);
      self.insertToDOM(rows, cache);
    }
    self.clear = function() {
      self.update([]);
    }
    self.getRowsAmount = function() {
      return rows.length;
    }
  }
  Clusterize.prototype = {
    constructor: Clusterize,
    // get tag name, content tag name, tag height, calc cluster height
    exploreEnvironment: function(rows) {
      var opts = this.options;
      opts.content_tag = this.content_elem.tagName.toLowerCase();
      if( ! opts.item_height || ! opts.tag) {
        if( ! rows.length) return;
        if(ie && ie <= 9) opts.tag = rows[0].split('<')[1].split(' ')[0].split('>')[0];
        this.html(rows[0] + rows[0] + rows[0]);
        var node = this.content_elem.children[1];
        if( ! opts.tag) opts.tag = node.tagName.toLowerCase();
        opts.item_height = node.offsetHeight;
      }
      opts.block_height = opts.item_height * opts.rows_in_block;
      opts.rows_in_cluster = opts.blocks_in_cluster * opts.rows_in_block;
      opts.cluster_height = opts.blocks_in_cluster * opts.block_height;
    },
    // get current cluster number
    getClusterNum: function () {
      var opts = this.options;
      return Math.floor(this.scroll_elem.scrollTop / (opts.cluster_height - opts.block_height));
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
      var items_start = cluster_num * opts.rows_in_cluster - opts.rows_in_block * cluster_num,
        items_start = items_start > 0 ? items_start : 0,
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
        div.innerHTML = '<table><tbody>' + data + '</tbody></table>'
        while((last = content_elem.lastChild)) {
          content_elem.removeChild(last)
        }
        var child_nodes = div.firstChild.firstChild.childNodes,
          ie8_child_nodes_helper = [];
        for (var i = 0, ii = child_nodes.length; i < ii; i++) {
          ie8_child_nodes_helper.push(child_nodes[i]);
        }
        var rows = Array.prototype.slice.call(ie8_child_nodes_helper);
        while (rows.length) {
          content_elem.appendChild(rows.shift());
        }
      } else {
        content_elem.innerHTML = data;
      }
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

  return Clusterize;
}));