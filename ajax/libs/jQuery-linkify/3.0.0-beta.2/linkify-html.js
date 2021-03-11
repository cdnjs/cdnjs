var linkifyHtml = (function (linkify) {
    'use strict';

    /**
     * generated from https://raw.githubusercontent.com/w3c/html/26b5126f96f736f796b9e29718138919dd513744/entities.json
     * do not edit
     */
    var HTML5NamedCharRefs = {
      // We don't need the complete named character reference because linkifyHtml
      // does not modify the escape sequences. We do need &nbsp; so that
      // whitespace is parsed properly. Other types of whitespace should already
      // be accounted for
      nbsp: " "
    };
    var HEXCHARCODE = /^#[xX]([A-Fa-f0-9]+)$/;
    var CHARCODE = /^#([0-9]+)$/;
    var NAMED = /^([A-Za-z0-9]+)$/;

    var EntityParser =
    /** @class */
    function () {
      function EntityParser(named) {
        this.named = named;
      }

      EntityParser.prototype.parse = function (entity) {
        if (!entity) {
          return;
        }

        var matches = entity.match(HEXCHARCODE);

        if (matches) {
          return "&#x" + matches[1] + ";";
        }

        matches = entity.match(CHARCODE);

        if (matches) {
          return "&#" + matches[1] + ";";
        }

        matches = entity.match(NAMED);

        if (matches) {
          return this.named[matches[1]] || "&" + matches[1] + ";";
        }
      };

      return EntityParser;
    }();

    var WSP = /[\t\n\f ]/;
    var ALPHA = /[A-Za-z]/;
    var CRLF = /\r\n?/g;

    function isSpace(char) {
      return WSP.test(char);
    }

    function isAlpha(char) {
      return ALPHA.test(char);
    }

    function preprocessInput(input) {
      return input.replace(CRLF, '\n');
    }

    var EventedTokenizer =
    /** @class */
    function () {
      function EventedTokenizer(delegate, entityParser, mode) {
        if (mode === void 0) {
          mode = 'precompile';
        }

        this.delegate = delegate;
        this.entityParser = entityParser;
        this.mode = mode;
        this.state = "beforeData"
        /* beforeData */
        ;
        this.line = -1;
        this.column = -1;
        this.input = '';
        this.index = -1;
        this.tagNameBuffer = '';
        this.states = {
          beforeData: function () {
            var char = this.peek();

            if (char === '<' && !this.isIgnoredEndTag()) {
              this.transitionTo("tagOpen"
              /* tagOpen */
              );
              this.markTagStart();
              this.consume();
            } else {
              if (this.mode === 'precompile' && char === '\n') {
                var tag = this.tagNameBuffer.toLowerCase();

                if (tag === 'pre' || tag === 'textarea') {
                  this.consume();
                }
              }

              this.transitionTo("data"
              /* data */
              );
              this.delegate.beginData();
            }
          },
          data: function () {
            var char = this.peek();
            var tag = this.tagNameBuffer;

            if (char === '<' && !this.isIgnoredEndTag()) {
              this.delegate.finishData();
              this.transitionTo("tagOpen"
              /* tagOpen */
              );
              this.markTagStart();
              this.consume();
            } else if (char === '&' && tag !== 'script' && tag !== 'style') {
              this.consume();
              this.delegate.appendToData(this.consumeCharRef() || '&');
            } else {
              this.consume();
              this.delegate.appendToData(char);
            }
          },
          tagOpen: function () {
            var char = this.consume();

            if (char === '!') {
              this.transitionTo("markupDeclarationOpen"
              /* markupDeclarationOpen */
              );
            } else if (char === '/') {
              this.transitionTo("endTagOpen"
              /* endTagOpen */
              );
            } else if (char === '@' || char === ':' || isAlpha(char)) {
              this.transitionTo("tagName"
              /* tagName */
              );
              this.tagNameBuffer = '';
              this.delegate.beginStartTag();
              this.appendToTagName(char);
            }
          },
          markupDeclarationOpen: function () {
            var char = this.consume();

            if (char === '-' && this.peek() === '-') {
              this.consume();
              this.transitionTo("commentStart"
              /* commentStart */
              );
              this.delegate.beginComment();
            } else {
              var maybeDoctype = char.toUpperCase() + this.input.substring(this.index, this.index + 6).toUpperCase();

              if (maybeDoctype === 'DOCTYPE') {
                this.consume();
                this.consume();
                this.consume();
                this.consume();
                this.consume();
                this.consume();
                this.transitionTo("doctype"
                /* doctype */
                );
                if (this.delegate.beginDoctype) this.delegate.beginDoctype();
              }
            }
          },
          doctype: function () {
            var char = this.consume();

            if (isSpace(char)) {
              this.transitionTo("beforeDoctypeName"
              /* beforeDoctypeName */
              );
            }
          },
          beforeDoctypeName: function () {
            var char = this.consume();

            if (isSpace(char)) {
              return;
            } else {
              this.transitionTo("doctypeName"
              /* doctypeName */
              );
              if (this.delegate.appendToDoctypeName) this.delegate.appendToDoctypeName(char.toLowerCase());
            }
          },
          doctypeName: function () {
            var char = this.consume();

            if (isSpace(char)) {
              this.transitionTo("afterDoctypeName"
              /* afterDoctypeName */
              );
            } else if (char === '>') {
              if (this.delegate.endDoctype) this.delegate.endDoctype();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              if (this.delegate.appendToDoctypeName) this.delegate.appendToDoctypeName(char.toLowerCase());
            }
          },
          afterDoctypeName: function () {
            var char = this.consume();

            if (isSpace(char)) {
              return;
            } else if (char === '>') {
              if (this.delegate.endDoctype) this.delegate.endDoctype();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              var nextSixChars = char.toUpperCase() + this.input.substring(this.index, this.index + 5).toUpperCase();
              var isPublic = nextSixChars.toUpperCase() === 'PUBLIC';
              var isSystem = nextSixChars.toUpperCase() === 'SYSTEM';

              if (isPublic || isSystem) {
                this.consume();
                this.consume();
                this.consume();
                this.consume();
                this.consume();
                this.consume();
              }

              if (isPublic) {
                this.transitionTo("afterDoctypePublicKeyword"
                /* afterDoctypePublicKeyword */
                );
              } else if (isSystem) {
                this.transitionTo("afterDoctypeSystemKeyword"
                /* afterDoctypeSystemKeyword */
                );
              }
            }
          },
          afterDoctypePublicKeyword: function () {
            var char = this.peek();

            if (isSpace(char)) {
              this.transitionTo("beforeDoctypePublicIdentifier"
              /* beforeDoctypePublicIdentifier */
              );
              this.consume();
            } else if (char === '"') {
              this.transitionTo("doctypePublicIdentifierDoubleQuoted"
              /* doctypePublicIdentifierDoubleQuoted */
              );
              this.consume();
            } else if (char === "'") {
              this.transitionTo("doctypePublicIdentifierSingleQuoted"
              /* doctypePublicIdentifierSingleQuoted */
              );
              this.consume();
            } else if (char === '>') {
              this.consume();
              if (this.delegate.endDoctype) this.delegate.endDoctype();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            }
          },
          doctypePublicIdentifierDoubleQuoted: function () {
            var char = this.consume();

            if (char === '"') {
              this.transitionTo("afterDoctypePublicIdentifier"
              /* afterDoctypePublicIdentifier */
              );
            } else if (char === '>') {
              if (this.delegate.endDoctype) this.delegate.endDoctype();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              if (this.delegate.appendToDoctypePublicIdentifier) this.delegate.appendToDoctypePublicIdentifier(char);
            }
          },
          doctypePublicIdentifierSingleQuoted: function () {
            var char = this.consume();

            if (char === "'") {
              this.transitionTo("afterDoctypePublicIdentifier"
              /* afterDoctypePublicIdentifier */
              );
            } else if (char === '>') {
              if (this.delegate.endDoctype) this.delegate.endDoctype();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              if (this.delegate.appendToDoctypePublicIdentifier) this.delegate.appendToDoctypePublicIdentifier(char);
            }
          },
          afterDoctypePublicIdentifier: function () {
            var char = this.consume();

            if (isSpace(char)) {
              this.transitionTo("betweenDoctypePublicAndSystemIdentifiers"
              /* betweenDoctypePublicAndSystemIdentifiers */
              );
            } else if (char === '>') {
              if (this.delegate.endDoctype) this.delegate.endDoctype();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else if (char === '"') {
              this.transitionTo("doctypeSystemIdentifierDoubleQuoted"
              /* doctypeSystemIdentifierDoubleQuoted */
              );
            } else if (char === "'") {
              this.transitionTo("doctypeSystemIdentifierSingleQuoted"
              /* doctypeSystemIdentifierSingleQuoted */
              );
            }
          },
          betweenDoctypePublicAndSystemIdentifiers: function () {
            var char = this.consume();

            if (isSpace(char)) {
              return;
            } else if (char === '>') {
              if (this.delegate.endDoctype) this.delegate.endDoctype();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else if (char === '"') {
              this.transitionTo("doctypeSystemIdentifierDoubleQuoted"
              /* doctypeSystemIdentifierDoubleQuoted */
              );
            } else if (char === "'") {
              this.transitionTo("doctypeSystemIdentifierSingleQuoted"
              /* doctypeSystemIdentifierSingleQuoted */
              );
            }
          },
          doctypeSystemIdentifierDoubleQuoted: function () {
            var char = this.consume();

            if (char === '"') {
              this.transitionTo("afterDoctypeSystemIdentifier"
              /* afterDoctypeSystemIdentifier */
              );
            } else if (char === '>') {
              if (this.delegate.endDoctype) this.delegate.endDoctype();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              if (this.delegate.appendToDoctypeSystemIdentifier) this.delegate.appendToDoctypeSystemIdentifier(char);
            }
          },
          doctypeSystemIdentifierSingleQuoted: function () {
            var char = this.consume();

            if (char === "'") {
              this.transitionTo("afterDoctypeSystemIdentifier"
              /* afterDoctypeSystemIdentifier */
              );
            } else if (char === '>') {
              if (this.delegate.endDoctype) this.delegate.endDoctype();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              if (this.delegate.appendToDoctypeSystemIdentifier) this.delegate.appendToDoctypeSystemIdentifier(char);
            }
          },
          afterDoctypeSystemIdentifier: function () {
            var char = this.consume();

            if (isSpace(char)) {
              return;
            } else if (char === '>') {
              if (this.delegate.endDoctype) this.delegate.endDoctype();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            }
          },
          commentStart: function () {
            var char = this.consume();

            if (char === '-') {
              this.transitionTo("commentStartDash"
              /* commentStartDash */
              );
            } else if (char === '>') {
              this.delegate.finishComment();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              this.delegate.appendToCommentData(char);
              this.transitionTo("comment"
              /* comment */
              );
            }
          },
          commentStartDash: function () {
            var char = this.consume();

            if (char === '-') {
              this.transitionTo("commentEnd"
              /* commentEnd */
              );
            } else if (char === '>') {
              this.delegate.finishComment();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              this.delegate.appendToCommentData('-');
              this.transitionTo("comment"
              /* comment */
              );
            }
          },
          comment: function () {
            var char = this.consume();

            if (char === '-') {
              this.transitionTo("commentEndDash"
              /* commentEndDash */
              );
            } else {
              this.delegate.appendToCommentData(char);
            }
          },
          commentEndDash: function () {
            var char = this.consume();

            if (char === '-') {
              this.transitionTo("commentEnd"
              /* commentEnd */
              );
            } else {
              this.delegate.appendToCommentData('-' + char);
              this.transitionTo("comment"
              /* comment */
              );
            }
          },
          commentEnd: function () {
            var char = this.consume();

            if (char === '>') {
              this.delegate.finishComment();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              this.delegate.appendToCommentData('--' + char);
              this.transitionTo("comment"
              /* comment */
              );
            }
          },
          tagName: function () {
            var char = this.consume();

            if (isSpace(char)) {
              this.transitionTo("beforeAttributeName"
              /* beforeAttributeName */
              );
            } else if (char === '/') {
              this.transitionTo("selfClosingStartTag"
              /* selfClosingStartTag */
              );
            } else if (char === '>') {
              this.delegate.finishTag();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              this.appendToTagName(char);
            }
          },
          endTagName: function () {
            var char = this.consume();

            if (isSpace(char)) {
              this.transitionTo("beforeAttributeName"
              /* beforeAttributeName */
              );
              this.tagNameBuffer = '';
            } else if (char === '/') {
              this.transitionTo("selfClosingStartTag"
              /* selfClosingStartTag */
              );
              this.tagNameBuffer = '';
            } else if (char === '>') {
              this.delegate.finishTag();
              this.transitionTo("beforeData"
              /* beforeData */
              );
              this.tagNameBuffer = '';
            } else {
              this.appendToTagName(char);
            }
          },
          beforeAttributeName: function () {
            var char = this.peek();

            if (isSpace(char)) {
              this.consume();
              return;
            } else if (char === '/') {
              this.transitionTo("selfClosingStartTag"
              /* selfClosingStartTag */
              );
              this.consume();
            } else if (char === '>') {
              this.consume();
              this.delegate.finishTag();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else if (char === '=') {
              this.delegate.reportSyntaxError('attribute name cannot start with equals sign');
              this.transitionTo("attributeName"
              /* attributeName */
              );
              this.delegate.beginAttribute();
              this.consume();
              this.delegate.appendToAttributeName(char);
            } else {
              this.transitionTo("attributeName"
              /* attributeName */
              );
              this.delegate.beginAttribute();
            }
          },
          attributeName: function () {
            var char = this.peek();

            if (isSpace(char)) {
              this.transitionTo("afterAttributeName"
              /* afterAttributeName */
              );
              this.consume();
            } else if (char === '/') {
              this.delegate.beginAttributeValue(false);
              this.delegate.finishAttributeValue();
              this.consume();
              this.transitionTo("selfClosingStartTag"
              /* selfClosingStartTag */
              );
            } else if (char === '=') {
              this.transitionTo("beforeAttributeValue"
              /* beforeAttributeValue */
              );
              this.consume();
            } else if (char === '>') {
              this.delegate.beginAttributeValue(false);
              this.delegate.finishAttributeValue();
              this.consume();
              this.delegate.finishTag();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else if (char === '"' || char === "'" || char === '<') {
              this.delegate.reportSyntaxError(char + ' is not a valid character within attribute names');
              this.consume();
              this.delegate.appendToAttributeName(char);
            } else {
              this.consume();
              this.delegate.appendToAttributeName(char);
            }
          },
          afterAttributeName: function () {
            var char = this.peek();

            if (isSpace(char)) {
              this.consume();
              return;
            } else if (char === '/') {
              this.delegate.beginAttributeValue(false);
              this.delegate.finishAttributeValue();
              this.consume();
              this.transitionTo("selfClosingStartTag"
              /* selfClosingStartTag */
              );
            } else if (char === '=') {
              this.consume();
              this.transitionTo("beforeAttributeValue"
              /* beforeAttributeValue */
              );
            } else if (char === '>') {
              this.delegate.beginAttributeValue(false);
              this.delegate.finishAttributeValue();
              this.consume();
              this.delegate.finishTag();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              this.delegate.beginAttributeValue(false);
              this.delegate.finishAttributeValue();
              this.transitionTo("attributeName"
              /* attributeName */
              );
              this.delegate.beginAttribute();
              this.consume();
              this.delegate.appendToAttributeName(char);
            }
          },
          beforeAttributeValue: function () {
            var char = this.peek();

            if (isSpace(char)) {
              this.consume();
            } else if (char === '"') {
              this.transitionTo("attributeValueDoubleQuoted"
              /* attributeValueDoubleQuoted */
              );
              this.delegate.beginAttributeValue(true);
              this.consume();
            } else if (char === "'") {
              this.transitionTo("attributeValueSingleQuoted"
              /* attributeValueSingleQuoted */
              );
              this.delegate.beginAttributeValue(true);
              this.consume();
            } else if (char === '>') {
              this.delegate.beginAttributeValue(false);
              this.delegate.finishAttributeValue();
              this.consume();
              this.delegate.finishTag();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              this.transitionTo("attributeValueUnquoted"
              /* attributeValueUnquoted */
              );
              this.delegate.beginAttributeValue(false);
              this.consume();
              this.delegate.appendToAttributeValue(char);
            }
          },
          attributeValueDoubleQuoted: function () {
            var char = this.consume();

            if (char === '"') {
              this.delegate.finishAttributeValue();
              this.transitionTo("afterAttributeValueQuoted"
              /* afterAttributeValueQuoted */
              );
            } else if (char === '&') {
              this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
            } else {
              this.delegate.appendToAttributeValue(char);
            }
          },
          attributeValueSingleQuoted: function () {
            var char = this.consume();

            if (char === "'") {
              this.delegate.finishAttributeValue();
              this.transitionTo("afterAttributeValueQuoted"
              /* afterAttributeValueQuoted */
              );
            } else if (char === '&') {
              this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
            } else {
              this.delegate.appendToAttributeValue(char);
            }
          },
          attributeValueUnquoted: function () {
            var char = this.peek();

            if (isSpace(char)) {
              this.delegate.finishAttributeValue();
              this.consume();
              this.transitionTo("beforeAttributeName"
              /* beforeAttributeName */
              );
            } else if (char === '/') {
              this.delegate.finishAttributeValue();
              this.consume();
              this.transitionTo("selfClosingStartTag"
              /* selfClosingStartTag */
              );
            } else if (char === '&') {
              this.consume();
              this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
            } else if (char === '>') {
              this.delegate.finishAttributeValue();
              this.consume();
              this.delegate.finishTag();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              this.consume();
              this.delegate.appendToAttributeValue(char);
            }
          },
          afterAttributeValueQuoted: function () {
            var char = this.peek();

            if (isSpace(char)) {
              this.consume();
              this.transitionTo("beforeAttributeName"
              /* beforeAttributeName */
              );
            } else if (char === '/') {
              this.consume();
              this.transitionTo("selfClosingStartTag"
              /* selfClosingStartTag */
              );
            } else if (char === '>') {
              this.consume();
              this.delegate.finishTag();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              this.transitionTo("beforeAttributeName"
              /* beforeAttributeName */
              );
            }
          },
          selfClosingStartTag: function () {
            var char = this.peek();

            if (char === '>') {
              this.consume();
              this.delegate.markTagAsSelfClosing();
              this.delegate.finishTag();
              this.transitionTo("beforeData"
              /* beforeData */
              );
            } else {
              this.transitionTo("beforeAttributeName"
              /* beforeAttributeName */
              );
            }
          },
          endTagOpen: function () {
            var char = this.consume();

            if (char === '@' || char === ':' || isAlpha(char)) {
              this.transitionTo("endTagName"
              /* endTagName */
              );
              this.tagNameBuffer = '';
              this.delegate.beginEndTag();
              this.appendToTagName(char);
            }
          }
        };
        this.reset();
      }

      EventedTokenizer.prototype.reset = function () {
        this.transitionTo("beforeData"
        /* beforeData */
        );
        this.input = '';
        this.tagNameBuffer = '';
        this.index = 0;
        this.line = 1;
        this.column = 0;
        this.delegate.reset();
      };

      EventedTokenizer.prototype.transitionTo = function (state) {
        this.state = state;
      };

      EventedTokenizer.prototype.tokenize = function (input) {
        this.reset();
        this.tokenizePart(input);
        this.tokenizeEOF();
      };

      EventedTokenizer.prototype.tokenizePart = function (input) {
        this.input += preprocessInput(input);

        while (this.index < this.input.length) {
          var handler = this.states[this.state];

          if (handler !== undefined) {
            handler.call(this);
          } else {
            throw new Error("unhandled state " + this.state);
          }
        }
      };

      EventedTokenizer.prototype.tokenizeEOF = function () {
        this.flushData();
      };

      EventedTokenizer.prototype.flushData = function () {
        if (this.state === 'data') {
          this.delegate.finishData();
          this.transitionTo("beforeData"
          /* beforeData */
          );
        }
      };

      EventedTokenizer.prototype.peek = function () {
        return this.input.charAt(this.index);
      };

      EventedTokenizer.prototype.consume = function () {
        var char = this.peek();
        this.index++;

        if (char === '\n') {
          this.line++;
          this.column = 0;
        } else {
          this.column++;
        }

        return char;
      };

      EventedTokenizer.prototype.consumeCharRef = function () {
        var endIndex = this.input.indexOf(';', this.index);

        if (endIndex === -1) {
          return;
        }

        var entity = this.input.slice(this.index, endIndex);
        var chars = this.entityParser.parse(entity);

        if (chars) {
          var count = entity.length; // consume the entity chars

          while (count) {
            this.consume();
            count--;
          } // consume the `;`


          this.consume();
          return chars;
        }
      };

      EventedTokenizer.prototype.markTagStart = function () {
        this.delegate.tagOpen();
      };

      EventedTokenizer.prototype.appendToTagName = function (char) {
        this.tagNameBuffer += char;
        this.delegate.appendToTagName(char);
      };

      EventedTokenizer.prototype.isIgnoredEndTag = function () {
        var tag = this.tagNameBuffer;
        return tag === 'title' && this.input.substring(this.index, this.index + 8) !== '</title>' || tag === 'style' && this.input.substring(this.index, this.index + 8) !== '</style>' || tag === 'script' && this.input.substring(this.index, this.index + 9) !== '</script>';
      };

      return EventedTokenizer;
    }();

    var Tokenizer =
    /** @class */
    function () {
      function Tokenizer(entityParser, options) {
        if (options === void 0) {
          options = {};
        }

        this.options = options;
        this.token = null;
        this.startLine = 1;
        this.startColumn = 0;
        this.tokens = [];
        this.tokenizer = new EventedTokenizer(this, entityParser, options.mode);
        this._currentAttribute = undefined;
      }

      Tokenizer.prototype.tokenize = function (input) {
        this.tokens = [];
        this.tokenizer.tokenize(input);
        return this.tokens;
      };

      Tokenizer.prototype.tokenizePart = function (input) {
        this.tokens = [];
        this.tokenizer.tokenizePart(input);
        return this.tokens;
      };

      Tokenizer.prototype.tokenizeEOF = function () {
        this.tokens = [];
        this.tokenizer.tokenizeEOF();
        return this.tokens[0];
      };

      Tokenizer.prototype.reset = function () {
        this.token = null;
        this.startLine = 1;
        this.startColumn = 0;
      };

      Tokenizer.prototype.current = function () {
        var token = this.token;

        if (token === null) {
          throw new Error('token was unexpectedly null');
        }

        if (arguments.length === 0) {
          return token;
        }

        for (var i = 0; i < arguments.length; i++) {
          if (token.type === arguments[i]) {
            return token;
          }
        }

        throw new Error("token type was unexpectedly " + token.type);
      };

      Tokenizer.prototype.push = function (token) {
        this.token = token;
        this.tokens.push(token);
      };

      Tokenizer.prototype.currentAttribute = function () {
        return this._currentAttribute;
      };

      Tokenizer.prototype.addLocInfo = function () {
        if (this.options.loc) {
          this.current().loc = {
            start: {
              line: this.startLine,
              column: this.startColumn
            },
            end: {
              line: this.tokenizer.line,
              column: this.tokenizer.column
            }
          };
        }

        this.startLine = this.tokenizer.line;
        this.startColumn = this.tokenizer.column;
      }; // Data


      Tokenizer.prototype.beginDoctype = function () {
        this.push({
          type: "Doctype"
          /* Doctype */
          ,
          name: ''
        });
      };

      Tokenizer.prototype.appendToDoctypeName = function (char) {
        this.current("Doctype"
        /* Doctype */
        ).name += char;
      };

      Tokenizer.prototype.appendToDoctypePublicIdentifier = function (char) {
        var doctype = this.current("Doctype"
        /* Doctype */
        );

        if (doctype.publicIdentifier === undefined) {
          doctype.publicIdentifier = char;
        } else {
          doctype.publicIdentifier += char;
        }
      };

      Tokenizer.prototype.appendToDoctypeSystemIdentifier = function (char) {
        var doctype = this.current("Doctype"
        /* Doctype */
        );

        if (doctype.systemIdentifier === undefined) {
          doctype.systemIdentifier = char;
        } else {
          doctype.systemIdentifier += char;
        }
      };

      Tokenizer.prototype.endDoctype = function () {
        this.addLocInfo();
      };

      Tokenizer.prototype.beginData = function () {
        this.push({
          type: "Chars"
          /* Chars */
          ,
          chars: ''
        });
      };

      Tokenizer.prototype.appendToData = function (char) {
        this.current("Chars"
        /* Chars */
        ).chars += char;
      };

      Tokenizer.prototype.finishData = function () {
        this.addLocInfo();
      }; // Comment


      Tokenizer.prototype.beginComment = function () {
        this.push({
          type: "Comment"
          /* Comment */
          ,
          chars: ''
        });
      };

      Tokenizer.prototype.appendToCommentData = function (char) {
        this.current("Comment"
        /* Comment */
        ).chars += char;
      };

      Tokenizer.prototype.finishComment = function () {
        this.addLocInfo();
      }; // Tags - basic


      Tokenizer.prototype.tagOpen = function () {};

      Tokenizer.prototype.beginStartTag = function () {
        this.push({
          type: "StartTag"
          /* StartTag */
          ,
          tagName: '',
          attributes: [],
          selfClosing: false
        });
      };

      Tokenizer.prototype.beginEndTag = function () {
        this.push({
          type: "EndTag"
          /* EndTag */
          ,
          tagName: ''
        });
      };

      Tokenizer.prototype.finishTag = function () {
        this.addLocInfo();
      };

      Tokenizer.prototype.markTagAsSelfClosing = function () {
        this.current("StartTag"
        /* StartTag */
        ).selfClosing = true;
      }; // Tags - name


      Tokenizer.prototype.appendToTagName = function (char) {
        this.current("StartTag"
        /* StartTag */
        , "EndTag"
        /* EndTag */
        ).tagName += char;
      }; // Tags - attributes


      Tokenizer.prototype.beginAttribute = function () {
        this._currentAttribute = ['', '', false];
      };

      Tokenizer.prototype.appendToAttributeName = function (char) {
        this.currentAttribute()[0] += char;
      };

      Tokenizer.prototype.beginAttributeValue = function (isQuoted) {
        this.currentAttribute()[2] = isQuoted;
      };

      Tokenizer.prototype.appendToAttributeValue = function (char) {
        this.currentAttribute()[1] += char;
      };

      Tokenizer.prototype.finishAttributeValue = function () {
        this.current("StartTag"
        /* StartTag */
        ).attributes.push(this._currentAttribute);
      };

      Tokenizer.prototype.reportSyntaxError = function (message) {
        this.current().syntaxError = message;
      };

      return Tokenizer;
    }();

    function tokenize(input, options) {
      var tokenizer = new Tokenizer(new EntityParser(HTML5NamedCharRefs), options);
      return tokenizer.tokenize(input);
    }

    var Options = linkify.options.Options;
    var StartTag = 'StartTag';
    var EndTag = 'EndTag';
    var Chars = 'Chars';
    var Comment = 'Comment';
    var Doctype = 'Doctype';
    /**
     * @param {string} str html string to link
     * @param {object} [opts] linkify options
     * @returns {string} resulting string
     */

    function linkifyHtml(str) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // `tokens` and `token` in this section refer to tokens generated by the
      // HTML parser, not linkify's parser
      var tokens = tokenize(str);
      var linkifiedTokens = [];
      var linkified = [];
      opts = new Options(opts); // Linkify the tokens given by the parser

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (token.type === StartTag) {
          linkifiedTokens.push(token); // Ignore all the contents of ignored tags

          var tagName = token.tagName.toUpperCase();
          var isIgnored = tagName === 'A' || opts.ignoreTags.indexOf(tagName) >= 0;

          if (!isIgnored) {
            continue;
          }

          var preskipLen = linkifiedTokens.length;
          skipTagTokens(tagName, tokens, ++i, linkifiedTokens);
          i += linkifiedTokens.length - preskipLen - 1;
          continue;
        } else if (token.type !== Chars) {
          // Skip this token, it's not important
          linkifiedTokens.push(token);
          continue;
        } // Valid text token, linkify it!


        var linkifedChars = linkifyChars(token.chars, opts);
        linkifiedTokens.push.apply(linkifiedTokens, linkifedChars);
      } // Convert the tokens back into a string


      for (var _i = 0; _i < linkifiedTokens.length; _i++) {
        var _token = linkifiedTokens[_i];

        switch (_token.type) {
          case StartTag:
            {
              var link = '<' + _token.tagName;

              if (_token.attributes.length > 0) {
                var attrs = attrsToStrings(_token.attributes);
                link += ' ' + attrs.join(' ');
              }

              link += '>';
              linkified.push(link);
              break;
            }

          case EndTag:
            linkified.push("</".concat(_token.tagName, ">"));
            break;

          case Chars:
            linkified.push(escapeText(_token.chars));
            break;

          case Comment:
            linkified.push("<!--".concat(escapeText(_token.chars), "-->"));
            break;

          case Doctype:
            {
              var doctype = "<!DOCTYPE ".concat(_token.name);

              if (_token.publicIdentifier) {
                doctype += " PUBLIC \"".concat(_token.publicIdentifier, "\"");
              }

              if (_token.systemIdentifier) {
                doctype += " \"".concat(_token.systemIdentifier, "\"");
              }

              doctype += '>';
              linkified.push(doctype);
              break;
            }
        }
      }

      return linkified.join('');
    }
    /**
    	`tokens` and `token` in this section referes to tokens returned by
    	`linkify.tokenize`. `linkified` will contain HTML Parser-style tokens
    */

    function linkifyChars(str, opts) {
      var tokens = linkify.tokenize(str);
      var result = [];

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (token.t === 'nl' && opts.nl2br) {
          result.push({
            type: StartTag,
            tagName: 'br',
            attributes: [],
            selfClosing: true
          });
          continue;
        } else if (!token.isLink || !opts.check(token)) {
          result.push({
            type: Chars,
            chars: token.toString()
          });
          continue;
        }

        var _opts$resolve = opts.resolve(token),
            formatted = _opts$resolve.formatted,
            formattedHref = _opts$resolve.formattedHref,
            tagName = _opts$resolve.tagName,
            className = _opts$resolve.className,
            target = _opts$resolve.target,
            rel = _opts$resolve.rel,
            attributes = _opts$resolve.attributes,
            truncate = _opts$resolve.truncate; // Build up attributes


        var attributeArray = [['href', formattedHref]];

        if (className) {
          attributeArray.push(['class', className]);
        }

        if (target) {
          attributeArray.push(['target', target]);
        }

        if (rel) {
          attributeArray.push(['rel', rel]);
        }

        if (truncate && formatted.length > truncate) {
          formatted = formatted.substring(0, truncate) + '…';
        }

        for (var attr in attributes) {
          attributeArray.push([attr, attributes[attr]]);
        } // Add the required tokens


        result.push({
          type: StartTag,
          tagName: tagName,
          attributes: attributeArray,
          selfClosing: false
        });
        result.push({
          type: Chars,
          chars: formatted
        });
        result.push({
          type: EndTag,
          tagName: tagName
        });
      }

      return result;
    }
    /**
    	Returns a list of tokens skipped until the closing tag of tagName.

    	* `tagName` is the closing tag which will prompt us to stop skipping
    	* `tokens` is the array of tokens generated by HTML5Tokenizer which
    	* `i` is the index immediately after the opening tag to skip
    	* `skippedTokens` is an array which skipped tokens are being pushed into

    	Caveats

    	* Assumes that i is the first token after the given opening tagName
    	* The closing tag will be skipped, but nothing after it
    	* Will track whether there is a nested tag of the same type
    */


    function skipTagTokens(tagName, tokens, i, skippedTokens) {
      // number of tokens of this type on the [fictional] stack
      var stackCount = 1;

      while (i < tokens.length && stackCount > 0) {
        var token = tokens[i];

        if (token.type === StartTag && token.tagName.toUpperCase() === tagName) {
          // Nested tag of the same type, "add to stack"
          stackCount++;
        } else if (token.type === EndTag && token.tagName.toUpperCase() === tagName) {
          // Closing tag
          stackCount--;
        }

        skippedTokens.push(token);
        i++;
      } // Note that if stackCount > 0 here, the HTML is probably invalid


      return skippedTokens;
    }

    function escapeText(text) {
      // Not required, HTML tokenizer ensures this occurs properly
      return text;
    }

    function escapeAttr(attr) {
      return attr.replace(/"/g, '&quot;');
    }

    function attrsToStrings(attrs) {
      var attrStrs = [];

      for (var i = 0; i < attrs.length; i++) {
        var name = attrs[i][0];
        var value = attrs[i][1];
        attrStrs.push("".concat(name, "=\"").concat(escapeAttr(value), "\""));
      }

      return attrStrs;
    }

    return linkifyHtml;

}(linkify));
