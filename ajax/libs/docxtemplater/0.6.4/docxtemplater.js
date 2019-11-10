(function() {
  var env, root;

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  root.XmlUtil = root.XmlUtil = (function() {
    function XmlUtil() {}

    XmlUtil.prototype.getListXmlElements = function(text, start, end) {
      var i, innerCurrentTag, innerLastTag, justOpened, lastTag, result, tag, tags, _i, _len;
      if (start == null) {
        start = 0;
      }
      if (end == null) {
        end = text.length - 1;
      }

      /*
      		get the different closing and opening tags between two texts (doesn't take into account tags that are opened then closed (those that are closed then opened are returned)):
      		returns:[{"tag":"</w:r>","offset":13},{"tag":"</w:p>","offset":265},{"tag":"</w:tc>","offset":271},{"tag":"<w:tc>","offset":828},{"tag":"<w:p>","offset":883},{"tag":"<w:r>","offset":1483}]
       */
      tags = DocUtils.preg_match_all("<(\/?[^/> ]+)([^>]*)>", text.substr(start, end));
      result = [];
      for (i = _i = 0, _len = tags.length; _i < _len; i = ++_i) {
        tag = tags[i];
        if (tag[1][0] === '/') {
          justOpened = false;
          if (result.length > 0) {
            lastTag = result[result.length - 1];
            innerLastTag = lastTag.tag.substr(1, lastTag.tag.length - 2);
            innerCurrentTag = tag[1].substr(1);
            if (innerLastTag === innerCurrentTag) {
              justOpened = true;
            }
          }
          if (justOpened) {
            result.pop();
          } else {
            result.push({
              tag: '<' + tag[1] + '>',
              offset: tag.offset
            });
          }
        } else if (tag[2][tag[2].length - 1] === '/') {

        } else {
          result.push({
            tag: '<' + tag[1] + '>',
            offset: tag.offset
          });
        }
      }
      return result;
    };

    XmlUtil.prototype.getListDifferenceXmlElements = function(text, start, end) {
      var scope;
      if (start == null) {
        start = 0;
      }
      if (end == null) {
        end = text.length - 1;
      }
      scope = this.getListXmlElements(text, start, end);
      while (1.) {
        if (scope.length <= 1) {
          break;
        }
        if (scope[0].tag.substr(2) === scope[scope.length - 1].tag.substr(1)) {
          scope.pop();
          scope.shift();
        } else {
          break;
        }
      }
      return scope;
    };

    return XmlUtil;

  })();

}).call(this);

(function() {
  var TemplaterState, env, root;

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  root.TemplaterState = TemplaterState = (function() {
    function TemplaterState() {}

    TemplaterState.prototype.moveCharacters = function(numXmlTag, newTextLength, oldTextLength) {
      var k, _i, _ref, _results;
      if (typeof newTextLength !== 'number') {
        return this.moveCharacters(numXmlTag, newTextLength.length, oldTextLength);
      }
      if (typeof oldTextLength !== 'number') {
        return this.moveCharacters(numXmlTag, newTextLength, oldTextLength.length);
      }
      _results = [];
      for (k = _i = numXmlTag, _ref = this.matches.length; numXmlTag <= _ref ? _i <= _ref : _i >= _ref; k = numXmlTag <= _ref ? ++_i : --_i) {
        _results.push(this.charactersAdded[k] += newTextLength - oldTextLength);
      }
      return _results;
    };

    TemplaterState.prototype.calcStartTag = function(tag) {
      return this.calcPosition(tag.start);
    };

    TemplaterState.prototype.calcXmlTagPosition = function(xmlTagNumber) {
      return this.matches[xmlTagNumber].offset + this.charactersAdded[xmlTagNumber];
    };

    TemplaterState.prototype.calcEndTag = function(tag) {
      return this.calcPosition(tag.end) + 1;
    };

    TemplaterState.prototype.calcPosition = function(bracket) {
      return this.matches[bracket.numXmlTag].offset + this.matches[bracket.numXmlTag][1].length + this.charactersAdded[bracket.numXmlTag] + bracket.numCharacter;
    };

    TemplaterState.prototype.findOuterTagsContent = function(content) {
      var end, start;
      start = this.calcStartTag(this.loopOpen);
      end = this.calcEndTag(this.loopClose);
      return {
        content: content.substr(start, end - start),
        start: start,
        end: end
      };
    };

    TemplaterState.prototype.findInnerTagsContent = function(content) {
      var end, start;
      start = this.calcEndTag(this.loopOpen);
      end = this.calcStartTag(this.loopClose);
      return {
        content: content.substr(start, end - start),
        start: start,
        end: end
      };
    };

    TemplaterState.prototype.initialize = function() {
      this.inForLoop = false;
      this.loopIsInverted = false;
      this.inTag = false;
      this.inDashLoop = false;
      this.rawXmlTag = false;
      return this.textInsideTag = "";
    };

    TemplaterState.prototype.startTag = function(char) {
      if (this.inTag === true) {
        throw new Error("Tag already open with text: " + this.textInsideTag);
      }
      this.inTag = true;
      this.rawXmlTag = false;
      this.textInsideTag = "";
      return this.tagStart = this.currentStep;
    };

    TemplaterState.prototype.loopType = function() {
      if (this.inDashLoop) {
        return 'dash';
      }
      if (this.inForLoop) {
        return 'for';
      }
      if (this.rawXmlTag) {
        return 'xml';
      }
      return 'simple';
    };

    TemplaterState.prototype.isLoopClosingTag = function() {
      return this.textInsideTag[0] === '/' && ('/' + this.loopOpen.tag === this.textInsideTag);
    };

    TemplaterState.prototype.endTag = function() {
      var dashInnerRegex;
      if (this.inTag === false) {
        throw new Error("Tag already closed");
      }
      this.inTag = false;
      this.tagEnd = this.currentStep;
      if (this.textInsideTag[0] === '@' && this.loopType() === 'simple') {
        this.rawXmlTag = true;
        this.tag = this.textInsideTag.substr(1);
      }
      if (this.textInsideTag[0] === '#' && this.loopType() === 'simple') {
        this.inForLoop = true;
        this.loopOpen = {
          'start': this.tagStart,
          'end': this.tagEnd,
          'tag': this.textInsideTag.substr(1)
        };
      }
      if (this.textInsideTag[0] === '^' && this.loopType() === 'simple') {
        this.inForLoop = true;
        this.loopIsInverted = true;
        this.loopOpen = {
          'start': this.tagStart,
          'end': this.tagEnd,
          'tag': this.textInsideTag.substr(1)
        };
      }
      if (this.textInsideTag[0] === '-' && this.loopType() === 'simple') {
        this.inDashLoop = true;
        dashInnerRegex = /^-([a-zA-Z_:]+) ([a-zA-Z_:]+)$/;
        this.loopOpen = {
          'start': this.tagStart,
          'end': this.tagEnd,
          'tag': this.textInsideTag.replace(dashInnerRegex, '$2'),
          'element': this.textInsideTag.replace(dashInnerRegex, '$1')
        };
      }
      if (this.textInsideTag[0] === '/') {
        return this.loopClose = {
          'start': this.tagStart,
          'end': this.tagEnd
        };
      }
    };

    return TemplaterState;

  })();

}).call(this);

