(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.algebra = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Fraction = require('./src/fractions');
var Expression = require('./src/expressions').Expression;
var Equation = require('./src/equations');
var Parser = require('./src/parser');


var parse = function(input){
	var parser = new Parser();
	var result = parser.parse(input);
	return result;
};

module.exports = {
    Fraction: Fraction,
    Expression: Expression,
    Equation: Equation,
    parse: parse
};

},{"./src/equations":2,"./src/expressions":3,"./src/fractions":4,"./src/parser":7}],2:[function(require,module,exports){
var Expression = require('./expressions').Expression;
var Variable = require('./expressions').Variable;
var Term = require('./expressions').Term;
var Fraction = require('./fractions');
var isInt = require('./helper').isInt;

var Equation = function(lhs, rhs) {
    if (lhs instanceof Expression) {
        this.lhs = lhs;

        if (rhs instanceof Expression) {
            this.rhs = rhs;
        } else if (rhs instanceof Fraction || isInt(rhs)) {
            this.rhs = new Expression(rhs);
        } else {
            throw new TypeError("Invalid Argument (" + rhs.toString() + "): Right-hand side must be of type Expression, Fraction or Integer.");
        }
    } else {
        throw new TypeError("Invalid Argument (" + lhs.toString() + "): Left-hand side must be of type Expression.");
    }
};

Equation.prototype.solveFor = function(variable) {
    if (!this.lhs._hasVariable(variable) && !this.rhs._hasVariable(variable)) {
        throw new TypeError("Invalid Argument (" + variable.toString() + "): Variable does not exist in the equation.");
    }

    // If the equation is linear and the variable in question can be isolated through arithmetic, solve.
    if (this._isLinear() || this._variableCanBeIsolated(variable)) {
        var solvingFor = new Term(new Variable(variable));
        var newLhs = new Expression();
        var newRhs = new Expression();

        for (var i = 0; i < this.rhs.terms.length; i++) {
            var term = this.rhs.terms[i];

            if (term.canBeCombinedWith(solvingFor)) {
                newLhs = newLhs.subtract(term);
            } else {
                newRhs = newRhs.add(term);
            }
        }

        for (var i = 0; i < this.lhs.terms.length; i++) {
            var term = this.lhs.terms[i];

            if (term.canBeCombinedWith(solvingFor)) {
                newLhs = newLhs.add(term);
            } else {
                newRhs = newRhs.subtract(term);
            }
        }

        newRhs = newRhs.subtract(this.lhs.constant());
        newRhs = newRhs.add(this.rhs.constant());

        if (newLhs.terms.length === 0) {
            if (newLhs.constant().equalTo(newRhs.constant())) {
                return new Fraction(1, 1);
            } else {
                throw new EvalError("No Solution");
            }
        }

        newRhs = newRhs.divide(newLhs.terms[0].coefficient());

        if (newRhs.terms.length === 0) {
            return newRhs.constant().reduce();
        }

        newRhs._sort();
        return newRhs;

    // Otherwise, move everything to the LHS.
    } else {
        var newLhs = this.lhs.copy();
        newLhs = newLhs.subtract(this.rhs);

        // If there are no terms left after this rearrangement and the constant is 0, there are infinite solutions.
        // Otherwise, there are no solutions.
        if (newLhs.terms.length === 0) {
            if (newLhs.constant().valueOf() === 0) {
                return [new Fraction(1, 1)];
            } else {
                throw new EvalError("No Solution");
            }

        // Otherwise, check degree and solve.
        } else if (this._isQuadratic(variable)) {
            var coefs = newLhs._quadraticCoefficients();

            var a = coefs.a;
            var b = coefs.b;
            var c = coefs.c;

            // Calculate the discriminant, b^2 - 4ac.
            var discriminant = b.pow(2).subtract(a.multiply(c).multiply(4));

            // If the discriminant is greater than or equal to 0, there is at least one real root.
            if (discriminant.valueOf() >= 0) {
                // If the discriminant is equal to 0, there is one real root: -b / 2a.
                if (discriminant.valueOf() === 0) {
                    return [b.multiply(-1).divide(a.multiply(2)).reduce()];

                    // If the discriminant is greater than 0, there are two real roots:
                    // (-b - √discriminant) / 2a
                    // (-b + √discriminant) / 2a
                } else {
                    var squareRootDiscriminant;

                    // If the answers will be rational, return reduced Fraction objects.
                    if (discriminant._squareRootIsRational()) {
                        squareRootDiscriminant = discriminant.pow(0.5);
                        var root1 = b.multiply(-1).subtract(squareRootDiscriminant).divide(a.multiply(2));
                        var root2 = b.multiply(-1).add(squareRootDiscriminant).divide(a.multiply(2));
                        return [root1.reduce(), root2.reduce()];
                        // If the answers will be irrational, return numbers.
                    } else {
                        squareRootDiscriminant = Math.sqrt(discriminant.valueOf());
                        a = a.valueOf();
                        b = b.valueOf();

                        var root1 = (-b - squareRootDiscriminant) / (2*a);
                        var root2 = (-b + squareRootDiscriminant) / (2*a);
                        return [root1, root2];
                    }
                }
                // If the discriminant is negative, there are no real roots.
            } else {
                return [];
            }
        } else if (this._isCubic(variable)) {
            var coefs = newLhs._cubicCoefficients();

            var a = coefs.a;
            var b = coefs.b;
            var c = coefs.c;
            var d = coefs.d;

            // Calculate D and D0.
            var D = a.multiply(b).multiply(c).multiply(d).multiply(18);
            D = D.subtract(b.pow(3).multiply(d).multiply(4));
            D = D.add(b.pow(2).multiply(c.pow(2)));
            D = D.subtract(a.multiply(c.pow(3)).multiply(4));
            D = D.subtract(a.pow(2).multiply(d.pow(2)).multiply(27));

            var D0 = b.pow(2).subtract(a.multiply(c).multiply(3));

            // Check for special cases when D = 0.
            if (D.valueOf() === 0) {
                // If D = D0 = 0, there is one distinct real root, -b / 3a.
                if (D0.valueOf() === 0) {
                    var root1 = b.multiply(-1).divide(a.multiply(3));

                    return [root1.reduce()];
                    // Otherwise, if D0 != 0, there are two distinct real roots.
                    // 9ad - bc / 2D0
                    // 4abc - 9a^2d - b^3 / aD0
                } else {
                    var root1 = a.multiply(b).multiply(c).multiply(4);
                    root1 = root1.subtract(a.pow(2).multiply(d).multiply(9));
                    root1 = root1.subtract(b.pow(3));
                    root1 = root1.divide(a.multiply(D0));

                    var root2 = a.multiply(d).multiply(9).subtract(b.multiply(c)).divide(D0.multiply(2));

                    return [root1.reduce(), root2.reduce()];
                }

                // Otherwise, if D != 0, reduce to a depressed cubic.
            } else {
                // TODO: Make this work with non-integer rationals.
                // Reduce to a depressed cubic with the Tschirnhaus transformation, x = t - b/3a.
                var t = new Expression("t").subtract(b.divide(a.multiply(3)));
                var params = {};
                params[variable] = t;
                var depressed = newLhs.eval(params);

                var depressedCoefs = depressed._cubicCoefficients();

                var a = depressedCoefs.a.valueOf();
                var b = depressedCoefs.b.valueOf();
                var c = depressedCoefs.c.valueOf();
                var d = depressedCoefs.d.valueOf();

                // If D < 0, there is one real root.
                if (D.valueOf() < 0) {
                    // Solve with Cardano's formula.
                    // Let p = -b / 3*a
                    //     q = p^3 + ((b*c - 3*a*d) / (6*a^2))
                    //     r = c / 3*a

                    var p = -b / 3 * a;
                    var q = Math.pow(p, 3) + ((b * c - 3 * a * d) / (6 * a^2));
                    var r = c / 3 * a;

                    // Let s = √(q^2 + (r - p^2)^3)
                    // Then, x = (q + s)^(1/3) + (q - s)^(1/3) + p

                    var s = Math.sqrt(Math.pow(q, 2) + Math.pow((r - Math.pow(p, 2)), 3));
                    var x = Math.cbrt(q + s) + Math.cbrt(q - s) + p;

                    x = (isInt(x) ? new Fraction(x, 1) : x);
                    var params = {};
                    params[variable] = Math.round(x);
                    x = (newLhs.eval(params).toString() === "0" ? new Fraction(Math.round(x), 1) : x);

                    return [x];

                    // If D > 0, there are three real roots.
                } else {
                    // Let q = √(-3ac / 9a^2), h = 2aq^3.
                    var q = Math.sqrt((-3 * a * c) / (9 * Math.pow(a, 2)));
                    var h = 2 * a * Math.pow(q, 3);

                    // theta = (1/3)arccos(-d/h)
                    var theta = (1 / 3) * Math.acos(-d / h);

                    // t1 = 2 * q * cos(theta)
                    // t2 = 2 * q * cos((2pi / 3) - theta)
                    // t3 = 2 * q * cos((2pi / 3) + theta)

                    var t1 = 2 * q * Math.cos(theta);
                    var t2 = 2 * q * Math.cos((2 * Math.PI / 3) - theta);
                    var t3 = 2 * q * Math.cos((2 * Math.PI / 3) + theta);

                    // x1 = t1 - b/3a;
                    // x2 = t2 - b/3a;
                    // x3 = t3 - b/3a;

                    var x1 = t1 + t.constant().valueOf();
                    var x2 = t2 + t.constant().valueOf();
                    var x3 = t3 + t.constant().valueOf();

                    x1 = (isInt(x1) ? new Fraction(x1, 1) : x1);
                    x2 = (isInt(x2) ? new Fraction(x2, 1) : x2);
                    x3 = (isInt(x3) ? new Fraction(x3, 1) : x3);

                    var params1 = {};
                    var params2 = {};
                    var params3 = {};

                    params1[variable] = Math.round(x1);
                    params2[variable] = Math.round(x2);
                    params3[variable] = Math.round(x3);

                    x1 = (newLhs.eval(params1).toString() === "0" ? new Fraction(Math.round(x1), 1) : x1);
                    x2 = (newLhs.eval(params2).toString() === "0" ? new Fraction(Math.round(x2), 1) : x2);
                    x3 = (newLhs.eval(params3).toString() === "0" ? new Fraction(Math.round(x3), 1) : x3);

                    return [x3, x2, x1];
                }
            }
        }
    }
};

Equation.prototype.eval = function(values) {
    return new Equation(this.lhs.eval(values), this.rhs.eval(values));
};

Equation.prototype.toString = function() {
    return this.lhs.toString() + " = " + this.rhs.toString();
};

Equation.prototype.toTex = function() {
    return this.lhs.toTex() + " = " + this.rhs.toTex();
};

Equation.prototype._maxDegree = function() {
    var lhsMax = this.lhs._maxDegree();
    var rhsMax = this.rhs._maxDegree();
    return Math.max(lhsMax, rhsMax);
};

Equation.prototype._maxDegreeOfVariable = function(variable) {
    return Math.max(this.lhs._maxDegreeOfVariable(variable), this.rhs._maxDegreeOfVariable(variable));
};

Equation.prototype._variableCanBeIsolated = function(variable) {
    return this._maxDegreeOfVariable(variable) === 1 && this._noCrossProductsWithVariable(variable);
};

Equation.prototype._noCrossProductsWithVariable = function(variable) {
    return this.lhs._noCrossProductsWithVariable(variable) && this.rhs._noCrossProductsWithVariable(variable);
};

Equation.prototype._noCrossProducts = function() {
    return this.lhs._noCrossProducts() && this.rhs._noCrossProducts();
};

Equation.prototype._onlyHasVariable = function(variable) {
    return this.lhs._onlyHasVariable(variable) && this.rhs._onlyHasVariable(variable);
};

Equation.prototype._isLinear = function() {
    return this._maxDegree() === 1 && this._noCrossProducts();
};

Equation.prototype._isQuadratic = function(variable) {
    return this._maxDegree() === 2 && this._onlyHasVariable(variable);
};

Equation.prototype._isCubic = function(variable) {
    return this._maxDegree() === 3 && this._onlyHasVariable(variable);
};

module.exports = Equation;
},{"./expressions":3,"./fractions":4,"./helper":5}],3:[function(require,module,exports){
var Fraction = require('./fractions');
var isInt = require('./helper').isInt;

var Expression = function(variable) {
    this.constants = [];

    if(typeof(variable) === "string") {
        var v = new Variable(variable);
        var t = new Term(v);
        this.terms = [t];
    } else if(isInt(variable)) {
        this.constants = [new Fraction(variable, 1)];
        this.terms = [];
    } else if(variable instanceof Fraction) {
        this.constants = [variable];
        this.terms = [];
    } else if(variable instanceof Term) {
        this.terms = [variable];
    } else if(typeof(variable) === "undefined") {
        this.terms = [];
    }else{
        throw new TypeError("Invalid Argument (" + variable.toString() + "): Argument must be of type String, Integer, Fraction or Term.");
    }
};

Expression.prototype.constant = function() {
    return this.constants.reduce(function(p,c){return p.add(c);},new Fraction(0, 1));
};

Expression.prototype.simplify = function() {
    var copy = this.copy();

    //simplify all terms
    copy.terms = copy.terms.map(function(t){return t.simplify();});

    copy._sort();
    copy._combineLikeTerms();
    copy._moveTermsWithDegreeZeroToConstants();
    copy._removeTermsWithCoefficientZero();
    copy.constants = (copy.constant().valueOf() === 0 ? [] : [copy.constant()]);

    return copy;
};

Expression.prototype.copy = function() {
    var copy = new Expression();
    
    //copy all constants
    copy.constants = this.constants.map(function(c){return c.copy();});
    //copy all terms
    copy.terms = this.terms.map(function(t){return t.copy();});

    return copy;
};

Expression.prototype.add = function(a, simplify) {
    var thisExp = this.copy();

    if (typeof(a) === "string" || a instanceof Term || isInt(a) || a instanceof Fraction) {
        var exp = new Expression(a);
        return thisExp.add(exp, simplify);
    } else if (a instanceof Expression) {
        var keepTerms = a.copy().terms;

        thisExp.terms = thisExp.terms.concat(keepTerms);
        thisExp.constants = thisExp.constants.concat(a.constants);
        thisExp._sort();
    } else {
        throw new TypeError("Invalid Argument (" + a.toString() + "): Summand must be of type String, Expression, Term, Fraction or Integer.");
    }

    return (simplify || simplify === undefined) ? thisExp.simplify() : thisExp;
};

Expression.prototype.subtract = function(a, simplify) {
    var negative = (a instanceof Expression) ? a.multiply(-1) : new Expression(a).multiply(-1);
    return this.add(negative, simplify);
};

Expression.prototype.multiply = function(a, simplify) {
    var thisExp = this.copy();

    if (typeof(a) === "string" || a instanceof Term || isInt(a) || a instanceof Fraction) {
        var exp = new Expression(a);
        return thisExp.multiply(exp, simplify);
    } else if (a instanceof Expression) {
        var thatExp = a.copy();
        var newTerms = [];

        for (var i = 0; i < thisExp.terms.length; i++) {
            var thisTerm = thisExp.terms[i];

            for (var j = 0; j < thatExp.terms.length; j++) {
                var thatTerm = thatExp.terms[j];
                newTerms.push(thisTerm.multiply(thatTerm, simplify));
            }

            for (var j = 0; j < thatExp.constants.length; j++) {
                newTerms.push(thisTerm.multiply(thatExp.constants[j], simplify));
            }
        }

        for (var i = 0; i < thatExp.terms.length; i++) {
            var thatTerm = thatExp.terms[i];

            for (var j = 0; j < thisExp.constants.length; j++) {
                newTerms.push(thatTerm.multiply(thisExp.constants[j], simplify));
            }
        }

        var newConstants = [];

        for (var i = 0; i < thisExp.constants.length; i++) {
            var thisConst = thisExp.constants[i];

            for (var j = 0; j < thatExp.constants.length; j++) {
                var thatConst = thatExp.constants[j];
                var t = new Term();
                t = t.multiply(thatConst, false);
                t = t.multiply(thisConst, false);
                newTerms.push(t);
            }
        }

        thisExp.constants = newConstants;
        thisExp.terms = newTerms;
        thisExp._sort();
    } else {
        throw new TypeError("Invalid Argument (" + a.toString() + "): Multiplicand must be of type String, Expression, Term, Fraction or Integer.");
    }

    return (simplify || simplify === undefined) ? thisExp.simplify() : thisExp;
};

Expression.prototype.divide = function(a, simplify) {
    if (a instanceof Fraction || isInt(a)) {

        if (a.valueOf() === 0) {
            throw new EvalError("Divide By Zero");
        }

        var copy = this.copy();

        for (var i = 0; i < copy.terms.length; i++) {
            var thisTerm = copy.terms[i];

            for (var j = 0; j < thisTerm.coefficients.length; j++) {
                thisTerm.coefficients[j] = thisTerm.coefficients[j].divide(a, simplify);
            }
        }

        //divide every constant by a
        copy.constants = copy.constants.map(function(c){return c.divide(a,simplify);});

        return copy;
    } else {
        throw new TypeError("Invalid Argument (" + a.toString() + "): Divisor must be of type Fraction or Integer.");
    }
};

Expression.prototype.pow = function(a, simplify) {
    if (isInt(a)) {
        var copy = this.copy();

        if (a === 0) {
            return new Expression().add(1);
        } else {
            for (var i = 1; i < a; i++) {
                copy = copy.multiply(this, simplify);
            }

            copy._sort();
        }

        return (simplify || simplify === undefined) ? copy.simplify() : copy;
    } else {
        throw new TypeError("Invalid Argument (" + a.toString() + "): Exponent must be of type Integer.");
    }
};

Expression.prototype.eval = function(values, simplify) {
    var exp = new Expression();
    exp.constants = (simplify ? [this.constant()] : this.constants.slice());

    //add all evaluated terms of this to exp
    exp = this.terms.reduce(function(p,c){return p.add(c.eval(values,simplify),simplify);},exp);

    return exp;
};

Expression.prototype.summation = function(variable, lower, upper, simplify) {
	var thisExpr = this.copy();
	var newExpr = new Expression();
	for(var i = lower; i < (upper + 1); i++) {
		var sub = {};
		sub[variable] = i;
		newExpr = newExpr.add(thisExpr.eval(sub, simplify), simplify);
	}
	return newExpr;
};

Expression.prototype.toString = function() {
    var str = "";

    for (var i = 0; i < this.terms.length; i++) {
        var term = this.terms[i];

        str += (term.coefficients[0].valueOf() < 0 ? " - " : " + ") + term.toString();
    }

    for (var i = 0; i < this.constants.length; i++) {
        var constant = this.constants[i];

        str += (constant.valueOf() < 0 ? " - " : " + ") + constant.abs().toString();
    }

    if (str.substring(0, 3) === " - ") {
        return "-" + str.substring(3, str.length);
    } else if (str.substring(0, 3) === " + ") {
        return str.substring(3, str.length);
    } else {
        return "0";
    }
};

Expression.prototype.toTex = function(dict) {
    var str = "";

    for (var i = 0; i < this.terms.length; i++) {
        var term = this.terms[i];

        str += (term.coefficients[0].valueOf() < 0 ? " - " : " + ") + term.toTex(dict);
    }

    for (var i = 0; i < this.constants.length; i++) {
        var constant = this.constants[i];

        str += (constant.valueOf() < 0 ? " - " : " + ") + constant.abs().toTex();
    }

    if (str.substring(0, 3) === " - ") {
        return "-" + str.substring(3, str.length);
    } else if (str.substring(0, 3) === " + ") {
        return str.substring(3, str.length);
    } else {
        return "0";
    }
};

Expression.prototype._removeTermsWithCoefficientZero = function() {
    this.terms = this.terms.filter(function(t){return t.coefficient().reduce().numer !== 0;});
    return this;
};

Expression.prototype._combineLikeTerms = function() {
    function alreadyEncountered(term, encountered) {
        for (var i = 0; i < encountered.length; i++) {
            if (term.canBeCombinedWith(encountered[i])) {
                return true;
            }
        }

        return false;
    }

    var newTerms = [];
    var encountered = [];

    for (var i = 0; i < this.terms.length; i++) {
        var thisTerm = this.terms[i];

        if (alreadyEncountered(thisTerm, encountered)) {
            continue;
        } else {
            for (var j = i + 1; j < this.terms.length; j++) {
                var thatTerm = this.terms[j];

                if (thisTerm.canBeCombinedWith(thatTerm)) {
                    thisTerm = thisTerm.add(thatTerm);
                }
            }

            newTerms.push(thisTerm);
            encountered.push(thisTerm);
        }

    }

    this.terms = newTerms;
    return this;
};

Expression.prototype._moveTermsWithDegreeZeroToConstants = function() {
    var keepTerms = [];
    var constant = new Fraction(0, 1);

    for (var i = 0; i < this.terms.length; i++) {
        var thisTerm = this.terms[i];

        if (thisTerm.variables.length === 0) {
            constant = constant.add(thisTerm.coefficient());
        } else {
            keepTerms.push(thisTerm);
        }
    }

    this.constants.push(constant);
    this.terms = keepTerms;
    return this;
};

Expression.prototype._sort = function() {
    function sortTerms(a, b) {
        var x = a.maxDegree();
        var y = b.maxDegree();

        if (x === y) {
            var m = a.variables.length;
            var n = b.variables.length;

            return n - m;
        } else {
            return y - x;
        }
    }

    this.terms = this.terms.sort(sortTerms);
    return this;
};

Expression.prototype._hasVariable = function(variable) {
    for (var i = 0; i < this.terms.length; i++) {
        if (this.terms[i].hasVariable(variable)) {
            return true;
        }
    }

    return false;
};

Expression.prototype._onlyHasVariable = function(variable) {
    for (var i = 0; i < this.terms.length; i++) {
        if (!this.terms[i].onlyHasVariable(variable)) {
            return false;
        }
    }

    return true;
};

Expression.prototype._noCrossProductsWithVariable = function(variable) {
    for (var i = 0; i < this.terms.length; i++) {
        var term = this.terms[i];
        if (term.hasVariable(variable)  && !term.onlyHasVariable(variable)) {
            return false;
        }
    }

    return true;
};

Expression.prototype._noCrossProducts = function() {
    for (var i = 0; i < this.terms.length; i++) {
        var term = this.terms[i];
        if (term.variables.length > 1) {
            return false;
        }
    }

    return true;
};

Expression.prototype._maxDegree = function() {
    return this.terms.reduce(function(p,c){return Math.max(p,c.maxDegree());},1);
};

Expression.prototype._maxDegreeOfVariable = function(variable) {
    return this.terms.reduce(function(p,c){return Math.max(p,c.maxDegreeOfVariable(variable));},1);
};

Expression.prototype._quadraticCoefficients = function() {
    // This function isn't used until everything has been moved to the LHS in Equation.solve.
    var a;
    var b = new Fraction(0, 1);
    for (var i = 0; i < this.terms.length; i++) {
        var thisTerm = this.terms[i];
        a = (thisTerm.maxDegree() === 2) ? thisTerm.coefficient().copy() : a;
        b = (thisTerm.maxDegree() === 1) ? thisTerm.coefficient().copy() : b;
    }
    var c = this.constant();

    return {a:a, b:b, c:c};
};

Expression.prototype._cubicCoefficients = function() {
    // This function isn't used until everything has been moved to the LHS in Equation.solve.
    var a;
    var b = new Fraction(0, 1);
    var c = new Fraction(0, 1);

    for (var i = 0; i < this.terms.length; i++) {
        var thisTerm = this.terms[i];
        a = (thisTerm.maxDegree() === 3) ? thisTerm.coefficient().copy() : a;
        b = (thisTerm.maxDegree() === 2) ? thisTerm.coefficient().copy() : b;
        c = (thisTerm.maxDegree() === 1) ? thisTerm.coefficient().copy() : c;
    }

    var d = this.constant();
    return {a:a, b:b, c:c, d:d};
};

Term = function(variable) {
    if (variable instanceof Variable) {
        this.variables = [variable.copy()];
    } else if (typeof(variable) === "undefined") {
        this.variables = [];
    } else {
        throw new TypeError("Invalid Argument (" + variable.toString() + "): Term initializer must be of type Variable.");
    }

    this.coefficients = [new Fraction(1, 1)];
};

Term.prototype.coefficient = function() {
    //calculate the product of all coefficients
    return this.coefficients.reduce(function(p,c){return p.multiply(c);}, new Fraction(1,1));
};

Term.prototype.simplify = function() {
    var copy = this.copy();
    copy.coefficients = [this.coefficient()];
    copy.combineVars();
    return copy.sort();
};

Term.prototype.combineVars = function() {
    var uniqueVars = {};

    for (var i = 0; i < this.variables.length; i++) {
        var thisVar = this.variables[i];

        if (thisVar.variable in uniqueVars) {
            uniqueVars[thisVar.variable] += thisVar.degree;
        } else {
            uniqueVars[thisVar.variable] = thisVar.degree;
        }
    }

    var newVars = [];

    for (var v in uniqueVars) {
        var newVar = new Variable(v);
        newVar.degree = uniqueVars[v];
        newVars.push(newVar);
    }

    this.variables = newVars;
    return this;
};

Term.prototype.copy = function() {
    var copy = new Term();
    copy.coefficients = this.coefficients.map(function(c){return c.copy();});
    copy.variables = this.variables.map(function(v){return v.copy();});
    return copy;
};

Term.prototype.add = function(term) {
    if(term instanceof Term && this.canBeCombinedWith(term)) {
        var copy = this.copy();
        copy.coefficients = [copy.coefficient().add(term.coefficient())];
        return copy;
    } else {
        throw new TypeError("Invalid Argument (" + term.toString() + "): Summand must be of type String, Expression, Term, Fraction or Integer.");
    }
};

Term.prototype.subtract = function(term) {
    if (term instanceof Term && this.canBeCombinedWith(term)) {
        var copy = this.copy();
        copy.coefficients = [copy.coefficient().subtract(term.coefficient())];
        return copy;
    } else {
        throw new TypeError("Invalid Argument (" + term.toString() + "): Subtrahend must be of type String, Expression, Term, Fraction or Integer.");
    }
};

Term.prototype.multiply = function(a, simplify) {
    var thisTerm = this.copy();

    if (a instanceof Term) {
        thisTerm.variables = thisTerm.variables.concat(a.variables);
        thisTerm.coefficients = a.coefficients.concat(thisTerm.coefficients);

    } else if (isInt(a) || a instanceof Fraction) {
        var newCoef = (isInt(a) ? new Fraction(a, 1) : a);

        if (thisTerm.variables.length === 0) {
            thisTerm.coefficients.push(newCoef);
        } else {
            thisTerm.coefficients.unshift(newCoef);
        }
    } else {
        throw new TypeError("Invalid Argument (" + a.toString() + "): Multiplicand must be of type String, Expression, Term, Fraction or Integer.");
    }

    return (simplify || simplify === undefined) ? thisTerm.simplify() : thisTerm;
};

Term.prototype.divide = function(a, simplify) {
    if(isInt(a) || a instanceof Fraction) {
        var thisTerm = this.copy();
        thisTerm.coefficients = thisTerm.coefficients.map(function(c){return c.divide(a,simplify);});
        return thisTerm;
    } else {
        throw new TypeError("Invalid Argument (" + a.toString() + "): Argument must be of type Fraction or Integer.");
    }
};

Term.prototype.eval = function(values, simplify) {
    var copy = this.copy();
    var keys = Object.keys(values);
    var exp = copy.coefficients.reduce(function(p,c){return p.multiply(c,simplify);}, new Expression(1));

    for(var i = 0; i < copy.variables.length; i++) {
        var thisVar = copy.variables[i];

        var ev;

        if (thisVar.variable in values) {
            var sub = values[thisVar.variable];

            if(sub instanceof Fraction || sub instanceof Expression) {
                ev = sub.pow(thisVar.degree);
            } else if(isInt(sub)) {
                ev = Math.pow(sub, thisVar.degree);
            } else {
                throw new TypeError("Invalid Argument (" + sub + "): Can only evaluate Expressions or Fractions.");
            }
        } else {
            ev = new Expression(thisVar.variable).pow(thisVar.degree);
        }

        exp = exp.multiply(ev, simplify);
    }

    return exp;
};

Term.prototype.hasVariable = function(variable) {
    for (var i = 0; i < this.variables.length; i++) {
        if (this.variables[i].variable === variable) {
            return true;
        }
    }

    return false;
};

Term.prototype.maxDegree = function() {
    return this.variables.reduce(function(p,c){return Math.max(p,c.degree);},1);
};

Term.prototype.maxDegreeOfVariable = function(variable) {
    return this.variables.reduce(function(p,c){return (c.variable === variable) ? Math.max(p,c.degree) : p;},1);
};

Term.prototype.canBeCombinedWith = function(term) {
    var thisVars = this.variables;
    var thatVars = term.variables;

    if(thisVars.length != thatVars.length) {
        return false;
    }

    matches = 0;

    for(var i = 0; i < thisVars.length; i++) {
        for(var j = 0; j < thatVars.length; j++) {
            if(thisVars[i].variable === thatVars[j].variable && thisVars[i].degree === thatVars[j].degree) {
                matches += 1;
            }
        }
    }

    return (matches === thisVars.length);
};

Term.prototype.onlyHasVariable = function(variable) {
    for (var i = 0; i < this.variables.length; i++) {
        if (this.variables[i].variable != variable) {
            return false;
        }
    }

    return true;
};

Term.prototype.sort = function() {
    function sortVars(a, b) {
        return b.degree - a.degree;
    }

    this.variables = this.variables.sort(sortVars);
    return this;
};

Term.prototype.toString = function() {
    var str = "";

    for (var i = 0; i < this.coefficients.length; i++) {
        var coef = this.coefficients[i];

        if (coef.abs().numer !== 1 || coef.abs().denom !== 1) {
            str += " * " + coef.toString();
        }
    }

    str = this.variables.reduce(function(p,c){return p.concat(c.toString());},str);
    str = (str.substring(0, 3) === " * " ? str.substring(3, str.length) : str);
    str = (str.substring(0, 1) === "-" ? str.substring(1, str.length) : str);

    return str;
};

Term.prototype.toTex = function(dict) {
    var dict = (dict === undefined) ? {} : dict;
    dict.multiplication = !("multiplication" in dict) ? "cdot" : dict.multiplication;
    
    var op =  " \\" + dict.multiplication + " ";

    var str = "";

    for (var i = 0; i < this.coefficients.length; i++) {
        var coef = this.coefficients[i];

        if (coef.abs().numer !== 1 || coef.abs().denom !== 1) {
            str += op + coef.toTex();
        }
    }
    str = this.variables.reduce(function(p,c){return p.concat(c.toTex());},str);
    str = (str.substring(0, op.length) === op ? str.substring(op.length, str.length) : str);
    str = (str.substring(0, 1) === "-" ? str.substring(1, str.length) : str);
    str = (str.substring(0, 7) === "\\frac{-" ? "\\frac{" + str.substring(7, str.length) : str);

    return str;
};

var Variable = function(variable) {
    if (typeof(variable) === "string") {
        this.variable = variable;
        this.degree = 1;
    } else {
        throw new TypeError("Invalid Argument (" + variable.toString() + "): Variable initalizer must be of type String.");
    }
};

Variable.prototype.copy = function() {
    var copy = new Variable(this.variable);
    copy.degree = this.degree;
    return copy;
};

Variable.prototype.toString = function() {
    var degree = this.degree;
    var variable = this.variable;

    if (degree === 0) {
        return "";
    } else if (degree === 1) {
        return variable;
    } else {
        return variable + "^" + degree;
    }
};

Variable.prototype.toTex = function() {
    var degree = this.degree;
    var variable = this.variable;

    if (GREEK_LETTERS.indexOf(variable) > -1) {
        variable = "\\" + variable;
    }

    if (degree === 0) {
        return "";
    } else if (degree === 1) {
        return variable;
    } else {
        return variable + "^{" + degree + "}";
    }
};

module.exports = {
    Expression: Expression,
    Term: Term,
    Variable: Variable
};
},{"./fractions":4,"./helper":5}],4:[function(require,module,exports){
var isInt = require('./helper').isInt;
var gcd = require('./helper').gcd;
var lcm = require('./helper').lcm;

var Fraction = function(a, b) {
    if (b === 0) {
        throw new EvalError("Divide By Zero");
    } else if (isInt(a) && isInt(b)) {
        this.numer = a;
        this.denom = b;
    } else {
        throw new TypeError("Invalid Argument ("+a.toString()+ ","+ b.toString() +"): Divisor and dividend must be of type Integer.");
    }
};

Fraction.prototype.copy = function() {
    return new Fraction(this.numer, this.denom);
};

Fraction.prototype.reduce = function() {
    var copy = this.copy();

    var g = gcd(copy.numer, copy.denom);
    copy.numer = copy.numer / g;
    copy.denom = copy.denom / g;

    if (Math.sign(copy.denom) == -1 && Math.sign(copy.numer) == 1) {
        copy.numer *= -1;
        copy.denom *= -1;
    }

    return copy;
};

Fraction.prototype.equalTo = function(fraction) {
    if(fraction instanceof Fraction) {
        var thisReduced = this.reduce();
        var thatReduced = fraction.reduce();
        return thisReduced.numer === thatReduced.numer && thisReduced.denom === thatReduced.denom;
    }else{
        return false;
    }
};

Fraction.prototype.add = function(f, simplify) {
    simplify = (simplify === undefined ? true : simplify);

    var a, b;

    if (f instanceof Fraction) {
        a = f.numer;
        b = f.denom;
    } else if (isInt(f)) {
        a = f;
        b = 1;
    } else {
        throw new TypeError("Invalid Argument (" + f.toString() + "): Summand must be of type Fraction or Integer.");
    }

    var copy = this.copy();

    if (this.denom == b) {
        copy.numer += a;
    } else {
        var m = lcm(copy.denom, b);
        var thisM = m / copy.denom;
        var otherM = m / b;

        copy.numer *= thisM;
        copy.denom *= thisM;

        a *= otherM;

        copy.numer += a;
    }

    return (simplify ? copy.reduce() : copy);
};

Fraction.prototype.subtract = function(f, simplify) {
    simplify = (simplify === undefined ? true : simplify);

    var copy = this.copy();

    if (f instanceof Fraction) {
        return copy.add(new Fraction(-f.numer, f.denom), simplify);
    } else if (isInt(f)) {
        return copy.add(new Fraction(-f, 1), simplify);
    } else {
        throw new TypeError("Invalid Argument (" + f.toString() + "): Subtrahend must be of type Fraction or Integer.");
    }
};

Fraction.prototype.multiply = function(f, simplify) {
    simplify = (simplify === undefined ? true : simplify);

    var a, b;

    if (f instanceof Fraction) {
        a = f.numer;
        b = f.denom;
    } else if (isInt(f) && f) {
        a = f;
        b = 1;
    } else if (f === 0) {
        a = 0;
        b = 1;
    } else {
        throw new TypeError("Invalid Argument (" + f.toString() + "): Multiplicand must be of type Fraction or Integer.");
    }

    var copy = this.copy();

    copy.numer *= a;
    copy.denom *= b;

    return (simplify ? copy.reduce() : copy);
};

Fraction.prototype.divide = function(f, simplify) {
    simplify = (simplify === undefined ? true : simplify);

    if (f.valueOf() === 0) {
        throw new EvalError("Divide By Zero");
    }

    var copy = this.copy();

    if (f instanceof Fraction) {
        return copy.multiply(new Fraction(f.denom, f.numer), simplify);
    } else if (isInt(f)) {
        return copy.multiply(new Fraction(1, f), simplify);
    } else {
        throw new TypeError("Invalid Argument (" + f.toString() + "): Divisor must be of type Fraction or Integer.");
    }
};

Fraction.prototype.pow = function(n, simplify) {
    simplify = (simplify === undefined ? true : simplify);

    var copy = this.copy();

    copy.numer = Math.pow(copy.numer, n);
    copy.denom = Math.pow(copy.denom, n);

    return (simplify ? copy.reduce() : copy);
};

Fraction.prototype.abs = function() {
    var copy = this.copy();

    copy.numer = Math.abs(copy.numer);
    copy.denom = Math.abs(copy.denom);

    return copy;
};

Fraction.prototype.valueOf = function() {
    return this.numer / this.denom;
};

Fraction.prototype.toString = function() {
    if (this.numer === 0) {
        return "0";
    } else if (this.denom === 1) {
        return this.numer.toString();
    } else if (this.denom === -1) {
        return (-this.numer).toString();
    } else {
        return this.numer + "/" + this.denom;
    }
};

Fraction.prototype.toTex = function() {
    if (this.numer === 0) {
        return "0";
    } else if (this.denom === 1) {
        return this.numer.toString();
    } else if (this.denom === -1) {
        return (-this.numer).toString();
    } else {
        return "\\frac{" + this.numer + "}{" + this.denom + "}";
    }
};

Fraction.prototype._squareRootIsRational = function() {
    if (this.valueOf() === 0) {
        return true;
    }

    var sqrtNumer = Math.sqrt(this.numer);
    var sqrtDenom = Math.sqrt(this.denom);

    return isInt(sqrtNumer) && isInt(sqrtDenom);
};

Fraction.prototype._cubeRootIsRational = function() {
    if (this.valueOf() === 0) {
        return true;
    }

    var cbrtNumer = Math.cbrt(this.numer);
    var cbrtDenom = Math.cbrt(this.denom);

    return isInt(cbrtNumer) && isInt(cbrtDenom);
};

module.exports = Fraction;
},{"./helper":5}],5:[function(require,module,exports){
function gcd(x, y) {
    while (y) {
        var temp = x;
        x = y;
        y = temp % y;
    }

    return x;
}

function lcm(x, y) {
    return (x * y) / gcd(x, y);
}

function isInt(thing) {
    return (typeof thing == "number") && (thing % 1 === 0);
}

function round(decimal, places) {
    places = (typeof(places) === "undefined" ? 2 : places);
    var x = Math.pow(10, places);
    return Math.round(parseFloat(decimal) * x) / x;
}

Number.prototype.toTex = function() {
    return this.toString();
};

Array.prototype.toTex = function() {
    return this.map(function(e){return e.toTex();}).join();
};

GREEK_LETTERS = [
    'alpha',
    'beta',
    'gamma',
    'Gamma',
    'delta',
    'Delta',
    'epsilon',
    'varepsilon',
    'zeta',
    'eta',
    'theta',
    'vartheta',
    'Theta',
    'iota',
    'kappa',
    'lambda',
    'Lambda',
    'mu',
    'nu',
    'xi',
    'Xi',
    'pi',
    'Pi',
    'rho',
    'varrho',
    'sigma',
    'Sigma',
    'tau',
    'upsilon',
    'Upsilon',
    'phi',
    'varphi',
    'Phi',
    'chi',
    'psi',
    'Psi',
    'omega',
    'Omega'
];

exports.gcd = gcd;
exports.lcm = lcm;
exports.isInt = isInt;
exports.round = round;
exports.GREEK_LETTERS = GREEK_LETTERS;
},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
            return minusterm.multiply(-1);
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
    var c = expression.constants[0];
    return new Fraction(c.numer, c.denom);
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

},{"./equations":2,"./expressions":3,"./fractions":4,"./lexer":6}]},{},[1])(1)
});