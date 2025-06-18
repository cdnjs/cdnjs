(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dashjs"] = factory();
	else
		root["dashjs"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./externals/BigInteger.js":
/*!*********************************!*\
  !*** ./externals/BigInteger.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var bigInt = function (undefined) {
  'use strict';

  var BASE = 1e7,
    LOG_BASE = 7,
    MAX_INT = 9007199254740992,
    MAX_INT_ARR = smallToArray(MAX_INT),
    DEFAULT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
  var supportsNativeBigInt = typeof BigInt === 'function';
  function Integer(v, radix, alphabet, caseSensitive) {
    if (typeof v === 'undefined') return Integer[0];
    if (typeof radix !== 'undefined') return +radix === 10 && !alphabet ? parseValue(v) : parseBase(v, radix, alphabet, caseSensitive);
    return parseValue(v);
  }
  function BigInteger(value, sign) {
    this.value = value;
    this.sign = sign;
    this.isSmall = false;
  }
  BigInteger.prototype = Object.create(Integer.prototype);
  function SmallInteger(value) {
    this.value = value;
    this.sign = value < 0;
    this.isSmall = true;
  }
  SmallInteger.prototype = Object.create(Integer.prototype);
  function NativeBigInt(value) {
    this.value = value;
  }
  NativeBigInt.prototype = Object.create(Integer.prototype);
  function isPrecise(n) {
    return -MAX_INT < n && n < MAX_INT;
  }
  function smallToArray(n) {
    if (n < 1e7) return [n];
    if (n < 1e14) return [n % 1e7, Math.floor(n / 1e7)];
    return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
  }
  function arrayToSmall(arr) {
    trim(arr);
    var length = arr.length;
    if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
      switch (length) {
        case 0:
          return 0;
        case 1:
          return arr[0];
        case 2:
          return arr[0] + arr[1] * BASE;
        default:
          return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
      }
    }
    return arr;
  }
  function trim(v) {
    var i = v.length;
    while (v[--i] === 0);
    v.length = i + 1;
  }
  function createArray(length) {
    var x = new Array(length);
    var i = -1;
    while (++i < length) {
      x[i] = 0;
    }
    return x;
  }
  function truncate(n) {
    if (n > 0) return Math.floor(n);
    return Math.ceil(n);
  }
  function add(a, b) {
    var l_a = a.length,
      l_b = b.length,
      r = new Array(l_a),
      carry = 0,
      base = BASE,
      sum,
      i;
    for (i = 0; i < l_b; i++) {
      sum = a[i] + b[i] + carry;
      carry = sum >= base ? 1 : 0;
      r[i] = sum - carry * base;
    }
    while (i < l_a) {
      sum = a[i] + carry;
      carry = sum === base ? 1 : 0;
      r[i++] = sum - carry * base;
    }
    if (carry > 0) r.push(carry);
    return r;
  }
  function addAny(a, b) {
    if (a.length >= b.length) return add(a, b);
    return add(b, a);
  }
  function addSmall(a, carry) {
    var l = a.length,
      r = new Array(l),
      base = BASE,
      sum,
      i;
    for (i = 0; i < l; i++) {
      sum = a[i] - base + carry;
      carry = Math.floor(sum / base);
      r[i] = sum - carry * base;
      carry += 1;
    }
    while (carry > 0) {
      r[i++] = carry % base;
      carry = Math.floor(carry / base);
    }
    return r;
  }
  BigInteger.prototype.add = function (v) {
    var n = parseValue(v);
    if (this.sign !== n.sign) {
      return this.subtract(n.negate());
    }
    var a = this.value,
      b = n.value;
    if (n.isSmall) {
      return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
    }
    return new BigInteger(addAny(a, b), this.sign);
  };
  BigInteger.prototype.plus = BigInteger.prototype.add;
  SmallInteger.prototype.add = function (v) {
    var n = parseValue(v);
    var a = this.value;
    if (a < 0 !== n.sign) {
      return this.subtract(n.negate());
    }
    var b = n.value;
    if (n.isSmall) {
      if (isPrecise(a + b)) return new SmallInteger(a + b);
      b = smallToArray(Math.abs(b));
    }
    return new BigInteger(addSmall(b, Math.abs(a)), a < 0);
  };
  SmallInteger.prototype.plus = SmallInteger.prototype.add;
  NativeBigInt.prototype.add = function (v) {
    return new NativeBigInt(this.value + parseValue(v).value);
  };
  NativeBigInt.prototype.plus = NativeBigInt.prototype.add;
  function subtract(a, b) {
    var a_l = a.length,
      b_l = b.length,
      r = new Array(a_l),
      borrow = 0,
      base = BASE,
      i,
      difference;
    for (i = 0; i < b_l; i++) {
      difference = a[i] - borrow - b[i];
      if (difference < 0) {
        difference += base;
        borrow = 1;
      } else borrow = 0;
      r[i] = difference;
    }
    for (i = b_l; i < a_l; i++) {
      difference = a[i] - borrow;
      if (difference < 0) difference += base;else {
        r[i++] = difference;
        break;
      }
      r[i] = difference;
    }
    for (; i < a_l; i++) {
      r[i] = a[i];
    }
    trim(r);
    return r;
  }
  function subtractAny(a, b, sign) {
    var value;
    if (compareAbs(a, b) >= 0) {
      value = subtract(a, b);
    } else {
      value = subtract(b, a);
      sign = !sign;
    }
    value = arrayToSmall(value);
    if (typeof value === 'number') {
      if (sign) value = -value;
      return new SmallInteger(value);
    }
    return new BigInteger(value, sign);
  }
  function subtractSmall(a, b, sign) {
    var l = a.length,
      r = new Array(l),
      carry = -b,
      base = BASE,
      i,
      difference;
    for (i = 0; i < l; i++) {
      difference = a[i] + carry;
      carry = Math.floor(difference / base);
      difference %= base;
      r[i] = difference < 0 ? difference + base : difference;
    }
    r = arrayToSmall(r);
    if (typeof r === 'number') {
      if (sign) r = -r;
      return new SmallInteger(r);
    }
    return new BigInteger(r, sign);
  }
  BigInteger.prototype.subtract = function (v) {
    var n = parseValue(v);
    if (this.sign !== n.sign) {
      return this.add(n.negate());
    }
    var a = this.value,
      b = n.value;
    if (n.isSmall) return subtractSmall(a, Math.abs(b), this.sign);
    return subtractAny(a, b, this.sign);
  };
  BigInteger.prototype.minus = BigInteger.prototype.subtract;
  SmallInteger.prototype.subtract = function (v) {
    var n = parseValue(v);
    var a = this.value;
    if (a < 0 !== n.sign) {
      return this.add(n.negate());
    }
    var b = n.value;
    if (n.isSmall) {
      return new SmallInteger(a - b);
    }
    return subtractSmall(b, Math.abs(a), a >= 0);
  };
  SmallInteger.prototype.minus = SmallInteger.prototype.subtract;
  NativeBigInt.prototype.subtract = function (v) {
    return new NativeBigInt(this.value - parseValue(v).value);
  };
  NativeBigInt.prototype.minus = NativeBigInt.prototype.subtract;
  BigInteger.prototype.negate = function () {
    return new BigInteger(this.value, !this.sign);
  };
  SmallInteger.prototype.negate = function () {
    var sign = this.sign;
    var small = new SmallInteger(-this.value);
    small.sign = !sign;
    return small;
  };
  NativeBigInt.prototype.negate = function () {
    return new NativeBigInt(-this.value);
  };
  BigInteger.prototype.abs = function () {
    return new BigInteger(this.value, false);
  };
  SmallInteger.prototype.abs = function () {
    return new SmallInteger(Math.abs(this.value));
  };
  NativeBigInt.prototype.abs = function () {
    return new NativeBigInt(this.value >= 0 ? this.value : -this.value);
  };
  function multiplyLong(a, b) {
    var a_l = a.length,
      b_l = b.length,
      l = a_l + b_l,
      r = createArray(l),
      base = BASE,
      product,
      carry,
      i,
      a_i,
      b_j;
    for (i = 0; i < a_l; ++i) {
      a_i = a[i];
      for (var j = 0; j < b_l; ++j) {
        b_j = b[j];
        product = a_i * b_j + r[i + j];
        carry = Math.floor(product / base);
        r[i + j] = product - carry * base;
        r[i + j + 1] += carry;
      }
    }
    trim(r);
    return r;
  }
  function multiplySmall(a, b) {
    var l = a.length,
      r = new Array(l),
      base = BASE,
      carry = 0,
      product,
      i;
    for (i = 0; i < l; i++) {
      product = a[i] * b + carry;
      carry = Math.floor(product / base);
      r[i] = product - carry * base;
    }
    while (carry > 0) {
      r[i++] = carry % base;
      carry = Math.floor(carry / base);
    }
    return r;
  }
  function shiftLeft(x, n) {
    var r = [];
    while (n-- > 0) r.push(0);
    return r.concat(x);
  }
  function multiplyKaratsuba(x, y) {
    var n = Math.max(x.length, y.length);
    if (n <= 30) return multiplyLong(x, y);
    n = Math.ceil(n / 2);
    var b = x.slice(n),
      a = x.slice(0, n),
      d = y.slice(n),
      c = y.slice(0, n);
    var ac = multiplyKaratsuba(a, c),
      bd = multiplyKaratsuba(b, d),
      abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));
    var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
    trim(product);
    return product;
  }
  function useKaratsuba(l1, l2) {
    return -.012 * l1 - .012 * l2 + 15e-6 * l1 * l2 > 0;
  }
  BigInteger.prototype.multiply = function (v) {
    var n = parseValue(v),
      a = this.value,
      b = n.value,
      sign = this.sign !== n.sign,
      abs;
    if (n.isSmall) {
      if (b === 0) return Integer[0];
      if (b === 1) return this;
      if (b === -1) return this.negate();
      abs = Math.abs(b);
      if (abs < BASE) {
        return new BigInteger(multiplySmall(a, abs), sign);
      }
      b = smallToArray(abs);
    }
    if (useKaratsuba(a.length, b.length)) return new BigInteger(multiplyKaratsuba(a, b), sign);
    return new BigInteger(multiplyLong(a, b), sign);
  };
  BigInteger.prototype.times = BigInteger.prototype.multiply;
  function multiplySmallAndArray(a, b, sign) {
    if (a < BASE) {
      return new BigInteger(multiplySmall(b, a), sign);
    }
    return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
  }
  SmallInteger.prototype._multiplyBySmall = function (a) {
    if (isPrecise(a.value * this.value)) {
      return new SmallInteger(a.value * this.value);
    }
    return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
  };
  BigInteger.prototype._multiplyBySmall = function (a) {
    if (a.value === 0) return Integer[0];
    if (a.value === 1) return this;
    if (a.value === -1) return this.negate();
    return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
  };
  SmallInteger.prototype.multiply = function (v) {
    return parseValue(v)._multiplyBySmall(this);
  };
  SmallInteger.prototype.times = SmallInteger.prototype.multiply;
  NativeBigInt.prototype.multiply = function (v) {
    return new NativeBigInt(this.value * parseValue(v).value);
  };
  NativeBigInt.prototype.times = NativeBigInt.prototype.multiply;
  function square(a) {
    var l = a.length,
      r = createArray(l + l),
      base = BASE,
      product,
      carry,
      i,
      a_i,
      a_j;
    for (i = 0; i < l; i++) {
      a_i = a[i];
      carry = 0 - a_i * a_i;
      for (var j = i; j < l; j++) {
        a_j = a[j];
        product = 2 * (a_i * a_j) + r[i + j] + carry;
        carry = Math.floor(product / base);
        r[i + j] = product - carry * base;
      }
      r[i + l] = carry;
    }
    trim(r);
    return r;
  }
  BigInteger.prototype.square = function () {
    return new BigInteger(square(this.value), false);
  };
  SmallInteger.prototype.square = function () {
    var value = this.value * this.value;
    if (isPrecise(value)) return new SmallInteger(value);
    return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
  };
  NativeBigInt.prototype.square = function (v) {
    return new NativeBigInt(this.value * this.value);
  };
  function divMod1(a, b) {
    var a_l = a.length,
      b_l = b.length,
      base = BASE,
      result = createArray(b.length),
      divisorMostSignificantDigit = b[b_l - 1],
      lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)),
      remainder = multiplySmall(a, lambda),
      divisor = multiplySmall(b, lambda),
      quotientDigit,
      shift,
      carry,
      borrow,
      i,
      l,
      q;
    if (remainder.length <= a_l) remainder.push(0);
    divisor.push(0);
    divisorMostSignificantDigit = divisor[b_l - 1];
    for (shift = a_l - b_l; shift >= 0; shift--) {
      quotientDigit = base - 1;
      if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
        quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
      }
      carry = 0;
      borrow = 0;
      l = divisor.length;
      for (i = 0; i < l; i++) {
        carry += quotientDigit * divisor[i];
        q = Math.floor(carry / base);
        borrow += remainder[shift + i] - (carry - q * base);
        carry = q;
        if (borrow < 0) {
          remainder[shift + i] = borrow + base;
          borrow = -1;
        } else {
          remainder[shift + i] = borrow;
          borrow = 0;
        }
      }
      while (borrow !== 0) {
        quotientDigit -= 1;
        carry = 0;
        for (i = 0; i < l; i++) {
          carry += remainder[shift + i] - base + divisor[i];
          if (carry < 0) {
            remainder[shift + i] = carry + base;
            carry = 0;
          } else {
            remainder[shift + i] = carry;
            carry = 1;
          }
        }
        borrow += carry;
      }
      result[shift] = quotientDigit;
    }
    remainder = divModSmall(remainder, lambda)[0];
    return [arrayToSmall(result), arrayToSmall(remainder)];
  }
  function divMod2(a, b) {
    var a_l = a.length,
      b_l = b.length,
      result = [],
      part = [],
      base = BASE,
      guess,
      xlen,
      highx,
      highy,
      check;
    while (a_l) {
      part.unshift(a[--a_l]);
      trim(part);
      if (compareAbs(part, b) < 0) {
        result.push(0);
        continue;
      }
      xlen = part.length;
      highx = part[xlen - 1] * base + part[xlen - 2];
      highy = b[b_l - 1] * base + b[b_l - 2];
      if (xlen > b_l) {
        highx = (highx + 1) * base;
      }
      guess = Math.ceil(highx / highy);
      do {
        check = multiplySmall(b, guess);
        if (compareAbs(check, part) <= 0) break;
        guess--;
      } while (guess);
      result.push(guess);
      part = subtract(part, check);
    }
    result.reverse();
    return [arrayToSmall(result), arrayToSmall(part)];
  }
  function divModSmall(value, lambda) {
    var length = value.length,
      quotient = createArray(length),
      base = BASE,
      i,
      q,
      remainder,
      divisor;
    remainder = 0;
    for (i = length - 1; i >= 0; --i) {
      divisor = remainder * base + value[i];
      q = truncate(divisor / lambda);
      remainder = divisor - q * lambda;
      quotient[i] = q | 0;
    }
    return [quotient, remainder | 0];
  }
  function divModAny(self, v) {
    var value,
      n = parseValue(v);
    if (supportsNativeBigInt) {
      return [new NativeBigInt(self.value / n.value), new NativeBigInt(self.value % n.value)];
    }
    var a = self.value,
      b = n.value;
    var quotient;
    if (b === 0) throw new Error('Cannot divide by zero');
    if (self.isSmall) {
      if (n.isSmall) {
        return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
      }
      return [Integer[0], self];
    }
    if (n.isSmall) {
      if (b === 1) return [self, Integer[0]];
      if (b == -1) return [self.negate(), Integer[0]];
      var abs = Math.abs(b);
      if (abs < BASE) {
        value = divModSmall(a, abs);
        quotient = arrayToSmall(value[0]);
        var remainder = value[1];
        if (self.sign) remainder = -remainder;
        if (typeof quotient === 'number') {
          if (self.sign !== n.sign) quotient = -quotient;
          return [new SmallInteger(quotient), new SmallInteger(remainder)];
        }
        return [new BigInteger(quotient, self.sign !== n.sign), new SmallInteger(remainder)];
      }
      b = smallToArray(abs);
    }
    var comparison = compareAbs(a, b);
    if (comparison === -1) return [Integer[0], self];
    if (comparison === 0) return [Integer[self.sign === n.sign ? 1 : -1], Integer[0]];
    if (a.length + b.length <= 200) value = divMod1(a, b);else value = divMod2(a, b);
    quotient = value[0];
    var qSign = self.sign !== n.sign,
      mod = value[1],
      mSign = self.sign;
    if (typeof quotient === 'number') {
      if (qSign) quotient = -quotient;
      quotient = new SmallInteger(quotient);
    } else quotient = new BigInteger(quotient, qSign);
    if (typeof mod === 'number') {
      if (mSign) mod = -mod;
      mod = new SmallInteger(mod);
    } else mod = new BigInteger(mod, mSign);
    return [quotient, mod];
  }
  BigInteger.prototype.divmod = function (v) {
    var result = divModAny(this, v);
    return {
      quotient: result[0],
      remainder: result[1]
    };
  };
  NativeBigInt.prototype.divmod = SmallInteger.prototype.divmod = BigInteger.prototype.divmod;
  BigInteger.prototype.divide = function (v) {
    return divModAny(this, v)[0];
  };
  NativeBigInt.prototype.over = NativeBigInt.prototype.divide = function (v) {
    return new NativeBigInt(this.value / parseValue(v).value);
  };
  SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger.prototype.over = BigInteger.prototype.divide;
  BigInteger.prototype.mod = function (v) {
    return divModAny(this, v)[1];
  };
  NativeBigInt.prototype.mod = NativeBigInt.prototype.remainder = function (v) {
    return new NativeBigInt(this.value % parseValue(v).value);
  };
  SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger.prototype.remainder = BigInteger.prototype.mod;
  BigInteger.prototype.pow = function (v) {
    var n = parseValue(v),
      a = this.value,
      b = n.value,
      value,
      x,
      y;
    if (b === 0) return Integer[1];
    if (a === 0) return Integer[0];
    if (a === 1) return Integer[1];
    if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
    if (n.sign) {
      return Integer[0];
    }
    if (!n.isSmall) throw new Error('The exponent ' + n.toString() + ' is too large.');
    if (this.isSmall) {
      if (isPrecise(value = Math.pow(a, b))) return new SmallInteger(truncate(value));
    }
    x = this;
    y = Integer[1];
    while (true) {
      if (b & 1 === 1) {
        y = y.times(x);
        --b;
      }
      if (b === 0) break;
      b /= 2;
      x = x.square();
    }
    return y;
  };
  SmallInteger.prototype.pow = BigInteger.prototype.pow;
  NativeBigInt.prototype.pow = function (v) {
    var n = parseValue(v);
    var a = this.value,
      b = n.value;
    var _0 = BigInt(0),
      _1 = BigInt(1),
      _2 = BigInt(2);
    if (b === _0) return Integer[1];
    if (a === _0) return Integer[0];
    if (a === _1) return Integer[1];
    if (a === BigInt(-1)) return n.isEven() ? Integer[1] : Integer[-1];
    if (n.isNegative()) return new NativeBigInt(_0);
    var x = this;
    var y = Integer[1];
    while (true) {
      if ((b & _1) === _1) {
        y = y.times(x);
        --b;
      }
      if (b === _0) break;
      b /= _2;
      x = x.square();
    }
    return y;
  };
  BigInteger.prototype.modPow = function (exp, mod) {
    exp = parseValue(exp);
    mod = parseValue(mod);
    if (mod.isZero()) throw new Error('Cannot take modPow with modulus 0');
    var r = Integer[1],
      base = this.mod(mod);
    while (exp.isPositive()) {
      if (base.isZero()) return Integer[0];
      if (exp.isOdd()) r = r.multiply(base).mod(mod);
      exp = exp.divide(2);
      base = base.square().mod(mod);
    }
    return r;
  };
  NativeBigInt.prototype.modPow = SmallInteger.prototype.modPow = BigInteger.prototype.modPow;
  function compareAbs(a, b) {
    if (a.length !== b.length) {
      return a.length > b.length ? 1 : -1;
    }
    for (var i = a.length - 1; i >= 0; i--) {
      if (a[i] !== b[i]) return a[i] > b[i] ? 1 : -1;
    }
    return 0;
  }
  BigInteger.prototype.compareAbs = function (v) {
    var n = parseValue(v),
      a = this.value,
      b = n.value;
    if (n.isSmall) return 1;
    return compareAbs(a, b);
  };
  SmallInteger.prototype.compareAbs = function (v) {
    var n = parseValue(v),
      a = Math.abs(this.value),
      b = n.value;
    if (n.isSmall) {
      b = Math.abs(b);
      return a === b ? 0 : a > b ? 1 : -1;
    }
    return -1;
  };
  NativeBigInt.prototype.compareAbs = function (v) {
    var a = this.value;
    var b = parseValue(v).value;
    a = a >= 0 ? a : -a;
    b = b >= 0 ? b : -b;
    return a === b ? 0 : a > b ? 1 : -1;
  };
  BigInteger.prototype.compare = function (v) {
    if (v === Infinity) {
      return -1;
    }
    if (v === -Infinity) {
      return 1;
    }
    var n = parseValue(v),
      a = this.value,
      b = n.value;
    if (this.sign !== n.sign) {
      return n.sign ? 1 : -1;
    }
    if (n.isSmall) {
      return this.sign ? -1 : 1;
    }
    return compareAbs(a, b) * (this.sign ? -1 : 1);
  };
  BigInteger.prototype.compareTo = BigInteger.prototype.compare;
  SmallInteger.prototype.compare = function (v) {
    if (v === Infinity) {
      return -1;
    }
    if (v === -Infinity) {
      return 1;
    }
    var n = parseValue(v),
      a = this.value,
      b = n.value;
    if (n.isSmall) {
      return a == b ? 0 : a > b ? 1 : -1;
    }
    if (a < 0 !== n.sign) {
      return a < 0 ? -1 : 1;
    }
    return a < 0 ? 1 : -1;
  };
  SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;
  NativeBigInt.prototype.compare = function (v) {
    if (v === Infinity) {
      return -1;
    }
    if (v === -Infinity) {
      return 1;
    }
    var a = this.value;
    var b = parseValue(v).value;
    return a === b ? 0 : a > b ? 1 : -1;
  };
  NativeBigInt.prototype.compareTo = NativeBigInt.prototype.compare;
  BigInteger.prototype.equals = function (v) {
    return this.compare(v) === 0;
  };
  NativeBigInt.prototype.eq = NativeBigInt.prototype.equals = SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger.prototype.eq = BigInteger.prototype.equals;
  BigInteger.prototype.notEquals = function (v) {
    return this.compare(v) !== 0;
  };
  NativeBigInt.prototype.neq = NativeBigInt.prototype.notEquals = SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger.prototype.neq = BigInteger.prototype.notEquals;
  BigInteger.prototype.greater = function (v) {
    return this.compare(v) > 0;
  };
  NativeBigInt.prototype.gt = NativeBigInt.prototype.greater = SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger.prototype.gt = BigInteger.prototype.greater;
  BigInteger.prototype.lesser = function (v) {
    return this.compare(v) < 0;
  };
  NativeBigInt.prototype.lt = NativeBigInt.prototype.lesser = SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger.prototype.lt = BigInteger.prototype.lesser;
  BigInteger.prototype.greaterOrEquals = function (v) {
    return this.compare(v) >= 0;
  };
  NativeBigInt.prototype.geq = NativeBigInt.prototype.greaterOrEquals = SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger.prototype.geq = BigInteger.prototype.greaterOrEquals;
  BigInteger.prototype.lesserOrEquals = function (v) {
    return this.compare(v) <= 0;
  };
  NativeBigInt.prototype.leq = NativeBigInt.prototype.lesserOrEquals = SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger.prototype.leq = BigInteger.prototype.lesserOrEquals;
  BigInteger.prototype.isEven = function () {
    return (this.value[0] & 1) === 0;
  };
  SmallInteger.prototype.isEven = function () {
    return (this.value & 1) === 0;
  };
  NativeBigInt.prototype.isEven = function () {
    return (this.value & BigInt(1)) === BigInt(0);
  };
  BigInteger.prototype.isOdd = function () {
    return (this.value[0] & 1) === 1;
  };
  SmallInteger.prototype.isOdd = function () {
    return (this.value & 1) === 1;
  };
  NativeBigInt.prototype.isOdd = function () {
    return (this.value & BigInt(1)) === BigInt(1);
  };
  BigInteger.prototype.isPositive = function () {
    return !this.sign;
  };
  SmallInteger.prototype.isPositive = function () {
    return this.value > 0;
  };
  NativeBigInt.prototype.isPositive = SmallInteger.prototype.isPositive;
  BigInteger.prototype.isNegative = function () {
    return this.sign;
  };
  SmallInteger.prototype.isNegative = function () {
    return this.value < 0;
  };
  NativeBigInt.prototype.isNegative = SmallInteger.prototype.isNegative;
  BigInteger.prototype.isUnit = function () {
    return false;
  };
  SmallInteger.prototype.isUnit = function () {
    return Math.abs(this.value) === 1;
  };
  NativeBigInt.prototype.isUnit = function () {
    return this.abs().value === BigInt(1);
  };
  BigInteger.prototype.isZero = function () {
    return false;
  };
  SmallInteger.prototype.isZero = function () {
    return this.value === 0;
  };
  NativeBigInt.prototype.isZero = function () {
    return this.value === BigInt(0);
  };
  BigInteger.prototype.isDivisibleBy = function (v) {
    var n = parseValue(v);
    if (n.isZero()) return false;
    if (n.isUnit()) return true;
    if (n.compareAbs(2) === 0) return this.isEven();
    return this.mod(n).isZero();
  };
  NativeBigInt.prototype.isDivisibleBy = SmallInteger.prototype.isDivisibleBy = BigInteger.prototype.isDivisibleBy;
  function isBasicPrime(v) {
    var n = v.abs();
    if (n.isUnit()) return false;
    if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
    if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
    if (n.lesser(49)) return true;
  }
  function millerRabinTest(n, a) {
    var nPrev = n.prev(),
      b = nPrev,
      r = 0,
      d,
      t,
      i,
      x;
    while (b.isEven()) b = b.divide(2), r++;
    next: for (i = 0; i < a.length; i++) {
      if (n.lesser(a[i])) continue;
      x = bigInt(a[i]).modPow(b, n);
      if (x.isUnit() || x.equals(nPrev)) continue;
      for (d = r - 1; d != 0; d--) {
        x = x.square().mod(n);
        if (x.isUnit()) return false;
        if (x.equals(nPrev)) continue next;
      }
      return false;
    }
    return true;
  }
  BigInteger.prototype.isPrime = function (strict) {
    var isPrime = isBasicPrime(this);
    if (isPrime !== undefined) return isPrime;
    var n = this.abs();
    var bits = n.bitLength();
    if (bits <= 64) return millerRabinTest(n, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
    var logN = Math.log(2) * bits.toJSNumber();
    var t = Math.ceil(strict === true ? 2 * Math.pow(logN, 2) : logN);
    for (var a = [], i = 0; i < t; i++) {
      a.push(bigInt(i + 2));
    }
    return millerRabinTest(n, a);
  };
  NativeBigInt.prototype.isPrime = SmallInteger.prototype.isPrime = BigInteger.prototype.isPrime;
  BigInteger.prototype.isProbablePrime = function (iterations) {
    var isPrime = isBasicPrime(this);
    if (isPrime !== undefined) return isPrime;
    var n = this.abs();
    var t = iterations === undefined ? 5 : iterations;
    for (var a = [], i = 0; i < t; i++) {
      a.push(bigInt.randBetween(2, n.minus(2)));
    }
    return millerRabinTest(n, a);
  };
  NativeBigInt.prototype.isProbablePrime = SmallInteger.prototype.isProbablePrime = BigInteger.prototype.isProbablePrime;
  BigInteger.prototype.modInv = function (n) {
    var t = bigInt.zero,
      newT = bigInt.one,
      r = parseValue(n),
      newR = this.abs(),
      q,
      lastT,
      lastR;
    while (!newR.isZero()) {
      q = r.divide(newR);
      lastT = t;
      lastR = r;
      t = newT;
      r = newR;
      newT = lastT.subtract(q.multiply(newT));
      newR = lastR.subtract(q.multiply(newR));
    }
    if (!r.isUnit()) throw new Error(this.toString() + ' and ' + n.toString() + ' are not co-prime');
    if (t.compare(0) === -1) {
      t = t.add(n);
    }
    if (this.isNegative()) {
      return t.negate();
    }
    return t;
  };
  NativeBigInt.prototype.modInv = SmallInteger.prototype.modInv = BigInteger.prototype.modInv;
  BigInteger.prototype.next = function () {
    var value = this.value;
    if (this.sign) {
      return subtractSmall(value, 1, this.sign);
    }
    return new BigInteger(addSmall(value, 1), this.sign);
  };
  SmallInteger.prototype.next = function () {
    var value = this.value;
    if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
    return new BigInteger(MAX_INT_ARR, false);
  };
  NativeBigInt.prototype.next = function () {
    return new NativeBigInt(this.value + BigInt(1));
  };
  BigInteger.prototype.prev = function () {
    var value = this.value;
    if (this.sign) {
      return new BigInteger(addSmall(value, 1), true);
    }
    return subtractSmall(value, 1, this.sign);
  };
  SmallInteger.prototype.prev = function () {
    var value = this.value;
    if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
    return new BigInteger(MAX_INT_ARR, true);
  };
  NativeBigInt.prototype.prev = function () {
    return new NativeBigInt(this.value - BigInt(1));
  };
  var powersOfTwo = [1];
  while (2 * powersOfTwo[powersOfTwo.length - 1] <= BASE) powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
  var powers2Length = powersOfTwo.length,
    highestPower2 = powersOfTwo[powers2Length - 1];
  function shift_isSmall(n) {
    return Math.abs(n) <= BASE;
  }
  BigInteger.prototype.shiftLeft = function (v) {
    var n = parseValue(v).toJSNumber();
    if (!shift_isSmall(n)) {
      throw new Error(String(n) + ' is too large for shifting.');
    }
    if (n < 0) return this.shiftRight(-n);
    var result = this;
    if (result.isZero()) return result;
    while (n >= powers2Length) {
      result = result.multiply(highestPower2);
      n -= powers2Length - 1;
    }
    return result.multiply(powersOfTwo[n]);
  };
  NativeBigInt.prototype.shiftLeft = SmallInteger.prototype.shiftLeft = BigInteger.prototype.shiftLeft;
  BigInteger.prototype.shiftRight = function (v) {
    var remQuo;
    var n = parseValue(v).toJSNumber();
    if (!shift_isSmall(n)) {
      throw new Error(String(n) + ' is too large for shifting.');
    }
    if (n < 0) return this.shiftLeft(-n);
    var result = this;
    while (n >= powers2Length) {
      if (result.isZero() || result.isNegative() && result.isUnit()) return result;
      remQuo = divModAny(result, highestPower2);
      result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
      n -= powers2Length - 1;
    }
    remQuo = divModAny(result, powersOfTwo[n]);
    return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
  };
  NativeBigInt.prototype.shiftRight = SmallInteger.prototype.shiftRight = BigInteger.prototype.shiftRight;
  function bitwise(x, y, fn) {
    y = parseValue(y);
    var xSign = x.isNegative(),
      ySign = y.isNegative();
    var xRem = xSign ? x.not() : x,
      yRem = ySign ? y.not() : y;
    var xDigit = 0,
      yDigit = 0;
    var xDivMod = null,
      yDivMod = null;
    var result = [];
    while (!xRem.isZero() || !yRem.isZero()) {
      xDivMod = divModAny(xRem, highestPower2);
      xDigit = xDivMod[1].toJSNumber();
      if (xSign) {
        xDigit = highestPower2 - 1 - xDigit;
      }
      yDivMod = divModAny(yRem, highestPower2);
      yDigit = yDivMod[1].toJSNumber();
      if (ySign) {
        yDigit = highestPower2 - 1 - yDigit;
      }
      xRem = xDivMod[0];
      yRem = yDivMod[0];
      result.push(fn(xDigit, yDigit));
    }
    var sum = fn(xSign ? 1 : 0, ySign ? 1 : 0) !== 0 ? bigInt(-1) : bigInt(0);
    for (var i = result.length - 1; i >= 0; i -= 1) {
      sum = sum.multiply(highestPower2).add(bigInt(result[i]));
    }
    return sum;
  }
  BigInteger.prototype.not = function () {
    return this.negate().prev();
  };
  NativeBigInt.prototype.not = SmallInteger.prototype.not = BigInteger.prototype.not;
  BigInteger.prototype.and = function (n) {
    return bitwise(this, n, function (a, b) {
      return a & b;
    });
  };
  NativeBigInt.prototype.and = SmallInteger.prototype.and = BigInteger.prototype.and;
  BigInteger.prototype.or = function (n) {
    return bitwise(this, n, function (a, b) {
      return a | b;
    });
  };
  NativeBigInt.prototype.or = SmallInteger.prototype.or = BigInteger.prototype.or;
  BigInteger.prototype.xor = function (n) {
    return bitwise(this, n, function (a, b) {
      return a ^ b;
    });
  };
  NativeBigInt.prototype.xor = SmallInteger.prototype.xor = BigInteger.prototype.xor;
  var LOBMASK_I = 1 << 30,
    LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
  function roughLOB(n) {
    var v = n.value,
      x = typeof v === 'number' ? v | LOBMASK_I : typeof v === 'bigint' ? v | BigInt(LOBMASK_I) : v[0] + v[1] * BASE | LOBMASK_BI;
    return x & -x;
  }
  function integerLogarithm(value, base) {
    if (base.compareTo(value) <= 0) {
      var tmp = integerLogarithm(value, base.square(base));
      var p = tmp.p;
      var e = tmp.e;
      var t = p.multiply(base);
      return t.compareTo(value) <= 0 ? {
        p: t,
        e: e * 2 + 1
      } : {
        p: p,
        e: e * 2
      };
    }
    return {
      p: bigInt(1),
      e: 0
    };
  }
  BigInteger.prototype.bitLength = function () {
    var n = this;
    if (n.compareTo(bigInt(0)) < 0) {
      n = n.negate().subtract(bigInt(1));
    }
    if (n.compareTo(bigInt(0)) === 0) {
      return bigInt(0);
    }
    return bigInt(integerLogarithm(n, bigInt(2)).e).add(bigInt(1));
  };
  NativeBigInt.prototype.bitLength = SmallInteger.prototype.bitLength = BigInteger.prototype.bitLength;
  function max(a, b) {
    a = parseValue(a);
    b = parseValue(b);
    return a.greater(b) ? a : b;
  }
  function min(a, b) {
    a = parseValue(a);
    b = parseValue(b);
    return a.lesser(b) ? a : b;
  }
  function gcd(a, b) {
    a = parseValue(a).abs();
    b = parseValue(b).abs();
    if (a.equals(b)) return a;
    if (a.isZero()) return b;
    if (b.isZero()) return a;
    var c = Integer[1],
      d,
      t;
    while (a.isEven() && b.isEven()) {
      d = min(roughLOB(a), roughLOB(b));
      a = a.divide(d);
      b = b.divide(d);
      c = c.multiply(d);
    }
    while (a.isEven()) {
      a = a.divide(roughLOB(a));
    }
    do {
      while (b.isEven()) {
        b = b.divide(roughLOB(b));
      }
      if (a.greater(b)) {
        t = b;
        b = a;
        a = t;
      }
      b = b.subtract(a);
    } while (!b.isZero());
    return c.isUnit() ? a : a.multiply(c);
  }
  function lcm(a, b) {
    a = parseValue(a).abs();
    b = parseValue(b).abs();
    return a.divide(gcd(a, b)).multiply(b);
  }
  function randBetween(a, b) {
    a = parseValue(a);
    b = parseValue(b);
    var low = min(a, b),
      high = max(a, b);
    var range = high.subtract(low).add(1);
    if (range.isSmall) return low.add(Math.floor(Math.random() * range));
    var digits = toBase(range, BASE).value;
    var result = [],
      restricted = true;
    for (var i = 0; i < digits.length; i++) {
      var top = restricted ? digits[i] : BASE;
      var digit = truncate(Math.random() * top);
      result.push(digit);
      if (digit < top) restricted = false;
    }
    return low.add(Integer.fromArray(result, BASE, false));
  }
  var parseBase = function (text, base, alphabet, caseSensitive) {
    alphabet = alphabet || DEFAULT_ALPHABET;
    text = String(text);
    if (!caseSensitive) {
      text = text.toLowerCase();
      alphabet = alphabet.toLowerCase();
    }
    var length = text.length;
    var i;
    var absBase = Math.abs(base);
    var alphabetValues = {};
    for (i = 0; i < alphabet.length; i++) {
      alphabetValues[alphabet[i]] = i;
    }
    for (i = 0; i < length; i++) {
      var c = text[i];
      if (c === '-') continue;
      if (c in alphabetValues) {
        if (alphabetValues[c] >= absBase) {
          if (c === '1' && absBase === 1) continue;
          throw new Error(c + ' is not a valid digit in base ' + base + '.');
        }
      }
    }
    base = parseValue(base);
    var digits = [];
    var isNegative = text[0] === '-';
    for (i = isNegative ? 1 : 0; i < text.length; i++) {
      var c = text[i];
      if (c in alphabetValues) digits.push(parseValue(alphabetValues[c]));else if (c === '<') {
        var start = i;
        do {
          i++;
        } while (text[i] !== '>' && i < text.length);
        digits.push(parseValue(text.slice(start + 1, i)));
      } else throw new Error(c + ' is not a valid character');
    }
    return parseBaseFromArray(digits, base, isNegative);
  };
  function parseBaseFromArray(digits, base, isNegative) {
    var val = Integer[0],
      pow = Integer[1],
      i;
    for (i = digits.length - 1; i >= 0; i--) {
      val = val.add(digits[i].times(pow));
      pow = pow.times(base);
    }
    return isNegative ? val.negate() : val;
  }
  function stringify(digit, alphabet) {
    alphabet = alphabet || DEFAULT_ALPHABET;
    if (digit < alphabet.length) {
      return alphabet[digit];
    }
    return '<' + digit + '>';
  }
  function toBase(n, base) {
    base = bigInt(base);
    if (base.isZero()) {
      if (n.isZero()) return {
        value: [0],
        isNegative: false
      };
      throw new Error('Cannot convert nonzero numbers to base 0.');
    }
    if (base.equals(-1)) {
      if (n.isZero()) return {
        value: [0],
        isNegative: false
      };
      if (n.isNegative()) return {
        value: [].concat.apply([], Array.apply(null, Array(-n.toJSNumber())).map(Array.prototype.valueOf, [1, 0])),
        isNegative: false
      };
      var arr = Array.apply(null, Array(n.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
      arr.unshift([1]);
      return {
        value: [].concat.apply([], arr),
        isNegative: false
      };
    }
    var neg = false;
    if (n.isNegative() && base.isPositive()) {
      neg = true;
      n = n.abs();
    }
    if (base.isUnit()) {
      if (n.isZero()) return {
        value: [0],
        isNegative: false
      };
      return {
        value: Array.apply(null, Array(n.toJSNumber())).map(Number.prototype.valueOf, 1),
        isNegative: neg
      };
    }
    var out = [];
    var left = n,
      divmod;
    while (left.isNegative() || left.compareAbs(base) >= 0) {
      divmod = left.divmod(base);
      left = divmod.quotient;
      var digit = divmod.remainder;
      if (digit.isNegative()) {
        digit = base.minus(digit).abs();
        left = left.next();
      }
      out.push(digit.toJSNumber());
    }
    out.push(left.toJSNumber());
    return {
      value: out.reverse(),
      isNegative: neg
    };
  }
  function toBaseString(n, base, alphabet) {
    var arr = toBase(n, base);
    return (arr.isNegative ? '-' : '') + arr.value.map(function (x) {
      return stringify(x, alphabet);
    }).join('');
  }
  BigInteger.prototype.toArray = function (radix) {
    return toBase(this, radix);
  };
  SmallInteger.prototype.toArray = function (radix) {
    return toBase(this, radix);
  };
  NativeBigInt.prototype.toArray = function (radix) {
    return toBase(this, radix);
  };
  BigInteger.prototype.toString = function (radix, alphabet) {
    if (radix === undefined) radix = 10;
    if (radix !== 10) return toBaseString(this, radix, alphabet);
    var v = this.value,
      l = v.length,
      str = String(v[--l]),
      zeros = '0000000',
      digit;
    while (--l >= 0) {
      digit = String(v[l]);
      str += zeros.slice(digit.length) + digit;
    }
    var sign = this.sign ? '-' : '';
    return sign + str;
  };
  SmallInteger.prototype.toString = function (radix, alphabet) {
    if (radix === undefined) radix = 10;
    if (radix != 10) return toBaseString(this, radix, alphabet);
    return String(this.value);
  };
  NativeBigInt.prototype.toString = SmallInteger.prototype.toString;
  NativeBigInt.prototype.toJSON = BigInteger.prototype.toJSON = SmallInteger.prototype.toJSON = function () {
    return this.toString();
  };
  BigInteger.prototype.valueOf = function () {
    return parseInt(this.toString(), 10);
  };
  BigInteger.prototype.toJSNumber = BigInteger.prototype.valueOf;
  SmallInteger.prototype.valueOf = function () {
    return this.value;
  };
  SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;
  NativeBigInt.prototype.valueOf = NativeBigInt.prototype.toJSNumber = function () {
    return parseInt(this.toString(), 10);
  };
  function parseStringValue(v) {
    if (isPrecise(+v)) {
      var x = +v;
      if (x === truncate(x)) return supportsNativeBigInt ? new NativeBigInt(BigInt(x)) : new SmallInteger(x);
      throw new Error('Invalid integer: ' + v);
    }
    var sign = v[0] === '-';
    if (sign) v = v.slice(1);
    var split = v.split(/e/i);
    if (split.length > 2) throw new Error('Invalid integer: ' + split.join('e'));
    if (split.length === 2) {
      var exp = split[1];
      if (exp[0] === '+') exp = exp.slice(1);
      exp = +exp;
      if (exp !== truncate(exp) || !isPrecise(exp)) throw new Error('Invalid integer: ' + exp + ' is not a valid exponent.');
      var text = split[0];
      var decimalPlace = text.indexOf('.');
      if (decimalPlace >= 0) {
        exp -= text.length - decimalPlace - 1;
        text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
      }
      if (exp < 0) throw new Error('Cannot include negative exponent part for integers');
      text += new Array(exp + 1).join('0');
      v = text;
    }
    var isValid = /^([0-9][0-9]*)$/.test(v);
    if (!isValid) throw new Error('Invalid integer: ' + v);
    if (supportsNativeBigInt) {
      return new NativeBigInt(BigInt(sign ? '-' + v : v));
    }
    var r = [],
      max = v.length,
      l = LOG_BASE,
      min = max - l;
    while (max > 0) {
      r.push(+v.slice(min, max));
      min -= l;
      if (min < 0) min = 0;
      max -= l;
    }
    trim(r);
    return new BigInteger(r, sign);
  }
  function parseNumberValue(v) {
    if (supportsNativeBigInt) {
      return new NativeBigInt(BigInt(v));
    }
    if (isPrecise(v)) {
      if (v !== truncate(v)) throw new Error(v + ' is not an integer.');
      return new SmallInteger(v);
    }
    return parseStringValue(v.toString());
  }
  function parseValue(v) {
    if (typeof v === 'number') {
      return parseNumberValue(v);
    }
    if (typeof v === 'string') {
      return parseStringValue(v);
    }
    if (typeof v === 'bigint') {
      return new NativeBigInt(v);
    }
    return v;
  }
  for (var i = 0; i < 1e3; i++) {
    Integer[i] = parseValue(i);
    if (i > 0) Integer[-i] = parseValue(-i);
  }
  Integer.one = Integer[1];
  Integer.zero = Integer[0];
  Integer.minusOne = Integer[-1];
  Integer.max = max;
  Integer.min = min;
  Integer.gcd = gcd;
  Integer.lcm = lcm;
  Integer.isInstance = function (x) {
    return x instanceof BigInteger || x instanceof SmallInteger || x instanceof NativeBigInt;
  };
  Integer.randBetween = randBetween;
  Integer.fromArray = function (digits, base, isNegative) {
    return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
  };
  return Integer;
}();
if (typeof define === 'function' && define.amd) {
  define('big-integer', [], function () {
    return bigInt;
  });
}
/* harmony default export */ __webpack_exports__["default"] = (bigInt);

/***/ }),