(function() {
  var env, root,
    __slice = [].slice;

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  root.DocUtils = {};

  root.docX = [];

  root.docXData = [];

  DocUtils.escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  };

  DocUtils.charMap = {
    '&': "&amp;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };

  DocUtils.wordToUtf8 = function(string) {
    var endChar, startChar, _ref;
    _ref = DocUtils.charMap;
    for (endChar in _ref) {
      startChar = _ref[endChar];
      string = string.replace(new RegExp(DocUtils.escapeRegExp(startChar), "g"), endChar);
    }
    return string;
  };

  DocUtils.utf8ToWord = function(string) {
    var endChar, startChar, _ref;
    _ref = DocUtils.charMap;
    for (startChar in _ref) {
      endChar = _ref[startChar];
      string = string.replace(new RegExp(DocUtils.escapeRegExp(startChar), "g"), endChar);
    }
    return string;
  };

  DocUtils.defaultParser = function(tag) {
    return {
      'get': function(scope) {
        return scope[tag];
      }
    };
  };

  DocUtils.nl2br = function(str, is_xhtml) {
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
  };

  DocUtils.loadDoc = function(path, options) {
    var a, async, basePath, callback, data, e, errorCallback, fileName, httpRegex, intelligentTagging, loadFile, noDocx, req, reqCallback, totalPath, urloptions, xhrDoc;
    if (options == null) {
      options = {};
    }
    noDocx = options.docx != null ? !options.docx : false;
    async = options.async != null ? options.async : false;
    intelligentTagging = options.intelligentTagging != null ? options.intelligentTagging : false;
    callback = options.callback != null ? options.callback : null;
    basePath = "";
    if (path == null) {
      throw new Error('path not defined');
    }
    if (path.indexOf('/') !== -1) {
      totalPath = path;
      fileName = totalPath;
    } else {
      fileName = path;
      if (basePath === "" && (DocUtils.pathConfig != null)) {
        if (env === 'browser') {
          basePath = DocUtils.pathConfig.browser;
        } else {
          basePath = DocUtils.pathConfig.node;
        }
      }
      totalPath = basePath + path;
    }
    loadFile = function(data) {
      root.docXData[fileName] = data;
      if (noDocx === false) {
        root.docX[fileName] = new DocxGen(data, {}, {
          intelligentTagging: intelligentTagging
        });
        return root.docX[fileName];
      }
      if (callback != null) {
        callback(root.docXData[fileName]);
      }
      if (async === false) {
        return root.docXData[fileName];
      }
    };
    if (env === 'browser') {
      xhrDoc = new XMLHttpRequest();
      xhrDoc.open('GET', totalPath, async);
      if (xhrDoc.overrideMimeType) {
        xhrDoc.overrideMimeType('text/plain; charset=x-user-defined');
      }
      xhrDoc.onreadystatechange = function(e) {
        if (this.readyState === 4) {
          if (this.status === 200) {
            return loadFile(this.response);
          } else {
            if (callback != null) {
              return callback(true);
            }
          }
        }
      };
      xhrDoc.send();
    } else {
      httpRegex = new RegExp("(https?)", "i");
      if (httpRegex.test(path)) {
        urloptions = url.parse(path);
        options = {
          hostname: urloptions.hostname,
          path: urloptions.path,
          method: 'GET',
          rejectUnauthorized: false
        };
        errorCallback = function(e) {
          throw new Error("Error on HTTPS Call");
        };
        reqCallback = function(res) {
          var data;
          res.setEncoding('binary');
          data = "";
          res.on('data', function(chunk) {
            return data += chunk;
          });
          return res.on('end', function() {
            return loadFile(data);
          });
        };
        switch (urloptions.protocol) {
          case "https:":
            req = https.request(options, reqCallback).on('error', errorCallback);
            break;
          case 'http:':
            req = http.request(options, reqCallback).on('error', errorCallback);
        }
        req.end();
      } else {
        if (async === true) {
          fs.readFile(totalPath, "binary", function(err, data) {
            if (err) {
              if (callback != null) {
                return callback(true);
              }
            } else {
              loadFile(data);
              if (callback != null) {
                return callback(data);
              }
            }
          });
        } else {
          try {
            data = fs.readFileSync(totalPath, "binary");
            a = loadFile(data);
            if (callback != null) {
              callback(data);
            } else {
              return a;
            }
          } catch (_error) {
            e = _error;
            if (callback != null) {
              callback();
            }
          }
        }
      }
    }
    return fileName;
  };

  DocUtils.tags = {
    start: '{',
    end: '}'
  };

  DocUtils.clone = function(obj) {
    var flags, key, newInstance;
    if ((obj == null) || typeof obj !== 'object') {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
      flags = '';
      if (obj.global != null) {
        flags += 'g';
      }
      if (obj.ignoreCase != null) {
        flags += 'i';
      }
      if (obj.multiline != null) {
        flags += 'm';
      }
      if (obj.sticky != null) {
        flags += 'y';
      }
      return new RegExp(obj.source, flags);
    }
    newInstance = new obj.constructor();
    for (key in obj) {
      newInstance[key] = DocUtils.clone(obj[key]);
    }
    return newInstance;
  };

  DocUtils.xml2Str = function(xmlNode) {
    var a, content, e;
    if (xmlNode === void 0) {
      throw new Error("xmlNode undefined!");
    }
    try {
      if (typeof global !== "undefined" && global !== null) {
        a = new XMLSerializer();
        content = a.serializeToString(xmlNode);
      } else {
        content = (new XMLSerializer()).serializeToString(xmlNode);
      }
    } catch (_error) {
      e = _error;
      content = xmlNode.xml;
    }
    return content = content.replace(/\x20xmlns=""/g, '');
  };

  DocUtils.Str2xml = function(str) {
    var parser, xmlDoc;
    if (root.DOMParser) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(str, "text/xml");
    } else {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(str);
    }
    return xmlDoc;
  };

  DocUtils.replaceFirstFrom = function(string, search, replace, from) {
    return string.substr(0, from) + string.substr(from).replace(search, replace);
  };

  DocUtils.encode_utf8 = function(s) {
    return unescape(encodeURIComponent(s));
  };

  DocUtils.convert_spaces = function(s) {
    return s.replace(new RegExp(String.fromCharCode(160), "g"), " ");
  };

  DocUtils.decode_utf8 = function(s) {
    var e;
    try {
      if (s === void 0) {
        return void 0;
      }
      return decodeURIComponent(escape(DocUtils.convert_spaces(s)));
    } catch (_error) {
      e = _error;
      console.log(s);
      console.log('could not decode');
      throw new Error('end');
    }
  };

  DocUtils.base64encode = function(b) {
    return btoa(unescape(encodeURIComponent(b)));
  };

  DocUtils.preg_match_all = function(regex, content) {

    /*regex is a string, content is the content. It returns an array of all matches with their offset, for example:
    	regex=la
    	content=lolalolilala
    	returns: [{0:'la',offset:2},{0:'la',offset:8},{0:'la',offset:10}]
     */
    var matchArray, replacer;
    if (!(typeof regex === 'object')) {
      regex = new RegExp(regex, 'g');
    }
    matchArray = [];
    replacer = function() {
      var match, offset, pn, string, _i;
      match = arguments[0], pn = 4 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 2) : (_i = 1, []), offset = arguments[_i++], string = arguments[_i++];
      pn.unshift(match);
      pn.offset = offset;
      return matchArray.push(pn);
    };
    content.replace(regex, replacer);
    return matchArray;
  };

  DocUtils.sizeOfObject = function(obj) {
    var key, log, size;
    size = 0;
    log = 0;
    for (key in obj) {
      size++;
    }
    return size;
  };

  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };

  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };

}).call(this);

