;var Plates = function main(undefined) {
  
  var Merge = function Merge() {};

  Merge.prototype = {

    tag: new RegExp(
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

    attr: new RegExp(
      '([-\\w]+)=(?:["\']([-\.\\w\\s]+)["\'])', // '([-\\w]+)=(?:([-\\w]+)|["\']([-\\w\\s]+)["\'])'
      'gi'
    ),

    bind: function bind(html, data, map) {

      while (matchedTag = this.tag.exec(html)) {
        
        //
        // must not be a closing tag, must have attributes.
        //
        if (matchedTag[1] !== '/' && matchedTag[3] !== '') {

          if (!map) {
            
            while (matchedAttr = this.attr.exec(matchedTag[3])) {

              //
              // has an attribute who's value is a match.
              //
              if (matchedAttr[1] === 'id' && data[matchedAttr[2]]) {
                var idx = matchedTag.index + matchedTag[0].length;
                html = html.slice(0, idx) + data[matchedAttr[2]] + html.slice(idx);
              }
            }

          }
          else {

            //
            // if there is a map, the user wants an explicit 
            // data-key to tag-attribute match.
            //
            var match = false, idx = 0;
            for (var key in map) {
              if (data[key]) {
                while (matchedAttr = this.attr.exec(matchedTag[3])) {

                  //
                  // an attribute who's value is a match.
                  //


                  if (matchedAttr[1] === map[key] ||
                      matchedAttr[1] === map[key][0]) {

                    match = false, idx = 0;

                    //
                    // if the preferred attribute is `class`, split the class and
                    // make sure that the actual key is a match with the data.
                    //
                    if (map[key] === 'class' || (map[key][0] && map[key][0] === 'class')) {
                      var classNames = matchedAttr[2].split(/\s+/);
                      for (var i = 0, l = classNames.length; i < l; i++) {
                        if (classNames[i] === key) {
                          match = true; break;
                        }
                      }
                    }

                    //
                    // if there is a match from the class, or there is a match of
                    // the key, then splice the data into the string where it belongs.
                    //
                    
                    if (matchedAttr[2] === key || match) {

                      var d = match ? key : matchedAttr[2];
                      
                      if (typeof map[key] === 'object') {
                        
                        //
                        // find the attribute key/value pair in the tag.
                        //
                        var att = matchedTag[0].match(
                          new RegExp(map[key][1] + '\\s*=\\s*["|\'](.*)["|\']')
                        );

                        if (map[key][1]) {
                          //
                          // determine the start and end positions.
                          //
                          var start = matchedTag.index + att.index + (att[0].length - att[1].length);
                          var end = start + att[1].length;

                          html = html.slice(0, start-1) + data[d] + html.slice(end-1);
                        }
                        else if (matchedTag[4] !== '/') {
                          //
                          // must not be a self closing tag
                          //
                          idx = matchedTag.index + matchedTag[0].length;
                          html = html.slice(0, idx) + data[d] + html.slice(idx);
                        }
                      }
                      else {
                        //
                        // insert the value as a `textnode` into the tag.
                        //
                        idx = matchedTag.index + matchedTag[0].length;
                        html = html.slice(0, idx) + data[d] + html.slice(idx);
                      }
                    }

                  }
                }
              }
            }

          }

        }
      }

      return html;
    }
  };

  return ({
    bind: function(html, data, map) {
      var merge = new Merge();
      return merge.bind(html, data, map);
    }
  });

}();

if (typeof module !== 'undefined') {
  exports.bind = function() {
    return Plates.bind.apply(this, arguments);
  };
}