/***/ "./src/core/FactoryMaker.js":
/*!**********************************!*\
  !*** ./src/core/FactoryMaker.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @module FactoryMaker
 * @ignore
 */
const FactoryMaker = function () {
  let instance;
  let singletonContexts = [];
  const singletonFactories = {};
  const classFactories = {};
  function extend(name, childInstance, override, context) {
    if (!context[name] && childInstance) {
      context[name] = {
        instance: childInstance,
        override: override
      };
    }
  }

  /**
   * Use this method from your extended object.  this.factory is injected into your object.
   * this.factory.getSingletonInstance(this.context, 'VideoModel')
   * will return the video model for use in the extended object.
   *
   * @param {Object} context - injected into extended object as this.context
   * @param {string} className - string name found in all dash.js objects
   * with name __dashjs_factory_name Will be at the bottom. Will be the same as the object's name.
   * @returns {*} Context aware instance of specified singleton name.
   * @memberof module:FactoryMaker
   * @instance
   */
  function getSingletonInstance(context, className) {
    for (const i in singletonContexts) {
      const obj = singletonContexts[i];
      if (obj.context === context && obj.name === className) {
        return obj.instance;
      }
    }
    return null;
  }

  /**
   * Use this method to add an singleton instance to the system.  Useful for unit testing to mock objects etc.
   *
   * @param {Object} context
   * @param {string} className
   * @param {Object} instance
   * @memberof module:FactoryMaker
   * @instance
   */
  function setSingletonInstance(context, className, instance) {
    for (const i in singletonContexts) {
      const obj = singletonContexts[i];
      if (obj.context === context && obj.name === className) {
        singletonContexts[i].instance = instance;
        return;
      }
    }
    singletonContexts.push({
      name: className,
      context: context,
      instance: instance
    });
  }

  /**
   * Use this method to remove all singleton instances associated with a particular context.
   *
   * @param {Object} context
   * @memberof module:FactoryMaker
   * @instance
   */
  function deleteSingletonInstances(context) {
    singletonContexts = singletonContexts.filter(x => x.context !== context);
  }

  /*------------------------------------------------------------------------------------------*/

  // Factories storage Management

  /*------------------------------------------------------------------------------------------*/

  function getFactoryByName(name, factoriesArray) {
    return factoriesArray[name];
  }
  function updateFactory(name, factory, factoriesArray) {
    if (name in factoriesArray) {
      factoriesArray[name] = factory;
    }
  }

  /*------------------------------------------------------------------------------------------*/

  // Class Factories Management

  /*------------------------------------------------------------------------------------------*/

  function updateClassFactory(name, factory) {
    updateFactory(name, factory, classFactories);
  }
  function getClassFactoryByName(name) {
    return getFactoryByName(name, classFactories);
  }
  function getClassFactory(classConstructor) {
    let factory = getFactoryByName(classConstructor.__dashjs_factory_name, classFactories);
    if (!factory) {
      factory = function (context) {
        if (context === undefined) {
          context = {};
        }
        return {
          create: function () {
            return merge(classConstructor, context, arguments);
          }
        };
      };
      classFactories[classConstructor.__dashjs_factory_name] = factory; // store factory
    }
    return factory;
  }

  /*------------------------------------------------------------------------------------------*/

  // Singleton Factory MAangement

  /*------------------------------------------------------------------------------------------*/

  function updateSingletonFactory(name, factory) {
    updateFactory(name, factory, singletonFactories);
  }
  function getSingletonFactoryByName(name) {
    return getFactoryByName(name, singletonFactories);
  }
  function getSingletonFactory(classConstructor) {
    let factory = getFactoryByName(classConstructor.__dashjs_factory_name, singletonFactories);
    if (!factory) {
      factory = function (context) {
        let instance;
        if (context === undefined) {
          context = {};
        }
        return {
          getInstance: function () {
            // If we don't have an instance yet check for one on the context
            if (!instance) {
              instance = getSingletonInstance(context, classConstructor.__dashjs_factory_name);
            }
            // If there's no instance on the context then create one
            if (!instance) {
              instance = merge(classConstructor, context, arguments);
              singletonContexts.push({
                name: classConstructor.__dashjs_factory_name,
                context: context,
                instance: instance
              });
            }
            return instance;
          }
        };
      };
      singletonFactories[classConstructor.__dashjs_factory_name] = factory; // store factory
    }
    return factory;
  }
  function merge(classConstructor, context, args) {
    let classInstance;
    const className = classConstructor.__dashjs_factory_name;
    const extensionObject = context[className];
    if (extensionObject) {
      let extension = extensionObject.instance;
      if (extensionObject.override) {
        //Override public methods in parent but keep parent.

        classInstance = classConstructor.apply({
          context
        }, args);
        extension = extension.apply({
          context,
          factory: instance,
          parent: classInstance
        }, args);
        for (const prop in extension) {
          if (classInstance.hasOwnProperty(prop)) {
            classInstance[prop] = extension[prop];
          }
        }
      } else {
        //replace parent object completely with new object. Same as dijon.

        return extension.apply({
          context,
          factory: instance
        }, args);
      }
    } else {
      // Create new instance of the class
      classInstance = classConstructor.apply({
        context
      }, args);
    }

    // Add getClassName function to class instance prototype (used by Debug)
    classInstance.getClassName = function () {
      return className;
    };
    return classInstance;
  }
  instance = {
    extend: extend,
    getSingletonInstance: getSingletonInstance,
    setSingletonInstance: setSingletonInstance,
    deleteSingletonInstances: deleteSingletonInstances,
    getSingletonFactory: getSingletonFactory,
    getSingletonFactoryByName: getSingletonFactoryByName,
    updateSingletonFactory: updateSingletonFactory,
    getClassFactory: getClassFactory,
    getClassFactoryByName: getClassFactoryByName,
    updateClassFactory: updateClassFactory
  };
  return instance;
}();
/* harmony default export */ __webpack_exports__["default"] = (FactoryMaker);