(function() {
  var ImgManager, env, root,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  ImgManager = ImgManager = (function() {
    var imageExtensions;

    imageExtensions = ['gif', 'jpeg', 'jpg', 'emf', 'png'];

    function ImgManager(zip) {
      this.zip = zip;
    }

    ImgManager.prototype.getImageList = function() {
      var extension, imageList, index, regex;
      regex = /[^.]+\.([^.]+)/;
      imageList = [];
      for (index in this.zip.files) {
        extension = index.replace(regex, '$1');
        if (__indexOf.call(imageExtensions, extension) >= 0) {
          imageList.push({
            "path": index,
            files: this.zip.files[index]
          });
        }
      }
      return imageList;
    };

    ImgManager.prototype.setImage = function(fileName, data, options) {
      if (options == null) {
        options = {};
      }
      this.zip.remove(fileName);
      return this.zip.file(fileName, data, options);
    };

    ImgManager.prototype.loadImageRels = function() {
      var RidArray, content, tag;
      content = DocUtils.decode_utf8(this.zip.files["word/_rels/document.xml.rels"].asText());
      this.xmlDoc = DocUtils.Str2xml(content);
      RidArray = (function() {
        var _i, _len, _ref, _results;
        _ref = this.xmlDoc.getElementsByTagName('Relationship');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tag = _ref[_i];
          _results.push(parseInt(tag.getAttribute("Id").substr(3)));
        }
        return _results;
      }).call(this);
      this.maxRid = RidArray.max();
      this.imageRels = [];
      return this;
    };

    ImgManager.prototype.addExtensionRels = function(contentType, extension) {
      var addTag, content, defaultTags, newTag, tag, types, xmlDoc, _i, _len;
      content = this.zip.files["[Content_Types].xml"].asText();
      xmlDoc = DocUtils.Str2xml(content);
      addTag = true;
      defaultTags = xmlDoc.getElementsByTagName('Default');
      for (_i = 0, _len = defaultTags.length; _i < _len; _i++) {
        tag = defaultTags[_i];
        if (tag.getAttribute('Extension') === extension) {
          addTag = false;
        }
      }
      if (addTag) {
        types = xmlDoc.getElementsByTagName("Types")[0];
        newTag = xmlDoc.createElement('Default');
        newTag.namespaceURI = null;
        newTag.setAttribute('ContentType', contentType);
        newTag.setAttribute('Extension', extension);
        types.appendChild(newTag);
        return this.setImage("[Content_Types].xml", DocUtils.encode_utf8(DocUtils.xml2Str(xmlDoc)));
      }
    };

    ImgManager.prototype.addImageRels = function(imageName, imageData) {
      var extension, file, newTag, relationships;
      if (this.zip.files["word/media/" + imageName] != null) {
        throw new Error('file already exists');
        return false;
      }
      this.maxRid++;
      file = {
        'name': "word/media/" + imageName,
        'data': imageData,
        'options': {
          base64: false,
          binary: true,
          compression: null,
          date: new Date(),
          dir: false
        }
      };
      this.zip.file(file.name, file.data, file.options);
      extension = imageName.replace(/[^.]+\.([^.]+)/, '$1');
      this.addExtensionRels("image/" + extension, extension);
      relationships = this.xmlDoc.getElementsByTagName("Relationships")[0];
      newTag = this.xmlDoc.createElement('Relationship');
      newTag.namespaceURI = null;
      newTag.setAttribute('Id', "rId" + this.maxRid);
      newTag.setAttribute('Type', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image');
      newTag.setAttribute('Target', "media/" + imageName);
      relationships.appendChild(newTag);
      this.setImage("word/_rels/document.xml.rels", DocUtils.encode_utf8(DocUtils.xml2Str(this.xmlDoc)));
      return this.maxRid;
    };

    ImgManager.prototype.getImageByRid = function(rId) {
      var cRId, path, relationship, relationships, _i, _len;
      relationships = this.xmlDoc.getElementsByTagName('Relationship');
      for (_i = 0, _len = relationships.length; _i < _len; _i++) {
        relationship = relationships[_i];
        cRId = relationship.getAttribute('Id');
        if (rId === cRId) {
          path = relationship.getAttribute('Target');
          if (path.substr(0, 6) === 'media/') {
            return this.zip.files["word/" + path];
          } else {
            throw new Error("Rid is not an image");
          }
        }
      }
      throw new Error("No Media with this Rid found");
    };

    return ImgManager;

  })();

  root.ImgManager = ImgManager;

}).call(this);


/*
Docxgen.coffee
Created by Edgar HIPP
 */

