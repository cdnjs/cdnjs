(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.Confidence = factory();
  }
}(this, function () {
  /** Private Constants */
  var DEFAULT_Z_SCORE = 1.96;
  var DEFAULT_MARGIN_OF_ERROR = 0.01;
  var VERSION = '1.1.0';

  var Confidence = function(settings) {
    settings = settings || { };

    this._zScore = settings.hasOwnProperty('zScore') ? settings.zScore : DEFAULT_Z_SCORE;
    this._marginOfError = settings.hasOwnProperty('marginOfError') ? settings.marginOfError : DEFAULT_MARGIN_OF_ERROR;
    this._variants = { };
    this._confidenceIntervals = { };
  };

  // Updates the API version number
  Confidence.version = VERSION;

  /*
  Given a z-score, this function returns a polynomial approximation of the corresponding confidence-level.

  Adapted from:
  Ibbetson D, Algorithm 209
  Collected Algorithms of the CACM 1963 p. 616
  */
  var Z_MAX = 6;
  var zScoreProbability = function(z) {
    var w, x, y;
    if (z === 0.0) {
      x = 0.0;
    } else {
      y = 0.5 * Math.abs(z);
      if (y > (Z_MAX * 0.5)) {
        x = 1.0;
      } else if (y < 1.0) {
        w = y * y;
        x = ((((((((0.000124818987 * w - 0.001075204047) * w + 0.005198775019) * w - 0.019198292004) * w + 0.059054035642) * w - 0.151968751364) * w + 0.319152932694) * w - 0.531923007300) * w + 0.797884560593) * y * 2.0;
      } else {
        y -= 2.0;
        x = (((((((((((((-0.000045255659 * y + 0.000152529290) * y - 0.000019538132) * y - 0.000676904986) * y + 0.001390604284) * y - 0.000794620820) * y - 0.002034254874) * y + 0.006549791214) * y - 0.010557625006) * y + 0.011630447319) * y - 0.009279453341) * y + 0.005353579108) * y - 0.002141268741) * y + 0.000535310849) * y + 0.999936657524;
      }
    }
    if (z > 0.0) {
      return (x + 1) / 2.0;
    } else {
      return (1 - x) / 2.0;
    }
  };

    var BIGX = 20.0;                  /* max value to represent exp(x) */

    function ex(x) {
        return (x < -BIGX) ? 0.0 : Math.exp(x);
    }

  /*  POCHISQ  --  probability of chi-square value

              Adapted from:
                      Hill, I. D. and Pike, M. C.  Algorithm 299
                      Collected Algorithms for the CACM 1967 p. 243
              Updated for rounding errors based on remark in
                      ACM TOMS June 1985, page 185
    */

    var pochisq = function(x, df) {
        var a, y, s;
        var e, c, z;
        var even;                     /* True if df is an even number */

        var LOG_SQRT_PI = 0.5723649429247000870717135; /* log(sqrt(pi)) */
        var I_SQRT_PI = 0.5641895835477562869480795;   /* 1 / sqrt(pi) */

        if (x <= 0.0 || df < 1) {
            return 1.0;
        }

        a = 0.5 * x;
        even = !(df & 1);
        if (df > 1) {
            y = ex(-a);
        }
        s = (even ? y : (2.0 * zSquareProbability(-Math.sqrt(x))));
        if (df > 2) {
            x = 0.5 * (df - 1.0);
            z = (even ? 1.0 : 0.5);
            if (a > BIGX) {
                e = (even ? 0.0 : LOG_SQRT_PI);
                c = Math.log(a);
                while (z <= x) {
                    e = Math.log(z) + e;
                    s += ex(c * z - a - e);
                    z += 1.0;
                }
                return s;
            } else {
                e = (even ? 1.0 : (I_SQRT_PI / Math.sqrt(a)));
                c = 0.0;
                while (z <= x) {
                    e = e * (a / z);
                    c = c + e;
                    z += 1.0;
                }
                return c * y + s;
            }
        } else {
            return s;
        }
    };

    /*  CRITCHI  --  Compute critical chi-square value to
                     produce given p.  We just do a bisection
                     search for a value within CHI_EPSILON,
                     relying on the monotonicity of pochisq().  */

    var critchi = function(p, df) {
        var CHI_EPSILON = 0.000001;   /* Accuracy of critchi approximation */
        var CHI_MAX = 99999.0;        /* Maximum chi-square value */
        var minchisq = 0.0;
        var maxchisq = CHI_MAX;
        var chisqval;

        if (p <= 0.0) {
            return maxchisq;
        } else {
            if (p >= 1.0) {
                return 0.0;
            }
        }

        chisqval = df / Math.sqrt(p);    /* fair first value */
        while ((maxchisq - minchisq) > CHI_EPSILON) {
            if (pochisq(chisqval, df) < p) {
                maxchisq = chisqval;
            } else {
                minchisq = chisqval;
            }
            chisqval = (maxchisq + minchisq) * 0.5;
        }
        return chisqval;
      };
  /** Public Constants **/

  Confidence.prototype.addVariant = function(variant) {
    // check if variant ID already exists
    if (this.variantExists(variant.id)) {
      var message = 'A variant with ID \'' + variant.id + '\' already exists.';
      throw new Error (message);
    } else {
      // add the variant!
      // variant must have properties conversionCount, eventCount
      if (variant.hasOwnProperty('id') &&
        variant.hasOwnProperty('conversionCount') &&
        variant.hasOwnProperty('eventCount')) {
        if(!variant.hasOwnProperty('name')) {
          variant['name'] = 'Variant ' + variant.id;
        }
        this._variants[variant.id] = variant;
      } else {
        throw new Error('variant object needs conversionCount and eventCount properties');
      }
    }
  };

  Confidence.prototype.getVariant = function(variantID) {
    if (this.variantExists(variantID)) {
      return this._variants[variantID];
    } else {
      throw new Error('The variant you requested does not exist.');
    }
  };

  Confidence.prototype.variantExists = function(variantID) {
    if (this._variants.hasOwnProperty(variantID)) {
      return true;
    } else {
      return false;
    }
  };

  Confidence.prototype.hasVariants = function(variants) {
    for(var variant in variants) {
      if(variants.hasOwnProperty(variant)) {
        return true;
      }
    }
    return false;
  };

//**************************************************************************//
// Z-TEST
//**************************************************************************//

  Confidence.prototype.getResult = function() {
    if (this.hasVariants(this._variants)) {

      confidenceIntervals = {};

      var result;
      // for each variant in variants
      for (var variantID in this._variants) {
        // get sample size required for statistically significant answer
        var requiredSampleSize = this.getRequiredSampleSize(variantID);

        // do we have a winner to pass into the result
        var hasWinner = false;

        // verify whether we have enough data
        var hasEnoughData = this.hasEnoughData(variantID);

        // If we don't have enough data yet, we cannot yet declare a result.
        if (!hasEnoughData) {
          result = {
            hasWinner: hasWinner,
            hasEnoughData: hasEnoughData,
            winnerID: null,
            winnerName: null,
            confidencePercent: null,
            confidenceInterval: null,
            readable: "There is not enough data to determine a conclusive result."
          };
          return result;
        }

        //calculate confidence interval
        var confidenceInterval = this.getConfidenceInterval(variantID);

        confidenceIntervals[variantID] = confidenceInterval;
      }

      // At this point, we have enough data to determine whether there is a winner or not
      result = this.analyzeConfidenceIntervals(confidenceIntervals);
      return result;
    } else {
      throw new Error('There are no variants available.');
    }
  };

  Confidence.prototype.analyzeConfidenceIntervals = function(confidenceIntervals) {

    var minimums = [];
    var maximums = [];

    // split confidence intervals into a list of mins and maxes.
    for (var id in confidenceIntervals) {
      // instantiate object
      var min = confidenceIntervals[id].min;
      minimums.push({ id: id, val: min });

      var max = confidenceIntervals[id].max;
      maximums.push({ id: id, val: max });
    }

    // sort list of minimums greatest to least
    minimums = this.sortList(minimums);

    // identify ID with the largest min
    var idWithLargestMin = minimums[0].id;
    var largestMin = minimums[0].val;

    // sort list of maximums greatest to least
    maximums = this.sortList(maximums);

    // remove the ID with the largest min from the list of maximums.
    for (var index = 0; index < maximums.length; index++) {
      var obj = maximums[index];

      if (obj.id == idWithLargestMin) {
        maximums.splice(index, 1);
      }
    }

    // identify ID with the largest max and its value
    var idWithLargestMax = maximums[0].id;
    var largestMax = maximums[0].val;

    var confidencePercent = this.getConfidencePercent();

    var result;

    var hasWinner;
    var hasEnoughData;


    // if highest min > highest max, declare the ID of the winner to be the min
    if (largestMin > largestMax) {
      winningVariantName = this._variants[idWithLargestMin].name;
      var roundedMin = (Math.round(10000 * confidenceIntervals[idWithLargestMin].min)/100);
      var roundedMax = (Math.round(10000 * confidenceIntervals[idWithLargestMin].max)/100);

      var message = "With " + confidencePercent + "% confidence, the true population parameter of the \"";
      message += winningVariantName + "\" variant will fall between ";
      message += roundedMin + "% and ";
      message += roundedMax + "%.";

      result = {
        hasWinner: true,
        hasEnoughData: true,
        winnerID: idWithLargestMin,
        winnerName: winningVariantName,
        confidencePercent: confidencePercent,
        confidenceInterval: { min: roundedMin, max: roundedMax },
        readable: message
      };
      return result;
    } else {
      // otherwise, there is no winner
      var messageNoWinner = "There is no winner, the results are too close.";

      result = {
        hasWinner: false,
        hasEnoughData: true,
        winnerID: null,
        winnerName: null,
        confidencePercent: confidencePercent,
        confidenceInterval: null,
        readable: messageNoWinner
      };
    }

    return result;
  };

  // Sorts list from greatest to least
  Confidence.prototype.sortList = function(list) {
    list.sort(function(a, b) {
      return b.val - a.val;
    });
    return list;
  };

  // Gets Confidence percentage from the configured zscore
  Confidence.prototype.getConfidencePercent = function(zScore) {
    zScore = typeof zScore === 'number' ? zScore : this._zScore;

    var normalProbability = zScoreProbability(zScore);
    return (100 * (2 * normalProbability - 1)).toFixed(2);
  };

  // Are these result statistically significant?
  // (zscore^2 * stdErr * (1 - stdErr)) / marginErr^2
  Confidence.prototype.getRequiredSampleSize = function(variantID) {
    var standardError = this.getStandardError(variantID);
    var numerator = (Math.pow(this._zScore, 2) * standardError * (1 - standardError));
    var denominator = Math.pow(this._marginOfError, 2);

    var requiredSampleSize = Math.max((numerator/denominator), 100);
    return requiredSampleSize;
  };

  Confidence.prototype.hasEnoughData = function(variantID) {
    var variant = this.getVariant(variantID);
    var requiredSampleSize = this.getRequiredSampleSize(variantID);
    if (variant.eventCount >= requiredSampleSize) {
      return true;
    } else {
      return false;
    }
  };

  Confidence.prototype.getRate = function(variantID) {
    var variant = this.getVariant(variantID);
    if (variant.eventCount === 0) {
      throw new Error('Total is zero: cannot divide by zero to produce rate.');
    } else if (variant.eventCount < 0) {
      throw new Error('Total is negative: cannot use a negative number to produce rate.');
    } else {
      var rate = variant.conversionCount / variant.eventCount;
      return rate;
    }
  };

  // Calculate the interval for which we are <zscore> confident
  // rate +- (zscore * standard error)
  Confidence.prototype.getConfidenceInterval = function(variantID) {
    var confidenceInterval = {};
    var rate = this.getRate(variantID);
    var standardError = this.getStandardError(variantID);
    //lower limit
    var min = rate - (this._zScore * standardError);
    if (min < 0) {
      min = 0.00;
    }
    //upper limit
    var max = rate + (this._zScore * standardError);

    if (max > 1) {
      max = 1.00;
    }
    confidenceInterval = { min: min, max: max };

    return confidenceInterval;
  };

  // Calculate standard error:
  // SE = sqrt(rate*(1-rate)/total)
  Confidence.prototype.getStandardError = function(variantID) {
    var variant = this.getVariant(variantID);

    //Throw error if rate is not okay.
    var rate = this.getRate(variantID);

    //Check total Count - if event count is 0
    var standardError = Math.sqrt(rate * (1 - rate) / variant.eventCount);
    return standardError;
  };

//**************************************************************************//
// CHI-SQUARED AND MARASCUILLO'S PROCEDURE
//**************************************************************************//

Confidence.prototype.getMarascuilloResult = function() {
  var result;

  // Calculate observed and expected values.
  // If any of the expected values < 5 there is not enough data.
  var observedValues = this.getObservedValues();
  var pooledProportion = this.getPooledProportion(observedValues);
  var expectedValues = this.getExpectedValues(observedValues, pooledProportion);

  // If any expected value < 5, we do not have enough data
  if (expectedValues.hasEnoughData === false) {
    result = {
      hasWinner: false,
      hasEnoughData: false,
      winnerID: null,
      winnerName: null
    };
    return result;
  }

  // Calculate "Chi Parts".
  var chiPartValues = this.getChiParts(observedValues, expectedValues);
  var chiPartSum = this.sumChiParts(chiPartValues);

  // Calculate critical value.
  var degreesOfFreedom = this.getDegreesOfFreedom();
  var probability = (1 - zScoreProbability(this._zScore));
  var critChi = critchi(probability, 2);

  if (chiPartSum > critChi) {
    // there is a difference, proceed to marascuillo
    var bestVariant = this.getBestVariant();
    result = this.marascuillo(bestVariant, critChi);
  } else {
    // Enough data, no winner
    result = {
      hasWinner: false,
      hasEnoughData: true,
      winnerID: null,
      winnerName: null
    };
    return result;
  }
  return result;
};

// Compute and store observed successes (ie. clickthroughs),
// failures(total - clickthroughs), and totals for each variant.
Confidence.prototype.getObservedValues = function() {
  var observedValues = {};
  var variants = this._variants;

  for (var variant in variants) {
    var observedStats = {};

    var success = variants[variant].conversionCount;
    var fail = variants[variant].eventCount - variants[variant].conversionCount;
    var total = variants[variant].eventCount;

    observedStats['success'] = success;
    observedStats['fail'] = fail;
    observedStats['total'] = total;

    observedValues[variant] = observedStats;
  }
  return observedValues;
};
// Compute pooled proportion p
//   p = sum of successes / sum of totals
Confidence.prototype.getPooledProportion = function(observedValues) {
  var summedSuccesses = 0;
  var summedTotals = 0;

  // sum the successes across all variants, and
  // sum the totals across all variants
  for (var variant in observedValues){
    summedSuccesses += observedValues[variant].success;
    summedTotals += observedValues[variant].total;
  }

  if (summedTotals === 0) {
    throw new Error('Summed total is zero: cannot divide by zero to produce rate.');
  } else {
    var result = summedSuccesses / summedTotals;
    return result;
  }
};

// Compute and store expected successes and failures.
// For each expected success:
//   E@i = p*total@i
// For each expected failure:
//   E@i = (1-p)*total@i
Confidence.prototype.getExpectedValues = function(observedValues, pooledProportion) {

  var expectedValues = {};

  for (var variant in observedValues) {
    var expectedStats = {};
    var success;
    var fail;

    // If any expected count < 5, we don't have enough data.
    success = pooledProportion * observedValues[variant].total;
    fail = (1 - pooledProportion) * observedValues[variant].total;

    if (success < 5 || fail < 5) {
      expectedValues['hasEnoughData'] = false;
    }

    expectedStats['success'] = success;
    expectedStats['fail'] = fail;

    expectedValues[variant] = expectedStats;
  }
  if (expectedValues['hasEnoughData'] !== false) {
    expectedValues['hasEnoughData'] = true;
  }
  return expectedValues;
};

// Calculate "Chi Parts".
// For each cell (where i is the cell):
//   ChiPart@i = ((ObservedVal@i - ExpectedVal@i) ^ 2) / ExpectedVal@i
// SHORTCUT THIS? calculate critChi here and check at every step
Confidence.prototype.getChiParts = function(observedValues, expectedValues) {
  var chiPartValues = {};
  var success;
  var fail;

  for (var variant in observedValues) {
    var chiPartStats = {};

    // Compute Chi-Part for success
    var observedSuccess = observedValues[variant].success;
    var expectedSuccess = expectedValues[variant].success;

    if (expectedSuccess === 0) {
      throw new Error('Cannot divide by zero to produce chi parts.');
    } else {
      success = Math.pow((observedSuccess - expectedSuccess), 2) / expectedSuccess;
      chiPartStats['success'] = success;
    }

    // Compute Chi-Part for fail
    var observedFail = observedValues[variant].fail;
    var expectedFail = expectedValues[variant].fail;

    if (expectedFail === 0) {
      throw new Error('Cannot divide by zero to produce chi parts.');
    } else {
      fail = Math.pow((observedFail - expectedFail), 2) / expectedFail;
      chiPartStats['fail'] = fail;
    }

    chiPartValues[variant] = chiPartStats;
  }

  return chiPartValues;
};

// Sum the Chi Parts to get the Chi-Square value.
Confidence.prototype.sumChiParts = function(chiPartValues) {
  var chiPartSum = 0;

  for (var variant in chiPartValues) {
    chiPartSum += chiPartValues[variant].success;
    chiPartSum += chiPartValues[variant].fail;
  }
  return chiPartSum;
};

// Calculate degrees of freedom.
//   k - 1 where k is the number of variants
Confidence.prototype.getDegreesOfFreedom = function() {
  var len = (Object.keys(this._variants).length) - 1;
  return len;
};

// Find the variant with the highest rate
Confidence.prototype.getBestVariant = function() {
  var bestRate = 0;
  var bestVariantID;

  for (var variantID in this._variants) {
    var rate = this.getRate(variantID);
    if (rate > bestRate){
      bestRate = rate;
      bestVariantID = variantID;
    }
  }
  return bestVariantID;
};

// Compare the best variant to each other variant.
// if each test stat is greater than the corresponding critical value,
// then the best variant is the winner
// otherwise, there is no winner?
Confidence.prototype.marascuillo = function(bestVariantID, critChi) {
  var result;

  // TODO if there is only one variant there needs to be a check somewhere because this will probably mess up.
  // This is where the z-test messed up... right?
  for (var variantID in this._variants) {
    if (variantID === bestVariantID) {
      continue;
    } else {
      // Compare the successes of the best variantID
      var testStatistic = this.computeTestStatistic(bestVariantID, variantID);
      var criticalValue = this.computeCriticalValue(bestVariantID, variantID, critChi);

      if (testStatistic > criticalValue) {
        // keep goin', doin' fine, calculate the next one
        continue;
      } else {
        // There is enough data, but no winner.
        result = {
          hasWinner: false,
          hasEnoughData: true,
          winnerID: null,
          winnerName: null
        };
        return result;
      }
    }
  }
  // There is enough data and there is a winner.
  result = {
    hasWinner: true,
    hasEnoughData: true,
    winnerID: bestVariantID,
    winnerName: this._variants[bestVariantID]['name']
  };
  return result;
};

// test stat:
// | pi - pj |
Confidence.prototype.computeTestStatistic = function(bestVariantID, challengerVariantID) {
  var bestVariantRate = this.getRate(bestVariantID);
  var challengerVariantRate = this.getRate(challengerVariantID);

  var testStatistic = Math.abs(bestVariantRate - challengerVariantRate);

  return testStatistic;
};

// critical value:
// critChi * (sqrt((pi(1 - pi) / ni) + (pj(1 - pj) / nj))
Confidence.prototype.computeCriticalValue = function(bestVariantID, challengerVariantID, critChi) {

  // rates
  var bestVariantRate = this.getRate(bestVariantID);
  var challengerVariantRate = this.getRate(challengerVariantID);

  // totals
  var bestVariantTotal = this._variants[bestVariantID].eventCount;
  var challengerVariantTotal = this._variants[challengerVariantID].eventCount;

  var bestVariantPart = (bestVariantRate * (1 - bestVariantRate)) / bestVariantTotal;
  var challengerVariantPart = (challengerVariantRate * (1 - challengerVariantRate)) / challengerVariantTotal;

  var criticalValue = Math.sqrt(critChi) * Math.sqrt(bestVariantPart + challengerVariantPart);

  return criticalValue;
};
  return Confidence;
}));