/***/ }),

/***/ "./src/core/errors/ErrorsBase.js":
/*!***************************************!*\
  !*** ./src/core/errors/ErrorsBase.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class ErrorsBase {
  extend(errors, config) {
    if (!errors) {
      return;
    }
    let override = config ? config.override : false;
    let publicOnly = config ? config.publicOnly : false;
    for (const err in errors) {
      if (!errors.hasOwnProperty(err) || this[err] && !override) {
        continue;
      }
      if (publicOnly && errors[err].indexOf('public_') === -1) {
        continue;
      }
      this[err] = errors[err];
    }
  }
}
/* harmony default export */ __webpack_exports__["default"] = (ErrorsBase);

/***/ }),

/***/ "./src/core/events/EventsBase.js":
/*!***************************************!*\
  !*** ./src/core/events/EventsBase.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class EventsBase {
  extend(events, config) {
    if (!events) {
      return;
    }
    let override = config ? config.override : false;
    let publicOnly = config ? config.publicOnly : false;
    for (const evt in events) {
      if (!events.hasOwnProperty(evt) || this[evt] && !override) {
        continue;
      }
      if (publicOnly && events[evt].indexOf('public_') === -1) {
        continue;
      }
      this[evt] = events[evt];
    }
  }
}
/* harmony default export */ __webpack_exports__["default"] = (EventsBase);

/***/ }),

/***/ "./src/mss/MssFragmentInfoController.js":
/*!**********************************************!*\
  !*** ./src/mss/MssFragmentInfoController.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _streaming_vo_FragmentRequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../streaming/vo/FragmentRequest.js */ "./src/streaming/vo/FragmentRequest.js");
/* harmony import */ var _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../streaming/vo/metrics/HTTPRequest.js */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */




function MssFragmentInfoController(config) {
  config = config || {};
  let instance, logger, fragmentModel, started, type, loadFragmentTimeout, startTime, startFragmentTime, index;
  const streamProcessor = config.streamProcessor;
  const baseURLController = config.baseURLController;
  const debug = config.debug;
  const controllerType = 'MssFragmentInfoController';
  function setup() {
    logger = debug.getLogger(instance);
  }
  function initialize() {
    type = streamProcessor.getType();
    fragmentModel = streamProcessor.getFragmentModel();
    started = false;
    startTime = null;
    startFragmentTime = null;
  }
  function start() {
    if (started) {
      return;
    }
    logger.debug('Start');
    started = true;
    index = 0;
    loadNextFragmentInfo();
  }
  function stop() {
    if (!started) {
      return;
    }
    logger.debug('Stop');
    clearTimeout(loadFragmentTimeout);
    started = false;
    startTime = null;
    startFragmentTime = null;
  }
  function reset() {
    stop();
  }
  function loadNextFragmentInfo() {
    if (!started) {
      return;
    }

    // Get last segment from SegmentTimeline
    const representation = getCurrentRepresentation();
    const manifest = representation.adaptation.period.mpd.manifest;
    const adaptation = manifest.Period[representation.adaptation.period.index].AdaptationSet[representation.adaptation.index];
    const segments = adaptation.SegmentTemplate.SegmentTimeline.S;
    const segment = segments[segments.length - 1];

    // logger.debug('Last fragment time: ' + (segment.t / adaptation.SegmentTemplate.timescale));

    // Generate segment request
    const request = getRequestForSegment(adaptation, representation, segment);

    // Send segment request
    requestFragment.call(this, request);
  }
  function getRequestForSegment(adaptation, representation, segment) {
    let timescale = adaptation.SegmentTemplate.timescale;
    let request = new _streaming_vo_FragmentRequest_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    request.mediaType = type;
    request.type = _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_1__.HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE;
    // request.range = segment.mediaRange;
    request.startTime = segment.t / timescale;
    request.duration = segment.d / timescale;
    request.timescale = timescale;
    // request.availabilityStartTime = segment.availabilityStartTime;
    // request.availabilityEndTime = segment.availabilityEndTime;
    // request.wallStartTime = segment.wallStartTime;
    request.bandwidth = representation.bandwidth;
    request.index = index++;
    request.adaptationIndex = representation.adaptation.index;
    request.representation = representation;
    request.url = baseURLController.resolve(representation.path).url + adaptation.SegmentTemplate.media;
    request.url = request.url.replace('$Bandwidth$', representation.bandwidth);
    request.url = request.url.replace('$Time$', segment.tManifest ? segment.tManifest : segment.t);
    request.url = request.url.replace('/Fragments(', '/FragmentInfo(');
    return request;
  }
  function getCurrentRepresentation() {
    const representationController = streamProcessor.getRepresentationController();
    const representation = representationController.getCurrentRepresentation();
    return representation;
  }
  function requestFragment(request) {
    // logger.debug('Load FragmentInfo for time: ' + request.startTime);
    if (streamProcessor.getFragmentModel().isFragmentLoadedOrPending(request)) {
      // We may have reached end of timeline in case of start-over streams
      logger.debug('End of timeline');
      stop();
      return;
    }
    fragmentModel.executeRequest(request);
  }
  function fragmentInfoLoaded(e) {
    if (!started) {
      return;
    }
    const request = e.request;
    if (!e.response) {
      logger.error('Load error', request.url);
      return;
    }
    let deltaFragmentTime, deltaTime, delay;

    // logger.debug('FragmentInfo loaded: ', request.url);

    if (startTime === null) {
      startTime = new Date().getTime();
    }
    if (!startFragmentTime) {
      startFragmentTime = request.startTime;
    }

    // Determine delay before requesting next FragmentInfo
    deltaTime = (new Date().getTime() - startTime) / 1000;
    deltaFragmentTime = request.startTime + request.duration - startFragmentTime;
    delay = Math.max(0, deltaFragmentTime - deltaTime);

    // Set timeout for requesting next FragmentInfo
    clearTimeout(loadFragmentTimeout);
    loadFragmentTimeout = setTimeout(function () {
      loadFragmentTimeout = null;
      loadNextFragmentInfo();
    }, delay * 1000);
  }
  function getType() {
    return type;
  }
  instance = {
    initialize: initialize,
    controllerType: controllerType,
    start: start,
    fragmentInfoLoaded: fragmentInfoLoaded,
    getType: getType,
    reset: reset
  };
  setup();
  return instance;
}
MssFragmentInfoController.__dashjs_factory_name = 'MssFragmentInfoController';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_2__["default"].getClassFactory(MssFragmentInfoController));

/***/ }),

/***/ "./src/mss/MssFragmentMoofProcessor.js":
/*!*********************************************!*\
  !*** ./src/mss/MssFragmentMoofProcessor.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _streaming_vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../streaming/vo/DashJSError.js */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors/MssErrors.js */ "./src/mss/errors/MssErrors.js");
/* harmony import */ var _streaming_MediaPlayerEvents_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../streaming/MediaPlayerEvents.js */ "./src/streaming/MediaPlayerEvents.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */





/**
 * @module MssFragmentMoofProcessor
 * @ignore
 * @param {Object} config object
 */
