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