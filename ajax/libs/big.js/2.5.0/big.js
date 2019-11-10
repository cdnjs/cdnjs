/* big.js v2.5.0 https://github.com/MikeMcl/big.js/LICENCE */
;(function ( global ) {
    'use strict';

    /*
      big.js v2.5.0
      A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
      https://github.com/MikeMcl/big.js/
      Copyright (c) 2012 Michael Mclaughlin <M8ch88l@gmail.com>
      MIT Expat Licence
    */

    /****************************** EDITABLE DEFAULTS **********************************/


    // The default values below must be integers within the stated ranges (inclusive).

    /*
     * The maximum number of decimal places of the results of methods involving
     * division, i.e. 'div' and 'sqrt', and 'pow' with negative exponents.
     */
    Big['DP'] = 20;                                  // 0 to MAX_DP

    /*
     * The rounding mode used when rounding to the above decimal places.
     *
     * 0 Round towards zero (i.e. truncate, no rounding).               (ROUND_DOWN)
     * 1 Round to nearest neighbour. If equidistant, round up.          (ROUND_HALF_UP)
     * 2 Round to nearest neighbour. If equidistant, to even neighbour. (ROUND_HALF_EVEN)
     * 3 Round away from zero.                                          (ROUND_UP)
     */
    Big['RM'] = 1;                                   // 0, 1, 2 or 3

        // The maximum value of 'Big.DP'.
    var MAX_DP = 1E6,                                // 0 to 1e+6

        // The maximum magnitude of the exponent argument to the 'pow' method.
        MAX_POWER = 1E6,                             // 1 to 1e+6

        /*
         * The exponent value at and beneath which 'toString' returns exponential notation.
         * Javascript's Number type: -7
         * -1e+6 is the minimum recommended exponent value of a Big.
         */
        TO_EXP_NEG = -7,                             // 0 to -1e+6

        /*
         * The exponent value at and above which 'toString' returns exponential notation.
         * Javascript's Number type: 21
         * 1e+6 is the maximum recommended exponent value of a Big, though there is no
         * enforcing or checking of a limit.
         */
        TO_EXP_POS = 21,                             // 0 to 1e+6


    /***********************************************************************************/

        P = Big.prototype,
        isValid = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        ONE = new Big(1);


    // CONSTRUCTOR


    /*
     * The exported function.
     * Create and return a new instance of a Big object.
     *
     * n {number|string|Big} A numeric value.
     */
    function Big( n ) {
        var i, j, nL,
            x = this;

        // Enable constructor usage without new.
        if ( !(x instanceof Big) ) {
            return new Big( n )
        }

        // Duplicate.
        if ( n instanceof Big ) {
            x['s'] = n['s'];
            x['e'] = n['e'];
            x['c'] = n['c'].slice();
            return
        }

        // Minus zero?
        if ( n === 0 && 1 / n < 0 ) {
            n = '-0'
        // Ensure 'n' is string and check validity.
        } else if ( !isValid.test(n += '') ) {
            throwErr( NaN )
        }

        // Determine sign.
        x['s'] = n.charAt(0) == '-' ? ( n = n.slice(1), -1 ) : 1;

        // Decimal point?
        if ( ( i = n.indexOf('.') ) > -1 ) {
            n = n.replace( '.', '' )
        }

        // Exponential form?
        if ( ( j = n.search(/e/i) ) > 0 ) {

            // Determine exponent.
            if ( i < 0 ) {
                i = j
            }
            i += +n.slice( j + 1 );
            n = n.substring( 0, j )

        } else if ( i < 0 ) {

            // Integer.
            i = n.length
        }

        // Determine leading zeros.
        for ( j = 0; n.charAt(j) == '0'; j++ ) {
        }

        if ( j == ( nL = n.length ) ) {

            // Zero.
            x['c'] = [ x['e'] = 0 ]
        } else {

            // Determine trailing zeros.
            for ( ; n.charAt(--nL) == '0'; ) {
            }

            x['e'] = i - j - 1;
            x['c'] = [];

            // Convert string to array of digits (without leading and trailing zeros).
            for ( i = 0; j <= nL; x['c'][i++] = +n.charAt(j++) ) {
            }
        }
    }


    // PRIVATE FUNCTIONS


    /*
     * Round Big 'x' to a maximum of 'dp' decimal places using rounding mode
     * 'rm'. (Called by 'div', 'sqrt' and 'round'.)
     *
     * x {Big} The Big to round.
     * dp {number} Integer, 0 to MAX_DP inclusive.
     * rm {number} 0, 1, 2 or 3 ( ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP )
     * [more] {boolean} Whether the result of division was truncated.
     */
    function rnd( x, dp, rm, more ) {
        var xc = x['c'],
            i = x['e'] + dp + 1;

        if ( rm === 1 ) {
            // 'xc[i]' is the digit after the digit that may be rounded up.
            more = xc[i] >= 5
        } else if ( rm === 2 ) {
            more = xc[i] > 5 || xc[i] == 5 && ( more || i < 0 || xc[i + 1] != null || xc[i - 1] & 1 )
        } else if ( rm === 3 ) {
            more = more || xc[i] != null || i < 0
        } else if ( more = false, rm !== 0 ) {
            throwErr( '!Big.RM!' )
        }

        if ( i < 1 || !xc[0] ) {
            x['c'] = more
              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
              ? ( x['e'] = -dp, [1] )
              // Zero.
              : [ x['e'] = 0 ];
        } else {

            // Remove any digits after the required decimal places.
            xc.length = i--;

            // Round up?
            if ( more ) {

                // Rounding up may mean the previous digit has to be rounded up and so on.
                for ( ; ++xc[i] > 9; ) {
                    xc[i] = 0;

                    if ( !i-- ) {
                        ++x['e'];
                        xc.unshift(1)
                    }
                }
            }

            // Remove trailing zeros.
            for ( i = xc.length; !xc[--i]; xc.pop() ) {
            }
        }

        return x
    }


    /*
     * Throw a BigError.
     *
     * message {string} The error message.
     */
    function throwErr( message ) {
        var err = new Error( message );
        err['name'] = 'BigError';

        throw err
    }


    // PROTOTYPE/INSTANCE METHODS


    /*
     * Return a new Big whose value is the absolute value of this Big.
     */
    P['abs'] = function () {
        var x = new Big(this);
        x['s'] = 1;

        return x
    };


    /*
     * Return
     * 1 if the value of this 'Big' is greater than the value of 'Big' 'y',
     * -1 if the value of this 'Big' is less than the value of 'Big' 'y', or
     * 0 if they have the same value.
    */
    P['cmp'] = function ( y ) {
        var xNeg,
            x = this,
            xc = x['c'],
            yc = ( y = new Big( y ) )['c'],
            i = x['s'],
            j = y['s'],
            k = x['e'],
            l = y['e'];

        // Either zero?
        if ( !xc[0] || !yc[0] ) {
            return !xc[0] ? !yc[0] ? 0 : -j : i
        }

        // Signs differ?
        if ( i != j ) {
            return i
        }
        xNeg = i < 0;

        // Compare exponents.
        if ( k != l ) {
            return k > l ^ xNeg ? 1 : -1
        }

        // Compare digit by digit.
        for ( i = -1,
              j = ( k = xc.length ) < ( l = yc.length ) ? k : l;
              ++i < j; ) {

            if ( xc[i] != yc[i] ) {
                return xc[i] > yc[i] ^ xNeg ? 1 : -1
            }
        }

        // Compare lengths.
        return k == l ? 0 : k > l ^ xNeg ? 1 : -1
    };


    /*
     * Return a new Big whose value is the value of this Big divided by the
     * value of Big 'y', rounded, if necessary, to a maximum of 'Big.DP'
     * decimal places using rounding mode 'Big.RM'.
     */
    P['div'] = function ( y ) {
        var x = this,
            dvd = x['c'],
            dvs = ( y = new Big(y) )['c'],
            s = x['s'] == y['s'] ? 1 : -1,
            dp = Big['DP'];

        if ( dp !== ~~dp || dp < 0 || dp > MAX_DP ) {
            throwErr( '!Big.DP!' )
        }

        // Either 0?
        if ( !dvd[0] || !dvs[0] ) {

            // Both 0?
            if ( dvd[0] == dvs[0] ) {
                throwErr( NaN )
            }

            // 'dvs' is 0?
            if ( !dvs[0] ) {
                // Throw +-Infinity.
                throwErr( s / 0 )
            }

            // 'dvd' is 0. Return +-0.
            return new Big( s * 0 )
        }

        var dvsL, dvsT, next, cmp, remI,
            dvsZ = dvs.slice(),
            dvdI = dvsL = dvs.length,
            dvdL = dvd.length,
            rem = dvd.slice( 0, dvsL ),
            remL = rem.length,
            quo = new Big(ONE),
            qc = quo['c'] = [],
            qi = 0,
            digits = dp + ( quo['e'] = x['e'] - y['e'] ) + 1;

        quo['s'] = s;
        s = digits < 0 ? 0 : digits;

        // Create version of divisor with leading zero.
        dvsZ.unshift(0);

        // Add zeros to make remainder as long as divisor.
        for ( ; remL++ < dvsL; rem.push(0) ) {
        }

        do {

            // 'next' is how many times the divisor goes into the current remainder.
            for ( next = 0; next < 10; next++ ) {

                // Compare divisor and remainder.
                if ( dvsL != ( remL = rem.length ) ) {
                    cmp = dvsL > remL ? 1 : -1
                } else {
                    for ( remI = -1, cmp = 0; ++remI < dvsL; ) {

                        if ( dvs[remI] != rem[remI] ) {
                            cmp = dvs[remI] > rem[remI] ? 1 : -1;
                            break
                        }
                    }
                }

                // Subtract divisor from remainder (if divisor < remainder).
                if ( cmp < 0 ) {

                    // Remainder cannot be more than one digit longer than divisor.
                    // Equalise lengths using divisor with extra leading zero?
                    for ( dvsT = remL == dvsL ? dvs : dvsZ; remL; ) {

                        if ( rem[--remL] < dvsT[remL] ) {

                            for ( remI = remL;
                                  remI && !rem[--remI];
                                  rem[remI] = 9 ) {
                            }
                            --rem[remI];
                            rem[remL] += 10
                        }
                        rem[remL] -= dvsT[remL]
                    }
                    for ( ; !rem[0]; rem.shift() ) {
                    }
                } else {
                    break
                }
            }

            // Add the 'next' digit to the result array.
            qc[qi++] = cmp ? next : ++next;

            // Update the remainder.
            rem[0] && cmp
              ? ( rem[remL] = dvd[dvdI] || 0 )
              : ( rem = [ dvd[dvdI] ] )

        } while ( ( dvdI++ < dvdL || rem[0] != null ) && s-- );

        // Leading zero? Do not remove if result is simply zero (qi == 1).
        if ( !qc[0] && qi != 1) {

            // There can't be more than one zero.
            qc.shift();
            quo['e']--;
        }

        // Round?
        if ( qi > digits ) {
            rnd( quo, dp, Big['RM'], rem[0] != null )
        }

        return quo
    }


    /*
     * Return true if the value of this Big is equal to the value of Big 'y',
     * otherwise returns false.
     */
    P['eq'] = function ( y ) {
        return !this.cmp( y )
    };


    /*
     * Return true if the value of this Big is greater than the value of Big 'y',
     * otherwise returns false.
     */
    P['gt'] = function ( y ) {
        return this.cmp( y ) > 0
    };


    /*
     * Return true if the value of this Big is greater than or equal to the
     * value of Big 'y', otherwise returns false.
     */
    P['gte'] = function ( y ) {
        return this.cmp( y ) > -1
    };


    /*
     * Return true if the value of this Big is less than the value of Big 'y',
     * otherwise returns false.
     */
    P['lt'] = function ( y ) {
        return this.cmp( y ) < 0
    };


    /*
     * Return true if the value of this Big is less than or equal to the value
     * of Big 'y', otherwise returns false.
     */
    P['lte'] = function ( y ) {
         return this.cmp( y ) < 1
    };


    /*
     * Return a new Big whose value is the value of this Big minus the value
     * of Big 'y'.
     */
    P['minus'] = function ( y ) {
        var d, i, j, xLTy,
            x = this,
            a = x['s'],
            b = ( y = new Big( y ) )['s'];

        // Signs differ?
        if ( a != b ) {
            return y['s'] = -b, x['plus'](y)
        }

        var xc = x['c'].slice(),
            xe = x['e'],
            yc = y['c'],
            ye = y['e'];

        // Either zero?
        if ( !xc[0] || !yc[0] ) {

            // 'y' is non-zero?
            return yc[0]
              ? ( y['s'] = -b, y )
              // 'x' is non-zero?
              : new Big( xc[0]
                ? x
                // Both are zero.
                : 0 )
        }

        // Determine which is the bigger number.
        // Prepend zeros to equalise exponents.
        if ( a = xe - ye ) {
            d = ( xLTy = a < 0 ) ? ( a = -a, xc ) : ( ye = xe, yc );

            for ( d.reverse(), b = a; b--; d.push(0) ) {
            }
            d.reverse()
        } else {

            // Exponents equal. Check digit by digit.
            j = ( ( xLTy = xc.length < yc.length ) ? xc : yc ).length;

            for ( a = b = 0; b < j; b++ ) {

                if ( xc[b] != yc[b] ) {
                    xLTy = xc[b] < yc[b];
                    break
                }
            }
        }

        // 'x' < 'y'? Point 'xc' to the array of the bigger number.
        if ( xLTy ) {
            d = xc, xc = yc, yc = d;
            y['s'] = -y['s']
        }

        /*
         * Append zeros to 'xc' if shorter. No need to add zeros to 'yc' if shorter
         * as subtraction only needs to start at 'yc.length'.
         */
        if ( ( b = -( ( j = xc.length ) - yc.length ) ) > 0 ) {

            for ( ; b--; xc[j++] = 0 ) {
            }
        }

        // Subtract 'yc' from 'xc'.
        for ( b = yc.length; b > a; ){

            if ( xc[--b] < yc[b] ) {

                for ( i = b; i && !xc[--i]; xc[i] = 9 ) {
                }
                --xc[i];
                xc[b] += 10
            }
            xc[b] -= yc[b]
        }

        // Remove trailing zeros.
        for ( ; xc[--j] == 0; xc.pop() ) {
        }

        // Remove leading zeros and adjust exponent accordingly.
        for ( ; xc[0] == 0; xc.shift(), --ye ) {
        }

        if ( !xc[0] ) {

            // n - n = +0
            y['s'] = 1;

            // Result must be zero.
            xc = [ye = 0]
        }

        return y['c'] = xc, y['e'] = ye, y
    };


    /*
     * Return a new Big whose value is the value of this Big modulo the
     * value of Big 'y'.
     */
    P['mod'] = function ( y ) {
        y = new Big( y );
        var c,
            x = this,
            i = x['s'],
            j = y['s'];

        if ( !y['c'][0] ) {
            throwErr( NaN )
        }

        x['s'] = y['s'] = 1;
        c = y.cmp( x ) == 1;
        x['s'] = i, y['s'] = j;

        return c
          ? new Big(x)
          : ( i = Big['DP'], j = Big['RM'],
            Big['DP'] = Big['RM'] = 0,
              x = x['div'](y),
                Big['DP'] = i, Big['RM'] = j,
                  this['minus']( x['times'](y) ) )
    };


    /*
     * Return a new Big whose value is the value of this Big plus the value
     * of Big 'y'.
     */
    P['plus'] = function ( y ) {
        var d,
            x = this,
            a = x['s'],
            b = ( y = new Big( y ) )['s'];

        // Signs differ?
        if ( a != b ) {
            return y['s'] = -b, x['minus'](y)
        }

        var xe = x['e'],
            xc = x['c'],
            ye = y['e'],
            yc = y['c'];

        // Either zero?
        if ( !xc[0] || !yc[0] ) {

            // 'y' is non-zero?
            return yc[0]
              ? y
              : new Big( xc[0]

                // 'x' is non-zero?
                ? x

                // Both are zero. Return zero.
                : a * 0 )
        }

        // Prepend zeros to equalise exponents.
        // Note: Faster to use reverse then do unshifts.
        if ( xc = xc.slice(), a = xe - ye ) {
            d = a > 0 ? ( ye = xe, yc ) : ( a = -a, xc );

            for ( d.reverse(); a--; d.push(0) ) {
            }
            d.reverse()
        }

        // Point 'xc' to the longer array.
        if ( xc.length - yc.length < 0 ) {
            d = yc, yc = xc, xc = d
        }

        /*
         * Only start adding at 'yc.length - 1' as the
         * further digits of 'xc' can be left as they are.
         */
        for ( a = yc.length, b = 0; a;
             b = ( xc[--a] = xc[a] + yc[a] + b ) / 10 ^ 0, xc[a] %= 10 ) {
        }

        // No need to check for zero, as +x + +y != 0 && -x + -y != 0

        if ( b ) {
            xc.unshift(b);
            ++ye
        }

         // Remove trailing zeros.
        for ( a = xc.length; xc[--a] == 0; xc.pop() ) {
        }

        return y['c'] = xc, y['e'] = ye, y
    };


    /*
     * Return a Big whose value is the value of this Big raised to the power
     * 'e'. If 'e' is negative, round, if necessary, to a maximum of 'Big.DP'
     * decimal places using rounding mode 'Big.RM'.
     *
     * e {number} Integer, -MAX_POWER to MAX_POWER inclusive.
     */
    P['pow'] = function ( e ) {
        var isNeg = e < 0,
            x = new Big(this),
            y = ONE;

        if ( e !== ~~e || e < -MAX_POWER || e > MAX_POWER ) {
            throwErr( '!pow!' )
        }

        for ( e = isNeg ? -e : e; ; ) {

            if ( e & 1 ) {
                y = y['times'](x)
            }
            e >>= 1;

            if ( !e ) {
                break
            }
            x = x['times'](x)
        }

        return isNeg ? ONE['div'](y) : y
    };


    /*
     * Return a new Big whose value is the value of this Big rounded, if
     * necessary, to a maximum of 'dp' decimal places using rounding mode 'rm'.
     * If 'dp' is not specified, round to 0 decimal places.
     * If 'rm' is not specified, use 'Big.RM'.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     * [rm] 0, 1, 2 or 3 ( ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP )
     */
    P['round'] = function ( dp, rm ) {
        var x = new Big(this);

        if ( dp == null ) {
            dp = 0
        } else if ( dp !== ~~dp || dp < 0 || dp > MAX_DP ) {
            throwErr( '!round!' )
        }
        rnd( x, dp, rm == null ? Big['RM'] : rm );

        return x
    };


    /*
     * Return a new Big whose value is the square root of the value of this
     * Big, rounded, if necessary, to a maximum of 'Big.DP' decimal places
     * using rounding mode 'Big.RM'.
     */
    P['sqrt'] = function () {
        var estimate, r, approx,
            x = this,
            xc = x['c'],
            i = x['s'],
            e = x['e'],
            half = new Big('0.5');

        // Zero?
        if ( !xc[0] ) {
            return new Big(x)
        }

        // Negative?
        if ( i < 0 ) {
            throwErr( NaN )
        }

        // Estimate.
        i = Math.sqrt( x.toString() );

        // Math.sqrt underflow/overflow?
        // Pass 'x' to Math.sqrt as integer, then adjust the exponent of the result.
        if ( i == 0 || i == 1 / 0 ) {
            estimate = xc.join('');

            if ( !( estimate.length + e & 1 ) ) {
                estimate += '0'
            }

            r = new Big( Math.sqrt(estimate).toString() );
            r['e'] = ( ( ( e + 1 ) / 2 ) | 0 ) - ( e < 0 || e & 1 )
        } else {
            r = new Big( i.toString() )
        }

        i = r['e'] + ( Big['DP'] += 4 );

        // Newton-Raphson loop.
        do {
            approx = r;
            r = half['times']( approx['plus']( x['div'](approx) ) )
        } while ( approx['c'].slice( 0, i ).join('') !==
                       r['c'].slice( 0, i ).join('') );

        rnd( r, Big['DP'] -= 4, Big['RM'] );

        return r
    };


    /*
     * Return a new Big whose value is the value of this Big times the value
     * of Big 'y'.
     */
    P['times'] = function ( y ) {
        var c,
            x = this,
            xc = x['c'],
            yc = ( y = new Big( y ) )['c'],
            a = xc.length,
            b = yc.length,
            i = x['e'],
            j = y['e'];

        y['s'] = x['s'] == y['s'] ? 1 : -1;

        // Either 0?
        if ( !xc[0] || !yc[0] ) {

            return new Big( y['s'] * 0 )
        }

        y['e'] = i + j;

        if ( a < b ) {
            c = xc, xc = yc, yc = c, j = a, a = b, b = j
        }

        for ( j = a + b, c = []; j--; c.push(0) ) {
        }

        // Multiply!
        for ( i = b - 1; i > -1; i-- ) {

            for ( b = 0, j = a + i;
                  j > i;
                  b = c[j] + yc[i] * xc[j - i - 1] + b,
                  c[j--] = b % 10 | 0,
                  b = b / 10 | 0 ) {
            }

            if ( b ) {
                c[j] = ( c[j] + b ) % 10
            }
        }

        b && ++y['e'];

        // Remove any leading zero.
        !c[0] && c.shift();

        // Remove trailing zeros.
        for ( j = c.length; !c[--j]; c.pop() ) {
        }

        return y['c'] = c, y
    };


    /*
     * Return a string representing the value of this Big.
     * Return exponential notation if this Big has a positive exponent equal
     * to or greater than 'TO_EXP_POS', or a negative exponent equal to or less
     * than 'TO_EXP_NEG'.
     */
    P['toString'] = P['valueOf'] = P['toJSON'] = function () {
        var x = this,
            e = x['e'],
            str = x['c'].join(''),
            strL = str.length;

        // Exponential notation?
        if ( e <= TO_EXP_NEG || e >= TO_EXP_POS ) {
            str = str.charAt(0) + ( strL > 1 ?  '.' + str.slice(1) : '' ) +
              ( e < 0 ? 'e' : 'e+' ) + e

        // Negative exponent?
        } else if ( e < 0 ) {

        // Prepend zeros.
            for ( ; ++e; str = '0' + str ) {
            }
            str = '0.' + str

        // Positive exponent?
        } else if ( e > 0 ) {

            if ( ++e > strL ) {

                // Append zeros.
                for ( e -= strL; e-- ; str += '0' ) {
                }
            } else if ( e < strL ) {
                str = str.slice( 0, e ) + '.' + str.slice(e)
            }

        // Exponent zero.
        } else if ( strL > 1 ) {
            str = str.charAt(0) + '.' + str.slice(1)
        }

        // Avoid '-0'
        return x['s'] < 0 && x['c'][0] ? '-' + str : str
    };


    /*
     ***************************************************************************
     * If 'toExponential', 'toFixed', 'toPrecision' and 'format' are not
     * required they can safely be commented-out or deleted. No redundant code
     * will be left. 'format' is used only by 'toExponential', 'toFixed' and
     * 'toPrecision'.
     ***************************************************************************
     */


    /*
     * PRIVATE FUNCTION
     *
     * Return a string representing the value of Big 'x' in normal or
     * exponential notation to a fixed number of decimal places or significant
     * digits 'dp'.
     * (Called by toString, toExponential, toFixed and toPrecision.)
     *
     * x {Big} The Big to format.
     * dp {number} Integer, 0 to MAX_DP inclusive.
     * toE {number} undefined (toFixed), 1 (toExponential) or 2 (toPrecision).
     */
    function format( x, dp, toE ) {
        // The index (in normal notation) of the digit that may be rounded up.
        var i = dp - ( x = new Big(x) )['e'],
            c = x['c'];

        // Round?
        if ( c.length > ++dp ) {
            rnd( x, i, Big['RM'] )
        }

        // Recalculate 'i' if toFixed as 'x.e' may have changed if value rounded up.
        i = !c[0] ? i + 1 : toE ? dp : ( c = x['c'], x['e'] + i + 1 );

        // Append zeros?
        for ( ; c.length < i; c.push(0) ) {
        }
        i = x['e'];

        /*
         * 'toPrecision' returns exponential notation if the number of
         * significant digits specified is less than the number of digits
         * necessary to represent the integer part of the value in normal
         * notation.
         */
        return toE == 1 || toE == 2 && ( dp <= i || i <= TO_EXP_NEG )

            // Exponential notation.
            ? ( x['s'] < 0 && c[0] ? '-' : '' ) + ( c.length > 1
              ? ( c.splice( 1, 0, '.' ), c.join('') )
              : c[0] ) + ( i < 0 ? 'e' : 'e+' ) + i

            // Normal notation.
            : x.toString()
    }


    /*
     * Return a string representing the value of this Big in exponential
     * notation to 'dp' fixed decimal places and rounded, if necessary, using
     * 'Big.RM'.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     */
    P['toExponential'] = function ( dp ) {

        if ( dp == null ) {
            dp = this['c'].length - 1
        } else if ( dp !== ~~dp || dp < 0 || dp > MAX_DP ) {
            throwErr( '!toExp!' )
        }

        return format( this, dp, 1 )
    };


    /*
     * Return a string representing the value of this Big in normal notation
     * to 'dp' fixed decimal places and rounded, if necessary, using 'Big.RM'.
     *
     * [dp] {number} Integer, 0 to MAX_DP inclusive.
     */
    P['toFixed'] = function ( dp ) {
        var str,
            x = this,
            neg = TO_EXP_NEG,
            pos = TO_EXP_POS;

        TO_EXP_NEG = -( TO_EXP_POS = 1 / 0 );

        if ( dp == null ) {
            str = x.toString()
        } else if ( dp === ~~dp && dp >= 0 && dp <= MAX_DP ) {
            str = format( x, x['e'] + dp );

            // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
            // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
            if ( x['s'] < 0 && x['c'][0] && str.indexOf('-') < 0 ) {
                // As e.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
                str = '-' + str
            }
        }
        TO_EXP_NEG = neg, TO_EXP_POS = pos;

        if ( !str ) {
            throwErr( '!toFix!' )
        }

        return str
    };


    /*
     * Return a string representing the value of this Big to 'sd' significant
     * digits and rounded, if necessary, using 'Big.RM'. If 'sd' is less than
     * the number of digits necessary to represent the integer part of the value
     * in normal notation, then use exponential notation.
     *
     * sd {number} Integer, 1 to MAX_DP inclusive.
     */
    P['toPrecision'] = function ( sd ) {

        if ( sd == null ) {
            return this.toString()
        } else if ( sd !== ~~sd || sd < 1 || sd > MAX_DP ) {
            throwErr( '!toPre!' )
        }

        return format( this, sd - 1, 2 )
    };


    // EXPORT


    // Node and other CommonJS-like environments that support module.exports.
    if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = Big

    //AMD.
    } else if ( typeof define == 'function' && define.amd ) {
        define( function () {
            return Big
        })

    //Browser.
    } else {
        global['Big'] = Big
    }

})( this );