function MssFragmentMoofProcessor(config) {
  config = config || {};
  let instance, type, logger;
  const dashMetrics = config.dashMetrics;
  const playbackController = config.playbackController;
  const errorHandler = config.errHandler;
  const eventBus = config.eventBus;
  const ISOBoxer = config.ISOBoxer;
  const debug = config.debug;
  function setup() {
    logger = debug.getLogger(instance);
    type = '';
  }
  function processTfrf(request, tfrf, tfdt, streamProcessor) {
    const representationController = streamProcessor.getRepresentationController();
    const representation = representationController.getCurrentRepresentation();
    const manifest = representation.adaptation.period.mpd.manifest;
    const adaptation = manifest.Period[representation.adaptation.period.index].AdaptationSet[representation.adaptation.index];
    const timescale = adaptation.SegmentTemplate.timescale;
    type = streamProcessor.getType();

    // Process tfrf only for live streams or start-over static streams (timeShiftBufferDepth > 0)
    if (manifest.type !== 'dynamic' && !manifest.timeShiftBufferDepth) {
      return;
    }
    if (!tfrf) {
      errorHandler.error(new _streaming_vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_0__["default"](_errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_1__["default"].MSS_NO_TFRF_CODE, _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_1__["default"].MSS_NO_TFRF_MESSAGE));
      return;
    }

    // Get adaptation's segment timeline (always a SegmentTimeline in Smooth Streaming use case)
    const segments = adaptation.SegmentTemplate.SegmentTimeline.S;
    const entries = tfrf.entry;
    let entry, segmentTime, range;
    let segment = null;
    let t = 0;
    let endTime;
    let availabilityStartTime = null;
    if (entries.length === 0) {
      return;
    }

    // Consider only first tfrf entry (to avoid pre-condition failure on fragment info requests)
    entry = entries[0];

    // In case of start-over streams, check if we have reached end of original manifest duration (set in timeShiftBufferDepth)
    // => then do not update anymore timeline
    if (manifest.type === 'static') {
      // Get first segment time
      segmentTime = segments[0].tManifest ? parseFloat(segments[0].tManifest) : segments[0].t;
      if (entry.fragment_absolute_time > segmentTime + manifest.timeShiftBufferDepth * timescale) {
        return;
      }
    }

    // logger.debug('entry - t = ', (entry.fragment_absolute_time / timescale));

    // Get last segment time
    segmentTime = segments[segments.length - 1].tManifest ? parseFloat(segments[segments.length - 1].tManifest) : segments[segments.length - 1].t;
    // logger.debug('Last segment - t = ', (segmentTime / timescale));

    // Check if we have to append new segment to timeline
    if (entry.fragment_absolute_time <= segmentTime) {
      // Update DVR window range => set range end to end time of current segment
      range = {
        start: segments[0].t / timescale,
        end: tfdt.baseMediaDecodeTime / timescale + request.duration
      };
      updateDVR(request.mediaType, range, streamProcessor.getStreamInfo().manifestInfo);
      return;
    }

    // logger.debug('Add new segment - t = ', (entry.fragment_absolute_time / timescale));
    segment = {};
    segment.t = entry.fragment_absolute_time;
    segment.d = entry.fragment_duration;
    // If timestamps starts at 0 relative to 1st segment (dynamic to static) then update segment time
    if (segments[0].tManifest) {
      segment.t -= parseFloat(segments[0].tManifest) - segments[0].t;
      segment.tManifest = entry.fragment_absolute_time;
    }

    // Patch previous segment duration
    let lastSegment = segments[segments.length - 1];
    if (lastSegment.t + lastSegment.d !== segment.t) {
      logger.debug('Patch segment duration - t = ', lastSegment.t + ', d = ' + lastSegment.d + ' => ' + (segment.t - lastSegment.t));
      lastSegment.d = segment.t - lastSegment.t;
    }
    segments.push(segment);

    // In case of static start-over streams, update content duration
    if (manifest.type === 'static') {
      if (type === 'video') {
        segment = segments[segments.length - 1];
        endTime = (segment.t + segment.d) / timescale;
        if (endTime > representation.adaptation.period.duration) {
          eventBus.trigger(_streaming_MediaPlayerEvents_js__WEBPACK_IMPORTED_MODULE_2__["default"].MANIFEST_VALIDITY_CHANGED, {
            sender: this,
            newDuration: endTime
          });
        }
      }
      return;
    } else {
      // In case of live streams, update segment timeline according to DVR window
      if (manifest.timeShiftBufferDepth && manifest.timeShiftBufferDepth > 0) {
        // Get timestamp of the last segment
        segment = segments[segments.length - 1];
        t = segment.t;

        // Determine the segments' availability start time
        availabilityStartTime = (t - manifest.timeShiftBufferDepth * timescale) / timescale;

        // Remove segments prior to availability start time
        segment = segments[0];
        endTime = (segment.t + segment.d) / timescale;
        while (endTime < availabilityStartTime) {
          // Check if not currently playing the segment to be removed
          if (!playbackController.isPaused() && playbackController.getTime() < endTime) {
            break;
          }
          // logger.debug('Remove segment  - t = ' + (segment.t / timescale));
          segments.splice(0, 1);
          segment = segments[0];
          endTime = (segment.t + segment.d) / timescale;
        }
      }

      // Update DVR window range => set range end to end time of current segment
      range = {
        start: segments[0].t / timescale,
        end: tfdt.baseMediaDecodeTime / timescale + request.duration
      };
      updateDVR(type, range, streamProcessor.getStreamInfo().manifestInfo);
    }
  }
  function updateDVR(type, range, manifestInfo) {
    if (type !== 'video' && type !== 'audio') {
      return;
    }
    const dvrInfos = dashMetrics.getCurrentDVRInfo(type);
    if (!dvrInfos || range.end > dvrInfos.range.end) {
      logger.debug('Update DVR range: [' + range.start + ' - ' + range.end + ']');
      dashMetrics.addDVRInfo(type, playbackController.getTime(), manifestInfo, range);
      playbackController.updateCurrentTime(type);
    }
  }

  // This function returns the offset of the 1st byte of a child box within a container box
  function getBoxOffset(parent, type) {
    let offset = 8;
    let i = 0;
    for (i = 0; i < parent.boxes.length; i++) {
      if (parent.boxes[i].type === type) {
        return offset;
      }
      offset += parent.boxes[i].size;
    }
    return offset;
  }
  function convertFragment(e, streamProcessor) {
    let i;

    // e.request contains request description object
    // e.response contains fragment bytes
    const isoFile = ISOBoxer.parseBuffer(e.response);
    // Update track_Id in tfhd box
    const tfhd = isoFile.fetch('tfhd');
    tfhd.track_ID = e.request.representation.mediaInfo.index + 1;

    // Add tfdt box
    let tfdt = isoFile.fetch('tfdt');
    const traf = isoFile.fetch('traf');
    if (tfdt === null) {
      tfdt = ISOBoxer.createFullBox('tfdt', traf, tfhd);
      tfdt.version = 1;
      tfdt.flags = 0;
      tfdt.baseMediaDecodeTime = Math.floor(e.request.startTime * e.request.timescale);
    }
    const trun = isoFile.fetch('trun');

    // Process tfxd boxes
    // This box provide absolute timestamp but we take the segment start time for tfdt
    let tfxd = isoFile.fetch('tfxd');
    if (tfxd) {
      tfxd._parent.boxes.splice(tfxd._parent.boxes.indexOf(tfxd), 1);
      tfxd = null;
    }
    let tfrf = isoFile.fetch('tfrf');
    processTfrf(e.request, tfrf, tfdt, streamProcessor);
    if (tfrf) {
      tfrf._parent.boxes.splice(tfrf._parent.boxes.indexOf(tfrf), 1);
      tfrf = null;
    }

    // If protected content in PIFF1.1 format (sepiff box = Sample Encryption PIFF)
    // => convert sepiff box it into a senc box
    // => create saio and saiz boxes (if not already present)
    const sepiff = isoFile.fetch('sepiff');
    if (sepiff !== null) {
      sepiff.type = 'senc';
      sepiff.usertype = undefined;
      let saio = isoFile.fetch('saio');
      if (saio === null) {
        // Create Sample Auxiliary Information Offsets Box box (saio)
        saio = ISOBoxer.createFullBox('saio', traf);
        saio.version = 0;
        saio.flags = 0;
        saio.entry_count = 1;
        saio.offset = [0];
        const saiz = ISOBoxer.createFullBox('saiz', traf);
        saiz.version = 0;
        saiz.flags = 0;
        saiz.sample_count = sepiff.sample_count;
        saiz.default_sample_info_size = 0;
        saiz.sample_info_size = [];
        if (sepiff.flags & 0x02) {
          // Sub-sample encryption => set sample_info_size for each sample
          for (i = 0; i < sepiff.sample_count; i += 1) {
            // 10 = 8 (InitializationVector field size) + 2 (subsample_count field size)
            // 6 = 2 (BytesOfClearData field size) + 4 (BytesOfEncryptedData field size)
            saiz.sample_info_size[i] = 10 + 6 * sepiff.entry[i].NumberOfEntries;
          }
        } else {
          // No sub-sample encryption => set default sample_info_size = InitializationVector field size (8)
          saiz.default_sample_info_size = 8;
        }
      }
    }
    tfhd.flags &= 0xFFFFFE; // set tfhd.base-data-offset-present to false
    tfhd.flags |= 0x020000; // set tfhd.default-base-is-moof to true
    trun.flags |= 0x000001; // set trun.data-offset-present to true

    // Update trun.data_offset field that corresponds to first data byte (inside mdat box)
    const moof = isoFile.fetch('moof');
    let length = moof.getLength();
    trun.data_offset = length + 8;

    // Update saio box offset field according to new senc box offset
    let saio = isoFile.fetch('saio');
    if (saio !== null) {
      let trafPosInMoof = getBoxOffset(moof, 'traf');
      let sencPosInTraf = getBoxOffset(traf, 'senc');
      // Set offset from begin fragment to the first IV field in senc box
      saio.offset[0] = trafPosInMoof + sencPosInTraf + 16; // 16 = box header (12) + sample_count field size (4)
    }

    // Write transformed/processed fragment into request reponse data
    e.response = isoFile.write();
  }
  function updateSegmentList(e, streamProcessor) {
    // e.request contains request description object
    // e.response contains fragment bytes
    if (!e.response) {
      throw new Error('e.response parameter is missing');
    }
    const isoFile = ISOBoxer.parseBuffer(e.response);
    // Update track_Id in tfhd box
    const tfhd = isoFile.fetch('tfhd');
    tfhd.track_ID = e.request.representation.mediaInfo.index + 1;

    // Add tfdt box
    let tfdt = isoFile.fetch('tfdt');
    let traf = isoFile.fetch('traf');
    if (tfdt === null) {
      tfdt = ISOBoxer.createFullBox('tfdt', traf, tfhd);
      tfdt.version = 1;
      tfdt.flags = 0;
      tfdt.baseMediaDecodeTime = Math.floor(e.request.startTime * e.request.timescale);
    }
    let tfrf = isoFile.fetch('tfrf');
    processTfrf(e.request, tfrf, tfdt, streamProcessor);
    if (tfrf) {
      tfrf._parent.boxes.splice(tfrf._parent.boxes.indexOf(tfrf), 1);
      tfrf = null;
    }
  }
  function getType() {
    return type;
  }
  instance = {
    convertFragment,
    updateSegmentList,
    getType
  };
  setup();
  return instance;
}
MssFragmentMoofProcessor.__dashjs_factory_name = 'MssFragmentMoofProcessor';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__["default"].getClassFactory(MssFragmentMoofProcessor));

/***/ }),

/***/ "./src/mss/MssFragmentMoovProcessor.js":
/*!*********************************************!*\
  !*** ./src/mss/MssFragmentMoovProcessor.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors/MssErrors.js */ "./src/mss/errors/MssErrors.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * @module MssFragmentMoovProcessor
 * @ignore
 * @param {Object} config object
 */
function MssFragmentMoovProcessor(config) {
  config = config || {};
  const NALUTYPE_SPS = 7;
  const NALUTYPE_PPS = 8;
  const constants = config.constants;
  const ISOBoxer = config.ISOBoxer;
  let protectionController = config.protectionController;
  let instance, period, adaptationSet, representation, contentProtection, timescale, trackId;
  function createFtypBox(isoFile) {
    let ftyp = ISOBoxer.createBox('ftyp', isoFile);
    ftyp.major_brand = 'iso6';
    ftyp.minor_version = 1; // is an informative integer for the minor version of the major brand
    ftyp.compatible_brands = []; //is a list, to the end of the box, of brands isom, iso6 and msdh
    ftyp.compatible_brands[0] = 'isom'; // => decimal ASCII value for isom
    ftyp.compatible_brands[1] = 'iso6'; // => decimal ASCII value for iso6
    ftyp.compatible_brands[2] = 'msdh'; // => decimal ASCII value for msdh

    return ftyp;
  }
  function createMoovBox(isoFile) {
    // moov box
    let moov = ISOBoxer.createBox('moov', isoFile);

    // moov/mvhd
    createMvhdBox(moov);

    // moov/trak
    let trak = ISOBoxer.createBox('trak', moov);

    // moov/trak/tkhd
    createTkhdBox(trak);

    // moov/trak/mdia
    let mdia = ISOBoxer.createBox('mdia', trak);

    // moov/trak/mdia/mdhd
    createMdhdBox(mdia);

    // moov/trak/mdia/hdlr
    createHdlrBox(mdia);

    // moov/trak/mdia/minf
    let minf = ISOBoxer.createBox('minf', mdia);
    switch (adaptationSet.type) {
      case constants.VIDEO:
        // moov/trak/mdia/minf/vmhd
        createVmhdBox(minf);
        break;
      case constants.AUDIO:
        // moov/trak/mdia/minf/smhd
        createSmhdBox(minf);
        break;
      default:
        break;
    }

    // moov/trak/mdia/minf/dinf
    let dinf = ISOBoxer.createBox('dinf', minf);

    // moov/trak/mdia/minf/dinf/dref
    createDrefBox(dinf);

    // moov/trak/mdia/minf/stbl
    let stbl = ISOBoxer.createBox('stbl', minf);

    // Create empty stts, stsc, stco and stsz boxes
    // Use data field as for codem-isoboxer unknown boxes for setting fields value

    // moov/trak/mdia/minf/stbl/stts
    let stts = ISOBoxer.createFullBox('stts', stbl);
    stts._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

    // moov/trak/mdia/minf/stbl/stsc
    let stsc = ISOBoxer.createFullBox('stsc', stbl);
    stsc._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

    // moov/trak/mdia/minf/stbl/stco
    let stco = ISOBoxer.createFullBox('stco', stbl);
    stco._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

    // moov/trak/mdia/minf/stbl/stsz
    let stsz = ISOBoxer.createFullBox('stsz', stbl);
    stsz._data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, sample_size = 0, sample_count = 0

    // moov/trak/mdia/minf/stbl/stsd
    createStsdBox(stbl);

    // moov/mvex
    let mvex = ISOBoxer.createBox('mvex', moov);

    // moov/mvex/trex
    createTrexBox(mvex);
    if (contentProtection && protectionController) {
      let supportedKS = protectionController.getSupportedKeySystemMetadataFromContentProtection(contentProtection);
      createProtectionSystemSpecificHeaderBox(moov, supportedKS);
    }
  }
  function createMvhdBox(moov) {
    let mvhd = ISOBoxer.createFullBox('mvhd', moov);
    mvhd.version = 1; // version = 1  in order to have 64bits duration value

    mvhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
    mvhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
    mvhd.timescale = timescale; // the time-scale for the entire presentation => 10000000 for MSS
    mvhd.duration = period.duration === Infinity ? 0xFFFFFFFFFFFFFFFF : Math.round(period.duration * timescale); // the length of the presentation (in the indicated timescale) =>  take duration of period
    mvhd.rate = 1.0; // 16.16 number, '1.0' = normal playback
    mvhd.volume = 1.0; // 8.8 number, '1.0' = full volume
    mvhd.reserved1 = 0;
    mvhd.reserved2 = [0x0, 0x0];
    mvhd.matrix = [1, 0, 0,
    // provides a transformation matrix for the video;
    0, 1, 0,
    // (u,v,w) are restricted here to (0,0,1)
    0, 0, 16384];
    mvhd.pre_defined = [0, 0, 0, 0, 0, 0];
    mvhd.next_track_ID = trackId + 1; // indicates a value to use for the track ID of the next track to be added to this presentation

    return mvhd;
  }
  function createTkhdBox(trak) {
    let tkhd = ISOBoxer.createFullBox('tkhd', trak);
    tkhd.version = 1; // version = 1  in order to have 64bits duration value
    tkhd.flags = 0x1 |
    // Track_enabled (0x000001): Indicates that the track is enabled
    0x2 |
    // Track_in_movie (0x000002):  Indicates that the track is used in the presentation
    0x4; // Track_in_preview (0x000004):  Indicates that the track is used when previewing the presentation

    tkhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
    tkhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
    tkhd.track_ID = trackId; // uniquely identifies this track over the entire life-time of this presentation
    tkhd.reserved1 = 0;
    tkhd.duration = period.duration === Infinity ? 0xFFFFFFFFFFFFFFFF : Math.round(period.duration * timescale); // the duration of this track (in the timescale indicated in the Movie Header Box) =>  take duration of period
    tkhd.reserved2 = [0x0, 0x0];
    tkhd.layer = 0; // specifies the front-to-back ordering of video tracks; tracks with lower numbers are closer to the viewer => 0 since only one video track
    tkhd.alternate_group = 0; // specifies a group or collection of tracks => ignore
    tkhd.volume = 1.0; // '1.0' = full volume
    tkhd.reserved3 = 0;
    tkhd.matrix = [1, 0, 0,
    // provides a transformation matrix for the video;
    0, 1, 0,
    // (u,v,w) are restricted here to (0,0,1)
    0, 0, 16384];
    tkhd.width = representation.width; // visual presentation width
    tkhd.height = representation.height; // visual presentation height

    return tkhd;
  }
  function createMdhdBox(mdia) {
    let mdhd = ISOBoxer.createFullBox('mdhd', mdia);
    mdhd.version = 1; // version = 1  in order to have 64bits duration value

    mdhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
    mdhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
    mdhd.timescale = timescale; // the time-scale for the entire presentation
    mdhd.duration = period.duration === Infinity ? 0xFFFFFFFFFFFFFFFF : Math.round(period.duration * timescale); // the duration of this media (in the scale of the timescale). If the duration cannot be determined then duration is set to all 1s.
    mdhd.language = adaptationSet.lang || 'und'; // declares the language code for this media
    mdhd.pre_defined = 0;
    return mdhd;
  }
  function createHdlrBox(mdia) {
    let hdlr = ISOBoxer.createFullBox('hdlr', mdia);
    hdlr.pre_defined = 0;
    switch (adaptationSet.type) {
      case constants.VIDEO:
        hdlr.handler_type = 'vide';
        break;
      case constants.AUDIO:
        hdlr.handler_type = 'soun';
        break;
      default:
        hdlr.handler_type = 'meta';
        break;
    }
    hdlr.name = representation.id;
    hdlr.reserved = [0, 0, 0];
    return hdlr;
  }
  function createVmhdBox(minf) {
    let vmhd = ISOBoxer.createFullBox('vmhd', minf);
    vmhd.flags = 1;
    vmhd.graphicsmode = 0; // specifies a composition mode for this video track, from the following enumerated set, which may be extended by derived specifications: copy = 0 copy over the existing image
    vmhd.opcolor = [0, 0, 0]; // is a set of 3 colour values (red, green, blue) available for use by graphics modes

    return vmhd;
  }
  function createSmhdBox(minf) {
    let smhd = ISOBoxer.createFullBox('smhd', minf);
    smhd.flags = 1;
    smhd.balance = 0; // is a fixed-point 8.8 number that places mono audio tracks in a stereo space; 0 is centre (the normal value); full left is -1.0 and full right is 1.0.
    smhd.reserved = 0;
    return smhd;
  }
  function createDrefBox(dinf) {
    let dref = ISOBoxer.createFullBox('dref', dinf);
    dref.entry_count = 1;
    dref.entries = [];
    let url = ISOBoxer.createFullBox('url ', dref, false);
    url.location = '';
    url.flags = 1;
    dref.entries.push(url);
    return dref;
  }
  function createStsdBox(stbl) {
    let stsd = ISOBoxer.createFullBox('stsd', stbl);
    stsd.entries = [];
    switch (adaptationSet.type) {
      case constants.VIDEO:
      case constants.AUDIO:
        stsd.entries.push(createSampleEntry(stsd));
        break;
      default:
        break;
    }
    stsd.entry_count = stsd.entries.length; // is an integer that counts the actual entries
    return stsd;
  }
  function createSampleEntry(stsd) {
    let codec = representation.codecs.substring(0, representation.codecs.indexOf('.'));
    switch (codec) {
      case 'avc1':
        return createAVCVisualSampleEntry(stsd, codec);
      case 'mp4a':
        return createMP4AudioSampleEntry(stsd, codec);
      default:
        throw {
          code: _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_0__["default"].MSS_UNSUPPORTED_CODEC_CODE,
          message: _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_0__["default"].MSS_UNSUPPORTED_CODEC_MESSAGE,
          data: {
            codec: codec
          }
        };
    }
  }
  function createAVCVisualSampleEntry(stsd, codec) {
    let avc1;
    if (contentProtection) {
      avc1 = ISOBoxer.createBox('encv', stsd, false);
    } else {
      avc1 = ISOBoxer.createBox('avc1', stsd, false);
    }

    // SampleEntry fields
    avc1.reserved1 = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
    avc1.data_reference_index = 1;

    // VisualSampleEntry fields
    avc1.pre_defined1 = 0;
    avc1.reserved2 = 0;
    avc1.pre_defined2 = [0, 0, 0];
    avc1.height = representation.height;
    avc1.width = representation.width;
    avc1.horizresolution = 72; // 72 dpi
    avc1.vertresolution = 72; // 72 dpi
    avc1.reserved3 = 0;
    avc1.frame_count = 1; // 1 compressed video frame per sample
    avc1.compressorname = [0x0A, 0x41, 0x56, 0x43, 0x20, 0x43, 0x6F, 0x64,
    // = 'AVC Coding';
    0x69, 0x6E, 0x67, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    avc1.depth = 0x0018; // 0x0018 – images are in colour with no alpha.
    avc1.pre_defined3 = 65535;
    avc1.config = createAVC1ConfigurationRecord();
    if (contentProtection) {
      // Create and add Protection Scheme Info Box
      let sinf = ISOBoxer.createBox('sinf', avc1);

      // Create and add Original Format Box => indicate codec type of the encrypted content
      createOriginalFormatBox(sinf, codec);

      // Create and add Scheme Type box
      createSchemeTypeBox(sinf);

      // Create and add Scheme Information Box
      createSchemeInformationBox(sinf);
    }
    return avc1;
  }
  function createAVC1ConfigurationRecord() {
    let avcC = null;
    let avcCLength = 15; // length = 15 by default (0 SPS and 0 PPS)

    // First get all SPS and PPS from codecPrivateData
    let sps = [];
    let pps = [];
    let AVCProfileIndication = 0;
    let AVCLevelIndication = 0;
    let profile_compatibility = 0;
    let nalus = representation.codecPrivateData.split('00000001').slice(1);
    let naluBytes, naluType;
    for (let i = 0; i < nalus.length; i++) {
      naluBytes = hexStringtoBuffer(nalus[i]);
      naluType = naluBytes[0] & 0x1F;
      switch (naluType) {
        case NALUTYPE_SPS:
          sps.push(naluBytes);
          avcCLength += naluBytes.length + 2; // 2 = sequenceParameterSetLength field length
          break;
        case NALUTYPE_PPS:
          pps.push(naluBytes);
          avcCLength += naluBytes.length + 2; // 2 = pictureParameterSetLength field length
          break;
        default:
          break;
      }
    }

    // Get profile and level from SPS
    if (sps.length > 0) {
      AVCProfileIndication = sps[0][1];
      profile_compatibility = sps[0][2];
      AVCLevelIndication = sps[0][3];
    }

    // Generate avcC buffer
    avcC = new Uint8Array(avcCLength);
    let i = 0;
    // length
    avcC[i++] = (avcCLength & 0xFF000000) >> 24;
    avcC[i++] = (avcCLength & 0x00FF0000) >> 16;
    avcC[i++] = (avcCLength & 0x0000FF00) >> 8;
    avcC[i++] = avcCLength & 0x000000FF;
    avcC.set([0x61, 0x76, 0x63, 0x43], i); // type = 'avcC'
    i += 4;
    avcC[i++] = 1; // configurationVersion = 1
    avcC[i++] = AVCProfileIndication;
    avcC[i++] = profile_compatibility;
    avcC[i++] = AVCLevelIndication;
    avcC[i++] = 0xFF; // '11111' + lengthSizeMinusOne = 3
    avcC[i++] = 0xE0 | sps.length; // '111' + numOfSequenceParameterSets
    for (let n = 0; n < sps.length; n++) {
      avcC[i++] = (sps[n].length & 0xFF00) >> 8;
      avcC[i++] = sps[n].length & 0x00FF;
      avcC.set(sps[n], i);
      i += sps[n].length;
    }
    avcC[i++] = pps.length; // numOfPictureParameterSets
    for (let n = 0; n < pps.length; n++) {
      avcC[i++] = (pps[n].length & 0xFF00) >> 8;
      avcC[i++] = pps[n].length & 0x00FF;
      avcC.set(pps[n], i);
      i += pps[n].length;
    }
    return avcC;
  }
  function createMP4AudioSampleEntry(stsd, codec) {
    let mp4a;
    if (contentProtection) {
      mp4a = ISOBoxer.createBox('enca', stsd, false);
    } else {
      mp4a = ISOBoxer.createBox('mp4a', stsd, false);
    }

    // SampleEntry fields
    mp4a.reserved1 = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
    mp4a.data_reference_index = 1;

    // AudioSampleEntry fields
    mp4a.reserved2 = [0x0, 0x0];
    mp4a.channelcount = representation.audioChannels;
    mp4a.samplesize = 16;
    mp4a.pre_defined = 0;
    mp4a.reserved_3 = 0;
    mp4a.samplerate = representation.audioSamplingRate << 16;
    mp4a.esds = createMPEG4AACESDescriptor();
    if (contentProtection) {
      // Create and add Protection Scheme Info Box
      let sinf = ISOBoxer.createBox('sinf', mp4a);

      // Create and add Original Format Box => indicate codec type of the encrypted content
      createOriginalFormatBox(sinf, codec);

      // Create and add Scheme Type box
      createSchemeTypeBox(sinf);

      // Create and add Scheme Information Box
      createSchemeInformationBox(sinf);
    }
    return mp4a;
  }
  function createMPEG4AACESDescriptor() {
    // AudioSpecificConfig (see ISO/IEC 14496-3, subpart 1) => corresponds to hex bytes contained in 'codecPrivateData' field
    let audioSpecificConfig = hexStringtoBuffer(representation.codecPrivateData);

    // ESDS length = esds box header length (= 12) +
    //               ES_Descriptor header length (= 5) +
    //               DecoderConfigDescriptor header length (= 15) +
    //               decoderSpecificInfo header length (= 2) +
    //               AudioSpecificConfig length (= codecPrivateData length)
    let esdsLength = 34 + audioSpecificConfig.length;
    let esds = new Uint8Array(esdsLength);
    let i = 0;
    // esds box
    esds[i++] = (esdsLength & 0xFF000000) >> 24; // esds box length
    esds[i++] = (esdsLength & 0x00FF0000) >> 16; // ''
    esds[i++] = (esdsLength & 0x0000FF00) >> 8; // ''
    esds[i++] = esdsLength & 0x000000FF; // ''
    esds.set([0x65, 0x73, 0x64, 0x73], i); // type = 'esds'
    i += 4;
    esds.set([0, 0, 0, 0], i); // version = 0, flags = 0
    i += 4;
    // ES_Descriptor (see ISO/IEC 14496-1 (Systems))
    esds[i++] = 0x03; // tag = 0x03 (ES_DescrTag)
    esds[i++] = 20 + audioSpecificConfig.length; // size
    esds[i++] = (trackId & 0xFF00) >> 8; // ES_ID = track_id
    esds[i++] = trackId & 0x00FF; // ''
    esds[i++] = 0; // flags and streamPriority

    // DecoderConfigDescriptor (see ISO/IEC 14496-1 (Systems))
    esds[i++] = 0x04; // tag = 0x04 (DecoderConfigDescrTag)
    esds[i++] = 15 + audioSpecificConfig.length; // size
    esds[i++] = 0x40; // objectTypeIndication = 0x40 (MPEG-4 AAC)
    esds[i] = 0x05 << 2; // streamType = 0x05 (Audiostream)
    esds[i] |= 0 << 1; // upStream = 0
    esds[i++] |= 1; // reserved = 1
    esds[i++] = 0xFF; // buffersizeDB = undefined
    esds[i++] = 0xFF; // ''
    esds[i++] = 0xFF; // ''
    esds[i++] = (representation.bandwidth & 0xFF000000) >> 24; // maxBitrate
    esds[i++] = (representation.bandwidth & 0x00FF0000) >> 16; // ''
    esds[i++] = (representation.bandwidth & 0x0000FF00) >> 8; // ''
    esds[i++] = representation.bandwidth & 0x000000FF; // ''
    esds[i++] = (representation.bandwidth & 0xFF000000) >> 24; // avgbitrate
    esds[i++] = (representation.bandwidth & 0x00FF0000) >> 16; // ''
    esds[i++] = (representation.bandwidth & 0x0000FF00) >> 8; // ''
    esds[i++] = representation.bandwidth & 0x000000FF; // ''

    // DecoderSpecificInfo (see ISO/IEC 14496-1 (Systems))
    esds[i++] = 0x05; // tag = 0x05 (DecSpecificInfoTag)
    esds[i++] = audioSpecificConfig.length; // size
    esds.set(audioSpecificConfig, i); // AudioSpecificConfig bytes

    return esds;
  }
  function createOriginalFormatBox(sinf, codec) {
    let frma = ISOBoxer.createBox('frma', sinf);
    frma.data_format = stringToCharCode(codec);
  }
  function createSchemeTypeBox(sinf) {
    let schm = ISOBoxer.createFullBox('schm', sinf);
    schm.flags = 0;
    schm.version = 0;
    schm.scheme_type = 0x63656E63; // 'cenc' => common encryption
    schm.scheme_version = 0x00010000; // version set to 0x00010000 (Major version 1, Minor version 0)
  }
  function createSchemeInformationBox(sinf) {
    let schi = ISOBoxer.createBox('schi', sinf);

    // Create and add Track Encryption Box
    createTrackEncryptionBox(schi);
  }
  function createProtectionSystemSpecificHeaderBox(moov, keySystems) {
    let pssh_bytes, pssh, i, parsedBuffer;
    for (i = 0; i < keySystems.length; i += 1) {
      pssh_bytes = keySystems[i].initData;
      if (pssh_bytes) {
        parsedBuffer = ISOBoxer.parseBuffer(pssh_bytes);
        pssh = parsedBuffer.fetch('pssh');
        if (pssh) {
          ISOBoxer.Utils.appendBox(moov, pssh);
        }
      }
    }
  }
  function createTrackEncryptionBox(schi) {
    let tenc = ISOBoxer.createFullBox('tenc', schi);
    tenc.flags = 0;
    tenc.version = 0;
    tenc.default_IsEncrypted = 0x1;
    tenc.default_IV_size = 8;
    tenc.default_KID = contentProtection && contentProtection.length > 0 && contentProtection[0]['cenc:default_KID'] ? contentProtection[0]['cenc:default_KID'] : [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
  }
  function createTrexBox(moov) {
    let trex = ISOBoxer.createFullBox('trex', moov);
    trex.track_ID = trackId;
    trex.default_sample_description_index = 1;
    trex.default_sample_duration = 0;
    trex.default_sample_size = 0;
    trex.default_sample_flags = 0;
    return trex;
  }
  function hexStringtoBuffer(str) {
    let buf = new Uint8Array(str.length / 2);
    let i;
    for (i = 0; i < str.length / 2; i += 1) {
      buf[i] = parseInt('' + str[i * 2] + str[i * 2 + 1], 16);
    }
    return buf;
  }
  function stringToCharCode(str) {
    let code = 0;
    let i;
    for (i = 0; i < str.length; i += 1) {
      code |= str.charCodeAt(i) << (str.length - i - 1) * 8;
    }
    return code;
  }
  function generateMoov(rep) {
    if (!rep || !rep.adaptation) {
      return;
    }
    let isoFile, arrayBuffer;
    representation = rep;
    adaptationSet = representation.adaptation;
    period = adaptationSet.period;
    trackId = adaptationSet.index + 1;
    contentProtection = period.mpd.manifest.Period[period.index].AdaptationSet[adaptationSet.index].ContentProtection;
    timescale = period.mpd.manifest.Period[period.index].AdaptationSet[adaptationSet.index].SegmentTemplate.timescale;
    isoFile = ISOBoxer.createFile();
    createFtypBox(isoFile);
    createMoovBox(isoFile);
    arrayBuffer = isoFile.write();
    return arrayBuffer;
  }
  instance = {
    generateMoov: generateMoov
  };
  return instance;
}
MssFragmentMoovProcessor.__dashjs_factory_name = 'MssFragmentMoovProcessor';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getClassFactory(MssFragmentMoovProcessor));

/***/ }),