(function() {
  var DocxGen, env, path, root;

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  if (env === 'node') {
    global.http = require('http');
    global.https = require('https');
    global.fs = require('fs');
    global.vm = require('vm');
    global.DOMParser = require('xmldom').DOMParser;
    global.XMLSerializer = require('xmldom').XMLSerializer;
    path = require('path');
    global.PNG = require(path.join(__dirname, '../vendor/pngjs/png-node'));
    global.url = require('url');
    ["grid.js", "version.js", "detector.js", "formatinf.js", "errorlevel.js", "bitmat.js", "datablock.js", "bmparser.js", "datamask.js", "rsdecoder.js", "gf256poly.js", "gf256.js", "decoder.js", "qrcode.js", "findpat.js", "alignpat.js", "databr.js"].forEach(function(file) {
      return vm.runInThisContext(global.fs.readFileSync(__dirname + '/../vendor/jsqrcode/' + file), file);
    });
    ['jszip.js'].forEach(function(file) {
      return vm.runInThisContext(global.fs.readFileSync(__dirname + '/../vendor/jszip2.0/dist/' + file), file);
    });
  }

  root.DocxGen = DocxGen = (function() {
    var defaultImageCreator, templatedFiles;

    templatedFiles = ["word/document.xml", "word/footer1.xml", "word/footer2.xml", "word/footer3.xml", "word/header1.xml", "word/header2.xml", "word/header3.xml"];

    defaultImageCreator = function(arg, callback) {
      var result;
      result = JSZip.base64.decode("iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACXSURBVDhPtY7BDYAwDAMZhCf7b8YMxeCoatOQJhWc/KGxT2zlCyaWcz8Y+X7Bs1TFVJSwIHIYyFkQufWIRVX9cNJyW1QpEo4rixaEe7JuQagAUctb7ZFYFh5MVJPBe84CVBnB42//YsZRgKjFDBVg3cI9WbRwXLktQJX8cNIiFhM1ZuTWk7PIYSBhkVcLzwIiCjCxhCjlAkBqYnqFoQQ2AAAAAElFTkSuQmCC");
      return callback(result);
    };

    function DocxGen(content, Tags, options) {
      this.Tags = Tags != null ? Tags : {};
      this.options = options;
      this.setOptions(this.options);
      this.finishedCallback = function() {};
      this.localImageCreator = defaultImageCreator;
      this.filesProcessed = 0;
      this.qrCodeNumCallBack = 0;
      this.qrCodeWaitingFor = [];
      if (content != null) {
        if (content.length > 0) {
          this.load(content);
        }
      }
    }

    DocxGen.prototype.setOptions = function(options) {
      this.options = options;
      if (this.options != null) {
        this.intelligentTagging = this.options.intelligentTagging != null ? this.options.intelligentTagging : true;
        this.qrCode = this.options.qrCode != null ? this.options.qrCode : false;
        if (this.options.parser != null) {
          return this.parser = options.parser;
        }
      }
    };

    DocxGen.prototype.loadFromFile = function(path, options) {
      var promise;
      if (options == null) {
        options = {};
      }
      this.setOptions(options);
      promise = {
        success: function(fun) {
          return this.successFun = fun;
        },
        successFun: function() {}
      };
      if (options.docx == null) {
        options.docx = false;
      }
      if (options.async == null) {
        options.async = false;
      }
      if (options.callback == null) {
        options.callback = (function(_this) {
          return function(rawData) {
            _this.load(rawData);
            return promise.successFun(_this);
          };
        })(this);
      }
      DocUtils.loadDoc(path, options);
      if (options.async === false) {
        return this;
      } else {
        return promise;
      }
    };

    DocxGen.prototype.qrCodeCallBack = function(num, add) {
      var index;
      if (add == null) {
        add = true;
      }
      if (add === true) {
        this.qrCodeWaitingFor.push(num);
      } else if (add === false) {
        index = this.qrCodeWaitingFor.indexOf(num);
        this.qrCodeWaitingFor.splice(index, 1);
      }
      return this.testReady();
    };

    DocxGen.prototype.testReady = function() {
      if (this.qrCodeWaitingFor.length === 0 && this.filesProcessed === templatedFiles.length) {
        this.ready = true;
        return this.finishedCallback();
      }
    };

    DocxGen.prototype.getImageList = function() {
      return this.imgManager.getImageList();
    };

    DocxGen.prototype.setImage = function(path, data, options) {
      if (options == null) {
        options = {};
      }
      if (options.binary == null) {
        options.binary = true;
      }
      return this.imgManager.setImage(path, data, options);
    };

    DocxGen.prototype.load = function(content) {
      this.loadedContent = content;
      this.zip = new JSZip(content);
      this.imgManager = (new ImgManager(this.zip)).loadImageRels();
      return this;
    };

    DocxGen.prototype.applyTags = function(Tags, qrCodeCallback) {
      var currentFile, fileName, _i, _j, _len, _len1;
      this.Tags = Tags != null ? Tags : this.Tags;
      if (qrCodeCallback == null) {
        qrCodeCallback = null;
      }
      for (_i = 0, _len = templatedFiles.length; _i < _len; _i++) {
        fileName = templatedFiles[_i];
        if (this.zip.files[fileName] == null) {
          this.filesProcessed++;
        }
      }
      for (_j = 0, _len1 = templatedFiles.length; _j < _len1; _j++) {
        fileName = templatedFiles[_j];
        if (!(this.zip.files[fileName] != null)) {
          continue;
        }
        currentFile = new DocXTemplater(this.zip.files[fileName].asText(), {
          DocxGen: this,
          Tags: this.Tags,
          intelligentTagging: this.intelligentTagging,
          qrCodeCallback: qrCodeCallback,
          parser: this.parser
        });
        this.setData(fileName, currentFile.applyTags().content);
        this.filesProcessed++;
      }
      return this.testReady();
    };

    DocxGen.prototype.setData = function(fileName, data, options) {
      if (options == null) {
        options = {};
      }
      this.zip.remove(fileName);
      return this.zip.file(fileName, data, options);
    };

    DocxGen.prototype.getTags = function() {
      var currentFile, fileName, usedTags, usedTemplateV, _i, _len;
      usedTags = [];
      for (_i = 0, _len = templatedFiles.length; _i < _len; _i++) {
        fileName = templatedFiles[_i];
        if (!(this.zip.files[fileName] != null)) {
          continue;
        }
        currentFile = new DocXTemplater(this.zip.files[fileName].asText(), {
          DocxGen: this,
          Tags: this.Tags,
          intelligentTagging: this.intelligentTagging,
          parser: this.parser
        });
        usedTemplateV = currentFile.applyTags().usedTags;
        if (DocUtils.sizeOfObject(usedTemplateV)) {
          usedTags.push({
            fileName: fileName,
            vars: usedTemplateV
          });
        }
      }
      return usedTags;
    };

    DocxGen.prototype.setTags = function(Tags) {
      this.Tags = Tags;
      return this;
    };

    DocxGen.prototype.output = function(options) {
      var result;
      if (options == null) {
        options = {};
      }
      if (options.download == null) {
        options.download = true;
      }
      if (options.name == null) {
        options.name = "output.docx";
      }
      if (options.type == null) {
        options.type = "base64";
      }
      result = this.zip.generate({
        type: options.type
      });
      if (options.download) {
        if (env === 'node') {
          fs.writeFile(process.cwd() + '/' + options.name, result, 'base64', function(err) {
            if (err) {
              throw err;
            }
            if (options.callback != null) {
              return options.callback();
            }
          });
        } else {
          document.location.href = "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64," + result;
        }
      }
      return result;
    };

    DocxGen.prototype.getFullText = function(path) {
      var usedData;
      if (path == null) {
        path = "word/document.xml";
      }
      usedData = this.zip.files[path].asText();
      return (new DocXTemplater(usedData, {
        DocxGen: this,
        Tags: this.Tags,
        intelligentTagging: this.intelligentTagging
      })).getFullText();
    };

    DocxGen.prototype.download = function(swfpath, imgpath, filename) {
      var output;
      if (filename == null) {
        filename = "default.docx";
      }
      output = this.zip.generate();
      return Downloadify.create('downloadify', {
        filename: function() {
          return filename;
        },
        data: function() {
          return output;
        },
        onCancel: function() {
          return alert('You have cancelled the saving of this file.');
        },
        onError: function() {
          return alert('You must put something in the File Contents or there will be nothing to save!');
        },
        swf: swfpath,
        downloadImage: imgpath,
        width: 100,
        height: 30,
        transparent: true,
        append: false,
        dataType: 'base64'
      });
    };

    return DocxGen;

  })();

  if (env === 'node') {
    module.exports = root.DocxGen;
  }

}).call(this);

