// # simple-statistics
//
// A simple, literate statistics system. The code below uses the
// [Javascript module pattern](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth),
// eventually assigning `simple-statistics` to `ss` in browsers or the
// `exports object for node.js
(function() {
    var ss = {};

    if (typeof module !== 'undefined') {
        // Assign the `ss` object to exports, so that you can require
        // it in [node.js](http://nodejs.org/)
        exports = module.exports = ss;
    } else {
        // Otherwise, in a browser, we assign `ss` to the window object,
        // so you can simply refer to it as `ss`.
        this.ss = ss;
    }

    // # [Linear Regression](http://en.wikipedia.org/wiki/Linear_regression)
    //
    // [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
    // is a simple way to find a fitted line
    // between a set of coordinates.
    function linear_regression() {
        var linreg = {},
            data = [];

        // Assign data to the model. Data is assumed to be an array.
        linreg.data = function(x) {
            if (!arguments.length) return data;
            data = x.slice();
            return linreg;
        };

        // Calculate the slope and y-intercept of the regression line
        // by calculating the least sum of squares
        linreg.mb = function() {
            var m, b;

            //if there's only one point, arbitrarily choose a slope of 0
            //and a y-intercept of whatever the y of the initial point is
            if (data.length == 1) {
                m = 0;
                b = data[0][1];
            } else {
                // Initialize our sums and scope the `m` and `b`
                // variables that define the line.
                var sum_x = 0, sum_y = 0,
                    sum_xx = 0, sum_xy = 0;

                // Gather the sum of all x values, the sum of all
                // y values, and the sum of x^2 and (x*y) for each
                // value.
                //
                // In math notation, these would be SS_x, SS_y, SS_xx, and SS_xy
                for (var i = 0; i < data.length; i++) {
                    sum_x += data[i][0];
                    sum_y += data[i][1];

                    sum_xx += data[i][0] * data[i][0];
                    sum_xy += data[i][0] * data[i][1];
                }

                // `m` is the slope of the regression line
                m = ((data.length * sum_xy) - (sum_x * sum_y)) /
                    ((data.length * sum_xx) - (sum_x * sum_x));

                // `b` is the y-intercept of the line.
                b = (sum_y / data.length) - ((m * sum_x) / data.length);
            }

            // Return both values as an object.
            return { m: m, b: b };
        };

        // a shortcut for simply getting the slope of the regression line
        linreg.m = function() {
            return linreg.mb().m;
        };

        // a shortcut for simply getting the y-intercept of the regression
        // line.
        linreg.b = function() {
            return linreg.mb().b;
        };

        // ## Fitting The Regression Line
        //
        // This is called after `.data()` and returns the
        // equation `y = f(x)` which gives the position
        // of the regression line at each point in `x`.
        linreg.line = function() {

            // Get the slope, `m`, and y-intercept, `b`, of the line.
            var mb = linreg.mb(),
                m = mb.m,
                b = mb.b;

            // Return a function that computes a `y` value for each
            // x value it is given, based on the values of `b` and `a`
            // that we just computed.
            return function(x) {
                return b + (m * x);
            };
        };

        return linreg;
    }

    // # [R Squared](http://en.wikipedia.org/wiki/Coefficient_of_determination)
    //
    // The r-squared value of data compared with a function `f`
    // is the sum of the squared differences between the prediction
    // and the actual value.
    function r_squared(data, f) {
        if (data.length < 2) return 1;

        // Compute the average y value for the actual
        // data set in order to compute the
        // _total sum of squares_
        var sum = 0, average;
        for (var i = 0; i < data.length; i++) {
            sum += data[i][1];
        }
        average = sum / data.length;

        // Compute the total sum of squares - the
        // squared difference between each point
        // and the average of all points.
        var sum_of_squares = 0;
        for (var j = 0; j < data.length; j++) {
            sum_of_squares += Math.pow(average - data[j][1], 2);
        }

        // Finally estimate the error: the squared
        // difference between the estimate and the actual data
        // value at each point.
        var err = 0;
        for (var k = 0; k < data.length; k++) {
            err += Math.pow(data[k][1] - f(data[k][0]), 2);
        }

        // As the error grows larger, it's ratio to the
        // sum of squares increases and the r squared
        // value grows lower.
        return 1 - (err / sum_of_squares);
    }


    // # [Bayesian Classifier](http://en.wikipedia.org/wiki/Naive_Bayes_classifier)
    //
    // This is a naïve bayesian classifier that takes
    // singly-nested objects.
    function bayesian() {
        // The `bayes_model` object is what will be exposed
        // by this closure, with all of its extended methods, and will
        // have access to all scope variables, like `total_count`.
        var bayes_model = {},
            // The number of items that are currently
            // classified in the model
            total_count = 0,
            // Every item classified in the model
            data = {};

        // ## Train
        // Train the classifier with a new item, which has a single
        // dimension of Javascript literal keys and values.
        bayes_model.train = function(item, category) {
            // If the data object doesn't have any values
            // for this category, create a new object for it.
            if (!data[category]) data[category] = {};

            // Iterate through each key in the item.
            for (var k in item) {
                var v = item[k];
                // Initialize the nested object `data[category][k][item[k]]`
                // with an object of keys that equal 0.
                if (data[category][k] === undefined) data[category][k] = {};
                if (data[category][k][v] === undefined) data[category][k][v] = 0;

                // And increment the key for this key/value combination.
                data[category][k][item[k]]++;
            }
            // Increment the number of items classified
            total_count++;
        };

        // ## Score
        // Generate a score of how well this item matches all
        // possible categories based on its attributes
        bayes_model.score = function(item) {
            // Initialize an empty array of odds per category.
            var odds = {}, category;
            // Iterate through each key in the item,
            // then iterate through each category that has been used
            // in previous calls to `.train()`
            for (var k in item) {
                var v = item[k];
                for (category in data) {
                    // Create an empty object for storing key - value combinations
                    // for this category.
                    if (odds[category] === undefined) odds[category] = {};

                    // If this item doesn't even have a property, it counts for nothing,
                    // but if it does have the property that we're looking for from
                    // the item to categorize, it counts based on how popular it is
                    // versus the whole population.
                    if (data[category][k]) {
                        odds[category][k + '_' + v] = (data[category][k][v] || 0) / total_count;
                    } else {
                        odds[category][k + '_' + v] = 0;
                    }
                }
            }

            // Set up a new object that will contain sums of these odds by category
            var odds_sums = {};

            for (category in odds) {
                // Tally all of the odds for each category-combination pair -
                // the non-existence of a category does not add anything to the
                // score.
                for (var combination in odds[category]) {
                    if (odds_sums[category] === undefined) odds_sums[category] = 0;
                    odds_sums[category] += odds[category][combination];
                }
            }

            return odds_sums;
        };

        // Return the completed model.
        return bayes_model;
    }

    // # sum
    //
    // is simply the result of adding all numbers
    // together, starting from zero.
    //
    // This runs on `O(n)`, linear time in respect to the array
    function sum(x) {
        var value = 0;
        for (var i = 0; i < x.length; i++) {
            value += x[i];
        }
        return value;
    }

    // # mean
    //
    // is the sum over the number of values
    //
    // This runs on `O(n)`, linear time in respect to the array
    function mean(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        return sum(x) / x.length;
    }

    // # geometric mean
    //
    // a mean function that is more useful for numbers in different
    // ranges.
    //
    // this is the nth root of the input numbers multipled by each other
    //
    // This runs on `O(n)`, linear time in respect to the array
    function geometric_mean(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        // the starting value.
        var value = 1;

        for (var i = 0; i < x.length; i++) {
            // the geometric mean is only valid for positive numbers
            if (x[i] <= 0) return null;

            // repeatedly multiply the value by each number
            value *= x[i];
        }

        return Math.pow(value, 1 / x.length);
    }


    // # min
    //
    // This is simply the minimum number in the set.
    //
    // This runs on `O(n)`, linear time in respect to the array
    function min(x) {
        var value;
        for (var i = 0; i < x.length; i++) {
            // On the first iteration of this loop, min is
            // undefined and is thus made the minimum element in the array
            if (x[i] < value || value === undefined) value = x[i];
        }
        return value;
    }

    // # max
    //
    // This is simply the maximum number in the set.
    //
    // This runs on `O(n)`, linear time in respect to the array
    function max(x) {
        var value;
        for (var i = 0; i < x.length; i++) {
            // On the first iteration of this loop, max is
            // undefined and is thus made the maximum element in the array
            if (x[i] > value || value === undefined) value = x[i];
        }
        return value;
    }

    // # [variance](http://en.wikipedia.org/wiki/Variance)
    //
    // is the sum of squared deviations from the mean
    //
    // depends on `mean()`
    function variance(x) {
        // The variance of no numbers is null
        if (x.length === 0) return null;

        var mean_value = mean(x),
            deviations = [];

        // Make a list of squared deviations from the mean.
        for (var i = 0; i < x.length; i++) {
            deviations.push(Math.pow(x[i] - mean_value, 2));
        }

        // Find the mean value of that list
        return mean(deviations);
    }

    // # [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
    //
    // is just the square root of the variance.
    //
    // depends on `variance()`
    function standard_deviation(x) {
        // The standard deviation of no numbers is null
        if (x.length === 0) return null;

        return Math.sqrt(variance(x));
    }

    // The sum of deviations to the Nth power.
    // When n=2 it's the sum of squared deviations.
    // When n=3 it's the sum of cubed deviations.
    //
    // depends on `mean()`
    function sum_nth_power_deviations(x, n) {
        var mean_value = mean(x),
            sum = 0;

        for (var i = 0; i < x.length; i++) {
            sum += Math.pow(x[i] - mean_value, n);
        }

        return sum;
    }

    // # [variance](http://en.wikipedia.org/wiki/Variance)
    //
    // is the sum of squared deviations from the mean
    //
    // depends on `sum_nth_power_deviations`
    function sample_variance(x) {
        // The variance of no numbers is null
        if (x.length <= 1) return null;

        var sum_squared_deviations_value = sum_nth_power_deviations(x, 2);

        // Find the mean value of that list
        return sum_squared_deviations_value / (x.length - 1);
    }

    // # [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
    //
    // is just the square root of the variance.
    //
    // depends on `sample_variance()`
    function sample_standard_deviation(x) {
        // The standard deviation of no numbers is null
        if (x.length <= 1) return null;

        return Math.sqrt(sample_variance(x));
    }

    // # [covariance](http://en.wikipedia.org/wiki/Covariance)
    //
    // sample covariance of two datasets:
    // how much do the two datasets move together?
    // x and y are two datasets, represented as arrays of numbers.
    //
    // depends on `mean()`
    function sample_covariance(x, y) {

        // The two datasets must have the same length which must be more than 1
        if (x.length <= 1 || x.length != y.length){
          return null;
        }

        // determine the mean of each dataset so that we can judge each
        // value of the dataset fairly as the difference from the mean. this
        // way, if one dataset is [1, 2, 3] and [2, 3, 4], their covariance
        // does not suffer because of the difference in absolute values
        var xmean = mean(x),
            ymean = mean(y),
            sum = 0;

        // for each pair of values, the covariance increases when their
        // difference from the mean is associated - if both are well above
        // or if both are well below
        // the mean, the covariance increases significantly.
        for (var i = 0; i < x.length; i++){
            sum += (x[i] - xmean) * (y[i] - ymean);
        }

        // the covariance is weighted by the length of the datasets.
        return sum / (x.length - 1);
    }

    // # [correlation](http://en.wikipedia.org/wiki/Correlation_and_dependence)
    //
    // Gets a measure of how correlated two datasets are, between -1 and 1
    //
    // depends on `sample_standard_deviation()` and `sample_covariance()`
    function sample_correlation(x, y) {
        var cov = sample_covariance(x, y),
            xstd = sample_standard_deviation(x),
            ystd = sample_standard_deviation(y);

        if (cov === null || xstd === null || ystd === null) {
            return null;
        }

        return cov / xstd / ystd;
    }

    // # [median](http://en.wikipedia.org/wiki/Median)
    //
    // The middle number of a list. This is often a good indicator of 'the middle'
    // when there are outliers that skew the `mean()` value.
    function median(x) {
        // The median of an empty list is null
        if (x.length === 0) return null;

        // Sorting the array makes it easy to find the center, but
        // use `.slice()` to ensure the original array `x` is not modified
        var sorted = x.slice().sort(function (a, b) { return a - b; });

        // If the length of the list is odd, it's the central number
        if (sorted.length % 2 === 1) {
            return sorted[(sorted.length - 1) / 2];
        // Otherwise, the median is the average of the two numbers
        // at the center of the list
        } else {
            var a = sorted[(sorted.length / 2) - 1];
            var b = sorted[(sorted.length / 2)];
            return (a + b) / 2;
        }
    }

    // # [mode](http://bit.ly/W5K4Yt)
    // This implementation is inspired by [science.js](https://github.com/jasondavies/science.js/blob/master/src/stats/mode.js)
    function mode(x) {

        // Handle edge cases:
        // The median of an empty list is null
        if (x.length === 0) return null;
        else if (x.length === 1) return x[0];

        // Sorting the array lets us iterate through it below and be sure
        // that every time we see a new number it's new and we'll never
        // see the same number twice
        var sorted = x.slice().sort(function (a, b) { return a - b; });

        // This assumes it is dealing with an array of size > 1, since size
        // 0 and 1 are handled immediately. Hence it starts at index 1 in the
        // array.
        var last = sorted[0],
            // store the mode as we find new modes
            value,
            // store how many times we've seen the mode
            max_seen = 0,
            // how many times the current candidate for the mode
            // has been seen
            seen_this = 1;

        // end at sorted.length + 1 to fix the case in which the mode is
        // the highest number that occurs in the sequence. the last iteration
        // compares sorted[i], which is undefined, to the highest number
        // in the series
        for (var i = 1; i < sorted.length + 1; i++) {
            // we're seeing a new number pass by
            if (sorted[i] !== last) {
                // the last number is the new mode since we saw it more
                // often than the old one
                if (seen_this > max_seen) {
                    max_seen = seen_this;
                    seen_this = 1;
                    value = last;
                }
                last = sorted[i];
            // if this isn't a new number, it's one more occurrence of
            // the potential mode
            } else { seen_this++; }
        }
        return value;
    }

    // # [t-test](http://en.wikipedia.org/wiki/Student's_t-test)
    //
    // This is to compute a one-sample t-test, comparing the mean
    // of a sample to a known value, x.
    //
    // in this case, we're trying to determine whether the
    // population mean is equal to the value that we know, which is `x`
    // here. usually the results here are used to look up a
    // [p-value](http://en.wikipedia.org/wiki/P-value), which, for
    // a certain level of significance, will let you determine that the
    // null hypothesis can or cannot be rejected.
    //
    // Depends on `standard_deviation()` and `mean()`
    function t_test(sample, x) {
      // The mean of the sample
      var sample_mean = mean(sample);

      // The standard deviation of the sample
      var sd = standard_deviation(sample);

      // Square root the length of the sample
      var rootN = Math.sqrt(sample.length);

      // Compute the known value against the sample,
      // returning the t value
      return (sample_mean - x) / (sd / rootN);
    }

    // # quantile
    // This is a population quantile, since we assume to know the entire
    // dataset in this library. Thus I'm trying to follow the
    // [Quantiles of a Population](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
    // algorithm from wikipedia.
    //
    // Sample is a one-dimensional array of numbers,
    // and p is a decimal number from 0 to 1. In terms of a k/q
    // quantile, p = k/q - it's just dealing with fractions or dealing
    // with decimal values.
    function quantile(sample, p) {

        // We can't derive quantiles from an empty list
        if (sample.length === 0) return null;

        // invalid bounds. Microsoft Excel accepts 0 and 1, but
        // we won't.
        if (p >= 1 || p <= 0) return null;

        // Sort a copy of the array. We'll need a sorted array to index
        // the values in sorted order.
        var sorted = sample.slice().sort(function (a, b) { return a - b; });

        // Find a potential index in the list. In Wikipedia's terms, this
        // is I<sub>p</sub>.
        var idx = (sorted.length) * p;

        // If this isn't an integer, we'll round up to the next value in
        // the list.
        if (idx % 1 !== 0) {
            return sorted[Math.ceil(idx) - 1];
        } else if (sample.length % 2 === 0) {
            // If the list has even-length and we had an integer in the
            // first place, we'll take the average of this number
            // and the next value, if there is one
            return (sorted[idx - 1] + sorted[idx]) / 2;
        } else {
            // Finally, in the simple case of an integer value
            // with an odd-length list, return the sample value at the index.
            return sorted[idx];
        }
    }

    // # [Interquartile range](http://en.wikipedia.org/wiki/Interquartile_range)
    //
    // A measure of statistical dispersion, or how scattered, spread, or
    // concentrated a distribution is. It's computed as the difference betwen
    // the third quartile and first quartile.
    function iqr(sample){
	    // We can't derive quantiles from an empty list
        if (sample.length === 0) return null;

        // Interquartile range is the span between the upper quartile,
        // at `0.75`, and lower quartile, `0.25`
        return quantile(sample, 0.75) - quantile(sample, 0.25);
    }

    // # [Median Absolute Deviation](http://en.wikipedia.org/wiki/Median_absolute_deviation)
    //
    // The Median Absolute Deviation (MAD) is a robust measure of statistical
    // dispersion. It is more resilient to outliers than the standard deviation.
    function mad(x) {
        // The mad of nothing is null
        if (!x || x.length === 0) return null;

        var median_value = median(x),
            median_absolute_deviations = [];

        // Make a list of absolute deviations from the median
        for (var i = 0; i < x.length; i++) {
            median_absolute_deviations.push(Math.abs(x[i] - median_value));
        }

        // Find the median value of that list
        return median(median_absolute_deviations);
    }

    // ## Compute Matrices for Jenks
    //
    // Compute the matrices required for Jenks breaks. These matrices
    // can be used for any classing of data with `classes <= n_classes`
    function jenksMatrices(data, n_classes) {

        // in the original implementation, these matrices are referred to
        // as `LC` and `OP`
        //
        // * lower_class_limits (LC): optimal lower class limits
        // * variance_combinations (OP): optimal variance combinations for all classes
        var lower_class_limits = [],
            variance_combinations = [],
            // loop counters
            i, j,
            // the variance, as computed at each step in the calculation
            variance = 0;

        // Initialize and fill each matrix with zeroes
        for (i = 0; i < data.length + 1; i++) {
            var tmp1 = [], tmp2 = [];
            // despite these arrays having the same values, we need
            // to keep them separate so that changing one does not change
            // the other
            for (j = 0; j < n_classes + 1; j++) {
                tmp1.push(0);
                tmp2.push(0);
            }
            lower_class_limits.push(tmp1);
            variance_combinations.push(tmp2);
        }

        for (i = 1; i < n_classes + 1; i++) {
            lower_class_limits[1][i] = 1;
            variance_combinations[1][i] = 0;
            // in the original implementation, 9999999 is used but
            // since Javascript has `Infinity`, we use that.
            for (j = 2; j < data.length + 1; j++) {
                variance_combinations[j][i] = Infinity;
            }
        }

        for (var l = 2; l < data.length + 1; l++) {

            // `SZ` originally. this is the sum of the values seen thus
            // far when calculating variance.
            var sum = 0,
                // `ZSQ` originally. the sum of squares of values seen
                // thus far
                sum_squares = 0,
                // `WT` originally. This is the number of
                w = 0,
                // `IV` originally
                i4 = 0;

            // in several instances, you could say `Math.pow(x, 2)`
            // instead of `x * x`, but this is slower in some browsers
            // introduces an unnecessary concept.
            for (var m = 1; m < l + 1; m++) {

                // `III` originally
                var lower_class_limit = l - m + 1,
                    val = data[lower_class_limit - 1];

                // here we're estimating variance for each potential classing
                // of the data, for each potential number of classes. `w`
                // is the number of data points considered so far.
                w++;

                // increase the current sum and sum-of-squares
                sum += val;
                sum_squares += val * val;

                // the variance at this point in the sequence is the difference
                // between the sum of squares and the total x 2, over the number
                // of samples.
                variance = sum_squares - (sum * sum) / w;

                i4 = lower_class_limit - 1;

                if (i4 !== 0) {
                    for (j = 2; j < n_classes + 1; j++) {
                        // if adding this element to an existing class
                        // will increase its variance beyond the limit, break
                        // the class at this point, setting the `lower_class_limit`
                        // at this point.
                        if (variance_combinations[l][j] >=
                            (variance + variance_combinations[i4][j - 1])) {
                            lower_class_limits[l][j] = lower_class_limit;
                            variance_combinations[l][j] = variance +
                                variance_combinations[i4][j - 1];
                        }
                    }
                }
            }

            lower_class_limits[l][1] = 1;
            variance_combinations[l][1] = variance;
        }

        // return the two matrices. for just providing breaks, only
        // `lower_class_limits` is needed, but variances can be useful to
        // evaluage goodness of fit.
        return {
            lower_class_limits: lower_class_limits,
            variance_combinations: variance_combinations
        };
    }

    // ## Pull Breaks Values for Jenks
    //
    // the second part of the jenks recipe: take the calculated matrices
    // and derive an array of n breaks.
    function jenksBreaks(data, lower_class_limits, n_classes) {

        var k = data.length - 1,
            kclass = [],
            countNum = n_classes;

        // the calculation of classes will never include the upper and
        // lower bounds, so we need to explicitly set them
        kclass[n_classes] = data[data.length - 1];
        kclass[0] = data[0];

        // the lower_class_limits matrix is used as indexes into itself
        // here: the `k` variable is reused in each iteration.
        while (countNum > 1) {
            kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 2];
            k = lower_class_limits[k][countNum] - 1;
            countNum--;
        }

        return kclass;
    }

    // # [Jenks natural breaks optimization](http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization)
    //
    // Implementations: [1](http://danieljlewis.org/files/2010/06/Jenks.pdf) (python),
    // [2](https://github.com/vvoovv/djeo-jenks/blob/master/main.js) (buggy),
    // [3](https://github.com/simogeo/geostats/blob/master/lib/geostats.js#L407) (works)
    //
    // Depends on `jenksBreaks()` and `jenksMatrices()`
    function jenks(data, n_classes) {

        if (n_classes > data.length) return null;

        // sort data in numerical order, since this is expected
        // by the matrices function
        data = data.slice().sort(function (a, b) { return a - b; });

        // get our basic matrices
        var matrices = jenksMatrices(data, n_classes),
            // we only need lower class limits here
            lower_class_limits = matrices.lower_class_limits;

        // extract n_classes out of the computed matrices
        return jenksBreaks(data, lower_class_limits, n_classes);

    }

    // # [Skewness](http://en.wikipedia.org/wiki/Skewness)
    //
    // A measure of the extent to which a probability distribution of a
    // real-valued random variable "leans" to one side of the mean.
    // The skewness value can be positive or negative, or even undefined.
    //
    // Implementation is based on the adjusted Fisher-Pearson standardized
    // moment coefficient, which is the version found in Excel and several
    // statistical packages including Minitab, SAS and SPSS.
    //
    // Depends on `sum_nth_power_deviations()` and `sample_standard_deviation`
    function sample_skewness(x) {
        // The skewness of less than three arguments is null
        if (x.length < 3) return null;

        var n = x.length,
            cubed_s = Math.pow(sample_standard_deviation(x), 3),
            sum_cubed_deviations = sum_nth_power_deviations(x, 3);

        return n * sum_cubed_deviations / ((n - 1) * (n - 2) * cubed_s);
    }

    // # Mixin
    //
    // Mixin simple_statistics to the Array native object. This is an optional
    // feature that lets you treat simple_statistics as a native feature
    // of Javascript.
    function mixin() {
        var support = !!(Object.defineProperty && Object.defineProperties);
        if (!support) throw new Error('without defineProperty, simple-statistics cannot be mixed in');

        // only methods which work on basic arrays in a single step
        // are supported
        var arrayMethods = ['median', 'standard_deviation', 'sum',
            'mean', 'min', 'max', 'quantile', 'geometric_mean'];

        // create a closure with a method name so that a reference
        // like `arrayMethods[i]` doesn't follow the loop increment
        function wrap(method) {
            return function() {
                // cast any arguments into an array, since they're
                // natively objects
                var args = Array.prototype.slice.apply(arguments);
                // make the first argument the array itself
                args.unshift(this);
                // return the result of the ss method
                return ss[method].apply(ss, args);
            };
        }

        // for each array function, define a function off of the Array
        // prototype which automatically gets the array as the first
        // argument. We use [defineProperty](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty)
        // because it allows these properties to be non-enumerable:
        // `for (var in x)` loops will not run into problems with this
        // implementation.
        for (var i = 0; i < arrayMethods.length; i++) {
            Object.defineProperty(Array.prototype, arrayMethods[i], {
                value: wrap(arrayMethods[i]),
                configurable: true,
                enumerable: false,
                writable: true
            });
        }
    }

    ss.linear_regression = linear_regression;
    ss.standard_deviation = standard_deviation;
    ss.r_squared = r_squared;
    ss.median = median;
    ss.mean = mean;
    ss.mode = mode;
    ss.min = min;
    ss.max = max;
    ss.sum = sum;
    ss.quantile = quantile;
    ss.iqr = iqr;
    ss.mad = mad;

    ss.sample_covariance = sample_covariance;
    ss.sample_correlation = sample_correlation;
    ss.sample_variance = sample_variance;
    ss.sample_standard_deviation = sample_standard_deviation;
    ss.sample_skewness = sample_skewness;

    ss.geometric_mean = geometric_mean;
    ss.variance = variance;
    ss.t_test = t_test;

    // jenks
    ss.jenksMatrices = jenksMatrices;
    ss.jenksBreaks = jenksBreaks;
    ss.jenks = jenks;

    ss.bayesian = bayesian;

    // Alias this into its common name
    ss.average = mean;
    ss.interquartile_range = iqr;
    ss.mixin = mixin;
    ss.median_absolute_deviation = mad;

})(this);