/***/ "./src/mss/MssFragmentProcessor.js":
/*!*****************************************!*\
  !*** ./src/mss/MssFragmentProcessor.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MssFragmentMoofProcessor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MssFragmentMoofProcessor.js */ "./src/mss/MssFragmentMoofProcessor.js");
/* harmony import */ var _MssFragmentMoovProcessor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MssFragmentMoovProcessor.js */ "./src/mss/MssFragmentMoovProcessor.js");
/* harmony import */ var _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../streaming/vo/metrics/HTTPRequest.js */ "./src/streaming/vo/metrics/HTTPRequest.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */






// Add specific box processors not provided by codem-isoboxer library

function arrayEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every(function (element, index) {
    return element === arr2[index];
  });
}
function saioProcessor() {
  this._procFullBox();
  if (this.flags & 1) {
    this._procField('aux_info_type', 'uint', 32);
    this._procField('aux_info_type_parameter', 'uint', 32);
  }
  this._procField('entry_count', 'uint', 32);
  this._procFieldArray('offset', this.entry_count, 'uint', this.version === 1 ? 64 : 32);
}
function saizProcessor() {
  this._procFullBox();
  if (this.flags & 1) {
    this._procField('aux_info_type', 'uint', 32);
    this._procField('aux_info_type_parameter', 'uint', 32);
  }
  this._procField('default_sample_info_size', 'uint', 8);
  this._procField('sample_count', 'uint', 32);
  if (this.default_sample_info_size === 0) {
    this._procFieldArray('sample_info_size', this.sample_count, 'uint', 8);
  }
}
function sencProcessor() {
  this._procFullBox();
  this._procField('sample_count', 'uint', 32);
  if (this.flags & 1) {
    this._procField('IV_size', 'uint', 8);
  }
  this._procEntries('entry', this.sample_count, function (entry) {
    this._procEntryField(entry, 'InitializationVector', 'data', 8);
    if (this.flags & 2) {
      this._procEntryField(entry, 'NumberOfEntries', 'uint', 16);
      this._procSubEntries(entry, 'clearAndCryptedData', entry.NumberOfEntries, function (clearAndCryptedData) {
        this._procEntryField(clearAndCryptedData, 'BytesOfClearData', 'uint', 16);
        this._procEntryField(clearAndCryptedData, 'BytesOfEncryptedData', 'uint', 32);
      });
    }
  });
}
function uuidProcessor() {
  let tfxdUserType = [0x6D, 0x1D, 0x9B, 0x05, 0x42, 0xD5, 0x44, 0xE6, 0x80, 0xE2, 0x14, 0x1D, 0xAF, 0xF7, 0x57, 0xB2];
  let tfrfUserType = [0xD4, 0x80, 0x7E, 0xF2, 0xCA, 0x39, 0x46, 0x95, 0x8E, 0x54, 0x26, 0xCB, 0x9E, 0x46, 0xA7, 0x9F];
  let sepiffUserType = [0xA2, 0x39, 0x4F, 0x52, 0x5A, 0x9B, 0x4f, 0x14, 0xA2, 0x44, 0x6C, 0x42, 0x7C, 0x64, 0x8D, 0xF4];
  if (arrayEqual(this.usertype, tfxdUserType)) {
    this._procFullBox();
    if (this._parsing) {
      this.type = 'tfxd';
    }
    this._procField('fragment_absolute_time', 'uint', this.version === 1 ? 64 : 32);
    this._procField('fragment_duration', 'uint', this.version === 1 ? 64 : 32);
  }
  if (arrayEqual(this.usertype, tfrfUserType)) {
    this._procFullBox();
    if (this._parsing) {
      this.type = 'tfrf';
    }
    this._procField('fragment_count', 'uint', 8);
    this._procEntries('entry', this.fragment_count, function (entry) {
      this._procEntryField(entry, 'fragment_absolute_time', 'uint', this.version === 1 ? 64 : 32);
      this._procEntryField(entry, 'fragment_duration', 'uint', this.version === 1 ? 64 : 32);
    });
  }
  if (arrayEqual(this.usertype, sepiffUserType)) {
    if (this._parsing) {
      this.type = 'sepiff';
    }
    sencProcessor.call(this);
  }
}
function MssFragmentProcessor(config) {
  config = config || {};
  const context = this.context;
  const dashMetrics = config.dashMetrics;
  const playbackController = config.playbackController;
  const eventBus = config.eventBus;
  const protectionController = config.protectionController;
  const ISOBoxer = config.ISOBoxer;
  const debug = config.debug;
  let mssFragmentMoovProcessor, mssFragmentMoofProcessor, instance;
  function setup() {
    ISOBoxer.addBoxProcessor('uuid', uuidProcessor);
    ISOBoxer.addBoxProcessor('saio', saioProcessor);
    ISOBoxer.addBoxProcessor('saiz', saizProcessor);
    ISOBoxer.addBoxProcessor('senc', sencProcessor);
    mssFragmentMoovProcessor = (0,_MssFragmentMoovProcessor_js__WEBPACK_IMPORTED_MODULE_1__["default"])(context).create({
      protectionController: protectionController,
      constants: config.constants,
      ISOBoxer: ISOBoxer
    });
    mssFragmentMoofProcessor = (0,_MssFragmentMoofProcessor_js__WEBPACK_IMPORTED_MODULE_0__["default"])(context).create({
      dashMetrics: dashMetrics,
      playbackController: playbackController,
      ISOBoxer: ISOBoxer,
      eventBus: eventBus,
      debug: debug,
      errHandler: config.errHandler
    });
  }
  function generateMoov(rep) {
    return mssFragmentMoovProcessor.generateMoov(rep);
  }
  function processFragment(e, streamProcessor) {
    if (!e || !e.request || !e.response) {
      throw new Error('e parameter is missing or malformed');
    }
    if (e.request.type === 'MediaSegment') {
      // MediaSegment => convert to Smooth Streaming moof format
      mssFragmentMoofProcessor.convertFragment(e, streamProcessor);
    } else if (e.request.type === _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_2__.HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE) {
      // FragmentInfo (live) => update segments list
      mssFragmentMoofProcessor.updateSegmentList(e, streamProcessor);

      // Stop event propagation (FragmentInfo must not be added to buffer)
      e.sender = null;
    }
  }
  instance = {
    generateMoov,
    processFragment
  };
  setup();
  return instance;
}
MssFragmentProcessor.__dashjs_factory_name = 'MssFragmentProcessor';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_3__["default"].getClassFactory(MssFragmentProcessor));

/***/ }),

/***/ "./src/mss/MssHandler.js":
/*!*******************************!*\
  !*** ./src/mss/MssHandler.js ***!
  \*******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _streaming_vo_DataChunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../streaming/vo/DataChunk.js */ "./src/streaming/vo/DataChunk.js");
/* harmony import */ var _streaming_vo_FragmentRequest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../streaming/vo/FragmentRequest.js */ "./src/streaming/vo/FragmentRequest.js");
/* harmony import */ var _MssFragmentInfoController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MssFragmentInfoController.js */ "./src/mss/MssFragmentInfoController.js");
/* harmony import */ var _MssFragmentProcessor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MssFragmentProcessor.js */ "./src/mss/MssFragmentProcessor.js");
/* harmony import */ var _parser_MssParser_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parser/MssParser.js */ "./src/mss/parser/MssParser.js");
/* harmony import */ var _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errors/MssErrors.js */ "./src/mss/errors/MssErrors.js");
/* harmony import */ var _streaming_vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../streaming/vo/DashJSError.js */ "./src/streaming/vo/DashJSError.js");
/* harmony import */ var _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../streaming/vo/metrics/HTTPRequest.js */ "./src/streaming/vo/metrics/HTTPRequest.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */









function MssHandler(config) {
  config = config || {};
  const context = this.context;
  const eventBus = config.eventBus;
  const events = config.events;
  const constants = config.constants;
  const initSegmentType = config.initSegmentType;
  const playbackController = config.playbackController;
  const streamController = config.streamController;
  let mssParser, mssFragmentProcessor, fragmentInfoControllers, instance;
  function setup() {
    fragmentInfoControllers = [];
  }
  function createMssFragmentProcessor() {
    mssFragmentProcessor = (0,_MssFragmentProcessor_js__WEBPACK_IMPORTED_MODULE_3__["default"])(context).create(config);
  }
  function getStreamProcessor(type) {
    return streamController.getActiveStreamProcessors().filter(processor => {
      return processor.getType() === type;
    })[0];
  }
  function getFragmentInfoController(type) {
    return fragmentInfoControllers.filter(controller => {
      return controller.getType() === type;
    })[0];
  }
  function createDataChunk(request, streamId, endFragment) {
    const chunk = new _streaming_vo_DataChunk_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    chunk.streamId = streamId;
    chunk.segmentType = request.type;
    chunk.start = request.startTime;
    chunk.duration = request.duration;
    chunk.end = chunk.start + chunk.duration;
    chunk.index = request.index;
    chunk.bandwidth = request.bandwidth;
    chunk.representation = request.representation;
    chunk.endFragment = endFragment;
    return chunk;
  }
  function startFragmentInfoControllers() {
    // Create MssFragmentInfoControllers for each StreamProcessor of active stream (only for audio, video or text)
    let processors = streamController.getActiveStreamProcessors();
    processors.forEach(function (processor) {
      if (processor.getType() === constants.VIDEO || processor.getType() === constants.AUDIO || processor.getType() === constants.TEXT) {
        let fragmentInfoController = getFragmentInfoController(processor.getType());
        if (!fragmentInfoController) {
          fragmentInfoController = (0,_MssFragmentInfoController_js__WEBPACK_IMPORTED_MODULE_2__["default"])(context).create({
            streamProcessor: processor,
            baseURLController: config.baseURLController,
            debug: config.debug
          });
          fragmentInfoController.initialize();
          fragmentInfoControllers.push(fragmentInfoController);
        }
        fragmentInfoController.start();
      }
    });
  }
  function stopFragmentInfoControllers() {
    fragmentInfoControllers.forEach(c => {
      c.reset();
    });
    fragmentInfoControllers = [];
  }
  function onInitFragmentNeeded(e) {
    let streamProcessor = getStreamProcessor(e.mediaType);
    if (!streamProcessor) {
      return;
    }

    // Create init segment request
    let representationController = streamProcessor.getRepresentationController();
    let representation = representationController.getCurrentRepresentation();
    let mediaInfo = streamProcessor.getMediaInfo();
    let request = new _streaming_vo_FragmentRequest_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    request.mediaType = representation.adaptation.type;
    request.type = initSegmentType;
    request.range = representation.range;
    request.bandwidth = representation.bandwidth;
    request.representation = representation;
    const chunk = createDataChunk(request, mediaInfo.streamInfo.id, e.type !== events.FRAGMENT_LOADING_PROGRESS);
    try {
      // Generate init segment (moov)
      chunk.bytes = mssFragmentProcessor.generateMoov(representation);

      // Notify init segment has been loaded
      eventBus.trigger(events.INIT_FRAGMENT_LOADED, {
        chunk: chunk
      }, {
        streamId: mediaInfo.streamInfo.id,
        mediaType: representation.adaptation.type
      });
    } catch (e) {
      config.errHandler.error(new _streaming_vo_DashJSError_js__WEBPACK_IMPORTED_MODULE_6__["default"](e.code, e.message, e.data));
    }

    // Change the sender value to stop event to be propagated
    e.sender = null;
  }
  function onSegmentMediaLoaded(e) {
    if (e.error) {
      return;
    }
    let streamProcessor = getStreamProcessor(e.request.mediaType);
    if (!streamProcessor) {
      return;
    }

    // Process moof to transcode it from MSS to DASH (or to update segment timeline for SegmentInfo fragments)
    mssFragmentProcessor.processFragment(e, streamProcessor);
    if (e.request.type === _streaming_vo_metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_7__.HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE) {
      // If FragmentInfo loaded, then notify corresponding MssFragmentInfoController
      let fragmentInfoController = getFragmentInfoController(e.request.mediaType);
      if (fragmentInfoController) {
        fragmentInfoController.fragmentInfoLoaded(e);
      }
    }

    // Start MssFragmentInfoControllers in case of start-over streams
    let manifestInfo = e.request.representation.mediaInfo.streamInfo.manifestInfo;
    if (!manifestInfo.isDynamic && manifestInfo.dvrWindowSize !== Infinity) {
      startFragmentInfoControllers();
    }
  }
  function onPlaybackPaused() {
    if (playbackController.getIsDynamic() && playbackController.getTime() !== 0) {
      startFragmentInfoControllers();
    }
  }
  function onPlaybackSeeking() {
    if (playbackController.getIsDynamic() && playbackController.getTime() !== 0) {
      startFragmentInfoControllers();
    }
  }
  function onTTMLPreProcess(ttmlSubtitles) {
    if (!ttmlSubtitles || !ttmlSubtitles.data) {
      return;
    }
    ttmlSubtitles.data = ttmlSubtitles.data.replace(/http:\/\/www.w3.org\/2006\/10\/ttaf1/gi, 'http://www.w3.org/ns/ttml');
  }
  function registerEvents() {
    eventBus.on(events.INIT_FRAGMENT_NEEDED, onInitFragmentNeeded, instance, {
      priority: dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH
    });
    eventBus.on(events.PLAYBACK_PAUSED, onPlaybackPaused, instance, {
      priority: dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH
    });
    eventBus.on(events.PLAYBACK_SEEKING, onPlaybackSeeking, instance, {
      priority: dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH
    });
    eventBus.on(events.FRAGMENT_LOADING_COMPLETED, onSegmentMediaLoaded, instance, {
      priority: dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH
    });
    eventBus.on(events.TTML_TO_PARSE, onTTMLPreProcess, instance);
  }
  function reset() {
    if (mssParser) {
      mssParser.reset();
      mssParser = undefined;
    }
    eventBus.off(events.INIT_FRAGMENT_NEEDED, onInitFragmentNeeded, this);
    eventBus.off(events.PLAYBACK_PAUSED, onPlaybackPaused, this);
    eventBus.off(events.PLAYBACK_SEEKING, onPlaybackSeeking, this);
    eventBus.off(events.FRAGMENT_LOADING_COMPLETED, onSegmentMediaLoaded, this);
    eventBus.off(events.TTML_TO_PARSE, onTTMLPreProcess, this);

    // Reset FragmentInfoControllers
    stopFragmentInfoControllers();
  }
  function createMssParser() {
    mssParser = (0,_parser_MssParser_js__WEBPACK_IMPORTED_MODULE_4__["default"])(context).create(config);
    return mssParser;
  }
  instance = {
    reset,
    createMssParser,
    createMssFragmentProcessor,
    registerEvents
  };
  setup();
  return instance;
}
MssHandler.__dashjs_factory_name = 'MssHandler';
const factory = dashjs.FactoryMaker.getClassFactory(MssHandler);
factory.errors = _errors_MssErrors_js__WEBPACK_IMPORTED_MODULE_5__["default"];
dashjs.FactoryMaker.updateClassFactory(MssHandler.__dashjs_factory_name, factory);
/* harmony default export */ __webpack_exports__["default"] = (factory);