(function() {
  var ImgReplacer, env, root;

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  ImgReplacer = ImgReplacer = (function() {
    function ImgReplacer(xmlTemplater) {
      this.xmlTemplater = xmlTemplater;
      this.imgMatches = [];
      this.xmlTemplater.numQrCode = 0;
      this;
    }

    ImgReplacer.prototype.findImages = function() {
      this.imgMatches = DocUtils.preg_match_all(/<w:drawing[^>]*>.*?<a:blip.r:embed.*?<\/w:drawing>/g, this.xmlTemplater.content);
      return this;
    };

    ImgReplacer.prototype.replaceImages = function() {
      var match, u, _i, _len, _ref;
      this.qr = [];
      this.xmlTemplater.numQrCode += this.imgMatches.length;
      _ref = this.imgMatches;
      for (u = _i = 0, _len = _ref.length; _i < _len; u = ++_i) {
        match = _ref[u];
        this.replaceImage(match, u);
      }
      return this;
    };

    ImgReplacer.prototype.imageSetter = function(docxqrCode) {
      if (docxqrCode.callbacked === true) {
        return;
      }
      docxqrCode.callbacked = true;
      docxqrCode.xmlTemplater.numQrCode--;
      docxqrCode.xmlTemplater.DocxGen.setImage("word/media/" + docxqrCode.imgName, docxqrCode.data);
      return docxqrCode.xmlTemplater.DocxGen.qrCodeCallBack(docxqrCode.num, false);
    };

    ImgReplacer.prototype.replaceImage = function(match, u) {
      var imageTag, imgName, mockedQrCode, newId, oldFile, rId, replacement, tag, tagrId, xmlImg;
      xmlImg = DocUtils.Str2xml('<?xml version="1.0" ?><w:document mc:Ignorable="w14 wp14" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">' + match[0] + '</w:document>');
      if (env === 'browser') {
        tagrId = xmlImg.getElementsByTagNameNS('*', 'blip')[0];
      }
      if (env === 'node') {
        tagrId = xmlImg.getElementsByTagName("a:blip")[0];
      }
      if (tagrId === void 0) {
        throw new Error('tagRiD undefined !');
      }
      rId = tagrId.getAttribute('r:embed');
      oldFile = this.xmlTemplater.DocxGen.imgManager.getImageByRid(rId);
      if (env === 'browser') {
        tag = xmlImg.getElementsByTagNameNS('*', 'docPr')[0];
      }
      if (env === 'node') {
        tag = xmlImg.getElementsByTagName("wp:docPr")[0];
      }
      if (tag === void 0) {
        throw new Error('tag undefined');
      }
      if (tag.getAttribute("name").substr(0, 6) === "Copie_") {
        return;
      }
      imgName = ("Copie_" + this.xmlTemplater.imageId + ".png").replace(/\x20/, "");
      this.xmlTemplater.DocxGen.qrCodeNumCallBack++;
      this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack, true);
      newId = this.xmlTemplater.DocxGen.imgManager.addImageRels(imgName, "");
      this.xmlTemplater.imageId++;
      this.xmlTemplater.DocxGen.setImage("word/media/" + imgName, oldFile.data);
      tag.setAttribute('name', "" + imgName);
      tagrId.setAttribute('r:embed', "rId" + newId);
      if (env === 'browser') {
        imageTag = xmlImg.getElementsByTagNameNS('*', 'drawing')[0];
      }
      if (env === 'node') {
        imageTag = xmlImg.getElementsByTagName('w:drawing')[0];
      }
      if (imageTag === void 0) {
        throw new Error('imageTag undefined');
      }
      replacement = DocUtils.xml2Str(imageTag);
      this.xmlTemplater.content = this.xmlTemplater.content.replace(match[0], replacement);
      if (env === 'browser') {
        this.qr[u] = new DocxQrCode(oldFile.asBinary(), this.xmlTemplater, imgName, this.xmlTemplater.DocxGen.qrCodeNumCallBack);
        return this.qr[u].decode(this.imageSetter);
      } else {
        if (/\.png$/.test(oldFile.name)) {
          return (function(_this) {
            return function(imgName) {
              var base64, binaryData, dat, finished, png;
              base64 = JSZip.base64.encode(oldFile.asBinary());
              binaryData = new Buffer(base64, 'base64');
              png = new PNG(binaryData);
              finished = function(a) {
                var e, mockedQrCode;
                png.decoded = a;
                try {
                  _this.qr[u] = new DocxQrCode(png, _this.xmlTemplater, imgName, _this.xmlTemplater.DocxGen.qrCodeNumCallBack);
                  return _this.qr[u].decode(_this.imageSetter);
                } catch (_error) {
                  e = _error;
                  mockedQrCode = {
                    xmlTemplater: _this.xmlTemplater,
                    imgName: imgName,
                    data: oldFile.asBinary()
                  };
                  return _this.imageSetter(mockedQrCode);
                }
              };
              return dat = png.decode(finished);
            };
          })(this)(imgName);
        } else {
          mockedQrCode = {
            xmlTemplater: this.xmlTemplater,
            imgName: imgName,
            data: oldFile.asBinary()
          };
          return this.imageSetter(mockedQrCode);
        }
      }
    };

    return ImgReplacer;

  })();

  root.ImgReplacer = ImgReplacer;

}).call(this);

(function() {
  var DocxQrCode, env, root;

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  DocxQrCode = DocxQrCode = (function() {
    function DocxQrCode(imageData, xmlTemplater, imgName, num, callback) {
      this.xmlTemplater = xmlTemplater;
      this.imgName = imgName != null ? imgName : "";
      this.num = num;
      this.callback = callback;
      this.callbacked = false;
      this.data = imageData;
      if (this.data === void 0) {
        throw new Error("data of qrcode can't be undefined");
      }
      if (env === 'browser') {
        this.base64Data = JSZip.base64.encode(this.data);
      }
      this.ready = false;
      this.result = null;
    }

    DocxQrCode.prototype.decode = function(callback) {
      var _this;
      this.callback = callback;
      _this = this;
      this.qr = new QrCode();
      this.qr.callback = function() {
        var testdoc;
        _this.ready = true;
        _this.result = this.result;
        testdoc = new _this.xmlTemplater.currentClass(this.result, _this.xmlTemplater.toJson());
        testdoc.applyTags();
        _this.result = testdoc.content;
        return _this.searchImage();
      };
      if (env === 'browser') {
        return this.qr.decode("data:image/png;base64," + this.base64Data);
      } else {
        return this.qr.decode(this.data, this.data.decoded);
      }
    };

    DocxQrCode.prototype.searchImage = function() {
      var callback, loadDocCallback;
      if (this.result.substr(0, 4) === 'gen:') {
        callback = (function(_this) {
          return function(data) {
            _this.data = data;
            return _this.callback(_this, _this.imgName, _this.num);
          };
        })(this);
        return this.xmlTemplater.DocxGen.localImageCreator(this.result, callback);
      } else if (this.result !== null && this.result !== void 0 && this.result.substr(0, 22) !== 'error decoding QR Code') {
        loadDocCallback = (function(_this) {
          return function(data) {
            _this.data = data;
            return _this.callback(_this, _this.imgName, _this.num);
          };
        })(this);
        return DocUtils.loadDoc(this.result, {
          docx: false,
          callback: loadDocCallback,
          async: false
        });
      } else {
        return this.callback(this, this.imgName, this.num);
      }
    };

    return DocxQrCode;

  })();

  root.DocxQrCode = DocxQrCode;

}).call(this);

