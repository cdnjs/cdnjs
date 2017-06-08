'use strict';

/*
  The lexer module is a slightly modified version of the handwritten lexer by Eli Bendersky.
  The parts not needed like comments and quotes were deleted and some things modified.
  Comments are left unchanged, the original lexer can be found here:
  http://eli.thegreenplace.net/2013/07/16/hand-written-lexer-in-javascript-compared-to-the-regex-based-ones
*/

var Lexer = function() {
  this.pos = 0;
  this.buf = null;
  this.buflen = 0;

  // Operator table, mapping operator -> token name
  this.optable = {
    '+':  'PLUS',
    '-':  'MINUS',
    '*':  'MULTIPLY',
    '/':  'DIVIDE',
    '^':  'POWER',
    '(':  'L_PAREN',
    ')':  'R_PAREN',
    '=':  'EQUALS'
  };
};

// Initialize the Lexer's buffer. This resets the lexer's internal
// state and subsequent tokens will be returned starting with the
// beginning of the new buffer.
Lexer.prototype.input = function(buf) {
  this.pos = 0;
  this.buf = buf;
  this.buflen = buf.length;
};

// Get the next token from the current buffer. A token is an object with
// the following properties:
// - type: name of the pattern that this token matched (taken from rules).
// - value: actual string value of the token.
// - pos: offset in the current buffer where the token starts.
//
// If there are no more tokens in the buffer, returns null. In case of
// an error throws Error.
Lexer.prototype.token = function() {
  this._skipnontokens();
  if (this.pos >= this.buflen) {
    return null;
  }

  // The char at this.pos is part of a real token. Figure out which.
  var c = this.buf.charAt(this.pos);
   // Look it up in the table of operators
  var op = this.optable[c];
  if (op !== undefined) {
    if(op === 'L_PAREN' || op === 'R_PAREN'){
       return {type: 'PAREN', value: op, pos: this.pos++};  
    }else{
      return {type: 'OPERATOR', value: op, pos: this.pos++};  
    }
  } else {
    // Not an operator - so it's the beginning of another token.
    if (Lexer._isalpha(c)) {
      return this._process_identifier();
    } else if (Lexer._isdigit(c)) {
      return this._process_number();
    } else {
      throw new SyntaxError('Token error at character ' + c + ' at position ' + this.pos);
    }
  }
};

Lexer._isdigit = function(c) {
  return c >= '0' && c <= '9';
};

Lexer._isalpha = function(c) {
  return (c >= 'a' && c <= 'z') ||
         (c >= 'A' && c <= 'Z');
};

Lexer._isalphanum = function(c) {
  return (c >= 'a' && c <= 'z') ||
         (c >= 'A' && c <= 'Z') ||
         (c >= '0' && c <= '9');
};

Lexer.prototype._process_digits = function(position){
  var endpos = position;
  while (endpos < this.buflen &&
        (Lexer._isdigit(this.buf.charAt(endpos)))){
    endpos++;
  }
  return endpos;
};

Lexer.prototype._process_number = function() {
  //Read characters until a non-digit character appears
  var endpos = this._process_digits(this.pos);
  //If it's a decimal point, continue to read digits
  if(this.buf.charAt(endpos) === '.'){
    endpos = this._process_digits(endpos + 1);
  }
  //Check if the last read character is a decimal point.
  //If it is, ignore it and proceed
  if(this.buf.charAt(endpos-1) === '.'){
    throw new SyntaxError("Decimal point without decimal digits at position " + (endpos-1));
  } 
  //construct the NUMBER token
  var tok = {
    type: 'NUMBER',
    value: this.buf.substring(this.pos, endpos),
    pos: this.pos
  };
  this.pos = endpos;
  return tok;
};

Lexer.prototype._process_identifier = function() {
  var endpos = this.pos + 1;
  while (endpos < this.buflen &&
         Lexer._isalphanum(this.buf.charAt(endpos))) {
    endpos++;
  }

  var tok = {
    type: 'IDENTIFIER',
    value: this.buf.substring(this.pos, endpos),
    pos: this.pos
  };
  this.pos = endpos;
  return tok;
};

Lexer.prototype._skipnontokens = function() {
  while (this.pos < this.buflen) {
    var c = this.buf.charAt(this.pos);
    if (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
      this.pos++;
    } else {
      break;
    }
  }
};

module.exports = Lexer;