/***/ }),

/***/ "./src/mss/errors/MssErrors.js":
/*!*************************************!*\
  !*** ./src/mss/errors/MssErrors.js ***!
  \*************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_errors_ErrorsBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/errors/ErrorsBase.js */ "./src/core/errors/ErrorsBase.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @class
 *
 */
class MssErrors extends _core_errors_ErrorsBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    /**
     * Error code returned when no tfrf box is detected in MSS live stream
     */
    this.MSS_NO_TFRF_CODE = 200;

    /**
     * Error code returned when one of the codecs defined in the manifest is not supported
     */
    this.MSS_UNSUPPORTED_CODEC_CODE = 201;
    this.MSS_NO_TFRF_MESSAGE = 'Missing tfrf in live media segment';
    this.MSS_UNSUPPORTED_CODEC_MESSAGE = 'Unsupported codec';
  }
}
let mssErrors = new MssErrors();
/* harmony default export */ __webpack_exports__["default"] = (mssErrors);

/***/ }),

/***/ "./src/mss/parser/MssParser.js":
/*!*************************************!*\
  !*** ./src/mss/parser/MssParser.js ***!
  \*************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../externals/BigInteger.js */ "./externals/BigInteger.js");
/* harmony import */ var _core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/FactoryMaker.js */ "./src/core/FactoryMaker.js");
/* harmony import */ var _streaming_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../streaming/constants/ProtectionConstants.js */ "./src/streaming/constants/ProtectionConstants.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module MssParser
 * @ignore
 * @param {Object} config object
 */