(function() {
  var XmlTemplater, env, root;

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  root.XmlTemplater = XmlTemplater = (function() {
    function XmlTemplater(content, options) {
      if (content == null) {
        content = "";
      }
      if (options == null) {
        options = {};
      }
      this.tagXml = '';
      this.currentClass = root.XmlTemplater;
      this.fromJson(options);
      this.templaterState = new TemplaterState;
      this.currentScope = this.Tags;
    }

    XmlTemplater.prototype.load = function(content) {
      var xmlMatcher;
      this.content = content;
      xmlMatcher = new XmlMatcher(this.content).parse(this.tagXml);
      this.templaterState.matches = xmlMatcher.matches;
      return this.templaterState.charactersAdded = xmlMatcher.charactersAdded;
    };

    XmlTemplater.prototype.fromJson = function(options) {
      if (options == null) {
        options = {};
      }
      this.Tags = options.Tags != null ? options.Tags : {};
      this.DocxGen = options.DocxGen != null ? options.DocxGen : null;
      this.intelligentTagging = options.intelligentTagging != null ? options.intelligentTagging : false;
      this.scopePath = options.scopePath != null ? options.scopePath : [];
      this.usedTags = options.usedTags != null ? options.usedTags : {};
      this.imageId = options.imageId != null ? options.imageId : 0;
      this.parser = options.parser != null ? options.parser : root.DocUtils.defaultParser;
      return this.scopeManager = new ScopeManager(this.Tags, this.scopePath, this.usedTags, this.Tags, this.parser);
    };

    XmlTemplater.prototype.toJson = function() {
      return {
        Tags: DocUtils.clone(this.scopeManager.tags),
        DocxGen: this.DocxGen,
        intelligentTagging: DocUtils.clone(this.intelligentTagging),
        scopePath: DocUtils.clone(this.scopeManager.scopePath),
        usedTags: this.scopeManager.usedTags,
        localImageCreator: this.localImageCreator,
        imageId: this.imageId,
        parser: this.parser
      };
    };

    XmlTemplater.prototype.calcIntellegentlyDashElement = function() {
      return false;
    };

    XmlTemplater.prototype.getFullText = function(tagXml) {
      var match, matcher, output;
      this.tagXml = tagXml != null ? tagXml : this.tagXml;
      matcher = new XmlMatcher(this.content).parse(this.tagXml);
      output = (function() {
        var _i, _len, _ref, _results;
        _ref = matcher.matches;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          match = _ref[_i];
          _results.push(match[2]);
        }
        return _results;
      })();
      return DocUtils.wordToUtf8(DocUtils.convert_spaces(output.join("")));
    };


    /*
    	content is the whole content to be tagged
    	scope is the current scope
    	returns the new content of the tagged content
     */

    XmlTemplater.prototype.applyTags = function() {
      var character, innerText, m, match, numCharacter, numXmlTag, t, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      this.templaterState.initialize();
      _ref = this.templaterState.matches;
      for (numXmlTag = _i = 0, _len = _ref.length; _i < _len; numXmlTag = ++_i) {
        match = _ref[numXmlTag];
        innerText = match[2];
        for (numCharacter = _j = 0, _len1 = innerText.length; _j < _len1; numCharacter = ++_j) {
          character = innerText[numCharacter];
          this.templaterState.currentStep = {
            'numXmlTag': numXmlTag,
            'numCharacter': numCharacter
          };
          _ref1 = this.templaterState.matches;
          for (t = _k = 0, _len2 = _ref1.length; _k < _len2; t = ++_k) {
            m = _ref1[t];
            if (t === numXmlTag) {
              if (this.content[m.offset + this.templaterState.charactersAdded[t]] !== m[0][0]) {
                throw new Error("no < at the beginning of " + m[0][0] + " (2)");
              }
            }
          }
          if (character === DocUtils.tags.start) {
            this.templaterState.startTag();
          } else if (character === DocUtils.tags.end) {
            this.templaterState.endTag();
            if (this.templaterState.loopType() === 'simple') {
              this.replaceSimpleTag();
            }
            if (this.templaterState.loopType() === 'xml') {
              this.replaceSimpleTagRawXml();
              break;
            } else if (this.templaterState.isLoopClosingTag()) {
              return this.replaceLoopTag();
            }
          } else {
            if (this.templaterState.inTag === true) {
              this.templaterState.textInsideTag += character;
            }
          }
        }
      }
      if ((this.DocxGen != null) && this.DocxGen.qrCode) {
        new ImgReplacer(this).findImages().replaceImages();
      }
      return this;
    };

    XmlTemplater.prototype.replaceSimpleTag = function() {
      var newValue;
      newValue = this.scopeManager.getValueFromScope(this.templaterState.textInsideTag);
      this.content = this.replaceTagByValue(DocUtils.utf8ToWord(newValue));
      return this.content;
    };

    XmlTemplater.prototype.replaceSimpleTagRawXml = function() {
      var newText, subContent;
      subContent = new SubContent(this.content).getInnerTag(this.templaterState).getOuterXml('w:p');
      newText = this.scopeManager.getValueFromScope(this.templaterState.tag);
      this.templaterState.moveCharacters(this.templaterState.tagStart.numXmlTag, newText, subContent.text);
      return this.content = subContent.replace(newText).fullText;
    };

    XmlTemplater.prototype.deleteOuterTags = function(outerXmlText, sharp) {
      var xmlText;
      this.templaterState.tagEnd = {
        "numXmlTag": this.templaterState.loopOpen.end.numXmlTag,
        "numCharacter": this.templaterState.loopOpen.end.numCharacter
      };
      this.templaterState.tagStart = {
        "numXmlTag": this.templaterState.loopOpen.start.numXmlTag,
        "numCharacter": this.templaterState.loopOpen.start.numCharacter
      };
      if (sharp === false) {
        this.templaterState.textInsideTag = "-" + this.templaterState.loopOpen.element + " " + this.templaterState.loopOpen.tag;
      }
      if (sharp === true) {
        this.templaterState.textInsideTag = "#" + this.templaterState.loopOpen.tag;
      }
      xmlText = this.replaceTagByValue("", outerXmlText);
      this.templaterState.tagEnd = {
        "numXmlTag": this.templaterState.loopClose.end.numXmlTag,
        "numCharacter": this.templaterState.loopClose.end.numCharacter
      };
      this.templaterState.tagStart = {
        "numXmlTag": this.templaterState.loopClose.start.numXmlTag,
        "numCharacter": this.templaterState.loopClose.start.numCharacter
      };
      this.templaterState.textInsideTag = "/" + this.templaterState.loopOpen.tag;
      return this.replaceTagByValue("", xmlText);
    };

    XmlTemplater.prototype.dashLoop = function(elementDashLoop, sharp) {
      var end, innerXmlText, outerXml, outerXmlText, start, _, _ref;
      if (sharp == null) {
        sharp = false;
      }
      _ref = this.templaterState.findOuterTagsContent(this.content), _ = _ref._, start = _ref.start, end = _ref.end;
      outerXml = this.getOuterXml(this.content, start, end, elementDashLoop);
      this.templaterState.moveCharacters(0, "", outerXml.startTag);
      outerXmlText = outerXml.text;
      innerXmlText = this.deleteOuterTags(outerXmlText, sharp);
      return this.forLoop(innerXmlText, outerXmlText);
    };

    XmlTemplater.prototype.xmlToBeReplaced = function(noStartTag, spacePreserve, insideValue, xmlTagNumber) {
      if (noStartTag === true) {
        return insideValue;
      } else {
        if (spacePreserve === true) {
          return "<" + this.tagXml + " xml:space=\"preserve\">" + insideValue + "</" + this.tagXml + ">";
        } else {
          return this.templaterState.matches[xmlTagNumber][1] + insideValue + ("</" + this.tagXml + ">");
        }
      }
    };

    XmlTemplater.prototype.replaceXmlTag = function(content, options) {
      var insideValue, noStartTag, replacer, spacePreserve, startTag, xmlTagNumber;
      xmlTagNumber = options.xmlTagNumber;
      insideValue = options.insideValue;
      spacePreserve = options.spacePreserve != null ? options.spacePreserve : true;
      noStartTag = options.noStartTag != null ? options.noStartTag : false;
      replacer = this.xmlToBeReplaced(noStartTag, spacePreserve, insideValue, xmlTagNumber);
      this.templaterState.matches[xmlTagNumber][2] = insideValue;
      startTag = this.templaterState.calcXmlTagPosition(xmlTagNumber);
      this.templaterState.moveCharacters(xmlTagNumber + 1, replacer, this.templaterState.matches[xmlTagNumber][0]);
      if (content.indexOf(this.templaterState.matches[xmlTagNumber][0]) === -1) {
        throw new Error("content " + this.templaterState.matches[xmlTagNumber][0] + " not found in content");
      }
      content = DocUtils.replaceFirstFrom(content, this.templaterState.matches[xmlTagNumber][0], replacer, startTag);
      this.templaterState.matches[xmlTagNumber][0] = replacer;
      return content;
    };

    XmlTemplater.prototype.replaceTagByValue = function(newValue, content) {
      var eTag, k, options, regexLeft, regexRight, sTag, subMatches, _i, _ref, _ref1;
      if (content == null) {
        content = this.content;
      }
      if ((this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2].indexOf(DocUtils.tags.end)) === -1) {
        throw new Error("no closing tag at @templaterState.tagEnd.numXmlTag " + this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2]);
      }
      if ((this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].indexOf(DocUtils.tags.start)) === -1) {
        throw new Error("no opening tag at @templaterState.tagStart.numXmlTag " + this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2]);
      }
      sTag = DocUtils.tags.start;
      eTag = DocUtils.tags.end;
      if (this.templaterState.tagEnd.numXmlTag === this.templaterState.tagStart.numXmlTag) {
        options = {
          xmlTagNumber: this.templaterState.tagStart.numXmlTag,
          insideValue: this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].replace("" + sTag + this.templaterState.textInsideTag + eTag, newValue),
          noStartTag: (this.templaterState.matches[this.templaterState.tagStart.numXmlTag].first != null) || (this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last != null)
        };
        content = this.replaceXmlTag(content, options);
      } else if (this.templaterState.tagEnd.numXmlTag > this.templaterState.tagStart.numXmlTag) {
        regexRight = new RegExp("^([^" + sTag + "]*)" + sTag + ".*$");
        subMatches = this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].match(regexRight);
        options = {
          xmlTagNumber: this.templaterState.tagStart.numXmlTag
        };
        if ((this.templaterState.matches[this.templaterState.tagStart.numXmlTag].first == null) && (this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last == null)) {
          options.insideValue = subMatches[1] + newValue;
        } else {
          options.insideValue = newValue;
          options.noStartTag = this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last != null;
        }
        content = this.replaceXmlTag(content, options);
        options = {
          insideValue: "",
          spacePreserve: false
        };
        for (k = _i = _ref = this.templaterState.tagStart.numXmlTag + 1, _ref1 = this.templaterState.tagEnd.numXmlTag; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; k = _ref <= _ref1 ? ++_i : --_i) {
          options.xmlTagNumber = k;
          content = this.replaceXmlTag(content, options);
        }
        regexLeft = new RegExp("^[^" + eTag + "]*" + eTag + "(.*)$");
        options = {
          insideValue: this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2].replace(regexLeft, '$1'),
          spacePreserve: true,
          xmlTagNumber: k
        };
        content = this.replaceXmlTag(content, options);
      }
      return content;
    };

    XmlTemplater.prototype.replaceLoopTag = function() {
      var dashElement;
      if (this.templaterState.loopType() === 'dash') {
        return this.dashLoop(this.templaterState.loopOpen.element);
      }
      if (this.intelligentTagging === true) {
        dashElement = this.calcIntellegentlyDashElement();
        if (dashElement !== false) {
          return this.dashLoop(dashElement, true);
        }
      }
      return this.forLoop();
    };

    XmlTemplater.prototype.calcSubXmlTemplater = function(innerTagsContent, argOptions) {
      var options, subfile, subsubfile;
      options = this.toJson();
      if (argOptions != null) {
        if (argOptions.Tags != null) {
          options.Tags = argOptions.Tags;
          options.scopePath = options.scopePath.concat(this.templaterState.loopOpen.tag);
        }
      }
      subfile = new this.currentClass(innerTagsContent, options);
      subsubfile = subfile.applyTags();
      this.imageId = subfile.imageId;
      return subsubfile;
    };

    XmlTemplater.prototype.getOuterXml = function(text, start, end, xmlTag) {
      var endTag, startTag;
      endTag = text.indexOf('</' + xmlTag + '>', end);
      if (endTag === -1) {
        throw new Error("can't find endTag " + endTag);
      }
      endTag += ('</' + xmlTag + '>').length;
      startTag = Math.max(text.lastIndexOf('<' + xmlTag + '>', start), text.lastIndexOf('<' + xmlTag + ' ', start));
      if (startTag === -1) {
        throw new Error("can't find startTag");
      }
      return {
        "text": text.substr(startTag, endTag - startTag),
        startTag: startTag,
        endTag: endTag
      };
    };

    XmlTemplater.prototype.forLoop = function(innerTagsContent, outerTagsContent) {
      var newContent, tag;
      if (innerTagsContent == null) {
        innerTagsContent = this.templaterState.findInnerTagsContent(this.content).content;
      }
      if (outerTagsContent == null) {
        outerTagsContent = this.templaterState.findOuterTagsContent(this.content).content;
      }

      /*
      			<w:t>{#forTag} blabla</w:t>
      			Blabla1
      			Blabla2
      			<w:t>{/forTag}</w:t>
      
      			Let innerTagsContent be what is in between the first closing tag and the second opening tag | blabla....Blabla2<w:t>|
      			Let outerTagsContent what is in between the first opening tag  and the last closing tag     |{#forTag} blabla....Blabla2<w:t>{/forTag}|
      			We replace outerTagsContent by n*innerTagsContent, n is equal to the length of the array in scope forTag
      			<w:t>subContent subContent subContent</w:t>
       */
      tag = this.templaterState.loopOpen.tag;
      newContent = "";
      this.scopeManager.loopOver(tag, (function(_this) {
        return function(subTags) {
          var subfile;
          subfile = _this.calcSubXmlTemplater(innerTagsContent, {
            Tags: subTags
          });
          return newContent += subfile.content;
        };
      })(this), this.templaterState.loopIsInverted);
      if (this.scopeManager.get(tag) == null) {
        this.calcSubXmlTemplater(innerTagsContent, {
          Tags: {}
        });
      }
      this.content = this.content.replace(outerTagsContent, newContent);
      return this.calcSubXmlTemplater(this.content);
    };

    return XmlTemplater;

  })();

}).call(this);

