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

/*global esprima:true, exports:true,
parseAssignmentExpression: true, parseExpression: true,
parseFunctionDeclaration: true, parseFunctionExpression: true,
parseStatement: true */

(function (exports) {
    'use strict';

    var Token,
        Syntax,
        source,
        index,
        length,
        buffer;

    Token = {
        BooleanLiteral: 'BooleanLiteral',
        EOF: 'EOF',
        FutureReservedWord: 'FutureReservedWord',
        Identifier: 'Identifier',
        Keyword: 'Keyword',
        NullLiteral: 'NullLiteral',
        NumericLiteral: 'NumericLiteral',
        Punctuator: 'Punctuator',
        StringLiteral: 'StringLiteral'
    };

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
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

    if (typeof Object.freeze === 'function') {
        Object.freeze(Token);
        Object.freeze(Syntax);
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
        return (ch === '\u0009') || (ch === '\u000B') || (ch === '\u000C') ||
            (ch === ' ') || (ch === '\u00A0') || (ch === '\uFEFF');
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

    // 7.6.1.1 Keywords

    function isKeyword(id) {
        switch (id) {
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
        }
        return false;
    }

   // 7.6.1.2 Future Reserved Words

    function isFutureReservedWord(id) {
        switch (id) {
        case 'class':
        case 'const':
        case 'enum':
        case 'export':
        case 'extends':
        case 'import':
        case 'super':

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
        return false;
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
                }
            } else if (blockComment) {
                nextChar();
                if (ch === '*') {
                    ch = source[index];
                    if (ch === '/') {
                        nextChar();
                        blockComment = false;
                    }
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

        if (isKeyword(id)) {
            return {
                type: Token.Keyword,
                value: id
            };
        }

        if (isFutureReservedWord(id)) {
            return {
                type: Token.FutureReservedKeyword,
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
                throw {
                    message: 'Unexpected ' + ch + ' after the exponent sign'
                };
            }
        }

        if (number === '.') {
            throw {
                message: 'Expecting decimal digits after the dot sign'
            };
        }

        return {
            type: Token.NumericLiteral,
            value: parseFloat(number)
        };
    }

    // 7.8.4 String Literals

    // TODO Unicode, line continuiation
    function scanStringLiteral() {
        var str = '', quote, ch;

        quote = source[index];
        if (quote !== '\'' && quote !== '"') {
            return;
        }
        nextChar();

        while (index < length) {
            ch = nextChar();

            if (typeof ch === 'undefined') {
                throw {
                    message: 'Unterminated string'
                };
            }

            if (ch === quote) {
                break;
            } else if (ch === '\\') {
                str += ch;
                str += nextChar();
            } else {
                str += ch;
            }
        }

        return {
            type: Token.StringLiteral,
            value: str
        };
    }

    function scanRegExp() {
        var str = '', ch, classMarker = false;

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
                    throw {
                        message: 'Unexpected line terminator in a regular expression'
                    };
                }
            }
        }

        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch)) {
                break;
            }
            str += nextChar();
        }

        return str;
    }

    function lex() {
        var ch, token;

        buffer = null;
        skipComment();

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

        throw {
            message: 'Unknown token from character ' + nextChar()
        };
    }

    function lookahead() {
        var pos, token;

        if (buffer !== null) {
            return buffer;
        }

        pos = index;
        token = lex();
        index = pos;

        buffer = token;
        return buffer;
    }

    // Throw an exception because of the token.

    function throwUnexpected(token) {
        var s;

        if (token.type === Token.EOF) {
            throw {
                message: 'Unexpected <EOF>'
            };
        }

        s = token.value;
        if (s.length > 10) {
            s = s.substr(0, 10) + '...';
        }
        throw {
            message: 'Unexpected token ' + s
        };
    }

    // Expect the next token to match the specified one.
    // If not, an exception will be thrown.

    function expect(type, value) {
        var token;

        token = lex();
        if (token.type !== type || token.value !== value) {
            throwUnexpected(token);
        }

        return token;
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


    function consumeSemicolon() {
        if (match(';')) {
            lex();
        }
    }

    // 11.1.4 Array Initialiser

    function parseArrayInitialiser() {
        var elements = [],
            undef;

        expect(Token.Punctuator, '[');

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

                expect(Token.Punctuator, ',');
            }
        }

        return {
            type: 'ArrayExpression',
            elements: elements
        };
    }

    // 11.1.5 Object Initialiser

    function parseObjectInitialiser() {
        var token, expr, properties = [], property;

        function isPropertyName(t) {
            return t === Token.Identifier ||
                t === Token.StringLiteral ||
                t === Token.NumericLiteral;
        }

        expect(Token.Punctuator, '{');

        // TODO handle 'get' and 'set'
        while (index < length) {
            token = lex();
            if (token.type === Token.Punctuator && token.value === '}') {
                break;
            }

            if (isPropertyName(token.type)) {
                property = {};
                if (token.type === Token.Identifier) {
                    property.key = {
                        type: 'Identifier',
                        name: token.value
                    };
                } else {
                    property.key = {
                        type: 'Literal',
                        value: token.value
                    };
                }

                expect(Token.Punctuator, ':');
                property.value = parseAssignmentExpression();

                properties.push(property);
            } else {
                throwUnexpected(token);
            }

            token = lookahead();
            if (token.type === Token.Punctuator && token.value === '}') {
                lex();
                break;
            }
            expect(Token.Punctuator, ',');
        }

        return {
            type: 'ObjectExpression',
            properties: properties
        };
    }

    // 11.1 Primary Expressions

    function parsePrimaryExpression() {
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
            expect(Token.Punctuator, ')');
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
                value: scanRegExp()
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

        return;
    }

    // 11.2 Left-Hand-Side Expressions

    function parseArguments() {
        var args = [];

        expect(Token.Punctuator, '(');

        if (!match(')')) {
            while (index < length) {
                args.push(parseAssignmentExpression());
                if (match(')')) {
                    break;
                }
                expect(Token.Punctuator, ',');
            }
        }

        expect(Token.Punctuator, ')');

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
                    throw {
                        message: 'Expecting an identifier after dot (.)'
                    };
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
                if (property.type === 'ExpressionStatement') {
                    property = property.expression;
                }
                expr = {
                    type: Syntax.MemberExpression,
                    computed: true,
                    object: expr,
                    property: property
                };
                expect(Token.Punctuator, ']');
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

        if (match('++') || match('--')) {
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

        if (match('++') || match('--')) {
            return {
                type: Syntax.UpdateExpression,
                operator: lex().value,
                argument: parseUnaryExpression(),
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
        var token, expr;

        token = lookahead();
        expr = parseLogicalORExpression();
        if (typeof expr === 'undefined') {
            throwUnexpected(token);
        }

        if (match('?')) {
            lex();
            expr = {
                type: Syntax.ConditionalExpression,
                test: expr
            };
            expr.consequent = parseAssignmentExpression();
            expect(Token.Punctuator, ':');
            expr.alternate = parseAssignmentExpression();
        }

        return expr;
    }

    // 11.13 Assignment Operators

    function parseAssignmentExpression() {

        var expr = parseConditionalExpression();

        if (matchAssign()) {
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
        var list = [];

        while (index < length) {
            if (match('}')) {
                break;
            }
            list.push(parseStatement());
        }

        return list;
    }

    function parseBlock() {
        var block;

        expect(Token.Punctuator, '{');

        block = parseStatementList();

        expect(Token.Punctuator, '}');

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
            throw {
                message: 'Expected an identifier'
            };
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

        expect(Token.Keyword, 'var');

        declarations = parseVariableDeclarationList();

        consumeSemicolon();

        return {
            type: Syntax.VariableDeclaration,
            declarations: declarations,
            kind: 'var'
        };
    }

    // 12.3 Empty Statement

    function parseEmptyStatement() {
        expect(Token.Punctuator, ';');

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

        expect(Token.Keyword, 'if');

        expect(Token.Punctuator, '(');

        test = parseExpression().expression;

        expect(Token.Punctuator, ')');

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

        expect(Token.Keyword, 'do');

        body = parseStatement();

        expect(Token.Keyword, 'while');

        expect(Token.Punctuator, '(');

        test = parseExpression().expression;

        expect(Token.Punctuator, ')');

        consumeSemicolon();

        return {
            type: Syntax.DoWhileStatement,
            body: body,
            test: test
        };
    }

    function parseWhileStatement() {
        var test, body;

        expect(Token.Keyword, 'while');

        expect(Token.Punctuator, '(');

        test = parseExpression().expression;

        expect(Token.Punctuator, ')');

        body = parseStatement();

        return {
            type: Syntax.WhileStatement,
            test: test,
            body: body
        };
    }

    function parseForStatement() {
        var init, test, update, left, right, body;

        init = test = update = null;

        expect(Token.Keyword, 'for');

        expect(Token.Punctuator, '(');

        if (match(';')) {
            lex();
        } else {
            if (matchKeyword('var')) {
                lex();
                init = {
                    type: Syntax.VariableDeclaration,
                    declarations: parseVariableDeclarationList(),
                    kind: 'var'
                };

                if (matchKeyword('in')) {
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
                } else {
                    expect(Token.Punctuator, ';');
                }
            }
        }

        if (typeof left === 'undefined') {

            if (!match(';')) {
                test = parseExpression().expression;
            }
            expect(Token.Punctuator, ';');

            if (!match(')')) {
                update = parseExpression().expression;
            }
        }

        expect(Token.Punctuator, ')');

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

        expect(Token.Keyword, 'continue');

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

        expect(Token.Keyword, 'break');

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

        expect(Token.Keyword, 'return');

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

        expect(Token.Keyword, 'with');

        expect(Token.Punctuator, '(');

        object = parseExpression().expression;

        expect(Token.Punctuator, ')');

        body = parseStatement();

        return {
            type: Syntax.WithStatement,
            object: object,
            body: body
        };
    }

    // 12.10 The swith statement

    function parseSwitchStatement() {
        var discriminant, cases, test, consequent;

        expect(Token.Keyword, 'switch');

        expect(Token.Punctuator, '(');

        discriminant = parseExpression().expression;

        expect(Token.Punctuator, ')');

        expect(Token.Punctuator, '{');

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
                expect(Token.Keyword, 'case');
                test = parseExpression().expression;
            }
            expect(Token.Punctuator, ':');

            consequent = [];

            while (index < length) {
                if (match('}') || matchKeyword('default') || matchKeyword('case')) {
                    break;
                }
                consequent.push(parseStatement());
            }

            cases.push({
                type: Syntax.SwitchCase,
                test: test,
                consequent: consequent
            });
        }

        expect(Token.Punctuator, '}');

        return {
            type: Syntax.SwitchStatement,
            discriminant: discriminant,
            cases: cases
        };
    }

    // 12.13 The throw statement

    function parseThrowStatement() {
        var token, argument = null;

        expect(Token.Keyword, 'throw');

        if (!match(';')) {
            token = lookahead();
            if (token.type !== Token.EOF) {
                argument = parseExpression().expression;
            }
        }

        consumeSemicolon();

        return {
            type: Syntax.ThrowStatement,
            argument: argument
        };
    }

    // 12.14 The try statement

    function parseTryStatement() {
        var block, handlers = [], param, finalizer = null;

        expect(Token.Keyword, 'try');

        block = parseBlock();

        if (matchKeyword('catch')) {
            lex();
            expect(Token.Punctuator, '(');
            if (!match(')')) {
                param = parseExpression().expression;
            }
            expect(Token.Punctuator, ')');

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

        return {
            type: Syntax.TryStatement,
            block: block,
            handlers: handlers,
            finalizer: finalizer
        };
    }

    // 12.15 The debugger statement

    function parseDebuggerStatement() {
        expect(Token.Keyword, 'debugger');

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

        stat = parseExpressionStatement();

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

        return stat;
    }

    // 13 Function Definition

    function parseFunctionDeclaration() {
        var token, id = null, params = [], body;

        expect(Token.Keyword, 'function');

        token = lex();
        if (token.type !== 'Identifier') {
            throwUnexpected(token);
        }
        id = {
            type: Syntax.Identifier,
            name: token.value
        };

        expect(Token.Punctuator, '(');

        if (!match(')')) {
            while (index < length) {
                token = lex();
                if (token.type !== 'Identifier') {
                    throwUnexpected(token);
                }
                params.push({
                    type: 'Identifier',
                    name: token.value
                });
                if (match(')')) {
                    break;
                }
                expect(Token.Punctuator, ',');
            }
        }

        expect(Token.Punctuator, ')');

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

        expect(Token.Keyword, 'function');

        if (!match('(')) {
            token = lex();
            if (token.type !== 'Identifier') {
                throwUnexpected(token);
            }
            id = {
                type: Syntax.Identifier,
                name: token.value
            };
        }

        expect(Token.Punctuator, '(');

        if (!match(')')) {
            while (index < length) {
                token = lex();
                if (token.type !== 'Identifier') {
                    throwUnexpected(token);
                }
                params.push({
                    type: 'Identifier',
                    name: token.value
                });
                if (match(')')) {
                    break;
                }
                expect(Token.Punctuator, ',');
            }
        }

        expect(Token.Punctuator, ')');

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

    exports.parse = function (code) {
        source = code;
        index = 0;
        length = source.length;
        buffer = null;
        return parseProgram();
    };

    // Sync with package.json.
    exports.version = '0.9.0';

}(typeof exports === 'undefined' ? (esprima = {}) : exports));