function MssParser(config) {
  config = config || {};
  const BASE64 = config.BASE64;
  const debug = config.debug;
  const constants = config.constants;
  const manifestModel = config.manifestModel;
  const settings = config.settings;
  const DEFAULT_TIME_SCALE = 10000000.0;
  const SUPPORTED_CODECS = ['AAC', 'AACL', 'AACH', 'AACP', 'AVC1', 'H264', 'TTML', 'DFXP'];
  // MPEG-DASH Role and accessibility mapping for text tracks according to ETSI TS 103 285 v1.1.1 (section 7.1.2)
  const ROLE = {
    'CAPT': 'main',
    'SUBT': 'alternate',
    'DESC': 'main'
  };
  const ACCESSIBILITY = {
    'DESC': '2'
  };
  const samplingFrequencyIndex = {
    96000: 0x0,
    88200: 0x1,
    64000: 0x2,
    48000: 0x3,
    44100: 0x4,
    32000: 0x5,
    24000: 0x6,
    22050: 0x7,
    16000: 0x8,
    12000: 0x9,
    11025: 0xA,
    8000: 0xB,
    7350: 0xC
  };
  const mimeTypeMap = {
    'video': 'video/mp4',
    'audio': 'audio/mp4',
    'text': 'application/mp4'
  };
  let instance, logger, initialBufferSettings;
  function setup() {
    logger = debug.getLogger(instance);
  }
  function getAttributeAsBoolean(node, attrName) {
    const value = node.getAttribute(attrName);
    if (!value) {
      return false;
    }
    return value.toLowerCase() === 'true';
  }
  function mapPeriod(smoothStreamingMedia, timescale) {
    const period = {};
    let streams, adaptation;

    // For each StreamIndex node, create an AdaptationSet element
    period.AdaptationSet = [];
    streams = smoothStreamingMedia.getElementsByTagName('StreamIndex');
    for (let i = 0; i < streams.length; i++) {
      adaptation = mapAdaptationSet(streams[i], timescale);
      if (adaptation !== null) {
        period.AdaptationSet.push(adaptation);
      }
    }
    return period;
  }
  function mapAdaptationSet(streamIndex, timescale) {
    const adaptationSet = {};
    const representations = [];
    let segmentTemplate;
    let qualityLevels, representation, i, index;
    const name = streamIndex.getAttribute('Name');
    const type = streamIndex.getAttribute('Type');
    const lang = streamIndex.getAttribute('Language');
    const fallBackId = lang ? type + '_' + lang : type;
    adaptationSet.id = name || fallBackId;
    adaptationSet.contentType = type;
    adaptationSet.lang = lang || 'und';
    adaptationSet.mimeType = mimeTypeMap[type];
    adaptationSet.subType = streamIndex.getAttribute('Subtype');
    adaptationSet.maxWidth = streamIndex.getAttribute('MaxWidth');
    adaptationSet.maxHeight = streamIndex.getAttribute('MaxHeight');

    // Map text tracks subTypes to MPEG-DASH AdaptationSet role and accessibility (see ETSI TS 103 285 v1.1.1, section 7.1.2)
    if (adaptationSet.subType) {
      if (ROLE[adaptationSet.subType]) {
        adaptationSet.Role = [{
          schemeIdUri: 'urn:mpeg:dash:role:2011',
          value: ROLE[adaptationSet.subType]
        }];
      }
      if (ACCESSIBILITY[adaptationSet.subType]) {
        adaptationSet.Accessibility = [{
          schemeIdUri: 'urn:tva:metadata:cs:AudioPurposeCS:2007',
          value: ACCESSIBILITY[adaptationSet.subType]
        }];
      }
    }

    // Create a SegmentTemplate with a SegmentTimeline
    segmentTemplate = mapSegmentTemplate(streamIndex, timescale);
    qualityLevels = streamIndex.getElementsByTagName('QualityLevel');
    // For each QualityLevel node, create a Representation element
    for (i = 0; i < qualityLevels.length; i++) {
      // Propagate BaseURL and mimeType
      qualityLevels[i].BaseURL = adaptationSet.BaseURL;
      qualityLevels[i].mimeType = adaptationSet.mimeType;

      // Set quality level id
      index = qualityLevels[i].getAttribute('Index');
      qualityLevels[i].Id = adaptationSet.id + (index !== null ? '_' + index : '');

      // Map Representation to QualityLevel
      representation = mapRepresentation(qualityLevels[i], streamIndex);
      if (representation !== null) {
        // Copy SegmentTemplate into Representation
        representation.SegmentTemplate = segmentTemplate;
        representations.push(representation);
      }
    }
    if (representations.length === 0) {
      return null;
    }
    adaptationSet.Representation = representations;

    // Set SegmentTemplate
    adaptationSet.SegmentTemplate = segmentTemplate;
    return adaptationSet;
  }
  function mapRepresentation(qualityLevel, streamIndex) {
    const representation = {};
    const type = streamIndex.getAttribute('Type');
    let fourCCValue = null;
    let width = null;
    let height = null;
    representation.id = qualityLevel.Id;
    representation.bandwidth = parseInt(qualityLevel.getAttribute('Bitrate'), 10);
    representation.mimeType = qualityLevel.mimeType;
    width = parseInt(qualityLevel.getAttribute('MaxWidth'), 10);
    height = parseInt(qualityLevel.getAttribute('MaxHeight'), 10);
    if (!isNaN(width)) {
      representation.width = width;
    }
    if (!isNaN(height)) {
      representation.height = height;
    }
    fourCCValue = qualityLevel.getAttribute('FourCC');

    // If FourCC not defined at QualityLevel level, then get it from StreamIndex level
    if (fourCCValue === null || fourCCValue === '') {
      fourCCValue = streamIndex.getAttribute('FourCC');
    }

    // If still not defined (optionnal for audio stream, see https://msdn.microsoft.com/en-us/library/ff728116%28v=vs.95%29.aspx),
    // then we consider the stream is an audio AAC stream
    if (fourCCValue === null || fourCCValue === '') {
      if (type === constants.AUDIO) {
        fourCCValue = 'AAC';
      } else if (type === constants.VIDEO) {
        logger.debug('FourCC is not defined whereas it is required for a QualityLevel element for a StreamIndex of type "video"');
        return null;
      }
    }

    // Check if codec is supported
    if (SUPPORTED_CODECS.indexOf(fourCCValue.toUpperCase()) === -1) {
      // Do not send warning
      logger.warn('Codec not supported: ' + fourCCValue);
      return null;
    }

    // Get codecs value according to FourCC field
    if (fourCCValue === 'H264' || fourCCValue === 'AVC1') {
      representation.codecs = getH264Codec(qualityLevel);
    } else if (fourCCValue.indexOf('AAC') >= 0) {
      representation.codecs = getAACCodec(qualityLevel, fourCCValue);
      representation.audioSamplingRate = parseInt(qualityLevel.getAttribute('SamplingRate'), 10);
      representation.audioChannels = parseInt(qualityLevel.getAttribute('Channels'), 10);
    } else if (fourCCValue.indexOf('TTML') || fourCCValue.indexOf('DFXP')) {
      representation.codecs = constants.STPP;
    }
    representation.codecPrivateData = '' + qualityLevel.getAttribute('CodecPrivateData');
    representation.BaseURL = qualityLevel.BaseURL;
    return representation;
  }
  function getH264Codec(qualityLevel) {
    let codecPrivateData = qualityLevel.getAttribute('CodecPrivateData').toString();
    let nalHeader, avcoti;

    // Extract from the CodecPrivateData field the hexadecimal representation of the following
    // three bytes in the sequence parameter set NAL unit.
    // => Find the SPS nal header
    nalHeader = /00000001[0-9]7/.exec(codecPrivateData);
    // => Find the 6 characters after the SPS nalHeader (if it exists)
    avcoti = nalHeader && nalHeader[0] ? codecPrivateData.substr(codecPrivateData.indexOf(nalHeader[0]) + 10, 6) : undefined;
    return 'avc1.' + avcoti;
  }
  function getAACCodec(qualityLevel, fourCCValue) {
    const samplingRate = parseInt(qualityLevel.getAttribute('SamplingRate'), 10);
    let codecPrivateData = qualityLevel.getAttribute('CodecPrivateData').toString();
    let objectType = 0;
    let codecPrivateDataHex, arr16, indexFreq, extensionSamplingFrequencyIndex;

    //chrome problem, in implicit AAC HE definition, so when AACH is detected in FourCC
    //set objectType to 5 => strange, it should be 2
    if (fourCCValue === 'AACH') {
      objectType = 0x05;
    }
    //if codecPrivateData is empty, build it :
    if (codecPrivateData === undefined || codecPrivateData === '') {
      objectType = 0x02; //AAC Main Low Complexity => object Type = 2
      indexFreq = samplingFrequencyIndex[samplingRate];
      if (fourCCValue === 'AACH') {
        // 4 bytes :     XXXXX         XXXX          XXXX             XXXX                  XXXXX      XXX   XXXXXXX
        //           ' ObjectType' 'Freq Index' 'Channels value'   'Extens Sampl Freq'  'ObjectType'  'GAS' 'alignment = 0'
        objectType = 0x05; // High Efficiency AAC Profile = object Type = 5 SBR
        codecPrivateData = new Uint8Array(4);
        extensionSamplingFrequencyIndex = samplingFrequencyIndex[samplingRate * 2]; // in HE AAC Extension Sampling frequence
        // equals to SamplingRate*2
        //Freq Index is present for 3 bits in the first byte, last bit is in the second
        codecPrivateData[0] = objectType << 3 | indexFreq >> 1;
        codecPrivateData[1] = indexFreq << 7 | qualityLevel.Channels << 3 | extensionSamplingFrequencyIndex >> 1;
        codecPrivateData[2] = extensionSamplingFrequencyIndex << 7 | 0x02 << 2; // origin object type equals to 2 => AAC Main Low Complexity
        codecPrivateData[3] = 0x0; //alignment bits

        arr16 = new Uint16Array(2);
        arr16[0] = (codecPrivateData[0] << 8) + codecPrivateData[1];
        arr16[1] = (codecPrivateData[2] << 8) + codecPrivateData[3];
        //convert decimal to hex value
        codecPrivateDataHex = arr16[0].toString(16);
        codecPrivateDataHex = arr16[0].toString(16) + arr16[1].toString(16);
      } else {
        // 2 bytes :     XXXXX         XXXX          XXXX              XXX
        //           ' ObjectType' 'Freq Index' 'Channels value'   'GAS = 000'
        codecPrivateData = new Uint8Array(2);
        //Freq Index is present for 3 bits in the first byte, last bit is in the second
        codecPrivateData[0] = objectType << 3 | indexFreq >> 1;
        codecPrivateData[1] = indexFreq << 7 | parseInt(qualityLevel.getAttribute('Channels'), 10) << 3;
        // put the 2 bytes in an 16 bits array
        arr16 = new Uint16Array(1);
        arr16[0] = (codecPrivateData[0] << 8) + codecPrivateData[1];
        //convert decimal to hex value
        codecPrivateDataHex = arr16[0].toString(16);
      }
      codecPrivateData = '' + codecPrivateDataHex;
      codecPrivateData = codecPrivateData.toUpperCase();
      qualityLevel.setAttribute('CodecPrivateData', codecPrivateData);
    } else if (objectType === 0) {
      objectType = (parseInt(codecPrivateData.substr(0, 2), 16) & 0xF8) >> 3;
    }
    return 'mp4a.40.' + objectType;
  }
  function mapSegmentTemplate(streamIndex, timescale) {
    const segmentTemplate = {};
    let mediaUrl, streamIndexTimeScale, url;
    url = streamIndex.getAttribute('Url');
    mediaUrl = url ? url.replace('{bitrate}', '$Bandwidth$') : null;
    mediaUrl = mediaUrl ? mediaUrl.replace('{start time}', '$Time$') : null;
    streamIndexTimeScale = streamIndex.getAttribute('TimeScale');
    streamIndexTimeScale = streamIndexTimeScale ? parseFloat(streamIndexTimeScale) : timescale;
    segmentTemplate.media = mediaUrl;
    segmentTemplate.timescale = streamIndexTimeScale;
    segmentTemplate.SegmentTimeline = mapSegmentTimeline(streamIndex, segmentTemplate.timescale);

    // Patch: set availabilityTimeOffset to Infinity since segments are available as long as they are present in timeline
    segmentTemplate.availabilityTimeOffset = 'INF';
    return segmentTemplate;
  }
  function mapSegmentTimeline(streamIndex, timescale) {
    const segmentTimeline = {};
    const chunks = streamIndex.getElementsByTagName('c');
    const segments = [];
    let segment, prevSegment, tManifest, i, j, r;
    let duration = 0;
    for (i = 0; i < chunks.length; i++) {
      segment = {};

      // Get time 't' attribute value
      tManifest = chunks[i].getAttribute('t');

      // => segment.tManifest = original timestamp value as a string (for constructing the fragment request url, see DashHandler)
      // => segment.t = number value of timestamp (maybe rounded value, but only for 0.1 microsecond)
      if (tManifest && (0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tManifest).greater((0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Number.MAX_SAFE_INTEGER))) {
        segment.tManifest = tManifest;
      }
      segment.t = parseFloat(tManifest);

      // Get duration 'd' attribute value
      segment.d = parseFloat(chunks[i].getAttribute('d'));

      // If 't' not defined for first segment then t=0
      if (i === 0 && !segment.t) {
        segment.t = 0;
      }
      if (i > 0) {
        prevSegment = segments[segments.length - 1];
        // Update previous segment duration if not defined
        if (!prevSegment.d) {
          if (prevSegment.tManifest) {
            prevSegment.d = (0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tManifest).subtract((0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(prevSegment.tManifest)).toJSNumber();
          } else {
            prevSegment.d = segment.t - prevSegment.t;
          }
          duration += prevSegment.d;
        }
        // Set segment absolute timestamp if not set in manifest
        if (!segment.t) {
          if (prevSegment.tManifest) {
            segment.tManifest = (0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(prevSegment.tManifest).add((0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(prevSegment.d)).toString();
            segment.t = parseFloat(segment.tManifest);
          } else {
            segment.t = prevSegment.t + prevSegment.d;
          }
        }
      }
      if (segment.d) {
        duration += segment.d;
      }

      // Create new segment
      segments.push(segment);

      // Support for 'r' attribute (i.e. "repeat" as in MPEG-DASH)
      r = parseFloat(chunks[i].getAttribute('r'));
      if (r) {
        for (j = 0; j < r - 1; j++) {
          prevSegment = segments[segments.length - 1];
          segment = {};
          segment.t = prevSegment.t + prevSegment.d;
          segment.d = prevSegment.d;
          if (prevSegment.tManifest) {
            segment.tManifest = (0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(prevSegment.tManifest).add((0,_externals_BigInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(prevSegment.d)).toString();
          }
          duration += segment.d;
          segments.push(segment);
        }
      }
    }
    segmentTimeline.S = segments;
    segmentTimeline.duration = duration / timescale;
    return segmentTimeline;
  }
  function getKIDFromProtectionHeader(protectionHeader) {
    let prHeader, wrmHeader, xmlReader, KID;

    // Get PlayReady header as byte array (base64 decoded)
    prHeader = BASE64.decodeArray(protectionHeader.firstChild.data);

    // Get Right Management header (WRMHEADER) from PlayReady header
    wrmHeader = getWRMHeaderFromPRHeader(prHeader);
    if (wrmHeader) {
      // Convert from multi-byte to unicode
      wrmHeader = new Uint16Array(wrmHeader.buffer);

      // Convert to string
      wrmHeader = String.fromCharCode.apply(null, wrmHeader);

      // Parse <WRMHeader> to get KID field value
      xmlReader = new DOMParser().parseFromString(wrmHeader, 'application/xml');
      KID = xmlReader.querySelector('KID').textContent;

      // Get KID (base64 decoded) as byte array
      KID = BASE64.decodeArray(KID);

      // Convert UUID from little-endian to big-endian
      convertUuidEndianness(KID);
    }
    return KID;
  }
  function getWRMHeaderFromPRHeader(prHeader) {
    let length, recordCount, recordType, recordLength, recordValue;
    let i = 0;

    // Parse PlayReady header

    // Length - 32 bits (LE format)
    length = (prHeader[i + 3] << 24) + (prHeader[i + 2] << 16) + (prHeader[i + 1] << 8) + prHeader[i]; // eslint-disable-line
    i += 4;

    // Record count - 16 bits (LE format)
    recordCount = (prHeader[i + 1] << 8) + prHeader[i]; // eslint-disable-line
    i += 2;

    // Parse records
    while (i < prHeader.length) {
      // Record type - 16 bits (LE format)
      recordType = (prHeader[i + 1] << 8) + prHeader[i];
      i += 2;

      // Check if Rights Management header (record type = 0x01)
      if (recordType === 0x01) {
        // Record length - 16 bits (LE format)
        recordLength = (prHeader[i + 1] << 8) + prHeader[i];
        i += 2;

        // Record value => contains <WRMHEADER>
        recordValue = new Uint8Array(recordLength);
        recordValue.set(prHeader.subarray(i, i + recordLength));
        return recordValue;
      }
    }
    return null;
  }
  function convertUuidEndianness(uuid) {
    swapBytes(uuid, 0, 3);
    swapBytes(uuid, 1, 2);
    swapBytes(uuid, 4, 5);
    swapBytes(uuid, 6, 7);
  }
  function swapBytes(bytes, pos1, pos2) {
    const temp = bytes[pos1];
    bytes[pos1] = bytes[pos2];
    bytes[pos2] = temp;
  }
  function createPRContentProtection(protectionHeader) {
    let pro = {
      __text: protectionHeader.firstChild.data,
      __prefix: 'mspr'
    };
    return {
      schemeIdUri: 'urn:uuid:' + _streaming_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_2__["default"].PLAYREADY_UUID,
      value: _streaming_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_2__["default"].PLAYREADY_KEYSTEM_STRING,
      pro: pro
    };
  }
  function createWidevineContentProtection(KID) {
    let widevineCP = {
      schemeIdUri: 'urn:uuid:' + _streaming_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_2__["default"].WIDEVINE_UUID,
      value: _streaming_constants_ProtectionConstants_js__WEBPACK_IMPORTED_MODULE_2__["default"].WIDEVINE_KEYSTEM_STRING
    };
    if (!KID) {
      return widevineCP;
    }
    // Create Widevine CENC header (Protocol Buffer) with KID value
    const wvCencHeader = new Uint8Array(2 + KID.length);
    wvCencHeader[0] = 0x12;
    wvCencHeader[1] = 0x10;
    wvCencHeader.set(KID, 2);

    // Create a pssh box
    const length = 12 /* box length, type, version and flags */ + 16 /* SystemID */ + 4 /* data length */ + wvCencHeader.length;
    let pssh = new Uint8Array(length);
    let i = 0;

    // Set box length value
    pssh[i++] = (length & 0xFF000000) >> 24;
    pssh[i++] = (length & 0x00FF0000) >> 16;
    pssh[i++] = (length & 0x0000FF00) >> 8;
    pssh[i++] = length & 0x000000FF;

    // Set type ('pssh'), version (0) and flags (0)
    pssh.set([0x70, 0x73, 0x73, 0x68, 0x00, 0x00, 0x00, 0x00], i);
    i += 8;

    // Set SystemID ('edef8ba9-79d6-4ace-a3c8-27dcd51d21ed')
    pssh.set([0xed, 0xef, 0x8b, 0xa9, 0x79, 0xd6, 0x4a, 0xce, 0xa3, 0xc8, 0x27, 0xdc, 0xd5, 0x1d, 0x21, 0xed], i);
    i += 16;

    // Set data length value
    pssh[i++] = (wvCencHeader.length & 0xFF000000) >> 24;
    pssh[i++] = (wvCencHeader.length & 0x00FF0000) >> 16;
    pssh[i++] = (wvCencHeader.length & 0x0000FF00) >> 8;
    pssh[i++] = wvCencHeader.length & 0x000000FF;

    // Copy Widevine CENC header
    pssh.set(wvCencHeader, i);

    // Convert to BASE64 string
    pssh = String.fromCharCode.apply(null, pssh);
    pssh = BASE64.encodeASCII(pssh);
    widevineCP.pssh = {
      __text: pssh
    };
    return widevineCP;
  }
  function processManifest(xmlDoc) {
    const manifest = {};
    const contentProtections = [];
    const smoothStreamingMedia = xmlDoc.getElementsByTagName('SmoothStreamingMedia')[0];
    const protection = xmlDoc.getElementsByTagName('Protection')[0];
    let protectionHeader = null;
    let period, adaptations, contentProtection, KID, timestampOffset, startTime, segments, timescale, segmentDuration, i, j;

    // Set manifest node properties
    manifest.protocol = 'MSS';
    manifest.profiles = 'urn:mpeg:dash:profile:isoff-live:2011';
    manifest.type = getAttributeAsBoolean(smoothStreamingMedia, 'IsLive') ? 'dynamic' : 'static';
    timescale = smoothStreamingMedia.getAttribute('TimeScale');
    manifest.timescale = timescale ? parseFloat(timescale) : DEFAULT_TIME_SCALE;
    let dvrWindowLength = parseFloat(smoothStreamingMedia.getAttribute('DVRWindowLength'));
    // If the DVRWindowLength field is omitted for a live presentation or set to 0, the DVR window is effectively infinite
    if (manifest.type === 'dynamic' && (dvrWindowLength === 0 || isNaN(dvrWindowLength))) {
      dvrWindowLength = Infinity;
    }
    // Star-over
    if (dvrWindowLength === 0 && getAttributeAsBoolean(smoothStreamingMedia, 'CanSeek')) {
      dvrWindowLength = Infinity;
    }
    if (dvrWindowLength > 0) {
      manifest.timeShiftBufferDepth = dvrWindowLength / manifest.timescale;
    }
    let duration = parseFloat(smoothStreamingMedia.getAttribute('Duration'));
    manifest.mediaPresentationDuration = duration === 0 ? Infinity : duration / manifest.timescale;
    // By default, set minBufferTime to 2 sec. (but set below according to video segment duration)
    manifest.minBufferTime = 2;
    manifest.ttmlTimeIsRelative = true;

    // Live manifest with Duration = start-over
    if (manifest.type === 'dynamic' && duration > 0) {
      manifest.type = 'static';
      // We set timeShiftBufferDepth to initial duration, to be used by MssFragmentController to update segment timeline
      manifest.timeShiftBufferDepth = duration / manifest.timescale;
      // Duration will be set according to current segment timeline duration (see below)
    }
    if (manifest.type === 'dynamic') {
      manifest.refreshManifestOnSwitchTrack = true; // Refresh manifest when switching tracks
      manifest.doNotUpdateDVRWindowOnBufferUpdated = true; // DVRWindow is update by MssFragmentMoofPocessor based on tfrf boxes
      manifest.ignorePostponeTimePeriod = true; // Never update manifest
      manifest.availabilityStartTime = new Date(null); // Returns 1970
    }

    // Map period node to manifest root node
    period = mapPeriod(smoothStreamingMedia, manifest.timescale);
    manifest.Period = [period];

    // Initialize period start time
    period.start = 0;

    // Uncomment to test live to static manifests
    // if (manifest.type !== 'static') {
    //     manifest.type = 'static';
    //     manifest.mediaPresentationDuration = manifest.timeShiftBufferDepth;
    //     manifest.timeShiftBufferDepth = null;
    // }

    // ContentProtection node
    if (protection !== undefined) {
      protectionHeader = xmlDoc.getElementsByTagName('ProtectionHeader')[0];

      // Some packagers put newlines into the ProtectionHeader base64 string, which is not good
      // because this cannot be correctly parsed. Let's just filter out any newlines found in there.
      protectionHeader.firstChild.data = protectionHeader.firstChild.data.replace(/\n|\r/g, '');

      // Get KID (in CENC format) from protection header
      KID = getKIDFromProtectionHeader(protectionHeader);

      // Create ContentProtection for PlayReady
      contentProtection = createPRContentProtection(protectionHeader);
      contentProtection['cenc:default_KID'] = KID;
      contentProtections.push(contentProtection);

      // Create ContentProtection for Widevine (as a CENC protection)
      contentProtection = createWidevineContentProtection(KID);
      contentProtection['cenc:default_KID'] = KID;
      contentProtections.push(contentProtection);
      manifest.ContentProtection = contentProtections;
    }
    adaptations = period.AdaptationSet;
    for (i = 0; i < adaptations.length; i += 1) {
      adaptations[i].SegmentTemplate.initialization = '$Bandwidth$';
      // Propagate content protection information into each adaptation
      if (manifest.ContentProtection !== undefined) {
        adaptations[i].ContentProtection = manifest.ContentProtection;
        adaptations[i].ContentProtection = manifest.ContentProtection;
      }
      if (adaptations[i].contentType === 'video') {
        // Get video segment duration
        segmentDuration = adaptations[i].SegmentTemplate.SegmentTimeline.S[0].d / adaptations[i].SegmentTemplate.timescale;
        // Set minBufferTime to one segment duration
        manifest.minBufferTime = segmentDuration;
        if (manifest.type === 'dynamic') {
          // Match timeShiftBufferDepth to video segment timeline duration
          if (manifest.timeShiftBufferDepth > 0 && manifest.timeShiftBufferDepth !== Infinity && manifest.timeShiftBufferDepth > adaptations[i].SegmentTemplate.SegmentTimeline.duration) {
            manifest.timeShiftBufferDepth = adaptations[i].SegmentTemplate.SegmentTimeline.duration;
          }
        }
      }
    }

    // Cap minBufferTime to timeShiftBufferDepth
    manifest.minBufferTime = Math.min(manifest.minBufferTime, manifest.timeShiftBufferDepth ? manifest.timeShiftBufferDepth : Infinity);

    // In case of live streams:
    // 1- configure player buffering properties according to target live delay
    // 2- adapt live delay and then buffers length in case timeShiftBufferDepth is too small compared to target live delay (see PlaybackController.computeLiveDelay())
    // 3- Set retry attempts and intervals for FragmentInfo requests
    if (manifest.type === 'dynamic') {
      let targetLiveDelay = settings.get().streaming.delay.liveDelay;
      if (!targetLiveDelay) {
        const liveDelayFragmentCount = settings.get().streaming.delay.liveDelayFragmentCount !== null && !isNaN(settings.get().streaming.delay.liveDelayFragmentCount) ? settings.get().streaming.delay.liveDelayFragmentCount : 4;
        targetLiveDelay = segmentDuration * liveDelayFragmentCount;
      }
      let targetDelayCapping = Math.max(manifest.timeShiftBufferDepth - 10 /*END_OF_PLAYLIST_PADDING*/, manifest.timeShiftBufferDepth / 2);
      let liveDelay = Math.min(targetDelayCapping, targetLiveDelay);
      // Consider a margin of more than one segment in order to avoid Precondition Failed errors (412), for example if audio and video are not correctly synchronized
      let bufferTime = liveDelay - segmentDuration * 1.5;

      // Store initial buffer settings
      initialBufferSettings = {
        'streaming': {
          'buffer': {
            'bufferTimeDefault': settings.get().streaming.buffer.bufferTimeDefault,
            'bufferTimeAtTopQuality': settings.get().streaming.buffer.bufferTimeAtTopQuality,
            'bufferTimeAtTopQualityLongForm': settings.get().streaming.buffer.bufferTimeAtTopQualityLongForm
          },
          'timeShiftBuffer': {
            calcFromSegmentTimeline: settings.get().streaming.timeShiftBuffer.calcFromSegmentTimeline
          },
          'delay': {
            'liveDelay': settings.get().streaming.delay.liveDelay
          }
        }
      };
      settings.update({
        'streaming': {
          'buffer': {
            'bufferTimeDefault': bufferTime,
            'bufferTimeAtTopQuality': bufferTime,
            'bufferTimeAtTopQualityLongForm': bufferTime
          },
          'timeShiftBuffer': {
            calcFromSegmentTimeline: true
          },
          'delay': {
            'liveDelay': liveDelay
          }
        }
      });
    }

    // Delete Content Protection under root manifest node
    delete manifest.ContentProtection;

    // In case of VOD streams, check if start time is greater than 0
    // Then determine timestamp offset according to higher audio/video start time
    // (use case = live stream delinearization)
    if (manifest.type === 'static') {
      // In case of start-over stream and manifest reloading (due to track switch)
      // we consider previous timestampOffset to keep timelines synchronized
      var prevManifest = manifestModel.getValue();
      if (prevManifest && prevManifest.timestampOffset) {
        timestampOffset = prevManifest.timestampOffset;
      } else {
        for (i = 0; i < adaptations.length; i++) {
          if (adaptations[i].contentType === constants.AUDIO || adaptations[i].contentType === constants.VIDEO) {
            segments = adaptations[i].SegmentTemplate.SegmentTimeline.S;
            startTime = segments[0].t;
            if (timestampOffset === undefined) {
              timestampOffset = startTime;
            }
            timestampOffset = Math.min(timestampOffset, startTime);
            // Correct content duration according to minimum adaptation's segment timeline duration
            // in order to force <video> element sending 'ended' event
            manifest.mediaPresentationDuration = Math.min(manifest.mediaPresentationDuration, adaptations[i].SegmentTemplate.SegmentTimeline.duration);
          }
        }
      }
      if (timestampOffset > 0) {
        // Patch segment templates timestamps and determine period start time (since audio/video should not be aligned to 0)
        manifest.timestampOffset = timestampOffset;
        for (i = 0; i < adaptations.length; i++) {
          segments = adaptations[i].SegmentTemplate.SegmentTimeline.S;
          for (j = 0; j < segments.length; j++) {
            if (!segments[j].tManifest) {
              segments[j].tManifest = segments[j].t.toString();
            }
            segments[j].t -= timestampOffset;
          }
          if (adaptations[i].contentType === constants.AUDIO || adaptations[i].contentType === constants.VIDEO) {
            period.start = Math.max(segments[0].t, period.start);
            adaptations[i].SegmentTemplate.presentationTimeOffset = period.start;
          }
        }
        period.start /= manifest.timescale;
      }
    }

    // Floor the duration to get around precision differences between segments timestamps and MSE buffer timestamps
    // and then avoid 'ended' event not being raised
    manifest.mediaPresentationDuration = Math.floor(manifest.mediaPresentationDuration * 1000) / 1000;
    period.duration = manifest.mediaPresentationDuration;
    return manifest;
  }
  function parseDOM(data) {
    let xmlDoc = null;
    if (window.DOMParser) {
      const parser = new window.DOMParser();
      xmlDoc = parser.parseFromString(data, 'text/xml');
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('parsing the manifest failed');
      }
    }
    return xmlDoc;
  }
  function getIron() {
    return null;
  }
  function internalParse(data) {
    let xmlDoc = null;
    let manifest = null;
    const startTime = window.performance.now();

    // Parse the MSS XML manifest
    xmlDoc = parseDOM(data);
    const xmlParseTime = window.performance.now();
    if (xmlDoc === null) {
      return null;
    }

    // Convert MSS manifest into DASH manifest
    manifest = processManifest(xmlDoc, new Date());
    const mss2dashTime = window.performance.now();
    logger.info('Parsing complete: (xmlParsing: ' + (xmlParseTime - startTime).toPrecision(3) + 'ms, mss2dash: ' + (mss2dashTime - xmlParseTime).toPrecision(3) + 'ms, total: ' + ((mss2dashTime - startTime) / 1000).toPrecision(3) + 's)');
    return manifest;
  }
  function reset() {
    // Restore initial buffer settings
    if (initialBufferSettings) {
      settings.update(initialBufferSettings);
    }
  }
  instance = {
    parse: internalParse,
    getIron: getIron,
    reset: reset
  };
  setup();
  return instance;
}
MssParser.__dashjs_factory_name = 'MssParser';
/* harmony default export */ __webpack_exports__["default"] = (_core_FactoryMaker_js__WEBPACK_IMPORTED_MODULE_1__["default"].getClassFactory(MssParser));

/***/ }),

/***/ "./src/streaming/MediaPlayerEvents.js":
/*!********************************************!*\
  !*** ./src/streaming/MediaPlayerEvents.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_events_EventsBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/events/EventsBase.js */ "./src/core/events/EventsBase.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @class
 * @implements EventsBase
 */
class MediaPlayerEvents extends _core_events_EventsBase_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @description Public facing external events to be used when developing a player that implements dash.js.
   */
  constructor() {
    super();
    /**
     * Triggered when playback will not start yet
     * as the MPD's availabilityStartTime is in the future.
     * Check delay property in payload to determine time before playback will start.
     * @event MediaPlayerEvents#AST_IN_FUTURE
     */
    this.AST_IN_FUTURE = 'astInFuture';

    /**
     * Triggered when the BaseURLs have been updated.
     * @event MediaPlayerEvents#BASE_URLS_UPDATED
     */
    this.BASE_URLS_UPDATED = 'baseUrlsUpdated';

    /**
     * Triggered when the video element's buffer state changes to stalled.
     * Check mediaType in payload to determine type (Video, Audio, FragmentedText).
     * @event MediaPlayerEvents#BUFFER_EMPTY
     */
    this.BUFFER_EMPTY = 'bufferStalled';

    /**
     * Triggered when the video element's buffer state changes to loaded.
     * Check mediaType in payload to determine type (Video, Audio, FragmentedText).
     * @event MediaPlayerEvents#BUFFER_LOADED
     */
    this.BUFFER_LOADED = 'bufferLoaded';

    /**
     * Triggered when the video element's buffer state changes, either stalled or loaded. Check payload for state.
     * @event MediaPlayerEvents#BUFFER_LEVEL_STATE_CHANGED
     */
    this.BUFFER_LEVEL_STATE_CHANGED = 'bufferStateChanged';

    /**
     * Triggered when the buffer level of a media type has been updated
     * @event MediaPlayerEvents#BUFFER_LEVEL_UPDATED
     */
    this.BUFFER_LEVEL_UPDATED = 'bufferLevelUpdated';

    /**
     * Triggered when a font signalled by a DVB Font Download has been added to the document FontFaceSet interface.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_ADDED
     */
    this.DVB_FONT_DOWNLOAD_ADDED = 'dvbFontDownloadAdded';

    /**
     * Triggered when a font signalled by a DVB Font Download has successfully downloaded and the FontFace can be used.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_COMPLETE
     */
    this.DVB_FONT_DOWNLOAD_COMPLETE = 'dvbFontDownloadComplete';

    /**
     * Triggered when a font signalled by a DVB Font Download could not be successfully downloaded, so the FontFace will not be used.
     * @event MediaPlayerEvents#DVB_FONT_DOWNLOAD_FAILED
     */
    this.DVB_FONT_DOWNLOAD_FAILED = 'dvbFontDownloadFailed';

    /**
     * Triggered when a dynamic stream changed to static (transition phase between Live and On-Demand).
     * @event MediaPlayerEvents#DYNAMIC_TO_STATIC
     */
    this.DYNAMIC_TO_STATIC = 'dynamicToStatic';

    /**
     * Triggered when there is an error from the element or MSE source buffer.
     * @event MediaPlayerEvents#ERROR
     */
    this.ERROR = 'error';
    /**
     * Triggered when a fragment download has completed.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_COMPLETED
     */
    this.FRAGMENT_LOADING_COMPLETED = 'fragmentLoadingCompleted';

    /**
     * Triggered when a partial fragment download has completed.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_PROGRESS
     */
    this.FRAGMENT_LOADING_PROGRESS = 'fragmentLoadingProgress';
    /**
     * Triggered when a fragment download has started.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_STARTED
     */
    this.FRAGMENT_LOADING_STARTED = 'fragmentLoadingStarted';

    /**
     * Triggered when a fragment download is abandoned due to detection of slow download base on the ABR abandon rule..
     * @event MediaPlayerEvents#FRAGMENT_LOADING_ABANDONED
     */
    this.FRAGMENT_LOADING_ABANDONED = 'fragmentLoadingAbandoned';

    /**
     * Triggered when {@link module:Debug} logger methods are called.
     * @event MediaPlayerEvents#LOG
     */
    this.LOG = 'log';

    /**
     * Triggered when the manifest load is started
     * @event MediaPlayerEvents#MANIFEST_LOADING_STARTED
     */
    this.MANIFEST_LOADING_STARTED = 'manifestLoadingStarted';

    /**
     * Triggered when the manifest loading is finished, providing the request object information
     * @event MediaPlayerEvents#MANIFEST_LOADING_FINISHED
     */
    this.MANIFEST_LOADING_FINISHED = 'manifestLoadingFinished';

    /**
     * Triggered when the manifest load is complete, providing the payload
     * @event MediaPlayerEvents#MANIFEST_LOADED
     */
    this.MANIFEST_LOADED = 'manifestLoaded';

    /**
     * Triggered anytime there is a change to the overall metrics.
     * @event MediaPlayerEvents#METRICS_CHANGED
     */
    this.METRICS_CHANGED = 'metricsChanged';

    /**
     * Triggered when an individual metric is added, updated or cleared.
     * @event MediaPlayerEvents#METRIC_CHANGED
     */
    this.METRIC_CHANGED = 'metricChanged';

    /**
     * Triggered every time a new metric is added.
     * @event MediaPlayerEvents#METRIC_ADDED
     */
    this.METRIC_ADDED = 'metricAdded';

    /**
     * Triggered every time a metric is updated.
     * @event MediaPlayerEvents#METRIC_UPDATED
     */
    this.METRIC_UPDATED = 'metricUpdated';

    /**
     * Triggered when a new stream (period) starts.
     * @event MediaPlayerEvents#PERIOD_SWITCH_STARTED
     */
    this.PERIOD_SWITCH_STARTED = 'periodSwitchStarted';

    /**
     * Triggered at the stream end of a period.
     * @event MediaPlayerEvents#PERIOD_SWITCH_COMPLETED
     */
    this.PERIOD_SWITCH_COMPLETED = 'periodSwitchCompleted';

    /**
     * Triggered when an ABR up /down switch is initiated; either by user in manual mode or auto mode via ABR rules.
     * @event MediaPlayerEvents#QUALITY_CHANGE_REQUESTED
     */
    this.QUALITY_CHANGE_REQUESTED = 'qualityChangeRequested';

    /**
     * Triggered when the new ABR quality is being rendered on-screen.
     * @event MediaPlayerEvents#QUALITY_CHANGE_RENDERED
     */
    this.QUALITY_CHANGE_RENDERED = 'qualityChangeRendered';

    /**
     * Triggered when the new track is being selected
     * @event MediaPlayerEvents#NEW_TRACK_SELECTED
     */
    this.NEW_TRACK_SELECTED = 'newTrackSelected';

    /**
     * Triggered when the new track is being rendered.
     * @event MediaPlayerEvents#TRACK_CHANGE_RENDERED
     */
    this.TRACK_CHANGE_RENDERED = 'trackChangeRendered';

    /**
     * Triggered when a stream (period) is being loaded
     * @event MediaPlayerEvents#STREAM_INITIALIZING
     */
    this.STREAM_INITIALIZING = 'streamInitializing';

    /**
     * Triggered when a stream (period) is loaded
     * @event MediaPlayerEvents#STREAM_UPDATED
     */
    this.STREAM_UPDATED = 'streamUpdated';

    /**
     * Triggered when a stream (period) is activated
     * @event MediaPlayerEvents#STREAM_ACTIVATED
     */
    this.STREAM_ACTIVATED = 'streamActivated';

    /**
     * Triggered when a stream (period) is deactivated
     * @event MediaPlayerEvents#STREAM_DEACTIVATED
     */
    this.STREAM_DEACTIVATED = 'streamDeactivated';

    /**
     * Triggered when a stream (period) is activated
     * @event MediaPlayerEvents#STREAM_INITIALIZED
     */
    this.STREAM_INITIALIZED = 'streamInitialized';

    /**
     * Triggered when the player has been reset.
     * @event MediaPlayerEvents#STREAM_TEARDOWN_COMPLETE
     */
    this.STREAM_TEARDOWN_COMPLETE = 'streamTeardownComplete';

    /**
     * Triggered once all text tracks detected in the MPD are added to the video element.
     * @event MediaPlayerEvents#TEXT_TRACKS_ADDED
     */
    this.TEXT_TRACKS_ADDED = 'allTextTracksAdded';

    /**
     * Triggered when a text track is added to the video element's TextTrackList
     * @event MediaPlayerEvents#TEXT_TRACK_ADDED
     */
    this.TEXT_TRACK_ADDED = 'textTrackAdded';

    /**
     * Triggered when a text track should be shown
     * @event MediaPlayerEvents#CUE_ENTER
     */
    this.CUE_ENTER = 'cueEnter';

    /**
     * Triggered when a text track should be hidden
     * @event MediaPlayerEvents#CUE_ENTER
     */
    this.CUE_EXIT = 'cueExit';

    /**
     * Triggered when a throughput measurement based on the last segment request has been stored
     * @event MediaPlayerEvents#THROUGHPUT_MEASUREMENT_STORED
     */
    this.THROUGHPUT_MEASUREMENT_STORED = 'throughputMeasurementStored';

    /**
     * Triggered when a ttml chunk is parsed.
     * @event MediaPlayerEvents#TTML_PARSED
     */
    this.TTML_PARSED = 'ttmlParsed';

    /**
     * Triggered when a ttml chunk has to be parsed.
     * @event MediaPlayerEvents#TTML_TO_PARSE
     */
    this.TTML_TO_PARSE = 'ttmlToParse';

    /**
     * Triggered when a caption is rendered.
     * @event MediaPlayerEvents#CAPTION_RENDERED
     */
    this.CAPTION_RENDERED = 'captionRendered';

    /**
     * Triggered when the caption container is resized.
     * @event MediaPlayerEvents#CAPTION_CONTAINER_RESIZE
     */
    this.CAPTION_CONTAINER_RESIZE = 'captionContainerResize';

    /**
     * Sent when enough data is available that the media can be played,
     * at least for a couple of frames.  This corresponds to the
     * HAVE_ENOUGH_DATA readyState.
     * @event MediaPlayerEvents#CAN_PLAY
     */
    this.CAN_PLAY = 'canPlay';

    /**
     * This corresponds to the CAN_PLAY_THROUGH readyState.
     * @event MediaPlayerEvents#CAN_PLAY_THROUGH
     */
    this.CAN_PLAY_THROUGH = 'canPlayThrough';

    /**
     * Sent when playback completes.
     * @event MediaPlayerEvents#PLAYBACK_ENDED
     */
    this.PLAYBACK_ENDED = 'playbackEnded';

    /**
     * Sent when an error occurs.  The element's error
     * attribute contains more information.
     * @event MediaPlayerEvents#PLAYBACK_ERROR
     */
    this.PLAYBACK_ERROR = 'playbackError';

    /**
     * This event is fired once the playback has been initialized by MediaPlayer.js.
     * After that event methods such as setTextTrack() can be used.
     * @event MediaPlayerEvents#PLAYBACK_INITIALIZED
     */
    this.PLAYBACK_INITIALIZED = 'playbackInitialized';

    /**
     * Sent when playback is not allowed (for example if user gesture is needed).
     * @event MediaPlayerEvents#PLAYBACK_NOT_ALLOWED
     */
    this.PLAYBACK_NOT_ALLOWED = 'playbackNotAllowed';

    /**
     * The media's metadata has finished loading; all attributes now
     * contain as much useful information as they're going to.
     * @event MediaPlayerEvents#PLAYBACK_METADATA_LOADED
     */
    this.PLAYBACK_METADATA_LOADED = 'playbackMetaDataLoaded';

    /**
     * The event is fired when the frame at the current playback position of the media has finished loading;
     * often the first frame
     * @event MediaPlayerEvents#PLAYBACK_LOADED_DATA
     */
    this.PLAYBACK_LOADED_DATA = 'playbackLoadedData';

    /**
     * Sent when playback is paused.
     * @event MediaPlayerEvents#PLAYBACK_PAUSED
     */
    this.PLAYBACK_PAUSED = 'playbackPaused';

    /**
     * Sent when the media begins to play (either for the first time, after having been paused,
     * or after ending and then restarting).
     *
     * @event MediaPlayerEvents#PLAYBACK_PLAYING
     */
    this.PLAYBACK_PLAYING = 'playbackPlaying';

    /**
     * Sent periodically to inform interested parties of progress downloading
     * the media. Information about the current amount of the media that has
     * been downloaded is available in the media element's buffered attribute.
     * @event MediaPlayerEvents#PLAYBACK_PROGRESS
     */
    this.PLAYBACK_PROGRESS = 'playbackProgress';

    /**
     * Sent when the playback speed changes.
     * @event MediaPlayerEvents#PLAYBACK_RATE_CHANGED
     */
    this.PLAYBACK_RATE_CHANGED = 'playbackRateChanged';

    /**
     * Sent when a seek operation completes.
     * @event MediaPlayerEvents#PLAYBACK_SEEKED
     */
    this.PLAYBACK_SEEKED = 'playbackSeeked';

    /**
     * Sent when a seek operation begins.
     * @event MediaPlayerEvents#PLAYBACK_SEEKING
     */
    this.PLAYBACK_SEEKING = 'playbackSeeking';

    /**
     * Sent when the video element reports stalled
     * @event MediaPlayerEvents#PLAYBACK_STALLED
     */
    this.PLAYBACK_STALLED = 'playbackStalled';

    /**
     * Sent when playback of the media starts after having been paused;
     * that is, when playback is resumed after a prior pause event.
     *
     * @event MediaPlayerEvents#PLAYBACK_STARTED
     */
    this.PLAYBACK_STARTED = 'playbackStarted';

    /**
     * The time indicated by the element's currentTime attribute has changed.
     * @event MediaPlayerEvents#PLAYBACK_TIME_UPDATED
     */
    this.PLAYBACK_TIME_UPDATED = 'playbackTimeUpdated';

    /**
     * Sent when the video element reports that the volume has changed
     * @event MediaPlayerEvents#PLAYBACK_VOLUME_CHANGED
     */
    this.PLAYBACK_VOLUME_CHANGED = 'playbackVolumeChanged';

    /**
     * Sent when the media playback has stopped because of a temporary lack of data.
     *
     * @event MediaPlayerEvents#PLAYBACK_WAITING
     */
    this.PLAYBACK_WAITING = 'playbackWaiting';

    /**
     * Manifest validity changed - As a result of an MPD validity expiration event.
     * @event MediaPlayerEvents#MANIFEST_VALIDITY_CHANGED
     */
    this.MANIFEST_VALIDITY_CHANGED = 'manifestValidityChanged';

    /**
     * Dash events are triggered at their respective start points on the timeline.
     * @event MediaPlayerEvents#EVENT_MODE_ON_START
     */
    this.EVENT_MODE_ON_START = 'eventModeOnStart';

    /**
     * Dash events are triggered as soon as they were parsed.
     * @event MediaPlayerEvents#EVENT_MODE_ON_RECEIVE
     */
    this.EVENT_MODE_ON_RECEIVE = 'eventModeOnReceive';

    /**
     * Event that is dispatched whenever the player encounters a potential conformance validation that might lead to unexpected/not optimal behavior
     * @event MediaPlayerEvents#CONFORMANCE_VIOLATION
     */
    this.CONFORMANCE_VIOLATION = 'conformanceViolation';

    /**
     * Event that is dispatched whenever the player switches to a different representation
     * @event MediaPlayerEvents#REPRESENTATION_SWITCH
     */
    this.REPRESENTATION_SWITCH = 'representationSwitch';

    /**
     * Event that is dispatched whenever an adaptation set is removed due to all representations not being supported.
     * @event MediaPlayerEvents#ADAPTATION_SET_REMOVED_NO_CAPABILITIES
     */
    this.ADAPTATION_SET_REMOVED_NO_CAPABILITIES = 'adaptationSetRemovedNoCapabilities';

    /**
     * Triggered when a content steering request has completed.
     * @event MediaPlayerEvents#CONTENT_STEERING_REQUEST_COMPLETED
     */
    this.CONTENT_STEERING_REQUEST_COMPLETED = 'contentSteeringRequestCompleted';

    /**
     * Triggered when an inband prft (ProducerReferenceTime) boxes has been received.
     * @event MediaPlayerEvents#INBAND_PRFT
     */
    this.INBAND_PRFT = 'inbandPrft';

    /**
     * The streaming attribute of the Managed Media Source is true
     * @type {string}
     */
    this.MANAGED_MEDIA_SOURCE_START_STREAMING = 'managedMediaSourceStartStreaming';

    /**
     * The streaming attribute of the Managed Media Source is false
     * @type {string}
     */
    this.MANAGED_MEDIA_SOURCE_END_STREAMING = 'managedMediaSourceEndStreaming';
  }
}
let mediaPlayerEvents = new MediaPlayerEvents();
/* harmony default export */ __webpack_exports__["default"] = (mediaPlayerEvents);

/***/ }),

