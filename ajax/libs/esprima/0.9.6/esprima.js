/*
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint bitwise:true */
/*global esprima:true, exports:true,
throwError: true,
parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
parseFunctionDeclaration: true, parseFunctionExpression: true,
parseStatement: true */

(function (exports) {
    'use strict';

    var Token,
        Syntax,
        Messages,
        source,
        index,
        lineNumber,
        length,
        buffer,
        extra;

    Token = {
        BooleanLiteral: 1,
        EOF: 2,
        Identifier: 3,
        Keyword: 4,
        NullLiteral: 5,
        NumericLiteral: 6,
        Punctuator: 7,
        StringLiteral: 8
    };

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        Program: 'Program',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement'
    };

    Messages = {
        UnexpectedToken:  'Unexpected token %0',
        UnexpectedNumber:  'Unexpected number',
        UnexpectedString:  'Unexpected string',
        UnexpectedIdentifier:  'Unexpected identifier',
        UnexpectedReserved:  'Unexpected reserved word',
        UnexpectedEOS:  'Unexpected end of input',
        NewlineAfterThrow:  'Illegal newline after throw',
        InvalidRegExp: 'Invalid regular expression',
        UnterminatedRegExp:  'Invalid regular expression: missing /',
        InvalidLHSInAssignment:  'Invalid left-hand side in assignment',
        InvalidLHSInForIn:  'Invalid left-hand side in for-in',
        InvalidLHSInPostfixOp:  'Invalid left-hand side expression in postfix operation',
        InvalidLHSInPrefixOp:  'Invalid left-hand side expression in prefix operation',
        NoCatchOrFinally:  'Missing catch or finally after try'
    };

    if (typeof Object.freeze === 'function') {
        Object.freeze(Token);
        Object.freeze(Syntax);
        Object.freeze(Messages);
    }

    function isDecimalDigit(ch) {
        return '0123456789'.indexOf(ch) >= 0;
    }

    function isHexDigit(ch) {
        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }

    // TODO: really handle Unicode category Lu, LI, Lt, Lm, Lo, NI
    function isUnicodeLetter(ch) {
        return (ch >= 'a' && ch <= 'z') ||
            (ch >= 'A' && ch <= 'Z');
    }

    // TODO: really handle Unicode category Nd
    function isUnicodeDigit(ch) {
        return (ch >= '0') && (ch <= '9');
    }

    // 7.2 White Space

    function isWhiteSpace(ch) {
        // TODO Unicode "space separator"
        return (ch === ' ') || (ch === '\u0009') || (ch === '\u000B') ||
            (ch === '\u000C') || (ch === '\u00A0') || (ch === '\uFEFF');
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return (ch === '\n' || ch === '\r' || ch === '\u2028' || ch === '\u2029');
    }

    // 7.6 Identifier Names and Identifiers

    function isIdentifierStart(ch) {
        // TODO UnicodeEscapeSequence
        return (ch === '$') || (ch === '_') || isUnicodeLetter(ch);
    }

    function isIdentifierPart(ch) {
        // TODO UnicodeCombiningMark UnicodeConnectorPunctuation and ZWNJ and ZWJ
        return isIdentifierStart(ch) || isUnicodeDigit(ch);
    }

    // 7.6.1.2 Future Reserved Words

    function isFutureReservedWord(id) {
        switch (id) {

        // Future reserved words.
        case 'class':
        case 'enum':
        case 'export':
        case 'extends':
        case 'import':
        case 'super':
            return true;
        }

        return false;
    }

    // 7.6.1.1 Keywords

    function isKeyword(id) {
        switch (id) {

        // Keywords.
        case 'break':
        case 'case':
        case 'catch':
        case 'continue':
        case 'debugger':
        case 'default':
        case 'delete':
        case 'do':
        case 'else':
        case 'finally':
        case 'for':
        case 'function':
        case 'if':
        case 'in':
        case 'instanceof':
        case 'new':
        case 'return':
        case 'switch':
        case 'this':
        case 'throw':
        case 'try':
        case 'typeof':
        case 'var':
        case 'void':
        case 'while':
        case 'with':
            return true;

        // Future reserved words.
        // 'const' is specialized as Keyword in V8.
        case 'const':
            return true;

        // strict mode
        case 'implements':
        case 'interface':
        case 'let':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'yield':
            return true;
        }

        return isFutureReservedWord(id);
    }

    // Return the next character and move forward.

    function nextChar() {
        var ch = '\x00',
            idx = index;
        if (idx < length) {
            ch = source[idx];
            index += 1;
        }
        return ch;
    }

    // 7.4 Comments

    function skipComment() {
        var ch, blockComment, lineComment;

        blockComment = false;
        lineComment = false;

        while (index < length) {
            ch = source[index];

            if (lineComment) {
                nextChar();
                if (isLineTerminator(ch)) {
                    lineComment = false;
                    lineNumber += 1;
                }
            } else if (blockComment) {
                nextChar();
                if (ch === '*') {
                    ch = source[index];
                    if (ch === '/') {
                        nextChar();
                        blockComment = false;
                    }
                } else if (isLineTerminator(ch)) {
                    lineNumber += 1;
                }
            } else if (ch === '/') {
                ch = source[index + 1];
                if (ch === '/') {
                    nextChar();
                    nextChar();
                    lineComment = true;
                } else if (ch === '*') {
                    nextChar();
                    nextChar();
                    blockComment = true;
                } else {
                    break;
                }
            } else if (isWhiteSpace(ch)) {
                nextChar();
            } else if (isLineTerminator(ch)) {
                nextChar();
                lineNumber += 1;
            } else {
                break;
            }
        }
    }

    function scanIdentifier() {
        var ch, id;

        ch = source[index];
        if (!isIdentifierStart(ch)) {
            return;
        }

        id = nextChar();
        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch)) {
                break;
            }
            id += nextChar();
        }

        // There is no keyword or literal with only one character.
        // Thus, it must be an identifier.
        if (id.length === 1) {
            return {
                type: Token.Identifier,
                value: id
            };
        }

        if (isKeyword(id)) {
            return {
                type: Token.Keyword,
                value: id
            };
        }

        // 7.8.1 Null Literals

        if (id === 'null') {
            return {
                type: Token.NullLiteral
            };
        }

        // 7.8.2 Boolean Literals

        if (id === 'true' || id === 'false') {
            return {
                type: Token.BooleanLiteral,
                value: id
            };
        }

        return {
            type: Token.Identifier,
            value: id
        };
    }

    // 7.7 Punctuators

    function scanPunctuator() {
        var ch1 = source[index],
            ch2,
            ch3,
            ch4;

        // Check for most common single-character punctuators.

        if (ch1 === ';' || ch1 === '{' || ch1 === '}') {
            nextChar();
            return {
                type: Token.Punctuator,
                value: ch1
            };
        }

        if (ch1 === ',' || ch1 === '(' || ch1 === ')') {
            nextChar();
            return {
                type: Token.Punctuator,
                value: ch1
            };
        }

        // Dot (.) can also start a floating-point number, hence the need
        // to check the next character.

        ch2 = source[index + 1];
        if (ch1 === '.' && !isDecimalDigit(ch2)) {
            return {
                type: Token.Punctuator,
                value: nextChar()
            };
        }

        // Peek more characters.

        ch3 = source[index + 2];
        ch4 = source[index + 3];

        // 4-character punctuator: >>>=

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            if (ch4 === '=') {
                nextChar();
                nextChar();
                nextChar();
                nextChar();
                return {
                    type: Token.Punctuator,
                    value: '>>>='
                };
            }
        }

        // 3-character punctuators: === !== >>> <<= >>=

        if (ch1 === '=' && ch2 === '=' && ch3 === '=') {
            nextChar();
            nextChar();
            nextChar();
            return {
                type: Token.Punctuator,
                value: '==='
            };
        }

        if (ch1 === '!' && ch2 === '=' && ch3 === '=') {
            nextChar();
            nextChar();
            nextChar();
            return {
                type: Token.Punctuator,
                value: '!=='
            };
        }

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            nextChar();
            nextChar();
            nextChar();
            return {
                type: Token.Punctuator,
                value: '>>>'
            };
        }

        if (ch1 === '<' && ch2 === '<' && ch3 === '=') {
            nextChar();
            nextChar();
            nextChar();
            return {
                type: Token.Punctuator,
                value: '<<='
            };
        }

        if (ch1 === '>' && ch2 === '>' && ch3 === '=') {
            nextChar();
            nextChar();
            nextChar();
            return {
                type: Token.Punctuator,
                value: '>>='
            };
        }

        // 2-character punctuators: <= >= == != ++ -- << >> && ||
        // += -= *= %= &= |= ^= /=

        if (ch2 === '=') {
            if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
                nextChar();
                nextChar();
                return {
                    type: Token.Punctuator,
                    value: ch1 + ch2
                };
            }
        }

        if (ch1 === ch2 && ('+-<>&|'.indexOf(ch1) >= 0)) {
            if ('+-<>&|'.indexOf(ch2) >= 0) {
                nextChar();
                nextChar();
                return {
                    type: Token.Punctuator,
                    value: ch1 + ch2
                };
            }
        }

        // The remaining 1-character punctuators.

        if ('[]<>+-*%&|^!~?:=/'.indexOf(ch1) >= 0) {
            return {
                type: Token.Punctuator,
                value: nextChar()
            };
        }
    }

    // 7.8.3 Numeric Literals

    function scanNumericLiteral() {
        var number, ch;

        ch = source[index];
        if (!isDecimalDigit(ch) && (ch !== '.')) {
            return;
        }

        number = '';
        if (ch !== '.') {
            number = nextChar();
            ch = source[index];

            // Hex number starts with '0x'.
            if (ch === 'x' || ch === 'X') {
                number += nextChar();
                while (index < length) {
                    ch = source[index];
                    if (!isHexDigit(ch)) {
                        break;
                    }
                    number += nextChar();
                }
                return {
                    type: Token.NumericLiteral,
                    value: parseInt(number, 16)
                };
            }

            while (index < length) {
                ch = source[index];
                if (!isDecimalDigit(ch)) {
                    break;
                }
                number += nextChar();
            }
        }

        if (ch === '.') {
            number += nextChar();
            while (index < length) {
                ch = source[index];
                if (!isDecimalDigit(ch)) {
                    break;
                }
                number += nextChar();
            }
        }

        if (ch === 'e' || ch === 'E') {
            number += nextChar();
            ch = source[index];
            if (ch === '+' || ch === '-' || isDecimalDigit(ch)) {
                number += nextChar();
                while (index < length) {
                    ch = source[index];
                    if (!isDecimalDigit(ch)) {
                        break;
                    }
                    number += nextChar();
                }
            } else {
                ch = 'character ' + ch;
                if (index >= length) {
                    ch = '<end>';
                }
                throwError(Messages.UnexpectedToken, lineNumber, 'ILLEGAL');
            }
        }

        return {
            type: Token.NumericLiteral,
            value: parseFloat(number)
        };
    }

    // 7.8.4 String Literals

    // TODO Unicode
    function scanStringLiteral() {
        var str = '', quote, ch;

        quote = source[index];
        if (quote !== '\'' && quote !== '"') {
            return;
        }
        nextChar();

        while (index < length) {
            ch = nextChar();

            if (ch === quote) {
                quote = '';
                break;
            } else if (ch === '\\') {
                ch = nextChar();
                if (!isLineTerminator(ch)) {
                    str += '\\';
                    str += ch;
                }
            } else {
                str += ch;
            }
        }

        if (quote !== '') {
            throwError(Messages.UnexpectedToken, lineNumber, 'ILLEGAL');
        }

        return {
            type: Token.StringLiteral,
            value: str
        };
    }

    function scanRegExp() {
        var str = '', ch, pattern, flags, value, classMarker = false;

        buffer = null;
        skipComment();

        ch = source[index];
        if (ch !== '/') {
            return;
        }
        str = nextChar();

        while (index < length) {
            ch = nextChar();
            str += ch;
            if (classMarker) {
                if (ch === ']') {
                    classMarker = false;
                }
            } else {
                if (ch === '\\') {
                    str += nextChar();
                }
                if (ch === '/') {
                    break;
                }
                if (ch === '[') {
                    classMarker = true;
                }
                if (isLineTerminator(ch)) {
                    throwError(Messages.UnterminatedRegExp, lineNumber);
                }
            }
        }

        if (str.length === 1) {
            throwError(Messages.UnterminatedRegExp, lineNumber);
        }

        // Exclude leading and trailing slash.
        pattern = str.substr(1, str.length - 2);

        flags = '';
        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch)) {
                break;
            }
            flags += ch;
            str += nextChar();
        }

        try {
            value = new RegExp(pattern, flags);
        } catch (e) {
            throwError(Messages.InvalidRegExp, lineNumber);
        }

        return {
            literal: str,
            value: value
        };
    }

    function advance() {
        var ch, token;

        if (index >= length) {
            return {
                type: Token.EOF
            };
        }

        token = scanPunctuator();
        if (typeof token !== 'undefined') {
            return token;
        }

        ch = source[index];

        if (ch === '\'' || ch === '"') {
            return scanStringLiteral();
        }

        if (ch === '.' || isDecimalDigit(ch)) {
            return scanNumericLiteral();
        }

        token = scanIdentifier();
        if (typeof token !== 'undefined') {
            return token;
        }

        throwError(Messages.UnexpectedToken, lineNumber, 'ILLEGAL');
    }

    function lex() {
        var pos, token;

        if (buffer) {
            index = buffer.range[1];
            lineNumber = buffer.lineNumber;
            token = buffer;
            buffer = null;
            return token;
        }

        buffer = null;
        skipComment();

        pos = index;
        token = advance();
        token.range = [pos, index];
        token.lineNumber = lineNumber;

        return token;
    }

    function lookahead() {
        var pos, line, token;

        if (buffer !== null) {
            return buffer;
        }

        pos = index;
        line = lineNumber;
        token = lex();
        index = pos;
        lineNumber = line;

        buffer = token;
        return buffer;
    }

    // Return true if there is a line terminator before the next token.

    function peekLineTerminator() {
        var pos, line, found;

        pos = index;
        line = lineNumber;
        skipComment();
        found = lineNumber !== line;
        index = pos;
        lineNumber = line;

        return found;
    }

    // Throw an exception

    function throwError(message, line) {
        var args = Array.prototype.slice.call(arguments, 2);
        throw new Error('Line ' + line + ': ' + message.replace(/%(\d)/g,
                    function (whole, index) { return args[index] || ''; }));
    }

    // Throw an exception because of the token.

    function throwUnexpected(token) {
        var s;

        if (token.type === Token.EOF) {
            throwError(Messages.UnexpectedEOS, lineNumber);
        }

        if (token.type === Token.NumericLiteral) {
            throwError(Messages.UnexpectedNumber, lineNumber);
        }

        if (token.type === Token.StringLiteral) {
            throwError(Messages.UnexpectedString, lineNumber);
        }

        if (token.type === Token.Identifier) {
            throwError(Messages.UnexpectedIdentifier, lineNumber);
        }

        if (token.type === Token.Keyword && isFutureReservedWord(token.value)) {
            throwError(Messages.UnexpectedReserved, lineNumber);
        }

        s = token.value;
        if (s.length > 10) {
            s = s.substr(0, 10) + '...';
        }
        throwError(Messages.UnexpectedToken, lineNumber, s);
    }

    // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.

    function expect(value) {
        var token = lex();
        if (token.type !== Token.Punctuator || token.value !== value) {
            throwUnexpected(token);
        }
    }

    // Expect the next token to match the specified keyword.
    // If not, an exception will be thrown.

    function expectKeyword(keyword) {
        var token = lex();
        if (token.type !== Token.Keyword || token.value !== keyword) {
            throwUnexpected(token);
        }
    }

    // Return true if the next token matches the specified punctuator.

    function match(value) {
        var token = lookahead();
        return token.type === Token.Punctuator && token.value === value;
    }

    // Return true if the next token matches the specified keyword

    function matchKeyword(keyword) {
        var token = lookahead();
        return token.type === Token.Keyword && token.value === keyword;
    }

    // Return true if the next token is an assignment operator

    function matchAssign() {
        var token = lookahead(),
            op = token.value;

        if (token.type !== Token.Punctuator) {
            return false;
        }
        return op === '=' ||
            op === '*=' ||
            op === '/=' ||
            op === '%=' ||
            op === '+=' ||
            op === '-=' ||
            op === '<<=' ||
            op === '>>=' ||
            op === '>>>=' ||
            op === '&=' ||
            op === '^=' ||
            op === '|=';
    }


    // Return true if expr is left hand side expression

    function isLeftHandSide(expr) {
        return expr.type === Syntax.Identifier ||
            expr.type === Syntax.MemberExpression ||
            expr.type === Syntax.CallExpression ||
            expr.type === Syntax.NewExpression;
    }


    function consumeSemicolon() {
        var token, line;

        // Catch the very common case first.
        if (source[index] === ';') {
            lex();
            return;
        }

        line = lineNumber;
        skipComment();
        if (lineNumber !== line) {
            return;
        }

        if (match(';')) {
            lex();
            return;
        }

        token = lookahead();
        if (token.type !== Token.EOF && !match('}')) {
            throwUnexpected(token);
        }
        return;
    }

    // 11.1.4 Array Initialiser

    function parseArrayInitialiser() {
        var elements = [],
            undef;

        expect('[');

        while (index < length) {
            if (match(']')) {
                lex();
                break;
            }

            if (match(',')) {
                lex();
                elements.push(undef);
            } else {
                elements.push(parseAssignmentExpression());

                if (match(']')) {
                    lex();
                    break;
                }

                expect(',');
            }
        }

        return {
            type: Syntax.ArrayExpression,
            elements: elements
        };
    }

    // 11.1.5 Object Initialiser

    function parseObjectInitialiser() {
        var token, expr, properties = [], property;

        expect('{');

        // TODO handle 'get' and 'set'
        while (index < length) {
            token = lex();
            if (token.type === Token.Punctuator && token.value === '}') {
                break;
            }

            property = {};
            switch (token.type) {
            case Token.Identifier:
                property.key = {
                    type: Syntax.Identifier,
                    name: token.value
                };

                // Property Assignment: Getter and Setter.

                if (token.value === 'get' && !match(':')) {
                    token = lex();
                    if (token.type !== Token.Identifier) {
                        throwUnexpected(token);
                    }
                    expect('(');
                    expect(')');
                    property = {
                        key: {
                            type: Syntax.Identifier,
                            name: token.value
                        },
                        value: {
                            type: Syntax.FunctionExpression,
                            id: null,
                            params: [],
                            body: parseBlock()
                        },
                        kind: 'get'
                    };
                    break;
                }

                if (token.value === 'set' && !match(':')) {
                    token = lex();
                    if (token.type !== Token.Identifier) {
                        throwUnexpected(token);
                    }
                    property.key = {
                        type: Syntax.Identifier,
                        name: token.value
                    };
                    expect('(');
                    token = lex();
                    if (token.type !== Token.Identifier) {
                        throwUnexpected(token);
                    }
                    expect(')');
                    property.value = {
                        type: Syntax.FunctionExpression,
                        id: null,
                        params: [{
                            type: Syntax.Identifier,
                            name: token.value
                        }],
                        body: parseBlock()
                    };
                    property.kind = 'set';
                    break;
                }

                expect(':');
                property.value = parseAssignmentExpression();
                break;

            case Token.StringLiteral:
            case Token.NumericLiteral:
                property.key = {
                    type: Syntax.Literal,
                    value: token.value
                };
                expect(':');
                property.value = parseAssignmentExpression();
                break;

            default:
                throwUnexpected(token);
            }
            properties.push(property);

            token = lookahead();
            if (token.type === Token.Punctuator && token.value === '}') {
                lex();
                break;
            }
            expect(',');
        }

        return {
            type: Syntax.ObjectExpression,
            properties: properties
        };
    }

    // 11.1 Primary Expressions

    function parsePrimary() {
        var token, expr;

        if (match('[')) {
            return parseArrayInitialiser();
        }

        if (match('{')) {
            return parseObjectInitialiser();
        }

        if (match('(')) {
            lex();
            expr = parseExpression();
            expect(')');
            return expr.expression;
        }

        if (matchKeyword('function')) {
            return parseFunctionExpression();
        }

        if (matchKeyword('this')) {
            lex();
            return {
                type: Syntax.ThisExpression
            };
        }

        if (match('/') || match('/=')) {
            return {
                type: Syntax.Literal,
                value: scanRegExp().value
            };
        }

        token = lex();

        if (token.type === Token.Identifier) {
            return {
                type: Syntax.Identifier,
                name: token.value
            };
        }

        if (token.type === Token.BooleanLiteral) {
            return {
                type: Syntax.Literal,
                value: (token.value === 'true')
            };
        }

        if (token.type === Token.NullLiteral) {
            return {
                type: Syntax.Literal,
                value: null
            };
        }

        if (token.type === Token.NumericLiteral) {
            return {
                type: Syntax.Literal,
                value: token.value
            };
        }

        if (token.type === Token.StringLiteral) {
            return {
                type: Syntax.Literal,
                value: token.value
            };
        }

        return throwUnexpected(token);
    }

    function parsePrimaryExpression() {
        return parsePrimary();
    }

    // 11.2 Left-Hand-Side Expressions

    function parseArguments() {
        var args = [];

        expect('(');

        if (!match(')')) {
            while (index < length) {
                args.push(parseAssignmentExpression());
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        return args;
    }

    function parseMemberExpression() {
        var expr, token, property;

        expr = parsePrimaryExpression();

        while (index < length) {
            if (match('.')) {
                lex();
                token = lex();
                if (token.type !== Token.Identifier) {
                    throwUnexpected(token);
                }
                property = {
                    type: Syntax.Identifier,
                    name: token.value
                };
                expr = {
                    type: Syntax.MemberExpression,
                    computed: false,
                    object: expr,
                    property: property
                };
            } else if (match('[')) {
                lex();
                property = parseExpression();
                if (property.type === Syntax.ExpressionStatement) {
                    property = property.expression;
                }
                expr = {
                    type: Syntax.MemberExpression,
                    computed: true,
                    object: expr,
                    property: property
                };
                expect(']');
            } else if (match('(')) {
                expr = {
                    type: Syntax.CallExpression,
                    callee: expr,
                    'arguments': parseArguments()
                };
            } else {
                break;
            }
        }

        return expr;
    }

    function parseLeftHandSideExpression() {
        var useNew, expr, args;

        useNew = matchKeyword('new');
        if (useNew) {
            // Read the keyword.
            lex();
            expr = parseLeftHandSideExpression();
        } else {
            expr = parseMemberExpression();
        }

        if (match('(')) {
            args = parseArguments();
        }

        if (useNew) {

            // Force to have at least an empty argument list.
            if (typeof args === 'undefined') {
                args = [];
            }

            // e.g. "new x()" thus adopt the CallExpression of "x()".
            if (expr.type === Syntax.CallExpression) {
                args = expr['arguments'];
                expr = expr.callee;
            }

            return {
                type: Syntax.NewExpression,
                callee: expr,
                'arguments': args
            };
        }

        if (typeof args !== 'undefined') {
            return {
                type: Syntax.CallExpression,
                callee: expr,
                'arguments': args
            };
        }

        return expr;
    }

    // 11.3 Postfix Expressions

    function parsePostfixExpression() {
        var expr = parseLeftHandSideExpression();

        if ((match('++') || match('--')) && !peekLineTerminator()) {
            if (!isLeftHandSide(expr)) {
                throwError(Messages.InvalidLHSInPostfixOp, lineNumber);
            }
            expr = {
                type: Syntax.UpdateExpression,
                operator: lex().value,
                argument: expr,
                prefix: false
            };
        }

        return expr;
    }

    // 11.4 Unary Operators

    function parseUnaryExpression() {
        var operator, expr;

        if (match('++') || match('--')) {
            operator = lex().value;
            expr = parseUnaryExpression();
            if (!isLeftHandSide(expr)) {
                throwError(Messages.InvalidLHSInPrefixOp, lineNumber);
            }
            return {
                type: Syntax.UpdateExpression,
                operator: operator,
                argument: expr,
                prefix: true
            };
        }

        if (match('+') || match('-') || match('~') || match('!')) {
            return {
                type: Syntax.UnaryExpression,
                operator: lex().value,
                argument: parseUnaryExpression()
            };
        }

        if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
            return {
                type: Syntax.UnaryExpression,
                operator: lex().value,
                argument: parseUnaryExpression()
            };
        }

        return parsePostfixExpression();
    }

    // 11.5 Multiplicative Operators

    function parseMultiplicativeExpression() {
        var expr = parseUnaryExpression();

        while (match('*') || match('/') || match('%')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseUnaryExpression()
            };
        }

        return expr;
    }

    // 11.6 Additive Operators

    function parseAdditiveExpression() {
        var expr = parseMultiplicativeExpression();

        while (match('+') || match('-')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseMultiplicativeExpression()
            };
        }

        return expr;
    }

    // 11.7 Bitwise Shift Operators

    function parseShiftExpression() {
        var expr = parseAdditiveExpression();

        while (match('<<') || match('>>') || match('>>>')) {
            expr =  {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseAdditiveExpression()
            };
        }

        return expr;
    }

    // 11.8 Relational Operators

    function parseRelationalExpression() {
        var expr = parseShiftExpression();

        if (match('<') || match('>') || match('<=') || match('>=')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseRelationalExpression()
            };
        } else if (matchKeyword('in')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: 'in',
                left: expr,
                right: parseRelationalExpression()
            };
        } else if (matchKeyword('instanceof')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: 'instanceof',
                left: expr,
                right: parseRelationalExpression()
            };
        }

        return expr;
    }

    // 11.9 Equality Operators

    function parseEqualityExpression() {
        var expr = parseRelationalExpression();

        while (match('==') || match('!=') || match('===') || match('!==')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseRelationalExpression()
            };
        }

        return expr;
    }

    // 11.10 Binary Bitwise Operators

    function parseBitwiseANDExpression() {
        var expr = parseEqualityExpression();

        while (match('&')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: '&',
                left: expr,
                right: parseEqualityExpression()
            };
        }

        return expr;
    }

    function parseBitwiseORExpression() {
        var expr = parseBitwiseANDExpression();

        while (match('|')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: '|',
                left: expr,
                right: parseBitwiseANDExpression()
            };
        }

        return expr;
    }

    function parseBitwiseXORExpression() {
        var expr = parseBitwiseORExpression();

        while (match('^')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: '^',
                left: expr,
                right: parseBitwiseORExpression()
            };
        }

        return expr;
    }

    // 11.11 Binary Logical Operators

    function parseLogicalANDExpression() {
        var expr = parseBitwiseXORExpression();

        while (match('&&')) {
            lex();
            expr = {
                type: Syntax.LogicalExpression,
                operator: '&&',
                left: expr,
                right: parseBitwiseXORExpression()
            };
        }

        return expr;
    }

    function parseLogicalORExpression() {
        var expr = parseLogicalANDExpression();

        while (match('||')) {
            lex();
            expr = {
                type: Syntax.LogicalExpression,
                operator: '||',
                left: expr,
                right: parseLogicalANDExpression()
            };
        }

        return expr;
    }

    // 11.12 Conditional Operator

    function parseConditionalExpression() {
        var expr = parseLogicalORExpression();

        if (match('?')) {
            lex();
            expr = {
                type: Syntax.ConditionalExpression,
                test: expr
            };
            expr.consequent = parseAssignmentExpression();
            expect(':');
            expr.alternate = parseAssignmentExpression();
        }

        return expr;
    }

    // 11.13 Assignment Operators

    function parseAssignmentExpression() {

        var expr = parseConditionalExpression();

        if (matchAssign()) {
            if (!isLeftHandSide(expr)) {
                throwError(Messages.InvalidLHSInAssignment, lineNumber);
            }
            expr = {
                type: Syntax.AssignmentExpression,
                operator: lex().value,
                left: expr,
                right: parseAssignmentExpression()
            };
        }

        return expr;
    }

    // 11.14 Comma Operator

    function parseExpression() {
        var expr = parseAssignmentExpression();

        if (match(',')) {
            expr = {
                type: Syntax.SequenceExpression,
                expressions: [ expr ]
            };

            while (index < length) {
                if (!match(',')) {
                    break;
                }
                lex();
                expr.expressions.push(parseAssignmentExpression());
            }
        }

        return {
            type: Syntax.ExpressionStatement,
            expression: expr
        };
    }

    // 12.1 Block

    function parseStatementList() {
        var list = [],
            statement;

        while (index < length) {
            if (match('}')) {
                break;
            }
            statement = parseStatement();
            if (typeof statement === 'undefined') {
                break;
            }
            list.push(statement);
        }

        return list;
    }

    function parseBlock() {
        var block;

        expect('{');

        block = parseStatementList();

        expect('}');

        return {
            type: Syntax.BlockStatement,
            body: block
        };
    }

    // 12.2 Variable Statement

    function parseVariableDeclaration() {
        var token, id, init;

        token = lex();
        if (token.type !== Token.Identifier) {
            throwUnexpected(token);
        }

        id = {
            type: Syntax.Identifier,
            name: token.value
        };

        init = null;
        if (match('=')) {
            lex();
            init = parseAssignmentExpression();
        }

        return {
            id: id,
            init: init
        };
    }

    function parseVariableDeclarationList() {
        var list = [];

        while (index < length) {
            list.push(parseVariableDeclaration());
            if (!match(',')) {
                break;
            }
            lex();
        }

        return list;
    }

    function parseVariableStatement() {
        var declarations;

        expectKeyword('var');

        declarations = parseVariableDeclarationList();

        consumeSemicolon();

        return {
            type: Syntax.VariableDeclaration,
            declarations: declarations,
            kind: 'var'
        };
    }

    // http://wiki.ecmascript.org/doku.php?id=harmony:let.
    // Warning: This is experimental and not in the specification yet.

    function parseLetStatement() {
        var declarations;

        expectKeyword('let');

        declarations = parseVariableDeclarationList();

        consumeSemicolon();

        return {
            type: Syntax.VariableDeclaration,
            declarations: declarations,
            kind: 'let'
        };
    }

    // 12.3 Empty Statement

    function parseEmptyStatement() {
        expect(';');

        return {
            type: Syntax.EmptyStatement
        };
    }

    // 12.4 Expression Statement

    function parseExpressionStatement() {
        var expr = parseExpression();

        consumeSemicolon();

        return expr;
    }

    // 12.5 If statement

    function parseIfStatement() {
        var test, consequent, alternate;

        expectKeyword('if');

        expect('(');

        test = parseExpression().expression;

        expect(')');

        consequent = parseStatement();

        if (matchKeyword('else')) {
            lex();
            alternate = parseStatement();
        } else {
            alternate = null;
        }

        return {
            type: Syntax.IfStatement,
            test: test,
            consequent: consequent,
            alternate: alternate
        };
    }

    // 12.6 Iteration Statements

    function parseDoWhileStatement() {
        var body, test;

        expectKeyword('do');

        body = parseStatement();

        expectKeyword('while');

        expect('(');

        test = parseExpression().expression;

        expect(')');

        consumeSemicolon();

        return {
            type: Syntax.DoWhileStatement,
            body: body,
            test: test
        };
    }

    function parseWhileStatement() {
        var test, body;

        expectKeyword('while');

        expect('(');

        test = parseExpression().expression;

        expect(')');

        body = parseStatement();

        return {
            type: Syntax.WhileStatement,
            test: test,
            body: body
        };
    }

    function parseForStatement() {
        var kind, init, test, update, left, right, body;

        init = test = update = null;

        expectKeyword('for');

        expect('(');

        if (match(';')) {
            lex();
        } else {
            if (matchKeyword('var') || matchKeyword('let')) {
                kind = lex().value;
                init = {
                    type: Syntax.VariableDeclaration,
                    declarations: parseVariableDeclarationList(),
                    kind: kind
                };

                if (init.declarations.length === 1 && matchKeyword('in')) {
                    lex();
                    left = init;
                    right = parseExpression().expression;
                    init = null;
                }
            } else {
                init = parseExpression().expression;
            }

            if (typeof left === 'undefined') {
                if (init.hasOwnProperty('operator') && init.operator === 'in') {
                    left = init.left;
                    right = init.right;
                    init = null;
                    if (!isLeftHandSide(left)) {
                        throwError(Messages.InvalidLHSInForIn, lineNumber);
                    }
                } else {
                    expect(';');
                }
            }
        }

        if (typeof left === 'undefined') {

            if (!match(';')) {
                test = parseExpression().expression;
            }
            expect(';');

            if (!match(')')) {
                update = parseExpression().expression;
            }
        }

        expect(')');

        body = parseStatement();

        if (typeof left === 'undefined') {
            return {
                type: Syntax.ForStatement,
                init: init,
                test: test,
                update: update,
                body: body
            };
        }

        return {
            type: Syntax.ForInStatement,
            left: left,
            right: right,
            body: body,
            each: false
        };
    }

    // 12.7 The continue statement

    function parseContinueStatement() {
        var token, label = null;

        expectKeyword('continue');

        // Optimize the most common form: 'continue;'.
        if (source[index] === ';') {
            lex();
            return {
                type: Syntax.ContinueStatement,
                label: null
            };
        }

        if (peekLineTerminator()) {
            return {
                type: Syntax.ContinueStatement,
                label: null
            };
        }

        token = lookahead();
        if (token.type === Token.Identifier) {
            lex();
            label = {
                type: Syntax.Identifier,
                name: token.value
            };
        }

        consumeSemicolon();

        return {
            type: Syntax.ContinueStatement,
            label: label
        };
    }

    // 12.8 The break statement

    function parseBreakStatement() {
        var token, label = null;

        expectKeyword('break');

        // Optimize the most common form: 'break;'.
        if (source[index] === ';') {
            lex();
            return {
                type: Syntax.BreakStatement,
                label: null
            };
        }

        if (peekLineTerminator()) {
            return {
                type: Syntax.BreakStatement,
                label: null
            };
        }

        token = lookahead();
        if (token.type === Token.Identifier) {
            lex();
            label = {
                type: Syntax.Identifier,
                name: token.value
            };
        }

        consumeSemicolon();

        return {
            type: Syntax.BreakStatement,
            label: label
        };
    }

    // 12.9 The return statement

    function parseReturnStatement() {
        var token, argument = null;

        expectKeyword('return');

        // 'return' followed by a space and an identifier is very common.
        if (source[index] === ' ') {
            if (isIdentifierStart(source[index + 1])) {
                argument = parseExpression().expression;
                consumeSemicolon();
                return {
                    type: Syntax.ReturnStatement,
                    argument: argument
                };
            }
        }

        if (peekLineTerminator()) {
            return {
                type: Syntax.ReturnStatement,
                argument: null
            };
        }

        if (!match(';')) {
            token = lookahead();
            if (!match('}') && token.type !== Token.EOF) {
                argument = parseExpression().expression;
            }
        }

        consumeSemicolon();

        return {
            type: Syntax.ReturnStatement,
            argument: argument
        };
    }

    // 12.10 The with statement

    function parseWithStatement() {
        var object, body;

        expectKeyword('with');

        expect('(');

        object = parseExpression().expression;

        expect(')');

        body = parseStatement();

        return {
            type: Syntax.WithStatement,
            object: object,
            body: body
        };
    }

    // 12.10 The swith statement

    function parseSwitchConsequent() {
        var consequent = [],
            statement;

        while (index < length) {
            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
                break;
            }
            statement = parseStatement();
            if (typeof statement === 'undefined') {
                break;
            }
            consequent.push(statement);
        }

        return consequent;
    }

    function parseSwitchStatement() {
        var discriminant, cases, test, consequent, statement;

        expectKeyword('switch');

        expect('(');

        discriminant = parseExpression().expression;

        expect(')');

        expect('{');

        if (match('}')) {
            lex();
            return {
                type: Syntax.SwitchStatement,
                discriminant: discriminant
            };
        }

        cases = [];

        while (index < length) {
            if (match('}')) {
                break;
            }

            if (matchKeyword('default')) {
                lex();
                test = null;
            } else {
                expectKeyword('case');
                test = parseExpression().expression;
            }
            expect(':');

            cases.push({
                type: Syntax.SwitchCase,
                test: test,
                consequent: parseSwitchConsequent()
            });
        }

        expect('}');

        return {
            type: Syntax.SwitchStatement,
            discriminant: discriminant,
            cases: cases
        };
    }

    // 12.13 The throw statement

    function parseThrowStatement() {
        var argument;

        expectKeyword('throw');

        if (peekLineTerminator()) {
            throwError(Messages.NewlineAfterThrow, lineNumber);
        }

        argument = parseExpression().expression;

        consumeSemicolon();

        return {
            type: Syntax.ThrowStatement,
            argument: argument
        };
    }

    // 12.14 The try statement

    function parseTryStatement() {
        var block, handlers = [], param, finalizer = null;

        expectKeyword('try');

        block = parseBlock();

        if (matchKeyword('catch')) {
            lex();
            expect('(');
            if (!match(')')) {
                param = parseExpression().expression;
            }
            expect(')');

            handlers.push({
                type: Syntax.CatchClause,
                param: param,
                guard: null,
                body: parseBlock()
            });
        }

        if (matchKeyword('finally')) {
            lex();
            finalizer = parseBlock();
        }

        if (handlers.length === 0 && !finalizer) {
            throwError(Messages.NoCatchOrFinally, lineNumber);
        }

        return {
            type: Syntax.TryStatement,
            block: block,
            handlers: handlers,
            finalizer: finalizer
        };
    }

    // 12.15 The debugger statement

    function parseDebuggerStatement() {
        expectKeyword('debugger');

        consumeSemicolon();

        return {
            type: Syntax.DebuggerStatement
        };
    }

    // 12 Statements

    function parseStatement() {
        var token = lookahead(),
            stat;

        if (token.type === Token.EOF) {
            return;
        }

        if (token.type === Token.Punctuator) {
            switch (token.value) {
            case ';':
                return parseEmptyStatement();
            case '{':
                return parseBlock();
            case '(':
                return parseExpressionStatement();
            default:
                break;
            }
        }

        if (token.type === Token.Keyword) {
            switch (token.value) {
            case 'break':
                return parseBreakStatement();
            case 'continue':
                return parseContinueStatement();
            case 'debugger':
                return parseDebuggerStatement();
            case 'do':
                return parseDoWhileStatement();
            case 'for':
                return parseForStatement();
            case 'if':
                return parseIfStatement();
            case 'let':
                return parseLetStatement();
            case 'return':
                return parseReturnStatement();
            case 'switch':
                return parseSwitchStatement();
            case 'throw':
                return parseThrowStatement();
            case 'try':
                return parseTryStatement();
            case 'var':
                return parseVariableStatement();
            case 'while':
                return parseWhileStatement();
            case 'with':
                return parseWithStatement();
            default:
                break;
            }
        }

        stat = parseExpression();

        if (stat.expression.type === Syntax.FunctionExpression) {
            if (stat.expression.id !== null) {
                return {
                    type: Syntax.FunctionDeclaration,
                    id: stat.expression.id,
                    params: stat.expression.params,
                    body: stat.expression.body
                };
            }
        }

        // 12.12 Labelled Statements
        if ((stat.expression.type === Syntax.Identifier) && match(':')) {
            lex();
            return {
                type: Syntax.LabeledStatement,
                label: stat.expression,
                body: parseStatement()
            };
        }

        consumeSemicolon();

        return stat;
    }

    // 13 Function Definition

    function parseFunctionDeclaration() {
        var token, id = null, params = [], body;

        expectKeyword('function');

        token = lex();
        if (token.type !== Token.Identifier) {
            throwUnexpected(token);
        }
        id = {
            type: Syntax.Identifier,
            name: token.value
        };

        expect('(');

        if (!match(')')) {
            while (index < length) {
                token = lex();
                if (token.type !== Token.Identifier) {
                    throwUnexpected(token);
                }
                params.push({
                    type: Syntax.Identifier,
                    name: token.value
                });
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        body = parseBlock();

        return {
            type: Syntax.FunctionDeclaration,
            id: id,
            params: params,
            body: body
        };
    }

    function parseFunctionExpression() {
        var token, id = null, params = [], body;

        expectKeyword('function');

        if (!match('(')) {
            token = lex();
            if (token.type !== Token.Identifier) {
                throwUnexpected(token);
            }
            id = {
                type: Syntax.Identifier,
                name: token.value
            };
        }

        expect('(');

        if (!match(')')) {
            while (index < length) {
                token = lex();
                if (token.type !== Token.Identifier) {
                    throwUnexpected(token);
                }
                params.push({
                    type: Syntax.Identifier,
                    name: token.value
                });
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        body = parseBlock();

        return {
            type: Syntax.FunctionExpression,
            id: id,
            params: params,
            body: body
        };
    }

    // 14 Program

    function parseSourceElement() {
        var token;

        token = lookahead();
        if (token.type === Token.EOF) {
            return;
        }

        if (matchKeyword('function')) {
            return parseFunctionDeclaration();
        }

        return parseStatement();
    }

    function parseSourceElements() {
        var sourceElement, sourceElements = [];

        while (index < length) {
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }
        return sourceElements;
    }

    function parseProgram() {
        return {
            type: Syntax.Program,
            body: parseSourceElements()
        };
    }

    // The following functions are needed only when the option to preserve
    // the comments is active.

    function scanComment() {
        var comment, ch, start, blockComment, lineComment;

        comment = '';
        blockComment = false;
        lineComment = false;

        while (index < length) {
            ch = source[index];

            if (lineComment) {
                ch = nextChar();
                if (isLineTerminator(ch)) {
                    lineComment = false;
                    lineNumber += 1;
                    extra.comments.push({
                        range: [start, index - 1],
                        type: 'Line',
                        value: comment
                    });
                    comment = '';
                } else {
                    comment += ch;
                }
            } else if (blockComment) {
                ch = nextChar();
                comment += ch;
                if (ch === '*') {
                    ch = source[index];
                    if (ch === '/') {
                        comment = comment.substr(0, comment.length - 1);
                        blockComment = false;
                        nextChar();
                        extra.comments.push({
                            range: [start, index - 1],
                            type: 'Block',
                            value: comment
                        });
                        comment = '';
                    }
                } else if (isLineTerminator(ch)) {
                    lineNumber += 1;
                }
            } else if (ch === '/') {
                ch = source[index + 1];
                if (ch === '/') {
                    start = index;
                    nextChar();
                    nextChar();
                    lineComment = true;
                } else if (ch === '*') {
                    start = index;
                    nextChar();
                    nextChar();
                    blockComment = true;
                } else {
                    break;
                }
            } else if (isWhiteSpace(ch)) {
                nextChar();
            } else if (isLineTerminator(ch)) {
                nextChar();
                lineNumber += 1;
            } else {
                break;
            }
        }

        if (comment.length > 0) {
            extra.comments.push({
                range: [start, index],
                type: (blockComment) ? 'Block' : 'Line',
                value: comment
            });
        }
    }

    function tokenTypeAsString(type) {
        switch (type) {
        case Token.BooleanLiteral: return 'Boolean';
        case Token.Identifier: return 'Identifier';
        case Token.Keyword: return 'Keyword';
        case Token.NullLiteral: return 'Null';
        case Token.NumericLiteral: return 'Numeric';
        case Token.Punctuator: return 'Punctuator';
        case Token.StringLiteral: return 'String';
        default:
            throw new Error('Unknown token type');
        }
    }

    function lexRange() {
        var pos, token, value;

        if (buffer) {
            index = buffer.range[1];
            lineNumber = buffer.lineNumber;
            token = buffer;
            buffer = null;
            return token;
        }

        buffer = null;
        skipComment();

        pos = index;
        token = advance();
        token.range = [pos, index];
        token.lineNumber = lineNumber;

        if (token.type !== Token.EOF) {
            value = source.slice(pos, index);
            if (typeof value !== 'string') {
                value = value.join('');
            }
            extra.tokens.push({
                type: tokenTypeAsString(token.type),
                value: value,
                range: [pos, index - 1]
            });
        }

        return token;
    }

    function scanRegExpRange() {
        var pos, regex, token;

        skipComment();

        pos = index;
        regex = extra.scanRegExp();

        // Pop the previous token, which is likely '/' or '/='
        if (extra.tokens.length > 0) {
            token = extra.tokens[extra.tokens.length - 1];
            if (token.range[0] === pos && token.type === 'Punctuator') {
                if (token.value === '/' || token.value === '/=') {
                    extra.tokens.pop();
                }
            }
        }

        extra.tokens.push({
            type: 'RegularExpression',
            value: regex.literal,
            range: [pos, index - 1]
        });

        return regex;
    }

    function parsePrimaryRange() {
        var pos, node;

        skipComment();
        pos = index;
        node = parsePrimary();
        node.range = [pos, index - 1];
        return node;
    }

    function processRange(program) {

        function enclosed(a, b) {
            if (typeof a.range === 'object' && typeof b.range === 'object') {
                return [a.range[0], b.range[1]];
            }
        }

        function findBefore(pos) {
            var left = 0,
                right = extra.tokens.length - 1,
                middle,
                token;

            while (left < right) {
                middle = (left + right) >> 1;
                token = extra.tokens[middle];
                if (pos > token.range[1]) {
                    left = Math.min(middle + 1, right);
                } else {
                    right = Math.max(middle - 1, left);
                }
            }

            token = extra.tokens[left];
            if (pos > token.range[1]) {
                return token;
            } else {
                return extra.tokens[left - 1];
            }
        }

        function findAfter(pos) {
            var left = 0,
                right = extra.tokens.length - 1,
                middle,
                token;

            while (left < right) {
                middle = (left + right) >> 1;
                token = extra.tokens[middle];
                if (pos < token.range[0]) {
                    right = Math.max(middle - 1, left);
                } else {
                    left = Math.min(middle + 1, right);
                }
            }

            token = extra.tokens[left];
            if (pos < token.range[0]) {
                return token;
            } else {
                return extra.tokens[right + 1];
            }
        }

        function processNode(node) {
            var i, child, token;

            if (node === null || typeof node !== 'object') {
                return;
            }

            if ((node instanceof Array) && node.length) {
                for (i = 0; i < node.length; i += 1) {
                    processNode(node[i]);
                }
            } else {
                for (i in node) {
                    if (node.hasOwnProperty(i)) {
                        processNode(node[i]);
                    }
                }
            }

            switch (node.type) {

            case Syntax.AssignmentExpression:
            case Syntax.LogicalExpression:
                node.range = enclosed(node.left, node.right);
                break;

            case Syntax.BinaryExpression:
                // Primary expression in a bracket, e.g. '(1 + 2)', already
                // has the range info.
                if (!node.hasOwnProperty('range')) {
                    node.range = enclosed(node.left, node.right);
                }
                break;

            case Syntax.ConditionalExpression:
                node.range = enclosed(node.test, node.alternate);
                break;

            case Syntax.MemberExpression:

                child = node.property;

                // This is for the construct like 'foo[bar]'.
                // Find the first token after the closing bracket ].
                if (node.computed && node.property.hasOwnProperty('range')) {
                    token = findAfter(child.range[1]);
                    if (typeof token !== 'undefined') {
                        if (token.type === 'Punctuator' && token.value === ']') {
                            child = token;
                        }
                    }
                }

                // This is for the construct like 'foo.bar'.
                // Find the first token after the dot sign.
                if (!node.computed && node.object.hasOwnProperty('range')) {
                    token = findAfter(node.object.range[1]);
                    if (typeof token !== 'undefined' && token.value === '.') {
                        token = findAfter(token.range[1]);
                        if (typeof token !== 'undefined') {
                            node.property.range = token.range;
                            child = node.property;
                        }
                    }
                }
                node.range = enclosed(node.object, child);
                break;

            case Syntax.UnaryExpression:
                child = node.argument;
                if (child.hasOwnProperty('range')) {
                    node.range = enclosed(findBefore(child.range[0]), child);
                }
                break;

            case Syntax.SequenceExpression:
                child = node.expressions[node.expressions.length - 1];
                node.range = enclosed(node.expressions[0], child);
                break;

            case Syntax.UpdateExpression:
                child = node.argument;
                if (child.hasOwnProperty('range')) {
                    if (node.prefix) {
                        node.range = enclosed(findBefore(child.range[0]), child);
                    } else {
                        node.range = enclosed(child, findAfter(child.range[1]));
                    }
                }
                break;

            default:
                break;
            }
        }

        processNode(program);
    }

    function patch(options) {

        var opt = {
            comment: typeof options.comment === 'boolean' && options.comment,
            range: typeof options.range === 'boolean' && options.range,
            tokens: typeof options.tokens === 'boolean' && options.tokens
        };

        extra = {};

        if (opt.comment) {
            extra.skipComment = skipComment;
            skipComment = scanComment;
            extra.comments = [];
        }

        if (opt.range) {
            extra.parsePrimaryExpression = parsePrimaryExpression;
            parsePrimaryExpression = parsePrimaryRange;
        }

        // Range processing will need the list of tokens as well.
        if (opt.range || opt.tokens) {
            extra.lex = lex;
            extra.scanRegExp = scanRegExp;

            lex = lexRange;
            scanRegExp = scanRegExpRange;

            extra.tokens = [];
        }
    }

    function unpatch() {
        if (typeof extra.skipComment === 'function') {
            skipComment = extra.skipComment;
        }

        if (typeof extra.parsePrimaryExpression === 'function') {
            parsePrimaryExpression = extra.parsePrimaryExpression;
        }

        if (typeof extra.lex === 'function') {
            lex = extra.lex;
        }

        if (typeof extra.scanRegExp === 'function') {
            scanRegExp = extra.scanRegExp;
        }

        extra = {};
    }

    function stringToArray(str) {
        var length = str.length,
            result = [],
            i;
        for (i = 0; i < length; i += 1) {
            result[i] = str.charAt(i);
        }
        return result;
    }

    function parse(code, opt) {
        var options,
            program;

        options = opt || {};

        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        length = source.length;
        buffer = null;

        if (length > 0) {
            if (typeof source[0] === 'undefined') {
                // Try first to convert to a string. This is good as fast path
                // for old IE which understands string indexing for string
                // literals only and not for string object.
                if (code instanceof String) {
                    source = code.valueOf();
                }

                // Force accessing the characters via an array.
                if (typeof source[0] === 'undefined') {
                    source = stringToArray(code);
                }
            }
        }

        patch(options);
        try {
            program = parseProgram();
            if (typeof extra.comments !== 'undefined') {
                program.comments = extra.comments;
            }
            if (typeof extra.tokens !== 'undefined') {
                // Range processing might produce the list of tokens. Thus,
                // only export the tokens when it is explicit in the options.
                if (typeof options.tokens === 'boolean' && options.tokens) {
                    program.tokens = extra.tokens;
                }
            }
            if (typeof options.range === 'boolean' && options.range) {
                processRange(program);
            }
        } catch (e) {
            throw e;
        } finally {
            unpatch();
        }

        return program;
    }

    // Executes f on the object and its children (recursively).

    function visitPreorder(object, f) {
        var key, child;

        if (f(object) === false) {
            return;
        }
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                child = object[key];
                if (typeof child === 'object' && child !== null) {
                    visitPreorder(child, f);
                }
            }
        }
    }

    function traverse(code, options, f) {
        var program;

        if (typeof options === 'undefined') {
            throw new Error('Wrong use of traverse() function');
        }

        if (typeof f === 'undefined') {
            f = options;
            options = {};
        }

        program = parse(code, options);
        visitPreorder(program, f);

        return program;
    }

    // Sync with package.json.
    exports.version = '0.9.6';

    exports.parse = parse;
    exports.traverse = traverse;

}(typeof exports === 'undefined' ? (esprima = {}) : exports));
