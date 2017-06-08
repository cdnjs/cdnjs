'use strict';


var Lexer = require('./lexer'),
    Expression = require('./expressions').Expression,
    Fraction = require('./fractions'),
    Equation = require('./equations');

var Parser = function() {
    this.lexer = new Lexer();
    this.current_token = null;

    /**
     * Base-grammar:
     *
     * expr   -> expr + term
     *        | expr - term
     *        | - term
     *        | term
     *
     * term   -> term * factor
     *        | term factor
     *        | term / factor
     *        | term ^ factor
     *        | factor
     *
     * factor -> (expr)
     *        | num
     *        | id
     *
     * ===============================
     *
     * Grammar without left recursion -> the grammar actually used
     *
     * eqn         -> expr = expr
     * expr        -> term expr_rest
     * expr_rest   -> + term expr_rest
     *             | - term expr_rest
     *             | ε
     *
     * term        -> factor term_rest
     * term_rest   -> * term term_rest
     *             |   term term_rest
     *             | ^ term term_rest
     *             | / term term_rest
     *             | ε
     *
     * factor      -> (expr)
     *             | num
     *             | id
     *
     **/
};

// Updates the current token to the next input token 
Parser.prototype.update = function() {
    this.current_token = this.lexer.token();
};

// Returns true if the current token matches the keyword
Parser.prototype.match = function(keyword) {
    if (this.current_token === null) return keyword === 'epsilon';

    switch (keyword) {
        case 'plus':
            return ((this.current_token.type === 'OPERATOR') && (this.current_token.value === 'PLUS'));
        case 'minus':
            return ((this.current_token.type === 'OPERATOR') && (this.current_token.value === 'MINUS'));
        case 'multiply':
            return ((this.current_token.type === 'OPERATOR') && (this.current_token.value === 'MULTIPLY'));
        case 'power':
            return ((this.current_token.type === 'OPERATOR') && (this.current_token.value === 'POWER'));
        case 'divide':
            return ((this.current_token.type === 'OPERATOR') && (this.current_token.value === 'DIVIDE'));
        case 'equal':
            return ((this.current_token.type === 'OPERATOR') && (this.current_token.value === 'EQUALS'));
        case 'lparen':
            return ((this.current_token.type === 'PAREN') && (this.current_token.value === 'L_PAREN'));
        case 'rparen':
            return ((this.current_token.type === 'PAREN') && (this.current_token.value === 'R_PAREN'));
        case 'num':
            return (this.current_token.type === 'NUMBER');
        case 'id':
            return (this.current_token.type === 'IDENTIFIER');
        default:
            return false;
    }
};

/*
    Initializes the parser internals and the lexer.
    The input is then parsed according to the grammar described in the
    header comment. The parsing process constructs a abstract syntax tree
    using the classes the algebra.js library provides
*/
Parser.prototype.parse = function(input) {
    //pass the input to the lexer
    this.lexer.input(input);
    this.update();
    return this.parseEqn();
};

Parser.prototype.parseEqn = function() {
    var ex1 = this.parseExpr();
    if (this.match('equal')) {
        this.update();
        var ex2 = this.parseExpr();
        return new Equation(ex1,ex2);
    }else if(this.match('epsilon')){
        return ex1;
    }else{
        throw new SyntaxError('Unbalanced Parenthesis');
    }
};

Parser.prototype.parseExpr = function() {
    var term = this.parseTerm();
    return this.parseExprRest(term);
};

Parser.prototype.parseExprRest = function(term) {
    if (this.match('plus')) {
        this.update();
        var plusterm = this.parseTerm();
        if(term === undefined || plusterm === undefined) throw new SyntaxError('Missing operand');
        return this.parseExprRest(term.add(plusterm));
    } else if (this.match('minus')) {
        this.update();
        var minusterm = this.parseTerm();
        //This case is entered when a negative number is parsed e.g. x = -4
        if (term === undefined) {
            return this.parseExprRest(minusterm.multiply(-1));
        } else {
            return this.parseExprRest(term.subtract(minusterm));
        }
    } else {
        return term;
    }
};


Parser.prototype.parseTerm = function() {
    var factor = this.parseFactor();
    return this.parseTermRest(factor);
};

Parser.prototype.parseTermRest = function(factor) {
    if (this.match('multiply')) {
        this.update();
        var mulfactor = this.parseFactor();
        return factor.multiply(this.parseTermRest(mulfactor));
    } else if (this.match('power')) {
        this.update();
        var powfactor = this.parseFactor();
        //WORKAROUND: algebra.js only allows integers and fractions for raising
        return this.parseTermRest(factor.pow(parseInt(powfactor.toString())));
    } else if (this.match('divide')) {
        this.update();
        var devfactor = this.parseFactor();
        //WORKAROUND: algebra.js only allows integers and fractions for division
        return this.parseTermRest(factor.divide(this.convertToFraction(devfactor)));
    } else if (this.match('epsilon')) {
        return factor;
    } else {
        //a missing operator between terms is treated like a multiplier
        var mulfactor2 = this.parseFactor();
        if (mulfactor2 === undefined) {
            return factor;
        } else {
            return factor.multiply(this.parseTermRest(mulfactor2));
        }
    }
};

/**
 * Is used to convert expressions to fractions, as dividing by expressions is not possible
**/
Parser.prototype.convertToFraction = function(expression) {
    if(expression.terms.length > 0){
        throw new TypeError('Invalid Argument (' + expression.toString() + '): Divisor must be of type Integer or Fraction.');
    }else{
        var c = expression.constants[0];
        return new Fraction(c.numer, c.denom);
    }
};

Parser.prototype.parseFactor = function() {
    if (this.match('num')) {
        var num = this.parseNumber();
        this.update();
        return num;
    } else if (this.match('id')) {
        var id = new Expression(this.current_token.value);
        this.update();
        return id;
    } else if (this.match('lparen')) {
        this.update();
        var expr = this.parseExpr();
        if (this.match('rparen')) {
            this.update();
            return expr;
        } else {
            throw new SyntaxError('Unbalanced Parenthesis');
        }
    } else {
        return undefined;
    }
};

// Converts a number token - integer or decimal - to an expression
Parser.prototype.parseNumber = function() {
     //Integer conversion
    if(parseInt(this.current_token.value) == this.current_token.value){
        return new Expression(parseInt(this.current_token.value));      
    }else{
        //Split the decimal number to integer and decimal parts
        var splits = this.current_token.value.split('.');
        //count the digits of the decimal part
        var decimals = splits[1].length;
        //determine the multiplication factor
        var factor = Math.pow(10,decimals);
        var float_op = parseFloat(this.current_token.value);
        //multiply the float with the factor and divide it again afterwards 
        //to create a valid expression object
        return new Expression(parseInt(float_op * factor)).divide(factor);
    }
};

module.exports = Parser;