(function() {
  var DocXTemplater, env, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  root.DocXTemplater = DocXTemplater = (function(_super) {
    var xmlUtil;

    __extends(DocXTemplater, _super);

    xmlUtil = new XmlUtil();

    function DocXTemplater(content, options) {
      if (content == null) {
        content = "";
      }
      if (options == null) {
        options = {};
      }
      DocXTemplater.__super__.constructor.call(this, "", options);
      this.currentClass = root.DocXTemplater;
      this.tagXml = 'w:t';
      if (typeof content === "string") {
        this.load(content);
      } else {
        throw new Error("content must be string!");
      }
    }

    DocXTemplater.prototype.calcIntellegentlyDashElement = function() {
      var content, end, scopeContent, start, t, _i, _len, _ref;
      _ref = this.templaterState.findOuterTagsContent(this.content), content = _ref.content, start = _ref.start, end = _ref.end;
      scopeContent = xmlUtil.getListXmlElements(this.content, start, end - start);
      for (_i = 0, _len = scopeContent.length; _i < _len; _i++) {
        t = scopeContent[_i];
        if (t.tag === '<w:tc>') {
          return 'w:tr';
        }
      }
      return DocXTemplater.__super__.calcIntellegentlyDashElement.call(this);
    };

    return DocXTemplater;

  })(XmlTemplater);

}).call(this);

