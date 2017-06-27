var Plates = (typeof process !== 'undefined' && typeof process.title !== 'undefined') ? exports : {};

!function(exports) {

  var _toString = Object.prototype.toString,
      isArray = Array.isArray || function (o) {
        return _toString.call(o) === "[object Array]";
      };

  var Merge = function Merge() {};

  Merge.prototype = {

    nest: [],

    tag: new RegExp([
      '<',
      '(/?)', // 2 - is closing
      '([-:\\w]+)', // 3 - name
      '((?:[-\\w]+(?:', '=',
      '(?:\\w+|["|\'](?:.*)["|\']))?)*)', // 4 - attributes
      '(/?)', // 5 - is self-closing
      '>'
    ].join('\\s*')),

    attr: /([\-\w]*)=(?:["\']([\-\.\w\s\/:;&#]*)["\'])/gi,

    hasClass: function(str, className) {
      return str.split(' ').indexOf(className) > -1;
    },

    iterate: function(html, value, components, tagname, key) {

      var output  = '',
          segment = html.slice(
            html.search(components.input),
            html.lastIndexOf(tagname) + tagname.length + 1
          ),

          data = {};

      // Is it an array?
      if (isArray(value)) {

        // Yes: set the output to the result of iterating through the array
        for (var i = 0, l = value.length; i < l; i++) {

          // If there is a key, then we have a simple object and
          // must construct a simple object to use as the data
          if (key) {
            data[key] = value[i];
          } else {
            data = value[i];
          }

          output += this.bind(segment, data);

        }

        return output;

      }

      // Is it an object?
      else if (typeof value === 'object') {

        // We need to refine the selection now that we know we're dealing with a
        // nested object
        segment = segment.slice(components.input.length, -(tagname.length + 3));
        return output += this.bind(segment, value);

      }

      return value;

    },

    bind: function bind(html, data, map) {

      if (isArray(data)) {
        var output = '';
        for (var i = 0, l = data.length; i<l; i++) {
          output += this.bind(html, data[i], map);
        }
        return output;
      }

      html = html || '';
      data = data || {};

      var that = this;

      var openers = 0,
          components,
          attributes,
          mappings = map && map.mappings,
          intag = false,
          tagname = '',
          isClosing = false,
          isSelfClosing = false,
          matchmode = false,
          createAttribute = map && map.conf && map.conf.create,
          closing,
          tagbody;

      var c,
          buffer = '',
          left;

      for (var i = 0, l = html.length; i < l; i++) {
        c = html[i];

        if (c === '!' && intag && !matchmode) {
          intag = false;
          buffer += html.slice(left, i+1);
        }
        else if (c === '<' && !intag) {
          closing = true;
          intag = true;
          left = i;
        }
        else if (c === '>' && intag) {

          intag = false;
          tagbody = html.slice(left, i+1);
          components = this.tag.exec(tagbody);

          if(!components) {
            intag = true;
            continue;
          }

          isClosing = components[1];
          tagname = components[2];
          attributes = components[3];
          isSelfClosing = components[4];

          if (matchmode) {

            //
            // and its a closing.
            //
            if (!!isClosing) {

              if (openers <= 0) {
                matchmode = false;
              }
              else {
                --openers;
              }
            }
            //
            // and its not a self-closing tag
            //
            else if (!isSelfClosing) {
              ++openers;
            }
          }

          if (!isClosing && !matchmode) {

            //
            // if there is a match in progress and
            //
            if (mappings && mappings.length > 0) {

              for (var ii = mappings.length - 1; ii >= 0; ii--) {

                var setAttribute = false
                  , shouldSetAttribute = mappings[ii].re && attributes.match(mappings[ii].re);

                tagbody = tagbody.replace(this.attr, function(str, key, value, a) {

                  var newdata = mappings[ii].dataKey ? data[mappings[ii].dataKey] : data[key];

                  if (shouldSetAttribute && mappings[ii].replace !== key) {

                    return str;
                  }
                  else if (shouldSetAttribute || typeof mappings[ii].replacePartial1 !== 'undefined') {

                    setAttribute = true;

                    //
                    // determine if we should use the replace argument or some value from the data object.
                    //
                    if (typeof mappings[ii].replacePartial2 !== 'undefined') {
                      newdata = value.replace(mappings[ii].replacePartial1, mappings[ii].replacePartial2);
                    }
                    else if (typeof mappings[ii].replacePartial1 !== 'undefined' && mappings[ii].dataKey) {

                      newdata = value.replace(mappings[ii].replacePartial1, data[mappings[ii].dataKey]);
                    }

                    return key + '="' + (newdata || '') + '"';
                  }
                  else if (!mappings[ii].replace && mappings[ii].attribute === key) {

                    if (
                      mappings[ii].value === value || 
                      that.hasClass(value, mappings[ii].value || 
                      mappings.conf.where === key) ||
                      ( ({}).toString.call(mappings[ii].value) === '[object RegExp]' && 
                        mappings[ii].value.exec(value) !== null) ) {

                      var v = data[mappings[ii].dataKey];

                      newdata = tagbody + newdata;

                      if (isArray(v)) {

                        newdata = that.iterate(html, v, components, tagname, value);
                        // If the item is an array, then we need to tell
                        // Plates that we're dealing with nests
                        that.nest.push(tagname);
                      } 
                      else if (typeof v === 'object') {

                        newdata = tagbody + that.iterate(html, v, components, tagname, value);
                      }

                      buffer += newdata || '';
                      matchmode = true;
                    }
                  }
                  return str;
                });

                if (createAttribute && shouldSetAttribute && !setAttribute) {
                  var spliced = isSelfClosing? 2 : 1;
                  var close = isSelfClosing? '/>': '>';
                  var left = tagbody.substr(0, tagbody.length - spliced);
                  if (left[left.length - 1] == ' ') {
                    left = left.substr(0, left.length - 1);
                    if (isSelfClosing) {
                      close = ' ' + close;
                    }
                  }
                  tagbody = [
                    left,
                    ' ',
                    mappings[ii].replace,
                    '="',
                    data[mappings[ii].dataKey],
                    '"',
                    close
                  ].join('');
                }

              }
            }
            else {

              //
              // if there is no map, we are just looking to match
              // the specified id to a data key in the data object.
              //
              tagbody.replace(
                this.attr,
                function (attr, key, value, idx) {
                  if (key === map && map.conf.where || 'id' && data[value]) {

                    var v      = data[value],
                        nest = isArray(v),
                        output = (nest || typeof v === 'object') ? that.iterate(html, v, components, tagname, value) : v;

                    // If the item is an array, then we need to tell
                    // Plates that we're dealing with nests
                    if (nest) { that.nest.push(tagname); }

                    buffer += nest ? output : tagbody + output;
                    matchmode = true;
                  }
                }
              );
            }
          }

          //
          // if there is currently no match in progress
          // just write the tagbody to the buffer.
          //
          if (!matchmode && that.nest.length === 0) {
            buffer += tagbody;
          } else if (!matchmode && that.nest.length) {
              this.nest.pop();
          }

        }
        else if (!intag && !matchmode) {

          //
          // currently not inside a tag and there is no
          // match in progress, we can write the char to
          // the buffer.
          //
          buffer += c;
        }

      }
      return buffer;
    }

  };

  var Mapper = function Mapper(conf) {
    if (!(this instanceof Mapper)) { return new Mapper(conf); }
    this.mappings = [];
    this.conf = conf || {};
  };

  function last(newitem) {
    
    if (newitem) {

      this.mappings.push({});
    }
    var m = this.mappings[this.mappings.length-1];

    if (m && m.attribute && m.value && m.dataKey && m.replace) {
      m.re = new RegExp(m.attribute + '=([\'"]?)' + m.value + '\\1');
    
    } else {
    
      delete m && m.re;
    }
    return m;
  }

  Mapper.prototype = {
    replace: function(val1, val2) {
      var l = last.call(this);
      l.replacePartial1 = val1;
      l.replacePartial2 = val2;
      return this;
    },
    use: function(val) {
      last.call(this).dataKey = val;
      return last.call(this) && this;
    },
    to: function(val) {
      return this.use(val);
    },
    where: function(val) {
      last.call(this, true).attribute = val;
      return last.call(this) && this;
    },

    class: function(val) {
      return this.where('class').is(val);
    },
    tag: function(val) {
      last.call(this, true).tag = val;
      return this;
    },

    is: function(val) {
      last.call(this).value = val;
      return last.call(this) && this;
    },
    has: function(val) {
      last.call(this).value = val;
      this.replace(val);
      return last.call(this) && this;
    },
    insert: function(val) {
      var l = last.call(this);
      l.replace = l.attribute;
      l.dataKey = val;
      return last.call(this) && this;
    },
    as: function(val) {
      last.call(this).replace = val;
      return last.call(this) && this;
    }
  };

  // where('class').is('foo').insert('bla')

  exports.bind = function (html, data, map) {
    var merge = new Merge();
    return merge.bind(html, data, map);
  };

  exports.Map = Mapper;

}(Plates);
