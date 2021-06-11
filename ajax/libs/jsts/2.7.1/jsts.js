/**
 * JSTS. See https://github.com/bjornharrtell/jsts
 * https://github.com/bjornharrtell/jsts/blob/master/LICENSE_EDLv1.txt
 * https://github.com/bjornharrtell/jsts/blob/master/LICENSE_EPLv1.txt
 * @license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jsts = {}));
}(this, (function (exports) { 'use strict';

  class NumberUtil {
    static equalsWithTolerance(x1, x2, tolerance) {
      return Math.abs(x1 - x2) <= tolerance;
    }

  }

  class Exception extends Error {
    constructor(message) {
      super(message);
      this.name = Object.keys({
        Exception
      })[0];
    }

    toString() {
      return this.message;
    }

  }

  class IllegalArgumentException extends Exception {
    constructor(message) {
      super(message);
      this.name = Object.keys({
        IllegalArgumentException
      })[0];
    }

  }

  class Long {
    constructor(high, low) {
      this.low = low || 0;
      this.high = high || 0;
    }

    static toBinaryString(i) {
      let mask;
      let result = '';

      for (mask = 0x80000000; mask > 0; mask >>>= 1) result += (i.high & mask) === mask ? '1' : '0';

      for (mask = 0x80000000; mask > 0; mask >>>= 1) result += (i.low & mask) === mask ? '1' : '0';

      return result;
    }

  }

  function Double() {}
  Double.NaN = NaN;

  Double.isNaN = n => Number.isNaN(n);

  Double.isInfinite = n => !Number.isFinite(n);

  Double.MAX_VALUE = Number.MAX_VALUE;
  Double.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
  Double.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
  if (typeof Float64Array === 'function' && typeof Int32Array === 'function') // Simple and fast conversion between double and long bits
    // using TypedArrays and ArrayViewBuffers.
    (function () {
      const EXP_BIT_MASK = 0x7ff00000;
      const SIGNIF_BIT_MASK = 0xFFFFF;
      const f64buf = new Float64Array(1);
      const i32buf = new Int32Array(f64buf.buffer);

      Double.doubleToLongBits = function (value) {
        f64buf[0] = value;
        let low = i32buf[0] | 0;
        let high = i32buf[1] | 0; // Check for NaN based on values of bit fields, maximum
        // exponent and nonzero significand.

        if ((high & EXP_BIT_MASK) === EXP_BIT_MASK && (high & SIGNIF_BIT_MASK) !== 0 && low !== 0) {
          low = 0 | 0;
          high = 0x7ff80000 | 0;
        }

        return new Long(high, low);
      };

      Double.longBitsToDouble = function (bits) {
        i32buf[0] = bits.low;
        i32buf[1] = bits.high;
        return f64buf[0];
      };
    })();else // More complex and slower fallback implementation using
    // math and the divide-by-two and multiply-by-two algorithms.
    (function () {
      const BIAS = 1023;
      const log2 = Math.log2;
      const floor = Math.floor;
      const pow = Math.pow;

      const MAX_REL_BITS_INTEGER = function () {
        for (let i = 53; i > 0; i--) {
          const bits = pow(2, i) - 1;
          if (floor(log2(bits)) + 1 === i) return bits;
        }

        return 0;
      }();

      Double.doubleToLongBits = function (value) {
        let x, y, f, bits, skip;
        let sign, exp, high, low; // Get the sign bit and absolute value.

        if (value < 0 || 1 / value === Number.NEGATIVE_INFINITY) {
          sign = 1 << 31;
          value = -value;
        } else {
          sign = 0;
        } // Handle some special values.


        if (value === 0) {
          // Handle zeros (+/-0).
          low = 0 | 0;
          high = sign; // exponent: 00..00, significand: 00..00

          return new Long(high, low);
        }

        if (value === Infinity) {
          // Handle infinity (only positive values for value possible).
          low = 0 | 0;
          high = sign | 0x7ff00000; // exponent: 11..11, significand: 00..00

          return new Long(high, low);
        }

        if (value !== value) {
          // eslint-disable-line
          // Handle NaNs (boiled down to only one distinct NaN).
          low = 0 | 0;
          high = 0x7ff80000; // exponent: 11..11, significand: 10..00

          return new Long(high, low);
        } // Preinitialize variables, that are not neccessarily set by
        // the algorithm.


        bits = 0;
        low = 0 | 0; // Get the (always positive) integer part of value.

        x = floor(value); // Process the integer part if it's greater than 1. Zero requires
        // no bits at all, 1 represents the implicit (hidden) leading bit,
        // which must not be written as well.

        if (x > 1) // If we can reliably determine the number of bits required for
          // the integer part,
          if (x <= MAX_REL_BITS_INTEGER) {
            // get the number of bits required to represent it minus 1
            bits = floor(log2(x));
            /* + 1 - 1 */
            // and simply copy/shift the integer bits into low and high.
            // That's much faster than the divide-by-two algorithm (saves
            // up to ~60%).
            // We always need to mask out the most significant bit, which
            // is the implicit (aka hidden) bit.

            if (bits <= 20) {
              // The simple case in which the integer fits into the
              // lower 20 bits of the high word is worth to be handled
              // separately (saves ~25%).
              low = 0 | 0;
              high = x << 20 - bits & 0xfffff;
            } else {
              // Here, the integer part is split into low and high.
              // Since its value may require more than 32 bits, we
              // cannot use bitwise operators (which implicitly cast
              // to Int32), but use arithmetic operators % and / to
              // get low and high parts. The uppper 20 bits go to high,
              // the remaining bits (in f) to low.
              f = bits - 20; // Like (1 << f) but safe with even more than 32 bits.

              y = pow(2, f);
              low = x % y << 32 - f;
              high = x / y & 0xfffff;
            }
          } else {
            // For greater values, we must use the much slower divide-by-two
            // algorithm. Bits are generated from right to left, that is from
            // least to most significant bit. For each bit, we left-shift both
            // low and high by one and carry bit #0 from high to #31 in low.
            // The next bit is then copied into bit #19 in high, the leftmost
            // bit of the double's significand.
            // Preserve x for later user, so work with f.
            f = x;
            low = 0 | 0;

            for (;;) {
              y = f / 2;
              f = floor(y);
              if (f === 0) // We just found the most signigicant (1-)bit, which
                // is the implicit bit and so, not stored in the double
                // value. So, it's time to leave the loop.
                break; // Count this bit, shift low and carry bit #0 from high.

              bits++;
              low >>>= 1;
              low |= (high & 0x1) << 31; // Shift high.

              high >>>= 1;
              if (y !== f) // Copy the new bit into bit #19 in high (only required if 1).
                high |= 0x80000;
            }
          } // Bias the exponent.

        exp = bits + BIAS; // If the integer part is zero, we've not yet seen the implicit
        // leading bit. Variable skip is later used while processing the
        // fractional part (if any).

        skip = x === 0; // Get fraction only into x.

        x = value - x; // If some significand bits are still left to be filled and
        // the fractional part is not zero, convert the fraction using
        // the multiply-by-2 algorithm.

        if (bits < 52 && x !== 0) {
          // Initialize 'buffer' f, into which newly created bits get
          // shifted from right to left.
          f = 0;

          for (;;) {
            y = x * 2;

            if (y >= 1) {
              // This is a new 1-bit. Add and count this bit, if not
              // prohibited by skip.
              x = y - 1;

              if (!skip) {
                f <<= 1;
                f |= 1;
                bits++;
              } else {
                // Otherwise, decrement the exponent and unset
                // skip, so that all following bits get written.
                exp--;
                skip = false;
              }
            } else {
              // This is a new 0-bit. Add and count this bit, if not
              // prohibited by skip.
              x = y;

              if (!skip) {
                f <<= 1;
                bits++;
              } else if (--exp === 0) {
                // Otherwise we've just decremented the exponent. If the
                // biased exponent is zero now (-1023), we process a
                // subnormal number, which has no impled leading 1-bit.
                // So, count this 0-bit and unset skip to write out
                // all the following bits.
                bits++;
                skip = false;
              }
            }

            if (bits === 20) {
              // When 20 bits have been created in total, we're done with
              // the high word. Copy the bits from 'buffer' f into high
              // and reset 'buffer' f. Following bits will end up in the
              // low word.
              high |= f;
              f = 0;
            } else if (bits === 52) {
              // When 52 bits have been created in total, we're done with
              // low word as well. Copy the bits from 'buffer' f into low
              // and exit the loop.
              low |= f;
              break;
            }

            if (y === 1) {
              // When y is exactly 1, there is no remainder and the process
              // is complete (the number is finite). Copy the bits from
              // 'buffer' f into either low or high and exit the loop.
              if (bits < 20) high |= f << 20 - bits;else if (bits < 52) low |= f << 52 - bits;
              break;
            }
          }
        } // Copy/shift the exponent and sign bits into the high word.


        high |= exp << 20;
        high |= sign;
        return new Long(high, low);
      };

      Double.longBitsToDouble = function (bits) {
        let i;
        let x, exp, fract;
        const high = bits.high;
        const low = bits.low; // Extract the sign.

        const sign = high & 1 << 31 ? -1 : 1; // Extract the unbiased exponent.

        exp = ((high & 0x7ff00000) >> 20) - BIAS; // Calculate the fraction from left to right. Start
        // off with the 20 lower bits from the high word.

        fract = 0;
        x = 1 << 19;

        for (i = 1; i <= 20; i++) {
          if (high & x) fract += pow(2, -i);
          x >>>= 1;
        } // Continue with all 32 bits from the low word.


        x = 1 << 31;

        for (i = 21; i <= 52; i++) {
          if (low & x) fract += pow(2, -i);
          x >>>= 1;
        } // Handle special values.
        // Check for zero and subnormal values.


        if (exp === -BIAS) {
          if (fract === 0) // +/-1.0 * 0.0 => +/-0.0
            return sign * 0;
          exp = -1022;
        } else if (exp === BIAS + 1) {
          // Check for +/-Infinity or NaN.
          if (fract === 0) // +/-1.0 / 0.0 => +/-Infinity
            return sign / 0;
          return NaN;
        } else {
          // Nothing special? Seems to be a normal number.
          // Add the implicit leading bit (1*2^0).
          fract += 1;
        }

        return sign * fract * pow(2, exp);
      };
    })();

  function Comparable() {}

  function Clonable() {}

  function Comparator() {}

  function Serializable() {}

  class RuntimeException extends Exception {
    constructor(message) {
      super(message);
      this.name = Object.keys({
        RuntimeException
      })[0];
    }

  }

  class AssertionFailedException extends RuntimeException {
    constructor() {
      super();
      AssertionFailedException.constructor_.apply(this, arguments);
    }

    static constructor_() {
      if (arguments.length === 0) {
        RuntimeException.constructor_.call(this);
      } else if (arguments.length === 1) {
        const message = arguments[0];
        RuntimeException.constructor_.call(this, message);
      }
    }

  }

  class Assert {
    static shouldNeverReachHere() {
      if (arguments.length === 0) {
        Assert.shouldNeverReachHere(null);
      } else if (arguments.length === 1) {
        const message = arguments[0];
        throw new AssertionFailedException('Should never reach here' + (message !== null ? ': ' + message : ''));
      }
    }

    static isTrue() {
      if (arguments.length === 1) {
        const assertion = arguments[0];
        Assert.isTrue(assertion, null);
      } else if (arguments.length === 2) {
        const assertion = arguments[0],
              message = arguments[1];
        if (!assertion) if (message === null) throw new AssertionFailedException();else throw new AssertionFailedException(message);
      }
    }

    static equals() {
      if (arguments.length === 2) {
        const expectedValue = arguments[0],
              actualValue = arguments[1];
        Assert.equals(expectedValue, actualValue, null);
      } else if (arguments.length === 3) {
        const expectedValue = arguments[0],
              actualValue = arguments[1],
              message = arguments[2];
        if (!actualValue.equals(expectedValue)) throw new AssertionFailedException('Expected ' + expectedValue + ' but encountered ' + actualValue + (message !== null ? ': ' + message : ''));
      }
    }

  }

  const kBuf = new ArrayBuffer(8);
  const kBufAsF64 = new Float64Array(kBuf);
  const kBufAsI32 = new Int32Array(kBuf);
  class Coordinate {
    constructor() {
      Coordinate.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.x = null;
      this.y = null;
      this.z = null;

      if (arguments.length === 0) {
        Coordinate.constructor_.call(this, 0.0, 0.0);
      } else if (arguments.length === 1) {
        const c = arguments[0];
        Coordinate.constructor_.call(this, c.x, c.y, c.getZ());
      } else if (arguments.length === 2) {
        const x = arguments[0],
              y = arguments[1];
        Coordinate.constructor_.call(this, x, y, Coordinate.NULL_ORDINATE);
      } else if (arguments.length === 3) {
        const x = arguments[0],
              y = arguments[1],
              z = arguments[2];
        this.x = x;
        this.y = y;
        this.z = z;
      }
    }

    static hashCode(n) {
      kBufAsF64[0] = n;
      return kBufAsI32[0] ^ kBufAsI32[1];
    }

    getM() {
      return Double.NaN;
    }

    setOrdinate(ordinateIndex, value) {
      switch (ordinateIndex) {
        case Coordinate.X:
          this.x = value;
          break;

        case Coordinate.Y:
          this.y = value;
          break;

        case Coordinate.Z:
          this.setZ(value);
          break;

        default:
          throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex);
      }
    }

    equals2D() {
      if (arguments.length === 1) {
        const other = arguments[0];
        if (this.x !== other.x) return false;
        if (this.y !== other.y) return false;
        return true;
      } else if (arguments.length === 2) {
        const c = arguments[0],
              tolerance = arguments[1];
        if (!NumberUtil.equalsWithTolerance(this.x, c.x, tolerance)) return false;
        if (!NumberUtil.equalsWithTolerance(this.y, c.y, tolerance)) return false;
        return true;
      }
    }

    setM(m) {
      throw new IllegalArgumentException('Invalid ordinate index: ' + Coordinate.M);
    }

    getZ() {
      return this.z;
    }

    getOrdinate(ordinateIndex) {
      switch (ordinateIndex) {
        case Coordinate.X:
          return this.x;

        case Coordinate.Y:
          return this.y;

        case Coordinate.Z:
          return this.getZ();
      }

      throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex);
    }

    equals3D(other) {
      return this.x === other.x && this.y === other.y && (this.getZ() === other.getZ() || Double.isNaN(this.getZ()) && Double.isNaN(other.getZ()));
    }

    equals(other) {
      if (!(other instanceof Coordinate)) return false;
      return this.equals2D(other);
    }

    equalInZ(c, tolerance) {
      return NumberUtil.equalsWithTolerance(this.getZ(), c.getZ(), tolerance);
    }

    setX(x) {
      this.x = x;
    }

    compareTo(o) {
      const other = o;
      if (this.x < other.x) return -1;
      if (this.x > other.x) return 1;
      if (this.y < other.y) return -1;
      if (this.y > other.y) return 1;
      return 0;
    }

    getX() {
      return this.x;
    }

    setZ(z) {
      this.z = z;
    }

    clone() {
      try {
        const coord = null;
        return coord;
      } catch (e) {
        if (e instanceof CloneNotSupportedException) {
          Assert.shouldNeverReachHere('this shouldn\'t happen because this class is Cloneable');
          return null;
        } else {
          throw e;
        }
      } finally {}
    }

    copy() {
      return new Coordinate(this);
    }

    toString() {
      return '(' + this.x + ', ' + this.y + ', ' + this.getZ() + ')';
    }

    distance3D(c) {
      const dx = this.x - c.x;
      const dy = this.y - c.y;
      const dz = this.getZ() - c.getZ();
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    getY() {
      return this.y;
    }

    setY(y) {
      this.y = y;
    }

    distance(c) {
      const dx = this.x - c.x;
      const dy = this.y - c.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    hashCode() {
      let result = 17;
      result = 37 * result + Coordinate.hashCode(this.x);
      result = 37 * result + Coordinate.hashCode(this.y);
      return result;
    }

    setCoordinate(other) {
      this.x = other.x;
      this.y = other.y;
      this.z = other.getZ();
    }

    get interfaces_() {
      return [Comparable, Clonable, Serializable];
    }

  }

  class DimensionalComparator {
    constructor() {
      DimensionalComparator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._dimensionsToTest = 2;

      if (arguments.length === 0) {
        DimensionalComparator.constructor_.call(this, 2);
      } else if (arguments.length === 1) {
        const dimensionsToTest = arguments[0];
        if (dimensionsToTest !== 2 && dimensionsToTest !== 3) throw new IllegalArgumentException('only 2 or 3 dimensions may be specified');
        this._dimensionsToTest = dimensionsToTest;
      }
    }

    static compare(a, b) {
      if (a < b) return -1;
      if (a > b) return 1;

      if (Double.isNaN(a)) {
        if (Double.isNaN(b)) return 0;
        return -1;
      }

      if (Double.isNaN(b)) return 1;
      return 0;
    }

    compare(c1, c2) {
      const compX = DimensionalComparator.compare(c1.x, c2.x);
      if (compX !== 0) return compX;
      const compY = DimensionalComparator.compare(c1.y, c2.y);
      if (compY !== 0) return compY;
      if (this._dimensionsToTest <= 2) return 0;
      const compZ = DimensionalComparator.compare(c1.getZ(), c2.getZ());
      return compZ;
    }

    get interfaces_() {
      return [Comparator];
    }

  }

  Coordinate.DimensionalComparator = DimensionalComparator;
  Coordinate.NULL_ORDINATE = Double.NaN;
  Coordinate.X = 0;
  Coordinate.Y = 1;
  Coordinate.Z = 2;
  Coordinate.M = 3;

  class CoordinateXY extends Coordinate {
    constructor() {
      super();
      CoordinateXY.constructor_.apply(this, arguments);
    }

    static constructor_() {
      if (arguments.length === 0) {
        Coordinate.constructor_.call(this);
      } else if (arguments.length === 1) {
        if (arguments[0] instanceof CoordinateXY) {
          const coord = arguments[0];
          Coordinate.constructor_.call(this, coord.x, coord.y);
        } else if (arguments[0] instanceof Coordinate) {
          const coord = arguments[0];
          Coordinate.constructor_.call(this, coord.x, coord.y);
        }
      } else if (arguments.length === 2) {
        const x = arguments[0],
              y = arguments[1];
        Coordinate.constructor_.call(this, x, y, Coordinate.NULL_ORDINATE);
      }
    }

    setOrdinate(ordinateIndex, value) {
      switch (ordinateIndex) {
        case CoordinateXY.X:
          this.x = value;
          break;

        case CoordinateXY.Y:
          this.y = value;
          break;

        default:
          throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex);
      }
    }

    getZ() {
      return Coordinate.NULL_ORDINATE;
    }

    getOrdinate(ordinateIndex) {
      switch (ordinateIndex) {
        case CoordinateXY.X:
          return this.x;

        case CoordinateXY.Y:
          return this.y;
      }

      throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex);
    }

    setZ(z) {
      throw new IllegalArgumentException('CoordinateXY dimension 2 does not support z-ordinate');
    }

    copy() {
      return new CoordinateXY(this);
    }

    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }

    setCoordinate(other) {
      this.x = other.x;
      this.y = other.y;
      this.z = other.getZ();
    }

  }
  CoordinateXY.X = 0;
  CoordinateXY.Y = 1;
  CoordinateXY.Z = -1;
  CoordinateXY.M = -1;

  class CoordinateXYM extends Coordinate {
    constructor() {
      super();
      CoordinateXYM.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._m = null;

      if (arguments.length === 0) {
        Coordinate.constructor_.call(this);
        this._m = 0.0;
      } else if (arguments.length === 1) {
        if (arguments[0] instanceof CoordinateXYM) {
          const coord = arguments[0];
          Coordinate.constructor_.call(this, coord.x, coord.y);
          this._m = coord._m;
        } else if (arguments[0] instanceof Coordinate) {
          const coord = arguments[0];
          Coordinate.constructor_.call(this, coord.x, coord.y);
          this._m = this.getM();
        }
      } else if (arguments.length === 3) {
        const x = arguments[0],
              y = arguments[1],
              m = arguments[2];
        Coordinate.constructor_.call(this, x, y, Coordinate.NULL_ORDINATE);
        this._m = m;
      }
    }

    getM() {
      return this._m;
    }

    setOrdinate(ordinateIndex, value) {
      switch (ordinateIndex) {
        case CoordinateXYM.X:
          this.x = value;
          break;

        case CoordinateXYM.Y:
          this.y = value;
          break;

        case CoordinateXYM.M:
          this._m = value;
          break;

        default:
          throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex);
      }
    }

    setM(m) {
      this._m = m;
    }

    getZ() {
      return Coordinate.NULL_ORDINATE;
    }

    getOrdinate(ordinateIndex) {
      switch (ordinateIndex) {
        case CoordinateXYM.X:
          return this.x;

        case CoordinateXYM.Y:
          return this.y;

        case CoordinateXYM.M:
          return this._m;
      }

      throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex);
    }

    setZ(z) {
      throw new IllegalArgumentException('CoordinateXY dimension 2 does not support z-ordinate');
    }

    copy() {
      return new CoordinateXYM(this);
    }

    toString() {
      return '(' + this.x + ', ' + this.y + ' m=' + this.getM() + ')';
    }

    setCoordinate(other) {
      this.x = other.x;
      this.y = other.y;
      this.z = other.getZ();
      this._m = other.getM();
    }

  }
  CoordinateXYM.X = 0;
  CoordinateXYM.Y = 1;
  CoordinateXYM.Z = -1;
  CoordinateXYM.M = 2;

  class CoordinateXYZM extends Coordinate {
    constructor() {
      super();
      CoordinateXYZM.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._m = null;

      if (arguments.length === 0) {
        Coordinate.constructor_.call(this);
        this._m = 0.0;
      } else if (arguments.length === 1) {
        if (arguments[0] instanceof CoordinateXYZM) {
          const coord = arguments[0];
          Coordinate.constructor_.call(this, coord);
          this._m = coord._m;
        } else if (arguments[0] instanceof Coordinate) {
          const coord = arguments[0];
          Coordinate.constructor_.call(this, coord);
          this._m = this.getM();
        }
      } else if (arguments.length === 4) {
        const x = arguments[0],
              y = arguments[1],
              z = arguments[2],
              m = arguments[3];
        Coordinate.constructor_.call(this, x, y, z);
        this._m = m;
      }
    }

    getM() {
      return this._m;
    }

    setOrdinate(ordinateIndex, value) {
      switch (ordinateIndex) {
        case Coordinate.X:
          this.x = value;
          break;

        case Coordinate.Y:
          this.y = value;
          break;

        case Coordinate.Z:
          this.z = value;
          break;

        case Coordinate.M:
          this._m = value;
          break;

        default:
          throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex);
      }
    }

    setM(m) {
      this._m = m;
    }

    getOrdinate(ordinateIndex) {
      switch (ordinateIndex) {
        case Coordinate.X:
          return this.x;

        case Coordinate.Y:
          return this.y;

        case Coordinate.Z:
          return this.getZ();

        case Coordinate.M:
          return this.getM();
      }

      throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex);
    }

    copy() {
      return new CoordinateXYZM(this);
    }

    toString() {
      return '(' + this.x + ', ' + this.y + ', ' + this.getZ() + ' m=' + this.getM() + ')';
    }

    setCoordinate(other) {
      this.x = other.x;
      this.y = other.y;
      this.z = other.getZ();
      this._m = other.getM();
    }

  }

  function hasInterface (o, i) {
    return o.interfaces_ && o.interfaces_.indexOf(i) > -1;
  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/Collection.html
   */
  class Collection {
    /**
       * Ensures that this collection contains the specified element (optional
       * operation).
       * @param {Object} e
       * @return {boolean}
       */
    add() {}
    /**
       * Appends all of the elements in the specified collection to the end of this
       * list, in the order that they are returned by the specified collection's
       * iterator (optional operation).
       * @param {javascript.util.Collection} c
       * @return {boolean}
       */


    addAll() {}
    /**
       * Returns true if this collection contains no elements.
       * @return {boolean}
       */


    isEmpty() {}
    /**
       * Returns an iterator over the elements in this collection.
       * @return {javascript.util.Iterator}
       */


    iterator() {}
    /**
       * Returns an iterator over the elements in this collection.
       * @return {number}
       */


    size() {}
    /**
       * Returns an array containing all of the elements in this collection.
       * @return {Array}
       */


    toArray() {}
    /**
       * Removes a single instance of the specified element from this collection if it
       * is present. (optional)
       * @param {Object} e
       * @return {boolean}
       */


    remove() {}

  }

  class IndexOutOfBoundsException extends Exception {
    constructor(message) {
      super(message);
      this.name = Object.keys({
        IndexOutOfBoundsException
      })[0];
    }

  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/List.html
   */

  class List extends Collection {
    /**
       * Returns the element at the specified position in this list.
       * @param {number} index
       * @return {Object}
       */
    get() {}
    /**
       * Replaces the element at the specified position in this list with the
       * specified element (optional operation).
       * @param {number} index
       * @param {Object} e
       * @return {Object}
       */


    set() {}
    /**
       * Returns true if this collection contains no elements.
       * @return {boolean}
       */


    isEmpty() {}

  }

  class NoSuchElementException extends Exception {
    constructor(message) {
      super(message);
      this.name = Object.keys({
        NoSuchElementException
      })[0];
    }

  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/ArrayList.html
   */

  class ArrayList extends List {
    constructor(o) {
      super();
      this.array = [];
      if (o instanceof Collection) this.addAll(o);
    }

    get interfaces_() {
      return [List, Collection];
    }

    ensureCapacity() {}

    add(e) {
      if (arguments.length === 1) this.array.push(e);else this.array.splice(arguments[0], 0, arguments[1]);
      return true;
    }

    clear() {
      this.array = [];
    }

    addAll(c) {
      for (const e of c) this.array.push(e);
    }

    set(index, element) {
      const oldElement = this.array[index];
      this.array[index] = element;
      return oldElement;
    }

    iterator() {
      return new Iterator$3(this);
    }

    get(index) {
      if (index < 0 || index >= this.size()) throw new IndexOutOfBoundsException();
      return this.array[index];
    }

    isEmpty() {
      return this.array.length === 0;
    }

    sort(comparator) {
      if (comparator) this.array.sort((a, b) => comparator.compare(a, b));else this.array.sort();
    }

    size() {
      return this.array.length;
    }

    toArray() {
      return this.array.slice();
    }

    remove(o) {
      for (let i = 0, len = this.array.length; i < len; i++) if (this.array[i] === o) return !!this.array.splice(i, 1);

      return false;
    }

    [Symbol.iterator]() {
      return this.array.values();
    }

  }

  class Iterator$3 {
    constructor(arrayList) {
      this.arrayList = arrayList;
      this.position = 0;
    }

    next() {
      if (this.position === this.arrayList.size()) throw new NoSuchElementException();
      return this.arrayList.get(this.position++);
    }

    hasNext() {
      return this.position < this.arrayList.size();
    }

    set(element) {
      return this.arrayList.set(this.position - 1, element);
    }

    remove() {
      this.arrayList.remove(this.arrayList.get(this.position));
    }

  }

  class CoordinateList extends ArrayList {
    constructor() {
      super();
      CoordinateList.constructor_.apply(this, arguments);
    }

    static constructor_() {
      if (arguments.length === 0) ; else if (arguments.length === 1) {
        const coord = arguments[0];
        this.ensureCapacity(coord.length);
        this.add(coord, true);
      } else if (arguments.length === 2) {
        const coord = arguments[0],
              allowRepeated = arguments[1];
        this.ensureCapacity(coord.length);
        this.add(coord, allowRepeated);
      }
    }

    getCoordinate(i) {
      return this.get(i);
    }

    addAll() {
      if (arguments.length === 2 && typeof arguments[1] === 'boolean' && hasInterface(arguments[0], Collection)) {
        const coll = arguments[0],
              allowRepeated = arguments[1];
        let isChanged = false;

        for (let i = coll.iterator(); i.hasNext();) {
          this.add(i.next(), allowRepeated);
          isChanged = true;
        }

        return isChanged;
      } else {
        return super.addAll.apply(this, arguments);
      }
    }

    clone() {
      const clone = super.clone.call(this);

      for (let i = 0; i < this.size(); i++) clone.add(i, this.get(i).clone());

      return clone;
    }

    toCoordinateArray() {
      if (arguments.length === 0) {
        return this.toArray(CoordinateList.coordArrayType);
      } else if (arguments.length === 1) {
        const isForward = arguments[0];
        if (isForward) return this.toArray(CoordinateList.coordArrayType);
        const size = this.size();
        const pts = new Array(size).fill(null);

        for (let i = 0; i < size; i++) pts[i] = this.get(size - i - 1);

        return pts;
      }
    }

    add() {
      if (arguments.length === 1) {
        const coord = arguments[0];
        return super.add.call(this, coord);
      } else if (arguments.length === 2) {
        if (arguments[0] instanceof Array && typeof arguments[1] === 'boolean') {
          const coord = arguments[0],
                allowRepeated = arguments[1];
          this.add(coord, allowRepeated, true);
          return true;
        } else if (arguments[0] instanceof Coordinate && typeof arguments[1] === 'boolean') {
          const coord = arguments[0],
                allowRepeated = arguments[1];
          if (!allowRepeated) if (this.size() >= 1) {
            const last = this.get(this.size() - 1);
            if (last.equals2D(coord)) return null;
          }
          super.add.call(this, coord);
        } else if (arguments[0] instanceof Object && typeof arguments[1] === 'boolean') {
          const obj = arguments[0],
                allowRepeated = arguments[1];
          this.add(obj, allowRepeated);
          return true;
        }
      } else if (arguments.length === 3) {
        if (typeof arguments[2] === 'boolean' && arguments[0] instanceof Array && typeof arguments[1] === 'boolean') {
          const coord = arguments[0],
                allowRepeated = arguments[1],
                direction = arguments[2];
          if (direction) for (let i = 0; i < coord.length; i++) this.add(coord[i], allowRepeated);else for (let i = coord.length - 1; i >= 0; i--) this.add(coord[i], allowRepeated);
          return true;
        } else if (typeof arguments[2] === 'boolean' && Number.isInteger(arguments[0]) && arguments[1] instanceof Coordinate) {
          const i = arguments[0],
                coord = arguments[1],
                allowRepeated = arguments[2];

          if (!allowRepeated) {
            const size = this.size();

            if (size > 0) {
              if (i > 0) {
                const prev = this.get(i - 1);
                if (prev.equals2D(coord)) return null;
              }

              if (i < size) {
                const next = this.get(i);
                if (next.equals2D(coord)) return null;
              }
            }
          }

          super.add.call(this, i, coord);
        }
      } else if (arguments.length === 4) {
        const coord = arguments[0],
              allowRepeated = arguments[1],
              start = arguments[2],
              end = arguments[3];
        let inc = 1;
        if (start > end) inc = -1;

        for (let i = start; i !== end; i += inc) this.add(coord[i], allowRepeated);

        return true;
      }
    }

    closeRing() {
      if (this.size() > 0) {
        const duplicate = this.get(0).copy();
        this.add(duplicate, false);
      }
    }

  }
  CoordinateList.coordArrayType = new Array(0).fill(null);

  class CoordinateSequenceFilter {
    filter(seq, i) {}

    isDone() {}

    isGeometryChanged() {}

  }

  class Envelope {
    constructor() {
      Envelope.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._minx = null;
      this._maxx = null;
      this._miny = null;
      this._maxy = null;

      if (arguments.length === 0) {
        this.init();
      } else if (arguments.length === 1) {
        if (arguments[0] instanceof Coordinate) {
          const p = arguments[0];
          this.init(p.x, p.x, p.y, p.y);
        } else if (arguments[0] instanceof Envelope) {
          const env = arguments[0];
          this.init(env);
        }
      } else if (arguments.length === 2) {
        const p1 = arguments[0],
              p2 = arguments[1];
        this.init(p1.x, p2.x, p1.y, p2.y);
      } else if (arguments.length === 4) {
        const x1 = arguments[0],
              x2 = arguments[1],
              y1 = arguments[2],
              y2 = arguments[3];
        this.init(x1, x2, y1, y2);
      }
    }

    static intersects() {
      if (arguments.length === 3) {
        const p1 = arguments[0],
              p2 = arguments[1],
              q = arguments[2];
        if (q.x >= (p1.x < p2.x ? p1.x : p2.x) && q.x <= (p1.x > p2.x ? p1.x : p2.x) && q.y >= (p1.y < p2.y ? p1.y : p2.y) && q.y <= (p1.y > p2.y ? p1.y : p2.y)) return true;
        return false;
      } else if (arguments.length === 4) {
        const p1 = arguments[0],
              p2 = arguments[1],
              q1 = arguments[2],
              q2 = arguments[3];
        let minq = Math.min(q1.x, q2.x);
        let maxq = Math.max(q1.x, q2.x);
        let minp = Math.min(p1.x, p2.x);
        let maxp = Math.max(p1.x, p2.x);
        if (minp > maxq) return false;
        if (maxp < minq) return false;
        minq = Math.min(q1.y, q2.y);
        maxq = Math.max(q1.y, q2.y);
        minp = Math.min(p1.y, p2.y);
        maxp = Math.max(p1.y, p2.y);
        if (minp > maxq) return false;
        if (maxp < minq) return false;
        return true;
      }
    }

    getArea() {
      return this.getWidth() * this.getHeight();
    }

    equals(other) {
      if (!(other instanceof Envelope)) return false;
      const otherEnvelope = other;
      if (this.isNull()) return otherEnvelope.isNull();
      return this._maxx === otherEnvelope.getMaxX() && this._maxy === otherEnvelope.getMaxY() && this._minx === otherEnvelope.getMinX() && this._miny === otherEnvelope.getMinY();
    }

    intersection(env) {
      if (this.isNull() || env.isNull() || !this.intersects(env)) return new Envelope();
      const intMinX = this._minx > env._minx ? this._minx : env._minx;
      const intMinY = this._miny > env._miny ? this._miny : env._miny;
      const intMaxX = this._maxx < env._maxx ? this._maxx : env._maxx;
      const intMaxY = this._maxy < env._maxy ? this._maxy : env._maxy;
      return new Envelope(intMinX, intMaxX, intMinY, intMaxY);
    }

    isNull() {
      return this._maxx < this._minx;
    }

    getMaxX() {
      return this._maxx;
    }

    covers() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof Coordinate) {
          const p = arguments[0];
          return this.covers(p.x, p.y);
        } else if (arguments[0] instanceof Envelope) {
          const other = arguments[0];
          if (this.isNull() || other.isNull()) return false;
          return other.getMinX() >= this._minx && other.getMaxX() <= this._maxx && other.getMinY() >= this._miny && other.getMaxY() <= this._maxy;
        }
      } else if (arguments.length === 2) {
        const x = arguments[0],
              y = arguments[1];
        if (this.isNull()) return false;
        return x >= this._minx && x <= this._maxx && y >= this._miny && y <= this._maxy;
      }
    }

    intersects() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof Envelope) {
          const other = arguments[0];
          if (this.isNull() || other.isNull()) return false;
          return !(other._minx > this._maxx || other._maxx < this._minx || other._miny > this._maxy || other._maxy < this._miny);
        } else if (arguments[0] instanceof Coordinate) {
          const p = arguments[0];
          return this.intersects(p.x, p.y);
        }
      } else if (arguments.length === 2) {
        if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
          const a = arguments[0],
                b = arguments[1];
          if (this.isNull()) return false;
          const envminx = a.x < b.x ? a.x : b.x;
          if (envminx > this._maxx) return false;
          const envmaxx = a.x > b.x ? a.x : b.x;
          if (envmaxx < this._minx) return false;
          const envminy = a.y < b.y ? a.y : b.y;
          if (envminy > this._maxy) return false;
          const envmaxy = a.y > b.y ? a.y : b.y;
          if (envmaxy < this._miny) return false;
          return true;
        } else if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
          const x = arguments[0],
                y = arguments[1];
          if (this.isNull()) return false;
          return !(x > this._maxx || x < this._minx || y > this._maxy || y < this._miny);
        }
      }
    }

    getMinY() {
      return this._miny;
    }

    getDiameter() {
      if (this.isNull()) return 0;
      const w = this.getWidth();
      const h = this.getHeight();
      return Math.sqrt(w * w + h * h);
    }

    getMinX() {
      return this._minx;
    }

    expandToInclude() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof Coordinate) {
          const p = arguments[0];
          this.expandToInclude(p.x, p.y);
        } else if (arguments[0] instanceof Envelope) {
          const other = arguments[0];
          if (other.isNull()) return null;

          if (this.isNull()) {
            this._minx = other.getMinX();
            this._maxx = other.getMaxX();
            this._miny = other.getMinY();
            this._maxy = other.getMaxY();
          } else {
            if (other._minx < this._minx) this._minx = other._minx;
            if (other._maxx > this._maxx) this._maxx = other._maxx;
            if (other._miny < this._miny) this._miny = other._miny;
            if (other._maxy > this._maxy) this._maxy = other._maxy;
          }
        }
      } else if (arguments.length === 2) {
        const x = arguments[0],
              y = arguments[1];

        if (this.isNull()) {
          this._minx = x;
          this._maxx = x;
          this._miny = y;
          this._maxy = y;
        } else {
          if (x < this._minx) this._minx = x;
          if (x > this._maxx) this._maxx = x;
          if (y < this._miny) this._miny = y;
          if (y > this._maxy) this._maxy = y;
        }
      }
    }

    minExtent() {
      if (this.isNull()) return 0.0;
      const w = this.getWidth();
      const h = this.getHeight();
      if (w < h) return w;
      return h;
    }

    getWidth() {
      if (this.isNull()) return 0;
      return this._maxx - this._minx;
    }

    compareTo(o) {
      const env = o;

      if (this.isNull()) {
        if (env.isNull()) return 0;
        return -1;
      } else {
        if (env.isNull()) return 1;
      }

      if (this._minx < env._minx) return -1;
      if (this._minx > env._minx) return 1;
      if (this._miny < env._miny) return -1;
      if (this._miny > env._miny) return 1;
      if (this._maxx < env._maxx) return -1;
      if (this._maxx > env._maxx) return 1;
      if (this._maxy < env._maxy) return -1;
      if (this._maxy > env._maxy) return 1;
      return 0;
    }

    translate(transX, transY) {
      if (this.isNull()) return null;
      this.init(this.getMinX() + transX, this.getMaxX() + transX, this.getMinY() + transY, this.getMaxY() + transY);
    }

    copy() {
      return new Envelope(this);
    }

    toString() {
      return 'Env[' + this._minx + ' : ' + this._maxx + ', ' + this._miny + ' : ' + this._maxy + ']';
    }

    setToNull() {
      this._minx = 0;
      this._maxx = -1;
      this._miny = 0;
      this._maxy = -1;
    }

    disjoint(other) {
      if (this.isNull() || other.isNull()) return true;
      return other._minx > this._maxx || other._maxx < this._minx || other._miny > this._maxy || other._maxy < this._miny;
    }

    getHeight() {
      if (this.isNull()) return 0;
      return this._maxy - this._miny;
    }

    maxExtent() {
      if (this.isNull()) return 0.0;
      const w = this.getWidth();
      const h = this.getHeight();
      if (w > h) return w;
      return h;
    }

    expandBy() {
      if (arguments.length === 1) {
        const distance = arguments[0];
        this.expandBy(distance, distance);
      } else if (arguments.length === 2) {
        const deltaX = arguments[0],
              deltaY = arguments[1];
        if (this.isNull()) return null;
        this._minx -= deltaX;
        this._maxx += deltaX;
        this._miny -= deltaY;
        this._maxy += deltaY;
        if (this._minx > this._maxx || this._miny > this._maxy) this.setToNull();
      }
    }

    contains() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof Envelope) {
          const other = arguments[0];
          return this.covers(other);
        } else if (arguments[0] instanceof Coordinate) {
          const p = arguments[0];
          return this.covers(p);
        }
      } else if (arguments.length === 2) {
        const x = arguments[0],
              y = arguments[1];
        return this.covers(x, y);
      }
    }

    centre() {
      if (this.isNull()) return null;
      return new Coordinate((this.getMinX() + this.getMaxX()) / 2.0, (this.getMinY() + this.getMaxY()) / 2.0);
    }

    init() {
      if (arguments.length === 0) {
        this.setToNull();
      } else if (arguments.length === 1) {
        if (arguments[0] instanceof Coordinate) {
          const p = arguments[0];
          this.init(p.x, p.x, p.y, p.y);
        } else if (arguments[0] instanceof Envelope) {
          const env = arguments[0];
          this._minx = env._minx;
          this._maxx = env._maxx;
          this._miny = env._miny;
          this._maxy = env._maxy;
        }
      } else if (arguments.length === 2) {
        const p1 = arguments[0],
              p2 = arguments[1];
        this.init(p1.x, p2.x, p1.y, p2.y);
      } else if (arguments.length === 4) {
        const x1 = arguments[0],
              x2 = arguments[1],
              y1 = arguments[2],
              y2 = arguments[3];

        if (x1 < x2) {
          this._minx = x1;
          this._maxx = x2;
        } else {
          this._minx = x2;
          this._maxx = x1;
        }

        if (y1 < y2) {
          this._miny = y1;
          this._maxy = y2;
        } else {
          this._miny = y2;
          this._maxy = y1;
        }
      }
    }

    getMaxY() {
      return this._maxy;
    }

    distance(env) {
      if (this.intersects(env)) return 0;
      let dx = 0.0;
      if (this._maxx < env._minx) dx = env._minx - this._maxx;else if (this._minx > env._maxx) dx = this._minx - env._maxx;
      let dy = 0.0;
      if (this._maxy < env._miny) dy = env._miny - this._maxy;else if (this._miny > env._maxy) dy = this._miny - env._maxy;
      if (dx === 0.0) return dy;
      if (dy === 0.0) return dx;
      return Math.sqrt(dx * dx + dy * dy);
    }

    hashCode() {
      let result = 17;
      result = 37 * result + Coordinate.hashCode(this._minx);
      result = 37 * result + Coordinate.hashCode(this._maxx);
      result = 37 * result + Coordinate.hashCode(this._miny);
      result = 37 * result + Coordinate.hashCode(this._maxy);
      return result;
    }

    get interfaces_() {
      return [Comparable, Serializable];
    }

  }

  class StringBuffer {
    constructor(str) {
      this.str = str;
    }

    append(e) {
      this.str += e;
    }

    setCharAt(i, c) {
      this.str = this.str.substr(0, i) + c + this.str.substr(i + 1);
    }

    toString() {
      return this.str;
    }

  }

  class Integer {
    constructor(value) {
      this.value = value;
    }

    intValue() {
      return this.value;
    }

    compareTo(o) {
      if (this.value < o) return -1;
      if (this.value > o) return 1;
      return 0;
    }

    static compare(x, y) {
      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    }

    static isNan(n) {
      return Number.isNaN(n);
    }

    static valueOf(value) {
      return new Integer(value);
    }

  }

  class Character {
    static isWhitespace(c) {
      return c <= 32 && c >= 0 || c === 127;
    }

    static toUpperCase(c) {
      return c.toUpperCase();
    }

  }

  class DD {
    constructor() {
      DD.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._hi = 0.0;
      this._lo = 0.0;

      if (arguments.length === 0) {
        this.init(0.0);
      } else if (arguments.length === 1) {
        if (typeof arguments[0] === 'number') {
          const x = arguments[0];
          this.init(x);
        } else if (arguments[0] instanceof DD) {
          const dd = arguments[0];
          this.init(dd);
        } else if (typeof arguments[0] === 'string') {
          const str = arguments[0];
          DD.constructor_.call(this, DD.parse(str));
        }
      } else if (arguments.length === 2) {
        const hi = arguments[0],
              lo = arguments[1];
        this.init(hi, lo);
      }
    }

    static determinant() {
      if (typeof arguments[3] === 'number' && typeof arguments[2] === 'number' && typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
        const x1 = arguments[0],
              y1 = arguments[1],
              x2 = arguments[2],
              y2 = arguments[3];
        return DD.determinant(DD.valueOf(x1), DD.valueOf(y1), DD.valueOf(x2), DD.valueOf(y2));
      } else if (arguments[3] instanceof DD && arguments[2] instanceof DD && arguments[0] instanceof DD && arguments[1] instanceof DD) {
        const x1 = arguments[0],
              y1 = arguments[1],
              x2 = arguments[2],
              y2 = arguments[3];
        const det = x1.multiply(y2).selfSubtract(y1.multiply(x2));
        return det;
      }
    }

    static sqr(x) {
      return DD.valueOf(x).selfMultiply(x);
    }

    static valueOf() {
      if (typeof arguments[0] === 'string') {
        const str = arguments[0];
        return DD.parse(str);
      } else if (typeof arguments[0] === 'number') {
        const x = arguments[0];
        return new DD(x);
      }
    }

    static sqrt(x) {
      return DD.valueOf(x).sqrt();
    }

    static parse(str) {
      let i = 0;
      const strlen = str.length;

      while (Character.isWhitespace(str.charAt(i))) i++;

      let isNegative = false;

      if (i < strlen) {
        const signCh = str.charAt(i);

        if (signCh === '-' || signCh === '+') {
          i++;
          if (signCh === '-') isNegative = true;
        }
      }

      const val = new DD();
      let numDigits = 0;
      let numBeforeDec = 0;
      let exp = 0;
      let hasDecimalChar = false;

      while (true) {
        if (i >= strlen) break;
        const ch = str.charAt(i);
        i++;

        if (Character.isDigit(ch)) {
          const d = ch - '0';
          val.selfMultiply(DD.TEN);
          val.selfAdd(d);
          numDigits++;
          continue;
        }

        if (ch === '.') {
          numBeforeDec = numDigits;
          hasDecimalChar = true;
          continue;
        }

        if (ch === 'e' || ch === 'E') {
          const expStr = str.substring(i);

          try {
            exp = Integer.parseInt(expStr);
          } catch (ex) {
            if (ex instanceof NumberFormatException) throw new NumberFormatException('Invalid exponent ' + expStr + ' in string ' + str);else throw ex;
          } finally {}

          break;
        }

        throw new NumberFormatException('Unexpected character \'' + ch + '\' at position ' + i + ' in string ' + str);
      }

      let val2 = val;
      if (!hasDecimalChar) numBeforeDec = numDigits;
      const numDecPlaces = numDigits - numBeforeDec - exp;

      if (numDecPlaces === 0) {
        val2 = val;
      } else if (numDecPlaces > 0) {
        const scale = DD.TEN.pow(numDecPlaces);
        val2 = val.divide(scale);
      } else if (numDecPlaces < 0) {
        const scale = DD.TEN.pow(-numDecPlaces);
        val2 = val.multiply(scale);
      }

      if (isNegative) return val2.negate();
      return val2;
    }

    static createNaN() {
      return new DD(Double.NaN, Double.NaN);
    }

    static copy(dd) {
      return new DD(dd);
    }

    static magnitude(x) {
      const xAbs = Math.abs(x);
      const xLog10 = Math.log(xAbs) / Math.log(10);
      let xMag = Math.trunc(Math.floor(xLog10));
      const xApprox = Math.pow(10, xMag);
      if (xApprox * 10 <= xAbs) xMag += 1;
      return xMag;
    }

    static stringOfChar(ch, len) {
      const buf = new StringBuffer();

      for (let i = 0; i < len; i++) buf.append(ch);

      return buf.toString();
    }

    le(y) {
      return this._hi < y._hi || this._hi === y._hi && this._lo <= y._lo;
    }

    extractSignificantDigits(insertDecimalPoint, magnitude) {
      let y = this.abs();
      let mag = DD.magnitude(y._hi);
      const scale = DD.TEN.pow(mag);
      y = y.divide(scale);

      if (y.gt(DD.TEN)) {
        y = y.divide(DD.TEN);
        mag += 1;
      } else if (y.lt(DD.ONE)) {
        y = y.multiply(DD.TEN);
        mag -= 1;
      }

      const decimalPointPos = mag + 1;
      const buf = new StringBuffer();
      const numDigits = DD.MAX_PRINT_DIGITS - 1;

      for (let i = 0; i <= numDigits; i++) {
        if (insertDecimalPoint && i === decimalPointPos) buf.append('.');
        const digit = Math.trunc(y._hi);

        if (digit < 0) break;
        let rebiasBy10 = false;
        let digitChar = 0;

        if (digit > 9) {
          rebiasBy10 = true;
          digitChar = '9';
        } else {
          digitChar = '0' + digit;
        }

        buf.append(digitChar);
        y = y.subtract(DD.valueOf(digit)).multiply(DD.TEN);
        if (rebiasBy10) y.selfAdd(DD.TEN);
        let continueExtractingDigits = true;
        const remMag = DD.magnitude(y._hi);
        if (remMag < 0 && Math.abs(remMag) >= numDigits - i) continueExtractingDigits = false;
        if (!continueExtractingDigits) break;
      }

      magnitude[0] = mag;
      return buf.toString();
    }

    sqr() {
      return this.multiply(this);
    }

    doubleValue() {
      return this._hi + this._lo;
    }

    subtract() {
      if (arguments[0] instanceof DD) {
        const y = arguments[0];
        return this.add(y.negate());
      } else if (typeof arguments[0] === 'number') {
        const y = arguments[0];
        return this.add(-y);
      }
    }

    equals() {
      if (arguments.length === 1 && arguments[0] instanceof DD) {
        const y = arguments[0];
        return this._hi === y._hi && this._lo === y._lo;
      }
    }

    isZero() {
      return this._hi === 0.0 && this._lo === 0.0;
    }

    selfSubtract() {
      if (arguments[0] instanceof DD) {
        const y = arguments[0];
        if (this.isNaN()) return this;
        return this.selfAdd(-y._hi, -y._lo);
      } else if (typeof arguments[0] === 'number') {
        const y = arguments[0];
        if (this.isNaN()) return this;
        return this.selfAdd(-y, 0.0);
      }
    }

    getSpecialNumberString() {
      if (this.isZero()) return '0.0';
      if (this.isNaN()) return 'NaN ';
      return null;
    }

    min(x) {
      if (this.le(x)) return this;else return x;
    }

    selfDivide() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof DD) {
          const y = arguments[0];
          return this.selfDivide(y._hi, y._lo);
        } else if (typeof arguments[0] === 'number') {
          const y = arguments[0];
          return this.selfDivide(y, 0.0);
        }
      } else if (arguments.length === 2) {
        const yhi = arguments[0],
              ylo = arguments[1];
        let hc = null,
            tc = null,
            hy = null,
            ty = null,
            C = null,
            c = null,
            U = null,
            u = null;
        C = this._hi / yhi;
        c = DD.SPLIT * C;
        hc = c - C;
        u = DD.SPLIT * yhi;
        hc = c - hc;
        tc = C - hc;
        hy = u - yhi;
        U = C * yhi;
        hy = u - hy;
        ty = yhi - hy;
        u = hc * hy - U + hc * ty + tc * hy + tc * ty;
        c = (this._hi - U - u + this._lo - C * ylo) / yhi;
        u = C + c;
        this._hi = u;
        this._lo = C - u + c;
        return this;
      }
    }

    dump() {
      return 'DD<' + this._hi + ', ' + this._lo + '>';
    }

    divide() {
      if (arguments[0] instanceof DD) {
        const y = arguments[0];
        let hc = null,
            tc = null,
            hy = null,
            ty = null,
            C = null,
            c = null,
            U = null,
            u = null;
        C = this._hi / y._hi;
        c = DD.SPLIT * C;
        hc = c - C;
        u = DD.SPLIT * y._hi;
        hc = c - hc;
        tc = C - hc;
        hy = u - y._hi;
        U = C * y._hi;
        hy = u - hy;
        ty = y._hi - hy;
        u = hc * hy - U + hc * ty + tc * hy + tc * ty;
        c = (this._hi - U - u + this._lo - C * y._lo) / y._hi;
        u = C + c;
        const zhi = u;
        const zlo = C - u + c;
        return new DD(zhi, zlo);
      } else if (typeof arguments[0] === 'number') {
        const y = arguments[0];
        if (Double.isNaN(y)) return DD.createNaN();
        return DD.copy(this).selfDivide(y, 0.0);
      }
    }

    ge(y) {
      return this._hi > y._hi || this._hi === y._hi && this._lo >= y._lo;
    }

    pow(exp) {
      if (exp === 0.0) return DD.valueOf(1.0);
      let r = new DD(this);
      let s = DD.valueOf(1.0);
      let n = Math.abs(exp);
      if (n > 1) while (n > 0) {
        if (n % 2 === 1) s.selfMultiply(r);
        n /= 2;
        if (n > 0) r = r.sqr();
      } else s = r;
      if (exp < 0) return s.reciprocal();
      return s;
    }

    ceil() {
      if (this.isNaN()) return DD.NaN;
      const fhi = Math.ceil(this._hi);
      let flo = 0.0;
      if (fhi === this._hi) flo = Math.ceil(this._lo);
      return new DD(fhi, flo);
    }

    compareTo(o) {
      const other = o;
      if (this._hi < other._hi) return -1;
      if (this._hi > other._hi) return 1;
      if (this._lo < other._lo) return -1;
      if (this._lo > other._lo) return 1;
      return 0;
    }

    rint() {
      if (this.isNaN()) return this;
      const plus5 = this.add(0.5);
      return plus5.floor();
    }

    setValue() {
      if (arguments[0] instanceof DD) {
        const value = arguments[0];
        this.init(value);
        return this;
      } else if (typeof arguments[0] === 'number') {
        const value = arguments[0];
        this.init(value);
        return this;
      }
    }

    max(x) {
      if (this.ge(x)) return this;else return x;
    }

    sqrt() {
      if (this.isZero()) return DD.valueOf(0.0);
      if (this.isNegative()) return DD.NaN;
      const x = 1.0 / Math.sqrt(this._hi);
      const ax = this._hi * x;
      const axdd = DD.valueOf(ax);
      const diffSq = this.subtract(axdd.sqr());
      const d2 = diffSq._hi * (x * 0.5);
      return axdd.add(d2);
    }

    selfAdd() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof DD) {
          const y = arguments[0];
          return this.selfAdd(y._hi, y._lo);
        } else if (typeof arguments[0] === 'number') {
          const y = arguments[0];
          let H = null,
              h = null,
              S = null,
              s = null,
              e = null,
              f = null;
          S = this._hi + y;
          e = S - this._hi;
          s = S - e;
          s = y - e + (this._hi - s);
          f = s + this._lo;
          H = S + f;
          h = f + (S - H);
          this._hi = H + h;
          this._lo = h + (H - this._hi);
          return this;
        }
      } else if (arguments.length === 2) {
        const yhi = arguments[0],
              ylo = arguments[1];
        let H = null,
            h = null,
            T = null,
            t = null,
            S = null,
            s = null,
            e = null,
            f = null;
        S = this._hi + yhi;
        T = this._lo + ylo;
        e = S - this._hi;
        f = T - this._lo;
        s = S - e;
        t = T - f;
        s = yhi - e + (this._hi - s);
        t = ylo - f + (this._lo - t);
        e = s + T;
        H = S + e;
        h = e + (S - H);
        e = t + h;
        const zhi = H + e;
        const zlo = e + (H - zhi);
        this._hi = zhi;
        this._lo = zlo;
        return this;
      }
    }

    selfMultiply() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof DD) {
          const y = arguments[0];
          return this.selfMultiply(y._hi, y._lo);
        } else if (typeof arguments[0] === 'number') {
          const y = arguments[0];
          return this.selfMultiply(y, 0.0);
        }
      } else if (arguments.length === 2) {
        const yhi = arguments[0],
              ylo = arguments[1];
        let hx = null,
            tx = null,
            hy = null,
            ty = null,
            C = null,
            c = null;
        C = DD.SPLIT * this._hi;
        hx = C - this._hi;
        c = DD.SPLIT * yhi;
        hx = C - hx;
        tx = this._hi - hx;
        hy = c - yhi;
        C = this._hi * yhi;
        hy = c - hy;
        ty = yhi - hy;
        c = hx * hy - C + hx * ty + tx * hy + tx * ty + (this._hi * ylo + this._lo * yhi);
        const zhi = C + c;
        hx = C - zhi;
        const zlo = c + hx;
        this._hi = zhi;
        this._lo = zlo;
        return this;
      }
    }

    selfSqr() {
      return this.selfMultiply(this);
    }

    floor() {
      if (this.isNaN()) return DD.NaN;
      const fhi = Math.floor(this._hi);
      let flo = 0.0;
      if (fhi === this._hi) flo = Math.floor(this._lo);
      return new DD(fhi, flo);
    }

    negate() {
      if (this.isNaN()) return this;
      return new DD(-this._hi, -this._lo);
    }

    clone() {
      try {
        return null;
      } catch (ex) {
        if (ex instanceof CloneNotSupportedException) return null;else throw ex;
      } finally {}
    }

    multiply() {
      if (arguments[0] instanceof DD) {
        const y = arguments[0];
        if (y.isNaN()) return DD.createNaN();
        return DD.copy(this).selfMultiply(y);
      } else if (typeof arguments[0] === 'number') {
        const y = arguments[0];
        if (Double.isNaN(y)) return DD.createNaN();
        return DD.copy(this).selfMultiply(y, 0.0);
      }
    }

    isNaN() {
      return Double.isNaN(this._hi);
    }

    intValue() {
      return Math.trunc(this._hi);
    }

    toString() {
      const mag = DD.magnitude(this._hi);
      if (mag >= -3 && mag <= 20) return this.toStandardNotation();
      return this.toSciNotation();
    }

    toStandardNotation() {
      const specialStr = this.getSpecialNumberString();
      if (specialStr !== null) return specialStr;
      const magnitude = new Array(1).fill(null);
      const sigDigits = this.extractSignificantDigits(true, magnitude);
      const decimalPointPos = magnitude[0] + 1;
      let num = sigDigits;

      if (sigDigits.charAt(0) === '.') {
        num = '0' + sigDigits;
      } else if (decimalPointPos < 0) {
        num = '0.' + DD.stringOfChar('0', -decimalPointPos) + sigDigits;
      } else if (sigDigits.indexOf('.') === -1) {
        const numZeroes = decimalPointPos - sigDigits.length;
        const zeroes = DD.stringOfChar('0', numZeroes);
        num = sigDigits + zeroes + '.0';
      }

      if (this.isNegative()) return '-' + num;
      return num;
    }

    reciprocal() {
      let hc = null,
          tc = null,
          hy = null,
          ty = null,
          C = null,
          c = null,
          U = null,
          u = null;
      C = 1.0 / this._hi;
      c = DD.SPLIT * C;
      hc = c - C;
      u = DD.SPLIT * this._hi;
      hc = c - hc;
      tc = C - hc;
      hy = u - this._hi;
      U = C * this._hi;
      hy = u - hy;
      ty = this._hi - hy;
      u = hc * hy - U + hc * ty + tc * hy + tc * ty;
      c = (1.0 - U - u - C * this._lo) / this._hi;
      const zhi = C + c;
      const zlo = C - zhi + c;
      return new DD(zhi, zlo);
    }

    toSciNotation() {
      if (this.isZero()) return DD.SCI_NOT_ZERO;
      const specialStr = this.getSpecialNumberString();
      if (specialStr !== null) return specialStr;
      const magnitude = new Array(1).fill(null);
      const digits = this.extractSignificantDigits(false, magnitude);
      const expStr = DD.SCI_NOT_EXPONENT_CHAR + magnitude[0];
      if (digits.charAt(0) === '0') throw new IllegalStateException('Found leading zero: ' + digits);
      let trailingDigits = '';
      if (digits.length > 1) trailingDigits = digits.substring(1);
      const digitsWithDecimal = digits.charAt(0) + '.' + trailingDigits;
      if (this.isNegative()) return '-' + digitsWithDecimal + expStr;
      return digitsWithDecimal + expStr;
    }

    abs() {
      if (this.isNaN()) return DD.NaN;
      if (this.isNegative()) return this.negate();
      return new DD(this);
    }

    isPositive() {
      return this._hi > 0.0 || this._hi === 0.0 && this._lo > 0.0;
    }

    lt(y) {
      return this._hi < y._hi || this._hi === y._hi && this._lo < y._lo;
    }

    add() {
      if (arguments[0] instanceof DD) {
        const y = arguments[0];
        return DD.copy(this).selfAdd(y);
      } else if (typeof arguments[0] === 'number') {
        const y = arguments[0];
        return DD.copy(this).selfAdd(y);
      }
    }

    init() {
      if (arguments.length === 1) {
        if (typeof arguments[0] === 'number') {
          const x = arguments[0];
          this._hi = x;
          this._lo = 0.0;
        } else if (arguments[0] instanceof DD) {
          const dd = arguments[0];
          this._hi = dd._hi;
          this._lo = dd._lo;
        }
      } else if (arguments.length === 2) {
        const hi = arguments[0],
              lo = arguments[1];
        this._hi = hi;
        this._lo = lo;
      }
    }

    gt(y) {
      return this._hi > y._hi || this._hi === y._hi && this._lo > y._lo;
    }

    isNegative() {
      return this._hi < 0.0 || this._hi === 0.0 && this._lo < 0.0;
    }

    trunc() {
      if (this.isNaN()) return DD.NaN;
      if (this.isPositive()) return this.floor();else return this.ceil();
    }

    signum() {
      if (this._hi > 0) return 1;
      if (this._hi < 0) return -1;
      if (this._lo > 0) return 1;
      if (this._lo < 0) return -1;
      return 0;
    }

    get interfaces_() {
      return [Serializable, Comparable, Clonable];
    }

  }
  DD.PI = new DD(3.141592653589793116e+00, 1.224646799147353207e-16);
  DD.TWO_PI = new DD(6.283185307179586232e+00, 2.449293598294706414e-16);
  DD.PI_2 = new DD(1.570796326794896558e+00, 6.123233995736766036e-17);
  DD.E = new DD(2.718281828459045091e+00, 1.445646891729250158e-16);
  DD.NaN = new DD(Double.NaN, Double.NaN);
  DD.EPS = 1.23259516440783e-32;
  DD.SPLIT = 134217729.0;
  DD.MAX_PRINT_DIGITS = 32;
  DD.TEN = DD.valueOf(10.0);
  DD.ONE = DD.valueOf(1.0);
  DD.SCI_NOT_EXPONENT_CHAR = 'E';
  DD.SCI_NOT_ZERO = '0.0E0';

  class CGAlgorithmsDD {
    static orientationIndex(p1, p2, q) {
      const index = CGAlgorithmsDD.orientationIndexFilter(p1, p2, q);
      if (index <= 1) return index;
      const dx1 = DD.valueOf(p2.x).selfAdd(-p1.x);
      const dy1 = DD.valueOf(p2.y).selfAdd(-p1.y);
      const dx2 = DD.valueOf(q.x).selfAdd(-p2.x);
      const dy2 = DD.valueOf(q.y).selfAdd(-p2.y);
      return dx1.selfMultiply(dy2).selfSubtract(dy1.selfMultiply(dx2)).signum();
    }

    static signOfDet2x2() {
      if (arguments[3] instanceof DD && arguments[2] instanceof DD && arguments[0] instanceof DD && arguments[1] instanceof DD) {
        const x1 = arguments[0],
              y1 = arguments[1],
              x2 = arguments[2],
              y2 = arguments[3];
        const det = x1.multiply(y2).selfSubtract(y1.multiply(x2));
        return det.signum();
      } else if (typeof arguments[3] === 'number' && typeof arguments[2] === 'number' && typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
        const dx1 = arguments[0],
              dy1 = arguments[1],
              dx2 = arguments[2],
              dy2 = arguments[3];
        const x1 = DD.valueOf(dx1);
        const y1 = DD.valueOf(dy1);
        const x2 = DD.valueOf(dx2);
        const y2 = DD.valueOf(dy2);
        const det = x1.multiply(y2).selfSubtract(y1.multiply(x2));
        return det.signum();
      }
    }

    static intersection(p1, p2, q1, q2) {
      const px = new DD(p1.y).selfSubtract(p2.y);
      const py = new DD(p2.x).selfSubtract(p1.x);
      const pw = new DD(p1.x).selfMultiply(p2.y).selfSubtract(new DD(p2.x).selfMultiply(p1.y));
      const qx = new DD(q1.y).selfSubtract(q2.y);
      const qy = new DD(q2.x).selfSubtract(q1.x);
      const qw = new DD(q1.x).selfMultiply(q2.y).selfSubtract(new DD(q2.x).selfMultiply(q1.y));
      const x = py.multiply(qw).selfSubtract(qy.multiply(pw));
      const y = qx.multiply(pw).selfSubtract(px.multiply(qw));
      const w = px.multiply(qy).selfSubtract(qx.multiply(py));
      const xInt = x.selfDivide(w).doubleValue();
      const yInt = y.selfDivide(w).doubleValue();
      if (Double.isNaN(xInt) || Double.isInfinite(xInt) || Double.isNaN(yInt) || Double.isInfinite(yInt)) return null;
      return new Coordinate(xInt, yInt);
    }

    static orientationIndexFilter(pa, pb, pc) {
      let detsum = null;
      const detleft = (pa.x - pc.x) * (pb.y - pc.y);
      const detright = (pa.y - pc.y) * (pb.x - pc.x);
      const det = detleft - detright;
      if (detleft > 0.0) {
        if (detright <= 0.0) return CGAlgorithmsDD.signum(det);else detsum = detleft + detright;
      } else if (detleft < 0.0) {
        if (detright >= 0.0) return CGAlgorithmsDD.signum(det);else detsum = -detleft - detright;
      } else return CGAlgorithmsDD.signum(det);
      const errbound = CGAlgorithmsDD.DP_SAFE_EPSILON * detsum;
      if (det >= errbound || -det >= errbound) return CGAlgorithmsDD.signum(det);
      return 2;
    }

    static signum(x) {
      if (x > 0) return 1;
      if (x < 0) return -1;
      return 0;
    }

  }
  CGAlgorithmsDD.DP_SAFE_EPSILON = 1e-15;

  class CoordinateSequence {
    getM(index) {
      if (this.hasM()) {
        const mIndex = this.getDimension() - this.getMeasures();
        return this.getOrdinate(index, mIndex);
      } else {
        return Double.NaN;
      }
    }

    setOrdinate(index, ordinateIndex, value) {}

    getZ(index) {
      if (this.hasZ()) return this.getOrdinate(index, 2);else return Double.NaN;
    }

    size() {}

    getOrdinate(index, ordinateIndex) {}

    getCoordinate() {
    }

    getCoordinateCopy(i) {}

    createCoordinate() {}

    getDimension() {}

    hasM() {
      return this.getMeasures() > 0;
    }

    getX(index) {}

    hasZ() {
      return this.getDimension() - this.getMeasures() > 2;
    }

    getMeasures() {
      return 0;
    }

    expandEnvelope(env) {}

    copy() {}

    getY(index) {}

    toCoordinateArray() {}

    get interfaces_() {
      return [Clonable];
    }

  }
  CoordinateSequence.X = 0;
  CoordinateSequence.Y = 1;
  CoordinateSequence.Z = 2;
  CoordinateSequence.M = 3;

  class Orientation {
    static index(p1, p2, q) {
      return CGAlgorithmsDD.orientationIndex(p1, p2, q);
    }

    static isCCW() {
      if (arguments[0] instanceof Array) {
        const ring = arguments[0];
        const nPts = ring.length - 1;
        if (nPts < 3) throw new IllegalArgumentException('Ring has fewer than 4 points, so orientation cannot be determined');
        let hiPt = ring[0];
        let hiIndex = 0;

        for (let i = 1; i <= nPts; i++) {
          const p = ring[i];

          if (p.y > hiPt.y) {
            hiPt = p;
            hiIndex = i;
          }
        }

        let iPrev = hiIndex;

        do {
          iPrev = iPrev - 1;
          if (iPrev < 0) iPrev = nPts;
        } while (ring[iPrev].equals2D(hiPt) && iPrev !== hiIndex);

        let iNext = hiIndex;

        do iNext = (iNext + 1) % nPts; while (ring[iNext].equals2D(hiPt) && iNext !== hiIndex);

        const prev = ring[iPrev];
        const next = ring[iNext];
        if (prev.equals2D(hiPt) || next.equals2D(hiPt) || prev.equals2D(next)) return false;
        const disc = Orientation.index(prev, hiPt, next);
        let isCCW = null;
        if (disc === 0) isCCW = prev.x > next.x;else isCCW = disc > 0;
        return isCCW;
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const ring = arguments[0];
        const nPts = ring.size() - 1;
        if (nPts < 3) throw new IllegalArgumentException('Ring has fewer than 4 points, so orientation cannot be determined');
        let hiPt = ring.getCoordinate(0);
        let hiIndex = 0;

        for (let i = 1; i <= nPts; i++) {
          const p = ring.getCoordinate(i);

          if (p.y > hiPt.y) {
            hiPt = p;
            hiIndex = i;
          }
        }

        let prev = null;
        let iPrev = hiIndex;

        do {
          iPrev = iPrev - 1;
          if (iPrev < 0) iPrev = nPts;
          prev = ring.getCoordinate(iPrev);
        } while (prev.equals2D(hiPt) && iPrev !== hiIndex);

        let next = null;
        let iNext = hiIndex;

        do {
          iNext = (iNext + 1) % nPts;
          next = ring.getCoordinate(iNext);
        } while (next.equals2D(hiPt) && iNext !== hiIndex);

        if (prev.equals2D(hiPt) || next.equals2D(hiPt) || prev.equals2D(next)) return false;
        const disc = Orientation.index(prev, hiPt, next);
        let isCCW = null;
        if (disc === 0) isCCW = prev.x > next.x;else isCCW = disc > 0;
        return isCCW;
      }
    }

  }
  Orientation.CLOCKWISE = -1;
  Orientation.RIGHT = Orientation.CLOCKWISE;
  Orientation.COUNTERCLOCKWISE = 1;
  Orientation.LEFT = Orientation.COUNTERCLOCKWISE;
  Orientation.COLLINEAR = 0;
  Orientation.STRAIGHT = Orientation.COLLINEAR;

  class Intersection {
    static intersection(p1, p2, q1, q2) {
      const minX0 = p1.x < p2.x ? p1.x : p2.x;
      const minY0 = p1.y < p2.y ? p1.y : p2.y;
      const maxX0 = p1.x > p2.x ? p1.x : p2.x;
      const maxY0 = p1.y > p2.y ? p1.y : p2.y;
      const minX1 = q1.x < q2.x ? q1.x : q2.x;
      const minY1 = q1.y < q2.y ? q1.y : q2.y;
      const maxX1 = q1.x > q2.x ? q1.x : q2.x;
      const maxY1 = q1.y > q2.y ? q1.y : q2.y;
      const intMinX = minX0 > minX1 ? minX0 : minX1;
      const intMaxX = maxX0 < maxX1 ? maxX0 : maxX1;
      const intMinY = minY0 > minY1 ? minY0 : minY1;
      const intMaxY = maxY0 < maxY1 ? maxY0 : maxY1;
      const midx = (intMinX + intMaxX) / 2.0;
      const midy = (intMinY + intMaxY) / 2.0;
      const p1x = p1.x - midx;
      const p1y = p1.y - midy;
      const p2x = p2.x - midx;
      const p2y = p2.y - midy;
      const q1x = q1.x - midx;
      const q1y = q1.y - midy;
      const q2x = q2.x - midx;
      const q2y = q2.y - midy;
      const px = p1y - p2y;
      const py = p2x - p1x;
      const pw = p1x * p2y - p2x * p1y;
      const qx = q1y - q2y;
      const qy = q2x - q1x;
      const qw = q1x * q2y - q2x * q1y;
      const x = py * qw - qy * pw;
      const y = qx * pw - px * qw;
      const w = px * qy - qx * py;
      const xInt = x / w;
      const yInt = y / w;
      if (Double.isNaN(xInt) || Double.isInfinite(xInt) || Double.isNaN(yInt) || Double.isInfinite(yInt)) return null;
      return new Coordinate(xInt + midx, yInt + midy);
    }

  }

  class System {
    static arraycopy(src, srcPos, dest, destPos, len) {
      let c = 0;

      for (let i = srcPos; i < srcPos + len; i++) {
        dest[destPos + c] = src[i];
        c++;
      }
    }

    static getProperty(name) {
      return {
        'line.separator': '\n'
      }[name];
    }

  }

  class MathUtil {
    static log10(x) {
      const ln = Math.log(x);
      if (Double.isInfinite(ln)) return ln;
      if (Double.isNaN(ln)) return ln;
      return ln / MathUtil.LOG_10;
    }

    static min(v1, v2, v3, v4) {
      let min = v1;
      if (v2 < min) min = v2;
      if (v3 < min) min = v3;
      if (v4 < min) min = v4;
      return min;
    }

    static clamp() {
      if (typeof arguments[2] === 'number' && typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
        const x = arguments[0],
              min = arguments[1],
              max = arguments[2];
        if (x < min) return min;
        if (x > max) return max;
        return x;
      } else if (Number.isInteger(arguments[2]) && Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
        const x = arguments[0],
              min = arguments[1],
              max = arguments[2];
        if (x < min) return min;
        if (x > max) return max;
        return x;
      }
    }

    static wrap(index, max) {
      if (index < 0) return max - -index % max;
      return index % max;
    }

    static max() {
      if (arguments.length === 3) {
        const v1 = arguments[0],
              v2 = arguments[1],
              v3 = arguments[2];
        let max = v1;
        if (v2 > max) max = v2;
        if (v3 > max) max = v3;
        return max;
      } else if (arguments.length === 4) {
        const v1 = arguments[0],
              v2 = arguments[1],
              v3 = arguments[2],
              v4 = arguments[3];
        let max = v1;
        if (v2 > max) max = v2;
        if (v3 > max) max = v3;
        if (v4 > max) max = v4;
        return max;
      }
    }

    static average(x1, x2) {
      return (x1 + x2) / 2.0;
    }

  }
  MathUtil.LOG_10 = Math.log(10);

  class Distance {
    static segmentToSegment(A, B, C, D) {
      if (A.equals(B)) return Distance.pointToSegment(A, C, D);
      if (C.equals(D)) return Distance.pointToSegment(D, A, B);
      let noIntersection = false;

      if (!Envelope.intersects(A, B, C, D)) {
        noIntersection = true;
      } else {
        const denom = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

        if (denom === 0) {
          noIntersection = true;
        } else {
          const r_num = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
          const s_num = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
          const s = s_num / denom;
          const r = r_num / denom;
          if (r < 0 || r > 1 || s < 0 || s > 1) noIntersection = true;
        }
      }

      if (noIntersection) return MathUtil.min(Distance.pointToSegment(A, C, D), Distance.pointToSegment(B, C, D), Distance.pointToSegment(C, A, B), Distance.pointToSegment(D, A, B));
      return 0.0;
    }

    static pointToSegment(p, A, B) {
      if (A.x === B.x && A.y === B.y) return p.distance(A);
      const len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
      const r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y)) / len2;
      if (r <= 0.0) return p.distance(A);
      if (r >= 1.0) return p.distance(B);
      const s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2;
      return Math.abs(s) * Math.sqrt(len2);
    }

    static pointToLinePerpendicular(p, A, B) {
      const len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
      const s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2;
      return Math.abs(s) * Math.sqrt(len2);
    }

    static pointToSegmentString(p, line) {
      if (line.length === 0) throw new IllegalArgumentException('Line array must contain at least one vertex');
      let minDistance = p.distance(line[0]);

      for (let i = 0; i < line.length - 1; i++) {
        const dist = Distance.pointToSegment(p, line[i], line[i + 1]);
        if (dist < minDistance) minDistance = dist;
      }

      return minDistance;
    }

  }

  class CoordinateSequenceFactory {
    create() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof Array) ; else if (hasInterface(arguments[0], CoordinateSequence)) ;
      } else if (arguments.length === 2) ; else if (arguments.length === 3) {
        const size = arguments[0],
              dimension = arguments[1];
        return this.create(size, dimension);
      }
    }

  }

  class GeometryComponentFilter {
    filter(geom) {}

  }

  class Geometry {
    constructor() {
      Geometry.constructor_.apply(this, arguments);
    }

    isGeometryCollection() {
      return this.getTypeCode() === Geometry.TYPECODE_GEOMETRYCOLLECTION;
    }

    getFactory() {
      return this._factory;
    }

    getGeometryN(n) {
      return this;
    }

    getArea() {
      return 0.0;
    }

    isRectangle() {
      return false;
    }

    equalsExact(other) {
      return this === other || this.equalsExact(other, 0);
    }

    geometryChanged() {
      this.apply(Geometry.geometryChangedFilter);
    }

    geometryChangedAction() {
      this._envelope = null;
    }

    equalsNorm(g) {
      if (g === null) return false;
      return this.norm().equalsExact(g.norm());
    }

    getLength() {
      return 0.0;
    }

    getNumGeometries() {
      return 1;
    }

    compareTo() {
      let other;

      if (arguments.length === 1) {
        const o = arguments[0];
        other = o;
        if (this.getTypeCode() !== other.getTypeCode()) return this.getTypeCode() - other.getTypeCode();
        if (this.isEmpty() && other.isEmpty()) return 0;
        if (this.isEmpty()) return -1;
        if (other.isEmpty()) return 1;
        return this.compareToSameClass(o);
      } else if (arguments.length === 2) {
        const o = arguments[0];
        const comp = arguments[1];
        other = o;
        if (this.getTypeCode() !== other.getTypeCode()) return this.getTypeCode() - other.getTypeCode();
        if (this.isEmpty() && other.isEmpty()) return 0;
        if (this.isEmpty()) return -1;
        if (other.isEmpty()) return 1;
        return this.compareToSameClass(o, comp);
      }
    }

    getUserData() {
      return this._userData;
    }

    getSRID() {
      return this._SRID;
    }

    getEnvelope() {
      return this.getFactory().toGeometry(this.getEnvelopeInternal());
    }

    checkNotGeometryCollection(g) {
      if (g.getTypeCode() === Geometry.TYPECODE_GEOMETRYCOLLECTION) throw new IllegalArgumentException('This method does not support GeometryCollection arguments');
    }

    equal(a, b, tolerance) {
      if (tolerance === 0) return a.equals(b);
      return a.distance(b) <= tolerance;
    }

    norm() {
      const copy = this.copy();
      copy.normalize();
      return copy;
    }

    reverse() {
      const res = this.reverseInternal();
      if (this.envelope != null) res.envelope = this.envelope.copy();
      res.setSRID(this.getSRID());
      return res;
    }

    copy() {
      const copy = this.copyInternal();
      copy.envelope = this._envelope == null ? null : this._envelope.copy();
      copy._SRID = this._SRID;
      copy._userData = this._userData;
      return copy;
    }

    getPrecisionModel() {
      return this._factory.getPrecisionModel();
    }

    getEnvelopeInternal() {
      if (this._envelope === null) this._envelope = this.computeEnvelopeInternal();
      return new Envelope(this._envelope);
    }

    setSRID(SRID) {
      this._SRID = SRID;
    }

    setUserData(userData) {
      this._userData = userData;
    }

    compare(a, b) {
      const i = a.iterator();
      const j = b.iterator();

      while (i.hasNext() && j.hasNext()) {
        const aElement = i.next();
        const bElement = j.next();
        const comparison = aElement.compareTo(bElement);
        if (comparison !== 0) return comparison;
      }

      if (i.hasNext()) return 1;
      if (j.hasNext()) return -1;
      return 0;
    }

    hashCode() {
      return this.getEnvelopeInternal().hashCode();
    }

    isEquivalentClass(other) {
      return this.getClass() === other.getClass();
    }

    isGeometryCollectionOrDerived() {
      if (this.getTypeCode() === Geometry.TYPECODE_GEOMETRYCOLLECTION || this.getTypeCode() === Geometry.TYPECODE_MULTIPOINT || this.getTypeCode() === Geometry.TYPECODE_MULTILINESTRING || this.getTypeCode() === Geometry.TYPECODE_MULTIPOLYGON) return true;
      return false;
    }

    get interfaces_() {
      return [Clonable, Comparable, Serializable];
    }

    getClass() {
      return Geometry;
    }

    static hasNonEmptyElements(geometries) {
      for (let i = 0; i < geometries.length; i++) if (!geometries[i].isEmpty()) return true;

      return false;
    }

    static hasNullElements(array) {
      for (let i = 0; i < array.length; i++) if (array[i] === null) return true;

      return false;
    }

  }

  Geometry.constructor_ = function (factory) {
    if (!factory) return;
    this._envelope = null;
    this._userData = null;
    this._factory = factory;
    this._SRID = factory.getSRID();
  };

  Geometry.TYPECODE_POINT = 0;
  Geometry.TYPECODE_MULTIPOINT = 1;
  Geometry.TYPECODE_LINESTRING = 2;
  Geometry.TYPECODE_LINEARRING = 3;
  Geometry.TYPECODE_MULTILINESTRING = 4;
  Geometry.TYPECODE_POLYGON = 5;
  Geometry.TYPECODE_MULTIPOLYGON = 6;
  Geometry.TYPECODE_GEOMETRYCOLLECTION = 7;
  Geometry.TYPENAME_POINT = 'Point';
  Geometry.TYPENAME_MULTIPOINT = 'MultiPoint';
  Geometry.TYPENAME_LINESTRING = 'LineString';
  Geometry.TYPENAME_LINEARRING = 'LinearRing';
  Geometry.TYPENAME_MULTILINESTRING = 'MultiLineString';
  Geometry.TYPENAME_POLYGON = 'Polygon';
  Geometry.TYPENAME_MULTIPOLYGON = 'MultiPolygon';
  Geometry.TYPENAME_GEOMETRYCOLLECTION = 'GeometryCollection';
  Geometry.geometryChangedFilter = {
    get interfaces_() {
      return [GeometryComponentFilter];
    },

    filter(geom) {
      geom.geometryChangedAction();
    }

  };

  class CoordinateFilter {
    filter(coord) {}

  }

  class Length {
    static ofLine(pts) {
      const n = pts.size();
      if (n <= 1) return 0.0;
      let len = 0.0;
      const p = new Coordinate();
      pts.getCoordinate(0, p);
      let x0 = p.x;
      let y0 = p.y;

      for (let i = 1; i < n; i++) {
        pts.getCoordinate(i, p);
        const x1 = p.x;
        const y1 = p.y;
        const dx = x1 - x0;
        const dy = y1 - y0;
        len += Math.sqrt(dx * dx + dy * dy);
        x0 = x1;
        y0 = y1;
      }

      return len;
    }

  }

  class Lineal {}

  class CoordinateSequences {
    static copyCoord(src, srcPos, dest, destPos) {
      const minDim = Math.min(src.getDimension(), dest.getDimension());

      for (let dim = 0; dim < minDim; dim++) dest.setOrdinate(destPos, dim, src.getOrdinate(srcPos, dim));
    }

    static isRing(seq) {
      const n = seq.size();
      if (n === 0) return true;
      if (n <= 3) return false;
      return seq.getOrdinate(0, CoordinateSequence.X) === seq.getOrdinate(n - 1, CoordinateSequence.X) && seq.getOrdinate(0, CoordinateSequence.Y) === seq.getOrdinate(n - 1, CoordinateSequence.Y);
    }

    static scroll() {
      if (arguments.length === 2) {
        if (hasInterface(arguments[0], CoordinateSequence) && Number.isInteger(arguments[1])) {
          const seq = arguments[0],
                indexOfFirstCoordinate = arguments[1];
          CoordinateSequences.scroll(seq, indexOfFirstCoordinate, CoordinateSequences.isRing(seq));
        } else if (hasInterface(arguments[0], CoordinateSequence) && arguments[1] instanceof Coordinate) {
          const seq = arguments[0],
                firstCoordinate = arguments[1];
          const i = CoordinateSequences.indexOf(firstCoordinate, seq);
          if (i <= 0) return null;
          CoordinateSequences.scroll(seq, i);
        }
      } else if (arguments.length === 3) {
        const seq = arguments[0],
              indexOfFirstCoordinate = arguments[1],
              ensureRing = arguments[2];
        const i = indexOfFirstCoordinate;
        if (i <= 0) return null;
        const copy = seq.copy();
        const last = ensureRing ? seq.size() - 1 : seq.size();

        for (let j = 0; j < last; j++) for (let k = 0; k < seq.getDimension(); k++) seq.setOrdinate(j, k, copy.getOrdinate((indexOfFirstCoordinate + j) % last, k));

        if (ensureRing) for (let k = 0; k < seq.getDimension(); k++) seq.setOrdinate(last, k, seq.getOrdinate(0, k));
      }
    }

    static isEqual(cs1, cs2) {
      const cs1Size = cs1.size();
      const cs2Size = cs2.size();
      if (cs1Size !== cs2Size) return false;
      const dim = Math.min(cs1.getDimension(), cs2.getDimension());

      for (let i = 0; i < cs1Size; i++) for (let d = 0; d < dim; d++) {
        const v1 = cs1.getOrdinate(i, d);
        const v2 = cs2.getOrdinate(i, d);
        if (cs1.getOrdinate(i, d) === cs2.getOrdinate(i, d)) continue;
        if (Double.isNaN(v1) && Double.isNaN(v2)) continue;
        return false;
      }

      return true;
    }

    static minCoordinateIndex() {
      if (arguments.length === 1) {
        const seq = arguments[0];
        return CoordinateSequences.minCoordinateIndex(seq, 0, seq.size() - 1);
      } else if (arguments.length === 3) {
        const seq = arguments[0],
              from = arguments[1],
              to = arguments[2];
        let minCoordIndex = -1;
        let minCoord = null;

        for (let i = from; i <= to; i++) {
          const testCoord = seq.getCoordinate(i);

          if (minCoord === null || minCoord.compareTo(testCoord) > 0) {
            minCoord = testCoord;
            minCoordIndex = i;
          }
        }

        return minCoordIndex;
      }
    }

    static extend(fact, seq, size) {
      const newseq = fact.create(size, seq.getDimension());
      const n = seq.size();
      CoordinateSequences.copy(seq, 0, newseq, 0, n);
      if (n > 0) for (let i = n; i < size; i++) CoordinateSequences.copy(seq, n - 1, newseq, i, 1);
      return newseq;
    }

    static reverse(seq) {
      const last = seq.size() - 1;
      const mid = Math.trunc(last / 2);

      for (let i = 0; i <= mid; i++) CoordinateSequences.swap(seq, i, last - i);
    }

    static swap(seq, i, j) {
      if (i === j) return null;

      for (let dim = 0; dim < seq.getDimension(); dim++) {
        const tmp = seq.getOrdinate(i, dim);
        seq.setOrdinate(i, dim, seq.getOrdinate(j, dim));
        seq.setOrdinate(j, dim, tmp);
      }
    }

    static copy(src, srcPos, dest, destPos, length) {
      for (let i = 0; i < length; i++) CoordinateSequences.copyCoord(src, srcPos + i, dest, destPos + i);
    }

    static ensureValidRing(fact, seq) {
      const n = seq.size();
      if (n === 0) return seq;
      if (n <= 3) return CoordinateSequences.createClosedRing(fact, seq, 4);
      const isClosed = seq.getOrdinate(0, CoordinateSequence.X) === seq.getOrdinate(n - 1, CoordinateSequence.X) && seq.getOrdinate(0, CoordinateSequence.Y) === seq.getOrdinate(n - 1, CoordinateSequence.Y);
      if (isClosed) return seq;
      return CoordinateSequences.createClosedRing(fact, seq, n + 1);
    }

    static indexOf(coordinate, seq) {
      for (let i = 0; i < seq.size(); i++) if (coordinate.x === seq.getOrdinate(i, CoordinateSequence.X) && coordinate.y === seq.getOrdinate(i, CoordinateSequence.Y)) return i;

      return -1;
    }

    static createClosedRing(fact, seq, size) {
      const newseq = fact.create(size, seq.getDimension());
      const n = seq.size();
      CoordinateSequences.copy(seq, 0, newseq, 0, n);

      for (let i = n; i < size; i++) CoordinateSequences.copy(seq, 0, newseq, i, 1);

      return newseq;
    }

    static minCoordinate(seq) {
      let minCoord = null;

      for (let i = 0; i < seq.size(); i++) {
        const testCoord = seq.getCoordinate(i);
        if (minCoord === null || minCoord.compareTo(testCoord) > 0) minCoord = testCoord;
      }

      return minCoord;
    }

  }

  class UnsupportedOperationException extends Exception {
    constructor(message) {
      super(message);
      this.name = Object.keys({
        UnsupportedOperationException
      })[0];
    }

  }

  class Dimension {
    static toDimensionSymbol(dimensionValue) {
      switch (dimensionValue) {
        case Dimension.FALSE:
          return Dimension.SYM_FALSE;

        case Dimension.TRUE:
          return Dimension.SYM_TRUE;

        case Dimension.DONTCARE:
          return Dimension.SYM_DONTCARE;

        case Dimension.P:
          return Dimension.SYM_P;

        case Dimension.L:
          return Dimension.SYM_L;

        case Dimension.A:
          return Dimension.SYM_A;
      }

      throw new IllegalArgumentException('Unknown dimension value: ' + dimensionValue);
    }

    static toDimensionValue(dimensionSymbol) {
      switch (Character.toUpperCase(dimensionSymbol)) {
        case Dimension.SYM_FALSE:
          return Dimension.FALSE;

        case Dimension.SYM_TRUE:
          return Dimension.TRUE;

        case Dimension.SYM_DONTCARE:
          return Dimension.DONTCARE;

        case Dimension.SYM_P:
          return Dimension.P;

        case Dimension.SYM_L:
          return Dimension.L;

        case Dimension.SYM_A:
          return Dimension.A;
      }

      throw new IllegalArgumentException('Unknown dimension symbol: ' + dimensionSymbol);
    }

  }
  Dimension.P = 0;
  Dimension.L = 1;
  Dimension.A = 2;
  Dimension.FALSE = -1;
  Dimension.TRUE = -2;
  Dimension.DONTCARE = -3;
  Dimension.SYM_FALSE = 'F';
  Dimension.SYM_TRUE = 'T';
  Dimension.SYM_DONTCARE = '*';
  Dimension.SYM_P = '0';
  Dimension.SYM_L = '1';
  Dimension.SYM_A = '2';

  class GeometryFilter {
    filter(geom) {}

  }

  class LineString extends Geometry {
    constructor() {
      super();
      LineString.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._points = null;

      if (arguments.length === 0) ; else if (arguments.length === 2) {
        const points = arguments[0],
              factory = arguments[1];
        Geometry.constructor_.call(this, factory);
        this.init(points);
      }
    }

    computeEnvelopeInternal() {
      if (this.isEmpty()) return new Envelope();
      return this._points.expandEnvelope(new Envelope());
    }

    isRing() {
      return this.isClosed() && this.isSimple();
    }

    getCoordinates() {
      return this._points.toCoordinateArray();
    }

    copyInternal() {
      return new LineString(this._points.copy(), this._factory);
    }

    equalsExact() {
      if (arguments.length === 2 && typeof arguments[1] === 'number' && arguments[0] instanceof Geometry) {
        const other = arguments[0],
              tolerance = arguments[1];
        if (!this.isEquivalentClass(other)) return false;
        const otherLineString = other;
        if (this._points.size() !== otherLineString._points.size()) return false;

        for (let i = 0; i < this._points.size(); i++) if (!this.equal(this._points.getCoordinate(i), otherLineString._points.getCoordinate(i), tolerance)) return false;

        return true;
      } else {
        return super.equalsExact.apply(this, arguments);
      }
    }

    normalize() {
      for (let i = 0; i < Math.trunc(this._points.size() / 2); i++) {
        const j = this._points.size() - 1 - i;

        if (!this._points.getCoordinate(i).equals(this._points.getCoordinate(j))) {
          if (this._points.getCoordinate(i).compareTo(this._points.getCoordinate(j)) > 0) {
            const copy = this._points.copy();

            CoordinateSequences.reverse(copy);
            this._points = copy;
          }

          return null;
        }
      }
    }

    getCoordinate() {
      if (this.isEmpty()) return null;
      return this._points.getCoordinate(0);
    }

    getBoundaryDimension() {
      if (this.isClosed()) return Dimension.FALSE;
      return 0;
    }

    isClosed() {
      if (this.isEmpty()) return false;
      return this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints() - 1));
    }

    reverseInternal() {
      const seq = this._points.copy();

      CoordinateSequences.reverse(seq);
      return this.getFactory().createLineString(seq);
    }

    getEndPoint() {
      if (this.isEmpty()) return null;
      return this.getPointN(this.getNumPoints() - 1);
    }

    getTypeCode() {
      return Geometry.TYPECODE_LINESTRING;
    }

    getDimension() {
      return 1;
    }

    getLength() {
      return Length.ofLine(this._points);
    }

    getNumPoints() {
      return this._points.size();
    }

    compareToSameClass() {
      if (arguments.length === 1) {
        const o = arguments[0];
        const line = o;
        let i = 0;
        let j = 0;

        while (i < this._points.size() && j < line._points.size()) {
          const comparison = this._points.getCoordinate(i).compareTo(line._points.getCoordinate(j));

          if (comparison !== 0) return comparison;
          i++;
          j++;
        }

        if (i < this._points.size()) return 1;
        if (j < line._points.size()) return -1;
        return 0;
      } else if (arguments.length === 2) {
        const o = arguments[0],
              comp = arguments[1];
        const line = o;
        return comp.compare(this._points, line._points);
      }
    }

    apply() {
      if (hasInterface(arguments[0], CoordinateFilter)) {
        const filter = arguments[0];

        for (let i = 0; i < this._points.size(); i++) filter.filter(this._points.getCoordinate(i));
      } else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
        const filter = arguments[0];
        if (this._points.size() === 0) return null;

        for (let i = 0; i < this._points.size(); i++) {
          filter.filter(this._points, i);
          if (filter.isDone()) break;
        }

        if (filter.isGeometryChanged()) this.geometryChanged();
      } else if (hasInterface(arguments[0], GeometryFilter)) {
        const filter = arguments[0];
        filter.filter(this);
      } else if (hasInterface(arguments[0], GeometryComponentFilter)) {
        const filter = arguments[0];
        filter.filter(this);
      }
    }

    getBoundary() {
      throw new UnsupportedOperationException();
    }

    isEquivalentClass(other) {
      return other instanceof LineString;
    }

    getCoordinateN(n) {
      return this._points.getCoordinate(n);
    }

    getGeometryType() {
      return Geometry.TYPENAME_LINESTRING;
    }

    getCoordinateSequence() {
      return this._points;
    }

    isEmpty() {
      return this._points.size() === 0;
    }

    init(points) {
      if (points === null) points = this.getFactory().getCoordinateSequenceFactory().create([]);
      if (points.size() === 1) throw new IllegalArgumentException('Invalid number of points in LineString (found ' + points.size() + ' - must be 0 or >= 2)');
      this._points = points;
    }

    isCoordinate(pt) {
      for (let i = 0; i < this._points.size(); i++) if (this._points.getCoordinate(i).equals(pt)) return true;

      return false;
    }

    getStartPoint() {
      if (this.isEmpty()) return null;
      return this.getPointN(0);
    }

    getPointN(n) {
      return this.getFactory().createPoint(this._points.getCoordinate(n));
    }

    get interfaces_() {
      return [Lineal];
    }

  }

  class Puntal {}

  class Point extends Geometry {
    constructor() {
      super();
      Point.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._coordinates = null;
      const coordinates = arguments[0],
            factory = arguments[1];
      Geometry.constructor_.call(this, factory);
      this.init(coordinates);
    }

    computeEnvelopeInternal() {
      if (this.isEmpty()) return new Envelope();
      const env = new Envelope();
      env.expandToInclude(this._coordinates.getX(0), this._coordinates.getY(0));
      return env;
    }

    getCoordinates() {
      return this.isEmpty() ? [] : [this.getCoordinate()];
    }

    copyInternal() {
      return new Point(this._coordinates.copy(), this._factory);
    }

    equalsExact() {
      if (arguments.length === 2 && typeof arguments[1] === 'number' && arguments[0] instanceof Geometry) {
        const other = arguments[0],
              tolerance = arguments[1];
        if (!this.isEquivalentClass(other)) return false;
        if (this.isEmpty() && other.isEmpty()) return true;
        if (this.isEmpty() !== other.isEmpty()) return false;
        return this.equal(other.getCoordinate(), this.getCoordinate(), tolerance);
      } else {
        return super.equalsExact.apply(this, arguments);
      }
    }

    normalize() {}

    getCoordinate() {
      return this._coordinates.size() !== 0 ? this._coordinates.getCoordinate(0) : null;
    }

    getBoundaryDimension() {
      return Dimension.FALSE;
    }

    reverseInternal() {
      return this.getFactory().createPoint(this._coordinates.copy());
    }

    getTypeCode() {
      return Geometry.TYPECODE_POINT;
    }

    getDimension() {
      return 0;
    }

    getNumPoints() {
      return this.isEmpty() ? 0 : 1;
    }

    getX() {
      if (this.getCoordinate() === null) throw new IllegalStateException('getX called on empty Point');
      return this.getCoordinate().x;
    }

    compareToSameClass() {
      if (arguments.length === 1) {
        const other = arguments[0];
        const point = other;
        return this.getCoordinate().compareTo(point.getCoordinate());
      } else if (arguments.length === 2) {
        const other = arguments[0],
              comp = arguments[1];
        const point = other;
        return comp.compare(this._coordinates, point._coordinates);
      }
    }

    apply() {
      if (hasInterface(arguments[0], CoordinateFilter)) {
        const filter = arguments[0];
        if (this.isEmpty()) return null;
        filter.filter(this.getCoordinate());
      } else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
        const filter = arguments[0];
        if (this.isEmpty()) return null;
        filter.filter(this._coordinates, 0);
        if (filter.isGeometryChanged()) this.geometryChanged();
      } else if (hasInterface(arguments[0], GeometryFilter)) {
        const filter = arguments[0];
        filter.filter(this);
      } else if (hasInterface(arguments[0], GeometryComponentFilter)) {
        const filter = arguments[0];
        filter.filter(this);
      }
    }

    getBoundary() {
      return this.getFactory().createGeometryCollection();
    }

    getGeometryType() {
      return Geometry.TYPENAME_POINT;
    }

    getCoordinateSequence() {
      return this._coordinates;
    }

    getY() {
      if (this.getCoordinate() === null) throw new IllegalStateException('getY called on empty Point');
      return this.getCoordinate().y;
    }

    isEmpty() {
      return this._coordinates.size() === 0;
    }

    init(coordinates) {
      if (coordinates === null) coordinates = this.getFactory().getCoordinateSequenceFactory().create([]);
      Assert.isTrue(coordinates.size() <= 1);
      this._coordinates = coordinates;
    }

    isSimple() {
      return true;
    }

    get interfaces_() {
      return [Puntal];
    }

  }

  class Area {
    static ofRing() {
      if (arguments[0] instanceof Array) {
        const ring = arguments[0];
        return Math.abs(Area.ofRingSigned(ring));
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const ring = arguments[0];
        return Math.abs(Area.ofRingSigned(ring));
      }
    }

    static ofRingSigned() {
      if (arguments[0] instanceof Array) {
        const ring = arguments[0];
        if (ring.length < 3) return 0.0;
        let sum = 0.0;
        const x0 = ring[0].x;

        for (let i = 1; i < ring.length - 1; i++) {
          const x = ring[i].x - x0;
          const y1 = ring[i + 1].y;
          const y2 = ring[i - 1].y;
          sum += x * (y2 - y1);
        }

        return sum / 2.0;
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const ring = arguments[0];
        const n = ring.size();
        if (n < 3) return 0.0;
        const p0 = new Coordinate();
        const p1 = new Coordinate();
        const p2 = new Coordinate();
        ring.getCoordinate(0, p1);
        ring.getCoordinate(1, p2);
        const x0 = p1.x;
        p2.x -= x0;
        let sum = 0.0;

        for (let i = 1; i < n - 1; i++) {
          p0.y = p1.y;
          p1.x = p2.x;
          p1.y = p2.y;
          ring.getCoordinate(i + 1, p2);
          p2.x -= x0;
          sum += p1.x * (p0.y - p2.y);
        }

        return sum / 2.0;
      }
    }

  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/Arrays.html
   */

  class Arrays {
    static sort() {
      const a = arguments[0];

      if (arguments.length === 1) {
        a.sort((a, b) => a.compareTo(b));
      } else if (arguments.length === 2) {
        a.sort((a, b) => arguments[1].compare(a, b));
      } else if (arguments.length === 3) {
        const t = a.slice(arguments[1], arguments[2]);
        t.sort();
        const r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
        a.splice(0, a.length);

        for (const e of r) a.push(e);
      } else if (arguments.length === 4) {
        const t = a.slice(arguments[1], arguments[2]);
        t.sort((a, b) => arguments[3].compare(a, b));
        const r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
        a.splice(0, a.length);

        for (const e of r) a.push(e);
      }
    }
    /**
     * @param {Array} array
     * @return {ArrayList}
     */


    static asList(array) {
      const arrayList = new ArrayList();

      for (const e of array) arrayList.add(e);

      return arrayList;
    }

    static copyOf(original, newLength) {
      return original.slice(0, newLength);
    }

  }

  class Polygonal {}

  class Polygon extends Geometry {
    constructor() {
      super();
      Polygon.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._shell = null;
      this._holes = null;
      let shell = arguments[0],
          holes = arguments[1],
          factory = arguments[2];
      Geometry.constructor_.call(this, factory);
      if (shell === null) shell = this.getFactory().createLinearRing();
      if (holes === null) holes = [];
      if (Geometry.hasNullElements(holes)) throw new IllegalArgumentException('holes must not contain null elements');
      if (shell.isEmpty() && Geometry.hasNonEmptyElements(holes)) throw new IllegalArgumentException('shell is empty but holes are not');
      this._shell = shell;
      this._holes = holes;
    }

    computeEnvelopeInternal() {
      return this._shell.getEnvelopeInternal();
    }

    getCoordinates() {
      if (this.isEmpty()) return [];
      const coordinates = new Array(this.getNumPoints()).fill(null);
      let k = -1;

      const shellCoordinates = this._shell.getCoordinates();

      for (let x = 0; x < shellCoordinates.length; x++) {
        k++;
        coordinates[k] = shellCoordinates[x];
      }

      for (let i = 0; i < this._holes.length; i++) {
        const childCoordinates = this._holes[i].getCoordinates();

        for (let j = 0; j < childCoordinates.length; j++) {
          k++;
          coordinates[k] = childCoordinates[j];
        }
      }

      return coordinates;
    }

    getArea() {
      let area = 0.0;
      area += Area.ofRing(this._shell.getCoordinateSequence());

      for (let i = 0; i < this._holes.length; i++) area -= Area.ofRing(this._holes[i].getCoordinateSequence());

      return area;
    }

    copyInternal() {
      const shellCopy = this._shell.copy();

      const holeCopies = new Array(this._holes.length).fill(null);

      for (let i = 0; i < this._holes.length; i++) holeCopies[i] = this._holes[i].copy();

      return new Polygon(shellCopy, holeCopies, this._factory);
    }

    isRectangle() {
      if (this.getNumInteriorRing() !== 0) return false;
      if (this._shell === null) return false;
      if (this._shell.getNumPoints() !== 5) return false;

      const seq = this._shell.getCoordinateSequence();

      const env = this.getEnvelopeInternal();

      for (let i = 0; i < 5; i++) {
        const x = seq.getX(i);
        if (!(x === env.getMinX() || x === env.getMaxX())) return false;
        const y = seq.getY(i);
        if (!(y === env.getMinY() || y === env.getMaxY())) return false;
      }

      let prevX = seq.getX(0);
      let prevY = seq.getY(0);

      for (let i = 1; i <= 4; i++) {
        const x = seq.getX(i);
        const y = seq.getY(i);
        const xChanged = x !== prevX;
        const yChanged = y !== prevY;
        if (xChanged === yChanged) return false;
        prevX = x;
        prevY = y;
      }

      return true;
    }

    equalsExact() {
      if (arguments.length === 2 && typeof arguments[1] === 'number' && arguments[0] instanceof Geometry) {
        const other = arguments[0],
              tolerance = arguments[1];
        if (!this.isEquivalentClass(other)) return false;
        const otherPolygon = other;
        const thisShell = this._shell;
        const otherPolygonShell = otherPolygon._shell;
        if (!thisShell.equalsExact(otherPolygonShell, tolerance)) return false;
        if (this._holes.length !== otherPolygon._holes.length) return false;

        for (let i = 0; i < this._holes.length; i++) if (!this._holes[i].equalsExact(otherPolygon._holes[i], tolerance)) return false;

        return true;
      } else {
        return super.equalsExact.apply(this, arguments);
      }
    }

    normalize() {
      if (arguments.length === 0) {
        this._shell = this.normalized(this._shell, true);

        for (let i = 0; i < this._holes.length; i++) this._holes[i] = this.normalized(this._holes[i], false);

        Arrays.sort(this._holes);
      } else if (arguments.length === 2) {
        const ring = arguments[0],
              clockwise = arguments[1];
        if (ring.isEmpty()) return null;
        const seq = ring.getCoordinateSequence();
        const minCoordinateIndex = CoordinateSequences.minCoordinateIndex(seq, 0, seq.size() - 2);
        CoordinateSequences.scroll(seq, minCoordinateIndex, true);
        if (Orientation.isCCW(seq) === clockwise) CoordinateSequences.reverse(seq);
      }
    }

    getCoordinate() {
      return this._shell.getCoordinate();
    }

    getNumInteriorRing() {
      return this._holes.length;
    }

    getBoundaryDimension() {
      return 1;
    }

    reverseInternal() {
      const shell = this.getExteriorRing().reverse();
      const holes = new Array(this.getNumInteriorRing()).fill(null);

      for (let i = 0; i < holes.length; i++) holes[i] = this.getInteriorRingN(i).reverse();

      return this.getFactory().createPolygon(shell, holes);
    }

    getTypeCode() {
      return Geometry.TYPECODE_POLYGON;
    }

    getDimension() {
      return 2;
    }

    getLength() {
      let len = 0.0;
      len += this._shell.getLength();

      for (let i = 0; i < this._holes.length; i++) len += this._holes[i].getLength();

      return len;
    }

    getNumPoints() {
      let numPoints = this._shell.getNumPoints();

      for (let i = 0; i < this._holes.length; i++) numPoints += this._holes[i].getNumPoints();

      return numPoints;
    }

    convexHull() {
      return this.getExteriorRing().convexHull();
    }

    normalized(ring, clockwise) {
      const res = ring.copy();
      this.normalize(res, clockwise);
      return res;
    }

    compareToSameClass() {
      if (arguments.length === 1) {
        const o = arguments[0];
        const thisShell = this._shell;
        const otherShell = o._shell;
        return thisShell.compareToSameClass(otherShell);
      } else if (arguments.length === 2) {
        const o = arguments[0],
              comp = arguments[1];
        const poly = o;
        const thisShell = this._shell;
        const otherShell = poly._shell;
        const shellComp = thisShell.compareToSameClass(otherShell, comp);
        if (shellComp !== 0) return shellComp;
        const nHole1 = this.getNumInteriorRing();
        const nHole2 = poly.getNumInteriorRing();
        let i = 0;

        while (i < nHole1 && i < nHole2) {
          const thisHole = this.getInteriorRingN(i);
          const otherHole = poly.getInteriorRingN(i);
          const holeComp = thisHole.compareToSameClass(otherHole, comp);
          if (holeComp !== 0) return holeComp;
          i++;
        }

        if (i < nHole1) return 1;
        if (i < nHole2) return -1;
        return 0;
      }
    }

    apply() {
      if (hasInterface(arguments[0], CoordinateFilter)) {
        const filter = arguments[0];

        this._shell.apply(filter);

        for (let i = 0; i < this._holes.length; i++) this._holes[i].apply(filter);
      } else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
        const filter = arguments[0];

        this._shell.apply(filter);

        if (!filter.isDone()) for (let i = 0; i < this._holes.length; i++) {
          this._holes[i].apply(filter);

          if (filter.isDone()) break;
        }
        if (filter.isGeometryChanged()) this.geometryChanged();
      } else if (hasInterface(arguments[0], GeometryFilter)) {
        const filter = arguments[0];
        filter.filter(this);
      } else if (hasInterface(arguments[0], GeometryComponentFilter)) {
        const filter = arguments[0];
        filter.filter(this);

        this._shell.apply(filter);

        for (let i = 0; i < this._holes.length; i++) this._holes[i].apply(filter);
      }
    }

    getBoundary() {
      if (this.isEmpty()) return this.getFactory().createMultiLineString();
      const rings = new Array(this._holes.length + 1).fill(null);
      rings[0] = this._shell;

      for (let i = 0; i < this._holes.length; i++) rings[i + 1] = this._holes[i];

      if (rings.length <= 1) return this.getFactory().createLinearRing(rings[0].getCoordinateSequence());
      return this.getFactory().createMultiLineString(rings);
    }

    getGeometryType() {
      return Geometry.TYPENAME_POLYGON;
    }

    getExteriorRing() {
      return this._shell;
    }

    isEmpty() {
      return this._shell.isEmpty();
    }

    getInteriorRingN(n) {
      return this._holes[n];
    }

    get interfaces_() {
      return [Polygonal];
    }

  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/Set.html
   *
   * @extends {Collection}
   * @constructor
   * @private
   */

  class Set extends Collection {
    /**
     * Returns true if this set contains the specified element. More formally,
     * returns true if and only if this set contains an element e such that (o==null ?
     * e==null : o.equals(e)).
     * @param {Object} e
     * @return {boolean}
     */
    contains() {}

  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/SortedSet.html
   */

  class SortedSet extends Set {}

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeSet.html
   */

  class TreeSet extends SortedSet {
    constructor(o) {
      super();
      this.array = [];
      if (o instanceof Collection) this.addAll(o);
    }

    contains(o) {
      for (const e of this.array) if (e.compareTo(o) === 0) return true;

      return false;
    }

    add(o) {
      if (this.contains(o)) return false;

      for (let i = 0, len = this.array.length; i < len; i++) {
        const e = this.array[i];
        if (e.compareTo(o) === 1) return !!this.array.splice(i, 0, o);
      }

      this.array.push(o);
      return true;
    }

    addAll(c) {
      for (const e of c) this.add(e);

      return true;
    }

    remove() {
      throw new UnsupportedOperationException();
    }

    size() {
      return this.array.length;
    }

    isEmpty() {
      return this.array.length === 0;
    }

    toArray() {
      return this.array.slice();
    }

    iterator() {
      return new Iterator$2(this.array);
    }

  }

  class Iterator$2 {
    constructor(array) {
      this.array = array;
      this.position = 0;
    }

    next() {
      if (this.position === this.array.length) throw new NoSuchElementException();
      return this.array[this.position++];
    }

    hasNext() {
      return this.position < this.array.length;
    }

    remove() {
      throw new UnsupportedOperationException();
    }

  }

  class GeometryCollection extends Geometry {
    constructor() {
      super();
      GeometryCollection.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geometries = null;

      if (arguments.length === 0) ; else if (arguments.length === 2) {
        let geometries = arguments[0],
            factory = arguments[1];
        Geometry.constructor_.call(this, factory);
        if (geometries === null) geometries = [];
        if (Geometry.hasNullElements(geometries)) throw new IllegalArgumentException('geometries must not contain null elements');
        this._geometries = geometries;
      }
    }

    computeEnvelopeInternal() {
      const envelope = new Envelope();

      for (let i = 0; i < this._geometries.length; i++) envelope.expandToInclude(this._geometries[i].getEnvelopeInternal());

      return envelope;
    }

    getGeometryN(n) {
      return this._geometries[n];
    }

    getCoordinates() {
      const coordinates = new Array(this.getNumPoints()).fill(null);
      let k = -1;

      for (let i = 0; i < this._geometries.length; i++) {
        const childCoordinates = this._geometries[i].getCoordinates();

        for (let j = 0; j < childCoordinates.length; j++) {
          k++;
          coordinates[k] = childCoordinates[j];
        }
      }

      return coordinates;
    }

    getArea() {
      let area = 0.0;

      for (let i = 0; i < this._geometries.length; i++) area += this._geometries[i].getArea();

      return area;
    }

    copyInternal() {
      const geometries = new Array(this._geometries.length).fill(null);

      for (let i = 0; i < geometries.length; i++) geometries[i] = this._geometries[i].copy();

      return new GeometryCollection(geometries, this._factory);
    }

    equalsExact() {
      if (arguments.length === 2 && typeof arguments[1] === 'number' && arguments[0] instanceof Geometry) {
        const other = arguments[0],
              tolerance = arguments[1];
        if (!this.isEquivalentClass(other)) return false;
        const otherCollection = other;
        if (this._geometries.length !== otherCollection._geometries.length) return false;

        for (let i = 0; i < this._geometries.length; i++) if (!this._geometries[i].equalsExact(otherCollection._geometries[i], tolerance)) return false;

        return true;
      } else {
        return super.equalsExact.apply(this, arguments);
      }
    }

    normalize() {
      for (let i = 0; i < this._geometries.length; i++) this._geometries[i].normalize();

      Arrays.sort(this._geometries);
    }

    getCoordinate() {
      if (this.isEmpty()) return null;
      return this._geometries[0].getCoordinate();
    }

    getBoundaryDimension() {
      let dimension = Dimension.FALSE;

      for (let i = 0; i < this._geometries.length; i++) dimension = Math.max(dimension, this._geometries[i].getBoundaryDimension());

      return dimension;
    }

    reverseInternal() {
      const numGeometries = this._geometries.length;
      const reversed = new ArrayList(numGeometries);

      for (let i = 0; i < numGeometries; i++) reversed.add(this._geometries[i].reverse());

      return this.getFactory().buildGeometry(reversed);
    }

    getTypeCode() {
      return Geometry.TYPECODE_GEOMETRYCOLLECTION;
    }

    getDimension() {
      let dimension = Dimension.FALSE;

      for (let i = 0; i < this._geometries.length; i++) dimension = Math.max(dimension, this._geometries[i].getDimension());

      return dimension;
    }

    getLength() {
      let sum = 0.0;

      for (let i = 0; i < this._geometries.length; i++) sum += this._geometries[i].getLength();

      return sum;
    }

    getNumPoints() {
      let numPoints = 0;

      for (let i = 0; i < this._geometries.length; i++) numPoints += this._geometries[i].getNumPoints();

      return numPoints;
    }

    getNumGeometries() {
      return this._geometries.length;
    }

    compareToSameClass() {
      if (arguments.length === 1) {
        const o = arguments[0];
        const theseElements = new TreeSet(Arrays.asList(this._geometries));
        const otherElements = new TreeSet(Arrays.asList(o._geometries));
        return this.compare(theseElements, otherElements);
      } else if (arguments.length === 2) {
        const o = arguments[0],
              comp = arguments[1];
        const gc = o;
        const n1 = this.getNumGeometries();
        const n2 = gc.getNumGeometries();
        let i = 0;

        while (i < n1 && i < n2) {
          const thisGeom = this.getGeometryN(i);
          const otherGeom = gc.getGeometryN(i);
          const holeComp = thisGeom.compareToSameClass(otherGeom, comp);
          if (holeComp !== 0) return holeComp;
          i++;
        }

        if (i < n1) return 1;
        if (i < n2) return -1;
        return 0;
      }
    }

    apply() {
      if (hasInterface(arguments[0], CoordinateFilter)) {
        const filter = arguments[0];

        for (let i = 0; i < this._geometries.length; i++) this._geometries[i].apply(filter);
      } else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
        const filter = arguments[0];
        if (this._geometries.length === 0) return null;

        for (let i = 0; i < this._geometries.length; i++) {
          this._geometries[i].apply(filter);

          if (filter.isDone()) break;
        }

        if (filter.isGeometryChanged()) this.geometryChanged();
      } else if (hasInterface(arguments[0], GeometryFilter)) {
        const filter = arguments[0];
        filter.filter(this);

        for (let i = 0; i < this._geometries.length; i++) this._geometries[i].apply(filter);
      } else if (hasInterface(arguments[0], GeometryComponentFilter)) {
        const filter = arguments[0];
        filter.filter(this);

        for (let i = 0; i < this._geometries.length; i++) this._geometries[i].apply(filter);
      }
    }

    getBoundary() {
      Geometry.checkNotGeometryCollection(this);
      Assert.shouldNeverReachHere();
      return null;
    }

    getGeometryType() {
      return Geometry.TYPENAME_GEOMETRYCOLLECTION;
    }

    isEmpty() {
      for (let i = 0; i < this._geometries.length; i++) if (!this._geometries[i].isEmpty()) return false;

      return true;
    }

  }

  class MultiPoint extends GeometryCollection {
    constructor() {
      super();
      MultiPoint.constructor_.apply(this, arguments);
    }

    static constructor_() {
      const points = arguments[0],
            factory = arguments[1];
      GeometryCollection.constructor_.call(this, points, factory);
    }

    copyInternal() {
      const points = new Array(this._geometries.length).fill(null);

      for (let i = 0; i < points.length; i++) points[i] = this._geometries[i].copy();

      return new MultiPoint(points, this._factory);
    }

    isValid() {
      return true;
    }

    equalsExact() {
      if (arguments.length === 2 && typeof arguments[1] === 'number' && arguments[0] instanceof Geometry) {
        const other = arguments[0],
              tolerance = arguments[1];
        if (!this.isEquivalentClass(other)) return false;
        return super.equalsExact.call(this, other, tolerance);
      } else {
        return super.equalsExact.apply(this, arguments);
      }
    }

    getCoordinate() {
      if (arguments.length === 1 && Number.isInteger(arguments[0])) {
        const n = arguments[0];
        return this._geometries[n].getCoordinate();
      } else {
        return super.getCoordinate.apply(this, arguments);
      }
    }

    getBoundaryDimension() {
      return Dimension.FALSE;
    }

    getTypeCode() {
      return Geometry.TYPECODE_MULTIPOINT;
    }

    getDimension() {
      return 0;
    }

    getBoundary() {
      return this.getFactory().createGeometryCollection();
    }

    getGeometryType() {
      return Geometry.TYPENAME_MULTIPOINT;
    }

    get interfaces_() {
      return [Puntal];
    }

  }

  class LinearRing extends LineString {
    constructor() {
      super();
      LinearRing.constructor_.apply(this, arguments);
    }

    static constructor_() {
      const points = arguments[0],
            factory = arguments[1];
      LineString.constructor_.call(this, points, factory);
      this.validateConstruction();
    }

    copyInternal() {
      return new LinearRing(this._points.copy(), this._factory);
    }

    getBoundaryDimension() {
      return Dimension.FALSE;
    }

    isClosed() {
      if (this.isEmpty()) return true;
      return super.isClosed.call(this);
    }

    reverseInternal() {
      const seq = this._points.copy();

      CoordinateSequences.reverse(seq);
      return this.getFactory().createLinearRing(seq);
    }

    getTypeCode() {
      return Geometry.TYPECODE_LINEARRING;
    }

    validateConstruction() {
      if (!this.isEmpty() && !super.isClosed.call(this)) throw new IllegalArgumentException('Points of LinearRing do not form a closed linestring');
      if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < LinearRing.MINIMUM_VALID_SIZE) throw new IllegalArgumentException('Invalid number of points in LinearRing (found ' + this.getCoordinateSequence().size() + ' - must be 0 or >= 4)');
    }

    getGeometryType() {
      return Geometry.TYPENAME_LINEARRING;
    }

  }
  LinearRing.MINIMUM_VALID_SIZE = 4;

  class Coordinates {
    static measures(coordinate) {
      if (coordinate instanceof CoordinateXY) return 0;else if (coordinate instanceof CoordinateXYM) return 1;else if (coordinate instanceof CoordinateXYZM) return 1;else if (coordinate instanceof Coordinate) return 0;
      return 0;
    }

    static dimension(coordinate) {
      if (coordinate instanceof CoordinateXY) return 2;else if (coordinate instanceof CoordinateXYM) return 3;else if (coordinate instanceof CoordinateXYZM) return 4;else if (coordinate instanceof Coordinate) return 3;
      return 3;
    }

    static create() {
      if (arguments.length === 1) {
        const dimension = arguments[0];
        return Coordinates.create(dimension, 0);
      } else if (arguments.length === 2) {
        const dimension = arguments[0],
              measures = arguments[1];
        if (dimension === 2) return new CoordinateXY();else if (dimension === 3 && measures === 0) return new Coordinate();else if (dimension === 3 && measures === 1) return new CoordinateXYM();else if (dimension === 4 && measures === 1) return new CoordinateXYZM();
        return new Coordinate();
      }
    }

  }

  class CoordinateArrays {
    static isRing(pts) {
      if (pts.length < 4) return false;
      if (!pts[0].equals2D(pts[pts.length - 1])) return false;
      return true;
    }

    static ptNotInList(testPts, pts) {
      for (let i = 0; i < testPts.length; i++) {
        const testPt = testPts[i];
        if (CoordinateArrays.indexOf(testPt, pts) < 0) return testPt;
      }

      return null;
    }

    static scroll(coordinates, firstCoordinate) {
      const i = CoordinateArrays.indexOf(firstCoordinate, coordinates);
      if (i < 0) return null;
      const newCoordinates = new Array(coordinates.length).fill(null);
      System.arraycopy(coordinates, i, newCoordinates, 0, coordinates.length - i);
      System.arraycopy(coordinates, 0, newCoordinates, coordinates.length - i, i);
      System.arraycopy(newCoordinates, 0, coordinates, 0, coordinates.length);
    }

    static equals() {
      if (arguments.length === 2) {
        const coord1 = arguments[0],
              coord2 = arguments[1];
        if (coord1 === coord2) return true;
        if (coord1 === null || coord2 === null) return false;
        if (coord1.length !== coord2.length) return false;

        for (let i = 0; i < coord1.length; i++) if (!coord1[i].equals(coord2[i])) return false;

        return true;
      } else if (arguments.length === 3) {
        const coord1 = arguments[0],
              coord2 = arguments[1],
              coordinateComparator = arguments[2];
        if (coord1 === coord2) return true;
        if (coord1 === null || coord2 === null) return false;
        if (coord1.length !== coord2.length) return false;

        for (let i = 0; i < coord1.length; i++) if (coordinateComparator.compare(coord1[i], coord2[i]) !== 0) return false;

        return true;
      }
    }

    static intersection(coordinates, env) {
      const coordList = new CoordinateList();

      for (let i = 0; i < coordinates.length; i++) if (env.intersects(coordinates[i])) coordList.add(coordinates[i], true);

      return coordList.toCoordinateArray();
    }

    static measures(pts) {
      if (pts === null || pts.length === 0) return 0;
      let measures = 0;

      for (const coordinate of pts) measures = Math.max(measures, Coordinates.measures(coordinate));

      return measures;
    }

    static hasRepeatedPoints(coord) {
      for (let i = 1; i < coord.length; i++) if (coord[i - 1].equals(coord[i])) return true;

      return false;
    }

    static removeRepeatedPoints(coord) {
      if (!CoordinateArrays.hasRepeatedPoints(coord)) return coord;
      const coordList = new CoordinateList(coord, false);
      return coordList.toCoordinateArray();
    }

    static reverse(coord) {
      const last = coord.length - 1;
      const mid = Math.trunc(last / 2);

      for (let i = 0; i <= mid; i++) {
        const tmp = coord[i];
        coord[i] = coord[last - i];
        coord[last - i] = tmp;
      }
    }

    static removeNull(coord) {
      let nonNull = 0;

      for (let i = 0; i < coord.length; i++) if (coord[i] !== null) nonNull++;

      const newCoord = new Array(nonNull).fill(null);
      if (nonNull === 0) return newCoord;
      let j = 0;

      for (let i = 0; i < coord.length; i++) if (coord[i] !== null) newCoord[j++] = coord[i];

      return newCoord;
    }

    static copyDeep() {
      if (arguments.length === 1) {
        const coordinates = arguments[0];
        const copy = new Array(coordinates.length).fill(null);

        for (let i = 0; i < coordinates.length; i++) copy[i] = coordinates[i].copy();

        return copy;
      } else if (arguments.length === 5) {
        const src = arguments[0],
              srcStart = arguments[1],
              dest = arguments[2],
              destStart = arguments[3],
              length = arguments[4];

        for (let i = 0; i < length; i++) dest[destStart + i] = src[srcStart + i].copy();
      }
    }

    static isEqualReversed(pts1, pts2) {
      for (let i = 0; i < pts1.length; i++) {
        const p1 = pts1[i];
        const p2 = pts2[pts1.length - i - 1];
        if (p1.compareTo(p2) !== 0) return false;
      }

      return true;
    }

    static envelope(coordinates) {
      const env = new Envelope();

      for (let i = 0; i < coordinates.length; i++) env.expandToInclude(coordinates[i]);

      return env;
    }

    static toCoordinateArray(coordList) {
      return coordList.toArray(CoordinateArrays.coordArrayType);
    }

    static dimension(pts) {
      if (pts === null || pts.length === 0) return 3;
      let dimension = 0;

      for (const coordinate of pts) dimension = Math.max(dimension, Coordinates.dimension(coordinate));

      return dimension;
    }

    static atLeastNCoordinatesOrNothing(n, c) {
      return c.length >= n ? c : [];
    }

    static indexOf(coordinate, coordinates) {
      for (let i = 0; i < coordinates.length; i++) if (coordinate.equals(coordinates[i])) return i;

      return -1;
    }

    static increasingDirection(pts) {
      for (let i = 0; i < Math.trunc(pts.length / 2); i++) {
        const j = pts.length - 1 - i;
        const comp = pts[i].compareTo(pts[j]);
        if (comp !== 0) return comp;
      }

      return 1;
    }

    static compare(pts1, pts2) {
      let i = 0;

      while (i < pts1.length && i < pts2.length) {
        const compare = pts1[i].compareTo(pts2[i]);
        if (compare !== 0) return compare;
        i++;
      }

      if (i < pts2.length) return -1;
      if (i < pts1.length) return 1;
      return 0;
    }

    static minCoordinate(coordinates) {
      let minCoord = null;

      for (let i = 0; i < coordinates.length; i++) if (minCoord === null || minCoord.compareTo(coordinates[i]) > 0) minCoord = coordinates[i];

      return minCoord;
    }

    static extract(pts, start, end) {
      start = MathUtil.clamp(start, 0, pts.length);
      end = MathUtil.clamp(end, -1, pts.length);
      let npts = end - start + 1;
      if (end < 0) npts = 0;
      if (start >= pts.length) npts = 0;
      if (end < start) npts = 0;
      const extractPts = new Array(npts).fill(null);
      if (npts === 0) return extractPts;
      let iPts = 0;

      for (let i = start; i <= end; i++) extractPts[iPts++] = pts[i];

      return extractPts;
    }

  }

  class ForwardComparator {
    compare(o1, o2) {
      const pts1 = o1;
      const pts2 = o2;
      return CoordinateArrays.compare(pts1, pts2);
    }

    get interfaces_() {
      return [Comparator];
    }

  }

  class BidirectionalComparator {
    compare(o1, o2) {
      const pts1 = o1;
      const pts2 = o2;
      if (pts1.length < pts2.length) return -1;
      if (pts1.length > pts2.length) return 1;
      if (pts1.length === 0) return 0;
      const forwardComp = CoordinateArrays.compare(pts1, pts2);
      const isEqualRev = CoordinateArrays.isEqualReversed(pts1, pts2);
      if (isEqualRev) return 0;
      return forwardComp;
    }

    OLDcompare(o1, o2) {
      const pts1 = o1;
      const pts2 = o2;
      if (pts1.length < pts2.length) return -1;
      if (pts1.length > pts2.length) return 1;
      if (pts1.length === 0) return 0;
      const dir1 = CoordinateArrays.increasingDirection(pts1);
      const dir2 = CoordinateArrays.increasingDirection(pts2);
      let i1 = dir1 > 0 ? 0 : pts1.length - 1;
      let i2 = dir2 > 0 ? 0 : pts1.length - 1;

      for (let i = 0; i < pts1.length; i++) {
        const comparePt = pts1[i1].compareTo(pts2[i2]);
        if (comparePt !== 0) return comparePt;
        i1 += dir1;
        i2 += dir2;
      }

      return 0;
    }

    get interfaces_() {
      return [Comparator];
    }

  }

  CoordinateArrays.ForwardComparator = ForwardComparator;
  CoordinateArrays.BidirectionalComparator = BidirectionalComparator;
  CoordinateArrays.coordArrayType = new Array(0).fill(null);

  class StringBuilder {
    constructor(str) {
      this.str = str;
    }

    append(e) {
      this.str += e;
    }

    setCharAt(i, c) {
      this.str = this.str.substr(0, i) + c + this.str.substr(i + 1);
    }

    toString() {
      return this.str;
    }

  }

  class CoordinateArraySequence {
    constructor() {
      CoordinateArraySequence.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._dimension = 3;
      this._measures = 0;
      this._coordinates = null;

      if (arguments.length === 1) {
        if (arguments[0] instanceof Array) {
          const coordinates = arguments[0];
          CoordinateArraySequence.constructor_.call(this, coordinates, CoordinateArrays.dimension(coordinates), CoordinateArrays.measures(coordinates));
        } else if (Number.isInteger(arguments[0])) {
          const size = arguments[0];
          this._coordinates = new Array(size).fill(null);

          for (let i = 0; i < size; i++) this._coordinates[i] = new Coordinate();
        } else if (hasInterface(arguments[0], CoordinateSequence)) {
          const coordSeq = arguments[0];

          if (coordSeq === null) {
            this._coordinates = new Array(0).fill(null);
            return null;
          }

          this._dimension = coordSeq.getDimension();
          this._measures = coordSeq.getMeasures();
          this._coordinates = new Array(coordSeq.size()).fill(null);

          for (let i = 0; i < this._coordinates.length; i++) this._coordinates[i] = coordSeq.getCoordinateCopy(i);
        }
      } else if (arguments.length === 2) {
        if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
          const coordinates = arguments[0],
                dimension = arguments[1];
          CoordinateArraySequence.constructor_.call(this, coordinates, dimension, CoordinateArrays.measures(coordinates));
        } else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
          const size = arguments[0],
                dimension = arguments[1];
          this._coordinates = new Array(size).fill(null);
          this._dimension = dimension;

          for (let i = 0; i < size; i++) this._coordinates[i] = Coordinates.create(dimension);
        }
      } else if (arguments.length === 3) {
        if (Number.isInteger(arguments[2]) && arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
          const coordinates = arguments[0],
                dimension = arguments[1],
                measures = arguments[2];
          this._dimension = dimension;
          this._measures = measures;
          if (coordinates === null) this._coordinates = new Array(0).fill(null);else this._coordinates = coordinates;
        } else if (Number.isInteger(arguments[2]) && Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
          const size = arguments[0],
                dimension = arguments[1],
                measures = arguments[2];
          this._coordinates = new Array(size).fill(null);
          this._dimension = dimension;
          this._measures = measures;

          for (let i = 0; i < size; i++) this._coordinates[i] = this.createCoordinate();
        }
      }
    }

    getM(index) {
      if (this.hasM()) return this._coordinates[index].getM();else return Double.NaN;
    }

    setOrdinate(index, ordinateIndex, value) {
      switch (ordinateIndex) {
        case CoordinateSequence.X:
          this._coordinates[index].x = value;
          break;

        case CoordinateSequence.Y:
          this._coordinates[index].y = value;
          break;

        default:
          this._coordinates[index].setOrdinate(ordinateIndex, value);

      }
    }

    getZ(index) {
      if (this.hasZ()) return this._coordinates[index].getZ();else return Double.NaN;
    }

    size() {
      return this._coordinates.length;
    }

    getOrdinate(index, ordinateIndex) {
      switch (ordinateIndex) {
        case CoordinateSequence.X:
          return this._coordinates[index].x;

        case CoordinateSequence.Y:
          return this._coordinates[index].y;

        default:
          return this._coordinates[index].getOrdinate(ordinateIndex);
      }
    }

    getCoordinate() {
      if (arguments.length === 1) {
        const i = arguments[0];
        return this._coordinates[i];
      } else if (arguments.length === 2) {
        const index = arguments[0],
              coord = arguments[1];
        coord.setCoordinate(this._coordinates[index]);
      }
    }

    getCoordinateCopy(i) {
      const copy = this.createCoordinate();
      copy.setCoordinate(this._coordinates[i]);
      return copy;
    }

    createCoordinate() {
      return Coordinates.create(this.getDimension(), this.getMeasures());
    }

    getDimension() {
      return this._dimension;
    }

    getX(index) {
      return this._coordinates[index].x;
    }

    getMeasures() {
      return this._measures;
    }

    expandEnvelope(env) {
      for (let i = 0; i < this._coordinates.length; i++) env.expandToInclude(this._coordinates[i]);

      return env;
    }

    copy() {
      const cloneCoordinates = new Array(this.size()).fill(null);

      for (let i = 0; i < this._coordinates.length; i++) {
        const duplicate = this.createCoordinate();
        duplicate.setCoordinate(this._coordinates[i]);
        cloneCoordinates[i] = duplicate;
      }

      return new CoordinateArraySequence(cloneCoordinates, this._dimension, this._measures);
    }

    toString() {
      if (this._coordinates.length > 0) {
        const strBuilder = new StringBuilder(17 * this._coordinates.length);
        strBuilder.append('(');
        strBuilder.append(this._coordinates[0]);

        for (let i = 1; i < this._coordinates.length; i++) {
          strBuilder.append(', ');
          strBuilder.append(this._coordinates[i]);
        }

        strBuilder.append(')');
        return strBuilder.toString();
      } else {
        return '()';
      }
    }

    getY(index) {
      return this._coordinates[index].y;
    }

    toCoordinateArray() {
      return this._coordinates;
    }

    get interfaces_() {
      return [CoordinateSequence, Serializable];
    }

  }

  class CoordinateArraySequenceFactory {
    static instance() {
      return CoordinateArraySequenceFactory.instanceObject;
    }

    readResolve() {
      return CoordinateArraySequenceFactory.instance();
    }

    create() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof Array) {
          const coordinates = arguments[0];
          return new CoordinateArraySequence(coordinates);
        } else if (hasInterface(arguments[0], CoordinateSequence)) {
          const coordSeq = arguments[0];
          return new CoordinateArraySequence(coordSeq);
        }
      } else if (arguments.length === 2) {
        let size = arguments[0],
            dimension = arguments[1];
        if (dimension > 3) dimension = 3;
        if (dimension < 2) dimension = 2;
        return new CoordinateArraySequence(size, dimension);
      } else if (arguments.length === 3) {
        let size = arguments[0],
            dimension = arguments[1],
            measures = arguments[2];
        let spatial = dimension - measures;
        if (measures > 1) measures = 1;
        if (spatial > 3) spatial = 3;
        if (spatial < 2) spatial = 2;
        return new CoordinateArraySequence(size, spatial + measures, measures);
      }
    }

    get interfaces_() {
      return [CoordinateSequenceFactory, Serializable];
    }

  }
  CoordinateArraySequenceFactory.instanceObject = new CoordinateArraySequenceFactory();

  class MultiPolygon extends GeometryCollection {
    constructor() {
      super();
      MultiPolygon.constructor_.apply(this, arguments);
    }

    static constructor_() {
      const polygons = arguments[0],
            factory = arguments[1];
      GeometryCollection.constructor_.call(this, polygons, factory);
    }

    copyInternal() {
      const polygons = new Array(this._geometries.length).fill(null);

      for (let i = 0; i < polygons.length; i++) polygons[i] = this._geometries[i].copy();

      return new MultiPolygon(polygons, this._factory);
    }

    equalsExact() {
      if (arguments.length === 2 && typeof arguments[1] === 'number' && arguments[0] instanceof Geometry) {
        const other = arguments[0],
              tolerance = arguments[1];
        if (!this.isEquivalentClass(other)) return false;
        return super.equalsExact.call(this, other, tolerance);
      } else {
        return super.equalsExact.apply(this, arguments);
      }
    }

    getBoundaryDimension() {
      return 1;
    }

    getTypeCode() {
      return Geometry.TYPECODE_MULTIPOLYGON;
    }

    getDimension() {
      return 2;
    }

    getBoundary() {
      if (this.isEmpty()) return this.getFactory().createMultiLineString();
      const allRings = new ArrayList();

      for (let i = 0; i < this._geometries.length; i++) {
        const polygon = this._geometries[i];
        const rings = polygon.getBoundary();

        for (let j = 0; j < rings.getNumGeometries(); j++) allRings.add(rings.getGeometryN(j));
      }

      const allRingsArray = new Array(allRings.size()).fill(null);
      return this.getFactory().createMultiLineString(allRings.toArray(allRingsArray));
    }

    getGeometryType() {
      return Geometry.TYPENAME_MULTIPOLYGON;
    }

    get interfaces_() {
      return [Polygonal];
    }

  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/Map.html
   */
  class Map$1 {
    /**
       * Returns the value to which the specified key is mapped, or null if this map
       * contains no mapping for the key.
       * @param {Object} key
       * @return {Object}
       */
    get() {}
    /**
       * Associates the specified value with the specified key in this map (optional
       * operation).
       * @param {Object} key
       * @param {Object} value
       * @return {Object}
       */


    put() {}
    /**
       * Returns the number of key-value mappings in this map.
       * @return {number}
       */


    size() {}
    /**
       * Returns a Collection view of the values contained in this map.
       * @return {javascript.util.Collection}
       */


    values() {}
    /**
       * Returns a {@link Set} view of the mappings contained in this map.
       * The set is backed by the map, so changes to the map are
       * reflected in the set, and vice-versa.  If the map is modified
       * while an iteration over the set is in progress (except through
       * the iterator's own <tt>remove</tt> operation, or through the
       * <tt>setValue</tt> operation on a map entry returned by the
       * iterator) the results of the iteration are undefined.  The set
       * supports element removal, which removes the corresponding
       * mapping from the map, via the <tt>Iterator.remove</tt>,
       * <tt>Set.remove</tt>, <tt>removeAll</tt>, <tt>retainAll</tt> and
       * <tt>clear</tt> operations.  It does not support the
       * <tt>add</tt> or <tt>addAll</tt> operations.
       *
       * @return {Set} a set view of the mappings contained in this map
       */


    entrySet() {}

  }

  /**
   * @see http://docs.oracle.com/javase/6/docs/api/java/util/HashSet.html
   */

  class HashSet extends Set {
    constructor(o) {
      super();
      this.map = new Map();
      if (o instanceof Collection) this.addAll(o);
    }

    contains(o) {
      const hashCode = o.hashCode ? o.hashCode() : o;
      if (this.map.has(hashCode)) return true;
      return false;
    }

    add(o) {
      const hashCode = o.hashCode ? o.hashCode() : o;
      if (this.map.has(hashCode)) return false;
      return !!this.map.set(hashCode, o);
    }

    addAll(c) {
      for (const e of c) this.add(e);

      return true;
    }

    remove() {
      throw new UnsupportedOperationException();
    }

    size() {
      return this.map.size;
    }

    isEmpty() {
      return this.map.size === 0;
    }

    toArray() {
      return Array.from(this.map.values());
    }

    iterator() {
      return new Iterator$1(this.map);
    }

    [Symbol.iterator]() {
      return this.map;
    }

  }

  class Iterator$1 {
    constructor(map) {
      this.iterator = map.values();
      const {
        done,
        value
      } = this.iterator.next();
      this.done = done;
      this.value = value;
    }

    next() {
      if (this.done) throw new NoSuchElementException();
      const current = this.value;
      const {
        done,
        value
      } = this.iterator.next();
      this.done = done;
      this.value = value;
      return current;
    }

    hasNext() {
      return !this.done;
    }

    remove() {
      throw new UnsupportedOperationException();
    }

  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/HashMap.html
   */

  class HashMap extends Map$1 {
    constructor() {
      super();
      this.map = new Map();
    }

    get(key) {
      return this.map.get(key) || null;
    }

    put(key, value) {
      this.map.set(key, value);
      return value;
    }

    values() {
      const arrayList = new ArrayList();
      const it = this.map.values();
      let o = it.next();

      while (!o.done) {
        arrayList.add(o.value);
        o = it.next();
      }

      return arrayList;
    }

    entrySet() {
      const hashSet = new HashSet();
      this.map.entries().forEach(entry => hashSet.add(entry));
      return hashSet;
    }

    size() {
      return this.map.size();
    }

  }

  class PrecisionModel {
    constructor() {
      PrecisionModel.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._modelType = null;
      this._scale = null;
      if (arguments.length === 0) this._modelType = PrecisionModel.FLOATING;else if (arguments.length === 1) if (arguments[0] instanceof Type) {
        const modelType = arguments[0];
        this._modelType = modelType;
        if (modelType === PrecisionModel.FIXED) this.setScale(1.0);
      } else if (typeof arguments[0] === 'number') {
        const scale = arguments[0];
        this._modelType = PrecisionModel.FIXED;
        this.setScale(scale);
      } else if (arguments[0] instanceof PrecisionModel) {
        const pm = arguments[0];
        this._modelType = pm._modelType;
        this._scale = pm._scale;
      }
    }

    static mostPrecise(pm1, pm2) {
      if (pm1.compareTo(pm2) >= 0) return pm1;
      return pm2;
    }

    equals(other) {
      if (!(other instanceof PrecisionModel)) return false;
      const otherPrecisionModel = other;
      return this._modelType === otherPrecisionModel._modelType && this._scale === otherPrecisionModel._scale;
    }

    compareTo(o) {
      const other = o;
      const sigDigits = this.getMaximumSignificantDigits();
      const otherSigDigits = other.getMaximumSignificantDigits();
      return Integer.compare(sigDigits, otherSigDigits);
    }

    getScale() {
      return this._scale;
    }

    isFloating() {
      return this._modelType === PrecisionModel.FLOATING || this._modelType === PrecisionModel.FLOATING_SINGLE;
    }

    getType() {
      return this._modelType;
    }

    toString() {
      let description = 'UNKNOWN';
      if (this._modelType === PrecisionModel.FLOATING) description = 'Floating';else if (this._modelType === PrecisionModel.FLOATING_SINGLE) description = 'Floating-Single';else if (this._modelType === PrecisionModel.FIXED) description = 'Fixed (Scale=' + this.getScale() + ')';
      return description;
    }

    makePrecise() {
      if (typeof arguments[0] === 'number') {
        const val = arguments[0];
        if (Double.isNaN(val)) return val;

        if (this._modelType === PrecisionModel.FLOATING_SINGLE) {
          const floatSingleVal = val;
          return floatSingleVal;
        }

        if (this._modelType === PrecisionModel.FIXED) return Math.round(val * this._scale) / this._scale;
        return val;
      } else if (arguments[0] instanceof Coordinate) {
        const coord = arguments[0];
        if (this._modelType === PrecisionModel.FLOATING) return null;
        coord.x = this.makePrecise(coord.x);
        coord.y = this.makePrecise(coord.y);
      }
    }

    getMaximumSignificantDigits() {
      let maxSigDigits = 16;
      if (this._modelType === PrecisionModel.FLOATING) maxSigDigits = 16;else if (this._modelType === PrecisionModel.FLOATING_SINGLE) maxSigDigits = 6;else if (this._modelType === PrecisionModel.FIXED) maxSigDigits = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)));
      return maxSigDigits;
    }

    setScale(scale) {
      this._scale = Math.abs(scale);
    }

    get interfaces_() {
      return [Serializable, Comparable];
    }

  }

  class Type {
    constructor() {
      Type.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._name = null;
      const name = arguments[0];
      this._name = name;
      Type.nameToTypeMap.put(name, this);
    }

    readResolve() {
      return Type.nameToTypeMap.get(this._name);
    }

    toString() {
      return this._name;
    }

    get interfaces_() {
      return [Serializable];
    }

  }

  Type.nameToTypeMap = new HashMap();
  PrecisionModel.Type = Type;
  PrecisionModel.FIXED = new Type('FIXED');
  PrecisionModel.FLOATING = new Type('FLOATING');
  PrecisionModel.FLOATING_SINGLE = new Type('FLOATING SINGLE');
  PrecisionModel.maximumPreciseValue = 9007199254740992.0;

  class MultiLineString extends GeometryCollection {
    constructor() {
      super();
      MultiLineString.constructor_.apply(this, arguments);
    }

    static constructor_() {
      const lineStrings = arguments[0],
            factory = arguments[1];
      GeometryCollection.constructor_.call(this, lineStrings, factory);
    }

    copyInternal() {
      const lineStrings = new Array(this._geometries.length).fill(null);

      for (let i = 0; i < lineStrings.length; i++) lineStrings[i] = this._geometries[i].copy();

      return new MultiLineString(lineStrings, this._factory);
    }

    equalsExact() {
      if (arguments.length === 2 && typeof arguments[1] === 'number' && arguments[0] instanceof Geometry) {
        const other = arguments[0],
              tolerance = arguments[1];
        if (!this.isEquivalentClass(other)) return false;
        return super.equalsExact.call(this, other, tolerance);
      } else {
        return super.equalsExact.apply(this, arguments);
      }
    }

    getBoundaryDimension() {
      if (this.isClosed()) return Dimension.FALSE;
      return 0;
    }

    isClosed() {
      if (this.isEmpty()) return false;

      for (let i = 0; i < this._geometries.length; i++) if (!this._geometries[i].isClosed()) return false;

      return true;
    }

    getTypeCode() {
      return Geometry.TYPECODE_MULTILINESTRING;
    }

    getDimension() {
      return 1;
    }

    getBoundary() {
      throw new UnsupportedOperationException();
    }

    getGeometryType() {
      return Geometry.TYPENAME_MULTILINESTRING;
    }

    get interfaces_() {
      return [Lineal];
    }

  }

  class GeometryFactory {
    constructor() {
      GeometryFactory.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._precisionModel = null;
      this._coordinateSequenceFactory = null;
      this._SRID = null;

      if (arguments.length === 0) {
        GeometryFactory.constructor_.call(this, new PrecisionModel(), 0);
      } else if (arguments.length === 1) {
        if (hasInterface(arguments[0], CoordinateSequenceFactory)) {
          const coordinateSequenceFactory = arguments[0];
          GeometryFactory.constructor_.call(this, new PrecisionModel(), 0, coordinateSequenceFactory);
        } else if (arguments[0] instanceof PrecisionModel) {
          const precisionModel = arguments[0];
          GeometryFactory.constructor_.call(this, precisionModel, 0, GeometryFactory.getDefaultCoordinateSequenceFactory());
        }
      } else if (arguments.length === 2) {
        const precisionModel = arguments[0],
              SRID = arguments[1];
        GeometryFactory.constructor_.call(this, precisionModel, SRID, GeometryFactory.getDefaultCoordinateSequenceFactory());
      } else if (arguments.length === 3) {
        const precisionModel = arguments[0],
              SRID = arguments[1],
              coordinateSequenceFactory = arguments[2];
        this._precisionModel = precisionModel;
        this._coordinateSequenceFactory = coordinateSequenceFactory;
        this._SRID = SRID;
      }
    }

    static toMultiPolygonArray(multiPolygons) {
      const multiPolygonArray = new Array(multiPolygons.size()).fill(null);
      return multiPolygons.toArray(multiPolygonArray);
    }

    static toGeometryArray(geometries) {
      if (geometries === null) return null;
      const geometryArray = new Array(geometries.size()).fill(null);
      return geometries.toArray(geometryArray);
    }

    static getDefaultCoordinateSequenceFactory() {
      return CoordinateArraySequenceFactory.instance();
    }

    static toMultiLineStringArray(multiLineStrings) {
      const multiLineStringArray = new Array(multiLineStrings.size()).fill(null);
      return multiLineStrings.toArray(multiLineStringArray);
    }

    static toLineStringArray(lineStrings) {
      const lineStringArray = new Array(lineStrings.size()).fill(null);
      return lineStrings.toArray(lineStringArray);
    }

    static toMultiPointArray(multiPoints) {
      const multiPointArray = new Array(multiPoints.size()).fill(null);
      return multiPoints.toArray(multiPointArray);
    }

    static toLinearRingArray(linearRings) {
      const linearRingArray = new Array(linearRings.size()).fill(null);
      return linearRings.toArray(linearRingArray);
    }

    static toPointArray(points) {
      const pointArray = new Array(points.size()).fill(null);
      return points.toArray(pointArray);
    }

    static toPolygonArray(polygons) {
      const polygonArray = new Array(polygons.size()).fill(null);
      return polygons.toArray(polygonArray);
    }

    static createPointFromInternalCoord(coord, exemplar) {
      exemplar.getPrecisionModel().makePrecise(coord);
      return exemplar.getFactory().createPoint(coord);
    }

    createEmpty(dimension) {
      switch (dimension) {
        case -1:
          return this.createGeometryCollection();

        case 0:
          return this.createPoint();

        case 1:
          return this.createLineString();

        case 2:
          return this.createPolygon();

        default:
          throw new IllegalArgumentException('Invalid dimension: ' + dimension);
      }
    }

    toGeometry(envelope) {
      if (envelope.isNull()) return this.createPoint();
      if (envelope.getMinX() === envelope.getMaxX() && envelope.getMinY() === envelope.getMaxY()) return this.createPoint(new Coordinate(envelope.getMinX(), envelope.getMinY()));
      if (envelope.getMinX() === envelope.getMaxX() || envelope.getMinY() === envelope.getMaxY()) return this.createLineString([new Coordinate(envelope.getMinX(), envelope.getMinY()), new Coordinate(envelope.getMaxX(), envelope.getMaxY())]);
      return this.createPolygon(this.createLinearRing([new Coordinate(envelope.getMinX(), envelope.getMinY()), new Coordinate(envelope.getMinX(), envelope.getMaxY()), new Coordinate(envelope.getMaxX(), envelope.getMaxY()), new Coordinate(envelope.getMaxX(), envelope.getMinY()), new Coordinate(envelope.getMinX(), envelope.getMinY())]), null);
    }

    createLineString() {
      if (arguments.length === 0) return this.createLineString(this.getCoordinateSequenceFactory().create([]));else if (arguments.length === 1) if (arguments[0] instanceof Array) {
        const coordinates = arguments[0];
        return this.createLineString(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordinates = arguments[0];
        return new LineString(coordinates, this);
      }
    }

    createMultiLineString() {
      if (arguments.length === 0) {
        return new MultiLineString(null, this);
      } else if (arguments.length === 1) {
        const lineStrings = arguments[0];
        return new MultiLineString(lineStrings, this);
      }
    }

    buildGeometry(geomList) {
      let geomType = null;
      let isHeterogeneous = false;
      let hasGeometryCollection = false;

      for (let i = geomList.iterator(); i.hasNext();) {
        const geom = i.next();
        const partType = geom.getTypeCode();
        if (geomType === null) geomType = partType;
        if (partType !== geomType) isHeterogeneous = true;
        if (geom instanceof GeometryCollection) hasGeometryCollection = true;
      }

      if (geomType === null) return this.createGeometryCollection();
      if (isHeterogeneous || hasGeometryCollection) return this.createGeometryCollection(GeometryFactory.toGeometryArray(geomList));
      const geom0 = geomList.iterator().next();
      const isCollection = geomList.size() > 1;

      if (isCollection) {
        if (geom0 instanceof Polygon) return this.createMultiPolygon(GeometryFactory.toPolygonArray(geomList));else if (geom0 instanceof LineString) return this.createMultiLineString(GeometryFactory.toLineStringArray(geomList));else if (geom0 instanceof Point) return this.createMultiPoint(GeometryFactory.toPointArray(geomList));
        Assert.shouldNeverReachHere('Unhandled geometry type: ' + geom0.getGeometryType());
      }

      return geom0;
    }

    createMultiPointFromCoords(coordinates) {
      return this.createMultiPoint(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
    }

    createPoint() {
      if (arguments.length === 0) return this.createPoint(this.getCoordinateSequenceFactory().create([]));else if (arguments.length === 1) if (arguments[0] instanceof Coordinate) {
        const coordinate = arguments[0];
        return this.createPoint(coordinate !== null ? this.getCoordinateSequenceFactory().create([coordinate]) : null);
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordinates = arguments[0];
        return new Point(coordinates, this);
      }
    }

    getCoordinateSequenceFactory() {
      return this._coordinateSequenceFactory;
    }

    createPolygon() {
      if (arguments.length === 0) {
        return this.createPolygon(null, null);
      } else if (arguments.length === 1) {
        if (hasInterface(arguments[0], CoordinateSequence)) {
          const shell = arguments[0];
          return this.createPolygon(this.createLinearRing(shell));
        } else if (arguments[0] instanceof Array) {
          const shell = arguments[0];
          return this.createPolygon(this.createLinearRing(shell));
        } else if (arguments[0] instanceof LinearRing) {
          const shell = arguments[0];
          return this.createPolygon(shell, null);
        }
      } else if (arguments.length === 2) {
        const shell = arguments[0],
              holes = arguments[1];
        return new Polygon(shell, holes, this);
      }
    }

    getSRID() {
      return this._SRID;
    }

    createGeometryCollection() {
      if (arguments.length === 0) {
        return new GeometryCollection(null, this);
      } else if (arguments.length === 1) {
        const geometries = arguments[0];
        return new GeometryCollection(geometries, this);
      }
    }

    getPrecisionModel() {
      return this._precisionModel;
    }

    createLinearRing() {
      if (arguments.length === 0) return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));else if (arguments.length === 1) if (arguments[0] instanceof Array) {
        const coordinates = arguments[0];
        return this.createLinearRing(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordinates = arguments[0];
        return new LinearRing(coordinates, this);
      }
    }

    createMultiPolygon() {
      if (arguments.length === 0) {
        return new MultiPolygon(null, this);
      } else if (arguments.length === 1) {
        const polygons = arguments[0];
        return new MultiPolygon(polygons, this);
      }
    }

    createMultiPoint() {
      if (arguments.length === 0) return new MultiPoint(null, this);else if (arguments.length === 1) if (arguments[0] instanceof Array) {
        const point = arguments[0];
        return new MultiPoint(point, this);
      } else if (hasInterface(arguments[0], CoordinateSequence)) {
        const coordinates = arguments[0];
        if (coordinates === null) return this.createMultiPoint(new Array(0).fill(null));
        const points = new Array(coordinates.size()).fill(null);

        for (let i = 0; i < coordinates.size(); i++) {
          const ptSeq = this.getCoordinateSequenceFactory().create(1, coordinates.getDimension(), coordinates.getMeasures());
          CoordinateSequences.copy(coordinates, i, ptSeq, 0, 1);
          points[i] = this.createPoint(ptSeq);
        }

        return this.createMultiPoint(points);
      }
    }

    get interfaces_() {
      return [Serializable];
    }

  }

  /**
   * The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
   * or measure ('M') coordinate is available. Supported values are `'XY'`,
   * `'XYZ'`, `'XYM'`, `'XYZM'`.
   * @enum {string}
   */

  const GeometryLayout = {
    XY: 'XY',
    XYZ: 'XYZ',
    XYM: 'XYM',
    XYZM: 'XYZM'
  };
  /**
   * The geometry type. One of `'Point'`, `'LineString'`, `'LinearRing'`,
   * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
   * `'GeometryCollection'`, `'Circle'`.
   * @enum {string}
   */

  const GeometryType = {
    POINT: 'Point',
    LINE_STRING: 'LineString',
    LINEAR_RING: 'LinearRing',
    POLYGON: 'Polygon',
    MULTI_POINT: 'MultiPoint',
    MULTI_LINE_STRING: 'MultiLineString',
    MULTI_POLYGON: 'MultiPolygon',
    GEOMETRY_COLLECTION: 'GeometryCollection',
    CIRCLE: 'Circle'
  };
  /**
   * @typedef {Object} Options
   * @property {boolean} [splitCollection=false] Whether to split GeometryCollections into
   * multiple features on reading.
   */

  /**
   * @typedef {Object} Token
   * @property {number} type
   * @property {number|string} [value]
   * @property {number} position
   */

  /**
   * @const
   * @type {string}
   */

  const EMPTY = 'EMPTY';
  /**
   * @const
   * @type {string}
   */

  const Z = 'Z';
  /**
   * @const
   * @type {string}
   */

  const M = 'M';
  /**
   * @const
   * @type {string}
   */

  const ZM = 'ZM';
  /**
   * @const
   * @enum {number}
   */

  const TokenType = {
    TEXT: 1,
    LEFT_PAREN: 2,
    RIGHT_PAREN: 3,
    NUMBER: 4,
    COMMA: 5,
    EOF: 6
  };
  /**
   * @const
   * @type {Object<string, string>}
   */

  const WKTGeometryType = {};

  for (const type in GeometryType) WKTGeometryType[type] = GeometryType[type].toUpperCase();
  /**
   * Class to tokenize a WKT string.
   */


  class Lexer {
    /**
     * @param {string} wkt WKT string.
     */
    constructor(wkt) {
      /**
       * @type {string}
       */
      this.wkt = wkt;
      /**
       * @type {number}
       * @private
       */

      this.index_ = -1;
    }
    /**
     * @param {string} c Character.
     * @return {boolean} Whether the character is alphabetic.
     * @private
     */


    isAlpha_(c) {
      return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
    }
    /**
     * @param {string} c Character.
     * @param {boolean=} opt_decimal Whether the string number
     *     contains a dot, i.e. is a decimal number.
     * @return {boolean} Whether the character is numeric.
     * @private
     */


    isNumeric_(c, opt_decimal) {
      const decimal = opt_decimal !== undefined ? opt_decimal : false;
      return c >= '0' && c <= '9' || c == '.' && !decimal;
    }
    /**
     * @param {string} c Character.
     * @return {boolean} Whether the character is whitespace.
     * @private
     */


    isWhiteSpace_(c) {
      return c == ' ' || c == '\t' || c == '\r' || c == '\n';
    }
    /**
     * @return {string} Next string character.
     * @private
     */


    nextChar_() {
      return this.wkt.charAt(++this.index_);
    }
    /**
     * Fetch and return the next token.
     * @return {!Token} Next string token.
     */


    nextToken() {
      const c = this.nextChar_();
      const position = this.index_;
      /** @type {number|string} */

      let value = c;
      let type;

      if (c == '(') {
        type = TokenType.LEFT_PAREN;
      } else if (c == ',') {
        type = TokenType.COMMA;
      } else if (c == ')') {
        type = TokenType.RIGHT_PAREN;
      } else if (this.isNumeric_(c) || c == '-') {
        type = TokenType.NUMBER;
        value = this.readNumber_();
      } else if (this.isAlpha_(c)) {
        type = TokenType.TEXT;
        value = this.readText_();
      } else if (this.isWhiteSpace_(c)) {
        return this.nextToken();
      } else if (c === '') {
        type = TokenType.EOF;
      } else {
        throw new Error('Unexpected character: ' + c);
      }

      return {
        position: position,
        value: value,
        type: type
      };
    }
    /**
     * @return {number} Numeric token value.
     * @private
     */


    readNumber_() {
      let c;
      const index = this.index_;
      let decimal = false;
      let scientificNotation = false;

      do {
        if (c == '.') decimal = true;else if (c == 'e' || c == 'E') scientificNotation = true;
        c = this.nextChar_();
      } while (this.isNumeric_(c, decimal) || // if we haven't detected a scientific number before, 'e' or 'E'
      // hint that we should continue to read
      !scientificNotation && (c == 'e' || c == 'E') || // once we know that we have a scientific number, both '-' and '+'
      // are allowed
      scientificNotation && (c == '-' || c == '+'));

      return parseFloat(this.wkt.substring(index, this.index_--));
    }
    /**
     * @return {string} String token value.
     * @private
     */


    readText_() {
      let c;
      const index = this.index_;

      do c = this.nextChar_(); while (this.isAlpha_(c));

      return this.wkt.substring(index, this.index_--).toUpperCase();
    }

  }
  /**
   * Class to parse the tokens from the WKT string.
   */


  class Parser {
    /**
     * @param {Lexer} lexer The lexer.
     */
    constructor(lexer, factory) {
      /**
       * @type {Lexer}
       * @private
       */
      this.lexer_ = lexer;
      /**
       * @type {Token}
       * @private
       */

      this.token_;
      /**
       * @type {import("../geom/GeometryLayout.js").default}
       * @private
       */

      this.layout_ = GeometryLayout.XY;
      this.factory = factory;
    }
    /**
     * Fetch the next token form the lexer and replace the active token.
     * @private
     */


    consume_() {
      this.token_ = this.lexer_.nextToken();
    }
    /**
     * Tests if the given type matches the type of the current token.
     * @param {TokenType} type Token type.
     * @return {boolean} Whether the token matches the given type.
     */


    isTokenType(type) {
      const isMatch = this.token_.type == type;
      return isMatch;
    }
    /**
     * If the given type matches the current token, consume it.
     * @param {TokenType} type Token type.
     * @return {boolean} Whether the token matches the given type.
     */


    match(type) {
      const isMatch = this.isTokenType(type);
      if (isMatch) this.consume_();
      return isMatch;
    }
    /**
     * Try to parse the tokens provided by the lexer.
     * @return {import("../geom/Geometry.js").default} The geometry.
     */


    parse() {
      this.consume_();
      const geometry = this.parseGeometry_();
      return geometry;
    }
    /**
     * Try to parse the dimensional info.
     * @return {import("../geom/GeometryLayout.js").default} The layout.
     * @private
     */


    parseGeometryLayout_() {
      let layout = GeometryLayout.XY;
      const dimToken = this.token_;

      if (this.isTokenType(TokenType.TEXT)) {
        const dimInfo = dimToken.value;
        if (dimInfo === Z) layout = GeometryLayout.XYZ;else if (dimInfo === M) layout = GeometryLayout.XYM;else if (dimInfo === ZM) layout = GeometryLayout.XYZM;
        if (layout !== GeometryLayout.XY) this.consume_();
      }

      return layout;
    }
    /**
     * @return {!Array<import("../geom/Geometry.js").default>} A collection of geometries.
     * @private
     */


    parseGeometryCollectionText_() {
      if (this.match(TokenType.LEFT_PAREN)) {
        const geometries = [];

        do geometries.push(this.parseGeometry_()); while (this.match(TokenType.COMMA));

        if (this.match(TokenType.RIGHT_PAREN)) return geometries;
      } else if (this.isEmptyGeometry_()) {
        return [];
      }

      throw new Error(this.formatErrorMessage_());
    }
    /**
     * @return {Array<number>} All values in a point.
     * @private
     */


    parsePointText_() {
      if (this.match(TokenType.LEFT_PAREN)) {
        const coordinates = this.parsePoint_();
        if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
      } else if (this.isEmptyGeometry_()) {
        return null;
      }

      throw new Error(this.formatErrorMessage_());
    }
    /**
     * @return {!Array<!Array<number>>} All points in a linestring.
     * @private
     */


    parseLineStringText_() {
      if (this.match(TokenType.LEFT_PAREN)) {
        const coordinates = this.parsePointList_();
        if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
      } else if (this.isEmptyGeometry_()) {
        return [];
      }

      throw new Error(this.formatErrorMessage_());
    }
    /**
     * @return {!Array<!Array<!Array<number>>>} All points in a polygon.
     * @private
     */


    parsePolygonText_() {
      if (this.match(TokenType.LEFT_PAREN)) {
        const coordinates = this.parseLineStringTextList_();
        if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
      } else if (this.isEmptyGeometry_()) {
        return [];
      }

      throw new Error(this.formatErrorMessage_());
    }
    /**
     * @return {!Array<!Array<number>>} All points in a multipoint.
     * @private
     */


    parseMultiPointText_() {
      if (this.match(TokenType.LEFT_PAREN)) {
        let coordinates;
        if (this.token_.type == TokenType.LEFT_PAREN) coordinates = this.parsePointTextList_();else coordinates = this.parsePointList_();
        if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
      } else if (this.isEmptyGeometry_()) {
        return [];
      }

      throw new Error(this.formatErrorMessage_());
    }
    /**
     * @return {!Array<!Array<!Array<number>>>} All linestring points
     *                                          in a multilinestring.
     * @private
     */


    parseMultiLineStringText_() {
      if (this.match(TokenType.LEFT_PAREN)) {
        const coordinates = this.parseLineStringTextList_();
        if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
      } else if (this.isEmptyGeometry_()) {
        return [];
      }

      throw new Error(this.formatErrorMessage_());
    }
    /**
     * @return {!Array<!Array<!Array<!Array<number>>>>} All polygon points in a multipolygon.
     * @private
     */


    parseMultiPolygonText_() {
      if (this.match(TokenType.LEFT_PAREN)) {
        const coordinates = this.parsePolygonTextList_();
        if (this.match(TokenType.RIGHT_PAREN)) return coordinates;
      } else if (this.isEmptyGeometry_()) {
        return [];
      }

      throw new Error(this.formatErrorMessage_());
    }
    /**
     * @return {!Array<number>} A point.
     * @private
     */


    parsePoint_() {
      const coordinates = [];
      const dimensions = this.layout_.length;

      for (let i = 0; i < dimensions; ++i) {
        const token = this.token_;
        if (this.match(TokenType.NUMBER)) coordinates.push(
        /** @type {number} */
        token.value);else break;
      }

      if (coordinates.length == dimensions) return coordinates;
      throw new Error(this.formatErrorMessage_());
    }
    /**
     * @return {!Array<!Array<number>>} An array of points.
     * @private
     */


    parsePointList_() {
      const coordinates = [this.parsePoint_()];

      while (this.match(TokenType.COMMA)) coordinates.push(this.parsePoint_());

      return coordinates;
    }
    /**
     * @return {!Array<!Array<number>>} An array of points.
     * @private
     */


    parsePointTextList_() {
      const coordinates = [this.parsePointText_()];

      while (this.match(TokenType.COMMA)) coordinates.push(this.parsePointText_());

      return coordinates;
    }
    /**
     * @return {!Array<!Array<!Array<number>>>} An array of points.
     * @private
     */


    parseLineStringTextList_() {
      const coordinates = [this.parseLineStringText_()];

      while (this.match(TokenType.COMMA)) coordinates.push(this.parseLineStringText_());

      return coordinates;
    }
    /**
     * @return {!Array<!Array<!Array<!Array<number>>>>} An array of points.
     * @private
     */


    parsePolygonTextList_() {
      const coordinates = [this.parsePolygonText_()];

      while (this.match(TokenType.COMMA)) coordinates.push(this.parsePolygonText_());

      return coordinates;
    }
    /**
     * @return {boolean} Whether the token implies an empty geometry.
     * @private
     */


    isEmptyGeometry_() {
      const isEmpty = this.isTokenType(TokenType.TEXT) && this.token_.value == EMPTY;
      if (isEmpty) this.consume_();
      return isEmpty;
    }
    /**
     * Create an error message for an unexpected token error.
     * @return {string} Error message.
     * @private
     */


    formatErrorMessage_() {
      return 'Unexpected `' + this.token_.value + '` at position ' + this.token_.position + ' in `' + this.lexer_.wkt + '`';
    }
    /**
     * @return {!import("../geom/Geometry.js").default} The geometry.
     * @private
     */


    parseGeometry_() {
      const factory = this.factory;

      const o2c = ordinates => new Coordinate(...ordinates);

      const ca2p = coordinates => {
        const rings = coordinates.map(a => factory.createLinearRing(a.map(o2c)));
        if (rings.length > 1) return factory.createPolygon(rings[0], rings.slice(1));else return factory.createPolygon(rings[0]);
      };

      const token = this.token_;

      if (this.match(TokenType.TEXT)) {
        const geomType = token.value;
        this.layout_ = this.parseGeometryLayout_();

        if (geomType == 'GEOMETRYCOLLECTION') {
          const geometries = this.parseGeometryCollectionText_();
          return factory.createGeometryCollection(geometries);
        } else {
          switch (geomType) {
            case 'POINT':
              {
                const ordinates = this.parsePointText_();
                if (!ordinates) return factory.createPoint();
                return factory.createPoint(new Coordinate(...ordinates));
              }

            case 'LINESTRING':
              {
                const coordinates = this.parseLineStringText_();
                const components = coordinates.map(o2c);
                return factory.createLineString(components);
              }

            case 'LINEARRING':
              {
                const coordinates = this.parseLineStringText_();
                const components = coordinates.map(o2c);
                return factory.createLinearRing(components);
              }

            case 'POLYGON':
              {
                const coordinates = this.parsePolygonText_();
                if (!coordinates || coordinates.length === 0) return factory.createPolygon();
                return ca2p(coordinates);
              }

            case 'MULTIPOINT':
              {
                const coordinates = this.parseMultiPointText_();
                if (!coordinates || coordinates.length === 0) return factory.createMultiPoint();
                const components = coordinates.map(o2c).map(c => factory.createPoint(c));
                return factory.createMultiPoint(components);
              }

            case 'MULTILINESTRING':
              {
                const coordinates = this.parseMultiLineStringText_();
                const components = coordinates.map(a => factory.createLineString(a.map(o2c)));
                return factory.createMultiLineString(components);
              }

            case 'MULTIPOLYGON':
              {
                const coordinates = this.parseMultiPolygonText_();
                if (!coordinates || coordinates.length === 0) return factory.createMultiPolygon();
                const polygons = coordinates.map(ca2p);
                return factory.createMultiPolygon(polygons);
              }

            default:
              {
                throw new Error('Invalid geometry type: ' + geomType);
              }
          }
        }
      }

      throw new Error(this.formatErrorMessage_());
    }

  }
  /**
   * @param {Point} geom Point geometry.
   * @return {string} Coordinates part of Point as WKT.
   */


  function encodePointGeometry(geom) {
    if (geom.isEmpty()) return '';
    const c = geom.getCoordinate();
    const cs = [c.x, c.y];
    if (c.z !== undefined && !Number.isNaN(c.z)) cs.push(c.z);
    if (c.m !== undefined && !Number.isNaN(c.m)) cs.push(c.m);
    return cs.join(' ');
  }
  /**
   * @param {MultiPoint} geom MultiPoint geometry.
   * @return {string} Coordinates part of MultiPoint as WKT.
   */


  function encodeMultiPointGeometry(geom) {
    const array = [];

    for (let i = 0, ii = geom.getNumGeometries(); i < ii; ++i) array.push('(' + encodePointGeometry(geom.getGeometryN(i)) + ')');

    return array.join(', ');
  }
  /**
   * @param {GeometryCollection} geom GeometryCollection geometry.
   * @return {string} Coordinates part of GeometryCollection as WKT.
   */


  function encodeGeometryCollectionGeometry(geom) {
    const array = [];

    for (let i = 0, ii = geom.getNumGeometries(); i < ii; ++i) array.push(encode(geom.getGeometryN(i)));

    return array.join(', ');
  }
  /**
   * @param {LineString|import("../geom/LinearRing.js").default} geom LineString geometry.
   * @return {string} Coordinates part of LineString as WKT.
   */


  function encodeLineStringGeometry(geom) {
    const coordinates = geom.getCoordinates().map(c => {
      const a = [c.x, c.y];
      if (c.z !== undefined && !Number.isNaN(c.z)) a.push(c.z);
      if (c.m !== undefined && !Number.isNaN(c.m)) a.push(c.m);
      return a;
    });
    const array = [];

    for (let i = 0, ii = coordinates.length; i < ii; ++i) array.push(coordinates[i].join(' '));

    return array.join(', ');
  }
  /**
   * @param {MultiLineString} geom MultiLineString geometry.
   * @return {string} Coordinates part of MultiLineString as WKT.
   */


  function encodeMultiLineStringGeometry(geom) {
    const array = [];

    for (let i = 0, ii = geom.getNumGeometries(); i < ii; ++i) array.push('(' + encodeLineStringGeometry(geom.getGeometryN(i)) + ')');

    return array.join(', ');
  }
  /**
   * @param {Polygon} geom Polygon geometry.
   * @return {string} Coordinates part of Polygon as WKT.
   */


  function encodePolygonGeometry(geom) {
    const array = [];
    array.push('(' + encodeLineStringGeometry(geom.getExteriorRing()) + ')');

    for (let i = 0, ii = geom.getNumInteriorRing(); i < ii; ++i) array.push('(' + encodeLineStringGeometry(geom.getInteriorRingN(i)) + ')');

    return array.join(', ');
  }
  /**
   * @param {MultiPolygon} geom MultiPolygon geometry.
   * @return {string} Coordinates part of MultiPolygon as WKT.
   */


  function encodeMultiPolygonGeometry(geom) {
    const array = [];

    for (let i = 0, ii = geom.getNumGeometries(); i < ii; ++i) array.push('(' + encodePolygonGeometry(geom.getGeometryN(i)) + ')');

    return array.join(', ');
  }
  /**
   * @param {Geometry} geom Geometry geometry.
   * @return {string} Potential dimensional information for WKT type.
   */


  function encodeGeometryLayout(geom) {
    let dimInfo = '';
    if (geom.isEmpty()) return dimInfo;
    const c = geom.getCoordinate();
    if (c.z !== undefined && !Number.isNaN(c.z)) dimInfo += Z;
    if (c.m !== undefined && !Number.isNaN(c.m)) dimInfo += M;
    return dimInfo;
  }
  /**
   * @const
   * @type {Object<string, function(import("../geom/Geometry.js").default): string>}
   */


  const GeometryEncoder = {
    'Point': encodePointGeometry,
    'LineString': encodeLineStringGeometry,
    'LinearRing': encodeLineStringGeometry,
    'Polygon': encodePolygonGeometry,
    'MultiPoint': encodeMultiPointGeometry,
    'MultiLineString': encodeMultiLineStringGeometry,
    'MultiPolygon': encodeMultiPolygonGeometry,
    'GeometryCollection': encodeGeometryCollectionGeometry
  };
  /**
   * Encode a geometry as WKT.
   * @param {!import("../geom/Geometry.js").default} geom The geometry to encode.
   * @return {string} WKT string for the geometry.
   */

  function encode(geom) {
    let type = geom.getGeometryType();
    const geometryEncoder = GeometryEncoder[type];
    type = type.toUpperCase();
    const dimInfo = encodeGeometryLayout(geom);
    if (dimInfo.length > 0) type += ' ' + dimInfo;
    if (geom.isEmpty()) return type + ' ' + EMPTY;
    const enc = geometryEncoder(geom);
    return type + ' (' + enc + ')';
  }
  /**
   * Class for reading and writing Well-Known Text.
   *
   * NOTE: Adapted from OpenLayers.
   */


  class WKTParser {
    /** Create a new parser for WKT
     *
     * @param {GeometryFactory} geometryFactory
     * @return An instance of WKTParser.
     * @private
     */
    constructor(geometryFactory) {
      this.geometryFactory = geometryFactory || new GeometryFactory();
      this.precisionModel = this.geometryFactory.getPrecisionModel();
    }
    /**
     * Deserialize a WKT string and return a geometry. Supports WKT for POINT,
     * MULTIPOINT, LINESTRING, LINEARRING, MULTILINESTRING, POLYGON, MULTIPOLYGON,
     * and GEOMETRYCOLLECTION.
     *
     * @param {String} wkt A WKT string.
     * @return {Geometry} A geometry instance.
     * @private
     */


    read(wkt) {
      const lexer = new Lexer(wkt);
      const parser = new Parser(lexer, this.geometryFactory);
      const geometry = parser.parse();
      return geometry;
    }
    /**
     * Serialize a geometry into a WKT string.
     *
     * @param {Geometry} geometry A feature or array of features.
     * @return {String} The WKT string representation of the input geometries.
     * @private
     */


    write(geometry) {
      return encode(geometry);
    }

  }

  /**
   * @module org/locationtech/jts/io/WKTWriter
   */
  /**
   * Writes the Well-Known Text representation of a {@link Geometry}. The
   * Well-Known Text format is defined in the <A
   * HREF="http://www.opengis.org/techno/specs.htm"> OGC Simple Features
   * Specification for SQL</A>.
   * <p>
   * The <code>WKTWriter</code> outputs coordinates rounded to the precision
   * model. Only the maximum number of decimal places necessary to represent the
   * ordinates to the required precision will be output.
   * <p>
   * The SFS WKT spec does not define a special tag for {@link LinearRing}s.
   * Under the spec, rings are output as <code>LINESTRING</code>s.
   */

  class WKTWriter {
    /**
     * @param {GeometryFactory} geometryFactory
     */
    constructor(geometryFactory) {
      this.parser = new WKTParser(geometryFactory);
    }
    /**
     * Converts a <code>Geometry</code> to its Well-known Text representation.
     *
     * @param {Geometry} geometry a <code>Geometry</code> to process.
     * @return {string} a <Geometry Tagged Text> string (see the OpenGIS Simple
     *         Features Specification).
     * @memberof module:org/locationtech/jts/io/WKTWriter#
     */


    write(geometry) {
      return this.parser.write(geometry);
    }
    /**
     * Generates the WKT for a <tt>LINESTRING</tt> specified by two
     * {@link Coordinate}s.
     *
     * @param p0 the first coordinate.
     * @param p1 the second coordinate.
     *
     * @return the WKT.
     * @private
     */


    static toLineString(p0, p1) {
      if (arguments.length !== 2) throw new Error('Not implemented');
      return 'LINESTRING ( ' + p0.x + ' ' + p0.y + ', ' + p1.x + ' ' + p1.y + ' )';
    }

  }

  class LineIntersector {
    constructor() {
      LineIntersector.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._result = null;
      this._inputLines = Array(2).fill().map(() => Array(2));
      this._intPt = new Array(2).fill(null);
      this._intLineIndex = null;
      this._isProper = null;
      this._pa = null;
      this._pb = null;
      this._precisionModel = null;
      this._intPt[0] = new Coordinate();
      this._intPt[1] = new Coordinate();
      this._pa = this._intPt[0];
      this._pb = this._intPt[1];
      this._result = 0;
    }

    static computeEdgeDistance(p, p0, p1) {
      const dx = Math.abs(p1.x - p0.x);
      const dy = Math.abs(p1.y - p0.y);
      let dist = -1.0;

      if (p.equals(p0)) {
        dist = 0.0;
      } else if (p.equals(p1)) {
        if (dx > dy) dist = dx;else dist = dy;
      } else {
        const pdx = Math.abs(p.x - p0.x);
        const pdy = Math.abs(p.y - p0.y);
        if (dx > dy) dist = pdx;else dist = pdy;
        if (dist === 0.0 && !p.equals(p0)) dist = Math.max(pdx, pdy);
      }

      Assert.isTrue(!(dist === 0.0 && !p.equals(p0)), 'Bad distance calculation');
      return dist;
    }

    static nonRobustComputeEdgeDistance(p, p1, p2) {
      const dx = p.x - p1.x;
      const dy = p.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      Assert.isTrue(!(dist === 0.0 && !p.equals(p1)), 'Invalid distance calculation');
      return dist;
    }

    getIndexAlongSegment(segmentIndex, intIndex) {
      this.computeIntLineIndex();
      return this._intLineIndex[segmentIndex][intIndex];
    }

    getTopologySummary() {
      const catBuilder = new StringBuilder();
      if (this.isEndPoint()) catBuilder.append(' endpoint');
      if (this._isProper) catBuilder.append(' proper');
      if (this.isCollinear()) catBuilder.append(' collinear');
      return catBuilder.toString();
    }

    computeIntersection(p1, p2, p3, p4) {
      this._inputLines[0][0] = p1;
      this._inputLines[0][1] = p2;
      this._inputLines[1][0] = p3;
      this._inputLines[1][1] = p4;
      this._result = this.computeIntersect(p1, p2, p3, p4);
    }

    getIntersectionNum() {
      return this._result;
    }

    computeIntLineIndex() {
      if (arguments.length === 0) {
        if (this._intLineIndex === null) {
          this._intLineIndex = Array(2).fill().map(() => Array(2));
          this.computeIntLineIndex(0);
          this.computeIntLineIndex(1);
        }
      } else if (arguments.length === 1) {
        const segmentIndex = arguments[0];
        const dist0 = this.getEdgeDistance(segmentIndex, 0);
        const dist1 = this.getEdgeDistance(segmentIndex, 1);

        if (dist0 > dist1) {
          this._intLineIndex[segmentIndex][0] = 0;
          this._intLineIndex[segmentIndex][1] = 1;
        } else {
          this._intLineIndex[segmentIndex][0] = 1;
          this._intLineIndex[segmentIndex][1] = 0;
        }
      }
    }

    isProper() {
      return this.hasIntersection() && this._isProper;
    }

    setPrecisionModel(precisionModel) {
      this._precisionModel = precisionModel;
    }

    isInteriorIntersection() {
      if (arguments.length === 0) {
        if (this.isInteriorIntersection(0)) return true;
        if (this.isInteriorIntersection(1)) return true;
        return false;
      } else if (arguments.length === 1) {
        const inputLineIndex = arguments[0];

        for (let i = 0; i < this._result; i++) if (!(this._intPt[i].equals2D(this._inputLines[inputLineIndex][0]) || this._intPt[i].equals2D(this._inputLines[inputLineIndex][1]))) return true;

        return false;
      }
    }

    getIntersection(intIndex) {
      return this._intPt[intIndex];
    }

    isEndPoint() {
      return this.hasIntersection() && !this._isProper;
    }

    hasIntersection() {
      return this._result !== LineIntersector.NO_INTERSECTION;
    }

    getEdgeDistance(segmentIndex, intIndex) {
      const dist = LineIntersector.computeEdgeDistance(this._intPt[intIndex], this._inputLines[segmentIndex][0], this._inputLines[segmentIndex][1]);
      return dist;
    }

    isCollinear() {
      return this._result === LineIntersector.COLLINEAR_INTERSECTION;
    }

    toString() {
      return WKTWriter.toLineString(this._inputLines[0][0], this._inputLines[0][1]) + ' - ' + WKTWriter.toLineString(this._inputLines[1][0], this._inputLines[1][1]) + this.getTopologySummary();
    }

    getEndpoint(segmentIndex, ptIndex) {
      return this._inputLines[segmentIndex][ptIndex];
    }

    isIntersection(pt) {
      for (let i = 0; i < this._result; i++) if (this._intPt[i].equals2D(pt)) return true;

      return false;
    }

    getIntersectionAlongSegment(segmentIndex, intIndex) {
      this.computeIntLineIndex();
      return this._intPt[this._intLineIndex[segmentIndex][intIndex]];
    }

  }
  LineIntersector.DONT_INTERSECT = 0;
  LineIntersector.DO_INTERSECT = 1;
  LineIntersector.COLLINEAR = 2;
  LineIntersector.NO_INTERSECTION = 0;
  LineIntersector.POINT_INTERSECTION = 1;
  LineIntersector.COLLINEAR_INTERSECTION = 2;

  class RobustLineIntersector extends LineIntersector {
    constructor() {
      super();
    }

    static nearestEndpoint(p1, p2, q1, q2) {
      let nearestPt = p1;
      let minDist = Distance.pointToSegment(p1, q1, q2);
      let dist = Distance.pointToSegment(p2, q1, q2);

      if (dist < minDist) {
        minDist = dist;
        nearestPt = p2;
      }

      dist = Distance.pointToSegment(q1, p1, p2);

      if (dist < minDist) {
        minDist = dist;
        nearestPt = q1;
      }

      dist = Distance.pointToSegment(q2, p1, p2);

      if (dist < minDist) {
        minDist = dist;
        nearestPt = q2;
      }

      return nearestPt;
    }

    isInSegmentEnvelopes(intPt) {
      const env0 = new Envelope(this._inputLines[0][0], this._inputLines[0][1]);
      const env1 = new Envelope(this._inputLines[1][0], this._inputLines[1][1]);
      return env0.contains(intPt) && env1.contains(intPt);
    }

    computeIntersection() {
      if (arguments.length === 3) {
        const p = arguments[0],
              p1 = arguments[1],
              p2 = arguments[2];
        this._isProper = false;
        if (Envelope.intersects(p1, p2, p)) if (Orientation.index(p1, p2, p) === 0 && Orientation.index(p2, p1, p) === 0) {
          this._isProper = true;
          if (p.equals(p1) || p.equals(p2)) this._isProper = false;
          this._result = LineIntersector.POINT_INTERSECTION;
          return null;
        }
        this._result = LineIntersector.NO_INTERSECTION;
      } else {
        return super.computeIntersection.apply(this, arguments);
      }
    }

    intersection(p1, p2, q1, q2) {
      let intPt = this.intersectionSafe(p1, p2, q1, q2);
      if (!this.isInSegmentEnvelopes(intPt)) intPt = new Coordinate(RobustLineIntersector.nearestEndpoint(p1, p2, q1, q2));
      if (this._precisionModel !== null) this._precisionModel.makePrecise(intPt);
      return intPt;
    }

    checkDD(p1, p2, q1, q2, intPt) {
      const intPtDD = CGAlgorithmsDD.intersection(p1, p2, q1, q2);
      const isIn = this.isInSegmentEnvelopes(intPtDD);
      System.out.println('DD in env = ' + isIn + '  --------------------- ' + intPtDD);
      if (intPt.distance(intPtDD) > 0.0001) System.out.println('Distance = ' + intPt.distance(intPtDD));
    }

    intersectionSafe(p1, p2, q1, q2) {
      let intPt = Intersection.intersection(p1, p2, q1, q2);
      if (intPt === null) intPt = RobustLineIntersector.nearestEndpoint(p1, p2, q1, q2);
      return intPt;
    }

    computeCollinearIntersection(p1, p2, q1, q2) {
      const p1q1p2 = Envelope.intersects(p1, p2, q1);
      const p1q2p2 = Envelope.intersects(p1, p2, q2);
      const q1p1q2 = Envelope.intersects(q1, q2, p1);
      const q1p2q2 = Envelope.intersects(q1, q2, p2);

      if (p1q1p2 && p1q2p2) {
        this._intPt[0] = q1;
        this._intPt[1] = q2;
        return LineIntersector.COLLINEAR_INTERSECTION;
      }

      if (q1p1q2 && q1p2q2) {
        this._intPt[0] = p1;
        this._intPt[1] = p2;
        return LineIntersector.COLLINEAR_INTERSECTION;
      }

      if (p1q1p2 && q1p1q2) {
        this._intPt[0] = q1;
        this._intPt[1] = p1;
        return q1.equals(p1) && !p1q2p2 && !q1p2q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION;
      }

      if (p1q1p2 && q1p2q2) {
        this._intPt[0] = q1;
        this._intPt[1] = p2;
        return q1.equals(p2) && !p1q2p2 && !q1p1q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION;
      }

      if (p1q2p2 && q1p1q2) {
        this._intPt[0] = q2;
        this._intPt[1] = p1;
        return q2.equals(p1) && !p1q1p2 && !q1p2q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION;
      }

      if (p1q2p2 && q1p2q2) {
        this._intPt[0] = q2;
        this._intPt[1] = p2;
        return q2.equals(p2) && !p1q1p2 && !q1p1q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION;
      }

      return LineIntersector.NO_INTERSECTION;
    }

    computeIntersect(p1, p2, q1, q2) {
      this._isProper = false;
      if (!Envelope.intersects(p1, p2, q1, q2)) return LineIntersector.NO_INTERSECTION;
      const Pq1 = Orientation.index(p1, p2, q1);
      const Pq2 = Orientation.index(p1, p2, q2);
      if (Pq1 > 0 && Pq2 > 0 || Pq1 < 0 && Pq2 < 0) return LineIntersector.NO_INTERSECTION;
      const Qp1 = Orientation.index(q1, q2, p1);
      const Qp2 = Orientation.index(q1, q2, p2);
      if (Qp1 > 0 && Qp2 > 0 || Qp1 < 0 && Qp2 < 0) return LineIntersector.NO_INTERSECTION;
      const collinear = Pq1 === 0 && Pq2 === 0 && Qp1 === 0 && Qp2 === 0;
      if (collinear) return this.computeCollinearIntersection(p1, p2, q1, q2);

      if (Pq1 === 0 || Pq2 === 0 || Qp1 === 0 || Qp2 === 0) {
        this._isProper = false;
        if (p1.equals2D(q1) || p1.equals2D(q2)) this._intPt[0] = p1;else if (p2.equals2D(q1) || p2.equals2D(q2)) this._intPt[0] = p2;else if (Pq1 === 0) this._intPt[0] = new Coordinate(q1);else if (Pq2 === 0) this._intPt[0] = new Coordinate(q2);else if (Qp1 === 0) this._intPt[0] = new Coordinate(p1);else if (Qp2 === 0) this._intPt[0] = new Coordinate(p2);
      } else {
        this._isProper = true;
        this._intPt[0] = this.intersection(p1, p2, q1, q2);
      }

      return LineIntersector.POINT_INTERSECTION;
    }

  }

  class LineSegment {
    constructor() {
      LineSegment.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.p0 = null;
      this.p1 = null;

      if (arguments.length === 0) {
        LineSegment.constructor_.call(this, new Coordinate(), new Coordinate());
      } else if (arguments.length === 1) {
        const ls = arguments[0];
        LineSegment.constructor_.call(this, ls.p0, ls.p1);
      } else if (arguments.length === 2) {
        const p0 = arguments[0],
              p1 = arguments[1];
        this.p0 = p0;
        this.p1 = p1;
      } else if (arguments.length === 4) {
        const x0 = arguments[0],
              y0 = arguments[1],
              x1 = arguments[2],
              y1 = arguments[3];
        LineSegment.constructor_.call(this, new Coordinate(x0, y0), new Coordinate(x1, y1));
      }
    }

    static midPoint(p0, p1) {
      return new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
    }

    minX() {
      return Math.min(this.p0.x, this.p1.x);
    }

    orientationIndex() {
      if (arguments[0] instanceof LineSegment) {
        const seg = arguments[0];
        const orient0 = Orientation.index(this.p0, this.p1, seg.p0);
        const orient1 = Orientation.index(this.p0, this.p1, seg.p1);
        if (orient0 >= 0 && orient1 >= 0) return Math.max(orient0, orient1);
        if (orient0 <= 0 && orient1 <= 0) return Math.max(orient0, orient1);
        return 0;
      } else if (arguments[0] instanceof Coordinate) {
        const p = arguments[0];
        return Orientation.index(this.p0, this.p1, p);
      }
    }

    toGeometry(geomFactory) {
      return geomFactory.createLineString([this.p0, this.p1]);
    }

    isVertical() {
      return this.p0.x === this.p1.x;
    }

    equals(o) {
      if (!(o instanceof LineSegment)) return false;
      const other = o;
      return this.p0.equals(other.p0) && this.p1.equals(other.p1);
    }

    intersection(line) {
      const li = new RobustLineIntersector();
      li.computeIntersection(this.p0, this.p1, line.p0, line.p1);
      if (li.hasIntersection()) return li.getIntersection(0);
      return null;
    }

    project() {
      if (arguments[0] instanceof Coordinate) {
        const p = arguments[0];
        if (p.equals(this.p0) || p.equals(this.p1)) return new Coordinate(p);
        const r = this.projectionFactor(p);
        const coord = new Coordinate();
        coord.x = this.p0.x + r * (this.p1.x - this.p0.x);
        coord.y = this.p0.y + r * (this.p1.y - this.p0.y);
        return coord;
      } else if (arguments[0] instanceof LineSegment) {
        const seg = arguments[0];
        const pf0 = this.projectionFactor(seg.p0);
        const pf1 = this.projectionFactor(seg.p1);
        if (pf0 >= 1.0 && pf1 >= 1.0) return null;
        if (pf0 <= 0.0 && pf1 <= 0.0) return null;
        let newp0 = this.project(seg.p0);
        if (pf0 < 0.0) newp0 = this.p0;
        if (pf0 > 1.0) newp0 = this.p1;
        let newp1 = this.project(seg.p1);
        if (pf1 < 0.0) newp1 = this.p0;
        if (pf1 > 1.0) newp1 = this.p1;
        return new LineSegment(newp0, newp1);
      }
    }

    normalize() {
      if (this.p1.compareTo(this.p0) < 0) this.reverse();
    }

    angle() {
      return Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
    }

    getCoordinate(i) {
      if (i === 0) return this.p0;
      return this.p1;
    }

    distancePerpendicular(p) {
      return Distance.pointToLinePerpendicular(p, this.p0, this.p1);
    }

    minY() {
      return Math.min(this.p0.y, this.p1.y);
    }

    midPoint() {
      return LineSegment.midPoint(this.p0, this.p1);
    }

    projectionFactor(p) {
      if (p.equals(this.p0)) return 0.0;
      if (p.equals(this.p1)) return 1.0;
      const dx = this.p1.x - this.p0.x;
      const dy = this.p1.y - this.p0.y;
      const len = dx * dx + dy * dy;
      if (len <= 0.0) return Double.NaN;
      const r = ((p.x - this.p0.x) * dx + (p.y - this.p0.y) * dy) / len;
      return r;
    }

    closestPoints(line) {
      const intPt = this.intersection(line);
      if (intPt !== null) return [intPt, intPt];
      const closestPt = new Array(2).fill(null);
      let minDistance = Double.MAX_VALUE;
      let dist = null;
      const close00 = this.closestPoint(line.p0);
      minDistance = close00.distance(line.p0);
      closestPt[0] = close00;
      closestPt[1] = line.p0;
      const close01 = this.closestPoint(line.p1);
      dist = close01.distance(line.p1);

      if (dist < minDistance) {
        minDistance = dist;
        closestPt[0] = close01;
        closestPt[1] = line.p1;
      }

      const close10 = line.closestPoint(this.p0);
      dist = close10.distance(this.p0);

      if (dist < minDistance) {
        minDistance = dist;
        closestPt[0] = this.p0;
        closestPt[1] = close10;
      }

      const close11 = line.closestPoint(this.p1);
      dist = close11.distance(this.p1);

      if (dist < minDistance) {
        minDistance = dist;
        closestPt[0] = this.p1;
        closestPt[1] = close11;
      }

      return closestPt;
    }

    closestPoint(p) {
      const factor = this.projectionFactor(p);
      if (factor > 0 && factor < 1) return this.project(p);
      const dist0 = this.p0.distance(p);
      const dist1 = this.p1.distance(p);
      if (dist0 < dist1) return this.p0;
      return this.p1;
    }

    maxX() {
      return Math.max(this.p0.x, this.p1.x);
    }

    getLength() {
      return this.p0.distance(this.p1);
    }

    compareTo(o) {
      const other = o;
      const comp0 = this.p0.compareTo(other.p0);
      if (comp0 !== 0) return comp0;
      return this.p1.compareTo(other.p1);
    }

    reverse() {
      const temp = this.p0;
      this.p0 = this.p1;
      this.p1 = temp;
    }

    equalsTopo(other) {
      return this.p0.equals(other.p0) && this.p1.equals(other.p1) || this.p0.equals(other.p1) && this.p1.equals(other.p0);
    }

    lineIntersection(line) {
      const intPt = Intersection.intersection(this.p0, this.p1, line.p0, line.p1);
      return intPt;
    }

    maxY() {
      return Math.max(this.p0.y, this.p1.y);
    }

    pointAlongOffset(segmentLengthFraction, offsetDistance) {
      const segx = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x);
      const segy = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y);
      const dx = this.p1.x - this.p0.x;
      const dy = this.p1.y - this.p0.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      let ux = 0.0;
      let uy = 0.0;

      if (offsetDistance !== 0.0) {
        if (len <= 0.0) throw new IllegalStateException('Cannot compute offset from zero-length line segment');
        ux = offsetDistance * dx / len;
        uy = offsetDistance * dy / len;
      }

      const offsetx = segx - uy;
      const offsety = segy + ux;
      const coord = new Coordinate(offsetx, offsety);
      return coord;
    }

    setCoordinates() {
      if (arguments.length === 1) {
        const ls = arguments[0];
        this.setCoordinates(ls.p0, ls.p1);
      } else if (arguments.length === 2) {
        const p0 = arguments[0],
              p1 = arguments[1];
        this.p0.x = p0.x;
        this.p0.y = p0.y;
        this.p1.x = p1.x;
        this.p1.y = p1.y;
      }
    }

    segmentFraction(inputPt) {
      let segFrac = this.projectionFactor(inputPt);
      if (segFrac < 0.0) segFrac = 0.0;else if (segFrac > 1.0 || Double.isNaN(segFrac)) segFrac = 1.0;
      return segFrac;
    }

    toString() {
      return 'LINESTRING( ' + this.p0.x + ' ' + this.p0.y + ', ' + this.p1.x + ' ' + this.p1.y + ')';
    }

    isHorizontal() {
      return this.p0.y === this.p1.y;
    }

    reflect(p) {
      const A = this.p1.getY() - this.p0.getY();
      const B = this.p0.getX() - this.p1.getX();
      const C = this.p0.getY() * (this.p1.getX() - this.p0.getX()) - this.p0.getX() * (this.p1.getY() - this.p0.getY());
      const A2plusB2 = A * A + B * B;
      const A2subB2 = A * A - B * B;
      const x = p.getX();
      const y = p.getY();
      const rx = (-A2subB2 * x - 2 * A * B * y - 2 * A * C) / A2plusB2;
      const ry = (A2subB2 * y - 2 * A * B * x - 2 * B * C) / A2plusB2;
      return new Coordinate(rx, ry);
    }

    distance() {
      if (arguments[0] instanceof LineSegment) {
        const ls = arguments[0];
        return Distance.segmentToSegment(this.p0, this.p1, ls.p0, ls.p1);
      } else if (arguments[0] instanceof Coordinate) {
        const p = arguments[0];
        return Distance.pointToSegment(p, this.p0, this.p1);
      }
    }

    pointAlong(segmentLengthFraction) {
      const coord = new Coordinate();
      coord.x = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x);
      coord.y = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y);
      return coord;
    }

    hashCode() {
      let bits0 = Double.doubleToLongBits(this.p0.x);
      bits0 ^= Double.doubleToLongBits(this.p0.y) * 31;
      const hash0 = Math.trunc(bits0) ^ Math.trunc(bits0 >> 32);
      let bits1 = Double.doubleToLongBits(this.p1.x);
      bits1 ^= Double.doubleToLongBits(this.p1.y) * 31;
      const hash1 = Math.trunc(bits1) ^ Math.trunc(bits1 >> 32);
      return hash0 ^ hash1;
    }

    get interfaces_() {
      return [Comparable, Serializable];
    }

  }

  class Location {
    static toLocationSymbol(locationValue) {
      switch (locationValue) {
        case Location.EXTERIOR:
          return 'e';

        case Location.BOUNDARY:
          return 'b';

        case Location.INTERIOR:
          return 'i';

        case Location.NONE:
          return '-';
      }

      throw new IllegalArgumentException('Unknown location value: ' + locationValue);
    }

  }
  Location.INTERIOR = 0;
  Location.BOUNDARY = 1;
  Location.EXTERIOR = 2;
  Location.NONE = -1;

  class IntersectionMatrix {
    constructor() {
      IntersectionMatrix.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._matrix = null;

      if (arguments.length === 0) {
        this._matrix = Array(3).fill().map(() => Array(3));
        this.setAll(Dimension.FALSE);
      } else if (arguments.length === 1) {
        if (typeof arguments[0] === 'string') {
          const elements = arguments[0];
          IntersectionMatrix.constructor_.call(this);
          this.set(elements);
        } else if (arguments[0] instanceof IntersectionMatrix) {
          const other = arguments[0];
          IntersectionMatrix.constructor_.call(this);
          this._matrix[Location.INTERIOR][Location.INTERIOR] = other._matrix[Location.INTERIOR][Location.INTERIOR];
          this._matrix[Location.INTERIOR][Location.BOUNDARY] = other._matrix[Location.INTERIOR][Location.BOUNDARY];
          this._matrix[Location.INTERIOR][Location.EXTERIOR] = other._matrix[Location.INTERIOR][Location.EXTERIOR];
          this._matrix[Location.BOUNDARY][Location.INTERIOR] = other._matrix[Location.BOUNDARY][Location.INTERIOR];
          this._matrix[Location.BOUNDARY][Location.BOUNDARY] = other._matrix[Location.BOUNDARY][Location.BOUNDARY];
          this._matrix[Location.BOUNDARY][Location.EXTERIOR] = other._matrix[Location.BOUNDARY][Location.EXTERIOR];
          this._matrix[Location.EXTERIOR][Location.INTERIOR] = other._matrix[Location.EXTERIOR][Location.INTERIOR];
          this._matrix[Location.EXTERIOR][Location.BOUNDARY] = other._matrix[Location.EXTERIOR][Location.BOUNDARY];
          this._matrix[Location.EXTERIOR][Location.EXTERIOR] = other._matrix[Location.EXTERIOR][Location.EXTERIOR];
        }
      }
    }

    static matches() {
      if (Number.isInteger(arguments[0]) && typeof arguments[1] === 'string') {
        const actualDimensionValue = arguments[0],
              requiredDimensionSymbol = arguments[1];
        if (requiredDimensionSymbol === Dimension.SYM_DONTCARE) return true;
        if (requiredDimensionSymbol === Dimension.SYM_TRUE && (actualDimensionValue >= 0 || actualDimensionValue === Dimension.TRUE)) return true;
        if (requiredDimensionSymbol === Dimension.SYM_FALSE && actualDimensionValue === Dimension.FALSE) return true;
        if (requiredDimensionSymbol === Dimension.SYM_P && actualDimensionValue === Dimension.P) return true;
        if (requiredDimensionSymbol === Dimension.SYM_L && actualDimensionValue === Dimension.L) return true;
        if (requiredDimensionSymbol === Dimension.SYM_A && actualDimensionValue === Dimension.A) return true;
        return false;
      } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'string') {
        const actualDimensionSymbols = arguments[0],
              requiredDimensionSymbols = arguments[1];
        const m = new IntersectionMatrix(actualDimensionSymbols);
        return m.matches(requiredDimensionSymbols);
      }
    }

    static isTrue(actualDimensionValue) {
      if (actualDimensionValue >= 0 || actualDimensionValue === Dimension.TRUE) return true;
      return false;
    }

    isIntersects() {
      return !this.isDisjoint();
    }

    isCovers() {
      const hasPointInCommon = IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.BOUNDARY]);
      return hasPointInCommon && this._matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE;
    }

    isCoveredBy() {
      const hasPointInCommon = IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.BOUNDARY]);
      return hasPointInCommon && this._matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE;
    }

    set() {
      if (arguments.length === 1) {
        const dimensionSymbols = arguments[0];

        for (let i = 0; i < dimensionSymbols.length; i++) {
          const row = Math.trunc(i / 3);
          const col = i % 3;
          this._matrix[row][col] = Dimension.toDimensionValue(dimensionSymbols.charAt(i));
        }
      } else if (arguments.length === 3) {
        const row = arguments[0],
              column = arguments[1],
              dimensionValue = arguments[2];
        this._matrix[row][column] = dimensionValue;
      }
    }

    isContains() {
      return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && this._matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE;
    }

    setAtLeast() {
      if (arguments.length === 1) {
        const minimumDimensionSymbols = arguments[0];

        for (let i = 0; i < minimumDimensionSymbols.length; i++) {
          const row = Math.trunc(i / 3);
          const col = i % 3;
          this.setAtLeast(row, col, Dimension.toDimensionValue(minimumDimensionSymbols.charAt(i)));
        }
      } else if (arguments.length === 3) {
        const row = arguments[0],
              column = arguments[1],
              minimumDimensionValue = arguments[2];
        if (this._matrix[row][column] < minimumDimensionValue) this._matrix[row][column] = minimumDimensionValue;
      }
    }

    setAtLeastIfValid(row, column, minimumDimensionValue) {
      if (row >= 0 && column >= 0) this.setAtLeast(row, column, minimumDimensionValue);
    }

    isWithin() {
      return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && this._matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE;
    }

    isTouches(dimensionOfGeometryA, dimensionOfGeometryB) {
      if (dimensionOfGeometryA > dimensionOfGeometryB) return this.isTouches(dimensionOfGeometryB, dimensionOfGeometryA);
      if (dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.L) return this._matrix[Location.INTERIOR][Location.INTERIOR] === Dimension.FALSE && (IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.BOUNDARY]));
      return false;
    }

    isOverlaps(dimensionOfGeometryA, dimensionOfGeometryB) {
      if (dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.A) return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.EXTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.EXTERIOR][Location.INTERIOR]);
      if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L) return this._matrix[Location.INTERIOR][Location.INTERIOR] === 1 && IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.EXTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.EXTERIOR][Location.INTERIOR]);
      return false;
    }

    isEquals(dimensionOfGeometryA, dimensionOfGeometryB) {
      if (dimensionOfGeometryA !== dimensionOfGeometryB) return false;
      return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && this._matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE;
    }

    toString() {
      const builder = new StringBuilder('123456789');

      for (let ai = 0; ai < 3; ai++) for (let bi = 0; bi < 3; bi++) builder.setCharAt(3 * ai + bi, Dimension.toDimensionSymbol(this._matrix[ai][bi]));

      return builder.toString();
    }

    setAll(dimensionValue) {
      for (let ai = 0; ai < 3; ai++) for (let bi = 0; bi < 3; bi++) this._matrix[ai][bi] = dimensionValue;
    }

    get(row, column) {
      return this._matrix[row][column];
    }

    transpose() {
      let temp = this._matrix[1][0];
      this._matrix[1][0] = this._matrix[0][1];
      this._matrix[0][1] = temp;
      temp = this._matrix[2][0];
      this._matrix[2][0] = this._matrix[0][2];
      this._matrix[0][2] = temp;
      temp = this._matrix[2][1];
      this._matrix[2][1] = this._matrix[1][2];
      this._matrix[1][2] = temp;
      return this;
    }

    matches(requiredDimensionSymbols) {
      if (requiredDimensionSymbols.length !== 9) throw new IllegalArgumentException('Should be length 9: ' + requiredDimensionSymbols);

      for (let ai = 0; ai < 3; ai++) for (let bi = 0; bi < 3; bi++) if (!IntersectionMatrix.matches(this._matrix[ai][bi], requiredDimensionSymbols.charAt(3 * ai + bi))) return false;

      return true;
    }

    add(im) {
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) this.setAtLeast(i, j, im.get(i, j));
    }

    isDisjoint() {
      return this._matrix[Location.INTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.INTERIOR][Location.BOUNDARY] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.BOUNDARY] === Dimension.FALSE;
    }

    isCrosses(dimensionOfGeometryA, dimensionOfGeometryB) {
      if (dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.L || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.A) return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.EXTERIOR]);
      if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.L) return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.EXTERIOR][Location.INTERIOR]);
      if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L) return this._matrix[Location.INTERIOR][Location.INTERIOR] === 0;
      return false;
    }

    get interfaces_() {
      return [Clonable];
    }

  }

  class Angle {
    static toDegrees(radians) {
      return radians * 180 / Math.PI;
    }

    static normalize(angle) {
      while (angle > Math.PI) angle -= Angle.PI_TIMES_2;

      while (angle <= -Math.PI) angle += Angle.PI_TIMES_2;

      return angle;
    }

    static angle() {
      if (arguments.length === 1) {
        const p = arguments[0];
        return Math.atan2(p.y, p.x);
      } else if (arguments.length === 2) {
        const p0 = arguments[0],
              p1 = arguments[1];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        return Math.atan2(dy, dx);
      }
    }

    static isAcute(p0, p1, p2) {
      const dx0 = p0.x - p1.x;
      const dy0 = p0.y - p1.y;
      const dx1 = p2.x - p1.x;
      const dy1 = p2.y - p1.y;
      const dotprod = dx0 * dx1 + dy0 * dy1;
      return dotprod > 0;
    }

    static isObtuse(p0, p1, p2) {
      const dx0 = p0.x - p1.x;
      const dy0 = p0.y - p1.y;
      const dx1 = p2.x - p1.x;
      const dy1 = p2.y - p1.y;
      const dotprod = dx0 * dx1 + dy0 * dy1;
      return dotprod < 0;
    }

    static interiorAngle(p0, p1, p2) {
      const anglePrev = Angle.angle(p1, p0);
      const angleNext = Angle.angle(p1, p2);
      return Math.abs(angleNext - anglePrev);
    }

    static normalizePositive(angle) {
      if (angle < 0.0) {
        while (angle < 0.0) angle += Angle.PI_TIMES_2;

        if (angle >= Angle.PI_TIMES_2) angle = 0.0;
      } else {
        while (angle >= Angle.PI_TIMES_2) angle -= Angle.PI_TIMES_2;

        if (angle < 0.0) angle = 0.0;
      }

      return angle;
    }

    static angleBetween(tip1, tail, tip2) {
      const a1 = Angle.angle(tail, tip1);
      const a2 = Angle.angle(tail, tip2);
      return Angle.diff(a1, a2);
    }

    static diff(ang1, ang2) {
      let delAngle = null;
      if (ang1 < ang2) delAngle = ang2 - ang1;else delAngle = ang1 - ang2;
      if (delAngle > Math.PI) delAngle = 2 * Math.PI - delAngle;
      return delAngle;
    }

    static toRadians(angleDegrees) {
      return angleDegrees * Math.PI / 180.0;
    }

    static getTurn(ang1, ang2) {
      const crossproduct = Math.sin(ang2 - ang1);
      if (crossproduct > 0) return Angle.COUNTERCLOCKWISE;
      if (crossproduct < 0) return Angle.CLOCKWISE;
      return Angle.NONE;
    }

    static angleBetweenOriented(tip1, tail, tip2) {
      const a1 = Angle.angle(tail, tip1);
      const a2 = Angle.angle(tail, tip2);
      const angDel = a2 - a1;
      if (angDel <= -Math.PI) return angDel + Angle.PI_TIMES_2;
      if (angDel > Math.PI) return angDel - Angle.PI_TIMES_2;
      return angDel;
    }

  }
  Angle.PI_TIMES_2 = 2.0 * Math.PI;
  Angle.PI_OVER_2 = Math.PI / 2.0;
  Angle.PI_OVER_4 = Math.PI / 4.0;
  Angle.COUNTERCLOCKWISE = Orientation.COUNTERCLOCKWISE;
  Angle.CLOCKWISE = Orientation.CLOCKWISE;
  Angle.NONE = Orientation.COLLINEAR;

  class NotRepresentableException extends Exception {
    constructor() {
      super();
      NotRepresentableException.constructor_.apply(this, arguments);
    }

    static constructor_() {
      Exception.constructor_.call(this, 'Projective point not representable on the Cartesian plane.');
    }

  }

  class HCoordinate {
    constructor() {
      HCoordinate.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.x = null;
      this.y = null;
      this.w = null;

      if (arguments.length === 0) {
        this.x = 0.0;
        this.y = 0.0;
        this.w = 1.0;
      } else if (arguments.length === 1) {
        const p = arguments[0];
        this.x = p.x;
        this.y = p.y;
        this.w = 1.0;
      } else if (arguments.length === 2) {
        if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
          const _x = arguments[0],
                _y = arguments[1];
          this.x = _x;
          this.y = _y;
          this.w = 1.0;
        } else if (arguments[0] instanceof HCoordinate && arguments[1] instanceof HCoordinate) {
          const p1 = arguments[0],
                p2 = arguments[1];
          this.x = p1.y * p2.w - p2.y * p1.w;
          this.y = p2.x * p1.w - p1.x * p2.w;
          this.w = p1.x * p2.y - p2.x * p1.y;
        } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
          const p1 = arguments[0],
                p2 = arguments[1];
          this.x = p1.y - p2.y;
          this.y = p2.x - p1.x;
          this.w = p1.x * p2.y - p2.x * p1.y;
        }
      } else if (arguments.length === 3) {
        const _x = arguments[0],
              _y = arguments[1],
              _w = arguments[2];
        this.x = _x;
        this.y = _y;
        this.w = _w;
      } else if (arguments.length === 4) {
        const p1 = arguments[0],
              p2 = arguments[1],
              q1 = arguments[2],
              q2 = arguments[3];
        const px = p1.y - p2.y;
        const py = p2.x - p1.x;
        const pw = p1.x * p2.y - p2.x * p1.y;
        const qx = q1.y - q2.y;
        const qy = q2.x - q1.x;
        const qw = q1.x * q2.y - q2.x * q1.y;
        this.x = py * qw - qy * pw;
        this.y = qx * pw - px * qw;
        this.w = px * qy - qx * py;
      }
    }

    getY() {
      const a = this.y / this.w;
      if (Double.isNaN(a) || Double.isInfinite(a)) throw new NotRepresentableException();
      return a;
    }

    getX() {
      const a = this.x / this.w;
      if (Double.isNaN(a) || Double.isInfinite(a)) throw new NotRepresentableException();
      return a;
    }

    getCoordinate() {
      const p = new Coordinate();
      p.x = this.getX();
      p.y = this.getY();
      return p;
    }

  }

  class Triangle {
    constructor() {
      Triangle.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.p0 = null;
      this.p1 = null;
      this.p2 = null;
      const p0 = arguments[0],
            p1 = arguments[1],
            p2 = arguments[2];
      this.p0 = p0;
      this.p1 = p1;
      this.p2 = p2;
    }

    static area(a, b, c) {
      return Math.abs(((c.x - a.x) * (b.y - a.y) - (b.x - a.x) * (c.y - a.y)) / 2);
    }

    static signedArea(a, b, c) {
      return ((c.x - a.x) * (b.y - a.y) - (b.x - a.x) * (c.y - a.y)) / 2;
    }

    static det(m00, m01, m10, m11) {
      return m00 * m11 - m01 * m10;
    }

    static interpolateZ(p, v0, v1, v2) {
      const x0 = v0.x;
      const y0 = v0.y;
      const a = v1.x - x0;
      const b = v2.x - x0;
      const c = v1.y - y0;
      const d = v2.y - y0;
      const det = a * d - b * c;
      const dx = p.x - x0;
      const dy = p.y - y0;
      const t = (d * dx - b * dy) / det;
      const u = (-c * dx + a * dy) / det;
      const z = v0.getZ() + t * (v1.getZ() - v0.getZ()) + u * (v2.getZ() - v0.getZ());
      return z;
    }

    static longestSideLength(a, b, c) {
      const lenAB = a.distance(b);
      const lenBC = b.distance(c);
      const lenCA = c.distance(a);
      let maxLen = lenAB;
      if (lenBC > maxLen) maxLen = lenBC;
      if (lenCA > maxLen) maxLen = lenCA;
      return maxLen;
    }

    static circumcentreDD(a, b, c) {
      const ax = DD.valueOf(a.x).subtract(c.x);
      const ay = DD.valueOf(a.y).subtract(c.y);
      const bx = DD.valueOf(b.x).subtract(c.x);
      const by = DD.valueOf(b.y).subtract(c.y);
      const denom = DD.determinant(ax, ay, bx, by).multiply(2);
      const asqr = ax.sqr().add(ay.sqr());
      const bsqr = bx.sqr().add(by.sqr());
      const numx = DD.determinant(ay, asqr, by, bsqr);
      const numy = DD.determinant(ax, asqr, bx, bsqr);
      const ccx = DD.valueOf(c.x).subtract(numx.divide(denom)).doubleValue();
      const ccy = DD.valueOf(c.y).add(numy.divide(denom)).doubleValue();
      return new Coordinate(ccx, ccy);
    }

    static isAcute(a, b, c) {
      if (!Angle.isAcute(a, b, c)) return false;
      if (!Angle.isAcute(b, c, a)) return false;
      if (!Angle.isAcute(c, a, b)) return false;
      return true;
    }

    static circumcentre(a, b, c) {
      const cx = c.x;
      const cy = c.y;
      const ax = a.x - cx;
      const ay = a.y - cy;
      const bx = b.x - cx;
      const by = b.y - cy;
      const denom = 2 * Triangle.det(ax, ay, bx, by);
      const numx = Triangle.det(ay, ax * ax + ay * ay, by, bx * bx + by * by);
      const numy = Triangle.det(ax, ax * ax + ay * ay, bx, bx * bx + by * by);
      const ccx = cx - numx / denom;
      const ccy = cy + numy / denom;
      return new Coordinate(ccx, ccy);
    }

    static perpendicularBisector(a, b) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const l1 = new HCoordinate(a.x + dx / 2.0, a.y + dy / 2.0, 1.0);
      const l2 = new HCoordinate(a.x - dy + dx / 2.0, a.y + dx + dy / 2.0, 1.0);
      return new HCoordinate(l1, l2);
    }

    static angleBisector(a, b, c) {
      const len0 = b.distance(a);
      const len2 = b.distance(c);
      const frac = len0 / (len0 + len2);
      const dx = c.x - a.x;
      const dy = c.y - a.y;
      const splitPt = new Coordinate(a.x + frac * dx, a.y + frac * dy);
      return splitPt;
    }

    static area3D(a, b, c) {
      const ux = b.x - a.x;
      const uy = b.y - a.y;
      const uz = b.getZ() - a.getZ();
      const vx = c.x - a.x;
      const vy = c.y - a.y;
      const vz = c.getZ() - a.getZ();
      const crossx = uy * vz - uz * vy;
      const crossy = uz * vx - ux * vz;
      const crossz = ux * vy - uy * vx;
      const absSq = crossx * crossx + crossy * crossy + crossz * crossz;
      const area3D = Math.sqrt(absSq) / 2;
      return area3D;
    }

    static centroid(a, b, c) {
      const x = (a.x + b.x + c.x) / 3;
      const y = (a.y + b.y + c.y) / 3;
      return new Coordinate(x, y);
    }

    static inCentre(a, b, c) {
      const len0 = b.distance(c);
      const len1 = a.distance(c);
      const len2 = a.distance(b);
      const circum = len0 + len1 + len2;
      const inCentreX = (len0 * a.x + len1 * b.x + len2 * c.x) / circum;
      const inCentreY = (len0 * a.y + len1 * b.y + len2 * c.y) / circum;
      return new Coordinate(inCentreX, inCentreY);
    }

    area() {
      return Triangle.area(this.p0, this.p1, this.p2);
    }

    signedArea() {
      return Triangle.signedArea(this.p0, this.p1, this.p2);
    }

    interpolateZ(p) {
      if (p === null) throw new IllegalArgumentException('Supplied point is null.');
      return Triangle.interpolateZ(p, this.p0, this.p1, this.p2);
    }

    longestSideLength() {
      return Triangle.longestSideLength(this.p0, this.p1, this.p2);
    }

    isAcute() {
      return Triangle.isAcute(this.p0, this.p1, this.p2);
    }

    circumcentre() {
      return Triangle.circumcentre(this.p0, this.p1, this.p2);
    }

    area3D() {
      return Triangle.area3D(this.p0, this.p1, this.p2);
    }

    centroid() {
      return Triangle.centroid(this.p0, this.p1, this.p2);
    }

    inCentre() {
      return Triangle.inCentre(this.p0, this.p1, this.p2);
    }

  }

  class NoninvertibleTransformationException extends Exception {
    constructor() {
      super();
      NoninvertibleTransformationException.constructor_.apply(this, arguments);
    }

    static constructor_() {
      if (arguments.length === 0) {
        Exception.constructor_.call(this);
      } else if (arguments.length === 1) {
        const msg = arguments[0];
        Exception.constructor_.call(this, msg);
      }
    }

  }

  class AffineTransformation {
    constructor() {
      AffineTransformation.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._m00 = null;
      this._m01 = null;
      this._m02 = null;
      this._m10 = null;
      this._m11 = null;
      this._m12 = null;

      if (arguments.length === 0) {
        this.setToIdentity();
      } else if (arguments.length === 1) {
        if (arguments[0] instanceof Array) {
          const matrix = arguments[0];
          this._m00 = matrix[0];
          this._m01 = matrix[1];
          this._m02 = matrix[2];
          this._m10 = matrix[3];
          this._m11 = matrix[4];
          this._m12 = matrix[5];
        } else if (arguments[0] instanceof AffineTransformation) {
          const trans = arguments[0];
          this.setTransformation(trans);
        }
      } else if (arguments.length === 6) {
        if (typeof arguments[5] === 'number' && typeof arguments[4] === 'number' && typeof arguments[3] === 'number' && typeof arguments[2] === 'number' && typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
          const m00 = arguments[0],
                m01 = arguments[1],
                m02 = arguments[2],
                m10 = arguments[3],
                m11 = arguments[4],
                m12 = arguments[5];
          this.setTransformation(m00, m01, m02, m10, m11, m12);
        }
      }
    }

    static translationInstance(x, y) {
      const trans = new AffineTransformation();
      trans.setToTranslation(x, y);
      return trans;
    }

    static shearInstance(xShear, yShear) {
      const trans = new AffineTransformation();
      trans.setToShear(xShear, yShear);
      return trans;
    }

    static reflectionInstance() {
      if (arguments.length === 2) {
        const x = arguments[0],
              y = arguments[1];
        const trans = new AffineTransformation();
        trans.setToReflection(x, y);
        return trans;
      } else if (arguments.length === 4) {
        const x0 = arguments[0],
              y0 = arguments[1],
              x1 = arguments[2],
              y1 = arguments[3];
        const trans = new AffineTransformation();
        trans.setToReflection(x0, y0, x1, y1);
        return trans;
      }
    }

    static rotationInstance() {
      if (arguments.length === 1) {
        const theta = arguments[0];
        return AffineTransformation.rotationInstance(Math.sin(theta), Math.cos(theta));
      } else if (arguments.length === 2) {
        const sinTheta = arguments[0],
              cosTheta = arguments[1];
        const trans = new AffineTransformation();
        trans.setToRotation(sinTheta, cosTheta);
        return trans;
      } else if (arguments.length === 3) {
        const theta = arguments[0],
              x = arguments[1],
              y = arguments[2];
        return AffineTransformation.rotationInstance(Math.sin(theta), Math.cos(theta), x, y);
      } else if (arguments.length === 4) {
        const sinTheta = arguments[0],
              cosTheta = arguments[1],
              x = arguments[2],
              y = arguments[3];
        const trans = new AffineTransformation();
        trans.setToRotation(sinTheta, cosTheta, x, y);
        return trans;
      }
    }

    static scaleInstance() {
      if (arguments.length === 2) {
        const xScale = arguments[0],
              yScale = arguments[1];
        const trans = new AffineTransformation();
        trans.setToScale(xScale, yScale);
        return trans;
      } else if (arguments.length === 4) {
        const xScale = arguments[0],
              yScale = arguments[1],
              x = arguments[2],
              y = arguments[3];
        const trans = new AffineTransformation();
        trans.translate(-x, -y);
        trans.scale(xScale, yScale);
        trans.translate(x, y);
        return trans;
      }
    }

    setToReflectionBasic(x0, y0, x1, y1) {
      if (x0 === x1 && y0 === y1) throw new IllegalArgumentException('Reflection line points must be distinct');
      const dx = x1 - x0;
      const dy = y1 - y0;
      const d = Math.sqrt(dx * dx + dy * dy);
      const sin = dy / d;
      const cos = dx / d;
      const cs2 = 2 * sin * cos;
      const c2s2 = cos * cos - sin * sin;
      this._m00 = c2s2;
      this._m01 = cs2;
      this._m02 = 0.0;
      this._m10 = cs2;
      this._m11 = -c2s2;
      this._m12 = 0.0;
      return this;
    }

    getInverse() {
      const det = this.getDeterminant();
      if (det === 0) throw new NoninvertibleTransformationException('Transformation is non-invertible');
      const im00 = this._m11 / det;
      const im10 = -this._m10 / det;
      const im01 = -this._m01 / det;
      const im11 = this._m00 / det;
      const im02 = (this._m01 * this._m12 - this._m02 * this._m11) / det;
      const im12 = (-this._m00 * this._m12 + this._m10 * this._m02) / det;
      return new AffineTransformation(im00, im01, im02, im10, im11, im12);
    }

    compose(trans) {
      const mp00 = trans._m00 * this._m00 + trans._m01 * this._m10;
      const mp01 = trans._m00 * this._m01 + trans._m01 * this._m11;
      const mp02 = trans._m00 * this._m02 + trans._m01 * this._m12 + trans._m02;
      const mp10 = trans._m10 * this._m00 + trans._m11 * this._m10;
      const mp11 = trans._m10 * this._m01 + trans._m11 * this._m11;
      const mp12 = trans._m10 * this._m02 + trans._m11 * this._m12 + trans._m12;
      this._m00 = mp00;
      this._m01 = mp01;
      this._m02 = mp02;
      this._m10 = mp10;
      this._m11 = mp11;
      this._m12 = mp12;
      return this;
    }

    equals(obj) {
      if (obj === null) return false;
      if (!(obj instanceof AffineTransformation)) return false;
      const trans = obj;
      return this._m00 === trans._m00 && this._m01 === trans._m01 && this._m02 === trans._m02 && this._m10 === trans._m10 && this._m11 === trans._m11 && this._m12 === trans._m12;
    }

    setToScale(xScale, yScale) {
      this._m00 = xScale;
      this._m01 = 0.0;
      this._m02 = 0.0;
      this._m10 = 0.0;
      this._m11 = yScale;
      this._m12 = 0.0;
      return this;
    }

    isIdentity() {
      return this._m00 === 1 && this._m01 === 0 && this._m02 === 0 && this._m10 === 0 && this._m11 === 1 && this._m12 === 0;
    }

    scale(xScale, yScale) {
      this.compose(AffineTransformation.scaleInstance(xScale, yScale));
      return this;
    }

    setToIdentity() {
      this._m00 = 1.0;
      this._m01 = 0.0;
      this._m02 = 0.0;
      this._m10 = 0.0;
      this._m11 = 1.0;
      this._m12 = 0.0;
      return this;
    }

    isGeometryChanged() {
      return true;
    }

    setTransformation() {
      if (arguments.length === 1) {
        const trans = arguments[0];
        this._m00 = trans._m00;
        this._m01 = trans._m01;
        this._m02 = trans._m02;
        this._m10 = trans._m10;
        this._m11 = trans._m11;
        this._m12 = trans._m12;
        return this;
      } else if (arguments.length === 6) {
        const m00 = arguments[0],
              m01 = arguments[1],
              m02 = arguments[2],
              m10 = arguments[3],
              m11 = arguments[4],
              m12 = arguments[5];
        this._m00 = m00;
        this._m01 = m01;
        this._m02 = m02;
        this._m10 = m10;
        this._m11 = m11;
        this._m12 = m12;
        return this;
      }
    }

    setToRotation() {
      if (arguments.length === 1) {
        const theta = arguments[0];
        this.setToRotation(Math.sin(theta), Math.cos(theta));
        return this;
      } else if (arguments.length === 2) {
        const sinTheta = arguments[0],
              cosTheta = arguments[1];
        this._m00 = cosTheta;
        this._m01 = -sinTheta;
        this._m02 = 0.0;
        this._m10 = sinTheta;
        this._m11 = cosTheta;
        this._m12 = 0.0;
        return this;
      } else if (arguments.length === 3) {
        const theta = arguments[0],
              x = arguments[1],
              y = arguments[2];
        this.setToRotation(Math.sin(theta), Math.cos(theta), x, y);
        return this;
      } else if (arguments.length === 4) {
        const sinTheta = arguments[0],
              cosTheta = arguments[1],
              x = arguments[2],
              y = arguments[3];
        this._m00 = cosTheta;
        this._m01 = -sinTheta;
        this._m02 = x - x * cosTheta + y * sinTheta;
        this._m10 = sinTheta;
        this._m11 = cosTheta;
        this._m12 = y - x * sinTheta - y * cosTheta;
        return this;
      }
    }

    getMatrixEntries() {
      return [this._m00, this._m01, this._m02, this._m10, this._m11, this._m12];
    }

    filter(seq, i) {
      this.transform(seq, i);
    }

    rotate() {
      if (arguments.length === 1) {
        const theta = arguments[0];
        this.compose(AffineTransformation.rotationInstance(theta));
        return this;
      } else if (arguments.length === 2) {
        const sinTheta = arguments[0],
              cosTheta = arguments[1];
        this.compose(AffineTransformation.rotationInstance(sinTheta, cosTheta));
        return this;
      } else if (arguments.length === 3) {
        const theta = arguments[0],
              x = arguments[1],
              y = arguments[2];
        this.compose(AffineTransformation.rotationInstance(theta, x, y));
        return this;
      } else if (arguments.length === 4) {
        const sinTheta = arguments[0],
              cosTheta = arguments[1],
              x = arguments[2],
              y = arguments[3];
        this.compose(AffineTransformation.rotationInstance(sinTheta, cosTheta, x, y));
        return this;
      }
    }

    getDeterminant() {
      return this._m00 * this._m11 - this._m01 * this._m10;
    }

    composeBefore(trans) {
      const mp00 = this._m00 * trans._m00 + this._m01 * trans._m10;
      const mp01 = this._m00 * trans._m01 + this._m01 * trans._m11;
      const mp02 = this._m00 * trans._m02 + this._m01 * trans._m12 + this._m02;
      const mp10 = this._m10 * trans._m00 + this._m11 * trans._m10;
      const mp11 = this._m10 * trans._m01 + this._m11 * trans._m11;
      const mp12 = this._m10 * trans._m02 + this._m11 * trans._m12 + this._m12;
      this._m00 = mp00;
      this._m01 = mp01;
      this._m02 = mp02;
      this._m10 = mp10;
      this._m11 = mp11;
      this._m12 = mp12;
      return this;
    }

    setToShear(xShear, yShear) {
      this._m00 = 1.0;
      this._m01 = xShear;
      this._m02 = 0.0;
      this._m10 = yShear;
      this._m11 = 1.0;
      this._m12 = 0.0;
      return this;
    }

    isDone() {
      return false;
    }

    clone() {
      try {
        return null;
      } catch (ex) {
        if (ex instanceof Exception) Assert.shouldNeverReachHere();else throw ex;
      } finally {}

      return null;
    }

    translate(x, y) {
      this.compose(AffineTransformation.translationInstance(x, y));
      return this;
    }

    setToReflection() {
      if (arguments.length === 2) {
        const x = arguments[0],
              y = arguments[1];
        if (x === 0.0 && y === 0.0) throw new IllegalArgumentException('Reflection vector must be non-zero');

        if (x === y) {
          this._m00 = 0.0;
          this._m01 = 1.0;
          this._m02 = 0.0;
          this._m10 = 1.0;
          this._m11 = 0.0;
          this._m12 = 0.0;
          return this;
        }

        const d = Math.sqrt(x * x + y * y);
        const sin = y / d;
        const cos = x / d;
        this.rotate(-sin, cos);
        this.scale(1, -1);
        this.rotate(sin, cos);
        return this;
      } else if (arguments.length === 4) {
        const x0 = arguments[0],
              y0 = arguments[1],
              x1 = arguments[2],
              y1 = arguments[3];
        if (x0 === x1 && y0 === y1) throw new IllegalArgumentException('Reflection line points must be distinct');
        this.setToTranslation(-x0, -y0);
        const dx = x1 - x0;
        const dy = y1 - y0;
        const d = Math.sqrt(dx * dx + dy * dy);
        const sin = dy / d;
        const cos = dx / d;
        this.rotate(-sin, cos);
        this.scale(1, -1);
        this.rotate(sin, cos);
        this.translate(x0, y0);
        return this;
      }
    }

    toString() {
      return 'AffineTransformation[[' + this._m00 + ', ' + this._m01 + ', ' + this._m02 + '], [' + this._m10 + ', ' + this._m11 + ', ' + this._m12 + ']]';
    }

    setToTranslation(dx, dy) {
      this._m00 = 1.0;
      this._m01 = 0.0;
      this._m02 = dx;
      this._m10 = 0.0;
      this._m11 = 1.0;
      this._m12 = dy;
      return this;
    }

    shear(xShear, yShear) {
      this.compose(AffineTransformation.shearInstance(xShear, yShear));
      return this;
    }

    transform() {
      if (arguments.length === 1) {
        const g = arguments[0];
        const g2 = g.copy();
        g2.apply(this);
        return g2;
      } else if (arguments.length === 2) {
        if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
          const src = arguments[0],
                dest = arguments[1];
          const xp = this._m00 * src.x + this._m01 * src.y + this._m02;
          const yp = this._m10 * src.x + this._m11 * src.y + this._m12;
          dest.x = xp;
          dest.y = yp;
          return dest;
        } else if (hasInterface(arguments[0], CoordinateSequence) && Number.isInteger(arguments[1])) {
          const seq = arguments[0],
                i = arguments[1];

          const xp = this._m00 * seq.getOrdinate(i, 0) + this._m01 * seq.getOrdinate(i, 1) + this._m02;

          const yp = this._m10 * seq.getOrdinate(i, 0) + this._m11 * seq.getOrdinate(i, 1) + this._m12;

          seq.setOrdinate(i, 0, xp);
          seq.setOrdinate(i, 1, yp);
        }
      }
    }

    reflect() {
      if (arguments.length === 2) {
        const x = arguments[0],
              y = arguments[1];
        this.compose(AffineTransformation.reflectionInstance(x, y));
        return this;
      } else if (arguments.length === 4) {
        const x0 = arguments[0],
              y0 = arguments[1],
              x1 = arguments[2],
              y1 = arguments[3];
        this.compose(AffineTransformation.reflectionInstance(x0, y0, x1, y1));
        return this;
      }
    }

    get interfaces_() {
      return [Clonable, CoordinateSequenceFilter];
    }

  }

  class Matrix {
    static solve(a, b) {
      const n = b.length;
      if (a.length !== n || a[0].length !== n) throw new IllegalArgumentException('Matrix A is incorrectly sized');

      for (let i = 0; i < n; i++) {
        let maxElementRow = i;

        for (let j = i + 1; j < n; j++) if (Math.abs(a[j][i]) > Math.abs(a[maxElementRow][i])) maxElementRow = j;

        if (a[maxElementRow][i] === 0.0) return null;
        Matrix.swapRows(a, i, maxElementRow);
        Matrix.swapRows(b, i, maxElementRow);

        for (let j = i + 1; j < n; j++) {
          const rowFactor = a[j][i] / a[i][i];

          for (let k = n - 1; k >= i; k--) a[j][k] -= a[i][k] * rowFactor;

          b[j] -= b[i] * rowFactor;
        }
      }

      const solution = new Array(n).fill(null);

      for (let j = n - 1; j >= 0; j--) {
        let t = 0.0;

        for (let k = j + 1; k < n; k++) t += a[j][k] * solution[k];

        solution[j] = (b[j] - t) / a[j][j];
      }

      return solution;
    }

    static swapRows() {
      if (Number.isInteger(arguments[2]) && arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
        const m = arguments[0],
              i = arguments[1],
              j = arguments[2];
        if (i === j) return null;

        for (let col = 0; col < m[0].length; col++) {
          const temp = m[i][col];
          m[i][col] = m[j][col];
          m[j][col] = temp;
        }
      } else if (Number.isInteger(arguments[2]) && arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
        const m = arguments[0],
              i = arguments[1],
              j = arguments[2];
        if (i === j) return null;
        const temp = m[i];
        m[i] = m[j];
        m[j] = temp;
      }
    }

  }

  class AffineTransformationBuilder {
    constructor() {
      AffineTransformationBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._src0 = null;
      this._src1 = null;
      this._src2 = null;
      this._dest0 = null;
      this._dest1 = null;
      this._dest2 = null;
      this._m00 = null;
      this._m01 = null;
      this._m02 = null;
      this._m10 = null;
      this._m11 = null;
      this._m12 = null;
      const src0 = arguments[0],
            src1 = arguments[1],
            src2 = arguments[2],
            dest0 = arguments[3],
            dest1 = arguments[4],
            dest2 = arguments[5];
      this._src0 = src0;
      this._src1 = src1;
      this._src2 = src2;
      this._dest0 = dest0;
      this._dest1 = dest1;
      this._dest2 = dest2;
    }

    solve(b) {
      const a = [[this._src0.x, this._src0.y, 1], [this._src1.x, this._src1.y, 1], [this._src2.x, this._src2.y, 1]];
      return Matrix.solve(a, b);
    }

    compute() {
      const bx = [this._dest0.x, this._dest1.x, this._dest2.x];
      const row0 = this.solve(bx);
      if (row0 === null) return false;
      this._m00 = row0[0];
      this._m01 = row0[1];
      this._m02 = row0[2];
      const by = [this._dest0.y, this._dest1.y, this._dest2.y];
      const row1 = this.solve(by);
      if (row1 === null) return false;
      this._m10 = row1[0];
      this._m11 = row1[1];
      this._m12 = row1[2];
      return true;
    }

    getTransformation() {
      const isSolvable = this.compute();
      if (isSolvable) return new AffineTransformation(this._m00, this._m01, this._m02, this._m10, this._m11, this._m12);
      return null;
    }

  }

  class AffineTransformationFactory {
    static createFromBaseLines(src0, src1, dest0, dest1) {
      const rotPt = new Coordinate(src0.x + dest1.x - dest0.x, src0.y + dest1.y - dest0.y);
      const ang = Angle.angleBetweenOriented(src1, src0, rotPt);
      const srcDist = src1.distance(src0);
      const destDist = dest1.distance(dest0);
      if (srcDist === 0.0) return new AffineTransformation();
      const scale = destDist / srcDist;
      const trans = AffineTransformation.translationInstance(-src0.x, -src0.y);
      trans.rotate(ang);
      trans.scale(scale, scale);
      trans.translate(dest0.x, dest0.y);
      return trans;
    }

    static createFromControlVectors() {
      if (arguments.length === 2) {
        if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
          const src0 = arguments[0],
                dest0 = arguments[1];
          const dx = dest0.x - src0.x;
          const dy = dest0.y - src0.y;
          return AffineTransformation.translationInstance(dx, dy);
        } else if (arguments[0] instanceof Array && arguments[1] instanceof Array) {
          const src = arguments[0],
                dest = arguments[1];
          if (src.length !== dest.length) throw new IllegalArgumentException('Src and Dest arrays are not the same length');
          if (src.length <= 0) throw new IllegalArgumentException('Too few control points');
          if (src.length > 3) throw new IllegalArgumentException('Too many control points');
          if (src.length === 1) return AffineTransformationFactory.createFromControlVectors(src[0], dest[0]);
          if (src.length === 2) return AffineTransformationFactory.createFromControlVectors(src[0], src[1], dest[0], dest[1]);
          return AffineTransformationFactory.createFromControlVectors(src[0], src[1], src[2], dest[0], dest[1], dest[2]);
        }
      } else if (arguments.length === 4) {
        const src0 = arguments[0],
              src1 = arguments[1],
              dest0 = arguments[2],
              dest1 = arguments[3];
        const rotPt = new Coordinate(dest1.x - dest0.x, dest1.y - dest0.y);
        const ang = Angle.angleBetweenOriented(src1, src0, rotPt);
        const srcDist = src1.distance(src0);
        const destDist = dest1.distance(dest0);
        if (srcDist === 0.0) return null;
        const scale = destDist / srcDist;
        const trans = AffineTransformation.translationInstance(-src0.x, -src0.y);
        trans.rotate(ang);
        trans.scale(scale, scale);
        trans.translate(dest0.x, dest0.y);
        return trans;
      } else if (arguments.length === 6) {
        const src0 = arguments[0],
              src1 = arguments[1],
              src2 = arguments[2],
              dest0 = arguments[3],
              dest1 = arguments[4],
              dest2 = arguments[5];
        const builder = new AffineTransformationBuilder(src0, src1, src2, dest0, dest1, dest2);
        return builder.getTransformation();
      }
    }

  }

  class ComponentCoordinateExtracter {
    constructor() {
      ComponentCoordinateExtracter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._coords = null;
      const coords = arguments[0];
      this._coords = coords;
    }

    static getCoordinates(geom) {
      const coords = new ArrayList();
      geom.apply(new ComponentCoordinateExtracter(coords));
      return coords;
    }

    filter(geom) {
      if (geom instanceof LineString || geom instanceof Point) this._coords.add(geom.getCoordinate());
    }

    get interfaces_() {
      return [GeometryComponentFilter];
    }

  }

  class GeometryCollectionMapper {
    constructor() {
      GeometryCollectionMapper.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._mapOp = null;
      const mapOp = arguments[0];
      this._mapOp = mapOp;
    }

    static map(gc, op) {
      const mapper = new GeometryCollectionMapper(op);
      return mapper.map(gc);
    }

    map(gc) {
      const mapped = new ArrayList();

      for (let i = 0; i < gc.getNumGeometries(); i++) {
        const g = this._mapOp.map(gc.getGeometryN(i));

        if (!g.isEmpty()) mapped.add(g);
      }

      return gc.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(mapped));
    }

  }

  class GeometryCombiner {
    constructor() {
      GeometryCombiner.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geomFactory = null;
      this._skipEmpty = false;
      this._inputGeoms = null;
      const geoms = arguments[0];
      this._geomFactory = GeometryCombiner.extractFactory(geoms);
      this._inputGeoms = geoms;
    }

    static combine() {
      if (arguments.length === 1) {
        const geoms = arguments[0];
        const combiner = new GeometryCombiner(geoms);
        return combiner.combine();
      } else if (arguments.length === 2) {
        const g0 = arguments[0],
              g1 = arguments[1];
        const combiner = new GeometryCombiner(GeometryCombiner.createList(g0, g1));
        return combiner.combine();
      } else if (arguments.length === 3) {
        const g0 = arguments[0],
              g1 = arguments[1],
              g2 = arguments[2];
        const combiner = new GeometryCombiner(GeometryCombiner.createList(g0, g1, g2));
        return combiner.combine();
      }
    }

    static extractFactory(geoms) {
      if (geoms.isEmpty()) return null;
      return geoms.iterator().next().getFactory();
    }

    static createList() {
      if (arguments.length === 2) {
        const obj0 = arguments[0],
              obj1 = arguments[1];
        const list = new ArrayList();
        list.add(obj0);
        list.add(obj1);
        return list;
      } else if (arguments.length === 3) {
        const obj0 = arguments[0],
              obj1 = arguments[1],
              obj2 = arguments[2];
        const list = new ArrayList();
        list.add(obj0);
        list.add(obj1);
        list.add(obj2);
        return list;
      }
    }

    extractElements(geom, elems) {
      if (geom === null) return null;

      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const elemGeom = geom.getGeometryN(i);
        if (this._skipEmpty && elemGeom.isEmpty()) continue;
        elems.add(elemGeom);
      }
    }

    combine() {
      const elems = new ArrayList();

      for (let i = this._inputGeoms.iterator(); i.hasNext();) {
        const g = i.next();
        this.extractElements(g, elems);
      }

      if (elems.size() === 0) {
        if (this._geomFactory !== null) return this._geomFactory.createGeometryCollection();
        return null;
      }

      return this._geomFactory.buildGeometry(elems);
    }

  }

  class GeometryEditor {
    constructor() {
      GeometryEditor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._factory = null;
      this._isUserDataCopied = false;

      if (arguments.length === 0) ; else if (arguments.length === 1) {
        const factory = arguments[0];
        this._factory = factory;
      }
    }

    setCopyUserData(isUserDataCopied) {
      this._isUserDataCopied = isUserDataCopied;
    }

    edit(geometry, operation) {
      if (geometry === null) return null;
      const result = this.editInternal(geometry, operation);
      if (this._isUserDataCopied) result.setUserData(geometry.getUserData());
      return result;
    }

    editInternal(geometry, operation) {
      if (this._factory === null) this._factory = geometry.getFactory();
      if (geometry instanceof GeometryCollection) return this.editGeometryCollection(geometry, operation);
      if (geometry instanceof Polygon) return this.editPolygon(geometry, operation);
      if (geometry instanceof Point) return operation.edit(geometry, this._factory);
      if (geometry instanceof LineString) return operation.edit(geometry, this._factory);
      Assert.shouldNeverReachHere('Unsupported Geometry type: ' + geometry.getGeometryType());
      return null;
    }

    editGeometryCollection(collection, operation) {
      const collectionForType = operation.edit(collection, this._factory);
      const geometries = new ArrayList();

      for (let i = 0; i < collectionForType.getNumGeometries(); i++) {
        const geometry = this.edit(collectionForType.getGeometryN(i), operation);
        if (geometry === null || geometry.isEmpty()) continue;
        geometries.add(geometry);
      }

      if (collectionForType.getGeometryType() === Geometry.TYPENAME_MULTIPOINT) return this._factory.createMultiPoint(geometries.toArray([]));
      if (collectionForType.getGeometryType() === Geometry.TYPENAME_MULTILINESTRING) return this._factory.createMultiLineString(geometries.toArray([]));
      if (collectionForType.getGeometryType() === Geometry.TYPENAME_MULTIPOLYGON) return this._factory.createMultiPolygon(geometries.toArray([]));
      return this._factory.createGeometryCollection(geometries.toArray([]));
    }

    editPolygon(polygon, operation) {
      let newPolygon = operation.edit(polygon, this._factory);
      if (newPolygon === null) newPolygon = this._factory.createPolygon();
      if (newPolygon.isEmpty()) return newPolygon;
      const shell = this.edit(newPolygon.getExteriorRing(), operation);
      if (shell === null || shell.isEmpty()) return this._factory.createPolygon();
      const holes = new ArrayList();

      for (let i = 0; i < newPolygon.getNumInteriorRing(); i++) {
        const hole = this.edit(newPolygon.getInteriorRingN(i), operation);
        if (hole === null || hole.isEmpty()) continue;
        holes.add(hole);
      }

      return this._factory.createPolygon(shell, holes.toArray([]));
    }

  }

  function GeometryEditorOperation() {}

  GeometryEditor.GeometryEditorOperation = GeometryEditorOperation;

  class NoOpGeometryOperation {
    edit(geometry, factory) {
      return geometry;
    }

    get interfaces_() {
      return [GeometryEditorOperation];
    }

  }

  class CoordinateOperation {
    edit(geometry, factory) {
      const coordinates = this.edit(geometry.getCoordinates(), geometry);
      if (geometry instanceof LinearRing) if (coordinates === null) return factory.createLinearRing();else return factory.createLinearRing(coordinates);
      if (geometry instanceof LineString) if (coordinates === null) return factory.createLineString();else return factory.createLineString(coordinates);
      if (geometry instanceof Point) if (coordinates === null || coordinates.length === 0) return factory.createPoint();else return factory.createPoint(coordinates[0]);
      return geometry;
    }

    get interfaces_() {
      return [GeometryEditorOperation];
    }

  }

  class CoordinateSequenceOperation {
    edit(geometry, factory) {
      if (geometry instanceof LinearRing) return factory.createLinearRing(this.edit(geometry.getCoordinateSequence(), geometry));
      if (geometry instanceof LineString) return factory.createLineString(this.edit(geometry.getCoordinateSequence(), geometry));
      if (geometry instanceof Point) return factory.createPoint(this.edit(geometry.getCoordinateSequence(), geometry));
      return geometry;
    }

    get interfaces_() {
      return [GeometryEditorOperation];
    }

  }

  GeometryEditor.NoOpGeometryOperation = NoOpGeometryOperation;
  GeometryEditor.CoordinateOperation = CoordinateOperation;
  GeometryEditor.CoordinateSequenceOperation = CoordinateSequenceOperation;

  class GeometryExtracter {
    constructor() {
      GeometryExtracter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geometryType = null;
      this._comps = null;
      const geometryType = arguments[0],
            comps = arguments[1];
      this._geometryType = geometryType;
      this._comps = comps;
    }

    static isOfType(geom, geometryType) {
      if (geom.getGeometryType() === geometryType) return true;
      if (geometryType === Geometry.TYPENAME_LINESTRING && geom.getGeometryType() === Geometry.TYPENAME_LINEARRING) return true;
      return false;
    }

    static extract() {
      if (arguments.length === 2) {
        const geom = arguments[0],
              geometryType = arguments[1];
        return GeometryExtracter.extract(geom, geometryType, new ArrayList());
      } else if (arguments.length === 3) {
        const geom = arguments[0],
              geometryType = arguments[1],
              list = arguments[2];
        if (geom.getGeometryType() === geometryType) list.add(geom);else if (geom instanceof GeometryCollection) geom.apply(new GeometryExtracter(geometryType, list));
        return list;
      }
    }

    filter(geom) {
      if (this._geometryType === null || GeometryExtracter.isOfType(geom, this._geometryType)) this._comps.add(geom);
    }

    get interfaces_() {
      return [GeometryFilter];
    }

  }

  class GeometryMapper {
    static map() {
      if (arguments[0] instanceof Geometry && hasInterface(arguments[1], MapOp$1)) {
        const geom = arguments[0],
              op = arguments[1];
        const mapped = new ArrayList();

        for (let i = 0; i < geom.getNumGeometries(); i++) {
          const g = op.map(geom.getGeometryN(i));
          if (g !== null) mapped.add(g);
        }

        return geom.getFactory().buildGeometry(mapped);
      } else if (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], MapOp$1)) {
        const geoms = arguments[0],
              op = arguments[1];
        const mapped = new ArrayList();

        for (let i = geoms.iterator(); i.hasNext();) {
          const g = i.next();
          const gr = op.map(g);
          if (gr !== null) mapped.add(gr);
        }

        return mapped;
      }
    }

  }

  function MapOp$1() {}

  GeometryMapper.MapOp = MapOp$1;

  class GeometryTransformer {
    constructor() {
      GeometryTransformer.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputGeom = null;
      this._factory = null;
      this._pruneEmptyGeometry = true;
      this._preserveGeometryCollectionType = true;
      this._preserveCollections = false;
      this._preserveType = false;
    }

    transformPoint(geom, parent) {
      return this._factory.createPoint(this.transformCoordinates(geom.getCoordinateSequence(), geom));
    }

    transformPolygon(geom, parent) {
      let isAllValidLinearRings = true;
      const shell = this.transformLinearRing(geom.getExteriorRing(), geom);
      if (shell === null || !(shell instanceof LinearRing) || shell.isEmpty()) isAllValidLinearRings = false;
      const holes = new ArrayList();

      for (let i = 0; i < geom.getNumInteriorRing(); i++) {
        const hole = this.transformLinearRing(geom.getInteriorRingN(i), geom);
        if (hole === null || hole.isEmpty()) continue;
        if (!(hole instanceof LinearRing)) isAllValidLinearRings = false;
        holes.add(hole);
      }

      if (isAllValidLinearRings) {
        return this._factory.createPolygon(shell, holes.toArray([]));
      } else {
        const components = new ArrayList();
        if (shell !== null) components.add(shell);
        components.addAll(holes);
        return this._factory.buildGeometry(components);
      }
    }

    createCoordinateSequence(coords) {
      return this._factory.getCoordinateSequenceFactory().create(coords);
    }

    getInputGeometry() {
      return this._inputGeom;
    }

    transformMultiLineString(geom, parent) {
      const transGeomList = new ArrayList();

      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const transformGeom = this.transformLineString(geom.getGeometryN(i), geom);
        if (transformGeom === null) continue;
        if (transformGeom.isEmpty()) continue;
        transGeomList.add(transformGeom);
      }

      return this._factory.buildGeometry(transGeomList);
    }

    transformCoordinates(coords, parent) {
      return this.copy(coords);
    }

    transformLineString(geom, parent) {
      return this._factory.createLineString(this.transformCoordinates(geom.getCoordinateSequence(), geom));
    }

    transformMultiPoint(geom, parent) {
      const transGeomList = new ArrayList();

      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const transformGeom = this.transformPoint(geom.getGeometryN(i), geom);
        if (transformGeom === null) continue;
        if (transformGeom.isEmpty()) continue;
        transGeomList.add(transformGeom);
      }

      return this._factory.buildGeometry(transGeomList);
    }

    transformMultiPolygon(geom, parent) {
      const transGeomList = new ArrayList();

      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const transformGeom = this.transformPolygon(geom.getGeometryN(i), geom);
        if (transformGeom === null) continue;
        if (transformGeom.isEmpty()) continue;
        transGeomList.add(transformGeom);
      }

      return this._factory.buildGeometry(transGeomList);
    }

    copy(seq) {
      return seq.copy();
    }

    transformGeometryCollection(geom, parent) {
      const transGeomList = new ArrayList();

      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const transformGeom = this.transform(geom.getGeometryN(i));
        if (transformGeom === null) continue;
        if (this._pruneEmptyGeometry && transformGeom.isEmpty()) continue;
        transGeomList.add(transformGeom);
      }

      if (this._preserveGeometryCollectionType) return this._factory.createGeometryCollection(GeometryFactory.toGeometryArray(transGeomList));
      return this._factory.buildGeometry(transGeomList);
    }

    transform(inputGeom) {
      this._inputGeom = inputGeom;
      this._factory = inputGeom.getFactory();
      if (inputGeom instanceof Point) return this.transformPoint(inputGeom, null);
      if (inputGeom instanceof MultiPoint) return this.transformMultiPoint(inputGeom, null);
      if (inputGeom instanceof LinearRing) return this.transformLinearRing(inputGeom, null);
      if (inputGeom instanceof LineString) return this.transformLineString(inputGeom, null);
      if (inputGeom instanceof MultiLineString) return this.transformMultiLineString(inputGeom, null);
      if (inputGeom instanceof Polygon) return this.transformPolygon(inputGeom, null);
      if (inputGeom instanceof MultiPolygon) return this.transformMultiPolygon(inputGeom, null);
      if (inputGeom instanceof GeometryCollection) return this.transformGeometryCollection(inputGeom, null);
      throw new IllegalArgumentException('Unknown Geometry subtype: ' + inputGeom.getGeometryType());
    }

    transformLinearRing(geom, parent) {
      const seq = this.transformCoordinates(geom.getCoordinateSequence(), geom);
      if (seq === null) return this._factory.createLinearRing(null);
      const seqSize = seq.size();
      if (seqSize > 0 && seqSize < 4 && !this._preserveType) return this._factory.createLineString(seq);
      return this._factory.createLinearRing(seq);
    }

  }

  class LineStringExtracter {
    constructor() {
      LineStringExtracter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._comps = null;
      const comps = arguments[0];
      this._comps = comps;
    }

    static getGeometry(geom) {
      return geom.getFactory().buildGeometry(LineStringExtracter.getLines(geom));
    }

    static getLines() {
      if (arguments.length === 1) {
        const geom = arguments[0];
        return LineStringExtracter.getLines(geom, new ArrayList());
      } else if (arguments.length === 2) {
        const geom = arguments[0],
              lines = arguments[1];
        if (geom instanceof LineString) lines.add(geom);else if (geom instanceof GeometryCollection) geom.apply(new LineStringExtracter(lines));
        return lines;
      }
    }

    filter(geom) {
      if (geom instanceof LineString) this._comps.add(geom);
    }

    get interfaces_() {
      return [GeometryFilter];
    }

  }

  class LinearComponentExtracter {
    constructor() {
      LinearComponentExtracter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._lines = null;
      this._isForcedToLineString = false;

      if (arguments.length === 1) {
        const lines = arguments[0];
        this._lines = lines;
      } else if (arguments.length === 2) {
        const lines = arguments[0],
              isForcedToLineString = arguments[1];
        this._lines = lines;
        this._isForcedToLineString = isForcedToLineString;
      }
    }

    static getGeometry() {
      if (arguments.length === 1) {
        const geom = arguments[0];
        return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom));
      } else if (arguments.length === 2) {
        const geom = arguments[0],
              forceToLineString = arguments[1];
        return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom, forceToLineString));
      }
    }

    static getLines() {
      if (arguments.length === 1) {
        const geom = arguments[0];
        return LinearComponentExtracter.getLines(geom, false);
      } else if (arguments.length === 2) {
        if (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], Collection)) {
          const geoms = arguments[0],
                lines = arguments[1];

          for (let i = geoms.iterator(); i.hasNext();) {
            const g = i.next();
            LinearComponentExtracter.getLines(g, lines);
          }

          return lines;
        } else if (arguments[0] instanceof Geometry && typeof arguments[1] === 'boolean') {
          const geom = arguments[0],
                forceToLineString = arguments[1];
          const lines = new ArrayList();
          geom.apply(new LinearComponentExtracter(lines, forceToLineString));
          return lines;
        } else if (arguments[0] instanceof Geometry && hasInterface(arguments[1], Collection)) {
          const geom = arguments[0],
                lines = arguments[1];
          if (geom instanceof LineString) lines.add(geom);else geom.apply(new LinearComponentExtracter(lines));
          return lines;
        }
      } else if (arguments.length === 3) {
        if (typeof arguments[2] === 'boolean' && hasInterface(arguments[0], Collection) && hasInterface(arguments[1], Collection)) {
          const geoms = arguments[0],
                lines = arguments[1],
                forceToLineString = arguments[2];

          for (let i = geoms.iterator(); i.hasNext();) {
            const g = i.next();
            LinearComponentExtracter.getLines(g, lines, forceToLineString);
          }

          return lines;
        } else if (typeof arguments[2] === 'boolean' && arguments[0] instanceof Geometry && hasInterface(arguments[1], Collection)) {
          const geom = arguments[0],
                lines = arguments[1],
                forceToLineString = arguments[2];
          geom.apply(new LinearComponentExtracter(lines, forceToLineString));
          return lines;
        }
      }
    }

    filter(geom) {
      if (this._isForcedToLineString && geom instanceof LinearRing) {
        const line = geom.getFactory().createLineString(geom.getCoordinateSequence());

        this._lines.add(line);

        return null;
      }

      if (geom instanceof LineString) this._lines.add(geom);
    }

    setForceToLineString(isForcedToLineString) {
      this._isForcedToLineString = isForcedToLineString;
    }

    get interfaces_() {
      return [GeometryComponentFilter];
    }

  }

  const Collections = {
    reverseOrder: function () {
      return {
        compare(a, b) {
          return b.compareTo(a);
        }

      };
    },
    min: function (l) {
      Collections.sort(l);
      return l.get(0);
    },
    sort: function (l, c) {
      const a = l.toArray();
      if (c) Arrays.sort(a, c);else Arrays.sort(a);
      const i = l.iterator();

      for (let pos = 0, alen = a.length; pos < alen; pos++) {
        i.next();
        i.set(a[pos]);
      }
    },
    singletonList: function (o) {
      const arrayList = new ArrayList();
      arrayList.add(o);
      return arrayList;
    }
  };

  class PointExtracter {
    constructor() {
      PointExtracter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pts = null;
      const pts = arguments[0];
      this._pts = pts;
    }

    static getPoints() {
      if (arguments.length === 1) {
        const geom = arguments[0];
        if (geom instanceof Point) return Collections.singletonList(geom);
        return PointExtracter.getPoints(geom, new ArrayList());
      } else if (arguments.length === 2) {
        const geom = arguments[0],
              list = arguments[1];
        if (geom instanceof Point) list.add(geom);else if (geom instanceof GeometryCollection) geom.apply(new PointExtracter(list));
        return list;
      }
    }

    filter(geom) {
      if (geom instanceof Point) this._pts.add(geom);
    }

    get interfaces_() {
      return [GeometryFilter];
    }

  }

  class PolygonExtracter {
    constructor() {
      PolygonExtracter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._comps = null;
      const comps = arguments[0];
      this._comps = comps;
    }

    static getPolygons() {
      if (arguments.length === 1) {
        const geom = arguments[0];
        return PolygonExtracter.getPolygons(geom, new ArrayList());
      } else if (arguments.length === 2) {
        const geom = arguments[0],
              list = arguments[1];
        if (geom instanceof Polygon) list.add(geom);else if (geom instanceof GeometryCollection) geom.apply(new PolygonExtracter(list));
        return list;
      }
    }

    filter(geom) {
      if (geom instanceof Polygon) this._comps.add(geom);
    }

    get interfaces_() {
      return [GeometryFilter];
    }

  }

  class ShortCircuitedGeometryVisitor {
    constructor() {
      ShortCircuitedGeometryVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._isDone = false;
    }

    applyTo(geom) {
      for (let i = 0; i < geom.getNumGeometries() && !this._isDone; i++) {
        const element = geom.getGeometryN(i);

        if (!(element instanceof GeometryCollection)) {
          this.visit(element);

          if (this.isDone()) {
            this._isDone = true;
            return null;
          }
        } else {
          this.applyTo(element);
        }
      }
    }

  }

  class GeometricShapeFactory {
    constructor() {
      GeometricShapeFactory.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geomFact = null;
      this._precModel = null;
      this._dim = new Dimensions();
      this._nPts = 100;
      this._rotationAngle = 0.0;

      if (arguments.length === 0) {
        GeometricShapeFactory.constructor_.call(this, new GeometryFactory());
      } else if (arguments.length === 1) {
        const geomFact = arguments[0];
        this._geomFact = geomFact;
        this._precModel = geomFact.getPrecisionModel();
      }
    }

    createSupercircle(power) {
      const recipPow = 1.0 / power;
      const radius = this._dim.getMinSize() / 2;

      const centre = this._dim.getCentre();

      const r4 = Math.pow(radius, power);
      const y0 = radius;
      const xyInt = Math.pow(r4 / 2, recipPow);
      const nSegsInOct = Math.trunc(this._nPts / 8);
      const totPts = nSegsInOct * 8 + 1;
      const pts = new Array(totPts).fill(null);
      const xInc = xyInt / nSegsInOct;

      for (let i = 0; i <= nSegsInOct; i++) {
        let x = 0.0;
        let y = y0;

        if (i !== 0) {
          x = xInc * i;
          const x4 = Math.pow(x, power);
          y = Math.pow(r4 - x4, recipPow);
        }

        pts[i] = this.coordTrans(x, y, centre);
        pts[2 * nSegsInOct - i] = this.coordTrans(y, x, centre);
        pts[2 * nSegsInOct + i] = this.coordTrans(y, -x, centre);
        pts[4 * nSegsInOct - i] = this.coordTrans(x, -y, centre);
        pts[4 * nSegsInOct + i] = this.coordTrans(-x, -y, centre);
        pts[6 * nSegsInOct - i] = this.coordTrans(-y, -x, centre);
        pts[6 * nSegsInOct + i] = this.coordTrans(-y, x, centre);
        pts[8 * nSegsInOct - i] = this.coordTrans(-x, y, centre);
      }

      pts[pts.length - 1] = new Coordinate(pts[0]);

      const ring = this._geomFact.createLinearRing(pts);

      const poly = this._geomFact.createPolygon(ring);

      return this.rotate(poly);
    }

    setNumPoints(nPts) {
      this._nPts = nPts;
    }

    setBase(base) {
      this._dim.setBase(base);
    }

    setRotation(radians) {
      this._rotationAngle = radians;
    }

    setWidth(width) {
      this._dim.setWidth(width);
    }

    createEllipse() {
      const env = this._dim.getEnvelope();

      const xRadius = env.getWidth() / 2.0;
      const yRadius = env.getHeight() / 2.0;
      const centreX = env.getMinX() + xRadius;
      const centreY = env.getMinY() + yRadius;
      const pts = new Array(this._nPts + 1).fill(null);
      let iPt = 0;

      for (let i = 0; i < this._nPts; i++) {
        const ang = i * (2 * Math.PI / this._nPts);
        const x = xRadius * Math.cos(ang) + centreX;
        const y = yRadius * Math.sin(ang) + centreY;
        pts[iPt++] = this.coord(x, y);
      }

      pts[iPt] = new Coordinate(pts[0]);

      const ring = this._geomFact.createLinearRing(pts);

      const poly = this._geomFact.createPolygon(ring);

      return this.rotate(poly);
    }

    coordTrans(x, y, trans) {
      return this.coord(x + trans.x, y + trans.y);
    }

    createSquircle() {
      return this.createSupercircle(4);
    }

    setEnvelope(env) {
      this._dim.setEnvelope(env);
    }

    setCentre(centre) {
      this._dim.setCentre(centre);
    }

    createArc(startAng, angExtent) {
      const env = this._dim.getEnvelope();

      const xRadius = env.getWidth() / 2.0;
      const yRadius = env.getHeight() / 2.0;
      const centreX = env.getMinX() + xRadius;
      const centreY = env.getMinY() + yRadius;
      let angSize = angExtent;
      if (angSize <= 0.0 || angSize > 2 * Math.PI) angSize = 2 * Math.PI;
      const angInc = angSize / (this._nPts - 1);
      const pts = new Array(this._nPts).fill(null);
      let iPt = 0;

      for (let i = 0; i < this._nPts; i++) {
        const ang = startAng + i * angInc;
        const x = xRadius * Math.cos(ang) + centreX;
        const y = yRadius * Math.sin(ang) + centreY;
        pts[iPt++] = this.coord(x, y);
      }

      const line = this._geomFact.createLineString(pts);

      return this.rotate(line);
    }

    rotate(geom) {
      if (this._rotationAngle !== 0.0) {
        const trans = AffineTransformation.rotationInstance(this._rotationAngle, this._dim.getCentre().x, this._dim.getCentre().y);
        geom.apply(trans);
      }

      return geom;
    }

    coord(x, y) {
      const pt = new Coordinate(x, y);

      this._precModel.makePrecise(pt);

      return pt;
    }

    createArcPolygon(startAng, angExtent) {
      const env = this._dim.getEnvelope();

      const xRadius = env.getWidth() / 2.0;
      const yRadius = env.getHeight() / 2.0;
      const centreX = env.getMinX() + xRadius;
      const centreY = env.getMinY() + yRadius;
      let angSize = angExtent;
      if (angSize <= 0.0 || angSize > 2 * Math.PI) angSize = 2 * Math.PI;
      const angInc = angSize / (this._nPts - 1);
      const pts = new Array(this._nPts + 2).fill(null);
      let iPt = 0;
      pts[iPt++] = this.coord(centreX, centreY);

      for (let i = 0; i < this._nPts; i++) {
        const ang = startAng + angInc * i;
        const x = xRadius * Math.cos(ang) + centreX;
        const y = yRadius * Math.sin(ang) + centreY;
        pts[iPt++] = this.coord(x, y);
      }

      pts[iPt++] = this.coord(centreX, centreY);

      const ring = this._geomFact.createLinearRing(pts);

      const poly = this._geomFact.createPolygon(ring);

      return this.rotate(poly);
    }

    createRectangle() {
      let i = null;
      let ipt = 0;
      let nSide = Math.trunc(this._nPts / 4);
      if (nSide < 1) nSide = 1;
      const XsegLen = this._dim.getEnvelope().getWidth() / nSide;
      const YsegLen = this._dim.getEnvelope().getHeight() / nSide;
      const pts = new Array(4 * nSide + 1).fill(null);

      const env = this._dim.getEnvelope();

      for (i = 0; i < nSide; i++) {
        const x = env.getMinX() + i * XsegLen;
        const y = env.getMinY();
        pts[ipt++] = this.coord(x, y);
      }

      for (i = 0; i < nSide; i++) {
        const x = env.getMaxX();
        const y = env.getMinY() + i * YsegLen;
        pts[ipt++] = this.coord(x, y);
      }

      for (i = 0; i < nSide; i++) {
        const x = env.getMaxX() - i * XsegLen;
        const y = env.getMaxY();
        pts[ipt++] = this.coord(x, y);
      }

      for (i = 0; i < nSide; i++) {
        const x = env.getMinX();
        const y = env.getMaxY() - i * YsegLen;
        pts[ipt++] = this.coord(x, y);
      }

      pts[ipt++] = new Coordinate(pts[0]);

      const ring = this._geomFact.createLinearRing(pts);

      const poly = this._geomFact.createPolygon(ring);

      return this.rotate(poly);
    }

    createCircle() {
      return this.createEllipse();
    }

    setHeight(height) {
      this._dim.setHeight(height);
    }

    setSize(size) {
      this._dim.setSize(size);
    }

  }

  class Dimensions {
    constructor() {
      Dimensions.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.base = null;
      this.centre = null;
      this.width = null;
      this.height = null;
    }

    setBase(base) {
      this.base = base;
    }

    setWidth(width) {
      this.width = width;
    }

    getBase() {
      return this.base;
    }

    getWidth() {
      return this.width;
    }

    setEnvelope(env) {
      this.width = env.getWidth();
      this.height = env.getHeight();
      this.base = new Coordinate(env.getMinX(), env.getMinY());
      this.centre = new Coordinate(env.centre());
    }

    setCentre(centre) {
      this.centre = centre;
    }

    getMinSize() {
      return Math.min(this.width, this.height);
    }

    getEnvelope() {
      if (this.base !== null) return new Envelope(this.base.x, this.base.x + this.width, this.base.y, this.base.y + this.height);
      if (this.centre !== null) return new Envelope(this.centre.x - this.width / 2, this.centre.x + this.width / 2, this.centre.y - this.height / 2, this.centre.y + this.height / 2);
      return new Envelope(0, this.width, 0, this.height);
    }

    getCentre() {
      if (this.centre === null) this.centre = new Coordinate(this.base.x + this.width / 2, this.base.y + this.height / 2);
      return this.centre;
    }

    getHeight() {
      return this.height;
    }

    setHeight(height) {
      this.height = height;
    }

    setSize(size) {
      this.height = size;
      this.width = size;
    }

  }

  GeometricShapeFactory.Dimensions = Dimensions;

  class SineStarFactory extends GeometricShapeFactory {
    constructor() {
      super();
      SineStarFactory.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._numArms = 8;
      this._armLengthRatio = 0.5;

      if (arguments.length === 0) {
        GeometricShapeFactory.constructor_.call(this);
      } else if (arguments.length === 1) {
        const geomFact = arguments[0];
        GeometricShapeFactory.constructor_.call(this, geomFact);
      }
    }

    static create(origin, size, nPts, nArms, armLengthRatio) {
      const gsf = new SineStarFactory();
      gsf.setCentre(origin);
      gsf.setSize(size);
      gsf.setNumPoints(nPts);
      gsf.setArmLengthRatio(armLengthRatio);
      gsf.setNumArms(nArms);
      const poly = gsf.createSineStar();
      return poly;
    }

    setNumArms(numArms) {
      this._numArms = numArms;
    }

    setArmLengthRatio(armLengthRatio) {
      this._armLengthRatio = armLengthRatio;
    }

    createSineStar() {
      const env = this._dim.getEnvelope();

      const radius = env.getWidth() / 2.0;
      let armRatio = this._armLengthRatio;
      if (armRatio < 0.0) armRatio = 0.0;
      if (armRatio > 1.0) armRatio = 1.0;
      const armMaxLen = armRatio * radius;
      const insideRadius = (1 - armRatio) * radius;
      const centreX = env.getMinX() + radius;
      const centreY = env.getMinY() + radius;
      const pts = new Array(this._nPts + 1).fill(null);
      let iPt = 0;

      for (let i = 0; i < this._nPts; i++) {
        const ptArcFrac = i / this._nPts * this._numArms;
        const armAngFrac = ptArcFrac - Math.floor(ptArcFrac);
        const armAng = 2 * Math.PI * armAngFrac;
        const armLenFrac = (Math.cos(armAng) + 1.0) / 2.0;
        const curveRadius = insideRadius + armMaxLen * armLenFrac;
        const ang = i * (2 * Math.PI / this._nPts);
        const x = curveRadius * Math.cos(ang) + centreX;
        const y = curveRadius * Math.sin(ang) + centreY;
        pts[iPt++] = this.coord(x, y);
      }

      pts[iPt] = new Coordinate(pts[0]);

      const ring = this._geomFact.createLinearRing(pts);

      const poly = this._geomFact.createPolygon(ring);

      return poly;
    }

  }

  var util$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AffineTransformation: AffineTransformation,
    AffineTransformationBuilder: AffineTransformationBuilder,
    AffineTransformationFactory: AffineTransformationFactory,
    ComponentCoordinateExtracter: ComponentCoordinateExtracter,
    GeometryCollectionMapper: GeometryCollectionMapper,
    GeometryCombiner: GeometryCombiner,
    GeometryEditor: GeometryEditor,
    GeometryExtracter: GeometryExtracter,
    GeometryMapper: GeometryMapper,
    GeometryTransformer: GeometryTransformer,
    LineStringExtracter: LineStringExtracter,
    LinearComponentExtracter: LinearComponentExtracter,
    PointExtracter: PointExtracter,
    PolygonExtracter: PolygonExtracter,
    ShortCircuitedGeometryVisitor: ShortCircuitedGeometryVisitor,
    SineStarFactory: SineStarFactory
  });

  var geom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Coordinate: Coordinate,
    CoordinateXY: CoordinateXY,
    CoordinateXYM: CoordinateXYM,
    CoordinateXYZM: CoordinateXYZM,
    CoordinateList: CoordinateList,
    CoordinateSequenceFilter: CoordinateSequenceFilter,
    Envelope: Envelope,
    LineSegment: LineSegment,
    GeometryFactory: GeometryFactory,
    Geometry: Geometry,
    Point: Point,
    LineString: LineString,
    LinearRing: LinearRing,
    Polygon: Polygon,
    GeometryCollection: GeometryCollection,
    MultiPoint: MultiPoint,
    MultiLineString: MultiLineString,
    MultiPolygon: MultiPolygon,
    Dimension: Dimension,
    IntersectionMatrix: IntersectionMatrix,
    PrecisionModel: PrecisionModel,
    Location: Location,
    Triangle: Triangle,
    util: util$1
  });

  class PointPairDistance {
    constructor() {
      PointPairDistance.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pt = [new Coordinate(), new Coordinate()];
      this._distance = Double.NaN;
      this._isNull = true;
    }

    getCoordinates() {
      return this._pt;
    }

    getCoordinate(i) {
      return this._pt[i];
    }

    setMinimum() {
      if (arguments.length === 1) {
        const ptDist = arguments[0];
        this.setMinimum(ptDist._pt[0], ptDist._pt[1]);
      } else if (arguments.length === 2) {
        const p0 = arguments[0],
              p1 = arguments[1];

        if (this._isNull) {
          this.initialize(p0, p1);
          return null;
        }

        const dist = p0.distance(p1);
        if (dist < this._distance) this.initialize(p0, p1, dist);
      }
    }

    initialize() {
      if (arguments.length === 0) {
        this._isNull = true;
      } else if (arguments.length === 2) {
        const p0 = arguments[0],
              p1 = arguments[1];

        this._pt[0].setCoordinate(p0);

        this._pt[1].setCoordinate(p1);

        this._distance = p0.distance(p1);
        this._isNull = false;
      } else if (arguments.length === 3) {
        const p0 = arguments[0],
              p1 = arguments[1],
              distance = arguments[2];

        this._pt[0].setCoordinate(p0);

        this._pt[1].setCoordinate(p1);

        this._distance = distance;
        this._isNull = false;
      }
    }

    toString() {
      return WKTWriter.toLineString(this._pt[0], this._pt[1]);
    }

    getDistance() {
      return this._distance;
    }

    setMaximum() {
      if (arguments.length === 1) {
        const ptDist = arguments[0];
        this.setMaximum(ptDist._pt[0], ptDist._pt[1]);
      } else if (arguments.length === 2) {
        const p0 = arguments[0],
              p1 = arguments[1];

        if (this._isNull) {
          this.initialize(p0, p1);
          return null;
        }

        const dist = p0.distance(p1);
        if (dist > this._distance) this.initialize(p0, p1, dist);
      }
    }

  }

  class DistanceToPoint {
    static computeDistance() {
      if (arguments[2] instanceof PointPairDistance && arguments[0] instanceof LineString && arguments[1] instanceof Coordinate) {
        const line = arguments[0],
              pt = arguments[1],
              ptDist = arguments[2];
        const tempSegment = new LineSegment();
        const coords = line.getCoordinates();

        for (let i = 0; i < coords.length - 1; i++) {
          tempSegment.setCoordinates(coords[i], coords[i + 1]);
          const closestPt = tempSegment.closestPoint(pt);
          ptDist.setMinimum(closestPt, pt);
        }
      } else if (arguments[2] instanceof PointPairDistance && arguments[0] instanceof Polygon && arguments[1] instanceof Coordinate) {
        const poly = arguments[0],
              pt = arguments[1],
              ptDist = arguments[2];
        DistanceToPoint.computeDistance(poly.getExteriorRing(), pt, ptDist);

        for (let i = 0; i < poly.getNumInteriorRing(); i++) DistanceToPoint.computeDistance(poly.getInteriorRingN(i), pt, ptDist);
      } else if (arguments[2] instanceof PointPairDistance && arguments[0] instanceof Geometry && arguments[1] instanceof Coordinate) {
        const geom = arguments[0],
              pt = arguments[1],
              ptDist = arguments[2];

        if (geom instanceof LineString) {
          DistanceToPoint.computeDistance(geom, pt, ptDist);
        } else if (geom instanceof Polygon) {
          DistanceToPoint.computeDistance(geom, pt, ptDist);
        } else if (geom instanceof GeometryCollection) {
          const gc = geom;

          for (let i = 0; i < gc.getNumGeometries(); i++) {
            const g = gc.getGeometryN(i);
            DistanceToPoint.computeDistance(g, pt, ptDist);
          }
        } else {
          ptDist.setMinimum(geom.getCoordinate(), pt);
        }
      } else if (arguments[2] instanceof PointPairDistance && arguments[0] instanceof LineSegment && arguments[1] instanceof Coordinate) {
        const segment = arguments[0],
              pt = arguments[1],
              ptDist = arguments[2];
        const closestPt = segment.closestPoint(pt);
        ptDist.setMinimum(closestPt, pt);
      }
    }

  }

  class DiscreteHausdorffDistance {
    constructor() {
      DiscreteHausdorffDistance.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._g0 = null;
      this._g1 = null;
      this._ptDist = new PointPairDistance();
      this._densifyFrac = 0.0;
      const g0 = arguments[0],
            g1 = arguments[1];
      this._g0 = g0;
      this._g1 = g1;
    }

    static distance() {
      if (arguments.length === 2) {
        const g0 = arguments[0],
              g1 = arguments[1];
        const dist = new DiscreteHausdorffDistance(g0, g1);
        return dist.distance();
      } else if (arguments.length === 3) {
        const g0 = arguments[0],
              g1 = arguments[1],
              densifyFrac = arguments[2];
        const dist = new DiscreteHausdorffDistance(g0, g1);
        dist.setDensifyFraction(densifyFrac);
        return dist.distance();
      }
    }

    getCoordinates() {
      return this._ptDist.getCoordinates();
    }

    setDensifyFraction(densifyFrac) {
      if (densifyFrac > 1.0 || densifyFrac <= 0.0) throw new IllegalArgumentException('Fraction is not in range (0.0 - 1.0]');
      this._densifyFrac = densifyFrac;
    }

    compute(g0, g1) {
      this.computeOrientedDistance(g0, g1, this._ptDist);
      this.computeOrientedDistance(g1, g0, this._ptDist);
    }

    distance() {
      this.compute(this._g0, this._g1);
      return this._ptDist.getDistance();
    }

    computeOrientedDistance(discreteGeom, geom, ptDist) {
      const distFilter = new MaxPointDistanceFilter(geom);
      discreteGeom.apply(distFilter);
      ptDist.setMaximum(distFilter.getMaxPointDistance());

      if (this._densifyFrac > 0) {
        const fracFilter = new MaxDensifiedByFractionDistanceFilter(geom, this._densifyFrac);
        discreteGeom.apply(fracFilter);
        ptDist.setMaximum(fracFilter.getMaxPointDistance());
      }
    }

    orientedDistance() {
      this.computeOrientedDistance(this._g0, this._g1, this._ptDist);
      return this._ptDist.getDistance();
    }

  }

  class MaxPointDistanceFilter {
    constructor() {
      MaxPointDistanceFilter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._maxPtDist = new PointPairDistance();
      this._minPtDist = new PointPairDistance();
      this._euclideanDist = new DistanceToPoint();
      this._geom = null;
      const geom = arguments[0];
      this._geom = geom;
    }

    filter(pt) {
      this._minPtDist.initialize();

      DistanceToPoint.computeDistance(this._geom, pt, this._minPtDist);

      this._maxPtDist.setMaximum(this._minPtDist);
    }

    getMaxPointDistance() {
      return this._maxPtDist;
    }

    get interfaces_() {
      return [CoordinateFilter];
    }

  }

  class MaxDensifiedByFractionDistanceFilter {
    constructor() {
      MaxDensifiedByFractionDistanceFilter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._maxPtDist = new PointPairDistance();
      this._minPtDist = new PointPairDistance();
      this._geom = null;
      this._numSubSegs = 0;
      const geom = arguments[0],
            fraction = arguments[1];
      this._geom = geom;
      this._numSubSegs = Math.trunc(Math.round(1.0 / fraction));
    }

    filter(seq, index) {
      if (index === 0) return null;
      const p0 = seq.getCoordinate(index - 1);
      const p1 = seq.getCoordinate(index);
      const delx = (p1.x - p0.x) / this._numSubSegs;
      const dely = (p1.y - p0.y) / this._numSubSegs;

      for (let i = 0; i < this._numSubSegs; i++) {
        const x = p0.x + i * delx;
        const y = p0.y + i * dely;
        const pt = new Coordinate(x, y);

        this._minPtDist.initialize();

        DistanceToPoint.computeDistance(this._geom, pt, this._minPtDist);

        this._maxPtDist.setMaximum(this._minPtDist);
      }
    }

    isDone() {
      return false;
    }

    isGeometryChanged() {
      return false;
    }

    getMaxPointDistance() {
      return this._maxPtDist;
    }

    get interfaces_() {
      return [CoordinateSequenceFilter];
    }

  }

  DiscreteHausdorffDistance.MaxPointDistanceFilter = MaxPointDistanceFilter;
  DiscreteHausdorffDistance.MaxDensifiedByFractionDistanceFilter = MaxDensifiedByFractionDistanceFilter;

  var distance_module = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DiscreteHausdorffDistance: DiscreteHausdorffDistance,
    DistanceToPoint: DistanceToPoint,
    PointPairDistance: PointPairDistance
  });

  class ItemVisitor {
    visitItem(item) {}

  }

  class PointOnGeometryLocator {
    locate(p) {}

  }

  class IntervalRTreeNode {
    constructor() {
      IntervalRTreeNode.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._min = Double.POSITIVE_INFINITY;
      this._max = Double.NEGATIVE_INFINITY;
    }

    getMin() {
      return this._min;
    }

    intersects(queryMin, queryMax) {
      if (this._min > queryMax || this._max < queryMin) return false;
      return true;
    }

    getMax() {
      return this._max;
    }

    toString() {
      return WKTWriter.toLineString(new Coordinate(this._min, 0), new Coordinate(this._max, 0));
    }

  }

  class NodeComparator {
    compare(o1, o2) {
      const n1 = o1;
      const n2 = o2;
      const mid1 = (n1._min + n1._max) / 2;
      const mid2 = (n2._min + n2._max) / 2;
      if (mid1 < mid2) return -1;
      if (mid1 > mid2) return 1;
      return 0;
    }

    get interfaces_() {
      return [Comparator];
    }

  }

  IntervalRTreeNode.NodeComparator = NodeComparator;

  class IntervalRTreeLeafNode extends IntervalRTreeNode {
    constructor() {
      super();
      IntervalRTreeLeafNode.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._item = null;
      const min = arguments[0],
            max = arguments[1],
            item = arguments[2];
      this._min = min;
      this._max = max;
      this._item = item;
    }

    query(queryMin, queryMax, visitor) {
      if (!this.intersects(queryMin, queryMax)) return null;
      visitor.visitItem(this._item);
    }

  }

  class IntervalRTreeBranchNode extends IntervalRTreeNode {
    constructor() {
      super();
      IntervalRTreeBranchNode.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._node1 = null;
      this._node2 = null;
      const n1 = arguments[0],
            n2 = arguments[1];
      this._node1 = n1;
      this._node2 = n2;
      this.buildExtent(this._node1, this._node2);
    }

    buildExtent(n1, n2) {
      this._min = Math.min(n1._min, n2._min);
      this._max = Math.max(n1._max, n2._max);
    }

    query(queryMin, queryMax, visitor) {
      if (!this.intersects(queryMin, queryMax)) return null;
      if (this._node1 !== null) this._node1.query(queryMin, queryMax, visitor);
      if (this._node2 !== null) this._node2.query(queryMin, queryMax, visitor);
    }

  }

  class SortedPackedIntervalRTree {
    constructor() {
      SortedPackedIntervalRTree.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._leaves = new ArrayList();
      this._root = null;
      this._level = 0;
    }

    buildTree() {
      Collections.sort(this._leaves, new IntervalRTreeNode.NodeComparator());
      let src = this._leaves;
      let temp = null;
      let dest = new ArrayList();

      while (true) {
        this.buildLevel(src, dest);
        if (dest.size() === 1) return dest.get(0);
        temp = src;
        src = dest;
        dest = temp;
      }
    }

    insert(min, max, item) {
      if (this._root !== null) throw new IllegalStateException('Index cannot be added to once it has been queried');

      this._leaves.add(new IntervalRTreeLeafNode(min, max, item));
    }

    query(min, max, visitor) {
      this.init();
      if (this._root === null) return null;

      this._root.query(min, max, visitor);
    }

    buildRoot() {
      if (this._root !== null) return null;
      this._root = this.buildTree();
    }

    printNode(node) {
      System.out.println(WKTWriter.toLineString(new Coordinate(node._min, this._level), new Coordinate(node._max, this._level)));
    }

    init() {
      if (this._root !== null) return null;
      if (this._leaves.size() === 0) return null;
      this.buildRoot();
    }

    buildLevel(src, dest) {
      this._level++;
      dest.clear();

      for (let i = 0; i < src.size(); i += 2) {
        const n1 = src.get(i);
        const n2 = i + 1 < src.size() ? src.get(i) : null;

        if (n2 === null) {
          dest.add(n1);
        } else {
          const node = new IntervalRTreeBranchNode(src.get(i), src.get(i + 1));
          dest.add(node);
        }
      }
    }

  }

  class ArrayListVisitor {
    constructor() {
      ArrayListVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._items = new ArrayList();
    }

    visitItem(item) {
      this._items.add(item);
    }

    getItems() {
      return this._items;
    }

    get interfaces_() {
      return [ItemVisitor];
    }

  }

  class RayCrossingCounter {
    constructor() {
      RayCrossingCounter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._p = null;
      this._crossingCount = 0;
      this._isPointOnSegment = false;
      const p = arguments[0];
      this._p = p;
    }

    static locatePointInRing() {
      if (arguments[0] instanceof Coordinate && hasInterface(arguments[1], CoordinateSequence)) {
        const p = arguments[0],
              ring = arguments[1];
        const counter = new RayCrossingCounter(p);
        const p1 = new Coordinate();
        const p2 = new Coordinate();

        for (let i = 1; i < ring.size(); i++) {
          ring.getCoordinate(i, p1);
          ring.getCoordinate(i - 1, p2);
          counter.countSegment(p1, p2);
          if (counter.isOnSegment()) return counter.getLocation();
        }

        return counter.getLocation();
      } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Array) {
        const p = arguments[0],
              ring = arguments[1];
        const counter = new RayCrossingCounter(p);

        for (let i = 1; i < ring.length; i++) {
          const p1 = ring[i];
          const p2 = ring[i - 1];
          counter.countSegment(p1, p2);
          if (counter.isOnSegment()) return counter.getLocation();
        }

        return counter.getLocation();
      }
    }

    countSegment(p1, p2) {
      if (p1.x < this._p.x && p2.x < this._p.x) return null;

      if (this._p.x === p2.x && this._p.y === p2.y) {
        this._isPointOnSegment = true;
        return null;
      }

      if (p1.y === this._p.y && p2.y === this._p.y) {
        let minx = p1.x;
        let maxx = p2.x;

        if (minx > maxx) {
          minx = p2.x;
          maxx = p1.x;
        }

        if (this._p.x >= minx && this._p.x <= maxx) this._isPointOnSegment = true;
        return null;
      }

      if (p1.y > this._p.y && p2.y <= this._p.y || p2.y > this._p.y && p1.y <= this._p.y) {
        let orient = Orientation.index(p1, p2, this._p);

        if (orient === Orientation.COLLINEAR) {
          this._isPointOnSegment = true;
          return null;
        }

        if (p2.y < p1.y) orient = -orient;
        if (orient === Orientation.LEFT) this._crossingCount++;
      }
    }

    isPointInPolygon() {
      return this.getLocation() !== Location.EXTERIOR;
    }

    getLocation() {
      if (this._isPointOnSegment) return Location.BOUNDARY;
      if (this._crossingCount % 2 === 1) return Location.INTERIOR;
      return Location.EXTERIOR;
    }

    isOnSegment() {
      return this._isPointOnSegment;
    }

  }

  class IndexedPointInAreaLocator {
    constructor() {
      IndexedPointInAreaLocator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geom = null;
      this._index = null;
      const g = arguments[0];
      if (!(hasInterface(g, Polygonal) || g instanceof LinearRing)) throw new IllegalArgumentException('Argument must be Polygonal or LinearRing');
      this._geom = g;
    }

    locate(p) {
      if (this._index === null) {
        this._index = new IntervalIndexedGeometry(this._geom);
        this._geom = null;
      }

      const rcc = new RayCrossingCounter(p);
      const visitor = new SegmentVisitor(rcc);

      this._index.query(p.y, p.y, visitor);

      return rcc.getLocation();
    }

    get interfaces_() {
      return [PointOnGeometryLocator];
    }

  }

  class SegmentVisitor {
    constructor() {
      SegmentVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._counter = null;
      const counter = arguments[0];
      this._counter = counter;
    }

    visitItem(item) {
      const seg = item;

      this._counter.countSegment(seg.getCoordinate(0), seg.getCoordinate(1));
    }

    get interfaces_() {
      return [ItemVisitor];
    }

  }

  class IntervalIndexedGeometry {
    constructor() {
      IntervalIndexedGeometry.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._isEmpty = false;
      this._index = new SortedPackedIntervalRTree();
      const geom = arguments[0];
      if (geom.isEmpty()) this._isEmpty = true;else this.init(geom);
    }

    init(geom) {
      const lines = LinearComponentExtracter.getLines(geom);

      for (let i = lines.iterator(); i.hasNext();) {
        const line = i.next();
        const pts = line.getCoordinates();
        this.addLine(pts);
      }
    }

    addLine(pts) {
      for (let i = 1; i < pts.length; i++) {
        const seg = new LineSegment(pts[i - 1], pts[i]);
        const min = Math.min(seg.p0.y, seg.p1.y);
        const max = Math.max(seg.p0.y, seg.p1.y);

        this._index.insert(min, max, seg);
      }
    }

    query() {
      if (arguments.length === 2) {
        const min = arguments[0],
              max = arguments[1];
        if (this._isEmpty) return new ArrayList();
        const visitor = new ArrayListVisitor();

        this._index.query(min, max, visitor);

        return visitor.getItems();
      } else if (arguments.length === 3) {
        const min = arguments[0],
              max = arguments[1],
              visitor = arguments[2];
        if (this._isEmpty) return null;

        this._index.query(min, max, visitor);
      }
    }

  }

  IndexedPointInAreaLocator.SegmentVisitor = SegmentVisitor;
  IndexedPointInAreaLocator.IntervalIndexedGeometry = IntervalIndexedGeometry;

  class PointLocation {
    static isOnLine() {
      if (arguments[0] instanceof Coordinate && hasInterface(arguments[1], CoordinateSequence)) {
        const p = arguments[0],
              line = arguments[1];
        const lineIntersector = new RobustLineIntersector();
        const p0 = new Coordinate();
        const p1 = new Coordinate();
        const n = line.size();

        for (let i = 1; i < n; i++) {
          line.getCoordinate(i - 1, p0);
          line.getCoordinate(i, p1);
          lineIntersector.computeIntersection(p, p0, p1);
          if (lineIntersector.hasIntersection()) return true;
        }

        return false;
      } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Array) {
        const p = arguments[0],
              line = arguments[1];
        const lineIntersector = new RobustLineIntersector();

        for (let i = 1; i < line.length; i++) {
          const p0 = line[i - 1];
          const p1 = line[i];
          lineIntersector.computeIntersection(p, p0, p1);
          if (lineIntersector.hasIntersection()) return true;
        }

        return false;
      }
    }

    static locateInRing(p, ring) {
      return RayCrossingCounter.locatePointInRing(p, ring);
    }

    static isInRing(p, ring) {
      return PointLocation.locateInRing(p, ring) !== Location.EXTERIOR;
    }

  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/Iterator.html
   * @constructor
   * @private
   */
  class Iterator {
    /**
       * Returns true if the iteration has more elements.
       * @return {boolean}
       */
    hasNext() {}
    /**
       * Returns the next element in the iteration.
       * @return {Object}
       */


    next() {}
    /**
       * Removes from the underlying collection the last element returned by the
       * iterator (optional operation).
       */


    remove() {}

  }

  class GeometryCollectionIterator {
    constructor() {
      GeometryCollectionIterator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._parent = null;
      this._atStart = null;
      this._max = null;
      this._index = null;
      this._subcollectionIterator = null;
      const parent = arguments[0];
      this._parent = parent;
      this._atStart = true;
      this._index = 0;
      this._max = parent.getNumGeometries();
    }

    static isAtomic(geom) {
      return !(geom instanceof GeometryCollection);
    }

    next() {
      if (this._atStart) {
        this._atStart = false;
        if (GeometryCollectionIterator.isAtomic(this._parent)) this._index++;
        return this._parent;
      }

      if (this._subcollectionIterator !== null) if (this._subcollectionIterator.hasNext()) return this._subcollectionIterator.next();else this._subcollectionIterator = null;
      if (this._index >= this._max) throw new NoSuchElementException();

      const obj = this._parent.getGeometryN(this._index++);

      if (obj instanceof GeometryCollection) {
        this._subcollectionIterator = new GeometryCollectionIterator(obj);
        return this._subcollectionIterator.next();
      }

      return obj;
    }

    remove() {
      throw new UnsupportedOperationException(this.getClass().getName());
    }

    hasNext() {
      if (this._atStart) return true;

      if (this._subcollectionIterator !== null) {
        if (this._subcollectionIterator.hasNext()) return true;
        this._subcollectionIterator = null;
      }

      if (this._index >= this._max) return false;
      return true;
    }

    get interfaces_() {
      return [Iterator];
    }

  }

  class SimplePointInAreaLocator {
    constructor() {
      SimplePointInAreaLocator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geom = null;
      const geom = arguments[0];
      this._geom = geom;
    }

    static locatePointInPolygon(p, poly) {
      if (poly.isEmpty()) return Location.EXTERIOR;
      const shell = poly.getExteriorRing();
      const shellLoc = SimplePointInAreaLocator.locatePointInRing(p, shell);
      if (shellLoc !== Location.INTERIOR) return shellLoc;

      for (let i = 0; i < poly.getNumInteriorRing(); i++) {
        const hole = poly.getInteriorRingN(i);
        const holeLoc = SimplePointInAreaLocator.locatePointInRing(p, hole);
        if (holeLoc === Location.BOUNDARY) return Location.BOUNDARY;
        if (holeLoc === Location.INTERIOR) return Location.EXTERIOR;
      }

      return Location.INTERIOR;
    }

    static locatePointInRing(p, ring) {
      if (!ring.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
      return PointLocation.locateInRing(p, ring.getCoordinates());
    }

    static containsPointInPolygon(p, poly) {
      return Location.EXTERIOR !== SimplePointInAreaLocator.locatePointInPolygon(p, poly);
    }

    static locateInGeometry(p, geom) {
      if (geom instanceof Polygon) return SimplePointInAreaLocator.locatePointInPolygon(p, geom);

      if (geom instanceof GeometryCollection) {
        const geomi = new GeometryCollectionIterator(geom);

        while (geomi.hasNext()) {
          const g2 = geomi.next();

          if (g2 !== geom) {
            const loc = SimplePointInAreaLocator.locateInGeometry(p, g2);
            if (loc !== Location.EXTERIOR) return loc;
          }
        }
      }

      return Location.EXTERIOR;
    }

    static isContained(p, geom) {
      return Location.EXTERIOR !== SimplePointInAreaLocator.locate(p, geom);
    }

    static locate(p, geom) {
      if (geom.isEmpty()) return Location.EXTERIOR;
      if (!geom.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
      return SimplePointInAreaLocator.locateInGeometry(p, geom);
    }

    locate(p) {
      return SimplePointInAreaLocator.locate(p, this._geom);
    }

    get interfaces_() {
      return [PointOnGeometryLocator];
    }

  }

  var locate = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IndexedPointInAreaLocator: IndexedPointInAreaLocator,
    PointOnGeometryLocator: PointOnGeometryLocator,
    SimplePointInAreaLocator: SimplePointInAreaLocator
  });

  class SimilarityMeasure {
    measure(g1, g2) {}

  }

  class AreaSimilarityMeasure {
    measure(g1, g2) {
      const areaInt = g1.intersection(g2).getArea();
      const areaUnion = g1.union(g2).getArea();
      return areaInt / areaUnion;
    }

    get interfaces_() {
      return [SimilarityMeasure];
    }

  }

  class HausdorffSimilarityMeasure {
    static diagonalSize(env) {
      if (env.isNull()) return 0.0;
      const width = env.getWidth();
      const hgt = env.getHeight();
      return Math.sqrt(width * width + hgt * hgt);
    }

    measure(g1, g2) {
      const distance = DiscreteHausdorffDistance.distance(g1, g2, HausdorffSimilarityMeasure.DENSIFY_FRACTION);
      const env = new Envelope(g1.getEnvelopeInternal());
      env.expandToInclude(g2.getEnvelopeInternal());
      const envSize = HausdorffSimilarityMeasure.diagonalSize(env);
      const measure = 1 - distance / envSize;
      return measure;
    }

    get interfaces_() {
      return [SimilarityMeasure];
    }

  }
  HausdorffSimilarityMeasure.DENSIFY_FRACTION = 0.25;

  class SimilarityMeasureCombiner {
    static combine(measure1, measure2) {
      return Math.min(measure1, measure2);
    }

  }

  var match = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AreaSimilarityMeasure: AreaSimilarityMeasure,
    HausdorffSimilarityMeasure: HausdorffSimilarityMeasure,
    SimilarityMeasure: SimilarityMeasure,
    SimilarityMeasureCombiner: SimilarityMeasureCombiner
  });

  class Centroid {
    constructor() {
      Centroid.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._areaBasePt = null;
      this._triangleCent3 = new Coordinate();
      this._areasum2 = 0;
      this._cg3 = new Coordinate();
      this._lineCentSum = new Coordinate();
      this._totalLength = 0.0;
      this._ptCount = 0;
      this._ptCentSum = new Coordinate();
      const geom = arguments[0];
      this._areaBasePt = null;
      this.add(geom);
    }

    static area2(p1, p2, p3) {
      return (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
    }

    static centroid3(p1, p2, p3, c) {
      c.x = p1.x + p2.x + p3.x;
      c.y = p1.y + p2.y + p3.y;
      return null;
    }

    static getCentroid(geom) {
      const cent = new Centroid(geom);
      return cent.getCentroid();
    }

    setAreaBasePoint(basePt) {
      this._areaBasePt = basePt;
    }

    addPoint(pt) {
      this._ptCount += 1;
      this._ptCentSum.x += pt.x;
      this._ptCentSum.y += pt.y;
    }

    addLineSegments(pts) {
      let lineLen = 0.0;

      for (let i = 0; i < pts.length - 1; i++) {
        const segmentLen = pts[i].distance(pts[i + 1]);
        if (segmentLen === 0.0) continue;
        lineLen += segmentLen;
        const midx = (pts[i].x + pts[i + 1].x) / 2;
        this._lineCentSum.x += segmentLen * midx;
        const midy = (pts[i].y + pts[i + 1].y) / 2;
        this._lineCentSum.y += segmentLen * midy;
      }

      this._totalLength += lineLen;
      if (lineLen === 0.0 && pts.length > 0) this.addPoint(pts[0]);
    }

    addHole(pts) {
      const isPositiveArea = Orientation.isCCW(pts);

      for (let i = 0; i < pts.length - 1; i++) this.addTriangle(this._areaBasePt, pts[i], pts[i + 1], isPositiveArea);

      this.addLineSegments(pts);
    }

    getCentroid() {
      const cent = new Coordinate();

      if (Math.abs(this._areasum2) > 0.0) {
        cent.x = this._cg3.x / 3 / this._areasum2;
        cent.y = this._cg3.y / 3 / this._areasum2;
      } else if (this._totalLength > 0.0) {
        cent.x = this._lineCentSum.x / this._totalLength;
        cent.y = this._lineCentSum.y / this._totalLength;
      } else if (this._ptCount > 0) {
        cent.x = this._ptCentSum.x / this._ptCount;
        cent.y = this._ptCentSum.y / this._ptCount;
      } else {
        return null;
      }

      return cent;
    }

    addShell(pts) {
      if (pts.length > 0) this.setAreaBasePoint(pts[0]);
      const isPositiveArea = !Orientation.isCCW(pts);

      for (let i = 0; i < pts.length - 1; i++) this.addTriangle(this._areaBasePt, pts[i], pts[i + 1], isPositiveArea);

      this.addLineSegments(pts);
    }

    addTriangle(p0, p1, p2, isPositiveArea) {
      const sign = isPositiveArea ? 1.0 : -1.0;
      Centroid.centroid3(p0, p1, p2, this._triangleCent3);
      const area2 = Centroid.area2(p0, p1, p2);
      this._cg3.x += sign * area2 * this._triangleCent3.x;
      this._cg3.y += sign * area2 * this._triangleCent3.y;
      this._areasum2 += sign * area2;
    }

    add() {
      if (arguments[0] instanceof Polygon) {
        const poly = arguments[0];
        this.addShell(poly.getExteriorRing().getCoordinates());

        for (let i = 0; i < poly.getNumInteriorRing(); i++) this.addHole(poly.getInteriorRingN(i).getCoordinates());
      } else if (arguments[0] instanceof Geometry) {
        const geom = arguments[0];
        if (geom.isEmpty()) return null;

        if (geom instanceof Point) {
          this.addPoint(geom.getCoordinate());
        } else if (geom instanceof LineString) {
          this.addLineSegments(geom.getCoordinates());
        } else if (geom instanceof Polygon) {
          const poly = geom;
          this.add(poly);
        } else if (geom instanceof GeometryCollection) {
          const gc = geom;

          for (let i = 0; i < gc.getNumGeometries(); i++) this.add(gc.getGeometryN(i));
        }
      }
    }

  }

  class EmptyStackException extends Exception {
    constructor(message) {
      super(message);
      this.name = Object.keys({
        EmptyStackException
      })[0];
    }

  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/Stack.html
   */

  class Stack extends List {
    constructor() {
      super();
      this.array = [];
    }

    add(e) {
      this.array.push(e);
      return true;
    }

    get(index) {
      if (index < 0 || index >= this.size()) throw new IndexOutOfBoundsException();
      return this.array[index];
    }
    /**
     * Pushes an item onto the top of this stack.
     * @param {Object} e
     * @return {Object}
     */


    push(e) {
      this.array.push(e);
      return e;
    }
    /**
     * Removes the object at the top of this stack and returns that object as the value of this function.
     * @return {Object}
     */


    pop() {
      if (this.array.length === 0) throw new EmptyStackException();
      return this.array.pop();
    }
    /**
     * Looks at the object at the top of this stack without removing it from the
     * stack.
     * @return {Object}
     */


    peek() {
      if (this.array.length === 0) throw new EmptyStackException();
      return this.array[this.array.length - 1];
    }
    /**
     * Tests if this stack is empty.
     * @return {boolean} true if and only if this stack contains no items; false
     *         otherwise.
     */


    empty() {
      return this.array.length === 0;
    }
    /**
     * @return {boolean}
     */


    isEmpty() {
      return this.empty();
    }
    /**
     * Returns the 1-based position where an object is on this stack. If the object
     * o occurs as an item in this stack, this method returns the distance from the
     * top of the stack of the occurrence nearest the top of the stack; the topmost
     * item on the stack is considered to be at distance 1. The equals method is
     * used to compare o to the items in this stack.
     *
     * NOTE: does not currently actually use equals. (=== is used)
     *
     * @param {Object} o
     * @return {number} the 1-based position from the top of the stack where the
     *         object is located; the return value -1 indicates that the object is
     *         not on the stack.
     */


    search(o) {
      return this.array.indexOf(o);
    }
    /**
     * @return {number}
     */


    size() {
      return this.array.length;
    }
    /**
     * @return {Array}
     */


    toArray() {
      return this.array.slice();
    }

  }

  class UniqueCoordinateArrayFilter {
    constructor() {
      UniqueCoordinateArrayFilter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._coordSet = new HashSet();
      this._list = new ArrayList();
    }

    static filterCoordinates(coords) {
      const filter = new UniqueCoordinateArrayFilter();

      for (let i = 0; i < coords.length; i++) filter.filter(coords[i]);

      return filter.getCoordinates();
    }

    filter(coord) {
      if (this._coordSet.add(coord)) this._list.add(coord);
    }

    getCoordinates() {
      const coordinates = new Array(this._list.size()).fill(null);
      return this._list.toArray(coordinates);
    }

    get interfaces_() {
      return [CoordinateFilter];
    }

  }

  class ConvexHull {
    constructor() {
      ConvexHull.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geomFactory = null;
      this._inputPts = null;

      if (arguments.length === 1) {
        const geometry = arguments[0];
        ConvexHull.constructor_.call(this, ConvexHull.extractCoordinates(geometry), geometry.getFactory());
      } else if (arguments.length === 2) {
        const pts = arguments[0],
              geomFactory = arguments[1];
        this._inputPts = UniqueCoordinateArrayFilter.filterCoordinates(pts);
        this._geomFactory = geomFactory;
      }
    }

    static extractCoordinates(geom) {
      const filter = new UniqueCoordinateArrayFilter();
      geom.apply(filter);
      return filter.getCoordinates();
    }

    preSort(pts) {
      let t = null;

      for (let i = 1; i < pts.length; i++) if (pts[i].y < pts[0].y || pts[i].y === pts[0].y && pts[i].x < pts[0].x) {
        t = pts[0];
        pts[0] = pts[i];
        pts[i] = t;
      }

      Arrays.sort(pts, 1, pts.length, new RadialComparator(pts[0]));
      return pts;
    }

    computeOctRing(inputPts) {
      const octPts = this.computeOctPts(inputPts);
      const coordList = new CoordinateList();
      coordList.add(octPts, false);
      if (coordList.size() < 3) return null;
      coordList.closeRing();
      return coordList.toCoordinateArray();
    }

    lineOrPolygon(coordinates) {
      coordinates = this.cleanRing(coordinates);
      if (coordinates.length === 3) return this._geomFactory.createLineString([coordinates[0], coordinates[1]]);

      const linearRing = this._geomFactory.createLinearRing(coordinates);

      return this._geomFactory.createPolygon(linearRing);
    }

    cleanRing(original) {
      Assert.equals(original[0], original[original.length - 1]);
      const cleanedRing = new ArrayList();
      let previousDistinctCoordinate = null;

      for (let i = 0; i <= original.length - 2; i++) {
        const currentCoordinate = original[i];
        const nextCoordinate = original[i + 1];
        if (currentCoordinate.equals(nextCoordinate)) continue;
        if (previousDistinctCoordinate !== null && this.isBetween(previousDistinctCoordinate, currentCoordinate, nextCoordinate)) continue;
        cleanedRing.add(currentCoordinate);
        previousDistinctCoordinate = currentCoordinate;
      }

      cleanedRing.add(original[original.length - 1]);
      const cleanedRingCoordinates = new Array(cleanedRing.size()).fill(null);
      return cleanedRing.toArray(cleanedRingCoordinates);
    }

    isBetween(c1, c2, c3) {
      if (Orientation.index(c1, c2, c3) !== 0) return false;

      if (c1.x !== c3.x) {
        if (c1.x <= c2.x && c2.x <= c3.x) return true;
        if (c3.x <= c2.x && c2.x <= c1.x) return true;
      }

      if (c1.y !== c3.y) {
        if (c1.y <= c2.y && c2.y <= c3.y) return true;
        if (c3.y <= c2.y && c2.y <= c1.y) return true;
      }

      return false;
    }

    reduce(inputPts) {
      const polyPts = this.computeOctRing(inputPts);
      if (polyPts === null) return inputPts;
      const reducedSet = new TreeSet();

      for (let i = 0; i < polyPts.length; i++) reducedSet.add(polyPts[i]);

      for (let i = 0; i < inputPts.length; i++) if (!PointLocation.isInRing(inputPts[i], polyPts)) reducedSet.add(inputPts[i]);

      const reducedPts = CoordinateArrays.toCoordinateArray(reducedSet);
      if (reducedPts.length < 3) return this.padArray3(reducedPts);
      return reducedPts;
    }

    getConvexHull() {
      if (this._inputPts.length === 0) return this._geomFactory.createGeometryCollection();
      if (this._inputPts.length === 1) return this._geomFactory.createPoint(this._inputPts[0]);
      if (this._inputPts.length === 2) return this._geomFactory.createLineString(this._inputPts);
      let reducedPts = this._inputPts;
      if (this._inputPts.length > 50) reducedPts = this.reduce(this._inputPts);
      const sortedPts = this.preSort(reducedPts);
      const cHS = this.grahamScan(sortedPts);
      const cH = this.toCoordinateArray(cHS);
      return this.lineOrPolygon(cH);
    }

    padArray3(pts) {
      const pad = new Array(3).fill(null);

      for (let i = 0; i < pad.length; i++) if (i < pts.length) pad[i] = pts[i];else pad[i] = pts[0];

      return pad;
    }

    computeOctPts(inputPts) {
      const pts = new Array(8).fill(null);

      for (let j = 0; j < pts.length; j++) pts[j] = inputPts[0];

      for (let i = 1; i < inputPts.length; i++) {
        if (inputPts[i].x < pts[0].x) pts[0] = inputPts[i];
        if (inputPts[i].x - inputPts[i].y < pts[1].x - pts[1].y) pts[1] = inputPts[i];
        if (inputPts[i].y > pts[2].y) pts[2] = inputPts[i];
        if (inputPts[i].x + inputPts[i].y > pts[3].x + pts[3].y) pts[3] = inputPts[i];
        if (inputPts[i].x > pts[4].x) pts[4] = inputPts[i];
        if (inputPts[i].x - inputPts[i].y > pts[5].x - pts[5].y) pts[5] = inputPts[i];
        if (inputPts[i].y < pts[6].y) pts[6] = inputPts[i];
        if (inputPts[i].x + inputPts[i].y < pts[7].x + pts[7].y) pts[7] = inputPts[i];
      }

      return pts;
    }

    toCoordinateArray(stack) {
      const coordinates = new Array(stack.size()).fill(null);

      for (let i = 0; i < stack.size(); i++) {
        const coordinate = stack.get(i);
        coordinates[i] = coordinate;
      }

      return coordinates;
    }

    grahamScan(c) {
      let p = null;
      const ps = new Stack();
      ps.push(c[0]);
      ps.push(c[1]);
      ps.push(c[2]);

      for (let i = 3; i < c.length; i++) {
        p = ps.pop();

        while (!ps.empty() && Orientation.index(ps.peek(), p, c[i]) > 0) p = ps.pop();

        ps.push(p);
        ps.push(c[i]);
      }

      ps.push(c[0]);
      return ps;
    }

  }

  class RadialComparator {
    constructor() {
      RadialComparator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._origin = null;
      const origin = arguments[0];
      this._origin = origin;
    }

    static polarCompare(o, p, q) {
      const dxp = p.x - o.x;
      const dyp = p.y - o.y;
      const dxq = q.x - o.x;
      const dyq = q.y - o.y;
      const orient = Orientation.index(o, p, q);
      if (orient === Orientation.COUNTERCLOCKWISE) return 1;
      if (orient === Orientation.CLOCKWISE) return -1;
      const op = dxp * dxp + dyp * dyp;
      const oq = dxq * dxq + dyq * dyq;
      if (op < oq) return -1;
      if (op > oq) return 1;
      return 0;
    }

    compare(o1, o2) {
      const p1 = o1;
      const p2 = o2;
      return RadialComparator.polarCompare(this._origin, p1, p2);
    }

    get interfaces_() {
      return [Comparator];
    }

  }

  ConvexHull.RadialComparator = RadialComparator;

  class InteriorPointArea {
    constructor() {
      InteriorPointArea.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._interiorPoint = null;
      this._maxWidth = -1;
      const g = arguments[0];
      this.process(g);
    }

    static getInteriorPoint(geom) {
      const intPt = new InteriorPointArea(geom);
      return intPt.getInteriorPoint();
    }

    static avg(a, b) {
      return (a + b) / 2.0;
    }

    getInteriorPoint() {
      return this._interiorPoint;
    }

    process(geom) {
      if (geom.isEmpty()) return null;

      if (geom instanceof Polygon) {
        this.processPolygon(geom);
      } else if (geom instanceof GeometryCollection) {
        const gc = geom;

        for (let i = 0; i < gc.getNumGeometries(); i++) this.process(gc.getGeometryN(i));
      }
    }

    processPolygon(polygon) {
      const intPtPoly = new InteriorPointPolygon(polygon);
      intPtPoly.process();
      const width = intPtPoly.getWidth();

      if (width > this._maxWidth) {
        this._maxWidth = width;
        this._interiorPoint = intPtPoly.getInteriorPoint();
      }
    }

  }

  class InteriorPointPolygon {
    constructor() {
      InteriorPointPolygon.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._polygon = null;
      this._interiorPointY = null;
      this._interiorSectionWidth = 0.0;
      this._interiorPoint = null;
      const polygon = arguments[0];
      this._polygon = polygon;
      this._interiorPointY = ScanLineYOrdinateFinder.getScanLineY(polygon);
    }

    static isEdgeCrossingCounted(p0, p1, scanY) {
      const y0 = p0.getY();
      const y1 = p1.getY();
      if (y0 === y1) return false;
      if (y0 === scanY && y1 < scanY) return false;
      if (y1 === scanY && y0 < scanY) return false;
      return true;
    }

    static intersectsHorizontalLine() {
      if (arguments.length === 2) {
        const env = arguments[0],
              y = arguments[1];
        if (y < env.getMinY()) return false;
        if (y > env.getMaxY()) return false;
        return true;
      } else if (arguments.length === 3) {
        const p0 = arguments[0],
              p1 = arguments[1],
              y = arguments[2];
        if (p0.getY() > y && p1.getY() > y) return false;
        if (p0.getY() < y && p1.getY() < y) return false;
        return true;
      }
    }

    static intersection(p0, p1, Y) {
      const x0 = p0.getX();
      const x1 = p1.getX();
      if (x0 === x1) return x0;
      const segDX = x1 - x0;
      const segDY = p1.getY() - p0.getY();
      const m = segDY / segDX;
      const x = x0 + (Y - p0.getY()) / m;
      return x;
    }

    findBestMidpoint(crossings) {
      if (crossings.size() === 0) return null;
      Assert.isTrue(0 === crossings.size() % 2, 'Interior Point robustness failure: odd number of scanline crossings');
      crossings.sort(new DoubleComparator());

      for (let i = 0; i < crossings.size(); i += 2) {
        const x1 = crossings.get(i);
        const x2 = crossings.get(i + 1);
        const width = x2 - x1;

        if (width > this._interiorSectionWidth) {
          this._interiorSectionWidth = width;
          const interiorPointX = InteriorPointArea.avg(x1, x2);
          this._interiorPoint = new Coordinate(interiorPointX, this._interiorPointY);
        }
      }
    }

    process() {
      if (this._polygon.isEmpty()) return null;
      this._interiorPoint = new Coordinate(this._polygon.getCoordinate());
      const crossings = new ArrayList();
      this.scanRing(this._polygon.getExteriorRing(), crossings);

      for (let i = 0; i < this._polygon.getNumInteriorRing(); i++) this.scanRing(this._polygon.getInteriorRingN(i), crossings);

      this.findBestMidpoint(crossings);
    }

    scanRing(ring, crossings) {
      if (!InteriorPointPolygon.intersectsHorizontalLine(ring.getEnvelopeInternal(), this._interiorPointY)) return null;
      const seq = ring.getCoordinateSequence();

      for (let i = 1; i < seq.size(); i++) {
        const ptPrev = seq.getCoordinate(i - 1);
        const pt = seq.getCoordinate(i);
        this.addEdgeCrossing(ptPrev, pt, this._interiorPointY, crossings);
      }
    }

    getWidth() {
      return this._interiorSectionWidth;
    }

    getInteriorPoint() {
      return this._interiorPoint;
    }

    addEdgeCrossing(p0, p1, scanY, crossings) {
      if (!InteriorPointPolygon.intersectsHorizontalLine(p0, p1, scanY)) return null;
      if (!InteriorPointPolygon.isEdgeCrossingCounted(p0, p1, scanY)) return null;
      const xInt = InteriorPointPolygon.intersection(p0, p1, scanY);
      crossings.add(xInt);
    }

  }

  class DoubleComparator {
    compare(v1, v2) {
      return v1 < v2 ? -1 : v1 > v2 ? +1 : 0;
    }

    get interfaces_() {
      return [Comparator];
    }

  }

  InteriorPointPolygon.DoubleComparator = DoubleComparator;

  class ScanLineYOrdinateFinder {
    constructor() {
      ScanLineYOrdinateFinder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._poly = null;
      this._centreY = null;
      this._hiY = Double.MAX_VALUE;
      this._loY = -Double.MAX_VALUE;
      const poly = arguments[0];
      this._poly = poly;
      this._hiY = poly.getEnvelopeInternal().getMaxY();
      this._loY = poly.getEnvelopeInternal().getMinY();
      this._centreY = InteriorPointArea.avg(this._loY, this._hiY);
    }

    static getScanLineY(poly) {
      const finder = new ScanLineYOrdinateFinder(poly);
      return finder.getScanLineY();
    }

    updateInterval(y) {
      if (y <= this._centreY) {
        if (y > this._loY) this._loY = y;
      } else if (y > this._centreY) {
        if (y < this._hiY) this._hiY = y;
      }
    }

    getScanLineY() {
      this.process(this._poly.getExteriorRing());

      for (let i = 0; i < this._poly.getNumInteriorRing(); i++) this.process(this._poly.getInteriorRingN(i));

      const scanLineY = InteriorPointArea.avg(this._hiY, this._loY);
      return scanLineY;
    }

    process(line) {
      const seq = line.getCoordinateSequence();

      for (let i = 0; i < seq.size(); i++) {
        const y = seq.getY(i);
        this.updateInterval(y);
      }
    }

  }

  InteriorPointArea.InteriorPointPolygon = InteriorPointPolygon;
  InteriorPointArea.ScanLineYOrdinateFinder = ScanLineYOrdinateFinder;

  class InteriorPointLine {
    constructor() {
      InteriorPointLine.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._centroid = null;
      this._minDistance = Double.MAX_VALUE;
      this._interiorPoint = null;
      const g = arguments[0];

      if (g.isEmpty()) {
        this._centroid = null;
      } else {
        this._centroid = Centroid.getCentroid(g);
        g.getPrecisionModel().makePrecise(this._centroid);
      }

      this.addInterior(g);
      if (this._interiorPoint === null) this.addEndpoints(g);
    }

    static getInteriorPoint(geom) {
      const intPt = new InteriorPointLine(geom);
      return intPt.getInteriorPoint();
    }

    addEndpoints() {
      if (arguments[0] instanceof Geometry) {
        const geom = arguments[0];

        if (geom instanceof LineString) {
          this.addEndpoints(geom.getCoordinates());
        } else if (geom instanceof GeometryCollection) {
          const gc = geom;

          for (let i = 0; i < gc.getNumGeometries(); i++) this.addEndpoints(gc.getGeometryN(i));
        }
      } else if (arguments[0] instanceof Array) {
        const pts = arguments[0];
        this.add(pts[0]);
        this.add(pts[pts.length - 1]);
      }
    }

    getInteriorPoint() {
      return this._interiorPoint;
    }

    addInterior() {
      if (arguments[0] instanceof Geometry) {
        const geom = arguments[0];

        if (geom instanceof LineString) {
          this.addInterior(geom.getCoordinates());
        } else if (geom instanceof GeometryCollection) {
          const gc = geom;

          for (let i = 0; i < gc.getNumGeometries(); i++) this.addInterior(gc.getGeometryN(i));
        }
      } else if (arguments[0] instanceof Array) {
        const pts = arguments[0];

        for (let i = 1; i < pts.length - 1; i++) this.add(pts[i]);
      }
    }

    add(point) {
      const dist = point.distance(this._centroid);

      if (dist < this._minDistance) {
        this._interiorPoint = new Coordinate(point);
        this._minDistance = dist;
      }
    }

  }

  class InteriorPointPoint {
    constructor() {
      InteriorPointPoint.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._centroid = null;
      this._minDistance = Double.MAX_VALUE;
      this._interiorPoint = null;
      const g = arguments[0];
      this._centroid = Centroid.getCentroid(g);
      this.add(g);
    }

    static getInteriorPoint(geom) {
      const intPt = new InteriorPointPoint(geom);
      return intPt.getInteriorPoint();
    }

    getInteriorPoint() {
      return this._interiorPoint;
    }

    add() {
      if (arguments[0] instanceof Geometry) {
        const geom = arguments[0];

        if (geom instanceof Point) {
          this.add(geom.getCoordinate());
        } else if (geom instanceof GeometryCollection) {
          const gc = geom;

          for (let i = 0; i < gc.getNumGeometries(); i++) this.add(gc.getGeometryN(i));
        }
      } else if (arguments[0] instanceof Coordinate) {
        const point = arguments[0];
        const dist = point.distance(this._centroid);

        if (dist < this._minDistance) {
          this._interiorPoint = new Coordinate(point);
          this._minDistance = dist;
        }
      }
    }

  }

  class BoundaryNodeRule {
    isInBoundary(boundaryCount) {}

  }

  class Mod2BoundaryNodeRule {
    isInBoundary(boundaryCount) {
      return boundaryCount % 2 === 1;
    }

    get interfaces_() {
      return [BoundaryNodeRule];
    }

  }

  class EndPointBoundaryNodeRule {
    isInBoundary(boundaryCount) {
      return boundaryCount > 0;
    }

    get interfaces_() {
      return [BoundaryNodeRule];
    }

  }

  class MultiValentEndPointBoundaryNodeRule {
    isInBoundary(boundaryCount) {
      return boundaryCount > 1;
    }

    get interfaces_() {
      return [BoundaryNodeRule];
    }

  }

  class MonoValentEndPointBoundaryNodeRule {
    isInBoundary(boundaryCount) {
      return boundaryCount === 1;
    }

    get interfaces_() {
      return [BoundaryNodeRule];
    }

  }

  BoundaryNodeRule.Mod2BoundaryNodeRule = Mod2BoundaryNodeRule;
  BoundaryNodeRule.EndPointBoundaryNodeRule = EndPointBoundaryNodeRule;
  BoundaryNodeRule.MultiValentEndPointBoundaryNodeRule = MultiValentEndPointBoundaryNodeRule;
  BoundaryNodeRule.MonoValentEndPointBoundaryNodeRule = MonoValentEndPointBoundaryNodeRule;
  BoundaryNodeRule.MOD2_BOUNDARY_RULE = new Mod2BoundaryNodeRule();
  BoundaryNodeRule.ENDPOINT_BOUNDARY_RULE = new EndPointBoundaryNodeRule();
  BoundaryNodeRule.MULTIVALENT_ENDPOINT_BOUNDARY_RULE = new MultiValentEndPointBoundaryNodeRule();
  BoundaryNodeRule.MONOVALENT_ENDPOINT_BOUNDARY_RULE = new MonoValentEndPointBoundaryNodeRule();
  BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE = BoundaryNodeRule.MOD2_BOUNDARY_RULE;

  class PointLocator {
    constructor() {
      PointLocator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._boundaryRule = BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
      this._isIn = null;
      this._numBoundaries = null;

      if (arguments.length === 0) ; else if (arguments.length === 1) {
        const boundaryRule = arguments[0];
        if (boundaryRule === null) throw new IllegalArgumentException('Rule must be non-null');
        this._boundaryRule = boundaryRule;
      }
    }

    locateInPolygonRing(p, ring) {
      if (!ring.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
      return PointLocation.locateInRing(p, ring.getCoordinates());
    }

    intersects(p, geom) {
      return this.locate(p, geom) !== Location.EXTERIOR;
    }

    updateLocationInfo(loc) {
      if (loc === Location.INTERIOR) this._isIn = true;
      if (loc === Location.BOUNDARY) this._numBoundaries++;
    }

    computeLocation(p, geom) {
      if (geom instanceof Point) this.updateLocationInfo(this.locateOnPoint(p, geom));

      if (geom instanceof LineString) {
        this.updateLocationInfo(this.locateOnLineString(p, geom));
      } else if (geom instanceof Polygon) {
        this.updateLocationInfo(this.locateInPolygon(p, geom));
      } else if (geom instanceof MultiLineString) {
        const ml = geom;

        for (let i = 0; i < ml.getNumGeometries(); i++) {
          const l = ml.getGeometryN(i);
          this.updateLocationInfo(this.locateOnLineString(p, l));
        }
      } else if (geom instanceof MultiPolygon) {
        const mpoly = geom;

        for (let i = 0; i < mpoly.getNumGeometries(); i++) {
          const poly = mpoly.getGeometryN(i);
          this.updateLocationInfo(this.locateInPolygon(p, poly));
        }
      } else if (geom instanceof GeometryCollection) {
        const geomi = new GeometryCollectionIterator(geom);

        while (geomi.hasNext()) {
          const g2 = geomi.next();
          if (g2 !== geom) this.computeLocation(p, g2);
        }
      }
    }

    locateOnPoint(p, pt) {
      const ptCoord = pt.getCoordinate();
      if (ptCoord.equals2D(p)) return Location.INTERIOR;
      return Location.EXTERIOR;
    }

    locateOnLineString(p, l) {
      if (!l.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
      const seq = l.getCoordinateSequence();
      if (!l.isClosed()) if (p.equals(seq.getCoordinate(0)) || p.equals(seq.getCoordinate(seq.size() - 1))) return Location.BOUNDARY;
      if (PointLocation.isOnLine(p, seq)) return Location.INTERIOR;
      return Location.EXTERIOR;
    }

    locateInPolygon(p, poly) {
      if (poly.isEmpty()) return Location.EXTERIOR;
      const shell = poly.getExteriorRing();
      const shellLoc = this.locateInPolygonRing(p, shell);
      if (shellLoc === Location.EXTERIOR) return Location.EXTERIOR;
      if (shellLoc === Location.BOUNDARY) return Location.BOUNDARY;

      for (let i = 0; i < poly.getNumInteriorRing(); i++) {
        const hole = poly.getInteriorRingN(i);
        const holeLoc = this.locateInPolygonRing(p, hole);
        if (holeLoc === Location.INTERIOR) return Location.EXTERIOR;
        if (holeLoc === Location.BOUNDARY) return Location.BOUNDARY;
      }

      return Location.INTERIOR;
    }

    locate(p, geom) {
      if (geom.isEmpty()) return Location.EXTERIOR;
      if (geom instanceof LineString) return this.locateOnLineString(p, geom);else if (geom instanceof Polygon) return this.locateInPolygon(p, geom);
      this._isIn = false;
      this._numBoundaries = 0;
      this.computeLocation(p, geom);
      if (this._boundaryRule.isInBoundary(this._numBoundaries)) return Location.BOUNDARY;
      if (this._numBoundaries > 0 || this._isIn) return Location.INTERIOR;
      return Location.EXTERIOR;
    }

  }

  class MinimumBoundingCircle {
    constructor() {
      MinimumBoundingCircle.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._input = null;
      this._extremalPts = null;
      this._centre = null;
      this._radius = 0.0;
      const geom = arguments[0];
      this._input = geom;
    }

    static farthestPoints(pts) {
      const dist01 = pts[0].distance(pts[1]);
      const dist12 = pts[1].distance(pts[2]);
      const dist20 = pts[2].distance(pts[0]);
      if (dist01 >= dist12 && dist01 >= dist20) return [pts[0], pts[1]];
      if (dist12 >= dist01 && dist12 >= dist20) return [pts[1], pts[2]];
      return [pts[2], pts[0]];
    }

    static pointWitMinAngleWithX(pts, P) {
      let minSin = Double.MAX_VALUE;
      let minAngPt = null;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (p === P) continue;
        const dx = p.x - P.x;
        let dy = p.y - P.y;
        if (dy < 0) dy = -dy;
        const len = Math.sqrt(dx * dx + dy * dy);
        const sin = dy / len;

        if (sin < minSin) {
          minSin = sin;
          minAngPt = p;
        }
      }

      return minAngPt;
    }

    static lowestPoint(pts) {
      let min = pts[0];

      for (let i = 1; i < pts.length; i++) if (pts[i].y < min.y) min = pts[i];

      return min;
    }

    static pointWithMinAngleWithSegment(pts, P, Q) {
      let minAng = Double.MAX_VALUE;
      let minAngPt = null;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (p === P) continue;
        if (p === Q) continue;
        const ang = Angle.angleBetween(P, p, Q);

        if (ang < minAng) {
          minAng = ang;
          minAngPt = p;
        }
      }

      return minAngPt;
    }

    getRadius() {
      this.compute();
      return this._radius;
    }

    getDiameter() {
      this.compute();

      switch (this._extremalPts.length) {
        case 0:
          return this._input.getFactory().createLineString();

        case 1:
          return this._input.getFactory().createPoint(this._centre);
      }

      const p0 = this._extremalPts[0];
      const p1 = this._extremalPts[1];
      return this._input.getFactory().createLineString([p0, p1]);
    }

    getExtremalPoints() {
      this.compute();
      return this._extremalPts;
    }

    computeCirclePoints() {
      if (this._input.isEmpty()) {
        this._extremalPts = new Array(0).fill(null);
        return null;
      }

      if (this._input.getNumPoints() === 1) {
        const pts = this._input.getCoordinates();

        this._extremalPts = [new Coordinate(pts[0])];
        return null;
      }

      const convexHull = this._input.convexHull();

      const hullPts = convexHull.getCoordinates();
      let pts = hullPts;

      if (hullPts[0].equals2D(hullPts[hullPts.length - 1])) {
        pts = new Array(hullPts.length - 1).fill(null);
        CoordinateArrays.copyDeep(hullPts, 0, pts, 0, hullPts.length - 1);
      }

      if (pts.length <= 2) {
        this._extremalPts = CoordinateArrays.copyDeep(pts);
        return null;
      }

      let P = MinimumBoundingCircle.lowestPoint(pts);
      let Q = MinimumBoundingCircle.pointWitMinAngleWithX(pts, P);

      for (let i = 0; i < pts.length; i++) {
        const R = MinimumBoundingCircle.pointWithMinAngleWithSegment(pts, P, Q);

        if (Angle.isObtuse(P, R, Q)) {
          this._extremalPts = [new Coordinate(P), new Coordinate(Q)];
          return null;
        }

        if (Angle.isObtuse(R, P, Q)) {
          P = R;
          continue;
        }

        if (Angle.isObtuse(R, Q, P)) {
          Q = R;
          continue;
        }

        this._extremalPts = [new Coordinate(P), new Coordinate(Q), new Coordinate(R)];
        return null;
      }

      Assert.shouldNeverReachHere('Logic failure in Minimum Bounding Circle algorithm!');
    }

    compute() {
      if (this._extremalPts !== null) return null;
      this.computeCirclePoints();
      this.computeCentre();
      if (this._centre !== null) this._radius = this._centre.distance(this._extremalPts[0]);
    }

    getCircle() {
      this.compute();
      if (this._centre === null) return this._input.getFactory().createPolygon();

      const centrePoint = this._input.getFactory().createPoint(this._centre);

      if (this._radius === 0.0) return centrePoint;
      return centrePoint.buffer(this._radius);
    }

    getCentre() {
      this.compute();
      return this._centre;
    }

    getMaximumDiameter() {
      this.compute();

      switch (this._extremalPts.length) {
        case 0:
          return this._input.getFactory().createLineString();

        case 1:
          return this._input.getFactory().createPoint(this._centre);

        case 2:
          return this._input.getFactory().createLineString([this._extremalPts[0], this._extremalPts[1]]);

        default:
          const maxDiameter = MinimumBoundingCircle.farthestPoints(this._extremalPts);
          return this._input.getFactory().createLineString(maxDiameter);
      }
    }

    computeCentre() {
      switch (this._extremalPts.length) {
        case 0:
          this._centre = null;
          break;

        case 1:
          this._centre = this._extremalPts[0];
          break;

        case 2:
          this._centre = new Coordinate((this._extremalPts[0].x + this._extremalPts[1].x) / 2.0, (this._extremalPts[0].y + this._extremalPts[1].y) / 2.0);
          break;

        case 3:
          this._centre = Triangle.circumcentre(this._extremalPts[0], this._extremalPts[1], this._extremalPts[2]);
          break;
      }
    }

  }

  class MinimumDiameter {
    constructor() {
      MinimumDiameter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputGeom = null;
      this._isConvex = null;
      this._convexHullPts = null;
      this._minBaseSeg = new LineSegment();
      this._minWidthPt = null;
      this._minPtIndex = null;
      this._minWidth = 0.0;

      if (arguments.length === 1) {
        const inputGeom = arguments[0];
        MinimumDiameter.constructor_.call(this, inputGeom, false);
      } else if (arguments.length === 2) {
        const inputGeom = arguments[0],
              isConvex = arguments[1];
        this._inputGeom = inputGeom;
        this._isConvex = isConvex;
      }
    }

    static nextIndex(pts, index) {
      index++;
      if (index >= pts.length) index = 0;
      return index;
    }

    static computeC(a, b, p) {
      return a * p.y - b * p.x;
    }

    static getMinimumDiameter(geom) {
      return new MinimumDiameter(geom).getDiameter();
    }

    static getMinimumRectangle(geom) {
      return new MinimumDiameter(geom).getMinimumRectangle();
    }

    static computeSegmentForLine(a, b, c) {
      let p0 = null;
      let p1 = null;

      if (Math.abs(b) > Math.abs(a)) {
        p0 = new Coordinate(0.0, c / b);
        p1 = new Coordinate(1.0, c / b - a / b);
      } else {
        p0 = new Coordinate(c / a, 0.0);
        p1 = new Coordinate(c / a - b / a, 1.0);
      }

      return new LineSegment(p0, p1);
    }

    getWidthCoordinate() {
      this.computeMinimumDiameter();
      return this._minWidthPt;
    }

    getSupportingSegment() {
      this.computeMinimumDiameter();
      return this._inputGeom.getFactory().createLineString([this._minBaseSeg.p0, this._minBaseSeg.p1]);
    }

    getDiameter() {
      this.computeMinimumDiameter();
      if (this._minWidthPt === null) return this._inputGeom.getFactory().createLineString();

      const basePt = this._minBaseSeg.project(this._minWidthPt);

      return this._inputGeom.getFactory().createLineString([basePt, this._minWidthPt]);
    }

    computeWidthConvex(convexGeom) {
      if (convexGeom instanceof Polygon) this._convexHullPts = convexGeom.getExteriorRing().getCoordinates();else this._convexHullPts = convexGeom.getCoordinates();

      if (this._convexHullPts.length === 0) {
        this._minWidth = 0.0;
        this._minWidthPt = null;
        this._minBaseSeg = null;
      } else if (this._convexHullPts.length === 1) {
        this._minWidth = 0.0;
        this._minWidthPt = this._convexHullPts[0];
        this._minBaseSeg.p0 = this._convexHullPts[0];
        this._minBaseSeg.p1 = this._convexHullPts[0];
      } else if (this._convexHullPts.length === 2 || this._convexHullPts.length === 3) {
        this._minWidth = 0.0;
        this._minWidthPt = this._convexHullPts[0];
        this._minBaseSeg.p0 = this._convexHullPts[0];
        this._minBaseSeg.p1 = this._convexHullPts[1];
      } else {
        this.computeConvexRingMinDiameter(this._convexHullPts);
      }
    }

    computeConvexRingMinDiameter(pts) {
      this._minWidth = Double.MAX_VALUE;
      let currMaxIndex = 1;
      const seg = new LineSegment();

      for (let i = 0; i < pts.length - 1; i++) {
        seg.p0 = pts[i];
        seg.p1 = pts[i + 1];
        currMaxIndex = this.findMaxPerpDistance(pts, seg, currMaxIndex);
      }
    }

    computeMinimumDiameter() {
      if (this._minWidthPt !== null) return null;

      if (this._isConvex) {
        this.computeWidthConvex(this._inputGeom);
      } else {
        const convexGeom = new ConvexHull(this._inputGeom).getConvexHull();
        this.computeWidthConvex(convexGeom);
      }
    }

    getLength() {
      this.computeMinimumDiameter();
      return this._minWidth;
    }

    findMaxPerpDistance(pts, seg, startIndex) {
      let maxPerpDistance = seg.distancePerpendicular(pts[startIndex]);
      let nextPerpDistance = maxPerpDistance;
      let maxIndex = startIndex;
      let nextIndex = maxIndex;

      while (nextPerpDistance >= maxPerpDistance) {
        maxPerpDistance = nextPerpDistance;
        maxIndex = nextIndex;
        nextIndex = MinimumDiameter.nextIndex(pts, maxIndex);
        nextPerpDistance = seg.distancePerpendicular(pts[nextIndex]);
      }

      if (maxPerpDistance < this._minWidth) {
        this._minPtIndex = maxIndex;
        this._minWidth = maxPerpDistance;
        this._minWidthPt = pts[this._minPtIndex];
        this._minBaseSeg = new LineSegment(seg);
      }

      return maxIndex;
    }

    getMinimumRectangle() {
      this.computeMinimumDiameter();

      if (this._minWidth === 0.0) {
        if (this._minBaseSeg.p0.equals2D(this._minBaseSeg.p1)) return this._inputGeom.getFactory().createPoint(this._minBaseSeg.p0);
        return this._minBaseSeg.toGeometry(this._inputGeom.getFactory());
      }

      const dx = this._minBaseSeg.p1.x - this._minBaseSeg.p0.x;
      const dy = this._minBaseSeg.p1.y - this._minBaseSeg.p0.y;
      let minPara = Double.MAX_VALUE;
      let maxPara = -Double.MAX_VALUE;
      let minPerp = Double.MAX_VALUE;
      let maxPerp = -Double.MAX_VALUE;

      for (let i = 0; i < this._convexHullPts.length; i++) {
        const paraC = MinimumDiameter.computeC(dx, dy, this._convexHullPts[i]);
        if (paraC > maxPara) maxPara = paraC;
        if (paraC < minPara) minPara = paraC;
        const perpC = MinimumDiameter.computeC(-dy, dx, this._convexHullPts[i]);
        if (perpC > maxPerp) maxPerp = perpC;
        if (perpC < minPerp) minPerp = perpC;
      }

      const maxPerpLine = MinimumDiameter.computeSegmentForLine(-dx, -dy, maxPerp);
      const minPerpLine = MinimumDiameter.computeSegmentForLine(-dx, -dy, minPerp);
      const maxParaLine = MinimumDiameter.computeSegmentForLine(-dy, dx, maxPara);
      const minParaLine = MinimumDiameter.computeSegmentForLine(-dy, dx, minPara);
      const p0 = maxParaLine.lineIntersection(maxPerpLine);
      const p1 = minParaLine.lineIntersection(maxPerpLine);
      const p2 = minParaLine.lineIntersection(minPerpLine);
      const p3 = maxParaLine.lineIntersection(minPerpLine);

      const shell = this._inputGeom.getFactory().createLinearRing([p0, p1, p2, p3, p0]);

      return this._inputGeom.getFactory().createPolygon(shell);
    }

  }

  var algorithm = /*#__PURE__*/Object.freeze({
    __proto__: null,
    distance: distance_module,
    locate: locate,
    match: match,
    Angle: Angle,
    Area: Area,
    Centroid: Centroid,
    ConvexHull: ConvexHull,
    Distance: Distance,
    InteriorPointArea: InteriorPointArea,
    InteriorPointLine: InteriorPointLine,
    InteriorPointPoint: InteriorPointPoint,
    Length: Length,
    Orientation: Orientation,
    PointLocation: PointLocation,
    PointLocator: PointLocator,
    RobustLineIntersector: RobustLineIntersector,
    MinimumBoundingCircle: MinimumBoundingCircle,
    MinimumDiameter: MinimumDiameter
  });

  class Densifier {
    constructor() {
      Densifier.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputGeom = null;
      this._distanceTolerance = null;
      const inputGeom = arguments[0];
      this._inputGeom = inputGeom;
    }

    static densifyPoints(pts, distanceTolerance, precModel) {
      const seg = new LineSegment();
      const coordList = new CoordinateList();

      for (let i = 0; i < pts.length - 1; i++) {
        seg.p0 = pts[i];
        seg.p1 = pts[i + 1];
        coordList.add(seg.p0, false);
        const len = seg.getLength();
        const densifiedSegCount = Math.trunc(len / distanceTolerance) + 1;

        if (densifiedSegCount > 1) {
          const densifiedSegLen = len / densifiedSegCount;

          for (let j = 1; j < densifiedSegCount; j++) {
            const segFract = j * densifiedSegLen / len;
            const p = seg.pointAlong(segFract);
            precModel.makePrecise(p);
            coordList.add(p, false);
          }
        }
      }

      coordList.add(pts[pts.length - 1], false);
      return coordList.toCoordinateArray();
    }

    static densify(geom, distanceTolerance) {
      const densifier = new Densifier(geom);
      densifier.setDistanceTolerance(distanceTolerance);
      return densifier.getResultGeometry();
    }

    getResultGeometry() {
      return new DensifyTransformer(this._distanceTolerance).transform(this._inputGeom);
    }

    setDistanceTolerance(distanceTolerance) {
      if (distanceTolerance <= 0.0) throw new IllegalArgumentException('Tolerance must be positive');
      this._distanceTolerance = distanceTolerance;
    }

  }

  class DensifyTransformer extends GeometryTransformer {
    constructor() {
      super();
      DensifyTransformer.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.distanceTolerance = null;
      const distanceTolerance = arguments[0];
      this.distanceTolerance = distanceTolerance;
    }

    transformMultiPolygon(geom, parent) {
      const roughGeom = super.transformMultiPolygon.call(this, geom, parent);
      return this.createValidArea(roughGeom);
    }

    transformPolygon(geom, parent) {
      const roughGeom = super.transformPolygon.call(this, geom, parent);
      if (parent instanceof MultiPolygon) return roughGeom;
      return this.createValidArea(roughGeom);
    }

    transformCoordinates(coords, parent) {
      const inputPts = coords.toCoordinateArray();
      let newPts = Densifier.densifyPoints(inputPts, this.distanceTolerance, parent.getPrecisionModel());
      if (parent instanceof LineString && newPts.length === 1) newPts = new Array(0).fill(null);
      return this._factory.getCoordinateSequenceFactory().create(newPts);
    }

    createValidArea(roughAreaGeom) {
      return roughAreaGeom.buffer(0.0);
    }

  }

  Densifier.DensifyTransformer = DensifyTransformer;

  var densify = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Densifier: Densifier
  });

  class Quadrant {
    static isNorthern(quad) {
      return quad === Quadrant.NE || quad === Quadrant.NW;
    }

    static isOpposite(quad1, quad2) {
      if (quad1 === quad2) return false;
      const diff = (quad1 - quad2 + 4) % 4;
      if (diff === 2) return true;
      return false;
    }

    static commonHalfPlane(quad1, quad2) {
      if (quad1 === quad2) return quad1;
      const diff = (quad1 - quad2 + 4) % 4;
      if (diff === 2) return -1;
      const min = quad1 < quad2 ? quad1 : quad2;
      const max = quad1 > quad2 ? quad1 : quad2;
      if (min === 0 && max === 3) return 3;
      return min;
    }

    static isInHalfPlane(quad, halfPlane) {
      if (halfPlane === Quadrant.SE) return quad === Quadrant.SE || quad === Quadrant.SW;
      return quad === halfPlane || quad === halfPlane + 1;
    }

    static quadrant() {
      if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
        const dx = arguments[0],
              dy = arguments[1];
        if (dx === 0.0 && dy === 0.0) throw new IllegalArgumentException('Cannot compute the quadrant for point ( ' + dx + ', ' + dy + ' )');
        if (dx >= 0.0) {
          if (dy >= 0.0) return Quadrant.NE;else return Quadrant.SE;
        } else if (dy >= 0.0) return Quadrant.NW;else return Quadrant.SW;
      } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
        const p0 = arguments[0],
              p1 = arguments[1];
        if (p1.x === p0.x && p1.y === p0.y) throw new IllegalArgumentException('Cannot compute the quadrant for two identical points ' + p0);
        if (p1.x >= p0.x) {
          if (p1.y >= p0.y) return Quadrant.NE;else return Quadrant.SE;
        } else if (p1.y >= p0.y) return Quadrant.NW;else return Quadrant.SW;
      }
    }

  }
  Quadrant.NE = 0;
  Quadrant.NW = 1;
  Quadrant.SW = 2;
  Quadrant.SE = 3;

  class HalfEdge {
    constructor() {
      HalfEdge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._orig = null;
      this._sym = null;
      this._next = null;
      const orig = arguments[0];
      this._orig = orig;
    }

    static create(p0, p1) {
      const e0 = new HalfEdge(p0);
      const e1 = new HalfEdge(p1);
      e0.link(e1);
      return e0;
    }

    find(dest) {
      let oNext = this;

      do {
        if (oNext === null) return null;
        if (oNext.dest().equals2D(dest)) return oNext;
        oNext = oNext.oNext();
      } while (oNext !== this);

      return null;
    }

    dest() {
      return this._sym._orig;
    }

    isEdgesSorted() {
      const lowest = this.findLowest();
      let e = lowest;

      do {
        const eNext = e.oNext();
        if (eNext === lowest) break;
        const isSorted = eNext.compareTo(e) > 0;
        if (!isSorted) return false;
        e = eNext;
      } while (e !== lowest);

      return true;
    }

    oNext() {
      return this._sym._next;
    }

    directionY() {
      return this.directionPt().getY() - this._orig.getY();
    }

    insert(eAdd) {
      if (this.oNext() === this) {
        this.insertAfter(eAdd);
        return null;
      }

      const ePrev = this.insertionEdge(eAdd);
      ePrev.insertAfter(eAdd);
    }

    insertAfter(e) {
      Assert.equals(this._orig, e.orig());
      const save = this.oNext();

      this._sym.setNext(e);

      e.sym().setNext(save);
    }

    degree() {
      let degree = 0;
      let e = this;

      do {
        degree++;
        e = e.oNext();
      } while (e !== this);

      return degree;
    }

    equals() {
      if (arguments.length === 2 && arguments[1] instanceof Coordinate && arguments[0] instanceof Coordinate) {
        const p0 = arguments[0],
              p1 = arguments[1];
        return this._orig.equals2D(p0) && this._sym._orig.equals(p1);
      }
    }

    findLowest() {
      let lowest = this;
      let e = this.oNext();

      do {
        if (e.compareTo(lowest) < 0) lowest = e;
        e = e.oNext();
      } while (e !== this);

      return lowest;
    }

    directionPt() {
      return this.dest();
    }

    sym() {
      return this._sym;
    }

    prev() {
      return this._sym.next()._sym;
    }

    compareAngularDirection(e) {
      const dx = this.directionX();
      const dy = this.directionY();
      const dx2 = e.directionX();
      const dy2 = e.directionY();
      if (dx === dx2 && dy === dy2) return 0;
      const quadrant = Quadrant.quadrant(dx, dy);
      const quadrant2 = Quadrant.quadrant(dx2, dy2);
      if (quadrant > quadrant2) return 1;
      if (quadrant < quadrant2) return -1;
      const dir1 = this.directionPt();
      const dir2 = e.directionPt();
      return Orientation.index(e._orig, dir2, dir1);
    }

    prevNode() {
      let e = this;

      while (e.degree() === 2) {
        e = e.prev();
        if (e === this) return null;
      }

      return e;
    }

    directionX() {
      return this.directionPt().getX() - this._orig.getX();
    }

    insertionEdge(eAdd) {
      let ePrev = this;

      do {
        const eNext = ePrev.oNext();
        if (eNext.compareTo(ePrev) > 0 && eAdd.compareTo(ePrev) >= 0 && eAdd.compareTo(eNext) <= 0) return ePrev;
        if (eNext.compareTo(ePrev) <= 0 && (eAdd.compareTo(eNext) <= 0 || eAdd.compareTo(ePrev) >= 0)) return ePrev;
        ePrev = eNext;
      } while (ePrev !== this);

      Assert.shouldNeverReachHere();
      return null;
    }

    compareTo(obj) {
      const e = obj;
      const comp = this.compareAngularDirection(e);
      return comp;
    }

    toStringNode() {
      const orig = this.orig();
      this.dest();
      const sb = new StringBuilder();
      sb.append('Node( ' + WKTWriter.format(orig) + ' )' + '\n');
      let e = this;

      do {
        sb.append('  -> ' + e);
        sb.append('\n');
        e = e.oNext();
      } while (e !== this);

      return sb.toString();
    }

    link(sym) {
      this.setSym(sym);
      sym.setSym(this);
      this.setNext(sym);
      sym.setNext(this);
    }

    next() {
      return this._next;
    }

    setSym(e) {
      this._sym = e;
    }

    orig() {
      return this._orig;
    }

    toString() {
      return 'HE(' + this._orig.x + ' ' + this._orig.y + ', ' + this._sym._orig.x + ' ' + this._sym._orig.y + ')';
    }

    toStringNodeEdge() {
      return '  -> (' + WKTWriter.format(this.dest());
    }

    setNext(e) {
      this._next = e;
    }

  }

  class MarkHalfEdge extends HalfEdge {
    constructor() {
      super();
      MarkHalfEdge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._isMarked = false;
      const orig = arguments[0];
      HalfEdge.constructor_.call(this, orig);
    }

    static setMarkBoth(e, isMarked) {
      e.setMark(isMarked);
      e.sym().setMark(isMarked);
    }

    static isMarked(e) {
      return e.isMarked();
    }

    static setMark(e, isMarked) {
      e.setMark(isMarked);
    }

    static markBoth(e) {
      e.mark();
      e.sym().mark();
    }

    static mark(e) {
      e.mark();
    }

    mark() {
      this._isMarked = true;
    }

    setMark(isMarked) {
      this._isMarked = isMarked;
    }

    isMarked() {
      return this._isMarked;
    }

  }

  class EdgeGraph {
    constructor() {
      EdgeGraph.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._vertexMap = new HashMap();
    }

    static isValidEdge(orig, dest) {
      const cmp = dest.compareTo(orig);
      return cmp !== 0;
    }

    insert(orig, dest, eAdj) {
      const e = this.create(orig, dest);
      if (eAdj !== null) eAdj.insert(e);else this._vertexMap.put(orig, e);

      const eAdjDest = this._vertexMap.get(dest);

      if (eAdjDest !== null) eAdjDest.insert(e.sym());else this._vertexMap.put(dest, e.sym());
      return e;
    }

    create(p0, p1) {
      const e0 = this.createEdge(p0);
      const e1 = this.createEdge(p1);
      e0.link(e1);
      return e0;
    }

    createEdge(orig) {
      return new HalfEdge(orig);
    }

    addEdge(orig, dest) {
      if (!EdgeGraph.isValidEdge(orig, dest)) return null;

      const eAdj = this._vertexMap.get(orig);

      let eSame = null;
      if (eAdj !== null) eSame = eAdj.find(dest);
      if (eSame !== null) return eSame;
      const e = this.insert(orig, dest, eAdj);
      return e;
    }

    getVertexEdges() {
      return this._vertexMap.values();
    }

    findEdge(orig, dest) {
      const e = this._vertexMap.get(orig);

      if (e === null) return null;
      return e.find(dest);
    }

  }

  class DissolveHalfEdge extends MarkHalfEdge {
    constructor() {
      super();
      DissolveHalfEdge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._isStart = false;
      const orig = arguments[0];
      MarkHalfEdge.constructor_.call(this, orig);
    }

    setStart() {
      this._isStart = true;
    }

    isStart() {
      return this._isStart;
    }

  }

  class DissolveEdgeGraph extends EdgeGraph {
    constructor() {
      super();
    }

    createEdge(p0) {
      return new DissolveHalfEdge(p0);
    }

  }

  class LineDissolver {
    constructor() {
      LineDissolver.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._result = null;
      this._factory = null;
      this._graph = null;
      this._lines = new ArrayList();
      this._nodeEdgeStack = new Stack();
      this._ringStartEdge = null;
      this._graph = new DissolveEdgeGraph();
    }

    static dissolve(g) {
      const d = new LineDissolver();
      d.add(g);
      return d.getResult();
    }

    addLine(line) {
      this._lines.add(this._factory.createLineString(line.toCoordinateArray()));
    }

    updateRingStartEdge(e) {
      if (!e.isStart()) {
        e = e.sym();
        if (!e.isStart()) return null;
      }

      if (this._ringStartEdge === null) {
        this._ringStartEdge = e;
        return null;
      }

      if (e.orig().compareTo(this._ringStartEdge.orig()) < 0) this._ringStartEdge = e;
    }

    getResult() {
      if (this._result === null) this.computeResult();
      return this._result;
    }

    process(e) {
      let eNode = e.prevNode();
      if (eNode === null) eNode = e;
      this.stackEdges(eNode);
      this.buildLines();
    }

    buildRing(eStartRing) {
      const line = new CoordinateList();
      let e = eStartRing;
      line.add(e.orig().copy(), false);

      while (e.sym().degree() === 2) {
        const eNext = e.next();
        if (eNext === eStartRing) break;
        line.add(eNext.orig().copy(), false);
        e = eNext;
      }

      line.add(e.dest().copy(), false);
      this.addLine(line);
    }

    buildLine(eStart) {
      const line = new CoordinateList();
      let e = eStart;
      this._ringStartEdge = null;
      MarkHalfEdge.markBoth(e);
      line.add(e.orig().copy(), false);

      while (e.sym().degree() === 2) {
        this.updateRingStartEdge(e);
        const eNext = e.next();

        if (eNext === eStart) {
          this.buildRing(this._ringStartEdge);
          return null;
        }

        line.add(eNext.orig().copy(), false);
        e = eNext;
        MarkHalfEdge.markBoth(e);
      }

      line.add(e.dest().clone(), false);
      this.stackEdges(e.sym());
      this.addLine(line);
    }

    stackEdges(node) {
      let e = node;

      do {
        if (!MarkHalfEdge.isMarked(e)) this._nodeEdgeStack.add(e);
        e = e.oNext();
      } while (e !== node);
    }

    computeResult() {
      const edges = this._graph.getVertexEdges();

      for (let i = edges.iterator(); i.hasNext();) {
        const e = i.next();
        if (MarkHalfEdge.isMarked(e)) continue;
        this.process(e);
      }

      this._result = this._factory.buildGeometry(this._lines);
    }

    buildLines() {
      while (!this._nodeEdgeStack.empty()) {
        const e = this._nodeEdgeStack.pop();

        if (MarkHalfEdge.isMarked(e)) continue;
        this.buildLine(e);
      }
    }

    add() {
      if (arguments[0] instanceof Geometry) {
        const geometry = arguments[0];
        geometry.apply(new class {
          get interfaces_() {
            return [GeometryComponentFilter];
          }

          filter(component) {
            if (component instanceof LineString) this.add(component);
          }

        }());
      } else if (hasInterface(arguments[0], Collection)) {
        const geometries = arguments[0];

        for (let i = geometries.iterator(); i.hasNext();) {
          const geometry = i.next();
          this.add(geometry);
        }
      } else if (arguments[0] instanceof LineString) {
        const lineString = arguments[0];
        if (this._factory === null) this._factory = lineString.getFactory();
        const seq = lineString.getCoordinateSequence();
        let doneStart = false;

        for (let i = 1; i < seq.size(); i++) {
          const e = this._graph.addEdge(seq.getCoordinate(i - 1), seq.getCoordinate(i));

          if (e === null) continue;

          if (!doneStart) {
            e.setStart();
            doneStart = true;
          }
        }
      }
    }

  }

  var dissolve = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LineDissolver: LineDissolver
  });

  class Position {
    static opposite(position) {
      if (position === Position.LEFT) return Position.RIGHT;
      if (position === Position.RIGHT) return Position.LEFT;
      return position;
    }

  }
  Position.ON = 0;
  Position.LEFT = 1;
  Position.RIGHT = 2;

  class MonotoneChain$1 {
    constructor() {
      MonotoneChain$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.mce = null;
      this.chainIndex = null;
      const mce = arguments[0],
            chainIndex = arguments[1];
      this.mce = mce;
      this.chainIndex = chainIndex;
    }

    computeIntersections(mc, si) {
      this.mce.computeIntersectsForChain(this.chainIndex, mc.mce, mc.chainIndex, si);
    }

  }

  class SweepLineEvent {
    constructor() {
      SweepLineEvent.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._label = null;
      this._xValue = null;
      this._eventType = null;
      this._insertEvent = null;
      this._deleteEventIndex = null;
      this._obj = null;

      if (arguments.length === 2) {
        const x = arguments[0],
              insertEvent = arguments[1];
        this._eventType = SweepLineEvent.DELETE;
        this._xValue = x;
        this._insertEvent = insertEvent;
      } else if (arguments.length === 3) {
        const label = arguments[0],
              x = arguments[1],
              obj = arguments[2];
        this._eventType = SweepLineEvent.INSERT;
        this._label = label;
        this._xValue = x;
        this._obj = obj;
      }
    }

    isDelete() {
      return this._eventType === SweepLineEvent.DELETE;
    }

    setDeleteEventIndex(deleteEventIndex) {
      this._deleteEventIndex = deleteEventIndex;
    }

    getObject() {
      return this._obj;
    }

    compareTo(o) {
      const pe = o;
      if (this._xValue < pe._xValue) return -1;
      if (this._xValue > pe._xValue) return 1;
      if (this._eventType < pe._eventType) return -1;
      if (this._eventType > pe._eventType) return 1;
      return 0;
    }

    getInsertEvent() {
      return this._insertEvent;
    }

    isInsert() {
      return this._eventType === SweepLineEvent.INSERT;
    }

    isSameLabel(ev) {
      if (this._label === null) return false;
      return this._label === ev._label;
    }

    getDeleteEventIndex() {
      return this._deleteEventIndex;
    }

    get interfaces_() {
      return [Comparable];
    }

  }
  SweepLineEvent.INSERT = 1;
  SweepLineEvent.DELETE = 2;

  class EdgeSetIntersector {}

  class SegmentIntersector$1 {
    constructor() {
      SegmentIntersector$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._hasIntersection = false;
      this._hasProper = false;
      this._hasProperInterior = false;
      this._properIntersectionPoint = null;
      this._li = null;
      this._includeProper = null;
      this._recordIsolated = null;
      this._isSelfIntersection = null;
      this._numIntersections = 0;
      this.numTests = 0;
      this._bdyNodes = null;
      this._isDone = false;
      this._isDoneWhenProperInt = false;
      const li = arguments[0],
            includeProper = arguments[1],
            recordIsolated = arguments[2];
      this._li = li;
      this._includeProper = includeProper;
      this._recordIsolated = recordIsolated;
    }

    static isAdjacentSegments(i1, i2) {
      return Math.abs(i1 - i2) === 1;
    }

    isTrivialIntersection(e0, segIndex0, e1, segIndex1) {
      if (e0 === e1) if (this._li.getIntersectionNum() === 1) {
        if (SegmentIntersector$1.isAdjacentSegments(segIndex0, segIndex1)) return true;

        if (e0.isClosed()) {
          const maxSegIndex = e0.getNumPoints() - 1;
          if (segIndex0 === 0 && segIndex1 === maxSegIndex || segIndex1 === 0 && segIndex0 === maxSegIndex) return true;
        }
      }
      return false;
    }

    getProperIntersectionPoint() {
      return this._properIntersectionPoint;
    }

    setIsDoneIfProperInt(isDoneWhenProperInt) {
      this._isDoneWhenProperInt = isDoneWhenProperInt;
    }

    hasProperInteriorIntersection() {
      return this._hasProperInterior;
    }

    isBoundaryPointInternal(li, bdyNodes) {
      for (let i = bdyNodes.iterator(); i.hasNext();) {
        const node = i.next();
        const pt = node.getCoordinate();
        if (li.isIntersection(pt)) return true;
      }

      return false;
    }

    hasProperIntersection() {
      return this._hasProper;
    }

    hasIntersection() {
      return this._hasIntersection;
    }

    isDone() {
      return this._isDone;
    }

    isBoundaryPoint(li, bdyNodes) {
      if (bdyNodes === null) return false;
      if (this.isBoundaryPointInternal(li, bdyNodes[0])) return true;
      if (this.isBoundaryPointInternal(li, bdyNodes[1])) return true;
      return false;
    }

    setBoundaryNodes(bdyNodes0, bdyNodes1) {
      this._bdyNodes = new Array(2).fill(null);
      this._bdyNodes[0] = bdyNodes0;
      this._bdyNodes[1] = bdyNodes1;
    }

    addIntersections(e0, segIndex0, e1, segIndex1) {
      if (e0 === e1 && segIndex0 === segIndex1) return null;
      this.numTests++;
      const p00 = e0.getCoordinates()[segIndex0];
      const p01 = e0.getCoordinates()[segIndex0 + 1];
      const p10 = e1.getCoordinates()[segIndex1];
      const p11 = e1.getCoordinates()[segIndex1 + 1];

      this._li.computeIntersection(p00, p01, p10, p11);

      if (this._li.hasIntersection()) {
        if (this._recordIsolated) {
          e0.setIsolated(false);
          e1.setIsolated(false);
        }

        this._numIntersections++;

        if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
          this._hasIntersection = true;

          if (this._includeProper || !this._li.isProper()) {
            e0.addIntersections(this._li, segIndex0, 0);
            e1.addIntersections(this._li, segIndex1, 1);
          }

          if (this._li.isProper()) {
            this._properIntersectionPoint = this._li.getIntersection(0).copy();
            this._hasProper = true;
            if (this._isDoneWhenProperInt) this._isDone = true;
            if (!this.isBoundaryPoint(this._li, this._bdyNodes)) this._hasProperInterior = true;
          }
        }
      }
    }

  }

  class SimpleMCSweepLineIntersector extends EdgeSetIntersector {
    constructor() {
      super();
      SimpleMCSweepLineIntersector.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.events = new ArrayList();
      this.nOverlaps = null;
    }

    prepareEvents() {
      Collections.sort(this.events);

      for (let i = 0; i < this.events.size(); i++) {
        const ev = this.events.get(i);
        if (ev.isDelete()) ev.getInsertEvent().setDeleteEventIndex(i);
      }
    }

    computeIntersections() {
      if (arguments.length === 1) {
        const si = arguments[0];
        this.nOverlaps = 0;
        this.prepareEvents();

        for (let i = 0; i < this.events.size(); i++) {
          const ev = this.events.get(i);
          if (ev.isInsert()) this.processOverlaps(i, ev.getDeleteEventIndex(), ev, si);
          if (si.isDone()) break;
        }
      } else if (arguments.length === 3) {
        if (arguments[2] instanceof SegmentIntersector$1 && hasInterface(arguments[0], List) && hasInterface(arguments[1], List)) {
          const edges0 = arguments[0],
                edges1 = arguments[1],
                si = arguments[2];
          this.addEdges(edges0, edges0);
          this.addEdges(edges1, edges1);
          this.computeIntersections(si);
        } else if (typeof arguments[2] === 'boolean' && hasInterface(arguments[0], List) && arguments[1] instanceof SegmentIntersector$1) {
          const edges = arguments[0],
                si = arguments[1],
                testAllSegments = arguments[2];
          if (testAllSegments) this.addEdges(edges, null);else this.addEdges(edges);
          this.computeIntersections(si);
        }
      }
    }

    addEdge(edge, edgeSet) {
      const mce = edge.getMonotoneChainEdge();
      const startIndex = mce.getStartIndexes();

      for (let i = 0; i < startIndex.length - 1; i++) {
        const mc = new MonotoneChain$1(mce, i);
        const insertEvent = new SweepLineEvent(edgeSet, mce.getMinX(i), mc);
        this.events.add(insertEvent);
        this.events.add(new SweepLineEvent(mce.getMaxX(i), insertEvent));
      }
    }

    processOverlaps(start, end, ev0, si) {
      const mc0 = ev0.getObject();

      for (let i = start; i < end; i++) {
        const ev1 = this.events.get(i);

        if (ev1.isInsert()) {
          const mc1 = ev1.getObject();

          if (!ev0.isSameLabel(ev1)) {
            mc0.computeIntersections(mc1, si);
            this.nOverlaps++;
          }
        }
      }
    }

    addEdges() {
      if (arguments.length === 1) {
        const edges = arguments[0];

        for (let i = edges.iterator(); i.hasNext();) {
          const edge = i.next();
          this.addEdge(edge, edge);
        }
      } else if (arguments.length === 2) {
        const edges = arguments[0],
              edgeSet = arguments[1];

        for (let i = edges.iterator(); i.hasNext();) {
          const edge = i.next();
          this.addEdge(edge, edgeSet);
        }
      }
    }

  }

  class TopologyLocation {
    constructor() {
      TopologyLocation.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.location = null;

      if (arguments.length === 1) {
        if (arguments[0] instanceof Array) {
          const location = arguments[0];
          this.init(location.length);
        } else if (Number.isInteger(arguments[0])) {
          const on = arguments[0];
          this.init(1);
          this.location[Position.ON] = on;
        } else if (arguments[0] instanceof TopologyLocation) {
          const gl = arguments[0];
          this.init(gl.location.length);
          if (gl !== null) for (let i = 0; i < this.location.length; i++) this.location[i] = gl.location[i];
        }
      } else if (arguments.length === 3) {
        const on = arguments[0],
              left = arguments[1],
              right = arguments[2];
        this.init(3);
        this.location[Position.ON] = on;
        this.location[Position.LEFT] = left;
        this.location[Position.RIGHT] = right;
      }
    }

    setAllLocations(locValue) {
      for (let i = 0; i < this.location.length; i++) this.location[i] = locValue;
    }

    isNull() {
      for (let i = 0; i < this.location.length; i++) if (this.location[i] !== Location.NONE) return false;

      return true;
    }

    setAllLocationsIfNull(locValue) {
      for (let i = 0; i < this.location.length; i++) if (this.location[i] === Location.NONE) this.location[i] = locValue;
    }

    isLine() {
      return this.location.length === 1;
    }

    merge(gl) {
      if (gl.location.length > this.location.length) {
        const newLoc = new Array(3).fill(null);
        newLoc[Position.ON] = this.location[Position.ON];
        newLoc[Position.LEFT] = Location.NONE;
        newLoc[Position.RIGHT] = Location.NONE;
        this.location = newLoc;
      }

      for (let i = 0; i < this.location.length; i++) if (this.location[i] === Location.NONE && i < gl.location.length) this.location[i] = gl.location[i];
    }

    getLocations() {
      return this.location;
    }

    flip() {
      if (this.location.length <= 1) return null;
      const temp = this.location[Position.LEFT];
      this.location[Position.LEFT] = this.location[Position.RIGHT];
      this.location[Position.RIGHT] = temp;
    }

    toString() {
      const buf = new StringBuffer();
      if (this.location.length > 1) buf.append(Location.toLocationSymbol(this.location[Position.LEFT]));
      buf.append(Location.toLocationSymbol(this.location[Position.ON]));
      if (this.location.length > 1) buf.append(Location.toLocationSymbol(this.location[Position.RIGHT]));
      return buf.toString();
    }

    setLocations(on, left, right) {
      this.location[Position.ON] = on;
      this.location[Position.LEFT] = left;
      this.location[Position.RIGHT] = right;
    }

    get(posIndex) {
      if (posIndex < this.location.length) return this.location[posIndex];
      return Location.NONE;
    }

    isArea() {
      return this.location.length > 1;
    }

    isAnyNull() {
      for (let i = 0; i < this.location.length; i++) if (this.location[i] === Location.NONE) return true;

      return false;
    }

    setLocation() {
      if (arguments.length === 1) {
        const locValue = arguments[0];
        this.setLocation(Position.ON, locValue);
      } else if (arguments.length === 2) {
        const locIndex = arguments[0],
              locValue = arguments[1];
        this.location[locIndex] = locValue;
      }
    }

    init(size) {
      this.location = new Array(size).fill(null);
      this.setAllLocations(Location.NONE);
    }

    isEqualOnSide(le, locIndex) {
      return this.location[locIndex] === le.location[locIndex];
    }

    allPositionsEqual(loc) {
      for (let i = 0; i < this.location.length; i++) if (this.location[i] !== loc) return false;

      return true;
    }

  }

  class Label {
    constructor() {
      Label.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.elt = new Array(2).fill(null);

      if (arguments.length === 1) {
        if (Number.isInteger(arguments[0])) {
          const onLoc = arguments[0];
          this.elt[0] = new TopologyLocation(onLoc);
          this.elt[1] = new TopologyLocation(onLoc);
        } else if (arguments[0] instanceof Label) {
          const lbl = arguments[0];
          this.elt[0] = new TopologyLocation(lbl.elt[0]);
          this.elt[1] = new TopologyLocation(lbl.elt[1]);
        }
      } else if (arguments.length === 2) {
        const geomIndex = arguments[0],
              onLoc = arguments[1];
        this.elt[0] = new TopologyLocation(Location.NONE);
        this.elt[1] = new TopologyLocation(Location.NONE);
        this.elt[geomIndex].setLocation(onLoc);
      } else if (arguments.length === 3) {
        const onLoc = arguments[0],
              leftLoc = arguments[1],
              rightLoc = arguments[2];
        this.elt[0] = new TopologyLocation(onLoc, leftLoc, rightLoc);
        this.elt[1] = new TopologyLocation(onLoc, leftLoc, rightLoc);
      } else if (arguments.length === 4) {
        const geomIndex = arguments[0],
              onLoc = arguments[1],
              leftLoc = arguments[2],
              rightLoc = arguments[3];
        this.elt[0] = new TopologyLocation(Location.NONE, Location.NONE, Location.NONE);
        this.elt[1] = new TopologyLocation(Location.NONE, Location.NONE, Location.NONE);
        this.elt[geomIndex].setLocations(onLoc, leftLoc, rightLoc);
      }
    }

    static toLineLabel(label) {
      const lineLabel = new Label(Location.NONE);

      for (let i = 0; i < 2; i++) lineLabel.setLocation(i, label.getLocation(i));

      return lineLabel;
    }

    getGeometryCount() {
      let count = 0;
      if (!this.elt[0].isNull()) count++;
      if (!this.elt[1].isNull()) count++;
      return count;
    }

    setAllLocations(geomIndex, location) {
      this.elt[geomIndex].setAllLocations(location);
    }

    isNull(geomIndex) {
      return this.elt[geomIndex].isNull();
    }

    setAllLocationsIfNull() {
      if (arguments.length === 1) {
        const location = arguments[0];
        this.setAllLocationsIfNull(0, location);
        this.setAllLocationsIfNull(1, location);
      } else if (arguments.length === 2) {
        const geomIndex = arguments[0],
              location = arguments[1];
        this.elt[geomIndex].setAllLocationsIfNull(location);
      }
    }

    isLine(geomIndex) {
      return this.elt[geomIndex].isLine();
    }

    merge(lbl) {
      for (let i = 0; i < 2; i++) if (this.elt[i] === null && lbl.elt[i] !== null) this.elt[i] = new TopologyLocation(lbl.elt[i]);else this.elt[i].merge(lbl.elt[i]);
    }

    flip() {
      this.elt[0].flip();
      this.elt[1].flip();
    }

    getLocation() {
      if (arguments.length === 1) {
        const geomIndex = arguments[0];
        return this.elt[geomIndex].get(Position.ON);
      } else if (arguments.length === 2) {
        const geomIndex = arguments[0],
              posIndex = arguments[1];
        return this.elt[geomIndex].get(posIndex);
      }
    }

    toString() {
      const buf = new StringBuffer();

      if (this.elt[0] !== null) {
        buf.append('A:');
        buf.append(this.elt[0].toString());
      }

      if (this.elt[1] !== null) {
        buf.append(' B:');
        buf.append(this.elt[1].toString());
      }

      return buf.toString();
    }

    isArea() {
      if (arguments.length === 0) {
        return this.elt[0].isArea() || this.elt[1].isArea();
      } else if (arguments.length === 1) {
        const geomIndex = arguments[0];
        return this.elt[geomIndex].isArea();
      }
    }

    isAnyNull(geomIndex) {
      return this.elt[geomIndex].isAnyNull();
    }

    setLocation() {
      if (arguments.length === 2) {
        const geomIndex = arguments[0],
              location = arguments[1];
        this.elt[geomIndex].setLocation(Position.ON, location);
      } else if (arguments.length === 3) {
        const geomIndex = arguments[0],
              posIndex = arguments[1],
              location = arguments[2];
        this.elt[geomIndex].setLocation(posIndex, location);
      }
    }

    isEqualOnSide(lbl, side) {
      return this.elt[0].isEqualOnSide(lbl.elt[0], side) && this.elt[1].isEqualOnSide(lbl.elt[1], side);
    }

    allPositionsEqual(geomIndex, loc) {
      return this.elt[geomIndex].allPositionsEqual(loc);
    }

    toLine(geomIndex) {
      if (this.elt[geomIndex].isArea()) this.elt[geomIndex] = new TopologyLocation(this.elt[geomIndex].location[0]);
    }

  }

  class EdgeIntersection {
    constructor() {
      EdgeIntersection.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.coord = null;
      this.segmentIndex = null;
      this.dist = null;
      const coord = arguments[0],
            segmentIndex = arguments[1],
            dist = arguments[2];
      this.coord = new Coordinate(coord);
      this.segmentIndex = segmentIndex;
      this.dist = dist;
    }

    getSegmentIndex() {
      return this.segmentIndex;
    }

    getCoordinate() {
      return this.coord;
    }

    print(out) {
      out.print(this.coord);
      out.print(' seg # = ' + this.segmentIndex);
      out.println(' dist = ' + this.dist);
    }

    compareTo(obj) {
      const other = obj;
      return this.compare(other.segmentIndex, other.dist);
    }

    isEndPoint(maxSegmentIndex) {
      if (this.segmentIndex === 0 && this.dist === 0.0) return true;
      if (this.segmentIndex === maxSegmentIndex) return true;
      return false;
    }

    toString() {
      return this.coord + ' seg # = ' + this.segmentIndex + ' dist = ' + this.dist;
    }

    getDistance() {
      return this.dist;
    }

    compare(segmentIndex, dist) {
      if (this.segmentIndex < segmentIndex) return -1;
      if (this.segmentIndex > segmentIndex) return 1;
      if (this.dist < dist) return -1;
      if (this.dist > dist) return 1;
      return 0;
    }

    get interfaces_() {
      return [Comparable];
    }

  }

  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/SortedMap.html
   */

  class SortedMap extends Map$1 {}

  const BLACK = 0;
  const RED = 1;

  function colorOf(p) {
    return p == null ? BLACK : p.color;
  }

  function parentOf(p) {
    return p == null ? null : p.parent;
  }

  function setColor(p, c) {
    if (p !== null) p.color = c;
  }

  function leftOf(p) {
    return p == null ? null : p.left;
  }

  function rightOf(p) {
    return p == null ? null : p.right;
  }
  /**
   * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeMap.html
   */


  class TreeMap extends SortedMap {
    constructor() {
      super();
      this.root_ = null;
      this.size_ = 0;
    }

    get(key) {
      let p = this.root_;

      while (p !== null) {
        const cmp = key.compareTo(p.key);
        if (cmp < 0) p = p.left;else if (cmp > 0) p = p.right;else return p.value;
      }

      return null;
    }

    put(key, value) {
      if (this.root_ === null) {
        this.root_ = {
          key: key,
          value: value,
          left: null,
          right: null,
          parent: null,
          color: BLACK,

          getValue() {
            return this.value;
          },

          getKey() {
            return this.key;
          }

        };
        this.size_ = 1;
        return null;
      }

      let t = this.root_;
      let parent;
      let cmp;

      do {
        parent = t;
        cmp = key.compareTo(t.key);

        if (cmp < 0) {
          t = t.left;
        } else if (cmp > 0) {
          t = t.right;
        } else {
          const oldValue = t.value;
          t.value = value;
          return oldValue;
        }
      } while (t !== null);

      const e = {
        key: key,
        left: null,
        right: null,
        value: value,
        parent: parent,
        color: BLACK,

        getValue() {
          return this.value;
        },

        getKey() {
          return this.key;
        }

      };
      if (cmp < 0) parent.left = e;else parent.right = e;
      this.fixAfterInsertion(e);
      this.size_++;
      return null;
    }
    /**
     * @param {Object} x
     */


    fixAfterInsertion(x) {
      let y;
      x.color = RED;

      while (x != null && x !== this.root_ && x.parent.color === RED) if (parentOf(x) === leftOf(parentOf(parentOf(x)))) {
        y = rightOf(parentOf(parentOf(x)));

        if (colorOf(y) === RED) {
          setColor(parentOf(x), BLACK);
          setColor(y, BLACK);
          setColor(parentOf(parentOf(x)), RED);
          x = parentOf(parentOf(x));
        } else {
          if (x === rightOf(parentOf(x))) {
            x = parentOf(x);
            this.rotateLeft(x);
          }

          setColor(parentOf(x), BLACK);
          setColor(parentOf(parentOf(x)), RED);
          this.rotateRight(parentOf(parentOf(x)));
        }
      } else {
        y = leftOf(parentOf(parentOf(x)));

        if (colorOf(y) === RED) {
          setColor(parentOf(x), BLACK);
          setColor(y, BLACK);
          setColor(parentOf(parentOf(x)), RED);
          x = parentOf(parentOf(x));
        } else {
          if (x === leftOf(parentOf(x))) {
            x = parentOf(x);
            this.rotateRight(x);
          }

          setColor(parentOf(x), BLACK);
          setColor(parentOf(parentOf(x)), RED);
          this.rotateLeft(parentOf(parentOf(x)));
        }
      }

      this.root_.color = BLACK;
    }

    values() {
      const arrayList = new ArrayList();
      let p = this.getFirstEntry();

      if (p !== null) {
        arrayList.add(p.value);

        while ((p = TreeMap.successor(p)) !== null) arrayList.add(p.value);
      }

      return arrayList;
    }

    entrySet() {
      const hashSet = new HashSet();
      let p = this.getFirstEntry();

      if (p !== null) {
        hashSet.add(p);

        while ((p = TreeMap.successor(p)) !== null) hashSet.add(p);
      }

      return hashSet;
    }
    /**
     * @param {Object} p
     */


    rotateLeft(p) {
      if (p != null) {
        const r = p.right;
        p.right = r.left;
        if (r.left != null) r.left.parent = p;
        r.parent = p.parent;
        if (p.parent == null) this.root_ = r;else if (p.parent.left === p) p.parent.left = r;else p.parent.right = r;
        r.left = p;
        p.parent = r;
      }
    }
    /**
     * @param {Object} p
     */


    rotateRight(p) {
      if (p != null) {
        const l = p.left;
        p.left = l.right;
        if (l.right != null) l.right.parent = p;
        l.parent = p.parent;
        if (p.parent == null) this.root_ = l;else if (p.parent.right === p) p.parent.right = l;else p.parent.left = l;
        l.right = p;
        p.parent = l;
      }
    }
    /**
     * @return {Object}
     */


    getFirstEntry() {
      let p = this.root_;
      if (p != null) while (p.left != null) p = p.left;
      return p;
    }
    /**
     * @param {Object} t
     * @return {Object}
     * @private
     */


    static successor(t) {
      let p;

      if (t === null) {
        return null;
      } else if (t.right !== null) {
        p = t.right;

        while (p.left !== null) p = p.left;

        return p;
      } else {
        p = t.parent;
        let ch = t;

        while (p !== null && ch === p.right) {
          ch = p;
          p = p.parent;
        }

        return p;
      }
    }

    size() {
      return this.size_;
    }

    containsKey(key) {
      let p = this.root_;

      while (p !== null) {
        const cmp = key.compareTo(p.key);
        if (cmp < 0) p = p.left;else if (cmp > 0) p = p.right;else return true;
      }

      return false;
    }

  }

  class EdgeIntersectionList {
    constructor() {
      EdgeIntersectionList.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._nodeMap = new TreeMap();
      this.edge = null;
      const edge = arguments[0];
      this.edge = edge;
    }

    print(out) {
      out.println('Intersections:');

      for (let it = this.iterator(); it.hasNext();) {
        const ei = it.next();
        ei.print(out);
      }
    }

    iterator() {
      return this._nodeMap.values().iterator();
    }

    addSplitEdges(edgeList) {
      this.addEndpoints();
      const it = this.iterator();
      let eiPrev = it.next();

      while (it.hasNext()) {
        const ei = it.next();
        const newEdge = this.createSplitEdge(eiPrev, ei);
        edgeList.add(newEdge);
        eiPrev = ei;
      }
    }

    addEndpoints() {
      const maxSegIndex = this.edge.pts.length - 1;
      this.add(this.edge.pts[0], 0, 0.0);
      this.add(this.edge.pts[maxSegIndex], maxSegIndex, 0.0);
    }

    createSplitEdge(ei0, ei1) {
      let npts = ei1.segmentIndex - ei0.segmentIndex + 2;
      const lastSegStartPt = this.edge.pts[ei1.segmentIndex];
      const useIntPt1 = ei1.dist > 0.0 || !ei1.coord.equals2D(lastSegStartPt);
      if (!useIntPt1) npts--;
      const pts = new Array(npts).fill(null);
      let ipt = 0;
      pts[ipt++] = new Coordinate(ei0.coord);

      for (let i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) pts[ipt++] = this.edge.pts[i];

      if (useIntPt1) pts[ipt] = ei1.coord;
      return new Edge$1(pts, new Label(this.edge._label));
    }

    add(intPt, segmentIndex, dist) {
      const eiNew = new EdgeIntersection(intPt, segmentIndex, dist);

      const ei = this._nodeMap.get(eiNew);

      if (ei !== null) return ei;

      this._nodeMap.put(eiNew, eiNew);

      return eiNew;
    }

    isIntersection(pt) {
      for (let it = this.iterator(); it.hasNext();) {
        const ei = it.next();
        if (ei.coord.equals(pt)) return true;
      }

      return false;
    }

  }

  class IntArrayList {
    constructor() {
      IntArrayList.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._data = null;
      this._size = 0;

      if (arguments.length === 0) {
        IntArrayList.constructor_.call(this, 10);
      } else if (arguments.length === 1) {
        const initialCapacity = arguments[0];
        this._data = new Array(initialCapacity).fill(null);
      }
    }

    size() {
      return this._size;
    }

    addAll(values) {
      if (values === null) return null;
      if (values.length === 0) return null;
      this.ensureCapacity(this._size + values.length);
      System.arraycopy(values, 0, this._data, this._size, values.length);
      this._size += values.length;
    }

    ensureCapacity(capacity) {
      if (capacity <= this._data.length) return null;
      const newLength = Math.max(capacity, this._data.length * 2);
      this._data = Arrays.copyOf(this._data, newLength);
    }

    toArray() {
      const array = new Array(this._size).fill(null);
      System.arraycopy(this._data, 0, array, 0, this._size);
      return array;
    }

    add(value) {
      this.ensureCapacity(this._size + 1);
      this._data[this._size] = value;
      ++this._size;
    }

  }

  class MonotoneChainIndexer {
    static toIntArray(list) {
      const array = new Array(list.size()).fill(null);

      for (let i = 0; i < array.length; i++) array[i] = list.get(i).intValue();

      return array;
    }

    getChainStartIndices(pts) {
      let start = 0;
      const startIndexList = new IntArrayList(Math.trunc(pts.length / 2));
      startIndexList.add(start);

      do {
        const last = this.findChainEnd(pts, start);
        startIndexList.add(last);
        start = last;
      } while (start < pts.length - 1);

      return startIndexList.toArray();
    }

    findChainEnd(pts, start) {
      const chainQuad = Quadrant.quadrant(pts[start], pts[start + 1]);
      let last = start + 1;

      while (last < pts.length) {
        const quad = Quadrant.quadrant(pts[last - 1], pts[last]);
        if (quad !== chainQuad) break;
        last++;
      }

      return last - 1;
    }

    OLDgetChainStartIndices(pts) {
      let start = 0;
      const startIndexList = new ArrayList();
      startIndexList.add(start);

      do {
        const last = this.findChainEnd(pts, start);
        startIndexList.add(last);
        start = last;
      } while (start < pts.length - 1);

      const startIndex = MonotoneChainIndexer.toIntArray(startIndexList);
      return startIndex;
    }

  }

  class MonotoneChainEdge {
    constructor() {
      MonotoneChainEdge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.e = null;
      this.pts = null;
      this.startIndex = null;
      const e = arguments[0];
      this.e = e;
      this.pts = e.getCoordinates();
      const mcb = new MonotoneChainIndexer();
      this.startIndex = mcb.getChainStartIndices(this.pts);
    }

    getCoordinates() {
      return this.pts;
    }

    getMaxX(chainIndex) {
      const x1 = this.pts[this.startIndex[chainIndex]].x;
      const x2 = this.pts[this.startIndex[chainIndex + 1]].x;
      return x1 > x2 ? x1 : x2;
    }

    getMinX(chainIndex) {
      const x1 = this.pts[this.startIndex[chainIndex]].x;
      const x2 = this.pts[this.startIndex[chainIndex + 1]].x;
      return x1 < x2 ? x1 : x2;
    }

    computeIntersectsForChain() {
      if (arguments.length === 4) {
        const chainIndex0 = arguments[0],
              mce = arguments[1],
              chainIndex1 = arguments[2],
              si = arguments[3];
        this.computeIntersectsForChain(this.startIndex[chainIndex0], this.startIndex[chainIndex0 + 1], mce, mce.startIndex[chainIndex1], mce.startIndex[chainIndex1 + 1], si);
      } else if (arguments.length === 6) {
        const start0 = arguments[0],
              end0 = arguments[1],
              mce = arguments[2],
              start1 = arguments[3],
              end1 = arguments[4],
              ei = arguments[5];

        if (end0 - start0 === 1 && end1 - start1 === 1) {
          ei.addIntersections(this.e, start0, mce.e, start1);
          return null;
        }

        if (!this.overlaps(start0, end0, mce, start1, end1)) return null;
        const mid0 = Math.trunc((start0 + end0) / 2);
        const mid1 = Math.trunc((start1 + end1) / 2);

        if (start0 < mid0) {
          if (start1 < mid1) this.computeIntersectsForChain(start0, mid0, mce, start1, mid1, ei);
          if (mid1 < end1) this.computeIntersectsForChain(start0, mid0, mce, mid1, end1, ei);
        }

        if (mid0 < end0) {
          if (start1 < mid1) this.computeIntersectsForChain(mid0, end0, mce, start1, mid1, ei);
          if (mid1 < end1) this.computeIntersectsForChain(mid0, end0, mce, mid1, end1, ei);
        }
      }
    }

    overlaps(start0, end0, mce, start1, end1) {
      return Envelope.intersects(this.pts[start0], this.pts[end0], mce.pts[start1], mce.pts[end1]);
    }

    getStartIndexes() {
      return this.startIndex;
    }

    computeIntersects(mce, si) {
      for (let i = 0; i < this.startIndex.length - 1; i++) for (let j = 0; j < mce.startIndex.length - 1; j++) this.computeIntersectsForChain(i, mce, j, si);
    }

  }

  class Depth {
    constructor() {
      Depth.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._depth = Array(2).fill().map(() => Array(3));

      for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) this._depth[i][j] = Depth.NULL_VALUE;
    }

    static depthAtLocation(location) {
      if (location === Location.EXTERIOR) return 0;
      if (location === Location.INTERIOR) return 1;
      return Depth.NULL_VALUE;
    }

    getDepth(geomIndex, posIndex) {
      return this._depth[geomIndex][posIndex];
    }

    setDepth(geomIndex, posIndex, depthValue) {
      this._depth[geomIndex][posIndex] = depthValue;
    }

    isNull() {
      if (arguments.length === 0) {
        for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) if (this._depth[i][j] !== Depth.NULL_VALUE) return false;

        return true;
      } else if (arguments.length === 1) {
        const geomIndex = arguments[0];
        return this._depth[geomIndex][1] === Depth.NULL_VALUE;
      } else if (arguments.length === 2) {
        const geomIndex = arguments[0],
              posIndex = arguments[1];
        return this._depth[geomIndex][posIndex] === Depth.NULL_VALUE;
      }
    }

    normalize() {
      for (let i = 0; i < 2; i++) if (!this.isNull(i)) {
        let minDepth = this._depth[i][1];
        if (this._depth[i][2] < minDepth) minDepth = this._depth[i][2];
        if (minDepth < 0) minDepth = 0;

        for (let j = 1; j < 3; j++) {
          let newValue = 0;
          if (this._depth[i][j] > minDepth) newValue = 1;
          this._depth[i][j] = newValue;
        }
      }
    }

    getDelta(geomIndex) {
      return this._depth[geomIndex][Position.RIGHT] - this._depth[geomIndex][Position.LEFT];
    }

    getLocation(geomIndex, posIndex) {
      if (this._depth[geomIndex][posIndex] <= 0) return Location.EXTERIOR;
      return Location.INTERIOR;
    }

    toString() {
      return 'A: ' + this._depth[0][1] + ',' + this._depth[0][2] + ' B: ' + this._depth[1][1] + ',' + this._depth[1][2];
    }

    add() {
      if (arguments.length === 1) {
        const lbl = arguments[0];

        for (let i = 0; i < 2; i++) for (let j = 1; j < 3; j++) {
          const loc = lbl.getLocation(i, j);
          if (loc === Location.EXTERIOR || loc === Location.INTERIOR) if (this.isNull(i, j)) this._depth[i][j] = Depth.depthAtLocation(loc);else this._depth[i][j] += Depth.depthAtLocation(loc);
        }
      } else if (arguments.length === 3) {
        const geomIndex = arguments[0],
              posIndex = arguments[1],
              location = arguments[2];
        if (location === Location.INTERIOR) this._depth[geomIndex][posIndex]++;
      }
    }

  }
  Depth.NULL_VALUE = -1;

  class GraphComponent$1 {
    constructor() {
      GraphComponent$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._label = null;
      this._isInResult = false;
      this._isCovered = false;
      this._isCoveredSet = false;
      this._isVisited = false;

      if (arguments.length === 0) ; else if (arguments.length === 1) {
        const label = arguments[0];
        this._label = label;
      }
    }

    setVisited(isVisited) {
      this._isVisited = isVisited;
    }

    setInResult(isInResult) {
      this._isInResult = isInResult;
    }

    isCovered() {
      return this._isCovered;
    }

    isCoveredSet() {
      return this._isCoveredSet;
    }

    setLabel(label) {
      this._label = label;
    }

    getLabel() {
      return this._label;
    }

    setCovered(isCovered) {
      this._isCovered = isCovered;
      this._isCoveredSet = true;
    }

    updateIM(im) {
      Assert.isTrue(this._label.getGeometryCount() >= 2, 'found partial label');
      this.computeIM(im);
    }

    isInResult() {
      return this._isInResult;
    }

    isVisited() {
      return this._isVisited;
    }

  }

  class Edge$1 extends GraphComponent$1 {
    constructor() {
      super();
      Edge$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.pts = null;
      this._env = null;
      this.eiList = new EdgeIntersectionList(this);
      this._name = null;
      this._mce = null;
      this._isIsolated = true;
      this._depth = new Depth();
      this._depthDelta = 0;

      if (arguments.length === 1) {
        const pts = arguments[0];
        Edge$1.constructor_.call(this, pts, null);
      } else if (arguments.length === 2) {
        const pts = arguments[0],
              label = arguments[1];
        this.pts = pts;
        this._label = label;
      }
    }

    static updateIM() {
      if (arguments.length === 2 && arguments[1] instanceof IntersectionMatrix && arguments[0] instanceof Label) {
        const label = arguments[0],
              im = arguments[1];
        im.setAtLeastIfValid(label.getLocation(0, Position.ON), label.getLocation(1, Position.ON), 1);

        if (label.isArea()) {
          im.setAtLeastIfValid(label.getLocation(0, Position.LEFT), label.getLocation(1, Position.LEFT), 2);
          im.setAtLeastIfValid(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), 2);
        }
      } else {
        return super.updateIM.apply(this, arguments);
      }
    }

    getDepth() {
      return this._depth;
    }

    getCollapsedEdge() {
      const newPts = new Array(2).fill(null);
      newPts[0] = this.pts[0];
      newPts[1] = this.pts[1];
      const newe = new Edge$1(newPts, Label.toLineLabel(this._label));
      return newe;
    }

    isIsolated() {
      return this._isIsolated;
    }

    getCoordinates() {
      return this.pts;
    }

    setIsolated(isIsolated) {
      this._isIsolated = isIsolated;
    }

    setName(name) {
      this._name = name;
    }

    equals(o) {
      if (!(o instanceof Edge$1)) return false;
      const e = o;
      if (this.pts.length !== e.pts.length) return false;
      let isEqualForward = true;
      let isEqualReverse = true;
      let iRev = this.pts.length;

      for (let i = 0; i < this.pts.length; i++) {
        if (!this.pts[i].equals2D(e.pts[i])) isEqualForward = false;
        if (!this.pts[i].equals2D(e.pts[--iRev])) isEqualReverse = false;
        if (!isEqualForward && !isEqualReverse) return false;
      }

      return true;
    }

    getCoordinate() {
      if (arguments.length === 0) {
        if (this.pts.length > 0) return this.pts[0];
        return null;
      } else if (arguments.length === 1) {
        const i = arguments[0];
        return this.pts[i];
      }
    }

    print(out) {
      out.print('edge ' + this._name + ': ');
      out.print('LINESTRING (');

      for (let i = 0; i < this.pts.length; i++) {
        if (i > 0) out.print(',');
        out.print(this.pts[i].x + ' ' + this.pts[i].y);
      }

      out.print(')  ' + this._label + ' ' + this._depthDelta);
    }

    computeIM(im) {
      Edge$1.updateIM(this._label, im);
    }

    isCollapsed() {
      if (!this._label.isArea()) return false;
      if (this.pts.length !== 3) return false;
      if (this.pts[0].equals(this.pts[2])) return true;
      return false;
    }

    isClosed() {
      return this.pts[0].equals(this.pts[this.pts.length - 1]);
    }

    getMaximumSegmentIndex() {
      return this.pts.length - 1;
    }

    getDepthDelta() {
      return this._depthDelta;
    }

    getNumPoints() {
      return this.pts.length;
    }

    printReverse(out) {
      out.print('edge ' + this._name + ': ');

      for (let i = this.pts.length - 1; i >= 0; i--) out.print(this.pts[i] + ' ');

      out.println('');
    }

    getMonotoneChainEdge() {
      if (this._mce === null) this._mce = new MonotoneChainEdge(this);
      return this._mce;
    }

    getEnvelope() {
      if (this._env === null) {
        this._env = new Envelope();

        for (let i = 0; i < this.pts.length; i++) this._env.expandToInclude(this.pts[i]);
      }

      return this._env;
    }

    addIntersection(li, segmentIndex, geomIndex, intIndex) {
      const intPt = new Coordinate(li.getIntersection(intIndex));
      let normalizedSegmentIndex = segmentIndex;
      let dist = li.getEdgeDistance(geomIndex, intIndex);
      const nextSegIndex = normalizedSegmentIndex + 1;

      if (nextSegIndex < this.pts.length) {
        const nextPt = this.pts[nextSegIndex];

        if (intPt.equals2D(nextPt)) {
          normalizedSegmentIndex = nextSegIndex;
          dist = 0.0;
        }
      }

      this.eiList.add(intPt, normalizedSegmentIndex, dist);
    }

    toString() {
      const builder = new StringBuilder();
      builder.append('edge ' + this._name + ': ');
      builder.append('LINESTRING (');

      for (let i = 0; i < this.pts.length; i++) {
        if (i > 0) builder.append(',');
        builder.append(this.pts[i].x + ' ' + this.pts[i].y);
      }

      builder.append(')  ' + this._label + ' ' + this._depthDelta);
      return builder.toString();
    }

    isPointwiseEqual(e) {
      if (this.pts.length !== e.pts.length) return false;

      for (let i = 0; i < this.pts.length; i++) if (!this.pts[i].equals2D(e.pts[i])) return false;

      return true;
    }

    setDepthDelta(depthDelta) {
      this._depthDelta = depthDelta;
    }

    getEdgeIntersectionList() {
      return this.eiList;
    }

    addIntersections(li, segmentIndex, geomIndex) {
      for (let i = 0; i < li.getIntersectionNum(); i++) this.addIntersection(li, segmentIndex, geomIndex, i);
    }

  }

  class Node$2 extends GraphComponent$1 {
    constructor() {
      super();
      Node$2.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._coord = null;
      this._edges = null;
      const coord = arguments[0],
            edges = arguments[1];
      this._coord = coord;
      this._edges = edges;
      this._label = new Label(0, Location.NONE);
    }

    isIncidentEdgeInResult() {
      for (let it = this.getEdges().getEdges().iterator(); it.hasNext();) {
        const de = it.next();
        if (de.getEdge().isInResult()) return true;
      }

      return false;
    }

    isIsolated() {
      return this._label.getGeometryCount() === 1;
    }

    getCoordinate() {
      return this._coord;
    }

    print(out) {
      out.println('node ' + this._coord + ' lbl: ' + this._label);
    }

    computeIM(im) {}

    computeMergedLocation(label2, eltIndex) {
      let loc = Location.NONE;
      loc = this._label.getLocation(eltIndex);

      if (!label2.isNull(eltIndex)) {
        const nLoc = label2.getLocation(eltIndex);
        if (loc !== Location.BOUNDARY) loc = nLoc;
      }

      return loc;
    }

    setLabel() {
      if (arguments.length === 2 && Number.isInteger(arguments[1]) && Number.isInteger(arguments[0])) {
        const argIndex = arguments[0],
              onLocation = arguments[1];
        if (this._label === null) this._label = new Label(argIndex, onLocation);else this._label.setLocation(argIndex, onLocation);
      } else {
        return super.setLabel.apply(this, arguments);
      }
    }

    getEdges() {
      return this._edges;
    }

    mergeLabel() {
      if (arguments[0] instanceof Node$2) {
        const n = arguments[0];
        this.mergeLabel(n._label);
      } else if (arguments[0] instanceof Label) {
        const label2 = arguments[0];

        for (let i = 0; i < 2; i++) {
          const loc = this.computeMergedLocation(label2, i);

          const thisLoc = this._label.getLocation(i);

          if (thisLoc === Location.NONE) this._label.setLocation(i, loc);
        }
      }
    }

    add(e) {
      this._edges.insert(e);

      e.setNode(this);
    }

    setLabelBoundary(argIndex) {
      if (this._label === null) return null;
      let loc = Location.NONE;
      if (this._label !== null) loc = this._label.getLocation(argIndex);
      let newLoc = null;

      switch (loc) {
        case Location.BOUNDARY:
          newLoc = Location.INTERIOR;
          break;

        case Location.INTERIOR:
          newLoc = Location.BOUNDARY;
          break;

        default:
          newLoc = Location.BOUNDARY;
          break;
      }

      this._label.setLocation(argIndex, newLoc);
    }

  }

  class NodeMap$1 {
    constructor() {
      NodeMap$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.nodeMap = new TreeMap();
      this.nodeFact = null;
      const nodeFact = arguments[0];
      this.nodeFact = nodeFact;
    }

    find(coord) {
      return this.nodeMap.get(coord);
    }

    addNode() {
      if (arguments[0] instanceof Coordinate) {
        const coord = arguments[0];
        let node = this.nodeMap.get(coord);

        if (node === null) {
          node = this.nodeFact.createNode(coord);
          this.nodeMap.put(coord, node);
        }

        return node;
      } else if (arguments[0] instanceof Node$2) {
        const n = arguments[0];
        const node = this.nodeMap.get(n.getCoordinate());

        if (node === null) {
          this.nodeMap.put(n.getCoordinate(), n);
          return n;
        }

        node.mergeLabel(n);
        return node;
      }
    }

    print(out) {
      for (let it = this.iterator(); it.hasNext();) {
        const n = it.next();
        n.print(out);
      }
    }

    iterator() {
      return this.nodeMap.values().iterator();
    }

    values() {
      return this.nodeMap.values();
    }

    getBoundaryNodes(geomIndex) {
      const bdyNodes = new ArrayList();

      for (let i = this.iterator(); i.hasNext();) {
        const node = i.next();
        if (node.getLabel().getLocation(geomIndex) === Location.BOUNDARY) bdyNodes.add(node);
      }

      return bdyNodes;
    }

    add(e) {
      const p = e.getCoordinate();
      const n = this.addNode(p);
      n.add(e);
    }

  }

  class EdgeEnd {
    constructor() {
      EdgeEnd.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._edge = null;
      this._label = null;
      this._node = null;
      this._p0 = null;
      this._p1 = null;
      this._dx = null;
      this._dy = null;
      this._quadrant = null;

      if (arguments.length === 1) {
        const edge = arguments[0];
        this._edge = edge;
      } else if (arguments.length === 3) {
        const edge = arguments[0],
              p0 = arguments[1],
              p1 = arguments[2];
        EdgeEnd.constructor_.call(this, edge, p0, p1, null);
      } else if (arguments.length === 4) {
        const edge = arguments[0],
              p0 = arguments[1],
              p1 = arguments[2],
              label = arguments[3];
        EdgeEnd.constructor_.call(this, edge);
        this.init(p0, p1);
        this._label = label;
      }
    }

    compareDirection(e) {
      if (this._dx === e._dx && this._dy === e._dy) return 0;
      if (this._quadrant > e._quadrant) return 1;
      if (this._quadrant < e._quadrant) return -1;
      return Orientation.index(e._p0, e._p1, this._p1);
    }

    getDy() {
      return this._dy;
    }

    getCoordinate() {
      return this._p0;
    }

    setNode(node) {
      this._node = node;
    }

    print(out) {
      const angle = Math.atan2(this._dy, this._dx);
      const className = this.getClass().getName();
      const lastDotPos = className.lastIndexOf('.');
      const name = className.substring(lastDotPos + 1);
      out.print('  ' + name + ': ' + this._p0 + ' - ' + this._p1 + ' ' + this._quadrant + ':' + angle + '   ' + this._label);
    }

    compareTo(obj) {
      const e = obj;
      return this.compareDirection(e);
    }

    getDirectedCoordinate() {
      return this._p1;
    }

    getDx() {
      return this._dx;
    }

    getLabel() {
      return this._label;
    }

    getEdge() {
      return this._edge;
    }

    getQuadrant() {
      return this._quadrant;
    }

    getNode() {
      return this._node;
    }

    toString() {
      const angle = Math.atan2(this._dy, this._dx);
      const className = this.getClass().getName();
      const lastDotPos = className.lastIndexOf('.');
      const name = className.substring(lastDotPos + 1);
      return '  ' + name + ': ' + this._p0 + ' - ' + this._p1 + ' ' + this._quadrant + ':' + angle + '   ' + this._label;
    }

    computeLabel(boundaryNodeRule) {}

    init(p0, p1) {
      this._p0 = p0;
      this._p1 = p1;
      this._dx = p1.x - p0.x;
      this._dy = p1.y - p0.y;
      this._quadrant = Quadrant.quadrant(this._dx, this._dy);
      Assert.isTrue(!(this._dx === 0 && this._dy === 0), 'EdgeEnd with identical endpoints found');
    }

    get interfaces_() {
      return [Comparable];
    }

  }

  class TopologyException extends RuntimeException {
    constructor(msg, pt) {
      super(pt ? msg + ' [ ' + pt + ' ]' : msg);
      this.pt = pt ? new Coordinate(pt) : undefined;
      this.name = Object.keys({
        TopologyException
      })[0];
    }

    getCoordinate() {
      return this.pt;
    }

  }

  class DirectedEdge$1 extends EdgeEnd {
    constructor() {
      super();
      DirectedEdge$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._isForward = null;
      this._isInResult = false;
      this._isVisited = false;
      this._sym = null;
      this._next = null;
      this._nextMin = null;
      this._edgeRing = null;
      this._minEdgeRing = null;
      this._depth = [0, -999, -999];
      const edge = arguments[0],
            isForward = arguments[1];
      EdgeEnd.constructor_.call(this, edge);
      this._isForward = isForward;

      if (isForward) {
        this.init(edge.getCoordinate(0), edge.getCoordinate(1));
      } else {
        const n = edge.getNumPoints() - 1;
        this.init(edge.getCoordinate(n), edge.getCoordinate(n - 1));
      }

      this.computeDirectedLabel();
    }

    static depthFactor(currLocation, nextLocation) {
      if (currLocation === Location.EXTERIOR && nextLocation === Location.INTERIOR) return 1;else if (currLocation === Location.INTERIOR && nextLocation === Location.EXTERIOR) return -1;
      return 0;
    }

    getNextMin() {
      return this._nextMin;
    }

    getDepth(position) {
      return this._depth[position];
    }

    setVisited(isVisited) {
      this._isVisited = isVisited;
    }

    computeDirectedLabel() {
      this._label = new Label(this._edge.getLabel());
      if (!this._isForward) this._label.flip();
    }

    getNext() {
      return this._next;
    }

    setDepth(position, depthVal) {
      if (this._depth[position] !== -999) if (this._depth[position] !== depthVal) throw new TopologyException('assigned depths do not match', this.getCoordinate());
      this._depth[position] = depthVal;
    }

    isInteriorAreaEdge() {
      let isInteriorAreaEdge = true;

      for (let i = 0; i < 2; i++) if (!(this._label.isArea(i) && this._label.getLocation(i, Position.LEFT) === Location.INTERIOR && this._label.getLocation(i, Position.RIGHT) === Location.INTERIOR)) isInteriorAreaEdge = false;

      return isInteriorAreaEdge;
    }

    setNextMin(nextMin) {
      this._nextMin = nextMin;
    }

    print(out) {
      super.print.call(this, out);
      out.print(' ' + this._depth[Position.LEFT] + '/' + this._depth[Position.RIGHT]);
      out.print(' (' + this.getDepthDelta() + ')');
      if (this._isInResult) out.print(' inResult');
    }

    setMinEdgeRing(minEdgeRing) {
      this._minEdgeRing = minEdgeRing;
    }

    isLineEdge() {
      const isLine = this._label.isLine(0) || this._label.isLine(1);

      const isExteriorIfArea0 = !this._label.isArea(0) || this._label.allPositionsEqual(0, Location.EXTERIOR);

      const isExteriorIfArea1 = !this._label.isArea(1) || this._label.allPositionsEqual(1, Location.EXTERIOR);

      return isLine && isExteriorIfArea0 && isExteriorIfArea1;
    }

    setEdgeRing(edgeRing) {
      this._edgeRing = edgeRing;
    }

    getMinEdgeRing() {
      return this._minEdgeRing;
    }

    getDepthDelta() {
      let depthDelta = this._edge.getDepthDelta();

      if (!this._isForward) depthDelta = -depthDelta;
      return depthDelta;
    }

    setInResult(isInResult) {
      this._isInResult = isInResult;
    }

    getSym() {
      return this._sym;
    }

    isForward() {
      return this._isForward;
    }

    getEdge() {
      return this._edge;
    }

    printEdge(out) {
      this.print(out);
      out.print(' ');
      if (this._isForward) this._edge.print(out);else this._edge.printReverse(out);
    }

    setSym(de) {
      this._sym = de;
    }

    setVisitedEdge(isVisited) {
      this.setVisited(isVisited);

      this._sym.setVisited(isVisited);
    }

    setEdgeDepths(position, depth) {
      let depthDelta = this.getEdge().getDepthDelta();
      if (!this._isForward) depthDelta = -depthDelta;
      let directionFactor = 1;
      if (position === Position.LEFT) directionFactor = -1;
      const oppositePos = Position.opposite(position);
      const delta = depthDelta * directionFactor;
      const oppositeDepth = depth + delta;
      this.setDepth(position, depth);
      this.setDepth(oppositePos, oppositeDepth);
    }

    getEdgeRing() {
      return this._edgeRing;
    }

    isInResult() {
      return this._isInResult;
    }

    setNext(next) {
      this._next = next;
    }

    isVisited() {
      return this._isVisited;
    }

  }

  class NodeFactory {
    createNode(coord) {
      return new Node$2(coord, null);
    }

  }

  class PlanarGraph$1 {
    constructor() {
      PlanarGraph$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._edges = new ArrayList();
      this._nodes = null;
      this._edgeEndList = new ArrayList();

      if (arguments.length === 0) {
        this._nodes = new NodeMap$1(new NodeFactory());
      } else if (arguments.length === 1) {
        const nodeFact = arguments[0];
        this._nodes = new NodeMap$1(nodeFact);
      }
    }

    static linkResultDirectedEdges(nodes) {
      for (let nodeit = nodes.iterator(); nodeit.hasNext();) {
        const node = nodeit.next();
        node.getEdges().linkResultDirectedEdges();
      }
    }

    printEdges(out) {
      out.println('Edges:');

      for (let i = 0; i < this._edges.size(); i++) {
        out.println('edge ' + i + ':');

        const e = this._edges.get(i);

        e.print(out);
        e.eiList.print(out);
      }
    }

    find(coord) {
      return this._nodes.find(coord);
    }

    addNode() {
      if (arguments[0] instanceof Node$2) {
        const node = arguments[0];
        return this._nodes.addNode(node);
      } else if (arguments[0] instanceof Coordinate) {
        const coord = arguments[0];
        return this._nodes.addNode(coord);
      }
    }

    getNodeIterator() {
      return this._nodes.iterator();
    }

    linkResultDirectedEdges() {
      for (let nodeit = this._nodes.iterator(); nodeit.hasNext();) {
        const node = nodeit.next();
        node.getEdges().linkResultDirectedEdges();
      }
    }

    debugPrintln(o) {
      System.out.println(o);
    }

    isBoundaryNode(geomIndex, coord) {
      const node = this._nodes.find(coord);

      if (node === null) return false;
      const label = node.getLabel();
      if (label !== null && label.getLocation(geomIndex) === Location.BOUNDARY) return true;
      return false;
    }

    linkAllDirectedEdges() {
      for (let nodeit = this._nodes.iterator(); nodeit.hasNext();) {
        const node = nodeit.next();
        node.getEdges().linkAllDirectedEdges();
      }
    }

    matchInSameDirection(p0, p1, ep0, ep1) {
      if (!p0.equals(ep0)) return false;
      if (Orientation.index(p0, p1, ep1) === Orientation.COLLINEAR && Quadrant.quadrant(p0, p1) === Quadrant.quadrant(ep0, ep1)) return true;
      return false;
    }

    getEdgeEnds() {
      return this._edgeEndList;
    }

    debugPrint(o) {
      System.out.print(o);
    }

    getEdgeIterator() {
      return this._edges.iterator();
    }

    findEdgeInSameDirection(p0, p1) {
      for (let i = 0; i < this._edges.size(); i++) {
        const e = this._edges.get(i);

        const eCoord = e.getCoordinates();
        if (this.matchInSameDirection(p0, p1, eCoord[0], eCoord[1])) return e;
        if (this.matchInSameDirection(p0, p1, eCoord[eCoord.length - 1], eCoord[eCoord.length - 2])) return e;
      }

      return null;
    }

    insertEdge(e) {
      this._edges.add(e);
    }

    findEdgeEnd(e) {
      for (let i = this.getEdgeEnds().iterator(); i.hasNext();) {
        const ee = i.next();
        if (ee.getEdge() === e) return ee;
      }

      return null;
    }

    addEdges(edgesToAdd) {
      for (let it = edgesToAdd.iterator(); it.hasNext();) {
        const e = it.next();

        this._edges.add(e);

        const de1 = new DirectedEdge$1(e, true);
        const de2 = new DirectedEdge$1(e, false);
        de1.setSym(de2);
        de2.setSym(de1);
        this.add(de1);
        this.add(de2);
      }
    }

    add(e) {
      this._nodes.add(e);

      this._edgeEndList.add(e);
    }

    getNodes() {
      return this._nodes.values();
    }

    findEdge(p0, p1) {
      for (let i = 0; i < this._edges.size(); i++) {
        const e = this._edges.get(i);

        const eCoord = e.getCoordinates();
        if (p0.equals(eCoord[0]) && p1.equals(eCoord[1])) return e;
      }

      return null;
    }

  }

  class GeometryGraph extends PlanarGraph$1 {
    constructor() {
      super();
      GeometryGraph.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._parentGeom = null;
      this._lineEdgeMap = new HashMap();
      this._boundaryNodeRule = null;
      this._useBoundaryDeterminationRule = true;
      this._argIndex = null;
      this._boundaryNodes = null;
      this._hasTooFewPoints = false;
      this._invalidPoint = null;
      this._areaPtLocator = null;
      this._ptLocator = new PointLocator();

      if (arguments.length === 2) {
        const argIndex = arguments[0],
              parentGeom = arguments[1];
        GeometryGraph.constructor_.call(this, argIndex, parentGeom, BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE);
      } else if (arguments.length === 3) {
        const argIndex = arguments[0],
              parentGeom = arguments[1],
              boundaryNodeRule = arguments[2];
        this._argIndex = argIndex;
        this._parentGeom = parentGeom;
        this._boundaryNodeRule = boundaryNodeRule;
        if (parentGeom !== null) this.add(parentGeom);
      }
    }

    static determineBoundary(boundaryNodeRule, boundaryCount) {
      return boundaryNodeRule.isInBoundary(boundaryCount) ? Location.BOUNDARY : Location.INTERIOR;
    }

    insertBoundaryPoint(argIndex, coord) {
      const n = this._nodes.addNode(coord);

      const lbl = n.getLabel();
      let boundaryCount = 1;
      let loc = Location.NONE;
      loc = lbl.getLocation(argIndex, Position.ON);
      if (loc === Location.BOUNDARY) boundaryCount++;
      const newLoc = GeometryGraph.determineBoundary(this._boundaryNodeRule, boundaryCount);
      lbl.setLocation(argIndex, newLoc);
    }

    computeSelfNodes() {
      if (arguments.length === 2) {
        const li = arguments[0],
              computeRingSelfNodes = arguments[1];
        return this.computeSelfNodes(li, computeRingSelfNodes, false);
      } else if (arguments.length === 3) {
        const li = arguments[0],
              computeRingSelfNodes = arguments[1],
              isDoneIfProperInt = arguments[2];
        const si = new SegmentIntersector$1(li, true, false);
        si.setIsDoneIfProperInt(isDoneIfProperInt);
        const esi = this.createEdgeSetIntersector();
        const isRings = this._parentGeom instanceof LinearRing || this._parentGeom instanceof Polygon || this._parentGeom instanceof MultiPolygon;
        const computeAllSegments = computeRingSelfNodes || !isRings;
        esi.computeIntersections(this._edges, si, computeAllSegments);
        this.addSelfIntersectionNodes(this._argIndex);
        return si;
      }
    }

    computeSplitEdges(edgelist) {
      for (let i = this._edges.iterator(); i.hasNext();) {
        const e = i.next();
        e.eiList.addSplitEdges(edgelist);
      }
    }

    computeEdgeIntersections(g, li, includeProper) {
      const si = new SegmentIntersector$1(li, includeProper, true);
      si.setBoundaryNodes(this.getBoundaryNodes(), g.getBoundaryNodes());
      const esi = this.createEdgeSetIntersector();
      esi.computeIntersections(this._edges, g._edges, si);
      return si;
    }

    getGeometry() {
      return this._parentGeom;
    }

    getBoundaryNodeRule() {
      return this._boundaryNodeRule;
    }

    hasTooFewPoints() {
      return this._hasTooFewPoints;
    }

    addPoint() {
      if (arguments[0] instanceof Point) {
        const p = arguments[0];
        const coord = p.getCoordinate();
        this.insertPoint(this._argIndex, coord, Location.INTERIOR);
      } else if (arguments[0] instanceof Coordinate) {
        const pt = arguments[0];
        this.insertPoint(this._argIndex, pt, Location.INTERIOR);
      }
    }

    addPolygon(p) {
      this.addPolygonRing(p.getExteriorRing(), Location.EXTERIOR, Location.INTERIOR);

      for (let i = 0; i < p.getNumInteriorRing(); i++) {
        const hole = p.getInteriorRingN(i);
        this.addPolygonRing(hole, Location.INTERIOR, Location.EXTERIOR);
      }
    }

    addEdge(e) {
      this.insertEdge(e);
      const coord = e.getCoordinates();
      this.insertPoint(this._argIndex, coord[0], Location.BOUNDARY);
      this.insertPoint(this._argIndex, coord[coord.length - 1], Location.BOUNDARY);
    }

    addLineString(line) {
      const coord = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());

      if (coord.length < 2) {
        this._hasTooFewPoints = true;
        this._invalidPoint = coord[0];
        return null;
      }

      const e = new Edge$1(coord, new Label(this._argIndex, Location.INTERIOR));

      this._lineEdgeMap.put(line, e);

      this.insertEdge(e);
      Assert.isTrue(coord.length >= 2, 'found LineString with single point');
      this.insertBoundaryPoint(this._argIndex, coord[0]);
      this.insertBoundaryPoint(this._argIndex, coord[coord.length - 1]);
    }

    getInvalidPoint() {
      return this._invalidPoint;
    }

    getBoundaryPoints() {
      const coll = this.getBoundaryNodes();
      const pts = new Array(coll.size()).fill(null);
      let i = 0;

      for (let it = coll.iterator(); it.hasNext();) {
        const node = it.next();
        pts[i++] = node.getCoordinate().copy();
      }

      return pts;
    }

    getBoundaryNodes() {
      if (this._boundaryNodes === null) this._boundaryNodes = this._nodes.getBoundaryNodes(this._argIndex);
      return this._boundaryNodes;
    }

    addSelfIntersectionNode(argIndex, coord, loc) {
      if (this.isBoundaryNode(argIndex, coord)) return null;
      if (loc === Location.BOUNDARY && this._useBoundaryDeterminationRule) this.insertBoundaryPoint(argIndex, coord);else this.insertPoint(argIndex, coord, loc);
    }

    addPolygonRing(lr, cwLeft, cwRight) {
      if (lr.isEmpty()) return null;
      const coord = CoordinateArrays.removeRepeatedPoints(lr.getCoordinates());

      if (coord.length < 4) {
        this._hasTooFewPoints = true;
        this._invalidPoint = coord[0];
        return null;
      }

      let left = cwLeft;
      let right = cwRight;

      if (Orientation.isCCW(coord)) {
        left = cwRight;
        right = cwLeft;
      }

      const e = new Edge$1(coord, new Label(this._argIndex, Location.BOUNDARY, left, right));

      this._lineEdgeMap.put(lr, e);

      this.insertEdge(e);
      this.insertPoint(this._argIndex, coord[0], Location.BOUNDARY);
    }

    insertPoint(argIndex, coord, onLocation) {
      const n = this._nodes.addNode(coord);

      const lbl = n.getLabel();
      if (lbl === null) n._label = new Label(argIndex, onLocation);else lbl.setLocation(argIndex, onLocation);
    }

    createEdgeSetIntersector() {
      return new SimpleMCSweepLineIntersector();
    }

    addSelfIntersectionNodes(argIndex) {
      for (let i = this._edges.iterator(); i.hasNext();) {
        const e = i.next();
        const eLoc = e.getLabel().getLocation(argIndex);

        for (let eiIt = e.eiList.iterator(); eiIt.hasNext();) {
          const ei = eiIt.next();
          this.addSelfIntersectionNode(argIndex, ei.coord, eLoc);
        }
      }
    }

    add() {
      if (arguments.length === 1 && arguments[0] instanceof Geometry) {
        const g = arguments[0];
        if (g.isEmpty()) return null;
        if (g instanceof MultiPolygon) this._useBoundaryDeterminationRule = false;
        if (g instanceof Polygon) this.addPolygon(g);else if (g instanceof LineString) this.addLineString(g);else if (g instanceof Point) this.addPoint(g);else if (g instanceof MultiPoint) this.addCollection(g);else if (g instanceof MultiLineString) this.addCollection(g);else if (g instanceof MultiPolygon) this.addCollection(g);else if (g instanceof GeometryCollection) this.addCollection(g);else throw new UnsupportedOperationException(g.getGeometryType());
      } else {
        return super.add.apply(this, arguments);
      }
    }

    addCollection(gc) {
      for (let i = 0; i < gc.getNumGeometries(); i++) {
        const g = gc.getGeometryN(i);
        this.add(g);
      }
    }

    locate(pt) {
      if (hasInterface(this._parentGeom, Polygonal) && this._parentGeom.getNumGeometries() > 50) {
        if (this._areaPtLocator === null) this._areaPtLocator = new IndexedPointInAreaLocator(this._parentGeom);
        return this._areaPtLocator.locate(pt);
      }

      return this._ptLocator.locate(pt, this._parentGeom);
    }

    findEdge() {
      if (arguments.length === 1 && arguments[0] instanceof LineString) {
        const line = arguments[0];
        return this._lineEdgeMap.get(line);
      } else {
        return super.findEdge.apply(this, arguments);
      }
    }

  }

  var geomgraph = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GeometryGraph: GeometryGraph
  });

  class KdNodeVisitor {
    visit(node) {}

  }

  class KdNode {
    constructor() {
      KdNode.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._p = null;
      this._data = null;
      this._left = null;
      this._right = null;
      this._count = null;

      if (arguments.length === 2) {
        const p = arguments[0],
              data = arguments[1];
        this._p = new Coordinate(p);
        this._left = null;
        this._right = null;
        this._count = 1;
        this._data = data;
      } else if (arguments.length === 3) {
        const _x = arguments[0],
              _y = arguments[1],
              data = arguments[2];
        this._p = new Coordinate(_x, _y);
        this._left = null;
        this._right = null;
        this._count = 1;
        this._data = data;
      }
    }

    isRepeated() {
      return this._count > 1;
    }

    getRight() {
      return this._right;
    }

    getCoordinate() {
      return this._p;
    }

    setLeft(_left) {
      this._left = _left;
    }

    getX() {
      return this._p.x;
    }

    getData() {
      return this._data;
    }

    getCount() {
      return this._count;
    }

    getLeft() {
      return this._left;
    }

    getY() {
      return this._p.y;
    }

    increment() {
      this._count = this._count + 1;
    }

    setRight(_right) {
      this._right = _right;
    }

  }

  class KdTree {
    constructor() {
      KdTree.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._root = null;
      this._numberOfNodes = null;
      this._tolerance = null;

      if (arguments.length === 0) {
        KdTree.constructor_.call(this, 0.0);
      } else if (arguments.length === 1) {
        const tolerance = arguments[0];
        this._tolerance = tolerance;
      }
    }

    static toCoordinates() {
      if (arguments.length === 1) {
        const kdnodes = arguments[0];
        return KdTree.toCoordinates(kdnodes, false);
      } else if (arguments.length === 2) {
        const kdnodes = arguments[0],
              includeRepeated = arguments[1];
        const coord = new CoordinateList();

        for (let it = kdnodes.iterator(); it.hasNext();) {
          const node = it.next();
          const count = includeRepeated ? node.getCount() : 1;

          for (let i = 0; i < count; i++) coord.add(node.getCoordinate(), true);
        }

        return coord.toCoordinateArray();
      }
    }

    insert() {
      if (arguments.length === 1) {
        const p = arguments[0];
        return this.insert(p, null);
      } else if (arguments.length === 2) {
        const p = arguments[0],
              data = arguments[1];

        if (this._root === null) {
          this._root = new KdNode(p, data);
          return this._root;
        }

        if (this._tolerance > 0) {
          const matchNode = this.findBestMatchNode(p);

          if (matchNode !== null) {
            matchNode.increment();
            return matchNode;
          }
        }

        return this.insertExact(p, data);
      }
    }

    query() {
      if (arguments.length === 1) {
        const queryEnv = arguments[0];
        const result = new ArrayList();
        this.query(queryEnv, result);
        return result;
      } else if (arguments.length === 2) {
        if (arguments[0] instanceof Envelope && hasInterface(arguments[1], List)) {
          const queryEnv = arguments[0],
                result = arguments[1];
          this.queryNode(this._root, queryEnv, true, new class {
            get interfaces_() {
              return [KdNodeVisitor];
            }

            visit(node) {
              result.add(node);
            }

          }());
        } else if (arguments[0] instanceof Envelope && hasInterface(arguments[1], KdNodeVisitor)) {
          const queryEnv = arguments[0],
                visitor = arguments[1];
          this.queryNode(this._root, queryEnv, true, visitor);
        }
      }
    }

    queryNode(currentNode, queryEnv, odd, visitor) {
      if (currentNode === null) return null;
      let min = null;
      let max = null;
      let discriminant = null;

      if (odd) {
        min = queryEnv.getMinX();
        max = queryEnv.getMaxX();
        discriminant = currentNode.getX();
      } else {
        min = queryEnv.getMinY();
        max = queryEnv.getMaxY();
        discriminant = currentNode.getY();
      }

      const searchLeft = min < discriminant;
      const searchRight = discriminant <= max;
      if (searchLeft) this.queryNode(currentNode.getLeft(), queryEnv, !odd, visitor);
      if (queryEnv.contains(currentNode.getCoordinate())) visitor.visit(currentNode);
      if (searchRight) this.queryNode(currentNode.getRight(), queryEnv, !odd, visitor);
    }

    findBestMatchNode(p) {
      const visitor = new BestMatchVisitor(p, this._tolerance);
      this.query(visitor.queryEnvelope(), visitor);
      return visitor.getNode();
    }

    isEmpty() {
      if (this._root === null) return true;
      return false;
    }

    insertExact(p, data) {
      let currentNode = this._root;
      let leafNode = this._root;
      let isOddLevel = true;
      let isLessThan = true;

      while (currentNode !== null) {
        if (currentNode !== null) {
          const isInTolerance = p.distance(currentNode.getCoordinate()) <= this._tolerance;

          if (isInTolerance) {
            currentNode.increment();
            return currentNode;
          }
        }

        if (isOddLevel) isLessThan = p.x < currentNode.getX();else isLessThan = p.y < currentNode.getY();
        leafNode = currentNode;
        if (isLessThan) currentNode = currentNode.getLeft();else currentNode = currentNode.getRight();
        isOddLevel = !isOddLevel;
      }

      this._numberOfNodes = this._numberOfNodes + 1;
      const node = new KdNode(p, data);
      if (isLessThan) leafNode.setLeft(node);else leafNode.setRight(node);
      return node;
    }

  }

  class BestMatchVisitor {
    constructor() {
      BestMatchVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._tolerance = null;
      this._matchNode = null;
      this._matchDist = 0.0;
      this._p = null;
      const p = arguments[0],
            tolerance = arguments[1];
      this._p = p;
      this._tolerance = tolerance;
    }

    visit(node) {
      const dist = this._p.distance(node.getCoordinate());

      const isInTolerance = dist <= this._tolerance;
      if (!isInTolerance) return null;
      let update = false;
      if (this._matchNode === null || dist < this._matchDist || this._matchNode !== null && dist === this._matchDist && node.getCoordinate().compareTo(this._matchNode.getCoordinate()) < 1) update = true;

      if (update) {
        this._matchNode = node;
        this._matchDist = dist;
      }
    }

    queryEnvelope() {
      const queryEnv = new Envelope(this._p);
      queryEnv.expandBy(this._tolerance);
      return queryEnv;
    }

    getNode() {
      return this._matchNode;
    }

    get interfaces_() {
      return [KdNodeVisitor];
    }

  }

  KdTree.BestMatchVisitor = BestMatchVisitor;

  var kdtree = /*#__PURE__*/Object.freeze({
    __proto__: null,
    KdTree: KdTree
  });

  class NodeBase {
    constructor() {
      NodeBase.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._items = new ArrayList();
      this._subnode = new Array(4).fill(null);
    }

    static getSubnodeIndex(env, centrex, centrey) {
      let subnodeIndex = -1;

      if (env.getMinX() >= centrex) {
        if (env.getMinY() >= centrey) subnodeIndex = 3;
        if (env.getMaxY() <= centrey) subnodeIndex = 1;
      }

      if (env.getMaxX() <= centrex) {
        if (env.getMinY() >= centrey) subnodeIndex = 2;
        if (env.getMaxY() <= centrey) subnodeIndex = 0;
      }

      return subnodeIndex;
    }

    hasChildren() {
      for (let i = 0; i < 4; i++) if (this._subnode[i] !== null) return true;

      return false;
    }

    isPrunable() {
      return !(this.hasChildren() || this.hasItems());
    }

    addAllItems(resultItems) {
      resultItems.addAll(this._items);

      for (let i = 0; i < 4; i++) if (this._subnode[i] !== null) this._subnode[i].addAllItems(resultItems);

      return resultItems;
    }

    getNodeCount() {
      let subSize = 0;

      for (let i = 0; i < 4; i++) if (this._subnode[i] !== null) subSize += this._subnode[i].size();

      return subSize + 1;
    }

    size() {
      let subSize = 0;

      for (let i = 0; i < 4; i++) if (this._subnode[i] !== null) subSize += this._subnode[i].size();

      return subSize + this._items.size();
    }

    addAllItemsFromOverlapping(searchEnv, resultItems) {
      if (!this.isSearchMatch(searchEnv)) return null;
      resultItems.addAll(this._items);

      for (let i = 0; i < 4; i++) if (this._subnode[i] !== null) this._subnode[i].addAllItemsFromOverlapping(searchEnv, resultItems);
    }

    visitItems(searchEnv, visitor) {
      for (let i = this._items.iterator(); i.hasNext();) visitor.visitItem(i.next());
    }

    hasItems() {
      return !this._items.isEmpty();
    }

    remove(itemEnv, item) {
      if (!this.isSearchMatch(itemEnv)) return false;
      let found = false;

      for (let i = 0; i < 4; i++) if (this._subnode[i] !== null) {
        found = this._subnode[i].remove(itemEnv, item);

        if (found) {
          if (this._subnode[i].isPrunable()) this._subnode[i] = null;
          break;
        }
      }

      if (found) return found;
      found = this._items.remove(item);
      return found;
    }

    visit(searchEnv, visitor) {
      if (!this.isSearchMatch(searchEnv)) return null;
      this.visitItems(searchEnv, visitor);

      for (let i = 0; i < 4; i++) if (this._subnode[i] !== null) this._subnode[i].visit(searchEnv, visitor);
    }

    getItems() {
      return this._items;
    }

    depth() {
      let maxSubDepth = 0;

      for (let i = 0; i < 4; i++) if (this._subnode[i] !== null) {
        const sqd = this._subnode[i].depth();

        if (sqd > maxSubDepth) maxSubDepth = sqd;
      }

      return maxSubDepth + 1;
    }

    isEmpty() {
      let isEmpty = true;
      if (!this._items.isEmpty()) isEmpty = false;else for (let i = 0; i < 4; i++) if (this._subnode[i] !== null) if (!this._subnode[i].isEmpty()) {
        isEmpty = false;
        break;
      }
      return isEmpty;
    }

    add(item) {
      this._items.add(item);
    }

    get interfaces_() {
      return [Serializable];
    }

  }

  function DoubleBits() {}

  DoubleBits.exponent = function (d) {
    return CVTFWD(64, d) - 1023;
  };

  DoubleBits.powerOf2 = function (exp) {
    return Math.pow(2, exp);
  };
  /**
   * Calculates the exponent of the bit-pattern for a number. Uses code from:
   * http://www.merlyn.demon.co.uk/js-exact.htm
   *
   * @param {Number}
   *          NumW 32 or 64 to denote the number of bits.
   * @param {Number}
   *          Qty the number to calculate the bit pattern for.
   * @return {Number} The integer value of the exponent.
   * @private
   */


  function CVTFWD(NumW, Qty) {
    let Sign;
    let Expo;
    let Mant;
    let Bin;
    const Inf = {
      32: {
        d: 0x7F,
        c: 0x80,
        b: 0,
        a: 0
      },
      64: {
        d: 0x7FF0,
        c: 0,
        b: 0,
        a: 0
      }
    };
    const ExW = {
      32: 8,
      64: 11
    }[NumW];

    if (!Bin) {
      Sign = Qty < 0 || 1 / Qty < 0; // OK for +-0

      if (!isFinite(Qty)) {
        Bin = Inf[NumW];
        if (Sign) Bin.d += 1 << NumW / 4 - 1;
        Expo = Math.pow(2, ExW) - 1;
        Mant = 0;
      }
    }

    if (!Bin) {
      Expo = {
        32: 127,
        64: 1023
      }[NumW];
      Mant = Math.abs(Qty);

      while (Mant >= 2) {
        Expo++;
        Mant /= 2;
      }

      while (Mant < 1 && Expo > 0) {
        Expo--;
        Mant *= 2;
      }

      if (Expo <= 0) Mant /= 2;

      if (NumW === 32 && Expo > 254) {
        Bin = {
          d: Sign ? 0xFF : 0x7F,
          c: 0x80,
          b: 0,
          a: 0
        };
        Expo = Math.pow(2, ExW) - 1;
        Mant = 0;
      }
    }

    return Expo;
  }

  class Key {
    constructor() {
      Key.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pt = new Coordinate();
      this._level = 0;
      this._env = null;
      const itemEnv = arguments[0];
      this.computeKey(itemEnv);
    }

    static computeQuadLevel(env) {
      const dx = env.getWidth();
      const dy = env.getHeight();
      const dMax = dx > dy ? dx : dy;
      const level = DoubleBits.exponent(dMax) + 1;
      return level;
    }

    getLevel() {
      return this._level;
    }

    computeKey() {
      if (arguments.length === 1) {
        const itemEnv = arguments[0];
        this._level = Key.computeQuadLevel(itemEnv);
        this._env = new Envelope();
        this.computeKey(this._level, itemEnv);

        while (!this._env.contains(itemEnv)) {
          this._level += 1;
          this.computeKey(this._level, itemEnv);
        }
      } else if (arguments.length === 2) {
        const level = arguments[0],
              itemEnv = arguments[1];
        const quadSize = DoubleBits.powerOf2(level);
        this._pt.x = Math.floor(itemEnv.getMinX() / quadSize) * quadSize;
        this._pt.y = Math.floor(itemEnv.getMinY() / quadSize) * quadSize;

        this._env.init(this._pt.x, this._pt.x + quadSize, this._pt.y, this._pt.y + quadSize);
      }
    }

    getEnvelope() {
      return this._env;
    }

    getCentre() {
      return new Coordinate((this._env.getMinX() + this._env.getMaxX()) / 2, (this._env.getMinY() + this._env.getMaxY()) / 2);
    }

    getPoint() {
      return this._pt;
    }

  }

  class Node$1 extends NodeBase {
    constructor() {
      super();
      Node$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._env = null;
      this._centrex = null;
      this._centrey = null;
      this._level = null;
      const env = arguments[0],
            level = arguments[1];
      this._env = env;
      this._level = level;
      this._centrex = (env.getMinX() + env.getMaxX()) / 2;
      this._centrey = (env.getMinY() + env.getMaxY()) / 2;
    }

    static createNode(env) {
      const key = new Key(env);
      const node = new Node$1(key.getEnvelope(), key.getLevel());
      return node;
    }

    static createExpanded(node, addEnv) {
      const expandEnv = new Envelope(addEnv);
      if (node !== null) expandEnv.expandToInclude(node._env);
      const largerNode = Node$1.createNode(expandEnv);
      if (node !== null) largerNode.insertNode(node);
      return largerNode;
    }

    find(searchEnv) {
      const subnodeIndex = NodeBase.getSubnodeIndex(searchEnv, this._centrex, this._centrey);
      if (subnodeIndex === -1) return this;

      if (this._subnode[subnodeIndex] !== null) {
        const node = this._subnode[subnodeIndex];
        return node.find(searchEnv);
      }

      return this;
    }

    isSearchMatch(searchEnv) {
      if (searchEnv === null) return false;
      return this._env.intersects(searchEnv);
    }

    getSubnode(index) {
      if (this._subnode[index] === null) this._subnode[index] = this.createSubnode(index);
      return this._subnode[index];
    }

    getEnvelope() {
      return this._env;
    }

    getNode(searchEnv) {
      const subnodeIndex = NodeBase.getSubnodeIndex(searchEnv, this._centrex, this._centrey);

      if (subnodeIndex !== -1) {
        const node = this.getSubnode(subnodeIndex);
        return node.getNode(searchEnv);
      } else {
        return this;
      }
    }

    createSubnode(index) {
      let minx = 0.0;
      let maxx = 0.0;
      let miny = 0.0;
      let maxy = 0.0;

      switch (index) {
        case 0:
          minx = this._env.getMinX();
          maxx = this._centrex;
          miny = this._env.getMinY();
          maxy = this._centrey;
          break;

        case 1:
          minx = this._centrex;
          maxx = this._env.getMaxX();
          miny = this._env.getMinY();
          maxy = this._centrey;
          break;

        case 2:
          minx = this._env.getMinX();
          maxx = this._centrex;
          miny = this._centrey;
          maxy = this._env.getMaxY();
          break;

        case 3:
          minx = this._centrex;
          maxx = this._env.getMaxX();
          miny = this._centrey;
          maxy = this._env.getMaxY();
          break;
      }

      const sqEnv = new Envelope(minx, maxx, miny, maxy);
      const node = new Node$1(sqEnv, this._level - 1);
      return node;
    }

    insertNode(node) {
      Assert.isTrue(this._env === null || this._env.contains(node._env));
      const index = NodeBase.getSubnodeIndex(node._env, this._centrex, this._centrey);

      if (node._level === this._level - 1) {
        this._subnode[index] = node;
      } else {
        const childNode = this.createSubnode(index);
        childNode.insertNode(node);
        this._subnode[index] = childNode;
      }
    }

  }

  class IntervalSize {
    static isZeroWidth(min, max) {
      const width = max - min;
      if (width === 0.0) return true;
      const maxAbs = Math.max(Math.abs(min), Math.abs(max));
      const scaledInterval = width / maxAbs;
      const level = DoubleBits.exponent(scaledInterval);
      return level <= IntervalSize.MIN_BINARY_EXPONENT;
    }

  }
  IntervalSize.MIN_BINARY_EXPONENT = -50;

  class Root extends NodeBase {
    constructor() {
      super();
    }

    insert(itemEnv, item) {
      const index = NodeBase.getSubnodeIndex(itemEnv, Root.origin.x, Root.origin.y);

      if (index === -1) {
        this.add(item);
        return null;
      }

      const node = this._subnode[index];

      if (node === null || !node.getEnvelope().contains(itemEnv)) {
        const largerNode = Node$1.createExpanded(node, itemEnv);
        this._subnode[index] = largerNode;
      }

      this.insertContained(this._subnode[index], itemEnv, item);
    }

    isSearchMatch(searchEnv) {
      return true;
    }

    insertContained(tree, itemEnv, item) {
      Assert.isTrue(tree.getEnvelope().contains(itemEnv));
      const isZeroX = IntervalSize.isZeroWidth(itemEnv.getMinX(), itemEnv.getMaxX());
      const isZeroY = IntervalSize.isZeroWidth(itemEnv.getMinY(), itemEnv.getMaxY());
      let node = null;
      if (isZeroX || isZeroY) node = tree.find(itemEnv);else node = tree.getNode(itemEnv);
      node.add(item);
    }

  }
  Root.origin = new Coordinate(0.0, 0.0);

  class SpatialIndex {
    insert(itemEnv, item) {}

    remove(itemEnv, item) {}

    query() {
    }

  }

  class Quadtree {
    constructor() {
      Quadtree.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._root = null;
      this._minExtent = 1.0;
      this._root = new Root();
    }

    static ensureExtent(itemEnv, minExtent) {
      let minx = itemEnv.getMinX();
      let maxx = itemEnv.getMaxX();
      let miny = itemEnv.getMinY();
      let maxy = itemEnv.getMaxY();
      if (minx !== maxx && miny !== maxy) return itemEnv;

      if (minx === maxx) {
        minx = minx - minExtent / 2.0;
        maxx = maxx + minExtent / 2.0;
      }

      if (miny === maxy) {
        miny = miny - minExtent / 2.0;
        maxy = maxy + minExtent / 2.0;
      }

      return new Envelope(minx, maxx, miny, maxy);
    }

    size() {
      if (this._root !== null) return this._root.size();
      return 0;
    }

    insert(itemEnv, item) {
      this.collectStats(itemEnv);
      const insertEnv = Quadtree.ensureExtent(itemEnv, this._minExtent);

      this._root.insert(insertEnv, item);
    }

    query() {
      if (arguments.length === 1) {
        const searchEnv = arguments[0];
        const visitor = new ArrayListVisitor();
        this.query(searchEnv, visitor);
        return visitor.getItems();
      } else if (arguments.length === 2) {
        const searchEnv = arguments[0],
              visitor = arguments[1];

        this._root.visit(searchEnv, visitor);
      }
    }

    queryAll() {
      const foundItems = new ArrayList();

      this._root.addAllItems(foundItems);

      return foundItems;
    }

    remove(itemEnv, item) {
      const posEnv = Quadtree.ensureExtent(itemEnv, this._minExtent);
      return this._root.remove(posEnv, item);
    }

    collectStats(itemEnv) {
      const delX = itemEnv.getWidth();
      if (delX < this._minExtent && delX > 0.0) this._minExtent = delX;
      const delY = itemEnv.getHeight();
      if (delY < this._minExtent && delY > 0.0) this._minExtent = delY;
    }

    depth() {
      if (this._root !== null) return this._root.depth();
      return 0;
    }

    isEmpty() {
      if (this._root === null) return true;
      return this._root.isEmpty();
    }

    get interfaces_() {
      return [SpatialIndex, Serializable];
    }

  }

  var quadtree = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Quadtree: Quadtree
  });

  class Boundable {
    getBounds() {}

  }

  class ItemBoundable {
    constructor() {
      ItemBoundable.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._bounds = null;
      this._item = null;
      const bounds = arguments[0],
            item = arguments[1];
      this._bounds = bounds;
      this._item = item;
    }

    getItem() {
      return this._item;
    }

    getBounds() {
      return this._bounds;
    }

    get interfaces_() {
      return [Boundable, Serializable];
    }

  }

  class PriorityQueue {
    constructor() {
      PriorityQueue.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._size = null;
      this._items = null;
      this._size = 0;
      this._items = new ArrayList();

      this._items.add(null);
    }

    poll() {
      if (this.isEmpty()) return null;

      const minItem = this._items.get(1);

      this._items.set(1, this._items.get(this._size));

      this._size -= 1;
      this.reorder(1);
      return minItem;
    }

    size() {
      return this._size;
    }

    reorder(hole) {
      let child = null;

      const tmp = this._items.get(hole);

      for (; hole * 2 <= this._size; hole = child) {
        child = hole * 2;
        if (child !== this._size && this._items.get(child + 1).compareTo(this._items.get(child)) < 0) child++;
        if (this._items.get(child).compareTo(tmp) < 0) this._items.set(hole, this._items.get(child));else break;
      }

      this._items.set(hole, tmp);
    }

    clear() {
      this._size = 0;

      this._items.clear();
    }

    peek() {
      if (this.isEmpty()) return null;

      const minItem = this._items.get(1);

      return minItem;
    }

    isEmpty() {
      return this._size === 0;
    }

    add(x) {
      this._items.add(null);

      this._size += 1;
      let hole = this._size;

      this._items.set(0, x);

      for (; x.compareTo(this._items.get(Math.trunc(hole / 2))) < 0; hole /= 2) this._items.set(hole, this._items.get(Math.trunc(hole / 2)));

      this._items.set(hole, x);
    }

  }

  class AbstractNode {
    constructor() {
      AbstractNode.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._childBoundables = new ArrayList();
      this._bounds = null;
      this._level = null;

      if (arguments.length === 0) ; else if (arguments.length === 1) {
        const level = arguments[0];
        this._level = level;
      }
    }

    getLevel() {
      return this._level;
    }

    size() {
      return this._childBoundables.size();
    }

    getChildBoundables() {
      return this._childBoundables;
    }

    addChildBoundable(childBoundable) {
      Assert.isTrue(this._bounds === null);

      this._childBoundables.add(childBoundable);
    }

    isEmpty() {
      return this._childBoundables.isEmpty();
    }

    getBounds() {
      if (this._bounds === null) this._bounds = this.computeBounds();
      return this._bounds;
    }

    get interfaces_() {
      return [Boundable, Serializable];
    }

  }

  class EnvelopeDistance {
    static maxDistance(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
      let dist = EnvelopeDistance.distance(ax1, ay1, bx1, by1);
      dist = Math.max(dist, EnvelopeDistance.distance(ax1, ay1, bx2, by2));
      dist = Math.max(dist, EnvelopeDistance.distance(ax2, ay2, bx1, by1));
      dist = Math.max(dist, EnvelopeDistance.distance(ax2, ay2, bx2, by2));
      return dist;
    }

    static distance(x1, y1, x2, y2) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }

    static maximumDistance(env1, env2) {
      const minx = Math.min(env1.getMinX(), env2.getMinX());
      const miny = Math.min(env1.getMinY(), env2.getMinY());
      const maxx = Math.max(env1.getMaxX(), env2.getMaxX());
      const maxy = Math.max(env1.getMaxY(), env2.getMaxY());
      return EnvelopeDistance.distance(minx, miny, maxx, maxy);
    }

    static minMaxDistance(a, b) {
      const aminx = a.getMinX();
      const aminy = a.getMinY();
      const amaxx = a.getMaxX();
      const amaxy = a.getMaxY();
      const bminx = b.getMinX();
      const bminy = b.getMinY();
      const bmaxx = b.getMaxX();
      const bmaxy = b.getMaxY();
      let dist = EnvelopeDistance.maxDistance(aminx, aminy, aminx, amaxy, bminx, bminy, bminx, bmaxy);
      dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, aminx, amaxy, bminx, bminy, bmaxx, bminy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, aminx, amaxy, bmaxx, bmaxy, bminx, bmaxy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, aminx, amaxy, bmaxx, bmaxy, bmaxx, bminy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, amaxx, aminy, bminx, bminy, bminx, bmaxy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, amaxx, aminy, bminx, bminy, bmaxx, bminy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, amaxx, aminy, bmaxx, bmaxy, bminx, bmaxy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(aminx, aminy, amaxx, aminy, bmaxx, bmaxy, bmaxx, bminy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, aminx, amaxy, bminx, bminy, bminx, bmaxy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, aminx, amaxy, bminx, bminy, bmaxx, bminy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, aminx, amaxy, bmaxx, bmaxy, bminx, bmaxy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, aminx, amaxy, bmaxx, bmaxy, bmaxx, bminy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, amaxx, aminy, bminx, bminy, bminx, bmaxy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, amaxx, aminy, bminx, bminy, bmaxx, bminy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, amaxx, aminy, bmaxx, bmaxy, bminx, bmaxy));
      dist = Math.min(dist, EnvelopeDistance.maxDistance(amaxx, amaxy, amaxx, aminy, bmaxx, bmaxy, bmaxx, bminy));
      return dist;
    }

  }

  class BoundablePair {
    constructor() {
      BoundablePair.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._boundable1 = null;
      this._boundable2 = null;
      this._distance = null;
      this._itemDistance = null;
      const boundable1 = arguments[0],
            boundable2 = arguments[1],
            itemDistance = arguments[2];
      this._boundable1 = boundable1;
      this._boundable2 = boundable2;
      this._itemDistance = itemDistance;
      this._distance = this.distance();
    }

    static area(b) {
      return b.getBounds().getArea();
    }

    static isComposite(item) {
      return item instanceof AbstractNode;
    }

    maximumDistance() {
      return EnvelopeDistance.maximumDistance(this._boundable1.getBounds(), this._boundable2.getBounds());
    }

    expandToQueue(priQ, minDistance) {
      const isComp1 = BoundablePair.isComposite(this._boundable1);
      const isComp2 = BoundablePair.isComposite(this._boundable2);

      if (isComp1 && isComp2) {
        if (BoundablePair.area(this._boundable1) > BoundablePair.area(this._boundable2)) {
          this.expand(this._boundable1, this._boundable2, false, priQ, minDistance);
          return null;
        } else {
          this.expand(this._boundable2, this._boundable1, true, priQ, minDistance);
          return null;
        }
      } else if (isComp1) {
        this.expand(this._boundable1, this._boundable2, false, priQ, minDistance);
        return null;
      } else if (isComp2) {
        this.expand(this._boundable2, this._boundable1, true, priQ, minDistance);
        return null;
      }

      throw new IllegalArgumentException('neither boundable is composite');
    }

    isLeaves() {
      return !(BoundablePair.isComposite(this._boundable1) || BoundablePair.isComposite(this._boundable2));
    }

    compareTo(o) {
      const nd = o;
      if (this._distance < nd._distance) return -1;
      if (this._distance > nd._distance) return 1;
      return 0;
    }

    expand(bndComposite, bndOther, isFlipped, priQ, minDistance) {
      const children = bndComposite.getChildBoundables();

      for (let i = children.iterator(); i.hasNext();) {
        const child = i.next();
        let bp = null;
        if (isFlipped) bp = new BoundablePair(bndOther, child, this._itemDistance);else bp = new BoundablePair(child, bndOther, this._itemDistance);
        if (bp.getDistance() < minDistance) priQ.add(bp);
      }
    }

    getBoundable(i) {
      if (i === 0) return this._boundable1;
      return this._boundable2;
    }

    getDistance() {
      return this._distance;
    }

    distance() {
      if (this.isLeaves()) return this._itemDistance.distance(this._boundable1, this._boundable2);
      return this._boundable1.getBounds().distance(this._boundable2.getBounds());
    }

    get interfaces_() {
      return [Comparable];
    }

  }

  class AbstractSTRtree {
    constructor() {
      AbstractSTRtree.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._root = null;
      this._built = false;
      this._itemBoundables = new ArrayList();
      this._nodeCapacity = null;

      if (arguments.length === 0) {
        AbstractSTRtree.constructor_.call(this, AbstractSTRtree.DEFAULT_NODE_CAPACITY);
      } else if (arguments.length === 1) {
        const nodeCapacity = arguments[0];
        Assert.isTrue(nodeCapacity > 1, 'Node capacity must be greater than 1');
        this._nodeCapacity = nodeCapacity;
      }
    }

    static compareDoubles(a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    }

    queryInternal() {
      if (hasInterface(arguments[2], ItemVisitor) && arguments[0] instanceof Object && arguments[1] instanceof AbstractNode) {
        const searchBounds = arguments[0],
              node = arguments[1],
              visitor = arguments[2];
        const childBoundables = node.getChildBoundables();

        for (let i = 0; i < childBoundables.size(); i++) {
          const childBoundable = childBoundables.get(i);
          if (!this.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds)) continue;
          if (childBoundable instanceof AbstractNode) this.queryInternal(searchBounds, childBoundable, visitor);else if (childBoundable instanceof ItemBoundable) visitor.visitItem(childBoundable.getItem());else Assert.shouldNeverReachHere();
        }
      } else if (hasInterface(arguments[2], List) && arguments[0] instanceof Object && arguments[1] instanceof AbstractNode) {
        const searchBounds = arguments[0],
              node = arguments[1],
              matches = arguments[2];
        const childBoundables = node.getChildBoundables();

        for (let i = 0; i < childBoundables.size(); i++) {
          const childBoundable = childBoundables.get(i);
          if (!this.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds)) continue;
          if (childBoundable instanceof AbstractNode) this.queryInternal(searchBounds, childBoundable, matches);else if (childBoundable instanceof ItemBoundable) matches.add(childBoundable.getItem());else Assert.shouldNeverReachHere();
        }
      }
    }

    getNodeCapacity() {
      return this._nodeCapacity;
    }

    lastNode(nodes) {
      return nodes.get(nodes.size() - 1);
    }

    size() {
      if (arguments.length === 0) {
        if (this.isEmpty()) return 0;
        this.build();
        return this.size(this._root);
      } else if (arguments.length === 1) {
        const node = arguments[0];
        let size = 0;

        for (let i = node.getChildBoundables().iterator(); i.hasNext();) {
          const childBoundable = i.next();
          if (childBoundable instanceof AbstractNode) size += this.size(childBoundable);else if (childBoundable instanceof ItemBoundable) size += 1;
        }

        return size;
      }
    }

    removeItem(node, item) {
      let childToRemove = null;

      for (let i = node.getChildBoundables().iterator(); i.hasNext();) {
        const childBoundable = i.next();
        if (childBoundable instanceof ItemBoundable) if (childBoundable.getItem() === item) childToRemove = childBoundable;
      }

      if (childToRemove !== null) {
        node.getChildBoundables().remove(childToRemove);
        return true;
      }

      return false;
    }

    itemsTree() {
      if (arguments.length === 0) {
        this.build();
        const valuesTree = this.itemsTree(this._root);
        if (valuesTree === null) return new ArrayList();
        return valuesTree;
      } else if (arguments.length === 1) {
        const node = arguments[0];
        const valuesTreeForNode = new ArrayList();

        for (let i = node.getChildBoundables().iterator(); i.hasNext();) {
          const childBoundable = i.next();

          if (childBoundable instanceof AbstractNode) {
            const valuesTreeForChild = this.itemsTree(childBoundable);
            if (valuesTreeForChild !== null) valuesTreeForNode.add(valuesTreeForChild);
          } else if (childBoundable instanceof ItemBoundable) {
            valuesTreeForNode.add(childBoundable.getItem());
          } else {
            Assert.shouldNeverReachHere();
          }
        }

        if (valuesTreeForNode.size() <= 0) return null;
        return valuesTreeForNode;
      }
    }

    insert(bounds, item) {
      Assert.isTrue(!this._built, 'Cannot insert items into an STR packed R-tree after it has been built.');

      this._itemBoundables.add(new ItemBoundable(bounds, item));
    }

    boundablesAtLevel() {
      if (arguments.length === 1) {
        const level = arguments[0];
        const boundables = new ArrayList();
        this.boundablesAtLevel(level, this._root, boundables);
        return boundables;
      } else if (arguments.length === 3) {
        const level = arguments[0],
              top = arguments[1],
              boundables = arguments[2];
        Assert.isTrue(level > -2);

        if (top.getLevel() === level) {
          boundables.add(top);
          return null;
        }

        for (let i = top.getChildBoundables().iterator(); i.hasNext();) {
          const boundable = i.next();

          if (boundable instanceof AbstractNode) {
            this.boundablesAtLevel(level, boundable, boundables);
          } else {
            Assert.isTrue(boundable instanceof ItemBoundable);
            if (level === -1) boundables.add(boundable);
          }
        }

        return null;
      }
    }

    query() {
      if (arguments.length === 1) {
        const searchBounds = arguments[0];
        this.build();
        const matches = new ArrayList();
        if (this.isEmpty()) return matches;
        if (this.getIntersectsOp().intersects(this._root.getBounds(), searchBounds)) this.queryInternal(searchBounds, this._root, matches);
        return matches;
      } else if (arguments.length === 2) {
        const searchBounds = arguments[0],
              visitor = arguments[1];
        this.build();
        if (this.isEmpty()) return null;
        if (this.getIntersectsOp().intersects(this._root.getBounds(), searchBounds)) this.queryInternal(searchBounds, this._root, visitor);
      }
    }

    build() {
      if (this._built) return null;
      this._root = this._itemBoundables.isEmpty() ? this.createNode(0) : this.createHigherLevels(this._itemBoundables, -1);
      this._itemBoundables = null;
      this._built = true;
    }

    getRoot() {
      this.build();
      return this._root;
    }

    remove() {
      if (arguments.length === 2) {
        const searchBounds = arguments[0],
              item = arguments[1];
        this.build();
        if (this.getIntersectsOp().intersects(this._root.getBounds(), searchBounds)) return this.remove(searchBounds, this._root, item);
        return false;
      } else if (arguments.length === 3) {
        const searchBounds = arguments[0],
              node = arguments[1],
              item = arguments[2];
        let found = this.removeItem(node, item);
        if (found) return true;
        let childToPrune = null;

        for (let i = node.getChildBoundables().iterator(); i.hasNext();) {
          const childBoundable = i.next();
          if (!this.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds)) continue;

          if (childBoundable instanceof AbstractNode) {
            found = this.remove(searchBounds, childBoundable, item);

            if (found) {
              childToPrune = childBoundable;
              break;
            }
          }
        }

        if (childToPrune !== null) if (childToPrune.getChildBoundables().isEmpty()) node.getChildBoundables().remove(childToPrune);
        return found;
      }
    }

    createHigherLevels(boundablesOfALevel, level) {
      Assert.isTrue(!boundablesOfALevel.isEmpty());
      const parentBoundables = this.createParentBoundables(boundablesOfALevel, level + 1);
      if (parentBoundables.size() === 1) return parentBoundables.get(0);
      return this.createHigherLevels(parentBoundables, level + 1);
    }

    depth() {
      if (arguments.length === 0) {
        if (this.isEmpty()) return 0;
        this.build();
        return this.depth(this._root);
      } else if (arguments.length === 1) {
        const node = arguments[0];
        let maxChildDepth = 0;

        for (let i = node.getChildBoundables().iterator(); i.hasNext();) {
          const childBoundable = i.next();

          if (childBoundable instanceof AbstractNode) {
            const childDepth = this.depth(childBoundable);
            if (childDepth > maxChildDepth) maxChildDepth = childDepth;
          }
        }

        return maxChildDepth + 1;
      }
    }

    createParentBoundables(childBoundables, newLevel) {
      Assert.isTrue(!childBoundables.isEmpty());
      const parentBoundables = new ArrayList();
      parentBoundables.add(this.createNode(newLevel));
      const sortedChildBoundables = new ArrayList(childBoundables);
      Collections.sort(sortedChildBoundables, this.getComparator());

      for (let i = sortedChildBoundables.iterator(); i.hasNext();) {
        const childBoundable = i.next();
        if (this.lastNode(parentBoundables).getChildBoundables().size() === this.getNodeCapacity()) parentBoundables.add(this.createNode(newLevel));
        this.lastNode(parentBoundables).addChildBoundable(childBoundable);
      }

      return parentBoundables;
    }

    isEmpty() {
      if (!this._built) return this._itemBoundables.isEmpty();
      return this._root.isEmpty();
    }

    get interfaces_() {
      return [Serializable];
    }

  }

  function IntersectsOp$1() {}

  AbstractSTRtree.IntersectsOp = IntersectsOp$1;
  AbstractSTRtree.DEFAULT_NODE_CAPACITY = 10;

  class ItemDistance {
    distance(item1, item2) {}

  }

  class STRtree extends AbstractSTRtree {
    constructor() {
      super();
      STRtree.constructor_.apply(this, arguments);
    }

    static constructor_() {
      if (arguments.length === 0) {
        STRtree.constructor_.call(this, STRtree.DEFAULT_NODE_CAPACITY);
      } else if (arguments.length === 1) {
        const nodeCapacity = arguments[0];
        AbstractSTRtree.constructor_.call(this, nodeCapacity);
      }
    }

    static centreX(e) {
      return STRtree.avg(e.getMinX(), e.getMaxX());
    }

    static avg(a, b) {
      return (a + b) / 2;
    }

    static getItems(kNearestNeighbors) {
      const items = new Array(kNearestNeighbors.size()).fill(null);
      let count = 0;

      while (!kNearestNeighbors.isEmpty()) {
        const bp = kNearestNeighbors.poll();
        items[count] = bp.getBoundable(0).getItem();
        count++;
      }

      return items;
    }

    static centreY(e) {
      return STRtree.avg(e.getMinY(), e.getMaxY());
    }

    createParentBoundablesFromVerticalSlices(verticalSlices, newLevel) {
      Assert.isTrue(verticalSlices.length > 0);
      const parentBoundables = new ArrayList();

      for (let i = 0; i < verticalSlices.length; i++) parentBoundables.addAll(this.createParentBoundablesFromVerticalSlice(verticalSlices[i], newLevel));

      return parentBoundables;
    }

    nearestNeighbourK() {
      if (arguments.length === 2) {
        const initBndPair = arguments[0],
              k = arguments[1];
        return this.nearestNeighbourK(initBndPair, Double.POSITIVE_INFINITY, k);
      } else if (arguments.length === 3) {
        const initBndPair = arguments[0],
              maxDistance = arguments[1],
              k = arguments[2];
        let distanceLowerBound = maxDistance;
        const priQ = new PriorityQueue();
        priQ.add(initBndPair);
        const kNearestNeighbors = new PriorityQueue();

        while (!priQ.isEmpty() && distanceLowerBound >= 0.0) {
          const bndPair = priQ.poll();
          const pairDistance = bndPair.getDistance();
          if (pairDistance >= distanceLowerBound) break;
          if (bndPair.isLeaves()) {
            if (kNearestNeighbors.size() < k) {
              kNearestNeighbors.add(bndPair);
            } else {
              const bp1 = kNearestNeighbors.peek();

              if (bp1.getDistance() > pairDistance) {
                kNearestNeighbors.poll();
                kNearestNeighbors.add(bndPair);
              }

              const bp2 = kNearestNeighbors.peek();
              distanceLowerBound = bp2.getDistance();
            }
          } else bndPair.expandToQueue(priQ, distanceLowerBound);
        }

        return STRtree.getItems(kNearestNeighbors);
      }
    }

    createNode(level) {
      return new STRtreeNode(level);
    }

    size() {
      if (arguments.length === 0) return super.size.call(this);else return super.size.apply(this, arguments);
    }

    insert() {
      if (arguments.length === 2 && arguments[1] instanceof Object && arguments[0] instanceof Envelope) {
        const itemEnv = arguments[0],
              item = arguments[1];
        if (itemEnv.isNull()) return null;
        super.insert.call(this, itemEnv, item);
      } else {
        return super.insert.apply(this, arguments);
      }
    }

    getIntersectsOp() {
      return STRtree.intersectsOp;
    }

    verticalSlices(childBoundables, sliceCount) {
      const sliceCapacity = Math.trunc(Math.ceil(childBoundables.size() / sliceCount));
      const slices = new Array(sliceCount).fill(null);
      const i = childBoundables.iterator();

      for (let j = 0; j < sliceCount; j++) {
        slices[j] = new ArrayList();
        let boundablesAddedToSlice = 0;

        while (i.hasNext() && boundablesAddedToSlice < sliceCapacity) {
          const childBoundable = i.next();
          slices[j].add(childBoundable);
          boundablesAddedToSlice++;
        }
      }

      return slices;
    }

    query() {
      if (arguments.length === 1) {
        const searchEnv = arguments[0];
        return super.query.call(this, searchEnv);
      } else if (arguments.length === 2) {
        const searchEnv = arguments[0],
              visitor = arguments[1];
        super.query.call(this, searchEnv, visitor);
      }
    }

    getComparator() {
      return STRtree.yComparator;
    }

    createParentBoundablesFromVerticalSlice(childBoundables, newLevel) {
      return super.createParentBoundables.call(this, childBoundables, newLevel);
    }

    remove() {
      if (arguments.length === 2 && arguments[1] instanceof Object && arguments[0] instanceof Envelope) {
        const itemEnv = arguments[0],
              item = arguments[1];
        return super.remove.call(this, itemEnv, item);
      } else {
        return super.remove.apply(this, arguments);
      }
    }

    depth() {
      if (arguments.length === 0) return super.depth.call(this);else return super.depth.apply(this, arguments);
    }

    createParentBoundables(childBoundables, newLevel) {
      Assert.isTrue(!childBoundables.isEmpty());
      const minLeafCount = Math.trunc(Math.ceil(childBoundables.size() / this.getNodeCapacity()));
      const sortedChildBoundables = new ArrayList(childBoundables);
      Collections.sort(sortedChildBoundables, STRtree.xComparator);
      const verticalSlices = this.verticalSlices(sortedChildBoundables, Math.trunc(Math.ceil(Math.sqrt(minLeafCount))));
      return this.createParentBoundablesFromVerticalSlices(verticalSlices, newLevel);
    }

    nearestNeighbour() {
      if (arguments.length === 1) {
        if (hasInterface(arguments[0], ItemDistance)) {
          const itemDist = arguments[0];
          if (this.isEmpty()) return null;
          const bp = new BoundablePair(this.getRoot(), this.getRoot(), itemDist);
          return this.nearestNeighbour(bp);
        } else if (arguments[0] instanceof BoundablePair) {
          const initBndPair = arguments[0];
          let distanceLowerBound = Double.POSITIVE_INFINITY;
          let minPair = null;
          const priQ = new PriorityQueue();
          priQ.add(initBndPair);

          while (!priQ.isEmpty() && distanceLowerBound > 0.0) {
            const bndPair = priQ.poll();
            const pairDistance = bndPair.getDistance();
            if (pairDistance >= distanceLowerBound) break;

            if (bndPair.isLeaves()) {
              distanceLowerBound = pairDistance;
              minPair = bndPair;
            } else {
              bndPair.expandToQueue(priQ, distanceLowerBound);
            }
          }

          if (minPair === null) return null;
          return [minPair.getBoundable(0).getItem(), minPair.getBoundable(1).getItem()];
        }
      } else if (arguments.length === 2) {
        const tree = arguments[0],
              itemDist = arguments[1];
        if (this.isEmpty() || tree.isEmpty()) return null;
        const bp = new BoundablePair(this.getRoot(), tree.getRoot(), itemDist);
        return this.nearestNeighbour(bp);
      } else if (arguments.length === 3) {
        const env = arguments[0],
              item = arguments[1],
              itemDist = arguments[2];
        const bnd = new ItemBoundable(env, item);
        const bp = new BoundablePair(this.getRoot(), bnd, itemDist);
        return this.nearestNeighbour(bp)[0];
      } else if (arguments.length === 4) {
        const env = arguments[0],
              item = arguments[1],
              itemDist = arguments[2],
              k = arguments[3];
        const bnd = new ItemBoundable(env, item);
        const bp = new BoundablePair(this.getRoot(), bnd, itemDist);
        return this.nearestNeighbourK(bp, k);
      }
    }

    isWithinDistance() {
      if (arguments.length === 2) {
        const initBndPair = arguments[0],
              maxDistance = arguments[1];
        let distanceUpperBound = Double.POSITIVE_INFINITY;
        const priQ = new PriorityQueue();
        priQ.add(initBndPair);

        while (!priQ.isEmpty()) {
          const bndPair = priQ.poll();
          const pairDistance = bndPair.getDistance();
          if (pairDistance > maxDistance) return false;
          if (bndPair.maximumDistance() <= maxDistance) return true;

          if (bndPair.isLeaves()) {
            distanceUpperBound = pairDistance;
            if (distanceUpperBound <= maxDistance) return true;
          } else {
            bndPair.expandToQueue(priQ, distanceUpperBound);
          }
        }

        return false;
      } else if (arguments.length === 3) {
        const tree = arguments[0],
              itemDist = arguments[1],
              maxDistance = arguments[2];
        const bp = new BoundablePair(this.getRoot(), tree.getRoot(), itemDist);
        return this.isWithinDistance(bp, maxDistance);
      }
    }

    get interfaces_() {
      return [SpatialIndex, Serializable];
    }

  }

  class STRtreeNode extends AbstractNode {
    constructor() {
      super();
      STRtreeNode.constructor_.apply(this, arguments);
    }

    static constructor_() {
      const level = arguments[0];
      AbstractNode.constructor_.call(this, level);
    }

    computeBounds() {
      let bounds = null;

      for (let i = this.getChildBoundables().iterator(); i.hasNext();) {
        const childBoundable = i.next();
        if (bounds === null) bounds = new Envelope(childBoundable.getBounds());else bounds.expandToInclude(childBoundable.getBounds());
      }

      return bounds;
    }

  }

  STRtree.STRtreeNode = STRtreeNode;
  STRtree.xComparator = new class {
    get interfaces_() {
      return [Comparator];
    }

    compare(o1, o2) {
      return AbstractSTRtree.compareDoubles(STRtree.centreX(o1.getBounds()), STRtree.centreX(o2.getBounds()));
    }

  }();
  STRtree.yComparator = new class {
    get interfaces_() {
      return [Comparator];
    }

    compare(o1, o2) {
      return AbstractSTRtree.compareDoubles(STRtree.centreY(o1.getBounds()), STRtree.centreY(o2.getBounds()));
    }

  }();
  STRtree.intersectsOp = new class {
    get interfaces_() {
      return [IntersectsOp];
    }

    intersects(aBounds, bBounds) {
      return aBounds.intersects(bBounds);
    }

  }();
  STRtree.DEFAULT_NODE_CAPACITY = 10;

  var strtree = /*#__PURE__*/Object.freeze({
    __proto__: null,
    STRtree: STRtree
  });

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    kdtree: kdtree,
    quadtree: quadtree,
    strtree: strtree
  });

  const geometryTypes = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'];
  /**
   * Class for reading and writing Well-Known Text.Create a new parser for GeoJSON
   * NOTE: Adapted from OpenLayers 2.11 implementation.
   */

  /**
   * Create a new parser for GeoJSON
   *
   * @param {GeometryFactory} geometryFactory
   * @return An instance of GeoJsonParser.
   * @constructor
   * @private
   */

  class GeoJSONParser {
    constructor(geometryFactory) {
      this.geometryFactory = geometryFactory || new GeometryFactory();
    }
    /**
     * Deserialize a GeoJSON object and return the Geometry or Feature(Collection) with JSTS Geometries
     *
     * @param {}
     *          A GeoJSON object.
     * @return {} A Geometry instance or object representing a Feature(Collection) with Geometry instances.
     * @private
     */


    read(json) {
      let obj;
      if (typeof json === 'string') obj = JSON.parse(json);else obj = json;
      const type = obj.type;
      if (!parse[type]) throw new Error('Unknown GeoJSON type: ' + obj.type);
      if (geometryTypes.indexOf(type) !== -1) return parse[type].call(this, obj.coordinates);else if (type === 'GeometryCollection') return parse[type].call(this, obj.geometries); // feature or feature collection

      return parse[type].call(this, obj);
    }
    /**
     * Serialize a Geometry object into GeoJSON
     *
     * @param {Geometry}
     *          geometry A Geometry or array of Geometries.
     * @return {Object} A GeoJSON object represting the input Geometry/Geometries.
     * @private
     */


    write(geometry) {
      const type = geometry.getGeometryType();
      if (!extract[type]) throw new Error('Geometry is not supported');
      return extract[type].call(this, geometry);
    }

  }
  const parse = {
    /**
     * Parse a GeoJSON Feature object
     *
     * @param {Object}
     *          obj Object to parse.
     *
     * @return {Object} Feature with geometry/bbox converted to JSTS Geometries.
     */
    Feature: function (obj) {
      const feature = {};

      for (const key in obj) feature[key] = obj[key];

      if (obj.geometry) {
        const type = obj.geometry.type;
        if (!parse[type]) throw new Error('Unknown GeoJSON type: ' + obj.type);
        feature.geometry = this.read(obj.geometry);
      }

      if (obj.bbox) feature.bbox = parse.bbox.call(this, obj.bbox);
      return feature;
    },

    /**
     * Parse a GeoJSON FeatureCollection object
     *
     * @param {Object}
     *          obj Object to parse.
     *
     * @return {Object} FeatureCollection with geometry/bbox converted to JSTS Geometries.
     */
    FeatureCollection: function (obj) {
      const featureCollection = {};

      if (obj.features) {
        featureCollection.features = [];

        for (let i = 0; i < obj.features.length; ++i) featureCollection.features.push(this.read(obj.features[i]));
      }

      if (obj.bbox) featureCollection.bbox = this.parse.bbox.call(this, obj.bbox);
      return featureCollection;
    },

    /**
     * Convert the ordinates in an array to an array of Coordinates
     *
     * @param {Array}
     *          array Array with {Number}s.
     *
     * @return {Array} Array with Coordinates.
     */
    coordinates: function (array) {
      const coordinates = [];

      for (let i = 0; i < array.length; ++i) {
        const sub = array[i];
        coordinates.push(new Coordinate(...sub));
      }

      return coordinates;
    },

    /**
     * Convert the bbox to a LinearRing
     *
     * @param {Array}
     *          array Array with [xMin, yMin, xMax, yMax].
     *
     * @return {Array} Array with Coordinates.
     */
    bbox: function (array) {
      return this.geometryFactory.createLinearRing([new Coordinate(array[0], array[1]), new Coordinate(array[2], array[1]), new Coordinate(array[2], array[3]), new Coordinate(array[0], array[3]), new Coordinate(array[0], array[1])]);
    },

    /**
     * Convert an Array with ordinates to a Point
     *
     * @param {Array}
     *          array Array with ordinates.
     *
     * @return {Point} Point.
     */
    Point: function (array) {
      const coordinate = new Coordinate(...array);
      return this.geometryFactory.createPoint(coordinate);
    },

    /**
     * Convert an Array with coordinates to a MultiPoint
     *
     * @param {Array}
     *          array Array with coordinates.
     *
     * @return {MultiPoint} MultiPoint.
     */
    MultiPoint: function (array) {
      const points = [];

      for (let i = 0; i < array.length; ++i) points.push(parse.Point.call(this, array[i]));

      return this.geometryFactory.createMultiPoint(points);
    },

    /**
     * Convert an Array with coordinates to a LineString
     *
     * @param {Array}
     *          array Array with coordinates.
     *
     * @return {LineString} LineString.
     */
    LineString: function (array) {
      const coordinates = parse.coordinates.call(this, array);
      return this.geometryFactory.createLineString(coordinates);
    },

    /**
     * Convert an Array with coordinates to a MultiLineString
     *
     * @param {Array}
     *          array Array with coordinates.
     *
     * @return {MultiLineString} MultiLineString.
     */
    MultiLineString: function (array) {
      const lineStrings = [];

      for (let i = 0; i < array.length; ++i) lineStrings.push(parse.LineString.call(this, array[i]));

      return this.geometryFactory.createMultiLineString(lineStrings);
    },

    /**
     * Convert an Array to a Polygon
     *
     * @param {Array}
     *          array Array with shell and holes.
     *
     * @return {Polygon} Polygon.
     */
    Polygon: function (array) {
      const shellCoordinates = parse.coordinates.call(this, array[0]);
      const shell = this.geometryFactory.createLinearRing(shellCoordinates);
      const holes = [];

      for (let i = 1; i < array.length; ++i) {
        const hole = array[i];
        const coordinates = parse.coordinates.call(this, hole);
        const linearRing = this.geometryFactory.createLinearRing(coordinates);
        holes.push(linearRing);
      }

      return this.geometryFactory.createPolygon(shell, holes);
    },

    /**
     * Convert an Array to a MultiPolygon
     *
     * @param {Array}
     *          array Array of arrays with shell and rings.
     *
     * @return {MultiPolygon} MultiPolygon.
     */
    MultiPolygon: function (array) {
      const polygons = [];

      for (let i = 0; i < array.length; ++i) {
        const polygon = array[i];
        polygons.push(parse.Polygon.call(this, polygon));
      }

      return this.geometryFactory.createMultiPolygon(polygons);
    },

    /**
     * Convert an Array to a GeometryCollection
     *
     * @param {Array}
     *          array Array of GeoJSON geometries.
     *
     * @return {GeometryCollection} GeometryCollection.
     */
    GeometryCollection: function (array) {
      const geometries = [];

      for (let i = 0; i < array.length; ++i) {
        const geometry = array[i];
        geometries.push(this.read(geometry));
      }

      return this.geometryFactory.createGeometryCollection(geometries);
    }
  };
  const extract = {
    /**
     * Convert a Coordinate to an Array
     *
     * @param {Coordinate}
     *          coordinate Coordinate to convert.
     *
     * @return {Array} Array of ordinates.
     */
    coordinate: function (coordinate) {
      const a = [coordinate.x, coordinate.y];
      if (coordinate.z) a.push(coordinate.z);
      if (coordinate.m) a.push(coordinate.m);
      return a;
    },

    /**
     * Convert a Point to a GeoJSON object
     *
     * @param {Point}
     *          point Point to convert.
     *
     * @return {Array} Array of 2 ordinates (paired to a coordinate).
     */
    Point: function (point) {
      const array = extract.coordinate.call(this, point.getCoordinate());
      return {
        type: 'Point',
        coordinates: array
      };
    },

    /**
     * Convert a MultiPoint to a GeoJSON object
     *
     * @param {MultiPoint}
     *          multipoint MultiPoint to convert.
     *
     * @return {Array} Array of coordinates.
     */
    MultiPoint: function (multipoint) {
      const array = [];

      for (let i = 0; i < multipoint._geometries.length; ++i) {
        const point = multipoint._geometries[i];
        const geoJson = extract.Point.call(this, point);
        array.push(geoJson.coordinates);
      }

      return {
        type: 'MultiPoint',
        coordinates: array
      };
    },

    /**
     * Convert a LineString to a GeoJSON object
     *
     * @param {LineString}
     *          linestring LineString to convert.
     *
     * @return {Array} Array of coordinates.
     */
    LineString: function (linestring) {
      const array = [];
      const coordinates = linestring.getCoordinates();

      for (let i = 0; i < coordinates.length; ++i) {
        const coordinate = coordinates[i];
        array.push(extract.coordinate.call(this, coordinate));
      }

      return {
        type: 'LineString',
        coordinates: array
      };
    },

    /**
     * Convert a MultiLineString to a GeoJSON object
     *
     * @param {MultiLineString}
     *          multilinestring MultiLineString to convert.
     *
     * @return {Array} Array of Array of coordinates.
     */
    MultiLineString: function (multilinestring) {
      const array = [];

      for (let i = 0; i < multilinestring._geometries.length; ++i) {
        const linestring = multilinestring._geometries[i];
        const geoJson = extract.LineString.call(this, linestring);
        array.push(geoJson.coordinates);
      }

      return {
        type: 'MultiLineString',
        coordinates: array
      };
    },

    /**
     * Convert a Polygon to a GeoJSON object
     *
     * @param {Polygon}
     *          polygon Polygon to convert.
     *
     * @return {Array} Array with shell, holes.
     */
    Polygon: function (polygon) {
      const array = [];
      const shellGeoJson = extract.LineString.call(this, polygon._shell);
      array.push(shellGeoJson.coordinates);

      for (let i = 0; i < polygon._holes.length; ++i) {
        const hole = polygon._holes[i];
        const holeGeoJson = extract.LineString.call(this, hole);
        array.push(holeGeoJson.coordinates);
      }

      return {
        type: 'Polygon',
        coordinates: array
      };
    },

    /**
     * Convert a MultiPolygon to a GeoJSON object
     *
     * @param {MultiPolygon}
     *          multipolygon MultiPolygon to convert.
     *
     * @return {Array} Array of polygons.
     */
    MultiPolygon: function (multipolygon) {
      const array = [];

      for (let i = 0; i < multipolygon._geometries.length; ++i) {
        const polygon = multipolygon._geometries[i];
        const geoJson = extract.Polygon.call(this, polygon);
        array.push(geoJson.coordinates);
      }

      return {
        type: 'MultiPolygon',
        coordinates: array
      };
    },

    /**
     * Convert a GeometryCollection to a GeoJSON object
     *
     * @param {GeometryCollection}
     *          collection GeometryCollection to convert.
     *
     * @return {Array} Array of geometries.
     */
    GeometryCollection: function (collection) {
      const array = [];

      for (let i = 0; i < collection._geometries.length; ++i) {
        const geometry = collection._geometries[i];
        const type = geometry.getGeometryType();
        array.push(extract[type].call(this, geometry));
      }

      return {
        type: 'GeometryCollection',
        geometries: array
      };
    }
  };

  /**
   * @module org/locationtech/jts/io/GeoJSONReader
   */
  /**
   * Converts a geometry in GeoJSON to a {@link Geometry}.
   */

  class GeoJSONReader {
    /**
     * A <code>GeoJSONReader</code> is parameterized by a <code>GeometryFactory</code>,
     * to allow it to create <code>Geometry</code> objects of the appropriate
     * implementation. In particular, the <code>GeometryFactory</code> determines
     * the <code>PrecisionModel</code> and <code>SRID</code> that is used.
     *
     * @param {GeometryFactory} geometryFactory
     */
    constructor(geometryFactory) {
      this.parser = new GeoJSONParser(geometryFactory || new GeometryFactory());
    }
    /**
     * Reads a GeoJSON representation of a {@link Geometry}
     *
     * Will also parse GeoJSON Features/FeatureCollections as custom objects.
     *
     * @param {Object|String} geoJson a GeoJSON Object or String.
     * @return {Geometry|Object} a <code>Geometry or Feature/FeatureCollection representation.</code>
     * @memberof module:org/locationtech/jts/io/GeoJSONReader#
     */


    read(geoJson) {
      const geometry = this.parser.read(geoJson);
      return geometry;
    }

  }

  /**
   * @module org/locationtech/jts/io/GeoJSONWriter
   */
  /**
   * Writes the GeoJSON representation of a {@link Geometry}. The
   * The GeoJSON format is defined <A
   * HREF="http://geojson.org/geojson-spec.html">here</A>.
   */

  class GeoJSONWriter {
    /**
     * The <code>GeoJSONWriter</code> outputs coordinates rounded to the precision
     * model. Only the maximum number of decimal places necessary to represent the
     * ordinates to the required precision will be output.
     *
     * @param {GeometryFactory} geometryFactory
     * @constructor
     */
    constructor() {
      this.parser = new GeoJSONParser(this.geometryFactory);
    }
    /**
     * Converts a <code>Geometry</code> to its GeoJSON representation.
     *
     * @param {Geometry}
     *          geometry a <code>Geometry</code> to process.
     * @return {Object} The GeoJSON representation of the Geometry.
     * @memberof module:org/locationtech/jts/io/GeoJSONWriter#
     */


    write(geometry) {
      return this.parser.write(geometry);
    }

  }

  /**
   * @module org/locationtech/jts/io/WKTReader
   */
  /**
   * Converts a geometry in Well-Known Text format to a {@link Geometry}.
   * <p>
   * <code>WKTReader</code> supports extracting <code>Geometry</code> objects
   * from either {@link Reader}s or {@link String}s. This allows it to function
   * as a parser to read <code>Geometry</code> objects from text blocks embedded
   * in other data formats (e.g. XML).
   */

  class WKTReader {
    /**
     * A <code>WKTReader</code> is parameterized by a <code>GeometryFactory</code>,
     * to allow it to create <code>Geometry</code> objects of the appropriate
     * implementation. In particular, the <code>GeometryFactory</code> determines
     * the <code>PrecisionModel</code> and <code>SRID</code> that is used.
     * @param {GeometryFactory} geometryFactory
     */
    constructor(geometryFactory) {
      this.parser = new WKTParser(geometryFactory || new GeometryFactory());
    }
    /**
     * Reads a Well-Known Text representation of a {@link Geometry}
     *
     * @param {string}
     *          wkt a <Geometry Tagged Text> string (see the OpenGIS Simple Features
     *          Specification).
     * @return {Geometry} a <code>Geometry</code> read from
     *         <code>string.</code>
     * @memberof module:org/locationtech/jts/io/WKTReader#
     */


    read(wkt) {
      return this.parser.read(wkt);
    }

  }

  /* eslint-disable no-undef */

  function p2c(p) {
    return [p.x, p.y];
  }

  class OL3Parser {
    /**
     * OpenLayers Geometry parser and writer
     * @param {GeometryFactory} geometryFactory
     * @param {ol} olReference
     */
    constructor(geometryFactory, olReference) {
      this.geometryFactory = geometryFactory || new GeometryFactory();
      this.ol = olReference || typeof ol !== 'undefined' && ol;
    }
    /**
     * Inject OpenLayers geom classes
     */


    inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection) {
      this.ol = {
        geom: {
          Point,
          LineString,
          LinearRing,
          Polygon,
          MultiPoint,
          MultiLineString,
          MultiPolygon,
          GeometryCollection
        }
      };
    }
    /**
     * @param geometry {ol.geom.Geometry}
     * @return {Geometry}
     * @memberof module:org/locationtech/jts/io/OL3Parser#
     */


    read(geometry) {
      const ol = this.ol;
      if (geometry instanceof ol.geom.Point) return this.convertFromPoint(geometry);else if (geometry instanceof ol.geom.LineString) return this.convertFromLineString(geometry);else if (geometry instanceof ol.geom.LinearRing) return this.convertFromLinearRing(geometry);else if (geometry instanceof ol.geom.Polygon) return this.convertFromPolygon(geometry);else if (geometry instanceof ol.geom.MultiPoint) return this.convertFromMultiPoint(geometry);else if (geometry instanceof ol.geom.MultiLineString) return this.convertFromMultiLineString(geometry);else if (geometry instanceof ol.geom.MultiPolygon) return this.convertFromMultiPolygon(geometry);else if (geometry instanceof ol.geom.GeometryCollection) return this.convertFromCollection(geometry);
    }

    convertFromPoint(point) {
      const coordinates = point.getCoordinates();
      return this.geometryFactory.createPoint(new Coordinate(coordinates[0], coordinates[1]));
    }

    convertFromLineString(lineString) {
      return this.geometryFactory.createLineString(lineString.getCoordinates().map(function (coordinates) {
        return new Coordinate(coordinates[0], coordinates[1]);
      }));
    }

    convertFromLinearRing(linearRing) {
      return this.geometryFactory.createLinearRing(linearRing.getCoordinates().map(function (coordinates) {
        return new Coordinate(coordinates[0], coordinates[1]);
      }));
    }

    convertFromPolygon(polygon) {
      const linearRings = polygon.getLinearRings();
      let shell = null;
      const holes = [];

      for (let i = 0; i < linearRings.length; i++) {
        const linearRing = this.convertFromLinearRing(linearRings[i]);
        if (i === 0) shell = linearRing;else holes.push(linearRing);
      }

      return this.geometryFactory.createPolygon(shell, holes);
    }

    convertFromMultiPoint(multiPoint) {
      const points = multiPoint.getPoints().map(function (point) {
        return this.convertFromPoint(point);
      }, this);
      return this.geometryFactory.createMultiPoint(points);
    }

    convertFromMultiLineString(multiLineString) {
      const lineStrings = multiLineString.getLineStrings().map(function (lineString) {
        return this.convertFromLineString(lineString);
      }, this);
      return this.geometryFactory.createMultiLineString(lineStrings);
    }

    convertFromMultiPolygon(multiPolygon) {
      const polygons = multiPolygon.getPolygons().map(function (polygon) {
        return this.convertFromPolygon(polygon);
      }, this);
      return this.geometryFactory.createMultiPolygon(polygons);
    }

    convertFromCollection(collection) {
      const geometries = collection.getGeometries().map(function (geometry) {
        return this.read(geometry);
      }, this);
      return this.geometryFactory.createGeometryCollection(geometries);
    }
    /**
     * @param geometry
     *          {Geometry}
     * @return {ol.geom.Geometry}
     * @memberof module:org/locationtech/jts/io/OL3Parser#
     */


    write(geometry) {
      if (geometry.getGeometryType() === 'Point') return this.convertToPoint(geometry.getCoordinate());else if (geometry.getGeometryType() === 'LineString') return this.convertToLineString(geometry);else if (geometry.getGeometryType() === 'LinearRing') return this.convertToLinearRing(geometry);else if (geometry.getGeometryType() === 'Polygon') return this.convertToPolygon(geometry);else if (geometry.getGeometryType() === 'MultiPoint') return this.convertToMultiPoint(geometry);else if (geometry.getGeometryType() === 'MultiLineString') return this.convertToMultiLineString(geometry);else if (geometry.getGeometryType() === 'MultiPolygon') return this.convertToMultiPolygon(geometry);else if (geometry.getGeometryType() === 'GeometryCollection') return this.convertToCollection(geometry);
    }

    convertToPoint(coordinate) {
      return new this.ol.geom.Point([coordinate.x, coordinate.y]);
    }

    convertToLineString(lineString) {
      const points = lineString._points._coordinates.map(p2c);

      return new this.ol.geom.LineString(points);
    }

    convertToLinearRing(linearRing) {
      const points = linearRing._points._coordinates.map(p2c);

      return new this.ol.geom.LinearRing(points);
    }

    convertToPolygon(polygon) {
      const rings = [polygon._shell._points._coordinates.map(p2c)];

      for (let i = 0; i < polygon._holes.length; i++) rings.push(polygon._holes[i]._points._coordinates.map(p2c));

      return new this.ol.geom.Polygon(rings);
    }

    convertToMultiPoint(multiPoint) {
      return new this.ol.geom.MultiPoint(multiPoint.getCoordinates().map(p2c));
    }

    convertToMultiLineString(multiLineString) {
      const lineStrings = [];

      for (let i = 0; i < multiLineString._geometries.length; i++) lineStrings.push(this.convertToLineString(multiLineString._geometries[i]).getCoordinates());

      return new this.ol.geom.MultiLineString(lineStrings);
    }

    convertToMultiPolygon(multiPolygon) {
      const polygons = [];

      for (let i = 0; i < multiPolygon._geometries.length; i++) polygons.push(this.convertToPolygon(multiPolygon._geometries[i]).getCoordinates());

      return new this.ol.geom.MultiPolygon(polygons);
    }

    convertToCollection(geometryCollection) {
      const geometries = [];

      for (let i = 0; i < geometryCollection._geometries.length; i++) {
        const geometry = geometryCollection._geometries[i];
        geometries.push(this.write(geometry));
      }

      return new this.ol.geom.GeometryCollection(geometries);
    }

  }

  var io = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GeoJSONReader: GeoJSONReader,
    GeoJSONWriter: GeoJSONWriter,
    OL3Parser: OL3Parser,
    WKTReader: WKTReader,
    WKTWriter: WKTWriter
  });

  class SegmentPointComparator {
    static relativeSign(x0, x1) {
      if (x0 < x1) return -1;
      if (x0 > x1) return 1;
      return 0;
    }

    static compare(octant, p0, p1) {
      if (p0.equals2D(p1)) return 0;
      const xSign = SegmentPointComparator.relativeSign(p0.x, p1.x);
      const ySign = SegmentPointComparator.relativeSign(p0.y, p1.y);

      switch (octant) {
        case 0:
          return SegmentPointComparator.compareValue(xSign, ySign);

        case 1:
          return SegmentPointComparator.compareValue(ySign, xSign);

        case 2:
          return SegmentPointComparator.compareValue(ySign, -xSign);

        case 3:
          return SegmentPointComparator.compareValue(-xSign, ySign);

        case 4:
          return SegmentPointComparator.compareValue(-xSign, -ySign);

        case 5:
          return SegmentPointComparator.compareValue(-ySign, -xSign);

        case 6:
          return SegmentPointComparator.compareValue(-ySign, xSign);

        case 7:
          return SegmentPointComparator.compareValue(xSign, -ySign);
      }

      Assert.shouldNeverReachHere('invalid octant value');
      return 0;
    }

    static compareValue(compareSign0, compareSign1) {
      if (compareSign0 < 0) return -1;
      if (compareSign0 > 0) return 1;
      if (compareSign1 < 0) return -1;
      if (compareSign1 > 0) return 1;
      return 0;
    }

  }

  class SegmentNode {
    constructor() {
      SegmentNode.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._segString = null;
      this.coord = null;
      this.segmentIndex = null;
      this._segmentOctant = null;
      this._isInterior = null;
      const segString = arguments[0],
            coord = arguments[1],
            segmentIndex = arguments[2],
            segmentOctant = arguments[3];
      this._segString = segString;
      this.coord = new Coordinate(coord);
      this.segmentIndex = segmentIndex;
      this._segmentOctant = segmentOctant;
      this._isInterior = !coord.equals2D(segString.getCoordinate(segmentIndex));
    }

    getCoordinate() {
      return this.coord;
    }

    print(out) {
      out.print(this.coord);
      out.print(' seg # = ' + this.segmentIndex);
    }

    compareTo(obj) {
      const other = obj;
      if (this.segmentIndex < other.segmentIndex) return -1;
      if (this.segmentIndex > other.segmentIndex) return 1;
      if (this.coord.equals2D(other.coord)) return 0;
      if (!this._isInterior) return -1;
      if (!other._isInterior) return 1;
      return SegmentPointComparator.compare(this._segmentOctant, this.coord, other.coord);
    }

    isEndPoint(maxSegmentIndex) {
      if (this.segmentIndex === 0 && !this._isInterior) return true;
      if (this.segmentIndex === maxSegmentIndex) return true;
      return false;
    }

    toString() {
      return this.segmentIndex + ':' + this.coord.toString();
    }

    isInterior() {
      return this._isInterior;
    }

    get interfaces_() {
      return [Comparable];
    }

  }

  class SegmentNodeList {
    constructor() {
      SegmentNodeList.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._nodeMap = new TreeMap();
      this._edge = null;
      const edge = arguments[0];
      this._edge = edge;
    }

    getSplitCoordinates() {
      const coordList = new CoordinateList();
      this.addEndpoints();
      const it = this.iterator();
      let eiPrev = it.next();

      while (it.hasNext()) {
        const ei = it.next();
        this.addEdgeCoordinates(eiPrev, ei, coordList);
        eiPrev = ei;
      }

      return coordList.toCoordinateArray();
    }

    addCollapsedNodes() {
      const collapsedVertexIndexes = new ArrayList();
      this.findCollapsesFromInsertedNodes(collapsedVertexIndexes);
      this.findCollapsesFromExistingVertices(collapsedVertexIndexes);

      for (let it = collapsedVertexIndexes.iterator(); it.hasNext();) {
        const vertexIndex = it.next().intValue();
        this.add(this._edge.getCoordinate(vertexIndex), vertexIndex);
      }
    }

    createSplitEdgePts(ei0, ei1) {
      let npts = ei1.segmentIndex - ei0.segmentIndex + 2;
      if (npts === 2) return [new Coordinate(ei0.coord), new Coordinate(ei1.coord)];

      const lastSegStartPt = this._edge.getCoordinate(ei1.segmentIndex);

      const useIntPt1 = ei1.isInterior() || !ei1.coord.equals2D(lastSegStartPt);
      if (!useIntPt1) npts--;
      const pts = new Array(npts).fill(null);
      let ipt = 0;
      pts[ipt++] = new Coordinate(ei0.coord);

      for (let i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) pts[ipt++] = this._edge.getCoordinate(i);

      if (useIntPt1) pts[ipt] = new Coordinate(ei1.coord);
      return pts;
    }

    print(out) {
      out.println('Intersections:');

      for (let it = this.iterator(); it.hasNext();) {
        const ei = it.next();
        ei.print(out);
      }
    }

    findCollapsesFromExistingVertices(collapsedVertexIndexes) {
      for (let i = 0; i < this._edge.size() - 2; i++) {
        const p0 = this._edge.getCoordinate(i);

        this._edge.getCoordinate(i + 1);

        const p2 = this._edge.getCoordinate(i + 2);

        if (p0.equals2D(p2)) collapsedVertexIndexes.add(Integer.valueOf(i + 1));
      }
    }

    addEdgeCoordinates(ei0, ei1, coordList) {
      const pts = this.createSplitEdgePts(ei0, ei1);
      coordList.add(pts, false);
    }

    iterator() {
      return this._nodeMap.values().iterator();
    }

    addSplitEdges(edgeList) {
      this.addEndpoints();
      this.addCollapsedNodes();
      const it = this.iterator();
      let eiPrev = it.next();

      while (it.hasNext()) {
        const ei = it.next();
        const newEdge = this.createSplitEdge(eiPrev, ei);
        edgeList.add(newEdge);
        eiPrev = ei;
      }
    }

    findCollapseIndex(ei0, ei1, collapsedVertexIndex) {
      if (!ei0.coord.equals2D(ei1.coord)) return false;
      let numVerticesBetween = ei1.segmentIndex - ei0.segmentIndex;
      if (!ei1.isInterior()) numVerticesBetween--;

      if (numVerticesBetween === 1) {
        collapsedVertexIndex[0] = ei0.segmentIndex + 1;
        return true;
      }

      return false;
    }

    findCollapsesFromInsertedNodes(collapsedVertexIndexes) {
      const collapsedVertexIndex = new Array(1).fill(null);
      const it = this.iterator();
      let eiPrev = it.next();

      while (it.hasNext()) {
        const ei = it.next();
        const isCollapsed = this.findCollapseIndex(eiPrev, ei, collapsedVertexIndex);
        if (isCollapsed) collapsedVertexIndexes.add(Integer.valueOf(collapsedVertexIndex[0]));
        eiPrev = ei;
      }
    }

    getEdge() {
      return this._edge;
    }

    addEndpoints() {
      const maxSegIndex = this._edge.size() - 1;
      this.add(this._edge.getCoordinate(0), 0);
      this.add(this._edge.getCoordinate(maxSegIndex), maxSegIndex);
    }

    createSplitEdge(ei0, ei1) {
      const pts = this.createSplitEdgePts(ei0, ei1);
      return new NodedSegmentString(pts, this._edge.getData());
    }

    add(intPt, segmentIndex) {
      const eiNew = new SegmentNode(this._edge, intPt, segmentIndex, this._edge.getSegmentOctant(segmentIndex));

      const ei = this._nodeMap.get(eiNew);

      if (ei !== null) {
        Assert.isTrue(ei.coord.equals2D(intPt), 'Found equal nodes with different coordinates');
        return ei;
      }

      this._nodeMap.put(eiNew, eiNew);

      return eiNew;
    }

    checkSplitEdgesCorrectness(splitEdges) {
      const edgePts = this._edge.getCoordinates();

      const split0 = splitEdges.get(0);
      const pt0 = split0.getCoordinate(0);
      if (!pt0.equals2D(edgePts[0])) throw new RuntimeException('bad split edge start point at ' + pt0);
      const splitn = splitEdges.get(splitEdges.size() - 1);
      const splitnPts = splitn.getCoordinates();
      const ptn = splitnPts[splitnPts.length - 1];
      if (!ptn.equals2D(edgePts[edgePts.length - 1])) throw new RuntimeException('bad split edge end point at ' + ptn);
    }

  }

  class Octant {
    static octant() {
      if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
        const dx = arguments[0],
              dy = arguments[1];
        if (dx === 0.0 && dy === 0.0) throw new IllegalArgumentException('Cannot compute the octant for point ( ' + dx + ', ' + dy + ' )');
        const adx = Math.abs(dx);
        const ady = Math.abs(dy);
        if (dx >= 0) {
          if (dy >= 0) {
            if (adx >= ady) return 0;else return 1;
          } else if (adx >= ady) return 7;else return 6;
        } else if (dy >= 0) {
          if (adx >= ady) return 3;else return 2;
        } else if (adx >= ady) return 4;else return 5;
      } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
        const p0 = arguments[0],
              p1 = arguments[1];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        if (dx === 0.0 && dy === 0.0) throw new IllegalArgumentException('Cannot compute the octant for two identical points ' + p0);
        return Octant.octant(dx, dy);
      }
    }

  }

  class SegmentString {
    getCoordinates() {}

    size() {}

    getCoordinate(i) {}

    isClosed() {}

    setData(data) {}

    getData() {}

  }

  class NodableSegmentString {
    addIntersection(intPt, segmentIndex) {}

    get interfaces_() {
      return [SegmentString];
    }

  }

  class NodedSegmentString {
    constructor() {
      NodedSegmentString.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._nodeList = new SegmentNodeList(this);
      this._pts = null;
      this._data = null;
      const pts = arguments[0],
            data = arguments[1];
      this._pts = pts;
      this._data = data;
    }

    static getNodedSubstrings() {
      if (arguments.length === 1) {
        const segStrings = arguments[0];
        const resultEdgelist = new ArrayList();
        NodedSegmentString.getNodedSubstrings(segStrings, resultEdgelist);
        return resultEdgelist;
      } else if (arguments.length === 2) {
        const segStrings = arguments[0],
              resultEdgelist = arguments[1];

        for (let i = segStrings.iterator(); i.hasNext();) {
          const ss = i.next();
          ss.getNodeList().addSplitEdges(resultEdgelist);
        }
      }
    }

    getCoordinates() {
      return this._pts;
    }

    size() {
      return this._pts.length;
    }

    getCoordinate(i) {
      return this._pts[i];
    }

    isClosed() {
      return this._pts[0].equals(this._pts[this._pts.length - 1]);
    }

    getSegmentOctant(index) {
      if (index === this._pts.length - 1) return -1;
      return this.safeOctant(this.getCoordinate(index), this.getCoordinate(index + 1));
    }

    setData(data) {
      this._data = data;
    }

    safeOctant(p0, p1) {
      if (p0.equals2D(p1)) return 0;
      return Octant.octant(p0, p1);
    }

    getData() {
      return this._data;
    }

    addIntersection() {
      if (arguments.length === 2) {
        const intPt = arguments[0],
              segmentIndex = arguments[1];
        this.addIntersectionNode(intPt, segmentIndex);
      } else if (arguments.length === 4) {
        const li = arguments[0],
              segmentIndex = arguments[1],
              intIndex = arguments[3];
        const intPt = new Coordinate(li.getIntersection(intIndex));
        this.addIntersection(intPt, segmentIndex);
      }
    }

    toString() {
      return WKTWriter.toLineString(new CoordinateArraySequence(this._pts));
    }

    getNodeList() {
      return this._nodeList;
    }

    addIntersectionNode(intPt, segmentIndex) {
      let normalizedSegmentIndex = segmentIndex;
      const nextSegIndex = normalizedSegmentIndex + 1;

      if (nextSegIndex < this._pts.length) {
        const nextPt = this._pts[nextSegIndex];
        if (intPt.equals2D(nextPt)) normalizedSegmentIndex = nextSegIndex;
      }

      const ei = this._nodeList.add(intPt, normalizedSegmentIndex);

      return ei;
    }

    addIntersections(li, segmentIndex, geomIndex) {
      for (let i = 0; i < li.getIntersectionNum(); i++) this.addIntersection(li, segmentIndex, geomIndex, i);
    }

    get interfaces_() {
      return [NodableSegmentString];
    }

  }

  class MonotoneChainOverlapAction {
    constructor() {
      MonotoneChainOverlapAction.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._overlapSeg1 = new LineSegment();
      this._overlapSeg2 = new LineSegment();
    }

    overlap() {
      if (arguments.length === 2) ; else if (arguments.length === 4) {
        const mc1 = arguments[0],
              start1 = arguments[1],
              mc2 = arguments[2],
              start2 = arguments[3];
        mc1.getLineSegment(start1, this._overlapSeg1);
        mc2.getLineSegment(start2, this._overlapSeg2);
        this.overlap(this._overlapSeg1, this._overlapSeg2);
      }
    }

  }

  class MonotoneChain {
    constructor() {
      MonotoneChain.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pts = null;
      this._start = null;
      this._end = null;
      this._env = null;
      this._context = null;
      this._id = null;
      const pts = arguments[0],
            start = arguments[1],
            end = arguments[2],
            context = arguments[3];
      this._pts = pts;
      this._start = start;
      this._end = end;
      this._context = context;
    }

    getLineSegment(index, ls) {
      ls.p0 = this._pts[index];
      ls.p1 = this._pts[index + 1];
    }

    computeSelect(searchEnv, start0, end0, mcs) {
      const p0 = this._pts[start0];
      const p1 = this._pts[end0];

      if (end0 - start0 === 1) {
        mcs.select(this, start0);
        return null;
      }

      if (!searchEnv.intersects(p0, p1)) return null;
      const mid = Math.trunc((start0 + end0) / 2);
      if (start0 < mid) this.computeSelect(searchEnv, start0, mid, mcs);
      if (mid < end0) this.computeSelect(searchEnv, mid, end0, mcs);
    }

    getCoordinates() {
      const coord = new Array(this._end - this._start + 1).fill(null);
      let index = 0;

      for (let i = this._start; i <= this._end; i++) coord[index++] = this._pts[i];

      return coord;
    }

    computeOverlaps() {
      if (arguments.length === 2) {
        const mc = arguments[0],
              mco = arguments[1];
        this.computeOverlaps(this._start, this._end, mc, mc._start, mc._end, mco);
      } else if (arguments.length === 6) {
        const start0 = arguments[0],
              end0 = arguments[1],
              mc = arguments[2],
              start1 = arguments[3],
              end1 = arguments[4],
              mco = arguments[5];

        if (end0 - start0 === 1 && end1 - start1 === 1) {
          mco.overlap(this, start0, mc, start1);
          return null;
        }

        if (!this.overlaps(start0, end0, mc, start1, end1)) return null;
        const mid0 = Math.trunc((start0 + end0) / 2);
        const mid1 = Math.trunc((start1 + end1) / 2);

        if (start0 < mid0) {
          if (start1 < mid1) this.computeOverlaps(start0, mid0, mc, start1, mid1, mco);
          if (mid1 < end1) this.computeOverlaps(start0, mid0, mc, mid1, end1, mco);
        }

        if (mid0 < end0) {
          if (start1 < mid1) this.computeOverlaps(mid0, end0, mc, start1, mid1, mco);
          if (mid1 < end1) this.computeOverlaps(mid0, end0, mc, mid1, end1, mco);
        }
      }
    }

    setId(id) {
      this._id = id;
    }

    select(searchEnv, mcs) {
      this.computeSelect(searchEnv, this._start, this._end, mcs);
    }

    getEnvelope() {
      if (this._env === null) {
        const p0 = this._pts[this._start];
        const p1 = this._pts[this._end];
        this._env = new Envelope(p0, p1);
      }

      return this._env;
    }

    overlaps(start0, end0, mc, start1, end1) {
      return Envelope.intersects(this._pts[start0], this._pts[end0], mc._pts[start1], mc._pts[end1]);
    }

    getEndIndex() {
      return this._end;
    }

    getStartIndex() {
      return this._start;
    }

    getContext() {
      return this._context;
    }

    getId() {
      return this._id;
    }

  }

  class MonotoneChainBuilder {
    static findChainEnd(pts, start) {
      let safeStart = start;

      while (safeStart < pts.length - 1 && pts[safeStart].equals2D(pts[safeStart + 1])) safeStart++;

      if (safeStart >= pts.length - 1) return pts.length - 1;
      const chainQuad = Quadrant.quadrant(pts[safeStart], pts[safeStart + 1]);
      let last = start + 1;

      while (last < pts.length) {
        if (!pts[last - 1].equals2D(pts[last])) {
          const quad = Quadrant.quadrant(pts[last - 1], pts[last]);
          if (quad !== chainQuad) break;
        }

        last++;
      }

      return last - 1;
    }

    static getChains() {
      if (arguments.length === 1) {
        const pts = arguments[0];
        return MonotoneChainBuilder.getChains(pts, null);
      } else if (arguments.length === 2) {
        const pts = arguments[0],
              context = arguments[1];
        const mcList = new ArrayList();
        let chainStart = 0;

        do {
          const chainEnd = MonotoneChainBuilder.findChainEnd(pts, chainStart);
          const mc = new MonotoneChain(pts, chainStart, chainEnd, context);
          mcList.add(mc);
          chainStart = chainEnd;
        } while (chainStart < pts.length - 1);

        return mcList;
      }
    }

  }

  class Noder {
    computeNodes(segStrings) {}

    getNodedSubstrings() {}

  }

  class SinglePassNoder {
    constructor() {
      SinglePassNoder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._segInt = null;

      if (arguments.length === 0) ; else if (arguments.length === 1) {
        const segInt = arguments[0];
        this.setSegmentIntersector(segInt);
      }
    }

    setSegmentIntersector(segInt) {
      this._segInt = segInt;
    }

    get interfaces_() {
      return [Noder];
    }

  }

  class MCIndexNoder extends SinglePassNoder {
    constructor() {
      super();
      MCIndexNoder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._monoChains = new ArrayList();
      this._index = new STRtree();
      this._idCounter = 0;
      this._nodedSegStrings = null;
      this._nOverlaps = 0;

      if (arguments.length === 0) ; else if (arguments.length === 1) {
        const si = arguments[0];
        SinglePassNoder.constructor_.call(this, si);
      }
    }

    getMonotoneChains() {
      return this._monoChains;
    }

    getNodedSubstrings() {
      return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings);
    }

    getIndex() {
      return this._index;
    }

    add(segStr) {
      const segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);

      for (let i = segChains.iterator(); i.hasNext();) {
        const mc = i.next();
        mc.setId(this._idCounter++);

        this._index.insert(mc.getEnvelope(), mc);

        this._monoChains.add(mc);
      }
    }

    computeNodes(inputSegStrings) {
      this._nodedSegStrings = inputSegStrings;

      for (let i = inputSegStrings.iterator(); i.hasNext();) this.add(i.next());

      this.intersectChains();
    }

    intersectChains() {
      const overlapAction = new SegmentOverlapAction(this._segInt);

      for (let i = this._monoChains.iterator(); i.hasNext();) {
        const queryChain = i.next();

        const overlapChains = this._index.query(queryChain.getEnvelope());

        for (let j = overlapChains.iterator(); j.hasNext();) {
          const testChain = j.next();

          if (testChain.getId() > queryChain.getId()) {
            queryChain.computeOverlaps(testChain, overlapAction);
            this._nOverlaps++;
          }

          if (this._segInt.isDone()) return null;
        }
      }
    }

  }

  class SegmentOverlapAction extends MonotoneChainOverlapAction {
    constructor() {
      super();
      SegmentOverlapAction.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._si = null;
      const si = arguments[0];
      this._si = si;
    }

    overlap() {
      if (arguments.length === 4) {
        const mc1 = arguments[0],
              start1 = arguments[1],
              mc2 = arguments[2],
              start2 = arguments[3];
        const ss1 = mc1.getContext();
        const ss2 = mc2.getContext();

        this._si.processIntersections(ss1, start1, ss2, start2);
      } else {
        return super.overlap.apply(this, arguments);
      }
    }

  }

  MCIndexNoder.SegmentOverlapAction = SegmentOverlapAction;

  class ScaledNoder {
    constructor() {
      ScaledNoder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._noder = null;
      this._scaleFactor = null;
      this._offsetX = null;
      this._offsetY = null;
      this._isScaled = false;

      if (arguments.length === 2) {
        const noder = arguments[0],
              scaleFactor = arguments[1];
        ScaledNoder.constructor_.call(this, noder, scaleFactor, 0, 0);
      } else if (arguments.length === 4) {
        const noder = arguments[0],
              scaleFactor = arguments[1];
        this._noder = noder;
        this._scaleFactor = scaleFactor;
        this._isScaled = !this.isIntegerPrecision();
      }
    }

    rescale() {
      if (hasInterface(arguments[0], Collection)) {
        const segStrings = arguments[0];

        for (let i = segStrings.iterator(); i.hasNext();) {
          const ss = i.next();
          this.rescale(ss.getCoordinates());
        }
      } else if (arguments[0] instanceof Array) {
        const pts = arguments[0];

        for (let i = 0; i < pts.length; i++) {
          pts[i].x = pts[i].x / this._scaleFactor + this._offsetX;
          pts[i].y = pts[i].y / this._scaleFactor + this._offsetY;
        }

        if (pts.length === 2 && pts[0].equals2D(pts[1])) System.out.println(pts);
      }
    }

    scale() {
      if (hasInterface(arguments[0], Collection)) {
        const segStrings = arguments[0];
        const nodedSegmentStrings = new ArrayList(segStrings.size());

        for (let i = segStrings.iterator(); i.hasNext();) {
          const ss = i.next();
          nodedSegmentStrings.add(new NodedSegmentString(this.scale(ss.getCoordinates()), ss.getData()));
        }

        return nodedSegmentStrings;
      } else if (arguments[0] instanceof Array) {
        const pts = arguments[0];
        const roundPts = new Array(pts.length).fill(null);

        for (let i = 0; i < pts.length; i++) roundPts[i] = new Coordinate(Math.round((pts[i].x - this._offsetX) * this._scaleFactor), Math.round((pts[i].y - this._offsetY) * this._scaleFactor), pts[i].getZ());

        const roundPtsNoDup = CoordinateArrays.removeRepeatedPoints(roundPts);
        return roundPtsNoDup;
      }
    }

    isIntegerPrecision() {
      return this._scaleFactor === 1.0;
    }

    getNodedSubstrings() {
      const splitSS = this._noder.getNodedSubstrings();

      if (this._isScaled) this.rescale(splitSS);
      return splitSS;
    }

    computeNodes(inputSegStrings) {
      let intSegStrings = inputSegStrings;
      if (this._isScaled) intSegStrings = this.scale(inputSegStrings);

      this._noder.computeNodes(intSegStrings);
    }

    get interfaces_() {
      return [Noder];
    }

  }

  var noding = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MCIndexNoder: MCIndexNoder,
    ScaledNoder: ScaledNoder,
    SegmentString: SegmentString
  });

  class BoundaryOp {
    constructor() {
      BoundaryOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geom = null;
      this._geomFact = null;
      this._bnRule = null;
      this._endpointMap = null;

      if (arguments.length === 1) {
        const geom = arguments[0];
        BoundaryOp.constructor_.call(this, geom, BoundaryNodeRule.MOD2_BOUNDARY_RULE);
      } else if (arguments.length === 2) {
        const geom = arguments[0],
              bnRule = arguments[1];
        this._geom = geom;
        this._geomFact = geom.getFactory();
        this._bnRule = bnRule;
      }
    }

    static getBoundary() {
      if (arguments.length === 1) {
        const g = arguments[0];
        const bop = new BoundaryOp(g);
        return bop.getBoundary();
      } else if (arguments.length === 2) {
        const g = arguments[0],
              bnRule = arguments[1];
        const bop = new BoundaryOp(g, bnRule);
        return bop.getBoundary();
      }
    }

    boundaryMultiLineString(mLine) {
      if (this._geom.isEmpty()) return this.getEmptyMultiPoint();
      const bdyPts = this.computeBoundaryCoordinates(mLine);
      if (bdyPts.length === 1) return this._geomFact.createPoint(bdyPts[0]);
      return this._geomFact.createMultiPointFromCoords(bdyPts);
    }

    getBoundary() {
      if (this._geom instanceof LineString) return this.boundaryLineString(this._geom);
      if (this._geom instanceof MultiLineString) return this.boundaryMultiLineString(this._geom);
      return this._geom.getBoundary();
    }

    boundaryLineString(line) {
      if (this._geom.isEmpty()) return this.getEmptyMultiPoint();

      if (line.isClosed()) {
        const closedEndpointOnBoundary = this._bnRule.isInBoundary(2);

        if (closedEndpointOnBoundary) return line.getStartPoint();else return this._geomFact.createMultiPoint();
      }

      return this._geomFact.createMultiPoint([line.getStartPoint(), line.getEndPoint()]);
    }

    getEmptyMultiPoint() {
      return this._geomFact.createMultiPoint();
    }

    computeBoundaryCoordinates(mLine) {
      const bdyPts = new ArrayList();
      this._endpointMap = new TreeMap();

      for (let i = 0; i < mLine.getNumGeometries(); i++) {
        const line = mLine.getGeometryN(i);
        if (line.getNumPoints() === 0) continue;
        this.addEndpoint(line.getCoordinateN(0));
        this.addEndpoint(line.getCoordinateN(line.getNumPoints() - 1));
      }

      for (let it = this._endpointMap.entrySet().iterator(); it.hasNext();) {
        const entry = it.next();
        const counter = entry.getValue();
        const valence = counter.count;
        if (this._bnRule.isInBoundary(valence)) bdyPts.add(entry.getKey());
      }

      return CoordinateArrays.toCoordinateArray(bdyPts);
    }

    addEndpoint(pt) {
      let counter = this._endpointMap.get(pt);

      if (counter === null) {
        counter = new Counter$1();

        this._endpointMap.put(pt, counter);
      }

      counter.count++;
    }

  }

  class Counter$1 {
    constructor() {
      Counter$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.count = null;
    }

  }

  class IsSimpleOp {
    constructor() {
      IsSimpleOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputGeom = null;
      this._isClosedEndpointsInInterior = true;
      this._nonSimpleLocation = null;

      if (arguments.length === 1) {
        const geom = arguments[0];
        this._inputGeom = geom;
      } else if (arguments.length === 2) {
        const geom = arguments[0],
              boundaryNodeRule = arguments[1];
        this._inputGeom = geom;
        this._isClosedEndpointsInInterior = !boundaryNodeRule.isInBoundary(2);
      }
    }

    static isSimple() {
      if (arguments.length === 1) {
        const geom = arguments[0];
        const op = new IsSimpleOp(geom);
        return op.isSimple();
      } else if (arguments.length === 2) {
        const geom = arguments[0],
              boundaryNodeRule = arguments[1];
        const op = new IsSimpleOp(geom, boundaryNodeRule);
        return op.isSimple();
      }
    }

    isSimpleMultiPoint(mp) {
      if (mp.isEmpty()) return true;
      const points = new TreeSet();

      for (let i = 0; i < mp.getNumGeometries(); i++) {
        const pt = mp.getGeometryN(i);
        const p = pt.getCoordinate();

        if (points.contains(p)) {
          this._nonSimpleLocation = p;
          return false;
        }

        points.add(p);
      }

      return true;
    }

    isSimplePolygonal(geom) {
      const rings = LinearComponentExtracter.getLines(geom);

      for (let i = rings.iterator(); i.hasNext();) {
        const ring = i.next();
        if (!this.isSimpleLinearGeometry(ring)) return false;
      }

      return true;
    }

    hasClosedEndpointIntersection(graph) {
      const endPoints = new TreeMap();

      for (let i = graph.getEdgeIterator(); i.hasNext();) {
        const e = i.next();
        const isClosed = e.isClosed();
        const p0 = e.getCoordinate(0);
        this.addEndpoint(endPoints, p0, isClosed);
        const p1 = e.getCoordinate(e.getNumPoints() - 1);
        this.addEndpoint(endPoints, p1, isClosed);
      }

      for (let i = endPoints.values().iterator(); i.hasNext();) {
        const eiInfo = i.next();

        if (eiInfo.isClosed && eiInfo.degree !== 2) {
          this._nonSimpleLocation = eiInfo.getCoordinate();
          return true;
        }
      }

      return false;
    }

    getNonSimpleLocation() {
      return this._nonSimpleLocation;
    }

    isSimpleLinearGeometry(geom) {
      if (geom.isEmpty()) return true;
      const graph = new GeometryGraph(0, geom);
      const li = new RobustLineIntersector();
      const si = graph.computeSelfNodes(li, true);
      if (!si.hasIntersection()) return true;

      if (si.hasProperIntersection()) {
        this._nonSimpleLocation = si.getProperIntersectionPoint();
        return false;
      }

      if (this.hasNonEndpointIntersection(graph)) return false;
      if (this._isClosedEndpointsInInterior) if (this.hasClosedEndpointIntersection(graph)) return false;
      return true;
    }

    hasNonEndpointIntersection(graph) {
      for (let i = graph.getEdgeIterator(); i.hasNext();) {
        const e = i.next();
        const maxSegmentIndex = e.getMaximumSegmentIndex();

        for (let eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext();) {
          const ei = eiIt.next();

          if (!ei.isEndPoint(maxSegmentIndex)) {
            this._nonSimpleLocation = ei.getCoordinate();
            return true;
          }
        }
      }

      return false;
    }

    addEndpoint(endPoints, p, isClosed) {
      let eiInfo = endPoints.get(p);

      if (eiInfo === null) {
        eiInfo = new EndpointInfo(p);
        endPoints.put(p, eiInfo);
      }

      eiInfo.addEndpoint(isClosed);
    }

    computeSimple(geom) {
      this._nonSimpleLocation = null;
      if (geom.isEmpty()) return true;
      if (geom instanceof LineString) return this.isSimpleLinearGeometry(geom);
      if (geom instanceof MultiLineString) return this.isSimpleLinearGeometry(geom);
      if (geom instanceof MultiPoint) return this.isSimpleMultiPoint(geom);
      if (hasInterface(geom, Polygonal)) return this.isSimplePolygonal(geom);
      if (geom instanceof GeometryCollection) return this.isSimpleGeometryCollection(geom);
      return true;
    }

    isSimple() {
      this._nonSimpleLocation = null;
      return this.computeSimple(this._inputGeom);
    }

    isSimpleGeometryCollection(geom) {
      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const comp = geom.getGeometryN(i);
        if (!this.computeSimple(comp)) return false;
      }

      return true;
    }

  }

  class EndpointInfo {
    constructor() {
      EndpointInfo.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.pt = null;
      this.isClosed = null;
      this.degree = null;
      const pt = arguments[0];
      this.pt = pt;
      this.isClosed = false;
      this.degree = 0;
    }

    addEndpoint(isClosed) {
      this.degree++;
      this.isClosed |= isClosed;
    }

    getCoordinate() {
      return this.pt;
    }

  }

  IsSimpleOp.EndpointInfo = EndpointInfo;

  class BufferParameters {
    constructor() {
      BufferParameters.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
      this._endCapStyle = BufferParameters.CAP_ROUND;
      this._joinStyle = BufferParameters.JOIN_ROUND;
      this._mitreLimit = BufferParameters.DEFAULT_MITRE_LIMIT;
      this._isSingleSided = false;
      this._simplifyFactor = BufferParameters.DEFAULT_SIMPLIFY_FACTOR;

      if (arguments.length === 0) ; else if (arguments.length === 1) {
        const quadrantSegments = arguments[0];
        this.setQuadrantSegments(quadrantSegments);
      } else if (arguments.length === 2) {
        const quadrantSegments = arguments[0],
              endCapStyle = arguments[1];
        this.setQuadrantSegments(quadrantSegments);
        this.setEndCapStyle(endCapStyle);
      } else if (arguments.length === 4) {
        const quadrantSegments = arguments[0],
              endCapStyle = arguments[1],
              joinStyle = arguments[2],
              mitreLimit = arguments[3];
        this.setQuadrantSegments(quadrantSegments);
        this.setEndCapStyle(endCapStyle);
        this.setJoinStyle(joinStyle);
        this.setMitreLimit(mitreLimit);
      }
    }

    static bufferDistanceError(quadSegs) {
      const alpha = Math.PI / 2.0 / quadSegs;
      return 1 - Math.cos(alpha / 2.0);
    }

    getEndCapStyle() {
      return this._endCapStyle;
    }

    isSingleSided() {
      return this._isSingleSided;
    }

    setQuadrantSegments(quadSegs) {
      this._quadrantSegments = quadSegs;
      if (this._quadrantSegments === 0) this._joinStyle = BufferParameters.JOIN_BEVEL;

      if (this._quadrantSegments < 0) {
        this._joinStyle = BufferParameters.JOIN_MITRE;
        this._mitreLimit = Math.abs(this._quadrantSegments);
      }

      if (quadSegs <= 0) this._quadrantSegments = 1;
      if (this._joinStyle !== BufferParameters.JOIN_ROUND) this._quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
    }

    getJoinStyle() {
      return this._joinStyle;
    }

    setJoinStyle(joinStyle) {
      this._joinStyle = joinStyle;
    }

    setSimplifyFactor(simplifyFactor) {
      this._simplifyFactor = simplifyFactor < 0 ? 0 : simplifyFactor;
    }

    getSimplifyFactor() {
      return this._simplifyFactor;
    }

    getQuadrantSegments() {
      return this._quadrantSegments;
    }

    setEndCapStyle(endCapStyle) {
      this._endCapStyle = endCapStyle;
    }

    getMitreLimit() {
      return this._mitreLimit;
    }

    setMitreLimit(mitreLimit) {
      this._mitreLimit = mitreLimit;
    }

    setSingleSided(isSingleSided) {
      this._isSingleSided = isSingleSided;
    }

  }
  BufferParameters.CAP_ROUND = 1;
  BufferParameters.CAP_FLAT = 2;
  BufferParameters.CAP_SQUARE = 3;
  BufferParameters.JOIN_ROUND = 1;
  BufferParameters.JOIN_MITRE = 2;
  BufferParameters.JOIN_BEVEL = 3;
  BufferParameters.DEFAULT_QUADRANT_SEGMENTS = 8;
  BufferParameters.DEFAULT_MITRE_LIMIT = 5.0;
  BufferParameters.DEFAULT_SIMPLIFY_FACTOR = 0.01;

  class RightmostEdgeFinder {
    constructor() {
      RightmostEdgeFinder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._minIndex = -1;
      this._minCoord = null;
      this._minDe = null;
      this._orientedDe = null;
    }

    getCoordinate() {
      return this._minCoord;
    }

    getRightmostSide(de, index) {
      let side = this.getRightmostSideOfSegment(de, index);
      if (side < 0) side = this.getRightmostSideOfSegment(de, index - 1);

      if (side < 0) {
        this._minCoord = null;
        this.checkForRightmostCoordinate(de);
      }

      return side;
    }

    findRightmostEdgeAtVertex() {
      const pts = this._minDe.getEdge().getCoordinates();

      Assert.isTrue(this._minIndex > 0 && this._minIndex < pts.length, 'rightmost point expected to be interior vertex of edge');
      const pPrev = pts[this._minIndex - 1];
      const pNext = pts[this._minIndex + 1];
      const orientation = Orientation.index(this._minCoord, pNext, pPrev);
      let usePrev = false;
      if (pPrev.y < this._minCoord.y && pNext.y < this._minCoord.y && orientation === Orientation.COUNTERCLOCKWISE) usePrev = true;else if (pPrev.y > this._minCoord.y && pNext.y > this._minCoord.y && orientation === Orientation.CLOCKWISE) usePrev = true;
      if (usePrev) this._minIndex = this._minIndex - 1;
    }

    getRightmostSideOfSegment(de, i) {
      const e = de.getEdge();
      const coord = e.getCoordinates();
      if (i < 0 || i + 1 >= coord.length) return -1;
      if (coord[i].y === coord[i + 1].y) return -1;
      let pos = Position.LEFT;
      if (coord[i].y < coord[i + 1].y) pos = Position.RIGHT;
      return pos;
    }

    getEdge() {
      return this._orientedDe;
    }

    checkForRightmostCoordinate(de) {
      const coord = de.getEdge().getCoordinates();

      for (let i = 0; i < coord.length - 1; i++) if (this._minCoord === null || coord[i].x > this._minCoord.x) {
        this._minDe = de;
        this._minIndex = i;
        this._minCoord = coord[i];
      }
    }

    findRightmostEdgeAtNode() {
      const node = this._minDe.getNode();

      const star = node.getEdges();
      this._minDe = star.getRightmostEdge();

      if (!this._minDe.isForward()) {
        this._minDe = this._minDe.getSym();
        this._minIndex = this._minDe.getEdge().getCoordinates().length - 1;
      }
    }

    findEdge(dirEdgeList) {
      for (let i = dirEdgeList.iterator(); i.hasNext();) {
        const de = i.next();
        if (!de.isForward()) continue;
        this.checkForRightmostCoordinate(de);
      }

      Assert.isTrue(this._minIndex !== 0 || this._minCoord.equals(this._minDe.getCoordinate()), 'inconsistency in rightmost processing');
      if (this._minIndex === 0) this.findRightmostEdgeAtNode();else this.findRightmostEdgeAtVertex();
      this._orientedDe = this._minDe;
      const rightmostSide = this.getRightmostSide(this._minDe, this._minIndex);
      if (rightmostSide === Position.LEFT) this._orientedDe = this._minDe.getSym();
    }

  }

  class LinkedList {
    constructor() {
      this.array = [];
    }

    addLast(e) {
      this.array.push(e);
    }

    removeFirst() {
      return this.array.shift();
    }

    isEmpty() {
      return this.array.length === 0;
    }

  }

  class BufferSubgraph {
    constructor() {
      BufferSubgraph.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._finder = null;
      this._dirEdgeList = new ArrayList();
      this._nodes = new ArrayList();
      this._rightMostCoord = null;
      this._env = null;
      this._finder = new RightmostEdgeFinder();
    }

    clearVisitedEdges() {
      for (let it = this._dirEdgeList.iterator(); it.hasNext();) {
        const de = it.next();
        de.setVisited(false);
      }
    }

    getRightmostCoordinate() {
      return this._rightMostCoord;
    }

    computeNodeDepth(n) {
      let startEdge = null;

      for (let i = n.getEdges().iterator(); i.hasNext();) {
        const de = i.next();

        if (de.isVisited() || de.getSym().isVisited()) {
          startEdge = de;
          break;
        }
      }

      if (startEdge === null) throw new TopologyException('unable to find edge to compute depths at ' + n.getCoordinate());
      n.getEdges().computeDepths(startEdge);

      for (let i = n.getEdges().iterator(); i.hasNext();) {
        const de = i.next();
        de.setVisited(true);
        this.copySymDepths(de);
      }
    }

    computeDepth(outsideDepth) {
      this.clearVisitedEdges();

      const de = this._finder.getEdge();

      de.getNode();
      de.getLabel();
      de.setEdgeDepths(Position.RIGHT, outsideDepth);
      this.copySymDepths(de);
      this.computeDepths(de);
    }

    create(node) {
      this.addReachable(node);

      this._finder.findEdge(this._dirEdgeList);

      this._rightMostCoord = this._finder.getCoordinate();
    }

    findResultEdges() {
      for (let it = this._dirEdgeList.iterator(); it.hasNext();) {
        const de = it.next();
        if (de.getDepth(Position.RIGHT) >= 1 && de.getDepth(Position.LEFT) <= 0 && !de.isInteriorAreaEdge()) de.setInResult(true);
      }
    }

    computeDepths(startEdge) {
      const nodesVisited = new HashSet();
      const nodeQueue = new LinkedList();
      const startNode = startEdge.getNode();
      nodeQueue.addLast(startNode);
      nodesVisited.add(startNode);
      startEdge.setVisited(true);

      while (!nodeQueue.isEmpty()) {
        const n = nodeQueue.removeFirst();
        nodesVisited.add(n);
        this.computeNodeDepth(n);

        for (let i = n.getEdges().iterator(); i.hasNext();) {
          const de = i.next();
          const sym = de.getSym();
          if (sym.isVisited()) continue;
          const adjNode = sym.getNode();

          if (!nodesVisited.contains(adjNode)) {
            nodeQueue.addLast(adjNode);
            nodesVisited.add(adjNode);
          }
        }
      }
    }

    compareTo(o) {
      const graph = o;
      if (this._rightMostCoord.x < graph._rightMostCoord.x) return -1;
      if (this._rightMostCoord.x > graph._rightMostCoord.x) return 1;
      return 0;
    }

    getEnvelope() {
      if (this._env === null) {
        const edgeEnv = new Envelope();

        for (let it = this._dirEdgeList.iterator(); it.hasNext();) {
          const dirEdge = it.next();
          const pts = dirEdge.getEdge().getCoordinates();

          for (let i = 0; i < pts.length - 1; i++) edgeEnv.expandToInclude(pts[i]);
        }

        this._env = edgeEnv;
      }

      return this._env;
    }

    addReachable(startNode) {
      const nodeStack = new Stack();
      nodeStack.add(startNode);

      while (!nodeStack.empty()) {
        const node = nodeStack.pop();
        this.add(node, nodeStack);
      }
    }

    copySymDepths(de) {
      const sym = de.getSym();
      sym.setDepth(Position.LEFT, de.getDepth(Position.RIGHT));
      sym.setDepth(Position.RIGHT, de.getDepth(Position.LEFT));
    }

    add(node, nodeStack) {
      node.setVisited(true);

      this._nodes.add(node);

      for (let i = node.getEdges().iterator(); i.hasNext();) {
        const de = i.next();

        this._dirEdgeList.add(de);

        const sym = de.getSym();
        const symNode = sym.getNode();
        if (!symNode.isVisited()) nodeStack.push(symNode);
      }
    }

    getNodes() {
      return this._nodes;
    }

    getDirectedEdges() {
      return this._dirEdgeList;
    }

    get interfaces_() {
      return [Comparable];
    }

  }

  class EdgeRing$1 {
    constructor() {
      EdgeRing$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._startDe = null;
      this._maxNodeDegree = -1;
      this._edges = new ArrayList();
      this._pts = new ArrayList();
      this._label = new Label(Location.NONE);
      this._ring = null;
      this._isHole = null;
      this._shell = null;
      this._holes = new ArrayList();
      this._geometryFactory = null;

      if (arguments.length === 0) ; else if (arguments.length === 2) {
        const start = arguments[0],
              geometryFactory = arguments[1];
        this._geometryFactory = geometryFactory;
        this.computePoints(start);
        this.computeRing();
      }
    }

    computeRing() {
      if (this._ring !== null) return null;
      const coord = new Array(this._pts.size()).fill(null);

      for (let i = 0; i < this._pts.size(); i++) coord[i] = this._pts.get(i);

      this._ring = this._geometryFactory.createLinearRing(coord);
      this._isHole = Orientation.isCCW(this._ring.getCoordinates());
    }

    isIsolated() {
      return this._label.getGeometryCount() === 1;
    }

    computePoints(start) {
      this._startDe = start;
      let de = start;
      let isFirstEdge = true;

      do {
        if (de === null) throw new TopologyException('Found null DirectedEdge');
        if (de.getEdgeRing() === this) throw new TopologyException('Directed Edge visited twice during ring-building at ' + de.getCoordinate());

        this._edges.add(de);

        const label = de.getLabel();
        Assert.isTrue(label.isArea());
        this.mergeLabel(label);
        this.addPoints(de.getEdge(), de.isForward(), isFirstEdge);
        isFirstEdge = false;
        this.setEdgeRing(de, this);
        de = this.getNext(de);
      } while (de !== this._startDe);
    }

    getLinearRing() {
      return this._ring;
    }

    getCoordinate(i) {
      return this._pts.get(i);
    }

    computeMaxNodeDegree() {
      this._maxNodeDegree = 0;
      let de = this._startDe;

      do {
        const node = de.getNode();
        const degree = node.getEdges().getOutgoingDegree(this);
        if (degree > this._maxNodeDegree) this._maxNodeDegree = degree;
        de = this.getNext(de);
      } while (de !== this._startDe);

      this._maxNodeDegree *= 2;
    }

    addPoints(edge, isForward, isFirstEdge) {
      const edgePts = edge.getCoordinates();

      if (isForward) {
        let startIndex = 1;
        if (isFirstEdge) startIndex = 0;

        for (let i = startIndex; i < edgePts.length; i++) this._pts.add(edgePts[i]);
      } else {
        let startIndex = edgePts.length - 2;
        if (isFirstEdge) startIndex = edgePts.length - 1;

        for (let i = startIndex; i >= 0; i--) this._pts.add(edgePts[i]);
      }
    }

    isHole() {
      return this._isHole;
    }

    setInResult() {
      let de = this._startDe;

      do {
        de.getEdge().setInResult(true);
        de = de.getNext();
      } while (de !== this._startDe);
    }

    containsPoint(p) {
      const shell = this.getLinearRing();
      const env = shell.getEnvelopeInternal();
      if (!env.contains(p)) return false;
      if (!PointLocation.isInRing(p, shell.getCoordinates())) return false;

      for (let i = this._holes.iterator(); i.hasNext();) {
        const hole = i.next();
        if (hole.containsPoint(p)) return false;
      }

      return true;
    }

    addHole(ring) {
      this._holes.add(ring);
    }

    isShell() {
      return this._shell === null;
    }

    getLabel() {
      return this._label;
    }

    getEdges() {
      return this._edges;
    }

    getMaxNodeDegree() {
      if (this._maxNodeDegree < 0) this.computeMaxNodeDegree();
      return this._maxNodeDegree;
    }

    getShell() {
      return this._shell;
    }

    mergeLabel() {
      if (arguments.length === 1) {
        const deLabel = arguments[0];
        this.mergeLabel(deLabel, 0);
        this.mergeLabel(deLabel, 1);
      } else if (arguments.length === 2) {
        const deLabel = arguments[0],
              geomIndex = arguments[1];
        const loc = deLabel.getLocation(geomIndex, Position.RIGHT);
        if (loc === Location.NONE) return null;

        if (this._label.getLocation(geomIndex) === Location.NONE) {
          this._label.setLocation(geomIndex, loc);

          return null;
        }
      }
    }

    setShell(shell) {
      this._shell = shell;
      if (shell !== null) shell.addHole(this);
    }

    toPolygon(geometryFactory) {
      const holeLR = new Array(this._holes.size()).fill(null);

      for (let i = 0; i < this._holes.size(); i++) holeLR[i] = this._holes.get(i).getLinearRing();

      const poly = geometryFactory.createPolygon(this.getLinearRing(), holeLR);
      return poly;
    }

  }

  class MinimalEdgeRing extends EdgeRing$1 {
    constructor() {
      super();
      MinimalEdgeRing.constructor_.apply(this, arguments);
    }

    static constructor_() {
      const start = arguments[0],
            geometryFactory = arguments[1];
      EdgeRing$1.constructor_.call(this, start, geometryFactory);
    }

    setEdgeRing(de, er) {
      de.setMinEdgeRing(er);
    }

    getNext(de) {
      return de.getNextMin();
    }

  }

  class MaximalEdgeRing extends EdgeRing$1 {
    constructor() {
      super();
      MaximalEdgeRing.constructor_.apply(this, arguments);
    }

    static constructor_() {
      const start = arguments[0],
            geometryFactory = arguments[1];
      EdgeRing$1.constructor_.call(this, start, geometryFactory);
    }

    buildMinimalRings() {
      const minEdgeRings = new ArrayList();
      let de = this._startDe;

      do {
        if (de.getMinEdgeRing() === null) {
          const minEr = new MinimalEdgeRing(de, this._geometryFactory);
          minEdgeRings.add(minEr);
        }

        de = de.getNext();
      } while (de !== this._startDe);

      return minEdgeRings;
    }

    setEdgeRing(de, er) {
      de.setEdgeRing(er);
    }

    linkDirectedEdgesForMinimalEdgeRings() {
      let de = this._startDe;

      do {
        const node = de.getNode();
        node.getEdges().linkMinimalDirectedEdges(this);
        de = de.getNext();
      } while (de !== this._startDe);
    }

    getNext(de) {
      return de.getNext();
    }

  }

  class PolygonBuilder {
    constructor() {
      PolygonBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geometryFactory = null;
      this._shellList = new ArrayList();
      const geometryFactory = arguments[0];
      this._geometryFactory = geometryFactory;
    }

    static findEdgeRingContaining(testEr, shellList) {
      const testRing = testEr.getLinearRing();
      const testEnv = testRing.getEnvelopeInternal();
      let testPt = testRing.getCoordinateN(0);
      let minShell = null;
      let minShellEnv = null;

      for (let it = shellList.iterator(); it.hasNext();) {
        const tryShell = it.next();
        const tryShellRing = tryShell.getLinearRing();
        const tryShellEnv = tryShellRing.getEnvelopeInternal();
        if (tryShellEnv.equals(testEnv)) continue;
        if (!tryShellEnv.contains(testEnv)) continue;
        testPt = CoordinateArrays.ptNotInList(testRing.getCoordinates(), tryShellRing.getCoordinates());
        let isContained = false;
        if (PointLocation.isInRing(testPt, tryShellRing.getCoordinates())) isContained = true;
        if (isContained) if (minShell === null || minShellEnv.contains(tryShellEnv)) {
          minShell = tryShell;
          minShellEnv = minShell.getLinearRing().getEnvelopeInternal();
        }
      }

      return minShell;
    }

    sortShellsAndHoles(edgeRings, shellList, freeHoleList) {
      for (let it = edgeRings.iterator(); it.hasNext();) {
        const er = it.next();
        if (er.isHole()) freeHoleList.add(er);else shellList.add(er);
      }
    }

    computePolygons(shellList) {
      const resultPolyList = new ArrayList();

      for (let it = shellList.iterator(); it.hasNext();) {
        const er = it.next();
        const poly = er.toPolygon(this._geometryFactory);
        resultPolyList.add(poly);
      }

      return resultPolyList;
    }

    placeFreeHoles(shellList, freeHoleList) {
      for (let it = freeHoleList.iterator(); it.hasNext();) {
        const hole = it.next();

        if (hole.getShell() === null) {
          const shell = PolygonBuilder.findEdgeRingContaining(hole, shellList);
          if (shell === null) throw new TopologyException('unable to assign hole to a shell', hole.getCoordinate(0));
          hole.setShell(shell);
        }
      }
    }

    buildMinimalEdgeRings(maxEdgeRings, shellList, freeHoleList) {
      const edgeRings = new ArrayList();

      for (let it = maxEdgeRings.iterator(); it.hasNext();) {
        const er = it.next();

        if (er.getMaxNodeDegree() > 2) {
          er.linkDirectedEdgesForMinimalEdgeRings();
          const minEdgeRings = er.buildMinimalRings();
          const shell = this.findShell(minEdgeRings);

          if (shell !== null) {
            this.placePolygonHoles(shell, minEdgeRings);
            shellList.add(shell);
          } else {
            freeHoleList.addAll(minEdgeRings);
          }
        } else {
          edgeRings.add(er);
        }
      }

      return edgeRings;
    }

    buildMaximalEdgeRings(dirEdges) {
      const maxEdgeRings = new ArrayList();

      for (let it = dirEdges.iterator(); it.hasNext();) {
        const de = it.next();
        if (de.isInResult() && de.getLabel().isArea()) if (de.getEdgeRing() === null) {
          const er = new MaximalEdgeRing(de, this._geometryFactory);
          maxEdgeRings.add(er);
          er.setInResult();
        }
      }

      return maxEdgeRings;
    }

    placePolygonHoles(shell, minEdgeRings) {
      for (let it = minEdgeRings.iterator(); it.hasNext();) {
        const er = it.next();
        if (er.isHole()) er.setShell(shell);
      }
    }

    getPolygons() {
      const resultPolyList = this.computePolygons(this._shellList);
      return resultPolyList;
    }

    findShell(minEdgeRings) {
      let shellCount = 0;
      let shell = null;

      for (let it = minEdgeRings.iterator(); it.hasNext();) {
        const er = it.next();

        if (!er.isHole()) {
          shell = er;
          shellCount++;
        }
      }

      Assert.isTrue(shellCount <= 1, 'found two shells in MinimalEdgeRing list');
      return shell;
    }

    add() {
      if (arguments.length === 1) {
        const graph = arguments[0];
        this.add(graph.getEdgeEnds(), graph.getNodes());
      } else if (arguments.length === 2) {
        const dirEdges = arguments[0],
              nodes = arguments[1];
        PlanarGraph$1.linkResultDirectedEdges(nodes);
        const maxEdgeRings = this.buildMaximalEdgeRings(dirEdges);
        const freeHoleList = new ArrayList();
        const edgeRings = this.buildMinimalEdgeRings(maxEdgeRings, this._shellList, freeHoleList);
        this.sortShellsAndHoles(edgeRings, this._shellList, freeHoleList);
        this.placeFreeHoles(this._shellList, freeHoleList);
      }
    }

  }

  class BufferInputLineSimplifier {
    constructor() {
      BufferInputLineSimplifier.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputLine = null;
      this._distanceTol = null;
      this._isDeleted = null;
      this._angleOrientation = Orientation.COUNTERCLOCKWISE;
      const inputLine = arguments[0];
      this._inputLine = inputLine;
    }

    static simplify(inputLine, distanceTol) {
      const simp = new BufferInputLineSimplifier(inputLine);
      return simp.simplify(distanceTol);
    }

    isDeletable(i0, i1, i2, distanceTol) {
      const p0 = this._inputLine[i0];
      const p1 = this._inputLine[i1];
      const p2 = this._inputLine[i2];
      if (!this.isConcave(p0, p1, p2)) return false;
      if (!this.isShallow(p0, p1, p2, distanceTol)) return false;
      return this.isShallowSampled(p0, p1, i0, i2, distanceTol);
    }

    deleteShallowConcavities() {
      let index = 1;
      let midIndex = this.findNextNonDeletedIndex(index);
      let lastIndex = this.findNextNonDeletedIndex(midIndex);
      let isChanged = false;

      while (lastIndex < this._inputLine.length) {
        let isMiddleVertexDeleted = false;

        if (this.isDeletable(index, midIndex, lastIndex, this._distanceTol)) {
          this._isDeleted[midIndex] = BufferInputLineSimplifier.DELETE;
          isMiddleVertexDeleted = true;
          isChanged = true;
        }

        if (isMiddleVertexDeleted) index = lastIndex;else index = midIndex;
        midIndex = this.findNextNonDeletedIndex(index);
        lastIndex = this.findNextNonDeletedIndex(midIndex);
      }

      return isChanged;
    }

    isShallowConcavity(p0, p1, p2, distanceTol) {
      const orientation = Orientation.index(p0, p1, p2);
      const isAngleToSimplify = orientation === this._angleOrientation;
      if (!isAngleToSimplify) return false;
      const dist = Distance.pointToSegment(p1, p0, p2);
      return dist < distanceTol;
    }

    isShallowSampled(p0, p2, i0, i2, distanceTol) {
      let inc = Math.trunc((i2 - i0) / BufferInputLineSimplifier.NUM_PTS_TO_CHECK);
      if (inc <= 0) inc = 1;

      for (let i = i0; i < i2; i += inc) if (!this.isShallow(p0, p2, this._inputLine[i], distanceTol)) return false;

      return true;
    }

    isConcave(p0, p1, p2) {
      const orientation = Orientation.index(p0, p1, p2);
      const isConcave = orientation === this._angleOrientation;
      return isConcave;
    }

    simplify(distanceTol) {
      this._distanceTol = Math.abs(distanceTol);
      if (distanceTol < 0) this._angleOrientation = Orientation.CLOCKWISE;
      this._isDeleted = new Array(this._inputLine.length).fill(null);
      let isChanged = false;

      do isChanged = this.deleteShallowConcavities(); while (isChanged);

      return this.collapseLine();
    }

    findNextNonDeletedIndex(index) {
      let next = index + 1;

      while (next < this._inputLine.length && this._isDeleted[next] === BufferInputLineSimplifier.DELETE) next++;

      return next;
    }

    isShallow(p0, p1, p2, distanceTol) {
      const dist = Distance.pointToSegment(p1, p0, p2);
      return dist < distanceTol;
    }

    collapseLine() {
      const coordList = new CoordinateList();

      for (let i = 0; i < this._inputLine.length; i++) if (this._isDeleted[i] !== BufferInputLineSimplifier.DELETE) coordList.add(this._inputLine[i]);

      return coordList.toCoordinateArray();
    }

  }
  BufferInputLineSimplifier.INIT = 0;
  BufferInputLineSimplifier.DELETE = 1;
  BufferInputLineSimplifier.KEEP = 1;
  BufferInputLineSimplifier.NUM_PTS_TO_CHECK = 10;

  class OffsetSegmentString {
    constructor() {
      OffsetSegmentString.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._ptList = null;
      this._precisionModel = null;
      this._minimimVertexDistance = 0.0;
      this._ptList = new ArrayList();
    }

    getCoordinates() {
      const coord = this._ptList.toArray(OffsetSegmentString.COORDINATE_ARRAY_TYPE);

      return coord;
    }

    setPrecisionModel(precisionModel) {
      this._precisionModel = precisionModel;
    }

    addPt(pt) {
      const bufPt = new Coordinate(pt);

      this._precisionModel.makePrecise(bufPt);

      if (this.isRedundant(bufPt)) return null;

      this._ptList.add(bufPt);
    }

    reverse() {}

    addPts(pt, isForward) {
      if (isForward) for (let i = 0; i < pt.length; i++) this.addPt(pt[i]);else for (let i = pt.length - 1; i >= 0; i--) this.addPt(pt[i]);
    }

    isRedundant(pt) {
      if (this._ptList.size() < 1) return false;

      const lastPt = this._ptList.get(this._ptList.size() - 1);

      const ptDist = pt.distance(lastPt);
      if (ptDist < this._minimimVertexDistance) return true;
      return false;
    }

    toString() {
      const fact = new GeometryFactory();
      const line = fact.createLineString(this.getCoordinates());
      return line.toString();
    }

    closeRing() {
      if (this._ptList.size() < 1) return null;
      const startPt = new Coordinate(this._ptList.get(0));

      const lastPt = this._ptList.get(this._ptList.size() - 1);

      if (startPt.equals(lastPt)) return null;

      this._ptList.add(startPt);
    }

    setMinimumVertexDistance(minimimVertexDistance) {
      this._minimimVertexDistance = minimimVertexDistance;
    }

  }
  OffsetSegmentString.COORDINATE_ARRAY_TYPE = new Array(0).fill(null);

  class OffsetSegmentGenerator {
    constructor() {
      OffsetSegmentGenerator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._maxCurveSegmentError = 0.0;
      this._filletAngleQuantum = null;
      this._closingSegLengthFactor = 1;
      this._segList = null;
      this._distance = 0.0;
      this._precisionModel = null;
      this._bufParams = null;
      this._li = null;
      this._s0 = null;
      this._s1 = null;
      this._s2 = null;
      this._seg0 = new LineSegment();
      this._seg1 = new LineSegment();
      this._offset0 = new LineSegment();
      this._offset1 = new LineSegment();
      this._side = 0;
      this._hasNarrowConcaveAngle = false;
      const precisionModel = arguments[0],
            bufParams = arguments[1],
            distance = arguments[2];
      this._precisionModel = precisionModel;
      this._bufParams = bufParams;
      this._li = new RobustLineIntersector();
      this._filletAngleQuantum = Math.PI / 2.0 / bufParams.getQuadrantSegments();
      if (bufParams.getQuadrantSegments() >= 8 && bufParams.getJoinStyle() === BufferParameters.JOIN_ROUND) this._closingSegLengthFactor = OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR;
      this.init(distance);
    }

    addNextSegment(p, addStartPoint) {
      this._s0 = this._s1;
      this._s1 = this._s2;
      this._s2 = p;

      this._seg0.setCoordinates(this._s0, this._s1);

      this.computeOffsetSegment(this._seg0, this._side, this._distance, this._offset0);

      this._seg1.setCoordinates(this._s1, this._s2);

      this.computeOffsetSegment(this._seg1, this._side, this._distance, this._offset1);
      if (this._s1.equals(this._s2)) return null;
      const orientation = Orientation.index(this._s0, this._s1, this._s2);
      const outsideTurn = orientation === Orientation.CLOCKWISE && this._side === Position.LEFT || orientation === Orientation.COUNTERCLOCKWISE && this._side === Position.RIGHT;
      if (orientation === 0) this.addCollinear(addStartPoint);else if (outsideTurn) this.addOutsideTurn(orientation, addStartPoint);else this.addInsideTurn(orientation, addStartPoint);
    }

    addLineEndCap(p0, p1) {
      const seg = new LineSegment(p0, p1);
      const offsetL = new LineSegment();
      this.computeOffsetSegment(seg, Position.LEFT, this._distance, offsetL);
      const offsetR = new LineSegment();
      this.computeOffsetSegment(seg, Position.RIGHT, this._distance, offsetR);
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const angle = Math.atan2(dy, dx);

      switch (this._bufParams.getEndCapStyle()) {
        case BufferParameters.CAP_ROUND:
          this._segList.addPt(offsetL.p1);

          this.addDirectedFillet(p1, angle + Math.PI / 2, angle - Math.PI / 2, Orientation.CLOCKWISE, this._distance);

          this._segList.addPt(offsetR.p1);

          break;

        case BufferParameters.CAP_FLAT:
          this._segList.addPt(offsetL.p1);

          this._segList.addPt(offsetR.p1);

          break;

        case BufferParameters.CAP_SQUARE:
          const squareCapSideOffset = new Coordinate();
          squareCapSideOffset.x = Math.abs(this._distance) * Math.cos(angle);
          squareCapSideOffset.y = Math.abs(this._distance) * Math.sin(angle);
          const squareCapLOffset = new Coordinate(offsetL.p1.x + squareCapSideOffset.x, offsetL.p1.y + squareCapSideOffset.y);
          const squareCapROffset = new Coordinate(offsetR.p1.x + squareCapSideOffset.x, offsetR.p1.y + squareCapSideOffset.y);

          this._segList.addPt(squareCapLOffset);

          this._segList.addPt(squareCapROffset);

          break;
      }
    }

    getCoordinates() {
      const pts = this._segList.getCoordinates();

      return pts;
    }

    addMitreJoin(p, offset0, offset1, distance) {
      const intPt = Intersection.intersection(offset0.p0, offset0.p1, offset1.p0, offset1.p1);

      if (intPt !== null) {
        const mitreRatio = distance <= 0.0 ? 1.0 : intPt.distance(p) / Math.abs(distance);

        if (mitreRatio <= this._bufParams.getMitreLimit()) {
          this._segList.addPt(intPt);

          return null;
        }
      }

      this.addLimitedMitreJoin(offset0, offset1, distance, this._bufParams.getMitreLimit());
    }

    addOutsideTurn(orientation, addStartPoint) {
      if (this._offset0.p1.distance(this._offset1.p0) < this._distance * OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR) {
        this._segList.addPt(this._offset0.p1);

        return null;
      }

      if (this._bufParams.getJoinStyle() === BufferParameters.JOIN_MITRE) {
        this.addMitreJoin(this._s1, this._offset0, this._offset1, this._distance);
      } else if (this._bufParams.getJoinStyle() === BufferParameters.JOIN_BEVEL) {
        this.addBevelJoin(this._offset0, this._offset1);
      } else {
        if (addStartPoint) this._segList.addPt(this._offset0.p1);
        this.addCornerFillet(this._s1, this._offset0.p1, this._offset1.p0, orientation, this._distance);

        this._segList.addPt(this._offset1.p0);
      }
    }

    createSquare(p) {
      this._segList.addPt(new Coordinate(p.x + this._distance, p.y + this._distance));

      this._segList.addPt(new Coordinate(p.x + this._distance, p.y - this._distance));

      this._segList.addPt(new Coordinate(p.x - this._distance, p.y - this._distance));

      this._segList.addPt(new Coordinate(p.x - this._distance, p.y + this._distance));

      this._segList.closeRing();
    }

    addSegments(pt, isForward) {
      this._segList.addPts(pt, isForward);
    }

    addFirstSegment() {
      this._segList.addPt(this._offset1.p0);
    }

    addCornerFillet(p, p0, p1, direction, radius) {
      const dx0 = p0.x - p.x;
      const dy0 = p0.y - p.y;
      let startAngle = Math.atan2(dy0, dx0);
      const dx1 = p1.x - p.x;
      const dy1 = p1.y - p.y;
      const endAngle = Math.atan2(dy1, dx1);

      if (direction === Orientation.CLOCKWISE) {
        if (startAngle <= endAngle) startAngle += 2.0 * Math.PI;
      } else {
        if (startAngle >= endAngle) startAngle -= 2.0 * Math.PI;
      }

      this._segList.addPt(p0);

      this.addDirectedFillet(p, startAngle, endAngle, direction, radius);

      this._segList.addPt(p1);
    }

    addLastSegment() {
      this._segList.addPt(this._offset1.p1);
    }

    initSideSegments(s1, s2, side) {
      this._s1 = s1;
      this._s2 = s2;
      this._side = side;

      this._seg1.setCoordinates(s1, s2);

      this.computeOffsetSegment(this._seg1, side, this._distance, this._offset1);
    }

    addLimitedMitreJoin(offset0, offset1, distance, mitreLimit) {
      const basePt = this._seg0.p1;
      const ang0 = Angle.angle(basePt, this._seg0.p0);
      const angDiff = Angle.angleBetweenOriented(this._seg0.p0, basePt, this._seg1.p1);
      const angDiffHalf = angDiff / 2;
      const midAng = Angle.normalize(ang0 + angDiffHalf);
      const mitreMidAng = Angle.normalize(midAng + Math.PI);
      const mitreDist = mitreLimit * distance;
      const bevelDelta = mitreDist * Math.abs(Math.sin(angDiffHalf));
      const bevelHalfLen = distance - bevelDelta;
      const bevelMidX = basePt.x + mitreDist * Math.cos(mitreMidAng);
      const bevelMidY = basePt.y + mitreDist * Math.sin(mitreMidAng);
      const bevelMidPt = new Coordinate(bevelMidX, bevelMidY);
      const mitreMidLine = new LineSegment(basePt, bevelMidPt);
      const bevelEndLeft = mitreMidLine.pointAlongOffset(1.0, bevelHalfLen);
      const bevelEndRight = mitreMidLine.pointAlongOffset(1.0, -bevelHalfLen);

      if (this._side === Position.LEFT) {
        this._segList.addPt(bevelEndLeft);

        this._segList.addPt(bevelEndRight);
      } else {
        this._segList.addPt(bevelEndRight);

        this._segList.addPt(bevelEndLeft);
      }
    }

    addDirectedFillet(p, startAngle, endAngle, direction, radius) {
      const directionFactor = direction === Orientation.CLOCKWISE ? -1 : 1;
      const totalAngle = Math.abs(startAngle - endAngle);
      const nSegs = Math.trunc(totalAngle / this._filletAngleQuantum + 0.5);
      if (nSegs < 1) return null;
      const angleInc = totalAngle / nSegs;
      const pt = new Coordinate();

      for (let i = 0; i < nSegs; i++) {
        const angle = startAngle + directionFactor * i * angleInc;
        pt.x = p.x + radius * Math.cos(angle);
        pt.y = p.y + radius * Math.sin(angle);

        this._segList.addPt(pt);
      }
    }

    computeOffsetSegment(seg, side, distance, offset) {
      const sideSign = side === Position.LEFT ? 1 : -1;
      const dx = seg.p1.x - seg.p0.x;
      const dy = seg.p1.y - seg.p0.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const ux = sideSign * distance * dx / len;
      const uy = sideSign * distance * dy / len;
      offset.p0.x = seg.p0.x - uy;
      offset.p0.y = seg.p0.y + ux;
      offset.p1.x = seg.p1.x - uy;
      offset.p1.y = seg.p1.y + ux;
    }

    addInsideTurn(orientation, addStartPoint) {
      this._li.computeIntersection(this._offset0.p0, this._offset0.p1, this._offset1.p0, this._offset1.p1);

      if (this._li.hasIntersection()) {
        this._segList.addPt(this._li.getIntersection(0));
      } else {
        this._hasNarrowConcaveAngle = true;

        if (this._offset0.p1.distance(this._offset1.p0) < this._distance * OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR) {
          this._segList.addPt(this._offset0.p1);
        } else {
          this._segList.addPt(this._offset0.p1);

          if (this._closingSegLengthFactor > 0) {
            const mid0 = new Coordinate((this._closingSegLengthFactor * this._offset0.p1.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset0.p1.y + this._s1.y) / (this._closingSegLengthFactor + 1));

            this._segList.addPt(mid0);

            const mid1 = new Coordinate((this._closingSegLengthFactor * this._offset1.p0.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset1.p0.y + this._s1.y) / (this._closingSegLengthFactor + 1));

            this._segList.addPt(mid1);
          } else {
            this._segList.addPt(this._s1);
          }

          this._segList.addPt(this._offset1.p0);
        }
      }
    }

    createCircle(p) {
      const pt = new Coordinate(p.x + this._distance, p.y);

      this._segList.addPt(pt);

      this.addDirectedFillet(p, 0.0, 2.0 * Math.PI, -1, this._distance);

      this._segList.closeRing();
    }

    addBevelJoin(offset0, offset1) {
      this._segList.addPt(offset0.p1);

      this._segList.addPt(offset1.p0);
    }

    init(distance) {
      this._distance = distance;
      this._maxCurveSegmentError = distance * (1 - Math.cos(this._filletAngleQuantum / 2.0));
      this._segList = new OffsetSegmentString();

      this._segList.setPrecisionModel(this._precisionModel);

      this._segList.setMinimumVertexDistance(distance * OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR);
    }

    addCollinear(addStartPoint) {
      this._li.computeIntersection(this._s0, this._s1, this._s1, this._s2);

      const numInt = this._li.getIntersectionNum();

      if (numInt >= 2) if (this._bufParams.getJoinStyle() === BufferParameters.JOIN_BEVEL || this._bufParams.getJoinStyle() === BufferParameters.JOIN_MITRE) {
        if (addStartPoint) this._segList.addPt(this._offset0.p1);

        this._segList.addPt(this._offset1.p0);
      } else {
        this.addCornerFillet(this._s1, this._offset0.p1, this._offset1.p0, Orientation.CLOCKWISE, this._distance);
      }
    }

    closeRing() {
      this._segList.closeRing();
    }

    hasNarrowConcaveAngle() {
      return this._hasNarrowConcaveAngle;
    }

  }
  OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR = 1.0E-3;
  OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR = 1.0E-3;
  OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR = 1.0E-6;
  OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR = 80;

  class OffsetCurveBuilder {
    constructor() {
      OffsetCurveBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._distance = 0.0;
      this._precisionModel = null;
      this._bufParams = null;
      const precisionModel = arguments[0],
            bufParams = arguments[1];
      this._precisionModel = precisionModel;
      this._bufParams = bufParams;
    }

    static copyCoordinates(pts) {
      const copy = new Array(pts.length).fill(null);

      for (let i = 0; i < copy.length; i++) copy[i] = new Coordinate(pts[i]);

      return copy;
    }

    getOffsetCurve(inputPts, distance) {
      this._distance = distance;
      if (distance === 0.0) return null;
      const isRightSide = distance < 0.0;
      const posDistance = Math.abs(distance);
      const segGen = this.getSegGen(posDistance);
      if (inputPts.length <= 1) this.computePointCurve(inputPts[0], segGen);else this.computeOffsetCurve(inputPts, isRightSide, segGen);
      const curvePts = segGen.getCoordinates();
      if (isRightSide) CoordinateArrays.reverse(curvePts);
      return curvePts;
    }

    computeSingleSidedBufferCurve(inputPts, isRightSide, segGen) {
      const distTol = this.simplifyTolerance(this._distance);

      if (isRightSide) {
        segGen.addSegments(inputPts, true);
        const simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
        const n2 = simp2.length - 1;
        segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
        segGen.addFirstSegment();

        for (let i = n2 - 2; i >= 0; i--) segGen.addNextSegment(simp2[i], true);
      } else {
        segGen.addSegments(inputPts, false);
        const simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
        const n1 = simp1.length - 1;
        segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
        segGen.addFirstSegment();

        for (let i = 2; i <= n1; i++) segGen.addNextSegment(simp1[i], true);
      }

      segGen.addLastSegment();
      segGen.closeRing();
    }

    computeRingBufferCurve(inputPts, side, segGen) {
      let distTol = this.simplifyTolerance(this._distance);
      if (side === Position.RIGHT) distTol = -distTol;
      const simp = BufferInputLineSimplifier.simplify(inputPts, distTol);
      const n = simp.length - 1;
      segGen.initSideSegments(simp[n - 1], simp[0], side);

      for (let i = 1; i <= n; i++) {
        const addStartPoint = i !== 1;
        segGen.addNextSegment(simp[i], addStartPoint);
      }

      segGen.closeRing();
    }

    computeLineBufferCurve(inputPts, segGen) {
      const distTol = this.simplifyTolerance(this._distance);
      const simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
      const n1 = simp1.length - 1;
      segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);

      for (let i = 2; i <= n1; i++) segGen.addNextSegment(simp1[i], true);

      segGen.addLastSegment();
      segGen.addLineEndCap(simp1[n1 - 1], simp1[n1]);
      const simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
      const n2 = simp2.length - 1;
      segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);

      for (let i = n2 - 2; i >= 0; i--) segGen.addNextSegment(simp2[i], true);

      segGen.addLastSegment();
      segGen.addLineEndCap(simp2[1], simp2[0]);
      segGen.closeRing();
    }

    computePointCurve(pt, segGen) {
      switch (this._bufParams.getEndCapStyle()) {
        case BufferParameters.CAP_ROUND:
          segGen.createCircle(pt);
          break;

        case BufferParameters.CAP_SQUARE:
          segGen.createSquare(pt);
          break;
      }
    }

    getLineCurve(inputPts, distance) {
      this._distance = distance;
      if (this.isLineOffsetEmpty(distance)) return null;
      const posDistance = Math.abs(distance);
      const segGen = this.getSegGen(posDistance);

      if (inputPts.length <= 1) {
        this.computePointCurve(inputPts[0], segGen);
      } else if (this._bufParams.isSingleSided()) {
        const isRightSide = distance < 0.0;
        this.computeSingleSidedBufferCurve(inputPts, isRightSide, segGen);
      } else {
        this.computeLineBufferCurve(inputPts, segGen);
      }

      const lineCoord = segGen.getCoordinates();
      return lineCoord;
    }

    getBufferParameters() {
      return this._bufParams;
    }

    simplifyTolerance(bufDistance) {
      return bufDistance * this._bufParams.getSimplifyFactor();
    }

    getRingCurve(inputPts, side, distance) {
      this._distance = distance;
      if (inputPts.length <= 2) return this.getLineCurve(inputPts, distance);
      if (distance === 0.0) return OffsetCurveBuilder.copyCoordinates(inputPts);
      const segGen = this.getSegGen(distance);
      this.computeRingBufferCurve(inputPts, side, segGen);
      return segGen.getCoordinates();
    }

    computeOffsetCurve(inputPts, isRightSide, segGen) {
      const distTol = this.simplifyTolerance(this._distance);

      if (isRightSide) {
        const simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
        const n2 = simp2.length - 1;
        segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
        segGen.addFirstSegment();

        for (let i = n2 - 2; i >= 0; i--) segGen.addNextSegment(simp2[i], true);
      } else {
        const simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
        const n1 = simp1.length - 1;
        segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
        segGen.addFirstSegment();

        for (let i = 2; i <= n1; i++) segGen.addNextSegment(simp1[i], true);
      }

      segGen.addLastSegment();
    }

    isLineOffsetEmpty(distance) {
      if (distance === 0.0) return true;
      if (distance < 0.0 && !this._bufParams.isSingleSided()) return true;
      return false;
    }

    getSegGen(distance) {
      return new OffsetSegmentGenerator(this._precisionModel, this._bufParams, distance);
    }

  }

  class SubgraphDepthLocater {
    constructor() {
      SubgraphDepthLocater.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._subgraphs = null;
      this._seg = new LineSegment();
      const subgraphs = arguments[0];
      this._subgraphs = subgraphs;
    }

    findStabbedSegments() {
      if (arguments.length === 1) {
        const stabbingRayLeftPt = arguments[0];
        const stabbedSegments = new ArrayList();

        for (let i = this._subgraphs.iterator(); i.hasNext();) {
          const bsg = i.next();
          const env = bsg.getEnvelope();
          if (stabbingRayLeftPt.y < env.getMinY() || stabbingRayLeftPt.y > env.getMaxY()) continue;
          this.findStabbedSegments(stabbingRayLeftPt, bsg.getDirectedEdges(), stabbedSegments);
        }

        return stabbedSegments;
      } else if (arguments.length === 3) {
        if (hasInterface(arguments[2], List) && arguments[0] instanceof Coordinate && arguments[1] instanceof DirectedEdge$1) {
          const stabbingRayLeftPt = arguments[0],
                dirEdge = arguments[1],
                stabbedSegments = arguments[2];
          const pts = dirEdge.getEdge().getCoordinates();

          for (let i = 0; i < pts.length - 1; i++) {
            this._seg.p0 = pts[i];
            this._seg.p1 = pts[i + 1];
            if (this._seg.p0.y > this._seg.p1.y) this._seg.reverse();
            const maxx = Math.max(this._seg.p0.x, this._seg.p1.x);
            if (maxx < stabbingRayLeftPt.x) continue;
            if (this._seg.isHorizontal()) continue;
            if (stabbingRayLeftPt.y < this._seg.p0.y || stabbingRayLeftPt.y > this._seg.p1.y) continue;
            if (Orientation.index(this._seg.p0, this._seg.p1, stabbingRayLeftPt) === Orientation.RIGHT) continue;
            let depth = dirEdge.getDepth(Position.LEFT);
            if (!this._seg.p0.equals(pts[i])) depth = dirEdge.getDepth(Position.RIGHT);
            const ds = new DepthSegment(this._seg, depth);
            stabbedSegments.add(ds);
          }
        } else if (hasInterface(arguments[2], List) && arguments[0] instanceof Coordinate && hasInterface(arguments[1], List)) {
          const stabbingRayLeftPt = arguments[0],
                dirEdges = arguments[1],
                stabbedSegments = arguments[2];

          for (let i = dirEdges.iterator(); i.hasNext();) {
            const de = i.next();
            if (!de.isForward()) continue;
            this.findStabbedSegments(stabbingRayLeftPt, de, stabbedSegments);
          }
        }
      }
    }

    getDepth(p) {
      const stabbedSegments = this.findStabbedSegments(p);
      if (stabbedSegments.size() === 0) return 0;
      const ds = Collections.min(stabbedSegments);
      return ds._leftDepth;
    }

  }

  class DepthSegment {
    constructor() {
      DepthSegment.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._upwardSeg = null;
      this._leftDepth = null;
      const seg = arguments[0],
            depth = arguments[1];
      this._upwardSeg = new LineSegment(seg);
      this._leftDepth = depth;
    }

    compareTo(obj) {
      const other = obj;
      if (this._upwardSeg.minX() >= other._upwardSeg.maxX()) return 1;
      if (this._upwardSeg.maxX() <= other._upwardSeg.minX()) return -1;

      let orientIndex = this._upwardSeg.orientationIndex(other._upwardSeg);

      if (orientIndex !== 0) return orientIndex;
      orientIndex = -1 * other._upwardSeg.orientationIndex(this._upwardSeg);
      if (orientIndex !== 0) return orientIndex;
      return this._upwardSeg.compareTo(other._upwardSeg);
    }

    compareX(seg0, seg1) {
      const compare0 = seg0.p0.compareTo(seg1.p0);
      if (compare0 !== 0) return compare0;
      return seg0.p1.compareTo(seg1.p1);
    }

    toString() {
      return this._upwardSeg.toString();
    }

    get interfaces_() {
      return [Comparable];
    }

  }

  SubgraphDepthLocater.DepthSegment = DepthSegment;

  class OffsetCurveSetBuilder {
    constructor() {
      OffsetCurveSetBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputGeom = null;
      this._distance = null;
      this._curveBuilder = null;
      this._curveList = new ArrayList();
      const inputGeom = arguments[0],
            distance = arguments[1],
            curveBuilder = arguments[2];
      this._inputGeom = inputGeom;
      this._distance = distance;
      this._curveBuilder = curveBuilder;
    }

    addRingSide(coord, offsetDistance, side, cwLeftLoc, cwRightLoc) {
      if (offsetDistance === 0.0 && coord.length < LinearRing.MINIMUM_VALID_SIZE) return null;
      let leftLoc = cwLeftLoc;
      let rightLoc = cwRightLoc;

      if (coord.length >= LinearRing.MINIMUM_VALID_SIZE && Orientation.isCCW(coord)) {
        leftLoc = cwRightLoc;
        rightLoc = cwLeftLoc;
        side = Position.opposite(side);
      }

      const curve = this._curveBuilder.getRingCurve(coord, side, offsetDistance);

      this.addCurve(curve, leftLoc, rightLoc);
    }

    addRingBothSides(coord, distance) {
      this.addRingSide(coord, distance, Position.LEFT, Location.EXTERIOR, Location.INTERIOR);
      this.addRingSide(coord, distance, Position.RIGHT, Location.INTERIOR, Location.EXTERIOR);
    }

    addPoint(p) {
      if (this._distance <= 0.0) return null;
      const coord = p.getCoordinates();

      const curve = this._curveBuilder.getLineCurve(coord, this._distance);

      this.addCurve(curve, Location.EXTERIOR, Location.INTERIOR);
    }

    addPolygon(p) {
      let offsetDistance = this._distance;
      let offsetSide = Position.LEFT;

      if (this._distance < 0.0) {
        offsetDistance = -this._distance;
        offsetSide = Position.RIGHT;
      }

      const shell = p.getExteriorRing();
      const shellCoord = CoordinateArrays.removeRepeatedPoints(shell.getCoordinates());
      if (this._distance < 0.0 && this.isErodedCompletely(shell, this._distance)) return null;
      if (this._distance <= 0.0 && shellCoord.length < 3) return null;
      this.addRingSide(shellCoord, offsetDistance, offsetSide, Location.EXTERIOR, Location.INTERIOR);

      for (let i = 0; i < p.getNumInteriorRing(); i++) {
        const hole = p.getInteriorRingN(i);
        const holeCoord = CoordinateArrays.removeRepeatedPoints(hole.getCoordinates());
        if (this._distance > 0.0 && this.isErodedCompletely(hole, -this._distance)) continue;
        this.addRingSide(holeCoord, offsetDistance, Position.opposite(offsetSide), Location.INTERIOR, Location.EXTERIOR);
      }
    }

    isTriangleErodedCompletely(triangleCoord, bufferDistance) {
      const tri = new Triangle(triangleCoord[0], triangleCoord[1], triangleCoord[2]);
      const inCentre = tri.inCentre();
      const distToCentre = Distance.pointToSegment(inCentre, tri.p0, tri.p1);
      return distToCentre < Math.abs(bufferDistance);
    }

    addLineString(line) {
      if (this._curveBuilder.isLineOffsetEmpty(this._distance)) return null;
      const coord = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());

      if (CoordinateArrays.isRing(coord) && !this._curveBuilder.getBufferParameters().isSingleSided()) {
        this.addRingBothSides(coord, this._distance);
      } else {
        const curve = this._curveBuilder.getLineCurve(coord, this._distance);

        this.addCurve(curve, Location.EXTERIOR, Location.INTERIOR);
      }
    }

    addCurve(coord, leftLoc, rightLoc) {
      if (coord === null || coord.length < 2) return null;
      const e = new NodedSegmentString(coord, new Label(0, Location.BOUNDARY, leftLoc, rightLoc));

      this._curveList.add(e);
    }

    getCurves() {
      this.add(this._inputGeom);
      return this._curveList;
    }

    add(g) {
      if (g.isEmpty()) return null;
      if (g instanceof Polygon) this.addPolygon(g);else if (g instanceof LineString) this.addLineString(g);else if (g instanceof Point) this.addPoint(g);else if (g instanceof MultiPoint) this.addCollection(g);else if (g instanceof MultiLineString) this.addCollection(g);else if (g instanceof MultiPolygon) this.addCollection(g);else if (g instanceof GeometryCollection) this.addCollection(g);else throw new UnsupportedOperationException(g.getGeometryType());
    }

    isErodedCompletely(ring, bufferDistance) {
      const ringCoord = ring.getCoordinates();
      if (ringCoord.length < 4) return bufferDistance < 0;
      if (ringCoord.length === 4) return this.isTriangleErodedCompletely(ringCoord, bufferDistance);
      const env = ring.getEnvelopeInternal();
      const envMinDimension = Math.min(env.getHeight(), env.getWidth());
      if (bufferDistance < 0.0 && 2 * Math.abs(bufferDistance) > envMinDimension) return true;
      return false;
    }

    addCollection(gc) {
      for (let i = 0; i < gc.getNumGeometries(); i++) {
        const g = gc.getGeometryN(i);
        this.add(g);
      }
    }

  }

  class EdgeEndStar {
    constructor() {
      EdgeEndStar.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._edgeMap = new TreeMap();
      this._edgeList = null;
      this._ptInAreaLocation = [Location.NONE, Location.NONE];
    }

    getNextCW(ee) {
      this.getEdges();

      const i = this._edgeList.indexOf(ee);

      let iNextCW = i - 1;
      if (i === 0) iNextCW = this._edgeList.size() - 1;
      return this._edgeList.get(iNextCW);
    }

    propagateSideLabels(geomIndex) {
      let startLoc = Location.NONE;

      for (let it = this.iterator(); it.hasNext();) {
        const e = it.next();
        const label = e.getLabel();
        if (label.isArea(geomIndex) && label.getLocation(geomIndex, Position.LEFT) !== Location.NONE) startLoc = label.getLocation(geomIndex, Position.LEFT);
      }

      if (startLoc === Location.NONE) return null;
      let currLoc = startLoc;

      for (let it = this.iterator(); it.hasNext();) {
        const e = it.next();
        const label = e.getLabel();
        if (label.getLocation(geomIndex, Position.ON) === Location.NONE) label.setLocation(geomIndex, Position.ON, currLoc);

        if (label.isArea(geomIndex)) {
          const leftLoc = label.getLocation(geomIndex, Position.LEFT);
          const rightLoc = label.getLocation(geomIndex, Position.RIGHT);

          if (rightLoc !== Location.NONE) {
            if (rightLoc !== currLoc) throw new TopologyException('side location conflict', e.getCoordinate());
            if (leftLoc === Location.NONE) Assert.shouldNeverReachHere('found single null side (at ' + e.getCoordinate() + ')');
            currLoc = leftLoc;
          } else {
            Assert.isTrue(label.getLocation(geomIndex, Position.LEFT) === Location.NONE, 'found single null side');
            label.setLocation(geomIndex, Position.RIGHT, currLoc);
            label.setLocation(geomIndex, Position.LEFT, currLoc);
          }
        }
      }
    }

    getCoordinate() {
      const it = this.iterator();
      if (!it.hasNext()) return null;
      const e = it.next();
      return e.getCoordinate();
    }

    print(out) {
      System.out.println('EdgeEndStar:   ' + this.getCoordinate());

      for (let it = this.iterator(); it.hasNext();) {
        const e = it.next();
        e.print(out);
      }
    }

    isAreaLabelsConsistent(geomGraph) {
      this.computeEdgeEndLabels(geomGraph.getBoundaryNodeRule());
      return this.checkAreaLabelsConsistent(0);
    }

    checkAreaLabelsConsistent(geomIndex) {
      const edges = this.getEdges();
      if (edges.size() <= 0) return true;
      const lastEdgeIndex = edges.size() - 1;
      const startLabel = edges.get(lastEdgeIndex).getLabel();
      const startLoc = startLabel.getLocation(geomIndex, Position.LEFT);
      Assert.isTrue(startLoc !== Location.NONE, 'Found unlabelled area edge');
      let currLoc = startLoc;

      for (let it = this.iterator(); it.hasNext();) {
        const e = it.next();
        const label = e.getLabel();
        Assert.isTrue(label.isArea(geomIndex), 'Found non-area edge');
        const leftLoc = label.getLocation(geomIndex, Position.LEFT);
        const rightLoc = label.getLocation(geomIndex, Position.RIGHT);
        if (leftLoc === rightLoc) return false;
        if (rightLoc !== currLoc) return false;
        currLoc = leftLoc;
      }

      return true;
    }

    findIndex(eSearch) {
      this.iterator();

      for (let i = 0; i < this._edgeList.size(); i++) {
        const e = this._edgeList.get(i);

        if (e === eSearch) return i;
      }

      return -1;
    }

    iterator() {
      return this.getEdges().iterator();
    }

    getEdges() {
      if (this._edgeList === null) this._edgeList = new ArrayList(this._edgeMap.values());
      return this._edgeList;
    }

    getLocation(geomIndex, p, geom) {
      if (this._ptInAreaLocation[geomIndex] === Location.NONE) this._ptInAreaLocation[geomIndex] = SimplePointInAreaLocator.locate(p, geom[geomIndex].getGeometry());
      return this._ptInAreaLocation[geomIndex];
    }

    toString() {
      const buf = new StringBuffer();
      buf.append('EdgeEndStar:   ' + this.getCoordinate());
      buf.append('\n');

      for (let it = this.iterator(); it.hasNext();) {
        const e = it.next();
        buf.append(e);
        buf.append('\n');
      }

      return buf.toString();
    }

    computeEdgeEndLabels(boundaryNodeRule) {
      for (let it = this.iterator(); it.hasNext();) {
        const ee = it.next();
        ee.computeLabel(boundaryNodeRule);
      }
    }

    computeLabelling(geomGraph) {
      this.computeEdgeEndLabels(geomGraph[0].getBoundaryNodeRule());
      this.propagateSideLabels(0);
      this.propagateSideLabels(1);
      const hasDimensionalCollapseEdge = [false, false];

      for (let it = this.iterator(); it.hasNext();) {
        const e = it.next();
        const label = e.getLabel();

        for (let geomi = 0; geomi < 2; geomi++) if (label.isLine(geomi) && label.getLocation(geomi) === Location.BOUNDARY) hasDimensionalCollapseEdge[geomi] = true;
      }

      for (let it = this.iterator(); it.hasNext();) {
        const e = it.next();
        const label = e.getLabel();

        for (let geomi = 0; geomi < 2; geomi++) if (label.isAnyNull(geomi)) {
          let loc = Location.NONE;

          if (hasDimensionalCollapseEdge[geomi]) {
            loc = Location.EXTERIOR;
          } else {
            const p = e.getCoordinate();
            loc = this.getLocation(geomi, p, geomGraph);
          }

          label.setAllLocationsIfNull(geomi, loc);
        }
      }
    }

    getDegree() {
      return this._edgeMap.size();
    }

    insertEdgeEnd(e, obj) {
      this._edgeMap.put(e, obj);

      this._edgeList = null;
    }

  }

  class DirectedEdgeStar$1 extends EdgeEndStar {
    constructor() {
      super();
      DirectedEdgeStar$1.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._resultAreaEdgeList = null;
      this._label = null;
      this._SCANNING_FOR_INCOMING = 1;
      this._LINKING_TO_OUTGOING = 2;
    }

    linkResultDirectedEdges() {
      this.getResultAreaEdges();
      let firstOut = null;
      let incoming = null;
      let state = this._SCANNING_FOR_INCOMING;

      for (let i = 0; i < this._resultAreaEdgeList.size(); i++) {
        const nextOut = this._resultAreaEdgeList.get(i);

        const nextIn = nextOut.getSym();
        if (!nextOut.getLabel().isArea()) continue;
        if (firstOut === null && nextOut.isInResult()) firstOut = nextOut;

        switch (state) {
          case this._SCANNING_FOR_INCOMING:
            if (!nextIn.isInResult()) continue;
            incoming = nextIn;
            state = this._LINKING_TO_OUTGOING;
            break;

          case this._LINKING_TO_OUTGOING:
            if (!nextOut.isInResult()) continue;
            incoming.setNext(nextOut);
            state = this._SCANNING_FOR_INCOMING;
            break;
        }
      }

      if (state === this._LINKING_TO_OUTGOING) {
        if (firstOut === null) throw new TopologyException('no outgoing dirEdge found', this.getCoordinate());
        Assert.isTrue(firstOut.isInResult(), 'unable to link last incoming dirEdge');
        incoming.setNext(firstOut);
      }
    }

    insert(ee) {
      const de = ee;
      this.insertEdgeEnd(de, de);
    }

    getRightmostEdge() {
      const edges = this.getEdges();
      const size = edges.size();
      if (size < 1) return null;
      const de0 = edges.get(0);
      if (size === 1) return de0;
      const deLast = edges.get(size - 1);
      const quad0 = de0.getQuadrant();
      const quad1 = deLast.getQuadrant();

      if (Quadrant.isNorthern(quad0) && Quadrant.isNorthern(quad1)) {
        return de0;
      } else if (!Quadrant.isNorthern(quad0) && !Quadrant.isNorthern(quad1)) {
        return deLast;
      } else {
        if (de0.getDy() !== 0) return de0;else if (deLast.getDy() !== 0) return deLast;
      }

      Assert.shouldNeverReachHere('found two horizontal edges incident on node');
      return null;
    }

    print(out) {
      System.out.println('DirectedEdgeStar: ' + this.getCoordinate());

      for (let it = this.iterator(); it.hasNext();) {
        const de = it.next();
        out.print('out ');
        de.print(out);
        out.println();
        out.print('in ');
        de.getSym().print(out);
        out.println();
      }
    }

    getResultAreaEdges() {
      if (this._resultAreaEdgeList !== null) return this._resultAreaEdgeList;
      this._resultAreaEdgeList = new ArrayList();

      for (let it = this.iterator(); it.hasNext();) {
        const de = it.next();
        if (de.isInResult() || de.getSym().isInResult()) this._resultAreaEdgeList.add(de);
      }

      return this._resultAreaEdgeList;
    }

    updateLabelling(nodeLabel) {
      for (let it = this.iterator(); it.hasNext();) {
        const de = it.next();
        const label = de.getLabel();
        label.setAllLocationsIfNull(0, nodeLabel.getLocation(0));
        label.setAllLocationsIfNull(1, nodeLabel.getLocation(1));
      }
    }

    linkAllDirectedEdges() {
      this.getEdges();
      let prevOut = null;
      let firstIn = null;

      for (let i = this._edgeList.size() - 1; i >= 0; i--) {
        const nextOut = this._edgeList.get(i);

        const nextIn = nextOut.getSym();
        if (firstIn === null) firstIn = nextIn;
        if (prevOut !== null) nextIn.setNext(prevOut);
        prevOut = nextOut;
      }

      firstIn.setNext(prevOut);
    }

    computeDepths() {
      if (arguments.length === 1) {
        const de = arguments[0];
        const edgeIndex = this.findIndex(de);
        const startDepth = de.getDepth(Position.LEFT);
        const targetLastDepth = de.getDepth(Position.RIGHT);
        const nextDepth = this.computeDepths(edgeIndex + 1, this._edgeList.size(), startDepth);
        const lastDepth = this.computeDepths(0, edgeIndex, nextDepth);
        if (lastDepth !== targetLastDepth) throw new TopologyException('depth mismatch at ' + de.getCoordinate());
      } else if (arguments.length === 3) {
        const startIndex = arguments[0],
              endIndex = arguments[1],
              startDepth = arguments[2];
        let currDepth = startDepth;

        for (let i = startIndex; i < endIndex; i++) {
          const nextDe = this._edgeList.get(i);

          nextDe.setEdgeDepths(Position.RIGHT, currDepth);
          currDepth = nextDe.getDepth(Position.LEFT);
        }

        return currDepth;
      }
    }

    mergeSymLabels() {
      for (let it = this.iterator(); it.hasNext();) {
        const de = it.next();
        const label = de.getLabel();
        label.merge(de.getSym().getLabel());
      }
    }

    linkMinimalDirectedEdges(er) {
      let firstOut = null;
      let incoming = null;
      let state = this._SCANNING_FOR_INCOMING;

      for (let i = this._resultAreaEdgeList.size() - 1; i >= 0; i--) {
        const nextOut = this._resultAreaEdgeList.get(i);

        const nextIn = nextOut.getSym();
        if (firstOut === null && nextOut.getEdgeRing() === er) firstOut = nextOut;

        switch (state) {
          case this._SCANNING_FOR_INCOMING:
            if (nextIn.getEdgeRing() !== er) continue;
            incoming = nextIn;
            state = this._LINKING_TO_OUTGOING;
            break;

          case this._LINKING_TO_OUTGOING:
            if (nextOut.getEdgeRing() !== er) continue;
            incoming.setNextMin(nextOut);
            state = this._SCANNING_FOR_INCOMING;
            break;
        }
      }

      if (state === this._LINKING_TO_OUTGOING) {
        Assert.isTrue(firstOut !== null, 'found null for first outgoing dirEdge');
        Assert.isTrue(firstOut.getEdgeRing() === er, 'unable to link last incoming dirEdge');
        incoming.setNextMin(firstOut);
      }
    }

    getOutgoingDegree() {
      if (arguments.length === 0) {
        let degree = 0;

        for (let it = this.iterator(); it.hasNext();) {
          const de = it.next();
          if (de.isInResult()) degree++;
        }

        return degree;
      } else if (arguments.length === 1) {
        const er = arguments[0];
        let degree = 0;

        for (let it = this.iterator(); it.hasNext();) {
          const de = it.next();
          if (de.getEdgeRing() === er) degree++;
        }

        return degree;
      }
    }

    getLabel() {
      return this._label;
    }

    findCoveredLineEdges() {
      let startLoc = Location.NONE;

      for (let it = this.iterator(); it.hasNext();) {
        const nextOut = it.next();
        const nextIn = nextOut.getSym();

        if (!nextOut.isLineEdge()) {
          if (nextOut.isInResult()) {
            startLoc = Location.INTERIOR;
            break;
          }

          if (nextIn.isInResult()) {
            startLoc = Location.EXTERIOR;
            break;
          }
        }
      }

      if (startLoc === Location.NONE) return null;
      let currLoc = startLoc;

      for (let it = this.iterator(); it.hasNext();) {
        const nextOut = it.next();
        const nextIn = nextOut.getSym();

        if (nextOut.isLineEdge()) {
          nextOut.getEdge().setCovered(currLoc === Location.INTERIOR);
        } else {
          if (nextOut.isInResult()) currLoc = Location.EXTERIOR;
          if (nextIn.isInResult()) currLoc = Location.INTERIOR;
        }
      }
    }

    computeLabelling(geom) {
      super.computeLabelling.call(this, geom);
      this._label = new Label(Location.NONE);

      for (let it = this.iterator(); it.hasNext();) {
        const ee = it.next();
        const e = ee.getEdge();
        const eLabel = e.getLabel();

        for (let i = 0; i < 2; i++) {
          const eLoc = eLabel.getLocation(i);
          if (eLoc === Location.INTERIOR || eLoc === Location.BOUNDARY) this._label.setLocation(i, Location.INTERIOR);
        }
      }
    }

  }

  class OverlayNodeFactory extends NodeFactory {
    constructor() {
      super();
    }

    createNode(coord) {
      return new Node$2(coord, new DirectedEdgeStar$1());
    }

  }

  class OrientedCoordinateArray {
    constructor() {
      OrientedCoordinateArray.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pts = null;
      this._orientation = null;
      const pts = arguments[0];
      this._pts = pts;
      this._orientation = OrientedCoordinateArray.orientation(pts);
    }

    static orientation(pts) {
      return CoordinateArrays.increasingDirection(pts) === 1;
    }

    static compareOriented(pts1, orientation1, pts2, orientation2) {
      const dir1 = orientation1 ? 1 : -1;
      const dir2 = orientation2 ? 1 : -1;
      const limit1 = orientation1 ? pts1.length : -1;
      const limit2 = orientation2 ? pts2.length : -1;
      let i1 = orientation1 ? 0 : pts1.length - 1;
      let i2 = orientation2 ? 0 : pts2.length - 1;

      while (true) {
        const compPt = pts1[i1].compareTo(pts2[i2]);
        if (compPt !== 0) return compPt;
        i1 += dir1;
        i2 += dir2;
        const done1 = i1 === limit1;
        const done2 = i2 === limit2;
        if (done1 && !done2) return -1;
        if (!done1 && done2) return 1;
        if (done1 && done2) return 0;
      }
    }

    compareTo(o1) {
      const oca = o1;
      const comp = OrientedCoordinateArray.compareOriented(this._pts, this._orientation, oca._pts, oca._orientation);
      return comp;
    }

    get interfaces_() {
      return [Comparable];
    }

  }

  class EdgeList {
    constructor() {
      EdgeList.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._edges = new ArrayList();
      this._ocaMap = new TreeMap();
    }

    print(out) {
      out.print('MULTILINESTRING ( ');

      for (let j = 0; j < this._edges.size(); j++) {
        const e = this._edges.get(j);

        if (j > 0) out.print(',');
        out.print('(');
        const pts = e.getCoordinates();

        for (let i = 0; i < pts.length; i++) {
          if (i > 0) out.print(',');
          out.print(pts[i].x + ' ' + pts[i].y);
        }

        out.println(')');
      }

      out.print(')  ');
    }

    addAll(edgeColl) {
      for (let i = edgeColl.iterator(); i.hasNext();) this.add(i.next());
    }

    findEdgeIndex(e) {
      for (let i = 0; i < this._edges.size(); i++) if (this._edges.get(i).equals(e)) return i;

      return -1;
    }

    iterator() {
      return this._edges.iterator();
    }

    getEdges() {
      return this._edges;
    }

    get(i) {
      return this._edges.get(i);
    }

    findEqualEdge(e) {
      const oca = new OrientedCoordinateArray(e.getCoordinates());

      const matchEdge = this._ocaMap.get(oca);

      return matchEdge;
    }

    add(e) {
      this._edges.add(e);

      const oca = new OrientedCoordinateArray(e.getCoordinates());

      this._ocaMap.put(oca, e);
    }

  }

  class SegmentIntersector {
    processIntersections(e0, segIndex0, e1, segIndex1) {}

    isDone() {}

  }

  class IntersectionAdder {
    constructor() {
      IntersectionAdder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._hasIntersection = false;
      this._hasProper = false;
      this._hasProperInterior = false;
      this._hasInterior = false;
      this._properIntersectionPoint = null;
      this._li = null;
      this._isSelfIntersection = null;
      this.numIntersections = 0;
      this.numInteriorIntersections = 0;
      this.numProperIntersections = 0;
      this.numTests = 0;
      const li = arguments[0];
      this._li = li;
    }

    static isAdjacentSegments(i1, i2) {
      return Math.abs(i1 - i2) === 1;
    }

    isTrivialIntersection(e0, segIndex0, e1, segIndex1) {
      if (e0 === e1) if (this._li.getIntersectionNum() === 1) {
        if (IntersectionAdder.isAdjacentSegments(segIndex0, segIndex1)) return true;

        if (e0.isClosed()) {
          const maxSegIndex = e0.size() - 1;
          if (segIndex0 === 0 && segIndex1 === maxSegIndex || segIndex1 === 0 && segIndex0 === maxSegIndex) return true;
        }
      }
      return false;
    }

    getProperIntersectionPoint() {
      return this._properIntersectionPoint;
    }

    hasProperInteriorIntersection() {
      return this._hasProperInterior;
    }

    getLineIntersector() {
      return this._li;
    }

    hasProperIntersection() {
      return this._hasProper;
    }

    processIntersections(e0, segIndex0, e1, segIndex1) {
      if (e0 === e1 && segIndex0 === segIndex1) return null;
      this.numTests++;
      const p00 = e0.getCoordinates()[segIndex0];
      const p01 = e0.getCoordinates()[segIndex0 + 1];
      const p10 = e1.getCoordinates()[segIndex1];
      const p11 = e1.getCoordinates()[segIndex1 + 1];

      this._li.computeIntersection(p00, p01, p10, p11);

      if (this._li.hasIntersection()) {
        this.numIntersections++;

        if (this._li.isInteriorIntersection()) {
          this.numInteriorIntersections++;
          this._hasInterior = true;
        }

        if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
          this._hasIntersection = true;
          e0.addIntersections(this._li, segIndex0, 0);
          e1.addIntersections(this._li, segIndex1, 1);

          if (this._li.isProper()) {
            this.numProperIntersections++;
            this._hasProper = true;
            this._hasProperInterior = true;
          }
        }
      }
    }

    hasIntersection() {
      return this._hasIntersection;
    }

    isDone() {
      return false;
    }

    hasInteriorIntersection() {
      return this._hasInterior;
    }

    get interfaces_() {
      return [SegmentIntersector];
    }

  }

  class BufferBuilder {
    constructor() {
      BufferBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._bufParams = null;
      this._workingPrecisionModel = null;
      this._workingNoder = null;
      this._geomFact = null;
      this._graph = null;
      this._edgeList = new EdgeList();
      const bufParams = arguments[0];
      this._bufParams = bufParams;
    }

    static depthDelta(label) {
      const lLoc = label.getLocation(0, Position.LEFT);
      const rLoc = label.getLocation(0, Position.RIGHT);
      if (lLoc === Location.INTERIOR && rLoc === Location.EXTERIOR) return 1;else if (lLoc === Location.EXTERIOR && rLoc === Location.INTERIOR) return -1;
      return 0;
    }

    static convertSegStrings(it) {
      const fact = new GeometryFactory();
      const lines = new ArrayList();

      while (it.hasNext()) {
        const ss = it.next();
        const line = fact.createLineString(ss.getCoordinates());
        lines.add(line);
      }

      return fact.buildGeometry(lines);
    }

    setWorkingPrecisionModel(pm) {
      this._workingPrecisionModel = pm;
    }

    insertUniqueEdge(e) {
      const existingEdge = this._edgeList.findEqualEdge(e);

      if (existingEdge !== null) {
        const existingLabel = existingEdge.getLabel();
        let labelToMerge = e.getLabel();

        if (!existingEdge.isPointwiseEqual(e)) {
          labelToMerge = new Label(e.getLabel());
          labelToMerge.flip();
        }

        existingLabel.merge(labelToMerge);
        const mergeDelta = BufferBuilder.depthDelta(labelToMerge);
        const existingDelta = existingEdge.getDepthDelta();
        const newDelta = existingDelta + mergeDelta;
        existingEdge.setDepthDelta(newDelta);
      } else {
        this._edgeList.add(e);

        e.setDepthDelta(BufferBuilder.depthDelta(e.getLabel()));
      }
    }

    buildSubgraphs(subgraphList, polyBuilder) {
      const processedGraphs = new ArrayList();

      for (let i = subgraphList.iterator(); i.hasNext();) {
        const subgraph = i.next();
        const p = subgraph.getRightmostCoordinate();
        const locater = new SubgraphDepthLocater(processedGraphs);
        const outsideDepth = locater.getDepth(p);
        subgraph.computeDepth(outsideDepth);
        subgraph.findResultEdges();
        processedGraphs.add(subgraph);
        polyBuilder.add(subgraph.getDirectedEdges(), subgraph.getNodes());
      }
    }

    createSubgraphs(graph) {
      const subgraphList = new ArrayList();

      for (let i = graph.getNodes().iterator(); i.hasNext();) {
        const node = i.next();

        if (!node.isVisited()) {
          const subgraph = new BufferSubgraph();
          subgraph.create(node);
          subgraphList.add(subgraph);
        }
      }

      Collections.sort(subgraphList, Collections.reverseOrder());
      return subgraphList;
    }

    createEmptyResultGeometry() {
      const emptyGeom = this._geomFact.createPolygon();

      return emptyGeom;
    }

    getNoder(precisionModel) {
      if (this._workingNoder !== null) return this._workingNoder;
      const noder = new MCIndexNoder();
      const li = new RobustLineIntersector();
      li.setPrecisionModel(precisionModel);
      noder.setSegmentIntersector(new IntersectionAdder(li));
      return noder;
    }

    buffer(g, distance) {
      let precisionModel = this._workingPrecisionModel;
      if (precisionModel === null) precisionModel = g.getPrecisionModel();
      this._geomFact = g.getFactory();
      const curveBuilder = new OffsetCurveBuilder(precisionModel, this._bufParams);
      const curveSetBuilder = new OffsetCurveSetBuilder(g, distance, curveBuilder);
      const bufferSegStrList = curveSetBuilder.getCurves();
      if (bufferSegStrList.size() <= 0) return this.createEmptyResultGeometry();
      this.computeNodedEdges(bufferSegStrList, precisionModel);
      this._graph = new PlanarGraph$1(new OverlayNodeFactory());

      this._graph.addEdges(this._edgeList.getEdges());

      const subgraphList = this.createSubgraphs(this._graph);
      const polyBuilder = new PolygonBuilder(this._geomFact);
      this.buildSubgraphs(subgraphList, polyBuilder);
      const resultPolyList = polyBuilder.getPolygons();
      if (resultPolyList.size() <= 0) return this.createEmptyResultGeometry();

      const resultGeom = this._geomFact.buildGeometry(resultPolyList);

      return resultGeom;
    }

    computeNodedEdges(bufferSegStrList, precisionModel) {
      const noder = this.getNoder(precisionModel);
      noder.computeNodes(bufferSegStrList);
      const nodedSegStrings = noder.getNodedSubstrings();

      for (let i = nodedSegStrings.iterator(); i.hasNext();) {
        const segStr = i.next();
        const pts = segStr.getCoordinates();
        if (pts.length === 2 && pts[0].equals2D(pts[1])) continue;
        const oldLabel = segStr.getData();
        const edge = new Edge$1(segStr.getCoordinates(), new Label(oldLabel));
        this.insertUniqueEdge(edge);
      }
    }

    setNoder(noder) {
      this._workingNoder = noder;
    }

  }

  class NodingValidator {
    constructor() {
      NodingValidator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._li = new RobustLineIntersector();
      this._segStrings = null;
      const segStrings = arguments[0];
      this._segStrings = segStrings;
    }

    checkEndPtVertexIntersections() {
      if (arguments.length === 0) {
        for (let i = this._segStrings.iterator(); i.hasNext();) {
          const ss = i.next();
          const pts = ss.getCoordinates();
          this.checkEndPtVertexIntersections(pts[0], this._segStrings);
          this.checkEndPtVertexIntersections(pts[pts.length - 1], this._segStrings);
        }
      } else if (arguments.length === 2) {
        const testPt = arguments[0],
              segStrings = arguments[1];

        for (let i = segStrings.iterator(); i.hasNext();) {
          const ss = i.next();
          const pts = ss.getCoordinates();

          for (let j = 1; j < pts.length - 1; j++) if (pts[j].equals(testPt)) throw new RuntimeException('found endpt/interior pt intersection at index ' + j + ' :pt ' + testPt);
        }
      }
    }

    checkInteriorIntersections() {
      if (arguments.length === 0) {
        for (let i = this._segStrings.iterator(); i.hasNext();) {
          const ss0 = i.next();

          for (let j = this._segStrings.iterator(); j.hasNext();) {
            const ss1 = j.next();
            this.checkInteriorIntersections(ss0, ss1);
          }
        }
      } else if (arguments.length === 2) {
        const ss0 = arguments[0],
              ss1 = arguments[1];
        const pts0 = ss0.getCoordinates();
        const pts1 = ss1.getCoordinates();

        for (let i0 = 0; i0 < pts0.length - 1; i0++) for (let i1 = 0; i1 < pts1.length - 1; i1++) this.checkInteriorIntersections(ss0, i0, ss1, i1);
      } else if (arguments.length === 4) {
        const e0 = arguments[0],
              segIndex0 = arguments[1],
              e1 = arguments[2],
              segIndex1 = arguments[3];
        if (e0 === e1 && segIndex0 === segIndex1) return null;
        const p00 = e0.getCoordinates()[segIndex0];
        const p01 = e0.getCoordinates()[segIndex0 + 1];
        const p10 = e1.getCoordinates()[segIndex1];
        const p11 = e1.getCoordinates()[segIndex1 + 1];

        this._li.computeIntersection(p00, p01, p10, p11);

        if (this._li.hasIntersection()) if (this._li.isProper() || this.hasInteriorIntersection(this._li, p00, p01) || this.hasInteriorIntersection(this._li, p10, p11)) throw new RuntimeException('found non-noded intersection at ' + p00 + '-' + p01 + ' and ' + p10 + '-' + p11);
      }
    }

    checkValid() {
      this.checkEndPtVertexIntersections();
      this.checkInteriorIntersections();
      this.checkCollapses();
    }

    checkCollapses() {
      if (arguments.length === 0) {
        for (let i = this._segStrings.iterator(); i.hasNext();) {
          const ss = i.next();
          this.checkCollapses(ss);
        }
      } else if (arguments.length === 1) {
        const ss = arguments[0];
        const pts = ss.getCoordinates();

        for (let i = 0; i < pts.length - 2; i++) this.checkCollapse(pts[i], pts[i + 1], pts[i + 2]);
      }
    }

    hasInteriorIntersection(li, p0, p1) {
      for (let i = 0; i < li.getIntersectionNum(); i++) {
        const intPt = li.getIntersection(i);
        if (!(intPt.equals(p0) || intPt.equals(p1))) return true;
      }

      return false;
    }

    checkCollapse(p0, p1, p2) {
      if (p0.equals(p2)) throw new RuntimeException('found non-noded collapse at ' + NodingValidator.fact.createLineString([p0, p1, p2]));
    }

  }
  NodingValidator.fact = new GeometryFactory();

  class HotPixel {
    constructor() {
      HotPixel.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._li = null;
      this._pt = null;
      this._originalPt = null;
      this._ptScaled = null;
      this._p0Scaled = null;
      this._p1Scaled = null;
      this._scaleFactor = null;
      this._minx = null;
      this._maxx = null;
      this._miny = null;
      this._maxy = null;
      this._corner = new Array(4).fill(null);
      this._safeEnv = null;
      const pt = arguments[0],
            scaleFactor = arguments[1],
            li = arguments[2];
      this._originalPt = pt;
      this._pt = pt;
      this._scaleFactor = scaleFactor;
      this._li = li;
      if (scaleFactor <= 0) throw new IllegalArgumentException('Scale factor must be non-zero');

      if (scaleFactor !== 1.0) {
        this._pt = new Coordinate(this.scale(pt.x), this.scale(pt.y));
        this._p0Scaled = new Coordinate();
        this._p1Scaled = new Coordinate();
      }

      this.initCorners(this._pt);
    }

    intersectsScaled(p0, p1) {
      const segMinx = Math.min(p0.x, p1.x);
      const segMaxx = Math.max(p0.x, p1.x);
      const segMiny = Math.min(p0.y, p1.y);
      const segMaxy = Math.max(p0.y, p1.y);
      const isOutsidePixelEnv = this._maxx < segMinx || this._minx > segMaxx || this._maxy < segMiny || this._miny > segMaxy;
      if (isOutsidePixelEnv) return false;
      const intersects = this.intersectsToleranceSquare(p0, p1);
      Assert.isTrue(!(isOutsidePixelEnv && intersects), 'Found bad envelope test');
      return intersects;
    }

    initCorners(pt) {
      const tolerance = 0.5;
      this._minx = pt.x - tolerance;
      this._maxx = pt.x + tolerance;
      this._miny = pt.y - tolerance;
      this._maxy = pt.y + tolerance;
      this._corner[0] = new Coordinate(this._maxx, this._maxy);
      this._corner[1] = new Coordinate(this._minx, this._maxy);
      this._corner[2] = new Coordinate(this._minx, this._miny);
      this._corner[3] = new Coordinate(this._maxx, this._miny);
    }

    intersects(p0, p1) {
      if (this._scaleFactor === 1.0) return this.intersectsScaled(p0, p1);
      this.copyScaled(p0, this._p0Scaled);
      this.copyScaled(p1, this._p1Scaled);
      return this.intersectsScaled(this._p0Scaled, this._p1Scaled);
    }

    scale(val) {
      return Math.round(val * this._scaleFactor);
    }

    getCoordinate() {
      return this._originalPt;
    }

    copyScaled(p, pScaled) {
      pScaled.x = this.scale(p.x);
      pScaled.y = this.scale(p.y);
    }

    getSafeEnvelope() {
      if (this._safeEnv === null) {
        const safeTolerance = HotPixel.SAFE_ENV_EXPANSION_FACTOR / this._scaleFactor;
        this._safeEnv = new Envelope(this._originalPt.x - safeTolerance, this._originalPt.x + safeTolerance, this._originalPt.y - safeTolerance, this._originalPt.y + safeTolerance);
      }

      return this._safeEnv;
    }

    intersectsPixelClosure(p0, p1) {
      this._li.computeIntersection(p0, p1, this._corner[0], this._corner[1]);

      if (this._li.hasIntersection()) return true;

      this._li.computeIntersection(p0, p1, this._corner[1], this._corner[2]);

      if (this._li.hasIntersection()) return true;

      this._li.computeIntersection(p0, p1, this._corner[2], this._corner[3]);

      if (this._li.hasIntersection()) return true;

      this._li.computeIntersection(p0, p1, this._corner[3], this._corner[0]);

      if (this._li.hasIntersection()) return true;
      return false;
    }

    intersectsToleranceSquare(p0, p1) {
      let intersectsLeft = false;
      let intersectsBottom = false;

      this._li.computeIntersection(p0, p1, this._corner[0], this._corner[1]);

      if (this._li.isProper()) return true;

      this._li.computeIntersection(p0, p1, this._corner[1], this._corner[2]);

      if (this._li.isProper()) return true;
      if (this._li.hasIntersection()) intersectsLeft = true;

      this._li.computeIntersection(p0, p1, this._corner[2], this._corner[3]);

      if (this._li.isProper()) return true;
      if (this._li.hasIntersection()) intersectsBottom = true;

      this._li.computeIntersection(p0, p1, this._corner[3], this._corner[0]);

      if (this._li.isProper()) return true;
      if (intersectsLeft && intersectsBottom) return true;
      if (p0.equals(this._pt)) return true;
      if (p1.equals(this._pt)) return true;
      return false;
    }

    addSnappedNode(segStr, segIndex) {
      const p0 = segStr.getCoordinate(segIndex);
      const p1 = segStr.getCoordinate(segIndex + 1);

      if (this.intersects(p0, p1)) {
        segStr.addIntersection(this.getCoordinate(), segIndex);
        return true;
      }

      return false;
    }

  }
  HotPixel.SAFE_ENV_EXPANSION_FACTOR = 0.75;

  class MonotoneChainSelectAction {
    constructor() {
      MonotoneChainSelectAction.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.selectedSegment = new LineSegment();
    }

    select() {
      if (arguments.length === 1) ; else if (arguments.length === 2) {
        const mc = arguments[0],
              startIndex = arguments[1];
        mc.getLineSegment(startIndex, this.selectedSegment);
        this.select(this.selectedSegment);
      }
    }

  }

  class MCIndexPointSnapper {
    constructor() {
      MCIndexPointSnapper.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._index = null;
      const index = arguments[0];
      this._index = index;
    }

    snap() {
      if (arguments.length === 1) {
        const hotPixel = arguments[0];
        return this.snap(hotPixel, null, -1);
      } else if (arguments.length === 3) {
        const hotPixel = arguments[0],
              parentEdge = arguments[1],
              hotPixelVertexIndex = arguments[2];
        const pixelEnv = hotPixel.getSafeEnvelope();
        const hotPixelSnapAction = new HotPixelSnapAction(hotPixel, parentEdge, hotPixelVertexIndex);

        this._index.query(pixelEnv, new class {
          get interfaces_() {
            return [ItemVisitor];
          }

          visitItem(item) {
            const testChain = item;
            testChain.select(pixelEnv, hotPixelSnapAction);
          }

        }());

        return hotPixelSnapAction.isNodeAdded();
      }
    }

  }

  class HotPixelSnapAction extends MonotoneChainSelectAction {
    constructor() {
      super();
      HotPixelSnapAction.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._hotPixel = null;
      this._parentEdge = null;
      this._hotPixelVertexIndex = null;
      this._isNodeAdded = false;
      const hotPixel = arguments[0],
            parentEdge = arguments[1],
            hotPixelVertexIndex = arguments[2];
      this._hotPixel = hotPixel;
      this._parentEdge = parentEdge;
      this._hotPixelVertexIndex = hotPixelVertexIndex;
    }

    isNodeAdded() {
      return this._isNodeAdded;
    }

    select() {
      if (arguments.length === 2 && Number.isInteger(arguments[1]) && arguments[0] instanceof MonotoneChain) {
        const mc = arguments[0],
              startIndex = arguments[1];
        const ss = mc.getContext();
        if (this._parentEdge === ss) if (startIndex === this._hotPixelVertexIndex || startIndex + 1 === this._hotPixelVertexIndex) return null;
        this._isNodeAdded |= this._hotPixel.addSnappedNode(ss, startIndex);
      } else {
        return super.select.apply(this, arguments);
      }
    }

  }

  MCIndexPointSnapper.HotPixelSnapAction = HotPixelSnapAction;

  class InteriorIntersectionFinderAdder {
    constructor() {
      InteriorIntersectionFinderAdder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._li = null;
      this._interiorIntersections = null;
      const li = arguments[0];
      this._li = li;
      this._interiorIntersections = new ArrayList();
    }

    processIntersections(e0, segIndex0, e1, segIndex1) {
      if (e0 === e1 && segIndex0 === segIndex1) return null;
      const p00 = e0.getCoordinates()[segIndex0];
      const p01 = e0.getCoordinates()[segIndex0 + 1];
      const p10 = e1.getCoordinates()[segIndex1];
      const p11 = e1.getCoordinates()[segIndex1 + 1];

      this._li.computeIntersection(p00, p01, p10, p11);

      if (this._li.hasIntersection()) if (this._li.isInteriorIntersection()) {
        for (let intIndex = 0; intIndex < this._li.getIntersectionNum(); intIndex++) this._interiorIntersections.add(this._li.getIntersection(intIndex));

        e0.addIntersections(this._li, segIndex0, 0);
        e1.addIntersections(this._li, segIndex1, 1);
      }
    }

    isDone() {
      return false;
    }

    getInteriorIntersections() {
      return this._interiorIntersections;
    }

    get interfaces_() {
      return [SegmentIntersector];
    }

  }

  class MCIndexSnapRounder {
    constructor() {
      MCIndexSnapRounder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pm = null;
      this._li = null;
      this._scaleFactor = null;
      this._noder = null;
      this._pointSnapper = null;
      this._nodedSegStrings = null;
      const pm = arguments[0];
      this._pm = pm;
      this._li = new RobustLineIntersector();

      this._li.setPrecisionModel(pm);

      this._scaleFactor = pm.getScale();
    }

    checkCorrectness(inputSegmentStrings) {
      const resultSegStrings = NodedSegmentString.getNodedSubstrings(inputSegmentStrings);
      const nv = new NodingValidator(resultSegStrings);

      try {
        nv.checkValid();
      } catch (ex) {
        if (ex instanceof Exception) ex.printStackTrace();else throw ex;
      } finally {}
    }

    getNodedSubstrings() {
      return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings);
    }

    snapRound(segStrings, li) {
      const intersections = this.findInteriorIntersections(segStrings, li);
      this.computeIntersectionSnaps(intersections);
      this.computeVertexSnaps(segStrings);
    }

    findInteriorIntersections(segStrings, li) {
      const intFinderAdder = new InteriorIntersectionFinderAdder(li);

      this._noder.setSegmentIntersector(intFinderAdder);

      this._noder.computeNodes(segStrings);

      return intFinderAdder.getInteriorIntersections();
    }

    computeVertexSnaps() {
      if (hasInterface(arguments[0], Collection)) {
        const edges = arguments[0];

        for (let i0 = edges.iterator(); i0.hasNext();) {
          const edge0 = i0.next();
          this.computeVertexSnaps(edge0);
        }
      } else if (arguments[0] instanceof NodedSegmentString) {
        const e = arguments[0];
        const pts0 = e.getCoordinates();

        for (let i = 0; i < pts0.length; i++) {
          const hotPixel = new HotPixel(pts0[i], this._scaleFactor, this._li);

          const isNodeAdded = this._pointSnapper.snap(hotPixel, e, i);

          if (isNodeAdded) e.addIntersection(pts0[i], i);
        }
      }
    }

    computeNodes(inputSegmentStrings) {
      this._nodedSegStrings = inputSegmentStrings;
      this._noder = new MCIndexNoder();
      this._pointSnapper = new MCIndexPointSnapper(this._noder.getIndex());
      this.snapRound(inputSegmentStrings, this._li);
    }

    computeIntersectionSnaps(snapPts) {
      for (let it = snapPts.iterator(); it.hasNext();) {
        const snapPt = it.next();
        const hotPixel = new HotPixel(snapPt, this._scaleFactor, this._li);

        this._pointSnapper.snap(hotPixel);
      }
    }

    get interfaces_() {
      return [Noder];
    }

  }

  class BufferOp {
    constructor() {
      BufferOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._argGeom = null;
      this._distance = null;
      this._bufParams = new BufferParameters();
      this._resultGeometry = null;
      this._saveException = null;

      if (arguments.length === 1) {
        const g = arguments[0];
        this._argGeom = g;
      } else if (arguments.length === 2) {
        const g = arguments[0],
              bufParams = arguments[1];
        this._argGeom = g;
        this._bufParams = bufParams;
      }
    }

    static bufferOp() {
      if (arguments.length === 2) {
        const g = arguments[0],
              distance = arguments[1];
        const gBuf = new BufferOp(g);
        const geomBuf = gBuf.getResultGeometry(distance);
        return geomBuf;
      } else if (arguments.length === 3) {
        if (Number.isInteger(arguments[2]) && arguments[0] instanceof Geometry && typeof arguments[1] === 'number') {
          const g = arguments[0],
                distance = arguments[1],
                quadrantSegments = arguments[2];
          const bufOp = new BufferOp(g);
          bufOp.setQuadrantSegments(quadrantSegments);
          const geomBuf = bufOp.getResultGeometry(distance);
          return geomBuf;
        } else if (arguments[2] instanceof BufferParameters && arguments[0] instanceof Geometry && typeof arguments[1] === 'number') {
          const g = arguments[0],
                distance = arguments[1],
                params = arguments[2];
          const bufOp = new BufferOp(g, params);
          const geomBuf = bufOp.getResultGeometry(distance);
          return geomBuf;
        }
      } else if (arguments.length === 4) {
        const g = arguments[0],
              distance = arguments[1],
              quadrantSegments = arguments[2],
              endCapStyle = arguments[3];
        const bufOp = new BufferOp(g);
        bufOp.setQuadrantSegments(quadrantSegments);
        bufOp.setEndCapStyle(endCapStyle);
        const geomBuf = bufOp.getResultGeometry(distance);
        return geomBuf;
      }
    }

    static precisionScaleFactor(g, distance, maxPrecisionDigits) {
      const env = g.getEnvelopeInternal();
      const envMax = MathUtil.max(Math.abs(env.getMaxX()), Math.abs(env.getMaxY()), Math.abs(env.getMinX()), Math.abs(env.getMinY()));
      const expandByDistance = distance > 0.0 ? distance : 0.0;
      const bufEnvMax = envMax + 2 * expandByDistance;
      const bufEnvPrecisionDigits = Math.trunc(Math.log(bufEnvMax) / Math.log(10) + 1.0);
      const minUnitLog10 = maxPrecisionDigits - bufEnvPrecisionDigits;
      const scaleFactor = Math.pow(10.0, minUnitLog10);
      return scaleFactor;
    }

    bufferFixedPrecision(fixedPM) {
      const noder = new ScaledNoder(new MCIndexSnapRounder(new PrecisionModel(1.0)), fixedPM.getScale());
      const bufBuilder = new BufferBuilder(this._bufParams);
      bufBuilder.setWorkingPrecisionModel(fixedPM);
      bufBuilder.setNoder(noder);
      this._resultGeometry = bufBuilder.buffer(this._argGeom, this._distance);
    }

    bufferReducedPrecision() {
      if (arguments.length === 0) {
        for (let precDigits = BufferOp.MAX_PRECISION_DIGITS; precDigits >= 0; precDigits--) {
          try {
            this.bufferReducedPrecision(precDigits);
          } catch (ex) {
            if (ex instanceof TopologyException) this._saveException = ex;else throw ex;
          } finally {}

          if (this._resultGeometry !== null) return null;
        }

        throw this._saveException;
      } else if (arguments.length === 1) {
        const precisionDigits = arguments[0];
        const sizeBasedScaleFactor = BufferOp.precisionScaleFactor(this._argGeom, this._distance, precisionDigits);
        const fixedPM = new PrecisionModel(sizeBasedScaleFactor);
        this.bufferFixedPrecision(fixedPM);
      }
    }

    computeGeometry() {
      this.bufferOriginalPrecision();
      if (this._resultGeometry !== null) return null;

      const argPM = this._argGeom.getFactory().getPrecisionModel();

      if (argPM.getType() === PrecisionModel.FIXED) this.bufferFixedPrecision(argPM);else this.bufferReducedPrecision();
    }

    setQuadrantSegments(quadrantSegments) {
      this._bufParams.setQuadrantSegments(quadrantSegments);
    }

    bufferOriginalPrecision() {
      try {
        const bufBuilder = new BufferBuilder(this._bufParams);
        this._resultGeometry = bufBuilder.buffer(this._argGeom, this._distance);
      } catch (ex) {
        if (ex instanceof RuntimeException) this._saveException = ex;else throw ex;
      } finally {}
    }

    getResultGeometry(distance) {
      this._distance = distance;
      this.computeGeometry();
      return this._resultGeometry;
    }

    setEndCapStyle(endCapStyle) {
      this._bufParams.setEndCapStyle(endCapStyle);
    }

  }
  BufferOp.CAP_ROUND = BufferParameters.CAP_ROUND;
  BufferOp.CAP_BUTT = BufferParameters.CAP_FLAT;
  BufferOp.CAP_FLAT = BufferParameters.CAP_FLAT;
  BufferOp.CAP_SQUARE = BufferParameters.CAP_SQUARE;
  BufferOp.MAX_PRECISION_DIGITS = 12;

  var buffer = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BufferOp: BufferOp,
    BufferParameters: BufferParameters
  });

  class GeometryLocation {
    constructor() {
      GeometryLocation.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._component = null;
      this._segIndex = null;
      this._pt = null;

      if (arguments.length === 2) {
        const component = arguments[0],
              pt = arguments[1];
        GeometryLocation.constructor_.call(this, component, GeometryLocation.INSIDE_AREA, pt);
      } else if (arguments.length === 3) {
        const component = arguments[0],
              segIndex = arguments[1],
              pt = arguments[2];
        this._component = component;
        this._segIndex = segIndex;
        this._pt = pt;
      }
    }

    getSegmentIndex() {
      return this._segIndex;
    }

    getCoordinate() {
      return this._pt;
    }

    isInsideArea() {
      return this._segIndex === GeometryLocation.INSIDE_AREA;
    }

    toString() {
      return this._component.getGeometryType() + '[' + this._segIndex + ']' + '-' + WKTWriter.toPoint(this._pt);
    }

    getGeometryComponent() {
      return this._component;
    }

  }
  GeometryLocation.INSIDE_AREA = -1;

  class ConnectedElementLocationFilter {
    constructor() {
      ConnectedElementLocationFilter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._locations = null;
      const locations = arguments[0];
      this._locations = locations;
    }

    static getLocations(geom) {
      const locations = new ArrayList();
      geom.apply(new ConnectedElementLocationFilter(locations));
      return locations;
    }

    filter(geom) {
      if (geom.isEmpty()) return null;
      if (geom instanceof Point || geom instanceof LineString || geom instanceof Polygon) this._locations.add(new GeometryLocation(geom, 0, geom.getCoordinate()));
    }

    get interfaces_() {
      return [GeometryFilter];
    }

  }

  class DistanceOp {
    constructor() {
      DistanceOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geom = null;
      this._terminateDistance = 0.0;
      this._ptLocator = new PointLocator();
      this._minDistanceLocation = null;
      this._minDistance = Double.MAX_VALUE;

      if (arguments.length === 2) {
        const g0 = arguments[0],
              g1 = arguments[1];
        DistanceOp.constructor_.call(this, g0, g1, 0.0);
      } else if (arguments.length === 3) {
        const g0 = arguments[0],
              g1 = arguments[1],
              terminateDistance = arguments[2];
        this._geom = new Array(2).fill(null);
        this._geom[0] = g0;
        this._geom[1] = g1;
        this._terminateDistance = terminateDistance;
      }
    }

    static distance(g0, g1) {
      const distOp = new DistanceOp(g0, g1);
      return distOp.distance();
    }

    static isWithinDistance(g0, g1, distance) {
      const envDist = g0.getEnvelopeInternal().distance(g1.getEnvelopeInternal());
      if (envDist > distance) return false;
      const distOp = new DistanceOp(g0, g1, distance);
      return distOp.distance() <= distance;
    }

    static nearestPoints(g0, g1) {
      const distOp = new DistanceOp(g0, g1);
      return distOp.nearestPoints();
    }

    computeContainmentDistance() {
      if (arguments.length === 0) {
        const locPtPoly = new Array(2).fill(null);
        this.computeContainmentDistance(0, locPtPoly);
        if (this._minDistance <= this._terminateDistance) return null;
        this.computeContainmentDistance(1, locPtPoly);
      } else if (arguments.length === 2) {
        const polyGeomIndex = arguments[0],
              locPtPoly = arguments[1];
        const polyGeom = this._geom[polyGeomIndex];
        if (polyGeom.getDimension() < 2) return null;
        const locationsIndex = 1 - polyGeomIndex;
        const polys = PolygonExtracter.getPolygons(polyGeom);

        if (polys.size() > 0) {
          const insideLocs = ConnectedElementLocationFilter.getLocations(this._geom[locationsIndex]);
          this.computeContainmentDistance(insideLocs, polys, locPtPoly);

          if (this._minDistance <= this._terminateDistance) {
            this._minDistanceLocation[locationsIndex] = locPtPoly[0];
            this._minDistanceLocation[polyGeomIndex] = locPtPoly[1];
            return null;
          }
        }
      } else if (arguments.length === 3) {
        if (arguments[2] instanceof Array && hasInterface(arguments[0], List) && hasInterface(arguments[1], List)) {
          const locs = arguments[0],
                polys = arguments[1],
                locPtPoly = arguments[2];

          for (let i = 0; i < locs.size(); i++) {
            const loc = locs.get(i);

            for (let j = 0; j < polys.size(); j++) {
              this.computeContainmentDistance(loc, polys.get(j), locPtPoly);
              if (this._minDistance <= this._terminateDistance) return null;
            }
          }
        } else if (arguments[2] instanceof Array && arguments[0] instanceof GeometryLocation && arguments[1] instanceof Polygon) {
          const ptLoc = arguments[0],
                poly = arguments[1],
                locPtPoly = arguments[2];
          const pt = ptLoc.getCoordinate();

          if (Location.EXTERIOR !== this._ptLocator.locate(pt, poly)) {
            this._minDistance = 0.0;
            locPtPoly[0] = ptLoc;
            locPtPoly[1] = new GeometryLocation(poly, pt);
            return null;
          }
        }
      }
    }

    computeMinDistanceLinesPoints(lines, points, locGeom) {
      for (let i = 0; i < lines.size(); i++) {
        const line = lines.get(i);

        for (let j = 0; j < points.size(); j++) {
          const pt = points.get(j);
          this.computeMinDistance(line, pt, locGeom);
          if (this._minDistance <= this._terminateDistance) return null;
        }
      }
    }

    computeFacetDistance() {
      const locGeom = new Array(2).fill(null);
      const lines0 = LinearComponentExtracter.getLines(this._geom[0]);
      const lines1 = LinearComponentExtracter.getLines(this._geom[1]);
      const pts0 = PointExtracter.getPoints(this._geom[0]);
      const pts1 = PointExtracter.getPoints(this._geom[1]);
      this.computeMinDistanceLines(lines0, lines1, locGeom);
      this.updateMinDistance(locGeom, false);
      if (this._minDistance <= this._terminateDistance) return null;
      locGeom[0] = null;
      locGeom[1] = null;
      this.computeMinDistanceLinesPoints(lines0, pts1, locGeom);
      this.updateMinDistance(locGeom, false);
      if (this._minDistance <= this._terminateDistance) return null;
      locGeom[0] = null;
      locGeom[1] = null;
      this.computeMinDistanceLinesPoints(lines1, pts0, locGeom);
      this.updateMinDistance(locGeom, true);
      if (this._minDistance <= this._terminateDistance) return null;
      locGeom[0] = null;
      locGeom[1] = null;
      this.computeMinDistancePoints(pts0, pts1, locGeom);
      this.updateMinDistance(locGeom, false);
    }

    nearestLocations() {
      this.computeMinDistance();
      return this._minDistanceLocation;
    }

    updateMinDistance(locGeom, flip) {
      if (locGeom[0] === null) return null;

      if (flip) {
        this._minDistanceLocation[0] = locGeom[1];
        this._minDistanceLocation[1] = locGeom[0];
      } else {
        this._minDistanceLocation[0] = locGeom[0];
        this._minDistanceLocation[1] = locGeom[1];
      }
    }

    nearestPoints() {
      this.computeMinDistance();
      const nearestPts = [this._minDistanceLocation[0].getCoordinate(), this._minDistanceLocation[1].getCoordinate()];
      return nearestPts;
    }

    computeMinDistance() {
      if (arguments.length === 0) {
        if (this._minDistanceLocation !== null) return null;
        this._minDistanceLocation = new Array(2).fill(null);
        this.computeContainmentDistance();
        if (this._minDistance <= this._terminateDistance) return null;
        this.computeFacetDistance();
      } else if (arguments.length === 3) {
        if (arguments[2] instanceof Array && arguments[0] instanceof LineString && arguments[1] instanceof Point) {
          const line = arguments[0],
                pt = arguments[1],
                locGeom = arguments[2];
          if (line.getEnvelopeInternal().distance(pt.getEnvelopeInternal()) > this._minDistance) return null;
          const coord0 = line.getCoordinates();
          const coord = pt.getCoordinate();

          for (let i = 0; i < coord0.length - 1; i++) {
            const dist = Distance.pointToSegment(coord, coord0[i], coord0[i + 1]);

            if (dist < this._minDistance) {
              this._minDistance = dist;
              const seg = new LineSegment(coord0[i], coord0[i + 1]);
              const segClosestPoint = seg.closestPoint(coord);
              locGeom[0] = new GeometryLocation(line, i, segClosestPoint);
              locGeom[1] = new GeometryLocation(pt, 0, coord);
            }

            if (this._minDistance <= this._terminateDistance) return null;
          }
        } else if (arguments[2] instanceof Array && arguments[0] instanceof LineString && arguments[1] instanceof LineString) {
          const line0 = arguments[0],
                line1 = arguments[1],
                locGeom = arguments[2];
          if (line0.getEnvelopeInternal().distance(line1.getEnvelopeInternal()) > this._minDistance) return null;
          const coord0 = line0.getCoordinates();
          const coord1 = line1.getCoordinates();

          for (let i = 0; i < coord0.length - 1; i++) {
            const segEnv0 = new Envelope(coord0[i], coord0[i + 1]);
            if (segEnv0.distance(line1.getEnvelopeInternal()) > this._minDistance) continue;

            for (let j = 0; j < coord1.length - 1; j++) {
              const segEnv1 = new Envelope(coord1[j], coord1[j + 1]);
              if (segEnv0.distance(segEnv1) > this._minDistance) continue;
              const dist = Distance.segmentToSegment(coord0[i], coord0[i + 1], coord1[j], coord1[j + 1]);

              if (dist < this._minDistance) {
                this._minDistance = dist;
                const seg0 = new LineSegment(coord0[i], coord0[i + 1]);
                const seg1 = new LineSegment(coord1[j], coord1[j + 1]);
                const closestPt = seg0.closestPoints(seg1);
                locGeom[0] = new GeometryLocation(line0, i, closestPt[0]);
                locGeom[1] = new GeometryLocation(line1, j, closestPt[1]);
              }

              if (this._minDistance <= this._terminateDistance) return null;
            }
          }
        }
      }
    }

    computeMinDistancePoints(points0, points1, locGeom) {
      for (let i = 0; i < points0.size(); i++) {
        const pt0 = points0.get(i);

        for (let j = 0; j < points1.size(); j++) {
          const pt1 = points1.get(j);
          const dist = pt0.getCoordinate().distance(pt1.getCoordinate());

          if (dist < this._minDistance) {
            this._minDistance = dist;
            locGeom[0] = new GeometryLocation(pt0, 0, pt0.getCoordinate());
            locGeom[1] = new GeometryLocation(pt1, 0, pt1.getCoordinate());
          }

          if (this._minDistance <= this._terminateDistance) return null;
        }
      }
    }

    distance() {
      if (this._geom[0] === null || this._geom[1] === null) throw new IllegalArgumentException('null geometries are not supported');
      if (this._geom[0].isEmpty() || this._geom[1].isEmpty()) return 0.0;
      this.computeMinDistance();
      return this._minDistance;
    }

    computeMinDistanceLines(lines0, lines1, locGeom) {
      for (let i = 0; i < lines0.size(); i++) {
        const line0 = lines0.get(i);

        for (let j = 0; j < lines1.size(); j++) {
          const line1 = lines1.get(j);
          this.computeMinDistance(line0, line1, locGeom);
          if (this._minDistance <= this._terminateDistance) return null;
        }
      }
    }

  }

  var distance = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DistanceOp: DistanceOp
  });

  class EdgeString {
    constructor() {
      EdgeString.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._factory = null;
      this._directedEdges = new ArrayList();
      this._coordinates = null;
      const factory = arguments[0];
      this._factory = factory;
    }

    getCoordinates() {
      if (this._coordinates === null) {
        let forwardDirectedEdges = 0;
        let reverseDirectedEdges = 0;
        const coordinateList = new CoordinateList();

        for (let i = this._directedEdges.iterator(); i.hasNext();) {
          const directedEdge = i.next();
          if (directedEdge.getEdgeDirection()) forwardDirectedEdges++;else reverseDirectedEdges++;
          coordinateList.add(directedEdge.getEdge().getLine().getCoordinates(), false, directedEdge.getEdgeDirection());
        }

        this._coordinates = coordinateList.toCoordinateArray();
        if (reverseDirectedEdges > forwardDirectedEdges) CoordinateArrays.reverse(this._coordinates);
      }

      return this._coordinates;
    }

    toLineString() {
      return this._factory.createLineString(this.getCoordinates());
    }

    add(directedEdge) {
      this._directedEdges.add(directedEdge);
    }

  }

  class GraphComponent {
    constructor() {
      GraphComponent.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._isMarked = false;
      this._isVisited = false;
      this._data = null;
    }

    static getComponentWithVisitedState(i, visitedState) {
      while (i.hasNext()) {
        const comp = i.next();
        if (comp.isVisited() === visitedState) return comp;
      }

      return null;
    }

    static setVisited(i, visited) {
      while (i.hasNext()) {
        const comp = i.next();
        comp.setVisited(visited);
      }
    }

    static setMarked(i, marked) {
      while (i.hasNext()) {
        const comp = i.next();
        comp.setMarked(marked);
      }
    }

    setVisited(isVisited) {
      this._isVisited = isVisited;
    }

    isMarked() {
      return this._isMarked;
    }

    setData(data) {
      this._data = data;
    }

    getData() {
      return this._data;
    }

    setMarked(isMarked) {
      this._isMarked = isMarked;
    }

    getContext() {
      return this._data;
    }

    isVisited() {
      return this._isVisited;
    }

    setContext(data) {
      this._data = data;
    }

  }

  class DirectedEdge extends GraphComponent {
    constructor() {
      super();
      DirectedEdge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._parentEdge = null;
      this._from = null;
      this._to = null;
      this._p0 = null;
      this._p1 = null;
      this._sym = null;
      this._edgeDirection = null;
      this._quadrant = null;
      this._angle = null;

      if (arguments.length === 0) ; else if (arguments.length === 4) {
        const from = arguments[0],
              to = arguments[1],
              directionPt = arguments[2],
              edgeDirection = arguments[3];
        this._from = from;
        this._to = to;
        this._edgeDirection = edgeDirection;
        this._p0 = from.getCoordinate();
        this._p1 = directionPt;
        const dx = this._p1.x - this._p0.x;
        const dy = this._p1.y - this._p0.y;
        this._quadrant = Quadrant.quadrant(dx, dy);
        this._angle = Math.atan2(dy, dx);
      }
    }

    static toEdges(dirEdges) {
      const edges = new ArrayList();

      for (let i = dirEdges.iterator(); i.hasNext();) edges.add(i.next()._parentEdge);

      return edges;
    }

    isRemoved() {
      return this._parentEdge === null;
    }

    compareDirection(e) {
      if (this._quadrant > e._quadrant) return 1;
      if (this._quadrant < e._quadrant) return -1;
      return Orientation.index(e._p0, e._p1, this._p1);
    }

    getCoordinate() {
      return this._from.getCoordinate();
    }

    print(out) {
      const className = this.getClass().getName();
      const lastDotPos = className.lastIndexOf('.');
      const name = className.substring(lastDotPos + 1);
      out.print('  ' + name + ': ' + this._p0 + ' - ' + this._p1 + ' ' + this._quadrant + ':' + this._angle);
    }

    getDirectionPt() {
      return this._p1;
    }

    getAngle() {
      return this._angle;
    }

    compareTo(obj) {
      const de = obj;
      return this.compareDirection(de);
    }

    getFromNode() {
      return this._from;
    }

    getSym() {
      return this._sym;
    }

    setEdge(parentEdge) {
      this._parentEdge = parentEdge;
    }

    remove() {
      this._sym = null;
      this._parentEdge = null;
    }

    getEdge() {
      return this._parentEdge;
    }

    getQuadrant() {
      return this._quadrant;
    }

    setSym(sym) {
      this._sym = sym;
    }

    getToNode() {
      return this._to;
    }

    getEdgeDirection() {
      return this._edgeDirection;
    }

    get interfaces_() {
      return [Comparable];
    }

  }

  class LineMergeDirectedEdge extends DirectedEdge {
    constructor() {
      super();
      LineMergeDirectedEdge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      const from = arguments[0],
            to = arguments[1],
            directionPt = arguments[2],
            edgeDirection = arguments[3];
      DirectedEdge.constructor_.call(this, from, to, directionPt, edgeDirection);
    }

    getNext() {
      if (this.getToNode().getDegree() !== 2) return null;
      if (this.getToNode().getOutEdges().getEdges().get(0) === this.getSym()) return this.getToNode().getOutEdges().getEdges().get(1);
      Assert.isTrue(this.getToNode().getOutEdges().getEdges().get(1) === this.getSym());
      return this.getToNode().getOutEdges().getEdges().get(0);
    }

  }

  class Edge extends GraphComponent {
    constructor() {
      super();
      Edge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._dirEdge = null;

      if (arguments.length === 0) ; else if (arguments.length === 2) {
        const de0 = arguments[0],
              de1 = arguments[1];
        this.setDirectedEdges(de0, de1);
      }
    }

    isRemoved() {
      return this._dirEdge === null;
    }

    setDirectedEdges(de0, de1) {
      this._dirEdge = [de0, de1];
      de0.setEdge(this);
      de1.setEdge(this);
      de0.setSym(de1);
      de1.setSym(de0);
      de0.getFromNode().addOutEdge(de0);
      de1.getFromNode().addOutEdge(de1);
    }

    getDirEdge() {
      if (Number.isInteger(arguments[0])) {
        const i = arguments[0];
        return this._dirEdge[i];
      } else if (arguments[0] instanceof Node) {
        const fromNode = arguments[0];
        if (this._dirEdge[0].getFromNode() === fromNode) return this._dirEdge[0];
        if (this._dirEdge[1].getFromNode() === fromNode) return this._dirEdge[1];
        return null;
      }
    }

    remove() {
      this._dirEdge = null;
    }

    getOppositeNode(node) {
      if (this._dirEdge[0].getFromNode() === node) return this._dirEdge[0].getToNode();
      if (this._dirEdge[1].getFromNode() === node) return this._dirEdge[1].getToNode();
      return null;
    }

  }

  class DirectedEdgeStar {
    constructor() {
      DirectedEdgeStar.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._outEdges = new ArrayList();
      this._sorted = false;
    }

    getNextEdge(dirEdge) {
      const i = this.getIndex(dirEdge);
      return this._outEdges.get(this.getIndex(i + 1));
    }

    getCoordinate() {
      const it = this.iterator();
      if (!it.hasNext()) return null;
      const e = it.next();
      return e.getCoordinate();
    }

    iterator() {
      this.sortEdges();
      return this._outEdges.iterator();
    }

    sortEdges() {
      if (!this._sorted) {
        Collections.sort(this._outEdges);
        this._sorted = true;
      }
    }

    remove(de) {
      this._outEdges.remove(de);
    }

    getEdges() {
      this.sortEdges();
      return this._outEdges;
    }

    getNextCWEdge(dirEdge) {
      const i = this.getIndex(dirEdge);
      return this._outEdges.get(this.getIndex(i - 1));
    }

    getIndex() {
      if (arguments[0] instanceof Edge) {
        const edge = arguments[0];
        this.sortEdges();

        for (let i = 0; i < this._outEdges.size(); i++) {
          const de = this._outEdges.get(i);

          if (de.getEdge() === edge) return i;
        }

        return -1;
      } else if (arguments[0] instanceof DirectedEdge) {
        const dirEdge = arguments[0];
        this.sortEdges();

        for (let i = 0; i < this._outEdges.size(); i++) {
          const de = this._outEdges.get(i);

          if (de === dirEdge) return i;
        }

        return -1;
      } else if (Number.isInteger(arguments[0])) {
        const i = arguments[0];

        let modi = i % this._outEdges.size();

        if (modi < 0) modi += this._outEdges.size();
        return modi;
      }
    }

    add(de) {
      this._outEdges.add(de);

      this._sorted = false;
    }

    getDegree() {
      return this._outEdges.size();
    }

  }

  class Node extends GraphComponent {
    constructor() {
      super();
      Node.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pt = null;
      this._deStar = null;

      if (arguments.length === 1) {
        const pt = arguments[0];
        Node.constructor_.call(this, pt, new DirectedEdgeStar());
      } else if (arguments.length === 2) {
        const pt = arguments[0],
              deStar = arguments[1];
        this._pt = pt;
        this._deStar = deStar;
      }
    }

    static getEdgesBetween(node0, node1) {
      const edges0 = DirectedEdge.toEdges(node0.getOutEdges().getEdges());
      const commonEdges = new HashSet(edges0);
      const edges1 = DirectedEdge.toEdges(node1.getOutEdges().getEdges());
      commonEdges.retainAll(edges1);
      return commonEdges;
    }

    isRemoved() {
      return this._pt === null;
    }

    addOutEdge(de) {
      this._deStar.add(de);
    }

    getCoordinate() {
      return this._pt;
    }

    getOutEdges() {
      return this._deStar;
    }

    remove() {
      if (arguments.length === 0) {
        this._pt = null;
      } else if (arguments.length === 1) {
        const de = arguments[0];

        this._deStar.remove(de);
      }
    }

    getIndex(edge) {
      return this._deStar.getIndex(edge);
    }

    getDegree() {
      return this._deStar.getDegree();
    }

  }

  class LineMergeEdge extends Edge {
    constructor() {
      super();
      LineMergeEdge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._line = null;
      const line = arguments[0];
      this._line = line;
    }

    getLine() {
      return this._line;
    }

  }

  class NodeMap {
    constructor() {
      NodeMap.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._nodeMap = new TreeMap();
    }

    find(coord) {
      return this._nodeMap.get(coord);
    }

    iterator() {
      return this._nodeMap.values().iterator();
    }

    remove(pt) {
      return this._nodeMap.remove(pt);
    }

    values() {
      return this._nodeMap.values();
    }

    add(n) {
      this._nodeMap.put(n.getCoordinate(), n);

      return n;
    }

  }

  class PlanarGraph {
    constructor() {
      PlanarGraph.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._edges = new HashSet();
      this._dirEdges = new HashSet();
      this._nodeMap = new NodeMap();
    }

    findNodesOfDegree(degree) {
      const nodesFound = new ArrayList();

      for (let i = this.nodeIterator(); i.hasNext();) {
        const node = i.next();
        if (node.getDegree() === degree) nodesFound.add(node);
      }

      return nodesFound;
    }

    dirEdgeIterator() {
      return this._dirEdges.iterator();
    }

    edgeIterator() {
      return this._edges.iterator();
    }

    remove() {
      if (arguments[0] instanceof Edge) {
        const edge = arguments[0];
        this.remove(edge.getDirEdge(0));
        this.remove(edge.getDirEdge(1));

        this._edges.remove(edge);

        edge.remove();
      } else if (arguments[0] instanceof DirectedEdge) {
        const de = arguments[0];
        const sym = de.getSym();
        if (sym !== null) sym.setSym(null);
        de.getFromNode().remove(de);
        de.remove();

        this._dirEdges.remove(de);
      } else if (arguments[0] instanceof Node) {
        const node = arguments[0];
        const outEdges = node.getOutEdges().getEdges();

        for (let i = outEdges.iterator(); i.hasNext();) {
          const de = i.next();
          const sym = de.getSym();
          if (sym !== null) this.remove(sym);

          this._dirEdges.remove(de);

          const edge = de.getEdge();
          if (edge !== null) this._edges.remove(edge);
        }

        this._nodeMap.remove(node.getCoordinate());

        node.remove();
      }
    }

    findNode(pt) {
      return this._nodeMap.find(pt);
    }

    getEdges() {
      return this._edges;
    }

    nodeIterator() {
      return this._nodeMap.iterator();
    }

    contains() {
      if (arguments[0] instanceof Edge) {
        const e = arguments[0];
        return this._edges.contains(e);
      } else if (arguments[0] instanceof DirectedEdge) {
        const de = arguments[0];
        return this._dirEdges.contains(de);
      }
    }

    add() {
      if (arguments[0] instanceof Node) {
        const node = arguments[0];

        this._nodeMap.add(node);
      } else if (arguments[0] instanceof Edge) {
        const edge = arguments[0];

        this._edges.add(edge);

        this.add(edge.getDirEdge(0));
        this.add(edge.getDirEdge(1));
      } else if (arguments[0] instanceof DirectedEdge) {
        const dirEdge = arguments[0];

        this._dirEdges.add(dirEdge);
      }
    }

    getNodes() {
      return this._nodeMap.values();
    }

  }

  class LineMergeGraph extends PlanarGraph {
    constructor() {
      super();
    }

    addEdge(lineString) {
      if (lineString.isEmpty()) return null;
      const coordinates = CoordinateArrays.removeRepeatedPoints(lineString.getCoordinates());
      if (coordinates.length <= 1) return null;
      const startCoordinate = coordinates[0];
      const endCoordinate = coordinates[coordinates.length - 1];
      const startNode = this.getNode(startCoordinate);
      const endNode = this.getNode(endCoordinate);
      const directedEdge0 = new LineMergeDirectedEdge(startNode, endNode, coordinates[1], true);
      const directedEdge1 = new LineMergeDirectedEdge(endNode, startNode, coordinates[coordinates.length - 2], false);
      const edge = new LineMergeEdge(lineString);
      edge.setDirectedEdges(directedEdge0, directedEdge1);
      this.add(edge);
    }

    getNode(coordinate) {
      let node = this.findNode(coordinate);

      if (node === null) {
        node = new Node(coordinate);
        this.add(node);
      }

      return node;
    }

  }

  class LineMerger {
    constructor() {
      LineMerger.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._graph = new LineMergeGraph();
      this._mergedLineStrings = null;
      this._factory = null;
      this._edgeStrings = null;
    }

    buildEdgeStringsForUnprocessedNodes() {
      for (let i = this._graph.getNodes().iterator(); i.hasNext();) {
        const node = i.next();

        if (!node.isMarked()) {
          Assert.isTrue(node.getDegree() === 2);
          this.buildEdgeStringsStartingAt(node);
          node.setMarked(true);
        }
      }
    }

    buildEdgeStringsForNonDegree2Nodes() {
      for (let i = this._graph.getNodes().iterator(); i.hasNext();) {
        const node = i.next();

        if (node.getDegree() !== 2) {
          this.buildEdgeStringsStartingAt(node);
          node.setMarked(true);
        }
      }
    }

    buildEdgeStringsForObviousStartNodes() {
      this.buildEdgeStringsForNonDegree2Nodes();
    }

    getMergedLineStrings() {
      this.merge();
      return this._mergedLineStrings;
    }

    buildEdgeStringsStartingAt(node) {
      for (let i = node.getOutEdges().iterator(); i.hasNext();) {
        const directedEdge = i.next();
        if (directedEdge.getEdge().isMarked()) continue;

        this._edgeStrings.add(this.buildEdgeStringStartingWith(directedEdge));
      }
    }

    merge() {
      if (this._mergedLineStrings !== null) return null;
      GraphComponent.setMarked(this._graph.nodeIterator(), false);
      GraphComponent.setMarked(this._graph.edgeIterator(), false);
      this._edgeStrings = new ArrayList();
      this.buildEdgeStringsForObviousStartNodes();
      this.buildEdgeStringsForIsolatedLoops();
      this._mergedLineStrings = new ArrayList();

      for (let i = this._edgeStrings.iterator(); i.hasNext();) {
        const edgeString = i.next();

        this._mergedLineStrings.add(edgeString.toLineString());
      }
    }

    addLineString(lineString) {
      if (this._factory === null) this._factory = lineString.getFactory();

      this._graph.addEdge(lineString);
    }

    buildEdgeStringStartingWith(start) {
      const edgeString = new EdgeString(this._factory);
      let current = start;

      do {
        edgeString.add(current);
        current.getEdge().setMarked(true);
        current = current.getNext();
      } while (current !== null && current !== start);

      return edgeString;
    }

    add() {
      if (arguments[0] instanceof Geometry) {
        const geometry = arguments[0];

        for (let i = 0; i < geometry.getNumGeometries(); i++) {
          const component = geometry.getGeometryN(i);
          if (component instanceof LineString) this.addLineString(component);
        }
      } else if (hasInterface(arguments[0], Collection)) {
        const geometries = arguments[0];
        this._mergedLineStrings = null;

        for (let i = geometries.iterator(); i.hasNext();) {
          const geometry = i.next();
          this.add(geometry);
        }
      }
    }

    buildEdgeStringsForIsolatedLoops() {
      this.buildEdgeStringsForUnprocessedNodes();
    }

  }

  class Subgraph {
    constructor() {
      Subgraph.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._parentGraph = null;
      this._edges = new HashSet();
      this._dirEdges = new ArrayList();
      this._nodeMap = new NodeMap();
      const parentGraph = arguments[0];
      this._parentGraph = parentGraph;
    }

    dirEdgeIterator() {
      return this._dirEdges.iterator();
    }

    edgeIterator() {
      return this._edges.iterator();
    }

    getParent() {
      return this._parentGraph;
    }

    nodeIterator() {
      return this._nodeMap.iterator();
    }

    contains(e) {
      return this._edges.contains(e);
    }

    add(e) {
      if (this._edges.contains(e)) return null;

      this._edges.add(e);

      this._dirEdges.add(e.getDirEdge(0));

      this._dirEdges.add(e.getDirEdge(1));

      this._nodeMap.add(e.getDirEdge(0).getFromNode());

      this._nodeMap.add(e.getDirEdge(1).getFromNode());
    }

  }

  class ConnectedSubgraphFinder {
    constructor() {
      ConnectedSubgraphFinder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._graph = null;
      const graph = arguments[0];
      this._graph = graph;
    }

    addReachable(startNode, subgraph) {
      const nodeStack = new Stack();
      nodeStack.add(startNode);

      while (!nodeStack.empty()) {
        const node = nodeStack.pop();
        this.addEdges(node, nodeStack, subgraph);
      }
    }

    findSubgraph(node) {
      const subgraph = new Subgraph(this._graph);
      this.addReachable(node, subgraph);
      return subgraph;
    }

    getConnectedSubgraphs() {
      const subgraphs = new ArrayList();
      GraphComponent.setVisited(this._graph.nodeIterator(), false);

      for (let i = this._graph.edgeIterator(); i.hasNext();) {
        const e = i.next();
        const node = e.getDirEdge(0).getFromNode();
        if (!node.isVisited()) subgraphs.add(this.findSubgraph(node));
      }

      return subgraphs;
    }

    addEdges(node, nodeStack, subgraph) {
      node.setVisited(true);

      for (let i = node.getOutEdges().iterator(); i.hasNext();) {
        const de = i.next();
        subgraph.add(de.getEdge());
        const toNode = de.getToNode();
        if (!toNode.isVisited()) nodeStack.push(toNode);
      }
    }

  }

  class LineSequencer {
    constructor() {
      LineSequencer.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._graph = new LineMergeGraph();
      this._factory = new GeometryFactory();
      this._lineCount = 0;
      this._isRun = false;
      this._sequencedGeometry = null;
      this._isSequenceable = false;
    }

    static findUnvisitedBestOrientedDE(node) {
      let wellOrientedDE = null;
      let unvisitedDE = null;

      for (let i = node.getOutEdges().iterator(); i.hasNext();) {
        const de = i.next();

        if (!de.getEdge().isVisited()) {
          unvisitedDE = de;
          if (de.getEdgeDirection()) wellOrientedDE = de;
        }
      }

      if (wellOrientedDE !== null) return wellOrientedDE;
      return unvisitedDE;
    }

    static findLowestDegreeNode(graph) {
      let minDegree = Integer.MAX_VALUE;
      let minDegreeNode = null;

      for (let i = graph.nodeIterator(); i.hasNext();) {
        const node = i.next();

        if (minDegreeNode === null || node.getDegree() < minDegree) {
          minDegree = node.getDegree();
          minDegreeNode = node;
        }
      }

      return minDegreeNode;
    }

    static isSequenced(geom) {
      if (!(geom instanceof MultiLineString)) return true;
      const mls = geom;
      const prevSubgraphNodes = new TreeSet();
      let lastNode = null;
      const currNodes = new ArrayList();

      for (let i = 0; i < mls.getNumGeometries(); i++) {
        const line = mls.getGeometryN(i);
        const startNode = line.getCoordinateN(0);
        const endNode = line.getCoordinateN(line.getNumPoints() - 1);
        if (prevSubgraphNodes.contains(startNode)) return false;
        if (prevSubgraphNodes.contains(endNode)) return false;
        if (lastNode !== null) if (!startNode.equals(lastNode)) {
          prevSubgraphNodes.addAll(currNodes);
          currNodes.clear();
        }
        currNodes.add(startNode);
        currNodes.add(endNode);
        lastNode = endNode;
      }

      return true;
    }

    static reverse(line) {
      const pts = line.getCoordinates();
      const revPts = new Array(pts.length).fill(null);
      const len = pts.length;

      for (let i = 0; i < len; i++) revPts[len - 1 - i] = new Coordinate(pts[i]);

      return line.getFactory().createLineString(revPts);
    }

    static sequence(geom) {
      const sequencer = new LineSequencer();
      sequencer.add(geom);
      return sequencer.getSequencedLineStrings();
    }

    addLine(lineString) {
      if (this._factory === null) this._factory = lineString.getFactory();

      this._graph.addEdge(lineString);

      this._lineCount++;
    }

    hasSequence(graph) {
      let oddDegreeCount = 0;

      for (let i = graph.nodeIterator(); i.hasNext();) {
        const node = i.next();
        if (node.getDegree() % 2 === 1) oddDegreeCount++;
      }

      return oddDegreeCount <= 2;
    }

    computeSequence() {
      if (this._isRun) return null;
      this._isRun = true;
      const sequences = this.findSequences();
      if (sequences === null) return null;
      this._sequencedGeometry = this.buildSequencedGeometry(sequences);
      this._isSequenceable = true;

      const finalLineCount = this._sequencedGeometry.getNumGeometries();

      Assert.isTrue(this._lineCount === finalLineCount, 'Lines were missing from result');
      Assert.isTrue(this._sequencedGeometry instanceof LineString || this._sequencedGeometry instanceof MultiLineString, 'Result is not lineal');
    }

    findSequences() {
      const sequences = new ArrayList();
      const csFinder = new ConnectedSubgraphFinder(this._graph);
      const subgraphs = csFinder.getConnectedSubgraphs();

      for (let i = subgraphs.iterator(); i.hasNext();) {
        const subgraph = i.next();

        if (this.hasSequence(subgraph)) {
          const seq = this.findSequence(subgraph);
          sequences.add(seq);
        } else {
          return null;
        }
      }

      return sequences;
    }

    addReverseSubpath(de, lit, expectedClosed) {
      const endNode = de.getToNode();
      let fromNode = null;

      while (true) {
        lit.add(de.getSym());
        de.getEdge().setVisited(true);
        fromNode = de.getFromNode();
        const unvisitedOutDE = LineSequencer.findUnvisitedBestOrientedDE(fromNode);
        if (unvisitedOutDE === null) break;
        de = unvisitedOutDE.getSym();
      }

      if (expectedClosed) Assert.isTrue(fromNode === endNode, 'path not contiguous');
    }

    findSequence(graph) {
      GraphComponent.setVisited(graph.edgeIterator(), false);
      const startNode = LineSequencer.findLowestDegreeNode(graph);
      const startDE = startNode.getOutEdges().iterator().next();
      const startDESym = startDE.getSym();
      const seq = new LinkedList();
      const lit = seq.listIterator();
      this.addReverseSubpath(startDESym, lit, false);

      while (lit.hasPrevious()) {
        const prev = lit.previous();
        const unvisitedOutDE = LineSequencer.findUnvisitedBestOrientedDE(prev.getFromNode());
        if (unvisitedOutDE !== null) this.addReverseSubpath(unvisitedOutDE.getSym(), lit, true);
      }

      const orientedSeq = this.orient(seq);
      return orientedSeq;
    }

    reverse(seq) {
      const newSeq = new LinkedList();

      for (let i = seq.iterator(); i.hasNext();) {
        const de = i.next();
        newSeq.addFirst(de.getSym());
      }

      return newSeq;
    }

    orient(seq) {
      const startEdge = seq.get(0);
      const endEdge = seq.get(seq.size() - 1);
      const startNode = startEdge.getFromNode();
      const endNode = endEdge.getToNode();
      let flipSeq = false;
      const hasDegree1Node = startNode.getDegree() === 1 || endNode.getDegree() === 1;

      if (hasDegree1Node) {
        let hasObviousStartNode = false;

        if (endEdge.getToNode().getDegree() === 1 && endEdge.getEdgeDirection() === false) {
          hasObviousStartNode = true;
          flipSeq = true;
        }

        if (startEdge.getFromNode().getDegree() === 1 && startEdge.getEdgeDirection() === true) {
          hasObviousStartNode = true;
          flipSeq = false;
        }

        if (!hasObviousStartNode) if (startEdge.getFromNode().getDegree() === 1) flipSeq = true;
      }

      if (flipSeq) return this.reverse(seq);
      return seq;
    }

    buildSequencedGeometry(sequences) {
      const lines = new ArrayList();

      for (let i1 = sequences.iterator(); i1.hasNext();) {
        const seq = i1.next();

        for (let i2 = seq.iterator(); i2.hasNext();) {
          const de = i2.next();
          const e = de.getEdge();
          const line = e.getLine();
          let lineToAdd = line;
          if (!de.getEdgeDirection() && !line.isClosed()) lineToAdd = LineSequencer.reverse(line);
          lines.add(lineToAdd);
        }
      }

      if (lines.size() === 0) return this._factory.createMultiLineString(new Array(0).fill(null));
      return this._factory.buildGeometry(lines);
    }

    getSequencedLineStrings() {
      this.computeSequence();
      return this._sequencedGeometry;
    }

    isSequenceable() {
      this.computeSequence();
      return this._isSequenceable;
    }

    add() {
      if (hasInterface(arguments[0], Collection)) {
        const geometries = arguments[0];

        for (let i = geometries.iterator(); i.hasNext();) {
          const geometry = i.next();
          this.add(geometry);
        }
      } else if (arguments[0] instanceof Geometry) {
        const geometry = arguments[0];
        geometry.apply(new class {
          get interfaces_() {
            return [GeometryComponentFilter];
          }

          filter(component) {
            if (component instanceof LineString) this.addLine(component);
          }

        }());
      }
    }

  }

  var linemerge = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LineMerger: LineMerger,
    LineSequencer: LineSequencer
  });

  class LineStringSnapper {
    constructor() {
      LineStringSnapper.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._snapTolerance = 0.0;
      this._srcPts = null;
      this._seg = new LineSegment();
      this._allowSnappingToSourceVertices = false;
      this._isClosed = false;

      if (arguments[0] instanceof LineString && typeof arguments[1] === 'number') {
        const srcLine = arguments[0],
              snapTolerance = arguments[1];
        LineStringSnapper.constructor_.call(this, srcLine.getCoordinates(), snapTolerance);
      } else if (arguments[0] instanceof Array && typeof arguments[1] === 'number') {
        const srcPts = arguments[0],
              snapTolerance = arguments[1];
        this._srcPts = srcPts;
        this._isClosed = LineStringSnapper.isClosed(srcPts);
        this._snapTolerance = snapTolerance;
      }
    }

    static isClosed(pts) {
      if (pts.length <= 1) return false;
      return pts[0].equals2D(pts[pts.length - 1]);
    }

    snapVertices(srcCoords, snapPts) {
      const end = this._isClosed ? srcCoords.size() - 1 : srcCoords.size();

      for (let i = 0; i < end; i++) {
        const srcPt = srcCoords.get(i);
        const snapVert = this.findSnapForVertex(srcPt, snapPts);

        if (snapVert !== null) {
          srcCoords.set(i, new Coordinate(snapVert));
          if (i === 0 && this._isClosed) srcCoords.set(srcCoords.size() - 1, new Coordinate(snapVert));
        }
      }
    }

    findSnapForVertex(pt, snapPts) {
      for (let i = 0; i < snapPts.length; i++) {
        if (pt.equals2D(snapPts[i])) return null;
        if (pt.distance(snapPts[i]) < this._snapTolerance) return snapPts[i];
      }

      return null;
    }

    snapTo(snapPts) {
      const coordList = new CoordinateList(this._srcPts);
      this.snapVertices(coordList, snapPts);
      this.snapSegments(coordList, snapPts);
      const newPts = coordList.toCoordinateArray();
      return newPts;
    }

    snapSegments(srcCoords, snapPts) {
      if (snapPts.length === 0) return null;
      let distinctPtCount = snapPts.length;
      if (snapPts[0].equals2D(snapPts[snapPts.length - 1])) distinctPtCount = snapPts.length - 1;

      for (let i = 0; i < distinctPtCount; i++) {
        const snapPt = snapPts[i];
        const index = this.findSegmentIndexToSnap(snapPt, srcCoords);
        if (index >= 0) srcCoords.add(index + 1, new Coordinate(snapPt), false);
      }
    }

    findSegmentIndexToSnap(snapPt, srcCoords) {
      let minDist = Double.MAX_VALUE;
      let snapIndex = -1;

      for (let i = 0; i < srcCoords.size() - 1; i++) {
        this._seg.p0 = srcCoords.get(i);
        this._seg.p1 = srcCoords.get(i + 1);
        if (this._seg.p0.equals2D(snapPt) || this._seg.p1.equals2D(snapPt)) if (this._allowSnappingToSourceVertices) continue;else return -1;

        const dist = this._seg.distance(snapPt);

        if (dist < this._snapTolerance && dist < minDist) {
          minDist = dist;
          snapIndex = i;
        }
      }

      return snapIndex;
    }

    setAllowSnappingToSourceVertices(allowSnappingToSourceVertices) {
      this._allowSnappingToSourceVertices = allowSnappingToSourceVertices;
    }

  }

  class GeometrySnapper {
    constructor() {
      GeometrySnapper.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._srcGeom = null;
      const srcGeom = arguments[0];
      this._srcGeom = srcGeom;
    }

    static snap(g0, g1, snapTolerance) {
      const snapGeom = new Array(2).fill(null);
      const snapper0 = new GeometrySnapper(g0);
      snapGeom[0] = snapper0.snapTo(g1, snapTolerance);
      const snapper1 = new GeometrySnapper(g1);
      snapGeom[1] = snapper1.snapTo(snapGeom[0], snapTolerance);
      return snapGeom;
    }

    static computeOverlaySnapTolerance() {
      if (arguments.length === 1) {
        const g = arguments[0];
        let snapTolerance = GeometrySnapper.computeSizeBasedSnapTolerance(g);
        const pm = g.getPrecisionModel();

        if (pm.getType() === PrecisionModel.FIXED) {
          const fixedSnapTol = 1 / pm.getScale() * 2 / 1.415;
          if (fixedSnapTol > snapTolerance) snapTolerance = fixedSnapTol;
        }

        return snapTolerance;
      } else if (arguments.length === 2) {
        const g0 = arguments[0],
              g1 = arguments[1];
        return Math.min(GeometrySnapper.computeOverlaySnapTolerance(g0), GeometrySnapper.computeOverlaySnapTolerance(g1));
      }
    }

    static computeSizeBasedSnapTolerance(g) {
      const env = g.getEnvelopeInternal();
      const minDimension = Math.min(env.getHeight(), env.getWidth());
      const snapTol = minDimension * GeometrySnapper.SNAP_PRECISION_FACTOR;
      return snapTol;
    }

    static snapToSelf(geom, snapTolerance, cleanResult) {
      const snapper0 = new GeometrySnapper(geom);
      return snapper0.snapToSelf(snapTolerance, cleanResult);
    }

    snapTo(snapGeom, snapTolerance) {
      const snapPts = this.extractTargetCoordinates(snapGeom);
      const snapTrans = new SnapTransformer(snapTolerance, snapPts);
      return snapTrans.transform(this._srcGeom);
    }

    snapToSelf(snapTolerance, cleanResult) {
      const snapPts = this.extractTargetCoordinates(this._srcGeom);
      const snapTrans = new SnapTransformer(snapTolerance, snapPts, true);
      const snappedGeom = snapTrans.transform(this._srcGeom);
      let result = snappedGeom;
      if (cleanResult && hasInterface(result, Polygonal)) result = snappedGeom.buffer(0);
      return result;
    }

    computeSnapTolerance(ringPts) {
      const minSegLen = this.computeMinimumSegmentLength(ringPts);
      const snapTol = minSegLen / 10;
      return snapTol;
    }

    extractTargetCoordinates(g) {
      const ptSet = new TreeSet();
      const pts = g.getCoordinates();

      for (let i = 0; i < pts.length; i++) ptSet.add(pts[i]);

      return ptSet.toArray(new Array(0).fill(null));
    }

    computeMinimumSegmentLength(pts) {
      let minSegLen = Double.MAX_VALUE;

      for (let i = 0; i < pts.length - 1; i++) {
        const segLen = pts[i].distance(pts[i + 1]);
        if (segLen < minSegLen) minSegLen = segLen;
      }

      return minSegLen;
    }

  }
  GeometrySnapper.SNAP_PRECISION_FACTOR = 1e-9;

  class SnapTransformer extends GeometryTransformer {
    constructor() {
      super();
      SnapTransformer.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._snapTolerance = null;
      this._snapPts = null;
      this._isSelfSnap = false;

      if (arguments.length === 2) {
        const snapTolerance = arguments[0],
              snapPts = arguments[1];
        this._snapTolerance = snapTolerance;
        this._snapPts = snapPts;
      } else if (arguments.length === 3) {
        const snapTolerance = arguments[0],
              snapPts = arguments[1],
              isSelfSnap = arguments[2];
        this._snapTolerance = snapTolerance;
        this._snapPts = snapPts;
        this._isSelfSnap = isSelfSnap;
      }
    }

    snapLine(srcPts, snapPts) {
      const snapper = new LineStringSnapper(srcPts, this._snapTolerance);
      snapper.setAllowSnappingToSourceVertices(this._isSelfSnap);
      return snapper.snapTo(snapPts);
    }

    transformCoordinates(coords, parent) {
      const srcPts = coords.toCoordinateArray();
      const newPts = this.snapLine(srcPts, this._snapPts);
      return this._factory.getCoordinateSequenceFactory().create(newPts);
    }

  }

  var snap = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GeometrySnapper: GeometrySnapper,
    LineStringSnapper: LineStringSnapper
  });

  class BasicSegmentString {
    constructor() {
      BasicSegmentString.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pts = null;
      this._data = null;
      const pts = arguments[0],
            data = arguments[1];
      this._pts = pts;
      this._data = data;
    }

    getCoordinates() {
      return this._pts;
    }

    size() {
      return this._pts.length;
    }

    getCoordinate(i) {
      return this._pts[i];
    }

    isClosed() {
      return this._pts[0].equals(this._pts[this._pts.length - 1]);
    }

    getSegmentOctant(index) {
      if (index === this._pts.length - 1) return -1;
      return Octant.octant(this.getCoordinate(index), this.getCoordinate(index + 1));
    }

    setData(data) {
      this._data = data;
    }

    getData() {
      return this._data;
    }

    toString() {
      return WKTWriter.toLineString(new CoordinateArraySequence(this._pts));
    }

    get interfaces_() {
      return [SegmentString];
    }

  }

  class NodingIntersectionFinder {
    constructor() {
      NodingIntersectionFinder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._findAllIntersections = false;
      this._isCheckEndSegmentsOnly = false;
      this._keepIntersections = true;
      this._isInteriorIntersectionsOnly = false;
      this._li = null;
      this._interiorIntersection = null;
      this._intSegments = null;
      this._intersections = new ArrayList();
      this._intersectionCount = 0;
      const li = arguments[0];
      this._li = li;
      this._interiorIntersection = null;
    }

    static createAllIntersectionsFinder(li) {
      const finder = new NodingIntersectionFinder(li);
      finder.setFindAllIntersections(true);
      return finder;
    }

    static isInteriorVertexIntersection() {
      if (arguments.length === 4) {
        const p0 = arguments[0],
              p1 = arguments[1],
              isEnd0 = arguments[2],
              isEnd1 = arguments[3];
        if (isEnd0 && isEnd1) return false;
        if (p0.equals2D(p1)) return true;
        return false;
      } else if (arguments.length === 8) {
        const p00 = arguments[0],
              p01 = arguments[1],
              p10 = arguments[2],
              p11 = arguments[3],
              isEnd00 = arguments[4],
              isEnd01 = arguments[5],
              isEnd10 = arguments[6],
              isEnd11 = arguments[7];
        if (NodingIntersectionFinder.isInteriorVertexIntersection(p00, p10, isEnd00, isEnd10)) return true;
        if (NodingIntersectionFinder.isInteriorVertexIntersection(p00, p11, isEnd00, isEnd11)) return true;
        if (NodingIntersectionFinder.isInteriorVertexIntersection(p01, p10, isEnd01, isEnd10)) return true;
        if (NodingIntersectionFinder.isInteriorVertexIntersection(p01, p11, isEnd01, isEnd11)) return true;
        return false;
      }
    }

    static createInteriorIntersectionCounter(li) {
      const finder = new NodingIntersectionFinder(li);
      finder.setInteriorIntersectionsOnly(true);
      finder.setFindAllIntersections(true);
      finder.setKeepIntersections(false);
      return finder;
    }

    static createIntersectionCounter(li) {
      const finder = new NodingIntersectionFinder(li);
      finder.setFindAllIntersections(true);
      finder.setKeepIntersections(false);
      return finder;
    }

    static isEndSegment(segStr, index) {
      if (index === 0) return true;
      if (index >= segStr.size() - 2) return true;
      return false;
    }

    static createAnyIntersectionFinder(li) {
      return new NodingIntersectionFinder(li);
    }

    static createInteriorIntersectionsFinder(li) {
      const finder = new NodingIntersectionFinder(li);
      finder.setFindAllIntersections(true);
      finder.setInteriorIntersectionsOnly(true);
      return finder;
    }

    setCheckEndSegmentsOnly(isCheckEndSegmentsOnly) {
      this._isCheckEndSegmentsOnly = isCheckEndSegmentsOnly;
    }

    getIntersectionSegments() {
      return this._intSegments;
    }

    count() {
      return this._intersectionCount;
    }

    getIntersections() {
      return this._intersections;
    }

    setFindAllIntersections(findAllIntersections) {
      this._findAllIntersections = findAllIntersections;
    }

    setKeepIntersections(keepIntersections) {
      this._keepIntersections = keepIntersections;
    }

    getIntersection() {
      return this._interiorIntersection;
    }

    processIntersections(e0, segIndex0, e1, segIndex1) {
      if (!this._findAllIntersections && this.hasIntersection()) return null;
      const isSameSegString = e0 === e1;
      const isSameSegment = isSameSegString && segIndex0 === segIndex1;
      if (isSameSegment) return null;

      if (this._isCheckEndSegmentsOnly) {
        const isEndSegPresent = NodingIntersectionFinder.isEndSegment(e0, segIndex0) || NodingIntersectionFinder.isEndSegment(e1, segIndex1);
        if (!isEndSegPresent) return null;
      }

      const p00 = e0.getCoordinate(segIndex0);
      const p01 = e0.getCoordinate(segIndex0 + 1);
      const p10 = e1.getCoordinate(segIndex1);
      const p11 = e1.getCoordinate(segIndex1 + 1);
      const isEnd00 = segIndex0 === 0;
      const isEnd01 = segIndex0 + 2 === e0.size();
      const isEnd10 = segIndex1 === 0;
      const isEnd11 = segIndex1 + 2 === e1.size();

      this._li.computeIntersection(p00, p01, p10, p11);

      const isInteriorInt = this._li.hasIntersection() && this._li.isInteriorIntersection();

      let isInteriorVertexInt = false;

      if (!this._isInteriorIntersectionsOnly) {
        const isAdjacentSegment = isSameSegString && Math.abs(segIndex1 - segIndex0) <= 1;
        isInteriorVertexInt = !isAdjacentSegment && NodingIntersectionFinder.isInteriorVertexIntersection(p00, p01, p10, p11, isEnd00, isEnd01, isEnd10, isEnd11);
      }

      if (isInteriorInt || isInteriorVertexInt) {
        this._intSegments = new Array(4).fill(null);
        this._intSegments[0] = p00;
        this._intSegments[1] = p01;
        this._intSegments[2] = p10;
        this._intSegments[3] = p11;
        this._interiorIntersection = this._li.getIntersection(0);
        if (this._keepIntersections) this._intersections.add(this._interiorIntersection);
        this._intersectionCount++;
      }
    }

    hasIntersection() {
      return this._interiorIntersection !== null;
    }

    isDone() {
      if (this._findAllIntersections) return false;
      return this._interiorIntersection !== null;
    }

    setInteriorIntersectionsOnly(isInteriorIntersectionsOnly) {
      this._isInteriorIntersectionsOnly = isInteriorIntersectionsOnly;
    }

    get interfaces_() {
      return [SegmentIntersector];
    }

  }

  class FastNodingValidator {
    constructor() {
      FastNodingValidator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._li = new RobustLineIntersector();
      this._segStrings = null;
      this._findAllIntersections = false;
      this._segInt = null;
      this._isValid = true;
      const segStrings = arguments[0];
      this._segStrings = segStrings;
    }

    static computeIntersections(segStrings) {
      const nv = new FastNodingValidator(segStrings);
      nv.setFindAllIntersections(true);
      nv.isValid();
      return nv.getIntersections();
    }

    execute() {
      if (this._segInt !== null) return null;
      this.checkInteriorIntersections();
    }

    getIntersections() {
      return this._segInt.getIntersections();
    }

    isValid() {
      this.execute();
      return this._isValid;
    }

    setFindAllIntersections(findAllIntersections) {
      this._findAllIntersections = findAllIntersections;
    }

    checkInteriorIntersections() {
      this._isValid = true;
      this._segInt = new NodingIntersectionFinder(this._li);

      this._segInt.setFindAllIntersections(this._findAllIntersections);

      const noder = new MCIndexNoder();
      noder.setSegmentIntersector(this._segInt);
      noder.computeNodes(this._segStrings);

      if (this._segInt.hasIntersection()) {
        this._isValid = false;
        return null;
      }
    }

    checkValid() {
      this.execute();
      if (!this._isValid) throw new TopologyException(this.getErrorMessage(), this._segInt.getIntersection());
    }

    getErrorMessage() {
      if (this._isValid) return 'no intersections found';

      const intSegs = this._segInt.getIntersectionSegments();

      return 'found non-noded intersection between ' + WKTWriter.toLineString(intSegs[0], intSegs[1]) + ' and ' + WKTWriter.toLineString(intSegs[2], intSegs[3]);
    }

  }

  class EdgeNodingValidator {
    constructor() {
      EdgeNodingValidator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._nv = null;
      const edges = arguments[0];
      this._nv = new FastNodingValidator(EdgeNodingValidator.toSegmentStrings(edges));
    }

    static toSegmentStrings(edges) {
      const segStrings = new ArrayList();

      for (let i = edges.iterator(); i.hasNext();) {
        const e = i.next();
        segStrings.add(new BasicSegmentString(e.getCoordinates(), e));
      }

      return segStrings;
    }

    static checkValid(edges) {
      const validator = new EdgeNodingValidator(edges);
      validator.checkValid();
    }

    checkValid() {
      this._nv.checkValid();
    }

  }

  class LineBuilder {
    constructor() {
      LineBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._op = null;
      this._geometryFactory = null;
      this._ptLocator = null;
      this._lineEdgesList = new ArrayList();
      this._resultLineList = new ArrayList();
      const op = arguments[0],
            geometryFactory = arguments[1],
            ptLocator = arguments[2];
      this._op = op;
      this._geometryFactory = geometryFactory;
      this._ptLocator = ptLocator;
    }

    collectLines(opCode) {
      for (let it = this._op.getGraph().getEdgeEnds().iterator(); it.hasNext();) {
        const de = it.next();
        this.collectLineEdge(de, opCode, this._lineEdgesList);
        this.collectBoundaryTouchEdge(de, opCode, this._lineEdgesList);
      }
    }

    labelIsolatedLine(e, targetIndex) {
      const loc = this._ptLocator.locate(e.getCoordinate(), this._op.getArgGeometry(targetIndex));

      e.getLabel().setLocation(targetIndex, loc);
    }

    build(opCode) {
      this.findCoveredLineEdges();
      this.collectLines(opCode);
      this.buildLines(opCode);
      return this._resultLineList;
    }

    collectLineEdge(de, opCode, edges) {
      const label = de.getLabel();
      const e = de.getEdge();
      if (de.isLineEdge()) if (!de.isVisited() && OverlayOp.isResultOfOp(label, opCode) && !e.isCovered()) {
        edges.add(e);
        de.setVisitedEdge(true);
      }
    }

    findCoveredLineEdges() {
      for (let nodeit = this._op.getGraph().getNodes().iterator(); nodeit.hasNext();) {
        const node = nodeit.next();
        node.getEdges().findCoveredLineEdges();
      }

      for (let it = this._op.getGraph().getEdgeEnds().iterator(); it.hasNext();) {
        const de = it.next();
        const e = de.getEdge();

        if (de.isLineEdge() && !e.isCoveredSet()) {
          const isCovered = this._op.isCoveredByA(de.getCoordinate());

          e.setCovered(isCovered);
        }
      }
    }

    labelIsolatedLines(edgesList) {
      for (let it = edgesList.iterator(); it.hasNext();) {
        const e = it.next();
        const label = e.getLabel();
        if (e.isIsolated()) if (label.isNull(0)) this.labelIsolatedLine(e, 0);else this.labelIsolatedLine(e, 1);
      }
    }

    buildLines(opCode) {
      for (let it = this._lineEdgesList.iterator(); it.hasNext();) {
        const e = it.next();

        const line = this._geometryFactory.createLineString(e.getCoordinates());

        this._resultLineList.add(line);

        e.setInResult(true);
      }
    }

    collectBoundaryTouchEdge(de, opCode, edges) {
      const label = de.getLabel();
      if (de.isLineEdge()) return null;
      if (de.isVisited()) return null;
      if (de.isInteriorAreaEdge()) return null;
      if (de.getEdge().isInResult()) return null;
      Assert.isTrue(!(de.isInResult() || de.getSym().isInResult()) || !de.getEdge().isInResult());

      if (OverlayOp.isResultOfOp(label, opCode) && opCode === OverlayOp.INTERSECTION) {
        edges.add(de.getEdge());
        de.setVisitedEdge(true);
      }
    }

  }

  class PointBuilder {
    constructor() {
      PointBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._op = null;
      this._geometryFactory = null;
      this._resultPointList = new ArrayList();
      const op = arguments[0],
            geometryFactory = arguments[1];
      this._op = op;
      this._geometryFactory = geometryFactory;
    }

    filterCoveredNodeToPoint(n) {
      const coord = n.getCoordinate();

      if (!this._op.isCoveredByLA(coord)) {
        const pt = this._geometryFactory.createPoint(coord);

        this._resultPointList.add(pt);
      }
    }

    extractNonCoveredResultNodes(opCode) {
      for (let nodeit = this._op.getGraph().getNodes().iterator(); nodeit.hasNext();) {
        const n = nodeit.next();
        if (n.isInResult()) continue;
        if (n.isIncidentEdgeInResult()) continue;

        if (n.getEdges().getDegree() === 0 || opCode === OverlayOp.INTERSECTION) {
          const label = n.getLabel();
          if (OverlayOp.isResultOfOp(label, opCode)) this.filterCoveredNodeToPoint(n);
        }
      }
    }

    build(opCode) {
      this.extractNonCoveredResultNodes(opCode);
      return this._resultPointList;
    }

  }

  class CommonBits {
    constructor() {
      this._isFirst = true;
      this._commonMantissaBitsCount = 53;
      this._commonBits = new Long();
      this._commonSignExp = null;
    }

    getCommon() {
      return Double.longBitsToDouble(this._commonBits);
    }

    add(num) {
      const numBits = Double.doubleToLongBits(num);

      if (this._isFirst) {
        this._commonBits = numBits;
        this._commonSignExp = CommonBits.signExpBits(this._commonBits);
        this._isFirst = false;
        return null;
      }

      const numSignExp = CommonBits.signExpBits(numBits);

      if (numSignExp !== this._commonSignExp) {
        this._commonBits.high = 0 | 0;
        this._commonBits.low = 0 | 0;
        return null;
      }

      this._commonMantissaBitsCount = CommonBits.numCommonMostSigMantissaBits(this._commonBits, numBits);
      this._commonBits = CommonBits.zeroLowerBits(this._commonBits, 64 - (12 + this._commonMantissaBitsCount));
    }

    toString() {
      if (arguments.length === 1) {
        const bits = arguments[0];
        const x = Double.longBitsToDouble(bits);
        const numStr = Long.toBinaryString(bits);
        const padStr = '0000000000000000000000000000000000000000000000000000000000000000' + numStr;
        const bitStr = padStr.substring(padStr.length - 64);
        const str = bitStr.substring(0, 1) + '  ' + bitStr.substring(1, 12) + '(exp) ' + bitStr.substring(12) + ' [ ' + x + ' ]';
        return str;
      }
    }

    getClass() {
      return CommonBits;
    }

    get interfaces_() {
      return [];
    }

    static getBit(bits, i) {
      const mask = 1 << i % 32;
      if (i < 32) return (bits.low & mask) !== 0 ? 1 : 0;
      return (bits.high & mask) !== 0 ? 1 : 0;
    }

    static signExpBits(num) {
      return num.high >>> 20;
    }

    static zeroLowerBits(bits, nBits) {
      let prop = 'low';

      if (nBits > 32) {
        bits.low = 0 | 0;
        nBits %= 32;
        prop = 'high';
      }

      if (nBits > 0) {
        const mask = nBits < 32 ? ~((1 << nBits) - 1) : 0;
        bits[prop] &= mask;
      }

      return bits;
    }

    static numCommonMostSigMantissaBits(num1, num2) {
      let count = 0;

      for (let i = 52; i >= 0; i--) {
        if (CommonBits.getBit(num1, i) !== CommonBits.getBit(num2, i)) return count;
        count++;
      }

      return 52;
    }

  }

  class CommonBitsRemover {
    constructor() {
      CommonBitsRemover.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._commonCoord = null;
      this._ccFilter = new CommonCoordinateFilter();
    }

    addCommonBits(geom) {
      const trans = new Translater(this._commonCoord);
      geom.apply(trans);
      geom.geometryChanged();
    }

    removeCommonBits(geom) {
      if (this._commonCoord.x === 0.0 && this._commonCoord.y === 0.0) return geom;
      const invCoord = new Coordinate(this._commonCoord);
      invCoord.x = -invCoord.x;
      invCoord.y = -invCoord.y;
      const trans = new Translater(invCoord);
      geom.apply(trans);
      geom.geometryChanged();
      return geom;
    }

    getCommonCoordinate() {
      return this._commonCoord;
    }

    add(geom) {
      geom.apply(this._ccFilter);
      this._commonCoord = this._ccFilter.getCommonCoordinate();
    }

  }

  class CommonCoordinateFilter {
    constructor() {
      CommonCoordinateFilter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._commonBitsX = new CommonBits();
      this._commonBitsY = new CommonBits();
    }

    filter(coord) {
      this._commonBitsX.add(coord.x);

      this._commonBitsY.add(coord.y);
    }

    getCommonCoordinate() {
      return new Coordinate(this._commonBitsX.getCommon(), this._commonBitsY.getCommon());
    }

    get interfaces_() {
      return [CoordinateFilter];
    }

  }

  class Translater {
    constructor() {
      Translater.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.trans = null;
      const trans = arguments[0];
      this.trans = trans;
    }

    filter(seq, i) {
      const xp = seq.getOrdinate(i, 0) + this.trans.x;
      const yp = seq.getOrdinate(i, 1) + this.trans.y;
      seq.setOrdinate(i, 0, xp);
      seq.setOrdinate(i, 1, yp);
    }

    isDone() {
      return false;
    }

    isGeometryChanged() {
      return true;
    }

    get interfaces_() {
      return [CoordinateSequenceFilter];
    }

  }

  CommonBitsRemover.CommonCoordinateFilter = CommonCoordinateFilter;
  CommonBitsRemover.Translater = Translater;

  class SnapOverlayOp {
    constructor() {
      SnapOverlayOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geom = new Array(2).fill(null);
      this._snapTolerance = null;
      this._cbr = null;
      const g1 = arguments[0],
            g2 = arguments[1];
      this._geom[0] = g1;
      this._geom[1] = g2;
      this.computeSnapTolerance();
    }

    static overlayOp(g0, g1, opCode) {
      const op = new SnapOverlayOp(g0, g1);
      return op.getResultGeometry(opCode);
    }

    static union(g0, g1) {
      return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.UNION);
    }

    static intersection(g0, g1) {
      return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.INTERSECTION);
    }

    static symDifference(g0, g1) {
      return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.SYMDIFFERENCE);
    }

    static difference(g0, g1) {
      return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.DIFFERENCE);
    }

    selfSnap(geom) {
      const snapper0 = new GeometrySnapper(geom);
      const snapGeom = snapper0.snapTo(geom, this._snapTolerance);
      return snapGeom;
    }

    removeCommonBits(geom) {
      this._cbr = new CommonBitsRemover();

      this._cbr.add(geom[0]);

      this._cbr.add(geom[1]);

      const remGeom = new Array(2).fill(null);
      remGeom[0] = this._cbr.removeCommonBits(geom[0].copy());
      remGeom[1] = this._cbr.removeCommonBits(geom[1].copy());
      return remGeom;
    }

    prepareResult(geom) {
      this._cbr.addCommonBits(geom);

      return geom;
    }

    getResultGeometry(opCode) {
      const prepGeom = this.snap(this._geom);
      const result = OverlayOp.overlayOp(prepGeom[0], prepGeom[1], opCode);
      return this.prepareResult(result);
    }

    checkValid(g) {
      if (!g.isValid()) System.out.println('Snapped geometry is invalid');
    }

    computeSnapTolerance() {
      this._snapTolerance = GeometrySnapper.computeOverlaySnapTolerance(this._geom[0], this._geom[1]);
    }

    snap(geom) {
      const remGeom = this.removeCommonBits(geom);
      const snapGeom = GeometrySnapper.snap(remGeom[0], remGeom[1], this._snapTolerance);
      return snapGeom;
    }

  }

  class SnapIfNeededOverlayOp {
    constructor() {
      SnapIfNeededOverlayOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geom = new Array(2).fill(null);
      const g1 = arguments[0],
            g2 = arguments[1];
      this._geom[0] = g1;
      this._geom[1] = g2;
    }

    static overlayOp(g0, g1, opCode) {
      const op = new SnapIfNeededOverlayOp(g0, g1);
      return op.getResultGeometry(opCode);
    }

    static union(g0, g1) {
      return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.UNION);
    }

    static intersection(g0, g1) {
      return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.INTERSECTION);
    }

    static symDifference(g0, g1) {
      return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.SYMDIFFERENCE);
    }

    static difference(g0, g1) {
      return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.DIFFERENCE);
    }

    getResultGeometry(opCode) {
      let result = null;
      let isSuccess = false;
      let savedException = null;

      try {
        result = OverlayOp.overlayOp(this._geom[0], this._geom[1], opCode);
        const isValid = true;
        if (isValid) isSuccess = true;
      } catch (ex) {
        if (ex instanceof RuntimeException) savedException = ex;else throw ex;
      } finally {}

      if (!isSuccess) try {
        result = SnapOverlayOp.overlayOp(this._geom[0], this._geom[1], opCode);
      } catch (ex) {
        if (ex instanceof RuntimeException) throw savedException;else throw ex;
      } finally {}
      return result;
    }

  }

  class GeometryGraphOperation {
    constructor() {
      GeometryGraphOperation.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._li = new RobustLineIntersector();
      this._resultPrecisionModel = null;
      this._arg = null;

      if (arguments.length === 1) {
        const g0 = arguments[0];
        this.setComputationPrecision(g0.getPrecisionModel());
        this._arg = new Array(1).fill(null);
        this._arg[0] = new GeometryGraph(0, g0);
      } else if (arguments.length === 2) {
        const g0 = arguments[0],
              g1 = arguments[1];
        GeometryGraphOperation.constructor_.call(this, g0, g1, BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE);
      } else if (arguments.length === 3) {
        const g0 = arguments[0],
              g1 = arguments[1],
              boundaryNodeRule = arguments[2];
        if (g0.getPrecisionModel().compareTo(g1.getPrecisionModel()) >= 0) this.setComputationPrecision(g0.getPrecisionModel());else this.setComputationPrecision(g1.getPrecisionModel());
        this._arg = new Array(2).fill(null);
        this._arg[0] = new GeometryGraph(0, g0, boundaryNodeRule);
        this._arg[1] = new GeometryGraph(1, g1, boundaryNodeRule);
      }
    }

    getArgGeometry(i) {
      return this._arg[i].getGeometry();
    }

    setComputationPrecision(pm) {
      this._resultPrecisionModel = pm;

      this._li.setPrecisionModel(this._resultPrecisionModel);
    }

  }

  class OverlayOp extends GeometryGraphOperation {
    constructor() {
      super();
      OverlayOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._ptLocator = new PointLocator();
      this._geomFact = null;
      this._resultGeom = null;
      this._graph = null;
      this._edgeList = new EdgeList();
      this._resultPolyList = new ArrayList();
      this._resultLineList = new ArrayList();
      this._resultPointList = new ArrayList();
      const g0 = arguments[0],
            g1 = arguments[1];
      GeometryGraphOperation.constructor_.call(this, g0, g1);
      this._graph = new PlanarGraph$1(new OverlayNodeFactory());
      this._geomFact = g0.getFactory();
    }

    static overlayOp(geom0, geom1, opCode) {
      const gov = new OverlayOp(geom0, geom1);
      const geomOv = gov.getResultGeometry(opCode);
      return geomOv;
    }

    static union(geom, other) {
      if (geom.isEmpty() || other.isEmpty()) {
        if (geom.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.UNION, geom, other, geom.getFactory());
        if (geom.isEmpty()) return other.copy();
        if (other.isEmpty()) return geom.copy();
      }

      if (geom.isGeometryCollection() || other.isGeometryCollection()) throw new IllegalArgumentException('This method does not support GeometryCollection arguments');
      return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.UNION);
    }

    static intersection(geom, other) {
      if (geom.isEmpty() || other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.INTERSECTION, geom, other, geom.getFactory());

      if (geom.isGeometryCollection()) {
        const g2 = other;
        return GeometryCollectionMapper.map(geom, new class {
          get interfaces_() {
            return [MapOp];
          }

          map(g) {
            return OverlayOp.intersection(g, g2);
          }

        }());
      }

      return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.INTERSECTION);
    }

    static symDifference(geom, other) {
      if (geom.isEmpty() || other.isEmpty()) {
        if (geom.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.SYMDIFFERENCE, geom, other, geom.getFactory());
        if (geom.isEmpty()) return other.copy();
        if (other.isEmpty()) return geom.copy();
      }

      if (geom.isGeometryCollection() || other.isGeometryCollection()) throw new IllegalArgumentException('This method does not support GeometryCollection arguments');
      return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.SYMDIFFERENCE);
    }

    static resultDimension(opCode, g0, g1) {
      const dim0 = g0.getDimension();
      const dim1 = g1.getDimension();
      let resultDimension = -1;

      switch (opCode) {
        case OverlayOp.INTERSECTION:
          resultDimension = Math.min(dim0, dim1);
          break;

        case OverlayOp.UNION:
          resultDimension = Math.max(dim0, dim1);
          break;

        case OverlayOp.DIFFERENCE:
          resultDimension = dim0;
          break;

        case OverlayOp.SYMDIFFERENCE:
          resultDimension = Math.max(dim0, dim1);
          break;
      }

      return resultDimension;
    }

    static createEmptyResult(overlayOpCode, a, b, geomFact) {
      const resultDim = OverlayOp.resultDimension(overlayOpCode, a, b);
      return geomFact.createEmpty(resultDim);
    }

    static difference(geom, other) {
      if (geom.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.DIFFERENCE, geom, other, geom.getFactory());
      if (other.isEmpty()) return geom.copy();
      if (geom.isGeometryCollection() || other.isGeometryCollection()) throw new IllegalArgumentException('This method does not support GeometryCollection arguments');
      return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.DIFFERENCE);
    }

    static isResultOfOp() {
      if (arguments.length === 2) {
        const label = arguments[0],
              opCode = arguments[1];
        const loc0 = label.getLocation(0);
        const loc1 = label.getLocation(1);
        return OverlayOp.isResultOfOp(loc0, loc1, opCode);
      } else if (arguments.length === 3) {
        let loc0 = arguments[0],
            loc1 = arguments[1],
            overlayOpCode = arguments[2];
        if (loc0 === Location.BOUNDARY) loc0 = Location.INTERIOR;
        if (loc1 === Location.BOUNDARY) loc1 = Location.INTERIOR;

        switch (overlayOpCode) {
          case OverlayOp.INTERSECTION:
            return loc0 === Location.INTERIOR && loc1 === Location.INTERIOR;

          case OverlayOp.UNION:
            return loc0 === Location.INTERIOR || loc1 === Location.INTERIOR;

          case OverlayOp.DIFFERENCE:
            return loc0 === Location.INTERIOR && loc1 !== Location.INTERIOR;

          case OverlayOp.SYMDIFFERENCE:
            return loc0 === Location.INTERIOR && loc1 !== Location.INTERIOR || loc0 !== Location.INTERIOR && loc1 === Location.INTERIOR;
        }

        return false;
      }
    }

    insertUniqueEdge(e) {
      const existingEdge = this._edgeList.findEqualEdge(e);

      if (existingEdge !== null) {
        const existingLabel = existingEdge.getLabel();
        let labelToMerge = e.getLabel();

        if (!existingEdge.isPointwiseEqual(e)) {
          labelToMerge = new Label(e.getLabel());
          labelToMerge.flip();
        }

        const depth = existingEdge.getDepth();
        if (depth.isNull()) depth.add(existingLabel);
        depth.add(labelToMerge);
        existingLabel.merge(labelToMerge);
      } else {
        this._edgeList.add(e);
      }
    }

    getGraph() {
      return this._graph;
    }

    cancelDuplicateResultEdges() {
      for (let it = this._graph.getEdgeEnds().iterator(); it.hasNext();) {
        const de = it.next();
        const sym = de.getSym();

        if (de.isInResult() && sym.isInResult()) {
          de.setInResult(false);
          sym.setInResult(false);
        }
      }
    }

    isCoveredByLA(coord) {
      if (this.isCovered(coord, this._resultLineList)) return true;
      if (this.isCovered(coord, this._resultPolyList)) return true;
      return false;
    }

    computeGeometry(resultPointList, resultLineList, resultPolyList, opcode) {
      const geomList = new ArrayList();
      geomList.addAll(resultPointList);
      geomList.addAll(resultLineList);
      geomList.addAll(resultPolyList);
      if (geomList.isEmpty()) return OverlayOp.createEmptyResult(opcode, this._arg[0].getGeometry(), this._arg[1].getGeometry(), this._geomFact);
      return this._geomFact.buildGeometry(geomList);
    }

    mergeSymLabels() {
      for (let nodeit = this._graph.getNodes().iterator(); nodeit.hasNext();) {
        const node = nodeit.next();
        node.getEdges().mergeSymLabels();
      }
    }

    isCovered(coord, geomList) {
      for (let it = geomList.iterator(); it.hasNext();) {
        const geom = it.next();

        const loc = this._ptLocator.locate(coord, geom);

        if (loc !== Location.EXTERIOR) return true;
      }

      return false;
    }

    replaceCollapsedEdges() {
      const newEdges = new ArrayList();

      for (let it = this._edgeList.iterator(); it.hasNext();) {
        const e = it.next();

        if (e.isCollapsed()) {
          it.remove();
          newEdges.add(e.getCollapsedEdge());
        }
      }

      this._edgeList.addAll(newEdges);
    }

    updateNodeLabelling() {
      for (let nodeit = this._graph.getNodes().iterator(); nodeit.hasNext();) {
        const node = nodeit.next();
        const lbl = node.getEdges().getLabel();
        node.getLabel().merge(lbl);
      }
    }

    getResultGeometry(overlayOpCode) {
      this.computeOverlay(overlayOpCode);
      return this._resultGeom;
    }

    insertUniqueEdges(edges) {
      for (let i = edges.iterator(); i.hasNext();) {
        const e = i.next();
        this.insertUniqueEdge(e);
      }
    }

    computeOverlay(opCode) {
      this.copyPoints(0);
      this.copyPoints(1);

      this._arg[0].computeSelfNodes(this._li, false);

      this._arg[1].computeSelfNodes(this._li, false);

      this._arg[0].computeEdgeIntersections(this._arg[1], this._li, true);

      const baseSplitEdges = new ArrayList();

      this._arg[0].computeSplitEdges(baseSplitEdges);

      this._arg[1].computeSplitEdges(baseSplitEdges);
      this.insertUniqueEdges(baseSplitEdges);
      this.computeLabelsFromDepths();
      this.replaceCollapsedEdges();
      EdgeNodingValidator.checkValid(this._edgeList.getEdges());

      this._graph.addEdges(this._edgeList.getEdges());

      this.computeLabelling();
      this.labelIncompleteNodes();
      this.findResultAreaEdges(opCode);
      this.cancelDuplicateResultEdges();
      const polyBuilder = new PolygonBuilder(this._geomFact);
      polyBuilder.add(this._graph);
      this._resultPolyList = polyBuilder.getPolygons();
      const lineBuilder = new LineBuilder(this, this._geomFact, this._ptLocator);
      this._resultLineList = lineBuilder.build(opCode);
      const pointBuilder = new PointBuilder(this, this._geomFact, this._ptLocator);
      this._resultPointList = pointBuilder.build(opCode);
      this._resultGeom = this.computeGeometry(this._resultPointList, this._resultLineList, this._resultPolyList, opCode);
    }

    labelIncompleteNode(n, targetIndex) {
      const loc = this._ptLocator.locate(n.getCoordinate(), this._arg[targetIndex].getGeometry());

      n.getLabel().setLocation(targetIndex, loc);
    }

    copyPoints(argIndex) {
      for (let i = this._arg[argIndex].getNodeIterator(); i.hasNext();) {
        const graphNode = i.next();

        const newNode = this._graph.addNode(graphNode.getCoordinate());

        newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
      }
    }

    findResultAreaEdges(opCode) {
      for (let it = this._graph.getEdgeEnds().iterator(); it.hasNext();) {
        const de = it.next();
        const label = de.getLabel();
        if (label.isArea() && !de.isInteriorAreaEdge() && OverlayOp.isResultOfOp(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), opCode)) de.setInResult(true);
      }
    }

    computeLabelsFromDepths() {
      for (let it = this._edgeList.iterator(); it.hasNext();) {
        const e = it.next();
        const lbl = e.getLabel();
        const depth = e.getDepth();

        if (!depth.isNull()) {
          depth.normalize();

          for (let i = 0; i < 2; i++) if (!lbl.isNull(i) && lbl.isArea() && !depth.isNull(i)) if (depth.getDelta(i) === 0) {
            lbl.toLine(i);
          } else {
            Assert.isTrue(!depth.isNull(i, Position.LEFT), 'depth of LEFT side has not been initialized');
            lbl.setLocation(i, Position.LEFT, depth.getLocation(i, Position.LEFT));
            Assert.isTrue(!depth.isNull(i, Position.RIGHT), 'depth of RIGHT side has not been initialized');
            lbl.setLocation(i, Position.RIGHT, depth.getLocation(i, Position.RIGHT));
          }
        }
      }
    }

    computeLabelling() {
      for (let nodeit = this._graph.getNodes().iterator(); nodeit.hasNext();) {
        const node = nodeit.next();
        node.getEdges().computeLabelling(this._arg);
      }

      this.mergeSymLabels();
      this.updateNodeLabelling();
    }

    labelIncompleteNodes() {
      for (let ni = this._graph.getNodes().iterator(); ni.hasNext();) {
        const n = ni.next();
        const label = n.getLabel();
        if (n.isIsolated()) if (label.isNull(0)) this.labelIncompleteNode(n, 0);else this.labelIncompleteNode(n, 1);
        n.getEdges().updateLabelling(label);
      }
    }

    isCoveredByA(coord) {
      if (this.isCovered(coord, this._resultPolyList)) return true;
      return false;
    }

  }
  OverlayOp.INTERSECTION = 1;
  OverlayOp.UNION = 2;
  OverlayOp.DIFFERENCE = 3;
  OverlayOp.SYMDIFFERENCE = 4;

  var overlay = /*#__PURE__*/Object.freeze({
    __proto__: null,
    snap: snap,
    OverlayOp: OverlayOp
  });

  class PolygonizeDirectedEdge extends DirectedEdge {
    constructor() {
      super();
      PolygonizeDirectedEdge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._edgeRing = null;
      this._next = null;
      this._label = -1;
      const from = arguments[0],
            to = arguments[1],
            directionPt = arguments[2],
            edgeDirection = arguments[3];
      DirectedEdge.constructor_.call(this, from, to, directionPt, edgeDirection);
    }

    getNext() {
      return this._next;
    }

    isInRing() {
      return this._edgeRing !== null;
    }

    setRing(edgeRing) {
      this._edgeRing = edgeRing;
    }

    setLabel(label) {
      this._label = label;
    }

    getLabel() {
      return this._label;
    }

    setNext(next) {
      this._next = next;
    }

    getRing() {
      return this._edgeRing;
    }

  }

  class PolygonizeEdge extends Edge {
    constructor() {
      super();
      PolygonizeEdge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._line = null;
      const line = arguments[0];
      this._line = line;
    }

    getLine() {
      return this._line;
    }

  }

  class ConnectedInteriorTester {
    constructor() {
      ConnectedInteriorTester.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geometryFactory = new GeometryFactory();
      this._geomGraph = null;
      this._disconnectedRingcoord = null;
      const geomGraph = arguments[0];
      this._geomGraph = geomGraph;
    }

    static findDifferentPoint(coord, pt) {
      for (let i = 0; i < coord.length; i++) if (!coord[i].equals(pt)) return coord[i];

      return null;
    }

    visitInteriorRing(ring, graph) {
      if (ring.isEmpty()) return null;
      const pts = ring.getCoordinates();
      const pt0 = pts[0];
      const pt1 = ConnectedInteriorTester.findDifferentPoint(pts, pt0);
      const e = graph.findEdgeInSameDirection(pt0, pt1);
      const de = graph.findEdgeEnd(e);
      let intDe = null;
      if (de.getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) intDe = de;else if (de.getSym().getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) intDe = de.getSym();
      Assert.isTrue(intDe !== null, 'unable to find dirEdge with Interior on RHS');
      this.visitLinkedDirectedEdges(intDe);
    }

    visitShellInteriors(g, graph) {
      if (g instanceof Polygon) {
        const p = g;
        this.visitInteriorRing(p.getExteriorRing(), graph);
      }

      if (g instanceof MultiPolygon) {
        const mp = g;

        for (let i = 0; i < mp.getNumGeometries(); i++) {
          const p = mp.getGeometryN(i);
          this.visitInteriorRing(p.getExteriorRing(), graph);
        }
      }
    }

    getCoordinate() {
      return this._disconnectedRingcoord;
    }

    setInteriorEdgesInResult(graph) {
      for (let it = graph.getEdgeEnds().iterator(); it.hasNext();) {
        const de = it.next();
        if (de.getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) de.setInResult(true);
      }
    }

    visitLinkedDirectedEdges(start) {
      const startDe = start;
      let de = start;

      do {
        Assert.isTrue(de !== null, 'found null Directed Edge');
        de.setVisited(true);
        de = de.getNext();
      } while (de !== startDe);
    }

    buildEdgeRings(dirEdges) {
      const edgeRings = new ArrayList();

      for (let it = dirEdges.iterator(); it.hasNext();) {
        const de = it.next();

        if (de.isInResult() && de.getEdgeRing() === null) {
          const er = new MaximalEdgeRing(de, this._geometryFactory);
          er.linkDirectedEdgesForMinimalEdgeRings();
          const minEdgeRings = er.buildMinimalRings();
          edgeRings.addAll(minEdgeRings);
        }
      }

      return edgeRings;
    }

    hasUnvisitedShellEdge(edgeRings) {
      for (let i = 0; i < edgeRings.size(); i++) {
        const er = edgeRings.get(i);
        if (er.isHole()) continue;
        const edges = er.getEdges();
        let de = edges.get(0);
        if (de.getLabel().getLocation(0, Position.RIGHT) !== Location.INTERIOR) continue;

        for (let j = 0; j < edges.size(); j++) {
          de = edges.get(j);

          if (!de.isVisited()) {
            this._disconnectedRingcoord = de.getCoordinate();
            return true;
          }
        }
      }

      return false;
    }

    isInteriorsConnected() {
      const splitEdges = new ArrayList();

      this._geomGraph.computeSplitEdges(splitEdges);

      const graph = new PlanarGraph$1(new OverlayNodeFactory());
      graph.addEdges(splitEdges);
      this.setInteriorEdgesInResult(graph);
      graph.linkResultDirectedEdges();
      const edgeRings = this.buildEdgeRings(graph.getEdgeEnds());
      this.visitShellInteriors(this._geomGraph.getGeometry(), graph);
      return !this.hasUnvisitedShellEdge(edgeRings);
    }

  }

  class EdgeEndBuilder {
    createEdgeEndForNext(edge, l, eiCurr, eiNext) {
      const iNext = eiCurr.segmentIndex + 1;
      if (iNext >= edge.getNumPoints() && eiNext === null) return null;
      let pNext = edge.getCoordinate(iNext);
      if (eiNext !== null && eiNext.segmentIndex === eiCurr.segmentIndex) pNext = eiNext.coord;
      const e = new EdgeEnd(edge, eiCurr.coord, pNext, new Label(edge.getLabel()));
      l.add(e);
    }

    createEdgeEndForPrev(edge, l, eiCurr, eiPrev) {
      let iPrev = eiCurr.segmentIndex;

      if (eiCurr.dist === 0.0) {
        if (iPrev === 0) return null;
        iPrev--;
      }

      let pPrev = edge.getCoordinate(iPrev);
      if (eiPrev !== null && eiPrev.segmentIndex >= iPrev) pPrev = eiPrev.coord;
      const label = new Label(edge.getLabel());
      label.flip();
      const e = new EdgeEnd(edge, eiCurr.coord, pPrev, label);
      l.add(e);
    }

    computeEdgeEnds() {
      if (arguments.length === 1) {
        const edges = arguments[0];
        const l = new ArrayList();

        for (let i = edges; i.hasNext();) {
          const e = i.next();
          this.computeEdgeEnds(e, l);
        }

        return l;
      } else if (arguments.length === 2) {
        const edge = arguments[0],
              l = arguments[1];
        const eiList = edge.getEdgeIntersectionList();
        eiList.addEndpoints();
        const it = eiList.iterator();
        let eiPrev = null;
        let eiCurr = null;
        if (!it.hasNext()) return null;
        let eiNext = it.next();

        do {
          eiPrev = eiCurr;
          eiCurr = eiNext;
          eiNext = null;
          if (it.hasNext()) eiNext = it.next();

          if (eiCurr !== null) {
            this.createEdgeEndForPrev(edge, l, eiCurr, eiPrev);
            this.createEdgeEndForNext(edge, l, eiCurr, eiNext);
          }
        } while (eiCurr !== null);
      }
    }

  }

  class EdgeEndBundle extends EdgeEnd {
    constructor() {
      super();
      EdgeEndBundle.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._edgeEnds = new ArrayList();

      if (arguments.length === 1) {
        const e = arguments[0];
        EdgeEndBundle.constructor_.call(this, null, e);
      } else if (arguments.length === 2) {
        const e = arguments[1];
        EdgeEnd.constructor_.call(this, e.getEdge(), e.getCoordinate(), e.getDirectedCoordinate(), new Label(e.getLabel()));
        this.insert(e);
      }
    }

    insert(e) {
      this._edgeEnds.add(e);
    }

    print(out) {
      out.println('EdgeEndBundle--> Label: ' + this._label);

      for (let it = this.iterator(); it.hasNext();) {
        const ee = it.next();
        ee.print(out);
        out.println();
      }
    }

    iterator() {
      return this._edgeEnds.iterator();
    }

    getEdgeEnds() {
      return this._edgeEnds;
    }

    computeLabelOn(geomIndex, boundaryNodeRule) {
      let boundaryCount = 0;
      let foundInterior = false;

      for (let it = this.iterator(); it.hasNext();) {
        const e = it.next();
        const loc = e.getLabel().getLocation(geomIndex);
        if (loc === Location.BOUNDARY) boundaryCount++;
        if (loc === Location.INTERIOR) foundInterior = true;
      }

      let loc = Location.NONE;
      if (foundInterior) loc = Location.INTERIOR;
      if (boundaryCount > 0) loc = GeometryGraph.determineBoundary(boundaryNodeRule, boundaryCount);

      this._label.setLocation(geomIndex, loc);
    }

    computeLabelSide(geomIndex, side) {
      for (let it = this.iterator(); it.hasNext();) {
        const e = it.next();

        if (e.getLabel().isArea()) {
          const loc = e.getLabel().getLocation(geomIndex, side);

          if (loc === Location.INTERIOR) {
            this._label.setLocation(geomIndex, side, Location.INTERIOR);

            return null;
          } else if (loc === Location.EXTERIOR) {
            this._label.setLocation(geomIndex, side, Location.EXTERIOR);
          }
        }
      }
    }

    getLabel() {
      return this._label;
    }

    computeLabelSides(geomIndex) {
      this.computeLabelSide(geomIndex, Position.LEFT);
      this.computeLabelSide(geomIndex, Position.RIGHT);
    }

    updateIM(im) {
      Edge$1.updateIM(this._label, im);
    }

    computeLabel(boundaryNodeRule) {
      let isArea = false;

      for (let it = this.iterator(); it.hasNext();) {
        const e = it.next();
        if (e.getLabel().isArea()) isArea = true;
      }

      if (isArea) this._label = new Label(Location.NONE, Location.NONE, Location.NONE);else this._label = new Label(Location.NONE);

      for (let i = 0; i < 2; i++) {
        this.computeLabelOn(i, boundaryNodeRule);
        if (isArea) this.computeLabelSides(i);
      }
    }

  }

  class EdgeEndBundleStar extends EdgeEndStar {
    constructor() {
      super();
    }

    updateIM(im) {
      for (let it = this.iterator(); it.hasNext();) {
        const esb = it.next();
        esb.updateIM(im);
      }
    }

    insert(e) {
      let eb = this._edgeMap.get(e);

      if (eb === null) {
        eb = new EdgeEndBundle(e);
        this.insertEdgeEnd(e, eb);
      } else {
        eb.insert(e);
      }
    }

  }

  class RelateNode extends Node$2 {
    constructor() {
      super();
      RelateNode.constructor_.apply(this, arguments);
    }

    static constructor_() {
      const coord = arguments[0],
            edges = arguments[1];
      Node$2.constructor_.call(this, coord, edges);
    }

    updateIMFromEdges(im) {
      this._edges.updateIM(im);
    }

    computeIM(im) {
      im.setAtLeastIfValid(this._label.getLocation(0), this._label.getLocation(1), 0);
    }

  }

  class RelateNodeFactory extends NodeFactory {
    constructor() {
      super();
    }

    createNode(coord) {
      return new RelateNode(coord, new EdgeEndBundleStar());
    }

  }

  class RelateNodeGraph {
    constructor() {
      RelateNodeGraph.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._nodes = new NodeMap$1(new RelateNodeFactory());
    }

    insertEdgeEnds(ee) {
      for (let i = ee.iterator(); i.hasNext();) {
        const e = i.next();

        this._nodes.add(e);
      }
    }

    getNodeIterator() {
      return this._nodes.iterator();
    }

    copyNodesAndLabels(geomGraph, argIndex) {
      for (let nodeIt = geomGraph.getNodeIterator(); nodeIt.hasNext();) {
        const graphNode = nodeIt.next();

        const newNode = this._nodes.addNode(graphNode.getCoordinate());

        newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
      }
    }

    build(geomGraph) {
      this.computeIntersectionNodes(geomGraph, 0);
      this.copyNodesAndLabels(geomGraph, 0);
      const eeBuilder = new EdgeEndBuilder();
      const eeList = eeBuilder.computeEdgeEnds(geomGraph.getEdgeIterator());
      this.insertEdgeEnds(eeList);
    }

    computeIntersectionNodes(geomGraph, argIndex) {
      for (let edgeIt = geomGraph.getEdgeIterator(); edgeIt.hasNext();) {
        const e = edgeIt.next();
        const eLoc = e.getLabel().getLocation(argIndex);

        for (let eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext();) {
          const ei = eiIt.next();

          const n = this._nodes.addNode(ei.coord);

          if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex);else if (n.getLabel().isNull(argIndex)) n.setLabel(argIndex, Location.INTERIOR);
        }
      }
    }

  }

  class ConsistentAreaTester {
    constructor() {
      ConsistentAreaTester.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._li = new RobustLineIntersector();
      this._geomGraph = null;
      this._nodeGraph = new RelateNodeGraph();
      this._invalidPoint = null;
      const geomGraph = arguments[0];
      this._geomGraph = geomGraph;
    }

    isNodeEdgeAreaLabelsConsistent() {
      for (let nodeIt = this._nodeGraph.getNodeIterator(); nodeIt.hasNext();) {
        const node = nodeIt.next();

        if (!node.getEdges().isAreaLabelsConsistent(this._geomGraph)) {
          this._invalidPoint = node.getCoordinate().copy();
          return false;
        }
      }

      return true;
    }

    getInvalidPoint() {
      return this._invalidPoint;
    }

    hasDuplicateRings() {
      for (let nodeIt = this._nodeGraph.getNodeIterator(); nodeIt.hasNext();) {
        const node = nodeIt.next();

        for (let i = node.getEdges().iterator(); i.hasNext();) {
          const eeb = i.next();

          if (eeb.getEdgeEnds().size() > 1) {
            this._invalidPoint = eeb.getEdge().getCoordinate(0);
            return true;
          }
        }
      }

      return false;
    }

    isNodeConsistentArea() {
      const intersector = this._geomGraph.computeSelfNodes(this._li, true, true);

      if (intersector.hasProperIntersection()) {
        this._invalidPoint = intersector.getProperIntersectionPoint();
        return false;
      }

      this._nodeGraph.build(this._geomGraph);

      return this.isNodeEdgeAreaLabelsConsistent();
    }

  }

  class IndexedNestedRingTester {
    constructor() {
      IndexedNestedRingTester.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._graph = null;
      this._rings = new ArrayList();
      this._totalEnv = new Envelope();
      this._index = null;
      this._nestedPt = null;
      const graph = arguments[0];
      this._graph = graph;
    }

    buildIndex() {
      this._index = new STRtree();

      for (let i = 0; i < this._rings.size(); i++) {
        const ring = this._rings.get(i);

        const env = ring.getEnvelopeInternal();

        this._index.insert(env, ring);
      }
    }

    getNestedPoint() {
      return this._nestedPt;
    }

    isNonNested() {
      this.buildIndex();

      for (let i = 0; i < this._rings.size(); i++) {
        const innerRing = this._rings.get(i);

        const innerRingPts = innerRing.getCoordinates();

        const results = this._index.query(innerRing.getEnvelopeInternal());

        for (let j = 0; j < results.size(); j++) {
          const searchRing = results.get(j);
          const searchRingPts = searchRing.getCoordinates();
          if (innerRing === searchRing) continue;
          if (!innerRing.getEnvelopeInternal().intersects(searchRing.getEnvelopeInternal())) continue;
          const innerRingPt = IsValidOp.findPtNotNode(innerRingPts, searchRing, this._graph);
          if (innerRingPt === null) continue;
          const isInside = PointLocation.isInRing(innerRingPt, searchRingPts);

          if (isInside) {
            this._nestedPt = innerRingPt;
            return false;
          }
        }
      }

      return true;
    }

    add(ring) {
      this._rings.add(ring);

      this._totalEnv.expandToInclude(ring.getEnvelopeInternal());
    }

  }

  class TopologyValidationError {
    constructor() {
      TopologyValidationError.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._errorType = null;
      this._pt = null;

      if (arguments.length === 1) {
        const errorType = arguments[0];
        TopologyValidationError.constructor_.call(this, errorType, null);
      } else if (arguments.length === 2) {
        const errorType = arguments[0],
              pt = arguments[1];
        this._errorType = errorType;
        if (pt !== null) this._pt = pt.copy();
      }
    }

    getErrorType() {
      return this._errorType;
    }

    getMessage() {
      return TopologyValidationError.errMsg[this._errorType];
    }

    getCoordinate() {
      return this._pt;
    }

    toString() {
      let locStr = '';
      if (this._pt !== null) locStr = ' at or near point ' + this._pt;
      return this.getMessage() + locStr;
    }

  }
  TopologyValidationError.ERROR = 0;
  TopologyValidationError.REPEATED_POINT = 1;
  TopologyValidationError.HOLE_OUTSIDE_SHELL = 2;
  TopologyValidationError.NESTED_HOLES = 3;
  TopologyValidationError.DISCONNECTED_INTERIOR = 4;
  TopologyValidationError.SELF_INTERSECTION = 5;
  TopologyValidationError.RING_SELF_INTERSECTION = 6;
  TopologyValidationError.NESTED_SHELLS = 7;
  TopologyValidationError.DUPLICATE_RINGS = 8;
  TopologyValidationError.TOO_FEW_POINTS = 9;
  TopologyValidationError.INVALID_COORDINATE = 10;
  TopologyValidationError.RING_NOT_CLOSED = 11;
  TopologyValidationError.errMsg = ['Topology Validation Error', 'Repeated Point', 'Hole lies outside shell', 'Holes are nested', 'Interior is disconnected', 'Self-intersection', 'Ring Self-intersection', 'Nested shells', 'Duplicate Rings', 'Too few distinct points in geometry component', 'Invalid Coordinate', 'Ring is not closed'];

  class IsValidOp {
    constructor() {
      IsValidOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._parentGeometry = null;
      this._isSelfTouchingRingFormingHoleValid = false;
      this._validErr = null;
      const parentGeometry = arguments[0];
      this._parentGeometry = parentGeometry;
    }

    static findPtNotNode(testCoords, searchRing, graph) {
      const searchEdge = graph.findEdge(searchRing);
      const eiList = searchEdge.getEdgeIntersectionList();

      for (let i = 0; i < testCoords.length; i++) {
        const pt = testCoords[i];
        if (!eiList.isIntersection(pt)) return pt;
      }

      return null;
    }

    static isValid() {
      if (arguments[0] instanceof Geometry) {
        const geom = arguments[0];
        const isValidOp = new IsValidOp(geom);
        return isValidOp.isValid();
      } else if (arguments[0] instanceof Coordinate) {
        const coord = arguments[0];
        if (Double.isNaN(coord.x)) return false;
        if (Double.isInfinite(coord.x)) return false;
        if (Double.isNaN(coord.y)) return false;
        if (Double.isInfinite(coord.y)) return false;
        return true;
      }
    }

    checkInvalidCoordinates() {
      if (arguments[0] instanceof Array) {
        const coords = arguments[0];

        for (let i = 0; i < coords.length; i++) if (!IsValidOp.isValid(coords[i])) {
          this._validErr = new TopologyValidationError(TopologyValidationError.INVALID_COORDINATE, coords[i]);
          return null;
        }
      } else if (arguments[0] instanceof Polygon) {
        const poly = arguments[0];
        this.checkInvalidCoordinates(poly.getExteriorRing().getCoordinates());
        if (this._validErr !== null) return null;

        for (let i = 0; i < poly.getNumInteriorRing(); i++) {
          this.checkInvalidCoordinates(poly.getInteriorRingN(i).getCoordinates());
          if (this._validErr !== null) return null;
        }
      }
    }

    checkHolesNotNested(p, graph) {
      if (p.getNumInteriorRing() <= 0) return null;
      const nestedTester = new IndexedNestedRingTester(graph);

      for (let i = 0; i < p.getNumInteriorRing(); i++) {
        const innerHole = p.getInteriorRingN(i);
        if (innerHole.isEmpty()) continue;
        nestedTester.add(innerHole);
      }

      const isNonNested = nestedTester.isNonNested();
      if (!isNonNested) this._validErr = new TopologyValidationError(TopologyValidationError.NESTED_HOLES, nestedTester.getNestedPoint());
    }

    checkConsistentArea(graph) {
      const cat = new ConsistentAreaTester(graph);
      const isValidArea = cat.isNodeConsistentArea();

      if (!isValidArea) {
        this._validErr = new TopologyValidationError(TopologyValidationError.SELF_INTERSECTION, cat.getInvalidPoint());
        return null;
      }

      if (cat.hasDuplicateRings()) this._validErr = new TopologyValidationError(TopologyValidationError.DUPLICATE_RINGS, cat.getInvalidPoint());
    }

    isValid() {
      this.checkValid(this._parentGeometry);
      return this._validErr === null;
    }

    checkShellInsideHole(shell, hole, graph) {
      const shellPts = shell.getCoordinates();
      const holePts = hole.getCoordinates();
      const shellPt = IsValidOp.findPtNotNode(shellPts, hole, graph);

      if (shellPt !== null) {
        const insideHole = PointLocation.isInRing(shellPt, holePts);
        if (!insideHole) return shellPt;
      }

      const holePt = IsValidOp.findPtNotNode(holePts, shell, graph);

      if (holePt !== null) {
        const insideShell = PointLocation.isInRing(holePt, shellPts);
        if (insideShell) return holePt;
        return null;
      }

      Assert.shouldNeverReachHere('points in shell and hole appear to be equal');
      return null;
    }

    checkNoSelfIntersectingRings(graph) {
      for (let i = graph.getEdgeIterator(); i.hasNext();) {
        const e = i.next();
        this.checkNoSelfIntersectingRing(e.getEdgeIntersectionList());
        if (this._validErr !== null) return null;
      }
    }

    checkConnectedInteriors(graph) {
      const cit = new ConnectedInteriorTester(graph);
      if (!cit.isInteriorsConnected()) this._validErr = new TopologyValidationError(TopologyValidationError.DISCONNECTED_INTERIOR, cit.getCoordinate());
    }

    checkNoSelfIntersectingRing(eiList) {
      const nodeSet = new TreeSet();
      let isFirst = true;

      for (let i = eiList.iterator(); i.hasNext();) {
        const ei = i.next();

        if (isFirst) {
          isFirst = false;
          continue;
        }

        if (nodeSet.contains(ei.coord)) {
          this._validErr = new TopologyValidationError(TopologyValidationError.RING_SELF_INTERSECTION, ei.coord);
          return null;
        } else {
          nodeSet.add(ei.coord);
        }
      }
    }

    checkHolesInShell(p, graph) {
      if (p.getNumInteriorRing() <= 0) return null;
      const shell = p.getExteriorRing();
      const isShellEmpty = shell.isEmpty();
      const pir = new IndexedPointInAreaLocator(shell);

      for (let i = 0; i < p.getNumInteriorRing(); i++) {
        const hole = p.getInteriorRingN(i);
        let holePt = null;
        if (hole.isEmpty()) continue;
        holePt = IsValidOp.findPtNotNode(hole.getCoordinates(), shell, graph);
        if (holePt === null) return null;
        const outside = isShellEmpty || Location.EXTERIOR === pir.locate(holePt);

        if (outside) {
          this._validErr = new TopologyValidationError(TopologyValidationError.HOLE_OUTSIDE_SHELL, holePt);
          return null;
        }
      }
    }

    checkTooFewPoints(graph) {
      if (graph.hasTooFewPoints()) {
        this._validErr = new TopologyValidationError(TopologyValidationError.TOO_FEW_POINTS, graph.getInvalidPoint());
        return null;
      }
    }

    getValidationError() {
      this.checkValid(this._parentGeometry);
      return this._validErr;
    }

    checkValid() {
      if (arguments[0] instanceof Point) {
        const g = arguments[0];
        this.checkInvalidCoordinates(g.getCoordinates());
      } else if (arguments[0] instanceof MultiPoint) {
        const g = arguments[0];
        this.checkInvalidCoordinates(g.getCoordinates());
      } else if (arguments[0] instanceof LinearRing) {
        const g = arguments[0];
        this.checkInvalidCoordinates(g.getCoordinates());
        if (this._validErr !== null) return null;
        this.checkClosedRing(g);
        if (this._validErr !== null) return null;
        const graph = new GeometryGraph(0, g);
        this.checkTooFewPoints(graph);
        if (this._validErr !== null) return null;
        const li = new RobustLineIntersector();
        graph.computeSelfNodes(li, true, true);
        this.checkNoSelfIntersectingRings(graph);
      } else if (arguments[0] instanceof LineString) {
        const g = arguments[0];
        this.checkInvalidCoordinates(g.getCoordinates());
        if (this._validErr !== null) return null;
        const graph = new GeometryGraph(0, g);
        this.checkTooFewPoints(graph);
      } else if (arguments[0] instanceof Polygon) {
        const g = arguments[0];
        this.checkInvalidCoordinates(g);
        if (this._validErr !== null) return null;
        this.checkClosedRings(g);
        if (this._validErr !== null) return null;
        const graph = new GeometryGraph(0, g);
        this.checkTooFewPoints(graph);
        if (this._validErr !== null) return null;
        this.checkConsistentArea(graph);
        if (this._validErr !== null) return null;

        if (!this._isSelfTouchingRingFormingHoleValid) {
          this.checkNoSelfIntersectingRings(graph);
          if (this._validErr !== null) return null;
        }

        this.checkHolesInShell(g, graph);
        if (this._validErr !== null) return null;
        this.checkHolesNotNested(g, graph);
        if (this._validErr !== null) return null;
        this.checkConnectedInteriors(graph);
      } else if (arguments[0] instanceof MultiPolygon) {
        const g = arguments[0];

        for (let i = 0; i < g.getNumGeometries(); i++) {
          const p = g.getGeometryN(i);
          this.checkInvalidCoordinates(p);
          if (this._validErr !== null) return null;
          this.checkClosedRings(p);
          if (this._validErr !== null) return null;
        }

        const graph = new GeometryGraph(0, g);
        this.checkTooFewPoints(graph);
        if (this._validErr !== null) return null;
        this.checkConsistentArea(graph);
        if (this._validErr !== null) return null;

        if (!this._isSelfTouchingRingFormingHoleValid) {
          this.checkNoSelfIntersectingRings(graph);
          if (this._validErr !== null) return null;
        }

        for (let i = 0; i < g.getNumGeometries(); i++) {
          const p = g.getGeometryN(i);
          this.checkHolesInShell(p, graph);
          if (this._validErr !== null) return null;
        }

        for (let i = 0; i < g.getNumGeometries(); i++) {
          const p = g.getGeometryN(i);
          this.checkHolesNotNested(p, graph);
          if (this._validErr !== null) return null;
        }

        this.checkShellsNotNested(g, graph);
        if (this._validErr !== null) return null;
        this.checkConnectedInteriors(graph);
      } else if (arguments[0] instanceof GeometryCollection) {
        const gc = arguments[0];

        for (let i = 0; i < gc.getNumGeometries(); i++) {
          const g = gc.getGeometryN(i);
          this.checkValid(g);
          if (this._validErr !== null) return null;
        }
      } else if (arguments[0] instanceof Geometry) {
        const g = arguments[0];
        this._validErr = null;
        if (g.isEmpty()) return null;
        if (g instanceof Point) this.checkValid(g);else if (g instanceof MultiPoint) this.checkValid(g);else if (g instanceof LinearRing) this.checkValid(g);else if (g instanceof LineString) this.checkValid(g);else if (g instanceof Polygon) this.checkValid(g);else if (g instanceof MultiPolygon) this.checkValid(g);else if (g instanceof GeometryCollection) this.checkValid(g);else throw new UnsupportedOperationException(g.getGeometryType());
      }
    }

    setSelfTouchingRingFormingHoleValid(isValid) {
      this._isSelfTouchingRingFormingHoleValid = isValid;
    }

    checkShellNotNested(shell, p, graph) {
      const shellPts = shell.getCoordinates();
      const polyShell = p.getExteriorRing();
      if (polyShell.isEmpty()) return null;
      const polyPts = polyShell.getCoordinates();
      const shellPt = IsValidOp.findPtNotNode(shellPts, polyShell, graph);
      if (shellPt === null) return null;
      const insidePolyShell = PointLocation.isInRing(shellPt, polyPts);
      if (!insidePolyShell) return null;

      if (p.getNumInteriorRing() <= 0) {
        this._validErr = new TopologyValidationError(TopologyValidationError.NESTED_SHELLS, shellPt);
        return null;
      }

      let badNestedPt = null;

      for (let i = 0; i < p.getNumInteriorRing(); i++) {
        const hole = p.getInteriorRingN(i);
        badNestedPt = this.checkShellInsideHole(shell, hole, graph);
        if (badNestedPt === null) return null;
      }

      this._validErr = new TopologyValidationError(TopologyValidationError.NESTED_SHELLS, badNestedPt);
    }

    checkClosedRings(poly) {
      this.checkClosedRing(poly.getExteriorRing());
      if (this._validErr !== null) return null;

      for (let i = 0; i < poly.getNumInteriorRing(); i++) {
        this.checkClosedRing(poly.getInteriorRingN(i));
        if (this._validErr !== null) return null;
      }
    }

    checkClosedRing(ring) {
      if (ring.isEmpty()) return null;

      if (!ring.isClosed()) {
        let pt = null;
        if (ring.getNumPoints() >= 1) pt = ring.getCoordinateN(0);
        this._validErr = new TopologyValidationError(TopologyValidationError.RING_NOT_CLOSED, pt);
      }
    }

    checkShellsNotNested(mp, graph) {
      for (let i = 0; i < mp.getNumGeometries(); i++) {
        const p = mp.getGeometryN(i);
        const shell = p.getExteriorRing();

        for (let j = 0; j < mp.getNumGeometries(); j++) {
          if (i === j) continue;
          const p2 = mp.getGeometryN(j);
          this.checkShellNotNested(shell, p2, graph);
          if (this._validErr !== null) return null;
        }
      }
    }

  }

  class EdgeRing {
    constructor() {
      EdgeRing.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._factory = null;
      this._deList = new ArrayList();
      this._lowestEdge = null;
      this._ring = null;
      this._locator = null;
      this._ringPts = null;
      this._holes = null;
      this._shell = null;
      this._isHole = null;
      this._isProcessed = false;
      this._isIncludedSet = false;
      this._isIncluded = false;
      const factory = arguments[0];
      this._factory = factory;
    }

    static findDirEdgesInRing(startDE) {
      let de = startDE;
      const edges = new ArrayList();

      do {
        edges.add(de);
        de = de.getNext();
        Assert.isTrue(de !== null, 'found null DE in ring');
        Assert.isTrue(de === startDE || !de.isInRing(), 'found DE already in ring');
      } while (de !== startDE);

      return edges;
    }

    static addEdge(coords, isForward, coordList) {
      if (isForward) for (let i = 0; i < coords.length; i++) coordList.add(coords[i], false);else for (let i = coords.length - 1; i >= 0; i--) coordList.add(coords[i], false);
    }

    static findEdgeRingContaining(testEr, erList) {
      const testRing = testEr.getRing();
      const testEnv = testRing.getEnvelopeInternal();
      let testPt = testRing.getCoordinateN(0);
      let minRing = null;
      let minRingEnv = null;

      for (let it = erList.iterator(); it.hasNext();) {
        const tryEdgeRing = it.next();
        const tryRing = tryEdgeRing.getRing();
        const tryShellEnv = tryRing.getEnvelopeInternal();
        if (tryShellEnv.equals(testEnv)) continue;
        if (!tryShellEnv.contains(testEnv)) continue;
        testPt = CoordinateArrays.ptNotInList(testRing.getCoordinates(), tryEdgeRing.getCoordinates());
        const isContained = tryEdgeRing.isInRing(testPt);
        if (isContained) if (minRing === null || minRingEnv.contains(tryShellEnv)) {
          minRing = tryEdgeRing;
          minRingEnv = minRing.getRing().getEnvelopeInternal();
        }
      }

      return minRing;
    }

    isIncluded() {
      return this._isIncluded;
    }

    getCoordinates() {
      if (this._ringPts === null) {
        const coordList = new CoordinateList();

        for (let i = this._deList.iterator(); i.hasNext();) {
          const de = i.next();
          const edge = de.getEdge();
          EdgeRing.addEdge(edge.getLine().getCoordinates(), de.getEdgeDirection(), coordList);
        }

        this._ringPts = coordList.toCoordinateArray();
      }

      return this._ringPts;
    }

    isIncludedSet() {
      return this._isIncludedSet;
    }

    isValid() {
      this.getCoordinates();
      if (this._ringPts.length <= 3) return false;
      this.getRing();
      return IsValidOp.isValid(this._ring);
    }

    build(startDE) {
      let de = startDE;

      do {
        this.add(de);
        de.setRing(this);
        de = de.getNext();
        Assert.isTrue(de !== null, 'found null DE in ring');
        Assert.isTrue(de === startDE || !de.isInRing(), 'found DE already in ring');
      } while (de !== startDE);
    }

    isInRing(pt) {
      return Location.EXTERIOR !== this.getLocator().locate(pt);
    }

    isOuterHole() {
      if (!this._isHole) return false;
      return !this.hasShell();
    }

    getPolygon() {
      let holeLR = null;

      if (this._holes !== null) {
        holeLR = new Array(this._holes.size()).fill(null);

        for (let i = 0; i < this._holes.size(); i++) holeLR[i] = this._holes.get(i);
      }

      const poly = this._factory.createPolygon(this._ring, holeLR);

      return poly;
    }

    isHole() {
      return this._isHole;
    }

    isProcessed() {
      return this._isProcessed;
    }

    addHole() {
      if (arguments[0] instanceof LinearRing) {
        const hole = arguments[0];
        if (this._holes === null) this._holes = new ArrayList();

        this._holes.add(hole);
      } else if (arguments[0] instanceof EdgeRing) {
        const holeER = arguments[0];
        holeER.setShell(this);
        const hole = holeER.getRing();
        if (this._holes === null) this._holes = new ArrayList();

        this._holes.add(hole);
      }
    }

    setIncluded(isIncluded) {
      this._isIncluded = isIncluded;
      this._isIncludedSet = true;
    }

    getOuterHole() {
      if (this.isHole()) return null;

      for (let i = 0; i < this._deList.size(); i++) {
        const de = this._deList.get(i);

        const adjRing = de.getSym().getRing();
        if (adjRing.isOuterHole()) return adjRing;
      }

      return null;
    }

    computeHole() {
      const ring = this.getRing();
      this._isHole = Orientation.isCCW(ring.getCoordinates());
    }

    hasShell() {
      return this._shell !== null;
    }

    isOuterShell() {
      return this.getOuterHole() !== null;
    }

    getLineString() {
      this.getCoordinates();
      return this._factory.createLineString(this._ringPts);
    }

    toString() {
      return WKTWriter.toLineString(new CoordinateArraySequence(this.getCoordinates()));
    }

    getLocator() {
      if (this._locator === null) this._locator = new IndexedPointInAreaLocator(this.getRing());
      return this._locator;
    }

    getShell() {
      if (this.isHole()) return this._shell;
      return this;
    }

    add(de) {
      this._deList.add(de);
    }

    getRing() {
      if (this._ring !== null) return this._ring;
      this.getCoordinates();
      if (this._ringPts.length < 3) System.out.println(this._ringPts);

      try {
        this._ring = this._factory.createLinearRing(this._ringPts);
      } catch (ex) {
        if (ex instanceof Exception) System.out.println(this._ringPts);else throw ex;
      } finally {}

      return this._ring;
    }

    updateIncluded() {
      if (this.isHole()) return null;

      for (let i = 0; i < this._deList.size(); i++) {
        const de = this._deList.get(i);

        const adjShell = de.getSym().getRing().getShell();

        if (adjShell !== null && adjShell.isIncludedSet()) {
          this.setIncluded(!adjShell.isIncluded());
          return null;
        }
      }
    }

    setShell(shell) {
      this._shell = shell;
    }

    setProcessed(isProcessed) {
      this._isProcessed = isProcessed;
    }

  }

  class EnvelopeComparator {
    compare(obj0, obj1) {
      const r0 = obj0;
      const r1 = obj1;
      return r0.getRing().getEnvelope().compareTo(r1.getRing().getEnvelope());
    }

    get interfaces_() {
      return [Comparator];
    }

  }

  EdgeRing.EnvelopeComparator = EnvelopeComparator;

  class PolygonizeGraph extends PlanarGraph {
    constructor() {
      super();
      PolygonizeGraph.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._factory = null;
      const factory = arguments[0];
      this._factory = factory;
    }

    static findLabeledEdgeRings(dirEdges) {
      const edgeRingStarts = new ArrayList();
      let currLabel = 1;

      for (let i = dirEdges.iterator(); i.hasNext();) {
        const de = i.next();
        if (de.isMarked()) continue;
        if (de.getLabel() >= 0) continue;
        edgeRingStarts.add(de);
        const edges = EdgeRing.findDirEdgesInRing(de);
        PolygonizeGraph.label(edges, currLabel);
        currLabel++;
      }

      return edgeRingStarts;
    }

    static getDegreeNonDeleted(node) {
      const edges = node.getOutEdges().getEdges();
      let degree = 0;

      for (let i = edges.iterator(); i.hasNext();) {
        const de = i.next();
        if (!de.isMarked()) degree++;
      }

      return degree;
    }

    static deleteAllEdges(node) {
      const edges = node.getOutEdges().getEdges();

      for (let i = edges.iterator(); i.hasNext();) {
        const de = i.next();
        de.setMarked(true);
        const sym = de.getSym();
        if (sym !== null) sym.setMarked(true);
      }
    }

    static label(dirEdges, label) {
      for (let i = dirEdges.iterator(); i.hasNext();) {
        const de = i.next();
        de.setLabel(label);
      }
    }

    static computeNextCWEdges(node) {
      const deStar = node.getOutEdges();
      let startDE = null;
      let prevDE = null;

      for (let i = deStar.getEdges().iterator(); i.hasNext();) {
        const outDE = i.next();
        if (outDE.isMarked()) continue;
        if (startDE === null) startDE = outDE;

        if (prevDE !== null) {
          const sym = prevDE.getSym();
          sym.setNext(outDE);
        }

        prevDE = outDE;
      }

      if (prevDE !== null) {
        const sym = prevDE.getSym();
        sym.setNext(startDE);
      }
    }

    static computeNextCCWEdges(node, label) {
      const deStar = node.getOutEdges();
      let firstOutDE = null;
      let prevInDE = null;
      const edges = deStar.getEdges();

      for (let i = edges.size() - 1; i >= 0; i--) {
        const de = edges.get(i);
        const sym = de.getSym();
        let outDE = null;
        if (de.getLabel() === label) outDE = de;
        let inDE = null;
        if (sym.getLabel() === label) inDE = sym;
        if (outDE === null && inDE === null) continue;
        if (inDE !== null) prevInDE = inDE;

        if (outDE !== null) {
          if (prevInDE !== null) {
            prevInDE.setNext(outDE);
            prevInDE = null;
          }

          if (firstOutDE === null) firstOutDE = outDE;
        }
      }

      if (prevInDE !== null) {
        Assert.isTrue(firstOutDE !== null);
        prevInDE.setNext(firstOutDE);
      }
    }

    static getDegree(node, label) {
      const edges = node.getOutEdges().getEdges();
      let degree = 0;

      for (let i = edges.iterator(); i.hasNext();) {
        const de = i.next();
        if (de.getLabel() === label) degree++;
      }

      return degree;
    }

    static findIntersectionNodes(startDE, label) {
      let de = startDE;
      let intNodes = null;

      do {
        const node = de.getFromNode();

        if (PolygonizeGraph.getDegree(node, label) > 1) {
          if (intNodes === null) intNodes = new ArrayList();
          intNodes.add(node);
        }

        de = de.getNext();
        Assert.isTrue(de !== null, 'found null DE in ring');
        Assert.isTrue(de === startDE || !de.isInRing(), 'found DE already in ring');
      } while (de !== startDE);

      return intNodes;
    }

    findEdgeRing(startDE) {
      const er = new EdgeRing(this._factory);
      er.build(startDE);
      return er;
    }

    computeDepthParity() {
      if (arguments.length === 0) {
        while (true) {
          return null;
        }
      }
    }

    computeNextCWEdges() {
      for (let iNode = this.nodeIterator(); iNode.hasNext();) {
        const node = iNode.next();
        PolygonizeGraph.computeNextCWEdges(node);
      }
    }

    addEdge(line) {
      if (line.isEmpty()) return null;
      const linePts = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());
      if (linePts.length < 2) return null;
      const startPt = linePts[0];
      const endPt = linePts[linePts.length - 1];
      const nStart = this.getNode(startPt);
      const nEnd = this.getNode(endPt);
      const de0 = new PolygonizeDirectedEdge(nStart, nEnd, linePts[1], true);
      const de1 = new PolygonizeDirectedEdge(nEnd, nStart, linePts[linePts.length - 2], false);
      const edge = new PolygonizeEdge(line);
      edge.setDirectedEdges(de0, de1);
      this.add(edge);
    }

    deleteCutEdges() {
      this.computeNextCWEdges();
      PolygonizeGraph.findLabeledEdgeRings(this._dirEdges);
      const cutLines = new ArrayList();

      for (let i = this._dirEdges.iterator(); i.hasNext();) {
        const de = i.next();
        if (de.isMarked()) continue;
        const sym = de.getSym();

        if (de.getLabel() === sym.getLabel()) {
          de.setMarked(true);
          sym.setMarked(true);
          const e = de.getEdge();
          cutLines.add(e.getLine());
        }
      }

      return cutLines;
    }

    getEdgeRings() {
      this.computeNextCWEdges();
      PolygonizeGraph.label(this._dirEdges, -1);
      const maximalRings = PolygonizeGraph.findLabeledEdgeRings(this._dirEdges);
      this.convertMaximalToMinimalEdgeRings(maximalRings);
      const edgeRingList = new ArrayList();

      for (let i = this._dirEdges.iterator(); i.hasNext();) {
        const de = i.next();
        if (de.isMarked()) continue;
        if (de.isInRing()) continue;
        const er = this.findEdgeRing(de);
        edgeRingList.add(er);
      }

      return edgeRingList;
    }

    getNode(pt) {
      let node = this.findNode(pt);

      if (node === null) {
        node = new Node(pt);
        this.add(node);
      }

      return node;
    }

    convertMaximalToMinimalEdgeRings(ringEdges) {
      for (let i = ringEdges.iterator(); i.hasNext();) {
        const de = i.next();
        const label = de.getLabel();
        const intNodes = PolygonizeGraph.findIntersectionNodes(de, label);
        if (intNodes === null) continue;

        for (let iNode = intNodes.iterator(); iNode.hasNext();) {
          const node = iNode.next();
          PolygonizeGraph.computeNextCCWEdges(node, label);
        }
      }
    }

    deleteDangles() {
      const nodesToRemove = this.findNodesOfDegree(1);
      const dangleLines = new HashSet();
      const nodeStack = new Stack();

      for (let i = nodesToRemove.iterator(); i.hasNext();) nodeStack.push(i.next());

      while (!nodeStack.isEmpty()) {
        const node = nodeStack.pop();
        PolygonizeGraph.deleteAllEdges(node);
        const nodeOutEdges = node.getOutEdges().getEdges();

        for (let i = nodeOutEdges.iterator(); i.hasNext();) {
          const de = i.next();
          de.setMarked(true);
          const sym = de.getSym();
          if (sym !== null) sym.setMarked(true);
          const e = de.getEdge();
          dangleLines.add(e.getLine());
          const toNode = de.getToNode();
          if (PolygonizeGraph.getDegreeNonDeleted(toNode) === 1) nodeStack.push(toNode);
        }
      }

      return dangleLines;
    }

  }

  class HoleAssigner {
    constructor() {
      HoleAssigner.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._shells = null;
      this._shellIndex = null;
      const shells = arguments[0];
      this._shells = shells;
      this.buildIndex();
    }

    static assignHolesToShells(holes, shells) {
      const assigner = new HoleAssigner(shells);
      assigner.assignHolesToShells(holes);
    }

    assignHolesToShells(holeList) {
      for (let i = holeList.iterator(); i.hasNext();) {
        const holeER = i.next();
        this.assignHoleToShell(holeER);
      }
    }

    buildIndex() {
      this._shellIndex = new STRtree();

      for (const shell of this._shells) this._shellIndex.insert(shell.getRing().getEnvelopeInternal(), shell);
    }

    queryOverlappingShells(ringEnv) {
      return this._shellIndex.query(ringEnv);
    }

    findShellContaining(testEr) {
      const testEnv = testEr.getRing().getEnvelopeInternal();
      const candidateShells = this.queryOverlappingShells(testEnv);
      return EdgeRing.findEdgeRingContaining(testEr, candidateShells);
    }

    assignHoleToShell(holeER) {
      const shell = this.findShellContaining(holeER);
      if (shell !== null) shell.addHole(holeER);
    }

  }

  class Polygonizer {
    constructor() {
      Polygonizer.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._lineStringAdder = new LineStringAdder(this);
      this._graph = null;
      this._dangles = new ArrayList();
      this._cutEdges = new ArrayList();
      this._invalidRingLines = new ArrayList();
      this._holeList = null;
      this._shellList = null;
      this._polyList = null;
      this._isCheckingRingsValid = true;
      this._extractOnlyPolygonal = null;
      this._geomFactory = null;

      if (arguments.length === 0) {
        Polygonizer.constructor_.call(this, false);
      } else if (arguments.length === 1) {
        const extractOnlyPolygonal = arguments[0];
        this._extractOnlyPolygonal = extractOnlyPolygonal;
      }
    }

    static extractPolygons(shellList, includeAll) {
      const polyList = new ArrayList();

      for (let i = shellList.iterator(); i.hasNext();) {
        const er = i.next();
        if (includeAll || er.isIncluded()) polyList.add(er.getPolygon());
      }

      return polyList;
    }

    static findOuterShells(shellList) {
      for (let i = shellList.iterator(); i.hasNext();) {
        const er = i.next();
        const outerHoleER = er.getOuterHole();

        if (outerHoleER !== null && !outerHoleER.isProcessed()) {
          er.setIncluded(true);
          outerHoleER.setProcessed(true);
        }
      }
    }

    static findDisjointShells(shellList) {
      Polygonizer.findOuterShells(shellList);
      let isMoreToScan = null;

      do {
        isMoreToScan = false;

        for (let i = shellList.iterator(); i.hasNext();) {
          const er = i.next();
          if (er.isIncludedSet()) continue;
          er.updateIncluded();
          if (!er.isIncludedSet()) isMoreToScan = true;
        }
      } while (isMoreToScan);
    }

    getGeometry() {
      if (this._geomFactory === null) this._geomFactory = new GeometryFactory();
      this.polygonize();
      if (this._extractOnlyPolygonal) return this._geomFactory.buildGeometry(this._polyList);
      return this._geomFactory.createGeometryCollection(GeometryFactory.toGeometryArray(this._polyList));
    }

    getInvalidRingLines() {
      this.polygonize();
      return this._invalidRingLines;
    }

    findValidRings(edgeRingList, validEdgeRingList, invalidRingList) {
      for (let i = edgeRingList.iterator(); i.hasNext();) {
        const er = i.next();
        if (er.isValid()) validEdgeRingList.add(er);else invalidRingList.add(er.getLineString());
      }
    }

    polygonize() {
      if (this._polyList !== null) return null;
      this._polyList = new ArrayList();
      if (this._graph === null) return null;
      this._dangles = this._graph.deleteDangles();
      this._cutEdges = this._graph.deleteCutEdges();

      const edgeRingList = this._graph.getEdgeRings();

      let validEdgeRingList = new ArrayList();
      this._invalidRingLines = new ArrayList();
      if (this._isCheckingRingsValid) this.findValidRings(edgeRingList, validEdgeRingList, this._invalidRingLines);else validEdgeRingList = edgeRingList;
      this.findShellsAndHoles(validEdgeRingList);
      HoleAssigner.assignHolesToShells(this._holeList, this._shellList);
      Collections.sort(this._shellList, new EdgeRing.EnvelopeComparator());
      let includeAll = true;

      if (this._extractOnlyPolygonal) {
        Polygonizer.findDisjointShells(this._shellList);
        includeAll = false;
      }

      this._polyList = Polygonizer.extractPolygons(this._shellList, includeAll);
    }

    getDangles() {
      this.polygonize();
      return this._dangles;
    }

    getCutEdges() {
      this.polygonize();
      return this._cutEdges;
    }

    getPolygons() {
      this.polygonize();
      return this._polyList;
    }

    add() {
      if (hasInterface(arguments[0], Collection)) {
        const geomList = arguments[0];

        for (let i = geomList.iterator(); i.hasNext();) {
          const geometry = i.next();
          this.add(geometry);
        }
      } else if (arguments[0] instanceof LineString) {
        const line = arguments[0];
        this._geomFactory = line.getFactory();
        if (this._graph === null) this._graph = new PolygonizeGraph(this._geomFactory);

        this._graph.addEdge(line);
      } else if (arguments[0] instanceof Geometry) {
        const g = arguments[0];
        g.apply(this._lineStringAdder);
      }
    }

    setCheckRingsValid(isCheckingRingsValid) {
      this._isCheckingRingsValid = isCheckingRingsValid;
    }

    findShellsAndHoles(edgeRingList) {
      this._holeList = new ArrayList();
      this._shellList = new ArrayList();

      for (let i = edgeRingList.iterator(); i.hasNext();) {
        const er = i.next();
        er.computeHole();
        if (er.isHole()) this._holeList.add(er);else this._shellList.add(er);
      }
    }

  }

  class LineStringAdder {
    constructor() {
      LineStringAdder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.p = null;
      const p = arguments[0];
      this.p = p;
    }

    filter(g) {
      if (g instanceof LineString) this.p.add(g);
    }

    get interfaces_() {
      return [GeometryComponentFilter];
    }

  }

  Polygonizer.LineStringAdder = LineStringAdder;

  var polygonize = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Polygonizer: Polygonizer
  });

  class RelateComputer {
    constructor() {
      RelateComputer.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._li = new RobustLineIntersector();
      this._ptLocator = new PointLocator();
      this._arg = null;
      this._nodes = new NodeMap$1(new RelateNodeFactory());
      this._im = null;
      this._isolatedEdges = new ArrayList();
      this._invalidPoint = null;
      const arg = arguments[0];
      this._arg = arg;
    }

    insertEdgeEnds(ee) {
      for (let i = ee.iterator(); i.hasNext();) {
        const e = i.next();

        this._nodes.add(e);
      }
    }

    computeProperIntersectionIM(intersector, im) {
      const dimA = this._arg[0].getGeometry().getDimension();

      const dimB = this._arg[1].getGeometry().getDimension();

      const hasProper = intersector.hasProperIntersection();
      const hasProperInterior = intersector.hasProperInteriorIntersection();

      if (dimA === 2 && dimB === 2) {
        if (hasProper) im.setAtLeast('212101212');
      } else if (dimA === 2 && dimB === 1) {
        if (hasProper) im.setAtLeast('FFF0FFFF2');
        if (hasProperInterior) im.setAtLeast('1FFFFF1FF');
      } else if (dimA === 1 && dimB === 2) {
        if (hasProper) im.setAtLeast('F0FFFFFF2');
        if (hasProperInterior) im.setAtLeast('1F1FFFFFF');
      } else if (dimA === 1 && dimB === 1) {
        if (hasProperInterior) im.setAtLeast('0FFFFFFFF');
      }
    }

    labelIsolatedEdges(thisIndex, targetIndex) {
      for (let ei = this._arg[thisIndex].getEdgeIterator(); ei.hasNext();) {
        const e = ei.next();

        if (e.isIsolated()) {
          this.labelIsolatedEdge(e, targetIndex, this._arg[targetIndex].getGeometry());

          this._isolatedEdges.add(e);
        }
      }
    }

    labelIsolatedEdge(e, targetIndex, target) {
      if (target.getDimension() > 0) {
        const loc = this._ptLocator.locate(e.getCoordinate(), target);

        e.getLabel().setAllLocations(targetIndex, loc);
      } else {
        e.getLabel().setAllLocations(targetIndex, Location.EXTERIOR);
      }
    }

    computeIM() {
      const im = new IntersectionMatrix();
      im.set(Location.EXTERIOR, Location.EXTERIOR, 2);

      if (!this._arg[0].getGeometry().getEnvelopeInternal().intersects(this._arg[1].getGeometry().getEnvelopeInternal())) {
        this.computeDisjointIM(im);
        return im;
      }

      this._arg[0].computeSelfNodes(this._li, false);

      this._arg[1].computeSelfNodes(this._li, false);

      const intersector = this._arg[0].computeEdgeIntersections(this._arg[1], this._li, false);

      this.computeIntersectionNodes(0);
      this.computeIntersectionNodes(1);
      this.copyNodesAndLabels(0);
      this.copyNodesAndLabels(1);
      this.labelIsolatedNodes();
      this.computeProperIntersectionIM(intersector, im);
      const eeBuilder = new EdgeEndBuilder();
      const ee0 = eeBuilder.computeEdgeEnds(this._arg[0].getEdgeIterator());
      this.insertEdgeEnds(ee0);
      const ee1 = eeBuilder.computeEdgeEnds(this._arg[1].getEdgeIterator());
      this.insertEdgeEnds(ee1);
      this.labelNodeEdges();
      this.labelIsolatedEdges(0, 1);
      this.labelIsolatedEdges(1, 0);
      this.updateIM(im);
      return im;
    }

    labelNodeEdges() {
      for (let ni = this._nodes.iterator(); ni.hasNext();) {
        const node = ni.next();
        node.getEdges().computeLabelling(this._arg);
      }
    }

    copyNodesAndLabels(argIndex) {
      for (let i = this._arg[argIndex].getNodeIterator(); i.hasNext();) {
        const graphNode = i.next();

        const newNode = this._nodes.addNode(graphNode.getCoordinate());

        newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
      }
    }

    labelIntersectionNodes(argIndex) {
      for (let i = this._arg[argIndex].getEdgeIterator(); i.hasNext();) {
        const e = i.next();
        const eLoc = e.getLabel().getLocation(argIndex);

        for (let eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext();) {
          const ei = eiIt.next();

          const n = this._nodes.find(ei.coord);

          if (n.getLabel().isNull(argIndex)) if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex);else n.setLabel(argIndex, Location.INTERIOR);
        }
      }
    }

    labelIsolatedNode(n, targetIndex) {
      const loc = this._ptLocator.locate(n.getCoordinate(), this._arg[targetIndex].getGeometry());

      n.getLabel().setAllLocations(targetIndex, loc);
    }

    computeIntersectionNodes(argIndex) {
      for (let i = this._arg[argIndex].getEdgeIterator(); i.hasNext();) {
        const e = i.next();
        const eLoc = e.getLabel().getLocation(argIndex);

        for (let eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext();) {
          const ei = eiIt.next();

          const n = this._nodes.addNode(ei.coord);

          if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex);else if (n.getLabel().isNull(argIndex)) n.setLabel(argIndex, Location.INTERIOR);
        }
      }
    }

    labelIsolatedNodes() {
      for (let ni = this._nodes.iterator(); ni.hasNext();) {
        const n = ni.next();
        const label = n.getLabel();
        Assert.isTrue(label.getGeometryCount() > 0, 'node with empty label found');
        if (n.isIsolated()) if (label.isNull(0)) this.labelIsolatedNode(n, 0);else this.labelIsolatedNode(n, 1);
      }
    }

    updateIM(im) {
      for (let ei = this._isolatedEdges.iterator(); ei.hasNext();) {
        const e = ei.next();
        e.updateIM(im);
      }

      for (let ni = this._nodes.iterator(); ni.hasNext();) {
        const node = ni.next();
        node.updateIM(im);
        node.updateIMFromEdges(im);
      }
    }

    computeDisjointIM(im) {
      const ga = this._arg[0].getGeometry();

      if (!ga.isEmpty()) {
        im.set(Location.INTERIOR, Location.EXTERIOR, ga.getDimension());
        im.set(Location.BOUNDARY, Location.EXTERIOR, ga.getBoundaryDimension());
      }

      const gb = this._arg[1].getGeometry();

      if (!gb.isEmpty()) {
        im.set(Location.EXTERIOR, Location.INTERIOR, gb.getDimension());
        im.set(Location.EXTERIOR, Location.BOUNDARY, gb.getBoundaryDimension());
      }
    }

  }

  class RectangleContains {
    constructor() {
      RectangleContains.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._rectEnv = null;
      const rectangle = arguments[0];
      this._rectEnv = rectangle.getEnvelopeInternal();
    }

    static contains(rectangle, b) {
      const rc = new RectangleContains(rectangle);
      return rc.contains(b);
    }

    isContainedInBoundary(geom) {
      if (geom instanceof Polygon) return false;
      if (geom instanceof Point) return this.isPointContainedInBoundary(geom);
      if (geom instanceof LineString) return this.isLineStringContainedInBoundary(geom);

      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const comp = geom.getGeometryN(i);
        if (!this.isContainedInBoundary(comp)) return false;
      }

      return true;
    }

    isLineSegmentContainedInBoundary(p0, p1) {
      if (p0.equals(p1)) return this.isPointContainedInBoundary(p0);

      if (p0.x === p1.x) {
        if (p0.x === this._rectEnv.getMinX() || p0.x === this._rectEnv.getMaxX()) return true;
      } else if (p0.y === p1.y) {
        if (p0.y === this._rectEnv.getMinY() || p0.y === this._rectEnv.getMaxY()) return true;
      }

      return false;
    }

    isLineStringContainedInBoundary(line) {
      const seq = line.getCoordinateSequence();
      const p0 = new Coordinate();
      const p1 = new Coordinate();

      for (let i = 0; i < seq.size() - 1; i++) {
        seq.getCoordinate(i, p0);
        seq.getCoordinate(i + 1, p1);
        if (!this.isLineSegmentContainedInBoundary(p0, p1)) return false;
      }

      return true;
    }

    isPointContainedInBoundary() {
      if (arguments[0] instanceof Point) {
        const point = arguments[0];
        return this.isPointContainedInBoundary(point.getCoordinate());
      } else if (arguments[0] instanceof Coordinate) {
        const pt = arguments[0];
        return pt.x === this._rectEnv.getMinX() || pt.x === this._rectEnv.getMaxX() || pt.y === this._rectEnv.getMinY() || pt.y === this._rectEnv.getMaxY();
      }
    }

    contains(geom) {
      if (!this._rectEnv.contains(geom.getEnvelopeInternal())) return false;
      if (this.isContainedInBoundary(geom)) return false;
      return true;
    }

  }

  class RectangleLineIntersector {
    constructor() {
      RectangleLineIntersector.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._li = new RobustLineIntersector();
      this._rectEnv = null;
      this._diagUp0 = null;
      this._diagUp1 = null;
      this._diagDown0 = null;
      this._diagDown1 = null;
      const rectEnv = arguments[0];
      this._rectEnv = rectEnv;
      this._diagUp0 = new Coordinate(rectEnv.getMinX(), rectEnv.getMinY());
      this._diagUp1 = new Coordinate(rectEnv.getMaxX(), rectEnv.getMaxY());
      this._diagDown0 = new Coordinate(rectEnv.getMinX(), rectEnv.getMaxY());
      this._diagDown1 = new Coordinate(rectEnv.getMaxX(), rectEnv.getMinY());
    }

    intersects(p0, p1) {
      const segEnv = new Envelope(p0, p1);
      if (!this._rectEnv.intersects(segEnv)) return false;
      if (this._rectEnv.intersects(p0)) return true;
      if (this._rectEnv.intersects(p1)) return true;

      if (p0.compareTo(p1) > 0) {
        const tmp = p0;
        p0 = p1;
        p1 = tmp;
      }

      let isSegUpwards = false;
      if (p1.y > p0.y) isSegUpwards = true;
      if (isSegUpwards) this._li.computeIntersection(p0, p1, this._diagDown0, this._diagDown1);else this._li.computeIntersection(p0, p1, this._diagUp0, this._diagUp1);
      if (this._li.hasIntersection()) return true;
      return false;
    }

  }

  class RectangleIntersects {
    constructor() {
      RectangleIntersects.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._rectangle = null;
      this._rectEnv = null;
      const rectangle = arguments[0];
      this._rectangle = rectangle;
      this._rectEnv = rectangle.getEnvelopeInternal();
    }

    static intersects(rectangle, b) {
      const rp = new RectangleIntersects(rectangle);
      return rp.intersects(b);
    }

    intersects(geom) {
      if (!this._rectEnv.intersects(geom.getEnvelopeInternal())) return false;
      const visitor = new EnvelopeIntersectsVisitor(this._rectEnv);
      visitor.applyTo(geom);
      if (visitor.intersects()) return true;
      const ecpVisitor = new GeometryContainsPointVisitor(this._rectangle);
      ecpVisitor.applyTo(geom);
      if (ecpVisitor.containsPoint()) return true;
      const riVisitor = new RectangleIntersectsSegmentVisitor(this._rectangle);
      riVisitor.applyTo(geom);
      if (riVisitor.intersects()) return true;
      return false;
    }

  }

  class EnvelopeIntersectsVisitor extends ShortCircuitedGeometryVisitor {
    constructor() {
      super();
      EnvelopeIntersectsVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._rectEnv = null;
      this._intersects = false;
      const rectEnv = arguments[0];
      this._rectEnv = rectEnv;
    }

    isDone() {
      return this._intersects === true;
    }

    visit(element) {
      const elementEnv = element.getEnvelopeInternal();
      if (!this._rectEnv.intersects(elementEnv)) return null;

      if (this._rectEnv.contains(elementEnv)) {
        this._intersects = true;
        return null;
      }

      if (elementEnv.getMinX() >= this._rectEnv.getMinX() && elementEnv.getMaxX() <= this._rectEnv.getMaxX()) {
        this._intersects = true;
        return null;
      }

      if (elementEnv.getMinY() >= this._rectEnv.getMinY() && elementEnv.getMaxY() <= this._rectEnv.getMaxY()) {
        this._intersects = true;
        return null;
      }
    }

    intersects() {
      return this._intersects;
    }

  }

  class GeometryContainsPointVisitor extends ShortCircuitedGeometryVisitor {
    constructor() {
      super();
      GeometryContainsPointVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._rectSeq = null;
      this._rectEnv = null;
      this._containsPoint = false;
      const rectangle = arguments[0];
      this._rectSeq = rectangle.getExteriorRing().getCoordinateSequence();
      this._rectEnv = rectangle.getEnvelopeInternal();
    }

    isDone() {
      return this._containsPoint === true;
    }

    visit(geom) {
      if (!(geom instanceof Polygon)) return null;
      const elementEnv = geom.getEnvelopeInternal();
      if (!this._rectEnv.intersects(elementEnv)) return null;
      const rectPt = new Coordinate();

      for (let i = 0; i < 4; i++) {
        this._rectSeq.getCoordinate(i, rectPt);

        if (!elementEnv.contains(rectPt)) continue;

        if (SimplePointInAreaLocator.containsPointInPolygon(rectPt, geom)) {
          this._containsPoint = true;
          return null;
        }
      }
    }

    containsPoint() {
      return this._containsPoint;
    }

  }

  class RectangleIntersectsSegmentVisitor extends ShortCircuitedGeometryVisitor {
    constructor() {
      super();
      RectangleIntersectsSegmentVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._rectEnv = null;
      this._rectIntersector = null;
      this._hasIntersection = false;
      this._p0 = new Coordinate();
      this._p1 = new Coordinate();
      const rectangle = arguments[0];
      this._rectEnv = rectangle.getEnvelopeInternal();
      this._rectIntersector = new RectangleLineIntersector(this._rectEnv);
    }

    intersects() {
      return this._hasIntersection;
    }

    isDone() {
      return this._hasIntersection === true;
    }

    visit(geom) {
      const elementEnv = geom.getEnvelopeInternal();
      if (!this._rectEnv.intersects(elementEnv)) return null;
      const lines = LinearComponentExtracter.getLines(geom);
      this.checkIntersectionWithLineStrings(lines);
    }

    checkIntersectionWithLineStrings(lines) {
      for (let i = lines.iterator(); i.hasNext();) {
        const testLine = i.next();
        this.checkIntersectionWithSegments(testLine);
        if (this._hasIntersection) return null;
      }
    }

    checkIntersectionWithSegments(testLine) {
      const seq1 = testLine.getCoordinateSequence();

      for (let j = 1; j < seq1.size(); j++) {
        seq1.getCoordinate(j - 1, this._p0);
        seq1.getCoordinate(j, this._p1);

        if (this._rectIntersector.intersects(this._p0, this._p1)) {
          this._hasIntersection = true;
          return null;
        }
      }
    }

  }

  class RelateOp extends GeometryGraphOperation {
    constructor() {
      super();
      RelateOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._relate = null;

      if (arguments.length === 2) {
        const g0 = arguments[0],
              g1 = arguments[1];
        GeometryGraphOperation.constructor_.call(this, g0, g1);
        this._relate = new RelateComputer(this._arg);
      } else if (arguments.length === 3) {
        const g0 = arguments[0],
              g1 = arguments[1],
              boundaryNodeRule = arguments[2];
        GeometryGraphOperation.constructor_.call(this, g0, g1, boundaryNodeRule);
        this._relate = new RelateComputer(this._arg);
      }
    }

    static covers(g1, g2) {
      if (g2.getDimension() === 2 && g1.getDimension() < 2) return false;
      if (g2.getDimension() === 1 && g1.getDimension() < 1 && g2.getLength() > 0.0) return false;
      if (!g1.getEnvelopeInternal().covers(g2.getEnvelopeInternal())) return false;
      if (g1.isRectangle()) return true;
      return new RelateOp(g1, g2).getIntersectionMatrix().isCovers();
    }

    static intersects(g1, g2) {
      if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
      if (g1.isRectangle()) return RectangleIntersects.intersects(g1, g2);
      if (g2.isRectangle()) return RectangleIntersects.intersects(g2, g1);

      if (g1.isGeometryCollection() || g2.isGeometryCollection()) {

        for (let i = 0; i < g1.getNumGeometries(); i++) for (let j = 0; j < g2.getNumGeometries(); j++) if (g1.getGeometryN(i).intersects(g2.getGeometryN(j))) return true;

        return false;
      }

      return new RelateOp(g1, g2).getIntersectionMatrix().isIntersects();
    }

    static touches(g1, g2) {
      if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
      return new RelateOp(g1, g2).getIntersectionMatrix().isTouches(g1.getDimension(), g2.getDimension());
    }

    static equalsTopo(g1, g2) {
      if (!g1.getEnvelopeInternal().equals(g2.getEnvelopeInternal())) return false;
      return RelateOp.relate(g1, g2).isEquals(g1.getDimension(), g2.getDimension());
    }

    static relate() {
      if (arguments.length === 2) {
        const a = arguments[0],
              b = arguments[1];
        const relOp = new RelateOp(a, b);
        const im = relOp.getIntersectionMatrix();
        return im;
      } else if (arguments.length === 3) {
        const a = arguments[0],
              b = arguments[1],
              boundaryNodeRule = arguments[2];
        const relOp = new RelateOp(a, b, boundaryNodeRule);
        const im = relOp.getIntersectionMatrix();
        return im;
      }
    }

    static overlaps(g1, g2) {
      if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
      return new RelateOp(g1, g2).getIntersectionMatrix().isOverlaps(g1.getDimension(), g2.getDimension());
    }

    static crosses(g1, g2) {
      if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false;
      return new RelateOp(g1, g2).getIntersectionMatrix().isCrosses(g1.getDimension(), g2.getDimension());
    }

    static contains(g1, g2) {
      if (g2.getDimension() === 2 && g1.getDimension() < 2) return false;
      if (g2.getDimension() === 1 && g1.getDimension() < 1 && g2.getLength() > 0.0) return false;
      if (!g1.getEnvelopeInternal().contains(g2.getEnvelopeInternal())) return false;
      if (g1.isRectangle()) return RectangleContains.contains(g1, g2);
      return new RelateOp(g1, g2).getIntersectionMatrix().isContains();
    }

    getIntersectionMatrix() {
      return this._relate.computeIM();
    }

  }

  var relate = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RelateOp: RelateOp
  });

  class PointGeometryUnion {
    constructor() {
      PointGeometryUnion.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pointGeom = null;
      this._otherGeom = null;
      this._geomFact = null;
      const pointGeom = arguments[0],
            otherGeom = arguments[1];
      this._pointGeom = pointGeom;
      this._otherGeom = otherGeom;
      this._geomFact = otherGeom.getFactory();
    }

    static union(pointGeom, otherGeom) {
      const unioner = new PointGeometryUnion(pointGeom, otherGeom);
      return unioner.union();
    }

    union() {
      const locater = new PointLocator();
      const exteriorCoords = new TreeSet();

      for (let i = 0; i < this._pointGeom.getNumGeometries(); i++) {
        const point = this._pointGeom.getGeometryN(i);

        const coord = point.getCoordinate();
        const loc = locater.locate(coord, this._otherGeom);
        if (loc === Location.EXTERIOR) exteriorCoords.add(coord);
      }

      if (exteriorCoords.size() === 0) return this._otherGeom;
      let ptComp = null;
      const coords = CoordinateArrays.toCoordinateArray(exteriorCoords);
      if (coords.length === 1) ptComp = this._geomFact.createPoint(coords[0]);else ptComp = this._geomFact.createMultiPointFromCoords(coords);
      return GeometryCombiner.combine(ptComp, this._otherGeom);
    }

  }

  class InputExtracter {
    constructor() {
      InputExtracter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geomFactory = null;
      this._polygons = new ArrayList();
      this._lines = new ArrayList();
      this._points = new ArrayList();
      this._dimension = Dimension.FALSE;
    }

    static extract() {
      if (hasInterface(arguments[0], Collection)) {
        const geoms = arguments[0];
        const extracter = new InputExtracter();
        extracter.add(geoms);
        return extracter;
      } else if (arguments[0] instanceof Geometry) {
        const geom = arguments[0];
        const extracter = new InputExtracter();
        extracter.add(geom);
        return extracter;
      }
    }

    getFactory() {
      return this._geomFactory;
    }

    recordDimension(dim) {
      if (dim > this._dimension) this._dimension = dim;
    }

    getDimension() {
      return this._dimension;
    }

    filter(geom) {
      this.recordDimension(geom.getDimension());
      if (geom instanceof GeometryCollection) return null;
      if (geom.isEmpty()) return null;

      if (geom instanceof Polygon) {
        this._polygons.add(geom);

        return null;
      } else if (geom instanceof LineString) {
        this._lines.add(geom);

        return null;
      } else if (geom instanceof Point) {
        this._points.add(geom);

        return null;
      }

      Assert.shouldNeverReachHere('Unhandled geometry type: ' + geom.getGeometryType());
    }

    getExtract(dim) {
      switch (dim) {
        case 0:
          return this._points;

        case 1:
          return this._lines;

        case 2:
          return this._polygons;
      }

      Assert.shouldNeverReachHere('Invalid dimension: ' + dim);
      return null;
    }

    isEmpty() {
      return this._polygons.isEmpty() && this._lines.isEmpty() && this._points.isEmpty();
    }

    add() {
      if (hasInterface(arguments[0], Collection)) {
        const geoms = arguments[0];

        for (const geom of geoms) this.add(geom);
      } else if (arguments[0] instanceof Geometry) {
        const geom = arguments[0];
        if (this._geomFactory === null) this._geomFactory = geom.getFactory();
        geom.apply(this);
      }
    }

    get interfaces_() {
      return [GeometryFilter];
    }

  }

  class OverlapUnion {
    constructor() {
      OverlapUnion.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geomFactory = null;
      this._g0 = null;
      this._g1 = null;
      this._isUnionSafe = null;
      const g0 = arguments[0],
            g1 = arguments[1];
      this._g0 = g0;
      this._g1 = g1;
      this._geomFactory = g0.getFactory();
    }

    static containsProperly() {
      if (arguments.length === 2) {
        const env = arguments[0],
              p = arguments[1];
        if (env.isNull()) return false;
        return p.getX() > env.getMinX() && p.getX() < env.getMaxX() && p.getY() > env.getMinY() && p.getY() < env.getMaxY();
      } else if (arguments.length === 3) {
        const env = arguments[0],
              p0 = arguments[1],
              p1 = arguments[2];
        return OverlapUnion.containsProperly(env, p0) && OverlapUnion.containsProperly(env, p1);
      }
    }

    static union(g0, g1) {
      const union = new OverlapUnion(g0, g1);
      return union.union();
    }

    static intersects(env, p0, p1) {
      return env.intersects(p0) || env.intersects(p1);
    }

    static overlapEnvelope(g0, g1) {
      const g0Env = g0.getEnvelopeInternal();
      const g1Env = g1.getEnvelopeInternal();
      const overlapEnv = g0Env.intersection(g1Env);
      return overlapEnv;
    }

    static extractBorderSegments(geom, env, segs) {
      geom.apply(new class {
        get interfaces_() {
          return [CoordinateSequenceFilter];
        }

        filter(seq, i) {
          if (i <= 0) return null;
          const p0 = seq.getCoordinate(i - 1);
          const p1 = seq.getCoordinate(i);
          const isBorder = OverlapUnion.intersects(env, p0, p1) && !OverlapUnion.containsProperly(env, p0, p1);

          if (isBorder) {
            const seg = new LineSegment(p0, p1);
            segs.add(seg);
          }
        }

        isDone() {
          return false;
        }

        isGeometryChanged() {
          return false;
        }

      }());
    }

    static unionBuffer(g0, g1) {
      const factory = g0.getFactory();
      const gColl = factory.createGeometryCollection([g0, g1]);
      const union = gColl.buffer(0.0);
      return union;
    }

    isBorderSegmentsSame(result, env) {
      const segsBefore = this.extractBorderSegments(this._g0, this._g1, env);
      const segsAfter = new ArrayList();
      OverlapUnion.extractBorderSegments(result, env, segsAfter);
      return this.isEqual(segsBefore, segsAfter);
    }

    extractByEnvelope(env, geom, disjointGeoms) {
      const intersectingGeoms = new ArrayList();

      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const elem = geom.getGeometryN(i);

        if (elem.getEnvelopeInternal().intersects(env)) {
          intersectingGeoms.add(elem);
        } else {
          const copy = elem.copy();
          disjointGeoms.add(copy);
        }
      }

      return this._geomFactory.buildGeometry(intersectingGeoms);
    }

    isEqual(segs0, segs1) {
      if (segs0.size() !== segs1.size()) return false;
      const segIndex = new HashSet(segs0);

      for (const seg of segs1) if (!segIndex.contains(seg)) return false;

      return true;
    }

    union() {
      const overlapEnv = OverlapUnion.overlapEnvelope(this._g0, this._g1);

      if (overlapEnv.isNull()) {
        const g0Copy = this._g0.copy();

        const g1Copy = this._g1.copy();

        return GeometryCombiner.combine(g0Copy, g1Copy);
      }

      const disjointPolys = new ArrayList();
      const g0Overlap = this.extractByEnvelope(overlapEnv, this._g0, disjointPolys);
      const g1Overlap = this.extractByEnvelope(overlapEnv, this._g1, disjointPolys);
      const unionGeom = this.unionFull(g0Overlap, g1Overlap);
      let result = null;
      this._isUnionSafe = this.isBorderSegmentsSame(unionGeom, overlapEnv);
      if (!this._isUnionSafe) result = this.unionFull(this._g0, this._g1);else result = this.combine(unionGeom, disjointPolys);
      return result;
    }

    combine(unionGeom, disjointPolys) {
      if (disjointPolys.size() <= 0) return unionGeom;
      disjointPolys.add(unionGeom);
      const result = GeometryCombiner.combine(disjointPolys);
      return result;
    }

    unionFull(geom0, geom1) {
      try {
        return geom0.union(geom1);
      } catch (ex) {
        if (ex instanceof TopologyException) return OverlapUnion.unionBuffer(geom0, geom1);else throw ex;
      } finally {}
    }

    extractBorderSegments(geom0, geom1, env) {
      const segs = new ArrayList();
      OverlapUnion.extractBorderSegments(geom0, env, segs);
      if (geom1 !== null) OverlapUnion.extractBorderSegments(geom1, env, segs);
      return segs;
    }

    isUnionOptimized() {
      return this._isUnionSafe;
    }

  }

  class CascadedPolygonUnion {
    constructor() {
      CascadedPolygonUnion.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputPolys = null;
      this._geomFactory = null;
      const polys = arguments[0];
      this._inputPolys = polys;
      if (this._inputPolys === null) this._inputPolys = new ArrayList();
    }

    static restrictToPolygons(g) {
      if (hasInterface(g, Polygonal)) return g;
      const polygons = PolygonExtracter.getPolygons(g);
      if (polygons.size() === 1) return polygons.get(0);
      return g.getFactory().createMultiPolygon(GeometryFactory.toPolygonArray(polygons));
    }

    static getGeometry(list, index) {
      if (index >= list.size()) return null;
      return list.get(index);
    }

    static union(polys) {
      const op = new CascadedPolygonUnion(polys);
      return op.union();
    }

    reduceToGeometries(geomTree) {
      const geoms = new ArrayList();

      for (let i = geomTree.iterator(); i.hasNext();) {
        const o = i.next();
        let geom = null;
        if (hasInterface(o, List)) geom = this.unionTree(o);else if (o instanceof Geometry) geom = o;
        geoms.add(geom);
      }

      return geoms;
    }

    union() {
      if (this._inputPolys === null) throw new IllegalStateException('union() method cannot be called twice');
      if (this._inputPolys.isEmpty()) return null;
      this._geomFactory = this._inputPolys.iterator().next().getFactory();
      const index = new STRtree(CascadedPolygonUnion.STRTREE_NODE_CAPACITY);

      for (let i = this._inputPolys.iterator(); i.hasNext();) {
        const item = i.next();
        index.insert(item.getEnvelopeInternal(), item);
      }

      this._inputPolys = null;
      const itemTree = index.itemsTree();
      const unionAll = this.unionTree(itemTree);
      return unionAll;
    }

    binaryUnion() {
      if (arguments.length === 1) {
        const geoms = arguments[0];
        return this.binaryUnion(geoms, 0, geoms.size());
      } else if (arguments.length === 3) {
        const geoms = arguments[0],
              start = arguments[1],
              end = arguments[2];

        if (end - start <= 1) {
          const g0 = CascadedPolygonUnion.getGeometry(geoms, start);
          return this.unionSafe(g0, null);
        } else if (end - start === 2) {
          return this.unionSafe(CascadedPolygonUnion.getGeometry(geoms, start), CascadedPolygonUnion.getGeometry(geoms, start + 1));
        } else {
          const mid = Math.trunc((end + start) / 2);
          const g0 = this.binaryUnion(geoms, start, mid);
          const g1 = this.binaryUnion(geoms, mid, end);
          return this.unionSafe(g0, g1);
        }
      }
    }

    repeatedUnion(geoms) {
      let union = null;

      for (let i = geoms.iterator(); i.hasNext();) {
        const g = i.next();
        if (union === null) union = g.copy();else union = union.union(g);
      }

      return union;
    }

    unionSafe(g0, g1) {
      if (g0 === null && g1 === null) return null;
      if (g0 === null) return g1.copy();
      if (g1 === null) return g0.copy();
      return this.unionActual(g0, g1);
    }

    unionActual(g0, g1) {
      const union = OverlapUnion.union(g0, g1);
      return CascadedPolygonUnion.restrictToPolygons(union);
    }

    unionTree(geomTree) {
      const geoms = this.reduceToGeometries(geomTree);
      const union = this.binaryUnion(geoms);
      return union;
    }

    bufferUnion() {
      if (arguments.length === 1) {
        const geoms = arguments[0];
        const factory = geoms.get(0).getFactory();
        const gColl = factory.buildGeometry(geoms);
        const unionAll = gColl.buffer(0.0);
        return unionAll;
      } else if (arguments.length === 2) {
        const g0 = arguments[0],
              g1 = arguments[1];
        const factory = g0.getFactory();
        const gColl = factory.createGeometryCollection([g0, g1]);
        const unionAll = gColl.buffer(0.0);
        return unionAll;
      }
    }

  }
  CascadedPolygonUnion.STRTREE_NODE_CAPACITY = 4;

  class UnaryUnionOp {
    constructor() {
      UnaryUnionOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geomFact = null;
      this._extracter = null;

      if (arguments.length === 1) {
        if (hasInterface(arguments[0], Collection)) {
          const geoms = arguments[0];
          this.extract(geoms);
        } else if (arguments[0] instanceof Geometry) {
          const geom = arguments[0];
          this.extract(geom);
        }
      } else if (arguments.length === 2) {
        const geoms = arguments[0],
              geomFact = arguments[1];
        this._geomFact = geomFact;
        this.extract(geoms);
      }
    }

    static union() {
      if (arguments.length === 1) {
        if (hasInterface(arguments[0], Collection)) {
          const geoms = arguments[0];
          const op = new UnaryUnionOp(geoms);
          return op.union();
        } else if (arguments[0] instanceof Geometry) {
          const geom = arguments[0];
          const op = new UnaryUnionOp(geom);
          return op.union();
        }
      } else if (arguments.length === 2) {
        const geoms = arguments[0],
              geomFact = arguments[1];
        const op = new UnaryUnionOp(geoms, geomFact);
        return op.union();
      }
    }

    unionNoOpt(g0) {
      const empty = this._geomFact.createPoint();

      return SnapIfNeededOverlayOp.overlayOp(g0, empty, OverlayOp.UNION);
    }

    unionWithNull(g0, g1) {
      if (g0 === null && g1 === null) return null;
      if (g1 === null) return g0;
      if (g0 === null) return g1;
      return g0.union(g1);
    }

    extract() {
      if (hasInterface(arguments[0], Collection)) {
        const geoms = arguments[0];
        this._extracter = InputExtracter.extract(geoms);
      } else if (arguments[0] instanceof Geometry) {
        const geom = arguments[0];
        this._extracter = InputExtracter.extract(geom);
      }
    }

    union() {
      if (this._geomFact === null) this._geomFact = this._extracter.getFactory();
      if (this._geomFact === null) return null;
      if (this._extracter.isEmpty()) return this._geomFact.createEmpty(this._extracter.getDimension());

      const points = this._extracter.getExtract(0);

      const lines = this._extracter.getExtract(1);

      const polygons = this._extracter.getExtract(2);

      let unionPoints = null;

      if (points.size() > 0) {
        const ptGeom = this._geomFact.buildGeometry(points);

        unionPoints = this.unionNoOpt(ptGeom);
      }

      let unionLines = null;

      if (lines.size() > 0) {
        const lineGeom = this._geomFact.buildGeometry(lines);

        unionLines = this.unionNoOpt(lineGeom);
      }

      let unionPolygons = null;
      if (polygons.size() > 0) unionPolygons = CascadedPolygonUnion.union(polygons);
      const unionLA = this.unionWithNull(unionLines, unionPolygons);
      let union = null;
      if (unionPoints === null) union = unionLA;else if (unionLA === null) union = unionPoints;else union = PointGeometryUnion.union(unionPoints, unionLA);
      if (union === null) return this._geomFact.createGeometryCollection();
      return union;
    }

  }

  var union = /*#__PURE__*/Object.freeze({
    __proto__: null,
    UnaryUnionOp: UnaryUnionOp
  });

  var valid = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IsValidOp: IsValidOp,
    ConsistentAreaTester: ConsistentAreaTester
  });

  var operation = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BoundaryOp: BoundaryOp,
    IsSimpleOp: IsSimpleOp,
    buffer: buffer,
    distance: distance,
    linemerge: linemerge,
    overlay: overlay,
    polygonize: polygonize,
    relate: relate,
    union: union,
    valid: valid
  });

  class CommonBitsOp {
    constructor() {
      CommonBitsOp.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._returnToOriginalPrecision = true;
      this._cbr = null;

      if (arguments.length === 0) {
        CommonBitsOp.constructor_.call(this, true);
      } else if (arguments.length === 1) {
        const returnToOriginalPrecision = arguments[0];
        this._returnToOriginalPrecision = returnToOriginalPrecision;
      }
    }

    computeResultPrecision(result) {
      if (this._returnToOriginalPrecision) this._cbr.addCommonBits(result);
      return result;
    }

    union(geom0, geom1) {
      const geom = this.removeCommonBits(geom0, geom1);
      return this.computeResultPrecision(geom[0].union(geom[1]));
    }

    intersection(geom0, geom1) {
      const geom = this.removeCommonBits(geom0, geom1);
      return this.computeResultPrecision(geom[0].intersection(geom[1]));
    }

    removeCommonBits() {
      if (arguments.length === 1) {
        const geom0 = arguments[0];
        this._cbr = new CommonBitsRemover();

        this._cbr.add(geom0);

        const geom = this._cbr.removeCommonBits(geom0.copy());

        return geom;
      } else if (arguments.length === 2) {
        const geom0 = arguments[0],
              geom1 = arguments[1];
        this._cbr = new CommonBitsRemover();

        this._cbr.add(geom0);

        this._cbr.add(geom1);

        const geom = new Array(2).fill(null);
        geom[0] = this._cbr.removeCommonBits(geom0.copy());
        geom[1] = this._cbr.removeCommonBits(geom1.copy());
        return geom;
      }
    }

    buffer(geom0, distance) {
      const geom = this.removeCommonBits(geom0);
      return this.computeResultPrecision(geom.buffer(distance));
    }

    symDifference(geom0, geom1) {
      const geom = this.removeCommonBits(geom0, geom1);
      return this.computeResultPrecision(geom[0].symDifference(geom[1]));
    }

    difference(geom0, geom1) {
      const geom = this.removeCommonBits(geom0, geom1);
      return this.computeResultPrecision(geom[0].difference(geom[1]));
    }

  }

  class EnhancedPrecisionOp {
    static union(geom0, geom1) {
      let originalEx = null;

      try {
        const result = geom0.union(geom1);
        return result;
      } catch (ex) {
        if (ex instanceof RuntimeException) originalEx = ex;else throw ex;
      } finally {}

      try {
        const cbo = new CommonBitsOp(true);
        const resultEP = cbo.union(geom0, geom1);
        if (!resultEP.isValid()) throw originalEx;
        return resultEP;
      } catch (ex2) {
        if (ex2 instanceof RuntimeException) throw originalEx;else throw ex2;
      } finally {}
    }

    static intersection(geom0, geom1) {
      let originalEx = null;

      try {
        const result = geom0.intersection(geom1);
        return result;
      } catch (ex) {
        if (ex instanceof RuntimeException) originalEx = ex;else throw ex;
      } finally {}

      try {
        const cbo = new CommonBitsOp(true);
        const resultEP = cbo.intersection(geom0, geom1);
        if (!resultEP.isValid()) throw originalEx;
        return resultEP;
      } catch (ex2) {
        if (ex2 instanceof RuntimeException) throw originalEx;else throw ex2;
      } finally {}
    }

    static buffer(geom, distance) {
      let originalEx = null;

      try {
        const result = geom.buffer(distance);
        return result;
      } catch (ex) {
        if (ex instanceof RuntimeException) originalEx = ex;else throw ex;
      } finally {}

      try {
        const cbo = new CommonBitsOp(true);
        const resultEP = cbo.buffer(geom, distance);
        if (!resultEP.isValid()) throw originalEx;
        return resultEP;
      } catch (ex2) {
        if (ex2 instanceof RuntimeException) throw originalEx;else throw ex2;
      } finally {}
    }

    static symDifference(geom0, geom1) {
      let originalEx = null;

      try {
        const result = geom0.symDifference(geom1);
        return result;
      } catch (ex) {
        if (ex instanceof RuntimeException) originalEx = ex;else throw ex;
      } finally {}

      try {
        const cbo = new CommonBitsOp(true);
        const resultEP = cbo.symDifference(geom0, geom1);
        if (!resultEP.isValid()) throw originalEx;
        return resultEP;
      } catch (ex2) {
        if (ex2 instanceof RuntimeException) throw originalEx;else throw ex2;
      } finally {}
    }

    static difference(geom0, geom1) {
      let originalEx = null;

      try {
        const result = geom0.difference(geom1);
        return result;
      } catch (ex) {
        if (ex instanceof RuntimeException) originalEx = ex;else throw ex;
      } finally {}

      try {
        const cbo = new CommonBitsOp(true);
        const resultEP = cbo.difference(geom0, geom1);
        if (!resultEP.isValid()) throw originalEx;
        return resultEP;
      } catch (ex2) {
        if (ex2 instanceof RuntimeException) throw originalEx;else throw ex2;
      } finally {}
    }

  }

  class PrecisionReducerCoordinateOperation extends GeometryEditor.CoordinateOperation {
    constructor() {
      super();
      PrecisionReducerCoordinateOperation.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._targetPM = null;
      this._removeCollapsed = true;
      const targetPM = arguments[0],
            removeCollapsed = arguments[1];
      this._targetPM = targetPM;
      this._removeCollapsed = removeCollapsed;
    }

    edit() {
      if (arguments.length === 2 && arguments[1] instanceof Geometry && arguments[0] instanceof Array) {
        const coordinates = arguments[0],
              geom = arguments[1];
        if (coordinates.length === 0) return null;
        const reducedCoords = new Array(coordinates.length).fill(null);

        for (let i = 0; i < coordinates.length; i++) {
          const coord = new Coordinate(coordinates[i]);

          this._targetPM.makePrecise(coord);

          reducedCoords[i] = coord;
        }

        const noRepeatedCoordList = new CoordinateList(reducedCoords, false);
        const noRepeatedCoords = noRepeatedCoordList.toCoordinateArray();
        let minLength = 0;
        if (geom instanceof LineString) minLength = 2;
        if (geom instanceof LinearRing) minLength = 4;
        let collapsedCoords = reducedCoords;
        if (this._removeCollapsed) collapsedCoords = null;
        if (noRepeatedCoords.length < minLength) return collapsedCoords;
        return noRepeatedCoords;
      } else {
        return super.edit.apply(this, arguments);
      }
    }

  }

  class GeometryPrecisionReducer {
    constructor() {
      GeometryPrecisionReducer.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._targetPM = null;
      this._removeCollapsed = true;
      this._changePrecisionModel = false;
      this._isPointwise = false;
      const pm = arguments[0];
      this._targetPM = pm;
    }

    static reduce(g, precModel) {
      const reducer = new GeometryPrecisionReducer(precModel);
      return reducer.reduce(g);
    }

    static reducePointwise(g, precModel) {
      const reducer = new GeometryPrecisionReducer(precModel);
      reducer.setPointwise(true);
      return reducer.reduce(g);
    }

    fixPolygonalTopology(geom) {
      let geomToBuffer = geom;
      if (!this._changePrecisionModel) geomToBuffer = this.changePM(geom, this._targetPM);
      const bufGeom = BufferOp.bufferOp(geomToBuffer, 0);
      return bufGeom;
    }

    reducePointwise(geom) {
      let geomEdit = null;

      if (this._changePrecisionModel) {
        const newFactory = this.createFactory(geom.getFactory(), this._targetPM);
        geomEdit = new GeometryEditor(newFactory);
      } else {
        geomEdit = new GeometryEditor();
      }

      let finalRemoveCollapsed = this._removeCollapsed;
      if (geom.getDimension() >= 2) finalRemoveCollapsed = true;
      const reduceGeom = geomEdit.edit(geom, new PrecisionReducerCoordinateOperation(this._targetPM, finalRemoveCollapsed));
      return reduceGeom;
    }

    changePM(geom, newPM) {
      const geomEditor = this.createEditor(geom.getFactory(), newPM);
      return geomEditor.edit(geom, new GeometryEditor.NoOpGeometryOperation());
    }

    setRemoveCollapsedComponents(removeCollapsed) {
      this._removeCollapsed = removeCollapsed;
    }

    createFactory(inputFactory, pm) {
      const newFactory = new GeometryFactory(pm, inputFactory.getSRID(), inputFactory.getCoordinateSequenceFactory());
      return newFactory;
    }

    setChangePrecisionModel(changePrecisionModel) {
      this._changePrecisionModel = changePrecisionModel;
    }

    reduce(geom) {
      const reducePW = this.reducePointwise(geom);
      if (this._isPointwise) return reducePW;
      if (!hasInterface(reducePW, Polygonal)) return reducePW;
      if (IsValidOp.isValid(reducePW)) return reducePW;
      return this.fixPolygonalTopology(reducePW);
    }

    setPointwise(isPointwise) {
      this._isPointwise = isPointwise;
    }

    createEditor(geomFactory, newPM) {
      if (geomFactory.getPrecisionModel() === newPM) return new GeometryEditor();
      const newFactory = this.createFactory(geomFactory, newPM);
      const geomEdit = new GeometryEditor(newFactory);
      return geomEdit;
    }

  }

  class FacetSequence {
    constructor() {
      FacetSequence.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geom = null;
      this._pts = null;
      this._start = null;
      this._end = null;

      if (arguments.length === 2) {
        const pts = arguments[0],
              start = arguments[1];
        this._pts = pts;
        this._start = start;
        this._end = start + 1;
      } else if (arguments.length === 3) {
        const pts = arguments[0],
              start = arguments[1],
              end = arguments[2];
        this._pts = pts;
        this._start = start;
        this._end = end;
      } else if (arguments.length === 4) {
        const geom = arguments[0],
              pts = arguments[1],
              start = arguments[2],
              end = arguments[3];
        this._geom = geom;
        this._pts = pts;
        this._start = start;
        this._end = end;
      }
    }

    computeDistanceLineLine(facetSeq, locs) {
      let minDistance = Double.MAX_VALUE;

      for (let i = this._start; i < this._end - 1; i++) {
        const p0 = this._pts.getCoordinate(i);

        const p1 = this._pts.getCoordinate(i + 1);

        for (let j = facetSeq._start; j < facetSeq._end - 1; j++) {
          const q0 = facetSeq._pts.getCoordinate(j);

          const q1 = facetSeq._pts.getCoordinate(j + 1);

          const dist = Distance.segmentToSegment(p0, p1, q0, q1);

          if (dist < minDistance) {
            minDistance = dist;
            if (locs !== null) this.updateNearestLocationsLineLine(i, p0, p1, facetSeq, j, q0, q1, locs);
            if (minDistance <= 0.0) return minDistance;
          }
        }
      }

      return minDistance;
    }

    updateNearestLocationsPointLine(pt, facetSeq, i, q0, q1, locs) {
      locs[0] = new GeometryLocation(this._geom, this._start, new Coordinate(pt));
      const seg = new LineSegment(q0, q1);
      const segClosestPoint = seg.closestPoint(pt);
      locs[1] = new GeometryLocation(facetSeq._geom, i, new Coordinate(segClosestPoint));
    }

    size() {
      return this._end - this._start;
    }

    getCoordinate(index) {
      return this._pts.getCoordinate(this._start + index);
    }

    nearestLocations(facetSeq) {
      const isPoint = this.isPoint();
      const isPointOther = facetSeq.isPoint();
      const locs = new Array(2).fill(null);

      if (isPoint && isPointOther) {
        const pt = this._pts.getCoordinate(this._start);

        const seqPt = facetSeq._pts.getCoordinate(facetSeq._start);

        locs[0] = new GeometryLocation(this._geom, this._start, new Coordinate(pt));
        locs[1] = new GeometryLocation(facetSeq._geom, facetSeq._start, new Coordinate(seqPt));
      } else if (isPoint) {
        const pt = this._pts.getCoordinate(this._start);

        this.computeDistancePointLine(pt, facetSeq, locs);
      } else if (isPointOther) {
        const seqPt = facetSeq._pts.getCoordinate(facetSeq._start);

        this.computeDistancePointLine(seqPt, this, locs);
        const tmp = locs[0];
        locs[0] = locs[1];
        locs[1] = tmp;
      } else {
        this.computeDistanceLineLine(facetSeq, locs);
      }

      return locs;
    }

    getEnvelope() {
      const env = new Envelope();

      for (let i = this._start; i < this._end; i++) env.expandToInclude(this._pts.getX(i), this._pts.getY(i));

      return env;
    }

    updateNearestLocationsLineLine(i, p0, p1, facetSeq, j, q0, q1, locs) {
      const seg0 = new LineSegment(p0, p1);
      const seg1 = new LineSegment(q0, q1);
      const closestPt = seg0.closestPoints(seg1);
      locs[0] = new GeometryLocation(this._geom, i, new Coordinate(closestPt[0]));
      locs[1] = new GeometryLocation(facetSeq._geom, j, new Coordinate(closestPt[1]));
    }

    toString() {
      const buf = new StringBuffer();
      buf.append('LINESTRING ( ');
      const p = new Coordinate();

      for (let i = this._start; i < this._end; i++) {
        if (i > this._start) buf.append(', ');

        this._pts.getCoordinate(i, p);

        buf.append(p.x + ' ' + p.y);
      }

      buf.append(' )');
      return buf.toString();
    }

    computeDistancePointLine(pt, facetSeq, locs) {
      let minDistance = Double.MAX_VALUE;

      for (let i = facetSeq._start; i < facetSeq._end - 1; i++) {
        const q0 = facetSeq._pts.getCoordinate(i);

        const q1 = facetSeq._pts.getCoordinate(i + 1);

        const dist = Distance.pointToSegment(pt, q0, q1);

        if (dist < minDistance) {
          minDistance = dist;
          if (locs !== null) this.updateNearestLocationsPointLine(pt, facetSeq, i, q0, q1, locs);
          if (minDistance <= 0.0) return minDistance;
        }
      }

      return minDistance;
    }

    isPoint() {
      return this._end - this._start === 1;
    }

    distance(facetSeq) {
      const isPoint = this.isPoint();
      const isPointOther = facetSeq.isPoint();
      let distance = null;

      if (isPoint && isPointOther) {
        const pt = this._pts.getCoordinate(this._start);

        const seqPt = facetSeq._pts.getCoordinate(facetSeq._start);

        distance = pt.distance(seqPt);
      } else if (isPoint) {
        const pt = this._pts.getCoordinate(this._start);

        distance = this.computeDistancePointLine(pt, facetSeq, null);
      } else if (isPointOther) {
        const seqPt = facetSeq._pts.getCoordinate(facetSeq._start);

        distance = this.computeDistancePointLine(seqPt, this, null);
      } else {
        distance = this.computeDistanceLineLine(facetSeq, null);
      }

      return distance;
    }

  }

  class FacetSequenceTreeBuilder {
    static addFacetSequences(geom, pts, sections) {
      let i = 0;
      const size = pts.size();

      while (i <= size - 1) {
        let end = i + FacetSequenceTreeBuilder.FACET_SEQUENCE_SIZE + 1;
        if (end >= size - 1) end = size;
        const sect = new FacetSequence(geom, pts, i, end);
        sections.add(sect);
        i = i + FacetSequenceTreeBuilder.FACET_SEQUENCE_SIZE;
      }
    }

    static computeFacetSequences(g) {
      const sections = new ArrayList();
      g.apply(new class {
        get interfaces_() {
          return [GeometryComponentFilter];
        }

        filter(geom) {
          let seq = null;

          if (geom instanceof LineString) {
            seq = geom.getCoordinateSequence();
            FacetSequenceTreeBuilder.addFacetSequences(geom, seq, sections);
          } else if (geom instanceof Point) {
            seq = geom.getCoordinateSequence();
            FacetSequenceTreeBuilder.addFacetSequences(geom, seq, sections);
          }
        }

      }());
      return sections;
    }

    static build(g) {
      const tree = new STRtree(FacetSequenceTreeBuilder.STR_TREE_NODE_CAPACITY);
      const sections = FacetSequenceTreeBuilder.computeFacetSequences(g);

      for (let i = sections.iterator(); i.hasNext();) {
        const section = i.next();
        tree.insert(section.getEnvelope(), section);
      }

      tree.build();
      return tree;
    }

  }
  FacetSequenceTreeBuilder.FACET_SEQUENCE_SIZE = 6;
  FacetSequenceTreeBuilder.STR_TREE_NODE_CAPACITY = 4;

  class MinimumClearance {
    constructor() {
      MinimumClearance.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputGeom = null;
      this._minClearance = null;
      this._minClearancePts = null;
      const geom = arguments[0];
      this._inputGeom = geom;
    }

    static getLine(g) {
      const rp = new MinimumClearance(g);
      return rp.getLine();
    }

    static getDistance(g) {
      const rp = new MinimumClearance(g);
      return rp.getDistance();
    }

    getLine() {
      this.compute();
      if (this._minClearancePts === null || this._minClearancePts[0] === null) return this._inputGeom.getFactory().createLineString();
      return this._inputGeom.getFactory().createLineString(this._minClearancePts);
    }

    compute() {
      if (this._minClearancePts !== null) return null;
      this._minClearancePts = new Array(2).fill(null);
      this._minClearance = Double.MAX_VALUE;
      if (this._inputGeom.isEmpty()) return null;
      const geomTree = FacetSequenceTreeBuilder.build(this._inputGeom);
      const nearest = geomTree.nearestNeighbour(new MinClearanceDistance());
      const mcd = new MinClearanceDistance();
      this._minClearance = mcd.distance(nearest[0], nearest[1]);
      this._minClearancePts = mcd.getCoordinates();
    }

    getDistance() {
      this.compute();
      return this._minClearance;
    }

  }

  class MinClearanceDistance {
    constructor() {
      MinClearanceDistance.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._minDist = Double.MAX_VALUE;
      this._minPts = new Array(2).fill(null);
    }

    vertexDistance(fs1, fs2) {
      for (let i1 = 0; i1 < fs1.size(); i1++) for (let i2 = 0; i2 < fs2.size(); i2++) {
        const p1 = fs1.getCoordinate(i1);
        const p2 = fs2.getCoordinate(i2);

        if (!p1.equals2D(p2)) {
          const d = p1.distance(p2);

          if (d < this._minDist) {
            this._minDist = d;
            this._minPts[0] = p1;
            this._minPts[1] = p2;
            if (d === 0.0) return d;
          }
        }
      }

      return this._minDist;
    }

    getCoordinates() {
      return this._minPts;
    }

    segmentDistance(fs1, fs2) {
      for (let i1 = 0; i1 < fs1.size(); i1++) for (let i2 = 1; i2 < fs2.size(); i2++) {
        const p = fs1.getCoordinate(i1);
        const seg0 = fs2.getCoordinate(i2 - 1);
        const seg1 = fs2.getCoordinate(i2);

        if (!(p.equals2D(seg0) || p.equals2D(seg1))) {
          const d = Distance.pointToSegment(p, seg0, seg1);

          if (d < this._minDist) {
            this._minDist = d;
            this.updatePts(p, seg0, seg1);
            if (d === 0.0) return d;
          }
        }
      }

      return this._minDist;
    }

    distance() {
      if (arguments[0] instanceof ItemBoundable && arguments[1] instanceof ItemBoundable) {
        const b1 = arguments[0],
              b2 = arguments[1];
        const fs1 = b1.getItem();
        const fs2 = b2.getItem();
        this._minDist = Double.MAX_VALUE;
        return this.distance(fs1, fs2);
      } else if (arguments[0] instanceof FacetSequence && arguments[1] instanceof FacetSequence) {
        const fs1 = arguments[0],
              fs2 = arguments[1];
        this.vertexDistance(fs1, fs2);
        if (fs1.size() === 1 && fs2.size() === 1) return this._minDist;
        if (this._minDist <= 0.0) return this._minDist;
        this.segmentDistance(fs1, fs2);
        if (this._minDist <= 0.0) return this._minDist;
        this.segmentDistance(fs2, fs1);
        return this._minDist;
      }
    }

    updatePts(p, seg0, seg1) {
      this._minPts[0] = p;
      const seg = new LineSegment(seg0, seg1);
      this._minPts[1] = new Coordinate(seg.closestPoint(p));
    }

    get interfaces_() {
      return [ItemDistance];
    }

  }

  MinimumClearance.MinClearanceDistance = MinClearanceDistance;

  class SimpleMinimumClearance {
    constructor() {
      SimpleMinimumClearance.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputGeom = null;
      this._minClearance = null;
      this._minClearancePts = null;
      const geom = arguments[0];
      this._inputGeom = geom;
    }

    static getLine(g) {
      const rp = new SimpleMinimumClearance(g);
      return rp.getLine();
    }

    static getDistance(g) {
      const rp = new SimpleMinimumClearance(g);
      return rp.getDistance();
    }

    getLine() {
      this.compute();
      return this._inputGeom.getFactory().createLineString(this._minClearancePts);
    }

    updateClearance() {
      if (arguments.length === 3) {
        const candidateValue = arguments[0],
              p0 = arguments[1],
              p1 = arguments[2];

        if (candidateValue < this._minClearance) {
          this._minClearance = candidateValue;
          this._minClearancePts[0] = new Coordinate(p0);
          this._minClearancePts[1] = new Coordinate(p1);
        }
      } else if (arguments.length === 4) {
        const candidateValue = arguments[0],
              p = arguments[1],
              seg0 = arguments[2],
              seg1 = arguments[3];

        if (candidateValue < this._minClearance) {
          this._minClearance = candidateValue;
          this._minClearancePts[0] = new Coordinate(p);
          const seg = new LineSegment(seg0, seg1);
          this._minClearancePts[1] = new Coordinate(seg.closestPoint(p));
        }
      }
    }

    compute() {
      if (this._minClearancePts !== null) return null;
      this._minClearancePts = new Array(2).fill(null);
      this._minClearance = Double.MAX_VALUE;

      this._inputGeom.apply(new VertexCoordinateFilter(this));
    }

    getDistance() {
      this.compute();
      return this._minClearance;
    }

  }

  class VertexCoordinateFilter {
    constructor() {
      VertexCoordinateFilter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.smc = null;
      const smc = arguments[0];
      this.smc = smc;
    }

    filter(coord) {
      this.smc._inputGeom.apply(new ComputeMCCoordinateSequenceFilter(this.smc, coord));
    }

    get interfaces_() {
      return [CoordinateFilter];
    }

  }

  class ComputeMCCoordinateSequenceFilter {
    constructor() {
      ComputeMCCoordinateSequenceFilter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.smc = null;
      this._queryPt = null;
      const smc = arguments[0],
            queryPt = arguments[1];
      this.smc = smc;
      this._queryPt = queryPt;
    }

    isGeometryChanged() {
      return false;
    }

    checkVertexDistance(vertex) {
      const vertexDist = vertex.distance(this._queryPt);
      if (vertexDist > 0) this.smc.updateClearance(vertexDist, this._queryPt, vertex);
    }

    filter(seq, i) {
      this.checkVertexDistance(seq.getCoordinate(i));
      if (i > 0) this.checkSegmentDistance(seq.getCoordinate(i - 1), seq.getCoordinate(i));
    }

    checkSegmentDistance(seg0, seg1) {
      if (this._queryPt.equals2D(seg0) || this._queryPt.equals2D(seg1)) return null;
      const segDist = Distance.pointToSegment(this._queryPt, seg1, seg0);
      if (segDist > 0) this.smc.updateClearance(segDist, this._queryPt, seg1, seg0);
    }

    isDone() {
      return false;
    }

    get interfaces_() {
      return [CoordinateSequenceFilter];
    }

  }

  SimpleMinimumClearance.VertexCoordinateFilter = VertexCoordinateFilter;
  SimpleMinimumClearance.ComputeMCCoordinateSequenceFilter = ComputeMCCoordinateSequenceFilter;

  var precision = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CommonBits: CommonBits,
    CommonBitsOp: CommonBitsOp,
    CommonBitsRemover: CommonBitsRemover,
    EnhancedPrecisionOp: EnhancedPrecisionOp,
    GeometryPrecisionReducer: GeometryPrecisionReducer,
    MinimumClearance: MinimumClearance,
    SimpleMinimumClearance: SimpleMinimumClearance
  });

  class DouglasPeuckerLineSimplifier {
    constructor() {
      DouglasPeuckerLineSimplifier.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pts = null;
      this._usePt = null;
      this._distanceTolerance = null;
      this._seg = new LineSegment();
      const pts = arguments[0];
      this._pts = pts;
    }

    static simplify(pts, distanceTolerance) {
      const simp = new DouglasPeuckerLineSimplifier(pts);
      simp.setDistanceTolerance(distanceTolerance);
      return simp.simplify();
    }

    simplifySection(i, j) {
      if (i + 1 === j) return null;
      this._seg.p0 = this._pts[i];
      this._seg.p1 = this._pts[j];
      let maxDistance = -1.0;
      let maxIndex = i;

      for (let k = i + 1; k < j; k++) {
        const distance = this._seg.distance(this._pts[k]);

        if (distance > maxDistance) {
          maxDistance = distance;
          maxIndex = k;
        }
      }

      if (maxDistance <= this._distanceTolerance) {
        for (let k = i + 1; k < j; k++) this._usePt[k] = false;
      } else {
        this.simplifySection(i, maxIndex);
        this.simplifySection(maxIndex, j);
      }
    }

    setDistanceTolerance(distanceTolerance) {
      this._distanceTolerance = distanceTolerance;
    }

    simplify() {
      this._usePt = new Array(this._pts.length).fill(null);

      for (let i = 0; i < this._pts.length; i++) this._usePt[i] = true;

      this.simplifySection(0, this._pts.length - 1);
      const coordList = new CoordinateList();

      for (let i = 0; i < this._pts.length; i++) if (this._usePt[i]) coordList.add(new Coordinate(this._pts[i]));

      return coordList.toCoordinateArray();
    }

  }

  class DouglasPeuckerSimplifier {
    constructor() {
      DouglasPeuckerSimplifier.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputGeom = null;
      this._distanceTolerance = null;
      this._isEnsureValidTopology = true;
      const inputGeom = arguments[0];
      this._inputGeom = inputGeom;
    }

    static simplify(geom, distanceTolerance) {
      const tss = new DouglasPeuckerSimplifier(geom);
      tss.setDistanceTolerance(distanceTolerance);
      return tss.getResultGeometry();
    }

    setEnsureValid(isEnsureValidTopology) {
      this._isEnsureValidTopology = isEnsureValidTopology;
    }

    getResultGeometry() {
      if (this._inputGeom.isEmpty()) return this._inputGeom.copy();
      return new DPTransformer(this._isEnsureValidTopology, this._distanceTolerance).transform(this._inputGeom);
    }

    setDistanceTolerance(distanceTolerance) {
      if (distanceTolerance < 0.0) throw new IllegalArgumentException('Tolerance must be non-negative');
      this._distanceTolerance = distanceTolerance;
    }

  }

  class DPTransformer extends GeometryTransformer {
    constructor() {
      super();
      DPTransformer.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._isEnsureValidTopology = true;
      this._distanceTolerance = null;
      const isEnsureValidTopology = arguments[0],
            distanceTolerance = arguments[1];
      this._isEnsureValidTopology = isEnsureValidTopology;
      this._distanceTolerance = distanceTolerance;
    }

    transformPolygon(geom, parent) {
      if (geom.isEmpty()) return null;
      const rawGeom = super.transformPolygon.call(this, geom, parent);
      if (parent instanceof MultiPolygon) return rawGeom;
      return this.createValidArea(rawGeom);
    }

    createValidArea(rawAreaGeom) {
      if (this._isEnsureValidTopology) return rawAreaGeom.buffer(0.0);
      return rawAreaGeom;
    }

    transformCoordinates(coords, parent) {
      const inputPts = coords.toCoordinateArray();
      let newPts = null;
      if (inputPts.length === 0) newPts = new Array(0).fill(null);else newPts = DouglasPeuckerLineSimplifier.simplify(inputPts, this._distanceTolerance);
      return this._factory.getCoordinateSequenceFactory().create(newPts);
    }

    transformMultiPolygon(geom, parent) {
      const rawGeom = super.transformMultiPolygon.call(this, geom, parent);
      return this.createValidArea(rawGeom);
    }

    transformLinearRing(geom, parent) {
      const removeDegenerateRings = parent instanceof Polygon;
      const simpResult = super.transformLinearRing.call(this, geom, parent);
      if (removeDegenerateRings && !(simpResult instanceof LinearRing)) return null;
      return simpResult;
    }

  }

  DouglasPeuckerSimplifier.DPTransformer = DPTransformer;

  class TaggedLineSegment extends LineSegment {
    constructor() {
      super();
      TaggedLineSegment.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._parent = null;
      this._index = null;

      if (arguments.length === 2) {
        const p0 = arguments[0],
              p1 = arguments[1];
        TaggedLineSegment.constructor_.call(this, p0, p1, null, -1);
      } else if (arguments.length === 4) {
        const p0 = arguments[0],
              p1 = arguments[1],
              parent = arguments[2],
              index = arguments[3];
        LineSegment.constructor_.call(this, p0, p1);
        this._parent = parent;
        this._index = index;
      }
    }

    getIndex() {
      return this._index;
    }

    getParent() {
      return this._parent;
    }

  }

  class TaggedLineString {
    constructor() {
      TaggedLineString.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._parentLine = null;
      this._segs = null;
      this._resultSegs = new ArrayList();
      this._minimumSize = null;

      if (arguments.length === 1) {
        const parentLine = arguments[0];
        TaggedLineString.constructor_.call(this, parentLine, 2);
      } else if (arguments.length === 2) {
        const parentLine = arguments[0],
              minimumSize = arguments[1];
        this._parentLine = parentLine;
        this._minimumSize = minimumSize;
        this.init();
      }
    }

    static extractCoordinates(segs) {
      const pts = new Array(segs.size() + 1).fill(null);
      let seg = null;

      for (let i = 0; i < segs.size(); i++) {
        seg = segs.get(i);
        pts[i] = seg.p0;
      }

      pts[pts.length - 1] = seg.p1;
      return pts;
    }

    addToResult(seg) {
      this._resultSegs.add(seg);
    }

    asLineString() {
      return this._parentLine.getFactory().createLineString(TaggedLineString.extractCoordinates(this._resultSegs));
    }

    getResultSize() {
      const resultSegsSize = this._resultSegs.size();

      return resultSegsSize === 0 ? 0 : resultSegsSize + 1;
    }

    getParent() {
      return this._parentLine;
    }

    getSegment(i) {
      return this._segs[i];
    }

    getParentCoordinates() {
      return this._parentLine.getCoordinates();
    }

    getMinimumSize() {
      return this._minimumSize;
    }

    asLinearRing() {
      return this._parentLine.getFactory().createLinearRing(TaggedLineString.extractCoordinates(this._resultSegs));
    }

    getSegments() {
      return this._segs;
    }

    init() {
      const pts = this._parentLine.getCoordinates();

      this._segs = new Array(pts.length - 1).fill(null);

      for (let i = 0; i < pts.length - 1; i++) {
        const seg = new TaggedLineSegment(pts[i], pts[i + 1], this._parentLine, i);
        this._segs[i] = seg;
      }
    }

    getResultCoordinates() {
      return TaggedLineString.extractCoordinates(this._resultSegs);
    }

  }

  class LineSegmentIndex {
    constructor() {
      LineSegmentIndex.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._index = new Quadtree();
    }

    remove(seg) {
      this._index.remove(new Envelope(seg.p0, seg.p1), seg);
    }

    add() {
      if (arguments[0] instanceof TaggedLineString) {
        const line = arguments[0];
        const segs = line.getSegments();

        for (let i = 0; i < segs.length; i++) {
          const seg = segs[i];
          this.add(seg);
        }
      } else if (arguments[0] instanceof LineSegment) {
        const seg = arguments[0];

        this._index.insert(new Envelope(seg.p0, seg.p1), seg);
      }
    }

    query(querySeg) {
      const env = new Envelope(querySeg.p0, querySeg.p1);
      const visitor = new LineSegmentVisitor(querySeg);

      this._index.query(env, visitor);

      const itemsFound = visitor.getItems();
      return itemsFound;
    }

  }

  class LineSegmentVisitor {
    constructor() {
      LineSegmentVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._querySeg = null;
      this._items = new ArrayList();
      const querySeg = arguments[0];
      this._querySeg = querySeg;
    }

    visitItem(item) {
      const seg = item;
      if (Envelope.intersects(seg.p0, seg.p1, this._querySeg.p0, this._querySeg.p1)) this._items.add(item);
    }

    getItems() {
      return this._items;
    }

    get interfaces_() {
      return [ItemVisitor];
    }

  }

  class TaggedLineStringSimplifier {
    constructor() {
      TaggedLineStringSimplifier.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._li = new RobustLineIntersector();
      this._inputIndex = new LineSegmentIndex();
      this._outputIndex = new LineSegmentIndex();
      this._line = null;
      this._linePts = null;
      this._distanceTolerance = 0.0;
      const inputIndex = arguments[0],
            outputIndex = arguments[1];
      this._inputIndex = inputIndex;
      this._outputIndex = outputIndex;
    }

    static isInLineSection(line, sectionIndex, seg) {
      if (seg.getParent() !== line.getParent()) return false;
      const segIndex = seg.getIndex();
      if (segIndex >= sectionIndex[0] && segIndex < sectionIndex[1]) return true;
      return false;
    }

    flatten(start, end) {
      const p0 = this._linePts[start];
      const p1 = this._linePts[end];
      const newSeg = new LineSegment(p0, p1);
      this.remove(this._line, start, end);

      this._outputIndex.add(newSeg);

      return newSeg;
    }

    hasBadIntersection(parentLine, sectionIndex, candidateSeg) {
      if (this.hasBadOutputIntersection(candidateSeg)) return true;
      if (this.hasBadInputIntersection(parentLine, sectionIndex, candidateSeg)) return true;
      return false;
    }

    setDistanceTolerance(distanceTolerance) {
      this._distanceTolerance = distanceTolerance;
    }

    simplifySection(i, j, depth) {
      depth += 1;
      const sectionIndex = new Array(2).fill(null);

      if (i + 1 === j) {
        const newSeg = this._line.getSegment(i);

        this._line.addToResult(newSeg);

        return null;
      }

      let isValidToSimplify = true;

      if (this._line.getResultSize() < this._line.getMinimumSize()) {
        const worstCaseSize = depth + 1;
        if (worstCaseSize < this._line.getMinimumSize()) isValidToSimplify = false;
      }

      const distance = new Array(1).fill(null);
      const furthestPtIndex = this.findFurthestPoint(this._linePts, i, j, distance);
      if (distance[0] > this._distanceTolerance) isValidToSimplify = false;
      const candidateSeg = new LineSegment();
      candidateSeg.p0 = this._linePts[i];
      candidateSeg.p1 = this._linePts[j];
      sectionIndex[0] = i;
      sectionIndex[1] = j;
      if (this.hasBadIntersection(this._line, sectionIndex, candidateSeg)) isValidToSimplify = false;

      if (isValidToSimplify) {
        const newSeg = this.flatten(i, j);

        this._line.addToResult(newSeg);

        return null;
      }

      this.simplifySection(i, furthestPtIndex, depth);
      this.simplifySection(furthestPtIndex, j, depth);
    }

    hasBadOutputIntersection(candidateSeg) {
      const querySegs = this._outputIndex.query(candidateSeg);

      for (let i = querySegs.iterator(); i.hasNext();) {
        const querySeg = i.next();
        if (this.hasInteriorIntersection(querySeg, candidateSeg)) return true;
      }

      return false;
    }

    findFurthestPoint(pts, i, j, maxDistance) {
      const seg = new LineSegment();
      seg.p0 = pts[i];
      seg.p1 = pts[j];
      let maxDist = -1.0;
      let maxIndex = i;

      for (let k = i + 1; k < j; k++) {
        const midPt = pts[k];
        const distance = seg.distance(midPt);

        if (distance > maxDist) {
          maxDist = distance;
          maxIndex = k;
        }
      }

      maxDistance[0] = maxDist;
      return maxIndex;
    }

    simplify(line) {
      this._line = line;
      this._linePts = line.getParentCoordinates();
      this.simplifySection(0, this._linePts.length - 1, 0);
    }

    remove(line, start, end) {
      for (let i = start; i < end; i++) {
        const seg = line.getSegment(i);

        this._inputIndex.remove(seg);
      }
    }

    hasInteriorIntersection(seg0, seg1) {
      this._li.computeIntersection(seg0.p0, seg0.p1, seg1.p0, seg1.p1);

      return this._li.isInteriorIntersection();
    }

    hasBadInputIntersection(parentLine, sectionIndex, candidateSeg) {
      const querySegs = this._inputIndex.query(candidateSeg);

      for (let i = querySegs.iterator(); i.hasNext();) {
        const querySeg = i.next();

        if (this.hasInteriorIntersection(querySeg, candidateSeg)) {
          if (TaggedLineStringSimplifier.isInLineSection(parentLine, sectionIndex, querySeg)) continue;
          return true;
        }
      }

      return false;
    }

  }

  class TaggedLinesSimplifier {
    constructor() {
      TaggedLinesSimplifier.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputIndex = new LineSegmentIndex();
      this._outputIndex = new LineSegmentIndex();
      this._distanceTolerance = 0.0;
    }

    setDistanceTolerance(distanceTolerance) {
      this._distanceTolerance = distanceTolerance;
    }

    simplify(taggedLines) {
      for (let i = taggedLines.iterator(); i.hasNext();) this._inputIndex.add(i.next());

      for (let i = taggedLines.iterator(); i.hasNext();) {
        const tlss = new TaggedLineStringSimplifier(this._inputIndex, this._outputIndex);
        tlss.setDistanceTolerance(this._distanceTolerance);
        tlss.simplify(i.next());
      }
    }

  }

  class TopologyPreservingSimplifier {
    constructor() {
      TopologyPreservingSimplifier.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputGeom = null;
      this._lineSimplifier = new TaggedLinesSimplifier();
      this._linestringMap = null;
      const inputGeom = arguments[0];
      this._inputGeom = inputGeom;
    }

    static simplify(geom, distanceTolerance) {
      const tss = new TopologyPreservingSimplifier(geom);
      tss.setDistanceTolerance(distanceTolerance);
      return tss.getResultGeometry();
    }

    getResultGeometry() {
      if (this._inputGeom.isEmpty()) return this._inputGeom.copy();
      this._linestringMap = new HashMap();

      this._inputGeom.apply(new LineStringMapBuilderFilter(this));

      this._lineSimplifier.simplify(this._linestringMap.values());

      const result = new LineStringTransformer(this._linestringMap).transform(this._inputGeom);
      return result;
    }

    setDistanceTolerance(distanceTolerance) {
      if (distanceTolerance < 0.0) throw new IllegalArgumentException('Tolerance must be non-negative');

      this._lineSimplifier.setDistanceTolerance(distanceTolerance);
    }

  }

  class LineStringTransformer extends GeometryTransformer {
    constructor() {
      super();
      LineStringTransformer.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._linestringMap = null;
      const linestringMap = arguments[0];
      this._linestringMap = linestringMap;
    }

    transformCoordinates(coords, parent) {
      if (coords.size() === 0) return null;

      if (parent instanceof LineString) {
        const taggedLine = this._linestringMap.get(parent);

        return this.createCoordinateSequence(taggedLine.getResultCoordinates());
      }

      return super.transformCoordinates.call(this, coords, parent);
    }

  }

  class LineStringMapBuilderFilter {
    constructor() {
      LineStringMapBuilderFilter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.tps = null;
      const tps = arguments[0];
      this.tps = tps;
    }

    filter(geom) {
      if (geom instanceof LineString) {
        const line = geom;
        if (line.isEmpty()) return null;
        const minSize = line.isClosed() ? 4 : 2;
        const taggedLine = new TaggedLineString(line, minSize);

        this.tps._linestringMap.put(line, taggedLine);
      }
    }

    get interfaces_() {
      return [GeometryComponentFilter];
    }

  }

  TopologyPreservingSimplifier.LineStringTransformer = LineStringTransformer;
  TopologyPreservingSimplifier.LineStringMapBuilderFilter = LineStringMapBuilderFilter;

  class VWLineSimplifier {
    constructor() {
      VWLineSimplifier.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pts = null;
      this._tolerance = null;
      const pts = arguments[0],
            distanceTolerance = arguments[1];
      this._pts = pts;
      this._tolerance = distanceTolerance * distanceTolerance;
    }

    static simplify(pts, distanceTolerance) {
      const simp = new VWLineSimplifier(pts, distanceTolerance);
      return simp.simplify();
    }

    simplifyVertex(vwLine) {
      let curr = vwLine;
      let minArea = curr.getArea();
      let minVertex = null;

      while (curr !== null) {
        const area = curr.getArea();

        if (area < minArea) {
          minArea = area;
          minVertex = curr;
        }

        curr = curr._next;
      }

      if (minVertex !== null && minArea < this._tolerance) minVertex.remove();
      if (!vwLine.isLive()) return -1;
      return minArea;
    }

    simplify() {
      const vwLine = VWVertex.buildLine(this._pts);
      let minArea = this._tolerance;

      do minArea = this.simplifyVertex(vwLine); while (minArea < this._tolerance);

      const simp = vwLine.getCoordinates();
      if (simp.length < 2) return [simp[0], new Coordinate(simp[0])];
      return simp;
    }

  }

  class VWVertex {
    constructor() {
      VWVertex.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pt = null;
      this._prev = null;
      this._next = null;
      this._area = VWVertex.MAX_AREA;
      this._isLive = true;
      const pt = arguments[0];
      this._pt = pt;
    }

    static buildLine(pts) {
      let first = null;
      let prev = null;

      for (let i = 0; i < pts.length; i++) {
        const v = new VWVertex(pts[i]);
        if (first === null) first = v;
        v.setPrev(prev);

        if (prev !== null) {
          prev.setNext(v);
          prev.updateArea();
        }

        prev = v;
      }

      return first;
    }

    getCoordinates() {
      const coords = new CoordinateList();
      let curr = this;

      do {
        coords.add(curr._pt, false);
        curr = curr._next;
      } while (curr !== null);

      return coords.toCoordinateArray();
    }

    getArea() {
      return this._area;
    }

    updateArea() {
      if (this._prev === null || this._next === null) {
        this._area = VWVertex.MAX_AREA;
        return null;
      }

      this._area = Math.abs(Triangle.area(this._prev._pt, this._pt, this._next._pt));
    }

    remove() {
      const tmpPrev = this._prev;
      const tmpNext = this._next;
      let result = null;

      if (this._prev !== null) {
        this._prev.setNext(tmpNext);

        this._prev.updateArea();

        result = this._prev;
      }

      if (this._next !== null) {
        this._next.setPrev(tmpPrev);

        this._next.updateArea();

        if (result === null) result = this._next;
      }

      this._isLive = false;
      return result;
    }

    isLive() {
      return this._isLive;
    }

    setPrev(prev) {
      this._prev = prev;
    }

    setNext(next) {
      this._next = next;
    }

  }

  VWVertex.MAX_AREA = Double.MAX_VALUE;
  VWLineSimplifier.VWVertex = VWVertex;

  class VWSimplifier {
    constructor() {
      VWSimplifier.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._inputGeom = null;
      this._distanceTolerance = null;
      this._isEnsureValidTopology = true;
      const inputGeom = arguments[0];
      this._inputGeom = inputGeom;
    }

    static simplify(geom, distanceTolerance) {
      const simp = new VWSimplifier(geom);
      simp.setDistanceTolerance(distanceTolerance);
      return simp.getResultGeometry();
    }

    setEnsureValid(isEnsureValidTopology) {
      this._isEnsureValidTopology = isEnsureValidTopology;
    }

    getResultGeometry() {
      if (this._inputGeom.isEmpty()) return this._inputGeom.copy();
      return new VWTransformer(this._isEnsureValidTopology, this._distanceTolerance).transform(this._inputGeom);
    }

    setDistanceTolerance(distanceTolerance) {
      if (distanceTolerance < 0.0) throw new IllegalArgumentException('Tolerance must be non-negative');
      this._distanceTolerance = distanceTolerance;
    }

  }

  class VWTransformer extends GeometryTransformer {
    constructor() {
      super();
      VWTransformer.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._isEnsureValidTopology = true;
      this._distanceTolerance = null;
      const isEnsureValidTopology = arguments[0],
            distanceTolerance = arguments[1];
      this._isEnsureValidTopology = isEnsureValidTopology;
      this._distanceTolerance = distanceTolerance;
    }

    transformPolygon(geom, parent) {
      if (geom.isEmpty()) return null;
      const rawGeom = super.transformPolygon.call(this, geom, parent);
      if (parent instanceof MultiPolygon) return rawGeom;
      return this.createValidArea(rawGeom);
    }

    createValidArea(rawAreaGeom) {
      if (this._isEnsureValidTopology) return rawAreaGeom.buffer(0.0);
      return rawAreaGeom;
    }

    transformCoordinates(coords, parent) {
      const inputPts = coords.toCoordinateArray();
      let newPts = null;
      if (inputPts.length === 0) newPts = new Array(0).fill(null);else newPts = VWLineSimplifier.simplify(inputPts, this._distanceTolerance);
      return this._factory.getCoordinateSequenceFactory().create(newPts);
    }

    transformMultiPolygon(geom, parent) {
      const rawGeom = super.transformMultiPolygon.call(this, geom, parent);
      return this.createValidArea(rawGeom);
    }

    transformLinearRing(geom, parent) {
      const removeDegenerateRings = parent instanceof Polygon;
      const simpResult = super.transformLinearRing.call(this, geom, parent);
      if (removeDegenerateRings && !(simpResult instanceof LinearRing)) return null;
      return simpResult;
    }

  }

  VWSimplifier.VWTransformer = VWTransformer;

  var simplify = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DouglasPeuckerSimplifier: DouglasPeuckerSimplifier,
    TopologyPreservingSimplifier: TopologyPreservingSimplifier,
    VWSimplifier: VWSimplifier
  });

  class SplitSegment {
    constructor() {
      SplitSegment.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._seg = null;
      this._segLen = null;
      this._splitPt = null;
      this._minimumLen = 0.0;
      const seg = arguments[0];
      this._seg = seg;
      this._segLen = seg.getLength();
    }

    static pointAlongReverse(seg, segmentLengthFraction) {
      const coord = new Coordinate();
      coord.x = seg.p1.x - segmentLengthFraction * (seg.p1.x - seg.p0.x);
      coord.y = seg.p1.y - segmentLengthFraction * (seg.p1.y - seg.p0.y);
      return coord;
    }

    splitAt() {
      if (arguments.length === 1) {
        const pt = arguments[0];
        const minFrac = this._minimumLen / this._segLen;

        if (pt.distance(this._seg.p0) < this._minimumLen) {
          this._splitPt = this._seg.pointAlong(minFrac);
          return null;
        }

        if (pt.distance(this._seg.p1) < this._minimumLen) {
          this._splitPt = SplitSegment.pointAlongReverse(this._seg, minFrac);
          return null;
        }

        this._splitPt = pt;
      } else if (arguments.length === 2) {
        const length = arguments[0],
              endPt = arguments[1];
        const actualLen = this.getConstrainedLength(length);
        const frac = actualLen / this._segLen;
        if (endPt.equals2D(this._seg.p0)) this._splitPt = this._seg.pointAlong(frac);else this._splitPt = SplitSegment.pointAlongReverse(this._seg, frac);
      }
    }

    setMinimumLength(minLen) {
      this._minimumLen = minLen;
    }

    getConstrainedLength(len) {
      if (len < this._minimumLen) return this._minimumLen;
      return len;
    }

    getSplitPoint() {
      return this._splitPt;
    }

  }

  class ConstraintSplitPointFinder {
    findSplitPoint(seg, encroachPt) {}

  }

  class NonEncroachingSplitPointFinder {
    static projectedSplitPoint(seg, encroachPt) {
      const lineSeg = seg.getLineSegment();
      const projPt = lineSeg.project(encroachPt);
      return projPt;
    }

    findSplitPoint(seg, encroachPt) {
      const lineSeg = seg.getLineSegment();
      const segLen = lineSeg.getLength();
      const midPtLen = segLen / 2;
      const splitSeg = new SplitSegment(lineSeg);
      const projPt = NonEncroachingSplitPointFinder.projectedSplitPoint(seg, encroachPt);
      const nonEncroachDiam = projPt.distance(encroachPt) * 2 * 0.8;
      let maxSplitLen = nonEncroachDiam;
      if (maxSplitLen > midPtLen) maxSplitLen = midPtLen;
      splitSeg.setMinimumLength(maxSplitLen);
      splitSeg.splitAt(projPt);
      return splitSeg.getSplitPoint();
    }

    get interfaces_() {
      return [ConstraintSplitPointFinder];
    }

  }

  class TrianglePredicate {
    static triArea(a, b, c) {
      return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    }

    static isInCircleDDNormalized(a, b, c, p) {
      const adx = DD.valueOf(a.x).selfSubtract(p.x);
      const ady = DD.valueOf(a.y).selfSubtract(p.y);
      const bdx = DD.valueOf(b.x).selfSubtract(p.x);
      const bdy = DD.valueOf(b.y).selfSubtract(p.y);
      const cdx = DD.valueOf(c.x).selfSubtract(p.x);
      const cdy = DD.valueOf(c.y).selfSubtract(p.y);
      const abdet = adx.multiply(bdy).selfSubtract(bdx.multiply(ady));
      const bcdet = bdx.multiply(cdy).selfSubtract(cdx.multiply(bdy));
      const cadet = cdx.multiply(ady).selfSubtract(adx.multiply(cdy));
      const alift = adx.multiply(adx).selfAdd(ady.multiply(ady));
      const blift = bdx.multiply(bdx).selfAdd(bdy.multiply(bdy));
      const clift = cdx.multiply(cdx).selfAdd(cdy.multiply(cdy));
      const sum = alift.selfMultiply(bcdet).selfAdd(blift.selfMultiply(cadet)).selfAdd(clift.selfMultiply(abdet));
      const isInCircle = sum.doubleValue() > 0;
      return isInCircle;
    }

    static checkRobustInCircle(a, b, c, p) {
      const nonRobustInCircle = TrianglePredicate.isInCircleNonRobust(a, b, c, p);
      const isInCircleDD = TrianglePredicate.isInCircleDDSlow(a, b, c, p);
      const isInCircleCC = TrianglePredicate.isInCircleCC(a, b, c, p);
      const circumCentre = Triangle.circumcentre(a, b, c);
      System.out.println('p radius diff a = ' + Math.abs(p.distance(circumCentre) - a.distance(circumCentre)) / a.distance(circumCentre));

      if (nonRobustInCircle !== isInCircleDD || nonRobustInCircle !== isInCircleCC) {
        System.out.println('inCircle robustness failure (double result = ' + nonRobustInCircle + ', DD result = ' + isInCircleDD + ', CC result = ' + isInCircleCC + ')');
        System.out.println(WKTWriter.toLineString(new CoordinateArraySequence([a, b, c, p])));
        System.out.println('Circumcentre = ' + WKTWriter.toPoint(circumCentre) + ' radius = ' + a.distance(circumCentre));
        System.out.println('p radius diff a = ' + Math.abs(p.distance(circumCentre) / a.distance(circumCentre) - 1));
        System.out.println('p radius diff b = ' + Math.abs(p.distance(circumCentre) / b.distance(circumCentre) - 1));
        System.out.println('p radius diff c = ' + Math.abs(p.distance(circumCentre) / c.distance(circumCentre) - 1));
        System.out.println();
      }
    }

    static isInCircleDDFast(a, b, c, p) {
      const aTerm = DD.sqr(a.x).selfAdd(DD.sqr(a.y)).selfMultiply(TrianglePredicate.triAreaDDFast(b, c, p));
      const bTerm = DD.sqr(b.x).selfAdd(DD.sqr(b.y)).selfMultiply(TrianglePredicate.triAreaDDFast(a, c, p));
      const cTerm = DD.sqr(c.x).selfAdd(DD.sqr(c.y)).selfMultiply(TrianglePredicate.triAreaDDFast(a, b, p));
      const pTerm = DD.sqr(p.x).selfAdd(DD.sqr(p.y)).selfMultiply(TrianglePredicate.triAreaDDFast(a, b, c));
      const sum = aTerm.selfSubtract(bTerm).selfAdd(cTerm).selfSubtract(pTerm);
      const isInCircle = sum.doubleValue() > 0;
      return isInCircle;
    }

    static isInCircleCC(a, b, c, p) {
      const cc = Triangle.circumcentre(a, b, c);
      const ccRadius = a.distance(cc);
      const pRadiusDiff = p.distance(cc) - ccRadius;
      return pRadiusDiff <= 0;
    }

    static isInCircleNormalized(a, b, c, p) {
      const adx = a.x - p.x;
      const ady = a.y - p.y;
      const bdx = b.x - p.x;
      const bdy = b.y - p.y;
      const cdx = c.x - p.x;
      const cdy = c.y - p.y;
      const abdet = adx * bdy - bdx * ady;
      const bcdet = bdx * cdy - cdx * bdy;
      const cadet = cdx * ady - adx * cdy;
      const alift = adx * adx + ady * ady;
      const blift = bdx * bdx + bdy * bdy;
      const clift = cdx * cdx + cdy * cdy;
      const disc = alift * bcdet + blift * cadet + clift * abdet;
      return disc > 0;
    }

    static isInCircleDDSlow(a, b, c, p) {
      const px = DD.valueOf(p.x);
      const py = DD.valueOf(p.y);
      const ax = DD.valueOf(a.x);
      const ay = DD.valueOf(a.y);
      const bx = DD.valueOf(b.x);
      const by = DD.valueOf(b.y);
      const cx = DD.valueOf(c.x);
      const cy = DD.valueOf(c.y);
      const aTerm = ax.multiply(ax).add(ay.multiply(ay)).multiply(TrianglePredicate.triAreaDDSlow(bx, by, cx, cy, px, py));
      const bTerm = bx.multiply(bx).add(by.multiply(by)).multiply(TrianglePredicate.triAreaDDSlow(ax, ay, cx, cy, px, py));
      const cTerm = cx.multiply(cx).add(cy.multiply(cy)).multiply(TrianglePredicate.triAreaDDSlow(ax, ay, bx, by, px, py));
      const pTerm = px.multiply(px).add(py.multiply(py)).multiply(TrianglePredicate.triAreaDDSlow(ax, ay, bx, by, cx, cy));
      const sum = aTerm.subtract(bTerm).add(cTerm).subtract(pTerm);
      const isInCircle = sum.doubleValue() > 0;
      return isInCircle;
    }

    static isInCircleNonRobust(a, b, c, p) {
      const isInCircle = (a.x * a.x + a.y * a.y) * TrianglePredicate.triArea(b, c, p) - (b.x * b.x + b.y * b.y) * TrianglePredicate.triArea(a, c, p) + (c.x * c.x + c.y * c.y) * TrianglePredicate.triArea(a, b, p) - (p.x * p.x + p.y * p.y) * TrianglePredicate.triArea(a, b, c) > 0;
      return isInCircle;
    }

    static isInCircleRobust(a, b, c, p) {
      return TrianglePredicate.isInCircleNormalized(a, b, c, p);
    }

    static triAreaDDSlow(ax, ay, bx, by, cx, cy) {
      return bx.subtract(ax).multiply(cy.subtract(ay)).subtract(by.subtract(ay).multiply(cx.subtract(ax)));
    }

    static triAreaDDFast(a, b, c) {
      const t1 = DD.valueOf(b.x).selfSubtract(a.x).selfMultiply(DD.valueOf(c.y).selfSubtract(a.y));
      const t2 = DD.valueOf(b.y).selfSubtract(a.y).selfMultiply(DD.valueOf(c.x).selfSubtract(a.x));
      return t1.selfSubtract(t2);
    }

  }

  class Vertex {
    constructor() {
      Vertex.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._p = null;

      if (arguments.length === 1) {
        const _p = arguments[0];
        this._p = new Coordinate(_p);
      } else if (arguments.length === 2) {
        const _x = arguments[0],
              _y = arguments[1];
        this._p = new Coordinate(_x, _y);
      } else if (arguments.length === 3) {
        const _x = arguments[0],
              _y = arguments[1],
              _z = arguments[2];
        this._p = new Coordinate(_x, _y, _z);
      }
    }

    static interpolateZ() {
      if (arguments.length === 3) {
        const p = arguments[0],
              p0 = arguments[1],
              p1 = arguments[2];
        const segLen = p0.distance(p1);
        const ptLen = p.distance(p0);
        const dz = p1.getZ() - p0.getZ();
        const pz = p0.getZ() + dz * (ptLen / segLen);
        return pz;
      } else if (arguments.length === 4) {
        const p = arguments[0],
              v0 = arguments[1],
              v1 = arguments[2],
              v2 = arguments[3];
        const x0 = v0.x;
        const y0 = v0.y;
        const a = v1.x - x0;
        const b = v2.x - x0;
        const c = v1.y - y0;
        const d = v2.y - y0;
        const det = a * d - b * c;
        const dx = p.x - x0;
        const dy = p.y - y0;
        const t = (d * dx - b * dy) / det;
        const u = (-c * dx + a * dy) / det;
        const z = v0.getZ() + t * (v1.getZ() - v0.getZ()) + u * (v2.getZ() - v0.getZ());
        return z;
      }
    }

    circleCenter(b, c) {
      const a = new Vertex(this.getX(), this.getY());
      const cab = this.bisector(a, b);
      const cbc = this.bisector(b, c);
      const hcc = new HCoordinate(cab, cbc);
      let cc = null;

      try {
        cc = new Vertex(hcc.getX(), hcc.getY());
      } catch (nre) {
        if (nre instanceof NotRepresentableException) {
          System.err.println('a: ' + a + '  b: ' + b + '  c: ' + c);
          System.err.println(nre);
        } else {
          throw nre;
        }
      } finally {}

      return cc;
    }

    dot(v) {
      return this._p.x * v.getX() + this._p.y * v.getY();
    }

    magn() {
      return Math.sqrt(this._p.x * this._p.x + this._p.y * this._p.y);
    }

    getZ() {
      return this._p.getZ();
    }

    bisector(a, b) {
      const dx = b.getX() - a.getX();
      const dy = b.getY() - a.getY();
      const l1 = new HCoordinate(a.getX() + dx / 2.0, a.getY() + dy / 2.0, 1.0);
      const l2 = new HCoordinate(a.getX() - dy + dx / 2.0, a.getY() + dx + dy / 2.0, 1.0);
      return new HCoordinate(l1, l2);
    }

    equals() {
      if (arguments.length === 1) {
        const _x = arguments[0];
        if (this._p.x === _x.getX() && this._p.y === _x.getY()) return true;else return false;
      } else if (arguments.length === 2) {
        const _x = arguments[0],
              tolerance = arguments[1];
        if (this._p.distance(_x.getCoordinate()) < tolerance) return true;else return false;
      }
    }

    getCoordinate() {
      return this._p;
    }

    isInCircle(a, b, c) {
      return TrianglePredicate.isInCircleRobust(a._p, b._p, c._p, this._p);
    }

    interpolateZValue(v0, v1, v2) {
      const x0 = v0.getX();
      const y0 = v0.getY();
      const a = v1.getX() - x0;
      const b = v2.getX() - x0;
      const c = v1.getY() - y0;
      const d = v2.getY() - y0;
      const det = a * d - b * c;
      const dx = this.getX() - x0;
      const dy = this.getY() - y0;
      const t = (d * dx - b * dy) / det;
      const u = (-c * dx + a * dy) / det;
      const z = v0.getZ() + t * (v1.getZ() - v0.getZ()) + u * (v2.getZ() - v0.getZ());
      return z;
    }

    midPoint(a) {
      const xm = (this._p.x + a.getX()) / 2.0;
      const ym = (this._p.y + a.getY()) / 2.0;
      const zm = (this._p.getZ() + a.getZ()) / 2.0;
      return new Vertex(xm, ym, zm);
    }

    rightOf(e) {
      return this.isCCW(e.dest(), e.orig());
    }

    isCCW(b, c) {
      return (b._p.x - this._p.x) * (c._p.y - this._p.y) - (b._p.y - this._p.y) * (c._p.x - this._p.x) > 0;
    }

    getX() {
      return this._p.x;
    }

    crossProduct(v) {
      return this._p.x * v.getY() - this._p.y * v.getX();
    }

    setZ(_z) {
      this._p.setZ(_z);
    }

    times(c) {
      return new Vertex(c * this._p.x, c * this._p.y);
    }

    cross() {
      return new Vertex(this._p.y, -this._p.x);
    }

    leftOf(e) {
      return this.isCCW(e.orig(), e.dest());
    }

    toString() {
      return 'POINT (' + this._p.x + ' ' + this._p.y + ')';
    }

    sub(v) {
      return new Vertex(this._p.x - v.getX(), this._p.y - v.getY());
    }

    getY() {
      return this._p.y;
    }

    classify(p0, p1) {
      const p2 = this;
      const a = p1.sub(p0);
      const b = p2.sub(p0);
      const sa = a.crossProduct(b);
      if (sa > 0.0) return Vertex.LEFT;
      if (sa < 0.0) return Vertex.RIGHT;
      if (a.getX() * b.getX() < 0.0 || a.getY() * b.getY() < 0.0) return Vertex.BEHIND;
      if (a.magn() < b.magn()) return Vertex.BEYOND;
      if (p0.equals(p2)) return Vertex.ORIGIN;
      if (p1.equals(p2)) return Vertex.DESTINATION;
      return Vertex.BETWEEN;
    }

    sum(v) {
      return new Vertex(this._p.x + v.getX(), this._p.y + v.getY());
    }

    distance(v1, v2) {
      return Math.sqrt(Math.pow(v2.getX() - v1.getX(), 2.0) + Math.pow(v2.getY() - v1.getY(), 2.0));
    }

    circumRadiusRatio(b, c) {
      const x = this.circleCenter(b, c);
      const radius = this.distance(x, b);
      let edgeLength = this.distance(this, b);
      let el = this.distance(b, c);
      if (el < edgeLength) edgeLength = el;
      el = this.distance(c, this);
      if (el < edgeLength) edgeLength = el;
      return radius / edgeLength;
    }

  }
  Vertex.LEFT = 0;
  Vertex.RIGHT = 1;
  Vertex.BEYOND = 2;
  Vertex.BEHIND = 3;
  Vertex.BETWEEN = 4;
  Vertex.ORIGIN = 5;
  Vertex.DESTINATION = 6;

  class ConstraintVertex extends Vertex {
    constructor() {
      super();
      ConstraintVertex.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._isOnConstraint = null;
      this._constraint = null;
      const p = arguments[0];
      Vertex.constructor_.call(this, p);
    }

    getConstraint() {
      return this._constraint;
    }

    setOnConstraint(isOnConstraint) {
      this._isOnConstraint = isOnConstraint;
    }

    merge(other) {
      if (other._isOnConstraint) {
        this._isOnConstraint = true;
        this._constraint = other._constraint;
      }
    }

    isOnConstraint() {
      return this._isOnConstraint;
    }

    setConstraint(constraint) {
      this._isOnConstraint = true;
      this._constraint = constraint;
    }

  }

  class QuadEdge {
    constructor() {
      QuadEdge.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._rot = null;
      this._vertex = null;
      this._next = null;
      this._data = null;
    }

    static makeEdge(o, d) {
      const q0 = new QuadEdge();
      const q1 = new QuadEdge();
      const q2 = new QuadEdge();
      const q3 = new QuadEdge();
      q0._rot = q1;
      q1._rot = q2;
      q2._rot = q3;
      q3._rot = q0;
      q0.setNext(q0);
      q1.setNext(q3);
      q2.setNext(q2);
      q3.setNext(q1);
      const base = q0;
      base.setOrig(o);
      base.setDest(d);
      return base;
    }

    static swap(e) {
      const a = e.oPrev();
      const b = e.sym().oPrev();
      QuadEdge.splice(e, a);
      QuadEdge.splice(e.sym(), b);
      QuadEdge.splice(e, a.lNext());
      QuadEdge.splice(e.sym(), b.lNext());
      e.setOrig(a.dest());
      e.setDest(b.dest());
    }

    static splice(a, b) {
      const alpha = a.oNext().rot();
      const beta = b.oNext().rot();
      const t1 = b.oNext();
      const t2 = a.oNext();
      const t3 = beta.oNext();
      const t4 = alpha.oNext();
      a.setNext(t1);
      b.setNext(t2);
      alpha.setNext(t3);
      beta.setNext(t4);
    }

    static connect(a, b) {
      const e = QuadEdge.makeEdge(a.dest(), b.orig());
      QuadEdge.splice(e, a.lNext());
      QuadEdge.splice(e.sym(), b);
      return e;
    }

    equalsNonOriented(qe) {
      if (this.equalsOriented(qe)) return true;
      if (this.equalsOriented(qe.sym())) return true;
      return false;
    }

    toLineSegment() {
      return new LineSegment(this._vertex.getCoordinate(), this.dest().getCoordinate());
    }

    dest() {
      return this.sym().orig();
    }

    oNext() {
      return this._next;
    }

    equalsOriented(qe) {
      if (this.orig().getCoordinate().equals2D(qe.orig().getCoordinate()) && this.dest().getCoordinate().equals2D(qe.dest().getCoordinate())) return true;
      return false;
    }

    dNext() {
      return this.sym().oNext().sym();
    }

    lPrev() {
      return this._next.sym();
    }

    rPrev() {
      return this.sym().oNext();
    }

    rot() {
      return this._rot;
    }

    oPrev() {
      return this._rot._next._rot;
    }

    sym() {
      return this._rot._rot;
    }

    setOrig(o) {
      this._vertex = o;
    }

    lNext() {
      return this.invRot().oNext().rot();
    }

    getLength() {
      return this.orig().getCoordinate().distance(this.dest().getCoordinate());
    }

    invRot() {
      return this._rot.sym();
    }

    setDest(d) {
      this.sym().setOrig(d);
    }

    setData(data) {
      this._data = data;
    }

    getData() {
      return this._data;
    }

    delete() {
      this._rot = null;
    }

    orig() {
      return this._vertex;
    }

    rNext() {
      return this._rot._next.invRot();
    }

    toString() {
      const p0 = this._vertex.getCoordinate();

      const p1 = this.dest().getCoordinate();
      return WKTWriter.toLineString(p0, p1);
    }

    isLive() {
      return this._rot !== null;
    }

    getPrimary() {
      if (this.orig().getCoordinate().compareTo(this.dest().getCoordinate()) <= 0) return this;else return this.sym();
    }

    dPrev() {
      return this.invRot().oNext().invRot();
    }

    setNext(next) {
      this._next = next;
    }

  }

  class IncrementalDelaunayTriangulator {
    constructor() {
      IncrementalDelaunayTriangulator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._subdiv = null;
      this._isUsingTolerance = false;
      const subdiv = arguments[0];
      this._subdiv = subdiv;
      this._isUsingTolerance = subdiv.getTolerance() > 0.0;
    }

    insertSite(v) {
      let e = this._subdiv.locate(v);

      if (this._subdiv.isVertexOfEdge(e, v)) {
        return e;
      } else if (this._subdiv.isOnEdge(e, v.getCoordinate())) {
        e = e.oPrev();

        this._subdiv.delete(e.oNext());
      }

      let base = this._subdiv.makeEdge(e.orig(), v);

      QuadEdge.splice(base, e);
      const startEdge = base;

      do {
        base = this._subdiv.connect(e, base.sym());
        e = base.oPrev();
      } while (e.lNext() !== startEdge);

      do {
        const t = e.oPrev();

        if (t.dest().rightOf(e) && v.isInCircle(e.orig(), t.dest(), e.dest())) {
          QuadEdge.swap(e);
          e = e.oPrev();
        } else if (e.oNext() === startEdge) {
          return base;
        } else {
          e = e.oNext().lPrev();
        }
      } while (true);
    }

    insertSites(vertices) {
      for (let i = vertices.iterator(); i.hasNext();) {
        const v = i.next();
        this.insertSite(v);
      }
    }

  }

  class QuadEdgeLocator {
    locate(v) {}

  }

  class LastFoundQuadEdgeLocator {
    constructor() {
      LastFoundQuadEdgeLocator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._subdiv = null;
      this._lastEdge = null;
      const subdiv = arguments[0];
      this._subdiv = subdiv;
      this.init();
    }

    init() {
      this._lastEdge = this.findEdge();
    }

    locate(v) {
      if (!this._lastEdge.isLive()) this.init();

      const e = this._subdiv.locateFromEdge(v, this._lastEdge);

      this._lastEdge = e;
      return e;
    }

    findEdge() {
      const edges = this._subdiv.getEdges();

      return edges.iterator().next();
    }

    get interfaces_() {
      return [QuadEdgeLocator];
    }

  }

  class LocateFailureException extends RuntimeException {
    constructor() {
      super();
      LocateFailureException.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._seg = null;

      if (arguments.length === 1) {
        if (typeof arguments[0] === 'string') {
          const msg = arguments[0];
          RuntimeException.constructor_.call(this, msg);
        } else if (arguments[0] instanceof LineSegment) {
          const seg = arguments[0];
          RuntimeException.constructor_.call(this, 'Locate failed to converge (at edge: ' + seg + ').  Possible causes include invalid Subdivision topology or very close sites');
          this._seg = new LineSegment(seg);
        }
      } else if (arguments.length === 2) {
        const msg = arguments[0],
              seg = arguments[1];
        RuntimeException.constructor_.call(this, LocateFailureException.msgWithSpatial(msg, seg));
        this._seg = new LineSegment(seg);
      }
    }

    static msgWithSpatial(msg, seg) {
      if (seg !== null) return msg + ' [ ' + seg + ' ]';
      return msg;
    }

    getSegment() {
      return this._seg;
    }

  }

  class TriangleVisitor {
    visit(triEdges) {}

  }

  class QuadEdgeSubdivision {
    constructor() {
      QuadEdgeSubdivision.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._visitedKey = 0;
      this._quadEdges = new ArrayList();
      this._startingEdge = null;
      this._tolerance = null;
      this._edgeCoincidenceTolerance = null;
      this._frameVertex = new Array(3).fill(null);
      this._frameEnv = null;
      this._locator = null;
      this._seg = new LineSegment();
      this._triEdges = new Array(3).fill(null);
      const env = arguments[0],
            tolerance = arguments[1];
      this._tolerance = tolerance;
      this._edgeCoincidenceTolerance = tolerance / QuadEdgeSubdivision.EDGE_COINCIDENCE_TOL_FACTOR;
      this.createFrame(env);
      this._startingEdge = this.initSubdiv();
      this._locator = new LastFoundQuadEdgeLocator(this);
    }

    static getTriangleEdges(startQE, triEdge) {
      triEdge[0] = startQE;
      triEdge[1] = triEdge[0].lNext();
      triEdge[2] = triEdge[1].lNext();
      if (triEdge[2].lNext() !== triEdge[0]) throw new IllegalArgumentException('Edges do not form a triangle');
    }

    getTriangleVertices(includeFrame) {
      const visitor = new TriangleVertexListVisitor();
      this.visitTriangles(visitor, includeFrame);
      return visitor.getTriangleVertices();
    }

    isFrameVertex(v) {
      if (v.equals(this._frameVertex[0])) return true;
      if (v.equals(this._frameVertex[1])) return true;
      if (v.equals(this._frameVertex[2])) return true;
      return false;
    }

    isVertexOfEdge(e, v) {
      if (v.equals(e.orig(), this._tolerance) || v.equals(e.dest(), this._tolerance)) return true;
      return false;
    }

    connect(a, b) {
      const q = QuadEdge.connect(a, b);

      this._quadEdges.add(q);

      return q;
    }

    getVoronoiCellPolygon(qe, geomFact) {
      const cellPts = new ArrayList();
      const startQE = qe;

      do {
        const cc = qe.rot().orig().getCoordinate();
        cellPts.add(cc);
        qe = qe.oPrev();
      } while (qe !== startQE);

      const coordList = new CoordinateList();
      coordList.addAll(cellPts, false);
      coordList.closeRing();

      if (coordList.size() < 4) {
        System.out.println(coordList);
        coordList.add(coordList.get(coordList.size() - 1), true);
      }

      const pts = coordList.toCoordinateArray();
      const cellPoly = geomFact.createPolygon(geomFact.createLinearRing(pts));
      const v = startQE.orig();
      cellPoly.setUserData(v.getCoordinate());
      return cellPoly;
    }

    setLocator(locator) {
      this._locator = locator;
    }

    initSubdiv() {
      const ea = this.makeEdge(this._frameVertex[0], this._frameVertex[1]);
      const eb = this.makeEdge(this._frameVertex[1], this._frameVertex[2]);
      QuadEdge.splice(ea.sym(), eb);
      const ec = this.makeEdge(this._frameVertex[2], this._frameVertex[0]);
      QuadEdge.splice(eb.sym(), ec);
      QuadEdge.splice(ec.sym(), ea);
      return ea;
    }

    isFrameBorderEdge(e) {
      const leftTri = new Array(3).fill(null);
      QuadEdgeSubdivision.getTriangleEdges(e, leftTri);
      const rightTri = new Array(3).fill(null);
      QuadEdgeSubdivision.getTriangleEdges(e.sym(), rightTri);
      const vLeftTriOther = e.lNext().dest();
      if (this.isFrameVertex(vLeftTriOther)) return true;
      const vRightTriOther = e.sym().lNext().dest();
      if (this.isFrameVertex(vRightTriOther)) return true;
      return false;
    }

    makeEdge(o, d) {
      const q = QuadEdge.makeEdge(o, d);

      this._quadEdges.add(q);

      return q;
    }

    visitTriangles(triVisitor, includeFrame) {
      this._visitedKey++;
      const edgeStack = new Stack();
      edgeStack.push(this._startingEdge);
      const visitedEdges = new HashSet();

      while (!edgeStack.empty()) {
        const edge = edgeStack.pop();

        if (!visitedEdges.contains(edge)) {
          const triEdges = this.fetchTriangleToVisit(edge, edgeStack, includeFrame, visitedEdges);
          if (triEdges !== null) triVisitor.visit(triEdges);
        }
      }
    }

    isFrameEdge(e) {
      if (this.isFrameVertex(e.orig()) || this.isFrameVertex(e.dest())) return true;
      return false;
    }

    isOnEdge(e, p) {
      this._seg.setCoordinates(e.orig().getCoordinate(), e.dest().getCoordinate());

      const dist = this._seg.distance(p);

      return dist < this._edgeCoincidenceTolerance;
    }

    getEnvelope() {
      return new Envelope(this._frameEnv);
    }

    createFrame(env) {
      const deltaX = env.getWidth();
      const deltaY = env.getHeight();
      let offset = 0.0;
      if (deltaX > deltaY) offset = deltaX * 10.0;else offset = deltaY * 10.0;
      this._frameVertex[0] = new Vertex((env.getMaxX() + env.getMinX()) / 2.0, env.getMaxY() + offset);
      this._frameVertex[1] = new Vertex(env.getMinX() - offset, env.getMinY() - offset);
      this._frameVertex[2] = new Vertex(env.getMaxX() + offset, env.getMinY() - offset);
      this._frameEnv = new Envelope(this._frameVertex[0].getCoordinate(), this._frameVertex[1].getCoordinate());

      this._frameEnv.expandToInclude(this._frameVertex[2].getCoordinate());
    }

    getTriangleCoordinates(includeFrame) {
      const visitor = new TriangleCoordinatesVisitor();
      this.visitTriangles(visitor, includeFrame);
      return visitor.getTriangles();
    }

    getVertices(includeFrame) {
      const vertices = new HashSet();

      for (let i = this._quadEdges.iterator(); i.hasNext();) {
        const qe = i.next();
        const v = qe.orig();
        if (includeFrame || !this.isFrameVertex(v)) vertices.add(v);
        const vd = qe.dest();
        if (includeFrame || !this.isFrameVertex(vd)) vertices.add(vd);
      }

      return vertices;
    }

    fetchTriangleToVisit(edge, edgeStack, includeFrame, visitedEdges) {
      let curr = edge;
      let edgeCount = 0;
      let isFrame = false;

      do {
        this._triEdges[edgeCount] = curr;
        if (this.isFrameEdge(curr)) isFrame = true;
        const sym = curr.sym();
        if (!visitedEdges.contains(sym)) edgeStack.push(sym);
        visitedEdges.add(curr);
        edgeCount++;
        curr = curr.lNext();
      } while (curr !== edge);

      if (isFrame && !includeFrame) return null;
      return this._triEdges;
    }

    getEdges() {
      if (arguments.length === 0) {
        return this._quadEdges;
      } else if (arguments.length === 1) {
        const geomFact = arguments[0];
        const quadEdges = this.getPrimaryEdges(false);
        const edges = new Array(quadEdges.size()).fill(null);
        let i = 0;

        for (let it = quadEdges.iterator(); it.hasNext();) {
          const qe = it.next();
          edges[i++] = geomFact.createLineString([qe.orig().getCoordinate(), qe.dest().getCoordinate()]);
        }

        return geomFact.createMultiLineString(edges);
      }
    }

    getVertexUniqueEdges(includeFrame) {
      const edges = new ArrayList();
      const visitedVertices = new HashSet();

      for (let i = this._quadEdges.iterator(); i.hasNext();) {
        const qe = i.next();
        const v = qe.orig();

        if (!visitedVertices.contains(v)) {
          visitedVertices.add(v);
          if (includeFrame || !this.isFrameVertex(v)) edges.add(qe);
        }

        const qd = qe.sym();
        const vd = qd.orig();

        if (!visitedVertices.contains(vd)) {
          visitedVertices.add(vd);
          if (includeFrame || !this.isFrameVertex(vd)) edges.add(qd);
        }
      }

      return edges;
    }

    getTriangleEdges(includeFrame) {
      const visitor = new TriangleEdgesListVisitor();
      this.visitTriangles(visitor, includeFrame);
      return visitor.getTriangleEdges();
    }

    getPrimaryEdges(includeFrame) {
      this._visitedKey++;
      const edges = new ArrayList();
      const edgeStack = new Stack();
      edgeStack.push(this._startingEdge);
      const visitedEdges = new HashSet();

      while (!edgeStack.empty()) {
        const edge = edgeStack.pop();

        if (!visitedEdges.contains(edge)) {
          const priQE = edge.getPrimary();
          if (includeFrame || !this.isFrameEdge(priQE)) edges.add(priQE);
          edgeStack.push(edge.oNext());
          edgeStack.push(edge.sym().oNext());
          visitedEdges.add(edge);
          visitedEdges.add(edge.sym());
        }
      }

      return edges;
    }

    delete(e) {
      QuadEdge.splice(e, e.oPrev());
      QuadEdge.splice(e.sym(), e.sym().oPrev());
      const eSym = e.sym();
      const eRot = e.rot();
      const eRotSym = e.rot().sym();

      this._quadEdges.remove(e);

      this._quadEdges.remove(eSym);

      this._quadEdges.remove(eRot);

      this._quadEdges.remove(eRotSym);

      e.delete();
      eSym.delete();
      eRot.delete();
      eRotSym.delete();
    }

    locateFromEdge(v, startEdge) {
      let iter = 0;

      const maxIter = this._quadEdges.size();

      let e = startEdge;

      while (true) {
        iter++;
        if (iter > maxIter) throw new LocateFailureException(e.toLineSegment());
        if (v.equals(e.orig()) || v.equals(e.dest())) break;else if (v.rightOf(e)) e = e.sym();else if (!v.rightOf(e.oNext())) e = e.oNext();else if (!v.rightOf(e.dPrev())) e = e.dPrev();else break;
      }

      return e;
    }

    getTolerance() {
      return this._tolerance;
    }

    getVoronoiCellPolygons(geomFact) {
      this.visitTriangles(new TriangleCircumcentreVisitor(), true);
      const cells = new ArrayList();
      const edges = this.getVertexUniqueEdges(false);

      for (let i = edges.iterator(); i.hasNext();) {
        const qe = i.next();
        cells.add(this.getVoronoiCellPolygon(qe, geomFact));
      }

      return cells;
    }

    getVoronoiDiagram(geomFact) {
      const vorCells = this.getVoronoiCellPolygons(geomFact);
      return geomFact.createGeometryCollection(GeometryFactory.toGeometryArray(vorCells));
    }

    getTriangles(geomFact) {
      const triPtsList = this.getTriangleCoordinates(false);
      const tris = new Array(triPtsList.size()).fill(null);
      let i = 0;

      for (let it = triPtsList.iterator(); it.hasNext();) {
        const triPt = it.next();
        tris[i++] = geomFact.createPolygon(geomFact.createLinearRing(triPt));
      }

      return geomFact.createGeometryCollection(tris);
    }

    insertSite(v) {
      let e = this.locate(v);
      if (v.equals(e.orig(), this._tolerance) || v.equals(e.dest(), this._tolerance)) return e;
      let base = this.makeEdge(e.orig(), v);
      QuadEdge.splice(base, e);
      const startEdge = base;

      do {
        base = this.connect(e, base.sym());
        e = base.oPrev();
      } while (e.lNext() !== startEdge);

      return startEdge;
    }

    locate() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof Vertex) {
          const v = arguments[0];
          return this._locator.locate(v);
        } else if (arguments[0] instanceof Coordinate) {
          const p = arguments[0];
          return this._locator.locate(new Vertex(p));
        }
      } else if (arguments.length === 2) {
        const p0 = arguments[0],
              p1 = arguments[1];

        const e = this._locator.locate(new Vertex(p0));

        if (e === null) return null;
        let base = e;
        if (e.dest().getCoordinate().equals2D(p0)) base = e.sym();
        let locEdge = base;

        do {
          if (locEdge.dest().getCoordinate().equals2D(p1)) return locEdge;
          locEdge = locEdge.oNext();
        } while (locEdge !== base);

        return null;
      }
    }

  }

  class TriangleCircumcentreVisitor {
    visit(triEdges) {
      const a = triEdges[0].orig().getCoordinate();
      const b = triEdges[1].orig().getCoordinate();
      const c = triEdges[2].orig().getCoordinate();
      const cc = Triangle.circumcentreDD(a, b, c);
      const ccVertex = new Vertex(cc);

      for (let i = 0; i < 3; i++) triEdges[i].rot().setOrig(ccVertex);
    }

    get interfaces_() {
      return [TriangleVisitor];
    }

  }

  class TriangleEdgesListVisitor {
    constructor() {
      TriangleEdgesListVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._triList = new ArrayList();
    }

    getTriangleEdges() {
      return this._triList;
    }

    visit(triEdges) {
      this._triList.add(triEdges);
    }

    get interfaces_() {
      return [TriangleVisitor];
    }

  }

  class TriangleVertexListVisitor {
    constructor() {
      TriangleVertexListVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._triList = new ArrayList();
    }

    visit(triEdges) {
      this._triList.add([triEdges[0].orig(), triEdges[1].orig(), triEdges[2].orig()]);
    }

    getTriangleVertices() {
      return this._triList;
    }

    get interfaces_() {
      return [TriangleVisitor];
    }

  }

  class TriangleCoordinatesVisitor {
    constructor() {
      TriangleCoordinatesVisitor.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._coordList = new CoordinateList();
      this._triCoords = new ArrayList();
    }

    checkTriangleSize(pts) {
      if (pts.length >= 2) WKTWriter.toLineString(pts[0], pts[1]);else if (pts.length >= 1) WKTWriter.toPoint(pts[0]);
    }

    visit(triEdges) {
      this._coordList.clear();

      for (let i = 0; i < 3; i++) {
        const v = triEdges[i].orig();

        this._coordList.add(v.getCoordinate());
      }

      if (this._coordList.size() > 0) {
        this._coordList.closeRing();

        const pts = this._coordList.toCoordinateArray();

        if (pts.length !== 4) return null;

        this._triCoords.add(pts);
      }
    }

    getTriangles() {
      return this._triCoords;
    }

    get interfaces_() {
      return [TriangleVisitor];
    }

  }

  QuadEdgeSubdivision.TriangleCircumcentreVisitor = TriangleCircumcentreVisitor;
  QuadEdgeSubdivision.TriangleEdgesListVisitor = TriangleEdgesListVisitor;
  QuadEdgeSubdivision.TriangleVertexListVisitor = TriangleVertexListVisitor;
  QuadEdgeSubdivision.TriangleCoordinatesVisitor = TriangleCoordinatesVisitor;
  QuadEdgeSubdivision.EDGE_COINCIDENCE_TOL_FACTOR = 1000;

  class Segment {
    constructor() {
      Segment.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._ls = null;
      this._data = null;

      if (arguments.length === 2) {
        const p0 = arguments[0],
              p1 = arguments[1];
        this._ls = new LineSegment(p0, p1);
      } else if (arguments.length === 3) {
        const p0 = arguments[0],
              p1 = arguments[1],
              data = arguments[2];
        this._ls = new LineSegment(p0, p1);
        this._data = data;
      } else if (arguments.length === 6) {
        const x1 = arguments[0],
              y1 = arguments[1],
              z1 = arguments[2],
              x2 = arguments[3],
              y2 = arguments[4],
              z2 = arguments[5];
        Segment.constructor_.call(this, new Coordinate(x1, y1, z1), new Coordinate(x2, y2, z2));
      } else if (arguments.length === 7) {
        const x1 = arguments[0],
              y1 = arguments[1],
              z1 = arguments[2],
              x2 = arguments[3],
              y2 = arguments[4],
              z2 = arguments[5],
              data = arguments[6];
        Segment.constructor_.call(this, new Coordinate(x1, y1, z1), new Coordinate(x2, y2, z2), data);
      }
    }

    getLineSegment() {
      return this._ls;
    }

    getEndZ() {
      const p = this._ls.getCoordinate(1);

      return p.getZ();
    }

    getStartZ() {
      const p = this._ls.getCoordinate(0);

      return p.getZ();
    }

    intersection(s) {
      return this._ls.intersection(s.getLineSegment());
    }

    getStart() {
      return this._ls.getCoordinate(0);
    }

    getEnd() {
      return this._ls.getCoordinate(1);
    }

    getEndY() {
      const p = this._ls.getCoordinate(1);

      return p.y;
    }

    getStartX() {
      const p = this._ls.getCoordinate(0);

      return p.x;
    }

    equalsTopo(s) {
      return this._ls.equalsTopo(s.getLineSegment());
    }

    getStartY() {
      const p = this._ls.getCoordinate(0);

      return p.y;
    }

    setData(data) {
      this._data = data;
    }

    getData() {
      return this._data;
    }

    getEndX() {
      const p = this._ls.getCoordinate(1);

      return p.x;
    }

    toString() {
      return this._ls.toString();
    }

  }

  class ConstraintEnforcementException extends RuntimeException {
    constructor() {
      super();
      ConstraintEnforcementException.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._pt = null;

      if (arguments.length === 1) {
        const msg = arguments[0];
        RuntimeException.constructor_.call(this, msg);
      } else if (arguments.length === 2) {
        const msg = arguments[0],
              pt = arguments[1];
        RuntimeException.constructor_.call(this, ConstraintEnforcementException.msgWithCoord(msg, pt));
        this._pt = new Coordinate(pt);
      }
    }

    static msgWithCoord(msg, pt) {
      if (pt !== null) return msg + ' [ ' + WKTWriter.toPoint(pt) + ' ]';
      return msg;
    }

    getCoordinate() {
      return this._pt;
    }

  }

  class ConformingDelaunayTriangulator {
    constructor() {
      ConformingDelaunayTriangulator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._initialVertices = null;
      this._segVertices = null;
      this._segments = new ArrayList();
      this._subdiv = null;
      this._incDel = null;
      this._convexHull = null;
      this._splitFinder = new NonEncroachingSplitPointFinder();
      this._kdt = null;
      this._vertexFactory = null;
      this._computeAreaEnv = null;
      this._splitPt = null;
      this._tolerance = null;
      const initialVertices = arguments[0],
            tolerance = arguments[1];
      this._initialVertices = new ArrayList(initialVertices);
      this._tolerance = tolerance;
      this._kdt = new KdTree(tolerance);
    }

    static computeVertexEnvelope(vertices) {
      const env = new Envelope();

      for (let i = vertices.iterator(); i.hasNext();) {
        const v = i.next();
        env.expandToInclude(v.getCoordinate());
      }

      return env;
    }

    getInitialVertices() {
      return this._initialVertices;
    }

    getKDT() {
      return this._kdt;
    }

    enforceConstraints() {
      this.addConstraintVertices();
      let count = 0;
      let splits = 0;

      do {
        splits = this.enforceGabriel(this._segments);
        count++;
      } while (splits > 0 && count < ConformingDelaunayTriangulator.MAX_SPLIT_ITER);

      if (count === ConformingDelaunayTriangulator.MAX_SPLIT_ITER) throw new ConstraintEnforcementException('Too many splitting iterations while enforcing constraints.  Last split point was at: ', this._splitPt);
    }

    insertSites(vertices) {
      for (let i = vertices.iterator(); i.hasNext();) {
        const v = i.next();
        this.insertSite(v);
      }
    }

    getVertexFactory() {
      return this._vertexFactory;
    }

    getPointArray() {
      const pts = new Array(this._initialVertices.size() + this._segVertices.size()).fill(null);
      let index = 0;

      for (let i = this._initialVertices.iterator(); i.hasNext();) {
        const v = i.next();
        pts[index++] = v.getCoordinate();
      }

      for (let i2 = this._segVertices.iterator(); i2.hasNext();) {
        const v = i2.next();
        pts[index++] = v.getCoordinate();
      }

      return pts;
    }

    setConstraints(segments, segVertices) {
      this._segments = segments;
      this._segVertices = segVertices;
    }

    computeConvexHull() {
      const fact = new GeometryFactory();
      const coords = this.getPointArray();
      const hull = new ConvexHull(coords, fact);
      this._convexHull = hull.getConvexHull();
    }

    addConstraintVertices() {
      this.computeConvexHull();
      this.insertSites(this._segVertices);
    }

    findNonGabrielPoint(seg) {
      const p = seg.getStart();
      const q = seg.getEnd();
      const midPt = new Coordinate((p.x + q.x) / 2.0, (p.y + q.y) / 2.0);
      const segRadius = p.distance(midPt);
      const env = new Envelope(midPt);
      env.expandBy(segRadius);

      const result = this._kdt.query(env);

      let closestNonGabriel = null;
      let minDist = Double.MAX_VALUE;

      for (let i = result.iterator(); i.hasNext();) {
        const nextNode = i.next();
        const testPt = nextNode.getCoordinate();
        if (testPt.equals2D(p) || testPt.equals2D(q)) continue;
        const testRadius = midPt.distance(testPt);

        if (testRadius < segRadius) {
          const testDist = testRadius;

          if (closestNonGabriel === null || testDist < minDist) {
            closestNonGabriel = testPt;
            minDist = testDist;
          }
        }
      }

      return closestNonGabriel;
    }

    getConstraintSegments() {
      return this._segments;
    }

    setSplitPointFinder(splitFinder) {
      this._splitFinder = splitFinder;
    }

    getConvexHull() {
      return this._convexHull;
    }

    getTolerance() {
      return this._tolerance;
    }

    enforceGabriel(segsToInsert) {
      const newSegments = new ArrayList();
      let splits = 0;
      const segsToRemove = new ArrayList();

      for (let i = segsToInsert.iterator(); i.hasNext();) {
        const seg = i.next();
        const encroachPt = this.findNonGabrielPoint(seg);
        if (encroachPt === null) continue;
        this._splitPt = this._splitFinder.findSplitPoint(seg, encroachPt);
        const splitVertex = this.createVertex(this._splitPt, seg);
        const insertedVertex = this.insertSite(splitVertex);

        if (!insertedVertex.getCoordinate().equals2D(this._splitPt)) ;

        const s1 = new Segment(seg.getStartX(), seg.getStartY(), seg.getStartZ(), splitVertex.getX(), splitVertex.getY(), splitVertex.getZ(), seg.getData());
        const s2 = new Segment(splitVertex.getX(), splitVertex.getY(), splitVertex.getZ(), seg.getEndX(), seg.getEndY(), seg.getEndZ(), seg.getData());
        newSegments.add(s1);
        newSegments.add(s2);
        segsToRemove.add(seg);
        splits = splits + 1;
      }

      segsToInsert.removeAll(segsToRemove);
      segsToInsert.addAll(newSegments);
      return splits;
    }

    createVertex() {
      if (arguments.length === 1) {
        const p = arguments[0];
        let v = null;
        if (this._vertexFactory !== null) v = this._vertexFactory.createVertex(p, null);else v = new ConstraintVertex(p);
        return v;
      } else if (arguments.length === 2) {
        const p = arguments[0],
              seg = arguments[1];
        let v = null;
        if (this._vertexFactory !== null) v = this._vertexFactory.createVertex(p, seg);else v = new ConstraintVertex(p);
        v.setOnConstraint(true);
        return v;
      }
    }

    getSubdivision() {
      return this._subdiv;
    }

    computeBoundingBox() {
      const vertexEnv = ConformingDelaunayTriangulator.computeVertexEnvelope(this._initialVertices);
      const segEnv = ConformingDelaunayTriangulator.computeVertexEnvelope(this._segVertices);
      const allPointsEnv = new Envelope(vertexEnv);
      allPointsEnv.expandToInclude(segEnv);
      const deltaX = allPointsEnv.getWidth() * 0.2;
      const deltaY = allPointsEnv.getHeight() * 0.2;
      const delta = Math.max(deltaX, deltaY);
      this._computeAreaEnv = new Envelope(allPointsEnv);

      this._computeAreaEnv.expandBy(delta);
    }

    setVertexFactory(vertexFactory) {
      this._vertexFactory = vertexFactory;
    }

    formInitialDelaunay() {
      this.computeBoundingBox();
      this._subdiv = new QuadEdgeSubdivision(this._computeAreaEnv, this._tolerance);

      this._subdiv.setLocator(new LastFoundQuadEdgeLocator(this._subdiv));

      this._incDel = new IncrementalDelaunayTriangulator(this._subdiv);
      this.insertSites(this._initialVertices);
    }

    insertSite() {
      if (arguments[0] instanceof ConstraintVertex) {
        const v = arguments[0];

        const kdnode = this._kdt.insert(v.getCoordinate(), v);

        if (!kdnode.isRepeated()) {
          this._incDel.insertSite(v);
        } else {
          const snappedV = kdnode.getData();
          snappedV.merge(v);
          return snappedV;
        }

        return v;
      } else if (arguments[0] instanceof Coordinate) {
        const p = arguments[0];
        this.insertSite(this.createVertex(p));
      }
    }

  }
  ConformingDelaunayTriangulator.MAX_SPLIT_ITER = 99;

  class DelaunayTriangulationBuilder {
    constructor() {
      DelaunayTriangulationBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._siteCoords = null;
      this._tolerance = 0.0;
      this._subdiv = null;
    }

    static extractUniqueCoordinates(geom) {
      if (geom === null) return new CoordinateList();
      const coords = geom.getCoordinates();
      return DelaunayTriangulationBuilder.unique(coords);
    }

    static envelope(coords) {
      const env = new Envelope();

      for (let i = coords.iterator(); i.hasNext();) {
        const coord = i.next();
        env.expandToInclude(coord);
      }

      return env;
    }

    static unique(coords) {
      const coordsCopy = CoordinateArrays.copyDeep(coords);
      Arrays.sort(coordsCopy);
      const coordList = new CoordinateList(coordsCopy, false);
      return coordList;
    }

    static toVertices(coords) {
      const verts = new ArrayList();

      for (let i = coords.iterator(); i.hasNext();) {
        const coord = i.next();
        verts.add(new Vertex(coord));
      }

      return verts;
    }

    create() {
      if (this._subdiv !== null) return null;
      const siteEnv = DelaunayTriangulationBuilder.envelope(this._siteCoords);
      const vertices = DelaunayTriangulationBuilder.toVertices(this._siteCoords);
      this._subdiv = new QuadEdgeSubdivision(siteEnv, this._tolerance);
      const triangulator = new IncrementalDelaunayTriangulator(this._subdiv);
      triangulator.insertSites(vertices);
    }

    setTolerance(tolerance) {
      this._tolerance = tolerance;
    }

    setSites() {
      if (arguments[0] instanceof Geometry) {
        const geom = arguments[0];
        this._siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);
      } else if (hasInterface(arguments[0], Collection)) {
        const coords = arguments[0];
        this._siteCoords = DelaunayTriangulationBuilder.unique(CoordinateArrays.toCoordinateArray(coords));
      }
    }

    getEdges(geomFact) {
      this.create();
      return this._subdiv.getEdges(geomFact);
    }

    getSubdivision() {
      this.create();
      return this._subdiv;
    }

    getTriangles(geomFact) {
      this.create();
      return this._subdiv.getTriangles(geomFact);
    }

  }

  class ConformingDelaunayTriangulationBuilder {
    constructor() {
      ConformingDelaunayTriangulationBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._siteCoords = null;
      this._constraintLines = null;
      this._tolerance = 0.0;
      this._subdiv = null;
      this._constraintVertexMap = new TreeMap();
    }

    static createConstraintSegments() {
      if (arguments.length === 1) {
        const geom = arguments[0];
        const lines = LinearComponentExtracter.getLines(geom);
        const constraintSegs = new ArrayList();

        for (let i = lines.iterator(); i.hasNext();) {
          const line = i.next();
          ConformingDelaunayTriangulationBuilder.createConstraintSegments(line, constraintSegs);
        }

        return constraintSegs;
      } else if (arguments.length === 2) {
        const line = arguments[0],
              constraintSegs = arguments[1];
        const coords = line.getCoordinates();

        for (let i = 1; i < coords.length; i++) constraintSegs.add(new Segment(coords[i - 1], coords[i]));
      }
    }

    createSiteVertices(coords) {
      const verts = new ArrayList();

      for (let i = coords.iterator(); i.hasNext();) {
        const coord = i.next();
        if (this._constraintVertexMap.containsKey(coord)) continue;
        verts.add(new ConstraintVertex(coord));
      }

      return verts;
    }

    create() {
      if (this._subdiv !== null) return null;
      const siteEnv = DelaunayTriangulationBuilder.envelope(this._siteCoords);
      let segments = new ArrayList();

      if (this._constraintLines !== null) {
        siteEnv.expandToInclude(this._constraintLines.getEnvelopeInternal());
        this.createVertices(this._constraintLines);
        segments = ConformingDelaunayTriangulationBuilder.createConstraintSegments(this._constraintLines);
      }

      const sites = this.createSiteVertices(this._siteCoords);
      const cdt = new ConformingDelaunayTriangulator(sites, this._tolerance);
      cdt.setConstraints(segments, new ArrayList(this._constraintVertexMap.values()));
      cdt.formInitialDelaunay();
      cdt.enforceConstraints();
      this._subdiv = cdt.getSubdivision();
    }

    setTolerance(tolerance) {
      this._tolerance = tolerance;
    }

    setConstraints(constraintLines) {
      this._constraintLines = constraintLines;
    }

    setSites(geom) {
      this._siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);
    }

    getEdges(geomFact) {
      this.create();
      return this._subdiv.getEdges(geomFact);
    }

    getSubdivision() {
      this.create();
      return this._subdiv;
    }

    getTriangles(geomFact) {
      this.create();
      return this._subdiv.getTriangles(geomFact);
    }

    createVertices(geom) {
      const coords = geom.getCoordinates();

      for (let i = 0; i < coords.length; i++) {
        const v = new ConstraintVertex(coords[i]);

        this._constraintVertexMap.put(coords[i], v);
      }
    }

  }

  class VoronoiDiagramBuilder {
    constructor() {
      VoronoiDiagramBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._siteCoords = null;
      this._tolerance = 0.0;
      this._subdiv = null;
      this._clipEnv = null;
      this._diagramEnv = null;
    }

    static clipGeometryCollection(geom, clipEnv) {
      const clipPoly = geom.getFactory().toGeometry(clipEnv);
      const clipped = new ArrayList();

      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const g = geom.getGeometryN(i);
        let result = null;

        if (clipEnv.contains(g.getEnvelopeInternal())) {
          result = g;
        } else if (clipEnv.intersects(g.getEnvelopeInternal())) {
          result = OverlayOp.intersection(clipPoly, g);
          result.setUserData(g.getUserData());
        }

        if (result !== null && !result.isEmpty()) clipped.add(result);
      }

      return geom.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(clipped));
    }

    create() {
      if (this._subdiv !== null) return null;
      const siteEnv = DelaunayTriangulationBuilder.envelope(this._siteCoords);
      this._diagramEnv = this._clipEnv;

      if (this._diagramEnv === null) {
        this._diagramEnv = siteEnv;

        const expandBy = this._diagramEnv.getDiameter();

        this._diagramEnv.expandBy(expandBy);
      }

      const vertices = DelaunayTriangulationBuilder.toVertices(this._siteCoords);
      this._subdiv = new QuadEdgeSubdivision(siteEnv, this._tolerance);
      const triangulator = new IncrementalDelaunayTriangulator(this._subdiv);
      triangulator.insertSites(vertices);
    }

    getDiagram(geomFact) {
      this.create();

      const polys = this._subdiv.getVoronoiDiagram(geomFact);

      return VoronoiDiagramBuilder.clipGeometryCollection(polys, this._diagramEnv);
    }

    setTolerance(tolerance) {
      this._tolerance = tolerance;
    }

    setSites() {
      if (arguments[0] instanceof Geometry) {
        const geom = arguments[0];
        this._siteCoords = DelaunayTriangulationBuilder.extractUniqueCoordinates(geom);
      } else if (hasInterface(arguments[0], Collection)) {
        const coords = arguments[0];
        this._siteCoords = DelaunayTriangulationBuilder.unique(CoordinateArrays.toCoordinateArray(coords));
      }
    }

    setClipEnvelope(clipEnv) {
      this._clipEnv = clipEnv;
    }

    getSubdivision() {
      this.create();
      return this._subdiv;
    }

  }

  var quadedge = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Vertex: Vertex
  });

  var triangulate = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ConformingDelaunayTriangulationBuilder: ConformingDelaunayTriangulationBuilder,
    DelaunayTriangulationBuilder: DelaunayTriangulationBuilder,
    VoronoiDiagramBuilder: VoronoiDiagramBuilder,
    quadedge: quadedge
  });

  class LinearIterator {
    constructor() {
      LinearIterator.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._linearGeom = null;
      this._numLines = null;
      this._currentLine = null;
      this._componentIndex = 0;
      this._vertexIndex = 0;

      if (arguments.length === 1) {
        const linear = arguments[0];
        LinearIterator.constructor_.call(this, linear, 0, 0);
      } else if (arguments.length === 2) {
        const linear = arguments[0],
              start = arguments[1];
        LinearIterator.constructor_.call(this, linear, start.getComponentIndex(), LinearIterator.segmentEndVertexIndex(start));
      } else if (arguments.length === 3) {
        const linearGeom = arguments[0],
              componentIndex = arguments[1],
              vertexIndex = arguments[2];
        if (!hasInterface(linearGeom, Lineal)) throw new IllegalArgumentException('Lineal geometry is required');
        this._linearGeom = linearGeom;
        this._numLines = linearGeom.getNumGeometries();
        this._componentIndex = componentIndex;
        this._vertexIndex = vertexIndex;
        this.loadCurrentLine();
      }
    }

    static segmentEndVertexIndex(loc) {
      if (loc.getSegmentFraction() > 0.0) return loc.getSegmentIndex() + 1;
      return loc.getSegmentIndex();
    }

    getComponentIndex() {
      return this._componentIndex;
    }

    getLine() {
      return this._currentLine;
    }

    getVertexIndex() {
      return this._vertexIndex;
    }

    getSegmentEnd() {
      if (this._vertexIndex < this.getLine().getNumPoints() - 1) return this._currentLine.getCoordinateN(this._vertexIndex + 1);
      return null;
    }

    next() {
      if (!this.hasNext()) return null;
      this._vertexIndex++;

      if (this._vertexIndex >= this._currentLine.getNumPoints()) {
        this._componentIndex++;
        this.loadCurrentLine();
        this._vertexIndex = 0;
      }
    }

    loadCurrentLine() {
      if (this._componentIndex >= this._numLines) {
        this._currentLine = null;
        return null;
      }

      this._currentLine = this._linearGeom.getGeometryN(this._componentIndex);
    }

    getSegmentStart() {
      return this._currentLine.getCoordinateN(this._vertexIndex);
    }

    isEndOfLine() {
      if (this._componentIndex >= this._numLines) return false;
      if (this._vertexIndex < this._currentLine.getNumPoints() - 1) return false;
      return true;
    }

    hasNext() {
      if (this._componentIndex >= this._numLines) return false;
      if (this._componentIndex === this._numLines - 1 && this._vertexIndex >= this._currentLine.getNumPoints()) return false;
      return true;
    }

  }

  class LengthIndexOfPoint {
    constructor() {
      LengthIndexOfPoint.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._linearGeom = null;
      const linearGeom = arguments[0];
      this._linearGeom = linearGeom;
    }

    static indexOf(linearGeom, inputPt) {
      const locater = new LengthIndexOfPoint(linearGeom);
      return locater.indexOf(inputPt);
    }

    static indexOfAfter(linearGeom, inputPt, minIndex) {
      const locater = new LengthIndexOfPoint(linearGeom);
      return locater.indexOfAfter(inputPt, minIndex);
    }

    indexOf(inputPt) {
      return this.indexOfFromStart(inputPt, -1.0);
    }

    indexOfFromStart(inputPt, minIndex) {
      let minDistance = Double.MAX_VALUE;
      let ptMeasure = minIndex;
      let segmentStartMeasure = 0.0;
      const seg = new LineSegment();
      const it = new LinearIterator(this._linearGeom);

      while (it.hasNext()) {
        if (!it.isEndOfLine()) {
          seg.p0 = it.getSegmentStart();
          seg.p1 = it.getSegmentEnd();
          const segDistance = seg.distance(inputPt);
          const segMeasureToPt = this.segmentNearestMeasure(seg, inputPt, segmentStartMeasure);

          if (segDistance < minDistance && segMeasureToPt > minIndex) {
            ptMeasure = segMeasureToPt;
            minDistance = segDistance;
          }

          segmentStartMeasure += seg.getLength();
        }

        it.next();
      }

      return ptMeasure;
    }

    indexOfAfter(inputPt, minIndex) {
      if (minIndex < 0.0) return this.indexOf(inputPt);

      const endIndex = this._linearGeom.getLength();

      if (endIndex < minIndex) return endIndex;
      const closestAfter = this.indexOfFromStart(inputPt, minIndex);
      Assert.isTrue(closestAfter >= minIndex, 'computed index is before specified minimum index');
      return closestAfter;
    }

    segmentNearestMeasure(seg, inputPt, segmentStartMeasure) {
      const projFactor = seg.projectionFactor(inputPt);
      if (projFactor <= 0.0) return segmentStartMeasure;
      if (projFactor <= 1.0) return segmentStartMeasure + projFactor * seg.getLength();
      return segmentStartMeasure + seg.getLength();
    }

  }

  class LinearLocation {
    constructor() {
      LinearLocation.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._componentIndex = 0;
      this._segmentIndex = 0;
      this._segmentFraction = 0.0;

      if (arguments.length === 0) ; else if (arguments.length === 1) {
        const loc = arguments[0];
        this._componentIndex = loc._componentIndex;
        this._segmentIndex = loc._segmentIndex;
        this._segmentFraction = loc._segmentFraction;
      } else if (arguments.length === 2) {
        const segmentIndex = arguments[0],
              segmentFraction = arguments[1];
        LinearLocation.constructor_.call(this, 0, segmentIndex, segmentFraction);
      } else if (arguments.length === 3) {
        const componentIndex = arguments[0],
              segmentIndex = arguments[1],
              segmentFraction = arguments[2];
        this._componentIndex = componentIndex;
        this._segmentIndex = segmentIndex;
        this._segmentFraction = segmentFraction;
        this.normalize();
      } else if (arguments.length === 4) {
        const componentIndex = arguments[0],
              segmentIndex = arguments[1],
              segmentFraction = arguments[2],
              doNormalize = arguments[3];
        this._componentIndex = componentIndex;
        this._segmentIndex = segmentIndex;
        this._segmentFraction = segmentFraction;
        if (doNormalize) this.normalize();
      }
    }

    static getEndLocation(linear) {
      const loc = new LinearLocation();
      loc.setToEnd(linear);
      return loc;
    }

    static pointAlongSegmentByFraction(p0, p1, frac) {
      if (frac <= 0.0) return p0;
      if (frac >= 1.0) return p1;
      const x = (p1.x - p0.x) * frac + p0.x;
      const y = (p1.y - p0.y) * frac + p0.y;
      const z = (p1.getZ() - p0.getZ()) * frac + p0.getZ();
      return new Coordinate(x, y, z);
    }

    static compareLocationValues(componentIndex0, segmentIndex0, segmentFraction0, componentIndex1, segmentIndex1, segmentFraction1) {
      if (componentIndex0 < componentIndex1) return -1;
      if (componentIndex0 > componentIndex1) return 1;
      if (segmentIndex0 < segmentIndex1) return -1;
      if (segmentIndex0 > segmentIndex1) return 1;
      if (segmentFraction0 < segmentFraction1) return -1;
      if (segmentFraction0 > segmentFraction1) return 1;
      return 0;
    }

    static numSegments(line) {
      const npts = line.getNumPoints();
      if (npts <= 1) return 0;
      return npts - 1;
    }

    getSegmentIndex() {
      return this._segmentIndex;
    }

    getComponentIndex() {
      return this._componentIndex;
    }

    isEndpoint(linearGeom) {
      const lineComp = linearGeom.getGeometryN(this._componentIndex);
      const nseg = LinearLocation.numSegments(lineComp);
      return this._segmentIndex >= nseg || this._segmentIndex === nseg - 1 && this._segmentFraction >= 1.0;
    }

    isValid(linearGeom) {
      if (this._componentIndex < 0 || this._componentIndex >= linearGeom.getNumGeometries()) return false;
      const lineComp = linearGeom.getGeometryN(this._componentIndex);
      if (this._segmentIndex < 0 || this._segmentIndex > lineComp.getNumPoints()) return false;
      if (this._segmentIndex === lineComp.getNumPoints() && this._segmentFraction !== 0.0) return false;
      if (this._segmentFraction < 0.0 || this._segmentFraction > 1.0) return false;
      return true;
    }

    normalize() {
      if (this._segmentFraction < 0.0) this._segmentFraction = 0.0;
      if (this._segmentFraction > 1.0) this._segmentFraction = 1.0;

      if (this._componentIndex < 0) {
        this._componentIndex = 0;
        this._segmentIndex = 0;
        this._segmentFraction = 0.0;
      }

      if (this._segmentIndex < 0) {
        this._segmentIndex = 0;
        this._segmentFraction = 0.0;
      }

      if (this._segmentFraction === 1.0) {
        this._segmentFraction = 0.0;
        this._segmentIndex += 1;
      }
    }

    toLowest(linearGeom) {
      const lineComp = linearGeom.getGeometryN(this._componentIndex);
      const nseg = LinearLocation.numSegments(lineComp);
      if (this._segmentIndex < nseg) return this;
      return new LinearLocation(this._componentIndex, nseg - 1, 1.0, false);
    }

    getCoordinate(linearGeom) {
      const lineComp = linearGeom.getGeometryN(this._componentIndex);
      const p0 = lineComp.getCoordinateN(this._segmentIndex);
      if (this._segmentIndex >= LinearLocation.numSegments(lineComp)) return p0;
      const p1 = lineComp.getCoordinateN(this._segmentIndex + 1);
      return LinearLocation.pointAlongSegmentByFraction(p0, p1, this._segmentFraction);
    }

    getSegmentFraction() {
      return this._segmentFraction;
    }

    getSegment(linearGeom) {
      const lineComp = linearGeom.getGeometryN(this._componentIndex);
      const p0 = lineComp.getCoordinateN(this._segmentIndex);

      if (this._segmentIndex >= LinearLocation.numSegments(lineComp)) {
        const prev = lineComp.getCoordinateN(lineComp.getNumPoints() - 2);
        return new LineSegment(prev, p0);
      }

      const p1 = lineComp.getCoordinateN(this._segmentIndex + 1);
      return new LineSegment(p0, p1);
    }

    clamp(linear) {
      if (this._componentIndex >= linear.getNumGeometries()) {
        this.setToEnd(linear);
        return null;
      }

      if (this._segmentIndex >= linear.getNumPoints()) {
        const line = linear.getGeometryN(this._componentIndex);
        this._segmentIndex = LinearLocation.numSegments(line);
        this._segmentFraction = 1.0;
      }
    }

    setToEnd(linear) {
      this._componentIndex = linear.getNumGeometries() - 1;
      const lastLine = linear.getGeometryN(this._componentIndex);
      this._segmentIndex = LinearLocation.numSegments(lastLine);
      this._segmentFraction = 0.0;
    }

    compareTo(o) {
      const other = o;
      if (this._componentIndex < other._componentIndex) return -1;
      if (this._componentIndex > other._componentIndex) return 1;
      if (this._segmentIndex < other._segmentIndex) return -1;
      if (this._segmentIndex > other._segmentIndex) return 1;
      if (this._segmentFraction < other._segmentFraction) return -1;
      if (this._segmentFraction > other._segmentFraction) return 1;
      return 0;
    }

    copy() {
      return new LinearLocation(this._componentIndex, this._segmentIndex, this._segmentFraction);
    }

    toString() {
      return 'LinearLoc[' + this._componentIndex + ', ' + this._segmentIndex + ', ' + this._segmentFraction + ']';
    }

    isOnSameSegment(loc) {
      if (this._componentIndex !== loc._componentIndex) return false;
      if (this._segmentIndex === loc._segmentIndex) return true;
      if (loc._segmentIndex - this._segmentIndex === 1 && loc._segmentFraction === 0.0) return true;
      if (this._segmentIndex - loc._segmentIndex === 1 && this._segmentFraction === 0.0) return true;
      return false;
    }

    snapToVertex(linearGeom, minDistance) {
      if (this._segmentFraction <= 0.0 || this._segmentFraction >= 1.0) return null;
      const segLen = this.getSegmentLength(linearGeom);
      const lenToStart = this._segmentFraction * segLen;
      const lenToEnd = segLen - lenToStart;
      if (lenToStart <= lenToEnd && lenToStart < minDistance) this._segmentFraction = 0.0;else if (lenToEnd <= lenToStart && lenToEnd < minDistance) this._segmentFraction = 1.0;
    }

    compareLocationValues(componentIndex1, segmentIndex1, segmentFraction1) {
      if (this._componentIndex < componentIndex1) return -1;
      if (this._componentIndex > componentIndex1) return 1;
      if (this._segmentIndex < segmentIndex1) return -1;
      if (this._segmentIndex > segmentIndex1) return 1;
      if (this._segmentFraction < segmentFraction1) return -1;
      if (this._segmentFraction > segmentFraction1) return 1;
      return 0;
    }

    getSegmentLength(linearGeom) {
      const lineComp = linearGeom.getGeometryN(this._componentIndex);
      let segIndex = this._segmentIndex;
      if (this._segmentIndex >= LinearLocation.numSegments(lineComp)) segIndex = lineComp.getNumPoints() - 2;
      const p0 = lineComp.getCoordinateN(segIndex);
      const p1 = lineComp.getCoordinateN(segIndex + 1);
      return p0.distance(p1);
    }

    isVertex() {
      return this._segmentFraction <= 0.0 || this._segmentFraction >= 1.0;
    }

    get interfaces_() {
      return [Comparable];
    }

  }

  class LocationIndexOfPoint {
    constructor() {
      LocationIndexOfPoint.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._linearGeom = null;
      const linearGeom = arguments[0];
      this._linearGeom = linearGeom;
    }

    static indexOf(linearGeom, inputPt) {
      const locater = new LocationIndexOfPoint(linearGeom);
      return locater.indexOf(inputPt);
    }

    static indexOfAfter(linearGeom, inputPt, minIndex) {
      const locater = new LocationIndexOfPoint(linearGeom);
      return locater.indexOfAfter(inputPt, minIndex);
    }

    indexOf(inputPt) {
      return this.indexOfFromStart(inputPt, null);
    }

    indexOfFromStart(inputPt, minIndex) {
      let minDistance = Double.MAX_VALUE;
      let minComponentIndex = 0;
      let minSegmentIndex = 0;
      let minFrac = -1.0;
      const seg = new LineSegment();

      for (let it = new LinearIterator(this._linearGeom); it.hasNext(); it.next()) if (!it.isEndOfLine()) {
        seg.p0 = it.getSegmentStart();
        seg.p1 = it.getSegmentEnd();
        const segDistance = seg.distance(inputPt);
        const segFrac = seg.segmentFraction(inputPt);
        const candidateComponentIndex = it.getComponentIndex();
        const candidateSegmentIndex = it.getVertexIndex();
        if (segDistance < minDistance) if (minIndex === null || minIndex.compareLocationValues(candidateComponentIndex, candidateSegmentIndex, segFrac) < 0) {
          minComponentIndex = candidateComponentIndex;
          minSegmentIndex = candidateSegmentIndex;
          minFrac = segFrac;
          minDistance = segDistance;
        }
      }

      if (minDistance === Double.MAX_VALUE) return new LinearLocation(minIndex);
      const loc = new LinearLocation(minComponentIndex, minSegmentIndex, minFrac);
      return loc;
    }

    indexOfAfter(inputPt, minIndex) {
      if (minIndex === null) return this.indexOf(inputPt);
      const endLoc = LinearLocation.getEndLocation(this._linearGeom);
      if (endLoc.compareTo(minIndex) <= 0) return endLoc;
      const closestAfter = this.indexOfFromStart(inputPt, minIndex);
      Assert.isTrue(closestAfter.compareTo(minIndex) >= 0, 'computed location is before specified minimum location');
      return closestAfter;
    }

  }

  class LocationIndexOfLine {
    constructor() {
      LocationIndexOfLine.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._linearGeom = null;
      const linearGeom = arguments[0];
      this._linearGeom = linearGeom;
    }

    static indicesOf(linearGeom, subLine) {
      const locater = new LocationIndexOfLine(linearGeom);
      return locater.indicesOf(subLine);
    }

    indicesOf(subLine) {
      const startPt = subLine.getGeometryN(0).getCoordinateN(0);
      const lastLine = subLine.getGeometryN(subLine.getNumGeometries() - 1);
      const endPt = lastLine.getCoordinateN(lastLine.getNumPoints() - 1);
      const locPt = new LocationIndexOfPoint(this._linearGeom);
      const subLineLoc = new Array(2).fill(null);
      subLineLoc[0] = locPt.indexOf(startPt);
      if (subLine.getLength() === 0.0) subLineLoc[1] = subLineLoc[0].copy();else subLineLoc[1] = locPt.indexOfAfter(endPt, subLineLoc[0]);
      return subLineLoc;
    }

  }

  class LengthLocationMap {
    constructor() {
      LengthLocationMap.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._linearGeom = null;
      const linearGeom = arguments[0];
      this._linearGeom = linearGeom;
    }

    static getLength(linearGeom, loc) {
      const locater = new LengthLocationMap(linearGeom);
      return locater.getLength(loc);
    }

    static getLocation() {
      if (arguments.length === 2) {
        const linearGeom = arguments[0],
              length = arguments[1];
        const locater = new LengthLocationMap(linearGeom);
        return locater.getLocation(length);
      } else if (arguments.length === 3) {
        const linearGeom = arguments[0],
              length = arguments[1],
              resolveLower = arguments[2];
        const locater = new LengthLocationMap(linearGeom);
        return locater.getLocation(length, resolveLower);
      }
    }

    getLength(loc) {
      let totalLength = 0.0;
      const it = new LinearIterator(this._linearGeom);

      while (it.hasNext()) {
        if (!it.isEndOfLine()) {
          const p0 = it.getSegmentStart();
          const p1 = it.getSegmentEnd();
          const segLen = p1.distance(p0);
          if (loc.getComponentIndex() === it.getComponentIndex() && loc.getSegmentIndex() === it.getVertexIndex()) return totalLength + segLen * loc.getSegmentFraction();
          totalLength += segLen;
        }

        it.next();
      }

      return totalLength;
    }

    resolveHigher(loc) {
      if (!loc.isEndpoint(this._linearGeom)) return loc;
      let compIndex = loc.getComponentIndex();
      if (compIndex >= this._linearGeom.getNumGeometries() - 1) return loc;

      do compIndex++; while (compIndex < this._linearGeom.getNumGeometries() - 1 && this._linearGeom.getGeometryN(compIndex).getLength() === 0);

      return new LinearLocation(compIndex, 0, 0.0);
    }

    getLocation() {
      if (arguments.length === 1) {
        const length = arguments[0];
        return this.getLocation(length, true);
      } else if (arguments.length === 2) {
        const length = arguments[0],
              resolveLower = arguments[1];
        let forwardLength = length;

        if (length < 0.0) {
          const lineLen = this._linearGeom.getLength();

          forwardLength = lineLen + length;
        }

        const loc = this.getLocationForward(forwardLength);
        if (resolveLower) return loc;
        return this.resolveHigher(loc);
      }
    }

    getLocationForward(length) {
      if (length <= 0.0) return new LinearLocation();
      let totalLength = 0.0;
      const it = new LinearIterator(this._linearGeom);

      while (it.hasNext()) {
        if (it.isEndOfLine()) {
          if (totalLength === length) {
            const compIndex = it.getComponentIndex();
            const segIndex = it.getVertexIndex();
            return new LinearLocation(compIndex, segIndex, 0.0);
          }
        } else {
          const p0 = it.getSegmentStart();
          const p1 = it.getSegmentEnd();
          const segLen = p1.distance(p0);

          if (totalLength + segLen > length) {
            const frac = (length - totalLength) / segLen;
            const compIndex = it.getComponentIndex();
            const segIndex = it.getVertexIndex();
            return new LinearLocation(compIndex, segIndex, frac);
          }

          totalLength += segLen;
        }

        it.next();
      }

      return LinearLocation.getEndLocation(this._linearGeom);
    }

  }

  class LinearGeometryBuilder {
    constructor() {
      LinearGeometryBuilder.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._geomFact = null;
      this._lines = new ArrayList();
      this._coordList = null;
      this._ignoreInvalidLines = false;
      this._fixInvalidLines = false;
      this._lastPt = null;
      const geomFact = arguments[0];
      this._geomFact = geomFact;
    }

    getGeometry() {
      this.endLine();
      return this._geomFact.buildGeometry(this._lines);
    }

    getLastCoordinate() {
      return this._lastPt;
    }

    endLine() {
      if (this._coordList === null) return null;

      if (this._ignoreInvalidLines && this._coordList.size() < 2) {
        this._coordList = null;
        return null;
      }

      const rawPts = this._coordList.toCoordinateArray();

      let pts = rawPts;
      if (this._fixInvalidLines) pts = this.validCoordinateSequence(rawPts);
      this._coordList = null;
      let line = null;

      try {
        line = this._geomFact.createLineString(pts);
      } catch (ex) {
        if (ex instanceof IllegalArgumentException) {
          if (!this._ignoreInvalidLines) throw ex;
        } else {
          throw ex;
        }
      } finally {}

      if (line !== null) this._lines.add(line);
    }

    setFixInvalidLines(fixInvalidLines) {
      this._fixInvalidLines = fixInvalidLines;
    }

    add() {
      if (arguments.length === 1) {
        const pt = arguments[0];
        this.add(pt, true);
      } else if (arguments.length === 2) {
        const pt = arguments[0],
              allowRepeatedPoints = arguments[1];
        if (this._coordList === null) this._coordList = new CoordinateList();

        this._coordList.add(pt, allowRepeatedPoints);

        this._lastPt = pt;
      }
    }

    setIgnoreInvalidLines(ignoreInvalidLines) {
      this._ignoreInvalidLines = ignoreInvalidLines;
    }

    validCoordinateSequence(pts) {
      if (pts.length >= 2) return pts;
      const validPts = [pts[0], pts[0]];
      return validPts;
    }

  }

  class ExtractLineByLocation {
    constructor() {
      ExtractLineByLocation.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._line = null;
      const line = arguments[0];
      this._line = line;
    }

    static extract(line, start, end) {
      const ls = new ExtractLineByLocation(line);
      return ls.extract(start, end);
    }

    computeLinear(start, end) {
      const builder = new LinearGeometryBuilder(this._line.getFactory());
      builder.setFixInvalidLines(true);
      if (!start.isVertex()) builder.add(start.getCoordinate(this._line));

      for (let it = new LinearIterator(this._line, start); it.hasNext(); it.next()) {
        if (end.compareLocationValues(it.getComponentIndex(), it.getVertexIndex(), 0.0) < 0) break;
        const pt = it.getSegmentStart();
        builder.add(pt);
        if (it.isEndOfLine()) builder.endLine();
      }

      if (!end.isVertex()) builder.add(end.getCoordinate(this._line));
      return builder.getGeometry();
    }

    computeLine(start, end) {
      const coordinates = this._line.getCoordinates();

      const newCoordinates = new CoordinateList();
      let startSegmentIndex = start.getSegmentIndex();
      if (start.getSegmentFraction() > 0.0) startSegmentIndex += 1;
      let lastSegmentIndex = end.getSegmentIndex();
      if (end.getSegmentFraction() === 1.0) lastSegmentIndex += 1;
      if (lastSegmentIndex >= coordinates.length) lastSegmentIndex = coordinates.length - 1;
      if (!start.isVertex()) newCoordinates.add(start.getCoordinate(this._line));

      for (let i = startSegmentIndex; i <= lastSegmentIndex; i++) newCoordinates.add(coordinates[i]);

      if (!end.isVertex()) newCoordinates.add(end.getCoordinate(this._line));
      if (newCoordinates.size() <= 0) newCoordinates.add(start.getCoordinate(this._line));
      let newCoordinateArray = newCoordinates.toCoordinateArray();
      if (newCoordinateArray.length <= 1) newCoordinateArray = [newCoordinateArray[0], newCoordinateArray[0]];
      return this._line.getFactory().createLineString(newCoordinateArray);
    }

    extract(start, end) {
      if (end.compareTo(start) < 0) return this.reverse(this.computeLinear(end, start));
      return this.computeLinear(start, end);
    }

    reverse(linear) {
      if (hasInterface(linear, Lineal)) return linear.reverse();
      Assert.shouldNeverReachHere('non-linear geometry encountered');
      return null;
    }

  }

  class LengthIndexedLine {
    constructor() {
      LengthIndexedLine.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._linearGeom = null;
      const linearGeom = arguments[0];
      this._linearGeom = linearGeom;
    }

    clampIndex(index) {
      const posIndex = this.positiveIndex(index);
      const startIndex = this.getStartIndex();
      if (posIndex < startIndex) return startIndex;
      const endIndex = this.getEndIndex();
      if (posIndex > endIndex) return endIndex;
      return posIndex;
    }

    locationOf() {
      if (arguments.length === 1) {
        const index = arguments[0];
        return LengthLocationMap.getLocation(this._linearGeom, index);
      } else if (arguments.length === 2) {
        const index = arguments[0],
              resolveLower = arguments[1];
        return LengthLocationMap.getLocation(this._linearGeom, index, resolveLower);
      }
    }

    project(pt) {
      return LengthIndexOfPoint.indexOf(this._linearGeom, pt);
    }

    positiveIndex(index) {
      if (index >= 0.0) return index;
      return this._linearGeom.getLength() + index;
    }

    extractPoint() {
      if (arguments.length === 1) {
        const index = arguments[0];
        const loc = LengthLocationMap.getLocation(this._linearGeom, index);
        return loc.getCoordinate(this._linearGeom);
      } else if (arguments.length === 2) {
        const index = arguments[0],
              offsetDistance = arguments[1];
        const loc = LengthLocationMap.getLocation(this._linearGeom, index);
        const locLow = loc.toLowest(this._linearGeom);
        return locLow.getSegment(this._linearGeom).pointAlongOffset(locLow.getSegmentFraction(), offsetDistance);
      }
    }

    isValidIndex(index) {
      return index >= this.getStartIndex() && index <= this.getEndIndex();
    }

    getEndIndex() {
      return this._linearGeom.getLength();
    }

    getStartIndex() {
      return 0.0;
    }

    indexOfAfter(pt, minIndex) {
      return LengthIndexOfPoint.indexOfAfter(this._linearGeom, pt, minIndex);
    }

    extractLine(startIndex, endIndex) {
      const startIndex2 = this.clampIndex(startIndex);
      const endIndex2 = this.clampIndex(endIndex);
      const resolveStartLower = startIndex2 === endIndex2;
      const startLoc = this.locationOf(startIndex2, resolveStartLower);
      const endLoc = this.locationOf(endIndex2);
      return ExtractLineByLocation.extract(this._linearGeom, startLoc, endLoc);
    }

    indexOf(pt) {
      return LengthIndexOfPoint.indexOf(this._linearGeom, pt);
    }

    indicesOf(subLine) {
      const locIndex = LocationIndexOfLine.indicesOf(this._linearGeom, subLine);
      const index = [LengthLocationMap.getLength(this._linearGeom, locIndex[0]), LengthLocationMap.getLength(this._linearGeom, locIndex[1])];
      return index;
    }

  }

  class LocationIndexedLine {
    constructor() {
      LocationIndexedLine.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._linearGeom = null;
      const linearGeom = arguments[0];
      this._linearGeom = linearGeom;
      this.checkGeometryType();
    }

    clampIndex(index) {
      const loc = index.copy();
      loc.clamp(this._linearGeom);
      return loc;
    }

    project(pt) {
      return LocationIndexOfPoint.indexOf(this._linearGeom, pt);
    }

    checkGeometryType() {
      if (!(this._linearGeom instanceof LineString || this._linearGeom instanceof MultiLineString)) throw new IllegalArgumentException('Input geometry must be linear');
    }

    extractPoint() {
      if (arguments.length === 1) {
        const index = arguments[0];
        return index.getCoordinate(this._linearGeom);
      } else if (arguments.length === 2) {
        const index = arguments[0],
              offsetDistance = arguments[1];
        const indexLow = index.toLowest(this._linearGeom);
        return indexLow.getSegment(this._linearGeom).pointAlongOffset(indexLow.getSegmentFraction(), offsetDistance);
      }
    }

    isValidIndex(index) {
      return index.isValid(this._linearGeom);
    }

    getEndIndex() {
      return LinearLocation.getEndLocation(this._linearGeom);
    }

    getStartIndex() {
      return new LinearLocation();
    }

    indexOfAfter(pt, minIndex) {
      return LocationIndexOfPoint.indexOfAfter(this._linearGeom, pt, minIndex);
    }

    extractLine(startIndex, endIndex) {
      return ExtractLineByLocation.extract(this._linearGeom, startIndex, endIndex);
    }

    indexOf(pt) {
      return LocationIndexOfPoint.indexOf(this._linearGeom, pt);
    }

    indicesOf(subLine) {
      return LocationIndexOfLine.indicesOf(this._linearGeom, subLine);
    }

  }

  var linearref = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LengthIndexedLine: LengthIndexedLine,
    LengthLocationMap: LengthLocationMap,
    LinearGeometryBuilder: LinearGeometryBuilder,
    LinearIterator: LinearIterator,
    LinearLocation: LinearLocation,
    LocationIndexedLine: LocationIndexedLine
  });

  class CollectionUtil {
    static transform(coll, func) {
      const result = new ArrayList();

      for (let i = coll.iterator(); i.hasNext();) result.add(func.execute(i.next()));

      return result;
    }

    static select(collection, func) {
      const result = new ArrayList();

      for (let i = collection.iterator(); i.hasNext();) {
        const item = i.next();
        if (Boolean.TRUE.equals(func.execute(item))) result.add(item);
      }

      return result;
    }

    static apply(coll, func) {
      for (let i = coll.iterator(); i.hasNext();) func.execute(i.next());
    }

  }

  function Function() {}

  CollectionUtil.Function = Function;

  class CoordinateArrayFilter {
    constructor() {
      CoordinateArrayFilter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.pts = null;
      this.n = 0;
      const size = arguments[0];
      this.pts = new Array(size).fill(null);
    }

    filter(coord) {
      this.pts[this.n++] = coord;
    }

    getCoordinates() {
      return this.pts;
    }

    get interfaces_() {
      return [CoordinateFilter];
    }

  }

  class CoordinateCountFilter {
    constructor() {
      CoordinateCountFilter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._n = 0;
    }

    filter(coord) {
      this._n++;
    }

    getCount() {
      return this._n;
    }

    get interfaces_() {
      return [CoordinateFilter];
    }

  }

  class ObjectCounter {
    constructor() {
      ObjectCounter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this._counts = new HashMap();
    }

    count(o) {
      const counter = this._counts.get(o);

      if (counter === null) return 0;else return counter.count();
    }

    add(o) {
      const counter = this._counts.get(o);

      if (counter === null) this._counts.put(o, new Counter(1));else counter.increment();
    }

  }

  class Counter {
    constructor() {
      Counter.constructor_.apply(this, arguments);
    }

    static constructor_() {
      this.count = 0;

      if (arguments.length === 0) ; else if (arguments.length === 1) {
        const count = arguments[0];
        this.count = count;
      }
    }

    count() {
      return this.count;
    }

    increment() {
      this.count++;
    }

  }

  ObjectCounter.Counter = Counter;

  function PrintStream() {}

  function StringReader() {}

  function ByteArrayOutputStream() {}

  class IOException extends Exception {}

  function LineNumberReader() {}

  class StringUtil {
    static chars(c, n) {
      const ch = new Array(n).fill(null);

      for (let i = 0; i < n; i++) ch[i] = c;

      return new String(ch);
    }

    static getStackTrace() {
      if (arguments.length === 1) {
        const t = arguments[0];
        const os = new ByteArrayOutputStream();
        const ps = new PrintStream(os);
        t.printStackTrace(ps);
        return os.toString();
      } else if (arguments.length === 2) {
        const t = arguments[0],
              depth = arguments[1];
        let stackTrace = '';
        const stringReader = new StringReader(StringUtil.getStackTrace(t));
        const lineNumberReader = new LineNumberReader(stringReader);

        for (let i = 0; i < depth; i++) try {
          stackTrace += lineNumberReader.readLine() + StringUtil.NEWLINE;
        } catch (e) {
          if (e instanceof IOException) Assert.shouldNeverReachHere();else throw e;
        } finally {}

        return stackTrace;
      }
    }

    static spaces(n) {
      return StringUtil.chars(' ', n);
    }

    static split(s, separator) {
      const separatorlen = separator.length;
      const tokenList = new ArrayList();
      let tmpString = '' + s;
      let pos = tmpString.indexOf(separator);

      while (pos >= 0) {
        const token = tmpString.substring(0, pos);
        tokenList.add(token);
        tmpString = tmpString.substring(pos + separatorlen);
        pos = tmpString.indexOf(separator);
      }

      if (tmpString.length > 0) tokenList.add(tmpString);
      const res = new Array(tokenList.size()).fill(null);

      for (let i = 0; i < res.length; i++) res[i] = tokenList.get(i);

      return res;
    }

  }
  StringUtil.NEWLINE = System.getProperty('line.separator');

  var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CollectionUtil: CollectionUtil,
    CoordinateArrayFilter: CoordinateArrayFilter,
    CoordinateCountFilter: CoordinateCountFilter,
    GeometricShapeFactory: GeometricShapeFactory,
    NumberUtil: NumberUtil,
    ObjectCounter: ObjectCounter,
    PriorityQueue: PriorityQueue,
    StringUtil: StringUtil,
    UniqueCoordinateArrayFilter: UniqueCoordinateArrayFilter
  });

  class UnionOp {
    get interfaces_() {
      return [];
    }

    getClass() {
      return UnionOp;
    }

    static union(g, other) {
      if (g.isEmpty() || other.isEmpty()) {
        if (g.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.UNION, g, other, g.getFactory());
        if (g.isEmpty()) return other.copy();
        if (other.isEmpty()) return g.copy();
      }

      g.checkNotGeometryCollection(g);
      g.checkNotGeometryCollection(other);
      return SnapIfNeededOverlayOp.overlayOp(g, other, OverlayOp.UNION);
    }

  }

  LineString.prototype.getBoundary = function () {
    return BoundaryOp.getBoundary(this);
  };

  MultiLineString.prototype.getBoundary = function () {
    return BoundaryOp.getBoundary(this);
  };

  Geometry.prototype.equalsTopo = function (g) {
    return RelateOp.equalsTopo(this, g);
  };

  Geometry.prototype.equals = function (g) {
    if (g === null) return false;
    return RelateOp.equalsTopo(this, g);
  };

  Geometry.prototype.union = function () {
    if (arguments.length === 0) {
      return UnaryUnionOp.union(this);
    } else if (arguments.length === 1) {
      const other = arguments[0];
      return UnionOp.union(this, other);
    }
  };

  Geometry.prototype.isValid = function () {
    return IsValidOp.isValid(this);
  };

  Geometry.prototype.intersection = function (other) {
    return OverlayOp.intersection(this, other);
  };

  Geometry.prototype.covers = function (g) {
    return RelateOp.covers(this, g);
  };

  Geometry.prototype.coveredBy = function (g) {
    return RelateOp.covers(g, this);
  };

  Geometry.prototype.touches = function (g) {
    return RelateOp.touches(this, g);
  };

  Geometry.prototype.intersects = function (g) {
    return RelateOp.intersects(this, g);
  };

  Geometry.prototype.within = function (g) {
    return RelateOp.contains(g, this);
  };

  Geometry.prototype.overlaps = function (g) {
    return RelateOp.overlaps(this, g);
  };

  Geometry.prototype.disjoint = function (g) {
    return RelateOp.disjoint(this, g);
  };

  Geometry.prototype.crosses = function (g) {
    return RelateOp.crosses(this, g);
  };

  Geometry.prototype.buffer = function () {
    if (arguments.length === 1) {
      const distance = arguments[0];
      return BufferOp.bufferOp(this, distance);
    } else if (arguments.length === 2) {
      const distance = arguments[0];
      const quadrantSegments = arguments[1];
      return BufferOp.bufferOp(this, distance, quadrantSegments);
    } else if (arguments.length === 3) {
      const distance = arguments[0];
      const quadrantSegments = arguments[1];
      const endCapStyle = arguments[2];
      return BufferOp.bufferOp(this, distance, quadrantSegments, endCapStyle);
    }
  };

  Geometry.prototype.convexHull = function () {
    return new ConvexHull(this).getConvexHull();
  };

  Geometry.prototype.relate = function () {
    if (arguments.length === 1) {
      const geometry = arguments[0];
      return RelateOp.relate(this, geometry);
    } else if (arguments.length === 2) {
      const geometry = arguments[0];
      const intersectionPattern = arguments[1];
      return RelateOp.relate(this, geometry).matches(intersectionPattern);
    }
  };

  Geometry.prototype.getCentroid = function () {
    if (this.isEmpty()) return this._factory.createPoint();
    const centPt = Centroid.getCentroid(this);
    return this.createPointFromInternalCoord(centPt, this);
  };

  Geometry.prototype.getInteriorPoint = function () {
    if (this.isEmpty()) return this._factory.createPoint();
    let intPt = null;
    const dim = this.getDimension();
    if (dim === 0) intPt = new InteriorPointPoint(this);else if (dim === 1) intPt = new InteriorPointLine(this);else intPt = new InteriorPointArea(this);
    const interiorPt = intPt.getInteriorPoint();
    return this.createPointFromInternalCoord(interiorPt, this);
  };

  Geometry.prototype.symDifference = function (other) {
    return OverlayOp.symDifference(this, other);
  };

  Geometry.prototype.createPointFromInternalCoord = function (coord, exemplar) {
    exemplar.getPrecisionModel().makePrecise(coord);
    return exemplar.getFactory().createPoint(coord);
  };

  Geometry.prototype.toText = function () {
    const writer = new WKTWriter();
    return writer.write(this);
  };

  Geometry.prototype.toString = function () {
    this.toText();
  };

  Geometry.prototype.contains = function (g) {
    return RelateOp.contains(this, g);
  };

  Geometry.prototype.difference = function (other) {
    return OverlayOp.difference(this, other);
  };

  Geometry.prototype.isSimple = function () {
    const op = new IsSimpleOp(this);
    return op.isSimple();
  };

  Geometry.prototype.isWithinDistance = function (geom, distance) {
    const envDist = this.getEnvelopeInternal().distance(geom.getEnvelopeInternal());
    if (envDist > distance) return false;
    return DistanceOp.isWithinDistance(this, geom, distance);
  };

  Geometry.prototype.distance = function (g) {
    return DistanceOp.distance(this, g);
  };

  const version = '2.7.1 (16652a2)';

  exports.algorithm = algorithm;
  exports.densify = densify;
  exports.dissolve = dissolve;
  exports.geom = geom;
  exports.geomgraph = geomgraph;
  exports.index = index;
  exports.io = io;
  exports.linearref = linearref;
  exports.noding = noding;
  exports.operation = operation;
  exports.precision = precision;
  exports.simplify = simplify;
  exports.triangulate = triangulate;
  exports.util = util;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=jsts.js.map