(function() {
  var XmlMatcher, env, root,
    __slice = [].slice;

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  root.XmlMatcher = XmlMatcher = (function() {
    function XmlMatcher(content) {
      this.content = content;
    }

    XmlMatcher.prototype.parse = function(tagXml) {
      var i;
      this.tagXml = tagXml;
      this.matches = DocUtils.preg_match_all("(<" + this.tagXml + "[^>]*>)([^<>]*)</" + this.tagXml + ">", this.content);
      this.charactersAdded = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = this.matches.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push(0);
        }
        return _results;
      }).call(this);
      this.handleRecursiveCase();
      return this;
    };

    XmlMatcher.prototype.handleRecursiveCase = function() {

      /*
      		Because xmlTemplater is recursive (meaning it can call it self), we need to handle special cases where the XML is not valid:
      		For example with this string "I am</w:t></w:r></w:p><w:p><w:r><w:t>sleeping",
      			- we need to match also the string that is inside an implicit <w:t> (that's the role of replacerUnshift) (in this case 'I am')
      			- we need to match the string that is at the right of a <w:t> (that's the role of replacerPush) (in this case 'sleeping')
      		the test: describe "scope calculation" it "should compute the scope between 2 <w:t>" makes sure that this part of code works
      		It should even work if they is no XML at all, for example if the code is just "I am sleeping", in this case however, they should only be one match
       */
      var regex, replacerPush, replacerUnshift;
      replacerUnshift = (function(_this) {
        return function() {
          var match, offset, pn, string, _i;
          match = arguments[0], pn = 4 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 2) : (_i = 1, []), offset = arguments[_i++], string = arguments[_i++];
          pn.unshift(match);
          pn.offset = offset;
          pn.first = true;
          _this.matches.unshift(pn);
          return _this.charactersAdded.unshift(0);
        };
      })(this);
      this.content.replace(/^()([^<]+)/, replacerUnshift);
      replacerPush = (function(_this) {
        return function() {
          var match, offset, pn, string, _i;
          match = arguments[0], pn = 4 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 2) : (_i = 1, []), offset = arguments[_i++], string = arguments[_i++];
          pn.unshift(match);
          pn.offset = offset;
          pn.last = true;
          _this.matches.push(pn);
          return _this.charactersAdded.push(0);
        };
      })(this);
      regex = "(<" + this.tagXml + "[^>]*>)([^>]+)$";
      this.content.replace(new RegExp(regex), replacerPush);
      return this;
    };

    return XmlMatcher;

  })();

}).call(this);

(function() {
  var ScopeManager, env, root;

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  root.ScopeManager = ScopeManager = (function() {
    function ScopeManager(tags, scopePath, usedTags, currentScope, parser) {
      this.tags = tags;
      this.scopePath = scopePath;
      this.usedTags = usedTags;
      this.currentScope = currentScope;
      this.parser = parser;
    }

    ScopeManager.prototype.loopOver = function(tag, callback, inverted) {
      var i, scope, _i, _len, _ref;
      if (inverted == null) {
        inverted = false;
      }
      if (inverted) {
        if (!this.getValue(tag)) {
          return callback(this.currentScope);
        }
        if (this.getTypeOf(tag) === 'string') {
          return;
        }
        if (this.getTypeOf(tag) === 'object' && this.getValue(tag).length < 1) {
          callback(this.currentScope);
        }
        return;
      }
      if (this.getValue(tag) == null) {
        return;
      }
      if (this.getTypeOf(tag) === 'object') {
        _ref = this.getValue(tag);
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          scope = _ref[i];
          callback(scope);
        }
      }
      if (this.getValue(tag) === true) {
        return callback(this.currentScope);
      }
    };

    ScopeManager.prototype.get = function(tag) {
      return this.currentScope[tag];
    };

    ScopeManager.prototype.getTypeOf = function(tag) {
      return typeof this.getValue(tag);
    };

    ScopeManager.prototype.getValue = function(tag) {
      var parser, result;
      parser = this.parser(tag);
      result = parser.get(this.currentScope);
      return result;
    };

    ScopeManager.prototype.getValueFromScope = function(tag) {
      var result, value;
      result = this.getValue(tag);
      if (result != null) {
        if (typeof result === 'string') {
          this.useTag(tag);
          value = result;
          if (value.indexOf(DocUtils.tags.start) !== -1 || value.indexOf(DocUtils.tags.end) !== -1) {
            throw new Error("You can't enter " + DocUtils.tags.start + " or	" + DocUtils.tags.end + " inside the content of a variable");
          }
        } else if (typeof result === "number") {
          value = String(result);
        } else {
          value = result;
        }
      } else {
        this.useTag(tag);
        value = "undefined";
      }
      return value;
    };

    ScopeManager.prototype.useTag = function(tag) {
      var i, s, u, _i, _len, _ref;
      u = this.usedTags;
      _ref = this.scopePath;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        s = _ref[i];
        if (u[s] == null) {
          u[s] = {};
        }
        u = u[s];
      }
      if (tag !== "") {
        return u[tag] = true;
      }
    };

    return ScopeManager;

  })();

}).call(this);

(function() {
  var SubContent, env, root;

  root = typeof global !== "undefined" && global !== null ? global : window;

  env = typeof global !== "undefined" && global !== null ? 'node' : 'browser';

  root.SubContent = SubContent = (function() {
    function SubContent(fullText) {
      this.fullText = fullText != null ? fullText : "";
      this.text = "";
      this.start = 0;
      this.end = 0;
    }

    SubContent.prototype.getInnerTag = function(templaterState) {
      this.start = templaterState.calcPosition(templaterState.tagStart);
      this.end = templaterState.calcPosition(templaterState.tagEnd) + 1;
      return this.refreshText();
    };

    SubContent.prototype.refreshText = function() {
      this.text = this.fullText.substr(this.start, this.end - this.start);
      return this;
    };

    SubContent.prototype.getOuterXml = function(xmlTag) {
      this.end = this.fullText.indexOf('</' + xmlTag + '>', this.end);
      if (this.end === -1) {
        throw new Error("can't find endTag " + this.end);
      }
      this.end += ('</' + xmlTag + '>').length;
      this.start = Math.max(this.fullText.lastIndexOf('<' + xmlTag + '>', this.start), this.fullText.lastIndexOf('<' + xmlTag + ' ', this.start));
      if (this.start === -1) {
        throw new Error("can't find startTag");
      }
      return this.refreshText();
    };

    SubContent.prototype.replace = function(newText) {
      this.fullText = this.fullText.substr(0, this.start) + newText + this.fullText.substr(this.end);
      this.end = this.start + newText.length;
      return this.refreshText();
    };

    return SubContent;

  })();

}).call(this);