/***/ "./src/streaming/constants/ProtectionConstants.js":
/*!********************************************************!*\
  !*** ./src/streaming/constants/ProtectionConstants.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, LOSS OF USE, DATA, OR
 *  PROFITS, OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Protection Constants declaration
 * @ignore
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  CLEARKEY_KEYSTEM_STRING: 'org.w3.clearkey',
  WIDEVINE_KEYSTEM_STRING: 'com.widevine.alpha',
  PLAYREADY_KEYSTEM_STRING: 'com.microsoft.playready',
  PLAYREADY_RECOMMENDATION_KEYSTEM_STRING: 'com.microsoft.playready.recommendation',
  WIDEVINE_UUID: 'edef8ba9-79d6-4ace-a3c8-27dcd51d21ed',
  PLAYREADY_UUID: '9a04f079-9840-4286-ab92-e65be0885f95',
  CLEARKEY_UUID: 'e2719d58-a985-b3c9-781a-b030af78d30e',
  W3C_CLEARKEY_UUID: '1077efec-c0b2-4d02-ace3-3c1e52e2fb4b',
  INITIALIZATION_DATA_TYPE_CENC: 'cenc',
  INITIALIZATION_DATA_TYPE_KEYIDS: 'keyids',
  INITIALIZATION_DATA_TYPE_WEBM: 'webm',
  ENCRYPTION_SCHEME_CENC: 'cenc',
  ENCRYPTION_SCHEME_CBCS: 'cbcs',
  MEDIA_KEY_MESSAGE_TYPES: {
    LICENSE_REQUEST: 'license-request',
    LICENSE_RENEWAL: 'license-renewal',
    LICENSE_RELEASE: 'license-release',
    INDIVIDUALIZATION_REQUEST: 'individualization-request'
  },
  ROBUSTNESS_STRINGS: {
    WIDEVINE: {
      SW_SECURE_CRYPTO: 'SW_SECURE_CRYPTO',
      SW_SECURE_DECODE: 'SW_SECURE_DECODE',
      HW_SECURE_CRYPTO: 'HW_SECURE_CRYPTO',
      HW_SECURE_DECODE: 'HW_SECURE_DECODE',
      HW_SECURE_ALL: 'HW_SECURE_ALL'
    }
  },
  MEDIA_KEY_STATUSES: {
    USABLE: 'usable',
    EXPIRED: 'expired',
    RELEASED: 'released',
    OUTPUT_RESTRICTED: 'output-restricted',
    OUTPUT_DOWNSCALED: 'output-downscaled',
    STATUS_PENDING: 'status-pending',
    INTERNAL_ERROR: 'internal-error'
  }
});

/***/ }),

/***/ "./src/streaming/vo/DashJSError.js":
/*!*****************************************!*\
  !*** ./src/streaming/vo/DashJSError.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
class DashJSError {
  constructor(code, message, data) {
    this.code = code || null;
    this.message = message || null;
    this.data = data || null;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (DashJSError);

/***/ }),

/***/ "./src/streaming/vo/DataChunk.js":
/*!***************************************!*\
  !*** ./src/streaming/vo/DataChunk.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */
class DataChunk {
  //Represents a data structure that keep all the necessary info about a single init/media segment
  constructor() {
    this.streamId = null;
    this.segmentType = null;
    this.index = NaN;
    this.bytes = null;
    this.start = NaN;
    this.end = NaN;
    this.duration = NaN;
    this.representation = null;
    this.endFragment = null;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (DataChunk);

/***/ }),

/***/ "./src/streaming/vo/FragmentRequest.js":
/*!*********************************************!*\
  !*** ./src/streaming/vo/FragmentRequest.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metrics/HTTPRequest.js */ "./src/streaming/vo/metrics/HTTPRequest.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



/**
 * @class
 * @ignore
 */
class FragmentRequest {
  constructor(url) {
    this.action = FragmentRequest.ACTION_DOWNLOAD;
    this.availabilityEndTime = null;
    this.availabilityStartTime = null;
    this.bandwidth = NaN;
    this.bytesLoaded = NaN;
    this.bytesTotal = NaN;
    this.delayLoadingTime = NaN;
    this.duration = NaN;
    this.endDate = null;
    this.firstByteDate = null;
    this.index = NaN;
    this.mediaStartTime = NaN;
    this.mediaType = null;
    this.range = null;
    this.representation = null;
    this.responseType = 'arraybuffer';
    this.retryAttempts = 0;
    this.serviceLocation = null;
    this.startDate = null;
    this.startTime = NaN;
    this.timescale = NaN;
    this.type = null;
    this.url = url || null;
    this.wallStartTime = null;
  }
  isInitializationRequest() {
    return this.type && this.type === _metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_0__.HTTPRequest.INIT_SEGMENT_TYPE;
  }
  setInfo(info) {
    this.type = info && info.init ? _metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_0__.HTTPRequest.INIT_SEGMENT_TYPE : _metrics_HTTPRequest_js__WEBPACK_IMPORTED_MODULE_0__.HTTPRequest.MEDIA_SEGMENT_TYPE;
    this.url = info && info.url ? info.url : null;
    this.range = info && info.range ? info.range.start + '-' + info.range.end : null;
    this.mediaType = info && info.mediaType ? info.mediaType : null;
    this.representation = info && info.representation ? info.representation : null;
  }
}
FragmentRequest.ACTION_DOWNLOAD = 'download';
FragmentRequest.ACTION_COMPLETE = 'complete';
/* harmony default export */ __webpack_exports__["default"] = (FragmentRequest);

/***/ }),

/***/ "./src/streaming/vo/metrics/HTTPRequest.js":
/*!*************************************************!*\
  !*** ./src/streaming/vo/metrics/HTTPRequest.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTTPRequest: function() { return /* binding */ HTTPRequest; },
/* harmony export */   HTTPRequestTrace: function() { return /* binding */ HTTPRequestTrace; }
/* harmony export */ });
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @classdesc This Object holds reference to the HTTPRequest for manifest, fragment and xlink loading.
 * Members which are not defined in ISO23009-1 Annex D should be prefixed by a _ so that they are ignored
 * by Metrics Reporting code.
 * @ignore
 */
class HTTPRequest {
  /**
   * @class
   */
  constructor() {
    /**
     * Identifier of the TCP connection on which the HTTP request was sent.
     * @public
     */
    this.tcpid = null;
    /**
     * This is an optional parameter and should not be included in HTTP request/response transactions for progressive download.
     * The type of the request:
     * - MPD
     * - XLink expansion
     * - Initialization Fragment
     * - Index Fragment
     * - Media Fragment
     * - Bitstream Switching Fragment
     * - other
     * @public
     */
    this.type = null;
    /**
     * The original URL (before any redirects or failures)
     * @public
     */
    this.url = null;
    /**
     * The actual URL requested, if different from above
     * @public
     */
    this.actualurl = null;
    /**
     * The contents of the byte-range-spec part of the HTTP Range header.
     * @public
     */
    this.range = null;
    /**
     * Real-Time | The real time at which the request was sent.
     * @public
     */
    this.trequest = null;
    /**
     * Real-Time | The real time at which the first byte of the response was received.
     * @public
     */
    this.tresponse = null;
    /**
     * The HTTP response code.
     * @public
     */
    this.responsecode = null;
    /**
     * The duration of the throughput trace intervals (ms), for successful requests only.
     * @public
     */
    this.interval = null;
    /**
     * Throughput traces, for successful requests only.
     * @public
     */
    this.trace = [];
    /**
     * The CMSD static and dynamic values retrieved from CMSD response headers.
     * @public
     */
    this.cmsd = null;

    /**
     * Type of stream ("audio" | "video" etc..)
     * @public
     */
    this._stream = null;
    /**
     * Real-Time | The real time at which the request finished.
     * @public
     */
    this._tfinish = null;
    /**
     * The duration of the media requests, if available, in seconds.
     * @public
     */
    this._mediaduration = null;
    /**
     * all the response headers from request.
     * @public
     */
    this._responseHeaders = null;
    /**
     * The selected service location for the request. string.
     * @public
     */
    this._serviceLocation = null;
    /**
     * The type of the loader that was used. Distinguish between fetch loader and xhr loader
     */
    this._fileLoaderType = null;
    /**
     * The values derived from the ResourceTimingAPI.
     */
    this._resourceTimingValues = null;
  }
}

/**
 * @classdesc This Object holds reference to the progress of the HTTPRequest.
 * @ignore
 */
class HTTPRequestTrace {
  /**
   * @class
   */
  constructor() {
    /**
     * Real-Time | Measurement stream start.
     * @public
     */
    this.s = null;
    /**
     * Measurement stream duration (ms).
     * @public
     */
    this.d = null;
    /**
     * List of integers counting the bytes received in each trace interval within the measurement stream.
     * @public
     */
    this.b = [];
  }
}
HTTPRequest.GET = 'GET';
HTTPRequest.HEAD = 'HEAD';
HTTPRequest.MPD_TYPE = 'MPD';
HTTPRequest.XLINK_EXPANSION_TYPE = 'XLinkExpansion';
HTTPRequest.INIT_SEGMENT_TYPE = 'InitializationSegment';
HTTPRequest.INDEX_SEGMENT_TYPE = 'IndexSegment';
HTTPRequest.MEDIA_SEGMENT_TYPE = 'MediaSegment';
HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE = 'BitstreamSwitchingSegment';
HTTPRequest.MSS_FRAGMENT_INFO_SEGMENT_TYPE = 'FragmentInfoSegment';
HTTPRequest.DVB_REPORTING_TYPE = 'DVBReporting';
HTTPRequest.LICENSE = 'license';
HTTPRequest.CONTENT_STEERING_TYPE = 'ContentSteering';
HTTPRequest.OTHER_TYPE = 'other';


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/mss/index.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MssHandler: function() { return /* reexport safe */ _MssHandler_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _MssHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MssHandler.js */ "./src/mss/MssHandler.js");
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */



// Shove both of these into the global scope
var context = typeof window !== 'undefined' && window || global;
var mss_dashjs = context.dashjs;
if (!mss_dashjs) {
  mss_dashjs = context.dashjs = {};
}
mss_dashjs.MssHandler = _MssHandler_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ __webpack_exports__["default"] = (mss_dashjs);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=dash.mss.debug.js.map