/*! decimal.js v2.0.0 https://github.com/MikeMcl/decimal.js/LICENCE */
;(function (global) {
    'use strict';


    /*
     *  decimal.js v2.0.0
     *  An arbitrary-precision Decimal type for JavaScript.
     *  https://github.com/MikeMcl/decimal.js
     *  Copyright (c) 2014 Michael Mclaughlin <M8ch88l@gmail.com>
     *  MIT Expat Licence
     */


    var convertBase, crypto, DecimalConstructor, noConflict,
        toString = Object.prototype.toString,
        outOfRange,
        id = 0,
        external = true,
        NUMERALS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
        P = {},

        /*
         The maximum exponent magnitude.
         The limit on the value of #toExpNeg, #toExpPos, #minE and #maxE.
         */
        EXP_LIMIT = 9e15,                      // 0 to 9e15

        /*
         The limit on the value of #precision, and on the argument to #toDecimalPlaces,
         #toExponential, #toFixed, #toFormat, #toPrecision and #toSignificantDigits.
         */
        MAX_DIGITS = 1E9,                      // 0 to 1e+9

        /*
         To decide whether or not to calculate x.pow(integer y) using the 'exponentiation by
         squaring' algorithm or by exp(y*ln(x)), the number of significant digits of x is multiplied
         by y. If this number is less than #INT_POW_LIMIT then the former algorithm is used.
         */
        INT_POW_LIMIT = 3000,                  // 0 to 5000

        // The natural logarithm of 10 (1025 digits).
        LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058';


    // Decimal prototype methods


    /*
     * Return a new Decimal whose value is the absolute value of this Decimal.
     *
     */
    P['absoluteValue'] = P['abs'] = function () {
        var x = new this['constructor'](this);

        if ( x['s'] < 0 ) {
            x['s'] = 1;
        }

        return rnd(x);
    };


    /*
     * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in
     * the direction of positive Infinity.
     *
     */
    P['ceil'] = function () {

        return rnd( new this['constructor'](this), this['e'] + 1, 2 );
    };


    /*
     * Return
     *   1    if the value of this Decimal is greater than the value of Decimal(y, b),
     *  -1    if the value of this Decimal is less than the value of Decimal(y, b),
     *   0    if they have the same value,
     *  null  if the value of either Decimal is NaN.
     *
     */
    P['comparedTo'] = P['cmp'] = function ( y, b ) {
        var a,
            x = this,
            xc = x['c'],
            yc = ( id = -id, y = new x['constructor']( y, b ), y['c'] ),
            i = x['s'],
            j = y['s'],
            k = x['e'],
            l = y['e'];

        // Either NaN?
        if ( !i || !j ) {
            return null;
        }

        a = xc && !xc[0];
        b = yc && !yc[0];

        // Either zero?
        if ( a || b ) {
            return a ? b ? 0 : -j : i;
        }

        // Signs differ?
        if ( i != j ) {
            return i;
        }

        a = i < 0;

        // Either Infinity?
        if ( !xc || !yc ) {
            return k == l ? 0 : !xc ^ a ? 1 : -1;
        }

        // Compare exponents.
        if ( k != l ) {
            return k > l ^ a ? 1 : -1;
        }

        // Compare digit by digit.
        for ( i = -1,
              j = ( k = xc.length ) < ( l = yc.length ) ? k : l;
              ++i < j; ) {

            if ( xc[i] != yc[i] ) {
                return xc[i] > yc[i] ^ a ? 1 : -1;
            }
        }

        // Compare lengths.
        return k == l ? 0 : k > l ^ a ? 1 : -1;
    };


    /*
     * Return the number of decimal places of the value of this Decimal.
     *
     */
    P['decimalPlaces'] = P['dp'] = function () {
        var x = this;

        return x['c'] ? Math.max( x['c'].length - x['e'] - 1, 0 ) : null;
    };


    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new Decimal whose value is the value of this Decimal divided by Decimal(y, b),
     * rounded to #precision significant digits using rounding mode #rounding.
     *
     */
    P['dividedBy'] = P['div'] = function ( y, b ) {
        id = 2;

        return div( this, new this['constructor']( y, b ) );
    };


    /*
     * Return a new Decimal whose value is the integer part of dividing the value of this Decimal by
     * the value of Decimal(y, b), rounded to #precision significant digits using rounding mode
     * #rounding.
     *
     */
    P['dividedToIntegerBy'] = P['divToInt'] = function ( y, b ) {
        var x = this,
            Decimal = x['constructor'];
        id = 18;

        return rnd(
          div( x, new Decimal( y, b ), 0, 1, 1 ), Decimal['precision'], Decimal['rounding']
        );
    };


    /*
     * Return true if the value of this Decimal is equal to the value of Decimal(n, b), otherwise
     * return false.
     *
     */
    P['equals'] = P['eq'] = function ( n, b ) {
        id = 3;

        return this['cmp']( n, b ) === 0;
    };


    /*
     * Return a new Decimal whose value is the exponential of the value of this Decimal, i.e. the
     * base e raised to the power the value of this Decimal, rounded to #precision significant digits
     * using rounding mode #rounding.
     *
     */
    P['exponential'] = P['exp'] = function () {

        return exp(this);
    };


    /*
     * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in
     * the direction of negative Infinity.
     *
     */
    P['floor'] = function () {

        return rnd( new this['constructor'](this), this['e'] + 1, 3 );
    };


    /*
     * Return true if the value of this Decimal is greater than the value of Decimal(n, b), otherwise
     * return false.
     *
     */
    P['greaterThan'] = P['gt'] = function ( n, b ) {
        id = 4;

        return this['cmp']( n, b ) > 0;
    };


    /*
     * Return true if the value of this Decimal is greater than or equal to the value of
     * Decimal(n, b), otherwise return false.
     *
     */
    P['greaterThanOrEqualTo'] = P['gte'] = function ( n, b ) {
        id = 5;
        b = this['cmp']( n, b );

        return b == 1 || b === 0;
    };


    /*
     * Return true if the value of this Decimal is a finite number, otherwise return false.
     *
     */
    P['isFinite'] = function () {

        return !!this['c'];
    };


    /*
     * Return true if the value of this Decimal is an integer, otherwise return false.
     *
     */
    P['isInteger'] = P['isInt'] = function () {

        return !!this['c'] && this['e'] > this['c'].length - 2;
    };


    /*
     * Return true if the value of this Decimal is NaN, otherwise return false.
     *
     */
    P['isNaN'] = function () {

        return !this['s'];
    };


    /*
     * Return true if the value of this Decimal is negative, otherwise return false.
     *
     */
    P['isNegative'] = P['isNeg'] = function () {

        return this['s'] < 0;
    };


    /*
     * Return true if the value of this Decimal is 0 or -0, otherwise return false.
     *
     */
    P['isZero'] = function () {

        return !!this['c'] && this['c'][0] == 0;
    };


    /*
     * Return true if the value of this Decimal is less than Decimal(n, b), otherwise return false.
     *
     */
    P['lessThan'] = P['lt'] = function ( n, b ) {
        id = 6;

        return this['cmp']( n, b ) < 0;
    };


    /*
     * Return true if the value of this Decimal is less than or equal to Decimal(n, b), otherwise
     * return false.
     *
     */
    P['lessThanOrEqualTo'] = P['lte'] = function ( n, b ) {
        id = 7;
        b = this['cmp']( n, b );

        return b == -1 || b === 0;
    };


    /*
     * Return the logarithm of the value of this Decimal to the specified base, rounded
     * to #precision significant digits using rounding mode #rounding.
     *
     * If no base is specified, return log[10](arg).
     *
     * log[base](arg) = ln(arg) / ln(base)
     *
     * The result will always be correctly rounded if the base of the log is 2 or 10, and
     * 'almost always' if not:
     *
     * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
     * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
     * between the result and the correctly rounded result will be one ulp (unit in the last place).
     *
     * log[-b](a)       = NaN
     * log[0](a)        = NaN
     * log[1](a)        = NaN
     * log[NaN](a)      = NaN
     * log[Infinity](a) = NaN
     * log[b](0)        = -Infinity
     * log[b](-0)       = -Infinity
     * log[b](-a)       = NaN
     * log[b](1)        = 0
     * log[b](Infinity) = Infinity
     * log[b](NaN)      = NaN
     *
     * [base] {number|string|Decimal} The base of the logarithm.
     * [b] {number} The base of base.
     *
     */
    P['logarithm'] = P['log'] = function ( base, b ) {
        var base10, c, denom, i, inf, num, sd, sd10, r,
            arg = this,
            Decimal = arg['constructor'],
            pr = Decimal['precision'],
            rm = Decimal['rounding'],
            guard = 5;

        // Default base is 10.
        if ( base == null ) {
            base = new Decimal(10);
            base10 = true;
        } else {
            id = 15;
            base = new Decimal( base, b );
            c = base['c'];

            // If #base < 0 or +-Infinity/NaN or 0 or 1.
            if ( base['s'] < 0 || !c || !c[0] || !base['e'] && c[0] == 1 && c.length == 1 ) {

                return new Decimal(NaN);
            }
            base10 = base['eq'](10);
        }
        c = arg['c'];

        // If #arg < 0 or +-Infinity/NaN or 0 or 1.
        if ( arg['s'] < 0 || !c || !c[0] || !arg['e'] && c[0] == 1 && c.length == 1 ) {

            return new Decimal( c && !c[0] ? -1 / 0 : arg['s'] != 1 ? NaN : c ? 0 : 1 / 0 );
        }

        /*
          The result will have an infinite decimal expansion if #base is 10 and #arg is not an
          integer power of 10...
         */
        inf = base10 && ( c[0] != 1 || c.length > 1 ) ||

          // ...or if #base last digit's evenness is not the same as #arg last digit's evenness...
          ( base['c'][ base['c'].length - 1 ] & 1 ) != ( c[ c.length - 1 ] & 1 ) || 0 &&

              // ...or if #base is 2 and there is more than one 1 in #arg in base 2.
              base['eq'](2) && arg.toString(2).replace( /[^1]+/g, '' ) != '1';

        external = false;
        sd = pr + guard;
        sd10 = sd + 10;
        num = ln( arg, sd );

        if (base10) {

            if ( sd10 > LN10.length ) {
                ifExceptionsThrow( Decimal, 1, sd10, 'log' );
            }
            denom = new Decimal( LN10.slice( 0, sd10 ) );
        } else {
            denom = ln( base, sd );
        }

        // The result will have 5 rounding digits.
        r = div( num, denom, sd, 1 );

        /*
         If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
         calculate 10 further digits.

         If the result is known to have an infinite decimal expansion, repeat this until it is
         clear that the result is above or below the boundary. Otherwise, if after calculating
         the 10 further digits, the last 14 are nines, round up and assume the result is exact.
         Also assume the result is exact if the last 14 are zero.

         Example of a result that will be incorrectly rounded:
         log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
         The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7,
         but it will be given as 2.6 as there are 15 zeros immediately after the requested
         decimal place, so the exact result would be assumed to be 2.6, which rounded using
         ROUND_CEIL to 1 decimal place is still 2.6.
         */
        if ( checkRoundingDigits( r['c'], i = pr, rm ) ) {

            do {
                sd += 10;
                num = ln( arg, sd );

                if (base10) {
                    sd10 = sd + 10;

                    if ( sd10 > LN10.length ) {
                        ifExceptionsThrow( Decimal, 1, sd10, 'log' );
                    }
                    denom = new Decimal( LN10.slice( 0, sd10 ) );
                } else {
                    denom = ln( base, sd );
                }

                r = div( num, denom, sd, 1 );

                if ( !inf ) {

                    // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
                    for ( c = r['c']; c[++i] == 9; ) {
                    }

                    if ( i == pr + guard + 10 ) {
                        r = rnd( r, pr + 1, 0 );
                    }

                    break;
                }
            } while ( checkRoundingDigits( r['c'], i += 10, rm ) );
        }
        external = true;

        return rnd( r, pr, rm );
    };


    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new Decimal whose value is the value of this Decimal minus Decimal(y, b), rounded
     * to #precision significant digits using rounding mode #rounding.
     *
     */
    P['minus'] = function ( y, b ) {
        var t, i, j, xLTy,
            x = this,
            Decimal = x['constructor'],
            a = x['s'];

        id = 8;
        y = new Decimal( y, b );
        b = y['s'];

        // Either NaN?
        if ( !a || !b ) {

            return new Decimal(NaN);
        }

        // Signs differ?
        if ( a != b ) {
            y['s'] = -b;

            return x['plus'](y);
        }

        var xc = x['c'],
            xe = x['e'],
            yc = y['c'],
            ye = y['e'],
            pr = Decimal['precision'],
            rm = Decimal['rounding'];

        if ( !xe || !ye ) {

            // Either Infinity?
            if ( !xc || !yc ) {

                return xc ? ( y['s'] = -b, y ) : new Decimal( yc ? x : NaN );
            }

            // Either zero?
            if ( !xc[0] || !yc[0] ) {

                // Return #y if #y is non-zero, #x if #x is non-zero, or zero if both are zero.
                x = yc[0] ? ( y['s'] = -b, y ) : new Decimal( xc[0] ? x :

                  // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                  rm == 3 ? -0 : 0 );

                return external ? rnd( x, pr, rm ) : x;
            }
        }

        xc = xc.slice();
        i = xc.length;

        // Determine which is the bigger number. Prepend zeros to equalise exponents.
        if ( a = xe - ye ) {

            if ( xLTy = a < 0 ) {
                a = -a;
                t = xc;
                i = yc.length;
            } else {
                ye = xe;
                t = yc;
            }

            if ( pr > i ) {
                i = pr;
            }

            /*
             Numbers with massively different exponents would result in a massive number of
             zeros needing to be prepended, but this can be avoided while still ensuring correct
             rounding by limiting the number of zeros to max( #precision, #i ) + 2, where #pr is
             #precision and #i is the length of the coefficient of whichever is greater #x or #y.
             */
            if ( a > ( i += 2 ) ) {
                a = i;
                t.length = 1;
            }

            for ( t.reverse(), b = a; b--; t.push(0) ) {
            }
            t.reverse();
        } else {

            // Exponents equal. Check digit by digit.
            if ( xLTy = i < ( j = yc.length ) ) {
                j = i;
            }

            for ( a = b = 0; b < j; b++ ) {

                if ( xc[b] != yc[b] ) {
                    xLTy = xc[b] < yc[b];

                    break;
                }
            }
        }

        // #x < #y? Point #xc to the array of the bigger number.
        if ( xLTy ) {
            t = xc, xc = yc, yc = t;
            y['s'] = -y['s'];
        }

        /*
         Append zeros to #xc if shorter. No need to add zeros to #yc if shorter as subtraction only
         needs to start at #yc length.
         */
        if ( ( b = -( ( j = xc.length ) - yc.length ) ) > 0 ) {

            for ( ; b--; xc[j++] = 0 ) {
            }
        }

        // Subtract #yc from #xc.
        for ( b = yc.length; b > a; ){

            if ( xc[--b] < yc[b] ) {

                for ( i = b; i && !xc[--i]; xc[i] = 9 ) {
                }
                --xc[i];
                xc[b] += 10;
            }
            xc[b] -= yc[b];
        }

        // Remove trailing zeros.
        for ( ; xc[--j] == 0; xc.pop() ) {
        }

        // Remove leading zeros and adjust exponent accordingly.
        for ( ; xc[0] == 0; xc.shift(), --ye ) {
        }

        if ( !xc[0] ) {

            // Zero.
            xc = [ ye = 0 ];

            // Following IEEE 754 (2008) 6.3, n - n = -0 when rounding towards -Infinity.
            y['s'] = rm == 3 ? -1 : 1;
        }

        y['c'] = xc;
        y['e'] = ye;

        return external ? rnd( y, pr, rm ) : y;
    };


    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new Decimal whose value is the value of this Decimal modulo Decimal(y, b), rounded
     * to #precision significant digits using rounding mode #rounding.
     *
     * The result depends on the modulo mode.
     *
     */
    P['modulo'] = P['mod'] = function ( y, b ) {
        var n, q,
            x = this,
            Decimal = x['constructor'],
            m = Decimal['modulo'];

        id = 9;
        y = new Decimal( y, b );
        b = y['s'];
        n = !x['c'] || !b || y['c'] && !y['c'][0];

        /*
         Return NaN if #x is Infinity or NaN, or #y is NaN or zero, else return #x if #y is Infinity
         or #x is zero.
         */
        if ( n || !y['c'] || x['c'] && !x['c'][0] ) {

            return n
              ? new Decimal(NaN)
              : rnd( new Decimal(x), Decimal['precision'], Decimal['rounding'] );
        }

        external = false;

        if ( m == 9 ) {

            // Euclidian division: q = sign(y) * floor(x / abs(y))
            // r = x - qy    where  0 <= r < abs(y)
            y['s'] = 1;
            q = div( x, y, 0, 3, 1 );
            y['s'] = b;
            q['s'] *= b;
        } else {
            q = div( x, y, 0, m, 1 );
        }

        q = q['times'](y);
        external = true;

        return x['minus'](q);
    };


    /*
     * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
     * rounded to #precision significant digits using rounding mode #rounding.
     *
     */
    P['naturalLogarithm'] = P['ln'] = function () {

        return ln(this);
    };


    /*
     * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if
     * multiplied by -1.
     *
     */
    P['negated'] = P['neg'] = function () {
        var x = new this['constructor'](this);
        x['s'] = -x['s'] || null;

        return rnd(x);
    };


    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new Decimal whose value is the value of this Decimal plus Decimal(y, b), rounded
     * to #precision significant digits using rounding mode #rounding.
     *
     */
    P['plus'] = function ( y, b ) {
        var t,
            x = this,
            Decimal = x['constructor'],
            a = x['s'];

        id = 10;
        y = new Decimal( y, b ) ;
        b = y['s'];

        // Either NaN?
        if ( !a || !b ) {

            return new Decimal(NaN);
        }

        // Signs differ?
        if ( a != b ) {
            y['s'] = -b;

            return x['minus'](y);
        }

        var xe = x['e'],
            xc = x['c'],
            ye = y['e'],
            yc = y['c'],
            pr = Decimal['precision'],
            rm = Decimal['rounding'];

        if ( !xe || !ye ) {

            // Either Infinity?
            if ( !xc || !yc ) {

                // Return +-Infinity.
                return new Decimal( a / 0 );
            }

            // Either zero?
            if ( !xc[0] || !yc[0] ) {

                // Return #y if #y is non-zero, #x if #x is non-zero, or zero if both are zero.
                x = yc[0] ? y: new Decimal( xc[0] ? x : a * 0 );

                return external ? rnd( x, pr, rm ) : x;
            }
        }

        xc = xc.slice();

        // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
        if ( a = xe - ye ) {

            if ( a < 0 ) {
                a = -a;
                t = xc;
                b = yc.length;
            } else {
                ye = xe;
                t = yc;
                b = xc.length;
            }

            if ( pr > b ) {
                b = pr;
            }

            // Limit number of zeros prepended to max( #pr, #b ) + 1.
            if ( a > ++b ) {
                a = b;
                t.length = 1;
            }

            for ( t.reverse(); a--; t.push(0) ) {
            }
            t.reverse();
        }

        // Point #xc to the longer array.
        if ( xc.length - yc.length < 0 ) {
            t = yc, yc = xc, xc = t;
        }

        // Only start adding at yc.length - 1 as the further digits of #xc can be left as they are.
        for ( a = yc.length, b = 0; a; xc[a] %= 10 ) {
             b = ( xc[--a] = xc[a] + yc[a] + b ) / 10 | 0;
        }

        if (b) {
            xc.unshift(b);
            ++ye;
        }

         // Remove trailing zeros.
        for ( a = xc.length; xc[--a] == 0; xc.pop() ) {
        }

        // No need to check for zero, as +x + +y != 0 && -x + -y != 0

        y['c'] = xc;
        y['e'] = ye;

        return external ? rnd( y, pr, rm ) : y;
    };


    /*
     * Return the number of significant digits of this Decimal.
     *
     * z {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
     *
     */
    P['precision'] = P['sd'] = function (z) {
        var x = this;

        if ( z != null ) {

            if ( z !== !!z && z !== 1 && z !== 0 ) {

                // 'precision() argument not a boolean or binary digit: {z}'
                ifExceptionsThrow( x['constructor'], 'argument', z, 'precision', 1 );
            }
        }

        return x['c'] ? z ? Math.max( x['e'] + 1, x['c'].length ) : x['c'].length : null;
    };


    /*
     * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
     * rounding mode #rounding.
     *
     */
    P['round'] = function () {
        var x = this,
            Decimal = x['constructor'];

        return rnd( new Decimal(x), x['e'] + 1, Decimal['rounding'] );
    };


    /*
     *  sqrt(-n) =  N
     *  sqrt( N) =  N
     *  sqrt(-I) =  N
     *  sqrt( I) =  I
     *  sqrt( 0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new Decimal whose value is the square root of this Decimal, rounded to #precision
     * significant digits using rounding mode #rounding.
     *
     */
    P['squareRoot'] = P['sqrt'] = function () {
        var n, sd, r, rep, t,
            x = this,
            c = x['c'],
            s = x['s'],
            e = x['e'],
            Decimal = x['constructor'],
            half = new Decimal(0.5);

        // Negative/NaN/Infinity/zero?
        if ( s !== 1 || !c || !c[0] ) {

            return new Decimal( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
        }

        external = false;

        // Initial estimate.
        s = Math.sqrt( +x );

        /*
         Math.sqrt underflow/overflow?
         Pass x to Math.sqrt as integer, then adjust the exponent of the result.
         */
        if ( s == 0 || s == 1 / 0 ) {
            n = c.join('');

            if ( ( n.length + e ) % 2 == 0 ) {
                n += '0';
            }
            r = new Decimal( Math.sqrt(n) + '' );

            // r may not be finite.
            if ( !r['c'] ) {
                r['c'] = [1];
            }

            r['e'] = Math.floor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );
        } else {
            r = new Decimal( s.toString() );
        }

        sd = ( e = Decimal['precision'] ) + 3;

        // Newton-Raphson iteration.
        for ( ; ; ) {
            t = r;
            r = half['times']( t['plus']( div( x, t, sd + 2, 1 ) ) );

            if ( t['c'].slice( 0, sd ).join('') === r['c'].slice( 0, sd ).join('') ) {
                c = r['c'];

                /*
                 The 4th rounding digit may be in error by -1 so if the 4 rounding digits are
                 9999 or 4999 (i.e. approaching a rounding boundary) continue the iteration.
                 */
                if ( ( c[sd - 3] == 9 || !rep && c[sd - 3] == 4 ) &&
                       c[sd - 2] == 9 && c[sd - 1] == 9 && c[sd] == 9 ) {

                    /*
                     On the first run through, check to see if rounding up gives the exact result as
                     the nines may infinitely repeat.
                     */
                    if ( !rep ) {
                        t = rnd( t, e + 1, 0 );

                        if ( t['times'](t)['eq'](x) ) {
                            r = t;

                            break;
                        }
                    }
                    sd += 4;
                    rep = 1;
                } else {

                    /*
                     If the rounding digits are null, 0000 or 5000, check for an exact result.
                     If not, then there are further digits so increment the 1st rounding digit
                     to ensure correct rounding.
                     */
                    if ( ( !c[sd - 3] || c[sd - 3] == 5 ) && !c[sd - 2] &&
                      !c[sd - 1] && !c[sd] ) {

                        // Truncate to the first rounding digit.
                        if ( c.length > e + 1 ) {
                            c.length = e + 1;
                        }

                        if ( !r['times'](r)['eq'](x) ) {

                            while ( c.length < e ) {
                                c.push(0);
                            }
                            c[e]++;
                        }
                    }

                    break;
                }
            }
        }
        external = true;

        return rnd( r, e, Decimal['rounding'] );
    };


    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new Decimal whose value is this Decimal times Decimal(y), rounded to #precision
     * significant digits using rounding mode #rounding.
     *
     */
    P['times'] = function ( y, b ) {
        var c,
            x = this,
            Decimal = x['constructor'],
            xc = x['c'],
            yc = ( id = 11, y = new Decimal( y, b ), y['c'] ),
            i = x['e'],
            j = y['e'],
            a = x['s'];

        b = y['s'];

        y['s'] = a == b ? 1 : -1;

        // Either NaN/Infinity/0?
        if ( !i && ( !xc || !xc[0] ) || !j && ( !yc || !yc[0] ) ) {

            // Either NaN?
            return new Decimal( !a || !b ||

              // #x is 0 and #y is Infinity  or #y is 0 and #x is Infinity?
              xc && !xc[0] && !yc || yc && !yc[0] && !xc

                // Return NaN.
                ? NaN

                // Either Infinity?
                : !xc || !yc

                  // Return +-Infinity.
                  ? y['s'] / 0

                  // #x or #y is 0. Return +-0.
                  : y['s'] * 0 );
        }

        y['e'] = i + j;
        a = xc.length;
        b = yc.length;

        if ( a < b ) {

            // Swap.
            c = xc, xc = yc, yc = c;
            j = a, a = b, b = j;
        }

        for ( j = a + b, c = []; j--; c.push(0) ) {
        }

        // Multiply!
        for ( i = b - 1; i > -1; i-- ) {

            for ( b = 0, j = a + i; j > i; b = b / 10 | 0 ) {
                  b = c[j] + yc[i] * xc[j - i - 1] + b;
                  c[j--] = b % 10 | 0;
            }

            if (b) {
                c[j] = ( c[j] + b ) % 10;
            }
        }

        if (b) {
            ++y['e'];
        }

        // Remove any leading zero.
        if ( !c[0] ) {
            c.shift();
        }

        // Remove trailing zeros.
        for ( j = c.length; !c[--j]; c.pop() ) {
        }
        y['c'] = c;

        return external ? rnd( y, Decimal['precision'], Decimal['rounding'] ) : y;
    };


    /*
     * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of #dp
     * decimal places using rounding mode #rm or #rounding if #rm is omitted.
     *
     * If #dp is omitted, return a new Decimal whose value is the value of this Decimal.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * 'toDP() dp out of range: {dp}'
     * 'toDP() dp not an integer: {dp}'
     * 'toDP() rounding mode not an integer: {rm}'
     * 'toDP() rounding mode out of range: {rm}'
     *
     */
    P['toDecimalPlaces'] = P['toDP'] = function ( dp, rm ) {
        var x = this;
        x = new x['constructor'](x);

        return dp == null || !checkArg( x, dp, 'toDP' )
          ? x
          : rnd( x, ( dp | 0 ) + x['e'] + 1, checkRM( x, rm, 'toDP' ) );
    };


    /*
     * Return a string representing the value of this Decimal in exponential notation rounded to #dp
     * fixed decimal places using rounding mode #rounding.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * #errors true: Throw if #dp and #rm are not undefined, null or integers in range.
     * #errors false: Ignore #dp and #rm if not numbers or not in range, and truncate non-integers.
     *
     * 'toExponential() dp not an integer: {dp}'
     * 'toExponential() dp out of range: {dp}'
     * 'toExponential() rounding mode not an integer: {rm}'
     * 'toExponential() rounding mode out of range: {rm}'
     *
     */
    P['toExponential'] = function ( dp, rm ) {
        var x = this;

        return format( x, dp != null && checkArg( x, dp, 'toExponential' ) || !x['c']
          ? dp | 0 : x['c'].length - 1, dp != null && checkRM( x, rm, 'toExponential' ), 1 );
    };


    /*
     * Return a string representing the value of this Decimal in normal (fixed-point) notation to
     * #dp fixed decimal places and rounded using rounding mode #rm or #rounding if #rm is omitted.
     *
     * Note: as with JS numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, -MAX_DIGITS to MAX_DIGITS inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * #errors true: Throw if #dp and #rm are not undefined, null or integers in range.
     * #errors false: Ignore #dp and #rm if not numbers or not in range, and truncate non-integers.
     *
     * 'toFixed() dp not an integer: {dp}'
     * 'toFixed() dp out of range: {dp}'
     * 'toFixed() rounding mode not an integer: {rm}'
     * 'toFixed() rounding mode out of range: {rm}'
     *
     */
    P['toFixed'] = function ( dp, rm ) {
        var str,
            x = this,
            Decimal = x['constructor'],
            neg = Decimal['toExpNeg'],
            pos = Decimal['toExpPos'];

        if ( dp != null ) {
            dp = checkArg( x, dp, str = 'toFixed', -MAX_DIGITS ) ? x['e'] + ( dp | 0 ) : null;
            rm = checkRM( x, rm, str );
        }

        // Prevent #toString returning exponential notation;
        Decimal['toExpNeg'] = -( Decimal['toExpPos'] = 1 / 0 );

        if ( dp == null ) {
            str = x.toString();
        } else {
            str = format( x, dp, rm );

            // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
            // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
            if ( x['s'] < 0 && x['c'] ) {

                // As e.g. (-0).toFixed(3), will wrongly be returned as -0.000 from toString.
                if ( !x['c'][0] ) {
                    str = str.replace( '-', '' );

                // As e.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
                } else if ( str.indexOf('-') < 0 ) {
                    str = '-' + str;
                }
            }
        }
        Decimal['toExpNeg'] = neg;
        Decimal['toExpPos'] = pos;

        return str;
    };


    /*
     * Return a string representing the value of this Decimal in normal notation rounded using
     * rounding mode #rounding to #dp fixed decimal places, with the integer part of the number
     * separated into thousands by string #sep1 or ',' if #sep1 is null or undefined, and the fraction
     * part separated into groups of five digits by string #sep2.
     *
     * [sep1] {string} The grouping separator of the integer part of the number.
     * [sep2] {string} The grouping separator of the fraction part of the number.
     * [dp] {number} Decimal places. Integer, -MAX_DIGITS to MAX_DIGITS inclusive.
     *
     * Non-breaking thin-space: \u202f
     *
     * If #dp is invalid the error message will incorrectly give the method as toFixed.
     *
     */
    P['toFormat'] = function ( sep1, dp, sep2 ) {
        var arr = this.toFixed(dp).split('.');

        return arr[0].replace( /\B(?=(\d{3})+$)/g, sep1 == null ? ',' : sep1 + '' ) +
            ( arr[1] ? '.' + ( sep2 ? arr[1].replace( /\d{5}\B/g, '$&' + sep2 ) : arr[1] ) : '' );
    };


    /*
     * Return a string array representing the value of this Decimal as a simple fraction with an
     * integer numerator and an integer denominator.
     *
     * The denominator will be a positive non-zero value less than or equal to the specified
     * maximum denominator. If a maximum denominator is not specified, the denominator will be
     * the lowest value necessary to represent the number exactly.
     *
     * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
     *
     */
    P['toFraction'] = function (maxD) {
        var d0, d2, e, frac, n, n0, q,
            x = this,
            Decimal = x['constructor'],
            n1 = d0 = new Decimal( Decimal['ONE'] ),
            d1 = n0 = new Decimal(0),
            xc = x['c'],
            d = new Decimal( Decimal['ONE'] ),
            pr = Decimal['precision'];

        // NaN, Infinity.
        if ( !xc ) {

            return x.toString();
        }

        e = d['e'] = xc.length - x['e'] - 1;

        // If #maxD is undefined or null...
        if ( maxD == null ||

             // or NaN...
             ( !( id = 12, n = new Decimal(maxD) )['s'] ||

               // or less than 1, or Infinity...
               ( outOfRange = n['cmp'](n1) < 0 || !n['c'] ) ||

                 // or not an integer...
                 ( Decimal['errors'] && n['e'] < n['c'].length - 1 ) ) &&

                   // 'toFraction() max denominator not an integer: {maxD}'
                   // 'toFraction() max denominator out of range: {maxD}'
                   !ifExceptionsThrow( Decimal, 'max denominator', maxD, 'toFraction', 0 ) ||

                     // or greater than the maximum denominator needed to specify the value exactly.
                     ( maxD = n )['cmp'](d) > 0 ) {

            // d is 10**e, n1 is 1.
            maxD = e > 0 ? d : n1;
        }

        external = false;
        n = new Decimal( xc.join('') );

        // #plus and #minus need #precision to be at least xc.length.
        Decimal['precision'] = xc.length;

        for ( ; ; )  {
            q = div( n, d, 0, 1, 1 );
            d2 = d0['plus']( q['times'](d1) );

            if ( d2['cmp'](maxD) == 1 ) {

                break;
            }
            d0 = d1, d1 = d2;

            n1 = n0['plus']( q['times']( d2 = n1 ) );
            n0 = d2;

            d = n['minus']( q['times']( d2 = d ) );
            n = d2;
        }

        d2 = div( maxD['minus'](d0), d1, 0, 1, 1 );
        n0 = n0['plus']( d2['times'](n1) );
        d0 = d0['plus']( d2['times'](d1) );

        n0['s'] = n1['s'] = x['s'];

        // The required decimal places.
        e *= 2;

        // Determine which fraction is closer to #x, #n0 /# d0 or #n1 / #d1?
        frac = div( n1, d1, e, 1, 1 )['minus'](x)['abs']()['cmp'](
               div( n0, d0, e, 1, 1 )['minus'](x)['abs']() ) < 1
          ? [ n1.toString(), d1.toString() ]
          : [ n0.toString(), d0.toString() ];

        external = true;
        Decimal['precision'] = pr;

        return frac;
    };


    /*
     * Returns a new Decimal whose value is the nearest multiple of the magnitude of #n to the value
     * of this Decimal.
     *
     * If the value of this Decimal is equidistant from two multiples of #n, the rounding mode #rm,
     * or #rounding if #rm is omitted or is null or undefined, determines the direction of the
     * nearest multiple.
     *
     * In the context of this method, rounding mode 4 (ROUND_HALF_UP) is the same as rounding mode 0
     * (ROUND_UP), and so on.
     *
     * The return value will always have the same sign as this Decimal, unless either this Decimal
     * or #n is NaN, in which case the return value will be also be NaN.
     *
     * The return value is not rounded to #precision significant digits.
     *
     * n {number|string|Decimal} The magnitude to round to a multiple of.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * 'toNearest() rounding mode not an integer: {rm}'
     * 'toNearest() rounding mode out of range: {rm}'
     *
     */
    P['toNearest'] = function ( n, rm ) {
        var x = this,
            Decimal = x['constructor'];

        x = new Decimal(x);

        if ( n == null ) {
            n = new Decimal( Decimal['ONE'] );
            rm = Decimal['rounding'];
        } else {
            id = 17;
            n = new Decimal(n);
            rm = checkRM( x, rm, 'toNearest' );
        }

        // If #n is not NaN/+-Infinity...
        if ( n['c'] ) {

           // If #x is not NaN/+-Infinity...
            if ( x['c'] ) {
                external = false;

                /*
                 4  ROUND_HALF_UP
                 5  ROUND_HALF_DOWN
                 6  ROUND_HALF_EVEN
                 7  ROUND_HALF_CEIL
                 8  ROUND_HALF_FLOOR
                 */
                if ( rm < 4 ) {
                    rm = [4, 5, 7, 8][rm];
                }

                // If #n is a power of 10...
                if ( n['c'][0] == 1 && n['c'].length == 1 ) {
                    x['e'] -= n['e'];

                    // 0 dp
                    rnd( x, x['e'] + 1, rm );

                    if ( x['c'][0] ) {
                        x['e'] += n['e'];
                    }

                // else if #n is not zero...
                } else if ( n['c'][0] ) {
                    x = div( x, n, 0, rm, 1 )['times'](n);
                } else {
                    x['c'] = [ x['e'] = 0 ];
                }

                external = true;
                rnd(x);
            }

        // # is NaN/+-Infinity. If #x is not NaN...
        } else if ( x['s'] ) {

            // If #n is not NaN...
            if ( n['s'] ) {
                n['s'] = x['s'];
            }
            x = n;
        }

        return x;
    };


    /*
     * Return the value of this Decimal converted to a number primitive.
     *
     */
    P['toNumber'] = function () {
        var x = this;

        // Ensure zero has correct sign.
        return +x || ( x | 0 ) * x['s'];
    };


    /*
     * Return a new Decimal whose value is the value of this Decimal raised to the power
     * Decimal(y, b), rounded to #precision significant digits using rounding mode #rounding.
     *
     * ECMAScript compliant.
     *
     *   x is any value, including NaN.
     *   n is any number, including ±Infinity unless stated.
     *
     *   pow( x, NaN )                           = NaN
     *   pow( x, ±0 )                            = 1

     *   pow( NaN, nonzero )                     = NaN
     *   pow( abs(n) > 1, +Infinity )            = +Infinity
     *   pow( abs(n) > 1, -Infinity )            = +0
     *   pow( abs(n) == 1, ±Infinity )           = NaN
     *   pow( abs(n) < 1, +Infinity )            = +0
     *   pow( abs(n) < 1, -Infinity )            = +Infinity
     *   pow( +Infinity, n > 0 )                 = +Infinity
     *   pow( +Infinity, n < 0 )                 = +0
     *   pow( -Infinity, odd integer > 0 )       = -Infinity
     *   pow( -Infinity, even integer > 0 )      = +Infinity
     *   pow( -Infinity, odd integer < 0 )       = -0
     *   pow( -Infinity, even integer < 0 )      = +0
     *   pow( +0, n > 0 )                        = +0
     *   pow( +0, n < 0 )                        = +Infinity
     *   pow( -0, odd integer > 0 )              = -0
     *   pow( -0, even integer > 0 )             = +0
     *   pow( -0, odd integer < 0 )              = -Infinity
     *   pow( -0, even integer < 0 )             = +Infinity
     *   pow( finite n < 0, finite non-integer ) = NaN
     *
     * For non-integer and larger exponents pow(x, y) is calculated using
     *
     *   x^y = exp(y*ln(x))
     *
     * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
     * probability of an incorrectly rounded result
     * P( [49]9{14} | [50]0{14} ) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
     * i.e. 1 in 250,000,000,000,000
     *
     * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
     *
     * y {number|string|Decimal} The power to which to raise this Decimal.
     * [b] {number} The base of y.
     *
     */
    P['toPower'] = P['pow'] = function ( y, b ) {
        var a, e, n, r,
            x = this,
            Decimal = x['constructor'],
            s = x['s'],
            yN = +( id = 13, y = new Decimal( y, b ) ),
            i = yN < 0 ? -yN : yN,
            pr = Decimal['precision'],
            rm = Decimal['rounding'];

        // Handle +-Infinity, NaN and +-0.
        if ( !x['c'] || !y['c'] || ( n = !x['c'][0] ) || !y['c'][0] ) {

            // valueOf -0 is 0, so check for 0 then multiply it by the sign.
            return new Decimal( Math.pow( n ? s * 0 : +x, yN ) );
        }

        x = new Decimal(x);
        a = x['c'].length;

        // if #x == 1
        if ( !x['e'] && x['c'][0] == x['s'] && a == 1 ) {

            return x;
        }

        b = y['c'].length - 1;

        // if #y == 1
        if ( !y['e'] && y['c'][0] == y['s'] && !b ) {
            r = rnd( x, pr, rm );
        } else {
            n = y['e'] >= b;

            // If #y is not an integer and #x is negative, return NaN.
            if ( !n && s < 0 ) {
                r = new Decimal(NaN);
            } else {

                /*
                 If the number of significant digits of #x multiplied by abs(#y) is less than
                 INT_POW_LIMIT use the 'exponentiation by squaring' algorithm.
                 */
                if ( n && a * i < INT_POW_LIMIT ) {
                    r = intPow( Decimal, x, i );

                    if ( y['s'] < 0 ) {

                        return Decimal['ONE']['div'](r);
                    }
                } else {

                    // Result is negative if #x is negative and the last digit of integer #y is odd.
                    s = s < 0 && y['c'][ Math.max( y['e'], b ) ] & 1 ? -1 : 1;

                    b = Math.pow( +x, yN );

                    // Estimate result exponent.
                    e = b == 0 || !isFinite(b)

                      /*
                       x^y = 10^e,  where e = y * log10(x)
                       log10(x) = log10(x_significand) + x_exponent
                       log10(x_significand) = ln(x_significand) / ln(10)
                       */
                      ? Math.floor( yN * (
                        Math.log( '0.' + x['c'].join('') ) / Math.LN10 + x['e'] + 1 ) )
                      : new Decimal( b + '' )['e'];

                    // Estimate may be incorrect e.g.: x: 0.999999999999999999, y: 2.29, e: 0, r.e:-1

                    // Overflow/underflow?
                    if ( e > Decimal['maxE'] + 1 || e < Decimal['minE'] - 1 ) {

                        return new Decimal( e > 0 ? s / 0 : 0 );
                    }

                    external = false;
                    Decimal['rounding'] = x['s'] = 1;

                    /*
                     Estimate extra digits needed from ln(x) to ensure five correct rounding digits
                     in result (#i was unnecessary before max exponent was extended?).
                     Example of failure before #i was introduced: (precision: 10),
                     new Decimal(2.32456).pow('2087987436534566.46411')
                     should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
                     */
                    i = Math.min( 12, ( e + '' ).length );

                    // r = x^y = exp(y*ln(x))
                    r = exp( y['times']( ln( x, pr + i ) ), pr );

                    // Truncate to the required precision plus five rounding digits.
                    r = rnd( r, pr + 5, 1 );

                    /*
                     If the rounding digits are [49]9999 or [50]0000 increase the precision by 10
                     and recalculate the result.
                     */
                    if ( checkRoundingDigits( r['c'], pr, rm ) ) {
                        e = pr + 10;

                        // Truncate to the increased precision plus five rounding digits.
                        r = rnd( exp( y['times']( ln( x, e + i ) ), e ), e + 5, 1 );

                        /*
                          Check for 14 nines from the 2nd rounding digit (the first rounding digit
                          may be 4 or 9).
                         */
                        for ( i = pr; r['c'][++i] == 9; ) {
                        }

                        // If there are 14 nines round up the first rounding digit.
                        if ( i == pr + 15 ) {
                            r = rnd( r, pr + 1, 0 );
                        }
                    }

                    r['s'] = s;
                    external = true;
                    Decimal['rounding'] = rm;
                }

                r = rnd( r, pr, rm );
            }
        }

        return r;
    };


    /*
     * Return a string representing the value of this Decimal rounded to #sd significant digits
     * using rounding mode #rounding.
     *
     * Return exponential notation if #sd is less than the number of digits necessary to represent
     * the integer part of the value in normal notation.
     *
     * sd {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * #errors true: Throw if #sd and #rm are not undefined, null or integers in range.
     * #errors false: Ignore #sd and #rm if not numbers or not in range, and truncate non-integers.
     *
     * 'toPrecision() sd not an integer: {sd}'
     * 'toPrecision() sd out of range: {sd}'
     * 'toPrecision() rounding mode not an integer: {rm}'
     * 'toPrecision() rounding mode out of range: {rm}'
     *
     */
    P['toPrecision'] = function ( sd, rm ) {

        return sd != null && checkArg( this, sd, 'toPrecision', 1 )
          ? format( this, --sd | 0, checkRM( this, rm, 'toPrecision' ), 2 )
          : this.toString();
    };


    /*
     * Return a new Decimal whose value is this Decimal rounded to a maximum of #d significant
     * digits using rounding mode #rm, or to #precision and #rounding respectively if omitted.
     *
     * [d] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * 'toSD() digits out of range: {d}'
     * 'toSD() digits not an integer: {d}'
     * 'toSD() rounding mode not an integer: {rm}'
     * 'toSD() rounding mode out of range: {rm}'
     *
     */
    P['toSignificantDigits'] = P['toSD'] = function ( d, rm ) {
        var x = this,
            Decimal = x['constructor'];

        x = new Decimal(x);

        return d == null || !checkArg( x, d, 'toSD', 1 )
          ? rnd( x, Decimal['precision'], Decimal['rounding'] )
          : rnd( x, d | 0, checkRM( x, rm, 'toSD' ) );
    };


    /*
     * Return a string representing the value of this Decimal in base #b, or base 10 if #b is
     * omitted. If a base is specified, including base 10, round to #precision significant digits
     * using rounding mode #rounding.
     *
     * Return exponential notation if a base is not specified, and this Decimal has a positive
     * exponent equal to or greater than #toExpPos, or a negative exponent equal to or less than
     * #toExpNeg.
     *
     * [b] {number} Base. Integer, 2 to 64 inclusive.
     *
     */
    P['toString'] = function (b) {
        var u, str, strL,
            x = this,
            Decimal = x['constructor'],
            xe = x['e'];

        // Infinity or NaN?
        if ( xe === null ) {
            str = x['s'] ? 'Infinity' : 'NaN';

        // Exponential format?
        } else if ( b === u && ( xe <= Decimal['toExpNeg'] || xe >= Decimal['toExpPos'] ) ) {

            return format( x, x['c'].length - 1, Decimal['rounding'], 1 );
        } else {
            str = x['c'].join('');

            // Negative exponent?
            if ( xe < 0 ) {

                // Prepend zeros.
                for ( ; ++xe; str = '0' + str ) {
                }
                str = '0.' + str;

            // Positive exponent?
            } else if ( strL = str.length, xe > 0 ) {

                if ( ++xe > strL ) {

                    // Append zeros.
                    for ( xe -= strL; xe-- ; str += '0' ) {
                    }

                } else if ( xe < strL ) {
                    str = str.slice( 0, xe ) + '.' + str.slice(xe);
                }

            // Exponent zero.
            } else {
                u = str.charAt(0);

                if ( strL > 1 ) {
                    str = u + '.' + str.slice(1);

                // Avoid '-0'
                } else if ( u == '0' ) {

                    return u;
                }
            }

            if ( b != null ) {

                if ( !( outOfRange = !( b >= 2 && b < 65 ) ) &&
                  ( b == (b | 0) || !Decimal['errors'] ) ) {
                    str = convertBase( Decimal, str, b | 0, 10, x['s'] );

                    // Avoid '-0'
                    if ( str == '0' ) {

                        return str;
                    }
                } else {

                    // 'toString() base not an integer: {b}'
                    // 'toString() base out of range: {b}'
                    ifExceptionsThrow( Decimal, 'base', b, 'toString', 0 );
                }
            }
        }

        return x['s'] < 0 ? '-' + str : str;
    };


    /*
     * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
     *
     */
    P['truncated'] = P['trunc'] = function () {

        return rnd( new this['constructor'](this), this['e'] + 1, 1 );
    };


    /*
     * Return as #toString, but do not accept a base argument.
     *
     * Ensures that JSON.stringify() uses #toString for serialization.
     *
     */
    P['valueOf'] = P['toJSON'] = function () {

        return this.toString();
    };


    /*
    // Add aliases to match BigDecimal method names.
    P['add'] = P['plus'];
    P['subtract'] = P['minus'];
    P['multiply'] = P['times'];
    P['divide'] = P['div'];
    P['remainder'] = P['mod'];
    P['compareTo'] = P['cmp'];
    P['negate'] = P['neg'];
     */


    // Private functions for Decimal.prototype methods.


    /*
     *  #checkRoundingDigits
     *  #checkRM
     *  #checkArg
     *  #convertBase
     *  #div
     *  #exp
     *  #format
     *  #ifExceptionsThrow
     *  #intPow
     *  #ln
     *  #rnd
     */


    /*
     * Check 5 rounding digits if #repeating is null, 4 otherwise.
     * #repeating == null if caller is #log or #pow,
     * #repeating != null if caller is #ln or #exp.
     */
    function checkRoundingDigits( c, i, rm, repeating ) {

        return ( !repeating && rm > 3 && c[i] == 4 ||
          ( repeating || rm < 4 ) && c[i] == 9 ) && c[i + 1] == 9 && c[i + 2] == 9 &&
            c[i + 3] == 9 && ( repeating != null || c[i + 4] == 9 ) ||
              repeating == null && ( c[i] == 5 || !c[i] ) && !c[i + 1] && !c[i + 2] &&
                !c[i + 3] && !c[i + 4];
    }


    /*
     * Check and return rounding mode. If #rm is invalid, return rounding mode #rounding.
     */
    function checkRM( x, rm, method ) {
        var Decimal = x['constructor'];

        return rm == null || ( ( outOfRange = rm < 0 || rm > 8 ) ||
          rm !== 0 && ( Decimal['errors'] ? parseInt : parseFloat )(rm) != rm ) &&
            !ifExceptionsThrow( Decimal, 'rounding mode', rm, method, 0 )
              ? Decimal['rounding'] : rm | 0;
    }


     /*
      * Check that argument #n is in range, return true or false.
      */
    function checkArg( x, n, method, min ) {
        var Decimal = x['constructor'];

        return !( outOfRange = n < ( min || 0 ) || n >= MAX_DIGITS + 1 ) &&

          /*
           * Include 'n === 0' because Opera has 'parseFloat(-0) == -0' as false
           * despite having 'parseFloat(-0) === -0 && parseFloat('-0') === -0 && 0 == -0' as true.
           */
          ( n === 0 || ( Decimal['errors'] ? parseInt : parseFloat )(n) == n ) ||
            ifExceptionsThrow( Decimal, 'argument', n, method, 0 );
    }


    /*
     * Convert a numeric string of #baseIn to a numeric string of #baseOut.
     */
    convertBase = (function () {

        /*
         * Convert string of #baseIn to an array of numbers of #baseOut.
         * Eg. convertBase('255', 10, 16) returns [15, 15].
         * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
         */
        function toBaseOut( str, baseIn, baseOut ) {
            var j,
                arr = [0],
                arrL,
                i = 0,
                strL = str.length;

            for ( ; i < strL; ) {

                for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn ) {
                }
                arr[ j = 0 ] += NUMERALS.indexOf( str.charAt( i++ ) );

                for ( ; j < arr.length; j++ ) {

                    if ( arr[j] > baseOut - 1 ) {

                        if ( arr[j + 1] == null ) {
                            arr[j + 1] = 0;
                        }
                        arr[j + 1] += arr[j] / baseOut | 0;
                        arr[j] %= baseOut;
                    }
                }
            }

            return arr.reverse();
        }

        // #sign is needed to enable the correct rounding of the division.
        return function ( Decimal, str, baseOut, baseIn, sign ) {
            var x, xc, yc,
                i = str.indexOf( '.' ),
                y = new Decimal(baseIn);

            if ( baseIn < 37 ) {
                str = str.toLowerCase();
            }

            if ( i < 0 ) {
                x = new Decimal(y);
                yc = [1];
            } else {

                /*
                 Convert the base of #str as if #str is an integer, then divide the result by its
                 base raised to a power such that the fraction part will be restored.
                 Use #toFixed to avoid possible exponential notation.
                 */
                x = intPow( Decimal, y, str.length - i - 1 );
                yc = toBaseOut( x.toFixed(), 10, baseOut );
                str = str.replace( '.', '' );
            }

            // #xc and #yc may have trailing zeros.

            y['c'] = yc;
            y['e'] = yc.length;

            // Convert the number as integer.
            xc = toBaseOut( str, baseIn, baseOut );

            x['c'] = xc;
            x['e'] = xc.length;
            x['s'] = sign;

            x = div( x, y, Decimal['precision'], Decimal['rounding'], 0, baseOut );

            // E.g. [4, 11, 15] becomes [4, b, f].
            for ( xc = x['c'], i = xc.length; i--; ) {
                xc[i] = NUMERALS.charAt( xc[i] );
            }

            // No negative numbers: the caller will add the sign.
            x['s'] = 1;

            return x.toFixed();
        }
    })();


    /*
     * Perform division in the specified base. Called by #div and #convertBase.
     */
    function div( x, y, pr, rm, dp, b ) {
        var Decimal = x['constructor'],
            e = x['e'] - y['e'],
            s = x['s'] == y['s'] ? 1 : -1,
            xc = x['c'],
            yc = y['c'];

        // Either NaN, Infinity or 0?
        if ( !xc || !xc[0] || !yc || !yc[0] ) {

            return new Decimal(

              // Return NaN if either NaN, or both Infinity or 0.
              !x['s'] || !y['s'] || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :

                // Return +-0 if #x is 0 or #y is +-Infinity, or return +-Infinity as y is 0.
                xc && xc[0] == 0 || !yc ? s * 0 : s / 0
            );
        }

        var cmp, i, n, ri, t, yL,
            yz = yc.slice(),
            xi = yL = yc.length,
            xL = xc.length,
            r = xc.slice( 0, yL ),
            rL = r.length,
            q = new Decimal(s),
            qc = q['c'] = [];

        for ( i = s = 0; yc[i] == ( xc[i] || 0 ); i++ ) {
        }

        // Result exponent may be one less then the current value of #e.
        // The coefficients of the Decimals from #convertBase may have trailing zeros.
        if ( yc[i] > ( xc[i] || 0 ) ) {
            e--;

            /*
             The result of the division has a leading zero so an extra digit will be needed to
             maintain the correct precision (plus the rounding digit).
             */
            s = 1;
        }

        q['e'] = e;

        if ( pr == null ) {
            pr = Decimal['precision'];
            rm = Decimal['rounding'];
        } else if (dp) {
            pr += e + 1;
        }

        // Default base is 10.
        b = b || 10;

        if ( pr >= 0 ) {
            s += pr;

            // Add zeros to make remainder as long as divisor.
            for ( ; rL++ < yL; r.push(0) ) {
            }

            // Create version of divisor with leading zero.
            yz.unshift( i = 0 );

            do {

                // #n is how many times the divisor goes into the current remainder.
                for ( n = 0; n < b; n++ ) {

                    // Compare divisor and remainder.
                    if ( yL != ( rL = r.length ) ) {
                        cmp = yL > rL ? 1 : -1;
                    } else {

                        for ( ri = -1, cmp = 0; ++ri < yL; ) {

                            if ( yc[ri] != r[ri] ) {
                                cmp = yc[ri] > r[ri] ? 1 : -1;

                                break;
                            }
                        }
                    }

                    // If divisor < remainder, subtract divisor from remainder.
                    if ( cmp < 0 ) {

                        // Remainder cannot be more than one digit longer than divisor.
                        // Equalise lengths using divisor with extra leading zero?
                        for ( t = rL == yL ? yc : yz; rL; ) {

                            if ( r[--rL] < t[rL] ) {

                                for ( ri = rL;
                                  ri && !r[--ri];
                                    r[ri] = b - 1 ) {
                                }
                                --r[ri];
                                r[rL] += b;
                            }
                            r[rL] -= t[rL];
                        }

                        for ( ; !r[0]; r.shift() ) {
                        }
                    } else {

                        break;
                    }
                }

                // Add the next digit n to the result array.
                qc[i++] = cmp ? n : ++n;

                // Update the remainder.
                if ( r[0] && cmp ) {
                    r[rL] = xc[xi] || 0;
                } else {
                    r = [ xc[xi] ];
                }

            } while ( ( xi++ < xL || r[0] != null ) && s-- );

            // Leading zero? Do not remove if result is simply zero, i.e. i is 1.
            if ( !qc[0] && i > 1 ) {
                qc.shift();
            }

            // No need to round if #i <= #pr, just check for underflow/overflow.
            if ( i <= pr ) {
                pr = null;
            }
        }

        // If #pr < 0, r[0] != null will be true.
        return rnd( q, pr, rm, r[0] != null, b );
    }


    /*
     * Taylor/Maclaurin series.
     *
     * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
     *
     * Argument reduction:
     *   Repeat x = x / 32, k += 5, until |x| < 0.1
     *   exp(x) = exp(x / 2^k)^(2^k)
     *
     * Previously, the argument was initially reduced by
     * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
     * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
     * found to be slower than just dividing repeatedly by 32 as above.
     *
     * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
     * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
     * ( Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324 )
     *
     *  exp(Infinity)  = Infinity
     *  exp(-Infinity) = 0
     *  exp(NaN)       = NaN
     *  exp(+-0)       = 1
     *
     *  exp(x) is non-terminating for any finite, non-zero x.
     *
     *  The result will always be correctly rounded.
     *
     */
    function exp( x, pr ) {
        var denom, guard, j, pow, sd, sum, t,
            rep = 0,
            i = 0,
            k = 0,
            Decimal = x['constructor'],
            one = Decimal['ONE'],
            rm = Decimal['rounding'],
            precision = Decimal['precision'];

        // 0/NaN/Infinity?
        if ( !x['c'] || !x['c'][0] || x['e'] > 17 ) {

            return new Decimal( x['c']
              ? !x['c'][0] ? one : x['s'] < 0 ? 0 : 1 / 0
              : x['s'] ? x['s'] < 0 ? 0 : x : NaN );
        }

        if ( pr == null ) {

            /*
             Estimate result exponent.
             e^x = 10^j, where j = x * log10(e) and
             log10(e) = ln(e) / ln(10) = 1 / ln(10),
             so j = x / ln(10)
            j = Math.floor( x / Math.LN10 );

            // Overflow/underflow? Estimate may be +-1 of true value.
            if ( j > Decimal['maxE'] + 1 || j < Decimal['minE'] - 1 ) {

                return new Decimal( j > 0 ? 1 / 0 : 0 );
            }
             */

            external = false;
            sd = precision;
        } else {
            sd = pr;
        }

        t = new Decimal(0.03125);

        // while abs(x) >= 0.1
        while ( x['e'] > -2 ) {

            // x = x / 2^5
            x = x['times'](t);
            k += 5;
        }

        /*
         Use 2 * log10(2^k) + 5 to estimate the increase in precision necessary to ensure the first
         4 rounding digits are correct.
         */
        guard = Math.log( Math.pow( 2, k ) ) / Math.LN10 * 2 + 5 | 0;
        sd += guard;
        denom = pow = sum = new Decimal(one);
        Decimal['precision'] = sd;

        for( ; ; ) {
            pow = rnd( pow['times'](x), sd, 1 );
            denom = denom['times'](++i);
            t = sum['plus']( div( pow, denom, sd, 1 ) );

            if ( t['c'].slice( 0, sd ).join('') === sum['c'].slice( 0, sd ).join('') ) {
                j = k;

                while ( j-- ) {
                    sum = rnd( sum['times'](sum), sd, 1 );
                }

                /*
                 Check to see if the first 4 rounding digits are [49]999.
                 If so, repeat the summation with a higher precision, otherwise
                 E.g. with #precision: 18, #rounding: 1
                 exp(18.404272462595034083567793919843761) = 98372560.1229999999
                                           when it should be 98372560.123

                 #sd - #guard is the index of first rounding digit.
                 */
                if ( pr == null ) {

                    if ( rep < 3 && checkRoundingDigits( sum['c'], sd - guard, rm, rep ) ) {
                        Decimal['precision'] = sd += 10;
                        denom = pow = t = new Decimal(one);
                        i = 0;
                        rep++;
                    } else {

                        return rnd( sum, Decimal['precision'] = precision, rm, external = true );
                    }
                } else {
                    Decimal['precision'] = precision;

                    return sum;
                }
            }
            sum = t;
        }
    }


    /*
     * Return a string representing the value of Decimal #n in normal or exponential notation
     * rounded to the specified decimal places or significant digits.
     * Called by #toString, #toExponential (#exp is 1), #toFixed, and #toPrecision (#exp is 2).
     * #i is the index (with the value in normal notation) of the digit that may be rounded up.
     */
    function format( n, i, rm, exp ) {
        var Decimal = n['constructor'],
            e = ( n = new Decimal(n) )['e'],
            c = n['c'];

        // +-Infinity or NaN?
        if ( !c ) {

            return n.toString();
        }

        // Round?
        if ( c.length > ++i ) {
            rnd( n, i, rm );
        }

        // If #toFixed, n['e'] may have changed if the value was rounded up.
        e = exp ? i : i + n['e'] - e;

        // Append zeros?
        for ( ; c.length < e; c.push(0) ) {
        }
        e = n['e'];

        /*
         #toPrecision returns exponential notation if the number of significant digits specified
         is less than the number of digits necessary to represent the integer part of the value
         in normal notation.
         */
        return exp == 1 || exp == 2 && ( i <= e || e <= Decimal['toExpNeg'] )

          // Exponential notation.
          ? ( n['s'] < 0 && c[0] ? '-' : '' ) +
            ( c.length > 1 ? c[0] + '.' + c.slice(1).join('') : c[0] ) +
            ( e < 0 ? 'e' : 'e+' ) + e

          // Normal notation.
          : n.toString();
    }


    /*
     * Assemble error messages. Throw Decimal Errors.
     */
    function ifExceptionsThrow( Decimal, message, arg, method, more ) {

        if ( Decimal['errors'] ) {
            var error = new Error( ( method || [
              'new Decimal', 'cmp', 'div', 'eq', 'gt', 'gte', 'lt', 'lte', 'minus', 'mod',
              'plus', 'times', 'toFraction', 'pow', 'random', 'log', 'sqrt', 'toNearest', 'divToInt'
              ][ id ? id < 0 ? -id : id : 1 / id < 0 ? 1 : 0 ] ) + '() ' + ( [
              'number type has more than 15 significant digits', 'LN10 out of digits' ][message]
              || message + ( [ outOfRange ? ' out of range' : ' not an integer',
              ' not a boolean or binary digit' ][more] || '' ) ) + ': ' + arg
            );
            error['name'] = 'Decimal Error';
            outOfRange = id = 0;

            throw error;
        }
    }


    /*
     * Use 'exponentiation by squaring' for small integers. Called by #convertBase and #pow.
     */
    function intPow( Decimal, x, i ) {
        var r = new Decimal( Decimal['ONE'] );

        for ( external = false; ; ) {

            if ( i & 1 ) {
                r = r['times'](x);
            }
            i >>= 1;

            if ( !i ) {


                break;
            }
            x = x['times'](x);
        }
        external = true;

        return r;
    }


    /*
     *  ln(-n)        = NaN
     *  ln(0)         = -Infinity
     *  ln(-0)        = -Infinity
     *  ln(1)         = 0
     *  ln(Infinity)  = Infinity
     *  ln(-Infinity) = NaN
     *  ln(NaN)       = NaN
     *
     *  ln(n) (n != 1) is non-terminating.
     *
     */
    function ln( y, pr ) {
        var denom, e, num, rep, sd, sum, t, x1, x2,
            n = 1,
            guard = 10,
            x = y,
            c = x['c'],
            Decimal = x['constructor'],
            one = Decimal['ONE'],
            rm = Decimal['rounding'],
            precision = Decimal['precision'];

        // #x < 0 or +-Infinity/NaN or 0 or 1.
        if ( x['s'] < 0 || !c || !c[0] || !x['e'] && c[0] == 1 && c.length == 1 ) {

            return new Decimal( c && !c[0] ? -1 / 0 : x['s'] != 1 ? NaN : c ? 0 : x );
        }

        if ( pr == null ) {
            external = false;
            sd = precision;
        } else {
            sd = pr;
        }

        Decimal['precision'] = sd += guard;

        if ( Math.abs( e = x['e'] ) < 1.5e15 ) {

            /*
             Argument reduction.
             The series converges faster the closer the argument is to 1, so using
             ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
             multiply the argument by itself until the leading digits of the significand are 7, 8,
             9, 10, 11, 12 or 13 recording the number of multiplications so the sum of the series
             can later be divided by this number, then separate out the power of 10 using
             ln(a*10^b) = ln(a) + b*ln(10).
             */
            // max #n is 6 ( gives 0.7 - 1.3 )
            while ( c[0] < 7 && c[0] != 1 || c[0] == 1 && c[1] > 3 ) {

            // max #n is 21 ( gives 0.9, 1.0 or 1.1 ) ( 9e15 / 21 = 4.2e14 ).
            //while ( c[0] < 9 && c[0] != 1 || c[0] == 1 && c[1] > 1 ) {
                x = x['times'](y);
                c = x['c'];
                n++;
            }

            e = x['e'];

            if ( c[0] > 1 ) {

                if ( n == 1 ) {
                    x = new Decimal( '0.' + c.join('') );
                } else {
                    x['e'] = -1;
                }
                e++;
            } else {
                x = new Decimal( '1.' + c.slice(1).join('') );
            }
        } else {

            /*
             The argument reduction method above may result in overflow if the argument #y is a
             massive number with exponent >= 1500000000000000 ( 9e15 / 6 = 1.5e15 ), so instead
             recall this function using ln(x*10^e) = ln(x) + e*ln(10).
             */
            x = new Decimal(x);
            x['e'] = 0;

            if ( sd + 2 > LN10.length ) {
                ifExceptionsThrow( Decimal, 1, sd + 2, 'ln' );
            }

            x = ln( x, sd - guard )['plus'](
                new Decimal( LN10.slice( 0, sd + 2 ) )['times']( e + '' )
            );

            Decimal['precision'] = precision;

            return pr == null ? rnd( x, precision, rm, external = true ) : x;
        }

        // #x1 is #x reduced to a value near 1.
        x1 = x;

        /*
         Taylor series.
         ln(y) = ln( (1 + x)/(1 - x) ) = 2( x + x^3/3 + x^5/5 + x^7/7 + ... )
         where
         x = (y - 1)/(y + 1)              ( |x| < 1 )
         */
        sum = num = x = div( x['minus'](one), x['plus'](one), sd, 1 );
        x2 = rnd( x['times'](x), sd, 1 );
        denom = 3;

        for( ; ; ) {
            num = rnd( num['times'](x2), sd, 1 );
            t = sum['plus']( div( num, new Decimal(denom), sd, 1 ) );

            if ( t['c'].slice( 0, sd ).join('') === sum['c'].slice( 0, sd ).join('') ) {
                sum = sum['times'](2);

                /*
                 Reverse the argument reduction. Check that #e is not 0 because, as well as
                 preventing an unnecessary calculation, -0 + 0 = +0 and to ensure correct
                 rounding later -0 needs to stay -0.
                 */
                if ( e !== 0 ) {

                    if ( sd + 2 > LN10.length ) {
                        ifExceptionsThrow( Decimal, 1, sd + 2, 'ln' );
                    }

                    sum = sum['plus'](
                        new Decimal( LN10.slice( 0, sd + 2 ) )['times']( e + '' )
                    );
                }

                sum = div( sum, new Decimal(n), sd, 1 );

                /*
                 Is #rm > 3 and the first 4 rounding digits 4999, or #rm < 4 (or the summation has
                 been repeated previously) and the first 4 rounding digits 9999?

                 If so, restart the summation with a higher precision, otherwise
                 E.g. with #precision: 12, #rounding: 1
                 ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.

                 #sd - #guard is the index of first rounding digit.
                 */
                if ( pr == null ) {

                    if ( checkRoundingDigits( sum['c'], sd - guard, rm, rep ) ) {
                        Decimal['precision'] = sd += guard;
                        t = num = x = div( x1['minus'](one), x1['plus'](one), sd, 1 );
                        x2 = rnd( x['times'](x), sd, 1 );
                        denom = rep = 1;
                    } else {

                        return rnd( sum, Decimal['precision'] = precision, rm, external = true );
                    }
                } else {
                    Decimal['precision'] = precision;

                    return sum;
                }
            }

            sum = t;
            denom += 2;
        }
    }


    /*
     * Round #x to #sd significant digits using rounding mode #rm. Check for over/under-flow.
     */
    function rnd( x, sd, rm, r, b ) {
        var rd, half, isNeg, xc,
            Decimal = x['constructor'];

        // Don't round if #sd is null or undefined.
        if ( sd != rd ) {

            if ( !( xc = x['c'] ) ) {

                return x;
            }

            isNeg = x['s'] < 0,
            half = ( b = b || 10 ) / 2;

            // #rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
            rd = xc[sd];
            r = r || sd < 0 || xc[sd + 1] != null;

            r = rm < 4
              ? ( rd != null || r ) && ( rm == 0 || rm == 2 && !isNeg || rm == 3 && isNeg )
              : rd > half || rd == half && ( rm == 4 || r || rm == 6 && xc[sd - 1] & 1 ||
                rm == 7 && !isNeg || rm == 8 && isNeg );

            if ( sd < 1 || !xc[0] ) {
                xc.length = 0;

                if (r) {

                    // Convert #sd to decimal places.
                    sd = sd - x['e'] - 1;

                    // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                    xc[0] = 1;
                    x['e'] = -sd || 0;
                } else {

                    // Zero.
                    xc[0] = x['e'] = 0;
                }

                return x;
            }

            // Remove any digits after the required decimal places.
            if ( xc.length > sd ) {
                xc.length = sd;
            }
            sd--;

            // Round up?
            if (r) {

                // Set to zero any undefined elements before the digit to be rounded up.
                // Only used by #ln?
                for ( rd = sd; xc[rd] == null; xc[rd--] = 0 ) {
                }

                // Rounding up may mean the previous digit has to be rounded up and so on.
                for ( --b; ++xc[sd] > b; ) {
                    xc[sd] = 0;

                    if ( !sd-- ) {
                        ++x['e'];
                        xc.unshift(1);
                    }
                }
            }

            // Remove trailing zeros.
            for ( sd = xc.length; !xc[--sd]; xc.pop() ) {
            }
        }

        if (external) {

            // Overflow?
            if ( x['e'] > Decimal['maxE'] ) {

                // Infinity.
                x['c'] = x['e'] = null;

            // Underflow?
            } else if ( x['e'] < Decimal['minE'] ) {

                // Zero.
                x['c'] = [ x['e'] = 0 ];
            }
        }

        return x;
    }


    DecimalConstructor = (function () {


        // Private functions used by static Decimal methods.


        /*
         *  The following emulations or wrappers of #Math object functions are currently
         *  commented-out and not in the public API.
         *
         *  #abs
         *  #acos
         *  #asin
         *  #atan
         *  #atan2
         *  #ceil
         *  #cos
         *  #floor
         *  #round
         *  #sin
         *  #tan
         *  #trunc
         */


        /*
         * Return a new Decimal whose value is the absolute value of #n.
         *
         * n {number|string|Decimal}
         *
        function abs(n) { return new this(n)['abs']() }
         */


        /*
         * Return a new Decimal whose value is the arccosine in radians of #n.
         *
         * n {number|string|Decimal}
         *
        function acos(n) { return new this( Math.acos(n) + '' ) }
         */


        /*
         * Return a new Decimal whose value is the arcsine in radians of #n.
         *
         * n {number|string|Decimal}
         *
        function asin(n) { return new this( Math.asin(n) + '' ) }
         */


        /*
         * Return a new Decimal whose value is the arctangent in radians of #n.
         *
         * n {number|string|Decimal}
         *
        function atan(n) { return new this( Math.atan(n) + '' ) }
         */


        /*
         * Return a new Decimal whose value is the arctangent in radians of #y/#x in the range
         * -PI to PI (inclusive).
         *
         * y {number|string|Decimal} The y-coordinate.
         * x {number|string|Decimal} The x-coordinate.
         *
        function atan2( y, x ) { return new this( Math.atan2( y, x ) + '' ) }
         */


        /*
         * Return a new Decimal whose value is #n round to an integer using ROUND_CEIL.
         *
         * n {number|string|Decimal}
         *
        function ceil(n) { return new this(n)['ceil']() }
         */


        /*
         * Configure global settings for a Decimal constructor.
         *
         * #obj is an object with any of the following properties,
         *
         *   #precision  {number}
         *   #rounding   {number}
         *   #toExpNeg   {number}
         *   #toExpPos   {number}
         *   #minE       {number}
         *   #maxE       {number}
         *   #errors     {boolean|number}
         *   #crypto     {boolean|number}
         *   #modulo     {number}
         *
         * E.g.
         *   Decimal.config({ precision: 20, rounding: 4 })
         *
         */
        function config(obj) {
            var p, u, v,
                Decimal = this,
                c = 'config',
                parse = Decimal['errors'] ? parseInt : parseFloat;

            if ( obj == u || typeof obj != 'object' &&
              !ifExceptionsThrow( Decimal, 'object expected', obj, c ) ) {

                return Decimal;
            }

            // #precision {number|number[]} Integer, 1 to MAX_DIGITS inclusive.
            if ( ( v = obj[ p = 'precision' ] ) != u ) {

                if ( !( outOfRange = v < 1 || v > MAX_DIGITS ) && parse(v) == v ) {
                    Decimal[p] = v | 0;
                } else {

                    // 'config() precision not an integer: {v}'
                    // 'config() precision out of range: {v}'
                    ifExceptionsThrow( Decimal, p, v, c, 0 );
                }
            }

            // #rounding {number} Integer, 0 to 8 inclusive.
            if ( ( v = obj[ p = 'rounding' ] ) != u ) {

                if ( !( outOfRange = v < 0 || v > 8 ) && parse(v) == v ) {
                    Decimal[p] = v | 0;
                } else {

                    // 'config() rounding not an integer: {v}'
                    // 'config() rounding out of range: {v}'
                    ifExceptionsThrow( Decimal, p, v, c, 0 );
                }
            }

            // #toExpNeg {number} Integer, -EXP_LIMIT to 0 inclusive.
            if ( ( v = obj[ p = 'toExpNeg' ] ) != u ) {

                if ( !( outOfRange = v < -EXP_LIMIT || v > 0 ) && parse(v) == v ) {
                    Decimal[p] = Math.floor(v);
                } else {

                    // 'config() toExpNeg not an integer: {v}'
                    // 'config() toExpNeg out of range: {v}'
                    ifExceptionsThrow( Decimal, p, v, c, 0 );
                }
            }

            // #toExpPos {number} Integer, 0 to EXP_LIMIT inclusive.
            if ( ( v = obj[ p = 'toExpPos' ] ) != u ) {

                if ( !( outOfRange = v < 0 || v > EXP_LIMIT ) && parse(v) == v ) {
                    Decimal[p] = Math.floor(v);
                } else {

                    // 'config() toExpPos not an integer: {v}'
                    // 'config() toExpPos out of range: {v}'
                    ifExceptionsThrow( Decimal, p, v, c, 0 );
                }
            }

             // #minE {number} Integer, -EXP_LIMIT to 0 inclusive.
            if ( ( v = obj[ p = 'minE' ] ) != u ) {

                if ( !( outOfRange = v < -EXP_LIMIT || v > 0 ) && parse(v) == v ) {
                    Decimal[p] = Math.floor(v);
                } else {

                    // 'config() minE not an integer: {v}'
                    // 'config() minE out of range: {v}'
                    ifExceptionsThrow( Decimal, p, v, c, 0 );
                }
            }

            // #maxE {number} Integer, 0 to EXP_LIMIT inclusive.
            if ( ( v = obj[ p = 'maxE' ] ) != u ) {

                if ( !( outOfRange = v < 0 || v > EXP_LIMIT ) && parse(v) == v ) {
                    Decimal[p] = Math.floor(v);
                } else {

                    // 'config() maxE not an integer: {v}'
                    // 'config() maxE out of range: {v}'
                    ifExceptionsThrow( Decimal, p, v, c, 0 );
                }
            }

            // #errors {boolean|number} true, false, 1 or 0.
            if ( ( v = obj[ p = 'errors' ] ) != u ) {

                if ( v === !!v || v === 1 || v === 0 ) {
                    outOfRange = id = 0;
                    Decimal[p] = !!v;
                } else {

                    // 'config() errors not a boolean or binary digit: {v}'
                    ifExceptionsThrow( Decimal, p, v, c, 1 );
                }
            }

            // #crypto {boolean|number} true, false, 1 or 0.
            if ( ( v = obj[ p = 'crypto' ] ) != u ) {

                if ( v === !!v || v === 1 || v === 0 ) {
                    Decimal[p] = !!( v && crypto && typeof crypto == 'object' );
                } else {

                    // 'config() crypto not a boolean or binary digit: {v}'
                    ifExceptionsThrow( Decimal, p, v, c, 1 );
                }
            }

            // #modulo {number} Integer, 0 to 9 inclusive.
            if ( ( v = obj[ p = 'modulo' ] ) != u ) {

                if ( !( outOfRange = v < 0 || v > 9 ) && parse(v) == v ) {
                    Decimal[p] = v | 0;
                } else {

                    // 'config() modulo not an integer: {v}'
                    // 'config() modulo out of range: {v}'
                    ifExceptionsThrow( Decimal, p, v, c, 0 );
                }
            }

            return Decimal;
        }


        /*
         * Return a new Decimal whose value is the cosine of #n.
         *
         * n {number|string|Decimal} A number given in radians.
         *
        function cos(n) { return new this( Math.cos(n) + '' ) }
         */


        /*
         * Return a new Decimal whose value is the exponential of #n,
         *
         * n {number|string|Decimal} The power to which to raise the base of the natural log.
         *
         */
        function exp(n) { return new this(n)['exp']() }


        /*
         * Return a new Decimal whose value is #n round to an integer using ROUND_FLOOR.
         *
         * n {number|string|Decimal}
         *
        function floor(n) { return new this(n)['floor']() }
         */


        /*
         * Return a new Decimal whose value is the natural logarithm of #n.
         *
         * n {number|string|Decimal}
         *
         */
        function ln(n) { return new this(n)['ln']() }


        /*
         * Return a new Decimal whose value is the log of #x to the base #y, or to base 10 if no
         * base is specified.
         *
         * log[y](x)
         *
         * x {number|string|Decimal} The argument of the logarithm.
         * y {number|string|Decimal} The base of the logarithm.
         *
         */
        function log( x, y ) { return new this(x)['log'](y) }


        /*
         * Handle #max and #min. #ltgt is 'lt' or 'gt'.
         */
        function maxOrMin( Decimal, args, ltgt ) {
            var m, n,
                i = 0;

            if ( toString.call( args[0] ) == '[object Array]' ) {
                args = args[0];
            }

            m = new Decimal( args[0] );

            for ( ; ++i < args.length; ) {
                n = new Decimal( args[i] );

                if ( !n['s'] ) {
                    m = n;

                    break;
                } else if ( m[ltgt](n) ) {
                    m = n;
                }
            }

            return m;
        }


        /*
         * Return a new Decimal whose value is the maximum of the arguments.
         *
         * arguments {number|string|Decimal}
         *
         */
        function max() { return maxOrMin( this, arguments, 'lt' ) }


        /*
         * Return a new Decimal whose value is the minimum of the arguments.
         *
         * arguments {number|string|Decimal}
         *
         */
        function min() { return maxOrMin( this, arguments, 'gt' ) }


        /*
         * Parse the value of a new Decimal from a number or string.
         */
        var parseDecimal = (function () {
            var isValid = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
                trim = String.prototype.trim || function () {return this.replace(/^\s+|\s+$/g, '')};

            return function ( Decimal, x, n, b ) {
                var d, e, i, isNum, orig, valid;

                if ( typeof n != 'string' ) {

                    // If #n is a number, check if minus zero.
                    n = ( isNum = typeof n == 'number' || toString.call(n) == '[object Number]' ) &&
                        n === 0 && 1 / n < 0 ? '-0' : n + '';
                }
                orig = n;

                if ( b == e && isValid.test(n) ) {

                    // Determine sign.
                    x['s'] = n.charAt(0) == '-' ? ( n = n.slice(1), -1 ) : 1;

                // Either #n is not a valid Decimal or a base has been specified.
                } else {

                    /*
                     Enable exponential notation to be used with base 10 argument.
                     Ensure return value is rounded to #precision as with other bases.
                     */
                    if ( b == 10 ) {

                        return rnd( new Decimal(n), Decimal['precision'], Decimal['rounding'] );
                    }

                    n = trim.call(n).replace( /^\+(?!-)/, '' );

                    x['s'] = n.charAt(0) == '-' ? ( n = n.replace( /^-(?!-)/, '' ), -1 ) : 1;

                    if ( b != e ) {

                        if ( ( b == (b | 0) || !Decimal['errors'] ) &&
                          !( outOfRange = !( b >= 2 && b < 65 ) ) ) {
                            d = '[' + NUMERALS.slice( 0, b = b | 0 ) + ']+';

                           // Remove the `.` from e.g. '1.', and replace e.g. '.1' with '0.1'.
                            n = n.replace( /\.$/, '' ).replace( /^\./, '0.' );


                            // Any number in exponential form will fail due to the e+/-.
                            if ( valid = new RegExp(
                              '^' + d + '(?:\\.' + d + ')?$', b < 37 ? 'i' : '' ).test(n)
                            ) {

                                if (isNum) {

                                    if ( n.replace( /^0\.0*|\./, '' ).length > 15 ) {

                                        // '{method} number type has more than 15 significant digits: {n}'
                                        ifExceptionsThrow( Decimal, 0, orig );
                                    }

                                    // Prevent later check for length on converted number.
                                    isNum = !isNum;
                                }
                                n = convertBase( Decimal, n, 10, b, x['s'] );

                            } else if ( n != 'Infinity' && n != 'NaN' ) {

                                // '{method} not a base {b} number: {n}'
                                ifExceptionsThrow( Decimal, 'not a base ' + b + ' number', orig );
                                n = 'NaN';
                            }
                        } else {

                            // '{method} base not an integer: {b}'
                            // '{method} base out of range: {b}'
                            ifExceptionsThrow( Decimal, 'base', b, 0, 0 );

                            // Ignore base.
                            valid = isValid.test(n);
                        }
                    } else {
                        valid = isValid.test(n);
                    }

                    if ( !valid ) {

                        // Infinity/NaN
                        x['c'] = x['e'] = null;

                        // NaN
                        if ( n != 'Infinity' ) {

                            // No exception on NaN.
                            if ( n != 'NaN' ) {

                                // '{method} not a number: {n}'
                                ifExceptionsThrow( Decimal, 'not a number', orig );
                            }
                            x['s'] = null;
                        }
                        id = 0;

                        return x;
                    }
                }

                // Decimal point?
                if ( ( e = n.indexOf('.') ) > -1 ) {

                    n = n.replace( '.', '' );
                }

                // Exponential form?
                if ( ( i = n.search( /e/i ) ) > 0 ) {

                    // Determine exponent.
                    if ( e < 0 ) {
                        e = i;
                    }
                    e += +n.slice( i + 1 );
                    n = n.substring( 0, i );

                } else if ( e < 0 ) {

                    // Integer.
                    e = n.length;
                }

                // Determine leading zeros.
                for ( i = 0; n.charAt(i) == '0'; i++ ) {
                }

                if ( i == ( b = n.length ) ) {

                    // Zero.
                    x['c'] = [ x['e'] = 0 ];
                } else {

                    // Disallow numbers with over 15 significant digits if number type.
                    if ( isNum && b > 15 && n.slice(i).length > 15 ) {

                        // '{method} number type has more than 15 significant digits: {n}'
                        ifExceptionsThrow( Decimal, 0, orig );
                    }

                    // Determine trailing zeros.
                    for ( ; n.charAt(--b) == '0'; ) {
                    }

                    x['e'] = e - i - 1;
                    x['c'] = [];

                    // Convert string to array of digits (without leading and trailing zeros).
                    for ( e = 0; i <= b; x['c'][e++] = +n.charAt(i++) ) {
                    }

                    if (external) {

                        // Overflow?
                        if ( x['e'] > Decimal['maxE'] ) {

                            // Infinity.
                            x['c'] = x['e'] = null;

                        // Underflow?
                        } else if ( x['e'] < Decimal['minE'] ) {

                            // Zero.
                            x['c'] = [ x['e'] = 0 ];
                        }
                    }
                }
                id = 0;
            }
        })();


        /*
         * Return a new Decimal whose value is #x raised to the power #y.
         *
         * x {number|string|Decimal} The base.
         * y {number|string|Decimal} The exponent.
         *
         */
        function pow( x, y ) { return new this(x)['pow'](y) }


        /*
         * Generate a new Decimal with a random value.
         */
        var random = (function () {

            /*
             * #crypto false.
             *
             * Return a string of random decimal digits.
             * If #max is falsey return up to 14 digits (almost always 13 or 14 digits),
             * else return a number >= 0 and < #max (#max < 256).
             */
            function getMathRandom(max) {
                var r = Math.random();

                /*
                  Add 1 to avoid exponential notation and keep leading zeros. Omit the first and the
                  last two digits for a maximum of 14 significant digits and to ensure that trailing
                  digits can be zero.
                 */
                return max ? ( r * max | 0 ) + '' : ( 1 + r + '' ).slice( 2, -2 );
            }


            /*
             * #crypto true.
             * Browsers supporting crypto.getRandomValues.
             *
             * Return a string of random decimal digits.
             * If #max is falsey return 9 digits, else return a number >= 0 and < #max (#max < 256).
             */
            function getRandomValues(max) {
                var n;

                return max

                  // 0 >= n < 256
                  ? ( n = crypto['getRandomValues']( new global['Uint8Array'](1) )[0],
                      n > ( 256 / max | 0 ) * max - 1

                        // Probability of recall if #max is 10 is 6 / 256 = 0.023 (i.e. 1 in 42.7).
                        ? getRandomValues(max)
                        : n % max + '' )

                  // 0 >= n < 4294967296
                  : ( n = crypto['getRandomValues']( new global['Uint32Array'](1) )[0],
                      n >= 4e9

                        // Probability of recall is 294967297 / 4294967296 = 0.0687 (i.e. 1 in 14.6).
                        ? getRandomValues(max)

                        // Add 1e9 so 1000000000 >= n <= 4999999999 and omit leading digit.
                        : ( n + 1e9 + '' ).slice(1) );
            }


            /*
             * #crypto true.
             * Node.js supporting crypto.randomBytes.
             *
             * Return a string of random decimal digits.
             * If #max is falsey return 14 digits, else return a number >= 0 and < #max (#max < 256).
             */
            function getRandomBytes(max) {
                var buf, n,
                    rb = crypto['randomBytes'];

                return max
                  ? ( n = rb(1)[0], n > ( 256 / max | 0 ) * max - 1
                    ? getRandomBytes(max)
                    : n % max + '' )

                  // 01000011 0011XXXX XXXXXXXX XXXXXXXX XXXXXXXX XXXXXXXX XXXXXXXX XXXXXXXX
                  : ( buf = rb(8), buf[0] = 0x43, buf[1] = buf[1] & 0xf | 0x30,

                      /*
                        (mantissa all zeros) 4503599627370496 >= n <= 9007199254740991 (mantissa all ones).
                        4503599627370496 - 3599627370496 = 4500000000000000
                        9007199254740991 - 3599627370496 = 9003599627370495
                       */
                      n = buf.readDoubleBE(0),
                      n > 9003599627370495

                        /*
                          Probability of recall is
                          3599627370497 / 4503599627370496 = 0.000799 (i.e. 1 in 1251).
                         */
                        ? getRandomBytes(max)

                        /*
                         Subtracting 4503599627370496 gives 0 >= n <= 4499999999999999,
                         so subtracting 1e15 less than that gives
                         1000000000000000 >= n <= 5499999999999999.
                         Return the last 14 digits as a string.
                         */
                        : ( n - 3503599627370496 + '' ).slice(2) );
            }

            /*
             * Returns a new Decimal with a random value equal to or greater than 0 and lower in
             * magnitude than #limit.
             *
             * If #limit is omitted then it will be 1 and the return value will have #precision
             * significant digits (or less if trailing zeros are produced).
             *
             * If #limit is included and #pr is omitted then the return value will be an integer. If
             * #pr is included, the return value will have #pr significant digits (or less if
             * trailing zeros are produced).
             *
             * [limit] {number|string|Decimal}
             * [pr] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
             *
             */
            return function ( limit, pr ) {
                var c, e, i, ld, n, one, rd, str,
                    Decimal = this,
                    r = new Decimal(0),
                    rand = getMathRandom;

                // null/+-Infinity/NaN?
                if ( one = limit == e || !( id = 14, limit = new Decimal(limit) )['c'] &&
                  !ifExceptionsThrow( Decimal, 'limit must be finite', limit, 'random' ) ) {
                    limit = new Decimal( Decimal['ONE'] );

                // Zero?
                } else if ( !limit['c'][0] ) {

                    return r;
                }

                if ( Decimal['crypto'] ) {

                    // Recent browsers.
                    if ( crypto['getRandomValues'] ) {
                        rand = getRandomValues;

                    // Node.js.
                    } else if ( crypto['randomBytes'] ) {
                        rand = getRandomBytes;
                    }
                }

                e = limit['e'];
                n = ( c = limit['c'] ).length;

                // Ensure #r < limit.
                do {
                    i = 0;
                    str = rand( c[0] + 1 ) + rand();

                    do {
                        ld = c[i];               // #limit digit
                        rd = str.charAt(i++);    // random digit
                    } while ( ld == rd );
                } while ( rd > ld || i > n || rd == '' );

                // Decrement exponent of result for every leading zero.
                for ( i = 0; str.charAt(i) == '0'; i++, e-- ) {
                }

                if (one) {
                    pr = Decimal['precision'];
                } else if ( pr == null || !checkArg( limit, pr, 'random', 1 ) ) {
                    pr = e + 1;
                } else {
                    pr |= 0;
                }

                pr += i;

                // Add further random digits.
                while ( str.length < pr ) {
                    str += rand();
                }

                // Determine trailing zeros.
                for ( ; str.charAt(--pr) == '0'; ) {
                }

                if ( ++pr > 0 ) {

                    // Convert #str to number array without leading and trailing zeros.
                    for ( r['c'] = []; i < pr; r['c'].push( +str.charAt(i++) ) ) {
                    }
                } else {

                   // Zero.
                    r['c'] = [ e = 0 ];
                }

                r['e'] = e;
                r['s'] = limit['s'];

                return r;
            }
        })();


        /*
         * Not currently in public api.
         *
         * Generate random numbers for testing purposes.
         *
         * Returns a Decimal with a random sign, a random exponent in the range [-MIN.E, MAX-E]
         * and a random number of significant digits in the range [1, #precision].
         *
         * Within the limits of the #precision setting, this method can produce any finite Decimal.
         * It will not, though, produce a uniform distribution. Intentionally, it is heavily biased
         * toward smaller exponents.
         *
         * Math.random is always used as the source of randomness.
         *
        function randomE() {
            var i,
                Decimal = this,
                // 1 in 4 chance of negative exponent.
                isNeg = Math.random() < 0.25,
                n = Math.floor( Math.random() * ( (
                  isNeg ? -Decimal['minE'] : Decimal['maxE'] ) + 1 ) ) + '',
                c = [ Math.random() * 9 + 1 | 0 ],
                pr = i = Math.random() * Decimal['precision'] | 0,
                r = new Decimal( Decimal['ONE'] );

            while ( i-- ) {
                c.push( Math.random() * 10 | 0 );
            }
            c[pr] = Math.random() * 9 + 1 | 0;

            // Further increase likelihood of smaller exponent. Comment-out if not required.
            while ( Math.random() < 0.9 ) {
                n = n.slice( Math.random() * n.length | 0 );
            }

            r['e'] = ( isNeg ? -1 : 1 ) * n.slice( Math.random() * n.length | 0 );
            r['c'] = r['e'] == Decimal['minE'] ? [1] : c;
            r['s'] = Math.random() < 0.4 ? -1 : 1;

            return r;
        }
         */


        /*
         * Return a new Decimal whose value is #n round to an integer using rounding mode #rounding.
         *
         * To emulate Math.round, set #rounding to 7 (ROUND_HALF_CEIL).
         *
         * n {number|string|Decimal}
         *
        function round(n) {
            var x = new this(n);

            return rnd( x, x['e'] + 1, this['rounding'] );
        }
         */


        /*
         * Return a new Decimal whose value is the sine of #n.
         *
         * n {number|string|Decimal} A number given in radians.
         *
        function sin(n) { return new this( Math.sin(n) + '' ) }
         */


        /*
         * Return a new Decimal whose value is the square root of #n.
         *
         * n {number|string|Decimal}
         *
         */
        function sqrt(n) { return new this(n)['sqrt']() }


        /*
         * Return a new Decimal whose value is the tangent of #n.
         *
         * n {number|string|Decimal} A number given in radians.
         *
        function tan(n) { return new this( Math.tan(n) + '' ) }
         */


        /*
         * Return a new Decimal whose value is #n truncated to an integer.
         *
         * n {number|string|Decimal}
         *
        function trunc(n) { return new this(n)['trunc']() }
         */


        /*
         * Create and return a new Decimal constructor.
         *
         */
        function DecimalFactory(obj) {

            /*
             * The Decimal constructor.
             * Create and return a new instance of a Decimal object.
             *
             * n {number|string|Decimal} A numeric value.
             * [b] {number} The base of n. Integer, 2 to 64 inclusive.
             *
             */
            function Decimal( n, b ) {
                var x = this;

                // Constructor called without new.
                if ( !( x instanceof Decimal ) ) {
                    ifExceptionsThrow( Decimal, 'Decimal called without new', n );

                    return new Decimal( n, b );
                }

                // Duplicate.
                if ( n instanceof Decimal ) {

                    if ( b == null ) {
                        id = 0;
                        x['constructor'] = n['constructor'];
                        x['s'] = n['s'];
                        x['e'] = n['e'];
                        x['c'] = ( n = n['c'] ) ? n.slice() : n;

                        return;
                    } else if ( b == 10 ) {

                        return rnd( new Decimal(n), Decimal['precision'], Decimal['rounding'] );
                    } else {
                        n += '';
                    }
                }

                return parseDecimal( x['constructor'] = Decimal, x, n, b );
            }


            /* ************************ CONSTRUCTOR DEFAULT PROPERTIES *****************************


             These default values must be integers within the stated ranges (inclusive).
             Most of these values can be changed during run-time using Decimal.config.
             */

            /*
             The maximum number of significant digits of the result of a calculation or base
             conversion.
             E.g.  Decimal.config({ precision: 20 })
             */
            Decimal['precision'] = 20;                        // 1 to MAX_DIGITS

            /*
             The rounding mode used when rounding to #precision.

             ROUND_UP         0 Away from zero.
             ROUND_DOWN       1 Towards zero.
             ROUND_CEIL       2 Towards +Infinity.
             ROUND_FLOOR      3 Towards -Infinity.
             ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
             ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
             ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
             ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
             ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.

             E.g.
             Decimal.rounding = 4;
             Decimal.rounding = Decimal.ROUND_HALF_UP;
             */
            Decimal['rounding'] = 4;                          // 0 to 8

            /*
             The modulo mode used when calculating the modulus: a mod n.
             The quotient (q = a / n) is calculated according to the corresponding rounding mode.
             The remainder (r) is calculated as: r = a - n * q.

             UP         0 The remainder is positive if the dividend is negative, else is negative.
             DOWN       1 The remainder has the same sign as the dividend.
                          This modulo mode is commonly known as "truncated division" and matches
                          as closely as possible, the behaviour of JS remainder operator (a % n).
             FLOOR      3 The remainder has the same sign as the divisor (Python %).
             HALF_EVEN  6 This modulo mode implements the IEEE 754 remainder function.
             EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)).
                          The remainder is always positive.

             The above modes - truncated division, floored division, Euclidian division and IEEE 754
             remainder - are commonly used for the modulus operation. Although any other of the
             rounding modes can be used, they may not give useful results.
             */
            Decimal['modulo'] = 1;                            // 0 to 9

            // The exponent value at and beneath which #toString returns exponential notation.
            // Number type: -7
            Decimal['toExpNeg'] = -7;                       // 0 to -EXP_LIMIT

            // The exponent value at and above which #toString returns exponential notation.
            // Number type: 21
            Decimal['toExpPos'] = 21;                       // 0 to EXP_LIMIT

            // The minimum exponent value, beneath which underflow to zero occurs.
            // Number type: -324  (5e-324)
            Decimal['minE'] = -EXP_LIMIT;                    // -1 to -EXP_LIMIT

            // The maximum exponent value, above which overflow to Infinity occurs.
            // Number type:  308  (1.7976931348623157e+308)
            Decimal['maxE'] = EXP_LIMIT;                     // 1 to EXP_LIMIT

            // Whether Decimal Errors are ever thrown.
            Decimal['errors'] = true;                         // true/false

            // Whether to use cryptographically-secure random number generation, if available.
            Decimal['crypto'] = false;                        // true/false


            /* ********************** END OF CONSTRUCTOR DEFAULT PROPERTIES ********************* */


            Decimal.prototype = P;

            Decimal['ONE'] = new Decimal(1);

            /*
            // Pi to 80 s.d.
            Decimal['PI'] = new Decimal(
                '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089'
            );
             */

            Decimal['ROUND_UP'] = 0;
            Decimal['ROUND_DOWN'] = 1;
            Decimal['ROUND_CEIL'] = 2;
            Decimal['ROUND_FLOOR'] = 3;
            Decimal['ROUND_HALF_UP'] = 4;
            Decimal['ROUND_HALF_DOWN'] = 5;
            Decimal['ROUND_HALF_EVEN'] = 6;
            Decimal['ROUND_HALF_CEIL'] = 7;
            Decimal['ROUND_HALF_FLOOR'] = 8;

            // modulo mode
            Decimal['EUCLID'] = 9;

            //Decimal['abs'] = abs;
            //Decimal['acos'] = acos;
            //Decimal['asin'] = asin;
            //Decimal['atan'] = atan;
            //Decimal['atan2'] = atan2;
            //Decimal['ceil'] = ceil;
            //Decimal['cos'] = cos;
            //Decimal['floor'] = floor;
            //Decimal['round'] = round;
            //Decimal['sin'] = sin;
            //Decimal['tan'] = tan;
            //Decimal['trunc'] = trunc;

            Decimal['config'] = config;
            Decimal['constructor'] = DecimalFactory;
            Decimal['exp'] = exp;
            Decimal['ln'] = ln;
            Decimal['log'] = log;
            Decimal['max'] = max;
            Decimal['min'] = min;
            Decimal['pow'] = pow;
            Decimal['sqrt'] = sqrt;
            Decimal['random'] = random;
            //Decimal['randomE'] = randomE;

            if ( obj != null ) {
                Decimal['config'](obj);
            }

            return Decimal;
        }

        return DecimalFactory();
    })();


    // Export.


    // Node and other CommonJS-like environments that support module.exports.
    if ( typeof module != 'undefined' && module && module.exports ) {
        module.exports = DecimalConstructor;

        if ( typeof require == 'function' ) {
            crypto = require('crypto');
        }
    } else {
        crypto = global['crypto'];

        //AMD.
        if ( typeof define == 'function' && define.amd ) {
            define( function () { return DecimalConstructor } );

        //Browser.
        } else {
            noConflict = global['Decimal'];

            DecimalConstructor['noConflict'] = function () {
                global['Decimal'] = noConflict;

                return DecimalConstructor;
            };
            global['Decimal'] = DecimalConstructor;
        }
    }
})(this);
