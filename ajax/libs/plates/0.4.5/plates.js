;var Plates = (typeof process !== 'undefined' && typeof process.title !== 'undefined') ? exports : {};

!function(exports) {

  var Merge = function Merge() {};

  Merge.prototype = {

    tag: new RegExp([
      '<',
      '(/?)', // 2 - is closing
      '([-:\\w]+)', // 3 - name
      '((?:[-\\w]+(?:', '=', 
      '(?:\\w+|["|\'](?:.*)["|\']))?)*)', // 4 - attributes
      '(/?)', // 5 - is self-closing
      '>'
    ].join('\\s*')),

    attr: /([\-\w]*)=(?:["\']([\-\.\w\s\/]*)["\'])/gi,

    hasClass: function(str, className) {
      return str.indexOf(className) > -1;
    },

    bind: function bind(html, data, map) {

      if (~({}).toString.call(data).indexOf('Array')) {
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
          isSelfClosing = false
          matchmode = false;

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

          if(!components) { continue; }

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

          if (attributes && !isClosing && !matchmode) {

            //
            // if there is a match in progress and 
            //
            if (mappings && mappings.length > 0) {

              for (var ii = mappings.length - 1; ii >= 0; ii--) {

                tagbody = tagbody.replace(this.attr, function(str, key, value, a) {
                  
                  var newdata = mappings[ii].dataKey ? data[mappings[ii].dataKey] : data[key];

                  if (mappings[ii].replace === key) {

                    //
                    // if there is data intended to replace the attribute, use that
                    // otherwise look at the data structure and try to use that.
                    //
                    return key + '="' + (newdata || '') + '"';
                  }
                  else if (!mappings[ii].replace && mappings[ii].attribute === key) {

                    if (mappings[ii].value === value || that.hasClass(value, mappings[ii].value || mappings.conf.where === key)) {

                      buffer += tagbody + (newdata || '');
                      matchmode = true;
                    }
                  }

                  return str;

                });
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
                    buffer += tagbody + data[value];
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
          if (!matchmode) {
            buffer += tagbody;
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
    return this.mappings[this.mappings.length-1];
  }

  Mapper.prototype = {
    use: function(val) {
      last.call(this).dataKey = val;
      return this;
    },
    to: function(val) {
      return this.use(val);
    },
    where: function(val) {
      last.call(this, true).attribute = val;
      return this;
    },
    class: function(val) {
      return this.where('class').is(val);
    },
    is: function(val) {
      last.call(this).value = val;
      return this;
    },
    insert: function(val) {
      var l = last.call(this);
      l.replace = l.attribute;
      l.dataKey = val;
      return this;
    },
    as: function(val) {
      last.call(this).replace = val;
      return this;
    }
  };

  // where('class').is('foo').insert('bla')

  exports.bind = function (html, data, map) {
    var merge = new Merge();
    return merge.bind(html, data, map);
  };

  exports.Map = Mapper;

}(Plates);

