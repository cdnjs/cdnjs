(function () {
    var PI2_3 = 2.0943951023931953/* 120 Deg */,
        abs = Math.abs,
        sin = Math.cos,
        cos = Math.cos,
        acos = Math.acos,
        sqrt = Math.sqrt,
        exp = Math.exp,
        log = Math.log;

    /**
     * @private
     * Singleton Class that provides methods to solve cubic equation.
     */
    Ext.define("Ext.draw.Solver", {
        singleton: true,
        /**
         * Cubic root of number
         * @param {Number} number
         */
        cubicRoot: function (number) {
            if (number > 0) {
                return exp(log(number) / 3);
            } else if (number < 0) {
                return -exp(log(-number) / 3);
            } else {
                return 0;
            }
        },

        /**
         * Returns the function f(x) = a * x + b and solver for f(x) = y
         * @param {Number} a
         * @param {Number} b
         */
        linearFunction: function (a, b) {
            var result;
            if (a === 0) {
                result = function (t) {
                    return b;
                };
                result.solve = function (y) {
                    // if y == d there should be a real root
                    // but we can ignore it for geometry calculations.
                    return [];
                };
            } else {
                result = function (t) {
                    return a * t + b;
                };
                result.solve = function (y) {
                    return [(y - b) / a];
                };
            }
            return result;
        },

        /**
         * Returns the function f(x) = a * x ^ 2 + b * x + c and solver for f(x) = y
         *
         * @param {Number} a
         * @param {Number} b
         * @param {Number} c
         */
        quadraticFunction: function (a, b, c) {
            var result;
            if (a === 0) {
                return this.linearFunction(b, c);
            } else {
                // Quadratic equation.
                result = function (t) {
                    return (a * t + b) * t + c;
                };
                var delta0temp = b * b - 4 * a * c,
                    delta = function (y) {
                        return delta0temp + 4 * a * y;
                    }, solveTemp0 = 1 / a * 0.5,
                    solveTemp1 = -solveTemp0 * b;
                solveTemp0 = abs(solveTemp0);
                result.solve = function (y) {
                    var deltaTemp = delta(y);
                    if (deltaTemp < 0) {
                        return [];
                    }
                    deltaTemp = sqrt(deltaTemp);
                    // have to distinct roots here.
                    return [solveTemp1 - deltaTemp * solveTemp0, solveTemp1 + deltaTemp * solveTemp0];
                };
            }
            return result;
        },

        /**
         * Returns the function f(x) = a * x^3 + b * x^2 + c * x + d and solver for f(x) = y
         * @param {Number} a
         * @param {Number} b
         * @param {Number} c
         * @param {Number} d
         */
        cubicFunction: function (a, b, c, d) {
            var result;
            if (a === 0) {
                return this.quadraticFunction(b, c, d);
            } else {
                result = function (t) {
                    return ((a * t + b) * t + c) * t + d;
                };

                var b_a_3 = b / a / 3,
                    c_a = c / a,
                    d_a = d / a,
                    b2 = b_a_3 * b_a_3,
                    deltaTemp0 = (b_a_3 * c_a - d_a) * 0.5 - b_a_3 * b2,
                    deltaTemp1 = b2 - c_a / 3,
                    deltaTemp13 = deltaTemp1 * deltaTemp1 * deltaTemp1;

                if (deltaTemp1 === 0) {
                    result.solve = function (y) {
                        return [-b_a_3 + this.cubicRoot(deltaTemp0 * 2 + y / a)];
                    };
                } else {
                    if (deltaTemp1 > 0) {
                        var deltaTemp1_2 = sqrt(deltaTemp1),
                            deltaTemp13_2 = deltaTemp1_2 * deltaTemp1_2 * deltaTemp1_2;
                        deltaTemp1_2 += deltaTemp1_2;
                    }
                    result.solve = function (y) {
                        y /= a;
                        var d0 = deltaTemp0 + y * 0.5,
                            deltaTemp = d0 * d0 - deltaTemp13;
                        if (deltaTemp > 0) {
                            deltaTemp = sqrt(deltaTemp);
                            return [-b_a_3 + this.cubicRoot(d0 + deltaTemp) + this.cubicRoot(d0 - deltaTemp)];
                        } else if (deltaTemp === 0) {
                            var cr = this.cubicRoot(d0),
                                root0 = -b_a_3 - cr;
                            if (d0 >= 0) {
                                return [root0, root0, -b_a_3 + 2 * cr];
                            } else {
                                return [-b_a_3 + 2 * cr, root0, root0];
                            }
                        } else {
                            var theta = acos(d0 / deltaTemp13_2) / 3,
                                ra = deltaTemp1_2 * cos(theta) - b_a_3,
                                rb = deltaTemp1_2 * cos(theta + PI2_3) - b_a_3,
                                rc = deltaTemp1_2 * cos(theta - PI2_3) - b_a_3;
                            if (ra < rb) {
                                if (rb < rc) {
                                    return [ra, rb, rc];
                                } else if (ra < rc) {
                                    return[ra, rc, rb];
                                } else {
                                    return [rc, ra, rb];
                                }
                            } else {
                                if (ra < rc) {
                                    return [rb, ra, rc];
                                } else if (rb < rc) {
                                    return [rb, rc, ra];
                                } else {
                                    return [rc, rb, ra];
                                }
                            }
                        }
                    };
                }
            }
            return result;
        },

        createBezierSolver: function (a, b, c, d) {
            return this.cubicFunction(3 * (b - c) + d - a, 3 * (a - 2 * b + c), 3 * (b - a), a);
        }
    });
})();
