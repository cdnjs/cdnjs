/*
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
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
throwError: true, createLiteral: true, generateStatement: true,
parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
parseFunctionDeclaration: true, parseFunctionExpression: true,
parseLeftHandSideExpression: true,
parseStatement: true, parseSourceElement: true */

(function (exports) {
    'use strict';

    var Token,
        Syntax,
        PropertyKind,
        Messages,
        Regex,
        Precedence,
        BinaryPrecedence,
        source,
        allowIn,
        strict,
        index,
        lineNumber,
        lineStart,
        length,
        buffer,
        base,
        indent,
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
        Property: 'Property',
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
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement'
    };

    PropertyKind = {
        Data: 1,
        Get: 2,
        Set: 4
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
        NoCatchOrFinally:  'Missing catch or finally after try',
        StrictDelete:  'Delete of an unqualified identifier in strict mode.',
        StrictDuplicateProperty:  'Duplicate data property in object literal not allowed in strict mode',
        StrictAccessorDataProperty:  'Object literal may not have data and accessor property with the same name',
        StrictAccessorGetSet:  'Object literal may not have multiple get/set accessors with the same name'
    };

    Precedence = {
        Sequence: 0,
        Assignment: 1,
        Conditional: 2,
        LogicalOR: 3,
        LogicalAND: 4,
        LogicalXOR: 5,
        BitwiseOR: 6,
        BitwiseAND: 7,
        Equality: 8,
        Relational: 9,
        BitwiseSHIFT: 10,
        Additive: 11,
        Multiplicative: 12,
        Unary: 13,
        Postfix: 14,
        Call: 15,
        New: 16,
        Member: 17,
        Primary: 18
    };

    // See also tools/generate-unicode-regex.py.
    Regex = {
        NonAsciiIdentifierStart: new RegExp('[\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376-\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58-\u0C59\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E46\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDD\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10D0-\u10FA\u10FC\u1100-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BC0-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183-\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2D00-\u2D25\u2D30-\u2D65\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3006\u3031-\u3035\u303B-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCB\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA791\uA7A0-\uA7A9\uA7FA-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA2D\uFA30-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
        NonAsciiIdentifierPart: new RegExp('[\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376-\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7-\u09C8\u09CB-\u09CE\u09D7\u09DC-\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A3C\u0A3E-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47-\u0B48\u0B4B-\u0B4D\u0B56-\u0B57\u0B5C-\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82-\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56\u0C58-\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5-\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1-\u0CF2\u0D02-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2-\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDD\u0F00\u0F18-\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10D0-\u10FA\u10FC\u1100-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772-\u1773\u1780-\u17B3\u17B6-\u17D3\u17D7\u17DC-\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BAA\u1BAE-\u1BB9\u1BC0-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF2\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F-\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183-\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF1\u2D00-\u2D25\u2D30-\u2D65\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3006\u302A-\u302F\u3031-\u3035\u303B-\u303C\u3041-\u3096\u3099-\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCB\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA67C-\uA67D\uA67F-\uA697\uA6A0-\uA6E5\uA6F0-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA791\uA7A0-\uA7A9\uA7FA-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC-\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA2D\uFA30-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33-\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
    };

    if (typeof Object.freeze === 'function') {
        Object.freeze(Token);
        Object.freeze(Syntax);
        Object.freeze(Messages);
        Object.freeze(Regex);
    }

    function sliceSource(from, to) {
        return source.slice(from, to);
    }

    if (typeof 'esprima'[0] === 'undefined') {
        sliceSource = function sliceArraySource(from, to) {
            return source.slice(from, to).join('');
        };
    }

    function isDecimalDigit(ch) {
        return '0123456789'.indexOf(ch) >= 0;
    }

    function isHexDigit(ch) {
        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }

    function isOctalDigit(ch) {
        return '01234567'.indexOf(ch) >= 0;
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
        return (ch === '$') || (ch === '_') || (ch === '\\') ||
            (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
            ((ch.charCodeAt(0) >= 0x80) && Regex.NonAsciiIdentifierStart.test(ch));
    }

    function isIdentifierPart(ch) {
        return (ch === '$') || (ch === '_') || (ch === '\\') ||
            (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
            ((ch >= '0') && (ch <= '9')) ||
            ((ch.charCodeAt(0) >= 0x80) && Regex.NonAsciiIdentifierPart.test(ch));
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
                    if (ch ===  '\r' && source[index] === '\n') {
                        nextChar();
                    }
                    lineNumber += 1;
                    lineStart = index;
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
                    if (ch ===  '\r' && source[index] === '\n') {
                        nextChar();
                    }
                    lineNumber += 1;
                    lineStart = index;
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
                if (ch ===  '\r' && source[index] === '\n') {
                    nextChar();
                }
                lineNumber += 1;
                lineStart = index;
            } else {
                break;
            }
        }
    }

    function scanHexEscape(prefix) {
        var i, len, ch, code = 0;

        len = (prefix === 'u') ? 4 : 2;
        for (i = 0; i < len; i += 1) {
            if (index < length && isHexDigit(source[index])) {
                ch = nextChar();
                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
            } else {
                return '';
            }
        }
        return String.fromCharCode(code);
    }

    function scanIdentifier() {
        var ch, start, id, restore;

        ch = source[index];
        if (!isIdentifierStart(ch)) {
            return;
        }

        start = index;
        if (ch === '\\') {
            nextChar();
            if (source[index] !== 'u') {
                return;
            }
            nextChar();
            restore = index;
            ch = scanHexEscape('u');
            if (ch) {
                if (ch === '\\' || !isIdentifierStart(ch)) {
                    return;
                }
                id = ch;
            } else {
                index = restore;
                id = 'u';
            }
        } else {
            id = nextChar();
        }

        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch)) {
                break;
            }
            if (ch === '\\') {
                nextChar();
                if (source[index] !== 'u') {
                    return;
                }
                nextChar();
                restore = index;
                ch = scanHexEscape('u');
                if (ch) {
                    if (ch === '\\' || !isIdentifierPart(ch)) {
                        return;
                    }
                    id += ch;
                } else {
                    index = restore;
                    id += 'u';
                }
            } else {
                id += nextChar();
            }
        }

        // There is no keyword or literal with only one character.
        // Thus, it must be an identifier.
        if (id.length === 1) {
            return {
                type: Token.Identifier,
                value: id,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (isKeyword(id)) {
            return {
                type: Token.Keyword,
                value: id,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        // 7.8.1 Null Literals

        if (id === 'null') {
            return {
                type: Token.NullLiteral,
                value: id,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        // 7.8.2 Boolean Literals

        if (id === 'true' || id === 'false') {
            return {
                type: Token.BooleanLiteral,
                value: id,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        return {
            type: Token.Identifier,
            value: id,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    // 7.7 Punctuators

    function scanPunctuator() {
        var start = index,
            ch1 = source[index],
            ch2,
            ch3,
            ch4;

        // Check for most common single-character punctuators.

        if (ch1 === ';' || ch1 === '{' || ch1 === '}') {
            nextChar();
            return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === ',' || ch1 === '(' || ch1 === ')') {
            nextChar();
            return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        // Dot (.) can also start a floating-point number, hence the need
        // to check the next character.

        ch2 = source[index + 1];
        if (ch1 === '.' && !isDecimalDigit(ch2)) {
            return {
                type: Token.Punctuator,
                value: nextChar(),
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
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
                    value: '>>>=',
                    lineNumber: lineNumber,
                    lineStart: lineStart,
                    range: [start, index]
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
                value: '===',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '!' && ch2 === '=' && ch3 === '=') {
            nextChar();
            nextChar();
            nextChar();
            return {
                type: Token.Punctuator,
                value: '!==',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            nextChar();
            nextChar();
            nextChar();
            return {
                type: Token.Punctuator,
                value: '>>>',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '<' && ch2 === '<' && ch3 === '=') {
            nextChar();
            nextChar();
            nextChar();
            return {
                type: Token.Punctuator,
                value: '<<=',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '>' && ch2 === '>' && ch3 === '=') {
            nextChar();
            nextChar();
            nextChar();
            return {
                type: Token.Punctuator,
                value: '>>=',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
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
                    value: ch1 + ch2,
                    lineNumber: lineNumber,
                    lineStart: lineStart,
                    range: [start, index]
                };
            }
        }

        if (ch1 === ch2 && ('+-<>&|'.indexOf(ch1) >= 0)) {
            if ('+-<>&|'.indexOf(ch2) >= 0) {
                nextChar();
                nextChar();
                return {
                    type: Token.Punctuator,
                    value: ch1 + ch2,
                    lineNumber: lineNumber,
                    lineStart: lineStart,
                    range: [start, index]
                };
            }
        }

        // The remaining 1-character punctuators.

        if ('[]<>+-*%&|^!~?:=/'.indexOf(ch1) >= 0) {
            return {
                type: Token.Punctuator,
                value: nextChar(),
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }
    }

    // 7.8.3 Numeric Literals

    function scanNumericLiteral() {
        var number, start, ch;

        ch = source[index];
        if (!isDecimalDigit(ch) && (ch !== '.')) {
            return;
        }

        start = index;
        number = '';
        if (ch !== '.') {
            number = nextChar();
            ch = source[index];

            // Hex number starts with '0x'.
            // Octal number starts with '0'.
            if (number === '0') {
                if (ch === 'x' || ch === 'X') {
                    number += nextChar();
                    while (index < length) {
                        ch = source[index];
                        if (!isHexDigit(ch)) {
                            break;
                        }
                        number += nextChar();
                    }

                    if (number.length <= 2) {
                        // only 0x
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }

                    if (index < length) {
                        ch = source[index];
                        if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
                            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                        }
                    }
                    return {
                        type: Token.NumericLiteral,
                        value: parseInt(number, 16),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [start, index]
                    };
                } else if (isOctalDigit(ch)) {
                    number += nextChar();
                    while (index < length) {
                        ch = source[index];
                        if (!isOctalDigit(ch)) {
                            break;
                        }
                        number += nextChar();
                    }

                    if (index < length) {
                        ch = source[index];
                        if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
                            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                        }
                    }
                    return {
                        type: Token.NumericLiteral,
                        value: parseInt(number, 8),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [start, index]
                    };
                }

                // decimal number starts with '0' such as '09' is illegal.
                if (isDecimalDigit(ch)) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
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
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
        }

        if (index < length) {
            ch = source[index];
            if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
        }

        return {
            type: Token.NumericLiteral,
            value: parseFloat(number),
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    // 7.8.4 String Literals

    function scanStringLiteral() {
        var str = '', quote, start, ch, code, unescaped, restore, octal = false;

        quote = source[index];
        if (quote !== '\'' && quote !== '"') {
            return;
        }
        start = index;
        nextChar();

        while (index < length) {
            ch = nextChar();

            if (ch === quote) {
                quote = '';
                break;
            } else if (ch === '\\') {
                ch = nextChar();
                if (!isLineTerminator(ch)) {
                    switch (ch) {
                    case 'n':
                        str += '\n';
                        break;
                    case 'r':
                        str += '\r';
                        break;
                    case 't':
                        str += '\t';
                        break;
                    case 'u':
                    case 'x':
                        restore = index;
                        unescaped = scanHexEscape(ch);
                        if (unescaped) {
                            str += unescaped;
                        } else {
                            index = restore;
                            str += ch;
                        }
                        break;
                    case 'b':
                        str += '\b';
                        break;
                    case 'f':
                        str += '\f';
                        break;
                    case 'v':
                        str += '\v';
                        break;

                    default:
                        if (isOctalDigit(ch)) {
                            code = '01234567'.indexOf(ch);

                            // \0 is not octal escape sequence
                            if (code !== 0) {
                                octal = true;
                            }

                            if (index < length && isOctalDigit(source[index])) {
                                octal = true;
                                code = code * 8 + '01234567'.indexOf(nextChar());

                                // 3 digits are only allowed when string starts
                                // with 0, 1, 2, 3
                                if ('0123'.indexOf(ch) >= 0 &&
                                        index < length &&
                                        isOctalDigit(source[index])) {
                                    code = code * 8 + '01234567'.indexOf(nextChar());
                                }
                            }
                            str += String.fromCharCode(code);
                        } else {
                            str += ch;
                        }
                        break;
                    }
                } else {
                    lineNumber += 1;
                    if (ch ===  '\r' && source[index] === '\n') {
                        nextChar();
                    }
                }
            } else if (isLineTerminator(ch)) {
                break;
            } else {
                str += ch;
            }
        }

        if (quote !== '') {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.StringLiteral,
            value: str,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    function scanRegExp() {
        var str = '', ch, start, pattern, flags, value, classMarker = false, restore;

        buffer = null;
        skipComment();

        start = index;
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
                    throwError({}, Messages.UnterminatedRegExp);
                }
            }
        }

        if (str.length === 1) {
            throwError({}, Messages.UnterminatedRegExp);
        }

        // Exclude leading and trailing slash.
        pattern = str.substr(1, str.length - 2);

        flags = '';
        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch)) {
                break;
            }

            nextChar();
            if (ch === '\\' && index < length) {
                ch = source[index];
                if (ch === 'u') {
                    nextChar();
                    restore = index;
                    ch = scanHexEscape('u');
                    if (ch) {
                        flags += ch;
                        str += '\\u';
                        for (; restore < index; restore += 1) {
                            str += source[restore];
                        }
                    } else {
                        index = restore;
                        flags += 'u';
                        str += '\\u';
                    }
                } else {
                    str += '\\';
                }
            } else {
                flags += ch;
                str += ch;
            }
        }

        try {
            value = new RegExp(pattern, flags);
        } catch (e) {
            throwError({}, Messages.InvalidRegExp);
        }

        return {
            literal: str,
            value: value,
            range: [start, index]
        };
    }

    function isIdentifierName(token) {
        return token.type === Token.Identifier ||
            token.type === Token.Keyword ||
            token.type === Token.BooleanLiteral ||
            token.type === Token.NullLiteral;
    }

    function advance() {
        var ch, token;

        skipComment();

        if (index >= length) {
            return {
                type: Token.EOF,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [index, index]
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

        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }

    function lex() {
        var token;

        if (buffer) {
            index = buffer.range[1];
            lineNumber = buffer.lineNumber;
            lineStart = buffer.lineStart;
            token = buffer;
            buffer = null;
            return token;
        }

        buffer = null;
        return advance();
    }

    function lookahead() {
        var pos, line, start;

        if (buffer !== null) {
            return buffer;
        }

        pos = index;
        line = lineNumber;
        start = lineStart;
        buffer = advance();
        index = pos;
        lineNumber = line;
        lineStart = start;

        return buffer;
    }

    // Return true if there is a line terminator before the next token.

    function peekLineTerminator() {
        var pos, line, start, found;

        pos = index;
        line = lineNumber;
        start = lineStart;
        skipComment();
        found = lineNumber !== line;
        index = pos;
        lineNumber = line;
        lineStart = start;

        return found;
    }

    // Throw an exception

    function throwError(token, messageFormat) {
        var error,
            args = Array.prototype.slice.call(arguments, 2),
            msg = messageFormat.replace(
                /%(\d)/g,
                function (whole, index) {
                    return args[index] || '';
                }
            );

        if (typeof token.lineNumber === 'number') {
            error = new Error('Line ' + token.lineNumber + ': ' + msg);
            error.index = token.range[0];
            error.lineNumber = token.lineNumber;
            error.column = token.range[0] - lineStart + 1;
        } else {
            error = new Error('Line ' + lineNumber + ': ' + msg);
            error.index = index;
            error.lineNumber = lineNumber;
            error.column = index - lineStart + 1;
        }

        throw error;
    }

    // Throw an exception because of the token.

    function throwUnexpected(token) {
        var s;

        if (token.type === Token.EOF) {
            throwError(token, Messages.UnexpectedEOS);
        }

        if (token.type === Token.NumericLiteral) {
            throwError(token, Messages.UnexpectedNumber);
        }

        if (token.type === Token.StringLiteral) {
            throwError(token, Messages.UnexpectedString);
        }

        if (token.type === Token.Identifier) {
            throwError(token, Messages.UnexpectedIdentifier);
        }

        if (token.type === Token.Keyword && isFutureReservedWord(token.value)) {
            throwError(token, Messages.UnexpectedReserved);
        }

        s = token.value;
        if (s.length > 10) {
            s = s.substr(0, 10) + '...';
        }
        throwError(token, Messages.UnexpectedToken, s);
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

    function parsePropertyFunction(param) {
        return {
            type: Syntax.FunctionExpression,
            id: null,
            params: param,
            body: parseBlock()
        };
    }

    function parseObjectPropertyKey() {
        var token = lex(),
            key;

        switch (token.type) {

        case Token.StringLiteral:
        case Token.NumericLiteral:
            key = createLiteral(token);
            break;

        case Token.Identifier:
        case Token.Keyword:
        case Token.BooleanLiteral:
        case Token.NullLiteral:
            key = {
                type: Syntax.Identifier,
                name: token.value
            };
            break;

        default:
            throwUnexpected(token);
        }

        return key;
    }

    function parseObjectProperty() {
        var token, property, key, id, param;

        token = lookahead();

        switch (token.type) {

        case Token.Identifier:
            id = parseObjectPropertyKey();

            // Property Assignment: Getter and Setter.

            if (token.value === 'get' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                expect(')');
                property = {
                    type: Syntax.Property,
                    key: key,
                    value: parsePropertyFunction([]),
                    kind: 'get'
                };
            } else if (token.value === 'set' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                token = lookahead();
                if (token.type !== Token.Identifier) {
                    throwUnexpected(lex());
                }
                param = [ parseObjectPropertyKey() ];
                expect(')');
                property = {
                    type: Syntax.Property,
                    key: key,
                    value: parsePropertyFunction(param),
                    kind: 'set'
                };
            } else {
                expect(':');
                property = {
                    type: Syntax.Property,
                    key: id,
                    value: parseAssignmentExpression(),
                    kind: 'init'
                };
            }
            break;

        case Token.Keyword:
        case Token.BooleanLiteral:
        case Token.NullLiteral:
        case Token.StringLiteral:
        case Token.NumericLiteral:
            key = parseObjectPropertyKey();
            expect(':');
            property = {
                type: Syntax.Property,
                key: key,
                value: parseAssignmentExpression(),
                kind: 'init'
            };
            break;

        default:
            throwUnexpected(token);
        }

        return property;
    }

    function parseObjectInitialiser() {
        var token, properties = [], property, name, kind, map = {}, toString = String;

        expect('{');

        while (index < length) {

            token = lookahead();
            if (token.type === Token.Punctuator && token.value === '}') {
                lex();
                break;
            }

            property = parseObjectProperty();
            if (strict) {
                if (property.key.type === Syntax.Identifier) {
                    name = property.key.name;
                } else {
                    name = toString(property.key.value);
                }
                kind = (property.kind === 'init') ? PropertyKind.Data : (property.kind === 'get') ? PropertyKind.Get : PropertyKind.Set;
                if (map.hasOwnProperty(name)) {
                    if (map[name] === PropertyKind.Data) {
                        if (kind === PropertyKind.Data) {
                            throwError({}, Messages.StrictDuplicateProperty);
                        } else {
                            throwError({}, Messages.StrictAccessorDataProperty);
                        }
                    } else {
                        if (kind === PropertyKind.Data) {
                            throwError({}, Messages.StrictAccessorDataProperty);
                        } else if (map[name] & kind) {
                            throwError({}, Messages.StrictAccessorGetSet);
                        }
                    }
                    map[name] |= kind;
                } else {
                    map[name] = kind;
                }
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

    function parsePrimaryExpression() {
        var expr,
            token = lookahead(),
            type = token.type;

        if (type === Token.Identifier) {
            return {
                type: Syntax.Identifier,
                name: lex().value
            };
        }

        if (type === Token.StringLiteral || type === Token.NumericLiteral) {
            return createLiteral(lex());
        }

        if (type === Token.Keyword) {
            if (matchKeyword('this')) {
                lex();
                return {
                    type: Syntax.ThisExpression
                };
            }

            if (matchKeyword('function')) {
                return parseFunctionExpression();
            }
        }

        if (type === Token.BooleanLiteral) {
            lex();
            token.value = (token.value === 'true');
            return createLiteral(token);
        }

        if (type === Token.NullLiteral) {
            return createLiteral(lex());
        }

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
            return expr;
        }

        if (match('/') || match('/=')) {
            return createLiteral(scanRegExp());
        }

        return throwUnexpected(lex());
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

    function parseNonComputedProperty() {
        var token = lex();

        if (!isIdentifierName(token)) {
            throwUnexpected(token);
        }

        return {
            type: Syntax.Identifier,
            name: token.value
        };
    }

    function parseNonComputedMember(object) {
        return {
            type: Syntax.MemberExpression,
            computed: false,
            object: object,
            property: parseNonComputedProperty()
        };
    }

    function parseComputedMember(object) {
        var property, expr;

        expect('[');
        property = parseExpression();
        expr = {
            type: Syntax.MemberExpression,
            computed: true,
            object: object,
            property: property
        };
        expect(']');
        return expr;
    }

    function parseCallMember(object) {
        return {
            type: Syntax.CallExpression,
            callee: object,
            'arguments': parseArguments()
        };
    }

    function parseNewExpression() {
        var expr;

        expectKeyword('new');

        expr = {
            type: Syntax.NewExpression,
            callee: parseLeftHandSideExpression(),
            'arguments': []
        };

        if (match('(')) {
            expr['arguments'] = parseArguments();
        }

        return expr;
    }

    function parseLeftHandSideExpressionAllowCall() {
        var useNew, expr;

        useNew = matchKeyword('new');
        expr = useNew ? parseNewExpression() : parsePrimaryExpression();

        while (index < length) {
            if (match('.')) {
                lex();
                expr = parseNonComputedMember(expr);
            } else if (match('[')) {
                expr = parseComputedMember(expr);
            } else if (match('(')) {
                expr = parseCallMember(expr);
            } else {
                break;
            }
        }

        return expr;
    }

    function parseLeftHandSideExpression() {
        var useNew, expr;

        useNew = matchKeyword('new');
        expr = useNew ? parseNewExpression() : parsePrimaryExpression();

        while (index < length) {
            if (match('.')) {
                lex();
                expr = parseNonComputedMember(expr);
            } else if (match('[')) {
                expr = parseComputedMember(expr);
            } else {
                break;
            }
        }

        return expr;
    }

    // 11.3 Postfix Expressions

    function parsePostfixExpression() {
        var expr = parseLeftHandSideExpressionAllowCall();

        if ((match('++') || match('--')) && !peekLineTerminator()) {
            if (!isLeftHandSide(expr)) {
                throwError(lookahead(), Messages.InvalidLHSInPostfixOp);
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
        var token, expr;

        if (match('++') || match('--')) {
            token = lex();
            expr = parseUnaryExpression();
            if (!isLeftHandSide(expr)) {
                throwError(token.value, Messages.InvalidLHSInPrefixOp);
            }
            expr = {
                type: Syntax.UpdateExpression,
                operator: token.value,
                argument: expr,
                prefix: true
            };
            return expr;
        }

        if (match('+') || match('-') || match('~') || match('!')) {
            expr = {
                type: Syntax.UnaryExpression,
                operator: lex().value,
                argument: parseUnaryExpression()
            };
            return expr;
        }

        if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
            expr = {
                type: Syntax.UnaryExpression,
                operator: lex().value,
                argument: parseUnaryExpression()
            };
            if (strict && expr.operator === 'delete' && expr.argument.type === 'Identifier') {
                throwError({}, Messages.StrictDelete);
            }
            return expr;
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
            expr = {
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
        var expr, previousAllowIn;

        previousAllowIn = allowIn;
        allowIn = true;
        expr = parseShiftExpression();
        allowIn = previousAllowIn;

        if (match('<') || match('>') || match('<=') || match('>=')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseRelationalExpression()
            };
        } else if (allowIn && matchKeyword('in')) {
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
        var expr, previousAllowIn, consequent;

        expr = parseLogicalORExpression();

        if (match('?')) {
            lex();
            previousAllowIn = allowIn;
            allowIn = true;
            consequent = parseAssignmentExpression();
            allowIn = previousAllowIn;
            expect(':');

            expr = {
                type: Syntax.ConditionalExpression,
                test: expr,
                consequent: consequent,
                alternate: parseAssignmentExpression()
            };
        }

        return expr;
    }

    // 11.13 Assignment Operators

    function parseAssignmentExpression() {
        var expr;

        expr = parseConditionalExpression();

        if (matchAssign()) {
            if (!isLeftHandSide(expr)) {
                throwError({}, Messages.InvalidLHSInAssignment);
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
        return expr;
    }

    // 12.1 Block

    function parseStatementList() {
        var list = [],
            statement;

        while (index < length) {
            if (match('}')) {
                break;
            }
            statement = parseSourceElement();
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

    function parseVariableIdentifier() {
        var token = lex();

        if (token.type !== Token.Identifier) {
            throwUnexpected(token);
        }

        return {
            type: Syntax.Identifier,
            name: token.value
        };
    }

    function parseVariableDeclaration(kind) {
        var id = parseVariableIdentifier(),
            init = null;

        if (kind === 'const') {
            expect('=');
            init = parseAssignmentExpression();
        } else if (match('=')) {
            lex();
            init = parseAssignmentExpression();
        }

        return {
            type: Syntax.VariableDeclarator,
            id: id,
            init: init
        };
    }

    function parseVariableDeclarationList(kind) {
        var list = [];

        while (index < length) {
            list.push(parseVariableDeclaration(kind));
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

    // kind may be `const` or `let`
    // Both are experimental and not in the specification yet.
    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
    // and http://wiki.ecmascript.org/doku.php?id=harmony:let
    function parseConstLetDeclaration(kind) {
        var declarations;

        expectKeyword(kind);

        declarations = parseVariableDeclarationList(kind);

        consumeSemicolon();

        return {
            type: Syntax.VariableDeclaration,
            declarations: declarations,
            kind: kind
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

        return {
            type: Syntax.ExpressionStatement,
            expression: expr
        };
    }

    // 12.5 If statement

    function parseIfStatement() {
        var test, consequent, alternate;

        expectKeyword('if');

        expect('(');

        test = parseExpression();

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

        test = parseExpression();

        expect(')');

        if (match(';')) {
            lex();
        }

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

        test = parseExpression();

        expect(')');

        body = parseStatement();

        return {
            type: Syntax.WhileStatement,
            test: test,
            body: body
        };
    }

    function parseForVariableDeclaration() {
        var token = lex();

        return {
            type: Syntax.VariableDeclaration,
            declarations: parseVariableDeclarationList(),
            kind: token.value
        };
    }

    function parseForStatement() {
        var init, test, update, left, right, body;

        init = test = update = null;

        expectKeyword('for');

        expect('(');

        if (match(';')) {
            lex();
        } else {
            if (matchKeyword('var') || matchKeyword('let')) {
                allowIn = false;
                init = parseForVariableDeclaration();
                allowIn = true;

                if (init.declarations.length === 1 && matchKeyword('in')) {
                    lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                }
            } else {
                allowIn = false;
                init = parseExpression();
                allowIn = true;

                if (matchKeyword('in')) {
                    lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                    if (!isLeftHandSide(left)) {
                        throwError({}, Messages.InvalidLHSInForIn);
                    }
                }
            }

            if (typeof left === 'undefined') {
                expect(';');
            }
        }

        if (typeof left === 'undefined') {

            if (!match(';')) {
                test = parseExpression();
            }
            expect(';');

            if (!match(')')) {
                update = parseExpression();
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
            label = parseVariableIdentifier();
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
            label = parseVariableIdentifier();
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
                argument = parseExpression();
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
                argument = parseExpression();
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

        object = parseExpression();

        expect(')');

        body = parseStatement();

        return {
            type: Syntax.WithStatement,
            object: object,
            body: body
        };
    }

    // 12.10 The swith statement

    function parseSwitchCase(test) {
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

        return {
            type: Syntax.SwitchCase,
            test: test,
            consequent: consequent
        };
    }

    function parseSwitchStatement() {
        var discriminant, cases, test, consequent, statement;

        expectKeyword('switch');

        expect('(');

        discriminant = parseExpression();

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
                test = parseExpression();
            }
            expect(':');

            cases.push(parseSwitchCase(test));
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
            throwError({}, Messages.NewlineAfterThrow);
        }

        argument = parseExpression();

        consumeSemicolon();

        return {
            type: Syntax.ThrowStatement,
            argument: argument
        };
    }

    // 12.14 The try statement

    function parseCatchClause() {
        var param;

        expectKeyword('catch');

        expect('(');
        if (!match(')')) {
            param = parseExpression();
        }
        expect(')');

        return {
            type: Syntax.CatchClause,
            param: param,
            guard: null,
            body: parseBlock()
        };
    }

    function parseTryStatement() {
        var block, handlers = [], param, finalizer = null;

        expectKeyword('try');

        block = parseBlock();

        if (matchKeyword('catch')) {
            handlers.push(parseCatchClause());
        }

        if (matchKeyword('finally')) {
            lex();
            finalizer = parseBlock();
        }

        if (handlers.length === 0 && !finalizer) {
            throwError({}, Messages.NoCatchOrFinally);
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
            expr;

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
            case 'function':
                return parseFunctionDeclaration();
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

        expr = parseExpression();

        // 12.12 Labelled Statements
        if ((expr.type === Syntax.Identifier) && match(':')) {
            lex();
            return {
                type: Syntax.LabeledStatement,
                label: expr,
                body: parseStatement()
            };
        }

        consumeSemicolon();

        return {
            type: Syntax.ExpressionStatement,
            expression: expr
        };
    }

    // 13 Function Definition

    function parseFunctionSourceElements() {
        var sourceElement, sourceElements = [], token, directive;

        expect('{');

        while (index < length) {
            token = lookahead();
            if (token.type !== Token.StringLiteral) {
                break;
            }

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = sliceSource(token.range[0] + 1, token.range[1] - 1);
            if (directive === 'use strict') {
                strict = true;
            }
        }

        while (index < length) {
            if (match('}')) {
                break;
            }
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }

        expect('}');

        return {
            type: Syntax.BlockStatement,
            body: sourceElements
        };
    }

    function parseFunctionDeclaration() {
        var id, params = [], body, previousStrict;

        expectKeyword('function');
        id = parseVariableIdentifier();

        expect('(');

        if (!match(')')) {
            while (index < length) {
                params.push(parseVariableIdentifier());
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        previousStrict = strict;
        strict = false;
        body = parseFunctionSourceElements();
        strict = previousStrict;

        return {
            type: Syntax.FunctionDeclaration,
            id: id,
            params: params,
            body: body
        };
    }

    function parseFunctionExpression() {
        var token, id = null, params = [], body, previousStrict;

        expectKeyword('function');

        if (!match('(')) {
            id = parseVariableIdentifier();
        }

        expect('(');

        if (!match(')')) {
            while (index < length) {
                params.push(parseVariableIdentifier());
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        previousStrict = strict;
        strict = false;
        body = parseFunctionSourceElements();
        strict = previousStrict;

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

        if (token.type === Token.Keyword) {
            switch (token.value) {
            case 'const':
            case 'let':
                return parseConstLetDeclaration(token.value);
            case 'function':
                return parseFunctionDeclaration();
            default:
                break;
            }
        }

        return parseStatement();
    }

    function parseSourceElements() {
        var sourceElement, sourceElements = [], token, directive;

        while (index < length) {
            token = lookahead();
            if (token.type !== Token.StringLiteral) {
                break;
            }

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = sliceSource(token.range[0] + 1, token.range[1] - 1);
            if (directive === 'use strict') {
                strict = true;
            }
        }

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
        var program, previousStrict;
        previousStrict = strict;
        strict = false;
        program = {
            type: Syntax.Program,
            body: parseSourceElements()
        };
        strict = previousStrict;
        return program;
    }

    // The following functions are needed only when the option to preserve
    // the comments is active.

    function addComment(start, end, type, value) {
        if (typeof start !== 'number') {
            return;
        }

        // Because the way the actual token is scanned, often the comments
        // (if any) are skipped twice during the lexical analysis.
        // Thus, we need to skip adding a comment if the comment array already
        // handled it.
        if (extra.comments.length > 0) {
            if (extra.comments[extra.comments.length - 1].range[1] > start) {
                return;
            }
        }

        extra.comments.push({
            range: [start, end],
            type: type,
            value: value
        });
    }

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
                    addComment(start, index - 1, 'Line', comment);
                    if (ch ===  '\r' && source[index] === '\n') {
                        nextChar();
                    }
                    lineNumber += 1;
                    lineStart = index + 1;
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
                        addComment(start, index - 1, 'Block', comment);
                        comment = '';
                    }
                } else if (isLineTerminator(ch)) {
                    if (ch ===  '\r' && source[index] === '\n') {
                        nextChar();
                    }
                    lineNumber += 1;
                    lineStart = index + 1;
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
                if (ch ===  '\r' && source[index] === '\n') {
                    nextChar();
                }
                lineNumber += 1;
                lineStart = index + 1;
            } else {
                break;
            }
        }

        addComment(start, index, (blockComment) ? 'Block' : 'Line', comment);
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

    function collectToken() {
        var token = extra.advance(),
            range,
            value;

        if (token.type !== Token.EOF) {
            range = [token.range[0], token.range[1] - 1];
            value = sliceSource(token.range[0], token.range[1]);
            extra.tokens.push({
                type: tokenTypeAsString(token.type),
                value: value,
                range: range
            });
        }

        return token;
    }

    function collectRegex() {
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

    function createLiteral(token) {
        return {
            type: Syntax.Literal,
            value: token.value
        };
    }

    function createRawLiteral(token) {
        return {
            type: Syntax.Literal,
            value: token.value,
            raw: sliceSource(token.range[0], token.range[1])
        };
    }

    function wrapTrackingFunction(range, loc) {

        return function (parseFunction) {

            function isBinary(node) {
                return node.type === Syntax.LogicalExpression ||
                    node.type === Syntax.BinaryExpression;
            }

            function visit(node) {
                if (range) {
                    if (isBinary(node.left) && (typeof node.left.range === 'undefined')) {
                        visit(node.left);
                    }
                    if (isBinary(node.right) && (typeof node.right.range === 'undefined')) {
                        visit(node.right);
                    }

                    // Expression enclosed in brackets () already has the correct range.
                    if (typeof node.range === 'undefined') {
                        node.range = [node.left.range[0], node.right.range[1]];
                    }
                }

                if (loc) {
                    if (isBinary(node.left) && (typeof node.left.loc === 'undefined')) {
                        visit(node.left);
                    }
                    if (isBinary(node.right) && (typeof node.right.loc === 'undefined')) {
                        visit(node.right);
                    }

                    if (typeof node.loc === 'undefined') {
                        node.loc = {
                            start: node.left.loc.start,
                            end: node.right.loc.end
                        };
                    }
                }
            }

            return function () {
                var node, rangeInfo, locInfo;

                skipComment();
                rangeInfo = [index, 0];
                locInfo = {
                    start: {
                        line: lineNumber,
                        column: index - lineStart
                    }
                };

                node = parseFunction.apply(null, arguments);
                if (typeof node === 'undefined') {
                    return;
                }

                if (range) {
                    rangeInfo[1] = index - 1;
                    node.range = rangeInfo;
                }

                if (loc) {
                    locInfo.end = {
                        line: lineNumber,
                        column: index - lineStart
                    };
                    node.loc = locInfo;
                }

                if (isBinary(node)) {
                    visit(node);
                }

                if (node.type === Syntax.MemberExpression) {
                    if (typeof node.object.range !== 'undefined') {
                        node.range[0] = node.object.range[0];
                    }
                    if (typeof node.object.loc !== 'undefined') {
                        node.loc.start = node.object.loc.start;
                    }
                }
                return node;
            };

        };
    }

    function patch() {

        var wrapTracking;

        if (extra.comments) {
            extra.skipComment = skipComment;
            skipComment = scanComment;
        }

        if (extra.raw) {
            extra.createLiteral = createLiteral;
            createLiteral = createRawLiteral;
        }

        if (extra.range || extra.loc) {

            wrapTracking = wrapTrackingFunction(extra.range, extra.loc);

            extra.parseAdditiveExpression = parseAdditiveExpression;
            extra.parseAssignmentExpression = parseAssignmentExpression;
            extra.parseBitwiseANDExpression = parseBitwiseANDExpression;
            extra.parseBitwiseORExpression = parseBitwiseORExpression;
            extra.parseBitwiseXORExpression = parseBitwiseXORExpression;
            extra.parseBlock = parseBlock;
            extra.parseFunctionSourceElements = parseFunctionSourceElements;
            extra.parseCallMember = parseCallMember;
            extra.parseCatchClause = parseCatchClause;
            extra.parseComputedMember = parseComputedMember;
            extra.parseConditionalExpression = parseConditionalExpression;
            extra.parseConstLetDeclaration = parseConstLetDeclaration;
            extra.parseEqualityExpression = parseEqualityExpression;
            extra.parseExpression = parseExpression;
            extra.parseForVariableDeclaration = parseForVariableDeclaration;
            extra.parseFunctionDeclaration = parseFunctionDeclaration;
            extra.parseFunctionExpression = parseFunctionExpression;
            extra.parseLogicalANDExpression = parseLogicalANDExpression;
            extra.parseLogicalORExpression = parseLogicalORExpression;
            extra.parseMultiplicativeExpression = parseMultiplicativeExpression;
            extra.parseNewExpression = parseNewExpression;
            extra.parseNonComputedMember = parseNonComputedMember;
            extra.parseNonComputedProperty = parseNonComputedProperty;
            extra.parseObjectProperty = parseObjectProperty;
            extra.parseObjectPropertyKey = parseObjectPropertyKey;
            extra.parsePostfixExpression = parsePostfixExpression;
            extra.parsePrimaryExpression = parsePrimaryExpression;
            extra.parseProgram = parseProgram;
            extra.parsePropertyFunction = parsePropertyFunction;
            extra.parseRelationalExpression = parseRelationalExpression;
            extra.parseStatement = parseStatement;
            extra.parseShiftExpression = parseShiftExpression;
            extra.parseSwitchCase = parseSwitchCase;
            extra.parseUnaryExpression = parseUnaryExpression;
            extra.parseVariableDeclaration = parseVariableDeclaration;
            extra.parseVariableIdentifier = parseVariableIdentifier;

            parseAdditiveExpression = wrapTracking(extra.parseAdditiveExpression);
            parseAssignmentExpression = wrapTracking(extra.parseAssignmentExpression);
            parseBitwiseANDExpression = wrapTracking(extra.parseBitwiseANDExpression);
            parseBitwiseORExpression = wrapTracking(extra.parseBitwiseORExpression);
            parseBitwiseXORExpression = wrapTracking(extra.parseBitwiseXORExpression);
            parseBlock = wrapTracking(extra.parseBlock);
            parseFunctionSourceElements = wrapTracking(extra.parseFunctionSourceElements);
            parseCallMember = wrapTracking(extra.parseCallMember);
            parseCatchClause = wrapTracking(extra.parseCatchClause);
            parseComputedMember = wrapTracking(extra.parseComputedMember);
            parseConditionalExpression = wrapTracking(extra.parseConditionalExpression);
            parseConstLetDeclaration = wrapTracking(extra.parseConstLetDeclaration);
            parseEqualityExpression = wrapTracking(extra.parseEqualityExpression);
            parseExpression = wrapTracking(extra.parseExpression);
            parseForVariableDeclaration = wrapTracking(extra.parseForVariableDeclaration);
            parseFunctionDeclaration = wrapTracking(extra.parseFunctionDeclaration);
            parseFunctionExpression = wrapTracking(extra.parseFunctionExpression);
            parseLogicalANDExpression = wrapTracking(extra.parseLogicalANDExpression);
            parseLogicalORExpression = wrapTracking(extra.parseLogicalORExpression);
            parseMultiplicativeExpression = wrapTracking(extra.parseMultiplicativeExpression);
            parseNewExpression = wrapTracking(extra.parseNewExpression);
            parseNonComputedMember = wrapTracking(extra.parseNonComputedMember);
            parseNonComputedProperty = wrapTracking(extra.parseNonComputedProperty);
            parseObjectProperty = wrapTracking(extra.parseObjectProperty);
            parseObjectPropertyKey = wrapTracking(extra.parseObjectPropertyKey);
            parsePostfixExpression = wrapTracking(extra.parsePostfixExpression);
            parsePrimaryExpression = wrapTracking(extra.parsePrimaryExpression);
            parseProgram = wrapTracking(extra.parseProgram);
            parsePropertyFunction = wrapTracking(extra.parsePropertyFunction);
            parseRelationalExpression = wrapTracking(extra.parseRelationalExpression);
            parseStatement = wrapTracking(extra.parseStatement);
            parseShiftExpression = wrapTracking(extra.parseShiftExpression);
            parseSwitchCase = wrapTracking(extra.parseSwitchCase);
            parseUnaryExpression = wrapTracking(extra.parseUnaryExpression);
            parseVariableDeclaration = wrapTracking(extra.parseVariableDeclaration);
            parseVariableIdentifier = wrapTracking(extra.parseVariableIdentifier);
        }

        if (typeof extra.tokens !== 'undefined') {
            extra.advance = advance;
            extra.scanRegExp = scanRegExp;

            advance = collectToken;
            scanRegExp = collectRegex;
        }
    }

    function unpatch() {
        if (typeof extra.skipComment === 'function') {
            skipComment = extra.skipComment;
        }

        if (extra.raw) {
            createLiteral = extra.createLiteral;
        }

        if (extra.range || extra.loc) {
            parseAdditiveExpression = extra.parseAdditiveExpression;
            parseAssignmentExpression = extra.parseAssignmentExpression;
            parseBitwiseANDExpression = extra.parseBitwiseANDExpression;
            parseBitwiseORExpression = extra.parseBitwiseORExpression;
            parseBitwiseXORExpression = extra.parseBitwiseXORExpression;
            parseBlock = extra.parseBlock;
            parseFunctionSourceElements = extra.parseFunctionSourceElements;
            parseCallMember = extra.parseCallMember;
            parseCatchClause = extra.parseCatchClause;
            parseComputedMember = extra.parseComputedMember;
            parseConditionalExpression = extra.parseConditionalExpression;
            parseConstLetDeclaration = extra.parseConstLetDeclaration;
            parseEqualityExpression = extra.parseEqualityExpression;
            parseExpression = extra.parseExpression;
            parseForVariableDeclaration = extra.parseForVariableDeclaration;
            parseFunctionDeclaration = extra.parseFunctionDeclaration;
            parseFunctionExpression = extra.parseFunctionExpression;
            parseLogicalANDExpression = extra.parseLogicalANDExpression;
            parseLogicalORExpression = extra.parseLogicalORExpression;
            parseMultiplicativeExpression = extra.parseMultiplicativeExpression;
            parseNewExpression = extra.parseNewExpression;
            parseNonComputedMember = extra.parseNonComputedMember;
            parseNonComputedProperty = extra.parseNonComputedProperty;
            parseObjectProperty = extra.parseObjectProperty;
            parseObjectPropertyKey = extra.parseObjectPropertyKey;
            parsePrimaryExpression = extra.parsePrimaryExpression;
            parsePostfixExpression = extra.parsePostfixExpression;
            parseProgram = extra.parseProgram;
            parsePropertyFunction = extra.parsePropertyFunction;
            parseRelationalExpression = extra.parseRelationalExpression;
            parseStatement = extra.parseStatement;
            parseShiftExpression = extra.parseShiftExpression;
            parseSwitchCase = extra.parseSwitchCase;
            parseUnaryExpression = extra.parseUnaryExpression;
            parseVariableDeclaration = extra.parseVariableDeclaration;
            parseVariableIdentifier = extra.parseVariableIdentifier;
        }

        if (typeof extra.lex === 'function') {
            lex = extra.lex;
        }

        if (typeof extra.scanRegExp === 'function') {
            advance = extra.advance;
            scanRegExp = extra.scanRegExp;
        }
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

    function parse(code, options) {
        var program;

        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        lineStart = 0;
        length = source.length;
        buffer = null;
        allowIn = true;

        extra = {};
        if (typeof options !== 'undefined') {
            extra.range = (typeof options.range === 'boolean') && options.range;
            extra.loc = (typeof options.loc === 'boolean') && options.loc;
            extra.raw = (typeof options.raw === 'boolean') && options.raw;
            if (typeof options.tokens === 'boolean' && options.tokens) {
                extra.tokens = [];
            }
            if (typeof options.comment === 'boolean' && options.comment) {
                extra.comments = [];
            }
        }

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

        patch();
        try {
            program = parseProgram();
            if (typeof extra.comments !== 'undefined') {
                program.comments = extra.comments;
            }
            if (typeof extra.tokens !== 'undefined') {
                program.tokens = extra.tokens;
            }
        } catch (e) {
            throw e;
        } finally {
            unpatch();
            extra = {};
        }

        return program;
    }

    // Executes visitor on the object and its children (recursively).

    function traverse(object, visitor, master) {
        var key, child, parent, path;

        parent = (typeof master === 'undefined') ? [] : master;

        if (visitor.call(null, object, parent) === false) {
            return;
        }
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                child = object[key];
                path = [ object ];
                path.push(parent);
                if (typeof child === 'object' && child !== null) {
                    traverse(child, visitor, path);
                }
            }
        }
    }

    // Insert a prolog in the body of every function.
    // It will be in the form of a function call:
    //
    //     traceName(object);
    //
    // where the object contains the following properties:
    //
    //    'name' holds the name of the function
    //    'lineNumber' holds the starting line number of the function block
    //    'range' contains the index-based range of the function
    //
    // The name of the function represents the associated reference for
    // the function (deduced on a best-effort basis if it is not
    // a function declaration).
    //
    // If traceName is a function instead of a string, it will be invoked and
    // the result will be used as the entire prolog. The arguments for the
    // invocation are the function name, range, and location info.

    function traceFunctionEntrance(traceName) {

        return function (code) {
            var tree,
                functionList,
                param,
                signature,
                pos,
                i;


            tree = parse(code, { range: true, loc: true });

            functionList = [];
            traverse(tree, function (node, path) {
                var parent, name;
                if (node.type === Syntax.FunctionDeclaration) {
                    functionList.push({
                        name: node.id.name,
                        range: node.range,
                        loc: node.loc,
                        blockStart: node.body.range[0]
                    });
                } else if (node.type === Syntax.FunctionExpression) {
                    parent = path[0];
                    if (parent.type === Syntax.AssignmentExpression) {
                        if (typeof parent.left.range !== 'undefined') {
                            functionList.push({
                                name: code.slice(parent.left.range[0],
                                          parent.left.range[1] + 1),
                                range: node.range,
                                loc: node.loc,
                                blockStart: node.body.range[0]
                            });
                        }
                    } else if (parent.type === Syntax.VariableDeclarator) {
                        functionList.push({
                            name: parent.id.name,
                            range: node.range,
                            loc: node.loc,
                            blockStart: node.body.range[0]
                        });
                    } else if (parent.type === Syntax.CallExpression) {
                        functionList.push({
                            name: parent.id ? parent.id.name : '[Anonymous]',
                            range: node.range,
                            loc: node.loc,
                            blockStart: node.body.range[0]
                        });
                    } else if (typeof parent.length === 'number') {
                        functionList.push({
                            name: parent.id ? parent.id.name : '[Anonymous]',
                            range: node.range,
                            loc: node.loc,
                            blockStart: node.body.range[0]
                        });
                    } else if (typeof parent.key !== 'undefined') {
                        if (parent.key.type === 'Identifier') {
                            if (parent.value === node && parent.key.name) {
                                functionList.push({
                                    name: parent.key.name,
                                    range: node.range,
                                    loc: node.loc,
                                    blockStart: node.body.range[0]
                                });
                            }
                        }
                    }
                }
            });

            // Insert the instrumentation code from the last entry.
            // This is to ensure that the range for each entry remains valid)
            // (it won't shift due to some new inserting string before the range).
            for (i = functionList.length - 1; i >= 0; i -= 1) {
                param = {
                    name: functionList[i].name,
                    range: functionList[i].range,
                    loc: functionList[i].loc
                };
                if (typeof traceName === 'function') {
                    signature = traceName.call(null, param);
                } else {
                    signature = traceName + '({ ';
                    signature += 'name: \'' + functionList[i].name + '\', ';
                    if (typeof functionList[i].loc !== 'undefined') {
                        signature += 'lineNumber: ' + functionList[i].loc.start.line + ', ';
                    }
                    signature += 'range: [' + functionList[i].range[0] + ', ' +
                        functionList[i].range[1] + '] ';
                    signature += '});';
                }
                pos = functionList[i].blockStart + 1;
                code = code.slice(0, pos) + '\n' + signature + code.slice(pos, code.length);
            }

            return code;
        };
    }

    function modify(code, modifiers) {
        var i;

        if (Object.prototype.toString.call(modifiers) === '[object Array]') {
            for (i = 0; i < modifiers.length; i += 1) {
                code = modifiers[i].call(null, code);
            }
        } else if (typeof modifiers === 'function') {
            code = modifiers.call(null, code);
        } else {
            throw new Error('Wrong use of esprima.modify() function');
        }

        return code;
    }

    function unicodeEscape(ch) {
        var result, i;
        result = ch.charCodeAt(0).toString(16);
        for (i = result.length; i < 4; i += 1) {
            result = '0' + result;
        }
        return '\\u' + result;
    }

    function escapeString(str) {
        var result = '', i, len, ch;

        if (typeof str[0] === 'undefined') {
            str = stringToArray(str);
        }

        for (i = 0, len = str.length; i < len; i += 1) {
            ch = str[i];
            if ('\'\\\b\f\n\r\t'.indexOf(ch) >= 0) {
                result += '\\';
                switch (ch) {
                case '\'':
                    result += '\'';
                    break;
                case '\\':
                    result += '\\';
                    break;
                case '\b':
                    result += 'b';
                    break;
                case '\f':
                    result += 'f';
                    break;
                case '\n':
                    result += 'n';
                    break;
                case '\r':
                    result += 'r';
                    break;
                case '\t':
                    result += 't';
                    break;
                }
            } else if (ch < ' ' || ch.charCodeAt(0) >= 0x80) {
                result += unicodeEscape(ch);
            } else {
                result += ch;
            }
        }

        return '\'' + result + '\'';
    }

    BinaryPrecedence = {
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '^': Precedence.LogicalXOR,
        '|': Precedence.BitwiseOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        'in': Precedence.Relational,
        'instanceof': Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative
    };

    function addIndent(stmt) {
        return base + stmt;
    }

    function parenthesize(text, current, should) {
        return (current < should) ?  '(' + text + ')' : text;
    }

    function maybeBlock(stmt, suffix) {
        var previousBase, result;

        if (stmt.type === Syntax.BlockStatement) {
            result = ' ' + generateStatement(stmt);
            if (suffix) {
                return result + ' ';
            }
            return result;
        }

        if (stmt.type === Syntax.EmptyStatement) {
            result = ';';
        } else {
            previousBase = base;
            base += indent;
            result = '\n' + addIndent(generateStatement(stmt));
            base = previousBase;
        }

        if (suffix) {
            return result + addIndent('\n');
        }
        return result;
    }

    function generateFunctionBody(node) {
        var result, i, len;
        result = '(';
        for (i = 0, len = node.params.length; i < len; i += 1) {
            result += node.params[i].name;
            if ((i + 1) < len) {
                result += ', ';
            }
        }
        return result + ')' + maybeBlock(node.body);
    }

    function generateExpression(expr, precedence) {
        var result, currentPrecedence, previousBase, i, len, raw;

        if (!precedence) {
            precedence = Precedence.SequenceExpression;
        }

        switch (expr.type) {
        case Syntax.SequenceExpression:
            result = '';
            for (i = 0, len = expr.expressions.length; i < len; i += 1) {
                result += generateExpression(expr.expressions[i], Precedence.Assignment);
                if ((i + 1) < len) {
                    result += ', ';
                }
            }
            result = parenthesize(result, Precedence.Sequence, precedence);
            break;

        case Syntax.AssignmentExpression:
            result = parenthesize(
                generateExpression(expr.left) + ' ' + expr.operator + ' ' +
                    generateExpression(expr.right, Precedence.Assignment),
                Precedence.Assignment,
                precedence
            );
            break;

        case Syntax.ConditionalExpression:
            result = parenthesize(
                generateExpression(expr.test, Precedence.LogicalOR) + ' ? ' +
                    generateExpression(expr.consequent, Precedence.Assignment) + ' : ' +
                    generateExpression(expr.alternate, Precedence.Assignment),
                Precedence.Conditional,
                precedence
            );
            break;

        case Syntax.LogicalExpression:
        case Syntax.BinaryExpression:
            currentPrecedence = BinaryPrecedence[expr.operator];

            result = generateExpression(expr.left, currentPrecedence) +
                ' ' + expr.operator + ' ' +
                generateExpression(expr.right, currentPrecedence + 1);
            if (expr.operator === 'in') {
                // TODO parenthesize only in allowIn = false case
                result = '(' + result + ')';
            } else {
                result = parenthesize(result, currentPrecedence, precedence);
            }
            break;

        case Syntax.CallExpression:
            result = '';
            for (i = 0, len = expr['arguments'].length; i < len; i += 1) {
                result += generateExpression(expr['arguments'][i], Precedence.Assignment);
                if ((i + 1) < len) {
                    result += ', ';
                }
            }
            result = parenthesize(
                generateExpression(expr.callee, Precedence.Call) + '(' + result + ')',
                Precedence.Call,
                precedence
            );
            break;

        case Syntax.NewExpression:
            result = '';
            for (i = 0, len = expr['arguments'].length; i < len; i += 1) {
                result += generateExpression(expr['arguments'][i], Precedence.Assignment);
                if ((i + 1) < len) {
                    result += ', ';
                }
            }
            result = parenthesize(
                'new ' + generateExpression(expr.callee, Precedence.New) + '(' + result + ')',
                Precedence.New,
                precedence
            );
            break;

        case Syntax.MemberExpression:
            result = generateExpression(expr.object, Precedence.Call);
            if (expr.computed) {
                result += '[' + generateExpression(expr.property) + ']';
            } else {
                if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
                    if (result.indexOf('.') < 0) {
                        if (!/[eExX]/.test(result) && !(result.length >= 2 && result[0] === '0')) {
                            result += '.';
                        }
                    }
                }
                result += '.' + expr.property.name;
            }
            result = parenthesize(result, Precedence.Member, precedence);
            break;

        case Syntax.UnaryExpression:
            result = expr.operator;
            if (result.length > 2) {
                result += ' ';
            }
            result = parenthesize(
                result + generateExpression(expr.argument, Precedence.Unary),
                Precedence.Unary,
                precedence
            );
            break;

        case Syntax.UpdateExpression:
            if (expr.prefix) {
                result = parenthesize(
                    expr.operator +
                        generateExpression(expr.argument, Precedence.Unary),
                    Precedence.Unary,
                    precedence
                );
            } else {
                result = parenthesize(
                    generateExpression(expr.argument, Precedence.Postfix) +
                        expr.operator,
                    Precedence.Postfix,
                    precedence
                );
            }
            break;

        case Syntax.FunctionExpression:
            result = 'function ';
            if (expr.id) {
                result += expr.id.name;
            }
            result += generateFunctionBody(expr);
            break;

        case Syntax.ArrayExpression:
            if (!expr.elements.length) {
                result = '[]';
                break;
            }
            result = '[\n';
            previousBase = base;
            base += indent;
            for (i = 0, len = expr.elements.length; i < len; i += 1) {
                if (!expr.elements[i]) {
                    result += addIndent('');
                    if ((i + 1) === len) {
                        result += ',';
                    }
                } else {
                    result += addIndent(generateExpression(expr.elements[i], Precedence.Assignment));
                }
                if ((i + 1) < len) {
                    result += ',\n';
                }
            }
            base = previousBase;
            result += '\n' + addIndent(']');
            break;

        case Syntax.Property:
            if (expr.kind === 'get' || expr.kind === 'set') {
                result = expr.kind + ' ' + generateExpression(expr.key) +
                    generateFunctionBody(expr.value);
            } else {
                result = generateExpression(expr.key) + ': ' +
                    generateExpression(expr.value, Precedence.Assignment);
            }
            break;

        case Syntax.ObjectExpression:
            if (!expr.properties.length) {
                result = '{}';
                break;
            }
            result = '{\n';
            previousBase = base;
            base += indent;
            for (i = 0, len = expr.properties.length; i < len; i += 1) {
                result += addIndent(generateExpression(expr.properties[i]));
                if ((i + 1) < len) {
                    result += ',\n';
                }
            }
            base = previousBase;
            result += '\n' + addIndent('}');
            break;

        case Syntax.ThisExpression:
            result = 'this';
            break;

        case Syntax.Identifier:
            result = expr.name;
            break;

        case Syntax.Literal:
            if (expr.hasOwnProperty('raw')) {
                try {
                    raw = parse(expr.raw).body[0].expression;
                    if (raw.type === Syntax.Literal) {
                        if (raw.value === expr.value) {
                            result = expr.raw;
                            break;
                        }
                    }
                } catch (e) {
                    // not use raw property
                }
            }

            if (expr.value === null) {
                result = 'null';
                break;
            }

            if (typeof expr.value === 'string') {
                result = escapeString(expr.value);
                break;
            }

            if (typeof expr.value === 'number' && expr.value === Infinity) {
                // Infinity is variable
                result = '1e+1000';
                break;
            }

            result = expr.value.toString();
            break;

        default:
            break;
        }

        if (!result) {
            throw new Error('Unknown expression type: ' + expr.type);
        }
        return result;
    }

    function generateStatement(stmt) {
        var i, len, result, previousBase;

        switch (stmt.type) {
        case Syntax.BlockStatement:
            result = '{\n';

            previousBase = base;
            base += indent;
            for (i = 0, len = stmt.body.length; i < len; i += 1) {
                result += addIndent(generateStatement(stmt.body[i])) + '\n';
            }
            base = previousBase;

            result += addIndent('}');
            break;

        case Syntax.BreakStatement:
            if (stmt.label) {
                result = 'break ' + stmt.label.name + ';';
            } else {
                result = 'break;';
            }
            break;

        case Syntax.ContinueStatement:
            if (stmt.label) {
                result = 'continue ' + stmt.label.name + ';';
            } else {
                result = 'continue;';
            }
            break;

        case Syntax.DoWhileStatement:
            result = 'do' + maybeBlock(stmt.body, true) + 'while (' + generateExpression(stmt.test) + ');';
            break;

        case Syntax.CatchClause:
            previousBase = base;
            base += indent;
            result = ' catch (' + generateExpression(stmt.param) + ')';
            base = previousBase;
            result += maybeBlock(stmt.body);
            break;

        case Syntax.DebuggerStatement:
            result = 'debugger;';
            break;

        case Syntax.EmptyStatement:
            result = ';';
            break;

        case Syntax.ExpressionStatement:
            result = generateExpression(stmt.expression);
            // 12.4 '{', 'function' is not allowed in this position.
            // wrap espression with parentheses
            if (result[0] === '{' || result.indexOf('function ') === 0) {
                result = '(' + result + ');';
            } else {
                result += ';';
            }
            break;

        case Syntax.VariableDeclarator:
            if (stmt.init) {
                result = stmt.id.name + ' = ' + generateExpression(stmt.init, Precedence.AssignmentExpression);
            } else {
                result = stmt.id.name;
            }
            break;

        case Syntax.VariableDeclaration:
            result = stmt.kind + ' ';
            // special path for
            // var x = function () {
            // };
            if (stmt.declarations.length === 1 && stmt.declarations[0].init &&
                    stmt.declarations[0].init.type === Syntax.FunctionExpression) {
                result += generateStatement(stmt.declarations[0]);
            } else {
                previousBase = base;
                base += indent;
                for (i = 0, len = stmt.declarations.length; i < len; i += 1) {
                    result += generateStatement(stmt.declarations[i]);
                    if ((i + 1) < len) {
                        result += ', ';
                    }
                }
                base = previousBase;
            }
            result += ';';
            break;

        case Syntax.ThrowStatement:
            result = 'throw ' + generateExpression(stmt.argument) + ';';
            break;

        case Syntax.TryStatement:
            result = 'try' + maybeBlock(stmt.block);
            for (i = 0, len = stmt.handlers.length; i < len; i += 1) {
                result += generateStatement(stmt.handlers[i]);
            }
            if (stmt.finalizer) {
                result += ' finally' + maybeBlock(stmt.finalizer);
            }
            break;

        case Syntax.SwitchStatement:
            previousBase = base;
            base += indent;
            result = 'switch (' + generateExpression(stmt.discriminant) + ') {\n';
            base = previousBase;
            if (stmt.cases) {
                for (i = 0, len = stmt.cases.length; i < len; i += 1) {
                    result += addIndent(generateStatement(stmt.cases[i])) + '\n';
                }
            }
            result += addIndent('}');
            break;

        case Syntax.SwitchCase:
            previousBase = base;
            base += indent;
            if (stmt.test) {
                result = 'case ' + generateExpression(stmt.test) + ':';
            } else {
                result = 'default:';
            }

            i = 0;
            len = stmt.consequent.length;
            if (len && stmt.consequent[0].type === Syntax.BlockStatement) {
                result += maybeBlock(stmt.consequent[0]);
                i = 1;
            }

            for (; i < len; i += 1) {
                result += '\n' + addIndent(generateStatement(stmt.consequent[i]));
            }

            base = previousBase;
            break;

        case Syntax.IfStatement:
            if (stmt.alternate) {
                if (stmt.alternate.type === Syntax.IfStatement) {
                    previousBase = base;
                    base += indent;
                    result = 'if (' +  generateExpression(stmt.test) + ')';
                    base = previousBase;
                    result += maybeBlock(stmt.consequent, true) + 'else ' + generateStatement(stmt.alternate);
                } else {
                    previousBase = base;
                    base += indent;
                    result = 'if (' + generateExpression(stmt.test) + ')';
                    base = previousBase;
                    result += maybeBlock(stmt.consequent, true) + 'else' + maybeBlock(stmt.alternate);
                }
            } else {
                previousBase = base;
                base += indent;
                result = 'if (' + generateExpression(stmt.test) + ')';
                base = previousBase;
                result += maybeBlock(stmt.consequent);
            }
            break;

        case Syntax.ForStatement:
            previousBase = base;
            base += indent;
            result = 'for (';
            if (stmt.init) {
                if (stmt.init.type === Syntax.VariableDeclaration) {
                    result += generateStatement(stmt.init);
                } else {
                    result += generateExpression(stmt.init) + ';';
                }
            } else {
                result += ';';
            }

            if (stmt.test) {
                result += ' ' + generateExpression(stmt.test) + ';';
            } else {
                result += ';';
            }

            if (stmt.update) {
                result += ' ' + generateExpression(stmt.update) + ')';
            } else {
                result += ')';
            }
            base = previousBase;

            result += maybeBlock(stmt.body);
            break;

        case Syntax.ForInStatement:
            result = 'for (';
            if (stmt.left.type === Syntax.VariableDeclaration) {
                previousBase = base;
                base += indent + indent;
                result += stmt.left.kind + ' ' + generateStatement(stmt.left.declarations[0]);
                base = previousBase;
            } else {
                previousBase = base;
                base += indent;
                result += generateExpression(stmt.left);
                base = previousBase;
            }

            previousBase = base;
            base += indent;
            result += ' in ' + generateExpression(stmt.right) + ')';
            base = previousBase;
            result += maybeBlock(stmt.body);
            break;

        case Syntax.LabeledStatement:
            result = stmt.label.name + ':' + maybeBlock(stmt.body);
            break;

        case Syntax.Program:
            result = '';
            for (i = 0, len = stmt.body.length; i < len; i += 1) {
                result += generateStatement(stmt.body[i]);
                if ((i + 1) < len) {
                    result += '\n';
                }
            }
            break;

        case Syntax.FunctionDeclaration:
            result = 'function ';
            if (stmt.id) {
                result += stmt.id.name;
            }
            result += generateFunctionBody(stmt);
            break;

        case Syntax.ReturnStatement:
            if (stmt.argument) {
                result = 'return ' + generateExpression(stmt.argument) + ';';
            } else {
                result = 'return;';
            }
            break;

        case Syntax.WhileStatement:
            previousBase = base;
            base += indent;
            result = 'while (' + generateExpression(stmt.test) + ')';
            base = previousBase;
            result += maybeBlock(stmt.body);
            break;

        case Syntax.WithStatement:
            previousBase = base;
            base += indent;
            result = 'with (' + generateExpression(stmt.object) + ')';
            base = previousBase;
            result += maybeBlock(stmt.body);
            break;

        default:
            break;
        }

        if (!result) {
            throw new Error('Unknown statement type: ' + stmt.type);
        }
        return result;
    }

    function generate(node, options) {
        if (typeof options !== 'undefined') {
            base = options.base || '';
            indent = options.indent || '    ';
        } else {
            base = '';
            indent = '    ';
        }

        switch (node.type) {
        case Syntax.BlockStatement: 
        case Syntax.BreakStatement: 
        case Syntax.CatchClause: 
        case Syntax.ContinueStatement: 
        case Syntax.DoWhileStatement: 
        case Syntax.DebuggerStatement: 
        case Syntax.EmptyStatement: 
        case Syntax.ExpressionStatement: 
        case Syntax.ForStatement: 
        case Syntax.ForInStatement: 
        case Syntax.FunctionDeclaration: 
        case Syntax.IfStatement: 
        case Syntax.LabeledStatement: 
        case Syntax.Program: 
        case Syntax.ReturnStatement: 
        case Syntax.SwitchStatement: 
        case Syntax.SwitchCase: 
        case Syntax.ThrowStatement: 
        case Syntax.TryStatement: 
        case Syntax.VariableDeclaration: 
        case Syntax.VariableDeclarator: 
        case Syntax.WhileStatement: 
        case Syntax.WithStatement:
            return generateStatement(node);

        case Syntax.AssignmentExpression: 
        case Syntax.ArrayExpression: 
        case Syntax.BinaryExpression: 
        case Syntax.CallExpression: 
        case Syntax.ConditionalExpression: 
        case Syntax.FunctionExpression: 
        case Syntax.Identifier: 
        case Syntax.Literal: 
        case Syntax.LogicalExpression: 
        case Syntax.MemberExpression: 
        case Syntax.NewExpression: 
        case Syntax.ObjectExpression: 
        case Syntax.Property: 
        case Syntax.SequenceExpression: 
        case Syntax.ThisExpression: 
        case Syntax.UnaryExpression: 
        case Syntax.UpdateExpression: 
            return generateExpression(node);

        default:
            break;
        }
        throw new Error('Unknown node type: ' + node.type);
    }

    // Sync with package.json.
    exports.version = '0.9.8';

    exports.parse = parse;

    exports.modify = modify;

    exports.generate = generate;

    exports.Tracer = {
        FunctionEntrance: traceFunctionEntrance
    };

}(typeof exports === 'undefined' ? (esprima = {}) : exports));
/* vim: set sw=4 ts=4 et tw=80 : */
