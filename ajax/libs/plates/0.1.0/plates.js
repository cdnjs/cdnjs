;!function(undefined) {
  var parser = {};

  var tag = new RegExp(
        [
          '\\s*',
          '<',
          '(/?)', // 1 - is closing
          '([-:\\w]+)', // 2 - name
          '((?:\\s+[-\\w]+(?:', '=', '(?:' +
            '\\w+|' +
            '"[^"]*"|' +
            '\'[^\']*\'))?)*)', // 3 - attributes
          '(/?)', // 4 - is self-closing
          '>'
        ].join('\\s*'),
        'gi'
      ),
      attr = new RegExp(
        '([-\\w]+)=(?:([-\\w]+)|["\']([-\\w\\s]+)["\'])',
        'gi'
      );


  //
  // ### function parseAttrs(attrs, elem, map)
  // #### @attrs {}
  //
  function parseAttrs(attrs, elem, map) {

    var result = {};

    attrs.replace(attr, function(all, name, value1, value2) {
      var value = value1 || value2;

      value = name === 'class' ? value.trim().split(/\s+/) : value;
      result[name] = value;

      // Update attr map
      var submap = (map[name] || (map[name] = {}));

      if (name !== 'class') {
        value = [value];
      }

      value.forEach(function (value) {
        (submap[value] || (submap[value] = [])).push(elem);
      });
    });

    return result;
  };

  //
  // ### function execute(html)
  // #### @html {String} a string literal of html
  // builds a tree that represents the parsed html string
  //
  parser.execute = function execute(html) {
    var index = 0,
        current,
        tree = current = { type: 'root', tag: null, elems: [], map: {} },
        stack = [];

    while (matched = tag.exec(html)) {
      // Create text node if needed
      if (index !== matched.index) {
        current.elems.push({
          type: 'text',
          body: [index, matched.index]
        });
      }

      index = matched.index + matched[0].length;

      var name = matched[2].toLowerCase(),
          elem = {
            type: 'tag',
            name: name,
            elems: [],
            body: [matched.index, matched.index + matched[0].length]
          };

      // Parse attributes and update attr map
      elem.attrs = matched[3] && parseAttrs(matched[3], elem, tree.map);

      // If current tag is closing
      if (matched[1]) {
        var i;

        // Close all not-matched tags (i.e. pop stack)
        while (i = stack.pop() && i && name !== i.name);

        // Select new current node
        current = stack[stack.length - 1] || tree;

        // If we've no opening tag for current one
        if (typeof i === 'undefined') {
          // Create one w/o inserting it into stack
          elem.selfclose = true;
          current.elems.push(elem);
        }
      }
      // If tag is self-closing
      else if (matched[4]) {
        elem.selfclose = true;
        current.elems.push(elem);
      }
      // If tag is opening
      else {
        current.elems.push(elem);
        stack.push(current = elem);
      }
    }

    // We have some trailing text
    if (index !== html.length) {
      current.elems.push({
        type: 'text',
        body: [index, html.length]
      });
    }

    return tree;
  };

  //
  // ### Plates(html, data, conf)
  // #### @html {String} The string of raw html to be parsed.
  // #### @data {Object | Array} The data to merge with the raw html.
  // #### @conf {Object} an object literal that contains configuration settings.
  // constructor
  //
  function Plates(html, data, map) {

    typeof html === 'string' && this.html(html || '');
    this._data = data || {};
    this._out = '';

    this._map = map;
  }

  //
  // ### function html
  // #### @html {String}
  //
  Plates.prototype.html = function(html) {
    if (html) {
      this._html = html;
      this._tree = parser.execute(this._html);

      return this;
    }
    return this._html;
  };

  //
  // ### function data
  // #### @data {Object} a JSON object
  //
  Plates.prototype.data = function(data) {
    if (data) {
      this._data = data;
      return this;
    }
    return this._data;
  };

  //
  // ### function _reduce (map, callback)
  // #### @map
  // #### @callback
  // Traverse html tree and return html splitted by inception intervals
  //
  Plates.prototype._reduce = function(map) {
    if (map) this._map = map;

    var that = this,
        elems,
        key,
        html = this._html,
        treeMap = this._tree.map,
        intervals = [];

    for (var d in this._data) {
      //
      // if there is no local map, try the id, then
      // as a last effort try to find `data-bind`.
      //
      key = this._map && this._map[d] || 'id';
      elems = treeMap[key] && treeMap[key][d] ||
              treeMap['data-bind'] && treeMap['data-bind'][d];
      //
      // if there are elelemts, there will always
      // be an array of them.
      //
      elems && elems.forEach(function(elem) {
        intervals.push([elem.body[1], d]);
      });
    }

    intervals.sort(function(a, b) {
      return a > b ? 1 : a === b ? 0 : -1;
    });

    var result = [],
        last = intervals.reduce(function(start, interval) {
          result.push(html.slice(start, interval[0]), interval[1]);

          return interval[0];
        }, 0);

    result.push(html.slice(last));

    return result;
  };

  //
  // ### function bind(map)
  // #### @map {Object} an object literal with keys
  // that correspond to attriubtes found in the data.
  //
  Plates.prototype.bind = function(map) {
    var that = this;

    return this._reduce(map).map(function(str, i) {
      if (i % 2 === 0) return str;

      return that._data[str];
    }).join('');
  };

  //
  // ### function compile(map)
  // #### @map {Object} an object literal with keys
  // that correspond to attriubtes found in the data.
  // Same as .bind(), but creates compiled version of function
  //
  Plates.prototype.compile = function(map) {
    var that = this,
        body = ['return [', this._reduce(map).map(function(str, i) {
          if (i % 2 === 0) return JSON.stringify(str);

          return 'data[' + JSON.stringify(str) + ']';
        }).join(','), '].join(\'\')'].join('');

    return new Function('data', body);
  };

  //
  // export
  //
  if(typeof process !== 'undefined' && process.title === 'node') {
    module.exports = Plates
  }
  else {
    window.Plates = Plates;
  }

}();
